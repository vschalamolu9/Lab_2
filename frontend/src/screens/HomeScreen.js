import React, { useEffect, useState } from 'react';
import {Row, Col, Form, Button} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import Restaurant from "../components/Restaurant";
import { listRestaurants } from "../redux/actions/restaurantActions";
import Message from "../components/Message";
import Loader from "../components/Loader";

const HomeScreen = ({match}) => {

    const keyWord = match.params.keyWord

    const dispatch = useDispatch()

    const [filterOption, setFilterOption] = useState('')

    const restaurantList = useSelector(state => state.restaurantList)
    const { loading, error, restaurants } = restaurantList


    useEffect(() => {
        dispatch(listRestaurants(keyWord, filterOption))
    }, [dispatch, keyWord, filterOption])


    return(
        <>
            <h3>Restaurants</h3>
            { loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <>
                    <Form>
                        <Form.Group>
                            <Form.Label as='legend'>Filter Restaurant</Form.Label>
                                    <Form.Check
                                        type='radio'
                                        label='Delivery'
                                        id='Delivery'
                                        name='restaurantType'
                                        value='Delivery'
                                        selected
                                        onChange={(e) => setFilterOption(e.target.value)}
                                    />
                                    <Form.Check
                                        type='radio'
                                        label='Pick Up'
                                        id='PickUp'
                                        name='restaurantType'
                                        value='PickUp'
                                        onChange={(e) => setFilterOption(e.target.value)}
                                    />
                                    <Form.Check
                                        type='radio'
                                        label='Both'
                                        id='Both'
                                        name='restaurantType'
                                        value='Both'
                                        onChange={(e) => setFilterOption(e.target.value)}
                                    />
                        </Form.Group>
                    </Form>
                    <Row>
                        {restaurants.map(restaurant => (
                            <Col sm={12} md={6} lg={4} xl={3} key={restaurant._id}>
                                <Restaurant restaurant={restaurant}/>
                            </Col>
                        ))}
                    </Row>
                </>
            )}
        </>
    )

}

export default HomeScreen