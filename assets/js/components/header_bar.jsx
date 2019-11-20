import React from 'react';
import _ from 'lodash';
import {NavLink} from "react-router-dom";
import {connect} from 'react-redux';
import {Navbar, Form, Overlay, Col, Button, InputGroup, Popover, ButtonToolbar, Dropdown} from 'react-bootstrap';
import AccountOverlay from './account_popover'

function state2props(state) {
    console.log(state)
    return {categories: state.categories, cart_id: state.session ? state.session.user_id : null};
}

class HeaderBar extends React.Component {

    constructor(props) {
        super(props)
        //Attribution https://bit.dev/react-bootstrap/react-bootstrap/overlay?example=5c87dce81f993b001448b6a5
        this.handleClick = ({target}) => {
            this.setState(s => ({target, show_login: !s.show_login}));
        };

        this.state = {
            show_login: false,
        };

    }

    render(props) {
        let {categories, cart_id, _dispatch} = this.props
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
                        <Form.Control size="lg" type="text" id="search" placeholder="Search for item......."/>
                        <InputGroup.Append>
                            <Form.Control as="select" size="lg">
                                <option>All</option>
                                {_.map(categories, function (_sub, main_category) {
                                    return <option key={main_category}>{main_category}</option>
                                })}
                            </Form.Control>
                        </InputGroup.Append>
                        <InputGroup.Append>
                            <InputGroup.Text><img src={require("../../static/images/search.svg")}/></InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                </Col>
                <Col md={{span: 1, offset: 2}}>
                    {/*Cart*/}
                    <NavLink to={"/viewCart"} activeClassName="selected">
                        <img src={require("../../static/images/basket.svg")} width="50px" height="50px"/>
                    </NavLink>
                </Col>
                <Col md={{span: 1}}>
                    {/*Wishlist*/}
                    <img src={require("../../static/images/wishlist.svg")} width="50px" height="50px"/>
                </Col>
                <Col md={{span: 1}}>
                    <ButtonToolbar>
                        <Button className={"header-icons"} onClick={this.handleClick}><img
                            src={require("../../static/images/account.svg")} width="50px" height="50px"/></Button>
                        <Overlay
                            show={this.state.show_login}
                            target={this.state.target}
                            placement="bottom"
                            container={this}
                            containerPadding={20}
                        >
                            <Popover>
                                <AccountOverlay/>
                            </Popover>
                        </Overlay>
                    </ButtonToolbar>
                </Col>
            </Navbar>
        );
    }
}

export default connect(state2props)(HeaderBar);