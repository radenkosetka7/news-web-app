import {Card} from 'antd';
import { Col, Row } from 'antd';
import './MainNewsSection.css';

const MainNewsSection = ({Naslov,show, Datum, Slika,meniNaziv}) => {

    return (
        <Row className="main-news" justify="center">
            <Col span={21}>
                <Card
                    hoverable
                    cover={<img alt={Naslov} src={Slika}/>}
                    className="main-card"
                >
                    {show &&
                        <><label className="label-menu-name">{meniNaziv}</label>
                            <hr/>
                        </>
                    }
                    <Card.Meta className="card-title" title={Naslov} description={Datum}/>
                </Card>
            </Col>
        </Row>
        );
}

export default MainNewsSection;
