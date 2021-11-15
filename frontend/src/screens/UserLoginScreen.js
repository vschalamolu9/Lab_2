import React, { useState, useEffect } from 'react'
import Loader from '../components/Loader'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/actions/userActions";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";


const UserLoginScreen = ({location, history}) => {

    const [emailId, setEmailId] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if(userInfo){
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(loginUser(emailId, password))
    }

    return(
        <FormContainer>
            <h3>Sign In</h3>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        required
                        type='email'
                        placeholder='Enter email'
                        value={emailId}
                        onChange={(e) => setEmailId(e.target.value)}
                    />
                </Form.Group>
                <br/>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <br/>
                <Button type='submit' className='btn-block btn-dark'>
                    Sign In
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    New Customer?{' '}
                    <Link to={redirect ? `/user/signup?redirect=${redirect}` : '/user/signup'}>
                        Sign Up
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default UserLoginScreen