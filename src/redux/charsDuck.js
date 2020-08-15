import axios from 'axios';
import { updateDB } from '../firebase'

//// constants
let initialData = {
    fetching:false,
    array:[],
    current:{},
    favorites:[]
}

let URL = "https://rickandmortyapi.com/api/character/"

let GET_CHARACTER = "GET_CHARACTER";
let GET_CHARACTER_SUCCESS = "GET_CHARACTER_SUCCESS";
let GET_CHARACTER_ERROR = "GET_CHARACTER_ERROR";

let REMOVE_CHAR ="REMOVE_CHAR"
let ADD_TO_FAVORITES ="ADD_TO_FAVORITES"

// reducer
export default function reducer(state=initialData, action){
    switch(action.type){
        case ADD_TO_FAVORITES:
            return {...state, ...action.payload}
        case REMOVE_CHAR:
            return{...state, array:action.payload }
        case GET_CHARACTER:
            return {...state, fetching:true}
        case GET_CHARACTER_SUCCESS:
            return {...state, array:action.payload, fetching:false}
        case GET_CHARACTER_ERROR:
            return {...state, fetching: false, error:action.payload}
        default:
            return state
    }
}
// actions
export let addToFavoritesAction = () => (dispatch, getState) =>{
    let {array, favorites} = getState().characters
    let {uid} = getState().user
    let char = array.shift()

    favorites.push(char)
    if (uid){
    updateDB(favorites, uid )
    }

    dispatch({
        type: ADD_TO_FAVORITES,
        payload:{array: [...array], favorites: [...favorites]}
    })
}



export let removeCharacterAction = () => (dispatch, getState )=>{
    let {array} = getState().characters
    array.shift()
    dispatch({
        type: REMOVE_CHAR,
        payload: [...array]
    })
}
    

export let getCharactersAction = () => (dispatch, getState )=>{
        dispatch({
            type:GET_CHARACTER
        })
    return axios.get(URL).then(
            res =>{
                dispatch({
                    type:GET_CHARACTER_SUCCESS,
                    payload: res.data.results
                })
            })
            .catch(
                err=>{
                    dispatch({
                        type:GET_CHARACTER_ERROR,
                        payload: err.response.message
                    })
                }
            )
    }
