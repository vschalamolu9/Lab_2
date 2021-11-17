import React, { useEffect } from 'react'
import { Button, Row, Col, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listDishes } from "../redux/actions/restaurantActions";

const RestaurantMenuScreen = () => {

    const dispatch = useDispatch()

    const restaurantLogin = useSelector(state => state.restaurantLogin)
    const { restaurantData } = restaurantLogin

    const dishesList = useSelector(state => state.dishesList)
    const { loading, error, dishes} = dishesList

    useEffect(() => {
        dispatch(listDishes(restaurantData._id))
    }, [dispatch])

    return(
        <>
            <Row>
                <h3>Menu Items</h3>
            </Row>
            <Row>
                <Col>
                    { loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
                        (
                            <Table stripped bordered hover responsive className='table-sm'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Dish Name</th>
                                        <th>Dish Category</th>
                                        <th>Dish Type</th>
                                        <th>Dish Price</th>
                                        <th>Update Dish</th>
                                        <th>Delete Dish</th>
                                    </tr>
                                </thead>
                                <tbody>
                                { dishes.map((dish, index) => (
                                    <tr key={index}>
                                        <td>{ index + 1}</td>
                                        <td>{dish.dishName}</td>
                                        <td>{dish.dishCategory}</td>
                                        <td>{dish.dishType}</td>
                                        <td>${dish.dishPrice}</td>
                                        <td><Button className='btn-md'>Update Dish</Button></td>
                                        <td><Button className='btn-md'>Delete Dish</Button></td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        )
                    }
                </Col>
            </Row>
        </>
    )
}

export default RestaurantMenuScreen