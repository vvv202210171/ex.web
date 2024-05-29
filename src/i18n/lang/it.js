import itLocale from 'element-ui/lib/locale/lang/it';
//意大利
const it = {
  Mining: {
    assets: 'Fondi gestiti',
    income: 'Guadagni attesi oggi',
    incomeAll: 'Totale entrate',
    order: 'Ordine',
    record: 'posizione',
    list: {
      minNumber: 'Importo unico',
      rate: 'Rendimento giornaliero',
      cycle: 'Ciclo',
      btn: 'Sottoscrizione',
      recentRate: 'Reddito giornaliero',
      quota: 'Limite singolo USDT',
      backTime: 'Tempo di dividendo',
      advance: 'Riscatto anticipato',
      buyNumber: 'Acquista importo',
      all: 'Tutti',
      available: 'Saldo:',
      day: `{num} giorni`,
      everyday: 'Ogni giorno',
      onTimeBack: 'Restituzione dovuta',
      password: 'Password',
    },
    table: {
      name: 'nome',
      number: 'importo del pegno',
      income: 'reddito',
      startTime: 'Tempo di abbonamento',
      endTime: 'Data di scadenza',
      state: 'condizione',
      operation: 'operare',
    },
    state: {
      enable: 'in esecuzione',
      success: 'Fine',
      close: 'redento',
    },
    alert: {
      max: `L'importo massimo della transazione è {num}`,
      min: `L'importo minimo della transazione è {num}`,
    },
  },

  // Exchange: {
  //   alert: {
  //     min: '最小购买量为',
  //     max: '最大购买量为',
  //     balance: '余额不足，请确认',
  //   },
  //   btn: '确认兑换',
  //   password: '交易密码',
  //   placeholder1: '兑换金额最小为',
  //   placeholder2: '兑换金额最大为',
  //   placeholder3: '请输交易密码',
  //   record: '闪兑记录',
  //   label: {
  //     one: '兑换币种',
  //     two: '兑换数量',
  //     three: '汇率',
  //     four: '兑换',
  //     five: '获取金额',
  //     six: '提交',
  //     seven: '获取币种',
  //   },
  //   label1: '兑换币种',
  //   label2: '兑换数量',
  //   label3: '获得兑换值',
  //   label4: '时间',
  // },
  // IEO: {
  //   record: 'IEO记录',
  //   price: '单价：',
  //   total: '剩余总量',
  //   startDate: '开始时间',
  //   endDate: '结束时间',
  //   state: '状态',
  //   btn: '立即兑换',
  //   close: '已结束',
  //   noopen: '未开放',
  //   cylce: '锁仓周期',
  //   cycleDay: `{day}天`,
  //   dialog: {
  //     title: `购买{coin}`,
  //     label1: '支付币种',
  //     label2: '买币数量',
  //     label3: '预计支付',
  //     label4: '赠送',
  //     label5: '发行总量：',
  //     label6: '余额',
  //     label7: '全部使用',
  //     confirm: '立即购买',
  //     cancel: '取消',
  //     placeholder1: '请选择支付币种',
  //     placeholder2: '请输入买币数量',
  //   },
  //   recordPrice: `支付币种{number}{coin}`,
  // },
  realNameOpen: {
    title:
      "Non hai superato l'autenticazione del nome reale, vai prima all'autenticazione",
  },

  invite: {
    headerTitle: 'Invita gli amici e divertiti insieme',
    downText: 'Invita i tuoi amici a scaricare insieme "Coinbase Lite".',
    header: 'Registro degli inviti',
    myInvite: 'il mio invito',
    teamRecord: 'condividere il record',
    rule: 'Regole di invito',
    rules: {
      one: '1、好友接受邀请后，在交易区每产生一笔真实交易手续费，会产生相应交易区比例的返佣。',
      two: '2、返佣的形式:用户在对应交易区交易，产生的交易手续费共50%返佣，按照-级30%， 二级20%的比例返佣到推荐人的交易账户。',
      three:
        '3、好友交易返佣当日统计;返佣额(对应交易区) = 实际产生交易量★手续费比例*返佣比例。',
      four: '4、邀请人享受好友交易返佣有效时长以被邀请人实际注册的时间开始进行计算，到达有效时长(365天) 后您将不享受该邀请人交易产生手续费的返佣。',
      five: '5、充提币手续费不参与手续费返佣。',
      six: '*活动如有调整，以平台更新为准，最终解释权归Coinbase Lite所有。',
    },
    title1: 'invita gli amici',
    title2: 'Scarica la registrazione',
    title3: 'Ricevi premio',
    pro1: 'Copia il link di invito e invialo a un amico',
    pro2: 'Scarica gli amici, completa la registrazione',
    pro3: 'Amici invitati con successo per ottenere ricompense di commissione',
    label1: 'Link di invito',
    label2: 'Codice invito',
    label3: 'numero totale di inviti',
    label4: 'Numero push diretto',
    btn1: 'invitare',
    btn2: 'copia',
    hasInvite: 'invitato',
    form: {
      account: 'Invita le persone',
      time: 'volta',
      number: 'quantità',
      financial: 'Importo finanziario',
      from: 'fonte',
    },
  },
  Order: {
    nav: {
      one: 'mandato attuale',
      two: 'commissione storica',
      three: 'Dettagli di Transazione',
    },
    table: {
      one: 'Strumento',
      two: 'volta',
      three: 'Tipi di',
      four: 'volume',
      five: "Prezzo dell'ordine",
      six: 'importo della commissione',
      seven: "Importo dell'affidamento",
      eight: 'condizione',
      nine: 'prezzo finale',
      ten: '',
    },
  },

  //提交工单
  Customer: {
    title: 'Invia un biglietto',
    title1: 'titolo',
    placeholder1: 'Si prega di compilare il titolo del feedback',
    placeholder2:
      'Descrivi il tuo problema in dettaglio, ci aiuterà ad aiutarti in modo più efficace!',
    placeholder3: 'Per favore, descrivi il tuo problema',
    placeholder4: "La dimensione dell'immagine non può superare i 5 MB",
    title2: 'contenuto',
    list: 'Elenco dei biglietti',
    btn: 'Invia',
    label: {
      one: 'in lavorazione',
      two: 'terminato',
      three: 'titolo',
      four: 'contenuto',
      five: 'condizione',
      six: 'Rispondere',
      seven: 'volta',
    },
  },

  //下载提示框
  // Alert: {
  //   preserve: '保存图片',
  //   online: '正式上线',
  //   profit: '盈利金额',
  //   price: '平仓价格',
  //   cycle: '周期',
  //   target: '点位',
  //   certain: '杠杠',
  // },

  Header: {
    navArr: {
      home: 'prima pagina',
      target: 'contratto di destinazione',
      cycle: 'ciclo',
      currency: 'valuta',
      certain: 'contrarre',
      login: 'Accesso',
      register: 'Registrati',
      language: '简体中文',
      account: 'account',
      back: 'disconnessione',
      assets: 'risorse',
      financial: 'gestione finanziaria',
      help: 'aiuto',
      ieo: 'IEO',
      invite: 'Invitare',
      order: 'Ordine',
      download: 'Download dei clienti',
      exchange: 'scambio di flash',
      mining: 'Estrazione',
      transfer: 'Trading',
      // fiat: '法币',
    },
    out: {
      title: 'Sei sicuro di voler uscire?',
      prompt: 'suggerimento',
      leftBtn: 'Annulla',
      rightBtn: 'Sicuro',
      message: 'Disconnessione annullata',
    },
    login: 'Accesso',
    registered: 'Registrati',
    alert: 'Non ancora aperto',
  },

  Last: 'pagina precedente',
  Next: 'pagina successiva',

  //首页
  Home: {
    headerTitle:
      'Lascia che "Coinbase Lite" si diffonda in tutti i paesi del mondo',
    headerPro: 'recuperare / superare / guidare',
    title:
      'Concentrati sulle transazioni contrattuali ad alta liquidità blockchain',
    proTitle:
      "Leva fino a 100 volte maggiore, elaborazione fulminea dell'esecuzione degli ordini, supporto per contratti U-standard con valute avanzate e funzioni contrattuali perfette, che semplificano le transazioni digitali",
    arr: {
      oneTitle: 'Sicurezza di livello finanziario',
      oneProTitle:
        'Sistema di controllo del rischio finanziario a 360 gradi e sistema antifurto, portafoglio caldo e freddo, sistema multi-firma per garantire la sicurezza dei fondi',
      twoTitle: 'Deposito e prelievo estremamente veloci',
      twoProTitle:
        'Deposito e prelievo possono essere completati in soli 3 minuti, revisione manuale online 24 ore su 24, per proteggere i clienti dal perdere le migliori opportunità di investimento',
      threeTitle: 'servizio globale',
      threeProTitle:
        'Copertura della rete di servizi aziendali globali per aiutarti a investire in risorse crittografate globali e commerciare con utenti globali',
      fourTitle: 'Risorse accuratamente selezionate',
      fourProTitle:
        "Seleziona rigorosamente progetti di crittografia di alta qualità e filtra per te l'80% dei progetti ad altissimo rischio",
    },
    down: {
      title: 'Sempre e ovunque, non perdere nessuna occasione',
      proTitle1: 'Trading in tempo reale: compra e vendi, fai leva',
      proTitle2: 'Deposito e Prelievo: Deposito, Prelievo',
      proTitle3:
        'Promemoria in tempo reale: promemoria di mercato, promemoria di eventi',
      and: 'Pagina web H5',
      android: 'Android',
      ios: 'iPhone',
    },

    register: {
      proTitle:
        'Inserisci il tuo telefono cellulare/e-mail nella casella di inserimento sottostante per registrarti',
      placeholder: 'Inserisci il tuo numero di telefono/e-mail',
      btn: 'Iscriviti ora',
    },
    titleNav: {
      one: 'valuta',
      two: 'contrarre',
    },
    table: {
      search: 'ricerca',
      optional: 'opzionale',
      title: 'Citazioni',
      maincoin: 'nome del contratto',
      price: 'Ultimo prezzo',
      rise: 'guadagno',
      height: '24 ore massimo',
      low: 'minimo 24 ore',
      volume: 'volume 24 ore',
    },
  },

  // Fiat: {
  //   coin: '选择币种',
  //   payCoin: '支付币种',
  //   number: '购买数量',
  //   alert1: `最小交易数量为{num}`,
  //   alert2: `最大交易数量为{num}`,
  //   label1: '币种',
  //   label2: '购买数量',
  //   label3: '总交易额',
  //   label4: '状态',
  //   label5: '时间',
  //   label6: '预计支付:',
  //   state1: '未支付',
  //   state2: '已完成',
  //   state3: '已取消',
  // },

  //脚部
  Footer: {
    arr: {
      one: 'Centro annunci',
      three: 'Centro assistenza',
      five: 'Accordo per gli utenti',
      twelve: 'politica sulla riservatezza',
      two: 'riguardo a noi',
      WhitePapers:'fogli bianchi'
    },
    text2:
      'Copyright © 2012 Tutti i diritti riservati www.Coinbase Lite.live Tutti i diritti riservati Su ICP No. 09213115-1',
    text: "Avviso di rischio: a causa dell'alto rischio del trading di valuta digitale, è facilmente influenzato da fattori esterni, valuta e altri fattori e il prezzo oscilla notevolmente. Ti consigliamo vivamente di partecipare al trading di valuta digitale entro l'intervallo di rischio che puoi sopportare ! L'investimento è rischioso e devi essere cauto quando entri nel mercato.",
  },

  //登录注册
  Login: {
    forgerTitle: 'Ha dimenticato la password',
    registerTitle: "registra l'account",
    loginTitle: 'Login utente',
    account: 'nome utente',
    email: 'Posta',
    tel: 'cellulare',
    title1: 'nostro',
    title2: 'Obbiettivo',
    proTitle: 'Lascia che "Coinbase Lite" si diffonda in tutti i paesi del mondo',
    label: {
      username: 'account',
      hash: 'chiave privata',
      code: 'codice di verifica',
      password: "parola d'ordine",
      tgm: 'Codice invito',
      email: 'Verifica email',
      phone: 'Verifica telefonica',
      tradpassword: 'Conferma password',
    },
    placeholder: {
      account: 'Inserisci 6-12 cifre o lettere inglesi',
      password: 'Per favore, inserisci la password',
      passAgain: 'Si prega di ripetere la password di accesso',
      code: 'si prega di inserire il codice di verifica',
      username: 'Inserisci e-mail/numero di cellulare',
      mail: "Inserisci l'email",
      phone: 'Inserisci il numero di cellulare',
      hash: 'Si prega di inserire la chiave privata',
      tgm: 'Compila il codice di invito (facoltativo)',
      tradpassword: 'Si prega di inserire conferma password',
    },
    login: {
      loginPrompt: 'Nessun conto? andare',
      toRegistered: 'Registrati',
      headerTitle: 'Accedi per favore',
      title: 'accesso con password',
      navArr: {
        phone: 'accedi telefonicamente',
        mail: 'E-mail di accesso',
      },
      agreement: "Ricorda il nome dell'account",
      btnTitle: 'Accesso',
    },
    register: {
      loginPrompt: 'Hai già un account? andare',
      toRegistered: 'Torna al login',
      headerTitle: 'Benvenuto per registrarti',
      agreement: "Ho letto e accetto il Contratto di servizio per l'utente",
      btnTitle: 'Iscriviti ora',
    },
    saveCode: 'Ottenere',
    forgetPas: 'Ha dimenticato la password',
    clearRecord: 'Cancella record',
    toLogin: 'accedi immediatamente',
    toRegistered: 'Iscriviti ora',
    titleArr: {
      login: 'Accesso',
      register: 'Registrati',
      next: 'Passo successivo',
      confirm: 'Confermare',
    },
    navArr: {
      phone: 'Registra il tuo telefono',
      mail: 'registrazione email',
    },
    show: {
      password:
        'La lunghezza della password di accesso è compresa tra 8 e 20 cifre e lettere',
      username: 'Si prega di inserire il proprio numero di telefono o e-mail',
      code: 'Si prega di compilare il codice di verifica',
      mail: "Si prega di compilare un'e-mail valida",
      slider: 'Trascina il cursore per verificare',
      different: 'Le password non corrispondono, si prega di confermare',
      agreement: 'Si prega di spuntare il contratto di servizio',
      tgm: 'Si prega di compilare il codice di invito',
      tradpassword: 'Si prega di inserire la password della transazione',
    },
    wrong: 'Errore di convalida',
    showInfo: 'Si prega di inserire un numero di cellulare valido',
    prompt: 'Si prega di spuntare il contratto di servizio',
  },

  //目标合约
  Target: {
    detailsTitle: 'Lista delle citazioni',
    nav: {
      one: 'Contratto',
      two: 'Ultimo prezzo',
      three: 'Cambio',
    },
    entrust: {
      now: 'posizione attuale',
      history: 'transazione storica',
    },
    down: 'Bearish',
    up: 'Bullish',
    label: {
      one: 'Strumento',
      two: 'Saldo',
      three: 'importo del denaro',
      four: 'punti bersaglio',
      five: 'Rendimento:',
      six: 'Profitto:',
    },
    table: {
      title1: 'Lato',
      title2: 'Prezzo',
      title3: 'profitto',
      title4: 'Volta',
      order: 'Numeri dispari',
      transfer: 'Strumento',
      direction: 'Lato',
      coin: 'Valuta',
      openPrice: 'Prezzo',
      total: 'Totale',
      lever: 'Punto',
      profit: 'Take profit',
      loss: 'Stop loss',
      newPrice: 'Ultimo prezzo',
      openTime: 'Tempo',
      endTime: 'Tempo di fine',
      type: 'Tipo',
      rate: 'Profitto',
      optional: 'Operare',
    },
    alert: {
      min: 'Il numero minimo di ingressi è',
      max: 'Il numero massimo di ingressi è',
    },
    order: 'Ordine redditizio',
  },

  //周期合约
  Cycle: {
    label: {
      cycle: 'Ciclo',
      number: 'Contingente',
    },
  },

  //杠杠合约
  Certain: {
    tableCoin: 'Varietà commerciale attuale',
    entrust: {
      one: 'posizione attuale',
      two: 'Posizioni storiche',
      three: 'Ordini aperti',
      four: 'Cronologia ordini',
      five: 'Stop',
    },
    nav: {
      one: 'Limite',
      two: 'Mercato',
      three: "Invia l'ordine ai prezzi di mercato",
    },
    bond: 'Margine affidato:',
    btn1: 'Vedi altro',
    btn2: 'ribassista',
    assets: 'Il mio asset contrattuale (USDT)',
    label: {
      one: 'Fondi disponibili',
      two: 'Occupare il margine',
      three: 'Congela il margine',
      four: 'Tasso di finanziamento',
      five: 'indice sottostante',
      six: 'ingrandimento:',
      seven: 'Prezzo:',
      eight: 'Importo :',
      ten: 'Take profit',
      eleven: 'Stop loss',
      twelve: 'Lsolato',
      thirteen: 'Cross',
    },
    table: {
      type: 'Tipi di',
      limit: 'Limite',
      market: 'Mercato',
      buy: 'Kaiduo',
      sell: "All'aperto",
      trading: 'Strumento',
      sj: 'Orario ordine',
      direction: 'Lato',
      times: 'Multiplo',
      seat: 'Posizione(lotto)',
      unfilled: 'Non scambiato',
      has: 'Can deal(mano)',
      average: 'prezzo medio',
      cwbond: 'Bond',
      bond: 'Margine',
      endPrice: 'Parità forzata stimata',
      rise: 'Cambio',
      profit: 'Take profit',
      loss: 'Stop loss',
      interest: 'interesse',
      charge: 'Tassa',
      operation: 'operare',
      back: 'revocare',
      price: 'Prezzo',
      close: 'Numero',
      lastProfit: 'Prezzo di chiusura',
      value: "Valore dell'ordine",
      status: 'condizione',
      wtsj: 'volta',
    },
    status: {
      unfilled: 'Non scambiato',
      section: 'Affare parziale',
      all: 'Tutti completati',
      cancel: 'Revocato',
      profit: 'Stop',
      close: 'chiudere la posizione',
      oneClose: 'Chiusura con un clic',
      bond: 'aumentare il margine',
      closeNum: 'Può essere chiuso',
    },
    alert: {
      profit: 'Inserisci il prezzo take profit',
      loss: 'Inserisci un prezzo stop loss',
      close: "Si prega di inserire l'importo di chiusura",
      bond: "Si prega di inserire l'importo del deposito",
      min: 'La dimensione minima del lotto di input è',
      price: 'Inserisci un prezzo',
      closeNum: `Il numero di appartamenti è {num}`,
    },
    open: 'Disponibile:',
    charge: 'Spese di gestione:',
    fix: 'mano',
    cancel: 'Annulla',
    comfirm: 'Sicuro',
    marketNar: {
      titleLeft: 'Handicap',
      titleRight: 'transazione in tempo reale',
      price: 'prezzo',
      num: 'quantità',
      total: 'Quantità cumulativa',
      time: 'volta',
    },
    profitLoss: {
      label1: 'Entrate stimate',
      label2: 'Prezzo corrente',
      label3: 'quantità',
      label4: 'Modifica',
      label5: 'Annulla',
      label6:
        'Il prezzo di stop non deve essere maggiore del prezzo di posizione',
      label7:
        'Il prezzo take profit non deve essere inferiore al prezzo della posizione',
      label8:
        'Il prezzo take profit non può essere maggiore del prezzo della posizione',
      label9:
        'Il prezzo dello stop loss non deve essere inferiore al prezzo della posizione',
      label10: 'Piatto tutto',
      label11: 'Chiudi posizione lunga',
      label12: 'Chiudi posizione corta',
    },
  },

  //资产账户
  Assets: {
    title1: 'Conto in valuta',
    title2: 'conto del contratto',
    assets: 'Totale attivo equivalente',
    search: 'ricerca',
    type: 'Tipi di',
    chain: 'nome della catena',
    CustomerService: 'Si prega di contattare il servizio clienti!',
    accountEarnings:'reddito totale',
    todayEarnings:'I guadagni di oggi',
    nav: {
      one: 'I miei beni',
      two: 'Dettagli asset',
      three: 'Gestione indirizzo di prelievo',
      four: 'Attività contrattuale',
      five: 'Dettagli asset',
      six: 'Numero di aziende',
      seven: 'margine di posizione',
      eight: 'utili e perdite realizzati',
      nine: 'Margine affidato',
      ten: 'Conversione di asset valutari',
      eleven: 'Conversione di asset del contratto',
    },
    chargeBox: {
      title: 'Indirizzo di deposito:',
      record: 'Visualizza lo stato di tracciabilità del record di deposito',
      id: 'ID transazione blockchain:',
      time: 'Tempo transazione portafoglio:',
      details: 'dettagli',
      label1:'Inserisci numeri e lettere da 4 a 64 cifre'
    },
    mentionBox: {
      number: 'Scontrino effettivo:',
      submit: 'Invia',
      tips: {
        one: 'Suggerimenti',
        two: '• Si prega di non depositare asset diversi da {coin} agli indirizzi sopra indicati, altrimenti gli asset non verranno recuperati.',
        three:
          "•Dopo aver addebitato l'indirizzo sopra, l'intero nodo di rete deve confermare, attendere pazientemente durante questo processo",
        four: '•Importo minimo di prelievo: {min} {coin}',
        five: '• Per garantire la sicurezza dei tuoi fondi, faremo del nostro meglio per informarti tramite annunci sul sito Web o e-mail quando la politica di sicurezza del tuo account viene modificata o la tua password viene modificata.',
        six: '• Assicurati di confermare la sicurezza del tuo computer e browser per evitare che le informazioni vengano manomesse o divulgate.',
        seven:
          "•Importo minimo di deposito: {min} {coin}, depositi inferiori all'importo minimo non verranno accreditati e non potranno essere restituiti.",
      },
    },
    text: 'nascondere piccoli beni',
    table: {
      one: 'nome della valuta',

      two: 'Attività disponibili',
      three: 'Blocca beni',
      four: 'Attività convertite',
      five: 'Operazione',
      six: 'valuta',
      seven: 'Indirizzo di prelievo',
      eight: 'Note',
      nine: 'ora di arrivo',
      ten: 'valuta',
      eleven: 'tipo',
      twelve: 'importo ricarica',
      thirteen: 'spese di gestione',
      fourteen: 'tempo',
    },
    state: {
      sending: 'In attesa',
      completed: 'completato',
      dismissed: 'respinto',
    },
    record: {
      one: 'Registro di deposito',
      two: 'Registro di prelievo',
      three: 'Registro di trasferimento',
      four: 'Registri delle transazioni del fondo',
      five: 'Altri record',
    },
    recordTable: {
      one: 'quantità',
      two: 'condizione',
    },
    coin: 'valuta',
    charge: 'depositare',
    mention: 'Ritirare',
    transfer: 'trasferimento',
    deal: 'commercio',
    deleted: 'eliminare',
    add: 'Aggiungere a',
    placeholder: "Si prega di inserire l'indirizzo per il ritiro",
    placeholder2: 'Si prega di inserire una nota',
    placeholder3: 'Si prega di inserire la password della transazione',
    placeholder4: "Si prega di inserire l'importo del prelievo",
    chargeDialog: {
      title: 'ricaricare',
      address: "L'indirizzo di deposito è il seguente",
      copy: 'copia indirizzo',
      ercode: "Scansiona il codice QR per ottenere l'indirizzo",
      tips: 'Suggerimenti',
      success: 'Copia con successo',
    },
    transferDialog: {
      title: 'Trasferimento di conto',
      from: 'da',
      to: 'arrivo',
      all: 'tutti',
      hasChange: 'Saldo trasferibile:',
      alert1: "Si prega di inserire l'importo del bonifico",
      alert2: 'Equilibrio insufficiente',
      alert3: "Si prega di inserire l'importo del prelievo",
      alert4: "Si prega di inserire l'indirizzo per il ritiro",
      min: "L'importo minimo di prelievo è",
      max: "L'importo massimo di prelievo è",
      btn: 'Conferma il trasferimento',
    },
    mentionDialog: {
      balance: 'saldo disponibile:',
      address: "Osservazioni sull'indirizzo",
      number: 'Importo del prelievo',
      password: 'password di transazione',
      fee: 'Tassa',
    },
    mentionAddress: {
      title: "Seleziona l'indirizzo di prelievo",
      no: 'Nessun indirizzo di prelievo ancora',
      btn: "Aggiungi l'indirizzo di prelievo",
    },
    addAlert: "Aggiungi l'indirizzo di prelievo",
    delAlert: 'cancellato con successo',
    cancel: 'Annulla',
    comfirm: 'Sicuro',
  },

  //关于
  About: {
    bannerText: 'Come possiamo aiutare?',
    search: 'ricerca',
    placeholder: 'Qual è il problema, ti aiuterò a trovare la risposta',
    title: 'informazioni rilevanti',
    back: 'Restituzione',
    result: 'Cerca contenuti correlati',
    noBack: 'Non sono stati trovati risultati idonei',
    alert1: 'Si prega di inserire le parole chiave',
    nav: {
      one: 'Annuncio importante',
      two: 'Ultima attività',
      three: "Avviso per l'utente",
      four: 'Transazione di monete',
      five: 'Transazione contrattuale',
      six: 'aiuto per principianti',
    },
  },

  message: {
    currency: {
      priceBtn: {
        fixPrice: 'Mercato',
        marketPrice: 'Limite',
      },
      title: 'valuta',
      newpriceText: "Invia l'ordine ai prezzi di mercato",
      leftAssets: 'Totale attivo equivalente',
      allOrder: 'tutti gli ordini',
      currency: 'commercio di valuta',
      trading: 'ricaricare',
      placeholder: 'Cerca la valuta del deposito',
      hasUser: 'Equilibrio:',
      buyPrice: 'prezzo di acquisto',
      buyNum: 'acquistare volume',
      buyNow: 'acquista ora',
      turnover: 'Turnover:',
      sellPrice: 'Prezzo di vendita',
      sellNum: 'volume di vendita',
      sellNow: 'vendi ora',
      entrust: {
        now: 'mandato attuale',
        history: 'record di storia',
        introduce: 'Introduzione alla valuta',
      },
      // introduceObj: {
      //   time: '发行时间',
      //   total: '发行总量',
      //   circulation: '流通总量',
      //   link: '相关链接',
      //   introduce: '简介',
      //   webaddress: '官网',
      //   blockquery: '区块查询',
      //   whitepaper: '白皮书 ',
      //   no: '该币种信息尚未录入,敬请期待',
      // },
      form: {
        trading: 'Strumento',
        sj: 'volta',
        price: 'prezzo',
        quantity: 'quantità',
        total: 'Valore ordine',
        operation: 'operare',
        undo: 'revocare',
        category: 'Tipi di',
        buy: 'acquistare',
        sell: 'vendere',
        wtprice: 'Prezzo',
        wtquantity: 'Totali',
        totalamount: 'Ricambio totale',
        wtTotle: 'Valore ordine',
        state: 'Stato',
        deal: 'Compilati',
        hasUndo: 'Revocato',
        unfilled: 'non riempito',
      },
      rightNav: {
        currency: 'Coppia',
        price: 'Ultimo prezzo',
        vol: 'volume',
        rise: 'Cambio',
      },
      marketNar: {
        titleLeft: 'Handicap',
        titleRight: 'Cronologia contrattazioni',
        price: 'prezzo',
        num: 'Importo',
        total: 'Totale',
        time: 'Orario',
      },
      lastPage: 'pagina precedente',
      nextPage: 'pagina successiva',
      open: {
        title:
          "Non hai impostato una password di transazione, puoi depositare e fare trading dopo l'autenticazione",
        prompt: 'suggerimento',
        leftBtn: 'Annulla',
        rightBtn: 'Sicuro',
      },
      show: {
        price: 'Si prega di compilare il prezzo',
        number: 'Si prega di compilare la quantità',
      },
    },
    noRecord: 'Nessuna registrazione',
    noData: 'Nessun dato',
    k: {
      rose: 'Cambio',
      high: '24 ore di indice alto',
      row: '24 ore di indice basso',
      vol: 'Volume a 24 ore',
      newPrice: 'prezzo finale',
    },
    data: {
      time: 'volta',
      open: 'apertura:',
      close: 'chiudere:',
      low: 'più basso:',
      high: 'Più alta:',
      volume: 'Volume di scambio:',
    },
    // payWay: {
    //   zfb: '支付宝',
    //   wx: '微信',
    //   bank: '银行卡',
    // },
    //费率

    //tradingview:
    tradingview: {
      navArr: {
        one: 'linea K',
        two: 'mappa di profondità',
      },
      rise: 'Cambio',
      downtime: 'conto alla rovescia',
      surplus: 'Profitto',
      deficit: 'disavanzo',
    },
  },
  My: {
    credit: 'Credito',
    cancel: 'Annulla',
    comfirm: 'Confermare',
    mine: 'centro personale',
    safe: 'Livello di sicurezza:',
    high: 'alto',
    center: 'mezzo',
    low: 'Basso',
    promite:
      'Si consiglia di abilitare la verifica e-mail Si consiglia di abilitare la verifica del nome reale',
    Personal: "Sicurezza dell 'Account",
    phone: 'cellulare',
    email: 'Posta',
    modifyPhone: 'Modifica numero di telefono',
    modifyEmail: 'Modifica e-mail',
    phone_p: 'legamento',
    Certification: 'Certificazione',
    Realname: 'Verificato',
    title2: 'Gestione sicura delle password',
    title3: 'Altro',
    title4: 'password per il login',
    title5: 'password di transazione',
    title6: 'gestione degli indirizzi',
    title7: 'Invia un biglietto',
    proTitle1:
      'Utilizzato per accedere, prelevare monete, recuperare password, modificare password ed eseguire verifiche di sicurezza durante la gestione degli AP',
    proTitle2: "Utilizzato per accedere, proteggere la sicurezza dell'account",
    proTitle3:
      'Utilizzato per proteggere la sicurezza delle transazioni finanziarie',
    proTitle4: 'Selezione rapida e precisa quando si utilizza per il ritiro',
    proTitle5: 'Se non sai niente, vieni qui ad aiutarti',
    proTitle6:
      "I buoni sconto della piattaforma vengono utilizzati solo per l'acquisto di valute",
    proTitle7: '',
    set: 'impostare',
    see: "Dai un'occhiata",
    hasSet: 'È stato impostato',
    modify: 'Rivedere',
    add: 'Aggiungere a',
    del: 'eliminare',
    operation: 'operare',

    save: 'Ottenere',
    phoneSave: 'Telefonica',
    emailSave: 'Email',
    placeholder: {
      phone: 'Si prega di inserire il numero di telefono',
      code: 'si prega di inserire il codice di verifica',
      oldPass: 'Si prega di inserire la vecchia password',
      newPass: 'Si prega di inserire una nuova password',
      passAgin: 'Conferma il nuovo segreto',
      email: 'per favore inserisci la tua email',
    },
    dialogTitle: {
      one: 'Cambia il cellulare associato',
      two: 'Modifica la password di accesso',

      three: 'Trasferimento di conto',
      four: "Seleziona l'indirizzo di ritiro",
      five: 'Aggiungi indirizzo di prelievo',
      six: 'Cambia la casella di posta vincolata',
      seven: 'Autenticazione del nome reale',
      eight: 'Modifica password transazione',
      nine: 'Aggiungi indirizzo di prelievo',
      ten: "Seleziona l'indirizzo di ritiro",
      eleven: 'Imposta la password della transazione',
    },
    realname: {
      success: "L'autenticazione del nome reale è riuscita!",
      review: "L'autenticazione del nome reale è in fase di revisione!",
    },
  },

  mine: {
    verified: 'verificato',
    certified: 'non certificato',
    copy: 'Copia con successo',
  },

  Verified: {
    Name: 'Nome',
    NameIpn: 'Si prega di inserire il nome del titolare',
    type: 'Tipo',
    typeIpn: 'ID',
    typeHz: 'passaporto',
    onload: 'Carica',
    id: 'Numero ID',
    idIpn: 'Si prega di inserire il numero ID',

    zm: 'Davanti',
    fm: 'Dietro',
    sc: 'Foto a mano',
    pic: 'Carica',
  },
  iphone: {
    phone: 'Numero di telefono',
  },

  Coin: {
    bh: 'rifiutare',
    sh: 'in fase di revisione',
  },

  alert: {
    password: 'Le due password non corrispondono',
    password1: 'Si prega di inserire 6 cifre',
    password3: 'la password non può essere vuota',
    code: 'il codice di verifica deve essere compilato',
    realname: 'Il nome non può essere vuoto',
    idCard: 'Il numero ID non può essere vuoto',

    address: "L'inserimento dell'indirizzo non può essere vuoto",
    notes: "L'immissione dell'etichetta non può essere vuota",

    zm: "Carica la foto d'identità davanti e dietro",
    min: `Il numero minimo di transazioni è {num}`,
    max: `Il numero massimo di transazioni è {num}`,
  },
  AboutUs: {
    pro1: "Scambio di criptovalute multifunzionale e democratico. Come prima azienda sul mercato, forniamo benefici economici agli utenti attivi. Coinbase Lite è un progetto globale, il che significa implementare soluzioni su soluzioni di criptovaluta a diversi livelli aziendali per rendere più facile per i nostri utenti l'utilizzo.",
    title: 'La nostra visione',
    pro2: "Siamo convinti dell'ampia applicazione della tecnologia blockchain e dei benefici della criptovaluta nel prossimo futuro. Con l'introduzione di soluzioni globali, l'ecosistema mondiale crittografato è diventato più amichevole per tutti, non solo grazie all'innovazione tecnologica, ma anche grazie all'istruzione.",
  },
  ...itLocale,
};
export default it;