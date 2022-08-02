

import axios from "axios"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"


function ListLocations() {

  const [location, setlocation] = useState([])
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/listlocation/")
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