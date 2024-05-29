import enLocale from 'element-ui/lib/locale/lang/en';
//英语
const en = {
  Mining: {
    assets: 'Escrow funds',
    income: 'Expected earnings today',
    incomeAll: 'Cumulative income',
    order: 'Escrow order',
    record: 'Position',
    list: {
      minNumber: 'Single amount',
      rate: 'Daily return',
      cycle: 'Cycle',
      btn: 'Subscribe',
      recentRate: 'Recent (daily income)',
      quota: 'Single limit USDT',
      backTime: 'Dividend payment time',
      advance: 'Called away',
      buyNumber: 'Amount',
      all: 'All',
      available: 'Available:',
      day: `{num}Day`,
      everyday: 'Everyday',
      onTimeBack: 'Expiration return',
      password: 'Password',
    },
    table: {
      name: 'Name',
      number: 'Pledge Amount',
      income: 'Income',
      startTime: 'Subscription Time',
      endTime: 'Expiration Time',
      state: 'State',
      operation: 'Operation',
    },
    state: {
      enable: 'In operation',
      success: 'Complete',
      close: 'Redeemed',
    },
    alert: {
      max: `The maximum transaction amount is {num}`,
      min: `The minimum transaction amount is {num}`,
    },
  },
  // Exchange: {
  //   alert: {
  //     min: 'The minimum purchase quantity is',
  //     max: 'The maximum purchase quantity is',
  //     balance: 'The balance is insufficient, please confirm',
  //   },
  //   btn: 'confirm payment',
  //   password: 'Fund Password',
  //   record: 'Records',
  //   placeholder1: 'The minimum exchange amount is',
  //   placeholder2: 'The maximum exchange amount is',
  //   placeholder3: 'Please enter the transaction password',
  //   label: {
  //     one: 'Currency',
  //     two: 'Number',
  //     three: 'Rate',
  //     four: 'Exchange',
  //     five: 'Get the amount',
  //     six: 'Submit',
  //     seven: 'Get currency',
  //   },
  //   label1: 'Currency',
  //   label2: 'Exchange quantity',
  //   label3: 'Get exchange value',
  //   label4: 'Time',
  // },
  // IEO: {
  //   record: 'IEO record ',
  //   price: 'Price: ',
  //   total: 'Remaining total',
  //   startDate: 'start time ',
  //   endDate: 'end time ',
  //   state: 'Status',
  //   btn: 'immediate exchange ',
  //   close: "It's over",
  //   noopen: 'not open ',
  //   cylce: 'Lock cycle',
  //   cycleDay: `{day}Day`,
  //   dialog: {
  //     title: 'buy {coin}',
  //     label1: 'Payment currency ',
  //     label2: 'number of Tokens bought ',
  //     label3: 'Expected payment ',
  //     label4: 'complimentary ',
  //     label5: 'Total issuance',
  //     label6: 'Balance',
  //     label7: 'All',
  //     confirm: 'Please confirm the order now',
  //     cancel: 'cancel ',
  //     placeholder1: 'Select payment currency ',
  //     placeholder2: 'mydb',
  //   },
  //   recordPrice: `Payment currency {number}{coin}`,
  // },
  realNameOpen: {
    title: 'You have not passed the KYC, please go to the authentication first',
  },
  Order: {
    nav: {
      one: 'Open Orders',
      two: 'Order History',
      three: 'Transaction History',
    },
    table: {
      one: 'Token',
      two: 'Time',
      three: 'Type',
      four: 'Turnover',
      five: 'Price',
      six: 'Number',
      seven: 'Amount',
      eight: 'Status',
      nine: 'Final price',
      ten: '',
    },
  },

  invite: {
    headerTitle: 'Invite friends and have fun together',
    downText: 'Invite friends to download "Coinbase Lite" together',
    myInvite: 'My invitation',
    rule: 'Invitation rules',
    header: 'Invited  Record',
    centerTitle: 'Purchase records',
    title: 'Invite friends',
    label1: 'Invite link:',
    label2: 'Invite code:',
    label4: 'Number of direct promotion:',
    btn1: 'Invitation',
    teamRecord: 'Split ownership record',
    btn2: 'copy',
    hasInvite: 'Has invited',
    form: {
      account: 'Account',
      time: 'Time',
      number: 'Number',
      financial: 'Financial management quantity',
      from: 'Source',
    },
    rules: {
      one: '1. After the friend accepts the invitation, every real transaction fee generated in the trading area will generate the corresponding percentage of commission rebate in the trading area.',
      two: "2. The form of commission rebate: if the user trades in the corresponding trading area, 50% of the transaction fee will be refunded to the recommender's trading account according to the proportion of - level 30% and secondary level 20%.",
      three:
        "3. Statistics on the day of friends' transaction rebate; Commission rebate amount (corresponding trading area) = actual transaction volume ★ commission ratio * commission rebate ratio.",
      four: "4. The effective time of the invitee to enjoy the Commission refund of friend transaction is calculated from the time of the invitee's actual registration. After the effective time (365 days), you will not enjoy the Commission refund of the invitee's transaction.",
      five: '5. If the handling charge is fully withdrawn, the Commission will not be refunded.',
      six: '*In case of any adjustment of the activity, the platform update shall prevail, and the final interpretation right belongs to Coinbase Lite.',
    },
    title1: 'Invite friends',
    title2: 'Download registration',
    title3: 'Receive reward',
    pro1: 'Copy invitation link and send it to friends',
    pro2: 'Friends download, complete registration',
    pro3: 'Successfully invited friends to get commission rewards',
    label3: 'Number of people invited',
  },
  Last: 'Last',
  Next: 'Next',
  Header: {
    navArr: {
      home: 'Home',
      target: 'Target',
      cycle: 'Sec Contract',
      currency: 'Currency',
      certain: 'Contract',
      login: 'Login',
      register: 'Register',
      language: '简体中文',
      account: 'Account',
      back: 'Log out',
      assets: 'Assets',
      financial: 'Financial',
      announcement: 'Notice',
      ieo: 'IEO',
      invite: 'Invite',
      order: 'Orders',
      download: 'Downoad',
      help: 'HelpCenter',
      exchange: 'Exchange',
      fiat: 'Fiat',
      mining: 'Mining',
      transfer: 'Trade',
    },
    out: {
      title: 'Are you sure you want to log out',
      prompt: 'Tips',
      leftBtn: 'cancel',
      rightBtn: 'determine',
      message: 'Logout cancelled',
    },
    login: 'Login',
    registered: 'Register',
    alert: 'Not yet open',
  },

  // 导出私钥
  Export: {
    title: 'Export private key',
    password: 'Enter login password',
    cancel: 'canel',
    comfirm: 'determine',
  },

  //提交工单
  Customer: {
    title: 'Submit work order',
    title1: 'Title',
    placeholder1: 'Please fill in the feedback title',
    placeholder2:
      'Please describe your problem in detail, which will help us to help you more effectively!',
    placeholder3: 'Please describe your problem',
    placeholder4: 'The image size cannot exceed 5MB',
    title2: 'Content',
    btn: 'Submit',
    list: 'Work order list',
    label: {
      one: 'In process',
      two: "It's over",
      three: 'Title',
      four: 'Content',
      five: 'Status',
      six: 'Reply',
      seven: 'Time',
    },
  },

  // Financial: {
  //   text: 'Stable income of quantitative trading',
  //   record: 'Financial records',
  //   charge: 'Deposit',
  //   transaction: 'trading',
  //   profit: 'The yield',
  //   way: 'The redemption way',
  //   number: 'Minimum initial investment amount',
  //   date: 'Financial cycle',
  //   btn: 'immediately',
  //   order: 'The order number',
  //   details: 'Check the details',
  //   buy: 'Input the number',
  //   state: 'state',
  //   type1: 'Financial management',
  //   type2: 'Completed',
  //   profitRecord: 'Earnings record',
  //   recordTitle: 'DeFi earnings',
  //   name: 'Source',
  //   time: 'Time',
  //   num: 'Number',
  //   orderID: 'Order ID',
  //   total: 'Total revenue',
  //   alert: {
  //     title: 'buy DeFi',
  //     number: 'Purchase quantity',
  //     balance: 'Available balance of account:',
  //     password: 'Trade password',
  //     all: 'all',
  //     btn: 'Confirm the input',
  //     placeholder1: 'Please enter the input quantity',
  //     placeholder2: 'Please enter your transaction password',
  //     min: 'Minimum withdrawal amount is',
  //     noBalance: 'Lack of balance',
  //     noPassword: 'The transaction password has not been set. Go to set it',
  //   },
  //   recordPage: {
  //     name: 'Purchase users:',
  //     time: 'deadline',
  //     number: 'Purchase volume',
  //   },
  // },

  //下载提示框

  Alert: {
    preserve: 'Save',
    online: 'GO Live',
    profit: 'Profit amount',
    price: 'close Price',
    cycle: 'cycle',
    target: 'Points',
    certain: 'Lever',
  },

  //董事分红
  // Dividend: {
  //   title: 'Accumulated dividends',
  //   table: {
  //     time: 'Time',
  //     fee: 'Charge',
  //     from: 'Source',
  //     number: 'Amount',
  //   },
  // },

  //首页
  Home: {
    headerTitle: 'Let "Coinbase Lite" spread all over the world',
    headerPro: 'Catch up / surpass / lead',
    title: 'Focus on blockchain trading of highly liquid contracts',
    proTitle:
      'Up to 100 times leverage, lightning processing order execution, supporting u-standard, rich contract currencies and perfect contract functions, making digital trading easier',
    arr: {
      oneTitle: 'Financial Grade Security',
      oneProTitle:
        'Comprehensive financial risk control system and anti-theft system, hot and cold wallet and multi signature system ensure the safety of funds',
      twoTitle: 'Fast deposit and withdraw',
      twoProTitle:
        'Deposits and withdrawals can be completed in 3 minutes, with 24H manual display review to protect customers from missing the best investment opportunities',
      threeTitle: 'Global services',
      threeProTitle:
        'Global business service network coverage helps you invest in global encrypted assets and trade with global users',
      fourTitle: 'Strictly Selected Assets',
      fourProTitle:
        'Strictly select high-quality encryption projects to filter 80% of high-risk projects for you',
    },
    down: {
      title: "Don't miss any opportunity anytime, anywhere",
      proTitle1: 'Live Trading: Buy and Sell, Leverage',
      proTitle2: 'Deposit and Withdrawal at any time',
      proTitle3: 'Live Alerts, Market Alerts, Event Alerts',
      and: 'H5 web page',
      android: 'Android',
      ios: 'iPhone',
    },
    register: {
      title: 'Join scex and start your contract journey',
      proTitle:
        'To join scex and start your contract journey, please enter your mobile phone / email in the input box below to register for scex',
      placeholder: 'Enter your email or mobile phone',
      btn: 'Register',
    },
    titleNav: {
      one: 'Currency',
      two: 'Contract',
    },
    table: {
      search: 'search',
      title: 'Quotation',
      optional: 'Optional',
      maincoin: 'Contract name',
      price: 'Latest price',
      rise: 'Up',
      height: '24h highest',
      low: '24h lowest',
      volume: 'volume',
    },
  },

  //脚部
  Footer: {
    arr: {
      one: 'Announcement Center',
      three: 'Help center',
      five: 'User agreement',
      twelve: 'Privacy policy',
      two: 'About us',
      WhitePapers:'White Papers'
    },
    text: 'Risk tip: as the digital currency transaction is risky, vulnerable to external, currency and other factors, and the price fluctuates greatly, we strongly recommend you to participate in the digital currency transaction within your own risk range! Investment is risky, so we should be cautious when entering the market.',
  },

  //登录注册
  Login: {
    forgerTitle: 'Forget',
    registerTitle: 'Registered',
    loginTitle: 'Login',
    account: 'user name',
    email: 'Email',
    title1: 'Ours',
    title2: 'Target',
    tel: 'Phone',
    proTitle: 'Let "Coinbase Lite" spread all over the world',
    label: {
      username: 'account',
      hash: 'Private',
      code: 'Code',
      password: 'Password',
      tgm: 'Referral Code',
      email: 'Email verification',
      phone: 'Phone verification',
      tradpassword: 'Confirm login password',
    },
    placeholder: {
      account: 'Please enter 6-12 digits or English letters',
      password: 'Please input a password',
      passAgain: 'Please repeat the login password',
      code: 'Please enter the verification code',
      username: 'Enter email / phone',
      mail: 'Input email',
      phone: 'Enter mobile phone number',
      hash: 'Please enter the private key',
      tgm: 'Please fill in the invitation code (optional)',
      tradpassword: 'Please enter the transaction password',
    },
    login: {
      loginPrompt: 'No account? go',
      toRegistered: 'Register',
      headerTitle: 'Welcome to login',
      title: 'Password login',
      navArr: {
        phone: 'Mobile',
        mail: 'Email',
      },
      agreement: 'Remember the user name',
      btnTitle: 'Login',
    },
    register: {
      loginPrompt: 'Do you have an account? go',
      toRegistered: 'Back to login',
      headerTitle: 'Welcome to register',
      agreement: 'I have read and agree to the user service agreement',
      btnTitle: 'Register now',
    },
    saveCode: 'Get verification code',
    forgetPas: 'Forget the password ',
    clearRecord: 'Clear record',
    toLogin: 'Sign in now',

    toRegistered: 'Register now',
    titleArr: {
      login: 'Login',
      register: 'Register',
      next: 'Next',
      confirm: 'confirm',
    },
    navArr: {
      phone: 'Mobile registration',
      mail: 'Email registration',
      hash: 'Private key registration',
    },
    show: {
      password: 'The login password is 8 to 20 digits long',
      username: 'Please fill in your mobile phone number or email address',
      code: 'Please fill in the verification code',
      mail: 'Please fill in the legal email',
      different: 'Password inconsistent, please confirm',
      agreement: 'Please check the service agreement',
      tgm: 'Please fill in the invitation code',
      tradpassword: 'Please enter the transaction password',
    },
    wrong: 'Error in verification',
    showInfo: 'Please fill in the legal mobile phone number',
    prompt: 'Please check the service agreement',
  },

  //目标合约
  Target: {
    detailsTitle: 'Quotation list',
    nav: {
      one: 'Trading products',
      two: 'Price',
      three: 'float',
    },
    entrust: {
      now: 'Thecurrentposition',
      history: 'Done',
    },
    down: 'SELL',
    up: 'BUY',
    label: {
      one: 'Deal Coin',
      two: 'Balance',
      three: 'Deal Amount',
      four: 'Target Points',
      five: 'Profit:',
      six: 'Money:',
    },
    table: {
      title1: 'Direction',
      title2: 'Price',
      title3: 'Profit',
      title4: 'Time',
      order: 'Order Number',
      transfer: 'Transaction object',
      direction: 'Direction',
      coin: 'Currency',
      openPrice: 'Warehouseprice',
      total: 'Deal Total',
      lever: 'point',
      profit: 'Checkfullprice',
      loss: 'Stoplossprice',
      newPrice: 'Lastest',
      openTime: 'Open Time',
      endTime: 'Close Time',
      type: 'Opens Type',
      rate: 'Profit',
      optional: 'Action',
    },
    alert: {
      min: 'The minimum number of inputs is',
      max: 'The maximum number of inputs is',
    },
    order: 'Order',
  },

  //周期合约
  Cycle: {
    label: {
      cycle: 'cycle',
      number: 'Trading limit',
    },
  },

  //杠杠合约
  Certain: {
    tableCoin: 'Current transaction type',
    entrust: {
      one: 'Thecurrent position',
      two: 'Historical position',
      three: 'Delegate',
      four: 'Historical Commission',
      five: 'Stop P/L',
    },
    nav: {
      one: 'Limit',
      two: 'Market',
      three: 'Optimum Buy',
    },
    bond: 'Entrusted deposit:',
    btn1: 'Open Long(Buy)',
    btn2: 'Open Short(Sell)',
    assets: 'MyAsset（USDT)',
    label: {
      one: 'Available',
      two: 'Deposimargin',
      three: 'Frozenmargin',
      four: 'Capital rate',
      five: 'Target index',
      six: 'Times:',
      seven: 'Price:',
      eight: 'Share:',
      ten: 'Stop profit price',
      eleven: 'Stop loss price',
      twelve: 'Isolate',
      thirteen: 'Cross',
    },
    table: {
      type: 'Type',
      limit: 'Limit',
      market: 'Market',
      buy: 'Open Long',
      sell: 'Open Short',
      trading: 'Trading',
      sj: 'Date',
      direction: 'Direction',
      times: 'Lever',
      seat: 'Apace(Share)',
      unfilled: 'Unfilled(Share)',
      has: 'Avail(Share)',
      average: 'Open Price',
      cwbond: 'Margin',
      bond: 'Margin',
      endPrice: 'Liquidation Price',
      rise: 'P/L',
      profit: 'stop profit',
      loss: 'Stop loss',
      interest: 'Interest',
      charge: 'Service fee',
      operation: 'Operation',
      back: 'revoke',
      price: 'Commission price',
      close: 'Closing quantity',
      lastProfit: 'close price',
      value: 'Position value',
      status: 'Status',
      wtsj: 'Time',
    },
    status: {
      unfilled: 'Unsettled',
      section: 'Partial transaction',
      all: 'All closed',
      cancel: 'rescinded',
      profit: 'Stop P/L',
      close: 'close a position',
      bond: 'Increase margin',
      oneClose: 'Close all',
      closeNum: 'Keping',
    },
    alert: {
      profit: 'Please input stop price',
      loss: 'Please enter stop loss price',
      close: 'Please enter the closing quantity',
      bond: 'Please input the amount of deposit',
      min: 'The minimum number of input sheets is',
      price: 'Please enter price',
      closeNum: `The levelable quantity is {num}`,
    },
    marketNar: {
      titleLeft: 'Handicap',
      titleRight: 'Real time transaction',
      price: 'Price',
      num: 'Number',
      total: 'Quantity',
      time: 'Time',
    },
    open: 'Available：',
    charge: 'Service fee:',
    fix: 'Share',
    cancel: 'cancel',
    comfirm: 'confirm',
    profitLoss: {
      label1: 'Estimated income',
      label2: 'Current price',
      label3: 'Number',
      label4: 'Modify',
      label5: 'Revoke',
      label6:
        'The stop loss price shall not be greater than the position price',
      label7: 'The profit stop price shall not be less than the position price',
      label8:
        'The profit stop price shall not be greater than the position price',
      label9: 'The stop loss price shall not be less than the position price',
      label10: 'Flat all',
      label11: 'Pingduocang',
      label12: 'Open position',
    },
  },

  //资产账户
  Assets: {
    title1: 'Currency Account',
    title2: 'Contracts Account',
    assets: 'Total asset',
    search: 'search',
    type: 'Type',
    chain: 'Chain name',
    CustomerService: 'Contact Customer Service!',
    accountEarnings:'Total profit',
    todayEarnings:'Today\'s profit',
    nav: {
      one: 'PMy assets',
      two: 'Account details',
      three: 'withdrawal address',
      four: 'Contract Assets',
      five: 'Account details',
      six: 'Balance',
      seven: 'Margin',
      eight: 'realized P/L',
      nine: 'Frozen Margin',
      ten: 'Currency asset conversion',
      eleven: 'Est. Value – Futures',
    },
    chargeBox: {
      title: 'Deposit address:',
      record: 'View status',
      id: 'Blockchain transaction ID:',
      time: 'Wallet transaction time:',
      details: 'Details',
      label1:'Please enter 4-64 digit numbers and letters'
    },
    mentionBox: {
      number: 'Actual arrival:',
      submit: 'Submit',
      tips: {
        one: 'reminder',
        two: '{coin} address only accepts {coin} deposit. Any other assets deposited to {coin} address will be irretrievable.',
        three: '•Deposit to  address requires 1 confirmation',
        four: '•Minimum withdrawal amount: {min} {coin}',
        five: '•In order to ensure the security of funds, we will try our best to notify you through website announcement or email when your account security policy changes or password changes.',
        six: '•Please make sure the computer and browser are safe to prevent information from being tampered or leaked.',
        seven:
          'Minimum recharge amount: {min} {coin}. Recharge less than the minimum amount will not be posted and cannot be returned.',
      },
    },
    text: 'Hiding Small Assets',
    table: {
      one: 'Coin',
      two: 'Available',
      three: 'Frozen Balance',
      four: 'Equivalent(USD)',
      five: 'Action',
      six: 'Coin',
      seven: 'Address',
      eight: 'Remark',
      nine: 'payment date',
      ten: 'Token',
      eleven: 'Type',
      twelve: 'Recharge quantity',
      thirteen: 'Service fee',
      fourteen: 'Time',
    },
    state: {
      sending: 'sending',
      completed: 'completed',
      dismissed: 'dismissed',
    },
    record: {
      one: 'Deposit History',
      two: 'Withdraw History',
      three: 'Transcription Record',
      four: 'Capital transactions',
      five: 'Other History',
    },
    recordTable: {
      one: 'Number',
      two: 'Status',
    },
    coin: 'Token',
    charge: 'Deposit',
    mention: 'Withdraw',
    transfer: 'Transfer',
    deleted: 'delete',
    add: 'add',
    deal: 'Deal',
    placeholder: 'Please enter the withdrawal address',
    placeholder2: 'Please enter your comments',
    placeholder3: 'Please enter the transaction password',
    placeholder4: 'Please input the withdrawal Amount',
    chargeDialog: {
      title: 'Recharge',
      address: 'The recharge address is as follows',
      copy: 'Copy address',
      ercode: 'Scan QR code to get address',
      tips: 'reminder',
      success: 'Copy succeeded',
    },
    transferDialog: {
      title: 'Account transfer',
      from: 'From',
      to: 'To',
      all: 'All',
      hasChange: 'Transferable balance:',
      alert1: 'Please input transfer amount',
      alert2: 'Insufficient balance',
      alert3: 'Please input the withdrawal quantity',
      alert4: 'Please enter the withdrawal address',
      min: 'The minimum withdrawal quantity is',
      max: 'The maximum withdrawal quantity is',
      btn: 'Confirm transfer',
    },
    mentionAddress: {
      title: 'Select withdrawal address',
      no: 'No withdrawal address',
      btn: 'Add withdrawal address',
    },
    mentionDialog: {
      balance: 'Available balance:',
      address: 'Address remarks',
      number: 'Withdrawal Amount',
      password: 'Transaction Password',
      fee: 'Service fee',
    },
    addAlert: 'Added successfully',
    delAlert: 'Successfully deleted',
    cancel: 'cancel',
    comfirm: 'determine',
  },
  // Fiat: {
  //   coin: 'Select currency',
  //   payCoin: 'payment currency',
  //   number: 'Purchase quantity',
  //   alert1: `The minimum number of transactions is {num}`,
  //   alert2: `The maximum number of transactions is {num}`,
  //   label1: 'Token',
  //   label2: 'Purchase quantity',
  //   label3: 'Total payment',
  //   label4: 'Status',
  //   label5: 'Time',
  //   label6: 'Estimated:',
  //   state1: 'To be paid',
  //   state2: 'Completed',
  //   state3: 'Cancelled',
  // },

  //关于
  About: {
    bannerText: 'How can we help?',
    search: 'Search',
    placeholder: "If you have any questions, I'll help you find out",
    title: 'Related information',
    back: 'back',
    result: 'Search for related content',
    noBack: 'No suitable results were found',
    alert1: 'Please enter keyword',
    nav: {
      one: 'Important announcement',
      two: 'Latest events',
      three: 'Notice to users',
      four: 'Currency transaction',
      five: 'Contract transaction',
      six: 'Novice help',
    },
  },
  message: {
    currency: {
      title: 'Currency',
      lastPage: 'Last',
      nextPage: 'Next',
      priceBtn: {
        fixPrice: 'Market price',
        marketPrice: 'Limit order',
      },
      newpriceText: 'Trading at the current best price',
      leftAssets: 'Total assets converted',
      allOrder: 'All orders',
      currency: 'Currency trading',
      trading: 'Recharge',
      placeholder: 'Search transaction currency',
      hasUser: 'Available:',
      buyPrice: 'Buy price',
      buyNum: 'Buy quantity',
      buyNow: 'Buy immediately',
      turnover: 'Turnover:',
      sellPrice: 'Sell price',
      sellNum: 'Sell quantity',
      sellNow: 'Sell immediately',
      entrust: {
        now: 'Current commission',
        history: 'All records',
        introduce: 'Introduction of the currency',
      },
      // introduceObj: {
      //   time: 'Release time',
      //   total: 'Total circulation',
      //   circulation: 'Total circulation',
      //   link: 'link',
      //   introduce: 'Introduction',
      //   webaddress: 'website',
      //   blockquery: 'Block the query',
      //   whitepaper: 'The white paper ',
      //   no: 'This currency information has not been input, please look forward to it',
      // },
      form: {
        trading: 'Transaction pair',
        sj: 'Time',
        price: 'Price',
        quantity: 'Number',
        total: 'Total entrusted',
        operation: 'Operation',
        undo: 'Revoke',
        category: 'Type',
        buy: 'In',
        sell: 'Sell',
        wtprice: 'entrust price',
        wtquantity: 'entrust quantity',
        totalamount: 'Total turnover',
        wtTotle: 'entrust total',
        state: 'status',
        deal: 'Deal done',
        hasUndo: 'undone',
        unfilled: 'unfilled',
      },
      rightNav: {
        currency: 'currency',
        price: 'Newest price',
        vol: 'Deal volume',
        rise: 'movements',
      },
      marketNar: {
        titleLeft: 'Handicap',
        titleRight: 'Real time transaction',
        price: 'Price',
        num: 'Number',
        total: 'Quantity',
        time: 'Time',
      },
      open: {
        title:
          'Not set transaction password yet, charging and transaction will be allowed after verified',
        prompt: 'Prompt',
        leftBtn: 'cancel',
        rightBtn: 'Confirm',
      },
      show: {
        price: 'Please enter price',
        number: 'Please enter number',
      },
    },
    noRecord: 'No record',
    noData: 'No data',
    couponDate: 'Date of use:',
    couponState: {
      one: 'not used',
      two: 'Expired',
      three: 'Used',
    },
    k: {
      rose: 'Growth',
      high: 'High',
      row: 'Low',
      vol: 'Quantity',
      newPrice: 'Final Price',
    },
    data: {
      time: 'Time',
      open: 'Opening:',
      close: 'Closed:',
      low: 'Low:',
      high: 'High:',
      volume: 'Quantity:',
    },
    // payWay: {
    //   zfb: 'Alipay',
    //   wx: 'WeChat',
    //   bank: 'Bank',
    // },

    //公告
    // announcement: {
    //   title: 'Announcement',
    //   proTitle: 'Announcement > announcement details',
    //   end: 'xingyulian Team',
    // },

    //tradingview:
    tradingview: {
      navArr: {
        one: 'K line',
        two: 'Depth map',
      },
      rise: 'profit and loss',
      downtime: 'Count down',
      surplus: 'surplus',
      deficit: 'deficit',
    },
  },
  My: {
    credit: 'credit',
    cancel: 'cancel',
    comfirm: 'comfirm',
    mine: 'Personal Center',
    safe: 'Safety level:',
    high: 'High',
    center: 'Medium',
    low: 'Low',
    promite: 'It is recommended to open email verification and KYC',
    Personal: 'Account security',
    phone: 'mobile phone',
    email: 'Email',
    modifyPhone: 'Modify',
    modifyEmail: 'Modify',
    phone_p: 'LINK',
    Certification: 'authentication',
    Realname: 'KYC',
    title2: 'Secure password management',
    title3: 'other',
    title4: 'Login password',
    title5: 'Fund Password',
    title6: 'Address management',
    title7: 'Submit work order',
    proTitle1:
      'It is used to login, withdraw money, retrieve password, modify password and conduct security verification when managing AP',
    proTitle2: 'It is used to login and protect account security',
    proTitle3: 'It is used to protect the security of capital transaction',
    proTitle4: 'It can be used to pick up coins quickly and accurately',
    proTitle5: "Is there anything I don't know that I can help you here",
    proTitle6: 'Platform coupon is only used for currency purchase',
    proTitle7: '',
    set: 'set',
    see: 'see',
    hasSet: 'has set',
    modify: 'Change',
    add: 'add',
    del: 'delete',
    operation: 'operation',

    save: 'save',

    phoneSave: 'Phone',
    emailSave: 'Email',
    placeholder: {
      phone: 'Please input mobile phone number',
      code: 'Please enter the verification code',
      oldPass: 'Please enter the old password',
      newPass: 'Please enter a new password',
      passAgin: 'Confirm new secrets',
      email: 'Please input email',
    },
    dialogTitle: {
      one: 'Replace the bound mobile phone',
      two: 'Change login password',
      three: 'Account transfer',
      four: 'Select withdrawal address',
      five: 'Add withdrawal address',
      six: 'Change binding mailbox',
      seven: 'KYC',
      eight: 'Change transaction password',
      nine: 'Add withdrawal address',
      ten: 'Select withdrawal address',
      eleven: 'Set transaction password',
    },
    realname: {
      success: 'KYC has been successful!',
      review: 'KYC in the audit!',
    },
  },
  mine: {
    verified: 'verified',
    certified: 'certified',

    copy: 'Successful copy',
  },

  Verified: {
    Name: 'Name',
    NameIpn: 'Please enter the name of the holder',
    type: 'Type',
    typeIpn: 'ID card',
    id: 'ID number',
    idIpn: 'Please enter the ID number',

    typeHz: 'Passport',
    onload: 'Upload',
    zm: 'Front(required)',
    fm: 'Back side(required)',
    sc: 'Handheld',
    pic: 'Upload picture',
  },

  iphone: {
    phone: 'Phone number',
  },

  Coin: {
    bh: 'Reject',
    sh: 'Review',
  },

  alert: {
    password: 'Two passwords are inconsistent',
    password1: 'Please enter 6 digits of pure number',
    password3: 'password can not be blank',
    code: 'verification code must be filled',
    realname: 'Name cannot be empty',
    idCard: 'ID number cannot be empty',
    address: 'Address input cannot be empty',
    notes: 'Label input cannot be empty',
    zm: 'Upload front and back of ID photo',
    min: `The minimum number of transactions is {num}`,
    max: `The maximum number of transactions is {num}`,
  },
  AboutUs: {
    pro1: 'Multifunctional and democratic crypto exchange. As the first on the market, we give financial benefits to active users. Coinbase Lite is a holistic project, which means implementing solutions on a few business layers regarding the cryptocurrency solutions to make using easier for our users.',
    title: 'Our Vision',
    pro2: 'We are sure of the wide application of blockchain technology and the benefits of cryptocurrencies in the near future. By introducing global solutions not only due to technological innovations but also thanks to education, the crypto world ecosystem becomes more friendly for everyone.',
  },
  ...enLocale,
};
export default en;
