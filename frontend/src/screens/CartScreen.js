import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import Message from '../components/Message'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { addToCart } from "../redux/actions/cartActions"


const CartScreen = ({match, location, history}) => {

    const itemId = match.params.id

    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    useEffect(() => {
        if(itemId){
            dispatch(addToCart(itemId, qty))
        }
    }, [dispatch, itemId, qty])



    return(
        <>
            <h3>Cart Screen</h3>
        </>
    )
}

export default CartScreen