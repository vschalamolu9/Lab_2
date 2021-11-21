import React, { useEffect, useState } from "react";
import {Row, Col, ListGroup, Image, Card, Button, Form} from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import { getOrderDetails, updateOrderStatus } from "../redux/actions/orderActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {UPDATE_ORDER_STATUS_RESET} from "../redux/constants/orderConstants";

const RestaurantOrderDetailsScreen = ({match, history}) => {

    const dispatch = useDispatch()

    const [orderStatus, setOrderStatus] = useState('In Process')

    const restaurantLogin = useSelector(state => state.restaurantLogin)
    const { restaurantData } = restaurantLogin

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails

    const updateOrder = useSelector(state => state.updateOrder)
    const { success } = updateOrder

    useEffect(async () => {
        if(!restaurantData){
            history.push('/res/login')
        }
        dispatch({type: UPDATE_ORDER_STATUS_RESET})
        if(success){
            history.push('/res/orders')
        }
        dispatch(getOrderDetails(match.params.id))
    }, [match, dispatch, history, success])

    const orderStatusHandler = (e) => {
        e.preventDefault()
        dispatch(updateOrderStatus(order._id, orderStatus))
    }


    return(
        loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
            <>
                { order._id && <Message variant='success'>Order {order.orderStatus} Successfully.</Message> }
                <Row>
                    <h3>Order: {order._id}</h3>
                    <Col md={8}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                { order.orderType === 'Delivery' ?  <h3>Delivery</h3> : <h3>Pick Up</h3> }

                                <strong>Address: </strong>
                                {order.deliveryAddress.street}, {order.deliveryAddress.city}{' '}
                                {order.deliveryAddress.province}, {order.deliveryAddress.zipCode}{' '}
                                {order.deliveryAddress.country}

                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h2>Special Instructions</h2>
                                <strong>Instructions: </strong>
                                {order.instructions}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h2>Payment Method</h2>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h2>Order Type</h2>
                                <strong>Type: </strong>
                                {order.orderType}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h4>Order Items</h4>
                                { order.orderItems.length === 0 ? <Message>Your don't have any items in your order.</Message> : (
                                    <ListGroup variant='flush'>
                                        { order.orderItems.map((orderItem, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={orderItem.image} alt={orderItem.dishName} fluid rounded />
                                                    </Col>
                                                    <Col>
                                                        <Link to={`/dish/${orderItem.product}`}>{orderItem.dishName}</Link>
                                                    </Col>
                                                    <Col md={4}>
                                                        {orderItem.qty} x ${orderItem.dishPrice} = ${(orderItem.qty * orderItem.dishPrice).toFixed(2)}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={4}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h2>Order Summary</h2>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Items</Col>
                                        <Col>${order.totalPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Delivery</Col>
                                        <Col>${order.deliveryPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Tax</Col>
                                        <Col>${order.taxPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Total</Col>
                                        <Col>${order.totalPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                { (order.orderStatus === 'Placed' || order.orderStatus==='Preparing') &&

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Update Order Status</Col>
                                        <Col>
                                            <Form onSubmit={orderStatusHandler}>
                                                <Form.Group controlId='orderStatus'>
                                                    <Form.Control as='select' value={orderStatus} onChange={x => setOrderStatus(x.target.value)}>
                                                        <option value='Preparing'>Preparing</option>
                                                        { order.orderType === 'PickUp' ? (<option value='Picked Up'>Picked Up</option>) : (<option value='Delivered'>Delivered</option>)}
                                                        <option value='Cancelled'>Cancelled</option>
                                                    </Form.Control>
                                                </Form.Group>
                                                <br/>
                                                <Button type='submit'  className='btn-block btn-dark'>
                                                    <b>Update Status</b>
                                                </Button>
                                            </Form>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                }
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </>
    )
}

export default RestaurantOrderDetailsScreen