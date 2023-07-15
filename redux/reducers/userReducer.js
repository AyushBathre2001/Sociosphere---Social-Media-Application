let initialState = {}

export default function userReducer (state = initialState,action){
    switch (action.type) {
        case "SETUSER":
            state = action.data;
            return state
            break;
    
        default:
            return state
            break;
    }
}