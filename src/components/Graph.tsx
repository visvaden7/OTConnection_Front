import React, {useEffect, useState} from "react";
import {Card, Carousel, Col, Layout, Row} from "antd";
import {Bar, Doughnut} from "react-chartjs-2";
import "./Graph.css";
import {ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip,} from "chart.js";
import axios from "axios";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const {Content} = Layout;

// 드라마 이미지 및 제목 데이터 타입 정의
interface DramaImage {
    ott_profile_link: string;
    title: string;
}

const dramaImages: DramaImage[] = [
    {
        ott_profile_link:
            "https://image.tmdb.org/t/p/original/eNfNu9sJ2eVmMcbrKpgEovPoyB8.jpg",
        title: "스위트홈",
    },
    {
        ott_profile_link:
            "https://image.tmdb.org/t/p/original/ufovksqVTNogMdU5LlCVbJSiMVa.jpg",
        title: "DP",
    },
    {
        ott_profile_link:
            "https://image.tmdb.org/t/p/original/g4hSAfG5HQgt65Tvwz1N5Ml6W0d.jpg",
        title: "닭강정",
    },
    {
        ott_profile_link:
            "https://image.tmdb.org/t/p/original/jDWQpJEIgDLBPNNe26XX4eWBiHm.jpg",
        title: "비질란테",
    },
    {
        ott_profile_link:
            "https://image.tmdb.org/t/p/original/b9MhD5syJ7TbYSeje4wB4oyTzc7.jpg",
        title: "무빙",
    },
    {
        ott_profile_link:
            "https://image.tmdb.org/t/p/original/oZ7HBsoYNL4IGeHRD7JRnZDCegk.jpg",
        title: "내 남편과 결혼해줘",
    },
];

const Graph: React.FC = () => {
    //   const [data, setData] = useState();
    const [barChartData, setBarChartData] = useState({
        labels: ["D.P", "무빙", "스위트홈", "닭강정", "비질란테"],
        datasets: [
            {
                label: "IMDB 평점",
                data: [
                    45.45454545454545, 33.33333333333333, 12.121212121212121,
                    9.090909090909092,
                ],
                barThickness: 50,
                backgroundColor: [
                    "#44A0E3",
                    "#3A8DD0",
                    "#2D72B5",
                    "#164689",
                    "#001A5C",
                ],
            },
        ],
        // 여기 plugins 배열에 imageOverlayPlugin 추가
        plugins: [],
    });
    // TODO:플러그인에 넣을 항목 -> drawingOnChart에 해당 내용 들어가있음 imageOverlayPlugin
    
    //  ==============================================================================================================================
    // chart-barChart
    useEffect(() => {
        const url = "http://localhost:8001/api/chart/top5";
        axios.get(url).then((rep) => {
            const jsonParsed = JSON.parse(JSON.stringify(rep.data));
            
            // 2. barChartData에 imageOverlayPlugin 추가
            setBarChartData({
                labels: jsonParsed["title"],
                datasets: [
                    {
                        label: "IMDB 평점",
                        data: jsonParsed["imdb_rate"],
                        barThickness: 50,
                        backgroundColor: [
                            "#44A0E3",
                            "#3A8DD0",
                            "#2D72B5",
                            "#164689",
                            "#001A5C",
                        ],
                    },
                ],
                // 여기 plugins 배열에 imageOverlayPlugin 추가
                plugins: [],
            });
        });
        // console.error(data);
        // TODO:플러그인에 넣을 항목 -> drawingOnChart에 해당 내용 들어가있음 imageOverlayPlugin
    }, []);
    
    //  ==============================================================================================================================
    
    //chart - platfrom
    const [stackedBarChartData, setStackedBarChartData] = useState({
        labels: ["카카오", "네이버"],
        datasets: [
            {
                label: "KAKAO",
                data: [24],
                barThickness: 20,
                backgroundColor: "#FEE500", // 노란색
            },
            {
                label: "NAVER",
                data: [76],
                barThickness: 20,
                backgroundColor: "#00C73C", // 초록색
            },
        ],
    });
    
    useEffect(() => {
        const url = "http://localhost:8001/api/chart/webtoon-platform";
        axios.get(url).then((rep) => {
            const webtoonPlatfrom = JSON.parse(JSON.stringify(rep.data));
            console.log(webtoonPlatfrom);
            setStackedBarChartData({
                labels: ["카카오", "네이버"],
                datasets: [
                    {
                        label: "KAKAO",
                        data: [webtoonPlatfrom.kakaoCount],
                        barThickness: 20,
                        backgroundColor: "#FEE500", // 노란색
                    },
                    {
                        label: "NAVER",
                        data: [webtoonPlatfrom.naverCount],
                        barThickness: 20,
                        backgroundColor: "#00C73C", // 초록색
                    },
                ],
            });
        });
        
        // 스택드 바 차트 데이터 설정
    }, []);
    
    const stackedBarChartOptions = {
        indexAxis: "y" as const,
        maintainAspectRatio: false,
        scales: {
            x: {
                stacked: true,
                display: false, // x축 자체를 표시하지 않음
                grid: {
                    display: false,
                },
                ticks: {
                    display: false, // x축의 수치 표시 제거
                },
            },
            y: {
                stacked: true,
                display: false, // x축 자체를 표시하지 않음
                beginAtZero: true,
                max: 10,
                grid: {
                    display: false,
                },
                ticks: {
                    display: false, // x축의 수치 표시 제거
                },
            },
        },
        plugins: {
            legend: {
                display: false, // 여기 수정
            },
            title: {
                display: true,
                text: "플랫폼별 작품 수",
            },
            tooltip: {
                callbacks: {
                    label: (context: any) => {
                        const label = context.dataset.label || "";
                        const value = context.raw;
                        return `${label}: ${value}%`;
                    },
                },
            },
        },
    };
    
    //  ==============================================================================================================================
    
    const [doughnutChartData, setDoughnutChartData] = useState({
        labels: ["Netflix", "Disney+", "Tving", "Wavve"],
        datasets: [
            {
                data: [40, 30, 20, 10],
                backgroundColor: ["#113CCF", "#E50914", "#6FA0E6", "#FF7C74"],
            },
        ],
    });
    
    const [isDataLoaded, setIsDataLoaded] = useState(false); // 데이터 로딩 상태
    
    useEffect(() => {
        const url = "http://localhost:8001/api/chart/ott-platform";
        axios
            .get(url)
            .then((rep) => {
                const ottPlatform = rep.data;
                
                // 데이터 구조에서 labels와 data 추출
                const labels = ["Netflix", "Wavve", "Tving", "Disney+"];
                const data = [
                    ottPlatform.NetflixCount,
                    ottPlatform.WavveCount,
                    ottPlatform.TvingCount,
                    ottPlatform.DisneyCount,
                ];
                
                setDoughnutChartData({
                    labels: labels,
                    datasets: [
                        {
                            data: data,
                            backgroundColor: [" #E50914", "#6FA0E6 ", "#FF7C74", "#113CCF"],
                        },
                    ],
                });
                setIsDataLoaded(true); // 데이터가 로드되었음을 표시
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);
    
    //  ==============================================================================================================================
    
    //doughnut Chart
    
    const [movieData, setMovieData] = useState(dramaImages);
    
    useEffect(() => {
        const url = "http://localhost:8001/api/chart/carouselData";
        axios.get(url).then((rep) => {
            console.log(typeof JSON.parse(JSON.stringify(rep.data)));
            setMovieData(rep.data.data);
        });
    }, []);
    
    const interestedWebtoonData = [
        {
            ip_id: 1,
            title: "내남편과결혼해줘",
            webtoon_profile_link:
                "https://image-comic.pstatic.net/webtoon/783769/thumbnail/thumbnail_IMAG21_fc14e4e2-e62f-4d77-8f46-9fb05cffa77a.jpeg",
            interest: 961951,
        },
        {
            ip_id: 9,
            title: "스위트홈",
            webtoon_profile_link:
                "https://image-comic.pstatic.net/webtoon/701081/thumbnail/thumbnail_IMAG21_3761692268951647077.jpg",
            interest: 951707,
        },
        {
            ip_id: 17,
            title: "오늘도 사랑스럽개",
            webtoon_profile_link:
                "https://image-comic.pstatic.net/webtoon/699658/thumbnail/thumbnail_IMAG21_3690811191047041079.jpg",
            interest: 809257,
        },
        {
            ip_id: 2,
            title: "이두나",
            webtoon_profile_link:
                "https://image-comic.pstatic.net/webtoon/731130/thumbnail/thumbnail_IMAG21_7220732760258196019.jpg",
            interest: 647161,
        },
        {
            ip_id: 8,
            title: "마스크걸",
            webtoon_profile_link:
                "https://image-comic.pstatic.net/webtoon/660366/thumbnail/thumbnail_IMAG21_3774688497130353974.jpg",
            interest: 523313,
        },
    ];
    const [interestedWebtoon, setInterestedWebtoon] = useState(
        interestedWebtoonData
    );
    
    useEffect(() => {
        const url = "http://localhost:8001/api/chart/interestWebtoon5";
        axios.get(url).then((rep) => setInterestedWebtoon(rep.data.data));
    });
    return (
        <Content
            className="content"
            style={{
                padding: "0 20px", // 상단 패딩을 120px로 설정하여 차트를 아래로 배치
                maxWidth: "100%", // 요소가 화면을 넘지 않도록 설정
                boxSizing: "border-box", // 패딩과 경계선을 포함한 박스 모델로 설정
                margin: "0 auto", // 페이지 중앙 정렬
                flex: "1", // Content가 flexbox로 확장되도록 설정
                overflowX: "hidden", // 수평 스크롤 방지
            }}
        >
            {/* 1. 최고 평점 OTT 드라마 및 플랫폼별 사용자 수 */}
            <Row gutter={[16, 16]} style={{marginBottom: "80px"}}>
                {" "}
                {/* 하단 마진을 추가하여 다음 섹션과의 간격 조정 */}
                <Col xs={24} md={14} style={{height: "300px"}}>
                    <Card
                        // title="최고 평점 OTT 드라마"
                        bordered={false}
                        style={{height: "400px"}}
                    >
                        <div style={{height: "380px", width: "650px"}}>
                            {" "}
                            {/* 차트 크기 조정 */}
                            <Bar
                                data={barChartData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: {
                                        legend: {
                                            display: false, // 범례 제거
                                            position: "bottom",
                                        },
                                        title: {
                                            display: true,
                                            text: "최고 평점 OTT 드라마",
                                        },
                                    },
                                    scales: {
                                        x: {
                                            stacked: true,
                                            display: false, // x축 자체를 표시하지 않음
                                            
                                            grid: {
                                                display: false, // x축 눈금선 숨기기
                                            },
                                            ticks: {
                                                display: false, // x축의 수치 표시 제거
                                            },
                                        },
                                        y: {
                                            stacked: true,
                                            display: false, // x축 자체를 표시하지 않음
                                            
                                            beginAtZero: true, // y축 0부터 시작
                                            max: 10, // y축 최대값 설정
                                            grid: {
                                                display: false, // y축 눈금선 숨기기
                                            },
                                            ticks: {
                                                display: false, // x축의 수치 표시 제거
                                            },
                                        },
                                    },
                                    animations: {
                                        y: {
                                            easing: "easeOutBounce", // 바운스 효과
                                            duration: 1500, // 1.5초 지속 시간
                                        },
                                    },
                                }}
                            />
                        </div>
                    </Card>
                </Col>
                <Col xs={24} md={8}>
                    <Row>
                        <Col xs={24} md={8}>
                            <Card
                                // title="플랫폼별 작품 수"
                                bordered={false}
                                style={{height: "120px"}}
                            >
                                <div style={{height: "100px", width: "400px"}}>
                                    {" "}
                                    {/* 차트 크기 조정 */}
                                    <Bar
                                        data={stackedBarChartData}
                                        options={{
                                            ...stackedBarChartOptions,
                                            animations: {
                                                x: {
                                                    easing: "easeInOutQuad", // 부드럽게 시작하고 끝나는 애니메이션
                                                    duration: 2000, // 2초 지속 시간
                                                },
                                            },
                                        }}
                                    />
                                </div>
                            </Card>
                        </Col>
                        <Col span={24}>
                            <Card
                                // title="플랫폼별 사용자 수"
                                bordered={false}
                                style={{height: "100%"}}
                            >
                                <div style={{height: "240px"}}>
                                    {" "}
                                    {/* 차트 크기 조정 */}
                                    <Doughnut
                                        data={doughnutChartData}
                                        options={{
                                            responsive: true,
                                            maintainAspectRatio: false,
                                            plugins: {
                                                legend: {
                                                    position: "bottom",
                                                },
                                                title: {
                                                    display: true,
                                                    text: "플랫폼별 사용자 수",
                                                },
                                            },
                                            animations: {
                                                rotate: {
                                                    easing: "easeInOutSine", // 부드럽게 회전하는 애니메이션
                                                    duration: 1500, // 1.5초 지속 시간
                                                },
                                                scale: {
                                                    from: 0, // 처음엔 0에서 시작
                                                    to: 1, // 1로 스케일링
                                                    easing: "easeOutElastic", // 탄성 효과
                                                    duration: 2000, // 2초 지속 시간
                                                },
                                            },
                                        }}
                                    />
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
            
            <div style={{height: "10px"}}></div>
            
            {/* 최신 OTT 드라마, 커뮤니티 하이라이트, 인기 웹툰, 푸터를 감싸는 컨테이너 */}
            <div>
                <Row style={{marginBottom: "60px", marginTop: "-130px"}}>
                    <Col span={24}>
                        <Card
                            title="최신 OTT 드라마"
                            bordered={false}
                            style={{padding: "10px"}}
                        >
                            <Carousel
                                autoplay
                                autoplaySpeed={2000} // 슬라이드가 2초 후에 전환되도록 설정
                                arrows
                                slidesToShow={4}
                                slidesToScroll={2}
                                responsive={[
                                    {
                                        breakpoint: 1024,
                                        settings: {
                                            slidesToShow: 4,
                                            slidesToScroll: 1,
                                        },
                                    },
                                    {
                                        breakpoint: 768,
                                        settings: {
                                            slidesToShow: 2,
                                            slidesToScroll: 1,
                                        },
                                    },
                                    {
                                        breakpoint: 480,
                                        settings: {
                                            slidesToShow: 1,
                                            slidesToScroll: 1,
                                        },
                                    },
                                ]}
                            >
                                {Object.values(movieData).map((drama, index) => (
                                    <div key={index}>
                                        <Card
                                            cover={
                                                <img
                                                    src={drama.ott_profile_link}
                                                    alt={drama.title}
                                                    style={{
                                                        width: "100%",
                                                        height: "350px",
                                                        objectFit: "contain",
                                                    }}
                                                />
                                            }
                                            bordered={false}
                                        >
                                            <Card.Meta title={drama.title}/>
                                        </Card>
                                    </div>
                                ))}
                            </Carousel>
                        </Card>
                    </Col>
                </Row>
                
                <Row gutter={[16, 16]} style={{marginBottom: "0", paddingBottom:"0"}}>
                    <Col xs={24} md={14}>
                        <Card
                            title="커뮤니티 하이라이트"
                            bordered={false}
                            style={{height: "100%", width: "100%"}}
                        >
                            <Card title="원작과의 비교" bordered={false}>
                                <img src={"public/content-test1.png"} alt={"test"} style={{width:"100%"}}/>
                            </Card>
                            <Card title="가상 캐스팅" bordered={false}>
                                <img src={"public/content-test2.png"} alt={"test"} style={{width: "100%"}}/>
                            </Card>
                        </Card>
                    </Col>
                    
                    {/* //  ============================================================================================================================== */}
                    
                    {/* TODO */}
                    <Col xs={24} md={10}>
                        <Card
                            title="인기 웹툰"
                            bordered={false}
                            style={{height: "100%", margin: 0}}
                        >
                            {Object.values(interestedWebtoon).map((num, index) => (
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        width: "100%",
                                        height: "130px",
                                    }}
                                >
                                    <h2
                                        style={{
                                            width: "100px",
                                            margin: "5px",
                                            alignContent: "center",
                                        }}
                                    >
                                        {index + 1}
                                    </h2>
                                    <img
                                        src={num.webtoon_profile_link}
                                        alt={num.title}
                                        style={{width: "90px", padding: "5px 0"}}
                                    />
                                    <div style={{alignContent: "center", margin: "0 0 0 20px"}}>
                                        <p key={num.ip_id}>{num.title}</p>
                                    </div>
                                </div>
                            ))}
                        </Card>
                    </Col>
                </Row>
            </div>
        </Content>
    );
};

export default Graph;
