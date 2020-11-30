import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import userContext from '../../contexts/userContext'
import InitContentApiService from '../../services/init-content-api-service'
import AvatarDefault from '../Footer/Images/avatar-default.png'
import { buffTo64 } from '../../components/Utils/Utils'
import '../../css/AccountInformation.css'

class AccountInformation extends Component {
    static contextType = userContext

    state = {
        error: null,
        currentAvatar: {}
    }

    // // this componentDidMount keeps the user avatar updated after an update
    // componentDidMount() {
    //     // this.context.clearError()
    //     InitContentApiService.getAvatar()
    //         //.then(res => this.setState({ currentAvatar: res }))
    //         .then(res => this.context.setAvatar(res))
    //         // .catch(this.setState)
    // }

    renderAvatar() {
        const { currentAvatar } = this.context

        if (!currentAvatar || !currentAvatar.length) {
            return (
                <img 
                    className='circular-landscape'
                    src={AvatarDefault} 
                    alt='avatar-default-logo'
                />
            )
        } else {
            return (
                <img
                    className='circular-landscape'
                    alt='current-user-avatar'
                    src={`data:image/${currentAvatar[0].img_type};base64,${buffTo64(currentAvatar[0].img_file.data)}`}
                />
            )
        }
    }

    render() {
        const { user } = this.props.user

        return (
            <div className='account-wrapper'>
                <div className='account-avatar-wrapper'>
                    {this.renderAvatar()}
                    <div className='update-avatar-link'>
                        <Link 
                            to='/avatarupload'
                        >
                            Update Avatar
                        </Link>
                    </div>
                </div>
                <form className='account-form'>
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