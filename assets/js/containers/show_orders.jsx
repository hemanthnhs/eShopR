import React from 'react';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import {Card, Row, Col, Badge, Spinner, Container, Alert} from 'react-bootstrap';
import {list_orders} from '../api/ajax';
import {Link} from "react-router-dom";
import store from "../store";

function state2props(state, props) {
    return {orders: state.orders, type: state.session ? state.session.type : null, order_success: state.forms.success_redirect};
}

// This container is common for both buyers and sellers
class ShowOrders extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
        }

        if (props.type != null) {
            list_orders();
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
        let {orders, type, order_success, dispatch} = this.props
        if (type==null){
            return <Redirect to={"/"}/>;
        }
        if (!orders){
            return (<div className={"loading"}>
                <Spinner animation="grow" role="status" size="md"/>
                Fetching orders information...
            </div>)
        }
        let order_rows = []
        Array.from(orders.keys()).sort(function(a,b) { return b - a; }).map(function (key, index) {
            let value = orders.get(key)
            // orders.forEach(function (value, key) {
            //https://stackoverflow.com/questions/12953302/javascript-datetime-string-to-date-object
            let items = []
            if (value.order_items != null) {
                    _.each((value.order_items), function (item_key, val) {
                    items.push(<Row><Col md={3}><img
                        height={180} width={140}
                        src={item_key.display_img}/></Col><Col>{item_key.name}</Col></Row>)
                })
            }
            order_rows.push(
                <Card className={"order-listing"}>
                    <Card.Header className={"order-header"}>
                        <Row>
                            <Col md={9}><Card.Title><h4>Order: {key}</h4></Card.Title></Col>
                            <Col><Link className={"order-detail-btn"}
                                       to={"/order/" + key}>{type == 1 ? "Manage Order" : "View Order"}</Link></Col>
                        </Row>
                        <Card.Subtitle><h6>Placed on: {value.inserted_at.split("T")[0]}</h6></Card.Subtitle>
                        <Card.Subtitle className="mb-2">
                            <h4>
                                <Badge
                                    variant={value.status_id == 1 ? "warning" : (value.status_id == 5 ? "success" : "primary")}>{value.status}</Badge>
                            </h4>
                        </Card.Subtitle>
                    </Card.Header>
                    <Card.Body>
                        <Card.Subtitle className="mb-2 text-muted">Items</Card.Subtitle>
                        <Card.Text>
                            {items}
                        </Card.Text>
                    </Card.Body>
                </Card>
            )
        })
        console.log(order_rows)
        if(order_rows.length == 0) {
            return (<Container className={"empty-cart"}> No orders yet.. </Container>)
        }
        return (
            <Container>
                { order_success ? <Alert variant="success">
                        <p>{order_success}</p>
                    </Alert>
                    : null}
                {order_rows}
        </Container>)
    }
}

export default connect(state2props)(ShowOrders);