import React from 'react'
import {Row, Col} from 'react-bootstrap'
import menuItems from "../menuItems";
import Item from "../components/Item";

const MenuScreen = ({match}) => {

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