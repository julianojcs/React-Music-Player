import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ToastProvider } from 'react-toast-notifications'

ReactDOM.render(
    <ToastProvider
        // autoDismiss
        // autoDismissTimeout={6000}
        placement="top-center"    
    >
        <App />
    </ToastProvider>,
  document.getElementById('root')
);