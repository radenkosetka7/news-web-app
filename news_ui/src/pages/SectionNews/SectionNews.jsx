import {NavLink, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Breadcrumb, Col, Row} from "antd";
import React, {useEffect} from "react";
import {getAllSectionNews} from "../../redux-store/newsSlice";
import {getMenu} from "../../redux-store/menuSlice";
import MainNewsSection from "../../components/MainNewsSection/MainNewsSection";
import SideNewsSection from "../../components/SideNewsSection/SideNewsSection";
import NewsListSection from "../../components/NewsListSection/NewsListSection";
import './SectionNews.css'

const SectionNews = () => {
    const location = useLocation();
    const {meniId} = location.state || {};
    const sectionNews = useSelector((state) => state.news.sectionNews);
    const sectionStatus = useSelector((state) => state.news.sectionStatus);
    const dispatch = useDispatch();
    const menuItem = useSelector((state) => state.menu.items).find(item => item.meniID === meniId);
    const categories = [...new Set(menuItem?.Kategorije.map(item => item.Naziv))];
    const topNews = sectionNews.slice(0, 2);
    const leftNews = sectionNews.slice(2, 5);
    const rightNews = sectionNews.slice(5, 8);
    const groupedNews = sectionNews.slice(8, sectionNews.length);

    useEffect(() => {
        if (!menuItem) {
            dispatch(getMenu());
        }
        if (sectionStatus === 'idle' && menuItem != null) {
            dispatch(getAllSectionNews({id: menuItem?.meniID, page: 1, size: 100}));
        }
    }, [menuItem]);
    return (
        <>
            <Row justify="center">
                <Breadcrumb className="breadcrumb"
                    items={[
                        {
                            title: <NavLink to="/">Naslovna</NavLink>,
                        },
                        {
                            title: <NavLink reloadDocument
                                            to={`/${menuItem?.Naziv.trim().toLowerCase()}`}>{menuItem?.Naziv}</NavLink>
                        },
                        ...(menuItem?.Kategorije?.map((category, index) => {
                            const formattedNaziv = menuItem?.Naziv.trim().toLowerCase().replace(/ /g, '-');
                            const formattedCategoryNaziv = category.Naziv.trim().toLowerCase().replace(/ /g, '-');
                            return {
                                title: (
                                    <NavLink key={category.Id || index}
                                             to={`/${formattedNaziv}/${formattedCategoryNaziv}`}>
                                        {category.Naziv}
                                    </NavLink>
                                ),
                            };
                        }) || []),
                    ]}
                />
            </Row>
            <div style={{backgroundColor: menuItem?.Boja, color: "white", fontSize: "20px"}}>
                <label>{menuItem?.Naziv}</label>
            </div>

            <Row justify="center">
                <Col span={2}>
                    <h4>Glavni naslovi</h4>
                </Col>
                <Col span={16}>
                    <Row justify="space-between">
                        {topNews.map((item, index) => (
                            <Col span={11} key={index}>
                                <MainNewsSection show={true} {...item}/>
                            </Col>
                        ))}
                    </Row>
                    <Row justify="space-between">
                        <Col span={11}>
                            <SideNewsSection news={leftNews}/>
                        </Col>
                        <Col span={11}>
                            <SideNewsSection news={rightNews}/>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row justify="center">
                <Col span={18}>
                    <Row>

                        {categories.map(category => (
                            <>
                                <hr style={{width: '100%', borderColor: 'gray'}}/>
                                <Col span={18}>
                                    <NewsListSection
                                        key={category}
                                        title={category}
                                        column={3}
                                        newsItems={groupedNews.filter(item => item.meniNaziv === category).slice(0, 3)}
                                    />
                                </Col>

                                <Col span={6}><SideNewsSection
                                    news={groupedNews.filter(item => item.meniNaziv === category).slice(3, 6)}/></Col>

                            </>
                        ))}
                    </Row>
                </Col>
            </Row>
        </>
    );
}

export default SectionNews;