import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './PagesStatic/NewSchedule.css';
import Table from "../Components/ClassTable";


function NewRequest(){


    return(
        <>
        <div className="container-fluid ">
        </div>
        <h2 className="main-title my-4">Request Surgery</h2>
        <div className=" mid container">
            <div className="container-fluid row">
                <div>
                    <h5 id="head2">Surgical Operation Message</h5>
                </div>
                <div className="col-6">
                <div className=" cc card">
        <ul className="list-group list-group-flush">
            <li className="list-group-item">
                <label className="labels" htmlFor="span22">Animal Name:</label>
                <span className="span22">Roxy</span>
                
            </li>
            <li className="list-group-item">
                <label className="labels" htmlFor="">User Name:</label>
                <span className="span22">Ali Ahmed</span>
            </li>
            <li className="list-group-item">
                <label className="labels" htmlFor=""> Animal Weight:</label>
                <span className="span22">800kg</span>
            </li>
            <li className="list-group-item">
                <label className="labels" htmlFor=""> Animal Age:</label>
                <span className="span22">5 years</span>
            </li>
            
        </ul>
                </div>
                </div>
                <div className="col-6">
                <div className=" cc card">
        <ul className="list-group list-group-flush">
        <li className="list-group-item">
                <label className="labels" htmlFor=""> Animal Gender:</label>
                <span className="span22">Female</span>
            </li>
            <li className="list-group-item">
                <label className="labels" htmlFor="">  Operation Date:</label>
                <span className="span22">22/10</span>
            </li>
            <li className="list-group-item">
                <label className="labels" htmlFor=""> Operation Price:</label>
                <span className="span22">50000LE</span>
            </li>
            <li className="list-group-item">
                <label className="labels" htmlFor=""> Operation Name:</label>
                <span className="span22">Surgery</span>
            </li>
            
        </ul>
                </div>
                </div>
            </div>
        </div>
        <Table/>
        <div className="buttons">
            <button className="btn bb ">Accept Surgery</button>
            <button className="btn bb">Deny Surgery</button>
        </div>
        
        
        </>
    )
}
export default NewRequest;