import React from 'react';
import {Redirect} from 'react-router';
import {submit_landing_page} from '../../api/ajax';
import {connect} from 'react-redux';
import {Form, Button} from 'react-bootstrap';

function state2props(state) {
    return {
        type: state.session ? state.session.type : null, landing_page: state.forms.new_landing_page,
    };
}

class CreateLandingPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
        }
    }

    redirect(path) {
        this.setState({redirect: path});
    }

    fileChangedHandler(event) {
        const file = event.target.files[0]
    }

    changed(data) {
        this.props.dispatch({
            type: 'CREATE_PRODUCT',
            data: data,
        });
    }

    file_changed(row, col, ev) {
        let input = ev.target;
        let file = null;
        if (input.files.length > 0) {
            file = input.files[0];
        }
        var that = this
        let reader = new FileReader();
        reader.addEventListener("load", () => {
            that.props.dispatch({
                type: 'CHANGE_LANDING_DATA',
                data: {banner_img: reader.result},
                row_id: row,
                col_id: col,
            });
        });
        reader.readAsDataURL(file);

    }

    number_changed(number, action) {
        if (number < 1) {
            return;
        }
        this.props.dispatch({
            type: action
        });
    }

    columns_changed(row_id, number, action) {
        if (number < 1) {
            return;
        }
        this.props.dispatch({
            type: action,
            row_id: row_id
        });
    }

    changed(row, col, data) {
        this.props.dispatch({
            type: 'CHANGE_LANDING_DATA',
            data: data,
            row_id: row,
            col_id: col
        });
    }

    submit_landing_page() {
        var that = this
        var promise2 = new Promise(function (resolve2, reject2) {
            submit_landing_page(resolve2, reject2)
        })

        promise2.then(function () {
            that.props.dispatch({
                type: 'SUCCESS_REDIRECT',
                data: "Landing Page created successfully",
            });
            that.setState({redirect: "/"})
        })

    }

    render() {
        let {type, landing_page, dispatch} = this.props
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>;
        }
        if (!type){
            return <Redirect to={"/"}/>;
        }
        let row_elements = []
        var that = this
        for (var i = 1; i <= landing_page.num_of_rows; i++) {
            let col_elements = []
            let this_row = i
            let n_cols = landing_page.row_data.get(i).num_of_cols
            for (var j = 1; j <= n_cols; j++) {
                let this_col = j
                col_elements.push(<div className={"offset-1"}>
                    <Form.Row>
                        <Form.Control id={"uploadImage_"+this_row+"_"+this_col} type="file"
                                      onChange={(ev) => that.file_changed(this_row, this_col, ev)}/>
                        {landing_page.row_data.get(this_row).col_data.get(this_col).image}
                        {landing_page.row_data.get(this_row).col_data.get(this_col).banner_img ? <div>Uploaded</div> :
                            <label htmlFor="uploadImage">Upload Banner Image</label>}
                        <Form.Control md={4} type="text" placeholder={"Navigate Link"} onChange={
                            (ev) => this.changed(this_row, this_col, {navigate_to: ev.target.value})}/>
                        <Form.Control md={2} type="integer" placeholder={"Width ratio for the row"} onChange={
                            (ev) => this.changed(this_row, this_col, {width: ev.target.value})}/>
                    </Form.Row>
                </div>)
            }
            row_elements.push(<div>
                <div>Configuration for Row No.{this_row}</div>
                <div className={"offset-1"}>
                    <Form.Label>Add/Remove Column</Form.Label>
                    <Button className={"offset-1"} variant="info"
                            onClick={() => this.columns_changed(this_row, n_cols + 1, "ADD_COLUMN")}>+</Button>
                    {col_elements}
                </div>
            </div>)
        }
        return (<div>
                <Form.Group controlId="attributes">
                    <Form.Label>Add/Remove Rows</Form.Label>
                    <Button className={"offset-1"} variant="info"
                            onClick={() => this.number_changed(landing_page.num_of_rows + 1, "ADD_ROW")}>+</Button>
                    <Button variant="warning"
                            onClick={() => this.number_changed(landing_page.num_of_rows - 1, "REMOVE_ROW")}>-</Button>
                    {row_elements}
                </Form.Group>
                <Button variant="primary" type="submit"
                        onClick={() => this.submit_landing_page()}>Submit</Button>
            </div>
        )
    }
}

export default connect(state2props)(CreateLandingPage);