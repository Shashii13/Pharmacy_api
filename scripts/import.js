const fs = require('fs');
const path = require('path');
const { connect, close } = require('../src/db');

async function importData() {
  try {
    const db = await connect();
    const collection = db.collection('stores');

    await collection.deleteMany({});

    const dataPath = path.join(__dirname, '../data/stores.json');
    const stores = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

    const formattedStores = stores.map(store => ({
      name: store.name,
      area: store.area,
      isOpen: store.isOpen,
      location: {
        type: 'Point',
        coordinates: [store.lng, store.lat]
      }
    }));

    await collection.insertMany(formattedStores);
    console.log(`Successfully imported ${formattedStores.length} stores.`);
  } catch (error) {
    console.error('Import failed:', error);
  } finally {
    await close();
  }
}

if (require.main === module) {
  importData();
}

module.exports = importData;
