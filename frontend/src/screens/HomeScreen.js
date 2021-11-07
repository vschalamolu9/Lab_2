import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Restaurant from "../components/Restaurant";
import axios from 'axios';

const HomeScreen = () => {

    const [restaurants, setRestaurants] = useState([])

    useEffect(() => {
        const fetchRestaurants = async () => {
            const { data } = await axios.get('/api/restaurants')

            setRestaurants(data)
        }

        fetchRestaurants()
    }, [])

    return(
        <>
            <h2>Restaurants</h2>
            <Row>
                {restaurants.map(restaurant => (
                    <Col sm={12} md={6} lg={4} xl={3} key={restaurant._id}>
                        <Restaurant restaurant={restaurant}/>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default HomeScreen