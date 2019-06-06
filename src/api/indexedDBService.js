import { openDB } from 'idb';

async function saveToDatabase(storeName, object){
    const db = await openDB('ClockingDB', 1, {
        upgrade(db) {
            const store = db.createObjectStore(storeName, {
                keyPath: 'id',
                autoIncrement: true,
            });
            // Create an index on userNumber property of objects
            store.createIndex('userNumber', 'userNumber');
        }
    });

    // Add clockEntry
    await db.add('clockingEntries', object);

    // const tx = db.transaction(storeName, 'readwrite');
    // const store = tx.objectStore(storeName);

    // console.log(storeName)
    // console.log(tasks)
    // //store.add(tasks)
    // store.put(object, storeName);

    // return tx.complete;
}

export default {
    saveToDatabase
}