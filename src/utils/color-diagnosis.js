import { SEASONS } from './personal-color.js';

/** 문항별 점수표. tone: +웜 -쿨, value: +밝음 -어두움, clarity: +선명 -부드러움 */
const SCORES = {
  veins: { green: { tone: 2 }, blue: { tone: -2 }, mixed: {} },
  metal: { gold: { tone: 2 }, silver: { tone: -2 }, both: {} },
  sun: { tan: { tone: 1 }, red: { tone: -1 }, both: {} },
  skin: { light: { value: 2 }, medium: {}, deep: { value: -2 } },
  hair: { brown: { value: 1 }, dark: {}, black: { value: -1 } },
  eyes: { light: { value: 1 }, brown: {}, black: { value: -1 } },
  impression: { soft: { clarity: -2 }, clear: { clarity: 2 }, neutral: {} },
};

const REASONS = {
  veins: { green: '손목 혈관이 초록빛이라 노란 기가 도는 웜톤에 가까워요.', blue: '손목 혈관이 푸른 보랏빛이라 푸른 기가 도는 쿨톤에 가까워요.' },
  metal: { gold: '골드 액세서리가 잘 어울려 따뜻한 색과 조화로워요.', silver: '실버 액세서리가 잘 어울려 시원한 색과 조화로워요.' },
  skin: { light: '피부가 밝은 편이라 밝은 색이 잘 받아요.', deep: '피부에 깊이가 있어 진한 색도 잘 받아요.' },
  impression: { soft: '첫인상이 은은해서 부드러운 색이 잘 맞아요.', clear: '첫인상이 또렷해서 선명한 색이 잘 맞아요.' },
};

const SKIN_TIPS = {
  dry: '건성 피부는 베이스 전에 보습을 충분히 하고, 촉촉한 제형을 골라 주세요.',
  oily: '지성 피부는 유분이 많은 부위만 얇게 파우더를 눌러 주세요.',
  combo: '복합성 피부는 건조한 볼은 촉촉하게, 티존은 보송하게 나눠서 발라 주세요.',
  sensitive: '민감성 피부는 새 제품을 귀 뒤 같은 곳에 먼저 시험해 보세요.',
};

const LEVEL_TIPS = {
  beginner: '처음이라면 베이스와 립부터 시작해 보세요.',
  middle: '치크와 립 색을 맞추면 전체가 더 정돈돼 보여요.',
  expert: '아이 색을 두 단계로 겹치면 깊이를 더할 수 있어요.',
};

const MOOD_TIPS = {
  natural: '내추럴하게 하려면 색을 손가락으로 얇게 펴 주세요.',
  fresh: '화사하게 하려면 볼 앞쪽에 치크를 살짝 더해 주세요.',
  chic: '시크하게 하려면 치크를 줄이고 아이라인을 또렷하게 그려 주세요.',
  romantic: '러블리하게 하려면 립을 그라데이션으로 연출해 주세요.',
};

const color = (name, hex) => ({ name, hex });
const makeup = (part, colorName, hex, howTo) => ({ part, color_name: colorName, hex, how_to: howTo });

const SEASON_DETAILS = {
  spring_light: {
    summary: '밝고 따뜻한 빛이 도는 타입이에요. 복숭아처럼 맑고 산뜻한 색이 얼굴을 화사하게 밝혀 줘요.',
    best_colors: [color('피치', '#FFD3B6'), color('레몬 크림', '#FFE5A0'), color('코랄 핑크', '#FFB7A5'), color('애플 그린', '#BFE3B4'), color('아이보리', '#FFF3DC'), color('라이트 카멜', '#E3BC8E')],
    avoid_colors: [color('블랙', '#1C1C1C'), color('버건디', '#6D1A36'), color('차콜', '#3A3D42')],
    makeup: [
      makeup('베이스', '아이보리 베이지', '#F4DCC4', '얇게 두드려 맑은 피부 표현을 살려 주세요.'),
      makeup('아이브로우', '소프트 브라운', '#A67F5D', '머리색보다 살짝 밝게 그려 주세요.'),
      makeup('아이', '샴페인 피치', '#F2CBA6', '눈두덩에 넓게 펴고 은은한 펄을 더해 주세요.'),
      makeup('치크', '피치 코랄', '#FFB99C', '볼 앞쪽에 둥글게 올려 주세요.'),
      makeup('립', '코랄 피치', '#FF9D85', '촉촉한 제형으로 입술 전체에 발라 주세요.'),
    ],
  },
  spring_bright: {
    summary: '따뜻하면서 생기가 넘치는 타입이에요. 선명하고 비비드한 색을 입으면 얼굴에 활기가 돌아요.',
    best_colors: [color('탠저린', '#FF8A5B'), color('선플라워', '#FFC93C'), color('리빙 코랄', '#FF6F61'), color('민트 그린', '#7FD1AE'), color('터콰이즈', '#2CBFB1'), color('웜 레드', '#E8452C')],
    avoid_colors: [color('그레이', '#9A9A9A'), color('더스티 핑크', '#C9A0AE'), color('블랙', '#1C1C1C')],
    makeup: [
      makeup('베이스', '라이트 베이지', '#F2D5B8', '광이 나도록 얇게 발라 주세요.'),
      makeup('아이브로우', '웜 브라운', '#8F6242', '또렷하되 자연스럽게 그려 주세요.'),
      makeup('아이', '오렌지 브라운', '#E59A5F', '쌍꺼풀 라인에 진하게 포인트를 주세요.'),
      makeup('치크', '살구 오렌지', '#FF9E73', '광대 위로 생기 있게 올려 주세요.'),
      makeup('립', '비비드 코랄', '#FF5E4D', '선명하게 발라 포인트로 삼아 주세요.'),
    ],
  },
  summer_light: {
    summary: '맑고 시원한 빛이 도는 타입이에요. 파스텔처럼 투명하고 가벼운 색이 가장 잘 어울려요.',
    best_colors: [color('베이비 핑크', '#F7CAD8'), color('스카이 블루', '#CFE0F5'), color('라일락', '#E0D1F2'), color('아쿠아 민트', '#BDE3E0'), color('소프트 화이트', '#F7F7FA'), color('라벤더', '#C9BDE6')],
    avoid_colors: [color('오렌지', '#F07A1A'), color('머스터드', '#C99A16'), color('다크 브라운', '#4A2D1E')],
    makeup: [
      makeup('베이스', '핑크 베이지', '#F4DCD8', '화사한 핑크빛을 살려 얇게 발라 주세요.'),
      makeup('아이브로우', '애쉬 브라운', '#9A8880', '부드럽게 쓸어 주듯 그려 주세요.'),
      makeup('아이', '라벤더 핑크', '#DCC5E0', '눈두덩에 얇게 펴 주세요.'),
      makeup('치크', '베이비 핑크', '#F5B8C8', '볼 앞쪽에 가볍게 톡톡 올려 주세요.'),
      makeup('립', '스트로베리 밀크', '#F08AA6', '틴트로 물들이듯 발라 주세요.'),
    ],
  },
  summer_mute: {
    summary: '차분하고 시원한 분위기의 타입이에요. 회색이 살짝 섞인 부드러운 색이 우아함을 살려 줘요.',
    best_colors: [color('로즈 베이지', '#C9A0AE'), color('더스티 블루', '#9FB3C8'), color('라벤더 그레이', '#B5A7C4'), color('세이지', '#A7BDB5'), color('모브', '#A98BA0'), color('소프트 네이비', '#46536B')],
    avoid_colors: [color('네온 오렌지', '#FF6A00'), color('머스터드', '#C99A16'), color('카멜', '#B5823E')],
    makeup: [
      makeup('베이스', '뉴트럴 쿨 베이지', '#EBD3C9', '윤기를 조금 줄이고 세미매트하게 표현해 주세요.'),
      makeup('아이브로우', '애쉬 브라운', '#7B6A63', '결을 살려 그려 주세요.'),
      makeup('아이', '모브 그레이', '#9D8894', '눈두덩에 넓게 펴 발라 주세요.'),
      makeup('치크', '뮤트 로즈', '#D49AA6', '광대 위에 가볍게 올려 주세요.'),
      makeup('립', '로즈 모브', '#B56C82', '입술 중앙부터 번지듯 발라 주세요.'),
    ],
  },
  autumn_mute: {
    summary: '깊이 있고 따뜻한 분위기의 타입이에요. 흙과 낙엽처럼 부드럽고 차분한 색이 잘 어울려요.',
    best_colors: [color('테라코타', '#C98F6B'), color('올리브 베이지', '#B9A36B'), color('로즈 브라운', '#B5766A'), color('카키', '#8F9B6B'), color('오트밀', '#E2D3BC'), color('모카', '#8A6A55')],
    avoid_colors: [color('핫핑크', '#F0288C'), color('아이시 블루', '#CDE9F7'), color('퓨어 화이트', '#FFFFFF')],
    makeup: [
      makeup('베이스', '내추럴 베이지', '#E8CBA8', '세미매트하게 차분히 표현해 주세요.'),
      makeup('아이브로우', '카키 브라운', '#7D6547', '부드러운 일자 느낌으로 그려 주세요.'),
      makeup('아이', '베이지 브라운', '#B98E6B', '눈꼬리 쪽으로 은은하게 음영을 넣어 주세요.'),
      makeup('치크', '살구 베이지', '#D99F7F', '광대 아래로 자연스럽게 쓸어 주세요.'),
      makeup('립', '말린 장미', '#B0604F', '입술 전체에 가볍게 발라 주세요.'),
    ],
  },
  autumn_deep: {
    summary: '진하고 고급스러운 분위기의 타입이에요. 깊고 풍부한 색을 쓰면 또렷한 카리스마가 살아나요.',
    best_colors: [color('초콜릿', '#6B3A22'), color('브릭 오렌지', '#B4552D'), color('머스터드', '#A66E1E'), color('버건디 브라운', '#7A2E2A'), color('다크 올리브', '#55613A'), color('골드', '#C49A3A')],
    avoid_colors: [color('베이비 핑크', '#F7CAD8'), color('라일락', '#E0D1F2'), color('아이시 그레이', '#D5DAE0')],
    makeup: [
      makeup('베이스', '허니 베이지', '#DDB98F', '윤기를 살짝 남기고 탄탄하게 표현해 주세요.'),
      makeup('아이브로우', '다크 브라운', '#5A3F2C', '각을 살려 또렷하게 그려 주세요.'),
      makeup('아이', '브론즈 브라운', '#8C5A33', '눈꼬리에 진하게 음영을 넣어 주세요.'),
      makeup('치크', '테라코타', '#B96A47', '광대 아래로 깊이 있게 쓸어 주세요.'),
      makeup('립', '브릭 레드', '#8E3B2E', '입술 라인을 살려 또렷하게 발라 주세요.'),
    ],
  },
  winter_bright: {
    summary: '쨍하고 또렷한 대비가 매력인 타입이에요. 채도가 높고 선명한 쿨톤 색이 이목구비를 살려 줘요.',
    best_colors: [color('푸시아', '#E6186D'), color('로열 블루', '#1E5BD6'), color('바이올렛', '#7B2FD0'), color('에메랄드', '#00A3A3'), color('퓨어 화이트', '#FFFFFF'), color('블랙', '#1C1C1C')],
    avoid_colors: [color('베이지', '#D9C2A3'), color('카키', '#8F9B6B'), color('살구', '#F7C4A0')],
    makeup: [
      makeup('베이스', '쿨 아이보리', '#F2DED6', '결점을 깔끔하게 가려 매끈하게 표현해 주세요.'),
      makeup('아이브로우', '그레이 블랙', '#4A4648', '깔끔하고 선명하게 그려 주세요.'),
      makeup('아이', '실버 플럼', '#8E7A9C', '실버 펄로 눈매를 또렷하게 밝혀 주세요.'),
      makeup('치크', '쿨 핑크', '#F07BA6', '광대에 얇게 얹어 주세요.'),
      makeup('립', '푸시아 레드', '#D3145F', '선명한 색을 입술 라인까지 꽉 채워 주세요.'),
    ],
  },
  winter_deep: {
    summary: '강렬하고 세련된 분위기의 타입이에요. 어둡고 깊은 쿨톤 색이 도시적인 느낌을 완성해 줘요.',
    best_colors: [color('와인', '#7A1036'), color('미드나잇 네이비', '#1B2A5C'), color('딥 퍼플', '#3F1A5E'), color('다크 틸', '#0E4D4D'), color('블랙', '#1C1C1C'), color('실버', '#BFC3C9')],
    avoid_colors: [color('피치', '#FFD3B6'), color('레몬', '#FFE5A0'), color('베이지', '#D9C2A3')],
    makeup: [
      makeup('베이스', '뉴트럴 베이지', '#E2C6B4', '세미매트하게 깔끔히 표현해 주세요.'),
      makeup('아이브로우', '소프트 블랙', '#3B3638', '길고 또렷하게 그려 주세요.'),
      makeup('아이', '플럼 그레이', '#5E4B63', '눈꼬리 쪽으로 깊게 음영을 넣어 주세요.'),
      makeup('치크', '딥 로즈', '#B8567A', '광대 아래에 은은하게 쓸어 주세요.'),
      makeup('립', '다크 체리', '#7A1036', '입술 라인을 살려 진하게 발라 주세요.'),
    ],
  },
};

/** 세 축의 점수를 8타입 중 하나로 바꾼다 */
function pickSeason({ tone, value, clarity }) {
  if (tone > 0) {
    if (value >= 0) return clarity > 0 ? 'spring_bright' : 'spring_light';
    return clarity > 0 || value <= -3 ? 'autumn_deep' : 'autumn_mute';
  }
  if (clarity > 0) return value >= 0 ? 'winter_bright' : 'winter_deep';
  if (value <= -2) return 'winter_deep';
  return value >= 1 ? 'summer_light' : 'summer_mute';
}

/**
 * 문진 답변으로 퍼스널컬러를 계산한다
 * @param {object} answers - { [문항 id]: 선택값 }
 * @returns {{ season: string, result: object }}
 */
export function diagnoseColor(answers) {
  const score = { tone: 0, value: 0, clarity: 0 };
  Object.entries(SCORES).forEach(([id, options]) => {
    Object.entries(options[answers[id]] ?? {}).forEach(([axis, point]) => {
      score[axis] += point;
    });
  });

  /* 언더톤 답변이 팽팽하면 머리색으로 한 번 더 살핀다 */
  if (score.tone === 0) score.tone = answers.hair === 'black' ? -1 : 1;

  const season = pickSeason(score);
  const toneStrength = Math.abs(score.tone);
  const confidence = toneStrength >= 4 ? '높음' : toneStrength >= 2 ? '보통' : '낮음';
  const reasons = Object.entries(REASONS).flatMap(([id, options]) => options[answers[id]] ?? []);

  return {
    season,
    result: {
      ...SEASON_DETAILS[season],
      confidence,
      reasons: reasons.length > 0 ? reasons : [`답변을 종합하면 ${SEASONS[season].keyword} 색에 가장 가까워요.`],
      tip: [SKIN_TIPS[answers.skinType], LEVEL_TIPS[answers.level], MOOD_TIPS[answers.mood]].filter(Boolean).join(' '),
    },
  };
}
