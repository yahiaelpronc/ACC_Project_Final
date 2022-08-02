import React from 'react'
import axios from 'axios'
import './PagesStatic/SendSurgeryRequest.css';
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom"



function SendSurgeryUser() {
    const history = useHistory()
    const loggedUser = useSelector((state) => state.loggedUser);
    const currentVet = useParams()

    const [animalname1, setanimalname1] = useState("")
    const [message, setmessage] = useState("")
    const [errdata, seterrdata] = useState({
        messageerr: "",
        selecterr: ""
    })


    const [animals, setanimals] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:8000/api/findAnimals/${loggedUser.username}/`)
            .then((res) => {
                console.log(res.data)
                setanimals(res.data)
            }).catch((err) => console.log(err))

    }, [])


    const insertSurgery = async () => {
        const fielddata = new FormData()
        fielddata.append("animalName", animalname1)
        fielddata.append("vetName", currentVet.vetUsername)
        fielddata.append("message", message)
        fielddata.append("owner", loggedUser.username)

        await axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/api/insertSurgry/',
            data: fielddata
        }).then((res) => {
            sendNotification(currentVet.vetUsername, "surgery")
            history.push("/SurgicalOperationsUser")
            console.log(res.data)

        }


        )
            .catch((err) => console.log(err))
    }
    const sendNotification = async (username, type) => {
        let formField = new FormData()
        formField.append("receiver", username)
        formField.append("type", type)
        await axios({
            method: 'POST',
            url: 'http://localhost:8000/api/insertNotifications/',
            data: formField
        }).then((res) => {
            console.log("Notification Sent")
        })
            .catch((err) => console.log(err))
    }
    const messagereg = /^[a-zA-Z0-9_'-]/
    const changedata = (e) => {
        if (e.target.name === "message") {
            setmessage(e.target.value)
            seterrdata({
                ...errdata,
                messageerr: messagereg.test(e.target.value) ? "" : "message must be btw 1, 300 char"
            })
        } else if (e.target.name === "animalname1") {
            setanimalname1(e.target.value)
            seterrdata({
                ...errdata,
                selecterr: e.target.value === "" ? "choose an option please" : ""
            })
        }
    }

    return (<>

        <div className='MyMaxBox'>
            <div className='Ze2i2le'>
                {/* <i class="ic00n fa-solid  fa-calendar-days"></i> */}
                <h2 className='main-title'>Send Surgery Request</h2>


            </div>

            <div className='chosenAnimal'>
                <h4 className='col-4 text-info'>Your Animals :</h4>
                <div className='col-4 selectMANU'>
                    <select class="form-select" aria-label="Default select example" value={animalname1} onChange={(e) => changedata(e)} name='animalname1'>
                        <option value="" selected>Choose Animal</option>
                        {animals.map(animal => {
                            return (<>
                                <option value={animal.animalName}>{animal.animalName}</option>

                            </>)
                        })}
                    </select>
                    <p className="text-danger p-2 my-2">{errdata.selecterr}</p>

                </div>

            </div>

            <div className='urMessage'>
                <div class="form-floating">
                    <textarea class="form-control" placeholder="Leave a comment here" name='message' onChange={(e) => changedata(e)} value={message} id="floatingTextarea"></textarea>
                    <label for="floatingTextarea">Message</label>
                    <p className="text-danger p-2 my-2">{errdata.messageerr}</p>

                </div>

            </div>

            <div className='d-flex justify-content-end mt-5'>
                <button onClick={(e) => insertSurgery(e)} disabled={errdata.messageerr || errdata.selecterr} className='buttoooon'>Submit</button>
            </div>




        </div>


    </>)
}
export default SendSurgeryUser