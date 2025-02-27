import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Table, Button, Popconfirm, message } from 'antd';

function Faculties() {
    const [facultyList, setFacultyList] = useState([]);

    useEffect(() => {
        const storedFaculties = JSON.parse(localStorage.getItem('faculties')) || [];
        setFacultyList(storedFaculties);
    }, []);
    const deleteFaculty = (phoneNumber) => {
        const updatedList = facultyList.filter(faculty => faculty.phoneNumber !== phoneNumber);

      
        setFacultyList(updatedList);
        localStorage.setItem('faculties', JSON.stringify(updatedList));

        message.success('Faculty deleted successfully');
    };

    const columns = [
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName'
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName'
        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber'
        },
        {
            title: 'Department',
            dataIndex: 'department',
            key: 'department'
        },
        {
            title: 'Designation',
            dataIndex: 'designation',
            key: 'designation'
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date'
        },
        {
            title: 'Timings',
            dataIndex: 'timings',
            key: 'timings',
            render: timings => `${timings[0]} - ${timings[1]}`  // Format time range
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Popconfirm
                    title="Are you sure you want to delete this faculty?"
                    onConfirm={() => deleteFaculty(record.phoneNumber)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button type="primary" danger>Delete</Button>
                </Popconfirm>
            )
        }
    ];

    return (
        <Layout>
            <h1 className='page-title'>Faculty List</h1>
            <Table dataSource={facultyList} columns={columns} rowKey="phoneNumber" />
        </Layout>
    );
}

export default Faculties;
