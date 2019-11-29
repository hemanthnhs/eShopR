import React from 'react';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import {Card, Row, Col, Container, Button, Form, Table} from 'react-bootstrap';
import {list_address} from '../api/ajax';
import {Link} from "react-router-dom";

function state2props(state, props) {
    return {address: state.forms.address};
}

class ShowAddress extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
        }

        list_address();

    }

    redirect(path) {
        this.setState({redirect: path});
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>;
        }
        let {address, dispatch} = this.props
        let address_rows = []
        if(!address){
            address_rows.push(<Link to={"/addAddress"}><div className="display-add-address">+</div></Link>)
        }
        else
        {
            address_rows.push(<Link to={"/addAddress"}><div className="display-add-address">+</div></Link>)
            _.forEach(address,function (val, key) {
                address_rows.push(
                    <Col>
                        <Table borderless className="display-address"><tr><td><Form.Label>{val.full_name}</Form.Label></td></tr>
                    <tr><td><div>{val.street}</div></td></tr>
                    <tr><td><div>{val.city}</div></td></tr>
                    <tr><td><div>{val.state}</div></td></tr>
                    <tr><td><div>zipcode: {val.pincode}</div></td></tr>
                        <tr><td><div>{val.country}</div></td></tr>
                    </Table>
                    </Col>
                )
            })
        }
        return (<Container>
            <h3>Your Addresses</h3>
            <hr />
            <Row>{address_rows}</Row>
        </Container>)
    }
}

export default connect(state2props)(ShowAddress);