import { useEffect, useState } from "react"
import axios from "axios"
import {host_var} from "../vars_react"



function Myform(){
    let date=new Date()
    let mynum=new Number()
    const [username,setusername]=useState("")
    const [firstname,setfirstname]=useState("")
    const [lastname,setlastname]=useState("")
    const [email,setemail]=useState("")
    const [mobile,setmobile]=useState("")
    const [password,setpassword]=useState("")
    const [profile_pic,setimage]=useState(null)
    const [birthdate,setbirthdate]=useState(null)
    const [country,setcountry]=useState("")
    const [facelink,setfacelink]=useState(null)


    // useEffect(()=>{
    //     axios.post("${host_var}/insert/")
    //     .then((res)=> res.data)

    // },[])
    

    const addnewuser = async ()=>{
        let formField= new FormData()
        formField.append('username',username)
        formField.append('firstname',firstname)
        formField.append('lastname',lastname)
        formField.append('b_date',birthdate)
        formField.append('email',email)
        formField.append('password',password)
        formField.append('country',country)
        formField.append('face_link',facelink)
        formField.append('mobile',mobile)
        formField.append('profile_pic',profile_pic)
        await axios({
            method:'post',
            url:`${host_var}/insertUser/`,
            data:formField

        }).then((response)=> console.log(response.data))
        .catch((err) => console.log(err))
        

    }




    return (<>
                <div className="p-5 my-3 ">
                    <h1 className="d-flex my-3 justify-content-center text-danger">Register</h1>

                    <div >

                        {/* <form action="/register/" method="post" id="myform" enctype="multipart/form-data"> */}
            

                        <div class="user-details">

                         <div class="input-box form-group">
                            <span class="details">UserName *</span>
                            <input type="text" placeholder="Enter Your UserName" name="username" value={username} onChange={(e)=>setusername(e.target.value)}/>
                             {/* <span class="text-danger">{{errusername}}</span> */}

                        </div>


                <div class="input-box form-group">
                    <span class="details">First Name *</span>
                    <input type="text" placeholder="Enter Your first Name" id="name" name="firstname" value={firstname} onChange={(e)=>setfirstname(e.target.value)}/>
                    <p id="nameerr"></p>
                    {/* <span class="text-danger">{{errfirstname}}</span> */}
                </div>
                <div class="input-box form-group">
                    <span class="details">last Name *</span>
                    <input type="text" placeholder="Enter Your last Name" id="user" name="lastname" value={lastname} onChange={(e)=>setlastname(e.target.value)}/>
                    <p id="usererr"></p>
                    {/* <span class="text-danger">{{errlastname}}</span> */}

                </div>

                <div class="input-box form-group">
                    <span class="details">Email *</span>
                    <input type="text" placeholder="Enter Your Email" id="email" name="email" value={email} onChange={(e)=>setemail(e.target.value)}/>
                    <p id="emailerr"></p>
                    {/* <span class="text-danger">{{erremail}}</span> */}
                </div>


                <div class="input-box form-group">
                    <span class="details">Phone Number *</span>
                    <input type="text" placeholder="Enter Your egyption PhoneNumber" id="phone" name="mobile" value={mobile} onChange={(e)=>setmobile(e.target.value)}/>
                    <p id="phoneerr"></p>
                    {/* <span class="text-danger">{{errmobile}}</span> */}
                </div>
                <div class="input-box form-group">
                    <span class="details">Password *</span>
                    <input type="password" placeholder="Enter Your Password" id="pass1" name="password" value={password} onChange={(e)=>setpassword(e.target.value)}/>
                    <p id="pass1err"></p>
                </div>

                <div class="input-box form-group">
                    <span class="details">Confirm Password *</span>
                    <input type="password" placeholder="Confirm Your Password" id="pass2" name="confirmpassword"/>
                    <p id="pass2err"></p>
                    {/* <span class="text-danger">{{errnotequal}}</span> */}
                </div>


                <div class="my-2 form-group ">
                    <span class="details">upload a profile pic.</span>
                    <input type="file" placeholder="upload" id="file" name="profile_pic"  onChange={(e)=>setimage(e.target.files[0])}/>
                    <p id="fileerr"></p>

                </div>




                <div class="mb-3 input-box form-group">
                    <label for="bdate" class="form-label label1">Birth Date</label>
                    <input type="date" class="form-control" id="bdate" aria-describedby="emailHelp"
                        placeholder=" Birth Date" name="b_date" value={birthdate} onChange={(e)=>setbirthdate(e.target.value)}/>
                </div>
                <div class="mb-3 input-box form-group">
                    <label for="country" class="form-label label1">Country</label>
                    <input type="text" class="form-control" name="country" value={country} id="Country" aria-describedby="emailHelp" placeholder="Country" onChange={(e)=>setcountry(e.target.value)}/>
                </div>
                <div class="mb-3 input-box form-group">
                    <label for="faceLink" class="form-label label1">Facebook Link</label>
                    <input type="url" class="form-control" id="faceLink" aria-describedby="emailHelp"
                        placeholder="http//www.Facebook.com/fn.page" value={facelink} name="face_link"  onChange={(e)=>setfacelink(e.target.value)}/>
                </div>
            </div>

            <div class="button">
                <input type="submit" value="Register" onClick={addnewuser}     id="submitbtn"/>
            </div>


            <p id="submiterror"></p>
        {/* </form> */}

                    </div>

                </div>



            </>)
}

export default Myform