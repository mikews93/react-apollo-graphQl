const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
    customFormatErrorFn: error => ({
      message: error.message,
      locations: error.locations,
      stack: error.stack ? error.stack.split("\n") : [],
      path: error.path
    })
  })
);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
