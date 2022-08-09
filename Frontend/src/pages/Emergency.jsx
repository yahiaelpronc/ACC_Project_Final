import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
// import { Helmet } from "react-helmet";
import './PagesStatic/EmergencyCSS.css';
import { useSelector, useDispatch } from 'react-redux'
import { changeUser, changeVet, changeLogged, changeLoggedType, changcurrentPage } from '../store/actions/action'
import axios from 'axios'
import { useState, useEffect } from 'react'
import {host_var} from "../vars_react"
function Emergency() {
    const loggedUser = useSelector((state) => state.loggedUser);
    const currentVet = useSelector((state) => state.currentVet);
    const currentPage = useSelector((state) => state.currentPage);
    const [governorates, setGovernorates] = useState(
        ["Alexandria", "Aswan", "Asyut", "Beheira", "Beni Suef", "Cairo", "Dakahlia", "Damietta", "Faiyum",
            "Gharbia", "Giza", "Ismailia", "Kafr El Sheikh", "Luxor", "Matruh", "Minya", "Monufia", "New Valley",
            "North Sinai", "Port Said", "Qalyubia", "Qena", "Red Sea", "Sharqia", "Sohag", "South Sinai", "Suez"]
    )
    const [messages, setMessages] = useState([])
    const [vets, setVets] = useState([])
    const [vetFullData, setVetFullData] = useState([])
    const [locations, setLocations] = useState([])
    const [DidGetMessages, setDidGetMessages] = useState(false)
    const [DidGetLocations, setDidGetLocations] = useState(false)
    const [DidGetVets, setDidGetVets] = useState(false)
    const [IntervalVariable, setIntervalVariable] = useState()
    const [sentMessage, setSentMessage] = useState("")
    const [selectedVet, setSelectedVet] = useState("")
    const [isOnlineColor, setIsOnlineColor] = useState("grey")
    const [scrollNeeded, setscrollNeeded] = useState(true)
    const [selectedCity, setSelectedCity] = useState(loggedUser.governorate)
    const dispatch = useDispatch()
    useEffect(() => () => dispatch(changcurrentPage("")), []);
    useEffect(() => {
        axios.get(`${host_var}/findvet/${currentVet}/`)
            .then((res) => {
                setVetFullData(res.data)
                console.log(res.data)
            }
            )
            .catch((err) => console.log(err))
        if (vetFullData.isOnline) {
            setIsOnlineColor("rgba(52, 183, 0, 0.6)")
        } else {
            setIsOnlineColor("rgba(187, 187, 187, 0.6)")
        }
    }, [messages])
    useEffect(() => {
        dispatch(changcurrentPage("emergency"))
        axios.get(`${host_var}/listvets/`)
            .then((res) => {
                console.log(res.data)
                setVets(res.data)
                setDidGetVets(true)
            }
            )
            .catch((err) => console.log(err))
        axios.get(`${host_var}/listlocation/`)
            .then((res) => {
                console.log(res.data)
                setLocations(res.data)
                setDidGetLocations(true)
            }
            )
            .catch((err) => console.log(err))
    }, [])


    const sendMessage = async (e) => {
        setscrollNeeded(true)
        let formField = new FormData()
        formField.append('content', sentMessage)
        formField.append('sender', loggedUser.username)
        formField.append('receiver', currentVet)
        await axios({
            method: 'post',
            url: `${host_var}/addMessage/`,
            data: formField
        }).then((response) => console.log(response.data))
            .catch((err) => console.log(err))
        setSentMessage("")
        await sleep(300)
        if (scrollNeeded) {
            let scroll_to_bottom = document.getElementById('chat-content');
            scroll_to_bottom.scrollTop = scroll_to_bottom.scrollHeight;
            setscrollNeeded(false)
        }
    }


    function changeMessage(e) {
        setSentMessage(e.target.value)
    }





    function myFunction(e) {
        document.getElementById("card_chat").style.display = "block";
        // SET CURRENT VET IN SESSION
        dispatch(changeVet(e.target.id))
        getAllMessages(e)
    }



    function getAllMessages(e) {
        // GET MESSAGES FROM BACKEND
        clearInterval(IntervalVariable);
        setMessages([])
        setIntervalVariable(
            setInterval(function () {
                axios.get(`${host_var}/getAllMessages/${loggedUser.username}/${e.target.id}`)
                    .then((res) => {
                        // console.log(res.data)
                        setMessages(res.data)
                        setDidGetMessages(true)
                    }
                    )
                    .catch((err) => console.log(err))
            }
                , 300))
    }


    function closeWindow(e) {
        clearInterval(IntervalVariable);
        document.getElementById("card_chat").style.display = "none";
        // CLEAR CURRENT VET IN SESSION
        dispatch(changeVet([]));
    }
    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            e.preventDefault()
            sendMessage(e)
        }
    }
    useEffect(() => {
        return () => {
            clearInterval(IntervalVariable);
        };
    }, []);
    return (
        <>
            <div className="row mt-3">
                <div className="col-md-4">
                    <h2 className="main-title my-5">Nearest Locations</h2>
                    <select class="form-select card1 mb-3" aria-label="Default select example" style={{ maxWidth: "70%" }} onChange={(e) => setSelectedCity(e.target.value)}>
                        {governorates.map(gov => {
                            return (<>
                                {gov === selectedCity ?
                                    <option selected value={gov}>{gov}</option> :
                                    <option value={gov}>{gov}</option>
                                }
                            </>)
                        })}
                    </select>
                    <div className="wrapper">
                        {DidGetLocations &&
                            locations.map(location => {
                                return (<>
                                    {(selectedCity === location.governorate && location.service === "Animal Emergency Services") &&
                                        <Link to={`detailslocations/${location.id}`} style={{ textDecoration: "none", color: "black" }}>
                                            <div className="card1 p-2" style={{ height: "fitContent", width: "fitContent" }}>
                                                {(location.picture === null | location === undefined) ?
                                                    <img src={require(`../media/profileImages/ACC Logo.png`)} alt="React Logo" height={200} width={250} />
                                                    :
                                                    <img src={require(`../media/profileImages${location.picture}`)} alt="React Logo" height={200} width={250} />
                                                }
                                                <div className="content mt-3">
                                                    <h4><strong>{location.name}</strong></h4>
                                                    <p>Phone Number : {location.mobile} </p>
                                                    <p>Address : {location.address}</p>
                                                    <p>Website : {location.website_link}
                                                        <Link to={location.website_link} target="blank">
                                                        </Link>
                                                    </p>
                                                    <p>Work Hours : {location.work_hours_start}-{location.work_hours_start_period} <strong>:</strong> {location.work_hours_end}-{location.work_hours_end_period}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    }
                                </>
                                );
                            })
                        }
                    </div>
                </div>
                <div className="col-md-8 doctor" id="doc">
                    <div className="demo-content bg-alt">
                        <h2 className="main-title my-5">Doctors</h2>
                        <div className=" text-center m-auto col-md-4 col-sm-7 col-xs-12">
                            {DidGetVets &&
                                vets.map(vet => {
                                    return (<>
                                        <div className="testimonials bg-transparent" id="testimonials">
                                            <div className="container container1">
                                                <div className="box box3">
                                                    {vet.profile_pic === null ?
                                                        <img src={require(`../media/profileImages/ACC Logo.png`)} alt="React Logo" height={200} width={250} />
                                                        :
                                                        <img src={require(`../media/profileImages${vet.profile_pic}`)} alt="React Logo" height={150} width={150} />
                                                    }
                                                    <h3 class="mt-5">Vet Name : {vet.firstname}</h3>
                                                    <span className="title">Specialization : {vet.specialization}</span>
                                                    <p>Phone : {vet.mobile}</p>
                                                    <div className="mt-4">
                                                        {loggedUser.length < 1 ?
                                                            <button type="button" className="btn btn-success" id={vet.username} >
                                                                <Link style={{ color: "white", textDecoration: "none" }} to="/login" id={vet.username}>Login To
                                                                    Chat</Link>
                                                            </button>
                                                            :
                                                            <button type="button" className="btn btn-primary" id={vet.username}
                                                                onClick={(e) => myFunction(e)}>chat</button>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>


                {/* CHAT */}
                <div className="col-md-4 mb-5" style={{ zIndex: "5" }}>
                    <div className="pad">
                        <div className="row d-flex justify-content-center chats">
                            <div className="col-md-12">
                                <div className="cards card-bordered" id="card_chat">
                                    <div className="card-header">
                                        <h4 className="card-title"><strong className="text-white"
                                            id="receiver-name"><i class="fa-solid fa-circle" style={{ color: `${isOnlineColor}` }}></i> {currentVet}</strong></h4>
                                        <Link className="btn btn-xs btn-secondary" to={`SendSurgeryUser/${currentVet}`} data-abc="true">Request Assessment</Link>
                                        <button type="button" className="btn-close" aria-label="Close" onClick={(e) => closeWindow(e)}>
                                        </button>
                                    </div>
                                    <div className="ps-container ps-theme-default ps-active-y chat-container" id="chat-content">
                                        <div className="media media-chat media-chat-reverse ps-0">
                                            <div className="media-body" id="MessageDivReverse">
                                                {DidGetMessages &&
                                                    messages.map(message => {
                                                        return (<>
                                                            <div key={message.id}>
                                                                <p className="meta">{message.sender}</p>
                                                                {message.sender === loggedUser.username ?
                                                                    <p>{message.content}</p> :
                                                                    <p style={{ backgroundColor: "rgb(127, 127, 127)" }}>{message.content}</p>
                                                                }
                                                                <p className="meta">{message.date}</p>
                                                            </div>
                                                        </>
                                                        );
                                                    })
                                                }
                                            </div>
                                        </div>
                                        <div className="ps-scrollbar-x-rail" style={{ left: "0px", bottom: "0px" }}>
                                            <div className="ps-scrollbar-x" tabIndex="0" style={{ left: "0px", width: "0px" }}>
                                            </div>
                                        </div>
                                        <div className="ps-scrollbar-y-rail"
                                            style={{ top: "0px", height: "0px", right: "2px" }}>
                                            <div className="ps-scrollbar-y" tabIndex="0" style={{ top: "0px", height: "2px" }}>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="publisher bt-1 border-light">
                                        {/* <form action=""> */}
                                        <input className="publisher-input" type="text" placeholder="Write something"
                                            id="Message" onChange={(e) => changeMessage(e)} value={sentMessage} onKeyDown={(e) => handleKeyDown(e)} />
                                        <Link className="publisher-btn text-info" data-abc="true">
                                            <i className="fa fa-paper-plane" onClick={(e) => sendMessage(e)}></i>
                                        </Link>
                                        {/* </form> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Emergency;