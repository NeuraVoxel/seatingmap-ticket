import { P as t, b as e } from "./point-BB7ElD4D.js";
var n = function (t, e) {
  return (
    (n =
      Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array &&
        function (t, e) {
          t.__proto__ = e;
        }) ||
      function (t, e) {
        for (var n in e)
          Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
      }),
    n(t, e)
  );
};
function r(t, e) {
  if ("function" != typeof e && null !== e)
    throw new TypeError(
      "Class extends value " + String(e) + " is not a constructor or null"
    );
  function r() {
    this.constructor = t;
  }
  n(t, e),
    (t.prototype =
      null === e ? Object.create(e) : ((r.prototype = e.prototype), new r()));
}
var o = function () {
  return (
    (o =
      Object.assign ||
      function (t) {
        for (var e, n = 1, r = arguments.length; n < r; n++)
          for (var o in (e = arguments[n]))
            Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
        return t;
      }),
    o.apply(this, arguments)
  );
};
function a(t, e, n, r) {
  return new (n || (n = Promise))(function (o, a) {
    function i(t) {
      try {
        s(r.next(t));
      } catch (t) {
        a(t);
      }
    }
    function c(t) {
      try {
        s(r.throw(t));
      } catch (t) {
        a(t);
      }
    }
    function s(t) {
      var e;
      t.done
        ? o(t.value)
        : ((e = t.value),
          e instanceof n
            ? e
            : new n(function (t) {
                t(e);
              })).then(i, c);
    }
    s((r = r.apply(t, e || [])).next());
  });
}
function i(t, e) {
  var n,
    r,
    o,
    a = {
      label: 0,
      sent: function () {
        if (1 & o[0]) throw o[1];
        return o[1];
      },
      trys: [],
      ops: [],
    },
    i = Object.create(
      ("function" == typeof Iterator ? Iterator : Object).prototype
    );
  return (
    (i.next = c(0)),
    (i.throw = c(1)),
    (i.return = c(2)),
    "function" == typeof Symbol &&
      (i[Symbol.iterator] = function () {
        return this;
      }),
    i
  );
  function c(c) {
    return function (s) {
      return (function (c) {
        if (n) throw new TypeError("Generator is already executing.");
        for (; i && ((i = 0), c[0] && (a = 0)), a; )
          try {
            if (
              ((n = 1),
              r &&
                (o =
                  2 & c[0]
                    ? r.return
                    : c[0]
                    ? r.throw || ((o = r.return) && o.call(r), 0)
                    : r.next) &&
                !(o = o.call(r, c[1])).done)
            )
              return o;
            switch (((r = 0), o && (c = [2 & c[0], o.value]), c[0])) {
              case 0:
              case 1:
                o = c;
                break;
              case 4:
                return a.label++, { value: c[1], done: !1 };
              case 5:
                a.label++, (r = c[1]), (c = [0]);
                continue;
              case 7:
                (c = a.ops.pop()), a.trys.pop();
                continue;
              default:
                if (
                  !((o = a.trys),
                  (o = o.length > 0 && o[o.length - 1]) ||
                    (6 !== c[0] && 2 !== c[0]))
                ) {
                  a = 0;
                  continue;
                }
                if (3 === c[0] && (!o || (c[1] > o[0] && c[1] < o[3]))) {
                  a.label = c[1];
                  break;
                }
                if (6 === c[0] && a.label < o[1]) {
                  (a.label = o[1]), (o = c);
                  break;
                }
                if (o && a.label < o[2]) {
                  (a.label = o[2]), a.ops.push(c);
                  break;
                }
                o[2] && a.ops.pop(), a.trys.pop();
                continue;
            }
            c = e.call(t, a);
          } catch (t) {
            (c = [6, t]), (r = 0);
          } finally {
            n = o = 0;
          }
        if (5 & c[0]) throw c[1];
        return { value: c[0] ? c[1] : void 0, done: !0 };
      })([c, s]);
    };
  }
}
function c(t, e, n) {
  if (n || 2 === arguments.length)
    for (var r, o = 0, a = e.length; o < a; o++)
      (!r && o in e) ||
        (r || (r = Array.prototype.slice.call(e, 0, o)), (r[o] = e[o]));
  return t.concat(r || Array.prototype.slice.call(e));
}
"function" == typeof SuppressedError && SuppressedError;
var s = (function () {
    function t(t, e, n, r) {
      (this.center = t), (this.id = e), (this.rectangle = n), (this.label = r);
    }
    return (
      (t.prototype.setLabel = function (e) {
        return new t(this.center, this.id, this.rectangle, e);
      }),
      t
    );
  })(),
  u = (function () {
    function n(t, e) {
      (this.seats = t), (this.type = e);
    }
    return (
      (n.fromJson = function (r) {
        return new n(
          r.seats.map(function (n) {
            return new s(
              t.fromJson(n.center),
              n.id,
              e.fromJson(n.rectangle),
              n.label
            );
          }),
          r.type
        );
      }),
      (n.prototype.setSeatLabels = function (t) {
        return this.setSeats(
          this.seats.map(function (e, n) {
            return e.setLabel(t[n]);
          })
        );
      }),
      (n.prototype.clearSeatLabels = function () {
        return this.setSeats(
          this.seats.map(function (t) {
            return t.setLabel(void 0);
          })
        );
      }),
      (n.prototype.setSeats = function (t) {
        return new n(t, this.type);
      }),
      n
    );
  })();
export { u as R, s as S, r as _, a, i as b, o as c, c as d };
