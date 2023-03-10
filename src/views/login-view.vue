<template>
                                            <v-app :theme="theme">
                                                <div class="main-bg">
                                                    <v-card elevation="2" class="card-login">
                                        
                                                        <v-card-title class="d-flex justify-center">
                                                            <div v-if="theme === 'light'">
                                                                <img src="../assets/logo/swing-light.png" class="login-logo" alt="Logo Bahtera Adhiguna">
                                                            </div>
                                                            <div v-else>
                                                                <img src="../assets/logo/swing.png" class="login-logo" alt="Logo Bahtera Adhiguna">
                                                            </div>
                                                        </v-card-title>
                                        
                                                        <div class="d-flex justify-center mb">
                                                            <v-btn prepend-icon="mdi-google" variant="tonal" color="red" size="small">
                                                                SignIn
                                                            </v-btn>
                                                            <v-btn prepend-icon="mdi-facebook" variant="tonal" class="btn-vendor" color="blue" size="small">
                                                                SignIn
                                                            </v-btn>
                                                        </div>
                                        
                                                        <div class="d-flex justify-center mb">
                                                            <b>OR</b>
                                                        </div>
                                        
                                                        <v-form ref="form" v-model="valid" lazy-validation class="form-width">
                                        
                                                            <div class="form-login">
                                                                <v-text-field label="Username" density="compact" variant="underlined" color="primary"
                                                                    v-model="email" type="text" required></v-text-field>
                                        
                                                                <v-text-field density="compact" variant="underlined" color="primary" label="Password"
                                                                    v-model="password" :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                                                                    @click:append="showPass = !showPass" :type="showPass ? 'text' : 'password'"
                                                                    required></v-text-field>
                                                            </div>
                                        
                                        
                                                            <div class="login-button">
                                                                <v-btn @click="submitLogin" class="ma-2" color="primary">
                                                                    Login
                                                                </v-btn>
                                                            </div>
                                        
                                                        </v-form>
                                        
                                                    </v-card>
                                        
                                                </div>
                                        </v-app>
</template>

<script>




import Swal from 'sweetalert2'
import { HTTP } from "../axios/http-axios"
import { localStorageImport } from "../localStorage/local-storage"

export default {
    data() {
        return {
            showPass: false,
            email: '',
            password: '',
            type: 'password',

            valid: true,
            token: '',
            theme: localStorage.getItem('theme')
        }
    },
    methods: {
        submitLogin() {
            HTTP.post("/admin/login", {
                email: this.email,
                password: this.password,
            })
                .then((res) => {
                    console.log(res)
                    localStorageImport("jwtToken", res.data.token);
                    Swal.fire("Logged In successfully", "Welcome back", "success").then(
                        (res) => {

                            this.$router.push("/");
                        }
                    );
                })
                .catch((error) => {
                    console.log(error)
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: error.response.data.message,

                        // footer: '<a href="">Why do I have this issue?</a>',
                    });
                });
        }

    }

}
</script>

<style scoped>
.mb {
    margin-bottom: 60px;
}

.main-bg {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: rgb(227, 227, 221);
    padding: 120px 0px;
}

.margin {
    margin-top: 29%;
}

.card-login {
    width: 600px;
}

@media screen and (max-width: 450px) {
    .card-login {
        width: 80%;
    }
}

.login-logo {
    width: 270px;
    height: auto;
}

@media screen and (max-width: 450px) {
    .login-logo {
        width: 150px;
    }
}

.form-login {
    width: 80%;
    margin: auto;
}

.login-button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
    margin-bottom: 35px;
}

.btn-vendor {
    margin-left: 10px;
}
</style>