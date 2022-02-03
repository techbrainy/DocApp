import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import appDataService from "../services/appointments";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from 'react-router-dom';

const GetAppointmentByPatId= (props) => {

    const { id } = useParams()
    const appointmentById = {
        _id: "",
        date: "",
        time: "",
        AppointmentInfo: "",
        Prescription: "",
        DoctorId: "",
        PatientId: "",
        Status: "",
    }  
const [AppId,setAppId] = useState(appointmentById)

    const getAppByID= id =>{
        appDataService.getAppointmentbyId(id)
        
        .then(res=>{
            console.log(res.data);
            setAppId(res.data)
        })
        .catch(e=>{
            console.log(e);
        })
    }

    useEffect(()=>{
        getAppByID(id)

    },[id])
  return (
    <div className="App">
    <h1> Doctor detail Page</h1>
    <br/><br/><br/><br/>
    <h2>time: {AppId.AppointmentInfo}</h2>
    
    </div>
  );
}

export default GetAppointmentByPatId;


