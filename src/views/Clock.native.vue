<template>
    <Page actionBarHidden="false" backgroundSpanUnderStatusBar="true">
        <ActionBar class="action-bar">
            <Label class="action-bar-title" text="In/Uit Klokken"></Label>
        </ActionBar>
        <FlexboxLayout class="page" verticalAlignment="center">
            <TextField :class= "input" @textChange="changeNumber" hint="Werknemersnummer"
                keyboardType="number" style="width:75%;" fontSize="18"
                v-model="personNumber" />
            <ListPicker required id='branchPicker' v-if="displayBranch" :items="listBranch"
                @selectedIndexChange="changeBranch" v-model="selectedItemBranch"
                style="width:75%;" />
            <ListPicker required id='departmentPicker' v-if="displayDepartment" :items="listDepartment"
                @selectedIndexChange="changeDepartment" v-model="selectedItemDepartment"
                style="width:75%;" disabled="true" />
            <Button v-if="displayButton" :text="'Klokken'" @tap="clickClockingValidate"
                class="btn btn-primary m-t-20" />
        </FlexboxLayout>
    </Page>
    
</template>

<script>
    import axios from "axios/index";
    import Dashboard from "./Dashboard.native.vue";
    import { request } from 'http';
    import { mapGetters } from 'vuex';
    import 'nativescript-localstorage';

    export default {
        name: "Clock.native",
        data() {
            return {
                listBranch: [],
                listDepartment: [],
                selectedItemBranch: 0,
                selectedItemDepartment: 0,
                personNumber: null,
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
                if (this.personNumber != null) {
                    this.clockingEntry.personNumber = this.personNumber;
                    this.getBranchData();
                    this.displayBranch = 1;
                }
            },
            clickClockingValidate() {
                if (this.personNumber == "") {
                    this.alert("Er is geen personeelsnummer ingevoerd.");
                } else if (this.selectedItemDepartment == 0) {
                    this.alert("Er is geen afdeling ingevoerd.");
                } else if (this.selectedItemBranch == 0) {
                    this.alert("Er is geen locatie ingevoerd.");
                } else {
                    this.clickStartClocking();
                }
            },
            clickStartClocking() {
                axios({
                    method: 'post',
                    url: 'http://145.49.8.169:3000/api/clocking',
                    data: { 
                        userNumber: this.currentUser.userNumber,
                        branchId: this.clockingEntry.branchId ,
                        departmentId: this.clockingEntry.departmentId},
                    config: { headers: {'Authorization': "bearer " + localStorage.token}}     
                })
                .then((response) => 
                this.clockingSuccesful(response)
                )
                .catch(
                    this.clockingFailed()
                )
            },
            clockingSuccesful(response){
                this.toHome();
            },
            clockingFailed(){
                this.alert("Er is een probleem met ");
            },
            toHome(){
            console.log("going home");
            this.$goto('dashboard');
        },
            alert(message) {
                return alert({
                title: "Test message",
                okButtonText: "OK",
                message: message
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
        margin-left: 30;
        margin-right: 30;
        flex-grow: 2;
        vertical-align: middle;
    }

    .logo {
        margin-bottom: 12;
        height: 90;
        font-weight: bold;
    }

    .header {
        horizontal-align: center;
        font-size: 25;
        font-weight: 600;
        margin-bottom: 70;
        text-align: center;
        color: #00A2D3;
    }

    .input-field {
        margin-bottom: 25;
    }

    .input {
        font-size: 18;
        placeholder-color: #A8A8A8;
    }

    .input-field .input {
        font-size: 54;
    }

    .btn-primary {
        height: 50;
        margin: 30 5 15 5;
        background-color: #00A2D3;
        border-radius: 5;
        font-size: 20;
        font-weight: 600;
    }

    .login-label {
        horizontal-align: center;
        color: #A8A8A8;
        font-size: 16;
    }

    .sign-up-label {
        margin-bottom: 20;
    }

    .bold {
        color: #000000;
    }
</style>