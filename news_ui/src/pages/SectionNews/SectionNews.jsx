import {Link, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Col, Row} from "antd";
import React, {useEffect} from "react";
import {getAllSectionNews} from "../../redux-store/newsSlice";

const SectionNews = () => {
    const location = useLocation();
    const {meniId} = location.state || {};
    const sectionNews = useSelector((state) => state.news.sectionNews);
    const sectionStatus = useSelector((state) => state.news.sectionStatus);
    const dispatch = useDispatch();
    const menuItem = useSelector((state) => state.menu.items).find(item => item.meniID === meniId);
    const categories = [...new Set(menuItem?.Kategorije.map(item => item.Naziv))];
    useEffect(() => {
        if (sectionStatus === 'idle' && menuItem !=null) {
            dispatch(getAllSectionNews({id: menuItem?.meniID, page: 1, size: 100}));
        }
    }, [menuItem]);

    console.log("menu Items " + JSON.stringify(menuItem))
    return (
        <>
            <div>
                <Link to="/">Naslovna</Link> &gt; <Link to={`/${menuItem?.Naziv}`}>{menuItem?.Naziv}</Link> &gt;
                {menuItem?.Kategorije?.map((category) => {
                    const formattedNaziv = menuItem?.Naziv.trim().toLowerCase().replace(/ /g, '-');
                    const formattedCategoryNaziv = category.Naziv.trim().toLowerCase().replace(/ /g, '-');
                    return (
                        <span key={category.Id}>
            <Link to={`/${formattedNaziv}/${formattedCategoryNaziv}`}>
                {category.Naziv}
            </Link>
                            {category !== menuItem.Kategorije[menuItem.Kategorije.length - 1] && '  '}
        </span>
                    );
                })}

            </div>
            <div style={{backgroundColor: menuItem?.Boja, color: "white", fontSize: "20px"}}>
                <label>{menuItem?.Naziv}</label>
            </div>
            <Row justify="center">
                <Col span={8}>

                </Col>
                <Col span={8}>

                </Col>
            </Row>
            <Row justify="center">
                <Col span={16}>

                </Col>
            </Row>
        </>
    );
}

export default SectionNews;