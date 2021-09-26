import React, {useEffect} from "react";
import { useMutation, useApolloClient, gql } from "@apollo/client";

import UserForm from "../components/UserForm";

const SIGNUP_USER = gql`
  mutation signUp($email: String!, $username: String!, $password: String!) {
    signUp(email: $email, username: $username, password: $password)
  }
`;

const SingUp = props => {
  const client = useApolloClient();
  const [signUp, {loading, error}] = useMutation(SIGNUP_USER, {
    onCompleted: data => {
      // console.log(data.signUp);
      localStorage.setItem('token', data.signUp);
      // update the local cache 更新本機快取
      client.writeData({ data: { isLoggedIn: true } });
      props.history.push('/');  // 重新導向首頁
    }
  })

  useEffect(()=>{
    document.title = "Sign Up - Notedly"
  })
  return (
    <React.Fragment>
      <UserForm action={signUp} formType="signup"/>
      {loading && <p>Loading...</p>}
      {error && <p>Error creating an account!</p>}
    </React.Fragment>
  )
}

export default SingUp;