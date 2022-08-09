


import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import RequestDiv from '../components3/RequestDiv'
import { useSelector, useDispatch } from 'react-redux'
import {host_var} from "../vars_react"



function SurgeryRequest() {
    const loggedUser = useSelector((state) => state.loggedUser);
    const [Requests, setRequests] = useState([])
    console.log(loggedUser)


    useEffect(() => {
        axios.get(`${host_var}/api/getRequests/${loggedUser.username}/`)
            .then((res) => setRequests(res.data))
            .catch((err) => console.log(err))

    }, [])


    return (<>

        <div className='bg-light p-3'>
            <div className='row p-2'>
                <img className='col-3 h-25 w-25 rounded' src={require(`./myimages/schedule1.png`)} />
                <div className='col-6 '>
                <h2 className="main-title">Request Surgery</h2>
                    <h4 className='  my-5 '>See Your Latest schedule For Surgeries</h4>
                </div>
            </div>
            {Requests.map(req => {
                return (<>
                    {req.statusVet !== "declined" && (
                        <RequestDiv details={`NewSc/${req.id}`} statusVet={req.statusVet} statusUser={req.statusUser} message={req.message} OwnerName={req.user} AnimalName={req.animalName} />
                    )}
                </>)
            })}









        </div>
    </>)

}
export default SurgeryRequest