import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route, NavLink, Link} from 'react-router-dom';
import {Navbar, Nav, Col, Button} from 'react-bootstrap';
import {Provider, connect} from 'react-redux';
import LandingPage from './landing_page';
import NavigationBar from '../components/navigation_bar';
import HeaderBar from '../components/header_bar';
import store from '../store';

export default function init_page(root) {
    let tree = (
        <Provider store={store}>
            <Page/>
        </Provider>
    );
    ReactDOM.render(tree, root);
}


function Page() {
    return (
        <div>
            <Router>
                <HeaderBar/>
                <NavigationBar/>

                <Switch>
                    <Route exact path="/">
                        <LandingPage/>
                    </Route>

                    <Route exact path="/new">
                        <div>Please login to use the applicmdkn
                            ation
                        </div>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}