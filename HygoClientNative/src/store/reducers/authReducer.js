
const initialState = {
    token: ''
}

export default authReducer =  (state = initialState, action) => {
    let nextState
    switch (action.type) {
    case 'TOGGLE_TOKEN':
        nextState = {
            ...state,
            token: (state.token == 1 ? 0 : 1)
        }
        return nextState || state;
    
    case 'UPDATE_TOKEN':
        nextState = {
            ...state,
                token: action.token,
            }
        return nextState || state;
        
    case 'DELETE_TOKEN' :
        nextState = {
            ...state,
                token: '',
            }
        return nextState || state;
    default:
      return state
    }
};