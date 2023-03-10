<template>
  <div>
    <v-container>
      <titlebarComponent :title="title" :routes="routes"></titlebarComponent>
                        <profileBanner :name="this.user.name" class="mb"></profileBanner>
                  
                        <v-row>
                          <myFooter></myFooter>
                        </v-row>
                      </v-container>
                  </div>
</template>

<script>

import { HTTPS } from '@/axios/http-axios'
import titlebarComponent from '@/components/titlebar/titlebar-component.vue';
import profileBanner from '@/components/profile/profile-banner-component.vue';
import myFooter from '@/components/footer/footer-component.vue';

export default {
  components: {
    titlebarComponent,
    profileBanner,

    myFooter
  },
  data: () => ({
    title: 'Profile',
    user: "",
    routes: [
      {
        title: "Profile",
        disabled: false,
        href: "/profile",
      },
    ],
  }),
  mounted() {
    HTTPS.get('user').then(res => {
      this.user = res.data
    })
  }
}
</script>

<style scoped>
.mb {
  margin-bottom: 15px;
}

.main-bg {
  background-color: rgb(227, 227, 221);
  height: 100%;
}
</style>