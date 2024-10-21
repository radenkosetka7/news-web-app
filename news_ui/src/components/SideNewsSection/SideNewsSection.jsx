import {List} from 'antd';
import './SideNewsSection.css'
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {formatString} from "../../util/helpers";

const SideNewsSection = ({news}) => {
    const menuItem = useSelector((state) => state.menu.items);

    return (
        <List
            itemLayout="horizontal"
            dataSource={news}
            renderItem={item => {
                const foramattedRoditelj = formatString(menuItem.find(e => e.meniID === item?.meniRoditelj)?.Naziv);
                const foramattedMeni = formatString(item.meniNaziv);
                const foramattedNaslov = formatString(item.Naslov);
                return (
                    <List.Item>
                        <Link className="link-side"
                              to={`/${foramattedRoditelj}/${foramattedMeni}/${foramattedNaslov}/${item.vijestID}`}>
                            <List.Item.Meta
                                avatar={<img className="image-side"
                                             src={item.totalComments ? item.Slika[0].slikaURL : item.Slika}
                                             alt={item.Naslov}/>}
                                title={item.Naslov}
                                description={item.Datum}
                            />
                        </Link>
                    </List.Item>
                )
            }}
        />
    );
}

export default SideNewsSection;
