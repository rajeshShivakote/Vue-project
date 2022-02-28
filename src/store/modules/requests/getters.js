/* eslint-disable */
export default{
    getRequests(state, getters, rootState, rootGetters) {
        // return state.requests;
        const coachId = rootGetters.userId;
        return state.requests.filter((req) => req.coachId === coachId)
    },
    hasRequests(state, getters) {
        // return state.requests && state.requests.length > 0;
        return getters.getRequests && getters.getRequests.length > 0;
    }
}