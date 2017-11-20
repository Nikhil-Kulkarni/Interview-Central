import _ from 'lodash';

export const getHomeData = (state) => {
    if (state.questions && state.questions.questions) {
        let suites = state.home.mySuite;
        return {
            mySuite: suites,
            recommended: [],
        };
    } else {
        return {
            mySuite: [],
            recommended: [],
        };
    }
};
