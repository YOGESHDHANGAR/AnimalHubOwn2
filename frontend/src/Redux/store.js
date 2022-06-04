import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  newAnimalReducer,
  animalDetailsReducer,
  animalReducer,
  animalsReducer,
  queriesReducer,
} from "./reducers/animalReducers";

import {
  allUsersReducer,
  forgotPasswordReducer,
  profileReducer,
  userDetailsReducer,
  userReducer,
} from "./reducers/userReducers";

const reducer = combineReducers({
  queriesHub: queriesReducer,
  animals: animalsReducer,
  animalDetails: animalDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  newAnimal: newAnimalReducer,
  animal: animalReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
