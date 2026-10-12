# Pharmacy API

A Node.js and Express API for finding nearby pharmacies using geospatial search.

## Portfolio Highlight

Implemented location-based pharmacy discovery with latitude and longitude:
MongoDB searches within a spherical radius, then the API calculates and sorts
results by distance. This demonstrates practical geospatial querying and
distance-based ranking.

## Nearby Stores Endpoint

`GET /api/stores/nearby`

Query parameters:
- `lat` (required): search center latitude
- `lng` (required): search center longitude
- `radiusKm` (optional): search radius in kilometers (defaults to `5`)

Example:

```text
GET /api/stores/nearby?lat=26.9124&lng=75.7873&radiusKm=15
```

Store GeoJSON coordinates are stored in MongoDB as `[longitude, latitude]`;
the endpoint accepts the more familiar `lat` and `lng` query parameters and
returns matching stores ordered by `distanceKm`.

## Requirements
- Node.js (v20)
- MongoDB running locally on port 27017

## Installation
Run `npm install` to install dependencies.

## Importing Data
Before running or testing the app, load the pharmacy locations into MongoDB:

```bash
npm run import
```

## Running the Server
Start the Express server on port 3000:

```bash
npm start
```

## Testing
Run the Jest test suite. It imports test data into the `pharmacy_test` database:

```bash
npm test
```
