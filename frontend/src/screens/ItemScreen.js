import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button, FormControl } from "react-bootstrap";
import Rating from "../components/Rating";
import { detailsMenuItem } from "../redux/actions/menuItemActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ItemScreen = ({match, history}) => {

    const dispatch = useDispatch()
    const [qty, setQty] = useState(1)

    const menuItemDetails = useSelector(state => state.menuItemDetails)
    const { loading, error, menuItem } = menuItemDetails

    useEffect(() => {
        dispatch(detailsMenuItem(match.params.id))
    }, [match, dispatch])

    const addToCartHandler = () => {

        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    return(
        <>
            <Link className='btn btn-dark my-3' to={`/restaurant/${menuItem.restaurant}`}>
                Go Back
            </Link>
            { loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (<Row>
                <Col md={4}>
                    <Image SRC={menuItem.image} alt={menuItem.itemName} fluid/>
                </Col>
                <Col md={4}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>{menuItem.itemName}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value={menuItem.itemReview} text={` ${menuItem.numReviews} reviews`}/>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <b>Price:</b> ${menuItem.itemPrice}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <b>Description:</b> {menuItem.description}
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
                                        <strong>${menuItem.itemPrice}</strong>
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

export default ItemScreen;