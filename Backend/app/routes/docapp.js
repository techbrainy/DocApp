const express = require('express')
const req = require('express/lib/request')
const mongoose = require('mongoose')
const router = express.Router()

const appointment = require('../model/appointment')
const patient = require('../model/patient')

const cache = require('D:/React/doc_app/routeCache')

router.get('/getappointment/:id', cache(200), async(req, res) => {

    const abcd = await appointment.find({ PatientId: req.params.id })
    console.log(abcd)


    res.json(abcd)
})


router.get('/getappointmentpat/:id', cache(200), async(req, res) => {

    const abcd = await patient.find({ PatientId: req.params.id })
    console.log(abcd)


    res.json(abcd)
})


router.get('/getappointmentByDate/:date', cache(200), async(req, res) => {
    const dateString = req.params.date
    const docId = req.body.did
    console.log(dateString)
    const abcd = await appointment.find({ _id: docId, date: dateString })
    console.log(abcd)
    res.json(abcd)


})

router.get('/getPatDet', cache(200), async(req, res) => {

    const ab = await appointment.aggregate([{
            $lookup: {
                from: "patients",
                localField: "PatientId",
                foreignField: "id",
                as: "patientDetails",

            }

        }

    ])
    res.json(ab)

});
router.delete('/deletePatient/:id', async(req, res) => {
    const tempId = req.params.id
    console.log(tempId)
    patient.deleteOne({ _id: new mongoose.Types.ObjectId(tempId) })
        .then(() => {
            res.json("Patient deleted")
            console.log(res)
        })
        .catch((e) => {
            console.log(e)
        })

});



router.post('/appointment', async(req, res) => {
    const patApp = new appointment({


        date: req.body.date,
        time: req.body.time,
        AppointmentInfo: req.body.AppointmentInfo,
        Prescription: req.body.Prescription,
        DoctorId: req.body.DoctorId,
        PatientId: req.body.PatientId,
        Status: req.body.Status,
    })
    try {
        const newApp = await patApp.save()
        res.status(201).json(newApp)
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: err.message })
    }
})



router.route('/patient').post((req, res) => {
    const patientApp = new patient({
        id: req.body.id,
        Fname: req.body.Fname,
        Lname: req.body.Lname,
        Address: req.body.Address,
        Phone: req.body.Phone,
        Postcode: req.body.Postcode,
        City: req.body.City,
        Insurance: {
            insuranceProvider: req.body.insuranceProvider,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            address: req.body.address,
            birthDate: req.body.birthDate,
            startDate: req.body.startDate,
            expiryDate: req.body.expiryDate,
            insuranceNumber: req.body.insuranceNumber,
            cardNumber: req.body.cardNumber,
            identificationNumberOfCarrier: req.body.identificationNumberOfCarrier
        },
        Country: req.body.Country,
    });
    patientApp.save()
        .then(() => {
            res.json("Patient added")
            console.log(res)
        })
        .catch((e) => {
            console.log(e)
        })

})


router.put('/updatePatient/:id', async(req, res) => {
    try {

        const updatedPatient = await patient.updateOne({ _id: req.params.id },
            req.body
        );
        res.json(updatedPatient);
    } catch {
        res.status(404)
        res.send({ error: "Patient doesn't exist!" })
    }
});


router.put('/updatedoctor/:id', async(req, res) => {
    try {

        const updatedoctor = await doctors.updateOne({ _id: req.params.id },
            req.body
        );
        res.json(updatedoctor);
    } catch {
        res.status(404)
        res.send({ error: "Doctor doesn't exist!" })
    }
});


module.exports = router