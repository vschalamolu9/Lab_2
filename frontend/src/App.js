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
import UserOrdersScreen from "./screens/UserOrdersScreen";
import RestaurantOrdersScreen from './screens/RestaurantOrdersScreen';
import RestaurantMenuScreen from './screens/RestaurantMenuScreen';
import UpdateDishScreen from './screens/UpdateDishScreen';
import AddNewDishScreen from "./screens/AddNewDishScreen";
import RestaurantProfileScreen from "./screens/RestaurantProfileScreen";
import RestaurantAddressScreen from "./screens/RestaurantAddressScreen";
import RestaurantOrderDetailsScreen from "./screens/RestaurantOrderDetailsScreen";

function App() {
  return (
    <Router>
        <Header />
        <main className='py-3'>
            <Container>
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
                <Route path='/user/orders' component={UserOrdersScreen} exact/>
                <Route path='/res/orders' component={RestaurantOrdersScreen} exact/>
                <Route path='/res/dishes' component={RestaurantMenuScreen} exact/>
                <Route path='/res/updateDish' component={UpdateDishScreen} exact/>
                <Route path='/res/addNewDish' component={AddNewDishScreen} exact/>
                <Route path='/res/profile' component={RestaurantProfileScreen} exact/>
                <Route path='/res/address' component={RestaurantAddressScreen} exact/>
                <Route path='/res/order/:id' component={RestaurantOrderDetailsScreen} exact/>
                <Route path='/page/:pageNumber' component={HomeScreen} exact/>
                <Route path='/user/orders/:pageNumber' component={UserOrdersScreen} exact/>
                <Route path='/res/orders/:pageNumber' component={RestaurantOrdersScreen} exact/>
                <Route path='/search/:keyWord' component={HomeScreen} />
                <Route path='/' component={HomeScreen} exact/>
            </Container>
        </main>
        <Footer />
    </Router>
  );
}

export default App;
