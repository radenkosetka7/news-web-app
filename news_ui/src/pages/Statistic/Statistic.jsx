import {Col, Row} from "antd";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {getLastWeekStatistics, getTop10News} from "../../redux-store/statisticSlice";
import {getTop10NewsWithDetails} from "../../redux-store/newsSlice";
import PieChart from "../../components/PieChart/PieChart";
import SideNewsSection from "../../components/SideNewsSection/SideNewsSection";
import './Statistic.css'

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
                <Col span={20}>
                    <label className="label-row">Statistika</label>
                </Col>
            </Row>
            <Row justify={"center"}>
                <Col span={20}>
                    <Row justify={"space-between"}>
                        <Col span={10}>
                            <PieChart data={stasticData}/>
                        </Col>
                        <Col span={10} className="span-col">
                            <h4>Najpopularnije vijesti</h4>
                            <SideNewsSection news={top10NewsDetails}/>

                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
}

export default Statistic;