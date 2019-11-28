import React from 'react';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import {Card, Row, Col, Badge, Button, Form, Table} from 'react-bootstrap';
import {list_address, place_order} from '../api/ajax';
import {NavLink} from "react-router-dom";

function state2props(state, props) {
    console.log(state.forms.address)
    return {address: state.forms.address};
}

class ProcessCheckout extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
            option_selected: 0
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
        console.log(address)
        let address_rows = []
        if(!address){
            address_rows.push(<Form.Text className="display-add-address"><NavLink to={"/addAddress"}>No address updated click to update +</NavLink></Form.Text>)
        }
        else{
            var that = this;
            let id = 1
            _.forEach(address,function (val, key) {
                let eachAdress = val.full_name + " " + val.street
                address_rows.push(<fieldset><Form.Group><Form.Check type="radio" label={eachAdress}
                                                                    name="formHorizontalRadios"
                                                                    id={id}
                                                                    onClick={(e) => (that.setState({option_selected: e.target.id}))}/></Form.Group></fieldset>)
                id++
            })
        }

        return (<div className={"offset-1"}>
            <span>
                <Form.Label>Choose your shipping Address</Form.Label>
                {address_rows}
           </span>
            <Button className={"place-order"} onClick={() => place_order(this.state.option_selected)}>Place Order</Button>
        </div>)
    }
}

export default connect(state2props)(ProcessCheckout);