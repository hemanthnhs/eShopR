import React from 'react';
import {Redirect} from 'react-router';
import {get_seller_metrics} from '../../api/ajax';
import {connect} from 'react-redux';
import {Container, Row, Col, Jumbotron} from 'react-bootstrap';
import {
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    RadialChart,
    VerticalBarSeries,
    LabelSeries
} from 'react-vis';

function state2props(state) {
    return {
        session: state.session,
        status_metrics: state.seller_metrics.status_metrics,
        order_metrics: state.seller_metrics.order_metrics
    };
}

class SellerLandingPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
        }
        if(props.session.type){
            get_seller_metrics()
        }
    }

    redirect(path) {
        this.setState({redirect: path});
    }


    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>;
        }
        //https://react-bootstrap.github.io/components/jumbotron/
        let {session, status_metrics, order_metrics, dispatch} = this.props

        if (!session.type) {
            return <Redirect to={"/"}/>;
        }
        return (
            <Container>
                <Jumbotron>
                    <h1>Hello, {session.user_name}!</h1>
                    <p>
                        Welcome to your seller portal. Manage your store and process your orders....
                    </p>
                </Jumbotron>
                {status_metrics ?
                    <div>
                        <h4>Store Metrics</h4>
                        <hr/>
                        {order_metrics.length == 0 && status_metrics.length == 0 ?
                            <div>
                                Your store has no orders yet!
                            </div> :
                            <Row>
                                <Col>
                                    <XYPlot xType="ordinal" width={300} height={300} xDistance={100}>
                                        <VerticalGridLines/>
                                        <HorizontalGridLines/>
                                        <XAxis/>
                                        <YAxis title={"#orders"}/>
                                        <VerticalBarSeries data={order_metrics}/>
                                    </XYPlot>
                                </Col>
                                <Col>
                                    < RadialChart
                                        data={status_metrics}
                                        width={300}
                                        height={300}
                                        colorType="literal"
                                        labelsAboveChildren={false}
                                        showLabels={true}
                                    />
                                </Col>
                            </Row>
                        }
                    </div>
                    : null}
            </Container>
        )
    }
}

export default connect(state2props)(SellerLandingPage);