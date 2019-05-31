<template web>
    <div class="mainDiv">
        <link href='https://fonts.googleapis.com/css?family=Roboto' rel="stylesheet">

        <div class="formBox">

            <h2 class="welcome1">Voer je gegevens in:</h2>

            <div class="loginDiv">
                <input class="clockInput" type="text" v-model="input.userNumber" placeholder="Werknemersnummer" name="Werknemersnr"/><br>

                <select required id='selectBranch' @change="addDepartmentOptions()">
                    <option value="" disabled selected hidden>Selecteer je locatie</option>
                </select>

                <select required id='selectDepartment'>
                    <option value="" hidden>Selecteer je afdeling</option>
                </select>

                <p class="errorMsg" v-if="error">Invoer is nog niet compleet!</p>

                <div class="buttonsDiv">
                    <button type="button" class="submitBtn" v-on:click="clock()"><span>Klokken</span></button>
                </div>
                <div class="buttonsDiv">
                    <button type="button" class="submitBtn" v-on:click="cancel()"><span>Annuleer</span></button>
                </div>

            </div>

        </div>
    </div>
</template>

<script>
    import axios from "axios"
    import { mapGetters } from 'vuex'

    const { VUE_APP_MODE, VUE_APP_PLATFORM } = process.env;

    export default {
        name: 'Clock',
        data() {
            return {
                input: {
                    userNumber: ""
                },
                error: false
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
                var jsonObj = JSON.parse(localStorage.getItem('company'));
                var branches = jsonObj.branches;

                // Creates and inserts new options from the array branches into the selectBranch options list
                var optionsAsString = "";
                for(var i = 0; i < branches.length; i++) {
                    optionsAsString += "<option value='" + branches[i].branchId + "'>" + branches[i].branchName + "</option>";
                }
                $('#selectBranch').append( optionsAsString );
            },
            // Adds departments to options of selectDepartment select element
            addDepartmentOptions(){
                // Clears select department options list on select branch change
                var s = document.getElementById("selectDepartment");
                for(i = s.options.length - 1 ; i >= 1 ; i--){
                        s.remove(i);
                }

                var jsonObj = JSON.parse(localStorage.getItem('company'));
                var branches = jsonObj.branches;

                var select = document.getElementById("selectBranch");
                var branchId = select.options[select.selectedIndex].value;

                // Function to find an department element in the branches array
                function findElement(arr, propName, propValue) {
                    for (var i=0; i < arr.length; i++)
                        if (arr[i][propName] == propValue){
                            return arr[i];
                    }
                }

                var branch = findElement(branches, "branchId", branchId);
                var departments = branch.departments;

                // Creates and inserts new options from the array departments into the selectDepartment options list
                var optionsAsString = "";
                for(var i = 0; i < departments.length; i++) {
                    optionsAsString += "<option value='" + departments[i].departmentId + "'>" + departments[i].departmentName + "</option>";
                }
                $('#selectDepartment').append( optionsAsString );
            },
            clock(){
                // Get values of selectBranch and selectDepartment components
                var branch = document.getElementById("selectBranch");
                var branchId = branch.options[branch.selectedIndex].value;
                var department = document.getElementById("selectDepartment");
                var departmentId = department.options[department.selectedIndex].value;

                // Checks if default values have been changed / if user has selected options for both branch and department
                if(branchId != "" && departmentId != ""){
                    axios({
                    method: 'post',
                    url: 'http://127.0.0.1:3000/api/clocking',
                    data: { userNumber: this.input.userNumber, branchId: branchId, departmentId: departmentId },
                    headers: {'Authorization': "bearer " + localStorage.token}})
                    .then(request => this.clockInSuccessful(request))
                    .catch(() => this.clockInFailed());
                }else{
                    this.error = true;
                }

            },
            cancel(){
                this.$router.push('/dashboard');
            },
            clockInSuccessful(){
                this.$router.push('/dashboard');
            },
            clockInFailed(){
                this.error = true;
            },
            logout(){
                this.$router.push('/logout');
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
        padding: 12px 20px;
        margin: 8px 0;
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
        transition: 0.5s;
        box-shadow: 0 10px 20px -8px rgba(0, 0, 0,.7);
    }
    .submitBtn:after {
        content: '»';
        position: absolute;
        opacity: 0;
        right: -20px;
        transition: 0.5s;
    }
    .submitBtn:hover{
        border-radius: 50px;
        padding-right: 24px;
        padding-left:8px;
    }
    .submitBtn:hover:after {
        opacity: 1;
        right: 10px;
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