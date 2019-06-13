<template>
    <Page actionBarHidden="false" backgroundSpanUnderStatusBar="true">
        <ActionBar class="action-bar">
            <Label class="action-bar-title" text="In/Uit Klokken"></Label>
        </ActionBar>
        <FlexboxLayout class="page" verticalAlignment="center">
            <TextField :class="input" @textChange="changeNumber" hint="Werknemersnummer"
                keyboardType="number" style="width:75%;" fontSize="18"
                v-model="personNumber" />
            <ListPicker v-if="displayBranch" :items="listBranch"
                @selectedIndexChange="changeBranch" v-model="selectedItemBranch"
                style="width:75%;" />
            <ListPicker v-if="displayDepartment" :items="listDepartment"
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
                let jsonObject = JSON.parse(localStorage.getItem('company').branches);
                let branchList = this.listBranch;
                for(var i in jsonObject){
                    branchList.push([i, jsonObject[i]])
                }
            },
            getDepartmentData(){

            },
            changeBranch() {
                if (this.selectedItemBranch != 0) {
                    //this.getDepartmentData();
                    this.displayDepartment = 1;
                }
            },
            changeDepartment() {
                if (this.selectedItemDepartment != 0) {
                    this.displayButton = 1;
                }
            },
            changeNumber() {
                if (this.personNumber != null) {
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
                    data: { userNumber: this.currentUser.userNumber },
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
</style>