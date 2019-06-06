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

    getAllFromDatabaseWithUserNumberWithoutEndtime(storeName, object.userNumber, function (items) {
        // If there are entries in the database with the usernumber and without endtime, do this
        // This means the user is currently clocked in offline
        if(items.length > 0){

            let obj = items[0];

            // Lines to get the current time in the format the database requires
            let today = new Date();
            let date = today.getFullYear() + '-' + (("0" + (today.getMonth() + 1)).slice(-2)) + '-' + ("0" + today.getDate()).slice(-2);
            let time = ("0" + today.getHours()).slice(-2) + ":" + ("0" + today.getMinutes()).slice(-2) + ":" + ("0" + today.getSeconds()).slice(-2);
            let dateTime = date + ' ' + time;

            // Sets the endtime of obj to the current time in the right format
            obj.endTime = dateTime;

            // Overwrites object in store by obj
            db.put(storeName, obj);

        // If there are no entries in the database with the usernumber and without endtime, do this
        // This means the user is not currently clocked in offline
        } else{
            // Lines to get the current time in the format the database requires
            let today = new Date();
            let date = today.getFullYear() + '-' + (("0" + (today.getMonth() + 1)).slice(-2)) + '-' + ("0" + today.getDate()).slice(-2);
            let time = ("0" + today.getHours()).slice(-2) + ":" + ("0" + today.getMinutes()).slice(-2) + ":" + ("0" + today.getSeconds()).slice(-2);
            let dateTime = date + ' ' + time;

            object.startTime = dateTime;

            db.add('clockingEntries', object);
        }
    });
}

async function getAllFromDatabase(storeName, callback){
    const db = await openDB('ClockingDB', 1);

    var transaction = db.transaction(storeName, 'readonly');
    var objectStore = transaction.objectStore(storeName);

    // Get all entries from the given storename from the database
    var a = objectStore.getAll();
    // objectStore.getAll returns a Promise, function to return contents of the Promise
    a.then(function (result) {
        callback(result);
    })
}

async function getAllFromDatabaseWithUserNumber(storeName, userNumber, callback) {
    const db = await openDB('ClockingDB', 1);

    var transaction = db.transaction(storeName, 'readonly');
    var objectStore = transaction.objectStore(storeName);
    var items = [];

    // Get all entries from the given storename from the database
    var a = objectStore.getAll();
    // objectStore.getAll returns a Promise, function to return contents of the Promise after performing operations
    a.then(function (result) {
        for(var i = 0; i < result.length; i++){
            if(result[i].userNumber == userNumber){
                items.push(result[i]);
            }
        }
        callback(items);
    })
}

// Gets all entries from database where startTime and endTime are not null
// e.g. clockIn/clockOut has been completed
async function getUnsynchronizedData(storeName, callback) {
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

    var transaction = db.transaction(storeName, 'readonly');
    var objectStore = transaction.objectStore(storeName);
    var items = [];

    // Get all entries from the given storename from the database
    var a = objectStore.getAll();
    // objectStore.getAll returns a Promise, function to return contents of the Promise after performing operations
    a.then(function (result) {
        for (var i = 0; i < result.length; i++) {
            if (result[i].startTime != null && result[i].endTime != null) {
                items.push(result[i]);
            }
        }
        callback(items);
    });
}

async function getAllFromDatabaseWithUserNumberWithoutEndtime(storeName, userNumber, callback) {
    const db = await openDB('ClockingDB', 1);

    var transaction = db.transaction(storeName, 'readonly');
    var objectStore = transaction.objectStore(storeName);
    var items = [];

    var a = objectStore.getAll();
    a.then(function (result) {
        for (var i = 0; i < result.length; i++) {
            if (result[i].userNumber == userNumber && result[i].endTime == null) {
                items.push(result[i]);
            }
        }
        callback(items);
    })
}

async function deleteFromDatabase(storeName, id){
    const db = await openDB('ClockingDB', 1);

    var transaction = db.transaction([storeName], 'readwrite');
    var objectStore = transaction.objectStore(storeName);

    objectStore.delete(id);
}

export default {
    saveToDatabase,
    getAllFromDatabase,
    getAllFromDatabaseWithUserNumber,
    getAllFromDatabaseWithUserNumberWithoutEndtime,
    getUnsynchronizedData,
    deleteFromDatabase
}