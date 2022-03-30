import { FaTimesCircle } from 'react-icons/fa';

const EditNote = ({
  updateNote,
  setEditNote,
  editNote,
  setEditedNote,
  refEditNote,
}) => {
  return (
    <div className='note w-fit h-fit  fixed top-2/4 left-2/4 -translate-y-1/2 -translate-x-1/2 '>
      <header className='h-18 bg-gray-700 w-full rounded-t-md px-4 py-1 text-gray-50 flex justify-between items-center'>
        <button
          className='w-fit px-4 py-2 text-gray-50 border-0 rounded-md bg-gray-800'
          onClick={updateNote}
        >
          Update note
        </button>
        <span className='flex items-center justify-center text-2xl gap-6'>
          <FaTimesCircle
            className='cursor-pointer'
            onClick={() => setEditNote(null)}
          />
        </span>
      </header>
      <textarea
        ref={refEditNote}
        className=' p-2 bg-gray-800 border-2 border-gray-700 focus:ring-2 text-gray-50 focus:ring-indigo-300 focus:ring-opacity-50 focus:outline-none  w-96 h-80 shadow-custom'
        defaultValue={editNote.text}
        onChange={(e) => setEditedNote(e.target.value)}
      ></textarea>
    </div>
  );
};

export default EditNote;
