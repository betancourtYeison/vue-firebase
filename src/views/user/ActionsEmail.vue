<template>
    <v-layout justify-center align-center>
        <v-flex xs12 sm8 md6 lg5 xl4>
            <v-card v-if="email" class="elevation-6">
                <v-toolbar color="primary" dark card>
                    <v-toolbar-title>Nueva contraseña</v-toolbar-title>
                </v-toolbar>
                <v-card-text class="subheading">Ingresa una nueva contraseña para {{email}}</v-card-text>
                <v-card-text>
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
                        @blur="$v.formRegisterView1.password2.$touch()"
                        label="Repetir Contraseña"
                        type="password"
                    ></v-text-field>
                </v-card-text>
                <v-card-text>
                    <v-layout justify-end>
                        <v-btn
                            @click="changePassword"
                            :disabled="$v.formRegisterView1.$invalid"
                            color="secondary"
                        >Aceptar</v-btn>
                    </v-layout>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>  


<script>
import {
    required,
    minLength,
    maxLength,
    sameAs
} from "vuelidate/lib/validators";
import { auth } from "@/firebase";
import { mapMutations, mapGetters } from "vuex";
export default {
    data() {
        return {
            oobCode: "",
            email: "",
            formRegisterView1: {
                password1: "",
                password2: ""
            }
        };
    },
    validations: {
        formRegisterView1: {
            password1: {
                required,
                minLength: minLength(6),
                maxLength: maxLength(20)
            },
            password2: {
                required,
                sameAs: sameAs("password1")
            }
        }
    },
    methods: {
        ...mapMutations([
            "showBusy",
            "showError",
            "showInfo",
            "showSuccess",
            "hideBusy"
        ]),
        ...mapMutations("session", ["updateUser"]),
        async validate() {
            let { mode, oobCode } = this.$route.query;
            this.oobCode = oobCode;
            switch (mode) {
                case "verifyEmail":
                    this.showBusy({
                        title: "Verificando código",
                        message: "Validando el código de verificación..."
                    });
                    try {
                        await auth.applyActionCode(this.oobCode);
                        this.showSuccess(
                            "Email validado con éxito. Ingresas tus credenciales para continuar."
                        );
                        this.$router.push({ name: "login" });
                    } catch (error) {
                        this.showError(
                            "No fue posible validar tu dirección de email."
                        );
                    } finally {
                        this.hideBusy();
                    }
                    break;
                case "resetPassword":
                    this.showBusy({
                        title: "Verificando código",
                        message:
                            "Validando el código para el restablecimiento de contraseña..."
                    });
                    try {
                        this.email = await auth.verifyPasswordResetCode(
                            this.oobCode
                        );
                        this.showInfo(
                            `Ingresa una nueva contraseña para ${this.email}`
                        );
                    } catch (error) {
                        this.showError(
                            "No fue posible leer el código de restablecimiento de contraseña."
                        );
                    } finally {
                        this.hideBusy();
                    }
                    break;
                default:
                    break;
            }
        },
        async changePassword() {
            this.showBusy({
                title: "Estableciendo Contraseña",
                message: "Cambiando contraseña..."
            });

            try {
                await auth.confirmPasswordReset(
                    this.oobCode,
                    this.formRegisterView1.password1
                );

                await auth.signInWithEmailAndPassword(
                    this.email,
                    this.formRegisterView1.password1
                );

                this.showSuccess(
                    `${
                        this.greeting
                    }, tu contraseña ha sido cambiada existosamente`
                );
                this.$router.push({ name: "home" });
            } catch (error) {
                this.showError("No fue posible cambiar la contraseña.");
            } finally {
                this.hideBusy();
            }
        }
    },
    created() {
        this.validate();
    },
    computed: {
        ...mapGetters("session", ["greeting"]),
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
        }
    }
};
</script>