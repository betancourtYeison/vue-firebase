<template>
    <div id="entrance">
        <advertisements/>
        <customer :email="email" @onChangeEmail="updateEmail"/>
        <tickets/>
        <email :emailDefault="email" @onChangeEmail="updateEmail"/>
        <sign/>
    </div>
</template>

<script>
import Customer from "@/components/Customer.vue";
import Advertisements from "@/components/Advertisements.vue";
import Tickets from "@/components/Tickets.vue";
import Sign from "@/components/Sign.vue";
import Email from "@/components/Email.vue";
export default {
    components: { Customer, Advertisements, Tickets, Sign, Email },
    data() {
        return {
            email: ""
        };
    },
    methods: {
        updateEmail(email) {
            this.email = email;
        }
    }
};
</script>
