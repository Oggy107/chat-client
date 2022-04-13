import React from 'react'
import { Reducer, ReducerAction, ReducerState } from 'react'

import {
    User,
    UserContextI,
    UserReducer,
    UserActionType,
} from '../types/auth'

// interface UserI {
//     username: string,
//     token: string
// }

// type User = UserI | null

// enum UserActionType { 'LOGIN' , 'LOGOUT' }
// type Action = { type: UserActionType, payload: User }

const userReducer: UserReducer = (state, action): User => {
    switch (action.type) {
        case UserActionType.LOGIN:
            return {
                ...action.payload!!
            }
        case UserActionType.LOGOUT:
            return null
        default:
            return state
    }
}

// interface UserContextI {
//     user: User,
//     login: (payload: UserI) => void,
//     logout: () => void
// }

// type UserContext = UserContextI | null

const initialState: UserContextI = {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!!) : null,
    login: (payload: User) => {},
    logout: () => {}
}

const UserContext = React.createContext<UserContextI>(initialState)

const UserProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
    const [user, dispatch] = React.useReducer<UserReducer>(userReducer, null)

    // React.useEffect(() => {
    //     if (localUser) {
    //         console.log("hey")
    //         // dispatch({
    //         //     type: UserActionType.LOGIN,
    //         //     payload: JSON.parse(localUser)
    //         // })
    //         login(JSON.parse(localUser))
    //     }
    // }, [])

    const login = (payload: User) => {
        dispatch({ type: UserActionType.LOGIN, payload })
        localStorage.setItem('user', JSON.stringify(payload))



        location.href = '/'
    }

    const logout = () => {
        dispatch({ type: UserActionType.LOGOUT, payload: null })
        localStorage.removeItem('user')
    }

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext as default, UserProvider }