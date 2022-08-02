import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'



function RequestDiv(props) {

    return (<>
        <div className='p-3 row my-2 border border-dark border-3'>
            <div className='col-4 '>
                <div className='my-3'>
                    <h3 className='d-flex justify-content-start'>Animal Name    :<p className='ms-2 text-danger fw-bold'>{props.AnimalName}</p></h3>

                </div>
                <div className='my-3'>
                    <h3 className='d-flex justify-content-start'>UserName  :<p className='ms-2 text-danger fw-bold'>{props.OwnerName}</p></h3>
                    <h3 className='d-flex justify-content-start'>statusUser  :<p className='ms-2 text-danger fw-bold'>{props.statusUser}</p></h3>
                    <h3 className='d-flex justify-content-start'>statusVet  :<p className='ms-2 text-danger fw-bold'>{props.statusVet}</p></h3>

                </div>


            </div>
            <div className='col-8'>

                <div className='p-3 my-3 border border-danger'>
                    <p className='fw-bold'>{props.message}  </p>

                </div>

                <div className='d-flex  my-2'>

                    <Link to={props.details}><button className='btn btn-danger mx-5'>Details</button></Link>
                    {/* <button className='btn btn-danger'>Cancel</button> */}
                </div>



            </div>


        </div>
    </>)
}
export default RequestDiv