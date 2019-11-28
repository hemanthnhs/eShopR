import React from 'react';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import {Card, Row, Col, Badge, Button, Form} from 'react-bootstrap';
import {NavLink} from "react-router-dom";
import {submit_add_address} from "../api/ajax";

function state2props(state, props) {
    console.log(state.address)
    return {address: state.forms.address}
}

class AddAddress extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
        }

    }

    changed(data) {
        this.props.dispatch({
            type: 'ADDRESS_DATA',
            data: data,
        });
    }

    redirect(path) {
        this.setState({redirect: path});
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>;
        }

        return (<div className={"offset-1 col-md-10"}>
                <Form.Label>Add a New Address</Form.Label>
            <Form.Group controlId="country">
                <Form.Label>Country/Region</Form.Label>
                <Form.Control className="display-create-product"type="text" placeholder="Country name" onChange={
                    (ev) => this.changed({country: ev.target.value})}/>
            </Form.Group>
            <Form.Group controlId="state">
                <Form.Label>State/Province</Form.Label>
                <Form.Control className="display-create-product"type="text" placeholder="State name" onChange={
                    (ev) => this.changed({state: ev.target.value})}/>
            </Form.Group>
            <Form.Group controlId="full_name">
                <Form.Label>Full Name</Form.Label>
                <Form.Control className="display-create-product"type="text" placeholder="Enter your Full Name" onChange={
                    (ev) => this.changed({full_name: ev.target.value})}/>
            </Form.Group>
            <Form.Group controlId="street">
                <Form.Label>Street Address</Form.Label>
                <Form.Control className="display-create-product"type="text" placeholder="Street Address" onChange={
                    (ev) => this.changed({street: ev.target.value})}/>
            </Form.Group>
            <Form.Group controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control className="display-create-product"type="text" placeholder="Street Address" onChange={
                    (ev) => this.changed({city: ev.target.value})}/>
            </Form.Group>
            <Form.Group controlId="zipcode">
                <Form.Label>Zipcode</Form.Label>
                <Form.Control className="display-create-product"type="text" placeholder="zip code" onChange={
                    (ev) => this.changed({pincode: ev.target.value})}/>
            </Form.Group>
                <Button variant="primary" type="submit"
                        onClick={() => submit_add_address()}>Submit</Button>
        </div>)

    }
}

export default connect(state2props)(AddAddress);