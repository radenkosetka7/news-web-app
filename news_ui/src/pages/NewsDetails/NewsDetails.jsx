import React, {useEffect} from 'react';
import {Card, Col, Layout, Row} from 'antd';
import 'antd/dist/reset.css';
import {useDispatch, useSelector} from "react-redux";
import {getMenu} from "../../redux-store/menuSlice";
import {getAllSectionNews, getNewsDetails} from "../../redux-store/newsSlice";
import {useParams} from "react-router-dom";
import SideNewsSection from "../../components/SideNewsSection/SideNewsSection";
import Sider from "antd/es/layout/Sider";
import Comments from "../../components/Comment/Comments";
import {getAllNewsComments} from "../../redux-store/commentSlice";
import axios from "axios";
import {addStatistic} from "../../redux-store/statisticSlice";

const {Header, Content} = Layout;

const NewsDetails = () => {

    const selectedNews = useSelector((state) => state.news.selectedNews);
    const sectionNews = useSelector((state) => state.news.sectionNews);
    const {id} = useParams();

    const dispatch = useDispatch();

    useEffect(() => {

        getData();
    }, []);

    useEffect(() => {
        dispatch(getAllNewsComments({id: id, page: 0, size: 10}));
    }, []);


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

    const getData = async () => {
        const browser = navigator.userAgent;
        const os = getOsName(browser);
        const browserName = getBrowserName(browser);
        const apiResponse = await axios.get('https://ipapi.co/json/');
        const data = {
            ipAddress: apiResponse.data.ip,
            browserName: browserName,
            osName: os,
            country: apiResponse.data.country_name,
            city: apiResponse.data.city,
            sectionName: selectedNews?.meniRoditeljNaziv,
            subsectionName: selectedNews?.meniNaziv,
            newsTitle: selectedNews?.Naslov,
        };
        dispatch(addStatistic(data));
    }

    const getOsName = (name) => {
        let os = "Unknown OS";

        if (name.indexOf("Win") !== -1) {
            os = "Windows";
        } else if (name.indexOf("Mac") !== -1) {
            os = "Mac OS";
        } else if (name.indexOf("Linux") !== -1) {
            os = "Linux";
        } else if (name.indexOf("Android") !== -1) {
            os = "Android";
        } else if (name.indexOf("like Mac") !== -1) {
            os = "iOS";
        }
        return os;
    }
    const getBrowserName = (name) => {
        let browserName = "Unknown Browser";

        if (name.indexOf("Chrome") !== -1) {
            browserName = "Chrome";
        } else if (name.indexOf("Safari") !== -1) {
            browserName = "Safari";
        } else if (name.indexOf("Firefox") !== -1) {
            browserName = "Firefox";
        } else if (name.indexOf("MSIE") !== -1 || name.indexOf("Trident") !== -1) {
            browserName = "Internet Explorer";
        } else if (name.indexOf("Edge") !== -1) {
            browserName = "Edge";
        }

        return browserName;
    }


    return (
        <>
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
            <br/>
            <Row gutter={16} justify={"center"}>
                <Col span={18}><h2>Komentari</h2></Col>
                <Col span={18}>
                    <Comments/>
                </Col>
            </Row>
        </>
    );
};

export default NewsDetails;
