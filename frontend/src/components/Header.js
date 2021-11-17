import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from "../redux/actions/userActions";
import { logoutRestaurant } from '../redux/actions/restaurantActions';

const Header = ({history}) => {

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const restaurantLogin = useSelector(state => state.restaurantLogin)
    const { restaurantData } = restaurantLogin

    const logoutHandler = () => {
        dispatch(logout())
    }

    const restaurantLogoutHandler = () => {
        dispatch(logoutRestaurant())
        history.push('/res/login')
    }

    return(
        <header>
            <Navbar bg="light" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand><h3 style={{fontFamily: "sans-serif"}}>Uber <span style={{color: '#3e9920'}}>Eats</span></h3></Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <LinkContainer to='/cart'>
                                <Nav.Link><i className='fas fa-shopping-cart' />Cart</Nav.Link>
                            </LinkContainer>
                            { restaurantData ? (
                                <NavDropdown title={restaurantData.restaurantName} id='restaurantName'>
                                    <LinkContainer to='/res/profile'>
                                        <NavDropdown.Item>Restaurant Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/res/dishes'>
                                        <NavDropdown.Item>View Menu</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={restaurantLogoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to='/res/login'>
                                    <Nav.Link>
                                        <i className='fas fa-user' /> Restaurants
                                    </Nav.Link>
                                </LinkContainer>
                            ) }
                            { userInfo ? (
                                <NavDropdown title={userInfo.firstName} id='username'>
                                    <LinkContainer to='/user/profile'>
                                        <NavDropdown.Item>Update Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/user/address'>
                                        <NavDropdown.Item>Update Address</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/user/orders'>
                                        <NavDropdown.Item>View Orders</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to='/user/login'>
                                    <Nav.Link><i className='fas fa-user' />Sign In</Nav.Link>
                                </LinkContainer>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header;