<template>
    <div id="customer" class="section">
        <div class="attribute">
            <span>{{fullName}}</span>
        </div>
        <div class="attribute">
            <img :src="picture" alt>
        </div>
        <div class="attribute">
            <a :href="biography" target="_blank">Biografía</a>
        </div>
        <div class="attribute">
            <span>Edad: {{age}}</span>
        </div>
        <div class="attribute">
            <span>{{ email }}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: ["email"],
    data() {
        return {
            name: "Isaac",
            lastName: "Newton",
            birthDate: new Date(1642, 11, 25),
            picture:
                "https://upload.wikimedia.org/wikipedia/commons/8/83/Sir_Isaac_Newton_%281643-1727%29.jpg",
            biography: "https://es.wikipedia.org/wiki/Isaac_Newton"
        };
    },
    computed: {
        fullName() {
            return `${this.name} ${this.lastName}`;
        },
        age() {
            return this.calculateAge(this.birthDate);
        }
    },
    methods: {
        calculateAge(date) {
            let currentDate = new Date();
            let diff = currentDate - date;
            return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
        }
    },
    created() {
        this.$emit("onChangeEmail", "isaac.newton@email.com");
    }
};
</script>

<style scoped>
img {
    width: 100%;
}
</style>
