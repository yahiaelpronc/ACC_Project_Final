


import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import ServicesRequestsDiv from '../components3/ServicesRequestsDiv'

function ServicesRequest(){
    const loggedUser = useSelector((state) => state.loggedUser);
    const [Requests,setRequests]=useState([])


    useEffect(()=>{
        axios.get(`http://localhost:8000/api/getServicesRequests/${loggedUser.username}/`)
        .then((res)=> setRequests(res.data))
        .catch((Err)=> console.log(Err))

    },[])


    



    return(<>

            <div className='bg-light p-3'>
                <div className='row p-2'>
                    
                    <img className='col-3 h-25 w-25 rounded' src={require(`./myimages/animalsurgery1.jpg`)}/>
                    <div className='col-6 '>
                       <center> <h2 className=' text-danger my-4 '>Services Requests </h2></center>
                      
                        <h4 className='  my-5 '>See Your Latest schedule For Services Requests</h4>

                    </div>

                </div>

                {Requests.map(req=>{
                    return(<>
                                 <ServicesRequestsDiv reasonVet={req.reasonVet} reasonUser={req.reasonUser} AnimalType={req.AnimalType} animalOwner={req.animalOwner} serviceName={req.serviceName} price={req.price}
                                    date={req.date} time={req.time} statusOwner={req.statusOwner} statusUser={req.statusUser} timePeriod={req.timePeriod} id={req.id} />

                            </>)
                })}
                
            








            </div>
        </>)

}
export default ServicesRequest