<template>
    <v-layout justify-center align-center>
        <v-flex xs12 sm8 md6 lg5 xl4>
            <v-slide-y-transition mode="out-in" @enter="enter">
                <v-card v-if="registerView === 1" :key="1" class="elevation-6">
                    <v-toolbar color="primary" dark card>
                        <v-toolbar-title>Regístrate</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-text-field
                            v-model="formRegisterView1.email"
                            :error-messages="emailErrors"
                            @blur="$v.formRegisterView1.email.$touch()"
                            label="Email"
                        ></v-text-field>
                        <v-text-field
                            v-model="formRegisterView1.password1"
                            :error-messages="password1Errors"
                            @blur="$v.formRegisterView1.password1.$touch()"
                            label="Contraseña"
                            type="password"
                        ></v-text-field>
                        <v-text-field
                            v-model="formRegisterView1.password2"
                            :error-messages="password2Errors"
                            @keyup.enter="nextView(1)"
                            @blur="$v.formRegisterView1.password2.$touch()"
                            label="Repetir Contraseña"
                            type="password"
                        ></v-text-field>
                    </v-card-text>
                    <v-card-text>
                        <v-layout>
                            <v-flex xs6>
                                <v-layout justify-start>
                                    <v-btn
                                        :to="{ name: 'login' }"
                                        flat
                                        color="secondary"
                                        class="text-none"
                                    >¿Ya tienes cuenta? Ingresa</v-btn>
                                </v-layout>
                            </v-flex>
                            <v-flex xs6>
                                <v-layout justify-end>
                                    <v-btn
                                        @click="nextView(1)"
                                        :disabled="$v.formRegisterView1.$invalid"
                                        color="secondary"
                                    >Siguiente</v-btn>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>

                <v-card v-if="registerView === 2" :key="2" class="elevation-6">
                    <v-toolbar color="primary" dark card>
                        <v-toolbar-title>Ingresa tus Nombres y Apellidos</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-text-field
                            v-model="formRegisterView2.name"
                            :error-messages="nameErrors"
                            @blur="$v.formRegisterView2.name.$touch()"
                            label="Nombre"
                        ></v-text-field>
                        <v-text-field
                            v-model="formRegisterView2.lastName"
                            :error-messages="lastNameErrors"
                            @keyup.enter="nextView(2)"
                            @blur="$v.formRegisterView2.lastName.$touch()"
                            label="Apellidos"
                        ></v-text-field>
                    </v-card-text>
                    <v-card-text>
                        <v-layout>
                            <v-flex xs6>
                                <v-layout justify-start>
                                    <v-btn @click="backView">Volver</v-btn>
                                </v-layout>
                            </v-flex>
                            <v-flex xs6>
                                <v-layout justify-end>
                                    <v-btn
                                        @click="nextView(2)"
                                        :disabled="$v.formRegisterView2.$invalid"
                                        color="secondary"
                                    >Siguiente</v-btn>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>

                <v-card v-if="registerView === 3" :key="3" class="elevation-6">
                    <v-toolbar color="primary" dark card>
                        <v-toolbar-title>Selecciona la Fecha de Nacimiento</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-layout justify-center>
                            <v-date-picker
                                ref="calendar"
                                :max="maxDate"
                                v-model="formRegisterView3.birthDate"
                                locale="es-co"
                                class="elevation-3"
                                reactive
                            ></v-date-picker>
                        </v-layout>
                    </v-card-text>
                    <v-card-text>
                        <v-layout>
                            <v-flex xs6>
                                <v-layout justify-start>
                                    <v-btn @click="backView">Volver</v-btn>
                                </v-layout>
                            </v-flex>
                            <v-flex xs6>
                                <v-layout justify-end>
                                    <v-btn
                                        @click="register"
                                        :disabled="$v.formRegisterView3.$invalid"
                                        color="secondary"
                                    >Registrarse</v-btn>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-slide-y-transition>
        </v-flex>
    </v-layout>
</template>  

<script>
import {
    required,
    email,
    minLength,
    maxLength,
    sameAs
} from "vuelidate/lib/validators";
import { fullName } from "@/utils/validations";
export default {
    data() {
        return {
            registerView: 1,
            maxDate: null,
            formRegisterView1: {
                email: "",
                password1: "",
                password2: ""
            },
            formRegisterView2: {
                name: "",
                lastName: ""
            },
            formRegisterView3: {
                birthDate: null
            }
        };
    },
    validations: {
        formRegisterView1: {
            email: {
                required,
                email
            },
            password1: {
                required,
                minLength: minLength(6),
                maxLength: maxLength(20)
            },
            password2: {
                required,
                sameAs: sameAs("password1")
            }
        },
        formRegisterView2: {
            name: {
                required,
                minLength: minLength(3),
                maxLength: maxLength(20),
                fullName
            },
            lastName: {
                required,
                minLength: minLength(3),
                maxLength: maxLength(20),
                fullName
            }
        },
        formRegisterView3: {
            birthDate: {
                required
            }
        }
    },
    created() {
        let currentDate = new Date();
        this.maxDate = new Date(
            currentDate.setFullYear(currentDate.getFullYear() - 13)
        )
            .toISOString()
            .substr(0, 10);
    },
    methods: {
        backView() {
            this.registerView--;
        },
        nextView(view) {
            switch (view) {
                case 1:
                    if (this.$v.formRegisterView1.$invalid) {
                        this.$v.formRegisterView1.$touch();
                        return;
                    }
                    this.registerView++;
                    break;
                case 2:
                    if (this.$v.formRegisterView2.$invalid) {
                        this.$v.formRegisterView2.$touch();
                        return;
                    }
                    this.registerView++;
                    break;

                default:
                    break;
            }
        },
        enter() {
            if (this.registerView == 3 && !this.formRegisterView3.birthDate) {
                this.$refs.calendar.activePicker = "YEAR";
            }
        },
        register() {
            if (this.$v.formRegisterView3.$invalid) {
                return;
            }
            alert("Registrando...");
        }
    },
    computed: {
        emailErrors() {
            let errors = [];
            if (!this.$v.formRegisterView1.email.$dirty) {
                return errors;
            }
            if (!this.$v.formRegisterView1.email.required) {
                errors.push("Ingresa tu email.");
            }
            if (!this.$v.formRegisterView1.email.email) {
                errors.push("Ingresa un email válido.");
            }
            return errors;
        },
        password1Errors() {
            let errors = [];
            if (!this.$v.formRegisterView1.password1.$dirty) {
                return errors;
            }
            if (!this.$v.formRegisterView1.password1.required) {
                errors.push("Ingresa tu contraseña.");
            }
            if (!this.$v.formRegisterView1.password1.minLength) {
                errors.push("Ingresa al menos 6 caracteres.");
            }
            if (!this.$v.formRegisterView1.password1.maxLength) {
                errors.push("Ingresa máximo 20 caracteres");
            }
            return errors;
        },
        password2Errors() {
            let errors = [];
            if (!this.$v.formRegisterView1.password2.$dirty) {
                return errors;
            }
            if (!this.$v.formRegisterView1.password2.required) {
                errors.push("Repite tu contraseña.");
            }
            if (!this.$v.formRegisterView1.password2.sameAs) {
                errors.push("Las contraseñas deben ser iguales.");
            }
            return errors;
        },
        nameErrors() {
            let errors = [];
            if (!this.$v.formRegisterView2.name.$dirty) {
                return errors;
            }
            if (!this.$v.formRegisterView2.name.required) {
                errors.push("Ingresa tus nombres.");
            }
            if (!this.$v.formRegisterView2.name.minLength) {
                errors.push("Ingresa al menos 3 caracteres.");
            }
            if (!this.$v.formRegisterView2.name.maxLength) {
                errors.push("Ingresa máximo 20 caracteres");
            }
            if (!this.$v.formRegisterView2.name.fullName) {
                errors.push("Ingresa solo letras");
            }
            return errors;
        },
        lastNameErrors() {
            let errors = [];
            if (!this.$v.formRegisterView2.lastName.$dirty) {
                return errors;
            }
            if (!this.$v.formRegisterView2.lastName.required) {
                errors.push("Ingresa tus apellidos.");
            }
            if (!this.$v.formRegisterView2.lastName.minLength) {
                errors.push("Ingresa al menos 3 caracteres.");
            }
            if (!this.$v.formRegisterView2.lastName.maxLength) {
                errors.push("Ingresa máximo 20 caracteres");
            }
            if (!this.$v.formRegisterView2.lastName.fullName) {
                errors.push("Ingresa solo letras");
            }
            return errors;
        }
    }
};
</script>