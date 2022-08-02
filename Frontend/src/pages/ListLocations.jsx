import Cards from "../Components/ClassCard";
import img from './images/1.jpg';
import './PagesStatic/LocationPage.css';
import React, { useEffect, useState } from "react"
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css';
import { changeCurrentLocation } from '../store/actions/action'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from "react-router-dom";

function Locations() {
  const dispatch = useDispatch()
  const currentLocation = useSelector((state) => state.currentLocation);
  const [locations, setlocation] = useState([])
  const [selectService, setSelectService] = useState("")
  const [selectCity, setSelectCity] = useState("")
  const [ChooseCity, setChooseCity] = useState(false)
  const [ChooseService, setChooseService] = useState(false)
  const [governorates, setGovernorates] = useState(
    ["Alexandria", "Aswan", "Asyut", "Beheira", "Beni Suef", "Cairo", "Dakahlia", "Damietta", "Faiyum",
      "Gharbia", "Giza", "Ismailia", "Kafr El Sheikh", "Luxor", "Matruh", "Minya", "Monufia", "New Valley",
      "North Sinai", "Port Said", "Qalyubia", "Qena", "Red Sea", "Sharqia", "Sohag", "South Sinai", "Suez"]
  )
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/listlocation/")
      .then((res) => setlocation(res.data))
      .catch((err) => console.log(err))
  }, [])
  function o(location) {
    if (location === null | location === undefined) {
      return "/ACC Logo.png"
    } else {
      return location
    }
  }
  function changeData(e) {
    if (e.target.name === "city") {
      if (e.target.value === "") {
        setChooseCity(false)
      } else {
        setSelectCity(e.target.value)
        setChooseCity(true)
        console.log(e.target.value)
      }
    }
    else {
      if (e.target.value === "") {
        setChooseService(false)
      } else {
        setSelectService(e.target.value)
        setChooseService(true)
        console.log(e.target.value)
      }
    }
  }
  return (
    <>
      <div className=" container DivZZ">
        <h2 className="main-title my-5">Animal Care Locations</h2>
        <div className="container-fluid">
          <div className="fil row">
            <div className=" ServicesDiv col-4">
              <select required className="form-select" aria-label="Default select example" id='serv444' name="service" onChange={(e) => changeData(e)}>
                <option selected value="">All Services</option>
                <option value='Wellness Exams & Vaccinations'>Wellness Exams & Vaccinations</option>
                <option value='Boarding & Grooming Services'>Boarding & Grooming Services</option>
                <option value='Animal Emergency Services'>Animal Emergency Services</option>


              </select>
            </div>
            <div className=" cities col-4">
              <select required className="form-select" aria-label="Default select example" id="gov" name="city" onChange={(e) => changeData(e)}>
                <option selected value="">All Cities</option>
                {governorates.map(gov => {
                  return (<>
                    <option value={gov}>{gov}</option>
                  </>)
                })}
              </select>
            </div>
          </div>
        </div>

        <div className="articles" id="articles">
          <div className="container">
            {locations.map(location => {
              return (
                <>




                  {(ChooseCity && ChooseService) ?
                    <>
                      {(location.governorate === selectCity && location.service === selectService) &&
                        <Link to={`detailslocations/${location.id}`} style={{ color: "black" }}>
                          <div className="box">
                            <img src={require(`../media/profileImages${o(location.picture)}`)} alt="" style={{ maxHeight: "200px" }} />
                            <div className="content">
                              <h5>{location.name}</h5>
                              <p className="fs-6">{location.service}</p>
                              <p className="fs-6">{location.governorate}</p>
                              <p className="fs-6">{location.address}</p>
                              <p className="fs-6">Price : {location.price}$</p>
                            </div>
                            <div className="info">
                              <Link to={`detailslocations/${location.id}`} className="de">Details</Link>
                              <i className="fas fa-long-arrow-alt-right"></i>
                            </div>
                          </div>
                        </Link>
                      }
                    </>
                    :
                    <>
                      {ChooseCity ?
                        <>
                          {location.governorate === selectCity &&
                            <Link to={`detailslocations/${location.id}`} style={{ color: "black" }}>
                              <div className="box">
                                <img src={require(`../media/profileImages${o(location.picture)}`)} alt="" style={{ maxHeight: "200px" }} />
                                <div className="content">
                                  <h5>{location.name}</h5>
                                  <p className="fs-6">{location.service}</p>
                                  <p className="fs-6">{location.governorate}</p>
                                  <p className="fs-6">{location.address}</p>
                                  <p className="fs-6">Price : {location.price}$</p>
                                </div>
                                <div className="info">
                                  <Link to={`detailslocations/${location.id}`} className="de">Details</Link>
                                  <i className="fas fa-long-arrow-alt-right"></i>
                                </div>
                              </div>
                            </Link>
                          }
                        </>
                        :
                        <>
                          {ChooseService ?
                            <>
                              {location.service === selectService &&
                                <Link to={`detailslocations/${location.id}`} style={{ color: "black" }}>
                                  <div className="box">
                                    <img src={require(`../media/profileImages${o(location.picture)}`)} alt="" style={{ maxHeight: "200px" }} />
                                    <div className="content">
                                      <h5>{location.name}</h5>
                                      <p className="fs-6">{location.service}</p>
                                      <p className="fs-6">{location.governorate}</p>
                                      <p className="fs-6">{location.address}</p>
                                      <p className="fs-6">Price : {location.price}$</p>
                                    </div>
                                    <div className="info">
                                      <Link to={`detailslocations/${location.id}`} className="de">Details</Link>
                                      <i className="fas fa-long-arrow-alt-right"></i>
                                    </div>
                                  </div>
                                </Link>
                              }
                            </>
                            :
                            <Link to={`detailslocations/${location.id}`} style={{ color: "black" }}>
                              <div className="box">
                                <img src={require(`../media/profileImages${o(location.picture)}`)} alt="" style={{ maxHeight: "200px" }} />
                                <div className="content">
                                  <h5>{location.name}</h5>
                                  <p className="fs-6">{location.service}</p>
                                  <p className="fs-6">{location.governorate}</p>
                                  <p className="fs-6">{location.address}</p>
                                  <p className="fs-6">Price : {location.price}$</p>
                                </div>
                                <div className="info">
                                  <Link to={`detailslocations/${location.id}`} className="de">Details</Link>
                                  <i className="fas fa-long-arrow-alt-right"></i>
                                </div>
                              </div>
                            </Link>
                          }
                        </>
                      }
                    </>
                  }






                </>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
export default Locations;