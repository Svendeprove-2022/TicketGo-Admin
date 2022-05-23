import { PageHeader, Space, Table } from 'antd';
import React from 'react';
import { useQuery, gql } from "@apollo/client"

const GET_EVENTS = gql`
query {
    characters {
        results {
            id
            name
        }
    }
}
`
function Events() {

    const {error, data, loading} = useQuery(GET_EVENTS);

    const testDataColumns = [
        {title: '#', dataIndex: 'id', key: 'id'},
        {title: 'Event Name', dataIndex: 'name'},
        {title: 'Venue', dataIndex: ''},
        {title: 'Date', dataIndex: ''},
        {title: 'Actions', dataIndex: ''}
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
            <Table rowKey={record => record.id} columns={testDataColumns} loading={loading} dataSource={data.characters.results}></Table>
        </>
    );
}

export default Events;