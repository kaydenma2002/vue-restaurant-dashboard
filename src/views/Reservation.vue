<template>
    <div>
        <v-container>
            <titleBar class="mb" :title="title" :routes="routes"></titleBar>
            <v-row>
                <v-col lg="12" sm="12">
                    <tableReservation></tableReservation>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="cols">
                    <panelComponentVue icon="mdi-account" title="Admins" :value="this.data?.admin?.length">
                    </panelComponentVue>
                </v-col>
                <v-col cols="cols">
                    <panelComponentVue icon="mdi-cart" title="Products" :value="this.data?.restaurants?.length">
                    </panelComponentVue>
                </v-col>

                <v-col cols="cols">
                    <panelComponentVue icon="mdi-earth" title="Visitors" :value="this.data?.customers?.length">
                    </panelComponentVue>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="cols">
                    <chartComponentVue></chartComponentVue>
                </v-col>
                <v-col cols="cols">
                    <popularProductComponentVue></popularProductComponentVue>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="cols">
                    <trafficComponentVue></trafficComponentVue>
                </v-col>

                <v-col cols="cols">
                    <activityComponent></activityComponent>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="cols">
                    <footerComponent></footerComponent>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>

import titleBar from "@/components/titlebar/titlebar-component.vue";
import panelComponentVue from "@/components/dashboard/panel-component.vue";
import chartComponentVue from "@/components/dashboard/chart-component.vue";
import popularProductComponentVue from "@/components/dashboard/popular-product-component.vue";
import trafficComponentVue from "@/components/dashboard/traffic-component.vue";
import activityComponent from "@/components/dashboard/activity-component.vue";
import footerComponent from "@/components/footer/footer-component.vue";
import tableReservation from '@/components/table/table-reservation.vue';
import Swal from 'sweetalert2'
import Echo from "laravel-echo";
import { HTTPS } from '@/axios/http-axios'
export default {
    components: {
        titleBar,
        panelComponentVue,
        chartComponentVue,
        popularProductComponentVue,
        trafficComponentVue,
        activityComponent,
        footerComponent,
        tableReservation,
    },

    data() {
        return {
            title: "Dashboard",
            routes: [
                {
                    title: "Dashboard",
                    disabled: false,
                    href: "",
                },
            ],
            data: ""
        };
    },
    created() {
        HTTPS.get('admin/dashboard').then(response => {
            this.data = response.data;
        })
        this.echo = new Echo({
            broadcaster: 'pusher',
            key: "80e26ff66717be8fd4cf",
            cluster: "mt1",
            forceTLS: true
        })
        this.channel = this.echo.channel('reservation')
        this.channel.listen('ReservationBooked', (data) => {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'New Reservation booked',
                showConfirmButton: false,
                timer: 1500
            })
        })
    },
};
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
