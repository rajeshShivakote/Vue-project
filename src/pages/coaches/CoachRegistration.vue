<!-- eslint-disable -->

<template>
<base-card>
    <section>
        <h2>Register as a coach now!</h2>
        <coach-form @save-data="saveData"></coach-form>
    </section>
</base-card>
</template>
<!-- eslint-disable prettier/prettier -->

<script>
import CoachForm from '@/components/coaches/CoachForm'
export default {
    components: {
        CoachForm
    },
    methods: {
        saveData(formData) {
            this.$store.dispatch('coaches/registerCoach', formData);
            // this.$router.push('/coaches')
            this.$router.replace('/coaches')

        }
    }
}
</script>
<style scoped>

</style>