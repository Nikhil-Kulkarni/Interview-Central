import _ from 'lodash';

export const getHomeData = (state) => {
    if (state.questions && state.questions.questions) {
        let suites = state.home.mySuite;
        let shared = state.home.shared;
        return {
            mySuite: suites,
            recommended: shared,
        };
    } else {
        return {
            mySuite: [],
            recommended: [],
        };
    }
};