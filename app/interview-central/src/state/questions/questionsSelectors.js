export const getQuestions = (state) => {
    if (state.questions && state.questions.Items) {
        return state.questions.Items;
    } else {
        return state;
    }
};