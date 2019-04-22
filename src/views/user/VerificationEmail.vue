<template>
    <v-layout justify-center align-center>
        <v-flex xs12 sm8 md6 lg5 xl4>
            <v-card>
                <v-toolbar color="primary" dark card>
                    <v-toolbar-title>Confirma tu dirección de correo</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <span
                        class="subheading"
                    >Te hemos enviado un correo de verificación a {{currentUser.email}}</span>
                </v-card-text>
                <v-card-text>
                    <v-btn @click="resendEmail" color="secondary">Reenviar Email</v-btn>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import { auth } from "@/firebase";
import { mapMutations } from "vuex";
export default {
    methods: {
        ...mapMutations(["showError", "showSuccess"]),
        async resendEmail() {
            try {
                await auth.currentUser.sendEmailVerification();
                this.showSuccess(
                    "Te hemos enviado un nuevo correo de verificación."
                );
                this.$router.push({ name: "home" });
            } catch (error) {
                this.showError(
                    "Ocurrió un error enviando el email de verificación. Inténtalo nuevamente."
                );
            }
        }
    },
    computed: {
        currentUser() {
            return auth.currentUser;
        }
    }
};
</script>