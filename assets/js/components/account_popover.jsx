import React from 'react';
import {Card, Form, Row, Col, Button, InputGroup, Popover, ButtonToolbar, Dropdown} from 'react-bootstrap';
import {BrowserRouter as Router, Switch, Route, NavLink, Link} from 'react-router-dom';
import {connect} from "react-redux";

function state2props(state) {
    return {session: state.session};
}

class AccountOverlay extends React.Component {

    handleClick() {
        localStorage.removeItem('session');
        this.props.dispatch({
            type: 'LOG_OUT',
        });
    }

    render() {
        let {session, _dispatch} = this.props
        if (session) {
            //https://v4-alpha.getbootstrap.com/components/dropdowns/#menu-alignment
            return (<div>
                <Dropdown.Menu show className={"account-menu"}>
                    <div>{session.user_name}</div>
                    <Dropdown.Divider/>
                    <Dropdown.Item>My Account</Dropdown.Item>
                    <Dropdown.Item><NavLink to={"/orders"}>My Orders</NavLink></Dropdown.Item>
                    <Dropdown.Item>My Address</Dropdown.Item>
                    <Dropdown.Divider/>
                    <Dropdown.Item onClick={() => this.handleClick()}>Logout</Dropdown.Item>
                </Dropdown.Menu>
            </div>)
        } else {
            //Attribution https://react-bootstrap.github.io/components/cards/
            return (
                <div>
                    <Row xs={12}>
                        <Col xs={6}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Existing User</Card.Title>
                                    <Card.Text>
                                        Login to place new orders, track your items.
                                    </Card.Text>
                                    <Link to="/login" className={"btn btn-primary"}>Login</Link>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={6}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>New User</Card.Title>
                                    <Card.Text>
                                        Not a user yet? Sign up here and place your first order
                                    </Card.Text>
                                    <Link to="/register" className={"btn btn-primary"}>Register</Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
            );
        }
    }
}

export default connect(state2props)(AccountOverlay);