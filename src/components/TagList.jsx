import React from 'react';

const TagList = ({ tagList, searchForTag, resetActive, reset }) => {
  const initial = '';
  // const [tag, setTag] = useState();
  const tags = [
    ...new Set(
      tagList
        .map((s) => s.tags.split(','))
        .reduce((prev, curr) => prev + ',' + curr, initial)
        .split(',')
    ),
  ].slice(1);

  return (
    <div className='tags flex gap-2 p-1 mb-5 items-center w-full justify-center flex-wrap  '>
      {/* !resetActive && */}
      {tags.map((tag, idx) => (
        <button
          key={idx}
          className='w-fit px-4 py-2 text-gray-50 border-0 rounded-md bg-gray-800  active:scale-90 transition-transform'
          onClick={searchForTag}
          title='Search for tag'
        >
          {tag}
        </button>
      ))}
      {resetActive && (
        <button
          className='w-fit px-4 py-2 text-gray-50 border-0 rounded-md bg-red-800 uppercase active:scale-90 transition-transform'
          onClick={reset}
          title='Reset Filter'
        >
          Reset filter
        </button>
      )}
    </div>
  );
};

export default TagList;
