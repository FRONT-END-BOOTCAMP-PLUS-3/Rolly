# 📃 Rolly : 디지털 롤링페이퍼

### 모두의 마음이 채워져 선물이 되는 순간!

<p align="center">
  <img width="390" alt="Image" src="public/readme/logo.png" />
</p>

## 🔗 배포 링크

> https://rolling-memory.vercel.app

|       ID       | Password  |
| :------------: | :-------: |
| rolly@user.com | rolly123! |

<br/>

## 🗂️ 목차

- [💁🏻‍♀ 프로젝트 소개](#-프로젝트-소개)
- [✨ 기능 소개](#-기능-소개)
- [👩🏻‍💻 구성원](#-구성원)
- [🛠️ 기술 스택](#-기술-스택)
- [💾 ERD](#-ERD)
- [📁 디렉터리 구조](#-디렉터리-구조)
- [💻 협업 환경](#-협업-환경)

<br/>

## 💁🏻‍♀ 프로젝트 소개

롤리는 디지털 롤링페이퍼 서비스입니다.
아날로그 롤링페이퍼가 주는 따뜻함, 당사자 몰래 많은 사람들이 롤링페이퍼를 준비하는 설렘, 그리고 감사의 답장이 만들어내는 소중한 추억을 디지털 공간에서도 그대로 느낄 수 있도록 구현했습니다. <br/>
<br/>
"마음이 오가는 순간을 담아, 특별한 기억으로 남길 수 있도록."

<br/>

## ✨ 기능 소개

### 롤링페이퍼 생성

| 롤링페이퍼 만들기 | 메시지 작성하기 | 스티커 붙이기 |
| :------------: | :------------: | :------------: |
| <img width="250" src="public/readme/create_rolly.gif" /> | <img width="250" src="public/readme/create_postit.gif" /> | <img width="250" src="public/readme/create_sticker.gif" /> |

### 롤링페이퍼 관리

| 롤링페이퍼 완성/삭제하기 | 롤링페이퍼 공유/저장하기 | 답장하기 |
| :------------: | :------------: | :------------: |
| <img width="250" src="public/readme/lock_delete_rolly.gif" /> | <img width="250" src="public/readme/share_save_rolly.gif" /> | <img width="250" src="public/readme/reply.gif" /> |

### 로그인/회원가입

| 이메일 로그인 | 카카오 로그인 | 회원가입 |
| :------------: | :------------: | :------------: |
| <img width="250" src="public/readme/login.gif" /> | <img width="250" src="public/readme/kakao_login.gif" /> | <img width="250" src="public/readme/signup.gif" /> |

<br/>

## 👩🏻‍💻 구성원

<table>
  <tbody>
    <tr>
      <td align="center">
        <img width="250" src="public/readme/민준.png" alt="민준"/><br />
        <sub><b>팀장 김민준</b></sub><br /><br />
        <ul align="left">
          <li>자체 회원가입, 로그인</li>
          <li>스티커 꾸미기 기능</li>
          <li>롤리 공유 및 저장 기능</li>
        </ul>
      </td>
      <td align="center">
        <img width="250" src="public/readme/하영.png" alt="하영" /><br />
        <sub><b>팀원 엄하영</b></sub><br /><br />
        <ul align="left">
          <li>포스트잇 작성 기능</li>
          <li>롤리 잠금 및 삭제 기능</li>
          <li>이메일 일괄 답장 기능</li>
        </ul>
      </td>
      <td align="center">
        <img width="250" src="public/readme/지수.png" alt="지수"/><br />
        <sub><b>팀원 윤지수</b></sub><br /><br />
        <ul align="left">
          <li>롤리 생성 기능</li>
          <li>롤리 상세 조회 기능</li>
          <li>카카오 소셜 로그인</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

<br/>

## 🛠️ 기술 스택

### ✔️ Frond-end

<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black"> <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white"> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"> <img src="https://img.shields.io/badge/CSS%20MODULES-000000?style=for-the-badge&logo=CSS%20MODULES&logoColor=white" /> <img src="https://img.shields.io/badge/SASS-CC6699?style=for-the-badge&logo=Sass&logoColor=white"> <img src="https://img.shields.io/badge/Zustand-8B5CF6?style=for-the-badge&logo=Zustand&logoColor=white">

### ✔️ Back-end

<img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=Supabase&logoColor=white">

### ✔️ Design

<img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=Figma&logoColor=white">

### ✔️ Collaboration

<img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white"> <img src="https://img.shields.io/badge/GITHUB-181717?style=for-the-badge&logo=GITHUB&logoColor=white" /> <img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white"> <img src="https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=Discord&logoColor=white">

<br/>

## 💾 ERD

<img alt="Image" src="public/readme/ERD.png" />

<br/>

## 📁 디렉터리 구조

### 클린 아키텍처 사용

```
app/
├── (anon)/          # Presentation 계층: UI 페이지(비로그인 사용자)
│   ├── login/
│   │   └── page.tsx
│   ├── rollies/
│   │   └── [id]/
│   └── ...
├── api/             # Adapter 계층: API Routes
│   ├── login/
│   │   └── route.ts
│   └── ...
├── member/          # Presentation 계층: UI 페이지(로그인 사용자)
│   ├── postits/
│   │   └── create/
│   └── ...
├── global.scss
└── layout.tsx

application/         # Application 계층: 애플리케이션의 비즈니스 로직 처리
└── usecases/
    ├── rolly/
        └── dto/
        └── DfCreateRollyUsecase.ts
    └── ...

components/
├── modal/
└── ...

domain/              # Domain 계층: 도메인 모델 정의
├── entities/
│   ├── User.ts
│   ├── Rolly.ts
│   └── ...
└── repositories/
    ├── UserRepository.ts
    └── ...

infrastructure/      # Infrastructure 계층: 외부 서비스 사용
└── repositories/
     ├── SbUserRepository.ts
     └── ...
```

<img src="public/readme/clean_architecture.png" />

<br/>

## 💻 협업 환경

### 협업 방식

- 피그마 디자인 시스템 사용
<img src="public/readme/design system.png" />
- 노션에 정보 공유 및 회의록, 요구사항, 컨벤션 정리
<img src="public/readme/notion.png" />
- Git Flow 브랜치 전략 사용

### 컨벤션

- 커밋 컨벤션

```
✨ feat: 새 기능 추가
🐛 fix: 버그 수정
📝 docs: 문서 추가/수정
💄 style: UI/style 파일 추가/수정
♻️ refactor: 코드 리팩토링
🔧 chore: 구성 파일 추가 / 삭제
```

- PR 컨벤션

```
### Description
-
-

### CheckList
- [ ]
- [ ]
```

- 코드 리뷰 컨벤션

```
LGTM 👍🏻
IMO 💬
```
