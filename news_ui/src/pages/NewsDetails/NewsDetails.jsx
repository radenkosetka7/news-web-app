import React, {useEffect} from 'react';
import {Card, Col, Layout, Row} from 'antd';
import 'antd/dist/reset.css';
import {useDispatch, useSelector} from "react-redux";
import {getMenu} from "../../redux-store/menuSlice";
import {getAllSectionNews, getNewsDetails} from "../../redux-store/newsSlice";
import {useParams} from "react-router-dom";
import SideNewsSection from "../../components/SideNewsSection/SideNewsSection";
import Sider from "antd/es/layout/Sider";

const {Header, Content} = Layout;

const NewsDetails = () => {

    const selectedNews = useSelector((state) => state.news.selectedNews);
    const sectionNews = useSelector((state) => state.news.sectionNews);
    const dispatch = useDispatch();
    const {id} = useParams();


    useEffect(() => {
        if (!selectedNews) {
            dispatch(getMenu());
        }
        if (id) {
            dispatch(getNewsDetails(id));
        }
    }, [id]);

    useEffect(() => {
        if (selectedNews) {
            dispatch(getAllSectionNews({id: selectedNews?.meniRoditelj, page: 1, size: 11}));
        }
    }, [selectedNews]);


    return (
        <Row gutter={16} justify={"center"}>
            <Col span={12}>
                <h1>{selectedNews?.Naslov}</h1>
                <Card
                    hoverable
                    cover={<img alt="Logo" src={selectedNews?.Slika[0]?.slikaURL}/>}
                >
                    <p>{selectedNews?.Lid}</p>
                    <div dangerouslySetInnerHTML={{__html: selectedNews?.Tjelo}}/>
                </Card>
            </Col>
            <Col span={6}>
                <Card title="Najnovije vijesti">
                    <Col span={6}> <Sider width={300} className="sider-color">
                        <SideNewsSection news={sectionNews.filter(item => item.vijestID !== id)}/>
                    </Sider></Col>
                </Card>
            </Col>
        </Row>
    );
};

export default NewsDetails;
