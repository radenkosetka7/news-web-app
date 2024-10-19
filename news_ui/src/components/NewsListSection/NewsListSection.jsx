import {Card, List} from 'antd';
import './NewsListSection.css';
import {Link} from "react-router-dom";

const NewsListSection = ({title, newsItems, column = 4}) => {
    const linkPath = title?.trim().toLowerCase().replace(/ /g, '-');
    return (

        <Card title={<Link to={`/${linkPath}`}>{title}</Link>} className="card-list">

            <List
                grid={{gutter: 16, column: column}}
                dataSource={newsItems}
                className="list-card"
                renderItem={item => {
                    const foramattedRoditelj = item.roditeljNaziv?.trim().toLowerCase().replace(/ /g, '-');
                    const foramattedMeni = item.meniNaziv?.trim().toLowerCase().replace(/ /g, '-');
                    const foramattedNaslov = item.Naslov?.trim().toLowerCase().replace(/ /g, '-');
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
