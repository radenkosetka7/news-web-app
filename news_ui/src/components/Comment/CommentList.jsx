import {useDispatch, useSelector} from "react-redux";
import React, {useState} from "react";
import {getCommentReplies, removeCommentReplies} from "../../redux-store/commentSlice";
import {Button, Card, Input, List} from "antd";
import {Comment} from "@ant-design/compatible";
import ChildCommentList from "./ChildCommentList";
import Editor from "./Editor";

const CommentList = () => {
    const newsComments = useSelector((state) => state.comments.newsComments);
    const dispatch = useDispatch();
    const [commentsVisibility, setCommentsVisibility] = useState({});
    const [repliesVisibility, setRepliesVisibility] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [value, setValue] = useState('');
    const [name, setName] = useState('');

    // useEffect(() => {
    //     console.log("newsComments", newsComments);
    //     console.log("a")
    //
    // }, [newsComments]);

    const handleSubmit = () => {
        if (!value || !name) return;
        setSubmitting(true);

        // const newComment = {name, comment: value};
        // console.log("newComment", newComment);
        // setComments([...comments, newComment]);
        //
        // setSubmitting(false);
        // setValue('');
        // setName('');
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
                dispatch(getCommentReplies({id: id, newsId: 863933}));
            } else {
                dispatch(removeCommentReplies({id: id}));
            }
            return {
                ...prev,
                [id]: !isCurrentlyVisible,
            };
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

    return (
        <>
            {newsComments && newsComments.length > 0 &&
                <List
                    className="comment-list"
                    header={`${newsComments.length} replies`}
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
                                <ChildCommentList parentId={item.id}/>
                            )}
                            {repliesVisibility[item.id] && (
                                <>
                                    <Input
                                        placeholder="Unesite ime"
                                        value={name}
                                        onChange={handleNameChange}
                                    />
                                    <Comment
                                        content={<Editor
                                            onChange={handleCommentChange}
                                            onSubmit={handleSubmit}
                                            submitting={submitting}
                                            value={value}
                                        />}
                                    />
                                </>
                            )}
                        </Card>
                    )}
                />
            }
        </>
    );
}

export default CommentList;