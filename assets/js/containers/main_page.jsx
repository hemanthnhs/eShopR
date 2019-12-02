import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Provider, connect} from 'react-redux';
import LandingPage from './landing_page';
import SellerLandingPage from './seller/seller_landing_page';
import NavigationBar from '../components/navigation_bar';
import CreateProduct from './seller/create_product';
import CreateLandingPage from './admin/create_landing_page';
import HeaderBar from '../components/header_bar';
import LoginPage from './login_page';
import RegisterPage from './register_page';
import ShowProduct from './show_product';
import ShowOrder from './show_order';
import ShowOrders from './show_orders';
import ShowCart from './buyer/show_cart';
import ShowCategory from './buyer/show_category';
import ShowSearchResults from './show_results';
import ShowSellerProducts from './seller/show_products'
import store from '../store';
import ShowAddress from "./buyer/show_address";
import AddAddress from "./buyer/add_address";
import ProcessCheckout from "./buyer/process_checkout";

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
                        <LandingManager/>
                    </Route>

                    <Route exact path="/login">
                        <LoginPage/>
                    </Route>

                    <Route exact path="/createLandingPage">
                        <CreateLandingPage/>
                    </Route>

                    <Route exact path="/newProduct">
                        <CreateProduct/>
                    </Route>

                    <Route exact path="/orders">
                        <ShowOrders/>
                    </Route>

                    <Route exact path="/manageAddress">
                        <ShowAddress />
                    </Route>

                    <Route exact path="/checkout">
                        <ProcessCheckout />
                    </Route>

                    <Route exact path="/addAddress">
                        <AddAddress />
                    </Route>

                    <Route exact path="/register">
                        <RegisterPage />
                    </Route>

                    <Route exact path="/order/:id" render={
                        (props) =>
                            <ShowOrder id={props.match.params.id}/>
                    }/>

                    <Route exact path="/product/:id" render={
                        (props) =>
                            <ShowProduct id={props.match.params.id}/>
                    }/>

                    <Route exact path="/category/:id" render={
                        (props) =>
                            <ShowCategory id={props.match.params.id}/>
                    }/>

                    <Route exact path="/search/:query" render={
                        (props) =>
                            <ShowSearchResults query={props.match.params.query}/>
                    }/>

                    <Route exact path="/viewCart">
                        <ShowCart/>
                    </Route>

                    <Route exact path="/sellerProducts">
                        <ShowSellerProducts/>
                    </Route>

                </Switch>
            </Router>
        </div>
    );
}

let LandingManager = connect(({session}) => ({session}))(({session}) => {
    if (session && session.type == 1) {
        return (<SellerLandingPage/>)
    } else {
        return (<LandingPage/>)
    }
});