import {Card, List} from 'antd';
import './NewsListSection.css';
import {Link, useNavigate} from "react-router-dom";
import React from "react";
import {useSelector} from "react-redux";
import {formatString} from "../../util/helpers";

const NewsListSection = ({title, newsItems, column = 4}) => {
    const linkPath =formatString(title);
    const navigate = useNavigate();
    const menuItem = useSelector((state) => state.menu.items);

    const handleNavigate = (path, state) => {
        const menuId = menuItem.find(item => item.Naziv.toLowerCase() === linkPath)?.meniID;
        state.meniId = menuId;
        navigate(path, {state});
    };
    return (

        <Card title={<span
            onClick={() => handleNavigate(`/${linkPath}`, {meniId: {}})}>{title}
                                            </span>} className="card-list">

            <List
                grid={{gutter: 16, column: column}}
                dataSource={newsItems}
                className="list-card"
                renderItem={item => {
                    const foramattedRoditelj = formatString(item.roditeljNaziv);
                    const foramattedMeni = formatString(item.meniNaziv);
                    const foramattedNaslov = formatString(item.Naslov);
                    return (
                        <List.Item>
                            <Link to={`/${foramattedRoditelj}/${foramattedMeni}/${foramattedNaslov}/${item.vijestID}`}>
                                <Card cover={<img alt={item.Naslov} src={item.Slika}/>}>
                                    <Card.Meta className="card-title"
                                               title={item.Naslov} description={item.Datum}/>
                                </Card>
                            </Link>
                        </List.Item>
                    )
                }}
            />
        </Card>
    );
};

export default NewsListSection;
