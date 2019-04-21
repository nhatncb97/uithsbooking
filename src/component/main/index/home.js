import React, { Component } from 'react';
import RentalList from '../index/rentalList'
import { Link } from "react-router-dom";

class Home extends Component {
    render() {
        return (
            <div>
                <main>
                    <div id="home" className="carousel slide carousel-fade animated fadeInUp" data-ride="carousel">
                        <ol className="carousel-indicators home-dot">
                            <li data-target="#home" data-slide-to="0" className="active" />
                            <li data-target="#home" data-slide-to="1" />
                            <li data-target="#home" data-slide-to="2" />
                        </ol>

                        <div className="carousel-inner text-center home-inner" role="listbox">
                            <div className="item active">
                                <img  src={process.env.PUBLIC_URL+"/img/img_home/index_slide/1.png"} alt="Brandi Img 1" width="100%" />
                            </div>
                            <div className="item">
                                <img src="./img/img_home/index_slide/2.png" alt="Brandi Img 2" width="100%" />

                            </div>
                            <div className="item">
                                <img src="./img/img_home/index_slide/3.png" alt="Brandi Img 3" width="100%" />
                            </div>
                        </div>
                    </div>
                    <RentalList/>
                </main>
            </div>
        );
    }
}

export default Home;