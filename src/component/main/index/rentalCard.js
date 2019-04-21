import React from 'react';
import { Link } from "react-router-dom";

export function RentalCard(props) {
    const rental = props.rental;
    console.log(props)
    return (
        <div className="sub_home_slider_container col-sm-3">
            {/* <div className="sub_home_slider_container"> */}
                <Link to={`/detail/${rental._id}`}>
                    <img className="sub_home_fix_img" src={rental.image[0]} alt="Snow" width="100%" /></Link>
                <p><b>{rental.title}</b>
                    <br />
                    {rental.price}
                </p>
            {/* </div> */}
        </div>
    )
}
export default RentalCard;