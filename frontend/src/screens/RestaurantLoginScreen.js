import React, { useState, useEffect } from 'react'
import Loader from '../components/Loader'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import { loginRestaurant } from '../redux/actions/restaurantActions';
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";


const RestaurantLoginScreen = ({location, history}) => {

    const [restaurantEmail, setRestaurantEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const restaurantLogin = useSelector(state => state.restaurantLogin)
    const { loading, error, restaurantData } = restaurantLogin

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if(restaurantData){
            history.push('/res/profile')
        }
    }, [history, restaurantData, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(loginRestaurant(restaurantEmail, password))
    }

    return(
        <FormContainer>
            <h3>Restaurant Sign In</h3>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='restaurantEmail'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        required
                        type='email'
                        placeholder='Enter email'
                        value={restaurantEmail}
                        onChange={(e) => setRestaurantEmail(e.target.value)}
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
                    <b>Sign In as Restaurant</b>
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    New Restaurant?{' '}
                    <Link to={redirect ? `/res/signup?redirect=${redirect}` : '/res/signup'}>
                        Sign Up as Restaurant
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RestaurantLoginScreen