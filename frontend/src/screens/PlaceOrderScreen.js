import React, {useEffect, useState} from 'react'
import {Button, Row, Col, ListGroup, Image, Card, Form, FormControl} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import CheckOutSteps from '../components/CheckOutSteps'
import Message from "../components/Message";
import {Link} from "react-router-dom";
import {createOrder} from "../redux/actions/orderActions";
import {ORDER_CREATE_RESET} from "../redux/constants/orderConstants";
import {CART_CLEAR_ITEMS } from "../redux/constants/cartConstants";
import {addToCart, removeFromCart} from "../redux/actions/cartActions";

const PlaceOrderScreen = ({history}) => {

    const dispatch = useDispatch()

    const [instructions, setInstructions] = useState('')

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const addDecimals = (num) => {
        return (Math.round(num * 100)/100).toFixed(2)
    }

    const deliveryAddress = JSON.parse(localStorage.getItem('deliveryAddress'))

    const deliveryFee = Number(JSON.parse(localStorage.getItem('deliveryFee')))

    cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.dishPrice * item.qty, 0))
    cart.deliveryPrice = cart.orderType === 'Delivery' ? addDecimals(deliveryFee) : 0.00
    cart.taxPrice = addDecimals(Number((0.09375 * cart.itemsPrice).toFixed(2)))
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.deliveryPrice) + Number(cart.taxPrice)).toFixed(2)

    const orderCreate = useSelector(state => state.orderCreate)
    const { order, success, error } = orderCreate

    useEffect(async ()=>{
        if(success){
            await history.push(`/user/order/${order._id}`)
            dispatch({type: ORDER_CREATE_RESET})
            dispatch({type: CART_CLEAR_ITEMS})
        }
        //eslint-disable-next-line
    },[history, success])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }



    const addInstructionHandler = (e) => {
        console.log(e.target.value)
        setInstructions(e.target.value)
    }

    const placeOrderHandler = (e) => {
        e.preventDefault()
        if(cartItems.length > 0){
            dispatch(createOrder(userInfo._id, cartItems[0].restaurantId, Date.now(), cart.orderType, 'Placed', cart.paymentMethod, cart.totalPrice, cart.deliveryPrice, cart.taxPrice, cartItems, cart.deliveryAddress, instructions))
        }
    }

    return(
        <>
            <CheckOutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Delivery</h2>
                                <strong>Address: </strong>
                                {deliveryAddress.street}, {deliveryAddress.city}{' '}
                                {deliveryAddress.province}, {deliveryAddress.zipCode}{' '}
                                {deliveryAddress.country}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <strong>Method: </strong>
                            {cart.paymentMethod}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Type</h2>
                            <strong>Type: </strong>
                            {cart.orderType}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cart.cartItems.length === 0 ? <Message>Your cart is empty</Message> : (<ListGroup variant='flush'>{cart.cartItems.map((item, index) => (<ListGroup.Item key={index}>
                                <Row>
                                    <Col md={1}>
                                        <Image src={item.image} alt={item.dishName} fluid rounded />
                                    </Col>
                                    <Col>
                                        <Link to={`/item/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={4}>{item.qty} x ${item.dishPrice} = ${(item.qty * item.dishPrice).toFixed(2)}</Col>
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
                            </ListGroup.Item>))}</ListGroup>)}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items Price</Col>
                                    <Col>${cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Delivery Fee</Col>
                                    <Col>${cart.deliveryPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax Price</Col>
                                    <Col>${cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total Price</Col>
                                    <Col>${cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Special Instructions</Col>
                                    <Col><input type='text' value={instructions} placeholder='Add Instructions' onChange={addInstructionHandler}/></Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button type='button' className='btn-block' disabled={cart.cartItems === 0} onClick={placeOrderHandler}>Place Order</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default PlaceOrderScreen