<template web>
    <div class="mainDiv">
        <link href='https://fonts.googleapis.com/css?family=Roboto' rel="stylesheet">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css">

        <div class="formBox">

            <h2 class="titleMain">Voer je gegevens in:</h2>

            <div class="clockDiv">
                <input class="clockInput" id='clockInput' type="text" v-model.lazy="userNumber" v-debounce="delay" placeholder="Werknemersnummer" name="Werknemersnr" /><br>

                <div class="optionsDiv">
                    <select required id='selectBranch' style='visibility:hidden' @change="addDepartmentOptions()">
                        <option value="" disabled selected hidden>Selecteer je locatie</option>
                    </select>
                </div>

                <div class="optionsDiv">
                    <select required id='selectDepartment' style='visibility:hidden'>
                        <option value="" hidden>Selecteer je afdeling</option>
                    </select>
                </div>

                <p class="errorMsg" v-if="error">{{ errorMessage }}</p>

                <div class="buttonsDiv">
                    <button type="button" class="submitBtn" id='submitButton' :disabled="disabled" v-on:click="clock()"><span>Klokken</span></button>
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
    import { mapGetters } from 'vuex'
    import modal from './Modal.vue';
    import idbs from '../api/indexedDBService'
    import debounce from 'v-debounce'
    import rs from '../api/RequestService'
    import VueTouchKeyboard from "vue-touch-keyboard";
    import style from "../styles/vue-touch-keyboard.css";

    const { VUE_APP_MODE, VUE_APP_PLATFORM } = process.env;

    export default {
        name: 'Clock',
        components: {
            modal,
            "vue-touch-keyboard": VueTouchKeyboard.component,
        },
        data() {
            return {
                userNumber: "",
                error: false,
                errorMessage: "",
                isModalVisible: false,
                delay: 500,
                disabled: false,
                userNumbers: [],
                clockingEntry: {
                    userNumber: "",
                    branchId: "",
                    departmentId: "",
                    beginTime: ""
                }
            }
        },
        watch: {
            // Watches for changes to the userNumber input field with delay declared in data()
            userNumber () {
                this.checkUsernumberValidity();
            }
        },
        directives: {
            debounce
        },
        computed: {
            ...mapGetters({ currentUser: 'currentUser' })
        },
        mounted(){
            this.addBranchOptions();
            this.addUsersToArray();
        },
        methods: {
            // Gets userNumbers of company from storage and adds them to array userNumber for faster access
            addUsersToArray(){
                if(this.userNumbers.length == 0){
                    this.userNumbers = [];

                    let jsonObj = JSON.parse(localStorage.getItem('users'));
                    let users = jsonObj.users;

                    for(var i = 0; i < users.length; i++) {
                        this.userNumbers.push(users[i].userNumber)
                    }
                }
            },
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
            checkUsernumberValidity(){
                if(this.userNumbers.includes(parseInt(this.userNumber, 10))){
                    this.showErrorMessage("", false);
                    this.checkConnection(this.checkClockingStatus(""));
                }else{
                    if(this.userNumber != ""){
                        this.showErrorMessage("Medewerkersnummer ongeldig!", true);
                    }else{
                        this.showErrorMessage("", false);
                    }

                    this.clockingEntry.userNumber = "";
                    this.clockingEntry.branchId = "";
                    this.clockingEntry.departmentId = "";
                    this.clockingEntry.beginTime = "";
                    document.getElementById("submitButton").innerHTML="Klokken";
                    document.getElementById("selectBranch").style.visibility="hidden";
                    document.getElementById("selectDepartment").style.visibility="hidden";
                }
            },
            // Checks if user is clocked in
            checkClockingStatus(status){
                return (status) => {
                    console.info(status)
                    if(status == "online"){
                        // Checks if user is clocked in online
                        let promise = rs.getClockingStatus(this.userNumber, this.$cookie.get('access-token'));
                        promise.then(response => this.updateForm(response))
                               .catch(error => this.updateForm(error.response));

                    }else if(status == "offline"){
                        idbs.getAllFromDatabaseWithUserNumberWithoutEndtime("clockingEntries", this.userNumber, (items) =>{
                            // Creates an object in the same format as the response  required in updateForm()
                            let object = {
                                status: null,
                                data: {
                                    userNumber: "",
                                    branchId: "",
                                    departmentId: "",
                                    beginTime: null,
                                    endTime: null,
                                    synced: null
                                }
                            }
                            if(items.length > 0){
                                object.status = 200;
                                object.data.userNumber = items[0].userNumber;
                                object.data.branchId = items[0].branchId;
                                object.data.departmentId = items[0].departmentId;
                                object.data.beginTime = items[0].beginTime;
                                object.data.synced = items[0].synced;

                            }else{
                                object.status = 404;
                            }
                            this.updateForm(object);
                        });
                    }
                }
            },
            checkConnection(callback){
                let promise = rs.getConnectionStatus(this.$cookie.get('access-token'));
                promise.then(response => callback("online"))
                       .catch((error) => {
                            if(error.response){
                                if(error.response.status == 401){
                                    // User is unauthorized
                                }
                            }else if (error.request.status == 0){
                                callback("offline");
                            }
                        })
            },
            clock(){
                if(this.userNumber != ""){
                    // If userNumber is already clocked in, do this
                    if(this.clockingEntry.userNumber != ""){
                        let promise = rs.postClockingEntry(this.clockingEntry.userNumber, this.clockingEntry.branchId, this.clockingEntry.departmentId, this.$cookie.get('access-token'));
                        promise.then((response) => {
                                    this.saveClockEntryOffline(this.clockingEntry.userNumber, this.clockingEntry.branchId, this.clockingEntry.departmentId, true)
                                    this.clockInSuccessful(response);
                                })
                               .catch((error) => {
                                    if(error.response){
                                        if(error.response.status == 500){
                                            this.showErrorMessage("Medewerkersnummer bestaat niet!", true);
                                        }
                                    // If the server is unreachable, a network request error is returned
                                    }else if (error.request.status == 0){
                                        this.saveClockEntryOffline(this.clockingEntry.userNumber, this.clockingEntry.branchId, this.clockingEntry.departmentId, false);

                                        let date = new Date();
                                        let time = ('0' + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
                                        let t = new Date(this.clockingEntry.beginTime);
                                        let beginTime = ('0' + t.getHours()).slice(-2) + ":" + ("0" + t.getMinutes()).slice(-2);

                                        this.showModal("<b>Uitgeklokt!</b><br><br>Werknemersnummer: " + this.clockingEntry.userNumber + "<br>Begintijd: "+ beginTime + "<br>Eindtijd: "+ time + "<br><br><i>Je bent offline uitgeklokt</i>")
                                    }
                            })
                    // If user is not clocked in already, do this
                    }else{
                        let branch = document.getElementById("selectBranch")
                        let branchId = branch.options[branch.selectedIndex].value;
                        let department = document.getElementById("selectDepartment")
                        let departmentId = department.options[department.selectedIndex].value;

                        // Checks if default values have been changed / if user has selected options for both branch and department
                        if(branchId != "" && departmentId != "" && this.userNumber != ""){
                            let promise = rs.postClockingEntry(this.userNumber, branchId, departmentId, this.$cookie.get('access-token'));
                            promise.then((response) => {
                                        this.saveClockEntryOffline(this.userNumber, branchId, departmentId, true)
                                        this.clockInSuccessful(response);
                                    })
                                   .catch((error) => {
                                        // If the server returns an error response
                                        // Server returns 500 when userNumber is invalid after previous checks
                                        if(error.response){
                                            if(error.response.status == 500){
                                                this.showErrorMessage("Medewerkersnummer bestaat niet!", true);
                                            }
                                        // If the server is unreachable, a network request error is returned
                                        }else if(error.request.status == 0){
                                            this.saveClockEntryOffline(this.userNumber, branchId, departmentId, false);

                                            let date = new Date();
                                            let time = ('0' + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);

                                            this.showModal("<b>Ingeklokt!</b><br><br>Werknemersnummer: " + this.userNumber + "<br>Locatie: " + branchId + "<br>Afdeling: " + departmentId + "<br>Begintijd: " + time + "<br>Fijne dienst!<br><br><i>Je bent offline ingeklokt</i>");
                                        }
                                    })
                        }else {
                            this.showErrorMessage("Invoer is nog niet compleet!", true);
                        }
                    }
                }else{
                    this.showErrorMessage("Voer een medewerkersnummer in!", true);
                }
            },
            saveClockEntryOffline(userNumber, branchId, departmentId, synced){
                let clockEntry = {
                    userNumber: "",
                    branchId: "",
                    departmentId: "",
                    beginTime: null,
                    endTime: null,
                    synced: null
                }
                clockEntry.userNumber = userNumber;
                clockEntry.branchId = branchId;
                clockEntry.departmentId = departmentId;
                clockEntry.synced = synced;

                var object = JSON.parse(JSON.stringify(clockEntry));

                idbs.saveToDatabase("clockingEntries", object);
            },
            // Called when clock-in/out is successful
            // Parameter object is response from api call to api/clocking
            clockInSuccessful(object){
                let branch = document.getElementById("selectBranch");
                let branchId = branch.options[branch.selectedIndex].text;
                let department = document.getElementById("selectDepartment");
                let departmentId = department.options[department.selectedIndex].text;
                let date = new Date();
                // Formats beginTime to format hh:mm with leading zeros
                let time = ('0' + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);

                if (object.data.message === "User is clocked in."){
                    this.showModal("<b>Ingeklokt!</b><br><br>Werknemersnummer: " + this.userNumber + "<br>Locatie: " + branchId + "<br>Afdeling: " + departmentId + "<br>Begintijd: " + time + "<br>Fijne dienst!");
                } else if (object.data.message === "User is clocked off."){
                    let t = new Date(this.clockingEntry.beginTime);
                    // Formats beginTime to format hh:mm with leading zeros
                    let beginTime = ('0' + t.getHours()).slice(-2) + ":" + ("0" + t.getMinutes()).slice(-2);
                    this.showModal("<b>Uitgeklokt!</b><br><br>Werknemersnummer: " + this.userNumber + "<br>Begintijd: "+ beginTime + "<br>Eindtijd: "+ time)
                }
            },
            // Changes to dashboard view
            cancel(){
                this.$router.push('/dashboard');
            },
            // Sets visibility of elements to hidden or visible based on status of response
            // Updates current clockingEntry variables to response.data if status is 200
            // Resets current clockingEntry variables if status is 4040
            updateForm(response){
                if(response.status == 200){
                    this.clockingEntry.userNumber = response.data.userNumber;
                    this.clockingEntry.branchId = response.data.branchId;
                    this.clockingEntry.departmentId = response.data.departmentId;
                    this.clockingEntry.beginTime = response.data.beginTime;
                    document.getElementById("selectBranch").style.visibility="hidden";
                    document.getElementById("selectDepartment").style.visibility="hidden";
                    document.getElementById("submitButton").innerHTML="Uitklokken";
                }else if(response.status == 404){
                    this.clockingEntry.userNumber = "";
                    this.clockingEntry.branchId = "";
                    this.clockingEntry.departmentId = "";
                    this.clockingEntry.beginTime = "";
                    this.showErrorMessage("", false);
                    document.getElementById("selectBranch").style.visibility="visible";
                    document.getElementById("selectDepartment").style.visibility="visible";
                    document.getElementById("submitButton").innerHTML="Inklokken";
                }
            },
            // Shows error message with text of parameter string if parameter status is true
            showErrorMessage(string, status){
                this.errorMessage = string;
                this.error = status;
            },
            // Shows pop-up modal with text of parameter string
            showModal(string) {
                $("#modalDescription").html(string);
                this.isModalVisible = true;
            },
            // Closes pop-up modal and changes to dashboard view
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

    /* clock Div */
    .clockDiv {
        text-align: center;
        flex-grow: 2;
        vertical-align: middle;
    }

    /* Main title */
    .titleMain {
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
        padding: 6px 20px;
        box-sizing: border-box;
        border: none;
        border-bottom: 1px solid #00A0D1;
        background: transparent;
    }
    input:focus {
        outline: none;
    }

    select {
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
    select:hover {
        border: none;
        border-bottom: 1px solid #00A0D1;
        cursor: pointer;
    }

    .optionsDiv {
        position: relative;
        display: block;
        text-align: center;
    }

    .buttonsDiv {
        text-align: center;
        flex-grow: 2;
        vertical-align: middle;
        margin-top: 10px;
    }

    /* Login button style */
    .submitBtn {
        font-family: "Roboto";
        font-size: 21px;
        background-color: #00A0D1;
        padding: 20px;
        border: 4px solid #00A0D1;
        border-radius: 5px;
        display: inline-block;
        width: 150px;
        margin-top: 15px;
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
        font-family: "Font Awesome 5 Free";
        content: '\f0a9';
        font-weight: 900;
        position: absolute;
        opacity: 0;
        right: -20px;
        transition: 0.5s;
    }
    .submitBtn:hover {
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
        font-family: "Font Awesome 5 Free";
        content: '\f0a9';
        font-weight: 900;
        position: absolute;
        opacity: 0;
        right: -20px;
        transition: 0.5s;
    }
    .buttonCancel:hover {
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
        margin-top: 20px;
        margin-bottom: 0px;
        color: red;
    }

</style>