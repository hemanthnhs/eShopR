import React from 'react';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import {Row, Container, Form, Table, Alert} from 'react-bootstrap';
import {list_address} from '../../api/ajax';
import {Link} from "react-router-dom";
import store from "../../store";

function state2props(state, props) {
    return {type: state.session ? state.session.type : null, address: state.address, address_success: state.forms.success_redirect};
}

class ShowAddress extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
        }
        if (props.type != null) {
            list_address();
        }

    }

    redirect(path) {
        this.setState({redirect: path});
    }

    componentWillUnmount() {
        store.dispatch({
            type: 'SUCCESS_REDIRECT',
            data: null,
        });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>;
        }
        let {type, address, address_success, dispatch} = this.props
        if (type == null) {
            return <Redirect to={"/"}/>;
        }
        let address_rows = []
        if (!address) {
            address_rows.push(<Link to={"/addAddress"}>
                <div className="display-add-address">+</div>
            </Link>)
        } else {
            address_rows.push(<Link to={"/addAddress"}>
                <div className="display-add-address">+</div>
            </Link>)
            address.forEach(function (val, key) {
                address_rows.push(
                    <span>
                        <Table borderless className="display-address"><tr><td><Form.Label>{val.full_name}</Form.Label></td></tr>
                    <tr><td><div>{val.street}</div></td></tr>
                    <tr><td><div>{val.city}</div></td></tr>
                    <tr><td><div>{val.state}</div></td></tr>
                    <tr><td><div>zipcode: {val.pincode}</div></td></tr>
                        <tr><td><div>{val.country}</div></td></tr>
                    </Table>
                    </span>
                )
            })
        }
        return (<Container>
            { address_success ? <Alert variant="success">
                    <p>{address_success}</p>
                </Alert>
                : null}
            <h3>Your Addresses</h3>
            <hr/>
            <Row>{address_rows}</Row>
        </Container>)
    }
}

export default connect(state2props)(ShowAddress);