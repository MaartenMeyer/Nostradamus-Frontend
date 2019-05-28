<template web>
  <div class="mainDiv">
      <link href='https://fonts.googleapis.com/css?family=Roboto' rel="stylesheet">

      <div class="formBox">

          <h2 class="welcome1">Welkom bij</h2>
          <h2 class="welcome2">Nostradamus</h2>

          <div class="loginDiv">
              <input class="loginInput" type="text" v-model="input.username" placeholder="Gebruikersnaam" name="email"/><br>
              <input class="loginInput" type="password" v-model="input.password" placeholder="Wachtwoord" name="password"/><br>
              <button type="button" class="submitBtn" v-on:click="login()"><span>Login</span></button>
          </div>

      </div>
    </div>
</template>

<script>

    import axios from "axios/index"
    import Dashboard from "./Dashboard.vue";

    export default {
        name: 'Login',
        data() {
            return {
                input: {
                    username: "",
                    password: ""
                }
            }
        },
        methods: {
            login() {
                if (this.input.username != "" && this.input.password != "") {
                    axios({
                        method: 'post',
                        url: 'http://127.0.0.1:3000/api/login',
                        data: { userName: this.input.username, password: this.input.password },
                        config: { headers: {'Content-Type': 'application/json' }}
                        })
                        .then(function (response) {
                            //handle success
                            this.router.push({path: '/dashboard'});
                            console.log(response);
                        })
                        .catch(function (response) {
                            //handle error
                            console.log(response);
                        });

                }
            }
        }
    }

// const userService = {
//         login(user) {
//             return Promise.resolve(user);
//         }
//     };
//
//   import axios from "axios"
//   import Dashboard from "./views/Dashboard.vue";
//   import router from "./router.js";
//
//   export default {
//     data() {
//       return {
//         user: {
//                     email: "test",
//                     password: "test"
//                 }
//       };
//     },
//     methods: {
//         focusPassword() {
//             this.$refs.password.nativeView.focus();
//         },
//
//         submit() {
//             if (!this.user.email || !this.user.password) {
//                 this.alert(
//                     "Email en/of wachtwoord vergeten in te voeren.");
//                 return;
//             }
//             this.validate();
//         },
//         validate() {
//             // CHECK DATA
//             if (this.user.email == "p") {
//                 this.alert("HACKS.");
//             } else {
//                 this.login();
//             }
//         },
//         login() {
//             userService
//                 .login(this.user)
//                 .then(() => {
//                     //console.log(errors);
//                     router.push("Dashboard")
//                     })
//                     .catch(() => {
//                         this.alert(
//                             "Er ging iets mis met het verbinden van de applicatie."
//                         );
//                     });
//         },
//         alert(message) {
//             return alert({
//                 title: "Oops",
//                 okButtonText: "OK",
//                 message: message
//             });
//         },
//       // login: (e) => {
//       //           e.preventDefault();
//       //           let email = e.target.elements.email.value;
//       //           let password = e.target.elements.password.value;
//       //
//       //           let login = () => {
//       //               let data = {
//       //                   email: email,
//       //                   password: password
//       //               };
//       //
//       //               axios.post("/api/login", data)
//       //                   .then((response) => {
//       //                       console.log("Logged in");
//       //                       this.$router.push("/dashboard")
//       //                   })
//       //                   .catch((errors) => {
//       //                       console.log("Cannot log in")
//       //                   })
//       //           };
//       //           login();
//       //       }
//     }
//   };
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
        width: 350px;
        height: 400px;
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
        margin-bottom: -15px;
        margin-top: 60px;
        color: #676A6C;
    }
    .welcome2{
        font-family: "Helvetica Neue", "Helvetica Neue Light", Helvetica;
        font-size: 28px;
        text-align: center;
        margin-bottom: 20px;
        color: #676A6C;
    }

    /* Input fields */
    input[type=text] {
        width: 300px;
        font-family: "Roboto";
        font-size: 16px;
        padding: 12px 20px;
        margin: 8px 0;
        box-sizing: border-box;
        border: none;
        border-bottom: 1px solid #00A0D1;
        background: transparent;
    }
    input[type=password] {
        width: 300px;
        font-family: "Roboto";
        font-size: 16px;
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
        margin-top: 30px;
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

</style>
