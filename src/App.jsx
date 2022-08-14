// import colorsArr from './color_data.json';
import { useState, useEffect, useRef, useCallback } from 'react';
import { format } from 'date-fns';
import { auth, db } from './lib/firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';

import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';

import { FaArrowUp } from 'react-icons/fa';

import {
  Obavestenje,
  Topbar,
  Header,
  Nouser,
  Note,
  AddNote,
  EditNote,
  TagList,
} from './components';
function App() {
  const [isAddNote, setIsAddNote] = useState(false);
  const [obavestenje, setObavestenje] = useState({ show: false, type: '' });
  const [editNote, setEditNote] = useState(null);
  const [editedNote, setEditedNote] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectByDate, setSelectByDate] = useState('');
  const [result, setResult] = useState([]);
  const [isActive, setIsActive] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [user] = useAuthState(auth);
  const [resetActive, setResetActive] = useState(false);
  const [notes, setNotes] = useState([]);
  const [notesCollection, setNotesCollection] = useState(
    collection(db, 'notes')
  );

  const [note, setNote] = useState({
    text: '',
    author: {},
    timestamp: '',
    tags: '',
  });
  const [tags, setTags] = useState('');

  const [tagList, setTagList] = useState([]);

  //scroll into view
  const refEditNote = useRef(null);

  useEffect(() => {
    if (editNote && refEditNote.current) {
      refEditNote.current.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, [editNote]);

  //refactoring data from firebase and fetching
  const fetchData = async () => {
    const data = await getDocs(notesCollection);
    setNotes(
      data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    );
    setResult(
      data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  //fiREBASE add
  const addNoteToFirebase = async () => {
    await addDoc(notesCollection, {
      text: note.text,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
      timestamp: Date.now(),
      tags: tags,
    });
    fetchData();
    prikaziObavestenje(true, 'added');
    // setNote({ text: '', id: '' });
    setIsAddNote(false);
  };

  //removing notes
  const remove = async (id) => {
    if (window.confirm('Da li zaista hoces da obrises note?') == true) {
      const note = doc(db, 'notes', id);
      await deleteDoc(note)
        .then(() => fetchData())
        .then(() => prikaziObavestenje(true, 'removed'));
    } else {
      return;
    }
  };
  //new note
  const handleChange = (e) => {
    setNote({
      ...note,
      text: e.target.value,
      tags: tags,
    });
    // return () => window.removeEventListener('onChange');
  };

  //notifikacije
  function prikaziObavestenje(bolean, msg) {
    setObavestenje({ show: bolean, type: msg });
    setTimeout(() => {
      setObavestenje({ show: false, type: '' });
    }, 3000);
  }

  //edit note
  const isEditing = async (id) => {
    setEditNote(notes.find((note) => note.id === id));
  };

  //updating edited notes
  const updateNote = async () => {
    console.log(editedNote);
    const note = doc(db, 'notes', editNote.id);
    await updateDoc(note, {
      text: editedNote,
    })
      .then(() => setEditNote(null))
      .then(() => fetchData())
      .then(() => prikaziObavestenje(true, 'note je izmenjen!'));
  };

  useEffect(() => {
    setResult(() =>
      notes.filter((note) =>
        note.text.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  const searchForTag = (e) => {
    setResetActive(true);
    const tagovi = tagList.filter((tag) => tag.tags);
    setNewResult(
      tagovi.filter((note) => note.tags.includes(e.target.textContent))
    );
  };

  //sorting by date
  const handleSelect = (e) => {
    setSelectByDate(e.target.value);

    // return () => window.removeEventListener;
  };

  useEffect(() => {
    setResult(
      selectByDate === 'najnovije'
        ? notes
            .filter((note) => note.timestamp)
            .sort((a, b) => b.timestamp - a.timestamp)
        : notes
            .filter((note) => note.timestamp)
            .sort((a, b) => a.timestamp - b.timestamp)
    );
  }, [selectByDate]);

  const reset = () => {
    setResetActive(false);
    fetchData();
  };

  //setting notes for currentUser
  const [newResult, setNewResult] = useState([]);

  useEffect(() => {
    user && setNewResult(result.filter((note) => note.author.id === user.uid));
  }, [result, user]);

  //scrll event fr add button
  const [isScrolled, setIsScrolled] = useState(false);

  const scrolled = () => {
    if (window.pageYOffset > 100) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  const background = [];

  const [bg, setBg] = useState(background[0]);

  useEffect(() => {
    window.addEventListener('scroll', scrolled);

    return () => window.removeEventListener('scroll', scrolled);
  }, []);

  useEffect(() => {
    setTagList(newResult && newResult.filter((note) => note.tags));
  }, [newResult]);

  useEffect(() => {
    if (isAddNote) {
      document.body.style.overflow = 'hidden';
    } else document.body.style.overflow = '';
  }, [isAddNote]);

  //canceling add new note
  const cancelAddNote = () => {
    setIsAddNote(false);
    setNote({
      text: '',
      author: {},
      timestamp: '',
      tags: '',
    });
  };
  return (
    <>
      <div
        className={`relative  w-full min-h-screen bg-gray-900 flex flex-col justify-between items-stretch `}
      >
        {isScrolled && (
          <div className='fixed bottom-4 right-2 rounded-full text-2xl animate-bounce bg-orange-500 p-2 z-50'>
            <a href='#top'>
              <FaArrowUp />
            </a>
          </div>
        )}
        {isAddNote && (
          <div className='absolute top-0 left-0 right-0 bottom-0 bg-slate-800/90'></div>
        )}
        {obavestenje && <Obavestenje obavestenje={obavestenje} />}
        <Topbar setIsAuth={setIsAuth} user={user} id='top' />
        {/* header */}
        <Header
          isScrolled={isScrolled}
          user={user}
          newResult={newResult}
          setIsAddNote={setIsAddNote}
          handleSelect={handleSelect}
          setSearchTerm={setSearchTerm}
        />
        {/* header end*/}
        <section className='min-h-screen lg:p-24 p-4'>
          {!user && <Nouser />}
          {user && newResult.length && (
            <TagList
              searchForTag={searchForTag}
              reset={reset}
              resetActive={resetActive}
              tagList={tagList}
            />
          )}

          <div className='relative flex justify-center items-center flex-wrap gap-4 md:px-4 m-auto px-2 '>
            {user &&
              newResult.map((note, idx) => (
                <div key={idx}>
                  <Note
                    note={note}
                    setIsActive={setIsActive}
                    isActive={isActive}
                    format={format}
                    remove={remove}
                    isEditing={isEditing}
                  />
                </div>
              ))}
          </div>

          {!newResult.length && user && (
            <h2 className='text-center text-gray-800'>No notes</h2>
          )}

          {isAddNote && (
            <AddNote
              addNoteToFirebase={addNoteToFirebase}
              cancelAddNote={cancelAddNote}
              note={note}
              handleChange={handleChange}
              setTags={setTags}
            />
          )}
          {editNote && (
            <EditNote
              updateNote={updateNote}
              setEditNote={setEditNote}
              editNote={editNote}
              setEditedNote={setEditedNote}
              refEditNote={refEditNote}
            />
          )}
        </section>
        {/* footer */}
        <footer className='flex justify-center'>
          developed by{' '}
          <a
            className='mx-2 font-bold'
            target='_blank'
            rel='noreferrer'
            href='https://devox-portfolio.netlify.app'
          >
            {' '}
            devox{' '}
          </a>{' '}
          &copy; 2022{' '}
        </footer>
        {/* footer end */}
      </div>
    </>
  );
}

export default App;
