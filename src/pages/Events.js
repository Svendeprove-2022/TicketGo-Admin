import { PageHeader, Space, Table, Button, Popconfirm } from 'antd';
import React, { useState } from 'react';
import { useQuery, gql, useMutation } from "@apollo/client"
import { Link,useNavigate } from 'react-router-dom';
import { Content } from 'antd/lib/layout/layout';
import { GET_VENUES } from '../GraphQL/Queries';

const GET_EVENTS = gql`
query {
    events {
      _id
      name
      venue {
        _id
        name
      }
      tickets_sold
    }
  }
`
const DELETE_EVENT = gql`
mutation test($eventId:ObjectId){
    deleteOneEvent(query: {_id: $eventId}) {
    _id
  }
}
`


const Events = () =>  {

    let navigate = useNavigate()

    const [onDeleteHandler] = useMutation(DELETE_EVENT)
    const {error: eventError, data: data, loading: eventLoading} = useQuery(GET_EVENTS);
    
    const testDataColumns = [
        {title: 'Event Name', dataIndex: 'name', render: (_, record) => (<Link to={`/events/${record._id}`}>{record.name}</Link>)},
        {title: 'Venue', dataIndex: 'venue', key:'venue[name]', render:(venue) => {return venue?.name}},
        {title: "Ticket's Sold", dataIndex: 'tickets_sold'},
        {title: 'Actions', dataIndex: '', render: (_, record) => (
            <Space size="middle">
                <Button type="primary"><Link to={`/events/edit/${record._id}`}>Edit</Link></Button>
                <Popconfirm title="Confirm Deletion" onCancel={null} onConfirm={() => {onDeleteHandler({variables: { "eventId": record._id}})}}>
                    <Button type="default" danger>Delete</Button>
                </Popconfirm>            
            </Space>
        )}
    ] 

    
    
    if(eventError) return 'Error....'

    return(
        <>
            <PageHeader className='site-page-header' title="Events" 
                extra={[<Button key="1" type="primary" onClick={ () => {navigate("/events/create")}}> Create</Button>,]}/>
                <Content>
                    <Table  loading={eventLoading} rowKey={record => record._id} columns={testDataColumns} dataSource={data?.events}></Table>
                </Content>
        </>
    );
}

export default Events;