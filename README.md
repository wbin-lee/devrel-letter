# DevRel Letter Generator

Samsung DS DevRel 뉴스레터(데브렐 레터)를 생성하는 웹 애플리케이션입니다.
폼에 콘텐츠를 입력하면 Markdown(웹)용 `.md`와 이메일용 `.html` 두 가지 포맷으로 뉴스레터를 생성합니다.

## 주요 기능

- **폼 기반 편집** — 날짜, 볼륨, NEWS, Editor's Pick, AI4SE, DevRel in DS/Korea 섹션을 동적으로 추가/삭제
- **이미지 업로드** — URL 입력 또는 파일 업로드(base64 변환). Markdown은 URL, Email은 base64 사용
- **미리보기** — Email 템플릿을 브라우저에서 렌더링하고, 텍스트를 인라인 편집한 뒤 저장 가능
- **파일 다운로드** — `Save as MD` (.md), `Save as EMAIL Template` (.html)

## 시작하기

```bash
cd app
npm install
npm run dev
```

브라우저에서 `http://localhost:5173` 으로 접속합니다.

## 스크립트

| 명령어 | 설명 |
|---|---|
| `npm run dev` | 개발 서버 실행 |
| `npm run build` | 프로덕션 빌드 |
| `npm run preview` | 빌드 결과 미리보기 |
| `npm run lint` | ESLint 실행 |

## 프로젝트 구조

```
devrel-letter/
├── template_markdown.md          # 웹(Markdown)용 HTML 템플릿
├── template_email.md             # 이메일용 HTML 템플릿 (테이블 레이아웃)
├── component/                    # 뉴스레터 이미지 에셋
└── app/                          # React 앱 (Vite + React 19)
    └── src/
        ├── App.jsx               # 루트 컴포넌트, 미리보기/다운로드 로직
        ├── store.js              # useReducer 상태 관리
        ├── components/           # 폼 섹션 컴포넌트
        │   ├── MetaSection       # DATE, VOLUME
        │   ├── NewsSection       # 뉴스 (1~2개)
        │   ├── EditorPickSection # 에디터 픽 (3~5개)
        │   ├── Ai4seSection      # AI4SE 소식 (1~2개)
        │   ├── BoardSection      # DevRel in DS / Korea (동적 리스트)
        │   ├── ImageUpload       # 이미지 URL 입력 + 파일 업로드
        │   ├── SectionHeader     # 섹션 헤더 (추가/삭제 버튼)
        │   └── ActionButtons     # Preview, Save 버튼
        └── lib/                  # 템플릿 처리 엔진
            ├── templateEngine.js # 템플릿 로드 및 섹션 교체
            ├── placeholders.js   # {{KEY}} 플레이스홀더 치환
            ├── markdownGenerator.js  # 웹 템플릿 섹션 HTML 생성
            └── emailGenerator.js     # 이메일 템플릿 섹션 HTML 생성
```

## 템플릿 처리 방식

두 원본 템플릿 파일(`template_markdown.md`, `template_email.md`)은 Vite의 `?raw` import로 빌드 시점에 문자열로 로드됩니다.

1. **섹션 교체** — 템플릿 내 마커(HTML 주석 또는 고유 HTML 패턴)를 기준으로 동적 섹션을 폼 데이터로 재생성
2. **플레이스홀더 치환** — `{{DATE}}`, `{{VOLUME}}`, `{{NEWS1_THUMBNAIL_IMAGE}}` 등의 토큰을 폼 값으로 대체
3. **이미지 분기** — Markdown 출력은 항상 URL, Email 출력은 base64 우선 (없으면 URL fallback)

## Docker로 실행하기

사내 네트워크에서 다른 PC로 접속할 수 있도록 Docker로 배포할 수 있습니다.

```bash
# 1. 프로젝트 클론
git clone <repository-url>
cd devrel-letter

# 2. Docker 이미지 빌드
docker build -t devrel-letter .

# 3. 컨테이너 실행 (포트는 원하는 값으로 변경)
docker run -d -p 3000:80 --name devrel-letter devrel-letter
```

브라우저에서 `http://<워크스테이션-IP>:<포트>` 로 접속합니다.
예: `http://10.0.1.50:3000`

```bash
# 컨테이너 중지 / 삭제
docker stop devrel-letter
docker rm devrel-letter
```

## 기술 스택

- **React 19** + **Vite 8**
- 상태 관리: `useReducer`
- 파일 다운로드: Blob API
- 이미지 변환: FileReader API (`readAsDataURL`)
- 인라인 편집: iframe `contentEditable`
- 배포: Docker (nginx)
