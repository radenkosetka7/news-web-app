import {Card} from 'antd';
import { Col, Row } from 'antd';
import './MainNewsSection.css';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

const MainNewsSection = ({Naslov,show, Datum, Slika,meniNaziv,vijestID,meniRoditelj}) => {

    const foramattedNaslov = Naslov?.trim().toLowerCase().replace(/ /g, '-');
    const foramattedMeniNaziv = meniNaziv?.trim().toLowerCase().replace(/ /g, '-');
    const formmattedMenuNaziv = useSelector((state) => state.menu.items).find(item => item.meniID === meniRoditelj)?.Naziv?.trim().toLowerCase().replace(/ /g, '-');
    return (
        <Row className="main-news" justify="center">
            <Col span={24}>
                <Link to={`/${foramattedMeniNaziv}/${formmattedMenuNaziv}/${foramattedNaslov}/${vijestID}`}>
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
                </Link>
            </Col>
        </Row>
        );
}

export default MainNewsSection;
