<template>
    <v-layout justify-center align-start wrap align-content-start>
        <v-flex xs12>
            <v-layout justify-center>
                <v-card max-width="250">
                    <v-toolbar color="primary" dark card>
                        <v-toolbar-title>
                            <span v-if="view === 1">Foto de Perfil Actual</span>
                            <span v-if="view === 2">Vista Previa</span>
                        </v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-layout v-if="view === 1" justify-center>
                            <v-img :src="profilePicture" alt="Foto de Perfil"></v-img>
                        </v-layout>
                        <v-layout v-if="view === 2" justify-center>
                            <div ref="preview" class="preview"></div>
                        </v-layout>
                    </v-card-text>
                    <v-card-text>
                        <v-layout v-if="view === 1" justify-center>
                            <v-btn
                                color="secondary"
                                :to="{ name: 'profile', params: {username: user.username} }"
                            >Regresar</v-btn>
                        </v-layout>
                        <v-layout v-if="view === 2" justify-center>
                            <v-flex xs6>
                                <v-btn @click="cancelUpload">Cancelar</v-btn>
                            </v-flex>
                            <v-flex xs6>
                                <v-btn @click="savePicture" color="secondary">Guardar</v-btn>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-layout>
        </v-flex>
        <v-flex xs12 sm10 md8 lg6 xl4 mt-3>
            <v-card>
                <!-- <v-toolbar color="primary" dark card>
                    <v-toolbar-title>Cargar Foto de Perfil</v-toolbar-title>
                </v-toolbar>-->
                <v-tabs color="primary" dark icons-and-text>
                    <v-tab>
                        Cargar Foto
                        <v-icon>cloud_upload</v-icon>
                    </v-tab>
                    <v-tab-item>
                        <file-pond
                            v-if="view === 1"
                            label-idle="Seleciona o arrasta una imagen..."
                            accepted-file-tupes="image/jpeg, image/png"
                            labelFileTypeNotAllowed="Agrega una imagen .png o .jpg"
                            fileValidateTypeLabelExpectedTypes="Se esperaba {allButLastType} o {lastType}"
                            instant-upload="false"
                            @addfile="uploadPicture"
                        ></file-pond>
                        <v-responsive v-if="view === 2">
                            <img ref="originalPicture" class="editPicture">
                        </v-responsive>
                    </v-tab-item>
                    <v-tab v-if="picturesList.length > 1">
                        Galería
                        <v-icon>photo_library</v-icon>
                    </v-tab>
                    <v-tab-item v-if="picturesList.length > 1">
                        <v-layout wrap justify-start>
                            <v-flex xs6 sm4 lg3 v-for="picture in picturesList" :key="picture.pid">
                                <v-card class="ma-3">
                                    <v-card-text>
                                        <v-img :src="picture.url" alt="Foto Perfil"></v-img>
                                        <v-layout class="mt-3">
                                            <v-flex xs6>
                                                <v-layout justify-start>
                                                    <v-icon
                                                        v-if="picture.url === user.picture"
                                                        color="green"
                                                        medium
                                                    >check_circle</v-icon>
                                                    <v-icon
                                                        v-else
                                                        color="gray"
                                                        @click="selectPicture(picture.url)"
                                                        medium
                                                    >check_circle_outline</v-icon>
                                                </v-layout>
                                            </v-flex>
                                            <v-flex xs6>
                                                <v-layout justify-end>
                                                    <v-icon
                                                        v-if="picture.url !== user.picture"
                                                        @click="confirmDeletePicture(picture)"
                                                        medium
                                                    >delete</v-icon>
                                                </v-layout>
                                            </v-flex>
                                        </v-layout>
                                    </v-card-text>
                                </v-card>
                            </v-flex>
                        </v-layout>
                        <v-dialog v-model="confirmDelete" max-width="400px" persistent>
                            <v-card>
                                <v-card-text
                                    class="title"
                                >La foto se eliminará permanentemente, ¿Deseas Continuar?</v-card-text>
                                <v-btn
                                    color="secondary"
                                    flat
                                    @click="confirmDelete = false"
                                >Cancelar</v-btn>
                                <v-btn color="primary" flat @click="deletePicture">Eliminar</v-btn>
                            </v-card>
                        </v-dialog>
                    </v-tab-item>
                </v-tabs>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import vueFilePond from "vue-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import "filepond/dist/filepond.min.css";
import Cropper from "cropperjs/dist/cropper";
import "cropperjs/dist/cropper.css";
import uuidv4 from "uuid/v4";
import { db, storage } from "@/firebase";

const FilePond = vueFilePond(FilePondPluginFileValidateType);

export default {
    data() {
        return {
            view: 1,
            cropper: null,
            picturesList: [],
            confirmDelete: false,
            pictureDelete: null
        };
    },
    components: {
        FilePond
    },
    computed: {
        ...mapState("session", ["user"]),
        ...mapGetters("session", ["profilePicture"])
    },
    created() {
        this.getPicturesList();
    },
    methods: {
        ...mapMutations(["showBusy", "showError", "showSuccess", "hideBusy"]),
        ...mapMutations("session", ["updateData"]),
        async getPicturesList() {
            this.showBusy({
                title: "Consultando Galería",
                message: "Recuperando fotos de perfil..."
            });
            try {
                let data = await db
                    .collection("users")
                    .doc(this.user.uid)
                    .collection("profile-picture")
                    .orderBy("date", "desc")
                    .get();
                data.docs.forEach(doc => {
                    this.picturesList.push(doc.data());
                });
            } catch (error) {
                this.showError(
                    "Ocurrió un error recuperando tus fotos de perfil. Inténtalo más tarde."
                );
            } finally {
                this.hideBusy();
            }
        },
        uploadPicture(error, filePond) {
            if (error) {
                this.showError("Ocurrió un error leyendo la foto de perfil.");
                return;
            }
            this.view = 2;
            let reader = new FileReader();
            let vm = this;
            reader.onloadend = () => {
                vm.$refs.originalPicture.src = reader.result;
                vm.cropPicture();
            };
            if (filePond && filePond.file) {
                reader.readAsDataURL(filePond.file);
            }
        },
        cropPicture() {
            this.cropper = new Cropper(this.$refs.originalPicture, {
                preview: this.$refs.preview,
                aspectRatio: 1,
                modal: false,
                guides: true,
                sized: false,
                zoomable: false,
                highlight: true,
                background: false,
                autoCrop: true
            });
        },
        cancelUpload() {
            this.$refs.originalPicture.src = null;
            this.cropper = null;
            this.view = 1;
        },
        async savePicture() {
            this.showBusy({
                title: "Almacenando Foto de Perfil",
                message: "Actualizando Foto de Perfil..."
            });
            let canvas = this.cropper.getCroppedCanvas();
            let image = canvas.toDataURL("image/jpeg");
            let pictureId = uuidv4();
            try {
                let ref = storage.ref();
                let data = await ref
                    .child(
                        `users/${
                            this.user.uid
                        }/profile-picture/${pictureId}.jpg`
                    )
                    .putString(image, "data_url");
                let url = await data.ref.getDownloadURL();
                let profilePicture = {
                    pid: pictureId,
                    date: new Date(),
                    url,
                    uid: this.user.uid
                };
                await db
                    .collection("users")
                    .doc(this.user.uid)
                    .collection("profile-picture")
                    .doc(pictureId)
                    .set(profilePicture);
                let picture = {
                    picture: url
                };
                await db
                    .collection("users")
                    .doc(this.user.uid)
                    .update(picture);
                this.updateData(picture);
                this.showSuccess("Se actualizó la información correctamente.");
                this.$router.push({
                    name: "profile",
                    params: { username: this.user.username }
                });
            } catch (error) {
                this.showError(
                    "Ocurrió un error almacenando tu foto de perfil. Inténtalo más tarde."
                );
            } finally {
                this.hideBusy();
            }
        },
        async selectPicture(url) {
            this.showBusy({
                title: "Actualizando Foto de Perfil",
                message: "Estableciendo Foto de Perfil..."
            });
            try {
                let picture = {
                    picture: url
                };
                await db
                    .collection("users")
                    .doc(this.user.uid)
                    .update(picture);
                this.updateData(picture);
                this.showSuccess("Se actualizó la información correctamente.");
            } catch (error) {
                this.showError(
                    "Ocurrió un error actualizando tu foto de perfil. Inténtalo más tarde."
                );
            } finally {
                this.hideBusy();
            }
        },
        confirmDeletePicture(picture) {
            this.pictureDelete = picture;
            this.confirmDelete = true;
        },
        async deletePicture() {
            this.showBusy({
                title: "Eliminando Foto de Perfil",
                message: "Se está eliminando la Foto de Perfil..."
            });
            try {
                await db
                    .collection("users")
                    .doc(this.user.uid)
                    .collection("profile-picture")
                    .doc(this.pictureDelete.pid)
                    .delete();
                await storage
                    .ref()
                    .child(
                        `users/${this.user.uid}/profile-picture/${
                            this.pictureDelete.pid
                        }.jpg`
                    )
                    .delete();
                let index = this.picturesList.indexOf(this.pictureDelete);
                this.picturesList.splice(index, 1);
                this.showSuccess("Se elimino la información correctamente.");
                this.confirmDelete = false;
            } catch (error) {
                console.log(error);
                this.showError(
                    "Ocurrió un error eliminando la foto de perfil. Inténtalo más tarde."
                );
            } finally {
                this.hideBusy();
            }
        }
    }
};
</script>

<style>
.filepond--drop-label {
    font-size: 14pt !important;
}
.editPicture {
    width: 100%;
}
.preview {
    width: 200px;
    height: 200px;
    overflow: hidden;
}
</style>
