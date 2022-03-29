import { useState } from 'react';

const useRandomColor = () => {
  const [c, setC] = useState(Math.random().toString(16).substr(-6));

  //   const changecolor = () => {
  //     setC(Math.random().toString(16).substr(-6));
  //   };

  return { c };
};

export default useRandomColor;
