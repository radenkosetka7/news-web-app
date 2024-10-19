import {useLocation, useNavigate} from "react-router-dom";
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
    //debugger
    const {meniId} = location.state || {};
    const sectionNews = useSelector((state) => state.news.sectionNews);
    const dispatch = useDispatch();
    const menuItem = useSelector((state) => state.menu.items).find(item => item.meniID === meniId);
    const categories = [...new Set(menuItem?.Kategorije.map(item => item.Naziv))];
    const topNews = sectionNews.slice(0, 2);
    const leftNews = sectionNews.slice(2, 5);
    const rightNews = sectionNews.slice(5, 8);
    const groupedNews = sectionNews.slice(8, sectionNews.length);
    const navigate = useNavigate();
    useEffect(() => {

        if (!menuItem) {
            dispatch(getMenu());
        }
        if (menuItem != null) {
            dispatch(getAllSectionNews({id: menuItem?.meniID, page: 1, size: 1000}));
        }
    }, [menuItem]);
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
                                        const formattedNaziv = menuItem?.Naziv.trim().toLowerCase().replace(/ /g, '-');
                                        const formattedCategoryNaziv = category.Naziv.trim().toLowerCase().replace(/ /g, '-');
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
                    <label style={{fontSize: 'large', color: "white"}}>{menuItem?.Naziv}</label>
                </Col>
            </Row>
            <Row justify="center">
                <Col span={3} style={{paddingTop: '20px'}}>
                    <h4>Glavni naslovi</h4>
                </Col>
                <Col span={17}>
                    <Row justify="space-between">
                        {topNews.map((item, index) => (
                            <Col span={11} key={index}>
                                <MainNewsSection show={true} {...item}/>
                            </Col>
                        ))}
                    </Row>
                    <Row justify="space-between">
                        {leftNews && <Col span={11}>
                            <SideNewsSection news={leftNews}/>
                        </Col>}
                        {rightNews &&  <Col span={11}>
                            <SideNewsSection news={rightNews}/>
                        </Col>}
                    </Row>
                </Col>
            </Row>
            <Row justify="center">
                <Col span={20}>
                    <Row>
                        {categories.map((category, index) => (
                            <React.Fragment key={index}>
                                <hr style={{width: '100%', borderColor: 'gray'}}/>
                                {groupedNews.filter(item => item.meniNaziv === category).slice(0, 3).length>0 && <Col span={18}>
                                    <NewsListSection
                                        key={category}
                                        title={category}
                                        column={3}
                                        newsItems={groupedNews.filter(item => item.meniNaziv === category).slice(0, 3)}
                                    />
                                </Col>}
                                <Col span={6}>
                                    {groupedNews.filter(item => item.meniNaziv === category).slice(3, 6).length > 0 && (
                                        <SideNewsSection
                                            news={groupedNews.filter(item => item.meniNaziv === category).slice(3, 6)}
                                        />
                                    )}
                                </Col>
                            </React.Fragment>
                        ))}
                    </Row>
                </Col>
            </Row>
        </>
    );
}

export default SectionNews;