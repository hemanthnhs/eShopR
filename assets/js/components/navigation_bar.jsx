import React from 'react';
import _ from 'lodash';
import {NavLink} from "react-router-dom";
import {list_categories} from '../api/ajax';
import {connect} from 'react-redux';
import {Navbar, Nav, Col, Button, NavDropdown} from 'react-bootstrap';

function state2props(state) {
    console.log(state)
    return {categories: state.categories, session: state.session};
}

class NavigationBar extends React.Component {

    render(props) {
        let {categories, session, _dispatch} = this.props
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
                            <NavLink to="/manageOrders" exact activeClassName="active" className="nav-link">
                                Manage Orders
                            </NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink to="/newProduct" exact activeClassName="active" className="nav-link">
                                Create New Product
                            </NavLink>
                        </Nav.Item>
                    </Nav>
                </Navbar>
            );
        }
        else{
        if (Object.keys(categories).length == 0) {
            list_categories()
        }
        let nav_items = []
        _.map(categories, function (values, main_category) {
            let nav_sub_categories = []
            _.each(values, function (sub_category) {
                nav_sub_categories.push(<NavDropdown.Item eventKey="4.1">{sub_category}</NavDropdown.Item>)
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