import { PageHeader, Space, Table } from 'antd';
import React from 'react'

class Events extends React.Component {

    eventColumns = [
        { title:'Event Name', dataIndex: 'eventname',key: 'eventname' },
        { title:'Date', dataIndex: 'date', key: 'date' },
        { title:'Tickets remaining', dataIndex: 'ticremain', key: 'tickremain' },
        { title:'Action', dataIndex: 'action',key: 'action' },
    ]

    eventData = [
        {key: '1', eventname: 'Distortion', date: '20-03-2022', ticremain: 20, action:''},
        {key: '2', eventname: 'Distortion', date: '20-03-2022', ticremain: 20, action:''},
        {key: '3', eventname: 'Distortion', date: '20-03-2022', ticremain: 20, action:''}
    ]

    render(){ 
        return(
        <>
            <PageHeader className='site-page-header' title="Events"></PageHeader>
            <Table columns={this.eventColumns} dataSource={this.eventData}></Table>
        </>
    )};
}

export default Events;