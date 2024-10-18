import React, {useEffect} from 'react';
import {Layout} from 'antd';
import MainNewsSection from '../../components/MainNewsSection/MainNewsSection';
import SideNewsSection from '../../components/SideNewsSection/SideNewsSection';
import {useDispatch, useSelector} from "react-redux";
import {getAllNews} from "../../redux-store/newsSlice";
import { Col, Row } from 'antd';
import NewsListSection from "../../components/NewsListSection/NewsListSection";
import './Home.css';
import {getTokens} from "../../redux-store/authSlice";
const {Content, Sider} = Layout;


const Home = () => {

    const news = useSelector((state) => state.news.allNews);
    const newsStatus = useSelector((state) => state.news.status);
    const dispatch = useDispatch();
    const categories = [...new Set(news[2]?.Kategorije.map(item => item.roditeljNaziv))];

    useEffect(() => {
        if (newsStatus === 'idle') {
            dispatch(getAllNews());
            dispatch(getTokens())
        }
    }, []);

    return (
        <>
        <Row justify="center">
            <Col span={8}>
                    <Content className={`main main-content`}>
                        {news.length > 0 &&
                            news[0]?.Glavna.map((item, index) => (
                                <MainNewsSection key={index} show={true} {...item} />
                            ))
                        }
                    </Content>

            </Col>
            <Col span={6}> <Content className={`sub main-content`}>
                {news.length > 0 &&
                    news[1]?.TopVijesti?.slice(0,3).map((item, index) => (
                        <MainNewsSection key={index} show={false} {...item}/>
                    ))
                }
            </Content></Col>
            <Col span={6}>  <Sider width={300} className="sider-color">
                <SideNewsSection news={news[1]?.TopVijesti.slice(3,news[1]?.TopVijesti.length)}/>
            </Sider></Col>
        </Row>
            <Row justify="center">
                <Col span={20}>
                    {categories.map(category => (
                        <NewsListSection
                            key={category}
                            title={category}
                            newsItems={news[2]?.Kategorije.filter(item => item.roditeljNaziv === category)}
                        />
                    ))}
                </Col>
            </Row>
            </>

    );
}
export default Home;