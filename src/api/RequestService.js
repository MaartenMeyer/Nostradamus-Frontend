import axios from "axios";

function postLogin(userName, password){
    return axios({
        method: 'post',
        url: 'http://127.0.0.1:3000/api/login',
        data: { userName: userName, password: password },
        headers: { 'Content-Type': 'application/json' }
    })
}

function getData(userId, accessToken){
    return axios({
        method: 'get',
        url: 'http://127.0.0.1:3000/api/data/' + userId,
        headers: { "Authorization": "Bearer " + accessToken }
    })
}

function getUsers(userId, accessToken) {
    return axios({
        method: 'get',
        url: 'http://127.0.0.1:3000/api/users/' + userId,
        headers: { "Authorization": "Bearer " + accessToken }
    })
}

function getClockingStatus(userNumber, accessToken) {
    return axios({
        method: 'get',
        url: 'http://127.0.0.1:3000/api/clockingStatus/' + userNumber,
        headers: { 'Authorization': "bearer " + accessToken }
    })
}

function getBreakStatus(userNumber, accessToken) {
    return axios({
        method: 'get',
        url: 'http://127.0.0.1:3000/api/breakStatus/' + userNumber,
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

function synchronizeClockingEntry(userNumber, branchId, departmentId, beginTime, endTime, accessToken){
    return axios({
        method: 'post',
        url: 'http://127.0.0.1:3000/api/clocking',
        data: { userNumber: userNumber, branchId: branchId, departmentId: departmentId, beginTime: beginTime, endTime: endTime },
        headers: { 'Authorization': "bearer " + accessToken }
    })
}

function synchronizeBreakEntry(userNumber, beginTime, endTime, accessToken){
    return axios({
        method: 'post',
        url: 'http://127.0.0.1:3000/api/breaking',
        data: { userNumber: userNumber, beginTime: beginTime, endTime: endTime },
        headers: { 'Authorization': "bearer " + accessToken }
    })
}

function postBreakEntry(userNumber, accessToken){
    return axios({
        method: 'post',
        url: 'http://127.0.0.1:3000/api/breaking',
        data: { userNumber: userNumber },
        headers: { 'Authorization': "bearer " + accessToken }
    })
}

function postNewUser(firstName, lastName, userName, dateOfBirth, emailAddress, userNumber, accountType, password, companyId) {
    return axios({
        method: 'post',
        url: 'http://127.0.0.1:3000/api/register',
        data: { firstName: firstName, lastName: lastName, userName: userName, dateOfBirth: dateOfBirth, emailAddress: emailAddress, accountType: accountType, password: password, userNumber: userNumber, companyId: companyId},
        headers: { 'Content-Type': 'application/json' }
    })
}

function getUserClockOverviewByUserNumber(userNumber){
    return axios({
        method: 'get',
        url: 'http://127.0.0.1:3000/api/overview/usernumber/' + userNumber,
        headers: { 'Content-Type': 'application/json' }
    })
}

function getUserClockOverviewByLastName(lastName){
    return axios({
        method: 'get',
        url: 'http://127.0.0.1:3000/api/overview/lastname/' + lastName,
        headers: { 'Content-Type': 'application/json' }
    })
}

function getUserClockOverviewByDate(date){
    return axios({
        method: 'get',
        url: 'http://127.0.0.1:3000/api/overview/date/' + date,
        headers: { 'Content-Type': 'application/json' }
    })
}

export default {
    postLogin,
    getData,
    getUsers,
    getClockingStatus,
    getBreakStatus,
    getConnectionStatus,
    postClockingEntry,
    synchronizeClockingEntry,
    postBreakEntry,
    postNewUser,
    getUserClockOverviewByUserNumber,
    getUserClockOverviewByLastName,
    getUserClockOverviewByDate,
    synchronizeBreakEntry
}
