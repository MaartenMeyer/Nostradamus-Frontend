<template>
    <Page actionBarHidden="false" backgroundSpanUnderStatusBar="true">
        <ActionBar class="action-bar">
            <Label class="action-bar-title" text="Pauze"></Label>
        </ActionBar>
        <FlexboxLayout class="page" verticalAlignment="center">
            <TextField class="input" hint="Personeels nummer" keyboardType="number"
                style="width:75%;" fontSize="18" v-model="personNumber" />
            <Button :text="'Pauze'" @tap="clickValidatePause" class="btn btn-primary m-t-20" />
        </FlexboxLayout>
    </Page>    
</template>

<script>
    import axios from "axios/index"
    import HomePage from "./Dashboard";
    import { request } from 'http';
    import { mapGetters } from 'vuex';
    import 'nativescript-localstorage';    

    export default {
        name: "Break.native",
        data(){
            return {
                props:[currentUser]
            };
        },
    methods: {
        clickValidatePause() {
            if (this.personNumber == null) {
                this.alert("Er is geen personeelsnummer ingevoerd.");
            } else {
                this.clickStartPause();
            }
        },
        clickStartPause() {
                console.log("pause");
                this.alert(this.personNumber + " is het personeels nummer.");
                axios({
                    method: 'post',
                    url: 'http://145.49.8.169:3000/api/clocking',
                    data: { userNumber: this.currentUser.userNumber },
                    config: { headers: {'Authorization': "bearer " + localStorage.token}}
                })
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
            return confirm({
                title: "Test message",
                okButtonText: "OK",
                message: message
            });
        }
    }
}

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