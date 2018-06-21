const fs = require('fs');
const path = require('path');
const schema = require('./schema/schema');
const printSchema = require('graphql').printSchema;

const schemaPath = path.resolve(__dirname, './schema/schema.graphql');

fs.writeFileSync(schemaPath, printSchema(schema));

console.log('Wrote ' + schemaPath);