import ReactMarkdown from 'react-markdown';

const Nouser = () => {
  return (
    <div className='flex flex-col w-fit  items-start justify-start shadow-custom rounded-lg '>
      <header
        className={`w-full h-18 m-0 px-2 py- bg-slate-600 flex justify-between items-center rounded-t-md`}
      >
        Welcome
      </header>
      {/* header end*/}

      <ReactMarkdown
        children='## Markdown notes by devox. 
                Please sign in with your Google account to start...'
        className={`p-4 border-2 border-t-0 border-slate-600 m-0 bg-slate-900 text-gray-400  min-w-[300px] min-h-[300px] rounded-b-lg`}
      />
    </div>
  );
};

export default Nouser;
