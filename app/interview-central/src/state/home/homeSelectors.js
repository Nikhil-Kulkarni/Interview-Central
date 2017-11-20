import _ from 'lodash';

export const getHomeData = (state) => {
    if (state.questions && state.questions.questions) {
        let questionNames = state.home.mySuite;
        return {
            mySuite: questionNames,
            recommended: [],
        };
    } else {
        return {
            mySuite: [],
            recommended: [],
        };
    }
};
