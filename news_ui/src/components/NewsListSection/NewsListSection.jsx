import {Card, List} from 'antd';
import './NewsListSection.css';

const NewsListSection = ({title, newsItems}) => {
    return (

        <Card title={title} className="card-list">

            <List
                grid={{ gutter:16,column: 4}}
                dataSource={newsItems}
                className="list-card"
                renderItem={item => (

                    <List.Item>
                        <Card cover={<img alt={item.Naslov} src={item.Slika}/>}>
                            <Card.Meta className="card-title"
                                title={item.Naslov} description={item.Datum}/>
                        </Card>
                    </List.Item>
                )}
            />
        </Card>
    );
};

export default NewsListSection;