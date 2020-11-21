import React, { Component } from 'react';
import UserContext from '../../contexts/userContext';
import InitContentContext from '../../contexts/initContentContext';
// import './AccountRoute.css';

class AccountInformation extends Component {
    static defaultProps = {
        history: {
            goBack: () => { }
        }
    }

    static contextType = UserContext

    render() {
        const { user } = this.context
        // const userAccountPhoto = user.accountPhoto
            console.log(user)
        return (
            <div className='account-wrapper'>
                <p>info</p>
                    <form className='account-form'>
                        <fieldset>
                            <legend><h3>userPhoto</h3></legend>
                            <span></span>
                        </fieldset>
                        <fieldset>
                            <legend><h3>fullName</h3></legend>
                            <span>{ user.fullname }</span>
                        </fieldset>
                        <fieldset>
                            <legend><h3>userName</h3></legend>
                            <span>{ user.username }</span>
                        </fieldset>
                        <fieldset>
                            <legend><h3>eMail</h3></legend>
                            <span>{ user.email }</span>
                        </fieldset>
                        <fieldset>
                            <legend><h3>about</h3></legend>
                            <span>{ user.about_user }</span>
                        </fieldset>
                        <fieldset>
                            <legend><h3>stack</h3></legend>
                            <span>{ user.user_stack }</span>
                        </fieldset>
                    </form>
                </div>
        );
    }
};

export default AccountInformation;