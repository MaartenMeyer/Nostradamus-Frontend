<template web>
  <div>
        <h2>Dashboard</h2>
        <p>Welkom {{ user.name }}</p>
    </div>
</template>

<template native>
  <Page actionBarHidden="false" backgroundSpanUnderStatusBar="true">
      <FlexboxLayout class="page">
          <Label text="Welcome to the new page" />
          <Button text="Log out" @tap="clickLogout" />
      </FlexboxLayout>
  </Page>
</template>

<script>
  import axios from "axios"

  const { VUE_APP_MODE, VUE_APP_PLATFORM } = process.env;

  export default {
    name: "Login",
    data () {
        return {
            user: {
                name: "Jesse"
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
                      router.push("/")
                  })
            }
        },
        mounted () {
            this.getUserData()
        }
  }
</script>
