const express = require('express');
const graphqlHTTP = require('express-graphql');
const { GraphQLSchema } = require('graphql');

const { queryType } = require('./query.js');

const port = 4444;
const app = express();

const schema = new GraphQLSchema({ query: queryType });

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.get('/', (req, res) => {
  res.send('hi');
});

app.listen(port, () => console.log(`Server Running at localhost:${port}`));
