import '../App.css';
import React from 'react'
import ClassButton from '../Components/ClassButton'
class UserData extends React.Component {
    constructor(props) {
        super()
        // console.log(props)
    }
    render() {
        return <>
            <h1>Hello From UserData</h1>
            <h1 style={{ color: 'red', backgroundColor: 'green' }}>{this.props.username}</h1>
            <h1 style={{ color: 'red', backgroundColor: 'green' }}>{this.props.age}</h1>
            <ClassButton btnTitle="Title From UserData" />
        </>
    }
}

export default UserData;
