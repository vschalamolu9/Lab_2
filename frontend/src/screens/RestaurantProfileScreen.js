import React, {useState, useEffect, useMemo} from 'react'
import { useDispatch, useSelector } from "react-redux";
import countryList from "react-select-country-list";
import axios from "axios";
import {signUpRestaurant, updateRestaurantProfile} from "../redux/actions/restaurantActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {Image} from "cloudinary-react";
import {Button, Col, Form, FormControl, InputGroup, Row} from "react-bootstrap";
import Select from "react-select";
import {Link} from "react-router-dom";
import FormContainer from "../components/FormContainer";

const RestaurantProfileScreen = () => {

    const dispatch = useDispatch()

    const [restaurantName, setRestaurantName] = useState('')
    const [restaurantEmail, setRestaurantEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cnfPassword, setCnfPassword] = useState('')
    const [restaurantType, setRestaurantType] = useState('')
    const [image, setImage] = useState(null)
    const [imageUrl, setImageUrl] = useState('')
    const [description, setDescription] =useState('')
    const [contact, setContact] = useState('')
    const [deliveryFee, setDeliveryFee] = useState('')
    const [workHrsFrom, setWorkHrsFrom] = useState('')
    const [workHrsTo, setWorkHrsTo] = useState('')


    const [message, setMessage] = useState(null)

    const validateName = (enteredName) => {
        let re = /^[a-zA-Z ]{2,30}$/;
        return re.test(enteredName);
    }

    const validateEmail = (enteredEmail) => {
        let re = /\S+@\S+\.\S+/;
        return re.test(enteredEmail);
    }

    const validatePhoneNumber = (phoneNumber) => {
        let regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        return regex.test(phoneNumber);
    }

    const restaurantLogin = useSelector(state => state.restaurantLogin)
    const { loading, error, restaurantData} = restaurantLogin

    const uploadImage = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("file", image)
        formData.append('upload_preset', 'uber_eats')

        await axios.post('https://api.cloudinary.com/v1_1/vschalamolu9/image/upload', formData).then((res) => {
            console.log(res.data.secure_url)
            setImageUrl(res.data.secure_url)
        })
    }

    const submitHandler = (e) => {
        e.preventDefault()
        if(!validateName(restaurantName)){
            setMessage('Please enter a valid name')
        }
        if(!validateEmail(restaurantEmail)){
            setMessage('Please enter a valid email')
        }
        if(!validatePhoneNumber(contact)){
            setMessage('Please enter a valid phone number')
        }
        if(password !== cnfPassword){
            setMessage('Passwords did not match')
        }
        if(password.length < 10){
            setMessage('Your password should contain atleast 10 characters')
        }
        else{
            dispatch(updateRestaurantProfile(restaurantData._id, restaurantName, restaurantName,restaurantEmail, password, restaurantType, description, imageUrl, contact, deliveryFee, workHrsFrom, workHrsTo))
        }
    }

    return (
        <FormContainer>
            <h3>Restaurant Profile</h3>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader/>}
            {imageUrl && <Image style={{width: 300, marginBottom: 20}} cloudName='vschalamolu9' public_id={imageUrl}/>}
            <Form onSubmit={submitHandler}>
                <br/>
                <br/>
                <br/>
                <Form.Group controlId='image' as = {Row}>
                    <Form.Control
                        type='file'
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                    <Button style={{marginTop: 20}} type='btn' className='btn-block btn-dark' onClick={uploadImage}><b>Upload Profile Picture</b></Button>
                </Form.Group>
                <br/>
                <Form.Group controlId='restaurantName'>
                    <Form.Label>Restaurant Name</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter restaurant name'
                        value={restaurantName}
                        onChange={(e) => setRestaurantName(e.target.value)}
                    />
                </Form.Group>
                <br/>
                <Form.Group controlId='restaurantEmailId'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        required
                        type='emailId'
                        placeholder='Enter email Id'
                        value={restaurantEmail}
                        onChange={(e) => setRestaurantEmail(e.target.value)}
                    />
                </Form.Group>
                <br/>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <br/>
                <Form.Group controlId='password'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Confirm password'
                        value={cnfPassword}
                        onChange={(e) => setCnfPassword(e.target.value)}
                    />
                </Form.Group>
                <br />
                <Form.Group>
                    <Form.Label as='legend'>Select Restaurant Type</Form.Label>
                    <Col>
                        <Form.Check
                            type='radio'
                            label='Delivery'
                            id='Delivery'
                            name='restaurantType'
                            value='Delivery'
                            checked
                            onChange={(e) => setRestaurantType(e.target.value)}
                        />
                        <Form.Check
                            type='radio'
                            label='Pick Up'
                            id='PickUp'
                            name='restaurantType'
                            value='Pick Up'
                            onChange={(e) => setRestaurantType(e.target.value)}
                        />
                        <Form.Check
                            type='radio'
                            label='PickUp & Delivery'
                            id='PickUp&Delivery'
                            name='restaurantType'
                            value='PickUp&Delivery'
                            onChange={(e) => setRestaurantType(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <br />
                <Form.Group controlId='description'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Group>
                <br/>
                <Form.Group controlId='province'>
                    <Form.Label>Contact</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Contact'
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                    />
                </Form.Group>
                <br/>
                <Form.Group controlId='deliveryFee'>
                    <Form.Label>Delivery fee</Form.Label>
                    <InputGroup className="mb-2">
                        <InputGroup.Text>$</InputGroup.Text>
                        <FormControl value={deliveryFee} id="deliveryFee" placeholder="Delivery Fee" onChange={e => setDeliveryFee(e.target.value)}/>
                    </InputGroup>
                </Form.Group>
                <br/>
                <Button type='submit' className='btn-block btn-dark' variant='primary'>
                    <b>Update Profile</b>
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    Have an Account?{' '}
                    <Link to={'/res/login'}>
                        Login
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RestaurantProfileScreen