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
    <div className='tags flex gap-2 p-1 mb-5 items-center w-full justify-center flex-wrap '>
      {/* !resetActive && */}
      {tags.map((tag, idx) => (
        <span
          onClick={searchForTag}
          className='bg-green-800 text-gray-100 text-sm p-1 rounded-sm cursor-pointer'
          key={idx}
        >
          {tag}
        </span>
      ))}
      {resetActive && (
        <span
          className='ml-10 bg-slate-700 text-gray-50 p-2 rounded-sm text-sm cursor-pointer'
          onClick={reset}
        >
          Reset Filter
        </span>
      )}
    </div>
  );
};

export default TagList;
