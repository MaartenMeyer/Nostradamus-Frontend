<template native>
    <Page actionBarHidden="true">
        <FlexboxLayout class="page">

            <StackLayout class="form">
                <Label class="header" text="Welkom" />
            </StackLayout>

        </FlexboxLayout>
    </Page>
</template>

<script>
export default {
  name: 'Logout',
  created () {
    delete localStorage.token;
    delete localStorage.userId;
    localStorage.removeItem('company');
    localStorage.removeItem('users');
    this.$store.dispatch('logout');
    this.alert("U bent uitgelogd");
    this.$goto('login', {clearHistory: true});
  },
  updated(){
    delete localStorage.token;
    delete localStorage.userId;
    localStorage.removeItem('company');
    localStorage.removeItem('users');
    this.$store.dispatch('logout');
    this.alert("U bent uitgelogd");
    this.$goto('login', {clearHistory: true});
  },
    methods:{
        alert(message) {
            return alert({
                title: "Melding",
                okButtonText: "OK",
                message: message
            });
        }
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