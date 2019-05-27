<template web>
  <div>
      <link href='https://fonts.googleapis.com/css?family=Roboto' rel="stylesheet">

        <h2 class="dashboardWelcome">Dashboard</h2>
        <h2 class="dashboardWelcome2">Welkom {{this.user.name}}</h2>

      <div class="buttons">
          <button class="button">In/Uit Klokken</button>
      </div>

      <div class="buttons">
          <button class="button">Pauze</button>
      </div>

      <div class="buttons">
          <button class="button" v-on:click="logout()">Uitloggen</button>
      </div>

    </div>
</template>

<script>
  import axios from "axios"

  // export default {
  //     name: 'Dashboard',
  //     data() {
  //         return {};
  //     }
  // }

  const { VUE_APP_MODE, VUE_APP_PLATFORM } = process.env;

  export default {
    data () {
        return {
            user: {
                name: "Richard"
            }
        }
    },
    methods: {
          getUserData: function () {
              let self = this;
              axios.get("/api/user")
                  .then((response) => {
                      console.log(response);
                      self.$set(this, "user", response.data.user)
                  })
                  .catch((errors) => {
                      console.log(errors);
                      router.push("/dashboard")
                  })
            }
        },
        mounted () {
            this.getUserData()
        },

      logout(){
          this.$router.push({path: '/login'});
      }
  }
</script>

<style scoped>
    .dashboardWelcome{
        font-family: "Helvetica Neue", "Helvetica Neue Light", Helvetica;
        font-size: 28px;
        text-align: center;
        margin-bottom: -15px;
        margin-top: 60px;
        color: #676A6C;
    }

    .dashboardWelcome2{
        font-family: "Helvetica Neue", "Helvetica Neue Light", Helvetica;
        font-size: 28px;
        text-align: center;
        margin-bottom: 50px;
        color: #676A6C;
    }

    .buttons{
        text-align: center;
        flex-grow: 2;
        vertical-align: middle;
    }

    input[type=text] {
        width: 20%;
        font-family: "Roboto";
        font-size: 16px;
        padding: 12px 20px;
        margin: 8px 0;
        box-sizing: border-box;
        border: none;
        border-bottom: 1px solid #00A0D1;
    }

    input[type=password] {
        width: 20%;
        font-family: "Roboto";
        font-size: 16px;
        padding: 12px 20px;
        margin: 8px 0;
        box-sizing: border-box;
        border: none;
        border-bottom: 1px solid #00A0D1;
    }

    input:focus{
        outline: none;
    }

    .button{
        font-family: "Roboto";
        background-color: #00A0D1;
        width: 20%;
        margin-top: 50px;
        border: none;
        color: white;
        padding: 20px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 2rem;
        cursor: pointer;
        border-radius: 5px;
    }
    .button:hover {
        box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);
    }

</style>
