import { gql } from "@apollo/client";

const loginQuery = gql`
    query Query($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            user {
                id
                name
                username
                last_name
                photo
            }
            jwt
        }
    }
`;

export default loginQuery;
