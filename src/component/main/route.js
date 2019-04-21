import React, {Component} from 'react';
import { Route, Redirect } from "react-router-dom";
import Sign_up from "./register/Register"
import Login from "./login/Login"

import Home from "../main/index/home";
import User from "./user/user";
import User1 from "../main/user/user-setting/user-setting"

import Contactmain from "./contact/contact_main";
import Paymentmain from "./payment/payment_main";


import RentalDetail from "./rental/rental-detail/RentalDetail";
import BookingHome from "./booking/list";

import MyListRent from "./user/list_rent";
import MyListBook from "./user/list_book";

import Search from "./search/search"
// import CreateRent from "./user/create_rent"
import CreateRent from './rental/rental-create/RentalCreate'
import {ProtectedRoute} from './shared/auth/ProtectedRoute'
import {LoggedInRoute} from './shared/auth/LoggedInRoute'

import ForgotPassword from "./user/forgot_password";
import change_new_pass from "./user/change_new_password";

import ResetPass from './user/reset_pass'

import RentalManage from './rental/rental-manage/RentalManage'

class Routerr extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={Home} />
                <ProtectedRoute path="/user" component={User1} />
                <ProtectedRoute path="/user1" component={User1} />

                <Route path="/search" component={Search} />

                <ProtectedRoute path="/create_rent" component={CreateRent} />

                <LoggedInRoute path="/forgot_pass" component={ForgotPassword} />
                {/* <LoggedInRoute path="/new_pass_f" component={change_pass} /> */}
                <ProtectedRoute path="/new_pass" component={change_new_pass} />
                <Route exact path='/reset/:id' component={ResetPass}/>
                <LoggedInRoute path="/login" component={Login} />
                <LoggedInRoute path="/register" component={Sign_up} />
                <Route path="/detail/:id" component={RentalDetail} />
                <ProtectedRoute path="/booking_home" component={BookingHome} />
                <ProtectedRoute exact path="/rental/manage" component={RentalManage} />
                <Route path="/list_book" component={MyListBook} />


                {/*<PrivateRoute  path="/slot" component={Slot} />*/}

                <ProtectedRoute path="/contact" component={Contactmain} />
                <ProtectedRoute  path="/payment" component={Paymentmain} />
            </div>
        );
    }
}






export default Routerr;