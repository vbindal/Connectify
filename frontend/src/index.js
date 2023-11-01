import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import authReducer from "./state"
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import{
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistReducer
}from "redux-persist"
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/es/integration/react";
import { getDefaultNormalizer } from "@testing-library/react";
const persistConfig =  {key : "root", storage, version : 1};
const persistReducer = persistReducer(persistConfig,authReducer)
const store = configureStore({
  reducer : persistReducer,
  middleware:(getDefaultMiddleware)=>{
    getDefaultMiddleware:{
      ignoredActions:[FLUSH,
        REHYDRATE,
        PAUSE,
        PERSIST,
        PURGE,
        REGISTER]
    }
  }
})


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
      <App />
      </PersistGate>
    </Provider>
    
  </React.StrictMode>
);


