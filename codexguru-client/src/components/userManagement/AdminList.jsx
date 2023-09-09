"use client";
import React, { useEffect, useState } from "react";
import { Table, Button, Popconfirm, Modal, Form, Input, Select } from 'antd';
import { Empty } from 'antd';
import { message } from 'antd';


const { Option } = Select;

export default function AdminList() {
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editedUserData, setEditedUserData] = useState({});
    const [form] = Form.useForm();

    useEffect(() => {
        async function getAdmins() {
            try {
                const res = await fetch("http://localhost:5000/api/v1/users/");
                if (res.ok) {
                    const allUsers = await res.json();
                    // Filter users with role "admins"
                    const admins = allUsers.filter(user => user.role === "admin");
                    setAllUsers(admins);
                    setLoading(false);
                } else {
                    console.log("Error fetching data from the server");
                }
            } catch (error) {
                console.error("An error occurred:", error);
            }
        }
    
        getAdmins();
    }, []);
    

    const columns = [
        {
            title: 'User Reg number',
            dataIndex: 'userRegNo',
            key: 'userRegNo',
        },
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <span>
                    <Popconfirm
                        title="Are you sure to delete this user?"
                        onConfirm={() => handleDelete(record._id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="text" danger style={{ marginRight: 20 }}>Delete</Button>
                    </Popconfirm>
                    <Button type="primary" onClick={() => handleEdit(record)}>Edit</Button>
                </span>
            ),
        },
    ];

    const handleEdit = (record) => {
        setEditedUserData(record);
        setEditModalVisible(true);
        form.setFieldsValue(record);
    };


    const handleDelete = async (_id) => {
        try {
            // Send a DELETE request to your MongoDB API endpoint with the _id
            const res = await fetch(`http://localhost:5000/api/v1/users/${_id}`, {
                method: 'DELETE',
            });
    
            if (res.ok) {
                // If the delete request was successful, remove the user from the state
                setAllUsers((prevUsers) => prevUsers.filter((user) => user._id !== _id));
                
                // Display a success message
                message.success('User deleted successfully');
            } else {
                console.error('Failed to delete user:', res.status, res.statusText);
    
                // Display an error message
                message.error('Failed to delete user');
            }
        } catch (error) {
            console.error('An error occurred:', error);
    
            // Display an error message
            message.error('An error occurred while deleting user');
        }
    };
    

    const handleEditModalOk = () => {
        form.validateFields().then((values) => {
            fetch(`http://localhost:5000/api/v1/users/${editedUserData._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            })
            .then((response) => {
                if (response.ok) {
                    // Update the user's data in the state
                    setAllUsers((prevUsers) =>
                        prevUsers.map((user) =>
                            user._id === editedUserData._id ? { ...user, ...values } : user
                        )
                    );
                    setEditModalVisible(false);
    
                    // Display a success message
                    message.success('User updated successfully');
                } else {
                    console.error('Failed to update user:', response.status, response.statusText);
    
                    // Display an error message
                    message.error('Failed to update user');
                }
            })
            .catch((error) => {
                console.error('An error occurred:', error);
    
                // Display an error message
                message.error('An error occurred while updating user');
            });
        });
    };

    const handleEditModalCancel = () => {
        setEditModalVisible(false);
    };

    return (
        <>
            {allUsers.length === 0 ? (
                <Empty />
            ) : (
                <Table
                    columns={columns}
                    dataSource={allUsers}
                    loading={loading}
                    pagination={{ pageSize: 5 }}
                // style={{ width: '80%', height: '400px' }}
                />
            )}
            <Modal
            
                title="Edit User"
                visible={editModalVisible}
                onOk={handleEditModalOk}
                onCancel={handleEditModalCancel}
                
            >
                <Form form={form} layout="vertical" style={{height:400}}>
                    <Form.Item
                        name="userRegNo"
                        label="User Reg number"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="firstName"
                        label="First Name"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="lastName"
                        label="Last Name"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="role"
                        label="Role"
                    >
                        <Select>
                            <Option value="student">Student</Option>
                            <Option value="instructor">Lab Instructor</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}
