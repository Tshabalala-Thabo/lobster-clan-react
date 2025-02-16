/**
 * @param db {import('mongodb').Db}
 * @param client {import('mongodb').MongoClient}
 * @returns {Promise<void>}
 */
export const up = async (db, client) => {
    await db.collection('tablelocations').insertMany([
        { name: 'Outside' },
        { name: 'Near window' },
        { name: 'Near bar' },
        { name: 'Near kitchen' },
        { name: 'Private room' },
        { name: 'Outdoor patio' },
        { name: 'Mezzanine' },
      ]);
      console.log('Table locations created successfully');
};

/**
 * @param db {import('mongodb').Db}
 * @param client {import('mongodb').MongoClient}
 * @returns {Promise<void>}
 */
export const down = async (db, client) => {
    await db.collection('tablelocations').deleteMany({});
  console.log('Table locations deleted successfully');
};
