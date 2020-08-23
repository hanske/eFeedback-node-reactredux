import { FETCH_USER } from "../actions/types";

// Reducer must return 3 values - null while waiting for request,
// user model for success and set to false for not logged in
export default function (state = null, action) {
  //console.log(action);
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
}
