/* eslint-disable */ 

export default {
   async registerCoach(context, data){
    const userId= context.rootGetters.userId;
        const coachData = {
            firstName: data.first,
            lastName: data.last,
            description: data.desc,
            hourlyRate: data.rate,
            areas: data.areas
        };
        const response = await fetch(`https://vue-final-project-1eeb1-default-rtdb.firebaseio.com/coaches/${userId}.json`,{
            method: 'POST',
            body: JSON.stringify(coachData)
        })
        // const responseData = await response.json();
         if(!response.ok) {
             // error ...
         }
        context.commit('registerCoach', {
            ...coachData,
            id: userId
        });
    },
   async loadCoaches(context, payload){
       if(!payload.forceRefresh && !context.getters.shouldUpdate){
           return;
       }
        const response = await fetch(`https://vue-final-project-1eeb1-default-rtdb.firebaseio.com/coaches.json`)
    
        const responseData = await response.json();

        if(!response.ok) {
            // error
            const error = new Error(responseData.message || 'Failed to fetch');
            throw error;
        }
        
        const coaches = [];
         for( const key in responseData) {
             for( const key2 in responseData[key]){
                const coach = {
                    id: key,
                    firstName: responseData[key][key2].firstName,
               lastName: responseData[key][key2].lastName,
               description: responseData[key][key2].description,
               hourlyRate: responseData[key][key2].hourlyRate,
               areas: responseData[key][key2].areas
             }
             coaches.push(coach)

                 
             }
         }
         context.commit('setCoaches',coaches);
         context.commit('setFetchTimeStamp');

    }
}