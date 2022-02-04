const express = require('express')
    //require("dotenv").config();
const req = require('express/lib/request')
const mongoose = require('mongoose')
const router = express.Router()
const Doctor = require('../model/doctorSchema')
const appointment = require('../model/appointment')
const patient = require('../model/patient')
const Usermodel = require('../model/Usermodel')
const jwt = require("jsonwebtoken");
const cache = require('D:/React/doc_app/routeCache')
const authenticateToken = require('D:/React/doc_app/authenticateToken')
    //const { regexpToText } = require("nodemon/lib/utils");
const bcrypt = require("bcryptjs");

const JWT_SECRET = "c7b6279efb87ef30afcc4e403e2ab580eb02f2f15e51ee0259b5114c9b6c35d0f93222085d0f32df0c6c498867b02c137ecd4921f2434b87a9d3c7f36077e0d1"
    //process.env.ACCESS_TOKEN_SECRET;


router.post('/api/login', async(req, res) => {
    const { username, password } = req.body;
    const User = await Usermodel.findOne({ username }).lean();
    console.log(User)
    if (!User) {
        return res.json({ status: "error", error: "Invalid username/password" });
    }

    if (await bcrypt.compare(password, User.password)) {
        const token = jwt.sign({
                id: User.id,
                username: User.username,
            },
            JWT_SECRET
        );

        return res.json({ status: "ok", acesstoken: token });
    }

    res.json({ status: "error", data: "Invalid username/password" });
});



router.get('/getappointment/:id', cache(200), async(req, res) => {

    const abcd = await appointment.find({ PatientId: req.params.id })
    console.log(abcd)


    res.json(abcd)
})

router.get('/getdoctorBycity/:city', authenticateToken, cache(200), async(req, res) => {


    const doctors = await Doctor.find({ City: req.params.city })
    console.log("s" + doctors)


    res.json(doctors)
})



router.get('/getSpecialization/:Specialization', cache(200), async(req, res) => {

    const doctors = await Doctor.find({ Specialization: req.params.Specialization })
    console.log("s" + doctors)


    res.json(doctors)
})


// router.get('/getappointmentByDate/:did/:date', cache(200), async(req, res) => {
//     const dateString = req.params.date
//     const docId = req.params.did
//     console.log(docId)
//         // const abcd = await appointment.find({ DoctorId: docId, date: dateString })
//         // console.log(abcd)
//         // res.json(abcd)
//     const ab = await appointment.aggregate([{
//             $match: { $and: [{ DoctorId: { $in: docId } }, { date: { $in: dateString } }] },
//             $lookup: {

//                 from: "patients",
//                 localField: "PatientId",
//                 foreignField: "Fname",
//                 as: "details",

//             }



//         }

//     ])

//     res.json(ab)


// })


router.get('/getappointmentByDate/:did/:date', cache(200), async(req, res) => {
    const dateString = req.params.date
    const docId = req.params.did
    console.log(docId)

    const ab = await appointment.aggregate([{
            $match: {
                $and: [
                    { DoctorId: { $eq: req.params.did } },
                    { date: { $eq: req.params.date } }
                ]
            }
        },

        {
            $lookup: {

                from: "patients",
                localField: "PatientId",

                foreignField: "id",
                as: "details",

            }
        },

        {
            $unwind: {
                path: "$details",
                preserveNullAndEmptyArrays: true
            }
        }


    ])

    res.json(ab)


})

// router.get('/getPatDet/:id', cache(200), async(req, res) => {
//     const PatientId = req.params.id;
//     const ab = await appointment.aggregate([{
//         $match: { PatientId: { eq: "61ef3131a7d4a7b7c113b775" } },
//         $lookup: {
//             from: "patients",
//             localField: "PatientId",
//             foreignField: "id",
//             as: "patientDetails",

//         }

//     }])
//     res.json(ab)

// });

router.get('/getPatDet/:id', cache(200), async(req, res) => {
    // const PatientId = req.params.id;
    const ab = await appointment.aggregate([{
            $match: {
                $and: [
                    { PatientId: { $eq: req.params.id } }

                ]
            }
        },

        {
            $lookup: {

                from: "patients",
                localField: "PatientId",

                foreignField: "id",
                as: "details",

            }
        },

        {
            $unwind: {
                path: "$details",
                preserveNullAndEmptyArrays: true
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