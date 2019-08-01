import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const LAUNCHES_QUERY = gql`
  query LaunchesQuery {
    launches {
      flight_number
      mission_name
      lauch_success
      lauch_year
      rocket {
        rocket_id
        rocket_name
      }
    }
  }
`;

const Launches = () => {
  return (
    <div>
      <h1 className="launches">Launches</h1>
      <Query query={LAUNCHES_QUERY}>
        {({ loading, error, data: { launches } }) => {
          if (loading) return <h4>Loading...</h4>;
          if (error) return console.log(error);
          return launches
            ? launches.map((launch, index) => (
                <div key={index}>
                  {launch.flight_number} - {launch.mission_name}
                </div>
              ))
            : null;
        }}
      </Query>
    </div>
  );
};

export default Launches;
