import { gql } from "@apollo/client";

const newMessage = gql`
    mutation Mutation($message: String!, $emitter: Int!, $listener: Int!) {
        newMessage(message: $message, emitter: $emitter, listener: $listener) {
            message
            id
            listener_id
            emitter_id
        }
    }
`;

export default newMessage;
