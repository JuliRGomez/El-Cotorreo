import {createStore, combineReducers, applyMiddleware} from "redux";
import authReducer from "./reducers/authReducer";
import conversationReducer from "./reducers/conversationReducer"
import userReducer from "./usersDucks"
import conversationsReducer from "./conversationsDucks"

import thunk from "redux-thunk";
import logger from "redux-logger";

const rootReducer = combineReducers({
    conversation: conversationReducer ,
    auth: authReducer,
    users:userReducer,
    conversations:conversationsReducer

});

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export default store;