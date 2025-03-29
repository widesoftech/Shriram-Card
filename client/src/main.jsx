import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from "react-redux";
// import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { store } from './redux/Store.jsx';
import { BrowserRouter, HashRouter } from 'react-router-dom';


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
    {/* <HashRouter> */}
      <App />
      <Toaster />
    {/* </HashRouter> */}

    </BrowserRouter>
  </Provider>
)
