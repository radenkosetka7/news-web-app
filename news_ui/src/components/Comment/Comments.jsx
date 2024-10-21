import React, {useState} from 'react';
import {Input} from 'antd';
import {Comment} from '@ant-design/compatible';
import 'antd/dist/reset.css';
import {useDispatch} from "react-redux";
import {addComment, getAllNewsComments} from "../../redux-store/commentSlice";
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

        //const newComment = {name, comment: value};
        const data = {
            newsId: id,
            user: name,
            content: value,
        };
        dispatch(addComment(data))
        setTimeout(() => {
            dispatch(getAllNewsComments({id: id, page: 0, size: 10}));
        }, 1000);
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