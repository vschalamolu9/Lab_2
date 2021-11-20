import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import Restaurant from "../components/Restaurant";
import { listRestaurants } from "../redux/actions/restaurantActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from '../components/Paginate'

const HomeScreen = ({match}) => {

    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const restaurantList = useSelector(state => state.restaurantList)
    const { loading, error, restaurants, page, pages} = restaurantList

    useEffect(() => {
        dispatch(listRestaurants(pageNumber))
    }, [dispatch, pageNumber])

    return(
        <>
            <h3>Restaurants</h3>
            { loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <>
                    <Row>
                        {restaurants.map(restaurant => (
                            <Col sm={12} md={6} lg={4} xl={3} key={restaurant._id}>
                                <Restaurant restaurant={restaurant}/>
                            </Col>
                        ))}
                    </Row>
                    <Paginate pages={pages} page={page} />
                </>
            )}
        </>
    )
}

export default HomeScreen