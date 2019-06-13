<template web>
  <div class="mainDiv">
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css">

    <div class="box">
      <h2 class="titleMain1">Dashboard</h2>
      <h2 class="titleMain2">Welkom {{currentUser.userName}}</h2>

      <div class="buttonsDiv">
        <button class="button" v-on:click="clock()">In/Uit Klokken</button>
      </div>

      <div class="buttons">
        <button class="button" v-on:click="takeBreak()">Pauze</button>
      </div>
    </div>

      <div class="buttons">
        <button class="buttonLogOut" v-on:click="logout()"><i class="fas fa-sign-out-alt"></i></button>
      </div>

    <div class="buttons">
      <button class="buttonOverview" v-on:click="overview()"><i class="fas fa-list-ul"></i></button>
    </div>

    <div class="buttons">
      <button class="buttonRegister" v-on:click="registerUser()"><i class="fas fa-user-plus"></i></button>
    </div>

  </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import VueCookie from 'vue-cookie';
	import idbs from '../api/indexedDBService';
	import rs from '../api/RequestService';

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
				this.checkConnection();
                this.$router.replace('/clock');
            },
            takeBreak(){
                this.$router.replace('/break');
            },
            overview(){
              this.$router.replace('/overview');
            },
            registerUser(){
              this.$router.replace('/register');
            },
            mounted () {

            },
            logout(){
                this.$router.push('/logout');
            },
            checkConnection(){
                let promise = rs.getConnectionStatus(this.$cookie.get('access-token'));
                promise.then(response => this.synchronize())
                       .catch((error) => {
                            if (error.request.status == 0){
                            	console.log("Dashboard: no connection with server, using IndexedDB.")
                        	}
                        });
            },
            synchronize(){
                idbs.getUnsynchronizedData("clockingEntries", (items) => {
                    if(items.length > 0){
                        for(var i = 0; i < items.length; i++){
							let id = items[i].id;
							let beginTime = items[i].beginTime;
							let endTime = items[i].endTime;
							let synced = items[i].synced;

							if(beginTime != null && endTime != null && synced != false){
								beginTime = null;
							}

							let promise = rs.synchronizeClockingEntry(items[i].userNumber, items[i].branchId, items[i].departmentId, beginTime, items[i].endTime, this.$cookie.get('access-token'));
                			promise.then(response => {
										console.log("Dashboard: data synchronized!");
										idbs.updateSync("clockingEntries", id, true);
										console.log(items[i])
									})
                       				.catch((error) => {
                            			console.log("Error in data, data skipped!");
                        			});
                        }
                    }else {
                        console.log("Dashboard: no data synchronization needed!");
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
  width: 400px;
  height: 400px;
  background: #fff;
  border-radius: 15px;
  overflow: hidden;
  margin: 0 auto 0 auto;
  padding: 0px 0px 70px 0px;
  box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
    0 17px 50px 0 rgba(0, 0, 0, 0.19);
}

.titleMain1 {
  font-family: "Helvetica Neue", "Helvetica Neue Light", Helvetica;
  font-size: 28px;
  text-align: center;
  margin-bottom: -15px;
  margin-top: 60px;
  color: #676a6c;
}

.titleMain2 {
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
  margin-top: 40px;
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

/* Overview button */
.buttonOverview {
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
.buttonOverview:hover {
  background-color: #4b4d4f;
  border: 4px solid #4b4d4f;
  transform: scale(0.85);
  transition: 0.5s;
  font-size: 27px;
}
.buttonOverview:after {
  z-index: -1;
}
.buttonOverview:active {
  transform: scale(0.95);
}

/* Register button */
.buttonRegister {
  font-family: "Roboto";
  position:absolute;
  top: 140px;
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
.buttonRegister:hover {
  background-color: #4b4d4f;
  border: 4px solid #4b4d4f;
  transform: scale(0.85);
  transition: 0.5s;
  font-size: 27px;
}
.buttonRegister:after {
  z-index: -1;
}
.buttonRegister:active {
  transform: scale(0.95);
}

</style>
