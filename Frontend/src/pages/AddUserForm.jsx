import '../App.css';
import React from 'react'
import { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
function AddUserForm(props) {
    console.log("Add User Props", props)
    // History,Location Hooks To Navigate Through The Pages , look onSubmit() Function
    // Similar To Just Using props
    const history = useHistory()
    console.log("History Hooks :", props)
    const location = useLocation()
    console.log("Location Hooks :", props)
    // State Variable Declarations
    const [userData, setUserData] = useState({
        name: "",
        position: "",
    })
    const [errors, setErrors] = useState({
        nameErr: "",
        positionErr: "",
    })

    // Function To Change Variables Based On Form
    const changeData = (e) => {
        if (e.target.name === "name") {
            setUserData({
                ...userData,
                name: e.target.value
            })
            setErrors({
                ...errors,
                nameErr: e.target.value.length === 0 ? "Name Field Is Required"
                    : e.target.value.length < 3 ? "Name Field Min 3 Chars"
                        : null
            })
        } else {
            setUserData({
                ...userData,
                position: e.target.value
            })
            setErrors({
                ...errors,
                positionErr: e.target.value.length === 0 ? "Position Field Is Required"
                    : e.target.value.length < 3 ? "Position Field Min 3 Chars"
                        : null
            })
        }
    }
    // Function To Prevent Refreshing On Submit
    const submitData = (e) => {
        e.preventDefault()
        // switches pages
        history.push("/class")
    }
    return (<>
        <h1>Add User Form</h1>
        {/* Make Sure To Change class->className , for->htmlFor , self closing input tags */}
        <form onSubmit={(e) => submitData(e)}>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Name</label>
                {/* Value and OnChange on Each Input Field */}
                <input type="text"
                    className={`form-control ${errors.nameErr ? "border-danger" : ""}`}
                    name="name" aria-describedby="emailHelp"
                    value={userData.name} onChange={(e) => changeData(e)}
                />
                <p className="text-danger">{errors.nameErr}</p>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Position</label>
                {/* Value and OnChange on Each Input Field */}
                <input type="text"
                    className={`form-control ${errors.positionErr ? "border-danger" : ""}`}
                    name="position"
                    value={userData.position} onChange={(e) => changeData(e)} />
                <p className="text-danger">{errors.positionErr}</p>
            </div>
            <button
                disabled={errors.positionErr || errors.nameErr}
                type="submit" className="btn btn-primary">Submit</button>
        </form>
        <i className="fa-solid fa-envelope"></i>
    </>)
}
export default AddUserForm