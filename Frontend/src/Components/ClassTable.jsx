import React from "react";
import { Link } from "react-router-dom";
class Table extends React.Component{

    constructor(props){
        super()
    }

    render(){
        return <>
    <div className='my-3 p-3'>
                    <table class="table  table-striped table-hover ">
                        <thead>
                            <tr>
                                <th scope="col">Animal Name</th>
                                    <th scope="col">Vet Name</th>
                                    <th scope="col">Medication Name</th>
                                    <th scope="col">Date</th>
                                    {/* <th scope="col">Medication Type</th> */}
                                    <th scope="col">Dosage</th>
                                    <th scope="col">Dosage Interval </th>
                                    <th scope="col">Adminstration Route</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.props.medications.map(med => {
                                return (<>
                                    <tr>

                                        <td>{med.animalName}</td>
                                        <td>{med.vetName}</td>
                                        <td>{med.medicationName}</td>
                                        <td>{med.date}</td>
                                        <td>{med.dosage} m</td>
                                        <td>{med.dosageInterval} h</td>
                                        <td>{med.adminstrationRoute}</td>


                                    </tr>

                                </>)
                            })}
                           
                         </tbody>
                    </table>

                </div>
        </>
    }
}
export default Table;