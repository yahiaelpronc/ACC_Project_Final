import '../App.css';
import React from 'react'
import UserData from './UserData'
import ClassButton from '../Components/ClassButton'
import UserFunction from './UserFunction'
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
class App extends React.Component {
    constructor() {
        super()
        this.state = {
            name: "Ali",
            age: 10,
            position: "Front End"
        }
    }
    changeData() {
        this.setState({
            name: "Ahmed",
            age: 80
        })
    }
    render() {
        return <>
            <h1>{this.state.name}</h1>
            <h1>{this.state.age}</h1>
            <h1>{this.state.position}</h1>
            <button onClick={() => this.changeData()}>Change Data</button>
            <UserData username={this.state.name} age={this.state.age} />
            <ClassButton btnTitle="Title From App Class" />
            <UserFunction message="Props From User Function" />
            <Alert variant={"success"}>
                This is a {"success"} alert—check it out!
            </Alert>
            <Button variant="primary">Primary</Button>
        </>
    }
}

export default App;
