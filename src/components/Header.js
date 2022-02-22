import { FaPlusSquare } from 'react-icons/fa';
import { Search, SelectCategory } from './Search';
const Header = ({
  isScrolled,
  user,
  newResult,
  setIsAddNote,
  handleSearch,
  handleSelect,
}) => {
  return (
    <header className=' lg:flex lg:justify-around lg:items-start lg:flex-row  flex-col items-center justify-center gap-10 p-4 mt-20'>
      <div className='flex flex-col items-center justify-center lg:justify-end lg:items-end gap-2 '>
        <h1 className='main-title text-6xl text-gray-900 '>devox notes</h1>
        <button
          title='Add new note'
          disabled={!user && true}
          className={`  btn-new bg-gray-700 hover:shadow-lg px-2 py-2 rounded-md text-gray-50  font-medium  transition-all flex items-center justify-center gap-2 z-40 `}
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
        <div className='flex  w-fit lg:gap-12 gap-4 bg-slate-600/50  rounded-lg p-4'>
          <div>
            <Search handleSearch={handleSearch} />
            {user && newResult && (
              <span className=''>{newResult.length} note(s)</span>
            )}
          </div>
          <SelectCategory handleSelect={handleSelect} />
        </div>
      )}
    </header>
  );
};

export default Header;
