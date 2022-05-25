import React, { useState } from 'react';
import { gql, useMutation } from "@apollo/client";
import { Button, Form, Input, Typography  } from 'antd';

const INSERT_EVENT = gql`
mutation CreateEvent($eventName: String){
    insertOneEvent(data: {name:$eventName}) {
    _id
    name
  }
}`

const DELETE_EVENT = gql`
mutation test($eventId:ObjectId){
    deleteOneEvent(query: {_id: $eventId}) {
    _id
  }
}
`

const CreateEvent = () => {
    const [form] = Form.useForm();
    let name = Form.useWatch('name', form)

    const [data] = useMutation(INSERT_EVENT, {
        variables: {
            "eventName": name
        }
    })

   


    return(
    <>
    <Form form={form} name='Event' autoComplete='off' onFinish={data}>
        <Form.Item label="Event name" name="name"><Input /></Form.Item>
        <Form.Item wrapperCol={{span:8}}>
                <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
    </Form>
    <Typography>
        <pre>Name Value: {name}</pre>
    </Typography></>
    )
}

export default CreateEvent