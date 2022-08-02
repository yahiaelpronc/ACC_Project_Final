const INITIAL_VALUE = {
    loggedUser:[],
    currentVet:[],
    currentUser:"",
    currentLocation:"",
    logged:false,
    type:"",
    currentPage:"",
    gotNotification:false,
}
export default function UserReducer(state=INITIAL_VALUE,action){
    switch(action.type){
        case "CHANGE_GOT_NOTIFICATION":
            return{
                ...state,
                gotNotification : action.payload
            };
        case "CHANGE_USER":
            return{
                ...state,
                loggedUser : action.payload
            };
        case "CHANGE_CURRENT_PAGE":
            return{
                ...state,
                currentPage : action.payload
            };
        case "CHANGE_VET":
            return{
                ...state,
                currentVet : action.payload
            };
        case "CHANGE_CURRENT_USER":
            return{
                ...state,
                currentUser : action.payload
            };
        case "CHANGE_CURRENT_LOCATION":
            return{
                ...state,
                currentLocation : action.payload
            };
        case "CHANGE_LOGGED":
            return{
                ...state,
                logged : action.payload
            };
        case "CHANGE_LOGGED_TYPE":
            return{
                ...state,
                type : action.payload
            };
        default :
            return state
    }
}