
import React, { Component } from "react";
import ReactDOM from "react-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import PropTypes from "prop-types";
import Autocomplete from "./Autocomplete";
import Radium, {Style} from 'radium';
import { MDBBtn, MDBInput, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBIcon, MDBBadge, MDBContainer, MDBRow, MDBCol, MDBSelect} from "mdbreact";


class App extends Component {  

    static propTypes = {
        kind: PropTypes.oneOf(['input','fxlabel'])
    };

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            events: [
            {
                id: 1,
                time: "10:00",
                title: "Breakfast with Simon",
                location: "Lounge Caffe",
                description: "Discuss Q3 targets"
            },
            {
                id: 2,
                time: "10:30",
                title: "Daily Standup Meeting (recurring)",
                location: "Warsaw Spire Office"
            },
            { id: 3, time: "11:00", title: "Call with HRs" },
            {
                id: 4,
                time: "12:00",
                title: "Lunch with Timmoty",
                location: "Canteen",
                description:
                "Project evalutation ile declaring a variable and using an if statement is a fine way to conditionally render a component, sometimes you might want to use a"
            }
            ]
        };
    }  
    
    handleInputChange = inputName => value => {
    const nextValue = value;
    this.setState({
        [inputName]: nextValue
    });
    };
    handleDelete = eventId => {
    const events = this.state.events.filter(e => e.id !== eventId);
    this.setState({ events });
    };
    toggleModal = () => {
    this.setState({
        modal: !this.state.modal
    });
    };

    render() {
        
        return (     

            <React.Fragment>
                <MDBContainer>
                    <MDBRow>
                        <MDBCol md="9" className="mb-r">
                            <h2 className="text-uppercase my-3">Trains timetable:</h2>
                            <div data-test="container" className="container-fluid section mb-5 border p-3"> 
                                        
                                <form className="mx-3 grey-text row" data-test="row"> 
                                    <div className="form-row align-items-center">
                                        <div data-test="col" className="col">
                                        <MDBInput
                                            //options={this.state.options}
                                            selected="From...."
                                            name="location"
                                            label="Origin"
                                            icon="map"
                                            type="text"
                                            group
                                            getValue={this.handleInputChange("location")}
                                            background size="lg"
                                            />
                                        </div>
                                        <div data-test="col" className="col">
                                        <MDBInput
                                            //options={this.state.options}
                                            selected="To...."
                                            name="location"
                                            label="Destination"
                                            icon="map"
                                            type="text"
                                            group
                                            type="text"
                                        // getValue={this.handleInputChange("location")}
                                            background size="lg"
                                            />
                                        </div>
                                        <div data-test="col" className="col">
                                            <MDBBtn
                                            color="info"              
                                            >
                                            Let's Go!
                                            </MDBBtn>
                                        </div>
                                    </div>                       
                                </form>
                                
                                <form className="mx-3 grey-text row" style={{ position: "relative", marginTop: "1.5rem", marginBottom:"1.5rem"}} data-test="row"> 
                                    <div className="form-row align-items-center">
                                        <div data-test="col" className="col">
                                            <div className="md-form form-group form-lg md-bg" style={{position: "relative", marginTop: "1.5rem", marginBottom: "1.5rem"}}>
                                                <i data-test="fa" style={{ WebkitFontSmoothing: "antialiased", display: "inline-block",  fontStyle: "normal", fontVariant: "normal", textRendering: "auto",lineHeight: 1,position: "absolute", transition: "color 0.2s","&:formLg": { top: ".4rem",fontSize: "2rem"}}} className="fa fa-map active prefix"></i>
                                                <label className="active" data-error="" data-success="" id="" aria-labelledby="">Origin</label>
                                                    <Autocomplete
                                                        suggestions={[
                                                        "Simon's Town",
                                                        "Glencairn",
                                                        "Fish Hoek",
                                                        "St James",
                                                        "Kalk Bay",
                                                        "Muizenberg",
                                                        "False Bay",
                                                        "Lakeside",
                                                        "Steenberg",
                                                        "Diepriver",
                                                        "Steurhof",
                                                        "Plumstead",
                                                        "Wynberg",
                                                        "Kenilworth",
                                                        "Heathfield",
                                                        "Claremont",
                                                        "Rondebosch",
                                                        "Rosebank",                    
                                                        "Observatory",
                                                        "Salt River",
                                                        "Woodstock",
                                                        "Cape Town"
                                                        ]}
                                                    />
                                            </div>                            
                                        </div>
                                        <div data-test="col" className="col">
                                            <div className="md-form form-group form-lg md-bg">
                                                <i data-test="fa" style={{WebkitFontSmoothing: "antialiased", display: "inline-block",  fontStyle: "normal", fontVariant: "normal", textRendering: "auto", lineHeight: 1,position: "absolute", transition: "color 0.2s"}} className="fa fa-map active prefix"></i>
                                                <label className="" data-error="" data-success="" id="" aria-labelledby="">Destination</label>
                                                    <Autocomplete
                                                        suggestions={[
                                                            "Simon's Town",
                                                            "Glencairn",
                                                            "Fish Hoek",
                                                            "St James",
                                                            "Kalk Bay",
                                                            "Muizenberg",
                                                            "False Bay",
                                                            "Lakeside",
                                                            "Steenberg",
                                                            "Diepriver",
                                                            "Steurhof",
                                                            "Plumstead",
                                                            "Wynberg",
                                                            "Kenilworth",
                                                            "Heathfield",
                                                            "Claremont",
                                                            "Rondebosch",
                                                            "Rosebank",                            
                                                            "Observatory",
                                                            "Salt River",
                                                            "Woodstock",
                                                            "Cape Town"
                                                        ]}
                                                    />
                                            </div>                            
                                        </div>
                                        
                                        <div data-test="col" className="col">
                                        <button data-test="button" type="button" className="btn-info btn Ripple-parent">Let's Go!<div data-test="waves" className="Ripple " style={{top: "0px", left: "0px", width: "0px", height: "0px"}}></div></button>
                                        </div>
                                    </div>                       
                                </form>        
                            
                            </div>       
                            
                        </MDBCol>
                        <MDBCol md="3">
                            <h3 className="text-uppercase my-3">Today's Weather</h3>
                            <h6 className="my-3">
                            It is going to be busy that today. You have{" "}
                            <b>{this.state.events.length} events </b> today.
                            </h6>
                            <h1 className="my-3">
                                <MDBRow>
                                    <MDBCol xs="3" className="text-center">
                                        <MDBIcon icon="sun" fixed />
                                    </MDBCol>
                                    <MDBCol xs="9">Sunny</MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol xs="3" className="text-center">
                                        <MDBIcon icon="thermometer-three-quarters" fixed />
                                    </MDBCol>
                                    <MDBCol xs="9">23°C</MDBCol>
                                </MDBRow>
                            </h1>
                            <p>
                                Don't forget your sunglasses. Today will dry and sunny, becoming
                                warm in the afternoon with temperatures of between 20 and 25
                                degrees.
                            </p>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </React.Fragment>
        );
    }
}
class Event extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="media mt-1">
                    <h3 className="h3-responsive font-weight-bold mr-3">
                    {this.props.time}
                    </h3>
                    <div className="media-body mb-3 mb-lg-3">
                        <MDBBadge
                            color="danger"
                            className="ml-2 float-right"
                            onClick={() => this.props.onDelete(this.props.id)}>-
                        </MDBBadge>
                        <h6 className="mt-0 font-weight-bold">{this.props.title} </h6>{" "}
                        <hr className="hr-bold my-2" />
                        {this.props.location && (
                            <React.Fragment>
                                <p className="font-smaller mb-0">
                                    <MDBIcon icon="location-arrow" /> {this.props.location}
                                </p>
                            </React.Fragment>
                        )}
                    </div>
                </div>
                {this.props.description && (
                    <p className="p-2 mb-4  blue-grey lighten-5 blue-grey lighten-5">
                      {this.props.description}
                    </p>
                )}
            </React.Fragment>
        );
    }
}

App = Radium(App);

// You can create your style objects dynamically or share them for
// every instance of the component.
// Adding interactive state couldn't be easier! Add a special key to your
// style object (:hover, :focus, :active, or @media) with the additional rules.
// styles 


// const styles = {
   
// '&:fxinput:not():focus:not([readOnly])+fxlabel': {
//     color: "#4285f4", 
//     top: 0,
//     paddingLeft: ".7rem",
//     fontSize: "1rem",
//     transition: "transform .2s ease-out, color .2s ease-out",        
//     transformOrigin: "0% 100%",
//     transform: "translateY(13px)"
//    }
  
 //};         

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(
        <App />
        , document.getElementById('app'));
}
