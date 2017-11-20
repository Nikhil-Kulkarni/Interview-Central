import _ from 'lodash';

export const getHomeData = (state) => {
    if (state.questions && state.questions.questions) {
        let questionNames = state.home.mySuite;
        console.log("State.home.mySuite");
        console.log(state.home.mySuite);
        // let questions = _.filter(state.questions.questions.Items, question => questionNames.includes(question.name));
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
