import * as types from './../constants/ActionTypes'

const initialState = {
    name: '',
    status: -1
}

const myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FILTER_TABLE:
            return action.filter
        default: 
            return state
    }
}

export default myReducer