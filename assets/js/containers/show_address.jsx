import React from 'react';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import {Card, Row, Col, Badge, Button, Form, Table} from 'react-bootstrap';
import {list_address} from '../api/ajax';
import {NavLink} from "react-router-dom";

function state2props(state, props) {
    console.log(state.forms.address)
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
        console.log("props")
        console.log(this.props)
        let {address, dispatch} = this.props
        console.log(address)
        let address_rows = []
        if(!address){
            address_rows.push(<Form.Text className="display-add-address"><NavLink to={"/addAddress"}>+</NavLink></Form.Text>)
        }
        else
        {

            address_rows.push(<Form.Text className="display-add-address"><NavLink to={"/addAddress"}>+</NavLink></Form.Text>)
            console.log(address)
            _.forEach(address,function (val, key) {
                console.log(val)
                console.log(key)
                address_rows.push(
                    <span><Table borderless className="display-address"><tr><td><Form.Label>{val.full_name}</Form.Label></td></tr>
                    <tr><td><Form.Label>{val.street}</Form.Label></td></tr>
                    <tr><td><Form.Label>{val.city}</Form.Label></td></tr>
                    <tr><td><Form.Label>{val.state}</Form.Label></td></tr>
                    <tr><td><Form.Label>zipcode: {val.pincode}</Form.Label></td></tr>
                        <tr><td><Form.Label>{val.country}</Form.Label></td></tr></Table></span>)
            })

        }
        return (<div className={"offset-1"}>Your Address list
            <Form.Label>Add/Remove Rows</Form.Label>
            <span>
                {address_rows}
           </span>
        </div>)
    }
}

export default connect(state2props)(ShowAddress);