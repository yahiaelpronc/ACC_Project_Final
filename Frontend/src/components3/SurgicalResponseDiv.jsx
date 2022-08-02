import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import { useHistory } from "react-router"
import { useSelector, useDispatch } from 'react-redux'



function SurgericalResponseDiv(props) {
    const loggedUser = useSelector((state) => state.loggedUser);

    const history = useHistory()


    const deleteResponse = async (id) => {
        await axios.delete(`http://localhost:8000/api/getSurgicalResponses/${id}/`)
        history.push("/SurgicalOperationsUser")
    }



    // const addnewSurgery = async () => {
    //     const dataField = new FormData()
    //     dataField.append("animalName", props.animalName)
    //     dataField.append("vetName", props.vetName)
    //     dataField.append("operationName", props.operationName)
    //     dataField.append("price", props.price)
    //     dataField.append("date", props.date)
    //     dataField.append("owner", loggedUser.username)
    //     await axios({
    //         method: 'post',
    //         url: 'http://127.0.0.1:8000/api/insertSurgry/',
    //         data: dataField
    //     }).then((res) =>
    //         history.push("/SurgicalOperationsUser")
    //     )
    //         .catch((err) => console.log(err))

    // }

    // onClick={(e)=> addnewSurgery(e)}
    const [showdata, setshowdata] = useState("block")
    const acceptSurgery = async (e) => {
        // let id = e.target.id
        let formdata2 = new FormData()
        formdata2.append("statusUser", "accepted")
        await axios({
            method: 'POST',
            url: `http://localhost:8000/api/updateRequestStatusUser/${props.id}/`,
            data: formdata2
        })
            .then((data) => {
                sendNotification(props.vetName, "surgery")
                history.push("/SurgicalOperationsUser")
                console.log(data.data)
                // setshowdata("none")
                alert("accepted surgery")
            }
            )
            .catch((err) => console.log(err))
    }


    const RefuseSurgery = async (e) => {
        // let id = e.target.id
        let formdata2 = new FormData()
        formdata2.append("statusUser", "declined")
        await axios({
            method: 'POST',
            url: `http://localhost:8000/api/updateRequestStatusUser/${props.id}/`,
            data: formdata2
        })
            .then((data) => {
                sendNotification(props.vetName, "surgery")
                history.push("/SurgicalOperationsUser")
                console.log(data.data)
                // setshowdata("none")
                setshowdata("none")
                alert("declined surgery")
                console.log("done sir")
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
    return (<>
        <div className='p-3 row my-2 border border-dark border-3' style={{ display: showdata }}>





            <div className='col-3'>
                <h3 className='fw-bold my-2'>{props.animalName}</h3>
                <h3 className='fw-bold my-2'>{props.vetName}</h3>


            </div>

            <div className='col-3'>
                <h3 className='fw-bold my-2'>{props.date}</h3>
                <h3 className='fw-bold mt-5'>{props.price}</h3>


            </div>

            <div className=' d-flex align-items-center col-3'>
                <h3 className='fw-bold my-2 text-danger'>{props.operationName} </h3>
                <h3 className='fw-bold mx-3 my-2 text-danger'>{props.statusVet} </h3>



            </div>

            <div className='d-flex my-3 justify-content-end'>

                <button onClick={(e) => acceptSurgery(e)} className='btn btn-danger mx-5'>Accept</button>
                <button className='btn btn-danger' onClick={(e) => RefuseSurgery(e)} >Refuse</button>
            </div>






        </div>
    </>)
}
export default SurgericalResponseDiv