

const loginReducer = (state={
    uid:null,
    name:null,
    role: null
},action)=>{
    switch(action.type){
        case 'GET_USER':
            return state
        case 'EDIT_UID':
            return state={
                uid:action.uid
            }
        case 'EDIT_USER':
            return state={
                ...state,
                uid: action.uid,
                name: action.name,
                role: action.role,
            }
 
        case 'EDIT_ROLE': 
            return state={
                ...state,
                role:action.role
            }
        case 'EDIT_NAME': 
            return state={
                ...state,
                name:action.name
            }
 
 
        case 'DELETE_USER':
            return state={
                uid:null,
                name:null,
                role:null
            }
 
        default: return state
    }
}
export default loginReducer