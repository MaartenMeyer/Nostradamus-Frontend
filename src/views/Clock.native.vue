<template>
    <Page actionBarHidden="false" backgroundSpanUnderStatusBar="true">
        <ActionBar class="action-bar">
            <Label class="action-bar-title" text="In/Uit Klokken"></Label>
        </ActionBar>
        <FlexboxLayout class="page" verticalAlignment="center">
            <StackLayout class="invoer">
                <Label class="action" text="Voer je gegevens in:"></Label>
            </StackLayout>

            <StackLayout class="form">
                <TextField class="input" @textChange="changeNumber" hint="Werknemersnummer"
                           keyboardType="number" v-model="userNumber" />
                <ListPicker required id='branchPicker' v-if="displayBranch" :items="listBranch"
                    @selectedIndexChange="changeBranch" v-model="selectedItemBranch"
                    style="width:75%;" disabled="true" />
                <ListPicker required id='departmentPicker' v-if="displayDepartment" :items="listDepartment"
                    @selectedIndexChange="changeDepartment" v-model="selectedItemDepartment"
                    style="width:75%;" disabled="true" />
                <Button v-if="displayButton" :text="'Klokken'" @tap="clickClockingValidate" class="button" />
            </StackLayout>
        </FlexboxLayout>
    </Page>
    
</template>

<script>
    import axios from "axios/index";
    import Dashboard from "./Dashboard.native.vue";
    import { request } from 'http';
    import { mapGetters } from 'vuex';
    import localStorage from 'nativescript-localstorage';

    export default {
        name: "Clock",
        data() {
            return {
                listBranch: [],
                listDepartment: [],
                selectedItemBranch: 0,
                selectedItemDepartment: 0,
                userNumber: null,
                displayDepartment: 0,
                displayBranch: 0,
                displayButton: 0,
                clockingEntry: {
                    userNumber: "",
                    branchId: "",
                    departmentId: "",
                    beginTime: ""
                }
            };
    },

    computed: {
            ...mapGetters({ currentUser: 'currentUser' })
    },    
    
    methods: {
            getBranchData(){
                //fills listBranch
                this.listBranch = [];
                let jsonObject = JSON.parse(localStorage.getItem('company'));
                let branches = jsonObject.branches;
                this.listBranch.push("Locatie");

                for(var i = 0; i < branches.length; i++){
                    this.listBranch.push(branches[i].branchName)
                }

            },
            dunkDepartmentData(){
                //empties listDepartment
                this.listDepartment = [];
                for(var i = this.listDepartment.length -1; i >= 1 ; i--){
                    this.listDepartment.remove(i);
                }
                this.selectedItemDepartment = 0;
                this.getDepartmentData();
            },
            getDepartmentData(){
                //Fills listDepartment
                this.listDepartment = [];
                this.listDepartment.push("Afdeling");

                //Function to find an element in an array
                //Called to find department in branch array
                function findElement(arr, propName, propValue) {
                    for (var i=0; i < arr.length; i++)
                        if (arr[i][propName] == propValue){
                            return arr[i];
                    }
                }

                let jsonObject = JSON.parse(localStorage.getItem('company'));
                let branches = jsonObject.branches;
                let branchId = this.selectedItemBranch;
                let branch = findElement(branches, "branchId", branchId);
                let departments = branch.departments;

                for(var i = 0; i < departments.length; i++){
                    this.listDepartment.push(departments[i].departmentName)
                }

            },
            changeBranch() {
                if (this.selectedItemBranch != 0) {
                    this.clockingEntry.branchId = this.selectedItemBranch;
                    this.dunkDepartmentData();
                    this.displayDepartment = 1;
                }
            },
            changeDepartment() {
                if (this.selectedItemDepartment != 0) {
                    this.clockingEntry.departmentId = this.selectedItemDepartment;
                    this.displayButton = 1;
                }
            },
            changeNumber() {
                if (this.userNumber != null) {
                    this.clockingEntry.userNumber = this.userNumber;
                    this.getBranchData();
                    this.displayBranch = 1;
                }
            },

            // checkClockingStatus(){
            //     axios({
            //         method: 'post',
            //         url: 'http://145.49.8.169:3000/api/clockingStatus',
            //         data: { userNumber: this.clockingEntry.userNumber},
            //         headers: {'Authorization': "bearer " + token}})
            //         .then((response) =>
            //
            //         )
            //         .catch(
            //             //offline
            //         )
            //
            // },
            clickClockingValidate() {
                if (this.userNumber == "") {
                    this.alert("Er is geen werknemersnummer ingevoerd.");
                } else if (this.selectedItemDepartment == 0) {
                    this.alert("Er is geen afdeling ingevoerd.");
                } else if (this.selectedItemBranch == 0) {
                    this.alert("Er is geen locatie ingevoerd.");
                } else {
                    console.log(this.clockingEntry.userNumber);
                    console.log("branch " + this.clockingEntry.branchId);
                    console.log("department " + this.clockingEntry.departmentId);
                    this.clickStartClocking();
                }
            },
            clickStartClocking() {
                // if(this.userNumber != ""){
                //     // If userNumber is already clocked in, do this
                //     if(this.clockingEntry.userNumber != ""){
                var self = this;
                var token = localStorage.token;
                console.log("token " + token);
                axios({
                    method: 'post',
                    url: 'http://145.49.8.169:3000/api/clocking',
                    data: { 
                        userNumber: this.clockingEntry.userNumber,
                        branchId: this.clockingEntry.branchId ,
                        departmentId: this.clockingEntry.departmentId},
                        headers: {'Authorization': "bearer " + token}
                })
                .then((response) => 
                    this.clockingSuccesful(response)
                )
                .catch(

                )

                // )
                // .catch((error) => {
                //         if(error.response){
                //             if(error.response.status == 500){
                //                 this.alert("Medewerkersnummer bestaat niet!");
                //             }
                //             // If the server is unreachable, a network request error is returned
                //         }else if (error.request.status == 0){
                //             let date = new Date();
                //             let time = ('0' + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
                //             let t = new Date(this.clockingEntry.beginTime);
                //             let beginTime = ('0' + t.getHours()).slice(-2) + ":" + ("0" + t.getMinutes()).slice(-2);
                //
                //             this.alert("Werknemersnummer: " + this.clockingEntry.userNumber + "Begintijd: "+ beginTime + "Eindtijd: "+ time + " Je bent uitgeklokt")
                //         }
                //     })// If user is not clocked in already, do this
                //     }else{
                //         let branch = document.getElementById("selectBranch")
                //         let branchId = branch.options[branch.selectedIndex].value;
                //         let department = document.getElementById("selectDepartment")
                //         let departmentId = department.options[department.selectedIndex].value;
                //
                //         // Checks if default values have been changed / if user has selected options for both branch and department
                //         if(branchId != "" && departmentId != "" && this.userNumber != ""){
                //             var self = this;
                //             var token = localStorage.token;
                //             console.log("token " + token);
                //             axios({
                //                 method: 'post',
                //                 url: 'http://145.49.8.169:3000/api/clocking',
                //                 data: {
                //                     userNumber: this.clockingEntry.userNumber,
                //                     branchId: this.clockingEntry.branchId ,
                //                     departmentId: this.clockingEntry.departmentId},
                //                 headers: {'Authorization': "bearer " + token}
                //             })
                //                 .then((response) =>
                //                     this.clockingSuccesful(response)
                //                 )
                //                 .catch((error) => {
                //                     // If the server returns an error response
                //                     // Server returns 500 when userNumber is invalid after previous checks
                //                     if(error.response){
                //                         if(error.response.status == 500){
                //                             this.alert("Medewerkersnummer bestaat niet!");
                //                         }
                //                         // If the server is unreachable, a network request error is returned
                //                     }else if(error.request.status == 0){
                //                         let date = new Date();
                //                         let time = ('0' + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
                //
                //                         this.showModal("Ingeklokt! Werknemersnummer: " + this.userNumber + "Locatie: " + branchId + "Afdeling: " + departmentId + "Begintijd: " + time + "Fijne dienst! Je bent ingeklokt");
                //                     }
                //                 })
                //         }else {
                //             this.alert("Invoer is nog niet compleet!");
                //         }
                //     }
                // }else{
                //     this.alert("Voer een medewerkersnummer in!");
                // }
                //

                axios.interceptors.response.use(function(response){
                    return response;
                })
            },

            clockingSuccesful(response){
                //console.log(this.response);
                this.toHome();
            },

            clockingFailed(){
                //todo
                this.alert("Er is een probleem met ");
            },

            toHome(){
                console.log("going home");
                this.$goto('dashboard');
            },

            alert(message) {
                var dialogs = require("tns-core-modules/ui/dialogs");
                dialogs.alert({
                    title: "Melding",
                    message: message,
                    okButtonText: "Ok"
                });
            }        
        }
    };    
</script>

<style scoped>
    .action-bar-title{
        font-size: 25px;
    }

    .page {
        align-items: center;
        flex-direction: column;
    }

    .form {
        margin-left: 30px;
        margin-right: 30px;
        flex-grow: 2;
        vertical-align: middle;
    }

    .invoer {
        margin-left: 30px;
        margin-right: 30px;
        flex-grow: 2;
    }

    .action{
        font-family: "Helvetica Neue", "Helvetica Neue Light", Helvetica;
        font-weight: bold;
        font-size: 28px;
        text-align: center;
        margin-top: 30px;
        margin-bottom: 60px;
        color: #676A6C;
    }


    .input {
        font-size: 20px;
        placeholder-color: #A8A8A8;
        text-align: center;

    }

    .input-field .input {
        font-size: 20px;
    }

    .button {
        height: 50;
        /*margin: 30 5 15 5;*/
        background-color: #00A0D1;
        border-radius: 10px;
        font-size: 20px;
        color: white;
    }
</style>