// // 이미지를 로드하는 함수
// const loadImage = (src: string): Promise<HTMLImageElement> => {
//     return new Promise((resolve, reject) => {
//       const img = new Image();
//       img.src = src;
//       img.onload = () => resolve(img);
//       img.onerror = reject; // 이미지 로드 실패 시 에러 처리
//     });
//   };

//   // 이미지 파일 경로 설정
//   const imagePaths = [
//     "/assets/스위트홈.jpg",
//     "./images/함부로 대해줘.jpg",
//     "./images/선재 업고 튀어.jpg",
//     "./images/닭강정.jpg",
//     "./images/피라미드 게임.jpg",
//   ];

//   // 모든 이미지를 로드하고 배열에 저장
//   const loadImages = async (): Promise<HTMLImageElement[]> => {
//     const images = await Promise.all(imagePaths.map((path) => loadImage(path)));
//     return images;
//   };

//   // 둥근 모서리 사각형 그리기 함수
//   const drawRoundedRect = (
//     ctx: CanvasRenderingContext2D,
//     x: number,
//     y: number,
//     width: number,
//     height: number,
//     radius: number
//   ) => {
//     ctx.beginPath();
//     ctx.moveTo(x + radius, y);
//     ctx.arcTo(x + width, y, x + width, y + height, radius);
//     ctx.arcTo(x + width, y + height, x, y + height, radius);
//     ctx.arcTo(x, y + height, x, y, radius);
//     ctx.arcTo(x, y, x + width, y, radius);
//     ctx.closePath();
//     ctx.clip();
//   };

//   // 1. imageOverlayPlugin 정의
//   const imageOverlayPlugin = {
//     id: "imageOverlay",
//     afterDatasetsDraw: async (chart: any) => {
//       const ctx = chart.ctx;

//       // D.P 이미지 로드
//       const dpImageSrc =
//         "https://image.tmdb.org/t/p/original/ufovksqVTNogMdU5LlCVbJSiMVa.jpg";
//       const dpImage = await loadImage(dpImageSrc);

//       // 이미지 크기 설정 (16:9 비율 유지)
//       const imageHeight = 60; // 원하는 세로 크기 설정
//       const imageWidth = (imageHeight * 16) / 9; // 16:9 비율로 가로 크기 계산
//       const cornerRadius = 5; // 둥근 모서리 반경 설정

//       // D.P 막대에 해당하는 위치 찾기
//       chart.getDatasetMeta(0).data.forEach((bar: any, index: number) => {
//         if (chart.data.labels[index] === "D.P") {
//           // x, y 좌표를 막대 상단에 맞추기
//           const x = bar.x - imageWidth / 2; // 막대의 중앙에 이미지 배치
//           const y = bar.y - imageHeight; // 막대 상단을 기준으로 이미지 배치

//           // 둥근 모서리 사각형 그리기
//           ctx.save(); // 현재 상태 저장
//           drawRoundedRect(ctx, x, y, imageWidth, imageHeight, cornerRadius);

//           // 둥근 모서리 안에 이미지 그리기
//           ctx.drawImage(dpImage, x, y, imageWidth, imageHeight);
//           ctx.restore(); // 이전 상태 복원
//         }
//       });

//       // 데이터 수치 표시 (막대 중앙)
//       chart.data.datasets.forEach((dataset: any, datasetIndex: number) => {
//         const meta = chart.getDatasetMeta(datasetIndex);
//         if (datasetIndex === 0) {
//           // 분홍색 막대 (데이터셋 1)에만 적용
//           meta.data.forEach((bar: any, index: number) => {
//             const value = dataset.data[index];
//             const centerY = (bar.y + bar.base) / 2; // 막대 중앙 계산
//             ctx.fillStyle = "black"; // 텍스트 색상
//             ctx.font = "12px Arial"; // 폰트 설정
//             ctx.fillText(value, bar.x, centerY); // 텍스트 위치 설정 (막대 중앙)
//           });
//         }
//       });
//     },
//   };
