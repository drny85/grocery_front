import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import M from "materialize-css/dist/js/materialize.min.js";


ReactDOM.render(<App />, document.getElementById('root'));


document.addEventListener( "DOMContentLoaded", function () {
    var elems = document.querySelectorAll( "select" );
    M.FormSelect.init( elems );
    var el = document.querySelectorAll( ".modal" );
    M.Modal.init( el );
} );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
