import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
ReactDOM.render(<App />, document.getElementById('root'));


//Register service worker
if('serviceWorker' in navigator) {
  //Wait until the page has loaded
  window.addEventListener('load', () => {
    var serviceWorkerUrl = `${process.env.PUBLIC_URL}/serviceWorker.js`
    console.log(`Registering service worker ${serviceWorkerUrl}`);
    navigator.serviceWorker.register(serviceWorkerUrl, {scope: '/'})
      .then(reg => {
        console.log('Registration succeeded. Scope is ' + reg.scope)
      })
      .catch(e => {
      console.log('Error sad' + e)
    });
  });
} else {
  console.log('Navigator does not support serviceWorker')
}
