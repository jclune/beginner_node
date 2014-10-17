exports.csvparse = function(str) {
  if (typeof str !== 'string') throw new Error('arguments needs to be string.');
  return csvparse(str);
}

function csvparse(text) {
  if (!text) return [];
  var parser = new CsvParser(text);
  return parser.parse();
}

/**
 * CSVをオートマトンでパースする。
 */
var CsvParser = function(text) {
  this.state = CsvParser.STAT.READY;
  this.text = text;
  this.buf = '';
  this.record = [];
  this.methods = [
    this.ready,
    this.nonQuote,
    this.inquote,
    this.foundQuoteInQuote
  ];
  this.execute = this.methods[CsvParser.STAT.READY];
}

/* define state
 * 0: カラムを一文字も読み込んでいない状態
 * 1: " なしで読み込んでいる状態
 * 2: " ありで読み込んでいる状態
 * 3: 文字列中に " を見つけた状態
 */
CsvParser.STAT = {
  READY: 0,
  NONQUOTE: 1,
  INQUOTE: 2,
  FOUNDQUOTE: 3
};

/**
 * 1行分のCSVデータを配列にパースする。
 */
CsvParser.prototype.parse = function() {
  [].forEach.call(this.text, function(s) {
    this.execute(s);
  }, this);

  // stateがINQUOTEということは 開始" を見つけたが閉じ" を見つけなかった場合
  if (this.state == CsvParser.STAT.INQUOTE) throw new Error('Illegal CSV Format: ' + this.text);
  // 最後のフィールドが追加されていないので追加する
  this.commitBuf();
  return this.record;
}

/**
 * stateをセットし、状態の変化による処理も変更する。
 */
CsvParser.prototype.setState = function(state) {
  this.state = state;
  this.execute = this.methods[this.state];
}

/**
 * bufに文字を追加する。
 */
CsvParser.prototype.appendBuf = function(s) {
  this.buf += s;
};

/**
 * bufの内容をrecordに追加する。
 */
CsvParser.prototype.commitBuf = function() {
  if (this.state == CsvParser.STAT.NONQUOTE) {
    if (this.buf.lastIndexOf(' ') == this.buf.length - 1) {
      throw new Error('Illegal CSV Format: ' + this.text);
    }
  }
  this.record.push(this.buf);
  this.buf = '';
}

/**
 * フィールドを読み込んでいない状態の処理。
 */
CsvParser.prototype.ready = function(s) {
  if (s == '"') {
    this.setState(CsvParser.STAT.INQUOTE);
  } else if (s == ',') {
    this.commitBuf();
  } else if (s == ' ') {
    throw new Error('Illegal CSV Format: ' + this.text);
  } else {
    this.appendBuf(s);
    this.setState(CsvParser.STAT.NONQUOTE);
  }
}

/**
 * " なしでフィールドを読んでいる状態の処理。
 */
CsvParser.prototype.nonQuote = function(s) {
  if (s == '"') {
    throw new Error('Illegal CSV Format: ' + this.text);
  } else if (s == ',') {
    this.commitBuf();
    this.setState(CsvParser.STAT.READY);
  } else {
    this.appendBuf(s);
  }
}

/**
 * " ありでフィールドを読んでいる状態の処理。
 */
CsvParser.prototype.inquote = function(s) {
  if (s == '"') {
    this.setState(CsvParser.STAT.FOUNDQUOTE);
  } else {
    this.appendBuf(s);
  }
}

/**
 * " 読み込み中に " を見つけた状態の処理。
 */
CsvParser.prototype.foundQuoteInQuote = function(s) {
  if (s == '"') {
    this.appendBuf(s);
    this.setState(CsvParser.STAT.INQUOTE);
  } else if (s == ','){
    this.commitBuf();
    this.setState(CsvParser.STAT.READY);
  } else {
    throw new Error('Illegal CSV Format: ' + this.text);
  }
}