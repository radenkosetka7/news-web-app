import {Link, useLocation, useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import {getAllSubsectionNews, setCurrentPage} from "../../redux-store/newsSlice";
import {useDispatch, useSelector} from "react-redux";
import {Breadcrumb, Col, List, Row} from "antd";
import {getMenu} from "../../redux-store/menuSlice";
import {formatString, getBrowserName, getOsName} from "../../util/helpers";
import './SubsectionNews.css'
import axios from "axios";
import {addStatistic} from "../../redux-store/statisticSlice";

const SubsectionNews = () => {

    const location = useLocation();
    const dispatch = useDispatch();
    const {childId, meniId} = location.state || {};
    const subsectionNews = useSelector((state) => state.news.subsectionNews);
    const menuItem = useSelector((state) => state.menu.items).find(item => item.meniID === meniId);
    const category = menuItem?.Kategorije.find(item => item.meniID === childId);
    const navigate = useNavigate();
    const currentPage = useSelector((state) => state.news.currentPage);

    useEffect(() => {

        getData();
    }, [category]);

    useEffect(() => {
        if (!menuItem) {
            dispatch(getMenu());
        }
        if (menuItem != null) {
            dispatch(getAllSubsectionNews({id: childId, page: currentPage, size: 15}));
        }
    }, [category, currentPage]);

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
            sectionName: menuItem?.Naziv,
            subsectionName: category?.Naziv,
        };
        dispatch(addStatistic(data));
    }

    const handleNavigate = (path, state) => {
        navigate(path, {state});
    };

    const handlePageChange = (page) => {
        dispatch(setCurrentPage(page - 1))
    };

    return (
        <div className="sub-div">
            <Row justify="center">
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
                                            onClick={() => handleNavigate(`/${menuItem?.Naziv.trim().toLowerCase()}`, {meniId: menuItem?.meniID})}>
                                    {menuItem?.Naziv}
                                </span>
                                    ),
                                },
                                {
                                    title: <label>{category?.Naziv}</label>
                                }
                            ]}
                />
            </Row>
            <hr className="hr-sub"/>
            <Row justify="center">
                <Col span={16}>
                    {subsectionNews && subsectionNews.length > 0 &&
                        <List
                            itemLayout="vertical"
                            size="large"
                            pagination={{
                                onChange: handlePageChange,
                                total: subsectionNews.length === 15 ? 450 : 15,
                                showSizeChanger: false,
                                pageSize: 15,
                            }}
                            dataSource={subsectionNews}
                            renderItem={(item) => {
                                const foramattedRoditelj = formatString(item.roditeljNaziv);
                                const foramattedMeni = formatString(item.meniNaziv);
                                const foramattedNaslov = formatString(item.Naslov);
                                return (
                                    <List.Item

                                        key={item.Naslov}
                                        extra={
                                            <img
                                                width={272}
                                                height={150}
                                                alt="logo"
                                                src={item.Slika}
                                            />
                                        }
                                    >
                                        <Link
                                            to={`/${foramattedRoditelj}/${foramattedMeni}/${foramattedNaslov}/${item.vijestID}`}>
                                            <List.Item.Meta
                                                title={item.Naslov}
                                                description={
                                                    <>
                                                        <div>{item.Datum}</div>
                                                        <br/>
                                                        <div>{item.Lid}</div>
                                                    </>
                                                }
                                            />
                                            {item.content}
                                        </Link>
                                    </List.Item>
                                )
                            }}
                        />}
                </Col>
            </Row>
        </div>
    );

}

export default SubsectionNews;