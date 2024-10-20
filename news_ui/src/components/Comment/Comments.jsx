import React, {useEffect, useState} from 'react';
import {Button, Card, Form, Input, List} from 'antd';
import {Comment} from '@ant-design/compatible';
import 'antd/dist/reset.css';
import {useDispatch, useSelector} from "react-redux";
import {addComment, getAllNewsComments, getCommentReplies, removeCommentReplies} from "../../redux-store/commentSlice";
import './Comments.css';

const {TextArea} = Input;
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
    );
}
const Editor = ({onChange, onSubmit, submitting, value}) => (<>
    <Form.Item>
        <TextArea rows={4} onChange={onChange} value={value}/>
    </Form.Item>
    <Form.Item>
        <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
            Unesite komentar
        </Button>
    </Form.Item>
</>);
const Comments = () => {
    const [comments, setComments] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [value, setValue] = useState('');
    const [name, setName] = useState('');
    const dispatch = useDispatch();


    const handleSubmit = () => {
        if (!value || !name) return;
        setSubmitting(true);

        //const newComment = {name, comment: value};
        const data = {
            newsId: 863933,
            user: name,
            content: value,
        };
        dispatch(addComment(data))
        setTimeout(() => {  dispatch(getAllNewsComments({id: 863933, page: 0, size: 10})); }, 1000);
        setComments([...comments, data]);

        setSubmitting(false);
        setValue('');
        setName('');
    };

    const handleCommentChange = (e) => {
        setValue(e.target.value);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    return (<>
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
        <br/>
        <CommentList/>
    </>);
};

export default Comments;