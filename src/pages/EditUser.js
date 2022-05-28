import { useMutation, useQuery } from "@apollo/client";
import { Card, Input, PageHeader, Form, Button } from "antd";
import React from "react";
import {GET_USER} from '../GraphQL/Queries';
import { useNavigate, useParams } from 'react-router-dom';
import { UPDATE_USER } from "../GraphQL/Mutations";

const EditUser = () => {
    const { id } = useParams();
    const [form] = Form.useForm();

    let firstname = Form.useWatch('firstname', form)
    let lastname = Form.useWatch('lastname', form)

    let [updateOneUser, {updateError}] = useMutation(UPDATE_USER)
    const updateUser = () => {
        updateOneUser({
            variables: {
                "userId": id,
                "firstName": firstname,
                "lastName": lastname
            }
        })
        
        if(updateError){
            console.log(updateError)
        }
    }
    
    const { error, data, loading } = useQuery(GET_USER, {variables: {"userId": id}})
    return(
        <>
        <PageHeader className='site-page-header' title={`${data?.user.first_name} ${data?.user.last_name}`} extra={
                [
                    <Button onClick={() => {form.submit()}} key="submit" htmlType="submit" type="primary">Save</Button>
                ]
            }/>
        <Card loading={loading}>
            <Form form={form} layout="vertical" onFinish={updateUser}>
                <Form.Item name="firstname" label="First Name" initialValue={data?.user.first_name} >
                    <Input placeholder="First Name" defaultValue={data?.user.first_name}/>
                </Form.Item>
                <Form.Item name="lastname" label="Last Name" initialValue={data?.user.last_name} >
                    <Input placeholder="Last Name" defaultValue={data?.user.last_name}/>
                </Form.Item>
                <Form.Item name="email" label="Email" initialValue={data?.user.email} >
                    <Input placeholder="Last Name" defaultValue={data?.user.email}/>
                </Form.Item>
                <Form.Item name="address" label="Address" initialValue={data?.user.address} >
                    <Input placeholder="Address" defaultValue={data?.user.address}/>
                </Form.Item>
                <Form.Item name="city" label="City" initialValue={data?.user.city} >
                    <Input placeholder="City" defaultValue={data?.user.city}/>
                </Form.Item>
                <Form.Item name="zipcode" label="Zip Code" initialValue={data?.user.zip_code} >
                    <Input placeholder="City" defaultValue={data?.user.zip_code}/>
                </Form.Item>
                
                <Form.Item name="country" label="Country" initialValue={data?.user.country} >
                    <Input placeholder="Country" defaultValue={data?.user.country}/>
                </Form.Item>
            </Form>
        </Card>
        </>
    )

}

export default EditUser