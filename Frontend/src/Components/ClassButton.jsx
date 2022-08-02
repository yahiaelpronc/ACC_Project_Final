import React from 'react';
import './ComponentStatic/ClassButton.css';
class Button extends React.Component {
    constructor(props) {
        super();
    }
    render() {
        return <button className="btn btn-info mx-3 my-3">{this.props.btnTitle}</button>
    }
}
export default Button;