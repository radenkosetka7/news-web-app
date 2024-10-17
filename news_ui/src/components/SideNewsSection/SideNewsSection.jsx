import {List} from 'antd';
import './SideNewsSection.css'
const SideNewsSection = ({news}) => {
    return (
        <List
            itemLayout="horizontal"
            dataSource={news}
            renderItem={item => (
                <List.Item>
                    <List.Item.Meta
                        avatar={<img className="image-side" src={item.Slika} alt={item.Naslov}/>}
                        title={item.Naslov}
                        description={item.Datum}
                    />
                </List.Item>
            )}
        />
    );
}

export default SideNewsSection;
