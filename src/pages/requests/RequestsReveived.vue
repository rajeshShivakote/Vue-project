<!-- eslint-disable -->

<template>
<div>
<base-dialog :show="!!error" title="An error occurred!" @close="handleError">
    <p>{{ error }}</p>
  </base-dialog>
    <section>
        <base-card>
            <header>
                <h2>Request Received</h2>
            </header>
            <base-spinner v-if="isLoading"></base-spinner>
            <ul v-else-if="hasRequests && !isLoading">
                <request-items v-for="request in receivedRequests" :key="request.id" :email="request.userEmail" :message="request.message"></request-items>
            </ul>
            <h3 v-else>You haven't received any requests yet!</h3>
        </base-card>
    </section>
    </div>
</template>
<!-- eslint-disable -->
<script>
import RequestItems from '@/components/requests/RequestItems'
export default {
    components: {
        RequestItems
    },
    data() {
        return{
            isLoading: false,
            error: null
        }
    },
    computed:{
        receivedRequests(){
            console.log(this.$store.getters['requests/getRequests']);
            return this.$store.getters['requests/getRequests'];
        },
        hasRequests(){
            console.log(this.$store.getters['requests/hasRequests']);
            return this.$store.getters['requests/hasRequests'];
        }
    },
    created(){
        this.loadRequest();

    },
    methods:{
       async loadRequest() {
            this.isLoading = true
            try{
                 await this.$store.dispatch('requests/fetchRequests')
            } catch(error){
                this.error = error.message || 'Something failed' 
            }
                        this.isLoading = false;

        },
         handleError() {
            this.error = null;
        }
    }
}
</script>
<!-- eslint-disable -->
<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>