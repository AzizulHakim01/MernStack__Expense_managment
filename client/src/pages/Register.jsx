import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Layout from '../components/Layout/Layout';
import {Form, Input, Button, message} from "antd";
import {Link, useNavigate} from 'react-router-dom';
import Spinner from '../components/Spinner';

const Register = () => { 
    
    // Spinner
    const [loading, setLoading] = useState(false)
      //Navigate
      const navigate = useNavigate();

      //submit handler
      const submitHandler = async (values) =>{
        try {
            setLoading(true)
        await axios.post('http://localhost:8080/api/v1/auth/register', values);
          message.success('Registration Successful');
          setLoading(false)
          navigate('/login')
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
                    <h1>REGISTER HERE</h1>
                    <Form layout='vertical'
                        onFinish={submitHandler}>
                        <Form.Item label="Name" name="name">
                            <Input type='text' className='form__input'/>
                        </Form.Item>
                        <Form.Item label="Email" name="email">
                            <Input type='email' className='form__input'/>
                        </Form.Item>
                        <Form.Item label="Password" name="password">
                            <Input type='password' className='form__input'/>
                        </Form.Item>
                        <h5>Already have an account? <Link to="/login">Login Here</Link> Here</h5>
                        <button className='form__button'>SIGN UP</button>
                    </Form>
                </div>
            </div>
        </Layout>
    )
}

export default Register
