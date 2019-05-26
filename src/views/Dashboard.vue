<template web>
  <div>
        <h2>Dashboard</h2>
        <p>Welkom</p>
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
    name: "Login",
    data () {
        return {
            user: {
                name: "Test"
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
        }
  }
</script>

<style>

</style>
