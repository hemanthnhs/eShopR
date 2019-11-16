import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route, NavLink, Link} from 'react-router-dom';
import {Navbar, Nav, Col, Button} from 'react-bootstrap';
import {Provider, connect} from 'react-redux';

export default function init_page(root) {
    let tree = (
        <Page/>
    );
    ReactDOM.render(tree, root);
}

function Page(props) {
    return (
        <Router>
            <Navbar id="nav-header" bg="primary" variant="dark">
                <Col md="7">
                    <Nav>
                        <Nav.Item>
                            <NavLink to="/" exact activeClassName="active" className="nav-link">
                                Main category 1
                            </NavLink>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col md="5">
                    <Nav>
                        <Nav.Item>
                            <NavLink to="/new" exact activeClassName="active" className="nav-link">
                                Main category 2
                            </NavLink>
                        </Nav.Item>
                    </Nav>
                </Col>
            </Navbar>

            <Switch>
                <Route exact path="/">
                    <div>Please login to use the application</div>
                </Route>

                <Route exact path="/new">
                    <div>Please login to use the applicmdkn
                        ation</div>
                </Route>
            </Switch>
        </Router>
    );
}