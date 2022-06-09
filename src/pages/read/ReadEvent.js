import { Button, Descriptions, PageHeader, Image, Collapse, Popconfirm } from 'antd';
import React from 'react';
import { useQuery, gql, useMutation } from "@apollo/client";
import { useNavigate, useParams } from 'react-router-dom';

const { Panel } = Collapse;

const GET_EVENT = gql`
    query getEvent($eventId: ObjectId!){
        event(query: {_id:$eventId}) {
            _id
            age_restriction
            info
            name
            note
            rank
            status
            tickets_capacity
            tickets_limit
            tickets_sold
            timestamp
            url
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

const ReadEvent = () => {
    const navigate = useNavigate();
    let { id } = useParams();

    const {error, data, loading} = useQuery(GET_EVENT, {variables: {"eventId": id}});
    const [onDeleteHandler, {data1, loading1, error1}] = useMutation(DELETE_EVENT)

    if(loading){
        <>
        <PageHeader className='site-page-header' title={"Events"} loading={loading}  onBack={() => {navigate(-1)}} extra={
            [
                <Button key="1" type="primary">Edit</Button>,
                <Button key="2" type="default">Delete</Button>
            ]
        }>
        </PageHeader>
        </>
    }

    if(error) return (console.log(error))

    if(data){
        return(
            <>
            <PageHeader className='site-page-header' title={data.event.name} onBack={() => {navigate(-1)}} extra={
                [
                    <Button key="1" type="primary">Edit</Button>,
                    <Popconfirm title="Confirm Deletion" onCancel={null} onConfirm={() => onDeleteHandler({variables: { "eventId": data.event._id}})}>
                        <Button>Delete</Button>
                    </Popconfirm>
                ]
            }>
            </PageHeader>
            
            <Descriptions bordered layout="vertical" style={{padding: '16px 24px 16px 24px'}}>
                <Descriptions.Item label="Event title" span={2}>{data.event.name}</Descriptions.Item>
                <Descriptions.Item label="Date">{data.event.timestamp}</Descriptions.Item>
                <Descriptions.Item label="Venue">{data.event.venue}</Descriptions.Item>
                <Descriptions.Item label="Ticket Sold">{data.event.tickets_sold}</Descriptions.Item>
                <Descriptions.Item label="Ticket Capacity">{data.event.tickets_capacity}</Descriptions.Item>
                <Descriptions.Item label="Info" span={3}>{data.event.info}</Descriptions.Item>
            </Descriptions>
    
            <Collapse style={{margin: '16px 24px 16px 24px'}}>
                <Panel header="Images" key="1">
                    <Image.PreviewGroup>
                        <Image width={200} src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
                    </Image.PreviewGroup>
                </Panel>
            </Collapse>
            </>
        )
    }
    
}

export default ReadEvent