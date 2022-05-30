import { DatePicker, Form, Input, PageHeader, Button, Card, Select} from 'antd';
import React, { useEffect, useState } from 'react';
import { useQuery, gql, useMutation } from "@apollo/client"
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import TextArea from 'antd/lib/input/TextArea';
import {GET_VENUES, GET_EVENT} from '../../GraphQL/Queries'
import {UPDATE_EVENT} from '../../GraphQL/Mutations'

const EditEvent = () =>  {
  //const { Option } = Select;

  //gets id from browser URL
  const navigate = useNavigate();
  const { id } = useParams();

  let  [updateOneEvent, {updateError}] = useMutation(UPDATE_EVENT)
  const updateEvent = () => {
    updateOneEvent({
      variables: {
        "eventId": id,
        "name": eventname,
        "age_restriction": age_restriction ,
        "info": eventinfo,
        "note": eventnote,
        "tickets_capacity": tickets_capacity,
        "tickets_sold": tickets_sold,
        "tickets_limit": tickets_limit, 
        "timestamp":timestamp,
        "venueId": venueId
      }
    })
    
    if(updateError){
      console.log(updateError);
    }
  }

  
  const {error, data, loading} = useQuery(GET_EVENT, {variables: {"eventId": id}});
  
  const [venues, setVenues] = useState([])
  const {error: venueError, data:venueData, loading:venueLoading} = useQuery(GET_VENUES)

  useEffect(() => {
    if(venueData){
      let tmp = venueData.venues.map((venue) => ({label: venue.name, value: venue._id, key: venue._id}))
      setVenues(tmp)
    }
  }, [venueData])

  

  const [form] = Form.useForm(); 
  let eventname = Form.useWatch('eventname', form)
  let age_restriction = Form.useWatch('age_restriction', form)
  let eventinfo = Form.useWatch('eventinfo', form)
  let eventnote = Form.useWatch('eventnote', form)
  let tickets_capacity = Form.useWatch('tickets_capacity', form)
  let tickets_sold = Form.useWatch('tickets_sold', form)
  let tickets_limit = Form.useWatch('tickets_limit', form)
  let timestamp = Form.useWatch('timestamp', form)
  let venueId = Form.useWatch('eventvenue', form)
  
    return(
      <>
      <div className="site-page-header-ghost-wrapper">
        <PageHeader className='site-page-header' title={data?.event.name} onBack={() => navigate(-1)} extra={
                [
                    <Button onClick={() => {form.submit()}} key="submit" htmlType="submit" type="primary">Save</Button>
                ]
            }>
        </PageHeader>
      </div>
      <Card loading={loading}>
        <Form form={form} id="myform" layout="vertical" onFinish={updateEvent}>
         {/*  <Form.Item label="Date" initialValue={moment(data?.event.timestamp)}>
            <DatePicker name='datetime' allowClear={false} placeholder='Select Time & Date' defaultValue={moment(data?.event.timestamp)} format={"YYYY-MM-DD HH:MM:SSS"} showTime={true}/>
          </Form.Item> */}
          <Form.Item name='eventname' label="Event Title">
            <Input placeholder='Event Title' defaultValue={data?.event.name}/>
          </Form.Item>
          <Form.Item name="eventvenue" label="Event Venue">
            <Select defaultValue={data?.event.venue?.name} options={venues}>
            </Select>
          </Form.Item>
          <Form.Item name='eventinfo' label="Event Info">
            <TextArea autoSize="true" placeholder='Event Info' defaultValue={data?.event.info}></TextArea>
          </Form.Item>
          <Form.Item name='eventnote' label="Event Noter">
            <TextArea autoSize="true" placeholder='Event Noter' defaultValue={data?.event.note}></TextArea>
          </Form.Item>
          <Form.Item name='tickets_capacity' label="Capacity">
            <Input defaultValue={data?.event.tickets_capacity}></Input>
          </Form.Item>
          <Form.Item name='tickets_sold' label="Tickets Sold">
            <Input defaultValue={data?.event.tickets_sold}></Input>
          </Form.Item>
          <Form.Item name='tickets_limit' label="Ticket Limit">
            <Input defaultValue={data?.event.tickets_limit}></Input>
          </Form.Item>
          <Form.Item name='age_restriction' label="Age Restiction">
            <Input defaultValue={data?.event.age_restriction}></Input>
          </Form.Item>
        </Form>
      </Card>
      </>
  )

  }


export default EditEvent;