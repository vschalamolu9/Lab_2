import React, {useEffect, useState} from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Image } from 'cloudinary-react'
import {logout, updateUserProfile} from "../redux/actions/userActions";
import axios from "axios";
import {USER_UPDATE_PROFILE_RESET} from "../redux/constants/userConstants";

const UserProfileScreen = ({history}) => {

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin

    const userProfile = useSelector(state => state.userProfile)
    const { success } = userProfile

    const [firstName, setFirstName] = useState(userInfo.firstName)
    const [lastName, setLastName] = useState(userInfo.lastName)
    const [image, setImage] = useState(null)
    const [imageUrl, setImageUrl] = useState(userInfo.imageUrl)
    const [contact, setContact] = useState(userInfo.contact)
    const [emailId, setEmailId] = useState(userInfo.emailId)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message,  setMessage] = useState('')

    const validatePhoneNumber = (phoneNumber) => {
        let regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        return regex.test(phoneNumber);
    }

    const validateEmail = (enteredEmail) => {
        let re = /\S+@\S+\.\S+/;
        return re.test(enteredEmail);
    }

    const uploadImage = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("file", image)
        formData.append('upload_preset', 'uber_eats')

        await axios.post('https://api.cloudinary.com/v1_1/vschalamolu9/image/upload', formData).then((res) => {
            setImageUrl(res.data.secure_url)
        })
    }


    useEffect(()=>{
        if(!userInfo){
            dispatch(logout())
        }
        else{
            if(success){
                dispatch({type: USER_UPDATE_PROFILE_RESET})
                dispatch(logout())
            }
        }
        //eslint-disable-next-line
    },[history, dispatch, success])


    const submitHandler = async () => {
        if(!validateEmail(emailId)){
            setMessage('Please enter a valid email')
        }
        if(password !== confirmPassword){
            setMessage('Passwords do not match')
        }
        if(!validatePhoneNumber(contact)){
            setMessage('Please enter a valid phone number')
        }
        else{
            const _id = userInfo._id

            await dispatch(updateUserProfile({_id, firstName, lastName, emailId, password, contact, imageUrl}))
        }
    }

    return(
        <>
            <Row>
                <Col md={3}>
                    <h3>Update Profile</h3>
                    <br/>
                    {imageUrl && <Image style={{width: 300, marginLeft: 20}} cloudName='vschalamolu9' public_id={imageUrl} fluid rounded/>}
                </Col>
                <Col md={1}/>
                <Col md={6}>
                    {message && <Message variant='danger'>{message}</Message>}
                    {error && <Message variant='danger'>{error}</Message>}
                    {loading && <Loader />}
                    <Form onSubmit={submitHandler}>
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
                                type='email'
                                placeholder='Enter emailId'
                                value={emailId}
                                onChange={(e) => setEmailId(e.target.value)}
                            />
                        </Form.Group>
                        <br/>
                        <Form.Group controlId='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Enter password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <br/>
                        <Form.Group controlId='cnfPassword'>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Confirm password'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </Form.Group>
                        <br />
                        <Form.Group controlId='contact'>
                            <Form.Label>Contact Number</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Contact Number'
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                            />
                        </Form.Group>
                        <br/>
                        <Button type='submit'  className='btn-block btn-dark'>
                            <b>Update Profile</b>
                        </Button>
                    </Form>
                </Col>
                <Col md={2}/>
            </Row>
        </>
    )
}

export default UserProfileScreen