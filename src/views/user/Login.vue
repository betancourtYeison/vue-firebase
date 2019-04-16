<template>
    <v-layout justify-center align-center>
        <v-flex xs12 sm8 md6 lg5 xl4>
            <v-card class="elevation-6">
                <v-toolbar color="primary" dark card>
                    <v-toolbar-title>Ingresa tus credenciales</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-text-field
                        label="Email"
                        v-model="formLogin.email"
                        :error-messages="emailErrors"
                        @blur="$v.formLogin.email.$touch()"
                    ></v-text-field>
                    <v-text-field
                        label="Contraseña"
                        type="password"
                        @keyup.enter="signin"
                        v-model="formLogin.password"
                        :error-messages="passwordErrors"
                        @blur="$v.formLogin.password.$touch()"
                    ></v-text-field>
                </v-card-text>
                <v-card-text>
                    <v-layout justify-end>
                        <v-btn
                            @click="signin"
                            :disabled="$v.formLogin.$invalid"
                            color="secondary"
                        >Ingresar</v-btn>
                    </v-layout>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import {
    required,
    email,
    minLength,
    maxLength
} from "vuelidate/lib/validators";

export default {
    data() {
        return {
            formLogin: {
                email: "",
                password: ""
            }
        };
    },
    validations: {
        formLogin: {
            email: {
                required,
                email
            },
            password: {
                required,
                minLength: minLength(6),
                maxLength: maxLength(20)
            }
        }
    },
    methods: {
        signin() {
            if (this.$v.formLogin.$invalid) {
                this.$v.formLogin.$touch();
                return;
            }
            alert("consultando");
        }
    },
    computed: {
        emailErrors() {
            let errors = [];
            if (!this.$v.formLogin.email.$dirty) {
                return errors;
            }
            if (!this.$v.formLogin.email.required) {
                errors.push("Ingresa tu email.");
            }
            if (!this.$v.formLogin.email.email) {
                errors.push("Ingresa un email válido.");
            }
            return errors;
        },
        passwordErrors() {
            let errors = [];
            if (!this.$v.formLogin.password.$dirty) {
                return errors;
            }
            if (!this.$v.formLogin.password.required) {
                errors.push("Ingresa tu contraseña.");
            }
            if (!this.$v.formLogin.password.minLength) {
                errors.push("Ingresa al menos 6 caracteres.");
            }
            if (!this.$v.formLogin.password.maxLength) {
                errors.push("Ingresa máximo 20 caracteres");
            }
            return errors;
        }
    }
};
</script>