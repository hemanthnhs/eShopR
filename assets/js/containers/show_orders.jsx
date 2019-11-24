import React from 'react';
import {Redirect} from 'react-router';
import {list_products, get_product, add_to_cart} from '../api/ajax';
import {connect} from 'react-redux';
import {Card, Row, Col, Badge, Button} from 'react-bootstrap';
import {list_orders} from '../api/ajax';
import {Link} from "react-router-dom";
import ProductListing from "./../components/product_listing"

function state2props(state, props) {
    console.log(state.orders)
    return {orders: state.orders, type: state.session.type};
}

class ShowOrders extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
        }

        list_orders();

    }

    redirect(path) {
        this.setState({redirect: path});
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>;
        }
        let {orders, type, dispatch} = this.props
        let order_rows = []
        orders.forEach(function (value, key) {
            //https://stackoverflow.com/questions/12953302/javascript-datetime-string-to-date-object
            //var date = new Date(bits[0], --bits[1], bits[2], bits[3], bits[4]);
            let items=[]
            if(value.order_items != null){
                _.each((value.order_items),function (item_key, val) {
                    items.push(<div>{item_key.name}</div>)
                })
            }
            order_rows.push(
                <Card>
                    <Card.Body>
                        <Card.Title><h3>Order id: {key}</h3></Card.Title>
                        <Card.Subtitle className="mb-2">
                            <h3>
                                <Badge variant={value.status_id == 1 ? "warning" : (value.status_id == 5 ? "success" : "primary")}>{value.status}</Badge></h3></Card.Subtitle>
                        <Card.Subtitle className="mb-2">Ordered on: {value.inserted_at.split("T")[0]}</Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted">Order Details</Card.Subtitle>
                        <Card.Text>
                            {items}
                        </Card.Text>
                        <Card.Link href={"/order/"+key}>{type == 1 ? "Manage Order" : "View Order"}</Card.Link>
                    </Card.Body>
                </Card>
            )
        })
        return (<div className={"offset-1 col-md-10"}>{order_rows}</div>)
    }
}

export default connect(state2props)(ShowOrders);