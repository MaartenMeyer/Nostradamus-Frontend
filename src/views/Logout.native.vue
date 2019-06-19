<template native>
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

</style>