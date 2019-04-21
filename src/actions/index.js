import axios from 'axios';
import authService from 'services/auth-service';
import axiosService from 'services/axios-service';
import { startSubmit, stopSubmit } from 'redux-form';

import {
  FETCH_RENTAL_BY_ID_SUCCESS,
  FETCH_RENTAL_BY_ID_INIT,
  FETCH_RENTALS_SUCCESS,
  FETCH_RENTALS_INIT,
  FETCH_RENTALS_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  SEND_MAIL_SUCCESS,
  SEND_MAIL_FAILURE,
  FETCH_USER_BY_ID_SUCCESS,
  FETCH_USER_BY_ID_INIT,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAILURE,
  UPLOAD_AVATAR_SUCCESS,
  UPLOAD_AVATAR_FAILURE,
  FETCH_USER_BOOKINGS_SUCCESS,
  FETCH_USER_BOOKINGS_FAIL,
  FETCH_USER_BOOKINGS_INIT,
  CREATE_BOOKING_FAIL,
  CREATE_BOOKING_SUCCESS,
  RESET_BOOKING_STATE,
  UPDATE_RENTAL_SUCCESS,
  UPDATE_RENTAL_FAIL,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  RESET_RENTAL_ERRORS,
  RELOAD_MAP,
  RELOAD_MAP_FINISH
} from './types';

const axiosInstance = axiosService.getInstance();

export const verifyRentalOwner = (rentalId) => {
  return axiosInstance.get(`/rentals/${rentalId}/verify-user`);
}

export const reloadMap = () => {
  return {
    type: RELOAD_MAP
  }
}

export const reloadMapFinish = () => {
  return {
    type: RELOAD_MAP_FINISH
  }
}

// RENTALS ATIONS ---------------------------

const fetchRentalByIdInit = () => {
  return {
    type: FETCH_RENTAL_BY_ID_INIT
  }
}

const fetchRentalByIdSuccess = (rental) => {
  return {
    type: FETCH_RENTAL_BY_ID_SUCCESS,
    rental
  }
}

const fetchRentalsSuccess = (rentals) => {
  return {
    type: FETCH_RENTALS_SUCCESS,
    rentals
  }
}

const fetchRentalsInit = () => {
  return {
    type: FETCH_RENTALS_INIT
  }
}

const fetchRentalsFail = (errors) => {
  return {
    type: FETCH_RENTALS_FAIL,
    errors
  }
}

export const fetchRentals = (city) => {
  const url = city ? `/rentals?city=${city}` : '/rentals';

  return dispatch => {
    dispatch(fetchRentalsInit());

    axiosInstance.get(url)
      .then(res => res.data)
      .then(rentals => dispatch(fetchRentalsSuccess(rentals)))
      .catch(({ response }) => dispatch(fetchRentalsFail(response.data.errors)))
  }
}

export const fetchRentalById = (rentalId) => {
  return function (dispatch) {
    dispatch(fetchRentalByIdInit());

    axios.get(`/api/v1/rentals/${rentalId}`)
      .then(res => res.data)
      .then(rental => dispatch(fetchRentalByIdSuccess(rental))
      );
  }
}

export const createRental = (rentalData) => {
  console.log(rentalData)
  const formData = new FormData();
  for (var key in rentalData) {
    formData.append(key, rentalData[key]);
  }
  rentalData.images.map(i => {
    formData.append('image', i)
  })
  return axiosInstance.post('/rentals', formData)
    .then(
      res => res.data,
      err => Promise.reject(err.response.data.errors)
    )
}

export const resetRentalErrors = () => {
  return {
    type: RESET_RENTAL_ERRORS
  }
}

const updateRentalSuccess = (updatedRental) => {
  return {
    type: UPDATE_RENTAL_SUCCESS,
    rental: updatedRental
  }
}

const updateRentalFail = (errors) => {
  return {
    type: UPDATE_RENTAL_FAIL,
    errors
  }
}

export const updateRental = (id, rentalData) => dispatch => {
  return axiosInstance.patch(`/rentals/${id}`, rentalData)
    .then(res => res.data)
    .then(updatedRental => {
      dispatch(updateRentalSuccess(updatedRental));

      if (rentalData.city || rentalData.street) {
        dispatch(reloadMap());
      }
    })
    .catch(({ response }) => dispatch(updateRentalFail(response.data.errors)))
}

// USER BOOKINGS ACTIONS ---------------------------

const fetchUserBookingsInit = () => {
  return {
    type: FETCH_USER_BOOKINGS_INIT
  }
}

const fetchUserBookingsSuccess = (userBookings) => {
  return {
    type: FETCH_USER_BOOKINGS_SUCCESS,
    userBookings
  }
}

const fetchUserBookingsFail = (errors) => {
  return {
    type: FETCH_USER_BOOKINGS_FAIL,
    errors
  }
}

export const fetchUserBookings = () => {
  return dispatch => {
    dispatch(fetchUserBookingsInit());

    axiosInstance.get('/bookings/manage')
      .then(res => res.data)
      .then(userBookings => dispatch(fetchUserBookingsSuccess(userBookings)))
      .catch(({ response }) => dispatch(fetchUserBookingsFail(response.data.errors)))
  }
}

// USER RENTALS ACTIONS ---------------------------

export const getUserRentals = () => {
  return axiosInstance.get('/rentals/manage').then(
    res => res.data,
    err => Promise.reject(err.response.data.errors)
  )
}

export const deleteRental = (rentalId) => {
  return axiosInstance.delete(`/rentals/${rentalId}`).then(
    res => res.data,
    err => Promise.reject(err.response.data.errors))
}

// AUTH ACTIONS ---------------------------

const loginSuccess = () => {
  const username = authService.getUsername();

  return {
    type: LOGIN_SUCCESS,
    username
  }
}

const loginFailure = (errors) => {
  return {
    type: LOGIN_FAILURE,
    errors
  }

}

export const register = (userData) => {
  return axios.post('/api/v1/users/register', userData).then(
    res => res.data,
    err => Promise.reject(err.response.data.errors),
  )
}

export const checkAuthState = () => {
  return dispatch => {
    if (authService.isAuthenticated()) {
      dispatch(loginSuccess());
    }
  }
}

export const login = (userData) => {
  return dispatch => {
    dispatch(startSubmit('loginForm'))
    return axios.post('/api/v1/users/login', userData)
      .then(res => res.data)
      .then(token => {
        authService.saveToken(token);
        dispatch(loginSuccess());
        dispatch(stopSubmit('loginForm'))
      })
      .catch((
        { response }) => {
        dispatch(loginFailure(response.data.errors));
        dispatch(stopSubmit('loginForm'))
        return response.data
      })
    // .then(errors => {
    //   console.log(errors)
    //   // dispatch(loginFailure(response.data.errors));
    // })
  }
}

export const fetchUserById = (userId) => {
  return dispatch => {
    dispatch(fetchUserByIdInit());
    axiosInstance.get(`/users/${userId}`)
      .then(res => {
        dispatch(fetchUserByIdSuccess(res.data))
      })
    // .then(foundUser => dispatch(fetchUserByIdSuccess(foundUser)));
  }
}

const fetchUserByIdInit = () => {
  return {
    type: FETCH_USER_BY_ID_INIT
  }
}

const fetchUserByIdSuccess = (user) => {
  return {
    type: FETCH_USER_BY_ID_SUCCESS,
    user
  }
}

export const logout = () => {
  authService.invalidateUser();

  return {
    type: LOGOUT
  }
}
const sendMailFailure = (errors) => {
  return {
    type: SEND_MAIL_FAILURE,
    errors
  }
}

const sendMailSuccess = () => {
  return {
    type: SEND_MAIL_SUCCESS
  }
}
export const sendMail = (email) => {
  return dispatch => {
    dispatch(startSubmit('forgotForm'))
    return axios.post('/api/v1/users/forgotpass', email)
      .then(response => {
        dispatch(sendMailSuccess())
        dispatch(stopSubmit('forgotForm'))
      })
      .catch(({ response }) => {
        dispatch(sendMailFailure(response.data.errors))
        dispatch(stopSubmit('forgotForm'))
      })


  }
}

export const resetSuccess = () => {
  return {
    type: RESET_PASSWORD_SUCCESS
  }
}

export const resetFailure = (errors) => {
  return {
    type: RESET_PASSWORD_FAILURE,
    errors
  }
}

export const resetPass = (userData, id) => {
  return (dispatch) => {
    return axios.post(`/api/v1/users/reset/${id}`, userData)
      .then(res => {
        dispatch(resetSuccess())
      })
      .catch(response => {
        console.log(response)
        dispatch(resetFailure(response.data.errors))
      })
  }
}

const updatePassSuccess = () => {
  return {
    type: UPDATE_PASSWORD_SUCCESS
  }
}
const updatePassFailure = (errors) => {
  return {
    type: UPDATE_PASSWORD_FAILURE,
    errors
  }
}
const updateUserSuccess = (data) => {
  return {
    type: UPDATE_USER_SUCCESS,
    data
  }
}
const updateUserFailure = (errors) => {
  return {
    type: UPDATE_USER_FAILURE,
    errors
  }
}
export const updateUserInfo = (userData) => {
  return dispatch => {
    return axiosInstance.post('/users/updateinfo', userData)
      .then(res => {
        dispatch(updatePassSuccess(res.data))
      })
      .catch(({ response }) => {
        dispatch(updatePassFailure(response.data.errors))
      })
  }
}
export const updatePass = (userData) => {

  userData._id = authService.getId();
  console.log(userData);
  return (dispatch) => {
    dispatch(startSubmit('newPassForm'))
    return axiosInstance.post('/users/change', userData)
      .then(res => {
        dispatch(stopSubmit('newPassForm'))
        dispatch(updatePassSuccess())
      })
      .catch(errors => {
        dispatch(stopSubmit('newPassForm'))
        dispatch(updatePassFailure(errors.response.data.errors[0]))
      }
      )
  }


  // return (dispatch) => {
  //   return axiosInstance.post('/users/change', userData)
  //   .then(res => {
  //     console.log(res)
  //     dispatch(updatePassSuccess())
  //     // return res.data
  //   })
  //   .catch(res => {
  //     console.log(res)
  //     dispatch(updatePassFailure(res.data.errors));
  //     // return res.data
  //   })
  // }
}
const uploadSuccess = () => {
  return {
    type: UPLOAD_AVATAR_SUCCESS
  }
}
const uploadFailure = (errors) => {
  return {
    type: UPLOAD_AVATAR_FAILURE,
    errors
  }
}

export const uploadAvatar = (file) => {
  const formData = new FormData();
  formData.append('image', file);
  console.log(formData)
  return axiosInstance.post('/users/avatar', formData)
    .then(res => res.data)
    .catch(({ response }) => Promise.reject(response.data.errors))

}

const createBookingFail = (errors) => {
  return {
    type: CREATE_BOOKING_FAIL,
    errors
  }
}
const createBookingSuccess = (data) => {
  return {
    type: CREATE_BOOKING_SUCCESS,
    data
  }
}
const resetBookingState = () => {
  return {
    type: RESET_BOOKING_STATE
  }
}
export const createBooking = (booking) => {
  return (dispatch) => {
    dispatch(resetBookingState())
    dispatch(startSubmit('rentalDateForm'))
    return axiosInstance.post('/bookings/book', booking)
      .then(res => {
        dispatch(stopSubmit('rentalDateForm'))
        dispatch(createBookingSuccess(res.data))
      })
      .catch(({ response }) => {
        console.log(response.data)
        dispatch(stopSubmit('rentalDateForm'))
        dispatch(createBookingFail(response.data.errors))
      })
  }
}


export const uploadImage = image => {
  const formData = new FormData();
  formData.append('image', image);

  return axiosInstance.post('/image-upload', formData)
    .then(json => {
      return json.data.imageUrl;
    })
    .catch(({ response }) => Promise.reject(response.data.errors[0]))
}


export const getPendingPayments = () => {
  return axiosInstance.get('/payments')
    .then(res => res.data)
    .catch(({ response }) => Promise.reject(response.data.errors))
}

export const acceptPayment = (payment) => {
  return axiosInstance.post('/payments/accept', payment)
    .then(res => res.data)
    .catch(({ response }) => Promise.reject(response.data.errors))
}

export const declinePayment = (payment) => {
  return axiosInstance.post('/payments/decline', payment)
    .then(res => res.data)
    .catch(({ response }) => Promise.reject(response.data.errors))
}
































