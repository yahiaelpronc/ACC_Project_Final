import React from "react";
import Cards from "../Components/ClassCard";
import Button from "../Components/ClassButton";
import { Link } from "react-router-dom";
function Register() {
    return (
        <>
            <h2 className="main-title mt-5">Register</h2>
            <div className=" contain container mb-5 ">
                <div className=" conCards row">
                    <div className="  col-lg-6">
                        <div className="card" style={{ width: '18rem' }}>
                            <Link to="/UserRegister/" className="hh">
                                <img className="card-img-top" src={require(`./images/features-01.jpg`)} alt="Card image cap" />
                                <div className="card-body">
                                    <Link to="/UserRegister/" className="btn btn-primary">REGISTER AS USER</Link>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className=" col-lg-6">
                        <div className="card" style={{ width: "18rem" }}>
                            <Link to="/VetRegister/" className="hh">
                                <img className="card-img-top" src={require(`./images/dd.jpg`)} alt="Card image cap" />
                                <div className="card-body">
                                    <Link to="/VetRegister/" className="btn btn-primary">REGISTER AS VET</Link>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Register;