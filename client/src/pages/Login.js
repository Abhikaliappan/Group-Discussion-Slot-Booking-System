import React from 'react'
import {Form,Input,Button,Image} from 'antd';
import {useDispatch} from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { hideLoading, showLoading } from '../redux/alertsSlice';
function Login(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onFinish = async(values)=>{
        try{
            dispatch(showLoading())
            const response = await axios.post('/api/user/login',values);
            dispatch(hideLoading())
            if(response.data.success){
                toast.success(response.data.messsage);
                toast("Login successfull");
                toast("Redirecting to home page");
                localStorage.setItem("token",response.data.data);
                navigate("/");
            }
            else{
                toast.error(response.data.message);
            }
        }
        catch (error){
            dispatch(hideLoading())
                toast.error("Something went wrong");
        }
    };
    
    return(
        <div className='authentication'>
            <div className='authentication-form card p-3'>
              <h1 className='card-title'>
                Welcome Back!</h1>  
                <Form layout='vertical' onFinish={onFinish}>
                    <Image src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYB-39YIn8M7nenZPpLqrS485KtB_nMVAvgA&s' className='bitlogo'
                    width={200}
                    height={200}>
                    </Image>
                    <Form.Item label='Email' name='email'>
                        <Input placeholder='Email'/>
                    </Form.Item>
                    <Form.Item label='Password' name='password'>
                        <Input placeholder='Password' type='password'/>
                    </Form.Item>

                    <Button className='primary-button my-2' htmlType='submit'>
                    LOGIN
                </Button>
                <Link to='/register' className='anchor'>
                Click here to Register
                </Link>
                </Form>
                

            </div>
        </div>
    )
}

export default Login