import {useSelector} from "react-redux";
import {Card, List} from "antd";
import {Comment} from "@ant-design/compatible";
import React from "react";

const ChildCommentList = ({parentId}) => {
    const commentReplies = useSelector((state) => state.comments.commentReplies);
    const filteredReplies = commentReplies[parentId];

    return (
        <>
            {filteredReplies?.length > 0 && (
                <List
                    dataSource={filteredReplies}
                    renderItem={(child) => (
                        (
                            <Card style={{marginLeft: '20px', marginTop: '10px'}}>
                                <Comment
                                    author={child.user}
                                    content={child.content}
                                />
                            </Card>
                        )
                    )}
                />
            )}
        </>
    );
};

export default ChildCommentList;