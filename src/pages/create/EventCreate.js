import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from "@apollo/client";
import { Button, Form, Input, DatePicker, Card, Select, TimePicker } from 'antd';
import moment from 'moment';
import TextArea from 'antd/lib/input/TextArea';
import {CREATE_EVENT} from '../../GraphQL/Mutations';
import {GET_VENUES} from '../../GraphQL/Queries';

const CreateEvent = () => {
    const { RangePicker } = DatePicker;

    const {error: venueError, data:venueData, loading:venueLoading} = useQuery(GET_VENUES)
    const [venues, setVenues] = useState([])
    const [eventstart, setEventstart] = useState()
    const [eventend, setEventEnd] = useState()
    const [eventspan, setEventSpan] = useState()
    const [evententry, setEventEntry] = useState()

    useEffect(() => {
        if(venueData){
            let tmp = venueData.venues.map((venue) => ({label: venue.name, value: venue._id}))
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
    let venueId = Form.useWatch('eventvenue', form)

    let [createOneEvent, {createError}] = useMutation(CREATE_EVENT)
    
    const createEvent = () => {
            createOneEvent({
                variables: {
                    "eventName": eventname,
                    "venueId": venueId,
                    "eventinfo": eventinfo,
                    "eventnote": eventnote,
                    "tickets_capacity": tickets_capacity,
                    "tickets_limit": tickets_limit,
                    "tickets_sold": tickets_sold,
                    "age_restriction": age_restriction,
                    "eventstart": eventstart,
                    "eventend": eventend,
                    "eventspan": eventspan,
                    "evententry": evententry
                }
            })

        if(createError){
            console.log(createError)
        }
    }

    const onDateChange = (date, dateString) => {
        let span = moment(date[1]).diff(date[0], 'days')
        setEventSpan(span)
        setEventstart(date[0])
        setEventEnd(date[0])
    }

    

   const onStartTimeChange = (time, timeString) => {
       setEventEntry(time)
   }


    return(
    <>
    <Card>
    <Form form={form} name='Event' autoComplete='off' onFinish={createEvent}>
        <Form.Item label="Date">
            <RangePicker name='eventtime' format={"YYYY-MM-DD hh:mm"} onChange={onDateChange} showTime/>
        </Form.Item>
        <Form.Item label="Entry Time">
            <TimePicker name='starttime' format={"YYYY-MM-DDhh:mm"} onChange={onStartTimeChange} showTime/>
        </Form.Item>
        <Form.Item label="Event name" name="eventname"><Input /></Form.Item>
        <Form.Item name="eventvenue" label="Event Venue">
            <Select options={venues}></Select>
        </Form.Item>
        <Form.Item name='eventinfo' label="Event Info">
            <TextArea autoSize="true" placeholder='Event Info'></TextArea>
          </Form.Item>
          <Form.Item name='eventnote' label="Event Noter">
            <TextArea autoSize="true" placeholder='Event Noter'></TextArea>
          </Form.Item>
          <Form.Item name='tickets_capacity' label="Capacity">
            <Input></Input>
          </Form.Item>
          <Form.Item name='tickets_sold' label="Tickets Sold">
            <Input></Input>
          </Form.Item>
          <Form.Item name='tickets_limit' label="Ticket Limit">
            <Input></Input>
          </Form.Item>
          <Form.Item name='age_restriction' label="Age Restiction">
            <Input></Input>
          </Form.Item>

        <Form.Item wrapperCol={{span:8}}>
                <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
    </Form>
    </Card>
    </>
    )
}

export default CreateEvent