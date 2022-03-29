import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, provider } from '../firebase-config';

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
  return (
    <div className='w-full bg-[#101010]/90 p-2 text-gray-50 fixed z-50  flex items-center justify-end'>
      {user ? (
        <div className='flex justify-center gap-4 items-center'>
          <div className='flex flex-col justify-center items-end gap-2'>
            <span className='text-sm'>{user.email}</span>
            <button
              className='ml-2 bg-green-900 rounded-md p-1 text-xs text-gray-50 font-bold tracking-wide '
              onClick={signUserOut}
            >
              Logout
            </button>
          </div>
          <img className='rounded-full w-10' src={user.photoURL} alt='' />
        </div>
      ) : (
        <button onClick={signInWithGoogle}>Login</button>
      )}
    </div>
  );
};

export default Topbar;
