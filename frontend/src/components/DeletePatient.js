import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import appDataService from "../services/appointments";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from 'react-router-dom';
import axios from "axios";


const DeletePatient = (props) => {
    const { id } = useParams()

    const [status, setStatus] = useState()

    useEffect(() => {
        // DELETE request using fetch inside useEffect React hook
        fetch('http://localhost:9000/docapp/deletePatient/' + id, { method: 'DELETE' })
            .then(() => setStatus('Delete successful'));


    }, [id]);

    return (
        <div className="App">
        <h1> Doctor deleted</h1>
        
        
        </div>
      );

}
export default DeletePatient;