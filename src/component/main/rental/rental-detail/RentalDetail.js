import React, { Component } from 'react';
import { connect } from 'react-redux';
import RentalImages from './RentalImages';
import { RentalAssets } from './RentalAssets';
import { RentalInfo } from './RentalDetailInfo'
import * as actions from 'actions';
import RentalDateForm from './RentalDateForm'
import { startSubmit, stopSubmit } from 'redux-form'
class RentalDetail extends Component {

  componentWillMount() {
    // Dispatch action
    window.scrollTo(0, 0)
    const rentalId = this.props.match.params.id;
    this.props.dispatch(actions.fetchRentalById(rentalId));
  }
  constructor(props) {
    super(props);
    this.state = {
      booked: false,
      errors: []
    }
    this.book = this.book.bind(this);
  }
  book(bookData) {
    console.log(bookData);
    const booking = {
      startAt: bookData.startAt,
      endAt: bookData.endAt,
      guests: bookData.guests,
      id: this.props.match.params.id,
      price: this.props.rental.price
    }
    this.setState({
      booked: false,
      errors: []
    })
    this.props.dispatch(actions.createBooking(booking))
    // this.props.dispatch(startSubmit('rentalDateForm'))
    // actions.createBooking(booking)
    //   .then(res => {
    //     (booked) => {
    //       console.log(booked)
    //       this.setState({ booked: booked })
    //       this.props.dispatch(stopSubmit('rentalDateForm'))
    //     },
    //       (errors) => {
    //         this.setState({ errors: errors })
    //         console.log(this.state)
    //         this.props.dispatch(stopSubmit('rentalDateForm'))
    //       }
    //   }
    //   )

  }
  render() {
    {console.log(this.props.booking)}
    const errors = this.props.booking.errors
    const isSuccess = this.props.booking.isSuccess
    return (
      <div id="rent">
        <div className="container">
          <RentalImages image={this.props.rental.image} />
          <br />
          <br />
          <br />
          <div>
            <div className="col-sm-8">
              <div>
                <div className="infobox">
                  <div>
                    <h3>{this.props.rental.title}</h3>
                    <h6 style={{ color: "gray" }}>{this.props.rental.address}</h6>
                  </div>

                  <ul className="nav nav-tabs">
                    <li className="active"><a data-toggle="tab" href="#description">Mô tả</a></li>
                    <li><a data-toggle="tab" href="#info">Thông tin</a></li>
                    <li><a data-toggle="tab" href="#goods">Tiện nghi</a></li>
                    <li><a data-toggle="tab" href="#price">Giá</a></li>
                  </ul>
                  <div className="tab-content">
                    <div id="description" className="tab-pane fade in active">
                      <br />
                      <p>{this.props.rental.description}</p>
                    </div>
                    <RentalAssets rental={this.props.rental} />
                    <div id="info" className="tab-pane fade">
                      <br />
                      <i className="fa fa-bed"> {this.props.rental.bedrooms} giường</i> <br />
                      <br />
                      <i className="fa fa-male"> Tối đa {this.props.rental.people} người ở</i> <br />
                      <br />
                      <i className="fa fa-bath"> {this.props.rental.bathrooms} phòng tắm</i> <br />
                      <br />
                    </div>
                    <div id="price" className="tab-pane fade">
                      <br />
                      <h4>{(this.props.rental.price)} đ / ngày</h4>

                    </div>
                  </div>
                </div>
              </div>

            </div>


          </div>
          <div className="col-sm-4">
            <div className="divide">
              <div className="infobox">
                <div>
                  <h3 style={{ marginTop: "30px", paddingLeft: "35%" }}>Đặt chỗ</h3>
                </div>
                <hr />
                {
                  isSuccess &&
                  <div className="boxtrue">Đã đặt phòng thành công</div>
                }
                <RentalDateForm submitCb={this.book} people={this.props.rental.people} errors={errors} />

                <hr />
                <br />
                <br />
                <br />
                {/* <div className="modal fade" id="payment" role="dialog">
                  <div className="modal-dialog">


                    <div className="modal-content">
                      <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                        <h4 className="modal-title">Thanh toán</h4>
                      </div>
                      <div className="modal-body">
                        <p>Truyền prob thông tin thanh toán vào đây.</p>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-default" data-dismiss="modal">Thanh toán</button>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    booking: state.userBookings,
    rental: state.rental.data,
    errors: state.rental.errors
  }
}

export default connect(mapStateToProps)(RentalDetail)