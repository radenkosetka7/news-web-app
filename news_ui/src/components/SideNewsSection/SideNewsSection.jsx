import {List} from 'antd';
import './SideNewsSection.css'
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
const SideNewsSection = ({news}) => {
    const menuItem = useSelector((state) => state.menu.items);

    return (
        <List
            itemLayout="horizontal"
            dataSource={news}
            renderItem={item => {
                const foramattedRoditelj = menuItem.find(e => e.meniID === item?.meniRoditelj)?.Naziv?.trim().toLowerCase().replace(/ /g, '-');
                const foramattedMeni = item.meniNaziv?.trim().toLowerCase().replace(/ /g, '-');
                const foramattedNaslov = item.Naslov?.trim().toLowerCase().replace(/ /g, '-');
                return (
                <List.Item>
                    <Link style={{width:'100%'}} to={`/${foramattedRoditelj}/${foramattedMeni}/${foramattedNaslov}/${item.vijestID}`}>
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
