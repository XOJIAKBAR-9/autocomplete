function BaseBuilder(value) {
  this._value = value;
}

BaseBuilder.prototype.get = function () {
  return this._value;
};

BaseBuilder.prototype.multiply = function (n) {
  this._value = this._value * n;
  return this;
};

BaseBuilder.prototype.divide = function (n) {
  if (typeof this._value === 'number') {
    this._value = Math.trunc(this._value / n);
  } else {
    this._value = this._value.slice(0, Math.floor(this._value.length / n));
  }
  return this;
};


class IntBuilder extends BaseBuilder {
  constructor(int = 0) {
    super(int);
  }

  plus(...n) {
    this._value = n.reduce((acc, num) => acc + num, this._value);
    return this;
  }

  minus(...n) {
    this._value = n.reduce((acc, num) => acc - num, this._value);
    return this;
  }

  multiply(n) {
    this._value = this._value * n;
    return this;
  }

  divide(n) {
    this._value = Math.trunc(this._value / n);
    return this;
  }

  mod(n) {
    this._value = this._value % n;
    return this;
  }

  static random(from, to) {
    return Math.floor(Math.random() * (to - from + 1)) + from;
  }
}


function StringBuilder(str) {
  BaseBuilder.call(this, str !== undefined ? str : '');
}

StringBuilder.prototype = Object.create(BaseBuilder.prototype);
StringBuilder.prototype.constructor = StringBuilder;

StringBuilder.prototype.plus = function (...str) {
  this._value = str.reduce((acc, s) => acc + s, this._value);
  return this;
};

StringBuilder.prototype.minus = function (n) {
  this._value = this._value.slice(0, this._value.length - n);
  return this;
};

StringBuilder.prototype.multiply = function (n) {
  this._value = this._value.repeat(n);
  return this;
};

StringBuilder.prototype.divide = function (n) {
  this._value = this._value.slice(0, Math.floor(this._value.length / n));
  return this;
};

StringBuilder.prototype.remove = function (str) {
  const parts = this._value.split(str);
  this._value = parts.join('');
  return this;
};

StringBuilder.prototype.sub = function (from, n) {
  this._value = this._value.slice(from, from + n);
  return this;
};