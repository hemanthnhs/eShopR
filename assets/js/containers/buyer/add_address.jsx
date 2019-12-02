import React from 'react';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import {Container, Button, Form, Table} from 'react-bootstrap';
import {submit_add_address} from "../../api/ajax";
import store from "../../store";

function state2props(state, props) {
    return {type: state.session ? state.session.type : null, address: state.forms.address}
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
            type: 'CHANGE_NEW_ADDRESS',
            data: data,
        });
    }

    redirect(path) {
        this.setState({redirect: path});
    }

    submit_add_address() {
        var that = this
        var promise2 = new Promise(function (resolve2, reject2) {
            submit_add_address(resolve2, reject2)
        })

        promise2.then(function (result) {
            store.dispatch({
                type: 'SUCCESS_REDIRECT',
                data: "Address added successfully",
            });
            that.setState({redirect: "/manageAddress"})
        })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>;
        }
        if (this.props.type == null){
            return <Redirect to={"/"}/>;
        }
        return (<Container>
            <h3>New Address</h3>
            <hr/>
            <Table borderless>
                <tr>
                    <td><Form.Label>Full Name</Form.Label></td>
                    <td><Form.Control className="display-create-product" type="text" placeholder="Enter your Full Name"
                                      onChange={
                                          (ev) => this.changed({full_name: ev.target.value})}/></td>
                </tr>
                <tr>
                    <td>
                        <Form.Label>Street Address</Form.Label></td>
                    <td><Form.Control className="display-create-product" type="text" placeholder="Street Address"
                                      onChange={
                                          (ev) => this.changed({street: ev.target.value})}/></td>
                </tr>
                <tr>
                    <td>
                        <Form.Label>City</Form.Label></td>
                    <td><Form.Control className="display-create-product" type="text" placeholder="Street Address"
                                      onChange={
                                          (ev) => this.changed({city: ev.target.value})}/></td>
                </tr>
                <tr>
                    <td>
                        <Form.Label>State/Province</Form.Label></td>
                    <td><Form.Control className="display-create-product" type="text" placeholder="State name" onChange={
                        (ev) => this.changed({state: ev.target.value})}/></td>
                </tr>
                <tr>
                    <td>
                        <Form.Label>Country/Region</Form.Label></td>
                    <td><Form.Control className="display-create-product" type="text" placeholder="Country name"
                                      onChange={
                                          (ev) => this.changed({country: ev.target.value})}/></td>
                </tr>

                <tr>
                    <td>
                        <Form.Label>Zipcode</Form.Label></td>
                    <td><Form.Control className="display-create-product" type="text" placeholder="zip code" onChange={
                        (ev) => this.changed({pincode: ev.target.value})}/></td>
                </tr>
            </Table>
            <Button variant="primary" type="submit"
                    onClick={() => this.submit_add_address()}>Submit</Button>
        </Container>)

    }
}

export default connect(state2props)(AddAddress);