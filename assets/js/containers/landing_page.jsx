import React from 'react';
import {Redirect} from 'react-router';
import {get_landing_page_config} from '../api/ajax';
import {connect} from 'react-redux';
import {Col, Row, Spinner, Jumbotron, Container, Alert} from 'react-bootstrap';
import store from "../store";
import {Link} from 'react-router-dom';

function state2props(state) {
    return {landing_page: state.landing_page, type: state.session ? state.session.type : null, success_msg: state.forms.success_redirect};
}

class LandingPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
        }

        get_landing_page_config()
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
        let {landing_page, type, success_msg, dispatch} = this.props
        if(type == 2){
            return (<Container>
                { success_msg ? <Alert variant="success">
                        <p>{success_msg}</p>
                    </Alert>
                    : null}
                <Jumbotron>
                    <h1>Admin Portal</h1>
                    <p>
                       Make admin changes and landing page designs to EShopR.
                    </p>
                </Jumbotron>
            </Container>)
        }
        if (!landing_page) {
            return (<Container>
                { success_msg ? <Alert variant="success">
                        <p>{success_msg}</p>
                    </Alert>
                    : null}
                <Jumbotron>
                    <h1>Welcome</h1>
                    <p>
                        Shop now from the wide range of categories available from various stores at EShopR.
                    </p>
                </Jumbotron>
            </Container>)
        }
        if (Object.keys(landing_page) < 1) {
            return (
                <div className={"loading"}>
                    <Spinner animation="grow" role="status" size="md"/>
                    Loading Home Screen
                </div>
            );
        } else {
            let row_data = []
            for (let i = 1; i <= landing_page.num_of_rows; i++) {
                let widthSum = 0;
                let col_data = []
                for (let j = 1; j <= landing_page.row_data[i].num_of_cols; j++) {
                    let col = landing_page.row_data[i].col_data[j]
                    widthSum += parseInt(col.width)
                }
                for (let j = 1; j <= landing_page.row_data[i].num_of_cols; j++) {
                    let col = landing_page.row_data[i].col_data[j]
                    let width = (col.width / widthSum) * 100
                    col_data.push(<Link to={col.navigate_to}><img width={width + "%"} src={col.banner_img}/></Link>)
                }
                row_data.push(<Row height="10px">{col_data}</Row>)
            }
            return (<div>
                { success_msg ? <Alert variant="success">
                        <p>{success_msg}</p>
                    </Alert>
                    : null}
                {row_data}
            </div>)
        }
    }
}

export default connect(state2props)(LandingPage);