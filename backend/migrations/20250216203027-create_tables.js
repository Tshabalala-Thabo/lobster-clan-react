/**
 * @param db {import('mongodb').Db}
 * @param client {import('mongodb').MongoClient}
 * @returns {Promise<void>}
 */
export const up = async (db, client) => {
    // Fetch all table locations
    const locations = await db.collection('tablelocations').find({}).toArray();
  
    // Create a mapping of location names to their _id
    const locationMap = {};
    locations.forEach((location) => {
      locationMap[location.name] = location._id;
    });
  
    // Insert tables with locationId references
    await db.collection('tables').insertMany([
      { tableName: 'T1', seats: 3, canCombine: true, locationId: locationMap['Outside'] },
      { tableName: 'T2', seats: 3, canCombine: true, locationId: locationMap['Near window'] },
      { tableName: 'T3', seats: 3, canCombine: true }, // No location
      { tableName: 'T4', seats: 3, canCombine: true, locationId: locationMap['Near bar'] },
      { tableName: 'T5', seats: 3, canCombine: true }, // No location
      { tableName: 'T6', seats: 4, canCombine: true, locationId: locationMap['Outside'] },
      { tableName: 'T7', seats: 4, canCombine: true, locationId: locationMap['Near window'] },
      { tableName: 'T8', seats: 4, canCombine: true }, // No location
      { tableName: 'T9', seats: 4, canCombine: true, locationId: locationMap['Near kitchen'] },
      { tableName: 'T10', seats: 4, canCombine: true }, // No location
      { tableName: 'T11', seats: 10, canCombine: true, locationId: locationMap['Private room'] },
      { tableName: 'T12', seats: 10, canCombine: true }, // No location
      { tableName: 'T13', seats: 10, canCombine: true, locationId: locationMap['Outdoor patio'] },
      { tableName: 'T14', seats: 10, canCombine: true }, // No location
      { tableName: 'T15', seats: 10, canCombine: true, locationId: locationMap['Mezzanine'] },
    ]);
    console.log('Tables created successfully with location references');
  };

  /**
 * @param db {import('mongodb').Db}
 * @param client {import('mongodb').MongoClient}
 * @returns {Promise<void>}
 */
export const down = async (db, client) => {
  await db.collection('tables').deleteMany({});
console.log('Tables are deleted successfully');
};