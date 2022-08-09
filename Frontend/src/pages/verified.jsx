import React from 'react'
import axios from 'axios'
import './PagesStatic/MedicationAdmin2.css';
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changeUser, changeVet, changeLogged, changeLoggedType, changeCurrentUser } from '../store/actions/action'
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom";
import {host_var} from "../vars_react"

function Verified() {
    const history2 = useHistory()
    const dispatch = useDispatch()
    const loggedUser = useSelector((state) => state.loggedUser);
    const currentVet = useSelector((state) => state.currentVet);
    const userType = useSelector((state) => state.type);
    const [animals, setAnimals] = useState([])
    const [pastMedications, setPastMedications] = useState([])
    const [userData, setUserData] = useState({
        animalName: "",
        vetName: loggedUser.username,
        medicationName: "",
        dosage: "",
        dosageInterval: "",
        adminstrationRoute: "",
    })
    // GET ANIMALS OF USER
    useEffect(() => {
        setAnimals([])
        axios.get(`${host_var}/api/listAnimals/${currentVet}`)
            .then((res) => {
                setAnimals(res.data)
            }
            )
            .catch((err) => console.log(err))
    }, [])
    // GET PAST MEDS WHEN SELECTING AN ANIMAL
    useEffect(() => {
        axios.get(`${host_var}/api/getMedication/${userData.animalName}/`)
            .then((res) => {
                console.log(res.data)
                setPastMedications(res.data)
            }
            )
            .catch((err) => {
                setPastMedications([])
                console.log(err)
            })
    }, [userData.animalName])
    // OnChange Change State Variables
    function changeData(e) {
        if (e.target.name === "animalName") {
            setUserData({
                ...userData,
                animalName: e.target.value
            })
        }
        else if (e.target.name === "medicationName") {
            setUserData({
                ...userData,
                medicationName: e.target.value
            })
        }
        else if (e.target.name === "dosage") {
            setUserData({
                ...userData,
                dosage: e.target.value
            })
        }
        else if (e.target.name === "dosageInterval") {
            setUserData({
                ...userData,
                dosageInterval: e.target.value
            })
        }
        else {
            setUserData({
                ...userData,
                adminstrationRoute: e.target.value
            })
        }
    }






    const inserMedication = async (e) => {
        let formField = new FormData()
        formField.append('animalName', userData.animalName)
        formField.append('vetName', userData.vetName)
        formField.append('medicationName', userData.medicationName)
        formField.append('dosage', userData.dosage)
        formField.append('dosageInterval', userData.dosageInterval)
        formField.append('adminstrationRoute', userData.adminstrationRoute)
        await axios({
            method: 'post',
            url: `${host_var}/api/addMedication/`,
            data: formField
        }).then((response) => history2.push("/"))
            .catch((err) => console.log(err))
    }
    return (<>

        <div className='MAXcontainerr'>
            <h2 className='main-title'>Verified</h2>
            {/* <div className='medicationPIC'>
                <img src={require(`./myimages/prescription2.webp`)} />
            </div> */}
            <div className='my-3 p-3'>
                <h4 className='text-success'><strong>Your Account Has Been Verified</strong></h4>
            </div>
            <div className='d-flex justify-content-end me-4 my-2 p-2'>
                <Link className='buttoooon' to="/login"><button className='buttoooon'>Login</button></Link>
            </div>
        </div>
    </>
    )
}
export default Verified