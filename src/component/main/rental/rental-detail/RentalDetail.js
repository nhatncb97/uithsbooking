import React, { Component } from 'react';
import { connect } from 'react-redux';
import RentalImages from './RentalImages';
import { RentalAssets } from './RentalAssets';
import { RentalInfo } from './RentalDetailInfo'
import * as actions from 'actions';
import Carousel from 'nuka-carousel';
function afterSlide(currentSlide) {
  const list = window.document.querySelector('.slider-list');
  const nextSlide = list.childNodes[currentSlide];
  list.style.height = nextSlide.offsetHeight + 'px';
}
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
      startAt:null,
      endAt:null,
      guests: null
    }
    this.book = this.book.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  book() {
    const booking = {
      startAt : this.state.startAt,
      endAt : this.state.endAt,
      guests : this.state.guests,
      id : this.props.match.params.id,
      price : this.props.rental.price
    }
    console.log(booking)
    this.props.dispatch(actions.createBooking(booking))
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    {console.log(this.state)};
    return (
      <div>
        <RentalImages image={this.props.rental.image} />
        <div className="container">
          <div>
            <div className="col-sm-8">
              <div>
                <div className="infobox slide-in-left">
                  <div>
                    <h3>{this.props.rental.title}</h3>
                    <h6 style={{ color: "gray" }}>{this.props.rental.address}</h6>
                  </div>

                  <ul className="nav nav-tabs">
                    <li className="active"><a data-toggle="tab" href="#description">Mô tả</a></li>
                    <li><a data-toggle="tab" href="#info">Thông tin</a></li>
                    <li><a data-toggle="tab" href="#goods">Tiện nghi</a></li>
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
                  </div>
                </div>
              </div>

            </div>


          </div>
          <div className="col-sm-4">
            <div className="divide">
              <div className="infobox slide-in-right">
                <div>
                  <h3 style={{marginTop:"30px"}}>Giá: {(this.props.rental.price)} đ / ngày</h3>
                </div>
                <hr />
                <label>Ngày đến</label>
                <input onChange={this.handleChange} type="date" className="form-control" id="start" name="startAt" />
                <br />
                <label>Ngày đi</label>
                <input onChange={this.handleChange} type="date" className="form-control" id="end" name="endAt" />
                <br />
                <label>Số người ở</label>
                <select name="guests" onChange={this.handleChange} className="form-control">
                  <option selected disabled hidden>Nhấn để chọn</option>
                  <option value="1">1 người</option>
                  <option value="2">2 người</option>
                  <option value="3">3 người</option>
                  <option value="4">4 người</option>
                  <option value="5">5 người</option>
                </select>
                <hr />
                <br />
                <button onClick={this.book} type="submit" className="b b1 center_button" /*data-toggle="modal" data-target="#payment"*/>Thuê</button>
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
    rental: state.rental.data,
    errors: state.rental.errors
  }
}

export default connect(mapStateToProps)(RentalDetail)