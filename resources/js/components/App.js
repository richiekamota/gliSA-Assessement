
import React, {Component, useEffect, useState} from 'react';
import ReactDOM from "react-dom";
import { render } from 'react-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { NumberPicker } from 'react-widgets';
import PropTypes from "prop-types";
import Radium, {Style} from 'radium';
import { MDBBtn, MDBInput, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBIcon, MDBBadge, MDBContainer, MDBRow, MDBCol, MDBSelect, MDBInputNumeric} from "mdbreact";


class App extends Component {  

    static propTypes = {
        kind: PropTypes.oneOf(['input','button'])
    };

    constructor(props) {
        super(props);
        
        this.state = {

            drawResults: [], 
                  
            mainDrawSet: 40,
            mainBallsDrawn: 5,
            powerBallSet: 5,
            powerballBallsDrawn: 0
           
        };        
    }

      componentDidMount(){
        this.fetchResults();
   }
    
  
    playLotto = (mainDrawSet,mainBallsDrawn,powerBallSet,powerballBallsDrawn) => {    
            
        fetch('/api/draw',{                
                method: 'post',
                body: JSON.stringify({draw:this.state}),
                headers: {
                    'Access-Control-Allow-Origin':'*',
                    'Content-Type':'x-www-form-urlencoded',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',                     
                }
            })
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
        this.fetchResults();
        
    };

    submit = () => {

        this.playLotto(this.state.mainDrawSet,this.state.mainBallsDrawn,this.state.powerBallSet,this.state.powerballBallsDrawn)

        this.setState({
           
            mainDrawSet: 40,
            mainBallsDrawn: 5,
            powerBallSet: 5,
            powerballBallsDrawn: 0
           
        })
        this.fetchResults();
    };

     exportTasks = () => {

        fetch('/api/tasks',{                
            method: 'post',
            headers: {
                'Access-Control-Allow-Origin':'*',
                'Content-Type':'x-www-form-urlencoded',
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',                     
            }
        })
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })           
        console.log('PowerBallSet:'+ this.state);  
    }
     
    
     fetchResults = () => {
        return fetch('http://lotto.gli/api/lotto_results', {
            method: 'GET',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    "Access-Control-Allow-Origin": "*",
                    'Content-Type':'application/json',
                    'Accept':'application/json'
                }
            })
            .then((res) => res.json())
            .then(res => this.setState({ drawResults: res.data}))
            .catch(err => console.log(err));
    } 
   
    render() {
    
       console.log('PowerBallSet:'+ this.state);
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
                                            <label style={{ position: "relative", marginTop: "1.5rem", marginBottom:"1rem"}} htmlFor="mainDrawSet">Number of balls in main draw set</label>
                                            <NumberPicker min={40} max={49} defaultValue={40} type="number" className="custom-select" id="mainDrawSet" value={this.state.mainDrawSet} onChange={mainDrawSet => this.setState({ mainDrawSet})} style={{width: "400px", height: "40px"}}/>                            
                                            <label style={{ position: "relative", marginTop: "1.5rem", marginBottom:"1rem"}} htmlFor="mainDrawSet">Please choose a number between 40 and 49</label>
                                        </div>
                                    </div>
                                    <div data-test="col" className="col">
                                        <div className="md-form form-group form-lg md-bg">
                                            <label style={{ position: "relative", marginTop: "1.5rem", marginBottom:"1rem"}} htmlFor="mainDraw">Number of balls in main draw</label>
                                            <NumberPicker min={5} max={7} defaultValue={5} type="number" className="custom-select" id="mainDraw" value={this.state.mainBallsDrawn} onChange={mainBallsDrawn => this.setState({ mainBallsDrawn })} style={{width: "400px", height: "40px"}}/>
                                            <label style={{ position: "relative", marginTop: "1.5rem", marginBottom:"1rem"}} htmlFor="mainDraw">Please choose a number between 5 and 7</label>      
                                        </div>                            
                                    </div>       
                                </div>                       
                                 
                                <div className="mx-3 grey-text row" style={{ position: "relative", marginTop: "1.5rem", marginBottom:"1.5rem"}} data-test="row"> 
                                    <div className="form-row align-items-center">
                                        <div data-test="col" className="col">
                                            <div className="md-form form-group form-lg md-bg" style={{position: "relative", marginTop: "1.5rem", marginBottom: "1.5rem"}}>
                                                <label htmlFor="powerBallSet" style={{ position: "relative", marginTop: "0.5rem", marginBottom:"0.5rem"}}>Powerball Set</label>
                                                <NumberPicker min={5} max={49} defaultValue={5} type="number" className="custom-select" id="powerBallSet" value={this.state.powerBallSet} onChange={powerBallSet => this.setState({ powerBallSet })} style={{width: "400px", height: "40px"}}/>  
                                                <label htmlFor="powerBallSet" style={{ position: "relative", marginTop: "0.5rem", marginBottom:"0.5rem"}}>Please choose a number between 5 and 49</label>
                                            </div>                            
                                        </div>
                                        <div data-test="col" className="col">
                                            <div className="md-form form-group form-lg md-bg">
                                                <label htmlFor="powerBall" style={{ position: "relative", marginTop: "0.5rem", marginBottom:"0.5rem"}}>Number of powerball balls</label>
                                                <NumberPicker min={0} max={3} defaultValue={0} type="number" className="custom-select" value={this.state.powerballBallsDrawn} onChange={powerballBallsDrawn => this.setState({ powerballBallsDrawn})} id="powerBall" style={{width: "400px", height: "40px"}}/>  
                                                <label htmlFor="powerBall" style={{ position: "relative", marginTop: "0.5rem", marginBottom:"0.5rem"}}>Please choose a number between 0 and 3</label>     
                                            </div>                            
                                        </div>                              
                                    </div>                       
                                </div>
                                <div className="mx-3 grey-text row" style={{ position: "relative", marginTop: "1.5rem", marginBottom:"1.5rem"}} data-test="row">                          
                                    <div data-test="row" className="row">
                                        <button data-test="button" type="button" className="btn-info btn Ripple-parent" style={{width: "400px", height: "40px"}} onClick={()=>{this.submit()}}>Let's Play!<div data-test="waves" className="Ripple "></div></button>
                                    </div>  
                                </div>                                     
                            </form>                        
                        </div>                        
                    </MDBCol>                    
                </MDBRow>
                <MDBRow>
                    <MDBCol md="7" className="mb-r">
                        <div className="mx-3 grey-text row" style={{ position: "relative", marginTop: "1.5rem", marginBottom:"1.5rem"}} data-test="row"> 
                            <div className="form-row align-items-center">
                                <div data-test="col" className="col">
                                    <div className="md-form form-group form-lg md-bg" style={{position: "relative", marginTop: "1.5rem", marginBottom: "1.5rem"}}>
                                        <h4 className="text-uppercase my-3">Lotto Results:</h4>                                                   
                                    </div>                            
                                </div>
                                <div data-test="col" className="col">
                                    <div className="md-form form-group form-lg md-bg">                        
                                        <button data-test="button" type="button" className="btn-info btn mr-5 Ripple-parent" style={{width: "400px", height: "40px"}} onClick={()=>{this.exportTasks()}}>Export To CSV</button>
                                    </div>                           
                                </div>                              
                            </div>   
                        </div>                                 
                    </MDBCol>                               
                </MDBRow>

                <MDBRow>                     
                    <MDBCol md="12" className="mb-r">
                       
                        <div className="mx-3 grey-text row" style={{ position: "relative", marginTop: "1.5rem", marginBottom:"1.5rem"}} data-test="row"> 
                            <table className="table center">
                                <thead className="grey lighten-2">
                                    <tr>
                                        <th scope="col">Draw Time</th>
                                        <th scope="col"> Draw Result</th>
                                        <th scope="col"> Number of Main Balls Drawn</th>
                                        <th scope="col">Number of Powerball Balls Drawn</th>
                                    </tr>
                                </thead>
                                {this.state.drawResults.map((result, index) => 
                                    <tbody key={index}>
                                        <tr>
                                        <th scope="row">{result.draw_date}</th>
                                            <td >{result.results}</td>
                                            <td>{result.main_draw_balls}</td>
                                            <td>{result.power_balls}</td>
                                        </tr>
                                    </tbody>
                                            )} 
                            </table>
                        </div>   
                         
                    </MDBCol>         
                </MDBRow>            
            </MDBContainer>            
        
        );
    }               

}
App = Radium(App);

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(
        <App />
        , document.getElementById('app'));
}
