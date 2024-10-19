import {List} from 'antd';
import './SideNewsSection.css'
import {Link} from "react-router-dom";
const SideNewsSection = ({news}) => {
    return (
        <List
            itemLayout="horizontal"
            dataSource={news}
            renderItem={item => {
                const foramattedRoditelj = item.roditeljNaziv?.trim().toLowerCase().replace(/ /g, '-');
                const foramattedMeni = item.meniNaziv?.trim().toLowerCase().replace(/ /g, '-');
                const foramattedNaslov = item.Naslov?.trim().toLowerCase().replace(/ /g, '-');
                return (
                <List.Item>
                    <Link to={`/${foramattedRoditelj}/${foramattedMeni}/${foramattedNaslov}/${item.vijestID}`}>
                    <List.Item.Meta
                        avatar={<img className="image-side" src={item.Slika} alt={item.Naslov}/>}
                        title={item.Naslov}
                        description={item.Datum}
                    />
                    </Link>
                </List.Item>
            )}}
        />
    );
}

export default SideNewsSection;
