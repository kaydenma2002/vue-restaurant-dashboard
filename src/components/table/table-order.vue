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
                <div class="text-h3 mt-2">Orders Table</div>
            </tr>
            <tr>
                <th class="text-left">
                    first name
                </th>
                <th class="text-left">
                    last name
                </th>
                <th class="text-center">
                    phone
                </th>
                <th class="text-left">
                    Street
                </th>
                <th class="text-left">
                    City
                </th>
                <th class="text-left">
                    Zip Code
                </th>
                <th class="text-left">
                    Email
                </th>
                <th class="text-left">
                    Total
                </th>
                <th class="text-left">
                    Total
                </th>
                <th class="text-left">
                    Item
                </th>
                <th class="text-center">
                    Actions
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="items in paginatedData" :key="items.id">
                <td>{{ items.first_name }}</td>
                <td>{{ items.last_name }}</td>
                <td>{{ items.phone }}</td>
                <td>{{ items.street }}</td>
                <td>{{ items.city }}</td>
                <td>{{ items.zip_code }}</td>
                <td>{{ items.email }}</td>
                <td>{{ items.company }}</td>
                <td>{{ items.total }}</td>
                <td>
                    <span v-for="(item, index) in items" :key="index">
                        {{ item.name }}
                        <span v-if="index < items.item_id.length - 1">, </span>
                    </span>
                </td>
                <td class="flex justify-space-between">
                    <v-btn size="small" color="primary" @click.prevent="view(items.id)">View</v-btn>
                    <v-btn size="small" color="warning" @click.prevent="deletes(items.id)">Delete</v-btn>
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
            first_name: null,
            last_name: null,
            phone: null,
            street: null,
            city: null,
            zip_code: null,
            email: null,
            company: null,
            total: null,
            item_id: [],
            page: 1,
            orders: [],
            search : "",
            rowCountPage: 12,
        }
    },
    mounted() {
        HTTP.get('orders').then(response => {
            this.orders = response.data
            console.log(this.orders)
        })
    },
    computed: {
        filteredData() {
            if(this.search) {
                return this.orders.filter((item) => {
                    const first_name = item.first_name ? item.first_name.toLowerCase() : '';
                    

                    return first_name.includes(this.search.toLowerCase())
                        
                });
            } else {
                return this.orders;
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
            HTTPS.post('admin/viewOrderById', {
                id: id
            }).then(res => {
                console.log(res)
                Swal.fire({
                    title: 'Order Information',
                    html:
                        `<div>` +
                        `<div class="text-left mb-2">First Name: ${res.data[0].first_name}</div>` +
                        `<div class="text-left mb-2">Last Name: ${res.data[0].last_name}</div>` +
                        `<div class="text-left mb-2">phone: ${res.data[0].phone}</div>` +
                        `<div class="text-left mb-2">Street: ${res.data[0].street}</div>` +
                        `<div class="text-left mb-2">City: ${res.data[0].city}</div>` +
                        `<div class="text-left mb-2">Zip Code: ${res.data[0].zip_code}</div>` +
                        `<div class="text-left mb-2">Email: ${res.data[0].email}</div>` +
                        `<div class="text-left mb-2">Company: ${res.data[0].company}</div>` +
                        `<div class="text-left mb-2">Total: ${res.data[0].total}</div>` +
                        
                        `<div class="text-left mb-2">Item:  ${res.data[1].map(item => `<li>${item.name}</li>`).join('')}</div>` +
                        
                        `</div>`
                })
            })
        },
        deletes(id) {
            Swal.fire({
                title: 'Do you want to delete this order?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Delete',
                denyButtonText: `Don't delete`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if(result.isConfirmed) {
                    HTTPS.post("admin/deleteOrderById", {
                        id: id
                    }).then(res => {
                        console.log(res)
                        Swal.fire('Deleted!', '', 'success').then(
                            HTTP.get('orders').then(response => {
                                this.orders = response.data
                                console.log(this.orders)
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