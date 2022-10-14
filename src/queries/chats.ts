import { gql } from "@apollo/client";

const chatsQuery = gql`
    query Query {
        chats {
            id
            name
            username
            last_name
            photo
        }
    }
`;

export default chatsQuery;
