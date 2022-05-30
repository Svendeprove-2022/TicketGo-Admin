import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Layout, Button, Form, Input, DatePicker, Card, Select, PageHeader, Cascader } from 'antd';
import { MinusCircleFilled, PlusOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import {CREATE_EVENT, CREATE_ORDER} from '../../GraphQL/Mutations';
import { GET_EVENTS, GET_SECTIONS_FOR_EVENT, GET_USERS } from '../../GraphQL/Queries';


const CreateOrder = () =>{
    const navigate = useNavigate();

    
    const [form] = Form.useForm();
    let event = Form.useWatch('event', form)
    let ticketlist = Form.useWatch('tickets', form)
    let user = Form.useWatch('user', form)
    let status = Form.useWatch('status', form)

    const [events, setEvents] = useState([])
    const [users, setUsers] = useState([])
    const [sections, setSections] = useState([])

    const [createOneOrder, {createError}] = useMutation(CREATE_ORDER)
    const createOrder = () => {
        let tmp = ticketlist.map((ticket) => ({section:{"link":ticket}, status:"Not Checked"}))
        console.log(tmp);
        createOneOrder({
            variables:{
                "eventId": event,
                "tickets": tmp,
                "userId": user,
                "status": status
            }
        })
        if(createError){
            console.log(createError);
        }
    }

    const {error: eventError, data: eventData, loading: eventLoading} = useQuery(GET_EVENTS)
    const {error: userError, data: userData, loading: userLoading} = useQuery(GET_USERS)

    const [getSections, {error: sectionError, data: sectionData, loading: sectionLoading}] = useLazyQuery(GET_SECTIONS_FOR_EVENT, {
        variables: {"eventId": event},
        onCompleted: data => {{setSections(data.sections.map((section) =>({label: section.name, value:section._id})))}}
    })

    useEffect(() => {
        if(eventData){
            setEvents(
                eventData.events.map((event) => ({label: event.name, value: event._id}))
            )
        }
        if(userData){
            setUsers(
                userData.users.map((user) => ({label: `${user.first_name} ${user.last_name} - ${user.email}`, value: user._id}))
            )
        }
    }, [eventData], [userData])
    
    return(
        <>
        <PageHeader className='site-page-header' title={"Create Order"} onBack={() => navigate(-1)} extra={
            [<Button onClick={() => {form.submit(); console.log("clicked");}} key="submit" htmlType="submit" type="primary">Create</Button>]}>
        </PageHeader>
        <Card>
            <Form form={form} layout="vertical" autoComplete='off' onFinish={createOrder}>
            <Form.Item name='status' label="Order status" placeholder="Set status" initialValue={"On Going"}>
                <Input disabled ></Input>
            </Form.Item>
            <Form.Item name='event' label="Event" >
                <Select options={events} onChange={() => {getSections()}} placeholder="Select Event">
            </Select>
            </Form.Item>
            <Form.Item name='user' label="User">
                <Select options={users} placeholder="Select User">
            </Select>
            </Form.Item>
        <Form.List name='tickets'>
            {(fields, {add, remove}, {errors}) => (
                <>
                    <p>Tickets</p>
                    {fields.map((field, index) => (
                        <Form.Item name='ticketvalue' {...field}>
                            <Form.Item noStyle {...field}>
                                <Select options={sections} placeholder="Select Section"></Select>
                            </Form.Item>
                                <MinusCircleFilled className="dynamic-delete-button" onClick={() => remove(field.name)}/>
                            </Form.Item>
                        ))}
                        <Form.Item>
                            <Button type="dashed" onClick={() => { add() }} style={{width: '20%',}}>Add Ticket</Button>
                        </Form.Item>
                        <Form.Item>
                            <Button type="dashed" onClick={() => { console.log(status) }} style={{width: '20%',}}>Show Ticket Array</Button>
                        </Form.Item>
                </>
            )}
            </Form.List>
        </Form>
        </Card>
        </>
    )
}

export default CreateOrder