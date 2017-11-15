import _ from 'lodash';

export const getAccountInfo = (state) => {
    if (state.account) {
        return state.account;
    } else {
        return {};
    }
};