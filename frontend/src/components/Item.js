import React from 'react'
import {Link} from "react-router-dom";
import {Card} from "react-bootstrap";

const Item = ({item}) => {
    return(
        <>
            <Card className='my-6 p-3 rounded'>
                <Link to={`/item/${item._id}`}>
                    <Card.Img src={item.image} variant='top' />
                </Link>
                <Card.Body>
                    <Link to={`/item/${item._id}`}>
                        <Card.Title as='div'><strong>{item.item_name}</strong></Card.Title>
                    </Link>
                </Card.Body>
            </Card>
        </>
    )
}

export default Item;