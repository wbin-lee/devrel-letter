export const initialState = {
  date: '2026.03.19',
  volume: '22',
  news: [
    { title: '#Agent Skills 어렵지 않아요', link: 'https://example.com/news1', thumbnailUrl: 'https://via.placeholder.com/373x200', thumbnailBase64: '' },
    { title: '#AI Agent 10배 더 잘쓰는법', link: 'https://example.com/news2', thumbnailUrl: 'https://via.placeholder.com/373x200', thumbnailBase64: '' },
  ],
  editorPicks: [
    { title: '클로드 프롬프트가 안되네요', summary: '사내 개발의 모든 문제해결은 DSDN을 찾아주세요.', link: 'https://example.com/pick1' },
    { title: '미국 국방부와 Anthropic의 갈등상황 정리', summary: '격변하는 세계 정세속에서 AI모델의 군사적 역할을 고찰해 봅시다.', link: 'https://example.com/pick2' },
    { title: 'oh-my-opencode + qwen3.5를 사내에서 돌려봤습니다', summary: '선구자들의 공유는 언제나 즐겁다! Jimmy님의 repo도 공개 되어 있습니다.', link: 'https://example.com/pick3' },
    { title: '지난 1년간 AI Platform에서 나를 괴롭히던 것', summary: 'VScode에서 active 되는 환경들을 제어하는 방법을 소개합니다.', link: 'https://example.com/pick4' },
  ],
  ai4se: [
    { summary: '스마트폰에서 Claude Code 세션을 원격 제어 해봅시다.', link: 'https://example.com/ai4se1', thumbnailUrl: 'https://via.placeholder.com/373x200', thumbnailBase64: '' },
    { summary: 'Ralph 기법으로 AI 코딩도구를 부려 먹는 방법을 알아봅시다.', link: 'https://example.com/ai4se2', thumbnailUrl: 'https://via.placeholder.com/373x200', thumbnailBase64: '' },
  ],
  devrelDs: [
    { title: '강해져서 돌아왔다. Code Mate v3.1.0 릴리즈!', link: 'https://example.com/ds1' },
  ],
  devrelKorea: [
    { title: 'AWSKRUG DevOps 소모임, 21번째 밋업 (3/18, 강남)', link: 'https://example.com/korea1' },
    { title: '제22회 차세대 테크 리더십포럼 (3/21, 한양대)', link: 'https://example.com/korea2' },
    { title: 'Microsoft AI Tour Seoul 2026 (3/26, 강남)', link: 'https://example.com/korea3' },
  ],
};

export function formReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };

    case 'SET_ITEM_FIELD': {
      const list = [...state[action.section]];
      list[action.index] = { ...list[action.index], [action.field]: action.value };
      return { ...state, [action.section]: list };
    }

    case 'ADD_ITEM': {
      const list = [...state[action.section], action.template];
      return { ...state, [action.section]: list };
    }

    case 'REMOVE_ITEM': {
      const list = state[action.section].filter((_, i) => i !== action.index);
      return { ...state, [action.section]: list };
    }

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}
