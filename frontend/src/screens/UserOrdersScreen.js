import React, { useEffect, useState } from 'react'
import {Button, Row, Col, Table, Form, Pagination} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from "../components/Message";
import Loader from "../components/Loader";
import { fetchUserOrders } from "../redux/actions/orderActions";

const UserOrdersScreen = ({match}) => {

    const pageNumber = match.params.pageNumber || 1

    const [pageSize, setPageSize] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userOrders = useSelector(state => state.userOrders)
    const { loading, error, userOrdersList, page, pages } = userOrders

    useEffect(() => {
        dispatch(fetchUserOrders(userInfo._id, pageNumber, pageSize))
    }, [dispatch, pageNumber, pageSize])



    return(
        <>
            <Row>
                <h3> Your Orders </h3>
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
                                        <td>${order.totalPrice}</td>
                                        <td>
                                            <LinkContainer to={`/user/order/${order._id}`}>
                                                <Button className='btn-sm btn-dark' variant='light'>View Receipt</Button>
                                            </LinkContainer>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                            <br/>
                            <Pagination>
                                {[...Array(pages).keys()].map(x => (
                                    <LinkContainer key={x+1} to={`/user/orders/${x+1}`}>
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

export default UserOrdersScreen