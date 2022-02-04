import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import appDataService from "../services/appointments";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from 'react-router-dom';


const CreateAppointment = (props) => {

    const { id } = useParams()


const appoint = {

    date: "",
    time: "",
    AppointmentInfo: "",
    Prescription: "", 
    DoctorId: "",
    PatientId: "",
    Status:""
}

const [appointData, setappointData] = useState(appoint)


const call = ()=>{

    appDataService.createAppointment(appointData)
    .then((response) => {
        console.log(response)
        
    })
    .catch(e => {
        console.log(e)
    })
 console.log(appointData)
       
   }    

    return (
        <div className="App">
        <h1> Patient Register</h1>
        <br/><br/><br/><br/>
        <h2>Time:<input name="date" value={appointData.date}  onChange={(e)=>{
        setappointData({...appointData,[e.target.name]:e.target.value})
    }} /></h2>
       <h2>Date:<input name="time" value={appointData.time}   onChange={(e)=>{
        setappointData({...appointData,"time":e.target.value})
    }} /></h2>
        
        <button onClick={call}>Submit</button>
        </div>
      );

  
}

export default CreateAppointment;