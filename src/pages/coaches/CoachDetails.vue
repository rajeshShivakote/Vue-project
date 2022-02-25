<!-- eslint-disable -->

<template>
    <section>
        <base-card>
            <h2>{{ fullName }}</h2>
            <h3>{{ rate }}/hour</h3>
        </base-card>
    </section>
    <section>
        <base-card>
         <header>
            <h2>Interested ? Reach out now!</h2>
            <base-button link :to="contactLink">Contact</base-button>
        </header>
        <router-link></router-link>
        </base-card>
    </section>
    <section>
        <base-card>
            <base-badge v-for="area in areas" :key="area" :type="area" :title="area"></base-badge>
            <p>{{ description }}</p>
        </base-card>
    </section>
</template>
<!-- eslint-disable -->
<script>
    export default {
        data() {
            return{
                selectedCoach: null
            };
        },
        created() {
            // alert('asdf');
            console.log(this.$state);
            this.selectedCoach = this.$state.getters['coaches/coaches'].find((coach)=> coach.id === this.id)
        }
        // props: ['id'],
        // computed:{
        //     fullName() {
        //         return this.selectedCoach.firstName +' '+ this.selectedCoach.lastName;
        //     },
        //     contactLink() {
        //         return this.$route.path+"/"+this.id+"/contact";
        //     },
        //     areas() {
        //         return this.selectedCoach.areas;
        //     },
        //     rate() {
        //         return this.selectedCoach.hourlyRate;
        //     },
        //     description() {
        //         return this.selectedCoach.description;
        //     }
        // }
        
    }
</script>