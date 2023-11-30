# DP_Backend

- Backend Flask Server

## Project Tech Stack

## Dev Server 실행 방법

## Production 배포 방법

## 환경 변수 및 Secret 변수

1. ENV_VARIABLES
   - AWS IAM Key
2. SERVICE_ACCOUNT_KEY
   - Google Firebase Access Key
3. WEB_PEM
   - AWS EC2 Access Key

## Server 로컬 실행

1. cd DP_Backend/

2. docker ps -al

   - 상태 확인

3. docker build -t flask-backend:ver1 .

4. docker images

   - 이미지 확인

5. docker run -p 8080:8080 flask-backend:ver1
   - Docker Container Run
