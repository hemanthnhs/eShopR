import React from 'react';
import { Redirect } from 'react-router';
import {list_categories} from '../api/ajax';
import {connect} from 'react-redux';
import {Form, Button, Table, Alert} from 'react-bootstrap';

function state2props(state) {
    console.log(state)
    return {logged: !(state.session==null)};
}

class LandingPage extends React.Component {

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
            return <Redirect to={this.state.redirect} />;
        }
        return (
            <div>
                Test
            </div>
        );
    }
}

export default connect(state2props)(LandingPage);