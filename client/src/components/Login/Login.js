import React, { useState } from "react";
import { AUTH_TOKEN } from "../../constants";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const Login = props => {
  const [state, setState] = useState({
    login: true, // switch between Login and SignUp
    email: "",
    password: "",
    name: ""
  });

  const _confirm = async data => {
    const { token } = state.login ? data.login : data.signup;
    _saveUserData(token);
    props.history.push(`/`);
  };

  const _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token);
  };

  const { login, email, password, name } = state;
  return (
    <div>
      <h4 className="mv3">{login ? "Login" : "Sign Up"}</h4>
      <div className="flex flex-column">
        {!login && (
          <input
            value={name}
            onChange={e => setState({ ...state, name: e.target.value })}
            type="text"
            placeholder="Your name"
          />
        )}
        <input
          value={email}
          onChange={e => setState({ ...state, email: e.target.value })}
          type="text"
          placeholder="Your email address"
        />
        <input
          value={password}
          onChange={e => setState({ ...state, password: e.target.value })}
          type="password"
          placeholder="Choose a safe password"
        />
      </div>
      <div className="flex mt3">
        <Mutation
          mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
          variables={{ email, password, name }}
          onCompleted={data => _confirm(data)}
        >
          {mutation => (
            <div className="pointer mr2 button" onClick={mutation}>
              {login ? "login" : "create account"}
            </div>
          )}
        </Mutation>
        <div
          className="pointer button"
          onClick={() => setState({ ...state, login: !login })}
        >
          {login ? "need to create an account?" : "already have an account?"}
        </div>
      </div>
    </div>
  );
};

export default Login;
