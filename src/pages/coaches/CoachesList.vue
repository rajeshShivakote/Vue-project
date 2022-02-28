<!-- eslint-disable prettier/prettier -->

<template>
<div>
  <base-dialog :show="!!error" title="An error occurred!" @close="handleError">
    <p>{{ error }}</p>
  </base-dialog>
  <section>
      <coach-filter @change-filter="setFilter"></coach-filter>
  </section>
  <section>
        <base-card>
        <div class="controls">
            <base-button mode="outline" @click="loadCoaches(true)">Refresh</base-button>
            <base-button link v-if="!isCoach" to="/register">Register as coach</base-button>
        </div>
        <div v-if="isLoading">
            <base-spinner></base-spinner>
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
    </div>
</template>
<!-- eslint-disable prettier/prettier -->

<script>
import CoachItem from '@/components/coaches/CoachItem';
import CoachFilter from '@/components/coaches/CoachFilter';
export default {
    components: {
        CoachItem,
        CoachFilter
    },
    data() {
        return {
            isLoading: false,
            error: null,
            selected: null,
            activeFilters: {
                frontend: true,
                backend: true,
                career: true
            }
        }
    },
    computed:{
        isCoach() {
            return this.$store.getters['coaches/isCoach'];
        },
        filteredCoaches() {
            // return this.$store.getters['coaches/coaches'];
            
            const coaches = this.$store.getters['coaches/coaches'];
            console.log(coaches);
            return coaches.filter((coach) => {
               if(this.activeFilters.frontend && coach.areas.includes('frontend')){
                   return true;
               }
               if(this.activeFilters.backend && coach.areas.includes('backend')){
                   return true;
               }
               if(this.activeFilters.career && coach.areas.includes('career')){
                   return true;
               }
            return false
            })
        },
        hasCoaches() {
            return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
        }
    },
    
    created() {
        this.loadCoaches()
    },
    methods:{
        setFilter(updatedFilter) {
            this.activeFilters = updatedFilter;
        },
        async loadCoaches(refresh = false){
         this.isLoading = true;
         try {
             await this.$store.dispatch('coaches/loadCoaches', { forceRefresh: refresh});
         } catch(error) {
             this.error = error.message || 'Something went wrong!';
         }
         this.isLoading = false;
        },
        handleError() {
            this.error = null;
        }
    },
    
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