import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import Rating from "../components/Rating";
import { detailsMenuItem } from "../redux/actions/menuItemActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ItemScreen = ({match}) => {

    const dispatch = useDispatch()

    const menuItemDetails = useSelector(state => state.menuItemDetails)
    const { loading, error, menuItem } = menuItemDetails

    useEffect(() => {
        dispatch(detailsMenuItem(match.params.id))
    }, [match, dispatch])

    return(
        <>
            <Link className='btn btn-dark my-3' to={`/restaurant/${menuItem.restaurant}`}>
                Go Back
            </Link>
            { loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (<Row>
                <Col md={6}>
                    <Image SRC={menuItem.image} alt={menuItem.itemName} fluid/>
                </Col>
                <Col md={3}>
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
                <Col md={3}>
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
                                <Button className='btn-block btn-dark' type='button'>Add to Cart</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>)}
        </>
    )
}

export default ItemScreen;