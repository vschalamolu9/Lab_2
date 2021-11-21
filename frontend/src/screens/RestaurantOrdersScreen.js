import React, { useEffect, useState } from 'react'
import {Button, Row, Col, Table, Form, Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from "../components/Message";
import Loader from "../components/Loader";
import { fetchRestaurantOrders } from "../redux/actions/orderActions";
import { UPDATE_ORDER_STATUS_RESET } from '../redux/constants/orderConstants'

const RestaurantOrdersScreen = ({match}) => {

    const pageNumber = match.params.pageNumber || 1

    const [pageSize, setPageSize] = useState('')

    const dispatch = useDispatch()

    const restaurantLogin = useSelector(state => state.restaurantLogin)
    const { restaurantData } = restaurantLogin

    const restaurantOrders = useSelector(state => state.restaurantOrders)
    const { loading, error, restaurantOrdersList, page, pages } = restaurantOrders

    useEffect(() => {
        dispatch({type: UPDATE_ORDER_STATUS_RESET})
        dispatch(fetchRestaurantOrders(restaurantData._id, pageNumber, pageSize))
    }, [dispatch, pageNumber, pageSize])


    return(
        <>
            <Row>
                <h3> Restaurant Orders </h3>
                <Form>
                    <Form.Group controlId='orderStatus'>
                        <Form.Control as='select' value={pageSize} onChange={x => setPageSize(x.target.value)}>
                            <option value='2'>2</option>
                            <option value='5'>5</option>
                            <option value='10'>10</option>
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Row>
            <br/>
            <Row>
                <Col>
                    { loading ? <Loader /> : error ? <Message variant='danger'>{ error }</Message> : (
                        <>
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
                                        <td>${order.totalPrice}</td>
                                        <td>
                                            <LinkContainer to={`/res/order/${order._id}`}>
                                                <Button className='btn-sm btn-dark' variant='light'>View Order</Button>
                                            </LinkContainer>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                            <Pagination>
                                {[...Array(pages).keys()].map(x => (
                                    <LinkContainer key={x+1} to={`/res/orders/${x+1}`}>
                                        <Pagination.Item active={x+1 === page}>{x+1}</Pagination.Item>
                                    </LinkContainer>
                                ))}
                            </Pagination>
                        </>
                    )}
                </Col>
            </Row>
        </>


    )
}

export default RestaurantOrdersScreen