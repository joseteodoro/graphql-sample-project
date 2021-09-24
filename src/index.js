const { app } = require('./server');
const { server } = require('./graphql/apollo');

const PORT = 4001;

app.listen({ port: PORT }, () => {
  console.log(`Server ready at: http://localhost:${PORT}${server.graphqlPath}`);
});
