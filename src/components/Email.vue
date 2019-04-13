<template>
    <div class="section">
        <div class="attribute">
            <input type="text" v-model="email" @keyup.enter="updateEmail">
        </div>
    </div>
</template>
 
<script>
export default {
    props: ["emailDefault"],
    data() {
        return {
            email: ""
        };
    },
    methods: {
        updateEmail(event) {
            this.$emit("onChangeEmail", event.target.value);
        }
    },
    watch: {
        emailDefault() {
            this.email = this.emailDefault;
        }
    }
};
</script>

<style>
.email {
    text-align: left;
}
</style>
