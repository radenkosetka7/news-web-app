import {useSelector} from "react-redux";
import {Card, List} from "antd";
import {Comment} from "@ant-design/compatible";
import React from "react";
import './ChildCommentList.css'

const ChildCommentList = ({parentId}) => {
    const commentReplies = useSelector((state) => state.comments.commentReplies);
    const filteredReplies = commentReplies[parentId];

    return (
        <>
            {filteredReplies?.length > 0 ? <List
                dataSource={filteredReplies}
                renderItem={(child) => (
                    (
                        <Card className="card-child-list">
                            <Comment
                                author={child.user}
                                content={child.content}
                            />
                        </Card>
                    )
                )}
            /> : <h4 className="no-comments">Nema komentara</h4>}
        </>
    );
};

export default ChildCommentList;