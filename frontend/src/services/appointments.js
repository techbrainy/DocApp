import http from "../http-common";

class appDataService {

    getPatDet() {
        return http.get('docapp/getPatDet')
    }

    getAppointment(date) {
        return http.get('docapp/getappointmentByDate/' + date)
    }

    createAppointment(data) {
        return http.post('docapp/appointment', data)

    }
    getAppointmentbyId(id) {
        return http.get('docapp/getappointment/' + id)
    }
}

export default new appDataService();