import React from 'react';
import {Redirect} from 'react-router';
import {get_landing_page_config} from '../api/ajax';
import {connect} from 'react-redux';
import {Col, Row, Spinner} from 'react-bootstrap';

function state2props(state) {
    return {landing_page: state.landing_page};
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


    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>;
        }
        let {landing_page, dispatch} = this.props
        if (Object.keys(landing_page) < 1) {
            return (
                <div className={"loading"}>
                    <Spinner animation="grow" role="status" size="md"  />
                    Loading Home Screen
                </div>
            );
        } else {
            let row_data = []
            for(let i=1;i<= landing_page.num_of_rows; i++){
                let widthSum = 0;
                let col_data = []
                for (let j = 1; j <= landing_page.row_data[i].num_of_cols; j++) {
                    let col = landing_page.row_data[i].col_data[j]
                    widthSum += parseInt(col.width)
                }
                for(let j=1; j<= landing_page.row_data[i].num_of_cols; j++){
                    let col = landing_page.row_data[i].col_data[j]
                    let width = (col.width/widthSum) * 100
                    col_data.push(<img width={width + "%"} src={col.banner_img}/>)
                }
                row_data.push(<Row height="10px">{col_data}</Row>)
            }
            return (<div>{row_data}</div>)
        }
    }
}

export default connect(state2props)(LandingPage);