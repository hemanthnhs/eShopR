import React from 'react';
import _ from 'lodash';
import {NavLink} from "react-router-dom";
import {connect} from 'react-redux';
import {Navbar, Form, Overlay, Col, Button, InputGroup, Popover, ButtonToolbar, Dropdown} from 'react-bootstrap';
import AccountOverlay from './account_popover'
import {list_cart_items, search} from '../api/ajax';

function state2props(state) {
    return {
        categories: state.categories,
        cart_id: state.session ? state.session.user_id : null,
        cart_count: state.session ? (state.cart ? state.cart.size : null) : null,
        type: state.session ? state.session.type : null
    };
}

class HeaderBar extends React.Component {

    constructor(props) {
        super(props)
        //Attribution https://bit.dev/react-bootstrap/react-bootstrap/overlay?example=5c87dce81f993b001448b6a5
        this.handleClick = ({target}) => {
            this.setState(s => ({target, show_login: !s.show_login}));
        };

        if(props.type == 0){
            list_cart_items()
        }

        this.state = {
            show_login: false,
            search_query: ""
        };

    }

    searchBoxChanged(ev) {
        this.setState({search_query: ev.target.value})
    }

    render(props) {
        let {categories, cart_id, cart_count, type, _dispatch} = this.props
        return (
            <Navbar>
                <Col sm={2}>
                    <NavLink to="/" activeClassName="selected">
                        <img src={require("../../static/images/logo.png")} with="80px" height="40px"/>
                    </NavLink>
                </Col>
                <Col sm={5}>
                    <InputGroup>
                        <Form.Control size="md" type="text" id="search_bar" placeholder="Search..."
                                      onChange={(ev) => this.searchBoxChanged(ev)}/>
                        <InputGroup.Append>
                            <InputGroup.Text className={"search-button"}><NavLink
                                to={"/search/" + this.state.search_query}><img
                                src={require("../../static/images/search.svg")}/></NavLink></InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                </Col>
                {type == 0 ?
                <Col md={{span: 1, offset: 2}}>
                    {/*Cart*/}
                    <NavLink to={"/viewCart"} activeClassName="selected">
                        <img src={require("../../static/images/basket.svg")} width="40px" height="40px"/>
                        <label className="display-cart-count">{cart_count}</label>
                    </NavLink>
                </Col> : null}
                {type != 0 ? <span className={"offset-3"}></span> : null}
                <Col md={{span: 1}}>
                    <ButtonToolbar>
                        <Button className={"header-icons"} onClick={this.handleClick}><img
                            src={require("../../static/images/account.svg")} width="40px" height="40px"/></Button>
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