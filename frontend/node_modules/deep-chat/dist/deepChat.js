function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var n = 0, F = function F() {}; return { s: F, n: function (_n17) { function n() { return _n17.apply(this, arguments); } n.toString = function () { return _n17.toString(); }; return n; }(function () { return n >= r.length ? { done: !0 } : { done: !1, value: r[n++] }; }), e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _wrapNativeSuper(t) { var r = "function" == typeof Map ? new Map() : void 0; return _wrapNativeSuper = function _wrapNativeSuper(t) { if (null === t || !_isNativeFunction(t)) return t; if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function"); if (void 0 !== r) { if (r.has(t)) return r.get(t); r.set(t, Wrapper); } function Wrapper() { return _construct(t, arguments, _getPrototypeOf(this).constructor); } return Wrapper.prototype = Object.create(t.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf(Wrapper, t); }, _wrapNativeSuper(t); }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _isNativeFunction(t) { try { return -1 !== Function.toString.call(t).indexOf("[native code]"); } catch (n) { return "function" == typeof t; } }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var m = "classList",
  _ = "style",
  S = function S() {
    var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "div";
    return document.createElement(i);
  };
var Ro = /*#__PURE__*/function () {
  function Ro() {
    _classCallCheck(this, Ro);
  }
  return _createClass(Ro, null, [{
    key: "render",
    value: function render(e, t) {
      var n = S();
      n.id = "error-view", n.innerText = t, e.replaceChildren(n);
    }
  }]);
}();
var ys = /*#__PURE__*/function () {
  function ys() {
    _classCallCheck(this, ys);
  }
  return _createClass(ys, null, [{
    key: "onLoad",
    value: function onLoad(e) {
      e.innerHTML = '<div id="loading-validate-key-property"></div>';
    }
  }, {
    key: "createElements",
    value: function createElements() {
      var e = S();
      return e.id = "validate-property-key-view", e;
    }
  }, {
    key: "render",
    value: function render(e, t, n) {
      var s = ys.createElements(),
        r = {
          onSuccess: t,
          onFail: Ro.render.bind(this, e, "Your 'key' has failed authentication"),
          onLoad: ys.onLoad.bind(this, s)
        };
      n.key && n.verifyKey(n.key, r), e.replaceChildren(s);
    }
  }]);
}();
var Kt = "submit-button",
  Ys = "loading-button",
  mn = "disabled-button",
  er = "text-input-container-left-adjustment",
  tr = "text-input-container-right-adjustment",
  nr = "text-input-container-left-small-adjustment",
  sr = "text-input-container-right-small-adjustment",
  Xn = "inside-left",
  ut = "inside-right",
  Te = "outside-left",
  ue = "outside-right",
  je = "dropup-menu",
  x = "default",
  Ce = "hover",
  H = "click";
var Q = /*#__PURE__*/function () {
  function Q() {
    _classCallCheck(this, Q);
  }
  return _createClass(Q, null, [{
    key: "unsetStyle",
    value: function unsetStyle(e, t) {
      var n = Object.keys(t).reduce(function (s, r) {
        return s[r] = "", s;
      }, {});
      Object.assign(e[_], n);
    }
  }, {
    key: "unsetActivityCSSMouseStates",
    value: function unsetActivityCSSMouseStates(e, t) {
      t[H] && Q.unsetStyle(e, t[H]), t[Ce] && Q.unsetStyle(e, t[Ce]);
    }
  }, {
    key: "unsetAllCSSMouseStates",
    value: function unsetAllCSSMouseStates(e, t) {
      Q.unsetActivityCSSMouseStates(e, t), t[x] && Q.unsetStyle(e, t[x]);
    }
    // if you want to asdd default styling - use pure css classes
  }, {
    key: "processStateful",
    value: function processStateful(e) {
      var t = e[x] || {},
        n = Object.assign(JSON.parse(JSON.stringify(t)), e == null ? void 0 : e[Ce]),
        s = Object.assign(JSON.parse(JSON.stringify(n)), e == null ? void 0 : e[H]);
      return _defineProperty(_defineProperty(_defineProperty({}, x, t), Ce, n), H, s);
    }
  }, {
    key: "mergeStatefulStyles",
    value: function mergeStatefulStyles(e) {
      var t = _defineProperty(_defineProperty(_defineProperty({}, x, {}), Ce, {}), H, {});
      return e.forEach(function (n) {
        t[x] = Object.assign(t[x], n[x]), t[Ce] = Object.assign(t[Ce], n[Ce]), t[H] = Object.assign(t[H], n[H]);
      }), t;
    }
  }, {
    key: "overwriteDefaultWithAlreadyApplied",
    value: function overwriteDefaultWithAlreadyApplied(e, t) {
      Object.keys(e[x] || []).forEach(function (n) {
        var r;
        var s = n;
        t[_][s] && (r = e[x]) != null && r[s] && (e[x][n] = t[_][s]);
      });
    }
  }, {
    key: "applyToStyleIfNotDefined",
    value: function applyToStyleIfNotDefined(e, t) {
      for (var n in t) {
        var s = t[n];
        e[n] === "" && s && (e[n] = s);
      }
    }
  }]);
}();
var It = /*#__PURE__*/function () {
  function It() {
    _classCallCheck(this, It);
  }
  return _createClass(It, null, [{
    key: "attemptAppendStyleSheetToHead",
    value: function attemptAppendStyleSheetToHead(e) {
      if (e.fontFamily && e.fontFamily !== It.DEFAULT_FONT_FAMILY) return;
      var t = document.getElementsByTagName("head")[0];
      if (!Array.from(t.getElementsByTagName("link")).some(function (s) {
        return s.getAttribute("href") === It.FONT_URL;
      })) {
        var s = S("link");
        s.rel = "stylesheet", s.href = It.FONT_URL, t.appendChild(s);
      }
    }
  }]);
}();
It.FONT_URL = "https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap", It.DEFAULT_FONT_FAMILY = "'Inter', sans-serif, Avenir, Helvetica, Arial";
var bs = It;
var Yt = /*#__PURE__*/function () {
  function Yt() {
    _classCallCheck(this, Yt);
  }
  return _createClass(Yt, null, [{
    key: "apply",
    value: function apply(e, t) {
      if (t) try {
        Yt.applyStyleSheet(e, t);
      } catch (_unused) {
        Yt.addStyleElement(e, t);
      }
    }
  }, {
    key: "applyStyleSheet",
    value: function applyStyleSheet(e, t) {
      var n = new CSSStyleSheet();
      n.replaceSync(e), t.adoptedStyleSheets.push(n);
    }
  }, {
    key: "addStyleElement",
    value: function addStyleElement(e, t) {
      var n = S("style");
      n.innerHTML = e, t.appendChild(n);
    }
  }, {
    key: "applyDefaultStyleToComponent",
    value: function applyDefaultStyleToComponent(e, t) {
      t && Q.applyToStyleIfNotDefined(e, t), Q.applyToStyleIfNotDefined(e, Yt.DEFAULT_COMPONENT_STYLE);
    }
  }]);
}();
Yt.DEFAULT_COMPONENT_STYLE = {
  height: "350px",
  width: "320px",
  borderTop: "1px solid #cacaca",
  borderRight: "1px solid #cacaca",
  borderLeft: "1px solid #cacaca",
  borderBottom: "1px solid #cacaca",
  fontFamily: bs.DEFAULT_FONT_FAMILY,
  fontSize: "0.9rem",
  backgroundColor: "white",
  position: "relative",
  // this is used to prevent inputAreaStyle background color from going beyond the container's rounded border
  // it will cause issues if there are elements that are meant to be outside of the chat component and in
  // that instance they should overwrite this
  // this is also causing the chat to squeeze when there is no space
  overflow: "hidden"
};
var Fn = Yt;
var Z = "service",
  h = "text",
  R = "html",
  f = "error",
  q = "https://deepchat.dev/docs/",
  W = "ai",
  U = "user",
  gt = "assistant",
  vs = "error-message-text",
  ds = "deep-chat-outer-container-role-",
  ir = "empty-message",
  Qs = "deep-chat-top-message",
  rr = "deep-chat-middle-message",
  ei = "deep-chat-bottom-message",
  Y = "src",
  C = "type",
  le = "file",
  y = "files",
  j = "image",
  z = "images",
  Re = "camera",
  sn = "gifs",
  P = "audio",
  Xe = "microphone",
  Jr = "mixedFiles",
  Ut = "any",
  Kr = "file-message",
  Mt = /*#__PURE__*/function () {
    function Mt() {
      _classCallCheck(this, Mt);
    }
    return _createClass(Mt, null, [{
      key: "buildElement",
      value: function buildElement() {
        var e = S();
        e[m].add("tooltip");
        var t = S("span");
        return t[m].add("tooltip-text"), e.appendChild(t), e;
      }
    }, {
      key: "tryCreateConfig",
      value: function tryCreateConfig(e, t) {
        if (t) return typeof t == "boolean" ? _defineProperty({}, h, e) : _defineProperty(_defineProperty(_defineProperty({}, h, t[h] || e), "timeout", t.timeout || 0), "style", t[_]);
      }
    }, {
      key: "traverseParentUntilContainer",
      value: function traverseParentUntilContainer(e) {
        var t = e;
        for (; t.parentElement;) t = t.parentElement;
        return t;
      }
    }, {
      key: "setPosition",
      value: function setPosition(e, t) {
        var s = t.getRootNode().host.getBoundingClientRect(),
          r = e.getBoundingClientRect(),
          a = t.getBoundingClientRect().width / 2,
          c = r.left + r.width / 2;
        t[_].left = "".concat(c - a - s.left, "px"), t[_].top = "".concat(r.top - 36 - s.top, "px");
        var l = t.getBoundingClientRect();
        l.left < s.left ? t[_].left = "".concat(Mt.OVERFLOW_NEW_POSITION_PX, "px") : l.right > s.right && (t[_].left = "".concat(s.width - l.width - Mt.OVERFLOW_NEW_POSITION_PX, "px"));
      }
    }, {
      key: "display",
      value: function display(e, t, n) {
        return n || (n = Mt.traverseParentUntilContainer(e).nextSibling), t[h] && (n.children[0].textContent = t[h]), {
          timeout: setTimeout(function () {
            n[_].visibility = "visible", Mt.setPosition(e, n), t[_] && Object.assign(n[_], t[_]);
          }, t.timeout || 0),
          element: n
        };
      }
    }, {
      key: "hide",
      value: function hide(e, t) {
        clearTimeout(e.timeout), e.element[_].visibility = "hidden", t[_] && Q.unsetStyle(e.element, t[_]), e.element[_].left = "", e.element[_].top = "";
      }
    }]);
  }();
Mt.OVERFLOW_NEW_POSITION_PX = 4;
var Qe = Mt;
var Gn = /*#__PURE__*/_createClass(function Gn() {
  _classCallCheck(this, Gn);
});
Gn.IS_SAFARI = /^((?!chrome|android).)*safari/i.test(navigator.userAgent), Gn.IS_CHROMIUM = window.chrome, Gn.IS_MOBILE = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
var Oe = Gn;
var pe = /* @__PURE__ */function (i) {
  return i.ESCAPE = "Escape", i.ENTER = "Enter", i.TAB = "Tab", i.ARROW_UP = "ArrowUp", i.ARROW_DOWN = "ArrowDown", i.ARROW_RIGHT = "ArrowRight", i.ARROW_LEFT = "ArrowLeft", i.BACKSPACE = "Backspace", i.DELETE = "Delete", i.META = "Meta", i.CONTROL = "Control", i;
}(pe || {});
var kt = /*#__PURE__*/function () {
  function kt() {
    _classCallCheck(this, kt);
  }
  return _createClass(kt, null, [{
    key: "add",
    value:
    // prettier-ignore
    function add(e, t, n, s) {
      n !== void 0 && e.addEventListener("keydown", kt.onKeyDown.bind(this, n)), e.oninput = kt.onInput.bind(this, n, s), e.addEventListener("paste", function (r) {
        var o;
        r.preventDefault(), (o = r.clipboardData) != null && o[y].length && t.addFilesToAnyType(Array.from(r.clipboardData[y]));
      });
    }
    // preventing insertion early for a nicer UX
    // prettier-ignore
  }, {
    key: "onKeyDown",
    value: function onKeyDown(e, t) {
      var s = t.target.textContent;
      s && s.length >= e && !kt.PERMITTED_KEYS.has(t.key) && !kt.isKeyCombinationPermitted(t) && t.preventDefault();
    }
  }, {
    key: "isKeyCombinationPermitted",
    value: function isKeyCombinationPermitted(e) {
      return e.key === "a" ? e.ctrlKey || e.metaKey : !1;
    }
  }, {
    key: "onInput",
    value: function onInput(e, t, n) {
      var s = n.target,
        r = s.textContent || "";
      e !== void 0 && r.length > e && (s.textContent = r.substring(0, e), Ht.focusEndOfInput(s)), t == null || t();
    }
  }]);
}();
kt.PERMITTED_KEYS = /* @__PURE__ */new Set([pe.BACKSPACE, pe.DELETE, pe.ARROW_RIGHT, pe.ARROW_LEFT, pe.ARROW_DOWN, pe.ARROW_UP, pe.META, pe.CONTROL, pe.ENTER]);
var ri = kt;
var Io = /*#__PURE__*/function () {
  function Io() {
    _classCallCheck(this, Io);
  }
  return _createClass(Io, null, [{
    key: "sanitizePastedTextContent",
    value: function sanitizePastedTextContent(e) {
      var n, s;
      e.preventDefault();
      var t = (n = e.clipboardData) == null ? void 0 : n.getData("text/plain");
      t && ((s = document.execCommand) == null || s.call(document, "insertText", !1, t));
    }
  }]);
}();
var Ot = /*#__PURE__*/function () {
  function Ot(e, t, n) {
    var _this = this;
    _classCallCheck(this, Ot);
    var r, o;
    this._isComposing = !1;
    var s = Ot.processConfig(t, e.textInput);
    this.elementRef = Ot.createContainerElement((r = s == null ? void 0 : s.styles) == null ? void 0 : r.container), this._config = s, this.inputElementRef = this.createInputElement(), this.elementRef.appendChild(this.inputElementRef), e.setPlaceholderText = this.setPlaceholderText.bind(this), e.setPlaceholderText(((o = this._config.placeholder) == null ? void 0 : o[h]) || "Ask me anything!"), setTimeout(function () {
      ri.add(_this.inputElementRef, n, _this._config.characterLimit, e._validationHandler), _this._onInput = t.onInput;
    });
  }
  return _createClass(Ot, [{
    key: "clear",
    value:
    // this also similarly prevents scroll up
    function clear() {
      var t, n;
      var e = window.scrollY;
      this.inputElementRef[m].contains("text-input-disabled") || (Object.assign(this.inputElementRef[_], (t = this._config.placeholder) == null ? void 0 : t[_]), this.inputElementRef.textContent = "", Ht.focusEndOfInput(this.inputElementRef), (n = this._onInput) == null || n.call(this, !1)), Oe.IS_CHROMIUM && window.scrollTo({
        top: e
      });
    }
  }, {
    key: "createInputElement",
    value: function createInputElement() {
      var t, n, s, r;
      var e = S();
      return e.id = Ot.TEXT_INPUT_ID, e[m].add("text-input-styling"), e.role = "textbox", Oe.IS_MOBILE && e.setAttribute("tabindex", "0"), Oe.IS_CHROMIUM && Ot.preventAutomaticScrollUpOnNewLine(e), typeof this._config.disabled == "boolean" && this._config.disabled === !0 ? (e.contentEditable = "false", e[m].add("text-input-disabled"), e.setAttribute("aria-disabled", "true")) : (e.contentEditable = "true", e.removeAttribute("aria-disabled"), this.addEventListeners(e)), Object.assign(e[_], (t = this._config.styles) == null ? void 0 : t[h]), Object.assign(e[_], (n = this._config.placeholder) == null ? void 0 : n[_]), (r = (s = this._config.placeholder) == null ? void 0 : s[_]) != null && r.color || e.setAttribute("textcolor", ""), e;
    }
  }, {
    key: "removePlaceholderStyle",
    value: function removePlaceholderStyle() {
      var e, t, n, s;
      !this.inputElementRef[m].contains("text-input-disabled") && (e = this._config.placeholder) != null && e[_] && (Q.unsetStyle(this.inputElementRef, (t = this._config.placeholder) == null ? void 0 : t[_]), Object.assign(this.inputElementRef[_], (s = (n = this._config) == null ? void 0 : n.styles) == null ? void 0 : s[h]));
    }
  }, {
    key: "addEventListeners",
    value: function addEventListeners(e) {
      var _this2 = this;
      var t, n;
      (t = this._config.styles) != null && t.focus && (e.onfocus = function () {
        var s;
        return Object.assign(_this2.elementRef[_], (s = _this2._config.styles) == null ? void 0 : s.focus);
      }, e.onblur = this.onBlur.bind(this, this._config.styles.focus, (n = this._config.styles) == null ? void 0 : n.container)), e.addEventListener("keydown", this.onKeydown.bind(this)), e.addEventListener("input", this.onInput.bind(this)), e.addEventListener("paste", Io.sanitizePastedTextContent), e.addEventListener("compositionstart", function () {
        return _this2._isComposing = !0;
      }), e.addEventListener("compositionend", function () {
        return _this2._isComposing = !1;
      });
    }
  }, {
    key: "onBlur",
    value: function onBlur(e, t) {
      Q.unsetStyle(this.elementRef, e), t && Object.assign(this.elementRef[_], t);
    }
  }, {
    key: "onKeydown",
    value: function onKeydown(e) {
      var t;
      e.key === pe.ENTER && !Oe.IS_MOBILE && !this._isComposing && !e.ctrlKey && !e.shiftKey && (e.preventDefault(), (t = this.submit) == null || t.call(this));
    }
  }, {
    key: "onInput",
    value: function onInput() {
      var e, t;
      this.isTextInputEmpty() ? Object.assign(this.inputElementRef[_], (e = this._config.placeholder) == null ? void 0 : e[_]) : this.removePlaceholderStyle(), (t = this._onInput) == null || t.call(this, !0);
    }
  }, {
    key: "setPlaceholderText",
    value: function setPlaceholderText(e) {
      this.inputElementRef.setAttribute("deep-chat-placeholder-text", e), this.inputElementRef.setAttribute("aria-label", e);
    }
  }, {
    key: "isTextInputEmpty",
    value: function isTextInputEmpty() {
      return this.inputElementRef.textContent === "";
    }
  }], [{
    key: "processConfig",
    value: function processConfig(e, t) {
      var _t$disabled, _t$placeholder, _n$h;
      var n;
      return t !== null && t !== void 0 ? t : t = {}, (_t$disabled = t.disabled) !== null && _t$disabled !== void 0 ? _t$disabled : t.disabled = e.isTextInputDisabled, (_t$placeholder = t.placeholder) !== null && _t$placeholder !== void 0 ? _t$placeholder : t.placeholder = {}, (_n$h = (n = t.placeholder)[h]) !== null && _n$h !== void 0 ? _n$h : n[h] = e.textInputPlaceholderText, t;
    }
  }, {
    key: "createContainerElement",
    value: function createContainerElement(e) {
      var t = S();
      return t.id = "text-input-container", Object.assign(t[_], e), t;
    }
    // this is is a bug fix where if the browser is scrolled down and the user types in text that creates new line
    // the browser scrollbar will move up which leads to undesirable UX.
    // More details in this Stack Overflow question:
    // https://stackoverflow.com/questions/76285135/prevent-automatic-scroll-when-text-is-inserted-into-contenteditable-div
    // prettier-ignore
  }, {
    key: "preventAutomaticScrollUpOnNewLine",
    value: function preventAutomaticScrollUpOnNewLine(e) {
      var t;
      e.addEventListener("keydown", function () {
        t = window.scrollY;
      }), e.addEventListener("input", function () {
        t !== window.scrollY && window.scrollTo({
          top: t
        });
      });
    }
  }]);
}();
Ot.TEXT_INPUT_ID = "text-input";
var _s = Ot;
var Ht = /*#__PURE__*/function () {
  function Ht() {
    _classCallCheck(this, Ht);
  }
  return _createClass(Ht, null, [{
    key: "focusEndOfInput",
    value: function focusEndOfInput(e) {
      var t = document.createRange();
      t.selectNodeContents(e), t.collapse(!1);
      var n = window.getSelection();
      n == null || n.removeAllRanges(), n == null || n.addRange(t), (Oe.IS_MOBILE || Oe.IS_SAFARI) && e.focus();
    }
  }, {
    key: "focusFromParentElement",
    value: function focusFromParentElement(e) {
      var t = e.querySelector("#".concat(_s.TEXT_INPUT_ID));
      t && Ht.focusEndOfInput(t);
    }
  }]);
}();
function or(i) {
  return i.charAt(0).toUpperCase() + i.slice(1);
}
function Mo(i) {
  return i && JSON.stringify(i);
}
function Ai(i, e, t, n) {
  var s = "\n".concat(or(e), " message: ").concat(JSON.stringify(i), " \n"),
    r = t ? "".concat(or(e), " message after interceptor: ").concat(Mo(n), " \n") : "";
  return s + r;
}
function ko(i, e, t, n) {
  return "".concat(Ai(i, e, t, n), "Make sure the ").concat(e, " message is using the Response format: ").concat(q, "connect/#Response \nYou can also augment it using the responseInterceptor property: ").concat(q, "interceptors#responseInterceptor");
}
function Oo(i, e, t) {
  var n = "response";
  return "".concat(Ai(i, n, e, t), "Make sure the ").concat(n, " message is using the {text: string} format, e.g: {text: \"Model Response\"}");
}
function No(i, e) {
  var t = "request";
  return "".concat(Ai(i, t, e), "Make sure the ").concat(t, " message is using the {body: {text: string}} format, e.g: {body: {text: \"Model Response\"}}");
}
var rn = ko,
  Po = No,
  Lo = Oo,
  se = "Invalid API Key",
  Fe = "Failed to connect",
  Ie = "Request settings have not been set up",
  js = "No file was added",
  wi = "Image was not found",
  Wr = "Multi-response arrays are not supported for streaming",
  Xr = "Make sure the events are using {text: string} or {html: string} format.\nYou can also augment them using the responseInterceptor property: ".concat(q, "interceptors#responseInterceptor"),
  Bo = "Cannot mix {text: string} and {html: string} responses.",
  Do = "No valid stream events were sent.\n".concat(Xr),
  Fo = "Readable Stream connection error.",
  dn = "Please define a `function_handler` property inside the service config.",
  Zn = "Function tool response must be an array or contain a text property",
  Zr = "Authentication",
  ie = "Authorization",
  Uo = "authorization",
  Ci = "Unauthorized",
  Ti = "Authorization header",
  Ct = "Invalid",
  as = "Incorrect",
  ye = "authentication_error",
  Ge = "invalid_request_error",
  B = "Content-Type",
  Ho = "content-type",
  V = "application/json",
  L = "object",
  Yr = "completed",
  ge = "Bearer ",
  re = "GET",
  fe = "POST",
  Ri = "Upload an audio file",
  Ds = /*#__PURE__*/function () {
    function Ds() {
      _classCallCheck(this, Ds);
    }
    return _createClass(Ds, null, [{
      key: "addElements",
      value: function addElements(e) {
        for (var _len = arguments.length, t = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          t[_key - 1] = arguments[_key];
        }
        t.forEach(function (n) {
          return e.appendChild(n);
        });
      }
    }, {
      key: "isScrollbarAtBottomOfElement",
      value: function isScrollbarAtBottomOfElement(e) {
        var t = e.scrollHeight,
          n = e.clientHeight,
          s = e.scrollTop,
          r = t - n;
        return s >= r - Ds.CODE_SNIPPET_GENERATION_JUMP;
      }
    }, {
      key: "cloneElement",
      value: function cloneElement(e) {
        var t = e.cloneNode(!0);
        return e.parentNode.replaceChild(t, e), t;
      }
      // check safari
    }, {
      key: "scrollToBottom",
      value: function scrollToBottom(e) {
        var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
        var n = arguments.length > 2 ? arguments[2] : undefined;
        n ? e.scrollTo({
          left: 0,
          top: n.offsetTop
        }) : t ? e.scrollTo({
          left: 0,
          top: e.scrollHeight,
          behavior: "smooth"
        }) : e.scrollTop = e.scrollHeight;
      }
    }, {
      key: "scrollToTop",
      value: function scrollToTop(e) {
        e.scrollTop = 0;
      }
    }]);
  }();
Ds.CODE_SNIPPET_GENERATION_JUMP = 0.5;
var X = Ds;
var Fs = /*#__PURE__*/function () {
  function Fs() {
    _classCallCheck(this, Fs);
  }
  return _createClass(Fs, null, [{
    key: "speak",
    value: function speak(e, t) {
      if (!t.audio && window.SpeechSynthesisUtterance) {
        var n = new SpeechSynthesisUtterance(e);
        Object.assign(n, t), speechSynthesis.speak(n);
      }
    }
  }, {
    key: "processConfig",
    value: function processConfig(e, t) {
      var n = {};
      setTimeout(function () {
        if (_typeof(e) == "object" && (e.audio && (n.audio = e.audio), e.lang && (n.lang = e.lang), e.pitch && (n.pitch = e.pitch), e.rate && (n.rate = e.rate), e.volume && (n.volume = e.volume), e.voiceName)) {
          var s = window.speechSynthesis.getVoices().find(function (r) {
            var o;
            return r.name.toLocaleLowerCase() === ((o = e.voiceName) == null ? void 0 : o.toLocaleLowerCase());
          });
          s && (n.voice = s);
        }
        t(n);
      }, Fs.LOAD_VOICES_MS);
    }
  }]);
}();
Fs.LOAD_VOICES_MS = 200;
var on = Fs;
var Qt = /*#__PURE__*/function () {
  function Qt() {
    _classCallCheck(this, Qt);
  }
  return _createClass(Qt, null, [{
    key: "colorToHex",
    value: function colorToHex(e) {
      var t = S();
      return t[_].color = e, document.body.appendChild(t), "#".concat(window.getComputedStyle(t).color.match(/\d+/g).map(function (r) {
        return parseInt(r).toString(16).padStart(2, "0");
      }).join(""));
    }
  }, {
    key: "setDots",
    value: function setDots(e, t) {
      var n, s;
      if ((s = (n = t == null ? void 0 : t.styles) == null ? void 0 : n.bubble) != null && s.color) {
        var r = Qt.colorToHex(t.styles.bubble.color);
        e[_].setProperty("--loading-message-color", r), e[_].setProperty("--loading-message-color-fade", "".concat(r, "33"));
      } else e[_].setProperty("--loading-message-color", "#848484"), e[_].setProperty("--loading-message-color-fade", "#55555533");
    }
  }, {
    key: "setRing",
    value: function setRing(e, t) {
      var _ref4 = t || {},
        n = _ref4.color,
        s = _ref4.width,
        r = _ref4.height,
        o = _ref4.margin,
        a = _ref4.border;
      if (n) {
        var c = Qt.colorToHex(n);
        e[_].setProperty("--loading-history-color", c);
      } else e[_].setProperty("--loading-history-color", "#dbdbdb");
      e[_].setProperty("--loading-history-height", r || "57px"), e[_].setProperty("--loading-history-width", s || "57px"), e[_].setProperty("--loading-history-margin", o || "7px"), e[_].setProperty("--loading-history-border", a || "6px solid");
    }
  }]);
}();
Qt.BUBBLE_CLASS = "deep-chat-loading-message-bubble", Qt.DOTS_CONTAINER_CLASS = "deep-chat-loading-message-dots-container";
var mt = Qt;
var me = /*#__PURE__*/function () {
  function me() {
    _classCallCheck(this, me);
  }
  return _createClass(me, null, [{
    key: "checkForContainerStyles",
    value: function checkForContainerStyles(e, t) {
      var n = e.containerStyle;
      n && (Object.assign(t[_], n), console[f]("The containerStyle property".concat(ze, "1.3.14.")), console[f]("".concat(Tt, "the style property instead: ").concat(q, "styles#style")));
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }, {
    key: "handleResponseProperty",
    value: function handleResponseProperty(e) {
      return console[f]("The {result: ....} response object type".concat(ze, "1.3.0.")), console[f]("".concat(Tt, "the new response object: ").concat(q, "connect#Response")), e.result;
    }
  }, {
    key: "processHistory",
    value: function processHistory(e) {
      var t = e.initialMessages;
      if (t) return console[f]("The initialMessages property".concat(ze, "2.0.0.")), console[f]("".concat(Tt, "the history property instead: ").concat(q, "messages/#history")), t;
    }
  }, {
    key: "processHistoryFile",
    value: function processHistoryFile(e) {
      var t = e[le];
      t && (console[f]("The file property in MessageContent".concat(ze, "1.3.17.")), console[f]("".concat(Tt, "the files array property: ").concat(q, "messages/#MessageContent")), e[y] = [t]);
    }
  }, {
    key: "processValidateInput",
    value: function processValidateInput(e) {
      var t = e.validateMessageBeforeSending;
      if (t) return console[f]("The validateMessageBeforeSending property".concat(ze, "1.3.24.")), console[f]("".concat(Tt, "validateInput: ").concat(q, "interceptors#validateInput")), t;
    }
  }, {
    key: "processSubmitUserMessage",
    value: function processSubmitUserMessage(e) {
      return console[f]("The submitUserMessage(text: string) argument string type".concat(ze, "1.4.4.")), console[f]("".concat(Tt, "the new argument type: ").concat(q, "methods#submitUserMessage")), _defineProperty({}, h, e);
    }
  }, {
    key: "flagHTMLUpdateClass",
    value: function flagHTMLUpdateClass(e) {
      var t;
      (t = e.children[0]) != null && t[m].contains("deep-chat-update-message") && (console[f]("The \"deep-chat-update-message\" html class".concat(ze, "1.4.4.")), console[f]("".concat(Tt, "using {..., overwrite: true} object: ").concat(q, "connect#Response")));
    }
  }, {
    key: "processConnect",
    value: function processConnect(e) {
      var t = e;
      t.request && (t.connect ? Object.assign(t.connect, t.request) : t.connect = t.request, console[f]("The request property".concat(ze, "2.0.0.")), console[f]("".concat(hs, "connect object: ").concat(q, "connect#connect-1")));
    }
  }, {
    key: "checkForStream",
    value: function checkForStream(e) {
      var t = e.stream;
      if (t) return console[f]("The stream property".concat(cr, "the connect object in version 2.0.0.")), console[f]("".concat(hs, "connect object: ").concat(q, "connect#connect-1")), t;
    }
  }, {
    key: "fireOnNewMessage",
    value: function fireOnNewMessage(e, t) {
      var s;
      var n = e;
      n.onNewMessage && (console[f]("The onNewMessage event has been deprecated since version 2.0.0."), console[f]("".concat(hs, "onMessage event: ").concat(q, "events#onMessage")), (s = n.onNewMessage) == null || s.call(n, t)), e.dispatchEvent(new CustomEvent("new-message", {
        detail: t
      }));
    }
  }, {
    key: "processFileConfigConnect",
    value: function processFileConfigConnect(e) {
      var t = e;
      t.request && (console[f]("The request property in file configuration".concat(ze, "2.0.0.")), console[f]("Please use the connect property instead: ".concat(q, "files")), t.connect || (t.connect = t.request));
    }
  }, {
    key: "processMessageStyles",
    value: function processMessageStyles(e) {
      if (!e) return;
      var t = JSON.parse(JSON.stringify(e)),
        n = t.loading;
      return n && (n.outerContainer || n.innerContainer || n.bubble || n.media) && (console[f]("The loading message styles are defined using LoadingMessageStyles interface since version 2.1.0."), console[f]("Check it out here: ".concat(q, "messages/styles#LoadingMessageStyles")), t.loading = {
        message: {
          styles: n
        }
      }), t;
    }
  }, {
    key: "processDemo",
    value: function processDemo(e) {
      return typeof e == "boolean" || e.displayLoadingBubble && (console[f]("The demo displayLoadingBubble property".concat(ze, "2.1.0.")), console[f]("Please use displayLoading instead: ".concat(q, "modes#demo")), e.displayLoading = {
        message: !0
      }), e;
    }
  }, {
    key: "processCohere",
    value: function processCohere(e) {
      var t = e,
        n = "".concat(hs, "official documentation: ").concat(q, "directConnection/Cohere");
      return t.chat && (console[f]("Cohere chat property".concat(ze, "2.2.3.")), console[f](n), delete t.chat), t.textGeneration ? (console[f]("Cohere textGeneration".concat(ar, "2.2.3.")), console[f](n), delete t.textGeneration, !1) : t.summarization ? (console[f]("Cohere summarization".concat(ar, "2.2.3.")), console[f](n), delete t.summarization, !1) : !0;
    }
  }, {
    key: "processStreamHTMLWrappers",
    value: function processStreamHTMLWrappers(e) {
      if (!e || _typeof(e) !== L) return;
      var t = e.htmlWrappers;
      if (t) return console[f]("The htmlWrappers property".concat(cr, "Deep Chat's base since version 2.3.0.")), console[f]("Check it out here: ".concat(q, "messages/HTML#htmlWrappers")), t;
    }
  }, {
    key: "processFocusMode",
    value: function processFocusMode(e) {
      return !e || typeof e == "boolean" || e.scroll && (console[f]("The scroll property in focusMode has been changed to smoothScroll since version 2.3.0."), console[f]("Check it out here: ".concat(q, "modes#focusMode")), e.smoothScroll = !0), e;
    }
  }]);
}();
var ze = " is deprecated since version ",
  Tt = "Please change to using ",
  hs = "Please see the ",
  ar = " is not supported since version ",
  cr = " has been moved to ";
var wt = /*#__PURE__*/function () {
  function wt() {
    _classCallCheck(this, wt);
  }
  return _createClass(wt, null, [{
    key: "mouseUp",
    value: function mouseUp(e, t) {
      Q.unsetAllCSSMouseStates(e, t), Object.assign(e[_], t[x]), Object.assign(e[_], t[Ce]);
    }
  }, {
    key: "mouseDown",
    value: function mouseDown(e, t) {
      Object.assign(e[_], t[H]);
    }
  }, {
    key: "mouseLeave",
    value: function mouseLeave(e, t) {
      Q.unsetAllCSSMouseStates(e, t), Object.assign(e[_], t[x]);
    }
  }, {
    key: "mouseEnter",
    value: function mouseEnter(e, t) {
      Object.assign(e[_], t[Ce]);
    }
  }, {
    key: "add",
    value: function add(e, t) {
      e.addEventListener("mouseenter", wt.mouseEnter.bind(this, e, t)), e.addEventListener("mouseleave", wt.mouseLeave.bind(this, e, t)), e.addEventListener("mousedown", wt.mouseDown.bind(this, e, t)), e.addEventListener("mouseup", wt.mouseUp.bind(this, e, t));
    }
  }]);
}();
var jo = "deep-chat-temporary-message",
  qo = "deep-chat-suggestion-button",
  oi = {
    "deep-chat-button": {
      styles: _defineProperty(_defineProperty(_defineProperty({}, x, {
        backgroundColor: "white",
        padding: "5px",
        paddingLeft: "7px",
        paddingRight: "7px",
        border: "1px solid #c2c2c2",
        borderRadius: "6px",
        cursor: "pointer"
      }), Ce, {
        backgroundColor: "#fafafa"
      }), H, {
        backgroundColor: "#f1f1f1"
      })
    }
  },
  lr = Object.keys(oi);
var st = /*#__PURE__*/function () {
  function st() {
    _classCallCheck(this, st);
  }
  return _createClass(st, null, [{
    key: "applySuggestionEvent",
    value: function applySuggestionEvent(e, t) {
      setTimeout(function () {
        t.addEventListener(H, function () {
          var n, s;
          (s = e.submitUserMessage) == null || s.call(e, _defineProperty({}, h, ((n = t.textContent) == null ? void 0 : n.trim()) || ""));
        });
      });
    }
  }, {
    key: "isElementTemporary",
    value: function isElementTemporary(e) {
      var t;
      return e ? (t = e.bubbleElement.children[0]) == null ? void 0 : t[m].contains(jo) : !1;
    }
  }, {
    key: "doesElementContainDeepChatClass",
    value: function doesElementContainDeepChatClass(e) {
      return lr.find(function (t) {
        return e[m].contains(t);
      });
    }
  }, {
    key: "applyEvents",
    value: function applyEvents(e, t) {
      var n = oi[t].events;
      Object.keys(n || []).forEach(function (s) {
        e.addEventListener(s, n == null ? void 0 : n[s]);
      });
    }
  }, {
    key: "getProcessedStyles",
    value: function getProcessedStyles(e, t, n) {
      var s = Array.from(t[m]).reduce(function (a, c) {
          var d;
          var l = (d = e[c]) == null ? void 0 : d.styles;
          return l && e[c].styles && a.push(l), a;
        }, []),
        r = oi[n].styles;
      if (r) {
        var a = JSON.parse(JSON.stringify(r));
        a[x] && Q.overwriteDefaultWithAlreadyApplied(a, t), s.unshift(a);
      }
      var o = Q.mergeStatefulStyles(s);
      return Q.processStateful(o);
    }
  }, {
    key: "applyDeepChatUtilities",
    value: function applyDeepChatUtilities(e, t, n) {
      lr.forEach(function (r) {
        var o = n.getElementsByClassName(r);
        Array.from(o || []).forEach(function (a) {
          var c = st.getProcessedStyles(t, a, r);
          Se.applyStylesToElement(a, c), st.applyEvents(a, r);
        });
      });
      var s = n.getElementsByClassName(qo);
      Array.from(s).forEach(function (r) {
        return st.applySuggestionEvent(e, r);
      });
    }
  }]);
}();
var Ve = /*#__PURE__*/function () {
  function Ve() {
    _classCallCheck(this, Ve);
  }
  return _createClass(Ve, null, [{
    key: "applyStylesToElement",
    value: function applyStylesToElement(e, t) {
      var n = Q.processStateful(t);
      wt.add(e, n), Object.assign(e[_], n[x]);
    }
  }, {
    key: "applyEventsToElement",
    value: function applyEventsToElement(e, t) {
      Object.keys(t).forEach(function (n) {
        var s = t[n];
        s && e.addEventListener(n, s);
      });
    }
  }, {
    key: "applyClassUtilitiesToElement",
    value: function applyClassUtilitiesToElement(e, t) {
      var n = t.events,
        s = t.styles;
      n && Ve.applyEventsToElement(e, n), s && !st.doesElementContainDeepChatClass(e) && Ve.applyStylesToElement(e, s);
    }
  }, {
    key: "applyCustomClassUtilities",
    value: function applyCustomClassUtilities(e, t) {
      Object.keys(e).forEach(function (n) {
        var s = t.getElementsByClassName(n);
        Array.from(s).forEach(function (r) {
          e[n] && Ve.applyClassUtilitiesToElement(r, e[n]);
        });
      });
    }
  }, {
    key: "apply",
    value: function apply(e, t) {
      st.applyDeepChatUtilities(e, e.htmlClassUtilities, t), Ve.applyCustomClassUtilities(e.htmlClassUtilities, t);
    }
  }, {
    key: "traverseNodes",
    value: function traverseNodes(e, t) {
      e.nodeType === Node.ELEMENT_NODE && t.push(e.outerHTML), e.childNodes.forEach(function (n) {
        Ve.traverseNodes(n, t);
      });
    }
  }, {
    key: "splitHTML",
    value: function splitHTML(e) {
      var n = new DOMParser().parseFromString(e, "text/html"),
        s = [];
      return n.body.childNodes.forEach(function (r) {
        Ve.traverseNodes(r, s);
      }), s;
    }
  }, {
    key: "isTemporaryBasedOnHTML",
    value: function isTemporaryBasedOnHTML(e) {
      var t = S();
      return t.innerHTML = e, st.isElementTemporary({
        outerContainer: t,
        bubbleElement: t,
        innerContainer: t
      });
    }
    // useful for removing event listeners
  }, {
    key: "replaceElementWithNewClone",
    value: function replaceElementWithNewClone(e, t) {
      var s;
      var n = (t || e).cloneNode(!0);
      return (s = e.parentNode) == null || s.replaceChild(n, e), n;
    }
  }, {
    key: "tryAddWrapper",
    value: function tryAddWrapper(e, t, n, s) {
      if (t && s) {
        var r = (n == null ? void 0 : n[s]) || (n == null ? void 0 : n[x]);
        if (r) return e.innerHTML = r, {
          contentEl: Ve.getTargetWrapper(e),
          wrapper: !0
        };
      }
      return {
        contentEl: e,
        wrapper: !1
      };
    }
  }, {
    key: "getTargetWrapper",
    value: function getTargetWrapper(e) {
      return e.getElementsByClassName(Ve.TARGET_WRAPPER_CLASS)[0] || e;
    }
  }]);
}();
Ve.TARGET_WRAPPER_CLASS = "html-wrapper";
var Se = Ve;
var lt = /*#__PURE__*/function () {
  function lt() {
    _classCallCheck(this, lt);
  }
  return _createClass(lt, null, [{
    key: "addElement",
    value: function addElement(e, t, n) {
      var s = X.isScrollbarAtBottomOfElement(e.elementRef);
      e.appendOuterContainerElemet(t), !e.focusMode && n && s && X.scrollToBottom(e.elementRef, !1, t);
    }
  }, {
    key: "createElements",
    value: function createElements(e, t, n, s) {
      var r = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : !1;
      var o = e.createMessageElementsOnOrientation("", n, s, r);
      o.bubbleElement[m].add(lt.HTML_BUBBLE_CLASS);
      var _Se$tryAddWrapper = Se.tryAddWrapper(o.bubbleElement, t, e._customWrappers, n),
        a = _Se$tryAddWrapper.contentEl;
      return a.innerHTML = t, o;
    }
  }, {
    key: "overwriteElements",
    value: function overwriteElements(e, t, n) {
      n.bubbleElement.innerHTML = t, Se.apply(e, n.outerContainer), me.flagHTMLUpdateClass(n.bubbleElement);
    }
    // prettier-ignore
  }, {
    key: "overwrite",
    value: function overwrite(e, t, n, s) {
      var r = e.messageToElements,
        o = I.overwriteMessage(r, s, t, n, R, lt.HTML_BUBBLE_CLASS);
      return o && lt.overwriteElements(e, t, o), o;
    }
  }, {
    key: "create",
    value: function create(e, t, n) {
      var s = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !1;
      var o;
      var r = lt.createElements(e, t, n, s);
      return I.fillEmptyMessageElement(r.bubbleElement, t), Se.apply(e, r.outerContainer), me.flagHTMLUpdateClass(r.bubbleElement), e.applyCustomStyles(r, n, !1, (o = e.messageStyles) == null ? void 0 : o[R]), r;
    }
    // prettier-ignore
  }, {
    key: "add",
    value: function add(e, t, n, s, r) {
      var o = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : !1;
      if (r != null && r.status) {
        var c = this.overwrite(e, t, n, e.messageElementRefs);
        if (c) return c;
        r.status = !1;
      }
      if (o && e.messageElementRefs.length > 0 && Se.isTemporaryBasedOnHTML(t)) return;
      var a = lt.create(e, t, n, o);
      return o || lt.addElement(e, a.outerContainer, s), a;
    }
  }]);
}();
lt.HTML_BUBBLE_CLASS = "html-message";
var it = lt;
var $o = /*#__PURE__*/function () {
  function $o() {
    _classCallCheck(this, $o);
  }
  return _createClass($o, null, [{
    key: "katex",
    value: function katex(e, t, n) {
      var a = (n || {}).delimiter || "$";
      if (a.length !== 1) throw new Error("invalid delimiter");
      var c = function c(p, u) {
          var g;
          return ((g = window.katex) == null ? void 0 : g.renderToString(p, _objectSpread({
            displayMode: u,
            throwOnError: !1,
            output: "mathml"
          }, e))) || "";
        },
        l = function l(p, u, g) {
          var v = !1,
            b = p.bMarks[u] + p.tShift[u],
            E = p.eMarks[u];
          if (b + 1 > E) return !1;
          var w = p.src.charAt(b);
          if (w !== a) return !1;
          var F = b;
          b = p.skipChars(b, w);
          var J = b - F;
          if (J !== 2) return !1;
          var K = u;
          for (; ++K, !(K >= g || (b = F = p.bMarks[K] + p.tShift[K], E = p.eMarks[K], b < E && p.tShift[K] < p.blkIndent));) if (p.src.charAt(b) === a && !(p.tShift[K] - p.blkIndent >= 4) && (b = p.skipChars(b, w), !(b - F < J) && (b = p.skipSpaces(b), !(b < E)))) {
            v = !0;
            break;
          }
          J = p.tShift[u], p.line = K + (v ? 1 : 0);
          var be = p.getLines(u + 1, K, J, !0).replace(/[ \n]+/g, " ").trim();
          return p.tokens.push({
            type: "katex",
            params: null,
            content: be,
            lines: [u, p.line],
            level: p.level,
            block: !0
          }), !0;
        },
        d = function d(p, u) {
          var g = p.pos,
            v = p.posMax;
          var b = g;
          if (p.src.charAt(b) !== a) return !1;
          for (++b; b < v && p.src.charAt(b) === a;) ++b;
          var E = p.src.slice(g, b);
          if (E.length > 2) return !1;
          var w = b;
          var F = 0;
          for (; b < v;) {
            var J = p.src.charAt(b);
            if (J === "{" && (b === 0 || p.src.charAt(b - 1) !== "\\")) F += 1;else if (J === "}" && (b === 0 || p.src.charAt(b - 1) !== "\\")) {
              if (F -= 1, F < 0) return !1;
            } else if (J === a && F === 0) {
              var K = b;
              var be = b + 1;
              for (; be < v && p.src.charAt(be) === a;) ++be;
              if (be - K === E.length) {
                if (!u) {
                  var _t = p.src.slice(w, K).replace(/[ \n]+/g, " ").trim();
                  p.push({
                    type: "katex",
                    content: _t,
                    block: E.length > 1,
                    level: p.level
                  });
                }
                return p.pos = be, !0;
              }
            }
            b += 1;
          }
          return u || (p.pending += E), p.pos += E.length, !0;
        };
      t.inline.ruler.push("katex", d, n), t.block.ruler.push("katex", l, n), t.renderer.rules.katex = function (p, u) {
        return c(p[u].content, p[u].block);
      }, t.renderer.rules.katex.delimiter = a;
    }
  }]);
}();
var us;
function Qr(i) {
  return us = us || document.createElement("textarea"), us.innerHTML = "&" + i + ";", us.value;
}
var Go = Object.prototype.hasOwnProperty;
function zo(i, e) {
  return i ? Go.call(i, e) : !1;
}
function eo(i) {
  var e = [].slice.call(arguments, 1);
  return e.forEach(function (t) {
    if (t) {
      if (_typeof(t) != "object") throw new TypeError(t + "must be object");
      Object.keys(t).forEach(function (n) {
        i[n] = t[n];
      });
    }
  }), i;
}
var Vo = /\\([\\!"#$%&'()*+,.\/:;<=>?@[\]^_`{|}~-])/g;
function Yn(i) {
  return i.indexOf("\\") < 0 ? i : i.replace(Vo, "$1");
}
function to(i) {
  return !(i >= 55296 && i <= 57343 || i >= 64976 && i <= 65007 || (i & 65535) === 65535 || (i & 65535) === 65534 || i >= 0 && i <= 8 || i === 11 || i >= 14 && i <= 31 || i >= 127 && i <= 159 || i > 1114111);
}
function ai(i) {
  if (i > 65535) {
    i -= 65536;
    var e = 55296 + (i >> 10),
      t = 56320 + (i & 1023);
    return String.fromCharCode(e, t);
  }
  return String.fromCharCode(i);
}
var Jo = /&([a-z#][a-z0-9]{1,31});/gi,
  Ko = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))/i;
function Wo(i, e) {
  var t = 0,
    n = Qr(e);
  return e !== n ? n : e.charCodeAt(0) === 35 && Ko.test(e) && (t = e[1].toLowerCase() === "x" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10), to(t)) ? ai(t) : i;
}
function jt(i) {
  return i.indexOf("&") < 0 ? i : i.replace(Jo, Wo);
}
var Xo = /[&<>"]/,
  Zo = /[&<>"]/g,
  Yo = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;"
  };
function Qo(i) {
  return Yo[i];
}
function Ne(i) {
  return Xo.test(i) ? i.replace(Zo, Qo) : i;
}
var A = {};
A.blockquote_open = function () {
  return "<blockquote>\n";
};
A.blockquote_close = function (i, e) {
  return "</blockquote>" + Gt(i, e);
};
A.code = function (i, e) {
  return i[e].block ? "<pre><code>" + Ne(i[e].content) + "</code></pre>" + Gt(i, e) : "<code>" + Ne(i[e].content) + "</code>";
};
A.fence = function (i, e, t, n, s) {
  var r = i[e],
    o = "",
    a = t.langPrefix,
    c = "",
    l,
    d,
    p;
  if (r.params) {
    if (l = r.params.split(/\s+/g), d = l.join(" "), zo(s.rules.fence_custom, l[0])) return s.rules.fence_custom[l[0]](i, e, t, n, s);
    c = Ne(jt(Yn(d))), o = ' class="' + a + c + '"';
  }
  return t.highlight ? p = t.highlight.apply(t.highlight, [r.content].concat(l)) || Ne(r.content) : p = Ne(r.content), "<pre><code" + o + ">" + p + "</code></pre>" + Gt(i, e);
};
A.fence_custom = {};
A.heading_open = function (i, e) {
  return "<h" + i[e].hLevel + ">";
};
A.heading_close = function (i, e) {
  return "</h" + i[e].hLevel + ">\n";
};
A.hr = function (i, e, t) {
  return (t.xhtmlOut ? "<hr />" : "<hr>") + Gt(i, e);
};
A.bullet_list_open = function () {
  return "<ul>\n";
};
A.bullet_list_close = function (i, e) {
  return "</ul>" + Gt(i, e);
};
A.list_item_open = function () {
  return "<li>";
};
A.list_item_close = function () {
  return "</li>\n";
};
A.ordered_list_open = function (i, e) {
  var t = i[e],
    n = t.order > 1 ? ' start="' + t.order + '"' : "";
  return "<ol" + n + ">\n";
};
A.ordered_list_close = function (i, e) {
  return "</ol>" + Gt(i, e);
};
A.paragraph_open = function (i, e) {
  return i[e].tight ? "" : "<p>";
};
A.paragraph_close = function (i, e) {
  var t = !(i[e].tight && e && i[e - 1].type === "inline" && !i[e - 1].content);
  return (i[e].tight ? "" : "</p>") + (t ? Gt(i, e) : "");
};
A.link_open = function (i, e, t) {
  var n = i[e].title ? ' title="' + Ne(jt(i[e].title)) + '"' : "",
    s = t.linkTarget ? ' target="' + t.linkTarget + '"' : "";
  return '<a href="' + Ne(i[e].href) + '"' + n + s + ">";
};
A.link_close = function () {
  return "</a>";
};
A.image = function (i, e, t) {
  var n = ' src="' + Ne(i[e].src) + '"',
    s = i[e].title ? ' title="' + Ne(jt(i[e].title)) + '"' : "",
    r = ' alt="' + (i[e].alt ? Ne(jt(Yn(i[e].alt))) : "") + '"',
    o = t.xhtmlOut ? " /" : "";
  return "<img" + n + r + s + o + ">";
};
A.table_open = function () {
  return "<table>\n";
};
A.table_close = function () {
  return "</table>\n";
};
A.thead_open = function () {
  return "<thead>\n";
};
A.thead_close = function () {
  return "</thead>\n";
};
A.tbody_open = function () {
  return "<tbody>\n";
};
A.tbody_close = function () {
  return "</tbody>\n";
};
A.tr_open = function () {
  return "<tr>";
};
A.tr_close = function () {
  return "</tr>\n";
};
A.th_open = function (i, e) {
  var t = i[e];
  return "<th" + (t.align ? ' style="text-align:' + t.align + '"' : "") + ">";
};
A.th_close = function () {
  return "</th>";
};
A.td_open = function (i, e) {
  var t = i[e];
  return "<td" + (t.align ? ' style="text-align:' + t.align + '"' : "") + ">";
};
A.td_close = function () {
  return "</td>";
};
A.strong_open = function () {
  return "<strong>";
};
A.strong_close = function () {
  return "</strong>";
};
A.em_open = function () {
  return "<em>";
};
A.em_close = function () {
  return "</em>";
};
A.del_open = function () {
  return "<del>";
};
A.del_close = function () {
  return "</del>";
};
A.ins_open = function () {
  return "<ins>";
};
A.ins_close = function () {
  return "</ins>";
};
A.mark_open = function () {
  return "<mark>";
};
A.mark_close = function () {
  return "</mark>";
};
A.sub = function (i, e) {
  return "<sub>" + Ne(i[e].content) + "</sub>";
};
A.sup = function (i, e) {
  return "<sup>" + Ne(i[e].content) + "</sup>";
};
A.hardbreak = function (i, e, t) {
  return t.xhtmlOut ? "<br />\n" : "<br>\n";
};
A.softbreak = function (i, e, t) {
  return t.breaks ? t.xhtmlOut ? "<br />\n" : "<br>\n" : "\n";
};
A.text = function (i, e) {
  return Ne(i[e].content);
};
A.htmlblock = function (i, e) {
  return i[e].content;
};
A.htmltag = function (i, e) {
  return i[e].content;
};
A.abbr_open = function (i, e) {
  return '<abbr title="' + Ne(jt(i[e].title)) + '">';
};
A.abbr_close = function () {
  return "</abbr>";
};
A.footnote_ref = function (i, e) {
  var t = Number(i[e].id + 1).toString(),
    n = "fnref" + t;
  return i[e].subId > 0 && (n += ":" + i[e].subId), '<sup class="footnote-ref"><a href="#fn' + t + '" id="' + n + '">[' + t + "]</a></sup>";
};
A.footnote_block_open = function (i, e, t) {
  var n = t.xhtmlOut ? "<hr class=\"footnotes-sep\" />\n" : "<hr class=\"footnotes-sep\">\n";
  return n + "<section class=\"footnotes\">\n<ol class=\"footnotes-list\">\n";
};
A.footnote_block_close = function () {
  return "</ol>\n</section>\n";
};
A.footnote_open = function (i, e) {
  var t = Number(i[e].id + 1).toString();
  return '<li id="fn' + t + '"  class="footnote-item">';
};
A.footnote_close = function () {
  return "</li>\n";
};
A.footnote_anchor = function (i, e) {
  var t = Number(i[e].id + 1).toString(),
    n = "fnref" + t;
  return i[e].subId > 0 && (n += ":" + i[e].subId), ' <a href="#' + n + '" class="footnote-backref">↩</a>';
};
A.dl_open = function () {
  return "<dl>\n";
};
A.dt_open = function () {
  return "<dt>";
};
A.dd_open = function () {
  return "<dd>";
};
A.dl_close = function () {
  return "</dl>\n";
};
A.dt_close = function () {
  return "</dt>\n";
};
A.dd_close = function () {
  return "</dd>\n";
};
function no(i, e) {
  return ++e >= i.length - 2 ? e : i[e].type === "paragraph_open" && i[e].tight && i[e + 1].type === "inline" && i[e + 1].content.length === 0 && i[e + 2].type === "paragraph_close" && i[e + 2].tight ? no(i, e + 2) : e;
}
var Gt = A.getBreak = function (e, t) {
  return t = no(e, t), t < e.length && e[t].type === "list_item_close" ? "" : "\n";
};
function Ii() {
  this.rules = eo({}, A), this.getBreak = A.getBreak;
}
Ii.prototype.renderInline = function (i, e, t) {
  for (var n = this.rules, s = i.length, r = 0, o = ""; s--;) o += n[i[r].type](i, r++, e, t, this);
  return o;
};
Ii.prototype.render = function (i, e, t) {
  for (var n = this.rules, s = i.length, r = -1, o = ""; ++r < s;) i[r].type === "inline" ? o += this.renderInline(i[r].children, e, t) : o += n[i[r].type](i, r, e, t, this);
  return o;
};
function Ue() {
  this.__rules__ = [], this.__cache__ = null;
}
Ue.prototype.__find__ = function (i) {
  for (var e = this.__rules__.length, t = -1; e--;) if (this.__rules__[++t].name === i) return t;
  return -1;
};
Ue.prototype.__compile__ = function () {
  var i = this,
    e = [""];
  i.__rules__.forEach(function (t) {
    t.enabled && t.alt.forEach(function (n) {
      e.indexOf(n) < 0 && e.push(n);
    });
  }), i.__cache__ = {}, e.forEach(function (t) {
    i.__cache__[t] = [], i.__rules__.forEach(function (n) {
      n.enabled && (t && n.alt.indexOf(t) < 0 || i.__cache__[t].push(n.fn));
    });
  });
};
Ue.prototype.at = function (i, e, t) {
  var n = this.__find__(i),
    s = t || {};
  if (n === -1) throw new Error("Parser rule not found: " + i);
  this.__rules__[n].fn = e, this.__rules__[n].alt = s.alt || [], this.__cache__ = null;
};
Ue.prototype.before = function (i, e, t, n) {
  var s = this.__find__(i),
    r = n || {};
  if (s === -1) throw new Error("Parser rule not found: " + i);
  this.__rules__.splice(s, 0, {
    name: e,
    enabled: !0,
    fn: t,
    alt: r.alt || []
  }), this.__cache__ = null;
};
Ue.prototype.after = function (i, e, t, n) {
  var s = this.__find__(i),
    r = n || {};
  if (s === -1) throw new Error("Parser rule not found: " + i);
  this.__rules__.splice(s + 1, 0, {
    name: e,
    enabled: !0,
    fn: t,
    alt: r.alt || []
  }), this.__cache__ = null;
};
Ue.prototype.push = function (i, e, t) {
  var n = t || {};
  this.__rules__.push({
    name: i,
    enabled: !0,
    fn: e,
    alt: n.alt || []
  }), this.__cache__ = null;
};
Ue.prototype.enable = function (i, e) {
  i = Array.isArray(i) ? i : [i], e && this.__rules__.forEach(function (t) {
    t.enabled = !1;
  }), i.forEach(function (t) {
    var n = this.__find__(t);
    if (n < 0) throw new Error("Rules manager: invalid rule name " + t);
    this.__rules__[n].enabled = !0;
  }, this), this.__cache__ = null;
};
Ue.prototype.disable = function (i) {
  i = Array.isArray(i) ? i : [i], i.forEach(function (e) {
    var t = this.__find__(e);
    if (t < 0) throw new Error("Rules manager: invalid rule name " + e);
    this.__rules__[t].enabled = !1;
  }, this), this.__cache__ = null;
};
Ue.prototype.getRules = function (i) {
  return this.__cache__ === null && this.__compile__(), this.__cache__[i] || [];
};
function ea(i) {
  i.inlineMode ? i.tokens.push({
    type: "inline",
    content: i.src.replace(/\n/g, " ").trim(),
    level: 0,
    lines: [0, 1],
    children: []
  }) : i.block.parse(i.src, i.options, i.env, i.tokens);
}
function zt(i, e, t, n, s) {
  this.src = i, this.env = n, this.options = t, this.parser = e, this.tokens = s, this.pos = 0, this.posMax = this.src.length, this.level = 0, this.pending = "", this.pendingLevel = 0, this.cache = [], this.isInLabel = !1, this.linkLevel = 0, this.linkContent = "", this.labelUnmatchedScopes = 0;
}
zt.prototype.pushPending = function () {
  this.tokens.push({
    type: "text",
    content: this.pending,
    level: this.pendingLevel
  }), this.pending = "";
};
zt.prototype.push = function (i) {
  this.pending && this.pushPending(), this.tokens.push(i), this.pendingLevel = this.level;
};
zt.prototype.cacheSet = function (i, e) {
  for (var t = this.cache.length; t <= i; t++) this.cache.push(0);
  this.cache[i] = e;
};
zt.prototype.cacheGet = function (i) {
  return i < this.cache.length ? this.cache[i] : 0;
};
function Qn(i, e) {
  var t,
    n,
    s,
    r = -1,
    o = i.posMax,
    a = i.pos,
    c = i.isInLabel;
  if (i.isInLabel) return -1;
  if (i.labelUnmatchedScopes) return i.labelUnmatchedScopes--, -1;
  for (i.pos = e + 1, i.isInLabel = !0, t = 1; i.pos < o;) {
    if (s = i.src.charCodeAt(i.pos), s === 91) t++;else if (s === 93 && (t--, t === 0)) {
      n = !0;
      break;
    }
    i.parser.skipToken(i);
  }
  return n ? (r = i.pos, i.labelUnmatchedScopes = 0) : i.labelUnmatchedScopes = t - 1, i.pos = a, i.isInLabel = c, r;
}
function ta(i, e, t, n) {
  var s, r, o, a, c, l;
  if (i.charCodeAt(0) !== 42 || i.charCodeAt(1) !== 91 || i.indexOf("]:") === -1 || (s = new zt(i, e, t, n, []), r = Qn(s, 1), r < 0 || i.charCodeAt(r + 1) !== 58)) return -1;
  for (a = s.posMax, o = r + 2; o < a && s.src.charCodeAt(o) !== 10; o++);
  return c = i.slice(2, r), l = i.slice(r + 2, o).trim(), l.length === 0 ? -1 : (n.abbreviations || (n.abbreviations = {}), _typeof(n.abbreviations[":" + c]) > "u" && (n.abbreviations[":" + c] = l), o);
}
function na(i) {
  var e = i.tokens,
    t,
    n,
    s,
    r;
  if (!i.inlineMode) {
    for (t = 1, n = e.length - 1; t < n; t++) if (e[t - 1].type === "paragraph_open" && e[t].type === "inline" && e[t + 1].type === "paragraph_close") {
      for (s = e[t].content; s.length && (r = ta(s, i.inline, i.options, i.env), !(r < 0));) s = s.slice(r).trim();
      e[t].content = s, s.length || (e[t - 1].tight = !0, e[t + 1].tight = !0);
    }
  }
}
function ci(i) {
  var e = jt(i);
  try {
    e = decodeURI(e);
  } catch (_unused2) {}
  return encodeURI(e);
}
function so(i, e) {
  var t,
    n,
    s,
    r = e,
    o = i.posMax;
  if (i.src.charCodeAt(e) === 60) {
    for (e++; e < o;) {
      if (t = i.src.charCodeAt(e), t === 10) return !1;
      if (t === 62) return s = ci(Yn(i.src.slice(r + 1, e))), i.parser.validateLink(s) ? (i.pos = e + 1, i.linkContent = s, !0) : !1;
      if (t === 92 && e + 1 < o) {
        e += 2;
        continue;
      }
      e++;
    }
    return !1;
  }
  for (n = 0; e < o && (t = i.src.charCodeAt(e), !(t === 32 || t < 32 || t === 127));) {
    if (t === 92 && e + 1 < o) {
      e += 2;
      continue;
    }
    if (t === 40 && (n++, n > 1) || t === 41 && (n--, n < 0)) break;
    e++;
  }
  return r === e || (s = Yn(i.src.slice(r, e)), !i.parser.validateLink(s)) ? !1 : (i.linkContent = s, i.pos = e, !0);
}
function io(i, e) {
  var t,
    n = e,
    s = i.posMax,
    r = i.src.charCodeAt(e);
  if (r !== 34 && r !== 39 && r !== 40) return !1;
  for (e++, r === 40 && (r = 41); e < s;) {
    if (t = i.src.charCodeAt(e), t === r) return i.pos = e + 1, i.linkContent = Yn(i.src.slice(n + 1, e)), !0;
    if (t === 92 && e + 1 < s) {
      e += 2;
      continue;
    }
    e++;
  }
  return !1;
}
function ro(i) {
  return i.trim().replace(/\s+/g, " ").toUpperCase();
}
function sa(i, e, t, n) {
  var s, r, o, a, c, l, d, p, u;
  if (i.charCodeAt(0) !== 91 || i.indexOf("]:") === -1 || (s = new zt(i, e, t, n, []), r = Qn(s, 0), r < 0 || i.charCodeAt(r + 1) !== 58)) return -1;
  for (a = s.posMax, o = r + 2; o < a && (c = s.src.charCodeAt(o), !(c !== 32 && c !== 10)); o++);
  if (!so(s, o)) return -1;
  for (d = s.linkContent, o = s.pos, l = o, o = o + 1; o < a && (c = s.src.charCodeAt(o), !(c !== 32 && c !== 10)); o++);
  for (o < a && l !== o && io(s, o) ? (p = s.linkContent, o = s.pos) : (p = "", o = l); o < a && s.src.charCodeAt(o) === 32;) o++;
  return o < a && s.src.charCodeAt(o) !== 10 ? -1 : (u = ro(i.slice(1, r)), _typeof(n.references[u]) > "u" && (n.references[u] = {
    title: p,
    href: d
  }), o);
}
function ia(i) {
  var e = i.tokens,
    t,
    n,
    s,
    r;
  if (i.env.references = i.env.references || {}, !i.inlineMode) {
    for (t = 1, n = e.length - 1; t < n; t++) if (e[t].type === "inline" && e[t - 1].type === "paragraph_open" && e[t + 1].type === "paragraph_close") {
      for (s = e[t].content; s.length && (r = sa(s, i.inline, i.options, i.env), !(r < 0));) s = s.slice(r).trim();
      e[t].content = s, s.length || (e[t - 1].tight = !0, e[t + 1].tight = !0);
    }
  }
}
function ra(i) {
  var e = i.tokens,
    t,
    n,
    s;
  for (n = 0, s = e.length; n < s; n++) t = e[n], t.type === "inline" && i.inline.parse(t.content, i.options, i.env, t.children);
}
function oa(i) {
  var e,
    t,
    n,
    s,
    r,
    o,
    a,
    c,
    l,
    d = 0,
    p = !1,
    u = {};
  if (i.env.footnotes && (i.tokens = i.tokens.filter(function (g) {
    return g.type === "footnote_reference_open" ? (p = !0, c = [], l = g.label, !1) : g.type === "footnote_reference_close" ? (p = !1, u[":" + l] = c, !1) : (p && c.push(g), !p);
  }), !!i.env.footnotes.list)) {
    for (o = i.env.footnotes.list, i.tokens.push({
      type: "footnote_block_open",
      level: d++
    }), e = 0, t = o.length; e < t; e++) {
      for (i.tokens.push({
        type: "footnote_open",
        id: e,
        level: d++
      }), o[e].tokens ? (a = [], a.push({
        type: "paragraph_open",
        tight: !1,
        level: d++
      }), a.push({
        type: "inline",
        content: "",
        level: d,
        children: o[e].tokens
      }), a.push({
        type: "paragraph_close",
        tight: !1,
        level: --d
      })) : o[e].label && (a = u[":" + o[e].label]), i.tokens = i.tokens.concat(a), i.tokens[i.tokens.length - 1].type === "paragraph_close" ? r = i.tokens.pop() : r = null, s = o[e].count > 0 ? o[e].count : 1, n = 0; n < s; n++) i.tokens.push({
        type: "footnote_anchor",
        id: e,
        subId: n,
        level: d
      });
      r && i.tokens.push(r), i.tokens.push({
        type: "footnote_close",
        level: --d
      });
    }
    i.tokens.push({
      type: "footnote_block_close",
      level: --d
    });
  }
}
var dr = " \n()[]'\".,!?-";
function ti(i) {
  return i.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1");
}
function aa(i) {
  var e,
    t,
    n,
    s,
    r,
    o,
    a,
    c,
    l,
    d,
    p,
    u,
    g = i.tokens;
  if (i.env.abbreviations) {
    for (i.env.abbrRegExp || (u = "(^|[" + dr.split("").map(ti).join("") + "])(" + Object.keys(i.env.abbreviations).map(function (v) {
      return v.substr(1);
    }).sort(function (v, b) {
      return b.length - v.length;
    }).map(ti).join("|") + ")($|[" + dr.split("").map(ti).join("") + "])", i.env.abbrRegExp = new RegExp(u, "g")), d = i.env.abbrRegExp, t = 0, n = g.length; t < n; t++) if (g[t].type === "inline") {
      for (s = g[t].children, e = s.length - 1; e >= 0; e--) if (r = s[e], r.type === "text") {
        for (c = 0, o = r.content, d.lastIndex = 0, l = r.level, a = []; p = d.exec(o);) d.lastIndex > c && a.push({
          type: "text",
          content: o.slice(c, p.index + p[1].length),
          level: l
        }), a.push({
          type: "abbr_open",
          title: i.env.abbreviations[":" + p[2]],
          level: l++
        }), a.push({
          type: "text",
          content: p[2],
          level: l
        }), a.push({
          type: "abbr_close",
          level: --l
        }), c = d.lastIndex - p[3].length;
        a.length && (c < o.length && a.push({
          type: "text",
          content: o.slice(c),
          level: l
        }), g[t].children = s = [].concat(s.slice(0, e), a, s.slice(e + 1)));
      }
    }
  }
}
var ca = /\+-|\.\.|\?\?\?\?|!!!!|,,|--/,
  la = /\((c|tm|r|p)\)/ig,
  da = {
    c: "©",
    r: "®",
    p: "§",
    tm: "™"
  };
function ha(i) {
  return i.indexOf("(") < 0 ? i : i.replace(la, function (e, t) {
    return da[t.toLowerCase()];
  });
}
function ua(i) {
  var e, t, n, s, r;
  if (i.options.typographer) {
    for (r = i.tokens.length - 1; r >= 0; r--) if (i.tokens[r].type === "inline") for (s = i.tokens[r].children, e = s.length - 1; e >= 0; e--) t = s[e], t.type === "text" && (n = t.content, n = ha(n), ca.test(n) && (n = n.replace(/\+-/g, "±").replace(/\.{2,}/g, "…").replace(/([?!])…/g, "$1..").replace(/([?!]){4,}/g, "$1$1$1").replace(/,{2,}/g, ",").replace(/(^|[^-])---([^-]|$)/mg, "$1—$2").replace(/(^|\s)--(\s|$)/mg, "$1–$2").replace(/(^|[^-\s])--([^-\s]|$)/mg, "$1–$2")), t.content = n);
  }
}
var pa = /['"]/,
  hr = /['"]/g,
  fa = /[-\s()\[\]]/,
  ur = "’";
function pr(i, e) {
  return e < 0 || e >= i.length ? !1 : !fa.test(i[e]);
}
function Wt(i, e, t) {
  return i.substr(0, e) + t + i.substr(e + 1);
}
function ma(i) {
  var e, t, n, s, r, o, a, c, l, d, p, u, g, v, b, E, w;
  if (i.options.typographer) {
    for (w = [], b = i.tokens.length - 1; b >= 0; b--) if (i.tokens[b].type === "inline") {
      for (E = i.tokens[b].children, w.length = 0, e = 0; e < E.length; e++) if (t = E[e], !(t.type !== "text" || pa.test(t.text))) {
        for (a = E[e].level, g = w.length - 1; g >= 0 && !(w[g].level <= a); g--);
        w.length = g + 1, n = t.content, r = 0, o = n.length;
        e: for (; r < o && (hr.lastIndex = r, s = hr.exec(n), !!s);) {
          if (c = !pr(n, s.index - 1), r = s.index + 1, v = s[0] === "'", l = !pr(n, r), !l && !c) {
            v && (t.content = Wt(t.content, s.index, ur));
            continue;
          }
          if (p = !l, u = !c, u) {
            for (g = w.length - 1; g >= 0 && (d = w[g], !(w[g].level < a)); g--) if (d.single === v && w[g].level === a) {
              d = w[g], v ? (E[d.token].content = Wt(E[d.token].content, d.pos, i.options.quotes[2]), t.content = Wt(t.content, s.index, i.options.quotes[3])) : (E[d.token].content = Wt(E[d.token].content, d.pos, i.options.quotes[0]), t.content = Wt(t.content, s.index, i.options.quotes[1])), w.length = g;
              continue e;
            }
          }
          p ? w.push({
            token: e,
            pos: s.index,
            single: v,
            level: a
          }) : u && v && (t.content = Wt(t.content, s.index, ur));
        }
      }
    }
  }
}
var ni = [["block", ea], ["abbr", na], ["references", ia], ["inline", ra], ["footnote_tail", oa], ["abbr2", aa], ["replacements", ua], ["smartquotes", ma]];
function oo() {
  this.options = {}, this.ruler = new Ue();
  for (var i = 0; i < ni.length; i++) this.ruler.push(ni[i][0], ni[i][1]);
}
oo.prototype.process = function (i) {
  var e, t, n;
  for (n = this.ruler.getRules(""), e = 0, t = n.length; e < t; e++) n[e](i);
};
function Vt(i, e, t, n, s) {
  var r, o, a, c, l, d, p;
  for (this.src = i, this.parser = e, this.options = t, this.env = n, this.tokens = s, this.bMarks = [], this.eMarks = [], this.tShift = [], this.blkIndent = 0, this.line = 0, this.lineMax = 0, this.tight = !1, this.parentType = "root", this.ddIndent = -1, this.level = 0, this.result = "", o = this.src, d = 0, p = !1, a = c = d = 0, l = o.length; c < l; c++) {
    if (r = o.charCodeAt(c), !p) if (r === 32) {
      d++;
      continue;
    } else p = !0;
    (r === 10 || c === l - 1) && (r !== 10 && c++, this.bMarks.push(a), this.eMarks.push(c), this.tShift.push(d), p = !1, d = 0, a = c + 1);
  }
  this.bMarks.push(o.length), this.eMarks.push(o.length), this.tShift.push(0), this.lineMax = this.bMarks.length - 1;
}
Vt.prototype.isEmpty = function (e) {
  return this.bMarks[e] + this.tShift[e] >= this.eMarks[e];
};
Vt.prototype.skipEmptyLines = function (e) {
  for (var t = this.lineMax; e < t && !(this.bMarks[e] + this.tShift[e] < this.eMarks[e]); e++);
  return e;
};
Vt.prototype.skipSpaces = function (e) {
  for (var t = this.src.length; e < t && this.src.charCodeAt(e) === 32; e++);
  return e;
};
Vt.prototype.skipChars = function (e, t) {
  for (var n = this.src.length; e < n && this.src.charCodeAt(e) === t; e++);
  return e;
};
Vt.prototype.skipCharsBack = function (e, t, n) {
  if (e <= n) return e;
  for (; e > n;) if (t !== this.src.charCodeAt(--e)) return e + 1;
  return e;
};
Vt.prototype.getLines = function (e, t, n, s) {
  var r,
    o,
    a,
    c,
    l,
    d = e;
  if (e >= t) return "";
  if (d + 1 === t) return o = this.bMarks[d] + Math.min(this.tShift[d], n), a = s ? this.eMarks[d] + 1 : this.eMarks[d], this.src.slice(o, a);
  for (c = new Array(t - e), r = 0; d < t; d++, r++) l = this.tShift[d], l > n && (l = n), l < 0 && (l = 0), o = this.bMarks[d] + l, d + 1 < t || s ? a = this.eMarks[d] + 1 : a = this.eMarks[d], c[r] = this.src.slice(o, a);
  return c.join("");
};
function ga(i, e, t) {
  var n, s;
  if (i.tShift[e] - i.blkIndent < 4) return !1;
  for (s = n = e + 1; n < t;) {
    if (i.isEmpty(n)) {
      n++;
      continue;
    }
    if (i.tShift[n] - i.blkIndent >= 4) {
      n++, s = n;
      continue;
    }
    break;
  }
  return i.line = n, i.tokens.push({
    type: "code",
    content: i.getLines(e, s, 4 + i.blkIndent, !0),
    block: !0,
    lines: [e, i.line],
    level: i.level
  }), !0;
}
function ya(i, e, t, n) {
  var s,
    r,
    o,
    a,
    c,
    l = !1,
    d = i.bMarks[e] + i.tShift[e],
    p = i.eMarks[e];
  if (d + 3 > p || (s = i.src.charCodeAt(d), s !== 126 && s !== 96) || (c = d, d = i.skipChars(d, s), r = d - c, r < 3) || (o = i.src.slice(d, p).trim(), o.indexOf("`") >= 0)) return !1;
  if (n) return !0;
  for (a = e; a++, !(a >= t || (d = c = i.bMarks[a] + i.tShift[a], p = i.eMarks[a], d < p && i.tShift[a] < i.blkIndent));) if (i.src.charCodeAt(d) === s && !(i.tShift[a] - i.blkIndent >= 4) && (d = i.skipChars(d, s), !(d - c < r) && (d = i.skipSpaces(d), !(d < p)))) {
    l = !0;
    break;
  }
  return r = i.tShift[e], i.line = a + (l ? 1 : 0), i.tokens.push({
    type: "fence",
    params: o,
    content: i.getLines(e + 1, a, r, !0),
    lines: [e, i.line],
    level: i.level
  }), !0;
}
function ba(i, e, t, n) {
  var s,
    r,
    o,
    a,
    c,
    l,
    d,
    p,
    u,
    g,
    v,
    b = i.bMarks[e] + i.tShift[e],
    E = i.eMarks[e];
  if (b > E || i.src.charCodeAt(b++) !== 62 || i.level >= i.options.maxNesting) return !1;
  if (n) return !0;
  for (i.src.charCodeAt(b) === 32 && b++, c = i.blkIndent, i.blkIndent = 0, a = [i.bMarks[e]], i.bMarks[e] = b, b = b < E ? i.skipSpaces(b) : b, r = b >= E, o = [i.tShift[e]], i.tShift[e] = b - i.bMarks[e], p = i.parser.ruler.getRules("blockquote"), s = e + 1; s < t && (b = i.bMarks[s] + i.tShift[s], E = i.eMarks[s], !(b >= E)); s++) {
    if (i.src.charCodeAt(b++) === 62) {
      i.src.charCodeAt(b) === 32 && b++, a.push(i.bMarks[s]), i.bMarks[s] = b, b = b < E ? i.skipSpaces(b) : b, r = b >= E, o.push(i.tShift[s]), i.tShift[s] = b - i.bMarks[s];
      continue;
    }
    if (r) break;
    for (v = !1, u = 0, g = p.length; u < g; u++) if (p[u](i, s, t, !0)) {
      v = !0;
      break;
    }
    if (v) break;
    a.push(i.bMarks[s]), o.push(i.tShift[s]), i.tShift[s] = -1337;
  }
  for (l = i.parentType, i.parentType = "blockquote", i.tokens.push({
    type: "blockquote_open",
    lines: d = [e, 0],
    level: i.level++
  }), i.parser.tokenize(i, e, s), i.tokens.push({
    type: "blockquote_close",
    level: --i.level
  }), i.parentType = l, d[1] = i.line, u = 0; u < o.length; u++) i.bMarks[u + e] = a[u], i.tShift[u + e] = o[u];
  return i.blkIndent = c, !0;
}
function va(i, e, t, n) {
  var s,
    r,
    o,
    a = i.bMarks[e],
    c = i.eMarks[e];
  if (a += i.tShift[e], a > c || (s = i.src.charCodeAt(a++), s !== 42 && s !== 45 && s !== 95)) return !1;
  for (r = 1; a < c;) {
    if (o = i.src.charCodeAt(a++), o !== s && o !== 32) return !1;
    o === s && r++;
  }
  return r < 3 ? !1 : (n || (i.line = e + 1, i.tokens.push({
    type: "hr",
    lines: [e, i.line],
    level: i.level
  })), !0);
}
function fr(i, e) {
  var t, n, s;
  return n = i.bMarks[e] + i.tShift[e], s = i.eMarks[e], n >= s || (t = i.src.charCodeAt(n++), t !== 42 && t !== 45 && t !== 43) || n < s && i.src.charCodeAt(n) !== 32 ? -1 : n;
}
function mr(i, e) {
  var t,
    n = i.bMarks[e] + i.tShift[e],
    s = i.eMarks[e];
  if (n + 1 >= s || (t = i.src.charCodeAt(n++), t < 48 || t > 57)) return -1;
  for (;;) {
    if (n >= s) return -1;
    if (t = i.src.charCodeAt(n++), !(t >= 48 && t <= 57)) {
      if (t === 41 || t === 46) break;
      return -1;
    }
  }
  return n < s && i.src.charCodeAt(n) !== 32 ? -1 : n;
}
function _a(i, e) {
  var t,
    n,
    s = i.level + 2;
  for (t = e + 2, n = i.tokens.length - 2; t < n; t++) i.tokens[t].level === s && i.tokens[t].type === "paragraph_open" && (i.tokens[t + 2].tight = !0, i.tokens[t].tight = !0, t += 2);
}
function Ea(i, e, t, n) {
  var s,
    r,
    o,
    a,
    c,
    l,
    d,
    p,
    u,
    g,
    v,
    b,
    E,
    w,
    F,
    J,
    K,
    be,
    _t = !0,
    Et,
    Pe,
    Qi,
    Zs;
  if ((p = mr(i, e)) >= 0) E = !0;else if ((p = fr(i, e)) >= 0) E = !1;else return !1;
  if (i.level >= i.options.maxNesting) return !1;
  if (b = i.src.charCodeAt(p - 1), n) return !0;
  for (F = i.tokens.length, E ? (d = i.bMarks[e] + i.tShift[e], v = Number(i.src.substr(d, p - d - 1)), i.tokens.push({
    type: "ordered_list_open",
    order: v,
    lines: K = [e, 0],
    level: i.level++
  })) : i.tokens.push({
    type: "bullet_list_open",
    lines: K = [e, 0],
    level: i.level++
  }), s = e, J = !1, Et = i.parser.ruler.getRules("list"); s < t && (w = i.skipSpaces(p), u = i.eMarks[s], w >= u ? g = 1 : g = w - p, g > 4 && (g = 1), g < 1 && (g = 1), r = p - i.bMarks[s] + g, i.tokens.push({
    type: "list_item_open",
    lines: be = [e, 0],
    level: i.level++
  }), a = i.blkIndent, c = i.tight, o = i.tShift[e], l = i.parentType, i.tShift[e] = w - i.bMarks[e], i.blkIndent = r, i.tight = !0, i.parentType = "list", i.parser.tokenize(i, e, t, !0), (!i.tight || J) && (_t = !1), J = i.line - e > 1 && i.isEmpty(i.line - 1), i.blkIndent = a, i.tShift[e] = o, i.tight = c, i.parentType = l, i.tokens.push({
    type: "list_item_close",
    level: --i.level
  }), s = e = i.line, be[1] = s, w = i.bMarks[e], !(s >= t || i.isEmpty(s) || i.tShift[s] < i.blkIndent));) {
    for (Zs = !1, Pe = 0, Qi = Et.length; Pe < Qi; Pe++) if (Et[Pe](i, s, t, !0)) {
      Zs = !0;
      break;
    }
    if (Zs) break;
    if (E) {
      if (p = mr(i, s), p < 0) break;
    } else if (p = fr(i, s), p < 0) break;
    if (b !== i.src.charCodeAt(p - 1)) break;
  }
  return i.tokens.push({
    type: E ? "ordered_list_close" : "bullet_list_close",
    level: --i.level
  }), K[1] = s, i.line = s, _t && _a(i, F), !0;
}
function Sa(i, e, t, n) {
  var s,
    r,
    o,
    a,
    c,
    l = i.bMarks[e] + i.tShift[e],
    d = i.eMarks[e];
  if (l + 4 > d || i.src.charCodeAt(l) !== 91 || i.src.charCodeAt(l + 1) !== 94 || i.level >= i.options.maxNesting) return !1;
  for (a = l + 2; a < d; a++) {
    if (i.src.charCodeAt(a) === 32) return !1;
    if (i.src.charCodeAt(a) === 93) break;
  }
  return a === l + 2 || a + 1 >= d || i.src.charCodeAt(++a) !== 58 ? !1 : (n || (a++, i.env.footnotes || (i.env.footnotes = {}), i.env.footnotes.refs || (i.env.footnotes.refs = {}), c = i.src.slice(l + 2, a - 2), i.env.footnotes.refs[":" + c] = -1, i.tokens.push({
    type: "footnote_reference_open",
    label: c,
    level: i.level++
  }), s = i.bMarks[e], r = i.tShift[e], o = i.parentType, i.tShift[e] = i.skipSpaces(a) - a, i.bMarks[e] = a, i.blkIndent += 4, i.parentType = "footnote", i.tShift[e] < i.blkIndent && (i.tShift[e] += i.blkIndent, i.bMarks[e] -= i.blkIndent), i.parser.tokenize(i, e, t, !0), i.parentType = o, i.blkIndent -= 4, i.tShift[e] = r, i.bMarks[e] = s, i.tokens.push({
    type: "footnote_reference_close",
    level: --i.level
  })), !0);
}
function xa(i, e, t, n) {
  var s,
    r,
    o,
    a = i.bMarks[e] + i.tShift[e],
    c = i.eMarks[e];
  if (a >= c || (s = i.src.charCodeAt(a), s !== 35 || a >= c)) return !1;
  for (r = 1, s = i.src.charCodeAt(++a); s === 35 && a < c && r <= 6;) r++, s = i.src.charCodeAt(++a);
  return r > 6 || a < c && s !== 32 ? !1 : (n || (c = i.skipCharsBack(c, 32, a), o = i.skipCharsBack(c, 35, a), o > a && i.src.charCodeAt(o - 1) === 32 && (c = o), i.line = e + 1, i.tokens.push({
    type: "heading_open",
    hLevel: r,
    lines: [e, i.line],
    level: i.level
  }), a < c && i.tokens.push({
    type: "inline",
    content: i.src.slice(a, c).trim(),
    level: i.level + 1,
    lines: [e, i.line],
    children: []
  }), i.tokens.push({
    type: "heading_close",
    hLevel: r,
    level: i.level
  })), !0);
}
function Aa(i, e, t) {
  var n,
    s,
    r,
    o = e + 1;
  return o >= t || i.tShift[o] < i.blkIndent || i.tShift[o] - i.blkIndent > 3 || (s = i.bMarks[o] + i.tShift[o], r = i.eMarks[o], s >= r) || (n = i.src.charCodeAt(s), n !== 45 && n !== 61) || (s = i.skipChars(s, n), s = i.skipSpaces(s), s < r) ? !1 : (s = i.bMarks[e] + i.tShift[e], i.line = o + 1, i.tokens.push({
    type: "heading_open",
    hLevel: n === 61 ? 1 : 2,
    lines: [e, i.line],
    level: i.level
  }), i.tokens.push({
    type: "inline",
    content: i.src.slice(s, i.eMarks[e]).trim(),
    level: i.level + 1,
    lines: [e, i.line - 1],
    children: []
  }), i.tokens.push({
    type: "heading_close",
    hLevel: n === 61 ? 1 : 2,
    level: i.level
  }), !0);
}
var ao = {};
["article", "aside", "button", "blockquote", "body", "canvas", "caption", "col", "colgroup", "dd", "div", "dl", "dt", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "hr", "iframe", "li", "map", "object", "ol", "output", "p", "pre", "progress", "script", "section", "style", "table", "tbody", "td", "textarea", "tfoot", "th", "tr", "thead", "ul", "video"].forEach(function (i) {
  ao[i] = !0;
});
var wa = /^<([a-zA-Z]{1,15})[\s\/>]/,
  Ca = /^<\/([a-zA-Z]{1,15})[\s>]/;
function Ta(i) {
  var e = i | 32;
  return e >= 97 && e <= 122;
}
function Ra(i, e, t, n) {
  var s,
    r,
    o,
    a = i.bMarks[e],
    c = i.eMarks[e],
    l = i.tShift[e];
  if (a += l, !i.options.html || l > 3 || a + 2 >= c || i.src.charCodeAt(a) !== 60) return !1;
  if (s = i.src.charCodeAt(a + 1), s === 33 || s === 63) {
    if (n) return !0;
  } else if (s === 47 || Ta(s)) {
    if (s === 47) {
      if (r = i.src.slice(a, c).match(Ca), !r) return !1;
    } else if (r = i.src.slice(a, c).match(wa), !r) return !1;
    if (ao[r[1].toLowerCase()] !== !0) return !1;
    if (n) return !0;
  } else return !1;
  for (o = e + 1; o < i.lineMax && !i.isEmpty(o);) o++;
  return i.line = o, i.tokens.push({
    type: "htmlblock",
    level: i.level,
    lines: [e, i.line],
    content: i.getLines(e, o, 0, !0)
  }), !0;
}
function si(i, e) {
  var t = i.bMarks[e] + i.blkIndent,
    n = i.eMarks[e];
  return i.src.substr(t, n - t);
}
function Ia(i, e, t, n) {
  var s, r, o, a, c, l, d, p, u, g, v;
  if (e + 2 > t || (c = e + 1, i.tShift[c] < i.blkIndent) || (o = i.bMarks[c] + i.tShift[c], o >= i.eMarks[c]) || (s = i.src.charCodeAt(o), s !== 124 && s !== 45 && s !== 58) || (r = si(i, e + 1), !/^[-:| ]+$/.test(r)) || (l = r.split("|"), l <= 2)) return !1;
  for (p = [], a = 0; a < l.length; a++) {
    if (u = l[a].trim(), !u) {
      if (a === 0 || a === l.length - 1) continue;
      return !1;
    }
    if (!/^:?-+:?$/.test(u)) return !1;
    u.charCodeAt(u.length - 1) === 58 ? p.push(u.charCodeAt(0) === 58 ? "center" : "right") : u.charCodeAt(0) === 58 ? p.push("left") : p.push("");
  }
  if (r = si(i, e).trim(), r.indexOf("|") === -1 || (l = r.replace(/^\||\|$/g, "").split("|"), p.length !== l.length)) return !1;
  if (n) return !0;
  for (i.tokens.push({
    type: "table_open",
    lines: g = [e, 0],
    level: i.level++
  }), i.tokens.push({
    type: "thead_open",
    lines: [e, e + 1],
    level: i.level++
  }), i.tokens.push({
    type: "tr_open",
    lines: [e, e + 1],
    level: i.level++
  }), a = 0; a < l.length; a++) i.tokens.push({
    type: "th_open",
    align: p[a],
    lines: [e, e + 1],
    level: i.level++
  }), i.tokens.push({
    type: "inline",
    content: l[a].trim(),
    lines: [e, e + 1],
    level: i.level,
    children: []
  }), i.tokens.push({
    type: "th_close",
    level: --i.level
  });
  for (i.tokens.push({
    type: "tr_close",
    level: --i.level
  }), i.tokens.push({
    type: "thead_close",
    level: --i.level
  }), i.tokens.push({
    type: "tbody_open",
    lines: v = [e + 2, 0],
    level: i.level++
  }), c = e + 2; c < t && !(i.tShift[c] < i.blkIndent || (r = si(i, c).trim(), r.indexOf("|") === -1)); c++) {
    for (l = r.replace(/^\||\|$/g, "").split("|"), i.tokens.push({
      type: "tr_open",
      level: i.level++
    }), a = 0; a < l.length; a++) i.tokens.push({
      type: "td_open",
      align: p[a],
      level: i.level++
    }), d = l[a].substring(l[a].charCodeAt(0) === 124 ? 1 : 0, l[a].charCodeAt(l[a].length - 1) === 124 ? l[a].length - 1 : l[a].length).trim(), i.tokens.push({
      type: "inline",
      content: d,
      level: i.level,
      children: []
    }), i.tokens.push({
      type: "td_close",
      level: --i.level
    });
    i.tokens.push({
      type: "tr_close",
      level: --i.level
    });
  }
  return i.tokens.push({
    type: "tbody_close",
    level: --i.level
  }), i.tokens.push({
    type: "table_close",
    level: --i.level
  }), g[1] = v[1] = c, i.line = c, !0;
}
function ps(i, e) {
  var t,
    n,
    s = i.bMarks[e] + i.tShift[e],
    r = i.eMarks[e];
  return s >= r || (n = i.src.charCodeAt(s++), n !== 126 && n !== 58) || (t = i.skipSpaces(s), s === t) || t >= r ? -1 : t;
}
function Ma(i, e) {
  var t,
    n,
    s = i.level + 2;
  for (t = e + 2, n = i.tokens.length - 2; t < n; t++) i.tokens[t].level === s && i.tokens[t].type === "paragraph_open" && (i.tokens[t + 2].tight = !0, i.tokens[t].tight = !0, t += 2);
}
function ka(i, e, t, n) {
  var s, r, o, a, c, l, d, p, u, g, v, b, E, w;
  if (n) return i.ddIndent < 0 ? !1 : ps(i, e) >= 0;
  if (d = e + 1, i.isEmpty(d) && ++d > t || i.tShift[d] < i.blkIndent || (s = ps(i, d), s < 0) || i.level >= i.options.maxNesting) return !1;
  l = i.tokens.length, i.tokens.push({
    type: "dl_open",
    lines: c = [e, 0],
    level: i.level++
  }), o = e, r = d;
  e: for (;;) {
    for (w = !0, E = !1, i.tokens.push({
      type: "dt_open",
      lines: [o, o],
      level: i.level++
    }), i.tokens.push({
      type: "inline",
      content: i.getLines(o, o + 1, i.blkIndent, !1).trim(),
      level: i.level + 1,
      lines: [o, o],
      children: []
    }), i.tokens.push({
      type: "dt_close",
      level: --i.level
    });;) {
      if (i.tokens.push({
        type: "dd_open",
        lines: a = [d, 0],
        level: i.level++
      }), b = i.tight, u = i.ddIndent, p = i.blkIndent, v = i.tShift[r], g = i.parentType, i.blkIndent = i.ddIndent = i.tShift[r] + 2, i.tShift[r] = s - i.bMarks[r], i.tight = !0, i.parentType = "deflist", i.parser.tokenize(i, r, t, !0), (!i.tight || E) && (w = !1), E = i.line - r > 1 && i.isEmpty(i.line - 1), i.tShift[r] = v, i.tight = b, i.parentType = g, i.blkIndent = p, i.ddIndent = u, i.tokens.push({
        type: "dd_close",
        level: --i.level
      }), a[1] = d = i.line, d >= t || i.tShift[d] < i.blkIndent) break e;
      if (s = ps(i, d), s < 0) break;
      r = d;
    }
    if (d >= t || (o = d, i.isEmpty(o)) || i.tShift[o] < i.blkIndent || (r = o + 1, r >= t) || (i.isEmpty(r) && r++, r >= t) || i.tShift[r] < i.blkIndent || (s = ps(i, r), s < 0)) break;
  }
  return i.tokens.push({
    type: "dl_close",
    level: --i.level
  }), c[1] = d, i.line = d, w && Ma(i, l), !0;
}
function Oa(i, e) {
  var t,
    n,
    s,
    r,
    o,
    a = e + 1,
    c;
  if (t = i.lineMax, a < t && !i.isEmpty(a)) {
    for (c = i.parser.ruler.getRules("paragraph"); a < t && !i.isEmpty(a); a++) if (!(i.tShift[a] - i.blkIndent > 3)) {
      for (s = !1, r = 0, o = c.length; r < o; r++) if (c[r](i, a, t, !0)) {
        s = !0;
        break;
      }
      if (s) break;
    }
  }
  return n = i.getLines(e, a, i.blkIndent, !1).trim(), i.line = a, n.length && (i.tokens.push({
    type: "paragraph_open",
    tight: !1,
    lines: [e, i.line],
    level: i.level
  }), i.tokens.push({
    type: "inline",
    content: n,
    level: i.level + 1,
    lines: [e, i.line],
    children: []
  }), i.tokens.push({
    type: "paragraph_close",
    tight: !1,
    level: i.level
  })), !0;
}
var fs = [["code", ga], ["fences", ya, ["paragraph", "blockquote", "list"]], ["blockquote", ba, ["paragraph", "blockquote", "list"]], ["hr", va, ["paragraph", "blockquote", "list"]], ["list", Ea, ["paragraph", "blockquote"]], ["footnote", Sa, ["paragraph"]], ["heading", xa, ["paragraph", "blockquote"]], ["lheading", Aa], ["htmlblock", Ra, ["paragraph", "blockquote"]], ["table", Ia, ["paragraph"]], ["deflist", ka, ["paragraph"]], ["paragraph", Oa]];
function Mi() {
  this.ruler = new Ue();
  for (var i = 0; i < fs.length; i++) this.ruler.push(fs[i][0], fs[i][1], {
    alt: (fs[i][2] || []).slice()
  });
}
Mi.prototype.tokenize = function (i, e, t) {
  for (var n = this.ruler.getRules(""), s = n.length, r = e, o = !1, a, c; r < t && (i.line = r = i.skipEmptyLines(r), !(r >= t || i.tShift[r] < i.blkIndent));) {
    for (c = 0; c < s && (a = n[c](i, r, t, !1), !a); c++);
    if (i.tight = !o, i.isEmpty(i.line - 1) && (o = !0), r = i.line, r < t && i.isEmpty(r)) {
      if (o = !0, r++, r < t && i.parentType === "list" && i.isEmpty(r)) break;
      i.line = r;
    }
  }
};
var Na = /[\n\t]/g,
  Pa = /\r[\n\u0085]|[\u2424\u2028\u0085]/g,
  La = /\u00a0/g;
Mi.prototype.parse = function (i, e, t, n) {
  var s,
    r = 0,
    o = 0;
  if (!i) return [];
  i = i.replace(La, " "), i = i.replace(Pa, "\n"), i.indexOf("	") >= 0 && (i = i.replace(Na, function (a, c) {
    var l;
    return i.charCodeAt(c) === 10 ? (r = c + 1, o = 0, a) : (l = "    ".slice((c - r - o) % 4), o = c - r + 1, l);
  })), s = new Vt(i, this, e, t, n), this.tokenize(s, s.line, s.lineMax);
};
function Ba(i) {
  switch (i) {
    case 10:
    case 92:
    case 96:
    case 42:
    case 95:
    case 94:
    case 91:
    case 93:
    case 33:
    case 38:
    case 60:
    case 62:
    case 123:
    case 125:
    case 36:
    case 37:
    case 64:
    case 126:
    case 43:
    case 61:
    case 58:
      return !0;
    default:
      return !1;
  }
}
function Da(i, e) {
  for (var t = i.pos; t < i.posMax && !Ba(i.src.charCodeAt(t));) t++;
  return t === i.pos ? !1 : (e || (i.pending += i.src.slice(i.pos, t)), i.pos = t, !0);
}
function Fa(i, e) {
  var t,
    n,
    s = i.pos;
  if (i.src.charCodeAt(s) !== 10) return !1;
  if (t = i.pending.length - 1, n = i.posMax, !e) if (t >= 0 && i.pending.charCodeAt(t) === 32) {
    if (t >= 1 && i.pending.charCodeAt(t - 1) === 32) {
      for (var r = t - 2; r >= 0; r--) if (i.pending.charCodeAt(r) !== 32) {
        i.pending = i.pending.substring(0, r + 1);
        break;
      }
      i.push({
        type: "hardbreak",
        level: i.level
      });
    } else i.pending = i.pending.slice(0, -1), i.push({
      type: "softbreak",
      level: i.level
    });
  } else i.push({
    type: "softbreak",
    level: i.level
  });
  for (s++; s < n && i.src.charCodeAt(s) === 32;) s++;
  return i.pos = s, !0;
}
var ki = [];
for (var gr = 0; gr < 256; gr++) ki.push(0);
"\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function (i) {
  ki[i.charCodeAt(0)] = 1;
});
function Ua(i, e) {
  var t,
    n = i.pos,
    s = i.posMax;
  if (i.src.charCodeAt(n) !== 92) return !1;
  if (n++, n < s) {
    if (t = i.src.charCodeAt(n), t < 256 && ki[t] !== 0) return e || (i.pending += i.src[n]), i.pos += 2, !0;
    if (t === 10) {
      for (e || i.push({
        type: "hardbreak",
        level: i.level
      }), n++; n < s && i.src.charCodeAt(n) === 32;) n++;
      return i.pos = n, !0;
    }
  }
  return e || (i.pending += "\\"), i.pos++, !0;
}
function Ha(i, e) {
  var t,
    n,
    s,
    r,
    o,
    a = i.pos,
    c = i.src.charCodeAt(a);
  if (c !== 96) return !1;
  for (t = a, a++, n = i.posMax; a < n && i.src.charCodeAt(a) === 96;) a++;
  for (s = i.src.slice(t, a), r = o = a; (r = i.src.indexOf("`", o)) !== -1;) {
    for (o = r + 1; o < n && i.src.charCodeAt(o) === 96;) o++;
    if (o - r === s.length) return e || i.push({
      type: "code",
      content: i.src.slice(a, r).replace(/[ \n]+/g, " ").trim(),
      block: !1,
      level: i.level
    }), i.pos = o, !0;
  }
  return e || (i.pending += s), i.pos += s.length, !0;
}
function ja(i, e) {
  var t,
    n,
    s,
    r = i.posMax,
    o = i.pos,
    a,
    c;
  if (i.src.charCodeAt(o) !== 126 || e || o + 4 >= r || i.src.charCodeAt(o + 1) !== 126 || i.level >= i.options.maxNesting || (a = o > 0 ? i.src.charCodeAt(o - 1) : -1, c = i.src.charCodeAt(o + 2), a === 126) || c === 126 || c === 32 || c === 10) return !1;
  for (n = o + 2; n < r && i.src.charCodeAt(n) === 126;) n++;
  if (n > o + 3) return i.pos += n - o, e || (i.pending += i.src.slice(o, n)), !0;
  for (i.pos = o + 2, s = 1; i.pos + 1 < r;) {
    if (i.src.charCodeAt(i.pos) === 126 && i.src.charCodeAt(i.pos + 1) === 126 && (a = i.src.charCodeAt(i.pos - 1), c = i.pos + 2 < r ? i.src.charCodeAt(i.pos + 2) : -1, c !== 126 && a !== 126 && (a !== 32 && a !== 10 ? s-- : c !== 32 && c !== 10 && s++, s <= 0))) {
      t = !0;
      break;
    }
    i.parser.skipToken(i);
  }
  return t ? (i.posMax = i.pos, i.pos = o + 2, e || (i.push({
    type: "del_open",
    level: i.level++
  }), i.parser.tokenize(i), i.push({
    type: "del_close",
    level: --i.level
  })), i.pos = i.posMax + 2, i.posMax = r, !0) : (i.pos = o, !1);
}
function qa(i, e) {
  var t,
    n,
    s,
    r = i.posMax,
    o = i.pos,
    a,
    c;
  if (i.src.charCodeAt(o) !== 43 || e || o + 4 >= r || i.src.charCodeAt(o + 1) !== 43 || i.level >= i.options.maxNesting || (a = o > 0 ? i.src.charCodeAt(o - 1) : -1, c = i.src.charCodeAt(o + 2), a === 43) || c === 43 || c === 32 || c === 10) return !1;
  for (n = o + 2; n < r && i.src.charCodeAt(n) === 43;) n++;
  if (n !== o + 2) return i.pos += n - o, e || (i.pending += i.src.slice(o, n)), !0;
  for (i.pos = o + 2, s = 1; i.pos + 1 < r;) {
    if (i.src.charCodeAt(i.pos) === 43 && i.src.charCodeAt(i.pos + 1) === 43 && (a = i.src.charCodeAt(i.pos - 1), c = i.pos + 2 < r ? i.src.charCodeAt(i.pos + 2) : -1, c !== 43 && a !== 43 && (a !== 32 && a !== 10 ? s-- : c !== 32 && c !== 10 && s++, s <= 0))) {
      t = !0;
      break;
    }
    i.parser.skipToken(i);
  }
  return t ? (i.posMax = i.pos, i.pos = o + 2, e || (i.push({
    type: "ins_open",
    level: i.level++
  }), i.parser.tokenize(i), i.push({
    type: "ins_close",
    level: --i.level
  })), i.pos = i.posMax + 2, i.posMax = r, !0) : (i.pos = o, !1);
}
function $a(i, e) {
  var t,
    n,
    s,
    r = i.posMax,
    o = i.pos,
    a,
    c;
  if (i.src.charCodeAt(o) !== 61 || e || o + 4 >= r || i.src.charCodeAt(o + 1) !== 61 || i.level >= i.options.maxNesting || (a = o > 0 ? i.src.charCodeAt(o - 1) : -1, c = i.src.charCodeAt(o + 2), a === 61) || c === 61 || c === 32 || c === 10) return !1;
  for (n = o + 2; n < r && i.src.charCodeAt(n) === 61;) n++;
  if (n !== o + 2) return i.pos += n - o, e || (i.pending += i.src.slice(o, n)), !0;
  for (i.pos = o + 2, s = 1; i.pos + 1 < r;) {
    if (i.src.charCodeAt(i.pos) === 61 && i.src.charCodeAt(i.pos + 1) === 61 && (a = i.src.charCodeAt(i.pos - 1), c = i.pos + 2 < r ? i.src.charCodeAt(i.pos + 2) : -1, c !== 61 && a !== 61 && (a !== 32 && a !== 10 ? s-- : c !== 32 && c !== 10 && s++, s <= 0))) {
      t = !0;
      break;
    }
    i.parser.skipToken(i);
  }
  return t ? (i.posMax = i.pos, i.pos = o + 2, e || (i.push({
    type: "mark_open",
    level: i.level++
  }), i.parser.tokenize(i), i.push({
    type: "mark_close",
    level: --i.level
  })), i.pos = i.posMax + 2, i.posMax = r, !0) : (i.pos = o, !1);
}
function yr(i) {
  return i >= 48 && i <= 57 || i >= 65 && i <= 90 || i >= 97 && i <= 122;
}
function br(i, e) {
  var t = e,
    n,
    s,
    r,
    o = !0,
    a = !0,
    c = i.posMax,
    l = i.src.charCodeAt(e);
  for (n = e > 0 ? i.src.charCodeAt(e - 1) : -1; t < c && i.src.charCodeAt(t) === l;) t++;
  return t >= c && (o = !1), r = t - e, r >= 4 ? o = a = !1 : (s = t < c ? i.src.charCodeAt(t) : -1, (s === 32 || s === 10) && (o = !1), (n === 32 || n === 10) && (a = !1), l === 95 && (yr(n) && (o = !1), yr(s) && (a = !1))), {
    can_open: o,
    can_close: a,
    delims: r
  };
}
function Ga(i, e) {
  var t,
    n,
    s,
    r,
    o,
    a,
    c,
    l = i.posMax,
    d = i.pos,
    p = i.src.charCodeAt(d);
  if (p !== 95 && p !== 42 || e) return !1;
  if (c = br(i, d), t = c.delims, !c.can_open) return i.pos += t, e || (i.pending += i.src.slice(d, i.pos)), !0;
  if (i.level >= i.options.maxNesting) return !1;
  for (i.pos = d + t, a = [t]; i.pos < l;) {
    if (i.src.charCodeAt(i.pos) === p) {
      if (c = br(i, i.pos), n = c.delims, c.can_close) {
        for (r = a.pop(), o = n; r !== o;) {
          if (o < r) {
            a.push(r - o);
            break;
          }
          if (o -= r, a.length === 0) break;
          i.pos += r, r = a.pop();
        }
        if (a.length === 0) {
          t = r, s = !0;
          break;
        }
        i.pos += n;
        continue;
      }
      c.can_open && a.push(n), i.pos += n;
      continue;
    }
    i.parser.skipToken(i);
  }
  return s ? (i.posMax = i.pos, i.pos = d + t, e || ((t === 2 || t === 3) && i.push({
    type: "strong_open",
    level: i.level++
  }), (t === 1 || t === 3) && i.push({
    type: "em_open",
    level: i.level++
  }), i.parser.tokenize(i), (t === 1 || t === 3) && i.push({
    type: "em_close",
    level: --i.level
  }), (t === 2 || t === 3) && i.push({
    type: "strong_close",
    level: --i.level
  })), i.pos = i.posMax + t, i.posMax = l, !0) : (i.pos = d, !1);
}
var za = /\\([ \\!"#$%&'()*+,.\/:;<=>?@[\]^_`{|}~-])/g;
function Va(i, e) {
  var t,
    n,
    s = i.posMax,
    r = i.pos;
  if (i.src.charCodeAt(r) !== 126 || e || r + 2 >= s || i.level >= i.options.maxNesting) return !1;
  for (i.pos = r + 1; i.pos < s;) {
    if (i.src.charCodeAt(i.pos) === 126) {
      t = !0;
      break;
    }
    i.parser.skipToken(i);
  }
  return !t || r + 1 === i.pos || (n = i.src.slice(r + 1, i.pos), n.match(/(^|[^\\])(\\\\)*\s/)) ? (i.pos = r, !1) : (i.posMax = i.pos, i.pos = r + 1, e || i.push({
    type: "sub",
    level: i.level,
    content: n.replace(za, "$1")
  }), i.pos = i.posMax + 1, i.posMax = s, !0);
}
var Ja = /\\([ \\!"#$%&'()*+,.\/:;<=>?@[\]^_`{|}~-])/g;
function Ka(i, e) {
  var t,
    n,
    s = i.posMax,
    r = i.pos;
  if (i.src.charCodeAt(r) !== 94 || e || r + 2 >= s || i.level >= i.options.maxNesting) return !1;
  for (i.pos = r + 1; i.pos < s;) {
    if (i.src.charCodeAt(i.pos) === 94) {
      t = !0;
      break;
    }
    i.parser.skipToken(i);
  }
  return !t || r + 1 === i.pos || (n = i.src.slice(r + 1, i.pos), n.match(/(^|[^\\])(\\\\)*\s/)) ? (i.pos = r, !1) : (i.posMax = i.pos, i.pos = r + 1, e || i.push({
    type: "sup",
    level: i.level,
    content: n.replace(Ja, "$1")
  }), i.pos = i.posMax + 1, i.posMax = s, !0);
}
function Wa(i, e) {
  var t,
    n,
    s,
    r,
    o,
    a,
    c,
    l,
    d = !1,
    p = i.pos,
    u = i.posMax,
    g = i.pos,
    v = i.src.charCodeAt(g);
  if (v === 33 && (d = !0, v = i.src.charCodeAt(++g)), v !== 91 || i.level >= i.options.maxNesting || (t = g + 1, n = Qn(i, g), n < 0)) return !1;
  if (a = n + 1, a < u && i.src.charCodeAt(a) === 40) {
    for (a++; a < u && (l = i.src.charCodeAt(a), !(l !== 32 && l !== 10)); a++);
    if (a >= u) return !1;
    for (g = a, so(i, a) ? (r = i.linkContent, a = i.pos) : r = "", g = a; a < u && (l = i.src.charCodeAt(a), !(l !== 32 && l !== 10)); a++);
    if (a < u && g !== a && io(i, a)) for (o = i.linkContent, a = i.pos; a < u && (l = i.src.charCodeAt(a), !(l !== 32 && l !== 10)); a++);else o = "";
    if (a >= u || i.src.charCodeAt(a) !== 41) return i.pos = p, !1;
    a++;
  } else {
    if (i.linkLevel > 0) return !1;
    for (; a < u && (l = i.src.charCodeAt(a), !(l !== 32 && l !== 10)); a++);
    if (a < u && i.src.charCodeAt(a) === 91 && (g = a + 1, a = Qn(i, a), a >= 0 ? s = i.src.slice(g, a++) : a = g - 1), s || (_typeof(s) > "u" && (a = n + 1), s = i.src.slice(t, n)), c = i.env.references[ro(s)], !c) return i.pos = p, !1;
    r = c.href, o = c.title;
  }
  return e || (i.pos = t, i.posMax = n, d ? i.push({
    type: "image",
    src: r,
    title: o,
    alt: i.src.substr(t, n - t),
    level: i.level
  }) : (i.push({
    type: "link_open",
    href: r,
    title: o,
    level: i.level++
  }), i.linkLevel++, i.parser.tokenize(i), i.linkLevel--, i.push({
    type: "link_close",
    level: --i.level
  }))), i.pos = a, i.posMax = u, !0;
}
function Xa(i, e) {
  var t,
    n,
    s,
    r,
    o = i.posMax,
    a = i.pos;
  return a + 2 >= o || i.src.charCodeAt(a) !== 94 || i.src.charCodeAt(a + 1) !== 91 || i.level >= i.options.maxNesting || (t = a + 2, n = Qn(i, a + 1), n < 0) ? !1 : (e || (i.env.footnotes || (i.env.footnotes = {}), i.env.footnotes.list || (i.env.footnotes.list = []), s = i.env.footnotes.list.length, i.pos = t, i.posMax = n, i.push({
    type: "footnote_ref",
    id: s,
    level: i.level
  }), i.linkLevel++, r = i.tokens.length, i.parser.tokenize(i), i.env.footnotes.list[s] = {
    tokens: i.tokens.splice(r)
  }, i.linkLevel--), i.pos = n + 1, i.posMax = o, !0);
}
function Za(i, e) {
  var t,
    n,
    s,
    r,
    o = i.posMax,
    a = i.pos;
  if (a + 3 > o || !i.env.footnotes || !i.env.footnotes.refs || i.src.charCodeAt(a) !== 91 || i.src.charCodeAt(a + 1) !== 94 || i.level >= i.options.maxNesting) return !1;
  for (n = a + 2; n < o; n++) {
    if (i.src.charCodeAt(n) === 32 || i.src.charCodeAt(n) === 10) return !1;
    if (i.src.charCodeAt(n) === 93) break;
  }
  return n === a + 2 || n >= o || (n++, t = i.src.slice(a + 2, n - 1), _typeof(i.env.footnotes.refs[":" + t]) > "u") ? !1 : (e || (i.env.footnotes.list || (i.env.footnotes.list = []), i.env.footnotes.refs[":" + t] < 0 ? (s = i.env.footnotes.list.length, i.env.footnotes.list[s] = {
    label: t,
    count: 0
  }, i.env.footnotes.refs[":" + t] = s) : s = i.env.footnotes.refs[":" + t], r = i.env.footnotes.list[s].count, i.env.footnotes.list[s].count++, i.push({
    type: "footnote_ref",
    id: s,
    subId: r,
    level: i.level
  })), i.pos = n, i.posMax = o, !0);
}
var Ya = ["coap", "doi", "javascript", "aaa", "aaas", "about", "acap", "cap", "cid", "crid", "data", "dav", "dict", "dns", "file", "ftp", "geo", "go", "gopher", "h323", "http", "https", "iax", "icap", "im", "imap", "info", "ipp", "iris", "iris.beep", "iris.xpc", "iris.xpcs", "iris.lwz", "ldap", "mailto", "mid", "msrp", "msrps", "mtqp", "mupdate", "news", "nfs", "ni", "nih", "nntp", "opaquelocktoken", "pop", "pres", "rtsp", "service", "session", "shttp", "sieve", "sip", "sips", "sms", "snmp", "soap.beep", "soap.beeps", "tag", "tel", "telnet", "tftp", "thismessage", "tn3270", "tip", "tv", "urn", "vemmi", "ws", "wss", "xcon", "xcon-userid", "xmlrpc.beep", "xmlrpc.beeps", "xmpp", "z39.50r", "z39.50s", "adiumxtra", "afp", "afs", "aim", "apt", "attachment", "aw", "beshare", "bitcoin", "bolo", "callto", "chrome", "chrome-extension", "com-eventbrite-attendee", "content", "cvs", "dlna-playsingle", "dlna-playcontainer", "dtn", "dvb", "ed2k", "facetime", "feed", "finger", "fish", "gg", "git", "gizmoproject", "gtalk", "hcp", "icon", "ipn", "irc", "irc6", "ircs", "itms", "jar", "jms", "keyparc", "lastfm", "ldaps", "magnet", "maps", "market", "message", "mms", "ms-help", "msnim", "mumble", "mvn", "notes", "oid", "palm", "paparazzi", "platform", "proxy", "psyc", "query", "res", "resource", "rmi", "rsync", "rtmp", "secondlife", "sftp", "sgn", "skype", "smb", "soldat", "spotify", "ssh", "steam", "svn", "teamspeak", "things", "udp", "unreal", "ut2004", "ventrilo", "view-source", "webcal", "wtai", "wyciwyg", "xfire", "xri", "ymsgr"],
  Qa = /^<([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)>/,
  ec = /^<([a-zA-Z.\-]{1,25}):([^<>\x00-\x20]*)>/;
function tc(i, e) {
  var t,
    n,
    s,
    r,
    o,
    a = i.pos;
  return i.src.charCodeAt(a) !== 60 || (t = i.src.slice(a), t.indexOf(">") < 0) ? !1 : (n = t.match(ec), n ? Ya.indexOf(n[1].toLowerCase()) < 0 || (r = n[0].slice(1, -1), o = ci(r), !i.parser.validateLink(r)) ? !1 : (e || (i.push({
    type: "link_open",
    href: o,
    level: i.level
  }), i.push({
    type: "text",
    content: r,
    level: i.level + 1
  }), i.push({
    type: "link_close",
    level: i.level
  })), i.pos += n[0].length, !0) : (s = t.match(Qa), s ? (r = s[0].slice(1, -1), o = ci("mailto:" + r), i.parser.validateLink(o) ? (e || (i.push({
    type: "link_open",
    href: o,
    level: i.level
  }), i.push({
    type: "text",
    content: r,
    level: i.level + 1
  }), i.push({
    type: "link_close",
    level: i.level
  })), i.pos += s[0].length, !0) : !1) : !1));
}
function qs(i, e) {
  return i = i.source, e = e || "", function t(n, s) {
    return n ? (s = s.source || s, i = i.replace(n, s), t) : new RegExp(i, e);
  };
}
var nc = /[a-zA-Z_:][a-zA-Z0-9:._-]*/,
  sc = /[^"'=<>`\x00-\x20]+/,
  ic = /'[^']*'/,
  rc = /"[^"]*"/,
  oc = qs(/(?:unquoted|single_quoted|double_quoted)/)("unquoted", sc)("single_quoted", ic)("double_quoted", rc)(),
  ac = qs(/(?:\s+attr_name(?:\s*=\s*attr_value)?)/)("attr_name", nc)("attr_value", oc)(),
  cc = qs(/<[A-Za-z][A-Za-z0-9]*attribute*\s*\/?>/)("attribute", ac)(),
  lc = /<\/[A-Za-z][A-Za-z0-9]*\s*>/,
  dc = /<!---->|<!--(?:-?[^>-])(?:-?[^-])*-->/,
  hc = /<[?].*?[?]>/,
  uc = /<![A-Z]+\s+[^>]*>/,
  pc = /<!\[CDATA\[[\s\S]*?\]\]>/,
  fc = qs(/^(?:open_tag|close_tag|comment|processing|declaration|cdata)/)("open_tag", cc)("close_tag", lc)("comment", dc)("processing", hc)("declaration", uc)("cdata", pc)();
function mc(i) {
  var e = i | 32;
  return e >= 97 && e <= 122;
}
function gc(i, e) {
  var t,
    n,
    s,
    r = i.pos;
  return !i.options.html || (s = i.posMax, i.src.charCodeAt(r) !== 60 || r + 2 >= s) || (t = i.src.charCodeAt(r + 1), t !== 33 && t !== 63 && t !== 47 && !mc(t)) || (n = i.src.slice(r).match(fc), !n) ? !1 : (e || i.push({
    type: "htmltag",
    content: i.src.slice(r, r + n[0].length),
    level: i.level
  }), i.pos += n[0].length, !0);
}
var yc = /^&#((?:x[a-f0-9]{1,8}|[0-9]{1,8}));/i,
  bc = /^&([a-z][a-z0-9]{1,31});/i;
function vc(i, e) {
  var t,
    n,
    s,
    r = i.pos,
    o = i.posMax;
  if (i.src.charCodeAt(r) !== 38) return !1;
  if (r + 1 < o) {
    if (t = i.src.charCodeAt(r + 1), t === 35) {
      if (s = i.src.slice(r).match(yc), s) return e || (n = s[1][0].toLowerCase() === "x" ? parseInt(s[1].slice(1), 16) : parseInt(s[1], 10), i.pending += to(n) ? ai(n) : ai(65533)), i.pos += s[0].length, !0;
    } else if (s = i.src.slice(r).match(bc), s) {
      var a = Qr(s[1]);
      if (s[1] !== a) return e || (i.pending += a), i.pos += s[0].length, !0;
    }
  }
  return e || (i.pending += "&"), i.pos++, !0;
}
var ii = [["text", Da], ["newline", Fa], ["escape", Ua], ["backticks", Ha], ["del", ja], ["ins", qa], ["mark", $a], ["emphasis", Ga], ["sub", Va], ["sup", Ka], ["links", Wa], ["footnote_inline", Xa], ["footnote_ref", Za], ["autolink", tc], ["htmltag", gc], ["entity", vc]];
function $s() {
  this.ruler = new Ue();
  for (var i = 0; i < ii.length; i++) this.ruler.push(ii[i][0], ii[i][1]);
  this.validateLink = _c;
}
$s.prototype.skipToken = function (i) {
  var e = this.ruler.getRules(""),
    t = e.length,
    n = i.pos,
    s,
    r;
  if ((r = i.cacheGet(n)) > 0) {
    i.pos = r;
    return;
  }
  for (s = 0; s < t; s++) if (e[s](i, !0)) {
    i.cacheSet(n, i.pos);
    return;
  }
  i.pos++, i.cacheSet(n, i.pos);
};
$s.prototype.tokenize = function (i) {
  for (var e = this.ruler.getRules(""), t = e.length, n = i.posMax, s, r; i.pos < n;) {
    for (r = 0; r < t && (s = e[r](i, !1), !s); r++);
    if (s) {
      if (i.pos >= n) break;
      continue;
    }
    i.pending += i.src[i.pos++];
  }
  i.pending && i.pushPending();
};
$s.prototype.parse = function (i, e, t, n) {
  var s = new zt(i, this, e, t, n);
  this.tokenize(s);
};
function _c(i) {
  var e = ["vbscript", "javascript", "file", "data"],
    t = i.trim().toLowerCase();
  return t = jt(t), !(t.indexOf(":") !== -1 && e.indexOf(t.split(":")[0]) !== -1);
}
var Ec = {
    options: {
      html: !1,
      // Enable HTML tags in source
      xhtmlOut: !1,
      // Use '/' to close single tags (<br />)
      breaks: !1,
      // Convert '\n' in paragraphs into <br>
      langPrefix: "language-",
      // CSS language prefix for fenced blocks
      linkTarget: "",
      // set target to open link in
      // Enable some language-neutral replacements + quotes beautification
      typographer: !1,
      // Double + single quotes replacement pairs, when typographer enabled,
      // and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
      quotes: "“”‘’",
      // Highlighter function. Should return escaped HTML,
      // or '' if input not changed
      //
      // function (/*str, lang*/) { return ''; }
      //
      highlight: null,
      maxNesting: 20
      // Internal protection, recursion limit
    },
    components: {
      core: {
        rules: ["block", "inline", "references", "replacements", "smartquotes", "references", "abbr2", "footnote_tail"]
      },
      block: {
        rules: ["blockquote", "code", "fences", "footnote", "heading", "hr", "htmlblock", "lheading", "list", "paragraph", "table"]
      },
      inline: {
        rules: ["autolink", "backticks", "del", "emphasis", "entity", "escape", "footnote_ref", "htmltag", "links", "newline", "text"]
      }
    }
  },
  Sc = {
    options: {
      html: !1,
      // Enable HTML tags in source
      xhtmlOut: !1,
      // Use '/' to close single tags (<br />)
      breaks: !1,
      // Convert '\n' in paragraphs into <br>
      langPrefix: "language-",
      // CSS language prefix for fenced blocks
      linkTarget: "",
      // set target to open link in
      // Enable some language-neutral replacements + quotes beautification
      typographer: !1,
      // Double + single quotes replacement pairs, when typographer enabled,
      // and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
      quotes: "“”‘’",
      // Highlighter function. Should return escaped HTML,
      // or '' if input not changed
      //
      // function (/*str, lang*/) { return ''; }
      //
      highlight: null,
      maxNesting: 20
      // Internal protection, recursion limit
    },
    components: {
      // Don't restrict core/block/inline rules
      core: {},
      block: {},
      inline: {}
    }
  },
  xc = {
    options: {
      html: !0,
      // Enable HTML tags in source
      xhtmlOut: !0,
      // Use '/' to close single tags (<br />)
      breaks: !1,
      // Convert '\n' in paragraphs into <br>
      langPrefix: "language-",
      // CSS language prefix for fenced blocks
      linkTarget: "",
      // set target to open link in
      // Enable some language-neutral replacements + quotes beautification
      typographer: !1,
      // Double + single quotes replacement pairs, when typographer enabled,
      // and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
      quotes: "“”‘’",
      // Highlighter function. Should return escaped HTML,
      // or '' if input not changed
      //
      // function (/*str, lang*/) { return ''; }
      //
      highlight: null,
      maxNesting: 20
      // Internal protection, recursion limit
    },
    components: {
      core: {
        rules: ["block", "inline", "references", "abbr2"]
      },
      block: {
        rules: ["blockquote", "code", "fences", "heading", "hr", "htmlblock", "lheading", "list", "paragraph"]
      },
      inline: {
        rules: ["autolink", "backticks", "emphasis", "entity", "escape", "htmltag", "links", "newline", "text"]
      }
    }
  },
  Ac = {
    "default": Ec,
    full: Sc,
    commonmark: xc
  };
function co(i, e, t) {
  this.src = e, this.env = t, this.options = i.options, this.tokens = [], this.inlineMode = !1, this.inline = i.inline, this.block = i.block, this.renderer = i.renderer, this.typographer = i.typographer;
}
function rt(i, e) {
  typeof i != "string" && (e = i, i = "default"), e && e.linkify != null && console.warn("linkify option is removed. Use linkify plugin instead:\n\nimport Remarkable from 'remarkable';\nimport linkify from 'remarkable/linkify';\nnew Remarkable().use(linkify)\n"), this.inline = new $s(), this.block = new Mi(), this.core = new oo(), this.renderer = new Ii(), this.ruler = new Ue(), this.options = {}, this.configure(Ac[i]), this.set(e || {});
}
rt.prototype.set = function (i) {
  eo(this.options, i);
};
rt.prototype.configure = function (i) {
  var e = this;
  if (!i) throw new Error("Wrong `remarkable` preset, check name/content");
  i.options && e.set(i.options), i.components && Object.keys(i.components).forEach(function (t) {
    i.components[t].rules && e[t].ruler.enable(i.components[t].rules, !0);
  });
};
rt.prototype.use = function (i, e) {
  return i(this, e), this;
};
rt.prototype.parse = function (i, e) {
  var t = new co(this, i, e);
  return this.core.process(t), t.tokens;
};
rt.prototype.render = function (i, e) {
  return e = e || {}, this.renderer.render(this.parse(i, e), this.options, e);
};
rt.prototype.parseInline = function (i, e) {
  var t = new co(this, i, e);
  return t.inlineMode = !0, this.core.process(t), t.tokens;
};
rt.prototype.renderInline = function (i, e) {
  return e = e || {}, this.renderer.render(this.parseInline(i, e), this.options, e);
};
var Nt = /*#__PURE__*/function () {
  function Nt() {
    _classCallCheck(this, Nt);
  }
  return _createClass(Nt, null, [{
    key: "addPlugins",
    value: function addPlugins(e, t) {
      var n = window.remarkable_plugins;
      if (n && n.forEach(function (s) {
        e.use(s.plugin, s.options);
      }), t != null && t.math) {
        window.katex || (console.warn("window.katex not found, use chatElementRef.refreshMessages to re-render messages"), console.warn("See https://deepchat.dev/examples/externalModules"));
        var s = _typeof(t.math) == "object" ? t.math.delimiter : "",
          r = _typeof(t.math) == "object" && t.math.options ? t.math.options : {};
        e.use($o.katex.bind(this, r), {
          delimiter: s
        });
      }
    }
  }, {
    key: "instantiate",
    value: function instantiate(e) {
      if (e) return new rt(_objectSpread(_objectSpread({}, Nt.DEFAULT_PROPERTIES), e));
      if (window.hljs) {
        var t = window.hljs;
        return new rt({
          highlight: function highlight(n, s) {
            if (s && t.getLanguage(s)) try {
              return t.highlight(n, {
                language: s
              }).value;
            } catch (_unused3) {
              console[f]("failed to setup the highlight dependency");
            }
            try {
              return t.highlightAuto(n).value;
            } catch (_unused4) {
              console[f]("failed to automatically highlight messages");
            }
            return "";
          },
          html: !1,
          // Enable HTML tags in source
          xhtmlOut: !1,
          // Use '/' to close single tags (<br />)
          breaks: !0,
          // Convert '\n' in paragraphs into <br>
          langPrefix: "language-",
          // CSS language prefix for fenced blocks
          linkTarget: "_blank",
          // set target to open in a new tab
          typographer: !0
          // Enable smartypants and other sweet transforms
        });
      } else return new rt(Nt.DEFAULT_PROPERTIES);
    }
  }, {
    key: "createNew",
    value: function createNew(e) {
      var t = Nt.instantiate(e);
      return Nt.addPlugins(t, e), t.inline.validateLink = function () {
        return !0;
      }, t;
    }
  }]);
}();
Nt.DEFAULT_PROPERTIES = {
  breaks: !0,
  linkTarget: "_blank"
  // set target to open in a new tab
};
var es = Nt;
var wc = /*#__PURE__*/function () {
  function wc(e) {
    _classCallCheck(this, wc);
    this.storageKey = "deep-chat-storage", this.maxMessages = 1e3, _typeof(e) == "object" && (e.key && (this.storageKey = e.key), e.maxMessages && (this.maxMessages = e.maxMessages), e.clear = this.clear.bind(this));
  }
  return _createClass(wc, [{
    key: "get",
    value: function get() {
      var e = localStorage.getItem(this.storageKey);
      return e ? JSON.parse(e) : [];
    }
  }, {
    key: "addMessages",
    value: function addMessages(e) {
      var t = e.length - this.maxMessages;
      t < 0 && (t = 0);
      var n = e.slice(t, e.length);
      localStorage.setItem(this.storageKey, JSON.stringify(n));
    }
  }, {
    key: "clear",
    value: function clear() {
      localStorage.removeItem(this.storageKey);
    }
  }]);
}();
var we = /*#__PURE__*/function () {
  function we() {
    _classCallCheck(this, we);
  }
  return _createClass(we, null, [{
    key: "applyCustomStylesToElements",
    value: function applyCustomStylesToElements(e, t, n) {
      if (n && (Object.assign(e.outerContainer[_], n.outerContainer), Object.assign(e.innerContainer[_], n.innerContainer), Object.assign(e.bubbleElement[_], n.bubble), t)) {
        var s = e.bubbleElement.children[0],
          r = s.tagName.toLocaleLowerCase() !== "a" ? s : s.children[0];
        Object.assign(r[_], n.media);
      }
    }
  }, {
    key: "applySideStyles",
    value: function applySideStyles(e, t, n, s) {
      s && (we.applyCustomStylesToElements(e, n, s.shared), t === U ? we.applyCustomStylesToElements(e, n, s.user) : (we.applyCustomStylesToElements(e, n, s.ai), we.applyCustomStylesToElements(e, n, s[t])));
    }
  }, {
    key: "isElementsStyles",
    value: function isElementsStyles(e) {
      return !!(e.outerContainer || e.innerContainer || e.bubble || e.media);
    }
    // prettier-ignore
  }, {
    key: "applyCustomStyles",
    value: function applyCustomStyles(e, t, n, s, r) {
      var o;
      r && e[x] !== r ? we.isElementsStyles(r) ? (we.applyCustomStylesToElements(t, s, (o = e[x]) == null ? void 0 : o.shared), we.applyCustomStylesToElements(t, s, r)) : (we.applySideStyles(t, n, s, e[x]), we.applySideStyles(t, n, s, r)) : we.applySideStyles(t, n, s, e[x]);
    }
    // prettier-ignore
  }, {
    key: "extractParticularSharedStyles",
    value: function extractParticularSharedStyles(e, t) {
      if (!(t != null && t.shared)) return;
      var n = t.shared,
        s = {
          outerContainer: {},
          innerContainer: {},
          bubble: {},
          media: {}
        };
      return e.forEach(function (r) {
        var o, a, c, l;
        s.outerContainer[r] = ((o = n.outerContainer) == null ? void 0 : o[r]) || "", s.innerContainer[r] = ((a = n.innerContainer) == null ? void 0 : a[r]) || "", s.bubble[r] = ((c = n.bubble) == null ? void 0 : c[r]) || "", s.media[r] = ((l = n.media) == null ? void 0 : l[r]) || "";
      }), s;
    }
  }]);
}();
var ae = /*#__PURE__*/function () {
  function ae() {
    _classCallCheck(this, ae);
  }
  return _createClass(ae, null, [{
    key: "setElementProps",
    value:
    // prettier-ignore
    function setElementProps(e, t, n, s) {
      var r;
      n !== "loading" && (e.applyCustomStyles(t, s, !0, (r = e.messageStyles) == null ? void 0 : r[n]), t.bubbleElement[m].add(Kr));
    }
    // prettier-ignore
  }, {
    key: "addMessage",
    value: function addMessage(e, t, n, s, r, o) {
      ae.setElementProps(e, t, n, s), r || (e.appendOuterContainerElemet(t.outerContainer), !e.focusMode && o && X.scrollToBottom(e.elementRef, !1, t.outerContainer));
    }
  }, {
    key: "wrapInLink",
    value: function wrapInLink(e, t, n) {
      var s = S("a");
      return s.href = t, s.download = n || le, s.target = "_blank", s.appendChild(e), s;
    }
  }, {
    key: "isNonLinkableDataUrl",
    value: function isNonLinkableDataUrl(e, t) {
      return !t.startsWith("data") || e === j ? !1 : e === Ut && t.startsWith("data:text/javascript") || !t.startsWith("data:image") && !t.startsWith("data:application");
    }
  }, {
    key: "processContent",
    value: function processContent(e, t, n, s) {
      return !n || ae.isNonLinkableDataUrl(e, n) ? t : ae.wrapInLink(t, n, s);
    }
  }, {
    key: "waitToLoadThenScroll",
    value: function waitToLoadThenScroll(e, t) {
      setTimeout(function () {
        X.scrollToBottom(e, !1, t);
      }, 60);
    }
  }, {
    key: "scrollDownOnImageLoad",
    value: function scrollDownOnImageLoad(e, t, n) {
      if (e.startsWith("data")) ae.waitToLoadThenScroll(n, t);else try {
        fetch(e, {
          mode: "no-cors"
        })["catch"](function () {})["finally"](function () {
          ae.waitToLoadThenScroll(n, t);
        });
      } catch (_unused5) {
        X.scrollToBottom(t, !1, n);
      }
    }
    // The strategy is to emit the actual file reference in the `onMessage` event for the user to inspect it
    // But it is not actually used by anything in the chat, hence it is removed when adding a message
    // after the body has been stringified and parsed - the file reference will disappear, hence this readds it
  }, {
    key: "reAddFileRefToObject",
    value: function reAddFileRefToObject(e, t) {
      var n;
      (n = e[y]) == null || n.forEach(function (s, r) {
        var o;
        s.ref && (o = t[y]) != null && o[r] && (t[y][r].ref = s.ref);
      });
    }
    // the chat does not use the actual file
  }, {
    key: "removeFileRef",
    value: function removeFileRef(e) {
      var t = _objectSpread({}, e);
      return delete t.ref, t;
    }
  }, {
    key: "isAudioFile",
    value: function isAudioFile(e) {
      var t = /\.(mp3|ogg|wav|aac|webm|4a)$/i,
        n = e.type,
        s = e.src;
      return n === P || (s == null ? void 0 : s.startsWith("data:audio")) || s && t.test(s);
    }
  }, {
    key: "isImageFile",
    value: function isImageFile(e) {
      var t = e.type,
        n = e.src;
      return t === j || (n == null ? void 0 : n.startsWith("data:image")) || n && ae.isImageFileExtension(n);
    }
  }, {
    key: "isImageFileExtension",
    value: function isImageFileExtension(e) {
      return /\.(jpg|jpeg|png|gif|bmp)$/i.test(e);
    }
  }]);
}();
var qt = /*#__PURE__*/function () {
  function qt() {
    _classCallCheck(this, qt);
  }
  return _createClass(qt, null, [{
    key: "onMessage",
    value: function onMessage(e, t, n) {
      var r;
      var s = JSON.parse(JSON.stringify({
        message: t,
        isHistory: n,
        isInitial: n
      }));
      ae.reAddFileRefToObject(t, s.message), (r = e.onMessage) == null || r.call(e, s), e.dispatchEvent(new CustomEvent("message", {
        detail: s
      })), me.fireOnNewMessage(e, s);
    }
  }, {
    key: "onClearMessages",
    value: function onClearMessages(e) {
      var t;
      (t = e.onClearMessages) == null || t.call(e), e.dispatchEvent(new CustomEvent("clear-messages"));
    }
  }, {
    key: "onRender",
    value: function onRender(e) {
      var t;
      (t = e.onComponentRender) == null || t.call(e, e), e.dispatchEvent(new CustomEvent("render", {
        detail: e
      }));
    }
  }, {
    key: "onInput",
    value: function onInput(e, t, n) {
      var r, o;
      var s = JSON.parse(JSON.stringify({
        content: t,
        isUser: n
      }));
      t[y] && ae.reAddFileRefToObject(_defineProperty({}, y, (r = t[y]) == null ? void 0 : r.map(function (a) {
        return {
          ref: a
        };
      })), s.content), (o = e.onInput) == null || o.call(e, s), e.dispatchEvent(new CustomEvent("input", {
        detail: s
      }));
    }
  }, {
    key: "onError",
    value: function onError(e, t) {
      var n;
      (n = e.onError) == null || n.call(e, t), e.dispatchEvent(new CustomEvent(f, {
        detail: t
      }));
    }
  }]);
}();
var he = /*#__PURE__*/function () {
  function he() {
    _classCallCheck(this, he);
  }
  return _createClass(he, null, [{
    key: "generateLoadingRingElement",
    value: function generateLoadingRingElement() {
      var e = S();
      return e[m].add("loading-history"), e.appendChild(S()), e.appendChild(S()), e.appendChild(S()), e.appendChild(S()), e;
    }
  }, {
    key: "apply",
    value: function apply(e, t, n) {
      mt.setRing(t.bubbleElement, n == null ? void 0 : n.bubble), n != null && n.bubble && (n = JSON.parse(JSON.stringify(n)), delete n.bubble), e.applyCustomStyles(t, "history", !1, n);
    }
  }, {
    key: "addLoadHistoryMessage",
    value: function addLoadHistoryMessage(e, t) {
      var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !0;
      var o, a, c, l, d, p, u, g;
      e.bubbleElement[m].add(he.CLASS);
      var s = n ? he.FULL_VIEW_CLASS : he.SMALL_CLASS;
      e.outerContainer[m].add(s);
      var r = n ? (l = (c = (a = (o = t.messageStyles) == null ? void 0 : o.loading) == null ? void 0 : a.history) == null ? void 0 : c.full) == null ? void 0 : l.styles : (g = (u = (p = (d = t.messageStyles) == null ? void 0 : d.loading) == null ? void 0 : p.history) == null ? void 0 : u.small) == null ? void 0 : g.styles;
      he.apply(t, e, r), t.elementRef.prepend(e.outerContainer);
    }
  }, {
    key: "createDefaultElements",
    value: function createDefaultElements(e) {
      var t = e.createMessageElements("", W),
        n = t.bubbleElement,
        s = he.generateLoadingRingElement();
      return n.appendChild(s), t;
    }
  }, {
    key: "addMessage",
    value: function addMessage(e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !0;
      var r, o, a, c;
      var n = (c = (a = (o = (r = e.messageStyles) == null ? void 0 : r.loading) == null ? void 0 : o.history) == null ? void 0 : a.full) == null ? void 0 : c[R],
        s = n ? it.createElements(e, n, W, !0, !0) : he.createDefaultElements(e);
      return he.addLoadHistoryMessage(s, e, t), I.softRemRoleElements(s.innerContainer, e.avatar, e.name), s;
    }
  }, {
    key: "tryChangeViewToSmall",
    value: function tryChangeViewToSmall(e, t) {
      var n, s, r, o, a, c, l, d;
      if (t != null && t.outerContainer[m].contains(he.FULL_VIEW_CLASS)) {
        t.outerContainer[m].replace(he.FULL_VIEW_CLASS, he.SMALL_CLASS);
        var p = (o = (r = (s = (n = e.messageStyles) == null ? void 0 : n.loading) == null ? void 0 : s.history) == null ? void 0 : r.small) == null ? void 0 : o.styles;
        p && he.apply(e, t, p);
        var u = (d = (l = (c = (a = e.messageStyles) == null ? void 0 : a.loading) == null ? void 0 : c.history) == null ? void 0 : l.small) == null ? void 0 : d[R];
        return u && (t.bubbleElement.innerHTML = u), !0;
      }
      return !1;
    }
  }, {
    key: "changeFullViewToSmall",
    value: function changeFullViewToSmall(e) {
      var t = e.messageElementRefs[e.messageElementRefs.length - 1];
      he.tryChangeViewToSmall(e, t) || he.tryChangeViewToSmall(e, e.messageElementRefs[0]);
    }
  }]);
}();
he.CLASS = "loading-history-message", he.FULL_VIEW_CLASS = "loading-history-message-full-view", he.SMALL_CLASS = "loading-history-message-small";
var yt = he;
var zn = /*#__PURE__*/function () {
  function zn() {
    _classCallCheck(this, zn);
  }
  return _createClass(zn, null, [{
    key: "setFade",
    value: function setFade(e, t) {
      e[_].transitionDuration = typeof t == "number" ? "".concat(t, "ms") : "".concat(zn.DEFAULT_FADE_MS, "ms");
    }
  }, {
    key: "fadeAnimation",
    value: function () {
      var _fadeAnimation = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(e, t) {
        var n;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              e[_].opacity = "0";
              n = typeof t == "number" ? t : zn.DEFAULT_FADE_MS;
              _context.n = 1;
              return new Promise(function (s) {
                setTimeout(function () {
                  return s();
                }, n);
              });
            case 1:
              e[_].opacity = "1";
            case 2:
              return _context.a(2);
          }
        }, _callee);
      }));
      function fadeAnimation(_x, _x2) {
        return _fadeAnimation.apply(this, arguments);
      }
      return fadeAnimation;
    }()
  }]);
}();
zn.DEFAULT_FADE_MS = 500;
var Es = zn;
var vr = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='iso-8859-1'?%3e%3csvg%20fill='%23000000'%20version='1.1'%20id='Layer_1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20viewBox='0%200%2032%2032'%20xml:space='preserve'%3e%3cpath%20d='M23,30.36H9c-2.404,0-4.36-1.956-4.36-4.36V15c0-2.404,1.956-4.36,4.36-4.36h3.659%20c0.167-1.566,1.415-2.813,2.981-2.981V5.333c-1.131-0.174-2-1.154-2-2.333c0-1.301,1.059-2.36,2.36-2.36%20c1.302,0,2.36,1.059,2.36,2.36c0,1.179-0.869,2.159-2,2.333V7.66c1.566,0.167,2.814,1.415,2.981,2.981H23%20c2.404,0,4.36,1.956,4.36,4.36v11C27.36,28.404,25.404,30.36,23,30.36z%20M9,11.36c-2.007,0-3.64,1.633-3.64,3.64v11%20c0,2.007,1.633,3.64,3.64,3.64h14c2.007,0,3.64-1.633,3.64-3.64V15c0-2.007-1.633-3.64-3.64-3.64H9z%20M13.384,10.64h5.231%20C18.439,9.354,17.334,8.36,16,8.36C14.667,8.36,13.561,9.354,13.384,10.64z%20M16,1.36c-0.904,0-1.64,0.736-1.64,1.64%20S15.096,4.64,16,4.64c0.904,0,1.64-0.736,1.64-1.64S16.904,1.36,16,1.36z%20M20,27.36h-8c-1.301,0-2.36-1.059-2.36-2.36%20s1.059-2.36,2.36-2.36h8c1.302,0,2.36,1.059,2.36,2.36S21.302,27.36,20,27.36z%20M12,23.36c-0.904,0-1.64,0.735-1.64,1.64%20s0.736,1.64,1.64,1.64h8c0.904,0,1.64-0.735,1.64-1.64s-0.735-1.64-1.64-1.64H12z%20M31,23.86h-2c-0.199,0-0.36-0.161-0.36-0.36V15%20c0-0.199,0.161-0.36,0.36-0.36h2c0.199,0,0.36,0.161,0.36,0.36v8.5C31.36,23.699,31.199,23.86,31,23.86z%20M29.36,23.14h1.279v-7.78%20H29.36V23.14z%20M3,23.86H1c-0.199,0-0.36-0.161-0.36-0.36V15c0-0.199,0.161-0.36,0.36-0.36h2c0.199,0,0.36,0.161,0.36,0.36v8.5%20C3.36,23.699,3.199,23.86,3,23.86z%20M1.36,23.14h1.28v-7.78H1.36V23.14z%20M20,20.36c-1.302,0-2.36-1.059-2.36-2.36%20s1.059-2.36,2.36-2.36s2.36,1.059,2.36,2.36C22.36,19.302,21.302,20.36,20,20.36z%20M20,16.36c-0.904,0-1.64,0.736-1.64,1.64%20s0.735,1.64,1.64,1.64s1.64-0.735,1.64-1.64S20.904,16.36,20,16.36z%20M12,20.36c-1.301,0-2.36-1.059-2.36-2.36s1.059-2.36,2.36-2.36%20s2.36,1.059,2.36,2.36C14.36,19.302,13.301,20.36,12,20.36z%20M12,16.36c-0.904,0-1.64,0.736-1.64,1.64s0.736,1.64,1.64,1.64%20s1.64-0.735,1.64-1.64S12.904,16.36,12,16.36z'/%3e%3crect%20style='fill:none;'%20width='32'%20height='32'/%3e%3c/svg%3e",
  li = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAAD6CAMAAAC/MqoPAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAADNQTFRF////9vX18vLy/Pz86enp4+Li2tnZ1tbWzczM+fn57Ozs4N/f09LS0M/P5uXl7+/v3dzcwtncCAAAAAFiS0dEAIgFHUgAAAAJcEhZcwAAAEgAAABIAEbJaz4AAAZNSURBVHja7d3bdtsqEABQYABZSLH9/3+ZpnUsIcF5iOM6PfElNoMHMfPQdq3GmL0GkLhEUqLaUExnOtOZznSmM53pTGc605nOdKYznelMZzrTmV4LXSqllKyJDkob26xWq8Zae/iH0QoWTm9d1xur4WuypQJtTd+5dqn0VjcxzNO5/57mEBvdLo8Oron6aseWOjYOFkVvjQs3DmgyONMuht52EfztP+4hdu0i6LCO808/M8c1lE/fuPGej41uUzgdtoO/75N+2ELJ9I3b3//hPXbiMenm3pR/Jt4USgcLBIp4Bh10gqKVhvLo0klCxeSky96nKcj3siw6pJIL4XsoiQ7apyvMY/V3HHrSRioLopvEhSpTCn2TPEuwKYMOIX0tAxRBf/Hpa+lfSqBv9gi1FPsNfTrMAiVmIE/vJhz61FGnQxRIEYE4vfNYdN8Rp6MlHaHotHTn8ejekaZPAjEmyvQWdZFTtYTpXqCGJ0zvcek9Yfoel76nS0ffv1NMp1ca+pkgyfRCGind4L7OWWc605l+cxjsyhqy9AGbPpClc1/nvl5VX0c/3Alk6RU3+Am7shNZ+h6bvidLr7jBB+zKBrL0irOOudmIUDzTmf5gIP+iEuXtRuTVaEmY/oZLfyNMrzjryPc0gerMTdpVg0tvjJUU6bLPcGOoUv46SLL6Wi8yhLf06C7TUyekI0efRaaYqdFltkeNpPumRPSMDxgBYvSM035FrKAmH72hRW99PrpvSdEHkTEGUvSsK3yKVDkuJ92RohcZaehzzirPpOg+J92Tolfc4Cumx5xVXpGiZ34+ICX6W84qv5GiR5NPbiIpOv6BCoSvSkTX+eiaGP092zINvBOj4x8mSf9FqejvNo/cvpOji19ZbmviL0GPLsYMFzgzCor0+Bv/ePDvSJKOb9dJ5UlnbnEHiHgzv6cdTpJOWuc/u3FEucLDOL75xGtBiefrcwgoC9NDSH/jkH6pAuXmBqPQ9HSUPVdZBH1GGOrMXAQdYxcKZfxAoK+KKBKFLosoEoX+u4giUehz8jlcnAuhp78I46yDYNAd+QLR6K+pr+yvxdBTHyVDubQh0UfSxaHSd0lbvNkVRE87JGOtc+PQd2QLQ6fHhJkKsSh6yg13tO08JPprsgrrXWH0dJd2vH1MLPprot4eXoujpzrdhngiD40ek2y92lggPcnWa8qN1Yz0BFuvZhRl0uOfR0v4Ewuli/Bg4Qr3lArqGdndQ3UPO1EunXYwnelMZzrTmc50pjOd6UxnOtOZznSmM53pTGf6kuj6oedFKV0s3fX6sX1S3bsi6a4PD7+/YAqYeBw6pIB/4qEgOqxdSPbGiim4NRRCbzs3Jj0L4UfXtQXQVRfn5IdA/Bw7RZzurEV6EtdsLeGXkIPuA+K1UoVeA0l62zmN/LqfSSft9KkepmoRuvi3nd5uKNFB9zbbXEANqdr941XO0NJx2v2jdJenpf+/3bvn0ts16ph+sd6hX7dPo2+2cZzE02Ia43bzDHqr+2Evnhz74ZHU30ffbKOeng1/NPV30Ns1gYQnSP2P6e65Pfxc6h02XZqXQCjhJ6kPL6bFo4NrGvAU4UII4SE2P1vQuZkuOxckVfehisF1MjUddN/MZBN+kvq5uf0O/xa66gyNS9ktMWlz44rO1Z8C19i5FPdHzPamXn+F3hryPfxMr78+4F+kq22kO6Rf6fUQt+puuustyWv4rbG3l/duztFB96GYoe1cTBdXMr+nw9qVM6ZfxOvzezff0nXi/ZOndvrR6Zvpm0c3h6nhdb+5iS7tsIim/qXZD9+97/Jf+rpZ5BET1ayv0GUzLhEuhBBjIy/RdVPgndutIRt9nt7p5cKFEEJ3Z+jQFDZL+XnMDXxHB73gxn5s9Kc3d3/pFciFkN/QTSXHJpX5l66gDrkQoP6hL3xsPw39la4qOiV8tH78XeSbue6N9mvWa6J/ybpc1CT1Wnh5Qq9meP8IOKH3ddH7E/ri1iYux/SXDrXR4UiPdck/wUpU+FtPf6/orja6O9KL3l56LOvVxe5Ib2qjN0d6Vbex4ghWlU3bPqI90If66MNng680FNpbJijH6kCvaF3uMzQ3+IrpFerV4Y9dffQdN3im10ivbuImhD3Qq5u4HdZkua8znelMZ/pS4z9CPVKkxowNxgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNy0wMy0yN1QxNTo0NToxNSswMDowMN1xSg4AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTctMDMtMjdUMTU6NDU6MTUrMDA6MDCsLPKyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAABJRU5ErkJggg==";
var lo = /*#__PURE__*/function () {
  function lo(e) {
    _classCallCheck(this, lo);
    this.className = e;
  }
  return _createClass(lo, [{
    key: "getAvatarContainer",
    value: function getAvatarContainer(e) {
      return e.getElementsByClassName(this.className)[0];
    }
  }, {
    key: "tryHide",
    value: function tryHide(e) {
      var t;
      (t = this.getAvatarContainer(e)[_]).visibility || (t.visibility = "hidden");
    }
  }, {
    key: "tryReveal",
    value: function tryReveal(e) {
      this.getAvatarContainer(e)[_].visibility = "";
    }
  }, {
    key: "trySoftRem",
    value: function trySoftRem(e) {
      this.getAvatarContainer(e)[m].add("role-hidden");
    }
  }]);
}();
var at = /*#__PURE__*/function (_lo) {
  function at(e) {
    var _this3;
    _classCallCheck(this, at);
    _this3 = _callSuper(this, at, ["avatar-container"]), _this3._avatars = e;
    return _this3;
  }
  _inherits(at, _lo);
  return _createClass(at, [{
    key: "addBesideBubble",
    value: function addBesideBubble(e, t) {
      var n = typeof this._avatars == "boolean" ? void 0 : this._avatars,
        s = this.createAvatar(t, n),
        r = this.getPosition(t, n);
      s[m].add(r === "left" ? "left-item-position" : "right-item-position"), e.insertAdjacentElement(r === "left" ? "beforebegin" : "afterend", s);
    }
  }, {
    key: "createAvatar",
    value: function createAvatar(e, t) {
      var r, o, a, c, l;
      var n = S("img");
      e === U ? (n.src = ((r = t == null ? void 0 : t[U]) == null ? void 0 : r.src) || ((o = t == null ? void 0 : t[x]) == null ? void 0 : o.src) || li, n.onerror = at.errorFallback.bind(this, li)) : (n.src = ((a = t == null ? void 0 : t[e]) == null ? void 0 : a.src) || ((c = t == null ? void 0 : t[W]) == null ? void 0 : c.src) || ((l = t == null ? void 0 : t[x]) == null ? void 0 : l.src) || vr, n.onerror = at.errorFallback.bind(this, vr)), n[m].add("avatar"), n.alt = "".concat(e, " avatar");
      var s = S();
      return s[m].add(this.className), s.appendChild(n), t && at.applyCustomStyles(s, n, t, e), s;
    }
  }, {
    key: "getPosition",
    value: function getPosition(e, t) {
      var s, r, o, a, c, l;
      var n = (r = (s = t == null ? void 0 : t[e]) == null ? void 0 : s.styles) == null ? void 0 : r.position;
      return e !== U && (n !== null && n !== void 0 ? n : n = (a = (o = t == null ? void 0 : t.ai) == null ? void 0 : o.styles) == null ? void 0 : a.position), n !== null && n !== void 0 ? n : n = (l = (c = t == null ? void 0 : t[x]) == null ? void 0 : c.styles) == null ? void 0 : l.position, n !== null && n !== void 0 ? n : n = e === U ? "right" : "left", n;
    }
  }], [{
    key: "errorFallback",
    value: function errorFallback(e, t) {
      var n = t.target;
      n.onerror = null, n.src = e;
    }
  }, {
    key: "applyCustomStylesToElements",
    value: function applyCustomStylesToElements(e, t, n) {
      Object.assign(e[_], n.container), Object.assign(t[_], n.avatar);
    }
  }, {
    key: "applyCustomStyles",
    value: function applyCustomStyles(e, t, n, s) {
      var r, o, a, c;
      if ((r = n[x]) != null && r.styles && at.applyCustomStylesToElements(e, t, n[x].styles), s === U) (o = n.user) != null && o.styles && at.applyCustomStylesToElements(e, t, n.user.styles);else {
        (a = n.ai) != null && a.styles && at.applyCustomStylesToElements(e, t, n.ai.styles);
        var l = (c = n[s]) == null ? void 0 : c.styles;
        l && at.applyCustomStylesToElements(e, t, l);
      }
    }
  }]);
}(lo);
var Un = /*#__PURE__*/function (_lo2) {
  function Un(e) {
    var _this4;
    _classCallCheck(this, Un);
    _this4 = _callSuper(this, Un, ["name"]), _this4._names = e;
    return _this4;
  }
  _inherits(Un, _lo2);
  return _createClass(Un, [{
    key: "addBesideBubble",
    value: function addBesideBubble(e, t) {
      var n = typeof this._names == "boolean" ? {} : this._names,
        s = this.createName(t, n),
        r = Un.getPosition(t, n);
      s[m].add(r === "left" ? "left-item-position" : "right-item-position"), e.insertAdjacentElement(r === "left" ? "beforebegin" : "afterend", s);
    }
  }, {
    key: "createName",
    value: function createName(e, t) {
      var n = S();
      return n[m].add(this.className), n.textContent = Un.getNameText(e, t), Un.applyStyle(n, e, t), n;
    }
  }], [{
    key: "getPosition",
    value: function getPosition(e, t) {
      var s, r, o;
      var n = (s = t == null ? void 0 : t[e]) == null ? void 0 : s.position;
      return e !== U && (n !== null && n !== void 0 ? n : n = (r = t == null ? void 0 : t[W]) == null ? void 0 : r.position), n !== null && n !== void 0 ? n : n = (o = t == null ? void 0 : t[x]) == null ? void 0 : o.position, n !== null && n !== void 0 ? n : n = e === U ? "right" : "left", n;
    }
  }, {
    key: "applyStyle",
    value: function applyStyle(e, t, n) {
      var s, r, o, a;
      Object.assign(e[_], (s = n[x]) == null ? void 0 : s[_]), t === U ? Object.assign(e[_], (r = n[U]) == null ? void 0 : r[_]) : (Object.assign(e[_], (o = n[W]) == null ? void 0 : o[_]), Object.assign(e[_], (a = n[t]) == null ? void 0 : a[_]));
    }
  }, {
    key: "getNameText",
    value: function getNameText(e, t) {
      var n, s, r, o, a, c;
      return e === U ? ((n = t[U]) == null ? void 0 : n[h]) || ((s = t[x]) == null ? void 0 : s[h]) || "User" : e === W ? ((r = t[W]) == null ? void 0 : r[h]) || ((o = t[x]) == null ? void 0 : o[h]) || "AI" : ((a = t[e]) == null ? void 0 : a[h]) || ((c = t[x]) == null ? void 0 : c[h]) || e;
    }
  }]);
}(lo);
var Me = /*#__PURE__*/function () {
  function Me(e) {
    var _this5 = this;
    _classCallCheck(this, Me);
    var t, n, s;
    this.messageElementRefs = [], this.htmlClassUtilities = {}, this.messageToElements = [], this.elementRef = Me.createContainerElement(), this.messageStyles = me.processMessageStyles(e.messageStyles), this._remarkable = es.createNew(e.remarkable), this._applyHTMLToRemarkable = (t = e.remarkable) == null ? void 0 : t.applyHTML, e.avatars && (this.avatar = new at(e.avatars)), e.names && (this.name = new Un(e.names)), e.browserStorage && (this.browserStorage = new wc(e.browserStorage)), this._onMessage = qt.onMessage.bind(this, e), e.htmlClassUtilities && (this.htmlClassUtilities = e.htmlClassUtilities), this.focusMode = me.processFocusMode(e.focusMode), this.focusMode || (this._lastGroupMessagesElement = S()), typeof this.focusMode != "boolean" && (n = this.focusMode) != null && n.fade && Es.setFade(this.elementRef, this.focusMode.fade), this._customWrappers = e.htmlWrappers || me.processStreamHTMLWrappers((s = e.connect) == null ? void 0 : s.stream), setTimeout(function () {
      _this5.submitUserMessage = e.submitUserMessage;
    });
  }
  return _createClass(Me, [{
    key: "addNewTextMessage",
    value: function addNewTextMessage(e, t, n) {
      var s = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !1;
      if (n != null && n.status) {
        var o = this.overwriteText(t, e, this.messageElementRefs);
        if (o) return o;
        n.status = !1;
      }
      var r = s ? this.createAndPrependNewMessageElement(e, t, s) : this.createAndAppendNewMessageElement(e, t);
      return r.bubbleElement[m].add(Me.TEXT_BUBBLE_CLASS), this.applyCustomStyles(r, t, !1), I.fillEmptyMessageElement(r.bubbleElement, e), r;
    }
    // prettier-ignore
  }, {
    key: "overwriteText",
    value: function overwriteText(e, t, n) {
      var s = I.overwriteMessage(this.messageToElements, n, t, e, "text", Me.TEXT_BUBBLE_CLASS);
      return s && this.renderText(s.bubbleElement, t, e), s;
    }
  }, {
    key: "createAndAppendNewMessageElement",
    value: function createAndAppendNewMessageElement(e, t) {
      return this.focusMode ? this.appendNewMessageElementFocusMode(e, t) : this.createAndAppendNewMessageElementDefault(e, t);
    }
  }, {
    key: "appendNewMessageElementFocusMode",
    value: function appendNewMessageElementFocusMode(e, t) {
      var _this6 = this;
      var s;
      var n = this.createNewMessageElement(e, t);
      if (this.appendOuterContainerElemet(n.outerContainer, t), t === U) {
        var r = typeof this.focusMode != "boolean" && ((s = this.focusMode) == null ? void 0 : s.smoothScroll);
        r ? setTimeout(function () {
          X.scrollToBottom(_this6.elementRef, r);
        }) : X.scrollToBottom(this.elementRef);
      }
      return n;
    }
  }, {
    key: "createNewGroupElementFocusMode",
    value: function createNewGroupElementFocusMode() {
      var t;
      (t = this._lastGroupMessagesElement) == null || t[m].remove(Me.LAST_GROUP_MESSAGES_ACTIVE);
      var e = S();
      this._lastGroupMessagesElement && e[m].add(Me.LAST_GROUP_MESSAGES_ACTIVE), this._lastGroupMessagesElement = e;
    }
  }, {
    key: "createAndAppendNewMessageElementDefault",
    value: function createAndAppendNewMessageElementDefault(e, t) {
      var _this7 = this;
      var n = this.createNewMessageElement(e, t),
        s = X.isScrollbarAtBottomOfElement(this.elementRef);
      return this.appendOuterContainerElemet(n.outerContainer), setTimeout(function () {
        t === U ? X.scrollToBottom(_this7.elementRef) : s && X.scrollToBottom(_this7.elementRef, !1, n.outerContainer);
      }), n;
    }
  }, {
    key: "appendOuterContainerElemet",
    value: function appendOuterContainerElemet(e, t) {
      var n;
      this.focusMode && (t === U || !this._lastGroupMessagesElement) && this.createNewGroupElementFocusMode(), (n = this._lastGroupMessagesElement) == null || n.appendChild(e), this.elementRef.appendChild(this._lastGroupMessagesElement);
    }
  }, {
    key: "createAndPrependNewMessageElement",
    value: function createAndPrependNewMessageElement(e, t, n) {
      var s = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !1;
      var o;
      var r = this.createNewMessageElement(e, t, n, s);
      if (n && (o = this.elementRef.firstChild) != null && o[m].contains(Me.INTRO_CLASS)) {
        this.elementRef.firstChild.insertAdjacentElement("afterend", r.outerContainer);
        var a = this.messageElementRefs[0];
        this.messageElementRefs[0] = this.messageElementRefs[1], this.messageElementRefs[1] = a;
      } else this.elementRef.insertBefore(r.outerContainer, this.elementRef.firstChild);
      return r;
    }
  }, {
    key: "createMessageElementsOnOrientation",
    value: function createMessageElementsOnOrientation(e, t, n) {
      var s = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !1;
      return n ? this.createAndPrependNewMessageElement(e, t, n, s) : this.createNewMessageElement(e, t, n, s);
    }
  }, {
    key: "createNewMessageElement",
    value: function createNewMessageElement(e, t) {
      var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !1;
      var s = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !1;
      var o;
      s || (o = this._introPanel) == null || o.hide();
      var r = this.messageElementRefs[this.messageElementRefs.length - 1];
      return yt.changeFullViewToSmall(this), !n && Me.isTemporaryElement(r) && (this.revealRoleElementsIfTempRemoved(r, t), this.removeLastMessage()), this.createMessageElements(e, t, n);
    }
    // this can be tested by having an ai message, then a temp ai message with html that submits new user message:
    // https://github.com/OvidijusParsiunas/deep-chat/issues/258
    // prettier-ignore
  }, {
    key: "revealRoleElementsIfTempRemoved",
    value: function revealRoleElementsIfTempRemoved(e, t) {
      if ((this.avatar || this.name) && st.isElementTemporary(e)) {
        var n = this.messageElementRefs[this.messageElementRefs.length - 2];
        n && this.messageToElements.length > 0 && !e.bubbleElement[m].contains(I.getRoleClass(t)) && I.revealRoleElements(n.innerContainer, this.avatar, this.name);
      }
    }
  }, {
    key: "createElements",
    value: function createElements(e, t) {
      var n = Me.createBaseElements(t),
        s = n.outerContainer,
        r = n.innerContainer,
        o = n.bubbleElement;
      return s.appendChild(r), this.addInnerContainerElements(o, e, t), n;
    }
  }, {
    key: "createMessageElements",
    value: function createMessageElements(e, t) {
      var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !1;
      var s = this.createElements(e, t);
      return I.updateRefArr(this.messageElementRefs, s, n), I.classifyRoleMessages(this.messageElementRefs, t), s;
    }
  }, {
    key: "addInnerContainerElements",
    value:
    // prettier-ignore
    function addInnerContainerElements(e, t, n) {
      var s = this.messageElementRefs[this.messageElementRefs.length - 1];
      return I.areOuterContainerClassRolesSame(n, s) && !this.isLastMessageError() && I.hideRoleElements(s.innerContainer, this.avatar, this.name), e[m].add("message-bubble", I.getRoleClass(n), n === U ? "user-message-text" : "ai-message-text"), this.renderText(e, t, n), I.addRoleElements(e, n, this.avatar, this.name), {
        bubbleElement: e
      };
    }
    // prettier-ignore
  }, {
    key: "applyCustomStyles",
    value: function applyCustomStyles(e, t, n, s) {
      e && this.messageStyles && we.applyCustomStyles(this.messageStyles, e, t, n, s);
    }
  }, {
    key: "removeMessage",
    value: function removeMessage(e) {
      e.outerContainer.remove();
      var t = this.messageElementRefs.findIndex(function (n) {
        return n === e;
      });
      this.messageElementRefs.splice(t, 1);
    }
  }, {
    key: "removeLastMessage",
    value: function removeLastMessage() {
      this.messageElementRefs[this.messageElementRefs.length - 1].outerContainer.remove(), this.messageElementRefs.pop();
    }
  }, {
    key: "isLastMessageError",
    value: function isLastMessageError() {
      var e;
      return (e = I.getLastMessageBubbleElement(this.elementRef)) == null ? void 0 : e[m].contains(vs);
    }
  }, {
    key: "sendClientUpdate",
    value: function sendClientUpdate(e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
      var n;
      (n = this._onMessage) == null || n.call(this, e, t);
    }
    // role is optional to not add wrapper to error
  }, {
    key: "renderText",
    value: function renderText(e, t, n) {
      var _Se$tryAddWrapper2 = Se.tryAddWrapper(e, t, this._customWrappers, n),
        s = _Se$tryAddWrapper2.contentEl,
        r = _Se$tryAddWrapper2.wrapper;
      r && Se.apply(this, e), s.innerHTML = this._remarkable.render(t), this._applyHTMLToRemarkable && Se.apply(this, s), s.innerText.trim().length === 0 && s.children.length > 0 && s.children[0].tagName !== "P" && (s.innerText = t);
    }
    // this is mostly used for enabling highlight.js to highlight code if it downloads later
  }, {
    key: "refreshTextMessages",
    value: function refreshTextMessages(e) {
      var _this8 = this;
      this._remarkable = es.createNew(e), this.messageToElements.forEach(function (t) {
        t[1][h] && t[0][h] && _this8.renderText(t[1][h].bubbleElement, t[0][h], t[0].role);
      });
    }
  }], [{
    key: "createContainerElement",
    value: function createContainerElement() {
      var e = S();
      return e.id = "messages", e;
    }
  }, {
    key: "isTemporaryElement",
    value: function isTemporaryElement(e) {
      return Me.isLoadingMessage(e) || st.isElementTemporary(e);
    }
  }, {
    key: "createBaseElements",
    value: function createBaseElements(e) {
      var t = S(),
        n = S();
      n[m].add("inner-message-container"), t.appendChild(n), t[m].add("outer-message-container"), t[m].add(I.buildRoleOuterContainerClass(e));
      var s = S();
      return s[m].add("message-bubble"), n.appendChild(s), {
        outerContainer: t,
        innerContainer: n,
        bubbleElement: s
      };
    }
  }, {
    key: "createMessageContent",
    value: function createMessageContent(e) {
      var t = e.text,
        n = e.files,
        s = e.html,
        r = e.custom,
        o = e._sessionId,
        a = e.role,
        c = {
          role: a || W
        };
      return t && (c[h] = t), n && (c[y] = n), s && (c[R] = s), !t && !n && !s && (c[h] = ""), r && (c.custom = r), o && (c._sessionId = o), c;
    }
  }, {
    key: "isLoadingMessage",
    value: function isLoadingMessage(e) {
      return e == null ? void 0 : e.bubbleElement[m].contains(mt.BUBBLE_CLASS);
    }
  }]);
}();
Me.TEXT_BUBBLE_CLASS = "text-message", Me.INTRO_CLASS = "deep-chat-intro", Me.LAST_GROUP_MESSAGES_ACTIVE = "deep-chat-last-group-messages-active";
var $e = Me;
var I = /*#__PURE__*/function () {
  function I() {
    _classCallCheck(this, I);
  }
  return _createClass(I, null, [{
    key: "getLastElementsByClass",
    value: function getLastElementsByClass(e, t, n) {
      var _loop = function _loop() {
          var r = e[s];
          if (r.bubbleElement[m].contains(t[0]) && !t.slice(1).find(function (a) {
            return !r.bubbleElement[m].contains(a);
          })) if (n) {
            if (!n.find(function (c) {
              return r.bubbleElement[m].contains(c);
            })) return {
              v: r
            };
          } else return {
            v: r
          };
        },
        _ret;
      for (var s = e.length - 1; s >= 0; s -= 1) {
        _ret = _loop();
        if (_ret) return _ret.v;
      }
    }
  }, {
    key: "getLastMessage",
    value: function getLastMessage(e, t, n) {
      for (var s = e.length - 1; s >= 0; s -= 1) if (e[s][0].role === t) if (n) {
        if (e[s][0][n]) return e[s][0];
      } else return e[s][0];
    }
  }, {
    key: "getLastTextToElement",
    value: function getLastTextToElement(e, t) {
      for (var n = e.length - 1; n >= 0; n -= 1) if (e[n][0] === t) return e[n];
    }
    // IMPORTANT: If the overwrite message does not contain a role property it will look for the last 'ai' role message
    // and if messages have custom roles, it will still look to update the last 'ai' role message
    // prettier-ignore
  }, {
    key: "overwriteMessage",
    value: function overwriteMessage(e, t, n, s, r, o) {
      var a = I.getLastElementsByClass(t, [I.getRoleClass(s), o], [mt.BUBBLE_CLASS]),
        c = I.getLastMessage(e, s, r);
      return c && (c[r] = n), a;
    }
  }, {
    key: "getRoleClass",
    value: function getRoleClass(e) {
      return "".concat(e, "-message");
    }
    // makes sure the bubble has dimensions when there is no text
  }, {
    key: "fillEmptyMessageElement",
    value: function fillEmptyMessageElement(e, t) {
      t.trim().length === 0 && (e[m].add(ir), e.innerHTML = '<div style="color:#00000000">.</div>');
    }
  }, {
    key: "unfillEmptyMessageElement",
    value: function unfillEmptyMessageElement(e, t) {
      e[m].contains(ir) && t.trim().length > 0 && e.replaceChildren();
    }
  }, {
    key: "getLastMessageBubbleElement",
    value: function getLastMessageBubbleElement(e) {
      var t, n, s;
      return Array.from(((s = (n = (t = I.getLastMessageElement(e)) == null ? void 0 : t.children) == null ? void 0 : n[0]) == null ? void 0 : s.children) || []).find(function (r) {
        return r[m].contains("message-bubble");
      });
    }
  }, {
    key: "getLastMessageElement",
    value: function getLastMessageElement(e) {
      var n;
      var t = (n = e.children[e.children.length - 1]) == null ? void 0 : n.children;
      return t == null ? void 0 : t[t.length - 1];
    }
  }, {
    key: "addRoleElements",
    value: function addRoleElements(e, t, n, s) {
      n == null || n.addBesideBubble(e, t), s == null || s.addBesideBubble(e, t);
    }
  }, {
    key: "hideRoleElements",
    value: function hideRoleElements(e, t, n) {
      t == null || t.tryHide(e), n == null || n.tryHide(e);
    }
  }, {
    key: "revealRoleElements",
    value: function revealRoleElements(e, t, n) {
      t == null || t.tryReveal(e), n == null || n.tryReveal(e);
    }
  }, {
    key: "softRemRoleElements",
    value: function softRemRoleElements(e, t, n) {
      t == null || t.trySoftRem(e), n == null || n.trySoftRem(e);
    }
  }, {
    key: "updateRefArr",
    value: function updateRefArr(e, t, n) {
      n ? e.unshift(t) : e.push(t);
    }
  }, {
    key: "buildRoleOuterContainerClass",
    value: function buildRoleOuterContainerClass(e) {
      return "".concat(ds).concat(e);
    }
  }, {
    key: "addNewPositionClasses",
    value: function addNewPositionClasses(e, t) {
      var _e$outerContainer$m;
      e.outerContainer[m].remove(Qs, rr, ei), (_e$outerContainer$m = e.outerContainer[m]).add.apply(_e$outerContainer$m, _toConsumableArray(t));
    }
  }, {
    key: "getNumberOfElements",
    value: function getNumberOfElements(e) {
      var t = 0;
      return e[h] !== void 0 && (t += 1), e[R] !== void 0 && (t += 1), e[y] && (t += e[y].length), t;
    }
  }, {
    key: "filterdMessageElements",
    value: function filterdMessageElements(e, t) {
      return e.filter(function (n) {
        return n.bubbleElement[m].contains(t);
      });
    }
  }, {
    key: "findMessageElements",
    value: function findMessageElements(e, t) {
      return e.find(function (n) {
        return n.bubbleElement[m].contains(t);
      });
    }
  }, {
    key: "generateMessageBodyElements",
    value: function generateMessageBodyElements(e, t) {
      var n = {};
      return e[h] && (n[h] = I.findMessageElements(t, $e.TEXT_BUBBLE_CLASS)), e[R] && (n[R] = I.findMessageElements(t, it.HTML_BUBBLE_CLASS)), e[y] && (n[y] = I.filterdMessageElements(t, Kr)), n;
    }
  }, {
    key: "generateMessageBody",
    value: function generateMessageBody(e, t) {
      var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !1;
      var s = I.getNumberOfElements(e),
        r = n ? t.slice(0, s) : t.slice(t.length - s);
      return I.generateMessageBodyElements(e, r);
    }
    // if role not present - traverse all, if present - traverse last messages
  }, {
    key: "classifyRoleMessages",
    value: function classifyRoleMessages(e, t) {
      var n = t ? I.buildRoleOuterContainerClass(t) : void 0;
      for (var s = e.length - 1; s >= 0; s -= 1) {
        if (t || (n = Array.from(e[s].outerContainer[m]).find(function (p) {
          return p.startsWith(ds);
        })), !n) continue;
        var r = e[s],
          o = r.outerContainer[m].contains(n),
          a = e[s - 1],
          c = e[s + 1],
          l = a == null ? void 0 : a.outerContainer[m].contains(n),
          d = c == null ? void 0 : c.outerContainer[m].contains(n);
        if (o) !l && d ? I.addNewPositionClasses(r, [Qs]) : l && d ? I.addNewPositionClasses(r, [rr]) : l && !d ? I.addNewPositionClasses(r, [ei]) : !l && !d && I.addNewPositionClasses(r, [Qs, ei]);else if (t) break;
      }
    }
  }, {
    key: "areOuterContainerClassRolesSame",
    value: function areOuterContainerClassRolesSame(e, t) {
      return t ? Array.from(t.outerContainer[m]).find(function (s) {
        return s.startsWith(ds);
      }) === I.buildRoleOuterContainerClass(e) : !1;
    }
  }, {
    key: "resetAllRoleElements",
    value: function resetAllRoleElements(e, t, n) {
      if (!t && !n) return;
      var s = "";
      e.forEach(function (r, o) {
        r.bubbleElement[m].contains(vs) || I.revealRoleElements(r.innerContainer, t, n);
        var a = Array.from(r.outerContainer[m]).find(function (c) {
          return c.startsWith(ds);
        });
        s === a && I.hideRoleElements(e[o - 1].innerContainer, t, n), s = a;
      });
    }
    // this is a workaround to prevent JSON.parse(JSON.stringify()) from removing the files' 'ref' property values
    // and 'custom' property value if it is not shallow copyable
    // note - structuredClone can fix this but it doesn't have good legacy compatibility
  }, {
    key: "deepCloneMessagesWithReferences",
    value: function deepCloneMessagesWithReferences(e) {
      return e.map(function (t) {
        return I.processMessageContent(t);
      });
    }
  }, {
    key: "processMessageContent",
    value: function processMessageContent(e) {
      if (e == null || _typeof(e) !== L) return e;
      if (Array.isArray(e)) return e.map(function (n) {
        return I.processMessageContent(n);
      });
      var t = {};
      return Object.entries(e).forEach(function (_ref6) {
        var _ref7 = _slicedToArray(_ref6, 2),
          n = _ref7[0],
          s = _ref7[1];
        n === "ref" && s instanceof File || n === "custom" ? t[n] = s : s !== null && _typeof(s) === L ? t[n] = I.processMessageContent(s) : t[n] = s;
      }), t;
    }
  }]);
}();
var tt = /*#__PURE__*/function () {
  function tt(e, t) {
    _classCallCheck(this, tt);
    this.allowScroll = !0, this._fileAdded = !1, this._streamType = "", this._hasStreamEnded = !1, this._partialText = "", this._messages = e, tt.isFocusModeScrollAllowed(this._messages.focusMode) && (this.allowScroll = !1), _typeof(t) == "object" && (this._partialRender = t.partialRender);
  }
  return _createClass(tt, [{
    key: "upsertStreamedMessage",
    value: function upsertStreamedMessage(e) {
      if (this._hasStreamEnded) return;
      if ((e == null ? void 0 : e[h]) === void 0 && (e == null ? void 0 : e[R]) === void 0) return console[f](Xr);
      e != null && e.custom && this._message && (this._message.custom = e.custom);
      var t = (e == null ? void 0 : e[h]) || (e == null ? void 0 : e[R]) || "",
        n = X.isScrollbarAtBottomOfElement(this._messages.elementRef),
        s = (e == null ? void 0 : e[h]) !== void 0 ? h : R;
      if (!this._elements && !this._message) this.setInitialState(s, t, e == null ? void 0 : e.role);else {
        if (this._streamType !== s) return console[f](Bo);
        this.updateBasedOnType(t, s, e == null ? void 0 : e.overwrite);
      }
      n && this.allowScroll && X.scrollToBottom(this._messages.elementRef);
    }
  }, {
    key: "setInitialState",
    value: function setInitialState(e, t, n) {
      var o, a;
      this._streamType = e, n !== null && n !== void 0 ? n : n = W;
      var s = ((o = this._messages._customWrappers) == null ? void 0 : o[n]) || ((a = this._messages._customWrappers) == null ? void 0 : a[x]),
        r = s ? "" : t;
      this._elements = e === h ? this._messages.addNewTextMessage(r, n) : it.add(this._messages, r, n, !0), this._elements && (this._elements.bubbleElement[m].add(tt.MESSAGE_CLASS), this._activeMessageRole = n, this._message = _defineProperty({
        role: this._activeMessageRole
      }, e, r), this._messages.messageToElements.push([this._message, _defineProperty({}, e, this._elements)]), s && this.setTargetWrapperIfNeeded(this._elements, t, this._streamType, s));
    }
    // not using existing htmlUtils htmlWrappers logic to be able to stream html
  }, {
    key: "setTargetWrapperIfNeeded",
    value: function setTargetWrapperIfNeeded(e, t, n, s) {
      e.bubbleElement.innerHTML = s, this._targetWrapper = Se.getTargetWrapper(e.bubbleElement), this._elements && Se.apply(this._messages, this._elements.bubbleElement), this.updateBasedOnType(t, n);
    }
  }, {
    key: "updateBasedOnType",
    value: function updateBasedOnType(e, t) {
      var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !1;
      var o;
      var s = this._targetWrapper || ((o = this._elements) == null ? void 0 : o.bubbleElement);
      this._partialRender || I.unfillEmptyMessageElement(s, e), (t === h ? this.updateText : this.updateHTML).bind(this)(e, s, n);
    }
  }, {
    key: "updateText",
    value: function updateText(e, t, n) {
      this._message && (this._message[h] = n ? e : this._message[h] + e, this._partialRender && this.isNewPartialRenderParagraph(t, n) && this.partialRenderNewParagraph(t), this._partialBubble ? this.partialRenderBubbleUpdate(e) : this._messages.renderText(t, this._message[h]));
    }
  }, {
    key: "isNewPartialRenderParagraph",
    value: function isNewPartialRenderParagraph(e, t) {
      var n;
      return t ? (e.innerHTML = "", !0) : this._partialBubble ? this._partialText && this.shouldCreateNewParagraph(this._partialText) : ((n = this._message) == null ? void 0 : n[h]) && this.shouldCreateNewParagraph(this._message[h]);
    }
  }, {
    key: "shouldCreateNewParagraph",
    value: function shouldCreateNewParagraph(e) {
      var t = e.indexOf(tt.PARTIAL_RENDER_TEXT_MARK);
      return t === -1 ? !1 : !e.substring(t + tt.PARTIAL_RENDER_TEXT_MARK.length).startsWith("---");
    }
  }, {
    key: "partialRenderNewParagraph",
    value: function partialRenderNewParagraph(e) {
      this._partialText = "", this._partialBubble = S(), this._partialBubble[m].add("partial-render-message"), e.appendChild(this._partialBubble);
    }
  }, {
    key: "partialRenderBubbleUpdate",
    value: function partialRenderBubbleUpdate(e) {
      this._partialText += e, this._messages.renderText(this._partialBubble, this._partialText);
    }
  }, {
    key: "updateHTML",
    value: function updateHTML(e, t, n) {
      if (this._message) if (n) this._message[R] = e, t.innerHTML = e;else {
        var s = S("span");
        s.innerHTML = e, t.appendChild(s), this._message[R] = (t == null ? void 0 : t.innerHTML) || "";
      }
    }
  }, {
    key: "finaliseStreamedMessage",
    value: function finaliseStreamedMessage() {
      var e, t;
      if (!(this._endStreamAfterOperation || !this._message) && !(this._fileAdded && !this._elements)) {
        if (!this._elements) throw Error(Do);
        (e = this._elements.bubbleElement) != null && e[m].contains(tt.MESSAGE_CLASS) && (this._streamType === h ? this._messages.textToSpeech && on.speak(this._message[h] || "", this._messages.textToSpeech) : this._streamType === R && this._elements && Se.apply(this._messages, this._elements.outerContainer), this._elements.bubbleElement[m].remove(tt.MESSAGE_CLASS), this._message && (this._messages.sendClientUpdate($e.createMessageContent(this._message), !1), (t = this._messages.browserStorage) == null || t.addMessages(this._messages.messageToElements.map(function (_ref9) {
          var _ref0 = _slicedToArray(_ref9, 1),
            n = _ref0[0];
          return n;
        }))), this._hasStreamEnded = !0);
      }
    }
  }, {
    key: "markFileAdded",
    value: function markFileAdded() {
      this._fileAdded = !0;
    }
    // prettier-ignore
  }, {
    key: "endStreamAfterFileDownloaded",
    value: function () {
      var _endStreamAfterFileDownloaded = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(e, t) {
        var _yield$t, n, s;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              this._endStreamAfterOperation = !0;
              _context2.n = 1;
              return t();
            case 1:
              _yield$t = _context2.v;
              n = _yield$t.text;
              s = _yield$t.files;
              n && this.updateBasedOnType(n, h, !0), this._endStreamAfterOperation = !1, this.finaliseStreamedMessage(), s && e.addNewMessage(_defineProperty({}, y, s));
            case 2:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function endStreamAfterFileDownloaded(_x3, _x4) {
        return _endStreamAfterFileDownloaded.apply(this, arguments);
      }
      return endStreamAfterFileDownloaded;
    }()
  }], [{
    key: "isFocusModeScrollAllowed",
    value: function isFocusModeScrollAllowed(e) {
      return _typeof(e) == "object" && typeof e.streamAutoScroll == "boolean" && !e.streamAutoScroll;
    }
  }]);
}();
tt.MESSAGE_CLASS = "streamed-message", tt.PARTIAL_RENDER_TEXT_MARK = "\n\n";
var Ye = tt;
var M = /*#__PURE__*/function () {
  function M() {
    _classCallCheck(this, M);
  }
  return _createClass(M, null, [{
    key: "tempRemoveContentHeader",
    value: // need to pass stringifyBody boolean separately as binding is throwing an error for some reason
    // prettier-ignore
    function () {
      var _tempRemoveContentHeader = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(e, t, n) {
        var s, r, _t3;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              if (e != null && e.headers) {
                _context3.n = 1;
                break;
              }
              throw new Error(Ie);
            case 1:
              s = e.headers[B];
              delete e.headers[B];
              _context3.p = 2;
              _context3.n = 3;
              return t(n);
            case 3:
              r = _context3.v;
              _context3.n = 5;
              break;
            case 4:
              _context3.p = 4;
              _t3 = _context3.v;
              throw e.headers[B] = s, _t3;
            case 5:
              return _context3.a(2, (e.headers[B] = s, r));
          }
        }, _callee3, null, [[2, 4]]);
      }));
      function tempRemoveContentHeader(_x9, _x0, _x1) {
        return _tempRemoveContentHeader.apply(this, arguments);
      }
      return tempRemoveContentHeader;
    }()
  }, {
    key: "displayError",
    value: function displayError(e, t) {
      var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "Service error, please try again.";
      if (console[f](t), _typeof(t) === L) return t instanceof Error ? e.addNewErrorMessage(Z, t.message) : Array.isArray(t) || typeof t[f] == "string" ? e.addNewErrorMessage(Z, t) : Object.keys(t).length === 0 ? e.addNewErrorMessage(Z, n) : e.addNewErrorMessage(Z, JSON.stringify(t));
      e.addNewErrorMessage(Z, t);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }, {
    key: "fetch",
    value: function (_fetch) {
      function fetch(_x5, _x6, _x7, _x8) {
        return _fetch.apply(this, arguments);
      }
      fetch.toString = function () {
        return _fetch.toString();
      };
      return fetch;
    }(function (e, t, n, s) {
      var o, a;
      var r = {
        method: ((o = e.connectSettings) == null ? void 0 : o.method) || fe,
        headers: t
      };
      return r.method !== re && (r.body = n ? JSON.stringify(s) : s), e.connectSettings.credentials && (r.credentials = e.connectSettings.credentials), fetch(((a = e.connectSettings) == null ? void 0 : a.url) || e.url || "", r);
    })
  }, {
    key: "processResponseByType",
    value: function processResponseByType(e) {
      var t = e.headers.get("content-type");
      return t != null && t.includes(V) ? e.json() : t != null && t.includes("text/plain") || !t ? e : e.blob();
    }
  }, {
    key: "processRequestInterceptor",
    value: function () {
      var _processRequestInterceptor = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(e, t) {
        var o, n, s, r, _t4;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              _context4.n = 1;
              return (o = e.requestInterceptor) == null ? void 0 : o.call(e, t);
            case 1:
              _t4 = _context4.v;
              if (_t4) {
                _context4.n = 2;
                break;
              }
              _t4 = t;
            case 2:
              n = _t4;
              s = n;
              r = n;
              return _context4.a(2, {
                body: s.body,
                headers: s.headers,
                error: r[f]
              });
          }
        }, _callee4);
      }));
      function processRequestInterceptor(_x10, _x11) {
        return _processRequestInterceptor.apply(this, arguments);
      }
      return processRequestInterceptor;
    }()
  }, {
    key: "validateResponseFormat",
    value: function validateResponseFormat(e, t) {
      if (!e) return !1;
      var n = Array.isArray(e) ? e : [e];
      return t && n.length > 1 ? (console[f](Wr), !1) : !n.find(function (r) {
        return _typeof(r) != "object" || !(typeof r[f] == "string" || typeof r[h] == "string" || typeof r[R] == "string" || Array.isArray(r[y]));
      });
    }
  }, {
    key: "onInterceptorError",
    value: function onInterceptorError(e, t, n) {
      e.addNewErrorMessage(Z, t), n == null || n();
    }
    // prettier-ignore
  }, {
    key: "basicResponseProcessing",
    value: function () {
      var _basicResponseProcessing = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(e, t) {
        var n,
          s,
          _n$displayError,
          r,
          _n$useRI,
          o,
          a,
          c,
          l,
          d,
          _args5 = arguments,
          _t5;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              n = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : {};
              s = n.io, _n$displayError = n.displayError, r = _n$displayError === void 0 ? !0 : _n$displayError, _n$useRI = n.useRI, o = _n$useRI === void 0 ? !0 : _n$useRI;
              if (s != null && s.extractResultData) {
                _context5.n = 1;
                break;
              }
              return _context5.a(2, t);
            case 1:
              a = o ? s.deepChat.responseInterceptor : void 0;
              _context5.n = 2;
              return a == null ? void 0 : a(t);
            case 2:
              _t5 = _context5.v;
              if (_t5) {
                _context5.n = 3;
                break;
              }
              _t5 = t;
            case 3:
              c = _t5;
              _context5.n = 4;
              return s.extractResultData(c);
            case 4:
              l = _context5.v;
              if (!(!l || _typeof(l) != "object" && !Array.isArray(l))) {
                _context5.n = 5;
                break;
              }
              if (r) {
                d = rn(t, "response", !!a, c);
                M.displayError(e, d);
              }
              return _context5.a(2);
            case 5:
              return _context5.a(2, l);
          }
        }, _callee5);
      }));
      function basicResponseProcessing(_x12, _x13) {
        return _basicResponseProcessing.apply(this, arguments);
      }
      return basicResponseProcessing;
    }()
  }]);
}();
function Cc(_x14, _x15) {
  return _Cc.apply(this, arguments);
}
function _Cc() {
  _Cc = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee182(i, e) {
    var t, n;
    return _regenerator().w(function (_context182) {
      while (1) switch (_context182.n) {
        case 0:
          t = i.getReader();
        case 1:
          _context182.n = 2;
          return t.read();
        case 2:
          if ((n = _context182.v).done) {
            _context182.n = 4;
            break;
          }
          e(n.value);
        case 3:
          _context182.n = 1;
          break;
        case 4:
          return _context182.a(2);
      }
    }, _callee182);
  }));
  return _Cc.apply(this, arguments);
}
function Tc(i) {
  var e,
    t,
    n,
    s = !1;
  return function (o) {
    e === void 0 ? (e = o, t = 0, n = -1) : e = Ic(e, o);
    var a = e.length;
    var c = 0;
    for (; t < a;) {
      s && (e[t] === 10 && (c = ++t), s = !1);
      var l = -1;
      for (; t < a && l === -1; ++t) switch (e[t]) {
        case 58:
          n === -1 && (n = t - c);
          break;
        case 13:
          s = !0;
        case 10:
          l = t;
          break;
      }
      if (l === -1) break;
      i(e.subarray(c, l), n), c = t, n = -1;
    }
    c === a ? e = void 0 : c !== 0 && (e = e.subarray(c), t -= c);
  };
}
function Rc(i, e, t) {
  var n = _r();
  var s = new TextDecoder();
  return function (o, a) {
    if (o.length === 0) t == null || t(n), n = _r();else if (a > 0) {
      var c = s.decode(o.subarray(0, a)),
        l = a + (o[a + 1] === 32 ? 2 : 1),
        d = s.decode(o.subarray(l));
      switch (c) {
        case "data":
          n.data = n.data ? n.data + "\n" + d : d;
          break;
        case "event":
          n.event = d;
          break;
        case "id":
          i(n.id = d);
          break;
        case "retry":
          var p = parseInt(d, 10);
          isNaN(p) || e(n.retry = p);
          break;
      }
    }
  };
}
function Ic(i, e) {
  var t = new Uint8Array(i.length + e.length);
  return t.set(i), t.set(e, i.length), t;
}
function _r() {
  return {
    data: "",
    event: "",
    id: "",
    retry: void 0
  };
}
var Mc = function Mc(i, e) {
  var t = {};
  for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && e.indexOf(n) < 0 && (t[n] = i[n]);
  if (i != null && typeof Object.getOwnPropertySymbols == "function") for (var s = 0, n = Object.getOwnPropertySymbols(i); s < n.length; s++) e.indexOf(n[s]) < 0 && Object.prototype.propertyIsEnumerable.call(i, n[s]) && (t[n[s]] = i[n[s]]);
  return t;
};
var di = "text/event-stream",
  kc = 1e3,
  Er = "last-event-id";
function Oc(i, e) {
  var t = e.signal,
    n = e.headers,
    s = e.onopen,
    r = e.onmessage,
    o = e.onclose,
    a = e.onerror,
    c = e.openWhenHidden,
    l = e.fetch,
    d = Mc(e, ["signal", "headers", "onopen", "onmessage", "onclose", "onerror", "openWhenHidden", "fetch"]);
  return new Promise(function (p, u) {
    var g = Object.assign({}, n);
    g.accept || (g.accept = di);
    var v;
    function b() {
      v.abort(), document.hidden || be();
    }
    c || document.addEventListener("visibilitychange", b);
    var E = kc,
      w = 0;
    function F() {
      document.removeEventListener("visibilitychange", b), window.clearTimeout(w), v.abort();
    }
    t == null || t.addEventListener("abort", function () {
      F(), p();
    });
    var J = l !== null && l !== void 0 ? l : window.fetch,
      K = s !== null && s !== void 0 ? s : Nc;
    function be() {
      return _be.apply(this, arguments);
    }
    function _be() {
      _be = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
        var _t, Et, Pe, _t6;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.p = _context6.n) {
            case 0:
              v = new AbortController();
              _context6.p = 1;
              _context6.n = 2;
              return J(i, Object.assign(Object.assign({}, d), {
                headers: g,
                signal: v.signal
              }));
            case 2:
              Et = _context6.v;
              _context6.n = 3;
              return K(Et);
            case 3:
              _context6.n = 4;
              return Cc(Et.body, Tc(Rc(function (Pe) {
                Pe ? g[Er] = Pe : delete g[Er];
              }, function (Pe) {
                E = Pe;
              }, r)));
            case 4:
              o == null || o();
              F();
              p();
              _context6.n = 6;
              break;
            case 5:
              _context6.p = 5;
              _t6 = _context6.v;
              if (!v.signal.aborted) try {
                Pe = (_t = a == null ? void 0 : a(_t6)) !== null && _t !== void 0 ? _t : E;
                window.clearTimeout(w), w = window.setTimeout(be, Pe);
              } catch (Pe) {
                F(), u(Pe);
              }
            case 6:
              return _context6.a(2);
          }
        }, _callee6, null, [[1, 5]]);
      }));
      return _be.apply(this, arguments);
    }
    be();
  });
}
function Nc(i) {
  var e = i.headers.get("content-type");
  if (!(e != null && e.startsWith(di))) throw new Error("Expected content-type to be ".concat(di, ", Actual: ").concat(e));
}
var D = /*#__PURE__*/function () {
  function D() {
    _classCallCheck(this, D);
  }
  return _createClass(D, null, [{
    key: "request",
    value: // prettier-ignore
    function () {
      var _request = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(e, t, n) {
        var s,
          r,
          u,
          g,
          v,
          b,
          E,
          o,
          _yield$M$processReque,
          a,
          c,
          l,
          d,
          p,
          _args7 = arguments;
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              s = _args7.length > 3 && _args7[3] !== undefined ? _args7[3] : !0;
              r = _args7.length > 4 && _args7[4] !== undefined ? _args7[4] : !1;
              o = {
                body: t,
                headers: (u = e.connectSettings) == null ? void 0 : u.headers
              };
              _context7.n = 1;
              return M.processRequestInterceptor(e.deepChat, o);
            case 1:
              _yield$M$processReque = _context7.v;
              a = _yield$M$processReque.body;
              c = _yield$M$processReque.headers;
              l = _yield$M$processReque.error;
              if (!l) {
                _context7.n = 2;
                break;
              }
              return _context7.a(2, M.onInterceptorError(n, l, e.streamHandlers.onClose));
            case 2:
              if (!((g = e.connectSettings) != null && g.handler)) {
                _context7.n = 3;
                break;
              }
              return _context7.a(2, Ze.stream(e, a, n));
            case 3:
              if (!(((v = e.connectSettings) == null ? void 0 : v.url) === et.URL)) {
                _context7.n = 4;
                break;
              }
              return _context7.a(2, et.requestStream(n, e));
            case 4:
              d = new Ye(n, e.stream), p = {
                method: ((b = e.connectSettings) == null ? void 0 : b.method) || fe,
                headers: c,
                credentials: (E = e.connectSettings) == null ? void 0 : E.credentials,
                body: s ? JSON.stringify(a) : a
              };
              return _context7.a(2, (_typeof(e.stream) == "object" && e.stream.readable ? D.handleReadableStream(e, n, d, p, r, a) : D.handleEventStream(e, n, d, p, r, a), d));
          }
        }, _callee7);
      }));
      function request(_x16, _x17, _x18) {
        return _request.apply(this, arguments);
      }
      return request;
    }() // prettier-ignore
  }, {
    key: "handleReadableStream",
    value: function handleReadableStream(e, t, n, s, r, o) {
      var d;
      var _e$streamHandlers = e.streamHandlers,
        a = _e$streamHandlers.onOpen,
        c = _e$streamHandlers.onClose;
      var l = !1;
      fetch(((d = e.connectSettings) == null ? void 0 : d.url) || e.url || "", s).then(/*#__PURE__*/function () {
        var _ref1 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(p) {
          var b, E, u, g, v, _yield$u$read, w, F, J, K, be, _t7;
          return _regenerator().w(function (_context8) {
            while (1) switch (_context8.n) {
              case 0:
                if (p.body) {
                  _context8.n = 1;
                  break;
                }
                throw new Error(Fo);
              case 1:
                u = p.body.getReader(), g = new TextDecoder();
                a();
                v = !1;
              case 2:
                if (!(!v && !l)) {
                  _context8.n = 8;
                  break;
                }
                _context8.n = 3;
                return u.read();
              case 3:
                _yield$u$read = _context8.v;
                w = _yield$u$read.value;
                F = _yield$u$read.done;
                if (!(v = F, v)) {
                  _context8.n = 4;
                  break;
                }
                D.handleClose(e, n, c, r);
                _context8.n = 7;
                break;
              case 4:
                J = g.decode(w, {
                  stream: !0
                });
                _context8.n = 5;
                return (E = (b = e.deepChat).responseInterceptor) == null ? void 0 : E.call(b, J);
              case 5:
                _t7 = _context8.v;
                if (_t7) {
                  _context8.n = 6;
                  break;
                }
                _t7 = J;
              case 6:
                K = _t7;
                be = _typeof(K) == "object" ? K : _defineProperty({}, h, J);
                D.handleMessage(e, t, n, be, o);
              case 7:
                _context8.n = 2;
                break;
              case 8:
                return _context8.a(2);
            }
          }, _callee8);
        }));
        return function (_x19) {
          return _ref1.apply(this, arguments);
        };
      }())["catch"](function (p) {
        D.handleError(e, t, p);
      }), e.streamHandlers.onAbort = function () {
        n.finaliseStreamedMessage(), e.streamHandlers.onClose(), l = !0;
      };
    }
    // prettier-ignore
  }, {
    key: "handleEventStream",
    value: function handleEventStream(e, t, n, s, r, o) {
      var d;
      var _e$streamHandlers2 = e.streamHandlers,
        a = _e$streamHandlers2.onOpen,
        c = _e$streamHandlers2.onClose,
        l = new AbortController();
      e.streamHandlers.onAbort = function () {
        n.finaliseStreamedMessage(), e.streamHandlers.onClose(), l.abort();
      }, Oc(((d = e.connectSettings) == null ? void 0 : d.url) || e.url || "", _objectSpread(_objectSpread({}, s), {}, {
        openWhenHidden: !0,
        // keep stream open when browser tab not open
        onopen: function onopen(p) {
          return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
            return _regenerator().w(function (_context9) {
              while (1) switch (_context9.n) {
                case 0:
                  if (!p.ok) {
                    _context9.n = 1;
                    break;
                  }
                  return _context9.a(2, a());
                case 1:
                  _context9.n = 2;
                  return M.processResponseByType(p);
                case 2:
                  throw _context9.v;
                case 3:
                  return _context9.a(2);
              }
            }, _callee9);
          }))();
        },
        onmessage: function onmessage(p) {
          return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0() {
            var u, g, v, b, _t8;
            return _regenerator().w(function (_context0) {
              while (1) switch (_context0.n) {
                case 0:
                  if (!(JSON.stringify(p.data) !== JSON.stringify("[DONE]"))) {
                    _context0.n = 3;
                    break;
                  }
                  try {
                    v = JSON.parse(p.data);
                  } catch (_unused6) {
                    v = {};
                  }
                  _context0.n = 1;
                  return (g = (u = e.deepChat).responseInterceptor) == null ? void 0 : g.call(u, v);
                case 1:
                  _t8 = _context0.v;
                  if (_t8) {
                    _context0.n = 2;
                    break;
                  }
                  _t8 = v;
                case 2:
                  b = _t8;
                  D.handleMessage(e, t, n, b, o);
                case 3:
                  return _context0.a(2);
              }
            }, _callee0);
          }))();
        },
        onerror: function onerror(p) {
          throw c(), p;
        },
        onclose: function onclose() {
          D.handleClose(e, n, c, r);
        },
        signal: l.signal
      }))["catch"](function (p) {
        D.handleError(e, t, p);
      });
    }
    //prettier-ignore
  }, {
    key: "handleMessage",
    value: function handleMessage(e, t, n, s, r) {
      var o;
      (o = e.extractResultData) == null || o.call(e, s, r).then(function (a) {
        D.upsertContent(t, n.upsertStreamedMessage.bind(n), n, a), t.removeError();
      })["catch"](function (a) {
        t.isLastMessageError() || M.displayError(t, a);
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }, {
    key: "handleError",
    value: function handleError(e, t, n) {
      var s;
      t.isLastMessageError() || (s = e.extractResultData) == null || s.call(e, n).then(function () {
        M.displayError(t, n);
      })["catch"](function (r) {
        M.displayError(t, r);
      });
    }
  }, {
    key: "handleClose",
    value: function handleClose(e, t, n, s) {
      if (e.asyncCallInProgress) {
        e.asyncCallInProgress = !1;
        return;
      }
      try {
        t.finaliseStreamedMessage(), n();
      } catch (r) {
        if (!s) throw r;
      }
    }
    // io is only passed for demo to simulate a real stream
  }, {
    key: "simulate",
    value: function () {
      var _simulate = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(e, t, n, s) {
        var r, o, _r2, _r3, _o2;
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.n) {
            case 0:
              _context1.n = 1;
              return M.basicResponseProcessing(e, n, {
                io: s,
                useRI: !1
              });
            case 1:
              if (_context1.v) {
                _context1.n = 2;
                break;
              }
              return _context1.a(2, t.onClose());
            case 2:
              if (Array.isArray(n) && (n = n[0]), n[R]) {
                t.onOpen();
                r = Se.splitHTML(n[R]);
                r.length === 0 && (r = n[R].split(""));
                o = new Ye(e, s == null ? void 0 : s.stream);
                D.populateMessages(e, r, o, t, R, 0, s);
              }
              if (!n[y]) {
                _context1.n = 4;
                break;
              }
              _context1.n = 3;
              return M.basicResponseProcessing(e, _defineProperty({}, y, n[y]), {
                io: s
              });
            case 3:
              _r2 = _context1.v;
              e.addNewMessage(_objectSpread({
                sendUpdate: !1
              }, _r2), !1), !n[R] && !n[h] && (new Ye(e, s == null ? void 0 : s.stream).finaliseStreamedMessage(), t.onClose());
            case 4:
              if (n[h]) {
                t.onOpen();
                _r3 = n[h].split(""), _o2 = new Ye(e, s == null ? void 0 : s.stream);
                D.populateMessages(e, _r3, _o2, t, h, 0, s);
              }
              n[f] && (M.displayError(e, n[f]), t.onClose()), t.onAbort = function () {
                t.onClose();
              };
            case 5:
              return _context1.a(2);
          }
        }, _callee1);
      }));
      function simulate(_x20, _x21, _x22, _x23) {
        return _simulate.apply(this, arguments);
      }
      return simulate;
    }() // prettier-ignore
    // io is only passed for demo to simulate a real stream
  }, {
    key: "populateMessages",
    value: function () {
      var _populateMessages = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(e, t, n, s, r, o, a) {
        var c, d, l, _t9;
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.p = _context10.n) {
            case 0:
              c = t[o];
              if (!c) {
                _context10.n = 5;
                break;
              }
              _context10.p = 1;
              _context10.n = 2;
              return M.basicResponseProcessing(e, _defineProperty({}, r, c), {
                io: a
              });
            case 2:
              d = _context10.v;
              D.upsertContent(e, n.upsertStreamedMessage.bind(n), n, d), e.removeError();
              _context10.n = 4;
              break;
            case 3:
              _context10.p = 3;
              _t9 = _context10.v;
              e.isLastMessageError() || M.displayError(e, _t9);
            case 4:
              l = setTimeout(function () {
                D.populateMessages(e, t, n, s, r, o + 1, a);
              }, s.simulationInterim || 6);
              s.onAbort = function () {
                D.abort(l, n, s.onClose);
              };
              _context10.n = 6;
              break;
            case 5:
              n.finaliseStreamedMessage(), s.onClose();
            case 6:
              return _context10.a(2);
          }
        }, _callee10, null, [[1, 3]]);
      }));
      function populateMessages(_x24, _x25, _x26, _x27, _x28, _x29, _x30) {
        return _populateMessages.apply(this, arguments);
      }
      return populateMessages;
    }()
  }, {
    key: "isSimulation",
    value: function isSimulation(e) {
      return _typeof(e) == "object" && !!e.simulation;
    }
  }, {
    key: "isSimulatable",
    value: function isSimulatable(e, t) {
      return D.isSimulation(e) && t && (t[h] || t[R]);
    }
  }, {
    key: "abort",
    value: function abort(e, t, n) {
      clearTimeout(e), t.finaliseStreamedMessage(), n();
    }
  }, {
    key: "upsertContent",
    value: function upsertContent(e, t, n, s) {
      if (s && Array.isArray(s) && (s = s[0]), s != null && s[h] || s != null && s[R]) {
        var r = t(s);
        n !== null && n !== void 0 ? n : n = r || void 0;
      }
      if (s != null && s[y] && (e.addNewMessage(_defineProperty({}, y, s[y])), n == null || n.markFileAdded()), s != null && s[f]) throw s[f];
    }
  }]);
}();
var Pt = /*#__PURE__*/function () {
  function Pt() {
    _classCallCheck(this, Pt);
  }
  return _createClass(Pt, null, [{
    key: "generateResponse",
    value: function generateResponse(e) {
      var t = e[e.length - 1][0];
      if (t[y] && t[y].length > 0) {
        if (t[y].length > 1) return "These are interesting files!";
        var n = t[y][0];
        return n.src && n.src.startsWith("data:image/gif") ? "That is a nice gif!" : n.type === j ? "That is a nice image!" : n.type === P ? "I like the sound of that!" : "That is an interesting file!";
      }
      if (t[h]) {
        if (t[h].charAt(t[h].length - 1) === "?") return "I'm sorry but I can't answer that question...";
        if (t[h].includes("updog")) return "What's updog?";
      }
      return "Hi there! This is a demo response!";
    }
  }, {
    key: "getCustomResponse",
    value: function getCustomResponse(e, t) {
      return typeof e == "function" ? e(t) : e;
    }
  }, {
    key: "getResponse",
    value: function getResponse(_ref11) {
      var e = _ref11.customDemoResponse,
        t = _ref11.messageToElements;
      return e ? Pt.getCustomResponse(e, t[t.length - 1][0]) : _defineProperty({}, h, Pt.generateResponse(t));
    }
    // timeout is used to simulate a timeout for a response to come back
  }, {
    key: "request",
    value: function request(e, t) {
      var n = Pt.getResponse(t);
      setTimeout(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11() {
        var s, r, o;
        return _regenerator().w(function (_context11) {
          while (1) switch (_context11.n) {
            case 0:
              _context11.n = 1;
              return M.basicResponseProcessing(t, n, {
                io: e
              });
            case 1:
              s = _context11.v;
              if (s) {
                _context11.n = 2;
                break;
              }
              return _context11.a(2, e.completionsHandlers.onFinish());
            case 2:
              r = Array.isArray(s) ? s : [s], o = r.find(function (a) {
                return typeof a[f] == "string";
              });
              o ? (t.addNewErrorMessage(Z, o[f]), e.completionsHandlers.onFinish()) : D.isSimulatable(e.stream, s) ? D.simulate(t, e.streamHandlers, s) : (r.forEach(function (a) {
                return t.addNewMessage(a);
              }), e.completionsHandlers.onFinish());
            case 3:
              return _context11.a(2);
          }
        }, _callee11);
      })), 400);
    }
    // timeout is used to simulate a timeout for a response to come back
  }, {
    key: "requestStream",
    value: function requestStream(e, t) {
      setTimeout(function () {
        var n = Pt.getResponse(e);
        D.simulate(e, t.streamHandlers, n, t);
      }, 400);
    }
  }]);
}();
Pt.URL = "deep-chat-demo";
var et = Pt;
var _e = /*#__PURE__*/function () {
  function _e() {
    _classCallCheck(this, _e);
  }
  return _createClass(_e, null, [{
    key: "setup",
    value: function setup(e) {
      e.permittedErrorPrefixes = ["Connection error", "Error in server message"], e.websocket = "pending";
    }
  }, {
    key: "isElementPresentInDOM",
    value: function isElementPresentInDOM(e) {
      return e.getRootNode({
        composed: !0
      }) instanceof Document;
    }
  }, {
    key: "createConnection",
    value: function createConnection(e, t) {
      if (!_e.isElementPresentInDOM(e.deepChat)) return;
      var n = e.connectSettings.websocket;
      if (n) {
        if (e.connectSettings.handler) return Ze.websocket(e, t);
        try {
          var s = typeof n != "boolean" ? n : void 0,
            r = new WebSocket(e.connectSettings.url || "", s);
          e.websocket = r, e.websocket.onopen = function () {
            var o, a;
            t.removeError(), e.websocket && _typeof(e.websocket) === L && _e.assignListeners(e, r, t), (a = (o = e.deepChat)._validationHandler) == null || a.call(o);
          }, e.websocket.onerror = function (o) {
            console[f](o), _e.retryConnection(e, t);
          };
        } catch (s) {
          console[f](s), _e.retryConnection(e, t);
        }
      }
    }
  }, {
    key: "retryConnection",
    value: function retryConnection(e, t) {
      var n, s;
      (s = (n = e.deepChat)._validationHandler) == null || s.call(n), _e.isElementPresentInDOM(e.deepChat) && (e.websocket = "pending", t.isLastMessageError() || t.addNewErrorMessage(Z, "Connection error"), setTimeout(function () {
        _e.createConnection(e, t);
      }, 5e3));
    }
  }, {
    key: "assignListeners",
    value: function assignListeners(e, t, n) {
      var _this9 = this;
      var s = {};
      t.onmessage = /*#__PURE__*/function () {
        var _ref14 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(r) {
          var o, a, c, l, _c2, _l2, _t0;
          return _regenerator().w(function (_context12) {
            while (1) switch (_context12.p = _context12.n) {
              case 0:
                if (!e.extractResultData) {
                  _context12.n = 8;
                  break;
                }
                _context12.p = 1;
                o = JSON.parse(r.data);
                _context12.n = 2;
                return M.basicResponseProcessing(n, o, {
                  io: e,
                  displayError: !1
                });
              case 2:
                a = _context12.v;
                if (a) {
                  _context12.n = 3;
                  break;
                }
                throw Error(rn(o, "server", !!e.deepChat.responseInterceptor, a));
              case 3:
                if (!D.isSimulation(e.stream)) {
                  _context12.n = 4;
                  break;
                }
                c = _e.stream.bind(_this9, e, n, s), l = s[o.role || W];
                D.upsertContent(n, c, l, a);
                _context12.n = 6;
                break;
              case 4:
                _c2 = Array.isArray(a) ? a : [a], _l2 = _c2.find(function (d) {
                  return typeof d[f] == "string";
                });
                if (!_l2) {
                  _context12.n = 5;
                  break;
                }
                throw _l2[f];
              case 5:
                _c2.forEach(function (d) {
                  return n.addNewMessage(d);
                });
              case 6:
                _context12.n = 8;
                break;
              case 7:
                _context12.p = 7;
                _t0 = _context12.v;
                M.displayError(n, _t0, "Error in server message");
              case 8:
                return _context12.a(2);
            }
          }, _callee12, null, [[1, 7]]);
        }));
        return function (_x31) {
          return _ref14.apply(this, arguments);
        };
      }(), t.onclose = function () {
        var r, o;
        console[f]("Connection closed"), n.isLastMessageError() || n.addNewErrorMessage(Z, "Connection error"), e.stream && ((o = (r = e.streamHandlers).onAbort) == null || o.call(r)), _e.createConnection(e, n);
      };
    }
  }, {
    key: "sendWebsocket",
    value: function () {
      var _sendWebsocket = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(e, t, n) {
        var s,
          d,
          p,
          r,
          o,
          _yield$M$processReque2,
          a,
          c,
          l,
          _args13 = arguments;
        return _regenerator().w(function (_context13) {
          while (1) switch (_context13.n) {
            case 0:
              s = _args13.length > 3 && _args13[3] !== undefined ? _args13[3] : !0;
              if (!(((d = e.connectSettings) == null ? void 0 : d.url) === et.URL)) {
                _context13.n = 1;
                break;
              }
              return _context13.a(2, et.request(e, n));
            case 1:
              r = e.websocket;
              if (!(!r || r === "pending")) {
                _context13.n = 2;
                break;
              }
              return _context13.a(2);
            case 2:
              o = {
                body: t,
                headers: (p = e.connectSettings) == null ? void 0 : p.headers
              };
              _context13.n = 3;
              return M.processRequestInterceptor(e.deepChat, o);
            case 3:
              _yield$M$processReque2 = _context13.v;
              a = _yield$M$processReque2.body;
              c = _yield$M$processReque2.error;
              if (!c) {
                _context13.n = 4;
                break;
              }
              return _context13.a(2, n.addNewErrorMessage(Z, c));
            case 4:
              if (_e.isWebSocket(r)) {
                _context13.n = 5;
                break;
              }
              return _context13.a(2, r.newUserMessage.listener(a));
            case 5:
              l = s ? JSON.stringify(a) : a;
              r.readyState === void 0 || r.readyState !== r.OPEN ? (console[f]("Connection is not open"), n.isLastMessageError() || n.addNewErrorMessage(Z, "Connection error")) : (r.send(JSON.stringify(l)), e.completionsHandlers.onFinish());
            case 6:
              return _context13.a(2);
          }
        }, _callee13);
      }));
      function sendWebsocket(_x32, _x33, _x34) {
        return _sendWebsocket.apply(this, arguments);
      }
      return sendWebsocket;
    }()
  }, {
    key: "canSendMessage",
    value: function canSendMessage(e) {
      return e ? e === "pending" ? !1 : _e.isWebSocket(e) ? e.readyState !== void 0 && e.readyState === e.OPEN : e.isOpen : !0;
    }
    // if false then it is the internal websocket handler
  }, {
    key: "isWebSocket",
    value: function isWebSocket(e) {
      return e.send !== void 0;
    }
  }, {
    key: "stream",
    value: function stream(e, t, n, s) {
      if (!s) return;
      var r = e.stream.simulation;
      if (typeof r == "string") {
        var _n$o;
        var o = s.role || W,
          a = n[o];
        s[h] === r || s[R] === r ? (a == null || a.finaliseStreamedMessage(), delete n[o]) : ((_n$o = n[o]) !== null && _n$o !== void 0 ? _n$o : n[o] = new Ye(t, e.stream), n[o].upsertStreamedMessage(s));
      } else D.simulate(t, e.streamHandlers, s);
    }
  }]);
}();
var Ze = /*#__PURE__*/function () {
  function Ze() {
    _classCallCheck(this, Ze);
  }
  return _createClass(Ze, null, [{
    key: "request",
    value: function () {
      var _request2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15(e, t, n) {
        var a, c, s, r, o;
        return _regenerator().w(function (_context15) {
          while (1) switch (_context15.n) {
            case 0:
              s = !0;
              r = /*#__PURE__*/function () {
                var _ref15 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14(l) {
                  var d, p, u;
                  return _regenerator().w(function (_context14) {
                    while (1) switch (_context14.n) {
                      case 0:
                        if (s) {
                          _context14.n = 1;
                          break;
                        }
                        return _context14.a(2);
                      case 1:
                        s = !1;
                        _context14.n = 2;
                        return M.basicResponseProcessing(n, l, {
                          io: e,
                          displayError: !1
                        });
                      case 2:
                        d = _context14.v;
                        if (!d) console[f](rn(l, "server", !!e.deepChat.responseInterceptor, d)), n.addNewErrorMessage(Z, "Error in server message"), e.completionsHandlers.onFinish();else {
                          p = Array.isArray(d) ? d : [d], u = p.find(function (g) {
                            return typeof g[f] == "string";
                          });
                          u ? (console[f](u[f]), n.addNewErrorMessage(Z, u[f]), e.completionsHandlers.onFinish()) : D.isSimulatable(e.stream, d) ? D.simulate(n, e.streamHandlers, d) : (p.forEach(function (g) {
                            return n.addNewMessage(g);
                          }), e.completionsHandlers.onFinish());
                        }
                      case 3:
                        return _context14.a(2);
                    }
                  }, _callee14);
                }));
                return function r(_x38) {
                  return _ref15.apply(this, arguments);
                };
              }(), o = Ze.generateOptionalSignals();
              (c = (a = e.connectSettings).handler) == null || c.call(a, t, _objectSpread(_objectSpread({}, o), {}, {
                onResponse: r
              }));
            case 1:
              return _context15.a(2);
          }
        }, _callee15);
      }));
      function request(_x35, _x36, _x37) {
        return _request2.apply(this, arguments);
      }
      return request;
    }()
  }, {
    key: "attemptToFinaliseStream",
    value: function attemptToFinaliseStream(e, t) {
      try {
        var n = t.messageElementRefs[t.messageElementRefs.length - 1];
        $e.isLoadingMessage(n) ? t.removeLastMessage() : e.finaliseStreamedMessage();
      } catch (n) {
        console[f](n), t.addNewErrorMessage(Z, n);
      }
    }
    // prettier-ignore
  }, {
    key: "stream",
    value: function stream(e, t, n) {
      var p, u;
      var s = !0,
        r = !1;
      var o = new Ye(n, e.stream),
        a = function a() {
          r || !s || (e.streamHandlers.onOpen(), r = !0);
        },
        c = function c() {
          s && (Ze.attemptToFinaliseStream(o, n), e.streamHandlers.onClose(), s = !1);
        },
        l = /*#__PURE__*/function () {
          var _ref16 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16(g) {
            var v, b;
            return _regenerator().w(function (_context16) {
              while (1) switch (_context16.n) {
                case 0:
                  if (s) {
                    _context16.n = 1;
                    break;
                  }
                  return _context16.a(2);
                case 1:
                  _context16.n = 2;
                  return M.basicResponseProcessing(n, g, {
                    io: e,
                    displayError: !1
                  });
                case 2:
                  v = _context16.v;
                  if (v) v[f] ? (Ze.streamError(v[f], o, e, n), s = !1) : D.upsertContent(n, o.upsertStreamedMessage.bind(o), o, v);else {
                    b = rn(g, "server", !!e.deepChat.responseInterceptor, v);
                    Ze.streamError(b, o, e, n), s = !1;
                  }
                case 3:
                  return _context16.a(2);
              }
            }, _callee16);
          }));
          return function l(_x39) {
            return _ref16.apply(this, arguments);
          };
        }();
      e.streamHandlers.onAbort = function () {
        Ze.attemptToFinaliseStream(o, n), e.streamHandlers.onClose(), s = !1;
      };
      var d = Ze.generateOptionalSignals();
      (u = (p = e.connectSettings).handler) == null || u.call(p, t, _objectSpread(_objectSpread({}, d), {}, {
        onOpen: a,
        onResponse: l,
        onClose: c,
        stopClicked: e.streamHandlers.stopClicked
      }));
    }
  }, {
    key: "streamError",
    value: function streamError(e, t, n, s) {
      console[f](e), t.finaliseStreamedMessage(), s.addNewErrorMessage(Z, e), n.streamHandlers.onClose();
    }
    // prettier-ignore
  }, {
    key: "websocket",
    value: function websocket(e, t) {
      var _this0 = this;
      var c, l;
      var n = {
        isOpen: !1,
        newUserMessage: {
          listener: function listener() {}
        },
        roleToStream: {}
      };
      e.websocket = n;
      var s = function s() {
          t.removeError(), n.isOpen = !0;
        },
        r = function r() {
          n.isOpen = !1;
        },
        o = /*#__PURE__*/function () {
          var _ref17 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17(d) {
            var p, u, g, v, b, E;
            return _regenerator().w(function (_context17) {
              while (1) switch (_context17.n) {
                case 0:
                  _context17.n = 1;
                  return M.basicResponseProcessing(t, d, {
                    io: e,
                    displayError: !1
                  });
                case 1:
                  p = _context17.v;
                  if (!p) console[f](rn(d, "server", !!e.deepChat.responseInterceptor, p)), t.addNewErrorMessage(Z, "Error in server message");else {
                    u = Array.isArray(p) ? p : [p], g = u.find(function (v) {
                      return typeof v[f] == "string";
                    });
                    if (g) console[f](g[f]), t.isLastMessageError() || t.addNewErrorMessage(Z, g[f]);else if (D.isSimulation(e.stream)) {
                      v = p, b = _e.stream.bind(_this0, e, t, n.roleToStream), E = n.roleToStream[v.role || W];
                      D.upsertContent(t, b, E, v);
                    } else u.forEach(function (v) {
                      return t.addNewMessage(v);
                    });
                  }
                case 2:
                  return _context17.a(2);
              }
            }, _callee17);
          }));
          return function o(_x40) {
            return _ref17.apply(this, arguments);
          };
        }(),
        a = Ze.generateOptionalSignals();
      (l = (c = e.connectSettings).handler) == null || l.call(c, void 0, _objectSpread(_objectSpread({}, a), {}, {
        onOpen: s,
        onResponse: o,
        onClose: r,
        newUserMessage: n.newUserMessage
      }));
    }
  }, {
    key: "generateOptionalSignals",
    value: function generateOptionalSignals() {
      return {
        onClose: function onClose() {},
        onOpen: function onOpen() {},
        stopClicked: {
          listener: function listener() {}
        },
        newUserMessage: {
          listener: function listener() {}
        }
      };
    }
  }]);
}();
var ne = /*#__PURE__*/function () {
  function ne() {
    _classCallCheck(this, ne);
  }
  return _createClass(ne, null, [{
    key: "request",
    value: // prettier-ignore
    function () {
      var _request3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee19(e, t, n) {
        var s,
          p,
          u,
          g,
          r,
          _yield$M$processReque3,
          o,
          a,
          c,
          l,
          d,
          _args19 = arguments;
        return _regenerator().w(function (_context19) {
          while (1) switch (_context19.n) {
            case 0:
              s = _args19.length > 3 && _args19[3] !== undefined ? _args19[3] : !0;
              r = {
                body: t,
                headers: (p = e.connectSettings) == null ? void 0 : p.headers
              };
              _context19.n = 1;
              return M.processRequestInterceptor(e.deepChat, r);
            case 1:
              _yield$M$processReque3 = _context19.v;
              o = _yield$M$processReque3.body;
              a = _yield$M$processReque3.headers;
              c = _yield$M$processReque3.error;
              l = e.completionsHandlers.onFinish;
              if (!c) {
                _context19.n = 2;
                break;
              }
              return _context19.a(2, M.onInterceptorError(n, c, l));
            case 2:
              if (!((u = e.connectSettings) != null && u.handler)) {
                _context19.n = 3;
                break;
              }
              return _context19.a(2, Ze.request(e, o, n));
            case 3:
              if (!(((g = e.connectSettings) == null ? void 0 : g.url) === et.URL)) {
                _context19.n = 4;
                break;
              }
              return _context19.a(2, et.request(e, n));
            case 4:
              d = !0;
              M.fetch(e, a, s, o).then(function (v) {
                return d = !!v.ok, v;
              }).then(function (v) {
                return M.processResponseByType(v);
              }).then(/*#__PURE__*/function () {
                var _ref18 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18(v) {
                  var w, F, b, E, _t1;
                  return _regenerator().w(function (_context18) {
                    while (1) switch (_context18.n) {
                      case 0:
                        if (e.extractResultData) {
                          _context18.n = 1;
                          break;
                        }
                        return _context18.a(2);
                      case 1:
                        _context18.n = 2;
                        return (F = (w = e.deepChat).responseInterceptor) == null ? void 0 : F.call(w, v);
                      case 2:
                        _t1 = _context18.v;
                        if (_t1) {
                          _context18.n = 3;
                          break;
                        }
                        _t1 = v;
                      case 3:
                        b = _t1;
                        _context18.n = 4;
                        return e.extractResultData(b, o);
                      case 4:
                        E = _context18.v;
                        if (d) {
                          _context18.n = 5;
                          break;
                        }
                        throw v;
                      case 5:
                        if (!(!E || _typeof(E) !== L && !Array.isArray(E))) {
                          _context18.n = 6;
                          break;
                        }
                        throw Error(rn(v, "response", !!e.deepChat.responseInterceptor, b));
                      case 6:
                        if (!E[f]) {
                          _context18.n = 7;
                          break;
                        }
                        throw E[f];
                      case 7:
                        if (!e.asyncCallInProgress) {
                          _context18.n = 8;
                          break;
                        }
                        e.asyncCallInProgress = !1;
                        return _context18.a(2);
                      case 8:
                        D.isSimulatable(e.stream, E) ? D.simulate(n, e.streamHandlers, E) : ((Array.isArray(E) ? E : [E]).forEach(function (K) {
                          return n.addNewMessage(K);
                        }), l());
                      case 9:
                        return _context18.a(2);
                    }
                  }, _callee18);
                }));
                return function (_x44) {
                  return _ref18.apply(this, arguments);
                };
              }())["catch"](function (v) {
                M.displayError(n, v), l();
              });
            case 5:
              return _context19.a(2);
          }
        }, _callee19);
      }));
      function request(_x41, _x42, _x43) {
        return _request3.apply(this, arguments);
      }
      return request;
    }()
  }, {
    key: "executePollRequest",
    value: function executePollRequest(e, t, n, s) {
      var r = e.completionsHandlers.onFinish;
      fetch(t, n).then(function (o) {
        return o.json();
      }).then(/*#__PURE__*/function () {
        var _ref19 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee20(o) {
          var c, l, a, _t10, _t11;
          return _regenerator().w(function (_context20) {
            while (1) switch (_context20.n) {
              case 0:
                if (e.extractPollResultData) {
                  _context20.n = 1;
                  break;
                }
                return _context20.a(2);
              case 1:
                _t10 = e;
                _context20.n = 2;
                return (l = (c = e.deepChat).responseInterceptor) == null ? void 0 : l.call(c, o);
              case 2:
                _t11 = _context20.v;
                if (_t11) {
                  _context20.n = 3;
                  break;
                }
                _t11 = o;
              case 3:
                _context20.n = 4;
                return _t10.extractPollResultData.call(_t10, _t11);
              case 4:
                a = _context20.v;
                a.timeoutMS ? setTimeout(function () {
                  ne.executePollRequest(e, t, n, s);
                }, a.timeoutMS) : D.isSimulatable(e.stream, a) ? D.simulate(s, e.streamHandlers, a) : (s.addNewMessage(a), r());
              case 5:
                return _context20.a(2);
            }
          }, _callee20);
        }));
        return function (_x45) {
          return _ref19.apply(this, arguments);
        };
      }())["catch"](function (o) {
        M.displayError(s, o), r();
      });
    }
    // prettier-ignore
  }, {
    key: "poll",
    value: function () {
      var _poll = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee21(e, t, n) {
        var s,
          g,
          v,
          b,
          r,
          _yield$M$processReque4,
          o,
          a,
          c,
          l,
          d,
          p,
          u,
          _args21 = arguments;
        return _regenerator().w(function (_context21) {
          while (1) switch (_context21.n) {
            case 0:
              s = _args21.length > 3 && _args21[3] !== undefined ? _args21[3] : !0;
              r = {
                body: t,
                headers: (g = e.connectSettings) == null ? void 0 : g.headers
              };
              _context21.n = 1;
              return M.processRequestInterceptor(e.deepChat, r);
            case 1:
              _yield$M$processReque4 = _context21.v;
              o = _yield$M$processReque4.body;
              a = _yield$M$processReque4.headers;
              c = _yield$M$processReque4.error;
              if (!c) {
                _context21.n = 2;
                break;
              }
              return _context21.a(2, M.onInterceptorError(n, c));
            case 2:
              l = ((v = e.connectSettings) == null ? void 0 : v.url) || e.url || "", d = ((b = e.connectSettings) == null ? void 0 : b.method) || fe, p = s ? JSON.stringify(o) : o, u = {
                method: d,
                body: p,
                headers: a
              };
              e.connectSettings.credentials && (u.credentials = e.connectSettings.credentials), ne.executePollRequest(e, l, u, n);
            case 3:
              return _context21.a(2);
          }
        }, _callee21);
      }));
      function poll(_x46, _x47, _x48) {
        return _poll.apply(this, arguments);
      }
      return poll;
    }() // prettier-ignore
  }, {
    key: "verifyKey",
    value: function verifyKey(e, t, n, s, r, o, a, c, l) {
      if (e === "") return o(se);
      a(), fetch(t, {
        method: s,
        headers: n,
        body: l || null
      }).then(function (d) {
        return M.processResponseByType(d);
      }).then(function (d) {
        c(d, e, r, o);
      })["catch"](function (d) {
        o(Fe), console[f](d);
      });
    }
  }]);
}();
var an = /*#__PURE__*/function () {
  function an() {
    _classCallCheck(this, an);
  }
  return _createClass(an, null, [{
    key: "getCharacterLimitMessages",
    value: function getCharacterLimitMessages(e, t) {
      var r;
      if (t === -1) return e;
      var n = 0,
        s = e.length - 1;
      for (s; s >= 0; s -= 1) {
        var o = (r = e[s]) == null ? void 0 : r[h];
        if (o !== void 0 && (n += o.length, n > t)) {
          e[s][h] = o.substring(0, o.length - (n - t));
          break;
        }
      }
      return e.slice(Math.max(s, 0));
    }
  }, {
    key: "getMaxMessages",
    value: function getMaxMessages(e, t) {
      return e.slice(Math.max(e.length - t, 0));
    }
    // if maxMessages is not defined we send all messages
    // if maxMessages above 0 we send that number
    // if maxMessages 0 or below we send only what is in the request
  }, {
    key: "processMessages",
    value: function processMessages(e, t, n) {
      return t !== void 0 ? t > 0 && (e = an.getMaxMessages(e, t)) : e = [e[e.length - 1]], e = JSON.parse(JSON.stringify(e)), n === void 0 ? e : an.getCharacterLimitMessages(e, n);
    }
  }]);
}();
var St = /*#__PURE__*/function () {
  function St(e, t, n) {
    _classCallCheck(this, St);
    this._isLoading = !1, this._isPaginationComplete = !1, this._index = 0, this._messages = t, n.fetchHistory && this.fetchHistory(n.fetchHistory), e.loadHistory && this.setupLoadHistoryOnScroll(e.loadHistory), this.setupInitialHistory(e);
  }
  return _createClass(St, [{
    key: "fetchHistory",
    value: function () {
      var _fetchHistory = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee22(e) {
        var _this1 = this;
        var t, n;
        return _regenerator().w(function (_context22) {
          while (1) switch (_context22.n) {
            case 0:
              t = yt.addMessage(this._messages);
              _context22.n = 1;
              return e();
            case 1:
              n = _context22.v;
              this._messages.removeMessage(t), St.displayIntroMessages(this._messages.messageElementRefs), n.forEach(function (s) {
                return _this1._messages.addAnyMessage(s, !0);
              }), setTimeout(function () {
                return X.scrollToBottom(_this1._messages.elementRef);
              }, 0);
            case 2:
              return _context22.a(2);
          }
        }, _callee22, this);
      }));
      function fetchHistory(_x49) {
        return _fetchHistory.apply(this, arguments);
      }
      return fetchHistory;
    }()
  }, {
    key: "processLoadedHistory",
    value: function processLoadedHistory(e) {
      var _this10 = this;
      var a;
      var _this$_messages = this._messages,
        t = _this$_messages.messageElementRefs,
        n = _this$_messages.messageToElements,
        s = _this$_messages.elementRef,
        r = (a = t.find(function (c) {
          return !c.outerContainer[m].contains($e.INTRO_CLASS);
        })) == null ? void 0 : a.outerContainer,
        o = s.scrollTop;
      e == null || e.reverse().map(function (c) {
        var l = _this10._messages.addAnyMessage(_objectSpread(_objectSpread({}, c), {}, {
          sendUpdate: !0
        }), !0, !0);
        if (l) {
          var d = I.generateMessageBody(l, t, !0);
          n.unshift([l, d]);
        }
        return l;
      }).filter(function (c) {
        return !!c;
      }).reverse().forEach(function (c) {
        return _this10._messages.sendClientUpdate(c, !0);
      }), r && (s.scrollTop = o + r.offsetTop - 40);
    }
  }, {
    key: "populateMessages",
    value: function populateMessages(e, t) {
      this._messages.removeMessage(e), this._isPaginationComplete = t.findIndex(function (a) {
        return !a;
      }) < 0;
      var n = t.filter(function (a) {
        return !!a;
      });
      this.processLoadedHistory(n);
      var _this$_messages2 = this._messages,
        s = _this$_messages2.messageElementRefs,
        r = _this$_messages2.avatar,
        o = _this$_messages2.name;
      I.resetAllRoleElements(s, r, o);
    }
  }, {
    key: "setupLoadHistoryOnScroll",
    value: function () {
      var _setupLoadHistoryOnScroll = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee24(e) {
        var _this11 = this;
        return _regenerator().w(function (_context24) {
          while (1) switch (_context24.n) {
            case 0:
              this._messages.elementRef.onscroll = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee23() {
                var t, n, _t12;
                return _regenerator().w(function (_context23) {
                  while (1) switch (_context23.p = _context23.n) {
                    case 0:
                      if (!(!_this11._isLoading && !_this11._isPaginationComplete && _this11._messages.elementRef.scrollTop === 0)) {
                        _context23.n = 4;
                        break;
                      }
                      _this11._isLoading = !0;
                      t = yt.addMessage(_this11._messages, !1);
                      _context23.p = 1;
                      _context23.n = 2;
                      return e(_this11._index++);
                    case 2:
                      n = _context23.v;
                      _this11.populateMessages(t, n), _this11._isLoading = !1;
                      _context23.n = 4;
                      break;
                    case 3:
                      _context23.p = 3;
                      _t12 = _context23.v;
                      _this11._messages.removeMessage(t), _this11._isPaginationComplete = !0, _this11._messages.addNewErrorMessage(Z, St.FAILED_ERROR_MESSAGE, !0), console[f](_t12);
                    case 4:
                      return _context23.a(2);
                  }
                }, _callee23, null, [[1, 3]]);
              }));
            case 1:
              return _context24.a(2);
          }
        }, _callee24, this);
      }));
      function setupLoadHistoryOnScroll(_x50) {
        return _setupLoadHistoryOnScroll.apply(this, arguments);
      }
      return setupLoadHistoryOnScroll;
    }()
  }, {
    key: "populateInitialHistory",
    value: function populateInitialHistory(e) {
      var _this12 = this;
      e.forEach(function (t) {
        me.processHistoryFile(t), _this12._messages.addAnyMessage(t, !0);
      });
    }
  }, {
    key: "loadInitialHistory",
    value: function () {
      var _loadInitialHistory = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee25(e) {
        var _this13 = this;
        var t, n, s, _t13;
        return _regenerator().w(function (_context25) {
          while (1) switch (_context25.p = _context25.n) {
            case 0:
              this._isLoading = !0;
              t = yt.addMessage(this._messages);
              _context25.p = 1;
              _context25.n = 2;
              return e(this._index++);
            case 2:
              n = _context25.v;
              s = this._messages.elementRef.scrollTop;
              this.populateMessages(t, n), s === 0 && setTimeout(function () {
                return X.scrollToBottom(_this13._messages.elementRef);
              }, 0);
              _context25.n = 4;
              break;
            case 3:
              _context25.p = 3;
              _t13 = _context25.v;
              this._messages.removeMessage(t), this._isPaginationComplete = !0, this._messages.addNewErrorMessage(Z, St.FAILED_ERROR_MESSAGE, !0), console[f](_t13);
            case 4:
              St.displayIntroMessages(this._messages.messageElementRefs), this._isLoading = !1;
            case 5:
              return _context25.a(2);
          }
        }, _callee25, this, [[1, 3]]);
      }));
      function loadInitialHistory(_x51) {
        return _loadInitialHistory.apply(this, arguments);
      }
      return loadInitialHistory;
    }()
  }, {
    key: "setupInitialHistory",
    value: function () {
      var _setupInitialHistory = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee26(e) {
        var n, t;
        return _regenerator().w(function (_context26) {
          while (1) switch (_context26.n) {
            case 0:
              e.loadHistory && this.loadInitialHistory(e.loadHistory);
              t = e.history || me.processHistory(e) || ((n = this._messages.browserStorage) == null ? void 0 : n.get());
              t && (this.populateInitialHistory(t), this._index += 1);
            case 1:
              return _context26.a(2);
          }
        }, _callee26, this);
      }));
      function setupInitialHistory(_x52) {
        return _setupInitialHistory.apply(this, arguments);
      }
      return setupInitialHistory;
    }()
  }], [{
    key: "addErrorPrefix",
    value: function addErrorPrefix(e) {
      var _e$permittedErrorPref;
      (_e$permittedErrorPref = e.permittedErrorPrefixes) !== null && _e$permittedErrorPref !== void 0 ? _e$permittedErrorPref : e.permittedErrorPrefixes = [], e.permittedErrorPrefixes.push(St.FAILED_ERROR_MESSAGE);
    }
  }, {
    key: "displayIntroMessages",
    value: function displayIntroMessages(e) {
      for (var t = 0; t < e.length; t += 1) {
        var n = e[0];
        if (n.outerContainer[m].contains($e.INTRO_CLASS)) n.outerContainer[_].display = "";else break;
      }
    }
  }]);
}();
St.FAILED_ERROR_MESSAGE = "Failed to load history";
var ts = St;
var de = /*#__PURE__*/function () {
  function de() {
    _classCallCheck(this, de);
  }
  return _createClass(de, null, [{
    key: "parseConfig",
    value:
    // prettier-ignore
    function parseConfig(e, t, n, s) {
      var o;
      var r = {
        files: t
      };
      if (_typeof(s) == "object") {
        me.processFileConfigConnect(s);
        var a = s.files,
          c = s.connect,
          l = s.button;
        a && (a.infoModal && (r[y].infoModal = a.infoModal, (o = a.infoModal) != null && o.textMarkDown && (r.infoModalTextMarkUp = n.render(a.infoModal.textMarkDown))), a.acceptedFormats && (r[y].acceptedFormats = a.acceptedFormats), a.maxNumberOfFiles && (r[y].maxNumberOfFiles = a.maxNumberOfFiles)), r.button = l, c && (c.headers || c.method || c.url || c.credentials || e.headers || e.method || e.url || e.credentials) && (r.connect = {
          url: (c == null ? void 0 : c.url) || e.url,
          method: (c == null ? void 0 : c.method) || e.method,
          headers: (c == null ? void 0 : c.headers) || e.headers,
          credentials: (c == null ? void 0 : c.credentials) || e.credentials
        });
      }
      return r;
    }
  }, {
    key: "processMixedFiles",
    value: function processMixedFiles(e, t, n) {
      if (n) {
        var s = {
          acceptedFormats: ""
        };
        e.fileTypes.mixedFiles = de.parseConfig(e.connectSettings, s, t, n);
      }
    }
    // needs to be set after audio to overwrite maxNumberOfFiles
    // prettier-ignore
  }, {
    key: "processMicrophone",
    value: function processMicrophone(e, t, n, s) {
      var _c$y, _u$maxNumberOfFiles;
      var a, c, l, d, p, u;
      var o = _objectSpread({
        acceptedFormats: "audio/*"
      }, ((a = e.fileTypes[P]) == null ? void 0 : a[y]) || {});
      n && (navigator.mediaDevices.getUserMedia !== void 0 ? (e.recordAudio = de.parseConfig(e.connectSettings, o, t, n), _typeof(n) == "object" && n[y] && ((_c$y = (c = e.recordAudio)[y]) !== null && _c$y !== void 0 ? _c$y : c[y] = {}, e.recordAudio[y].format = (l = n[y]) == null ? void 0 : l.format, e.recordAudio[y].maxDurationSeconds = (d = n[y]) == null ? void 0 : d.maxDurationSeconds, (p = e.fileTypes[P]) != null && p[y] && ((_u$maxNumberOfFiles = (u = e.fileTypes[P][y]).maxNumberOfFiles) !== null && _u$maxNumberOfFiles !== void 0 ? _u$maxNumberOfFiles : u.maxNumberOfFiles = n[y].maxNumberOfFiles))) : s || (e.fileTypes[P] = de.parseConfig(e.connectSettings, o, t, n)));
    }
    // prettier-ignore
  }, {
    key: "processAudioConfig",
    value: function processAudioConfig(e, t, n, s) {
      if (!n && !s) return;
      var o = _objectSpread({
        acceptedFormats: "audio/*"
      }, (s == null ? void 0 : s[y]) || {});
      e.fileTypes[P] = de.parseConfig(e.connectSettings, o, t, n);
    }
    // prettier-ignore
  }, {
    key: "processGifConfig",
    value: function processGifConfig(e, t, n, s) {
      if (!n && !s) return;
      var o = _objectSpread({
        acceptedFormats: "image/gif"
      }, (s == null ? void 0 : s[y]) || {});
      e.fileTypes[sn] = de.parseConfig(e.connectSettings, o, t, n);
    }
    // needs to be set after images to overwrite maxNumberOfFiles
    // prettier-ignore
  }, {
    key: "processCamera",
    value: function processCamera(e, t, n, s) {
      var _c$y2;
      var a, c, l, d;
      var o = _objectSpread({
        acceptedFormats: "image/*"
      }, ((a = e.fileTypes[z]) == null ? void 0 : a[y]) || {});
      n && (navigator.mediaDevices.getUserMedia !== void 0 ? (e[Re] = de.parseConfig(e.connectSettings, o, t, n), _typeof(n) == "object" && (e[Re].modalContainerStyle = n.modalContainerStyle, n[y] && ((_c$y2 = (c = e[Re])[y]) !== null && _c$y2 !== void 0 ? _c$y2 : c[y] = {}, e[Re][y].format = (l = n[y]) == null ? void 0 : l.format, e[Re][y].dimensions = (d = n[y]) == null ? void 0 : d.dimensions))) : s || (e.fileTypes[z] = de.parseConfig(e.connectSettings, o, t, n)));
    }
    // prettier-ignore
  }, {
    key: "processImagesConfig",
    value: function processImagesConfig(e, t, n, s) {
      if (!n && !s) return;
      var o = _objectSpread({
        acceptedFormats: "image/*"
      }, (s == null ? void 0 : s[y]) || {});
      e.fileTypes[z] = de.parseConfig(e.connectSettings, o, t, n);
    }
    // default for direct service
  }, {
    key: "populateDefaultFileIO",
    value: function populateDefaultFileIO(e, t) {
      var _e$y, _n$acceptedFormats, _s$maxNumberOfFiles;
      var n, s;
      e && ((_e$y = e[y]) !== null && _e$y !== void 0 ? _e$y : e[y] = {}, (_n$acceptedFormats = (n = e[y]).acceptedFormats) !== null && _n$acceptedFormats !== void 0 ? _n$acceptedFormats : n.acceptedFormats = t, (_s$maxNumberOfFiles = (s = e[y]).maxNumberOfFiles) !== null && _s$maxNumberOfFiles !== void 0 ? _s$maxNumberOfFiles : s.maxNumberOfFiles = 1);
    }
  }, {
    key: "set",
    value: function set(e, t, n) {
      de.populateDefaultFileIO(n == null ? void 0 : n[P], ".4a,.mp3,.webm,.mp4,.mpga,.wav,.mpeg,.m4a"), de.populateDefaultFileIO(n == null ? void 0 : n[z], ".png,.jpg");
      var s = es.createNew(e.remarkable);
      de.processImagesConfig(t, s, e[z], n == null ? void 0 : n[z]), de.processCamera(t, s, e[Re], e[z]), de.processGifConfig(t, s, e[sn], n == null ? void 0 : n[sn]), de.processAudioConfig(t, s, e[P], n == null ? void 0 : n[P]), de.processMicrophone(t, s, e[Xe], e[P]), de.processMixedFiles(t, s, e[Jr]);
    }
  }]);
}();
var $t = /*#__PURE__*/function () {
  function $t(e, t, n) {
    var _a$url;
    _classCallCheck(this, $t);
    var s, r, o, a, c;
    this.rawBody = {}, this.validateKeyProperty = !1, this.canSendMessage = $t.canSendMessage, this.connectSettings = {}, this.fileTypes = {}, this.completionsHandlers = {}, this.streamHandlers = {}, this.deepChat = e, this.demo = n, Object.assign(this.rawBody, (s = e.connect) == null ? void 0 : s.additionalBodyProps), this.totalMessagesMaxCharLength = (r = e == null ? void 0 : e.requestBodyLimits) == null ? void 0 : r.totalMessagesMaxCharLength, this.maxMessages = (o = e == null ? void 0 : e.requestBodyLimits) == null ? void 0 : o.maxMessages, de.set(e, this, t), e.connect && (this.connectSettings = e.connect), this.demo && ((_a$url = (a = this.connectSettings).url) !== null && _a$url !== void 0 ? _a$url : a.url = et.URL), this.connectSettings.websocket && _e.setup(this), this.stream = ((c = this.deepChat.connect) == null ? void 0 : c.stream) || me.checkForStream(this.deepChat), e.loadHistory && ts.addErrorPrefix(this);
  }
  return _createClass($t, [{
    key: "verifyKey",
    value: function verifyKey(e, t) {}
  }, {
    key: "getServiceIOByType",
    value: function getServiceIOByType(e) {
      if (e.type.startsWith(P) && this.fileTypes[P]) return this.fileTypes[P];
      if (e.type.startsWith(j)) {
        if (this.fileTypes[sn] && e.type.endsWith("/gif")) return this.fileTypes[sn];
        if (this.fileTypes[z]) return this.fileTypes[z];
        if (this[Re]) return this[Re];
      }
      return this.fileTypes[Jr];
    }
  }, {
    key: "request",
    value: function () {
      var _request4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee27(e, t) {
        var n,
          _args27 = arguments;
        return _regenerator().w(function (_context27) {
          while (1) switch (_context27.n) {
            case 0:
              n = _args27.length > 2 && _args27[2] !== undefined ? _args27[2] : !0;
              return _context27.a(2, this.stream && !D.isSimulation(this.stream) ? D.request(this, e, t, n) : ne.request(this, e, t, n));
          }
        }, _callee27, this);
      }));
      function request(_x53, _x54) {
        return _request4.apply(this, arguments);
      }
      return request;
    }()
  }, {
    key: "callAPIWithText",
    value: function () {
      var _callAPIWithText = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee28(e, t) {
        var _o$headers, _a$B;
        var r, o, a, c, n, s;
        return _regenerator().w(function (_context28) {
          while (1) switch (_context28.n) {
            case 0:
              n = _objectSpread({
                messages: t
              }, this.rawBody);
              s = !1;
              (r = this.connectSettings.headers) != null && r[B] || ((_o$headers = (o = this.connectSettings).headers) !== null && _o$headers !== void 0 ? _o$headers : o.headers = {}, (_a$B = (a = this.connectSettings.headers)[B]) !== null && _a$B !== void 0 ? _a$B : a[B] = V, s = !0);
              _context28.n = 1;
              return this.request(n, e);
            case 1:
              s && ((c = this.connectSettings.headers) == null || delete c[B]);
            case 2:
              return _context28.a(2);
          }
        }, _callee28, this);
      }));
      function callAPIWithText(_x55, _x56) {
        return _callAPIWithText.apply(this, arguments);
      }
      return callAPIWithText;
    }()
  }, {
    key: "callApiWithFiles",
    value: function () {
      var _callApiWithFiles = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee29(e, t, n) {
        var s, r, o;
        return _regenerator().w(function (_context29) {
          while (1) switch (_context29.n) {
            case 0:
              s = $t.createCustomFormDataBody(this.rawBody, t, n), r = this.connectSettings, o = this.getServiceIOByType(n[0]);
              this.connectSettings = (o == null ? void 0 : o.connect) || this.connectSettings;
              _context29.n = 1;
              return this.request(s, e, !1);
            case 1:
              this.connectSettings = r;
            case 2:
              return _context29.a(2);
          }
        }, _callee29, this);
      }));
      function callApiWithFiles(_x57, _x58, _x59) {
        return _callApiWithFiles.apply(this, arguments);
      }
      return callApiWithFiles;
    }()
  }, {
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee30(e, t, n) {
        return _regenerator().w(function (_context30) {
          while (1) switch (_context30.n) {
            case 0:
              n ? this.callApiWithFiles(e, t, n) : this.callAPIWithText(e, t);
            case 1:
              return _context30.a(2);
          }
        }, _callee30, this);
      }));
      function callServiceAPI(_x60, _x61, _x62) {
        return _callServiceAPI.apply(this, arguments);
      }
      return callServiceAPI;
    }() // prettier-ignore
  }, {
    key: "callAPI",
    value: function () {
      var _callAPI = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee31(e, t) {
        var s, n, r;
        return _regenerator().w(function (_context31) {
          while (1) switch (_context31.n) {
            case 0:
              if (this.connectSettings) {
                _context31.n = 1;
                break;
              }
              throw new Error(Ie);
            case 1:
              n = an.processMessages(t.messageToElements.map(function (_ref21) {
                var _ref22 = _slicedToArray(_ref21, 1),
                  r = _ref22[0];
                return r;
              }), this.maxMessages, this.totalMessagesMaxCharLength);
              if (this.connectSettings.websocket && (!this.connectSettings.handler || this.connectSettings.url !== et.URL)) {
                r = _objectSpread({
                  messages: n
                }, this.rawBody);
                e[y] && (s = this.getServiceIOByType(e[y][0])) != null && s.connect ? this.callApiWithFiles(t, n, e[y]) : _e.sendWebsocket(this, r, t, !1);
              } else this.callServiceAPI(t, n, e[y]);
            case 2:
              return _context31.a(2);
          }
        }, _callee31, this);
      }));
      function callAPI(_x63, _x64) {
        return _callAPI.apply(this, arguments);
      }
      return callAPI;
    }()
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee32(e) {
        return _regenerator().w(function (_context32) {
          while (1) switch (_context32.n) {
            case 0:
              if (!e.result) {
                _context32.n = 1;
                break;
              }
              return _context32.a(2, me.handleResponseProperty(e));
            case 1:
              if (!M.validateResponseFormat(e, !!this.stream)) {
                _context32.n = 2;
                break;
              }
              return _context32.a(2, e);
            case 2:
              return _context32.a(2);
          }
        }, _callee32, this);
      }));
      function extractResultData(_x65) {
        return _extractResultData.apply(this, arguments);
      }
      return extractResultData;
    }()
  }, {
    key: "isDirectConnection",
    value: function isDirectConnection() {
      return !1;
    }
  }, {
    key: "isWebModel",
    value: function isWebModel() {
      return !1;
    }
  }, {
    key: "isCustomView",
    value: function isCustomView() {
      return !1;
    }
  }], [{
    key: "canSendMessage",
    value: function canSendMessage(e, t, n) {
      return n ? !0 : !!(e && e.trim() !== "") || !!(t && t.length > 0);
    }
  }, {
    key: "createCustomFormDataBody",
    value: function createCustomFormDataBody(e, t, n) {
      var s = new FormData();
      n.forEach(function (a) {
        return s.append("files", a);
      }), Object.keys(e).forEach(function (a) {
        return s.append(a, String(e[a]));
      });
      var r = 0;
      t.slice(0, t.length - 1).forEach(function (a) {
        s.append("message".concat(r += 1), JSON.stringify(a));
      });
      var o = t[t.length - 1];
      return o[h] && (delete o[y], s.append("message".concat(r += 1), JSON.stringify(o))), s;
    }
  }]);
}();
var T = /*#__PURE__*/function (_$t) {
  // prettier-ignore
  function T(e, t, n, s, r) {
    var _this14;
    _classCallCheck(this, T);
    var o;
    _this14 = _callSuper(this, T, [e, r]), _this14.insertKeyPlaceholderText = "API Key", _this14.keyHelpUrl = "", _this14.asyncCallInProgress = !1, _this14.systemMessage = "", Object.assign(_this14.rawBody, (o = e.connect) == null ? void 0 : o.additionalBodyProps), _this14._keyVerificationDetails = t, _this14._buildHeadersFunc = n, s && _this14.setApiKeyProperties(s), _this14.connectSettings = _this14.buildConnectSettings(_this14.key || "", e.connect);
    return _this14;
  }
  _inherits(T, _$t);
  return _createClass(T, [{
    key: "setApiKeyProperties",
    value: function setApiKeyProperties(e) {
      this.key = e.key, e.validateKeyProperty && (this.validateKeyProperty = e.validateKeyProperty);
    }
  }, {
    key: "buildConnectSettings",
    value: function buildConnectSettings(e, t) {
      var _n$headers;
      var n = t !== null && t !== void 0 ? t : {};
      return (_n$headers = n.headers) !== null && _n$headers !== void 0 ? _n$headers : n.headers = {}, Object.assign(n.headers, this._buildHeadersFunc(e)), n;
    }
  }, {
    key: "completeConfig",
    value: function completeConfig(e, t) {
      e.system_prompt && (this.systemMessage = e.system_prompt), t && (this.functionHandler = t), delete e.system_prompt, delete e.key, delete e.function_handler, Object.assign(this.rawBody, e);
    }
  }, {
    key: "keyAuthenticated",
    value: function keyAuthenticated(e, t) {
      this.connectSettings = this.buildConnectSettings(t, this.connectSettings), this.key = t, e();
    }
    // prettier-ignore
  }, {
    key: "verifyKey",
    value: function verifyKey(e, t) {
      var _this$_keyVerificatio = this._keyVerificationDetails,
        n = _this$_keyVerificatio.url,
        s = _this$_keyVerificatio.method,
        r = _this$_keyVerificatio.handleVerificationResult,
        o = _this$_keyVerificatio.createHeaders,
        a = _this$_keyVerificatio.body,
        c = _this$_keyVerificatio.augmentUrl,
        l = (o == null ? void 0 : o(e)) || this._buildHeadersFunc(e),
        d = (c == null ? void 0 : c(e)) || n;
      ne.verifyKey(e, d, l, s, this.keyAuthenticated.bind(this, t.onSuccess), t.onFail, t.onLoad, r, a);
    }
  }, {
    key: "isDirectConnection",
    value: function isDirectConnection() {
      return !0;
    }
  }, {
    key: "processMessages",
    value: function processMessages(e) {
      return an.getCharacterLimitMessages(e, this.totalMessagesMaxCharLength ? this.totalMessagesMaxCharLength - this.systemMessage.length : -1);
    }
  }, {
    key: "addSystemMessage",
    value: function addSystemMessage(e) {
      this.systemMessage && e.unshift({
        role: "system",
        content: this.systemMessage
      });
    }
  }, {
    key: "callDirectServiceServiceAPI",
    value: function () {
      var _callDirectServiceServiceAPI = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee33(e, t, n, s, r) {
        var o, a;
        return _regenerator().w(function (_context33) {
          while (1) switch (_context33.n) {
            case 0:
              if (this.connectSettings) {
                _context33.n = 1;
                break;
              }
              throw new Error(Ie);
            case 1:
              o = n(this.rawBody, t), a = s ? this.stream : !1;
              if (!(a && (_typeof(a) !== L || !a.simulation) || o.stream)) {
                _context33.n = 2;
                break;
              }
              o.stream = !0, s != null && s.readable && (this.stream = {
                readable: !0
              }), D.request(this, o, e);
              _context33.n = 4;
              break;
            case 2:
              _context33.n = 3;
              return ne.request(this, o, e, r);
            case 3:
              return _context33.a(2, _context33.v);
            case 4:
              return _context33.a(2);
          }
        }, _callee33, this);
      }));
      function callDirectServiceServiceAPI(_x66, _x67, _x68, _x69, _x70) {
        return _callDirectServiceServiceAPI.apply(this, arguments);
      }
      return callDirectServiceServiceAPI;
    }()
  }, {
    key: "callToolFunction",
    value: function () {
      var _callToolFunction = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee34(e, t) {
        var r, o, n, a, c, _t14, _t15;
        return _regenerator().w(function (_context34) {
          while (1) switch (_context34.n) {
            case 0:
              this.asyncCallInProgress = !0;
              _context34.n = 1;
              return e(t);
            case 1:
              n = _context34.v;
              if (Array.isArray(n)) {
                _context34.n = 6;
                break;
              }
              if (!n[h]) {
                _context34.n = 5;
                break;
              }
              a = _defineProperty({}, h, n[h]);
              _context34.n = 2;
              return (o = (r = this.deepChat).responseInterceptor) == null ? void 0 : o.call(r, a);
            case 2:
              _t14 = _context34.v;
              if (_t14) {
                _context34.n = 3;
                break;
              }
              _t14 = a;
            case 3:
              c = _t14;
              if (!Array.isArray(c)) {
                _context34.n = 4;
                break;
              }
              throw Error("Function tool response interceptor cannot return an array");
            case 4:
              return _context34.a(2, {
                processedResponse: c
              });
            case 5:
              throw Error(Zn);
            case 6:
              _context34.n = 7;
              return Promise.all(n);
            case 7:
              _t15 = _context34.v;
              return _context34.a(2, {
                responses: _t15
              });
          }
        }, _callee34, this);
      }));
      function callToolFunction(_x71, _x72) {
        return _callToolFunction.apply(this, arguments);
      }
      return callToolFunction;
    }()
  }, {
    key: "makeAnotherRequest",
    value: function makeAnotherRequest(e, t) {
      try {
        return t && (this.stream ? D.request(this, e, t) : ne.request(this, e, t)), _defineProperty({}, h, "");
      } catch (n) {
        throw this.asyncCallInProgress = !1, n;
      }
    }
  }, {
    key: "genereteAPIKeyName",
    value: function genereteAPIKeyName(e) {
      return "".concat(e, " API Key");
    }
  }, {
    key: "extractStreamResultWToolsGeneric",
    value: function () {
      var _extractStreamResultWToolsGeneric = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee35(e, t, n, s, r) {
        var o, a, c;
        return _regenerator().w(function (_context35) {
          while (1) switch (_context35.n) {
            case 0:
              o = t.delta, a = t.finish_reason;
              if (!(a === "tool_calls")) {
                _context35.n = 1;
                break;
              }
              c = {
                tool_calls: e._streamToolCalls
              };
              return _context35.a(2, (e._streamToolCalls = void 0, this.handleToolsGeneric(c, n, e.messages, s, r)));
            case 1:
              o != null && o.tool_calls && (e._streamToolCalls ? o.tool_calls.forEach(function (c, l) {
                e._streamToolCalls && (e._streamToolCalls[l]["function"].arguments += c["function"].arguments);
              }) : e._streamToolCalls = o.tool_calls);
            case 2:
              return _context35.a(2, _defineProperty({}, h, (o == null ? void 0 : o.content) || ""));
          }
        }, _callee35, this);
      }));
      function extractStreamResultWToolsGeneric(_x73, _x74, _x75, _x76, _x77) {
        return _extractStreamResultWToolsGeneric.apply(this, arguments);
      }
      return extractStreamResultWToolsGeneric;
    }()
  }, {
    key: "handleToolsGeneric",
    value: function () {
      var _handleToolsGeneric = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee36(e, t, n, s, r) {
        var o, a, _yield$this$callToolF, c, l;
        return _regenerator().w(function (_context36) {
          while (1) switch (_context36.n) {
            case 0:
              if (!(!e.tool_calls || !s || !t)) {
                _context36.n = 1;
                break;
              }
              throw Error(dn);
            case 1:
              o = JSON.parse(JSON.stringify(s));
              a = e.tool_calls.map(function (d) {
                return {
                  name: d["function"].name,
                  arguments: d["function"].arguments
                };
              });
              _context36.n = 2;
              return this.callToolFunction(t, a);
            case 2:
              _yield$this$callToolF = _context36.v;
              c = _yield$this$callToolF.responses;
              l = _yield$this$callToolF.processedResponse;
              if (!l) {
                _context36.n = 3;
                break;
              }
              return _context36.a(2, l);
            case 3:
              if (!(r && (o.messages = o.messages.slice(o.messages.length - 1), r.message && o.messages.unshift({
                role: "system",
                content: r.message
              })), o.messages.push({
                tool_calls: e.tool_calls,
                role: gt,
                content: null
              }), !c.find(function (_ref25) {
                var d = _ref25.response;
                return typeof d != "string";
              }) && a.length === c.length)) {
                _context36.n = 4;
                break;
              }
              return _context36.a(2, (c.forEach(function (d, p) {
                var g;
                var u = (g = e.tool_calls) == null ? void 0 : g[p];
                o == null || o.messages.push({
                  role: "tool",
                  tool_call_id: u == null ? void 0 : u.id,
                  name: u == null ? void 0 : u["function"].name,
                  content: d.response
                });
              }), this.makeAnotherRequest(o, n)));
            case 4:
              throw Error(Zn);
            case 5:
              return _context36.a(2);
          }
        }, _callee36, this);
      }));
      function handleToolsGeneric(_x78, _x79, _x80, _x81, _x82) {
        return _handleToolsGeneric.apply(this, arguments);
      }
      return handleToolsGeneric;
    }()
  }], [{
    key: "getRoleViaUser",
    value: function getRoleViaUser(e) {
      return e === U ? U : gt;
    }
  }, {
    key: "getRoleViaAI",
    value: function getRoleViaAI(e) {
      return e === W ? gt : U;
    }
  }, {
    key: "getImageContent",
    value: function getImageContent(e) {
      return e.filter(function (t) {
        return t.type === j;
      }).map(function (t) {
        return _defineProperty(_defineProperty({}, C, "image_url"), "image_url", {
          url: t.src || ""
        });
      }).filter(function (t) {
        return t.image_url.url.length > 0;
      });
    }
  }, {
    key: "getTextWImagesContent",
    value: function getTextWImagesContent(e) {
      if (e[y] && e[y].length > 0) {
        var t = this.getImageContent(e[y]);
        return e[h] && e[h].trim().length > 0 && t.unshift(_defineProperty(_defineProperty({}, C, h), h, e[h])), t.length > 0 ? t : e[h] || "";
      }
      return e[h] || "";
    }
  }, {
    key: "getTextWFilesContent",
    value: function getTextWFilesContent(e, t) {
      if (e[y] && e[y].length > 0) {
        var n = t(e[y]);
        return e[h] && e[h].trim().length > 0 && n.unshift(_defineProperty(_defineProperty({}, C, h), h, e[h])), n;
      }
      return e[h] || "";
    }
  }]);
}($t);
var Ss = /*#__PURE__*/function () {
  function Ss() {
    _classCallCheck(this, Ss);
  }
  return _createClass(Ss, null, [{
    key: "waitForPropertiesToBeUpdatedBeforeRender",
    value: function waitForPropertiesToBeUpdatedBeforeRender(e) {
      e._propUpdated_ = !1, setTimeout(function () {
        e._propUpdated_ ? Ss.waitForPropertiesToBeUpdatedBeforeRender(e) : (e._waitingToRender_ = !1, e.onRender());
      });
    }
  }, {
    key: "attemptRender",
    value: function attemptRender(e) {
      e._propUpdated_ = !0, e._waitingToRender_ || (e._waitingToRender_ = !0, Ss.waitForPropertiesToBeUpdatedBeforeRender(e));
    }
  }]);
}();
var dt = /*#__PURE__*/function (_HTMLElement) {
  // If this is not working, try using propertyName directly
  function dt() {
    var _this15;
    _classCallCheck(this, dt);
    _this15 = _callSuper(this, dt), _this15._waitingToRender_ = !1, _this15._propUpdated_ = !1, Object.keys(dt._attributeToProperty_).forEach(function (e) {
      var t = dt._attributeToProperty_[e];
      _this15.constructPropertyAccessors(t), _this15.hasOwnProperty(e) || _this15.constructPropertyAccessors(t, e);
    });
    return _this15;
  }
  _inherits(dt, _HTMLElement);
  return _createClass(dt, [{
    key: "constructPropertyAccessors",
    value:
    // need to be called here as accessors need to be set for the class instance
    function constructPropertyAccessors(e, t) {
      var n;
      Object.defineProperty(this, t || e, {
        get: function get() {
          return n;
        },
        set: function set(o) {
          n = o, t ? this[e] = o : Ss.attemptRender(this);
        }
      });
    }
  }, {
    key: "attributeChangedCallback",
    value: function attributeChangedCallback(e, t, n) {
      if (t === n) return;
      var s = dt._attributes_[e](n),
        r = dt._attributeToProperty_[e];
      this[r] = s;
    }
  }, {
    key: "onRender",
    value: function onRender() {}
  }], [{
    key: "observedAttributes",
    get: function get() {
      return Object.keys(dt._attributes_) || [];
    }
  }]);
}(/*#__PURE__*/_wrapNativeSuper(HTMLElement));
dt._attributes_ = {}, dt._attributeToProperty_ = {};
var hi = dt;
var Pc = "<?xml version=\"1.0\" standalone=\"no\"?>\n<svg version=\"1.1\"\n\txmlns:sodipodi=\"http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd\" xmlns:inkscape=\"http://www.inkscape.org/namespaces/inkscape\"\n\txmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"0.9em\" height=\"0.9em\"\n\tviewBox=\"0 0 1200 1200\" enable-background=\"new 0 0 1200 1200\">\n\t\t<path d=\"\n\t\t\tM669.727,273.516c-22.891-2.476-46.15-3.895-69.727-4.248c-103.025,0.457-209.823,25.517-310.913,73.536\n\t\t\tc-75.058,37.122-148.173,89.529-211.67,154.174C46.232,529.978,6.431,577.76,0,628.74c0.76,44.162,48.153,98.67,77.417,131.764\n\t\t\tc59.543,62.106,130.754,113.013,211.67,154.174c2.75,1.335,5.51,2.654,8.276,3.955l-75.072,131.102l102.005,60.286l551.416-960.033\n\t\t\tl-98.186-60.008L669.727,273.516z M902.563,338.995l-74.927,129.857c34.47,44.782,54.932,100.006,54.932,159.888\n\t\t\tc0,149.257-126.522,270.264-282.642,270.264c-6.749,0-13.29-0.728-19.922-1.172l-49.585,85.84c22.868,2.449,45.99,4.233,69.58,4.541\n\t\t\tc103.123-0.463,209.861-25.812,310.84-73.535c75.058-37.122,148.246-89.529,211.743-154.174\n\t\t\tc31.186-32.999,70.985-80.782,77.417-131.764c-0.76-44.161-48.153-98.669-77.417-131.763\n\t\t\tc-59.543-62.106-130.827-113.013-211.743-154.175C908.108,341.478,905.312,340.287,902.563,338.995L902.563,338.995z\n\t\t\tM599.927,358.478c6.846,0,13.638,0.274,20.361,0.732l-58.081,100.561c-81.514,16.526-142.676,85.88-142.676,168.897\n\t\t\tc0,20.854,3.841,40.819,10.913,59.325c0.008,0.021-0.008,0.053,0,0.074l-58.228,100.854\n\t\t\tc-34.551-44.823-54.932-100.229-54.932-160.182C317.285,479.484,443.808,358.477,599.927,358.478L599.927,358.478z M768.896,570.513\n\t\t\tL638.013,797.271c81.076-16.837,141.797-85.875,141.797-168.603C779.81,608.194,775.724,588.729,768.896,570.513L768.896,570.513z\"\n\t\t\t/>\n</svg>\n",
  Lc = "<?xml version=\"1.0\" standalone=\"no\"?>\n<svg version=\"1.1\"\n\txmlns:sodipodi=\"http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd\" xmlns:inkscape=\"http://www.inkscape.org/namespaces/inkscape\"\n\txmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"0.9em\" height=\"0.9em\"\n\tviewBox=\"0 0 1200 1200\" enable-background=\"new 0 0 1200 1200\">\n\t\t<path id=\"path6686\" inkscape:connector-curvature=\"0\" d=\"M779.843,599.925c0,95.331-80.664,172.612-180.169,172.612\n\t\t\tc-99.504,0-180.168-77.281-180.168-172.612c0-95.332,80.664-172.612,180.168-172.612\n\t\t\tC699.179,427.312,779.843,504.594,779.843,599.925z M600,240.521c-103.025,0.457-209.814,25.538-310.904,73.557\n\t\t\tc-75.058,37.122-148.206,89.496-211.702,154.141C46.208,501.218,6.431,549,0,599.981c0.76,44.161,48.13,98.669,77.394,131.763\n\t\t\tc59.543,62.106,130.786,113.018,211.702,154.179c94.271,45.751,198.616,72.092,310.904,73.557\n\t\t\tc103.123-0.464,209.888-25.834,310.866-73.557c75.058-37.122,148.243-89.534,211.74-154.179\n\t\t\tc31.185-32.999,70.962-80.782,77.394-131.763c-0.76-44.161-48.13-98.671-77.394-131.764\n\t\t\tc-59.543-62.106-130.824-112.979-211.74-154.141C816.644,268.36,712.042,242.2,600,240.521z M599.924,329.769\n\t\t\tc156.119,0,282.675,120.994,282.675,270.251c0,149.256-126.556,270.25-282.675,270.25S317.249,749.275,317.249,600.02\n\t\t\tC317.249,450.763,443.805,329.769,599.924,329.769L599.924,329.769z\"/>\n</svg>\n";
var bt = /*#__PURE__*/function () {
  function bt() {
    _classCallCheck(this, bt);
  }
  return _createClass(bt, null, [{
    key: "createSVGElement",
    value: function createSVGElement(e) {
      return new DOMParser().parseFromString(e, "image/svg+xml").documentElement;
    }
  }]);
}();
var xt = /*#__PURE__*/function () {
  function xt() {
    _classCallCheck(this, xt);
  }
  return _createClass(xt, null, [{
    key: "changeVisibility",
    value:
    // prettier-ignore
    function changeVisibility(e, t, n, s) {
      s.target.id === xt.VISIBLE_ICON_ID ? (t[_].display = "none", n[_].display = "block", e.type = "password") : (t[_].display = "block", n[_].display = "none", e.type = h);
    }
  }, {
    key: "createIconElement",
    value: function createIconElement(e, t) {
      var n = bt.createSVGElement(e);
      return n.id = t, n[m].add("visibility-icon"), n;
    }
    // prettier-ignore
  }, {
    key: "create",
    value: function create(e) {
      var t = S();
      t.id = "visibility-icon-container";
      var n = xt.createIconElement(Lc, xt.VISIBLE_ICON_ID);
      n[_].display = "none", t.appendChild(n);
      var s = xt.createIconElement(Pc, "not-visible-icon");
      return t.appendChild(s), t.onclick = xt.changeVisibility.bind(this, e, n, s), t;
    }
  }]);
}();
xt.VISIBLE_ICON_ID = "visible-icon";
var ui = xt;
var xe = /*#__PURE__*/function () {
  function xe() {
    _classCallCheck(this, xe);
  }
  return _createClass(xe, null, [{
    key: "createCautionText",
    value: function createCautionText() {
      var e = S("a");
      return e[m].add("insert-key-input-help-text"), e.innerText = "Please exercise CAUTION when inserting your API key outside of deepchat.dev or localhost!!", e;
    }
  }, {
    key: "createHelpLink",
    value: function createHelpLink(e) {
      var t = S("a");
      return t[m].add("insert-key-input-help-text"), t.href = e, t.innerText = "Find more info here", t.target = "_blank", t;
    }
  }, {
    key: "createFailText",
    value: function createFailText() {
      var e = S();
      return e.id = "insert-key-input-invalid-text", e[_].display = "none", e;
    }
  }, {
    key: "createHelpTextContainer",
    value: function createHelpTextContainer(e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !0;
      var n = S();
      n.id = "insert-key-help-text-container";
      var s = S();
      s.id = "insert-key-help-text-contents";
      var r = xe.createFailText();
      if (s.appendChild(r), e) {
        var o = xe.createHelpLink(e);
        s.appendChild(o);
      }
      if (t === !0) {
        var _o3 = xe.createCautionText();
        s.appendChild(_o3);
      }
      return n.appendChild(s), {
        helpTextContainerElement: n,
        failTextElement: r
      };
    }
  }, {
    key: "onFail",
    value: function onFail(e, t, n, s) {
      e[m].replace("insert-key-input-valid", "insert-key-input-invalid"), n.innerText = s, n[_].display = "block", t.innerText = "Start", e[m].remove("loading");
    }
  }, {
    key: "onLoad",
    value: function onLoad(e, t) {
      e[m].add("loading"), t.innerHTML = '<div id="loading-key"></div>';
    }
    // prettier-ignore
  }, {
    key: "verifyKey",
    value: function verifyKey(e, t, n) {
      var s = e.value.trim();
      n.verifyKey(s, t);
    }
    // prettier-ignore
  }, {
    key: "addVerificationEvents",
    value: function addVerificationEvents(e, t, n, s, r) {
      var o = {
          onSuccess: s,
          onFail: xe.onFail.bind(this, e, t, n),
          onLoad: xe.onLoad.bind(this, e, t)
        },
        a = xe.verifyKey.bind(this, e, o, r);
      t.onclick = a, e.onkeydown = function (c) {
        !e[m].contains("loading") && c.key === pe.ENTER && a();
      };
    }
  }, {
    key: "createStartButton",
    value: function createStartButton() {
      var e = S();
      return e.id = "start-button", e.innerText = "Start", e;
    }
  }, {
    key: "onInputFocus",
    value: function onInputFocus(e) {
      e.target[m].replace("insert-key-input-invalid", "insert-key-input-valid");
    }
  }, {
    key: "createInput",
    value: function createInput(e) {
      var t = S();
      t.id = "insert-key-input-container";
      var n = S("input");
      return n.id = "insert-key-input", n.placeholder = e || "API Key", n.type = "password", n[m].add("insert-key-input-valid"), n.onfocus = xe.onInputFocus, t.appendChild(n), t;
    }
    // prettier-ignore
  }, {
    key: "createContents",
    value: function createContents(e, t) {
      var d;
      var n = S();
      n.id = "insert-key-contents";
      var s = xe.createInput(t.insertKeyPlaceholderText),
        r = s.children[0],
        o = ui.create(r);
      s.appendChild(o), n.appendChild(s);
      var a = xe.createStartButton(),
        _xe$createHelpTextCon = xe.createHelpTextContainer(t.keyHelpUrl, (d = t.deepChat._insertKeyViewStyles) == null ? void 0 : d.displayCautionText),
        c = _xe$createHelpTextCon.helpTextContainerElement,
        l = _xe$createHelpTextCon.failTextElement;
      return n.appendChild(a), n.appendChild(c), xe.addVerificationEvents(r, a, l, e, t), n;
    }
  }, {
    key: "createElements",
    value: function createElements(e, t) {
      var n = S();
      n.id = "insert-key-view";
      var s = xe.createContents(e, t);
      return n.appendChild(s), n;
    }
  }, {
    key: "render",
    value: function render(e, t, n) {
      var s = xe.createElements(t, n);
      e.replaceChildren(s);
    }
  }]);
}();
var Le = /*#__PURE__*/function () {
  function Le() {
    _classCallCheck(this, Le);
  }
  return _createClass(Le, null, [{
    key: "enableButtons",
    value: function enableButtons(e, t) {
      var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      window.webLLM ? (e && (e.disabled = !1), t && (t.disabled = !1)) : n < ns.MODULE_SEARCH_LIMIT_S * 4 && setTimeout(function () {
        return Le.enableButtons(e, t, n + 1);
      }, 250);
    }
    // prettier-ignore
  }, {
    key: "setUpInitial",
    value: function setUpInitial(e, t, n, s) {
      var r = (t == null ? void 0 : t.downloadClass) || Le.DOWNLOAD_BUTTON_CLASS,
        o = (t == null ? void 0 : t.uploadClass) || Le.UPLOAD_BUTTON_CLASS,
        a = (t == null ? void 0 : t.fileInputClass) || Le.FILE_INPUT_CLASS;
      return setTimeout(function () {
        var c = n == null ? void 0 : n.getElementsByClassName(r)[0],
          l = n == null ? void 0 : n.getElementsByClassName(a)[0],
          d = n == null ? void 0 : n.getElementsByClassName(o)[0];
        c && (c.onclick = function () {
          return e();
        }), l && (l.onchange = function () {
          l[y] && l[y].length > 0 && e(l[y]);
        }), d && (d.onclick = function () {
          return l[H]();
        }), (c || d) && Le.enableButtons(c, d);
      }), (t == null ? void 0 : t.initialHtml) || "<div>\n        Download or upload a web model that will run entirely on your browser: <br/> \n        <button disabled class=\"".concat(r, " deep-chat-button deep-chat-web-model-button\">Download</button>\n        ").concat(s ? "" : "<input type=\"file\" class=\"".concat(a, "\" hidden multiple />\n          <button disabled class=\"").concat(o, " deep-chat-button deep-chat-web-model-button\">Upload</button>"), "\n      </div>");
    }
  }, {
    key: "exportFile",
    value: function exportFile(e) {
      var t = S("a"),
        n = 4;
      var _loop2 = function _loop2(s) {
        setTimeout(function () {
          var r = s * n;
          for (var o = r; o < Math.min(r + n, e.length); o += 1) {
            var a = URL.createObjectURL(e[o]);
            t.href = a, t.download = e[o].name, document.body.appendChild(t), t[H](), URL.revokeObjectURL(a);
          }
        }, 500 * s);
      };
      for (var s = 0; s < e.length / n; s += 1) {
        _loop2(s);
      }
    }
    // prettier-ignore
  }, {
    key: "setUpAfterLoad",
    value: function setUpAfterLoad(e, t, n, s) {
      var r = (t == null ? void 0 : t.exportFilesClass) || Le.EXPORT_BUTTON_CLASS;
      return setTimeout(function () {
        var o = n == null ? void 0 : n.getElementsByClassName(r)[0];
        o && (o.onclick = function () {
          return Le.exportFile(e);
        });
      }), (t == null ? void 0 : t.afterLoadHtml) || "<div>\n        Model loaded successfully and has been cached for future requests.\n        ".concat(s ? "" : "<br/> <button style=\"margin-top: 5px\" class=\"".concat(r, " deep-chat-button\">Export</button>"), "\n      </div>");
    }
  }]);
}();
Le.DOWNLOAD_BUTTON_CLASS = "deep-chat-download-button", Le.UPLOAD_BUTTON_CLASS = "deep-chat-upload-button", Le.FILE_INPUT_CLASS = "deep-chat-file-input", Le.EXPORT_BUTTON_CLASS = "deep-chat-export-button";
var xs = Le;
var Sr = {
    model_list: [
    // Llama-2
    {
      model_url: "https://huggingface.co/mlc-ai/Llama-2-7b-chat-hf-q4f32_1-MLC/resolve/main/",
      local_id: "Llama-2-7b-chat-hf-q4f32_1",
      model_lib_url: "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/Llama-2-7b-chat-hf/Llama-2-7b-chat-hf-q4f32_1-ctx4k_cs1k-webgpu.wasm",
      vram_required_MB: 9109.03,
      low_resource_required: !1
    }, {
      model_url: "https://huggingface.co/mlc-ai/Llama-2-7b-chat-hf-q4f16_1-MLC/resolve/main/",
      local_id: "Llama-2-7b-chat-hf-q4f16_1",
      model_lib_url: "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/Llama-2-7b-chat-hf/Llama-2-7b-chat-hf-q4f16_1-ctx4k_cs1k-webgpu.wasm",
      vram_required_MB: 6749.02,
      low_resource_required: !1,
      required_features: ["shader-f16"]
    }, {
      model_url: "https://huggingface.co/mlc-ai/Llama-2-7b-chat-hf-q4f16_1-MLC/resolve/main/",
      local_id: "Llama-2-7b-chat-hf-q4f16_1-1k",
      model_lib_url: "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/Llama-2-7b-chat-hf/Llama-2-7b-chat-hf-q4f16_1-ctx1k-webgpu.wasm",
      vram_required_MB: 4618.52,
      low_resource_required: !1,
      required_features: ["shader-f16"]
    }, {
      model_url: "https://huggingface.co/mlc-ai/Llama-2-13b-chat-hf-q4f16_1-MLC/resolve/main/",
      local_id: "Llama-2-13b-chat-hf-q4f16_1",
      model_lib_url: "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/Llama-2-13b-chat-hf/Llama-2-13b-chat-hf-q4f16_1-ctx4k_cs1k-webgpu.wasm",
      vram_required_MB: 11814.09,
      low_resource_required: !1,
      required_features: ["shader-f16"]
    }, {
      model_url: "https://huggingface.co/mlc-ai/Llama-2-70b-chat-hf-q4f16_1-MLC/resolve/main/",
      local_id: "Llama-2-70b-chat-hf-q4f16_1",
      model_lib_url: "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/Llama-2-70b-chat-hf/Llama-2-70b-chat-hf-q4f16_1-ctx4k_cs1k-webgpu.wasm",
      vram_required_MB: 43729.05,
      low_resource_required: !1,
      required_features: ["shader-f16"]
    },
    // RedPajama
    {
      model_url: "https://huggingface.co/mlc-ai/RedPajama-INCITE-Chat-3B-v1-q4f16_1-MLC/resolve/main/",
      local_id: "RedPajama-INCITE-Chat-3B-v1-q4f16_1",
      model_lib_url: "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/RedPajama-INCITE-Chat-3B-v1/RedPajama-INCITE-Chat-3B-v1-q4f16_1-ctx2k-webgpu.wasm",
      vram_required_MB: 2972.09,
      low_resource_required: !1,
      required_features: ["shader-f16"]
    }, {
      model_url: "https://huggingface.co/mlc-ai/RedPajama-INCITE-Chat-3B-v1-q4f32_1-MLC/resolve/main/",
      local_id: "RedPajama-INCITE-Chat-3B-v1-q4f32_1",
      model_lib_url: "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/RedPajama-INCITE-Chat-3B-v1/RedPajama-INCITE-Chat-3B-v1-q4f32_1-ctx2k-webgpu.wasm",
      vram_required_MB: 3928.09,
      low_resource_required: !1
    }, {
      model_url: "https://huggingface.co/mlc-ai/RedPajama-INCITE-Chat-3B-v1-q4f16_1-MLC/resolve/main/",
      local_id: "RedPajama-INCITE-Chat-3B-v1-q4f16_1-1k",
      model_lib_url: "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/RedPajama-INCITE-Chat-3B-v1/RedPajama-INCITE-Chat-3B-v1-q4f16_1-ctx1k-webgpu.wasm",
      vram_required_MB: 2041.09,
      low_resource_required: !0,
      required_features: ["shader-f16"]
    }, {
      model_url: "https://huggingface.co/mlc-ai/RedPajama-INCITE-Chat-3B-v1-q4f32_1-MLC/resolve/main/",
      local_id: "RedPajama-INCITE-Chat-3B-v1-q4f32_1-1k",
      model_lib_url: "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/RedPajama-INCITE-Chat-3B-v1/RedPajama-INCITE-Chat-3B-v1-q4f32_1-ctx1k-webgpu.wasm",
      vram_required_MB: 2558.09,
      low_resource_required: !0
    },
    // Mistral variants
    {
      model_url: "https://huggingface.co/mlc-ai/WizardMath-7B-V1.1-q4f16_1-MLC/resolve/main/",
      local_id: "WizardMath-7B-V1.1-q4f16_1",
      model_lib_url: "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/Mistral-7B-Instruct-v0.2/Mistral-7B-Instruct-v0.2-q4f16_1-sw4k_cs1k-webgpu.wasm",
      vram_required_MB: 6079.02,
      low_resource_required: !1,
      required_features: ["shader-f16"]
    }, {
      model_url: "https://huggingface.co/mlc-ai/Mistral-7B-Instruct-v0.2-q4f16_1-MLC/resolve/main/",
      local_id: "Mistral-7B-Instruct-v0.2-q4f16_1",
      model_lib_url: "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/Mistral-7B-Instruct-v0.2/Mistral-7B-Instruct-v0.2-q4f16_1-sw4k_cs1k-webgpu.wasm",
      vram_required_MB: 6079.02,
      low_resource_required: !1,
      required_features: ["shader-f16"]
    }, {
      model_url: "https://huggingface.co/mlc-ai/OpenHermes-2.5-Mistral-7B-q4f16_1-MLC/resolve/main/",
      local_id: "OpenHermes-2.5-Mistral-7B-q4f16_1",
      model_lib_url: "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/Mistral-7B-Instruct-v0.2/Mistral-7B-Instruct-v0.2-q4f16_1-sw4k_cs1k-webgpu.wasm",
      vram_required_MB: 6079.02,
      low_resource_required: !1,
      required_features: ["shader-f16"]
    }, {
      model_url: "https://huggingface.co/mlc-ai/NeuralHermes-2.5-Mistral-7B-q4f16_1-MLC/resolve/main/",
      local_id: "NeuralHermes-2.5-Mistral-7B-q4f16_1",
      model_lib_url: "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/Mistral-7B-Instruct-v0.2/Mistral-7B-Instruct-v0.2-q4f16_1-sw4k_cs1k-webgpu.wasm",
      vram_required_MB: 6079.02,
      low_resource_required: !1,
      required_features: ["shader-f16"]
    },
    // TinyLlama
    {
      model_url: "https://huggingface.co/mlc-ai/TinyLlama-1.1B-Chat-v0.4-q0f16-MLC/resolve/main/",
      local_id: "TinyLlama-1.1B-Chat-v0.4-q0f16",
      model_lib_url: "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/TinyLlama-1.1B-Chat-v0.4/TinyLlama-1.1B-Chat-v0.4-q0f16-ctx2k-webgpu.wasm",
      vram_required_MB: 5063.52,
      low_resource_required: !1,
      required_features: ["shader-f16"]
    }, {
      model_url: "https://huggingface.co/mlc-ai/TinyLlama-1.1B-Chat-v0.4-q0f32-MLC/resolve/main/",
      local_id: "TinyLlama-1.1B-Chat-v0.4-q0f32",
      model_lib_url: "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/TinyLlama-1.1B-Chat-v0.4/TinyLlama-1.1B-Chat-v0.4-q0f32-ctx2k-webgpu.wasm",
      vram_required_MB: 5394.53,
      low_resource_required: !1
    }, {
      model_url: "https://huggingface.co/mlc-ai/TinyLlama-1.1B-Chat-v0.4-q4f16_1-MLC/resolve/main/",
      local_id: "TinyLlama-1.1B-Chat-v0.4-q4f16_1-1k",
      model_lib_url: "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/TinyLlama-1.1B-Chat-v0.4/TinyLlama-1.1B-Chat-v0.4-q4f16_1-ctx1k-webgpu.wasm",
      vram_required_MB: 899.11,
      low_resource_required: !0,
      required_features: ["shader-f16"]
    }, {
      model_url: "https://huggingface.co/mlc-ai/TinyLlama-1.1B-Chat-v0.4-q4f32_1-MLC/resolve/main/",
      local_id: "TinyLlama-1.1B-Chat-v0.4-q4f32_1-1k",
      model_lib_url: "https://raw.githubusercontent.com/mlc-ai/binary-mlc-llm-libs/main/TinyLlama-1.1B-Chat-v0.4/TinyLlama-1.1B-Chat-v0.4-q4f32_1-ctx1k-webgpu.wasm",
      vram_required_MB: 992.11,
      low_resource_required: !0
    }],
    use_web_worker: !0
  },
  $ = /*#__PURE__*/function (_$t2) {
    function $(e) {
      var _this16;
      _classCallCheck(this, $);
      var t, n;
      _this16 = _callSuper(this, $, [e]), _this16._isModelLoaded = !1, _this16._isModelLoading = !1, _this16._loadOnFirstMessage = !1, _this16._webModel = {}, _this16.permittedErrorPrefixes = [$.MULTIPLE_MODELS_ERROR, $.WEB_LLM_NOT_FOUND_ERROR, $.GENERIC_ERROR], _this16._conversationHistory = [], _typeof(e.webModel) == "object" && (_this16._webModel = e.webModel), (t = _this16._webModel.load) != null && t.clearCache && $.clearAllCache(), _this16.findModelInWindow(e), _this16.canSendMessage = _this16.canSubmit.bind(_assertThisInitialized(_this16)), _this16._chatEl = (n = e.shadowRoot) == null ? void 0 : n.children[0], e.history && $.setUpHistory(_this16._conversationHistory, e.history);
      return _this16;
    }
    // need ref of messages object as web model exhibits unique behaviour to manipulate chat
    _inherits($, _$t2);
    return _createClass($, [{
      key: "setUpMessages",
      value: function setUpMessages(e) {
        var _this17 = this;
        this._messages = e, this._removeIntro = function () {
          e.removeIntroductoryMessage(), _this17._removeIntro = void 0;
        };
      }
    }, {
      key: "findModelInWindow",
      value: function findModelInWindow(e) {
        var _this18 = this;
        var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var n;
        window.webLLM ? this.configureInit(this.shouldAddIntroMessage(e.introMessage)) : t > $.MODULE_SEARCH_LIMIT_S ? ((n = this._messages) == null || n.addNewErrorMessage(Z, $.WEB_LLM_NOT_FOUND_ERROR), console[f]("The deep-chat-web-llm module has not been attached to the window object. Please see the following guide:"), console[f]("https://deepchat.dev/examples/externalModules")) : setTimeout(function () {
          return _this18.findModelInWindow(e, t + 1);
        }, 1e3);
      }
    }, {
      key: "shouldAddIntroMessage",
      value: function shouldAddIntroMessage(e) {
        var t;
        return !e && this._webModel && ((t = this._webModel.introMessage) == null ? void 0 : t.displayed) !== !1;
      }
    }, {
      key: "scrollToTop",
      value: function scrollToTop(e) {
        var _this19 = this;
        var t;
        ((t = this._webModel.introMessage) == null ? void 0 : t.autoScroll) !== !1 && setTimeout(function () {
          var n, s;
          (n = _this19._messages) != null && n.elementRef && X.scrollToTop((s = _this19._messages) == null ? void 0 : s.elementRef);
        }, e);
      }
      // prettier-ignore
    }, {
      key: "getIntroMessage",
      value: function getIntroMessage(e) {
        if (!this.shouldAddIntroMessage(e) || !this._chatEl) return;
        var t = xs.setUpInitial(this.init.bind(this), this._webModel.introMessage, this._chatEl, !!this._webModel.worker);
        return this.scrollToTop(1), {
          role: W,
          html: t,
          sendUpdate: !1
        };
      }
    }, {
      key: "configureInit",
      value: function () {
        var _configureInit = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee37(e) {
          var t;
          return _regenerator().w(function (_context37) {
            while (1) switch (_context37.n) {
              case 0:
                t = this._webModel.load;
                if (!t) {
                  _context37.n = 2;
                  break;
                }
                if (!t.onInit) {
                  _context37.n = 1;
                  break;
                }
                this.init();
                return _context37.a(2);
              case 1:
                if (!t.onMessage) {
                  _context37.n = 2;
                  break;
                }
                this._loadOnFirstMessage = !0;
                return _context37.a(2);
              case 2:
                e || this.init();
              case 3:
                return _context37.a(2);
            }
          }, _callee37, this);
        }));
        function configureInit(_x83) {
          return _configureInit.apply(this, arguments);
        }
        return configureInit;
      }()
    }, {
      key: "init",
      value: function () {
        var _init = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee38(e) {
          var n, t, _t16;
          return _regenerator().w(function (_context38) {
            while (1) switch (_context38.n) {
              case 0:
                (n = this._messages) == null || n.removeError();
                t = this.attemptToCreateChat();
                _t16 = t;
                if (!_t16) {
                  _context38.n = 1;
                  break;
                }
                _context38.n = 1;
                return this.loadModel(t, e);
              case 1:
                return _context38.a(2);
            }
          }, _callee38, this);
        }));
        function init(_x84) {
          return _init.apply(this, arguments);
        }
        return init;
      }()
    }, {
      key: "attemptToCreateChat",
      value: function attemptToCreateChat() {
        var t;
        if ($.chat) {
          (t = this._messages) == null || t.addNewErrorMessage(Z, $.MULTIPLE_MODELS_ERROR), console[f]($.MULTIPLE_MODELS_ERROR);
          return;
        }
        if (this._isModelLoaded || this._isModelLoading) return;
        var e = this._webModel.worker;
        return Sr.use_web_worker && e ? new window.webLLM.ChatWorkerClient(e) : new window.webLLM.ChatModule();
      }
    }, {
      key: "getConfig",
      value: function getConfig() {
        var n;
        var e = $.DEFAULT_MODEL;
        this._webModel.model && (e = this._webModel.model);
        var t = JSON.parse(JSON.stringify(Sr));
        if (this._webModel.urls) {
          var s = t.model_list.find(function (r) {
            return r.local_id = e;
          });
          s && (this._webModel.urls.model && (s.model_url = this._webModel.urls.model), this._webModel.urls.wasm && (s.model_lib_url = this._webModel.urls.wasm));
        }
        return (n = this._webModel.load) != null && n.skipCache && (t.use_cache = !1), {
          model: e,
          appConfig: t
        };
      }
      // prettier-ignore
    }, {
      key: "loadModel",
      value: function () {
        var _loadModel = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee39(e, t) {
          var _this20 = this;
          var o, a, c, l, d, p, u, n, s, r, _this$getConfig, g, v, b, _g, _t17;
          return _regenerator().w(function (_context39) {
            while (1) switch (_context39.p = _context39.n) {
              case 0:
                this.scrollToTop(), $.chat = e, this._isModelLoading = !0;
                n = ((o = this._webModel.introMessage) == null ? void 0 : o.displayed) === !1;
                s = function s(g) {
                  var v;
                  (v = _this20._messages) == null || v.addNewMessage({
                    html: "<div>".concat(g[h], "</div>"),
                    overwrite: !0,
                    sendUpdate: !1
                  }), n && (setTimeout(function () {
                    var b;
                    return X.scrollToBottom((b = _this20._messages) == null ? void 0 : b.elementRef);
                  }), n = !1);
                };
                $.chat.setInitProgressCallback(s);
                _context39.p = 1;
                _this$getConfig = this.getConfig(), g = _this$getConfig.model, v = _this$getConfig.appConfig, b = {};
                this._webModel.instruction && (b.conv_config = {
                  system: this._webModel.instruction
                });
                this._conversationHistory.length > 0 && (b.conversation_history = this._conversationHistory);
                _context39.n = 2;
                return $.chat.reload(g, b, v, t);
              case 2:
                r = _context39.v;
                _context39.n = 4;
                break;
              case 3:
                _context39.p = 3;
                _t17 = _context39.v;
                return _context39.a(2, this.unloadChat(_t17));
              case 4:
                if ((c = (a = this.deepChat)._validationHandler) == null || c.call(a), (l = this._webModel.introMessage) != null && l.removeAfterLoad) this._webModel.introMessage.displayed === !1 ? (p = this._messages) == null || p.removeLastMessage() : (u = this._removeIntro) == null || u.call(this);else {
                  _g = xs.setUpAfterLoad(r, this._webModel.introMessage, this._chatEl, !!this._webModel.worker);
                  (d = this._messages) == null || d.addNewMessage({
                    html: _g,
                    overwrite: !0,
                    sendUpdate: !1
                  });
                }
                this._isModelLoaded = !0, this._isModelLoading = !1;
              case 5:
                return _context39.a(2);
            }
          }, _callee39, this, [[1, 3]]);
        }));
        function loadModel(_x85, _x86) {
          return _loadModel.apply(this, arguments);
        }
        return loadModel;
      }()
    }, {
      key: "unloadChat",
      value: function () {
        var _unloadChat = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee40(e) {
          var t, _t18;
          return _regenerator().w(function (_context40) {
            while (1) switch (_context40.n) {
              case 0:
                (t = this._messages) == null || t.addNewErrorMessage(Z, $.GENERIC_ERROR);
                console[f](e);
                this._isModelLoaded = !1;
                this._isModelLoading = !1;
                _t18 = $.chat;
                if (!_t18) {
                  _context40.n = 2;
                  break;
                }
                _context40.n = 1;
                return $.chat.unload();
              case 1:
                $.chat = void 0;
              case 2:
                return _context40.a(2);
            }
          }, _callee40, this);
        }));
        function unloadChat(_x87) {
          return _unloadChat.apply(this, arguments);
        }
        return unloadChat;
      }()
    }, {
      key: "immediateResp",
      value: function () {
        var _immediateResp = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee41(e, t, n) {
          var s, r, _t19, _t20, _t21;
          return _regenerator().w(function (_context41) {
            while (1) switch (_context41.n) {
              case 0:
                _t19 = _defineProperty;
                _t20 = {};
                _t21 = h;
                _context41.n = 1;
                return n.generate(t, void 0, 0);
              case 1:
                s = _t19(_t20, _t21, _context41.v);
                _context41.n = 2;
                return $.processResponse(this.deepChat, e, s);
              case 2:
                r = _context41.v;
                r && r.forEach(function (o) {
                  return e.addNewMessage(o);
                }), this.completionsHandlers.onFinish();
              case 3:
                return _context41.a(2);
            }
          }, _callee41, this);
        }));
        function immediateResp(_x88, _x89, _x90) {
          return _immediateResp.apply(this, arguments);
        }
        return immediateResp;
      }()
    }, {
      key: "streamResp",
      value: function () {
        var _streamResp = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee43(e, t, n) {
          var _this21 = this;
          var s;
          return _regenerator().w(function (_context43) {
            while (1) switch (_context43.n) {
              case 0:
                this.streamHandlers.onAbort = function () {
                  n.interruptGenerate();
                }, this.streamHandlers.onOpen();
                s = new Ye(e);
                _context43.n = 1;
                return n.generate(t, /*#__PURE__*/function () {
                  var _ref27 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee42(r, o) {
                    var a;
                    return _regenerator().w(function (_context42) {
                      while (1) switch (_context42.n) {
                        case 0:
                          _context42.n = 1;
                          return $.processResponse(_this21.deepChat, e, _defineProperty({}, h, o));
                        case 1:
                          a = _context42.v;
                          a && s.upsertStreamedMessage(_defineProperty(_defineProperty({}, h, a[0][h]), "overwrite", !0));
                        case 2:
                          return _context42.a(2);
                      }
                    }, _callee42);
                  }));
                  return function (_x94, _x95) {
                    return _ref27.apply(this, arguments);
                  };
                }());
              case 1:
                s.finaliseStreamedMessage();
                this.streamHandlers.onClose();
              case 2:
                return _context43.a(2);
            }
          }, _callee43, this);
        }));
        function streamResp(_x91, _x92, _x93) {
          return _streamResp.apply(this, arguments);
        }
        return streamResp;
      }()
    }, {
      key: "generateRespByType",
      value: function () {
        var _generateRespByType = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee44(e, t, n, s) {
          var r, _t22;
          return _regenerator().w(function (_context44) {
            while (1) switch (_context44.p = _context44.n) {
              case 0:
                _context44.p = 0;
                if (!n) {
                  _context44.n = 2;
                  break;
                }
                _context44.n = 1;
                return this.streamResp(e, t, s);
              case 1:
                _context44.n = 3;
                break;
              case 2:
                _context44.n = 3;
                return this.immediateResp(e, t, s);
              case 3:
                _context44.n = 5;
                break;
              case 4:
                _context44.p = 4;
                _t22 = _context44.v;
                (r = this._messages) == null || r.addNewErrorMessage(Z), console.log(_t22);
              case 5:
                return _context44.a(2);
            }
          }, _callee44, this, [[0, 4]]);
        }));
        function generateRespByType(_x96, _x97, _x98, _x99) {
          return _generateRespByType.apply(this, arguments);
        }
        return generateRespByType;
      }()
    }, {
      key: "generateResp",
      value: function () {
        var _generateResp = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee45(e, t, n) {
          var s, _yield$M$processReque5, r, o, a, c, l;
          return _regenerator().w(function (_context45) {
            while (1) switch (_context45.n) {
              case 0:
                s = t[t.length - 1][h];
                _context45.n = 1;
                return M.processRequestInterceptor(this.deepChat, {
                  body: _defineProperty({}, h, s)
                });
              case 1:
                _yield$M$processReque5 = _context45.v;
                r = _yield$M$processReque5.body;
                o = _yield$M$processReque5.error;
                a = !!this.stream;
                try {
                  if (o) M.displayError(e, new Error(o)), (a ? this.streamHandlers.onClose : this.completionsHandlers.onFinish)();else if (!r || !r[h]) {
                    c = Po({
                      body: r
                    }, !1);
                    console[f](c);
                    l = a ? this.streamHandlers.onClose : this.completionsHandlers.onFinish;
                    M.onInterceptorError(e, c, l);
                  } else this.generateRespByType(e, r[h], !!this.stream, n);
                } catch (c) {
                  this.unloadChat(c);
                }
              case 2:
                return _context45.a(2);
            }
          }, _callee45, this);
        }));
        function generateResp(_x100, _x101, _x102) {
          return _generateResp.apply(this, arguments);
        }
        return generateResp;
      }()
    }, {
      key: "callServiceAPI",
      value: function () {
        var _callServiceAPI2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee46(e, t) {
          var n, s;
          return _regenerator().w(function (_context46) {
            while (1) switch (_context46.n) {
              case 0:
                if (this._isModelLoaded) {
                  _context46.n = 3;
                  break;
                }
                if (!this._loadOnFirstMessage) {
                  _context46.n = 2;
                  break;
                }
                _context46.n = 1;
                return this.init();
              case 1:
                _context46.n = 3;
                break;
              case 2:
                return _context46.a(2);
              case 3:
                !$.chat || this._isModelLoading || ((n = this._webModel.introMessage) != null && n.removeAfterMessage && ((s = this._removeIntro) == null || s.call(this)), e.addLoadingMessage(), this.generateResp(e, t, $.chat));
              case 4:
                return _context46.a(2);
            }
          }, _callee46, this);
        }));
        function callServiceAPI(_x103, _x104) {
          return _callServiceAPI2.apply(this, arguments);
        }
        return callServiceAPI;
      }()
    }, {
      key: "canSubmit",
      value: function canSubmit(e) {
        return !(e != null && e.trim()) || this._isModelLoading ? !1 : this._loadOnFirstMessage ? !0 : !!this._isModelLoaded;
      }
    }, {
      key: "isWebModel",
      value: function isWebModel() {
        return !0;
      }
    }], [{
      key: "setUpHistory",
      value: function setUpHistory(e, t) {
        t.forEach(function (n, s) {
          if (n.role === U && n[h]) {
            var r = t[s + 1];
            r != null && r[h] && r.role !== U && e.push([n[h], r[h]]);
          }
        });
      }
    }, {
      key: "processResponse",
      value: function () {
        var _processResponse = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee47(e, t, n) {
          var a, c, s, r, o, d, _t23;
          return _regenerator().w(function (_context47) {
            while (1) switch (_context47.n) {
              case 0:
                _context47.n = 1;
                return (a = e.responseInterceptor) == null ? void 0 : a.call(e, n);
              case 1:
                _t23 = _context47.v;
                if (_t23) {
                  _context47.n = 2;
                  break;
                }
                _t23 = n;
              case 2:
                s = _t23;
                if (!((c = e.connect) != null && c.stream && Array.isArray(s) && s.length > 1)) {
                  _context47.n = 3;
                  break;
                }
                console[f](Wr);
                return _context47.a(2);
              case 3:
                r = Array.isArray(s) ? s : [s], o = r.find(function (l) {
                  return typeof l[f] == "string";
                });
                if (!o) {
                  _context47.n = 4;
                  break;
                }
                M.displayError(t, new Error(o[f]));
                return _context47.a(2);
              case 4:
                if (!r.find(function (d) {
                  return !d || !d[h];
                })) {
                  _context47.n = 5;
                  break;
                }
                d = Lo(n, !!e.responseInterceptor, s);
                M.displayError(t, new Error(d));
                return _context47.a(2);
              case 5:
                return _context47.a(2, r);
            }
          }, _callee47);
        }));
        function processResponse(_x105, _x106, _x107) {
          return _processResponse.apply(this, arguments);
        }
        return processResponse;
      }()
    }, {
      key: "clearAllCache",
      value: function clearAllCache() {
        $.clearCache("webllm/model"), $.clearCache("webllm/wasm");
      }
    }, {
      key: "clearCache",
      value: function clearCache(e) {
        caches.open(e).then(function (t) {
          t.keys().then(function (n) {
            n.forEach(function (s) {
              t["delete"](s);
            });
          });
        });
      }
    }]);
  }($t);
$.GENERIC_ERROR = "Error, please check the [troubleshooting](".concat(q, "webModel#troubleshooting) section of documentation for help."), $.MULTIPLE_MODELS_ERROR = "Cannot run multiple web models", $.WEB_LLM_NOT_FOUND_ERROR = "WebLLM module not found", $.DEFAULT_MODEL = "Llama-2-7b-chat-hf-q4f32_1", $.MODULE_SEARCH_LIMIT_S = 5;
var ns = $;
var oe = function oe(i, e, t, n) {
    return {
      url: i,
      method: e,
      handleVerificationResult: t,
      augmentUrl: n
    };
  },
  Bc = function Bc(i) {
    return _defineProperty(_defineProperty({}, ie, "".concat(ge).concat(i)), B, V);
  },
  Dc = function Dc(i, e, t, n) {
    var s = i;
    Array.isArray(s[f]) && s[f][0] === "Error in `parameters`: field required" ? t(e) : n(se);
  },
  Fc = function Fc() {
    return oe("https://api-inference.huggingface.co/models/gpt2", fe, Dc);
  },
  Vn = /*#__PURE__*/function (_T) {
    // prettier-ignore
    function Vn(e, t, n, s, r, o) {
      var _this22;
      _classCallCheck(this, Vn);
      _this22 = _callSuper(this, Vn, [e, Fc(), Bc, r, o]), _this22.insertKeyPlaceholderText = "Hugging Face Token", _this22.keyHelpUrl = "https://huggingface.co/settings/tokens", _this22.permittedErrorPrefixes = [Ti], _this22.url = "".concat(Vn.URL_PREFIX).concat(n), _this22.textInputPlaceholderText = t, _typeof(s) == "object" && (s.model && (_this22.url = "".concat(Vn.URL_PREFIX).concat(s.model)), s.options && (_this22.rawBody.options = s.options), s.parameters && (_this22.rawBody.parameters = s.parameters));
      return _this22;
    }
    // prettier-ignore
    _inherits(Vn, _T);
    return _createClass(Vn, [{
      key: "preprocessBody",
      value: function preprocessBody(e, t, n) {
        var _s$options;
        var s = JSON.parse(JSON.stringify(e)),
          r = t[t.length - 1][h];
        if (r) return (_s$options = s.options) !== null && _s$options !== void 0 ? _s$options : s.options = {}, s.options.wait_for_model = !0, _objectSpread({
          inputs: r
        }, s);
      }
    }, {
      key: "callServiceAPI",
      value: function () {
        var _callServiceAPI3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee48(e, t, n) {
          var s;
          return _regenerator().w(function (_context48) {
            while (1) switch (_context48.n) {
              case 0:
                if (this.connectSettings) {
                  _context48.n = 1;
                  break;
                }
                throw new Error(Ie);
              case 1:
                s = this.preprocessBody(this.rawBody, t, n);
                ne.request(this, s, e);
              case 2:
                return _context48.a(2);
            }
          }, _callee48, this);
        }));
        function callServiceAPI(_x108, _x109, _x110) {
          return _callServiceAPI3.apply(this, arguments);
        }
        return callServiceAPI;
      }()
    }]);
  }(T);
Vn.URL_PREFIX = "https://api-inference.huggingface.co/models/";
var vt = Vn;
var cs = /*#__PURE__*/function (_vt) {
  // prettier-ignore
  function cs(e, t, n, s, r, o) {
    var _this23;
    _classCallCheck(this, cs);
    _this23 = _callSuper(this, cs, [e, t, n, s, r, o]), _this23.isTextInputDisabled = !0, _this23.canSendMessage = cs.canSendFile;
    return _this23;
  }
  _inherits(cs, _vt);
  return _createClass(cs, [{
    key: "preprocessBody",
    value: function preprocessBody(e, t, n) {
      return n[0];
    }
    // prettier-ignore
  }, {
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee49(e, t, n) {
        return _regenerator().w(function (_context49) {
          while (1) switch (_context49.n) {
            case 0:
              if (this.connectSettings) {
                _context49.n = 1;
                break;
              }
              throw new Error(Ie);
            case 1:
              if (n != null && n[0]) {
                _context49.n = 2;
                break;
              }
              throw new Error(js);
            case 2:
              ne.poll(this, n[0], e, !1);
            case 3:
              return _context49.a(2);
          }
        }, _callee49, this);
      }));
      function callServiceAPI(_x111, _x112, _x113) {
        return _callServiceAPI4.apply(this, arguments);
      }
      return callServiceAPI;
    }()
  }], [{
    key: "canSendFile",
    value: function canSendFile(e, t) {
      return !!(t != null && t[0]);
    }
  }]);
}(vt);
var Uc = /*#__PURE__*/function (_cs) {
  // prettier-ignore
  function Uc(e) {
    _classCallCheck(this, Uc);
    var s, r, o;
    var t = (r = (s = e.directConnection) == null ? void 0 : s.huggingFace) == null ? void 0 : r.audioClassification,
      n = (o = e.directConnection) == null ? void 0 : o.huggingFace;
    return _callSuper(this, Uc, [e, "Attach an audio file", "ehcalabres/wav2vec2-lg-xlsr-en-speech-emotion-recognition", t, n, {
      audio: {}
    }]);
  }
  _inherits(Uc, _cs);
  return _createClass(Uc, [{
    key: "extractPollResultData",
    value: function () {
      var _extractPollResultData = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee50(e) {
        var t;
        return _regenerator().w(function (_context50) {
          while (1) switch (_context50.n) {
            case 0:
              if (!e.estimated_time) {
                _context50.n = 1;
                break;
              }
              return _context50.a(2, {
                timeoutMS: (e.estimated_time + 1) * 1e3
              });
            case 1:
              if (!e[f]) {
                _context50.n = 2;
                break;
              }
              throw e[f];
            case 2:
              return _context50.a(2, _defineProperty({}, h, ((t = e[0]) == null ? void 0 : t.label) || ""));
          }
        }, _callee50);
      }));
      function extractPollResultData(_x114) {
        return _extractPollResultData.apply(this, arguments);
      }
      return extractPollResultData;
    }()
  }]);
}(cs);
var Hc = /*#__PURE__*/function (_cs2) {
  function Hc(e) {
    _classCallCheck(this, Hc);
    var s, r, o;
    var t = (r = (s = e.directConnection) == null ? void 0 : s.huggingFace) == null ? void 0 : r.imageClassification,
      n = (o = e.directConnection) == null ? void 0 : o.huggingFace;
    return _callSuper(this, Hc, [e, "Attach an image file", "google/vit-base-patch16-224", t, n, {
      images: {}
    }]);
  }
  _inherits(Hc, _cs2);
  return _createClass(Hc, [{
    key: "extractPollResultData",
    value: function () {
      var _extractPollResultData2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee51(e) {
        var t;
        return _regenerator().w(function (_context51) {
          while (1) switch (_context51.n) {
            case 0:
              if (!e.estimated_time) {
                _context51.n = 1;
                break;
              }
              return _context51.a(2, {
                timeoutMS: (e.estimated_time + 1) * 1e3
              });
            case 1:
              if (!e[f]) {
                _context51.n = 2;
                break;
              }
              throw e[f];
            case 2:
              return _context51.a(2, _defineProperty({}, h, ((t = e[0]) == null ? void 0 : t.label) || ""));
          }
        }, _callee51);
      }));
      function extractPollResultData(_x115) {
        return _extractPollResultData2.apply(this, arguments);
      }
      return extractPollResultData;
    }()
  }]);
}(cs);
var Gs = function Gs(i) {
    return _defineProperty(_defineProperty({}, ie, "".concat(ge).concat(i)), B, V);
  },
  jc = function jc(i, e, t, n) {
    i.message ? n(se) : t(e);
  },
  zs = function zs() {
    return oe("https://api.stability.ai/v1/engines/list", re, jc);
  },
  hn = "data:image/png;base64,";
var Vs = /*#__PURE__*/function (_T2) {
  // prettier-ignore
  function Vs(e, t, n, s, r) {
    var _this24;
    _classCallCheck(this, Vs);
    _this24 = _callSuper(this, Vs, [e, t, n, s, r]), _this24.insertKeyPlaceholderText = _this24.genereteAPIKeyName("Stability AI"), _this24.keyHelpUrl = "https://platform.stability.ai/docs/getting-started/authentication", _this24.permittedErrorPrefixes = [as, "invalid_"];
    return _this24;
  }
  _inherits(Vs, _T2);
  return _createClass(Vs);
}(T);
var As = /*#__PURE__*/function (_Vs) {
  function As(e) {
    var _this25;
    _classCallCheck(this, As);
    var o;
    var t = JSON.parse(JSON.stringify(e.directConnection)),
      n = t == null ? void 0 : t.stabilityAI,
      s = {
        images: {
          files: {
            acceptedFormats: ".png",
            maxNumberOfFiles: 1
          }
        }
      };
    _this25 = _callSuper(this, As, [e, zs(), Gs, n, s]), _this25.url = "https://api.stability.ai/v1/generation/esrgan-v1-x2plus/image-to-image/upscale", _this25.textInputPlaceholderText = "Describe image changes";
    var r = (o = t == null ? void 0 : t.stabilityAI) == null ? void 0 : o.imageToImageUpscale;
    _typeof(r) == "object" && (r.engine_id && (_this25.url = "https://api.stability.ai/v1/generation/".concat(r.engine_id, "/image-to-image/upscale")), As.cleanConfig(r), Object.assign(_this25.rawBody, r)), _this25.canSendMessage = As.canSendFileMessage;
    return _this25;
  }
  _inherits(As, _Vs);
  return _createClass(As, [{
    key: "createFormDataBody",
    value: function createFormDataBody(e, t) {
      var n = new FormData();
      return n.append(j, t), Object.keys(e).forEach(function (s) {
        n.append(s, String(e[s]));
      }), n;
    }
    // prettier-ignore
  }, {
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee52(e, t, n) {
        var s;
        return _regenerator().w(function (_context52) {
          while (1) switch (_context52.n) {
            case 0:
              if (this.connectSettings) {
                _context52.n = 1;
                break;
              }
              throw new Error(Ie);
            case 1:
              if (n) {
                _context52.n = 2;
                break;
              }
              throw new Error(wi);
            case 2:
              s = this.createFormDataBody(this.rawBody, n[0]);
              M.tempRemoveContentHeader(this.connectSettings, ne.request.bind(this, this, s, e), !1);
            case 3:
              return _context52.a(2);
          }
        }, _callee52, this);
      }));
      function callServiceAPI(_x116, _x117, _x118) {
        return _callServiceAPI5.apply(this, arguments);
      }
      return callServiceAPI;
    }()
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee53(e) {
        var t;
        return _regenerator().w(function (_context53) {
          while (1) switch (_context53.n) {
            case 0:
              if (!e.message) {
                _context53.n = 1;
                break;
              }
              throw e.message;
            case 1:
              t = e.artifacts.map(function (n) {
                return _defineProperty(_defineProperty({}, Y, "".concat(hn).concat(n.base64)), C, j);
              });
              return _context53.a(2, _defineProperty({}, y, t));
          }
        }, _callee53);
      }));
      function extractResultData(_x119) {
        return _extractResultData2.apply(this, arguments);
      }
      return extractResultData;
    }()
  }], [{
    key: "cleanConfig",
    value: function cleanConfig(e) {
      delete e.engine_id;
    }
  }, {
    key: "canSendFileMessage",
    value: function canSendFileMessage(e, t) {
      return !!(t != null && t[0]);
    }
  }]);
}(Vs);
var ws = /*#__PURE__*/function (_Vs2) {
  function ws(e) {
    var _this26;
    _classCallCheck(this, ws);
    var o;
    var t = JSON.parse(JSON.stringify(e.directConnection)),
      n = t == null ? void 0 : t.stabilityAI,
      s = _defineProperty({}, z, _defineProperty({}, y, {
        acceptedFormats: ".png",
        maxNumberOfFiles: 2
      }));
    _this26 = _callSuper(this, ws, [e, zs(), Gs, n, s]), _this26.url = "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/image-to-image/masking", _this26._maskSource = "MASK_IMAGE_WHITE", _this26.textInputPlaceholderText = "Describe image changes";
    var r = (o = t == null ? void 0 : t.stabilityAI) == null ? void 0 : o.imageToImageMasking;
    _typeof(r) == "object" && (r.engine_id && (_this26.url = "https://api.stability.ai/v1/generation/".concat(r.engine_id, "/image-to-image/masking")), r.weight !== void 0 && r.weight !== null && (_this26._imageWeight = r.weight), r.mask_source !== void 0 && r.mask_source !== null && (_this26._maskSource = r.mask_source), ws.cleanConfig(r), Object.assign(_this26.rawBody, r)), _this26.canSendMessage = ws.canSendFileTextMessage;
    return _this26;
  }
  _inherits(ws, _Vs2);
  return _createClass(ws, [{
    key: "createFormDataBody",
    value: function createFormDataBody(e, t, n, s) {
      var r = new FormData();
      return r.append("init_image", t), r.append("mask_source", String(this._maskSource)), r.append("mask_image", n), s && s !== "" && r.append("text_prompts[0][text]", s), this._imageWeight !== void 0 && this._imageWeight !== null && r.append("text_prompts[0][weight]", String(this._imageWeight)), Object.keys(e).forEach(function (o) {
        r.append(o, String(e[o]));
      }), r.get("weight") === void 0 && r.append("weight", String(1)), r;
    }
    // prettier-ignore
  }, {
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee54(e, t, n) {
        var o, a, s, r;
        return _regenerator().w(function (_context54) {
          while (1) switch (_context54.n) {
            case 0:
              if (this.connectSettings) {
                _context54.n = 1;
                break;
              }
              throw new Error(Ie);
            case 1:
              if (!(!n || !n[0] || !n[1])) {
                _context54.n = 2;
                break;
              }
              throw new Error(wi);
            case 2:
              s = (a = (o = t[t.length - 1]) == null ? void 0 : o[h]) == null ? void 0 : a.trim(), r = this.createFormDataBody(this.rawBody, n[0], n[1], s);
              M.tempRemoveContentHeader(this.connectSettings, ne.request.bind(this, this, r, e), !1);
            case 3:
              return _context54.a(2);
          }
        }, _callee54, this);
      }));
      function callServiceAPI(_x120, _x121, _x122) {
        return _callServiceAPI6.apply(this, arguments);
      }
      return callServiceAPI;
    }()
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee55(e) {
        var t;
        return _regenerator().w(function (_context55) {
          while (1) switch (_context55.n) {
            case 0:
              if (!e.message) {
                _context55.n = 1;
                break;
              }
              throw e.message;
            case 1:
              t = e.artifacts.map(function (n) {
                return _defineProperty(_defineProperty({}, Y, "".concat(hn).concat(n.base64)), C, j);
              });
              return _context55.a(2, _defineProperty({}, y, t));
          }
        }, _callee55);
      }));
      function extractResultData(_x123) {
        return _extractResultData3.apply(this, arguments);
      }
      return extractResultData;
    }()
  }], [{
    key: "cleanConfig",
    value: function cleanConfig(e) {
      delete e.engine_id, delete e.weight;
    }
  }, {
    key: "canSendFileTextMessage",
    value: function canSendFileTextMessage(e, t) {
      return !!(t != null && t[0]) && !!(e && e.trim() !== "");
    }
  }]);
}(Vs);
var qc = /*#__PURE__*/function (_cs3) {
  function qc(e) {
    _classCallCheck(this, qc);
    var s, r, o;
    var t = (r = (s = e.directConnection) == null ? void 0 : s.huggingFace) == null ? void 0 : r.audioSpeechRecognition,
      n = (o = e.directConnection) == null ? void 0 : o.huggingFace;
    return _callSuper(this, qc, [e, "Attach an audio file", "facebook/wav2vec2-large-960h-lv60-self", t, n, {
      audio: {}
    }]);
  }
  _inherits(qc, _cs3);
  return _createClass(qc, [{
    key: "extractPollResultData",
    value: function () {
      var _extractPollResultData3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee56(e) {
        return _regenerator().w(function (_context56) {
          while (1) switch (_context56.n) {
            case 0:
              if (!e.estimated_time) {
                _context56.n = 1;
                break;
              }
              return _context56.a(2, {
                timeoutMS: (e.estimated_time + 1) * 1e3
              });
            case 1:
              if (!e[f]) {
                _context56.n = 2;
                break;
              }
              throw e[f];
            case 2:
              return _context56.a(2, _defineProperty({}, h, e[h] || ""));
          }
        }, _callee56);
      }));
      function extractPollResultData(_x124) {
        return _extractPollResultData3.apply(this, arguments);
      }
      return extractPollResultData;
    }()
  }]);
}(cs);
var $c = /*#__PURE__*/function (_vt2) {
  function $c(e) {
    _classCallCheck(this, $c);
    var s, r, o;
    var t = (r = (s = e.directConnection) == null ? void 0 : s.huggingFace) == null ? void 0 : r.textGeneration,
      n = (o = e.directConnection) == null ? void 0 : o.huggingFace;
    return _callSuper(this, $c, [e, "Once upon a time", "gpt2", t, n]);
  }
  _inherits($c, _vt2);
  return _createClass($c, [{
    key: "extractResultData",
    value: function () {
      var _extractResultData4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee57(e) {
        var t;
        return _regenerator().w(function (_context57) {
          while (1) switch (_context57.n) {
            case 0:
              if (!e[f]) {
                _context57.n = 1;
                break;
              }
              throw e[f];
            case 1:
              return _context57.a(2, _defineProperty({}, h, ((t = e[0]) == null ? void 0 : t.generated_text) || ""));
          }
        }, _callee57);
      }));
      function extractResultData(_x125) {
        return _extractResultData4.apply(this, arguments);
      }
      return extractResultData;
    }()
  }]);
}(vt);
var Gc = /*#__PURE__*/function (_vt3) {
  function Gc(e) {
    var _this27;
    _classCallCheck(this, Gc);
    var s, r, o;
    var t = (r = (s = e.directConnection) == null ? void 0 : s.huggingFace) == null ? void 0 : r.questionAnswer,
      n = (o = e.directConnection) == null ? void 0 : o.huggingFace;
    _this27 = _callSuper(this, Gc, [e, "Ask a question", "bert-large-uncased-whole-word-masking-finetuned-squad", t, n]), _this27.permittedErrorPrefixes = [Ti, "Error in"], _this27._context = t.context;
    return _this27;
  }
  _inherits(Gc, _vt3);
  return _createClass(Gc, [{
    key: "preprocessBody",
    value: function preprocessBody(e, t) {
      var n = t[t.length - 1][h];
      if (n) return {
        inputs: {
          question: n,
          context: this._context,
          options: {
            wait_for_model: !0
          }
        }
      };
    }
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee58(e) {
        return _regenerator().w(function (_context58) {
          while (1) switch (_context58.n) {
            case 0:
              if (!e[f]) {
                _context58.n = 1;
                break;
              }
              throw e[f];
            case 1:
              return _context58.a(2, _defineProperty({}, h, e.answer || ""));
          }
        }, _callee58);
      }));
      function extractResultData(_x126) {
        return _extractResultData5.apply(this, arguments);
      }
      return extractResultData;
    }()
  }]);
}(vt);
var zc = /*#__PURE__*/function (_vt4) {
  function zc(e) {
    _classCallCheck(this, zc);
    var s, r, o;
    var t = (r = (s = e.directConnection) == null ? void 0 : s.huggingFace) == null ? void 0 : r.summarization,
      n = (o = e.directConnection) == null ? void 0 : o.huggingFace;
    return _callSuper(this, zc, [e, "Insert text to summarize", "facebook/bart-large-cnn", t, n]);
  }
  _inherits(zc, _vt4);
  return _createClass(zc, [{
    key: "extractResultData",
    value: function () {
      var _extractResultData6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee59(e) {
        var t;
        return _regenerator().w(function (_context59) {
          while (1) switch (_context59.n) {
            case 0:
              if (!e[f]) {
                _context59.n = 1;
                break;
              }
              throw e[f];
            case 1:
              return _context59.a(2, _defineProperty({}, h, ((t = e[0]) == null ? void 0 : t.summary_text) || ""));
          }
        }, _callee59);
      }));
      function extractResultData(_x127) {
        return _extractResultData6.apply(this, arguments);
      }
      return extractResultData;
    }()
  }]);
}(vt);
var Vc = /*#__PURE__*/function (_vt5) {
  function Vc(e) {
    var _this28$maxMessages;
    var _this28;
    _classCallCheck(this, Vc);
    var s, r, o;
    var t = (r = (s = e.directConnection) == null ? void 0 : s.huggingFace) == null ? void 0 : r.conversation,
      n = (o = e.directConnection) == null ? void 0 : o.huggingFace;
    _this28 = _callSuper(this, Vc, [e, "Ask me anything!", "facebook/blenderbot-400M-distill", t, n]), (_this28$maxMessages = _this28.maxMessages) !== null && _this28$maxMessages !== void 0 ? _this28$maxMessages : _this28.maxMessages = -1;
    return _this28;
  }
  // prettier-ignore
  _inherits(Vc, _vt5);
  return _createClass(Vc, [{
    key: "processMessagesI",
    value: function processMessagesI(e) {
      var t = e.filter(function (a) {
          return a[h];
        }),
        n = t[t.length - 1][h],
        s = t.slice(0, t.length - 1);
      if (!n) return;
      var r = s.filter(function (a) {
          return a.role === U;
        }).map(function (a) {
          return a[h];
        }),
        o = s.filter(function (a) {
          return a.role === W;
        }).map(function (a) {
          return a[h];
        });
      return {
        past_user_inputs: r,
        generated_responses: o,
        mostRecentMessageText: n
      };
    }
    // prettier-ignore
  }, {
    key: "preprocessBody",
    value: function preprocessBody(e, t) {
      var _n$options;
      var n = JSON.parse(JSON.stringify(e)),
        s = this.processMessagesI(t);
      if (s) return (_n$options = n.options) !== null && _n$options !== void 0 ? _n$options : n.options = {}, n.options.wait_for_model = !0, _objectSpread({
        inputs: _defineProperty({
          past_user_inputs: s.past_user_inputs,
          generated_responses: s.generated_responses
        }, h, s.mostRecentMessageText)
      }, n);
    }
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee60(e) {
        return _regenerator().w(function (_context60) {
          while (1) switch (_context60.n) {
            case 0:
              if (!e[f]) {
                _context60.n = 1;
                break;
              }
              throw e[f];
            case 1:
              return _context60.a(2, _defineProperty({}, h, e.generated_text || ""));
          }
        }, _callee60);
      }));
      function extractResultData(_x128) {
        return _extractResultData7.apply(this, arguments);
      }
      return extractResultData;
    }()
  }]);
}(vt);
var Cs = /*#__PURE__*/function (_Vs3) {
  function Cs(e) {
    var _this29;
    _classCallCheck(this, Cs);
    var o;
    var t = JSON.parse(JSON.stringify(e.directConnection)),
      n = t.stabilityAI,
      s = _defineProperty({}, z, _defineProperty({}, y, {
        acceptedFormats: ".png",
        maxNumberOfFiles: 1
      }));
    _this29 = _callSuper(this, Cs, [e, zs(), Gs, n, s]), _this29.url = "https://api.stability.ai/v1/generation/stable-diffusion-v1-6/image-to-image", _this29.textInputPlaceholderText = "Describe image changes";
    var r = (o = t.stabilityAI) == null ? void 0 : o.imageToImage;
    _typeof(r) == "object" && (r.engine_id && (_this29.url = "https://api.stability.ai/v1/generation/".concat(r.engine_id, "/text-to-image")), r.weight !== void 0 && r.weight !== null && (_this29._imageWeight = r.weight), Cs.cleanConfig(r), Object.assign(_this29.rawBody, r)), _this29.canSendMessage = Cs.canSendFileTextMessage;
    return _this29;
  }
  _inherits(Cs, _Vs3);
  return _createClass(Cs, [{
    key: "createFormDataBody",
    value: function createFormDataBody(e, t, n) {
      var s = new FormData();
      return s.append("init_image", t), n && n !== "" && s.append("text_prompts[0][text]", n), this._imageWeight !== void 0 && this._imageWeight !== null && s.append("text_prompts[0][weight]", String(this._imageWeight)), Object.keys(e).forEach(function (r) {
        s.append(r, String(e[r]));
      }), s.get("weight") === void 0 && s.append("weight", String(1)), s;
    }
    // prettier-ignore
  }, {
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee61(e, t, n) {
        var o, a, s, r;
        return _regenerator().w(function (_context61) {
          while (1) switch (_context61.n) {
            case 0:
              if (this.connectSettings) {
                _context61.n = 1;
                break;
              }
              throw new Error(Ie);
            case 1:
              if (n) {
                _context61.n = 2;
                break;
              }
              throw new Error(wi);
            case 2:
              s = (a = (o = t[t.length - 1]) == null ? void 0 : o[h]) == null ? void 0 : a.trim(), r = this.createFormDataBody(this.rawBody, n[0], s);
              M.tempRemoveContentHeader(this.connectSettings, ne.request.bind(this, this, r, e), !1);
            case 3:
              return _context61.a(2);
          }
        }, _callee61, this);
      }));
      function callServiceAPI(_x129, _x130, _x131) {
        return _callServiceAPI7.apply(this, arguments);
      }
      return callServiceAPI;
    }()
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData8 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee62(e) {
        var t;
        return _regenerator().w(function (_context62) {
          while (1) switch (_context62.n) {
            case 0:
              if (!e.message) {
                _context62.n = 1;
                break;
              }
              throw e.message;
            case 1:
              t = e.artifacts.map(function (n) {
                return _defineProperty(_defineProperty({}, Y, "".concat(hn).concat(n.base64)), C, j);
              });
              return _context62.a(2, _defineProperty({}, y, t));
          }
        }, _callee62);
      }));
      function extractResultData(_x132) {
        return _extractResultData8.apply(this, arguments);
      }
      return extractResultData;
    }()
  }], [{
    key: "cleanConfig",
    value: function cleanConfig(e) {
      delete e.engine_id, delete e.weight;
    }
  }, {
    key: "canSendFileTextMessage",
    value: function canSendFileTextMessage(e, t) {
      return !!(t != null && t[0]) && !!(e && e.trim() !== "");
    }
  }]);
}(Vs);
var Jc = /*#__PURE__*/function (_vt6) {
  function Jc(e) {
    _classCallCheck(this, Jc);
    var s, r, o;
    var t = (r = (s = e.directConnection) == null ? void 0 : s.huggingFace) == null ? void 0 : r.translation,
      n = (o = e.directConnection) == null ? void 0 : o.huggingFace;
    return _callSuper(this, Jc, [e, "Insert text to translate", "Helsinki-NLP/opus-tatoeba-en-ja", t, n]);
  }
  _inherits(Jc, _vt6);
  return _createClass(Jc, [{
    key: "extractResultData",
    value: function () {
      var _extractResultData9 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee63(e) {
        var t;
        return _regenerator().w(function (_context63) {
          while (1) switch (_context63.n) {
            case 0:
              if (!e[f]) {
                _context63.n = 1;
                break;
              }
              throw e[f];
            case 1:
              return _context63.a(2, _defineProperty({}, h, ((t = e[0]) == null ? void 0 : t.translation_text) || ""));
          }
        }, _callee63);
      }));
      function extractResultData(_x133) {
        return _extractResultData9.apply(this, arguments);
      }
      return extractResultData;
    }()
  }]);
}(vt);
var Ts = /*#__PURE__*/function (_Vs4) {
  function Ts(e) {
    var _this30;
    _classCallCheck(this, Ts);
    var r;
    var t = JSON.parse(JSON.stringify(e.directConnection)),
      n = t.stabilityAI;
    _this30 = _callSuper(this, Ts, [e, zs(), Gs, n]), _this30.url = "https://api.stability.ai/v1/generation/stable-diffusion-v1-6/text-to-image", _this30.textInputPlaceholderText = "Describe an image";
    var s = (r = t.stabilityAI) == null ? void 0 : r.textToImage;
    _typeof(s) == "object" && (s.engine_id && (_this30.url = "https://api.stability.ai/v1/generation/".concat(s.engine_id, "/text-to-image")), s.weight !== void 0 && s.weight !== null && (_this30._imageWeight = s.weight), Ts.cleanConfig(s), Object.assign(_this30.rawBody, s)), _this30.canSendMessage = Ts.canSendTextMessage;
    return _this30;
  }
  _inherits(Ts, _Vs4);
  return _createClass(Ts, [{
    key: "preprocessBody",
    value: function preprocessBody(e, t) {
      var n = t[t.length - 1][h],
        s = JSON.parse(JSON.stringify(e)),
        r = _defineProperty({}, h, n);
      return this._imageWeight && (r.weight = this._imageWeight), s.text_prompts = [r], s;
    }
  }, {
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI8 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee64(e, t) {
        return _regenerator().w(function (_context64) {
          while (1) switch (_context64.n) {
            case 0:
              this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this));
            case 1:
              return _context64.a(2);
          }
        }, _callee64, this);
      }));
      function callServiceAPI(_x134, _x135) {
        return _callServiceAPI8.apply(this, arguments);
      }
      return callServiceAPI;
    }()
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData0 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee65(e) {
        var t;
        return _regenerator().w(function (_context65) {
          while (1) switch (_context65.n) {
            case 0:
              if (!e.message) {
                _context65.n = 1;
                break;
              }
              throw e.message;
            case 1:
              t = e.artifacts.map(function (n) {
                return _defineProperty(_defineProperty({}, Y, "".concat(hn).concat(n.base64)), C, j);
              });
              return _context65.a(2, _defineProperty({}, y, t));
          }
        }, _callee65);
      }));
      function extractResultData(_x136) {
        return _extractResultData0.apply(this, arguments);
      }
      return extractResultData;
    }()
  }], [{
    key: "cleanConfig",
    value: function cleanConfig(e) {
      delete e.engine_id, delete e.weight;
    }
  }, {
    key: "canSendTextMessage",
    value: function canSendTextMessage(e) {
      return !!(e && e.trim() !== "");
    }
  }]);
}(Vs);
var Kc = /*#__PURE__*/function (_vt7) {
  function Kc(e) {
    var _this31;
    _classCallCheck(this, Kc);
    var s, r, o;
    var t = (r = (s = e.directConnection) == null ? void 0 : s.huggingFace) == null ? void 0 : r.fillMask,
      n = (o = e.directConnection) == null ? void 0 : o.huggingFace;
    _this31 = _callSuper(this, Kc, [e, "The goal of life is [MASK].", "bert-base-uncased", t, n]), _this31.permittedErrorPrefixes = [Ti, "No mask_token"];
    return _this31;
  }
  _inherits(Kc, _vt7);
  return _createClass(Kc, [{
    key: "extractResultData",
    value: function () {
      var _extractResultData1 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee66(e) {
        var t;
        return _regenerator().w(function (_context66) {
          while (1) switch (_context66.n) {
            case 0:
              if (!e[f]) {
                _context66.n = 1;
                break;
              }
              throw e[f];
            case 1:
              return _context66.a(2, _defineProperty({}, h, ((t = e[0]) == null ? void 0 : t.sequence) || ""));
          }
        }, _callee66);
      }));
      function extractResultData(_x137) {
        return _extractResultData1.apply(this, arguments);
      }
      return extractResultData;
    }()
  }]);
}(vt);
var Oi = function Oi(i) {
    return _defineProperty(_defineProperty({}, B, V), ie, "".concat(ge).concat(i));
  },
  Wc = function Wc(i, e, t, n) {
    var s = i;
    s[f] ? s[f].message === Ci ? n(se) : n(Fe) : t(e);
  },
  Ni = function Ni() {
    return oe("https://open.bigmodel.cn/api/paas/v4/models", re, Wc);
  };
var Xc = /*#__PURE__*/function (_T3) {
  function Xc(e) {
    var _o$model, _a$voice;
    var _this32;
    _classCallCheck(this, Xc);
    var r, o, a;
    var t = JSON.parse(JSON.stringify(e.directConnection)),
      n = t.bigModel;
    _this32 = _callSuper(this, Xc, [e, Ni(), Oi, n]), _this32.insertKeyPlaceholderText = _this32.genereteAPIKeyName("BigModel"), _this32.keyHelpUrl = "https://open.bigmodel.cn/usercenter/apikeys", _this32.url = "https://open.bigmodel.cn/api/paas/v4/audio/speech", _this32.permittedErrorPrefixes = [ie, ye];
    var s = (r = t.bigModel) == null ? void 0 : r.textToSpeech;
    _typeof(s) === L && (_this32.cleanConfig(s), Object.assign(_this32.rawBody, s)), (_o$model = (o = _this32.rawBody).model) !== null && _o$model !== void 0 ? _o$model : o.model = "cogtts", (_a$voice = (a = _this32.rawBody).voice) !== null && _a$voice !== void 0 ? _a$voice : a.voice = "tongtong";
    return _this32;
  }
  _inherits(Xc, _T3);
  return _createClass(Xc, [{
    key: "cleanConfig",
    value: function cleanConfig(e) {
      delete e.key;
    }
  }, {
    key: "preprocessBody",
    value: function preprocessBody(e, t) {
      var n = JSON.parse(JSON.stringify(e)),
        s = t[t.length - 1];
      return n.input = (s == null ? void 0 : s[h]) || "", n;
    }
  }, {
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI9 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee67(e, t) {
        return _regenerator().w(function (_context67) {
          while (1) switch (_context67.n) {
            case 0:
              return _context67.a(2, this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this)));
          }
        }, _callee67, this);
      }));
      function callServiceAPI(_x138, _x139) {
        return _callServiceAPI9.apply(this, arguments);
      }
      return callServiceAPI;
    }()
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData10 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee68(e) {
        var t, n;
        return _regenerator().w(function (_context68) {
          while (1) switch (_context68.n) {
            case 0:
              t = new Blob([e], _defineProperty({}, C, "audio/mpeg")), n = URL.createObjectURL(t);
              return _context68.a(2, _defineProperty({}, y, [_defineProperty(_defineProperty({}, Y, n), C, P)]));
          }
        }, _callee68);
      }));
      function extractResultData(_x140) {
        return _extractResultData10.apply(this, arguments);
      }
      return extractResultData;
    }()
  }]);
}(T);
var Pi = function Pi(i) {
    return _defineProperty(_defineProperty({}, B, V), ie, "".concat(ge).concat(i));
  },
  Zc = function Zc(i, e, t, n) {
    var s = i;
    s[f] ? s[f].message === Ci ? n(se) : n(Fe) : t(e);
  },
  Li = function Li() {
    return oe("https://api.together.xyz/v1/models", re, Zc);
  };
var Yc = /*#__PURE__*/function (_T4) {
  function Yc(e) {
    var _o$model2, _a$voice2;
    var _this33;
    _classCallCheck(this, Yc);
    var r, o, a;
    var t = JSON.parse(JSON.stringify(e.directConnection)),
      n = t.together;
    _this33 = _callSuper(this, Yc, [e, Li(), Pi, n]), _this33.insertKeyPlaceholderText = _this33.genereteAPIKeyName("Together AI"), _this33.keyHelpUrl = "https://api.together.xyz/settings/api-keys", _this33.url = "https://api.together.xyz/v1/audio/speech", _this33.permittedErrorPrefixes = [Ge, ye];
    var s = (r = t.together) == null ? void 0 : r.textToSpeech;
    _typeof(s) === L && _this33.completeConfig(s), (_o$model2 = (o = _this33.rawBody).model) !== null && _o$model2 !== void 0 ? _o$model2 : o.model = "cartesia/sonic", (_a$voice2 = (a = _this33.rawBody).voice) !== null && _a$voice2 !== void 0 ? _a$voice2 : a.voice = "laidback woman";
    return _this33;
  }
  _inherits(Yc, _T4);
  return _createClass(Yc, [{
    key: "preprocessBody",
    value: function preprocessBody(e, t) {
      var n = JSON.parse(JSON.stringify(e)),
        s = t[t.length - 1];
      return n.input = (s == null ? void 0 : s[h]) || "", n;
    }
  }, {
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI0 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee69(e, t) {
        return _regenerator().w(function (_context69) {
          while (1) switch (_context69.n) {
            case 0:
              return _context69.a(2, this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this)));
          }
        }, _callee69, this);
      }));
      function callServiceAPI(_x141, _x142) {
        return _callServiceAPI0.apply(this, arguments);
      }
      return callServiceAPI;
    }()
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData11 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee70(e) {
        var t, n;
        return _regenerator().w(function (_context70) {
          while (1) switch (_context70.n) {
            case 0:
              t = new Blob([e], _defineProperty({}, C, "audio/mpeg")), n = URL.createObjectURL(t);
              return _context70.a(2, _defineProperty({}, y, [_defineProperty(_defineProperty({}, Y, n), C, P)]));
          }
        }, _callee70);
      }));
      function extractResultData(_x143) {
        return _extractResultData11.apply(this, arguments);
      }
      return extractResultData;
    }()
  }]);
}(T);
var un = function un(i) {
    return _defineProperty(_defineProperty({}, ie, "".concat(ge).concat(i)), B, V);
  },
  ho = function ho(i, e, t, n) {
    var s = i;
    s[f] ? s[f].code === "invalid_api_key" ? n(se) : n(Fe) : t(e);
  },
  pn = function pn() {
    return oe("https://api.openai.com/v1/models", re, ho);
  },
  Xt = /*#__PURE__*/function () {
    var _ref54 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee71(i, e, t) {
      var n,
        s,
        r,
        o,
        a,
        c,
        _yield$M$processReque6,
        l,
        d,
        p,
        u,
        g,
        _args71 = arguments;
      return _regenerator().w(function (_context71) {
        while (1) switch (_context71.n) {
          case 0:
            n = _args71.length > 3 && _args71[3] !== undefined ? _args71[3] : !0;
            s = i.connectSettings, r = i.deepChat, o = i.completionsHandlers, a = i.messages;
            s.method = t;
            c = {
              body: e,
              headers: s.headers
            };
            _context71.n = 1;
            return M.processRequestInterceptor(r, c);
          case 1:
            _yield$M$processReque6 = _context71.v;
            l = _yield$M$processReque6.body;
            d = _yield$M$processReque6.headers;
            p = _yield$M$processReque6.error;
            u = o.onFinish;
            if (!(p && a)) {
              _context71.n = 2;
              break;
            }
            return _context71.a(2, M.onInterceptorError(a, p, u));
          case 2:
            _context71.n = 3;
            return M.fetch(i, d, n, l).then(function (v) {
              return M.processResponseByType(v);
            });
          case 3:
            g = _context71.v;
            if (!g[f]) {
              _context71.n = 4;
              break;
            }
            throw g[f].message;
          case 4:
            return _context71.a(2, g);
        }
      }, _callee71);
    }));
    return function Xt(_x144, _x145, _x146) {
      return _ref54.apply(this, arguments);
    };
  }(),
  Be = /*#__PURE__*/function () {
    function Be() {
      _classCallCheck(this, Be);
    }
    return _createClass(Be, null, [{
      key: "storeFiles",
      value: function () {
        var _storeFiles = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee73(e, t, n, s) {
          var r, o, a, c, _t24;
          return _regenerator().w(function (_context73) {
            while (1) switch (_context73.p = _context73.n) {
              case 0:
                r = e.connectSettings.headers;
                if (r) {
                  _context73.n = 1;
                  break;
                }
                return _context73.a(2);
              case 1:
                e.url = s;
                o = r[B];
                delete r[B];
                a = n.map(/*#__PURE__*/function () {
                  var _ref55 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee72(c) {
                    var l;
                    return _regenerator().w(function (_context72) {
                      while (1) switch (_context72.n) {
                        case 0:
                          l = new FormData();
                          return _context72.a(2, (l.append("purpose", "assistants"), l.append("file", c), new Promise(function (d) {
                            d(Xt(e, l, fe, !1));
                          })));
                      }
                    }, _callee72);
                  }));
                  return function (_x151) {
                    return _ref55.apply(this, arguments);
                  };
                }());
                _context73.p = 2;
                _context73.n = 3;
                return Promise.all(a);
              case 3:
                c = _context73.v.map(function (l) {
                  return {
                    id: l.id,
                    name: l.filename
                  };
                });
                return _context73.a(2, (r[B] = o, c));
              case 4:
                _context73.p = 4;
                _t24 = _context73.v;
                throw r[B] = o, M.displayError(t, _t24), e.completionsHandlers.onFinish(), _t24;
              case 5:
                return _context73.a(2);
            }
          }, _callee73, null, [[2, 4]]);
        }));
        function storeFiles(_x147, _x148, _x149, _x150) {
          return _storeFiles.apply(this, arguments);
        }
        return storeFiles;
      }()
    }, {
      key: "getType",
      value: function getType(e, t) {
        var n = e[t].path;
        return !n || n.endsWith("png") ? j : Ut;
      }
    }, {
      key: "getFiles",
      value: function () {
        var _getFiles = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee74(e, t, n, s) {
          var r, a;
          return _regenerator().w(function (_context74) {
            while (1) switch (_context74.n) {
              case 0:
                r = t.map(function (_ref56) {
                  var c = _ref56.fileId;
                  return e.url = "".concat(n).concat(c).concat(s), new Promise(function (l) {
                    l(Xt(e, void 0, "GET", !1));
                  });
                });
                _context74.n = 1;
                return Promise.all(r);
              case 1:
                a = _context74.v.map(function (c, l) {
                  return new Promise(function (d) {
                    var p = new FileReader();
                    p.readAsDataURL(c), p.onload = function (u) {
                      d(_defineProperty(_defineProperty(_defineProperty({}, Y, u.target.result), "name", t[l].name), C, Be.getType(t, l)));
                    };
                  });
                });
                _context74.n = 2;
                return Promise.all(a);
              case 2:
                return _context74.a(2, _context74.v);
            }
          }, _callee74);
        }));
        function getFiles(_x152, _x153, _x154, _x155) {
          return _getFiles.apply(this, arguments);
        }
        return getFiles;
      }()
    }, {
      key: "getFileName",
      value: function getFileName(e) {
        var t = e.split("/");
        return t[t.length - 1];
      }
      // prettier-ignore
    }, {
      key: "getFilesAndNewText",
      value: function () {
        var _getFilesAndNewText = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee75(e, t, n, s, r) {
          var l, d, o, a, c, _t25;
          return _regenerator().w(function (_context75) {
            while (1) switch (_context75.n) {
              case 0:
                a = n.getFilesPrefix, c = n.getFilesPostfix;
                _t25 = t.length > 0;
                if (!_t25) {
                  _context75.n = 2;
                  break;
                }
                _context75.n = 1;
                return Be.getFiles(e, t, a, c);
              case 1:
                o = _context75.v;
                (l = r == null ? void 0 : r[h]) != null && l.value && o.forEach(function (p, u) {
                  var v;
                  if (!p.src) return;
                  var g = t[u].path;
                  (v = r == null ? void 0 : r[h]) != null && v.value && g && (r[h].value = r[h].value.replace(g, p.src));
                });
              case 2:
                return _context75.a(2, (d = r == null ? void 0 : r[h]) != null && d.value ? _defineProperty(_defineProperty({}, h, r[h].value), "role", s) : _defineProperty(_defineProperty({}, y, o), "role", s));
            }
          }, _callee75);
        }));
        function getFilesAndNewText(_x156, _x157, _x158, _x159, _x160) {
          return _getFilesAndNewText.apply(this, arguments);
        }
        return getFilesAndNewText;
      }() // Noticed an issue where text contains a sandbox hyperlink to a csv, but no annotation provided
      // To reproduce use the following text:
      // give example data for a csv and create a suitable bar chart for it with a link
      // Don't think it can be fixed and it is something on OpenAI side of things
      // prettier-ignore
    }, {
      key: "getFileDetails",
      value: function getFileDetails(e, t) {
        var s;
        var n = [];
        return (s = t == null ? void 0 : t[h]) != null && s.value && e.content.forEach(function (r) {
          var o, a;
          (a = (o = r[h]) == null ? void 0 : o.annotations) == null || a.forEach(function (c) {
            var l;
            c[h] && c[h].startsWith("sandbox:") && (l = c.file_path) != null && l.file_id && n.push({
              path: c[h],
              fileId: c.file_path.file_id,
              name: Be.getFileName(c[h])
            });
          });
        }), t != null && t.image_file && n.push({
          fileId: t.image_file.file_id
        }), n;
      }
      // prettier-ignore
    }, {
      key: "getFilesAndText",
      value: function () {
        var _getFilesAndText = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee76(e, t, n, s) {
          var r;
          return _regenerator().w(function (_context76) {
            while (1) switch (_context76.n) {
              case 0:
                r = Be.getFileDetails(t, s);
                _context76.n = 1;
                return Be.getFilesAndNewText(e, r, n, t.role, s);
              case 1:
                return _context76.a(2, _context76.v);
            }
          }, _callee76);
        }));
        function getFilesAndText(_x161, _x162, _x163, _x164) {
          return _getFilesAndText.apply(this, arguments);
        }
        return getFilesAndText;
      }()
    }, {
      key: "parseResult",
      value: function parseResult(e, t) {
        var n = [];
        if (t) n = e.data;else for (var s = 0; s < e.data.length; s += 1) {
          var r = e.data[s];
          if (r.role === gt) n.push(r);else break;
        }
        return n.reverse();
      }
      // test this using this prompt and it should give 2 text mesages and a file:
      // "give example data for a csv and create a suitable bar chart"
    }, {
      key: "parseMessages",
      value: function parseMessages(e, t, n) {
        var s = [];
        return t.forEach(/*#__PURE__*/function () {
          var _ref59 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee78(r) {
            return _regenerator().w(function (_context78) {
              while (1) switch (_context78.n) {
                case 0:
                  r.content.filter(function (o) {
                    return !!o[h] || !!o.image_file;
                  }).sort(function (o) {
                    return o[h] ? -1 : o.image_file ? 1 : 0;
                  }).forEach(/*#__PURE__*/function () {
                    var _ref60 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee77(o) {
                      return _regenerator().w(function (_context77) {
                        while (1) switch (_context77.n) {
                          case 0:
                            s.push(Be.getFilesAndText(e, r, n, o));
                          case 1:
                            return _context77.a(2);
                        }
                      }, _callee77);
                    }));
                    return function (_x166) {
                      return _ref60.apply(this, arguments);
                    };
                  }());
                case 1:
                  return _context78.a(2);
              }
            }, _callee78);
          }));
          return function (_x165) {
            return _ref59.apply(this, arguments);
          };
        }()), Promise.all(s);
      }
    }, {
      key: "processStreamMessages",
      value: function () {
        var _processStreamMessages = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee79(e, t, n) {
          return _regenerator().w(function (_context79) {
            while (1) switch (_context79.n) {
              case 0:
                return _context79.a(2, Be.parseMessages(e, [{
                  content: t,
                  role: gt
                }], n));
            }
          }, _callee79);
        }));
        function processStreamMessages(_x167, _x168, _x169) {
          return _processStreamMessages.apply(this, arguments);
        }
        return processStreamMessages;
      }() // prettier-ignore
    }, {
      key: "processAPIMessages",
      value: function () {
        var _processAPIMessages = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee80(e, t, n, s) {
          var r;
          return _regenerator().w(function (_context80) {
            while (1) switch (_context80.n) {
              case 0:
                r = Be.parseResult(t, n);
                return _context80.a(2, Be.parseMessages(e, r, s));
            }
          }, _callee80);
        }));
        function processAPIMessages(_x170, _x171, _x172, _x173) {
          return _processAPIMessages.apply(this, arguments);
        }
        return processAPIMessages;
      }()
    }]);
  }();
Be.FILES_WITH_TEXT_ERROR = "content with type `text` must have `text` values", Be.FUNCTION_TOOL_RESP_ERROR = "Response must contain an array of strings for each individual function/tool_call, see ".concat(q, "directConnection/OpenAI/#assistant-functions.");
var ct = Be;
var At = /*#__PURE__*/function (_T5) {
  // prettier-ignore
  function At(e, t, n, s, r, o) {
    var _this34;
    _classCallCheck(this, At);
    if (_this34 = _callSuper(this, At, [e, s, r, o]), _this34.insertKeyPlaceholderText = _this34.genereteAPIKeyName("OpenAI"), _this34.keyHelpUrl = "https://platform.openai.com/account/api-keys", _this34.url = "", _this34.permittedErrorPrefixes = [as, "Please send text", ts.FAILED_ERROR_MESSAGE], _this34.shouldFetchHistory = !1, _this34._searchedForThreadId = !1, _this34._config = {}, _this34._newAssistantDetails = {
      model: "gpt-4"
    }, _this34._waitingForStreamResponse = !1, _this34._isSSEStream = !1, _this34.urlSegments = n, _typeof(t) == "object") {
      _this34._config = t;
      var _this34$_config = _this34._config,
        a = _this34$_config.new_assistant,
        c = _this34$_config.thread_id,
        l = _this34$_config.load_thread_history;
      Object.assign(_this34._newAssistantDetails, a), c && (_this34.sessionId = c), l && (_this34.shouldFetchHistory = !0);
    }
    _this34.maxMessages = 1, _this34._isSSEStream = !!(_this34.stream && (_typeof(_this34.stream) != "object" || !_this34.stream.simulation));
    return _this34;
  }
  _inherits(At, _T5);
  return _createClass(At, [{
    key: "fetchHistoryFunc",
    value: function () {
      var _fetchHistoryFunc = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee81() {
        var _this35 = this;
        var e, _t26;
        return _regenerator().w(function (_context81) {
          while (1) switch (_context81.p = _context81.n) {
            case 0:
              setTimeout(function () {
                return _this35.deepChat.disableSubmitButton();
              }, 2);
              _context81.p = 1;
              _context81.n = 2;
              return this.getThreadMessages(this.sessionId, !0);
            case 2:
              e = _context81.v;
              return _context81.a(2, (this.deepChat.disableSubmitButton(!1), e));
            case 3:
              _context81.p = 3;
              _t26 = _context81.v;
              return _context81.a(2, [_defineProperty({}, f, "Failed to fetch history")]);
          }
        }, _callee81, this, [[1, 3]]);
      }));
      function fetchHistoryFunc() {
        return _fetchHistoryFunc.apply(this, arguments);
      }
      return fetchHistoryFunc;
    }()
  }, {
    key: "processMessage",
    value: function processMessage(e, t) {
      var n = this.totalMessagesMaxCharLength || -1,
        s = an.getCharacterLimitMessages(e, n)[0];
      if (t && t.length > 0) {
        var r = this.filesToolType;
        if (typeof this.filesToolType == "function") {
          var a = this.filesToolType(t.map(function (_ref62) {
            var c = _ref62.name;
            return c;
          }));
          a === "code_interpreter" || a === "file_search" || a === z ? r = a : (console[f]("Tool type \"".concat(a, "\" is not valid")), console[f]('Expected "code_interpreter" or "file_search" or "images". Going to default to "images"'));
        }
        if (r === "file_search") return At.processAttachmentsMessage(s, t, "file_search");
        if (r === "code_interpreter") return At.processAttachmentsMessage(s, t, "code_interpreter");
        if (t.find(function (_ref63) {
          var a = _ref63.name;
          return !ae.isImageFileExtension(a);
        })) console[f]("The uploaded files contained a non-image file"), console[f]('Make sure only images can be uploaded or define a "code_interpreter" or "file_search" value in the "files_tool_type" property'), console.warn('Make sure your existing assistant supports these "tools" or specify them in the "new_assistant" property');else {
          var _a3 = At.processImageMessage(s, t);
          if (_a3) return _a3;
        }
      }
      return {
        content: s[h] || "",
        role: U
      };
    }
  }, {
    key: "createNewThreadMessages",
    value: function createNewThreadMessages(e, t, n) {
      var s = JSON.parse(JSON.stringify(e)),
        r = this.processMessage(t, n);
      return s.thread = {
        messages: [r]
      }, s;
    }
  }, {
    key: "callService",
    value: function callService(e, t, n) {
      if (this.messages = e, this.sessionId) {
        this.url = "".concat(this.urlSegments.threadsPrefix, "/").concat(this.sessionId, "/messages").concat(this.urlSegments.createMessagePostfix);
        var s = this.processMessage(t, n);
        ne.request(this, s, e);
      } else {
        this.url = "".concat(this.urlSegments.threadsPrefix, "/runs").concat(this.urlSegments.threadsPosfix);
        var _s5 = this.createNewThreadMessages(this.rawBody, t, n);
        this._isSSEStream ? this.createStreamRun(_s5) : ne.request(this, _s5, e);
      }
    }
  }, {
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI1 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee82(e, t, n) {
        var _r$assistant_id;
        var r, s, _t27, _t28;
        return _regenerator().w(function (_context82) {
          while (1) switch (_context82.n) {
            case 0:
              if (!(this._waitingForStreamResponse = !1, !this.connectSettings)) {
                _context82.n = 1;
                break;
              }
              throw new Error(Ie);
            case 1:
              if (!((_r$assistant_id = (r = this.rawBody).assistant_id) !== null && _r$assistant_id !== void 0)) {
                _context82.n = 2;
                break;
              }
              _r$assistant_id;
              _context82.n = 5;
              break;
            case 2:
              _t27 = this._config.assistant_id;
              if (_t27) {
                _context82.n = 4;
                break;
              }
              _context82.n = 3;
              return this.createNewAssistant();
            case 3:
              _t27 = _context82.v;
            case 4:
              r.assistant_id = _t27;
            case 5:
              this._searchedForThreadId || this.searchPreviousMessagesForThreadId(e.messageToElements);
              if (!n) {
                _context82.n = 7;
                break;
              }
              _context82.n = 6;
              return ct.storeFiles(this, e, n, this.urlSegments.storeFiles);
            case 6:
              _t28 = _context82.v;
              _context82.n = 8;
              break;
            case 7:
              _t28 = void 0;
            case 8:
              s = _t28;
              this.connectSettings.method = fe, this.callService(e, t, s);
            case 9:
              return _context82.a(2);
          }
        }, _callee82, this);
      }));
      function callServiceAPI(_x174, _x175, _x176) {
        return _callServiceAPI1.apply(this, arguments);
      }
      return callServiceAPI;
    }()
  }, {
    key: "createNewAssistant",
    value: function () {
      var _createNewAssistant = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee83() {
        var e, _t29;
        return _regenerator().w(function (_context83) {
          while (1) switch (_context83.p = _context83.n) {
            case 0:
              _context83.p = 0;
              this.url = this.urlSegments.newAssistantUrl;
              _context83.n = 1;
              return Xt(this, JSON.parse(JSON.stringify(this._newAssistantDetails)), fe);
            case 1:
              e = _context83.v;
              return _context83.a(2, (this._config.assistant_id = e.id, this._config.assistant_id));
            case 2:
              _context83.p = 2;
              _t29 = _context83.v;
              console[f](_t29), console[f]("Failed to create a new assistant");
            case 3:
              return _context83.a(2);
          }
        }, _callee83, this, [[0, 2]]);
      }));
      function createNewAssistant() {
        return _createNewAssistant.apply(this, arguments);
      }
      return createNewAssistant;
    }()
  }, {
    key: "searchPreviousMessagesForThreadId",
    value: function searchPreviousMessagesForThreadId(e) {
      var t = e.find(function (_ref64) {
        var _ref65 = _slicedToArray(_ref64, 1),
          n = _ref65[0];
        return n._sessionId;
      });
      t && (this.sessionId = t[0]._sessionId), this._searchedForThreadId = !0;
    }
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData12 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee84(e) {
        var s, t, n;
        return _regenerator().w(function (_context84) {
          while (1) switch (_context84.n) {
            case 0:
              if (!(this._waitingForStreamResponse || this._isSSEStream && this.sessionId)) {
                _context84.n = 2;
                break;
              }
              _context84.n = 1;
              return this.handleStream(e);
            case 1:
              return _context84.a(2, _context84.v);
            case 2:
              if (!e[f]) {
                _context84.n = 3;
                break;
              }
              throw e[f].message.startsWith(ct.FILES_WITH_TEXT_ERROR) ? Error("Please send text with your file(s)") : e[f].message;
            case 3:
              this.asyncCallInProgress = !0;
              _context84.n = 4;
              return this.assignThreadAndRun(e);
            case 4:
              t = "".concat(this.urlSegments.threadsPrefix, "/").concat(this.sessionId, "/runs/").concat(this.run_id).concat(this.urlSegments.threadsPosfix), n = {
                method: re,
                headers: (s = this.connectSettings) == null ? void 0 : s.headers
              };
              return _context84.a(2, (ne.executePollRequest(this, t, n, this.messages), _defineProperty({}, h, "")));
          }
        }, _callee84, this);
      }));
      function extractResultData(_x177) {
        return _extractResultData12.apply(this, arguments);
      }
      return extractResultData;
    }()
  }, {
    key: "assignThreadAndRun",
    value: function () {
      var _assignThreadAndRun = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee85(e) {
        var t;
        return _regenerator().w(function (_context85) {
          while (1) switch (_context85.n) {
            case 0:
              if (!this.sessionId) {
                _context85.n = 2;
                break;
              }
              this.url = "".concat(this.urlSegments.threadsPrefix, "/").concat(this.sessionId, "/runs").concat(this.urlSegments.threadsPosfix);
              _context85.n = 1;
              return Xt(this, JSON.parse(JSON.stringify(this.rawBody)), fe);
            case 1:
              t = _context85.v;
              this.run_id = t.id;
              _context85.n = 3;
              break;
            case 2:
              this.sessionId = e.thread_id, this.run_id = e.id, this.messages && this.messages.messageToElements.length > 0 && (this.messages.messageToElements[this.messages.messageToElements.length - 1][0]._sessionId = this.sessionId);
            case 3:
              return _context85.a(2);
          }
        }, _callee85, this);
      }));
      function assignThreadAndRun(_x178) {
        return _assignThreadAndRun.apply(this, arguments);
      }
      return assignThreadAndRun;
    }()
  }, {
    key: "getThreadMessages",
    value: function () {
      var _getThreadMessages = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee86(e) {
        var t,
          s,
          r,
          n,
          _args86 = arguments,
          _t30;
        return _regenerator().w(function (_context86) {
          while (1) switch (_context86.n) {
            case 0:
              t = _args86.length > 1 && _args86[1] !== undefined ? _args86[1] : !1;
              this.url = "".concat(this.urlSegments.threadsPrefix, "/").concat(e, "/messages?").concat(this.urlSegments.listMessagesPostfix);
              _context86.n = 1;
              return Xt(this, {}, re);
            case 1:
              n = _context86.v;
              _t30 = !t && this.deepChat.responseInterceptor;
              if (!_t30) {
                _context86.n = 3;
                break;
              }
              _context86.n = 2;
              return (r = (s = this.deepChat).responseInterceptor) == null ? void 0 : r.call(s, n);
            case 2:
              n = _context86.v;
            case 3:
              return _context86.a(2, ct.processAPIMessages(this, n, t, this.urlSegments));
          }
        }, _callee86, this);
      }));
      function getThreadMessages(_x179) {
        return _getThreadMessages.apply(this, arguments);
      }
      return getThreadMessages;
    }()
  }, {
    key: "extractPollResultData",
    value: function () {
      var _extractPollResultData4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee87(e) {
        var _this36 = this;
        var r, t, n, o, _o$shift, a, c, s;
        return _regenerator().w(function (_context87) {
          while (1) switch (_context87.n) {
            case 0:
              t = e.status, n = e.required_action;
              if (!(t === "queued" || t === "in_progress")) {
                _context87.n = 1;
                break;
              }
              return _context87.a(2, {
                timeoutMS: At.POLLING_TIMEOUT_MS
              });
            case 1:
              if (!(t === Yr && this.messages)) {
                _context87.n = 3;
                break;
              }
              _context87.n = 2;
              return this.getThreadMessages(e.thread_id);
            case 2:
              o = _context87.v;
              _o$shift = o.shift();
              a = _o$shift.text;
              c = _o$shift.files;
              return _context87.a(2, (setTimeout(function () {
                o.forEach(function (l) {
                  return _this36.deepChat.addMessage(l);
                });
              }), _defineProperty({
                text: a,
                _sessionId: this.sessionId
              }, y, c)));
            case 3:
              s = (r = n == null ? void 0 : n.submit_tool_outputs) == null ? void 0 : r.tool_calls;
              if (!(t === "requires_action" && s)) {
                _context87.n = 5;
                break;
              }
              _context87.n = 4;
              return this.handleTools(s);
            case 4:
              return _context87.a(2, _context87.v);
            case 5:
              throw Error("Thread run status: ".concat(t));
            case 6:
              return _context87.a(2);
          }
        }, _callee87, this);
      }));
      function extractPollResultData(_x180) {
        return _extractPollResultData4.apply(this, arguments);
      }
      return extractPollResultData;
    }() // prettier-ignore
  }, {
    key: "handleTools",
    value: function () {
      var _handleTools = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee88(e) {
        var t, n, s, r, o, a;
        return _regenerator().w(function (_context88) {
          while (1) switch (_context88.n) {
            case 0:
              if (this.functionHandler) {
                _context88.n = 1;
                break;
              }
              throw Error(dn);
            case 1:
              t = e.map(function (c) {
                return {
                  name: c["function"].name,
                  arguments: c["function"].arguments
                };
              });
              _context88.n = 2;
              return this.functionHandler(t);
            case 2:
              n = _context88.v;
              if (!(!Array.isArray(n) || e.length !== n.length)) {
                _context88.n = 3;
                break;
              }
              throw Error(ct.FUNCTION_TOOL_RESP_ERROR);
            case 3:
              _context88.n = 4;
              return Promise.all(n);
            case 4:
              s = _context88.v;
              if (!s.find(function (c) {
                return typeof c != "string";
              })) {
                _context88.n = 5;
                break;
              }
              throw Error(ct.FUNCTION_TOOL_RESP_ERROR);
            case 5:
              r = s.map(function (c, l) {
                return {
                  tool_call_id: e[l].id,
                  output: c
                };
              }), o = "".concat(this.urlSegments.threadsPrefix, "/").concat(this.sessionId), a = "/runs/".concat(this.run_id, "/submit_tool_outputs").concat(this.urlSegments.threadsPosfix);
              this.url = "".concat(o).concat(a);
              if (!this._isSSEStream) {
                _context88.n = 7;
                break;
              }
              _context88.n = 6;
              return this.createStreamRun({
                tool_outputs: r
              });
            case 6:
              _context88.n = 8;
              break;
            case 7:
              _context88.n = 8;
              return Xt(this, {
                tool_outputs: r
              }, fe);
            case 8:
              return _context88.a(2, {
                timeoutMS: At.POLLING_TIMEOUT_MS
              });
          }
        }, _callee88, this);
      }));
      function handleTools(_x181) {
        return _handleTools.apply(this, arguments);
      }
      return handleTools;
    }()
  }, {
    key: "handleStream",
    value: function () {
      var _handleStream = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee89(e) {
        var n, s, t, r;
        return _regenerator().w(function (_context89) {
          while (1) switch (_context89.n) {
            case 0:
              t = (s = (n = e.required_action) == null ? void 0 : n.submit_tool_outputs) == null ? void 0 : s.tool_calls;
              if (!(e.status === "requires_action" && t)) {
                _context89.n = 2;
                break;
              }
              this.run_id = e.id;
              _context89.n = 1;
              return this.handleTools(t);
            case 1:
              return _context89.a(2, _context89.v);
            case 2:
              if (!this._waitingForStreamResponse) {
                _context89.n = 3;
                break;
              }
              return _context89.a(2, this.parseStreamResult(e));
            case 3:
              if (this._isSSEStream && this.sessionId) {
                this.asyncCallInProgress = !0, this.url = "".concat(this.urlSegments.threadsPrefix, "/").concat(this.sessionId, "/runs").concat(this.urlSegments.threadsPosfix);
                r = JSON.parse(JSON.stringify(this.rawBody));
                this.createStreamRun(r);
              }
              return _context89.a(2, _defineProperty({}, h, ""));
          }
        }, _callee89, this);
      }));
      function handleStream(_x182) {
        return _handleStream.apply(this, arguments);
      }
      return handleStream;
    }() // prettier-ignore
  }, {
    key: "parseStreamResult",
    value: function () {
      var _parseStreamResult = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee90(e) {
        var t, n, s, r, o, a, c, l, _a4, _c3;
        return _regenerator().w(function (_context90) {
          while (1) switch (_context90.n) {
            case 0:
              if (!(e.content && e.content.length > 0 && this.messages)) {
                _context90.n = 1;
                break;
              }
              a = e.content.find(function (c) {
                return c[h];
              });
              if (!((t = a == null ? void 0 : a[h]) != null && t.annotations && a[h].annotations.length > 0)) {
                _context90.n = 1;
                break;
              }
              c = e.content.find(function (d) {
                return !!d[h];
              }) || e.content[0], l = ct.getFilesAndText.bind(this, this, {
                role: gt,
                content: e.content
              }, this.urlSegments, c);
              return _context90.a(2, ((n = this._messageStream) == null || n.endStreamAfterFileDownloaded(this.messages, l), _defineProperty({}, h, "")));
            case 1:
              if (!((s = e.delta) != null && s.content)) {
                _context90.n = 4;
                break;
              }
              if (!(e.delta.content.length > 1)) {
                _context90.n = 3;
                break;
              }
              _a4 = e.delta.content.find(function (c) {
                return c[h];
              });
              if (!((r = _a4 == null ? void 0 : _a4[h]) != null && r.annotations && _a4[h].annotations.length === 0)) {
                _context90.n = 3;
                break;
              }
              _context90.n = 2;
              return ct.processStreamMessages(this, e.delta.content, this.urlSegments);
            case 2:
              _c3 = _context90.v;
              return _context90.a(2, _defineProperty(_defineProperty({}, h, _c3[0][h]), y, _c3[1][y]));
            case 3:
              return _context90.a(2, _defineProperty({}, h, (o = e.delta.content[0][h]) == null ? void 0 : o.value));
            case 4:
              return _context90.a(2, (!this.sessionId && e.thread_id && (this.sessionId = e.thread_id), _defineProperty({}, h, "")));
          }
        }, _callee90, this);
      }));
      function parseStreamResult(_x183) {
        return _parseStreamResult.apply(this, arguments);
      }
      return parseStreamResult;
    }() // https://platform.openai.com/docs/api-reference/assistants-streaming
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }, {
    key: "createStreamRun",
    value: function () {
      var _createStreamRun = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee91(e) {
        return _regenerator().w(function (_context91) {
          while (1) switch (_context91.n) {
            case 0:
              e.stream = !0;
              this._waitingForStreamResponse = !0;
              _context91.n = 1;
              return D.request(this, e, this.messages, !0, !0);
            case 1:
              this._messageStream = _context91.v;
            case 2:
              return _context91.a(2);
          }
        }, _callee91, this);
      }));
      function createStreamRun(_x184) {
        return _createStreamRun.apply(this, arguments);
      }
      return createStreamRun;
    }()
  }], [{
    key: "processImageMessage",
    value: function processImageMessage(e, t) {
      var n = t == null ? void 0 : t.filter(function (s) {
        return ae.isImageFileExtension(s.name);
      }).map(function (s) {
        return _defineProperty(_defineProperty({}, C, "image_file"), "image_file", {
          file_id: s.id
        });
      });
      if (n && n.length > 0) return e[h] && e[h].length > 0 && n.push(_defineProperty(_defineProperty({}, C, h), h, e[h])), {
        content: n,
        role: U
      };
    }
  }, {
    key: "processAttachmentsMessage",
    value: function processAttachmentsMessage(e, t, n) {
      return {
        attachments: t.map(function (r) {
          return {
            tools: [_defineProperty({}, C, n)],
            file_id: r.id
          };
        }),
        content: [_defineProperty(_defineProperty({}, C, h), h, e[h])],
        role: U
      };
    }
  }]);
}(T);
At.POLLING_TIMEOUT_MS = 500;
var Rs = At;
var Bi = /*#__PURE__*/function (_Rs) {
  function Bi(e) {
    var _a$headers, _c$OpenAIBeta;
    var _this37;
    _classCallCheck(this, Bi);
    var o, a, c, l, d;
    var t = JSON.parse(JSON.stringify(e.directConnection)),
      n = t.openAI,
      s = (o = t.openAI) == null ? void 0 : o.assistant,
      r = Bi.buildUrlSegments(s);
    if (_this37 = _callSuper(this, Bi, [e, s, r, pn(), un, n]), (_a$headers = (a = _this37.connectSettings).headers) !== null && _a$headers !== void 0 ? _a$headers : a.headers = {}, (_c$OpenAIBeta = (c = _this37.connectSettings.headers)["OpenAI-Beta"]) !== null && _c$OpenAIBeta !== void 0 ? _c$OpenAIBeta : c["OpenAI-Beta"] = "assistants=v2", _this37.shouldFetchHistory && _this37.sessionId && (_this37.fetchHistory = _this37.fetchHistoryFunc.bind(_assertThisInitialized(_this37))), _typeof(s) === L) {
      var _ref76 = (d = (l = e.directConnection) == null ? void 0 : l.openAI) == null ? void 0 : d.assistant,
        p = _ref76.function_handler,
        u = _ref76.files_tool_type;
      p && (_this37._functionHandlerI = p), u && (_this37.filesToolType = u);
    }
    return _this37;
  }
  _inherits(Bi, _Rs);
  return _createClass(Bi, null, [{
    key: "buildUrlSegments",
    value: function buildUrlSegments(e) {
      var t = _typeof(e) == "object" && e.custom_base_url || "https://api.openai.com/v1";
      return {
        threadsPrefix: "".concat(t, "/threads"),
        threadsPosfix: "",
        newAssistantUrl: "".concat(t, "/assistants"),
        createMessagePostfix: "",
        listMessagesPostfix: "order=desc",
        storeFiles: "".concat(t, "/files"),
        getFilesPrefix: "".concat(t, "/files/"),
        getFilesPostfix: "/content"
      };
    }
  }]);
}(Rs);
var Is = "Please define the Azure URL Details. [More Information](".concat(q, "directConnection/Azure)"),
  uo = function uo(i) {
    return _defineProperty({
      "api-key": i
    }, B, V);
  },
  po = function po(i) {
    return oe("".concat(i.endpoint, "/openai/models?api-version=").concat(i.version), re, ho);
  },
  fo = function fo(i) {
    var e = i.endpoint,
      t = i.version,
      n = i.deploymentId;
    return e && t && n;
  },
  en = /*#__PURE__*/function (_Rs2) {
    function en(e) {
      var _E$headers;
      var _this38;
      _classCallCheck(this, en);
      var l, d, p, u, g, v, b, E;
      var t = JSON.parse(JSON.stringify(e.directConnection)),
        n = t.azure,
        s = (l = t.azure) == null ? void 0 : l.openAI,
        r = (s == null ? void 0 : s.urlDetails) || {},
        o = "".concat((d = s == null ? void 0 : s.urlDetails) == null ? void 0 : d.endpoint, "/openai/"),
        a = "?api-version=".concat((p = s == null ? void 0 : s.urlDetails) == null ? void 0 : p.version),
        c = {
          threadsPrefix: "".concat(o).concat(en.THREAD_RESOURCE),
          threadsPosfix: a,
          newAssistantUrl: "".concat(o).concat(en.NEW_ASSISTANT_RESOURCE).concat(a),
          createMessagePostfix: a,
          listMessagesPostfix: "order=desc&api-version=".concat((u = s == null ? void 0 : s.urlDetails) == null ? void 0 : u.version),
          storeFiles: "".concat(o, "files").concat(a),
          getFilesPrefix: "".concat(o, "files/"),
          getFilesPostfix: "/content".concat(a)
        };
      if (_this38 = _callSuper(this, en, [e, s == null ? void 0 : s.assistant, c, po(r), uo, n]), _this38.permittedErrorPrefixes = [Is], _this38.insertKeyPlaceholderText = _this38.genereteAPIKeyName("Azure OpenAI"), _this38.keyHelpUrl = "https://learn.microsoft.com/en-us/answers/questions/1193991/how-to-get-the-value-of-openai-api-key", _this38.isTextInputDisabled = !1, _typeof(s == null ? void 0 : s.assistant) === L) {
        var _ref78 = (b = (v = (g = e.directConnection) == null ? void 0 : g.azure) == null ? void 0 : v.openAI) == null ? void 0 : b.assistant,
          w = _ref78.function_handler,
          F = _ref78.files_tool_type;
        w && (_this38._functionHandlerI = w), F && (_this38.filesToolType = F);
      }
      fo(r) ? (_E$headers = (E = _this38.connectSettings).headers) !== null && _E$headers !== void 0 ? _E$headers : E.headers = {} : (_this38.isTextInputDisabled = !0, _this38.canSendMessage = function () {
        return !1;
      }, setTimeout(function () {
        e.addMessage(_defineProperty({}, f, Is));
      }));
      return _this38;
    }
    _inherits(en, _Rs2);
    return _createClass(en);
  }(Rs);
en.THREAD_RESOURCE = "threads", en.NEW_ASSISTANT_RESOURCE = "assistants";
var pi = en;
var Qc = "sts-session-started",
  el = "sts-session-stopped";
var te = /*#__PURE__*/function () {
  function te() {
    _classCallCheck(this, te);
  }
  return _createClass(te, null, [{
    key: "addAttributes",
    value: function addAttributes(e) {
      e.role = "button", e.setAttribute("tabindex", "0");
    }
  }, {
    key: "addAriaBusy",
    value: function addAriaBusy(e) {
      e.setAttribute("aria-busy", "true");
    }
  }, {
    key: "removeAriaBusy",
    value: function removeAriaBusy(e) {
      e.removeAttribute("aria-busy");
    }
  }, {
    key: "addAriaDisabled",
    value: function addAriaDisabled(e) {
      e.setAttribute("aria-disabled", "true");
    }
  }, {
    key: "removeAriaDisabled",
    value: function removeAriaDisabled(e) {
      e.removeAttribute("aria-disabled");
    }
  }, {
    key: "removeAriaAttributes",
    value: function removeAriaAttributes(e) {
      te.removeAriaBusy(e), te.removeAriaDisabled(e);
    }
  }]);
}();
var mo = "<?xml version=\"1.0\" encoding=\"iso-8859-1\"?>\n<svg height=\"1.4em\" width=\"1.4em\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n\t viewBox=\"0 0 490.9 490.9\" xml:space=\"preserve\">\n\t<g>\n\t\t<g>\n\t\t\t<path d=\"M245.5,322.9c53,0,96.2-43.2,96.2-96.2V96.2c0-53-43.2-96.2-96.2-96.2s-96.2,43.2-96.2,96.2v130.5\n\t\t\t\tC149.3,279.8,192.5,322.9,245.5,322.9z M173.8,96.2c0-39.5,32.2-71.7,71.7-71.7s71.7,32.2,71.7,71.7v130.5\n\t\t\t\tc0,39.5-32.2,71.7-71.7,71.7s-71.7-32.2-71.7-71.7V96.2z\"/>\n\t\t\t<path d=\"M94.4,214.5c-6.8,0-12.3,5.5-12.3,12.3c0,85.9,66.7,156.6,151.1,162.8v76.7h-63.9c-6.8,0-12.3,5.5-12.3,12.3\n\t\t\t\ts5.5,12.3,12.3,12.3h152.3c6.8,0,12.3-5.5,12.3-12.3s-5.5-12.3-12.3-12.3h-63.9v-76.7c84.4-6.3,151.1-76.9,151.1-162.8\n\t\t\t\tc0-6.8-5.5-12.3-12.3-12.3s-12.3,5.5-12.3,12.3c0,76.6-62.3,138.9-138.9,138.9s-138.9-62.3-138.9-138.9\n\t\t\t\tC106.6,220,101.2,214.5,94.4,214.5z\"/>\n\t\t</g>\n\t</g>\n</svg>\n",
  De = /*#__PURE__*/function () {
    function De() {
      _classCallCheck(this, De);
    }
    return _createClass(De, null, [{
      key: "createTextElement",
      value: function createTextElement(e) {
        var t = S();
        return t[m].add(De.INPUT_BUTTON_INNER_TEXT_CLASS), t.innerText = e, t;
      }
    }, {
      key: "tryAddSVGElement",
      value: function tryAddSVGElement(e, t, n, s) {
        n ? e.push(bt.createSVGElement(n)) : n !== "" && s && e.push(t);
      }
    }, {
      key: "createCustomElements",
      value: function createCustomElements(e, t, n) {
        var c, l;
        var s = n == null ? void 0 : n[e],
          r = (c = s == null ? void 0 : s[h]) == null ? void 0 : c.content,
          o = (l = s == null ? void 0 : s.svg) == null ? void 0 : l.content,
          a = [];
        return De.tryAddSVGElement(a, t, o, r), r && a.push(De.createTextElement(r)), a.length > 0 ? a : void 0;
      }
    }, {
      key: "reassignClassBasedOnChildren",
      value: function reassignClassBasedOnChildren(e, t) {
        e[m].remove(De.INPUT_BUTTON_SVG_CLASS, De.INPUT_BUTTON_SVG_TEXT_CLASS), t.find(function (n) {
          return n[m].contains(De.INPUT_BUTTON_INNER_TEXT_CLASS);
        }) ? t.length > 1 && e[m].add(De.INPUT_BUTTON_SVG_TEXT_CLASS) : e[m].add(De.INPUT_BUTTON_SVG_CLASS);
      }
    }]);
  }();
De.INPUT_BUTTON_SVG_TEXT_CLASS = "input-button-svg-text", De.INPUT_BUTTON_INNER_TEXT_CLASS = "text-button", De.INPUT_BUTTON_SVG_CLASS = "input-button-svg";
var ot = De;
var Hn = /*#__PURE__*/function () {
  function Hn() {
    _classCallCheck(this, Hn);
  }
  return _createClass(Hn, null, [{
    key: "parseSVGTextElements",
    value: function parseSVGTextElements(e) {
      return _defineProperty({
        svg: e.find(function (t) {
          return t.tagName.toLowerCase() === "svg";
        })
      }, h, e.find(function (t) {
        return t.tagName.toLowerCase() === "div";
      }));
    }
  }]);
}();
var ce = /*#__PURE__*/function () {
  function ce() {
    _classCallCheck(this, ce);
  }
  return _createClass(ce, null, [{
    key: "unsetAllCSS",
    value: function unsetAllCSS(e, t) {
      var r, o;
      t.container && Q.unsetAllCSSMouseStates(e, t.container);
      var _Hn$parseSVGTextEleme = Hn.parseSVGTextElements(Array.from(e.children)),
        n = _Hn$parseSVGTextEleme.svg,
        s = _Hn$parseSVGTextEleme.text;
      (r = t.svg) != null && r.styles && n && Q.unsetAllCSSMouseStates(n, t.svg.styles), (o = t[h]) != null && o.styles && s && Q.unsetAllCSSMouseStates(s, t[h].styles);
    }
  }, {
    key: "unsetActionCSS",
    value: function unsetActionCSS(e, t) {
      var r, o;
      t.container && Q.unsetActivityCSSMouseStates(e, t.container);
      var _Hn$parseSVGTextEleme2 = Hn.parseSVGTextElements(Array.from(e.children)),
        n = _Hn$parseSVGTextEleme2.svg,
        s = _Hn$parseSVGTextEleme2.text;
      (r = t.svg) != null && r.styles && n && Q.unsetActivityCSSMouseStates(n, t.svg.styles), (o = t[h]) != null && o.styles && s && Q.unsetActivityCSSMouseStates(s, t[h].styles);
    }
  }, {
    key: "setElementsCSS",
    value: function setElementsCSS(e, t, n) {
      var o, a, c, l, d;
      Object.assign(e[_], (o = t.container) == null ? void 0 : o[n]);
      var _Hn$parseSVGTextEleme3 = Hn.parseSVGTextElements(Array.from(e.children)),
        s = _Hn$parseSVGTextEleme3.svg,
        r = _Hn$parseSVGTextEleme3.text;
      s && Object.assign(s[_], (c = (a = t.svg) == null ? void 0 : a.styles) == null ? void 0 : c[n]), r && Object.assign(r[_], (d = (l = t[h]) == null ? void 0 : l.styles) == null ? void 0 : d[n]);
    }
  }, {
    key: "setElementCssUpToState",
    value: function setElementCssUpToState(e, t, n) {
      ce.setElementsCSS(e, t, x), n !== x && (ce.setElementsCSS(e, t, Ce), n !== Ce && ce.setElementsCSS(e, t, H));
    }
  }]);
}();
var Jt = /*#__PURE__*/function () {
  // prettier-ignore
  function Jt(e, t, n, s, r, o) {
    _classCallCheck(this, Jt);
    this._mouseState = {
      state: "default"
    }, this.isCustom = !1, te.addAttributes(e), this.elementRef = e, this.svg = bt.createSVGElement(t), this.customStyles = r, this.position = n, this._tooltipSettings = s, this.dropupText = o;
  }
  return _createClass(Jt, [{
    key: "buttonMouseLeave",
    value: function buttonMouseLeave(e) {
      var t;
      this._mouseState.state = x, ((t = this._activeTooltip) == null ? void 0 : t.element[_].visibility) === "visible" && this._tooltipSettings && Qe.hide(this._activeTooltip, this._tooltipSettings), e && (ce.unsetAllCSS(this.elementRef, e), ce.setElementsCSS(this.elementRef, e, x));
    }
  }, {
    key: "buttonMouseEnter",
    value: function buttonMouseEnter(e) {
      var t;
      this._mouseState.state = Ce, this._tooltipSettings && (this._activeTooltip = Qe.display(this.elementRef, this._tooltipSettings, (t = this._activeTooltip) == null ? void 0 : t.element)), e && ce.setElementsCSS(this.elementRef, e, Ce);
    }
  }, {
    key: "buttonMouseUp",
    value: function buttonMouseUp(e) {
      e && ce.unsetActionCSS(this.elementRef, e), this.buttonMouseEnter(e);
    }
  }, {
    key: "buttonMouseDown",
    value: function buttonMouseDown(e) {
      this._mouseState.state = H, e && ce.setElementsCSS(this.elementRef, e, H);
    }
    // be careful not to use onclick as that is used for button functionality
  }, {
    key: "setEvents",
    value: function setEvents(e) {
      this.elementRef.onmousedown = this.buttonMouseDown.bind(this, e), this.elementRef.onmouseup = this.buttonMouseUp.bind(this, e), this.elementRef.onmouseenter = this.buttonMouseEnter.bind(this, e), this.elementRef.onmouseleave = this.buttonMouseLeave.bind(this, e);
    }
  }, {
    key: "unsetCustomStateStyles",
    value: function unsetCustomStateStyles(e) {
      if (this.customStyles) for (var t = 0; t < e.length; t += 1) {
        var _n2 = e[t],
          s = _n2 && this.customStyles[_n2];
        s && ce.unsetActionCSS(this.elementRef, s);
      }
    }
  }, {
    key: "reapplyStateStyle",
    value: function reapplyStateStyle(e, t) {
      if (!this.customStyles) return;
      t && this.unsetCustomStateStyles(t);
      var n = this.customStyles[e];
      n && ce.setElementCssUpToState(this.elementRef, n, this._mouseState.state), this.setEvents(n);
    }
  }, {
    key: "changeElementsByState",
    value: function changeElementsByState(e) {
      var _this$elementRef;
      (_this$elementRef = this.elementRef).replaceChildren.apply(_this$elementRef, _toConsumableArray(e)), ot.reassignClassBasedOnChildren(this.elementRef, e);
    }
  }, {
    key: "buildDefaultIconElement",
    value: function buildDefaultIconElement(e) {
      var t = this.svg.cloneNode(!0);
      return t.id = e, [t];
    }
  }, {
    key: "createInnerElements",
    value: function createInnerElements(e, t, n) {
      var s = ot.createCustomElements(t, this.svg, n);
      if (s && s.length > 0) {
        if (this.position === je) {
          var r = this.svg.cloneNode(!0);
          r.id = s[0] === this.svg ? e : "dropup-menu-item-icon-element-custom", s[0] = r;
        }
        return s;
      }
      return this.buildDefaultIconElement(e);
    }
  }]);
}();
var Us = /*#__PURE__*/function (_Jt) {
  function Us(e) {
    var _this39;
    _classCallCheck(this, Us);
    var n, s;
    var t = ((s = (n = e == null ? void 0 : e[x]) == null ? void 0 : n.svg) == null ? void 0 : s.content) || Us.EMPTY_SVG;
    _this39 = _callSuper(this, Us, [S(), t, void 0, void 0, e]), _this39.isActive = !1, _this39._innerElements = _this39.createInnerElementsForStates(_this39.customStyles), _this39.changeToDefault();
    return _this39;
  }
  _inherits(Us, _Jt);
  return _createClass(Us, [{
    key: "createInnerElementsForStates",
    value: function createInnerElementsForStates(e) {
      return _defineProperty(_defineProperty(_defineProperty({}, x, this.createInnerButtonElements(x, e)), "active", this.createInnerButtonElements("active", e)), "unavailable", this.createInnerButtonElements("unavailable", e));
    }
  }, {
    key: "createInnerButtonElements",
    value: function createInnerButtonElements(e, t) {
      return ot.createCustomElements(e, this.svg, t) || [this.svg];
    }
  }, {
    key: "changeState",
    value: function changeState(e) {
      this.changeElementsByState(e), this.elementRef[m].replace(ot.INPUT_BUTTON_SVG_CLASS, "deep-chat-openai-realtime-button");
    }
  }, {
    key: "changeToActive",
    value: function changeToActive() {
      this.changeState(this._innerElements.active), this.reapplyStateStyle("active", ["unavailable", x]), this.isActive = !0;
    }
  }, {
    key: "changeToDefault",
    value: function changeToDefault() {
      var e, t, n, s;
      this.changeState(this._innerElements[x]), (e = this.customStyles) != null && e.active && ce.unsetAllCSS(this.elementRef, (t = this.customStyles) == null ? void 0 : t.active), (n = this.customStyles) != null && n.unavailable && ce.unsetAllCSS(this.elementRef, (s = this.customStyles) == null ? void 0 : s.unavailable), this.reapplyStateStyle(x, ["active", "unavailable"]), this.isActive = !1;
    }
  }, {
    key: "changeToUnavailable",
    value: function changeToUnavailable() {
      var e, t, n, s;
      this.changeState(this._innerElements.unavailable), (e = this.customStyles) != null && e.active && ce.unsetAllCSS(this.elementRef, (t = this.customStyles) == null ? void 0 : t.active), (n = this.customStyles) != null && n[x] && ce.unsetAllCSS(this.elementRef, (s = this.customStyles) == null ? void 0 : s[x]), this.reapplyStateStyle("unavailable", [x, "active"]), this.isActive = !1;
    }
  }]);
}(Jt);
Us.EMPTY_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"></svg>';
var Ms = Us;
var Ee = /*#__PURE__*/function () {
  function Ee() {
    _classCallCheck(this, Ee);
  }
  return _createClass(Ee, null, [{
    key: "setPropertyValueIfDoesNotExist",
    value: function setPropertyValueIfDoesNotExist(e, t, n) {
      var _e$s, _e$s2;
      var s = t[0];
      t.length === 1 ? (_e$s = e[s]) !== null && _e$s !== void 0 ? _e$s : e[s] = n : ((_e$s2 = e[s]) !== null && _e$s2 !== void 0 ? _e$s2 : e[s] = {}, t.shift(), Ee.setPropertyValueIfDoesNotExist(e[s], t, n));
    }
  }, {
    key: "setPropertyValue",
    value: function setPropertyValue(e, t, n) {
      var _e$s3;
      var s = t[0];
      t.length === 1 ? e[s] = n : ((_e$s3 = e[s]) !== null && _e$s3 !== void 0 ? _e$s3 : e[s] = {}, t.shift(), Ee.setPropertyValue(e[s], t, n));
    }
  }, {
    key: "getObjectValue",
    value: function getObjectValue(e, t) {
      var n = t[0],
        s = e[n];
      return s === void 0 || t.length === 1 ? s : Ee.getObjectValue(s, t.slice(1));
    }
  }, {
    key: "overwritePropertyObjectFromAnother",
    value: function overwritePropertyObjectFromAnother(e, t, n) {
      var s = Ee.getObjectValue(t, n);
      if (s) {
        var r = _objectSpread(_objectSpread({}, s), Ee.getObjectValue(e, n) || {});
        Ee.setPropertyValue(e, n, r);
      }
    }
  }, {
    key: "isJson",
    value: function isJson(e) {
      try {
        return JSON.stringify(e), !0;
      } catch (_unused8) {
        return !1;
      }
    }
    // prettier-ignore
  }, {
    key: "assignPropertyFromOneToAnother",
    value: function assignPropertyFromOneToAnother(e, t, n) {
      var _t$e;
      (_t$e = t[e]) !== null && _t$e !== void 0 ? _t$e : t[e] = {}, Object.assign(t[e], n == null ? void 0 : n[e]);
    }
  }]);
}();
var go = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<svg viewBox=\"0 0 32 32\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\">\n  <path d=\"M5.92 24.096q0 1.088 0.928 1.728 0.512 0.288 1.088 0.288 0.448 0 0.896-0.224l16.16-8.064q0.48-0.256 0.8-0.736t0.288-1.088-0.288-1.056-0.8-0.736l-16.16-8.064q-0.448-0.224-0.896-0.224-0.544 0-1.088 0.288-0.928 0.608-0.928 1.728v16.16z\"></path>\n</svg>",
  fi = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<svg viewBox=\"0 0 32 32\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M5.92 24.096q0 0.832 0.576 1.408t1.44 0.608h16.128q0.832 0 1.44-0.608t0.576-1.408v-16.16q0-0.832-0.576-1.44t-1.44-0.576h-16.128q-0.832 0-1.44 0.576t-0.576 1.44v16.16z\"></path>\n</svg>",
  G = /*#__PURE__*/function (_T6) {
    function G(e) {
      var _l$model;
      var _this40;
      _classCallCheck(this, G);
      var r, o, a, c, l;
      var t = JSON.parse(JSON.stringify(e.directConnection)),
        n = G.getKey(e);
      _this40 = _callSuper(this, G, [e, pn(), un, {
        key: n
      }]), _this40.insertKeyPlaceholderText = _this40.genereteAPIKeyName("OpenAI"), _this40.keyHelpUrl = "https://platform.openai.com/account/api-keys", _this40._microphoneButton = null, _this40._toggleButton = null, _this40._errorElement = null, _this40._loadingElement = null, _this40._pc = null, _this40._mediaStream = null, _this40._isMuted = !1;
      var s = (r = t.openAI) == null ? void 0 : r.realtime;
      if (_typeof(s) === L) {
        _this40._avatarConfig = s.avatar, _this40._ephemeralKey = s.ephemeralKey, _this40._errorConfig = s[f], _this40._loadingConfig = s.loading, Object.assign(_this40.rawBody, s.config);
        var d = (a = (o = e.directConnection) == null ? void 0 : o.openAI) == null ? void 0 : a.realtime,
          _ref81 = d.config || {},
          p = _ref81.function_handler;
        p && (_this40._functionHandlerI = p), _this40._events = s.events, d.methods = _this40.generateMethods(), _this40.setInputAudioTranscribe(e, (c = d.config) == null ? void 0 : c.input_audio_transcription);
      }
      (_l$model = (l = _this40.rawBody).model) !== null && _l$model !== void 0 ? _l$model : l.model = "gpt-4o-realtime-preview-2025-06-03", _this40._avatarConfig = G.buildAvatarConfig(s), _this40._buttonsConfig = G.buildButtonsConfig(s), _this40._avatarEl = G.createAvatar(_this40._avatarConfig), _this40._containerEl = _this40.createContainer(), _this40._deepChat = e;
      return _this40;
    }
    _inherits(G, _T6);
    return _createClass(G, [{
      key: "setInputAudioTranscribe",
      value:
      // https://community.openai.com/t/unable-to-access-user-audio-transcript-in-realtime-api/1001570/3
      function setInputAudioTranscribe(e, t) {
        if (t) {
          var _n3 = "whisper-1";
          _typeof(t) == "object" ? this.rawBody.input_audio_transcription = {
            model: t.model || _n3,
            language: t.language,
            prompt: t.prompt
          } : this.rawBody.input_audio_transcription = {
            model: _n3
          };
        } else e.onMessage && (console.warn("To get user audio transcription, set `input_audio_transcription` in the `realtime` config."), console.warn("See: ".concat(q, "directConnection/OpenAI/OpenAIRealtime#OpenAIRealtimeConfig")));
      }
      // called after API key was inserted
    }, {
      key: "setUpView",
      value: function setUpView(e, t) {
        e[_].display = "none", t.appendChild(this._containerEl), this.setup();
      }
    }, {
      key: "setup",
      value: function () {
        var _setup = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee92() {
          var s, e, t, n;
          return _regenerator().w(function (_context92) {
            while (1) switch (_context92.n) {
              case 0:
                e = (s = this._deepChat.directConnection) == null ? void 0 : s.openAI;
                if (e) {
                  _context92.n = 1;
                  break;
                }
                return _context92.a(2);
              case 1:
                t = e == null ? void 0 : e.realtime;
                if (!(_typeof(t) != "object" || !t.autoStart && !t.autoFetchEphemeralKey)) {
                  _context92.n = 2;
                  break;
                }
                return _context92.a(2);
              case 2:
                n = this.key || e.key;
                (t.fetchEphemeralKey || n) && t.autoStart && (this.changeToUnavailable(), this.displayLoading()), this.fetchEphemeralKey(t.autoStart);
              case 3:
                return _context92.a(2);
            }
          }, _callee92, this);
        }));
        function setup() {
          return _setup.apply(this, arguments);
        }
        return setup;
      }()
    }, {
      key: "fetchEphemeralKey",
      value: function () {
        var _fetchEphemeralKey = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee93(e) {
          var o, t, n, s, r, a, _t31, _t32, _t33;
          return _regenerator().w(function (_context93) {
            while (1) switch (_context93.p = _context93.n) {
              case 0:
                t = (o = this._deepChat.directConnection) == null ? void 0 : o.openAI, n = _typeof(t == null ? void 0 : t.realtime) == "object" ? t == null ? void 0 : t.realtime.fetchEphemeralKey : void 0, s = t == null ? void 0 : t.realtime, r = this.key || t.key;
                if (!(_typeof(s) == "object")) {
                  _context93.n = 8;
                  break;
                }
                if (this._ephemeralKey) {
                  _context93.n = 7;
                  break;
                }
                _context93.p = 1;
                if (!n) {
                  _context93.n = 3;
                  break;
                }
                a = n();
                a.then && (this._retrievingEphemeralKey = a);
                _context93.n = 2;
                return a;
              case 2:
                this._ephemeralKey = _context93.v;
                _context93.n = 5;
                break;
              case 3:
                _t31 = r;
                if (!_t31) {
                  _context93.n = 5;
                  break;
                }
                this._retrievingEphemeralKey = this.getEphemeralKey(r);
                _context93.n = 4;
                return this._retrievingEphemeralKey;
              case 4:
                this._ephemeralKey = _context93.v;
              case 5:
                _context93.n = 7;
                break;
              case 6:
                _context93.p = 6;
                _t32 = _context93.v;
                this.displayFailedToRetrieveEphemeralKey(_t32);
              case 7:
                this._ephemeralKey && (e ? this.init(this._ephemeralKey) : this.changeToAvailable());
                _context93.n = 12;
                break;
              case 8:
                if (!r) {
                  _context93.n = 12;
                  break;
                }
                _context93.p = 9;
                this._retrievingEphemeralKey = this.getEphemeralKey(r);
                _context93.n = 10;
                return this._retrievingEphemeralKey;
              case 10:
                this._ephemeralKey = _context93.v;
                e && this.init(this._ephemeralKey);
                _context93.n = 12;
                break;
              case 11:
                _context93.p = 11;
                _t33 = _context93.v;
                this.displayFailedToRetrieveEphemeralKey(_t33);
              case 12:
                return _context93.a(2);
            }
          }, _callee93, this, [[9, 11], [1, 6]]);
        }));
        function fetchEphemeralKey(_x185) {
          return _fetchEphemeralKey.apply(this, arguments);
        }
        return fetchEphemeralKey;
      }()
    }, {
      key: "getEphemeralKey",
      value: function () {
        var _getEphemeralKey = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee94(e) {
          return _regenerator().w(function (_context94) {
            while (1) switch (_context94.n) {
              case 0:
                _context94.n = 1;
                return fetch("https://api.openai.com/v1/realtime/sessions", {
                  method: fe,
                  body: JSON.stringify(this.rawBody),
                  headers: _defineProperty(_defineProperty({}, B, V), ie, "".concat(ge).concat(e))
                });
              case 1:
                _context94.n = 2;
                return _context94.v.json();
              case 2:
                return _context94.a(2, _context94.v.client_secret.value);
            }
          }, _callee94, this);
        }));
        function getEphemeralKey(_x186) {
          return _getEphemeralKey.apply(this, arguments);
        }
        return getEphemeralKey;
      }()
    }, {
      key: "generateMethods",
      value: function generateMethods() {
        var _this41 = this;
        return {
          updateConfig: function updateConfig(e) {
            var t;
            (t = _this41._dc) == null || t.send(JSON.stringify(_defineProperty(_defineProperty({}, C, "session.update"), "session", e)));
          },
          sendMessage: function sendMessage(e, t) {
            var n = t || "system",
              s = [_defineProperty(_defineProperty({}, C, n === "system" || n === U ? "input_text" : h), "text", e)],
              r = _defineProperty(_defineProperty({
                role: n
              }, C, "message"), "content", s);
            _this41.sendMessage(r);
          }
        };
      }
    }, {
      key: "createContainer",
      value: function createContainer() {
        var e = S();
        return e.id = "deep-chat-openai-realtime-container", e.appendChild(this.createAvatarContainer()), e.appendChild(this.createButtonsContainer()), e.appendChild(this.createError()), e;
      }
    }, {
      key: "createAvatarContainer",
      value: function createAvatarContainer() {
        var t, n;
        var e = S();
        return e.id = "deep-chat-openai-realtime-avatar-container", Object.assign(e[_], (n = (t = this._avatarConfig) == null ? void 0 : t.styles) == null ? void 0 : n.container), e.appendChild(this._avatarEl), e;
      }
    }, {
      key: "createButtonsContainer",
      value: function createButtonsContainer() {
        var s;
        var e = S();
        e.id = "deep-chat-openai-realtime-buttons-container", Object.assign(e[_], (s = this._buttonsConfig) == null ? void 0 : s.container), this._microphoneButton = this.createMicophoneButton();
        var t = G.createButtonContainer(this._microphoneButton.elementRef);
        this._toggleButton = this.createToggleButton();
        var n = G.createButtonContainer(this._toggleButton.elementRef);
        return e.appendChild(t), e.appendChild(n), e.appendChild(this.createLoading()), e;
      }
    }, {
      key: "createMicophoneButton",
      value: function createMicophoneButton() {
        var _this42 = this;
        var t;
        var e = new Ms((t = this._buttonsConfig) == null ? void 0 : t[Xe]);
        return e.elementRef[m].add(G.BUTTON_DEFAULT, "deep-chat-openai-realtime-microphone"), e.elementRef.onclick = function () {
          e.isActive ? (_this42.toggleMicorphone(!0), e.elementRef[m].replace(G.MICROPHONE_ACTIVE, G.BUTTON_DEFAULT), e.changeToDefault(), _this42._isMuted = !1) : (_this42.toggleMicorphone(!1), e.elementRef[m].replace(G.BUTTON_DEFAULT, G.MICROPHONE_ACTIVE), te.removeAriaAttributes(e.elementRef), e.changeToActive(), _this42._isMuted = !0);
        }, e;
      }
    }, {
      key: "toggleMicorphone",
      value: function toggleMicorphone(e) {
        var t;
        (t = this._mediaStream) == null || t.getAudioTracks().forEach(function (n) {
          return n.enabled = e;
        });
      }
    }, {
      key: "createToggleButton",
      value: function createToggleButton() {
        var _this43 = this;
        var t;
        var e = new Ms((t = this._buttonsConfig) == null ? void 0 : t.toggle);
        return e.elementRef[m].add(G.BUTTON_DEFAULT, "deep-chat-openai-realtime-toggle"), e.elementRef.onclick = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee95() {
          var n, s, _t34, _t35;
          return _regenerator().w(function (_context95) {
            while (1) switch (_context95.p = _context95.n) {
              case 0:
                if (!e.isActive) {
                  _context95.n = 1;
                  break;
                }
                e.changeToDefault(), _this43.stop();
                _context95.n = 9;
                break;
              case 1:
                _context95.p = 1;
                if (!_this43._ephemeralKey) {
                  _context95.n = 3;
                  break;
                }
                _this43.displayLoading();
                _context95.n = 2;
                return _this43.init(_this43._ephemeralKey);
              case 2:
                _context95.n = 7;
                break;
              case 3:
                if (!_this43._retrievingEphemeralKey) {
                  _context95.n = 6;
                  break;
                }
                _this43.displayLoading();
                _context95.n = 4;
                return _this43._retrievingEphemeralKey;
              case 4:
                s = _context95.v;
                _t34 = (n = _this43._toggleButton) != null && n.isActive;
                if (!_t34) {
                  _context95.n = 5;
                  break;
                }
                _context95.n = 5;
                return _this43.init(s);
              case 5:
                _context95.n = 7;
                break;
              case 6:
                _this43.displayLoading();
                _context95.n = 7;
                return _this43.fetchEphemeralKey(!0);
              case 7:
                _context95.n = 9;
                break;
              case 8:
                _context95.p = 8;
                _t35 = _context95.v;
                console[f]("Failed to start conversation:", _t35), _this43.displayError(), _this43.hideLoading();
              case 9:
                return _context95.a(2);
            }
          }, _callee95, null, [[1, 8]]);
        })), e;
      }
    }, {
      key: "init",
      value: function () {
        var _init2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee98(e) {
          var _this44 = this;
          var t, n, s, r, o, a, c, l, _t38, _t39, _t40, _t41, _t42;
          return _regenerator().w(function (_context98) {
            while (1) switch (_context98.p = _context98.n) {
              case 0:
                t = new RTCPeerConnection();
                this._pc = t;
                n = S(P);
                n.autoplay = !0;
                s = new AudioContext(), r = s.createAnalyser();
                r.fftSize = 256;
                o = new Uint8Array(r.frequencyBinCount);
                this._pc.ontrack = /*#__PURE__*/function () {
                  var _ref84 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee96(a) {
                    var c, _t36;
                    return _regenerator().w(function (_context96) {
                      while (1) switch (_context96.n) {
                        case 0:
                          if (!a.streams[0]) {
                            _context96.n = 2;
                            break;
                          }
                          n.srcObject = a.streams[0];
                          c = s.createMediaStreamSource(a.streams[0]);
                          _t36 = s.state === "suspended";
                          if (!_t36) {
                            _context96.n = 1;
                            break;
                          }
                          _context96.n = 1;
                          return s.resume();
                        case 1:
                          c.connect(r);
                          _this44.monitorFrequencies(r, o);
                          _context96.n = 3;
                          break;
                        case 2:
                          console[f]("No streams found in the ontrack event."), _this44.displayError();
                        case 3:
                          return _context96.a(2);
                      }
                    }, _callee96);
                  }));
                  return function (_x188) {
                    return _ref84.apply(this, arguments);
                  };
                }();
                _context98.n = 1;
                return navigator.mediaDevices.getUserMedia({
                  audio: !0
                }).then(function (a) {
                  var c;
                  t === _this44._pc && (_this44._mediaStream = a, (c = _this44._pc) == null || c.addTrack(_this44._mediaStream.getTracks()[0]), _this44._isMuted && _this44.toggleMicorphone(!1));
                })["catch"](function (a) {
                  console[f]("Error accessing microphone:", a), _this44.displayError();
                });
              case 1:
                this._dc = this._pc.createDataChannel("oai-events");
                this._dc.addEventListener("message", /*#__PURE__*/function () {
                  var _ref85 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee97(a) {
                    var l, d, p, c, g, v, b, _t37;
                    return _regenerator().w(function (_context97) {
                      while (1) switch (_context97.p = _context97.n) {
                        case 0:
                          c = JSON.parse(a.data);
                          if (!(c.type === "session.created")) {
                            _context97.n = 1;
                            break;
                          }
                          _this44.removeUnavailable(), _this44._toggleButton && (te.removeAriaAttributes(_this44._toggleButton.elementRef), _this44._toggleButton.changeToActive()), (d = (l = _this44._events) == null ? void 0 : l.started) == null || d.call(l), _this44._deepChat.dispatchEvent(new CustomEvent(Qc)), _this44.hideLoading();
                          _context97.n = 7;
                          break;
                        case 1:
                          if (!(c.type === "response.done")) {
                            _context97.n = 6;
                            break;
                          }
                          g = (p = JSON.parse(a.data).response.output) == null ? void 0 : p[0];
                          if (!((g == null ? void 0 : g.type) === "function_call")) {
                            _context97.n = 5;
                            break;
                          }
                          v = g.name, b = g.call_id;
                          _context97.p = 2;
                          _context97.n = 3;
                          return _this44.handleTool(v, g.arguments, b);
                        case 3:
                          _context97.n = 5;
                          break;
                        case 4:
                          _context97.p = 4;
                          _t37 = _context97.v;
                          _this44.stopOnError(_t37);
                        case 5:
                          _context97.n = 7;
                          break;
                        case 6:
                          c.type === f ? _this44.stopOnError(c[f].message) : c.type === Ge ? _this44.stopOnError(c.message) : c.type === "response.audio_transcript.delta" || (c.type === "response.audio_transcript.done" ? c.transcript && qt.onMessage(_this44._deepChat, _defineProperty({
                            role: W
                          }, h, c.transcript), !1) : c.type === "conversation.item.input_audio_transcription.completed" && c.transcript && qt.onMessage(_this44._deepChat, _defineProperty({
                            role: U
                          }, h, c.transcript), !1));
                        case 7:
                          return _context97.a(2);
                      }
                    }, _callee97, null, [[2, 4]]);
                  }));
                  return function (_x189) {
                    return _ref85.apply(this, arguments);
                  };
                }());
                _context98.p = 2;
                _context98.n = 3;
                return this._pc.createOffer();
              case 3:
                a = _context98.v;
                _t38 = t !== this._pc;
                if (_t38) {
                  _context98.n = 5;
                  break;
                }
                _context98.n = 4;
                return this._pc.setLocalDescription(a);
              case 4:
                _t38 = t !== this._pc;
              case 5:
                if (!_t38) {
                  _context98.n = 6;
                  break;
                }
                return _context98.a(2);
              case 6:
                _context98.n = 7;
                return fetch("https://api.openai.com/v1/realtime", {
                  method: fe,
                  body: a.sdp,
                  headers: _defineProperty(_defineProperty({}, ie, "".concat(ge).concat(e)), B, "application/sdp")
                });
              case 7:
                c = _context98.v;
                if (!(t !== this._pc)) {
                  _context98.n = 8;
                  break;
                }
                return _context98.a(2);
              case 8:
                _t39 = _defineProperty;
                _t40 = _defineProperty({}, C, "answer");
                _context98.n = 9;
                return c[h]();
              case 9:
                l = _t39(_t40, "sdp", _context98.v);
                _t41 = t !== this._pc;
                if (_t41) {
                  _context98.n = 11;
                  break;
                }
                _context98.n = 10;
                return this._pc.setRemoteDescription(l);
              case 10:
                _t41 = t !== this._pc;
              case 11:
                if (!_t41) {
                  _context98.n = 12;
                  break;
                }
                return _context98.a(2);
              case 12:
                _context98.n = 14;
                break;
              case 13:
                _context98.p = 13;
                _t42 = _context98.v;
                console[f](_t42), this.displayError();
              case 14:
                return _context98.a(2);
            }
          }, _callee98, this, [[2, 13]]);
        }));
        function init(_x187) {
          return _init2.apply(this, arguments);
        }
        return init;
      }() // there is a bug where sometimes upon refreshing the browser too many times the frequencyData is all 0s
      // in such instance please wait and refresh at a later time
    }, {
      key: "monitorFrequencies",
      value: function monitorFrequencies(e, t) {
        var _this45 = this;
        var n = function (_n4) {
          function n() {
            return _n4.apply(this, arguments);
          }
          n.toString = function () {
            return _n4.toString();
          };
          return n;
        }(function () {
          var l;
          e.getByteFrequencyData(t);
          var s = t.reduce(function (d, p) {
              return d + p;
            }, 0),
            r = t.length * 255,
            o = s / r * 100,
            a = 1,
            c = a + o / 100 * (((l = _this45._avatarConfig) == null ? void 0 : l.maxScale) - a);
          _this45._avatarEl[_].transform = "scale(".concat(c, ")"), requestAnimationFrame(n);
        });
        n();
      }
    }, {
      key: "stopOnError",
      value: function stopOnError(e) {
        this.stop(), console[f](e), this.displayError();
      }
    }, {
      key: "stop",
      value: function stop() {
        var e, t, n;
        (e = this._mediaStream) == null || e.getTracks().forEach(function (s) {
          return s.stop();
        }), this._mediaStream = null, this._pc && (this._pc.close(), this._pc = null, (n = (t = this._events) == null ? void 0 : t.stopped) == null || n.call(t), this._deepChat.dispatchEvent(new CustomEvent(el)), this._dc = void 0);
      }
    }, {
      key: "changeToUnavailable",
      value: function changeToUnavailable() {
        this._microphoneButton && G.changeButtonToUnavailable(this._microphoneButton), this._toggleButton && G.changeButtonToUnavailable(this._toggleButton);
      }
    }, {
      key: "changeToAvailable",
      value: function changeToAvailable() {
        this._microphoneButton && G.changeButtonToAvailable(this._microphoneButton), this._toggleButton && G.changeButtonToAvailable(this._toggleButton);
      }
    }, {
      key: "removeUnavailable",
      value: function removeUnavailable() {
        this._microphoneButton && G.removeButtonUnavailable(this._microphoneButton), this._toggleButton && G.removeButtonUnavailable(this._toggleButton);
      }
    }, {
      key: "createError",
      value: function createError() {
        var t;
        var e = S();
        return e.id = "deep-chat-openai-realtime-error", Object.assign(e[_], (t = this._errorConfig) == null ? void 0 : t[_]), this._errorElement = e, e;
      }
    }, {
      key: "displayFailedToRetrieveEphemeralKey",
      value: function displayFailedToRetrieveEphemeralKey(e) {
        console[f]("Failed to retrieve ephemeral key"), console[f](e), this.displayError();
      }
    }, {
      key: "displayError",
      value: function displayError() {
        var e;
        this._errorElement && (this._errorElement[_].display = "block", this._errorElement.textContent = ((e = this._errorConfig) == null ? void 0 : e[h]) || "Error", this.changeToUnavailable()), this.hideLoading();
      }
    }, {
      key: "createLoading",
      value: function createLoading() {
        var t, n;
        var e = S();
        return e.id = "deep-chat-openai-realtime-loading", this._loadingElement = e, (t = this._loadingConfig) != null && t[R] && (this._loadingElement.innerHTML = this._loadingConfig[R]), Object.assign(e[_], (n = this._loadingConfig) == null ? void 0 : n[_]), e[_].display = "none", e;
      }
    }, {
      key: "displayLoading",
      value: function displayLoading() {
        var e, t, n;
        this._toggleButton && (this._toggleButton.changeToActive(), this._toggleButton.elementRef[m].add(G.BUTTON_LOADING), te.removeAriaDisabled(this._toggleButton.elementRef), te.addAriaBusy(this._toggleButton.elementRef)), (typeof ((e = this._loadingConfig) == null ? void 0 : e.display) != "boolean" || this._loadingConfig.display) && this._loadingElement && (this._loadingElement[_].display = "block", (t = this._loadingConfig) != null && t[R] || (this._loadingElement.textContent = ((n = this._loadingConfig) == null ? void 0 : n[h]) || "Loading"));
      }
    }, {
      key: "hideLoading",
      value: function hideLoading() {
        this._toggleButton && (this._toggleButton.elementRef[m].remove(G.BUTTON_LOADING), te.removeAriaBusy(this._toggleButton.elementRef)), this._loadingElement && (this._loadingElement[_].display = "none");
      }
      // https://platform.openai.com/docs/guides/function-calling?api-mode=responses
    }, {
      key: "handleTool",
      value: function () {
        var _handleTool = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee99(e, t, n) {
          var s, r;
          return _regenerator().w(function (_context99) {
            while (1) switch (_context99.n) {
              case 0:
                if (this._functionHandlerI) {
                  _context99.n = 1;
                  break;
                }
                throw Error(dn);
              case 1:
                _context99.n = 2;
                return this._functionHandlerI({
                  name: e,
                  arguments: t
                });
              case 2:
                s = _context99.v;
                if (!(_typeof(s) != "object" || !Ee.isJson(s))) {
                  _context99.n = 3;
                  break;
                }
                throw Error('The `function_handler` response must be a JSON object, e.g. {response: "My response"}');
              case 3:
                r = _defineProperty(_defineProperty(_defineProperty({}, C, "function_call_output"), "call_id", n), "output", JSON.stringify(s));
                this.sendMessage(r);
              case 4:
                return _context99.a(2);
            }
          }, _callee99, this);
        }));
        function handleTool(_x190, _x191, _x192) {
          return _handleTool.apply(this, arguments);
        }
        return handleTool;
      }() // https://platform.openai.com/docs/api-reference/realtime-client-events/conversation/item/create
    }, {
      key: "sendMessage",
      value: function sendMessage(e) {
        if (!this._dc) return;
        var t = JSON.stringify(_defineProperty(_defineProperty({}, C, "conversation.item.create"), "item", e));
        this._dc.send(t);
        var n = _defineProperty({}, C, "response.create");
        this._dc.send(JSON.stringify(n));
      }
    }, {
      key: "isCustomView",
      value: function isCustomView() {
        return !0;
      }
    }], [{
      key: "getKey",
      value: function getKey(e) {
        var t = e.directConnection.openAI;
        if (t != null && t.key) return t.key;
        var n = t == null ? void 0 : t.realtime;
        if (_typeof(n) == "object" && (n.ephemeralKey || n.fetchEphemeralKey)) return "placeholder";
      }
    }, {
      key: "buildAvatarConfig",
      value: function buildAvatarConfig(e) {
        var t = _typeof(e) == "object" && e.avatar ? JSON.parse(JSON.stringify(e.avatar)) : {};
        return t.maxScale = t.maxScale && t.maxScale >= 1 ? t.maxScale : 2.5, t;
      }
    }, {
      key: "buildButtonsConfig",
      value: function buildButtonsConfig(e) {
        var _t$Xe, _o$x, _a$svg, _c$content, _t$toggle, _u$x, _g$svg, _v$content, _b$active, _E$svg, _w$content;
        var n, s, r, o, a, c, l, d, p, u, g, v, b, E, w;
        var t = _typeof(e) == "object" && e.buttons ? JSON.parse(JSON.stringify(e.buttons)) : {};
        return (r = (s = (n = t[Xe]) == null ? void 0 : n[x]) == null ? void 0 : s[h]) != null && r.content || ((_t$Xe = t[Xe]) !== null && _t$Xe !== void 0 ? _t$Xe : t[Xe] = {}, (_o$x = (o = t[Xe])[x]) !== null && _o$x !== void 0 ? _o$x : o[x] = {}, (_a$svg = (a = t[Xe][x]).svg) !== null && _a$svg !== void 0 ? _a$svg : a.svg = {}, (_c$content = (c = t[Xe][x].svg).content) !== null && _c$content !== void 0 ? _c$content : c.content = mo), (p = (d = (l = t.toggle) == null ? void 0 : l[x]) == null ? void 0 : d[h]) != null && p.content || ((_t$toggle = t.toggle) !== null && _t$toggle !== void 0 ? _t$toggle : t.toggle = {}, (_u$x = (u = t.toggle)[x]) !== null && _u$x !== void 0 ? _u$x : u[x] = {}, (_g$svg = (g = t.toggle[x]).svg) !== null && _g$svg !== void 0 ? _g$svg : g.svg = {}, (_v$content = (v = t.toggle[x].svg).content) !== null && _v$content !== void 0 ? _v$content : v.content = go, (_b$active = (b = t.toggle).active) !== null && _b$active !== void 0 ? _b$active : b.active = {}, (_E$svg = (E = t.toggle.active).svg) !== null && _E$svg !== void 0 ? _E$svg : E.svg = {}, (_w$content = (w = t.toggle.active.svg).content) !== null && _w$content !== void 0 ? _w$content : w.content = fi), t;
      }
    }, {
      key: "createAvatar",
      value: function createAvatar(e) {
        var n;
        var t = S("img");
        return t.id = "deep-chat-openai-realtime-avatar", Object.assign(t[_], (n = e == null ? void 0 : e.styles) == null ? void 0 : n[j]), t.src = (e == null ? void 0 : e.src) || li, t;
      }
    }, {
      key: "createButtonContainer",
      value: function createButtonContainer(e) {
        var t = S();
        return t[m].add("deep-chat-openai-realtime-button-container"), t.appendChild(e), t;
      }
    }, {
      key: "changeButtonToUnavailable",
      value: function changeButtonToUnavailable(e) {
        e.elementRef[m].add(G.UNAVAILABLE), te.removeAriaBusy(e.elementRef), te.addAriaDisabled(e.elementRef), e.changeToUnavailable();
      }
    }, {
      key: "changeButtonToAvailable",
      value: function changeButtonToAvailable(e) {
        G.removeButtonUnavailable(e), e.changeToDefault();
      }
    }, {
      key: "removeButtonUnavailable",
      value: function removeButtonUnavailable(e) {
        te.removeAriaDisabled(e.elementRef), e.elementRef[m].remove(G.UNAVAILABLE);
      }
    }]);
  }(T);
G.BUTTON_DEFAULT = "deep-chat-openai-realtime-button-default", G.BUTTON_LOADING = "deep-chat-openai-realtime-button-loading", G.MICROPHONE_ACTIVE = "deep-chat-openai-realtime-microphone-active", G.UNAVAILABLE = "deep-chat-openai-realtime-button-unavailable";
var mi = G;
var tn = /*#__PURE__*/function (_T7) {
  function tn(e) {
    var _o$model3, _a$voice3;
    var _this46;
    _classCallCheck(this, tn);
    var r, o, a;
    var t = JSON.parse(JSON.stringify(e.directConnection)),
      n = t == null ? void 0 : t.openAI;
    _this46 = _callSuper(this, tn, [e, pn(), un, n]), _this46.insertKeyPlaceholderText = _this46.genereteAPIKeyName("OpenAI"), _this46.keyHelpUrl = "https://platform.openai.com/account/api-keys", _this46.url = "https://api.openai.com/v1/audio/speech", _this46.permittedErrorPrefixes = [Ct];
    var s = (r = t == null ? void 0 : t.openAI) == null ? void 0 : r.textToSpeech;
    _typeof(s) === L && Object.assign(_this46.rawBody, s), (_o$model3 = (o = _this46.rawBody).model) !== null && _o$model3 !== void 0 ? _o$model3 : o.model = tn.DEFAULT_MODEL, (_a$voice3 = (a = _this46.rawBody).voice) !== null && _a$voice3 !== void 0 ? _a$voice3 : a.voice = tn.DEFAULT_VOIDE, _this46.textInputPlaceholderText = "Insert text to generate audio", _this46.rawBody.response_format = "mp3";
    return _this46;
  }
  _inherits(tn, _T7);
  return _createClass(tn, [{
    key: "preprocessBody",
    value: function preprocessBody(e, t) {
      var r, o;
      var n = JSON.parse(JSON.stringify(e)),
        s = (o = (r = t[t.length - 1]) == null ? void 0 : r[h]) == null ? void 0 : o.trim();
      return s && s !== "" && (n.input = s), n;
    }
  }, {
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI10 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee100(e, t) {
        return _regenerator().w(function (_context100) {
          while (1) switch (_context100.n) {
            case 0:
              this.url = this.connectSettings.url || this.url, this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this));
            case 1:
              return _context100.a(2);
          }
        }, _callee100, this);
      }));
      function callServiceAPI(_x193, _x194) {
        return _callServiceAPI10.apply(this, arguments);
      }
      return callServiceAPI;
    }()
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData13 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee101(e) {
        return _regenerator().w(function (_context101) {
          while (1) switch (_context101.n) {
            case 0:
              if (!(e instanceof Blob)) {
                _context101.n = 1;
                break;
              }
              return _context101.a(2, new Promise(function (t) {
                var n = new FileReader();
                n.readAsDataURL(e), n.onload = function (s) {
                  t(_defineProperty({}, y, [_defineProperty(_defineProperty({}, Y, s.target.result), C, P)]));
                };
              }));
            case 1:
              if (!e[f]) {
                _context101.n = 2;
                break;
              }
              throw e[f].message;
            case 2:
              return _context101.a(2, _defineProperty({}, f, f));
          }
        }, _callee101);
      }));
      function extractResultData(_x195) {
        return _extractResultData13.apply(this, arguments);
      }
      return extractResultData;
    }()
  }]);
}(T);
tn.DEFAULT_MODEL = "tts-1", tn.DEFAULT_VOIDE = "alloy";
var gi = tn;
var Je = /*#__PURE__*/function (_T8) {
  function Je(e) {
    var _o$model4;
    var _this47;
    _classCallCheck(this, Je);
    var r, o;
    var t = JSON.parse(JSON.stringify(e.directConnection)),
      n = t == null ? void 0 : t.openAI;
    _this47 = _callSuper(this, Je, [e, pn(), un, n, {
      audio: {}
    }]), _this47.insertKeyPlaceholderText = _this47.genereteAPIKeyName("OpenAI"), _this47.keyHelpUrl = "https://platform.openai.com/account/api-keys", _this47.url = "", _this47.permittedErrorPrefixes = [Ct], _this47.textInputPlaceholderText = Ri, _this47._service_url = Je.AUDIO_TRANSCRIPTIONS_URL;
    var s = (r = t == null ? void 0 : t.openAI) == null ? void 0 : r[P];
    _typeof(s) == "object" && (_this47.processConfig(s), Je.cleanConfig(s), Object.assign(_this47.rawBody, s)), (_o$model4 = (o = _this47.rawBody).model) !== null && _o$model4 !== void 0 ? _o$model4 : o.model = Je.DEFAULT_MODEL, _this47.rawBody.response_format = "json", _this47.canSendMessage = Je.canSendFileMessage;
    return _this47;
  }
  _inherits(Je, _T8);
  return _createClass(Je, [{
    key: "processConfig",
    value: function processConfig(e) {
      e != null && e.type && e.type === "translation" && (this._service_url = Je.AUDIO_TRANSLATIONS_URL, delete e.language);
    }
  }, {
    key: "preprocessBody",
    value: function preprocessBody(e, t) {
      var r, o;
      var n = JSON.parse(JSON.stringify(e)),
        s = (o = (r = t[t.length - 1]) == null ? void 0 : r[h]) == null ? void 0 : o.trim();
      return s && s !== "" && (n.prompt = s), n;
    }
    // prettier-ignore
  }, {
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI11 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee102(e, t, n) {
        var o, s, r;
        return _regenerator().w(function (_context102) {
          while (1) switch (_context102.n) {
            case 0:
              if ((o = this.connectSettings) != null && o.headers) {
                _context102.n = 1;
                break;
              }
              throw new Error(Ie);
            case 1:
              if (n != null && n[0]) {
                _context102.n = 2;
                break;
              }
              throw new Error(js);
            case 2:
              this.url = this.connectSettings.url || this._service_url;
              s = this.preprocessBody(this.rawBody, t), r = Je.createFormDataBody(s, n[0]);
              M.tempRemoveContentHeader(this.connectSettings, ne.request.bind(this, this, r, e), !1);
            case 3:
              return _context102.a(2);
          }
        }, _callee102, this);
      }));
      function callServiceAPI(_x196, _x197, _x198) {
        return _callServiceAPI11.apply(this, arguments);
      }
      return callServiceAPI;
    }()
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData14 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee103(e) {
        return _regenerator().w(function (_context103) {
          while (1) switch (_context103.n) {
            case 0:
              if (!e[f]) {
                _context103.n = 1;
                break;
              }
              throw e[f].message;
            case 1:
              return _context103.a(2, _defineProperty({}, h, e[h]));
          }
        }, _callee103);
      }));
      function extractResultData(_x199) {
        return _extractResultData14.apply(this, arguments);
      }
      return extractResultData;
    }()
  }], [{
    key: "canSendFileMessage",
    value: function canSendFileMessage(e, t) {
      return !!(t != null && t[0]);
    }
  }, {
    key: "cleanConfig",
    value: function cleanConfig(e) {
      delete e.type;
    }
  }, {
    key: "createFormDataBody",
    value: function createFormDataBody(e, t) {
      var n = new FormData();
      return n.append("file", t), Object.keys(e).forEach(function (s) {
        n.append(s, String(e[s]));
      }), n;
    }
  }]);
}(T);
Je.AUDIO_TRANSCRIPTIONS_URL = "https://api.openai.com/v1/audio/transcriptions", Je.AUDIO_TRANSLATIONS_URL = "https://api.openai.com/v1/audio/translations", Je.DEFAULT_MODEL = "whisper-1";
var yi = Je;
var fn = "Ocp-Apim-Subscription-Key",
  yo =
  // eslint-disable-next-line max-len
  "https://learn.microsoft.com/en-us/azure/api-management/api-management-subscriptions#create-and-manage-subscriptions-in-azure-portal",
  tl = function tl(i, e) {
    return _defineProperty(_defineProperty(_defineProperty({}, fn, e), B, "application/ssml+xml"), "X-Microsoft-OutputFormat", i);
  },
  nl = function nl(i) {
    return _defineProperty(_defineProperty({}, fn, i), "Accept", V);
  },
  sl = function sl(i, e, t, n) {
    i[f] ? n(se) : t(e);
  },
  il = function il(i) {
    return {
      url: "https://".concat(i, ".api.cognitive.microsoft.com/sts/v1.0/issuetoken"),
      method: fe,
      createHeaders: function createHeaders(e) {
        return _defineProperty({}, fn, "".concat(e));
      },
      handleVerificationResult: sl
    };
  },
  rl = function rl(i) {
    return _defineProperty(_defineProperty({}, fn, i), B, V);
  },
  ol = function ol(i, e, t, n) {
    var r;
    ((r = i[f]) == null ? void 0 : r.code) === "401" ? n(se) : t(e);
  },
  al = function al(i) {
    return {
      url: "".concat(i, "/language/analyze-text/jobs?api-version=2022-10-01-preview"),
      method: fe,
      createHeaders: function createHeaders(e) {
        return _defineProperty({}, fn, "".concat(e));
      },
      handleVerificationResult: ol
    };
  },
  cl = function cl(i, e, t, n) {
    i.json().then(function (r) {
      !Array.isArray(r) && r[f].code === 401e3 ? n(se) : t(e);
    });
  },
  ll = function ll(i) {
    return {
      url: "https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=es",
      method: fe,
      createHeaders: function createHeaders(e) {
        return bo(i, e);
      },
      handleVerificationResult: cl
    };
  },
  bo = function bo(i, e) {
    var t = _defineProperty(_defineProperty({}, fn, e), B, V);
    return i && (t["Ocp-Apim-Subscription-Region"] = i), t;
  };
var dl = /*#__PURE__*/function (_T9) {
  // prettier-ignore
  function dl(e, t, n, s, r) {
    var _this48;
    _classCallCheck(this, dl);
    _this48 = _callSuper(this, dl, [e, al(n), t, s, r]), _this48.insertKeyPlaceholderText = "Azure Language Subscription Key", _this48.keyHelpUrl = yo, _this48.permittedErrorPrefixes = ["Access"];
    return _this48;
  }
  _inherits(dl, _T9);
  return _createClass(dl);
}(T);
var Jn = /*#__PURE__*/function (_dl) {
  function Jn(e) {
    var _a$language;
    var _this49;
    _classCallCheck(this, Jn);
    var s, r, o, a;
    var t = (r = (s = e.directConnection) == null ? void 0 : s.azure) == null ? void 0 : r.summarization,
      n = (o = e.directConnection) == null ? void 0 : o.azure;
    _this49 = _callSuper(this, Jn, [e, rl, t.endpoint, n]), _this49.permittedErrorPrefixes = [Jn.ENDPOINT_ERROR_MESSAGE], _this49.url = "", _this49.textInputPlaceholderText = "Insert text to summarize", _this49.isTextInputDisabled = !1, t.endpoint ? ((_a$language = (a = _this49.rawBody).language) !== null && _a$language !== void 0 ? _a$language : a.language = "en", Object.assign(_this49.rawBody, t), _this49.url = "".concat(t.endpoint, "/language/analyze-text/jobs?api-version=2022-10-01-preview")) : (_this49.isTextInputDisabled = !0, _this49.canSendMessage = function () {
      return !1;
    }, setTimeout(function () {
      e.addMessage(_defineProperty({}, f, Jn.ENDPOINT_ERROR_MESSAGE));
    }));
    return _this49;
  }
  _inherits(Jn, _dl);
  return _createClass(Jn, [{
    key: "preprocessBody",
    value: function preprocessBody(e, t) {
      var n = t[t.length - 1][h];
      if (n) return {
        analysisInput: {
          documents: [_defineProperty({
            id: "1",
            language: e.language
          }, h, n)]
        },
        tasks: [{
          kind: "ExtractiveSummarization"
        }]
      };
    }
  }, {
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI12 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee104(e, t) {
        return _regenerator().w(function (_context104) {
          while (1) switch (_context104.n) {
            case 0:
              this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this)), this.messages = e;
            case 1:
              return _context104.a(2);
          }
        }, _callee104, this);
      }));
      function callServiceAPI(_x200, _x201) {
        return _callServiceAPI12.apply(this, arguments);
      }
      return callServiceAPI;
    }()
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData15 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee105(e) {
        var t, _n6, s;
        return _regenerator().w(function (_context105) {
          while (1) switch (_context105.n) {
            case 0:
              if (!e[f]) {
                _context105.n = 1;
                break;
              }
              throw e[f].message;
            case 1:
              if (this.messages && this.completionsHandlers) {
                this.asyncCallInProgress = !0;
                _n6 = e.headers.get("operation-location"), s = {
                  method: re,
                  headers: (t = this.connectSettings) == null ? void 0 : t.headers
                };
                ne.executePollRequest(this, _n6, s, this.messages);
              }
              return _context105.a(2, _defineProperty({}, h, ""));
          }
        }, _callee105, this);
      }));
      function extractResultData(_x202) {
        return _extractResultData15.apply(this, arguments);
      }
      return extractResultData;
    }()
  }, {
    key: "extractPollResultData",
    value: function () {
      var _extractPollResultData5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee106(e) {
        var t, _iterator, _step, _n7;
        return _regenerator().w(function (_context106) {
          while (1) switch (_context106.n) {
            case 0:
              if (!e[f]) {
                _context106.n = 1;
                break;
              }
              throw e[f];
            case 1:
              if (!(e.status === "running" || e.status === "notStarted")) {
                _context106.n = 2;
                break;
              }
              return _context106.a(2, {
                timeoutMS: 2e3
              });
            case 2:
              if (!(e.errors.length > 0)) {
                _context106.n = 3;
                break;
              }
              throw e.errors[0];
            case 3:
              if (!(e.tasks.items[0].results.errors.length > 0)) {
                _context106.n = 4;
                break;
              }
              throw e.tasks.items[0].results.errors[0];
            case 4:
              t = "";
              _iterator = _createForOfIteratorHelper(e.tasks.items[0].results.documents[0].sentences);
              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  _n7 = _step.value;
                  t += _n7[h];
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }
              return _context106.a(2, _defineProperty({}, h, t || ""));
          }
        }, _callee106);
      }));
      function extractPollResultData(_x203) {
        return _extractPollResultData5.apply(this, arguments);
      }
      return extractPollResultData;
    }()
  }]);
}(dl);
Jn.ENDPOINT_ERROR_MESSAGE = // eslint-disable-next-line max-len
"Please define the azure endpoint. [More Information](".concat(q, "directConnection/Azure#Summarization)");
var bi = Jn;
var hl = /*#__PURE__*/function () {
    var _ref97 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee107(i, e) {
      var t, o, a, l, _t46;
      return _regenerator().w(function (_context107) {
        while (1) switch (_context107.n) {
          case 0:
            t = _defineProperty(_defineProperty({}, Uo, i), Ho, V);
            _t46 = "https://api.assemblyai.com/v2/transcript/";
            _context107.n = 1;
            return fetch("https://api.assemblyai.com/v2/transcript", {
              method: fe,
              body: JSON.stringify({
                audio_url: e
              }),
              headers: t
            });
          case 1:
            _context107.n = 2;
            return _context107.v.json();
          case 2:
            o = _t46.concat.call(_t46, _context107.v.id);
          case 3:
            if (a) {
              _context107.n = 9;
              break;
            }
            _context107.n = 4;
            return fetch(o, {
              headers: t
            });
          case 4:
            _context107.n = 5;
            return _context107.v.json();
          case 5:
            l = _context107.v;
            if (!(l.status === Yr)) {
              _context107.n = 6;
              break;
            }
            a = l;
            _context107.n = 8;
            break;
          case 6:
            if (!(l.status === f)) {
              _context107.n = 7;
              break;
            }
            throw new Error("Transcription failed: ".concat(l[f]));
          case 7:
            _context107.n = 8;
            return new Promise(function (d) {
              return setTimeout(d, 3e3);
            });
          case 8:
            _context107.n = 3;
            break;
          case 9:
            return _context107.a(2, a);
        }
      }, _callee107);
    }));
    return function hl(_x204, _x205) {
      return _ref97.apply(this, arguments);
    };
  }(),
  ul = function ul(i) {
    return _defineProperty(_defineProperty({}, ie, i), B, "application/octet-stream");
  },
  pl = function pl(i, e, t, n) {
    var s = i;
    s[f] ? s[f].code === "invalid_api_key" ? n(se) : n(Fe) : t(e);
  },
  fl = function fl() {
    return oe("https://api.assemblyai.com/v2/upload", fe, pl);
  };
var Di = /*#__PURE__*/function (_T0) {
  function Di(e) {
    var _this50;
    _classCallCheck(this, Di);
    var n;
    var t = (n = e.directConnection) == null ? void 0 : n.assemblyAI;
    _this50 = _callSuper(this, Di, [e, fl(), ul, t, {
      audio: {}
    }]), _this50.insertKeyPlaceholderText = _this50.genereteAPIKeyName("AssemblyAI"), _this50.keyHelpUrl = "https://www.assemblyai.com/app/account", _this50.url = "https://api.assemblyai.com/v2/upload", _this50.isTextInputDisabled = !0, _this50.textInputPlaceholderText = Ri, _this50.permittedErrorPrefixes = [Zr, Ct], _this50.canSendMessage = Di.canFileSendMessage;
    return _this50;
  }
  _inherits(Di, _T0);
  return _createClass(Di, [{
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI13 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee108(e, t, n) {
        var s;
        return _regenerator().w(function (_context108) {
          while (1) switch (_context108.n) {
            case 0:
              if ((s = this.connectSettings) != null && s.headers) {
                _context108.n = 1;
                break;
              }
              throw new Error(Ie);
            case 1:
              if (n != null && n[0]) {
                _context108.n = 2;
                break;
              }
              throw new Error(js);
            case 2:
              ne.request(this, n[0], e, !1);
            case 3:
              return _context108.a(2);
          }
        }, _callee108, this);
      }));
      function callServiceAPI(_x206, _x207, _x208) {
        return _callServiceAPI13.apply(this, arguments);
      }
      return callServiceAPI;
    }()
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData16 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee109(e) {
        var s, r, t, n;
        return _regenerator().w(function (_context109) {
          while (1) switch (_context109.n) {
            case 0:
              if (!e[f]) {
                _context109.n = 1;
                break;
              }
              throw e[f];
            case 1:
              t = (r = (s = this.connectSettings) == null ? void 0 : s.headers) == null ? void 0 : r[ie];
              _context109.n = 2;
              return hl(t, e.upload_url);
            case 2:
              n = _context109.v;
              return _context109.a(2, _defineProperty({}, h, n[h]));
          }
        }, _callee109, this);
      }));
      function extractResultData(_x209) {
        return _extractResultData16.apply(this, arguments);
      }
      return extractResultData;
    }()
  }], [{
    key: "canFileSendMessage",
    value: function canFileSendMessage(e, t) {
      return !!(t != null && t[0]);
    }
  }]);
}(T);
var Zi = /*#__PURE__*/function (_T1) {
  // prettier-ignore
  function Zi(e, t, n, s, r) {
    var _this51;
    _classCallCheck(this, Zi);
    _this51 = _callSuper(this, Zi, [e, il(n), t, s, r]), _this51.insertKeyPlaceholderText = "Azure Speech Subscription Key", _this51.keyHelpUrl = yo;
    return _this51;
  }
  _inherits(Zi, _T1);
  return _createClass(Zi);
}(T);
Zi.REGION_ERROR_PREFIX = "Please define a region config property. [More Information](".concat(q, "directConnection/Azure#");
var cn = Zi;
var Kn = /*#__PURE__*/function (_cn) {
  // prettier-ignore
  function Kn(e) {
    var _a$lang, _c$name, _l$gender;
    var _this52;
    _classCallCheck(this, Kn);
    var s, r, o, a, c, l;
    var t = (r = (s = e.directConnection) == null ? void 0 : s.azure) == null ? void 0 : r.textToSpeech,
      n = (o = e.directConnection) == null ? void 0 : o.azure;
    _this52 = _callSuper(this, Kn, [e, tl.bind({}, (t == null ? void 0 : t.outputFormat) || "audio-16khz-128kbitrate-mono-mp3"), t.region, n]), _this52.permittedErrorPrefixes = [Kn.REGION_ERROR_MESSAGE], _this52.isTextInputDisabled = !1, _this52.url = "", t.region ? (Object.assign(_this52.rawBody, t), (_a$lang = (a = _this52.rawBody).lang) !== null && _a$lang !== void 0 ? _a$lang : a.lang = "en-US", (_c$name = (c = _this52.rawBody).name) !== null && _c$name !== void 0 ? _c$name : c.name = "en-US-JennyNeural", (_l$gender = (l = _this52.rawBody).gender) !== null && _l$gender !== void 0 ? _l$gender : l.gender = "Female", _this52.url = "https://".concat(t.region, ".tts.speech.microsoft.com/cognitiveservices/v1")) : (_this52.isTextInputDisabled = !0, _this52.canSendMessage = function () {
      return !1;
    }, setTimeout(function () {
      e.addMessage(_defineProperty({}, f, Kn.REGION_ERROR_MESSAGE));
    }));
    return _this52;
  }
  _inherits(Kn, _cn);
  return _createClass(Kn, [{
    key: "preprocessBody",
    value: function preprocessBody(e, t) {
      var n = t[t.length - 1][h];
      if (n) return "<speak version='1.0' xml:lang='".concat(e.lang, "'>\n      <voice xml:lang='").concat(e.lang, "' xml:gender='").concat(e.gender, "' name='").concat(e.name, "'>\n        ").concat(n, "\n      </voice>\n    </speak>");
    }
  }, {
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI14 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee110(e, t) {
        return _regenerator().w(function (_context110) {
          while (1) switch (_context110.n) {
            case 0:
              this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this), void 0, !1);
            case 1:
              return _context110.a(2);
          }
        }, _callee110, this);
      }));
      function callServiceAPI(_x210, _x211) {
        return _callServiceAPI14.apply(this, arguments);
      }
      return callServiceAPI;
    }()
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData17 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee111(e) {
        return _regenerator().w(function (_context111) {
          while (1) switch (_context111.n) {
            case 0:
              return _context111.a(2, new Promise(function (t) {
                var n = new FileReader();
                n.readAsDataURL(e), n.onload = function (s) {
                  t(_defineProperty({}, y, [_defineProperty(_defineProperty({}, Y, s.target.result), C, P)]));
                };
              }));
          }
        }, _callee111);
      }));
      function extractResultData(_x212) {
        return _extractResultData17.apply(this, arguments);
      }
      return extractResultData;
    }()
  }]);
}(cn);
Kn.REGION_ERROR_MESSAGE = "".concat(cn.REGION_ERROR_PREFIX, "TextToSpeech)");
var vi = Kn;
var nn = /*#__PURE__*/function (_cn2) {
  function nn(e) {
    var _this53;
    _classCallCheck(this, nn);
    var r, o, a;
    var t = (o = (r = e.directConnection) == null ? void 0 : r.azure) == null ? void 0 : o.speechToText,
      n = (a = e.directConnection) == null ? void 0 : a.azure,
      s = {
        audio: _defineProperty({}, y, {
          acceptedFormats: ".wav,.ogg"
        })
      };
    if (_this53 = _callSuper(this, nn, [e, nl, t.region, n, s]), _this53.permittedErrorPrefixes = [nn.REGION_ERROR_MESSAGE], _this53.url = "", _this53.isTextInputDisabled = !0, _this53.textInputPlaceholderText = Ri, !t.region) _this53.isTextInputDisabled = !0, _this53.canSendMessage = function () {
      return !1;
    }, setTimeout(function () {
      e.addMessage(_defineProperty({}, f, nn.REGION_ERROR_MESSAGE));
    });else {
      _this53.canSendMessage = nn.canFileSendMessage;
      var c = t.lang || "en-US";
      _this53.url = "https://".concat(t.region, ".stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=").concat(c, "&format=detailed"), _this53.recordAudio = void 0;
    }
    return _this53;
  }
  _inherits(nn, _cn2);
  return _createClass(nn, [{
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI15 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee112(e, t, n) {
        var s, r;
        return _regenerator().w(function (_context112) {
          while (1) switch (_context112.n) {
            case 0:
              if ((s = this.connectSettings) != null && s.headers) {
                _context112.n = 1;
                break;
              }
              throw new Error(Ie);
            case 1:
              if (n != null && n[0]) {
                _context112.n = 2;
                break;
              }
              throw new Error(js);
            case 2:
              (r = this.connectSettings) != null && r.headers && (this.connectSettings.headers[B] = n[0].name.toLocaleLowerCase().endsWith(".wav") ? "audio/wav; codecs=audio/pcm; samplerate=16000" : "audio/ogg; codecs=opus"), ne.request(this, n[0], e, !1);
            case 3:
              return _context112.a(2);
          }
        }, _callee112, this);
      }));
      function callServiceAPI(_x213, _x214, _x215) {
        return _callServiceAPI15.apply(this, arguments);
      }
      return callServiceAPI;
    }()
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData18 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee113(e) {
        return _regenerator().w(function (_context113) {
          while (1) switch (_context113.n) {
            case 0:
              if (!e[f]) {
                _context113.n = 1;
                break;
              }
              throw e[f];
            case 1:
              return _context113.a(2, _defineProperty({}, h, e.DisplayText || ""));
          }
        }, _callee113);
      }));
      function extractResultData(_x216) {
        return _extractResultData18.apply(this, arguments);
      }
      return extractResultData;
    }()
  }], [{
    key: "canFileSendMessage",
    value: function canFileSendMessage(e, t) {
      return !!(t != null && t[0]);
    }
  }]);
}(cn);
nn.REGION_ERROR_MESSAGE = "".concat(cn.REGION_ERROR_PREFIX, "SpeechToText)");
var _i = nn;
var ml = /*#__PURE__*/function (_T10) {
  // prettier-ignore
  function ml(e) {
    var _this54;
    _classCallCheck(this, ml);
    var s, r, o;
    var t = (r = (s = e.directConnection) == null ? void 0 : s.azure) == null ? void 0 : r.translation,
      n = (o = e.directConnection) == null ? void 0 : o.azure;
    _this54 = _callSuper(this, ml, [e, ll(t.region), bo.bind({}, t == null ? void 0 : t.region), n]), _this54.insertKeyPlaceholderText = "Azure Translate Subscription Key", _this54.keyHelpUrl =
    // eslint-disable-next-line max-len
    "https://learn.microsoft.com/en-us/azure/api-management/api-management-subscriptions#create-and-manage-subscriptions-in-azure-portal", _this54.url = "", _this54.url = "https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=".concat(t.language || "es");
    return _this54;
  }
  _inherits(ml, _T10);
  return _createClass(ml, [{
    key: "preprocessBody",
    value: function preprocessBody(e) {
      var t = e[e.length - 1][h];
      if (t) return [{
        Text: t
      }];
    }
  }, {
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI16 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee114(e, t) {
        return _regenerator().w(function (_context114) {
          while (1) switch (_context114.n) {
            case 0:
              this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this));
            case 1:
              return _context114.a(2);
          }
        }, _callee114, this);
      }));
      function callServiceAPI(_x217, _x218) {
        return _callServiceAPI16.apply(this, arguments);
      }
      return callServiceAPI;
    }()
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData19 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee115(e) {
        var t;
        return _regenerator().w(function (_context115) {
          while (1) switch (_context115.n) {
            case 0:
              if (!Array.isArray(e)) {
                _context115.n = 1;
                break;
              }
              return _context115.a(2, _defineProperty({}, h, ((t = e[0].translations) == null ? void 0 : t[0][h]) || ""));
            case 1:
              throw e[f];
            case 2:
              return _context115.a(2);
          }
        }, _callee115);
      }));
      function extractResultData(_x219) {
        return _extractResultData19.apply(this, arguments);
      }
      return extractResultData;
    }()
  }]);
}(T);
var gl = /*#__PURE__*/function (_T11) {
  function gl(e) {
    var _o$model5;
    var _this55;
    _classCallCheck(this, gl);
    var r, o;
    var t = JSON.parse(JSON.stringify(e.directConnection)),
      n = t.bigModel;
    _this55 = _callSuper(this, gl, [e, Ni(), Oi, n]), _this55.insertKeyPlaceholderText = _this55.genereteAPIKeyName("BigModel"), _this55.keyHelpUrl = "https://open.bigmodel.cn/usercenter/apikeys", _this55.url = "https://open.bigmodel.cn/api/paas/v4/images/generations", _this55.permittedErrorPrefixes = [ie, ye];
    var s = (r = t.bigModel) == null ? void 0 : r[z];
    _typeof(s) === L && (_this55.cleanConfig(s), Object.assign(_this55.rawBody, s)), (_o$model5 = (o = _this55.rawBody).model) !== null && _o$model5 !== void 0 ? _o$model5 : o.model = "cogview-4-250304";
    return _this55;
  }
  _inherits(gl, _T11);
  return _createClass(gl, [{
    key: "cleanConfig",
    value: function cleanConfig(e) {
      delete e.key;
    }
  }, {
    key: "preprocessBody",
    value: function preprocessBody(e, t) {
      var n = JSON.parse(JSON.stringify(e)),
        s = t[t.length - 1];
      return n.prompt = (s == null ? void 0 : s[h]) || "", n;
    }
  }, {
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI17 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee116(e, t) {
        return _regenerator().w(function (_context116) {
          while (1) switch (_context116.n) {
            case 0:
              return _context116.a(2, this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this)));
          }
        }, _callee116, this);
      }));
      function callServiceAPI(_x220, _x221) {
        return _callServiceAPI17.apply(this, arguments);
      }
      return callServiceAPI;
    }()
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData20 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee117(e) {
        var t;
        return _regenerator().w(function (_context117) {
          while (1) switch (_context117.n) {
            case 0:
              t = e.data.map(function (n) {
                return n != null && n.url ? _defineProperty(_defineProperty({}, Y, n.url), C, j) : _defineProperty(_defineProperty({}, Y, ""), C, j);
              });
              return _context117.a(2, _defineProperty({}, y, t));
          }
        }, _callee117);
      }));
      function extractResultData(_x222) {
        return _extractResultData20.apply(this, arguments);
      }
      return extractResultData;
    }()
  }]);
}(T);
var vo = function vo(i) {
    return _defineProperty(_defineProperty({}, B, V), ie, "".concat(ge).concat(i));
  },
  yl = function yl(i, e, t, n) {
    var s = i;
    s[f] ? s[f].message === Ci ? n(se) : n(Fe) : t(e);
  },
  _o = function _o() {
    return oe("https://api.groq.com/openai/v1/models", re, yl);
  };
var bl = /*#__PURE__*/function (_T12) {
  function bl(e) {
    var _o$model6, _a$voice4, _c$response_format;
    var _this56;
    _classCallCheck(this, bl);
    var r, o, a, c;
    var t = JSON.parse(JSON.stringify(e.directConnection)),
      n = t.groq;
    _this56 = _callSuper(this, bl, [e, _o(), vo, n]), _this56.insertKeyPlaceholderText = _this56.genereteAPIKeyName("Groq"), _this56.keyHelpUrl = "https://console.groq.com/keys", _this56.url = "https://api.groq.com/openai/v1/audio/speech", _this56.permittedErrorPrefixes = [Ct, "property"];
    var s = (r = t.groq) == null ? void 0 : r.textToSpeech;
    _typeof(s) === L && _this56.completeConfig(s), (_o$model6 = (o = _this56.rawBody).model) !== null && _o$model6 !== void 0 ? _o$model6 : o.model = "playai-tts", (_a$voice4 = (a = _this56.rawBody).voice) !== null && _a$voice4 !== void 0 ? _a$voice4 : a.voice = "Fritz-PlayAI", (_c$response_format = (c = _this56.rawBody).response_format) !== null && _c$response_format !== void 0 ? _c$response_format : c.response_format = "mp3";
    return _this56;
  }
  _inherits(bl, _T12);
  return _createClass(bl, [{
    key: "preprocessBody",
    value: function preprocessBody(e, t) {
      var n = JSON.parse(JSON.stringify(e)),
        s = t[t.length - 1];
      return n.input = (s == null ? void 0 : s[h]) || "", n;
    }
  }, {
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI18 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee118(e, t) {
        return _regenerator().w(function (_context118) {
          while (1) switch (_context118.n) {
            case 0:
              return _context118.a(2, this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this)));
          }
        }, _callee118, this);
      }));
      function callServiceAPI(_x223, _x224) {
        return _callServiceAPI18.apply(this, arguments);
      }
      return callServiceAPI;
    }()
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData21 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee119(e) {
        var t, n, s;
        return _regenerator().w(function (_context119) {
          while (1) switch (_context119.n) {
            case 0:
              t = this.rawBody.response_format || "mp3", n = new Blob([e], _defineProperty({}, C, "audio/".concat(t))), s = URL.createObjectURL(n);
              return _context119.a(2, {
                files: [_defineProperty(_defineProperty({}, Y, s), C, P)]
              });
          }
        }, _callee119, this);
      }));
      function extractResultData(_x225) {
        return _extractResultData21.apply(this, arguments);
      }
      return extractResultData;
    }()
  }]);
}(T);
var vl = /*#__PURE__*/function (_T13) {
  function vl(e) {
    var _o$model7;
    var _this57;
    _classCallCheck(this, vl);
    var r, o;
    var t = JSON.parse(JSON.stringify(e.directConnection)),
      n = t.together;
    _this57 = _callSuper(this, vl, [e, Li(), Pi, n]), _this57.insertKeyPlaceholderText = _this57.genereteAPIKeyName("Together AI"), _this57.keyHelpUrl = "https://api.together.xyz/settings/api-keys", _this57.url = "https://api.together.xyz/v1/images/generations", _this57.permittedErrorPrefixes = [Ge, ye];
    var s = (r = t.together) == null ? void 0 : r[z];
    _typeof(s) === L && _this57.completeConfig(s), (_o$model7 = (o = _this57.rawBody).model) !== null && _o$model7 !== void 0 ? _o$model7 : o.model = "black-forest-labs/FLUX.1-schnell-Free";
    return _this57;
  }
  _inherits(vl, _T13);
  return _createClass(vl, [{
    key: "preprocessBody",
    value: function preprocessBody(e, t) {
      var n = JSON.parse(JSON.stringify(e)),
        s = t[t.length - 1];
      return n.prompt = (s == null ? void 0 : s[h]) || "", n;
    }
  }, {
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI19 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee120(e, t) {
        return _regenerator().w(function (_context120) {
          while (1) switch (_context120.n) {
            case 0:
              return _context120.a(2, this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this)));
          }
        }, _callee120, this);
      }));
      function callServiceAPI(_x226, _x227) {
        return _callServiceAPI19.apply(this, arguments);
      }
      return callServiceAPI;
    }()
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData22 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee121(e) {
        var t;
        return _regenerator().w(function (_context121) {
          while (1) switch (_context121.n) {
            case 0:
              t = e.data.map(function (n) {
                return n != null && n.url ? _defineProperty(_defineProperty({}, Y, n.url), C, j) : n != null && n.b64_json ? _defineProperty(_defineProperty({}, Y, "data:image/png;base64,".concat(n.b64_json)), C, j) : _defineProperty(_defineProperty({}, Y, ""), C, j);
              });
              return _context121.a(2, _defineProperty({}, y, t));
          }
        }, _callee121);
      }));
      function extractResultData(_x228) {
        return _extractResultData22.apply(this, arguments);
      }
      return extractResultData;
    }()
  }]);
}(T);
var ss = /*#__PURE__*/function (_T14) {
  // https://platform.openai.com/docs/models/gpt-4o-audio-preview
  // prettier-ignore
  function ss(e, t, n, s, r) {
    var _this58$maxMessages, _b$model;
    var _this58;
    _classCallCheck(this, ss);
    var p, u, g, v, b;
    var o = JSON.parse(JSON.stringify(e.directConnection)),
      a = t || pn(),
      c = n || un,
      l = s || o.openAI;
    _this58 = _callSuper(this, ss, [e, a, c, l]), _this58.insertKeyPlaceholderText = _this58.genereteAPIKeyName("OpenAI"), _this58.keyHelpUrl = "https://platform.openai.com/account/api-keys", _this58.url = "https://api.openai.com/v1/chat/completions", _this58.permittedErrorPrefixes = [as, "Invalid value"];
    var d = r || ((p = o.openAI) == null ? void 0 : p.chat);
    _typeof(d) === L && _this58.completeConfig(d, (v = (g = (u = e.directConnection) == null ? void 0 : u.openAI) == null ? void 0 : g.chat) == null ? void 0 : v.function_handler), (_this58$maxMessages = _this58.maxMessages) !== null && _this58$maxMessages !== void 0 ? _this58$maxMessages : _this58.maxMessages = -1, (_b$model = (b = _this58.rawBody).model) !== null && _b$model !== void 0 ? _b$model : b.model = "gpt-4o";
    return _this58;
  }
  _inherits(ss, _T14);
  return _createClass(ss, [{
    key: "preprocessBody",
    value: function preprocessBody(e, t) {
      var n = JSON.parse(JSON.stringify(e)),
        s = this.processMessages(t).map(function (r) {
          return {
            content: ss.getContent(r),
            role: T.getRoleViaUser(r.role)
          };
        });
      return this.addSystemMessage(s), n.messages = s, n;
    }
  }, {
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI20 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee122(e, t) {
        var _this$messages;
        return _regenerator().w(function (_context122) {
          while (1) switch (_context122.n) {
            case 0:
              (_this$messages = this.messages) !== null && _this$messages !== void 0 ? _this$messages : this.messages = e, this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this), {});
            case 1:
              return _context122.a(2);
          }
        }, _callee122, this);
      }));
      function callServiceAPI(_x229, _x230) {
        return _callServiceAPI20.apply(this, arguments);
      }
      return callServiceAPI;
    }()
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData23 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee123(e, t) {
        var n, s, r, o, a, c, l, d;
        return _regenerator().w(function (_context123) {
          while (1) switch (_context123.n) {
            case 0:
              if (!e[f]) {
                _context123.n = 1;
                break;
              }
              throw e[f].message;
            case 1:
              if (!((s = (n = e.choices) == null ? void 0 : n[0]) != null && s.delta)) {
                _context123.n = 2;
                break;
              }
              return _context123.a(2, this.extractStreamResult(e.choices[0], t));
            case 2:
              if (!((o = (r = e.choices) == null ? void 0 : r[0]) != null && o.message)) {
                _context123.n = 5;
                break;
              }
              if (!e.choices[0].message.tool_calls) {
                _context123.n = 3;
                break;
              }
              return _context123.a(2, this.handleToolsGeneric(e.choices[0].message, this.functionHandler, this.messages, t));
            case 3:
              if (!((a = e.choices[0].message) != null && a[P])) {
                _context123.n = 4;
                break;
              }
              l = this.deepChat.textToSpeech, d = _typeof(l) == "object" && typeof ((c = l == null ? void 0 : l[P]) == null ? void 0 : c.displayText) == "boolean";
              return _context123.a(2, _defineProperty(_defineProperty({}, y, [_defineProperty(_defineProperty({}, Y, "data:audio/wav;base64,".concat(e.choices[0].message[P].data)), C, P)]), h, d ? e.choices[0].message[P].transcript : void 0));
            case 4:
              return _context123.a(2, _defineProperty({}, h, e.choices[0].message.content));
            case 5:
              return _context123.a(2, _defineProperty({}, h, ""));
          }
        }, _callee123, this);
      }));
      function extractResultData(_x231, _x232) {
        return _extractResultData23.apply(this, arguments);
      }
      return extractResultData;
    }()
  }, {
    key: "extractStreamResult",
    value: function () {
      var _extractStreamResult = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee124(e, t) {
        return _regenerator().w(function (_context124) {
          while (1) switch (_context124.n) {
            case 0:
              return _context124.a(2, this.extractStreamResultWToolsGeneric(this, e, this.functionHandler, t));
          }
        }, _callee124, this);
      }));
      function extractStreamResult(_x233, _x234) {
        return _extractStreamResult.apply(this, arguments);
      }
      return extractStreamResult;
    }()
  }], [{
    key: "getFileContent",
    value: function getFileContent(e) {
      return e.map(function (n) {
        var s, r, o;
        if (n.type === P) {
          var a = (s = n.src) == null ? void 0 : s.split(",")[1],
            c = ((o = (r = n.name) == null ? void 0 : r.split(".").pop()) == null ? void 0 : o.toLowerCase()) || "wav";
          return _defineProperty(_defineProperty({}, C, "input_audio"), "input_audio", {
            data: a,
            format: c
          });
        }
        return _defineProperty(_defineProperty({}, C, "image_url"), "image_url", {
          url: n.src
        });
      });
    }
  }, {
    key: "getContent",
    value: function getContent(e) {
      if (e[y] && e[y].length > 0) {
        var t = ss.getFileContent(e[y]);
        return e[h] && e[h].trim().length > 0 && t.unshift(_defineProperty(_defineProperty({}, C, h), h, e[h])), t;
      }
      return e[h];
    }
  }]);
}(T);
var Fi = /*#__PURE__*/function (_ss) {
  function Fi(e) {
    var _this59;
    _classCallCheck(this, Fi);
    var o, a, c, l, d, p, u;
    var t = JSON.parse(JSON.stringify(e.directConnection)),
      n = t.azure,
      s = ((a = (o = t.azure) == null ? void 0 : o.openAI) == null ? void 0 : a.urlDetails) || {},
      r = (l = (c = t.azure) == null ? void 0 : c.openAI) == null ? void 0 : l.chat;
    if (_this59 = _callSuper(this, Fi, [e, po(s), uo, n, r]), _this59.permittedErrorPrefixes = [Is], _this59.isTextInputDisabled = !1, _typeof(r) === L) {
      var _ref118 = (u = (p = (d = e.directConnection) == null ? void 0 : d.azure) == null ? void 0 : p.openAI) == null ? void 0 : u.chat,
        g = _ref118.function_handler;
      g && (_this59.functionHandler = g);
    }
    fo(s) ? _this59.url = Fi.buildURL(s) : (_this59.isTextInputDisabled = !0, _this59.canSendMessage = function () {
      return !1;
    }, setTimeout(function () {
      e.addMessage(_defineProperty({}, f, Is));
    }));
    return _this59;
  }
  _inherits(Fi, _ss);
  return _createClass(Fi, null, [{
    key: "buildURL",
    value: function buildURL(e) {
      var t = e.endpoint,
        n = e.deploymentId,
        s = e.version;
      return "".concat(t, "/openai/deployments/").concat(n, "/chat/completions?api-version=").concat(s);
    }
  }]);
}(ss);
var ks = /*#__PURE__*/function (_T15) {
  function ks(e) {
    var _this60$maxMessages, _l$model2;
    var _this60;
    _classCallCheck(this, ks);
    var r, o, a, c, l;
    var t = JSON.parse(JSON.stringify(e.directConnection)),
      n = t.bigModel;
    _this60 = _callSuper(this, ks, [e, Ni(), Oi, n]), _this60.insertKeyPlaceholderText = _this60.genereteAPIKeyName("BigModel"), _this60.keyHelpUrl = "https://open.bigmodel.cn/usercenter/apikeys", _this60.url = "https://open.bigmodel.cn/api/paas/v4/chat/completions", _this60.permittedErrorPrefixes = [ie, ye];
    var s = (r = t.bigModel) == null ? void 0 : r.chat;
    _typeof(s) === L && _this60.completeConfig(s, (c = (a = (o = e.directConnection) == null ? void 0 : o.bigModel) == null ? void 0 : a.chat) == null ? void 0 : c.function_handler), (_this60$maxMessages = _this60.maxMessages) !== null && _this60$maxMessages !== void 0 ? _this60$maxMessages : _this60.maxMessages = -1, (_l$model2 = (l = _this60.rawBody).model) !== null && _l$model2 !== void 0 ? _l$model2 : l.model = "glm-4.5";
    return _this60;
  }
  _inherits(ks, _T15);
  return _createClass(ks, [{
    key: "preprocessBody",
    value: function preprocessBody(e, t) {
      var n = JSON.parse(JSON.stringify(e)),
        s = this.processMessages(t).map(function (r) {
          return {
            content: ks.getTextWFilesContent(r, ks.getFileContent),
            role: T.getRoleViaAI(r.role)
          };
        });
      return this.addSystemMessage(s), n.messages = s, n;
    }
  }, {
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI21 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee125(e, t) {
        var _this$messages2;
        return _regenerator().w(function (_context125) {
          while (1) switch (_context125.n) {
            case 0:
              (_this$messages2 = this.messages) !== null && _this$messages2 !== void 0 ? _this$messages2 : this.messages = e, this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this), {});
            case 1:
              return _context125.a(2);
          }
        }, _callee125, this);
      }));
      function callServiceAPI(_x235, _x236) {
        return _callServiceAPI21.apply(this, arguments);
      }
      return callServiceAPI;
    }()
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData24 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee126(e, t) {
        var _n8;
        return _regenerator().w(function (_context126) {
          while (1) switch (_context126.n) {
            case 0:
              if (!e[f]) {
                _context126.n = 1;
                break;
              }
              throw e[f].message;
            case 1:
              if (!(e.choices.length > 0)) {
                _context126.n = 3;
                break;
              }
              if (!(e.choices[0].delta !== void 0)) {
                _context126.n = 2;
                break;
              }
              return _context126.a(2, this.extractStreamResult(e.choices[0], t));
            case 2:
              if (!(e.choices[0].message !== void 0)) {
                _context126.n = 3;
                break;
              }
              _n8 = e.choices[0].message;
              return _context126.a(2, _n8.tool_calls ? this.handleToolsGeneric({
                tool_calls: _n8.tool_calls
              }, this.functionHandler, this.messages, t) : _defineProperty({}, h, _n8.content));
            case 3:
              return _context126.a(2, _defineProperty({}, h, ""));
          }
        }, _callee126, this);
      }));
      function extractResultData(_x237, _x238) {
        return _extractResultData24.apply(this, arguments);
      }
      return extractResultData;
    }()
  }, {
    key: "extractStreamResult",
    value: function () {
      var _extractStreamResult2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee127(e, t) {
        var o, a, c, l, n, s, r, d;
        return _regenerator().w(function (_context127) {
          while (1) switch (_context127.n) {
            case 0:
              n = e.delta, s = e.finish_reason, r = (o = this.messages) == null ? void 0 : o.messageToElements[this.messages.messageToElements.length - 2];
              if (!((r == null ? void 0 : r[0].role) === W && ((a = r == null ? void 0 : r[0][h]) == null ? void 0 : a.replace(/\n/g, "").trim().length) === 0 && ((c = this.messages) == null || c.removeMessage(r[1][h]), (l = this.messages) == null || l.messageToElements.splice(this.messages.messageToElements.length - 2, 1)), s === "tool_calls")) {
                _context127.n = 2;
                break;
              }
              if (!n.tool_calls) {
                _context127.n = 1;
                break;
              }
              d = {
                tool_calls: n.tool_calls
              };
              return _context127.a(2, this.handleToolsGeneric(d, this.functionHandler, this.messages, t));
            case 1:
              return _context127.a(2, _defineProperty({}, h, (n == null ? void 0 : n.content) || ""));
            case 2:
              return _context127.a(2, _defineProperty({}, h, (n == null ? void 0 : n.content) || ""));
          }
        }, _callee127, this);
      }));
      function extractStreamResult(_x239, _x240) {
        return _extractStreamResult2.apply(this, arguments);
      }
      return extractStreamResult;
    }()
  }], [{
    key: "getFileContent",
    value: function getFileContent(e) {
      return e.map(function (t) {
        return t.type === j ? _defineProperty(_defineProperty({}, C, "image_url"), "image_url", {
          url: t.src || ""
        }) : _defineProperty(_defineProperty({}, C, le), "file_url", {
          url: t.src || ""
        });
      });
    }
  }]);
}(T);
var _l = /*#__PURE__*/function (_T16) {
  function _l(e) {
    var _this61$maxMessages, _o$model8;
    var _this61;
    _classCallCheck(this, _l);
    var r, o;
    var t = JSON.parse(JSON.stringify(e.directConnection)),
      n = t.together;
    _this61 = _callSuper(this, _l, [e, Li(), Pi, n]), _this61.insertKeyPlaceholderText = _this61.genereteAPIKeyName("Together AI"), _this61.keyHelpUrl = "https://api.together.xyz/settings/api-keys", _this61.url = "https://api.together.xyz/v1/chat/completions", _this61.permittedErrorPrefixes = [Ge, ye];
    var s = (r = t.together) == null ? void 0 : r.chat;
    _typeof(s) === L && _this61.completeConfig(s), (_this61$maxMessages = _this61.maxMessages) !== null && _this61$maxMessages !== void 0 ? _this61$maxMessages : _this61.maxMessages = -1, (_o$model8 = (o = _this61.rawBody).model) !== null && _o$model8 !== void 0 ? _o$model8 : o.model = "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo";
    return _this61;
  }
  _inherits(_l, _T16);
  return _createClass(_l, [{
    key: "preprocessBody",
    value: function preprocessBody(e, t) {
      var n = JSON.parse(JSON.stringify(e)),
        s = this.processMessages(t).map(function (r) {
          return {
            content: r[h] || "",
            role: r.role === W ? gt : r.role
          };
        });
      return this.addSystemMessage(s), n.messages = s, n;
    }
  }, {
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI22 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee128(e, t) {
        return _regenerator().w(function (_context128) {
          while (1) switch (_context128.n) {
            case 0:
              this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this), {});
            case 1:
              return _context128.a(2);
          }
        }, _callee128, this);
      }));
      function callServiceAPI(_x241, _x242) {
        return _callServiceAPI22.apply(this, arguments);
      }
      return callServiceAPI;
    }()
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData25 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee129(e) {
        return _regenerator().w(function (_context129) {
          while (1) switch (_context129.n) {
            case 0:
              if (!e[f]) {
                _context129.n = 1;
                break;
              }
              throw e[f].message;
            case 1:
              if (!(e.choices.length > 0)) {
                _context129.n = 3;
                break;
              }
              if (!(e.choices[0].message !== void 0)) {
                _context129.n = 2;
                break;
              }
              return _context129.a(2, _defineProperty({}, h, e.choices[0].message.content));
            case 2:
              if (!(e.choices[0].delta !== void 0)) {
                _context129.n = 3;
                break;
              }
              return _context129.a(2, _defineProperty({}, h, e.choices[0].delta.content));
            case 3:
              return _context129.a(2, _defineProperty({}, h, ""));
          }
        }, _callee129);
      }));
      function extractResultData(_x243) {
        return _extractResultData25.apply(this, arguments);
      }
      return extractResultData;
    }()
  }]);
}(T);
var Ke = /*#__PURE__*/function (_T17) {
  function Ke(e) {
    var _this62;
    _classCallCheck(this, Ke);
    var o;
    var t = e.directConnection,
      n = t == null ? void 0 : t.openAI,
      s = {
        images: _defineProperty({}, y, {
          acceptedFormats: ".png",
          maxNumberOfFiles: 2
        })
      };
    _this62 = _callSuper(this, Ke, [e, pn(), un, n, s]), _this62.insertKeyPlaceholderText = _this62.genereteAPIKeyName("OpenAI"), _this62.keyHelpUrl = "https://platform.openai.com/account/api-keys", _this62.url = "", _this62.permittedErrorPrefixes = [as, "Invalid input image"];
    var r = (o = t == null ? void 0 : t.openAI) == null ? void 0 : o[z];
    if (_this62[Re]) {
      var a = _typeof(r) == "object" && r.size ? Number.parseInt(r.size) : 1024;
      _this62[Re][y] = {
        dimensions: {
          width: a,
          height: a
        }
      };
    }
    _typeof(r) === L && Object.assign(_this62.rawBody, r), _this62.canSendMessage = Ke.canFileSendMessage;
    return _this62;
  }
  _inherits(Ke, _T17);
  return _createClass(Ke, [{
    key: "preprocessBody",
    value: function preprocessBody(e, t) {
      var n = JSON.parse(JSON.stringify(e));
      return t && t !== "" && (n.prompt = t), n;
    }
    // prettier-ignore
  }, {
    key: "callApiWithImage",
    value: function callApiWithImage(e, t, n) {
      var o, a;
      var s;
      var r = (a = (o = t[t.length - 1]) == null ? void 0 : o[h]) == null ? void 0 : a.trim();
      if (n[1] || r && r !== "") {
        this.url = Ke.IMAGE_EDIT_URL;
        var c = this.preprocessBody(this.rawBody, r);
        s = Ke.createFormDataBody(c, n[0], n[1]);
      } else this.url = Ke.IMAGE_VARIATIONS_URL, s = Ke.createFormDataBody(this.rawBody, n[0]);
      M.tempRemoveContentHeader(this.connectSettings, ne.request.bind(this, this, s, e), !1);
    }
  }, {
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI23 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee130(e, t, n) {
        var s, r;
        return _regenerator().w(function (_context130) {
          while (1) switch (_context130.n) {
            case 0:
              if ((s = this.connectSettings) != null && s.headers) {
                _context130.n = 1;
                break;
              }
              throw new Error(Ie);
            case 1:
              if (!(n != null && n[0])) {
                _context130.n = 2;
                break;
              }
              this.callApiWithImage(e, t, n);
              _context130.n = 4;
              break;
            case 2:
              if (this.connectSettings) {
                _context130.n = 3;
                break;
              }
              throw new Error(Ie);
            case 3:
              this.url = Ke.IMAGE_GENERATION_URL;
              r = this.preprocessBody(this.rawBody, t[t.length - 1][h]);
              ne.request(this, r, e);
            case 4:
              return _context130.a(2);
          }
        }, _callee130, this);
      }));
      function callServiceAPI(_x244, _x245, _x246) {
        return _callServiceAPI23.apply(this, arguments);
      }
      return callServiceAPI;
    }()
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData26 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee131(e) {
        var t;
        return _regenerator().w(function (_context131) {
          while (1) switch (_context131.n) {
            case 0:
              if (!e[f]) {
                _context131.n = 1;
                break;
              }
              throw e[f].message;
            case 1:
              t = e.data.map(function (n) {
                return n.url ? _defineProperty(_defineProperty({}, Y, n.url), C, j) : _defineProperty(_defineProperty({}, Y, "".concat(hn).concat(n.b64_json)), C, j);
              });
              return _context131.a(2, _defineProperty({}, y, t));
          }
        }, _callee131);
      }));
      function extractResultData(_x247) {
        return _extractResultData26.apply(this, arguments);
      }
      return extractResultData;
    }() // private static readonly MODAL_MARKDOWN = `
    // 1 image:
    // - With text - edits image based on the text
    // - No text - creates a variation of the image
    // 2 images:
    // - The second image needs to be a copy of the first with a transparent area where the edit should take place.
    // Add text to describe the required modification.
    // Click here for [more info](https://platform.openai.com/docs/guides/images/introduction).
    //   `;
  }], [{
    key: "canFileSendMessage",
    value: function canFileSendMessage(e, t) {
      return !!(t != null && t[0]) || !!(e && e.trim() !== "");
    }
  }, {
    key: "createFormDataBody",
    value: function createFormDataBody(e, t, n) {
      var s = new FormData();
      return s.append(j, t), n && s.append("mask", n), Object.keys(e).forEach(function (r) {
        s.append(r, String(e[r]));
      }), s;
    }
  }]);
}(T);
Ke.IMAGE_GENERATION_URL = "https://api.openai.com/v1/images/generations", Ke.IMAGE_VARIATIONS_URL = "https://api.openai.com/v1/images/variations", Ke.IMAGE_EDIT_URL = "https://api.openai.com/v1/images/edits";
var Ei = Ke;
var El = function El(i) {
    return _defineProperty(_defineProperty({}, ie, "".concat(ge).concat(i)), B, V);
  },
  Sl = function Sl(i, e, t, n) {
    var s = i;
    s[f] ? s[f].type === ye ? n(se) : n(Fe) : t(e);
  },
  xl = function xl() {
    return oe("https://openrouter.ai/api/v1/key", re, Sl);
  };
var jn = /*#__PURE__*/function (_T18) {
  function jn(e) {
    var _this63$maxMessages, _o$model9, _a$max_tokens;
    var _this63;
    _classCallCheck(this, jn);
    var s, r, o, a;
    var n = JSON.parse(JSON.stringify(e.directConnection)).openRouter;
    _this63 = _callSuper(this, jn, [e, xl(), El, n]), _this63.insertKeyPlaceholderText = _this63.genereteAPIKeyName("OpenRouter"), _this63.keyHelpUrl = "https://openrouter.ai/keys", _this63.url = "https://openrouter.ai/api/v1/chat/completions", _this63.permittedErrorPrefixes = [Ge, ye], _typeof(n) === L && _this63.completeConfig(n, (r = (s = e.directConnection) == null ? void 0 : s.openRouter) == null ? void 0 : r.function_handler), (_this63$maxMessages = _this63.maxMessages) !== null && _this63$maxMessages !== void 0 ? _this63$maxMessages : _this63.maxMessages = -1, (_o$model9 = (o = _this63.rawBody).model) !== null && _o$model9 !== void 0 ? _o$model9 : o.model = "openai/gpt-4o", (_a$max_tokens = (a = _this63.rawBody).max_tokens) !== null && _a$max_tokens !== void 0 ? _a$max_tokens : a.max_tokens = 1e3;
    return _this63;
  }
  _inherits(jn, _T18);
  return _createClass(jn, [{
    key: "preprocessBody",
    value: function preprocessBody(e, t) {
      var n = JSON.parse(JSON.stringify(e)),
        s = this.processMessages(t).map(function (o) {
          return {
            content: jn.getContent(o),
            role: T.getRoleViaUser(o.role)
          };
        }),
        r = [];
      return this.systemMessage && r.push({
        role: "system",
        content: this.systemMessage
      }), r.push.apply(r, _toConsumableArray(s)), n.messages = r, n;
    }
  }, {
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI24 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee132(e, t) {
        var _this$messages3;
        return _regenerator().w(function (_context132) {
          while (1) switch (_context132.n) {
            case 0:
              (_this$messages3 = this.messages) !== null && _this$messages3 !== void 0 ? _this$messages3 : this.messages = e, this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this), {});
            case 1:
              return _context132.a(2);
          }
        }, _callee132, this);
      }));
      function callServiceAPI(_x248, _x249) {
        return _callServiceAPI24.apply(this, arguments);
      }
      return callServiceAPI;
    }()
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData27 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee133(e, t) {
        var n, s, r, o, a, c, _a5, _c4;
        return _regenerator().w(function (_context133) {
          while (1) switch (_context133.n) {
            case 0:
              if (!e[f]) {
                _context133.n = 1;
                break;
              }
              throw e[f].message;
            case 1:
              if (!(e.object === "chat.completion.chunk")) {
                _context133.n = 4;
                break;
              }
              a = (n = e.choices) == null ? void 0 : n[0];
              if (!(a != null && a.delta)) {
                _context133.n = 2;
                break;
              }
              return _context133.a(2, this.extractStreamResult(a, t));
            case 2:
              if (!((s = e.message) != null && s[z])) {
                _context133.n = 3;
                break;
              }
              c = e.message[z].map(function (l) {
                return _defineProperty({}, Y, l.image_url.url);
              });
              return _context133.a(2, _defineProperty(_defineProperty({}, h, e.message.content || ""), y, c));
            case 3:
              return _context133.a(2, _defineProperty({}, h, ""));
            case 4:
              if (!(e.object === "chat.completion")) {
                _context133.n = 6;
                break;
              }
              _a5 = (r = e.choices) == null ? void 0 : r[0];
              if (!(_a5 != null && _a5.message)) {
                _context133.n = 6;
                break;
              }
              if (!_a5.message.tool_calls) {
                _context133.n = 5;
                break;
              }
              return _context133.a(2, this.handleToolsGeneric({
                tool_calls: _a5.message.tool_calls
              }, this.functionHandler, this.messages, t));
            case 5:
              _c4 = ((o = _a5.message[z]) == null ? void 0 : o.map(function (l) {
                return _defineProperty({}, Y, l.image_url.url);
              })) || [];
              return _context133.a(2, _defineProperty(_defineProperty({}, h, _a5.message.content || ""), "files", _c4));
            case 6:
              return _context133.a(2, _defineProperty({}, h, ""));
          }
        }, _callee133, this);
      }));
      function extractResultData(_x250, _x251) {
        return _extractResultData27.apply(this, arguments);
      }
      return extractResultData;
    }()
  }, {
    key: "extractStreamResult",
    value: function () {
      var _extractStreamResult3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee134(e, t) {
        var n, s;
        return _regenerator().w(function (_context134) {
          while (1) switch (_context134.n) {
            case 0:
              n = e.delta;
              if (!(n != null && n[z])) {
                _context134.n = 1;
                break;
              }
              s = n[z].map(function (r) {
                return _defineProperty({}, Y, r.image_url.url);
              });
              return _context134.a(2, _defineProperty(_defineProperty({}, h, n.content || ""), y, s));
            case 1:
              return _context134.a(2, this.extractStreamResultWToolsGeneric(this, e, this.functionHandler, t));
          }
        }, _callee134, this);
      }));
      function extractStreamResult(_x252, _x253) {
        return _extractStreamResult3.apply(this, arguments);
      }
      return extractStreamResult;
    }()
  }], [{
    key: "getAudioContent",
    value: function getAudioContent(e) {
      return e.filter(function (t) {
        return t.type === P;
      }).map(function (t) {
        var r, o, a;
        var n = (r = t.src) == null ? void 0 : r.split(",")[1],
          s = (a = (o = t.src) == null ? void 0 : o.match(/data:audio\/([^;]+)/)) == null ? void 0 : a[1];
        return _defineProperty(_defineProperty({}, C, "input_audio"), "input_audio", {
          data: n || "",
          format: s === "wav" || s === "mp3" ? s : "mp3"
        });
      }).filter(function (t) {
        return t.input_audio.data.length > 0;
      });
    }
  }, {
    key: "getContent",
    value: function getContent(e) {
      if (e[y] && e[y].length > 0) {
        var t = [].concat(_toConsumableArray(jn.getImageContent(e[y])), _toConsumableArray(jn.getAudioContent(e[y])));
        return e[h] && e[h].trim().length > 0 && t.unshift(_defineProperty(_defineProperty({}, C, h), h, e[h])), t.length > 0 ? t : e[h] || "";
      }
      return e[h] || "";
    }
  }]);
}(T);
var Al = function Al(i) {
    return _defineProperty(_defineProperty({}, ie, "".concat(ge).concat(i)), B, V);
  },
  wl = function wl(i, e, t, n) {
    i[f] ? n(se) : t(e);
  },
  Cl = function Cl() {
    return oe("https://api.perplexity.ai/chat/completions", fe, wl);
  };
var Tl = /*#__PURE__*/function (_T19) {
  function Tl(e) {
    var _this64$maxMessages, _s$model;
    var _this64;
    _classCallCheck(this, Tl);
    var s;
    var n = JSON.parse(JSON.stringify(e.directConnection)).perplexity;
    _this64 = _callSuper(this, Tl, [e, Cl(), Al, n]), _this64.insertKeyPlaceholderText = _this64.genereteAPIKeyName("Perplexity"), _this64.keyHelpUrl = "https://www.perplexity.ai/settings/api", _this64.url = "https://api.perplexity.ai/chat/completions", _this64.permittedErrorPrefixes = [Ct, Zr, "Permission denied"], _typeof(n) === L && _this64.completeConfig(n), (_this64$maxMessages = _this64.maxMessages) !== null && _this64$maxMessages !== void 0 ? _this64$maxMessages : _this64.maxMessages = -1, (_s$model = (s = _this64.rawBody).model) !== null && _s$model !== void 0 ? _s$model : s.model = "sonar";
    return _this64;
  }
  _inherits(Tl, _T19);
  return _createClass(Tl, [{
    key: "preprocessBody",
    value: function preprocessBody(e, t) {
      var n = JSON.parse(JSON.stringify(e)),
        s = this.processMessages(t).map(function (r) {
          return {
            content: r[h] || "",
            role: T.getRoleViaUser(r.role)
          };
        });
      return this.addSystemMessage(s), n.messages = s, n;
    }
  }, {
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI25 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee135(e, t) {
        return _regenerator().w(function (_context135) {
          while (1) switch (_context135.n) {
            case 0:
              this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this), {});
            case 1:
              return _context135.a(2);
          }
        }, _callee135, this);
      }));
      function callServiceAPI(_x254, _x255) {
        return _callServiceAPI25.apply(this, arguments);
      }
      return callServiceAPI;
    }()
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData28 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee136(e) {
        var t;
        return _regenerator().w(function (_context136) {
          while (1) switch (_context136.n) {
            case 0:
              if (!e[f]) {
                _context136.n = 1;
                break;
              }
              throw e[f].message;
            case 1:
              if (!(e.choices && e.choices.length > 0)) {
                _context136.n = 3;
                break;
              }
              t = e.choices[0];
              if (!(t.delta && t.delta.content)) {
                _context136.n = 2;
                break;
              }
              return _context136.a(2, _defineProperty({}, h, t.delta.content));
            case 2:
              if (!(t.message && t.message.content)) {
                _context136.n = 3;
                break;
              }
              return _context136.a(2, _defineProperty({}, h, t.message.content));
            case 3:
              return _context136.a(2, _defineProperty({}, h, ""));
          }
        }, _callee136);
      }));
      function extractResultData(_x256) {
        return _extractResultData28.apply(this, arguments);
      }
      return extractResultData;
    }()
  }]);
}(T);
var Rl = function Rl(i) {
    return _defineProperty(_defineProperty({}, ie, "".concat(ge).concat(i)), B, V);
  },
  Il = function Il(i, e, t, n) {
    var s = i;
    s[f] ? s[f].type === ye ? n(se) : n(Fe) : t(e);
  },
  Ml = function Ml() {
    return oe("https://api.deepseek.com/models", re, Il);
  };
var kl = /*#__PURE__*/function (_T20) {
  function kl(e) {
    var _this65$maxMessages, _s$model2, _r$temperature, _o$max_tokens;
    var _this65;
    _classCallCheck(this, kl);
    var s, r, o;
    var n = JSON.parse(JSON.stringify(e.directConnection)).deepSeek;
    _this65 = _callSuper(this, kl, [e, Ml(), Rl, n]), _this65.insertKeyPlaceholderText = _this65.genereteAPIKeyName("DeepSeek"), _this65.keyHelpUrl = "https://platform.deepseek.com/api_keys", _this65.url = "https://api.deepseek.com/v1/chat/completions", _this65.permittedErrorPrefixes = [Ge, ye], _typeof(n) === L && _this65.completeConfig(n), (_this65$maxMessages = _this65.maxMessages) !== null && _this65$maxMessages !== void 0 ? _this65$maxMessages : _this65.maxMessages = -1, (_s$model2 = (s = _this65.rawBody).model) !== null && _s$model2 !== void 0 ? _s$model2 : s.model = "deepseek-chat", (_r$temperature = (r = _this65.rawBody).temperature) !== null && _r$temperature !== void 0 ? _r$temperature : r.temperature = 1, (_o$max_tokens = (o = _this65.rawBody).max_tokens) !== null && _o$max_tokens !== void 0 ? _o$max_tokens : o.max_tokens = 4096;
    return _this65;
  }
  _inherits(kl, _T20);
  return _createClass(kl, [{
    key: "preprocessBody",
    value: function preprocessBody(e, t) {
      var n = JSON.parse(JSON.stringify(e)),
        s = this.processMessages(t).map(function (r) {
          return {
            content: r[h] || "",
            role: T.getRoleViaUser(r.role)
          };
        });
      return this.addSystemMessage(s), n.messages = s, n;
    }
  }, {
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI26 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee137(e, t) {
        return _regenerator().w(function (_context137) {
          while (1) switch (_context137.n) {
            case 0:
              this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this), {});
            case 1:
              return _context137.a(2);
          }
        }, _callee137, this);
      }));
      function callServiceAPI(_x257, _x258) {
        return _callServiceAPI26.apply(this, arguments);
      }
      return callServiceAPI;
    }()
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData29 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee138(e) {
        var t;
        return _regenerator().w(function (_context138) {
          while (1) switch (_context138.n) {
            case 0:
              if (!e[f]) {
                _context138.n = 1;
                break;
              }
              throw e[f].message;
            case 1:
              if (!(e.choices && e.choices.length > 0)) {
                _context138.n = 3;
                break;
              }
              t = e.choices[0];
              if (!(t.delta && t.delta.content)) {
                _context138.n = 2;
                break;
              }
              return _context138.a(2, _defineProperty({}, h, t.delta.content));
            case 2:
              if (!(t.message && t.message.content)) {
                _context138.n = 3;
                break;
              }
              return _context138.a(2, _defineProperty({}, h, t.message.content));
            case 3:
              return _context138.a(2, _defineProperty({}, h, ""));
          }
        }, _callee138);
      }));
      function extractResultData(_x259) {
        return _extractResultData29.apply(this, arguments);
      }
      return extractResultData;
    }()
  }]);
}(T);
var Ol = function Ol(i) {
    return _defineProperty(_defineProperty({}, ie, "".concat(ge).concat(i)), B, V);
  },
  Nl = function Nl(i, e, t, n) {
    var r;
    ((r = i.base_resp) == null ? void 0 : r.status_code) === 1004 ? n(se) : t(e);
  },
  Pl = function Pl() {
    return oe("https://api.minimax.io/v1/files/delete", fe, Nl);
  };
var Ll = /*#__PURE__*/function (_T21) {
  function Ll(e) {
    var _this66$maxMessages, _s$model3;
    var _this66;
    _classCallCheck(this, Ll);
    var s;
    var n = JSON.parse(JSON.stringify(e.directConnection)).miniMax;
    _this66 = _callSuper(this, Ll, [e, Pl(), Ol, n]), _this66.insertKeyPlaceholderText = _this66.genereteAPIKeyName("MiniMax"), _this66.keyHelpUrl = "https://www.minimaxi.com", _this66.url = "https://api.minimax.io/v1/text/chatcompletion_v2", _this66.permittedErrorPrefixes = [Ge, ye, "insufficient balance"], _typeof(n) === L && _this66.completeConfig(n), (_this66$maxMessages = _this66.maxMessages) !== null && _this66$maxMessages !== void 0 ? _this66$maxMessages : _this66.maxMessages = -1, (_s$model3 = (s = _this66.rawBody).model) !== null && _s$model3 !== void 0 ? _s$model3 : s.model = "MiniMax-M1";
    return _this66;
  }
  _inherits(Ll, _T21);
  return _createClass(Ll, [{
    key: "preprocessBody",
    value: function preprocessBody(e, t) {
      var n = JSON.parse(JSON.stringify(e)),
        s = this.processMessages(t).map(function (r) {
          return {
            content: r[h] || "",
            role: T.getRoleViaUser(r.role)
          };
        });
      return this.addSystemMessage(s), n.messages = s, n;
    }
  }, {
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI27 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee139(e, t) {
        return _regenerator().w(function (_context139) {
          while (1) switch (_context139.n) {
            case 0:
              this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this), {});
            case 1:
              return _context139.a(2);
          }
        }, _callee139, this);
      }));
      function callServiceAPI(_x260, _x261) {
        return _callServiceAPI27.apply(this, arguments);
      }
      return callServiceAPI;
    }()
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData30 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee140(e) {
        var t, _n9;
        return _regenerator().w(function (_context140) {
          while (1) switch (_context140.n) {
            case 0:
              if (!e[f]) {
                _context140.n = 1;
                break;
              }
              throw e[f].message;
            case 1:
              if (!(e.choices && e.choices.length > 0)) {
                _context140.n = 3;
                break;
              }
              _n9 = e.choices[0];
              if (!(_n9.delta && _n9.delta.content)) {
                _context140.n = 2;
                break;
              }
              return _context140.a(2, _defineProperty({}, h, _n9.delta.content));
            case 2:
              if (!(_n9.message && _n9.message.content)) {
                _context140.n = 3;
                break;
              }
              return _context140.a(2, _defineProperty({}, h, _n9.message.content));
            case 3:
              if (!(typeof ((t = e.base_resp) == null ? void 0 : t.status_code) == "number" && e.base_resp.status_code > 0)) {
                _context140.n = 4;
                break;
              }
              throw e.base_resp.status_msg;
            case 4:
              return _context140.a(2, _defineProperty({}, h, ""));
          }
        }, _callee140);
      }));
      function extractResultData(_x262) {
        return _extractResultData30.apply(this, arguments);
      }
      return extractResultData;
    }()
  }]);
}(T);
var Bl = function Bl(i) {
    return _defineProperty(_defineProperty(_defineProperty({}, ie, "".concat(ge).concat(i)), B, V), "accept", V);
  },
  Dl = function Dl(i, e, t, n) {
    i.detail ? n(se) : t(e);
  },
  Fl = function Fl() {
    return oe("https://api.mistral.ai/v1/models", re, Dl);
  };
var Ui = /*#__PURE__*/function (_T22) {
  function Ui(e) {
    var _this67$maxMessages, _o$model0;
    var _this67;
    _classCallCheck(this, Ui);
    var s, r, o;
    var n = JSON.parse(JSON.stringify(e.directConnection)).mistral;
    _this67 = _callSuper(this, Ui, [e, Fl(), Bl, n]), _this67.insertKeyPlaceholderText = _this67.genereteAPIKeyName("Mistral"), _this67.keyHelpUrl = "https://console.mistral.ai/api-keys/", _this67.url = "https://api.mistral.ai/v1/chat/completions", _this67.permittedErrorPrefixes = [Ct], _typeof(n) === L && _this67.completeConfig(n, (r = (s = e.directConnection) == null ? void 0 : s.mistral) == null ? void 0 : r.function_handler), (_this67$maxMessages = _this67.maxMessages) !== null && _this67$maxMessages !== void 0 ? _this67$maxMessages : _this67.maxMessages = -1, (_o$model0 = (o = _this67.rawBody).model) !== null && _o$model0 !== void 0 ? _o$model0 : o.model = "mistral-small-latest";
    return _this67;
  }
  _inherits(Ui, _T22);
  return _createClass(Ui, [{
    key: "preprocessBody",
    value: function preprocessBody(e, t) {
      var n = JSON.parse(JSON.stringify(e)),
        s = this.processMessages(t).map(function (r) {
          return {
            role: T.getRoleViaAI(r.role),
            content: T.getTextWFilesContent(r, Ui.getFileContent)
          };
        });
      return this.addSystemMessage(s), n.messages = s, n;
    }
  }, {
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI28 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee141(e, t) {
        var _this$messages4;
        return _regenerator().w(function (_context141) {
          while (1) switch (_context141.n) {
            case 0:
              (_this$messages4 = this.messages) !== null && _this$messages4 !== void 0 ? _this$messages4 : this.messages = e, this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this), {});
            case 1:
              return _context141.a(2);
          }
        }, _callee141, this);
      }));
      function callServiceAPI(_x263, _x264) {
        return _callServiceAPI28.apply(this, arguments);
      }
      return callServiceAPI;
    }()
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData31 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee142(e, t) {
        var _n0;
        return _regenerator().w(function (_context142) {
          while (1) switch (_context142.n) {
            case 0:
              if (!e.message) {
                _context142.n = 1;
                break;
              }
              throw e.message;
            case 1:
              if (!e[f]) {
                _context142.n = 2;
                break;
              }
              throw e[f].message;
            case 2:
              if (!(e.choices && e.choices.length > 0)) {
                _context142.n = 4;
                break;
              }
              _n0 = e.choices[0];
              if (!_n0.delta) {
                _context142.n = 3;
                break;
              }
              return _context142.a(2, this.extractStreamResult(_n0, t));
            case 3:
              if (!_n0.message) {
                _context142.n = 4;
                break;
              }
              return _context142.a(2, _n0.message.tool_calls ? this.handleToolsGeneric({
                tool_calls: _n0.message.tool_calls
              }, this.functionHandler, this.messages, t) : _defineProperty({}, h, _n0.message.content || ""));
            case 4:
              return _context142.a(2, _defineProperty({}, h, ""));
          }
        }, _callee142, this);
      }));
      function extractResultData(_x265, _x266) {
        return _extractResultData31.apply(this, arguments);
      }
      return extractResultData;
    }()
  }, {
    key: "extractStreamResult",
    value: function () {
      var _extractStreamResult4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee143(e, t) {
        var n, s, r;
        return _regenerator().w(function (_context143) {
          while (1) switch (_context143.n) {
            case 0:
              n = e.delta, s = e.finish_reason;
              if (!(s === "tool_calls" && n != null && n.tool_calls)) {
                _context143.n = 1;
                break;
              }
              r = {
                tool_calls: n.tool_calls
              };
              return _context143.a(2, this.handleToolsGeneric(r, this.functionHandler, this.messages, t));
            case 1:
              return _context143.a(2, _defineProperty({}, h, (n == null ? void 0 : n.content) || ""));
          }
        }, _callee143, this);
      }));
      function extractStreamResult(_x267, _x268) {
        return _extractStreamResult4.apply(this, arguments);
      }
      return extractStreamResult;
    }()
  }], [{
    key: "getFileContent",
    value: function getFileContent(e) {
      return e.map(function (t) {
        return t.type === j ? _defineProperty(_defineProperty({}, C, "image_url"), "image_url", t.src || "") : _defineProperty(_defineProperty({}, C, h), h, "[Unsupported file type: ".concat(t.type, "]"));
      });
    }
  }]);
}(T);
var Hi = /*#__PURE__*/function (_T23) {
  function Hi(e) {
    var _this68$maxMessages, _l$model3;
    var _this68;
    _classCallCheck(this, Hi);
    var r, o, a, c, l;
    var t = JSON.parse(JSON.stringify(e.directConnection)),
      n = t.groq;
    _this68 = _callSuper(this, Hi, [e, _o(), vo, n]), _this68.insertKeyPlaceholderText = _this68.genereteAPIKeyName("Groq"), _this68.keyHelpUrl = "https://console.groq.com/keys", _this68.url = "https://api.groq.com/openai/v1/chat/completions", _this68.permittedErrorPrefixes = [Ct, "property"];
    var s = (r = t.groq) == null ? void 0 : r.chat;
    _typeof(s) === L && _this68.completeConfig(s, (c = (a = (o = e.directConnection) == null ? void 0 : o.groq) == null ? void 0 : a.chat) == null ? void 0 : c.function_handler), (_this68$maxMessages = _this68.maxMessages) !== null && _this68$maxMessages !== void 0 ? _this68$maxMessages : _this68.maxMessages = -1, (_l$model3 = (l = _this68.rawBody).model) !== null && _l$model3 !== void 0 ? _l$model3 : l.model = "llama-3.3-70b-versatile";
    return _this68;
  }
  _inherits(Hi, _T23);
  return _createClass(Hi, [{
    key: "preprocessBody",
    value: function preprocessBody(e, t) {
      var n = JSON.parse(JSON.stringify(e)),
        s = this.processMessages(t).map(function (r) {
          return {
            content: Hi.getTextWImagesContent(r),
            role: r.role === W ? gt : r.role
          };
        });
      return this.addSystemMessage(s), n.messages = s, n;
    }
  }, {
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI29 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee144(e, t) {
        var _this$messages5;
        return _regenerator().w(function (_context144) {
          while (1) switch (_context144.n) {
            case 0:
              (_this$messages5 = this.messages) !== null && _this$messages5 !== void 0 ? _this$messages5 : this.messages = e, this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this), {});
            case 1:
              return _context144.a(2);
          }
        }, _callee144, this);
      }));
      function callServiceAPI(_x269, _x270) {
        return _callServiceAPI29.apply(this, arguments);
      }
      return callServiceAPI;
    }()
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData32 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee145(e, t) {
        var n, s, r, o;
        return _regenerator().w(function (_context145) {
          while (1) switch (_context145.n) {
            case 0:
              if (!e[f]) {
                _context145.n = 1;
                break;
              }
              throw e[f].message;
            case 1:
              return _context145.a(2, (s = (n = e.choices) == null ? void 0 : n[0]) != null && s.delta ? this.extractStreamResult(e.choices[0], t) : (o = (r = e.choices) == null ? void 0 : r[0]) != null && o.message ? e.choices[0].message.tool_calls ? this.handleToolsGeneric(e.choices[0].message, this.functionHandler, this.messages, t, {
                message: this.systemMessage
              }) : _defineProperty({}, h, e.choices[0].message.content || "") : _defineProperty({}, h, ""));
          }
        }, _callee145, this);
      }));
      function extractResultData(_x271, _x272) {
        return _extractResultData32.apply(this, arguments);
      }
      return extractResultData;
    }() // https://console.groq.com/docs/tool-use
  }, {
    key: "extractStreamResult",
    value: function () {
      var _extractStreamResult5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee146(e, t) {
        return _regenerator().w(function (_context146) {
          while (1) switch (_context146.n) {
            case 0:
              return _context146.a(2, this.extractStreamResultWToolsGeneric(this, e, this.functionHandler, t));
          }
        }, _callee146, this);
      }));
      function extractStreamResult(_x273, _x274) {
        return _extractStreamResult5.apply(this, arguments);
      }
      return extractStreamResult;
    }()
  }]);
}(T);
var Ul = function Ul(i) {
    return _defineProperty(_defineProperty(_defineProperty({}, ie, "".concat(ge).concat(i)), B, V), "accept", V);
  },
  Hl = function Hl(i, e, t, n) {
    typeof i.message == "string" ? n(se) : t(e);
  },
  jl = function jl() {
    return oe("https://api.cohere.ai/v1/models", re, Hl);
  };
var Os = /*#__PURE__*/function (_T24) {
  function Os(e) {
    var _this69$maxMessages, _s$model4;
    var _this69;
    _classCallCheck(this, Os);
    var s;
    var n = JSON.parse(JSON.stringify(e.directConnection)).cohere;
    if (_this69 = _callSuper(this, Os, [e, jl(), Ul, n]), _this69.insertKeyPlaceholderText = _this69.genereteAPIKeyName("Cohere"), _this69.keyHelpUrl = "https://dashboard.cohere.ai/api-keys", _this69.permittedErrorPrefixes = ["invalid"], _this69.url = "https://api.cohere.com/v2/chat", _typeof(n) === L) {
      var r = me.processCohere(n);
      _this69.canSendMessage = function () {
        return r;
      }, _this69.cleanConfig(n), Object.assign(_this69.rawBody, n);
    }
    (_this69$maxMessages = _this69.maxMessages) !== null && _this69$maxMessages !== void 0 ? _this69$maxMessages : _this69.maxMessages = -1, (_s$model4 = (s = _this69.rawBody).model) !== null && _s$model4 !== void 0 ? _s$model4 : s.model = "command-a-03-2025";
    return _this69;
  }
  _inherits(Os, _T24);
  return _createClass(Os, [{
    key: "cleanConfig",
    value: function cleanConfig(e) {
      delete e.key;
    }
  }, {
    key: "preprocessBody",
    value: function preprocessBody(e, t) {
      var n = JSON.parse(JSON.stringify(e)),
        s = t.filter(function (r) {
          return r[h];
        });
      return n.messages = s.map(function (r) {
        return {
          role: T.getRoleViaAI(r.role),
          content: r[h]
        };
      }), n;
    }
  }, {
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI30 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee147(e, t) {
        return _regenerator().w(function (_context147) {
          while (1) switch (_context147.n) {
            case 0:
              this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this), {
                readable: !0
              });
            case 1:
              return _context147.a(2);
          }
        }, _callee147, this);
      }));
      function callServiceAPI(_x275, _x276) {
        return _callServiceAPI30.apply(this, arguments);
      }
      return callServiceAPI;
    }()
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData33 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee148(e) {
        var t, n, s, r;
        return _regenerator().w(function (_context148) {
          while (1) switch (_context148.n) {
            case 0:
              if (!(typeof e.message == "string")) {
                _context148.n = 1;
                break;
              }
              throw e.message;
            case 1:
              if (!(this.stream && e[h])) {
                _context148.n = 2;
                break;
              }
              r = Os.parseBundledEvents(e[h]);
              return _context148.a(2, {
                text: Os.aggregateBundledEventsText(r)
              });
            case 2:
              if (!("message" in e && (s = (n = (t = e.message) == null ? void 0 : t.content) == null ? void 0 : n[0]) != null && s[h])) {
                _context148.n = 3;
                break;
              }
              return _context148.a(2, _defineProperty({}, h, e.message.content[0][h]));
            case 3:
              throw new Error("Invalid response format from Cohere API");
            case 4:
              return _context148.a(2);
          }
        }, _callee148, this);
      }));
      function extractResultData(_x277) {
        return _extractResultData33.apply(this, arguments);
      }
      return extractResultData;
    }()
  }], [{
    key: "parseBundledEvents",
    value: function parseBundledEvents(e) {
      var t = e.trim().split("\n"),
        n = [];
      var _iterator2 = _createForOfIteratorHelper(t),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var s = _step2.value;
          if (s.trim()) try {
            var r = JSON.parse(s);
            n.push(r);
          } catch (r) {
            console[f]("Failed to parse line:", s, r);
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      return n;
    }
  }, {
    key: "aggregateBundledEventsText",
    value: function aggregateBundledEventsText(e) {
      return e.filter(function (t) {
        var n, s, r;
        return t.type === "content-delta" && ((r = (s = (n = t.delta) == null ? void 0 : n.message) == null ? void 0 : s.content) == null ? void 0 : r[h]);
      }).map(function (t) {
        var n, s, r;
        return (r = (s = (n = t.delta) == null ? void 0 : n.message) == null ? void 0 : s.content) == null ? void 0 : r[h];
      }).join("");
    }
  }]);
}(T);
var ql = function ql() {
    return _defineProperty({}, B, V);
  },
  $l = function $l(i, e, t, n) {
    var r;
    var s = i;
    s[f] ? s[f].code === 403 || (r = s[f].message) != null && r.includes("API key") ? n(se) : n(Fe) : t(e);
  },
  Gl = function Gl() {
    var i = "https://generativelanguage.googleapis.com/v1beta/models?key=";
    return oe(i, re, $l, function (e) {
      return "".concat(i).concat(e);
    });
  };
var ji = /*#__PURE__*/function (_T25) {
  function ji(e) {
    var _this70$maxMessages;
    var _this70;
    _classCallCheck(this, ji);
    var s, r;
    var n = JSON.parse(JSON.stringify(e.directConnection)).gemini;
    _this70 = _callSuper(this, ji, [e, Gl(), ql, n]), _this70.insertKeyPlaceholderText = _this70.genereteAPIKeyName("Gemini"), _this70.keyHelpUrl = "https://aistudio.google.com/app/apikey", _this70.urlPrefix = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent", _this70.url = "", _this70.permittedErrorPrefixes = ["API_KEY_INVALID"], _typeof(n) === L && (n.model && (_this70.urlPrefix = "https://generativelanguage.googleapis.com/v1beta/models/".concat(n.model, ":generateContent")), _this70.cleanConfig(n), _this70.completeConfig(n, (r = (s = e.directConnection) == null ? void 0 : s.gemini) == null ? void 0 : r.function_handler)), (_this70$maxMessages = _this70.maxMessages) !== null && _this70$maxMessages !== void 0 ? _this70$maxMessages : _this70.maxMessages = -1;
    return _this70;
  }
  _inherits(ji, _T25);
  return _createClass(ji, [{
    key: "cleanConfig",
    value: function cleanConfig(e) {
      delete e.model;
    }
  }, {
    key: "preprocessBody",
    value: function preprocessBody(e, t) {
      var n = JSON.parse(JSON.stringify(e)),
        s = this.processMessages(t).map(function (r) {
          return ji.getContent(r);
        });
      return n.contents = s, this.systemMessage && (n.systemInstruction = {
        parts: [_defineProperty({}, h, this.systemMessage)]
      }), n;
    }
  }, {
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI31 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee149(e, t) {
        var _this$messages6;
        var n, s;
        return _regenerator().w(function (_context149) {
          while (1) switch (_context149.n) {
            case 0:
              if (this.connectSettings) {
                _context149.n = 1;
                break;
              }
              throw new Error(Ie);
            case 1:
              (_this$messages6 = this.messages) !== null && _this$messages6 !== void 0 ? _this$messages6 : this.messages = e;
              n = this.preprocessBody(this.rawBody, t), s = this.stream;
              s && (_typeof(s) !== L || !s.simulation) || n.stream ? (this.url = "".concat(this.urlPrefix.replace(":generateContent", ":streamGenerateContent"), "?alt=sse&key=").concat(this.key), D.request(this, n, e)) : (this.url = "".concat(this.urlPrefix, "?key=").concat(this.key), ne.request(this, n, e));
            case 2:
              return _context149.a(2);
          }
        }, _callee149, this);
      }));
      function callServiceAPI(_x278, _x279) {
        return _callServiceAPI31.apply(this, arguments);
      }
      return callServiceAPI;
    }() // https://ai.google.dev/gemini-api/docs/function-calling?example=weather
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData34 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee150(e, t) {
        var n, s, r, o, a, c, l, d;
        return _regenerator().w(function (_context150) {
          while (1) switch (_context150.n) {
            case 0:
              if (!e[f]) {
                _context150.n = 1;
                break;
              }
              throw e[f].message || "Gemini API Error";
            case 1:
              if (!((r = (s = (n = e.candidates) == null ? void 0 : n[0]) == null ? void 0 : s.content) != null && r.parts)) {
                _context150.n = 3;
                break;
              }
              a = e.candidates[0].content.parts, c = a.find(function (p) {
                return p.functionCall;
              });
              if (!(c != null && c.functionCall)) {
                _context150.n = 2;
                break;
              }
              return _context150.a(2, this.handleTools([c.functionCall], t));
            case 2:
              l = a.find(function (p) {
                return p[h];
              }), d = a.find(function (p) {
                var u;
                return ((u = p.inlineData) == null ? void 0 : u.mimeType) === "image/png";
              });
              return _context150.a(2, _defineProperty(_defineProperty({}, h, (l == null ? void 0 : l[h]) || ""), y, (o = d == null ? void 0 : d.inlineData) != null && o.data ? [_defineProperty({}, Y, "data:image/png;base64,".concat(d.inlineData.data))] : []));
            case 3:
              return _context150.a(2, _defineProperty({}, h, ""));
          }
        }, _callee150, this);
      }));
      function extractResultData(_x280, _x281) {
        return _extractResultData34.apply(this, arguments);
      }
      return extractResultData;
    }()
  }, {
    key: "handleTools",
    value: function () {
      var _handleTools2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee151(e, t) {
        var n, s, _yield$this$callToolF2, r, o, a, c;
        return _regenerator().w(function (_context151) {
          while (1) switch (_context151.n) {
            case 0:
              if (!(!e || !t || !this.functionHandler)) {
                _context151.n = 1;
                break;
              }
              throw Error(dn);
            case 1:
              n = JSON.parse(JSON.stringify(t));
              s = e.map(function (c) {
                return {
                  name: c.name,
                  arguments: JSON.stringify(c.args)
                };
              });
              _context151.n = 2;
              return this.callToolFunction(this.functionHandler, s);
            case 2:
              _yield$this$callToolF2 = _context151.v;
              r = _yield$this$callToolF2.responses;
              o = _yield$this$callToolF2.processedResponse;
              if (!o) {
                _context151.n = 3;
                break;
              }
              return _context151.a(2, o);
            case 3:
              a = {
                parts: e.map(function (c) {
                  return {
                    functionCall: {
                      name: c.name,
                      args: c.args
                    }
                  };
                }),
                role: "model"
              };
              if (!(n.contents.push(a), !r.find(function (_ref168) {
                var c = _ref168.response;
                return typeof c != "string";
              }) && s.length === r.length)) {
                _context151.n = 4;
                break;
              }
              c = {
                parts: r.map(function (l, d) {
                  return {
                    functionResponse: {
                      name: e[d].name,
                      response: {
                        result: l.response
                      }
                    }
                  };
                }),
                role: U
              };
              return _context151.a(2, (n.contents.push(c), this.makeAnotherRequest(n, this.messages)));
            case 4:
              throw Error(Zn);
            case 5:
              return _context151.a(2);
          }
        }, _callee151, this);
      }));
      function handleTools(_x282, _x283) {
        return _handleTools2.apply(this, arguments);
      }
      return handleTools;
    }()
  }], [{
    key: "getContent",
    value: function getContent(e) {
      var t = [];
      return e[h] && e[h].trim().length > 0 && t.push(_defineProperty({}, h, e[h])), e[y] && e[y].length > 0 && e[y].forEach(function (n) {
        if (n.src && n.src.includes("data:")) {
          var _n$src$split = n.src.split(","),
            _n$src$split2 = _slicedToArray(_n$src$split, 2),
            s = _n$src$split2[0],
            r = _n$src$split2[1];
          t.push({
            inlineData: {
              mimeType: s.replace("data:", "").replace(";base64", ""),
              data: r
            }
          });
        }
      }), {
        parts: t,
        role: e.role === U ? U : "model"
      };
    }
  }]);
}(T);
var zl = function zl(i) {
    return _defineProperty(_defineProperty(_defineProperty({
      "x-api-key": i
    }, B, V), "anthropic-version", "2023-06-01"), "anthropic-dangerous-direct-browser-access", "true");
  },
  Vl = function Vl(i, e, t, n) {
    var s = i;
    s[f] ? s[f].type === ye ? n(se) : n(Fe) : t(e);
  },
  Jl = function Jl() {
    return oe("https://api.anthropic.com/v1/models", re, Vl);
  };
var Ns = /*#__PURE__*/function (_T26) {
  function Ns(e) {
    var _this71$maxMessages, _o$model1, _a$max_tokens2;
    var _this71;
    _classCallCheck(this, Ns);
    var s, r, o, a;
    var n = JSON.parse(JSON.stringify(e.directConnection)).claude;
    _this71 = _callSuper(this, Ns, [e, Jl(), zl, n]), _this71.insertKeyPlaceholderText = _this71.genereteAPIKeyName("Claude"), _this71.keyHelpUrl = "https://console.anthropic.com/settings/keys", _this71.url = "https://api.anthropic.com/v1/messages", _this71.permittedErrorPrefixes = [ye, Ge], _this71._streamToolCalls = _defineProperty(_defineProperty(_defineProperty(_defineProperty({}, C, "tool_use"), "id", ""), "name", ""), "input", ""), _typeof(n) === L && _this71.completeConfig(n, (r = (s = e.directConnection) == null ? void 0 : s.claude) == null ? void 0 : r.function_handler), (_this71$maxMessages = _this71.maxMessages) !== null && _this71$maxMessages !== void 0 ? _this71$maxMessages : _this71.maxMessages = -1, (_o$model1 = (o = _this71.rawBody).model) !== null && _o$model1 !== void 0 ? _o$model1 : o.model = "claude-3-5-sonnet-20241022", (_a$max_tokens2 = (a = _this71.rawBody).max_tokens) !== null && _a$max_tokens2 !== void 0 ? _a$max_tokens2 : a.max_tokens = 4096;
    return _this71;
  }
  _inherits(Ns, _T26);
  return _createClass(Ns, [{
    key: "preprocessBody",
    value: function preprocessBody(e, t) {
      var n = JSON.parse(JSON.stringify(e)),
        s = this.processMessages(t).map(function (r) {
          return {
            content: Ns.getTextWFilesContent(r, Ns.getFileContent),
            role: T.getRoleViaUser(r.role)
          };
        });
      return n.messages = s, this.systemMessage && (n.system = this.systemMessage), n;
    }
  }, {
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI32 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee152(e, t) {
        var _this$messages7;
        return _regenerator().w(function (_context152) {
          while (1) switch (_context152.n) {
            case 0:
              (_this$messages7 = this.messages) !== null && _this$messages7 !== void 0 ? _this$messages7 : this.messages = e, this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this), {});
            case 1:
              return _context152.a(2);
          }
        }, _callee152, this);
      }));
      function callServiceAPI(_x284, _x285) {
        return _callServiceAPI32.apply(this, arguments);
      }
      return callServiceAPI;
    }()
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData35 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee153(e, t) {
        var n, s, r, o, a;
        return _regenerator().w(function (_context153) {
          while (1) switch (_context153.n) {
            case 0:
              if (!e[f]) {
                _context153.n = 1;
                break;
              }
              throw e[f].message;
            case 1:
              if (!(e.content && e.content.length > 0)) {
                _context153.n = 3;
                break;
              }
              o = e.content.find(function (c) {
                return c.type === "tool_use";
              });
              if (!o) {
                _context153.n = 2;
                break;
              }
              return _context153.a(2, this.handleTools([o], t));
            case 2:
              a = e.content.find(function (c) {
                return c.type === h;
              });
              if (!a) {
                _context153.n = 3;
                break;
              }
              return _context153.a(2, _defineProperty({}, h, a[h]));
            case 3:
              if (!(e.type === "content_block_delta" && e.delta && e.delta.type === "text_delta")) {
                _context153.n = 4;
                break;
              }
              return _context153.a(2, _defineProperty({}, h, e.delta[h] || ""));
            case 4:
              if (!(e.type === "content_block_start" && ((n = e.content_block) == null ? void 0 : n.type) === "tool_use")) {
                _context153.n = 5;
                break;
              }
              this._streamToolCalls = e.content_block, this._streamToolCalls.input = "";
              _context153.n = 7;
              break;
            case 5:
              if (!(e.type === "content_block_delta" && ((s = e.delta) == null ? void 0 : s.type) === "input_json_delta")) {
                _context153.n = 6;
                break;
              }
              this._streamToolCalls.input += e.delta.partial_json || "";
              _context153.n = 7;
              break;
            case 6:
              if (!(e.type === "message_delta" && ((r = e.delta) == null ? void 0 : r.stop_reason) === "tool_use")) {
                _context153.n = 7;
                break;
              }
              return _context153.a(2, (this._streamToolCalls.input = JSON.parse(this._streamToolCalls.input), this.handleTools([this._streamToolCalls], t)));
            case 7:
              return _context153.a(2, _defineProperty({}, h, ""));
          }
        }, _callee153, this);
      }));
      function extractResultData(_x286, _x287) {
        return _extractResultData35.apply(this, arguments);
      }
      return extractResultData;
    }()
  }, {
    key: "handleTools",
    value: function () {
      var _handleTools3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee154(e, t) {
        var n, s, _yield$this$callToolF3, r, o, a, c;
        return _regenerator().w(function (_context154) {
          while (1) switch (_context154.n) {
            case 0:
              if (!(!e || !t || !this.functionHandler)) {
                _context154.n = 1;
                break;
              }
              throw Error(dn);
            case 1:
              n = JSON.parse(JSON.stringify(t));
              s = e.map(function (c) {
                return {
                  name: c.name,
                  arguments: JSON.stringify(c.input)
                };
              });
              _context154.n = 2;
              return this.callToolFunction(this.functionHandler, s);
            case 2:
              _yield$this$callToolF3 = _context154.v;
              r = _yield$this$callToolF3.responses;
              o = _yield$this$callToolF3.processedResponse;
              if (!o) {
                _context154.n = 3;
                break;
              }
              return _context154.a(2, o);
            case 3:
              a = e.map(function (c) {
                return _defineProperty(_defineProperty(_defineProperty(_defineProperty({}, C, "tool_use"), "id", c.id), "name", c.name), "input", c.input);
              });
              if (!(n.messages.push({
                role: "assistant",
                content: a
              }), !r.find(function (_ref174) {
                var c = _ref174.response;
                return typeof c != "string";
              }) && s.length === r.length)) {
                _context154.n = 4;
                break;
              }
              c = r.map(function (l, d) {
                return _defineProperty(_defineProperty(_defineProperty({}, C, "tool_result"), "tool_use_id", e[d].id), "content", l.response);
              });
              return _context154.a(2, (n.messages.push({
                role: U,
                content: c
              }), this.makeAnotherRequest(n, this.messages)));
            case 4:
              throw Error(Zn);
            case 5:
              return _context154.a(2);
          }
        }, _callee154, this);
      }));
      function handleTools(_x288, _x289) {
        return _handleTools3.apply(this, arguments);
      }
      return handleTools;
    }()
  }], [{
    key: "getFileContent",
    value: function getFileContent(e) {
      return e.map(function (t) {
        var n, s, r;
        if (t.type === j) {
          var o = (n = t.src) == null ? void 0 : n.split(",")[1],
            a = ((r = (s = t.src) == null ? void 0 : s.match(/data:([^;]+)/)) == null ? void 0 : r[1]) || "image/jpeg";
          return _defineProperty(_defineProperty({}, C, j), "source", _defineProperty(_defineProperty(_defineProperty({}, C, "base64"), "media_type", a), "data", o || ""));
        }
        return _defineProperty(_defineProperty({}, C, h), h, "[Unsupported file type: ".concat(t.type, "]"));
      });
    }
  }]);
}(T);
var Kl = function Kl() {
    return {};
  },
  Wl = function Wl() {},
  Xl = function Xl() {
    return oe("", re, Wl);
  };
var qi = /*#__PURE__*/function (_T27) {
  function qi(e) {
    var _this72$maxMessages, _o$model10, _a$stream;
    var _this72;
    _classCallCheck(this, qi);
    var s, r, o, a;
    var t = JSON.parse(JSON.stringify(e.directConnection));
    _this72 = _callSuper(this, qi, [e, Xl(), Kl, {
      key: "placeholder"
    }]), _this72.insertKeyPlaceholderText = "", _this72.keyHelpUrl = "", _this72.validateKeyProperty = !1, _this72.url = "http://localhost:11434/api/chat", _this72.permittedErrorPrefixes = ["Error"];
    var n = t.ollama;
    _typeof(n) === L && _this72.completeConfig(n, (r = (s = e.directConnection) == null ? void 0 : s.ollama) == null ? void 0 : r.function_handler), (_this72$maxMessages = _this72.maxMessages) !== null && _this72$maxMessages !== void 0 ? _this72$maxMessages : _this72.maxMessages = -1, (_o$model10 = (o = _this72.rawBody).model) !== null && _o$model10 !== void 0 ? _o$model10 : o.model = "llama3.2", (_a$stream = (a = _this72.rawBody).stream) !== null && _a$stream !== void 0 ? _a$stream : a.stream = !1;
    return _this72;
  }
  _inherits(qi, _T27);
  return _createClass(qi, [{
    key: "preprocessBody",
    value: function preprocessBody(e, t) {
      var n = JSON.parse(JSON.stringify(e)),
        s = this.processMessages(t).map(function (r) {
          var o = {
            content: r[h] || "",
            role: T.getRoleViaUser(r.role)
          };
          if (r[y] && r[y].length > 0) {
            var a = qi.getImageData(r[y]);
            a.length > 0 && (o[z] = a);
          }
          return o;
        });
      return this.addSystemMessage(s), n.messages = s, n;
    }
  }, {
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI33 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee155(e, t) {
        var _this$messages8;
        return _regenerator().w(function (_context155) {
          while (1) switch (_context155.n) {
            case 0:
              (_this$messages8 = this.messages) !== null && _this$messages8 !== void 0 ? _this$messages8 : this.messages = e, this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this), {
                readable: !0
              });
            case 1:
              return _context155.a(2);
          }
        }, _callee155, this);
      }));
      function callServiceAPI(_x290, _x291) {
        return _callServiceAPI33.apply(this, arguments);
      }
      return callServiceAPI;
    }()
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData36 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee156(e, t) {
        var n, s, r;
        return _regenerator().w(function (_context156) {
          while (1) switch (_context156.n) {
            case 0:
              if (!e[f]) {
                _context156.n = 1;
                break;
              }
              throw e[f].message;
            case 1:
              if (!e[h]) {
                _context156.n = 2;
                break;
              }
              r = JSON.parse(e[h]);
              return _context156.a(2, (n = r.message) != null && n.tool_calls ? this.handleTools({
                tool_calls: r.message.tool_calls
              }, t) : _defineProperty({}, h, ((s = r.message) == null ? void 0 : s.content) || ""));
            case 2:
              return _context156.a(2, e.message ? e.message.tool_calls ? this.handleTools({
                tool_calls: e.message.tool_calls
              }, t) : _defineProperty({}, h, e.message.content || "") : _defineProperty({}, h, ""));
          }
        }, _callee156, this);
      }));
      function extractResultData(_x292, _x293) {
        return _extractResultData36.apply(this, arguments);
      }
      return extractResultData;
    }()
  }, {
    key: "handleTools",
    value: function () {
      var _handleTools4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee157(e, t) {
        var n, s, _yield$this$callToolF4, r, o;
        return _regenerator().w(function (_context157) {
          while (1) switch (_context157.n) {
            case 0:
              if (!(!e.tool_calls || !t || !this.functionHandler)) {
                _context157.n = 1;
                break;
              }
              throw Error(dn);
            case 1:
              n = JSON.parse(JSON.stringify(t));
              s = e.tool_calls.map(function (a) {
                return {
                  name: a["function"].name,
                  arguments: JSON.stringify(a["function"].arguments)
                };
              });
              _context157.n = 2;
              return this.callToolFunction(this.functionHandler, s);
            case 2:
              _yield$this$callToolF4 = _context157.v;
              r = _yield$this$callToolF4.responses;
              o = _yield$this$callToolF4.processedResponse;
              if (!o) {
                _context157.n = 3;
                break;
              }
              return _context157.a(2, o);
            case 3:
              if (!(n.messages.push({
                tool_calls: e.tool_calls,
                role: gt,
                content: ""
              }), !r.find(function (_ref181) {
                var a = _ref181.response;
                return typeof a != "string";
              }) && s.length === r.length)) {
                _context157.n = 4;
                break;
              }
              return _context157.a(2, (r.forEach(function (a, c) {
                var d;
                var l = (d = e.tool_calls) == null ? void 0 : d[c];
                n == null || n.messages.push({
                  role: "tool",
                  tool_name: l == null ? void 0 : l["function"].name,
                  content: a.response
                });
              }), this.makeAnotherRequest(n, this.messages)));
            case 4:
              throw Error(Zn);
            case 5:
              return _context157.a(2);
          }
        }, _callee157, this);
      }));
      function handleTools(_x294, _x295) {
        return _handleTools4.apply(this, arguments);
      }
      return handleTools;
    }()
  }], [{
    key: "getImageData",
    value: function getImageData(e) {
      return e.filter(function (t) {
        return t.type === j;
      }).map(function (t) {
        var s;
        return ((s = t.src) == null ? void 0 : s.split(",")[1]) || "";
      }).filter(function (t) {
        return t.length > 0;
      });
    }
  }]);
}(T);
var Eo = function Eo(i) {
    return _defineProperty({
      Authorization: "".concat(ge).concat(i)
    }, B, V);
  },
  Zl = function Zl(i, e, t, n) {
    var s = i;
    s[f] ? s[f].type === ye || s[f].type === Ge ? n(se) : n(Fe) : t(e);
  },
  So = function So() {
    return oe("https://api.x.ai/v1/models", re, Zl);
  },
  Hs = /*#__PURE__*/function (_T28) {
    function Hs(e) {
      var _o$model11;
      var _this73;
      _classCallCheck(this, Hs);
      var r, o;
      var t = e.directConnection,
        n = t == null ? void 0 : t.x;
      _this73 = _callSuper(this, Hs, [e, So(), Eo, n]), _this73.insertKeyPlaceholderText = _this73.genereteAPIKeyName("X"), _this73.keyHelpUrl = "https://console.x.ai/team/default/api-keys", _this73.url = Hs.IMAGE_GENERATION_URL, _this73.permittedErrorPrefixes = [Ge, ye];
      var s = (r = t == null ? void 0 : t.x) == null ? void 0 : r[z];
      _typeof(s) === L && Object.assign(_this73.rawBody, s), (_o$model11 = (o = _this73.rawBody).model) !== null && _o$model11 !== void 0 ? _o$model11 : o.model = "grok-2-image";
      return _this73;
    }
    _inherits(Hs, _T28);
    return _createClass(Hs, [{
      key: "preprocessBody",
      value: function preprocessBody(e, t) {
        var n = t[t.length - 1][h],
          s = JSON.parse(JSON.stringify(e));
        return n && n !== "" && (s.prompt = n), s;
      }
    }, {
      key: "callServiceAPI",
      value: function () {
        var _callServiceAPI34 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee158(e, t) {
          return _regenerator().w(function (_context158) {
            while (1) switch (_context158.n) {
              case 0:
                this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this));
              case 1:
                return _context158.a(2);
            }
          }, _callee158, this);
        }));
        function callServiceAPI(_x296, _x297) {
          return _callServiceAPI34.apply(this, arguments);
        }
        return callServiceAPI;
      }()
    }, {
      key: "extractResultData",
      value: function () {
        var _extractResultData37 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee159(e) {
          var t;
          return _regenerator().w(function (_context159) {
            while (1) switch (_context159.n) {
              case 0:
                if (!e[f]) {
                  _context159.n = 1;
                  break;
                }
                throw e[f].message;
              case 1:
                t = e.data.map(function (n) {
                  return n.url ? _defineProperty(_defineProperty({}, Y, n.url), C, j) : _defineProperty(_defineProperty({}, Y, "".concat(hn).concat(n.b64_json)), C, j);
                });
                return _context159.a(2, _defineProperty({}, y, t));
            }
          }, _callee159);
        }));
        function extractResultData(_x298) {
          return _extractResultData37.apply(this, arguments);
        }
        return extractResultData;
      }()
    }]);
  }(T);
Hs.IMAGE_GENERATION_URL = "https://api.x.ai/v1/images/generations";
var Si = Hs;
var Yl = function Yl(i) {
    return _defineProperty(_defineProperty({}, ie, "".concat(ge).concat(i)), B, V);
  },
  Ql = function Ql(i, e, t, n) {
    var s = i;
    s[f] ? s[f].type === Ge ? n(se) : n(Fe) : t(e);
  },
  ed = function ed() {
    return oe("https://dashscope-intl.aliyuncs.com/compatible-mode/v1/models", re, Ql);
  };
var $i = /*#__PURE__*/function (_T29) {
  function $i(e) {
    var _this74$maxMessages, _o$model12;
    var _this74;
    _classCallCheck(this, $i);
    var s, r, o;
    var n = JSON.parse(JSON.stringify(e.directConnection)).qwen;
    _this74 = _callSuper(this, $i, [e, ed(), Yl, n]), _this74.insertKeyPlaceholderText = _this74.genereteAPIKeyName("Qwen"), _this74.keyHelpUrl = "https://www.alibabacloud.com/help/en/model-studio/get-api-key", _this74.url = "https://dashscope-intl.aliyuncs.com/compatible-mode/v1/chat/completions", _this74.permittedErrorPrefixes = ["No static", "The model", as], _typeof(n) === L && _this74.completeConfig(n, (r = (s = e.directConnection) == null ? void 0 : s.qwen) == null ? void 0 : r.function_handler), (_this74$maxMessages = _this74.maxMessages) !== null && _this74$maxMessages !== void 0 ? _this74$maxMessages : _this74.maxMessages = -1, (_o$model12 = (o = _this74.rawBody).model) !== null && _o$model12 !== void 0 ? _o$model12 : o.model = "qwen-plus";
    return _this74;
  }
  _inherits($i, _T29);
  return _createClass($i, [{
    key: "preprocessBody",
    value: function preprocessBody(e, t) {
      var n = JSON.parse(JSON.stringify(e)),
        s = this.processMessages(t).map(function (r) {
          return {
            content: $i.getTextWImagesContent(r),
            role: T.getRoleViaUser(r.role)
          };
        });
      return this.addSystemMessage(s), n.messages = s, n;
    }
  }, {
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI35 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee160(e, t) {
        var _this$messages9;
        return _regenerator().w(function (_context160) {
          while (1) switch (_context160.n) {
            case 0:
              (_this$messages9 = this.messages) !== null && _this$messages9 !== void 0 ? _this$messages9 : this.messages = e, this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this), {});
            case 1:
              return _context160.a(2);
          }
        }, _callee160, this);
      }));
      function callServiceAPI(_x299, _x300) {
        return _callServiceAPI35.apply(this, arguments);
      }
      return callServiceAPI;
    }()
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData38 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee161(e, t) {
        var _n1;
        return _regenerator().w(function (_context161) {
          while (1) switch (_context161.n) {
            case 0:
              if (!e[f]) {
                _context161.n = 1;
                break;
              }
              throw e[f].message;
            case 1:
              if (!(e.choices && e.choices.length > 0)) {
                _context161.n = 3;
                break;
              }
              _n1 = e.choices[0];
              if (!_n1.delta) {
                _context161.n = 2;
                break;
              }
              return _context161.a(2, this.extractStreamResult(_n1, t));
            case 2:
              if (!_n1.message) {
                _context161.n = 3;
                break;
              }
              return _context161.a(2, _n1.message.tool_calls ? this.handleToolsGeneric({
                tool_calls: _n1.message.tool_calls
              }, this.functionHandler, this.messages, t) : _defineProperty({}, h, _n1.message.content || ""));
            case 3:
              return _context161.a(2, _defineProperty({}, h, ""));
          }
        }, _callee161, this);
      }));
      function extractResultData(_x301, _x302) {
        return _extractResultData38.apply(this, arguments);
      }
      return extractResultData;
    }()
  }, {
    key: "extractStreamResult",
    value: function () {
      var _extractStreamResult6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee162(e, t) {
        return _regenerator().w(function (_context162) {
          while (1) switch (_context162.n) {
            case 0:
              return _context162.a(2, this.extractStreamResultWToolsGeneric(this, e, this.functionHandler, t));
          }
        }, _callee162, this);
      }));
      function extractStreamResult(_x303, _x304) {
        return _extractStreamResult6.apply(this, arguments);
      }
      return extractStreamResult;
    }()
  }]);
}(T);
var td = function td(i) {
    return _defineProperty(_defineProperty({}, ie, "".concat(ge).concat(i)), B, V);
  },
  nd = function nd(i, e, t, n) {
    var s = i;
    s[f] ? s[f].type === ye ? n(se) : n(Fe) : t(e);
  },
  sd = function sd() {
    return oe("https://api.moonshot.ai/v1/models", re, nd);
  };
var Gi = /*#__PURE__*/function (_T30) {
  function Gi(e) {
    var _this75$maxMessages, _o$model13;
    var _this75;
    _classCallCheck(this, Gi);
    var s, r, o;
    var n = JSON.parse(JSON.stringify(e.directConnection)).kimi;
    _this75 = _callSuper(this, Gi, [e, sd(), td, n]), _this75.insertKeyPlaceholderText = _this75.genereteAPIKeyName("Kimi"), _this75.keyHelpUrl = "https://platform.moonshot.ai/console/api-keys", _this75.url = "https://api.moonshot.ai/v1/chat/completions", _this75.permittedErrorPrefixes = [Ct, "Not found"], _typeof(n) === L && _this75.completeConfig(n, (r = (s = e.directConnection) == null ? void 0 : s.kimi) == null ? void 0 : r.function_handler), (_this75$maxMessages = _this75.maxMessages) !== null && _this75$maxMessages !== void 0 ? _this75$maxMessages : _this75.maxMessages = -1, (_o$model13 = (o = _this75.rawBody).model) !== null && _o$model13 !== void 0 ? _o$model13 : o.model = "moonshot-v1-8k";
    return _this75;
  }
  _inherits(Gi, _T30);
  return _createClass(Gi, [{
    key: "preprocessBody",
    value: function preprocessBody(e, t) {
      var n = JSON.parse(JSON.stringify(e)),
        s = this.processMessages(t).map(function (r) {
          return {
            content: Gi.getTextWImagesContent(r),
            role: T.getRoleViaUser(r.role)
          };
        });
      return this.addSystemMessage(s), n.messages = s, n;
    }
  }, {
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI36 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee163(e, t) {
        var _this$messages0;
        return _regenerator().w(function (_context163) {
          while (1) switch (_context163.n) {
            case 0:
              (_this$messages0 = this.messages) !== null && _this$messages0 !== void 0 ? _this$messages0 : this.messages = e, this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this), {});
            case 1:
              return _context163.a(2);
          }
        }, _callee163, this);
      }));
      function callServiceAPI(_x305, _x306) {
        return _callServiceAPI36.apply(this, arguments);
      }
      return callServiceAPI;
    }()
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData39 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee164(e, t) {
        var _n10;
        return _regenerator().w(function (_context164) {
          while (1) switch (_context164.n) {
            case 0:
              if (!e[f]) {
                _context164.n = 1;
                break;
              }
              throw e[f].message;
            case 1:
              if (!(e.choices && e.choices.length > 0)) {
                _context164.n = 3;
                break;
              }
              _n10 = e.choices[0];
              if (!_n10.delta) {
                _context164.n = 2;
                break;
              }
              return _context164.a(2, this.extractStreamResult(_n10, t));
            case 2:
              if (!_n10.message) {
                _context164.n = 3;
                break;
              }
              return _context164.a(2, _n10.message.tool_calls ? this.handleToolsGeneric({
                tool_calls: _n10.message.tool_calls
              }, this.functionHandler, this.messages, t) : _defineProperty({}, h, _n10.message.content || ""));
            case 3:
              return _context164.a(2, _defineProperty({}, h, ""));
          }
        }, _callee164, this);
      }));
      function extractResultData(_x307, _x308) {
        return _extractResultData39.apply(this, arguments);
      }
      return extractResultData;
    }()
  }, {
    key: "extractStreamResult",
    value: function () {
      var _extractStreamResult7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee165(e, t) {
        return _regenerator().w(function (_context165) {
          while (1) switch (_context165.n) {
            case 0:
              return _context165.a(2, this.extractStreamResultWToolsGeneric(this, e, this.functionHandler, t));
          }
        }, _callee165, this);
      }));
      function extractStreamResult(_x309, _x310) {
        return _extractStreamResult7.apply(this, arguments);
      }
      return extractStreamResult;
    }()
  }]);
}(T);
var id = /*#__PURE__*/function (_T31) {
  function id(e) {
    var _this76$maxMessages, _o$model14;
    var _this76;
    _classCallCheck(this, id);
    var r, o;
    var t = JSON.parse(JSON.stringify(e.directConnection)),
      n = t.x;
    _this76 = _callSuper(this, id, [e, So(), Eo, n]), _this76.insertKeyPlaceholderText = _this76.genereteAPIKeyName("X"), _this76.keyHelpUrl = "https://console.x.ai/team/default/api-keys", _this76.url = "https://api.x.ai/v1/chat/completions", _this76.permittedErrorPrefixes = [Ge, ye];
    var s = (r = t.x) == null ? void 0 : r.chat;
    _typeof(s) === L && _this76.completeConfig(s), (_this76$maxMessages = _this76.maxMessages) !== null && _this76$maxMessages !== void 0 ? _this76$maxMessages : _this76.maxMessages = -1, (_o$model14 = (o = _this76.rawBody).model) !== null && _o$model14 !== void 0 ? _o$model14 : o.model = "grok-3-latest";
    return _this76;
  }
  _inherits(id, _T31);
  return _createClass(id, [{
    key: "preprocessBody",
    value: function preprocessBody(e, t) {
      var n = JSON.parse(JSON.stringify(e)),
        s = this.processMessages(t).map(function (r) {
          return {
            content: r[h] || "",
            role: T.getRoleViaUser(r.role)
          };
        });
      return this.addSystemMessage(s), n.messages = s, n;
    }
  }, {
    key: "callServiceAPI",
    value: function () {
      var _callServiceAPI37 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee166(e, t) {
        return _regenerator().w(function (_context166) {
          while (1) switch (_context166.n) {
            case 0:
              this.callDirectServiceServiceAPI(e, t, this.preprocessBody.bind(this), {});
            case 1:
              return _context166.a(2);
          }
        }, _callee166, this);
      }));
      function callServiceAPI(_x311, _x312) {
        return _callServiceAPI37.apply(this, arguments);
      }
      return callServiceAPI;
    }()
  }, {
    key: "extractResultData",
    value: function () {
      var _extractResultData40 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee167(e) {
        var t, n, s, r, o;
        return _regenerator().w(function (_context167) {
          while (1) switch (_context167.n) {
            case 0:
              if (!e[f]) {
                _context167.n = 1;
                break;
              }
              throw e[f].message;
            case 1:
              if (!(e.object === "chat.completion.chunk")) {
                _context167.n = 2;
                break;
              }
              o = (t = e.choices) == null ? void 0 : t[0];
              return _context167.a(2, (n = o == null ? void 0 : o.delta) != null && n.content ? _defineProperty({}, h, o.delta.content) : _defineProperty({}, h, ""));
            case 2:
              return _context167.a(2, e.object === "chat.completion" && (r = (s = e.choices) == null ? void 0 : s[0]) != null && r.message ? _defineProperty({}, h, e.choices[0].message.content || "") : _defineProperty({}, h, ""));
          }
        }, _callee167);
      }));
      function extractResultData(_x313) {
        return _extractResultData40.apply(this, arguments);
      }
      return extractResultData;
    }()
  }]);
}(T);
var rd = /*#__PURE__*/function () {
  function rd() {
    _classCallCheck(this, rd);
  }
  return _createClass(rd, null, [{
    key: "create",
    value:
    // this should only be called when no _activeService is set or is demo as otherwise we don't want to reconnect
    function create(e) {
      var t = e.directConnection,
        n = e.connect,
        s = e.demo,
        r = e.webModel;
      if (r) return new ns(e);
      if (t) {
        if (t.openAI) return t.openAI[z] ? new Ei(e) : t.openAI.speechToText ? new yi(e) : t.openAI.textToSpeech ? new gi(e) : t.openAI.assistant ? new Bi(e) : t.openAI.realtime ? new mi(e) : new ss(e);
        if (t.assemblyAI) return new Di(e);
        if (t.cohere) return new Os(e);
        if (t.huggingFace) return t.huggingFace.textGeneration ? new $c(e) : t.huggingFace.summarization ? new zc(e) : t.huggingFace.translation ? new Jc(e) : t.huggingFace.fillMask ? new Kc(e) : t.huggingFace.questionAnswer ? new Gc(e) : t.huggingFace.audioSpeechRecognition ? new qc(e) : t.huggingFace.audioClassification ? new Uc(e) : t.huggingFace.imageClassification ? new Hc(e) : new Vc(e);
        if (t.azure) {
          if (t.azure.openAI) {
            if (t.azure.openAI.chat) return new Fi(e);
            if (t.azure.openAI.assistant) return new pi(e);
          }
          if (t.azure.speechToText) return new _i(e);
          if (t.azure.textToSpeech) return new vi(e);
          if (t.azure.summarization) return new bi(e);
          if (t.azure.translation) return new ml(e);
        }
        if (t.stabilityAI) return t.stabilityAI.imageToImage ? new Cs(e) : t.stabilityAI.imageToImageUpscale ? new As(e) : t.stabilityAI.imageToImageMasking ? new ws(e) : new Ts(e);
        if (t.mistral) return new Ui(e);
        if (t.gemini) return new ji(e);
        if (t.claude) return new Ns(e);
        if (t.deepSeek) return new kl(e);
        if (t.miniMax) return new Ll(e);
        if (t.openRouter) return new jn(e);
        if (t.kimi) return new Gi(e);
        if (t.x) return t.x[z] ? new Si(e) : new id(e);
        if (t.qwen) return new $i(e);
        if (t.together) return t.together[z] ? new vl(e) : t.together.textToSpeech ? new Yc(e) : new _l(e);
        if (t.bigModel) return t.bigModel[z] ? new gl(e) : t.bigModel.textToSpeech ? new Xc(e) : new ks(e);
        if (t.groq) return t.groq.textToSpeech ? new bl(e) : new Hi(e);
        if (t.perplexity) return new Tl(e);
        if (t.ollama) return new qi(e);
      }
      return n && Object.keys(n).length > 0 && !s ? new $t(e) : new $t(e, void 0, s || !0);
    }
  }]);
}();
var Yi = /*#__PURE__*/_createClass(function Yi() {
  _classCallCheck(this, Yi);
});
Yi.attibutes = {
  string: function string(e) {
    return e;
  },
  number: function number(e) {
    return parseFloat(e);
  },
  "boolean": function boolean(e) {
    return e === "true";
  },
  object: function object(e) {
    return JSON.parse(e);
  },
  array: function array(e) {
    return JSON.parse(e);
  },
  "function": function _function(e) {
    return new Function("return ".concat(e))();
  }
};
var xi = Yi;
function O(i) {
  return function (e, t) {
    Object.defineProperty(e, t, {});
    var n = e.constructor,
      s = t.toLocaleLowerCase();
    n._attributes_[s] = xi.attibutes[i], n._attributeToProperty_[s] = t;
  };
}
var zi = /*#__PURE__*/function () {
  function zi(e) {
    _classCallCheck(this, zi);
    this._isDisplayed = !1, this._elementRef = this.createIntroPanelWithChild(e), this._isDisplayed = !0;
  }
  return _createClass(zi, [{
    key: "createIntroPanelWithChild",
    value: function createIntroPanelWithChild(e) {
      var t = zi.createIntroPanel();
      return e[_].display === "none" && (e[_].display = "block"), t.appendChild(e), t;
    }
  }, {
    key: "hide",
    value: function hide() {
      this._isDisplayed && (this._elementRef[_].display = "none", this._isDisplayed = !1);
    }
  }, {
    key: "display",
    value: function display() {
      this._isDisplayed || (this._elementRef[_].display = "", this._isDisplayed = !0);
    }
  }], [{
    key: "createIntroPanel",
    value: function createIntroPanel() {
      var e = S();
      return e[m].add("intro-panel"), Object.assign(e[_]), e;
    }
  }]);
}();
var od = "<?xml version=\"1.0\" encoding=\"iso-8859-1\"?>\n<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" \n\t viewBox=\"50 30 420 450\" xml:space=\"preserve\">\n<g filter=\"brightness(0) saturate(100%) invert(16%) sepia(0%) saturate(1942%) hue-rotate(215deg) brightness(99%) contrast(93%)\">\n\t<g>\n\t\t<path d=\"M447.933,103.629c-0.034-3.076-1.224-6.09-3.485-8.352L352.683,3.511c-0.004-0.004-0.007-0.005-0.011-0.008\n\t\t\tC350.505,1.338,347.511,0,344.206,0H89.278C75.361,0,64.04,11.32,64.04,25.237v461.525c0,13.916,11.32,25.237,25.237,25.237\n\t\t\th333.444c13.916,0,25.237-11.32,25.237-25.237V103.753C447.96,103.709,447.937,103.672,447.933,103.629z M356.194,40.931\n\t\t\tl50.834,50.834h-49.572c-0.695,0-1.262-0.567-1.262-1.262V40.931z M423.983,486.763c0,0.695-0.566,1.261-1.261,1.261H89.278\n\t\t\tc-0.695,0-1.261-0.566-1.261-1.261V25.237c0-0.695,0.566-1.261,1.261-1.261h242.94v66.527c0,13.916,11.322,25.239,25.239,25.239\n\t\t\th66.527V486.763z\"/>\n\t</g>\n</g>\n<g>\n\t<g>\n\t\t<path d=\"M362.088,164.014H149.912c-6.62,0-11.988,5.367-11.988,11.988c0,6.62,5.368,11.988,11.988,11.988h212.175\n\t\t\tc6.62,0,11.988-5.368,11.988-11.988C374.076,169.381,368.707,164.014,362.088,164.014z\"/>\n\t</g>\n</g>\n<g>\n\t<g>\n\t\t<path d=\"M362.088,236.353H149.912c-6.62,0-11.988,5.368-11.988,11.988c0,6.62,5.368,11.988,11.988,11.988h212.175\n\t\t\tc6.62,0,11.988-5.368,11.988-11.988C374.076,241.721,368.707,236.353,362.088,236.353z\"/>\n\t</g>\n</g>\n<g>\n\t<g>\n\t\t<path d=\"M362.088,308.691H149.912c-6.62,0-11.988,5.368-11.988,11.988c0,6.621,5.368,11.988,11.988,11.988h212.175\n\t\t\tc6.62,0,11.988-5.367,11.988-11.988C374.076,314.06,368.707,308.691,362.088,308.691z\"/>\n\t</g>\n</g>\n<g>\n\t<g>\n\t\t<path d=\"M256,381.031H149.912c-6.62,0-11.988,5.368-11.988,11.988c0,6.621,5.368,11.988,11.988,11.988H256\n\t\t\tc6.62,0,11.988-5.367,11.988-11.988C267.988,386.398,262.62,381.031,256,381.031z\"/>\n\t</g>\n</g>\n</svg>",
  ve = /*#__PURE__*/function () {
    function ve() {
      _classCallCheck(this, ve);
    }
    return _createClass(ve, null, [{
      key: "createImage",
      value: function createImage(e, t, n, s) {
        var r = new Image();
        return r.src = e.src, s && ae.scrollDownOnImageLoad(r.src, t, n), ae.processContent(j, r, r.src, e.name);
      }
      // WORK - image still does not scroll down when loaded
    }, {
      key: "createImageMessage",
      value: function createImageMessage(e, t, n, s, r) {
        var o = e.createNewMessageElement("", n),
          a = !s && !e.focusMode && r,
          c = ve.createImage(t, e.elementRef, o.outerContainer, a);
        return o.bubbleElement.appendChild(c), o.bubbleElement[m].add(ve.IMAGE_BUBBLE_CLASS), {
          type: j,
          elements: o
        };
      }
    }, {
      key: "createAudioElement",
      value: function createAudioElement(e, t) {
        var n = S(P);
        return n.src = e.src, n[m].add("audio-player"), n.controls = !0, Oe.IS_SAFARI && (n[m].add("audio-player-safari"), n[m].add(t === U ? "audio-player-safari-right" : "audio-player-safari-left")), n;
      }
    }, {
      key: "autoPlayAudio",
      value: function autoPlayAudio(e) {
        e.addEventListener("loadeddata", function () {
          e.play()["catch"](function (t) {
            console.warn("Auto-play failed:", t);
          });
        });
      }
    }, {
      key: "createNewAudioMessage",
      value: function createNewAudioMessage(e, t, n, s) {
        var r = ve.createAudioElement(t, n),
          o = e.createMessageElementsOnOrientation("", n, s);
        return o.bubbleElement.appendChild(r), o.bubbleElement[m].add(ve.AUDIO_BUBBLE_CLASS), {
          type: P,
          elements: o,
          audioElement: r
        };
      }
    }, {
      key: "createAnyFile",
      value: function createAnyFile(e) {
        var t = S();
        t[m].add("any-file-message-contents");
        var n = S();
        n[m].add("any-file-message-icon-container");
        var s = bt.createSVGElement(od);
        s[m].add("any-file-message-icon"), n.appendChild(s);
        var r = S();
        return r[m].add("any-file-message-text"), r.textContent = e.name || le, t.appendChild(n), t.appendChild(r), ae.processContent(Ut, t, e.src, r.textContent);
      }
    }, {
      key: "createNewAnyFileMessage",
      value: function createNewAnyFileMessage(e, t, n, s) {
        var r = e.createMessageElementsOnOrientation("", n, s),
          o = ve.createAnyFile(t);
        return r.bubbleElement[m].add(ve.ANY_FILE_BUBBLE_CLASS), r.bubbleElement.appendChild(o), {
          type: le,
          elements: r
        };
      }
    }, {
      key: "createMessages",
      value: function createMessages(e, t, n, s) {
        var r = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : !1;
        return t.map(function (o, a) {
          var c;
          if (o.ref && (o = ae.removeFileRef(o)), ae.isAudioFile(o)) {
            var l = ve.createNewAudioMessage(e, o, n, r),
              d = (c = e.textToSpeech) == null ? void 0 : c.audio;
            return d && (d.autoPlay && ve.autoPlayAudio(l.audioElement), typeof d.displayAudio == "boolean" && !d.displayAudio) ? void 0 : l;
          }
          return ae.isImageFile(o) ? ve.createImageMessage(e, o, n, r, s && a === 0) : ve.createNewAnyFileMessage(e, o, n, r);
        }).filter(function (o) {
          return o !== void 0;
        });
      }
      // no overwrite previous message logic as it is complex to track which files are to be overwritten
    }, {
      key: "addMessages",
      value: function addMessages(e, t, n, s, r) {
        var o = !s && X.isScrollbarAtBottomOfElement(e.elementRef);
        ve.createMessages(e, t, n, o, r).filter(function (c) {
          return c !== void 0;
        }).forEach(function (_ref196, d) {
          var c = _ref196.type,
            l = _ref196.elements;
          var p = d === 0 && o;
          ae.addMessage(e, l, c, n, r, p);
        });
      }
    }]);
  }();
ve.IMAGE_BUBBLE_CLASS = "image-message", ve.AUDIO_BUBBLE_CLASS = "audio-message", ve.ANY_FILE_BUBBLE_CLASS = "any-file-message";
var Ps = ve;
var He = /*#__PURE__*/function () {
  function He() {
    _classCallCheck(this, He);
  }
  return _createClass(He, null, [{
    key: "removeElements",
    value: function removeElements(e, t) {
      if (!t) return;
      var n = e.findIndex(function (s) {
        return s === t;
      });
      e.splice(n, 1), t == null || t.outerContainer.remove();
    }
  }, {
    key: "removeFilesMessages",
    value: function removeFilesMessages(e, t) {
      var n;
      (n = t[1][y]) == null || n.forEach(function (s) {
        He.removeElements(e.messageElementRefs, s);
      }), delete t[0][y], delete t[1][y];
    }
  }, {
    key: "removeTextHTMLMessage",
    value: function removeTextHTMLMessage(e, t, n) {
      var s = t[1][n];
      He.removeElements(e.messageElementRefs, s), delete t[0][n], delete t[1][n];
    }
  }, {
    key: "updateHTMLMessage",
    value: function updateHTMLMessage(e, t, n) {
      var s, r, o;
      if (t[1][R]) it.overwriteElements(e, n, t[1][R]);else {
        var a = it.create(e, n, t[0].role),
          c = ((r = t[1][y]) == null ? void 0 : r[((s = t[1][y]) == null ? void 0 : s.length) - 1]) || t[1][h],
          l = c.outerContainer.nextSibling;
        (o = l == null ? void 0 : l.parentElement) == null || o.insertBefore(a.outerContainer, l), e.messageElementRefs.splice(e.messageElementRefs.length - 1, 1);
        var d = e.messageElementRefs.findIndex(function (p) {
          return p === c;
        });
        e.messageElementRefs.splice(d + 1, 0, a), t[1][R] = a;
      }
      t[0][R] = n;
    }
    // finds beforeElement, creates new elements, remove old and adds new ones
  }, {
    key: "updateFileMessages",
    value: function updateFileMessages(e, t, n) {
      var p, u;
      var s = t[0].role,
        r = Ps.createMessages(e, n, s, !!t[1][h]),
        o = t[1][R],
        a = ((u = t[1][y]) == null ? void 0 : u[((p = t[1][y]) == null ? void 0 : p.length) - 1]) || t[1][h],
        c = o || a;
      var l = e.messageElementRefs.findIndex(function (g) {
        return g === c;
      });
      a && (l += 1);
      var d = (o == null ? void 0 : o.outerContainer) || (a == null ? void 0 : a.outerContainer.nextSibling);
      r.forEach(function (_ref197, b) {
        var g = _ref197.type,
          v = _ref197.elements;
        var E;
        ae.setElementProps(e, v, g, s), (E = d.parentElement) == null || E.insertBefore(v.outerContainer, d), e.messageElementRefs.splice(e.messageElementRefs.length - 1, 1), e.messageElementRefs.splice(l + b, 0, v);
      }), He.removeFilesMessages(e, t), t[1][y] = r.map(function (_ref198) {
        var g = _ref198.elements;
        return g;
      }), t[0][y] = n;
    }
  }, {
    key: "updateTextMessage",
    value: function updateTextMessage(e, t, n) {
      var s, r;
      if (t[1][h]) e.renderText(t[1][h].bubbleElement, n, t[0].role);else {
        var o = e.createElements(n, t[0].role),
          a = ((s = t[1][y]) == null ? void 0 : s[0]) || t[1][R];
        (r = a.outerContainer.parentElement) == null || r.insertBefore(o.outerContainer, a.outerContainer);
        var c = e.messageElementRefs.findIndex(function (l) {
          return l === a;
        });
        e.messageElementRefs.splice(c, 0, o), t[1][h] = o;
      }
      t[0][h] = n;
    }
  }, {
    key: "isElementActive",
    value: function isElementActive(e) {
      var t, n;
      return qe.isActiveElement((t = e[h]) == null ? void 0 : t.bubbleElement[m]) || qe.isActiveElement((n = e[R]) == null ? void 0 : n.bubbleElement[m]);
    }
    // note that overwrite and 'deep-chat-temporary-message' are used to remove a message
  }, {
    key: "update",
    value: function update(e, t, n) {
      var s = e.messageToElements[n];
      if (s) {
        if (He.isElementActive(s[1])) return console[f]("Cannot update a message that is being streamed");
        t[h] && He.updateTextMessage(e, s, t[h]), t[y] ? He.updateFileMessages(e, s, t[y]) : He.removeFilesMessages(e, s), t[R] && He.updateHTMLMessage(e, s, t[R]), !t[h] && s[1][h] && He.removeTextHTMLMessage(e, s, h), !t[R] && s[1][R] && He.removeTextHTMLMessage(e, s, R);
        var r = e.messageElementRefs,
          o = e.avatar,
          a = e.name;
        I.classifyRoleMessages(r), I.resetAllRoleElements(r, o, a);
      } else console[f]("Message index not found. Please use the `getMessages` method to find the correct index");
    }
  }]);
}();
var ad = /*#__PURE__*/function () {
  function ad() {
    _classCallCheck(this, ad);
  }
  return _createClass(ad, null, [{
    key: "getText",
    value: function getText(e, t) {
      var n;
      if (!e.directConnection && !e.connect && !e.webModel && !e.demo) return "Connect to any API using the [connect](".concat(q, "connect#connect-1) property or a popular service via [directConnection](").concat(q, "directConnection/#directConnection).\n Host AI entirely on your browser via a [webModel](").concat(q, "webModel).\n To get started checkout the [Start](https://deepchat.dev/start) page and live code [examples](https://deepchat.dev/examples/frameworks).\n To remove this message set the [demo](").concat(q, "modes#demo) property to true.");
      if (e.directConnection) {
        if (!t.isDirectConnection()) return "Please define a valid service inside\n          the [directConnection](".concat(q, "directConnection/#directConnection) object.");
        var s = (n = e.directConnection.openAI) == null ? void 0 : n.chat;
        if (_typeof(s) == "object" && s.tools && !s.function_handler) return "Please define the `function_handler` property inside the openAI [chat](".concat(q, "directConnection/openAI#Chat) object.");
      } else if (e.connect && !e.connect.url && !e.connect.handler) return "Please define a `url` or a `handler` property inside the [connect](".concat(q, "connect#connect-1) object.");
      return null;
    }
  }]);
}();
var qe = /*#__PURE__*/function (_$e) {
  function qe(e, t, n) {
    var _this77;
    _classCallCheck(this, qe);
    var o, a;
    _this77 = _callSuper(this, qe, [e]);
    var s = t.permittedErrorPrefixes,
      r = t.demo;
    _this77._errorMessageOverrides = (o = e.errorMessages) == null ? void 0 : o.overrides, _this77._onClearMessages = qt.onClearMessages.bind(_this77, e), _this77._onError = qt.onError.bind(_this77, e), _this77._isLoadingMessageAllowed = qe.getDefaultDisplayLoadingMessage(e, t), _typeof(e.displayLoadingBubble) == "object" && e.displayLoadingBubble.toggle && (e.displayLoadingBubble.toggle = _this77.setLoadingToggle.bind(_this77)), _this77._permittedErrorPrefixes = s, _this77.addSetupMessageIfNeeded(e, t) || _this77.populateIntroPanel(n), r && _this77.prepareDemo(me.processDemo(r), e.loadHistory), _this77.addIntroductoryMessages(e, t), new ts(e, _this77, t), _this77._displayServiceErrorMessages = (a = e.errorMessages) == null ? void 0 : a.displayServiceErrorMessages, e.getMessages = function () {
      return I.deepCloneMessagesWithReferences(_this77.messageToElements.map(function (_ref199) {
        var _ref200 = _slicedToArray(_ref199, 1),
          c = _ref200[0];
        return c;
      }));
    }, e.clearMessages = _this77.clearMessages.bind(_this77, t), e.refreshMessages = _this77.refreshTextMessages.bind(_this77, e.remarkable), e.scrollToBottom = X.scrollToBottom.bind(_this77, _this77.elementRef), e.addMessage = function (c, l) {
      _this77.addAnyMessage(_objectSpread(_objectSpread({}, c), {}, {
        sendUpdate: !!l
      }), !l);
    }, e.updateMessage = function (c, l) {
      return He.update(_this77, c, l);
    }, t.isWebModel() && t.setUpMessages(_this77), e.textToSpeech && on.processConfig(e.textToSpeech, function (c) {
      _this77.textToSpeech = c;
    });
    return _this77;
  }
  _inherits(qe, _$e);
  return _createClass(qe, [{
    key: "setLoadingToggle",
    value: function setLoadingToggle(e) {
      var t = this.messageElementRefs[this.messageElementRefs.length - 1];
      !e && $e.isLoadingMessage(t) ? (this.removeLastMessage(), delete this._activeLoadingConfig) : (this._activeLoadingConfig && this.removeLastMessage(), this._activeLoadingConfig = e || {}, this.addLoadingMessage(!0));
    }
  }, {
    key: "prepareDemo",
    value: function prepareDemo(e, t) {
      var n;
      if (_typeof(e) == "object") {
        if (!t && e.displayLoading) {
          var s = e.displayLoading.history;
          s != null && s.small && yt.addMessage(this, !1), s != null && s.full && yt.addMessage(this);
        }
        e.displayErrors && (e.displayErrors[x] && this.addNewErrorMessage("", ""), e.displayErrors.service && this.addNewErrorMessage(Z, ""), e.displayErrors.speechToText && this.addNewErrorMessage("speechToText", "")), (n = e.displayLoading) != null && n.message && this.addLoadingMessage(), e.response && (this.customDemoResponse = e.response);
      }
    }
  }, {
    key: "addSetupMessageIfNeeded",
    value: function addSetupMessageIfNeeded(e, t) {
      var n = ad.getText(e, t);
      if (n) {
        var s = this.createAndAppendNewMessageElement(n, W);
        this.applyCustomStyles(s, W, !1);
      }
      return !!n;
    }
    // WORK - const file for deep chat classes
  }, {
    key: "addIntroductoryMessages",
    value: function addIntroductoryMessages(e, t) {
      var _this78 = this;
      e != null && e.shadowRoot && (this._introMessage = e.introMessage);
      var n = this._introMessage;
      t != null && t.isWebModel() && (n !== null && n !== void 0 ? n : n = t.getIntroMessage(n));
      var s = !(e != null && e.history) && !!(e != null && e.loadHistory || t != null && t.fetchHistory);
      n && (Array.isArray(n) ? n.forEach(function (r, o) {
        if (o !== 0) {
          var a = _this78.messageElementRefs[_this78.messageElementRefs.length - 1].innerContainer;
          I.hideRoleElements(a, _this78.avatar, _this78.name);
        }
        _this78.addIntroductoryMessage(r, s);
      }) : this.addIntroductoryMessage(n, s));
    }
  }, {
    key: "addIntroductoryMessage",
    value: function addIntroductoryMessage(e, t) {
      var s;
      var n;
      return e != null && e[h] ? n = this.createAndAppendNewMessageElement(e[h], W) : e != null && e[R] && (n = it.add(this, e[R], W, !1)), n && (this.applyCustomStyles(n, W, !1, (s = this.messageStyles) == null ? void 0 : s.intro), n.outerContainer[m].add($e.INTRO_CLASS), t && (n.outerContainer[_].display = "none")), n;
    }
  }, {
    key: "removeIntroductoryMessage",
    value: function removeIntroductoryMessage() {
      var e = this.messageElementRefs[0];
      e.outerContainer[m].contains($e.INTRO_CLASS) && (e.outerContainer.remove(), this.messageElementRefs.shift());
    }
  }, {
    key: "addAnyMessage",
    value: function addAnyMessage(e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
      var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !1;
      return e[f] ? this.addNewErrorMessage(Z, e[f], n) : this.addNewMessage(e, t, n);
    }
  }, {
    key: "tryAddTextMessage",
    value: function tryAddTextMessage(e, t, n) {
      var s = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !1;
      var r = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : !1;
      e[h] !== void 0 && n[h] !== null && (this.addNewTextMessage(e[h], e.role, t, r), !s && this.textToSpeech && e.role !== U && on.speak(e[h], this.textToSpeech));
    }
  }, {
    key: "tryAddFileMessages",
    value: function tryAddFileMessages(e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
      e[y] && Array.isArray(e[y]) && Ps.addMessages(this, e[y], e.role, !!e[h], t);
    }
  }, {
    key: "tryAddHTMLMessage",
    value: function tryAddHTMLMessage(e, t) {
      var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !1;
      if (e[R] !== void 0 && e[R] !== null) {
        var s = !e[h] && (!e[y] || e[y].length === 0),
          r = it.add(this, e[R], e.role, s, t, n);
        !n && st.isElementTemporary(r) && delete e[R];
      }
    }
    // this should not be activated by streamed messages
  }, {
    key: "addNewMessage",
    value: function addNewMessage(e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
      var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !1;
      var a, c, l, d;
      e.role !== U && ((a = this._hiddenAttachments) == null || a.removeHiddenFiles());
      var s = qe.createMessageContent(e),
        r = (l = (c = this.textToSpeech) == null ? void 0 : c.audio) == null ? void 0 : l.displayText;
      typeof r == "boolean" && !r && delete s[h];
      var o = {
        status: e.overwrite
      };
      return n ? (this.tryAddHTMLMessage(s, o, n), this.tryAddFileMessages(s, n), this.tryAddTextMessage(s, o, e, t, n)) : (this.tryAddTextMessage(s, o, e, t, n), this.tryAddFileMessages(s, n), this.tryAddHTMLMessage(s, o, n)), this.isValidMessageContent(s) && !n && (this.updateStateOnMessage(s, e.overwrite, e.sendUpdate, t), t || (d = this.browserStorage) == null || d.addMessages(this.messageToElements.map(function (_ref201) {
        var _ref202 = _slicedToArray(_ref201, 1),
          p = _ref202[0];
        return p;
      }))), this._activeLoadingConfig && this.addLoadingMessage(!1), s;
    }
  }, {
    key: "isValidMessageContent",
    value: function isValidMessageContent(e) {
      return e[h] || e[R] || e[y] && e[y].length > 0;
    }
  }, {
    key: "updateStateOnMessage",
    value: function updateStateOnMessage(e, t) {
      var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !0;
      var s = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !1;
      if (!t) {
        var r = I.generateMessageBody(e, this.messageElementRefs);
        this.messageToElements.push([e, r]);
      }
      n && this.sendClientUpdate(e, s);
    }
    // prettier-ignore
  }, {
    key: "removeMessageOnError",
    value: function removeMessageOnError() {
      var e = this.messageElementRefs[this.messageElementRefs.length - 1],
        t = e == null ? void 0 : e.bubbleElement;
      (t != null && t[m].contains(Ye.MESSAGE_CLASS) && t.textContent === "" || qe.isTemporaryElement(e)) && this.removeLastMessage();
    }
    // prettier-ignore
  }, {
    key: "addNewErrorMessage",
    value: function addNewErrorMessage(e, t) {
      var _this79 = this;
      var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !1;
      var l, d, p, u, g, v;
      (l = this._hiddenAttachments) == null || l.readdHiddenFiles(), this.removeMessageOnError();
      var s = this.getPermittedMessage(t) || ((d = this._errorMessageOverrides) == null ? void 0 : d[e]) || ((p = this._errorMessageOverrides) == null ? void 0 : p[x]) || "Error, please try again.",
        r = this.createMessageElementsOnOrientation(s, f, n);
      I.hideRoleElements(r.innerContainer, this.avatar, this.name);
      var o = r.bubbleElement,
        a = r.outerContainer;
      o[m].add(vs), this.renderText(o, s);
      var c = we.extractParticularSharedStyles(["fontSize", "fontFamily"], (u = this.messageStyles) == null ? void 0 : u[x]);
      we.applyCustomStylesToElements(r, !1, c), we.applyCustomStylesToElements(r, !1, (g = this.messageStyles) == null ? void 0 : g[f]), n || this.appendOuterContainerElemet(a), this.textToSpeech && on.speak(s, this.textToSpeech), (v = this._onError) == null || v.call(this, s), setTimeout(function () {
        return X.scrollToBottom(_this79.elementRef);
      });
    }
  }, {
    key: "getPermittedMessage",
    value: function getPermittedMessage(e) {
      if (e) {
        var t = qe.extractErrorMessages(e);
        for (var _n11 = 0; _n11 < t.length; _n11 += 1) {
          var s = t[_n11];
          if (typeof s == "string") {
            if (this._displayServiceErrorMessages) return s;
            if (this._permittedErrorPrefixes) {
              var r = qe.checkPermittedErrorPrefixes(this._permittedErrorPrefixes, s);
              if (r) return r;
            }
          }
        }
      }
    }
  }, {
    key: "removeError",
    value: function removeError() {
      this.isLastMessageError() && I.getLastMessageElement(this.elementRef).remove();
    }
  }, {
    key: "addDefaultLoadingMessage",
    value: function addDefaultLoadingMessage(e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : W;
      var n = this.createMessageElements("", t),
        s = n.bubbleElement;
      n.bubbleElement[m].add(mt.DOTS_CONTAINER_CLASS);
      var r = S();
      return r[m].add("loading-message-dots"), s.appendChild(r), mt.setDots(s, e), n;
    }
    // prettier-ignore
  }, {
    key: "addLoadingMessage",
    value: function addLoadingMessage() {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !1;
      var a, c, l, d, p, u;
      if ($e.isLoadingMessage(this.messageElementRefs[this.messageElementRefs.length - 1]) || !this._activeLoadingConfig && !e && !this._isLoadingMessageAllowed) return;
      var t = ((a = this._activeLoadingConfig) == null ? void 0 : a.role) || W,
        n = ((c = this._activeLoadingConfig) == null ? void 0 : c[_]) || ((d = (l = this.messageStyles) == null ? void 0 : l.loading) == null ? void 0 : d.message),
        s = n == null ? void 0 : n[R],
        r = s ? it.createElements(this, s, t, !1) : this.addDefaultLoadingMessage(n, t);
      this.appendOuterContainerElemet(r.outerContainer), r.bubbleElement[m].add(mt.BUBBLE_CLASS), this.applyCustomStyles(r, t, !1, n == null ? void 0 : n.styles), (u = (p = this.avatar) == null ? void 0 : p.getAvatarContainer(r.innerContainer)) == null || u[m].add("loading-avatar-container"), !this.focusMode && X.isScrollbarAtBottomOfElement(this.elementRef) && X.scrollToBottom(this.elementRef);
    }
  }, {
    key: "populateIntroPanel",
    value: function populateIntroPanel(e) {
      e && (this._introPanel = new zi(e), Se.apply(this, this._introPanel._elementRef), this.elementRef.appendChild(this._introPanel._elementRef));
    }
  }, {
    key: "addMultipleFiles",
    value: function () {
      var _addMultipleFiles = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee168(e, t) {
        return _regenerator().w(function (_context168) {
          while (1) switch (_context168.n) {
            case 0:
              return _context168.a(2, (this._hiddenAttachments = t, Promise.all((e || []).map(function (n) {
                return new Promise(function (s) {
                  if (!n.type || n.type === Ut) {
                    var r = n[le].name || le;
                    s({
                      name: r,
                      type: Ut,
                      ref: n[le]
                    });
                  } else {
                    var _r7 = new FileReader();
                    _r7.readAsDataURL(n[le]), _r7.onload = function () {
                      var o = n[le].name;
                      s(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, Y, _r7.result), "name", o), "type", n.type), "ref", n[le]));
                    };
                  }
                });
              }))));
          }
        }, _callee168, this);
      }));
      function addMultipleFiles(_x314, _x315) {
        return _addMultipleFiles.apply(this, arguments);
      }
      return addMultipleFiles;
    }()
  }, {
    key: "clearMessages",
    value:
    // WORK - update all message classes to use deep-chat prefix
    function clearMessages(e, t) {
      var _this$messageToElemen;
      var r, o, a;
      var n = [];
      this.messageElementRefs.forEach(function (c) {
        qe.isActiveElement(c.bubbleElement[m]) ? n.push(c) : c.outerContainer.remove();
      }), Array.from(this.elementRef.children).forEach(function (c) {
        var d;
        var l = (d = c.children[0]) == null ? void 0 : d.children[0];
        l != null && l[m].contains(vs) && c.remove();
      }), this.messageElementRefs = n;
      var s = this.messageToElements.filter(function (c) {
        return c[1][h] && qe.isActiveElement(c[1][h].bubbleElement[m]) || c[1][R] && qe.isActiveElement(c[1][R].bubbleElement[m]);
      });
      (_this$messageToElemen = this.messageToElements).splice.apply(_this$messageToElemen, [0, this.messageToElements.length].concat(_toConsumableArray(s))), t !== !1 && ((r = this._introPanel) != null && r._elementRef && this._introPanel.display(), this.addIntroductoryMessages()), (o = this.browserStorage) == null || o.clear(), (a = this._onClearMessages) == null || a.call(this), delete e.sessionId;
    }
  }], [{
    key: "getDefaultDisplayLoadingMessage",
    value: function getDefaultDisplayLoadingMessage(e, t) {
      var _ref203;
      return _typeof(e.displayLoadingBubble) == "object" && e.displayLoadingBubble.toggle ? !1 : t.websocket ? _typeof(e.displayLoadingBubble) === L ? !1 : !!e.displayLoadingBubble : (_ref203 = _typeof(e.displayLoadingBubble) === L || e.displayLoadingBubble) !== null && _ref203 !== void 0 ? _ref203 : !0;
    }
  }, {
    key: "checkPermittedErrorPrefixes",
    value: function checkPermittedErrorPrefixes(e, t) {
      for (var _n12 = 0; _n12 < e.length; _n12 += 1) if (t.startsWith(e[_n12])) return t;
    }
  }, {
    key: "extractErrorMessages",
    value: function extractErrorMessages(e) {
      return Array.isArray(e) ? e : e instanceof Error ? [e.message] : typeof e == "string" ? [e] : _typeof(e) == "object" && e[f] ? [e[f]] : [];
    }
  }, {
    key: "isActiveElement",
    value: function isActiveElement(e) {
      return e ? e.contains(mt.BUBBLE_CLASS) || e.contains(yt.CLASS) || e.contains(Ye.MESSAGE_CLASS) : !1;
    }
  }]);
}($e);
var qn = /*#__PURE__*/function () {
  function qn() {
    _classCallCheck(this, qn);
  }
  return _createClass(qn, null, [{
    key: "adjustInputPadding",
    value: function adjustInputPadding(e, t) {
      t[Xn].length > 0 && e[m].add("text-input-inner-left-adjustment"), t[ut].length > 0 && e[m].add("text-input-inner-right-adjustment");
    }
  }, {
    key: "adjustForOutsideButton",
    value: function adjustForOutsideButton(e, t, n) {
      n[ue].length === 0 && n[Te].length > 0 ? (e[0][m].add(nr), t[m].add(nr)) : n[Te].length === 0 && n[ue].length > 0 && (e[3][m].add(sr), t[m].add(sr));
    }
    // when submit is the only button
    // when submit button is outside by itself - we increase the height for a better look
  }, {
    key: "adjustOutsideSubmit",
    value: function adjustOutsideSubmit(e, t, n) {
      if (!(n[Xn].length > 0 || n[ut].length > 0)) {
        if (n[ue].length === 0 && n[Te].length > 0) return e[0][m].add(er), t[m].add(er), n[Te].map(function (s) {
          return s.button.elementRef[m].add("submit-button-enlarged");
        });
        if (n[Te].length === 0 && n[ue].length > 0) return e[3][m].add(tr), t[m].add(tr), n[ue].map(function (s) {
          return s.button.elementRef[m].add("submit-button-enlarged");
        });
      }
    }
    // prettier-ignore
  }, {
    key: "set",
    value: function set(e, t, n, s) {
      !!qn.adjustOutsideSubmit(t, n, s) || qn.adjustForOutsideButton(t, n, s), qn.adjustInputPadding(e, s);
    }
  }]);
}();
var ln = /*#__PURE__*/function () {
  function ln() {
    _classCallCheck(this, ln);
  }
  return _createClass(ln, null, [{
    key: "create",
    value: function create() {
      return Array.from({
        length: 4
      }).map(function (e, t) {
        var n = S();
        return n[m].add("input-button-container"), (t === 0 || t === 3) && n[m].add("outer-button-container"), (t === 1 || t === 2) && n[m].add("inner-button-container"), n;
      });
    }
  }, {
    key: "add",
    value: function add(e, t) {
      e.insertBefore(t[1], e.firstChild), e.insertBefore(t[0], e.firstChild), e.appendChild(t[2]), e.appendChild(t[3]);
    }
  }, {
    key: "getContainerIndex",
    value: function getContainerIndex(e) {
      return e === Te ? 0 : e === Xn ? 1 : e === ut ? 2 : 3;
    }
  }, {
    key: "addButton",
    value: function addButton(e, t, n) {
      t[m].add(n);
      var s = ln.getContainerIndex(n);
      e[s].appendChild(t), s === 3 && t[m].add(ue);
    }
  }]);
}();
var xr = ["camera", "gifs", "images", "audio", "mixedFiles", "submit", "microphone"],
  cd = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 22 22\" fill=\"none\">\n  <rect x=\"2.5\" y=\"2.5\" width=\"17\" height=\"17\" rx=\"2\" stroke=\"#000000\" stroke-width=\"1.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n</svg>\n",
  ke = /*#__PURE__*/function () {
    function ke() {
      _classCallCheck(this, ke);
    }
    return _createClass(ke, null, [{
      key: "addItemEvents",
      value: function addItemEvents(e, t, n, s) {
        wt.add(t, s), t.addEventListener(H, function () {
          n[H]();
        }), t.addEventListener("mouseenter", function (r) {
          e.highlightedItem = r.target;
        }), t.addEventListener("mouseleave", function () {
          e.highlightedItem = void 0;
        });
      }
    }, {
      key: "createItemText",
      value: function createItemText(e, t) {
        var n = S();
        return Object.assign(n[_], t), n[m].add(ke.TEXT_CLASS), n.textContent = e || "File", n;
      }
    }, {
      key: "createItemIcon",
      value: function createItemIcon(e, t) {
        var n = S();
        return Object.assign(n[_], t), n[m].add(ke.ICON_CLASS), n.appendChild(e), n;
      }
    }, {
      key: "populateItem",
      value: function populateItem(e, t, n) {
        var s = e.elementRef,
          r = e.dropupText,
          o = e.svg,
          a = e.customStyles,
          c = s.children[0],
          l = a && Object.values(a).find(function (d) {
            var p;
            return ((p = d.svg) == null ? void 0 : p.content) === "";
          });
        c[m].contains(ot.INPUT_BUTTON_INNER_TEXT_CLASS) ? (l || t.appendChild(ke.createItemIcon(o, n == null ? void 0 : n.iconContainer)), t.appendChild(ke.createItemText(c.textContent, n == null ? void 0 : n[h]))) : (l || t.appendChild(ke.createItemIcon(s.children[0], n == null ? void 0 : n.iconContainer)), t.appendChild(ke.createItemText(r, n == null ? void 0 : n[h])));
      }
    }, {
      key: "createItem",
      value: function createItem(e, t, n) {
        var o;
        var s = S();
        Object.assign(s[_], (o = n == null ? void 0 : n.item) == null ? void 0 : o[x]), ke.populateItem(t, s, n), s[m].add(ke.MENU_ITEM_CLASS);
        var r = t.elementRef;
        if (t.isCustom) t.setDropupItem(s);else {
          var a = Q.processStateful((n == null ? void 0 : n.item) || {});
          ke.addItemEvents(e, s, r, a);
        }
        return s;
      }
    }]);
  }();
ke.MENU_ITEM_CLASS = "dropup-menu-item", ke.TEXT_CLASS = "dropup-menu-item-text", ke.ICON_CLASS = "dropup-menu-item-icon";
var nt = ke;
var ee = /*#__PURE__*/function (_Jt2) {
  // prettier-ignore
  function ee(e, t, n, s) {
    var _this80;
    _classCallCheck(this, ee);
    var c, l, d, p, u, g;
    var r = ((p = (d = (l = (c = e == null ? void 0 : e.styles) == null ? void 0 : c.button) == null ? void 0 : l[x]) == null ? void 0 : d[h]) == null ? void 0 : p.content) || "Custom ".concat(t),
      o = cd,
      a = Qe.tryCreateConfig("Custom ".concat(t), e == null ? void 0 : e.tooltip);
    _this80 = _callSuper(this, ee, [ee.createButtonElement(), o, e == null ? void 0 : e.position, a, ((u = e == null ? void 0 : e.styles) == null ? void 0 : u.button) || a && {}, r]), _this80._state = x, _this80.isCustom = !0, _this80._innerElements = _this80.createInnerElementsForStates(_this80.customStyles), _this80._menuStyles = s, _this80._onClick = e.onClick, _this80._dropupStyles = (g = e.styles) == null ? void 0 : g.dropup, _this80.setSetState(e), _this80.addClickListener(n), _this80.changeState(e.initialState, !0);
    return _this80;
  }
  _inherits(ee, _Jt2);
  return _createClass(ee, [{
    key: "createInnerElementsForStates",
    value: function createInnerElementsForStates(e) {
      var t = "custom-icon",
        n = this.createInnerElements(t, x, e);
      return _defineProperty(_defineProperty(_defineProperty({}, x, n), "active", this.genStateInnerElements(t, "active", n, e)), "disabled", this.genStateInnerElements(t, "disabled", n, e));
    }
  }, {
    key: "setSetState",
    value: function setSetState(e) {
      var _this81 = this;
      e.setState = function (t) {
        t === x && _this81.changeToDefault(), t === "active" && _this81.changeToActive(), t === "disabled" && _this81.changeToDisabled();
      };
    }
  }, {
    key: "addClickListener",
    value: function addClickListener(e) {
      var _this82 = this;
      this.elementRef.addEventListener(H, function () {
        var n;
        var t = (n = _this82._onClick) == null ? void 0 : n.call(_this82, _this82._state);
        e == null || e(), (t === x || t === "active" || t === "disabled") && _this82.changeState(t);
      });
    }
  }, {
    key: "changeState",
    value: function changeState(e, t) {
      e === "disabled" ? this.changeToDisabled(t) : e === "active" ? this.changeToActive(t) : this.changeToDefault(t);
    }
  }, {
    key: "applyDropupContentStyles",
    value: function applyDropupContentStyles(e) {
      var t = Array.from(this.elementRef.children);
      if (e != null && e[h]) {
        var _n13 = t.find(function (s) {
          return s[m].contains(nt.TEXT_CLASS);
        });
        _n13 && Object.assign(_n13[_], e[h]);
      }
      if (e != null && e.iconContainer) {
        var _n14 = t.find(function (s) {
          return s[m].contains(nt.ICON_CLASS);
        });
        _n14 && Object.assign(_n14[_], e.iconContainer);
      }
    }
  }, {
    key: "resetDropupItem",
    value: function resetDropupItem(e) {
      var n, s, r;
      this.elementRef = Se.replaceElementWithNewClone(this.elementRef, this._originalElementRef), this.elementRef.innerHTML = "", ((n = e == null ? void 0 : e.svg) == null ? void 0 : n.content) === "" || this.elementRef.appendChild(nt.createItemIcon(this.svg, (s = this._menuStyles) == null ? void 0 : s.iconContainer)), this.elementRef.appendChild(nt.createItemText(this.dropupText, (r = this._menuStyles) == null ? void 0 : r[h]));
    }
  }, {
    key: "assignDropupItemStyle",
    value: function assignDropupItemStyle(e, t) {
      var s;
      this.elementRef.parentElement && this._originalElementRef && this.resetDropupItem(t), this.applyDropupContentStyles(e), Object.assign(this.elementRef[_], (s = e == null ? void 0 : e.item) == null ? void 0 : s[x]);
      var n = Q.processStateful((e == null ? void 0 : e.item) || {});
      wt.add(this.elementRef, n), this.addClickListener();
    }
  }, {
    key: "changeToDefault",
    value: function changeToDefault(e) {
      var t, n, s, r, o, a;
      !e && this._state === x || (this.elementRef[m].contains(nt.MENU_ITEM_CLASS) ? this.assignDropupItemStyle((t = this._dropupStyles) == null ? void 0 : t[x], (n = this.customStyles) == null ? void 0 : n[x]) : (this.changeElementsByState(this._innerElements[x]), (s = this.customStyles) != null && s.active && ce.unsetAllCSS(this.elementRef, (r = this.customStyles) == null ? void 0 : r.active), (o = this.customStyles) != null && o.disabled && ce.unsetAllCSS(this.elementRef, (a = this.customStyles) == null ? void 0 : a.disabled), this.reapplyStateStyle(x, ["active", "disabled"])), this.elementRef[m].remove(ee.DISABLED_CONTAINER_CLASS, ee.ACTIVE_CONTAINER_CLASS), this.elementRef[m].add(ee.DEFAULT_CONTAINER_CLASS), te.removeAriaDisabled(this.elementRef), this._state = x);
    }
  }, {
    key: "changeToActive",
    value: function changeToActive(e) {
      var t, n;
      !e && this._state === "active" || (this.elementRef[m].contains(nt.MENU_ITEM_CLASS) ? this.assignDropupItemStyle((t = this._dropupStyles) == null ? void 0 : t.active, (n = this.customStyles) == null ? void 0 : n.active) : (this.changeElementsByState(this._innerElements.active), this.reapplyStateStyle("active", ["disabled", x])), this.elementRef[m].remove(ee.DISABLED_CONTAINER_CLASS, ee.DEFAULT_CONTAINER_CLASS), this.elementRef[m].add(ee.ACTIVE_CONTAINER_CLASS), te.removeAriaDisabled(this.elementRef), this._state = "active");
    }
  }, {
    key: "changeToDisabled",
    value: function changeToDisabled(e) {
      var t, n, s, r, o, a;
      !e && this._state === "disabled" || (this.elementRef[m].contains(nt.MENU_ITEM_CLASS) ? this.assignDropupItemStyle((t = this._dropupStyles) == null ? void 0 : t.disabled, (n = this.customStyles) == null ? void 0 : n.disabled) : (this.changeElementsByState(this._innerElements.disabled), (s = this.customStyles) != null && s.active && ce.unsetAllCSS(this.elementRef, (r = this.customStyles) == null ? void 0 : r.active), (o = this.customStyles) != null && o[x] && ce.unsetAllCSS(this.elementRef, (a = this.customStyles) == null ? void 0 : a[x]), this.reapplyStateStyle("disabled", [x, "active"])), this.elementRef[m].remove(ee.ACTIVE_CONTAINER_CLASS, ee.DEFAULT_CONTAINER_CLASS), this.elementRef[m].add(ee.DISABLED_CONTAINER_CLASS), te.addAriaDisabled(this.elementRef), this._state = "disabled");
    }
    // called after class is initialised
  }, {
    key: "setDropupItem",
    value: function setDropupItem(e) {
      this.elementRef = e, this._originalElementRef = e.cloneNode(!0), this.changeState(this._state, !0);
    }
  }, {
    key: "genStateInnerElements",
    value: function genStateInnerElements(e, t, n, s) {
      var c, l, d, p;
      var r = this.createInnerElements(e, t, s);
      var o = (l = (c = s == null ? void 0 : s[t]) == null ? void 0 : c.svg) == null ? void 0 : l.content,
        a = (p = (d = s == null ? void 0 : s[t]) == null ? void 0 : d[h]) == null ? void 0 : p.content;
      if (o === void 0 || a === void 0) {
        var _Hn$parseSVGTextEleme4 = Hn.parseSVGTextElements(n),
          u = _Hn$parseSVGTextEleme4.svg,
          g = _Hn$parseSVGTextEleme4[h],
          _Hn$parseSVGTextEleme5 = Hn.parseSVGTextElements(r),
          v = _Hn$parseSVGTextEleme5.svg,
          b = _Hn$parseSVGTextEleme5[h],
          E = [];
        ee.addToInnerElements(E, o, u, v), ee.addToInnerElements(E, a, g, b), r = E;
      }
      return r;
    }
  }], [{
    key: "createButtonElement",
    value: function createButtonElement() {
      var e = S();
      return e[m].add("input-button", ee.BUTTON_CLASS), e;
    }
  }, {
    key: "addToInnerElements",
    value: function addToInnerElements(e, t, n, s) {
      t === void 0 && n ? e.push(n.cloneNode(!0)) : s && e.push(s);
    }
  }, {
    key: "add",
    value: function add(e, t) {
      var n = e.customButtons,
        s = e.focusInput,
        r = e.dropupStyles;
      n == null || n.forEach(function (o, a) {
        var c = {
          button: new ee(o, a + 1, s, r == null ? void 0 : r.menu)
        };
        t["".concat(ee.INDICATOR_PREFIX).concat(a + 1)] = c;
      });
    }
  }]);
}(Jt);
ee.INDICATOR_PREFIX = "custom", ee.BUTTON_CLASS = "custom-button", ee.DISABLED_CONTAINER_CLASS = "custom-button-container-disabled", ee.DEFAULT_CONTAINER_CLASS = "custom-button-container-default", ee.ACTIVE_CONTAINER_CLASS = "custom-button-container-active";
var Ft = ee;
var ld = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<svg viewBox=\"0 0 32 32\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\">\n    <path d=\"M16 0c-8.836 0-16 7.163-16 16s7.163 16 16 16c8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 30.032c-7.72 0-14-6.312-14-14.032s6.28-14 14-14 14 6.28 14 14-6.28 14.032-14 14.032zM23 15h-6v-6c0-0.552-0.448-1-1-1s-1 0.448-1 1v6h-6c-0.552 0-1 0.448-1 1s0.448 1 1 1h6v6c0 0.552 0.448 1 1 1s1-0.448 1-1v-6h6c0.552 0 1-0.448 1-1s-0.448-1-1-1z\"></path>\n</svg>";
var is = /*#__PURE__*/function () {
  function is() {
    _classCallCheck(this, is);
  }
  return _createClass(is, null, [{
    key: "focusItemWhenOnEdge",
    value: function focusItemWhenOnEdge(e, t) {
      var n = t ? e.children[0] : e.children[e.children.length - 1];
      is.focusSiblingItem(n, e, t, !0);
    }
    // isEdgeItem means is it a start or end item
    // prettier-ignore
  }, {
    key: "focusSiblingItem",
    value: function focusSiblingItem(e, t, n) {
      var s = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !1;
      var r = s ? e : e[n ? "nextSibling" : "previousSibling"];
      r ? (e.dispatchEvent(new MouseEvent("mouseleave")), r.dispatchEvent(new MouseEvent("mouseenter"))) : (e.dispatchEvent(new MouseEvent("mouseleave")), is.focusItemWhenOnEdge(t, n));
    }
  }]);
}();
var Vi = /*#__PURE__*/function () {
  function Vi(e, t) {
    var _this83 = this;
    _classCallCheck(this, Vi);
    var n;
    this._isOpen = !0, this._styles = t, this.elementRef = Vi.createElement((n = this._styles) == null ? void 0 : n.container), this.close(), setTimeout(function () {
      return _this83.addWindowEvents(e);
    });
  }
  return _createClass(Vi, [{
    key: "open",
    value: function open() {
      this.elementRef[_].display = "block", this._isOpen = !0;
    }
  }, {
    key: "close",
    value: function close() {
      this._isOpen && (this.elementRef[_].display = "none", this._isOpen = !1);
    }
  }, {
    key: "toggle",
    value: function toggle() {
      this._isOpen ? this.close() : this.open();
    }
  }, {
    key: "addItem",
    value: function addItem(e) {
      var t = nt.createItem(this, e, this._styles);
      this.elementRef.appendChild(t);
    }
    // prettier-ignore
  }, {
    key: "addWindowEvents",
    value: function addWindowEvents(e) {
      this.clickEvent = this.windowClick.bind(this, e), window.addEventListener(H, this.clickEvent), this.keyDownEvent = this.windowKeyDown.bind(this, e), window.addEventListener("keydown", this.keyDownEvent);
    }
  }, {
    key: "windowClick",
    value: function windowClick(e, t) {
      var n;
      !e.isConnected && this.clickEvent ? window.removeEventListener(H, this.clickEvent) : e.parentElement !== ((n = t.target.shadowRoot) == null ? void 0 : n.children[0]) && this.close();
    }
    // prettier-ignore
  }, {
    key: "windowKeyDown",
    value: function windowKeyDown(e, t) {
      var n, s, r;
      !e.isConnected && this.keyDownEvent ? window.removeEventListener("keydown", this.keyDownEvent) : this._isOpen && (t.key === pe.ESCAPE ? (this.close(), (n = this.highlightedItem) == null || n.dispatchEvent(new MouseEvent("mouseleave"))) : t.key === pe.ENTER ? ((s = this.highlightedItem) == null || s[H](), (r = this.highlightedItem) == null || r.dispatchEvent(new MouseEvent("mouseleave"))) : t.key === pe.ARROW_DOWN ? is.focusSiblingItem(this.highlightedItem || this.elementRef.children[this.elementRef.children.length - 1], this.elementRef, !0) : t.key === pe.ARROW_UP && is.focusSiblingItem(this.highlightedItem || this.elementRef.children[0], this.elementRef, !1));
    }
  }], [{
    key: "createElement",
    value: function createElement(e) {
      var t = S();
      return t.id = je, Object.assign(t[_], e), t;
    }
  }]);
}();
var Lt = /*#__PURE__*/function (_Jt3) {
  function Lt(e, t) {
    var _this84;
    _classCallCheck(this, Lt);
    var r, o;
    var n = Qe.tryCreateConfig("Options", (r = t == null ? void 0 : t.button) == null ? void 0 : r.tooltip);
    _this84 = _callSuper(this, Lt, [Lt.createButtonElement(), ld, void 0, n, {
      styles: (o = t == null ? void 0 : t.button) == null ? void 0 : o.styles
    }]);
    var s = _this84.createInnerElementsForStates(_this84.customStyles);
    _this84._menu = new Vi(e, t == null ? void 0 : t.menu), _this84.addClickEvent(), _this84.buttonContainer = Lt.createButtonContainer(), _this84.changeElementsByState(s.styles), _this84.buttonContainer.appendChild(_this84.elementRef), _this84.elementRef[m].add(Lt.BUTTON_ICON_CLASS), _this84.buttonContainer.appendChild(_this84._menu.elementRef), _this84.reapplyStateStyle("styles"), _this84.addContainerEvents(e);
    return _this84;
  }
  _inherits(Lt, _Jt3);
  return _createClass(Lt, [{
    key: "createInnerElementsForStates",
    value: function createInnerElementsForStates(e) {
      return {
        styles: this.createInnerElements("dropup-icon", "styles", e)
      };
    }
  }, {
    key: "addClickEvent",
    value: function addClickEvent() {
      this.elementRef.onclick = this._menu.toggle.bind(this._menu);
    }
  }, {
    key: "addItem",
    value: function addItem(e) {
      this._menu.addItem(e);
    }
  }, {
    key: "addContainerEvents",
    value: function addContainerEvents(e) {
      var _this85 = this;
      e.addEventListener(H, function (t) {
        var n = t.target[m];
        !n.contains(Lt.BUTTON_ICON_CLASS) && !n.contains(Ft.DISABLED_CONTAINER_CLASS) && _this85._menu.close();
      });
    }
  }], [{
    key: "createButtonElement",
    value: function createButtonElement() {
      var e = S();
      return e[m].add("input-button"), e;
    }
  }, {
    key: "createButtonContainer",
    value: function createButtonContainer() {
      var e = S();
      return e.id = "dropup-container", e;
    }
  }, {
    key: "getPosition",
    value: function getPosition(e, t) {
      var n, s;
      return (n = t == null ? void 0 : t.button) != null && n.position ? (s = t == null ? void 0 : t.button) == null ? void 0 : s.position : e[Te].length > 0 && e[ue].length === 0 ? ue : Te;
    }
  }]);
}(Jt);
Lt.BUTTON_ICON_CLASS = "dropup-button";
var Ls = Lt;
var Ae = /*#__PURE__*/function () {
  function Ae() {
    _classCallCheck(this, Ae);
  }
  return _createClass(Ae, null, [{
    key: "addToDropup",
    value:
    // prettier-ignore
    function addToDropup(e, t, n, s) {
      var r = new Ls(n, s);
      xr.forEach(function (a) {
        var c = t[je].findIndex(function (d) {
            return d.buttonType === a;
          }),
          l = t[je][c];
        l && (r.addItem(l.button), t[je].splice(c, 1));
      }), t[je].forEach(function (_ref205) {
        var a = _ref205.button;
        return r.addItem(a);
      });
      var o = Ls.getPosition(t, s);
      ln.addButton(e, r.buttonContainer, o), t[o].push({});
    }
  }, {
    key: "addToSideContainer",
    value: function addToSideContainer(e, t) {
      [Xn, ut, Te, ue].forEach(function (s) {
        var r = s;
        t[r].forEach(function (o) {
          ln.addButton(e, o.button.elementRef, r);
        });
      });
    }
  }, {
    key: "setPosition",
    value: function setPosition(e, t, n) {
      var s = _objectSpread(_objectSpread({}, e[t]), {}, {
        buttonType: t
      });
      n.push(s), delete e[t];
    }
  }, {
    key: "createPositionsToButtonsObj",
    value: function createPositionsToButtonsObj() {
      return _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, je, []), Te, []), Xn, []), ut, []), ue, []);
    }
    // prettier-ignore
  }, {
    key: "generatePositionToButtons",
    value: function generatePositionToButtons(e) {
      var t = Ae.createPositionsToButtonsObj();
      Object.keys(e).forEach(function (s) {
        var o;
        var r = (o = e[s]) == null ? void 0 : o.button.position;
        r && Ae.setPosition(e, s, t[r]);
      }), t[ut].length === 0 && e.submit && Ae.setPosition(e, "submit", t[ut]), t[ue].length === 0 && (e.submit ? Ae.setPosition(e, "submit", t[ue]) : e.microphone ? Ae.setPosition(e, Xe, t[ue]) : e.camera ? Ae.setPosition(e, Re, t[ue]) : e["".concat(Ft.INDICATOR_PREFIX, "1")] && Ae.setPosition(e, "".concat(Ft.INDICATOR_PREFIX, "1"), t[ue])), e.submit && Ae.setPosition(e, "submit", t[Te].length === 0 ? t[Te] : t[ut]), e.microphone && Ae.setPosition(e, Xe, t[Te].length === 0 ? t[Te] : t[ut]);
      var n = Object.keys(e);
      return n.length > 1 || t[je].length > 0 ? (xr.forEach(function (s) {
        e[s] && t[je].push(_objectSpread(_objectSpread({}, e[s]), {}, {
          buttonType: s
        }));
      }), n.forEach(function (s) {
        var r = s;
        r.startsWith(Ft.INDICATOR_PREFIX) && e[r] && t[je].push(_objectSpread(_objectSpread({}, e[r]), {}, {
          customType: r
        }));
      })) : n.length === 1 && Ae.setPosition(e, n[0], t[ue].length === 0 ? t[ue] : t[Te]), t;
    }
    // prettier-ignore
  }, {
    key: "addButtons",
    value: function addButtons(e, t, n, s) {
      var r = Ae.generatePositionToButtons(t);
      return Ae.addToSideContainer(e, r), r[je].length > 0 && Ae.addToDropup(e, r, n, s), r;
    }
  }]);
}();
var dd = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M20 10.9696L11.9628 18.5497C10.9782 19.4783 9.64274 20 8.25028 20C6.85782 20 5.52239 19.4783 4.53777 18.5497C3.55315 17.6211 3 16.3616 3 15.0483C3 13.7351 3.55315 12.4756 4.53777 11.547L12.575 3.96687C13.2314 3.34779 14.1217 3 15.05 3C15.9783 3 16.8686 3.34779 17.525 3.96687C18.1814 4.58595 18.5502 5.4256 18.5502 6.30111C18.5502 7.17662 18.1814 8.01628 17.525 8.63535L9.47904 16.2154C9.15083 16.525 8.70569 16.6989 8.24154 16.6989C7.77738 16.6989 7.33224 16.525 7.00403 16.2154C6.67583 15.9059 6.49144 15.4861 6.49144 15.0483C6.49144 14.6106 6.67583 14.1907 7.00403 13.8812L14.429 6.88674\" stroke=\"#000000\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n</svg>",
  hd = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<svg viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\">\n  <path d=\"M20,15.2928932 L20,5.5 C20,4.67157288 19.3284271,4 18.5,4 L5.5,4 C4.67157288,4 4,4.67157288 4,5.5 L4,12.2928932 L7.14644661,9.14644661 C7.34170876,8.95118446 7.65829124,8.95118446 7.85355339,9.14644661 L13.5,14.7928932 L16.1464466,12.1464466 C16.3417088,11.9511845 16.6582912,11.9511845 16.8535534,12.1464466 L20,15.2928932 Z M20,16.7071068 L16.5,13.2071068 L13.8535534,15.8535534 C13.6582912,16.0488155 13.3417088,16.0488155 13.1464466,15.8535534 L7.5,10.2071068 L4,13.7071068 L4,18.5 C4,19.3284271 4.67157288,20 5.5,20 L18.5,20 C19.3284271,20 20,19.3284271 20,18.5 L20,16.7071068 Z M3,5.5 C3,4.11928813 4.11928813,3 5.5,3 L18.5,3 C19.8807119,3 21,4.11928813 21,5.5 L21,18.5 C21,19.8807119 19.8807119,21 18.5,21 L5.5,21 C4.11928813,21 3,19.8807119 3,18.5 L3,5.5 Z M15,6 L17,6 C17.5522847,6 18,6.44771525 18,7 L18,9 C18,9.55228475 17.5522847,10 17,10 L15,10 C14.4477153,10 14,9.55228475 14,9 L14,7 C14,6.44771525 14.4477153,6 15,6 Z M15,7 L15,9 L17,9 L17,7 L15,7 Z\"/>\n</svg>\n",
  ud = "<svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"-49.49 -49.49 593.87 593.87\" stroke-width=\"3.95908\" transform=\"rotate(0)\">\n  <g stroke-width=\"0\"></g>\n  <g stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"0.98977\"></g>\n  <g>\n    <g>\n      <g>\n        <path d=\"M163.205,76.413v293.301c-3.434-3.058-7.241-5.867-11.486-8.339c-21.38-12.452-49.663-15.298-77.567-7.846 c-49.038,13.096-80.904,54.519-71.038,92.337c4.019,15.404,14.188,28.221,29.404,37.087c13.553,7.894,29.87,11.933,47.115,11.933 c9.962,0,20.231-1.356,30.447-4.087c42.74-11.406,72.411-44.344,72.807-77.654h0.011v-0.162c0.002-0.166,0-0.331,0-0.496V187.072 l290.971-67.3v178.082c-3.433-3.055-7.238-5.863-11.481-8.334c-21.385-12.452-49.654-15.308-77.567-7.846 c-49.038,13.087-80.904,54.519-71.038,92.356c4.019,15.385,14.183,28.212,29.404,37.067c13.548,7.894,29.875,11.933,47.115,11.933 c9.962,0,20.231-1.356,30.452-4.087c42.74-11.413,72.411-44.346,72.804-77.654h0.004v-0.065c0.003-0.236,0.001-0.469,0-0.704V0 L163.205,76.413z M104.999,471.779c-22.543,6.038-45.942,3.846-62.572-5.846c-10.587-6.163-17.591-14.817-20.255-25.038 c-7.144-27.375,18.452-58.029,57.062-68.346c8.409-2.25,16.938-3.346,25.188-3.346c13.87,0,26.962,3.115,37.389,9.192 c10.587,6.163,17.591,14.817,20.255,25.029c0.809,3.102,1.142,6.248,1.139,9.4v0.321h0.014 C162.99,437.714,139.082,462.678,104.999,471.779z M182.898,166.853V92.067l290.971-67.298v74.784L182.898,166.853z M415.677,399.923c-22.558,6.038-45.942,3.837-62.587-5.846c-10.587-6.163-17.587-14.817-20.25-25.019 c-7.144-27.385,18.452-58.058,57.058-68.365c8.414-2.25,16.942-3.346,25.192-3.346c13.875,0,26.962,3.115,37.385,9.192 c10.596,6.163,17.596,14.817,20.26,25.029v0.01c0.796,3.05,1.124,6.144,1.135,9.244v0.468h0.02 C473.668,365.851,449.763,390.814,415.677,399.923z\">\n        </path>\n      </g>\n    </g>\n  </g>\n</svg>",
  pd = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\n<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" viewBox=\"0 0 5.9266752 5.6408391\" height=\"21.31971\" width=\"22.4\">\n  <g>\n    <path d=\"m 5.2564627,1.548212 c -3.1136005,-0.4796804 -1.5568006,-0.2398402 0,0 z M 2.0001198,2.0922063 c 0.1556781,0 0.2657489,0.020893 0.3917849,0.080366 0.081154,0.038347 0.1153492,0.134065 0.076377,0.2138602 -0.038973,0.07979 -0.1363527,0.1134129 -0.2175069,0.075091 -0.078199,-0.036919 -0.1407455,-0.048792 -0.250655,-0.048792 -0.2260486,0 -0.3921482,0.2042182 -0.3921482,0.4801409 0,0.2761822 0.1663188,0.4810688 0.3921482,0.4810688 0.1117901,0 0.2064255,-0.046133 0.255659,-0.1284198 l 0.00162,-0.00389 V 3.0534032 l -0.098011,1.75e-4 c -0.081844,0 -0.1495979,-0.059305 -0.1612403,-0.1365887 l -0.00175,-0.023683 c 0,-0.08047 0.060311,-0.1470874 0.1389194,-0.1585331 l 0.024085,-0.00195 h 0.2612303 c 0.081842,0 0.149598,0.059305 0.1612404,0.1365891 l 0.00175,0.023683 -3.398e-4,0.3968809 v 0 l -0.00168,0.014211 v 0 l -0.00553,0.023034 v 0 l -0.00532,0.014145 c -0.098178,0.22826 -0.3236506,0.3528713 -0.5706303,0.3528713 -0.4240855,0 -0.7181621,-0.3622714 -0.7181621,-0.8016063 0,-0.4391857 0.2940275,-0.8006848 0.7181621,-0.8006848 z m 1.2034759,0.031275 c 0.081843,0 0.1495977,0.059305 0.1612403,0.1365891 l 0.00175,0.023683 v 1.2211775 c 0,0.088516 -0.07298,0.1602721 -0.1630073,0.1602721 -0.081841,0 -0.1495972,-0.059305 -0.1612397,-0.1365892 L 3.040589,3.5049308 V 2.2837527 c 0,-0.088516 0.07298,-0.1602721 0.1630067,-0.1602714 z m 0.7813442,0 0.5209469,0.00195 c 0.090025,3.048e-4 0.1627543,0.072306 0.1624458,0.1608234 -2.809e-4,0.08047 -0.06083,0.1468798 -0.1394772,0.158066 l -0.024092,0.00195 -0.3575326,-0.0013 v 0.4497782 l 0.2928918,2.27e-4 c 0.081842,0 0.1495979,0.059305 0.1612403,0.136589 l 0.00175,0.023683 c 0,0.080469 -0.06031,0.1470871 -0.1389193,0.1585393 l -0.024092,0.00195 -0.2928919,-2.336e-4 1.563e-4,0.2860316 c 0,0.080471 -0.06031,0.1470873 -0.1389193,0.1585395 l -0.024085,0.00195 c -0.081843,0 -0.1495979,-0.059305 -0.1612403,-0.1365826 l -0.00175,-0.023691 V 2.2841354 c 2.798e-4,-0.08047 0.060829,-0.1468797 0.1394758,-0.1580594 z\"/>\n    <path d=\"m 5.0894191,1.0943261 c 0,-0.21918999 -0.177687,-0.39686999 -0.396876,-0.39686999 h -3.43959 c -0.2191879,0 -0.391262,0.1777519 -0.3968759,0.39686999 l -0.027082,3.4379266 c 0.040152,0.2939927 0.4235456,0.409415 0.4235456,0.409415 l 3.4785583,-0.00851 c 0,0 0.3008506,-0.1402998 0.3236271,-0.4201576 0.042911,-0.5272495 0.034693,-1.6106146 0.034693,-3.4186761 z m -4.49792494,0 c 0,-0.36530999 0.29614504,-0.66145999 0.66145894,-0.66145999 h 3.43959 c 0.365314,0 0.66146,0.29615 0.66146,0.66145999 v 3.43959 c 0,0.36532 -0.296146,0.66146 -0.66146,0.66146 h -3.43959 c -0.3653139,0 -0.66145894,-0.29614 -0.66145894,-0.66146 z\"/>\n  </g>\n</svg>\n",
  fd = _defineProperty(_defineProperty(_defineProperty(_defineProperty({}, z, {
    id: "upload-images-icon",
    svgString: hd,
    dropupText: "Image"
  }), sn, {
    id: "upload-gifs-icon",
    svgString: pd,
    dropupText: "GIF"
  }), P, {
    id: "upload-audio-icon",
    svgString: ud,
    dropupText: "Audio"
  }), "mixedFiles", {
    id: "upload-mixed-files-icon",
    svgString: dd,
    dropupText: "File"
  });
var Js = /*#__PURE__*/function (_Jt4) {
  function Js(e) {
    var _this86;
    _classCallCheck(this, Js);
    (e == null ? void 0 : e.position) === je && (e.position = ue);
    var t = Qe.tryCreateConfig("Microphone", e == null ? void 0 : e.tooltip);
    _this86 = _callSuper(this, Js, [Js.createMicrophoneElement(), mo, e == null ? void 0 : e.position, t, e]), _this86.isActive = !1, _this86._innerElements = _this86.createInnerElementsForStates(_this86.customStyles), _this86.changeToDefault();
    return _this86;
  }
  _inherits(Js, _Jt4);
  return _createClass(Js, [{
    key: "createInnerElementsForStates",
    value: function createInnerElementsForStates(e) {
      var t = "microphone-icon";
      return _defineProperty(_defineProperty(_defineProperty(_defineProperty({}, x, this.createInnerElements(t, x, e)), "active", this.createInnerElements(t, "active", e)), "unsupported", this.createInnerElements(t, "unsupported", e)), "commandMode", this.createInnerElements(t, "commandMode", e));
    }
  }, {
    key: "changeToActive",
    value: function changeToActive() {
      this.changeElementsByState(this._innerElements.active), this.toggleIconFilter("active"), this.reapplyStateStyle("active", [x, "commandMode"]), this.isActive = !0;
    }
  }, {
    key: "changeToDefault",
    value: function changeToDefault() {
      this.changeElementsByState(this._innerElements[x]), this.toggleIconFilter(x), this.reapplyStateStyle(x, ["active", "commandMode"]), this.isActive = !1;
    }
  }, {
    key: "changeToCommandMode",
    value: function changeToCommandMode() {
      this.changeElementsByState(this._innerElements.commandMode), this.toggleIconFilter("command"), this.reapplyStateStyle("commandMode", ["active"]);
    }
  }, {
    key: "changeToUnsupported",
    value: function changeToUnsupported() {
      this.changeElementsByState(this._innerElements.unsupported), this.elementRef[m].add("unsupported-microphone"), this.reapplyStateStyle("unsupported", ["active"]);
    }
  }, {
    key: "toggleIconFilter",
    value: function toggleIconFilter(e) {
      var t = this.elementRef.children[0];
      if (t.tagName.toLocaleLowerCase() === "svg") switch (e) {
        case x:
          t[m].remove("active-microphone-icon", "command-microphone-icon"), t[m].add("default-microphone-icon");
          break;
        case "active":
          t[m].remove("default-microphone-icon", "command-microphone-icon"), t[m].add("active-microphone-icon");
          break;
        case "command":
          t[m].remove("active-microphone-icon", "default-microphone-icon"), t[m].add("command-microphone-icon");
          break;
      }
    }
  }], [{
    key: "createMicrophoneElement",
    value: function createMicrophoneElement() {
      var e = S();
      return e.id = "microphone-button", e[m].add("input-button"), e;
    }
  }]);
}(Jt);
function md(i) {
  return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default") ? i["default"] : i;
}
var ms = {},
  gn = {},
  yn = {},
  bn = {},
  vn = {},
  Ar;
function Ks() {
  if (Ar) return vn;
  Ar = 1, Object.defineProperty(vn, "__esModule", {
    value: !0
  }), vn.Text = void 0;
  var i = /*#__PURE__*/function () {
    function i() {
      _classCallCheck(this, i);
    }
    return _createClass(i, null, [{
      key: "capitalize",
      value: function capitalize(t) {
        return t.replace(i.FIRST_CHAR_REGEX, function (n) {
          return n.toUpperCase();
        });
      }
    }, {
      key: "lineBreak",
      value: function lineBreak(t) {
        return t.replace(i.DOUBLE_LINE, "<p></p>").replace(i.ONE_LINE, "<br>");
      }
    }, {
      key: "isCharDefined",
      value: function isCharDefined(t) {
        return t !== void 0 && t !== " " && t !== " " && t !== "\n" && t !== "";
      }
    }, {
      key: "breakupIntoWordsArr",
      value: function breakupIntoWordsArr(t) {
        return t.split(/(\W+)/);
      }
    }]);
  }();
  return vn.Text = i, i.FIRST_CHAR_REGEX = /\S/, i.DOUBLE_LINE = /\n\n/g, i.ONE_LINE = /\n/g, vn;
}
var wr;
function xo() {
  if (wr) return bn;
  wr = 1, Object.defineProperty(bn, "__esModule", {
    value: !0
  }), bn.Translate = void 0;
  var i = Ks();
  var e = /*#__PURE__*/function () {
    function e() {
      _classCallCheck(this, e);
    }
    return _createClass(e, null, [{
      key: "translate",
      value: function translate(n, s) {
        var r = i.Text.breakupIntoWordsArr(n);
        for (var o = 0; o < r.length; o += 1) s[r[o]] && (r[o] = s[r[o]]);
        return r.join("");
      }
    }]);
  }();
  return bn.Translate = e, bn;
}
var Cr;
function gd() {
  if (Cr) return yn;
  Cr = 1, Object.defineProperty(yn, "__esModule", {
    value: !0
  }), yn.WebSpeechTranscript = void 0;
  var i = xo();
  var e = /*#__PURE__*/function () {
    function e() {
      _classCallCheck(this, e);
    }
    return _createClass(e, null, [{
      key: "extract",
      value: function extract(n, s, r) {
        var o = "";
        for (var a = n.resultIndex; a < n.results.length; ++a) {
          var c = n.results[a][0].transcript;
          r && (c = i.Translate.translate(c, r)), n.results[a].isFinal ? s += c : o += c;
        }
        return {
          interimTranscript: o,
          finalTranscript: s,
          newText: o || s
        };
      }
    }, {
      key: "extractSafari",
      value: function extractSafari(n, s, r) {
        var o = "";
        for (var c = n.resultIndex; c < n.results.length; ++c) {
          var l = n.results[c][0].transcript;
          r && (l = i.Translate.translate(l, r)), o += l;
        }
        return {
          interimTranscript: "",
          finalTranscript: o,
          newText: o
        };
      }
    }]);
  }();
  return yn.WebSpeechTranscript = e, yn;
}
var _n = {},
  Tr;
function Ji() {
  if (Tr) return _n;
  Tr = 1, Object.defineProperty(_n, "__esModule", {
    value: !0
  }), _n.Browser = void 0;
  var i = /*#__PURE__*/_createClass(function i() {
    _classCallCheck(this, i);
  });
  return _n.Browser = i, i.IS_SAFARI = function () {
    return i._IS_SAFARI === void 0 && (i._IS_SAFARI = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)), i._IS_SAFARI;
  }, _n;
}
var En = {},
  Sn = {},
  Rr;
function yd() {
  if (Rr) return Sn;
  Rr = 1, Object.defineProperty(Sn, "__esModule", {
    value: !0
  }), Sn.EventListeners = void 0;
  var i = /*#__PURE__*/function () {
    function i() {
      _classCallCheck(this, i);
    }
    return _createClass(i, null, [{
      key: "getElementIfFocusedOnAvailable",
      value: function getElementIfFocusedOnAvailable(t, n) {
        return Array.isArray(t) ? t.find(function (s) {
          return n === s;
        }) : n === t ? t : void 0;
      }
    }, {
      key: "keyDownWindow",
      value: function keyDownWindow(t) {
        var _this87 = this;
        t.element && i.getElementIfFocusedOnAvailable(t.element, document.activeElement) && (i.KEY_DOWN_TIMEOUT !== null && clearTimeout(i.KEY_DOWN_TIMEOUT), i.KEY_DOWN_TIMEOUT = setTimeout(function () {
          i.KEY_DOWN_TIMEOUT = null, _this87.resetRecording(t);
        }, 500));
      }
    }, {
      key: "mouseDownWindow",
      value: function mouseDownWindow(t, n) {
        this.mouseDownElement = i.getElementIfFocusedOnAvailable(t, n.target);
      }
    }, {
      key: "mouseUpWindow",
      value: function mouseUpWindow(t) {
        this.mouseDownElement && this.resetRecording(t), this.mouseDownElement = void 0;
      }
    }, {
      key: "add",
      value: function add(t, n) {
        var s = (n == null ? void 0 : n.insertInCursorLocation) === void 0 || (n == null ? void 0 : n.insertInCursorLocation);
        n != null && n.element && s && (t.mouseDownEvent = i.mouseDownWindow.bind(t, n.element), document.addEventListener("mousedown", t.mouseDownEvent), t.mouseUpEvent = i.mouseUpWindow.bind(t, n), document.addEventListener("mouseup", t.mouseUpEvent), t.keyDownEvent = i.keyDownWindow.bind(t, n), document.addEventListener("keydown", t.keyDownEvent));
      }
    }, {
      key: "remove",
      value: function remove(t) {
        document.removeEventListener("mousedown", t.mouseDownEvent), document.removeEventListener("mouseup", t.mouseUpEvent), document.removeEventListener("keydown", t.keyDownEvent);
      }
    }]);
  }();
  return Sn.EventListeners = i, i.KEY_DOWN_TIMEOUT = null, Sn;
}
var xn = {},
  Ir;
function bd() {
  if (Ir) return xn;
  Ir = 1, Object.defineProperty(xn, "__esModule", {
    value: !0
  }), xn.PreResultUtils = void 0;
  var i = /*#__PURE__*/function () {
    function i() {
      _classCallCheck(this, i);
    }
    return _createClass(i, null, [{
      key: "process",
      value: function process(t, n, s, r, o) {
        var a = r == null ? void 0 : r(n, s);
        return a ? (setTimeout(function () {
          a.restart ? t.resetRecording(o) : a.stop && t.stop();
        }), (a.stop || a.restart) && a.removeNewText) : !1;
      }
    }]);
  }();
  return xn.PreResultUtils = i, xn;
}
var An = {},
  wn = {},
  Mr;
function Ao() {
  if (Mr) return wn;
  Mr = 1, Object.defineProperty(wn, "__esModule", {
    value: !0
  }), wn.AutoScroll = void 0;
  var i = /*#__PURE__*/function () {
    function i() {
      _classCallCheck(this, i);
    }
    return _createClass(i, null, [{
      key: "changeStateIfNeeded",
      value: function changeStateIfNeeded(t, n) {
        n && !t.isCursorAtEnd && (t.endPadding = "", t.scrollingSpan.innerHTML = "&nbsp;");
      }
    }, {
      key: "scrollGeneric",
      value: function scrollGeneric(t, n) {
        t.isCursorAtEnd ? n.scrollTop = n.scrollHeight : t.scrollingSpan.scrollIntoView({
          block: "nearest"
        });
      }
      // primitives don't need to be scrolled except in safari
      // they can only safely be scrolled to the end
    }, {
      key: "scrollSafariPrimitiveToEnd",
      value: function scrollSafariPrimitiveToEnd(t) {
        t.scrollLeft = t.scrollWidth, t.scrollTop = t.scrollHeight;
      }
    }, {
      key: "isElementOverflown",
      value: function isElementOverflown(t) {
        return t.scrollHeight > t.clientHeight || t.scrollWidth > t.clientWidth;
      }
    }, {
      key: "isRequired",
      value: function isRequired(t, n) {
        return t && i.isElementOverflown(n);
      }
    }]);
  }();
  return wn.AutoScroll = i, wn;
}
var Cn = {},
  kr;
function Ws() {
  if (kr) return Cn;
  kr = 1, Object.defineProperty(Cn, "__esModule", {
    value: !0
  }), Cn.Elements = void 0;
  var i = /*#__PURE__*/function () {
    function i() {
      _classCallCheck(this, i);
    }
    return _createClass(i, null, [{
      key: "isPrimitiveElement",
      value: function isPrimitiveElement(t) {
        return t.tagName === "INPUT" || t.tagName === "TEXTAREA";
      }
    }, {
      key: "createInterimSpan",
      value: function createInterimSpan() {
        var t = document.createElement("span");
        return t.style.color = "grey", t.style.pointerEvents = "none", t;
      }
    }, {
      key: "createGenericSpan",
      value: function createGenericSpan() {
        var t = document.createElement("span");
        return t.style.pointerEvents = "none", t;
      }
    }, {
      key: "appendSpans",
      value: function appendSpans(t, n) {
        if (t.spansPopulated = !0, t.insertInCursorLocation && document.activeElement === n) {
          var s = window.getSelection();
          if (s != null && s.focusNode) {
            var r = s.getRangeAt(0);
            r.insertNode(t.scrollingSpan), r.insertNode(t.interimSpan), r.insertNode(t.finalSpan), r.collapse(!1), s.removeAllRanges(), s.addRange(r);
            return;
          }
        }
        n.appendChild(t.finalSpan), n.appendChild(t.interimSpan), n.appendChild(t.scrollingSpan);
      }
    }, {
      key: "applyCustomColors",
      value: function applyCustomColors(t, n) {
        n.interim && (t.interimSpan.style.color = n.interim), n["final"] && (t.finalSpan.style.color = n["final"]);
      }
    }, {
      key: "isInsideShadowDOM",
      value: function isInsideShadowDOM(t) {
        return t.getRootNode() instanceof ShadowRoot;
      }
    }]);
  }();
  return Cn.Elements = i, Cn;
}
var Tn = {},
  Or;
function Xs() {
  if (Or) return Tn;
  Or = 1, Object.defineProperty(Tn, "__esModule", {
    value: !0
  }), Tn.Cursor = void 0;
  var i = /*#__PURE__*/function () {
    function i() {
      _classCallCheck(this, i);
    }
    return _createClass(i, null, [{
      key: "setOffsetForGeneric",
      value: function setOffsetForGeneric(t, n) {
        var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        var r = 0;
        for (var o = 0; o < t.childNodes.length; o += 1) {
          var a = t.childNodes[o];
          if (a.childNodes.length > 0) {
            var c = i.setOffsetForGeneric(a, n, s);
            if (c === -1) return -1;
            s += c;
          } else if (a.textContent !== null) {
            if (s + a.textContent.length > n) {
              var _c5 = document.createRange();
              _c5.setStart(a, n - s), _c5.collapse(!0);
              var l = window.getSelection();
              return l == null || l.removeAllRanges(), l == null || l.addRange(_c5), t.focus(), -1;
            }
            s += a.textContent.length, r += a.textContent.length;
          }
        }
        return r;
      }
    }, {
      key: "focusEndOfGeneric",
      value: function focusEndOfGeneric(t) {
        var n = document.createRange();
        n.selectNodeContents(t), n.collapse(!1);
        var s = window.getSelection();
        s && (s.removeAllRanges(), s.addRange(n));
      }
    }, {
      key: "setOffsetForSafariGeneric",
      value: function setOffsetForSafariGeneric(t, n) {
        var s = window.getSelection();
        if (s) {
          var r = i.getGenericElementCursorOffset(t, s, !0);
          i.setOffsetForGeneric(t, r + n);
        }
      }
      // set to automatically scroll to cursor (scroll does not work in Safari)
    }, {
      key: "setOffsetForPrimitive",
      value: function setOffsetForPrimitive(t, n, s) {
        s && t.blur(), t.setSelectionRange(n, n), t.focus();
      }
      // Scroll Input in Safari - does not work for TextArea and uses span which can have a different style
      // private static getCursorOffsetFromLeft(inputElement: HTMLInputElement, position: number) {
      //   // Get the value of the input element up to the cursor position
      //   const valueUpToCursor = inputElement.value.substring(0, position);
      //   // Create a temporary span element to measure the width of the text
      //   const tempSpan = document.createElement('span');
      //   tempSpan.textContent = valueUpToCursor;
      //   tempSpan.style.visibility = 'hidden';
      //   tempSpan.style.position = 'absolute';
      //   document.body.appendChild(tempSpan);
      //   // Measure the width of the text up to the cursor position
      //   const offsetWidth = tempSpan.offsetWidth;
      //   const offsetHeight = tempSpan.offsetHeight;
      //   // Clean up the temporary span element
      //   document.body.removeChild(tempSpan);
      //   return {left: offsetWidth, top: offsetHeight};
      // }
    }, {
      key: "getGenericElementCursorOffset",
      value: function getGenericElementCursorOffset(t, n, s) {
        var r = 0;
        if (n.rangeCount > 0) {
          var o = n.getRangeAt(0),
            a = o.cloneRange();
          a.selectNodeContents(t), s ? a.setEnd(o.startContainer, o.startOffset) : a.setEnd(o.endContainer, o.endOffset), r = a.toString().length;
        }
        return r;
      }
    }]);
  }();
  return Tn.Cursor = i, Tn;
}
var Nr;
function wo() {
  if (Nr) return An;
  Nr = 1, Object.defineProperty(An, "__esModule", {
    value: !0
  }), An.CommandUtils = void 0;
  var i = Ao(),
    e = Ws(),
    t = Ji(),
    n = Xs(),
    s = Ks();
  var r = /*#__PURE__*/function () {
    function r() {
      _classCallCheck(this, r);
    }
    return _createClass(r, null, [{
      key: "processCommand",
      value: function processCommand(a, c) {
        return (!c || !c.caseSensitive) && (a = a.toLowerCase()), (c == null ? void 0 : c.substrings) === !1 ? s.Text.breakupIntoWordsArr(a) : a;
      }
    }, {
      key: "process",
      value: function process(a) {
        var c;
        return ((c = a.settings) === null || c === void 0 ? void 0 : c.caseSensitive) === !0 ? a : Object.keys(a).reduce(function (d, p) {
          var u = a[p];
          return d[p] = typeof u == "string" ? r.processCommand(u, a.settings) : u, d;
        }, {});
      }
    }, {
      key: "toggleCommandModeOn",
      value: function toggleCommandModeOn(a) {
        var c;
        a.isWaitingForCommand = !0, (c = a.onCommandModeTrigger) === null || c === void 0 || c.call(a, !0);
      }
    }, {
      key: "toggleCommandModeOff",
      value: function toggleCommandModeOff(a) {
        var c;
        a.isWaitingForCommand && ((c = a.onCommandModeTrigger) === null || c === void 0 || c.call(a, !1), a.isWaitingForCommand = !1);
      }
    }, {
      key: "setText",
      value: function setText(a, c, l, d) {
        r.toggleCommandModeOff(a), e.Elements.isPrimitiveElement(d) ? (d.value = l, a.isTargetInShadow || n.Cursor.setOffsetForPrimitive(d, l.length, !0), t.Browser.IS_SAFARI() && a.autoScroll && i.AutoScroll.scrollSafariPrimitiveToEnd(d)) : (d.textContent = l, a.isTargetInShadow || n.Cursor.focusEndOfGeneric(d), setTimeout(function () {
          return i.AutoScroll.scrollGeneric(a, d);
        })), a.resetRecording(c);
      }
    }, {
      key: "checkIfMatchesSubstring",
      value: function checkIfMatchesSubstring(a, c) {
        return c.includes(a);
      }
    }, {
      key: "checkIfMatchesWord",
      value: function checkIfMatchesWord(a, c, l) {
        var d = a;
        for (var p = l.length - 1; p >= 0; p -= 1) {
          var u = p,
            g = d.length - 1;
          for (; l[u] === d[g] && g >= 0;) u -= 1, g -= 1;
          if (g < 0) return !0;
        }
        return !1;
      }
      // prettier-ignore
    }, {
      key: "execCommand",
      value: function execCommand(a, c, l, d, p) {
        var u, g, v;
        var b = a.commands;
        if (!b || !d || !l) return;
        var E = ((u = b.settings) === null || u === void 0 ? void 0 : u.caseSensitive) === !0 ? c : c.toLowerCase(),
          w = s.Text.breakupIntoWordsArr(E),
          F = ((g = b.settings) === null || g === void 0 ? void 0 : g.substrings) === !1 ? r.checkIfMatchesWord : r.checkIfMatchesSubstring;
        if (b.commandMode && F(b.commandMode, E, w)) return a.setInterimColorToFinal(), setTimeout(function () {
          return r.toggleCommandModeOn(a);
        }), {
          doNotProcessTranscription: !1
        };
        if (!(b.commandMode && !a.isWaitingForCommand)) {
          if (b.stop && F(b.stop, E, w)) return r.toggleCommandModeOff(a), setTimeout(function () {
            return a.stop();
          }), {
            doNotProcessTranscription: !1
          };
          if (b.pause && F(b.pause, E, w)) return r.toggleCommandModeOff(a), a.setInterimColorToFinal(), setTimeout(function () {
            var J;
            a.isPaused = !0, (J = a.onPauseTrigger) === null || J === void 0 || J.call(a, !0);
          }), {
            doNotProcessTranscription: !1
          };
          if (b.resume && F(b.resume, E, w)) return a.isPaused = !1, (v = a.onPauseTrigger) === null || v === void 0 || v.call(a, !1), r.toggleCommandModeOff(a), a.resetRecording(l), {
            doNotProcessTranscription: !0
          };
          if (b.reset && F(b.reset, E, w)) return p !== void 0 && r.setText(a, l, p, d), {
            doNotProcessTranscription: !0
          };
          if (b.removeAllText && F(b.removeAllText, E, w)) return r.setText(a, l, "", d), {
            doNotProcessTranscription: !0
          };
        }
      }
    }]);
  }();
  return An.CommandUtils = r, An;
}
var Rn = {},
  Pr;
function vd() {
  if (Pr) return Rn;
  Pr = 1, Object.defineProperty(Rn, "__esModule", {
    value: !0
  }), Rn.Highlight = void 0;
  var i = Ws(),
    e = Xs();
  var t = /*#__PURE__*/function () {
    function t() {
      _classCallCheck(this, t);
    }
    return _createClass(t, null, [{
      key: "setStateForPrimitive",
      value: function setStateForPrimitive(s, r) {
        var o, a;
        r.selectionStart !== null && (o = r.selectionStart), r.selectionEnd !== null && (a = r.selectionEnd), s.isHighlighted = o !== a;
      }
    }, {
      key: "setStateForGeneric",
      value: function setStateForGeneric(s, r) {
        var o = window.getSelection();
        if (o != null && o.focusNode) {
          var a = e.Cursor.getGenericElementCursorOffset(r, o, !0),
            c = e.Cursor.getGenericElementCursorOffset(r, o, !1);
          s.isHighlighted = a !== c;
        }
      }
    }, {
      key: "setState",
      value: function setState(s, r) {
        document.activeElement === r && (i.Elements.isPrimitiveElement(r) ? t.setStateForPrimitive(s, r) : t.setStateForGeneric(s, r));
      }
    }, {
      key: "removeForGeneric",
      value: function removeForGeneric(s, r) {
        var o = window.getSelection();
        if (o) {
          var a = e.Cursor.getGenericElementCursorOffset(r, o, !0);
          o.deleteFromDocument(), e.Cursor.setOffsetForGeneric(r, a), s.isHighlighted = !1;
        }
      }
    }, {
      key: "removeForPrimitive",
      value: function removeForPrimitive(s, r) {
        var o = r.selectionStart,
          a = r.selectionEnd,
          c = r.value;
        if (o && a) {
          var l = c.substring(0, o) + c.substring(a);
          r.value = l, e.Cursor.setOffsetForPrimitive(r, o, s.autoScroll);
        }
        s.isHighlighted = !1;
      }
    }]);
  }();
  return Rn.Highlight = t, Rn;
}
var In = {},
  Lr;
function _d() {
  if (Lr) return In;
  Lr = 1, Object.defineProperty(In, "__esModule", {
    value: !0
  }), In.Padding = void 0;
  var i = Ws(),
    e = Xs(),
    t = Ks();
  var n = /*#__PURE__*/function () {
    function n() {
      _classCallCheck(this, n);
    }
    return _createClass(n, null, [{
      key: "setStateForPrimitiveElement",
      value: function setStateForPrimitiveElement(r, o) {
        if (document.activeElement === o && o.selectionStart !== null) {
          var c = o.selectionStart,
            l = o.value[c - 1],
            d = o.selectionEnd === null ? c : o.selectionEnd,
            p = o.value[d];
          t.Text.isCharDefined(l) && (r.startPadding = " ", r.numberOfSpacesBeforeNewText = 1), t.Text.isCharDefined(p) && (r.endPadding = " ", r.numberOfSpacesAfterNewText = 1), r.isCursorAtEnd = o.value.length === d;
          return;
        }
        var a = o.value[o.value.length - 1];
        t.Text.isCharDefined(a) && (r.startPadding = " ", r.numberOfSpacesBeforeNewText = 1), r.isCursorAtEnd = !0;
      }
    }, {
      key: "setStateForGenericElement",
      value: function setStateForGenericElement(r, o) {
        var a, c, l;
        if (document.activeElement === o) {
          var p = window.getSelection();
          if (p != null && p.focusNode) {
            var u = e.Cursor.getGenericElementCursorOffset(o, p, !0),
              g = (a = o.textContent) === null || a === void 0 ? void 0 : a[u - 1],
              v = e.Cursor.getGenericElementCursorOffset(o, p, !1),
              b = (c = o.textContent) === null || c === void 0 ? void 0 : c[v];
            t.Text.isCharDefined(g) && (r.startPadding = " "), t.Text.isCharDefined(b) && (r.endPadding = " "), r.isCursorAtEnd = ((l = o.textContent) === null || l === void 0 ? void 0 : l.length) === v;
            return;
          }
        }
        var d = o.innerText.charAt(o.innerText.length - 1);
        t.Text.isCharDefined(d) && (r.startPadding = " "), r.isCursorAtEnd = !0;
      }
    }, {
      key: "setState",
      value: function setState(r, o) {
        i.Elements.isPrimitiveElement(o) ? n.setStateForPrimitiveElement(r, o) : n.setStateForGenericElement(r, o);
      }
    }, {
      key: "adjustStateAfterRecodingPrimitiveElement",
      value: function adjustStateAfterRecodingPrimitiveElement(r, o) {
        if (r.primitiveTextRecorded = !0, r.insertInCursorLocation && document.activeElement === o && (o.selectionEnd !== null && (r.endPadding = r.endPadding + o.value.slice(o.selectionEnd)), o.selectionStart !== null)) {
          r.startPadding = o.value.slice(0, o.selectionStart) + r.startPadding;
          return;
        }
        r.startPadding = o.value + r.startPadding;
      }
    }, {
      key: "adjustSateForNoTextPrimitiveElement",
      value: function adjustSateForNoTextPrimitiveElement(r) {
        r.numberOfSpacesBeforeNewText === 1 && (r.startPadding = r.startPadding.substring(0, r.startPadding.length - 1), r.numberOfSpacesBeforeNewText = 0), r.numberOfSpacesAfterNewText === 1 && (r.endPadding = r.endPadding.substring(1), r.numberOfSpacesAfterNewText = 0);
      }
    }]);
  }();
  return In.Padding = n, In;
}
var Br;
function Co() {
  if (Br) return En;
  Br = 1, Object.defineProperty(En, "__esModule", {
    value: !0
  }), En.Speech = void 0;
  var i = yd(),
    e = bd(),
    t = wo(),
    n = Ao(),
    s = vd(),
    r = Ws(),
    o = _d(),
    a = Ji(),
    c = Xs(),
    l = Ks();
  var d = /*#__PURE__*/function () {
    function d() {
      _classCallCheck(this, d);
      this.finalTranscript = "", this.interimSpan = r.Elements.createInterimSpan(), this.finalSpan = r.Elements.createGenericSpan(), this.scrollingSpan = r.Elements.createGenericSpan(), this.isCursorAtEnd = !1, this.spansPopulated = !1, this.startPadding = "", this.endPadding = "", this.numberOfSpacesBeforeNewText = 0, this.numberOfSpacesAfterNewText = 0, this.isHighlighted = !1, this.primitiveTextRecorded = !1, this.recognizing = !1, this._displayInterimResults = !0, this.insertInCursorLocation = !0, this.autoScroll = !0, this.isRestarting = !1, this.isPaused = !1, this.isWaitingForCommand = !1, this.isTargetInShadow = !1, this.cannotBeStopped = !1, this.resetState();
    }
    return _createClass(d, [{
      key: "prepareBeforeStart",
      value: function prepareBeforeStart(u) {
        var g, v;
        if (u != null && u.element) if (i.EventListeners.add(this, u), Array.isArray(u.element)) {
          var E = u.element.find(function (w) {
            return w === document.activeElement;
          }) || u.element[0];
          if (!E) return;
          this.prepare(E);
        } else this.prepare(u.element);
        (u == null ? void 0 : u.displayInterimResults) !== void 0 && (this._displayInterimResults = u.displayInterimResults), u != null && u.textColor && (this._finalTextColor = (g = u == null ? void 0 : u.textColor) === null || g === void 0 ? void 0 : g["final"], r.Elements.applyCustomColors(this, u.textColor)), (u == null ? void 0 : u.insertInCursorLocation) !== void 0 && (this.insertInCursorLocation = u.insertInCursorLocation), (u == null ? void 0 : u.autoScroll) !== void 0 && (this.autoScroll = u.autoScroll), this._onResult = u == null ? void 0 : u.onResult, this._onPreResult = u == null ? void 0 : u.onPreResult, this._onStart = u == null ? void 0 : u.onStart, this._onStop = u == null ? void 0 : u.onStop, this._onError = u == null ? void 0 : u.onError, this.onCommandModeTrigger = u == null ? void 0 : u.onCommandModeTrigger, this.onPauseTrigger = u == null ? void 0 : u.onPauseTrigger, this._options = u, !((v = this._options) === null || v === void 0) && v.commands && (this.commands = t.CommandUtils.process(this._options.commands));
      }
    }, {
      key: "prepare",
      value: function prepare(u) {
        o.Padding.setState(this, u), s.Highlight.setState(this, u), this.isTargetInShadow = r.Elements.isInsideShadowDOM(u), r.Elements.isPrimitiveElement(u) ? (this._primitiveElement = u, this._originalText = this._primitiveElement.value) : (this._genericElement = u, this._originalText = this._genericElement.textContent);
      }
      // there was an attempt to optimize this by not having to restart the service and just reset state:
      // unfortunately it did not work because the service would still continue firing the intermediate and final results
      // into the new position
    }, {
      key: "resetRecording",
      value: function resetRecording(u) {
        this.isRestarting = !0, this.stop(!0), this.resetState(!0), this.start(u, !0);
      }
      // prettier-ignore
    }, {
      key: "updateElements",
      value: function updateElements(u, g, v) {
        var b;
        var E = l.Text.capitalize(g);
        if (this.finalTranscript === E && u === "") return;
        e.PreResultUtils.process(this, v, u === "", this._onPreResult, this._options) && (u = "", v = "");
        var w = this.commands && t.CommandUtils.execCommand(this, v, this._options, this._primitiveElement || this._genericElement, this._originalText);
        if (w) {
          if (w.doNotProcessTranscription) return;
          u = "", v = "";
        }
        if (this.isPaused || this.isWaitingForCommand) return;
        (b = this._onResult) === null || b === void 0 || b.call(this, v, u === ""), this.finalTranscript = E, this._displayInterimResults || (u = "");
        var F = this.finalTranscript === "" && u === "";
        this._primitiveElement ? this.updatePrimitiveElement(this._primitiveElement, u, F) : this._genericElement && this.updateGenericElement(this._genericElement, u, F);
      }
      // prettier-ignore
      // remember that padding values here contain actual text left and right
    }, {
      key: "updatePrimitiveElement",
      value: function updatePrimitiveElement(u, g, v) {
        this.isHighlighted && s.Highlight.removeForPrimitive(this, u), this.primitiveTextRecorded || o.Padding.adjustStateAfterRecodingPrimitiveElement(this, u), v && o.Padding.adjustSateForNoTextPrimitiveElement(this);
        var b = this.startPadding + this.finalTranscript + g;
        if (u.value = b + this.endPadding, !this.isTargetInShadow) {
          var E = b.length + this.numberOfSpacesAfterNewText;
          c.Cursor.setOffsetForPrimitive(u, E, this.autoScroll);
        }
        this.autoScroll && a.Browser.IS_SAFARI() && this.isCursorAtEnd && n.AutoScroll.scrollSafariPrimitiveToEnd(u);
      }
    }, {
      key: "updateGenericElement",
      value: function updateGenericElement(u, g, v) {
        this.isHighlighted && s.Highlight.removeForGeneric(this, u), this.spansPopulated || r.Elements.appendSpans(this, u);
        var b = (v ? "" : this.startPadding) + l.Text.lineBreak(this.finalTranscript);
        this.finalSpan.innerHTML = b;
        var E = n.AutoScroll.isRequired(this.autoScroll, u);
        n.AutoScroll.changeStateIfNeeded(this, E);
        var w = l.Text.lineBreak(g) + (v ? "" : this.endPadding);
        this.interimSpan.innerHTML = w, a.Browser.IS_SAFARI() && this.insertInCursorLocation && c.Cursor.setOffsetForSafariGeneric(u, b.length + w.length), E && n.AutoScroll.scrollGeneric(this, u), v && (this.scrollingSpan.innerHTML = "");
      }
    }, {
      key: "finalise",
      value: function finalise(u) {
        this._genericElement && (u ? (this.finalSpan = r.Elements.createGenericSpan(), this.setInterimColorToFinal(), this.interimSpan = r.Elements.createInterimSpan(), this.scrollingSpan = r.Elements.createGenericSpan()) : this._genericElement.textContent = this._genericElement.textContent, this.spansPopulated = !1), i.EventListeners.remove(this);
      }
    }, {
      key: "setInterimColorToFinal",
      value: function setInterimColorToFinal() {
        this.interimSpan.style.color = this._finalTextColor || "black";
      }
    }, {
      key: "resetState",
      value: function resetState(u) {
        this._primitiveElement = void 0, this._genericElement = void 0, this.finalTranscript = "", this.finalSpan.innerHTML = "", this.interimSpan.innerHTML = "", this.scrollingSpan.innerHTML = "", this.startPadding = "", this.endPadding = "", this.isHighlighted = !1, this.primitiveTextRecorded = !1, this.numberOfSpacesBeforeNewText = 0, this.numberOfSpacesAfterNewText = 0, u || (this.stopTimeout = void 0);
      }
    }, {
      key: "setStateOnStart",
      value: function setStateOnStart() {
        var u;
        this.recognizing = !0, this.isRestarting ? this.isRestarting = !1 : (u = this._onStart) === null || u === void 0 || u.call(this);
      }
    }, {
      key: "setStateOnStop",
      value: function setStateOnStop() {
        var u;
        this.recognizing = !1, this.isRestarting || (u = this._onStop) === null || u === void 0 || u.call(this);
      }
    }, {
      key: "setStateOnError",
      value: function setStateOnError(u) {
        var g;
        (g = this._onError) === null || g === void 0 || g.call(this, u), this.recognizing = !1;
      }
    }]);
  }();
  return En.Speech = d, En;
}
var Dr;
function Ed() {
  if (Dr) return gn;
  Dr = 1, Object.defineProperty(gn, "__esModule", {
    value: !0
  }), gn.WebSpeech = void 0;
  var i = gd(),
    e = Ji(),
    t = Co();
  var n = /*#__PURE__*/function (_t$Speech) {
    function n() {
      _classCallCheck(this, n);
      return _callSuper(this, n);
    }
    _inherits(n, _t$Speech);
    return _createClass(n, [{
      key: "start",
      value: function start(r) {
        var o;
        this._extractText === void 0 && (this._extractText = e.Browser.IS_SAFARI() ? i.WebSpeechTranscript.extractSafari : i.WebSpeechTranscript.extract), this.validate() && (this.prepareBeforeStart(r), this.instantiateService(r), (o = this._service) === null || o === void 0 || o.start(), this._translations = r == null ? void 0 : r.translations);
      }
    }, {
      key: "validate",
      value: function validate() {
        return n.getAPI() ? !0 : (this.error("Speech Recognition is unsupported"), !1);
      }
    }, {
      key: "instantiateService",
      value: function instantiateService(r) {
        var o, a;
        var c = n.getAPI();
        this._service = new c(), this._service.continuous = !0, this._service.interimResults = (o = r == null ? void 0 : r.displayInterimResults) !== null && o !== void 0 ? o : !0, this._service.lang = ((a = r == null ? void 0 : r.language) === null || a === void 0 ? void 0 : a.trim()) || "en-US", this.setEvents();
      }
    }, {
      key: "setEvents",
      value: function setEvents() {
        var _this88 = this;
        this._service && (this._service.onstart = function () {
          _this88.setStateOnStart();
        }, this._service.onerror = function (r) {
          e.Browser.IS_SAFARI() && r.message === "Another request is started" || r.error === "aborted" && _this88.isRestarting || r.error !== "no-speech" && _this88.error(r.message || r.error);
        }, this._service.onaudioend = function () {
          _this88.setStateOnStop();
        }, this._service.onend = function () {
          _this88._stopping = !1;
        }, this._service.onresult = function (r) {
          if (_typeof(r.results) > "u" && _this88._service) _this88._service.onend = null, _this88._service.stop();else if (_this88._extractText && !_this88._stopping) {
            var _this88$_extractText = _this88._extractText(r, _this88.finalTranscript, _this88._translations),
              o = _this88$_extractText.interimTranscript,
              a = _this88$_extractText.finalTranscript,
              c = _this88$_extractText.newText;
            _this88.updateElements(o, a, c);
          }
        });
      }
    }, {
      key: "stop",
      value: function stop(r) {
        var o;
        this._stopping = !0, (o = this._service) === null || o === void 0 || o.stop(), this.finalise(r);
      }
    }, {
      key: "error",
      value: function error(r) {
        console.error(r), this.setStateOnError(r), this.stop();
      }
    }], [{
      key: "getAPI",
      value: function getAPI() {
        return window.webkitSpeechRecognition || window.SpeechRecognition;
      }
    }]);
  }(t.Speech);
  return gn.WebSpeech = n, gn;
}
var Mn = {},
  Fr;
function Sd() {
  if (Fr) return Mn;
  Fr = 1, Object.defineProperty(Mn, "__esModule", {
    value: !0
  }), Mn.GlobalState = void 0;
  var i = /*#__PURE__*/function () {
    function i() {
      _classCallCheck(this, i);
    }
    return _createClass(i, null, [{
      key: "doubleClickDetector",
      value: function doubleClickDetector() {
        return i.doubleClickPending ? !0 : (i.doubleClickPending = !0, setTimeout(function () {
          i.doubleClickPending = !1;
        }, 300), !1);
      }
    }]);
  }();
  return Mn.GlobalState = i, i.doubleClickPending = !1, Mn;
}
var kn = {},
  On = {},
  Ur;
function xd() {
  if (Ur) return On;
  Ur = 1, Object.defineProperty(On, "__esModule", {
    value: !0
  }), On.PreventConnectionStop = void 0;
  var i = /*#__PURE__*/function () {
    function i() {
      _classCallCheck(this, i);
    }
    return _createClass(i, null, [{
      key: "applyPrevention",
      value: function applyPrevention(t) {
        clearTimeout(t._manualConnectionStopPrevention), t.cannotBeStopped = !0, t._manualConnectionStopPrevention = setTimeout(function () {
          t.cannotBeStopped = !1;
        }, 800);
      }
    }, {
      key: "clearPrevention",
      value: function clearPrevention(t) {
        clearTimeout(t._manualConnectionStopPrevention), t.cannotBeStopped = !1;
      }
    }]);
  }();
  return On.PreventConnectionStop = i, On;
}
var Nn = {},
  Pn = {},
  Hr;
function Ad() {
  return Hr || (Hr = 1, Object.defineProperty(Pn, "__esModule", {
    value: !0
  }), Pn.README_URL = void 0, Pn.README_URL = "https://github.com/OvidijusParsiunas/speech-to-element"), Pn;
}
var jr;
function wd() {
  if (jr) return Nn;
  jr = 1, Object.defineProperty(Nn, "__esModule", {
    value: !0
  }), Nn.AzureSpeechConfig = void 0;
  var i = Ad();
  var e = /*#__PURE__*/function () {
    function e() {
      _classCallCheck(this, e);
    }
    return _createClass(e, null, [{
      key: "validateOptions",
      value: function validateOptions(n, s) {
        return s ? !s.subscriptionKey && !s.token && !s.retrieveToken ? (n("Please define a 'subscriptionKey', 'token' or 'retrieveToken' property - more info: ".concat(i.README_URL)), !1) : s.region ? !0 : (n("Please define a 'region' property - more info: ".concat(i.README_URL)), !1) : (n("Please provide subscription details - more info: ".concat(i.README_URL)), !1);
      }
    }, {
      key: "getNewSpeechConfig",
      value: function () {
        var _getNewSpeechConfig = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee169(n, s) {
          return _regenerator().w(function (_context169) {
            while (1) switch (_context169.n) {
              case 0:
                if (!s.region) {
                  _context169.n = 1;
                  break;
                }
                return _context169.a(2, s.subscriptionKey ? n.fromSubscription(s.subscriptionKey.trim(), s.region.trim()) : s.token ? n.fromAuthorizationToken(s.token.trim(), s.region.trim()) : s.retrieveToken ? s.retrieveToken().then(function (r) {
                  return s.region ? n.fromAuthorizationToken((r == null ? void 0 : r.trim()) || "", s.region.trim()) : null;
                })["catch"](function (r) {
                  return console.error(r), null;
                }) : null);
              case 1:
                return _context169.a(2);
            }
          }, _callee169);
        }));
        function getNewSpeechConfig(_x316, _x317) {
          return _getNewSpeechConfig.apply(this, arguments);
        }
        return getNewSpeechConfig;
      }()
    }, {
      key: "process",
      value: function process(n, s) {
        s.endpointId && (n.endpointId = s.endpointId.trim()), s.language && (n.speechRecognitionLanguage = s.language.trim());
      }
    }, {
      key: "get",
      value: function () {
        var _get = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee170(n, s) {
          var r;
          return _regenerator().w(function (_context170) {
            while (1) switch (_context170.n) {
              case 0:
                _context170.n = 1;
                return e.getNewSpeechConfig(n, s);
              case 1:
                r = _context170.v;
                return _context170.a(2, (r && e.process(r, s), r));
            }
          }, _callee170);
        }));
        function get(_x318, _x319) {
          return _get.apply(this, arguments);
        }
        return get;
      }()
    }]);
  }();
  return Nn.AzureSpeechConfig = e, Nn;
}
var Ln = {},
  qr;
function Cd() {
  if (qr) return Ln;
  qr = 1, Object.defineProperty(Ln, "__esModule", {
    value: !0
  }), Ln.StopTimeout = void 0;
  var i = /*#__PURE__*/function () {
    function i() {
      _classCallCheck(this, i);
    }
    return _createClass(i, null, [{
      key: "set",
      value: function set(t) {
        t.stopTimeout = setTimeout(function () {
          return t.stop();
        }, t.stopTimeoutMS);
      }
    }, {
      key: "reset",
      value: function reset(t, n) {
        t.stopTimeoutMS = n || i.DEFAULT_MS, i.stop(t), i.set(t);
      }
    }, {
      key: "stop",
      value: function stop(t) {
        t.stopTimeout && clearTimeout(t.stopTimeout);
      }
    }]);
  }();
  return Ln.StopTimeout = i, i.DEFAULT_MS = 2e4, Ln;
}
var Bn = {},
  $r;
function Td() {
  if ($r) return Bn;
  $r = 1, Object.defineProperty(Bn, "__esModule", {
    value: !0
  }), Bn.AzureAudioConfig = void 0;
  var i = /*#__PURE__*/function () {
    function i() {
      _classCallCheck(this, i);
    }
    return _createClass(i, null, [{
      key: "get",
      value: function get(t, n) {
        return n ? t.fromMicrophoneInput(n) : t.fromDefaultMicrophoneInput();
      }
    }]);
  }();
  return Bn.AzureAudioConfig = i, Bn;
}
var Dn = {},
  Gr;
function Rd() {
  if (Gr) return Dn;
  Gr = 1, Object.defineProperty(Dn, "__esModule", {
    value: !0
  }), Dn.AzureTranscript = void 0;
  var i = xo();
  var e = /*#__PURE__*/function () {
    function e() {
      _classCallCheck(this, e);
    }
    return _createClass(e, null, [{
      key: "extract",
      value:
      // newText is used to only send new text in onResult as finalTranscript is continuously accumulated
      function extract(n, s, r, o) {
        return o && (n = i.Translate.translate(n, o)), r ? {
          interimTranscript: "",
          finalTranscript: s + n,
          newText: n
        } : {
          interimTranscript: n,
          finalTranscript: s,
          newText: n
        };
      }
    }]);
  }();
  return Dn.AzureTranscript = e, Dn;
}
var zr;
function Id() {
  if (zr) return kn;
  zr = 1, Object.defineProperty(kn, "__esModule", {
    value: !0
  }), kn.Azure = void 0;
  var i = xd(),
    e = wd(),
    t = Cd(),
    n = Td(),
    s = Rd(),
    r = Co();
  var o = /*#__PURE__*/function (_r$Speech) {
    function o() {
      var _this89;
      _classCallCheck(this, o);
      _this89 = _callSuper(this, o, arguments), _this89._newTextPadding = "";
      return _this89;
    }
    _inherits(o, _r$Speech);
    return _createClass(o, [{
      key: "start",
      value: function start(c, l) {
        this._newTextPadding = "", this.stopTimeout === void 0 && t.StopTimeout.reset(this, c == null ? void 0 : c.stopAfterSilenceMs), this.prepareBeforeStart(c), this.startAsync(c), l || i.PreventConnectionStop.applyPrevention(this);
      }
    }, {
      key: "startAsync",
      value: function () {
        var _startAsync = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee171(c) {
          var l, _t48;
          return _regenerator().w(function (_context171) {
            while (1) switch (_context171.n) {
              case 0:
                _t48 = this.validate(c);
                if (!_t48) {
                  _context171.n = 2;
                  break;
                }
                _context171.n = 1;
                return this.instantiateService(c);
              case 1:
                this._translations = c == null ? void 0 : c.translations;
                (l = this._service) === null || l === void 0 || l.startContinuousRecognitionAsync(function () {}, this.error);
              case 2:
                return _context171.a(2);
            }
          }, _callee171, this);
        }));
        function startAsync(_x320) {
          return _startAsync.apply(this, arguments);
        }
        return startAsync;
      }()
    }, {
      key: "validate",
      value: function validate(c) {
        return o.getAPI() ? e.AzureSpeechConfig.validateOptions(this.error.bind(this), c) : (this.moduleNotFound(), !1);
      }
    }, {
      key: "instantiateService",
      value: function () {
        var _instantiateService = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee172(c) {
          var l, d, p, u, _c$autoLanguage, g, v, b, E;
          return _regenerator().w(function (_context172) {
            while (1) switch (_context172.n) {
              case 0:
                l = o.getAPI();
                d = n.AzureAudioConfig.get(l.AudioConfig, c.deviceId);
                _context172.n = 1;
                return e.AzureSpeechConfig.get(l.SpeechConfig, c);
              case 1:
                p = _context172.v;
                if (p) {
                  if (c.autoLanguage && c.autoLanguage.languages.length > 0) {
                    _c$autoLanguage = c.autoLanguage, g = _c$autoLanguage.type, v = _c$autoLanguage.languages, b = v.slice(0, g === "Continuous" ? 10 : 4), E = l.AutoDetectSourceLanguageConfig.fromLanguages(b);
                    g === "Continuous" && (E.mode = 1), u = l.SpeechRecognizer.FromConfig(p, E, d);
                  } else u = new l.SpeechRecognizer(p, d);
                  this.setEvents(u), this._service = u, c.retrieveToken && this.retrieveTokenInterval(c.retrieveToken);
                } else this.error("Unable to contact Azure server");
              case 2:
                return _context172.a(2);
            }
          }, _callee172, this);
        }));
        function instantiateService(_x321) {
          return _instantiateService.apply(this, arguments);
        }
        return instantiateService;
      }()
    }, {
      key: "setEvents",
      value: function setEvents(c) {
        c.recognizing = this.onRecognizing.bind(this), c.recognized = this.onRecognized.bind(this), c.sessionStarted = this.onSessionStarted.bind(this), c.canceled = this.onCanceled.bind(this), c.sessionStopped = this.onSessionStopped.bind(this);
      }
      // prettier-ignore
    }, {
      key: "onRecognizing",
      value: function onRecognizing(c, l) {
        if (this._stopping) return;
        var _s$AzureTranscript$ex = s.AzureTranscript.extract(this._newTextPadding + l.result.text, this.finalTranscript, !1, this._translations),
          d = _s$AzureTranscript$ex.interimTranscript,
          p = _s$AzureTranscript$ex.finalTranscript,
          u = _s$AzureTranscript$ex.newText;
        t.StopTimeout.reset(this, this.stopTimeoutMS), this.updateElements(d, p, u);
      }
      // prettier-ignore
    }, {
      key: "onRecognized",
      value: function onRecognized(c, l) {
        var d = l.result;
        switch (d.reason) {
          case window.SpeechSDK.ResultReason.Canceled:
            break;
          case window.SpeechSDK.ResultReason.RecognizedSpeech:
            if (d.text && !this._stopping) {
              var _s$AzureTranscript$ex2 = s.AzureTranscript.extract(this._newTextPadding + d.text, this.finalTranscript, !0, this._translations),
                p = _s$AzureTranscript$ex2.interimTranscript,
                u = _s$AzureTranscript$ex2.finalTranscript,
                g = _s$AzureTranscript$ex2.newText;
              t.StopTimeout.reset(this, this.stopTimeoutMS), this.updateElements(p, u, g), u !== "" && (this._newTextPadding = " ");
            }
            break;
        }
      }
    }, {
      key: "onCanceled",
      value: function onCanceled(c, l) {
        l.reason === window.SpeechSDK.CancellationReason.Error && this.error(l.errorDetails);
      }
    }, {
      key: "onSessionStarted",
      value: function onSessionStarted() {
        i.PreventConnectionStop.clearPrevention(this), this.setStateOnStart();
      }
    }, {
      key: "onSessionStopped",
      value: function onSessionStopped() {
        this._retrieveTokenInterval || clearInterval(this._retrieveTokenInterval), this._stopping = !1, this.setStateOnStop();
      }
    }, {
      key: "retrieveTokenInterval",
      value: function retrieveTokenInterval(c) {
        var _this90 = this;
        this._retrieveTokenInterval = setInterval(function () {
          c == null || c().then(function (l) {
            _this90._service && (_this90._service.authorizationToken = (l == null ? void 0 : l.trim()) || "");
          })["catch"](function (l) {
            _this90.error(l);
          });
        }, 1e4);
      }
    }, {
      key: "stop",
      value: function stop(c) {
        var l;
        !c && this._retrieveTokenInterval && clearInterval(this._retrieveTokenInterval), this._stopping = !0, (l = this._service) === null || l === void 0 || l.stopContinuousRecognitionAsync(), t.StopTimeout.stop(this), this.finalise(c);
      }
    }, {
      key: "moduleNotFound",
      value: function moduleNotFound() {
        console.error("speech recognition module not found:"), console.error("please install the 'microsoft-cognitiveservices-speech-sdk' npm package or add a script tag: <script src=\"https://aka.ms/csspeech/jsbrowserpackageraw\"></script>"), this.setStateOnError("speech recognition module not found");
      }
    }, {
      key: "error",
      value: function error(c) {
        this._retrieveTokenInterval && clearInterval(this._retrieveTokenInterval), console.error(c), this.setStateOnError(c), this.stop();
      }
    }], [{
      key: "getAPI",
      value: function getAPI() {
        return window.SpeechSDK;
      }
    }]);
  }(r.Speech);
  return kn.Azure = o, kn;
}
var Vr;
function Md() {
  if (Vr) return ms;
  Vr = 1, Object.defineProperty(ms, "__esModule", {
    value: !0
  });
  var i = Ed(),
    e = wo(),
    t = Sd(),
    n = Id();
  var s = /*#__PURE__*/function () {
    function s() {
      _classCallCheck(this, s);
    }
    return _createClass(s, null, [{
      key: "toggle",
      value: function toggle(o, a) {
        var c, l;
        var d = o.toLocaleLowerCase().trim();
        !((c = t.GlobalState.service) === null || c === void 0) && c.recognizing ? this.stop() : d === "webspeech" ? s.startWebSpeech(a) : d === "azure" ? s.startAzure(a) : (console.error("service not found - must be either 'webspeech' or 'azure'"), (l = a == null ? void 0 : a.onError) === null || l === void 0 || l.call(a, "service not found - must be either 'webspeech' or 'azure'"));
      }
    }, {
      key: "startWebSpeech",
      value: function startWebSpeech(o) {
        s.stop() || (t.GlobalState.service = new i.WebSpeech(), t.GlobalState.service.start(o));
      }
    }, {
      key: "isWebSpeechSupported",
      value: function isWebSpeechSupported() {
        return !!i.WebSpeech.getAPI();
      }
    }, {
      key: "startAzure",
      value: function startAzure(o) {
        var a;
        s.stop() || !((a = t.GlobalState.service) === null || a === void 0) && a.cannotBeStopped || (t.GlobalState.service = new n.Azure(), t.GlobalState.service.start(o));
      }
    }, {
      key: "stop",
      value: function stop() {
        var o;
        return t.GlobalState.doubleClickDetector() ? !0 : (!((o = t.GlobalState.service) === null || o === void 0) && o.recognizing && t.GlobalState.service.stop(), !1);
      }
    }, {
      key: "endCommandMode",
      value: function endCommandMode() {
        t.GlobalState.service && e.CommandUtils.toggleCommandModeOff(t.GlobalState.service);
      }
    }]);
  }();
  return ms["default"] = s, ms;
}
var kd = Md();
var gs = /* @__PURE__ */md(kd);
var Od = /*#__PURE__*/function () {
  function Od(e, t) {
    _classCallCheck(this, Od);
    this._silenceMS = 2e3, this._stop = !0, typeof t == "boolean" && t === !1 && (this._stop = !1), typeof e == "number" && (this._silenceMS = e);
  }
  return _createClass(Od, [{
    key: "setSilenceTimeout",
    value: function setSilenceTimeout(e, t) {
      var _this91 = this;
      this._silenceTimeout = setTimeout(function () {
        var n;
        (n = e.submit) == null || n.call(e), gs.stop(), _this91._stop || setTimeout(t, rs.MICROPHONE_RESET_TIMEOUT_MS);
      }, this._silenceMS);
    }
  }, {
    key: "clearSilenceTimeout",
    value: function clearSilenceTimeout() {
      this._silenceTimeout && clearTimeout(this._silenceTimeout);
    }
  }, {
    key: "resetSilenceTimeout",
    value: function resetSilenceTimeout(e, t) {
      this.clearSilenceTimeout(), this.setSilenceTimeout(e, t);
    }
  }, {
    key: "onPause",
    value: function onPause(e, t, n) {
      e ? this.resetSilenceTimeout(t, n) : this.clearSilenceTimeout();
    }
  }]);
}();
var Wn = /*#__PURE__*/function (_Js) {
  function Wn(e, t, n) {
    var _this92;
    _classCallCheck(this, Wn);
    var s = _typeof(e.speechToText) == "object" ? e.speechToText : {};
    _this92 = _callSuper(this, Wn, [s == null ? void 0 : s.button]);
    var _this92$processConfig = _this92.processConfiguration(t, e.speechToText),
      r = _this92$processConfig.serviceName,
      o = _this92$processConfig.processedConfig;
    if (_this92._addErrorMessage = n, r === "webspeech" && !gs.isWebSpeechSupported()) _this92.changeToUnsupported();else {
      var a = !e.textInput || !e.textInput.disabled;
      _this92.elementRef.onclick = _this92.buttonClick.bind(_this92, t, a, r, o);
    }
    setTimeout(function () {
      _this92._validationHandler = e._validationHandler;
    });
    return _this92;
  }
  // prettier-ignore
  _inherits(Wn, _Js);
  return _createClass(Wn, [{
    key: "processConfiguration",
    value: function processConfiguration(e, t) {
      var _n$displayInterimResu, _n$textColor, _n$translations, _n$commands, _n$events;
      var l;
      var n = _typeof(t) == "object" ? t : {},
        s = _typeof(n.webSpeech) == "object" ? n.webSpeech : {},
        r = n.azure || {},
        o = _objectSpread(_objectSpread({
          displayInterimResults: (_n$displayInterimResu = n.displayInterimResults) !== null && _n$displayInterimResu !== void 0 ? _n$displayInterimResu : void 0,
          textColor: (_n$textColor = n.textColor) !== null && _n$textColor !== void 0 ? _n$textColor : void 0,
          translations: (_n$translations = n.translations) !== null && _n$translations !== void 0 ? _n$translations : void 0,
          commands: (_n$commands = n.commands) !== null && _n$commands !== void 0 ? _n$commands : void 0,
          events: (_n$events = n.events) !== null && _n$events !== void 0 ? _n$events : void 0
        }, s), r),
        a = (l = n.commands) == null ? void 0 : l.submit;
      return a && (o.onPreResult = function (d) {
        return d.toLowerCase().includes(a) ? (setTimeout(function () {
          var p;
          return (p = e.submit) == null ? void 0 : p.call(e);
        }), gs.endCommandMode(), {
          restart: !0,
          removeNewText: !0
        }) : null;
      }), n.submitAfterSilence && (this._silenceSubmit = new Od(n.submitAfterSilence, n.stopAfterSubmit)), {
        serviceName: Wn.getServiceName(n),
        processedConfig: o
      };
    }
  }, {
    key: "buttonClick",
    value: function buttonClick(e, t, n, s) {
      var _this93 = this;
      var r = s == null ? void 0 : s.events;
      e.removePlaceholderStyle(), gs.toggle(n, _objectSpread({
        insertInCursorLocation: !1,
        element: t ? e.inputElementRef : void 0,
        onError: function onError() {
          var o;
          _this93.onError(), (o = _this93._silenceSubmit) == null || o.clearSilenceTimeout();
        },
        onStart: function onStart() {
          var o;
          _this93.changeToActive(), (o = r == null ? void 0 : r.onStart) == null || o.call(r);
        },
        onStop: function onStop() {
          var o, a, c;
          (o = _this93._validationHandler) == null || o.call(_this93), (a = _this93._silenceSubmit) == null || a.clearSilenceTimeout(), _this93.changeToDefault(), (c = r == null ? void 0 : r.onStop) == null || c.call(r);
        },
        onPauseTrigger: function onPauseTrigger(o) {
          var a, c;
          (a = _this93._silenceSubmit) == null || a.onPause(o, e, _this93.elementRef.onclick), (c = r == null ? void 0 : r.onPauseTrigger) == null || c.call(r, o);
        },
        onPreResult: function onPreResult(o, a) {
          var c;
          (c = r == null ? void 0 : r.onPreResult) == null || c.call(r, o, a);
        },
        onResult: function onResult(o, a) {
          var c, l, d;
          a && ((c = _this93._validationHandler) == null || c.call(_this93)), (l = _this93._silenceSubmit) == null || l.resetSilenceTimeout(e, _this93.elementRef.onclick), (d = r == null ? void 0 : r.onResult) == null || d.call(r, o, a);
        },
        onCommandModeTrigger: function onCommandModeTrigger(o) {
          var a;
          _this93.onCommandModeTrigger(o), (a = r == null ? void 0 : r.onCommandModeTrigger) == null || a.call(r, o);
        }
      }, s));
    }
  }, {
    key: "onCommandModeTrigger",
    value: function onCommandModeTrigger(e) {
      e ? this.changeToCommandMode() : this.changeToActive();
    }
  }, {
    key: "onError",
    value: function onError() {
      this._addErrorMessage("speechToText", "speech input error");
    }
  }], [{
    key: "getServiceName",
    value: function getServiceName(e) {
      return e.azure ? "azure" : "webspeech";
    }
  }, {
    key: "toggleSpeechAfterSubmit",
    value: function toggleSpeechAfterSubmit(e) {
      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !0;
      e[H](), t || setTimeout(function () {
        return e[H]();
      }, Wn.MICROPHONE_RESET_TIMEOUT_MS);
    }
  }]);
}(Js);
Wn.MICROPHONE_RESET_TIMEOUT_MS = 300;
var rs = Wn;
var ft = /*#__PURE__*/function () {
  // prettier-ignore
  function ft(e, t, n, s, r) {
    var _this94 = this;
    _classCallCheck(this, ft);
    this._attachments = [], this._fileCountLimit = 99, this._acceptedFormat = "", this._hiddenAttachments = /* @__PURE__ */new Set(), n.maxNumberOfFiles && (this._fileCountLimit = n.maxNumberOfFiles), this._toggleContainerDisplay = s, this._fileAttachmentsContainerRef = r, n.acceptedFormats && (this._acceptedFormat = n.acceptedFormats), setTimeout(function () {
      _this94._validationHandler = e._validationHandler, _this94._onInput = t.onInput;
    });
  }
  return _createClass(ft, [{
    key: "attemptAddFile",
    value: function attemptAddFile(e, t) {
      var n;
      return ft.isFileTypeValid(e, this._acceptedFormat) ? (this.addAttachmentBasedOnType(e, t, !0), (n = this._onInput) == null || n.call(this, !0), !0) : !1;
    }
  }, {
    key: "addAttachmentBasedOnType",
    value: function addAttachmentBasedOnType(e, t, n) {
      var s = ft.getTypeFromBlob(e);
      if (s === j) {
        var r = ft.createImageAttachment(t);
        this.addFileAttachment(e, j, r, n);
      } else if (s === P) {
        var _r8 = os.createAudioAttachment(t);
        this.addFileAttachment(e, P, _r8, n);
      } else {
        var _r9 = ft.createAnyFileAttachment(e.name);
        this.addFileAttachment(e, Ut, _r9, n);
      }
    }
  }, {
    key: "addFileAttachment",
    value: function addFileAttachment(e, t, n, s) {
      var a;
      var r = ft.createContainer(n);
      if (this._attachments.length >= this._fileCountLimit) {
        var c = this._attachments[this._attachments.length - 1].removeButton;
        c == null || c[H]();
        var l = this._fileAttachmentsContainerRef.children;
        this._fileAttachmentsContainerRef.insertBefore(r, l[0]);
      } else this._fileAttachmentsContainerRef.appendChild(r);
      var o = {
        file: e,
        attachmentContainerElement: r,
        fileType: t
      };
      return s && (o.removeButton = this.createRemoveAttachmentButton(o), r.appendChild(o.removeButton)), this._toggleContainerDisplay(!0), this._attachments.push(o), this._fileAttachmentsContainerRef.scrollTop = this._fileAttachmentsContainerRef.scrollHeight, (a = this._validationHandler) == null || a.call(this), o;
    }
  }, {
    key: "createRemoveAttachmentButton",
    value: function createRemoveAttachmentButton(e) {
      var t = S();
      t[m].add("remove-file-attachment-button"), t.onclick = this.removeAttachment.bind(this, e);
      var n = S();
      return n[m].add("x-icon"), n.innerText = "×", t.appendChild(n), t;
    }
  }, {
    key: "removeAttachment",
    value: function removeAttachment(e, t) {
      var r, o;
      (r = this._onInput) == null || r.call(this, !!(t != null && t.isTrusted));
      var n = this._attachments.findIndex(function (a) {
          return a === e;
        }),
        s = this._attachments[n].attachmentContainerElement;
      this._attachments.splice(n, 1), os.stopAttachmentPlayback(s), s.remove(), this._toggleContainerDisplay(!1), (o = this._validationHandler) == null || o.call(this);
    }
  }, {
    key: "getFiles",
    value: function getFiles() {
      return Array.from(this._attachments).map(function (e) {
        return _defineProperty(_defineProperty({}, le, e[le]), "type", e.fileType);
      });
    }
  }, {
    key: "hideAttachments",
    value: function hideAttachments() {
      var _this95 = this;
      this._hiddenAttachments.clear(), this._attachments.forEach(function (e) {
        setTimeout(function () {
          var t;
          return (t = e.removeButton) == null ? void 0 : t[H]();
        }), _this95._hiddenAttachments.add(e);
      });
    }
  }, {
    key: "removeAttachments",
    value: function removeAttachments() {
      this._attachments.forEach(function (e) {
        setTimeout(function () {
          var t;
          return (t = e.removeButton) == null ? void 0 : t[H]();
        });
      }), this._hiddenAttachments.clear();
    }
  }, {
    key: "readdAttachments",
    value: function readdAttachments() {
      var _this96 = this;
      var e;
      Array.from(this._hiddenAttachments).forEach(function (t) {
        _this96._fileAttachmentsContainerRef.appendChild(t.attachmentContainerElement), _this96._attachments.push(t);
      }), (e = this._onInput) == null || e.call(this, !1), this._hiddenAttachments.clear();
    }
  }], [{
    key: "isFileTypeValid",
    value: function isFileTypeValid(e, t) {
      if (t === "") return !0;
      var n = t.split(",");
      for (var s = 0; s < n.length; s++) {
        var r = n[s].trim();
        if (e.type === r) return !0;
        if (r.startsWith(".")) {
          var o = r.slice(1);
          if (e.name.endsWith(o)) return !0;
        } else {
          if (e.name.endsWith(r)) return !0;
          if (r.endsWith("/*") && e.type.startsWith(r.slice(0, -2))) return !0;
        }
      }
      return !1;
    }
  }, {
    key: "getTypeFromBlob",
    value: function getTypeFromBlob(e) {
      var t = e.type;
      return t.startsWith(j) ? j : t.startsWith(P) ? P : Ut;
    }
  }, {
    key: "createImageAttachment",
    value: function createImageAttachment(e) {
      var t = new Image();
      return t.src = e, t[m].add("image-attachment"), t;
    }
  }, {
    key: "createAnyFileAttachment",
    value: function createAnyFileAttachment(e) {
      var t = S();
      t[m].add("border-bound-attachment"), Oe.IS_SAFARI && t[m].add("border-bound-attachment-safari");
      var n = S();
      n[m].add("any-file-attachment-text");
      var s = S();
      return s[m].add("file-attachment-text-container"), s.appendChild(n), n.textContent = e, t.appendChild(s), t;
    }
  }, {
    key: "createContainer",
    value: function createContainer(e) {
      var t = S();
      return t[m].add("file-attachment"), t.appendChild(e), t;
    }
  }]);
}();
var ht = /*#__PURE__*/function (_ft) {
  // prettier-ignore
  function ht(e, t, n, s, r) {
    _classCallCheck(this, ht);
    return _callSuper(this, ht, [e, t, n, s, r]);
  }
  _inherits(ht, _ft);
  return _createClass(ht, [{
    key: "createTimer",
    value: function createTimer(e, t) {
      var _this97 = this;
      var n = 0;
      var s = t !== void 0 && t < ht.TIMER_LIMIT_S ? t : ht.TIMER_LIMIT_S;
      return setInterval(function () {
        var a;
        n += 1, n === s && ((a = _this97.stopPlaceholderCallback) == null || a.call(_this97), _this97.clearTimer()), n === 600 && e[m].add("audio-placeholder-text-4-digits");
        var r = Math.floor(n / 60),
          o = (n % 60).toString().padStart(2, "0");
        e.textContent = "".concat(r, ":").concat(o);
      }, 1e3);
    }
  }, {
    key: "createPlaceholderAudioAttachment",
    value: function createPlaceholderAudioAttachment(e) {
      var t = ht.createAudioContainer(),
        n = S();
      n[m].add("audio-placeholder-text-3-digits");
      var s = S();
      s[m].add("file-attachment-text-container", "audio-placeholder-text-3-digits-container"), s.appendChild(n);
      var r = bt.createSVGElement(fi);
      return r[m].add("attachment-icon", "stop-icon", "not-removable-attachment-icon"), n.textContent = "0:00", this._activePlaceholderTimer = this.createTimer(n, e), t.appendChild(s), this.addPlaceholderAudioAttachmentEvents(t, r, s), t;
    }
  }, {
    key: "addPlaceholderAudioAttachmentEvents",
    value: function addPlaceholderAudioAttachmentEvents(e, t, n) {
      var _this98 = this;
      var s = function s() {
        return e.replaceChildren(t);
      };
      e.addEventListener("mouseenter", s);
      var r = function r() {
        return e.replaceChildren(n);
      };
      e.addEventListener("mouseleave", r);
      var o = function o() {
        var a;
        return (a = _this98.stopPlaceholderCallback) == null ? void 0 : a.call(_this98);
      };
      e.addEventListener(H, o);
    }
  }, {
    key: "addPlaceholderAttachment",
    value: function addPlaceholderAttachment(e, t) {
      var n = this.createPlaceholderAudioAttachment(t);
      this._activePlaceholderAttachment = this.addFileAttachment(new File([], ""), P, n, !1), this.stopPlaceholderCallback = e;
    }
    // prettier-ignore
  }, {
    key: "completePlaceholderAttachment",
    value: function completePlaceholderAttachment(e, t) {
      var n = this._activePlaceholderAttachment;
      n && (n[le] = e, ht.addAudioElements(n.attachmentContainerElement.children[0], t), n.removeButton = this.createRemoveAttachmentButton(n), n.attachmentContainerElement.appendChild(n.removeButton), this._activePlaceholderAttachment = void 0, this.clearTimer());
    }
  }, {
    key: "removePlaceholderAttachment",
    value: function removePlaceholderAttachment() {
      this._activePlaceholderAttachment && (this.removeAttachment(this._activePlaceholderAttachment), this._activePlaceholderAttachment = void 0, this.clearTimer());
    }
  }, {
    key: "clearTimer",
    value: function clearTimer() {
      this._activePlaceholderTimer !== void 0 && (clearInterval(this._activePlaceholderTimer), this._activePlaceholderTimer = void 0, this.stopPlaceholderCallback = void 0);
    }
  }], [{
    key: "createAudioContainer",
    value: function createAudioContainer() {
      var e = S();
      return e[m].add("border-bound-attachment", "audio-attachment-icon-container"), Oe.IS_SAFARI && e[m].add("border-bound-attachment-safari"), e;
    }
  }, {
    key: "addAudioElements",
    value: function addAudioElements(e, t) {
      var n = e.parentElement ? X.cloneElement(e) : e,
        s = S(P);
      s.src = t;
      var r = bt.createSVGElement(go);
      r[m].add("attachment-icon", "play-icon");
      var o = bt.createSVGElement(fi);
      o[m].add("attachment-icon", "stop-icon"), n.replaceChildren(r), s.onplay = function () {
        n.replaceChildren(o);
      }, s.onpause = function () {
        n.replaceChildren(r), s.currentTime = 0;
      }, s.onended = function () {
        n.replaceChildren(r);
      }, n.onclick = function () {
        s.paused ? s.play() : s.pause();
      };
    }
  }, {
    key: "createAudioAttachment",
    value: function createAudioAttachment(e) {
      var t = ht.createAudioContainer();
      return ht.addAudioElements(t, e), t;
    }
  }, {
    key: "stopAttachmentPlayback",
    value: function stopAttachmentPlayback(e) {
      var t, n, s;
      (s = (n = (t = e.children[0]) == null ? void 0 : t.children) == null ? void 0 : n[0]) != null && s[m].contains("stop-icon") && e.children[0][H]();
    }
  }]);
}(ft);
ht.TIMER_LIMIT_S = 5999;
var os = ht;
var Nd = /*#__PURE__*/function () {
  function Nd() {
    _classCallCheck(this, Nd);
  }
  return _createClass(Nd, null, [{
    key: "create",
    value:
    // prettier-ignore
    function create(e, t, n, s, r, o) {
      return o === P ? new os(e, t, n, s, r) : new ft(e, t, n, s, r);
    }
  }]);
}();
var ls = /*#__PURE__*/function () {
  function ls(e, t, n) {
    _classCallCheck(this, ls);
    this._fileAttachmentsTypes = [], this.elementRef = this.createAttachmentContainer();
    var s = _typeof(n) == "object" && !!n.displayFileAttachmentContainer;
    this.toggleContainerDisplay(s), e.appendChild(this.elementRef), t && Object.assign(this.elementRef[_], t);
  }
  // prettier-ignore
  return _createClass(ls, [{
    key: "addType",
    value: function addType(e, t, n, s) {
      var r = Nd.create(e, t, n, this.toggleContainerDisplay.bind(this), this.elementRef, s);
      return this._fileAttachmentsTypes.push(r), r;
    }
  }, {
    key: "createAttachmentContainer",
    value: function createAttachmentContainer() {
      var e = S();
      return e.id = "file-attachment-container", e;
    }
  }, {
    key: "toggleContainerDisplay",
    value: function toggleContainerDisplay(e) {
      e ? this.elementRef[_].display = "block" : this.elementRef.children.length === 0 && (this.elementRef[_].display = "none");
    }
  }, {
    key: "getAllFileData",
    value: function getAllFileData() {
      var e = this._fileAttachmentsTypes.map(function (t) {
        return t.getFiles();
      }).flat();
      return e.length > 0 ? e : void 0;
    }
  }, {
    key: "completePlaceholders",
    value: function () {
      var _completePlaceholders = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee174() {
        return _regenerator().w(function (_context174) {
          while (1) switch (_context174.n) {
            case 0:
              _context174.n = 1;
              return Promise.all(this._fileAttachmentsTypes.map(/*#__PURE__*/function () {
                var _ref209 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee173(e) {
                  var t;
                  return _regenerator().w(function (_context173) {
                    while (1) switch (_context173.n) {
                      case 0:
                        return _context173.a(2, (t = e.stopPlaceholderCallback) == null ? void 0 : t.call(e));
                    }
                  }, _callee173);
                }));
                return function (_x322) {
                  return _ref209.apply(this, arguments);
                };
              }()));
            case 1:
              return _context174.a(2);
          }
        }, _callee174, this);
      }));
      function completePlaceholders() {
        return _completePlaceholders.apply(this, arguments);
      }
      return completePlaceholders;
    }()
  }, {
    key: "addFilesToAnyType",
    value: function addFilesToAnyType(e) {
      ls.addFilesToType(e, this._fileAttachmentsTypes);
    }
  }, {
    key: "hideFiles",
    value: function hideFiles() {
      this._fileAttachmentsTypes.forEach(function (e) {
        return e.hideAttachments();
      }), this.elementRef.replaceChildren(), this.toggleContainerDisplay(!1);
    }
  }, {
    key: "removeHiddenFiles",
    value: function removeHiddenFiles() {
      this._fileAttachmentsTypes.forEach(function (e) {
        return e.removeAttachments();
      });
    }
  }, {
    key: "readdHiddenFiles",
    value: function readdHiddenFiles() {
      this._fileAttachmentsTypes.forEach(function (e) {
        return e.readdAttachments();
      }), this.toggleContainerDisplay(!0);
    }
  }, {
    key: "getNumberOfTypes",
    value: function getNumberOfTypes() {
      return this._fileAttachmentsTypes.length;
    }
  }], [{
    key: "addFilesToType",
    value: function addFilesToType(e, t) {
      e.forEach(function (n) {
        var s = new FileReader();
        s.readAsDataURL(n), s.onload = function (r) {
          for (var o = 0; o < t.length && !t[o].attemptAddFile(n, r.target.result); o += 1);
        };
      });
    }
  }]);
}();
var We = /*#__PURE__*/function () {
  function We(e, t, n) {
    _classCallCheck(this, We);
    this._isOpen = !1, this._contentRef = We.createModalContent(t, n == null ? void 0 : n.backgroundColor), this._buttonPanel = We.createButtonPanel(n == null ? void 0 : n.backgroundColor), this._elementRef = We.createContainer(this._contentRef, n), this._elementRef.appendChild(this._buttonPanel), e.appendChild(this._elementRef), this._backgroundPanelRef = We.createDarkBackgroundPanel(), e.appendChild(this._backgroundPanelRef), this.addWindowEvents(e);
  }
  return _createClass(We, [{
    key: "isOpen",
    value: function isOpen() {
      return this._isOpen;
    }
  }, {
    key: "addButtons",
    value: function addButtons() {
      var _this99 = this;
      for (var _len2 = arguments.length, e = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        e[_key2] = arguments[_key2];
      }
      e.forEach(function (t) {
        te.addAttributes(t), _this99._buttonPanel.appendChild(t);
      });
    }
  }, {
    key: "close",
    value: function close() {
      var _this100 = this;
      this._elementRef[m].remove("show-modal"), this._elementRef[m].add("hide-modal"), this._backgroundPanelRef[m].remove("show-modal-background"), this._backgroundPanelRef[m].add("hide-modal-background"), this._isOpen = !1, setTimeout(function () {
        _this100._elementRef[_].display = "none", _this100._backgroundPanelRef[_].display = "none";
      }, We.MODAL_CLOSE_TIMEOUT_MS);
    }
  }, {
    key: "displayModalElements",
    value: function displayModalElements() {
      this._elementRef[_].display = "flex", this._elementRef[m].remove("hide-modal"), this._elementRef[m].add("show-modal"), this._backgroundPanelRef[_].display = "block", this._backgroundPanelRef[m].remove("hide-modal-background"), this._backgroundPanelRef[m].add("show-modal-background"), this._isOpen = !0;
    }
  }, {
    key: "openTextModal",
    value: function openTextModal(e) {
      this._contentRef.innerHTML = e, this.displayModalElements();
    }
  }, {
    key: "addCloseButton",
    value: function addCloseButton(e, t, n) {
      var _this101 = this;
      var s = t ? We.createSVGButton(e) : We.createTextButton(e);
      return this.addButtons(s), s.onclick = function () {
        _this101.close(), setTimeout(function () {
          n == null || n();
        }, 140);
      }, s;
    }
  }, {
    key: "addWindowEvents",
    value: function addWindowEvents(e) {
      this.keyDownEvent = this.windowKeyDown.bind(this, e), window.addEventListener("keydown", this.keyDownEvent);
    }
  }, {
    key: "windowKeyDown",
    value: function windowKeyDown(e, t) {
      var n, s;
      !e.isConnected && this.keyDownEvent ? window.removeEventListener("keydown", this.keyDownEvent) : this._isOpen && (t.key === pe.ESCAPE ? (this.close(), (n = this.extensionCloseCallback) == null || n.call(this)) : t.key === pe.ENTER && (this.close(), (s = this.extensionCloseCallback) == null || s.call(this)));
    }
  }], [{
    key: "createContainer",
    value: function createContainer(e, t) {
      var n = S();
      return n[m].add("modal"), n.appendChild(e), t && delete t.backgroundColor, Object.assign(n[_], t), n;
    }
  }, {
    key: "createModalContent",
    value: function createModalContent(e, t) {
      var _n$m;
      var n = S();
      return (_n$m = n[m]).add.apply(_n$m, _toConsumableArray(e)), t && (n[_].backgroundColor = t), S().appendChild(n), n;
    }
  }, {
    key: "createButtonPanel",
    value: function createButtonPanel(e) {
      var t = S();
      return t[m].add("modal-button-panel"), e && (t[_].backgroundColor = e), t;
    }
  }, {
    key: "createDarkBackgroundPanel",
    value: function createDarkBackgroundPanel() {
      var e = S();
      return e.id = "modal-background-panel", e;
    }
  }, {
    key: "createTextButton",
    value: function createTextButton(e) {
      var t = S();
      return t[m].add("modal-button"), t.textContent = e, t;
    }
  }, {
    key: "createSVGButton",
    value: function createSVGButton(e) {
      var t = S();
      t[m].add("modal-button", "modal-svg-button");
      var n = bt.createSVGElement(e);
      return n[m].add("modal-svg-button-icon"), t.appendChild(n), t;
    }
  }, {
    key: "createTextModalFunc",
    value: function createTextModalFunc(e, t, n) {
      var s;
      if (_typeof(t) == "object" && (s = t[y]) != null && s.infoModal) {
        var r = new We(e, ["modal-content"], t[y].infoModal.containerStyle);
        return r.addCloseButton("OK", !1, n), r.openTextModal.bind(r, t.infoModalTextMarkUp || "");
      }
    }
  }]);
}();
We.MODAL_CLOSE_TIMEOUT_MS = 190;
var Bt = We;
var Bs = /*#__PURE__*/function (_Jt5) {
  // prettier-ignore
  function Bs(e, t, n, s, r, o) {
    var _this102;
    _classCallCheck(this, Bs);
    var p, u, g, v, b, E, w, F, J, K;
    var a = (p = n == null ? void 0 : n.button) == null ? void 0 : p.position,
      c = ((v = (g = (u = n == null ? void 0 : n.button) == null ? void 0 : u.styles) == null ? void 0 : g[h]) == null ? void 0 : v.content) || o,
      l = Qe.tryCreateConfig("Upload File", (b = n == null ? void 0 : n.button) == null ? void 0 : b.tooltip);
    _this102 = _callSuper(this, Bs, [Bs.createButtonElement(), r, a, l, n.button, c]);
    var d = _this102.createInnerElementsForStates(s, _this102.customStyles);
    _this102._inputElement = Bs.createInputElement((E = n == null ? void 0 : n[y]) == null ? void 0 : E.acceptedFormats), _this102.addClickEvent(e, n), _this102.changeElementsByState(d.styles), _this102.reapplyStateStyle("styles"), _this102._fileAttachmentsType = t, _this102._openModalOnce = ((F = (w = n[y]) == null ? void 0 : w.infoModal) == null ? void 0 : F.openModalOnce) === !1 || (K = (J = n[y]) == null ? void 0 : J.infoModal) == null ? void 0 : K.openModalOnce;
    return _this102;
  }
  _inherits(Bs, _Jt5);
  return _createClass(Bs, [{
    key: "createInnerElementsForStates",
    value: function createInnerElementsForStates(e, t) {
      return {
        styles: this.createInnerElements(e, "styles", t)
      };
    }
  }, {
    key: "triggerImportPrompt",
    value: function triggerImportPrompt(e) {
      e.onchange = this["import"].bind(this, e), e[H]();
    }
  }, {
    key: "import",
    value: function _import(e) {
      ls.addFilesToType(Array.from(e[y] || []), [this._fileAttachmentsType]), e.value = "";
    }
  }, {
    key: "addClickEvent",
    value: function addClickEvent(e, t) {
      var n = this.triggerImportPrompt.bind(this, this._inputElement),
        s = Bt.createTextModalFunc(e, t, n);
      this.elementRef.onclick = this[H].bind(this, s);
    }
  }, {
    key: "click",
    value: function click(e) {
      e && (this._openModalOnce === void 0 || this._openModalOnce === !0) ? (e(), this._openModalOnce === !0 && (this._openModalOnce = !1)) : this.triggerImportPrompt(this._inputElement);
    }
  }], [{
    key: "createInputElement",
    value: function createInputElement(e) {
      var t = S("input");
      return t.type = le, t.accept = e || "", t.hidden = !0, t.multiple = !0, t;
    }
  }, {
    key: "createButtonElement",
    value: function createButtonElement() {
      var e = S();
      return e[m].add("input-button"), e;
    }
  }]);
}(Jt);
var pt = /*#__PURE__*/function () {
  function pt() {
    _classCallCheck(this, pt);
  }
  return _createClass(pt, null, [{
    key: "create",
    value: function create(e, t, n) {
      var s = pt.createElement(n);
      pt.addEvents(s, e, t), e.appendChild(s);
    }
  }, {
    key: "createElement",
    value: function createElement(e) {
      var t = S();
      return t.id = "drag-and-drop", _typeof(e) === L && Object.assign(t[_], e), t;
    }
  }, {
    key: "addEvents",
    value: function addEvents(e, t, n) {
      t.ondragenter = function (s) {
        s.preventDefault(), pt.display(e);
      }, e.ondragleave = function (s) {
        s.preventDefault(), pt.hide(e);
      }, e.ondragover = function (s) {
        s.preventDefault();
      }, e.ondrop = function (s) {
        s.preventDefault(), pt.uploadFile(n, s), pt.hide(e);
      };
    }
  }, {
    key: "uploadFile",
    value: function uploadFile(e, t) {
      var s;
      var n = (s = t.dataTransfer) == null ? void 0 : s[y];
      n && e.addFilesToAnyType(Array.from(n));
    }
  }, {
    key: "display",
    value: function display(e) {
      e[_].display = "block";
    }
  }, {
    key: "hide",
    value: function hide(e) {
      e[_].display = "none";
    }
  }, {
    key: "isEnabled",
    value: function isEnabled(e, t) {
      return t !== void 0 && t === !1 ? !1 : !!t || e.getNumberOfTypes() > 0;
    }
  }]);
}();
var Rt = /*#__PURE__*/function () {
  function Rt() {
    _classCallCheck(this, Rt);
  }
  return _createClass(Rt, null, [{
    key: "validate",
    value:
    // prettier-ignore
    function validate(e, t, n, s, r) {
      var o = e(n, s, r);
      return o ? t.changeToSubmitIcon() : t.changeToDisabledIcon(), o;
    }
    // prettier-ignore
  }, {
    key: "useValidationFunc",
    value: function () {
      var _useValidationFunc = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee175(e, t, n, s) {
        var r, o, a;
        return _regenerator().w(function (_context175) {
          while (1) switch (_context175.n) {
            case 0:
              r = t.isTextInputEmpty() ? "" : t.inputElementRef.textContent;
              _context175.n = 1;
              return n.completePlaceholders();
            case 1:
              o = n.getAllFileData(), a = o == null ? void 0 : o.map(function (c) {
                return c[le];
              });
              return _context175.a(2, Rt.validate(e, s, r, a));
          }
        }, _callee175);
      }));
      function useValidationFunc(_x323, _x324, _x325, _x326) {
        return _useValidationFunc.apply(this, arguments);
      }
      return useValidationFunc;
    }() // prettier-ignore
  }, {
    key: "useValidationFuncProgrammatic",
    value: function () {
      var _useValidationFuncProgrammatic = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee176(e, t, n) {
        var r, s;
        return _regenerator().w(function (_context176) {
          while (1) switch (_context176.n) {
            case 0:
              s = (r = t[y]) == null ? void 0 : r.map(function (o) {
                return o[le];
              });
              return _context176.a(2, Rt.validate(e, n, t[h], s, !0));
          }
        }, _callee176);
      }));
      function useValidationFuncProgrammatic(_x327, _x328, _x329) {
        return _useValidationFuncProgrammatic.apply(this, arguments);
      }
      return useValidationFuncProgrammatic;
    }()
  }, {
    key: "validateWebsocket",
    value: function validateWebsocket(e, t) {
      var n = e.websocket,
        s = e.connectSettings;
      return n && s.url !== et.URL && !_e.canSendMessage(n) ? (t.changeToDisabledIcon(), !1) : !0;
    }
    // prettier-ignore
  }, {
    key: "attach",
    value: function attach(e, t, n, s, r) {
      var o = e.validateInput || me.processValidateInput(e);
      e._validationHandler = /*#__PURE__*/function () {
        var _ref210 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee177(a) {
          var c;
          return _regenerator().w(function (_context177) {
            while (1) switch (_context177.n) {
              case 0:
                if (!(r.status.loadingActive || r.status.requestInProgress || t.isSubmitProgrammaticallyDisabled === !0 || !Rt.validateWebsocket(t, r))) {
                  _context177.n = 1;
                  break;
                }
                return _context177.a(2, !1);
              case 1:
                c = o || t.canSendMessage;
                return _context177.a(2, c ? a ? Rt.useValidationFuncProgrammatic(c, a, r) : Rt.useValidationFunc(c, n, s, r) : null);
            }
          }, _callee177);
        }));
        return function (_x330) {
          return _ref210.apply(this, arguments);
        };
      }();
    }
  }]);
}();
var To = /*#__PURE__*/function () {
  function To() {
    _classCallCheck(this, To);
  }
  return _createClass(To, null, [{
    key: "getFileName",
    value: function getFileName(e, t) {
      var n = /* @__PURE__ */new Date(),
        s = String(n.getHours()).padStart(2, "0"),
        r = String(n.getMinutes()).padStart(2, "0"),
        o = String(n.getSeconds()).padStart(2, "0");
      return "".concat(e, "-").concat(s, "-").concat(r, "-").concat(o, ".").concat(t);
    }
  }]);
}();
var Pd = /*#__PURE__*/function (_Js2) {
  function Pd(e, t) {
    var _this103;
    _classCallCheck(this, Pd);
    var n, s;
    _this103 = _callSuper(this, Pd, [t.button]), _this103._waitingForBrowserApproval = !1, _this103._audioType = e, _this103._extension = ((n = t[y]) == null ? void 0 : n.format) || "mp3", _this103._maxDurationSeconds = (s = t[y]) == null ? void 0 : s.maxDurationSeconds, _this103.elementRef.onclick = _this103.buttonClick.bind(_assertThisInitialized(_this103));
    return _this103;
  }
  _inherits(Pd, _Js2);
  return _createClass(Pd, [{
    key: "buttonClick",
    value: function buttonClick() {
      this._waitingForBrowserApproval || (this.isActive ? this.stop() : (this._waitingForBrowserApproval = !0, this.record()));
    }
  }, {
    key: "stop",
    value: function stop() {
      var _this104 = this;
      return new Promise(function (e) {
        var t, n;
        _this104.changeToDefault(), (t = _this104._mediaRecorder) == null || t.stop(), (n = _this104._mediaStream) == null || n.getTracks().forEach(function (s) {
          return s.stop();
        }), setTimeout(function () {
          e();
        }, 10);
      });
    }
  }, {
    key: "record",
    value: function record() {
      var _this105 = this;
      navigator.mediaDevices.getUserMedia({
        audio: !0
      }).then(function (e) {
        _this105.changeToActive(), _this105._mediaRecorder = new MediaRecorder(e), _this105._audioType.addPlaceholderAttachment(_this105.stop.bind(_this105), _this105._maxDurationSeconds), _this105._mediaStream = e, _this105._mediaRecorder.addEventListener("dataavailable", function (t) {
          _this105.createFile(t);
        }), _this105._mediaRecorder.start();
      })["catch"](function (e) {
        console[f](e), _this105.stop();
      })["finally"](function () {
        _this105._waitingForBrowserApproval = !1;
      });
    }
  }, {
    key: "createFile",
    value: function createFile(e) {
      var _this106 = this;
      var t = new Blob([e.data], {
          type: "audio/".concat(this._extension)
        }),
        n = To.getFileName(this._newFilePrefix || P, this._extension),
        s = new File([t], n, {
          type: t.type
        }),
        r = new FileReader();
      r.readAsDataURL(s), r.onload = function (o) {
        _this106._audioType.completePlaceholderAttachment(s, o.target.result);
      };
    }
  }]);
}(Js);
var Ld = "<?xml version=\"1.0\" standalone=\"no\"?>\n<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.0//EN\" \"http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd\">\n<svg xmlns=\"http://www.w3.org/2000/svg\" stroke=\"currentColor\" fill=\"none\" stroke-width=\"1\" viewBox=\"0 0 24 24\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <line x1=\"22\" y1=\"2\" x2=\"11\" y2=\"14\"></line>\n  <polygon points=\"22 2 15 22 11 14 2 10 22 2\"></polygon>\n</svg>\n";
var Dt = /*#__PURE__*/function () {
  function Dt() {
    _classCallCheck(this, Dt);
  }
  return _createClass(Dt, null, [{
    key: "resetSubmit",
    value: function resetSubmit(e, t) {
      t ? e.unsetCustomStateStyles(["loading", "submit"]) : e.unsetCustomStateStyles(["stop", "loading", "submit"]), e.reapplyStateStyle("submit");
    }
  }, {
    key: "overwriteDefaultStyleWithSubmit",
    value: function overwriteDefaultStyleWithSubmit(e, t) {
      if (!e.submit) return;
      var n = JSON.parse(JSON.stringify(e[t] || {}));
      Ee.overwritePropertyObjectFromAnother(n, e.submit, ["container", x]), Ee.overwritePropertyObjectFromAnother(n, e.submit, [h, "styles", x]), Ee.overwritePropertyObjectFromAnother(n, e.submit, ["svg", "styles", x]), e[t] = n;
    }
    // prettier-ignore
  }, {
    key: "setUpDisabledButton",
    value: function setUpDisabledButton(e) {
      Ee.setPropertyValueIfDoesNotExist(e, ["submit", "container", x, "backgroundColor"], ""), Ee.setPropertyValueIfDoesNotExist(e, ["disabled", "container", x, "backgroundColor"], "unset"), Ee.setPropertyValueIfDoesNotExist(e.submit, ["svg", "styles", x, "filter"], ""), Ee.setPropertyValueIfDoesNotExist(e.disabled, ["svg", "styles", x, "filter"], "brightness(0) saturate(100%) invert(70%) sepia(0%) saturate(5564%) hue-rotate(207deg) brightness(100%) contrast(97%)"), Ee.setPropertyValueIfDoesNotExist(e.disabled, [h, "styles", x, "color"], "grey"), Dt.overwriteDefaultStyleWithSubmit(e, "disabled");
    }
  }, {
    key: "process",
    value: function process(e) {
      var t = JSON.parse(JSON.stringify(e || {}));
      return Dt.overwriteDefaultStyleWithSubmit(t, "loading"), Dt.overwriteDefaultStyleWithSubmit(t, "stop"), e != null && e.alwaysEnabled || Dt.setUpDisabledButton(t), t;
    }
  }]);
}();
var $n = /*#__PURE__*/function (_Jt6) {
  // prettier-ignore
  function $n(e, t, n, s, r, o) {
    var _this107;
    _classCallCheck(this, $n);
    var a = Dt.process(e.submitButtonStyles),
      c = Ld,
      l = Qe.tryCreateConfig("Submit", a == null ? void 0 : a.tooltip);
    _this107 = _callSuper(this, $n, [$n.createButtonContainerElement(), c, a == null ? void 0 : a.position, l, a]), _this107._isSVGLoadingIconOverriden = !1, _this107.status = {
      requestInProgress: !1,
      loadingActive: !1
    }, _this107._messages = n, _this107._textInput = t, _this107._fileAttachments = r, _this107._innerElements = _this107.createInnerElementsForStates(), _this107._stopClicked = {
      listener: function listener() {}
    }, _this107._serviceIO = s, _this107._alwaysEnabled = !!(a != null && a.alwaysEnabled), e.disableSubmitButton = _this107.disableSubmitButton.bind(_assertThisInitialized(_this107), s), _this107.attemptOverwriteLoadingStyle(e), o.microphone && _this107.setUpSpeechToText(o.microphone.button, e.speechToText), setTimeout(function () {
      var d;
      _this107._validationHandler = e._validationHandler, _this107.assignHandlers(_this107._validationHandler), (d = _this107._validationHandler) == null || d.call(_assertThisInitialized(_this107));
    });
    return _this107;
  }
  _inherits($n, _Jt6);
  return _createClass($n, [{
    key: "createInnerElementsForStates",
    value: function createInnerElementsForStates() {
      var _this$createCustomEle = this.createCustomElements(),
        e = _this$createCustomEle.submit,
        t = _this$createCustomEle.loading,
        n = _this$createCustomEle.stop;
      return {
        submit: e,
        loading: t || [$n.createLoadingIconElement()],
        stop: n || [$n.createStopIconElement()],
        disabled: this.createDisabledIconElement(e)
      };
    }
  }, {
    key: "createCustomElements",
    value: function createCustomElements() {
      var _this108 = this;
      var e = ot.createCustomElements("submit", this.svg, this.customStyles),
        t = {
          loading: void 0,
          stop: void 0
        };
      return Object.keys(t).forEach(function (n) {
        var s = n,
          r = ot.createCustomElements(s, _this108.svg, _this108.customStyles);
        r && (t[s] = r);
      }), t.submit = e || this.buildDefaultIconElement("submit-icon"), t;
    }
  }, {
    key: "createDisabledIconElement",
    value: function createDisabledIconElement(e) {
      return ot.createCustomElements("disabled", this.svg, this.customStyles) || [e[0].cloneNode(!0)];
    }
    // prettier-ignore
  }, {
    key: "attemptOverwriteLoadingStyle",
    value: function attemptOverwriteLoadingStyle(e) {
      var t, n, s, r, o, a, c, l, d;
      if (!((n = (t = this.customStyles) == null ? void 0 : t.submit) != null && n.svg || (o = (r = (s = this.customStyles) == null ? void 0 : s.loading) == null ? void 0 : r.svg) != null && o.content || (l = (c = (a = this.customStyles) == null ? void 0 : a.loading) == null ? void 0 : c[h]) != null && l.content) && (e.displayLoadingBubble === void 0 || e.displayLoadingBubble === !0)) {
        var p = S("style");
        p.textContent = "\n        .loading-button > * {\n          filter: brightness(0) saturate(100%) invert(72%) sepia(0%) saturate(3044%) hue-rotate(322deg) brightness(100%)\n            contrast(96%) !important;\n        }", (d = e.shadowRoot) == null || d.appendChild(p), this._isSVGLoadingIconOverriden = !0;
      }
    }
  }, {
    key: "assignHandlers",
    value: function assignHandlers(e) {
      this._serviceIO.completionsHandlers = {
        onFinish: this.resetSubmit.bind(this, e)
      }, this._serviceIO.streamHandlers = {
        onOpen: this.changeToStopIcon.bind(this),
        onClose: this.resetSubmit.bind(this, e),
        stopClicked: this._stopClicked
      };
      var t = this._serviceIO.stream;
      _typeof(t) == "object" && typeof t.simulation == "number" && (this._serviceIO.streamHandlers.simulationInterim = t.simulation);
    }
  }, {
    key: "setUpSpeechToText",
    value: function setUpSpeechToText(e, t) {
      this._microphoneButton = e, this._stopSTTAfterSubmit = _typeof(t) == "object" ? t.stopAfterSubmit : !1;
    }
  }, {
    key: "resetSubmit",
    value: function resetSubmit(e) {
      this.status.requestInProgress = !1, this.status.loadingActive = !1, e();
    }
  }, {
    key: "submitFromInput",
    value: function () {
      var _submitFromInput = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee178() {
        var _this109 = this;
        var e, t;
        return _regenerator().w(function (_context178) {
          while (1) switch (_context178.n) {
            case 0:
              _context178.n = 1;
              return this._fileAttachments.completePlaceholders();
            case 1:
              e = this._fileAttachments.getAllFileData();
              if (this._textInput.isTextInputEmpty()) this.attemptSubmit(_defineProperty(_defineProperty({}, h, ""), y, e));else {
                t = this._textInput.inputElementRef.innerText.trim();
                this.attemptSubmit(_defineProperty(_defineProperty({}, h, t), y, e));
              }
              (Oe.IS_SAFARI || Oe.IS_MOBILE) && setTimeout(function () {
                return Ht.focusEndOfInput(_this109._textInput.inputElementRef);
              });
            case 2:
              return _context178.a(2);
          }
        }, _callee178, this);
      }));
      function submitFromInput() {
        return _submitFromInput.apply(this, arguments);
      }
      return submitFromInput;
    }()
  }, {
    key: "programmaticSubmit",
    value: function () {
      var _programmaticSubmit = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee179(e) {
        var _this110 = this;
        var t;
        return _regenerator().w(function (_context179) {
          while (1) switch (_context179.n) {
            case 0:
              typeof e == "string" && (e = me.processSubmitUserMessage(e));
              t = _defineProperty({}, h, e[h]);
              e[y] && (t[y] = Array.from(e[y]).map(function (n) {
                return {
                  file: n,
                  type: ft.getTypeFromBlob(n)
                };
              })), e.custom && (t.custom = e.custom), setTimeout(function () {
                return _this110.attemptSubmit(t, !0);
              });
            case 1:
              return _context179.a(2);
          }
        }, _callee179);
      }));
      function programmaticSubmit(_x331) {
        return _programmaticSubmit.apply(this, arguments);
      }
      return programmaticSubmit;
    }() // TO-DO - should be disabled when loading history
  }, {
    key: "attemptSubmit",
    value: function () {
      var _attemptSubmit = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee180(e) {
        var _this111 = this;
        var t,
          r,
          o,
          a,
          c,
          n,
          s,
          _args180 = arguments,
          _t50,
          _t51,
          _t52;
        return _regenerator().w(function (_context180) {
          while (1) switch (_context180.n) {
            case 0:
              t = _args180.length > 1 && _args180[1] !== undefined ? _args180[1] : !1;
              _context180.n = 1;
              return (r = this._validationHandler) == null ? void 0 : r.call(this, t ? e : void 0);
            case 1:
              _t50 = _context180.v;
              _t51 = !1;
              if (!(_t50 === _t51)) {
                _context180.n = 2;
                break;
              }
              return _context180.a(2);
            case 2:
              this.changeToLoadingIcon();
              this._textInput.clear();
              Oe.IS_MOBILE && setTimeout(function () {
                return _this111._textInput.inputElementRef.focus();
              });
              _t52 = typeof this._messages.focusMode != "boolean" && (o = this._messages.focusMode) != null && o.fade;
              if (!_t52) {
                _context180.n = 3;
                break;
              }
              _context180.n = 3;
              return Es.fadeAnimation(this._messages.elementRef, this._messages.focusMode.fade);
            case 3:
              _context180.n = 4;
              return this.addNewMessage(e);
            case 4:
              this._serviceIO.isWebModel() || this._messages.addLoadingMessage();
              n = (a = e[y]) == null ? void 0 : a.map(function (l) {
                return l[le];
              }), s = _defineProperty(_defineProperty({}, h, e[h] === "" ? void 0 : e[h]), y, n);
              _context180.n = 5;
              return this._serviceIO.callAPI(s, this._messages);
            case 5:
              (c = this._fileAttachments) == null || c.hideFiles();
            case 6:
              return _context180.a(2);
          }
        }, _callee180, this);
      }));
      function attemptSubmit(_x332) {
        return _attemptSubmit.apply(this, arguments);
      }
      return attemptSubmit;
    }()
  }, {
    key: "addNewMessage",
    value: function () {
      var _addNewMessage = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee181(_ref211) {
        var e, t, n, s, _t53;
        return _regenerator().w(function (_context181) {
          while (1) switch (_context181.n) {
            case 0:
              e = _ref211.text, t = _ref211.files, n = _ref211.custom;
              s = {
                role: U,
                custom: n
              };
              e && (s[h] = e);
              _t53 = t;
              if (!_t53) {
                _context181.n = 2;
                break;
              }
              _context181.n = 1;
              return this._messages.addMultipleFiles(t, this._fileAttachments);
            case 1:
              s[y] = _context181.v;
            case 2:
              this._serviceIO.sessionId && (s._sessionId = this._serviceIO.sessionId);
              Object.keys(s).length > 0 && this._messages.addNewMessage(s);
            case 3:
              return _context181.a(2);
          }
        }, _callee181, this);
      }));
      function addNewMessage(_x333) {
        return _addNewMessage.apply(this, arguments);
      }
      return addNewMessage;
    }()
  }, {
    key: "stopStream",
    value: function stopStream() {
      var e, t, n;
      (t = (e = this._serviceIO.streamHandlers).onAbort) == null || t.call(e), (n = this._stopClicked) == null || n.listener(), this._validationHandler && this.resetSubmit(this._validationHandler);
    }
  }, {
    key: "changeToStopIcon",
    value: function changeToStopIcon() {
      this._serviceIO.websocket || (this.elementRef[m].remove(Kt, mn, Kt), te.removeAriaAttributes(this.elementRef), this.changeElementsByState(this._innerElements.stop), this.reapplyStateStyle("stop", ["loading", "submit"]), this.elementRef.onclick = this.stopStream.bind(this), this.status.loadingActive = !1);
    }
  }, {
    key: "changeToLoadingIcon",
    value: function changeToLoadingIcon() {
      this._serviceIO.websocket || (this._isSVGLoadingIconOverriden || this.changeElementsByState(this._innerElements.loading), this.elementRef[m].remove(Kt, mn), te.removeAriaDisabled(this.elementRef), this.elementRef[m].add(Ys), te.addAriaBusy(this.elementRef), this.reapplyStateStyle("loading", ["submit"]), this.elementRef.onclick = function () {}, this.status.requestInProgress = !0, this.status.loadingActive = !0);
    }
    // called every time when user triggers an input via ValidationHandler - hence use class to check if not already present
  }, {
    key: "changeToSubmitIcon",
    value: function changeToSubmitIcon() {
      var _this112 = this;
      this.elementRef[m].contains(Kt) || (this.elementRef[m].remove(Ys, mn), te.removeAriaAttributes(this.elementRef), this.elementRef[m].add(Kt), this.changeElementsByState(this._innerElements.submit), Dt.resetSubmit(this, this.status.loadingActive), this.elementRef.onclick = function () {
        var e;
        _this112.submitFromInput(), (e = _this112._microphoneButton) != null && e.isActive && rs.toggleSpeechAfterSubmit(_this112._microphoneButton.elementRef, !!_this112._stopSTTAfterSubmit), setTimeout(function () {
          return Ht.focusEndOfInput(_this112._textInput.inputElementRef);
        });
      });
    }
    // called every time when user triggers an input via ValidationHandler - hence use class to check if not already present
  }, {
    key: "changeToDisabledIcon",
    value: function changeToDisabledIcon() {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !1;
      this._alwaysEnabled && !e ? this.changeToSubmitIcon() : this.elementRef[m].contains(mn) || (this.elementRef[m].remove(Ys, Kt), te.removeAriaBusy(this.elementRef), this.elementRef[m].add(mn), te.addAriaDisabled(this.elementRef), this.changeElementsByState(this._innerElements.disabled), this.reapplyStateStyle("disabled", ["submit"]), this.elementRef.onclick = function () {});
    }
  }, {
    key: "disableSubmitButton",
    value: function disableSubmitButton(e, t) {
      var n;
      e.isSubmitProgrammaticallyDisabled = t !== !1, !(this.status.requestInProgress || this.status.loadingActive) && (t === !1 ? (n = this._validationHandler) == null || n.call(this) : this.changeToDisabledIcon(!0));
    }
  }], [{
    key: "createButtonContainerElement",
    value: function createButtonContainerElement() {
      var e = S();
      return e[m].add("input-button"), e;
    }
  }, {
    key: "createLoadingIconElement",
    value: function createLoadingIconElement() {
      var e = S();
      return e[m].add("loading-submit-button"), e;
    }
  }, {
    key: "createStopIconElement",
    value: function createStopIconElement() {
      var e = S();
      return e.id = "stop-icon", e;
    }
  }]);
}(Jt);
var Bd = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<svg viewBox=\"0 0 32 32\" xmlns=\"http://www.w3.org/2000/svg\">\n  <path d=\"M27.1 14.313V5.396L24.158 8.34c-2.33-2.325-5.033-3.503-8.11-3.503C9.902 4.837 4.901 9.847 4.899 16c.001 6.152 5.003 11.158 11.15 11.16 4.276 0 9.369-2.227 10.836-8.478l.028-.122h-3.23l-.022.068c-1.078 3.242-4.138 5.421-7.613 5.421a8 8 0 0 1-5.691-2.359A7.993 7.993 0 0 1 8 16.001c0-4.438 3.611-8.049 8.05-8.049 2.069 0 3.638.58 5.924 2.573l-3.792 3.789H27.1z\"/>\n</svg>\n",
  Dd = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<svg viewBox=\"0 0 32 32\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\">\n  <path d=\"M0 16q0 3.264 1.28 6.208t3.392 5.12 5.12 3.424 6.208 1.248 6.208-1.248 5.12-3.424 3.392-5.12 1.28-6.208-1.28-6.208-3.392-5.12-5.088-3.392-6.24-1.28q-3.264 0-6.208 1.28t-5.12 3.392-3.392 5.12-1.28 6.208zM4 16q0-3.264 1.6-6.016t4.384-4.352 6.016-1.632 6.016 1.632 4.384 4.352 1.6 6.016-1.6 6.048-4.384 4.352-6.016 1.6-6.016-1.6-4.384-4.352-1.6-6.048z\"></path>\n</svg>\n",
  Fd = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<svg viewBox=\"0 0 1024 1024\" xmlns=\"http://www.w3.org/2000/svg\">\n  <path d=\"M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z\"/>\n</svg>",
  Ud = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n  <path d=\"M4.89163 13.2687L9.16582 17.5427L18.7085 8\" stroke=\"#000000\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n</svg>";
var Ki = /*#__PURE__*/function (_Bt) {
  // prettier-ignore
  function Ki(e, t, n, s) {
    var _this113;
    _classCallCheck(this, Ki);
    _this113 = _callSuper(this, Ki, [e, ["modal-content", "modal-camera-content"], n]), _this113._stopped = !1, _this113._format = "image/png", _this113._canvas = S("canvas"), _this113._canvas[m].add("camera-modal-canvas");
    var _this113$addButtonsAn = _this113.addButtonsAndTheirEvents(t),
      r = _this113$addButtonsAn.captureButton,
      o = _this113$addButtonsAn.submitButton;
    _this113._captureButton = r, _this113._submitButton = o, _this113._captureIcon = _this113._captureButton.children[0], _this113._refreshIcon = bt.createSVGElement(Bd), _this113._refreshIcon[m].add("modal-svg-button-icon", "modal-svg-refresh-icon"), (s == null ? void 0 : s.format) === "jpeg" && (_this113._format = "image/jpeg"), s != null && s.dimensions && (_this113._dimensions = s.dimensions), _this113._contentRef.appendChild(_this113._canvas), _this113.extensionCloseCallback = _this113.stop;
    return _this113;
  }
  _inherits(Ki, _Bt);
  return _createClass(Ki, [{
    key: "addButtonsAndTheirEvents",
    value: function addButtonsAndTheirEvents(e) {
      var t = Bt.createSVGButton(Dd);
      t[m].add("modal-svg-camera-button"), t.children[0][m].add("modal-svg-camera-icon");
      var n = this.addCloseButton(Fd, !0);
      n[m].add("modal-svg-close-button"), n.children[0][m].add("modal-svg-close-icon");
      var s = Bt.createSVGButton(Ud);
      return s[m].add("modal-svg-submit-button"), this.addButtons(t, s), this.addButtonEvents(t, n, s, e), {
        captureButton: t,
        submitButton: s
      };
    }
    // prettier-ignore
  }, {
    key: "addButtonEvents",
    value: function addButtonEvents(e, t, n, s) {
      var _this114 = this;
      e.onclick = function () {
        _this114.capture();
      }, t.addEventListener(H, this.stop.bind(this)), n.onclick = function () {
        var r = _this114.getFile();
        r && ls.addFilesToType([r], [s]), _this114.stop(), _this114.close();
      };
    }
  }, {
    key: "stop",
    value: function stop() {
      var _this115 = this;
      this._mediaStream && this._mediaStream.getTracks().forEach(function (e) {
        return e.stop();
      }), this._stopped = !0, setTimeout(function () {
        _this115._captureButton.replaceChildren(_this115._captureIcon), _this115._captureButton[m].replace("modal-svg-refresh-button", "modal-svg-camera-button");
        var e = _this115._canvas.getContext("2d");
        e == null || e.clearRect(0, 0, _this115._canvas.width, _this115._canvas.height);
      }, Bt.MODAL_CLOSE_TIMEOUT_MS);
    }
  }, {
    key: "start",
    value: function start() {
      var _this116 = this;
      this._dataURL = void 0, this._submitButton[m].add("modal-svg-submit-disabled"), this._stopped = !1, navigator.mediaDevices.getUserMedia({
        video: this._dimensions || !0
      }).then(function (e) {
        if (_this116._mediaStream = e, !_this116.isOpen()) return _this116.stop();
        var t = S("video");
        t.srcObject = e, t.play(), requestAnimationFrame(_this116.updateCanvas.bind(_this116, t, _this116._canvas));
      })["catch"](function (e) {
        console[f](e), _this116.stop(), _this116.close();
      });
    }
  }, {
    key: "capture",
    value: function capture() {
      this._dataURL ? (this._captureButton.replaceChildren(this._captureIcon), this._captureButton[m].replace("modal-svg-refresh-button", "modal-svg-camera-button"), this._submitButton[m].add("modal-svg-submit-disabled"), this._dataURL = void 0) : (this._captureButton.replaceChildren(this._refreshIcon), this._captureButton[m].replace("modal-svg-camera-button", "modal-svg-refresh-button"), this._submitButton[m].remove("modal-svg-submit-disabled"), this._dataURL = this._canvas.toDataURL());
    }
  }, {
    key: "getFile",
    value: function getFile() {
      if (this._dataURL) {
        var e = atob(this._dataURL.split(",")[1]),
          t = new Array(e.length);
        for (var a = 0; a < e.length; a++) t[a] = e.charCodeAt(a);
        var _n15 = new Uint8Array(t),
          s = new Blob([_n15], {
            type: this._format
          }),
          r = this._format === "image/jpeg" ? "jpeg" : "png",
          o = To.getFileName(this._newFilePrefix || "photo", r);
        return new File([s], o, {
          type: s.type
        });
      }
    }
  }, {
    key: "updateCanvas",
    value: function updateCanvas(e, t) {
      if (!this._stopped) {
        if (!this._dataURL) {
          t.width = e.videoWidth, t.height = e.videoHeight;
          var _n16 = t.getContext("2d");
          _n16 == null || _n16.drawImage(e, 0, 0, t.width, t.height);
        }
        requestAnimationFrame(this.updateCanvas.bind(this, e, t));
      }
    }
  }, {
    key: "openCameraModal",
    value: function openCameraModal(e) {
      this.displayModalElements(), e.start();
    }
    // prettier-ignore
  }], [{
    key: "createCameraModalFunc",
    value: function createCameraModalFunc(e, t, n, s) {
      var r = new Ki(e, t, n, s);
      return r.openCameraModal.bind(r, r);
    }
  }]);
}(Bt);
var Hd = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<svg viewBox=\"0 0 32 32\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\">\n  <path d=\"M29 7h-4.599l-2.401-4h-12l-2.4 4h-4.6c-1 0-3 1-3 2.969v16.031c0 1.657 1.5 3 2.792 3h26.271c1.313 0 2.938-1.406 2.938-2.968v-16.032c0-1-1-3-3-3zM30 26.032c0 0.395-0.639 0.947-0.937 0.969h-26.265c-0.232-0.019-0.797-0.47-0.797-1v-16.031c0-0.634 0.851-0.953 1-0.969h5.732l2.4-4h9.802l1.785 3.030 0.55 0.97h5.731c0.705 0 0.99 0.921 1 1v16.032zM16 10c-3.866 0-7 3.134-7 7s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7zM16 22c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z\"></path>\n</svg>";
var Wi = /*#__PURE__*/function (_Jt7) {
  function Wi(e, t, n) {
    var _this117;
    _classCallCheck(this, Wi);
    var l, d, p, u, g, v;
    var s = (l = n == null ? void 0 : n.button) == null ? void 0 : l.position,
      r = ((u = (p = (d = n == null ? void 0 : n.button) == null ? void 0 : d.styles) == null ? void 0 : p[h]) == null ? void 0 : u.content) || "Photo",
      o = Qe.tryCreateConfig("Camera", (g = n == null ? void 0 : n.button) == null ? void 0 : g.tooltip),
      a = ((v = n == null ? void 0 : n.button) == null ? void 0 : v.styles) || {};
    _this117 = _callSuper(this, Wi, [Wi.createButtonElement(), Hd, s, o, a, r]);
    var c = _this117.createInnerElementsForStates(_this117.customStyles);
    n && _this117.addClickEvent(e, t, n.modalContainerStyle, n[y]), _this117.changeElementsByState(c.styles), _this117.reapplyStateStyle("styles");
    return _this117;
  }
  _inherits(Wi, _Jt7);
  return _createClass(Wi, [{
    key: "createInnerElementsForStates",
    value: function createInnerElementsForStates(e) {
      return {
        styles: this.createInnerElements("camera-icon", "styles", e)
      };
    }
  }, {
    key: "addClickEvent",
    value:
    // prettier-ignore
    function addClickEvent(e, t, n, s) {
      var r = Ki.createCameraModalFunc(e, t, n, s);
      this.elementRef.onclick = r;
    }
  }], [{
    key: "createButtonElement",
    value: function createButtonElement() {
      var e = S();
      return e[m].add("input-button"), e;
    }
  }]);
}(Jt);
var Zt = /*#__PURE__*/function () {
  function Zt(e, t, n, s) {
    _classCallCheck(this, Zt);
    this.elementRef = Zt.createPanelElement(e.inputAreaStyle);
    var r = {},
      o = this.createFileUploadComponents(e, n, s, r),
      a = new _s(e, n, o);
    e.speechToText && !r.microphone && (r.microphone = {
      button: new rs(e, a, t.addNewErrorMessage.bind(t))
    });
    var c = new $n(e, a, t, n, o, r);
    a.submit = c.submitFromInput.bind(c), Rt.attach(e, n, a, o, c), e.submitUserMessage = c.programmaticSubmit.bind(c), r.submit = {
      button: c
    }, e.customButtons && Ft.add(e, r), Zt.addElements(this.elementRef, a, r, s, o, e.dropupStyles), Zt.assignOnInput(e, n, o, a);
  }
  return _createClass(Zt, [{
    key: "createFileUploadComponents",
    value:
    // prettier-ignore
    function createFileUploadComponents(e, t, n, s) {
      var o, a, c, l;
      var r = new ls(this.elementRef, e.attachmentContainerStyle, t.demo);
      if (Zt.createUploadButtons(e, t, t.fileTypes || {}, r, n, s), (o = t[Re]) != null && o[y]) {
        var d = ((a = s[z]) == null ? void 0 : a.fileType) || r.addType(e, t, t[Re][y], z);
        s[Re] = {
          button: new Wi(n, d, t[Re])
        };
      }
      if ((c = t.recordAudio) != null && c[y]) {
        var _d3 = ((l = s[P]) == null ? void 0 : l.fileType) || r.addType(e, t, t.recordAudio[y], P);
        s.microphone = {
          button: new Pd(_d3, t.recordAudio)
        };
      }
      return pt.isEnabled(r, e.dragAndDrop) && pt.create(n, r, e.dragAndDrop), r;
    }
    // prettier-ignore
  }], [{
    key: "createPanelElement",
    value: function createPanelElement(e) {
      var t = S();
      return t.id = "input", Object.assign(t[_], e), t;
    }
  }, {
    key: "createUploadButtons",
    value: function createUploadButtons(e, t, n, s, r, o) {
      Object.keys(n).forEach(function (a) {
        var c = a,
          l = n[c];
        if (l[y]) {
          var d = s.addType(e, t, l[y], c),
            _fd$c = fd[c],
            p = _fd$c.id,
            u = _fd$c.svgString,
            g = _fd$c.dropupText,
            v = new Bs(r, d, l, p, u, g);
          o[c] = {
            button: v,
            fileType: d
          };
        }
      });
    }
    // prettier-ignore
  }, {
    key: "addElements",
    value: function addElements(e, t, n, s, r, o) {
      X.addElements(e, t.elementRef);
      var a = ln.create(),
        c = Ae.addButtons(a, n, s, o);
      qn.set(t.inputElementRef, a, r.elementRef, c), ln.add(e, a);
    }
  }, {
    key: "assignOnInput",
    value: function assignOnInput(e, t, n, s) {
      t.onInput = function (r) {
        setTimeout(function () {
          var o = n.getAllFileData(),
            a = s.inputElementRef.innerText.trim(),
            c = _defineProperty({}, h, a);
          o && (c[y] = o.map(function (l) {
            return l[le];
          })), qt.onInput(e, c, r);
        });
      };
    }
  }]);
}();
var Xi = /*#__PURE__*/function () {
  function Xi() {
    _classCallCheck(this, Xi);
  }
  return _createClass(Xi, null, [{
    key: "createElements",
    value: function createElements(e, t, n) {
      var s = S();
      s.id = "chat-view";
      var r = new qe(e, t, n);
      t.websocket && _e.createConnection(t, r);
      var o = new Zt(e, r, t, s);
      return X.addElements(s, r.elementRef, o.elementRef), s;
    }
  }, {
    key: "render",
    value: function render(e, t, n, s) {
      var r = Xi.createElements(e, n, s);
      t.replaceChildren(r), n.isCustomView() && n.setUpView(r, t);
    }
  }]);
}();
var jd = "#validate-property-key-view{height:100%;position:relative;display:flex;justify-content:center;align-items:center;padding:8px}#loading-validate-key-property{display:inline-block;width:50px;height:50px}#loading-validate-key-property:after{content:\" \";display:block;width:38px;height:38px;margin:1px;border-radius:50%;border:5px solid #5fb2ff;border-color:#5fb2ff transparent #5fb2ff transparent;animation:loading-spinner 1.4s linear infinite}#deep-chat-openai-realtime-container{height:100%;width:100%}#deep-chat-openai-realtime-avatar-container{height:60%;width:100%;display:flex;justify-content:center;align-items:center}#deep-chat-openai-realtime-avatar{border-radius:50%;height:110px;border:1px solid rgb(215,215,215);padding:8px;-webkit-user-select:none;user-select:none;margin-top:20px}#deep-chat-openai-realtime-buttons-container{height:40%;display:flex;position:relative}.deep-chat-openai-realtime-button-container{height:100%;width:50%;display:flex;justify-content:center;align-items:center}.deep-chat-openai-realtime-button{width:70px;height:70px;border-radius:50%;display:flex;justify-content:center;align-items:center;cursor:pointer}.deep-chat-openai-realtime-button-default{background-color:#e3e3e3}.deep-chat-openai-realtime-button-default:hover{background-color:#d4d4d4}.deep-chat-openai-realtime-button-default:active{background-color:#c5c5c5}.deep-chat-openai-realtime-button-loading{opacity:.7;pointer-events:none}.deep-chat-openai-realtime-microphone-active{background-color:#ffe7e7}.deep-chat-openai-realtime-microphone-active:hover{background-color:#ffdede}.deep-chat-openai-realtime-microphone-active:active{background-color:#ffd2d2}.deep-chat-openai-realtime-microphone>*{height:30px;width:30px}.deep-chat-openai-realtime-microphone-active>*{filter:brightness(0) saturate(100%) invert(35%) sepia(60%) saturate(1360%) hue-rotate(325deg) brightness(95%) contrast(92%)}.deep-chat-openai-realtime-toggle>*{height:32px;width:32px;padding-left:3px;filter:brightness(0) saturate(100%) invert(22%) sepia(0%) saturate(4537%) hue-rotate(208deg) brightness(105%) contrast(91%)}.deep-chat-openai-realtime-button-unavailable{opacity:.45;pointer-events:none}#deep-chat-openai-realtime-error{color:red;position:absolute;top:calc(50% + 40px);left:50%;transform:translate(-50%,-50%);font-size:17px}#deep-chat-openai-realtime-loading{position:absolute;font-size:15px;top:50%;left:50%;transform:translate(-50%,-50%)}#insert-key-view{height:100%;position:relative}#insert-key-contents{text-align:center;position:absolute;top:44%;left:50%;transform:translate(-50%,-50%);width:82%;display:flex;max-width:700px}#insert-key-title{margin-bottom:15px}#insert-key-input-container{margin-right:2.7em;width:calc(100% - 80px)}#insert-key-input{padding:.3em 1.7em .3em .3em;border-width:1px;border-style:solid;border-radius:3px;width:100%;font-size:inherit}.insert-key-input-valid{border-color:gray}.insert-key-input-invalid{border-color:red}#visibility-icon-container{position:relative;float:right;cursor:pointer;-webkit-user-select:none;user-select:none}.visibility-icon{filter:brightness(0) saturate(100%) invert(63%) sepia(1%) saturate(9%) hue-rotate(43deg) brightness(98%) contrast(92%);position:absolute;right:-1.7em;top:-1.43em}#visible-icon{top:-1.4em}.visibility-icon:hover{filter:unset}.visibility-icon>*{pointer-events:none}#start-button{border:1px solid grey;color:#454545;border-radius:4px;width:3em;display:flex;justify-content:center;align-items:center;cursor:pointer;padding:.28em .3em;-webkit-user-select:none;user-select:none;background-color:#fff}#start-button:hover{background-color:#f2f2f2}#start-button:active{background-color:#d2d2d2}#insert-key-help-text-container{width:100%;position:absolute;margin-top:32px;margin-bottom:20px}#insert-key-help-text-contents{width:100%;position:absolute}#insert-key-input-invalid-text{display:block;margin-top:1em;margin-bottom:.5em;color:red}.insert-key-input-help-text{display:block;margin-top:16px}#loading-key{display:inline-block;width:16px;height:16px}#loading-key:after{content:\" \";display:block;width:11px;height:11px;margin:1px;border-radius:50%;border:2px solid #0084ff;border-color:#0084ff transparent #0084ff transparent;animation:loading-spinner 1.2s linear infinite}#error-view{color:red;font-size:1.2em;line-height:1.3em;margin-top:-5px;text-align:center;height:100%;display:flex;justify-content:center;align-items:center;padding-left:8px;padding-right:8px}@keyframes loading-spinner{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.intro-panel{position:absolute;display:flex;justify-content:center;right:0;bottom:0;left:0;margin:auto;height:fit-content;top:-2.5em}pre code.hljs{display:block;overflow-x:auto;padding:1em}code.hljs{padding:3px 5px}/*!\n  Theme: a11y-dark\n  Author: @ericwbailey\n  Maintainer: @ericwbailey\n\n  Based on the Tomorrow Night Eighties theme: https://github.com/isagalaev/highlight.js/blob/master/src/styles/tomorrow-night-eighties.css\n*/.hljs{background:#2b2b2b;color:#f8f8f2}.hljs-comment,.hljs-quote{color:#d4d0ab}.hljs-deletion,.hljs-name,.hljs-regexp,.hljs-selector-class,.hljs-selector-id,.hljs-tag,.hljs-template-variable,.hljs-variable{color:#ffa07a}.hljs-built_in,.hljs-link,.hljs-literal,.hljs-meta,.hljs-number,.hljs-params,.hljs-type{color:#f5ab35}.hljs-attribute{color:gold}.hljs-addition,.hljs-bullet,.hljs-string,.hljs-symbol{color:#abe338}.hljs-section,.hljs-title{color:#00e0e0}.hljs-keyword,.hljs-selector-tag{color:#dcc6e0}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}@media screen and (-ms-high-contrast:active){.hljs-addition,.hljs-attribute,.hljs-built_in,.hljs-bullet,.hljs-comment,.hljs-link,.hljs-literal,.hljs-meta,.hljs-number,.hljs-params,.hljs-quote,.hljs-string,.hljs-symbol,.hljs-type{color:highlight}.hljs-keyword,.hljs-selector-tag{font-weight:700}}#messages{overflow:auto;overflow-anchor:none}.outer-message-container:last-child{margin-bottom:5px}.inner-message-container{display:flex;margin-left:auto;margin-right:auto;width:calc(97.5% - 24px);max-width:100%}.message-bubble{margin-top:10px;word-wrap:break-word;width:fit-content;max-width:60%;border-radius:10px;padding:.42em .55em;height:fit-content;line-height:1.26em}.user-message-text{color:#fff;background-color:#0084ff;margin-right:0;margin-left:auto}.ai-message-text{color:#000;background-color:#e4e6eb;margin-left:0;margin-right:auto}.deep-chat-last-group-messages-active{height:100%}.loading-history-message-full-view{position:absolute;height:70%;width:100%;display:flex;align-items:center}.loading-history-message-small{height:20px;margin-bottom:30px}.loading-history-message-small>div>div{scale:.6}.loading-history-message{margin-top:0;width:100%;max-width:100%;display:flex;justify-content:center;background-color:unset}.loading-history{width:70px}.loading-history div{position:absolute;width:var(--loading-history-width);height:var(--loading-history-height);margin:var(--loading-history-margin);border:var(--loading-history-border);border-radius:50%;animation:loading-spinner 1.2s cubic-bezier(.5,0,.5,1) infinite;border-color:var(--loading-history-color) transparent transparent transparent}.loading-history div:nth-child(1){animation-delay:-.45s}.loading-history div:nth-child(2){animation-delay:-.3s}.loading-history div:nth-child(3){animation-delay:-.15s}.html-message{max-width:unset}.error-message-text{margin:14px auto 10px;background-color:#f4c0c0;color:#474747;text-align:center;max-width:95%}.deep-chat-loading-message-dots-container{width:1em;padding:.6em .75em .6em 1.3em}.loading-message-dots{position:relative;width:.45em;height:.45em;border-radius:5px;background-color:var(--loading-message-color);color:var(--loading-message-color);animation:loading-message-dots 1s infinite linear alternate;animation-delay:.5s}.loading-message-dots:before,.loading-message-dots:after{content:\"\";display:inline-block;position:absolute;top:0}.loading-message-dots:before{left:-.7em;width:.45em;height:.45em;border-radius:5px;background-color:var(--loading-message-color);color:var(--loading-message-color);animation:loading-message-dots 1s infinite alternate;animation-delay:0s}.loading-message-dots:after{left:.7em;width:.45em;height:.45em;border-radius:5px;background-color:var(--loading-message-color);color:var(--loading-message-color);animation:loading-message-dots 1s infinite alternate;animation-delay:1s}@keyframes loading-message-dots{0%{background-color:var(--loading-message-color)}50%,to{background-color:var(--loading-message-color-fade)}}.message-bubble>p:first-child,.message-bubble>.partial-render-message>p:first-child,.html-wrapper>p:first-child{margin-top:0}.message-bubble>p:last-child,.message-bubble>.partial-render-message:last-child>p,.html-wrapper>p:last-child{margin-bottom:0}pre{overflow:auto;display:block;word-break:break-all;word-wrap:break-word;border-radius:7px;background:#2b2b2b;color:#f8f8f2;margin-top:.8em;margin-bottom:.8em;padding:.6em;font-size:.9em;line-height:1.5em}.image-message{padding:0;display:flex;background-color:#ddd}.image-message>*,.image-message>*>*{width:100%;border-radius:8px;display:flex}.audio-message{width:60%;max-width:300px;height:2.2em;max-height:54px;padding:0;background-color:unset}.audio-player{width:100%;height:100%}.audio-player-safari{height:fit-content;width:40px}.audio-player-safari-left{float:left}.audio-player-safari-right{float:right}.any-file-message{padding:1px}.any-file-message-contents{display:flex}.any-file-message-icon-container{width:1.3em;min-width:1.3em;position:relative;border-radius:4px;margin-left:6px;margin-right:2px}.any-file-message-icon{background-color:#fff;border-radius:4px;position:absolute;width:1em;height:1.25em;padding:1px;margin-top:auto;margin-bottom:auto;top:0;bottom:0}.any-file-message-text{padding-top:5px;overflow-wrap:anywhere;padding-bottom:5px;padding-right:7px}.message-bubble>a{color:inherit}.left-item-position{margin-right:10px}.right-item-position{margin-left:10px}.role-hidden{display:none}.avatar{padding-top:5px;width:1.5em;height:1.5em;border-radius:1px}.avatar-container{margin-top:9px}.name{margin-top:16px;font-size:15px}#drag-and-drop{position:absolute;display:none;z-index:10;height:calc(100% - 10px);width:calc(100% - 10px);background-color:#70c6ff4d;border:5px dashed #6dafff}#file-attachment-container{position:absolute;height:3.6em;width:calc(80% - 4px);top:-2.5em;border-radius:5px;overflow:auto;text-align:left;background-color:#d7d7d73b;padding-left:4px}.file-attachment{width:2.85em;height:2.85em;display:inline-flex;margin-right:.6em;margin-bottom:.44em;margin-top:4px;position:relative;background-color:#fff;border-radius:5px}.image-attachment{width:100%;height:100%;object-fit:cover;border-radius:5px}.border-bound-attachment{width:calc(100% - 2px);height:calc(100% - 2px);border:1px solid #c3c3c3;border-radius:5px;overflow:hidden}.border-bound-attachment-safari{width:calc(100% - 1px);height:calc(100% - 1px)}.audio-attachment-icon-container{cursor:pointer}.audio-attachment-icon-container:hover{background-color:#f8f8f8}.attachment-icon{left:0;right:0;bottom:0;top:2px;margin:auto;position:absolute;width:25px;-webkit-user-select:none;user-select:none}.not-removable-attachment-icon{top:0;right:0;bottom:0;left:0}.play-icon{filter:brightness(0) saturate(100%) invert(17%) sepia(0%) saturate(1392%) hue-rotate(67deg) brightness(98%) contrast(97%)}.stop-icon{filter:brightness(0) saturate(100%) invert(29%) sepia(90%) saturate(1228%) hue-rotate(198deg) brightness(93%) contrast(98%)}.audio-placeholder-text-3-digits{padding-left:.26rem}.audio-placeholder-text-4-digits{padding-left:.1rem}.any-file-attachment{padding:2px 0}.file-attachment-text-container{position:absolute;width:inherit;display:flex;align-items:center;height:100%;top:-1px}.audio-placeholder-text-3-digits-container{padding-top:1px;cursor:default}.any-file-attachment-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;padding-left:.13em;margin-left:auto;margin-right:auto}.remove-file-attachment-button{height:1.25em;width:1.25em;border:1px solid #cfcfcf;border-radius:25px;background-color:#fff;top:-4px;right:-5px;position:absolute;display:flex;justify-content:center;cursor:pointer;-webkit-user-select:none;user-select:none}.remove-file-attachment-button:hover{background-color:#e4e4e4}.remove-file-attachment-button:active{background-color:#d7d7d7}.x-icon{color:#4e4e4e;top:-.075em;position:relative;font-size:1.05em}.modal{display:none;flex-direction:column;align-items:center;justify-content:center;position:absolute;width:80%;max-width:420px;max-height:80%;margin:auto;top:0;right:0;bottom:0;left:0;z-index:3}.modal-content{border-top:1px solid rgb(217,217,217);border-left:1px solid rgb(217,217,217);border-right:1px solid rgb(217,217,217);border-top-left-radius:inherit;border-top-right-radius:inherit;background-color:#fff;overflow-y:auto;height:fit-content;max-height:calc(100% - 3.3em);width:100%}.modal-content>p{margin-left:1em;margin-right:1em}.modal-content>ul{margin-right:1em}.modal-button-panel{height:3.3em;border:1px solid;border-color:rgb(223,223,223) rgb(217,217,217) rgb(217,217,217);border-bottom-left-radius:inherit;border-bottom-right-radius:inherit;background-color:#fff;text-align:center;justify-content:center;display:flex;width:100%}.modal-button{min-width:2.5em;text-align:center;color:#fff;border-radius:5px;padding:.4em .4em .3em;height:1.25em;background-color:#3279b2;top:0;bottom:0;cursor:pointer;-webkit-user-select:none;user-select:none;margin:auto .31em}.modal-button:hover{background-color:#276da7}.modal-button:active{background-color:#1b5687}.modal-svg-button{padding:0 0 2px;width:2em;height:1.8em}.modal-svg-button-icon{width:100%;height:100%;filter:brightness(0) saturate(100%) invert(100%) sepia(15%) saturate(4%) hue-rotate(346deg) brightness(101%) contrast(102%)}#modal-background-panel{position:absolute;width:100%;height:100%;background-color:#00000042;z-index:2;display:none}.show-modal-background{animation:fadeInBackground .3s ease-in-out}@keyframes fadeInBackground{0%{opacity:0}to{opacity:1}}.show-modal{animation:fadeInModal .3s ease-in-out}@keyframes fadeInModal{0%{opacity:0;scale:.95}to{opacity:1;scale:1}}.hide-modal-background{animation:fadeOutBackground .2s ease-in-out}@keyframes fadeOutBackground{0%{opacity:1}to{opacity:0}}.hide-modal{animation:fadeOutModal .2s ease-in-out}@keyframes fadeOutModal{0%{opacity:1;scale:1}to{opacity:0;scale:.95}}.modal-camera-content{overflow:hidden;text-align:center;border:unset;height:100%;background-color:#2a2a2a;display:flex;justify-content:center}.camera-modal-canvas{max-width:100%;max-height:100%;margin-top:auto;margin-bottom:auto}.modal-svg-submit-button{background-color:green}.modal-svg-submit-button:hover{background-color:#007500}.modal-svg-submit-button:active{background-color:#006500}.modal-svg-submit-disabled{pointer-events:none;background-color:#747474}.modal-svg-close-button{height:1.56em;padding-top:.37em;padding-bottom:0;background-color:#c13e3e}.modal-svg-close-button:hover{background-color:#b43434}.modal-svg-close-button:active{background-color:#972929}.modal-svg-close-icon{width:80%;height:80%}.modal-svg-camera-button{height:1.6em;padding-top:.38em;padding-bottom:0}.modal-svg-camera-icon{height:76%}.modal-svg-refresh-icon{height:105%}.modal-svg-refresh-button{height:1.66em;padding-top:.11em;padding-bottom:.21em}.input-button-container{position:relative;z-index:1}.inside-right{position:absolute;right:calc(10% + .35em);bottom:.85em}.inside-left{position:absolute;left:calc(10% + .35em);bottom:.85em}.outside-left{position:absolute;right:calc(11px - .55em);bottom:.88em}.outside-right{position:absolute;left:calc(11px - .55em);bottom:.88em}#upload-images-icon{position:absolute;pointer-events:none;width:1.45em;height:1.45em;left:.11em;bottom:.08em;filter:brightness(0) saturate(100%) invert(43%) sepia(0%) saturate(740%) hue-rotate(77deg) brightness(99%) contrast(92%)}#upload-gifs-icon{position:absolute;pointer-events:none;width:1.5em;height:1.48em;left:.07em;bottom:.08em;filter:brightness(0) saturate(100%) invert(49%) sepia(0%) saturate(2586%) hue-rotate(12deg) brightness(93%) contrast(90%)}#upload-audio-icon{position:absolute;pointer-events:none;width:1.21em;height:1.21em;left:.17em;bottom:.2em;filter:brightness(0) saturate(100%) invert(15%) sepia(0%) saturate(337%) hue-rotate(125deg) brightness(91%) contrast(94%);transform:scaleX(.95)}#camera-icon{position:absolute;pointer-events:none;width:1.21em;height:1.21em;left:.23em;bottom:.2em;filter:brightness(0) saturate(100%) invert(52%) sepia(0%) saturate(161%) hue-rotate(164deg) brightness(91%) contrast(92%);transform:scaleX(.95)}#upload-mixed-files-icon{position:absolute;pointer-events:none;width:1.21em;height:1.21em;left:.25em;bottom:.2em;filter:brightness(0) saturate(100%) invert(53%) sepia(0%) saturate(36%) hue-rotate(74deg) brightness(98%) contrast(93%);transform:scaleX(.95)}#interim-text{color:gray}#microphone-button{padding-top:.5px}.outer-button-container>#microphone-button{padding-bottom:1px}#microphone-icon{position:absolute;pointer-events:none;width:1.21em;height:1.21em;left:.25em;bottom:.25em}.default-microphone-icon{filter:brightness(0) saturate(100%) invert(32%) sepia(0%) saturate(924%) hue-rotate(46deg) brightness(95%) contrast(99%)}.active-microphone-icon{filter:brightness(0) saturate(100%) invert(10%) sepia(97%) saturate(7495%) hue-rotate(0deg) brightness(101%) contrast(107%);border-radius:10px}.command-microphone-icon{filter:brightness(0) saturate(100%) invert(42%) sepia(96%) saturate(1067%) hue-rotate(77deg) brightness(99%) contrast(102%)}.unsupported-microphone{display:none}#submit-icon{height:100%;filter:brightness(0) saturate(100%) invert(32%) sepia(0%) saturate(924%) hue-rotate(46deg) brightness(95%) contrast(99%);width:1.21em}#stop-icon{background-color:#acacac;position:absolute;width:.95em;height:.95em;left:.35em;bottom:.35em;border-radius:2px}.submit-button-enlarged{scale:1.1;margin-right:.3em;margin-left:.3em}.loading-submit-button{position:relative;left:calc(-9990px + .275em);width:.22em;height:.22em;border-radius:5px;background-color:#848484;color:#848484;box-shadow:9990px 0 #848484,calc(9990px + .44em) 0 0 0 #848484,calc(9990px + .8em) 0 0 0 #848484;animation:loading-submit-button 1.5s infinite linear;bottom:-.75em}@keyframes loading-submit-button{0%{box-shadow:9990px 0 #848484,calc(9990px + .44em) 0 0 0 #848484,calc(9990px + .8em) 0 0 0 #848484}16.667%{box-shadow:9990px -6px #848484,calc(9990px + .44em) 0 0 0 #848484,calc(9990px + .8em) 0 0 0 #848484}33.333%{box-shadow:9990px 0 #848484,calc(9990px + .44em) 0 0 0 #848484,calc(9990px + .8em) 0 0 0 #848484}50%{box-shadow:9990px 0 #848484,calc(9990px + .44em) -6px 0 0 #848484,calc(9990px + .8em) 0 0 0 #848484}66.667%{box-shadow:9990px 0 #848484,calc(9990px + .44em) 0 0 0 #848484,calc(9990px + .8em) 0 0 0 #848484}83.333%{box-shadow:9990px 0 #848484,calc(9990px + .44em) 0 0 0 #848484,calc(9990px + .8em) -6px 0 0 #848484}to{box-shadow:9990px 0 #848484,calc(9990px + .44em) 0 0 0 #848484,calc(9990px + .8em) 0 0 0 #848484}}.tooltip{position:absolute;visibility:hidden;z-index:1;pointer-events:none;padding:5px 7px;background-color:#333;border-radius:5px;width:max-content}.tooltip-text{color:#fff;font-size:13px}.input-button{border-radius:4px;cursor:pointer;margin-bottom:.2em;-webkit-user-select:none;user-select:none}.input-button-svg{width:1.65em;height:1.65em}.input-button-svg-text{padding:1px;height:1.65em;display:flex}.input-button-svg-text>svg{padding:.22rem}.input-button-svg-text>div{margin-left:2px}.input-button:hover,.input-button:focus-visible{background-color:#9c9c9c2e}.input-button:active{background-color:#9c9c9c5e}.input-button:active:not(:hover){background-color:transparent}.loading-button{cursor:auto}.loading-button:hover{background-color:unset}.text-button{filter:unset!important;display:flex;justify-content:center;align-items:center;margin-left:4px;margin-right:4px;height:1.6em;width:max-content}#custom-icon{height:100%;width:1.2em}.custom-button-container-default{color:#505050}.custom-button-container-default>.dropup-menu-item-icon{color:unset}.custom-button-container-default>svg{filter:brightness(0) saturate(100%) invert(39%) sepia(1%) saturate(0%) hue-rotate(83deg) brightness(93%) contrast(90%)}.custom-button-container-default>.dropup-menu-item-icon>svg{position:absolute;left:.2em}.custom-button-container-active{background-color:#edf7ff;color:#0285ff}.custom-button-container-active:hover,.custom-button-container-active:focus-visible{background-color:#def0ff}.custom-button-container-active:active{background-color:#d2eaff}.custom-button-container-active>svg{filter:brightness(0) saturate(100%) invert(32%) sepia(34%) saturate(4196%) hue-rotate(196deg) brightness(107%) contrast(104%)}.custom-button-container-disabled{color:#aeaeae;cursor:auto}.custom-button-container-disabled>div{pointer-events:none}.custom-button-container-disabled:hover,.custom-button-container-disabled:focus-visible{background-color:transparent}.custom-button-container-disabled:active{background-color:transparent}.custom-button-container-disabled>svg{filter:brightness(0) saturate(100%) invert(67%) sepia(0%) saturate(818%) hue-rotate(28deg) brightness(102%) contrast(100%)}#text-input-container{background-color:#fff;width:80%;display:flex;border:1px solid #0000001a;border-radius:5px;margin-top:.8em;margin-bottom:.8em;box-shadow:#959da533 0 1px 12px;overflow-y:auto;max-height:200px;position:relative}.text-input-container-left-adjustment{margin-left:1.5em}.text-input-container-right-adjustment{margin-right:1.5em}.text-input-container-left-small-adjustment{margin-left:1.1em}.text-input-container-left-small-adjustment>.outside-left{right:calc(14px - .55em)}.text-input-container-right-small-adjustment{margin-right:1.1em}.text-input-container-right-small-adjustment>.outside-right{left:calc(14px - .55em)}#text-input{text-align:left;outline:none;word-wrap:break-word;line-break:auto}.text-input-styling{padding:.4em .5em;overflow:overlay;width:100%}.text-input-inner-left-adjustment{padding-left:2.2em}.text-input-inner-right-adjustment{padding-right:2em}.text-input-disabled{pointer-events:none;-webkit-user-select:none;user-select:none}[contenteditable]:empty:before{content:attr(deep-chat-placeholder-text);pointer-events:none}[contenteditable][textcolor]:empty:before{color:gray}.outside-right>#dropup-menu,.inside-right>#dropup-menu{right:0}#dropup-icon{position:absolute;pointer-events:none;width:1.16em;height:1.2em;left:.265em;bottom:.43em;filter:brightness(0) saturate(100%) invert(54%) sepia(0%) saturate(724%) hue-rotate(6deg) brightness(92%) contrast(90%)}.dropup-button>*{pointer-events:none}#dropup-menu{background-color:#fff;position:absolute;transform:translateY(-100%);border-radius:5px;z-index:1;top:-.49em;box-shadow:#0003 -1px 2px 10px,#0000001a 0 2px 4px;cursor:pointer;-webkit-user-select:none;user-select:none}.dropup-menu-item{height:1.4em;padding:.28em .84em .28em .35em;display:flex;position:relative}.dropup-menu-item:hover,.dropup-menu-item:focus-visible{background-color:#f3f3f3}.dropup-menu-item:active{background-color:#ebebeb}.dropup-menu-item:active:not(:hover){background-color:transparent}.dropup-menu-item:first-child{padding-top:.49em;border-top-left-radius:inherit;border-top-right-radius:inherit}.dropup-menu-item:last-child{padding-bottom:.45em;border-bottom-left-radius:inherit;border-bottom-right-radius:inherit}.dropup-menu-item-icon{width:1.39em;position:relative}.dropup-menu-item-icon>svg{bottom:0!important;top:0!important;margin-bottom:auto;margin-top:auto}#dropup-menu-item-icon-element-custom{position:absolute;pointer-events:none;width:1.21em;height:1.21em;left:.28em;filter:brightness(0) saturate(100%) invert(15%) sepia(0%) saturate(337%) hue-rotate(125deg) brightness(91%) contrast(94%)}.dropup-menu-item-text{margin-left:.56em;margin-top:.08em;width:max-content}#input{width:100%;display:inline-flex;text-align:center;margin-left:auto;margin-right:auto;margin-top:auto;position:relative;justify-content:center}#chat-view{height:100%;display:grid;grid-template-columns:100%}::-webkit-scrollbar{width:9px;height:9px}::-webkit-scrollbar-thumb{background-color:#d0d0d0;border-radius:5px}::-webkit-scrollbar-track{background-color:#f2f2f2}.deep-chat-web-model-button{margin-top:10px;margin-bottom:5px;margin-left:1px}:host{all:initial;display:table-cell}#container{height:inherit;width:inherit;overflow:hidden}";
var qd = Object.defineProperty,
  N = function N(i, e, t, n) {
    for (var s = void 0, r = i.length - 1, o; r >= 0; r--) (o = i[r]) && (s = o(e, t, s) || s);
    return s && qd(e, t, s), s;
  };
var k = /*#__PURE__*/function (_hi) {
  function k() {
    var _this118;
    _classCallCheck(this, k);
    var e;
    _this118 = _callSuper(this, k), _this118.getMessages = function () {
      return [];
    }, _this118.submitUserMessage = function () {
      return console.warn("submitUserMessage failed - please wait for chat view to render before calling this property.");
    }, _this118.addMessage = function () {
      return console.warn("addMessage failed - please wait for chat view to render before calling this property.");
    }, _this118.updateMessage = function () {}, _this118.clearMessages = function () {}, _this118.focusInput = function () {
      return Ht.focusFromParentElement(_this118._elementRef);
    }, _this118.refreshMessages = function () {}, _this118.scrollToBottom = function () {}, _this118.disableSubmitButton = function () {}, _this118.setPlaceholderText = function () {}, _this118._hasBeenRendered = !1, _this118._auxiliaryStyleApplied = !1, _this118._elementRef = S(), _this118._elementRef.id = "container", _this118.attachShadow({
      mode: "open"
    }).appendChild(_this118._elementRef), (e = _this118.shadowRoot) == null || e.appendChild(Qe.buildElement()), Fn.apply(jd, _this118.shadowRoot), setTimeout(function () {
      _this118._hasBeenRendered || _this118.onRender();
    }, 20);
    return _this118;
  }
  _inherits(k, _hi);
  return _createClass(k, [{
    key: "changeToChatView",
    value: function changeToChatView() {
      this._activeService && (this._activeService.validateKeyProperty = !1), this.onRender();
    }
    // prettier-ignore
  }, {
    key: "onRender",
    value: function onRender() {
      var _this$_childElement;
      bs.attemptAppendStyleSheetToHead(this.style), me.processConnect(this), (!this._activeService || this._activeService.demo) && (this._activeService = rd.create(this)), this.auxiliaryStyle && !this._auxiliaryStyleApplied && (Fn.apply(this.auxiliaryStyle, this.shadowRoot), this._auxiliaryStyleApplied = !0), Fn.applyDefaultStyleToComponent(this.style, this.chatStyle), me.checkForContainerStyles(this, this._elementRef), this._activeService.key && this._activeService.validateKeyProperty ? ys.render(this._elementRef, this.changeToChatView.bind(this), this._activeService) : !(this._activeService instanceof T) || this._activeService.key ? ((_this$_childElement = this._childElement) !== null && _this$_childElement !== void 0 ? _this$_childElement : this._childElement = this.children[0], Xi.render(this, this._elementRef, this._activeService, this._childElement)) : this._activeService instanceof T && xe.render(this._elementRef, this.changeToChatView.bind(this), this._activeService), this._hasBeenRendered || qt.onRender(this), this._hasBeenRendered = !0;
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      ns.chat = void 0;
    }
  }]);
}(hi);
N([O("object")], k.prototype, "connect");
N([O("object")], k.prototype, "directConnection");
N([O("object")], k.prototype, "webModel");
N([O("object")], k.prototype, "requestBodyLimits");
N([O("function")], k.prototype, "requestInterceptor");
N([O("function")], k.prototype, "responseInterceptor");
N([O("function")], k.prototype, "validateInput");
N([O("function")], k.prototype, "loadHistory");
N([O("object")], k.prototype, "chatStyle");
N([O("object")], k.prototype, "attachmentContainerStyle");
N([O("object")], k.prototype, "dropupStyles");
N([O("object")], k.prototype, "inputAreaStyle");
N([O("object")], k.prototype, "textInput");
N([O("object")], k.prototype, "submitButtonStyles");
N([O("object")], k.prototype, "customButtons");
N([O("string")], k.prototype, "auxiliaryStyle");
N([O("array")], k.prototype, "history");
N([O("object")], k.prototype, "browserStorage");
N([O("object")], k.prototype, "introMessage");
N([O("object")], k.prototype, "avatars");
N([O("object")], k.prototype, "names");
N([O("object")], k.prototype, "displayLoadingBubble");
N([O("object")], k.prototype, "errorMessages");
N([O("object")], k.prototype, "messageStyles");
N([O("object")], k.prototype, "textToSpeech");
N([O("object")], k.prototype, "speechToText");
N([O("object")], k.prototype, "images");
N([O("object")], k.prototype, "gifs");
N([O("object")], k.prototype, "camera");
N([O("object")], k.prototype, "audio");
N([O("object")], k.prototype, "microphone");
N([O("object")], k.prototype, "mixedFiles");
N([O("object")], k.prototype, "dragAndDrop");
N([O("object")], k.prototype, "htmlWrappers");
N([O("object")], k.prototype, "htmlClassUtilities");
N([O("object")], k.prototype, "remarkable");
N([O("object")], k.prototype, "focusMode");
N([O("function")], k.prototype, "onMessage");
N([O("function")], k.prototype, "onClearMessages");
N([O("function")], k.prototype, "onComponentRender");
N([O("function")], k.prototype, "onInput");
N([O("function")], k.prototype, "onError");
N([O("object")], k.prototype, "demo");
N([O("object")], k.prototype, "_insertKeyViewStyles");
customElements.define("deep-chat", k);
export { k as DeepChat };
