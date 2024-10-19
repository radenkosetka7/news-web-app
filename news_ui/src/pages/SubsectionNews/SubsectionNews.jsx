import {Link, NavLink, useLocation} from "react-router-dom";
import React, {useEffect} from "react";
import {getAllSubsectionNews} from "../../redux-store/newsSlice";
import {useDispatch, useSelector} from "react-redux";
import {Breadcrumb, Col, List, Row} from "antd";
import {getMenu} from "../../redux-store/menuSlice";

const SubsectionNews = () => {

    const location = useLocation();
    const dispatch = useDispatch();
    const {childId, meniId} = location.state || {};
    const subsectionNews = useSelector((state) => state.news.subsectionNews);
    const menuItem = useSelector((state) => state.menu.items).find(item => item.meniID === meniId);
    const category = menuItem?.Kategorije.find(item => item.meniID === childId);

    useEffect(() => {
        if (!menuItem) {
            dispatch(getMenu());
        }
        if (menuItem != null) {
            dispatch(getAllSubsectionNews({id: childId, page: 0, size: 15}));
        }
    }, [category]);


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
                            onChange: (page) => {
                                console.log(page);
                            },
                            total:500,
                            showSizeChanger:false,
                            pageSize: 10,
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
                                <Link to={`/${foramattedRoditelj}/${foramattedMeni}/${foramattedNaslov}/${item.vijestID}`}>
                                <List.Item.Meta
                                    title={<a href={item.href}>{item.Naslov}</a>}
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
                        )}}
                    />
                </Col>
            </Row>
        </>
    );

}

export default SubsectionNews;