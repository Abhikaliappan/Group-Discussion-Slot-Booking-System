import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Table, Button, Popconfirm, message, Spin } from 'antd';
import axios from 'axios';

function Faculties() {
    const [facultyList, setFacultyList] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // Hook to navigate to faculty details page

    const fetchFacultyList = async () => {
        try {
            const response = await axios.get(`/api/faculties/get-all`);
            if (response.data.success) {
                setFacultyList(response.data.data);
                console.log(response.data.data);
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            message.error("Failed to fetch faculty list");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFacultyList();
    }, []);

    const deleteFaculty = async (id) => {
        try {
            const response = await axios.delete(`/api/faculties/delete/${id}`);
            if (response.data.success) {
                message.success('Faculty deleted successfully');
                fetchFacultyList(); // Refresh the list
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            message.error("Failed to delete faculty");
        }
    };

    const columns = [
        { title: 'First Name', dataIndex: 'firstName', key: 'firstName' },
        { title: 'Last Name', dataIndex: 'lastName', key: 'lastName' },
        { title: 'Phone Number', dataIndex: 'phoneNumber', key: 'phoneNumber' },
        { title: 'Department', dataIndex: 'department', key: 'department' },
        { title: 'Designation', dataIndex: 'designation', key: 'designation' },
        { title: 'Date', dataIndex: 'date', key: 'date' },
        { 
            title: 'Timings', 
            dataIndex: 'timings', 
            key: 'timings', 
            render: timings => 
                Array.isArray(timings) && timings.length >= 2 
                    ? `${timings[0]} - ${timings[1]}` 
                    : 'N/A' // Handle cases where timings is undefined or not an array
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Popconfirm
                    title="Are you sure you want to delete this faculty?"
                    onConfirm={() => deleteFaculty(record._id)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button type="primary" danger>Delete</Button>
                </Popconfirm>
            )
        }
    ];
    
    if (loading) {
        return (
            <Layout>
                <Spin size="large" />
            </Layout>
        );
    }

    return (
        <Layout>
            <h1 className='page-title'>Faculty List</h1>
            <Table
                dataSource={facultyList}
                columns={columns}
                rowKey="_id"
                onRow={(record) => ({
                    onClick: () => navigate(`/faculty/${record._id}`)
                })}
                style={{ cursor: 'pointer' }}
            />
        </Layout>
    );
}

export default Faculties;
