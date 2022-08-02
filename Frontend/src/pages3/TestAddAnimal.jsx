import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import avatar from './media/profileImages/1_bwjRF9H.jpg';
function TestAddAnimal() {
    const [userData, setUserData] = useState({
        animalName: "",
        weight: 0,
        b_date: "",
        gender: "",
        species: "",
        female_state: "",
        picture: "",
    })
    const [users, setUsers] = useState([])
    const [userFetched, setuserFetched] = useState(false)
    const [picName, setPicName] = useState("")
    const [genderIsFemale, setgenderIsFemale] = useState(false)
    const changeData = (e) => {
        if (e.target.name === "animalName") {
            setUserData({
                ...userData,
                animalName: e.target.value,
            })
        }
        else if (e.target.name === "weight") {
            setUserData({
                ...userData,
                weight: e.target.value,
            })
        }
        else if (e.target.name === "b_date") {
            setUserData({
                ...userData,
                b_date: e.target.value,
            })
        }
        else if (e.target.name === "species") {
            setUserData({
                ...userData,
                species: e.target.value,
            })
        }
        else if (e.target.name === "gender") {
            setUserData({
                ...userData,
                gender: e.target.value,
            })
            if (e.target.value === "f") {
                setgenderIsFemale(true)
            }
            else {
                setgenderIsFemale(false)
                setUserData({
                    ...userData,
                    female_state: "",
                })
            }
        }
        else if (e.target.name === "picture") {
            setUserData({
                ...userData,
                picture: e.target.value,
            })
            let pic_name = e.target.value.split("\\")[2]
            setPicName({
                picName: pic_name
            })
        }
        else {
            setUserData({
                ...userData,
                female_state: e.target.value,
            })
        }
    }
    // GET USER TEST AXIOS
    const submitData = (e) => {
        e.preventDefault()
        axios.get("http://localhost:8000/api/finduser/zoldeek")
            .then((res) => {
                setUsers(res.data)
                setuserFetched(true)
            }
            )
            .catch((err) => console.log(err))
    }
    console.log("Response : ", users)
    console.log(userData)
    return (
        <>
            <input className="form-control" type="text" name="animalName" onChange={(e) => changeData(e)} placeholder="animalName" value={userData.animalName} />
            <input className="form-control" type="number" name="weight" onChange={(e) => changeData(e)} placeholder="weight" value={userData.weight} />
            <input className="form-control" type="date" name="b_date" onChange={(e) => changeData(e)} placeholder="b_date" value={userData.b_date} />
            <input className="form-control" type="file" name="picture" onChange={(e) => changeData(e)} placeholder="picture" value={userData.picture} />
            <select className="form-select my-4 p-2" aria-label="Default select example" name="gender" onChange={(e) => changeData(e)} value={userData.gender}>
                <option value="">Gender</option>
                <option value="m">M</option>
                <option value="f">F</option>
            </select>
            <select className="form-select my-4 p-2" aria-label="Default select example" name="species" onChange={(e) => changeData(e)} value={userData.species}>
                <option value="">Species</option>
                <option value="cat">Cat</option>
                <option value="dog">Dog</option>
                <option value="cow">Cow</option>
            </select>
            {genderIsFemale &&
                <select className="form-select my-4 p-2" aria-label="Default select example" name="female_state" onChange={(e) => changeData(e)} value={userData.female_state}>
                    <option value="">Female State</option>
                    <option value="immature">immature</option>
                    <option value="mature&married">Mature & Married</option>
                    <option value="pregnant">pregnant</option>
                    <option value="lactating">lactating</option>
                </select>
            }
            <button className="btn btn-primary" onClick={(e) => submitData(e)}>Submit</button>
            {userFetched &&
                <img src={require(`./media/profileImages${users.profile_pic}`)} alt="React Logo" height={150} width={150} />
            }
        </>
    )
}

export default TestAddAnimal