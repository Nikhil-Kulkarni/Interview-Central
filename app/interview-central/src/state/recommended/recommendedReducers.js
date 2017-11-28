import { RECOMMENDED_SUCCESS } from './recommendedActions';

const initialState = { category: "Heap"};

export function recommendedReducer(state = initialState, action) {

    switch(action.type){
        case RECOMMENDED_SUCCESS:
            return {
                category: action.payload.category,
            };
        default: 
            return state;
    }

}
