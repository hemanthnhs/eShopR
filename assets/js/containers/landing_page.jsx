import React from 'react';
import { Redirect } from 'react-router';
import {get_landing_page_config} from '../api/ajax';
import {connect} from 'react-redux';
import {Col, Row, Table, Alert} from 'react-bootstrap';

function state2props(state) {
    console.log("===================================");
    console.log(state.landing_page)
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
            return <Redirect to={this.state.redirect} />;
        }
        let {landing_page, dispatch} = this.props
        if(!landing_page){
        return (
            <div>
                Loading......
            </div>
        );}
        else{
            let row_data = []
            for(let i=1;i<= landing_page.num_of_rows; i++){
                console.log("=>",landing_page)
                let col_data = []
                for(let j=1; j<= landing_page.row_data[i].num_of_cols; j++){
                    let col = landing_page.row_data[i].col_data[j]
                    col_data.push(<Col md={6}><img src={col.banner_img} /></Col>)
                }
                row_data.push(<Row>{col_data}</Row>)
            }
           return(<div>{row_data}</div>)
        }
    }
}

export default connect(state2props)(LandingPage);