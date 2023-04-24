import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {message} from 'antd'

const Header = () => {
    const navigate = useNavigate()
    const [loginUser, setLoginUser] = useState('')
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('auth'))
        if(user){
            setLoginUser(user)
        }
    },[])

    // handle Logout
    const handleLogout = () =>{
        localStorage.removeItem('auth')
        message.success('Logout Suucessfully')
        navigate('/login')
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <img src="/logo.png" alt="logo" style={{width:"250px"}}/>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            {loginUser? (<>
                                <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/User">{loginUser && loginUser.name}</Link>
                            </li>
                            <li className='nav-item'>
                                <button className='btn btn-primary' onClick={handleLogout}>Logout</button>
                            </li>
                            </>):
                            (<>
                                <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                            <li className="nav-item ">
                                <Link className="nav-link" to="/register" >
                                    Register
                                </Link>
                            </li>
                            </>)}
                        </ul>
                    </div>
                </div>
            </nav>

        </div>
    )
}

export default Header
