import React, { useEffect } from 'react'
import { Button, Row, Col, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from "../components/Message";
import Loader from "../components/Loader";
import { fetchRestaurantOrders } from "../redux/actions/orderActions";

const RestaurantOrdersScreen = () => {

    const dispatch = useDispatch()

    const restaurantLogin = useSelector(state => state.restaurantLogin)
    const { restaurantData } = restaurantLogin

    const restaurantOrders = useSelector(state => state.restaurantOrders)
    const { loading, error, restaurantOrdersList } = restaurantOrders

    useEffect(() => {
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
                                <th>VIEW RECEIPT</th>
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

export default RestaurantOrdersScreen