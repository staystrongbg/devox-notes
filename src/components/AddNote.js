import { FaTimesCircle } from 'react-icons/fa';

const AddNote = ({
  addNoteToFirebase,
  note,
  handleChange,
  setIsAddNote,
  setTags,
}) => {
  return (
    <div className='note w-fit h-fit  fixed top-2/4 left-2/4 -translate-y-1/2 -translate-x-1/2 flex flex-col'>
      <header className='h-18 bg-blue-500 w-full rounded-t-md px-4 py-1 text-gray-50 flex justify-between items-center'>
        add new note
        <span className='flex items-center justify-center gap-6'>
          <button
            className='w-16 bg-blue-900 rounded-md'
            onClick={addNoteToFirebase}
            title='Add note'
            disabled={!note || false}
          >
            done
          </button>
          <FaTimesCircle
            className='cursor-pointer'
            onClick={() => setIsAddNote(false)}
          />
        </span>
      </header>
      <textarea
        className=' p-2 border bg-gray-50 focus:ring-2 focus:ring-indigo-300 focus:ring-opacity-50 focus:outline-none  min-w-[400px] h-[400px] shadow-xl'
        placeholder='write markdown...'
        onChange={(e) => handleChange(e)}
      ></textarea>
      <input
        type='text'
        placeholder='tags(html, css, react, js, next)...'
        className='outline-none p-1'
        onChange={(e) => setTags(e.target.value)}
        required
      />
    </div>
  );
};

export default AddNote;
