import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { Content } from "antd/lib/layout/layout";
import { GET_VENUES } from '../GraphQL/Queries';
import { DELETE_VENUE } from '../GraphQL/Mutations';
import { useQuery, useMutation } from "@apollo/client";
import { Button, PageHeader, Space, Table, Popconfirm } from "antd";

function Venues() {


    let navigate = useNavigate()
    const {error, data, loading} = useQuery(GET_VENUES);
    const [onDeleteHandler] = useMutation(DELETE_VENUE)

    const venueDataColumns = [
        {title: "Venue Name", dataIndex: 'name'},
        {title: "Address", dataIndex: 'address'},
        {title: "City", dataIndex: 'city'},
        {title: "Actions", dataIndex:'', render: (_, record) => (
            <Space>
                <Button type="primary"><Link to={`/venues/edit/${record._id}`}>Edit</Link></Button>
                <Popconfirm title="Confirm Deletion" onCancel={null} onConfirm={() => {onDeleteHandler({variables: { "venueId": record._id}})}}>
                    <Button type="default" danger>Delete</Button>
                </Popconfirm>
            </Space>
        )}
    ]

    return (
        <>
        <PageHeader className="site-page-header" title="Venues" extra={[<Button key="1" type="primary" onClick={ () => {navigate("/venues/create")}}> Create</Button>,]} />
        <Content>
            <Table rowKey={record => record._id} columns={venueDataColumns} loading={loading} dataSource={data?.venues}></Table>
        </Content>
        </>
    );
}

export default Venues;