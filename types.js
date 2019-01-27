const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} = require('graphql');

const _ = require('lodash');

let { movies } = require('./data');

const movieType = new GraphQLObjectType({
  name: 'Movie',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    year: { type: GraphQLInt },
    directorId: { type: GraphQLID },
  },
});

const directorType = new GraphQLObjectType({
  name: 'Director',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    // movies字段是数据库都没存的，手工附加的字段，需要自定义reslove函数了。
    movies: {
      type: new GraphQLList(movieType),
      resolve(source, args) {
        return _.filter(movies, { directorId: source.id });
      }
    },
  },
});

exports.movieType = movieType;
exports.directorType = directorType;
