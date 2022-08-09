import React from 'react'
import axios from 'axios'
import './PagesStatic/MedicationAdmin2.css';
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changeUser, changeVet, changeLogged, changeLoggedType, changeCurrentUser } from '../store/actions/action'
import { useHistory } from "react-router-dom"
import {host_var} from "../vars_react"

function MedicationUser() {
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
        axios.get(`${host_var}/listAnimals/${loggedUser.username}`)
            .then((res) => {
                setAnimals(res.data)
            }
            )
            .catch((err) => console.log(err))
    }, [])
    // GET PAST MEDS WHEN SELECTING AN ANIMAL
    useEffect(() => {
        axios.get(`${host_var}/getMedication/${userData.animalName}/`)
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
            url: `${host_var}/addMedication/`,
            data: formField
        }).then((response) => history2.push("/"))
            .catch((err) => console.log(err))
    }
    return (<>
        <div className='MAXcontainerr'>
            <h2 className='main-title'>Animals' Medication History</h2>
            {/* <div className='medicationPIC'>
                <img src={require(`./myimages/prescription2.webp`)} />
            </div> */}
            <div className='col-4 animalNAME'>
                <select class="form-select" aria-label="Default select example"
                    value={userData.animalName} name="animalName" onChange={(e) => changeData(e)}>
                    <option selected="" required>Choose Animal</option>
                    {animals.map(animal => {
                        return (<>
                            <option value={animal.animalName}>{animal.animalName}</option>
                        </>)
                    }
                    )}
                </select>
            </div>
            <div className='my-3 p-3'>
                <h4 className='TEXT'><strong>Medication History</strong></h4>
                <table class="table table-striped table-hover ">
                    <thead>
                        <tr>
                            <th scope="col">Animal Name</th>
                            <th scope="col">Vet Name</th>
                            <th scope="col">Medication Name</th>
                            <th scope="col" className='mb-2'>Dosage</th>
                            <th scope="col">Dosage Interval </th>
                            <th scope="col">Adminstration Route</th>
                            <th scope="col">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pastMedications.length > 0 ?
                            pastMedications.map(pastMedication => {
                                return (<>
                                    <tr>
                                        <td>{pastMedication.animalName}</td>
                                        <td>{pastMedication.vetName}</td>
                                        <td>{pastMedication.medicationName}</td>
                                        <td>{pastMedication.dosage} Millimeter</td>
                                        <td>Every {pastMedication.dosageInterval} Minutes</td>
                                        <td>{pastMedication.adminstrationRoute}</td>
                                        <td>{pastMedication.date}</td>
                                    </tr>
                                </>)
                            }) :
                            null
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </>
    )
}
export default MedicationUser