import { PageHeader, Space, Table } from 'antd';
import React from 'react';
import { useQuery, gql } from "@apollo/client"

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
function Events() {

    const {error, data, loading} = useQuery(GET_EVENTS);

    const testDataColumns = [
        //{title: '#', dataIndex: '_id', key: '_id'},
        {title: 'Event Name', dataIndex: 'name'},
        //{title: 'Date', dataIndex: ''},
        {title: 'Venue', dataIndex: 'venue', key:'venue[name]', render:(venue) => {return venue.name}},
        {title: "Ticket's Sold", dataIndex: 'tickets_sold'},
        {title: 'Actions', dataIndex: '', render: (_, record) => (
            <Space size="middle">
                <a href={`/events/edit/${record._id}`}>Edit</a>
                <a href={`/delete/${record._id}`}>Delete</a>           
            </Space>
        )}
    ] 

    if(loading) return (
        <>
            <PageHeader className='site-page-header' title="Events"></PageHeader>
            <Table columns={testDataColumns} loading='true' ></Table>
        </>
    )
    
    if(error) return 'Error....'

    return(
        <>
            <PageHeader className='site-page-header' title="Events"></PageHeader>
            <Table rowKey={record => record._id} columns={testDataColumns} dataSource={data.events}></Table>
        </>
    );
}

export default Events;