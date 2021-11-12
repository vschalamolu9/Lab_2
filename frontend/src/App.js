import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import MenuScreen from "./screens/MenuScreen";
import ItemScreen from "./screens/ItemScreen";
import CartScreen from './screens/CartScreen';

function App() {
  return (
    <Router>
        <Header />
        <main className='py-3'>
            <Container>
                <Route path='/' component={HomeScreen} exact/>
                <Route path='/restaurant/:id' component={MenuScreen} exact />
                <Route path='/item/:id' component={ItemScreen} exact/>
                <Route path='/cart/:id?' component={CartScreen} exact/>
            </Container>
        </main>
        <Footer />
    </Router>
  );
}

export default App;
