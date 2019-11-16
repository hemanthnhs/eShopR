import React from 'react';
import _ from 'lodash';
import {NavLink} from "react-router-dom";
import {list_categories} from '../api/ajax';
import {connect} from 'react-redux';
import {Navbar, Form, Nav, Col, Button, InputGroup} from 'react-bootstrap';

function state2props(state) {
    return {categories: state.categories};
}

class HeaderBar extends React.Component {

    render(props) {
        console.log(window.image_prefix)
        return (
            <Navbar>
                {/*TODO Logo*/}
                <Col sm={2}>
                <NavLink to="/" activeClassName="selected">
                    <h1>e-ShopR</h1>
                </NavLink>
                </Col>
                <Col sm={5}>
                    <InputGroup>
                    <Form.Control size="lg" type="text" id="search" placeholder="Search for item......." />
                    <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroupPrepend"><img src={require("../../static/images/search.svg")} /></InputGroup.Text>
                    </InputGroup.Prepend>
                    </InputGroup>
                </Col>
                <Col md={{ span: 1, offset: 2 }}>
                    {/*Cart*/}
                    <img src={require("../../static/images/basket.svg")} width="50px" height="50px" />
                </Col>
                <Col md={{ span: 1}}>
                    {/*Wishlist*/}
                    <img src={require("../../static/images/wishlist.svg")} width="50px" height="50px" />
                </Col>
                <Col md={{ span: 1}}>
                    <img src={require("../../static/images/account.svg")} width="50px" height="50px" />
                </Col>
            </Navbar>
        );
    }
}

export default connect(state2props)(HeaderBar);