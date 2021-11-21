import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import {saveOrderType, savePaymentMethod} from '../redux/actions/cartActions';
import CheckOutSteps from "../components/CheckOutSteps";

const PaymentScreen = ({history}) => {

    const cart = useSelector(state => state.cart)
    const {deliveryAddress} = cart

    if(!deliveryAddress){
        history.push('/user/delivery')
    }

    const restaurantDetails = useSelector(state => state.restaurantDetails)
    const { restaurantInfo } = restaurantDetails

    const [paymentMethod, setPaymentMethod] = useState('PayPal')
    const [orderType, setOrderType] = useState('Delivery')

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        dispatch(saveOrderType(orderType))
        history.push('/user/placeorder')
    }

    return(
        <FormContainer>
            <CheckOutSteps step1 step2 />
            <h1>Select Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Payment Method</Form.Label>
                    <Col>
                        <Form.Check
                            type='radio'
                            label='PayPal or Credit Card'
                            id='PayPal'
                            name='paymentMethod'
                            value='PayPal'
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <Form.Check
                            type='radio'
                            label='Stripe'
                            id='Stripe'
                            name='paymentMethod'
                            value='Stripe'
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <Form.Group>
                    <Form.Label as='legend'>Select Payment Method</Form.Label>
                    <Col>
                        { restaurantInfo.restaurantType === 'Both' ?
                        <>
                            <Form.Check
                                type='radio'
                                label='Delivery'
                                id='Delivery'
                                name='orderType'
                                value='Delivery'
                                checked
                                onChange={(e) => setOrderType(e.target.value)}
                            />
                            <Form.Check
                            type='radio'
                            label='Pick Up'
                            id='pickUp'
                            name='orderType'
                            value='PickUp'
                            onChange={(e) => setOrderType(e.target.value)}
                        />
                        </> : restaurantInfo.restaurantType === 'Delivery' ? <Form.Check
                                type='radio'
                                label='Delivery'
                                id='Delivery'
                                name='orderType'
                                value='Delivery'
                                checked
                                onChange={(e) => setOrderType(e.target.value)}
                            /> : <Form.Check
                                type='radio'
                                label='Pick Up'
                                id='pickUp'
                                name='orderType'
                                value='Pick Up'
                                onChange={(e) => setOrderType(e.target.value)}
                            />}
                    </Col>
                </Form.Group>
                <br/>
                <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen;