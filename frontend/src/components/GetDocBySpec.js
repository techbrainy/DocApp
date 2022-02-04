import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import appDataService from "../services/appointments";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from 'react-router-dom';

const GetDocBySpec = (props) => {

    const { spec } = useParams()
    const docspec = {
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
const [doc,setdocspec] = useState(docspec)

    const getdocbyspec= spec =>{
        appDataService.getDocBySpec(spec)
        
        .then(res=>{
            console.log(res.data);
            setdocspec(res.data)
        })
        .catch(e=>{
            console.log(e);
        })
    }

    useEffect(()=>{
        getdocbyspec(spec)

    },[spec])
  return (
    <div className="App">
    <h1> Doctor detail Page</h1>
    <br/><br/><br/><br/>
    <h2></h2>
    
    </div>
  );
}

export default GetDocBySpec;


