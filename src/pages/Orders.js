import { gql, useQuery, useMutation } from '@apollo/client';
import { PageHeader, Table, Space, Button, Popconfirm } from 'antd';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {GET_ORDERS} from '../GraphQL/Queries'
import {DELETE_ORDER} from '../GraphQL/Mutations'

function Orders() {

    let navigate = useNavigate()
    const {error, data, loading} = useQuery(GET_ORDERS);
    const [onDeleteHandler] = useMutation(DELETE_ORDER);
    
   const salesColumns = [
        { title: 'Order Id', dataIndex: '_id', key: '_id'},
        { title: 'Payment Status', dataIndex: 'status', key: 'status'},
        { title: 'Event', dataIndex: ['event', 'name'], key: 'name'},
        { title: 'Actions', dataIndex: 'action', key: 'action', render: (_, record) => (
        <Space size="middle">
            <Button type="primary"><Link to={`/orders/edit/${record._id}`}>Edit</Link></Button>
            <Popconfirm title="Confirm Deletion" onCancel={null} onConfirm={() => {onDeleteHandler({variables: { "saleId": record._id}})}}>
                <Button type="default" danger>Delete</Button>
            </Popconfirm>
        </Space>)}
    ]

    /* if(loading) return (
        <>
            <PageHeader className='site-page-header' loading={loading} title="Sales"></PageHeader>
            <Table columns={salesColumns} loading='true' ></Table>
        </>
    ) */
    
    if(error){
        console.log(error);
    }


    if(data){
        //console.log(data);
        return (
            <>
               <PageHeader className='site-page-header' title="Orders" extra={[<Button key="1" type="primary" onClick={ () => {navigate("/orders/create")}}> Create</Button>,]}></PageHeader>
               <Table rowKey={record => record._id} columns={salesColumns} dataSource={data.orders}></Table>
           </>
       )
    }
}

export default Orders; 