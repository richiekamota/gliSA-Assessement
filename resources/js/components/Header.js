import React from 'react'
import { Link } from 'react-router-dom'

class Header extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-icon-top navbar-expand-lg navbar-dark bg-dark">
              <a className="navbar-brand" href="#">Traintimes</a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
               <span className="navbar-toggler-icon"></span>
              </button>            
            </nav>
        )    
    }    
}

export default Header;