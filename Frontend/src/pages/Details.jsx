import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changeCurrentLocation } from '../store/actions/action'
import Cards from "../Components/ClassCard";
import {host_var} from "../vars_react"
function DetailsLocations() {
  const [currentLocationDetails, setCurrentLocationDetails] = useState([])
  useEffect(() => {
    console.log(window.location.href.split("/")[4])
    axios.get(`${host_var}/api/locationDetails/${window.location.href.split("/")[4]}/`)
      .then((res) => setCurrentLocationDetails(res.data))
      .catch((err) => console.log(err))
  }, [])
  function o(location) {
    if (location === null | location === undefined) {
      return "/ACC Logo.png"
    } else {
      return location
    }
  }

  return (
    <>
      <h2 className="main-title">Detailed Locations</h2>
      <div className="container-fluid">
        <div className="container-fluid row">
          <div className="col-4">
            <img className="image1" src={require(`../media/profileImages${o(currentLocationDetails.picture)}`)} alt="" />
          </div>
          <div className="col-8">
            <h3>{currentLocationDetails.name}</h3>
            <div className="box">
              <div className="line">
                <i className="fas fa-map-marker-alt fa-fw"></i>
                <div className="info">{currentLocationDetails.address}</div>
              </div>
              <div className="line">
                <i className="far fa-clock fa-fw"></i>
                <div className="info">Business Hours: From {currentLocationDetails.work_hours_start}
                  {currentLocationDetails.work_hours_start_period} To {currentLocationDetails.work_hours_end}
                  {currentLocationDetails.work_hours_end_period}
                </div>
              </div>
              <div className="line">
                <i className="fas fa-phone-volume fa-fw"></i>
                <div className="info">
                  <span>+2{currentLocationDetails.mobile}</span>
                </div>
              </div>
              <div className="line">
                <i className="fa-solid fa-envelope"></i>
                <div className="info">{currentLocationDetails.email}</div>
              </div>
              <div className="line">
                <i className="fa-solid fa-link"></i>
                <div className="info">
                  <a target="blank" href={currentLocationDetails.website_link}>{currentLocationDetails.website_link}</a>
                </div>
              </div>
              <div className="line">
                <i className="fa-solid fa-briefcase"></i>
                <div className="info">Services : {currentLocationDetails.service}</div>
              </div>
              <div className="line">
                <i class="fa-regular fa-message"></i>
                <div className="info">{currentLocationDetails.description}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default DetailsLocations;