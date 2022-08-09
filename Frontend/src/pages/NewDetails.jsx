////////////////////////////.;i9998import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './PagesStatic/NewSchedule.css';
import { changeCurrentLocation } from '../store/actions/action'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import axios from "axios"
import {host_var} from "../vars_react"


function NewDetails() {
    const history = useHistory()
    const loggedUser = useSelector((state) => state.loggedUser);
    const [currentLocationDetails, setCurrentLocationDetails] = useState([])
    const [reqDate, setreqDate] = useState("")
    const [reqTime, setreqTime] = useState("")
    const [reqType, setreqType] = useState("")
    const [submitErr, setsubmitErr] = useState("")
    const [reqPeriod, setreqPeriod] = useState("")
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
    const [errdata, seterrdata] = useState({
        reqdateerr: "",
        reqtimeerr: "",
        reqperioderr: "",
    })
    function isInTheFuture(date) {
        let today = new Date();
        // 👇️ OPTIONAL!
        // This line sets the time of the current date to the
        // last millisecond, so the comparison returns `true` only if
        // date is at least tomorrow
        today.setHours(23, 59, 59, 998);
        console.log(date)
        return date < today;
    }
    function changeData(e) {
        if (e.target.name === "date") {
            if (isInTheFuture(new Date(String(e.target.value)))) {
                seterrdata({
                    ...errdata,
                    reqdateerr: "Please Choose A Correct Date"
                })
                setreqDate("")
            } else {
                seterrdata({
                    ...errdata,
                    reqdateerr: ""
                })
                setreqDate(e.target.value)
            }
        }
        else if (e.target.name === "time") {
            setreqTime(e.target.value)
            seterrdata({
                reqtimeerr: e.target.value > 12 ? "Hours Must Be Less Than 12" : ""
            })
        }
        else if (e.target.name === "type") {
            setreqType(e.target.value)
        }
        else {
            setreqPeriod(e.target.value)
        }
    }
    const insertServiceRequest = async (e) => {
        e.preventDefault()
        let formField = new FormData()
        formField.append("locationName", currentLocationDetails.name)
        formField.append("serviceName", currentLocationDetails.service)
        formField.append("locationOwner", currentLocationDetails.owner)
        formField.append("animalOwner", loggedUser.username)
        formField.append("price", currentLocationDetails.price)
        formField.append("date", reqDate)
        formField.append("time", reqTime)
        formField.append("timePeriod", reqPeriod)
        formField.append("AnimalType", reqType)
        await axios({
            method: 'POST',
            url: `${host_var}/api/insertServiceRequest/`,
            data: formField
        }).then((res) => {
            if (res.data === "Please Choose Animal Type" | res.data === "Please Choose Time Period") {
                setsubmitErr(res.data)
            }
            else {
                console.log(res.data)
                sendNotification(currentLocationDetails.owner, "service")
                history.push("/UserServiceResponses")
            }
        })
            .catch((err) => console.log(err))
    }
    const sendNotification = async (username, type) => {
        let formField = new FormData()
        formField.append("receiver", username)
        formField.append("type", type)
        await axios({
            method: 'POST',
            url: `${host_var}/api/insertNotifications/`,
            data: formField
        }).then((res) => {
            console.log("Notification Sent")
        })
            .catch((err) => console.log(err))
    }
    return (
        <>
            <h2 className="main-title" id="lists">List Animal Locations</h2>

            <div className=" dogDev container-fluid">
                <div className="container-fluid row">
                    <div className="col-xl-4">
                        <img src={require(`../media/profileImages${o(currentLocationDetails.picture)}`)} alt="" id="newsPhoto" />
                    </div>
                    <div className="col-xl-4" id="det">
                        <ul className="list-group list-group-flush" id="ull">
                            <li className="list-group-item">
                                <h5 id="qqq">{currentLocationDetails.name}</h5>

                            </li>
                            <li className=" kk list-group-item">
                                <div className="line">
                                    <i className="fas fa-map-marker-alt fa-fw"></i>
                                    <span className="phSpan">{currentLocationDetails.address}</span>
                                </div>

                            </li>
                            <li className=" kk list-group-item">
                                <div className="line">
                                    <i className="fas fa-phone-volume fa-fw" id="phone"></i>
                                    <span className="phSpan">+2{currentLocationDetails.mobile}</span>
                                </div>

                            </li>
                            <li className=" kk list-group-item">
                                <i class="fa-solid fa-money-bill-wave" id="bill"></i>
                                <span className="phSpan">Price Range : {currentLocationDetails.price}$</span>

                            </li>
                            <li className=" kk list-group-item">
                                <i class="fa-solid fa-angles-right" id="serv"></i>
                                <span className="phSpan">Service : {currentLocationDetails.service}</span>

                            </li>


                        </ul>
                    </div>
                    <div className=" colll col-xl-4">
                        <div className="input-group">
                            <input type="date" value={reqDate} onChange={(e) => changeData(e)} name="date"
                                className="det form-control" placeholder="Enter Desired Date" aria-label="date" aria-describedby="basic-addon1" />
                        </div>
                        <p className="text-danger" style={{ fontSize: "13px" }}>{errdata.reqdateerr}</p>
                        <div className="input-group">
                            <input type="number" value={reqTime} onChange={(e) => changeData(e)} name="time"
                                className="det form-control" placeholder="Enter Desired Time" aria-label="time" aria-describedby="basic-addon1" />
                        </div>
                        <p className="text-danger" style={{ fontSize: "13px" }}>{errdata.reqtimeerr}</p>
                        <select required value={reqPeriod} onChange={(e) => changeData(e)} name="period" class="form-select mb-5" aria-label="Default select example">
                            <option selected value="">Choose Period</option>
                            <option value="am">AM</option>
                            <option value="pm">PM</option>
                        </select>
                        <select required value={reqType} onChange={(e) => changeData(e)} name="type" class="form-select" aria-label="Default select example">
                            <option selected value="">Animal Type</option>
                            <option value="cat">cat</option>
                            <option value="dog">dog</option>
                        </select>
                        <p className="text-danger" style={{ fontSize: "13px" }}>{submitErr}</p>
                        <button className="btn" id="book" disabled={errdata.reqtimeerr || errdata.reqdateerr}
                            onClick={(e) => insertServiceRequest(e)}>Book Service</button>
                    </div>
                </div>
            </div>

        </>
    )
}
export default NewDetails;