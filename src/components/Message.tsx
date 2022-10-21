import React, { Fragment } from "react";
const Message = ({
    isEmitter,
    message,
    id,
    onDelete,
}: {
    isEmitter: boolean;
    message: string;
    id: number;
    onDelete?: () => void;
    children?: any;
}) => {
    return (
        <Fragment>
            {isEmitter ? (
                <div className="flex justify-end mb-4">
                    <div className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                        {message}
                    </div>
                </div>
            ) : (
                <div className="flex justify-start mb-4">
                    <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                        {message}
                    </div>
                </div>
            )}
        </Fragment>
    );
};

export default Message;
