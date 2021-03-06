import React from 'react';
import {Redirect} from 'react-router';
import {get_tracking_status, update_order_status, get_statuses, list_orders} from '../api/ajax';
import {connect} from 'react-redux';
import {Accordion, Row, Tabs, Tab, Button, Table, Form, Card, Container, Spinner, Col} from 'react-bootstrap';
import {Link} from "react-router-dom";

function state2props(state, props) {
    let id = parseInt(props.id);
    return {id: id, order: state.orders ? state.orders.get(id) : null , type: state.session ? state.session.type : null, status: state.status};
}

class ShowOrder extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
            tracking_num: "",
            tracking_details: null
        }
        if (props.type != null){
            list_orders();
            get_statuses();
        }
    }

    redirect(path) {
        this.setState({redirect: path});
    }

    get_tracking_status(id) {
        if(this.state.tracking_details == "error"){
            return;
        }
        var that = this
        var promise1 = new Promise(function (resolve, reject) {
            get_tracking_status(id, resolve, reject);
        });

        promise1.then(function (resp) {
            that.setState({tracking_details: resp.tracking})
        }).catch(function () {
            that.setState({tracking_details: "error"})
        })
    }

    renderTracking(data) {
        if (data == "error") {
            return (<div>Unable to retrieve data try again later</div>)
        }
        let render_ele = []
        _.each(data, function (activity) {
            let date = activity.Date
            let formatted_date = date.substring(0, 4) + "-" + date.substring(4, 6) + "-" + date.substring(6, 8)
            render_ele.push(<li>({formatted_date}) {activity.Status.Description}</li>)
        })
        return (<ul>{render_ele}</ul>)
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>;
        }
        let {id, order, type, status, dispatch} = this.props
        if (type==null){
            return <Redirect to={"/"}/>;
        }
        if (!order) {
            return (<div className={"loading"}>
                <Spinner animation="grow" role="status" size="md"/>
                Fetching order information...
            </div>)
        } else {
            if (order.status_id == 4 && !this.state.tracking_details) {
                this.get_tracking_status(order.id)
            }
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
                    {(order.tracking && order.status_id == 4) ? <Card.Body>
                            <Card.Subtitle className="sub-headings-display">Shipment Status</Card.Subtitle>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                Tracking#: {order.tracking}
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                                <Card.Subtitle>{this.state.tracking_details ? this.renderTracking(this.state.tracking_details) : "Fetching Tracking"}</Card.Subtitle>
                            </Accordion.Collapse>
                        </Card.Body>
                        : null}
                    <Card.Body className="display-shipping-address">
                        <Card.Subtitle className="sub-headings-display"><h3>Shipping To</h3></Card.Subtitle>
                        <Card.Text>
                            <div>
                                {order.address.full_name}</div>
                            <div> {order.address.street}</div>
                            <div>   {order.address.city}</div>
                            <div>    {order.address.state}</div>
                            <div>   {order.address.country}</div>
                            <div>   {order.address.pincode} </div>
                        </Card.Text>
                    </Card.Body>
                    <Card.Body className="display-products-placed">
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