import React from 'react';
import {Redirect} from 'react-router';
import {list_categories, update_order_status, get_statuses, list_orders} from '../api/ajax';
import {connect} from 'react-redux';
import {Accordion, Row, Tabs, Tab, Button, Table, Form, Card, Container} from 'react-bootstrap';
import {submit_login} from '../api/ajax';
import {Link} from "react-router-dom";

function state2props(state, props) {
    let id = parseInt(props.id);
    return {id: id, order: state.orders.get(id), type: state.session.type, status: state.status};
}

class ShowOrder extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
            tracking_num: ""
        }
        list_orders();
        get_statuses();
    }

    redirect(path) {
        this.setState({redirect: path});
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>;
        }


        let {id, order, type, status, dispatch} = this.props

        if (!order) {
            return (<div>Getting Order Details</div>)
        } else {
            let items = []
            _.each((order.order_items), function (item_key, val) {
                items.push(<tr>
                    <td><img
                        height={200} width={150}
                        src={item_key.display_img}/></td>
                    <td>
                        <Row>{item_key.name}</Row>
                        <Row>Listed at: ${item_key.listed_price}</Row>
                        <Row>Option selected: {item_key.option_selected}</Row>
                    </td>
                    <td>${item_key.sold_price}</td>
                </tr>)
            })
            let display = (<Accordion>
                <Card>
                    <Card.Header className={"order-header"}>
                        <Card.Title><h2>Order id: {order.id}</h2></Card.Title>
                        <Card.Subtitle className="mb-2"><h3>Ordered on: {order.inserted_at.split("T")[0]}</h3>
                        </Card.Subtitle>
                        <Card.Subtitle className="mb-2"><h3>Order Status: {order.status}</h3></Card.Subtitle>
                        <br/>
                    </Card.Header>
                    {order.tracking ? <Card.Body>
                            <Card.Subtitle  className="sub-headings-display">Shipment Status</Card.Subtitle>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            Tracking#: {order.tracking}
                        </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                                <Card.Subtitle>Tracking Details Here</Card.Subtitle>
                            </Accordion.Collapse>
                        </Card.Body>
                        : null}
                    <Card.Body>
                        <Card.Subtitle className="sub-headings-display">Items</Card.Subtitle>
                        <Card.Text>
                            <Table>
                                <thead>
                                <tr>
                                    <th md={2}></th>
                                    <th md={7}>Product Details</th>
                                    <th md={2}>Purchase Price</th>
                                </tr>
                                </thead>
                                <tbody>
                                {items}
                                </tbody>
                            </Table>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Accordion>)
            if (type == 0) {
                return (<div className={"offset-1 order-container col-md-10"}>
                    {display}
                </div>)
            } else {
                let btn_message = {
                    1: "Accept Order",
                    2: "Start Order Preparation",
                    3: "Dispatch Order",
                    4: "Item Delivered"
                }
                let updateTracking = (<Container>
                    <h3>Process Order</h3>
                    <h4>Current Order Status: {order.status}</h4>
                    {order.status_id == 3 ? <Form.Control type="text"
                                                          onChange={(event) => this.setState({tracking_num: event.target.value})}
                                                          placeholder={"Enter Tracking/Reference Number"}/> : null}
                    {order.status_id < 5 ? <Button
                        onClick={() => update_order_status(order.id, order.status_id + 1, this.state.tracking_num)}>{btn_message[order.status_id]}</Button> : null}
                </Container>)
                return (<Container><Tabs defaultActiveKey="order" id="uncontrolled-tab-example">
                    <Tab eventKey="order" title="Order Details">
                        {display}
                    </Tab>
                    <Tab eventKey="manage" title="Manage/Update Status">
                        {updateTracking}
                    </Tab>
                </Tabs>
                </Container>)
            }
        }
    }
}

export default connect(state2props)(ShowOrder);