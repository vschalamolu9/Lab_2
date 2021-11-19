import React, { useEffect, useState } from 'react'
import {Button, Row, Col, Table, Form} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from "../components/Message";
import Loader from "../components/Loader";
import { fetchRestaurantOrders } from "../redux/actions/orderActions";
import { UPDATE_ORDER_STATUS_RESET } from '../redux/constants/orderConstants'

const RestaurantOrdersScreen = () => {

    const dispatch = useDispatch()

    const restaurantLogin = useSelector(state => state.restaurantLogin)
    const { restaurantData } = restaurantLogin

    const restaurantOrders = useSelector(state => state.restaurantOrders)
    const { loading, error, restaurantOrdersList } = restaurantOrders

    useEffect(() => {
        dispatch({type: UPDATE_ORDER_STATUS_RESET})
        dispatch(fetchRestaurantOrders(restaurantData._id))
    }, [dispatch])


    return(
        <>
            <Row>
                <h3> Past Orders </h3>
            </Row>
            <Row>
                <Col>
                    { loading ? <Loader /> : error ? <Message variant='danger'>{ error }</Message> : (
                        <Table stripped bordered hover responsive className='table-sm'>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>Pick Up/Delivery</th>
                                <th>ORDER STATUS</th>
                                <th>TOTAL</th>
                                <th>VIEW ORDER</th>
                            </tr>
                            </thead>
                            <tbody>
                            {restaurantOrdersList.map((order, index) => (
                                <tr key={ index }>
                                    <td>{ index+1 }</td>
                                    <td>{order.orderDate.substring(0,10)}</td>
                                    <td>{order.orderType}</td>
                                    <td>{order.orderStatus}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>
                                        <LinkContainer to={`/res/order/${order._id}`}>
                                            <Button className='btn-sm btn-dark' variant='light'>View Order</Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    )}
                </Col>
            </Row>
        </>


    )
}

export default RestaurantOrdersScreen