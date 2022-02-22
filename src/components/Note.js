import { FaPenSquare, FaCopy, FaTrashAlt } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
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

  return (
    <div
      onClick={() => setIsActive(note.id)}
      className='flex flex-col w-fit  items-start justify-start shadow-custom rounded-lg '
      // style={{ transform: isActive === note.id && 'scale(1.25)' }}
    >
      <header
        className={`w-full h-18 m-0 px-2 py- bg-slate-600 flex justify-between items-center rounded-t-md`}
        style={
          {
            // backgroundColor: `${colorsArr[idx].hexString}`,
            // color: `${
            //   parseInt(colorsArr[idx].hexString.slice(1), 16) >
            //   0xffffff / 2
            //     ? '#000'
            //     : '#fff'
            // }`,
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
              isActive === note.id ? 'fill-gray-50' : 'fill-gray-400'
            }`}
          />
          <FaTrashAlt
            className={`${
              isActive === note.id ? 'fill-gray-50' : 'fill-gray-400'
            }`}
            title='delete'
            onClick={() => remove(note.id)}
          />
          <FaPenSquare
            className={`${
              isActive === note.id ? 'fill-gray-50' : 'fill-gray-400'
            }`}
            title='edit'
            onClick={() => isEditing(note.id)}
          />
        </span>
      </header>
      {/* header end*/}

      <ReactMarkdown
        children={note.text}
        // remarkPlugins={[remarkGfm]}
        // rehypePlugins={[rehypeRaw]}
        className={`p-4 border-2 border-t-0 border-b-0 border-slate-600 m-0 bg-slate-900 text-gray-50 max-w-screen-sm  lg:min-w-[300px] lg:min-h-[300px] `}
      />
      <div className='flex gap-2 p-1 items-center bg-slate-900 w-full justify-center rounded-b-lg border-2 border-t-0 border-slate-600 flex-wrap'>
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
