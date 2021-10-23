import React from 'react'
import restaurants from "../restaurants";
import { Row, Col } from 'react-bootstrap';
import Restaurant from "../components/Restaurant";

const HomeScreen = () => {

    return(
        <>
            <h1>Restaurants</h1>
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