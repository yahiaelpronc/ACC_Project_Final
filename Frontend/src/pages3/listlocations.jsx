

import axios from "axios"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {host_var} from "../vars_react"


function ListLocations() {

  const [location, setlocation] = useState([])
  useEffect(() => {
    axios.get(`${host_var}/listlocation/`)
      .then((res) => setlocation(res.data))
      .catch((err) => console.log(err))
  }, [])

  return (<>
    <center> <h1>list of locations</h1></center>
    {location.map(location => {
      return <div>
        <h3>{location.name}</h3>
        <Link to={`details/${location.id}`}><button >Details</button></Link>
      </div>
    }
    )}
  </>)
}
export default ListLocations