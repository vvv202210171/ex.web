<template>
  <div class="box allFlex column">
    <div class="chart-header allFlex listBg">
      <div class="header-left allFlex">
        <span class="navColor">{{ $t('message.tradingview.navArr.one') }}</span>
        <ul class="allFlex buttons">
          <li
            v-for="(item, key) in buttons"
            :key="key"
            class="button-item hand"
            :class="
              key === buttonIndex ? 'buttonActive mainColor' : 'greyColor'
            "
            @click="changeButton(key, item)"
          >
            {{ item.title }}
          </li>
          <li @click="showIndicators('insertIndicator')" class="hand greyColor">
            <i class="iconfont icon-fullscreen-copy hand"></i>
          </li>
          <li
            @click="showIndicators('scalesProperties')"
            class="hand greyColor"
          >
            <i class="iconfont icon-set1-copy hand"></i>
          </li>
        </ul>
      </div>
    </div>
    <div id="chart_container" ref="chart"></div>
  </div>
</template>

<script>
import { getKLine } from '@/api/Certain';
// import { MgetKLine } from '@/api/Target';
import { ZgetKLine } from '@/api/Cycle';
import { TgetKLine } from '@/api/Currency';
export default {
  name: 'tradingView',
  data() {
    return {
      tvTimer: null,
      buttons: [
        {
          title: '1min',
          resolution: '1',
          minutes: '1',
          chartType: 1,
          index: 0,
        },
        {
          title: '5min',
          resolution: '5',
          minutes: '5',
          chartType: 1,
          index: 1,
        },
        {
          title: '15min',
          resolution: '15',
          minutes: '15',
          chartType: 1,
          index: 2,
        },
        {
          title: '30min',
          resolution: '30',
          minutes: '30',
          chartType: 1,
          index: 3,
        },
        {
          title: '1hour',
          resolution: '60',
          minutes: '60',
          chartType: 1,
          index: 4,
        },
        {
          title: '4hour',
          resolution: '240',
          minutes: '240',
          chartType: 1,
          index: 5,
        },
        {
          title: '1Day',
          resolution: '1D',
          minutes: '1440',
          chartType: 1,
          index: 6,
        },
        {
          title: '1Week',
          resolution: '1W',
          minutes: '10080',
          chartType: 1,
          index: 7,
        },
        {
          title: '1Month',
          resolution: '1M',
          minutes: '43200',
          chartType: 1,
          index: 8,
        },
      ],
      interval: '15',
      chartType: (localStorage.getItem('tradingview.chartType') || '1') * 1,
      studies: [],
      currency1: 'USD',
      currency2: 'BTC',
      saved_chart: null,
      chart: null,
      feed: null,
      last_price: 1234.2365,
      bars: [],
      minutes: '1',
      index: 0,
      buttonIndex: 0,
      type: 0,
      newTime: 0,
      intervalTime: null,
      fullScreen: false,
      loadingShow: false,
      loadingOption: {
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.1)',
      },
      check: false,
      kData: {},
      them: window._config.them,
    };
  },
  watch: {
    tvNew(val) {
      if (val) {
        !this.check && this.feed._fireEvent('updataWs');
      }
    },
    kObj(val) {
      console.log(val);
      if (val.tradcoin && !this.chart) {
        this.initTradingview();
      }
    },
  },
  computed: {
    path() {
      return this.$route.path;
    },
    tvNew() {
      return this.$store.state.tvNew;
    },
  },

  props: {
    kObj: {
      type: Object,
      require: true,
      // default: {}
    },
  },

  methods: {
    showIndicators(str) {
      this.chart.chart().executeActionById(str);
    },

    changeButton(key, item) {
      let _this = this;
      this.loadingShow = this.$loading(_this.loadingOption);
      this.buttonIndex = key;
      this.check = true;
      localStorage.setItem('tradingview.resolution', item.resolution);
      localStorage.setItem('tradingview.chartType', item.chartType);
      localStorage.setItem('tvChange', false);
      this.exchange(localStorage.getItem('tradingview.resolution'));
      this.path == '/certain' && this.sendWsParams(this.kObj, 'contract');
      this.path == '/currency' && this.sendWsParams(this.kObj, 'trad');
      this.path == '/cycle' && this.sendWsParams(this.kObj, 'cycle');
      this.changePair();
    },
    createStudy() {
      let thats = this.chart;
      let id = thats
        .chart()
        .createStudy('Moving Average', false, false, [5], null, {
          'Plot.color': '#8a6bbe',
        });
      this.studies.push(id);
      id = thats
        .chart()
        .createStudy('Moving Average', false, false, [10], null, {
          'Plot.color': '#2EA9DF',
        });
      this.studies.push(id);
      id = thats
        .chart()
        .createStudy('Moving Average', false, false, [20], null, {
          'plot.color': '#1B8E31',
        });
      this.studies.push(id);
      id = thats
        .chart()
        .createStudy('Moving Average', false, false, [30], null, {
          'plot.color': '#C1328E',
        });
      this.studies.push(id);
    },
    initTradingview() {
      let _this = this;
      _this.feed = _this.createFeed();
      _this.chart = window.tvWidget = new TradingView.widget({
        fullscreen: false,
        autosize: true,
        symbol: _this.kObj.tradcoin + ':' + _this.kObj.maincoin,
        container_id: 'chart_container',
        datafeed: _this.feed,
        library_path: 'tradingview/custom_scripts/chart_main/',
        locale: 'en',
        charts_storage_api_version: '1.1', 
        client_id: 'tradingview.com',
        user_id: 'public_user_id',
        interval: '1',
        theme: _this.them,
        toolbar_bg: _this.them == 'dark' ? '#1f2331' : '#fff',
        allow_symbol_change: true,
        time_frames: [
          { text: '1y', resolution: '1W' },
          { text: '6m', resolution: '3D' },
          { text: '3m', resolution: '1D' },
          { text: '1m', resolution: '1D' },
          { text: '1w', resolution: '30' },
          { text: '3d', resolution: '30' },
          { text: '1d', resolution: '30' },
          { text: '6h', resolution: '15' },
          { text: '1h', resolution: '1' },
        ],
        drawings_access: {
          type: 'black',
          tools: [
            { name: 'Trend Line', grayed: true },
            { name: 'Trend Angle', grayed: true },
          ], //todo: bb
        },
        disabled_features: [
          'header_undo_redo',
          'header_symbol_search',
          'header_interval_dialog_button',
          'show_interval_dialog_on_key_press',
          'symbol_search_hot_key',
          'study_dialog_search_control',
          'display_market_status',
          'header_compare',
          'edit_buttons_in_legend',
          'symbol_info',
          'border_around_the_chart',
          'main_series_scale_menu',
          'star_some_intervals_by_default',
          'datasource_copypaste',
          'right_bar_stays_on_scroll',
          'context_menus',
          'go_to_date',
          'compare_symbol',
          'border_around_the_chart',
          'timezone_menu',
          'remove_library_container_border',
          'volume_force_overlay',
          'header_resolutions',
          'header_screenshot',
          'legend_context_menu',
          'header_chart_type',
          'header_indicators',
          'header_settings',
          'header_fullscreen_button',
          'header_widget_dom_node',
          'volume_force_overlay',
          'create_volume_indicator_by_default',
        ],
        enabled_features: [
          'move_logo_to_main_pane',
          'dont_show_boolean_study_arguments',
          'use_localstorage_for_settings',
          'remove_library_container_border',
          'save_chart_properties_to_local_storage',
          'side_toolbar_in_fullscreen_mode',
          'hide_last_na_study_output',
          'hide_last_na_study_output',
          'constraint_dialogs_movement',
          // 'legend_context_menu'
        ],
        loading_screen: {
          backgroundColor: '#1f2331',
          foregroundColor: '#D5DFED',
        },
        studies_overrides: {
          'volume.volume.color.0': '#fe4761',
          'volume.volume.color.1': '#3fcfb4',
          'volume.volume.transparency': 75,
        },
        customFormatters: {
          // 鼠标悬浮图表显示日期时间样式
          timeFormatter: {
            format: function (date) {
              let hours = date.getUTCHours()
              let minutes = date.getUTCMinutes()
              if (hours < 10) {
                hours = '0' + hours
              }
              if (minutes < 10) {
                minutes = '0' + minutes
              }
              return hours + ':' + minutes
            }
          },
          dateFormatter: {
            format: function (date) {
              let month = date.getUTCMonth() + 1
              let date1 = date.getUTCDate()
              if (date1 < 10) {
                date1 = '0' + date1
              }
              if (month < 10) {
                month = '0' + month
              }
              return date.getUTCFullYear() + '-' + month + '-' + date1
            }
          }
        },
        timezone: 'Asia/Shanghai',
        overrides: _this.getOverrides(_this.them),
        custom_css_url: 'chart.css',
      });
      _this.chart.onChartReady(function () {
        _this.createStudy();
      });
    },
    getOverrides(theme) {
      let themes = {
        light: {
          up: '#5aab57',
          down: 'rgb(250,82,82)',
          bg: '#fff',
          grid: '#2B2B2D',
          cross: '#8C90A1',
          border: '#9194a4',
          text: '#8C90A1',
          line: '#8C90A1',
        },
        dark: {
          up: 'rgb(18,184,134)',
          down: 'rgb(250,82,82)',
          bg: '#1f2331',
          grid: '#191c24',
          cross: '#ffffff',
          border: '#2f364c',
          text: '#848e9c',
          line: '#191c24',
        },
      };
      let t = themes[theme];
      return {
        volumePaneSize: 'medium',
        'scalesProperties.lineColor': t.text,
        'scalesProperties.textColor': t.text,
        'paneProperties.background': t.bg,
        'paneProperties.vertGridProperties.color': t.grid,
        'paneProperties.horzGridProperties.color': t.grid,
        'paneProperties.crossHairProperties.color': t.cross,
        'paneProperties.legendProperties.showLegend': !!t.showLegend,
        'paneProperties.legendProperties.showStudyArguments': !0,
        'paneProperties.legendProperties.showStudyTitles': !0,
        'paneProperties.legendProperties.showStudyValues': !0,
        'paneProperties.legendProperties.showSeriesTitle': !0,
        'paneProperties.legendProperties.showSeriesOHLC': !0,
        'mainSeriesProperties.candleStyle.upColor': t.up,
        'mainSeriesProperties.candleStyle.downColor': t.down,
        'mainSeriesProperties.candleStyle.drawWick': !0,
        'mainSeriesProperties.candleStyle.drawBorder': !0,
        'mainSeriesProperties.candleStyle.borderColor': t.border,
        'mainSeriesProperties.candleStyle.borderUpColor': t.up,
        'mainSeriesProperties.candleStyle.borderDownColor': t.down,
        'mainSeriesProperties.candleStyle.wickUpColor': t.up,
        'mainSeriesProperties.candleStyle.wickDownColor': t.down,
        'mainSeriesProperties.candleStyle.barColorsOnPrevClose': !1,
        'mainSeriesProperties.hollowCandleStyle.upColor': t.up,
        'mainSeriesProperties.hollowCandleStyle.downColor': t.down,
        'mainSeriesProperties.hollowCandleStyle.drawWick': !0,
        'mainSeriesProperties.hollowCandleStyle.drawBorder': !0,
        'mainSeriesProperties.hollowCandleStyle.borderColor': t.border,
        'mainSeriesProperties.hollowCandleStyle.borderUpColor': t.up,
        'mainSeriesProperties.hollowCandleStyle.borderDownColor': t.down,
        'mainSeriesProperties.hollowCandleStyle.wickColor': t.line,
        'mainSeriesProperties.haStyle.upColor': t.up,
        'mainSeriesProperties.haStyle.downColor': t.down,
        'mainSeriesProperties.haStyle.drawWick': !0,
        'mainSeriesProperties.haStyle.drawBorder': !0,
        'mainSeriesProperties.haStyle.borderColor': t.border,
        'mainSeriesProperties.haStyle.borderUpColor': t.up,
        'mainSeriesProperties.haStyle.borderDownColor': t.down,
        'mainSeriesProperties.haStyle.wickColor': t.border,
        'mainSeriesProperties.haStyle.barColorsOnPrevClose': !1,
        'mainSeriesProperties.barStyle.upColor': t.up,
        'mainSeriesProperties.barStyle.downColor': t.down,
        'mainSeriesProperties.barStyle.barColorsOnPrevClose': !1,
        'mainSeriesProperties.barStyle.dontDrawOpen': !1,
        'mainSeriesProperties.lineStyle.color': t.border,
        'mainSeriesProperties.lineStyle.linewidth': 1,
        'mainSeriesProperties.lineStyle.priceSource': 'close',
        'mainSeriesProperties.areaStyle.color1': t.areatop,
        'mainSeriesProperties.areaStyle.color2': t.areadown,
        'mainSeriesProperties.areaStyle.linecolor': t.border,
        'mainSeriesProperties.areaStyle.linewidth': 1,
        'mainSeriesProperties.areaStyle.priceSource': 'close',
        'scalesProperties.backgroundColor': 'red',
      };
    },
    changePair() {
      let _this = this;
      this.intervalTime && clearInterval(_this.intervalTime);
      this.intervalTime = null;
      if (this.chart && this.feed) {
        this.newTime = 0;
        this.feed._fireEvent('pair_change');
      }
    },
    createFeed() {
      let _this = this;
      let Datafeed = {};
      Datafeed.DataPulseUpdater = function (datafeed, updateFrequency) {
        this._datafeed = datafeed;
        this._subscribers = {};

        this._requestsPending = 0;
        let that = this;

        let update = () => {
          if (that._requestsPending > 0) {
            return;
          }
          for (let listenerGUID in that._subscribers) {
            let subscriptionRecord = that._subscribers[listenerGUID];
            let resolution = subscriptionRecord.resolution;
            _this.resolution = resolution;
            _this.symbolInfo = subscriptionRecord.symbolInfo;
            let datesRangeRight = parseInt(new Date().valueOf() / 1000);

            let datesRangeLeft = datesRangeRight - that.periodLengthSeconds(resolution, 10);
            that._requestsPending++;
            (function (_subscriptionRecord) {
              that._datafeed.getBars(
                _subscriptionRecord.symbolInfo,
                resolution,
                datesRangeLeft,
                datesRangeRight,
                (bars) => {
                  that._requestsPending--;
                  if (!that._subscribers.hasOwnProperty(listenerGUID)) {
                    return;
                  }

                  if (bars.length === 0) {
                    return;
                  }

                  let lastBar = bars[bars.length - 1];

                  if (
                    !isNaN(_subscriptionRecord.lastBarTime) &&
                    lastBar.time < _subscriptionRecord.lastBarTime
                  ) {
                    return;
                  }
                  let subscribers = _subscriptionRecord.listeners;

                  let isNewBar =
                    !isNaN(_subscriptionRecord.lastBarTime) &&
                    lastBar.time > _subscriptionRecord.lastBarTime;

                  if (isNewBar) {
                    if (bars.length < 2) {
                      throw new Error(
                        'Not enough bars in history for proper pulse update. Need at least 2.'
                      );
                    }

                    let previousBar = bars[bars.length - 2];
                    for (let i = 0; i < subscribers.length; ++i) {
                      subscribers[i](previousBar);
                    }
                  }
                  _subscriptionRecord.lastBarTime = lastBar.time;

                  for (let i = 0; i < subscribers.length; ++i) {
                    subscribers[i](lastBar);
                  }
                },

                function () {
                  that._requestsPending--;
                }
              );
            })(subscriptionRecord);
          }
        };

        if (typeof updateFrequency !== 'undefined' && updateFrequency > 0) {
          setInterval(update, updateFrequency);
        }
      };
      Datafeed.DataPulseUpdater.prototype.periodLengthSeconds = function (
        resolution,
        requiredPeriodsCount
      ) {
        let daysCount = 0;
        if (resolution === 'D') {
          daysCount = requiredPeriodsCount;
        } else if (resolution === 'M') {
          daysCount = 31 * requiredPeriodsCount;
        } else if (resolution === 'W') {
          daysCount = 7 * requiredPeriodsCount;
        } else {
          daysCount = (requiredPeriodsCount * resolution) / (24 * 60);
        }

        return daysCount * 24 * 60 * 60;
      };

      Datafeed.DataPulseUpdater.prototype.subscribeDataListener = function (
        symbolInfo,
        resolution,
        newDataCallback,
        listenerGUID
      ) {
        this._datafeed._logMessage('Subscribing ' + listenerGUID);

        if (!this._subscribers.hasOwnProperty(listenerGUID)) {
          this._subscribers[listenerGUID] = {
            symbolInfo: symbolInfo,
            resolution: resolution,
            lastBarTime: NaN,
            listeners: [],
          };
        }
        this._subscribers[listenerGUID].listeners.push(newDataCallback);
      };

      Datafeed.DataPulseUpdater.prototype.unsubscribeDataListener = function (
        listenerGUID
      ) {
        Datafeed.Container();
        // delete this._subscribers[listenerGUID]
      };

      Datafeed.Container = function (updateFrequency) {
        this._configuration = {
          supports_search: true,
          supports_group_request: false,
          supported_resolutions: [
            '1',
            '3',
            '5',
            '15',
            '30',
            '60',
            '120',
            '240',
            '360',
            '720',
            '1D',
            '3D',
            '1W',
            '1M',
          ],
          supports_marks: true,
          supports_timescale_marks: true,
          exchanges: ['myExchange'],
        };
        this._fireEvent = function (event, argument) {
          if (this._callbacks.hasOwnProperty(event)) {
            let callbacksChain = this._callbacks[event];
            for (let i = 0; i < callbacksChain.length; ++i) {
              callbacksChain[i](argument);
            }
            if (event == 'pair_change') {
              this._callbacks[event] = [];
            }
          }
        };

        this._barsPulseUpdater = new Datafeed.DataPulseUpdater(
          this,
          updateFrequency || 10 * 1000
        );
        this._enableLogging = true;
        this._callbacks = {};
        this._initializationFinished = true;
        this._fireEvent('initialized');
        this._fireEvent('configuration_ready');
      };

      Datafeed.Container.prototype._logMessage = function (message) {
        if (this._enableLogging) {
          // window.console.log(message);
          // let now = new Date()
        }
      };

      Datafeed.Container.prototype.on = function (event, callback) {
        if (!this._callbacks.hasOwnProperty(event)) {
          this._callbacks[event] = [];
        }

        this._callbacks[event].push(callback);
        return this;
      };

      Datafeed.Container.prototype.onReady =function (callback) {
        let that = this;
        if (this._configuration) {
          setTimeout(function () {
            callback(that._configuration);
          }, 0);
        } else {
          this.on('configuration_ready', () => {
            callback(that._configuration);
          });
        }
      };

      Datafeed.Container.prototype.resolveSymbol = function (
        symbolName,
        onSymbolResolvedCallback,
        onResolveErrorCallback
      ) {
        this._logMessage('GOWNO :: resolve symbol ' + symbolName);
        Promise.resolve().then(() => {
          function adjustScale() {
            if (_this.last_price > 1000) {
              return 1000000;
            } else {
              return 100000000;
            }
          }
          this._logMessage(
            'GOWNO :: onResultReady inject ' +
              _this.kObj.tradcoin +
              ' / ' +
              _this.kObj.maincoin
          );

          onSymbolResolvedCallback({
            name: _this.kObj.tradcoin + '/' + _this.kObj.maincoin,
            timezone: 'Asia/Shanghai',
            pricescale: Math.pow(10, _this.kObj.price_accuracy),
            minmov: 1,
            minmov2: 0,
            ticker: _this.kObj.tradcoin + '/' + _this.kObj.maincoin,
            description: '',
            session: '24x7',
            type: 'bitcoin',
            has_intraday: true,
            intraday_multipliers: ['1'],
            has_weekly_and_monthly: false,
            volume_precision: 8,
            has_no_volume: false,
            regular_session: '24x7',
          });
        });
      };

      Datafeed.Container.prototype.getBars = function (
        symbolInfo,
        resolution,
        rangeStartDate,
        rangeEndDate,
        onDataCallback,
        onErrorCallback
      ) {
        if (rangeStartDate > 0 && (rangeStartDate + '').length > 10) {
          throw new Error([
            'Got a JS time instead of Unix one.',
            rangeStartDate,
            rangeEndDate,
          ]);
        }
        onDataCallback([], { noData: true });
        // _this.request(onDataCallback);
      };

      Datafeed.Container.prototype.subscribeBars = function (
        symbolInfo,
        resolution,
        onRealtimeCallback,
        listenerGUID,
        onResetCacheNeededCallback
      ) {
        _this.path == '/certain' && _this.request1(onRealtimeCallback, true);
        _this.path == '/currency' && _this.request3(onRealtimeCallback, true);
        _this.path == '/cycle' && _this.request2(onRealtimeCallback, true);
        this.on('pair_change', () => {
          onResetCacheNeededCallback();
          _this.chart.activeChart?.().resetData();
        });

        //ws 重连
        this.on('updataWs', () => {
          _this.path == '/certain' &&
            _this.getWsNewData(onRealtimeCallback, 'updataCertain', 'coninfo');
          _this.path == '/currency' &&
            _this.getWsNewData(onRealtimeCallback, 'updataTrad', 'info');
          _this.path == '/cycle' &&
            _this.getWsNewData(onRealtimeCallback, 'updataCycle', 'cycleinfo');
        });
      };

      Datafeed.Container.prototype.unsubscribeBars = function (listenerGUID) {
        this._barsPulseUpdater.unsubscribeDataListener(listenerGUID);
      };

      return new Datafeed.Container();
    },
    updataSymbol(resData) {
      // console.log(resData);
      if (resData.consymbols) {
        resData.time = new Date().getTime();
        this.$store.commit('conSymbol', resData.consymbols);
        this.$store.commit('setMarketData', resData);
      }
      if (resData.symbols) {
        this.$store.commit('tradSymbol', resData.symbols);
      }

      if (resData.cyclesymbols) {
        this.$store.commit('cycleSymbol', resData.cyclesymbols);
      }
    },

    getWsNewData(callback, str, info) {
      this.$store.commit('tradingview', false);
      this.$ws.onmessage = (e) => {
        if (e.data) {
          let newData = {}
          try{
             if(e.data == 'pong'){
              return;
             }
             newData = JSON.parse(e.data);
          }catch (err){
            window.isReloadWs = true
            console.error('数据异常', e.data)
          }
          this.$store.commit(str, newData);
          this.updataSymbol(newData);

          if (info && newData[info]) {
            this.newPrice =
                newData[info].length > 0 ? Number(newData[info][0].price) : 0;
          }
          if (!newData.kline) {
            return;
          }

          let newLastObj =
              newData.kline.data.series[newData.kline.data.series.length - 1] ||
              '';
          if (newLastObj == '') return;

          // let newlastValue = newLastObj.split('|');
          newData.kline.data.series.forEach((item) => {
            let newBar = item.split('|');
            let obj = {
              time: this.changeTime(newBar[0]),
              open: Number(newBar[1]),
              high: Number(newBar[2]),
              low: Number(newBar[3]),
              close: Number(newBar[4]),
              volume: Number(newBar[5]),
            };
            if (obj.time >= this.lastTime && this.minutes == newData.kline.mine && !this.check) {
              this.lastTime = obj.time;
              callback(obj);
            }
          });
        }
      };
    },
    /**
     * f  优化时间
     */
    f(num) {
      return num < 10 ? `0${num}` : num;
    },

    sendWsParams(coinData, str) {
      if (this.$ws && this.$ws.readyState == 1) {
        localStorage.setItem('selectedParams', `${coinData.maincoin}_${coinData.tradcoin}_${str}_${this.minutes}`);
        //通知 ws 更新币种数据
        this.$ws.send(`${coinData.maincoin}_${coinData.tradcoin}_${str}_${this.minutes}`);
      } else {
        //如果ws没准备好  0.5s后再试
        setTimeout(() => {
          //通知 ws 更新币种数据
          this.sendWsParams(coinData, str);
        }, 500);
      }
    },

    /**
     * exchange  时间周期转换成对应的分钟
     */
    exchange(num) {
      if (num === '1D') {
        this.minutes = 1440;
        this.type = 1;
      } else if (num === '1W') {
        this.minutes = 10080;
        this.type = 2;
      } else if (num == '1M') {
        this.minutes = 43200;
        this.type = 3;
      } else {
        this.type = 0;
        this.minutes = num;
      }
    },
    //周期
    request1(callback, bool) {
      let _this = this;
      // this.loadingShow()
      this.exchange(localStorage.getItem('tradingview.resolution'));
      this.bars = [];
      let count = bool ? 300 : 2;
      let data = {
        mine: this.minutes,
        type: this.type,
        pairname: `${this.kObj.tradcoin}/${this.kObj.maincoin}`,
        count: count,
        date: this.newTime,
      };

      getKLine(data)
        .then((res) => {
          this.loadingShow && this.loadingShow.close();
          if (res.code == '200') {
            this.newTime = this.getTime2(new Date());
            if (res.data.series.length > 0) {
              let lastObj = res.data.series[res.data.series.length - 1];
              let lastValue = lastObj.split('|');
              this.lastTime = this.changeTime(lastValue[0]);
              res.data.series.forEach((bar) => {
                let value = bar.split('|');
                let obj = {
                  open: Number(value[1]),
                  close: Number(value[4]),
                  high: Number(value[2]),
                  time: this.changeTime(value[0]),
                  low: Number(value[3]),
                  volume: Number(value[5]),
                };
                callback(obj);
              });
              this.check = false;
            }
            if (bool && this.intervalTime == null) {
              this.getWsNewData(callback, 'updataCertain', 'coninfo');
            }
          }
        })
        .catch(() => {
          this.loadingShow && this.loadingShow.close();
        });
    },

    //杠杠
    request2(callback, bool) {
      let _this = this;
      // this.loadingShow()
      this.exchange(localStorage.getItem('tradingview.resolution'));
      this.bars = [];
      let count = bool ? 300 : 2;
      let data = {
        mine: this.minutes,
        type: this.type,
        pairname: `${this.kObj.tradcoin}/${this.kObj.maincoin}`,
        count: count,
        date: this.newTime,
      };

      ZgetKLine(data)
        .then((res) => {
          this.loadingShow && this.loadingShow.close();
          if (res.code == '200') {
            this.newTime = this.getTime2(new Date());
            if (res.data.series.length > 0) {
              let lastObj = res.data.series[res.data.series.length - 1];
              let lastValue = lastObj.split('|');
              this.lastTime = this.changeTime(lastValue[0]);
              res.data.series.forEach((bar) => {
                let value = bar.split('|');
                let obj = {
                  open: Number(value[1]),
                  close: Number(value[4]),
                  high: Number(value[2]),
                  time: this.changeTime(value[0]),
                  low: Number(value[3]),
                  volume: Number(value[5]),
                };
                callback(obj);
              });
              this.check = false;
            }
            if (bool && this.intervalTime == null) {
              this.getWsNewData(callback, 'updataCycle', 'coninfo');
            }
          }
        })
        .catch(() => {
          this.loadingShow && this.loadingShow.close();
        });
    },
    // 币币
    request3(callback, bool) {
      console.log(`${this.kObj.tradcoin}/${this.kObj.maincoin}`);
      let _this = this;
      // this.loadingShow()
      this.exchange(localStorage.getItem('tradingview.resolution'));
      this.bars = [];
      let count = bool ? 300 : 2;
      let data = {
        mine: this.minutes,
        type: this.type,
        pairname: `${this.kObj.tradcoin}/${this.kObj.maincoin}`,
        count: count,
        date: this.newTime,
      };

      TgetKLine(data)
        .then((res) => {
          this.loadingShow && this.loadingShow.close();
          if (res.code == '200') {
            this.newTime = this.getTime2(new Date());
            if (res.data.series.length > 0) {
              let lastObj = res.data.series[res.data.series.length - 1];
              let lastValue = lastObj.split('|');
              this.lastTime = this.changeTime(lastValue[0]);
              res.data.series.forEach((bar) => {
                let value = bar.split('|');
                let obj = {
                  open: Number(value[1]),
                  close: Number(value[4]),
                  high: Number(value[2]),
                  time: this.changeTime(value[0]),
                  low: Number(value[3]),
                  volume: Number(value[5]),
                };

                callback(obj);
              });
              this.check = false;
            }
            if (bool && this.intervalTime == null) {
              this.getWsNewData(callback, 'updataTrad', 'cycleinfo');
            }
          }
        })
        .catch(() => {
          this.loadingShow && this.loadingShow.close();
        });
    },
    getTime2(newDate) {
      return `${newDate.getFullYear()}-${this.ff(
        newDate.getMonth() + 1
      )}-${this.ff(newDate.getDate())} ${this.ff(newDate.getHours())}:${this.ff(
        newDate.getMinutes()
      )}:${this.ff(newDate.getSeconds())}`;
    },
    ff(val) {
      return Number(val) < 10 ? `0${val}` : val;
    },
    changeTime(date) {
      let str = date.replace(
        /^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/,
        '$1/$2/$3 $4:$5:$6'
      );
      // let dd = new Date(str);
      // const sq = 8;
      // const len = dd.getTime();
      // const offset = dd.getTimezoneOffset() * 60000;
      // const utcTime = len + offset;
      // dd = new Date(utcTime + 3600000 * sq).getTime();
      return new Date(str).getTime();
    },
    getTLWTime(date, type) {
      const Y = this.ff(date.getFullYear());
      const M = this.ff(date.getMonth() + 1);
      const D = this.ff(date.getDate());
      const h = this.ff(date.getHours());
      const m = this.ff(date.getMinutes());
      const s = this.ff(date.getSeconds());
      return type == 'year' ? `${Y}:${M}:${D}` : `${h}:${m}:${s}`;
      // return `${h}:${m}:${s}`;
    },
  },
  created() {
    let _this = this;
    localStorage.removeItem('tradingview.chartproperties');
    localStorage.removeItem('tradingview.settings');

    localStorage.setItem('tvChange', false);
    this.check = true;
    let selectedParams = localStorage.getItem('selectedParams');

    if (selectedParams) {
      let minutes = selectedParams.slice(selectedParams.lastIndexOf('_') + 1);
      this.minutes = minutes;
      let arr = this.buttons.filter((item) => item.minutes == minutes);

      this.buttonIndex = arr[0].index;

      localStorage.setItem('tradingview.resolution', minutes);
    } else {
      localStorage.setItem('tradingview.resolution', '1');
    }

    //监听左边点击事件
    this.$bus.$on('tradingviewCon', () => {
      this.intervalTime && clearInterval(_this.intervalTime);
      this.intervalTime = null;
      this.check = true;
      if (this.chart) {
        this.chart.onChartReady(() => {
          this.changePair();
        });
      }
    });
    this.$bus.$on('tradingviewCy', () => {
      this.intervalTime && clearInterval(_this.intervalTime);
      this.intervalTime = null;
      this.check = true;
      if (this.chart) {
        this.chart.onChartReady(() => {
          this.changePair();
        });
      }
    });
    this.$bus.$on('tradingviewCur', () => {
      this.intervalTime && clearInterval(_this.intervalTime);
      this.intervalTime = null;
      this.check = true;
      if (this.chart) {
        this.chart.onChartReady(() => {
          this.changePair();
        });
      }
    });
  },
  destroyed() {
    let _this = this;
    clearInterval(_this.intervalTime);
  },
  mounted() {
    if (this.kObj.tradcoin) {
      this.initTradingview();
    }
  },
};
</script>

<style scoped lang="scss">
#chart_container {
  flex: 1;
  background: transparent;
}
.box {
  height: 100%;
}
.chart-header {
  height: 40px;
  padding: 0 15px 0 10px;
}
.header-left {
  display: flex;
  align-items: center;
}
.header-left span {
  margin-right: 17px;
  font-size: 19px;
  /*font-weight: bold;*/
}
.buttons {
  min-width: 550px;
  align-items: center;
}
.buttons li {
  i {
    font-size: 20px;
  }
}
.buttons li:hover {
  color: $mainColor;
}
.button-item {
  font-size: 12px;
}

.leftBorder {
  border-left: 0;
}
.rightBorder {
  border-right: 0;
}
</style>
