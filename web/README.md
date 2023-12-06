# Deeplant1

<div align="center">
<img width="300" alt="image" src="https://raw.githubusercontent.com/SincerityHun/Deep_Plant1_Final/main/web/images/l_deeplant.png">

</div>

# Deeplant1 Web Page

> **성균관대학교 산학협력프로젝트 딥플랜트1 Web** <br/> **개발기간: 2023.03 ~ 2023.12**

## 배포 주소

> **프론트 서버** : [http://43.202.4.18:8080/](http://43.202.4.18:8080/) <br>

## 웹개발팀 

| 김성중 (Kim Seongjung) | 박수현 (Park Suhyun) |
| :---------------------: | :------------------: |
| <img width="160px" src="https://avatars.githubusercontent.com/u/102349883?s=400&v=4" alt="Kim Seongjung" /> | <img width="160px" src="https://avatars.githubusercontent.com/u/73726272?v=4" alt="Park Suhyun" /> |
| [GitHub: @qpwozxc](https://github.com/qpwozxc) | [GitHub: @claspsh](https://github.com/clapsh) |
| 성균관대학교 소프트웨어학과 2학년 | 성균관대학교 소프트웨어학과 3학년 |


## 프로젝트 소개

딥플랜트1 웹은 육류데이터어쩌고저쩌고, 유저관리어쩌고, 통계분석,.....

## 시작 가이드
### Requirements
For building and running the application you need:

- [Node.js 20.9.0](https://nodejs.org/ca/blog/release/v20.9.0/)
- [Npm 10.1.0](https://www.npmjs.com/package/npm/v/10.1.0)

### Installation
``` bash
$ git clone https://github.com/SincerityHun/Deep_Plant1_Final.git
$ cd Deep_Plant1_Final
```

#### Start Web
```
$ cd web
$ npm run start
```


<!-- ---
### EC2 인스턴스 접속 후 배포
```
$ cd web
$ ssh -i DeeplantWebkey.pem ubuntu@43.202.4.18
$ cd DP_Admin/frontend
$ npm run build
``` -->

## Stacks

### Environment
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white)
![Github](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white)             

### Config
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![node]("https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white")        

### Development
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=Bootstrap&logoColor=white)
![Material UI](https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=MUI&logoColor=white)

### Communication
![Slack](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=Slack&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white)

---
## 화면 구성
| 로그인 페이지  |  홈페이지   |
| :-------------------------------------------: | :------------: |
|  <img width="400" src="https://github.com/SincerityHun/Deep_Plant1_Final/blob/main/web/images/s_login.png?raw=true"/> |  <img width="400" src="https://github.com/SincerityHun/Deep_Plant1_Final/blob/main/web/images/s_home.png?raw=true"/>| 
| 대시보드 페이지   |  데이터 예측 페이지   |  
| <img width="400" src="https://github.com/SincerityHun/Deep_Plant1_Final/blob/main/web/images/s_dashboard.png?raw=true"/>   |  <img width="400" src="https://github.com/SincerityHun/Deep_Plant1_Final/blob/main/web/images/s_data_predict.png?raw=true"/>     |
| 통계 페이지    |   유저 관리 페이지   |
| <img width="400" src="https://github.com/SincerityHun/Deep_Plant1_Final/blob/main/web/images/s_statistics.png?raw=true"/>   |  <img width="400" src="https://github.com/SincerityHun/Deep_Plant1_Final/blob/main/web/images/s_user_management.png?raw=true"/>     |

---
## 주요 기능

### 대시보드
- .

### 통계 분석
- 맛/관능, 원육/처리육/가열육 별 통계, 빈도수, 상관관계, 시계열 등을 날짜 별로 조회

### 데이터 예측
- .

### 사용자 관리
- 사용자 검색, 신규 회원 등록, 권한 변경, 사용자 삭제 기능

### 프로필
- 프로필 정보 수정 및 회원 탈퇴 기능
---
## 아키텍쳐

<!-- ### 디렉토리 구조
```bash
├── API : API 관련 정보 폴더
│   ├── firebase : Firebase 연동과 관련된 스크립트 폴더
│   │   ├── updateMeatImgToFirebase.js
│   │   └── uploadNewImgToFirebase.js
│   ├── getDetailMeatData.js
│   ├── getDetailMeatDataSWR.js
│   ├── getMeatList.js
│   ├── getMeatListSWR.js
│   ├── getPredictedMeatList.js
│   ├── getRejectedMeatList.js
│   ├── predictPOST.js
│   ├── update : 데이터 업데이트 관련 스크립트 폴더
│   │   ├── updateHeatedData.js
│   │   ├── updateProbexptData.js
│   │   ├── updateProcessedData.js
│   │   └── updateRawData.js
│   ├── updateDataStatus.js
│   └── useGetDetail.js
├── App.jsx
├── App.module.css
├── Data : 데이터 파일 저장 폴더
│   ├── pagination.json
│   ├── processedMeat.json
│   └── rawMeatConfirm.json
├── Utils : 유틸리티 함수 관련 폴더
│   ├── isLogin.js
│   └── selectBtn.js
├── components
│   ├── Base : 기본 컴포넌트 모음 폴더
│   │   ├── ConfirmationModal.js
│   │   ├── CustomSnackbar.js
│   │   └── Sidebar.js
│   ├── Charts // 차트 관련 컴포넌트 폴더
│   │   ├── DataStat.js
│   │   ├── PieChart : 원 그래프 차트 관련 폴더
│   │   │   ├── formatNumber.js
│   │   │   ├── pieChart.js
│   │   │   └── usePieChart.js
│   │   ├── StackedBarChart.js
│   │   └── choroplethMap : 지도 시각화 관련 폴더
│   │       ├── ChoroplethMap.js
│   │       ├── Map.js
│   │       └── geojson_korea.json
│   ├── DataDetailPage : 데이터 상세 페이지 관련 컴포넌트 폴더
│   │   ├── DataPAView.js
│   │   ├── DataView.js
│   │   ├── DetailDataController.js
│   │   ├── InputWarningComp.js
│   │   ├── acceptModal.js
│   │   ├── cardComps
│   │   │   ├── MeatImgsCard.js
│   │   │   └── QRInfoCard.js
│   │   ├── computePeriod.js
│   │   ├── dataProcessing.js
│   │   ├── excelImportAlertModal.js
│   │   ├── imgRot.css
│   │   ├── navBar.js
│   │   ├── navToList.js
│   │   ├── rejectModal.js
│   │   ├── restrictedModal.js
│   │   ├── stateChangedModal.js
│   │   └── tablesComps
│   │       ├── apiTable.js
│   │       ├── heatTable.js
│   │       ├── labTable.js
│   │       ├── predictedProcessedTablePA.js
│   │       ├── predictedRawTable.js
│   │       ├── processedTable.js
│   │       ├── processedTablePA.js
│   │       └── rawTable.js
│   ├── DataListView : 데이터 리스트 뷰 관련 컴포넌트 폴더
│   │   ├── DataList.js
│   │   ├── DataListComp.js
│   │   ├── DataListComp.module.css
│   │   ├── PADataListComp.js
│   │   ├── Pagination.js
│   │   ├── RejectedDataListComp.js
│   │   ├── WarningComp.js
│   │   ├── excelContr.js
│   │   ├── excelExport.js
│   │   └── statsExport.js
│   ├── Dot.js
│   ├── Log : 로그인 관련 컴포넌트 폴더
│   │   ├── LogInField.js
│   │   └── LogInField.module.css
│   ├── Routes.js
│   ├── Search : 검색 필터 관련 컴포넌트 폴더
│   │   └── SearchFilterBar.js
│   ├── Stats : 통계 관련 컴포넌트 폴더
│   │   ├── Charts
│   │   │   ├── BoxPlot
│   │   │   │   ├── Sens_FreshMeat.js
│   │   │   │   ├── Sens_HeatedMeat.js
│   │   │   │   ├── Sens_ProcMeat.js
│   │   │   │   ├── Taste_FreshMeat.js
│   │   │   │   └── Taste_ProcMeat.js
│   │   │   ├── Corr
│   │   │   │   ├── Sense_Fresh_Corr.js
│   │   │   │   ├── Sense_Heated_Corr.js
│   │   │   │   ├── Sense_Proc_Corr.js
│   │   │   │   ├── Taste_Fresh_Corr.js
│   │   │   │   └── Taste_Proc_Corr.js
│   │   │   ├── HeatMap
│   │   │   │   ├── Sens_Fresh_Map.js
│   │   │   │   ├── Sens_Heated_Map.js
│   │   │   │   ├── Sens_Proc_Map.js
│   │   │   │   ├── Taste_Fresh_Map.js
│   │   │   │   └── Taste_Proc_Map.js
│   │   │   ├── ScatterChart.js
│   │   │   ├── Time
│   │   │   │   └── Taste_Time.js
│   │   │   ├── barGraph.js
│   │   │   ├── formatNumber.js
│   │   │   ├── pieChart.js
│   │   │   └── useChart.js
│   │   ├── Options.js
│   │   ├── SearchFilter.js
│   │   └── StatsTabs.js
│   └── User : 사용자 관리 컴포넌트 폴더
│       ├── UserContext.js
│       ├── UserEdit.js
│       ├── UserList.js
│       └── UserRegister.js
├── config.js
├── firebase-config.js
├── index.js
├── routes : 라우팅 컴포넌트 폴더
│   ├── Dashboard.js
│   ├── DataConfirm.js
│   ├── DataEdit.js
│   ├── DataPredict.js
│   ├── Home.js
│   ├── LogIn.js
│   ├── PA.js
│   ├── Profile.js
│   ├── Stats.js
│   └── UserManagement.js
└── src_asset : 이미지 모음 폴더
    ├── BackGround.png
    ├── Data.png
    ├── Deeplant_big_logo.png
    ├── Deeplant_long.webp
    ├── LOGO.png
    ├── Layer_1.png
    ├── LogOut.svg
    ├── Profile.jpg
    ├── deeplant-logo.png
    ├── deeplant-text-logo.png
    ├── home1.png
    ├── home2.png
    ├── home3.png
    ├── home4.png
    ├── home5.png
    └── home6.png

``` -->

<!--
```bash
├── README.md : 리드미 파일
│
├── strapi-backend/ : 백엔드
│   ├── api/ : db model, api 관련 정보 폴더
│   │   └── [table 이름] : database table 별로 분리되는 api 폴더 (table 구조, 해당 table 관련 api 정보 저장)
│   │       ├── Config/routes.json : api 설정 파일 (api request에 따른 handler 지정)
│   │       ├── Controllers/ [table 이름].js : api controller 커스텀 파일
│   │       ├── Models : db model 관련 정보 폴더
│   │       │   ├── [table 이름].js : (사용 X) api 커스텀 파일
│   │       │   └── [table 이름].settings.json : model 정보 파일 (field 정보)
│   │       └─── Services/ course.js : (사용 X) api 커스텀 파일
│   │ 
│   ├── config/ : 서버, 데이터베이스 관련 정보 폴더
│   │   ├── Env/production : 배포 환경(NODE_ENV = production) 일 때 설정 정보 폴더
│   │   │   └── database.js : production 환경에서 database 설정 파일
│   │   ├── Functions : 프로젝트에서 실행되는 함수 관련 정보 폴더
│   │   │   │   ├── responses : (사용 X) 커스텀한 응답 저장 폴더
│   │   │   │   ├── bootstrap.js : 어플리케이션 시작 시 실행되는 코드 파일
│   │   │   │   └── cron.js : (사용 X) cron task 관련 파일
│   │   ├── database.js : 기본 개발 환경(NODE_ENV = development)에서 database 설정 파일
│   │   └── server.js : 서버 설정 정보 파일
│   │  
│   ├── extensions/
│   │   └── users-permissions/config/ : 권한 정보
│   │ 
│   └── public/
│       └── uploads/ : 강의 별 사진
│
└── voluntain-app/ : 프론트엔드
    ├── components/
    │   ├── NavigationBar.js : 네비게이션 바 컴포넌트, _app.js에서 공통으로 전체 페이지에 포함됨.
    │   ├── MainBanner.js : 메인 페이지에 있는 남색 배너 컴포넌트, 커뮤니티 이름과 슬로건을 포함.
    │   ├── RecentLecture.js : 사용자가 시청 정보(쿠키)에 따라, 현재/다음 강의를 나타내는 컴포넌트 [호출: MainCookieCard]
    │   ├── MainCookieCard.js : 상위 RecentLecture 컴포넌트에서 전달받은 props를 나타내는 레이아웃 컴포넌트.
    │   ├── MainCard.js : 현재 등록된 course 정보를 백엔드에서 받아서 카드로 나타내는 컴포넌트 [호출: CourseCard]
    │   └── CourseCard.js : 상위 MainCard 컴포넌트에서 전달받은 props를 나타내는 레이아웃 컴포넌트
    │
    ├── config/
    │   └── next.config.js
    │
    ├── lib/
    │   └── ga/
    │   │   └── index.js
    │   └── context.js
    │
    ├── pages/
    │   ├── courses/
    │   │   └── [id].js : 강의 페이지
    │   ├── _app.js : Next.js에서 전체 컴포넌트 구조를 결정, 공통 컴포넌트(navbar, footer)가 선언되도록 customizing 됨.
    │   ├── _document.js : Next.js에서 전체 html 문서의 구조를 결정, lang 속성과 meta tag가 customizing 됨.
    │   ├── about.js : 단체 소개 페이지
    │   ├── index.js : 메인 페이지
    │   ├── question.js : Q&A 페이지
    │   └── setting.js : 쿠키, 구글 애널리틱스 정보 수집 정책 페이지
    │
    ├── public/
    │   ├── favicon.ico : 네비게이션바 이미지
    │   └── logo_about.png : about 페이지 로고 이미지
    │
    └── styles/
        └── Home.module.css

```
-->