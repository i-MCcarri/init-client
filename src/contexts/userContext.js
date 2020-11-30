import React, { Component } from 'react'
import AuthApiService from '../services/auth-api-service'
import InitContentApiService from '../services/init-content-api-service'
import TokenService from '../services/token-service'
import IdleService from '../services/idle-service'

const UserContext = React.createContext({
    user: {},
    currentAvatar: {},
    error: null,
    isLoggedIn: null,
    setError: () => { },
    clearError: () => { },
    setUser: () => { },
    setAvatar: () => { },
    processLogin: () => { },
    processLogout: () => { },

})

export default UserContext

export class UserProvider extends Component {
    constructor(props) {
        super(props)

        const state = {
            user: {},
            currentAvatar: {},
            error: null
        }

        const jwtPayload = TokenService.parseAuthToken()

        if (jwtPayload)
            state.user = {
                id: jwtPayload.user_id,
                fullname: jwtPayload.fullname,
                username: jwtPayload.sub,
                email: jwtPayload.email,
                about_user: jwtPayload.about_user,
                user_stack: jwtPayload.user_stack,
            }

        this.state = state;
        IdleService.setIdleCallback(this.logoutBecauseIdle)
    }

    componentDidMount() {
        if (TokenService.hasAuthToken()) {
            IdleService.regiserIdleTimerResets()
            TokenService.queueCallbackBeforeExpiry(() => {
                this.fetchRefreshToken()
            })

            if (!this.state.isLoggedIn) {
                this.setIsLoggedIn()
            }
        }
        InitContentApiService.getAvatar()
            .then(res => this.setAvatar(res))
    }

    componentWillUnmount() {
        IdleService.unRegisterIdleResets()
        TokenService.clearCallbackBeforeExpiry()
    }

    setError = error => {
        console.error(error)
        this.setState({ error })
    }

    clearError = () => {
        this.setState({ error: null })
    }

    setUser = user => {
        this.setState({ user })
    }

    setAvatar = avatar => {
        this.setState({ currentAvatar: avatar })
    }

    setIsLoggedIn = () => {
        this.setState({ isLoggedIn: !this.state.isLoggedIn })
    }

    processLogin = authToken => {
        TokenService.saveAuthToken(authToken)
        const jwtPayload = TokenService.parseAuthToken()
        this.setUser({
            id: jwtPayload.user_id,
            fullname: jwtPayload.fullname,
            username: jwtPayload.sub,
            email: jwtPayload.email,
            about_user: jwtPayload.about_user,
            user_stack: jwtPayload.user_stack,
        })
        IdleService.regiserIdleTimerResets()
        TokenService.queueCallbackBeforeExpiry(() => {
            this.fetchRefreshToken()
        })
        this.setIsLoggedIn(true)
    }

    processLogout = () => {
        TokenService.clearAuthToken()
        TokenService.clearCallbackBeforeExpiry()
        IdleService.unRegisterIdleResets()
        this.setIsLoggedIn(false)
        this.setUser({})

    }

    logoutBecauseIdle = () => {
        TokenService.clearAuthToken()
        TokenService.clearCallbackBeforeExpiry()
        IdleService.unRegisterIdleResets()
        this.setIsLoggedIn(false)
        this.setUser({ idle: true })
    }

    fetchRefreshToken = () => {
        AuthApiService.refreshToken()
            .then(res => {
                TokenService.saveAuthToken(res.authToken)
                TokenService.queueCallbackBeforeExpiry(() => {
                    this.fetchRefreshToken()
                })
            })
            .catch(err => {
                this.setError(err)
            })
    }

    render() {
        const value = {
            user: this.state.user,
            currentAvatar: this.state.currentAvatar,
            error: this.state.error,
            isLoggedIn: this.state.isLoggedIn,
            setError: this.setError,
            clearError: this.clearError,
            setUser: this.setUser,
            setAvatar: this.setAvatar,
            processLogin: this.processLogin,
            processLogout: this.processLogout,

        }
        return (
            <UserContext.Provider value={value}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}