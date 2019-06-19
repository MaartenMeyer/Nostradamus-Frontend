<template>
    <div class="mainDiv">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css">

        <div class="formBox">

            <h2 class="welcome1">U bent uitgelogd.</h2>
            <i class="fas fa-check"></i>

        </div>
    </div>
</template>

<script>
export default {
  name: 'Logout',
  created () {
    this.$cookie.delete('access-token');
    this.$cookie.delete('user-id');
    this.$cookie.delete('account-type');
    localStorage.removeItem('company');
    localStorage.removeItem('users');
    this.$store.dispatch('logout');
    setTimeout(() => this.close(), 1500);
  },
  methods: {
      close(){
          this.$router.push('/');
      }
  }
}
</script>

<style>
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

    .welcome1{
        font-family: "Helvetica Neue", "Helvetica Neue Light", Helvetica;
        font-size: 28px;
        text-align: center;
        margin-bottom: -15px;
        margin-top: 60px;
        color: #676A6C;
    }

    .fa-check {
        margin-top: 50px;
        font-size: 200px;
        color: #00A0D1;
    }

</style>