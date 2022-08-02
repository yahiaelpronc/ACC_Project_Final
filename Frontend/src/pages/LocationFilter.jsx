import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './PagesStatic/NewSchedule.css';
import { Link } from "react-router-dom";


function LocationFilter(){



    return(
        <>
         <div className="articles" id="articles">
        <h2 className="main-title">Animal Care Locations</h2>
        <div>
        </div>
        <p>Filter</p>
        <div className="container">

          <div className="box" style={{height:"400px"}}>
            <img src={require(`./images/ccc.jpg`)} alt="" />
            <div className="content">
              <h5>Animal Care Center</h5>
              <p className="detail">Our Service</p>
              <p className="detail">13th St-Cairo</p>
            </div>
            <div className="info">
              <Link to="" className="de">Details</Link>
              <i className="fas fa-long-arrow-alt-right"></i>
            </div>
          </div>
          <div className="box" style={{height:"400px"}}>
            <img src={require(`./images/2.webp`)} alt="" />
            <div className="content">
              <h5>Veterinary Hospital</h5>
              <p className="detail">Our Service</p>
              <p className="detail">13th St-Cairo</p>
            </div>
            <div className="info">
              <Link to="" className="de">Details</Link>
              <i className="fas fa-long-arrow-alt-right"></i>
            </div>
          </div>
          <div className="box" style={{height:"400px"}}>
            <img src={require(`./images/dental.jpg`)} alt="" />
            <div className="content">
              <h5>Animal Care Center</h5>
              <p className="detail">Our Service</p>
              <p className="detail">13th St-Cairo</p>
            </div>
            <div className="info">
              <Link to="" className="de">Details</Link>
              <i className="fas fa-long-arrow-alt-right"></i>
            </div>
          </div>
          <div className="box" style={{height:"400px"}}>
            <img src={require(`./images/dd.jpg`)} alt="" style={{height:'170px'}} />
            <div className="content">
              <h5>Animal Care Center</h5>
              <p className="detail">Our Service</p>
              <p className="detail">13th St-Cairo</p>
            </div>
            <div className="info">
              <Link to="" className="de">Details</Link>
              <i className="fas fa-long-arrow-alt-right"></i>
            </div>
          </div>
          
          
        </div>
      </div>
      <div className="spikes"></div>


        
        </>
    )
}
export default LocationFilter;