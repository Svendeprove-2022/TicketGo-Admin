import { Space, Table } from 'antd';
import React from 'react'

class Events extends React.Component {

    eventColumns = [
        { title:'Event Name', dataIndex: 'eventname',key: 'eventname' },
        { title:'Date', dataIndex: 'date', key: 'date' },
        { title:'Tickets remaining', dataIndex: 'ticremain', key: 'tickremain' },
        { title:'Action', dataIndex: 'action',key: 'acttion' },

    ]

    render(){ 
        return(
        <>
        <h2>Events</h2>
            <Table columns={this.eventColumns}></Table>
        </>
    )};
}

export default Events;