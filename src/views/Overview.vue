<template>
    <div class="mainDiv">
        <link href='https://fonts.googleapis.com/css?family=Roboto' rel="stylesheet">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css">

        <div class="formBox">
            <h2 class="titleMain">Uren overzicht</h2>

            <div class="overviewDiv">
                <select id="overviewFilter" @change="changeFilter()" >
					<option value="" disabled selected hidden>Filter op...</option>
                    <option value="1">Werknemersnummer</option>
                    <option value="2">Achternaam</option>
                    <option value="3">Datum</option>
                </select>

                <input class="overviewInput" id='overviewInput' type="text" v-model.lazy="input" v-show="isInputVisible" placeholder="" name="filterInput" /><br>
                <input class="overviewInput" type="date" v-model="beginTime" v-show="isDateVisible" placeholder="Begintijd" name="Begintijd"/>
                <input class="overviewInput" type="date" v-model="endTime" v-show="isDateVisible" placeholder="Eindtijd" name="Eindtijd"/>

                <button class="submitBtn" v-on:click="filter()">Filter</button>
				<p class="errorMsg" v-if="error">{{ errorMessage }}</p>

                    <table border="1" class="overviewTable">
                        <tr>
                            <th>Werknemersnr.</th>
                            <th>Achternaam</th>
                            <th>Starttijd</th>
                            <th>Eindtijd</th>
<!--                            <th>Start pauze</th>-->
<!--                            <th>Eind pauze</th>-->
                        </tr>
						<!-- Error below is not important -->
                        <tr v-for="item in items">
                            <td>{{ item.userNumber }}</td>
                            <td>{{ item.lastName }}</td>
                            <td>{{ item.beginTime }}</td>
                            <td>{{ item.endTime }}</td>
                        </tr>
                    </table>
            </div>
        </div>

        <div class="buttons">
            <button class="buttonLogOut" v-on:click="logout()"><i class="fas fa-sign-out-alt"></i></button>
        </div>

        <div class="buttons">
            <button class="buttonBack" v-on:click="back()"><i class="fas fa-arrow-alt-circle-left"></i></button>
        </div>

    </div>
</template>

<script>
    import axios from 'axios';
	import { mapGetters } from 'vuex';
	import rs from '../api/RequestService'

    const { VUE_APP_MODE, VUE_APP_PLATFORM } = process.env;

    export default {
        name: "Overview",
		data() {
            return {
                input: "",
                beginTime: null,
                endTime: null,
				error: false,
            	errorMessage: "",
                isInputVisible: false,
                isDateVisible: false,
            	items: []
            	}
        },
		computed: {
            ...mapGetters({ currentUser: 'currentUser' })
        },
        methods: {
            filter() {
                let select = document.getElementById("overviewFilter");
                let selectType = select.options[select.selectedIndex].value;

                if(selectType == 3){
                    if(this.beginTime != null && this.endTime != null){
                        let promise = rs.getUserClockOverviewByDate(this.beginTime, this.endTime);
                        promise.then(response => this.loadItems(response.data))
                            .catch((error) => this.showErrorMessage("Data ophalen mislukt!", true));
                    }else{
                        this.showErrorMessage("Voer een begin- en einddatum in!", true);
                    }
                }else if(selectType == 1){
                    if(this.input != ""){
                        let promise = rs.getUserClockOverviewByUserNumber(this.input);
                        promise.then(response => this.loadItems(response.data))
                            .catch((error) => this.showErrorMessage("Geen data gevonden!", true));
                    }else{
                        this.showErrorMessage("Voer iets in!", true);
                    }

                }else if(selectType == 2){
                    if(this.input != ""){
                        let promise = rs.getUserClockOverviewByLastName(this.input);
                        promise.then(response => this.loadItems(response.data))
                            .catch((error) => this.showErrorMessage("Geen data gevonden!", true));
                    }else{
                        this.showErrorMessage("Voer iets in!", true);
                    }
                }
			},
            changeFilter(){
                let select = document.getElementById("overviewFilter");
                let selectType = select.options[select.selectedIndex].value;

                if(selectType == 3){
                    this.isDateVisible = true;
                    this.isInputVisible = false;
                }else if(selectType == 1 || selectType == 2){
                   this.isDateVisible = false;
                   this.isInputVisible = true;
                }
            },
			addItem(object){
                this.items.push(JSON.parse(JSON.stringify(object)));
            },
			loadItems(data){
                this.items = [];
                this.showErrorMessage("", false);
				let clockEntries = data.clockEntries;

				for(var i = 0; i < clockEntries.length; i++){
					let object = {
                		userNumber: data.userNumber,
                		lastName: data.lastName,
                		beginTime: "",
						endTime: ""
					};
					let beginTime = new Date(clockEntries[i].beginTime);
					let endTime = new Date(clockEntries[i].endTime);
					object.beginTime = beginTime.toLocaleString();
					object.endTime = endTime.toLocaleString();

					this.addItem(object);
				}
			},
			// Shows error message with text of parameter string if parameter status is true
            showErrorMessage(string, status) {
                this.errorMessage = string;
                this.error = status;
            },
            logout() {
                this.$router.push('/logout');
            },
            back() {
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

    /* overview Div */
    .overviewDiv {
        text-align: center;
        flex-grow: 2;
        vertical-align: middle;
    }

    /* Form div */
    .formBox {
        width: 800px;
        height: 400px;
        background: #fff;
        border-radius: 15px;
        overflow-y: auto;
        margin: 0 auto 0 auto;
        padding:0px 0px 20px 0px;
        box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);
    }

    /* Main title */
    .titleMain{
        font-family: "Helvetica Neue", "Helvetica Neue Light", Helvetica;
        font-size: 28px;
        text-align: center;
        margin-bottom: 5px;
        margin-top: 30px;
        color: #676A6C;
    }

    /* Select options styling */
    select {
        font-family: "Roboto";
        color: #676A6C;
        width: 180px;
        font-size: 16px;
        margin-top: 20px;
        margin-right: 5px;
        margin-left: 50px;
        outline: none;
        border: none;
        border-bottom: 1px solid #00A0D1;
        cursor: pointer;
        float: left;
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

    /* Input fields */
    input[type=text] {
        width: 200px;
        font-family: "Roboto";
        color: #676A6C;
        font-size: 16px;
        margin-top: 20px;
        float: left;
        box-sizing: border-box;
        border: none;
        border-bottom: 1px solid #00A0D1;
        background: transparent;
    }
    input[type=date]{
        width: 150px;
        font-family: "Roboto";
        color: #676A6C;
        font-size: 16px;
        margin-right: 5px;
        float: left;
        box-sizing: border-box;
        border: none;
        border-bottom: 1px solid #00A0D1;
        background: transparent;
    }
    input:focus{
        outline: none;
    }

    /* Filter button style */
    .submitBtn{
        font-family: "Roboto";
        font-size: 13px;
        background-color: #00A0D1;
        border: 4px solid #00A0D1;
        border-radius: 5px;
        display: inline-block;
        width: 70px;
        margin-top: 10px;
        margin-bottom: 10px;
        margin-left: 15px;
        float: left;
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
    .submitBtn:hover {
        background-color: #00799e;
        border: 4px solid #00799e;
    }
    .submitBtn:active {
        transform: scale(.95);
    }

    /* Overview table styling */
    .overviewTable {
        font-family: "Roboto";
        margin-top: 10px;
        border-collapse: collapse;
        width: 100%;
        border-top: none;
    }
    th {
        background-color: #00A0D1;
        color: white;
        text-align: left;
        height: 40px;
        padding-left: 5px;
        border-bottom: 1px solid #ddd;
        border-left: none;
        border-right: none;
    }
    td {
        text-align: left;
        padding-left: 5px;
        height: 40px;
        border-bottom: 1px solid #ddd;
        border-left: none;
        border-right: none;
    }
    tr:hover {
        background-color: #676a6c;
        color: white;
    }

    /* table inner div */
    .tableDiv{
        /*overflow-y:scroll;*/
        /*width: 100%;*/
    }

    /* Log out button */
    .buttonLogOut {
        font-family: "Roboto";
        position:absolute;
        top: -15px;
        right: 0;
        font-size: 25px;
        background-color: #676a6c;
        padding: 10px;
        border: 4px solid #676a6c;
        border-radius: 5px;
        display: inline-block;
        width: 60px;
        margin-right: 5px;
        color: white;
        text-align: center;
        text-decoration: none;
        cursor: pointer;
        outline: none;
        transition: transform 0.3s;
        transition: 0.5s;
        z-index: 1;
        box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
        0 17px 50px 0 rgba(0, 0, 0, 0.19);
    }
    .buttonLogOut:hover {
        background-color: #4b4d4f;
        border: 4px solid #4b4d4f;
        transform: scale(0.85);
        transition: 0.5s;
        font-size: 27px;
    }
    .buttonLogOut:after {
        z-index: -1;
    }
    .buttonLogOut:active {
        transform: scale(0.95);
    }

    /* Back button */
    .buttonBack {
        font-family: "Roboto";
        position:absolute;
        top: 60px;
        right: 0;
        font-size: 25px;
        background-color: #676a6c;
        padding: 10px;
        border: 4px solid #676a6c;
        border-radius: 5px;
        display: inline-block;
        width: 60px;
        margin-right: 5px;
        color: white;
        text-align: center;
        text-decoration: none;
        cursor: pointer;
        outline: none;
        transition: transform 0.3s;
        transition: 0.5s;
        z-index: 1;
        box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
        0 17px 50px 0 rgba(0, 0, 0, 0.19);
    }
    .buttonBack:hover {
        background-color: #4b4d4f;
        border: 4px solid #4b4d4f;
        transform: scale(0.85);
        transition: 0.5s;
        font-size: 27px;
    }
    .buttonBack:after {
        z-index: -1;
    }
    .buttonBack:active {
        transform: scale(0.95);
    }

    .errorMsg {
        font-family: Roboto;
        font-weight: bold;
        font-size: 11px;
        margin-top: 10px;
        margin-bottom: 0px;
        color: red;
    }

</style>
