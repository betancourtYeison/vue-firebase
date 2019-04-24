<template>
    <v-layout text-xs-center align-start justify-center class="mt-5">
        <v-card v-if="user" class="elevation-6" max-width="250">
            <v-btn
                v-if="ownProfile"
                @click="editing = !editing"
                color="secondary"
                class="elevation-1"
                fab
                small
                absolute
                top
                right
            >
                <v-fade-transition mode="out-in">
                    <v-icon v-if="!editing" :key="1">edit</v-icon>
                    <v-icon v-else :key="2">close</v-icon>
                </v-fade-transition>
            </v-btn>
            <v-card-text>
                <v-layout justify-center>
                    <v-btn @click="editFullName" v-if="editing" color="secondary" flat icon small>
                        <v-icon>edit</v-icon>
                    </v-btn>
                    <div class="ma-2">{{user.name + ' ' + user.lastName}}</div>
                </v-layout>
                <!-- <img class="ma-2 picture" :src="require('@/assets/profile.png')" alt="profile"> -->
                <v-img class="ma-2 picture" :src="profilePicture" alt="Foto de Perfil">
                    <v-layout fill-height align-end justify-end>
                        <v-btn
                            v-if="editing"
                            :to="{name: 'profile-picture'}"
                            color="white"
                            outline
                            icon
                            large
                        >
                            <v-icon>edit</v-icon>
                        </v-btn>
                    </v-layout>
                </v-img>
                <v-layout justify-center>
                    <v-btn
                        @click="editDescription"
                        v-if="editing"
                        color="secondary"
                        flat
                        icon
                        small
                    >
                        <v-icon>edit</v-icon>
                    </v-btn>
                    <div class="ma-2 description">
                        <span v-if="user.description">{{user.description}}</span>
                        <span v-else>Agrega una descripción</span>
                    </div>
                </v-layout>
                <v-layout justify-center>
                    <v-btn @click="editBiography" v-if="editing" color="secondary" flat icon small>
                        <v-icon>edit</v-icon>
                    </v-btn>
                    <div class="ma-2">
                        <a
                            v-if="user.biography"
                            class="ma-2 link"
                            :href="user.biography"
                            target="_blank"
                        >Biografía</a>
                        <span v-else>Agrega una Biografía</span>
                    </div>
                </v-layout>
            </v-card-text>
        </v-card>
        <!-- Fullname Dialogo -->
        <v-dialog v-model="editingFullName" max-width="400px">
            <v-card>
                <v-toolbar color="primary" dark card>
                    <v-toolbar-title>Ingresa tus Nombres y Apellidos</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-text-field
                        v-model="formFullName.name"
                        :error-messages="nameErrors"
                        @blur="$v.formFullName.name.$touch()"
                        autofocus
                        label="Nombre"
                    ></v-text-field>
                    <v-text-field
                        v-model="formFullName.lastName"
                        :error-messages="lastNameErrors"
                        @blur="$v.formFullName.lastName.$touch()"
                        label="Apellidos"
                    ></v-text-field>
                </v-card-text>
                <v-card-text>
                    <v-layout>
                        <v-flex xs6>
                            <v-layout justify-start>
                                <v-btn @click="editingFullName = false">Cancelar</v-btn>
                            </v-layout>
                        </v-flex>
                        <v-flex xs6>
                            <v-layout justify-end>
                                <v-btn
                                    @click="saveFullName()"
                                    :disabled="$v.formFullName.$invalid"
                                    color="secondary"
                                >Guardar</v-btn>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-card>
        </v-dialog>
        <!-- Description Dialogo -->
        <v-dialog v-model="editingDescription" max-width="400px">
            <v-card>
                <v-toolbar color="primary" dark card>
                    <v-toolbar-title>Ingresa una descripción</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-textarea
                        label="Agreda una descripción"
                        v-model="formDescription.description"
                        counter="300"
                        autofocus
                        :error-messages="descriptionErrors"
                    ></v-textarea>
                </v-card-text>
                <v-card-text>
                    <v-layout>
                        <v-flex xs6>
                            <v-layout justify-start>
                                <v-btn @click="editingDescription = false">Cancelar</v-btn>
                            </v-layout>
                        </v-flex>
                        <v-flex xs6>
                            <v-layout justify-end>
                                <v-btn
                                    @click="saveDescription()"
                                    :disabled="$v.formDescription.$invalid"
                                    color="secondary"
                                >Guardar</v-btn>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-card>
        </v-dialog>
        <!-- Biography Dialogo -->
        <v-dialog v-model="editingBiography" max-width="400px">
            <v-card>
                <v-toolbar color="primary" dark card>
                    <v-toolbar-title>Ingresa tu Biografía</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-text-field
                        v-model="formBiography.biography"
                        :error-messages="biographyErrors"
                        @blur="$v.formBiography.biography.$touch()"
                        autofocus
                        label="Biografía"
                    ></v-text-field>
                </v-card-text>
                <v-card-text>
                    <v-layout>
                        <v-flex xs6>
                            <v-layout justify-start>
                                <v-btn @click="editingBiography = false">Cancelar</v-btn>
                            </v-layout>
                        </v-flex>
                        <v-flex xs6>
                            <v-layout justify-end>
                                <v-btn
                                    @click="saveBiography()"
                                    :disabled="$v.formBiography.$invalid"
                                    color="secondary"
                                >Guardar</v-btn>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
import { required, minLength, maxLength, url } from "vuelidate/lib/validators";
import { fullName } from "@/utils/validations";
import { mapMutations, mapGetters } from "vuex";
// import store from "@/store";
import { auth, db } from "@/firebase";
export default {
    data() {
        return {
            user: null,
            editing: false,
            editingFullName: false,
            editingDescription: false,
            editingBiography: false,
            formFullName: {
                name: "",
                lastName: ""
            },
            formDescription: {
                description: ""
            },
            formBiography: {
                biography: ""
            }
        };
    },
    validations: {
        formFullName: {
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
        formDescription: {
            description: {
                maxLength: maxLength(300)
            }
        },
        formBiography: {
            biography: {
                url
            }
        }
    },
    computed: {
        ...mapGetters("session", ["profilePicture"]),
        ownProfile() {
            return this.user && this.user.uid === auth.currentUser.uid;
        },
        nameErrors() {
            let errors = [];
            if (!this.$v.formFullName.name.$dirty) {
                return errors;
            }
            if (!this.$v.formFullName.name.required) {
                errors.push("Ingresa tus nombres.");
            }
            if (!this.$v.formFullName.name.minLength) {
                errors.push("Ingresa al menos 3 caracteres.");
            }
            if (!this.$v.formFullName.name.maxLength) {
                errors.push("Ingresa máximo 20 caracteres");
            }
            if (!this.$v.formFullName.name.fullName) {
                errors.push("Ingresa solo letras");
            }
            return errors;
        },
        lastNameErrors() {
            let errors = [];
            if (!this.$v.formFullName.lastName.$dirty) {
                return errors;
            }
            if (!this.$v.formFullName.lastName.required) {
                errors.push("Ingresa tus apellidos.");
            }
            if (!this.$v.formFullName.lastName.minLength) {
                errors.push("Ingresa al menos 3 caracteres.");
            }
            if (!this.$v.formFullName.lastName.maxLength) {
                errors.push("Ingresa máximo 20 caracteres");
            }
            if (!this.$v.formFullName.lastName.fullName) {
                errors.push("Ingresa solo letras");
            }
            return errors;
        },
        descriptionErrors() {
            let errors = [];
            if (!this.$v.formDescription.description.$dirty) {
                return errors;
            }
            if (!this.$v.formDescription.description.maxLength) {
                errors.push("Ingresa máximo 300 caracteres");
            }
            return errors;
        },
        biographyErrors() {
            let errors = [];
            if (!this.$v.formBiography.biography.$dirty) {
                return errors;
            }
            if (!this.$v.formBiography.biography.maxLength) {
                errors.push("Ingresa una url válida");
            }
            return errors;
        }
    },
    created() {
        this.getUser();
    },
    watch: {
        $route() {
            this.getUser();
        }
    },
    methods: {
        ...mapMutations(["showBusy", "showError", "showSuccess", "hideBusy"]),
        ...mapMutations("session", ["updateData"]),
        async getUser() {
            let username = this.$route.params.username.toLowerCase();
            this.showBusy({
                title: "Consultando información",
                message: "Cargando datos..."
            });
            try {
                let usernameDoc = await db
                    .collection("usernames")
                    .doc(username)
                    .get();
                if (usernameDoc.exists) {
                    let usernameData = usernameDoc.data();
                    let userDoc = await db
                        .collection("users")
                        .doc(usernameData.uid)
                        .get();
                    if (userDoc.exists) {
                        this.user = userDoc.data();
                    } else {
                        this.$router.push({ name: "404" });
                    }
                } else {
                    this.$router.push({ name: "404" });
                }
            } catch (error) {
                this.$router.push({ name: "404" });
            } finally {
                this.hideBusy();
            }
        },
        editFullName() {
            this.formFullName.name = this.user.name;
            this.formFullName.lastName = this.user.lastName;
            this.editingFullName = true;
        },
        async saveData(data) {
            this.showBusy({
                title: "Actualizando información",
                message: "Estamos guardando tu nueva información..."
            });

            try {
                await db
                    .collection("users")
                    .doc(this.user.uid)
                    .update(data);
                this.updateData(data);
                this.user = { ...this.user, ...data };
                this.editing = false;
                this.showSuccess("Se actualizó la información correctamente.");
            } catch (error) {
                this.showError(
                    "Ocurrió un error actualizando tus datos. Inténtalo más tarde."
                );
            } finally {
                this.hideBusy();
            }
        },
        async saveFullName() {
            if (
                this.formFullName.name === this.user.name &&
                this.formFullName.lastName === this.user.lastName
            ) {
                this.editingFullName = false;
                return;
            }
            let fullName = {
                name: this.formFullName.name,
                lastName: this.formFullName.lastName
            };
            await this.saveData(fullName);
            this.editingFullName = false;
        },
        editDescription() {
            this.formDescription.description = this.user.description || "";
            this.editingDescription = true;
        },
        async saveDescription() {
            if (this.formDescription.description === this.user.description) {
                this.editingDescription = false;
                return;
            }
            await this.saveData({
                description: this.formDescription.description
            });
            this.editingDescription = false;
        },
        editBiography() {
            this.formBiography.biography = this.user.biography || "";
            this.editingBiography = true;
        },
        async saveBiography() {
            if (this.formBiography.biography === this.user.biography) {
                this.editingBiography = false;
                return;
            }
            await this.saveData({ biography: this.formBiography.biography });
            this.editingBiography = false;
        }
    }
    // beforeRouteEnter(to, from, next) {
    //     if (store.state.session.user) {
    //         next();
    //     } else {
    //         next({ name: "login" });
    //     }
    // }
};
</script>

<style>
.picture {
    width: 200px;
    height: 100%;
}
.description {
    text-align: justify;
}
.link {
    text-decoration: none;
    font-size: 1rem;
    color: #0058be;
}
</style>
