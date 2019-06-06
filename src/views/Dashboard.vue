<template web>
  <div class="mainDiv">
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">

    <div class="box">
      <h2 class="dashboardWelcome">Dashboard</h2>
      <h2 class="dashboardWelcome2">Welkom {{currentUser.userName}}</h2>

      <div class="buttonsDiv">
        <button class="button" v-on:click="clock()">In/Uit Klokken</button>
      </div>

      <div class="buttons">
        <button class="button" v-on:click="takeBreak()">Pauze</button>
      </div>

      <div class="buttons">
        <button class="buttonLogOut" v-on:click="logout()">Uitloggen</button>
      </div>
    </div>
  </div>
</template>

<script>
    import axios from 'axios';
    import { mapGetters } from 'vuex'
    import VueCookie from 'vue-cookie';
    import idbs from '../api/indexedDBService'

    const { VUE_APP_MODE, VUE_APP_PLATFORM } = process.env;

    export default {
        computed: {
            ...mapGetters({ currentUser: 'currentUser' })
        },
        created(){
            this.checkConnection();
        },
        methods: {
            clock(){
                this.$router.replace('/clock');
            },
            takeBreak(){
                this.$router.replace('/break');
            },
            mounted () {

            },
            logout(){
                this.$router.push('/logout');
            },
            checkConnection(){
                console.log("Deze unauthorized error hieronder V staat hier even tot backend is opgelost")
                axios({
                    method: 'post',
                    url: 'http://127.0.0.1:3000/api/login',
                    data: { },
                    config: { headers: {'Content-Type': 'application/json' }}})
                    .then()
                    .catch((error) => {
                        if(error.response){
                            if(error.response.status == 401){
                                this.synchronize();
                            }

                        } else if (error.request.status == 0){
                            console.log("No connection with server, using IndexedDB.")
                        }
                    });
            },
            synchronize(){
                idbs.getUnsynchronizedData("clockingEntries", function (items) {
                    if(items.length > 0){
                        for(var i = 0; i < items.length; i++){
                            let id = items[i].id;

                            axios({
                            method: 'post',
                            url: 'http://127.0.0.1:3000/api/clocking',
                            data: { userNumber: items[i].userNumber, branchId: items[i].branchId, departmentId: items[i].departmentId, startTime: items[i].startTime, endTime: items[i].endTime },
                            headers: {'Authorization': "bearer " + VueCookie.get('access-token')}})
                            .then(request => {
                                console.log("Data synchronized!");
                                idbs.deleteFromDatabase("clockingEntries", id);
                            })
                            .catch((error) => {
                                console.log("Error in data, data skipped!");
                            });
                        }
                    }else {
                        console.log("No data synchronization needed!");
                    }
                });
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
  padding: 0px 0px 70px 0px;
  box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
    0 17px 50px 0 rgba(0, 0, 0, 0.19);
}

.dashboardWelcome {
  font-family: "Helvetica Neue", "Helvetica Neue Light", Helvetica;
  font-size: 28px;
  text-align: center;
  margin-bottom: -15px;
  margin-top: 60px;
  color: #676a6c;
}

.dashboardWelcome2 {
  font-family: "Helvetica Neue", "Helvetica Neue Light", Helvetica;
  font-size: 28px;
  text-align: center;
  margin-bottom: 20px;
  color: #676a6c;
}

.buttonsDiv {
  text-align: center;
  flex-grow: 2;
  vertical-align: middle;
}

/* Login button style */
.button {
  font-family: "Roboto";
  font-size: 18px;
  background-color: #00a0d1;
  padding: 20px;
  border: 4px solid #00a0d1;
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
  transition: transform 0.3s;
  transition: 0.5s;
  z-index: 1;
}
.button:hover {
  background-color: #00799e;
  border: 4px solid #00799e;
}
.button:after {
  z-index: -1;
}
.button:active {
  transform: scale(0.95);
}

.buttonLogOut {
  font-family: "Roboto";
  font-size: 18px;
  background-color: #676a6c;
  padding: 20px;
  border: 4px solid #676a6c;
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
  transition: transform 0.3s;
  transition: 0.5s;
  z-index: 1;
}
.buttonLogOut:hover {
  background-color: #4b4d4f;
  border: 4px solid #4b4d4f;
}
.buttonLogOut:after {
  z-index: -1;
}
.buttonLogOut:active {
  transform: scale(0.95);
}
</style>
