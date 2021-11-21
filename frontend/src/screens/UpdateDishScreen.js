import React, { useEffect, useState} from 'react'
import {Button, Col, Form, FormControl, InputGroup, Row} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {Image} from "cloudinary-react";
import Message from "../components/Message";
import Loader from "../components/Loader";
import axios from "axios";
import {UPDATE_DISH_RESET} from "../redux/constants/dishConstants";
import {detailsDish, updateDish} from "../redux/actions/dishActions";


const UpdateDishScreen = ({history, match}) => {

    const dispatch = useDispatch()

    const restaurantLogin = useSelector(state => state.restaurantLogin)
    const { loading, error, restaurantData } = restaurantLogin

    const modifyDish = useSelector(state => state.modifyDish)
    const { loading: loadingUpdate, error: errorUpdate, success: successCreate, dish: updatedDish } = modifyDish

    const dishDetails = useSelector(state => state.dishDetails)
    const { dish } = dishDetails


    const [dishName, setDishName] = useState(dish.dishName)
    const [description, setDescription] =useState(dish.description)
    const [dishCategory, setDishCategory] = useState(dish.dishCategory)
    const [dishType, setDishType] = useState(dish.dishType)
    const [dishPrice, setDishPrice] = useState(dish.dishPrice)
    const [image, setImage] = useState(null)
    const [imageUrl, setImageUrl] = useState(dish.image)
    const [message, setMessage] = useState(null)

    useEffect(() => {
        dispatch(detailsDish(match.params.id))
        if(restaurantData === null){
            history.push('/res/login')
        }
        dispatch({type: UPDATE_DISH_RESET})
        if(successCreate){
            history.push('/res/dishes')
        }
    }, [successCreate, dispatch, history, match])

    const uploadImage = async () => {
        const formData = new FormData()
        formData.append("file", image)
        formData.append('upload_preset', 'uber_eats')

        await axios.post('https://api.cloudinary.com/v1_1/vschalamolu9/image/upload', formData).then((res) => {
            console.log(res.data.secure_url)
            setImageUrl(res.data.secure_url)
        })
    }

    const addDishHandler = (e) => {
        e.preventDefault()
        dispatch(updateDish(match.params.id, dishName, description, imageUrl, dishCategory, dishType, dishPrice))
    }

    return(
        <>
            <Row>
                <Col md={3}>
                    <h3>Add New Dish</h3>
                    <br/>
                    {imageUrl && <Image style={{width: 300, marginLeft: 20}} cloudName='vschalamolu9' public_id={imageUrl} fluid rounded/>}
                </Col>
                <Col md={1}/>
                <Col md={6}>
                    {message && <Message variant='danger'>{message}</Message>}
                    {error && <Message variant='danger'>{error}</Message>}
                    {loading && <Loader />}
                    <Form onSubmit={addDishHandler}>
                        <br/>
                        <Form.Group controlId='image' as = {Row}>
                            <Form.Control
                                type='file'
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                            <Button style={{marginTop: 20}} type='btn' className='btn-block btn-dark' onClick={uploadImage}><b>Upload Profile Picture</b></Button>
                        </Form.Group>
                        <br/>
                        <Form.Group controlId='dishName'>
                            <Form.Label>Dish Name</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Dish name'
                                value={dishName}
                                onChange={(e) => setDishName(e.target.value)}
                            />
                        </Form.Group>
                        <br/>
                        <Form.Group controlId='description'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Group>
                        <br/>
                        <Form.Group controlId='dishCategory'>
                            <Form.Label>Dish Category</Form.Label>
                            <Form.Control as='select' value={dishCategory} onChange={e => setDishCategory(e.target.value)}>
                                <option value='Appetizer'>Appetizer</option>
                                <option value='Drink'>Drink</option>
                                <option value='Main Course'>Main Course</option>
                            </Form.Control>
                        </Form.Group>
                        <br/>
                        <Form.Group controlId='dishType'>
                            <Form.Label>Dish Type</Form.Label>
                            <Form.Control as='select' value={dishType} onChange={x => setDishType(x.target.value)}>
                                <option value='Veg'>Veg</option>
                                <option value='Non-Veg'>Non-Veg</option>
                            </Form.Control>
                        </Form.Group>
                        <br/>
                        <Form.Group controlId='dishPrice'>
                            <Form.Label>Dish Price</Form.Label>
                            <InputGroup className="mb-2">
                                <InputGroup.Text>$</InputGroup.Text>
                                <FormControl value={dishPrice} id="dishPrice" placeholder="Dish Price" onChange={e => setDishPrice(e.target.value)}/>
                            </InputGroup>
                        </Form.Group>
                        <br/>
                        <Button type='submit'  className='btn-block btn-dark'>
                            <b>Update Dish</b>
                        </Button>
                    </Form>
                </Col>
                <Col md={2}/>
            </Row>
        </>
    )
}

export default UpdateDishScreen