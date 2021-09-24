import { app } from "./server";

app.listen({ port: PORT }, () => {
    console.log(`Server ready at: http://localhost:${PORT}${server.graphqlPath}`);
});