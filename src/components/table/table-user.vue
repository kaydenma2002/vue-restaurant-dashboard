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
                <div class="text-h3 mt-2">Users Table</div>
            </tr>
            <tr>
                <th class="text-left">
                    Name
                </th>
                <th class="text-left">
                    Email
                </th>
                <th class="text-center">
                    Role
                </th>
                <th class="text-left">
                    Restaurant
                </th>
                <th class="text-left">
                    Phone
                </th>
                <th class="text-left">
                    State
                </th>
                <th class="text-left">
                    City
                </th>
                <th class="text-left">
                    Zip Code
                </th>
                <th class="text-left">
                    Status
                </th>
                <th class="text-center">
                    Actions
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in paginatedData" :key="item.name">
                <td>{{ item.name }}</td>
                <td>{{ item.email }}</td>
                <td class="text-center" v-if="item.user_type === '1'"><v-btn class="text-white " color="#AB47BC"> Super
                        Admin </v-btn></td>
                <td class="text-center" v-if="item.user_type === '0'"><v-btn class="text-white " color="#1976D2">Admin
                    </v-btn></td>
                <td>{{ item.restaurant.name }}</td>
                <td>{{ item.restaurant.phone }}</td>
                <td>{{ item.restaurant.state }}</td>
                <td>{{ item.restaurant.city }}</td>
                <td>{{ item.restaurant.zip_code }}</td>
                <td v-if="item.status === '0'"><v-btn class="text-white" color="red">Offline</v-btn></td>
                <td v-if="item.status === '1'"><v-btn class="text-white" color="green">Online</v-btn></td>
                <td class="flex justify-space-between">
                    <v-btn size="small" color="secondary" @click.prevent="edit(item.id)">Edit</v-btn>
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
            users: [],
            rowCountPage: 12,
            name: null,
            email: null,
            restaurant_name: null,
            address: null
        }
    },
    mounted() {
        HTTP.get('users').then(response => {
            this.users = response.data
            

        })
    },
    computed: {
        filteredData() {
            if(this.search) {
                return this.users.filter((item) => {
                    const name = item.name ? item.name.toLowerCase() : '';
                    const email = item.email ? item.email.toLowerCase() : '';
                    const user_type = item.user_type ? item.user_type.toLowerCase() : '';
                    const status = item.status ? item.status.toLowerCase() : '';

                    return name.includes(this.search.toLowerCase())
                        || email.includes(this.search.toLowerCase())
                        || user_type.includes(this.search.toLowerCase())
                        || status.includes(this.search.toLowerCase());
                });
            } else {
                return this.users;
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
            HTTPS.post('admin/viewUserById', {
                id: id
            }).then(res => {
                console.log(res)
                Swal.fire({
                    title: 'Client Information',
                    html:
                        `<div>` +
                        `<div class="text-left mb-2">Name: ${res.data[0].user.name}</div>` +
                        `<div class="text-left mb-2">Email: ${res.data[0].user.email}</div>` +
                        `<div class="text-left mb-2">Restaurant Name: ${res.data[0].name}</div>` +
                        `<div class="text-left mb-2">Address: ${res.data[0].address}</div>` +
                        `</div>`
                })
            })
        },
        deletes(id) {
            Swal.fire({
                title: 'Do you want to delete this user?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Delete',
                denyButtonText: `Don't delete`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if(result.isConfirmed) {
                    HTTPS.post("admin/deleteUserById", {
                        id: id
                    }).then(res => {
                        console.log(res)
                        Swal.fire('Deleted!', '', 'success').then(
                            HTTP.get('users').then(response => {
                                this.users = response.data
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
        edit(id) {
            HTTPS.post('admin/viewUserById', {
                id: id
            }).then(async (res) => {
                console.log(res)
                this.email = res.data[0].user.email
                this.name = res.data[0].user.name
                this.restaurant_name = res.data[0].name
                this.address = res.data[0].address
                const { value: formValues, isConfirmed } = await Swal.fire({
                    title: 'Update user',
                    html: `
        <input id="swal-input1" class="swal2-input" placeholder="Name" value="${this.name}">
        <input id="swal-input2" class="swal2-input" placeholder="Email" value="${this.email}">
        <input id="swal-input3" class="swal2-input" placeholder="Restaurant name" value="${this.restaurant_name}">
        <input id="swal-input4" class="swal2-input" placeholder="Address" value="${this.address}">
      `,
                    focusConfirm: false,
                    showCancelButton: true,
                    confirmButtonText: 'Update',
                    cancelButtonText: 'Cancel',
                    preConfirm: () => {
                        return {
                            name: document.getElementById('swal-input1').value,
                            email: document.getElementById('swal-input2').value,
                            restaurant_name: document.getElementById('swal-input3').value,
                            address: document.getElementById('swal-input4').value
                        }
                    }
                })
                if(isConfirmed && formValues) {
                    this.name = formValues.name
                    this.email = formValues.email
                    this.restaurant_name = formValues.restaurant_name
                    this.address = formValues.address
                    HTTPS.post('admin/updateUserById', {
                        id: id,
                        email: this.email,
                        name: this.name,
                        restaurant_name: this.restaurant_name,
                        address: this.address
                    }).then((res) => {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'User Updated Succesfully',
                            showConfirmButton: false,
                            timer: 1500
                        }).then(
                            HTTP.get('users').then(response => {
                                this.users = response.data
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
                }
            })
        }



    }
}
</script>

<style></style>