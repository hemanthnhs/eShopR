import React from 'react';
import _ from 'lodash';
import {NavLink} from "react-router-dom";
import {list_categories} from '../api/ajax';
import {connect} from 'react-redux';
import {Navbar, Nav, Col, Button, NavDropdown} from 'react-bootstrap';

function state2props(state) {
    return {categories: state.categories, session: state.session};
}

class NavigationBar extends React.Component {

    render(props) {
        let {categories, session, _dispatch} = this.props
        if (Object.keys(categories).length == 0) {
            list_categories()
        }
        if(session && session.type == 1){
            return (
                <Navbar className="nav-categories" id="nav-header" bg="dark" variant="dark">
                    <Nav>
                        <Nav.Item>
                            <NavLink to="/" exact activeClassName="active" className="nav-link">
                                Dashboard
                            </NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink to="/orders" exact activeClassName="active" className="nav-link">
                                Manage Orders
                            </NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink to="/newProduct" exact activeClassName="active" className="nav-link">
                                Create New Product
                            </NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink to="/sellerProducts" exact activeClassName="active" className="nav-link">
                                Your Listings
                            </NavLink>
                        </Nav.Item>
                    </Nav>
                </Navbar>
            );
        }
        else{
            let nav_items = []
            _.map(categories, function (values, main_category) {
                let nav_sub_categories = []
                _.each(values.sub, function (sub_category) {
                    nav_sub_categories.push(<NavDropdown.Item><NavLink to={"/category/"+sub_category[0]} exact activeClassName="active" className="nav-link">{sub_category[1]}</NavLink></NavDropdown.Item>)
                })
                nav_items.push(
                    <Nav.Item key={main_category}>
                        <NavDropdown title={main_category}>
                            {nav_sub_categories}
                        </NavDropdown>
                    </Nav.Item>
                )
            });
            return (
                <Navbar className="nav-categories" id="nav-header" bg="dark" variant="dark">
                    <Nav>
                        {nav_items}
                    </Nav>
                </Navbar>
            );
        }
    }
}

export default connect(state2props)(NavigationBar);