import React from 'react';

import { signInWithPopup, signOut } from 'firebase/auth';
import { useState } from 'react';
import { auth, provider } from '../lib/firebase-config';

const Topbar = ({ setIsAuth, user }) => {
  //sign in methods
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem('isAuth', true);
      setIsAuth(true);
    });
  };

  //sign out method
  const signUserOut = async () => {
    await signOut(auth).then(() => {
      setIsAuth(false);
      // navigate('/login');
      localStorage.clear();
    });
  };

  const [showLogoutButton, setShowLogoutButton] = useState(false);
  return (
    <div className='w-full bg-purple-900/10 p-2 text-gray-50 fixed z-50  flex items-center justify-end'>
      {user ? (
        <div className='flex justify-center gap-4 items-center'>
          <div
            className={` flex-col justify-center items-end gap-2 sm:flex ${
              showLogoutButton
                ? ' bg-gray-800 p-2 fixed top-10 right-5 flex z-50 '
                : 'hidden'
            }  `}
          >
            <span className='text-sm'>{user.email}</span>
            <button
              className='ml-2 bg-green-900 rounded-md p-1 text-xs text-gray-50 font-bold tracking-wide '
              onClick={signUserOut}
            >
              Logout
            </button>
          </div>
          <img
            className='rounded-full w-10'
            src={user.photoURL}
            alt='user-photo'
            onClick={() => setShowLogoutButton(!showLogoutButton)}
          />
        </div>
      ) : (
        <button onClick={signInWithGoogle}>Login</button>
      )}
    </div>
  );
};

export default Topbar;
