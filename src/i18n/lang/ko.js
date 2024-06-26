import koLocal from 'element-ui/lib/locale/lang/ko';
//韩国
const ko = {
  Mining: {
    assets: '관리 자금',
    income: '오늘의 예상 수입',
    incomeAll: '누적 소득',
    order: '에스크로 주문',
    record: '위치',
    list: {
      minNumber: '단일 금액',
      rate: '일일 수익률',
      cycle: '주기',
      btn: '신청',
      recentRate: '최근일(일수입)',
      quota: '단일 한도 USDT',
      backTime: '배당시간',
      advance: '조기 상환',
      buyNumber: '구매 금액',
      all: '모두',
      available: '사용 가능:',
      day: `{num}일`,
      everyday: '매일',
      onTimeBack: '만기 반환',
      password: '거래 비밀번호',
    },
    table: {
      name: '이름:',
      number: '담보 금액',
      income: '수익',
      startTime: '요청 시간',
      endTime: '만료일',
      state: '상태',
      operation: '작동하다',
    },
    state: {
      enable: '실행 중',
      success: '완성',
      close: '이미 되찾았다',
    },
    alert: {
      max: `최대 거래 금액은 {num}입니다.`,
      min: `최소 거래 금액은 {num}입니다.`,
    },
  },
  // Exchange: {
  //   alert: {
  //     min: '최소 구 매 량 은',
  //     max: '최대 구 매 량 은',
  //     balance: '잔고 부족, 확인 하 세 요',
  //   },
  //   btn: '교환 을 확인 하 다',
  //   password: '거래 비밀번호',
  //   placeholder1: '교환 금액 은 최소',
  //   placeholder2: '교환 금액 이 가장 큰 것 은',
  //   placeholder3: '거래 비밀 번 호 를 입력 하 세 요',
  //   record: '태환 기록',
  //   label: {
  //     one: '화폐 교환',
  //     two: '교환 수량',
  //     three: '환율',
  //     four: '교환 하 다.',
  //     five: '취득 금액',
  //     six: '제출 하 다',
  //     seven: '돈 을 획득 하 다',
  //   },
  //   label1: '화폐 교환',
  //   label2: '교환 수량',
  //   label3: '교환 치 획득',
  //   label4: '시간.',
  // },
  // IEO: {
  //   record: 'ieo 레코드',
  //   price: '단가',
  //   total: '총 유통량입니다',
  //   startdate: '시작 시간',
  //   enddate: '종료 시간',
  //   state: '상태',
  //   btn: '즉시 교환',
  //   close: '끝났다',
  //   noopen: '열려있지 않습니다.',
  //   cylce: '창고 잠금 주기',
  //   cycleDay: `{day}일`,
  //   dialog: {
  //     title: '구매 {coin}',
  //     label1: "지불 화폐'입니다",
  //     label2: '코인 구매 수량',
  //     label3: '예상 결제',
  //     label4: "무료'입니다",
  //     label5: '발행 총량',
  //     label6: '잔고',
  //     label7: '모두 사용',
  //     confirm: '지금 구매하세요.',
  //     cancel: '취소',
  //     placeholder1: '지불 통화를 선택하십시오.',
  //     placeholder2: '구매 금액을 입력해주세요.',
  //   },
  //   recordPrice: `지불 화폐 종류 {number}{coin}`,
  // },
  realNameOpen: {
    title: '당신은 아직 실명 인증을 통과하지 못했으니, 먼저 인증하십시오',
  },
  invite: {
    headerTitle: '친 구 를 초대 하여 함께 즐기다',
    downText: '빨리 친 구 를 불 러 서 "ActionEx" 다운 받 아 주세요',
    header: '요청 레코드',
    myInvite: '나의 초대',
    teamRecord: '소유 기록',
    rule: '초대 규칙',
    rules: {
      one: '1. 친구 가 초 대 를 받 은 후에 거래 구역 에서 진실 한 거래 수수료 가 발생 할 때마다 해당 거래 구역 비례 의 커미션 반환 이 발생 한다',
      two: '2. 커미션 반환 의 형식: 사용자 가 해당 되 는 거래 지역 에서 거래 하고 발생 하 는 거래 수수 료 는 모두 50% 로 커미션 을 반환 하 며 - 급 30%, 2 급 20% 의 비율 로 추천인 의 거래 계좌 로 커미션 을 반환 합 니 다',
      three:
        '3. 친구 거래 커미션 반환 당일 통계;리베이트 액 (해당 거래 구역) = 실제 거래 량 ★ 수수료 비례 * 리베이트 비율',
      four: '4. 초 대 받 은 사람 이 친구 거래 에서 커미션 을 받 을 때 유효 시간 은 초 대 받 은 사람 이 실제 등록 한 시간 으로 계산 하고 유효 시간 (365 일) 이 되면 귀 하 는 해당 초청장 의 거래 에 수수료 가 발생 하 는 커미션 을 받 지 않 습 니 다',
      five: '5. 동전 충전 수수 료 는 수수료 반환 에 참여 하지 않 습 니 다',
      six: '* 행사 에 조정 이 있 으 면 품 체인 플랫폼 의 갱신 을 기준 으로 하고 최종 해석 권 은 품 체인 에 귀속 된다',
    },
    title1: '친 구 를 초대 하 다',
    title2: '다운로드 등록',
    title3: '보상 을 수령 하 다',
    pro1: '초대장 링크 를 복사 하여 친구 에 게 발송',
    pro2: '친구 다운로드, 등록 완료',
    pro3: '친구를 성공적으로 초청하여 커미션 보상을 획득',
    label1: '초대 링크',
    label2: '초청장 코드',
    label3: '총 인원 을 초대 하 다',
    label4: '인원 수 를 직 추 하 다',
    btn1: '초청 하 다',
    btn2: '복제 하 다',
    hasInvite: '초 대 됨',
    form: {
      account: '초청장',
      time: '시간',
      number: 'ieo 수량',
      financial: '재 테 크 수량',
      from: '출처',
    },
  },

  // Financial: {
  //   text: '정량 거래 안정 수익',
  //   record: '재 테 크 기록',
  //   charge: '충전 화폐',
  //   transaction: '거래 하 다.',
  //   profit: '수익 률',
  //   way: '상환 방식',
  //   number: '최소 시작 금액',
  //   date: '재 테 크 일수',
  //   btn: '즉시 투입 하 다',
  //   order: '주문 번호',
  //   details: '상세 한 상황 을 보다.',
  //   buy: '투입 수량',
  //   state: '상태.',
  //   type1: '재 테 크 중',
  //   type2: '완료 됨',
  //   profitRecord: '수익 기록',
  //   recordTitle: 'DeFi 수익',
  //   name: '공급 원',
  //   time: '시간.',
  //   num: '수량.',
  //   total: '누적 수익',
  //   orderID: '주문 ID',
  //   alert: {
  //     title: '데 파 이 를 구 매 하 다',
  //     number: '구 매 수량',
  //     balance: '계좌 사용 가능 잔액:',
  //     password: '거래 비밀번호',
  //     all: '전부.',
  //     btn: '투입 을 확인 하 다',
  //     placeholder1: '투입 수량 을 입력 하 세 요',
  //     placeholder2: '거래 비밀 번 호 를 입력 하 세 요',
  //     min: '최소 시작 수량 은',
  //     noBalance: '잔고 가 부족 하 다',
  //     noPassword: '거래 비밀 번 호 를 설정 하지 않 았 습 니 다. 설정 하 세 요.',
  //   },
  //   recordPage: {
  //     name: '구 매 유저:',
  //     time: '마감 시간',
  //     number: '구 매 량',
  //   },
  // },

  // 导出私钥
  // Export: {
  //   title: '비밀 키 내 보 내기',
  //   password: '로그 인 비밀번호 입력',
  //   cancel: '취소 하 다.',
  //   comfirm: '확정 하 다.',
  // },
  Order: {
    nav: {
      one: '현재 의뢰',
      two: '역사적 의뢰',
      three: '거래 내 역',
    },
    table: {
      one: '거래 팀',
      two: '시간',
      three: '유형',
      four: '거래 량',
      five: '위탁 가격',
      six: '위탁 량',
      seven: '위탁 액수',
      eight: '상태',
      nine: '거래 가',
      ten: '',
    },
  },

  //提交工单
  Customer: {
    title: '작업 명세서를 제출하다.',
    title1: '표제.',
    placeholder1: '피드백 제목 써 주세요.',
    placeholder2:
      '당신 의 문 제 를 구체 적 으로 설명 하 세 요. 이것 은 우리 가 더욱 효과적으로 당신 을 돕 는 데 도움 이 됩 니 다!',
    placeholder3: '질문 을 설명해 주세요.',
    placeholder4: '이미지 크기는 5MB를 초과할 수 없습니다.',
    title2: '내용.',
    btn: '제출 하 다.',
    list: '작업 목록',
    label: {
      one: '처리 중',
      two: '이미 끝나다',
      three: '표제.',
      four: '내용.',
      five: '상태.',
      six: '회답 하 다.',
      seven: '시간.',
    },
  },

  //下载提示框
  // Alert: {
  //   preserve: '그림 저장',
  //   online: '정식 으로 온라인 하 다.',
  //   profit: '이윤 금액',
  //   price: '일반 창고 가격.',
  //   cycle: '주기.',
  //   target: '점호 하 다.',
  //   certain: '막대기.',
  // },

  Header: {
    navArr: {
      home: '홈 페이지',
      target: '목표 계약',
      cycle: '초 계약',
      certain: '계약',
      login: '로그인',
      register: '등록',
      language: '중국어 간체',
      account: '개인 센터',
      back: '로그인 끝내기',
      assets: '자산',
      financial: '재테크',
      announcement: '공고센터',
      ieo: '태환 하 다',
      exchange: '번개',
      order: '주문서',
      invite: '귀환을 청하다',
      help: '도움말 센터',
      currency: '화폐 거래',
      mining: '광석을 캐다',
      transfer: '트레이드',
    },
    out: {
      title: '로그인 종료 확인 여부',
      prompt: '제시',
      leftBtn: '취소',
      rightBtn: '확정',
      message: '로그인 취소',
    },
    login: '로그인',
    registered: '등록',
    alert: '잠시 열지 않음',
  },

  Last: '이전 페이지',
  Next: '다음 페이지',

  //首页
  Home: {
    headerTitle: "'Coinbase Lite' 가 전 세계 에 널리 퍼 지게 합 니 다.",
    headerPro: '쫓아가다 / 초월 하 다 / 앞서다',
    title: '블록체인 고유동성 계약 거래에 집중',
    proTitle:
      '최대 100배 레버리지, 주문 실행을 전격적으로 처리하고 U 기본 계약의 화폐를 풍부하게 지원하며 계약 기능이 완벽하여 디지털 거래를 더욱 간단하게 한다.',
    arr: {
      oneTitle: '금융급 안전',
      oneProTitle:
        '전방위적인 금융 바람 제어 시스템과 도난 방지 시스템, 냉열 지갑, 다중 서명 시스템은 자금 안전을 보장한다.',
      twoTitle: '극속 충전',
      twoProTitle:
        '충전 현금 인출을 3분 이내에 완료하고 24H 인건비 온라인 감사를 통해 고객이 최상의 투자 기회를 놓치지 않도록 보호',
      threeTitle: '글로벌 서비스',
      threeProTitle:
        '글로벌 비즈니스 서비스 네트워킹을 통해 전 세계 암호화된 자산에 투자하고 전 세계 사용자와 거래할 수 있습니다.',
      fourTitle: '자산을 엄선하다',
      fourProTitle:
        '우수한 품질의 암호화 프로젝트를 엄격히 선택하여 80%의 높은 위험 항목을 필터합니다.',
    },
    down: {
      title: '언제 어디서나 기 회 를 놓 치지 않 는 다',
      proTitle1: '실시 간 거래: 매입 판매, 레버 리 지',
      proTitle2: '충전: 충전, 현금 인출',
      proTitle3: '실시 간 알림: 시세 알림, 사건 알림',
      and: 'H5 웹 페이지',
      android: 'Android',
      ios: 'iPhone',
    },

    register: {
      proTitle: '핸드폰 / 메 일 을 아래 입력 창 에 입력 하여 등록 하 십시오',
      placeholder: '핸드폰 번호 / 메 일 을 입력 하 세 요',
      btn: '즉시 등록',
    },
    titleNav: {
      one: '화폐',
      two: '계약',
    },
    table: {
      search: '수색 하 다',
      optional: '스스로 선택 하 다',
      title: '시세',
      maincoin: '거래 팀',
      price: '최신 가',
      rise: '상승폭',
      height: '24h 최고',
      low: '24h 최저',
      volume: '24h 거래 량',
    },
  },

  //脚部
  Footer: {
    arr: {
      one: '공고 센터',
      three: '도움말 센터',
      five: '사용자 프로토콜',
      twelve: '프라이버시 정책',
      two: '우리',
      WhitePapers:'하얀 종이'
    },
    text: '리스크 제시: 디지털 화폐 거래 리스크가 비교적 크고 외부, 화폐 종류 등 요소의 영향을 받기 쉬우며 가격의 변동이 비교적 크기 때문에 우리는 당신이 감당할 수 있는 리스크 범위 내에서 디지털 화폐 거래에 참여하는 것을 강력히 권장합니다!투자에 위험이 있으니, 시장에 들어가는 것은 신중해야 한다.',
  },

  //登录注册
  Login: {
    forgerTitle: '비밀번호를 잊어버리다',
    registerTitle: '등록 계정',
    loginTitle: '사용자 로그인',
    account: '사용자 이름',
    email: '메일 박스',
    tel: '휴대폰',
    title1: '우리의',
    title2: '목표',
    proTitle: '"Coinbase Lite" 가 전 세계의 모든 국가에 보급되도록 하는 것입니다',
    label: {
      username: '계정',
      hash: '개인 전용 키',
      code: '인증 코드',
      password: '암호',
      tgm: '초대 코드',
      email: '메일박스 인증',
      phone: '핸드폰 인증',
      tradpassword: '암호 확인',
    },
    placeholder: {
      account: '6-12자리 숫자나 영문을 입력해 주세요',
      password: '비밀번호를 입력하십시오',
      passAgain: '비밀번호를 중복하여 로그인해주세요',
      code: '인증번호를 입력해주세요',
      username: '사서함/핸드폰 번호를 입력하다',
      mail: '편지함 입력',
      phone: '핸드폰 번호를 입력하다',
      hash: '개인 전용 키를 입력하십시오',
      tgm: '초대 번호를 입력하십시오(선택 사항).',
      tradpassword: '비밀번호 확인을 입력하십시오',
    },
    login: {
      loginPrompt: '계좌번호 없어요?가서',
      toRegistered: '등록',
      headerTitle: '로그인을 환영합니다',
      title: '비밀번호 로그인',
      navArr: {
        phone: '핸드폰 로그인',
        mail: '메일박스 로그인',
      },
      agreement: '사용자 이름 기억하기',
      btnTitle: '로그인',
    },
    register: {
      loginPrompt: '계좌번호 있으세요?가서',
      toRegistered: '로그인 반환',
      headerTitle: '등록을 환영합니다',
      agreement: '저는 이미 「 사용자 서비스 협의서 」를 읽고 이에 동의합니다',
      btnTitle: '지금 등록',
    },
    saveCode: '인증 코드 가져오기',
    forgetPas: '비밀번호를 잊어버리다',
    clearRecord: '기록 지우기',
    toLogin: '지금 로그인',
    toRegistered: '지금 등록',
    titleArr: {
      login: '로그인',
      register: '등록',
      next: '다음 단계',
      confirm: '확인',
    },
    navArr: {
      phone: '핸드폰 등록',
      mail: '메일박스 등록',
    },
    show: {
      password: '로그인 비밀번호는 8~20자리 사이이다',
      username: '핸드폰 번호나 이메일 주소를 기입해 주세요',
      code: '인증번호를 기입해주세요',
      mail: '합법적인 이메일 주소를 작성해주세요',
      slider: '확인을 위해 슬라이더를 드래그하십시오',
      different: '비밀번호가 일치하지 않습니다 확인해 주세요',
      agreement: '서비스 계약서를 체크하세요',
      tgm: '초대 코드를 기입해 주세요',
      tradpassword: '거래 비밀번호를 입력하십시오',
    },
    wrong: '검증 오류',
    showInfo: '합법적인 핸드폰 번호를 기입해 주세요',
    prompt: '서비스 계약서를 체크하세요',
  },

  //目标合约
  Target: {
    detailsTitle: '시세 목록',
    nav: {
      one: '상품을 거래하다',
      two: '최신 가격',
      three: '폭',
    },
    entrust: {
      now: '현재 보유하고 있는 포지션',
      history: '역사적 성사',
    },
    down: '살 떨 어진',
    up: '사 오',
    label: {
      one: '교역 화폐의 종류',
      two: '이용가능잔액',
      three: '거래 금액',
      four: '대상 포인트',
      five: '기대수익률:',
      six: '예상 한 보답:',
    },
    table: {
      title1: '방향',
      title2: '창고 평 가',
      title3: '이득 을 보다',
      title4: '시간.',
      order: '주문 번호',
      transfer: '거래 대상',
      direction: '방향.',
      coin: '자산 화폐종',
      openPrice: '창 고 를 여 는 가격.',
      total: '거래 총액',
      lever: '점호 하 다.',
      profit: '이윤 정지 가격.',
      loss: '손실 정지 가격.',
      newPrice: '최신 가',
      openTime: '창 고 를 여 는 시간.',
      endTime: '창고 가 없 는 시간.',
      type: '일반 창고 유형',
      rate: '이윤.',
      optional: '조작 하 다.',
    },
    alert: {
      min: '최소 입력 수량 은',
      max: '최대 입력 수량 은',
    },
    order: '이윤 주문',
  },

  //周期合约
  Cycle: {
    label: {
      cycle: '거래 주기',
      number: '거래 한도액',
    },
  },

  //杠杠合约
  Certain: {
    entrust: {
      one: '현재 보유하고 있는 포지션',
      two: '역사의 포지션',
      three: '현재 위탁',
      four: '역사적 위탁',
      five: '이윤을 멈추고 손실을 막다',
    },
    nav: {
      one: '가격제한거래',
      two: '시가 거래',
      three: '시장에서 가장 좋은 가격으로 매입하다.',
    },
    bond: '위탁보증금:',
    btn1: '보여',
    btn2: '보 빈',
    assets: 'USDT (나의계약자산트)',
    label: {
      one: '가용자금',
      two: '보증금을 점용하다',
      three: '보증금 동결',
      four: '캐피털 레이트',
      five: '표적 지수',
      six: '배율:',
      seven: '단가:',
      eight: '장수:',
      ten: '이윤 정지 가격',
      eleven: '파손 정지 가격',
      twelve: '격리',
      thirteen: '의 십자가',
    },
    table: {
      type: '유형',
      limit: '한정 가격',
      market: '시가',
      buy: '끓여',
      sell: '카 빈',
      trading: '교역쌍',
      sj: '창구 건설 시간',
      direction: '주문방향',
      times: '창고배수',
      seat: '창고 공간이 넓다.',
      unfilled: '미거래 (장)',
      has: '평평하게하다',
      average: '시작 가격',
      cwbond: '창고담보금',
      bond: '보증금',
      endPrice: '평가의 우위를 예측하다.',
      rise: '손익',
      profit: '손익분기점',
      loss: '디폴트 프라이스',
      interest: '창리',
      charge: '수수료',
      operation: '조작',
      back: '취소',
      price: '위탁 가격',
      close: '보유 물량을 균등하게 나누다.',
      lastProfit: '실질적 평판 가격',
      value: '창고가치',
      status: '상태',
      wtsj: '타임',
    },
    status: {
      unfilled: '거래가 이루어지지 않다',
      section: '부분 거래',
      all: '100% 거래',
      cancel: '취소됨',
      profit: '손익분기점 금지',
      close: '평창',
      bond: '보증금을 올리다',
    },
    alert: {
      profit: '적금 한도를 입력해 주십시오',
      loss: '정지금을 입력하십시오',
      close: '평창 수량을 입력해 주십시오',
      bond: '보증금의 양을 입력하십시오',
      min: '최소 입력 장수:',
      price: '가격을 입력하세요.',
      closeNum: `수평 수량은 {num}입니다.`,
    },
    open: '사용 가능한 용량:',
    charge: '수속비:',
    fix: '장',
    cancel: '취소',
    comfirm: '확정',
    marketNar: {
      titleLeft: 'PanKou',
      titleRight: '실시간 거래',
      price: '가격',
      num: '수량',
      total: '누계 수량',
      time: '시간',
    },
    profitLoss: {
      label1: '예상 수익',
      label2: '현재 가격',
      label3: '수량',
      label4: '수정',
      label5: '취소',
      label6: '손실 정지 가격은 창고 보유 가격보다 크면 안 된다.',
      label7: '이윤 정지 가격은 창고 보유 가격보다 작으면 안 된다.',
      label8: '이윤 정지 가격이 창고 보유 가격보다 크면 안 된다.',
      label9: '손실 정지 가격은 창고 보유 가격보다 작으면 안 된다.',
      label10: '모두',
      label11: '평다창',
      label12: '창고를 비우다',
    },
  },

  //资产账户
  Assets: {
    title1: '코인 어카운트',
    title2: '계약계정',
    assets: '총자산 환산',
    search: '검색',
    type: '유형',
    chain: '체인 이름',
    CustomerService: '고객센터로 연락주세요!',
    accountEarnings:'총 수입',
    todayEarnings:'오늘의 수입',
    nav: {
      one: '나의 자산',
      two: '자산 내역',
      three: '인출 주소 관리',
      four: '계약적 자산',
      five: '자산 내역',
      six: '보유 수량',
      seven: '창고보증금',
      eight: '이미 손익을 실현하다',
      nine: '위탁보증금',
      ten: '화폐 자산 환산',
      eleven: '계약 자산 환산',
    },
    chargeBox: {
      title: '충전할 주소:',
      record: '충전 기록 추적 상태 보기',
      id: '블록 체인 거래 id:',
      time: '지갑 거래 시간:',
      details: '자세 한 정보',
      label1:'4-64비트의 숫자와 문자를 입력하십시오.'
    },
    mentionBox: {
      number: '실지입금:',
      submit: '제출',
      tips: {
        one: '따뜻한 팁',
        two: '• 상기 주소 에 {coin} 자산 을 충전 하지 마 십시오 그렇지 않 으 면 자산 을 찾 을 수 없습니다',
        three:
          '•당신은 상술한 주소를 상쇄한 후, 전체 네트워크 노드의 확인을 필요로 하며, 이 과정에서 인내심을 가지고 기다려 주십시오',
        four: '•최소 현금 인출 금액: {min} {coin}',
        five: '• 자금 안전을 보장하기 위해 귀하의 계좌 안전 전략 변경, 비밀번호 수정, 저희는 가능한 한 사이트 공고 또는 우편으로 귀하께 통지할 것입니다.',
        six: '• 정보 가 왜곡 되 거나 유출 되 지 않도록 컴퓨터 및 브 라 우 저의 안전 을 반드시 확인 하 십시오',
        seven:
          '•최소 충전 금액: {min} {coin}, 최소 금액보다 적은 충전은 장부에 올리지 않고 돌려받을 수 없습니다.',
      },
    },
    text: '소액 자산 을 숨기다',
    table: {
      one: '화폐 명칭',
      two: '사용 가능 자산',
      three: '동결 자산',
      four: '누적 자산',
      five: '조작 하 다',
      six: '화폐 종류',
      seven: '코 인 주소',
      eight: '비고 하 다',
      nine: '입금 시간',
      ten: '화폐 종류',
      eleven: '유형',
      twelve: '충전 수량',
      thirteen: '수수료',
      fourteen: '시간',
    },
    state: {
      sending: '대기 중',
      completed: '완료 됨',
      dismissed: '기각 하 다',
    },
    record: {
      one: '동전 충전 기록',
      two: '동전 인출 기록',
      three: '이체 기록',
      four: '자금 거래 기록',
      five: '기타 기록',
    },
    recordTable: {
      one: '수량',
      two: '상태',
    },
    coin: '화폐 종류',
    charge: '예금',
    mention: '철수',
    transfer: '돌리다',
    deal: '거래 하 다',
    deleted: '삭제 하 다',
    add: '첨가 하 다',
    placeholder: '인출 주 소 를 입력 하 세 요',
    placeholder2: '설명 을 입력 하 세 요',
    placeholder3: '거래 비밀 번 호 를 입력 하 세 요',
    placeholder4: '코 인 수량 을 입력 하 세 요',
    chargeDialog: {
      title: '충전',
      address: '충전 주 소 는 아래 와 같 습 니 다',
      copy: '주소 복사',
      ercode: 'QR 코드 를 스 캔 해서 주 소 를 얻다',
      tips: '알림',
      success: '복사 성공',
    },
    transferDialog: {
      title: '계좌 이체',
      from: '부터',
      to: '도착 하 다',
      all: '전부',
      hasChange: '이체 가능 잔액:',
      alert1: '이체 금액 을 입력 하 세 요',
      alert2: '잔고 가 부족 하 다',
      alert3: '코 인 수량 을 입력 하 세 요',
      alert4: '인출 주 소 를 입력 하 세 요',
      min: '최소 인출 수량 은',
      max: '최대 코 인 수량 은',
      btn: '이체 확인',
    },
    mentionDialog: {
      balance: '사용 가능 한 잔액:',
      address: '주소 비고',
      number: '현금 인출 수량',
      password: '거래 비밀번호',
      fee: '수수료',
    },
    mentionAddress: {
      title: '코 인 주소 선택',
      no: '코 인 주소 없 음',
      btn: '코 인 추가 주소',
    },
    addAlert: '추가 성공',
    delAlert: '삭제 성공',
    cancel: '취소 하 다',
    comfirm: '확정 하 다',
  },

  //关于
  About: {
    bannerText: '우리 가 뭘 도와 줄 수 있 을 까?',
    search: '수색 하 다',
    placeholder: '무슨 문제 가 있 으 면 제 가 답 을 찾 아 드릴 게 요',
    title: '관련 정보',
    back: '돌아가다',
    result: '관련 컨텐트 검색',
    noBack: '적합한 결과를 찾지 못했습니다.',
    alert1: '키워드를 입력하십시오.',
    nav: {
      one: '중요 공지',
      two: '최신 활동',
      three: '사용자 주의사항',
      four: '화폐 거래',
      five: '계약 거래',
      six: '신 입 도움',
    },
  },

  message: {
    currency: {
      priceBtn: {
        fixPrice: '시가 의뢰',
        marketPrice: '가격 제한 위탁',
      },
      title: '화폐',
      newpriceText: '현재 가장 좋 은 가격 으로 거래 하 다',
      leftAssets: '총 자산 을 환산 하 다',
      allOrder: '모든 주문',
      currency: '화폐 거래',
      trading: '충전',
      placeholder: '충전 화폐 종 류 를 검색 하 다',
      hasUser: '잔액:',
      buyPrice: '매입 가격',
      buyNum: '매입 량',
      buyNow: '즉시 매입',
      turnover: '거래액:',
      sellPrice: '매출 가',
      sellNum: '매출 량',
      sellNow: '즉시 매출 하 다',
      entrust: {
        now: '현재 의뢰',
        history: '역사 기록',
        introduce: '화폐 종류 소개',
      },
      // introduceObj: {
      //   time: '발행 일자',
      //   total: '발행 총량',
      //   circulation: '유통 총량',
      //   link: '관련 링크',
      //   introduce: '간단 한 소개',
      //   webaddress: '홈 페이지',
      //   blockquery: '블록 조회',
      //   whitepaper: '백서',
      //   no: '이 화폐가치 의 정 보 는 아직 입력 되 지 않 았 으 니, 기대 해 주시 기 바 랍 니 다',
      // },
      form: {
        trading: '거래 팀',
        sj: '시간',
        price: '가격',
        quantity: '수량',
        total: '위탁 총액',
        operation: '조작 하 다',
        undo: '철회 하 다',
        category: '유형',
        buy: '매입 하 다',
        sell: '매출 하 다',
        wtprice: '위탁 가격',
        wtquantity: '위탁 수량',
        totalamount: '거래 총액',
        wtTotle: '위탁 총액',
        state: '상태',
        deal: '거래 가 이루어지다',
        hasUndo: '취소 됨',
        unfilled: '미 거래 량',
      },
      rightNav: {
        currency: '화폐 종류',
        price: '최신 가',
        vol: '거래 량',
        rise: '등락',
      },
      marketNar: {
        titleLeft: '조사 하 다',
        titleRight: '실시 간 거래',
        price: '가격',
        num: '수량',
        total: '누적 수량',
        time: '시간',
      },
      lastPage: '이전 페이지',
      nextPage: '다음 페이지',
      open: {
        title:
          '당신 은 아직 거래 비밀 번 호 를 설정 하지 않 았 습 니 다 인증 후 돈 충전 과 거래 를 할 수 있 습 니 다',
        prompt: '제시 하 다',
        leftBtn: '취소 하 다',
        rightBtn: '확정 하 다',
      },
      show: {
        price: '가격 을 기입 해 주세요',
        number: '수량 을 기입 하 세 요',
      },
    },
    noRecord: '기록 이 없다',
    noData: '데이터 없 음',
    k: {
      rose: '상승폭',
      high: '24H 최고 가격',
      row: '24H 최저 가',
      vol: '24H 거래 량',
      newPrice: '거래 가',
    },
    data: {
      time: '시간',
      open: '개장:',
      close: '파장:',
      low: '최저:',
      high: '최고:',
      volume: '거래 량:',
    },
    //公告
    // announcement: {
    //   title: '공고 하 다',
    //   proTitle: '공지 > 공지 사항',
    // },

    //tradingview:
    tradingview: {
      navArr: {
        one: 'K 라인',
        two: '심도 도',
      },
      rise: '실시 간 손익',
      downtime: '카운트다운',
      surplus: '이윤',
      deficit: '결손 을 보다',
    },
  },
  My: {
    credit: '신용 거래',
    cancel: '취소 하 다',
    comfirm: '확인 하 다',
    mine: '개인 중심',
    safe: '안전 등급:',
    high: '높다',
    center: '명중 하 다',
    low: '낮다',
    promite: '이메일 인증 오픈 권장 실명 인증 오픈',
    Personal: '계 정 보안',
    phone: '핸드폰',
    email: '메 일주 소',
    modifyPhone: '핸드폰 번호 를 고치다',
    modifyEmail: '메 일 박스 수정',
    phone_p: '귀속 하 다',
    Certification: '인증 하 다',
    Realname: '실명 인증',
    title2: '보안 암호 관리',
    title3: '기타',
    title4: '로그 인 비밀번호',
    title5: '거래 비밀번호',
    title6: '주소 관리',
    title7: '작업 명세서를 제출하다.',
    proTitle1:
      '로그 인, 코 인, 비밀번호 찾기, 비밀번호 변경, AP 관리 시 보안 검증',
    proTitle2: '로그 인 시 계 정 보안',
    proTitle3: '자금 거래 안전 보호 에 사용',
    proTitle4: '코 인 을 인출 할 때 빠 르 고 정확하게 선택 할 수 있 습 니 다',
    proTitle5: '질문 피드백 을 제출 하 다',
    proTitle6: '플랫폼 공제 권 은 화폐 종 류 를 구 매 할 때 만 사용 된다',
    proTitle7: '',
    set: '설치',
    see: '살펴보다',
    hasSet: '설정 됨',
    modify: '고치다',
    add: '첨가 하 다',
    del: '삭제 하 다',
    operation: '조작 하 다',

    save: '인증번호 가 져 오기',
    phoneSave: '휴대폰 인증',
    emailSave: '메 일주 소 인증',
    placeholder: {
      phone: '핸드폰 번 호 를 입력 하 세 요',
      code: '인증번호를 입력하십시오.',
      oldPass: '오래된 비밀 번 호 를 입력 하 세 요',
      newPass: '새 암 호 를 입력 하 세 요',
      passAgin: '새로운 비밀 을 확인 하 다',
      email: '메 일 박스 를 입력 하 세 요',
    },
    dialogTitle: {
      one: '핸드폰 바 인 딩',
      two: '로그 인 비밀번호 변경',
      three: '계좌 이체',
      four: '코 인 주소 선택',
      five: '코 인 추가 주소',
      six: '바 인 딩 메 일 박스',
      seven: '실명 인증',
      eight: '거래 비밀번호 변경',
      nine: '코 인 추가 주소',
      ten: '코 인 주소 선택',
      eleven: '거래 암호 설정',
    },
    realname: {
      success: '실명 인증 성공!',
      review: '실명 인증 심사 중!',
    },
  },

  mine: {
    verified: '인증 됨',
    certified: '인증 되 지 않 음',

    copy: '복사 성공',
  },

  Verified: {
    Name: '성명',
    NameIpn: '증인 의 성명 을 입력 하 세 요',
    type: '증명서 유형',
    typeIpn: '신분증',
    typeHz: '여권',
    onload: '사진 올리기',
    id: '여권번호',
    idIpn: '증명 번 호 를 입력 하 세 요',

    zm: '전면 샷(필수)',
    fm: '뒷모습(필수)',
    sc: '핸드 사진',
    pic: '사진 업로드',
  },
  iphone: {
    phone: '핸드폰 번호',
  },

  Coin: {
    bh: '기각 하 다',
    sh: '심사 중 입 니 다',
  },

  alert: {
    password: '두 번 의 비밀번호 가 일치 하지 않 습 니 다',
    password1: '6 자리 순 숫자 를 입력 하 세 요',
    password3: '비밀 번 호 는 비어 있 으 면 안 됩 니 다',
    code: '인증번호 가 비어 있 으 면 안 됩 니 다',
    realname: '성명 이 공백 일 수 없습니다',
    idCard: '주민등록번호 가 비어 있 으 면 안 됩 니 다',

    address: '주소 입력 이 비어 있 으 면 안 됩 니 다',
    notes: '탭 입력 이 비어 있 으 면 안 됩 니 다',

    zm: '증명 서 를 올 리 고 반대편 을 찍다',
    min: `최소 거래 수량은 {num}입니다.`,
    max: `최대 거래 수량은 {num}입니다.`,
  },
  AboutUs: {
    pro1: '다기능과 민주적인 암호화폐 거래소.시장의 첫 번째로서, 우리는 사용자를 활성화시키기 위해 경제적 이익을 제공한다.Coinbase Lite는 전체 프로젝트로서 여러 업무 계층에서 암호화폐 솔루션을 구현하여 사용자들이 쉽게 사용할 수 있도록 하는 것을 의미합니다.',
    title: 'Dell의 비전',
    pro2: '우리는 머지않아 블록체인 기술의 광범위한 응용과 암호화폐의 장점을 확신한다.전 세계 솔루션을 도입함으로써 기술 혁신뿐만 아니라 교육으로 인해 암호화된 세계 생태계가 모든 사람에게 더욱 우호적이다',
  },
  ...koLocal,
};
export default ko;
