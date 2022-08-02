import React from "react";
import { Link } from "react-router-dom";
class Cards extends React.Component {

    constructor(props) {
        super()
    }

    render() {
        return <>
            <div className="card" id={this.props.id}>
                <img className=" img card-img-top" src={this.props.photo} alt="Card image cap" />
                <div className="card-body" style={{ backgroundColor: this.props.ground }}>
                    <h5 className="card-title" style={{ color: "white" }}>{this.props.title}</h5>
                    <p className="card-para">{this.props.para}</p>
                    <p className="card-para">{this.props.para1}</p>
                </div>
            </div>
        </>
    }
}
export default Cards;