import http from "../http-common";

class createPatientService {

    createPat(data) {
        return http.post('docapp/patient', data)
    }

    updatePat(id, data) {
        return http.put('docapp/updatePatient/' + id, data)
    }
    deletePat(id) {
        return http.put('docapp/deletePatient/' + id)
    }

}

export default new createPatientService();