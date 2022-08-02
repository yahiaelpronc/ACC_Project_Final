import React from 'react';
import './Component4Static/SurOperation.css';
class AnimalOperation extends React.Component {
    constructor(props) {
        super();
    }
    render() {
        return (
            <>
                <h2 className="main-title my-4">Surgical Operation</h2>
                <div className=" container surContainer">
                    <div className='ffff row'>
                        <div className='col-5'>
                            <div className='card mmCard'>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        <label className="labels" htmlFor="span22">Animal Name: </label>
                                        <span className="span22"></span>

                                    </li>
                                    <li className="list-group-item">
                                        <label className="labels" htmlFor="">User Name:</label>
                                        <span className="span22"></span>
                                    </li>
                                    <li className="list-group-item">
                                        <label className="labels" htmlFor=""> Service:</label>
                                        <span className="span22"></span>
                                    </li>
                                    <li className="list-group-item">
                                        <label className="labels" htmlFor="span22">Animal Name: </label>
                                        <span className="span22"></span>

                                    </li>

                                </ul>
                            </div>

                        </div>
                        <div className='col-5'>
                            <div className=' card mmCard'>
                                <ul className="list-group list-group-flush">

                                    <li className="list-group-item">
                                        <label className="labels" htmlFor=""> Status User:</label>
                                        <span className="span22"></span>
                                    </li>
                                    <li className="list-group-item">
                                        <label className="labels" htmlFor=""> Date:</label>
                                        <span className="span22"></span>
                                    </li>
                                    <li className="list-group-item">
                                        <label className="labels" htmlFor=""> Time:</label>
                                        <span className="span22"></span>
                                    </li>
                                    <li className="list-group-item">
                                        <label className="labels" htmlFor=""> Time:</label>
                                        <span className="span22"></span>
                                    </li>


                                </ul>
                            </div>


                        </div>
                    </div>
                    <div className="buttons">
                        <button className="btn but ">Accept</button>
                        <button className="btn but ">Decline</button>
                        {/* <button className="btn but">Chat</button> */}
                    </div>

                </div>



            </>
        )

    }
}
export default AnimalOperation;