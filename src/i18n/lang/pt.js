import ptLocale from 'element-ui/lib/locale/lang/pt';
//德
const pt = {
  Mining: {
    assets: "Fundos de custódia",
    income: "Resultados estimados de hoje",
    incomeAll: "Rendimentos acumulados",
    order: "Ordem de Custódia",
    record: "Posição",
    list: {
      minNumber: "Montante único",
      rate: "Rendimento diário",
      cycle: "ciclo",
      btn: "solicitar a compra",
      recentRate: "Rendimentos diários",
      quota: "Limite único USDT",
      backTime: "Tempo de pagamento dos dividendos",
      advance: "chamado",
      buyNumber: "Montante da compra",
      all: "inteiro",
      available: "Disponível:",
      day: `{num} dias`,
      everyday: "Todos os dias",
      onTimeBack: "Retorno após expiração",
      password: "Senha da transacção",
    },
    table: {
      name: "nome",
      number: "Montante do compromisso",
      income: "lucro",
      startTime: "Tempo de assinatura",
      endTime: "Tempo de expiração",
      state: "estado",
      operation: "operação",
    },
    state: { enable: "Correndo", success: "completo", close: "Resgatado" },
    alert: {
      max: `O valor máximo da transação é {num}`,
      min: `O valor mínimo da transação é {num}`,
    },
  },
  realNameOpen: {
    title:
        "Você não passou a autenticação de nome real, por favor vá para a autenticação primeiro",
  },
  invite: {
    headerTitle: "Convidar amigos para se divertirem juntos",
    downText: 'Por favor, convide seus amigos para baixar "Coinbase Lite"',
    header: "Registo do convite",
    myInvite: "O meu convite",
    teamRecord: "Registo de propriedade",
    rule: "Regras dos convites",
    rules: {
      one: "1. Após o amigo aceitar o convite, para cada taxa real de processamento de transação gerada na área de negociação, a comissão será devolvida na proporção correspondente da área de negociação.",
      two: "2. A forma de reembolso da comissão: 50% da comissão de transação gerada pela transação do usuário na área de negociação correspondente será devolvida à conta de transação do recomendador de acordo com a proporção de 30% para o primeiro nível e 20% para o segundo nível.",
      three:
          "3. Estatísticas do dia em que amigos retornam comissão; O valor do desconto de comissão (correspondente à área de negociação)=o volume real da transação ★ taxa de comissão * taxa de desconto de comissão.",
      four: "4. A duração efetiva do convidado desfrutando do desconto de comissão da transação de amigo é calculada a partir do tempo real de registro do convidado. Após a duração efetiva (365 dias) é alcançada, você não desfrutará do desconto de comissão gerado pela transação do convidado.",
      five: "5. A taxa de serviço para retirada de dinheiro não participa na devolução da comissão.",
      six: "*Em caso de qualquer ajuste das atividades, prevalecerá a atualização da plataforma, reservando-se o direito de interpretação final à Coinbase Lite.",
    },
    title1: "Convidar amigos",
    title2: "Transferir o Registo",
    title3: "Receber recompensas",
    pro1: "Copie o link do convite e envie-o para amigos",
    pro2: "Transferência de amigos, registo completo",
    pro3: "Amigos convidados com sucesso para receber recompensas de comissão",
    label1: "Ligação de convite",
    label2: "Código do convite",
    label3: "Número total de convidados",
    label4: "Número de encaminhamentos diretos",
    btn1: "convite",
    btn2: "cópia",
    hasInvite: "Convidado",
    form: {
      account: "Inviter",
      time: "tempo",
      number: "Quantidade",
      financial: "Quantidade financeira",
      from: "fonte",
    },
  },
  Order: {
    nav: {
      one: "Delegação actual",
      two: "Atribuição histórica",
      three: "Detalhes da Transacção",
    },
    table: {
      one: "Par de transacções",
      two: "tempo",
      three: "tipo",
      four: "Volume de negócios",
      five: "Preço confiado",
      six: "Quantidade confiada",
      seven: "Montante atribuído",
      eight: "estado",
      nine: "Preço de transacção",
      ten: "",
    },
  },
  Customer: {
    title: "Enviar ordem de serviço",
    title1: "título",
    placeholder1: "Por favor, preencha o título do feedback",
    placeholder2:
        "Descreva seu problema especificamente, o que nos ajudará a ajudá-lo de forma mais eficaz!",
    placeholder3: "Por favor descreva o seu problema",
    placeholder4: "O tamanho da imagem não pode exceder 5MB",
    title2: "conteúdo",
    list: "Lista de ordens de trabalho",
    btn: "Enviar",
    label: {
      one: "Transformação",
      two: "Fechado",
      three: "título",
      four: "conteúdo",
      five: "estado",
      six: "resposta",
      seven: "tempo",
    },
  },
  Header: {
    navArr: {
      home: "Página inicial",
      target: "Contrato-alvo",
      cycle: "Segundo contrato",
      currency: "Transacção cambial",
      certain: "contrato",
      login: "Entrar",
      register: "registo",
      language: "Chinês simplificado",
      account: "Centro Pessoal",
      back: "Sair",
      assets: "activos",
      financial: "realizar operações financeiras",
      help: "Centro de Ajuda",
      ieo: "IEO",
      invite: "Convidar de volta",
      order: "ordem",
      download: "Transferência do cliente",
      exchange: "Dinheiro rápido",
      mining: "Bloquear a mineração",
      transfer: "transacção",
    },
    out: {
      title: "Confirmar a saída",
      prompt: "Dicas",
      leftBtn: "cancelar",
      rightBtn: "determinar",
      message: "Saída cancelada",
    },
    login: "Entrar",
    registered: "registo",
    alert: "Ainda não aberto",
  },
  Last: "página anterior",
  Next: "página seguinte",
  Home: {
    headerTitle: 'Deixe "Coinbase Lite" se espalhar por todo o mundo',
    headerPro: "Catch up/superação/liderança",
    title: "Foco em transações de contratos de alta liquidez blockchain",
    proTitle:
        "Até 100 vezes de alavancagem, ele lida com a execução de pedidos como relâmpago, suporta moedas de contrato padrão U ricas, melhora as funções do contrato e facilita transações digitais",
    arr: {
      oneTitle: "Segurança financeira",
      oneProTitle:
          "Sistema abrangente de controle de risco financeiro e sistema anti-roubo, carteira quente e fria, sistema multi sinal para garantir a segurança de capital",
      twoTitle: "Carregamento e levantamento rápidos",
      twoProTitle:
          "Recarga e retirada podem ser concluídas em 3 minutos no mínimo, e a auditoria manual on-line 24H pode proteger os clientes de perder as melhores oportunidades de investimento",
      threeTitle: "Serviços Globais",
      threeProTitle:
          "A cobertura de rede de serviços empresariais globais ajuda você a investir em ativos globais de criptografia e negociar com usuários globais",
      fourTitle: "Selecção rigorosa dos activos",
      fourProTitle:
          "Selecione estritamente projetos de criptografia de alta qualidade para filtrar 80% dos projetos de alto risco para você",
    },
    down: {
      title:
          "Não perca nenhuma oportunidade a qualquer hora, em qualquer lugar",
      proTitle1: "Transação em tempo real: compra e venda, alavancagem",
      proTitle2: "Continue recarregando e retirando: recarregar e retirar",
      proTitle3:
          "Lembrete em tempo real: lembrete do mercado, lembrete do evento",
      and: "Página Web do H5",
      android: "Android",
      ios: "iPhone",
    },
    register: {
      proTitle:
          "Por favor, insira seu celular/e-mail na caixa de entrada abaixo para se registrar",
      placeholder: "Introduza o seu número de telemóvel/endereço de e-mail",
      btn: "Registe-se Agora",
    },
    titleNav: { one: "Moedas", two: "contrato" },
    table: {
      search: "pesquisa",
      optional: "Facultativo",
      title: "cotação",
      maincoin: "Designação do contrato",
      price: "Preço mais recente",
      rise: "Aumento",
      height: "24h máximo",
      low: "Mínimo 24h",
      volume: "Volume de negócios 24h",
    },
  },
  Footer: {
    arr: {
      one: "Centro de Anúncios",
      three: "Centro de Ajuda",
      five: "Acordo do Utilizador",
      twelve: "Política de Privacidade",
      two: "Sobre nós",
      WhitePapers: "papel branco",
    },
    text2:
        "Direitos de autor ©  Copyright 2012 www.Coinbase Lite Todos os direitos reservados No. 0921315-1",
    text: "Dica de risco: Como as transações de moeda digital são arriscadas, vulneráveis a fatores externos, monetários e outros, e têm grandes flutuações de preços, recomendamos fortemente que você participe de transações de moeda digital dentro de sua própria faixa de risco! O investimento é arriscado, então você deve ser cauteloso ao entrar no mercado.",
  },
  Login: {
    forgerTitle: "Esqueceu- se da senha",
    registerTitle: "Conta Registada",
    loginTitle: "Login do Utilizador",
    account: "nome de utilizador",
    email: "caixa de correio",
    tel: "telemóvel",
    title1: "nosso",
    title2: "alvo",
    proTitle: 'Deixe "Coinbase Lite" se espalhar por todo o mundo',
    label: {
      username: "conta",
      hash: "Chave privada",
      code: "Código de verificação",
      password: "senha",
      tgm: "Código do convite",
      email: "Verificação da caixa de correio",
      phone: "Verificação do telemóvel",
      tradpassword: "Confirmar a Senha",
    },
    placeholder: {
      account: "Por favor insira 6-12 dígitos ou letras inglesas",
      password: "Introduza por favor uma senha",
      passAgain: "Por favor repita a sua senha de login",
      code: "Introduza o código de verificação",
      username: "Indique o e-mail/número de telemóvel",
      mail: "Indique o E- mail",
      phone: "Indique o número do telemóvel",
      hash: "Indique por favor a chave privada",
      tgm: "Preencha o código do convite",
      tradpassword: "Introduza a senha de confirmação",
    },
    login: {
      loginPrompt: "Sem conta? ir",
      toRegistered: "registo",
      headerTitle: "Bem- vindo ao Login",
      title: "Senha Login",
      navArr: { phone: "Ligação móvel", mail: "Login de E- mail" },
      agreement: "Lembrar o nome do utilizador",
      btnTitle: "Entrar",
    },
    register: {
      loginPrompt: "Já tens uma conta? ir",
      toRegistered: "Voltar ao Login",
      headerTitle: "Bem-vindo ao registo",
      agreement: "Li e concordo com o Contrato de Serviço do Usuário",
      btnTitle: "Registe-se Agora",
    },
    saveCode: "Obter código de verificação",
    forgetPas: "Esqueceu- se da senha",
    clearRecord: "Limpar os Registos",
    toLogin: "Entre agora",
    toRegistered: "Registe-se Agora",
    titleArr: {
      login: "Entrar",
      register: "registo",
      next: "próximo passo",
      confirm: "confirmar",
    },
    navArr: { phone: "Registo de telemóvel", mail: "Registo por E- mail" },
    show: {
      password: "A senha de login é uma combinação de 8 a 20 dígitos",
      username:
          "Por favor, preencha o seu número de telefone celular ou endereço de e-mail",
      code: "Preencha o código de verificação",
      mail: "Por favor, preencha o endereço de e-mail legal",
      slider: "Arraste por favor a barra deslizante para verificar",
      different: "A senha é inconsistente, por favor confirme",
      agreement: "Assinale o contrato de serviço",
      tgm: "Preencha o código do convite",
      tradpassword: "Indique por favor a senha da transacção",
    },
    wrong: "Erro de verificação",
    showInfo: "Por favor, preencha o número legal de telemóvel",
    prompt: "Assinale o contrato de serviço",
  },
  Target: {
    detailsTitle: "Lista de Citações",
    nav: {
      one: "Comércio de produtos",
      two: "Preço mais recente",
      three: "Aumento",
    },
    entrust: { now: "Posição actual", history: "Transacção histórica" },
    down: "Compra para baixo",
    up: "Compra",
    label: {
      one: "Moeda da transacção",
      two: "Saldo disponível",
      three: "Montante da transacção",
      four: "Pontos-alvo",
      five: "Rendimentos previstos:",
      six: "Rendimento esperado:",
    },
    table: {
      title1: "direcção",
      title2: "Preço de encerramento",
      title3: "colher lucro",
      title4: "tempo",
      order: "número de ordem",
      transfer: "Parceiro comercial",
      direction: "direcção",
      coin: "Moeda do activo",
      openPrice: "Preço de abertura",
      total: "Montante total da transacção",
      lever: "Posição do ponto",
      profit: "Preço stop profit",
      loss: "Preço stop loss",
      newPrice: "Preço mais recente",
      openTime: "Tempo Aberto",
      endTime: "Hora de encerramento",
      type: "Tipo de fecho",
      rate: "lucro",
      optional: "operação",
    },
    alert: {
      min: "A quantidade mínima de entrada é",
      max: "A quantidade máxima de entrada é",
    },
    order: "Ordem lucrativa",
  },
  Cycle: {
    label: { cycle: "Ciclo de transacção", number: "Limite de transacção" },
  },
  Certain: {
    tableCoin: "Tipo de transacção actual",
    entrust: {
      one: "Posição actual",
      two: "Posição histórica",
      three: "Delegação actual",
      four: "Atribuição histórica",
      five: "Parar o lucro e parar o prejuízo",
    },
    nav: {
      one: "Transacção com limite de preço",
      two: "Transacção com preços de mercado",
      three: "Compre ao melhor preço do mercado",
    },
    bond: "Depósito confiado:",
    btn1: "Vê muito.",
    btn2: "ser baixista",
    assets: "Os meus activos contratuais (USDT)",
    label: {
      one: "Fundos disponíveis",
      two: "Depósito ocupado",
      three: "Margem congelada",
      four: "Taxa do fundo",
      five: "Índice alvo",
      six: "Multiplicação:",
      seven: "Preço unitário:",
      eight: "Número de mãos:",
      ten: "Preço stop profit",
      eleven: "Preço stop loss",
      twelve: "Armazém por armazém",
      thirteen: "Armazém completo",
    },
    table: {
      type: "tipo",
      limit: "preço fixo",
      market: "preço de mercado",
      buy: "Kaiduo",
      sell: "Abrir vazio",
      trading: "Par de transacções",
      sj: "Hora do estabelecimento do armazém",
      direction: "Um sentido",
      times: "Posição múltipla",
      seat: "Posição (mão)",
      unfilled: "Unsettled",
      has: "Levelável",
      average: "Preço médio de abertura",
      cwbond: "Margem de posição",
      bond: "ligação",
      endPrice: "Paridade Forte Estimativa",
      rise: "Lucros e perdas",
      profit: "Preço stop profit",
      loss: "Preço stop loss",
      interest: "Juros de posição",
      charge: "Taxa de serviço",
      operation: "operação",
      back: "revogar",
      price: "Preço confiado",
      close: "Quantidade de encerramento",
      lastProfit: "Preço de encerramento efectivo",
      value: "Valor da posição",
      status: "estado",
      wtsj: "tempo",
    },
    status: {
      unfilled: "Unsettled",
      section: "Transacção parcial",
      all: "Transacção completa",
      cancel: "rescindido",
      profit: "Parar o lucro e parar o prejuízo",
      close: "fechar uma posição",
      oneClose: "Fechando um clique",
      bond: "Aumento da margem",
      closeNum: "Planável",
    },
    alert: {
      profit: "Indique por favor o preço stop profit",
      loss: "Indique por favor o preço stop loss",
      close: "Indique a quantidade de encerramento",
      bond: "Por favor insira a quantidade do depósito",
      min: "O número mínimo de mãos de entrada é",
      price: "Introduza o preço",
      closeNum: `A quantidade de nivelamento é {num}`,
    },
    open: "Disponível:",
    charge: "Taxa de serviço:",
    fix: "mão",
    cancel: "cancelar",
    comfirm: "determinar",
    marketNar: {
      titleLeft: "Deficiência",
      titleRight: "Transacção em tempo real",
      price: "Preço",
      num: "Quantidade",
      total: "Quantidade acumulada",
      time: "tempo",
    },
    profitLoss: {
      label1: "Rendimento estimado",
      label2: "Preço actual",
      label3: "Quantidade",
      label4: "modificar",
      label5: "revogar",
      label6:
          "O preço de stop loss não deve ser maior do que o preço da posição",
      label7:
          "O preço de stop profit não deve ser inferior ao preço da posição",
      label8:
          "O preço do lucro final não deve ser maior do que o preço da posição",
      label9: "O preço de stop loss não deve ser inferior ao preço da posição",
      label10: "Total fixo",
      label11: "Multi posição plana",
      label12: "Liquidar uma posição vazia",
    },
  },
  Assets: {
    title1: "Conta de moeda",
    title2: "Conta contratual",
    assets: "Total dos activos convertidos",
    search: "pesquisa",
    type: "tipo",
    chain: "Nome da Cadeia",
    CustomerService: "Entre em contato com o atendimento ao cliente!",
    accountEarnings: "Total dos rendimentos",
    todayEarnings: "Ganhos de hoje",
    nav: {
      one: "Os Meus Activos",
      two: "Detalhes do activo",
      three: "Gestão de endereços de retirada de moeda",
      four: "Activos contratuais",
      five: "Detalhes do activo",
      six: "Número detido",
      seven: "Margem de posição",
      eight: "Resultados realizados",
      nine: "Depósito confiado",
      ten: "Conversão de activos monetários",
      eleven: "Conversão de activos contratuais",
    },
    chargeBox: {
      title: "Endereço de cobrança:",
      record:
          "Veja o status de rastreamento dos registros de carregamento de moedas",
      id: "ID da transacção Blockchain:",
      time: "Hora da transacção da carteira:",
      details: "detalhes",
      label1:'Introduza números e letras de 4 a 64 dígitos'
    },
    mentionBox: {
      number: "Chegada real:",
      submit: "Enviar",
      tips: {
        one: "lembrete",
        two: "• Não recarregue quaisquer ativos que não sejam {coin} para o endereço acima, caso contrário, os ativos não serão recuperados.",
        three:
            "• Depois de limpar o endereço acima, você precisa ser confirmado por todo o nó da rede. Aguarde pacientemente neste processo",
        four: "• Valor mínimo de retirada: {min} {moeda}",
        five: "• Para garantir a segurança dos fundos, tentaremos notificá-lo através de anúncio do site ou e-mail quando a sua política de segurança da conta for alterada ou a sua senha for modificada.",
        six: "• Certifique-se de garantir a segurança do seu computador e navegador para evitar que as informações sejam adulteradas ou divulgadas.",
        seven:
            "• Quantidade mínima de recarga: {min} {moeda}. Recargas menores que o valor mínimo não serão postadas e não poderão ser devolvidas.",
      },
    },
    text: "Esconder pequenos activos",
    table: {
      one: "Nome da moeda",
      two: "Activos disponíveis",
      three: "Congelar activos",
      four: "Activos equivalentes",
      five: "operação",
      six: "moeda",
      seven: "Endereço de retirada",
      eight: "observações",
      nine: "data de pagamento",
      ten: "moeda",
      eleven: "tipo",
      twelve: "Quantidade de recarga",
      thirteen: "Taxa de serviço",
      fourteen: "tempo",
    },
    state: {
      sending: "À espera",
      completed: "Concluído",
      dismissed: "Rejeitado",
    },
    record: {
      one: "Recarregar o registo",
      two: "Registo de Retirada da Moeda",
      three: "Registo de transferência",
      four: "Operações de fundos",
      five: "Outros registos",
    },
    recordTable: { one: "Quantidade", two: "estado" },
    coin: "moeda",
    charge: "Recarregar dinheiro",
    mention: "Retirada da moeda",
    transfer: "Transferência",
    deal: "transacção",
    deleted: "apagar",
    add: "adicionar a",
    placeholder: "Indique o endereço de retirada",
    placeholder2: "Indique os comentários",
    placeholder3: "Indique por favor a senha da transacção",
    placeholder4: "Indique o valor da retirada",
    chargeDialog: {
      title: "Recarregar",
      address: "O endereço de recarga é o seguinte",
      copy: "Copiar o endereço",
      ercode: "Digitalizar o código QR para obter o endereço",
      tips: "lembrete",
      success: "A cópia foi bem sucedida",
    },
    transferDialog: {
      title: "Transferência de conta",
      from: "de",
      to: "alcance",
      all: "inteiro",
      hasChange: "Saldo transferível:",
      alert1: "Indique o valor da transferência",
      alert2: "Desculpa, o teu crédito está a acabar.",
      alert3: "Indique o valor da retirada",
      alert4: "Indique o endereço de retirada",
      min: "A quantidade mínima de retirada é",
      max: "O montante máximo de retirada é",
      btn: "Confirmar a transferência",
    },
    mentionDialog: {
      balance: "Saldo disponível:",
      address: "Observações do Endereço",
      number: "Quantidade retirada",
      password: "Senha da transacção",
      fee: "Taxa de serviço",
    },
    mentionAddress: {
      title: "Seleccione o endereço de retirada",
      no: "Sem endereço de retirada de moedas",
      btn: "Adicionar o endereço de retirada da moeda",
    },
    addAlert: "Adição com sucesso",
    delAlert: "A eliminação foi bem sucedida",
    cancel: "cancelar",
    comfirm: "determinar",
  },
  About: {
    bannerText: "Como podemos ajudar?",
    search: "pesquisa",
    placeholder:
        "Se você tiver alguma dúvida, deixe-me ajudá-lo a encontrar as respostas",
    title: "Informação relacionada",
    back: "retorno",
    result: "Procurar conteúdo relacionado",
    noBack: "Não foram encontrados resultados adequados",
    alert1: "Indique palavras-chave",
    nav: {
      one: "Anúncio importante",
      two: "Actividades mais recentes",
      three: "Aviso aos utilizadores",
      four: "Transacção cambial",
      five: "Transacção contratual",
      six: "Ajuda dos Noviços",
    },
  },
  message: {
    currency: {
      priceBtn: { fixPrice: "ordem de mercado", marketPrice: "ordem limite" },
      title: "Moedas",
      newpriceText: "Negociação ao melhor preço atual",
      leftAssets: "Total dos activos convertidos",
      allOrder: "Todas as Ordens",
      currency: "Transacção cambial",
      trading: "Recarregar",
      placeholder: "Procurar a moeda de recarga",
      hasUser: "Saldo:",
      buyPrice: "Preço de compra",
      buyNum: "Volume de compra",
      buyNow: "Comprar Agora",
      turnover: "Montante da transacção:",
      sellPrice: "Preço de venda",
      sellNum: "Volume de vendas",
      sellNow: "Vender Agora",
      entrust: {
        now: "Delegação actual",
        history: "História",
        introduce: "Introdução da moeda",
      },
      form: {
        trading: "Par de transacções",
        sj: "tempo",
        price: "Preço",
        quantity: "Quantidade",
        total: "Montante total confiado",
        operation: "operação",
        undo: "revogar",
        category: "tipo",
        buy: "compra",
        sell: "esgotar",
        wtprice: "Preço confiado",
        wtquantity: "Quantidade confiada",
        totalamount: "Volume de negócios total",
        wtTotle: "Montante total confiado",
        state: "estado",
        deal: "Fechado",
        hasUndo: "rescindido",
        unfilled: "Volume não processado",
      },
      rightNav: {
        currency: "moeda",
        price: "Preço mais recente",
        vol: "Volume de negócios",
        rise: "Para cima e para baixo",
      },
      marketNar: {
        titleLeft: "Deficiência",
        titleRight: "Transacção em tempo real",
        price: "Preço",
        num: "Quantidade",
        total: "Quantidade acumulada",
        time: "tempo",
      },
      lastPage: "página anterior",
      nextPage: "página seguinte",
      open: {
        title:
            "Você ainda não definiu a senha da transação. Você pode cobrar e transacionar após a autenticação",
        prompt: "Dicas",
        leftBtn: "cancelar",
        rightBtn: "determinar",
      },
      show: {
        price: "Por favor, preencha o preço",
        number: "Por favor, preencha a quantidade",
      },
    },
    noRecord: "Sem registo",
    noData: "Sem dados",
    k: {
      rose: "Aumento",
      high: "Preço máximo 24H",
      row: "Preço mais baixo 24H",
      vol: "Volume de negócios 24H",
      newPrice: "Preço de transacção",
    },
    data: {
      time: "tempo",
      open: "a cotação inicial:",
      close: "cotação final:",
      low: "Mínimo:",
      high: "mais alto:",
      volume: "Volume da transacção:",
    },
    tradingview: {
      navArr: { one: "Linha K", two: "Mapa de profundidade" },
      rise: "Lucros e perdas em tempo real",
      downtime: "contagem decrescente",
      surplus: "Excedente",
      deficit: "Perda",
    },
  },
  My: {
    credit: "reputação",
    cancel: "cancelar",
    comfirm: "confirmar",
    mine: "Centro Pessoal",
    safe: "Nível de segurança:",
    high: "alta",
    center: "em",
    low: "baixo",
    promite:
        "Recomenda-se habilitar a verificação da caixa de correio Recomenda-se habilitar a autenticação de nome real",
    Personal: "Segurança da conta",
    phone: "telemóvel",
    email: "caixa de correio",
    modifyPhone: "Modificar o número do telemóvel",
    modifyEmail: "Modificar a caixa de correio",
    phone_p: "ligação",
    Certification: "autenticação",
    Realname: "Autenticação de nomes reais",
    title2: "Gestão de senhas de segurança",
    title3: "outros",
    title4: "Senha de autenticação",
    title5: "Senha da transacção",
    title6: "Gestão de endereços",
    title7: "Enviar ordem de serviço",
    proTitle1:
        "É usado para login, retirada de moedas, recuperação de senha, modificação de senha e verificação de segurança durante o gerenciamento de AP",
    proTitle2: "Usado para fazer login e proteger a segurança da conta",
    proTitle3: "Utilizado para proteger a segurança das operações de capital",
    proTitle4:
        "Ele pode ser selecionado de forma rápida e precisa para retirar moedas",
    proTitle5: "O que você não sabe? Vir aqui pode ajudá-lo",
    proTitle6: "O cupom da plataforma é usado apenas para comprar moeda",
    proTitle7: "",
    set: "configurar",
    see: "ver",
    hasSet: "Definir",
    modify: "modificar",
    add: "adicionar a",
    del: "apagar",
    operation: "operação",
    save: "Obter código de verificação",
    phoneSave: "Verificação do telemóvel",
    emailSave: "Verificação da caixa de correio",
    placeholder: {
      phone: "Introduza o seu número de telemóvel",
      code: "Introduza o código de verificação",
      oldPass: "Indique por favor a senha antiga",
      newPass: "Introduza uma nova senha",
      passAgin: "Confirmar novo segredo",
      email: "Introduza o seu endereço de e-mail",
    },
    dialogTitle: {
      one: "Substituir o telemóvel ligado",
      two: "Alterar a Senha de Login",
      three: "Transferência de conta",
      four: "Seleccione o endereço de retirada",
      five: "Adicionar o endereço de retirada da moeda",
      six: "Substituir a caixa de correio vinculada",
      seven: "Autenticação de nomes reais",
      eight: "Modificar a senha da transacção",
      nine: "Adicionar o endereço de retirada da moeda",
      ten: "Seleccione o endereço de retirada",
      eleven: "Definir a senha da transacção",
    },
    realname: {
      success: "A autenticação do nome real foi bem sucedida!",
      review: "A autenticação de nome real está a ser analisada!",
    },
  },
  mine: {
    verified: "Certificado",
    certified: "Não certificado",
    copy: "A cópia foi bem sucedida",
  },
  Verified: {
    Name: "Nome completo",
    NameIpn: "Indique o nome do licenciado",
    type: "Tipo de documento",
    typeIpn: "ID",
    typeHz: "passaporte",
    onload: "Enviar a foto do ID",
    id: "Número de identificação",
    idIpn: "Indique por favor o número de identificação",
    zm: "Foto da frente (obrigatório)",
    fm: "Foto traseira (obrigatório)",
    sc: "Foto de mão (opcional)",
    pic: "Enviar imagens",
  },
  iphone: { phone: "número de telemóvel" },
  Coin: { bh: "rejeitar", sh: "Em análise" },
  alert: {
    password: "As duas senhas são inconsistentes.",
    password1: "Introduza 6 dígitos puros",
    password3: "A senha não pode estar vazia",
    code: "O código de verificação não pode estar vazio",
    realname: "O nome não pode estar vazio",
    idCard: "O número de identificação não pode estar vazio",
    address: "A entrada do endereço não pode estar vazia",
    notes: "A entrada da etiqueta não pode estar vazia",
    zm: "Carregar a frente e verso do certificado",
    min: `O número mínimo de transações é {num}`,
    max: `O número máximo de transações é {num}`,
  },
  AboutUs: {
    pro1: "Troca de criptomoedas multifuncional e democrática. Como a primeira empresa no mercado, fornecemos benefícios econômicos para usuários ativos. Coinbase Lite é um projeto geral, o que significa implementar soluções relacionadas a soluções de criptomoeda em várias camadas de negócios para facilitar o uso de nossos usuários.",
    title: "A nossa visão",
    pro2: "Estamos convencidos da ampla aplicação da tecnologia blockchain e dos benefícios da criptomoeda em um futuro próximo. Ao introduzir soluções globais, o ecossistema do mundo cripto tornou-se mais amigável para todos, não só por causa da inovação tecnológica, mas também por causa da educação.",
  },
  ...ptLocale
};

export default pt;