import React, {useState, useEffect} from 'react'
import {Row, Col} from 'react-bootstrap'
import Item from "../components/Item";
import axios from 'axios';

const MenuScreen = ({match}) => {

    const [menuItems, setMenuItems] = useState([])

    useEffect(() => {
        const fetchMenuItems = async () => {
            const {data} = await axios.get(`/api/restaurant/${match.params.id}`)

            setMenuItems(data)
        }

        fetchMenuItems()
    }, [match])


    return(
        <>
            <Row>
                <h2>Menu Items</h2>
                {menuItems.map(menuItem => (
                    <Col key={menuItem._id} sm={12} md={6} lg={4} xl={3}>
                        <Item item={menuItem}/>
                    </Col>
                ))
                }
            </Row>
        </>
    )
}

export default MenuScreen