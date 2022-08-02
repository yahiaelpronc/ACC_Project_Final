import React from 'react';
import './Component4Static/SurgicalRequest.css';
class SurgicalRequest extends React.Component {
    constructor(props) {
        super();
    }
    render() {
        return (
            <>
                <h2 className="main-title my-4">Surgical Requests</h2>
                <div className=" container surContainer">
                    <div className='MESSAG row p-3 my-3'>
                        <p className='messagesss fw-bold'></p>

                    </div>
                    <div className='ffff row'>
                        <div className='col-6'>
                            <div className=' card mmCard'>
                                <ul className="list-group list-group-flush">

                                    <li className="list-group-item">
                                        <label className="labels" htmlFor=""> Animal Type:</label>
                                        <span className="span22"></span>
                                    </li>
                                    <li className="list-group-item">
                                        <label className="labels" htmlFor=""> Username:</label>
                                        <span className="span22"></span>
                                    </li>
                                </ul>
                            </div>


                        </div>
                    </div>

                </div>



            </>
        )

    }
}
export default SurgicalRequest;