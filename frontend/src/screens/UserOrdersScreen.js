import React, { useState } from 'react'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from "../components/Message";
import Loader from "../components/Loader";

const UserOrdersScreen = () => {

    return(
        <>
            <Row>
                <h3> Past Orders </h3>
            </Row>
            <Row>
                <Col>
                    { loadingOrders ? <Loader /> : errorOrders ? <Message variant='danger'>{errorOrders}</Message> : (
                        <Table stripped bordered hover responsive className='table-sm'>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>Pick Up/Delivery</th>
                                <th>VIEW RECEIPT</th>
                            </tr>
                            </thead>
                            <tbody>
                            {orders.map(order => (
                                <tr key={order.order_id}>
                                    <td>{order.order_id}</td>
                                    <td>{order.createdAt.substring(0,10)}</td>
                                    <td>{order.total_price}</td>
                                    <td>{order.order_type}</td>
                                    <td>
                                        <LinkContainer to={`order/${order.order_id}`}>
                                            <Button className='btn-sm' variant='light'>View Receipt</Button>
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