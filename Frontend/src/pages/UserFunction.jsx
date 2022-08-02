import React from 'react'
function UserFunction(props) {
    console.log(props)
    return (
        <h1>Function Component : {props.message}</h1>
    )
}
export default UserFunction