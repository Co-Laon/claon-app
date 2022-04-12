# CONTRIBUTING

​ 해당 Repository는 Co-Raon 팀의 CLAON 프로젝트 Front-end Repository입니다. ​
<br/> <br/>

## 1. Fork and Clone

<br/> 
모든 contribution은 fork한 레포를 통해 진행합니다. 그러므로
`Co-Raon/CLAON-Front` 레포에서 개인 레포로 fork 해줍니다. ​ 그리고 fork한 개인
repo를 로컬 저장소로 clone 해줍니다.

```shell
git clone https://www.github.com/{개인_계정}/CLAON-Front
```

<br/>

그 후 개인 work space에서 remote를 등록해줍니다.

```shell
git remote add upstream https://github.com/Co-Raon/CLAON-Front.git
```

<br/>

## 2. Make new branch

<br/>

develop 브랜치에서, 개별 개발용 branch를 생성합니다. ​

```shell
git checkout -b (브랜치명)
```

<br/>

#### - branch 규칙

```
(타입)/(설명)
```

<br/>
#### - 타입

```
feat: 신규 기능 혹은 기능 추가 개발 시
fix: 기능 수정 및 버그 수정 시
refac: 코드 성능 개선
docs: 문서 관련 수정
chore: 환경변수나 기타 단순 수정
lint: 코드 스타일 수정
```

​

#### - 예시

- feat/20
- refac/message ​

<br/>

## 3. Develop and Commit

<br/>
​ Commit에 대한 규칙은 다음과 같습니다.

<br/>

#### - commit 규칙

```
(타입): (설명)
```

- 소문자로 시작할 것
- 문장 끝에 마침표는 사용하지 말 것
- 문장은 명령문으로 쓸 것 ​

<br/>

#### - 예시

- fix: change type int to unit
- docs: add more description ​

<br/>

## 4. Pull Request

<br/>

​ `Co-Raon/CLAON-Front` 레포에 Pull Request를 PR Template에 맞게 작성 후 올립니
다. 1인 이상의 approve를 받아야 Merge가 가능합니다.
