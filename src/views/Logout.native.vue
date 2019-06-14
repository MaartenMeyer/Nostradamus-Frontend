<template native>
    <div class="mainDiv">
        <div class="formBox">
            <h2 class="welcome1">U bent uitgelogd.</h2>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Logout',
  created () {
    delete localStorage.token;
    delete localStorage.userId;
    localStorage.removeItem('company');
    this.$goto('login', {clearHistory: true});
  },
  updated(){
    delete localStorage.token;
    delete localStorage.userId;
    localStorage.removeItem('company');
    this.$goto('login', {clearHistory: true});
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

    .header {
        horizontal-align: center;
        font-size: 25;
        font-weight: 600;
        margin-bottom: 70;
        text-align: center;
        color: #00A2D3;
    }

    .bold {
        color: #000000;
    }
</style>