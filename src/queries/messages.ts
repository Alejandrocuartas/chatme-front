import { gql } from "@apollo/client";

const messagesQuery = gql`
    query Messages($person1: Int!, $person2: Int!) {
        messages(person1: $person1, person2: $person2) {
            id
            message
            listener_id
        }
    }
`;

export default messagesQuery;
