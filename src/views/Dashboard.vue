<template web>
  <div class="mainDiv">
      <link href='https://fonts.googleapis.com/css?family=Roboto' rel="stylesheet">

      <div class="box">
            <h2 class="dashboardWelcome">Dashboard</h2>
            <h2 class="dashboardWelcome2">Welkom {{currentUser.userId}}</h2>

          <div class="buttonsDiv">
              <button class="button" v-on:click="clock()">In/Uit Klokken</button>
          </div>

          <div class="buttons">
              <button class="button" v-on:click="takeBreak()">Pauze</button>
          </div>

          <div class="buttons">
              <button class="button" v-on:click="logout()">Uitloggen</button>
          </div>

      </div>
    </div>
</template>

<script>
  import axios from "axios"
  import { mapGetters } from 'vuex'

  const { VUE_APP_MODE, VUE_APP_PLATFORM } = process.env;

  export default {
    computed: {
        ...mapGetters({ currentUser: 'currentUser' })
    },
    methods: {
        clock(){
            this.$router.replace('/clock');
        },
        takeBreak(){
            this.$router.replace('/break');
        },
        mounted () {
            this.getUserData()
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

    .box {
        width: 500px;
        height: 450px;
        background: #fff;
        border-radius: 15px;
        overflow: hidden;
        margin: 0 auto 0 auto;
        padding:0px 0px 70px 0px;
        box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);
    }

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
        margin-bottom: 20px;
        color: #676A6C;
    }

    .buttonsDiv{
        text-align: center;
        flex-grow: 2;
        vertical-align: middle;
    }

    /* Login button style */
    .button{
        font-family: "Roboto";
        font-size: 18px;
        background-color: #00A0D1;
        padding: 20px;
        border: 4px solid #00A0D1;
        border-radius: 5px;
        display: inline-block;
        width: 200px;
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
    .button:hover{
        border-radius: 50px;
    }

</style>
