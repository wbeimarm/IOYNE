import sesionReducer from './sesionReducer'

export const mainReducer = ({sesion}, action ) => {
    return {
        sesion: sesionReducer(sesion, action)
    }
}