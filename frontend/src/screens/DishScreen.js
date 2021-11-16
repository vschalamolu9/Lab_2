import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button, FormControl } from "react-bootstrap";
import Rating from "../components/Rating";
import { detailsDish } from "../redux/actions/dishActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {detailsRestaurant} from "../redux/actions/restaurantActions";

const DishScreen = ({match, history}) => {

    const dispatch = useDispatch()
    const [qty, setQty] = useState(1)

    const dishDetails = useSelector(state => state.dishDetails)
    const { loading, error, dish } = dishDetails

    const restaurantDetails= useSelector(state => state.restaurantDetails)
    const { restaurantInfo } = restaurantDetails

    useEffect(() => {
        dispatch(detailsDish(match.params.id))
        if(!restaurantInfo){
            dispatch(detailsRestaurant(dish.restaurantId))
        }
    }, [match, dispatch, restaurantInfo])

    const addToCartHandler = () => {
        localStorage.setItem('deliveryFee', JSON.stringify(restaurantInfo.deliveryFee))
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    return(
        <>
            <Link className='btn btn-dark my-3' to={`/restaurant/${dish.restaurantId}`}>
                Go Back
            </Link>
            { loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (<Row>
                <Col md={4}>
                    <Image src={dish.image} alt={dish.dishName} fluid/>
                </Col>
                <Col md={4}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>{dish.dishName}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value={dish.dishReview} text={` ${dish.numReviews} reviews`}/>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <b>Price:</b> ${dish.dishPrice}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <b>Description:</b> {dish.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        <b>Price:</b>
                                    </Col>
                                    <Col>
                                        <strong>${dish.dishPrice}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        <b>Quantity:</b>
                                    </Col>
                                    <Col>
                                        <FormControl as='select' value={qty} onChange={(e)=>{setQty(e.target.value)}} style={{blockSize:"3rem"}}>
                                            {[...Array(5).keys()].map( x => (
                                                <option key={x + 1} value={x + 1}>
                                                    { x + 1}
                                                </option>))}
                                        </FormControl>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button className='btn-block btn-dark' type='button' onClick={addToCartHandler}>Add to Cart</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>)}
        </>
    )
}

export default DishScreen;