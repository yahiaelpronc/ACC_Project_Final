import './PagesStatic/Operations.css';
import React, { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Table from '../Components/ClassTable';
import Button from '../Components/ClassButton';
import { useParams } from "react-router-dom"
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";


import { useState } from 'react'
import {host_var} from "../vars_react"



function RequestSur() {
    const history = useHistory()



    const myid = useParams().id
    const [Request, setRequest] = useState({})
    const [MyAnimal, setMyAnimal] = useState({})
    const [dataCame, setDataCame] = useState(false)
    const [price, setPrice] = useState()
    const [date, setDate] = useState()
    const [Surgery_Operation, setSurgery_Operation] = useState()

    useEffect(() => {
        axios.get(`${host_var}/findRequest/${myid}/`)
            .then((res) => {
                setRequest(res.data)
                setDataCame(true)
                console.log(dataCame)
                console.log(Request.user)
                console.log(Request.animalName)
            }

            )
            .catch((err) => console.log(err))
    }, [])



    useEffect(() => {
        axios.get(`${host_var}/findSpecificAnimal/${Request.user}/${Request.animalName}/`)
            .then((res) => {
                setMyAnimal(res.data)
                getAge()
            })
            .catch((err) => console.log(err))
    }, [dataCame])

    const [agedata, setagedata] = useState("")

    const getAge = () => {
        const mydate = new Date()
        const myYear = mydate.getFullYear()

        const animalB_Date = MyAnimal.b_date
        const myarr = animalB_Date.split("-")
        console.log("my arr", myarr)


        const AnimalAgeY = myYear - (myarr[0])
        const AnimalAgeM = mydate.getMonth() - (myarr[1])
        const AnimalAgeD = mydate.getDay() - (myarr[2])
        console.log(myarr)
        console.log(myYear)
        console.log("birth date", animalB_Date)
        setagedata(AnimalAgeY + " years " + AnimalAgeM + "months " + AnimalAgeD + " days ")

    }

    const CurrentVet = useSelector((state) => state.loggedUser);
    const [medication, setMedication] = useState([])


    useEffect(() => {
        axios.get(`${host_var}/getMedication/${Request.animalName}/`)
            .then((res) => setMedication(res.data))
            .catch((err) => console.log(err))
    }, [dataCame])





    const addnewSurgery = async (e) => {
        e.preventDefault()
        const dataField = new FormData()
        dataField.append("animalName", MyAnimal.animalName)
        dataField.append("vetName", CurrentVet.username)
        dataField.append("operationName", Surgery_Operation)
        dataField.append("price", price)
        dataField.append("date", date)
        dataField.append("owner", Request.user)
        await axios({
            method: 'post',
            url: `${host_var}/insertSurgry/`,
            data: dataField
        }).then((res) =>
            history.push("/")
        )
            .catch((err) => console.log(err))



        updatestaus(e)

    }

    const updatestaus = async (e) => {
        e.preventDefault()
        let formdata1 = new FormData()
        formdata1.append("statusVet", "accepted")
        await axios({
            method: 'POST',
            url: `${host_var}/updateRequestStatusVet/${myid}/`,
            data: formdata1
        })
            .then((data) =>
                console.log(data.data)
            )
            .catch((err) => console.log(err))
    }


    const VetCancelRequest = async (e) => {
        e.preventDefault()
        let formdata2 = new FormData()
        formdata2.append("statusVet", "declined")
        await axios({
            method: 'POST',
            url: `${host_var}/updateRequestStatusVet/${myid}/`,
            data: formdata2
        })
            .then((data) => {
                // history.push("/")
                console.log(data.data)
                console.log("done sir")
            }

            )
            .catch((err) => console.log(err))
    }








    return (
        <>
            <h2 className="main-title">Scheduled Operations</h2>
            <div className=" mainDiv container">
                <div className='container-fluid row'>
                    <div className='col-4'>
                        <form action="">
                            <label htmlFor="">{Request.animalName}</label><br />
                            <label htmlFor="">{MyAnimal.species}</label><br />
                            <label htmlFor="">{Request.user}</label><br />
                            <label htmlFor="">Age: {agedata}</label><br />
                            <label htmlFor="">{MyAnimal.weight}</label><br />
                            <label htmlFor="">{MyAnimal.gender}</label>
                            <div className='special'>
                                <i className="fa-solid fa-calendar-check" style={{ color: '#1787e0' }}></i>
                                <input type="text" class="form-control" onChange={(e) => setDate(e.target.value)} name='date' value={date} required aria-describedby="emailHelp" placeholder="Enter Available Date" />

                            </div>
                            <div className='special'>
                                <i className="fa-solid fa-money-bill" style={{ color: '#1787e0' }}></i>
                                <input type="number" class="form-control" onChange={(e) => setPrice(e.target.value)} name='price' value={price} required aria-describedby="emailHelp" placeholder="Enter price" />

                            </div>
                            <div className='special'>
                                <i className="fa-solid fa-angles-right" style={{ color: '#1787e0' }}></i>
                                <input type="text" class="form-control" onChange={(e) => setSurgery_Operation(e.target.value)} name='Surgery_Operation' value={Surgery_Operation} required aria-describedby="emailHelp" placeholder="Enter Surgery Operation" />

                            </div>
                            {/* <Button onClick={addnewSurgery} btnTitle="Schedule Surgery"/> */}
                            <button onClick={(e) => addnewSurgery(e)} className='btn btn-danger'>Schedule Surgery</button>
                        </form>
                    </div>
                    <div className='col-8'>
                        <div className='message'>
                            <h3>{Request.message}</h3>
                        </div>
                        <img src={require(`./images/dental.jpg`)} alt="" id='dent1' />
                    </div>
                </div>

                {/* <div className=' left col-4'>
                    <p className='ll'>Animal Name</p>
                    <p className='ll'>UserName</p>
                    <p className='ll'>Age</p>
                    <button className='btn  my-5' id='btn11'> Accept Surgery</button>
                    
                </div> */}
                {/* <div className=' right col-4'>
                    <p className=' rr text-danger'>Date</p>
                    <p className=' rr text-danger'>Price</p>
                    <p className='rr text-danger'>Operation</p>
                    <button className='btn my-5' id='btn2'> Deny Surgery</button>
                </div> */}



            </div>
            <div className=' div2 container'>
                {/* <Table Med1="Med x"  Dos1="200m" interval1="20th June"/> */}
                <div className='my-3 p-3'>
                    <table class="table table-success table-striped table-hover ">
                        <thead>
                            <tr>
                                <th scope="col">Animal Name</th>
                                <th scope="col">Vet Name</th>
                                <th scope="col">Medication Name</th>
                                <th scope="col">Date</th>
                                <th scope="col">Dosage</th>
                                <th scope="col">Dosage Interval </th>
                                <th scope="col">Adminstration Route</th>
                            </tr>
                        </thead>
                        <tbody>
                            {medication.map(med => {
                                return (<>
                                    <tr>

                                        <td>{med.animalName}</td>
                                        <td>{med.vetName}</td>
                                        <td>{med.medicationName}</td>
                                        <td>{med.date}</td>
                                        <td>{med.dosage}</td>
                                        <td>{med.dosageInterval}</td>
                                        <td>{med.adminstrationRoute}</td>


                                    </tr>

                                </>)
                            })}


                        </tbody>
                    </table>

                </div>
                <button onClick={(e) => VetCancelRequest(e)} className="btn btn-info mx-3 my-3"> Deny Surgery Request</button>
            </div>

        </>
    )
}
export default RequestSur;