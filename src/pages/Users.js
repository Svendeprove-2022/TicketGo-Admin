import { useQuery, useMutation } from "@apollo/client";
import { Button, PageHeader, Space, Table, Popconfirm } from "antd";
import { Content } from "antd/lib/layout/layout";
import React from "react";
import { Link } from "react-router-dom";
import {GET_USERS} from '../GraphQL/Queries'
import {DELETE_USER} from '../GraphQL/Mutations'





const Users = () =>{

    const {error, data, loading} = useQuery(GET_USERS);
    const [onDeleteHandler] = useMutation(DELETE_USER)

    const userDataColumns = [
        {title: 'First Name', dataIndex: 'first_name'},
        {title: 'Actions', dataIndex: '', render: (_, record) => (
            <Space size="middle">
                <Button type="primary">
                    <Link to={`/users/edit/${record._id}`}>Edit</Link>
                </Button>
                <Popconfirm title="Confirm Deletion" onCancel={null} onConfirm={() => {onDeleteHandler({variables: { "userId": record._id}})}}>
                    <Button type="default" danger>Delete</Button>
                </Popconfirm>
            </Space>
        )},
    ]

    return(
        <>
            <PageHeader className="site-page-header" title="Users"/>
            <Content>
                <Table rowKey={record => record._id} columns={userDataColumns} loading={loading} dataSource={data?.users}></Table>
            </Content>
        </>
    )
}

export default Users
