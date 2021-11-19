import React, {useState, useEffect, useMemo} from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { signUpUser } from '../redux/actions/userActions'
import Select from "react-select";
import countryList from "react-select-country-list";
import axios from 'axios';
import { Image } from 'cloudinary-react'

const UserSignUpScreen = ({location, history}) => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [image, setImage] = useState(null)
    const [imageUrl, setImageUrl] = useState('')
    const [emailId, setEmailId] = useState('')
    const [password, setPassword] = useState('')
    const [cnfPassword, setCnfPassword] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [value, setValue] = useState('')
    const options = useMemo(() => countryList().getData(), [])

    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userSignUp = useSelector(state => state.userSignUp)
    const { loading, error, userInfo } = userSignUp

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
        if(userInfo){
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const changeHandler = value => {
        setValue(value)
    }

    const uploadImage = async () => {
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
        if(!validateName(firstName) || !validateName(lastName)){
            setMessage('Please enter a valid name')
        }
        if(!validateEmail(emailId)){
            setMessage('Please enter a valid email')
        }
        if(password !== cnfPassword){
            setMessage('Passwords did not match')
        }
        if(password.length < 10){
            setMessage('Your password should contain atleast 10 characters')
        }
        else{
            dispatch(signUpUser(firstName, lastName, emailId, password, city, state, value.label, zipCode, imageUrl))
        }
    }

    return(
        <FormContainer>
            <h3>Sign Up</h3>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
                <br/>
                {imageUrl && <Image style={{width: 200, marginLeft: 20}} cloudName='vschalamolu9' public_id={imageUrl}/>}
                <br/>
                <Form.Group controlId='image' as = {Row}>
                    <Form.Control
                        type='file'
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                    <Button style={{marginTop: 20}} type='btn' className='btn-block btn-dark' onClick={uploadImage}><b>Upload Profile Picture</b></Button>
                </Form.Group>
                <br/>
                <Form.Group controlId='firstname'>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter first name'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </Form.Group>
                <br/>
                <Form.Group controlId='lastname'>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter last name'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </Form.Group>
                <br/>
                <Form.Group controlId='emailId'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        required
                        type='emailId'
                        placeholder='Enter emailId'
                        value={emailId}
                        onChange={(e) => setEmailId(e.target.value)}
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
                    <Form.Label>Province</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Province or State'
                        value={state}
                        onChange={(e) => setState(e.target.value)}
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
                <Button type='submit' className='btn-block btn-dark'>
                    Sign Up
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    Have an Account?{' '}
                    <Link to={redirect ? `/user/login?redirect=${redirect}` : '/user/login'}>
                        Login
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default UserSignUpScreen