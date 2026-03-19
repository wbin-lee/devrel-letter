export const initialState = {
  date: '',
  volume: '',
  news: [
    { title: '', link: '', thumbnailUrl: '', thumbnailBase64: '' },
  ],
  editorPicks: [
    { title: '', summary: '', link: '' },
    { title: '', summary: '', link: '' },
    { title: '', summary: '', link: '' },
  ],
  ai4se: [
    { summary: '', link: '', thumbnailUrl: '', thumbnailBase64: '' },
  ],
  devrelDs: [
    { title: '', link: '' },
  ],
  devrelKorea: [
    { title: '', link: '' },
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
