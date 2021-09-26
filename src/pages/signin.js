import React, { useEffect } from "react";
import { useMutation, useApolloClient, gql } from "@apollo/client";

import UserForm from "../components/UserForm";

const SIGNIN_USER = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password)
  }
`;

const SignIn = props => {
  useEffect(() => {
    document.title = 'Sign In - Notedly';
  });

  const client = useApolloClient();
  const [signIn, {loading, error}] = useMutation(SIGNIN_USER, {
    onCompleted: data => {
      // console.log(data.signIn);
      localStorage.setItem('token', data.signIn);
      // update the local cache 更新本機快取
      client.writeData({ data: { isLoggedIn: true } });
      props.history.push('/');  // 重新導向首頁
    }
  })

  return (
    <React.Fragment>
      <UserForm action={signIn} formType="signIn"/>
      {loading && <p>Loading...</p>}
      {error && <p>Error creating an account!</p>}
    </React.Fragment>
  )
}

export default SignIn;