import _ from 'lodash';

export const getHomeData = (state) => {
    if (state.questions && state.questions.Items) {
        let questionNames = state.homeData;
        let questions = _.filter(state.questions.Items, question => questionNames.includes(question.name));
        return questions;
    } else {
        return state;
    }
};