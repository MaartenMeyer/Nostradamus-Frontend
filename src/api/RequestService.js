import axios from "axios";

function getClockingStatus(userNumber, accessToken) {
    return axios({
        method: 'get',
        url: 'http://127.0.0.1:3000/api/clockingStatus/' + userNumber,
        headers: { 'Authorization': "bearer " + accessToken }
    })
}

function getConnectionStatus(accessToken){
    return axios({
        method: 'get',
        url: 'http://127.0.0.1:3000/api/status',
        headers: { 'Authorization': "bearer " + accessToken }
    })
}

function postClockingEntry(userNumber, branchId, departmentId, accessToken){
    return axios({
        method: 'post',
        url: 'http://127.0.0.1:3000/api/clocking',
        data: { userNumber: userNumber, branchId: branchId, departmentId: departmentId },
        headers: { 'Authorization': "bearer " + accessToken }
    })
}

export default {
    getClockingStatus,
    getConnectionStatus,
    postClockingEntry
}
