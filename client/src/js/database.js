import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1,
  {
    upgrade(db)
    {
      if (db.objectStoreNames.contains('jate'))
      {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', {keyPath: 'id', autoIncrement: true});
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (textEditorContent) =>
{
  const jateDB = await openDB('jate', 1); //initializes a connection to the JATE database under version 1
  const transaction = jateDB.transaction('jate', 'readwrite'); //creates a new transaction instance with the JATE database with read-write privileges
  const store = transaction.objectStore('jate'); //connects to the JATE object store with above specified conditions
  const request = store.put({jate: textEditorContent}); //updates text value stored in the indexedDB JATE object store

  //logs updated content to console
  const savedText = await request;
  console.log('saved text to database;', savedText);
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () =>
{
  const jateDB = await openDB('jate', 1); //initializes a connection to the JATE database under version 1 of the database
  const transaction = jateDB.transaction('jate', 'readonly'); //creates a read only transaction instance with the JATE database
  const store = transaction.objectStore('jate'); //connects to the JATE object store with above specified conditions
  const request = store.get('jate'); //retrieves text from the indexedDB JATE object store

  //logs retrieved content to console
  const retrievedText = await request;
  console.log('retrieved text from database;', retrievedText);

  return retrievedText; //returns text retrieved from database
}

initdb(); //initializes the JATE database