import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Link, withRouter } from "react-router-dom";
import RentalCreateForm from './RentalCreateForm';
import { Redirect } from 'react-router-dom';
import * as actions from 'actions';
import { connect } from 'react-redux'
import { startSubmit, stopSubmit } from 'redux-form';
// import {rentalCreateForm} from './RentalCreateForm'
class Create_rent extends Component {
    constructor() {
        super();
        this.state = {
            errors: [],
            redirect: false,
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(userData) {
        this.props.dispatch(startSubmit('rentalCreateForm'))
        actions.createRental(userData)
            .then(
                (rental) => {
                    this.props.dispatch(stopSubmit('rentalCreateForm'))
                    this.setState({ redirect: true })
                },
                (errors) => {
                    this.props.dispatch(stopSubmit('rentalCreateForm'))
                    this.setState({ errors })
                })

    }
    render() {
        const { isLoad, isLoading } = this.state;
        if (this.state.redirect) {
            return <Redirect to={{ pathname: '/rental/manage', state: { posted: true } }} />
        }
        return (
            <div>
                <div className="container">
                    <div id="create-rent" className=" text-left ">
                        <h3 className="title_h3 type1 animated fadeInLeft">Cho thuê nhà</h3>
                        <br />
                        <div className="container fea-container">
                            <div className="infobox">
                                <RentalCreateForm submitCb={this.handleClick} />
                            </div>
                        </div>
                    </div>
                </div>

            </div >
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {

    }
}
export default  connect(mapStateToProps)(Create_rent);