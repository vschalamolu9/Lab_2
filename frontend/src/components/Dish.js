import React from 'react'
import {Link} from "react-router-dom";
import {Card} from "react-bootstrap";

const Dish = ({dish}) => {
    return(
        <>
            <Card className='my-6 p-3 rounded'>
                <Link to={`/dish/${dish._id}`}>
                    <Card.Img src={dish.image} variant='top' />
                </Link>
                <Card.Body>
                    <Link to={`/dish/${dish._id}`}>
                        <Card.Title as='div'><strong>{dish.dishName}</strong></Card.Title>
                    </Link>
                </Card.Body>
            </Card>
        </>
    )
}

export default Dish;