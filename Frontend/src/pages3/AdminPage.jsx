import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useHistory } from "react-router-dom";
import './page3Static/Admin.css';
import {host_var} from "../vars_react"

function AdminPage2() {

    const history = useHistory()

    const emailRegex = /\S+@\S+\.\S+/;
    const phonereg = /^(010|011|012|015)\d{8}$/
    const [governorates, setGovernorates] = useState(
        ["Alexandria", "Aswan", "Asyut", "Beheira", "Beni Suef", "Cairo", "Dakahlia", "Damietta", "Faiyum",
            "Gharbia", "Giza", "Ismailia", "Kafr El Sheikh", "Luxor", "Matruh", "Minya", "Monufia", "New Valley",
            "North Sinai", "Port Said", "Qalyubia", "Qena", "Red Sea", "Sharqia", "Sohag", "South Sinai", "Suez"]
    )
    const [owner, setowner] = useState("")
    const [ownerType, setownerType] = useState("default")

    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [address, setaddress] = useState(null)
    const [governorate, setgovernorate] = useState(null)
    const [mobile, setmobile] = useState(null)
    const [website_link, setwebsite_link] = useState(null)
    const [image, setimage] = useState("")
    const [description, setdescription] = useState("")
    const [service, setservice] = useState("")
    const [price, setprice] = useState("")
    const [work_hours_start, setwork_hours_start] = useState("")
    const [work_hours_end, setwork_hours_end] = useState("")
    const [work_hours_start_period, setwork_hours_start_period] = useState("")
    const [work_hours_end_period, setwork_hours_end_period] = useState("")
    const [submitErr, setSubmitErr] = useState("")

    const [errdata, seterrdata] = useState({
        nameerr: "",
        emailerr: "",
        addresserr: "",
        mobileerr: "",
        work_hours_starterr: "",
        work_hours_enderr: "",
        ownererr: "",
        ownerTypeerr: "",
    })

    const changedata = (e) => {
        if (e.target.name === "name") {
            setname(e.target.value)
            seterrdata({
                ...errdata,
                nameerr: (e.target.value.length < 3 || e.target.value.length > 30) ? "This Field Has To Be 3 to 30 Characters Long" : ""
            })
        }
        else if (e.target.name === "email") {
            setemail(e.target.value)
            seterrdata({
                ...errdata,
                emailerr: emailRegex.test(e.target.value) ? "" : "Please Write A Correct Email"
            })
        }
        else if (e.target.name === "mobile") {
            setmobile(e.target.value)
            seterrdata({
                ...errdata,
                mobileerr: phonereg.test(e.target.value) ? "" : "Phone should start with 01 and be 11 digits long"
            })
        } else if (e.target.name === "address") {
            setaddress(e.target.value)
            seterrdata({
                ...errdata,
                addresserr: (e.target.value.length > 3 && e.target.value.length < 30) ? "" : "This Field Has To Be 3 to 30 Characters Long"
            })
        }
        else if (e.target.name === "price") {
            setprice(e.target.value)
            seterrdata({
                priceerr: e.target.value < 1 ? "Price Must Be More Than 0$" : ""
            })
        }
        else if (e.target.name === "work_hours_start") {
            setwork_hours_start(e.target.value)
            seterrdata({
                work_hours_starterr: e.target.value > 12 ? "Hours Must Be Less Than 12" : ""
            })
        } else if (e.target.name === "work_hours_end") {
            setwork_hours_end(e.target.value)
            seterrdata({
                work_hours_enderr: e.target.value > 12 ? "Hours Must Be Less Than 12" : ""
            })
        }
        else if (e.target.name === "owner") {
            setowner(e.target.value)
            seterrdata({
                ...errdata,
                ownererr: (e.target.value.length < 3 || e.target.value.length > 30) ? "This Field Has To Be 3 to 30 Characters Long" : ""
            })
        }
        else if (e.target.name === "ownerType") {
            setownerType(e.target.value)
        }
    }

    const Registerlocation = async () => {
        const fielddata = new FormData()
        fielddata.append("name", name)
        fielddata.append("email", email)
        fielddata.append("mobile", mobile)
        fielddata.append("address", address)
        fielddata.append("picture", image)
        fielddata.append("governorate", governorate)
        fielddata.append("website_link", website_link)
        fielddata.append("work_hours_end", work_hours_end)
        fielddata.append("work_hours_start", work_hours_start)
        fielddata.append("work_hours_end_period", work_hours_end_period)
        fielddata.append("work_hours_start_period", work_hours_start_period)
        fielddata.append("service", service)
        fielddata.append("owner", owner)
        fielddata.append("price", price)
        await axios({
            method: 'POST',
            url: `${host_var}/api/insertLocation/${ownerType}/`,
            data: fielddata
        }).then((res) => {
            if (res.data === "A Location With This Name Already Exists") {
                seterrdata({
                    ...errdata,
                    nameErr: res.data
                })
                setSubmitErr(res.data)
            }
            else if (res.data === "Email Already Exists") {
                seterrdata({
                    ...errdata,
                    emailErr: res.data
                })
                setSubmitErr(res.data)
            }
            else if (res.data === "Please Choose A Governorate") {
                setSubmitErr(res.data)
            }
            else if (res.data === "Please Choose Work Hours") {
                setSubmitErr(res.data)
            }
            else if (res.data === "Please Choose A Service") {
                setSubmitErr(res.data)
            }
            else if (res.data === "Please Choose An Owner Type") {
                setSubmitErr(res.data)
            }
            else {
                console.log(res.data)
                history.push("/login")
            }
        })
            .catch((err) => console.log(err))
    }



    return (<>


        <h2 className="main-title my-5">Welcome Admin</h2>




        <div className=" p-5 bg-light my-3">

            <div className="row p-3 d-flex justify-content-between">

                <div className="col-2">
                    <i style={{ fontSize: "4rem" }} className="fa-solid fa-lock" id='dd1'></i>

                </div>

                <div className="col-2">
                    <i style={{ fontSize: "4rem" }} className="fa-solid fa-screwdriver-wrench " id='dd'></i>

                </div>

            </div>

        </div>

        {/* <div className='page33'>
            <ul className="nav nav-tabs p-3 my-3">
                <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#" id='add'>Add Location</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="">Add 5 Projcts</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="">Comments Reports</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="" >Projcts Reports</a>
                </li>
            </ul>
        </div> */}

        <div className='MAXbooox'>
            <div className='headerrr row p-2 my-2'>

                <img className='pageIMG col-5' src={require(`./myimages/adminlocation2.jpg`)} />
                <div className='col-7 d-flex align-items-center justify-content-center '>
                    <h2 className="main-title exxxtra">Add New Animal Care Location</h2>



                </div>

            </div>
            <div className='MINIcontainerr'>
                <div className='daaata row'>

                    <div class="detaaa col-5">

                        <input type="text" className="detaaalzzz" onChange={(e) => changedata(e)} name="name" value={name} required aria-describedby="emailHelp" placeholder="Enter location Name" />
                        <p className='text-danger'>{errdata.nameerr}</p>

                    </div>

                    <div class="detaaa col-5">

                        <input type="email" className="detaaalzzz" onChange={(e) => changedata(e)} name='email' value={email} required aria-describedby="emailHelp" placeholder="Enter location email" />
                        <p className='text-danger'>{errdata.emailerr}</p>

                    </div>


                </div>

                <div className='daaata row'>


                    <div class="detaaa col-5">

                        <input type="text" class="detaaalzzz" onChange={(e) => changedata(e)} name="owner" value={owner} required aria-describedby="emailHelp" placeholder="Enter Owner's Username" />
                        <p className='text-danger'>{errdata.ownererr}</p>

                    </div>
                    <div class="detaaa col-5">

                        <select required value={ownerType} class="detaaalzzz" onChange={(e) => changedata(e)} name="ownerType" aria-label="Default select example">
                            <option selected value="default">Owner Type</option>
                            <option value="user">User</option>
                            <option value="vet">Vet</option>

                        </select>


                    </div>
                    <div class="detaaa col-5">

                        <input type="text" className="detaaalzzz" onChange={(e) => changedata(e)} name="address" value={address} required aria-describedby="emailHelp" placeholder="Enter location address" />
                        <p className='text-danger'>{errdata.addresserr}</p>

                    </div>

                </div>

                <div className='daaata row '>

                    <div class="detaaa col-5">

                        <input type="text" className="detaaalzzz" onChange={(e) => changedata(e)} name="mobile" value={mobile} required aria-describedby="emailHelp" placeholder="Enter location mobile" />
                        <p className='text-danger'>{errdata.mobileerr}</p>

                    </div>
                    <div class="detaaa col-5">

                        <input type="text" className="detaaalzzz" onChange={(e) => setwebsite_link(e.target.value)} name='website_link' value={website_link} required aria-describedby="emailHelp" placeholder="Enter location website_link" />


                    </div>


                </div>
                <div className='daaata row '>

                    <div class="detaaa col-5">

                        <input type="number" class="detaaalzzz" onChange={(e) => changedata(e)} name="work_hours_start" value={work_hours_start} required aria-describedby="emailHelp" placeholder="Enter location work_hours_start" />
                        <p className='text-danger'>{errdata.work_hours_starterr}</p>

                    </div>
                    <div class="detaaa col-5">

                        <select required value={work_hours_start_period} class="detaaalzzz" onChange={(e) => setwork_hours_start_period(e.target.value)} name="work_hours_start_period" aria-label="Default select example">
                            <option selected value="">Choose Period</option>
                            <option value="am">AM</option>
                            <option value="pm">PM</option>

                        </select>


                    </div>



                </div>
                <div className='daaata row '>

                    <div class="detaaa col-5">

                        <input type="number" class="detaaalzzz" onChange={(e) => changedata(e)} name="work_hours_end" value={work_hours_end} required aria-describedby="emailHelp" placeholder="Enter location work_hours_start" />
                        <p className='text-danger'>{errdata.work_hours_enderr}</p>

                    </div>
                    <div class="detaaa col-5">

                        <select required value={work_hours_end_period} class="detaaalzzz" name="work_hours_end_period" onChange={(e) => setwork_hours_end_period(e.target.value)} aria-label="Default select example">
                            <option selected value="">Choose Period</option>
                            <option value="am">AM</option>
                            <option value="pm">PM</option>

                        </select>


                    </div>

                    <div className='daaata row '>

                    </div>
                    <div class="detaaa col-5">

                        <select required value={service} class="detailz" onChange={(e) => setservice(e.target.value)} name="service" aria-label="Default select example" id='seee'>
                            <option selected value="">Services</option>
                            <option value='Wellness Exams & Vaccinations'>Wellness Exams & Vaccinations</option>
                            <option value='Boarding & Grooming Services'>Boarding & Grooming Services</option>
                            <option value='Animal Emergency Services'>Animal Emergency Services</option>


                        </select>


                    </div>
                    <div class="detaaa col-5">

                        <input type="number" class="detaaalzzz" onChange={(e) => changedata(e)} name="price" value={price} required aria-describedby="emailHelp" placeholder="Enter Service's Price In Dollars $" />
                        <p className='text-danger'>{errdata.priceerr}</p>

                    </div>
                    <div class="detaaa col-5">
                        <select required value={governorate} className="detaaalzzz" name="governorate" onChange={(e) => setgovernorate(e.target.value)} aria-label="Default select example">
                            <option selected value="">Choose Governorate</option>
                            {governorates.map(gov => {
                                return (<>
                                    <option value={gov}>{gov}</option>
                                </>)
                            })}
                        </select>
                    </div>
                </div>
                <div className='row'>

                    <div class="picc col-5"  >

                        <span class="details">upload a profile pic.</span>
                        <input type="file" placeholder="upload" required id="file" name="profile_pic" onChange={(e) => setimage(e.target.files[0])} />
                        <p id="fileerr"></p>




                    </div>
                </div>
                <div class="detaaa col-7">

                    <textarea id="w3review" className='w3review' name="description" rows="4" cols="50" style={{ width: "100%" }}
                        onChange={(e) => setdescription(e.target.value)} value={description} required aria-describedby="emailHelp" placeholder="Describe Your Services" />
                </div>
                <p className='text-danger'>{submitErr}</p>
                <button onClick={Registerlocation} type="submit" disabled={errdata.nameerr || errdata.emailerr || errdata.mobileerr
                    || errdata.addresserr || errdata.work_hours_starterr
                    || errdata.work_hours_enderr || errdata.ownererr || errdata.priceerr || errdata.ownerTypeerr} className='buttoooon' id='sub'>Submit</button>



            </div>
        </div>



    </>)

}
export default AdminPage2