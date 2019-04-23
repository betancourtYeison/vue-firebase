<template>
    <v-layout justify-center align-center>
        <v-flex xs12 sm8 md6 lg5 xl4>
            <v-card class="elevation-6">
                <v-toolbar color="primary" dark card>
                    <v-toolbar-title>Ingresa tus credenciales</v-toolbar-title>
                </v-toolbar>
                <v-card-text class="subheading" text-xs-center>Ingresa con tu red social preferida</v-card-text>
                <v-card-text>
                    <v-layout justify-center>
                        <a @click="signIn('facebook')" class="mx-3">
                            <v-avatar tile :size="40">
                                <img
                                    alt="Ingreso Facebook"
                                    src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path d='M483.7 0H28.3C12.7 0 0 12.7 0 28.3v455.5C0 499.3 12.7 512 28.3 512h245.2V314H207v-77.5h66.5v-57c0-66.1 40.4-102.1 99.4-102.1 28.3 0 52.5 2.1 59.6 3v69.1h-40.7c-32.1 0-38.3 15.3-38.3 37.6v49.4h76.7l-10 77.5h-66.7v198h130.2c15.6 0 28.3-12.7 28.3-28.3V28.3C512 12.7 499.3 0 483.7 0z' fill='%234267b2'/><path d='M353.5 512V314h66.8l10-77.5h-76.8v-49.4c0-22.4 6.2-37.6 38.3-37.6h40.7V80.4c-7.1-.9-31.4-3-59.6-3-59 0-99.4 36-99.4 102.1v57H207V314h66.5v198h80z' fill='%23fff'/></svg>"
                                >
                            </v-avatar>
                        </a>
                        <a @click="signIn('google')" class="mx-3">
                            <v-avatar tile :size="40">
                                <img
                                    alt="Ingreso Google"
                                    src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path fill='%23ea4335' d='M261.1 0C161 0 74.5 57.4 32.3 141l85.5 66.3c20.1-60.5 76.6-105.5 143.2-105.5 37.6 0 71.3 12.9 97.9 38.3l73.4-73.4C388.1 25.4 330.1 0 261.1 0z'/><path fill='%23fbbc05' d='M117.9 207.4L32.3 141C15 175.6 5.1 214.7 5.1 256s9.9 80.4 27.2 115l85.5-66.3c-5.1-15.4-8-31.8-8-48.6 0-17 3-33.4 8.1-48.7z'/><path fill='%2334a853' d='M347.8 385.7c-22.9 15.4-52.2 24.4-86.7 24.4-66.7 0-123.1-45-143.2-105.5L32.3 371C74.5 454.6 161 512 261.1 512c69.1 0 127.1-22.9 169.4-62l-82.7-64.3z'/><path fill='%234285f4' d='M502.2 209.5H261.1v99h137.8c-5.9 32-24 59.1-51.1 77.3l82.7 64.2c48.4-44.6 76.3-110.2 76.3-188.2.1-18.1-1.5-35.6-4.6-52.3z'/></svg>"
                                >
                            </v-avatar>
                        </a>
                        <a @click="signIn('github')" class="mx-3">
                            <v-avatar tile :size="40">
                                <img
                                    alt="Ingreso Github"
                                    src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path d='M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 6c-3.313 0-6 2.686-6 6 0 2.651 1.719 4.9 4.104 5.693.3.056.396-.13.396-.289v-1.117c-1.669.363-2.017-.707-2.017-.707-.272-.693-.666-.878-.666-.878-.544-.373.041-.365.041-.365.603.042.92.619.92.619.535.917 1.403.652 1.746.499.054-.388.209-.652.381-.802-1.333-.152-2.733-.667-2.733-2.965 0-.655.234-1.19.618-1.61-.062-.153-.268-.764.058-1.59 0 0 .504-.161 1.65.615.479-.133.992-.199 1.502-.202.51.002 1.023.069 1.503.202 1.146-.776 1.648-.615 1.648-.615.327.826.121 1.437.06 1.588.385.42.617.955.617 1.61 0 2.305-1.404 2.812-2.74 2.96.216.186.412.551.412 1.111v1.646c0 .16.096.347.4.288 2.383-.793 4.1-3.041 4.1-5.691 0-3.314-2.687-6-6-6z'/></svg>"
                                >
                            </v-avatar>
                        </a>
                    </v-layout>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-text
                    class="subheading"
                    text-xs-center
                >Ingresa con una cuenta de email y contraseña</v-card-text>
                <v-card-text>
                    <v-text-field
                        autofocus
                        label="Email"
                        v-model="formLogin.email"
                        :error-messages="emailErrors"
                        @blur="$v.formLogin.email.$touch()"
                    ></v-text-field>
                    <v-text-field
                        label="Contraseña"
                        type="password"
                        @keyup.enter="signIn('email')"
                        v-model="formLogin.password"
                        :error-messages="passwordErrors"
                        @blur="$v.formLogin.password.$touch()"
                    ></v-text-field>
                </v-card-text>
                <v-card-text>
                    <v-layout justify-end>
                        <v-btn
                            @click="signIn('email')"
                            :disabled="$v.formLogin.$invalid"
                            color="secondary"
                        >Ingresar</v-btn>
                    </v-layout>
                </v-card-text>
                <v-card-actions>
                    <v-btn
                        @click="requestPassword = true"
                        flat
                        color="secondary"
                        class="text-none"
                    >¿Olvidaste tu contraseña?</v-btn>
                </v-card-actions>
                <v-card-actions>
                    <v-btn
                        :to="{ name: 'register' }"
                        flat
                        color="secondary"
                        class="text-none"
                    >¿No tienes cuenta? Regístrate</v-btn>
                </v-card-actions>
            </v-card>
            <v-dialog v-model="requestPassword" persistent :overlay="false" max-width="400px">
                <v-card>
                    <v-toolbar color="primary" dark card>
                        <v-toolbar-title>Reestablecer Contraseña</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text
                        class="subheading"
                    >Ingresa la dirección de email con la cual te registraste.</v-card-text>
                    <v-card-text>
                        <v-text-field
                            label="Email"
                            v-model="emailRequest"
                            :error-messages="emailRequestErrors"
                            @keyup.enter="sentRequestPassword"
                            @blur="$v.emailRequest.$touch()"
                        ></v-text-field>
                    </v-card-text>
                    <v-card-text>
                        <v-layout>
                            <v-flex xs6>
                                <v-layout justify-start>
                                    <v-btn @click="requestPassword = false">Cancelar</v-btn>
                                </v-layout>
                            </v-flex>
                            <v-flex xs6>
                                <v-layout justify-end>
                                    <v-btn
                                        @click="sentRequestPassword"
                                        color="secondary"
                                        :disabled="$v.emailRequest.$invalid"
                                    >Enviar</v-btn>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-dialog>
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
import { auth, firebase } from "@/firebase";
import { mapMutations } from "vuex";
export default {
    data() {
        return {
            formLogin: {
                email: "",
                password: ""
            },
            requestPassword: false,
            emailRequest: ""
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
        },
        emailRequest: {
            required,
            email
        }
    },
    methods: {
        ...mapMutations([
            "showBusy",
            "showError",
            "showSuccess",
            "showWarning",
            "hideBusy"
        ]),
        async signIn(method) {
            switch (method) {
                case "email":
                    this.signInWithEmailAndPassword();
                    break;
                case "facebook":
                    this.signInWithProvider(
                        new firebase.auth.FacebookAuthProvider()
                    );
                    break;
                case "google":
                    this.signInWithProvider(
                        new firebase.auth.GoogleAuthProvider()
                    );
                    break;
                case "github":
                    this.signInWithProvider(
                        new firebase.auth.GithubAuthProvider()
                    );
                    break;

                default:
                    break;
            }
        },
        async signInWithEmailAndPassword() {
            if (this.$v.formLogin.$invalid) {
                this.$v.formLogin.$touch();
                return;
            }
            try {
                this.showBusy({
                    title: "Validando credenciales",
                    message: "Estamos validando tu información"
                });

                await auth.signInWithEmailAndPassword(
                    this.formLogin.email,
                    this.formLogin.password
                );
            } catch (error) {
                switch (error.code) {
                    case "auth/user-not-found":
                    case "auth/wrong-password":
                        this.showWarning(
                            "Usuario no válido. Revisa tu correo y contraseña."
                        );
                        break;
                    default:
                        this.showError(
                            "Ocurrió un error validando la información."
                        );
                        break;
                }
            } finally {
                this.hideBusy();
            }
        },
        async signInWithProvider(provider) {
            provider.setCustomParameters({
                display: "popup"
            });

            try {
                auth.languageCode = "es_CO";
                await auth.signInWithPopup(provider);
            } catch (error) {
                this.showError(
                    "Ocurrió un error validando tu información. Inténtalo más tarde."
                );
            }
        },
        async sentRequestPassword() {
            this.requestPassword = false;
            this.showBusy({
                title: "Enviando Solicitud",
                message:
                    "Enviando solicitud de restablecimiento de contraseña..."
            });

            try {
                await auth.sendPasswordResetEmail(this.emailRequest);
                this.showSuccess(
                    "Se ha enviado la solicitud de restablecimiento de contraseña."
                );
            } catch (error) {
                this.showError("Ocurrió un error enviando la solicitud.");
            } finally {
                this.hideBusy();
            }
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
        },
        emailRequestErrors() {
            let errors = [];
            if (!this.$v.emailRequest.$dirty) {
                return errors;
            }
            if (!this.$v.emailRequest.required) {
                errors.push("Ingresa tu email.");
            }
            if (!this.$v.emailRequest.email) {
                errors.push("Ingresa un email válido.");
            }
            return errors;
        }
    }
};
</script>