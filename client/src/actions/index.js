import axios from "axios";
import { FETCH_USER } from "./types";

// Action creator to fetch user then send to reducers through dispatch action using Redux Thunk
// If Redux Thunk as middleware in root index.js sees that we return a function instead of normal action
// it will automatically call the function and pass the dispatch function
// By this, we control the time to dispatch the action - after the api call
// Make sure this will be called on initial app start ie App.js
// Refactor this id there's a return right after an arrow function
// export const fetchUser = () => {
//   return function (dispatch) {
//     axios
//       .get("/api/current_user")
//       .then((res) => dispatch({ type: FETCH_USER, payload: res }));
//   };
// };
export const fetchUser = () => async (dispatch) => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};

// since this action controller expects a user model from our API, we can reuse authreducer that in turn updates the header state
export const handleToken = (token) => async (dispatch) => {
  const res = await axios.post("/api/stripe", token);
  dispatch({ type: FETCH_USER, payload: res.data });
};
