import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import Message from '../components/Message'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Button, Card, FormControl } from 'react-bootstrap'
import { addToCart, removeFromCart } from "../redux/actions/cartActions"


const CartScreen = ({match, location, history}) => {

    const dishId = match.params.id

    const qty = location.search ? Number(location.search.split('=')[1][0]) : 1

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    const restaurantDetails = useSelector(state => state.restaurantDetails)
    const { restaurantInfo } = restaurantDetails

    useEffect(() => {
        if(dishId){
            dispatch(addToCart(dishId, qty))
        }
    }, [dispatch, dishId, qty])

    const checkOutHandler = () => {
        localStorage.removeItem('cartItems')
        history.push('/user/login?redirect=delivery')
    }

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }



    return(
        <Row>
            <Col ms={9}>
                <h3>Shopping Cart</h3>
                {cartItems.length === 0 ? <Message>Your cart is empty <Link to='/'>Go Back</Link></Message> : (
                    <ListGroup variant='flush'>
                        <Link to={`/restaurant/${restaurantInfo._id}`} className='btn btn-dark my-3'>Add more items</Link>
                        <br/>
                        {cartItems.map(item => (
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.dishName} fluid rounded />
                                    </Col>
                                    <Col md={4}>
                                        <Link to={`/dish/${item.product}`}>{item.dishName}</Link>
                                    </Col>
                                    <Col md={2}>
                                        ${item.dishPrice}
                                    </Col>
                                    <Col md={2}>
                                        <FormControl as='select' value={item.qty} onChange={(e)=>{dispatch(addToCart(item.product, Number(e.target.value)))}}>
                                            {[...Array(5).keys()].map( x => (
                                                <option key={x + 1} value={x + 1}>
                                                    { x + 1}
                                                </option>))}
                                        </FormControl>
                                    </Col>
                                    <Col md={2}>
                                        <Button type='button' variant='light'
                                                onClick = {() => removeFromCartHandler(item.product)}>
                                            <i className='fas fa-trash'/>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col ms={3}>
                <Card>
                    <ListGroup>
                        <ListGroup.Item>
                            <h4>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h4>
                            ${cartItems.reduce((acc, item) => acc + item.qty * item.dishPrice, 0).toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button
                                className='btn btn-dark my-3'
                                type='button'
                                disabled={cartItems.length === 0}
                                onClick={checkOutHandler}>
                                Proceed To Checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen