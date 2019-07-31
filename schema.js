const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema
} = require("graphql");
const axios = require("axios");

//Lauch type
const LauchType = new GraphQLObjectType({
  name: "Launch",
  fields: () => ({
    flight_number: {
      type: GraphQLInt
    },
    mission_name: {
      type: GraphQLString
    },
    lauch_year: {
      type: GraphQLString
    },
    lauch_date_local: {
      type: GraphQLString
    },
    lauch_success: {
      type: GraphQLBoolean
    },
    rocket: {
      type: RocketType
    }
  })
});

//Rocket Type
const RocketType = new GraphQLObjectType({
  name: "Rocket",
  fields: () => ({
    rocket_id: {
      type: GraphQLString
    },
    rocket_name: {
      type: GraphQLString
    },
    rocket_type: {
      type: GraphQLString
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    launches: {
      type: new GraphQLList(LauchType),
      resolve(parent, args) {
        return axios
          .get("https://api.spacexdata.com/v3/launches")
          .then(res => res.data);
      }
    },
    launch: {
      type: LauchType,
      args: {
        flight_number: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return axios
          .get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`)
          .then(res => res.data);
      }
    },
    rockets: {
      type: new GraphQLList(RocketType),
      resolve(parent, args) {
        return axios
          .get("https://api.spacexdata.com/v3/rockets")
          .then(res => res.data);
      }
    },
    rocket: {
      type: RocketType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return axios
          .get(`https://api.spacexdata.com/v3/rockets/${args.id}`)
          .then(res => res.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
