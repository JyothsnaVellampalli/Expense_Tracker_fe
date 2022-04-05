import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from './Context';
import { SpeechProvider } from "@speechly/react-client";


ReactDOM.render(
  // <React.StrictMode>
    <SpeechProvider appId='03fa9839-21b3-41f5-a3b0-61d21bae0b3c'>
    <Provider>
    <App />
    </Provider>
    </SpeechProvider>,
    
  // </React.StrictMode>,
  document.getElementById('root')
);

