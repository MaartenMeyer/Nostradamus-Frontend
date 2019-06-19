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
            //Called from changeBranch()
            //Fills Branch array
            //Based on Company from localstorage
            //Company is bound to logged-in User
            //and is set in Login.native.vue/loadData()
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
            //Called from changeBranch()
            //Empties Department array
            //when the selected Branch is changed
            //then calls getDepartmentData() again
            //to fill array with Departments
            //bound to new selected Branch
            dunkDepartmentData(){
                //empties listDepartment
                this.listDepartment = [];
                for(var i = this.listDepartment.length -1; i >= 1 ; i--){
                    this.listDepartment.remove(i);
                }
                this.selectedItemDepartment = 0;
                this.getDepartmentData();
            },
            //Called from dunkDepartmentData()
            //Fills Department array
            //based on Departments bound to
            //selected Branch
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
            //Called when Branch is selected
            //from listPicker
            //Calls dunkDepartmentData
            //and sets department element to visible
            changeBranch() {
                if (this.selectedItemBranch != 0) {
                    this.clockingEntry.branchId = this.selectedItemBranch;
                    this.dunkDepartmentData();
                    this.displayDepartment = 1;
                }
            },
            //Called when department is selected
            //Sets clock button to visible
            changeDepartment() {
                if (this.selectedItemDepartment != 0) {
                    this.clockingEntry.departmentId = this.selectedItemDepartment;
                    this.displayButton = 1;
                }
            },
            //Called when Usernumber is entered
            //Sets clockingEntry.userNumber
            //Calls getBranchData()
            //Sets displayBranch element to visible
            changeNumber() {
                if (this.userNumber != null) {
                    this.clockingEntry.userNumber = this.userNumber;
                    this.getBranchData();
                    this.displayBranch = 1;
                }
            },

            //Checks if Usernumber, selected Branch&Department are valid
            //Proceeds to http clock method
            clickClockingValidate() {
                if (this.userNumber == "") {
                    this.alert("Er is geen werknemersnummer ingevoerd.");
                } else if (this.selectedItemDepartment == 0) {
                    this.alert("Er is geen afdeling ingevoerd.");
                } else if (this.selectedItemBranch == 0) {
                    this.alert("Er is geen locatie ingevoerd.");
                } else {
                    this.clickStartClocking();
                }
            },
            //Sends http request to server
            //Sends userNumber/branchId/departmentId
            //and token from localStorage
            //Returns response
            clickStartClocking() {
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
                .catch((error) =>{ 
                    if(error.response){
                        this.breakFailed()
                    }
                })

                axios.interceptors.response.use(function(response){
                    return response;
                })
            },

            //Called when response is succesfully received from
            //clickStartClocking()
            //Returns alert based on response.data.message
            clockingSuccesful(response){
                //console.log(this.response);
                if(response.status == 200){
                    //Alert when User clocks in
                    if (response.data.message === "User is clocked in."){
                        function findElement(arr, propName, propValue) {
                        for (var i=0; i < arr.length; i++)
                            if (arr[i][propName] == propValue){
                                return arr[i];
                            }
                        }

                        let jsonObject = JSON.parse(localStorage.getItem('company'));
                        let branches = jsonObject.branches;
                        let branchId = this.clockingEntry.branchId;
                        let branch = findElement(branches, "branchId", branchId);
                        this.alert(
                            "Gebruikersnummer: " + this.clockingEntry.userNumber + 
                            "\n" + 
                            "Locatie: " + 
                            branch.branchName
                        );
                    } 
                    //Alert when User clocks off
                    else if (response.data.message === "User is clocked off."){
                        this.alert("U bent uitgeklokt")
                    }
                    this.toHome();
                } else{
                    this.clockingFailed();
                }                
            },

            //Error handler for clocking
            clockingFailed(){
                //todo
                this.alert("Er is een probleem met het klokken, probeer het later nog een keer");
            },

            //Navigate back to Dashboard
            toHome(){
                console.log("going home");
                this.$goto('dashboard');
            },

            //Alert message definition
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