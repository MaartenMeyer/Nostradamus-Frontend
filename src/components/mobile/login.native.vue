<template>
    <Page>
        <FlexboxLayout class="page">
            <StackLayout class="form">
                <Image class="logo" src="~/images/logo.png" />
                <Label class="header" text="ClockSystem" />

                <StackLayout class="input-field" marginBottom="25">
                    <TextField class="input" hint="Email" keyboardType="email"
                        autocorrect="false" autocapitalizationType="none"
                        @returnPress="focusPassword" v-model="user.email"
                        returnKeyType="next" fontSize="18" />
                    <StackLayout class="hr-light" />
                </StackLayout>

                <StackLayout class="input-field" marginBottom="25">
                    <TextField ref="password" class="input" hint="Password"
                        secure="true" v-model="user.password" :returnKeyType="'done'"
                        fontSize="18" />
                    <StackLayout class="hr-light" />
                </StackLayout>

                <Button :text="'Log In'" @tap="submit" class="btn btn-primary m-t-20" />
            </StackLayout>


        </FlexboxLayout>
    </Page>
</template>

<script>
    const userService = {
        login(user) {
            return Promise.resolve(user);
        }
    };

    const HomePage = {
        template: `
	<Page>
		<Label class="m-20" textWrap="true" text="You have successfully authenticated. This is where you build your core application functionality."></Label>
	</Page>
	`
    };

    export default {
        data() {
            return {
                user: {
                    email: "",
                    password: ""
                }
            };
        },
        methods: {
            focusPassword() {
                this.$refs.password.nativeView.focus();
            },

            submit() {
                if (!this.user.email || !this.user.password) {
                    this.alert(
                        "Email en/of wachtwoord vergeten in te voeren.");
                    return;
                }
                this.validate();
            },
            validate() {
                // TODO: Check login data in database with an SQL statement.
                // Example: if email equal p give error (hacks.)
                // Else go to the login function. This will navigate to the HomePage.
                if (this.user.email == "p") {
                    this.alert("HACKS.");
                } else {
                    this.login();
                }
            },
            login() {
                userService
                    .login(this.user)
                    .then(() => {
                        this.$navigateTo(HomePage);
                    })
                    .catch(() => {
                        this.alert(
                            "Unfortunately we could not find your account."
                        );
                    });
            },
            alert(message) {
                return alert({
                    title: "Error",
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
        color: #D51A1A;
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
        background-color: #D51A1A;
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