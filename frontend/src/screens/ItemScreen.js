import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import Rating from "../components/Rating";
import Axios from 'axios';

const ItemScreen = ({match}) => {

    //const menuItem = menuItems.find(item => item._id === Number(match.params.id))

    const [menuItem, setMenuItem] = useState({})

    useEffect(() => {
        const fetchMenuItem = async () => {
            const {data} = await Axios.get(`/api/item/${match.params.id}`)
            setMenuItem(data)
        }

        fetchMenuItem()
    }, [match])

    return(
        <>
            <Link className='btn btn-dark my-3' to={`/restaurant/${menuItem.restaurant}`}>
                Go Back
            </Link>
            <Row>
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
            </Row>
        </>
    )
}

export default ItemScreen;