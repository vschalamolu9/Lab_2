import React, { useEffect} from 'react'
import { useDispatch, useSelector} from "react-redux";
import { listMenuItems } from "../redux/actions/restaurantActions";
import {Row, Col} from 'react-bootstrap'
import Item from "../components/Item";
import Loader from "../components/Loader";
import Message from '../components/Message';

const MenuScreen = ({match}) => {

    const dispatch = useDispatch()

    const menuItemsList = useSelector(state => state.menuItemsList)
    const { loading, error, menuItems} = menuItemsList

    useEffect(() => {
        dispatch(listMenuItems(match.params.id))
    }, [dispatch, match])



    return(
        <>
            <h3>Menu Items</h3>
            { loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Row>
                    {menuItems.map(menuItem => (
                        <Col key={menuItem._id} sm={12} md={6} lg={4} xl={3}>
                            <Item item={menuItem}/>
                        </Col>
                    ))
                    }
                </Row>
            )}
        </>
    )
}

export default MenuScreen