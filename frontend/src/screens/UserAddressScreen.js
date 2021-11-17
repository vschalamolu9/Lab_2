import React, {useEffect, useState} from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import {logout, updateUserAddress} from "../redux/actions/userActions";

const UserAddressScreen = ({history}) => {

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin


    const [street, setStreet] = useState(userInfo.address.street)
    const [city, setCity] = useState(userInfo.address.city)
    const [state, setState] = useState(userInfo.address.state)
    const [zipCode, setZipCode] = useState(userInfo.address.zipCode)
    const [country, setCountry] = useState(userInfo.address.country)
    const [message, setMessage] = useState('')

    const submitHandler = () => {
        const addressObject = {
            _id: userInfo._id,
            street: street,
            city: city,
            state: state,
            country: country,
            zipCode: zipCode
        }
        dispatch(updateUserAddress(addressObject))
        dispatch(logout())
    }

    return(
        <FormContainer>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <h1>Delivery</h1>
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
                        value={state}
                        onChange={(e) => setState(e.target.value)}
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

export default UserAddressScreen