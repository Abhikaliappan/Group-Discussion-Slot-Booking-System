import React from 'react';
import Layout from '../components/Layout';
import { Form, Input, Row, Col, Button, TimePicker, DatePicker, message } from 'antd';
import axios from 'axios';

function AddFaculty() {
    const [form] = Form.useForm();  

    const onFinish = async (values) => {
        try {
            const formattedValues = {
                firstName: values.firstName,
                lastName: values.lastName,
                phoneNumber: values.phoneNumber,
                department: values.department,
                designation: values.designation,
                date: values.date.format('YYYY-MM-DD'), // Ensure date is optional
                timings: values.timings.map(time => time.format('HH:mm')), // Ensure timings is optional
            };
    
            const response = await axios.post('/api/faculties/add', formattedValues);
    
            if (response.data.success) {
                message.success("Faculty added successfully");
                form.resetFields();
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            message.error("Failed to add faculty");
        }
    };

    return (
        <Layout>
            <h1 className='page-title'>Add Faculty</h1>
            <hr />
            <Form form={form} layout='vertical' onFinish={onFinish}>
                <h1 className='card-title mt-3'>Faculty Details</h1>
                <Row gutter={20}>
                    <Col span={8}>
                        <Form.Item label="First Name" name='firstName' rules={[{ required: true }]}>
                            <Input placeholder='First Name' />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Last Name" name='lastName' rules={[{ required: true }]}>
                            <Input placeholder='Last Name' />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Phone Number" name='phoneNumber' rules={[{ required: true }]}>
                            <Input placeholder='Phone Number' />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Department" name='department' rules={[{ required: true }]}>
                            <Input placeholder='Department' />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Designation" name='designation' rules={[{ required: true }]}>
                            <Input placeholder='Designation' />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Date" name='date' rules={[{ required: true }]}>
                            <DatePicker style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Timings" name='timings' rules={[{ required: true }]}>
                            <TimePicker.RangePicker format="HH:mm" />
                        </Form.Item>
                    </Col>
                </Row>
                <div className='d-flex justify-content-end'>
                    <Button className='submit' htmlType='submit'>SUBMIT</Button>
                </div>
            </Form>
        </Layout>
    );
}

export default AddFaculty;
