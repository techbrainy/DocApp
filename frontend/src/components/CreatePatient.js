import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import createPatientService from "../services/createPatientService";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import '../';
const CreatePatient = (props) => {

    const { id } = useParams()


const pat = {

    Fname: "",
    Lname: "",
    Address: "",
    Phone: "",
    Postcode: "",
    City: "",
    insuranceProvider: "",
    firstName: "",
    lastName: "",
    address: "",
    birthDate: "",
    startDate: "",
    expiryDate: "",
    insuranceNumber: "",
    cardNumber: "",
    identificationNumberOfCarrier: "",
    Country: "",
}

const [patdata, setpatdata] = useState(pat)


    const call = ()=>{

createPatientService.createPat(patdata)
    .then((response) => {
        console.log(response)
        
    })
    .catch(e => {
        console.log(e)
    })
console.log(patdata)
       
   }    

    return (
        <div className="App">
        <h1> Patient Register</h1>
        <br/><br/><br/><br/>
        <h2>First Name:<input name="Fname" value={patdata.Fname}  onChange={(e)=>{
        setpatdata({...patdata,[e.target.name]:e.target.value})
    }} /></h2>
       <h2>First Name:<input name="Lname" value={patdata.Lname}   onChange={(e)=>{
        setpatdata({...patdata,"Lname":e.target.value})
    }} /></h2>
        
        <button onClick={call}>Submit</button>
        </div>
      );






    
}

export default CreatePatient;