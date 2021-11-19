import React, {useState, useEffect, useMemo} from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { signUpRestaurant } from '../redux/actions/restaurantActions'
import Select from "react-select";
import countryList from "react-select-country-list";
import {Image} from "cloudinary-react";
import axios from "axios";

const RestaurantSignUpScreen = ({location, history}) => {

    const [restaurantName, setRestaurantName] = useState('')
    const [restaurantEmail, setRestaurantEmail] = useState('')
    const [restaurantType, setRestaurantType] = useState('')
    const [image, setImage] = useState(null)
    const [imageUrl, setImageUrl] = useState('')
    const [password, setPassword] = useState('')
    const [cnfPassword, setCnfPassword] = useState('')
    const [city, setCity] = useState('')
    const [province, setProvince] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [value, setValue] = useState('')
    const options = useMemo(() => countryList().getData(), [])

    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const restaurantSignUp = useSelector(state => state.restaurantSignUp)
    const { loading, error, restaurantData } = restaurantSignUp

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const validateName = (enteredName) => {
        let re = /^[a-zA-Z ]{2,30}$/;
        return re.test(enteredName);
    }

    const validateEmail = (enteredEmail) => {
        let re = /\S+@\S+\.\S+/;
        return re.test(enteredEmail);
    }

    useEffect(() => {
        if(restaurantData){
            history.push('/res/profile')
        }
    }, [history, restaurantData, redirect])

    const changeHandler = value => {
        setValue(value)
    }

    const restaurantTypeHandler = (value) =>{
        setRestaurantType(value)
        console.log(restaurantType)
    }

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
        if(password !== cnfPassword){
            setMessage('Passwords did not match')
        }
        if(password.length < 10){
            setMessage('Your password should contain atleast 10 characters')
        }
        else{
            dispatch(signUpRestaurant(restaurantName, restaurantEmail, password, restaurantType, city, province, value.label, zipCode, imageUrl))
        }
    }

    return(
        <FormContainer>
            <h3>Restaurant Sign Up</h3>
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
                <Form.Group controlId='province'>
                    <Form.Label>Province</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Province or State'
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                    />
                </Form.Group>
                <br/>
                <Form.Group controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <Select options={options} value={value} onChange={changeHandler}/>
                </Form.Group>
                <br/>
                <Form.Group controlId='zipCode'>
                    <Form.Label>ZIP Code</Form.Label>
                    <Form.Control
                        required
                        type='number'
                        placeholder='ZIP Code'
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                    />
                </Form.Group>
                <br/>
                <Button type='submit' className='btn-block btn-dark' variant='primary'>
                    <b>Sign Up as Restaurant</b>
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    Have an Account?{' '}
                    <Link to={redirect ? `/res/login?redirect=${redirect}` : '/res/login'}>
                        Login
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RestaurantSignUpScreen