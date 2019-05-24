<template web>
  <div>
        <h2>Welkom bij</h2>
        <h2>Nostradamus</h2>
        <form v-on:submit="login">
            <input type="text" name="email"/><br>
            <input type="password" name="password"/><br>
            <input type="submit" value="Login"/>
        </form>
    </div>
</template>

<template native>
  <Page actionBarHidden="true">
        <FlexboxLayout class="page">
            <StackLayout class="form">
                <Image class="logo" src="~/images/logos.png" />
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

  import axios from "axios"
  import Dashboard from "./views/Dashboard.vue";

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
            // CHECK DATA
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
                    this.$navigateTo(Dashboard, {
						                props: { },
                            animated: true,
                            transition: {
                                name: "slideTop",
                                duration: 380,
                                curve: "easeIn"
                            }
                        });
                    })
                    .catch(() => {
                        this.alert(
                            "Er ging iets mis met het verbinden van de applicatie."
                        );
                    });
        },
        alert(message) {
            return alert({
                title: "Oops",
                okButtonText: "OK",
                message: message
            });
        }
      // login: (e) => {
      //           e.preventDefault();
      //           let email = e.target.elements.email.value;
      //           let password = e.target.elements.password.value;

      //           let login = () => {
      //               let data = {
      //                   email: email,
      //                   password: password
      //               };

      //               axios.post("/api/login", data)
      //                   .then((response) => {
      //                       console.log("Logged in");
      //                       this.$router.push("/dashboard")
      //                   })
      //                   .catch((errors) => {
      //                       console.log("Cannot log in")
      //                   })
      //           };
      //           login();
      //       }
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
