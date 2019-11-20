import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route, NavLink, Link} from 'react-router-dom';
import {Navbar, Nav, Col, Button} from 'react-bootstrap';
import {Provider, connect} from 'react-redux';
import LandingPage from './landing_page';
import NavigationBar from '../components/navigation_bar';
import CreateProduct from './create_product';
import HeaderBar from '../components/header_bar';
import LoginPage from './login_page';
import ShowProduct from './show_product';
import ShowCart from './show_cart';
import ShowCategory from './show_category';
import store from '../store';

export default function init_page(root) {
    let tree = (
        <Provider store={store}>
            <Page/>
        </Provider>
    );
    ReactDOM.render(tree, root);
}


function Page(props) {
    return (
        <div>
            <Router>
                <HeaderBar/>
                <NavigationBar/>

                <Switch>
                    <Route exact path="/">
                        <LandingPage/>
                    </Route>

                    <Route exact path="/login">
                        <LoginPage />
                    </Route>

                    <Route exact path="/newProduct">
                        <CreateProduct />
                    </Route>

                    <Route exact path="/product/:id" render={
                        (props) =>
                            <ShowProduct id={props.match.params.id} />
                    } />

                    <Route exact path="/category/:id" render={
                        (props) =>
                            <ShowCategory id={props.match.params.id} />
                    } />

                    <Route exact path="/viewCart">
                            <ShowCart />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}