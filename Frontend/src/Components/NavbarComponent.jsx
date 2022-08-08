import React from 'react';
import { Link } from 'react-router-dom'
import Myform from './Myform';
import { useHistory } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { changeUser, changeVet, changeLogged, changeLoggedType, changegotNotification } from '../store/actions/action'
import './ComponentStatic/navbar.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios'
import { useState, useEffect } from 'react'
function NavbarComponent() {

  const loggedUser = useSelector((state) => state.loggedUser);
  const currentVet1 = useSelector((state) => state.currentVet);
  const currentPage = useSelector((state) => state.currentPage);
  const gotNotification = useSelector((state) => state.gotNotification);
  const userType = useSelector((state) => state.type);
  const [messages1, setMessages1] = useState([])
  const [Associated, setAssociated] = useState([])
  const withoutDuplicates = [...new Set(Associated)];
  const [vets, setVets] = useState([])
  const [vetFullData1, setvetFullData1] = useState([])
  const [DidGetMessages1, setDidGetMessages1] = useState(false)
  const [GotAssociated, setGotAssociated] = useState(false)
  const [IntervalVariable1, setIntervalVariable1] = useState()
  const [Notifications, setnotifications] = useState([])
  const [medication_notifications, setmedication_notifications] = useState(0)
  const [service_notifications, setservice_notifications] = useState(0)
  const [surgery_notifications, setsurgery_notifications] = useState(0)
  const [sentMessage1, setsentMessage1] = useState("")
  const [selectedVet, setSelectedVet] = useState("")
  const [hreff, sethreff] = useState(window.location.href)
  const [serviceColor, setserviceColor] = useState("black")
  const [surgeryColor, setsurgeryColor] = useState("black")
  const [medicationColor, setmedicationColor] = useState("black")
  const [IntervalVariable, setIntervalVariable] = useState()
  const [isOnlineColor1, setisOnlineColor1] = useState("grey")
  const [scrollNeeded1, setscrollNeeded1] = useState(true)
  const [GotNotifications, setGotNotifications] = useState(true)
  const [selectedCity, setSelectedCity] = useState(loggedUser.governorate)
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    setAssociated([])
    setMessages1([])
    setmedication_notifications(0)
    setservice_notifications(0)
    setsurgery_notifications(0)
    axios.get(`http://localhost:8000/api/getAllMessagesAssociated/${loggedUser.username}/`)
      .then((res) => {
        console.log("Messages : ", res.data)
        setMessages1(res.data)
        getNotifications()
      }
      )
      .catch((err) => console.log(err))
  }, [loggedUser]);
  useEffect(() => {
    if (userType === "user") {
      axios.get(`http://localhost:8000/api/findvet/${currentVet1}/`)
        .then((res) => {
          setvetFullData1(res.data)
          console.log(res.data)
        }
        )
        .catch((err) => console.log(err))
    }
    else {
      axios.get(`http://localhost:8000/api/finduser/${currentVet1}/`)
        .then((res) => {
          setvetFullData1(res.data)
          console.log(res.data)
        }
        )
        .catch((err) => console.log(err))
    }
    if (vetFullData1.isOnline) {
      console.log("VFD", vetFullData1)
      setisOnlineColor1("rgba(52, 183, 0, 0.6)")
    } else {
      console.log("VFD", vetFullData1)
      setisOnlineColor1("rgba(187, 187, 187, 0.6)")
    }
  }, [messages1])
  useEffect(() => {
    if (messages1.length > 0) {
      messages1.map((message) => {
        if (message.sender !== loggedUser.username) {
          if (!Associated.includes(message.sender)) {
            setAssociated(current => [...current, message.sender]);
          }
        }
        else if (message.sender !== loggedUser.username) {
          if (Associated.includes(message.receiver)) {
            setAssociated(current => [...current, message.receiver]);
          }
        }
      })
      setGotAssociated(true)
      console.log("Associated", Associated)
      console.log("Associated withoutDuplicates", withoutDuplicates)
    }
  }, [messages1])
  function closeWindow() { }
  function handleKeyDown() { }
  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }
  function getAllMessages(e) {
    console.log(e.target.id)
    // GET MESSAGES FROM BACKEND
    clearInterval(IntervalVariable1);
    setMessages1([])
    setIntervalVariable1(
      setInterval(function () {
        axios.get(`http://localhost:8000/api/getAllMessages/${loggedUser.username}/${e.target.id}`)
          .then((res) => {
            // console.log(res.data)
            setMessages1(res.data)
            setDidGetMessages1(true)
          }
          )
          .catch((err) => console.log(err))
      }
        , 300))
  }
  function myFunction(e) {
    document.getElementById("card_chat").style.display = "block";
    // SET CURRENT VET IN SESSION
    dispatch(changeVet(e.target.id))
    getAllMessages(e)
  }
  function closeWindow(e) {
    clearInterval(IntervalVariable1);
    document.getElementById("card_chat").style.display = "none";
    // CLEAR CURRENT VET IN SESSION
    dispatch(changeVet([]));
  }
  const sendMessage = async (e) => {
    setscrollNeeded1(true)
    let formField = new FormData()
    formField.append('content', sentMessage1)
    formField.append('sender', loggedUser.username)
    formField.append('receiver', currentVet1)
    await axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/api/addMessage/',
      data: formField
    }).then((response) => console.log(response.data))
      .catch((err) => console.log(err))
    setsentMessage1("")
    await sleep(300)
    if (scrollNeeded1) {
      let scroll_to_bottom = document.getElementById('chat-content');
      scroll_to_bottom.scrollTop = scroll_to_bottom.scrollHeight;
      setscrollNeeded1(false)
    }
  }
  function changeMessage(e) {
    setsentMessage1(e.target.value)
  }
  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      sendMessage(e)
    }
  }

  function getNotifications() {
    setnotifications([])
    setmedication_notifications(0)
    setservice_notifications(0)
    setsurgery_notifications(0)
    axios.get(`http://localhost:8000/api/countNotifications/${loggedUser.username}/`)
      .then((res) => {
        setnotifications(res.data)
        console.log("Notifications ", res.data)
        setGotNotifications(true)
      }
      )
      .catch((err) => console.log(err))
  }
  if (Notifications.length > 0 && GotNotifications) {
    for (let i = 0; i < Notifications.length; i++) {
      if (Notifications[i].type === "medication") {
        setmedication_notifications(medication_notifications + 1)
      }
      else if (Notifications[i].type === "service") {
        setservice_notifications(service_notifications + 1)
      }
      else {
        setsurgery_notifications(surgery_notifications + 1)
      }
    }
    setGotNotifications(false)
  }
  function deleteNotifications(e) {
    if (e.target.name === "surgeryNotifications") {
      axios.delete(`http://localhost:8000/api/deleteNotifications/${loggedUser.username}/surgery/`)
        .then((res) => {
          getNotifications()
        }
        )
        .catch((err) => console.log(err))
    }
    else if (e.target.name === "serviceNotifications") {
      axios.delete(`http://localhost:8000/api/deleteNotifications/${loggedUser.username}/service/`)
        .then((res) => {
          getNotifications()
        }
        )
        .catch((err) => console.log(err))
    }
    else {
      axios.delete(`http://localhost:8000/api/deleteNotifications/${loggedUser.username}/medication/`)
        .then((res) => {
          getNotifications()
        }
        )
        .catch((err) => console.log(err))
    }
  }
  return (<>
    <div className="header" id="header">
      <div className="container">
        <Link to="/" className="logo my-1">
          <img src={require(`../pages/images/ACC Logo (1).png`)} alt="Navbar Logo" className="logo" />
          <p className="mt-3 mx-3">ACC</p>
        </Link>
        <ul className="main-nav" id='nav22'>
          {loggedUser.length < 1 ?
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
            :
            <>
              {userType === "user" ?
                <>
                  <li><Link to="/emergency">Emergency</Link></li>
                  {currentPage === "" &&
                    <li><a href="#Services">Services</a></li>
                  }
                  {loggedUser.isAdmin &&
                    <li><Link to="/AdminPage2">Add location</Link></li>
                  }
                  {currentPage === "" &&
                    <>
                      <li>
                        {/* <Link to=""> */}
                        <div>
                          {(medication_notifications + service_notifications + surgery_notifications) > 0 ?
                            <Link onClick={(e) => getNotifications(e)} className="btn dropdown-toggle" role="button" id="butNav" data-bs-toggle="dropdown">
                              <span style={{ color: "blue" }}>Notifications</span>
                            </Link>
                            :
                            <Link style={{ color: "black" }} onClick={(e) => getNotifications(e)} className="btn dropdown-toggle" role="button" id="butNav" data-bs-toggle="dropdown">
                              <span style={{ color: "black" }}>Notifications</span>
                            </Link>
                          }
                          <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink" >
                            <>
                              {service_notifications > 0 ?
                                <>
                                  {loggedUser.isOwner ?
                                    <Link to="/ServicesRequest" onClick={(e) => deleteNotifications(e)} name="serviceNotifications" style={{ color: "blue" }} className="dropdown-item" id="surgery">
                                      Services : {service_notifications}</Link>
                                    :
                                    <Link to="/UserServiceResponses" onClick={(e) => deleteNotifications(e)} name="serviceNotifications" style={{ color: "blue" }} className="dropdown-item" id="surgery">
                                      Services : {service_notifications}</Link>
                                  }
                                </>
                                :
                                <>
                                  {loggedUser.isOwner ?
                                    <Link to="/ServicesRequest" onClick={(e) => deleteNotifications(e)} name="serviceNotifications" style={{ color: "black" }} className="dropdown-item" id="surgery">
                                      Services : {service_notifications}</Link>
                                    :
                                    <Link to="/UserServiceResponses" onClick={(e) => deleteNotifications(e)} name="serviceNotifications" style={{ color: "black" }} className="dropdown-item" id="surgery">
                                      Services : {service_notifications}</Link>
                                  }
                                </>
                              }
                              {medication_notifications > 0 ?
                                <Link to="/MedicationUser" onClick={(e) => deleteNotifications(e)} name="medicationNotifications" style={{ color: "blue" }} className="dropdown-item" id="surgery">
                                  Medication : {medication_notifications}</Link>
                                :
                                <Link to="/MedicationUser" onClick={(e) => deleteNotifications(e)} name="medicationNotifications" style={{ color: "black" }} className="dropdown-item" id="surgery">
                                  Medication : {medication_notifications}</Link>
                              }
                              {surgery_notifications > 0 ?
                                <Link to="/SurgicalOperationsUser" onClick={(e) => deleteNotifications(e)} name="surgeryNotifications" style={{ color: "blue" }} className="dropdown-item" id="surgery">
                                  Surgeries : {surgery_notifications}</Link>
                                :
                                <Link to="/SurgicalOperationsUser" onClick={(e) => deleteNotifications(e)} name="surgeryNotifications" style={{ color: "black" }} className="dropdown-item" id="surgery">
                                  Surgeries : {surgery_notifications}</Link>
                              }
                            </>
                          </ul>
                        </div>
                        {/* </Link> */}
                      </li>
                      <li>
                        {/* <Link to=""> */}
                        <div>
                          <Link className="btn dropdown-toggle" to="#" role="button" id="butNav" data-bs-toggle="dropdown">
                            Messages
                          </Link>
                          <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink" >
                            {GotAssociated &&
                              <>
                                {Object.keys(withoutDuplicates).map((key) => (
                                  <>
                                    {withoutDuplicates[key] !== loggedUser.username && <>
                                      <Link className="dropdown-item" onClick={(e) => myFunction(e)}
                                        id={withoutDuplicates[key]}>
                                        {withoutDuplicates[key]}</Link>
                                    </>}
                                  </>
                                ))}
                              </>
                            }
                          </ul>
                        </div>
                        {/* </Link> */}
                      </li>
                    </>
                  }

                  <li><Link to={`/logout`}>Logout</Link></li>
                </>
                :
                <>
                  <li><a href="#Services">Services</a></li>
                  {currentPage === "" &&
                    <>
                      <li>
                        {/* <Link to=""> */}
                        <div>
                          {(service_notifications + surgery_notifications) > 0 ?
                            <Link onClick={(e) => getNotifications(e)} className="btn dropdown-toggle" role="button" id="butNav" data-bs-toggle="dropdown">
                              <span style={{ color: "blue" }}>Notifications</span>
                            </Link>
                            :
                            <Link style={{ color: "black" }} onClick={(e) => getNotifications(e)} className="btn dropdown-toggle" role="button" id="butNav" data-bs-toggle="dropdown">
                              <span style={{ color: "black" }}>Notifications</span>
                            </Link>
                          }
                          <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink" >
                            <>
                              {service_notifications > 0 ?
                                <Link to="/UserServiceResponses" onClick={(e) => deleteNotifications(e)} name="serviceNotifications" style={{ color: "blue" }} className="dropdown-item" id="surgery">
                                  Services : {service_notifications}</Link>
                                :
                                <Link to="/UserServiceResponses" style={{ color: "black" }} name="serviceNotifications" className="dropdown-item" id="surgery">
                                  Services : {service_notifications}</Link>
                              }
                              {surgery_notifications > 0 ?
                                <Link to="/TableOfSurgries" onClick={(e) => deleteNotifications(e)} name="surgeryNotifications" style={{ color: "blue" }} className="dropdown-item" id="surgery">
                                  Surgeries : {surgery_notifications}</Link>
                                :
                                <Link to="/TableOfSurgries" onClick={(e) => deleteNotifications(e)} name="surgeryNotifications" style={{ color: "black" }} className="dropdown-item" id="surgery">
                                  Surgeries : {surgery_notifications}</Link>
                              }
                            </>
                          </ul>
                        </div>
                        {/* </Link> */}
                      </li>
                      <li>
                        {/* <Link to=""> */}
                        <div>
                          <Link className="btn dropdown-toggle" to="#" role="button" id="butNav" data-bs-toggle="dropdown">
                            Messages
                          </Link>
                          <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink" >
                            {GotAssociated &&
                              <>
                                {Object.keys(withoutDuplicates).map((key) => (
                                  <>
                                    {withoutDuplicates[key] !== loggedUser.username && <>
                                      <Link className="dropdown-item" onClick={(e) => myFunction(e)}
                                        id={withoutDuplicates[key]}>
                                        {withoutDuplicates[key]}</Link>
                                    </>}
                                  </>
                                ))}
                              </>
                            }
                          </ul>
                        </div>
                        {/* </Link> */}
                      </li>
                    </>
                  }
                  <li><Link to={`/logoutVet`}>Logout</Link></li>
                </>
              }
            </>
          }
          {/* END OF NAV , START OF CHAT */}
        </ul>
        {currentPage === "" &&
          <div style={{ zIndex: "3" }}>
            <div className="pad">
              <div className="row d-flex justify-content-center chats">
                <div className="col-md-12">
                  <div className="cards card-bordered" id="card_chat">
                    <div className="card-header">
                      <h4 className="card-title"><strong className="text-white"
                        id="receiver-name"><i class="fa-solid fa-circle" style={{ color: `${isOnlineColor1}` }}></i> {currentVet1}</strong></h4>
                      {userType === "user" ?
                        <Link className="btn btn-xs btn-secondary" to={`SendSurgeryUser/${currentVet1}`} data-abc="true">Request Assessment</Link>
                        :
                        <Link className="btn btn-xs btn-secondary" to="MedicationAdmin2" data-abc="true">Prescribe Medication</Link>
                      }
                      <button type="button" className="btn-close" aria-label="Close" onClick={(e) => closeWindow(e)}>
                      </button>
                    </div>
                    <div className="ps-container ps-theme-default ps-active-y chat-container" id="chat-content">
                      <div className="media media-chat media-chat-reverse ps-0">
                        <div className="media-body" id="MessageDivReverse">
                          {DidGetMessages1 &&
                            messages1.map(message => {
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
                        id="Message" onChange={(e) => changeMessage(e)} value={sentMessage1} onKeyDown={(e) => handleKeyDown(e)} />
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
        }
      </div>


    </div>

  </>
  )
}
export default NavbarComponent