import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import MenuScreen from "./screens/MenuScreen";
import DishScreen from "./screens/DishScreen";
import CartScreen from './screens/CartScreen';
import UserLoginScreen from './screens/UserLoginScreen';
import UserSignUpScreen from "./screens/UserSignUpScreen";
import RestaurantLoginScreen from "./screens/RestaurantLoginScreen";
import RestaurantSignUpScreen from './screens/RestaurantSignUpScreen';
import DeliveryScreen from "./screens/DeliveryScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderDetailsScreen from "./screens/OrderDetailsScreen";
import UserProfileScreen from "./screens/UserProfileScreen";
import UserAddressScreen from "./screens/UserAddressScreen";

function App() {
  return (
    <Router>
        <Header />
        <main className='py-3'>
            <Container>
                <Route path='/' component={HomeScreen} exact/>
                <Route path='/restaurant/:id' component={MenuScreen} exact />
                <Route path='/dish/:id' component={DishScreen} exact/>
                <Route path='/cart/:id?' component={CartScreen} exact/>
                <Route path='/user/login' component={UserLoginScreen} exact />
                <Route path='/user/signup' component={UserSignUpScreen} exact/>
                <Route path='/user/placeorder' component={PlaceOrderScreen} exact/>
                <Route path='/res/login' component={RestaurantLoginScreen} exact/>
                <Route path='/res/signup' component={RestaurantSignUpScreen} exact/>
                <Route path='/user/delivery' component={DeliveryScreen} exact/>
                <Route path='/user/payment' component={PaymentScreen} exact/>
                <Route path='/user/order/:id' component={OrderDetailsScreen} exact/>
                <Route path='/user/profile' component={UserProfileScreen} exact/>
                <Route path='/user/address' component={UserAddressScreen} exact/>
            </Container>
        </main>
        <Footer />
    </Router>
  );
}

export default App;
