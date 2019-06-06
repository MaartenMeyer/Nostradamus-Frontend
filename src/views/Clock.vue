<template web>
    <div class="mainDiv">
        <link href='https://fonts.googleapis.com/css?family=Roboto' rel="stylesheet">

        <div class="formBox">

            <h2 class="welcome1">Voer je gegevens in:</h2>

            <div class="loginDiv">
                <input class="clockInput" type="text" v-model="input.userNumber" placeholder="Werknemersnummer" name="Werknemersnr"/><br>

                <div class="optionsDiv">
                    <select required id='selectBranch' @change="addDepartmentOptions()">
                        <option value="" disabled selected hidden>Selecteer je locatie</option>
                    </select>
                </div>

                <div class="optionsDiv">
                    <select required id='selectDepartment'>
                        <option value="" hidden>Selecteer je afdeling</option>
                    </select>
                </div>

                <p class="errorMsg" v-if="error">{{ errorMessage }}</p>

                <div class="buttonsDiv">
                    <button type="button" class="submitBtn" v-on:click="clock()"><span>Klokken</span></button>
                </div>
                <div class="buttonsDiv">
                    <button type="button" class="buttonCancel" v-on:click="cancel()"><span>Annuleer</span></button>
                </div>

            </div>
            <modal id="modal" v-show="isModalVisible" @close="closeModal()"/>
        </div>
    </div>
</template>

<script>
    import axios from "axios"
    import { mapGetters } from 'vuex'
    import modal from './Modal.vue';
    import idbs from '../api/indexedDBService'

    const { VUE_APP_MODE, VUE_APP_PLATFORM } = process.env;

    export default {
        name: 'Clock',
        components: {
            modal,
        },
        data() {
            return {
                input: {
                    userNumber: ""
                },
                error: false,
                errorMessage: "",
                isModalVisible: false
            }
        },
        computed: {
            ...mapGetters({ currentUser: 'currentUser' })
        },
        mounted(){
            this.addBranchOptions();
        },
        methods: {
            // Adds branches to options of selectBranch select element
            addBranchOptions(){
                let jsonObj = JSON.parse(localStorage.getItem('company'));
                let branches = jsonObj.branches;

                // Creates and inserts new options from the array branches into the selectBranch options list
                let optionsAsString = "";
                for(var i = 0; i < branches.length; i++) {
                    optionsAsString += "<option value='" + branches[i].branchId + "'>" + branches[i].branchName + "</option>";
                }
                $('#selectBranch').append( optionsAsString );
            },
            // Adds departments to options of selectDepartment select element
            addDepartmentOptions(){
                // Clears select department options list on select branch change
                let s = document.getElementById("selectDepartment");
                for(i = s.options.length - 1 ; i >= 1 ; i--){
                        s.remove(i);
                }

                let jsonObj = JSON.parse(localStorage.getItem('company'));
                let branches = jsonObj.branches;

                let select = document.getElementById("selectBranch");
                let branchId = select.options[select.selectedIndex].value;

                // Function to find an department element in the branches array
                function findElement(arr, propName, propValue) {
                    for (var i=0; i < arr.length; i++)
                        if (arr[i][propName] == propValue){
                            return arr[i];
                    }
                }

                let branch = findElement(branches, "branchId", branchId);
                let departments = branch.departments;

                // Creates and inserts new options from the array departments into the selectDepartment options list
                let optionsAsString = "";
                for(var i = 0; i < departments.length; i++) {
                    optionsAsString += "<option value='" + departments[i].departmentId + "'>" + departments[i].departmentName + "</option>";
                }
                $('#selectDepartment').append( optionsAsString );
            },
            clock(){
                // Get values of selectBranch and selectDepartment components
                let branch = document.getElementById("selectBranch");
                let branchId = branch.options[branch.selectedIndex].value;
                let department = document.getElementById("selectDepartment");
                let departmentId = department.options[department.selectedIndex].value;

                // Lines to get the current time in the format the database requires
                // var today = new Date();
                // var date = today.getFullYear()+'-'+(("0" + (today.getMonth()+1)).slice(-2))+'-'+("0" + today.getDate()).slice(-2);
                // var time = ("0" + today.getHours()).slice(-2) + ":" + ("0" + today.getMinutes()).slice(-2) + ":" + ("0" + today.getSeconds()).slice(-2);
                // var dateTime = date+' '+time;

                // Checks if default values have been changed / if user has selected options for both branch and department
                if(branchId != "" && departmentId != "" && this.input.userNumber != ""){
                    axios({
                    method: 'post',
                    url: 'http://127.0.0.1:3000/api/clocking',
                    data: { userNumber: this.input.userNumber, branchId: branchId, departmentId: departmentId },
                    headers: {'Authorization': "bearer " + this.$cookie.get('access-token')}})
                    .then(request => this.clockInSuccessful(request))
                    .catch((error) => {
                        if(error.response){
                            if(error.response.status == 500){
                                this.clockInFailed("Medewerkersnummer bestaat niet!");
                            }else{
                                console.log(error.response);
                            }
                        } else if (error.request.status == 0){
                            // Switch to indexedDB storage
                            let clockEntry = {
                                userNumber: "",
                                branchId: "",
                                departmentId: "",
                                startTime: null,
                                endTime: null
                            }
                            clockEntry.userNumber = this.input.userNumber;
                            clockEntry.branchId = branchId;
                            clockEntry.departmentId = departmentId;

                            var object = JSON.parse(JSON.stringify(clockEntry));

                            idbs.saveToDatabase("clockingEntries", object);
                            this.showModal("Geklokt!")
                        }
                    });
                }else{
                    this.clockInFailed("Invoer is nog niet compleet!");
                }
            },
            cancel(){
                this.$router.push('/dashboard');
            },
            clockInSuccessful(object){
                console.log(object);

                let branch = document.getElementById("selectBranch");
                let branchId = branch.options[branch.selectedIndex].text;
                let department = document.getElementById("selectDepartment");
                let departmentId = department.options[department.selectedIndex].text;
                let date = new Date();
                let time = ('0' + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);

                if (object.data.message === "User is clocked in."){
                    this.showModal("Je bent ingeklokt met werknemersnummer " + this.input.userNumber + " op locatie " + branchId + " op afdeling " + departmentId + ", Begintijd " + time + ", fijne dienst!");
                } else if (object.data.message === "User is clocked off."){
                    this.showModal("Hallo " + this.input.userNumber + ", je bent uitgeklokt!")
                }
            },
            clockInFailed(string){
                this.errorMessage = string;
                this.error = true;
            },
            showModal(string) {
                $("#modalDescription").html(string);
                this.isModalVisible = true;
            },
            closeModal() {
                this.isModalVisible = false;
                this.$router.push('/dashboard');
            }
        }
    }
</script>

<style scoped>
    .mainDiv {
        width: 100%;
        min-height: 100vh;
        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        position: relative;
        z-index: 1;
    }

    /* Form div */
    .formBox {
        width: 450px;
        height: 450px;
        background: #fff;
        border-radius: 15px;
        overflow: hidden;
        margin: 0 auto 0 auto;
        padding:0px 0px 20px 0px;
        box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);
    }

    /* login Div */
    .loginDiv{
        text-align: center;
        flex-grow: 2;
        vertical-align: middle;
    }

    /* Welcome 1 and 2 */
    .welcome1{
        font-family: "Helvetica Neue", "Helvetica Neue Light", Helvetica;
        font-size: 28px;
        text-align: center;
        margin-top: 30px;
        margin-bottom: 30px;
        color: #676A6C;
    }

    /* Input fields */
    input[type=text] {
        width: 300px;
        font-family: "Roboto";
        font-size: 16px;
        color: #676A6C;
        padding: 0px 5px;
        box-sizing: border-box;
        border: none;
        border-bottom: 1px solid #00A0D1;
        background: transparent;
    }
    input:focus{
        outline: none;
    }

    select{
        font-family: "Roboto";
        color: #676A6C;
        width: 300px;
        font-size: 16px;
        margin-top: 20px;
        margin-left: 20px;
        margin-right: 20px;
        outline: none;
        border: none;
        border-bottom: 1px solid #00A0D1;
        cursor: pointer;
    }
    select:focus {
        border: none;
        border-bottom: 1px solid #00A0D1;
        cursor: pointer;
    }
    select:hover{
        border: none;
        border-bottom: 1px solid #00A0D1;
        cursor: pointer;
    }

    .optionsDiv {
        position: relative;
        display: block;
        text-align: center;
    }

    .buttonsDiv{
        text-align: center;
        flex-grow: 2;
        vertical-align: middle;
        margin-top: 10px;
    }

    /* Login button style */
    .submitBtn{
        font-family: "Roboto";
        font-size: 21px;
        background-color: #00A0D1;
        padding: 20px;
        border: 4px solid #00A0D1;
        border-radius: 5px;
        display: inline-block;
        width: 150px;
        margin-top: 20px;
        margin-bottom: 10px;
        color: white;
        text-align: center;
        text-decoration: none;
        cursor: pointer;
        outline: none;
        position: relative;
        transition: transform 0.3s;
        transition: 0.5s;
        z-index: 1;
    }
    .submitBtn:after {
        content: '»';
        position: absolute;
        opacity: 0;
        right: -20px;
        transition: 0.5s;
    }
    .submitBtn:hover{
        background-color: #00799e;
        border: 4px solid #00799e;
        padding-right: 24px;
        padding-left:8px;
    }
    .submitBtn:hover:after {
        opacity: 1;
        right: 10px;
    }
    .submitBtn:active {
        transform: scale(.95);
    }

    .buttonCancel {
        font-family: "Roboto";
        font-size: 21px;
        background-color: #676A6C;
        padding: 20px;
        border: 4px solid #676A6C;
        border-radius: 5px;
        display: inline-block;
        width: 150px;
        margin-top: 20px;
        margin-bottom: 10px;
        color: white;
        text-align: center;
        text-decoration: none;
        cursor: pointer;
        outline: none;
        position: relative;
        transition: transform 0.25s;
        transition: 0.5s;
        z-index: 1;
    }
    .buttonCancel:after {
        content: '»';
        position: absolute;
        opacity: 0;
        right: -20px;
        transition: 0.5s;
    }
    .buttonCancel:hover{
        background-color: #4b4d4f;
        border: 4px solid #4b4d4f;
        padding-right: 24px;
        padding-left:8px;
    }
    .buttonCancel:hover:after {
        opacity: 1;
        right: 10px;
    }
    .buttonCancel:active {
        transform: scale(.95);
    }

    .errorMsg{
        font-family: Roboto;
        font-weight: bold;
        font-size: 11px;
        margin-top: 10px;
        margin-bottom: 0px;
        color: red;
    }

</style>