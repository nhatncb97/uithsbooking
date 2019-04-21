import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Link, withRouter } from "react-router-dom";
import BookingManageCard from '../booking/BookingManageCard'
import { connect } from 'react-redux'
import * as actions from 'actions';
class List_book extends Component {
    componentWillMount() {
        this.props.dispatch(actions.fetchUserBookings());
    }
    renderRental = () => {
        if (this.props.userBookings.length > 0) {
            this.props.userBookings.map((i, index) => {
                return <BookingManageCard rental={i.rental} key={index} />
            })
        }
    }
    bookingDetail =( i ) =>{
        alert(i.startAt)
    }
    render() {
        return (
            <div>
                <div className="container">
                    <h4 className="text-left title_h3 type1 animated fadeInLeft">Danh sách nhà mà bạn thuê</h4>
                    <div id="sub_home" className="text-center ">
                        <div className="container mg-top-20">
                            <div className="row">
                                {
                                    this.props.userBookings.length > 0 &&
                                    this.props.userBookings.map((i, index) => {
                                        return (<Fragment key={index}>
                                            <BookingManageCard rental={i} key={index} />
                                        </Fragment>)
                                    })
                                }
                                
                                {/* <RentalCard rental={this.props.userBookings.rental}/> */}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        userBookings: state.userBookings.data
    }
}

export default connect(mapStateToProps)(List_book);