import React from 'react';
import { FaTimesCircle } from 'react-icons/fa';

const AddNote = ({
  addNoteToFirebase,
  note,
  handleChange,
  cancelAddNote,
  setTags,
}) => {
  console.log(note.text);
  return (
    <div className='note w-fit h-fit  fixed top-2/4 left-2/4 -translate-y-1/2 -translate-x-1/2 flex flex-col'>
      <header className='h-18 bg-gray-700 w-full rounded-t-md px-4 py-1 text-gray-50 flex justify-between items-center'>
        <div className='w-full flex items-center justify-between'>
          <button
            className='w-fit px-4 py-2 text-gray-50 border-0 rounded-md bg-gray-800 uppercase active:scale-90 transition-transform'
            onClick={addNoteToFirebase}
            title='Add note'
            disabled={!note.text || false}
          >
            add note
          </button>

          <FaTimesCircle
            className='cursor-pointer text-2xl'
            onClick={cancelAddNote}
          />
        </div>
      </header>
      <textarea
        className=' p-2 bg-gray-800 border-2 border-b-0 border-gray-700 outline-none text-gray-50   w-96 h-80 shadow-custom'
        placeholder='write markdown...'
        onChange={(e) => handleChange(e)}
      ></textarea>
      <input
        type='text'
        placeholder='tags(html, css, react, js, next)...'
        className='outline-none p-1 bg-gray-800 border-2 border-gray-700 text-gray-50'
        onChange={(e) => setTags(e.target.value)}
        required
      />
    </div>
  );
};

export default AddNote;
