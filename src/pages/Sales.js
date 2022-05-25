import { gql, useQuery } from '@apollo/client';
import { PageHeader, Table, Space } from 'antd';
import React from 'react'
import { Link } from 'react-router-dom';

function Sales() {

    const GET_SALES = gql`
    query {
        orders {
          _id
          event
          status
          user
        }
      }
    `
    const {error, data, loading} = useQuery(GET_SALES);
    console.log(data);

   const salesColumns = [
        { title: 'Order Id', dataIndex: '_id', key: '_id'},
        { title: 'Payment Status', dataIndex: 'status', key: 'status'},
        { title: 'User Email', dataIndex: 'user', key: 'user'},
        { title: 'Actions', dataIndex: 'action', key: 'action', render: (_, record) => (
        <Space size="middle">
            <Link to={`/sales/edit/${record._id}`}>Edit</Link>
            <a href={`/delete/${record._id}`}>Delete</a> 
        </Space>)}
    ]

    if(loading) return (
        <>
            <PageHeader className='site-page-header' loading={loading} title="Sales"></PageHeader>
            <Table columns={salesColumns} loading='true' ></Table>
        </>
    )
    
    if(error) return 'Error....'


    if(data){
        return (
            <>
               <PageHeader className='site-page-header' title="Sales"></PageHeader>
               <Table rowKey={record => record._id} columns={salesColumns} dataSource={data.orders}></Table>
           </>
       )
    }
}

export default Sales; 