import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import appDataService from "../services/appointments";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from 'react-router-dom';
import axios from "axios";

const GetAppointmentByDate = (props) => {
    const {date}  = useParams()
    const appointment = [{
        _id: "",
        date: "",
        time: "",
        AppointmentInfo: "",
        Prescription: "",
        DoctorId: "",
        PatientId: "",
        Status: "",
    }]  
const [appdet,setappdet] = useState(appointment)

    const getAppointmentMethod = date =>{
        let did = "61f18d9db62b3a273f28a17e"
       axios.get("http://localhost:9000/docapp/getappointmentByDate/"+ date,did)
       //appDataService.GetAppointmentByDate(date) 
       .then(res=>{
            setappdet(res.data)
            console.log("this is console"+ res.data);
            console.log(res)
           
        })
        .catch(e=>{
            console.log(e);
        })
    }

    useEffect(()=>{
        getAppointmentMethod(date)

    },[date])

  return (
    <div className="App">
    <h1> Doctor detail Page</h1>
    <br/><br/><br/><br/>

    { appdet.map(appdet => {
                    console.log(appdet)
                    return (
                        <div key={appdet._id}>
                         <h2>time: {appdet.AppointmentInfo}</h2>
                         <h2>date: {appdet.date}</h2>
                        </div>
                    )
                })}
    
    </div>
  );
}

export default GetAppointmentByDate;


// const DoctorDetails=(props)=> {

 
//     const { id } = useParams()
//     const checked = ()=>{
//         setDisabled(0.7)
//         alert("Booked")
//         //add a page for some comments and then call appointment api
//     }
//    const doc = {
//         Address: "",
//         Contact: "",
//         License: "",
//         Rating: "",
//         Specialization: "",
//         name: "",
//         _id: "",
//     }
//     const [date, setDate] = useState(new Date());
//     const [doctor,setDoctor] = useState(doc)
//     const [slots,setSlots] = useState([])
//     const [disable,setDisabled] = useState(1)

    
//     const getDoctorDetails = id =>{
//         console.log(id)
//         DoctorDataService.getDetails(id)
//         .then(response=>{
//             console.log(response.data);
//             console.log(response.data);

//             setDoctor(response.data)

//         })
//         .catch(e=>{
//             console.log(e);
//         })
//     }
    
//     useEffect(()=>{
//         getDoctorDetails(id)

//     },[id])

//     function getWeekOfMonth(date) {
//         let adjustedDate = date.getDate()+ date.getDay();
//         let prefixes = ['0', '1', '2', '3', '4', '5'];
//         return (parseInt(prefixes[0 | adjustedDate / 7])+1);
//     }
//     const confirm=()=>{
//        let cd = new Date()
//         console.log(cd.getMonth())
//         console.log(date.getMonth())
//         console.log(id)
//         console.log(getWeekOfMonth(date))
//         console.log(date.getDay())
//         if(cd.getMonth()!= date.getMonth()){
//             alert("Please select an appointment from this month, the appointment from next month will be unlocked in that month")
//         }
//        let data={
//             "day":date.getDay(),
//             "week":getWeekOfMonth(date),
//             "id":id

//         }
       
//         DoctorDataService.getAppointments(data)
//         .then((response)=>{
//             console.log(response)
//             setSlots(response.data)
//             console.log(slots)
//         })
//         .catch(e=>{
//             console.log(e)
//         })
        
//     }
//   return (
//     <div className="App">
//     <h1> Doctor detail Page</h1>
//     <br/><br/><br/><br/>
//     <h2>Name: {doctor.Fname +"  "+ doctor.Lname}</h2>
//     <h2>Specialization: {doctor.Specialization}</h2>
//     <h3>Address: {doctor.Address}</h3>
//     <h4>Rating: {doctor.Rating}</h4>
//     <h4>License: {doctor.License}</h4>
//     <div>
//             <h2>Appointment</h2>
//             <Calendar
//         calendarType="ISO 8601"
//         defaultView="month"
//         showNavigation={true}
//         showFixedNumberOfWeeks={true}
//         onChange={setDate}
//         value={date}
//       />
//       <button onClick={confirm}>Confirm</button>
//             </div>
//             <div>
//                 <h1>Slots</h1>
//                 { slots.map(slot => {
//                     console.log(slot)
//                     return (
//                         <div key={slot._id}>
//                         <p onClick={checked}>{slot.timeslot}    {slot.available}</p>
//                         </div>
//                     )
//                 })}
//             </div>
//     </div>
//   );
// }

// export default DoctorDetails;