/**
 * @param db {import('mongodb').Db}
 * @param client {import('mongodb').MongoClient}
 * @returns {Promise<void>}
 */
export const up = async (db, client) => {
    await db.collection('tables').insertMany([
        { tableId: 'T1', seats: 3, canCombine: true },
        { tableId: 'T2', seats: 3, canCombine: true },
        { tableId: 'T3', seats: 3, canCombine: true },
        { tableId: 'T4', seats: 3, canCombine: true },
        { tableId: 'T5', seats: 3, canCombine: true },
        { tableId: 'T6', seats: 4, canCombine: true },
        { tableId: 'T7', seats: 4, canCombine: true },
        { tableId: 'T8', seats: 4, canCombine: true },
        { tableId: 'T9', seats: 4, canCombine: true },
        { tableId: 'T10', seats: 4, canCombine: true },
        { tableId: 'T11', seats: 10, canCombine: true },
        { tableId: 'T12', seats: 10, canCombine: true },
        { tableId: 'T13', seats: 10, canCombine: true },
        { tableId: 'T14', seats: 10, canCombine: true },
        { tableId: 'T15', seats: 10, canCombine: true },
      ]);
      console.log('Tables created successfully');
};

/**
 * @param db {import('mongodb').Db}
 * @param client {import('mongodb').MongoClient}
 * @returns {Promise<void>}
 */
export const down = async (db, client) => {
    await db.collection('tables').deleteMany({});
  console.log('Tables deleted successfully');
};
