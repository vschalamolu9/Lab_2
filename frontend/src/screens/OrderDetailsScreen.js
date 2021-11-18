import React, { useEffect } from "react";
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import { getOrderDetails } from "../redux/actions/orderActions";
import Message from "../components/Message";
import Loader from "../components/Loader";

const OrderDetailsScreen = ({match}) => {

    const dispatch = useDispatch()

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(async () => {
        if(!order || (order._id !== match.params.id)){
            await dispatch(getOrderDetails(match.params.id))
        }
    }, [match, order, dispatch])

    return(
        loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
        <>
            { order._id && <Message variant='success'>Order Placed Successfully.</Message> }
            <Row>
                <h3>Order: {order._id}</h3>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            { order.orderType === 'Delivery' ?  <h3>Delivery</h3> : <h3>Pick Up</h3> }
                                <Row>
                                    <strong>Name: {userInfo.firstName} {userInfo.lastName}</strong>
                                </Row>
                                <Row>
                                    <strong> Email: <Link to={`${userInfo.emailId}`}>{userInfo.emailId}</Link></strong>
                                </Row>

                                <strong>Address: </strong>
                                {order.deliveryAddress.street}, {order.deliveryAddress.city}{' '}
                                {order.deliveryAddress.province}, {order.deliveryAddress.zipCode}{' '}
                                {order.deliveryAddress.country}

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
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default OrderDetailsScreen