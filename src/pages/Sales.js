import { PageHeader, Table } from 'antd';
import React from 'react'

class Sales extends React.Component {

    salesColumns = [
        { title: 'Order Id', dataIndex: 'orderId', key: 'orderId'},
        { title: 'Payment Status', dataIndex: 'paymentstatus', key: 'paymentstatus'},
        { title: 'Customer name', dataIndex: 'customerName', key: 'customername'},
        { title: 'Customer Email', dataIndex: 'customerEmail', key: 'customeremail'},
        { title: 'Actions', dataIndex: 'action', key: 'action'}
    ]

    render(){
        return (
            <>
                <PageHeader className='site-page-header' title="Sales"></PageHeader>
                <Table columns={this.salesColumns}></Table>
            </>
        )
    }
}

export default Sales; 