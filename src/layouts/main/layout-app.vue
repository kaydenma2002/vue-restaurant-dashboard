<template>
  <div>
    <v-navigation-drawer v-model="drawer" temporary color="primary">
              <v-list-item prepend-avatar="https://randomuser.me/api/portraits/men/78.jpg" :title="user.name">
                <template v-slot:append>
                  <v-menu>
                    <template v-slot:activator="{ props }">
                      <v-btn variant="text" icon="mdi-chevron-right" v-bind="props"></v-btn>
                    </template>
        
                    <v-list min-width="200" class="list">
                      <v-list-item @click="toProfile">
                        <v-list-item-title>
                          <v-icon>mdi-account</v-icon>
                          Profile
                        </v-list-item-title>
                      </v-list-item>
        
                      <v-list-item>
                        <v-list-item-title>
                          <v-icon>mdi-cog</v-icon>
                          Setting
                        </v-list-item-title>
                      </v-list-item>
        
                      <v-list-item>
                        <v-list-item-title>
                          <v-icon>mdi-run</v-icon>
                          Activities
                        </v-list-item-title>
                      </v-list-item>
                      <button class="w-100 text-left" @click="submitLogout">
                        <v-list-item>
                          <v-list-item-title>
        
                            <v-icon color="red">mdi-power</v-icon>
                            <span class="text-red">Logout</span>
        
                          </v-list-item-title>
                        </v-list-item>
                      </button>
                    </v-list>
                  </v-menu>
                </template>
              </v-list-item>
        
              <v-divider></v-divider>
        
              <v-list density="compact" nav v-for="(item, i) in menu" :key="i">
                <v-list-item :prepend-icon="item.icon" :title="item.title" :to="item.url" v-if="!item.submenu"></v-list-item>
        
                <v-list-group v-else :key="i">
                  <template v-slot:activator="{ props }">
                    <v-list-item v-bind="props" :prepend-icon="item.icon" :title="item.title"></v-list-item>
                  </template>
        
                  <v-list-item class="item_menu" v-for="(sub, idx) in item.submenu" :key="idx" :title="sub.title"
                    :prepend-icon="sub.icon" :to="sub.url"></v-list-item>
                </v-list-group>
              </v-list>
              <v-list>
                <v-list-item prepend-icon="mdi mdi-download" title="Download" href="https://github.com/aliftech/swing"
                  target="__blank"></v-list-item>
                <v-list-item prepend-icon="mdi mdi-currency-usd" title="Donate" href="https://teer.id/wahyu krisna aji"
                  target="__blank"></v-list-item>
              </v-list>
            </v-navigation-drawer>
        
            <v-app-bar :elevation="2">
              <template v-slot:prepend>
                <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
              </template>
              <template v-slot:append>
                <v-btn class="text-none" stacked>
                  <v-badge :content="this.$notifications" color="error">
                    <v-icon>mdi-bell</v-icon>
                  </v-badge>
                </v-btn>
        
                <v-btn class="text-none" stacked>
                  <v-badge content="9+" color="error">
                    <v-icon>mdi-message</v-icon>
                  </v-badge>
                </v-btn>
                <v-btn :prepend-icon="icon" @click="onClick"></v-btn>
              </template>
            </v-app-bar>
  </div>
</template>

<script>

import Swal from 'sweetalert2';
import axios from 'axios';
import { localStorageExport } from '@/localStorage/local-storage';
import { HTTPS } from "@/axios/http-axios"
export default {
  data() {
    return {
      drawer: null,
      echo: null,
      menu: [
        {
          title: "User",
          icon: "mdi-view-dashboard",
          url: "/",
        },
        
        {
          title: "Order",
          icon: "mdi-file",
          url: "/order",
        },
        {
          title: "Reservation",
          icon: "mdi-file",
          url: "/reservation",
        },
        {
          title: "Components",
          icon: "mdi-view-dashboard-variant",
          submenu: [
            {
              title: "Alert",
              icon: "mdi-circle-small",
              url: "/alert",
            },
            {
              title: "Article",
              icon: "mdi-circle-small",
              url: "/article",
            },
            {
              title: "Avatar",
              icon: "mdi-circle-small",
              url: "/avatar",
            },
            {
              title: "Badge",
              icon: "mdi-circle-small",
              url: "/badge",
            },
            {
              title: "Carousel",
              icon: "mdi-circle-small",
              url: "/carousel",
            },
            {
              title: "Chat Box",
              icon: "mdi-circle-small",
              url: "/chat-box",
            },
            {
              title: "Chart",
              icon: "mdi-circle-small",
              url: "/chart",
            },
            {
              title: "Color Picker",
              icon: "mdi-circle-small",
              url: "/color-picker",
            },
            {
              title: "Galery",
              icon: "mdi-circle-small",
              url: "/galery",
            },
            {
              title: "Tab",
              icon: "mdi-circle-small",
              url: "/tab",
            },
            {
              title: "Table",
              icon: "mdi-circle-small",
              url: "/table",
            },
            {
              title: "Timeline",
              icon: "mdi-circle-small",
              url: "/timeline",
            },
          ],
        },
        {
          title: "Form",
          icon: "mdi-format-align-justify",
          submenu: [
            {
              title: "Standard Form",
              icon: "mdi-circle-small",
              url: "/form-standard",
            },
            {
              title: "Advanced Form",
              icon: "mdi-circle-small",
              url: "/form-advanced",
            },
            {
              title: "Validation",
              icon: "mdi-circle-small",
              url: "/validation",
            },
          ],
        },
        {
          title: "Authorization",
          icon: "mdi-account-circle",
          submenu: [
            {
              title: "Login",
              icon: "mdi-circle-small",
              url: "/login",
            },
            {
              title: "Registration",
              icon: "mdi-circle-small",
              url: "/registration",
            },
            {
              title: "Forget Password",
              icon: "mdi-circle-small",
              url: "/forget-password",
            },
            {
              title: "Reset Password",
              icon: "mdi-circle-small",
              url: "/reset-password",
            },
          ],
        },
        {
          title: "Errors",
          icon: "mdi-alert-circle",
          submenu: [
            {
              title: "403",
              icon: "mdi-circle-small",
              url: "/403",
            },
            {
              title: "404",
              icon: "mdi-circle-small",
              url: "/404",
            },
            {
              title: "500",
              icon: "mdi-circle-small",
              url: "/500",
            },
            {
              title: "503",
              icon: "mdi-circle-small",
              url: "/503",
            },
          ],
        },
      ],
      icon: "",
      is_night: null,
      user: "",
      channel: null
    };
  },
  mounted() {
    
    this.getIcon();
    HTTPS.get('user').then(res => {
      this.user = res.data
    })
  },
  methods: {
    onClick() {
      this.$emit("tema");
      this.is_night = !this.is_night;
      if (this.is_night === true) {
        this.icon = "mdi mdi-weather-night";
      } else {
        this.icon = "mdi mdi-weather-sunny";
      }
      localStorage.setItem("icon", this.icon);
    },
    submitLogout() {
      Swal.fire({
        title: "Are you sure to logout ?",

        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Log out my account",
      }).then((result) => {
        if (result.isConfirmed) {
          axios.post(
            "http://127.0.0.1:8000/api/logout",
            {
              key: "value",
            },
            {
              headers: {
                Authorization: `Bearer ${localStorageExport("jwtToken")}`,
              },
            }
          );
          Swal.fire("", "User logged out!", "success").then((res) => {
            localStorage.removeItem("jwtToken");
            this.$router.push("/login");
          });
        }
      });
    },


    toProfile() {
      this.$router.push("/profile");
    },

    getIcon() {
      if (localStorage.getItem("theme") === "dark") {
        this.is_night = true;
        this.icon = "mdi mdi-weather-sunny";
      } else {
        this.is_night = false;
        this.icon = "mdi mdi-weather-night";
      }
    },
  },
};
</script>

<style scoped>
.list {
  cursor: pointer;
}

.item_menu {
  padding-left: 0px;
  margin-left: -25px;
}
</style>
