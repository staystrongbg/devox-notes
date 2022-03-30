import { FaPlusSquare } from 'react-icons/fa';
import { Search, SelectCategory } from './Search';
const Header = ({
  isScrolled,
  user,
  newResult,
  setIsAddNote,
  setSearchTerm,
  handleSelect,
}) => {
  return (
    <header className=' lg:flex lg:justify-around lg:items-start lg:flex-row  flex-col items-center justify-center p-4 mt-20'>
      <div className='flex flex-col items-center justify-center lg:justify-end lg:items-end gap-2 '>
        <h1
          className={`main-title text-6xl text-red-700 transition-all ${
            isScrolled ? 'fixed top-2 left-2 z-50 text-4xl ' : ''
          } `}
        >
          devox notes
        </h1>
        <button
          title='Add new note'
          disabled={!user && true}
          className={`  btn-new bg-green-900 hover:shadow-lg px-2 py-2 rounded-md text-gray-50  font-medium  transition-all flex items-center justify-center gap-2 z-40 `}
          style={{
            left: isScrolled && '40px',
            transform: isScrolled && 'translateY(40px)',
            position: isScrolled && 'fixed',
          }}
          onClick={() => setIsAddNote(true)}
        >
          <FaPlusSquare className={`${isScrolled && 'animate-pulse'}`} />
          {!isScrolled && <span>NEW NOTE</span>}
        </button>
      </div>
      {user && (
        <div className='flex  w-fit lg:gap-12 gap-4 bg-transparent  rounded-lg p-4 mt-10 lg:mt-0'>
          <div>
            <Search setSearchTerm={setSearchTerm} />
            {user && newResult && (
              <span className='text-gray-100'>{newResult.length} note(s)</span>
            )}
          </div>
          <SelectCategory handleSelect={handleSelect} />
        </div>
      )}
    </header>
  );
};

export default Header;
