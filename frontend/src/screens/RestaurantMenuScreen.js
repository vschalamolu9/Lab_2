import React, { useEffect } from 'react'
import { Button, Row, Col, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listDishes } from "../redux/actions/restaurantActions";
import { ADD_DISH_RESET } from "../redux/constants/dishConstants";

const RestaurantMenuScreen = ({history}) => {

    const dispatch = useDispatch()

    const restaurantLogin = useSelector(state => state.restaurantLogin)
    const { restaurantData } = restaurantLogin

    const dishesList = useSelector(state => state.dishesList)
    const { loading, error, dishes } = dishesList

    const addDish = useSelector(state => state.addDish)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, dish: createdDish } = addDish

    useEffect(() => {
        dispatch({type: ADD_DISH_RESET})
        if(!restaurantLogin){
            history.push('/res/login')
        }
        if(successCreate){
            history.push(`/res/update/`)
        }
        dispatch(listDishes(restaurantData._id))
        if(!dishes){
            history.push('/res/addNewDish')
        }
    }, [dispatch, history, successCreate])

    const updateDishHandler = (dishId) => {
        history.push(`/res/updateDish/${dishId}`)
    }

    const deleteDishHandler = (dishId) => {

    }

    const addNewDishHandler = (e) => {
        e.preventDefault()
        history.push('/res/addNewDish')
    }

    return(
        <>
            <Row>
                <h3>Menu Items</h3>
                <Button className={"btn-lg btn-success"} onClick={ addNewDishHandler } style={{marginBottom: "20"}}>Add New Dish</Button>
            </Row>
            <Row>
                {dishes === null ? (<Message>You don't have dishes in the Menu</Message>) : (
                    <Col>
                        {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> :
                            (
                                <Table stripped bordered hover responsive className='table-sm' style={{marginTop: "20px"}}>
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Dish Name</th>
                                        <th>Dish Category</th>
                                        <th>Dish Type</th>
                                        <th>Dish Price</th>
                                        <th>Update Dish</th>
                                        <th>Delete Dish</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {dishes.map((dish, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{dish.dishName}</td>
                                            <td>{dish.dishCategory}</td>
                                            <td>{dish.dishType}</td>
                                            <td>${dish.dishPrice}</td>
                                            <td><Button className='btn-md' onClick={
                                                (e) => {
                                                    e.preventDefault()
                                                    updateDishHandler(dish._id)
                                                }}>Update Dish</Button></td>
                                            <td><Button className='btn-md btn-danger' onClick={e => {
                                                e.preventDefault()
                                                deleteDishHandler(dish.dish._id)
                                            }}>Delete Dish</Button></td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>
                            )
                        }
                    </Col>)
                }
            </Row>
        </>
    )
}

export default RestaurantMenuScreen