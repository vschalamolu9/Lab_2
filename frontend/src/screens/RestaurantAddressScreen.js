import React, {useEffect, useState} from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import {restaurantLogout} from "../redux/actions/restaurantActions";
import {RESTAURANT_UPDATE_ADDRESS_RESET} from "../redux/constants/restaurantConstants";
import {updateRestaurantAddress} from "../redux/actions/restaurantActions";

const RestaurantAddressScreen = ({history}) => {

    const dispatch = useDispatch()

    const restaurantLogin = useSelector(state => state.restaurantLogin)
    const { loading, error, restaurantData } = restaurantLogin

    const restaurantAddress = useSelector(state => state.restaurantAddress)
    const { success } = restaurantAddress


    const [street, setStreet] = useState(restaurantData.address.street)
    const [city, setCity] = useState(restaurantData.address.city)
    const [province, setProvince] = useState(restaurantData.address.province)
    const [zipCode, setZipCode] = useState(restaurantData.address.zipCode)
    const [country, setCountry] = useState(restaurantData.address.country)
    const [message, setMessage] = useState('')

    useEffect(() => {
        if(!restaurantData){
            dispatch(restaurantLogout())
        }
        else{
            if(success){
                dispatch({type: RESTAURANT_UPDATE_ADDRESS_RESET})
                dispatch(restaurantLogout())
            }
        }
        //eslint-disable-next-line
    }, [dispatch, restaurantData, success])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateRestaurantAddress(restaurantData._id, street, city, province, country, zipCode))
    }

    return(
        <FormContainer>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <h2>Update Address</h2>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='street'>
                    <Form.Label>Street address</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Building, Street & Unit'
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                    />
                </Form.Group>
                <br/>
                <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='City'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </Form.Group>
                <br/>
                <Form.Group controlId='state'>
                    <Form.Label>State/Province</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='State / Province'
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                    />
                </Form.Group>
                <br/>
                <Form.Group controlId='zipCode'>
                    <Form.Label>ZIP code</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='ZIP Code'
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                    />
                </Form.Group>
                <br/>
                <Form.Group controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Country'
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </Form.Group>
                <br/>
                <Button type='submit' variant='primary'>
                    <b>Update Address</b>
                </Button>
            </Form>
        </FormContainer>
    )
}

export default RestaurantAddressScreen