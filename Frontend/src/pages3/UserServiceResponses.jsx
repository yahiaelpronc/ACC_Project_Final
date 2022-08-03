


import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import ServicesResponsesDiv from '../components3/ServicesResponsesDiv'

function UserServiceResponses(){
    const loggedUser = useSelector((state) => state.loggedUser);
    const [Requests,setRequests]=useState([])


    useEffect(()=>{
        axios.get(`http://localhost:8000/api/getServicesResponses/${loggedUser.username}/`)
        .then((res)=> setRequests(res.data))
        .catch((Err)=> console.log(Err))

    },[])



    return(<>

            <div className='bg-light p-3'>
                <div className='row p-2'>
                    
                    <img className='col-3 h-25 w-25 rounded' src={require(`./myimages/animalsurgery1.jpg`)}/>
                    <div className='col-6 '>
                       <center> <h2 className=' text-danger my-4 '>Services Responses </h2></center>
                      
                        <h4 className='  my-5 '>See Your Latest schedule For Services Responses</h4>

                    </div>

                </div>

                {Requests.map(req=>{
                    return(<>
                    
                                                         <ServicesResponsesDiv reasonUser={req.reasonUser} reasonVet={req.reasonVet} AnimalType={req.AnimalType} locationName={req.locationName} animalOwner={req.animalOwner} serviceName={req.serviceName} price={req.price}
                                                         id={req.id} date={req.date} time={req.time} timePeriod={req.timePeriod} statusUser={req.statusUser} locationOwner={req.locationOwner} statusOwner={req.statusOwner} />
                  


                            </>)
                })}
                
            








            </div>
        </>)

}
export default UserServiceResponses