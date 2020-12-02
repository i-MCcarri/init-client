import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AuthApiService from '../../services/auth-api-service'
import UserContext from '../../contexts/userContext'
import '../../css/Form.css'

class RegistrationForm extends Component {
    static defaultProps = {
        onRegistrationSuccess: () => { }
    }

    static contextType = UserContext

    state = { 
        error: null,
    }

    firstInput = React.createRef()

    handleSubmit = ev => {
        ev.preventDefault()

        const { 
            fullname, 
            username, 
            user_password,
            user_password_match,
            email,
            about_user,
            user_stack
        } = ev.target

        if (user_password.value !== user_password_match.value) {
            this.setState( {error: 'Passwords must match' })
            return
        } else {
            this.setState({ error: null })
            AuthApiService.postUser({
                fullname: fullname.value,
                username: username.value,
                user_password: user_password.value,
                email: email.value,
                about_user: about_user.value,
                user_stack: user_stack.value
            })
                .then(req => console.log(req))
                .then(user => {
                    fullname.value = ''
                    username.value = ''
                    user_password.value = ''
                    user_password_match.value = ''
                    email.value=''
                    about_user.value=''
                    this.props.onRegistrationSuccess()
                })
                .catch(res => {
                    this.setState({ error: res.error })
                })
        }
    }

    componentDidMount() {
        this.firstInput.current.focus()
    }

    render() {
        const { error } = this.state
        return (
            <form
                className='registration-form'
                onSubmit={this.handleSubmit}
            >
                {error && 
                <div 
                    role='alert' 
                    className='error-message'
                    aria-live='assertive'
                >
                    <p>{error}</p></div>}
                
                <div className='form-wrapper'>
                    <label htmlFor='registration-fullname-input'>
                        fullName
                    </label>
                    <input
                        ref={this.firstInput}
                        id='registration-fullname-input'
                        type='text'
                        name='fullname'
                        required
                        aria-required='true'
                        autoComplete='name'
                    />
                </div>
                <div className='form-wrapper'>
                    <label htmlFor='registration-username-input'>
                        userName
                    </label>
                    <input
                        id='registration-username-input'
                        name='username'
                        required
                        aria-required='true'
                        autoComplete='off'
                    />
                </div>
                <div className='form-wrapper'>
                    <label htmlFor='registration-password-input'>
                        passWord
                    </label>
                    <input
                        id='registration-password-input'
                        name='user_password'
                        type='password'
                        required
                        aria-required='true'
                        autoComplete='new-password'
                  />
                </div>
                <div className='form-wrapper'>
                    <label htmlFor='registration-password-match-input'>
                        confirm passWord
                    </label>
                    <input
                        id='registration-password-match-input'
                        name='user_password_match'
                        type='password'
                        required
                        aria-required='true'
                        autoComplete='off'
                    >
                    </input>
                </div>
                <div className='form-wrapper'>
                    <label htmlFor='registration-email-input'>
                        eMail
                    </label>
                    <input
                        id='registration-email-input'
                        name='email'
                        type='email'
                        required
                        aria-required='true'
                        autoComplete='email'
                    >
                    </input>
                </div>
                <div className='form-wrapper'>
                    <label htmlFor='registration-about-user-input'>
                        about
                    </label>
                    <input
                        id='registration-about-user-input'
                        name='about_user'
                        required
                        aria-required='true'
                        autoComplete='off'
                    >
                    </input>
                </div>
                <div className='form-wrapper'>
                    <label htmlFor='registration-user-stack-input'>
                        stack
                    </label>
                    <select 
                        id='registration-user-stack-input'
                        name='user_stack'
                        defaultValue='Full Stack' 
                        required
                        aria-required='true'
                    >
                        <option value='Full Stack'>Full Stack</option>                           
                        <option value='Frontend'>Frontend</option>
                        <option value='Backend'>Backend</option>
                    </select>
                </div>
                <div>
                    <button 
                        type='submit'
                        className='form-button'
                    >
                        Sign up
                    </button>
                    <div className='account-login-link'>
                        <Link 
                            to='/login'
                        >
                            Already have an account?
                        </Link>
                    </div>
                </div>
            </form>
        )
    }
}

export default RegistrationForm