<template>
    <Page actionBarHidden="false" backgroundSpanUnderStatusBar="true">
        <ActionBar class="action-bar">
            <Label class="action-bar-title" text="In / Uit klokken"></Label>
        </ActionBar>
        <FlexboxLayout class="page" verticalAlignment="center">
            <TextField :class="input" @textChange="changeNumber" hint="Personeels nummer"
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
    import axios from "axios/index"
    import { request } from 'http';
    import { mapGetters } from 'vuex';
    import 'nativescript-localstorage';

    export default {
        name: "Clock.native",
        data() {
            return {
                listBranch: [
                    "Locatie",
                    "Breda",
                    "Amsterdam",
                    "Rotterdam",
                    "Bergen op Zoom"
                ],
                listDepartment: ["Afdeling", "DKW", "Kassa", "Magazijn", "AGF"],
                selectedItemBranch: 0,
                selectedItemDepartment: 0,
                personNumber: null,
                displayDepartment: 0,
                displayBranch: 0,
                displayButton: 0
            };
    },
    methods: {
            changeBranch() {
                if (this.selectedItemBranch != 0) {
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
                this.alert(
                    this.personNumber +
                    " is het personeels nummer." +
                    "\n" +
                    this.listBranch[this.selectedItemBranch] +
                    " is de locatie." +
                    "\n" +
                    this.listDepartment[this.selectedItemDepartment] +
                    " is de afdeling."
                );
                axios({
                    method: 'post',
                    url: 'http://145.49.8.169:3000/api/clocking',
                    data: { userNumber: this.currentUser.userNumber },
                    config: { headers: {'Authorization': "bearer " + localStorage.token}}     
                });
                this.toHome();
            },
            toHome(){
            console.log("going home");
            this.$navigateTo(HomePage, {
                props: {
                    currentUser
                },
                animated: true,
                transition: {
                    name: "slideTop",
                    duration: 380,
                    curve: "easeIn"
                }
            });
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