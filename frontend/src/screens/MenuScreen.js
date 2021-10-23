import React from 'react'
import {Row, Col} from 'react-bootstrap'
import menuItems from "../menuItems";

const MenuScreen = () => {

    return(
        <>
            <Row>
                <h1>Menu Items</h1>
                {menuItems.map(menuItem => (
                    <Col key={menuItem._id} sm={12} md={6} lg={4} xl={3}>
                        {menuItem.item_name}
                    </Col>
                ))
                }
            </Row>
        </>
    )
}

export default MenuScreen