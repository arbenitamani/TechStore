import axios from 'axios';
import React, { useEffect, useState } from 'react'

const test = () => {
    const [users, setUsers] = useState();
    useEffect(()=>{
        const fetchUsers = async()=>{
            let response = await axios.get('')
        }
    },[])
  return (
    <div>test</div>
  )
}

export default test