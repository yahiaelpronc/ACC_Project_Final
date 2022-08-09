


import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import './PagesStatic/AddAnimal.css';
import { useSelector, useDispatch } from 'react-redux'

import { useHistory } from "react-router-dom";
import {host_var} from "../vars_react"

function AddAnimal() {
    const history = useHistory()
    const loggedUser = useSelector((state) => state.loggedUser);
    const nameRegex = /^[a-zA-Z ]{3,30}$/
    // const [changedata,set]
    const [animalname, setanimalname] = useState("")
    const [ownerusername, setownerusername] = useState("")
    const [weight, setweight] = useState(null)
    const [b_date, setb_date] = useState(null)
    const [gender, setgender] = useState(null)
    const [species, setspecies] = useState(null)
    const [image, setimage] = useState("")
    const [female_state, setfemalestate] = useState("")
    const [displayFemaleState, setDisplayFemaleState] = useState(false)
    const [submitErr, setsubmitErr] = useState("")
    const [errdata, seterrdata] = useState({
        animalnameerr: "",
        errusername: "",
        errweight: "",
        errb_date: "",
    })
    function isInTheFuture(date) {
        let today = new Date();
        // 👇️ OPTIONAL!
        // This line sets the time of the current date to the
        // last millisecond, so the comparison returns `true` only if
        // date is at least tomorrow
        today.setHours(23, 59, 59, 998);
        console.log(date)
        return date > today;
    }
    const changedata = (e) => {
        if (e.target.name === "animalname") {
            setanimalname(e.target.value)
            seterrdata({
                ...errdata,
                animalnameerr: nameRegex.test(e.target.value) ? "" : "This Field Must Be 3-30 Characters"
            })
        } else if (e.target.name === "ownerusername") {
            setownerusername(e.target.value)
            seterrdata({
                ...errdata,
                errusername: nameRegex.test(e.target.value) ? "" : "This Field Must Be 3-30 Characters"
            })
        } else if (e.target.name === "weight") {
            setweight(e.target.value)
            seterrdata({
                ...errdata,
                errweight: e.target.value > 0 ? "" : "Please Choose A Correct Weight"
            })
        }
        else if (e.target.name === "b_date") {
            console.log(e.target.value)
            if (isInTheFuture(new Date(String(e.target.value)))) {
                seterrdata({
                    ...errdata,
                    errb_date: "Please Choose A Correct Birth Date"
                })
                setb_date(e.target.value)
            } else {
                seterrdata({
                    ...errdata,
                    errb_date: ""
                })
                console.log(e.target.value)
                setb_date(e.target.value)
            }
        }
    }
    const changeGender = (e) => {
        setgender(e.target.value)
        if (e.target.value === "female") {
            setDisplayFemaleState(true)
        } else {
            setDisplayFemaleState(false)
        }
    }


    const RegisterAnimal = async () => {
        let formField = new FormData()
        formField.append("animalName", animalname + "_" + loggedUser.username)
        formField.append("ownerUsername", loggedUser.username)
        formField.append("weight", weight)
        formField.append("b_date", b_date)
        formField.append("picture", image)
        formField.append("gender", gender)
        formField.append("species", species)
        formField.append("female_state", female_state)
        await axios({
            method: 'POST',
            url: `${host_var}/insertAnimal/`,
            data: formField

        }).then((res) => {
            if (res.data === "An Animal Of Yours Already Has That Name") {
                setsubmitErr("An Animal Of Yours Already Has That Name")
            }
            else if (res.data === "Please Choose A Species") {
                setsubmitErr("Please Choose A Species")
            }
            else if (res.data === "Please Choose A Gender") {
                setsubmitErr("Please Choose A Gender")
            }
            else if (res.data === "Please Choose A Female State") {
                setsubmitErr("Please Choose A Female State")
            }
            else {
                console.log(res.data)
                history.push("/")
            }
        }
        )
            .catch((err) => console.log(err))



    }

    return (<>

        <div className='MyAnimal'>
            <div className='Maaain'>

                <img className='animalpiiic' src={require(`./myimages/addanimal1.jpg`)} />
                <div className='my2iii2le'>
                    <h2 className='main-title'>Vet Patient Informations</h2>
                    {/* <span className='subtexxxt' >Add new animal and all details about it</span> */}
                </div>

            </div>



            <div className='daaata'>

                <div class="detaaa">

                    <span className='i2em'>Owner Name</span>
                    <input type="text" className="detaaalz" name='ownerusername' value={loggedUser.username} disabled />
                    <p className='text-danger'>{errdata.errusername}</p>

                </div>


                <div class="detaaa">

                    <span className='i2em'>Animal Name</span>
                    <input type="text" className="detaaalz" onChange={(e) => changedata(e)} name="animalname" value={animalname} required aria-describedby="emailHelp" placeholder="Enter Animal Name" />
                    <p className='text-danger'>{errdata.animalnameerr}</p>

                </div>


            </div>



            <div className='daaata'>

                <div class="detaaa">

                    <span className='i2em'>Animal Weight</span>
                    <input type="number" class="detaaalz" onChange={(e) => changedata(e)} name="weight" value={weight} required aria-describedby="emailHelp" placeholder="Enter Animal weight" />
                    <p className='text-danger'>{errdata.errweight}</p>

                </div>
                <div class="detaaa">

                    <span className='i2em'>Animal Birth Date</span>
                    <input type="date" class="detaaalz" onChange={(e) => changedata(e)} name="b_date" value={b_date} placeholder="Enter Animal birth date" />
                    <p className='text-danger'>{errdata.errb_date}</p>
                </div>


            </div>


            <div className='daaata'>

                <div className="detaaa">

                    <span className='i2em'>Animal Gender</span>
                    <select required value={gender} name="gender" className='detaaalz' onChange={(e) => changeGender(e)} class="form-select" aria-label="Default select example">
                        <option selected value="">Choose Animal Gender</option>
                        <option value="male">MALE</option>
                        <option value="female">Female</option>

                    </select>

                </div>
                <div class="detaaa">
                    <span className='i2em'>Animal Species</span>
                    <select required value={species} name="species" className='detaaalz' onChange={(e) => setspecies(e.target.value)} class="form-select" aria-label="Default select example">
                        <option selected value="">Choose Animal species</option>
                        <option value="cat">Cat</option>
                        <option value="dog">Dog</option>
                    </select>


                </div>





            </div>
            <div class="detaaa">
                <span className="detaillls" style={{ display: displayFemaleState ? "block" : "none" }}>Female Status</span>
                <select required value={female_state} className='detaaalz' style={{ display: displayFemaleState ? "block" : "none" }} name="female_state" onChange={(e) => setfemalestate(e.target.value)} class="form-select" aria-label="Default select example">
                    <option selected value="">Choose  female_state</option>
                    <option value="immature">immature</option>
                    <option value="mature&married">mature & married</option>
                    <option value="pregnant">pregnant</option>
                    <option value="lactating">lactating</option>
                </select>
            </div>

            <p style={{ fontSize: "20px" }}>* Optional :</p>
            <div className='daaata'>
                <div className="picturr"  >
                    <span className="detailsss">upload a profile pic.</span>
                    <input type="file" placeholder="upload" required id="file" name="profile_pic" onChange={(e) => setimage(e.target.files[0])} />
                    <p id="fileerr"></p>
                </div>
            </div>
            <p className='text-danger'>{submitErr}</p>
            <button onClick={RegisterAnimal} type="submit" className="buttoooon" disabled={errdata.animalnameerr || errdata.errusername || errdata.errweight || errdata.errb_date}>Submit</button>




        </div>
    </>)

}
export default AddAnimal