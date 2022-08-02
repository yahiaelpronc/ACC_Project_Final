import './PagesStatic/Operations.css';
import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Table from '../Components/ClassTable';
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';


function ScheduledOperation(){
    const loggedUser = useSelector((state) => state.loggedUser);
    console.log(loggedUser.username)
    const [Surgeries,setSurgries]=useState([])
    const [Medication,setMedication]=useState([])
    const [dataCame,setDataCame]=useState(false)
    // const [animalArr,setanimalArr]=useState([])
    // const [ownerArr,setownerArr]=useState([])
    var animalArr=[]
    var ownerArr=[]


    useEffect(()=>{
        axios.get(`http://localhost:8000/api/getSurgery/${loggedUser.username}/`)
        .then((res)=> {setSurgries(res.data)

            for(var i = 0;i< res.data.length;i++){
                console.log("testttttt",res.data[i].owner)
                console.log("testttttt22",res.data[i].owner)
                animalArr.push(res.data[i].animalName)
                ownerArr.push(res.data[i].owner)
                

            }


        setDataCame(true)
  })
        .catch((err)=> console.log(err))
    },[])
    console.log("my animal arr ",animalArr)
    console.log("my owner arr ",ownerArr)

    
    const [MyAnimal,setMyAnimal]=useState({})
    // var i=1;

    // const myfunction=(animalName,owner)=>{
    //     console.log("animal no "+i,animalName)
    //     console.log("owner no "+i,owner)
    //     i=i+1
    //     const mytest=setTimeout(function (animalName,owner){
    //         axios.get(`http://localhost:8000/api/findSpecificAnimal/${owner}/${animalName}/`)
    //         .then((res)=> { setMyAnimal(res.data)
    //             getAge(MyAnimal.b_date)
    //         })
    //         .catch((err)=> console.log(err))
    //     })
    //     return mytest
    // }



    // const getAnimal=(animalName,owner)=>{
    //     if(dataCame){
    //         axios.get(`http://localhost:8000/api/findSpecificAnimal/${owner}/${animalName}/`)
    //         .then((res)=> { setMyAnimal(res.data)
    //             getAge()
    //         })
    //         .catch((err)=> console.log(err))

    //     }


    // }
    const [agedata ,setagedata]=useState("")
  


    // const getAge =(animalB_Date)=> {
    //     const mydate=new Date()
    //     const myYear=mydate.getFullYear()
    
    //     // const animalB_Date=MyAnimal.b_date
    //     const myarr=animalB_Date.split("-")
    //     console.log("my arr",myarr)
    
    
    //     const AnimalAgeY=myYear-(myarr[0])
    //     const AnimalAgeM=mydate.getMonth()-(myarr[1])
    //     const AnimalAgeD=mydate.getDay()-(myarr[2])
    //     console.log(myarr)
    //     console.log(myYear)
    //     console.log("birth date",animalB_Date)
    //     setagedata(AnimalAgeY+" years " + AnimalAgeM + "months " + AnimalAgeD + " days ")

    // }
    
    // useEffect(()=>{
    //     axios.get(`http://localhost:8000/api/getMedication/${Request.animalName}/`)
    //     .then((res)=> setMyAnimal(res.data))
    //     .catch((err)=> console.log(err))
    // },[])




    return(
        <>
        <h2 className="main-title">Scheduled Operations</h2>
        {Surgeries.map(sur => {
            // setMyAnimal()
            // getAnimal(sur.animalName,sur.owner)
            return(<><div className=" mainDiv container">
                                <div className='container-fluid row'>
                                    <div className='col-4'>
                                        <form action="">
                                        <label htmlFor="">{sur.animalName}</label><br />
                                        <label htmlFor="">{MyAnimal.species}</label><br />
                                        <label htmlFor="">{sur.owner}</label><br />
                                        <label htmlFor="">{agedata}</label><br />
                                        <label htmlFor="">{MyAnimal.animalName}</label><br />
                                        <label htmlFor="">{MyAnimal.gender}</label>
                                        <div className='special'>
                                        <i className="fa-solid fa-calendar-check" style={{color:'#1787e0'}}></i>
                                            <label htmlFor="">{sur.date}</label>
                                        </div>
                                        <div className='special'>
                                        <i className="fa-solid fa-money-bill" style={{color:'#1787e0'}}></i>
                                            <label htmlFor="">{sur.price}</label>
                                        </div>
                                        <div className='special'>
                                        <i className="fa-solid fa-angles-right" style={{color:'#1787e0'}}></i>
                                            <label htmlFor="">{sur.operationName}</label>
                                        </div>
                                        </form>
                                    </div>
                                    <div className='col-8'>
                                        {/* <div className='message'>
                                            <h3>message</h3>
                                        </div> */}
                                        <img src={require(`./images/dental.jpg`)} alt="" id='dent1'/>
                                    </div>
                                </div>
                            </div>
                            <Table Med1="Med x"  Dos1="200m" interval1="20th June"/>



                    </>)
        })}

        <h2 className="main-title my-5">Scheduled Operations</h2>
        <div className=' mainCOn container p-5'>
        <h3 className='me'>Surgical Message</h3>
            <div className='container-fluid row' id='roo'>
                <div className='col-4'>
                <img src={require(`./images/dd.jpg`)} alt="" className='dd'/>
                </div>
                
                <div className=' left col-4'>
                    <p className='ll'>Animal Name</p>
                    <p className='ll'>UserName</p>
                    <p className='ll'>Age</p>
                    
                    
                </div>
                <div className=' right col-4'>
                    <p className=' rr text-danger'>Date</p>
                    <p className=' rr text-danger'>Price</p>
                    <p className='rr text-danger'>Operation</p>
                   
                </div>
                
                
                
            </div>
        </div>
        
        </>
    )
}
export default ScheduledOperation;