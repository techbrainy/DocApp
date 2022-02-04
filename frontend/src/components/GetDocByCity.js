import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import appDataService from "../services/appointments";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from 'react-router-dom';

const GetDocByCity = (props) => {

    const { city } = useParams()
    const docBycity = {
        Fname: "",
        Lname: "",
        Address: "",
        License: "",
        Specialization: "",
        Phone: "",
        Postcode: "",
        City: "",
        Country: "",
        Qualification: "",
        weeks: [
            [{
                Day: "",
                available: "",
                starttime: "",
                endtime: "",
                slotduration: "",
                timeslots: [{
                    timeslot: {},
                    available: {}
    
    
                }]
            }]
        ]
    
    }  
const [doc,setDoc] = useState(docBycity)

    const getdocbycity= city =>{
        appDataService.getDocByCity(city)
        
        .then(res=>{
            console.log(res.data);
            setDoc(res.data)
        })
        .catch(e=>{
            console.log(e);
        })
    }

    useEffect(()=>{
        getdocbycity(city)

    },[city])
  return (
    <div className="App">
    <h1> Doctor detail Page</h1>
    <br/><br/><br/><br/>
    <h2></h2>
    
    </div>
  );
}

export default GetDocByCity;


