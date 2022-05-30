import React, { useState, useEffect } from 'react';
import { useMutation, useLazyQuery , useQuery } from "@apollo/client";
import { useNavigate, useParams } from 'react-router-dom';
import { DatePicker, Form, Input, PageHeader, Button, Card, Select, Skeleton} from 'antd';
import { MinusCircleFilled, PlusOutlined } from '@ant-design/icons';
import { GET_ORDER, GET_SECTIONS_FOR_EVENT } from "../../GraphQL/Queries";


const EditOrder = () =>{

    const navigate = useNavigate();
    const { id } = useParams();

    const [form] = Form.useForm();
    let orderstatus = Form.useWatch('orderstatus', form)
    let event = Form.useWatch('event', form)
    let ticketlist = Form.useWatch('tickets', form)

    const [sections, setSections] = useState([])
    const [tickets, setTickets] = useState([]);
    
    const {error, data:orderData, loading} = useQuery(GET_ORDER, {variables: {"orderId": id}});

    const {error: sectionError, data: sectionData, loading: sectionLoading} = useQuery(GET_SECTIONS_FOR_EVENT, {
        variables: {"eventId": orderData?.order?.event._id},
        onCompleted: sectionData => {{setSections(sectionData.sections.map((section) =>({label: section.name, value:section._id})))}}
   })    

    useEffect(() => {
        if((orderData)){
            setTickets(orderData?.order?.tickets.map((ticket) => ({key: ticket._id ,label:ticket.section?.name, value: ticket.section?._id})))
        }
    }, [orderData], [sectionData], [sections])
    
    /* let [updateOneOrder, {updateError}] = useMutation()
    const updateOrder = () => {
        updateOneOrder({
            variables: {
                "orderId": id,
                "status": orderstatus,
                "user": user
            }
        })
    } */
    
    return(
        <>
        <PageHeader className='site-page-header' title={`Order: ${orderData?.order?._id}`} onBack={() => navigate(-1)} extra={
                [
                    <Button onClick={() => {form.submit()}} key="submit" htmlType="submit" type="primary">Save</Button>
                ]
            }>
        </PageHeader>

        <Card loading={loading && sectionLoading}>
        <Form form={form} layout="vertical" onFinish={""}>
            <Form.Item name='orderId' label="Order #" initialValue={orderData?.order._id}>
                <Input placeholder='OrderId' disabled/>
            </Form.Item>
            <Form.Item name='userid' label="User #" initialValue={orderData?.order.user?._id}>
                <Input placeholder='UserId' disabled/>
            </Form.Item>
            <Form.Item name='eventname' label="Event" initialValue={orderData?.order.event?.name}>
                <Input placeholder='Event' disabled/>
            </Form.Item>
        
           <Form.List name='tickets'>
            {(ticketsholder, {add, remove}, {errors}) => (
                <>
                {/* {console.log(tickets)} */}
                <p>Tickets</p>
                {tickets.map((ticket, index) => (
                    <Form.Item {...index} key={ticket.key}>
                        <Select loading={sectionLoading} options={sections} defaultValue={ticket.value}></Select>
                        <MinusCircleFilled className="dynamic-delete-button" onClick={() => remove(ticketsholder.name)}/>
                    </Form.Item>
                ))}
                <Form.Item>
                    <Button type="dashed" onClick={() => { console.log(ticketlist) }} style={{width: '20%',}}>Show Ticket Array</Button>
                </Form.Item>
                </>
            )}  
           </Form.List>
        </Form>
        </Card>
        </>
    )

}

export default EditOrder