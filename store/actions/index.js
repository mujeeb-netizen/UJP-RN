
export const getUser=(data)=>{
    return {
        type:'GET_USER',
    }
}
export const editUid=(data)=>(
    {
        type: 'EDIT_UID',
        uid: data.uid
    }
)
export const editUser=(data)=>{
    return {
        type:'EDIT_USER',
        uid:data.uid,
        role: data.role,
        name: data.name
    }
}
 
export const editROLE = (data) => (
    {
        type: 'EDIT_ROLE',
        role: data.role
    }
)
export const editNAME = (data) => (
    {
        type: 'EDIT_NAME',
        role: data.name
    }
)
 
 
 
export const deleteUser=()=>(
    {
        type:'DELETE_USER',
    }
)
 