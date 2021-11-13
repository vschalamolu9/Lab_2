import React, { useEffect} from 'react'
import { useDispatch, useSelector} from "react-redux";
import { listDishes, detailsRestaurant } from "../redux/actions/restaurantActions";
import {Row, Col} from 'react-bootstrap'
import Dish from "../components/Dish";
import Loader from "../components/Loader";
import Message from '../components/Message';

const MenuScreen = ({match}) => {

    const dispatch = useDispatch()

    const dishesList = useSelector(state => state.dishesList)
    const { loading, error, dishes} = dishesList

    const restaurantDetails = useSelector(state => state.restaurantDetails)
    const { restaurantInfo } = restaurantDetails

    useEffect(() => {
        dispatch(listDishes(match.params.id))
        dispatch(detailsRestaurant(match.params.id))
    }, [dispatch, match])



    return(
        <>
            <p style={{fontFamily: "sans-serif"}}>{restaurantInfo.description}</p>
            <h5>Menu Items</h5>
            { loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Row>
                    {dishes.map(dish => (
                        <Col key={dish._id} sm={12} md={6} lg={4} xl={3}>
                            <Dish dish={dish}/>
                        </Col>
                    ))
                    }
                </Row>
            )}
        </>
    )
}

export default MenuScreen