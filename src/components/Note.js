import { FaPenSquare, FaCopy, FaTrashAlt } from 'react-icons/fa';
import { marked } from 'marked';
import { useEffect, useState } from 'react';
// import ReactMarkdown from 'react-markdown';
// import rehypeRaw from 'rehype-raw';
// import remarkGfm from 'remark-gfm';

const Note = ({
  setIsActive,
  isActive,
  format,
  note,
  remove,
  isEditing,
  tagList,
}) => {
  // note && note.tags && console.log(note.tags);

  function createMarkup(text) {
    return { __html: `${text}` };
  }

  return (
    <div
      onClick={() => setIsActive(note.id)}
      className=' note flex flex-col items-start justify-start rounded-md  '
      // style={{ transform: isActive === note.id && 'scale(1.25)' }}
    >
      <header
        className={`w-full h-18 m-0 px-2 bg-blue-900 flex justify-between items-center rounded-t-md`}
        style={
          {
            // backgroundColor: `${colorsArr[idx].hexString}`,
            // color: `${
            //   parseInt(colorsArr[idx].hexString.slice(1), 16) >
            //   0xffffff / 2
            //     ? '#000'
            //     : '#fff'
            // }`,
            // backgroundColor: `#${c}`,
          }
        }
      >
        <span
          className={`${
            isActive === note.id ? 'text-gray-50' : 'text-gray-400'
          }`}
        >
          {format(note.timestamp, 'eee, d. MMM, HH:mm')}
        </span>
        <span className='flex items-center justify-center gap-3 cursor-pointer'>
          <FaCopy
            title='copy to clipboard'
            className={`${
              isActive === note.id ? 'fill-blue-500' : 'fill-gray-400'
            }`}
          />
          <FaTrashAlt
            className={`${
              isActive === note.id ? 'fill-red-500' : 'fill-gray-400'
            }`}
            title='delete'
            onClick={() => remove(note.id)}
          />
          <FaPenSquare
            className={`${
              isActive === note.id ? 'fill-green-500' : 'fill-gray-400'
            }`}
            title='edit'
            onClick={() => isEditing(note.id)}
          />
        </span>
      </header>
      {/* header end*/}

      <div
        dangerouslySetInnerHTML={createMarkup(marked(note.text))}
        className={`py-4 px-2 border border-t-0 border-b-0 border-slate-600 m-0 bg-gray-900 text-gray-50 w-full  min-w-[260px] min-h-[260px]   `}
      ></div>
      <div className='flex gap-2 p-1 items-center bg-gray-900 w-full justify-center rounded-b-lg border border-t-0 border-slate-600 flex-wrap '>
        {note &&
          note.tags &&
          note.tags.split(',').map((tag, idx) => (
            <span
              key={idx}
              className='bg-transparent text-gray-700 text-sm p-1 rounded-lg'
            >
              {tag}
            </span>
          ))}
      </div>
    </div>
  );
};

export default Note;
