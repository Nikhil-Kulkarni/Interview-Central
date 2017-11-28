export const getRecommendedCategory = (state) => {
    if (state.recommended) {
        return state.recommended.category;
    }
}