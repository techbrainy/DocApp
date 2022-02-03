import React from 'react';

import {Routes,Route,BrowserRouter as Router} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import GetPatientDetails from '../src/components/GetPatientDetails';
import CreatePatient from '../src/components/CreatePatient';
import GetAppointmentByDate from '../src/components/GetAppointmentByDate';
import CreateAppointment from './components/CreateAppointment';
import GetAppointmentByPatId from './components/GetAppointmentsByPatId';
import UpdatePatient from './components/UpdatePatient';
import DeletePatient from './components/DeletePatient';

const App = () =>  {
  return (



    <Router>
    <div className="app">
      <Routes>
      <Route 
        path="docapp/getPatDet"
        element={<GetPatientDetails/>}
        />
       <Route
         path="docapp/patient"
         element={<CreatePatient/>}
       />
       <Route
         path="docapp/appointment"
         element={<CreateAppointment/>}
       />
        <Route
         path="docapp/getappointmentByDate/:date"
         element={<GetAppointmentByDate/>}
       />
       <Route
         path="docapp/getappointment/:id"
         element={<GetAppointmentByPatId/>}
       />

        <Route
         path="docapp/updatePatient/:id"
         element={<UpdatePatient/>}
       />
       <Route
         path="docapp/deletePatient/:id"
         element={<DeletePatient/>}
       />
      
        </Routes>
       </div>
       </Router>


  );
}

export default App;

