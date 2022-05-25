import { PageHeader, Space, Table, Button } from 'antd';
import React from 'react';
import { useQuery, gql, useMutation } from "@apollo/client"
import { Link,useNavigate } from 'react-router-dom';

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

    const [onDeleteHandler, {data1, loading1, error1}] = useMutation(DELETE_EVENT)

    const {error, data, loading} = useQuery(GET_EVENTS);
    //const { delete } = useMutation(DELETE_EVENT, {variables: { "eventId": record}})

    const testDataColumns = [
        {title: 'Event Name', dataIndex: 'name', render: (_, record) => (<Link to={`/events/${record._id}`}>{record.name}</Link>)},
        {title: 'Venue', dataIndex: 'venue', key:'venue[name]', render:(venue) => {return venue?.name}},
        {title: "Ticket's Sold", dataIndex: 'tickets_sold'},
        {title: 'Actions', dataIndex: '', render: (_, record) => (
            <Space size="middle">
                <Link to={`/events/edit/${record._id}`}>Edit</Link>
                {/* <Link to={`/events/edit/${record._id}`}>Delete</Link> */}
                <a onClick={() => {onDeleteHandler({variables: { "eventId": record._id}})}}>Delete</a>
            </Space>
        )}
    ] 

    if(loading) return (
        <>
            <PageHeader className='site-page-header' loading={loading} title="Events" extra={
            [
                <Button key="1" type="primary">Create</Button>,
            ]
        }></PageHeader>
            <Table columns={testDataColumns} loading='true' ></Table>
        </>
    )
    
    if(error) return 'Error....'

    return(
        <>
            <PageHeader className='site-page-header' title="Events" 
                extra={[<Button key="1" type="primary" onClick={ () => {navigate("/events/create")}}>Create</Button>,]}/>
            <Table rowKey={record => record._id} columns={testDataColumns} dataSource={data.events}></Table>
        </>
    );
}

export default Events;