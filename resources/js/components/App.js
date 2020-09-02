
require('../bootstrap');

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import Traintimes from './Traintimes';
import Header from './Header';

class App extends React.Component {
    render() {
        return (            
            <div>
                <Header />
                <Traintimes/>
            </div>
            
        )
    }
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(
        <App />
        , document.getElementById('app'));
}

