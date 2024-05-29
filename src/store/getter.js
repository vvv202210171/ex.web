const getters = {
  optionalAry(state) {
    if (state.optionalArr.length > 0) {
      return state.tradSymbol.filter((item) => {
        return state.optionalArr.some(
          (value) =>
            item.maincoin === value.maincoin && item.tradcoin == value.tradcoin
        );
      });
    } else {
      return state.optionalArr;
    }
  },
  noticeArr: (state) => {
    return state.noticeArr.filter((item) => item.type == 'notice');
  },

  stategyCoin: (state) => {
    return state.tradSymbol.filter((item) => item.state == 'enable');
  },

  chargeList: (state) => {
    let coinList = state.allCoinList;
    let coinListCopy = [];
    let coinNameArr = [];
    let resCoinData = [];

    if (coinList.length) {
      coinList.forEach((data) => {
        if (data.isin == 'enable') {
          coinListCopy.push(data);
          if (!coinNameArr.includes(data.coin)) {
            coinNameArr.push(data.coin);
          }
        }
      });

      coinNameArr.forEach((key) => {
        let coinData = { name: key, coinArr: [] };
        coinListCopy.forEach((data) => {
          if (data.coin == key) {
            coinData.coinArr.push(Object.assign({}, data));
          }
        });

        resCoinData.push(coinData);
      });

      return resCoinData;
    }
  },

  mentionList: (state) => {
    let coinList = state.allCoinList;
    let coinListCopy = [];
    let coinNameArr = [];
    let resCoinData = [];

    if (coinList.length) {
      coinList.forEach((data) => {
        if (data.isout == 'enable') {
          coinListCopy.push(data);
          if (!coinNameArr.includes(data.coin)) {
            coinNameArr.push(data.coin);
          }
        }
      });

      coinNameArr.forEach((key) => {
        let coinData = { name: key, coinArr: [] };
        coinListCopy.forEach((data) => {
          if (data.coin == key) {
            coinData.coinArr.push(Object.assign({}, data));
          }
        });

        resCoinData.push(coinData);
      });

      return resCoinData;
    }
  },

  banner: (state) => {
    if (i18n.locale == 'Ko') {
      return state.home.bannerKo;
    } else if (i18n.locale == 'En') {
      return state.home.bannerEn;
    } else {
      return state.home.bannerJp;
    }
  },
};
export default getters;
