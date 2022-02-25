<!-- eslint-disable prettier/prettier -->

<template>
  <section>Filter</section>
  <section>
        <base-card>
        <div class="controls">
            <base-button mode="outline">Refresh</base-button>
            <base-button link to="/register">Register as coach</base-button>
        </div>
        <ul v-if="hasCoaches">
            <!-- <li v-for="coach in filteredCoaches" :key="coach.id">
                {{ coach.firstName}}
            </li> -->
            <coach-item 
            v-for="coach in filteredCoaches" 
            :key="coach.id" 
            :id="coach.id"
            :first-name="coach.firstName"
            :last-name="coach.lastName"
            :rate="coach.hourlyRate"
            :areas="coach.areas"></coach-item>
        </ul>
        <h1 v-else>No coaches found</h1>
        </base-card>
    </section>
</template>
<!-- eslint-disable prettier/prettier -->

<script>
import CoachItem from '@/components/coaches/CoachItem';
export default {
    components: {
        CoachItem
    },
    computed:{
        filteredCoaches() {
            return this.$store.getters['coaches/coaches'];
        },
        hasCoaches() {
            return this.$store.getters['coaches/hasCoaches'];
        }
    },
    data() {
        return {
            selected: null
        }
    },
    created() {
        console.log(this);
    }
}
</script>
<!-- eslint-disable -->

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>