<template>
    <Page actionBarHidden="false" backgroundSpanUnderStatusBar="true">
        <ActionBar class="action-bar">
            <Label class="action-bar-title" text="In/Uit Klokken"></Label>
        </ActionBar>
        <FlexboxLayout class="page" verticalAlignment="center">
            <StackLayout class="invoer">
                <Label class="action" text="Voer je gegevens in:"></Label>
            </StackLayout>

            <TextField class="input" @textChange="changeNumber" hint="Werknemersnummer"
                keyboardType="number"
                v-model="personNumber" />
            <ListPicker v-if="displayBranch" :items="listBranch"
                @selectedIndexChange="changeBranch" v-model="selectedItemBranch"
                style="width:75%;" />
            <ListPicker v-if="displayDepartment" :items="listDepartment"
                @selectedIndexChange="changeDepartment" v-model="selectedItemDepartment"
                style="width:75%;" disabled="true" />
            <Button v-if="displayButton" :text="'Klokken'" @tap="clickClockingValidate"
                class="button" />
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
                    this.alert("Er is geen werknemersnummer ingevoerd.");
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

    .invoer {
        margin-left: 30;
        margin-right: 30;
        margin-bottom: 100;
        flex-grow: 2;
    }

    .action{
        font-family: "Helvetica Neue", "Helvetica Neue Light", Helvetica;
        font-weight: bold;
        font-size: 28px;
        text-align: center;
        margin-top: 30px;
        margin-bottom: 80px;
        color: #676A6C;
    }

    .input {
        font-size: 20px;
        placeholder-color: #A8A8A8;
    }

    .input-field .input {
        font-size: 20px;
    }

    .button {
        height: 50;
        margin: 30 5 15 5;
        background-color: #00A0D1;
        border-radius: 10px;
        font-size: 20px;
        margin-top: 60;
        margin-bottom: 30px;
        color: white;
    }
</style>