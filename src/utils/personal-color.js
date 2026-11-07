/**
 * 퍼스널컬러 8타입 정보와 문진 문항
 * 문항 id 와 선택지 value 는 color-diagnosis.js 의 점수표와 같게 유지한다.
 */
export const SEASONS = {
  spring_light: {
    label: '봄 웜 라이트',
    emoji: '🌷',
    keyword: '맑고 산뜻한',
    swatches: ['#FFD3B6', '#FFE5A0', '#FFB7A5', '#BFE3B4'],
  },
  spring_bright: {
    label: '봄 웜 브라이트',
    emoji: '🍊',
    keyword: '생기 있고 선명한',
    swatches: ['#FF8A5B', '#FFC93C', '#FF6F61', '#7FD1AE'],
  },
  summer_light: {
    label: '여름 쿨 라이트',
    emoji: '🫧',
    keyword: '시원하고 투명한',
    swatches: ['#F7CAD8', '#CFE0F5', '#E0D1F2', '#BDE3E0'],
  },
  summer_mute: {
    label: '여름 쿨 뮤트',
    emoji: '🌫️',
    keyword: '차분하고 우아한',
    swatches: ['#C9A0AE', '#9FB3C8', '#B5A7C4', '#A7BDB5'],
  },
  autumn_mute: {
    label: '가을 웜 뮤트',
    emoji: '🍂',
    keyword: '부드럽고 깊이 있는',
    swatches: ['#C98F6B', '#B9A36B', '#B5766A', '#8F9B6B'],
  },
  autumn_deep: {
    label: '가을 웜 딥',
    emoji: '🍁',
    keyword: '진하고 고급스러운',
    swatches: ['#8C4A2F', '#A66E1E', '#8E3B2E', '#55613A'],
  },
  winter_bright: {
    label: '겨울 쿨 브라이트',
    emoji: '❄️',
    keyword: '쨍하고 또렷한',
    swatches: ['#E6186D', '#1E5BD6', '#7B2FD0', '#00A3A3'],
  },
  winter_deep: {
    label: '겨울 쿨 딥',
    emoji: '🌌',
    keyword: '강렬하고 세련된',
    swatches: ['#7A1036', '#1B2A5C', '#3F1A5E', '#0E4D4D'],
  },
};

export const QUIZ_QUESTIONS = [
  {
    id: 'veins',
    title: '손목 안쪽 혈관은 어떤 색인가요?',
    hint: '자연광에서 보면 가장 정확해요.',
    options: [
      { value: 'green', label: '초록빛' },
      { value: 'blue', label: '푸른 보랏빛' },
      { value: 'mixed', label: '둘이 섞여 있어요' },
    ],
  },
  {
    id: 'metal',
    title: '어떤 액세서리가 더 잘 어울리나요?',
    options: [
      { value: 'gold', label: '골드' },
      { value: 'silver', label: '실버' },
      { value: 'both', label: '둘 다 비슷해요' },
    ],
  },
  {
    id: 'sun',
    title: '햇볕을 쬐면 피부가 어떻게 되나요?',
    options: [
      { value: 'tan', label: '구릿빛으로 타요' },
      { value: 'red', label: '붉어졌다가 돌아와요' },
      { value: 'both', label: '둘 다 그래요' },
    ],
  },
  {
    id: 'skin',
    title: '피부 밝기는 어느 쪽에 가깝나요?',
    options: [
      { value: 'light', label: '밝은 편' },
      { value: 'medium', label: '중간' },
      { value: 'deep', label: '어두운 편' },
    ],
  },
  {
    id: 'hair',
    title: '염색하기 전 머리색은 어떤가요?',
    options: [
      { value: 'brown', label: '밝은 갈색' },
      { value: 'dark', label: '짙은 갈색' },
      { value: 'black', label: '검정에 가까워요' },
    ],
  },
  {
    id: 'eyes',
    title: '눈동자 색은 어떤가요?',
    options: [
      { value: 'light', label: '밝은 갈색' },
      { value: 'brown', label: '진한 갈색' },
      { value: 'black', label: '흑갈색' },
    ],
  },
  {
    id: 'impression',
    title: '주변에서 듣는 첫인상은 어떤가요?',
    options: [
      { value: 'soft', label: '부드럽고 은은해요' },
      { value: 'clear', label: '또렷하고 선명해요' },
      { value: 'neutral', label: '그 중간이에요' },
    ],
  },
  {
    id: 'skinType',
    title: '피부 타입을 알려주세요',
    hint: '메이크업 추천에 사용해요.',
    options: [
      { value: 'dry', label: '건성' },
      { value: 'oily', label: '지성' },
      { value: 'combo', label: '복합성' },
      { value: 'sensitive', label: '민감성' },
    ],
  },
  {
    id: 'level',
    title: '메이크업은 얼마나 익숙하세요?',
    options: [
      { value: 'beginner', label: '이제 시작해요' },
      { value: 'middle', label: '보통이에요' },
      { value: 'expert', label: '능숙해요' },
    ],
  },
  {
    id: 'mood',
    title: '어떤 분위기를 원하세요?',
    options: [
      { value: 'natural', label: '내추럴' },
      { value: 'fresh', label: '화사' },
      { value: 'chic', label: '시크' },
      { value: 'romantic', label: '러블리' },
    ],
  },
];

/** 진단 결과를 게시판 글쓰기 초기값으로 바꾼다 */
export function toSharedPost(analysis) {
  const season = SEASONS[analysis.season];
  const { summary, makeup } = analysis.result;
  const makeupLines = makeup.map((item) => `• ${item.part}: ${item.color_name}`).join('\n');

  return {
    title: `퍼스널컬러 진단 결과, 저는 ${season.label}이에요 ${season.emoji}`,
    category: '퍼스널컬러',
    rating: null,
    imageUrl: null,
    content: `${summary}\n\n[추천 메이크업]\n${makeupLines}`,
  };
}
