import React from 'react'
import { Link } from 'react-router-dom'

class Traintimes extends React.Component {
      
    render() {
      return (

      <div className="container">
                                
        <div className="createform-div">

            <h3 className="text-center">Cape Town Train Times</h3>

            <form>
              <div className="row">
                <div className="col">
                  <select className="form-control" id="exampleFormControlSelect1">
                    <option selected>Origin</option>
                    <option value="">Observatory</option>
                    <option value="">Rosebank</option>
                    <option value="">Rondebosch</option>
                    <option value="">Claremont</option>
                    <option value="">Steenberg</option>
                    <option value="">Muizenberg</option>
                    <option value="">Simon's town</option>
                    <option value="">St James</option>
                    <option value="">Fish Hoek</option>
                  </select>
                </div>
                <div className="col">
                  <select className="form-control" id="exampleFormControlSelect1">
                    <option selected>Destination</option>
                    <option value="">Observatory</option>
                    <option value="">Rosebank</option>
                    <option value="">Rondebosch</option>
                    <option value="">Claremont</option>
                    <option value="">Steenberg</option>
                    <option value="">Muizenberg</option>
                    <option value="">Simon's town</option>
                    <option value="">St James</option>
                    <option value="">Fish Hoek</option>
                  </select>
                </div>
                <div className="col-auto">
                  <button type="submit" className="btn btn-primary mb-2">Go</button>
               </div>
              </div>
            </form>
        </div>          
      </div>      
    
      );
    }
}
export default Traintimes;