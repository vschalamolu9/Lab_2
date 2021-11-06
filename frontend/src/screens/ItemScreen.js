import React from 'react'
import {Link} from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import menuItems from "../menuItems";
import Rating from "../components/Rating";

const ItemScreen = ({match}) => {

    const menuItem = menuItems.find(item => item._id === Number(match.params.id))

    return(
        <>
            <Link className='btn btn-dark my-3' to={`/restaurant/${menuItem.restaurantId}`}>
                Go Back
            </Link>
            <Row>
                <Col md={6}>
                    <Image SRC={menuItem.image} alt={menuItem.item_name} fluid/>
                </Col>
                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>{menuItem.item_name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value={menuItem.item_review} text={` ${menuItem.no_of_reviews} reviews`}/>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <b>Price:</b> ${menuItem.item_price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <b>Description:</b> ${menuItem.description}
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
                                        <strong>${menuItem.item_price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button className='btn-block btn-dark' type='button'>Add to Cart</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default ItemScreen;