import React, {useEffect} from 'react';
import {Breadcrumb, Card, Col, Row} from 'antd';
import 'antd/dist/reset.css';
import {useDispatch, useSelector} from "react-redux";
import {getMenu} from "../../redux-store/menuSlice";
import {getAllSectionNews, getNewsDetails} from "../../redux-store/newsSlice";
import {useNavigate, useParams} from "react-router-dom";
import SideNewsSection from "../../components/SideNewsSection/SideNewsSection";
import Sider from "antd/es/layout/Sider";
import Comments from "../../components/Comment/Comments";
import {getAllNewsComments} from "../../redux-store/commentSlice";
import axios from "axios";
import {addStatistic} from "../../redux-store/statisticSlice";
import {formatString, getBrowserName, getOsName} from "../../util/helpers";
import './NewsDetails.css'

const NewsDetails = () => {

    const selectedNews = useSelector((state) => state.news.selectedNews);
    const sectionNews = useSelector((state) => state.news.sectionNews);
    const {id} = useParams();
    const navigate = useNavigate();
    const menuItem = useSelector((state) => state.menu.items).find(item => item.meniID === selectedNews?.meniRoditelj);
    const dispatch = useDispatch();

    useEffect(() => {

        getData();
    }, [id]);

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
    const handleNavigate = (path, state) => {
        navigate(path, {state});
    };

    return (
        <>
            <Row justify="center">
                <Col span={20}>
                    <Breadcrumb className="breadcrumb"
                                items={[
                                    {
                                        title: (
                                            <span
                                                onClick={() => handleNavigate('/', {})}>Naslovna
                                            </span>
                                        ),
                                    },
                                    {
                                        title: (
                                            <span
                                                onClick={() => {
                                                    handleNavigate(`/${menuItem?.Naziv.trim().toLowerCase()}`, {meniId: menuItem?.meniID});
                                                    window.location.assign(`/${menuItem?.Naziv.trim().toLowerCase()}`);
                                                }}
                                            >{menuItem?.Naziv}
                                            </span>
                                        ),
                                    },
                                    ...(menuItem?.Kategorije?.map((category, index) => {
                                        const formattedNaziv = formatString(menuItem?.Naziv);
                                        const formattedCategoryNaziv = formatString(category.Naziv);
                                        return {
                                            title: (
                                                <span
                                                    key={category.Id || index}
                                                    onClick={() => handleNavigate(
                                                        `/${formattedNaziv}/${formattedCategoryNaziv}`,
                                                        {meniId: menuItem?.meniID, childId: category.meniID}
                                                    )}>
                                        {category.Naziv}
                                    </span>
                                            ),
                                        };
                                    }) || []),
                                ]}
                    />
                </Col>
            </Row>
            <Row justify="center" style={{backgroundColor: menuItem?.Boja}}>
                <Col span={20}>
                    <label className="label-detail">{menuItem?.Naziv}</label>
                </Col>
            </Row>
            <Row gutter={16} justify={"center"}>
                <Col span={13}>
                    <h1>{selectedNews?.Naslov}</h1>
                    <Card
                        hoverable
                        cover={<img alt="Logo" src={selectedNews?.Slika[0]?.slikaURL}/>}
                    >
                        <p>{selectedNews?.Lid}</p>
                        <div dangerouslySetInnerHTML={{__html: selectedNews?.Tjelo}}/>
                    </Card>
                </Col>
                <Col span={7}>
                    <Card title="Najnovije vijesti">
                        <Col span={6}> <Sider width={300} className="sider-color">
                            <SideNewsSection news={sectionNews.filter(item => item.vijestID !== id)}/>
                        </Sider></Col>
                    </Card>
                </Col>
            </Row>
            <br/>
            <Row gutter={16} justify={"center"}>
                <Col span={20}><h2>Komentari</h2></Col>
                <Col span={20}>
                    <Comments id={id}/>
                </Col>
            </Row>
        </>
    );
};

export default NewsDetails;
