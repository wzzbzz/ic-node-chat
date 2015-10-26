var DISQUS = function(a) {
    "use strict";
    return DISQUS = a.DISQUS || {}, 

    DISQUS.define = function(b, c) {
        "function" == typeof b && (c = b, b = "");
        for (var d = b.split("."), e = d.shift(), f = DISQUS, g = (c || function() {
                return {}
            }).call({
                overwrites: function(a) {
                    return a.__overwrites__ = !0, a
                }
            }, a); e;) f = f[e] ? f[e] : f[e] = {}, e = d.shift();
        for (var h in g) g.hasOwnProperty(h) && (!g.__overwrites__ && null !== f[h] && f.hasOwnProperty(h) ? DISQUS.log && DISQUS.log("Unsafe attempt to redefine existing module: " + h) : f[h] = g[h]);
        return f
    }, DISQUS.use = function(a) {
        return DISQUS.define(a)
    }, DISQUS.define("next"), DISQUS

}(window);
DISQUS.define(function(a, b) {
        "use strict";
        var c = a.DISQUS,
            d = a.document,
            e = d.head || d.getElementsByTagName("head")[0] || d.body,
            f = 0;
        c.getUid = function(a) {
            var b = String(++f);
            return a ? a + b : b
        }, c.isOwn = function(a, b) {
            return Object.prototype.hasOwnProperty.call(a, b)
        }, c.isString = function(a) {
            return "[object String]" === Object.prototype.toString.call(a)
        }, c.each = function(a, b) {
            var d = a.length,
                e = Array.prototype.forEach;
            if (isNaN(d))
                for (var f in a) c.isOwn(a, f) && b(a[f], f, a);
            else if (e) e.call(a, b);
            else
                for (var g = 0; d > g; g++) b(a[g], g, a)
        }, c.extend = function(a) {
            return c.each(Array.prototype.slice.call(arguments, 1), function(b) {
                for (var d in b) c.isOwn(b, d) && (a[d] = b[d])
            }), a
        }, c.serializeArgs = function(a) {
            var d = [];
            return c.each(a, function(a, c) {
                a !== b && d.push(c + (null === a ? "" : "=" + encodeURIComponent(a)))
            }), d.join("&")
        }, c.serialize = function(a, b, d) {
            if (b && (-1 === a.indexOf("?") ? a += "?" : "&" !== a.charAt(a.length - 1) && (a += "&"), a += c.serializeArgs(b)), d) {
                var e = {};
                return e[(new Date).getTime()] = null, c.serialize(a, e)
            }
            var f = a.length;
            return "&" === a.charAt(f - 1) ? a.slice(0, f - 1) : a
        };
        var g, h, i = 2e4;
        "addEventListener" in a ? (g = function(a, b, c) {
            a.addEventListener(b, c, !1)
        }, h = function(a, b, c) {
            a.removeEventListener(b, c, !1)
        }) : (g = function(a, b, c) {
            a.attachEvent("on" + b, c)
        }, h = function(a, b, c) {
            a.detachEvent("on" + b, c)
        }), c.require = function(b, f, j, k, l) {
            function m(b) {
                b = b || a.event, b.target || (b.target = b.srcElement), ("load" === b.type || /^(complete|loaded)$/.test(b.target.readyState)) && (k && k(), p && a.clearTimeout(p), h(b.target, o, m))
            }
            var n = d.createElement("script"),
                o = n.addEventListener ? "load" : "readystatechange",
                p = null;
            return n.src = c.serialize(b, f, j), n.async = !0, n.charset = "UTF-8", (k || l) && g(n, o, m), l && (p = a.setTimeout(function() {
                l()
            }, i)), e.appendChild(n), c
        }
    }), DISQUS.define("next.host.urls", function() {
        "use strict";
        var a = "default",
            b = {
                lounge: "http://disqus.com/embed/comments/",
                home: "https://disqus.com/home/".replace("home/", ""),
                ads: "//tempest.services.disqus.com/ads-iframe/"
            },
            c = function(a, b) {
                return /^http/.test(b) || (b = "http:"), b + "//" + a.replace(/^\s*(\w+:)?\/\//, "")
            },
            d = function(d, e, f) {
                var g = b[d];
                if (!g) throw new Error("Unknown app: " + d);
                var h = c(g, document.location.protocol),
                    i = DISQUS.extend({
                        base: a
                    }, e || {}),
                    j = f ? "#" + encodeURIComponent(JSON.stringify(f)) : "";
                return DISQUS.serialize(h, i) + j
            };
        return {
            BASE: a,
            apps: b,
            get: d,
            ensureHttpBasedProtocol: c
        }
    }), DISQUS.define(function(a) {
        "use strict";
        var b;
        return b = a.console ? "function" == typeof a.console.log ? function() {
            return a.console.log(Array.prototype.slice.call(arguments, 0).join(" "))
        } : function() {
            return a.console.log.apply(a.console, arguments)
        } : function() {}, {
            log: b
        }
    }), DISQUS.define("Events", function() {
        "use strict";
        var a = function(a) {
                var b, c = !1;
                return function() {
                    return c ? b : (c = !0, b = a.apply(this, arguments), a = null, b)
                }
            },
            b = DISQUS.isOwn,
            c = Object.keys || function(a) {
                if (a !== Object(a)) throw new TypeError("Invalid object");
                var c = [];
                for (var d in a) b(a, d) && (c[c.length] = d);
                return c
            },
            d = [].slice,
            e = {
                on: function(a, b, c) {
                    if (!g(this, "on", a, [b, c]) || !b) return this;
                    this._events = this._events || {};
                    var d = this._events[a] || (this._events[a] = []);
                    return d.push({
                        callback: b,
                        context: c,
                        ctx: c || this
                    }), this
                },
                once: function(b, c, d) {
                    if (!g(this, "once", b, [c, d]) || !c) return this;
                    var e = this,
                        f = a(function() {
                            e.off(b, f), c.apply(this, arguments)
                        });
                    return f._callback = c, this.on(b, f, d)
                },
                off: function(a, b, d) {
                    var e, f, h, i, j, k, l, m;
                    if (!this._events || !g(this, "off", a, [b, d])) return this;
                    if (!a && !b && !d) return this._events = {}, this;
                    for (i = a ? [a] : c(this._events), j = 0, k = i.length; k > j; j++)
                        if (a = i[j], h = this._events[a]) {
                            if (this._events[a] = e = [], b || d)
                                for (l = 0, m = h.length; m > l; l++) f = h[l], (b && b !== f.callback && b !== f.callback._callback || d && d !== f.context) && e.push(f);
                            e.length || delete this._events[a]
                        }
                    return this
                },
                trigger: function(a) {
                    if (!this._events) return this;
                    var b = d.call(arguments, 1);
                    if (!g(this, "trigger", a, b)) return this;
                    var c = this._events[a],
                        e = this._events.all;
                    return c && h(c, b), e && h(e, arguments), this
                },
                stopListening: function(a, b, c) {
                    var d = this._listeners;
                    if (!d) return this;
                    var e = !b && !c;
                    "object" == typeof b && (c = this), a && ((d = {})[a._listenerId] = a);
                    for (var f in d) d[f].off(b, c, this), e && delete this._listeners[f];
                    return this
                }
            },
            f = /\s+/,
            g = function(a, b, c, d) {
                if (!c) return !0;
                if ("object" == typeof c) {
                    for (var e in c) a[b].apply(a, [e, c[e]].concat(d));
                    return !1
                }
                if (f.test(c)) {
                    for (var g = c.split(f), h = 0, i = g.length; i > h; h++) a[b].apply(a, [g[h]].concat(d));
                    return !1
                }
                return !0
            },
            h = function(a, b) {
                var c, d = -1,
                    e = a.length,
                    f = b[0],
                    g = b[1],
                    h = b[2];
                switch (b.length) {
                    case 0:
                        for (; ++d < e;)(c = a[d]).callback.call(c.ctx);
                        return;
                    case 1:
                        for (; ++d < e;)(c = a[d]).callback.call(c.ctx, f);
                        return;
                    case 2:
                        for (; ++d < e;)(c = a[d]).callback.call(c.ctx, f, g);
                        return;
                    case 3:
                        for (; ++d < e;)(c = a[d]).callback.call(c.ctx, f, g, h);
                        return;
                    default:
                        for (; ++d < e;)(c = a[d]).callback.apply(c.ctx, b)
                }
            },
            i = {
                listenTo: "on",
                listenToOnce: "once"
            };
        return DISQUS.each(i, function(a, b) {
            e[b] = function(b, c, d) {
                var e = this._listeners || (this._listeners = {}),
                    f = b._listenerId || (b._listenerId = DISQUS.getUid("l"));
                return e[f] = b, "object" == typeof c && (d = this), b[a](c, d, this), this
            }
        }), e.bind = e.on, e.unbind = e.off, e
    }), DISQUS.define(function(a) {
        "use strict";

        function b(a) {
            return c.getElementById(a) || c.body || c.documentElement
        }
        var c = a.document,
            d = {},
            e = DISQUS.use("JSON"),
            f = DISQUS.isOwn,
            g = c.createElement("a"),
            h = {};
        h.getOffset = function(a, b) {
            b = b || c.documentElement;
            for (var d = a, e = 0, f = 0; d && d !== b;) e += d.offsetLeft, f += d.offsetTop, d = d.offsetParent;
            return {
                top: f,
                left: e,
                height: a.offsetHeight,
                width: a.offsetWidth
            }
        }, h.getHost = function(a) {
            return g.href = a, g.hostname
        }, h.addEvent = function(a, b, c) {
            if (a.addEventListener) a.addEventListener(b, c, !1);
            else {
                if (!a.attachEvent) throw new Error("No event support.");
                a.attachEvent("on" + b, c)
            }
        }, h.removeEvent = function(a, b, c) {
            if (a.removeEventListener) a.removeEventListener(b, c, !1);
            else {
                if (!a.detachEvent) throw new Error("No event support.");
                a.detachEvent("on" + b, c)
            }
        }, h.throttle = function(b, c, d) {
            d || (d = 0);
            var e, f, g, h, i = 0,
                j = function() {
                    i = new Date, g = null, h = b.apply(e, f)
                };
            return function() {
                var k = new Date,
                    l = c - (k - i);
                return e = this, f = arguments, 0 >= l ? (a.clearTimeout(g), g = null, i = k, h = b.apply(e, f)) : g || (g = a.setTimeout(j, l + d)), h
            }
        }, h.addEvent(a, "message", function(a) {
            var b;
            try {
                b = e.parse(a.data)
            } catch (c) {
                return
            }
            var g = b.sender,
                i = f(d, g) && d[g];
            i && h.getHost(a.origin) === i.host && (a.origin !== i.origin && (i.origin = a.origin), "host" === b.scope && i.trigger(b.name, b.data))
        }, !1), h.addEvent(a, "hashchange", function() {
            DISQUS.trigger("window.hashchange", {
                hash: a.location.hash
            })
        }, !1), h.addEvent(a, "resize", h.throttle(function() {
            DISQUS.trigger("window.resize")
        }, 250, 50), !1), h.addEvent(c, "mousemove", h.throttle(function() {
            DISQUS.trigger("window.mousemove")
        }, 250, 50), !1);
        var i = function() {
            DISQUS.trigger("window.scroll")
        };
        h.addEvent(a, "scroll", h.throttle(i, 250, 50)), h.addEvent(c, "click", function() {
            DISQUS.trigger("window.click")
        });
        var j = h.WindowBase = function(a) {
            a = a || {}, this.state = j.INIT, this.uid = a.uid || DISQUS.getUid("dsq-frame"), this.origin = a.origin, this.host = h.getHost(this.origin), this.target = a.target, this.window = null, d[this.uid] = this, this.on("ready", function() {
                this.state = j.READY
            }, this), this.on("die", function() {
                this.state = j.KILLED
            }, this)
        };
        DISQUS.extend(j, {
            INIT: 0,
            READY: 1,
            KILLED: 2,
            postMessage: function(a, b, c) {
                return a.postMessage(b, c)
            }
        }), DISQUS.extend(j.prototype, DISQUS.Events), j.prototype.sendMessage = function(b, c) {
            var d = e.stringify({
                    scope: "client",
                    name: b,
                    data: c
                }),
                f = function(b, c) {
                    return function() {
                        var d = b.window;
                        d ? j.postMessage(d, c, b.origin) : a.setTimeout(f, 500)
                    }
                }(this, d);
            this.isReady() ? f() : this.on("ready", f)
        }, j.prototype.hide = function() {}, j.prototype.show = function() {}, j.prototype.url = function() {
            return this.target
        }, j.prototype.destroy = function() {
            this.state = j.KILLED, this.off()
        }, j.prototype.isReady = function() {
            return this.state === j.READY
        }, j.prototype.isKilled = function() {
            return this.state === j.KILLED
        };
        var k = h.Popup = function(a) {
            a.uid = a.windowName, j.call(this, a)
        };
        DISQUS.extend(k.prototype, j.prototype), k.prototype.load = function() {
            var b = this.window = a.open("", this.uid || "_blank");
            b.location = this.url()
        }, k.prototype.isKilled = function() {
            return j.prototype.isKilled() || this.window.closed
        };
        var l = h.Iframe = function(a) {
            j.call(this, a), this.styles = a.styles || {}, this.tabIndex = a.tabIndex || 0, this.title = a.title || "Disqus", this.container = a.container, this.elem = null
        };
        DISQUS.extend(l.prototype, j.prototype), l.prototype.load = function() {
            var a = this.elem = c.createElement("iframe");
            a.setAttribute("id", this.uid), a.setAttribute("name", this.uid), a.setAttribute("allowTransparency", "true"), a.setAttribute("frameBorder", "0"), a.setAttribute("scrolling", "no"), this.role && a.setAttribute("role", this.role), a.setAttribute("tabindex", this.tabIndex), a.setAttribute("title", this.title), this.setInlineStyle(this.styles)
        }, l.prototype.getOffset = function(a) {
            return h.getOffset(this.elem, a)
        }, l.prototype.setInlineStyle = function(a, b) {
            var c = {};
            DISQUS.isString(a) ? c[a] = b : c = a;
            var d = this.elem.style;
            return "setProperty" in d ? void DISQUS.each(c, function(a, b) {
                d.setProperty(b, String(a), "important")
            }) : this._setInlineStyleCompat(c)
        }, l.prototype._setInlineStyleCompat = function(a) {
            this._stylesCache = this._stylesCache || {}, DISQUS.extend(this._stylesCache, a);
            var b = [];
            DISQUS.each(this._stylesCache, function(a, c) {
                b.push(c + ":" + a + " !important")
            }), this.elem.style.cssText = b.join(";")
        }, l.prototype.removeInlineStyle = function(a) {
            var b = this.elem.style;
            return "removeProperty" in b ? void b.removeProperty(a) : this._removeInlineStyleCompat(a)
        }, l.prototype._removeInlineStyleCompat = function(a) {
            this._stylesCache && (delete this._stylesCache[a], this._setInlineStyleCompat({}))
        }, l.prototype.hide = function() {
            this.setInlineStyle("display", "none")
        }, l.prototype.show = function() {
            this.removeInlineStyle("display")
        }, l.prototype.destroy = function() {
            return this.elem && this.elem.parentNode && (this.elem.parentNode.removeChild(this.elem), this.elem = null), j.prototype.destroy.call(this)
        };
        var m = h.Channel = function(a) {
            var b = this;
            b.window = null, l.call(b, a), b.styles = DISQUS.extend({
                width: "100%",
                border: "none",
                overflow: "hidden",
                height: "0"
            }, a.styles || {})
        };
        DISQUS.extend(m.prototype, l.prototype), m.prototype.load = function(a) {
            var c = this;
            l.prototype.load.call(c);
            var d = c.elem;
            d.setAttribute("width", "100%"), d.setAttribute("src", this.url()), h.addEvent(d, "load", function() {
                c.window = d.contentWindow, a && a()
            });
            var e = DISQUS.isString(this.container) ? b(c.container) : c.container;
            e.appendChild(d)
        }, m.prototype.destroy = function() {
            return this.window = null, l.prototype.destroy.call(this)
        };
        var n = h.Sandbox = function(a) {
            l.call(this, a), this.contents = a.contents || "", this.styles = DISQUS.extend({
                width: "100%",
                border: "none",
                overflow: "hidden"
            }, a.styles || {})
        };
        return DISQUS.extend(n.prototype, l.prototype), n.prototype.load = function() {
            l.prototype.load.call(this);
            var a = this.elem,
                d = DISQUS.isString(this.container) ? b(this.container) : this.container;
            d.appendChild(a), this.window = a.contentWindow;
            try {
                this.window.document.open()
            } catch (e) {
                a.src = 'javascript:var d=document.open();d.domain="' + c.domain + '";void(0);'
            }
            return this.document = this.window.document, this.document.write(this.contents), this.document.close(), this.updateHeight(), this
        }, n.prototype.updateHeight = function() {
            var a, b = this.document.body;
            b && (a = b.offsetHeight + "px", this.setInlineStyle({
                height: a,
                "min-height": a,
                "max-height": a
            }))
        }, n.prototype.show = function() {
            this.setInlineStyle("display", "block")
        }, n.prototype.click = function(a) {
            var b = this,
                c = b.document.body;
            h.addEvent(c, "click", function(c) {
                a.call(b, c)
            })
        }, n.prototype.setBodyClass = function(a) {
            this.document.body.className = a
        }, h.on = DISQUS.Events.on, h.off = DISQUS.Events.off, h.trigger = DISQUS.Events.trigger, h
    }), DISQUS.define("JSON", function(a) {
        "use strict";
        var b;
        if ("[object JSON]" === a.Object.prototype.toString.call(a.JSON)) b = a.JSON;
        else {
            var c = new DISQUS.Sandbox({
                container: "disqus_thread",
                styles: {
                    display: "none"
                }
            });
            try {
                b = c.load().window.JSON
            } catch (d) {}
            b || (b = a.JSON)
        }
        return b ? {
            stringify: b.stringify,
            parse: b.parse
        } : {}
    }), DISQUS.define("next.host.utils", function(a, b) {
        "use strict";

        function c(a) {
            a = a.toLowerCase(), a = a.replace(/\s/, "");
            var b = {
                aliceblue: "#F0F8FF",
                antiquewhite: "#FAEBD7",
                aqua: "#00FFFF",
                aquamarine: "#7FFFD4",
                azure: "#F0FFFF",
                beige: "#F5F5DC",
                bisque: "#FFE4C4",
                black: "#000000",
                blanchedalmond: "#FFEBCD",
                blue: "#0000FF",
                blueviolet: "#8A2BE2",
                brown: "#A52A2A",
                burlywood: "#DEB887",
                cadetblue: "#5F9EA0",
                chartreuse: "#7FFF00",
                chocolate: "#D2691E",
                coral: "#FF7F50",
                cornflowerblue: "#6495ED",
                cornsilk: "#FFF8DC",
                crimson: "#DC143C",
                cyan: "#00FFFF",
                darkblue: "#00008B",
                darkcyan: "#008B8B",
                darkgoldenrod: "#B8860B",
                darkgray: "#A9A9A9",
                darkgreen: "#006400",
                darkgrey: "#A9A9A9",
                darkkhaki: "#BDB76B",
                darkmagenta: "#8B008B",
                darkolivegreen: "#556B2F",
                darkorange: "#FF8C00",
                darkorchid: "#9932CC",
                darkred: "#8B0000",
                darksalmon: "#E9967A",
                darkseagreen: "#8FBC8F",
                darkslateblue: "#483D8B",
                darkslategray: "#2F4F4F",
                darkslategrey: "#2F4F4F",
                darkturquoise: "#00CED1",
                darkviolet: "#9400D3",
                deeppink: "#FF1493",
                deepskyblue: "#00BFFF",
                dimgray: "#696969",
                dimgrey: "#696969",
                dodgerblue: "#1E90FF",
                firebrick: "#B22222",
                floralwhite: "#FFFAF0",
                forestgreen: "#228B22",
                fuchsia: "#FF00FF",
                gainsboro: "#DCDCDC",
                ghostwhite: "#F8F8FF",
                gold: "#FFD700",
                goldenrod: "#DAA520",
                gray: "#808080",
                green: "#008000",
                greenyellow: "#ADFF2F",
                grey: "#808080",
                honeydew: "#F0FFF0",
                hotpink: "#FF69B4",
                indianred: "#CD5C5C",
                indigo: "#4B0082",
                ivory: "#FFFFF0",
                khaki: "#F0E68C",
                lavender: "#E6E6FA",
                lavenderblush: "#FFF0F5",
                lawngreen: "#7CFC00",
                lemonchiffon: "#FFFACD",
                lightblue: "#ADD8E6",
                lightcoral: "#F08080",
                lightcyan: "#E0FFFF",
                lightgoldenrodyellow: "#FAFAD2",
                lightgray: "#D3D3D3",
                lightgreen: "#90EE90",
                lightgrey: "#D3D3D3",
                lightpink: "#FFB6C1",
                lightsalmon: "#FFA07A",
                lightseagreen: "#20B2AA",
                lightskyblue: "#87CEFA",
                lightslategray: "#778899",
                lightslategrey: "#778899",
                lightsteelblue: "#B0C4DE",
                lightyellow: "#FFFFE0",
                lime: "#00FF00",
                limegreen: "#32CD32",
                linen: "#FAF0E6",
                magenta: "#FF00FF",
                maroon: "#800000",
                mediumaquamarine: "#66CDAA",
                mediumblue: "#0000CD",
                mediumorchid: "#BA55D3",
                mediumpurple: "#9370DB",
                mediumseagreen: "#3CB371",
                mediumslateblue: "#7B68EE",
                mediumspringgreen: "#00FA9A",
                mediumturquoise: "#48D1CC",
                mediumvioletred: "#C71585",
                midnightblue: "#191970",
                mintcream: "#F5FFFA",
                mistyrose: "#FFE4E1",
                moccasin: "#FFE4B5",
                navajowhite: "#FFDEAD",
                navy: "#000080",
                oldlace: "#FDF5E6",
                olive: "#808000",
                olivedrab: "#6B8E23",
                orange: "#FFA500",
                orangered: "#FF4500",
                orchid: "#DA70D6",
                palegoldenrod: "#EEE8AA",
                palegreen: "#98FB98",
                paleturquoise: "#AFEEEE",
                palevioletred: "#DB7093",
                papayawhip: "#FFEFD5",
                peachpuff: "#FFDAB9",
                peru: "#CD853F",
                pink: "#FFC0CB",
                plum: "#DDA0DD",
                powderblue: "#B0E0E6",
                purple: "#800080",
                red: "#FF0000",
                rosybrown: "#BC8F8F",
                royalblue: "#4169E1",
                saddlebrown: "#8B4513",
                salmon: "#FA8072",
                sandybrown: "#F4A460",
                seagreen: "#2E8B57",
                seashell: "#FFF5EE",
                sienna: "#A0522D",
                silver: "#C0C0C0",
                skyblue: "#87CEEB",
                slateblue: "#6A5ACD",
                slategray: "#708090",
                slategrey: "#708090",
                snow: "#FFFAFA",
                springgreen: "#00FF7F",
                steelblue: "#4682B4",
                tan: "#D2B48C",
                teal: "#008080",
                thistle: "#D8BFD8",
                tomato: "#FF6347",
                turquoise: "#40E0D0",
                violet: "#EE82EE",
                wheat: "#F5DEB3",
                white: "#FFFFFF",
                whitesmoke: "#F5F5F5",
                yellow: "#FFFF00",
                yellowgreen: "#9ACD32"
            };
            return b[a] || ""
        }

        function d(a) {
            if (!a || "embed.js" !== a.substring(a.length - 8)) return null;
            for (var b, c = [/(https?:)?\/\/(www\.)?disqus\.com\/forums\/([\w_\-]+)/i, /(https?:)?\/\/(www\.)?([\w_\-]+)\.disqus\.com/i, /(https?:)?\/\/(www\.)?dev\.disqus\.org\/forums\/([\w_\-]+)/i, /(https?:)?\/\/(www\.)?([\w_\-]+)\.dev\.disqus\.org/i], d = c.length, e = 0; d > e; e++)
                if (b = a.match(c[e]), b && b.length && 4 === b.length) return b[3];
            return null
        }

        function e(a, b) {
            var c, e, f, g = a.getElementsByTagName("script"),
                h = g.length;
            b = b || d;
            for (var i = h - 1; i >= 0; i--)
                if (c = g[i], e = c.getAttribute ? c.getAttribute("src") : c.src, f = b(e), null !== f) return f.toLowerCase();
            return null
        }

        function f(a, b) {
            var c, d, e = 0,
                f = new Array(a.length);
            for (c = 0; c <= a.length; c++)
                for (f[c] = new Array(b.length), d = 0; d <= b.length; d++) f[c][d] = 0;
            for (c = 0; c < a.length; c++)
                for (d = 0; d < b.length; d++) a[c] === b[d] && (f[c + 1][d + 1] = f[c][d] + 1, f[c + 1][d + 1] > e && (e = f[c + 1][d + 1]));
            return e
        }

        function g() {
            for (var a = u.getElementsByTagName("h1"), c = u.title, d = c.length, e = c, g = .6, h = function(a) {
                    var h, i = a.textContent || a.innerText;
                    null !== i && i !== b && (h = f(c, i) / d, h > g && (g = h, e = i))
                }, i = 0; i < a.length; i++) h(a[i]);
            return e
        }

        function h(a, b, c) {
            if (c = c || b, a === u) return "";
            var d = s(a, b, c);
            return "transparent" === d || "" === d || /rgba\(\d+,\s*\d+,\s*\d+,\s*0\)/.test(d) ? h(a.parentNode, b, c) : d || null
        }

        function i(a) {
            a = j(a), "#" === a.charAt(0) && (a = a.substr(1));
            var b = parseInt(a.substr(0, 2), 16),
                c = parseInt(a.substr(2, 2), 16),
                d = parseInt(a.substr(4, 2), 16),
                e = (299 * b + 587 * c + 114 * d) / 1e3;
            return e
        }

        function j(a) {
            return a = a.replace(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i, "#$1$1$2$2$3$3"), /^#?[a-f0-9]{6}$/.test(a) ? a : k(a) || c(a)
        }

        function k(a) {
            function b(a) {
                var b = Math.round(Number(a) * d + 255 * (1 - d)),
                    c = b.toString(16);
                return 1 === c.length ? "0" + c : c
            }
            var c = /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/.exec(a);
            if (!c || c.length < 4) return "";
            var d = parseFloat(c[4]) || 1,
                e = b(c[1]),
                f = b(c[2]),
                g = b(c[3]);
            return "#" + e + f + g
        }

        function l(a, b, c, d) {
            DISQUS.isString(b) && (b = u.createElement(b));
            var e = null;
            return b.style.visibility = "hidden", a.appendChild(b), e = h(b, c, d), a.removeChild(b), e
        }

        function m(a) {
            var b = u.createElement("a");
            return b.href = Number(new Date), l(a, b, "color")
        }

        function n(a) {
            return a.toLowerCase().replace(/^\s+|\s+$/g, "").replace(/['"]/g, "")
        }

        function o(a) {
            for (var b, c = l(a, "span", "font-family", "fontFamily"), d = c.split(","), e = {
                    courier: 1,
                    times: 1,
                    "times new roman": 1,
                    georgia: 1,
                    palatino: 1,
                    serif: 1
                }, f = 0; f < d.length; f++)
                if (b = n(d[f]), e.hasOwnProperty(b)) return !0;
            return !1
        }

        function p(a) {
            if (!a.postMessage) return 1;
            if (!a.JSON) return "Microsoft Internet Explorer" === a.navigator.appName ? 2 : 1;
            try {
                a.postMessage("ping", "*")
            } catch (b) {
                return 2
            }
            return 0
        }

        function q(b) {
            (new a.Image).src = DISQUS.serialize(t + "/stat.gif", {
                event: b
            })
        }

        function r(b) {
            (new a.Image).src = DISQUS.serialize(t + "/event.gif", b)
        }

        function s(b, c, d) {
            return a.getComputedStyle ? u.defaultView.getComputedStyle(b, null).getPropertyValue(c) : b.currentStyle ? b.currentStyle[c] ? b.currentStyle[c] : b.currentStyle[d] : void 0
        }
        var t = "https://referrer.disqus.com/juggler",
            u = a.document,
            v = function() {
                var a, b, c = function() {
                    return !1
                };
                if ("hidden" in u) a = "hidden", b = "visibilitychange";
                else {
                    if (!("webkitHidden" in u)) return {
                        isHidden: c,
                        listen: c,
                        stopListening: c
                    };
                    a = "webkitHidden", b = "webkitvisibilitychange"
                }
                return {
                    isHidden: function() {
                        return u[a]
                    },
                    listen: function(a) {
                        return DISQUS.addEvent(u, b, a)
                    },
                    stopListening: function(a) {
                        return DISQUS.removeEvent(u, b, a)
                    }
                }
            }(),
            w = function() {
                var a = u.createElement("div");
                a.style.visibility = "hidden", a.style.width = "100px", a.style.msOverflowStyle = "scrollbar", u.body.appendChild(a);
                var b = a.offsetWidth;
                a.style.overflow = "scroll";
                var c = u.createElement("div");
                c.style.width = "100%", a.appendChild(c);
                var d = c.offsetWidth;
                return a.parentNode.removeChild(a), b - d
            },
            x = function(a) {
                var b = a.split("."),
                    c = b.length > 2 ? b[b.length - 2] : "";
                return c.match(/^[0-9a-f]{32}$/i) && c
            },
            y = {
                isIE: function() {
                    return Boolean(u.documentMode)
                },
                isSafari: function() {
                    var b = a.navigator.userAgent.toLowerCase();
                    return b.indexOf("safari") > -1 && -1 === b.indexOf("chrome")
                }
            },
            z = {
                getItem: function(c) {
                    try {
                        return a.localStorage.getItem(c)
                    } catch (d) {
                        return b
                    }
                },
                setItem: function(b, c) {
                    try {
                        return a.localStorage.setItem(b, c)
                    } catch (d) {
                        return
                    }
                }
            },
            A = function() {
                var a = !0;
                return a || "https:" === u.location.protocol
            };
        return {
            MAX_Z_INDEX: 2147483647,
            getShortnameFromUrl: d,
            getForum: e,
            guessThreadTitle: g,
            getContrastYIQ: i,
            ensureHexColor: j,
            getElementStyle: l,
            getAnchorColor: m,
            normalizeFontValue: n,
            isSerif: o,
            getBrowserSupport: p,
            logStat: q,
            reportJester: r,
            getComputedStyle: s,
            pageVisibility: v,
            getScrollbarWidth: w,
            getLoaderVersionFromUrl: x,
            browser: y,
            storage: z,
            defaultProtocol: A() ? "https:" : "http:"
        }
    }), DISQUS.define("next.host.app", function(a) {
        "use strict";
        var b = DISQUS.isOwn,
            c = DISQUS.extend,
            d = DISQUS.use("next.host"),
            e = d.urls,
            f = document,
            g = f.documentElement,
            h = "https:",
            i = {
                getRegistry: function() {
                    return this._registry || (this._registry = {}), this._registry
                },
                register: function(a) {
                    var b = this.getRegistry();
                    b[a.uid] = a
                },
                unregister: function(a) {
                    var b = this.getRegistry();
                    delete b[a.uid]
                },
                listByKey: function() {
                    return this.getRegistry()
                },
                list: function() {
                    var a = this.getRegistry(),
                        c = [];
                    for (var d in a) b(a, d) && c.push(a[d]);
                    return c
                },
                get: function(a) {
                    var c = this.getRegistry();
                    return b(c, a) ? c[a] : null
                }
            },
            j = function(a) {
                var b = this.constructor;
                this.uid = DISQUS.getUid("dsq-app"), b.register && b.register(this), this.settings = a || {};
                var c = [],
                    d = this;
                do c.unshift(d), d = d.constructor.__super__; while (d);
                for (var e = 0, f = c.length; f > e; e++) d = c[e], d.events && this.on(d.events, this), d.onceEvents && this.once(d.onceEvents, this)
            };
        c(j.prototype, DISQUS.Events), j.prototype.destroy = function() {
            var a = this.constructor;
            this.off(), this.stopListening(), a.unregister && a.unregister(this)
        }, j.extend = function(a, d) {
            var e, f = this;
            e = a && b(a, "constructor") ? a.constructor : function() {
                return f.apply(this, arguments)
            }, c(e, f, d);
            var g = function() {
                this.constructor = e
            };
            return g.prototype = f.prototype, e.prototype = new g, a && c(e.prototype, a), e.__super__ = f.prototype, e
        };
        var k = j.extend({
            name: null,
            loaderVersion: null,
            frame: null,
            origin: e.ensureHttpBasedProtocol("http://disqus.com", h),
            state: null,
            getUrl: function(a, b) {
                return a = this.loaderVersion ? DISQUS.extend({
                    version: this.loaderVersion
                }, a) : DISQUS.extend({
                    disqus_version: "4e09777a"
                }, a), e.ensureHttpBasedProtocol(e.get(this.name, a, b), h)
            },
            getFrame: function() {
                var a, b = this.settings,
                    c = {
                        target: this.getUrl(),
                        origin: this.origin,
                        uid: this.uid
                    };
                return b.windowName ? c.windowName = b.windowName : c.container = this.settings.container || f.body, this.getFrameSettings && (c = this.getFrameSettings(c)), new(a = c.windowName ? DISQUS.Popup : DISQUS.Channel)(c)
            },
            setState: function(a) {
                var b = this.constructor;
                return a in b.states ? (this.state = b.states[a], void this.trigger("state:" + a)) : !1
            },
            init: function() {
                var a, b = this;
                b.frame = a = this.getFrame(), b.listenTo(a, "all", function(c, d) {
                    b.trigger("frame:" + c, d, a)
                }), b.trigger("change:frame", a), b.frame.load(function() {
                    b.setState("LOADED")
                }), b.setState("INIT")
            },
            destroy: function() {
                var a = this.frame;
                a && (this.stopListening(a), a.destroy()), this.setState("KILLED"), this.frame = null, j.prototype.destroy.call(this)
            },
            events: {
                "frame:ready": function() {
                    this.setState("READY")
                }
            }
        }, {
            states: {
                INIT: 0,
                LOADED: 1,
                READY: 2,
                RUNNING: 3,
                KILLED: 4
            }
        });
        c(k, i);
        var l = k.extend({
                getUrl: function() {
                    var b = this.settings,
                        c = {
                            f: b.forum,
                            t_i: b.identifier,
                            t_u: b.url || a.location.href,
                            t_s: b.slug,
                            t_e: b.title,
                            t_d: b.documentTitle,
                            t_t: b.title || b.documentTitle,
                            t_c: b.category,
                            s_o: b.sortOrder,
                            l: b.language
                        };
                    return b.unsupported && (c.n_s = b.unsupported), k.prototype.getUrl.call(this, c)
                },
                getFrameInitParams: function(b, c) {
                    var d = this.settings,
                        e = {
                            permalink: d.permalink,
                            anchorColor: d.anchorColor,
                            referrer: a.location.href,
                            hostReferrer: f.referrer,
                            colorScheme: d.colorScheme,
                            typeface: d.typeface,
                            remoteAuthS3: d.remoteAuthS3,
                            apiKey: d.apiKey,
                            sso: d.sso,
                            parentWindowHash: a.location.hash,
                            forceAutoStyles: d.forceAutoStyles,
                            layout: d.layout,
                            timestamp: this.timestamp
                        };
                    return c && c.elem && a.navigator.userAgent.match(/(iPad|iPhone|iPod)/) && (e.width = c.elem.offsetWidth), e.initialPosition = this.getViewportAndScrollStatus(), e
                },
                listenToScrollEvent: function(a) {
                    var b = this,
                        c = b.getScrollContainer();
                    if (c === g) return b.listenTo(DISQUS, "window.scroll", a),
                        function() {
                            b.stopListening(DISQUS, "window.scroll", a)
                        };
                    var d = DISQUS.throttle(function() {
                        a.call(b)
                    }, 250, 50);
                    return DISQUS.addEvent(c, "scroll", d),
                        function() {
                            DISQUS.removeEvent(c, "scroll", d)
                        }
                },
                getScrollContainer: function() {
                    if (this.scrollContainer) return this.scrollContainer;
                    if (!this.settings.enableScrollContainer) return g;
                    var a = this.settings.container;
                    do {
                        var b = d.utils.getComputedStyle(a, "overflow-y", "overflowY");
                        if (("scroll" === b || "auto" === b) && a.clientHeight < a.scrollHeight) break;
                        a = a.parentNode
                    } while (a && a !== g);
                    return a && a !== f.body || (a = g), this.scrollContainer = a
                },
                getViewportCoords: function() {
                    return this.getScrollContainer() === g ? this.getWindowCoords() : this.getScrollContainerCoords()
                },
                getWindowCoords: function() {
                    if ("number" == typeof a.pageYOffset) this.getWindowScroll = function() {
                        return a.pageYOffset
                    }, this.getWindowHeight = function() {
                        return a.innerHeight
                    };
                    else {
                        var b = a.document;
                        b = g.clientHeight || g.clientWidth ? g : b.body, this.getWindowScroll = function() {
                            return b.scrollTop
                        }, this.getWindowHeight = function() {
                            return b.clientHeight
                        }
                    }
                    return this.getWindowCoords = function() {
                        return {
                            top: this.getWindowScroll(),
                            height: this.getWindowHeight()
                        }
                    }, this.getWindowCoords()
                },
                getScrollContainerCoords: function() {
                    var a = this.getScrollContainer();
                    return {
                        top: a.scrollTop,
                        height: a.clientHeight
                    }
                },
                getDocumentHeight: function() {
                    var a = f.body,
                        b = f.documentElement;
                    return Math.max(a.scrollHeight, a.offsetHeight, b.clientHeight, b.scrollHeight, b.offsetHeight)
                },
                getViewportAndScrollStatus: function() {
                    var a = this.frame;
                    if (!a || !a.getOffset) return null;
                    var b = this.getViewportCoords();
                    return {
                        frameOffset: a.getOffset(this.getScrollContainer()),
                        pageOffset: b.top,
                        height: b.height
                    }
                },
                communicateViewportAndScrollStatus: function() {
                    var a = this.getViewportAndScrollStatus();
                    if (a) {
                        var b = a.frameOffset,
                            c = b.top,
                            d = c + b.height,
                            e = a.pageOffset,
                            f = a.height,
                            g = e + f,
                            h = !1,
                            i = !1;
                        g + f >= c && (h = d >= e, i = h && g >= c);
                        var j = this.frame;
                        j.sendMessage("window.scroll.always", a), h && j.sendMessage("window.scroll", a), i !== this.wasInViewport && (j.sendMessage(i ? "window.inViewport" : "window.scrollOffViewport"), this.wasInViewport = i)
                    }
                },
                getBestNextFrameHeight: function(a) {
                    var b = this.getViewportAndScrollStatus();
                    if (!b || this.settings.enableScrollContainer || !this.getScrollContainer()) return a;
                    var c = b.frameOffset;
                    if (a >= c.height) return a;
                    var d = this.getDocumentHeight(),
                        e = d - (c.height + c.top),
                        f = b.pageOffset + b.height - (c.top + e);
                    return f > a ? f + 1 : a
                },
                events: {
                    "state:INIT": function() {
                        this.settings.unsupported || (this.settings.windowName || (this.listenToScrollEvent(this.communicateViewportAndScrollStatus), this.listenTo(DISQUS, "window.resize", this.communicateViewportAndScrollStatus)), this.timestamp = Number(new Date))
                    },
                    "state:LOADED": function() {
                        var a = this.frame,
                            b = a.elem;
                        this.settings.unsupported ? (a.setInlineStyle("height", "500px"), b.setAttribute("scrolling", "yes"), b.setAttribute("horizontalscrolling", "no"), b.setAttribute("verticalscrolling", "yes"), a.show()) : this.settings.windowName || (this.rendered = !1, a.setInlineStyle("height", "0"), b.setAttribute("scrolling", "no"), b.setAttribute("horizontalscrolling", "no"), b.setAttribute("verticalscrolling", "no"))
                    },
                    "frame:ready": function(a, b) {
                        var c = this.getFrameInitParams(a, b);
                        b.sendMessage("init", c)
                    },
                    "frame:resize": function(a, b) {
                        var c = a.height;
                        b.elem && this.rendered && (c = this.getBestNextFrameHeight(c), b.setInlineStyle("height", c + "px"), b.sendMessage("embed.resized")), this.communicateViewportAndScrollStatus()
                    },
                    "frame:rendered": function(a, b) {
                        this.rendered = !0, this.wasInViewport = !1, b.trigger("resize", a), b.sendMessage("embed.rendered")
                    },
                    "frame:fail": function(a, b) {
                        b.elem && b.setInlineStyle("height", a && a.height || "75px")
                    },
                    "frame:scrollTo": function(b, c) {
                        if (c.elem && c.getOffset) {
                            var d = this.getScrollContainer(),
                                e = c.getOffset(d),
                                f = "window" === b.relative ? b.top : e.top + b.top,
                                h = this.getViewportCoords();
                            !b.force && f > h.top && f < h.top + h.height || (d === g ? a.scrollTo(0, f) : d.scrollTop = f)
                        }
                    }
                }
            }),
            m = function(a, b, c) {
                DISQUS.each(b, function(b) {
                    c[b] = function() {
                        return a[b].apply(a, arguments)
                    }
                })
            };
        return {
            expose: m,
            BaseApp: j,
            WindowedApp: k,
            ThreadBoundApp: l,
            PublicInterfaceMixin: i
        }
    }), DISQUS.define("next.host.home", function(a) {
        "use strict";
        var b = DISQUS.next.host,
            c = b.utils,
            d = b.app.WindowedApp,
            e = /^calc\((.+)\)$/,
            f = d.extend({
                name: "home",
                events: {
                    "frame:close": function(b, c) {
                        c.hide(), a.focus()
                    },
                    "frame:openReady": function() {
                        this.frame.show(), this.frame.sendMessage("open"), (c.browser.isIE() || c.browser.isSafari()) && this.preventScrolling()
                    },
                    "state:LOADED": function() {
                        this.frame.removeInlineStyle("visibility")
                    },
                    "frame:after:render": function() {
                        c.browser.isSafari() && this.triggerHostReflow()
                    }
                },
                preventScrolling: function() {
                    var a = this.getBodyOverflow(),
                        b = document.body.style.marginRight,
                        d = document.documentElement.style,
                        e = d.overflow;
                    this.listenToOnce(this, "frame:close", function() {
                        this.setBodyStyles({
                            overflow: a,
                            marginRight: b
                        }), d.overflow = e
                    }), this.setBodyStyles({
                        overflow: "hidden",
                        marginRight: this.calcMargin(c.getComputedStyle(document.body, "margin-right", "marginRight") || b)
                    }), d.overflow = "hidden"
                },
                triggerHostReflow: function() {
                    var a = document.createElement("style");
                    document.body.appendChild(a), document.body.removeChild(a)
                },
                calcMargin: function(a) {
                    var b = a.match(e);
                    return b && (a = b[1]), a ? "calc(" + a + " + " + c.getScrollbarWidth() + "px)" : c.getScrollbarWidth() + "px"
                },
                setBodyStyles: function(a) {
                    for (var b in a) document.body.style[b] = a[b]
                },
                getBodyOverflow: function() {
                    return document.body.style.overflow
                },
                getSecureOrigin: function() {
                    var a = b.urls.ensureHttpBasedProtocol("https://disqus.com/home/", "https:"),
                        c = a.split("/"),
                        d = c[0],
                        e = c[2];
                    return d + "//" + e
                },
                getFrameSettings: function(a) {
                    return a.role = "dialog", a.origin = this.getSecureOrigin(), a.styles = {
                        height: "100%",
                        position: "fixed",
                        top: 0,
                        right: 0,
                        left: "auto",
                        bottom: "auto",
                        "z-index": c.MAX_Z_INDEX,
                        visibility: "hidden"
                    }, a
                },
                getUrl: function() {
                    var a = this.settings.path || "",
                        c = this.settings.language,
                        d = {
                            utm_source: "disqus_embed"
                        };
                    return c && "en" !== c && (d.l = c), DISQUS.serialize(b.urls.apps[this.name] + a, d)
                },
                show: function(a) {
                    if (!this.frame.isReady()) return void this.once("frame:ready", function() {
                        this.show(a)
                    }, this);
                    var b = {
                        path: a
                    };
                    this.settings.sso && (b.sso = this.settings.sso), this.frame.sendMessage("showPath", b)
                }
            }, {
                READY_TIMEOUT: 1e4,
                getInstanceOrLoad: function(a) {
                    var b = f.instance;
                    return b ? b : (b = f.instance = new f(a), a.preload && b.listenToOnce(b, "state:INIT", function() {
                        b.frame.hide()
                    }), f.setHomeTimeout(b), b.init(), b)
                },
                setHomeTimeout: function(b) {
                    f.homeTimeoutId && a.clearTimeout(f.homeTimeoutId);
                    var c = f.homeTimeoutId = a.setTimeout(function() {
                        b.frame.destroy(), b.trigger("timeout")
                    }, f.READY_TIMEOUT);
                    b.listenToOnce(b, "state:READY", function() {
                        a.clearTimeout(c)
                    })
                },
                preload: function(a) {
                    return a.preload = !0, f.getInstanceOrLoad(a)
                },
                destroy: function() {
                    var a = f.instance;
                    a && (a.destroy(), f.instance = null)
                },
                show: function(a) {
                    var b = f.getInstanceOrLoad(a);
                    return b.show(a.path), b
                }
            });
        return {
            show: f.show,
            preload: f.preload,
            destroy: f.destroy,
            _HomeApp: f
        }
    }), DISQUS.define("next.host.lounge", function(a) {
        "use strict";
        var b = a.document,
            c = DISQUS.next.host,
            d = c.utils,
            e = c.app.ThreadBoundApp,
            f = function(a, c) {
                var d = b.createElement("div");
                d.innerHTML = c;
                for (var e = d.getElementsByTagName("script"), f = 0, g = e.length; g > f; f++) {
                    var h = e[f],
                        i = b.createElement("script");
                    i.innerHTML = h.innerHTML, d.replaceChild(i, h)
                }
                return a.appendChild(d), d
            },
            g = function(a, b) {
                var c = f(a, b);
                return a.insertBefore(c, a.firstChild), c
            },
            h = e.extend({
                name: "lounge",
                loaderVersion: d.getLoaderVersionFromUrl("//a.disquscdn.com/next/embed/lounge.load.fd91d13b2d924606287a773a18721766.js"),
                indicators: null,
                wasInViewport: !1,
                triggeredSlowEvent: !1,
                events: {
                    "state:INIT": function() {
                        var a = this.settings;
                        a.unsupported || (this.indicators = {}, this.isContainerVisible() ? this.addLoadingAnim() : this.addLoadingAnimOnContainerVisible(), this.bindPublisherCallbacks(), this.forwardGlobalEvents())
                    },
                    "state:LOADED": function() {
                        this.isContainerVisible() && this.addLoadingAnim()
                    },
                    "frame:reload": function() {
                        a.location.reload()
                    },
                    "frame:navigate": function(b) {
                        a.location.href = b
                    },
                    "frame:session.identify": function(a) {
                        this.trigger("session.identify", a)
                    },
                    "frame:posts.paginate": function() {
                        this.trigger("posts.paginate")
                    },
                    "frame:posts.count": function(a) {
                        this.trigger("posts.count", a)
                    },
                    "frame:posts.create": function(a) {
                        this.trigger("posts.create", {
                            id: a.id,
                            text: a.raw_message
                        })
                    },
                    "frame:posts.beforeCreate": function(a) {
                        this.onBeforePostCreate(a)
                    },
                    "frame:ads.inject": function(a) {
                        var b = ("top" === a.placement ? g : f)(this.settings.container, a.html);
                        this._injected = this._injected || [], this._injected.push(b)
                    },
                    "frame:home.destroy": function() {
                        this.destroyHome()
                    },
                    "frame:home.preload": function(a) {
                        this.preloadHome(a)
                    },
                    "frame:home.show": function(a) {
                        this.showHome(a)
                    },
                    "frame:home.open": function(b) {
                        a.location = b
                    },
                    "frame:indicator:init": function(a, b) {
                        if (b.getOffset) {
                            for (var c, e, f = ["north", "south"], g = this.indicators, h = b.getOffset().width + "px", i = {
                                    width: h,
                                    "min-width": h,
                                    "max-width": h,
                                    position: "fixed",
                                    "z-index": d.MAX_Z_INDEX - 1
                                }, j = {
                                    north: {
                                        top: "0"
                                    },
                                    south: {
                                        bottom: "0"
                                    }
                                }, k = function() {
                                    b.sendMessage("indicator:click", this.uid.split("-")[1])
                                }, l = 0; l < f.length; l++) {
                                e = f[l], c = new DISQUS.Sandbox({
                                    uid: "indicator-" + e,
                                    container: this.settings.container,
                                    contents: a[e].contents,
                                    styles: DISQUS.extend(j[e], i),
                                    role: "alert",
                                    type: e
                                });
                                try {
                                    c.load()
                                } catch (m) {
                                    continue
                                }
                                c.hide(), c.click(k), g[e] = c
                            }
                            this.on({
                                "frame:indicator:show": function(a) {
                                    var b = g[a.type];
                                    b && (b.document.getElementById("message").innerHTML = a.content, b.show())
                                },
                                "frame:indicator:hide": function(a) {
                                    var b = a && a.type,
                                        c = b && g[b];
                                    if (c) c.hide();
                                    else if (!b)
                                        for (var d = 0; d < f.length; d++) b = f[d], c = g[b], c && c.hide()
                                }
                            })
                        }
                    },
                    "frame:change:sort": function(a) {
                        d.storage.setItem("disqus.sort", a)
                    },
                    "frame:fail frame:rendered": function() {
                        this.removeLoadingAnim(), this.setState("RUNNING")
                    },
                    "frame:fail": function(a) {
                        d.logStat("failed_embed.server." + a.code)
                    },
                    "frame:rendered": function() {
                        this.triggeredSlowEvent && d.logStat("rendered_embed.slow")
                    }
                },
                onceEvents: {
                    "frame:viglink:init": function(b, c) {
                        var d = function() {
                            for (var b in a)
                                if (0 === b.indexOf("skimlinks") || 0 === b.indexOf("skimwords")) return !0;
                            return !1
                        };
                        if (!(a.vglnk_self || a.vglnk || d())) {
                            var e = b.apiUrl,
                                f = b.key,
                                g = String(b.id);
                            null != b.clientUrl && null != e && null != f && null != b.id && (this.listenForAffiliationRequests(e, f, g), DISQUS.define("vglnk", function() {
                                return {
                                    api_url: e,
                                    key: f,
                                    sub_id: g,
                                    onlibready: function() {
                                        c.sendMessage("viglink:change:timeout", {
                                            timeout: DISQUS.vglnk.opt("click_timeout")
                                        })
                                    }
                                }
                            }), a.vglnk_self = "DISQUS.vglnk", DISQUS.require(b.clientUrl))
                        }
                    }
                },
                getFrameInitParams: function(a, b) {
                    var c = e.prototype.getFrameInitParams.call(this, a, b);
                    return c.discovery = this.settings.discovery, c
                },
                onBeforePostCreate: function(a) {
                    var b = {
                        text: a.raw_message
                    };
                    try {
                        var c = this.settings.callbacks.beforeComment;
                        if (c)
                            for (var d = 0; d < c.length; d++) b = c[d](b)
                    } catch (e) {
                        DISQUS.log("Error processing Disqus callback: ", e.toString())
                    } finally {
                        this.frame.sendMessage("posts.beforeCreate.response", b && b.text)
                    }
                },
                destroyHome: function() {
                    c.home.destroy()
                },
                preloadHome: function(a) {
                    a.path = "home/preload/";
                    var b = this.home = c.home.preload(this.getHomeData(a));
                    this.listenToOnce(b, "frame:ready", function() {
                        this.frame.sendMessage("home.ready")
                    }), this.handleHomeTimeout(b)
                },
                handleHomeTimeout: function(a) {
                    this.listenTo(a, "timeout", function() {
                        this.frame.sendMessage("home.timeout")
                    })
                },
                showHome: function(a) {
                    var b = this.home = c.home.show(this.getHomeData(a));
                    this.listenToOnce(b, "frame:openReady", function() {
                        this.frame.sendMessage("home.opened")
                    }), this.handleHomeTimeout(b)
                },
                getHomeData: function(a) {
                    var b = this.settings;
                    return a.language || (a.language = b.language), b.apiKey && b.remoteAuthS3 && (a.sso = {
                        apiKey: b.apiKey,
                        remoteAuthS3: b.remoteAuthS3
                    }), a
                },
                listenForAffiliationRequests: function(a, b, c) {
                    var d = this.frame;
                    this.on("frame:viglink:getaffiliatelink", function(e) {
                        function f(a) {
                            return function(b) {
                                var c = {
                                    linkId: a
                                };
                                b && (c.url = b), d.sendMessage("viglink:getaffiliatelink:response", c)
                            }
                        }
                        var g = DISQUS.vglnk.$;
                        return g ? void g.request(a + "/click", {
                            format: "jsonp",
                            out: e.url,
                            key: b,
                            loc: d.target,
                            subId: c
                        }, {
                            fn: f(e.linkId),
                            timeout: DISQUS.vglnk.opt("click_timeout")
                        }) : void d.sendMessage("viglink:getaffiliatelink:response")
                    })
                },
                forwardGlobalEvents: function() {
                    var a = this;
                    a.settings.windowName || (a.listenTo(DISQUS, "window.resize", function() {
                        a.frame.sendMessage("window.resize")
                    }), a.listenTo(DISQUS, "window.click", function() {
                        a.frame.sendMessage("window.click")
                    }), a.listenTo(DISQUS, "window.mousemove", function() {
                        a.frame.sendMessage("window.mousemove")
                    })), a.listenTo(DISQUS, "window.hashchange", function(b) {
                        a.frame.sendMessage("window.hashchange", b.hash)
                    })
                },
                bindPublisherCallbacks: function() {
                    var a = this,
                        b = a.settings,
                        c = h.LEGACY_EVENTS_MAPPING,
                        d = b.callbacks;
                    d && DISQUS.each(d, function(b, d) {
                        c[d] && DISQUS.each(b, function(b) {
                            a.on(c[d], b)
                        })
                    })
                },
                isContainerVisible: function() {
                    var a = this.getViewportCoords(),
                        b = DISQUS.getOffset(this.settings.container, this.getScrollContainer()),
                        c = b.top + b.height - a.top;
                    return c > 0 && c <= a.height
                },
                showSlowLoadingMessage: function() {
                    var a, b = this;
                    if (b.loadingElem) {
                        if (d.pageVisibility.isHidden()) return a = function() {
                            d.pageVisibility.stopListening(a), b.setSlowLoadingMessageTimer(2e3)
                        }, void d.pageVisibility.listen(a);
                        b.triggeredSlowEvent = !0, d.logStat(b.state === b.constructor.states.READY ? "slow_embed.got_ready" : b.state === b.constructor.states.LOADED ? "slow_embed.loaded" : "slow_embed.no_ready"), b.loadingElem.firstChild.insertAdjacentHTML("afterend", '<p align="center">Disqus seems to be taking longer than usual. <a href="#" onclick="DISQUS.reset({reload: true}); return false;">Reload</a>?</p>')
                    }
                },
                clearSlowLoadingMessageTimer: function() {
                    this.timeout && (a.clearTimeout(this.timeout), this.timeout = null)
                },
                setSlowLoadingMessageTimer: function(b) {
                    var c = this;
                    c.clearSlowLoadingMessageTimer(), c.timeout = a.setTimeout(function() {
                        c.showSlowLoadingMessage()
                    }, b)
                },
                addLoadingAnimOnContainerVisible: function() {
                    var a, b = this;
                    a = b.listenToScrollEvent(function() {
                        var c = b.isContainerVisible();
                        (c || b.state >= b.constructor.states.RUNNING) && a(), c && b.addLoadingAnim()
                    })
                },
                addLoadingAnim: function() {
                    var a, c, e, f = this,
                        g = f.settings.container;
                    if (f.loadingElem) return f.loadingElem;
                    if (!(f.state >= f.constructor.states.RUNNING)) {
                        var h = b.createElement("link");
                        h.rel = "stylesheet", h.href = "//a.disquscdn.com/next/embed/styles/loading.8023a7350e47171f7bb79707886cd7c5.css", (b.head || b.getElementsByTagName("head")[0]).appendChild(h), a = b.createElement("div"), c = b.createElement("div"), e = b.createElement("div"), c.appendChild(e), a.appendChild(c), a.dir = "ltr", a.style.overflow = "hidden";
                        var i = "dark" === f.settings.colorScheme;
                        c.className = "disqus-loader-bubble";
                        var j = c.style;
                        j.height = "52px", j.width = "54px", j.margin = "0 auto", j.overflow = "hidden", j.position = "relative", i && (j.backgroundPosition = "0 -52px");
                        var k = 13,
                            l = i ? "rgba(223, 228, 237, .4)" : "rgba(51, 54, 58, .4)",
                            m = i ? "#6D6F72" : "#A3A7AD",
                            n = e.style;
                        return j.boxSizing = n.boxSizing = "border-box", n.height = n.width = 2 * k + "px", n.position = "absolute", n.top = "13px", n.left = "15px", "borderRadius" in n ? (n.borderWidth = "3px", n.borderStyle = "solid", n.borderColor = l + " transparent", n.borderRadius = k + "px", n.transformOrigin = "50% 50% 0px", e.className = "disqus-loader-spinner") : n.borderLeft = "3px solid " + m, g.appendChild(a), f.loadingElem = a, d.logStat("lounge.loading.view"), f.setSlowLoadingMessageTimer(15e3), f.loadingElem
                    }
                },
                removeLoadingAnim: function() {
                    var a = this.loadingElem,
                        b = this.settings.container;
                    this.clearSlowLoadingMessageTimer(), a && a.parentNode === b && (b.removeChild(a), this.loadingElem = null)
                },
                destroy: function() {
                    var a = this.indicators;
                    if (this.removeLoadingAnim(), a && a.north && (a.north.destroy(), a.north = null), this._injected)
                        for (var b = 0; b < this._injected.length; b++) this.settings.container.removeChild(this._injected[b]);
                    a && a.south && (a.south.destroy(), a.south = null), e.prototype.destroy.call(this)
                }
            }, {
                LEGACY_EVENTS_MAPPING: {
                    onReady: "frame:rendered",
                    onNewComment: "posts.create",
                    onPaginate: "posts.paginate",
                    onCommentCountChange: "posts.count",
                    onIdentify: "session.identify"
                }
            }),
            i = function(a) {
                return new h(a)
            };
        return c.app.expose(h, ["list", "listByKey", "get"], i), {
            Lounge: i
        }
    }), DISQUS.define("next.host.config", function(a, b) {
        "use strict";
        var c = DISQUS.use("next.host.utils"),
            d = function(a, c) {
                this.win = a, this.configurator = c, this.config = {
                    page: {
                        url: b,
                        title: b,
                        slug: b,
                        category_id: b,
                        identifier: b,
                        language: b,
                        api_key: b,
                        remote_auth_s3: b,
                        author_s3: b
                    },
                    experiment: {
                        enable_scroll_container: !0,
                        force_auto_styles: b,
                        sort_order: b
                    },
                    discovery: {
                        disable_all: b,
                        disable_promoted: b,
                        sponsored_comment_id: b,
                        preview: !1,
                        adsFixture: b,
                        pdFixture: b
                    },
                    strings: b,
                    sso: {},
                    callbacks: {
                        preData: [],
                        preInit: [],
                        onInit: [],
                        afterRender: [],
                        onReady: [],
                        onNewComment: [],
                        preReset: [],
                        onPaginate: [],
                        onIdentify: [],
                        beforeComment: []
                    }
                }
            };
        d.DISQUS_GLOBALS = ["shortname", "identifier", "url", "title", "category_id", "slug"];
        var e = d.prototype;
        return e.getContainer = function() {
            var a = this.win;
            return a.document.getElementById(a.disqus_container_id || "disqus_thread")
        }, e.runConfigurator = function() {
            var a = this.configurator || this.win.disqus_config;
            if ("function" == typeof a) try {
                a.call(this.config)
            } catch (b) {}
        }, e.getValuesFromGlobals = function() {
            var a, b = this.win,
                e = this.config,
                f = e.page;
            DISQUS.each(d.DISQUS_GLOBALS, function(a) {
                var c = b["disqus_" + a];
                "undefined" != typeof c && (f[a] = c)
            }), this.runConfigurator(), e.forum || (a = f.shortname, e.forum = a ? a.toLowerCase() : c.getForum(b.document))
        }, e.toJSON = function() {
            var a = this.win,
                b = this.config,
                d = b.page,
                e = this.getContainer();
            return this.getValuesFromGlobals(), {
                container: e,
                forum: b.forum,
                sortOrder: b.experiment.sort_order || c.storage.getItem("disqus.sort") || "default",
                language: b.language,
                typeface: c.isSerif(e) ? "serif" : "sans-serif",
                anchorColor: c.getAnchorColor(e),
                colorScheme: c.getContrastYIQ(c.getElementStyle(e, "span", "background-color", "backgroundColor")) < 128 ? "dark" : "light",
                url: d.url || a.location.href.replace(/#.*$/, ""),
                title: d.title,
                documentTitle: c.guessThreadTitle(),
                slug: d.slug,
                category: d.category_id,
                identifier: d.identifier,
                discovery: b.discovery,
                apiKey: d.api_key,
                remoteAuthS3: d.remote_auth_s3,
                sso: b.sso,
                unsupported: c.getBrowserSupport(a),
                callbacks: b.callbacks,
                enableScrollContainer: b.experiment.enable_scroll_container,
                forceAutoStyles: b.experiment.force_auto_styles
            }
        }, {
            HostConfig: d
        }
    }), DISQUS.define("next.host.loader", function(a) {
        "use strict";
        var b, c = DISQUS.use("next.host.loader"),
            d = DISQUS.use("next.host"),
            e = new d.config.HostConfig(a),
            f = !1,
            g = function() {
                var b = a.document;
                if (b.getElementsByClassName) {
                    if ("complete" !== b.readyState) return DISQUS.addEvent(a, "load", g);
                    var c = b.getElementsByClassName("dsq-brlink"),
                        d = c && c.length && c[0];
                    d && d.parentNode.removeChild(d)
                }
            },
            h = function(a) {
                if (b) return i({
                    reload: !0
                }), DISQUS.log("Use DISQUS.reset instead of reloading embed.js please."), void DISQUS.log("See https://help.disqus.com/customer/portal/articles/472107-using-disqus-on-ajax-sites");
                e.configurator = a;
                var g = e.toJSON();
                return f || (g.container.innerHTML = "", f = !0), b = d.lounge.Lounge(g), b.init(), c.removeDisqusLink(), b
            },
            i = function(a) {
                a = a || {}, b && (b.triggeredSlowEvent && b.state !== b.constructor.states.RUNNING && d.utils.logStat("reset_embed.slow"), b.destroy(), b = null), a.reload && c.loadEmbed(a.config)
            };
        return {
            configAdapter: e,
            removeDisqusLink: g,
            loadEmbed: h,
            reset: i
        }
    }),
    function() {
        "use strict";
        DISQUS.reset = DISQUS.next.host.loader.reset, DISQUS.request = {
            get: function(a, b, c) {
                DISQUS.require(a, b, c)
            }
        }
    }(), DISQUS.next.host.loader.loadEmbed();