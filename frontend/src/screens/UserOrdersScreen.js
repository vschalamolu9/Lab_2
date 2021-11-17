import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from "../components/Message";
import Loader from "../components/Loader";
import { fetchUserOrders } from "../redux/actions/orderActions";

const UserOrdersScreen = () => {

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userOrders = useSelector(state => state.userOrders)
    const { loading, error, userOrdersList } = userOrders

    useEffect(() => {
        dispatch(fetchUserOrders(userInfo._id))
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
                                <th>VIEW RECEIPT</th>
                            </tr>
                            </thead>
                            <tbody>
                            {userOrdersList.map((order, index) => (
                                <tr key={ index }>
                                    <td>{ index+1 }</td>
                                    <td>{order.orderDate.substring(0,10)}</td>
                                    <td>{order.orderType}</td>
                                    <td>{order.orderStatus}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>
                                        <LinkContainer to={`/user/order/${order._id}`}>
                                            <Button className='btn-sm btn-dark' variant='light'>View Receipt</Button>
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

export default UserOrdersScreen