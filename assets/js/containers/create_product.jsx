import React from 'react';
import {Redirect} from 'react-router';
import {list_categories} from '../api/ajax';
import {connect} from 'react-redux';
import {Form, Button, Col, Alert} from 'react-bootstrap';
import {submit_login} from '../api/ajax';
import {Link} from "react-router-dom";

function state2props(state) {
    return state.forms.login;
}

class CreateProduct extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
        }

    }

    redirect(path) {
        this.setState({redirect: path});
    }



    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>;
        }
        return (<div>Hello</div>)
    }
}

export default connect(state2props)(CreateProduct);