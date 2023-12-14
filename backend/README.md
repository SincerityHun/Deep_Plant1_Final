# DeepPlant Backend Server

<div align="center">
<img width="300" alt="image" src="https://raw.githubusercontent.com/SincerityHun/Deep_Plant1_Final/main/web/images/l_deeplant.png">

</div>

> 성균관대학교 산학협력프로젝트 딥플랜트1팀 
>
> 개발기간: 2023.05 ~ 2023.12
>
> Built with Python

## Project Tech Stack
### Environment
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white)
![Github](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white)       

### release
![Amazone S3](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white)
![Amazone EC2](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white)
![Amazone RDS](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white)
![Docker](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white)   

### Development
![Python](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=white)
![Flask](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Postgresql](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=Bootstrap&logoColor=white)
![Material UI](https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=MUI&logoColor=white)

### Communication
![Slack](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=Slack&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white)


## Production 배포 방법
1. git repositoy clone

2. [환경 변수 및 Secret 변수 설정]

3. git push origin main

## 환경 변수 및 Secret 변수

1. AWS_ACCESS_KEY_ID
   - AWS IAM Public Key
2. AWS_SECRET_ACCESS_KEY
   - AWS IAM Secret key
3. SSH_PRIVATE_KEY
   - AWS EC2 Access Pem File
4. DB_URI
   - AWS RDS Public URI
5. DOCKER_HUB_ACCESS_TOKEN
   - Docker 이미지 백업용 Access Tocken
6. DOCKER_HUB_USERNAME
   - Docker 이미지 백업용 유저 아이디
7. S3_BUCKET_NAME
   - S3 Buckt Name
8. S3_REGION_NAME
   - S3 스토리지 영역
9. FIREBASE_BUCKET_ADDRESS
   - Google Firebase Storage 주소
10. ML_SERVER_BASER_URL
   - ML 서버 퍼블릭 IP:port
11. SERVICE_ACCOUNT_KEY
   - FIREBASE Secret Key
12. EC2_HOST
   - 서버 구현 EC2 인스턴스 주소
13. EC2_USERNAME
   - EC2 계정 유저명

## Server 로컬 실행

1. cd backend/

2. docker ps -al

   - 상태 확인

3. sudo docker-compose build

4. docker images

   - 이미지 확인(Compose 파일 묶음)

5. sudo docker-compose up-d
   - docker compose container 구현

## API Architecture

## DB ERD

## 서버 개발자

| 정성훈 (Seonghun Jung) |
| :---------------------: |
| <img width="160px" src="https://avatars.githubusercontent.com/u/102349883?s=400&v=4" alt="Seonghun Jung" /> |
| [GitHub: @SincerityHun](https://github.com/sincerityhun) | 
| 성균관대학교 소프트웨어학과 3학년 | 
