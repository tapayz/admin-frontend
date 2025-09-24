# CLAUDE.md

이 파일은 Claude Code (claude.ai/code)가 이 저장소에서 작업할 때 필요한 가이드를 제공합니다.

## 프로젝트 개요

TypeScript와 Tailwind CSS v4를 사용하는 TapayZ Office용 Next.js 15 관리자 프론트엔드 애플리케이션입니다. 파트너, 회원, 송장, 입금, 출금을 관리하는 기능을 가진 금융/결제 관리 시스템입니다.

## 개발 명령어

- **개발 서버 시작**: `npm run dev` (http://localhost:2131에서 시작)
- **프로덕션 빌드**: `npm run build`
- **프로덕션 서버 시작**: `npm start`
- **린팅 실행**: `npm run lint`
- **PM2로 배포**: `npm run pm2` (빌드 후 PM2로 시작)

## 아키텍처 & 파일 구조

### 핵심 구조
- **프레임워크**: Next.js 15 with App Router
- **스타일링**: Emotion CSS-in-JS + Tailwind CSS v4
- **상태 관리**: Zustand stores
- **API 레이어**: TanStack React Query + Axios
- **폼 처리**: React Hook Form + Zod 검증
- **UI 컴포넌트**: Emotion 스타일을 사용한 커스텀 컴포넌트 라이브러리

### 디렉토리 구조
```
src/
├── app/                    # Next.js App Router 페이지
│   ├── (admin)/           # 관리자 대시보드 페이지 (보호된 라우트)
│   │   ├── dashboard/     # 메인 대시보드
│   │   ├── partners/      # 파트너 관리
│   │   ├── members/       # 회원 관리
│   │   ├── invoices/      # 송장 관리
│   │   └── ...
│   ├── signin/            # 인증 페이지
│   └── payment/[id]/      # 공개 결제 페이지
├── _components/           # 재사용 가능한 UI 컴포넌트
├── _commomActions/        # 공통 API 액션
├── _layouts/              # 레이아웃 컴포넌트
├── _stores/               # Zustand 상태 스토어
├── _service/              # API 클라이언트 서비스
├── _utils/                # 헬퍼 유틸리티
├── _datas/                # 정적 데이터 테이블
└── lib/                   # 라이브러리 헬퍼
```

## 주요 의존성 & 패턴

### 상태 관리
- **Zustand**: 기본 상태 관리 (`_stores/` 디렉토리 참조)
- **TanStack React Query**: 훅 패턴을 사용한 서버 상태 관리
- **React Hook Form**: Zod 스키마 검증을 사용한 폼 상태

### 스타일링 시스템
- **Emotion**: 컴포넌트 스타일을 위한 CSS-in-JS (`.styles.ts` 파일)
- **Tailwind CSS v4**: 빠른 개발을 위한 유틸리티 클래스
- 각 컴포넌트는 해당하는 `.styles.ts` 파일을 가집니다 (예: `Button.tsx` + `Button.styles.ts`)

### API 아키텍처
- **액션 패턴**: `_commomActions/`와 컴포넌트별 `_actions/`의 API 호출
- **DTOs**: `_dtos/` 디렉토리의 요청/응답 타입
- **React Query 훅**: `react-query/` 하위 디렉토리의 커스텀 훅
- **Axios**: 커스텀 설정을 가진 HTTP 클라이언트

### 컴포넌트 패턴
- **아토믹 디자인**: 복잡도에 따른 컴포넌트 구성 (원자 → 분자 → 유기체)
- **코로케이션**: 관련 파일들을 함께 그룹화 (컴포넌트 + 스타일 + 타입 + 훅)
- **모달 시스템**: `_components/Modals/`의 중앙화된 모달 컴포넌트

## 설정 세부사항

### 경로 별칭
- `@/*` → `./src/*`
- `@/assets/*` → `./public/assets/*`

### 주요 설정 파일
- **ESLint**: Next.js core web vitals + TypeScript (`no-explicit-any` 비활성화)
- **TypeScript**: Strict 모드, ES2017 타겟, Emotion 타입 포함
- **Next.js**: Emotion 컴파일러 활성화, @svgr/webpack을 통한 SVG 지원
- **PM2**: `ecosystem.config.js`를 통한 프로덕션 배포

## 개발 가이드라인

### 테스팅
- 현재 자동화된 테스트 러너 설정 없음
- 주요 플로우에 대한 수동 QA 집중: 로그인, 결제 처리, 관리자 대시보드
- 최소 코드 품질 게이트로 `npm run lint` 사용

### 코드 스타일
- **TypeScript**: Strict 모드, React 컴포넌트는 `.tsx` 선호
- **네이밍**: 컴포넌트는 PascalCase, 훅/유틸리티는 camelCase
- **임포트**: 상대 경로 대신 경로 별칭 (`@/`) 사용
- **스타일**: Emotion CSS-in-JS 선호, 앱 전체 스타일은 `globals.css` 대체

### API 개발
- 새로운 API 엔드포인트는 `_commomActions/`의 기존 패턴 따르기
- 요청/응답 객체의 타입 안전성을 위해 DTO 사용
- 데이터 페칭을 위한 React Query 훅 구현
- 관련 API 로직 코로케이션 (액션 + DTO + 훅)