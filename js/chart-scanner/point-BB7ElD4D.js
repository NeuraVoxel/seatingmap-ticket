var t = (function () {
  function t(t) {
    if (((this.map = {}), t))
      for (var n = 0, i = t; n < i.length; n++) {
        var e = i[n],
          o = e[0],
          r = e[1];
        this.set(o, r);
      }
  }
  return (
    (t.prototype.clear = function () {
      this.map = {};
    }),
    (t.prototype.delete = function (t) {
      var n = void 0 !== this.map[t];
      return delete this.map[t], n;
    }),
    (t.prototype.forEach = function (t, n) {
      var i = this;
      Object.entries(this.map).forEach(function (n, e) {
        return t(n[1], n[0], i);
      }, n);
    }),
    (t.prototype.get = function (t) {
      return this.map[t];
    }),
    (t.prototype.has = function (t) {
      return Object.prototype.hasOwnProperty.call(this.map, t);
    }),
    (t.prototype.set = function (t, n) {
      return (this.map[t] = n), this;
    }),
    Object.defineProperty(t.prototype, "size", {
      get: function () {
        return Object.keys(this.map).length;
      },
      enumerable: !1,
      configurable: !0,
    }),
    (t.prototype.entries = function () {
      return Object.entries(this.map)[Symbol.iterator]();
    }),
    (t.prototype.keys = function () {
      return Object.keys(this.map)[Symbol.iterator]();
    }),
    (t.prototype.values = function () {
      return Object.values(this.map)[Symbol.iterator]();
    }),
    (t.prototype[Symbol.iterator] = function () {
      return this.entries();
    }),
    t
  );
})();
function n(t, n, i) {
  var e = Math.abs(t),
    o = Math.abs(n);
  return e >= o * i && e <= o / i;
}
function i(t, n) {
  return new g(n.x - t.x, n.y - t.y);
}
function e(t, n) {
  return t.x * n.x + t.y * n.y;
}
function o(t, n) {
  var i = ((n - t + 180) % 360) - 180;
  return Math.abs(i < -180 ? i + 360 : i);
}
function r(t) {
  return (t * Math.PI) / 180;
}
function s(t) {
  return (t > 75 && t < 115) || (t > 245 && t < 295);
}
function u(t) {
  return t > 335 || t < 25 || (t > 155 && t < 205);
}
var p = navigator.userAgent.includes("Gecko/");
function h() {
  return p ? new t() : new Map();
}
var a = (function () {
    function t(t, n) {
      (this.origin = t), (this.end = n);
    }
    return (
      (t.prototype.getOrigin = function () {
        return this.origin;
      }),
      (t.prototype.getEnd = function () {
        return this.end;
      }),
      (t.prototype.angle = function () {
        return (function (t, n, i, e) {
          var o = i - t,
            r = e - n;
          if (!o && !r) return 0;
          var s = (180 * Math.atan2(-r, -o)) / Math.PI;
          return s < 0 ? s + 360 : Math.abs(s);
        })(this.end.x, this.end.y, this.origin.x, this.origin.y);
      }),
      (t.prototype.enlarge = function (n) {
        var i = this.pointAtDistanceFromOrigin(this.length() + n);
        return new t(this.origin, i);
      }),
      (t.prototype.projectPoint = function (t) {
        var n = this.pointAtDistanceFromOrigin(50),
          i = n.x - this.origin.x,
          e = n.y - this.origin.y,
          o = i * i + e * e,
          r = ((t.x - this.origin.x) * i + (t.y - this.origin.y) * e) / o;
        return new g(this.origin.x + r * i, this.origin.y + r * e);
      }),
      (t.prototype.length = function () {
        return this.origin.distanceTo(this.end);
      }),
      (t.prototype.pointAtDistanceFromOrigin = function (t) {
        return new g(
          t * Math.cos(this.angleInRadians()) + this.origin.x,
          t * Math.sin(this.angleInRadians()) + this.origin.y
        );
      }),
      (t.prototype.angleInRadians = function () {
        return this.angle() * (Math.PI / 180);
      }),
      (t.prototype.normalLine = function () {
        return new t(this.center(), this.end).rotateAroundOrigin(90);
      }),
      (t.prototype.center = function () {
        return this.pointAtDistanceFromOrigin(this.length() / 2);
      }),
      (t.prototype.intersectionWith = function (t) {
        if (
          !(
            (this.origin.x === this.end.x && this.origin.y === this.end.y) ||
            (t.origin.x === t.end.x && t.origin.y === t.end.y)
          )
        ) {
          var n =
            (t.end.y - t.origin.y) * (this.end.x - this.origin.x) -
            (t.end.x - t.origin.x) * (this.end.y - this.origin.y);
          if (0 !== n) {
            var i =
                ((t.end.x - t.origin.x) * (this.origin.y - t.origin.y) -
                  (t.end.y - t.origin.y) * (this.origin.x - t.origin.x)) /
                n,
              e = this.origin.x + i * (this.end.x - this.origin.x),
              o = this.origin.y + i * (this.end.y - this.origin.y);
            return new g(e, o);
          }
        }
      }),
      (t.prototype.angleBetween = function (t) {
        return (function (t) {
          return t > 180 ? t - 360 : t < -180 ? t + 360 : t;
        })(t.angle() - this.angle());
      }),
      (t.prototype.rotateAroundOrigin = function (n) {
        return new t(this.origin, this.end.rotateAround(this.origin, n));
      }),
      (t.prototype.roundTo2DecimalPlaces = function () {
        return new t(
          this.origin.roundTo2DecimalPlaces(),
          this.end.roundTo2DecimalPlaces()
        );
      }),
      (t.prototype.scale = function (n) {
        return new t(
          this.origin,
          this.pointAtDistanceFromOrigin(this.length() * n)
        );
      }),
      (t.prototype.hasPoint = function (t) {
        return this.distanceToPoint(t) < 0.01;
      }),
      (t.prototype.distanceToPoint = function (t) {
        if (0 === this.length()) return t.distanceTo(this.origin);
        var n =
          ((t.x - this.origin.x) * (this.end.x - this.origin.x) +
            (t.y - this.origin.y) * (this.end.y - this.origin.y)) /
          (this.length() * this.length());
        return n < 0
          ? t.distanceTo(this.origin)
          : n > 1
          ? t.distanceTo(this.end)
          : t.distanceTo(
              this.origin.add(
                new g(
                  n * (this.end.x - this.origin.x),
                  n * (this.end.y - this.origin.y)
                )
              )
            );
      }),
      t
    );
  })(),
  c = (function () {
    function t(t) {
      this.points = t;
    }
    return (
      (t.prototype.center = function () {
        return new g(
          (this.minX() + this.maxX()) / 2,
          (this.minY() + this.maxY()) / 2
        );
      }),
      (t.prototype.width = function () {
        return this.maxX() - this.minX();
      }),
      (t.prototype.height = function () {
        return this.maxY() - this.minY();
      }),
      (t.prototype.topLeft = function () {
        return new g(this.minX(), this.minY());
      }),
      (t.prototype.bottomRight = function () {
        return new g(this.maxX(), this.maxY());
      }),
      (t.prototype.scale = function (n) {
        return new t(
          this.points.map(function (t) {
            return t.scale(n);
          })
        );
      }),
      (t.prototype.scaleRelativeToCenter = function (n) {
        var i = this.center();
        return new t(
          this.points.map(function (t) {
            return new a(i, t).scale(n).getEnd();
          })
        );
      }),
      (t.prototype.getPoints = function () {
        return this.points;
      }),
      (t.prototype.moveTo = function (t) {
        var n = this.topLeft().vectorTo(t);
        return this.move(n);
      }),
      (t.prototype.move = function (n) {
        return new t(
          this.points.map(function (t) {
            return t.add(n);
          })
        );
      }),
      (t.prototype.minX = function () {
        return Math.min.apply(
          Math,
          this.points.map(function (t) {
            return t.x;
          })
        );
      }),
      (t.prototype.maxX = function () {
        return Math.max.apply(
          Math,
          this.points.map(function (t) {
            return t.x;
          })
        );
      }),
      (t.prototype.minY = function () {
        return Math.min.apply(
          Math,
          this.points.map(function (t) {
            return t.y;
          })
        );
      }),
      (t.prototype.maxY = function () {
        return Math.max.apply(
          Math,
          this.points.map(function (t) {
            return t.y;
          })
        );
      }),
      (t.fromJson = function (n) {
        return new t(
          n.points.map(function (t) {
            return g.fromJson(t);
          })
        );
      }),
      (t.prototype.distanceTo = function (t) {
        var n = this.somePointsOnEdges().flatMap(function (n) {
          return t.somePointsOnEdges().map(function (t) {
            return n.distanceToSquared(t);
          });
        });
        return Math.sqrt(Math.min.apply(Math, n));
      }),
      (t.prototype.somePointsOnEdges = function () {
        return (
          void 0 === this.pointsOnEdges &&
            (this.pointsOnEdges = this.calculatePointsOnEdges(25)),
          this.pointsOnEdges
        );
      }),
      (t.prototype.calculatePointsOnEdges = function (t) {
        var n = [],
          i = this.circumference() / t,
          e = 0;
        return (
          this.edges().forEach(function (t) {
            for (var o = e + t.length(); ; ) {
              var r = n.length * i;
              if (r >= o) break;
              n.push(t.pointAtDistanceFromOrigin(r - e));
            }
            e += t.length();
          }),
          n
        );
      }),
      (t.prototype.circumference = function () {
        return this.edges().reduce(function (t, n) {
          return t + n.length();
        }, 0);
      }),
      (t.prototype.edges = function () {
        var t = this;
        return this.points.map(function (n, i) {
          var e = t.points[(i + 1) % t.points.length];
          return new a(n, e);
        });
      }),
      t
    );
  })(),
  f = (function () {
    function t(t) {
      if (4 !== t.length) {
        if (5 !== t.length || !t[0].equals(t[4]))
          throw new Error(
            "A rectangle must have exactly 4 points. You passed in " +
              t.length +
              " points."
          );
        t = t.slice(0, 4);
      }
      this.points = t;
    }
    return (
      (t.prototype.sidesHaveSimilarLength = function (t, i) {
        var e = n(this.longestSideLength(), t.longestSideLength(), i),
          o = n(this.shortestSideLength(), t.shortestSideLength(), i);
        return e && o;
      }),
      (t.prototype.center = function () {
        var t = (this.points[0].x + this.points[2].x) / 2,
          n = (this.points[0].y + this.points[2].y) / 2;
        return new g(t, n);
      }),
      (t.prototype.getPoints = function () {
        return this.points;
      }),
      (t.prototype.contains = function (t) {
        var n = i(this.points[0], this.points[1]),
          o = i(this.points[0], t),
          r = i(this.points[1], this.points[2]),
          s = i(this.points[1], t),
          u = e(n, o),
          p = e(n, n),
          h = e(r, s),
          a = e(r, r);
        return u >= 0 && u <= p && h >= 0 && h <= a;
      }),
      (t.prototype.longestSideLength = function () {
        var t = new a(this.points[0], this.points[1]),
          n = new a(this.points[1], this.points[2]);
        return Math.max(t.length(), n.length());
      }),
      (t.prototype.shortestSideLength = function () {
        var t = new a(this.points[0], this.points[1]),
          n = new a(this.points[1], this.points[2]);
        return Math.min(t.length(), n.length());
      }),
      (t.prototype.area = function () {
        return this.shortestSideLength() * this.longestSideLength();
      }),
      (t.prototype.width = function () {
        return Math.abs(this.points[1].x - this.points[0].x);
      }),
      (t.prototype.height = function () {
        return Math.abs(this.points[2].y - this.points[1].y);
      }),
      (t.prototype.scale = function (n) {
        return new t(
          this.points.map(function (t) {
            return t.scale(n);
          })
        );
      }),
      (t.prototype.scaleFromCenter = function (n) {
        var i = this.center();
        return new t(
          this.points.map(function (t) {
            return new a(i, t).scale(n).getEnd();
          })
        );
      }),
      (t.fromJson = function (n) {
        return new t(
          n.points.map(function (t) {
            return g.fromJson(t);
          })
        );
      }),
      (t.prototype.equals = function (t) {
        return this.points.every(function (n, i) {
          return n.equals(t.points[i]);
        });
      }),
      (t.prototype.round = function () {
        return new t(
          this.points.map(function (t) {
            return t.round();
          })
        );
      }),
      (t.prototype.topLeft = function () {
        return new c(this.points).topLeft();
      }),
      (t.prototype.moveCenterTo = function (n) {
        var i = this.center().vectorTo(n);
        return new t(
          this.points.map(function (t) {
            return t.add(i);
          })
        );
      }),
      (t.prototype.toKey = function () {
        return this.points
          .map(function (t) {
            return t.toKey();
          })
          .join("|");
      }),
      (t.prototype.toPolygon = function () {
        return new c(this.points);
      }),
      (t.prototype.rotateToBox = function () {
        var t = new a(this.points[0], this.points[1]),
          n = this.rotate(-t.angle(), this.center());
        return y.fromPoints(
          new g(n.minX(), n.minY()),
          new g(n.maxX(), n.maxY())
        );
      }),
      (t.prototype.minX = function () {
        return Math.min.apply(
          Math,
          this.points.map(function (t) {
            return t.x;
          })
        );
      }),
      (t.prototype.maxX = function () {
        return Math.max.apply(
          Math,
          this.points.map(function (t) {
            return t.x;
          })
        );
      }),
      (t.prototype.minY = function () {
        return Math.min.apply(
          Math,
          this.points.map(function (t) {
            return t.y;
          })
        );
      }),
      (t.prototype.maxY = function () {
        return Math.max.apply(
          Math,
          this.points.map(function (t) {
            return t.y;
          })
        );
      }),
      (t.prototype.rotate = function (n, i) {
        return new t(
          this.points.map(function (t) {
            return t.rotateAround(i, n);
          })
        );
      }),
      (t.prototype.boundingBox = function () {
        return y.fromPoints(
          new g(this.minX(), this.minY()),
          new g(this.maxX(), this.maxY())
        );
      }),
      t
    );
  })(),
  y = (function () {
    function t(t) {
      this.rectangle = t;
    }
    return (
      (t.fromPoints = function (n, i) {
        return new t(new f([n, n.addToX(i.x - n.x), i, i.addToX(n.x - i.x)]));
      }),
      (t.prototype.topLeft = function () {
        return this.rectangle.getPoints()[0];
      }),
      (t.prototype.bottomRight = function () {
        return this.rectangle.getPoints()[2];
      }),
      (t.prototype.longestSideLength = function () {
        return this.rectangle.longestSideLength();
      }),
      (t.prototype.shortestSideLength = function () {
        return this.rectangle.shortestSideLength();
      }),
      (t.prototype.width = function () {
        return this.rectangle.width();
      }),
      (t.prototype.height = function () {
        return this.rectangle.height();
      }),
      (t.prototype.area = function () {
        return this.rectangle.area();
      }),
      (t.prototype.center = function () {
        return this.rectangle.center();
      }),
      (t.prototype.randomPoints = function (t) {
        for (
          var n = [],
            i = Math.pow(t, 2),
            e =
              new a(
                this.rectangle.getPoints()[0],
                this.rectangle.getPoints()[1]
              ).length() / t,
            o =
              new a(
                this.rectangle.getPoints()[1],
                this.rectangle.getPoints()[2]
              ).length() / t,
            r = this.rectangle.getPoints()[0],
            s = 0;
          s < i;
          ++s
        ) {
          var u = ((s % t) + 1) * e - e / 2,
            p = (Math.floor(s / t) + 1) * o - o / 2;
          n.push(r.add(new g(u, p)));
        }
        return n;
      }),
      (t.prototype.scale = function (n) {
        return new t(this.rectangle.scale(n));
      }),
      (t.prototype.contains = function (t) {
        return this.rectangle.contains(t);
      }),
      (t.prototype.equals = function (t) {
        return this.rectangle.equals(t.rectangle);
      }),
      (t.fromJson = function (n) {
        return new t(f.fromJson(n.rectangle));
      }),
      (t.boundingBox = function (n) {
        var i = n.map(function (t) {
            return t.x;
          }),
          e = n.map(function (t) {
            return t.y;
          });
        return t.fromPoints(
          new g(Math.min.apply(Math, i), Math.min.apply(Math, e)),
          new g(Math.max.apply(Math, i), Math.max.apply(Math, e))
        );
      }),
      (t.prototype.toKey = function () {
        return this.rectangle
          .getPoints()
          .map(function (t) {
            return t.toKey();
          })
          .join("|");
      }),
      (t.prototype.interiorPoints = function () {
        for (
          var t = this.topLeft(), n = this.bottomRight(), i = [], e = t.y;
          e <= n.y;
          e++
        )
          for (var o = t.x; o <= n.x; o++) i.push(new g(o, e));
        return i;
      }),
      (t.prototype.scaleFromCenter = function (n) {
        return new t(this.rectangle.scaleFromCenter(n));
      }),
      (t.prototype.round = function () {
        return new t(this.rectangle.round());
      }),
      (t.prototype.toRectangle = function () {
        return this.rectangle;
      }),
      (t.prototype.toPolygon = function () {
        return this.rectangle.toPolygon();
      }),
      (t.prototype.sidesHaveSimilarLength = function (t, n) {
        return this.rectangle.sidesHaveSimilarLength(t, n);
      }),
      t
    );
  })(),
  g = (function () {
    function t(t, n) {
      (this.x = t), (this.y = n);
    }
    return (
      (t.prototype.arrayIndex = function (t) {
        return this.y * t + this.x;
      }),
      (t.prototype.outOfBounds = function (t, n) {
        return this.x < 0 || this.y < 0 || this.x >= t || this.y >= n;
      }),
      (t.prototype.equals = function (t) {
        return this.x === t.x && this.y === t.y;
      }),
      (t.prototype.addToX = function (n) {
        return new t(this.x + n, this.y);
      }),
      (t.prototype.addToY = function (n) {
        return new t(this.x, this.y + n);
      }),
      (t.prototype.distanceTo = function (t) {
        return Math.sqrt(this.distanceToSquared(t));
      }),
      (t.prototype.distanceToSquared = function (t) {
        var n = t.x - this.x,
          i = t.y - this.y;
        return n * n + i * i;
      }),
      (t.prototype.add = function (n) {
        return new t(this.x + n.x, this.y + n.y);
      }),
      (t.prototype.toString = function () {
        return "".concat(this.x, ",").concat(this.y);
      }),
      (t.prototype.scale = function (n) {
        return new t(this.x * n, this.y * n);
      }),
      (t.prototype.rotateAround = function (n, i) {
        var e = Math.cos(r(i)),
          o = Math.sin(r(i)),
          s = this.x - n.x,
          u = this.y - n.y;
        return new t(e * s - o * u + n.x, o * s + e * u + n.y);
      }),
      (t.prototype.pointsAtMaxDistance = function (n) {
        var i = this;
        return y
          .fromPoints(this.add(new t(-n, -n)), this.add(new t(n, n)))
          .interiorPoints()
          .filter(function (t) {
            return i.distanceTo(t) <= n;
          });
      }),
      (t.fromJson = function (n) {
        return new t(n.x, n.y);
      }),
      (t.prototype.round = function () {
        return new t(Math.round(this.x), Math.round(this.y));
      }),
      (t.prototype.roundTo2DecimalPlaces = function () {
        return new t(
          t.roundTo2DecimalPlaces(this.x),
          t.roundTo2DecimalPlaces(this.y)
        );
      }),
      (t.roundTo2DecimalPlaces = function (t) {
        return Math.round(100 * (t + Number.EPSILON)) / 100;
      }),
      (t.prototype.toKey = function () {
        return "".concat(this.x, "-").concat(this.y);
      }),
      (t.fromKey = function (n) {
        var i = n.split("-").map(Number);
        return new t(i[0], i[1]);
      }),
      (t.prototype.vectorTo = function (t) {
        return { x: t.x - this.x, y: t.y - this.y };
      }),
      t
    );
  })();
export {
  y as B,
  g as P,
  a as R,
  c as a,
  f as b,
  h as c,
  s as d,
  o as e,
  u as i,
};
