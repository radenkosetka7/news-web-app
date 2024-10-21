import {useDispatch, useSelector} from "react-redux";
import React, {useState} from "react";
import {
    addComment,
    getAllNewsComments,
    getCommentReplies,
    getNewsCommentsCount,
    removeCommentReplies
} from "../../redux-store/commentSlice";
import {Button, Card, Col, List, Row} from "antd";
import {Comment} from "@ant-design/compatible";
import ChildCommentList from "./ChildCommentList";
import Editor from "./Editor";
import './CommentList.css'

const CommentList = ({newsId}) => {
    const newsComments = useSelector((state) => state.comments.newsComments);
    const dispatch = useDispatch();
    const [commentsVisibility, setCommentsVisibility] = useState({});
    const [repliesVisibility, setRepliesVisibility] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [value, setValue] = useState('');
    const [name, setName] = useState('');
    const commentsCount = useSelector((state) => state.comments.commentsCount);
    const {page, last} = useSelector((state) => state.comments.commentsPagination);


    const handleSubmit = (parentId) => {
        if (!value || !name) return;
        setSubmitting(true);
        const data = {
            newsId: newsId,
            user: name,
            content: value,
            parentCommentId: parentId
        };
        dispatch(addComment(data));
        dispatch(getNewsCommentsCount(newsId));
        setSubmitting(false);
        setValue('');
        setName('');
        setRepliesVisibility(prevState => {
            const {[parentId]: _, ...newVisibility} = prevState;
            return newVisibility;
        });
    };
    const handleReply = (commentId) => {
        setRepliesVisibility((prev) => {
            const isCurrentlyVisible = prev[commentId];
            return {
                ...prev,
                [commentId]: !isCurrentlyVisible,
            };
        });
    };
    const handleCommentChange = (e) => {
        setValue(e.target.value);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleShowMore = (id) => {
        setCommentsVisibility((prev) => {
            const isCurrentlyVisible = prev[id];
            if (!isCurrentlyVisible) {
                dispatch(getCommentReplies({id: id, newsId: newsId}));
            } else {
                dispatch(removeCommentReplies({id: id}));
            }
            return {
                ...prev,
                [id]: !isCurrentlyVisible,
            };
        });
    };

    const handleLoadMore = () => {
        dispatch(getAllNewsComments({id: newsId, page: page, size: 10, loadMore: true}));
    }

    return (
        <>
            {newsComments && newsComments.length > 0 &&
                <List
                    className="comment-list"
                    header={`Broj komentara: ${commentsCount}`}
                    itemLayout="horizontal"
                    dataSource={newsComments}
                    renderItem={(item) => (
                        <Card key={item.id}>
                            <Comment
                                author={item.user}
                                content={item.content}
                                actions={[
                                    <Button onClick={() => handleShowMore(item.id)}>
                                        {commentsVisibility[item.id] ? "Hide replies" : "Show more"}
                                    </Button>,
                                    <Button onClick={() => handleReply(item.id)}>
                                        {repliesVisibility[item.id] ? "Cancel" : "Reply"}
                                    </Button>
                                ]}
                            />
                            {commentsVisibility[item.id] && (
                                <>
                                    <ChildCommentList parentId={item.id}/></>
                            )}
                            {repliesVisibility[item.id] && (
                                <Row className="comment-list-row">
                                    <Comment
                                        content={
                                            <Editor
                                                onChange={handleCommentChange}
                                                onSubmit={() => handleSubmit(item.id)}
                                                submitting={submitting}
                                                value={value}
                                                name={name}
                                                onNameChange={handleNameChange}
                                            />
                                        }
                                    />
                                </Row>
                            )}
                        </Card>
                    )}
                />
            }
            {!last && <Col className="last-col" span={8}>
                <Button className="more-button" onClick={handleLoadMore} type="primary">Učitaj...</Button>
            </Col>}
        </>
    );
}

export default CommentList;