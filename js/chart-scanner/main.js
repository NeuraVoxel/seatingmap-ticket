import { _ as t, S as e, R as n, a as o, b as r } from "./row-d_vZ6KmI.js";
import { R as a, P as i, a as s, b as c, B as h } from "./point-BB7ElD4D.js";
var u,
  p = function (t, e, n) {
    (this.seat = t), (this.row = e), (this.edgeSeat = n);
  },
  l = (function () {
    function t() {}
    return (
      (t.prototype.suggestSeat = function (t, e) {
        var n = this;
        if (0 !== t.length) {
          var o = t.flatMap(function (t) {
            return n.suggestedSeats(t);
          });
          return (
            o.sort(function (t, n) {
              return t.seat.distanceTo(e) - n.seat.distanceTo(e);
            }),
            o[0]
          );
        }
      }),
      (t.edgeSeats = function (t) {
        return 1 === t.seats.length
          ? []
          : [t.seats[0], t.seats[t.seats.length - 1]];
      }),
      (t.seatDistance = function (t) {
        for (var e = 0, n = 0; n < t.seats.length - 1; n++)
          e += t.seats[n].center.distanceTo(t.seats[n + 1].center);
        return e / (t.seats.length - 1);
      }),
      (t.neighbourOfEdgeSeat = function (t, e) {
        return e === t.seats[0] ? t.seats[1] : t.seats[t.seats.length - 2];
      }),
      (t.prototype.suggestedSeats = function (e) {
        var n = t.seatDistance(e);
        return t.edgeSeats(e).map(function (o) {
          var r = t.neighbourOfEdgeSeat(e, o),
            i = new a(r.center, o.center).enlarge(n).getEnd();
          return new p(i, e, o);
        });
      }),
      t
    );
  })(),
  g = (function () {
    function t(t) {
      this.chartScannerComponent = t;
    }
    return (
      (t.prototype.onDragged = function (t) {}),
      (t.prototype.onCanvasMouseMove = function (t) {}),
      (t.prototype.onCanvasMouseOut = function (t) {}),
      (t.prototype.onCanvasMouseUp = function (t) {}),
      (t.prototype.onCanvasMouseDown = function (t) {}),
      (t.prototype.onCanvasClick = function (t) {}),
      (t.prototype.onCanvasRightClick = function (t) {}),
      (t.prototype.onCanvasWheel = function (t, e) {
        return !1;
      }),
      (t.prototype.draw = function (t) {}),
      t
    );
  })(),
  d = (function (e) {
    function n() {
      return (null !== e && e.apply(this, arguments)) || this;
    }
    return (
      t(n, e),
      (n.prototype.onCanvasMouseDown = function (t) {
        this.originalPan = this.chartScannerComponent.getPanVector();
      }),
      (n.prototype.onCanvasMouseUp = function (t) {
        (this.originalPan = void 0),
          this.chartScannerComponent.switchToDefaultCursor();
      }),
      (n.prototype.onDragged = function (t) {
        this.chartScannerComponent.switchToHandCursor(),
          this.chartScannerComponent.panTo(
            this.originalPan.x + t.x,
            this.originalPan.y + t.y
          );
      }),
      (n.prototype.onCanvasWheel = function (t, e) {
        return (
          this.chartScannerComponent.zoomToPoint(
            t,
            this.chartScannerComponent.getZoomFactor() + e / -100
          ),
          !0
        );
      }),
      n
    );
  })(g),
  f = (function (e) {
    function n() {
      return (null !== e && e.apply(this, arguments)) || this;
    }
    return (
      t(n, e),
      (n.prototype.onCanvasMouseMove = function (t) {
        if (
          ((this.hoveredSeat = void 0),
          (this.suggestedSeat = void 0),
          this.chartScannerComponent.switchToDefaultCursor(),
          void 0 !== t && void 0 !== this.chartScannerComponent.getResult())
        ) {
          var e = this.chartScannerComponent.detectedSeatAtPoint(t);
          if (void 0 !== e)
            return (
              (this.hoveredSeat = e),
              void this.chartScannerComponent.switchToPointerCursor()
            );
          var n = this.suggestedSeatAtPoint(t);
          void 0 !== n &&
            ((this.suggestedSeat = n),
            this.cursorAboveSuggestedSeat() &&
              this.chartScannerComponent.switchToPointerCursor());
        }
      }),
      (n.prototype.cursorAboveSuggestedSeat = function () {
        return this.chartScannerComponent.isPointWithinSeat(
          this.chartScannerComponent.getCursorPosition(),
          this.suggestedSeat.seat
        );
      }),
      (n.prototype.onCanvasClick = function (t) {
        if (void 0 !== this.hoveredSeat) return this.onHoveredSeatClicked();
        if (void 0 !== this.suggestedSeat) {
          if (this.cursorAboveSuggestedSeat())
            return this.onSuggestedSeatClicked();
        } else if (this.canScan()) {
          var e = new i(
            (t.x - this.chartScannerComponent.getPanVector().x) /
              this.chartScannerComponent.getTotalZoomFactor(),
            (t.y - this.chartScannerComponent.getPanVector().y) /
              this.chartScannerComponent.getTotalZoomFactor()
          );
          return this.chartScannerComponent.detectSeatsFromImpreciseBox(e);
        }
      }),
      (n.prototype.onCanvasRightClick = function (t) {
        if (void 0 !== this.hoveredSeat) return this.onHoveredSeatClicked();
      }),
      (n.prototype.draw = function (t) {
        this.drawSeatIndicator(t),
          t.save(),
          t.translate(
            this.chartScannerComponent.getPanVector().x,
            this.chartScannerComponent.getPanVector().y
          ),
          this.drawHoveredSeat(t),
          this.drawSuggestedSeat(t),
          t.restore(),
          this.chartScannerComponent.drawResult(t, this.hoveredSeat);
      }),
      (n.prototype.drawSeatIndicator = function (t) {
        this.chartScannerComponent.cursorAboveDrawing() &&
          !this.chartScannerComponent.isDragging() &&
          void 0 === this.hoveredSeat &&
          void 0 === this.suggestedSeat &&
          this.canScan() &&
          (t.save(),
          t.beginPath(),
          t.arc(
            this.chartScannerComponent.getCursorPosition().x,
            this.chartScannerComponent.getCursorPosition().y,
            this.chartScannerComponent.getSeatSize() / 2,
            0,
            2 * Math.PI
          ),
          (t.lineWidth = 4),
          (t.strokeStyle = "white"),
          t.stroke(),
          (t.lineWidth = 1.25),
          (t.strokeStyle = "black"),
          t.stroke(),
          t.restore());
      }),
      (n.prototype.drawHoveredSeat = function (t) {
        if (void 0 !== this.hoveredSeat) {
          var e = this.seatCenterX(this.hoveredSeat.seat.center),
            n = this.seatCenterY(this.hoveredSeat.seat.center),
            o = this.seatRadius();
          this.drawHollowSeat(t, "red", e, n, o),
            this.drawCrossIcon(t, "red", o, e, n);
        }
      }),
      (n.prototype.seatCenterX = function (t) {
        return t.x * this.chartScannerComponent.getTotalZoomFactor();
      }),
      (n.prototype.seatCenterY = function (t) {
        return t.y * this.chartScannerComponent.getTotalZoomFactor();
      }),
      (n.prototype.seatRadius = function () {
        return (
          (this.chartScannerComponent.getSeatSizeForDetection() *
            this.chartScannerComponent.getTotalZoomFactor()) /
          2
        );
      }),
      (n.prototype.suggestedSeatAtPoint = function (t) {
        if (void 0 === this.hoveredSeat) {
          var e = new i(
              (t.x - this.chartScannerComponent.getPanVector().x) /
                this.chartScannerComponent.getTotalZoomFactor(),
              (t.y - this.chartScannerComponent.getPanVector().y) /
                this.chartScannerComponent.getTotalZoomFactor()
            ),
            n = this.chartScannerComponent.getResult().rows,
            o = new l().suggestSeat(n, e);
          if (void 0 !== o) {
            var r = o.seat.distanceTo(o.edgeSeat.center);
            if (!(e.distanceTo(o.seat) > r)) return o;
          }
        }
      }),
      (n.prototype.drawSuggestedSeat = function (t) {
        if (void 0 !== this.suggestedSeat) {
          var e = this.chartScannerComponent.rowColor(this.suggestedSeat.row),
            n = this.seatCenterX(this.suggestedSeat.seat),
            o = this.seatCenterY(this.suggestedSeat.seat),
            r = this.seatRadius();
          this.chartScannerComponent.drawSeatConnectionLine(
            t,
            e,
            this.suggestedSeat.seat,
            this.suggestedSeat.edgeSeat.center
          ),
            this.drawHollowSeat(t, e, n, o, r),
            this.drawPlusIcon(t, e, r, n, o);
        }
      }),
      (n.prototype.drawHollowSeat = function (t, e, n, o, r) {
        t.save(),
          t.beginPath(),
          (t.lineWidth = 2),
          (t.strokeStyle = e),
          t.arc(n, o, r, 0, 2 * Math.PI),
          t.clip(),
          t.clearRect(n - r, o - r, 2 * r, 2 * r),
          t.closePath(),
          t.stroke(),
          t.restore();
      }),
      (n.prototype.drawCrossIcon = function (t, e, n, o, r) {
        t.save(),
          (t.strokeStyle = e),
          (t.lineWidth =
            0.65 * this.chartScannerComponent.getTotalZoomFactor());
        var a = 0.5 * n,
          s = new i(o, r);
        t.beginPath();
        var c = new i(o, r - a).rotateAround(s, -45);
        t.moveTo(c.x, c.y);
        var h = new i(o, r + a).rotateAround(s, -45);
        t.lineTo(h.x, h.y), t.stroke(), t.beginPath();
        var u = new i(o, r - a).rotateAround(s, 45);
        t.moveTo(u.x, u.y);
        var p = new i(o, r + a).rotateAround(s, 45);
        t.lineTo(p.x, p.y), t.stroke(), t.restore();
      }),
      (n.prototype.drawPlusIcon = function (t, e, n, o, r) {
        t.save(),
          (t.strokeStyle = e),
          (t.lineWidth =
            0.65 * this.chartScannerComponent.getTotalZoomFactor());
        var a = 0.5 * n;
        t.beginPath(),
          t.moveTo(o, r - a),
          t.lineTo(o, r + a),
          t.stroke(),
          t.beginPath(),
          t.moveTo(o - a, r),
          t.lineTo(o + a, r),
          t.stroke(),
          t.restore();
      }),
      (n.prototype.onHoveredSeatClicked = function () {
        return (
          this.chartScannerComponent.excludeSeat(this.hoveredSeat.seat),
          this.chartScannerComponent.doDetectSeats()
        );
      }),
      (n.prototype.onSuggestedSeatClicked = function () {
        var t = this.suggestedSeat,
          e = t.edgeSeat.rectangle.moveCenterTo(t.seat);
        return this.chartScannerComponent.detectSeatsFromPreciseBox(
          e.rotateToBox()
        );
      }),
      (n.prototype.canScan = function () {
        if (void 0 === this.chartScannerComponent.getResult()) return !0;
        var t = this.chartScannerComponent.getCursorPosition(),
          e = this.chartScannerComponent.nearestSeat(t);
        if (void 0 === e) return !0;
        var n =
          this.chartScannerComponent.getResult().seatSize *
          this.chartScannerComponent.getTotalZoomFactor();
        return t.distanceTo(e) > n;
      }),
      n
    );
  })(d),
  m = (function () {
    function t() {}
    return (
      (t.prototype.convert = function (t, e, n, o, r, a, i) {
        if (0 === t.length) return this.emptyDrawing(e, n, a);
        var s = this.scaleFactor(t, r, a, o);
        return this.convertAtScale(t, s, e, n, o, r, a, i);
      }),
      (t.prototype.convertAtScale = function (t, e, n, o, r, a, s, c) {
        var h = this;
        if (0 === t.length) return this.emptyDrawing(n, o, s);
        var u = this.scaleRows(t, e),
          p = c ? this.moveToOriginVector(t, r) : new i(0, 0),
          l = this.moveRows(u, p);
        return {
          rows: l.map(function (t) {
            return h.row(t, r, a);
          }),
          rowSpacing: this.rowSpacingForDrawing(l, r, s),
          width: this.width(l, r),
          height: this.height(l, r),
          referenceChart: this.referenceChart(n, o, e, p),
        };
      }),
      (t.prototype.scaleRows = function (t, o) {
        return t.map(function (t) {
          var r = t.seats.map(function (t) {
            return new e(t.center.scale(o), t.id, t.rectangle, t.label);
          });
          return new n(r, t.type);
        });
      }),
      (t.prototype.moveRows = function (t, o) {
        return t.map(function (t) {
          var r = t.seats.map(function (t) {
            return new e(t.center.add(o), t.id, t.rectangle, t.label);
          });
          return new n(r, t.type);
        });
      }),
      (t.prototype.minDistanceBetweenSeatCenters = function (t) {
        for (
          var e = Number.POSITIVE_INFINITY, n = 0;
          n < t.seats.length - 1;
          n++
        ) {
          var o = new a(t.seats[n].center, t.seats[n + 1].center).length();
          o < e && (e = o);
        }
        return e;
      }),
      (t.prototype.referenceChart = function (t, e, n, o) {
        var r = t * n,
          a = e * n;
        return {
          origin: o.add(new i((r - t) / 2, (a - e) / 2)),
          width: t,
          height: e,
          scaleFactor: n,
        };
      }),
      (t.prototype.rowSpacing = function (t) {
        var e = this,
          n = t
            .map(function (n) {
              return e.distanceToNearestRow(n, t);
            })
            .filter(function (t) {
              return void 0 !== t;
            });
        if (0 !== n.length) {
          n.sort(function (t, e) {
            return t - e;
          });
          var o = n[Math.floor(n.length / 2)];
          return Math.max(0, o);
        }
      }),
      (t.prototype.width = function (t, e) {
        var n = Math.min.apply(
          Math,
          t.flatMap(function (t) {
            return t.seats.map(function (t) {
              return t.center.x;
            });
          })
        );
        return (
          Math.max.apply(
            Math,
            t.flatMap(function (t) {
              return t.seats.map(function (t) {
                return t.center.x;
              });
            })
          ) -
          n +
          e
        );
      }),
      (t.prototype.height = function (t, e) {
        var n = Math.min.apply(
          Math,
          t.flatMap(function (t) {
            return t.seats.map(function (t) {
              return t.center.y;
            });
          })
        );
        return (
          Math.max.apply(
            Math,
            t.flatMap(function (t) {
              return t.seats.map(function (t) {
                return t.center.y;
              });
            })
          ) -
          n +
          e
        );
      }),
      (t.prototype.distanceToNearestRow = function (t, e) {
        var n = this.findNearestRow(
          t,
          e.filter(function (e) {
            return e !== t;
          })
        );
        if (void 0 !== n) return this.distanceBetweenRows(t, n);
      }),
      (t.prototype.distanceBetweenRows = function (t, e) {
        if (1 === t.seats.length && 1 === e.seats.length)
          return t.seats[0].center.distanceTo(e.seats[0].center);
        var n = 1 === t.seats.length ? e : t,
          o = t === n ? e : t,
          r = new a(n.seats[0].center, n.seats[1].center),
          i = r.projectPoint(o.seats[0].center);
        return r.hasPoint(i) ? i.distanceTo(o.seats[0].center) : void 0;
      }),
      (t.prototype.emptyDrawing = function (t, e, n) {
        return {
          rows: [],
          rowSpacing: n,
          width: null,
          height: null,
          referenceChart: this.referenceChart(t, e, 1, new i(0, 0)),
        };
      }),
      (t.prototype.scaleFactor = function (t, e, n, o) {
        return Math.max(
          this.rowSpacingScaleFactor(t, n, o),
          this.seatSpacingScaleFactor(t, e, o)
        );
      }),
      (t.prototype.rowSpacingScaleFactor = function (t, e, n) {
        var o = this.rowSpacing(t);
        return void 0 === o || 0 === o ? 1 : (e + n) / o;
      }),
      (t.prototype.seatSpacingScaleFactor = function (t, e, n) {
        var o = this,
          r = Math.min.apply(
            Math,
            t.map(function (t) {
              return o.minDistanceBetweenSeatCenters(t);
            })
          );
        return r === Number.POSITIVE_INFINITY ? 1 : (e + n) / r;
      }),
      (t.prototype.moveToOriginVector = function (t, e) {
        var n = Math.min.apply(
            Math,
            t.flatMap(function (t) {
              return t.seats.map(function (t) {
                return t.center.x;
              });
            })
          ),
          o = Math.min.apply(
            Math,
            t.flatMap(function (t) {
              return t.seats.map(function (t) {
                return t.center.y;
              });
            })
          ),
          r = e / 2;
        return new i(n - r, o - r).scale(-1);
      }),
      (t.prototype.findNearestRow = function (t, e) {
        for (
          var n,
            o = Number.POSITIVE_INFINITY,
            r = function (r) {
              var a = Math.min.apply(
                Math,
                t.seats.flatMap(function (t) {
                  return e[r].seats.map(function (e) {
                    return t.center.distanceTo(e.center);
                  });
                })
              );
              a < o && ((n = e[r]), (o = a));
            },
            a = 0;
          a < e.length;
          ++a
        )
          r(a);
        return n;
      }),
      (t.prototype.row = function (t, e, n) {
        return {
          seats: t.seats.map(function (t) {
            return { label: t.label, center: t.center.roundTo2DecimalPlaces() };
          }),
          seatSpacing: this.seatSpacing(t, e, n),
          type: t.type,
        };
      }),
      (t.prototype.seatSpacing = function (t, e, n) {
        return 1 === t.seats.length
          ? n
          : this.averageDistanceBetweenSeats(t) - e;
      }),
      (t.prototype.averageDistanceBetweenSeats = function (t) {
        for (var e = 0, n = 0; n < t.seats.length - 1; n++)
          e += t.seats[n].center.distanceTo(t.seats[n + 1].center);
        return e / (t.seats.length - 1);
      }),
      (t.prototype.rowSpacingForDrawing = function (t, e, n) {
        var o = this.rowSpacing(t);
        return void 0 === o || 0 === o ? n : o - e;
      }),
      t
    );
  })(),
  v = (function () {
    function t(t, e, n, o, r, a, i, s) {
      (this.rows = t),
        (this.imgWidth = e),
        (this.imgHeight = n),
        (this.similarRegions = o),
        (this.similarRectangles = r),
        (this.rectangles = a),
        (this.ocrImages = i),
        (this.seatSize = s);
    }
    return (
      (t.prototype.toDrawingJson = function (t, e, n) {
        return new m().convert(
          this.rows,
          this.imgWidth,
          this.imgHeight,
          t,
          e,
          n,
          !0
        );
      }),
      (t.prototype.toSectionJson = function (t, e, n) {
        return new m().convert(
          this.rows,
          this.imgWidth,
          this.imgHeight,
          t,
          e,
          n,
          !1
        );
      }),
      (t.prototype.toAlreadyScaledSectionJson = function (t, e, n, o) {
        return new m().convertAtScale(
          this.rows,
          t,
          this.imgWidth,
          this.imgHeight,
          e,
          n,
          o,
          !1
        );
      }),
      t
    );
  })(),
  y = (function () {
    function t() {
      var t = this;
      (this[u] = "Promise"),
        (this._promise = new Promise(function (e, n) {
          (t._resolve = e), (t._reject = n);
        }));
    }
    return (
      (t.prototype.finally = function (t) {
        return this._promise.finally(t);
      }),
      (t.prototype.then = function (t, e) {
        return this._promise.then(t, e);
      }),
      (t.prototype.catch = function (t) {
        return this._promise.catch(t);
      }),
      (t.prototype.resolve = function (t) {
        this._resolve(t);
      }),
      (t.prototype.reject = function (t) {
        this._reject(t);
      }),
      t
    );
  })();
u = Symbol.toStringTag;
var w = (function () {
    function t(t) {
      this.worker = t;
    }
    return (
      (t.create = function (e, n, o, r, a, i) {
        return (
          void 0 === i && (i = !1),
          new Promise(function (s, c) {
            var h = new Worker("".concat(n, "/scannerWorker.js"), {
              type: "module",
            });
            h.postMessage({
              type: "init",
              imageData: e,
              apiUrl: o,
              secretKey: r,
              debug: i,
            });
            var u = new t(h);
            h.onmessage = function (e) {
              if ("initialised" === e.data.type) s(u);
              else if ("scanned" === e.data.type) {
                var n = t.resultFromJson(e.data.result);
                u.scanDeferred.resolve(n);
              } else
                "progressMade" === e.data.type
                  ? a(e.data.progress)
                  : "stopped" === e.data.type &&
                    (h.terminate(), u.stopDeferred.resolve());
            };
          })
        );
      }),
      (t.prototype.addSeatBox = function (t, e) {
        this.worker.postMessage({
          type: "addSeatBox",
          seatBox: t,
          isPreciseBox: e,
        });
      }),
      (t.prototype.removeSeatBox = function (t) {
        this.worker.postMessage({ type: "removeSeatBox", seatBox: t });
      }),
      (t.prototype.excludeSeat = function (t) {
        this.worker.postMessage({ type: "excludeSeat", seat: t });
      }),
      (t.prototype.scan = function (t) {
        return (
          this.worker.postMessage({ type: "scan", rowDetectionDirection: t }),
          (this.scanDeferred = new y()),
          this.scanDeferred
        );
      }),
      (t.prototype.stop = function () {
        return (
          this.worker.postMessage({ type: "stop" }),
          (this.stopDeferred = new y()),
          this.stopDeferred
        );
      }),
      (t.resultFromJson = function (t) {
        var e, o, r;
        return new v(
          t.rows.map(function (t) {
            return n.fromJson(t);
          }),
          t.imgWidth,
          t.imgHeight,
          null === (e = t.similarRegions) || void 0 === e
            ? void 0
            : e.map(function (t) {
                return s.fromJson(t);
              }),
          null === (o = t.similarRectangles) || void 0 === o
            ? void 0
            : o.map(function (t) {
                return c.fromJson(t);
              }),
          null === (r = t.rectangles) || void 0 === r
            ? void 0
            : r.map(function (t) {
                return c.fromJson(t);
              }),
          t.ocrImages,
          t.seatSize
        );
      }),
      t
    );
  })(),
  S = function (t, e) {
    (this.seat = t), (this.row = e);
  },
  C = (function (e) {
    function n() {
      return (null !== e && e.apply(this, arguments)) || this;
    }
    return (
      t(n, e),
      (n.prototype.draw = function (t) {
        e.prototype.draw.call(this, t),
          (t.font = "30px Arial"),
          (t.textBaseline = "middle"),
          (t.textAlign = "center"),
          t.fillText(
            "An error occurred",
            this.chartScannerComponent.canvasCenter().x,
            this.chartScannerComponent.canvasCenter().y
          );
      }),
      n
    );
  })(g),
  T = (function (e) {
    function n(t, n) {
      var o = e.call(this, t) || this;
      return (o.mode = n), o;
    }
    return (
      t(n, e),
      (n.prototype.draw = function (t) {
        void 0 !== this.chartScannerComponent.getResult() &&
          (t.save(),
          "similarRegions" === this.mode
            ? this.drawSimilarRegions(t)
            : "rectangles" === this.mode
            ? this.drawRectangles(t)
            : "similarRectangles" === this.mode
            ? this.drawSimilarRectangles(t)
            : "ocrImages" === this.mode && this.drawOcrImages(t),
          t.restore());
      }),
      (n.prototype.drawSimilarRegions = function (t) {
        var e = this;
        t.translate(
          this.chartScannerComponent.getPanVector().x,
          this.chartScannerComponent.getPanVector().y
        ),
          this.chartScannerComponent
            .getResult()
            .similarRegions.forEach(function (n) {
              (t.fillStyle = F.randomColor(n.getPoints()[0])),
                t.beginPath(),
                n.getPoints().forEach(function (n) {
                  t.lineTo(
                    n.x * e.chartScannerComponent.getTotalZoomFactor(),
                    n.y * e.chartScannerComponent.getTotalZoomFactor()
                  );
                }),
                t.closePath(),
                t.fill();
            });
      }),
      (n.prototype.drawRectangles = function (t) {
        var e = this;
        t.translate(
          this.chartScannerComponent.getPanVector().x,
          this.chartScannerComponent.getPanVector().y
        ),
          this.chartScannerComponent
            .getResult()
            .rectangles.forEach(function (n) {
              t.beginPath(),
                (t.fillStyle = F.randomColor(n.getPoints()[0])),
                n.getPoints().forEach(function (n) {
                  t.lineTo(
                    n.x * e.chartScannerComponent.getTotalZoomFactor(),
                    n.y * e.chartScannerComponent.getTotalZoomFactor()
                  );
                }),
                t.closePath(),
                t.fill();
            });
      }),
      (n.prototype.drawSimilarRectangles = function (t) {
        var e = this;
        t.translate(
          this.chartScannerComponent.getPanVector().x,
          this.chartScannerComponent.getPanVector().y
        ),
          this.chartScannerComponent
            .getResult()
            .similarRectangles.forEach(function (n) {
              t.beginPath(),
                (t.fillStyle = F.randomColor(n.getPoints()[0])),
                n.getPoints().forEach(function (n) {
                  t.lineTo(
                    n.x * e.chartScannerComponent.getTotalZoomFactor(),
                    n.y * e.chartScannerComponent.getTotalZoomFactor()
                  );
                }),
                t.closePath(),
                t.fill();
            });
      }),
      (n.prototype.drawOcrImages = function (t) {
        var e = this.chartScannerComponent
            .getResult()
            .ocrImages.get(this.chartScannerComponent.getOcrImageType()),
          n = new OffscreenCanvas(e.width, e.height);
        n.getContext("2d").putImageData(e, 0, 0);
        var o = this.chartScannerComponent.getCanvas().width,
          r = this.chartScannerComponent.getCanvas().height;
        t.clearRect(0, 0, o, r),
          t.scale(
            this.chartScannerComponent.getTotalZoomFactor(),
            this.chartScannerComponent.getTotalZoomFactor()
          ),
          t.drawImage(n, 0, 0);
      }),
      n
    );
  })(d),
  x = (function (e) {
    function n() {
      return (null !== e && e.apply(this, arguments)) || this;
    }
    return (
      t(n, e),
      (n.prototype.draw = function (t) {
        this.chartScannerComponent.drawResult(t);
      }),
      n
    );
  })(g),
  P = {
    "pointer-events": "none",
    position: "fixed",
    left: "50%",
    top: "50%",
    "border-radius": "8px",
    background: "white",
    border: "1px solid hsla(0, 0%, 75%)",
    "box-shadow": "0 0 0 1px hsla(0, 0%, 100%, 0.75)",
    height: "10px",
    width: "".concat(80, "px"),
    "margin-left": "-".concat(40, "px"),
    "margin-top": "-20px",
    padding: "2px",
    "z-index": "10",
    transition: "all 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
  },
  b = {
    "border-radius": "6px",
    height: "100%",
    width: "0%",
    background:
      "linear-gradient(to right, hsla(0, 0%, 35%), hsla(0, 0%, 15%), hsla(0, 0%, 35%))",
    "background-size": "".concat(160, "px 100%"),
    "box-sizing": "border-box",
    "box-shadow": "inset 0 0 3px hsl(0, 0%, 15%)",
    transition: "width 1s cubic-bezier(0.23, 1, 0.32, 1)",
    animation: "progress-bar-parallax 1s infinite linear",
  },
  M = (function () {
    function t(t) {
      var e = this;
      this.parent = t;
      var n = document.createElement("style");
      (n.textContent =
        "\n      @keyframes progress-bar-parallax {\n        from { background-position: -".concat(
          160,
          "px 0%; }\n        to { background-position: 0% 0%; }\n      }\n    "
        )),
        document.head.appendChild(n),
        (this.progressContainer = document.createElement("div")),
        Object.entries(P).forEach(function (t) {
          var n = t[0],
            o = t[1];
          e.progressContainer.style.setProperty(n, o);
        }),
        (this.progressBar = document.createElement("div")),
        Object.entries(b).forEach(function (t) {
          var n = t[0],
            o = t[1];
          e.progressBar.style.setProperty(n, o);
        }),
        this.progressContainer.appendChild(this.progressBar),
        this.hide(),
        this.parent.appendChild(this.progressContainer);
    }
    return (
      (t.prototype.show = function () {
        clearTimeout(this.resetTimeout),
          this.update(0),
          (this.progressContainer.style.opacity = "1"),
          (this.progressContainer.style.scale = "1"),
          (this.progressContainer.style.filter = "none");
      }),
      (t.prototype.hide = function () {
        var t = this;
        (this.progressContainer.style.opacity = "0"),
          (this.progressContainer.style.scale = "0.85"),
          (this.progressContainer.style.filter = "blur(1px)"),
          (this.resetTimeout = window.setTimeout(function () {
            return t.update(0);
          }, 300));
      }),
      (t.prototype.update = function (t) {
        this.progressBar.style.width = "".concat(t, "%");
      }),
      t
    );
  })(),
  F = (function () {
    function t(t, e, n, o, r, a, i) {
      void 0 === i && (i = !1),
        (this.referenceChartHidden = !1),
        (this.state = new f(this)),
        (this.seatSize = 16),
        (this.zoomFactor = 1),
        (this.stopped = !1),
        (this.rendered = !1),
        (this.ocrImageType = "with-seat-borders"),
        (this.parent = t),
        (this.imageUrl = e),
        (this.baseUrl = n),
        (this.apiUrl = o),
        (this.secretKey = r),
        (this.debug = i),
        (this.mask = a),
        (this.progressBar = new M(t)),
        (this.onWindowMouseUp = this.onWindowMouseUp.bind(this)),
        (this.onWindowMouseMove = this.onWindowMouseMove.bind(this)),
        (this.onCanvasMouseOver = this.onCanvasMouseOver.bind(this)),
        (this.onCanvasMouseOut = this.onCanvasMouseOut.bind(this)),
        (this.onCanvasMouseDown = this.onCanvasMouseDown.bind(this)),
        (this.onCanvasMouseUp = this.onCanvasMouseUp.bind(this)),
        (this.onCanvasWheel = this.onCanvasWheel.bind(this)),
        (this.onCanvasContextMenu = this.onCanvasContextMenu.bind(this));
    }
    return (
      (t.prototype.onScanned = function (t) {
        return (this.onScannedCallback = t), this;
      }),
      (t.prototype.onZoomed = function (t) {
        return (this.onZoomedCallback = t), this;
      }),
      (t.prototype.switchToMode = function (t) {
        this.state = "finalResult" === t ? new f(this) : new T(this, t);
      }),
      (t.prototype.getPanVector = function () {
        return this.panVector;
      }),
      (t.prototype.panTo = function (t, e) {
        this.panVector = new i(t, e);
      }),
      (t.prototype.getResult = function () {
        return this.result;
      }),
      (t.prototype.getSeatSizeForDetection = function () {
        return this.result.seatSize;
      }),
      (t.prototype.getSeatSize = function () {
        return this.seatSize;
      }),
      (t.prototype.excludeSeat = function (t) {
        this.scanner.excludeSeat(t.id);
      }),
      (t.prototype.isRendered = function () {
        return this.rendered;
      }),
      (t.prototype.render = function () {
        return o(this, void 0, void 0, function () {
          var t,
            e,
            n,
            o = this;
          return r(this, function (r) {
            switch (r.label) {
              case 0:
                this.initCanvas(), (r.label = 1);
              case 1:
                return r.trys.push([1, 4, , 5]), [4, this.loadImage()];
              case 2:
                return (
                  r.sent(),
                  (t = this.img
                    .getContext("2d")
                    .getImageData(0, 0, this.img.width, this.img.height)),
                  (e = this),
                  [
                    4,
                    w.create(
                      t,
                      this.baseUrl,
                      this.apiUrl,
                      this.secretKey,
                      function (t) {
                        return o.progressBar.update(t);
                      },
                      this.debug
                    ),
                  ]
                );
              case 3:
                return (e.scanner = r.sent()), (this.rendered = !0), [3, 5];
              case 4:
                return (
                  (n = r.sent()),
                  console.error(n),
                  (this.state = new C(this)),
                  [3, 5]
                );
              case 5:
                return this.startRenderingLoop(), [2, this];
            }
          });
        });
      }),
      (t.prototype.cleanup = function () {
        return o(this, void 0, void 0, function () {
          return r(this, function (t) {
            switch (t.label) {
              case 0:
                return (
                  (this.stopped = !0),
                  window.removeEventListener("mouseup", this.onWindowMouseUp),
                  window.removeEventListener(
                    "mousemove",
                    this.onWindowMouseMove
                  ),
                  this.canvas.removeEventListener(
                    "mouseover",
                    this.onCanvasMouseOver
                  ),
                  this.canvas.removeEventListener(
                    "mouseout",
                    this.onCanvasMouseOut
                  ),
                  this.canvas.removeEventListener(
                    "mousedown",
                    this.onCanvasMouseDown
                  ),
                  this.canvas.removeEventListener(
                    "mouseup",
                    this.onCanvasMouseUp
                  ),
                  this.canvas.removeEventListener("wheel", this.onCanvasWheel),
                  this.canvas.removeEventListener(
                    "contextmenu",
                    this.onCanvasContextMenu
                  ),
                  this.canvas.remove(),
                  (this.canvas = void 0),
                  [4, this.scanner.stop()]
                );
              case 1:
                return t.sent(), [2];
            }
          });
        });
      }),
      (t.prototype.initCanvas = function () {
        (this.canvas = document.createElement("canvas")),
          (this.canvas.style.transition =
            "filter 0.15s ease-out, transform 0.15s ease-out"),
          (this.canvas.width = this.parent.offsetWidth),
          (this.canvas.height = this.parent.offsetHeight),
          this.parent.appendChild(this.canvas),
          window.addEventListener("mousemove", this.onWindowMouseMove),
          window.addEventListener("mouseup", this.onWindowMouseUp),
          this.canvas.addEventListener("mouseover", this.onCanvasMouseOver),
          this.canvas.addEventListener("mouseout", this.onCanvasMouseOut),
          this.canvas.addEventListener("mousedown", this.onCanvasMouseDown),
          this.canvas.addEventListener("mouseup", this.onCanvasMouseUp),
          this.canvas.addEventListener("wheel", this.onCanvasWheel),
          this.canvas.addEventListener("contextmenu", this.onCanvasContextMenu);
      }),
      (t.prototype.onCanvasMouseOut = function (t) {
        this.state.onCanvasMouseOut(this.pointFromEvent(t));
      }),
      (t.prototype.onCanvasMouseDown = function (t) {
        (this.mouseDownPoint = this.pointFromEvent(t)),
          0 === t.button && this.state.onCanvasMouseDown(this.mouseDownPoint);
      }),
      (t.prototype.onCanvasMouseUp = function (t) {
        var e = this.pointFromEvent(t);
        this.state.onCanvasMouseUp(e),
          void 0 === this.mouseDownPoint ||
            this.isDragging() ||
            (0 === t.button
              ? this.state.onCanvasClick(e)
              : 2 === t.button && this.state.onCanvasRightClick(e)),
          (this.mouseDownPoint = void 0);
      }),
      (t.prototype.onCanvasWheel = function (t) {
        this.state.onCanvasWheel(this.pointFromEvent(t), t.deltaY) &&
          t.preventDefault();
      }),
      (t.prototype.onCanvasContextMenu = function (t) {
        return t.preventDefault(), !1;
      }),
      (t.prototype.onCanvasMouseOver = function (t) {
        this.state.onCanvasMouseMove(this.pointFromEvent(t));
      }),
      (t.prototype.resizeCanvasHeight = function (t) {
        this.canvas.height = t;
      }),
      (t.prototype.onWindowMouseUp = function (t) {
        this.mouseDownPoint = void 0;
      }),
      (t.prototype.onWindowMouseMove = function (t) {
        var e = this.pointFromEvent(t);
        if (((this.cursorPosition = e), this.isDragging())) {
          var n = e.x - this.mouseDownPoint.x,
            o = e.y - this.mouseDownPoint.y;
          this.state.onDragged(new i(n, o));
        } else this.state.onCanvasMouseMove(e);
      }),
      (t.prototype.isDragging = function () {
        return (
          void 0 !== this.cursorPosition &&
          void 0 !== this.mouseDownPoint &&
          this.cursorPosition.distanceTo(this.mouseDownPoint) > 3
        );
      }),
      (t.prototype.detectSeatsFromImpreciseBox = function (t) {
        var e = this.seatSize / this.getTotalZoomFactor() / 2,
          n = h.fromPoints(new i(t.x - e, t.y - e), new i(t.x + e, t.y + e));
        if (!this.boxOutOfBounds(n))
          return this.scanner.addSeatBox(n, !1), this.doDetectSeats();
      }),
      (t.prototype.detectSeatsFromPreciseBox = function (t) {
        return this.scanner.addSeatBox(t, !0), this.doDetectSeats();
      }),
      (t.prototype.doDetectSeats = function () {
        return o(this, void 0, void 0, function () {
          var t, e, n;
          return r(this, function (o) {
            switch (o.label) {
              case 0:
                return (
                  this.progressBar.show(),
                  this.switchToWaitCursor(),
                  (this.state = new x(this)),
                  this.blurCanvas(),
                  (t = new Date()),
                  [4, this.scanner.scan()]
                );
              case 1:
                return (
                  (e = o.sent()),
                  this.debug &&
                    console.log(
                      "Scanning took",
                      new Date().getTime() - t.getTime(),
                      "ms"
                    ),
                  (this.result = e),
                  this.unblurCanvas(),
                  (this.state = new f(this)),
                  null === (n = this.onScannedCallback) ||
                    void 0 === n ||
                    n.call(this, e),
                  this.switchToDefaultCursor(),
                  this.progressBar.hide(),
                  [2]
                );
            }
          });
        });
      }),
      (t.prototype.pointFromEvent = function (t) {
        var e = this.canvas.getBoundingClientRect();
        return new i(t.clientX - e.x, t.clientY - e.y);
      }),
      (t.prototype.boxOutOfBounds = function (t) {
        return (
          this.pointOutOfBounds(t.topLeft()) ||
          this.pointOutOfBounds(t.bottomRight())
        );
      }),
      (t.prototype.pointOutOfBounds = function (t) {
        return (
          t.x < 0 || t.x > this.img.width || t.y < 0 || t.y > this.img.height
        );
      }),
      (t.hash = function (t) {
        for (var e = 0, n = 0, o = t.length; n < o; n++) {
          (e = (e << 5) - e + t.charCodeAt(n)), (e |= 0);
        }
        return e;
      }),
      (t.randomColor = function (e) {
        var n = Math.abs(t.hash(e.x + "," + e.y)) % t.colors.length;
        return t.colors[n];
      }),
      (t.prototype.detectedSeatAtPoint = function (t) {
        var e = this;
        return this.result.rows
          .flatMap(function (t) {
            return t.seats.map(function (e) {
              return new S(e, t);
            });
          })
          .filter(function (n) {
            return e.isPointWithinSeat(t, n.seat.center);
          })[0];
      }),
      (t.prototype.isPointWithinSeat = function (t, e) {
        var n =
          (this.getSeatSizeForDetection() * this.getTotalZoomFactor()) / 2;
        return this.pointInImageToCanvas(e).distanceTo(t) < n;
      }),
      (t.prototype.pointInImageToCanvas = function (t) {
        return new i(
          t.x * this.getTotalZoomFactor() + this.panVector.x,
          t.y * this.getTotalZoomFactor() + this.panVector.y
        );
      }),
      (t.prototype.boxInImageToCanvas = function (t) {
        return h.fromPoints(
          this.pointInImageToCanvas(t.topLeft()),
          this.pointInImageToCanvas(t.bottomRight())
        );
      }),
      (t.prototype.zoomToPoint = function (t, e) {
        var n;
        if (!(e < 0.25)) {
          var o = this.zoomFactor;
          this.zoomFactor = e;
          var r = new i(t.x - this.panVector.x, t.y - this.panVector.y),
            a = this.zoomFactor / o;
          (this.panVector = new i(t.x - r.x * a, t.y - r.y * a)),
            o !== e &&
              (null === (n = this.onZoomedCallback) ||
                void 0 === n ||
                n.call(this, this.zoomFactor));
        }
      }),
      (t.prototype.getZoomFactor = function () {
        return this.zoomFactor;
      }),
      (t.prototype.setZoomFactor = function (t) {
        this.zoomToPoint(this.canvasCenter(), t);
      }),
      (t.prototype.getTotalZoomFactor = function () {
        return this.initialZoomFactor * this.zoomFactor;
      }),
      (t.prototype.loadImage = function () {
        return o(this, void 0, void 0, function () {
          var t, e, n;
          return r(this, function (o) {
            switch (o.label) {
              case 0:
                return (t = this), [4, this.doLoadImage()];
              case 1:
                return (
                  (t.img = o.sent()),
                  (e = this.canvas.width / this.img.width),
                  (n = this.canvas.height / this.img.height),
                  (this.initialZoomFactor = Math.min(e, n)),
                  (this.panVector = this.panVectorToCenterImage()),
                  (this.state = new f(this)),
                  [2]
                );
            }
          });
        });
      }),
      (t.prototype.panVectorToCenterImage = function () {
        var t =
            (this.canvas.width - this.img.width * this.getTotalZoomFactor()) /
            2,
          e =
            (this.canvas.height - this.img.height * this.getTotalZoomFactor()) /
            2;
        return new i(t, e);
      }),
      (t.prototype.draw = function () {
        var t = this.canvas.getContext("2d");
        t.clearRect(0, 0, this.canvas.width, this.canvas.height),
          this.drawReferenceImage(t),
          this.state.draw(t);
      }),
      (t.prototype.drawReferenceImage = function (t) {
        void 0 !== this.img &&
          (this.referenceChartHidden ||
            (t.save(),
            this.numSeatsInResult() > 0 && (t.globalAlpha = 0.25),
            t.translate(this.panVector.x, this.panVector.y),
            (t.imageSmoothingQuality = "high"),
            t.drawImage(
              this.img,
              0,
              0,
              this.img.width * this.getTotalZoomFactor(),
              this.img.height * this.getTotalZoomFactor()
            ),
            t.restore()));
      }),
      (t.prototype.startRenderingLoop = function () {
        var t = this;
        requestAnimationFrame(function () {
          t.stopped || (t.draw(), t.startRenderingLoop());
        });
      }),
      (t.prototype.rowColor = function (e) {
        return t.randomColor(e.seats[0].center);
      }),
      (t.prototype.getImageInCanvasBbox = function () {
        var t = h.fromPoints(
          new i(0, 0),
          new i(this.img.width, this.img.height)
        );
        return this.boxInImageToCanvas(t);
      }),
      (t.prototype.switchToWaitCursor = function () {
        this.canvas.style.cursor = "wait";
      }),
      (t.prototype.switchToHandCursor = function () {
        this.canvas.style.cursor = "grab";
      }),
      (t.prototype.switchToPointerCursor = function () {
        this.canvas.style.cursor = "pointer";
      }),
      (t.prototype.switchToDefaultCursor = function () {
        this.canvas.style.cursor = "default";
      }),
      (t.prototype.canvasCenter = function () {
        return new i(this.canvas.width / 2, this.canvas.height / 2);
      }),
      (t.prototype.getCursorPosition = function () {
        return this.cursorPosition;
      }),
      (t.prototype.cursorAboveDrawing = function () {
        if (void 0 !== this.cursorPosition)
          return this.getImageInCanvasBbox().contains(this.cursorPosition);
      }),
      (t.prototype.numSeatsInResult = function () {
        return void 0 === this.result
          ? 0
          : this.result.rows.flatMap(function (t) {
              return t;
            }).length;
      }),
      (t.prototype.blurCanvas = function () {
        (this.canvas.style.filter = "blur(1px) opacity(0.25)"),
          (this.canvas.style.transform = "scale(0.99)");
      }),
      (t.prototype.unblurCanvas = function () {
        (this.canvas.style.filter = "none"),
          (this.canvas.style.transform = "none");
      }),
      (t.prototype.drawResult = function (t, e) {
        var n = this,
          o = this.getResult();
        void 0 !== o &&
          (t.save(),
          t.translate(this.getPanVector().x, this.getPanVector().y),
          o.rows.forEach(function (o) {
            t.save();
            var r = n.rowColor(o);
            o.seats.forEach(function (a, i) {
              if (0 !== i) {
                var s = o.seats[i - 1];
                (null == e ? void 0 : e.seat.center.equals(a.center)) ||
                  (null == e ? void 0 : e.seat.center.equals(s.center)) ||
                  n.drawSeatConnectionLine(t, r, s.center, a.center);
              }
            }),
              t.restore(),
              t.save(),
              o.seats.forEach(function (o) {
                (null == e ? void 0 : e.seat.center.equals(o.center)) ||
                  (t.beginPath(),
                  (t.fillStyle = r),
                  t.arc(
                    o.center.x * n.getTotalZoomFactor(),
                    o.center.y * n.getTotalZoomFactor(),
                    (n.getSeatSizeForDetection() * n.getTotalZoomFactor()) / 2,
                    0,
                    2 * Math.PI
                  ),
                  t.closePath(),
                  t.fill(),
                  void 0 !== o.label &&
                    (t.beginPath(),
                    (t.fillStyle = "white"),
                    t.arc(
                      o.center.x * n.getTotalZoomFactor(),
                      o.center.y * n.getTotalZoomFactor(),
                      ((n.getSeatSizeForDetection() * n.getTotalZoomFactor()) /
                        2) *
                        0.85,
                      0,
                      2 * Math.PI
                    ),
                    t.closePath(),
                    t.fill(),
                    (t.fillStyle = r),
                    (t.textAlign = "center"),
                    (t.textBaseline = "middle"),
                    (t.font =
                      n.getSeatSizeForDetection() *
                        n.getTotalZoomFactor() *
                        0.5 +
                      "px Arial"),
                    t.fillText(
                      o.label,
                      o.center.x * n.getTotalZoomFactor(),
                      o.center.y * n.getTotalZoomFactor()
                    )));
              }),
              t.restore();
          }),
          t.restore());
      }),
      (t.prototype.drawSeatConnectionLine = function (t, e, n, o) {
        (t.strokeStyle = e),
          (t.lineWidth = 2),
          t.beginPath(),
          t.moveTo(
            n.x * this.getTotalZoomFactor(),
            n.y * this.getTotalZoomFactor()
          ),
          t.lineTo(
            o.x * this.getTotalZoomFactor(),
            o.y * this.getTotalZoomFactor()
          ),
          t.stroke();
      }),
      (t.prototype.nearestSeat = function (t) {
        var e = this;
        return this.getResult()
          .rows.flatMap(function (t) {
            return t.seats.map(function (t) {
              return t.center;
            });
          })
          .map(function (t) {
            return e.pointInImageToCanvas(t);
          })
          .sort(function (e, n) {
            return e.distanceTo(t) - n.distanceTo(t);
          })[0];
      }),
      (t.prototype.getCanvas = function () {
        return this.canvas;
      }),
      (t.prototype.getOcrImageType = function () {
        return this.ocrImageType;
      }),
      (t.prototype.setOcrImageType = function (t) {
        this.ocrImageType = t;
      }),
      (t.prototype.doLoadImage = function () {
        return o(this, void 0, void 0, function () {
          var t, e, n, o, a, s;
          return r(this, function (r) {
            switch (r.label) {
              case 0:
                return [4, fetch(this.imageUrl)];
              case 1:
                if (!(t = r.sent()).ok)
                  throw new Error("Failed to fetch image");
                return [4, t.blob()];
              case 2:
                return (e = r.sent()), [4, createImageBitmap(e)];
              case 3:
                return (
                  (n = r.sent()),
                  (o =
                    this.mask ||
                    h
                      .fromPoints(new i(0, 0), new i(n.width, n.height))
                      .toPolygon()),
                  (a = new OffscreenCanvas(o.width(), o.height())),
                  (s = a.getContext("2d")).beginPath(),
                  o
                    .moveTo(new i(0, 0))
                    .getPoints()
                    .forEach(function (t, e) {
                      return s.lineTo(t.x, t.y);
                    }),
                  s.clip(),
                  s.drawImage(
                    n,
                    o.topLeft().x,
                    o.topLeft().y,
                    a.width,
                    a.height,
                    0,
                    0,
                    a.width,
                    a.height
                  ),
                  [2, a]
                );
            }
          });
        });
      }),
      (t.colors = [
        "#C16200",
        "#E2DE84",
        "#A6A670",
        "#86836D",
        "#626267",
        "#4E0110",
        "#335C67",
        "#56A3A6",
        "#5FA8D3",
        "#6A3937",
      ]),
      t
    );
  })();
export {
  F as ChartScannerComponent,
  v as ChartScanningResult,
  i as Point,
  s as Polygon,
};
