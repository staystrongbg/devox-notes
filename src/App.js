// import colorsArr from './color_data.json';
import { useState, useEffect, useRef } from 'react';
import Obavestenje from './components/Obavestenje';
import { format } from 'date-fns';
import { auth, db } from './firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';

import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import Topbar from './components/Topbar';
import Header from './components/Header';
import Nouser from './components/Nouser';
import Note from './components/Note';
import AddNote from './components/AddNote';
import EditNote from './components/EditNote';
import TagList from './components/TagList';

//IDEJA
//  MOGUCNOST DA SE IZABERE POZADINA IMEDJU NEKOLIOKO SLIKA I BOJA
//  --------------------------------------------------------------
//  nesto kao select opcija izmedju kategorija npr *html *css *js *react *next
//  ili u obliku tagova mozda bolje( input za tagove pa split na zarez i stilizujes svaki span
//  pa nekako kroz map ili filter
//  click event za filter

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

  const [note, setNote] = useState({});
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

  //geeting data from firebase and setting local var notes
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
      author: note.author,
      timestamp: note.timestamp,
      tags: tags,
    });
    fetchData();
    prikaziObavestenje(true, 'added');
    setNote({ text: '', id: '' });
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
  //seting note var localy
  const handleChange = (e) => {
    setNote({
      text: e.target.value,
      timestamp: Date.now(),
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
      tags: tags,
    });
    return () => window.removeEventListener;
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
    const note = doc(db, 'notes', editNote.id);

    await updateDoc(note, {
      text: editedNote,
    })
      .then(() => setEditNote(''))
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

    return () => window.removeEventListener;
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

  //scroll event for add button
  const [isScrolled, setIsScrolled] = useState(false);

  const scrolled = () => {
    if (window.pageYOffset > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  const images = [
    './pexels-fwstudio-172277.jpg',
    './programiranje.jpg',
    './pexels-negative-space-34153.jpg',
    'gnome.jpg',
    'stepin.jpg',
    '',
  ];

  const [bg, setBg] = useState(images[0]);

  useEffect(() => {
    window.addEventListener('scroll', scrolled);
  }, []);

  useEffect(() => {
    setTagList(newResult && newResult.filter((note) => note.tags));
  }, [newResult]);

  return (
    <>
      <div
        className={`  w-full min-h-screen bg-gray-900  bg-cover bg-fixed overflow-x-hidden flex flex-col justify-between items-stretch `}
        // style={{ backgroundImage: `url(${bg})`, backgroundPosition: 'center' }}
      >
        {obavestenje && <Obavestenje obavestenje={obavestenje} />}
        <Topbar setIsAuth={setIsAuth} user={user} />
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
        <section className='w-screen min-h-screen overflow-x-hidden lg:p-24 p-4'>
          {!user && <Nouser />}
          {user && newResult.length && (
            <TagList
              searchForTag={searchForTag}
              reset={reset}
              resetActive={resetActive}
              tagList={tagList}
            />
          )}

          <div className='relative px-2 flex justify-center items-start flex-wrap gap-8   '>
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
              setIsAddNote={setIsAddNote}
              note={note}
              handleChange={handleChange}
              // handleSearch={handleSearch}
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
