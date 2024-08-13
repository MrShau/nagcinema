import { useEffect, useState } from "react"
import VideoApi, { VideoType } from "../api/VideoApi";
import VideoCard from "../components/VideoCard";
import { Col, Container, Row } from "react-bootstrap";


export default function Home() {

    const [videoItems, setVideoItems] = useState<VideoType[]>([]);

    useEffect(() => {
        VideoApi.getPage(1, 12).then(res => setVideoItems(res));
    }, []);

    return (
        <>
            <Container fluid="lg" className="mt-5">
                <Row xs="1" md="2" xl="3" className="w-100 p-0 m-0">
                {videoItems.map((item, index) => <Col key={index} className="p-2"><VideoCard {...item} /></Col>)}
                </Row>
            </Container>
        </>
    )
}