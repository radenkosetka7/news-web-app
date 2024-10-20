import {Link, useLocation, useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import {getAllSubsectionNews, setCurrentPage} from "../../redux-store/newsSlice";
import {useDispatch, useSelector} from "react-redux";
import {Breadcrumb, Col, List, Row} from "antd";
import {getMenu} from "../../redux-store/menuSlice";
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
    const handleNavigate = (path, state) => {
        navigate(path, {state});
    };

    const handlePageChange = (page) => {
        dispatch(setCurrentPage(page - 1))
    };

    return (
        <>
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
            <hr style={{width: '100%', borderColor: 'gray'}}/>
            <Row justify="center">
                <Col span={16}>
                    <List
                        itemLayout="vertical"
                        size="large"
                        pagination={{
                            onChange: handlePageChange,
                            total: 500,
                            showSizeChanger: false,
                            pageSize: 15,
                        }}
                        dataSource={subsectionNews}
                        renderItem={(item) => {
                            const foramattedRoditelj = item.roditeljNaziv?.trim().toLowerCase().replace(/ /g, '-');
                            const foramattedMeni = item.meniNaziv?.trim().toLowerCase().replace(/ /g, '-');
                            const foramattedNaslov = item.Naslov?.trim().toLowerCase().replace(/ /g, '-');
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
                    />
                </Col>
            </Row>
        </>
    );

}

export default SubsectionNews;