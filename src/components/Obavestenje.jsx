import React from 'react';

const Obavestenje = ({ obavestenje }) => {
  const NOTICE_STYLE = 'text-white fixed bottom-5 right-5 px-4 py-2 rounded-lg';
  return (
    <>
      {obavestenje.show && obavestenje.type === 'removed' ? (
        <p className={`bg-red-400 ${NOTICE_STYLE}`}>Note obrisan!</p>
      ) : obavestenje.show && obavestenje.type === 'added' ? (
        <p className={`bg-blue-400 ${NOTICE_STYLE}`}>Note dodat!</p>
      ) : obavestenje.show && obavestenje.type ? (
        <p className={`bg-green-700 ${NOTICE_STYLE}`}>{obavestenje.type}</p>
      ) : null}
    </>
  );
};

export default Obavestenje;
