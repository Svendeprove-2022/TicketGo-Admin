import { useMutation } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Button, Form, Input, DatePicker, Card, Select, TimePicker, PageHeader } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { CREATE_VENUE } from '../../GraphQL/Mutations';

const VenueCreate = () => {
    const navigate = useNavigate();

    const [form] = Form.useForm();
    let venuename = Form.useWatch('venuename', form);
    let city = Form.useWatch('city', form);
    let country = Form.useWatch('country', form);
    let address = Form.useWatch('address', form);
    let zip_code = Form.useWatch('zip_code', form);
    let note = Form.useWatch('note', form);
    let url = Form.useWatch('url', form);

    const [createOneVenue, {createError}] = useMutation(CREATE_VENUE);
    const createVenue = () => {
        createOneVenue({
            variables: {
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
        <PageHeader className='site-page-header' title={"Create Venue"} onBack={() => navigate(-1)} extra={
                [
                    <Button onClick={() => {form.submit()}} key="submit" htmlType="submit" type="primary">Create</Button>
                ]
            }>
        </PageHeader>
        <Card>
            <Form form={form} name='Venue' layout="vertical" autoComplete='off' onFinish={createVenue}>
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

                {/* <Form.Item wrapperCol={{span:8}}>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item> */}
            </Form>
        </Card>
        </>
    )
}

export default VenueCreate