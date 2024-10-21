import React, {useState} from 'react';
import {Row} from 'antd';
import {Comment} from '@ant-design/compatible';
import 'antd/dist/reset.css';
import {useDispatch} from "react-redux";
import {addComment, getAllNewsComments, getNewsCommentsCount} from "../../redux-store/commentSlice";
import './Comments.css';
import CommentList from "./CommentList";
import Editor from "./Editor";


const Comments = ({id}) => {
    const [comments, setComments] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [value, setValue] = useState('');
    const [name, setName] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = () => {
        if (!value || !name) return;
        setSubmitting(true);

        const data = {
            newsId: id,
            user: name,
            content: value,
        };
        dispatch(addComment(data))
        setTimeout(() => {
            dispatch(getNewsCommentsCount(id));
            dispatch(getAllNewsComments({id: id, page: 0, size: 10, loadMore: false}));
        }, 1000);
        setComments([...comments, data]);

        setValue('');
        setName('');
        setSubmitting(false);
    };

    const handleCommentChange = (e) => {
        setValue(e.target.value);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    return (
        <Row className="comment-row-flex">
            <Comment
                content={
                    <Editor
                        onChange={handleCommentChange}
                        onSubmit={handleSubmit}
                        submitting={submitting}
                        value={value}
                        name={name}
                        onNameChange={handleNameChange}
                    />
                }
            />
            <br/>
            <CommentList newsId={id}/>
        </Row>);
};

export default Comments;