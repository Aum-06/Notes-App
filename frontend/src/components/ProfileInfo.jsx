import React from 'react';
import { getInitials } from '../utils/helper';

const ProfileInfo = ({userName, onLogout }) => {
  console.log("ProfileInfo received userName:", userName);

  return (
    <div className='flex items-center gap-3'>
      <div className="size-12 bg-slate-200 text-black flex justify-center items-center rounded-full font-medium">
        {getInitials(userName)}
      </div>
      <div>
        <p className='font-semibold text-sm'>{userName}</p>
        <button className='bg-none text-slate-700 text-sm underline font-medium' onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
