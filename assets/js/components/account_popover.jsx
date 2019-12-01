import React from 'react';
import {Redirect} from 'react-router';
import {connect} from "react-redux";
import {Card, Row, Col, Dropdown} from 'react-bootstrap';
import {NavLink, Link} from 'react-router-dom';

function state2props(state) {
    return {session: state.session};
}

class AccountOverlay extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
        }
    }

    redirect(path) {
        this.setState({redirect: path});
    }

    handleClick() {
        localStorage.removeItem('session');
        this.props.dispatch({
            type: 'LOG_OUT',
        });
        this.props.dispatch({
            type: 'SUCCESS_REDIRECT',
            data: "Logged out successfully..",
        });
        this.redirect("/")
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>;
        }
        let {session, _dispatch} = this.props
        if (session) {
            //https://v4-alpha.getbootstrap.com/components/dropdowns/#menu-alignment
            if (session.type == 1) {
                return (<div>
                    <Dropdown.Menu show className={"account-menu"}>
                        <div>{session.user_name}</div>
                        <Dropdown.Divider/>
                        <Dropdown.Item><NavLink to={"/"}>Stores Dashboard</NavLink></Dropdown.Item>
                        <Dropdown.Item><NavLink to={"/orders"}>Store Orders</NavLink></Dropdown.Item>
                        <Dropdown.Divider/>
                        <Dropdown.Item onClick={() => this.handleClick()}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </div>)
            }
            else if(session.type == 2){
                return (<div>
                    <Dropdown.Menu show className={"account-menu"}>
                        <div>{session.user_name}</div>
                        <Dropdown.Divider/>
                        <Dropdown.Item onClick={() => this.handleClick()}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </div>)
            }
            else {
                return (<div>
                    <Dropdown.Menu show className={"account-menu"}>
                        <div>{session.user_name}</div>
                        <Dropdown.Divider/>
                        {/*<Dropdown.Item>Your Account</Dropdown.Item>*/}
                        <Dropdown.Item><NavLink to={"/orders"}>Your Orders</NavLink></Dropdown.Item>
                        <Dropdown.Item><NavLink to={"/manageAddress"}>Manage Address</NavLink></Dropdown.Item>
                        <Dropdown.Divider/>
                        <Dropdown.Item onClick={() => this.handleClick()}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </div>)
            }
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