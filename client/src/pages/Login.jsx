import React, {useEffect, useState} from 'react'
import Layout from '../components/Layout/Layout'
import {Form, Input, message} from "antd"
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import Spinner from '../components/Spinner'

const Login = () => { // Spinner
    const [loading, setLoading] = useState(false)
    // Navigate
    const navigate = useNavigate();

    // sumit handler
    const submitHandler = async (values) => {
        try {
            setLoading(true)
            const {data} = await axios.post('http://localhost:8080/api/v1/auth/login', values);
            message.success('Login Successful');
            setLoading(false)
            localStorage.setItem('auth', JSON.stringify({
                ...data.user,
                password: ''
            }))
            navigate('/')
        } catch (error) {
            setLoading(false)
            message.error('Something went wrong')
        }
    }

    //prevent for login user
    useEffect(()=>{
      if(localStorage.getItem("auth")){
          navigate("/")
      }
    },[navigate])

    return (
        <Layout>
          {loading && <Spinner/>}
            <div className="d-flex align-items-center-justify-content-center register-page">
                <div className="form__container">
                    <h1>LOGIN HERE</h1>
                    <Form layout='vertical'
                        onFinish={submitHandler}>
                        <Form.Item label="Email" name="email">
                            <Input type='email' className='form__input'/>
                        </Form.Item>
                        <Form.Item label="Password" name="password">
                            <Input type='password' className='form__input'/>
                        </Form.Item>
                        <h5>Don't have an account?
                            <Link to="/register">Sign Up</Link>
                            Here</h5>
                        <button className='form__button'>LOGIN</button>
                    </Form>
                </div>
            </div>
        </Layout>
    )
}

export default Login
