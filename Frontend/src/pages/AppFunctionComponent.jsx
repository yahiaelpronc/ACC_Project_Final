import '../App.css';
import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import UserData from './UserData'
import ChangeLang from '../Components/ChangeLang'
function AppFunctionComponent(props) {
    console.log(props)
    console.log("Params :", props.match.params)
    const params = useParams()
    console.log("useParams :", params)
    // State Variables Declarations
    const [email, setEmail] = useState("test@gmail.com")
    const [username, setUsername] = useState("ali")
    const [age, setAge] = useState(100)
    const [userData, setUserData] = useState({
        name: "ahmed",
        position: "Developer",
        iaAdmin: false
    }
    )

    // onClick Function To Change Variables
    const changeData = (myData) => {
        setUserData({
            ...userData,
            name: myData,
            isAdmin: true
        })
        console.log(userData)
    }
    const changeEmail = (newEmail) => {
        setEmail(newEmail)
        console.log(email)
    }

    // Did Mount -> []
    useEffect(() => {
        console.log("Hello Use Effect did mount")
    }, [])

    // Did Update [email]
    useEffect(() => {
        console.log("Email Changed")
    }, [email])

    // Did Update [email,userData]
    useEffect(() => {
        console.log("Email or UserData Changed")
    }, [email, userData])

    // Will Unmount
    useEffect(() => {
        return () => {
            console.log("Will Unmount")
        }
    }, [])




    return (<>
        <h1>Hello From Function Component</h1>
        <ChangeLang />
        {/* Show Data */}
        <h1>{username}</h1>
        <h1>{age}</h1>
        <h1>{userData.name}</h1>
        <h1>{userData.position}</h1>
        <h1>{email}</h1>

        {/* Using Components And Sending Data To It */}
        <UserData testname={userData.name} testage={age} />

        {/* Button To Change My Data */}
        <button className="btn btn-danger"
            onClick={() => changeData("Data Passed From Button")}>Change Data Function</button>

        {/* Conditional Rendering Method 1 */}
        {/* {userData.isAdmin ?
            // If
            (
                <button className="btn btn-warning mx-3"
                    onClick={() => changeEmail("yahiaabdo36@gmail.com")}>Change Email Function</button>
            ) :
            // Else
            <h1 className="text-danger">Permission Denied</h1>
        } */}

        {/* Conditional Rendering Method 2 */}
        {userData.isAdmin &&
            // If True Only
            (
                <button className="btn btn-warning mx-3"
                    onClick={() => changeEmail("yahiaabdo36@gmail.com")}>Change Email Function</button>
            )
        }
    </>)
}

export default AppFunctionComponent;
