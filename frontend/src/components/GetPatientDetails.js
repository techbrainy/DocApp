import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import appDataService from "../services/appointments";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from 'react-router-dom';

const GetPatientDetails= ()=> {
    const doc = {
        time: "", 
    }
const [patdet,setPatdet] = useState(doc)

    const getPatdet=()=>{
        appDataService.getPatDet()
        
        .then(res=>{
            console.log(res.data);
            setPatdet(res.data)
        })
        .catch(e=>{
            console.log(e);
        })
    }

    useEffect(()=>{
        getPatdet()

    },[])
  return (
    <div className="App">
    <h1> Doctor detail Page</h1>
    <br/><br/><br/><br/>
    <h2>time: {patdet.AppointmentInfo}</h2>
    
    </div>
  );
}

export default GetPatientDetails;


