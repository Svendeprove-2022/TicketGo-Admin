import { useMutation, useQuery } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Button, Form, Input, DatePicker, Card, Select, TimePicker, PageHeader } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { GET_VENUE } from '../../GraphQL/Queries';
import { UPDATE_VENUE } from '../../GraphQL/Mutations';

const VenueEdit = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [form] = Form.useForm();
    let venuename = Form.useWatch('venuename', form)
    let city = Form.useWatch('city', form);
    let country = Form.useWatch('country', form);
    let address = Form.useWatch('address', form);
    let zip_code = Form.useWatch('zip_code', form);
    let note = Form.useWatch('note', form);
    let url = Form.useWatch('url', form);

    const {readError, data, loading } = useQuery(GET_VENUE, {variables:{
        "venueId": id
    }})

    let [updateOneVenue, {updateError}] = useMutation(UPDATE_VENUE)
    const updateVenue = () => {
        updateOneVenue({
            variables: {
                "venueId": id,
                "venuename": venuename,
                "city": city,
                "country": country,
                "address": address,
                "zip_code": zip_code,
                "note": note,
                "url": url
            }
            
        })
    }

    return(
        <>
        <PageHeader className='site-page-header' title={data?.venue.name} onBack={() => navigate(-1)} extra={
                [
                    <Button onClick={() => {form.submit()}} key="submit" htmlType="submit" type="primary">Save</Button>
                ]
            }>
        </PageHeader>
        <Card loading={loading}>
            <Form form={form} name='Venue' layout="vertical" autoComplete='off' onFinish={updateVenue} initialValues={{
                venuename: `${data?.venue.name}`,
                address: `${data?.venue.address}`,
                city: `${data?.venue.city}`,
                country: `${data?.venue.country}`,
                zip_code: `${data?.venue.zip_code}`,
                note: `${data?.venue.note}`,
                url: `${data?.venue.url}`
            }}>
                <Form.Item name="venuename" label="Venue Name">
                    <Input placeholder='Venue Name'></Input>
                </Form.Item>
                <Form.Item name="address" label="Address">
                    <Input placeholder='Address'></Input>
                </Form.Item>
                <Form.Item name="city" label="City">
                    <Input placeholder='City'></Input>
                </Form.Item>
                <Form.Item name="country" label="Country">
                    <Input placeholder='Country'></Input>
                </Form.Item>
                <Form.Item name="zip_code" label="Zip Code">
                    <Input placeholder='Zip Code'></Input>
                </Form.Item>
                <Form.Item name='note' label="Venue Note">
                    <TextArea autoSize="true" placeholder='Venue Note'></TextArea>
                </Form.Item>
                <Form.Item name="url" label="Url">
                    <Input placeholder='Url'></Input>
                </Form.Item>
            </Form>
        </Card>
        </>
    )
}

export default VenueEdit