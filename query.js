const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} = require('graphql');
const _ = require('lodash');

const { movieType, directorType } = require('./types');
const { movies, directors } = require('./data');

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    hello: {
      type: GraphQLString,

      resolve: function () {
        return `Hello World. ${new Date()}`;
      },
    },

    movie: {
      type: movieType,
      args: {
        id: { type: GraphQLInt },
        page: { type: GraphQLInt, defaultValue: 1 },
        limit: { type: GraphQLInt, defaultValue: 2 }
      },
      resolve: function (source, args) {
        return _.find(movies, { id: args.id });
      }
    },

    director: {
      type: directorType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve: function (source, args) {
        return _.find(directors, { id: args.id });
      }
    }
  }
});

exports.queryType = queryType;