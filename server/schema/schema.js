const _ = require('lodash');
const graphql = require('graphql');
const { GraphQLSchema } = graphql;
require('../models');

const RootQueryType = require('./root_query_type');
const mutations = require('./mutations');

module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation: mutations
});
