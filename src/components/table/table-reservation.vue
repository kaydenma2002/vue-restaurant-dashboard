<template>
    <v-toolbar color="white" elevation="4">
        <v-container>

            <v-text-field label="Search" variant="underlined" append-icon="mdi-magnify" color="primary" v-model="search">
            </v-text-field>
        </v-container>
    </v-toolbar>
    <v-table>
        <thead>
            <tr class="">
                <div class="text-h3 mt-2">Reservation Table</div>
            </tr>
            <tr>
                <th class="text-left">
                    Phone
                </th>
                <th class="text-left">
                    Table
                </th>
                <th class="text-center">
                    Date
                </th>
                <th class="text-center">
                    Actions
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in paginatedData" :key="item.name">
                <td>{{ item.phone }}</td>
                <td>{{ item.table }}</td>
                <td>{{ item.date }}</td>
                <td class="flex justify-space-between">

                    <v-btn size="small" color="primary" @click.prevent="view(item.id)">View</v-btn>
                    <v-btn size="small" color="warning" @click.prevent="deletes(item.id)">Delete</v-btn>
                </td>
            </tr>
        </tbody>
    </v-table>
    <v-card>
        <v-container>
            <v-row>
                <v-col cols="cols">
                    <v-autocomplete label="Shows" :items="[3, 5, 10, 15]" variant="underlined"
                        v-model="rowCountPage"></v-autocomplete>
                </v-col>
                <v-col cols="cols">
                    <v-pagination v-model="page" :length="length" @next="nextPage" @prev="prevPage" rounded="circle"
                        color="primary"></v-pagination>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>















import { HTTP, HTTPS } from '../../axios/http-axios'
import Swal from 'sweetalert2'



export default {
    data() {
        return {
            search: '',
            page: 1,
            reservations: [],
            rowCountPage: 12,
            name: null,
            email: null,
            restaurant_name: null,
            address: null
        }
    },
    mounted() {
        HTTP.get('reservations').then(response => {
            this.reservations = response.data
        })
    },
    computed: {
        filteredData() {
            if(this.search) {
                return this.reservations.filter((item) => {
                    const phone = item.phone ? item.phone.toLowerCase() : '';
                    return phone.includes(this.search.toLowerCase())
                });
            } else {
                return this.reservations;
            }
        },
        paginatedData() {
            const start = (this.page - 1) * this.rowCountPage
            const end = start + this.rowCountPage
            return this.filteredData.slice(start, end)
        },
        length() {
            return Math.ceil(this.filteredData.length / this.rowCountPage)
        }
    },
    methods: {
        nextPage() {
            if(this.page < this.length) {
                this.page++
            }
        },
        prevPage() {
            if(this.page > 1) {
                this.page--
            }
        },
        view(id) {
            HTTPS.post('admin/viewReservationById', {
                id: id
            }).then(res => {
                Swal.fire({
                    title: 'Reservation Information',
                    html:
                        `<div>` +
                        `<div class="text-left mb-2">Phone: ${res.data.phone}</div>` +
                        `<div class="text-left mb-2">Table: ${res.data.table}</div>` +
                        `<div class="text-left mb-2">Date: ${res.data.date}</div>` +
                        `</div>`
                })
            })
        },
        deletes(id) {
            Swal.fire({
                title: 'Do you want to delete this reservation?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Delete',
                denyButtonText: `Don't delete`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if(result.isConfirmed) {
                    HTTPS.post("admin/deleteReservationById", {
                        id: id
                    }).then(res => {
                        console.log(res)
                        Swal.fire('Deleted!', '', 'success').then(
                            HTTP.get('reservations').then(response => {
                                this.reservations = response.data
                                    console.log(this.reservations)
                            })
                        )
                    }).catch((error => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: error,
                            footer: '<a href="">Why do I have this issue?</a>'
                        })
                    }))

                } else if(result.isDenied) {
                    Swal.fire('Deleted cancelled', '', 'info')
                }
            })
        },
        



    }
}
</script>

<style></style>