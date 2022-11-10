import { enablePromise, openDatabase } from 'react-native-sqlite-storage';

enablePromise(true);
const DATABASE_NAME = 'task.db';

export async function getDbConnection() {
    const db = await openDatabase({ name: DATABASE_NAME, location: 'default' })
    return db;
}



export async function createTables(db) {
    const query = "CREATE TABLE IF NOT EXISTS model (ID INTEGER PRIMARY KEY AUTOINCREMENT , model_code INTEGER, model_name TEXT,model_type TEXT,cost TEXT,category TEXT,description TEXT,image TEXT)";
    return db.executeSql(query)
}

export async function initDatabase() {
    const db = await getDbConnection();
    await createTables();
    db.close();
}


