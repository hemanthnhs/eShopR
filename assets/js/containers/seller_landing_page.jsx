import React from 'react';
import {Redirect} from 'react-router';
import {get_landing_page_config} from '../api/ajax';
import {connect} from 'react-redux';
import {Container, Jumbotron} from 'react-bootstrap';

function state2props(state) {
    return {session: state.session};
}

class SellerLandingPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
        }

        get_landing_page_config()
    }

    redirect(path) {
        this.setState({redirect: path});
    }


    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>;
        }
        //https://react-bootstrap.github.io/components/jumbotron/
        let {session, dispatch} = this.props
        return (<div>
            <Container>
            <Jumbotron>
                <h1>Hello, {session.user_name}!</h1>
                <p>
                    Welcome to your seller portal. Manage your store and process your orders....
                </p>
            </Jumbotron>
            </Container>
        </div>)
    }
}

export default connect(state2props)(SellerLandingPage);