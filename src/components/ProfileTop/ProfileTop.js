import React, { useContext } from 'react';
import UserContext from '../../contexts/userContext';
import ProfilePic from '../ProfilePic/ProfilePic';
import { buffTo64 } from '../../components/Utils/Utils'
// import Vegeta from '../../pictures/VegetaProfile.jpg';

function ProfileTop() {
  const userContext = useContext(UserContext)
  let { user, currentAvatar } = userContext
  console.log('curent context', userContext)
  console.log('curent ava', currentAvatar)

  if (!currentAvatar || !currentAvatar.length) {
    return (
      <section>
        <div className='hex-wrapper'>
          {/* <ProfilePic image={Vegeta} /> */}
          <ProfilePic />
          <div className='p-wrapper'>
            <p className='p-filling'>post counter</p>
            <p className='p-filling'>follower counter</p>
            <p className='p-filling'>following counter</p>
          </div>
        </div>
        <div className='profile-wrapper'>
          <p className='p-item-top'>{user.username}</p>
          <p className='p-item-mid'>stack: {user.user_stack}</p>
          <p className='p-item-bot'>about: {user.about_user}</p>
        </div>
      </section>
    );
  } else {
    return (
      <section>
        <div className='hex-wrapper'>
          {/* <ProfilePic image={Vegeta} /> */}
          <ProfilePic image={`data:image/${currentAvatar[0].img_type};base64,${buffTo64(currentAvatar[0].img_file.data)}`} />
          <div className='p-wrapper'>
            <p className='p-filling'>post counter</p>
            <p className='p-filling'>follower counter</p>
            <p className='p-filling'>following counter</p>
          </div>
        </div>
        <div className='profile-wrapper'>
          <p className='p-item-top'>{user.username}</p>
          <p className='p-item-mid'>stack: {user.user_stack}</p>
          <p className='p-item-bot'>about: {user.about_user}</p>
        </div>
      </section>
    );
  }
};

export default ProfileTop;