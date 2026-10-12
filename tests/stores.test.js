const request = require('supertest');
const app = require('../src/app');
const { close } = require('../src/db');
const importData = require('../scripts/import');

describe('Pharmacy Stores API', () => {
  beforeAll(async () => {
    // NODE_ENV is set to test in package.json scripts
    await importData();
  });

  afterAll(async () => {
    await close();
  });

  it('should return 200 and an array of nearby stores', async () => {
    const res = await request(app)
      .get('/api/stores/nearby?lat=26.9124&lng=75.7873&radiusKm=15');

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should sort results by distanceKm from small to large', async () => {
    const res = await request(app)
      .get('/api/stores/nearby?lat=26.9124&lng=75.7873&radiusKm=20');

    const distances = res.body.map(store => store.distanceKm);
    const sortedDistances = [...distances].sort((a, b) => a - b);

    expect(distances).toEqual(sortedDistances);
  });

  it('should sort results by distanceKm from small to large', async () => {
    const res = await request(app)
      .get('/api/stores/nearby?lat=26.9124&lng=75.7873&radiusKm=20');

    const distances = res.body.map(store => store.distanceKm);
    const sortedDistances = [...distances].sort((a, b) => a - b);

    expect(distances).toEqual(sortedDistances);
  });
});
