
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { render } from 'react-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import 'react-widgets/dist/css/react-widgets.css';
import "mdbreact/dist/css/mdb.css";
import { NumberPicker } from 'react-widgets';
import PropTypes from "prop-types";
import Radium, {Style} from 'radium';
import { MDBBtn, MDBInput, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBIcon, MDBBadge, MDBContainer, MDBRow, MDBCol, MDBSelect} from "mdbreact";


class App extends Component {  

    static propTypes = {
        kind: PropTypes.oneOf(['input','button'])
    };

    constructor(props) {
        super(props);
        this.state = {

           drawResults: [], 

            draw: {         
              mainDrawSet: 0,
              mainBallsDrawn: 0,
              powerBallSet: 0,
              powerballBallsDrawn: 0
            }
        };
       
    }

//     componentDidMount(){
//         this.fetchResults();
//    }

    render() {
    
        return (        
            <MDBContainer>
                <MDBRow>
                    <MDBCol md="12" className="mb-r">
                        <h2 className="text-uppercase my-3">Lotto Draw Machine:</h2>
                        <div data-test="container" className="container-fluid section mb-5 border p-3">                            
                                                
                            <form className="mx-3 grey-text row" style={{ position: "relative", marginTop: "1.5rem", marginBottom:"1.5rem"}} data-test="row"> 
                                <div className="form-row align-items-center">
                                    <div data-test="col" className="col">
                                        <div className="md-form form-group form-lg md-bg" style={{position: "relative", marginTop: "1.5rem", marginBottom: "1.5rem"}}>
                                            <label style={{ position: "relative", marginTop: "1.5rem", marginBottom:"1rem"}} for="mainDrawSet">Number of balls in main draw set</label>
                                            <NumberPicker min={40} max={49} defaultValue={40} type="number" class="browser-default custom-select" id="mainDrawSet" value={this.state.mainDrawSet} onChange={mainDrawSet => this.setState({ mainDrawSet })} style={{width: "400px", height: "40px"}}/>                            
                                            <label style={{ position: "relative", marginTop: "1.5rem", marginBottom:"1rem"}} for="mainDrawSet">Please choose a number between 40 and 49</label>
                                        </div>                            
                                    </div>
                                    <div data-test="col" className="col">
                                        <div className="md-form form-group form-lg md-bg">
                                            <label style={{ position: "relative", marginTop: "1.5rem", marginBottom:"1rem"}} for="mainDraw">Number of balls in main draw</label>
                                            <NumberPicker min={5} max={7} defaultValue={5} type="number" class="browser-default custom-select" id="mainDraw" value={this.state.mainBallsDrawn} onChange={mainBallsDrawn => this.setState({ mainBallsDrawn })} style={{width: "400px", height: "40px"}}/>
                                            <label style={{ position: "relative", marginTop: "1.5rem", marginBottom:"1rem"}} for="mainDraw">Please choose a number between 5 and 7</label>      
                                        </div>                            
                                    </div>       
                                </div>                       
                                 
                                <div className="mx-3 grey-text row" style={{ position: "relative", marginTop: "1.5rem", marginBottom:"1.5rem"}} data-test="row"> 
                                    <div className="form-row align-items-center">
                                        <div data-test="col" className="col">
                                            <div className="md-form form-group form-lg md-bg" style={{position: "relative", marginTop: "1.5rem", marginBottom: "1.5rem"}}>
                                                <label for="powerBallSet" style={{ position: "relative", marginTop: "0.5rem", marginBottom:"0.5rem"}}>Powerball Set</label>
                                                <NumberPicker min={5} max={49} defaultValue={5} type="number" class="browser-default custom-select" id="powerBallSet" value={this.state.powerBallSet} onChange={powerBallSet => this.setState({ powerBallSet })} style={{width: "400px", height: "40px"}}/>  
                                                <label for="powerBallSet" style={{ position: "relative", marginTop: "0.5rem", marginBottom:"0.5rem"}}>Please choose a number between 5 and 49</label>
                                            </div>                            
                                        </div>
                                        <div data-test="col" className="col">
                                            <div className="md-form form-group form-lg md-bg">
                                                <label for="powerBall" style={{ position: "relative", marginTop: "0.5rem", marginBottom:"0.5rem"}}>Number of powerball balls</label>
                                                <NumberPicker min={0} max={3} defaultValue={0} type="number" class="browser-default custom-select" value={this.state.powerballBallsDrawn} onChange={powerballBallsDrawn => this.setState({ powerballBallsDrawn })} id="powerBall" style={{width: "400px", height: "40px"}}/>  
                                                <label for="powerBall" style={{ position: "relative", marginTop: "0.5rem", marginBottom:"0.5rem"}}>Please choose a number between 0 and 3</label>     
                                            </div>                            
                                        </div>                              
                                    </div>                       
                                </div>
                                <div className="mx-3 grey-text row" style={{ position: "relative", marginTop: "1.5rem", marginBottom:"1.5rem"}} data-test="row">                          
                                    <div data-test="row" className="row">
                                        <button data-test="button" type="button" className="btn-info btn Ripple-parent" style={{width: "400px", height: "40px"}}>Let's Play!<div data-test="waves" className="Ripple "></div></button>
                                    </div>  
                                </div>                                      
                            </form>                        
                        </div>                        
                    </MDBCol>                    
                </MDBRow>
                <MDBRow>
                    <MDBCol md="12" className="mb-r">
                        <h4 className="text-uppercase my-3">Lotto Results:</h4>
                        <div data-test="container" className="container-fluid section mb-5 p-3">                            
                            <div class="table-div">   
        
            
                            </div>             
                                               
                        </div>                        
                    </MDBCol>                    
                </MDBRow>
            </MDBContainer>

            
        
        );
    }

    // fetchResults = () => {
    //     fetch.get('/lotto_results')
    //     .then(res => res.json())
    //     .then(res => this.setState({ drawResults: res.data}))
    //     .catch(err => console.log(err));
    // }

    // playLotto = (e) => {

    //     e.preventDefault();

    //     fetch.post('/formSubmit',{
    //         method: 'post',
    //         headers: {
    //             "Accept": "application/json",
    //             "Content-Type": "application/json"
    //             //"Content-Type": "application/x-www-form-urlencoded"
    //         },
    //         body: JSON.stringify({                
    //             mainDrawSet: this.state.mainDrawSet,
    //             mainBallsDrawn: this.state.mainBallsDrawn,
    //             powerBallSet: this.state.powerBallSet,
    //             powerballBallsDrawn: this.state.powerballBallsDrawn
    //         }).then(res => res.json())            
    //         .then(data => {

    //             this.setState({
    //                 mainDrawSet: 0,
    //                 mainBallsDrawn: 0,
    //                 powerBallSet: 0,
    //                 powerballBallsDrawn: 0
    //             })
    //         }).catch(err => console.log(err))
    //     })
    // }
    
    // mainDrawSet: this.state.mainDrawSet,
    // mainBallsDrawn: this.state.mainBallsDrawn,
    // powerBallSet: this.state.powerBallSet,
    // powerballBallsDrawn: this.state.powerballBallsDrawn
              
}
App = Radium(App);

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(
        <App />
        , document.getElementById('app'));
}
