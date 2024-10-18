import {useLocation} from "react-router-dom";
import {useEffect} from "react";
import {getAllSectionNews, getAllSubsectionNews} from "../../redux-store/newsSlice";
import {useDispatch, useSelector} from "react-redux";

const SubsectionNews = () => {

    const location = useLocation();
    const dispatch = useDispatch();
    const {childId, meniId} = location.state || {};
    const subsectionNews = useSelector((state) => state.news.subsectionNews);
    const subsectionStatus = useSelector((state) => state.news.subsectionStatus);
    const menuItem = useSelector((state) => state.menu.items).find(item => item.meniID === meniId);
    const category = menuItem?.Kategorije.find(item => item.meniID === childId);

    //OVDJE CE TREBATI PAGINACIJA
    useEffect(() => {
        if (subsectionStatus === 'idle' && category != null) {
            dispatch(getAllSubsectionNews({id:childId, page: 1, size: 15}));
        }
    }, [category]);
  return (
    <div>
      <h1>Subsection News</h1>
    </div>
  );
}

export default SubsectionNews;