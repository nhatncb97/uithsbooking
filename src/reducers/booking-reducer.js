import {
  FETCH_USER_BOOKINGS_SUCCESS,
  FETCH_USER_BOOKINGS_FAIL,
  FETCH_USER_BOOKINGS_INIT,
  CREATE_BOOKING_SUCCESS,
  CREATE_BOOKING_FAIL,
  RESET_BOOKING_STATE
} from 'actions/types';

const INITIAL_STATE = {
  data: [],
  errors: [],
  isFetching: false,
  isSuccess: false
}

export const userBookingsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_BOOKINGS_INIT:
      return { ...state, data: [], errors: [], isFetching: true };
    case FETCH_USER_BOOKINGS_SUCCESS:
      return { ...state, data: action.userBookings, errors: [], isFetching: false };
    case FETCH_USER_BOOKINGS_FAIL:
      return { ...state, errors: [], data: [], isFetching: false };
    case CREATE_BOOKING_FAIL:
      return {...state, errors: action.errors, isSuccess: false}
    case CREATE_BOOKING_SUCCESS: 
      return {...state, isSuccess: true}
      case RESET_BOOKING_STATE:
        return INITIAL_STATE
    default:
      return state;
  }
}
