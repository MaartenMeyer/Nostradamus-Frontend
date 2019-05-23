<template>
    <Page actionBarHidden="false" backgroundSpanUnderStatusBar="true">
        <FlexboxLayout class="page">
            <Label text="Welcome to the new page" />
            <Button text="Log out" @tap="clickLogout" />
        </FlexboxLayout>
    </Page>
</template>

<script>
    import LoginPage from "./login.native";

    export default {
        data() {
            return {};
        },
        methods: {
            clickLogout() {
                this.$navigateTo(LoginPage, {
                    props: {},
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
                    title: "Oops",
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