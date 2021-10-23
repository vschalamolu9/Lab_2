import React from 'react'
import {Card} from 'react-bootstrap'
import Rating from "./Rating";

const Restaurant = ({restaurant}) => {

    return(
        <>
            <Card className='my-3 p-3 rounded'>
                <a href='/'>
                    <Card.Img src={restaurant.image} variant='top'/>
                </a>
                <Card.Body>
                    <a href='/'>
                        <Card.Title as='div'><strong>{`${restaurant.restaurant_name}`}</strong></Card.Title>
                    </a>
                    <Card.Text as='div'>
                        {restaurant.rating && <Rating text={` ${restaurant.num_reviews} reviews`} value={restaurant.rating} />}
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}

export default Restaurant