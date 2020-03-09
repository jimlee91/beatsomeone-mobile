# html 파일 퍼블리싱 보일러플레이트
> HTML프로젝트 보일러 블레이트

## INSTALL & RUN
```bash
# 1 클론
git clone https://github.com/eonsang/publish-boilerplate.git

# 2 설치
npm i

# 3 실행
gulp
```

## TASKS
- [ ] server: 서버켜기
- [ ] validateHtml: html 문법검사(`include`폴더 내 html은 예외처리)
- [ ] html: 공통부분 include
- [ ] css: autoprefixer
- [ ] scss: scss, autoprefixer 등
- [ ] js: 바벨, uglify 등 
- [ ] minImg: 이미지 파일 최적화 

## 추가&수정할 부분
- path 정리 [참고](https://www.npmjs.com/package/gulp)
- 이미지 스프라이트 가이드 작성해보기
- postcss에 대해한 내용 정리
- 메일보내기 기능

## 사용 패키지
```json
"devDependencies": {
    "@babel/core": "^7.4.3",
    "@babel/preset-env": "^7.4.3",
    "@babel/register": "^7.4.0",
    "autoprefixer": "^9.5.1",
    "browser-sync": "^2.26.3",
    "cssnano": "^4.1.10",
    "del": "^4.1.0",
    "gulp": "^4.0.0",
    "gulp-babel": "^8.0.0",
    "gulp-concat": "^2.6.1",
    "gulp-connect-php": "^1.0.3",
    "gulp-file-include": "^2.0.1",
    "gulp-imagemin": "^5.0.3",
    "gulp-plumber": "^1.2.1",
    "gulp-postcss": "^8.0.0",
    "gulp-sass": "^4.0.2",
    "gulp-sourcemaps": "^2.6.5",
    "gulp-uglify": "^3.0.2",
    "gulp-w3c-html-validator": "^1.4.3",
    "through2": "^3.0.1"
  }
```