<template>
    <v-layout justify-center align-center>
        <v-flex xs12 sm8 md6 lg5 xl4>
            <v-slide-y-transition mode="out-in" @enter="enter">
                <v-card v-if="registerView === 1" :key="1" class="elevation-6">
                    <v-toolbar color="primary" dark card>
                        <v-toolbar-title>Regístrate</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text
                        class="subheading"
                        text-xs-center
                    >Registrate con tu red social preferida</v-card-text>
                    <v-card-text>
                        <v-layout justify-center>
                            <a @click="nextView(1, 'facebook.com')" class="mx-3">
                                <v-avatar tile :size="40">
                                    <img
                                        alt="Ingreso Facebook"
                                        src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path d='M483.7 0H28.3C12.7 0 0 12.7 0 28.3v455.5C0 499.3 12.7 512 28.3 512h245.2V314H207v-77.5h66.5v-57c0-66.1 40.4-102.1 99.4-102.1 28.3 0 52.5 2.1 59.6 3v69.1h-40.7c-32.1 0-38.3 15.3-38.3 37.6v49.4h76.7l-10 77.5h-66.7v198h130.2c15.6 0 28.3-12.7 28.3-28.3V28.3C512 12.7 499.3 0 483.7 0z' fill='%234267b2'/><path d='M353.5 512V314h66.8l10-77.5h-76.8v-49.4c0-22.4 6.2-37.6 38.3-37.6h40.7V80.4c-7.1-.9-31.4-3-59.6-3-59 0-99.4 36-99.4 102.1v57H207V314h66.5v198h80z' fill='%23fff'/></svg>"
                                    >
                                </v-avatar>
                            </a>
                            <a @click="nextView(1, 'google.com')" class="mx-3">
                                <v-avatar tile :size="40">
                                    <img
                                        alt="Ingreso Google"
                                        src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path fill='%23ea4335' d='M261.1 0C161 0 74.5 57.4 32.3 141l85.5 66.3c20.1-60.5 76.6-105.5 143.2-105.5 37.6 0 71.3 12.9 97.9 38.3l73.4-73.4C388.1 25.4 330.1 0 261.1 0z'/><path fill='%23fbbc05' d='M117.9 207.4L32.3 141C15 175.6 5.1 214.7 5.1 256s9.9 80.4 27.2 115l85.5-66.3c-5.1-15.4-8-31.8-8-48.6 0-17 3-33.4 8.1-48.7z'/><path fill='%2334a853' d='M347.8 385.7c-22.9 15.4-52.2 24.4-86.7 24.4-66.7 0-123.1-45-143.2-105.5L32.3 371C74.5 454.6 161 512 261.1 512c69.1 0 127.1-22.9 169.4-62l-82.7-64.3z'/><path fill='%234285f4' d='M502.2 209.5H261.1v99h137.8c-5.9 32-24 59.1-51.1 77.3l82.7 64.2c48.4-44.6 76.3-110.2 76.3-188.2.1-18.1-1.5-35.6-4.6-52.3z'/></svg>"
                                    >
                                </v-avatar>
                            </a>
                            <a @click="nextView(1, 'github.com')" class="mx-3">
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
                    >Registrate con una cuenta de email y contraseña</v-card-text>
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
                            @keyup.enter="nextView(1, 'password')"
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
                                        @click="nextView(1, 'password')"
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
                            autofocus
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
                                        @click="nextView(3)"
                                        :disabled="$v.formRegisterView3.$invalid"
                                        color="secondary"
                                    >Siguiente</v-btn>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>

                <v-card v-if="registerView === 4" :key="4" class="elevation-6">
                    <v-toolbar color="primary" dark card>
                        <v-toolbar-title>Ingresa un Nombre de Usuario</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-text-field
                            v-model="formRegisterView4.username"
                            :error-messages="usernameErrors"
                            @keyup.enter="register"
                            @blur="$v.formRegisterView4.username.$touch()"
                            autofocus
                            label="Nombre de Usuario"
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
                                        @click="register"
                                        :disabled="$v.formRegisterView4.$invalid"
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
    sameAs,
    alphaNum
} from "vuelidate/lib/validators";
import { fullName } from "@/utils/validations";
import { auth, firebase, db } from "@/firebase";
import { mapMutations, mapGetters } from "vuex";
export default {
    data() {
        return {
            method: "password",
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
            },
            formRegisterView4: {
                username: ""
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
        },
        formRegisterView4: {
            username: {
                required,
                minLength: minLength(5),
                maxLength: maxLength(25),
                alphaNum
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
        if (auth.currentUser && !this.$store.state.session.user) {
            this.method = auth.currentUser.providerData[0].providerId;
            this.registerView = 2;
            this.$store.commit("showInfo", "Completa tus datos de registro.");
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
        ...mapMutations("session", ["updateUser"]),
        backView() {
            this.registerView--;
        },
        nextView(view, method) {
            switch (view) {
                case 1:
                    if (
                        this.$v.formRegisterView1.$invalid &&
                        method === "password"
                    ) {
                        this.$v.formRegisterView1.$touch();
                        return;
                    } else {
                        this.method = method;
                        this.registerView++;
                    }
                    break;
                case 2:
                    if (this.$v.formRegisterView2.$invalid) {
                        this.$v.formRegisterView2.$touch();
                        return;
                    }
                    this.registerView++;
                    break;
                case 3:
                    if (this.$v.formRegisterView3.$invalid) {
                        this.$v.formRegisterView3.$touch();
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
        async register() {
            if (this.$v.formRegisterView4.$invalid) {
                return;
            }
            let usernameExists = await db
                .collection("usernames")
                .doc(this.formRegisterView4.username.toLowerCase())
                .get();
            if (usernameExists.exists) {
                this.showWarning(
                    `El nombre de usuario ${
                        this.formRegisterView4.username
                    }, ya está tomado, selecciona uno diferente`
                );
                return;
            }
            switch (this.method) {
                case "password":
                    this.registerWithEmailAndPassword();
                    break;
                case "facebook.com":
                    this.registerWithProvider(
                        new firebase.auth.FacebookAuthProvider()
                    );
                    break;
                case "google.com":
                    this.registerWithProvider(
                        new firebase.auth.GoogleAuthProvider()
                    );
                    break;
                case "github.com":
                    this.registerWithProvider(
                        new firebase.auth.GithubAuthProvider()
                    );
                    break;

                default:
                    break;
            }
        },
        async saveUser(uid) {
            let user = {
                uid,
                username: this.formRegisterView4.username,
                name: this.formRegisterView2.name,
                lastName: this.formRegisterView2.lastName,
                birthDate: new Date(this.formRegisterView3.birthDate),
                gender: "M",
                picture:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Sir_Isaac_Newton_%281643-1727%29.jpg/220px-Sir_Isaac_Newton_%281643-1727%29.jpg"
            };

            let username = {
                username: this.formRegisterView4.username,
                uid
            };

            let batch = db.batch();

            batch.set(db.collection("users").doc(user.uid), user);
            batch.set(
                db
                    .collection("usernames")
                    .doc(this.formRegisterView4.username.toLowerCase()),
                username
            );

            await batch.commit();

            this.updateUser(user);

            this.showSuccess(this.greeting);
        },
        async registerWithEmailAndPassword() {
            try {
                this.showBusy({
                    title: "Creando Registro",
                    message: "Estamos registrando tu información..."
                });

                let uid = null;

                if (auth.currentUser) {
                    uid = auth.currentUser.uid;
                } else {
                    let credentials = await auth.createUserWithEmailAndPassword(
                        this.formRegisterView1.email,
                        this.formRegisterView1.password1
                    );
                    uid = credentials.user;
                }

                await this.saveUser(uid);

                await auth.currentUser.sendEmailVerification();

                this.$router.push({ name: "verification-email" });
            } catch (error) {
                switch (error.code) {
                    case "auth/email-already-in-use":
                        this.showWarning(
                            "Ya se ha registrado esta dirección de email con anterioridad."
                        );
                        break;
                    default:
                        this.showError(
                            "Ocurrió un error registrando tu cuenta. Inténtalo más tarde."
                        );
                        break;
                }
            } finally {
                this.hideBusy();
            }
        },
        async registerWithProvider(provider) {
            provider.setCustomParameters({
                display: "popup"
            });

            try {
                auth.languageCode = "es_CO";
                let uid = null;
                if (auth.currentUser) {
                    uid = auth.currentUser.uid;
                } else {
                    let credentials = await auth.signInWithPopup(provider);
                    uid = credentials.user;
                }
                await this.saveUser(uid);
                this.$router.push({ name: "home" });
            } catch (error) {
                this.showError(
                    "Ocurrió un error registrando tu cuenta. Inténtalo más tarde."
                );
            }
        }
    },
    computed: {
        ...mapGetters("session", ["greeting"]),
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
        },
        usernameErrors() {
            let errors = [];
            if (!this.$v.formRegisterView4.username.$dirty) {
                return errors;
            }
            if (!this.$v.formRegisterView4.username.required) {
                errors.push("Ingresa tus nombre de usuario.");
            }
            if (!this.$v.formRegisterView4.username.minLength) {
                errors.push("Ingresa al menos 5 caracteres.");
            }
            if (!this.$v.formRegisterView4.username.maxLength) {
                errors.push("Ingresa máximo 25 caracteres");
            }
            if (!this.$v.formRegisterView4.username.alphaNum) {
                errors.push("Ingresa solo letras y números sin espacios");
            }
            return errors;
        }
    }
};
</script>