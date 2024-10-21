import {Col, Row} from "antd";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {getLastWeekStatistics, getTop10News} from "../../redux-store/statisticSlice";
import {getTop10NewsWithDetails} from "../../redux-store/newsSlice";
import PieChart from "../../components/PieChart/PieChart";
import SideNewsSection from "../../components/SideNewsSection/SideNewsSection";

const Statistic = () => {

    const stasticData = useSelector((state) => state.statistic.statisticData);
    const top10News = useSelector((state) => state.statistic.top10News);
    const dispatch = useDispatch();
    const top10NewsDetails = useSelector((state) => state.news.top10DetailsNews);

    useEffect(() => {
        dispatch(getLastWeekStatistics());
        dispatch(getTop10News());
    }, []);

    useEffect(() => {
        dispatch(getTop10NewsWithDetails(top10News));

    }, [top10News]);

    return (
        <>
            <Row justify="center" style={{backgroundColor: "#016e9c"}}>
                <Col span={11}>
                    <label style={{fontSize: 'large', color: "white"}}>Statistika</label>
                </Col>
            </Row>
            <Row justify={"center"}>
                <Col span={8}>
                    <PieChart data={stasticData}/>
                </Col>
                <Col span={3} style={{paddingTop: '20px'}}>
                    <h4>Najpopularnije vijesti</h4>
                    <Col span={6}>
                        <SideNewsSection news={top10NewsDetails}/>
                    </Col>
                </Col>
            </Row>
        </>
    );
}

export default Statistic;