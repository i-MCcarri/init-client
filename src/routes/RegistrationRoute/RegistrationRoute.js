import React, { Component } from 'react'
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm'
// import './RegistrationRoute.css'

class RegistrationRoute extends Component {
    static defaultProps = {
        history: {
            push: () => {},
        },
    }

    handleRegistrationSuccess = () => {
        const { history } = this.props
        history.push('/login')
    }

    render() {
        return (
            <section 
                className='registration-route'
                aria-live='polite'
                aria-relevant='all'
            >
                
                <h2 className='sign-up'>signUp</h2>
                <RegistrationForm
                    onRegistrationSuccess={this.handleRegistrationSuccess}
                />
            </section>
        )
    }
}

export default RegistrationRoute
