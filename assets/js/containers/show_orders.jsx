import React from 'react';
import {Redirect} from 'react-router';
import {list_products, get_product, add_to_cart} from '../api/ajax';
import {connect} from 'react-redux';
import {Card, Row, Col, Badge, Button, Container} from 'react-bootstrap';
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
                            <Col><Link className={"order-detail-btn"} to={"/order/"+key}>{type == 1 ? "Manage Order" : "View Order"}</Link></Col>
                        </Row>
                        <Card.Subtitle><h6>Placed on: {value.inserted_at.split("T")[0]}</h6></Card.Subtitle>
                        <Card.Subtitle className="mb-2">
                            <h4>
                                <Badge variant={value.status_id == 1 ? "warning" : (value.status_id == 5 ? "success" : "primary")}>{value.status}</Badge>
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
        return (<Container>{order_rows}</Container>)
    }
}

export default connect(state2props)(ShowOrders);