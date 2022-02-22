const Backgrounds = ({ bg, setBg, images }) => {
  return (
    <div className='flex gap-2 uppercase text-xs items-center '>
      background
      {images.map((img, idx) => {
        return (
          <span
            key={idx}
            onClick={() => setBg(img)}
            className={`w-6 h-6 bg-zinc-50 bg-cover rounded-md`}
            style={{ backgroundImage: `url(${img})` }}
          ></span>
        );
      })}
    </div>
  );
};

export default Backgrounds;
