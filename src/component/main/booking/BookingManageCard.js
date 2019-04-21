import React, { Component } from 'react';
import { Link } from "react-router-dom";

export function BookingManageCard(props) {
    const rental = props.rental.rental;
    const booking = props.rental;
    console.log(props)
    return (
        <React.Fragment>
            <div className="col-sm-3">
                <div className="sub_home_slider_container sub_home_slider_container_list_rent">
                    <Link to={`/detail/${rental._id}`}><img src={rental.image[0]} alt="Snow" width="100%" /></Link>
                    <div className="middle">
                        {/* <a href="#" title=""><i
                            className="fa fa-plus" aria-hidden="true" /></a> */}
                        <a href="#" data-toggle="modal" data-target="#detailModal" title=""><i
                            className="fa fa-edit" aria-hidden="true" /></a>
                        <a href="#" data-toggle="modal" data-target="#deleteModal" title=""><i
                            className="fa fa-close" aria-hidden="true" /></a>
                    </div>
                    <p><b>{rental.title}</b>
                        <br />
                        {rental.price}
                    </p>
                </div>
            </div>
            {/*Modal Content*/}
            <div className="modal fade" id="detailModal" role="dialog">
                <div className="modal-dialog">

                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">Modal Header</h4>
                        </div>
                        <div className="modal-body">
                            <p><b>Số người: </b> {booking.guests}</p>
                            <p><b>Ngày đặt phòng: </b>{booking.startAt}</p>
                            <p><b>Ngày trả phòng: </b>{booking.endAt}</p>
                            <p><b>Số ngày: </b>{booking.days}</p>
                            <p><b>Tổng giá: </b>{booking.totalPrice}</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close
                    </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="deleteModal" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">Modal Header</h4>
                        </div>
                        <div className="modal-body">
                            <p>Bạn chắc chắn sẽ xóa?</p>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">OK</button>
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close
                    </button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default BookingManageCard;