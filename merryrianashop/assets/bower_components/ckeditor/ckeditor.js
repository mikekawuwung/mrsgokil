/*
Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.md or http://ckeditor.com/license
*/
(function() {
	function ka(a, f) {
		CKEDITOR.tools.extend(this, f, {
			editor: a,
			id: "cke-" + CKEDITOR.tools.getUniqueId(),
			area: a._.notificationArea
		});
		f.type || (this.type = "info");
		this.element = this._createElement();
		a.plugins.clipboard && CKEDITOR.plugins.clipboard.preventDefaultDropOnElement(this.element)
	}

	function la(a) {
		var f = this;
		this.editor = a;
		this.notifications = [];
		this.element = this._createElement();
		this._uiBuffer = CKEDITOR.tools.eventsBuffer(10, this._layout, this);
		this._changeBuffer = CKEDITOR.tools.eventsBuffer(500, this._layout, this);
		a.on("destroy", function() {
			f._removeListeners();
			f.element.remove()
		})
	}
	window.CKEDITOR && window.CKEDITOR.dom || (window.CKEDITOR || (window.CKEDITOR = function() {
		var a = /(^|.*[\\\/])ckeditor\.js(?:\?.*|;.*)?$/i,
			f = {
				timestamp: "H4PF",
				version: "4.7.0 (Standard)",
				revision: "320013d56",
				rnd: Math.floor(900 * Math.random()) + 100,
				_: {
					pending: [],
					basePathSrcPattern: a
				},
				status: "unloaded",
				basePath: function() {
					var c = window.CKEDITOR_BASEPATH || "";
					if (!c)
						for (var b = document.getElementsByTagName("script"), f = 0; f < b.length; f++) {
							var d = b[f].src.match(a);
							if (d) {
								c = d[1];
								break
							}
						} - 1 == c.indexOf(":/") && "//" != c.slice(0, 2) && (c = 0 === c.indexOf("/") ? location.href.match(/^.*?:\/\/[^\/]*/)[0] + c : location.href.match(/^[^\?]*\/(?:)/)[0] + c);
					if (!c) throw 'The CKEditor installation path could not be automatically detected. Please set the global variable "CKEDITOR_BASEPATH" before creating editor instances.';
					return c
				}(),
				getUrl: function(a) {
					-1 == a.indexOf(":/") && 0 !== a.indexOf("/") && (a = this.basePath + a);
					this.timestamp && "/" != a.charAt(a.length - 1) && !/[&?]t=/.test(a) && (a += (0 <= a.indexOf("?") ? "\x26" : "?") + "t\x3d" + this.timestamp);
					return a
				},
				domReady: function() {
					function a() {
						try {
							document.addEventListener ? (document.removeEventListener("DOMContentLoaded", a, !1), c()) : document.attachEvent && "complete" === document.readyState && (document.detachEvent("onreadystatechange", a), c())
						} catch (d) {}
					}

					function c() {
						for (var a; a = b.shift();) a()
					}
					var b = [];
					return function(d) {
						function c() {
							try {
								document.documentElement.doScroll("left")
							} catch (g) {
								setTimeout(c, 1);
								return
							}
							a()
						}
						b.push(d);
						"complete" === document.readyState && setTimeout(a, 1);
						if (1 == b.length)
							if (document.addEventListener) document.addEventListener("DOMContentLoaded", a, !1), window.addEventListener("load", a, !1);
							else if (document.attachEvent) {
							document.attachEvent("onreadystatechange", a);
							window.attachEvent("onload", a);
							d = !1;
							try {
								d = !window.frameElement
							} catch (m) {}
							document.documentElement.doScroll && d && c()
						}
					}
				}()
			},
			b = window.CKEDITOR_GETURL;
		if (b) {
			var c = f.getUrl;
			f.getUrl = function(a) {
				return b.call(f, a) || c.call(f, a)
			}
		}
		return f
	}()), CKEDITOR.event || (CKEDITOR.event = function() {}, CKEDITOR.event.implementOn = function(a) {
		var f = CKEDITOR.event.prototype,
			b;
		for (b in f) null == a[b] && (a[b] = f[b])
	}, CKEDITOR.event.prototype = function() {
		function a(a) {
			var e = f(this);
			return e[a] || (e[a] = new b(a))
		}
		var f = function(a) {
				a = a.getPrivate && a.getPrivate() || a._ || (a._ = {});
				return a.events || (a.events = {})
			},
			b = function(a) {
				this.name = a;
				this.listeners = []
			};
		b.prototype = {
			getListenerIndex: function(a) {
				for (var b = 0, f = this.listeners; b < f.length; b++)
					if (f[b].fn == a) return b;
				return -1
			}
		};
		return {
			define: function(b, e) {
				var f = a.call(this, b);
				CKEDITOR.tools.extend(f, e, !0)
			},
			on: function(b, e, f, k, d) {
				function h(a, g, d, h) {
					a = {
						name: b,
						sender: this,
						editor: a,
						data: g,
						listenerData: k,
						stop: d,
						cancel: h,
						removeListener: m
					};
					return !1 === e.call(f, a) ? !1 : a.data
				}

				function m() {
					n.removeListener(b, e)
				}
				var g = a.call(this, b);
				if (0 > g.getListenerIndex(e)) {
					g = g.listeners;
					f || (f = this);
					isNaN(d) && (d = 10);
					var n = this;
					h.fn = e;
					h.priority = d;
					for (var p = g.length - 1; 0 <= p; p--)
						if (g[p].priority <= d) return g.splice(p + 1, 0, h), {
							removeListener: m
						};
					g.unshift(h)
				}
				return {
					removeListener: m
				}
			},
			once: function() {
				var a = Array.prototype.slice.call(arguments),
					b = a[1];
				a[1] = function(a) {
					a.removeListener();
					return b.apply(this, arguments)
				};
				return this.on.apply(this, a)
			},
			capture: function() {
				CKEDITOR.event.useCapture = 1;
				var a = this.on.apply(this, arguments);
				CKEDITOR.event.useCapture = 0;
				return a
			},
			fire: function() {
				var a = 0,
					b = function() {
						a = 1
					},
					l = 0,
					k = function() {
						l = 1
					};
				return function(d, h, m) {
					var g = f(this)[d];
					d = a;
					var n = l;
					a = l = 0;
					if (g) {
						var p = g.listeners;
						if (p.length)
							for (var p = p.slice(0), r, x = 0; x < p.length; x++) {
								if (g.errorProof) try {
									r = p[x].call(this, m, h, b, k)
								} catch (v) {} else r = p[x].call(this, m, h, b, k);
								!1 === r ? l = 1 : "undefined" != typeof r && (h = r);
								if (a || l) break
							}
					}
					h = l ? !1 : "undefined" == typeof h ? !0 : h;
					a = d;
					l = n;
					return h
				}
			}(),
			fireOnce: function(a, b, l) {
				b = this.fire(a, b, l);
				delete f(this)[a];
				return b
			},
			removeListener: function(a, b) {
				var l = f(this)[a];
				if (l) {
					var k = l.getListenerIndex(b);
					0 <= k && l.listeners.splice(k, 1)
				}
			},
			removeAllListeners: function() {
				var a = f(this),
					b;
				for (b in a) delete a[b]
			},
			hasListeners: function(a) {
				return (a = f(this)[a]) && 0 < a.listeners.length
			}
		}
	}()), CKEDITOR.editor || (CKEDITOR.editor = function() {
		CKEDITOR._.pending.push([this, arguments]);
		CKEDITOR.event.call(this)
	}, CKEDITOR.editor.prototype.fire = function(a, f) {
		a in {
			instanceReady: 1,
			loaded: 1
		} && (this[a] = !0);
		return CKEDITOR.event.prototype.fire.call(this, a, f, this)
	}, CKEDITOR.editor.prototype.fireOnce = function(a, f) {
		a in {
			instanceReady: 1,
			loaded: 1
		} && (this[a] = !0);
		return CKEDITOR.event.prototype.fireOnce.call(this, a, f, this)
	}, CKEDITOR.event.implementOn(CKEDITOR.editor.prototype)), CKEDITOR.env || (CKEDITOR.env = function() {
		var a = navigator.userAgent.toLowerCase(),
			f = a.match(/edge[ \/](\d+.?\d*)/),
			b = -1 < a.indexOf("trident/"),
			b = !(!f && !b),
			b = {
				ie: b,
				edge: !!f,
				webkit: !b && -1 < a.indexOf(" applewebkit/"),
				air: -1 < a.indexOf(" adobeair/"),
				mac: -1 < a.indexOf("macintosh"),
				quirks: "BackCompat" == document.compatMode && (!document.documentMode || 10 > document.documentMode),
				mobile: -1 < a.indexOf("mobile"),
				iOS: /(ipad|iphone|ipod)/.test(a),
				isCustomDomain: function() {
					if (!this.ie) return !1;
					var a = document.domain,
						b = window.location.hostname;
					return a != b && a != "[" + b + "]"
				},
				secure: "https:" == location.protocol
			};
		b.gecko = "Gecko" == navigator.product && !b.webkit && !b.ie;
		b.webkit && (-1 < a.indexOf("chrome") ? b.chrome = !0 : b.safari = !0);
		var c = 0;
		b.ie && (c = f ? parseFloat(f[1]) : b.quirks || !document.documentMode ? parseFloat(a.match(/msie (\d+)/)[1]) : document.documentMode, b.ie9Compat = 9 == c, b.ie8Compat = 8 == c, b.ie7Compat = 7 == c, b.ie6Compat = 7 > c || b.quirks);
		b.gecko && (f = a.match(/rv:([\d\.]+)/)) && (f = f[1].split("."), c = 1E4 * f[0] + 100 * (f[1] || 0) + 1 * (f[2] || 0));
		b.air && (c = parseFloat(a.match(/ adobeair\/(\d+)/)[1]));
		b.webkit && (c = parseFloat(a.match(/ applewebkit\/(\d+)/)[1]));
		b.version = c;
		b.isCompatible = !(b.ie && 7 > c) && !(b.gecko && 4E4 > c) && !(b.webkit && 534 > c);
		b.hidpi = 2 <= window.devicePixelRatio;
		b.needsBrFiller = b.gecko || b.webkit || b.ie && 10 < c;
		b.needsNbspFiller = b.ie && 11 > c;
		b.cssClass = "cke_browser_" + (b.ie ? "ie" : b.gecko ? "gecko" : b.webkit ? "webkit" : "unknown");
		b.quirks && (b.cssClass += " cke_browser_quirks");
		b.ie && (b.cssClass += " cke_browser_ie" + (b.quirks ? "6 cke_browser_iequirks" : b.version));
		b.air && (b.cssClass += " cke_browser_air");
		b.iOS && (b.cssClass += " cke_browser_ios");
		b.hidpi && (b.cssClass += " cke_hidpi");
		return b
	}()), "unloaded" == CKEDITOR.status && function() {
		CKEDITOR.event.implementOn(CKEDITOR);
		CKEDITOR.loadFullCore = function() {
			if ("basic_ready" != CKEDITOR.status) CKEDITOR.loadFullCore._load = 1;
			else {
				delete CKEDITOR.loadFullCore;
				var a = document.createElement("script");
				a.type = "text/javascript";
				a.src = CKEDITOR.basePath + "ckeditor.js";
				document.getElementsByTagName("head")[0].appendChild(a)
			}
		};
		CKEDITOR.loadFullCoreTimeout = 0;
		CKEDITOR.add = function(a) {
			(this._.pending || (this._.pending = [])).push(a)
		};
		(function() {
			CKEDITOR.domReady(function() {
				var a = CKEDITOR.loadFullCore,
					f = CKEDITOR.loadFullCoreTimeout;
				a && (CKEDITOR.status = "basic_ready", a && a._load ? a() : f && setTimeout(function() {
					CKEDITOR.loadFullCore && CKEDITOR.loadFullCore()
				}, 1E3 * f))
			})
		})();
		CKEDITOR.status = "basic_loaded"
	}(), "use strict", CKEDITOR.VERBOSITY_WARN = 1, CKEDITOR.VERBOSITY_ERROR = 2, CKEDITOR.verbosity = CKEDITOR.VERBOSITY_WARN | CKEDITOR.VERBOSITY_ERROR, CKEDITOR.warn = function(a, f) {
		CKEDITOR.verbosity & CKEDITOR.VERBOSITY_WARN && CKEDITOR.fire("log", {
			type: "warn",
			errorCode: a,
			additionalData: f
		})
	}, CKEDITOR.error = function(a, f) {
		CKEDITOR.verbosity & CKEDITOR.VERBOSITY_ERROR && CKEDITOR.fire("log", {
			type: "error",
			errorCode: a,
			additionalData: f
		})
	}, CKEDITOR.on("log", function(a) {
		if (window.console && window.console.log) {
			var f = console[a.data.type] ? a.data.type : "log",
				b = a.data.errorCode;
			if (a = a.data.additionalData) console[f]("[CKEDITOR] Error code: " + b + ".", a);
			else console[f]("[CKEDITOR] Error code: " + b + ".");
			console[f]("[CKEDITOR] For more information about this error go to http://docs.ckeditor.com/#!/guide/dev_errors-section-" + b)
		}
	}, null, null, 999), CKEDITOR.dom = {}, function() {
		var a = [],
			f = CKEDITOR.env.gecko ? "-moz-" : CKEDITOR.env.webkit ? "-webkit-" : CKEDITOR.env.ie ? "-ms-" : "",
			b = /&/g,
			c = />/g,
			e = /</g,
			l = /"/g,
			k = /&(lt|gt|amp|quot|nbsp|shy|#\d{1,5});/g,
			d = {
				lt: "\x3c",
				gt: "\x3e",
				amp: "\x26",
				quot: '"',
				nbsp: " ",
				shy: "­"
			},
			h = function(a, g) {
				return "#" == g[0] ? String.fromCharCode(parseInt(g.slice(1), 10)) : d[g]
			};
		CKEDITOR.on("reset", function() {
			a = []
		});
		CKEDITOR.tools = {
			arrayCompare: function(a, g) {
				if (!a && !g) return !0;
				if (!a || !g || a.length != g.length) return !1;
				for (var d = 0; d < a.length; d++)
					if (a[d] != g[d]) return !1;
				return !0
			},
			getIndex: function(a, g) {
				for (var d = 0; d < a.length; ++d)
					if (g(a[d])) return d;
				return -1
			},
			clone: function(a) {
				var g;
				if (a && a instanceof Array) {
					g = [];
					for (var d = 0; d < a.length; d++) g[d] = CKEDITOR.tools.clone(a[d]);
					return g
				}
				if (null === a || "object" != typeof a || a instanceof String || a instanceof Number || a instanceof Boolean || a instanceof Date || a instanceof RegExp || a.nodeType || a.window === a) return a;
				g = new a.constructor;
				for (d in a) g[d] = CKEDITOR.tools.clone(a[d]);
				return g
			},
			capitalize: function(a, g) {
				return a.charAt(0).toUpperCase() + (g ? a.slice(1) : a.slice(1).toLowerCase())
			},
			extend: function(a) {
				var g = arguments.length,
					d, b;
				"boolean" == typeof(d = arguments[g - 1]) ? g-- : "boolean" == typeof(d = arguments[g - 2]) && (b = arguments[g - 1], g -= 2);
				for (var h = 1; h < g; h++) {
					var c = arguments[h],
						e;
					for (e in c)
						if (!0 === d || null == a[e])
							if (!b || e in b) a[e] = c[e]
				}
				return a
			},
			prototypedCopy: function(a) {
				var g = function() {};
				g.prototype = a;
				return new g
			},
			copy: function(a) {
				var g = {},
					d;
				for (d in a) g[d] = a[d];
				return g
			},
			isArray: function(a) {
				return "[object Array]" == Object.prototype.toString.call(a)
			},
			isEmpty: function(a) {
				for (var g in a)
					if (a.hasOwnProperty(g)) return !1;
				return !0
			},
			cssVendorPrefix: function(a, g, d) {
				if (d) return f + a + ":" + g + ";" + a + ":" + g;
				d = {};
				d[a] = g;
				d[f + a] = g;
				return d
			},
			cssStyleToDomStyle: function() {
				var a = document.createElement("div").style,
					g = "undefined" != typeof a.cssFloat ? "cssFloat" : "undefined" != typeof a.styleFloat ? "styleFloat" : "float";
				return function(a) {
					return "float" == a ? g : a.replace(/-./g, function(a) {
						return a.substr(1).toUpperCase()
					})
				}
			}(),
			buildStyleHtml: function(a) {
				a = [].concat(a);
				for (var g, d = [], b = 0; b < a.length; b++)
					if (g = a[b]) /@import|[{}]/.test(g) ? d.push("\x3cstyle\x3e" + g + "\x3c/style\x3e") : d.push('\x3clink type\x3d"text/css" rel\x3dstylesheet href\x3d"' + g + '"\x3e');
				return d.join("")
			},
			htmlEncode: function(a) {
				return void 0 === a || null === a ? "" : String(a).replace(b, "\x26amp;").replace(c, "\x26gt;").replace(e, "\x26lt;")
			},
			htmlDecode: function(a) {
				return a.replace(k, h)
			},
			htmlEncodeAttr: function(a) {
				return CKEDITOR.tools.htmlEncode(a).replace(l, "\x26quot;")
			},
			htmlDecodeAttr: function(a) {
				return CKEDITOR.tools.htmlDecode(a)
			},
			transformPlainTextToHtml: function(a, g) {
				var d = g == CKEDITOR.ENTER_BR,
					b = this.htmlEncode(a.replace(/\r\n/g, "\n")),
					b = b.replace(/\t/g, "\x26nbsp;\x26nbsp; \x26nbsp;"),
					h = g == CKEDITOR.ENTER_P ? "p" : "div";
				if (!d) {
					var c = /\n{2}/g;
					if (c.test(b)) var e = "\x3c" + h + "\x3e",
						f = "\x3c/" + h + "\x3e",
						b = e + b.replace(c, function() {
							return f + e
						}) + f
				}
				b = b.replace(/\n/g, "\x3cbr\x3e");
				d || (b = b.replace(new RegExp("\x3cbr\x3e(?\x3d\x3c/" + h + "\x3e)"), function(a) {
					return CKEDITOR.tools.repeat(a, 2)
				}));
				b = b.replace(/^ | $/g, "\x26nbsp;");
				return b = b.replace(/(>|\s) /g, function(a, g) {
					return g + "\x26nbsp;"
				}).replace(/ (?=<)/g, "\x26nbsp;")
			},
			getNextNumber: function() {
				var a = 0;
				return function() {
					return ++a
				}
			}(),
			getNextId: function() {
				return "cke_" + this.getNextNumber()
			},
			getUniqueId: function() {
				for (var a = "e", g = 0; 8 > g; g++) a += Math.floor(65536 * (1 + Math.random())).toString(16).substring(1);
				return a
			},
			override: function(a, g) {
				var d = g(a);
				d.prototype = a.prototype;
				return d
			},
			setTimeout: function(a, g, d, b, h) {
				h || (h = window);
				d || (d = h);
				return h.setTimeout(function() {
					b ? a.apply(d, [].concat(b)) : a.apply(d)
				}, g || 0)
			},
			trim: function() {
				var a = /(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g;
				return function(g) {
					return g.replace(a, "")
				}
			}(),
			ltrim: function() {
				var a = /^[ \t\n\r]+/g;
				return function(g) {
					return g.replace(a, "")
				}
			}(),
			rtrim: function() {
				var a = /[ \t\n\r]+$/g;
				return function(g) {
					return g.replace(a, "")
				}
			}(),
			indexOf: function(a, g) {
				if ("function" == typeof g)
					for (var d = 0, b = a.length; d < b; d++) {
						if (g(a[d])) return d
					} else {
						if (a.indexOf) return a.indexOf(g);
						d = 0;
						for (b = a.length; d < b; d++)
							if (a[d] === g) return d
					}
				return -1
			},
			search: function(a, g) {
				var d = CKEDITOR.tools.indexOf(a, g);
				return 0 <= d ? a[d] : null
			},
			bind: function(a, g) {
				return function() {
					return a.apply(g, arguments)
				}
			},
			createClass: function(a) {
				var g = a.$,
					d = a.base,
					b = a.privates || a._,
					h = a.proto;
				a = a.statics;
				!g && (g = function() {
					d && this.base.apply(this, arguments)
				});
				if (b) var c = g,
					g = function() {
						var a = this._ || (this._ = {}),
							g;
						for (g in b) {
							var d = b[g];
							a[g] = "function" == typeof d ? CKEDITOR.tools.bind(d, this) : d
						}
						c.apply(this, arguments)
					};
				d && (g.prototype = this.prototypedCopy(d.prototype), g.prototype.constructor = g, g.base = d, g.baseProto = d.prototype, g.prototype.base = function() {
					this.base = d.prototype.base;
					d.apply(this, arguments);
					this.base = arguments.callee
				});
				h && this.extend(g.prototype, h, !0);
				a && this.extend(g, a, !0);
				return g
			},
			addFunction: function(d, g) {
				return a.push(function() {
					return d.apply(g || this, arguments)
				}) - 1
			},
			removeFunction: function(d) {
				a[d] = null
			},
			callFunction: function(d) {
				var g = a[d];
				return g && g.apply(window, Array.prototype.slice.call(arguments, 1))
			},
			cssLength: function() {
				var a = /^-?\d+\.?\d*px$/,
					g;
				return function(d) {
					g = CKEDITOR.tools.trim(d + "") + "px";
					return a.test(g) ? g : d || ""
				}
			}(),
			convertToPx: function() {
				var a;
				return function(g) {
					a || (a = CKEDITOR.dom.element.createFromHtml('\x3cdiv style\x3d"position:absolute;left:-9999px;top:-9999px;margin:0px;padding:0px;border:0px;"\x3e\x3c/div\x3e', CKEDITOR.document), CKEDITOR.document.getBody().append(a));
					return /%$/.test(g) ? g : (a.setStyle("width", g), a.$.clientWidth)
				}
			}(),
			repeat: function(a, g) {
				return Array(g + 1).join(a)
			},
			tryThese: function() {
				for (var a, g = 0, d = arguments.length; g < d; g++) {
					var b = arguments[g];
					try {
						a = b();
						break
					} catch (h) {}
				}
				return a
			},
			genKey: function() {
				return Array.prototype.slice.call(arguments).join("-")
			},
			defer: function(a) {
				return function() {
					var g = arguments,
						d = this;
					window.setTimeout(function() {
						a.apply(d, g)
					}, 0)
				}
			},
			normalizeCssText: function(a, g) {
				var d = [],
					b, h = CKEDITOR.tools.parseCssText(a, !0, g);
				for (b in h) d.push(b + ":" + h[b]);
				d.sort();
				return d.length ? d.join(";") + ";" : ""
			},
			convertRgbToHex: function(a) {
				return a.replace(/(?:rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\))/gi, function(a, d, b, h) {
					a = [d, b, h];
					for (d = 0; 3 > d; d++) a[d] = ("0" + parseInt(a[d], 10).toString(16)).slice(-2);
					return "#" + a.join("")
				})
			},
			normalizeHex: function(a) {
				return a.replace(/#(([0-9a-f]{3}){1,2})($|;|\s+)/gi, function(a, d, b, h) {
					a = d.toLowerCase();
					3 == a.length && (a = a.split(""), a = [a[0], a[0], a[1], a[1], a[2], a[2]].join(""));
					return "#" + a + h
				})
			},
			parseCssText: function(a, g, d) {
				var b = {};
				d && (a = (new CKEDITOR.dom.element("span")).setAttribute("style", a).getAttribute("style") || "");
				a && (a = CKEDITOR.tools.normalizeHex(CKEDITOR.tools.convertRgbToHex(a)));
				if (!a || ";" == a) return b;
				a.replace(/&quot;/g, '"').replace(/\s*([^:;\s]+)\s*:\s*([^;]+)\s*(?=;|$)/g, function(a, d, h) {
					g && (d = d.toLowerCase(), "font-family" == d && (h = h.replace(/\s*,\s*/g, ",")), h = CKEDITOR.tools.trim(h));
					b[d] = h
				});
				return b
			},
			writeCssText: function(a, g) {
				var d, b = [];
				for (d in a) b.push(d + ":" + a[d]);
				g && b.sort();
				return b.join("; ")
			},
			objectCompare: function(a, g, d) {
				var b;
				if (!a && !g) return !0;
				if (!a || !g) return !1;
				for (b in a)
					if (a[b] != g[b]) return !1;
				if (!d)
					for (b in g)
						if (a[b] != g[b]) return !1;
				return !0
			},
			objectKeys: function(a) {
				var g = [],
					d;
				for (d in a) g.push(d);
				return g
			},
			convertArrayToObject: function(a, g) {
				var d = {};
				1 == arguments.length && (g = !0);
				for (var b = 0, h = a.length; b < h; ++b) d[a[b]] = g;
				return d
			},
			fixDomain: function() {
				for (var a;;) try {
					a = window.parent.document.domain;
					break
				} catch (g) {
					a = a ? a.replace(/.+?(?:\.|$)/, "") : document.domain;
					if (!a) break;
					document.domain = a
				}
				return !!a
			},
			eventsBuffer: function(a, g, d) {
				function b() {
					c = (new Date).getTime();
					h = !1;
					d ? g.call(d) : g()
				}
				var h, c = 0;
				return {
					input: function() {
						if (!h) {
							var g = (new Date).getTime() - c;
							g < a ? h = setTimeout(b, a - g) : b()
						}
					},
					reset: function() {
						h && clearTimeout(h);
						h = c = 0
					}
				}
			},
			enableHtml5Elements: function(a, g) {
				for (var d = "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup main mark meter nav output progress section summary time video".split(" "), b = d.length, h; b--;) h = a.createElement(d[b]), g && a.appendChild(h)
			},
			checkIfAnyArrayItemMatches: function(a, g) {
				for (var d = 0, b = a.length; d < b; ++d)
					if (a[d].match(g)) return !0;
				return !1
			},
			checkIfAnyObjectPropertyMatches: function(a, g) {
				for (var d in a)
					if (d.match(g)) return !0;
				return !1
			},
			keystrokeToString: function(a, g) {
				var d = g & 16711680,
					b = g & 65535,
					h = CKEDITOR.env.mac,
					c = [],
					e = [];
				d & CKEDITOR.CTRL && (c.push(h ? "⌘" : a[17]), e.push(h ? a[224] : a[17]));
				d & CKEDITOR.ALT && (c.push(h ? "⌥" : a[18]), e.push(a[18]));
				d & CKEDITOR.SHIFT && (c.push(h ? "⇧" : a[16]), e.push(a[16]));
				b && (a[b] ? (c.push(a[b]), e.push(a[b])) : (c.push(String.fromCharCode(b)), e.push(String.fromCharCode(b))));
				return {
					display: c.join("+"),
					aria: e.join("+")
				}
			},
			transparentImageData: "data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw\x3d\x3d",
			getCookie: function(a) {
				a = a.toLowerCase();
				for (var g = document.cookie.split(";"), d, b, h = 0; h < g.length; h++)
					if (d = g[h].split("\x3d"), b = decodeURIComponent(CKEDITOR.tools.trim(d[0]).toLowerCase()), b === a) return decodeURIComponent(1 < d.length ? d[1] : "");
				return null
			},
			setCookie: function(a, g) {
				document.cookie = encodeURIComponent(a) + "\x3d" + encodeURIComponent(g) + ";path\x3d/"
			},
			getCsrfToken: function() {
				var a = CKEDITOR.tools.getCookie("ckCsrfToken");
				if (!a || 40 != a.length) {
					var a = [],
						g = "";
					if (window.crypto && window.crypto.getRandomValues) a = new Uint8Array(40), window.crypto.getRandomValues(a);
					else
						for (var d = 0; 40 > d; d++) a.push(Math.floor(256 * Math.random()));
					for (d = 0; d < a.length; d++) var b = "abcdefghijklmnopqrstuvwxyz0123456789".charAt(a[d] % 36),
						g = g + (.5 < Math.random() ? b.toUpperCase() : b);
					a = g;
					CKEDITOR.tools.setCookie("ckCsrfToken", a)
				}
				return a
			},
			escapeCss: function(a) {
				return a ? window.CSS && CSS.escape ? CSS.escape(a) : isNaN(parseInt(a.charAt(0), 10)) ? a : "\\3" + a.charAt(0) + " " + a.substring(1, a.length) : ""
			},
			style: {
				parse: {
					_colors: {
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
						rebeccapurple: "#663399",
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
					},
					_rgbaRegExp: /rgba?\(\s*\d+%?\s*,\s*\d+%?\s*,\s*\d+%?\s*(?:,\s*[0-9.]+\s*)?\)/gi,
					_hslaRegExp: /hsla?\(\s*[0-9.]+\s*,\s*\d+%\s*,\s*\d+%\s*(?:,\s*[0-9.]+\s*)?\)/gi,
					background: function(a) {
						var g = {},
							d = this._findColor(a);
						d.length && (g.color = d[0], CKEDITOR.tools.array.forEach(d, function(g) {
							a = a.replace(g, "")
						}));
						if (a = CKEDITOR.tools.trim(a)) g.unprocessed = a;
						return g
					},
					margin: function(a) {
						function g(a) {
							d.top = b[a[0]];
							d.right = b[a[1]];
							d.bottom = b[a[2]];
							d.left = b[a[3]]
						}
						var d = {},
							b = a.match(/(?:\-?[\.\d]+(?:%|\w*)|auto|inherit|initial|unset)/g) || ["0px"];
						switch (b.length) {
							case 1:
								g([0, 0, 0, 0]);
								break;
							case 2:
								g([0, 1, 0, 1]);
								break;
							case 3:
								g([0, 1, 2, 1]);
								break;
							case 4:
								g([0, 1, 2, 3])
						}
						return d
					},
					_findColor: function(a) {
						var g = [],
							d = CKEDITOR.tools.array,
							g = g.concat(a.match(this._rgbaRegExp) || []),
							g = g.concat(a.match(this._hslaRegExp) || []);
						return g = g.concat(d.filter(a.split(/\s+/), function(a) {
							return a.match(/^\#[a-f0-9]{3}(?:[a-f0-9]{3})?$/gi) ? !0 : a.toLowerCase() in CKEDITOR.tools.style.parse._colors
						}))
					}
				}
			},
			array: {
				filter: function(a, g, d) {
					var b = [];
					this.forEach(a, function(h, c) {
						g.call(d, h, c, a) && b.push(h)
					});
					return b
				},
				forEach: function(a, g, d) {
					var b = a.length,
						h;
					for (h = 0; h < b; h++) g.call(d, a[h], h, a)
				},
				map: function(a, g, d) {
					for (var b = [], h = 0; h < a.length; h++) b.push(g.call(d, a[h], h, a));
					return b
				},
				reduce: function(a, g, d, b) {
					for (var h = 0; h < a.length; h++) d = g.call(b, d, a[h], h, a);
					return d
				}
			}
		};
		CKEDITOR.tools.array.indexOf = CKEDITOR.tools.indexOf;
		CKEDITOR.tools.array.isArray = CKEDITOR.tools.isArray
	}(), CKEDITOR.dtd = function() {
		var a = CKEDITOR.tools.extend,
			f = function(a, g) {
				for (var d = CKEDITOR.tools.clone(a), b = 1; b < arguments.length; b++) {
					g = arguments[b];
					for (var h in g) delete d[h]
				}
				return d
			},
			b = {},
			c = {},
			e = {
				address: 1,
				article: 1,
				aside: 1,
				blockquote: 1,
				details: 1,
				div: 1,
				dl: 1,
				fieldset: 1,
				figure: 1,
				footer: 1,
				form: 1,
				h1: 1,
				h2: 1,
				h3: 1,
				h4: 1,
				h5: 1,
				h6: 1,
				header: 1,
				hgroup: 1,
				hr: 1,
				main: 1,
				menu: 1,
				nav: 1,
				ol: 1,
				p: 1,
				pre: 1,
				section: 1,
				table: 1,
				ul: 1
			},
			l = {
				command: 1,
				link: 1,
				meta: 1,
				noscript: 1,
				script: 1,
				style: 1
			},
			k = {},
			d = {
				"#": 1
			},
			h = {
				center: 1,
				dir: 1,
				noframes: 1
			};
		a(b, {
			a: 1,
			abbr: 1,
			area: 1,
			audio: 1,
			b: 1,
			bdi: 1,
			bdo: 1,
			br: 1,
			button: 1,
			canvas: 1,
			cite: 1,
			code: 1,
			command: 1,
			datalist: 1,
			del: 1,
			dfn: 1,
			em: 1,
			embed: 1,
			i: 1,
			iframe: 1,
			img: 1,
			input: 1,
			ins: 1,
			kbd: 1,
			keygen: 1,
			label: 1,
			map: 1,
			mark: 1,
			meter: 1,
			noscript: 1,
			object: 1,
			output: 1,
			progress: 1,
			q: 1,
			ruby: 1,
			s: 1,
			samp: 1,
			script: 1,
			select: 1,
			small: 1,
			span: 1,
			strong: 1,
			sub: 1,
			sup: 1,
			textarea: 1,
			time: 1,
			u: 1,
			"var": 1,
			video: 1,
			wbr: 1
		}, d, {
			acronym: 1,
			applet: 1,
			basefont: 1,
			big: 1,
			font: 1,
			isindex: 1,
			strike: 1,
			style: 1,
			tt: 1
		});
		a(c, e, b, h);
		f = {
			a: f(b, {
				a: 1,
				button: 1
			}),
			abbr: b,
			address: c,
			area: k,
			article: c,
			aside: c,
			audio: a({
				source: 1,
				track: 1
			}, c),
			b: b,
			base: k,
			bdi: b,
			bdo: b,
			blockquote: c,
			body: c,
			br: k,
			button: f(b, {
				a: 1,
				button: 1
			}),
			canvas: b,
			caption: c,
			cite: b,
			code: b,
			col: k,
			colgroup: {
				col: 1
			},
			command: k,
			datalist: a({
				option: 1
			}, b),
			dd: c,
			del: b,
			details: a({
				summary: 1
			}, c),
			dfn: b,
			div: c,
			dl: {
				dt: 1,
				dd: 1
			},
			dt: c,
			em: b,
			embed: k,
			fieldset: a({
				legend: 1
			}, c),
			figcaption: c,
			figure: a({
				figcaption: 1
			}, c),
			footer: c,
			form: c,
			h1: b,
			h2: b,
			h3: b,
			h4: b,
			h5: b,
			h6: b,
			head: a({
				title: 1,
				base: 1
			}, l),
			header: c,
			hgroup: {
				h1: 1,
				h2: 1,
				h3: 1,
				h4: 1,
				h5: 1,
				h6: 1
			},
			hr: k,
			html: a({
				head: 1,
				body: 1
			}, c, l),
			i: b,
			iframe: d,
			img: k,
			input: k,
			ins: b,
			kbd: b,
			keygen: k,
			label: b,
			legend: b,
			li: c,
			link: k,
			main: c,
			map: c,
			mark: b,
			menu: a({
				li: 1
			}, c),
			meta: k,
			meter: f(b, {
				meter: 1
			}),
			nav: c,
			noscript: a({
				link: 1,
				meta: 1,
				style: 1
			}, b),
			object: a({
				param: 1
			}, b),
			ol: {
				li: 1
			},
			optgroup: {
				option: 1
			},
			option: d,
			output: b,
			p: b,
			param: k,
			pre: b,
			progress: f(b, {
				progress: 1
			}),
			q: b,
			rp: b,
			rt: b,
			ruby: a({
				rp: 1,
				rt: 1
			}, b),
			s: b,
			samp: b,
			script: d,
			section: c,
			select: {
				optgroup: 1,
				option: 1
			},
			small: b,
			source: k,
			span: b,
			strong: b,
			style: d,
			sub: b,
			summary: a({
				h1: 1,
				h2: 1,
				h3: 1,
				h4: 1,
				h5: 1,
				h6: 1
			}, b),
			sup: b,
			table: {
				caption: 1,
				colgroup: 1,
				thead: 1,
				tfoot: 1,
				tbody: 1,
				tr: 1
			},
			tbody: {
				tr: 1
			},
			td: c,
			textarea: d,
			tfoot: {
				tr: 1
			},
			th: c,
			thead: {
				tr: 1
			},
			time: f(b, {
				time: 1
			}),
			title: d,
			tr: {
				th: 1,
				td: 1
			},
			track: k,
			u: b,
			ul: {
				li: 1
			},
			"var": b,
			video: a({
				source: 1,
				track: 1
			}, c),
			wbr: k,
			acronym: b,
			applet: a({
				param: 1
			}, c),
			basefont: k,
			big: b,
			center: c,
			dialog: k,
			dir: {
				li: 1
			},
			font: b,
			isindex: k,
			noframes: c,
			strike: b,
			tt: b
		};
		a(f, {
			$block: a({
				audio: 1,
				dd: 1,
				dt: 1,
				figcaption: 1,
				li: 1,
				video: 1
			}, e, h),
			$blockLimit: {
				article: 1,
				aside: 1,
				audio: 1,
				body: 1,
				caption: 1,
				details: 1,
				dir: 1,
				div: 1,
				dl: 1,
				fieldset: 1,
				figcaption: 1,
				figure: 1,
				footer: 1,
				form: 1,
				header: 1,
				hgroup: 1,
				main: 1,
				menu: 1,
				nav: 1,
				ol: 1,
				section: 1,
				table: 1,
				td: 1,
				th: 1,
				tr: 1,
				ul: 1,
				video: 1
			},
			$cdata: {
				script: 1,
				style: 1
			},
			$editable: {
				address: 1,
				article: 1,
				aside: 1,
				blockquote: 1,
				body: 1,
				details: 1,
				div: 1,
				fieldset: 1,
				figcaption: 1,
				footer: 1,
				form: 1,
				h1: 1,
				h2: 1,
				h3: 1,
				h4: 1,
				h5: 1,
				h6: 1,
				header: 1,
				hgroup: 1,
				main: 1,
				nav: 1,
				p: 1,
				pre: 1,
				section: 1
			},
			$empty: {
				area: 1,
				base: 1,
				basefont: 1,
				br: 1,
				col: 1,
				command: 1,
				dialog: 1,
				embed: 1,
				hr: 1,
				img: 1,
				input: 1,
				isindex: 1,
				keygen: 1,
				link: 1,
				meta: 1,
				param: 1,
				source: 1,
				track: 1,
				wbr: 1
			},
			$inline: b,
			$list: {
				dl: 1,
				ol: 1,
				ul: 1
			},
			$listItem: {
				dd: 1,
				dt: 1,
				li: 1
			},
			$nonBodyContent: a({
				body: 1,
				head: 1,
				html: 1
			}, f.head),
			$nonEditable: {
				applet: 1,
				audio: 1,
				button: 1,
				embed: 1,
				iframe: 1,
				map: 1,
				object: 1,
				option: 1,
				param: 1,
				script: 1,
				textarea: 1,
				video: 1
			},
			$object: {
				applet: 1,
				audio: 1,
				button: 1,
				hr: 1,
				iframe: 1,
				img: 1,
				input: 1,
				object: 1,
				select: 1,
				table: 1,
				textarea: 1,
				video: 1
			},
			$removeEmpty: {
				abbr: 1,
				acronym: 1,
				b: 1,
				bdi: 1,
				bdo: 1,
				big: 1,
				cite: 1,
				code: 1,
				del: 1,
				dfn: 1,
				em: 1,
				font: 1,
				i: 1,
				ins: 1,
				label: 1,
				kbd: 1,
				mark: 1,
				meter: 1,
				output: 1,
				q: 1,
				ruby: 1,
				s: 1,
				samp: 1,
				small: 1,
				span: 1,
				strike: 1,
				strong: 1,
				sub: 1,
				sup: 1,
				time: 1,
				tt: 1,
				u: 1,
				"var": 1
			},
			$tabIndex: {
				a: 1,
				area: 1,
				button: 1,
				input: 1,
				object: 1,
				select: 1,
				textarea: 1
			},
			$tableContent: {
				caption: 1,
				col: 1,
				colgroup: 1,
				tbody: 1,
				td: 1,
				tfoot: 1,
				th: 1,
				thead: 1,
				tr: 1
			},
			$transparent: {
				a: 1,
				audio: 1,
				canvas: 1,
				del: 1,
				ins: 1,
				map: 1,
				noscript: 1,
				object: 1,
				video: 1
			},
			$intermediate: {
				caption: 1,
				colgroup: 1,
				dd: 1,
				dt: 1,
				figcaption: 1,
				legend: 1,
				li: 1,
				optgroup: 1,
				option: 1,
				rp: 1,
				rt: 1,
				summary: 1,
				tbody: 1,
				td: 1,
				tfoot: 1,
				th: 1,
				thead: 1,
				tr: 1
			}
		});
		return f
	}(), CKEDITOR.dom.event = function(a) {
		this.$ = a
	}, CKEDITOR.dom.event.prototype = {
		getKey: function() {
			return this.$.keyCode || this.$.which
		},
		getKeystroke: function() {
			var a = this.getKey();
			if (this.$.ctrlKey || this.$.metaKey) a += CKEDITOR.CTRL;
			this.$.shiftKey && (a += CKEDITOR.SHIFT);
			this.$.altKey && (a += CKEDITOR.ALT);
			return a
		},
		preventDefault: function(a) {
			var f = this.$;
			f.preventDefault ? f.preventDefault() : f.returnValue = !1;
			a && this.stopPropagation()
		},
		stopPropagation: function() {
			var a = this.$;
			a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0
		},
		getTarget: function() {
			var a = this.$.target || this.$.srcElement;
			return a ? new CKEDITOR.dom.node(a) : null
		},
		getPhase: function() {
			return this.$.eventPhase || 2
		},
		getPageOffset: function() {
			var a = this.getTarget().getDocument().$;
			return {
				x: this.$.pageX || this.$.clientX + (a.documentElement.scrollLeft || a.body.scrollLeft),
				y: this.$.pageY || this.$.clientY + (a.documentElement.scrollTop || a.body.scrollTop)
			}
		}
	}, CKEDITOR.CTRL = 1114112, CKEDITOR.SHIFT = 2228224, CKEDITOR.ALT = 4456448, CKEDITOR.EVENT_PHASE_CAPTURING = 1, CKEDITOR.EVENT_PHASE_AT_TARGET = 2, CKEDITOR.EVENT_PHASE_BUBBLING = 3, CKEDITOR.dom.domObject = function(a) {
		a && (this.$ = a)
	}, CKEDITOR.dom.domObject.prototype = function() {
		var a = function(a, b) {
			return function(c) {
				"undefined" != typeof CKEDITOR && a.fire(b, new CKEDITOR.dom.event(c))
			}
		};
		return {
			getPrivate: function() {
				var a;
				(a = this.getCustomData("_")) || this.setCustomData("_", a = {});
				return a
			},
			on: function(f) {
				var b = this.getCustomData("_cke_nativeListeners");
				b || (b = {}, this.setCustomData("_cke_nativeListeners", b));
				b[f] || (b = b[f] = a(this, f), this.$.addEventListener ? this.$.addEventListener(f, b, !!CKEDITOR.event.useCapture) : this.$.attachEvent && this.$.attachEvent("on" + f, b));
				return CKEDITOR.event.prototype.on.apply(this, arguments)
			},
			removeListener: function(a) {
				CKEDITOR.event.prototype.removeListener.apply(this, arguments);
				if (!this.hasListeners(a)) {
					var b = this.getCustomData("_cke_nativeListeners"),
						c = b && b[a];
					c && (this.$.removeEventListener ? this.$.removeEventListener(a, c, !1) : this.$.detachEvent && this.$.detachEvent("on" + a, c), delete b[a])
				}
			},
			removeAllListeners: function() {
				var a = this.getCustomData("_cke_nativeListeners"),
					b;
				for (b in a) {
					var c = a[b];
					this.$.detachEvent ? this.$.detachEvent("on" + b, c) : this.$.removeEventListener && this.$.removeEventListener(b, c, !1);
					delete a[b]
				}
				CKEDITOR.event.prototype.removeAllListeners.call(this)
			}
		}
	}(), function(a) {
		var f = {};
		CKEDITOR.on("reset", function() {
			f = {}
		});
		a.equals = function(a) {
			try {
				return a && a.$ === this.$
			} catch (c) {
				return !1
			}
		};
		a.setCustomData = function(a, c) {
			var e = this.getUniqueId();
			(f[e] || (f[e] = {}))[a] = c;
			return this
		};
		a.getCustomData = function(a) {
			var c = this.$["data-cke-expando"];
			return (c = c && f[c]) && a in c ? c[a] : null
		};
		a.removeCustomData = function(a) {
			var c = this.$["data-cke-expando"],
				c = c && f[c],
				e, l;
			c && (e = c[a], l = a in c, delete c[a]);
			return l ? e : null
		};
		a.clearCustomData = function() {
			this.removeAllListeners();
			var a = this.$["data-cke-expando"];
			a && delete f[a]
		};
		a.getUniqueId = function() {
			return this.$["data-cke-expando"] || (this.$["data-cke-expando"] = CKEDITOR.tools.getNextNumber())
		};
		CKEDITOR.event.implementOn(a)
	}(CKEDITOR.dom.domObject.prototype), CKEDITOR.dom.node = function(a) {
		return a ? new CKEDITOR.dom[a.nodeType == CKEDITOR.NODE_DOCUMENT ? "document" : a.nodeType == CKEDITOR.NODE_ELEMENT ? "element" : a.nodeType == CKEDITOR.NODE_TEXT ? "text" : a.nodeType == CKEDITOR.NODE_COMMENT ? "comment" : a.nodeType == CKEDITOR.NODE_DOCUMENT_FRAGMENT ? "documentFragment" : "domObject"](a) : this
	}, CKEDITOR.dom.node.prototype = new CKEDITOR.dom.domObject, CKEDITOR.NODE_ELEMENT = 1, CKEDITOR.NODE_DOCUMENT = 9, CKEDITOR.NODE_TEXT = 3, CKEDITOR.NODE_COMMENT = 8, CKEDITOR.NODE_DOCUMENT_FRAGMENT = 11, CKEDITOR.POSITION_IDENTICAL = 0, CKEDITOR.POSITION_DISCONNECTED = 1, CKEDITOR.POSITION_FOLLOWING = 2, CKEDITOR.POSITION_PRECEDING = 4, CKEDITOR.POSITION_IS_CONTAINED = 8, CKEDITOR.POSITION_CONTAINS = 16, CKEDITOR.tools.extend(CKEDITOR.dom.node.prototype, {
		appendTo: function(a, f) {
			a.append(this, f);
			return a
		},
		clone: function(a, f) {
			function b(c) {
				c["data-cke-expando"] && (c["data-cke-expando"] = !1);
				if (c.nodeType == CKEDITOR.NODE_ELEMENT || c.nodeType == CKEDITOR.NODE_DOCUMENT_FRAGMENT)
					if (f || c.nodeType != CKEDITOR.NODE_ELEMENT || c.removeAttribute("id", !1), a) {
						c = c.childNodes;
						for (var e = 0; e < c.length; e++) b(c[e])
					}
			}

			function c(b) {
				if (b.type == CKEDITOR.NODE_ELEMENT || b.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
					if (b.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
						var e = b.getName();
						":" == e[0] && b.renameNode(e.substring(1))
					}
					if (a)
						for (e = 0; e < b.getChildCount(); e++) c(b.getChild(e))
				}
			}
			var e = this.$.cloneNode(a);
			b(e);
			e = new CKEDITOR.dom.node(e);
			CKEDITOR.env.ie && 9 > CKEDITOR.env.version && (this.type == CKEDITOR.NODE_ELEMENT || this.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT) && c(e);
			return e
		},
		hasPrevious: function() {
			return !!this.$.previousSibling
		},
		hasNext: function() {
			return !!this.$.nextSibling
		},
		insertAfter: function(a) {
			a.$.parentNode.insertBefore(this.$, a.$.nextSibling);
			return a
		},
		insertBefore: function(a) {
			a.$.parentNode.insertBefore(this.$, a.$);
			return a
		},
		insertBeforeMe: function(a) {
			this.$.parentNode.insertBefore(a.$, this.$);
			return a
		},
		getAddress: function(a) {
			for (var f = [], b = this.getDocument().$.documentElement,
					c = this.$; c && c != b;) {
				var e = c.parentNode;
				e && f.unshift(this.getIndex.call({
					$: c
				}, a));
				c = e
			}
			return f
		},
		getDocument: function() {
			return new CKEDITOR.dom.document(this.$.ownerDocument || this.$.parentNode.ownerDocument)
		},
		getIndex: function(a) {
			function f(a, d) {
				var h = d ? a.nextSibling : a.previousSibling;
				return h && h.nodeType == CKEDITOR.NODE_TEXT ? b(h) ? f(h, d) : h : null
			}

			function b(a) {
				return !a.nodeValue || a.nodeValue == CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE
			}
			var c = this.$,
				e = -1,
				l;
			if (!this.$.parentNode || a && c.nodeType == CKEDITOR.NODE_TEXT && b(c) && !f(c) && !f(c, !0)) return -1;
			do a && c != this.$ && c.nodeType == CKEDITOR.NODE_TEXT && (l || b(c)) || (e++, l = c.nodeType == CKEDITOR.NODE_TEXT); while (c = c.previousSibling);
			return e
		},
		getNextSourceNode: function(a, f, b) {
			if (b && !b.call) {
				var c = b;
				b = function(a) {
					return !a.equals(c)
				}
			}
			a = !a && this.getFirst && this.getFirst();
			var e;
			if (!a) {
				if (this.type == CKEDITOR.NODE_ELEMENT && b && !1 === b(this, !0)) return null;
				a = this.getNext()
			}
			for (; !a && (e = (e || this).getParent());) {
				if (b && !1 === b(e, !0)) return null;
				a = e.getNext()
			}
			return !a || b && !1 === b(a) ? null : f && f != a.type ? a.getNextSourceNode(!1, f, b) : a
		},
		getPreviousSourceNode: function(a, f, b) {
			if (b && !b.call) {
				var c = b;
				b = function(a) {
					return !a.equals(c)
				}
			}
			a = !a && this.getLast && this.getLast();
			var e;
			if (!a) {
				if (this.type == CKEDITOR.NODE_ELEMENT && b && !1 === b(this, !0)) return null;
				a = this.getPrevious()
			}
			for (; !a && (e = (e || this).getParent());) {
				if (b && !1 === b(e, !0)) return null;
				a = e.getPrevious()
			}
			return !a || b && !1 === b(a) ? null : f && a.type != f ? a.getPreviousSourceNode(!1, f, b) : a
		},
		getPrevious: function(a) {
			var f = this.$,
				b;
			do b = (f = f.previousSibling) && 10 != f.nodeType && new CKEDITOR.dom.node(f); while (b && a && !a(b));
			return b
		},
		getNext: function(a) {
			var f = this.$,
				b;
			do b = (f = f.nextSibling) && new CKEDITOR.dom.node(f); while (b && a && !a(b));
			return b
		},
		getParent: function(a) {
			var f = this.$.parentNode;
			return f && (f.nodeType == CKEDITOR.NODE_ELEMENT || a && f.nodeType == CKEDITOR.NODE_DOCUMENT_FRAGMENT) ? new CKEDITOR.dom.node(f) : null
		},
		getParents: function(a) {
			var f = this,
				b = [];
			do b[a ? "push" : "unshift"](f); while (f = f.getParent());
			return b
		},
		getCommonAncestor: function(a) {
			if (a.equals(this)) return this;
			if (a.contains && a.contains(this)) return a;
			var f = this.contains ? this : this.getParent();
			do
				if (f.contains(a)) return f;
			while (f = f.getParent());
			return null
		},
		getPosition: function(a) {
			var f = this.$,
				b = a.$;
			if (f.compareDocumentPosition) return f.compareDocumentPosition(b);
			if (f == b) return CKEDITOR.POSITION_IDENTICAL;
			if (this.type == CKEDITOR.NODE_ELEMENT && a.type == CKEDITOR.NODE_ELEMENT) {
				if (f.contains) {
					if (f.contains(b)) return CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_PRECEDING;
					if (b.contains(f)) return CKEDITOR.POSITION_IS_CONTAINED + CKEDITOR.POSITION_FOLLOWING
				}
				if ("sourceIndex" in f) return 0 > f.sourceIndex || 0 > b.sourceIndex ? CKEDITOR.POSITION_DISCONNECTED : f.sourceIndex < b.sourceIndex ? CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_FOLLOWING
			}
			f = this.getAddress();
			a = a.getAddress();
			for (var b = Math.min(f.length, a.length), c = 0; c < b; c++)
				if (f[c] != a[c]) return f[c] < a[c] ? CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_FOLLOWING;
			return f.length < a.length ? CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_PRECEDING : CKEDITOR.POSITION_IS_CONTAINED + CKEDITOR.POSITION_FOLLOWING
		},
		getAscendant: function(a, f) {
			var b = this.$,
				c, e;
			f || (b = b.parentNode);
			"function" == typeof a ? (e = !0, c = a) : (e = !1, c = function(b) {
				b = "string" == typeof b.nodeName ? b.nodeName.toLowerCase() : "";
				return "string" == typeof a ? b == a : b in a
			});
			for (; b;) {
				if (c(e ? new CKEDITOR.dom.node(b) : b)) return new CKEDITOR.dom.node(b);
				try {
					b = b.parentNode
				} catch (l) {
					b = null
				}
			}
			return null
		},
		hasAscendant: function(a, f) {
			var b = this.$;
			f || (b = b.parentNode);
			for (; b;) {
				if (b.nodeName && b.nodeName.toLowerCase() == a) return !0;
				b = b.parentNode
			}
			return !1
		},
		move: function(a, f) {
			a.append(this.remove(), f)
		},
		remove: function(a) {
			var f = this.$,
				b = f.parentNode;
			if (b) {
				if (a)
					for (; a = f.firstChild;) b.insertBefore(f.removeChild(a), f);
				b.removeChild(f)
			}
			return this
		},
		replace: function(a) {
			this.insertBefore(a);
			a.remove()
		},
		trim: function() {
			this.ltrim();
			this.rtrim()
		},
		ltrim: function() {
			for (var a; this.getFirst && (a = this.getFirst());) {
				if (a.type == CKEDITOR.NODE_TEXT) {
					var f = CKEDITOR.tools.ltrim(a.getText()),
						b = a.getLength();
					if (f) f.length < b && (a.split(b - f.length), this.$.removeChild(this.$.firstChild));
					else {
						a.remove();
						continue
					}
				}
				break
			}
		},
		rtrim: function() {
			for (var a; this.getLast && (a = this.getLast());) {
				if (a.type == CKEDITOR.NODE_TEXT) {
					var f = CKEDITOR.tools.rtrim(a.getText()),
						b = a.getLength();
					if (f) f.length < b && (a.split(f.length), this.$.lastChild.parentNode.removeChild(this.$.lastChild));
					else {
						a.remove();
						continue
					}
				}
				break
			}
			CKEDITOR.env.needsBrFiller && (a = this.$.lastChild) && 1 == a.type && "br" == a.nodeName.toLowerCase() && a.parentNode.removeChild(a)
		},
		isReadOnly: function(a) {
			var f = this;
			this.type != CKEDITOR.NODE_ELEMENT && (f = this.getParent());
			CKEDITOR.env.edge && f && f.is("textarea", "input") && (a = !0);
			if (!a && f && "undefined" != typeof f.$.isContentEditable) return !(f.$.isContentEditable || f.data("cke-editable"));
			for (; f;) {
				if (f.data("cke-editable")) return !1;
				if (f.hasAttribute("contenteditable")) return "false" == f.getAttribute("contenteditable");
				f = f.getParent()
			}
			return !0
		}
	}), CKEDITOR.dom.window = function(a) {
		CKEDITOR.dom.domObject.call(this, a)
	}, CKEDITOR.dom.window.prototype = new CKEDITOR.dom.domObject, CKEDITOR.tools.extend(CKEDITOR.dom.window.prototype, {
		focus: function() {
			this.$.focus()
		},
		getViewPaneSize: function() {
			var a = this.$.document,
				f = "CSS1Compat" == a.compatMode;
			return {
				width: (f ? a.documentElement.clientWidth : a.body.clientWidth) || 0,
				height: (f ? a.documentElement.clientHeight : a.body.clientHeight) || 0
			}
		},
		getScrollPosition: function() {
			var a = this.$;
			if ("pageXOffset" in a) return {
				x: a.pageXOffset || 0,
				y: a.pageYOffset || 0
			};
			a = a.document;
			return {
				x: a.documentElement.scrollLeft || a.body.scrollLeft || 0,
				y: a.documentElement.scrollTop || a.body.scrollTop || 0
			}
		},
		getFrame: function() {
			var a = this.$.frameElement;
			return a ? new CKEDITOR.dom.element.get(a) : null
		}
	}), CKEDITOR.dom.document = function(a) {
		CKEDITOR.dom.domObject.call(this, a)
	}, CKEDITOR.dom.document.prototype = new CKEDITOR.dom.domObject, CKEDITOR.tools.extend(CKEDITOR.dom.document.prototype, {
		type: CKEDITOR.NODE_DOCUMENT,
		appendStyleSheet: function(a) {
			if (this.$.createStyleSheet) this.$.createStyleSheet(a);
			else {
				var f = new CKEDITOR.dom.element("link");
				f.setAttributes({
					rel: "stylesheet",
					type: "text/css",
					href: a
				});
				this.getHead().append(f)
			}
		},
		appendStyleText: function(a) {
			if (this.$.createStyleSheet) {
				var f = this.$.createStyleSheet("");
				f.cssText = a
			} else {
				var b = new CKEDITOR.dom.element("style", this);
				b.append(new CKEDITOR.dom.text(a, this));
				this.getHead().append(b)
			}
			return f || b.$.sheet
		},
		createElement: function(a, f) {
			var b = new CKEDITOR.dom.element(a, this);
			f && (f.attributes && b.setAttributes(f.attributes), f.styles && b.setStyles(f.styles));
			return b
		},
		createText: function(a) {
			return new CKEDITOR.dom.text(a, this)
		},
		focus: function() {
			this.getWindow().focus()
		},
		getActive: function() {
			var a;
			try {
				a = this.$.activeElement
			} catch (f) {
				return null
			}
			return new CKEDITOR.dom.element(a)
		},
		getById: function(a) {
			return (a = this.$.getElementById(a)) ? new CKEDITOR.dom.element(a) : null
		},
		getByAddress: function(a, f) {
			for (var b = this.$.documentElement, c = 0; b && c < a.length; c++) {
				var e = a[c];
				if (f)
					for (var l = -1, k = 0; k < b.childNodes.length; k++) {
						var d = b.childNodes[k];
						if (!0 !== f || 3 != d.nodeType || !d.previousSibling || 3 != d.previousSibling.nodeType)
							if (l++, l == e) {
								b = d;
								break
							}
					} else b = b.childNodes[e]
			}
			return b ? new CKEDITOR.dom.node(b) : null
		},
		getElementsByTag: function(a, f) {
			CKEDITOR.env.ie && 8 >= document.documentMode || !f || (a = f + ":" + a);
			return new CKEDITOR.dom.nodeList(this.$.getElementsByTagName(a))
		},
		getHead: function() {
			var a = this.$.getElementsByTagName("head")[0];
			return a = a ? new CKEDITOR.dom.element(a) : this.getDocumentElement().append(new CKEDITOR.dom.element("head"), !0)
		},
		getBody: function() {
			return new CKEDITOR.dom.element(this.$.body)
		},
		getDocumentElement: function() {
			return new CKEDITOR.dom.element(this.$.documentElement)
		},
		getWindow: function() {
			return new CKEDITOR.dom.window(this.$.parentWindow || this.$.defaultView)
		},
		write: function(a) {
			this.$.open("text/html", "replace");
			CKEDITOR.env.ie && (a = a.replace(/(?:^\s*<!DOCTYPE[^>]*?>)|^/i, '$\x26\n\x3cscript data-cke-temp\x3d"1"\x3e(' + CKEDITOR.tools.fixDomain + ")();\x3c/script\x3e"));
			this.$.write(a);
			this.$.close()
		},
		find: function(a) {
			return new CKEDITOR.dom.nodeList(this.$.querySelectorAll(a))
		},
		findOne: function(a) {
			return (a = this.$.querySelector(a)) ? new CKEDITOR.dom.element(a) : null
		},
		_getHtml5ShivFrag: function() {
			var a = this.getCustomData("html5ShivFrag");
			a || (a = this.$.createDocumentFragment(), CKEDITOR.tools.enableHtml5Elements(a, !0), this.setCustomData("html5ShivFrag", a));
			return a
		}
	}), CKEDITOR.dom.nodeList = function(a) {
		this.$ = a
	}, CKEDITOR.dom.nodeList.prototype = {
		count: function() {
			return this.$.length
		},
		getItem: function(a) {
			return 0 > a || a >= this.$.length ? null : (a = this.$[a]) ? new CKEDITOR.dom.node(a) : null
		}
	}, CKEDITOR.dom.element = function(a, f) {
		"string" == typeof a && (a = (f ? f.$ : document).createElement(a));
		CKEDITOR.dom.domObject.call(this, a)
	}, CKEDITOR.dom.element.get = function(a) {
		return (a = "string" == typeof a ? document.getElementById(a) || document.getElementsByName(a)[0] : a) && (a.$ ? a : new CKEDITOR.dom.element(a))
	}, CKEDITOR.dom.element.prototype = new CKEDITOR.dom.node, CKEDITOR.dom.element.createFromHtml = function(a, f) {
		var b = new CKEDITOR.dom.element("div", f);
		b.setHtml(a);
		return b.getFirst().remove()
	}, CKEDITOR.dom.element.setMarker = function(a, f, b, c) {
		var e = f.getCustomData("list_marker_id") || f.setCustomData("list_marker_id", CKEDITOR.tools.getNextNumber()).getCustomData("list_marker_id"),
			l = f.getCustomData("list_marker_names") || f.setCustomData("list_marker_names", {}).getCustomData("list_marker_names");
		a[e] = f;
		l[b] = 1;
		return f.setCustomData(b, c)
	}, CKEDITOR.dom.element.clearAllMarkers = function(a) {
		for (var f in a) CKEDITOR.dom.element.clearMarkers(a, a[f], 1)
	}, CKEDITOR.dom.element.clearMarkers = function(a, f, b) {
		var c = f.getCustomData("list_marker_names"),
			e = f.getCustomData("list_marker_id"),
			l;
		for (l in c) f.removeCustomData(l);
		f.removeCustomData("list_marker_names");
		b && (f.removeCustomData("list_marker_id"), delete a[e])
	}, function() {
		function a(a, b) {
			return -1 < (" " + a + " ").replace(l, " ").indexOf(" " + b + " ")
		}

		function f(a) {
			var b = !0;
			a.$.id || (a.$.id = "cke_tmp_" + CKEDITOR.tools.getNextNumber(), b = !1);
			return function() {
				b || a.removeAttribute("id")
			}
		}

		function b(a, b) {
			var c = CKEDITOR.tools.escapeCss(a.$.id);
			return "#" + c + " " + b.split(/,\s*/).join(", #" + c + " ")
		}

		function c(a) {
			for (var b = 0, c = 0, g = k[a].length; c < g; c++) b += parseFloat(this.getComputedStyle(k[a][c]) || 0, 10) || 0;
			return b
		}
		var e = document.createElement("_").classList,
			e = "undefined" !== typeof e && null !== String(e.add).match(/\[Native code\]/gi),
			l = /[\n\t\r]/g;
		CKEDITOR.tools.extend(CKEDITOR.dom.element.prototype, {
			type: CKEDITOR.NODE_ELEMENT,
			addClass: e ? function(a) {
				this.$.classList.add(a);
				return this
			} : function(d) {
				var b = this.$.className;
				b && (a(b, d) || (b += " " + d));
				this.$.className = b || d;
				return this
			},
			removeClass: e ? function(a) {
				var b = this.$;
				b.classList.remove(a);
				b.className || b.removeAttribute("class");
				return this
			} : function(d) {
				var b = this.getAttribute("class");
				b && a(b, d) && ((b = b.replace(new RegExp("(?:^|\\s+)" + d + "(?\x3d\\s|$)"), "").replace(/^\s+/, "")) ? this.setAttribute("class", b) : this.removeAttribute("class"));
				return this
			},
			hasClass: function(d) {
				return a(this.$.className, d)
			},
			append: function(a, b) {
				"string" == typeof a && (a = this.getDocument().createElement(a));
				b ? this.$.insertBefore(a.$, this.$.firstChild) : this.$.appendChild(a.$);
				return a
			},
			appendHtml: function(a) {
				if (this.$.childNodes.length) {
					var b = new CKEDITOR.dom.element("div", this.getDocument());
					b.setHtml(a);
					b.moveChildren(this)
				} else this.setHtml(a)
			},
			appendText: function(a) {
				null != this.$.text && CKEDITOR.env.ie && 9 > CKEDITOR.env.version ? this.$.text += a : this.append(new CKEDITOR.dom.text(a))
			},
			appendBogus: function(a) {
				if (a || CKEDITOR.env.needsBrFiller) {
					for (a = this.getLast(); a && a.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.rtrim(a.getText());) a = a.getPrevious();
					a && a.is && a.is("br") || (a = this.getDocument().createElement("br"), CKEDITOR.env.gecko && a.setAttribute("type", "_moz"), this.append(a))
				}
			},
			breakParent: function(a, b) {
				var c = new CKEDITOR.dom.range(this.getDocument());
				c.setStartAfter(this);
				c.setEndAfter(a);
				var g = c.extractContents(!1, b || !1),
					e;
				c.insertNode(this.remove());
				if (CKEDITOR.env.ie && !CKEDITOR.env.edge) {
					for (c = new CKEDITOR.dom.element("div"); e = g.getFirst();) e.$.style.backgroundColor && (e.$.style.backgroundColor = e.$.style.backgroundColor), c.append(e);
					c.insertAfter(this);
					c.remove(!0)
				} else g.insertAfterNode(this)
			},
			contains: document.compareDocumentPosition ? function(a) {
				return !!(this.$.compareDocumentPosition(a.$) & 16)
			} : function(a) {
				var b = this.$;
				return a.type != CKEDITOR.NODE_ELEMENT ? b.contains(a.getParent().$) : b != a.$ && b.contains(a.$)
			},
			focus: function() {
				function a() {
					try {
						this.$.focus()
					} catch (b) {}
				}
				return function(b) {
					b ? CKEDITOR.tools.setTimeout(a, 100, this) : a.call(this)
				}
			}(),
			getHtml: function() {
				var a = this.$.innerHTML;
				return CKEDITOR.env.ie ? a.replace(/<\?[^>]*>/g, "") : a
			},
			getOuterHtml: function() {
				if (this.$.outerHTML) return this.$.outerHTML.replace(/<\?[^>]*>/, "");
				var a = this.$.ownerDocument.createElement("div");
				a.appendChild(this.$.cloneNode(!0));
				return a.innerHTML
			},
			getClientRect: function() {
				var a = CKEDITOR.tools.extend({}, this.$.getBoundingClientRect());
				!a.width && (a.width = a.right - a.left);
				!a.height && (a.height = a.bottom - a.top);
				return a
			},
			setHtml: CKEDITOR.env.ie && 9 > CKEDITOR.env.version ? function(a) {
				try {
					var b = this.$;
					if (this.getParent()) return b.innerHTML = a;
					var c = this.getDocument()._getHtml5ShivFrag();
					c.appendChild(b);
					b.innerHTML = a;
					c.removeChild(b);
					return a
				} catch (g) {
					this.$.innerHTML = "";
					b = new CKEDITOR.dom.element("body", this.getDocument());
					b.$.innerHTML = a;
					for (b = b.getChildren(); b.count();) this.append(b.getItem(0));
					return a
				}
			} : function(a) {
				return this.$.innerHTML = a
			},
			setText: function() {
				var a = document.createElement("p");
				a.innerHTML = "x";
				a = a.textContent;
				return function(b) {
					this.$[a ? "textContent" : "innerText"] = b
				}
			}(),
			getAttribute: function() {
				var a = function(a) {
					return this.$.getAttribute(a, 2)
				};
				return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ? function(a) {
					switch (a) {
						case "class":
							a = "className";
							break;
						case "http-equiv":
							a = "httpEquiv";
							break;
						case "name":
							return this.$.name;
						case "tabindex":
							return a = this.$.getAttribute(a, 2), 0 !== a && 0 === this.$.tabIndex && (a = null), a;
						case "checked":
							return a = this.$.attributes.getNamedItem(a), (a.specified ? a.nodeValue : this.$.checked) ? "checked" : null;
						case "hspace":
						case "value":
							return this.$[a];
						case "style":
							return this.$.style.cssText;
						case "contenteditable":
						case "contentEditable":
							return this.$.attributes.getNamedItem("contentEditable").specified ? this.$.getAttribute("contentEditable") : null
					}
					return this.$.getAttribute(a, 2)
				} : a
			}(),
			getAttributes: function(a) {
				var b = {},
					c = this.$.attributes,
					g;
				a = CKEDITOR.tools.isArray(a) ? a : [];
				for (g = 0; g < c.length; g++) - 1 === CKEDITOR.tools.indexOf(a, c[g].name) && (b[c[g].name] = c[g].value);
				return b
			},
			getChildren: function() {
				return new CKEDITOR.dom.nodeList(this.$.childNodes)
			},
			getComputedStyle: document.defaultView && document.defaultView.getComputedStyle ? function(a) {
				var b = this.getWindow().$.getComputedStyle(this.$, null);
				return b ? b.getPropertyValue(a) : ""
			} : function(a) {
				return this.$.currentStyle[CKEDITOR.tools.cssStyleToDomStyle(a)]
			},
			getDtd: function() {
				var a = CKEDITOR.dtd[this.getName()];
				this.getDtd = function() {
					return a
				};
				return a
			},
			getElementsByTag: CKEDITOR.dom.document.prototype.getElementsByTag,
			getTabIndex: function() {
				var a = this.$.tabIndex;
				return 0 !== a || CKEDITOR.dtd.$tabIndex[this.getName()] || 0 === parseInt(this.getAttribute("tabindex"), 10) ? a : -1
			},
			getText: function() {
				return this.$.textContent || this.$.innerText || ""
			},
			getWindow: function() {
				return this.getDocument().getWindow()
			},
			getId: function() {
				return this.$.id || null
			},
			getNameAtt: function() {
				return this.$.name || null
			},
			getName: function() {
				var a = this.$.nodeName.toLowerCase();
				if (CKEDITOR.env.ie && 8 >= document.documentMode) {
					var b = this.$.scopeName;
					"HTML" != b && (a = b.toLowerCase() + ":" + a)
				}
				this.getName = function() {
					return a
				};
				return this.getName()
			},
			getValue: function() {
				return this.$.value
			},
			getFirst: function(a) {
				var b = this.$.firstChild;
				(b = b && new CKEDITOR.dom.node(b)) && a && !a(b) && (b = b.getNext(a));
				return b
			},
			getLast: function(a) {
				var b = this.$.lastChild;
				(b = b && new CKEDITOR.dom.node(b)) && a && !a(b) && (b = b.getPrevious(a));
				return b
			},
			getStyle: function(a) {
				return this.$.style[CKEDITOR.tools.cssStyleToDomStyle(a)]
			},
			is: function() {
				var a = this.getName();
				if ("object" == typeof arguments[0]) return !!arguments[0][a];
				for (var b = 0; b < arguments.length; b++)
					if (arguments[b] == a) return !0;
				return !1
			},
			isEditable: function(a) {
				var b = this.getName();
				return this.isReadOnly() || "none" == this.getComputedStyle("display") || "hidden" == this.getComputedStyle("visibility") || CKEDITOR.dtd.$nonEditable[b] || CKEDITOR.dtd.$empty[b] || this.is("a") && (this.data("cke-saved-name") || this.hasAttribute("name")) && !this.getChildCount() ? !1 : !1 !== a ? (a = CKEDITOR.dtd[b] || CKEDITOR.dtd.span, !(!a || !a["#"])) : !0
			},
			isIdentical: function(a) {
				var b = this.clone(0, 1);
				a = a.clone(0, 1);
				b.removeAttributes(["_moz_dirty", "data-cke-expando", "data-cke-saved-href", "data-cke-saved-name"]);
				a.removeAttributes(["_moz_dirty", "data-cke-expando", "data-cke-saved-href", "data-cke-saved-name"]);
				if (b.$.isEqualNode) return b.$.style.cssText = CKEDITOR.tools.normalizeCssText(b.$.style.cssText), a.$.style.cssText = CKEDITOR.tools.normalizeCssText(a.$.style.cssText), b.$.isEqualNode(a.$);
				b = b.getOuterHtml();
				a = a.getOuterHtml();
				if (CKEDITOR.env.ie && 9 > CKEDITOR.env.version && this.is("a")) {
					var c = this.getParent();
					c.type == CKEDITOR.NODE_ELEMENT && (c = c.clone(), c.setHtml(b), b = c.getHtml(), c.setHtml(a), a = c.getHtml())
				}
				return b == a
			},
			isVisible: function() {
				var a = (this.$.offsetHeight || this.$.offsetWidth) && "hidden" != this.getComputedStyle("visibility"),
					b, c;
				a && CKEDITOR.env.webkit && (b = this.getWindow(), !b.equals(CKEDITOR.document.getWindow()) && (c = b.$.frameElement) && (a = (new CKEDITOR.dom.element(c)).isVisible()));
				return !!a
			},
			isEmptyInlineRemoveable: function() {
				if (!CKEDITOR.dtd.$removeEmpty[this.getName()]) return !1;
				for (var a = this.getChildren(),
						b = 0, c = a.count(); b < c; b++) {
					var g = a.getItem(b);
					if (g.type != CKEDITOR.NODE_ELEMENT || !g.data("cke-bookmark"))
						if (g.type == CKEDITOR.NODE_ELEMENT && !g.isEmptyInlineRemoveable() || g.type == CKEDITOR.NODE_TEXT && CKEDITOR.tools.trim(g.getText())) return !1
				}
				return !0
			},
			hasAttributes: CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ? function() {
				for (var a = this.$.attributes, b = 0; b < a.length; b++) {
					var c = a[b];
					switch (c.nodeName) {
						case "class":
							if (this.getAttribute("class")) return !0;
						case "data-cke-expando":
							continue;
						default:
							if (c.specified) return !0
					}
				}
				return !1
			} : function() {
				var a = this.$.attributes,
					b = a.length,
					c = {
						"data-cke-expando": 1,
						_moz_dirty: 1
					};
				return 0 < b && (2 < b || !c[a[0].nodeName] || 2 == b && !c[a[1].nodeName])
			},
			hasAttribute: function() {
				function a(b) {
					var d = this.$.attributes.getNamedItem(b);
					if ("input" == this.getName()) switch (b) {
						case "class":
							return 0 < this.$.className.length;
						case "checked":
							return !!this.$.checked;
						case "value":
							return b = this.getAttribute("type"), "checkbox" == b || "radio" == b ? "on" != this.$.value : !!this.$.value
					}
					return d ? d.specified : !1
				}
				return CKEDITOR.env.ie ? 8 > CKEDITOR.env.version ? function(b) {
					return "name" == b ? !!this.$.name : a.call(this, b)
				} : a : function(a) {
					return !!this.$.attributes.getNamedItem(a)
				}
			}(),
			hide: function() {
				this.setStyle("display", "none")
			},
			moveChildren: function(a, b) {
				var c = this.$;
				a = a.$;
				if (c != a) {
					var g;
					if (b)
						for (; g = c.lastChild;) a.insertBefore(c.removeChild(g), a.firstChild);
					else
						for (; g = c.firstChild;) a.appendChild(c.removeChild(g))
				}
			},
			mergeSiblings: function() {
				function a(b, d, g) {
					if (d && d.type == CKEDITOR.NODE_ELEMENT) {
						for (var c = []; d.data("cke-bookmark") || d.isEmptyInlineRemoveable();)
							if (c.push(d), d = g ? d.getNext() : d.getPrevious(), !d || d.type != CKEDITOR.NODE_ELEMENT) return;
						if (b.isIdentical(d)) {
							for (var e = g ? b.getLast() : b.getFirst(); c.length;) c.shift().move(b, !g);
							d.moveChildren(b, !g);
							d.remove();
							e && e.type == CKEDITOR.NODE_ELEMENT && e.mergeSiblings()
						}
					}
				}
				return function(b) {
					if (!1 === b || CKEDITOR.dtd.$removeEmpty[this.getName()] || this.is("a")) a(this, this.getNext(), !0), a(this, this.getPrevious())
				}
			}(),
			show: function() {
				this.setStyles({
					display: "",
					visibility: ""
				})
			},
			setAttribute: function() {
				var a = function(a, b) {
					this.$.setAttribute(a, b);
					return this
				};
				return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ? function(b, c) {
					"class" == b ? this.$.className = c : "style" == b ? this.$.style.cssText = c : "tabindex" == b ? this.$.tabIndex = c : "checked" == b ? this.$.checked = c : "contenteditable" == b ? a.call(this, "contentEditable", c) : a.apply(this, arguments);
					return this
				} : CKEDITOR.env.ie8Compat && CKEDITOR.env.secure ? function(b, c) {
					if ("src" == b && c.match(/^http:\/\//)) try {
						a.apply(this, arguments)
					} catch (g) {} else a.apply(this, arguments);
					return this
				} : a
			}(),
			setAttributes: function(a) {
				for (var b in a) this.setAttribute(b, a[b]);
				return this
			},
			setValue: function(a) {
				this.$.value = a;
				return this
			},
			removeAttribute: function() {
				var a = function(a) {
					this.$.removeAttribute(a)
				};
				return CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) ? function(a) {
					"class" == a ? a = "className" : "tabindex" == a ? a = "tabIndex" : "contenteditable" == a && (a = "contentEditable");
					this.$.removeAttribute(a)
				} : a
			}(),
			removeAttributes: function(a) {
				if (CKEDITOR.tools.isArray(a))
					for (var b = 0; b < a.length; b++) this.removeAttribute(a[b]);
				else
					for (b in a = a || this.getAttributes(), a) a.hasOwnProperty(b) && this.removeAttribute(b)
			},
			removeStyle: function(a) {
				var b = this.$.style;
				if (b.removeProperty || "border" != a && "margin" != a && "padding" != a) b.removeProperty ? b.removeProperty(a) : b.removeAttribute(CKEDITOR.tools.cssStyleToDomStyle(a)), this.$.style.cssText || this.removeAttribute("style");
				else {
					var c = ["top", "left", "right", "bottom"],
						g;
					"border" == a && (g = ["color", "style", "width"]);
					for (var b = [], e = 0; e < c.length; e++)
						if (g)
							for (var f = 0; f < g.length; f++) b.push([a, c[e], g[f]].join("-"));
						else b.push([a, c[e]].join("-"));
					for (a = 0; a < b.length; a++) this.removeStyle(b[a])
				}
			},
			setStyle: function(a, b) {
				this.$.style[CKEDITOR.tools.cssStyleToDomStyle(a)] = b;
				return this
			},
			setStyles: function(a) {
				for (var b in a) this.setStyle(b, a[b]);
				return this
			},
			setOpacity: function(a) {
				CKEDITOR.env.ie && 9 > CKEDITOR.env.version ? (a = Math.round(100 * a), this.setStyle("filter", 100 <= a ? "" : "progid:DXImageTransform.Microsoft.Alpha(opacity\x3d" + a + ")")) : this.setStyle("opacity", a)
			},
			unselectable: function() {
				this.setStyles(CKEDITOR.tools.cssVendorPrefix("user-select", "none"));
				if (CKEDITOR.env.ie) {
					this.setAttribute("unselectable", "on");
					for (var a, b = this.getElementsByTag("*"), c = 0, g = b.count(); c < g; c++) a = b.getItem(c), a.setAttribute("unselectable", "on")
				}
			},
			getPositionedAncestor: function() {
				for (var a = this;
					"html" != a.getName();) {
					if ("static" != a.getComputedStyle("position")) return a;
					a = a.getParent()
				}
				return null
			},
			getDocumentPosition: function(a) {
				var b = 0,
					c = 0,
					g = this.getDocument(),
					e = g.getBody(),
					f = "BackCompat" == g.$.compatMode;
				if (document.documentElement.getBoundingClientRect && (CKEDITOR.env.ie ? 8 !== CKEDITOR.env.version : 1)) {
					var l = this.$.getBoundingClientRect(),
						k = g.$.documentElement,
						v = k.clientTop || e.$.clientTop || 0,
						u = k.clientLeft || e.$.clientLeft || 0,
						t = !0;
					CKEDITOR.env.ie && (t = g.getDocumentElement().contains(this), g = g.getBody().contains(this), t = f && g || !f && t);
					t && (CKEDITOR.env.webkit || CKEDITOR.env.ie && 12 <= CKEDITOR.env.version ? (b = e.$.scrollLeft || k.scrollLeft, c = e.$.scrollTop || k.scrollTop) : (c = f ? e.$ : k, b = c.scrollLeft, c = c.scrollTop), b = l.left + b - u, c = l.top + c - v)
				} else
					for (v = this, u = null; v && "body" != v.getName() && "html" != v.getName();) {
						b += v.$.offsetLeft - v.$.scrollLeft;
						c += v.$.offsetTop - v.$.scrollTop;
						v.equals(this) || (b += v.$.clientLeft || 0, c += v.$.clientTop || 0);
						for (; u && !u.equals(v);) b -= u.$.scrollLeft, c -= u.$.scrollTop, u = u.getParent();
						u = v;
						v = (l = v.$.offsetParent) ? new CKEDITOR.dom.element(l) : null
					}
				a && (l = this.getWindow(), v = a.getWindow(), !l.equals(v) && l.$.frameElement && (a = (new CKEDITOR.dom.element(l.$.frameElement)).getDocumentPosition(a), b += a.x, c += a.y));
				document.documentElement.getBoundingClientRect || !CKEDITOR.env.gecko || f || (b += this.$.clientLeft ? 1 : 0, c += this.$.clientTop ? 1 : 0);
				return {
					x: b,
					y: c
				}
			},
			scrollIntoView: function(a) {
				var b = this.getParent();
				if (b) {
					do
						if ((b.$.clientWidth && b.$.clientWidth < b.$.scrollWidth || b.$.clientHeight && b.$.clientHeight < b.$.scrollHeight) && !b.is("body") && this.scrollIntoParent(b, a, 1), b.is("html")) {
							var c = b.getWindow();
							try {
								var g = c.$.frameElement;
								g && (b = new CKEDITOR.dom.element(g))
							} catch (e) {}
						}
					while (b = b.getParent())
				}
			},
			scrollIntoParent: function(a, b, c) {
				var g, e, f, l;

				function k(b, g) {
					/body|html/.test(a.getName()) ? a.getWindow().$.scrollBy(b, g) : (a.$.scrollLeft += b, a.$.scrollTop += g)
				}

				function v(a, b) {
					var g = {
						x: 0,
						y: 0
					};
					if (!a.is(t ? "body" : "html")) {
						var c = a.$.getBoundingClientRect();
						g.x = c.left;
						g.y = c.top
					}
					c = a.getWindow();
					c.equals(b) || (c = v(CKEDITOR.dom.element.get(c.$.frameElement), b), g.x += c.x, g.y += c.y);
					return g
				}

				function u(a, b) {
					return parseInt(a.getComputedStyle("margin-" + b) || 0, 10) || 0
				}!a && (a = this.getWindow());
				f = a.getDocument();
				var t = "BackCompat" == f.$.compatMode;
				a instanceof CKEDITOR.dom.window && (a = t ? f.getBody() : f.getDocumentElement());
				CKEDITOR.env.webkit && (f = this.getEditor(!1)) && (f._.previousScrollTop = null);
				f = a.getWindow();
				e = v(this, f);
				var y = v(a, f),
					A = this.$.offsetHeight;
				g = this.$.offsetWidth;
				var q = a.$.clientHeight,
					w = a.$.clientWidth;
				f = e.x - u(this, "left") - y.x || 0;
				l = e.y - u(this, "top") - y.y || 0;
				g = e.x + g + u(this, "right") - (y.x + w) || 0;
				e = e.y + A + u(this, "bottom") - (y.y + q) || 0;
				(0 > l || 0 < e) && k(0, !0 === b ? l : !1 === b ? e : 0 > l ? l : e);
				c && (0 > f || 0 < g) && k(0 > f ? f : g, 0)
			},
			setState: function(a, b, c) {
				b = b || "cke";
				switch (a) {
					case CKEDITOR.TRISTATE_ON:
						this.addClass(b + "_on");
						this.removeClass(b + "_off");
						this.removeClass(b + "_disabled");
						c && this.setAttribute("aria-pressed", !0);
						c && this.removeAttribute("aria-disabled");
						break;
					case CKEDITOR.TRISTATE_DISABLED:
						this.addClass(b + "_disabled");
						this.removeClass(b + "_off");
						this.removeClass(b + "_on");
						c && this.setAttribute("aria-disabled", !0);
						c && this.removeAttribute("aria-pressed");
						break;
					default:
						this.addClass(b + "_off"), this.removeClass(b + "_on"), this.removeClass(b + "_disabled"), c && this.removeAttribute("aria-pressed"), c && this.removeAttribute("aria-disabled")
				}
			},
			getFrameDocument: function() {
				var a = this.$;
				try {
					a.contentWindow.document
				} catch (b) {
					a.src = a.src
				}
				return a && new CKEDITOR.dom.document(a.contentWindow.document)
			},
			copyAttributes: function(a, b) {
				var c = this.$.attributes;
				b = b || {};
				for (var g = 0; g < c.length; g++) {
					var e = c[g],
						f = e.nodeName.toLowerCase(),
						l;
					if (!(f in b))
						if ("checked" == f && (l = this.getAttribute(f))) a.setAttribute(f, l);
						else if (!CKEDITOR.env.ie || this.hasAttribute(f)) l = this.getAttribute(f), null === l && (l = e.nodeValue), a.setAttribute(f, l)
				}
				"" !== this.$.style.cssText && (a.$.style.cssText = this.$.style.cssText)
			},
			renameNode: function(a) {
				if (this.getName() != a) {
					var b = this.getDocument();
					a = new CKEDITOR.dom.element(a, b);
					this.copyAttributes(a);
					this.moveChildren(a);
					this.getParent(!0) && this.$.parentNode.replaceChild(a.$, this.$);
					a.$["data-cke-expando"] = this.$["data-cke-expando"];
					this.$ = a.$;
					delete this.getName
				}
			},
			getChild: function() {
				function a(b, c) {
					var g = b.childNodes;
					if (0 <= c && c < g.length) return g[c]
				}
				return function(b) {
					var c = this.$;
					if (b.slice)
						for (b = b.slice(); 0 < b.length && c;) c = a(c, b.shift());
					else c = a(c, b);
					return c ? new CKEDITOR.dom.node(c) : null
				}
			}(),
			getChildCount: function() {
				return this.$.childNodes.length
			},
			disableContextMenu: function() {
				function a(b) {
					return b.type == CKEDITOR.NODE_ELEMENT && b.hasClass("cke_enable_context_menu")
				}
				this.on("contextmenu", function(b) {
					b.data.getTarget().getAscendant(a, !0) || b.data.preventDefault()
				})
			},
			getDirection: function(a) {
				return a ? this.getComputedStyle("direction") || this.getDirection() || this.getParent() && this.getParent().getDirection(1) || this.getDocument().$.dir || "ltr" : this.getStyle("direction") || this.getAttribute("dir")
			},
			data: function(a, b) {
				a = "data-" + a;
				if (void 0 === b) return this.getAttribute(a);
				!1 === b ? this.removeAttribute(a) : this.setAttribute(a, b);
				return null
			},
			getEditor: function(a) {
				var b = CKEDITOR.instances,
					c, g, e;
				a = a || void 0 === a;
				for (c in b)
					if (g = b[c], g.element.equals(this) && g.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO || !a && (e = g.editable()) && (e.equals(this) || e.contains(this))) return g;
				return null
			},
			find: function(a) {
				var c = f(this);
				a = new CKEDITOR.dom.nodeList(this.$.querySelectorAll(b(this, a)));
				c();
				return a
			},
			findOne: function(a) {
				var c = f(this);
				a = this.$.querySelector(b(this, a));
				c();
				return a ? new CKEDITOR.dom.element(a) : null
			},
			forEach: function(a, b, c) {
				if (!(c || b && this.type != b)) var g = a(this);
				if (!1 !== g) {
					c = this.getChildren();
					for (var e = 0; e < c.count(); e++) g = c.getItem(e), g.type == CKEDITOR.NODE_ELEMENT ? g.forEach(a, b) : b && g.type != b || a(g)
				}
			}
		});
		var k = {
			width: ["border-left-width", "border-right-width", "padding-left", "padding-right"],
			height: ["border-top-width", "border-bottom-width", "padding-top", "padding-bottom"]
		};
		CKEDITOR.dom.element.prototype.setSize = function(a, b, e) {
			"number" == typeof b && (!e || CKEDITOR.env.ie && CKEDITOR.env.quirks || (b -= c.call(this, a)), this.setStyle(a, b + "px"))
		};
		CKEDITOR.dom.element.prototype.getSize = function(a, b) {
			var e = Math.max(this.$["offset" + CKEDITOR.tools.capitalize(a)], this.$["client" + CKEDITOR.tools.capitalize(a)]) || 0;
			b && (e -= c.call(this, a));
			return e
		}
	}(), CKEDITOR.dom.documentFragment = function(a) {
		a = a || CKEDITOR.document;
		this.$ = a.type == CKEDITOR.NODE_DOCUMENT ? a.$.createDocumentFragment() : a
	}, CKEDITOR.tools.extend(CKEDITOR.dom.documentFragment.prototype, CKEDITOR.dom.element.prototype, {
		type: CKEDITOR.NODE_DOCUMENT_FRAGMENT,
		insertAfterNode: function(a) {
			a = a.$;
			a.parentNode.insertBefore(this.$, a.nextSibling)
		},
		getHtml: function() {
			var a = new CKEDITOR.dom.element("div");
			this.clone(1, 1).appendTo(a);
			return a.getHtml().replace(/\s*data-cke-expando=".*?"/g, "")
		}
	}, !0, {
		append: 1,
		appendBogus: 1,
		clone: 1,
		getFirst: 1,
		getHtml: 1,
		getLast: 1,
		getParent: 1,
		getNext: 1,
		getPrevious: 1,
		appendTo: 1,
		moveChildren: 1,
		insertBefore: 1,
		insertAfterNode: 1,
		replace: 1,
		trim: 1,
		type: 1,
		ltrim: 1,
		rtrim: 1,
		getDocument: 1,
		getChildCount: 1,
		getChild: 1,
		getChildren: 1
	}), function() {
		function a(a, b) {
			var g = this.range;
			if (this._.end) return null;
			if (!this._.start) {
				this._.start = 1;
				if (g.collapsed) return this.end(), null;
				g.optimize()
			}
			var c, d = g.startContainer;
			c = g.endContainer;
			var e = g.startOffset,
				f = g.endOffset,
				h, q = this.guard,
				m = this.type,
				n = a ? "getPreviousSourceNode" : "getNextSourceNode";
			if (!a && !this._.guardLTR) {
				var l = c.type == CKEDITOR.NODE_ELEMENT ? c : c.getParent(),
					k = c.type == CKEDITOR.NODE_ELEMENT ? c.getChild(f) : c.getNext();
				this._.guardLTR = function(a, b) {
					return (!b || !l.equals(a)) && (!k || !a.equals(k)) && (a.type != CKEDITOR.NODE_ELEMENT || !b || !a.equals(g.root))
				}
			}
			if (a && !this._.guardRTL) {
				var E = d.type == CKEDITOR.NODE_ELEMENT ? d : d.getParent(),
					G = d.type == CKEDITOR.NODE_ELEMENT ? e ? d.getChild(e - 1) : null : d.getPrevious();
				this._.guardRTL = function(a, b) {
					return (!b || !E.equals(a)) && (!G || !a.equals(G)) && (a.type != CKEDITOR.NODE_ELEMENT || !b || !a.equals(g.root))
				}
			}
			var F = a ? this._.guardRTL : this._.guardLTR;
			h = q ? function(a, b) {
				return !1 === F(a, b) ? !1 : q(a, b)
			} : F;
			this.current ? c = this.current[n](!1, m, h) : (a ? c.type == CKEDITOR.NODE_ELEMENT && (c = 0 < f ? c.getChild(f - 1) : !1 === h(c, !0) ? null : c.getPreviousSourceNode(!0, m, h)) : (c = d, c.type == CKEDITOR.NODE_ELEMENT && ((c = c.getChild(e)) || (c = !1 === h(d, !0) ? null : d.getNextSourceNode(!0, m, h)))), c && !1 === h(c) && (c = null));
			for (; c && !this._.end;) {
				this.current = c;
				if (!this.evaluator || !1 !== this.evaluator(c)) {
					if (!b) return c
				} else if (b && this.evaluator) return !1;
				c = c[n](!1, m, h)
			}
			this.end();
			return this.current = null
		}

		function f(b) {
			for (var g, c = null; g = a.call(this, b);) c = g;
			return c
		}
		CKEDITOR.dom.walker = CKEDITOR.tools.createClass({
			$: function(a) {
				this.range = a;
				this._ = {}
			},
			proto: {
				end: function() {
					this._.end = 1
				},
				next: function() {
					return a.call(this)
				},
				previous: function() {
					return a.call(this, 1)
				},
				checkForward: function() {
					return !1 !== a.call(this, 0, 1)
				},
				checkBackward: function() {
					return !1 !== a.call(this, 1, 1)
				},
				lastForward: function() {
					return f.call(this)
				},
				lastBackward: function() {
					return f.call(this, 1)
				},
				reset: function() {
					delete this.current;
					this._ = {}
				}
			}
		});
		var b = {
				block: 1,
				"list-item": 1,
				table: 1,
				"table-row-group": 1,
				"table-header-group": 1,
				"table-footer-group": 1,
				"table-row": 1,
				"table-column-group": 1,
				"table-column": 1,
				"table-cell": 1,
				"table-caption": 1
			},
			c = {
				absolute: 1,
				fixed: 1
			};
		CKEDITOR.dom.element.prototype.isBlockBoundary = function(a) {
			return "none" != this.getComputedStyle("float") || this.getComputedStyle("position") in c || !b[this.getComputedStyle("display")] ? !!(this.is(CKEDITOR.dtd.$block) || a && this.is(a)) : !0
		};
		CKEDITOR.dom.walker.blockBoundary = function(a) {
			return function(b) {
				return !(b.type == CKEDITOR.NODE_ELEMENT && b.isBlockBoundary(a))
			}
		};
		CKEDITOR.dom.walker.listItemBoundary = function() {
			return this.blockBoundary({
				br: 1
			})
		};
		CKEDITOR.dom.walker.bookmark = function(a, b) {
			function g(a) {
				return a && a.getName && "span" == a.getName() && a.data("cke-bookmark")
			}
			return function(c) {
				var d, e;
				d = c && c.type != CKEDITOR.NODE_ELEMENT && (e = c.getParent()) && g(e);
				d = a ? d : d || g(c);
				return !!(b ^ d)
			}
		};
		CKEDITOR.dom.walker.whitespaces = function(a) {
			return function(b) {
				var g;
				b && b.type == CKEDITOR.NODE_TEXT && (g = !CKEDITOR.tools.trim(b.getText()) || CKEDITOR.env.webkit && b.getText() == CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE);
				return !!(a ^ g)
			}
		};
		CKEDITOR.dom.walker.invisible = function(a) {
			var b = CKEDITOR.dom.walker.whitespaces(),
				g = CKEDITOR.env.webkit ? 1 : 0;
			return function(c) {
				b(c) ? c = 1 : (c.type == CKEDITOR.NODE_TEXT && (c = c.getParent()), c = c.$.offsetWidth <= g);
				return !!(a ^ c)
			}
		};
		CKEDITOR.dom.walker.nodeType = function(a, b) {
			return function(g) {
				return !!(b ^ g.type == a)
			}
		};
		CKEDITOR.dom.walker.bogus = function(a) {
			function b(a) {
				return !l(a) && !k(a)
			}
			return function(g) {
				var c = CKEDITOR.env.needsBrFiller ? g.is && g.is("br") : g.getText && e.test(g.getText());
				c && (c = g.getParent(), g = g.getNext(b), c = c.isBlockBoundary() && (!g || g.type == CKEDITOR.NODE_ELEMENT && g.isBlockBoundary()));
				return !!(a ^ c)
			}
		};
		CKEDITOR.dom.walker.temp = function(a) {
			return function(b) {
				b.type != CKEDITOR.NODE_ELEMENT && (b = b.getParent());
				b = b && b.hasAttribute("data-cke-temp");
				return !!(a ^ b)
			}
		};
		var e = /^[\t\r\n ]*(?:&nbsp;|\xa0)$/,
			l = CKEDITOR.dom.walker.whitespaces(),
			k = CKEDITOR.dom.walker.bookmark(),
			d = CKEDITOR.dom.walker.temp(),
			h = function(a) {
				return k(a) || l(a) || a.type == CKEDITOR.NODE_ELEMENT && a.is(CKEDITOR.dtd.$inline) && !a.is(CKEDITOR.dtd.$empty)
			};
		CKEDITOR.dom.walker.ignored = function(a) {
			return function(b) {
				b = l(b) || k(b) || d(b);
				return !!(a ^ b)
			}
		};
		var m = CKEDITOR.dom.walker.ignored();
		CKEDITOR.dom.walker.empty = function(a) {
			return function(b) {
				for (var g = 0, c = b.getChildCount(); g < c; ++g)
					if (!m(b.getChild(g))) return !!a;
				return !a
			}
		};
		var g = CKEDITOR.dom.walker.empty(),
			n = CKEDITOR.dom.walker.validEmptyBlockContainers = CKEDITOR.tools.extend(function(a) {
				var b = {},
					g;
				for (g in a) CKEDITOR.dtd[g]["#"] && (b[g] = 1);
				return b
			}(CKEDITOR.dtd.$block), {
				caption: 1,
				td: 1,
				th: 1
			});
		CKEDITOR.dom.walker.editable = function(a) {
			return function(b) {
				b = m(b) ? !1 : b.type == CKEDITOR.NODE_TEXT || b.type == CKEDITOR.NODE_ELEMENT && (b.is(CKEDITOR.dtd.$inline) || b.is("hr") || "false" == b.getAttribute("contenteditable") || !CKEDITOR.env.needsBrFiller && b.is(n) && g(b)) ? !0 : !1;
				return !!(a ^ b)
			}
		};
		CKEDITOR.dom.element.prototype.getBogus = function() {
			var a = this;
			do a = a.getPreviousSourceNode(); while (h(a));
			return a && (CKEDITOR.env.needsBrFiller ? a.is && a.is("br") : a.getText && e.test(a.getText())) ? a : !1
		}
	}(), CKEDITOR.dom.range = function(a) {
		this.endOffset = this.endContainer = this.startOffset = this.startContainer = null;
		this.collapsed = !0;
		var f = a instanceof CKEDITOR.dom.document;
		this.document = f ? a : a.getDocument();
		this.root = f ? a.getBody() : a
	}, function() {
		function a(a) {
			a.collapsed = a.startContainer && a.endContainer && a.startContainer.equals(a.endContainer) && a.startOffset == a.endOffset
		}

		function f(a, b, c, d, e) {
			function f(a, b, g, c) {
				var d = g ? a.getPrevious() : a.getNext();
				if (c && l) return d;
				q || c ? b.append(a.clone(!0, e), g) : (a.remove(), k && b.append(a));
				return d
			}

			function h() {
				var a, b, g, c = Math.min(L.length, D.length);
				for (a = 0; a < c; a++)
					if (b = L[a], g = D[a], !b.equals(g)) return a;
				return a - 1
			}

			function m() {
				var b = T - 1,
					c = F && J && !w.equals(B);
				b < I - 1 || b < O - 1 || c ? (c ? a.moveToPosition(B, CKEDITOR.POSITION_BEFORE_START) : O == b + 1 && G ? a.moveToPosition(D[b], CKEDITOR.POSITION_BEFORE_END) : a.moveToPosition(D[b + 1], CKEDITOR.POSITION_BEFORE_START), d && (b = L[b + 1]) && b.type == CKEDITOR.NODE_ELEMENT && (c = CKEDITOR.dom.element.createFromHtml('\x3cspan data-cke-bookmark\x3d"1" style\x3d"display:none"\x3e\x26nbsp;\x3c/span\x3e', a.document), c.insertAfter(b), b.mergeSiblings(!1), a.moveToBookmark({
					startNode: c
				}))) : a.collapse(!0)
			}
			a.optimizeBookmark();
			var l = 0 === b,
				k = 1 == b,
				q = 2 == b;
			b = q || k;
			var w = a.startContainer,
				B = a.endContainer,
				z = a.startOffset,
				C = a.endOffset,
				E, G, F, J, H, M;
			if (q && B.type == CKEDITOR.NODE_TEXT && w.equals(B)) w = a.document.createText(w.substring(z, C)), c.append(w);
			else {
				B.type == CKEDITOR.NODE_TEXT ? q ? M = !0 : B = B.split(C) : 0 < B.getChildCount() ? C >= B.getChildCount() ? (B = B.getChild(C - 1), G = !0) : B = B.getChild(C) : J = G = !0;
				w.type == CKEDITOR.NODE_TEXT ? q ? H = !0 : w.split(z) : 0 < w.getChildCount() ? 0 === z ? (w = w.getChild(z), E = !0) : w = w.getChild(z - 1) : F = E = !0;
				for (var L = w.getParents(), D = B.getParents(), T = h(), I = L.length - 1, O = D.length - 1, K = c, U, V, ca, fa = -1, P = T; P <= I; P++) {
					V = L[P];
					ca = V.getNext();
					for (P != I || V.equals(D[P]) && I < O ? b && (U = K.append(V.clone(0, e))) : E ? f(V, K, !1, F) : H && K.append(a.document.createText(V.substring(z))); ca;) {
						if (ca.equals(D[P])) {
							fa = P;
							break
						}
						ca = f(ca, K)
					}
					K = U
				}
				K = c;
				for (P = T; P <= O; P++)
					if (c = D[P], ca = c.getPrevious(), c.equals(L[P])) b && (K = K.getChild(0));
					else {
						P != O || c.equals(L[P]) && O < I ? b && (U = K.append(c.clone(0, e))) : G ? f(c, K, !1, J) : M && K.append(a.document.createText(c.substring(0, C)));
						if (P > fa)
							for (; ca;) ca = f(ca, K, !0);
						K = U
					}
				q || m()
			}
		}

		function b() {
			var a = !1,
				b = CKEDITOR.dom.walker.whitespaces(),
				c = CKEDITOR.dom.walker.bookmark(!0),
				d = CKEDITOR.dom.walker.bogus();
			return function(e) {
				return c(e) || b(e) ? !0 : d(e) && !a ? a = !0 : e.type == CKEDITOR.NODE_TEXT && (e.hasAscendant("pre") || CKEDITOR.tools.trim(e.getText()).length) || e.type == CKEDITOR.NODE_ELEMENT && !e.is(l) ? !1 : !0
			}
		}

		function c(a) {
			var b = CKEDITOR.dom.walker.whitespaces(),
				c = CKEDITOR.dom.walker.bookmark(1);
			return function(d) {
				return c(d) || b(d) ? !0 : !a && k(d) || d.type == CKEDITOR.NODE_ELEMENT && d.is(CKEDITOR.dtd.$removeEmpty)
			}
		}

		function e(a) {
			return function() {
				var b;
				return this[a ? "getPreviousNode" : "getNextNode"](function(a) {
					!b && m(a) && (b = a);
					return h(a) && !(k(a) && a.equals(b))
				})
			}
		}
		var l = {
				abbr: 1,
				acronym: 1,
				b: 1,
				bdo: 1,
				big: 1,
				cite: 1,
				code: 1,
				del: 1,
				dfn: 1,
				em: 1,
				font: 1,
				i: 1,
				ins: 1,
				label: 1,
				kbd: 1,
				q: 1,
				samp: 1,
				small: 1,
				span: 1,
				strike: 1,
				strong: 1,
				sub: 1,
				sup: 1,
				tt: 1,
				u: 1,
				"var": 1
			},
			k = CKEDITOR.dom.walker.bogus(),
			d = /^[\t\r\n ]*(?:&nbsp;|\xa0)$/,
			h = CKEDITOR.dom.walker.editable(),
			m = CKEDITOR.dom.walker.ignored(!0);
		CKEDITOR.dom.range.prototype = {
			clone: function() {
				var a = new CKEDITOR.dom.range(this.root);
				a._setStartContainer(this.startContainer);
				a.startOffset = this.startOffset;
				a._setEndContainer(this.endContainer);
				a.endOffset = this.endOffset;
				a.collapsed = this.collapsed;
				return a
			},
			collapse: function(a) {
				a ? (this._setEndContainer(this.startContainer), this.endOffset = this.startOffset) : (this._setStartContainer(this.endContainer), this.startOffset = this.endOffset);
				this.collapsed = !0
			},
			cloneContents: function(a) {
				var b = new CKEDITOR.dom.documentFragment(this.document);
				this.collapsed || f(this, 2, b, !1, "undefined" == typeof a ? !0 : a);
				return b
			},
			deleteContents: function(a) {
				this.collapsed || f(this, 0, null, a)
			},
			extractContents: function(a, b) {
				var c = new CKEDITOR.dom.documentFragment(this.document);
				this.collapsed || f(this, 1, c, a, "undefined" == typeof b ? !0 : b);
				return c
			},
			createBookmark: function(a) {
				var b, c, d, e, f = this.collapsed;
				b = this.document.createElement("span");
				b.data("cke-bookmark", 1);
				b.setStyle("display", "none");
				b.setHtml("\x26nbsp;");
				a && (d = "cke_bm_" + CKEDITOR.tools.getNextNumber(), b.setAttribute("id", d + (f ? "C" : "S")));
				f || (c = b.clone(), c.setHtml("\x26nbsp;"), a && c.setAttribute("id", d + "E"), e = this.clone(), e.collapse(), e.insertNode(c));
				e = this.clone();
				e.collapse(!0);
				e.insertNode(b);
				c ? (this.setStartAfter(b), this.setEndBefore(c)) : this.moveToPosition(b, CKEDITOR.POSITION_AFTER_END);
				return {
					startNode: a ? d + (f ? "C" : "S") : b,
					endNode: a ? d + "E" : c,
					serializable: a,
					collapsed: f
				}
			},
			createBookmark2: function() {
				function a(b) {
					var g = b.container,
						d = b.offset,
						e;
					e = g;
					var f = d;
					e = e.type != CKEDITOR.NODE_ELEMENT || 0 === f || f == e.getChildCount() ? 0 : e.getChild(f - 1).type == CKEDITOR.NODE_TEXT && e.getChild(f).type == CKEDITOR.NODE_TEXT;
					e && (g = g.getChild(d - 1), d = g.getLength());
					if (g.type == CKEDITOR.NODE_ELEMENT && 0 < d) {
						a: {
							for (e = g; d--;)
								if (f = e.getChild(d).getIndex(!0), 0 <= f) {
									d = f;
									break a
								}
							d = -1
						}
						d += 1
					}
					if (g.type == CKEDITOR.NODE_TEXT) {
						e = g;
						for (f = 0;
							(e = e.getPrevious()) && e.type == CKEDITOR.NODE_TEXT;) f += e.getText().replace(CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE, "").length;
						e = f;
						g.getText() ? d += e : (f = g.getPrevious(c), e ? (d = e, g = f ? f.getNext() : g.getParent().getFirst()) : (g = g.getParent(), d = f ? f.getIndex(!0) + 1 : 0))
					}
					b.container = g;
					b.offset = d
				}

				function b(a, g) {
					var c = g.getCustomData("cke-fillingChar");
					if (c) {
						var d = a.container;
						c.equals(d) && (a.offset -= CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE.length, 0 >= a.offset && (a.offset = d.getIndex(), a.container = d.getParent()))
					}
				}
				var c = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_TEXT, !0);
				return function(c) {
					var d = this.collapsed,
						e = {
							container: this.startContainer,
							offset: this.startOffset
						},
						f = {
							container: this.endContainer,
							offset: this.endOffset
						};
					c && (a(e), b(e, this.root), d || (a(f), b(f, this.root)));
					return {
						start: e.container.getAddress(c),
						end: d ? null : f.container.getAddress(c),
						startOffset: e.offset,
						endOffset: f.offset,
						normalized: c,
						collapsed: d,
						is2: !0
					}
				}
			}(),
			moveToBookmark: function(a) {
				if (a.is2) {
					var b = this.document.getByAddress(a.start, a.normalized),
						c = a.startOffset,
						d = a.end && this.document.getByAddress(a.end, a.normalized);
					a = a.endOffset;
					this.setStart(b, c);
					d ? this.setEnd(d, a) : this.collapse(!0)
				} else b = (c = a.serializable) ? this.document.getById(a.startNode) : a.startNode, a = c ? this.document.getById(a.endNode) : a.endNode, this.setStartBefore(b), b.remove(), a ? (this.setEndBefore(a), a.remove()) : this.collapse(!0)
			},
			getBoundaryNodes: function() {
				var a = this.startContainer,
					b = this.endContainer,
					c = this.startOffset,
					d = this.endOffset,
					e;
				if (a.type == CKEDITOR.NODE_ELEMENT)
					if (e = a.getChildCount(), e > c) a = a.getChild(c);
					else if (1 > e) a = a.getPreviousSourceNode();
				else {
					for (a = a.$; a.lastChild;) a = a.lastChild;
					a = new CKEDITOR.dom.node(a);
					a = a.getNextSourceNode() || a
				}
				if (b.type == CKEDITOR.NODE_ELEMENT)
					if (e = b.getChildCount(), e > d) b = b.getChild(d).getPreviousSourceNode(!0);
					else if (1 > e) b = b.getPreviousSourceNode();
				else {
					for (b = b.$; b.lastChild;) b = b.lastChild;
					b = new CKEDITOR.dom.node(b)
				}
				a.getPosition(b) & CKEDITOR.POSITION_FOLLOWING && (a = b);
				return {
					startNode: a,
					endNode: b
				}
			},
			getCommonAncestor: function(a, b) {
				var c = this.startContainer,
					d = this.endContainer,
					c = c.equals(d) ? a && c.type == CKEDITOR.NODE_ELEMENT && this.startOffset == this.endOffset - 1 ? c.getChild(this.startOffset) : c : c.getCommonAncestor(d);
				return b && !c.is ? c.getParent() : c
			},
			optimize: function() {
				var a = this.startContainer,
					b = this.startOffset;
				a.type != CKEDITOR.NODE_ELEMENT && (b ? b >= a.getLength() && this.setStartAfter(a) : this.setStartBefore(a));
				a = this.endContainer;
				b = this.endOffset;
				a.type != CKEDITOR.NODE_ELEMENT && (b ? b >= a.getLength() && this.setEndAfter(a) : this.setEndBefore(a))
			},
			optimizeBookmark: function() {
				var a = this.startContainer,
					b = this.endContainer;
				a.is && a.is("span") && a.data("cke-bookmark") && this.setStartAt(a, CKEDITOR.POSITION_BEFORE_START);
				b && b.is && b.is("span") && b.data("cke-bookmark") && this.setEndAt(b, CKEDITOR.POSITION_AFTER_END)
			},
			trim: function(a, b) {
				var c = this.startContainer,
					d = this.startOffset,
					e = this.collapsed;
				if ((!a || e) && c && c.type == CKEDITOR.NODE_TEXT) {
					if (d)
						if (d >= c.getLength()) d = c.getIndex() + 1, c = c.getParent();
						else {
							var f = c.split(d),
								d = c.getIndex() + 1,
								c = c.getParent();
							this.startContainer.equals(this.endContainer) ? this.setEnd(f, this.endOffset - this.startOffset) : c.equals(this.endContainer) && (this.endOffset += 1)
						}
					else d = c.getIndex(), c = c.getParent();
					this.setStart(c, d);
					if (e) {
						this.collapse(!0);
						return
					}
				}
				c = this.endContainer;
				d = this.endOffset;
				b || e || !c || c.type != CKEDITOR.NODE_TEXT || (d ? (d >= c.getLength() || c.split(d), d = c.getIndex() + 1) : d = c.getIndex(), c = c.getParent(), this.setEnd(c, d))
			},
			enlarge: function(a, b) {
				function c(a) {
					return a && a.type == CKEDITOR.NODE_ELEMENT && a.hasAttribute("contenteditable") ? null : a
				}
				var d = new RegExp(/[^\s\ufeff]/);
				switch (a) {
					case CKEDITOR.ENLARGE_INLINE:
						var e = 1;
					case CKEDITOR.ENLARGE_ELEMENT:
						var f = function(a, b) {
							var c = new CKEDITOR.dom.range(m);
							c.setStart(a, b);
							c.setEndAt(m, CKEDITOR.POSITION_BEFORE_END);
							var c = new CKEDITOR.dom.walker(c),
								g;
							for (c.guard = function(a) {
									return !(a.type == CKEDITOR.NODE_ELEMENT && a.isBlockBoundary())
								}; g = c.next();) {
								if (g.type != CKEDITOR.NODE_TEXT) return !1;
								E = g != a ? g.getText() : g.substring(b);
								if (d.test(E)) return !1
							}
							return !0
						};
						if (this.collapsed) break;
						var h = this.getCommonAncestor(),
							m = this.root,
							l, k, q, w, B, z = !1,
							C, E;
						C = this.startContainer;
						var G = this.startOffset;
						C.type == CKEDITOR.NODE_TEXT ? (G && (C = !CKEDITOR.tools.trim(C.substring(0, G)).length && C, z = !!C), C && ((w = C.getPrevious()) || (q = C.getParent()))) : (G && (w = C.getChild(G - 1) || C.getLast()), w || (q = C));
						for (q = c(q); q || w;) {
							if (q && !w) {
								!B && q.equals(h) && (B = !0);
								if (e ? q.isBlockBoundary() : !m.contains(q)) break;
								z && "inline" == q.getComputedStyle("display") || (z = !1, B ? l = q : this.setStartBefore(q));
								w = q.getPrevious()
							}
							for (; w;)
								if (C = !1, w.type == CKEDITOR.NODE_COMMENT) w = w.getPrevious();
								else {
									if (w.type == CKEDITOR.NODE_TEXT) E = w.getText(), d.test(E) && (w = null), C = /[\s\ufeff]$/.test(E);
									else if ((w.$.offsetWidth > (CKEDITOR.env.webkit ? 1 : 0) || b && w.is("br")) && !w.data("cke-bookmark"))
										if (z && CKEDITOR.dtd.$removeEmpty[w.getName()]) {
											E = w.getText();
											if (d.test(E)) w = null;
											else
												for (var G = w.$.getElementsByTagName("*"), F = 0, J; J = G[F++];)
													if (!CKEDITOR.dtd.$removeEmpty[J.nodeName.toLowerCase()]) {
														w = null;
														break
													}
											w && (C = !!E.length)
										} else w = null;
									C && (z ? B ? l = q : q && this.setStartBefore(q) : z = !0);
									if (w) {
										C = w.getPrevious();
										if (!q && !C) {
											q = w;
											w = null;
											break
										}
										w = C
									} else q = null
								}
							q && (q = c(q.getParent()))
						}
						C = this.endContainer;
						G = this.endOffset;
						q = w = null;
						B = z = !1;
						C.type == CKEDITOR.NODE_TEXT ? CKEDITOR.tools.trim(C.substring(G)).length ? z = !0 : (z = !C.getLength(), G == C.getLength() ? (w = C.getNext()) || (q = C.getParent()) : f(C, G) && (q = C.getParent())) : (w = C.getChild(G)) || (q = C);
						for (; q || w;) {
							if (q && !w) {
								!B && q.equals(h) && (B = !0);
								if (e ? q.isBlockBoundary() : !m.contains(q)) break;
								z && "inline" == q.getComputedStyle("display") || (z = !1, B ? k = q : q && this.setEndAfter(q));
								w = q.getNext()
							}
							for (; w;) {
								C = !1;
								if (w.type == CKEDITOR.NODE_TEXT) E = w.getText(), f(w, 0) || (w = null), C = /^[\s\ufeff]/.test(E);
								else if (w.type == CKEDITOR.NODE_ELEMENT) {
									if ((0 < w.$.offsetWidth || b && w.is("br")) && !w.data("cke-bookmark"))
										if (z && CKEDITOR.dtd.$removeEmpty[w.getName()]) {
											E = w.getText();
											if (d.test(E)) w = null;
											else
												for (G = w.$.getElementsByTagName("*"), F = 0; J = G[F++];)
													if (!CKEDITOR.dtd.$removeEmpty[J.nodeName.toLowerCase()]) {
														w = null;
														break
													}
											w && (C = !!E.length)
										} else w = null
								} else C = 1;
								C && z && (B ? k = q : this.setEndAfter(q));
								if (w) {
									C = w.getNext();
									if (!q && !C) {
										q = w;
										w = null;
										break
									}
									w = C
								} else q = null
							}
							q && (q = c(q.getParent()))
						}
						l && k && (h = l.contains(k) ? k : l, this.setStartBefore(h), this.setEndAfter(h));
						break;
					case CKEDITOR.ENLARGE_BLOCK_CONTENTS:
					case CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS:
						q = new CKEDITOR.dom.range(this.root);
						m = this.root;
						q.setStartAt(m, CKEDITOR.POSITION_AFTER_START);
						q.setEnd(this.startContainer, this.startOffset);
						q = new CKEDITOR.dom.walker(q);
						var H, M, L = CKEDITOR.dom.walker.blockBoundary(a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS ? {
								br: 1
							} : null),
							D = null,
							T = function(a) {
								if (a.type == CKEDITOR.NODE_ELEMENT && "false" == a.getAttribute("contenteditable"))
									if (D) {
										if (D.equals(a)) {
											D = null;
											return
										}
									} else D = a;
								else if (D) return;
								var b = L(a);
								b || (H = a);
								return b
							},
							e = function(a) {
								var b = T(a);
								!b && a.is && a.is("br") && (M = a);
								return b
							};
						q.guard = T;
						q = q.lastBackward();
						H = H || m;
						this.setStartAt(H, !H.is("br") && (!q && this.checkStartOfBlock() || q && H.contains(q)) ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_AFTER_END);
						if (a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS) {
							q = this.clone();
							q = new CKEDITOR.dom.walker(q);
							var I = CKEDITOR.dom.walker.whitespaces(),
								O = CKEDITOR.dom.walker.bookmark();
							q.evaluator = function(a) {
								return !I(a) && !O(a)
							};
							if ((q = q.previous()) && q.type == CKEDITOR.NODE_ELEMENT && q.is("br")) break
						}
						q = this.clone();
						q.collapse();
						q.setEndAt(m, CKEDITOR.POSITION_BEFORE_END);
						q = new CKEDITOR.dom.walker(q);
						q.guard = a == CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS ? e : T;
						H = D = M = null;
						q = q.lastForward();
						H = H || m;
						this.setEndAt(H, !q && this.checkEndOfBlock() || q && H.contains(q) ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_BEFORE_START);
						M && this.setEndAfter(M)
				}
			},
			shrink: function(a, b, c) {
				var d = "boolean" === typeof c ? c : c && "boolean" === typeof c.shrinkOnBlockBoundary ? c.shrinkOnBlockBoundary : !0,
					e = c && c.skipBogus;
				if (!this.collapsed) {
					a = a || CKEDITOR.SHRINK_TEXT;
					var f = this.clone(),
						h = this.startContainer,
						m = this.endContainer,
						l = this.startOffset,
						k = this.endOffset,
						q = c = 1;
					h && h.type == CKEDITOR.NODE_TEXT && (l ? l >= h.getLength() ? f.setStartAfter(h) : (f.setStartBefore(h), c = 0) : f.setStartBefore(h));
					m && m.type == CKEDITOR.NODE_TEXT && (k ? k >= m.getLength() ? f.setEndAfter(m) : (f.setEndAfter(m), q = 0) : f.setEndBefore(m));
					var f = new CKEDITOR.dom.walker(f),
						w = CKEDITOR.dom.walker.bookmark(),
						B = CKEDITOR.dom.walker.bogus();
					f.evaluator = function(b) {
						return b.type == (a == CKEDITOR.SHRINK_ELEMENT ? CKEDITOR.NODE_ELEMENT : CKEDITOR.NODE_TEXT)
					};
					var z;
					f.guard = function(b, c) {
						if (e && B(b) || w(b)) return !0;
						if (a == CKEDITOR.SHRINK_ELEMENT && b.type == CKEDITOR.NODE_TEXT || c && b.equals(z) || !1 === d && b.type == CKEDITOR.NODE_ELEMENT && b.isBlockBoundary() || b.type == CKEDITOR.NODE_ELEMENT && b.hasAttribute("contenteditable")) return !1;
						c || b.type != CKEDITOR.NODE_ELEMENT || (z = b);
						return !0
					};
					c && (h = f[a == CKEDITOR.SHRINK_ELEMENT ? "lastForward" : "next"]()) && this.setStartAt(h, b ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_START);
					q && (f.reset(), (f = f[a == CKEDITOR.SHRINK_ELEMENT ? "lastBackward" : "previous"]()) && this.setEndAt(f, b ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_AFTER_END));
					return !(!c && !q)
				}
			},
			insertNode: function(a) {
				this.optimizeBookmark();
				this.trim(!1, !0);
				var b = this.startContainer,
					c = b.getChild(this.startOffset);
				c ? a.insertBefore(c) : b.append(a);
				a.getParent() && a.getParent().equals(this.endContainer) && this.endOffset++;
				this.setStartBefore(a)
			},
			moveToPosition: function(a, b) {
				this.setStartAt(a, b);
				this.collapse(!0)
			},
			moveToRange: function(a) {
				this.setStart(a.startContainer, a.startOffset);
				this.setEnd(a.endContainer, a.endOffset)
			},
			selectNodeContents: function(a) {
				this.setStart(a, 0);
				this.setEnd(a, a.type == CKEDITOR.NODE_TEXT ? a.getLength() : a.getChildCount())
			},
			setStart: function(b, c) {
				b.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$empty[b.getName()] && (c = b.getIndex(), b = b.getParent());
				this._setStartContainer(b);
				this.startOffset = c;
				this.endContainer || (this._setEndContainer(b), this.endOffset = c);
				a(this)
			},
			setEnd: function(b, c) {
				b.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$empty[b.getName()] && (c = b.getIndex() + 1, b = b.getParent());
				this._setEndContainer(b);
				this.endOffset = c;
				this.startContainer || (this._setStartContainer(b), this.startOffset = c);
				a(this)
			},
			setStartAfter: function(a) {
				this.setStart(a.getParent(), a.getIndex() + 1)
			},
			setStartBefore: function(a) {
				this.setStart(a.getParent(), a.getIndex())
			},
			setEndAfter: function(a) {
				this.setEnd(a.getParent(), a.getIndex() + 1)
			},
			setEndBefore: function(a) {
				this.setEnd(a.getParent(), a.getIndex())
			},
			setStartAt: function(b, c) {
				switch (c) {
					case CKEDITOR.POSITION_AFTER_START:
						this.setStart(b, 0);
						break;
					case CKEDITOR.POSITION_BEFORE_END:
						b.type == CKEDITOR.NODE_TEXT ? this.setStart(b, b.getLength()) : this.setStart(b, b.getChildCount());
						break;
					case CKEDITOR.POSITION_BEFORE_START:
						this.setStartBefore(b);
						break;
					case CKEDITOR.POSITION_AFTER_END:
						this.setStartAfter(b)
				}
				a(this)
			},
			setEndAt: function(b, c) {
				switch (c) {
					case CKEDITOR.POSITION_AFTER_START:
						this.setEnd(b, 0);
						break;
					case CKEDITOR.POSITION_BEFORE_END:
						b.type == CKEDITOR.NODE_TEXT ? this.setEnd(b, b.getLength()) : this.setEnd(b, b.getChildCount());
						break;
					case CKEDITOR.POSITION_BEFORE_START:
						this.setEndBefore(b);
						break;
					case CKEDITOR.POSITION_AFTER_END:
						this.setEndAfter(b)
				}
				a(this)
			},
			fixBlock: function(a, b) {
				var c = this.createBookmark(),
					d = this.document.createElement(b);
				this.collapse(a);
				this.enlarge(CKEDITOR.ENLARGE_BLOCK_CONTENTS);
				this.extractContents().appendTo(d);
				d.trim();
				this.insertNode(d);
				var e = d.getBogus();
				e && e.remove();
				d.appendBogus();
				this.moveToBookmark(c);
				return d
			},
			splitBlock: function(a, b) {
				var c = new CKEDITOR.dom.elementPath(this.startContainer, this.root),
					d = new CKEDITOR.dom.elementPath(this.endContainer, this.root),
					e = c.block,
					f = d.block,
					h = null;
				if (!c.blockLimit.equals(d.blockLimit)) return null;
				"br" != a && (e || (e = this.fixBlock(!0, a), f = (new CKEDITOR.dom.elementPath(this.endContainer, this.root)).block), f || (f = this.fixBlock(!1, a)));
				c = e && this.checkStartOfBlock();
				d = f && this.checkEndOfBlock();
				this.deleteContents();
				e && e.equals(f) && (d ? (h = new CKEDITOR.dom.elementPath(this.startContainer, this.root), this.moveToPosition(f, CKEDITOR.POSITION_AFTER_END), f = null) : c ? (h = new CKEDITOR.dom.elementPath(this.startContainer, this.root), this.moveToPosition(e, CKEDITOR.POSITION_BEFORE_START), e = null) : (f = this.splitElement(e, b || !1), e.is("ul", "ol") || e.appendBogus()));
				return {
					previousBlock: e,
					nextBlock: f,
					wasStartOfBlock: c,
					wasEndOfBlock: d,
					elementPath: h
				}
			},
			splitElement: function(a, b) {
				if (!this.collapsed) return null;
				this.setEndAt(a, CKEDITOR.POSITION_BEFORE_END);
				var c = this.extractContents(!1, b || !1),
					d = a.clone(!1, b || !1);
				c.appendTo(d);
				d.insertAfter(a);
				this.moveToPosition(a, CKEDITOR.POSITION_AFTER_END);
				return d
			},
			removeEmptyBlocksAtEnd: function() {
				function a(g) {
					return function(a) {
						return b(a) || c(a) || a.type == CKEDITOR.NODE_ELEMENT && a.isEmptyInlineRemoveable() || g.is("table") && a.is("caption") ? !1 : !0
					}
				}
				var b = CKEDITOR.dom.walker.whitespaces(),
					c = CKEDITOR.dom.walker.bookmark(!1);
				return function(b) {
					for (var c = this.createBookmark(), d = this[b ? "endPath" : "startPath"](), e = d.block || d.blockLimit, f; e && !e.equals(d.root) && !e.getFirst(a(e));) f = e.getParent(), this[b ? "setEndAt" : "setStartAt"](e, CKEDITOR.POSITION_AFTER_END), e.remove(1), e = f;
					this.moveToBookmark(c)
				}
			}(),
			startPath: function() {
				return new CKEDITOR.dom.elementPath(this.startContainer, this.root)
			},
			endPath: function() {
				return new CKEDITOR.dom.elementPath(this.endContainer, this.root)
			},
			checkBoundaryOfElement: function(a, b) {
				var d = b == CKEDITOR.START,
					e = this.clone();
				e.collapse(d);
				e[d ? "setStartAt" : "setEndAt"](a, d ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_END);
				e = new CKEDITOR.dom.walker(e);
				e.evaluator = c(d);
				return e[d ? "checkBackward" : "checkForward"]()
			},
			checkStartOfBlock: function() {
				var a = this.startContainer,
					c = this.startOffset;
				CKEDITOR.env.ie && c && a.type == CKEDITOR.NODE_TEXT && (a = CKEDITOR.tools.ltrim(a.substring(0, c)), d.test(a) && this.trim(0, 1));
				this.trim();
				a = new CKEDITOR.dom.elementPath(this.startContainer, this.root);
				c = this.clone();
				c.collapse(!0);
				c.setStartAt(a.block || a.blockLimit, CKEDITOR.POSITION_AFTER_START);
				a = new CKEDITOR.dom.walker(c);
				a.evaluator = b();
				return a.checkBackward()
			},
			checkEndOfBlock: function() {
				var a = this.endContainer,
					c = this.endOffset;
				CKEDITOR.env.ie && a.type == CKEDITOR.NODE_TEXT && (a = CKEDITOR.tools.rtrim(a.substring(c)), d.test(a) && this.trim(1, 0));
				this.trim();
				a = new CKEDITOR.dom.elementPath(this.endContainer, this.root);
				c = this.clone();
				c.collapse(!1);
				c.setEndAt(a.block || a.blockLimit, CKEDITOR.POSITION_BEFORE_END);
				a = new CKEDITOR.dom.walker(c);
				a.evaluator = b();
				return a.checkForward()
			},
			getPreviousNode: function(a, b, c) {
				var d = this.clone();
				d.collapse(1);
				d.setStartAt(c || this.root, CKEDITOR.POSITION_AFTER_START);
				c = new CKEDITOR.dom.walker(d);
				c.evaluator = a;
				c.guard = b;
				return c.previous()
			},
			getNextNode: function(a, b, c) {
				var d = this.clone();
				d.collapse();
				d.setEndAt(c || this.root, CKEDITOR.POSITION_BEFORE_END);
				c = new CKEDITOR.dom.walker(d);
				c.evaluator = a;
				c.guard = b;
				return c.next()
			},
			checkReadOnly: function() {
				function a(b, c) {
					for (; b;) {
						if (b.type == CKEDITOR.NODE_ELEMENT) {
							if ("false" == b.getAttribute("contentEditable") && !b.data("cke-editable")) return 0;
							if (b.is("html") || "true" == b.getAttribute("contentEditable") && (b.contains(c) || b.equals(c))) break
						}
						b = b.getParent()
					}
					return 1
				}
				return function() {
					var b = this.startContainer,
						c = this.endContainer;
					return !(a(b, c) && a(c, b))
				}
			}(),
			moveToElementEditablePosition: function(a, b) {
				if (a.type == CKEDITOR.NODE_ELEMENT && !a.isEditable(!1)) return this.moveToPosition(a, b ? CKEDITOR.POSITION_AFTER_END : CKEDITOR.POSITION_BEFORE_START), !0;
				for (var c = 0; a;) {
					if (a.type == CKEDITOR.NODE_TEXT) {
						b && this.endContainer && this.checkEndOfBlock() && d.test(a.getText()) ? this.moveToPosition(a, CKEDITOR.POSITION_BEFORE_START) : this.moveToPosition(a, b ? CKEDITOR.POSITION_AFTER_END : CKEDITOR.POSITION_BEFORE_START);
						c = 1;
						break
					}
					if (a.type == CKEDITOR.NODE_ELEMENT)
						if (a.isEditable()) this.moveToPosition(a, b ? CKEDITOR.POSITION_BEFORE_END : CKEDITOR.POSITION_AFTER_START), c = 1;
						else if (b && a.is("br") && this.endContainer && this.checkEndOfBlock()) this.moveToPosition(a, CKEDITOR.POSITION_BEFORE_START);
					else if ("false" == a.getAttribute("contenteditable") && a.is(CKEDITOR.dtd.$block)) return this.setStartBefore(a), this.setEndAfter(a), !0;
					var e = a,
						f = c,
						h = void 0;
					e.type == CKEDITOR.NODE_ELEMENT && e.isEditable(!1) && (h = e[b ? "getLast" : "getFirst"](m));
					f || h || (h = e[b ? "getPrevious" : "getNext"](m));
					a = h
				}
				return !!c
			},
			moveToClosestEditablePosition: function(a, b) {
				var c, d = 0,
					e, f, h = [CKEDITOR.POSITION_AFTER_END, CKEDITOR.POSITION_BEFORE_START];
				a ? (c = new CKEDITOR.dom.range(this.root), c.moveToPosition(a, h[b ? 0 : 1])) : c = this.clone();
				if (a && !a.is(CKEDITOR.dtd.$block)) d = 1;
				else if (e = c[b ? "getNextEditableNode" : "getPreviousEditableNode"]()) d = 1, (f = e.type == CKEDITOR.NODE_ELEMENT) && e.is(CKEDITOR.dtd.$block) && "false" == e.getAttribute("contenteditable") ? (c.setStartAt(e, CKEDITOR.POSITION_BEFORE_START), c.setEndAt(e, CKEDITOR.POSITION_AFTER_END)) : !CKEDITOR.env.needsBrFiller && f && e.is(CKEDITOR.dom.walker.validEmptyBlockContainers) ? (c.setEnd(e, 0), c.collapse()) : c.moveToPosition(e, h[b ? 1 : 0]);
				d && this.moveToRange(c);
				return !!d
			},
			moveToElementEditStart: function(a) {
				return this.moveToElementEditablePosition(a)
			},
			moveToElementEditEnd: function(a) {
				return this.moveToElementEditablePosition(a, !0)
			},
			getEnclosedNode: function() {
				var a = this.clone();
				a.optimize();
				if (a.startContainer.type != CKEDITOR.NODE_ELEMENT || a.endContainer.type != CKEDITOR.NODE_ELEMENT) return null;
				var a = new CKEDITOR.dom.walker(a),
					b = CKEDITOR.dom.walker.bookmark(!1, !0),
					c = CKEDITOR.dom.walker.whitespaces(!0);
				a.evaluator = function(a) {
					return c(a) && b(a)
				};
				var d = a.next();
				a.reset();
				return d && d.equals(a.previous()) ? d : null
			},
			getTouchedStartNode: function() {
				var a = this.startContainer;
				return this.collapsed || a.type != CKEDITOR.NODE_ELEMENT ? a : a.getChild(this.startOffset) || a
			},
			getTouchedEndNode: function() {
				var a = this.endContainer;
				return this.collapsed || a.type != CKEDITOR.NODE_ELEMENT ? a : a.getChild(this.endOffset - 1) || a
			},
			getNextEditableNode: e(),
			getPreviousEditableNode: e(1),
			_getTableElement: function(a) {
				a = a || {
					td: 1,
					th: 1,
					tr: 1,
					tbody: 1,
					thead: 1,
					tfoot: 1,
					table: 1
				};
				var b = this.startContainer,
					c = this.endContainer,
					d = b.getAscendant("table", !0),
					e = c.getAscendant("table", !0);
				return CKEDITOR.env.safari && d && c.equals(this.root) ? b.getAscendant(a, !0) : this.getEnclosedNode() ? this.getEnclosedNode().getAscendant(a, !0) : d && e && (d.equals(e) || d.contains(e) || e.contains(d)) ? b.getAscendant(a, !0) : null
			},
			scrollIntoView: function() {
				var a = new CKEDITOR.dom.element.createFromHtml("\x3cspan\x3e\x26nbsp;\x3c/span\x3e", this.document),
					b, c, d, e = this.clone();
				e.optimize();
				(d = e.startContainer.type == CKEDITOR.NODE_TEXT) ? (c = e.startContainer.getText(), b = e.startContainer.split(e.startOffset), a.insertAfter(e.startContainer)) : e.insertNode(a);
				a.scrollIntoView();
				d && (e.startContainer.setText(c), b.remove());
				a.remove()
			},
			_setStartContainer: function(a) {
				this.startContainer = a
			},
			_setEndContainer: function(a) {
				this.endContainer = a
			},
			_find: function(a, b) {
				var c = this.getCommonAncestor(),
					d = this.getBoundaryNodes(),
					e = [],
					f, h, m, l;
				if (c && c.find)
					for (h = c.find(a), f = 0; f < h.count(); f++)
						if (c = h.getItem(f), b || !c.isReadOnly()) m = c.getPosition(d.startNode) & CKEDITOR.POSITION_FOLLOWING || d.startNode.equals(c), l = c.getPosition(d.endNode) & CKEDITOR.POSITION_PRECEDING + CKEDITOR.POSITION_IS_CONTAINED || d.endNode.equals(c), m && l && e.push(c);
				return e
			}
		};
		CKEDITOR.dom.range.mergeRanges = function(a) {
			return CKEDITOR.tools.array.reduce(a, function(a, b) {
				var c = a[a.length - 1],
					d = !1;
				b = b.clone();
				b.enlarge(CKEDITOR.ENLARGE_ELEMENT);
				if (c) {
					var e = new CKEDITOR.dom.range(b.root),
						d = new CKEDITOR.dom.walker(e),
						g = CKEDITOR.dom.walker.whitespaces();
					e.setStart(c.endContainer, c.endOffset);
					e.setEnd(b.startContainer, b.startOffset);
					for (e = d.next(); g(e) || b.endContainer.equals(e);) e = d.next();
					d = !e
				}
				d ? c.setEnd(b.endContainer, b.endOffset) : a.push(b);
				return a
			}, [])
		}
	}(), CKEDITOR.POSITION_AFTER_START = 1, CKEDITOR.POSITION_BEFORE_END = 2, CKEDITOR.POSITION_BEFORE_START = 3, CKEDITOR.POSITION_AFTER_END = 4, CKEDITOR.ENLARGE_ELEMENT = 1, CKEDITOR.ENLARGE_BLOCK_CONTENTS = 2, CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS = 3, CKEDITOR.ENLARGE_INLINE = 4, CKEDITOR.START = 1, CKEDITOR.END = 2, CKEDITOR.SHRINK_ELEMENT = 1, CKEDITOR.SHRINK_TEXT = 2, "use strict", function() {
		function a(a) {
			1 > arguments.length || (this.range = a, this.forceBrBreak = 0, this.enlargeBr = 1, this.enforceRealBlocks = 0, this._ || (this._ = {}))
		}

		function f(a) {
			var b = [];
			a.forEach(function(a) {
				if ("true" == a.getAttribute("contenteditable")) return b.push(a), !1
			}, CKEDITOR.NODE_ELEMENT, !0);
			return b
		}

		function b(a, c, d, e) {
			a: {
				null == e && (e = f(d));
				for (var h; h = e.shift();)
					if (h.getDtd().p) {
						e = {
							element: h,
							remaining: e
						};
						break a
					}
				e = null
			}
			if (!e) return 0;
			if ((h = CKEDITOR.filter.instances[e.element.data("cke-filter")]) && !h.check(c)) return b(a, c, d, e.remaining);
			c = new CKEDITOR.dom.range(e.element);c.selectNodeContents(e.element);c = c.createIterator();c.enlargeBr = a.enlargeBr;c.enforceRealBlocks = a.enforceRealBlocks;c.activeFilter = c.filter = h;a._.nestedEditable = {
				element: e.element,
				container: d,
				remaining: e.remaining,
				iterator: c
			};
			return 1
		}

		function c(a, b, c) {
			if (!b) return !1;
			a = a.clone();
			a.collapse(!c);
			return a.checkBoundaryOfElement(b, c ? CKEDITOR.START : CKEDITOR.END)
		}
		var e = /^[\r\n\t ]+$/,
			l = CKEDITOR.dom.walker.bookmark(!1, !0),
			k = CKEDITOR.dom.walker.whitespaces(!0),
			d = function(a) {
				return l(a) && k(a)
			},
			h = {
				dd: 1,
				dt: 1,
				li: 1
			};
		a.prototype = {
			getNextParagraph: function(a) {
				var g, f, k, r, x;
				a = a || "p";
				if (this._.nestedEditable) {
					if (g = this._.nestedEditable.iterator.getNextParagraph(a)) return this.activeFilter = this._.nestedEditable.iterator.activeFilter, g;
					this.activeFilter = this.filter;
					if (b(this, a, this._.nestedEditable.container, this._.nestedEditable.remaining)) return this.activeFilter = this._.nestedEditable.iterator.activeFilter, this._.nestedEditable.iterator.getNextParagraph(a);
					this._.nestedEditable = null
				}
				if (!this.range.root.getDtd()[a]) return null;
				if (!this._.started) {
					var v = this.range.clone();
					f = v.startPath();
					var u = v.endPath(),
						t = !v.collapsed && c(v, f.block),
						y = !v.collapsed && c(v, u.block, 1);
					v.shrink(CKEDITOR.SHRINK_ELEMENT, !0);
					t && v.setStartAt(f.block, CKEDITOR.POSITION_BEFORE_END);
					y && v.setEndAt(u.block, CKEDITOR.POSITION_AFTER_START);
					f = v.endContainer.hasAscendant("pre", !0) || v.startContainer.hasAscendant("pre", !0);
					v.enlarge(this.forceBrBreak && !f || !this.enlargeBr ? CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS : CKEDITOR.ENLARGE_BLOCK_CONTENTS);
					v.collapsed || (f = new CKEDITOR.dom.walker(v.clone()), u = CKEDITOR.dom.walker.bookmark(!0, !0), f.evaluator = u, this._.nextNode = f.next(), f = new CKEDITOR.dom.walker(v.clone()), f.evaluator = u, f = f.previous(), this._.lastNode = f.getNextSourceNode(!0, null, v.root), this._.lastNode && this._.lastNode.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.trim(this._.lastNode.getText()) && this._.lastNode.getParent().isBlockBoundary() && (u = this.range.clone(), u.moveToPosition(this._.lastNode, CKEDITOR.POSITION_AFTER_END), u.checkEndOfBlock() && (u = new CKEDITOR.dom.elementPath(u.endContainer, u.root), this._.lastNode = (u.block || u.blockLimit).getNextSourceNode(!0))), this._.lastNode && v.root.contains(this._.lastNode) || (this._.lastNode = this._.docEndMarker = v.document.createText(""), this._.lastNode.insertAfter(f)), v = null);
					this._.started = 1;
					f = v
				}
				u = this._.nextNode;
				v = this._.lastNode;
				for (this._.nextNode = null; u;) {
					var t = 0,
						y = u.hasAscendant("pre"),
						A = u.type != CKEDITOR.NODE_ELEMENT,
						q = 0;
					if (A) u.type == CKEDITOR.NODE_TEXT && e.test(u.getText()) && (A = 0);
					else {
						var w = u.getName();
						if (CKEDITOR.dtd.$block[w] && "false" == u.getAttribute("contenteditable")) {
							g = u;
							b(this, a, g);
							break
						} else if (u.isBlockBoundary(this.forceBrBreak && !y && {
								br: 1
							})) {
							if ("br" == w) A = 1;
							else if (!f && !u.getChildCount() && "hr" != w) {
								g = u;
								k = u.equals(v);
								break
							}
							f && (f.setEndAt(u, CKEDITOR.POSITION_BEFORE_START), "br" != w && (this._.nextNode = u));
							t = 1
						} else {
							if (u.getFirst()) {
								f || (f = this.range.clone(), f.setStartAt(u, CKEDITOR.POSITION_BEFORE_START));
								u = u.getFirst();
								continue
							}
							A = 1
						}
					}
					A && !f && (f = this.range.clone(), f.setStartAt(u, CKEDITOR.POSITION_BEFORE_START));
					k = (!t || A) && u.equals(v);
					if (f && !t)
						for (; !u.getNext(d) && !k;) {
							w = u.getParent();
							if (w.isBlockBoundary(this.forceBrBreak && !y && {
									br: 1
								})) {
								t = 1;
								A = 0;
								k || w.equals(v);
								f.setEndAt(w, CKEDITOR.POSITION_BEFORE_END);
								break
							}
							u = w;
							A = 1;
							k = u.equals(v);
							q = 1
						}
					A && f.setEndAt(u, CKEDITOR.POSITION_AFTER_END);
					u = this._getNextSourceNode(u, q, v);
					if ((k = !u) || t && f) break
				}
				if (!g) {
					if (!f) return this._.docEndMarker && this._.docEndMarker.remove(), this._.nextNode = null;
					g = new CKEDITOR.dom.elementPath(f.startContainer, f.root);
					u = g.blockLimit;
					t = {
						div: 1,
						th: 1,
						td: 1
					};
					g = g.block;
					!g && u && !this.enforceRealBlocks && t[u.getName()] && f.checkStartOfBlock() && f.checkEndOfBlock() && !u.equals(f.root) ? g = u : !g || this.enforceRealBlocks && g.is(h) ? (g = this.range.document.createElement(a), f.extractContents().appendTo(g), g.trim(), f.insertNode(g), r = x = !0) : "li" != g.getName() ? f.checkStartOfBlock() && f.checkEndOfBlock() || (g = g.clone(!1), f.extractContents().appendTo(g), g.trim(), x = f.splitBlock(), r = !x.wasStartOfBlock, x = !x.wasEndOfBlock, f.insertNode(g)) : k || (this._.nextNode = g.equals(v) ? null : this._getNextSourceNode(f.getBoundaryNodes().endNode, 1, v))
				}
				r && (r = g.getPrevious()) && r.type == CKEDITOR.NODE_ELEMENT && ("br" == r.getName() ? r.remove() : r.getLast() && "br" == r.getLast().$.nodeName.toLowerCase() && r.getLast().remove());
				x && (r = g.getLast()) && r.type == CKEDITOR.NODE_ELEMENT && "br" == r.getName() && (!CKEDITOR.env.needsBrFiller || r.getPrevious(l) || r.getNext(l)) && r.remove();
				this._.nextNode || (this._.nextNode = k || g.equals(v) || !v ? null : this._getNextSourceNode(g, 1, v));
				return g
			},
			_getNextSourceNode: function(a, b, c) {
				function d(a) {
					return !(a.equals(c) || a.equals(e))
				}
				var e = this.range.root;
				for (a = a.getNextSourceNode(b, null, d); !l(a);) a = a.getNextSourceNode(b, null, d);
				return a
			}
		};
		CKEDITOR.dom.range.prototype.createIterator = function() {
			return new a(this)
		}
	}(), CKEDITOR.command = function(a, f) {
		this.uiItems = [];
		this.exec = function(b) {
			if (this.state == CKEDITOR.TRISTATE_DISABLED || !this.checkAllowed()) return !1;
			this.editorFocus && a.focus();
			return !1 === this.fire("exec") ? !0 : !1 !== f.exec.call(this, a, b)
		};
		this.refresh = function(a, b) {
			if (!this.readOnly && a.readOnly) return !0;
			if (this.context && !b.isContextFor(this.context) || !this.checkAllowed(!0)) return this.disable(), !0;
			this.startDisabled || this.enable();
			this.modes && !this.modes[a.mode] && this.disable();
			return !1 === this.fire("refresh", {
				editor: a,
				path: b
			}) ? !0 : f.refresh && !1 !== f.refresh.apply(this, arguments)
		};
		var b;
		this.checkAllowed = function(c) {
			return c || "boolean" != typeof b ? b = a.activeFilter.checkFeature(this) : b
		};
		CKEDITOR.tools.extend(this, f, {
			modes: {
				wysiwyg: 1
			},
			editorFocus: 1,
			contextSensitive: !!f.context,
			state: CKEDITOR.TRISTATE_DISABLED
		});
		CKEDITOR.event.call(this)
	}, CKEDITOR.command.prototype = {
		enable: function() {
			this.state == CKEDITOR.TRISTATE_DISABLED && this.checkAllowed() && this.setState(this.preserveState && "undefined" != typeof this.previousState ? this.previousState : CKEDITOR.TRISTATE_OFF)
		},
		disable: function() {
			this.setState(CKEDITOR.TRISTATE_DISABLED)
		},
		setState: function(a) {
			if (this.state == a || a != CKEDITOR.TRISTATE_DISABLED && !this.checkAllowed()) return !1;
			this.previousState = this.state;
			this.state = a;
			this.fire("state");
			return !0
		},
		toggleState: function() {
			this.state == CKEDITOR.TRISTATE_OFF ? this.setState(CKEDITOR.TRISTATE_ON) : this.state == CKEDITOR.TRISTATE_ON && this.setState(CKEDITOR.TRISTATE_OFF)
		}
	}, CKEDITOR.event.implementOn(CKEDITOR.command.prototype), CKEDITOR.ENTER_P = 1, CKEDITOR.ENTER_BR = 2, CKEDITOR.ENTER_DIV = 3, CKEDITOR.config = {
		customConfig: "config.js",
		autoUpdateElement: !0,
		language: "",
		defaultLanguage: "en",
		contentsLangDirection: "",
		enterMode: CKEDITOR.ENTER_P,
		forceEnterMode: !1,
		shiftEnterMode: CKEDITOR.ENTER_BR,
		docType: "\x3c!DOCTYPE html\x3e",
		bodyId: "",
		bodyClass: "",
		fullPage: !1,
		height: 200,
		contentsCss: CKEDITOR.getUrl("contents.css"),
		extraPlugins: "",
		removePlugins: "",
		protectedSource: [],
		tabIndex: 0,
		width: "",
		baseFloatZIndex: 1E4,
		blockedKeystrokes: [CKEDITOR.CTRL + 66, CKEDITOR.CTRL + 73, CKEDITOR.CTRL + 85]
	}, function() {
		function a(a, b, c, d, e) {
			var g, f;
			a = [];
			for (g in b) {
				f = b[g];
				f = "boolean" == typeof f ? {} : "function" == typeof f ? {
					match: f
				} : F(f);
				"$" != g.charAt(0) && (f.elements = g);
				c && (f.featureName = c.toLowerCase());
				var h = f;
				h.elements = k(h.elements, /\s+/) || null;
				h.propertiesOnly = h.propertiesOnly || !0 === h.elements;
				var q = /\s*,\s*/,
					m = void 0;
				for (m in M) {
					h[m] = k(h[m], q) || null;
					var l = h,
						u = L[m],
						w = k(h[L[m]], q),
						D = h[m],
						n = [],
						E = !0,
						I = void 0;
					w ? E = !1 : w = {};
					for (I in D) "!" == I.charAt(0) && (I = I.slice(1), n.push(I), w[I] = !0, E = !1);
					for (; I = n.pop();) D[I] = D["!" + I], delete D["!" + I];
					l[u] = (E ? !1 : w) || null
				}
				h.match = h.match || null;
				d.push(f);
				a.push(f)
			}
			b = e.elements;
			e = e.generic;
			var B;
			c = 0;
			for (d = a.length; c < d; ++c) {
				g = F(a[c]);
				f = !0 === g.classes || !0 === g.styles || !0 === g.attributes;
				h = g;
				m = u = q = void 0;
				for (q in M) h[q] = t(h[q]);
				l = !0;
				for (m in L) {
					q = L[m];
					u = h[q];
					w = [];
					D = void 0;
					for (D in u) - 1 < D.indexOf("*") ? w.push(new RegExp("^" + D.replace(/\*/g, ".*") + "$")) : w.push(D);
					u = w;
					u.length && (h[q] = u, l = !1)
				}
				h.nothingRequired = l;
				h.noProperties = !(h.attributes || h.classes || h.styles);
				if (!0 === g.elements || null === g.elements) e[f ? "unshift" : "push"](g);
				else
					for (B in h = g.elements, delete g.elements, h)
						if (b[B]) b[B][f ? "unshift" : "push"](g);
						else b[B] = [g]
			}
		}

		function f(a, c, e, g) {
			if (!a.match || a.match(c))
				if (g || d(a, c))
					if (a.propertiesOnly || (e.valid = !0), e.allAttributes || (e.allAttributes = b(a.attributes, c.attributes, e.validAttributes)), e.allStyles || (e.allStyles = b(a.styles, c.styles, e.validStyles)), !e.allClasses) {
						a = a.classes;
						c = c.classes;
						g = e.validClasses;
						if (a)
							if (!0 === a) a = !0;
							else {
								for (var f = 0, h = c.length, q; f < h; ++f) q = c[f], g[q] || (g[q] = a(q));
								a = !1
							}
						else a = !1;
						e.allClasses = a
					}
		}

		function b(a, b, c) {
			if (!a) return !1;
			if (!0 === a) return !0;
			for (var d in b) c[d] || (c[d] = a(d));
			return !1
		}

		function c(a, b, c) {
			if (!a.match || a.match(b)) {
				if (a.noProperties) return !1;
				c.hadInvalidAttribute = e(a.attributes, b.attributes) || c.hadInvalidAttribute;
				c.hadInvalidStyle = e(a.styles, b.styles) || c.hadInvalidStyle;
				a = a.classes;
				b = b.classes;
				if (a) {
					for (var d = !1, g = !0 === a, f = b.length; f--;)
						if (g || a(b[f])) b.splice(f, 1), d = !0;
					a = d
				} else a = !1;
				c.hadInvalidClass = a || c.hadInvalidClass
			}
		}

		function e(a, b) {
			if (!a) return !1;
			var c = !1,
				d = !0 === a,
				e;
			for (e in b)
				if (d || a(e)) delete b[e], c = !0;
			return c
		}

		function l(a, b, c) {
			if (a.disabled || a.customConfig && !c || !b) return !1;
			a._.cachedChecks = {};
			return !0
		}

		function k(a, b) {
			if (!a) return !1;
			if (!0 === a) return a;
			if ("string" == typeof a) return a = J(a), "*" == a ? !0 : CKEDITOR.tools.convertArrayToObject(a.split(b));
			if (CKEDITOR.tools.isArray(a)) return a.length ? CKEDITOR.tools.convertArrayToObject(a) : !1;
			var c = {},
				d = 0,
				e;
			for (e in a) c[e] = a[e], d++;
			return d ? c : !1
		}

		function d(a, b) {
			if (a.nothingRequired) return !0;
			var c, d, e, g;
			if (e = a.requiredClasses)
				for (g = b.classes, c = 0; c < e.length; ++c)
					if (d = e[c], "string" == typeof d) {
						if (-1 == CKEDITOR.tools.indexOf(g, d)) return !1
					} else if (!CKEDITOR.tools.checkIfAnyArrayItemMatches(g, d)) return !1;
			return h(b.styles, a.requiredStyles) && h(b.attributes, a.requiredAttributes)
		}

		function h(a, b) {
			if (!b) return !0;
			for (var c = 0, d; c < b.length; ++c)
				if (d = b[c], "string" == typeof d) {
					if (!(d in a)) return !1
				} else if (!CKEDITOR.tools.checkIfAnyObjectPropertyMatches(a, d)) return !1;
			return !0
		}

		function m(a) {
			if (!a) return {};
			a = a.split(/\s*,\s*/).sort();
			for (var b = {}; a.length;) b[a.shift()] = "cke-test";
			return b
		}

		function g(a) {
			var b, c, d, e, g = {},
				f = 1;
			for (a = J(a); b = a.match(D);)(c = b[2]) ? (d = n(c, "styles"), e = n(c, "attrs"), c = n(c, "classes")) : d = e = c = null, g["$" + f++] = {
				elements: b[1],
				classes: c,
				styles: d,
				attributes: e
			}, a = a.slice(b[0].length);
			return g
		}

		function n(a, b) {
			var c = a.match(T[b]);
			return c ? J(c[1]) : null
		}

		function p(a) {
			var b = a.styleBackup = a.attributes.style,
				c = a.classBackup = a.attributes["class"];
			a.styles || (a.styles = CKEDITOR.tools.parseCssText(b || "", 1));
			a.classes || (a.classes = c ? c.split(/\s+/) : [])
		}

		function r(a, b, d, e) {
			var g = 0,
				h;
			e.toHtml && (b.name = b.name.replace(I, "$1"));
			if (e.doCallbacks && a.elementCallbacks) {
				a: {
					h = a.elementCallbacks;
					for (var q = 0, m = h.length, l; q < m; ++q)
						if (l = h[q](b)) {
							h = l;
							break a
						}
					h = void 0
				}
				if (h) return h
			}
			if (e.doTransform && (h = a._.transformations[b.name])) {
				p(b);
				for (q = 0; q < h.length; ++q) w(a, b, h[q]);
				v(b)
			}
			if (e.doFilter) {
				a: {
					q = b.name;m = a._;a = m.allowedRules.elements[q];h = m.allowedRules.generic;q = m.disallowedRules.elements[q];m = m.disallowedRules.generic;l = e.skipRequired;
					var k = {
							valid: !1,
							validAttributes: {},
							validClasses: {},
							validStyles: {},
							allAttributes: !1,
							allClasses: !1,
							allStyles: !1,
							hadInvalidAttribute: !1,
							hadInvalidClass: !1,
							hadInvalidStyle: !1
						},
						t, D;
					if (a || h) {
						p(b);
						if (q)
							for (t = 0, D = q.length; t < D; ++t)
								if (!1 === c(q[t], b, k)) {
									a = null;
									break a
								}
						if (m)
							for (t = 0, D = m.length; t < D; ++t) c(m[t], b, k);
						if (a)
							for (t = 0, D = a.length; t < D; ++t) f(a[t], b, k, l);
						if (h)
							for (t = 0, D = h.length; t < D; ++t) f(h[t], b, k, l);
						a = k
					} else a = null
				}
				if (!a || !a.valid) return d.push(b), 1;D = a.validAttributes;
				var L = a.validStyles;h = a.validClasses;
				var q = b.attributes,
					n = b.styles,
					m = b.classes;l = b.classBackup;
				var E = b.styleBackup,
					B, y, z = [],
					k = [],
					F = /^data-cke-/;t = !1;delete q.style;delete q["class"];delete b.classBackup;delete b.styleBackup;
				if (!a.allAttributes)
					for (B in q) D[B] || (F.test(B) ? B == (y = B.replace(/^data-cke-saved-/, "")) || D[y] || (delete q[B], t = !0) : (delete q[B], t = !0));
				if (!a.allStyles || a.hadInvalidStyle) {
					for (B in n) a.allStyles || L[B] ? z.push(B + ":" + n[B]) : t = !0;
					z.length && (q.style = z.sort().join("; "))
				} else E && (q.style = E);
				if (!a.allClasses || a.hadInvalidClass) {
					for (B = 0; B < m.length; ++B)(a.allClasses || h[m[B]]) && k.push(m[B]);
					k.length && (q["class"] = k.sort().join(" "));
					l && k.length < l.split(/\s+/).length && (t = !0)
				} else l && (q["class"] = l);t && (g = 1);
				if (!e.skipFinalValidation && !u(b)) return d.push(b), 1
			}
			e.toHtml && (b.name = b.name.replace(O, "cke:$1"));
			return g
		}

		function x(a) {
			var b = [],
				c;
			for (c in a) - 1 < c.indexOf("*") && b.push(c.replace(/\*/g, ".*"));
			return b.length ? new RegExp("^(?:" + b.join("|") + ")$") : null
		}

		function v(a) {
			var b = a.attributes,
				c;
			delete b.style;
			delete b["class"];
			if (c = CKEDITOR.tools.writeCssText(a.styles, !0)) b.style = c;
			a.classes.length && (b["class"] = a.classes.sort().join(" "))
		}

		function u(a) {
			switch (a.name) {
				case "a":
					if (!(a.children.length || a.attributes.name || a.attributes.id)) return !1;
					break;
				case "img":
					if (!a.attributes.src) return !1
			}
			return !0
		}

		function t(a) {
			if (!a) return !1;
			if (!0 === a) return !0;
			var b = x(a);
			return function(c) {
				return c in a || b && c.match(b)
			}
		}

		function y() {
			return new CKEDITOR.htmlParser.element("br")
		}

		function A(a) {
			return a.type == CKEDITOR.NODE_ELEMENT && ("br" == a.name || G.$block[a.name])
		}

		function q(a, b, c) {
			var d = a.name;
			if (G.$empty[d] || !a.children.length) "hr" == d && "br" == b ? a.replaceWith(y()) : (a.parent && c.push({
				check: "it",
				el: a.parent
			}), a.remove());
			else if (G.$block[d] || "tr" == d)
				if ("br" == b) a.previous && !A(a.previous) && (b = y(), b.insertBefore(a)), a.next && !A(a.next) && (b = y(), b.insertAfter(a)), a.replaceWithChildren();
				else {
					var d = a.children,
						e;
					b: {
						e = G[b];
						for (var g = 0, f = d.length, h; g < f; ++g)
							if (h = d[g], h.type == CKEDITOR.NODE_ELEMENT && !e[h.name]) {
								e = !1;
								break b
							}
						e = !0
					}
					if (e) a.name = b, a.attributes = {}, c.push({
						check: "parent-down",
						el: a
					});
					else {
						e = a.parent;
						for (var g = e.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT || "body" == e.name, q, m, f = d.length; 0 < f;) h = d[--f], g && (h.type == CKEDITOR.NODE_TEXT || h.type == CKEDITOR.NODE_ELEMENT && G.$inline[h.name]) ? (q || (q = new CKEDITOR.htmlParser.element(b), q.insertAfter(a), c.push({
							check: "parent-down",
							el: q
						})), q.add(h, 0)) : (q = null, m = G[e.name] || G.span, h.insertAfter(a), e.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT || h.type != CKEDITOR.NODE_ELEMENT || m[h.name] || c.push({
							check: "el-up",
							el: h
						}));
						a.remove()
					}
				}
			else d in {
				style: 1,
				script: 1
			} ? a.remove() : (a.parent && c.push({
				check: "it",
				el: a.parent
			}), a.replaceWithChildren())
		}

		function w(a, b, c) {
			var d, e;
			for (d = 0; d < c.length; ++d)
				if (e = c[d], !(e.check && !a.check(e.check, !1) || e.left && !e.left(b))) {
					e.right(b, K);
					break
				}
		}

		function B(a, b) {
			var c = b.getDefinition(),
				d = c.attributes,
				e = c.styles,
				g, f, h, q;
			if (a.name != c.element) return !1;
			for (g in d)
				if ("class" == g)
					for (c = d[g].split(/\s+/), h = a.classes.join("|"); q = c.pop();) {
						if (-1 == h.indexOf(q)) return !1
					} else if (a.attributes[g] != d[g]) return !1;
			for (f in e)
				if (a.styles[f] != e[f]) return !1;
			return !0
		}

		function z(a, b) {
			var c, d;
			"string" == typeof a ? c = a : a instanceof CKEDITOR.style ? d = a : (c = a[0], d = a[1]);
			return [{
				element: c,
				left: d,
				right: function(a, c) {
					c.transform(a, b)
				}
			}]
		}

		function C(a) {
			return function(b) {
				return B(b, a)
			}
		}

		function E(a) {
			return function(b, c) {
				c[a](b)
			}
		}
		var G = CKEDITOR.dtd,
			F = CKEDITOR.tools.copy,
			J = CKEDITOR.tools.trim,
			H = ["", "p", "br", "div"];
		CKEDITOR.FILTER_SKIP_TREE = 2;
		CKEDITOR.filter = function(a) {
			this.allowedContent = [];
			this.disallowedContent = [];
			this.elementCallbacks = null;
			this.disabled = !1;
			this.editor = null;
			this.id = CKEDITOR.tools.getNextNumber();
			this._ = {
				allowedRules: {
					elements: {},
					generic: []
				},
				disallowedRules: {
					elements: {},
					generic: []
				},
				transformations: {},
				cachedTests: {}
			};
			CKEDITOR.filter.instances[this.id] = this;
			if (a instanceof CKEDITOR.editor) {
				a = this.editor = a;
				this.customConfig = !0;
				var b = a.config.allowedContent;
				!0 === b ? this.disabled = !0 : (b || (this.customConfig = !1), this.allow(b, "config", 1), this.allow(a.config.extraAllowedContent, "extra", 1), this.allow(H[a.enterMode] + " " + H[a.shiftEnterMode], "default", 1), this.disallow(a.config.disallowedContent))
			} else this.customConfig = !1, this.allow(a, "default", 1)
		};
		CKEDITOR.filter.instances = {};
		CKEDITOR.filter.prototype = {
			allow: function(b, c, d) {
				if (!l(this, b, d)) return !1;
				var e, f;
				if ("string" == typeof b) b = g(b);
				else if (b instanceof CKEDITOR.style) {
					if (b.toAllowedContentRules) return this.allow(b.toAllowedContentRules(this.editor), c, d);
					e = b.getDefinition();
					b = {};
					d = e.attributes;
					b[e.element] = e = {
						styles: e.styles,
						requiredStyles: e.styles && CKEDITOR.tools.objectKeys(e.styles)
					};
					d && (d = F(d), e.classes = d["class"] ? d["class"].split(/\s+/) : null, e.requiredClasses = e.classes, delete d["class"], e.attributes = d, e.requiredAttributes = d && CKEDITOR.tools.objectKeys(d))
				} else if (CKEDITOR.tools.isArray(b)) {
					for (e = 0; e < b.length; ++e) f = this.allow(b[e], c, d);
					return f
				}
				a(this, b, c, this.allowedContent, this._.allowedRules);
				return !0
			},
			applyTo: function(a, b, c, d) {
				if (this.disabled) return !1;
				var e = this,
					g = [],
					f = this.editor && this.editor.config.protectedSource,
					h, m = !1,
					l = {
						doFilter: !c,
						doTransform: !0,
						doCallbacks: !0,
						toHtml: b
					};
				a.forEach(function(a) {
					if (a.type == CKEDITOR.NODE_ELEMENT) {
						if ("off" == a.attributes["data-cke-filter"]) return !1;
						if (!b || "span" != a.name || !~CKEDITOR.tools.objectKeys(a.attributes).join("|").indexOf("data-cke-"))
							if (h = r(e, a, g, l), h & 1) m = !0;
							else if (h & 2) return !1
					} else if (a.type == CKEDITOR.NODE_COMMENT && a.value.match(/^\{cke_protected\}(?!\{C\})/)) {
						var c;
						a: {
							var d = decodeURIComponent(a.value.replace(/^\{cke_protected\}/, ""));c = [];
							var q, k, u;
							if (f)
								for (k = 0; k < f.length; ++k)
									if ((u = d.match(f[k])) && u[0].length == d.length) {
										c = !0;
										break a
									}
							d = CKEDITOR.htmlParser.fragment.fromHtml(d);1 == d.children.length && (q = d.children[0]).type == CKEDITOR.NODE_ELEMENT && r(e, q, c, l);c = !c.length
						}
						c || g.push(a)
					}
				}, null, !0);
				g.length && (m = !0);
				var k;
				a = [];
				d = H[d || (this.editor ? this.editor.enterMode : CKEDITOR.ENTER_P)];
				for (var w; c = g.pop();) c.type == CKEDITOR.NODE_ELEMENT ? q(c, d, a) : c.remove();
				for (; k = a.pop();)
					if (c = k.el, c.parent) switch (w = G[c.parent.name] || G.span, k.check) {
						case "it":
							G.$removeEmpty[c.name] && !c.children.length ? q(c, d, a) : u(c) || q(c, d, a);
							break;
						case "el-up":
							c.parent.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT || w[c.name] || q(c, d, a);
							break;
						case "parent-down":
							c.parent.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT || w[c.name] || q(c.parent, d, a)
					}
					return m
			},
			checkFeature: function(a) {
				if (this.disabled || !a) return !0;
				a.toFeature && (a = a.toFeature(this.editor));
				return !a.requiredContent || this.check(a.requiredContent)
			},
			disable: function() {
				this.disabled = !0
			},
			disallow: function(b) {
				if (!l(this, b, !0)) return !1;
				"string" == typeof b && (b = g(b));
				a(this, b, null, this.disallowedContent, this._.disallowedRules);
				return !0
			},
			addContentForms: function(a) {
				if (!this.disabled && a) {
					var b, c, d = [],
						e;
					for (b = 0; b < a.length && !e; ++b) c = a[b], ("string" == typeof c || c instanceof CKEDITOR.style) && this.check(c) && (e = c);
					if (e) {
						for (b = 0; b < a.length; ++b) d.push(z(a[b], e));
						this.addTransformations(d)
					}
				}
			},
			addElementCallback: function(a) {
				this.elementCallbacks || (this.elementCallbacks = []);
				this.elementCallbacks.push(a)
			},
			addFeature: function(a) {
				if (this.disabled || !a) return !0;
				a.toFeature && (a = a.toFeature(this.editor));
				this.allow(a.allowedContent, a.name);
				this.addTransformations(a.contentTransformations);
				this.addContentForms(a.contentForms);
				return a.requiredContent && (this.customConfig || this.disallowedContent.length) ? this.check(a.requiredContent) : !0
			},
			addTransformations: function(a) {
				var b, c;
				if (!this.disabled && a) {
					var d = this._.transformations,
						e;
					for (e = 0; e < a.length; ++e) {
						b = a[e];
						var g = void 0,
							f = void 0,
							h = void 0,
							q = void 0,
							m = void 0,
							l = void 0;
						c = [];
						for (f = 0; f < b.length; ++f) h = b[f], "string" == typeof h ? (h = h.split(/\s*:\s*/), q = h[0], m = null, l = h[1]) : (q = h.check, m = h.left, l = h.right), g || (g = h, g = g.element ? g.element : q ? q.match(/^([a-z0-9]+)/i)[0] : g.left.getDefinition().element), m instanceof CKEDITOR.style && (m = C(m)), c.push({
							check: q == g ? null : q,
							left: m,
							right: "string" == typeof l ? E(l) : l
						});
						b = g;
						d[b] || (d[b] = []);
						d[b].push(c)
					}
				}
			},
			check: function(a, b, c) {
				if (this.disabled) return !0;
				if (CKEDITOR.tools.isArray(a)) {
					for (var d = a.length; d--;)
						if (this.check(a[d], b, c)) return !0;
					return !1
				}
				var e, f;
				if ("string" == typeof a) {
					f = a + "\x3c" + (!1 === b ? "0" : "1") + (c ? "1" : "0") + "\x3e";
					if (f in this._.cachedChecks) return this._.cachedChecks[f];
					d = g(a).$1;
					e = d.styles;
					var h = d.classes;
					d.name = d.elements;
					d.classes = h = h ? h.split(/\s*,\s*/) : [];
					d.styles = m(e);
					d.attributes = m(d.attributes);
					d.children = [];
					h.length && (d.attributes["class"] = h.join(" "));
					e && (d.attributes.style = CKEDITOR.tools.writeCssText(d.styles));
					e = d
				} else d = a.getDefinition(), e = d.styles, h = d.attributes || {}, e && !CKEDITOR.tools.isEmpty(e) ? (e = F(e), h.style = CKEDITOR.tools.writeCssText(e, !0)) : e = {}, e = {
					name: d.element,
					attributes: h,
					classes: h["class"] ? h["class"].split(/\s+/) : [],
					styles: e,
					children: []
				};
				var h = CKEDITOR.tools.clone(e),
					q = [],
					l;
				if (!1 !== b && (l = this._.transformations[e.name])) {
					for (d = 0; d < l.length; ++d) w(this, e, l[d]);
					v(e)
				}
				r(this, h, q, {
					doFilter: !0,
					doTransform: !1 !== b,
					skipRequired: !c,
					skipFinalValidation: !c
				});
				b = 0 < q.length ? !1 : CKEDITOR.tools.objectCompare(e.attributes, h.attributes, !0) ? !0 : !1;
				"string" == typeof a && (this._.cachedChecks[f] = b);
				return b
			},
			getAllowedEnterMode: function() {
				var a = ["p", "div", "br"],
					b = {
						p: CKEDITOR.ENTER_P,
						div: CKEDITOR.ENTER_DIV,
						br: CKEDITOR.ENTER_BR
					};
				return function(c, d) {
					var e = a.slice(),
						g;
					if (this.check(H[c])) return c;
					for (d || (e = e.reverse()); g = e.pop();)
						if (this.check(g)) return b[g];
					return CKEDITOR.ENTER_BR
				}
			}(),
			destroy: function() {
				delete CKEDITOR.filter.instances[this.id];
				delete this._;
				delete this.allowedContent;
				delete this.disallowedContent
			}
		};
		var M = {
				styles: 1,
				attributes: 1,
				classes: 1
			},
			L = {
				styles: "requiredStyles",
				attributes: "requiredAttributes",
				classes: "requiredClasses"
			},
			D = /^([a-z0-9\-*\s]+)((?:\s*\{[!\w\-,\s\*]+\}\s*|\s*\[[!\w\-,\s\*]+\]\s*|\s*\([!\w\-,\s\*]+\)\s*){0,3})(?:;\s*|$)/i,
			T = {
				styles: /{([^}]+)}/,
				attrs: /\[([^\]]+)\]/,
				classes: /\(([^\)]+)\)/
			},
			I = /^cke:(object|embed|param)$/,
			O = /^(object|embed|param)$/,
			K;
		K = CKEDITOR.filter.transformationsTools = {
			sizeToStyle: function(a) {
				this.lengthToStyle(a, "width");
				this.lengthToStyle(a, "height")
			},
			sizeToAttribute: function(a) {
				this.lengthToAttribute(a, "width");
				this.lengthToAttribute(a, "height")
			},
			lengthToStyle: function(a, b, c) {
				c = c || b;
				if (!(c in a.styles)) {
					var d = a.attributes[b];
					d && (/^\d+$/.test(d) && (d += "px"), a.styles[c] = d)
				}
				delete a.attributes[b]
			},
			lengthToAttribute: function(a, b, c) {
				c = c || b;
				if (!(c in a.attributes)) {
					var d = a.styles[b],
						e = d && d.match(/^(\d+)(?:\.\d*)?px$/);
					e ? a.attributes[c] = e[1] : "cke-test" == d && (a.attributes[c] = "cke-test")
				}
				delete a.styles[b]
			},
			alignmentToStyle: function(a) {
				if (!("float" in a.styles)) {
					var b = a.attributes.align;
					if ("left" == b || "right" == b) a.styles["float"] = b
				}
				delete a.attributes.align
			},
			alignmentToAttribute: function(a) {
				if (!("align" in a.attributes)) {
					var b = a.styles["float"];
					if ("left" == b || "right" == b) a.attributes.align = b
				}
				delete a.styles["float"]
			},
			splitBorderShorthand: function(a) {
				function b(d) {
					a.styles["border-top-width"] = c[d[0]];
					a.styles["border-right-width"] = c[d[1]];
					a.styles["border-bottom-width"] = c[d[2]];
					a.styles["border-left-width"] = c[d[3]]
				}
				if (a.styles.border) {
					var c = a.styles.border.match(/([\.\d]+\w+)/g) || ["0px"];
					switch (c.length) {
						case 1:
							a.styles["border-width"] = c[0];
							break;
						case 2:
							b([0, 1, 0, 1]);
							break;
						case 3:
							b([0, 1, 2, 1]);
							break;
						case 4:
							b([0, 1, 2, 3])
					}
					a.styles["border-style"] = a.styles["border-style"] || (a.styles.border.match(/(none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset|initial|inherit)/) || [])[0];
					a.styles["border-style"] || delete a.styles["border-style"];
					delete a.styles.border
				}
			},
			listTypeToStyle: function(a) {
				if (a.attributes.type) switch (a.attributes.type) {
					case "a":
						a.styles["list-style-type"] = "lower-alpha";
						break;
					case "A":
						a.styles["list-style-type"] = "upper-alpha";
						break;
					case "i":
						a.styles["list-style-type"] = "lower-roman";
						break;
					case "I":
						a.styles["list-style-type"] = "upper-roman";
						break;
					case "1":
						a.styles["list-style-type"] = "decimal";
						break;
					default:
						a.styles["list-style-type"] = a.attributes.type
				}
			},
			splitMarginShorthand: function(a) {
				function b(d) {
					a.styles["margin-top"] = c[d[0]];
					a.styles["margin-right"] = c[d[1]];
					a.styles["margin-bottom"] = c[d[2]];
					a.styles["margin-left"] = c[d[3]]
				}
				if (a.styles.margin) {
					var c = a.styles.margin.match(/(\-?[\.\d]+\w+)/g) || ["0px"];
					switch (c.length) {
						case 1:
							a.styles.margin = c[0];
							break;
						case 2:
							b([0, 1, 0, 1]);
							break;
						case 3:
							b([0, 1, 2, 1]);
							break;
						case 4:
							b([0, 1, 2, 3])
					}
					delete a.styles.margin
				}
			},
			matchesStyle: B,
			transform: function(a, b) {
				if ("string" == typeof b) a.name = b;
				else {
					var c = b.getDefinition(),
						d = c.styles,
						e = c.attributes,
						g, f, h, q;
					a.name = c.element;
					for (g in e)
						if ("class" == g)
							for (c = a.classes.join("|"), h = e[g].split(/\s+/); q = h.pop();) - 1 == c.indexOf(q) && a.classes.push(q);
						else a.attributes[g] = e[g];
					for (f in d) a.styles[f] = d[f]
				}
			}
		}
	}(), function() {
		CKEDITOR.focusManager = function(a) {
			if (a.focusManager) return a.focusManager;
			this.hasFocus = !1;
			this.currentActive = null;
			this._ = {
				editor: a
			};
			return this
		};
		CKEDITOR.focusManager._ = {
			blurDelay: 200
		};
		CKEDITOR.focusManager.prototype = {
			focus: function(a) {
				this._.timer && clearTimeout(this._.timer);
				a && (this.currentActive = a);
				this.hasFocus || this._.locked || ((a = CKEDITOR.currentInstance) && a.focusManager.blur(1), this.hasFocus = !0, (a = this._.editor.container) && a.addClass("cke_focus"), this._.editor.fire("focus"))
			},
			lock: function() {
				this._.locked = 1
			},
			unlock: function() {
				delete this._.locked
			},
			blur: function(a) {
				function f() {
					var a = this._.editor;
					this.hasFocus && (this.hasFocus = !1, CKEDITOR.env.chrome && a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE && a.window.$.getSelection().removeAllRanges(), (a = this._.editor.container) && a.removeClass("cke_focus"), this._.editor.fire("blur"))
				}
				if (!this._.locked) {
					this._.timer && clearTimeout(this._.timer);
					var b = CKEDITOR.focusManager._.blurDelay;
					a || !b ? f.call(this) : this._.timer = CKEDITOR.tools.setTimeout(function() {
						delete this._.timer;
						f.call(this)
					}, b, this)
				}
			},
			add: function(a, f) {
				var b = a.getCustomData("focusmanager");
				if (!b || b != this) {
					b && b.remove(a);
					var b = "focus",
						c = "blur";
					f && (CKEDITOR.env.ie ? (b = "focusin", c = "focusout") : CKEDITOR.event.useCapture = 1);
					var e = {
						blur: function() {
							a.equals(this.currentActive) && this.blur()
						},
						focus: function() {
							this.focus(a)
						}
					};
					a.on(b, e.focus, this);
					a.on(c, e.blur, this);
					f && (CKEDITOR.event.useCapture = 0);
					a.setCustomData("focusmanager", this);
					a.setCustomData("focusmanager_handlers", e)
				}
			},
			remove: function(a) {
				a.removeCustomData("focusmanager");
				var f = a.removeCustomData("focusmanager_handlers");
				a.removeListener("blur", f.blur);
				a.removeListener("focus", f.focus)
			}
		}
	}(), CKEDITOR.keystrokeHandler = function(a) {
		if (a.keystrokeHandler) return a.keystrokeHandler;
		this.keystrokes = {};
		this.blockedKeystrokes = {};
		this._ = {
			editor: a
		};
		return this
	}, function() {
		var a, f = function(b) {
				b = b.data;
				var e = b.getKeystroke(),
					f = this.keystrokes[e],
					k = this._.editor;
				a = !1 === k.fire("key", {
					keyCode: e,
					domEvent: b
				});
				a || (f && (a = !1 !== k.execCommand(f, {
					from: "keystrokeHandler"
				})), a || (a = !!this.blockedKeystrokes[e]));
				a && b.preventDefault(!0);
				return !a
			},
			b = function(b) {
				a && (a = !1, b.data.preventDefault(!0))
			};
		CKEDITOR.keystrokeHandler.prototype = {
			attach: function(a) {
				a.on("keydown", f, this);
				if (CKEDITOR.env.gecko && CKEDITOR.env.mac) a.on("keypress", b, this)
			}
		}
	}(), function() {
		CKEDITOR.lang = {
			languages: {
				af: 1,
				ar: 1,
				az: 1,
				bg: 1,
				bn: 1,
				bs: 1,
				ca: 1,
				cs: 1,
				cy: 1,
				da: 1,
				de: 1,
				"de-ch": 1,
				el: 1,
				"en-au": 1,
				"en-ca": 1,
				"en-gb": 1,
				en: 1,
				eo: 1,
				es: 1,
				et: 1,
				eu: 1,
				fa: 1,
				fi: 1,
				fo: 1,
				"fr-ca": 1,
				fr: 1,
				gl: 1,
				gu: 1,
				he: 1,
				hi: 1,
				hr: 1,
				hu: 1,
				id: 1,
				is: 1,
				it: 1,
				ja: 1,
				ka: 1,
				km: 1,
				ko: 1,
				ku: 1,
				lt: 1,
				lv: 1,
				mk: 1,
				mn: 1,
				ms: 1,
				nb: 1,
				nl: 1,
				no: 1,
				oc: 1,
				pl: 1,
				"pt-br": 1,
				pt: 1,
				ro: 1,
				ru: 1,
				si: 1,
				sk: 1,
				sl: 1,
				sq: 1,
				"sr-latn": 1,
				sr: 1,
				sv: 1,
				th: 1,
				tr: 1,
				tt: 1,
				ug: 1,
				uk: 1,
				vi: 1,
				"zh-cn": 1,
				zh: 1
			},
			rtl: {
				ar: 1,
				fa: 1,
				he: 1,
				ku: 1,
				ug: 1
			},
			load: function(a, f, b) {
				a && CKEDITOR.lang.languages[a] || (a = this.detect(f, a));
				var c = this;
				f = function() {
					c[a].dir = c.rtl[a] ? "rtl" : "ltr";
					b(a, c[a])
				};
				this[a] ? f() : CKEDITOR.scriptLoader.load(CKEDITOR.getUrl("lang/" + a + ".js"), f, this)
			},
			detect: function(a, f) {
				var b = this.languages;
				f = f || navigator.userLanguage || navigator.language || a;
				var c = f.toLowerCase().match(/([a-z]+)(?:-([a-z]+))?/),
					e = c[1],
					c = c[2];
				b[e + "-" + c] ? e = e + "-" + c : b[e] || (e = null);
				CKEDITOR.lang.detect = e ? function() {
					return e
				} : function(a) {
					return a
				};
				return e || a
			}
		}
	}(), CKEDITOR.scriptLoader = function() {
		var a = {},
			f = {};
		return {
			load: function(b, c, e, l) {
				var k = "string" == typeof b;
				k && (b = [b]);
				e || (e = CKEDITOR);
				var d = b.length,
					h = [],
					m = [],
					g = function(a) {
						c && (k ? c.call(e, a) : c.call(e, h, m))
					};
				if (0 === d) g(!0);
				else {
					var n = function(a, b) {
							(b ? h : m).push(a);
							0 >= --d && (l && CKEDITOR.document.getDocumentElement().removeStyle("cursor"), g(b))
						},
						p = function(b, c) {
							a[b] = 1;
							var d = f[b];
							delete f[b];
							for (var e = 0; e < d.length; e++) d[e](b, c)
						},
						r = function(b) {
							if (a[b]) n(b, !0);
							else {
								var d = f[b] || (f[b] = []);
								d.push(n);
								if (!(1 < d.length)) {
									var e = new CKEDITOR.dom.element("script");
									e.setAttributes({
										type: "text/javascript",
										src: b
									});
									c && (CKEDITOR.env.ie && (8 >= CKEDITOR.env.version || CKEDITOR.env.ie9Compat) ? e.$.onreadystatechange = function() {
										if ("loaded" == e.$.readyState || "complete" == e.$.readyState) e.$.onreadystatechange = null, p(b, !0)
									} : (e.$.onload = function() {
										setTimeout(function() {
											p(b, !0)
										}, 0)
									}, e.$.onerror = function() {
										p(b, !1)
									}));
									e.appendTo(CKEDITOR.document.getHead())
								}
							}
						};
					l && CKEDITOR.document.getDocumentElement().setStyle("cursor", "wait");
					for (var x = 0; x < d; x++) r(b[x])
				}
			},
			queue: function() {
				function a() {
					var b;
					(b = c[0]) && this.load(b.scriptUrl, b.callback, CKEDITOR, 0)
				}
				var c = [];
				return function(e, f) {
					var k = this;
					c.push({
						scriptUrl: e,
						callback: function() {
							f && f.apply(this, arguments);
							c.shift();
							a.call(k)
						}
					});
					1 == c.length && a.call(this)
				}
			}()
		}
	}(), CKEDITOR.resourceManager = function(a, f) {
		this.basePath = a;
		this.fileName = f;
		this.registered = {};
		this.loaded = {};
		this.externals = {};
		this._ = {
			waitingList: {}
		}
	}, CKEDITOR.resourceManager.prototype = {
		add: function(a, f) {
			if (this.registered[a]) throw Error('[CKEDITOR.resourceManager.add] The resource name "' + a + '" is already registered.');
			var b = this.registered[a] = f || {};
			b.name = a;
			b.path = this.getPath(a);
			CKEDITOR.fire(a + CKEDITOR.tools.capitalize(this.fileName) + "Ready", b);
			return this.get(a)
		},
		get: function(a) {
			return this.registered[a] || null
		},
		getPath: function(a) {
			var f = this.externals[a];
			return CKEDITOR.getUrl(f && f.dir || this.basePath + a + "/")
		},
		getFilePath: function(a) {
			var f = this.externals[a];
			return CKEDITOR.getUrl(this.getPath(a) + (f ? f.file : this.fileName + ".js"))
		},
		addExternal: function(a, f, b) {
			a = a.split(",");
			for (var c = 0; c < a.length; c++) {
				var e = a[c];
				b || (f = f.replace(/[^\/]+$/, function(a) {
					b = a;
					return ""
				}));
				this.externals[e] = {
					dir: f,
					file: b || this.fileName + ".js"
				}
			}
		},
		load: function(a, f, b) {
			CKEDITOR.tools.isArray(a) || (a = a ? [a] : []);
			for (var c = this.loaded, e = this.registered, l = [], k = {}, d = {}, h = 0; h < a.length; h++) {
				var m = a[h];
				if (m)
					if (c[m] || e[m]) d[m] = this.get(m);
					else {
						var g = this.getFilePath(m);
						l.push(g);
						g in k || (k[g] = []);
						k[g].push(m)
					}
			}
			CKEDITOR.scriptLoader.load(l, function(a, e) {
				if (e.length) throw Error('[CKEDITOR.resourceManager.load] Resource name "' + k[e[0]].join(",") + '" was not found at "' + e[0] + '".');
				for (var g = 0; g < a.length; g++)
					for (var h = k[a[g]],
							m = 0; m < h.length; m++) {
						var l = h[m];
						d[l] = this.get(l);
						c[l] = 1
					}
				f.call(b, d)
			}, this)
		}
	}, CKEDITOR.plugins = new CKEDITOR.resourceManager("plugins/", "plugin"), CKEDITOR.plugins.load = CKEDITOR.tools.override(CKEDITOR.plugins.load, function(a) {
		var f = {};
		return function(b, c, e) {
			var l = {},
				k = function(b) {
					a.call(this, b, function(a) {
						CKEDITOR.tools.extend(l, a);
						var b = [],
							d;
						for (d in a) {
							var n = a[d],
								p = n && n.requires;
							if (!f[d]) {
								if (n.icons)
									for (var r = n.icons.split(","), x = r.length; x--;) CKEDITOR.skin.addIcon(r[x], n.path + "icons/" + (CKEDITOR.env.hidpi && n.hidpi ? "hidpi/" : "") + r[x] + ".png");
								f[d] = 1
							}
							if (p)
								for (p.split && (p = p.split(",")), n = 0; n < p.length; n++) l[p[n]] || b.push(p[n])
						}
						if (b.length) k.call(this, b);
						else {
							for (d in l) n = l[d], n.onLoad && !n.onLoad._called && (!1 === n.onLoad() && delete l[d], n.onLoad._called = 1);
							c && c.call(e || window, l)
						}
					}, this)
				};
			k.call(this, b)
		}
	}), CKEDITOR.plugins.setLang = function(a, f, b) {
		var c = this.get(a);
		a = c.langEntries || (c.langEntries = {});
		c = c.lang || (c.lang = []);
		c.split && (c = c.split(",")); - 1 == CKEDITOR.tools.indexOf(c, f) && c.push(f);
		a[f] = b
	}, CKEDITOR.ui = function(a) {
		if (a.ui) return a.ui;
		this.items = {};
		this.instances = {};
		this.editor = a;
		this._ = {
			handlers: {}
		};
		return this
	}, CKEDITOR.ui.prototype = {
		add: function(a, f, b) {
			b.name = a.toLowerCase();
			var c = this.items[a] = {
				type: f,
				command: b.command || null,
				args: Array.prototype.slice.call(arguments, 2)
			};
			CKEDITOR.tools.extend(c, b)
		},
		get: function(a) {
			return this.instances[a]
		},
		create: function(a) {
			var f = this.items[a],
				b = f && this._.handlers[f.type],
				c = f && f.command && this.editor.getCommand(f.command),
				b = b && b.create.apply(this, f.args);
			this.instances[a] = b;
			c && c.uiItems.push(b);
			b && !b.type && (b.type = f.type);
			return b
		},
		addHandler: function(a, f) {
			this._.handlers[a] = f
		},
		space: function(a) {
			return CKEDITOR.document.getById(this.spaceId(a))
		},
		spaceId: function(a) {
			return this.editor.id + "_" + a
		}
	}, CKEDITOR.event.implementOn(CKEDITOR.ui), function() {
		function a(a, e, g) {
			CKEDITOR.event.call(this);
			a = a && CKEDITOR.tools.clone(a);
			if (void 0 !== e) {
				if (!(e instanceof CKEDITOR.dom.element)) throw Error("Expect element of type CKEDITOR.dom.element.");
				if (!g) throw Error("One of the element modes must be specified.");
				if (CKEDITOR.env.ie && CKEDITOR.env.quirks && g == CKEDITOR.ELEMENT_MODE_INLINE) throw Error("Inline element mode is not supported on IE quirks.");
				if (!b(e, g)) throw Error('The specified element mode is not supported on element: "' + e.getName() + '".');
				this.element = e;
				this.elementMode = g;
				this.name = this.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO && (e.getId() || e.getNameAtt())
			} else this.elementMode = CKEDITOR.ELEMENT_MODE_NONE;
			this._ = {};
			this.commands = {};
			this.templates = {};
			this.name = this.name || f();
			this.id = CKEDITOR.tools.getNextId();
			this.status = "unloaded";
			this.config = CKEDITOR.tools.prototypedCopy(CKEDITOR.config);
			this.ui = new CKEDITOR.ui(this);
			this.focusManager = new CKEDITOR.focusManager(this);
			this.keystrokeHandler = new CKEDITOR.keystrokeHandler(this);
			this.on("readOnly", c);
			this.on("selectionChange", function(a) {
				l(this, a.data.path)
			});
			this.on("activeFilterChange", function() {
				l(this, this.elementPath(), !0)
			});
			this.on("mode", c);
			this.on("instanceReady", function() {
				this.config.startupFocus && this.focus()
			});
			CKEDITOR.fire("instanceCreated", null, this);
			CKEDITOR.add(this);
			CKEDITOR.tools.setTimeout(function() {
				"destroyed" !== this.status ? d(this, a) : CKEDITOR.warn("editor-incorrect-destroy")
			}, 0, this)
		}

		function f() {
			do var a = "editor" + ++x; while (CKEDITOR.instances[a]);
			return a
		}

		function b(a, b) {
			return b == CKEDITOR.ELEMENT_MODE_INLINE ? a.is(CKEDITOR.dtd.$editable) || a.is("textarea") : b == CKEDITOR.ELEMENT_MODE_REPLACE ? !a.is(CKEDITOR.dtd.$nonBodyContent) : 1
		}

		function c() {
			var a = this.commands,
				b;
			for (b in a) e(this, a[b])
		}

		function e(a, b) {
			b[b.startDisabled ? "disable" : a.readOnly && !b.readOnly ? "disable" : b.modes[a.mode] ? "enable" : "disable"]()
		}

		function l(a, b, c) {
			if (b) {
				var d, e, g = a.commands;
				for (e in g) d = g[e], (c || d.contextSensitive) && d.refresh(a, b)
			}
		}

		function k(a) {
			var b = a.config.customConfig;
			if (!b) return !1;
			var b = CKEDITOR.getUrl(b),
				c = v[b] || (v[b] = {});
			c.fn ? (c.fn.call(a, a.config), CKEDITOR.getUrl(a.config.customConfig) != b && k(a) || a.fireOnce("customConfigLoaded")) : CKEDITOR.scriptLoader.queue(b, function() {
				c.fn = CKEDITOR.editorConfig ? CKEDITOR.editorConfig : function() {};
				k(a)
			});
			return !0
		}

		function d(a, b) {
			a.on("customConfigLoaded", function() {
				if (b) {
					if (b.on)
						for (var c in b.on) a.on(c, b.on[c]);
					CKEDITOR.tools.extend(a.config, b, !0);
					delete a.config.on
				}
				c = a.config;
				a.readOnly = c.readOnly ? !0 : a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? a.element.is("textarea") ? a.element.hasAttribute("disabled") || a.element.hasAttribute("readonly") : a.element.isReadOnly() : a.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE ? a.element.hasAttribute("disabled") || a.element.hasAttribute("readonly") : !1;
				a.blockless = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? !(a.element.is("textarea") || CKEDITOR.dtd[a.element.getName()].p) : !1;
				a.tabIndex = c.tabIndex || a.element && a.element.getAttribute("tabindex") || 0;
				a.activeEnterMode = a.enterMode = a.blockless ? CKEDITOR.ENTER_BR : c.enterMode;
				a.activeShiftEnterMode = a.shiftEnterMode = a.blockless ? CKEDITOR.ENTER_BR : c.shiftEnterMode;
				c.skin && (CKEDITOR.skinName = c.skin);
				a.fireOnce("configLoaded");
				a.dataProcessor = new CKEDITOR.htmlDataProcessor(a);
				a.filter = a.activeFilter = new CKEDITOR.filter(a);
				h(a)
			});
			b && null != b.customConfig && (a.config.customConfig = b.customConfig);
			k(a) || a.fireOnce("customConfigLoaded")
		}

		function h(a) {
			CKEDITOR.skin.loadPart("editor", function() {
				m(a)
			})
		}

		function m(a) {
			CKEDITOR.lang.load(a.config.language, a.config.defaultLanguage, function(b, c) {
				var d = a.config.title;
				a.langCode = b;
				a.lang = CKEDITOR.tools.prototypedCopy(c);
				a.title = "string" == typeof d || !1 === d ? d : [a.lang.editor, a.name].join(", ");
				a.config.contentsLangDirection || (a.config.contentsLangDirection = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? a.element.getDirection(1) : a.lang.dir);
				a.fire("langLoaded");
				g(a)
			})
		}

		function g(a) {
			a.getStylesSet(function(b) {
				a.once("loaded", function() {
					a.fire("stylesSet", {
						styles: b
					})
				}, null, null, 1);
				n(a)
			})
		}

		function n(a) {
			var b = a.config,
				c = b.plugins,
				d = b.extraPlugins,
				e = b.removePlugins;
			if (d) var g = new RegExp("(?:^|,)(?:" + d.replace(/\s*,\s*/g, "|") + ")(?\x3d,|$)", "g"),
				c = c.replace(g, ""),
				c = c + ("," + d);
			if (e) var f = new RegExp("(?:^|,)(?:" + e.replace(/\s*,\s*/g, "|") + ")(?\x3d,|$)", "g"),
				c = c.replace(f, "");
			CKEDITOR.env.air && (c += ",adobeair");
			CKEDITOR.plugins.load(c.split(","), function(c) {
				var d = [],
					e = [],
					g = [];
				a.plugins = c;
				for (var h in c) {
					var q = c[h],
						m = q.lang,
						l = null,
						k = q.requires,
						w;
					CKEDITOR.tools.isArray(k) && (k = k.join(","));
					if (k && (w = k.match(f)))
						for (; k = w.pop();) CKEDITOR.error("editor-plugin-required", {
							plugin: k.replace(",", ""),
							requiredBy: h
						});
					m && !a.lang[h] && (m.split && (m = m.split(",")), 0 <= CKEDITOR.tools.indexOf(m, a.langCode) ? l = a.langCode : (l = a.langCode.replace(/-.*/, ""), l = l != a.langCode && 0 <= CKEDITOR.tools.indexOf(m, l) ? l : 0 <= CKEDITOR.tools.indexOf(m, "en") ? "en" : m[0]), q.langEntries && q.langEntries[l] ? (a.lang[h] = q.langEntries[l], l = null) : g.push(CKEDITOR.getUrl(q.path + "lang/" + l + ".js")));
					e.push(l);
					d.push(q)
				}
				CKEDITOR.scriptLoader.load(g, function() {
					for (var c = ["beforeInit", "init", "afterInit"], g = 0; g < c.length; g++)
						for (var f = 0; f < d.length; f++) {
							var h = d[f];
							0 === g && e[f] && h.lang && h.langEntries && (a.lang[h.name] = h.langEntries[e[f]]);
							if (h[c[g]]) h[c[g]](a)
						}
					a.fireOnce("pluginsLoaded");
					b.keystrokes && a.setKeystroke(a.config.keystrokes);
					for (f = 0; f < a.config.blockedKeystrokes.length; f++) a.keystrokeHandler.blockedKeystrokes[a.config.blockedKeystrokes[f]] = 1;
					a.status = "loaded";
					a.fireOnce("loaded");
					CKEDITOR.fire("instanceLoaded", null, a)
				})
			})
		}

		function p() {
			var a = this.element;
			if (a && this.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO) {
				var b = this.getData();
				this.config.htmlEncodeOutput && (b = CKEDITOR.tools.htmlEncode(b));
				a.is("textarea") ? a.setValue(b) : a.setHtml(b);
				return !0
			}
			return !1
		}

		function r(a, b) {
			function c(a) {
				var b = a.startContainer,
					d = a.endContainer;
				return b.is && (b.is("tr") || b.is("td") && b.equals(d) && a.endOffset === b.getChildCount()) ? !0 : !1
			}

			function d(a) {
				var b = a.startContainer;
				return b.is("tr") ? a.cloneContents() : b.clone(!0)
			}
			for (var e = new CKEDITOR.dom.documentFragment, g, f, h, m = 0; m < a.length; m++) {
				var l = a[m],
					k = l.startContainer.getAscendant("tr", !0);
				c(l) ? (g || (g = k.getAscendant("table").clone(), g.append(k.getAscendant({
					thead: 1,
					tbody: 1,
					tfoot: 1
				}).clone()), e.append(g), g = g.findOne("thead, tbody, tfoot")), f && f.equals(k) || (f = k, h = k.clone(), g.append(h)), h.append(d(l))) : e.append(l.cloneContents())
			}
			return g ? e : b.getHtmlFromRange(a[0])
		}
		a.prototype = CKEDITOR.editor.prototype;
		CKEDITOR.editor = a;
		var x = 0,
			v = {};
		CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
			addCommand: function(a, b) {
				b.name = a.toLowerCase();
				var c = new CKEDITOR.command(this, b);
				this.mode && e(this, c);
				return this.commands[a] = c
			},
			_attachToForm: function() {
				function a(b) {
					c.updateElement();
					c._.required && !d.getValue() && !1 === c.fire("required") && b.data.preventDefault()
				}

				function b(a) {
					return !!(a && a.call && a.apply)
				}
				var c = this,
					d = c.element,
					e = new CKEDITOR.dom.element(d.$.form);
				d.is("textarea") && e && (e.on("submit", a), b(e.$.submit) && (e.$.submit = CKEDITOR.tools.override(e.$.submit, function(b) {
					return function() {
						a();
						b.apply ? b.apply(this) : b()
					}
				})), c.on("destroy", function() {
					e.removeListener("submit", a)
				}))
			},
			destroy: function(a) {
				this.fire("beforeDestroy");
				!a && p.call(this);
				this.editable(null);
				this.filter && (this.filter.destroy(), delete this.filter);
				delete this.activeFilter;
				this.status = "destroyed";
				this.fire("destroy");
				this.removeAllListeners();
				CKEDITOR.remove(this);
				CKEDITOR.fire("instanceDestroyed", null, this)
			},
			elementPath: function(a) {
				if (!a) {
					a = this.getSelection();
					if (!a) return null;
					a = a.getStartElement()
				}
				return a ? new CKEDITOR.dom.elementPath(a, this.editable()) : null
			},
			createRange: function() {
				var a = this.editable();
				return a ? new CKEDITOR.dom.range(a) : null
			},
			execCommand: function(a, b) {
				var c = this.getCommand(a),
					d = {
						name: a,
						commandData: b || {},
						command: c
					};
				return c && c.state != CKEDITOR.TRISTATE_DISABLED && !1 !== this.fire("beforeCommandExec", d) && (d.returnValue = c.exec(d.commandData), !c.async && !1 !== this.fire("afterCommandExec", d)) ? d.returnValue : !1
			},
			getCommand: function(a) {
				return this.commands[a]
			},
			getData: function(a) {
				!a && this.fire("beforeGetData");
				var b = this._.data;
				"string" != typeof b && (b = (b = this.element) && this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE ? b.is("textarea") ? b.getValue() : b.getHtml() : "");
				b = {
					dataValue: b
				};
				!a && this.fire("getData", b);
				return b.dataValue
			},
			getSnapshot: function() {
				var a = this.fire("getSnapshot");
				"string" != typeof a && (a = (a = this.element) && this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE ? a.is("textarea") ? a.getValue() : a.getHtml() : "");
				return a
			},
			loadSnapshot: function(a) {
				this.fire("loadSnapshot", a)
			},
			setData: function(a, b, c) {
				var d = !0,
					e = b;
				b && "object" == typeof b && (c = b.internal, e = b.callback, d = !b.noSnapshot);
				!c && d && this.fire("saveSnapshot");
				if (e || !c) this.once("dataReady", function(a) {
					!c && d && this.fire("saveSnapshot");
					e && e.call(a.editor)
				});
				a = {
					dataValue: a
				};
				!c && this.fire("setData", a);
				this._.data = a.dataValue;
				!c && this.fire("afterSetData", a)
			},
			setReadOnly: function(a) {
				a = null == a || a;
				this.readOnly != a && (this.readOnly = a, this.keystrokeHandler.blockedKeystrokes[8] = +a, this.editable().setReadOnly(a), this.fire("readOnly"))
			},
			insertHtml: function(a, b, c) {
				this.fire("insertHtml", {
					dataValue: a,
					mode: b,
					range: c
				})
			},
			insertText: function(a) {
				this.fire("insertText", a)
			},
			insertElement: function(a) {
				this.fire("insertElement", a)
			},
			getSelectedHtml: function(a) {
				var b = this.editable(),
					c = this.getSelection(),
					c = c && c.getRanges();
				if (!b || !c || 0 === c.length) return null;
				b = r(c, b);
				return a ? b.getHtml() : b
			},
			extractSelectedHtml: function(a, b) {
				var c = this.editable(),
					d = this.getSelection().getRanges(),
					e = new CKEDITOR.dom.documentFragment,
					g;
				if (!c || 0 === d.length) return null;
				for (g = 0; g < d.length; g++) e.append(c.extractHtmlFromRange(d[g], b));
				b || this.getSelection().selectRanges([d[0]]);
				return a ? e.getHtml() : e
			},
			focus: function() {
				this.fire("beforeFocus")
			},
			checkDirty: function() {
				return "ready" == this.status && this._.previousValue !== this.getSnapshot()
			},
			resetDirty: function() {
				this._.previousValue = this.getSnapshot()
			},
			updateElement: function() {
				return p.call(this)
			},
			setKeystroke: function() {
				for (var a = this.keystrokeHandler.keystrokes, b = CKEDITOR.tools.isArray(arguments[0]) ? arguments[0] : [
						[].slice.call(arguments, 0)
					], c, d, e = b.length; e--;) c = b[e], d = 0, CKEDITOR.tools.isArray(c) && (d = c[1], c = c[0]), d ? a[c] = d : delete a[c]
			},
			getCommandKeystroke: function(a) {
				if (a = "string" === typeof a ? this.getCommand(a) : a) {
					var b = a && a.name,
						c = this.keystrokeHandler.keystrokes,
						d;
					if (a.fakeKeystroke) return a.fakeKeystroke;
					for (d in c)
						if (c.hasOwnProperty(d) && c[d] == b) return d
				}
				return null
			},
			addFeature: function(a) {
				return this.filter.addFeature(a)
			},
			setActiveFilter: function(a) {
				a || (a = this.filter);
				this.activeFilter !== a && (this.activeFilter = a, this.fire("activeFilterChange"), a === this.filter ? this.setActiveEnterMode(null, null) : this.setActiveEnterMode(a.getAllowedEnterMode(this.enterMode), a.getAllowedEnterMode(this.shiftEnterMode, !0)))
			},
			setActiveEnterMode: function(a, b) {
				a = a ? this.blockless ? CKEDITOR.ENTER_BR : a : this.enterMode;
				b = b ? this.blockless ? CKEDITOR.ENTER_BR : b : this.shiftEnterMode;
				if (this.activeEnterMode != a || this.activeShiftEnterMode != b) this.activeEnterMode = a, this.activeShiftEnterMode = b, this.fire("activeEnterModeChange")
			},
			showNotification: function(a) {
				alert(a)
			}
		})
	}(), CKEDITOR.ELEMENT_MODE_NONE = 0, CKEDITOR.ELEMENT_MODE_REPLACE = 1, CKEDITOR.ELEMENT_MODE_APPENDTO = 2, CKEDITOR.ELEMENT_MODE_INLINE = 3, CKEDITOR.htmlParser = function() {
		this._ = {
			htmlPartsRegex: /<(?:(?:\/([^>]+)>)|(?:!--([\S|\s]*?)--\x3e)|(?:([^\/\s>]+)((?:\s+[\w\-:.]+(?:\s*=\s*?(?:(?:"[^"]*")|(?:'[^']*')|[^\s"'\/>]+))?)*)[\S\s]*?(\/?)>))/g
		}
	}, function() {
		var a = /([\w\-:.]+)(?:(?:\s*=\s*(?:(?:"([^"]*)")|(?:'([^']*)')|([^\s>]+)))|(?=\s|$))/g,
			f = {
				checked: 1,
				compact: 1,
				declare: 1,
				defer: 1,
				disabled: 1,
				ismap: 1,
				multiple: 1,
				nohref: 1,
				noresize: 1,
				noshade: 1,
				nowrap: 1,
				readonly: 1,
				selected: 1
			};
		CKEDITOR.htmlParser.prototype = {
			onTagOpen: function() {},
			onTagClose: function() {},
			onText: function() {},
			onCDATA: function() {},
			onComment: function() {},
			parse: function(b) {
				for (var c, e, l = 0, k; c = this._.htmlPartsRegex.exec(b);) {
					e = c.index;
					if (e > l)
						if (l = b.substring(l, e), k) k.push(l);
						else this.onText(l);
					l = this._.htmlPartsRegex.lastIndex;
					if (e = c[1])
						if (e = e.toLowerCase(), k && CKEDITOR.dtd.$cdata[e] && (this.onCDATA(k.join("")), k = null), !k) {
							this.onTagClose(e);
							continue
						}
					if (k) k.push(c[0]);
					else if (e = c[3]) {
						if (e = e.toLowerCase(), !/="/.test(e)) {
							var d = {},
								h, m = c[4];
							c = !!c[5];
							if (m)
								for (; h = a.exec(m);) {
									var g = h[1].toLowerCase();
									h = h[2] || h[3] || h[4] || "";
									d[g] = !h && f[g] ? g : CKEDITOR.tools.htmlDecodeAttr(h)
								}
							this.onTagOpen(e, d, c);
							!k && CKEDITOR.dtd.$cdata[e] && (k = [])
						}
					} else if (e = c[2]) this.onComment(e)
				}
				if (b.length > l) this.onText(b.substring(l, b.length))
			}
		}
	}(), CKEDITOR.htmlParser.basicWriter = CKEDITOR.tools.createClass({
		$: function() {
			this._ = {
				output: []
			}
		},
		proto: {
			openTag: function(a) {
				this._.output.push("\x3c", a)
			},
			openTagClose: function(a, f) {
				f ? this._.output.push(" /\x3e") : this._.output.push("\x3e")
			},
			attribute: function(a, f) {
				"string" == typeof f && (f = CKEDITOR.tools.htmlEncodeAttr(f));
				this._.output.push(" ", a, '\x3d"', f, '"')
			},
			closeTag: function(a) {
				this._.output.push("\x3c/", a, "\x3e")
			},
			text: function(a) {
				this._.output.push(a)
			},
			comment: function(a) {
				this._.output.push("\x3c!--", a, "--\x3e")
			},
			write: function(a) {
				this._.output.push(a)
			},
			reset: function() {
				this._.output = [];
				this._.indent = !1
			},
			getHtml: function(a) {
				var f = this._.output.join("");
				a && this.reset();
				return f
			}
		}
	}), "use strict", function() {
		CKEDITOR.htmlParser.node = function() {};
		CKEDITOR.htmlParser.node.prototype = {
			remove: function() {
				var a = this.parent.children,
					f = CKEDITOR.tools.indexOf(a, this),
					b = this.previous,
					c = this.next;
				b && (b.next = c);
				c && (c.previous = b);
				a.splice(f, 1);
				this.parent = null
			},
			replaceWith: function(a) {
				var f = this.parent.children,
					b = CKEDITOR.tools.indexOf(f, this),
					c = a.previous = this.previous,
					e = a.next = this.next;
				c && (c.next = a);
				e && (e.previous = a);
				f[b] = a;
				a.parent = this.parent;
				this.parent = null
			},
			insertAfter: function(a) {
				var f = a.parent.children,
					b = CKEDITOR.tools.indexOf(f, a),
					c = a.next;
				f.splice(b + 1, 0, this);
				this.next = a.next;
				this.previous = a;
				a.next = this;
				c && (c.previous = this);
				this.parent = a.parent
			},
			insertBefore: function(a) {
				var f = a.parent.children,
					b = CKEDITOR.tools.indexOf(f, a);
				f.splice(b, 0, this);
				this.next = a;
				(this.previous = a.previous) && (a.previous.next = this);
				a.previous = this;
				this.parent = a.parent
			},
			getAscendant: function(a) {
				var f = "function" == typeof a ? a : "string" == typeof a ? function(b) {
						return b.name == a
					} : function(b) {
						return b.name in a
					},
					b = this.parent;
				for (; b && b.type == CKEDITOR.NODE_ELEMENT;) {
					if (f(b)) return b;
					b = b.parent
				}
				return null
			},
			wrapWith: function(a) {
				this.replaceWith(a);
				a.add(this);
				return a
			},
			getIndex: function() {
				return CKEDITOR.tools.indexOf(this.parent.children, this)
			},
			getFilterContext: function(a) {
				return a || {}
			}
		}
	}(), "use strict", CKEDITOR.htmlParser.comment = function(a) {
		this.value = a;
		this._ = {
			isBlockLike: !1
		}
	}, CKEDITOR.htmlParser.comment.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, {
		type: CKEDITOR.NODE_COMMENT,
		filter: function(a, f) {
			var b = this.value;
			if (!(b = a.onComment(f, b, this))) return this.remove(), !1;
			if ("string" != typeof b) return this.replaceWith(b), !1;
			this.value = b;
			return !0
		},
		writeHtml: function(a, f) {
			f && this.filter(f);
			a.comment(this.value)
		}
	}), "use strict", function() {
		CKEDITOR.htmlParser.text = function(a) {
			this.value = a;
			this._ = {
				isBlockLike: !1
			}
		};
		CKEDITOR.htmlParser.text.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, {
			type: CKEDITOR.NODE_TEXT,
			filter: function(a, f) {
				if (!(this.value = a.onText(f, this.value, this))) return this.remove(), !1
			},
			writeHtml: function(a, f) {
				f && this.filter(f);
				a.text(this.value)
			}
		})
	}(), "use strict", function() {
		CKEDITOR.htmlParser.cdata = function(a) {
			this.value = a
		};
		CKEDITOR.htmlParser.cdata.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, {
			type: CKEDITOR.NODE_TEXT,
			filter: function() {},
			writeHtml: function(a) {
				a.write(this.value)
			}
		})
	}(), "use strict", CKEDITOR.htmlParser.fragment = function() {
		this.children = [];
		this.parent = null;
		this._ = {
			isBlockLike: !0,
			hasInlineStarted: !1
		}
	}, function() {
		function a(a) {
			return a.attributes["data-cke-survive"] ? !1 : "a" == a.name && a.attributes.href || CKEDITOR.dtd.$removeEmpty[a.name]
		}
		var f = CKEDITOR.tools.extend({
				table: 1,
				ul: 1,
				ol: 1,
				dl: 1
			}, CKEDITOR.dtd.table, CKEDITOR.dtd.ul, CKEDITOR.dtd.ol, CKEDITOR.dtd.dl),
			b = {
				ol: 1,
				ul: 1
			},
			c = CKEDITOR.tools.extend({}, {
				html: 1
			}, CKEDITOR.dtd.html, CKEDITOR.dtd.body, CKEDITOR.dtd.head, {
				style: 1,
				script: 1
			}),
			e = {
				ul: "li",
				ol: "li",
				dl: "dd",
				table: "tbody",
				tbody: "tr",
				thead: "tr",
				tfoot: "tr",
				tr: "td"
			};
		CKEDITOR.htmlParser.fragment.fromHtml = function(l, k, d) {
			function h(a) {
				var b;
				if (0 < u.length)
					for (var c = 0; c < u.length; c++) {
						var d = u[c],
							e = d.name,
							g = CKEDITOR.dtd[e],
							f = y.name && CKEDITOR.dtd[y.name];
						f && !f[e] || a && g && !g[a] && CKEDITOR.dtd[a] ? e == y.name && (n(y, y.parent, 1), c--) : (b || (m(), b = 1), d = d.clone(), d.parent = y, y = d, u.splice(c, 1), c--)
					}
			}

			function m() {
				for (; t.length;) n(t.shift(), y)
			}

			function g(a) {
				if (a._.isBlockLike && "pre" != a.name && "textarea" != a.name) {
					var b = a.children.length,
						c = a.children[b - 1],
						d;
					c && c.type == CKEDITOR.NODE_TEXT && ((d = CKEDITOR.tools.rtrim(c.value)) ? c.value = d : a.children.length = b - 1)
				}
			}

			function n(b, c, e) {
				c = c || y || v;
				var f = y;
				void 0 === b.previous && (p(c, b) && (y = c, x.onTagOpen(d, {}), b.returnPoint = c = y), g(b), a(b) && !b.children.length || c.add(b), "pre" == b.name && (q = !1), "textarea" == b.name && (A = !1));
				b.returnPoint ? (y = b.returnPoint, delete b.returnPoint) : y = e ? c : f
			}

			function p(a, b) {
				if ((a == v || "body" == a.name) && d && (!a.name || CKEDITOR.dtd[a.name][d])) {
					var c, e;
					return (c = b.attributes && (e = b.attributes["data-cke-real-element-type"]) ? e : b.name) && c in CKEDITOR.dtd.$inline && !(c in CKEDITOR.dtd.head) && !b.isOrphan || b.type == CKEDITOR.NODE_TEXT
				}
			}

			function r(a, b) {
				return a in CKEDITOR.dtd.$listItem || a in CKEDITOR.dtd.$tableContent ? a == b || "dt" == a && "dd" == b || "dd" == a && "dt" == b : !1
			}
			var x = new CKEDITOR.htmlParser,
				v = k instanceof CKEDITOR.htmlParser.element ? k : "string" == typeof k ? new CKEDITOR.htmlParser.element(k) : new CKEDITOR.htmlParser.fragment,
				u = [],
				t = [],
				y = v,
				A = "textarea" == v.name,
				q = "pre" == v.name;
			x.onTagOpen = function(d, e, g, l) {
				e = new CKEDITOR.htmlParser.element(d, e);
				e.isUnknown && g && (e.isEmpty = !0);
				e.isOptionalClose = l;
				if (a(e)) u.push(e);
				else {
					if ("pre" == d) q = !0;
					else {
						if ("br" == d && q) {
							y.add(new CKEDITOR.htmlParser.text("\n"));
							return
						}
						"textarea" == d && (A = !0)
					}
					if ("br" == d) t.push(e);
					else {
						for (; !(l = (g = y.name) ? CKEDITOR.dtd[g] || (y._.isBlockLike ? CKEDITOR.dtd.div : CKEDITOR.dtd.span) : c, e.isUnknown || y.isUnknown || l[d]);)
							if (y.isOptionalClose) x.onTagClose(g);
							else if (d in b && g in b) g = y.children, (g = g[g.length - 1]) && "li" == g.name || n(g = new CKEDITOR.htmlParser.element("li"), y), !e.returnPoint && (e.returnPoint = y), y = g;
						else if (d in CKEDITOR.dtd.$listItem && !r(d, g)) x.onTagOpen("li" == d ? "ul" : "dl", {}, 0, 1);
						else if (g in f && !r(d, g)) !e.returnPoint && (e.returnPoint = y), y = y.parent;
						else if (g in CKEDITOR.dtd.$inline && u.unshift(y), y.parent) n(y, y.parent, 1);
						else {
							e.isOrphan = 1;
							break
						}
						h(d);
						m();
						e.parent = y;
						e.isEmpty ? n(e) : y = e
					}
				}
			};
			x.onTagClose = function(a) {
				for (var b = u.length - 1; 0 <= b; b--)
					if (a == u[b].name) {
						u.splice(b, 1);
						return
					}
				for (var c = [], e = [], g = y; g != v && g.name != a;) g._.isBlockLike || e.unshift(g), c.push(g), g = g.returnPoint || g.parent;
				if (g != v) {
					for (b = 0; b < c.length; b++) {
						var f = c[b];
						n(f, f.parent)
					}
					y = g;
					g._.isBlockLike && m();
					n(g, g.parent);
					g == y && (y = y.parent);
					u = u.concat(e)
				}
				"body" == a && (d = !1)
			};
			x.onText = function(a) {
				if (!(y._.hasInlineStarted && !t.length || q || A) && (a = CKEDITOR.tools.ltrim(a), 0 === a.length)) return;
				var b = y.name,
					g = b ? CKEDITOR.dtd[b] || (y._.isBlockLike ? CKEDITOR.dtd.div : CKEDITOR.dtd.span) : c;
				if (!A && !g["#"] && b in f) x.onTagOpen(e[b] || ""), x.onText(a);
				else {
					m();
					h();
					q || A || (a = a.replace(/[\t\r\n ]{2,}|[\t\r\n]/g, " "));
					a = new CKEDITOR.htmlParser.text(a);
					if (p(y, a)) this.onTagOpen(d, {}, 0, 1);
					y.add(a)
				}
			};
			x.onCDATA = function(a) {
				y.add(new CKEDITOR.htmlParser.cdata(a))
			};
			x.onComment = function(a) {
				m();
				h();
				y.add(new CKEDITOR.htmlParser.comment(a))
			};
			x.parse(l);
			for (m(); y != v;) n(y, y.parent, 1);
			g(v);
			return v
		};
		CKEDITOR.htmlParser.fragment.prototype = {
			type: CKEDITOR.NODE_DOCUMENT_FRAGMENT,
			add: function(a, b) {
				isNaN(b) && (b = this.children.length);
				var c = 0 < b ? this.children[b - 1] : null;
				if (c) {
					if (a._.isBlockLike && c.type == CKEDITOR.NODE_TEXT && (c.value = CKEDITOR.tools.rtrim(c.value), 0 === c.value.length)) {
						this.children.pop();
						this.add(a);
						return
					}
					c.next = a
				}
				a.previous = c;
				a.parent = this;
				this.children.splice(b, 0, a);
				this._.hasInlineStarted || (this._.hasInlineStarted = a.type == CKEDITOR.NODE_TEXT || a.type == CKEDITOR.NODE_ELEMENT && !a._.isBlockLike)
			},
			filter: function(a, b) {
				b = this.getFilterContext(b);
				a.onRoot(b, this);
				this.filterChildren(a, !1, b)
			},
			filterChildren: function(a, b, c) {
				if (this.childrenFilteredBy != a.id) {
					c = this.getFilterContext(c);
					if (b && !this.parent) a.onRoot(c, this);
					this.childrenFilteredBy = a.id;
					for (b = 0; b < this.children.length; b++) !1 === this.children[b].filter(a, c) && b--
				}
			},
			writeHtml: function(a, b) {
				b && this.filter(b);
				this.writeChildrenHtml(a)
			},
			writeChildrenHtml: function(a, b, c) {
				var e = this.getFilterContext();
				if (c && !this.parent && b) b.onRoot(e, this);
				b && this.filterChildren(b, !1, e);
				b = 0;
				c = this.children;
				for (e = c.length; b < e; b++) c[b].writeHtml(a)
			},
			forEach: function(a, b, c) {
				if (!(c || b && this.type != b)) var e = a(this);
				if (!1 !== e) {
					c = this.children;
					for (var f = 0; f < c.length; f++) e = c[f], e.type == CKEDITOR.NODE_ELEMENT ? e.forEach(a, b) : b && e.type != b || a(e)
				}
			},
			getFilterContext: function(a) {
				return a || {}
			}
		}
	}(), "use strict", function() {
		function a() {
			this.rules = []
		}

		function f(b, c, e, f) {
			var k, d;
			for (k in c)(d = b[k]) || (d = b[k] = new a), d.add(c[k], e, f)
		}
		CKEDITOR.htmlParser.filter = CKEDITOR.tools.createClass({
			$: function(b) {
				this.id = CKEDITOR.tools.getNextNumber();
				this.elementNameRules = new a;
				this.attributeNameRules = new a;
				this.elementsRules = {};
				this.attributesRules = {};
				this.textRules = new a;
				this.commentRules = new a;
				this.rootRules = new a;
				b && this.addRules(b, 10)
			},
			proto: {
				addRules: function(a, c) {
					var e;
					"number" == typeof c ? e = c : c && "priority" in c && (e = c.priority);
					"number" != typeof e && (e = 10);
					"object" != typeof c && (c = {});
					a.elementNames && this.elementNameRules.addMany(a.elementNames, e, c);
					a.attributeNames && this.attributeNameRules.addMany(a.attributeNames, e, c);
					a.elements && f(this.elementsRules, a.elements, e, c);
					a.attributes && f(this.attributesRules, a.attributes, e, c);
					a.text && this.textRules.add(a.text, e, c);
					a.comment && this.commentRules.add(a.comment, e, c);
					a.root && this.rootRules.add(a.root, e, c)
				},
				applyTo: function(a) {
					a.filter(this)
				},
				onElementName: function(a, c) {
					return this.elementNameRules.execOnName(a, c)
				},
				onAttributeName: function(a, c) {
					return this.attributeNameRules.execOnName(a, c)
				},
				onText: function(a, c, e) {
					return this.textRules.exec(a, c, e)
				},
				onComment: function(a, c, e) {
					return this.commentRules.exec(a, c, e)
				},
				onRoot: function(a, c) {
					return this.rootRules.exec(a, c)
				},
				onElement: function(a, c) {
					for (var e = [this.elementsRules["^"], this.elementsRules[c.name], this.elementsRules.$], f, k = 0; 3 > k; k++)
						if (f = e[k]) {
							f = f.exec(a, c, this);
							if (!1 === f) return null;
							if (f && f != c) return this.onNode(a, f);
							if (c.parent && !c.name) break
						}
					return c
				},
				onNode: function(a, c) {
					var e = c.type;
					return e == CKEDITOR.NODE_ELEMENT ? this.onElement(a, c) : e == CKEDITOR.NODE_TEXT ? new CKEDITOR.htmlParser.text(this.onText(a, c.value)) : e == CKEDITOR.NODE_COMMENT ? new CKEDITOR.htmlParser.comment(this.onComment(a, c.value)) : null
				},
				onAttribute: function(a, c, e, f) {
					return (e = this.attributesRules[e]) ? e.exec(a, f, c, this) : f
				}
			}
		});
		CKEDITOR.htmlParser.filterRulesGroup = a;
		a.prototype = {
			add: function(a, c, e) {
				this.rules.splice(this.findIndex(c), 0, {
					value: a,
					priority: c,
					options: e
				})
			},
			addMany: function(a, c, e) {
				for (var f = [this.findIndex(c), 0], k = 0, d = a.length; k < d; k++) f.push({
					value: a[k],
					priority: c,
					options: e
				});
				this.rules.splice.apply(this.rules, f)
			},
			findIndex: function(a) {
				for (var c = this.rules, e = c.length - 1; 0 <= e && a < c[e].priority;) e--;
				return e + 1
			},
			exec: function(a, c) {
				var e = c instanceof CKEDITOR.htmlParser.node || c instanceof CKEDITOR.htmlParser.fragment,
					f = Array.prototype.slice.call(arguments, 1),
					k = this.rules,
					d = k.length,
					h, m, g, n;
				for (n = 0; n < d; n++)
					if (e && (h = c.type, m = c.name), g = k[n], !(a.nonEditable && !g.options.applyToAll || a.nestedEditable && g.options.excludeNestedEditable)) {
						g = g.value.apply(null, f);
						if (!1 === g || e && g && (g.name != m || g.type != h)) return g;
						null != g && (f[0] = c = g)
					}
				return c
			},
			execOnName: function(a, c) {
				for (var e = 0, f = this.rules, k = f.length, d; c && e < k; e++) d = f[e], a.nonEditable && !d.options.applyToAll || a.nestedEditable && d.options.excludeNestedEditable || (c = c.replace(d.value[0], d.value[1]));
				return c
			}
		}
	}(), function() {
		function a(a, d) {
			function g(a) {
				return a || CKEDITOR.env.needsNbspFiller ? new CKEDITOR.htmlParser.text(" ") : new CKEDITOR.htmlParser.element("br", {
					"data-cke-bogus": 1
				})
			}

			function f(a, d) {
				return function(e) {
					if (e.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
						var f = [],
							q = b(e),
							m, k;
						if (q)
							for (h(q, 1) && f.push(q); q;) l(q) && (m = c(q)) && h(m) && ((k = c(m)) && !l(k) ? f.push(m) : (g(D).insertAfter(m), m.remove())), q = q.previous;
						for (q = 0; q < f.length; q++) f[q].remove();
						if (f = !a || !1 !== ("function" == typeof d ? d(e) : d)) D || CKEDITOR.env.needsBrFiller || e.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT ? D || CKEDITOR.env.needsBrFiller || !(7 < document.documentMode || e.name in CKEDITOR.dtd.tr || e.name in CKEDITOR.dtd.$listItem) ? (f = b(e), f = !f || "form" == e.name && "input" == f.name) : f = !1 : f = !1;
						f && e.add(g(a))
					}
				}
			}

			function h(a, b) {
				if ((!D || CKEDITOR.env.needsBrFiller) && a.type == CKEDITOR.NODE_ELEMENT && "br" == a.name && !a.attributes["data-cke-eol"]) return !0;
				var c;
				return a.type == CKEDITOR.NODE_TEXT && (c = a.value.match(u)) && (c.index && ((new CKEDITOR.htmlParser.text(a.value.substring(0, c.index))).insertBefore(a), a.value = c[0]), !CKEDITOR.env.needsBrFiller && D && (!b || a.parent.name in L) || !D && ((c = a.previous) && "br" == c.name || !c || l(c))) ? !0 : !1
			}
			var m = {
					elements: {}
				},
				D = "html" == d,
				L = CKEDITOR.tools.extend({}, q),
				w;
			for (w in L) "#" in y[w] || delete L[w];
			for (w in L) m.elements[w] = f(D, a.config.fillEmptyBlocks);
			m.root = f(D, !1);
			m.elements.br = function(a) {
				return function(b) {
					if (b.parent.type != CKEDITOR.NODE_DOCUMENT_FRAGMENT) {
						var d = b.attributes;
						if ("data-cke-bogus" in d || "data-cke-eol" in d) delete d["data-cke-bogus"];
						else {
							for (d = b.next; d && e(d);) d = d.next;
							var f = c(b);
							!d && l(b.parent) ? k(b.parent, g(a)) : l(d) && f && !l(f) && g(a).insertBefore(d)
						}
					}
				}
			}(D);
			return m
		}

		function f(a, b) {
			return a != CKEDITOR.ENTER_BR && !1 !== b ? a == CKEDITOR.ENTER_DIV ? "div" : "p" : !1
		}

		function b(a) {
			for (a = a.children[a.children.length - 1]; a && e(a);) a = a.previous;
			return a
		}

		function c(a) {
			for (a = a.previous; a && e(a);) a = a.previous;
			return a
		}

		function e(a) {
			return a.type == CKEDITOR.NODE_TEXT && !CKEDITOR.tools.trim(a.value) || a.type == CKEDITOR.NODE_ELEMENT && a.attributes["data-cke-bookmark"]
		}

		function l(a) {
			return a && (a.type == CKEDITOR.NODE_ELEMENT && a.name in q || a.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT)
		}

		function k(a, b) {
			var c = a.children[a.children.length - 1];
			a.children.push(b);
			b.parent = a;
			c && (c.next = b, b.previous = c)
		}

		function d(a) {
			a = a.attributes;
			"false" != a.contenteditable && (a["data-cke-editable"] = a.contenteditable ? "true" : 1);
			a.contenteditable = "false"
		}

		function h(a) {
			a = a.attributes;
			switch (a["data-cke-editable"]) {
				case "true":
					a.contenteditable = "true";
					break;
				case "1":
					delete a.contenteditable
			}
		}

		function m(a) {
			return a.replace(E, function(a, b, c) {
				return "\x3c" + b + c.replace(G, function(a, b) {
					return F.test(b) && -1 == c.indexOf("data-cke-saved-" + b) ? " data-cke-saved-" + a + " data-cke-" + CKEDITOR.rnd + "-" + a : a
				}) + "\x3e"
			})
		}

		function g(a, b) {
			return a.replace(b, function(a, b, c) {
				0 === a.indexOf("\x3ctextarea") && (a = b + r(c).replace(/</g, "\x26lt;").replace(/>/g, "\x26gt;") + "\x3c/textarea\x3e");
				return "\x3ccke:encoded\x3e" + encodeURIComponent(a) + "\x3c/cke:encoded\x3e"
			})
		}

		function n(a) {
			return a.replace(M, function(a, b) {
				return decodeURIComponent(b)
			})
		}

		function p(a) {
			return a.replace(/\x3c!--(?!{cke_protected})[\s\S]+?--\x3e/g, function(a) {
				return "\x3c!--" + t + "{C}" + encodeURIComponent(a).replace(/--/g, "%2D%2D") + "--\x3e"
			})
		}

		function r(a) {
			return a.replace(/\x3c!--\{cke_protected\}\{C\}([\s\S]+?)--\x3e/g, function(a, b) {
				return decodeURIComponent(b)
			})
		}

		function x(a, b) {
			var c = b._.dataStore;
			return a.replace(/\x3c!--\{cke_protected\}([\s\S]+?)--\x3e/g, function(a, b) {
				return decodeURIComponent(b)
			}).replace(/\{cke_protected_(\d+)\}/g, function(a, b) {
				return c && c[b] || ""
			})
		}

		function v(a, b) {
			var c = [],
				d = b.config.protectedSource,
				e = b._.dataStore || (b._.dataStore = {
					id: 1
				}),
				g = /<\!--\{cke_temp(comment)?\}(\d*?)--\x3e/g,
				d = [/<script[\s\S]*?(<\/script>|$)/gi, /<noscript[\s\S]*?<\/noscript>/gi, /<meta[\s\S]*?\/?>/gi].concat(d);
			a = a.replace(/\x3c!--[\s\S]*?--\x3e/g, function(a) {
				return "\x3c!--{cke_tempcomment}" + (c.push(a) - 1) + "--\x3e"
			});
			for (var f = 0; f < d.length; f++) a = a.replace(d[f], function(a) {
				a = a.replace(g, function(a, b, d) {
					return c[d]
				});
				return /cke_temp(comment)?/.test(a) ? a : "\x3c!--{cke_temp}" + (c.push(a) - 1) + "--\x3e"
			});
			a = a.replace(g, function(a, b, d) {
				return "\x3c!--" + t + (b ? "{C}" : "") + encodeURIComponent(c[d]).replace(/--/g, "%2D%2D") + "--\x3e"
			});
			a = a.replace(/<\w+(?:\s+(?:(?:[^\s=>]+\s*=\s*(?:[^'"\s>]+|'[^']*'|"[^"]*"))|[^\s=\/>]+))+\s*\/?>/g, function(a) {
				return a.replace(/\x3c!--\{cke_protected\}([^>]*)--\x3e/g, function(a, b) {
					e[e.id] = decodeURIComponent(b);
					return "{cke_protected_" + e.id++ + "}"
				})
			});
			return a = a.replace(/<(title|iframe|textarea)([^>]*)>([\s\S]*?)<\/\1>/g, function(a, c, d, e) {
				return "\x3c" + c + d + "\x3e" + x(r(e), b) + "\x3c/" + c + "\x3e"
			})
		}
		CKEDITOR.htmlDataProcessor = function(b) {
			var c, d, e = this;
			this.editor = b;
			this.dataFilter = c = new CKEDITOR.htmlParser.filter;
			this.htmlFilter = d = new CKEDITOR.htmlParser.filter;
			this.writer = new CKEDITOR.htmlParser.basicWriter;
			c.addRules(w);
			c.addRules(B, {
				applyToAll: !0
			});
			c.addRules(a(b, "data"), {
				applyToAll: !0
			});
			d.addRules(z);
			d.addRules(C, {
				applyToAll: !0
			});
			d.addRules(a(b, "html"), {
				applyToAll: !0
			});
			b.on("toHtml", function(a) {
				a = a.data;
				var c = a.dataValue,
					d, c = v(c, b),
					c = g(c, H),
					c = m(c),
					c = g(c, J),
					c = c.replace(L, "$1cke:$2"),
					c = c.replace(T, "\x3ccke:$1$2\x3e\x3c/cke:$1\x3e"),
					c = c.replace(/(<pre\b[^>]*>)(\r\n|\n)/g, "$1$2$2"),
					c = c.replace(/([^a-z0-9<\-])(on\w{3,})(?!>)/gi, "$1data-cke-" + CKEDITOR.rnd + "-$2");
				d = a.context || b.editable().getName();
				var e;
				CKEDITOR.env.ie && 9 > CKEDITOR.env.version && "pre" == d && (d = "div", c = "\x3cpre\x3e" + c + "\x3c/pre\x3e", e = 1);
				d = b.document.createElement(d);
				d.setHtml("a" + c);
				c = d.getHtml().substr(1);
				c = c.replace(new RegExp("data-cke-" + CKEDITOR.rnd + "-", "ig"), "");
				e && (c = c.replace(/^<pre>|<\/pre>$/gi, ""));
				c = c.replace(D, "$1$2");
				c = n(c);
				c = r(c);
				d = !1 === a.fixForBody ? !1 : f(a.enterMode, b.config.autoParagraph);
				c = CKEDITOR.htmlParser.fragment.fromHtml(c, a.context, d);
				d && (e = c, !e.children.length && CKEDITOR.dtd[e.name][d] && (d = new CKEDITOR.htmlParser.element(d), e.add(d)));
				a.dataValue = c
			}, null, null, 5);
			b.on("toHtml", function(a) {
				a.data.filter.applyTo(a.data.dataValue, !0, a.data.dontFilter, a.data.enterMode) && b.fire("dataFiltered")
			}, null, null, 6);
			b.on("toHtml", function(a) {
				a.data.dataValue.filterChildren(e.dataFilter, !0)
			}, null, null, 10);
			b.on("toHtml", function(a) {
				a = a.data;
				var b = a.dataValue,
					c = new CKEDITOR.htmlParser.basicWriter;
				b.writeChildrenHtml(c);
				b = c.getHtml(!0);
				a.dataValue = p(b)
			}, null, null, 15);
			b.on("toDataFormat", function(a) {
				var c = a.data.dataValue;
				a.data.enterMode != CKEDITOR.ENTER_BR && (c = c.replace(/^<br *\/?>/i, ""));
				a.data.dataValue = CKEDITOR.htmlParser.fragment.fromHtml(c, a.data.context, f(a.data.enterMode, b.config.autoParagraph))
			}, null, null, 5);
			b.on("toDataFormat", function(a) {
				a.data.dataValue.filterChildren(e.htmlFilter, !0)
			}, null, null, 10);
			b.on("toDataFormat", function(a) {
				a.data.filter.applyTo(a.data.dataValue, !1, !0)
			}, null, null, 11);
			b.on("toDataFormat", function(a) {
				var c = a.data.dataValue,
					d = e.writer;
				d.reset();
				c.writeChildrenHtml(d);
				c = d.getHtml(!0);
				c = r(c);
				c = x(c, b);
				a.data.dataValue = c
			}, null, null, 15)
		};
		CKEDITOR.htmlDataProcessor.prototype = {
			toHtml: function(a, b, c, d) {
				var e = this.editor,
					g, f, h, q;
				b && "object" == typeof b ? (g = b.context, c = b.fixForBody, d = b.dontFilter, f = b.filter, h = b.enterMode, q = b.protectedWhitespaces) : g = b;
				g || null === g || (g = e.editable().getName());
				return e.fire("toHtml", {
					dataValue: a,
					context: g,
					fixForBody: c,
					dontFilter: d,
					filter: f || e.filter,
					enterMode: h || e.enterMode,
					protectedWhitespaces: q
				}).dataValue
			},
			toDataFormat: function(a, b) {
				var c, d, e;
				b && (c = b.context, d = b.filter, e = b.enterMode);
				c || null === c || (c = this.editor.editable().getName());
				return this.editor.fire("toDataFormat", {
					dataValue: a,
					filter: d || this.editor.filter,
					context: c,
					enterMode: e || this.editor.enterMode
				}).dataValue
			}
		};
		var u = /(?:&nbsp;|\xa0)$/,
			t = "{cke_protected}",
			y = CKEDITOR.dtd,
			A = "caption colgroup col thead tfoot tbody".split(" "),
			q = CKEDITOR.tools.extend({}, y.$blockLimit, y.$block),
			w = {
				elements: {
					input: d,
					textarea: d
				}
			},
			B = {
				attributeNames: [
					[/^on/, "data-cke-pa-on"],
					[/^srcdoc/, "data-cke-pa-srcdoc"],
					[/^data-cke-expando$/, ""]
				],
				elements: {
					iframe: function(a) {
						if (a.attributes && a.attributes.src) {
							var b = a.attributes.src.toLowerCase().replace(/[^a-z]/gi, "");
							if (0 === b.indexOf("javascript") || 0 === b.indexOf("data")) a.attributes["data-cke-pa-src"] = a.attributes.src, delete a.attributes.src
						}
					}
				}
			},
			z = {
				elements: {
					embed: function(a) {
						var b = a.parent;
						if (b && "object" == b.name) {
							var c = b.attributes.width,
								b = b.attributes.height;
							c && (a.attributes.width = c);
							b && (a.attributes.height = b)
						}
					},
					a: function(a) {
						var b = a.attributes;
						if (!(a.children.length || b.name || b.id || a.attributes["data-cke-saved-name"])) return !1
					}
				}
			},
			C = {
				elementNames: [
					[/^cke:/, ""],
					[/^\?xml:namespace$/, ""]
				],
				attributeNames: [
					[/^data-cke-(saved|pa)-/, ""],
					[/^data-cke-.*/, ""],
					["hidefocus", ""]
				],
				elements: {
					$: function(a) {
						var b = a.attributes;
						if (b) {
							if (b["data-cke-temp"]) return !1;
							for (var c = ["name", "href", "src"], d, e = 0; e < c.length; e++) d = "data-cke-saved-" + c[e], d in b && delete b[c[e]]
						}
						return a
					},
					table: function(a) {
						a.children.slice(0).sort(function(a, b) {
							var c, d;
							a.type == CKEDITOR.NODE_ELEMENT && b.type == a.type && (c = CKEDITOR.tools.indexOf(A, a.name), d = CKEDITOR.tools.indexOf(A, b.name)); - 1 < c && -1 < d && c != d || (c = a.parent ? a.getIndex() : -1, d = b.parent ? b.getIndex() : -1);
							return c > d ? 1 : -1
						})
					},
					param: function(a) {
						a.children = [];
						a.isEmpty = !0;
						return a
					},
					span: function(a) {
						"Apple-style-span" == a.attributes["class"] && delete a.name
					},
					html: function(a) {
						delete a.attributes.contenteditable;
						delete a.attributes["class"]
					},
					body: function(a) {
						delete a.attributes.spellcheck;
						delete a.attributes.contenteditable
					},
					style: function(a) {
						var b = a.children[0];
						b && b.value && (b.value = CKEDITOR.tools.trim(b.value));
						a.attributes.type || (a.attributes.type = "text/css")
					},
					title: function(a) {
						var b = a.children[0];
						!b && k(a, b = new CKEDITOR.htmlParser.text);
						b.value = a.attributes["data-cke-title"] || ""
					},
					input: h,
					textarea: h
				},
				attributes: {
					"class": function(a) {
						return CKEDITOR.tools.ltrim(a.replace(/(?:^|\s+)cke_[^\s]*/g, "")) || !1
					}
				}
			};
		CKEDITOR.env.ie && (C.attributes.style = function(a) {
			return a.replace(/(^|;)([^\:]+)/g, function(a) {
				return a.toLowerCase()
			})
		});
		var E = /<(a|area|img|input|source)\b([^>]*)>/gi,
			G = /([\w-:]+)\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|(?:[^ "'>]+))/gi,
			F = /^(href|src|name)$/i,
			J = /(?:<style(?=[ >])[^>]*>[\s\S]*?<\/style>)|(?:<(:?link|meta|base)[^>]*>)/gi,
			H = /(<textarea(?=[ >])[^>]*>)([\s\S]*?)(?:<\/textarea>)/gi,
			M = /<cke:encoded>([^<]*)<\/cke:encoded>/gi,
			L = /(<\/?)((?:object|embed|param|html|body|head|title)[^>]*>)/gi,
			D = /(<\/?)cke:((?:html|body|head|title)[^>]*>)/gi,
			T = /<cke:(param|embed)([^>]*?)\/?>(?!\s*<\/cke:\1)/gi
	}(), "use strict", CKEDITOR.htmlParser.element = function(a, f) {
		this.name = a;
		this.attributes = f || {};
		this.children = [];
		var b = a || "",
			c = b.match(/^cke:(.*)/);
		c && (b = c[1]);
		b = !!(CKEDITOR.dtd.$nonBodyContent[b] || CKEDITOR.dtd.$block[b] || CKEDITOR.dtd.$listItem[b] || CKEDITOR.dtd.$tableContent[b] || CKEDITOR.dtd.$nonEditable[b] || "br" == b);
		this.isEmpty = !!CKEDITOR.dtd.$empty[a];
		this.isUnknown = !CKEDITOR.dtd[a];
		this._ = {
			isBlockLike: b,
			hasInlineStarted: this.isEmpty || !b
		}
	}, CKEDITOR.htmlParser.cssStyle = function(a) {
		var f = {};
		((a instanceof CKEDITOR.htmlParser.element ? a.attributes.style : a) || "").replace(/&quot;/g, '"').replace(/\s*([^ :;]+)\s*:\s*([^;]+)\s*(?=;|$)/g, function(a, c, e) {
			"font-family" == c && (e = e.replace(/["']/g, ""));
			f[c.toLowerCase()] = e
		});
		return {
			rules: f,
			populate: function(a) {
				var c = this.toString();
				c && (a instanceof CKEDITOR.dom.element ? a.setAttribute("style", c) : a instanceof CKEDITOR.htmlParser.element ? a.attributes.style = c : a.style = c)
			},
			toString: function() {
				var a = [],
					c;
				for (c in f) f[c] && a.push(c, ":", f[c], ";");
				return a.join("")
			}
		}
	}, function() {
		function a(a) {
			return function(b) {
				return b.type == CKEDITOR.NODE_ELEMENT && ("string" == typeof a ? b.name == a : b.name in a)
			}
		}
		var f = function(a, b) {
				a = a[0];
				b = b[0];
				return a < b ? -1 : a > b ? 1 : 0
			},
			b = CKEDITOR.htmlParser.fragment.prototype;
		CKEDITOR.htmlParser.element.prototype = CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node, {
			type: CKEDITOR.NODE_ELEMENT,
			add: b.add,
			clone: function() {
				return new CKEDITOR.htmlParser.element(this.name, this.attributes)
			},
			filter: function(a, b) {
				var f = this,
					k, d;
				b = f.getFilterContext(b);
				if (b.off) return !0;
				if (!f.parent) a.onRoot(b, f);
				for (;;) {
					k = f.name;
					if (!(d = a.onElementName(b, k))) return this.remove(), !1;
					f.name = d;
					if (!(f = a.onElement(b, f))) return this.remove(), !1;
					if (f !== this) return this.replaceWith(f), !1;
					if (f.name == k) break;
					if (f.type != CKEDITOR.NODE_ELEMENT) return this.replaceWith(f), !1;
					if (!f.name) return this.replaceWithChildren(), !1
				}
				k = f.attributes;
				var h, m;
				for (h in k) {
					for (d = k[h];;)
						if (m = a.onAttributeName(b, h))
							if (m != h) delete k[h], h = m;
							else break;
					else {
						delete k[h];
						break
					}
					m && (!1 === (d = a.onAttribute(b, f, m, d)) ? delete k[m] : k[m] = d)
				}
				f.isEmpty || this.filterChildren(a, !1, b);
				return !0
			},
			filterChildren: b.filterChildren,
			writeHtml: function(a, b) {
				b && this.filter(b);
				var l = this.name,
					k = [],
					d = this.attributes,
					h, m;
				a.openTag(l, d);
				for (h in d) k.push([h, d[h]]);
				a.sortAttributes && k.sort(f);
				h = 0;
				for (m = k.length; h < m; h++) d = k[h], a.attribute(d[0], d[1]);
				a.openTagClose(l, this.isEmpty);
				this.writeChildrenHtml(a);
				this.isEmpty || a.closeTag(l)
			},
			writeChildrenHtml: b.writeChildrenHtml,
			replaceWithChildren: function() {
				for (var a = this.children, b = a.length; b;) a[--b].insertAfter(this);
				this.remove()
			},
			forEach: b.forEach,
			getFirst: function(b) {
				if (!b) return this.children.length ? this.children[0] : null;
				"function" != typeof b && (b = a(b));
				for (var e = 0, f = this.children.length; e < f; ++e)
					if (b(this.children[e])) return this.children[e];
				return null
			},
			getHtml: function() {
				var a = new CKEDITOR.htmlParser.basicWriter;
				this.writeChildrenHtml(a);
				return a.getHtml()
			},
			setHtml: function(a) {
				a = this.children = CKEDITOR.htmlParser.fragment.fromHtml(a).children;
				for (var b = 0, f = a.length; b < f; ++b) a[b].parent = this
			},
			getOuterHtml: function() {
				var a = new CKEDITOR.htmlParser.basicWriter;
				this.writeHtml(a);
				return a.getHtml()
			},
			split: function(a) {
				for (var b = this.children.splice(a, this.children.length - a), f = this.clone(), k = 0; k < b.length; ++k) b[k].parent = f;
				f.children = b;
				b[0] && (b[0].previous = null);
				0 < a && (this.children[a - 1].next = null);
				this.parent.add(f, this.getIndex() + 1);
				return f
			},
			find: function(a, b) {
				void 0 === b && (b = !1);
				var f = [],
					k;
				for (k = 0; k < this.children.length; k++) {
					var d = this.children[k];
					"function" == typeof a && a(d) ? f.push(d) : "string" == typeof a && d.name === a && f.push(d);
					b && d.find && (f = f.concat(d.find(a, b)))
				}
				return f
			},
			addClass: function(a) {
				if (!this.hasClass(a)) {
					var b = this.attributes["class"] || "";
					this.attributes["class"] = b + (b ? " " : "") + a
				}
			},
			removeClass: function(a) {
				var b = this.attributes["class"];
				b && ((b = CKEDITOR.tools.trim(b.replace(new RegExp("(?:\\s+|^)" + a + "(?:\\s+|$)"), " "))) ? this.attributes["class"] = b : delete this.attributes["class"])
			},
			hasClass: function(a) {
				var b = this.attributes["class"];
				return b ? (new RegExp("(?:^|\\s)" + a + "(?\x3d\\s|$)")).test(b) : !1
			},
			getFilterContext: function(a) {
				var b = [];
				a || (a = {
					off: !1,
					nonEditable: !1,
					nestedEditable: !1
				});
				a.off || "off" != this.attributes["data-cke-processor"] || b.push("off", !0);
				a.nonEditable || "false" != this.attributes.contenteditable ? a.nonEditable && !a.nestedEditable && "true" == this.attributes.contenteditable && b.push("nestedEditable", !0) : b.push("nonEditable", !0);
				if (b.length) {
					a = CKEDITOR.tools.copy(a);
					for (var f = 0; f < b.length; f += 2) a[b[f]] = b[f + 1]
				}
				return a
			}
		}, !0)
	}(), function() {
		var a = /{([^}]+)}/g;
		CKEDITOR.template = function(a) {
			this.source = String(a)
		};
		CKEDITOR.template.prototype.output = function(f, b) {
			var c = this.source.replace(a, function(a, b) {
				return void 0 !== f[b] ? f[b] : a
			});
			return b ? b.push(c) : c
		}
	}(), delete CKEDITOR.loadFullCore, CKEDITOR.instances = {}, CKEDITOR.document = new CKEDITOR.dom.document(document), CKEDITOR.add = function(a) {
		CKEDITOR.instances[a.name] = a;
		a.on("focus", function() {
			CKEDITOR.currentInstance != a && (CKEDITOR.currentInstance = a, CKEDITOR.fire("currentInstance"))
		});
		a.on("blur", function() {
			CKEDITOR.currentInstance == a && (CKEDITOR.currentInstance = null, CKEDITOR.fire("currentInstance"))
		});
		CKEDITOR.fire("instance", null, a)
	}, CKEDITOR.remove = function(a) {
		delete CKEDITOR.instances[a.name]
	}, function() {
		var a = {};
		CKEDITOR.addTemplate = function(f, b) {
			var c = a[f];
			if (c) return c;
			c = {
				name: f,
				source: b
			};
			CKEDITOR.fire("template", c);
			return a[f] = new CKEDITOR.template(c.source)
		};
		CKEDITOR.getTemplate = function(f) {
			return a[f]
		}
	}(), function() {
		var a = [];
		CKEDITOR.addCss = function(f) {
			a.push(f)
		};
		CKEDITOR.getCss = function() {
			return a.join("\n")
		}
	}(), CKEDITOR.on("instanceDestroyed", function() {
		CKEDITOR.tools.isEmpty(this.instances) && CKEDITOR.fire("reset")
	}), CKEDITOR.TRISTATE_ON = 1, CKEDITOR.TRISTATE_OFF = 2, CKEDITOR.TRISTATE_DISABLED = 0, function() {
		CKEDITOR.inline = function(a, f) {
			if (!CKEDITOR.env.isCompatible) return null;
			a = CKEDITOR.dom.element.get(a);
			if (a.getEditor()) throw 'The editor instance "' + a.getEditor().name + '" is already attached to the provided element.';
			var b = new CKEDITOR.editor(f, a, CKEDITOR.ELEMENT_MODE_INLINE),
				c = a.is("textarea") ? a : null;
			c ? (b.setData(c.getValue(), null, !0), a = CKEDITOR.dom.element.createFromHtml('\x3cdiv contenteditable\x3d"' + !!b.readOnly + '" class\x3d"cke_textarea_inline"\x3e' + c.getValue() + "\x3c/div\x3e", CKEDITOR.document), a.insertAfter(c), c.hide(), c.$.form && b._attachToForm()) : b.setData(a.getHtml(), null, !0);
			b.on("loaded", function() {
				b.fire("uiReady");
				b.editable(a);
				b.container = a;
				b.ui.contentsElement = a;
				b.setData(b.getData(1));
				b.resetDirty();
				b.fire("contentDom");
				b.mode = "wysiwyg";
				b.fire("mode");
				b.status = "ready";
				b.fireOnce("instanceReady");
				CKEDITOR.fire("instanceReady", null, b)
			}, null, null, 1E4);
			b.on("destroy", function() {
				c && (b.container.clearCustomData(), b.container.remove(), c.show());
				b.element.clearCustomData();
				delete b.element
			});
			return b
		};
		CKEDITOR.inlineAll = function() {
			var a, f, b;
			for (b in CKEDITOR.dtd.$editable)
				for (var c = CKEDITOR.document.getElementsByTag(b), e = 0, l = c.count(); e < l; e++) a = c.getItem(e), "true" == a.getAttribute("contenteditable") && (f = {
					element: a,
					config: {}
				}, !1 !== CKEDITOR.fire("inline", f) && CKEDITOR.inline(a, f.config))
		};
		CKEDITOR.domReady(function() {
			!CKEDITOR.disableAutoInline && CKEDITOR.inlineAll()
		})
	}(), CKEDITOR.replaceClass = "ckeditor", function() {
		function a(a, e, l, k) {
			if (!CKEDITOR.env.isCompatible) return null;
			a = CKEDITOR.dom.element.get(a);
			if (a.getEditor()) throw 'The editor instance "' + a.getEditor().name + '" is already attached to the provided element.';
			var d = new CKEDITOR.editor(e, a, k);
			k == CKEDITOR.ELEMENT_MODE_REPLACE && (a.setStyle("visibility", "hidden"), d._.required = a.hasAttribute("required"), a.removeAttribute("required"));
			l && d.setData(l, null, !0);
			d.on("loaded", function() {
				b(d);
				k == CKEDITOR.ELEMENT_MODE_REPLACE && d.config.autoUpdateElement && a.$.form && d._attachToForm();
				d.setMode(d.config.startupMode, function() {
					d.resetDirty();
					d.status = "ready";
					d.fireOnce("instanceReady");
					CKEDITOR.fire("instanceReady", null, d)
				})
			});
			d.on("destroy", f);
			return d
		}

		function f() {
			var a = this.container,
				b = this.element;
			a && (a.clearCustomData(), a.remove());
			b && (b.clearCustomData(), this.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE && (b.show(), this._.required && b.setAttribute("required", "required")), delete this.element)
		}

		function b(a) {
			var b = a.name,
				f = a.element,
				k = a.elementMode,
				d = a.fire("uiSpace", {
					space: "top",
					html: ""
				}).html,
				h = a.fire("uiSpace", {
					space: "bottom",
					html: ""
				}).html,
				m = new CKEDITOR.template('\x3c{outerEl} id\x3d"cke_{name}" class\x3d"{id} cke cke_reset cke_chrome cke_editor_{name} cke_{langDir} ' + CKEDITOR.env.cssClass + '"  dir\x3d"{langDir}" lang\x3d"{langCode}" role\x3d"application"' + (a.title ? ' aria-labelledby\x3d"cke_{name}_arialbl"' : "") + "\x3e" + (a.title ? '\x3cspan id\x3d"cke_{name}_arialbl" class\x3d"cke_voice_label"\x3e{voiceLabel}\x3c/span\x3e' : "") + '\x3c{outerEl} class\x3d"cke_inner cke_reset" role\x3d"presentation"\x3e{topHtml}\x3c{outerEl} id\x3d"{contentId}" class\x3d"cke_contents cke_reset" role\x3d"presentation"\x3e\x3c/{outerEl}\x3e{bottomHtml}\x3c/{outerEl}\x3e\x3c/{outerEl}\x3e'),
				b = CKEDITOR.dom.element.createFromHtml(m.output({
					id: a.id,
					name: b,
					langDir: a.lang.dir,
					langCode: a.langCode,
					voiceLabel: a.title,
					topHtml: d ? '\x3cspan id\x3d"' + a.ui.spaceId("top") + '" class\x3d"cke_top cke_reset_all" role\x3d"presentation" style\x3d"height:auto"\x3e' + d + "\x3c/span\x3e" : "",
					contentId: a.ui.spaceId("contents"),
					bottomHtml: h ? '\x3cspan id\x3d"' + a.ui.spaceId("bottom") + '" class\x3d"cke_bottom cke_reset_all" role\x3d"presentation"\x3e' + h + "\x3c/span\x3e" : "",
					outerEl: CKEDITOR.env.ie ? "span" : "div"
				}));
			k == CKEDITOR.ELEMENT_MODE_REPLACE ? (f.hide(), b.insertAfter(f)) : f.append(b);
			a.container = b;
			a.ui.contentsElement = a.ui.space("contents");
			d && a.ui.space("top").unselectable();
			h && a.ui.space("bottom").unselectable();
			f = a.config.width;
			k = a.config.height;
			f && b.setStyle("width", CKEDITOR.tools.cssLength(f));
			k && a.ui.space("contents").setStyle("height", CKEDITOR.tools.cssLength(k));
			b.disableContextMenu();
			CKEDITOR.env.webkit && b.on("focus", function() {
				a.focus()
			});
			a.fireOnce("uiReady")
		}
		CKEDITOR.replace = function(b, e) {
			return a(b, e, null, CKEDITOR.ELEMENT_MODE_REPLACE)
		};
		CKEDITOR.appendTo = function(b, e, f) {
			return a(b, e, f, CKEDITOR.ELEMENT_MODE_APPENDTO)
		};
		CKEDITOR.replaceAll = function() {
			for (var a = document.getElementsByTagName("textarea"), b = 0; b < a.length; b++) {
				var f = null,
					k = a[b];
				if (k.name || k.id) {
					if ("string" == typeof arguments[0]) {
						if (!(new RegExp("(?:^|\\s)" + arguments[0] + "(?:$|\\s)")).test(k.className)) continue
					} else if ("function" == typeof arguments[0] && (f = {}, !1 === arguments[0](k, f))) continue;
					this.replace(k, f)
				}
			}
		};
		CKEDITOR.editor.prototype.addMode = function(a, b) {
			(this._.modes || (this._.modes = {}))[a] = b
		};
		CKEDITOR.editor.prototype.setMode = function(a, b) {
			var f = this,
				k = this._.modes;
			if (a != f.mode && k && k[a]) {
				f.fire("beforeSetMode", a);
				if (f.mode) {
					var d = f.checkDirty(),
						k = f._.previousModeData,
						h, m = 0;
					f.fire("beforeModeUnload");
					f.editable(0);
					f._.previousMode = f.mode;
					f._.previousModeData = h = f.getData(1);
					"source" == f.mode && k == h && (f.fire("lockSnapshot", {
						forceUpdate: !0
					}), m = 1);
					f.ui.space("contents").setHtml("");
					f.mode = ""
				} else f._.previousModeData = f.getData(1);
				this._.modes[a](function() {
					f.mode = a;
					void 0 !== d && !d && f.resetDirty();
					m ? f.fire("unlockSnapshot") : "wysiwyg" == a && f.fire("saveSnapshot");
					setTimeout(function() {
						f.fire("mode");
						b && b.call(f)
					}, 0)
				})
			}
		};
		CKEDITOR.editor.prototype.resize = function(a, b, f, k) {
			var d = this.container,
				h = this.ui.space("contents"),
				m = CKEDITOR.env.webkit && this.document && this.document.getWindow().$.frameElement;
			k = k ? this.container.getFirst(function(a) {
				return a.type == CKEDITOR.NODE_ELEMENT && a.hasClass("cke_inner")
			}) : d;
			k.setSize("width", a, !0);
			m && (m.style.width = "1%");
			var g = (k.$.offsetHeight || 0) - (h.$.clientHeight || 0),
				d = Math.max(b - (f ? 0 : g), 0);
			b = f ? b + g : b;
			h.setStyle("height", d + "px");
			m && (m.style.width = "100%");
			this.fire("resize", {
				outerHeight: b,
				contentsHeight: d,
				outerWidth: a || k.getSize("width")
			})
		};
		CKEDITOR.editor.prototype.getResizable = function(a) {
			return a ? this.ui.space("contents") : this.container
		};
		CKEDITOR.domReady(function() {
			CKEDITOR.replaceClass && CKEDITOR.replaceAll(CKEDITOR.replaceClass)
		})
	}(), CKEDITOR.config.startupMode = "wysiwyg", function() {
		function a(a) {
			var b = a.editor,
				d = a.data.path,
				e = d.blockLimit,
				g = a.data.selection,
				h = g.getRanges()[0],
				m;
			if (CKEDITOR.env.gecko || CKEDITOR.env.ie && CKEDITOR.env.needsBrFiller)
				if (g = f(g, d)) g.appendBogus(), m = CKEDITOR.env.ie;
			k(b, d.block, e) && h.collapsed && !h.getCommonAncestor().isReadOnly() && (d = h.clone(), d.enlarge(CKEDITOR.ENLARGE_BLOCK_CONTENTS), e = new CKEDITOR.dom.walker(d), e.guard = function(a) {
				return !c(a) || a.type == CKEDITOR.NODE_COMMENT || a.isReadOnly()
			}, !e.checkForward() || d.checkStartOfBlock() && d.checkEndOfBlock()) && (b = h.fixBlock(!0, b.activeEnterMode == CKEDITOR.ENTER_DIV ? "div" : "p"), CKEDITOR.env.needsBrFiller || (b = b.getFirst(c)) && b.type == CKEDITOR.NODE_TEXT && CKEDITOR.tools.trim(b.getText()).match(/^(?:&nbsp;|\xa0)$/) && b.remove(), m = 1, a.cancel());
			m && h.select()
		}

		function f(a, b) {
			if (a.isFake) return 0;
			var d = b.block || b.blockLimit,
				e = d && d.getLast(c);
			if (!(!d || !d.isBlockBoundary() || e && e.type == CKEDITOR.NODE_ELEMENT && e.isBlockBoundary() || d.is("pre") || d.getBogus())) return d
		}

		function b(a) {
			var b = a.data.getTarget();
			b.is("input") && (b = b.getAttribute("type"), "submit" != b && "reset" != b || a.data.preventDefault())
		}

		function c(a) {
			return g(a) && n(a)
		}

		function e(a, b) {
			return function(c) {
				var d = c.data.$.toElement || c.data.$.fromElement || c.data.$.relatedTarget;
				(d = d && d.nodeType == CKEDITOR.NODE_ELEMENT ? new CKEDITOR.dom.element(d) : null) && (b.equals(d) || b.contains(d)) || a.call(this, c)
			}
		}

		function l(a) {
			function b(a) {
				return function(b, e) {
					e && b.type == CKEDITOR.NODE_ELEMENT && b.is(g) && (d = b);
					if (!(e || !c(b) || a && r(b))) return !1
				}
			}
			var d, e = a.getRanges()[0];
			a = a.root;
			var g = {
				table: 1,
				ul: 1,
				ol: 1,
				dl: 1
			};
			if (e.startPath().contains(g)) {
				var f = e.clone();
				f.collapse(1);
				f.setStartAt(a, CKEDITOR.POSITION_AFTER_START);
				a = new CKEDITOR.dom.walker(f);
				a.guard = b();
				a.checkBackward();
				if (d) return f = e.clone(), f.collapse(), f.setEndAt(d, CKEDITOR.POSITION_AFTER_END), a = new CKEDITOR.dom.walker(f), a.guard = b(!0), d = !1, a.checkForward(), d
			}
			return null
		}

		function k(a, b, c) {
			return !1 !== a.config.autoParagraph && a.activeEnterMode != CKEDITOR.ENTER_BR && (a.editable().equals(c) && !b || b && "true" == b.getAttribute("contenteditable"))
		}

		function d(a) {
			return a.activeEnterMode != CKEDITOR.ENTER_BR && !1 !== a.config.autoParagraph ? a.activeEnterMode == CKEDITOR.ENTER_DIV ? "div" : "p" : !1
		}

		function h(a) {
			var b = a.editor;
			b.getSelection().scrollIntoView();
			setTimeout(function() {
				b.fire("saveSnapshot")
			}, 0)
		}

		function m(a, b, c) {
			var d = a.getCommonAncestor(b);
			for (b = a = c ? b : a;
				(a = a.getParent()) && !d.equals(a) && 1 == a.getChildCount();) b = a;
			b.remove()
		}
		var g, n, p, r, x, v, u, t, y, A;
		CKEDITOR.editable = CKEDITOR.tools.createClass({
			base: CKEDITOR.dom.element,
			$: function(a, b) {
				this.base(b.$ || b);
				this.editor = a;
				this.status = "unloaded";
				this.hasFocus = !1;
				this.setup()
			},
			proto: {
				focus: function() {
					var a;
					if (CKEDITOR.env.webkit && !this.hasFocus && (a = this.editor._.previousActive || this.getDocument().getActive(), this.contains(a))) {
						a.focus();
						return
					}
					CKEDITOR.env.edge && 14 < CKEDITOR.env.version && !this.hasFocus && this.getDocument().equals(CKEDITOR.document) && (this.editor._.previousScrollTop = this.$.scrollTop);
					try {
						if (!CKEDITOR.env.ie || CKEDITOR.env.edge && 14 < CKEDITOR.env.version || !this.getDocument().equals(CKEDITOR.document))
							if (CKEDITOR.env.chrome) {
								var b = this.$.scrollTop;
								this.$.focus();
								this.$.scrollTop = b
							} else this.$.focus();
						else this.$.setActive()
					} catch (c) {
						if (!CKEDITOR.env.ie) throw c;
					}
					CKEDITOR.env.safari && !this.isInline() && (a = CKEDITOR.document.getActive(), a.equals(this.getWindow().getFrame()) || this.getWindow().focus())
				},
				on: function(a, b) {
					var c = Array.prototype.slice.call(arguments, 0);
					CKEDITOR.env.ie && /^focus|blur$/.exec(a) && (a = "focus" == a ? "focusin" : "focusout", b = e(b, this), c[0] = a, c[1] = b);
					return CKEDITOR.dom.element.prototype.on.apply(this, c)
				},
				attachListener: function(a) {
					!this._.listeners && (this._.listeners = []);
					var b = Array.prototype.slice.call(arguments, 1),
						b = a.on.apply(a, b);
					this._.listeners.push(b);
					return b
				},
				clearListeners: function() {
					var a = this._.listeners;
					try {
						for (; a.length;) a.pop().removeListener()
					} catch (b) {}
				},
				restoreAttrs: function() {
					var a = this._.attrChanges,
						b, c;
					for (c in a) a.hasOwnProperty(c) && (b = a[c], null !== b ? this.setAttribute(c, b) : this.removeAttribute(c))
				},
				attachClass: function(a) {
					var b = this.getCustomData("classes");
					this.hasClass(a) || (!b && (b = []), b.push(a), this.setCustomData("classes", b), this.addClass(a))
				},
				changeAttr: function(a, b) {
					var c = this.getAttribute(a);
					b !== c && (!this._.attrChanges && (this._.attrChanges = {}), a in this._.attrChanges || (this._.attrChanges[a] = c), this.setAttribute(a, b))
				},
				insertText: function(a) {
					this.editor.focus();
					this.insertHtml(this.transformPlainTextToHtml(a), "text")
				},
				transformPlainTextToHtml: function(a) {
					var b = this.editor.getSelection().getStartElement().hasAscendant("pre", !0) ? CKEDITOR.ENTER_BR : this.editor.activeEnterMode;
					return CKEDITOR.tools.transformPlainTextToHtml(a, b)
				},
				insertHtml: function(a, b, c) {
					var d = this.editor;
					d.focus();
					d.fire("saveSnapshot");
					c || (c = d.getSelection().getRanges()[0]);
					v(this, b || "html", a, c);
					c.select();
					h(this);
					this.editor.fire("afterInsertHtml", {})
				},
				insertHtmlIntoRange: function(a, b, c) {
					v(this, c || "html", a, b);
					this.editor.fire("afterInsertHtml", {
						intoRange: b
					})
				},
				insertElement: function(a, b) {
					var d = this.editor;
					d.focus();
					d.fire("saveSnapshot");
					var e = d.activeEnterMode,
						d = d.getSelection(),
						g = a.getName(),
						g = CKEDITOR.dtd.$block[g];
					b || (b = d.getRanges()[0]);
					this.insertElementIntoRange(a, b) && (b.moveToPosition(a, CKEDITOR.POSITION_AFTER_END), g && ((g = a.getNext(function(a) {
						return c(a) && !r(a)
					})) && g.type == CKEDITOR.NODE_ELEMENT && g.is(CKEDITOR.dtd.$block) ? g.getDtd()["#"] ? b.moveToElementEditStart(g) : b.moveToElementEditEnd(a) : g || e == CKEDITOR.ENTER_BR || (g = b.fixBlock(!0, e == CKEDITOR.ENTER_DIV ? "div" : "p"), b.moveToElementEditStart(g))));
					d.selectRanges([b]);
					h(this)
				},
				insertElementIntoSelection: function(a) {
					this.insertElement(a)
				},
				insertElementIntoRange: function(a, b) {
					var c = this.editor,
						d = c.config.enterMode,
						e = a.getName(),
						g = CKEDITOR.dtd.$block[e];
					if (b.checkReadOnly()) return !1;
					b.deleteContents(1);
					b.startContainer.type == CKEDITOR.NODE_ELEMENT && (b.startContainer.is({
						tr: 1,
						table: 1,
						tbody: 1,
						thead: 1,
						tfoot: 1
					}) ? u(b) : b.startContainer.is(CKEDITOR.dtd.$list) && t(b));
					var f, h;
					if (g)
						for (;
							(f = b.getCommonAncestor(0, 1)) && (h = CKEDITOR.dtd[f.getName()]) && (!h || !h[e]);) f.getName() in CKEDITOR.dtd.span ? b.splitElement(f) : b.checkStartOfBlock() && b.checkEndOfBlock() ? (b.setStartBefore(f), b.collapse(!0), f.remove()) : b.splitBlock(d == CKEDITOR.ENTER_DIV ? "div" : "p", c.editable());
					b.insertNode(a);
					return !0
				},
				setData: function(a, b) {
					b || (a = this.editor.dataProcessor.toHtml(a));
					this.setHtml(a);
					this.fixInitialSelection();
					"unloaded" == this.status && (this.status = "ready");
					this.editor.fire("dataReady")
				},
				getData: function(a) {
					var b = this.getHtml();
					a || (b = this.editor.dataProcessor.toDataFormat(b));
					return b
				},
				setReadOnly: function(a) {
					this.setAttribute("contenteditable", !a)
				},
				detach: function() {
					this.removeClass("cke_editable");
					this.status = "detached";
					var a = this.editor;
					this._.detach();
					delete a.document;
					delete a.window
				},
				isInline: function() {
					return this.getDocument().equals(CKEDITOR.document)
				},
				fixInitialSelection: function() {
					function a() {
						var b = c.getDocument().$,
							d = b.getSelection(),
							e;
						a: if (d.anchorNode && d.anchorNode == c.$) e = !0;
							else {
								if (CKEDITOR.env.webkit && (e = c.getDocument().getActive()) && e.equals(c) && !d.anchorNode) {
									e = !0;
									break a
								}
								e = void 0
							}
						e && (e = new CKEDITOR.dom.range(c), e.moveToElementEditStart(c), b = b.createRange(), b.setStart(e.startContainer.$, e.startOffset), b.collapse(!0), d.removeAllRanges(), d.addRange(b))
					}

					function b() {
						var a = c.getDocument().$,
							d = a.selection,
							e = c.getDocument().getActive();
						"None" == d.type && e.equals(c) && (d = new CKEDITOR.dom.range(c), a = a.body.createTextRange(), d.moveToElementEditStart(c), d = d.startContainer, d.type != CKEDITOR.NODE_ELEMENT && (d = d.getParent()), a.moveToElementText(d.$), a.collapse(!0), a.select())
					}
					var c = this;
					if (CKEDITOR.env.ie && (9 > CKEDITOR.env.version || CKEDITOR.env.quirks)) this.hasFocus && (this.focus(), b());
					else if (this.hasFocus) this.focus(), a();
					else this.once("focus", function() {
						a()
					}, null, null, -999)
				},
				getHtmlFromRange: function(a) {
					if (a.collapsed) return new CKEDITOR.dom.documentFragment(a.document);
					a = {
						doc: this.getDocument(),
						range: a.clone()
					};
					y.eol.detect(a, this);
					y.bogus.exclude(a);
					y.cell.shrink(a);
					a.fragment = a.range.cloneContents();
					y.tree.rebuild(a, this);
					y.eol.fix(a, this);
					return new CKEDITOR.dom.documentFragment(a.fragment.$)
				},
				extractHtmlFromRange: function(a, b) {
					var c = A,
						d = {
							range: a,
							doc: a.document
						},
						e = this.getHtmlFromRange(a);
					if (a.collapsed) return a.optimize(), e;
					a.enlarge(CKEDITOR.ENLARGE_INLINE, 1);
					c.table.detectPurge(d);
					d.bookmark = a.createBookmark();
					delete d.range;
					var g = this.editor.createRange();
					g.moveToPosition(d.bookmark.startNode, CKEDITOR.POSITION_BEFORE_START);
					d.targetBookmark = g.createBookmark();
					c.list.detectMerge(d, this);
					c.table.detectRanges(d, this);
					c.block.detectMerge(d, this);
					d.tableContentsRanges ? (c.table.deleteRanges(d), a.moveToBookmark(d.bookmark), d.range = a) : (a.moveToBookmark(d.bookmark), d.range = a, a.extractContents(c.detectExtractMerge(d)));
					a.moveToBookmark(d.targetBookmark);
					a.optimize();
					c.fixUneditableRangePosition(a);
					c.list.merge(d, this);
					c.table.purge(d, this);
					c.block.merge(d, this);
					if (b) {
						c = a.startPath();
						if (d = a.checkStartOfBlock() && a.checkEndOfBlock() && c.block && !a.root.equals(c.block)) {
							a: {
								var d = c.block.getElementsByTag("span"),
									g = 0,
									f;
								if (d)
									for (; f = d.getItem(g++);)
										if (!n(f)) {
											d = !0;
											break a
										}
								d = !1
							}
							d = !d
						}
						d && (a.moveToPosition(c.block, CKEDITOR.POSITION_BEFORE_START), c.block.remove())
					} else c.autoParagraph(this.editor, a), p(a.startContainer) && a.startContainer.appendBogus();
					a.startContainer.mergeSiblings();
					return e
				},
				setup: function() {
					var a = this.editor;
					this.attachListener(a, "beforeGetData", function() {
						var b = this.getData();
						this.is("textarea") || !1 !== a.config.ignoreEmptyParagraph && (b = b.replace(x, function(a, b) {
							return b
						}));
						a.setData(b, null, 1)
					}, this);
					this.attachListener(a, "getSnapshot", function(a) {
						a.data = this.getData(1)
					}, this);
					this.attachListener(a, "afterSetData", function() {
						this.setData(a.getData(1))
					}, this);
					this.attachListener(a, "loadSnapshot", function(a) {
						this.setData(a.data, 1)
					}, this);
					this.attachListener(a, "beforeFocus", function() {
						var b = a.getSelection();
						(b = b && b.getNative()) && "Control" == b.type || this.focus()
					}, this);
					this.attachListener(a, "insertHtml", function(a) {
						this.insertHtml(a.data.dataValue, a.data.mode, a.data.range)
					}, this);
					this.attachListener(a, "insertElement", function(a) {
						this.insertElement(a.data)
					}, this);
					this.attachListener(a, "insertText", function(a) {
						this.insertText(a.data)
					}, this);
					this.setReadOnly(a.readOnly);
					this.attachClass("cke_editable");
					a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? this.attachClass("cke_editable_inline") : a.elementMode != CKEDITOR.ELEMENT_MODE_REPLACE && a.elementMode != CKEDITOR.ELEMENT_MODE_APPENDTO || this.attachClass("cke_editable_themed");
					this.attachClass("cke_contents_" + a.config.contentsLangDirection);
					a.keystrokeHandler.blockedKeystrokes[8] = +a.readOnly;
					a.keystrokeHandler.attach(this);
					this.on("blur", function() {
						this.hasFocus = !1
					}, null, null, -1);
					this.on("focus", function() {
						this.hasFocus = !0
					}, null, null, -1);
					if (CKEDITOR.env.webkit) this.on("scroll", function() {
						a._.previousScrollTop = a.editable().$.scrollTop
					}, null, null, -1);
					if (CKEDITOR.env.edge && 14 < CKEDITOR.env.version) {
						var d = function() {
							var b = a.editable();
							null != a._.previousScrollTop && b.getDocument().equals(CKEDITOR.document) && (b.$.scrollTop = a._.previousScrollTop, a._.previousScrollTop = null, this.removeListener("scroll", d))
						};
						this.on("scroll", d)
					}
					a.focusManager.add(this);
					this.equals(CKEDITOR.document.getActive()) && (this.hasFocus = !0, a.once("contentDom", function() {
						a.focusManager.focus(this)
					}, this));
					this.isInline() && this.changeAttr("tabindex", a.tabIndex);
					if (!this.is("textarea")) {
						a.document = this.getDocument();
						a.window = this.getWindow();
						var e = a.document;
						this.changeAttr("spellcheck", !a.config.disableNativeSpellChecker);
						var f = a.config.contentsLangDirection;
						this.getDirection(1) != f && this.changeAttr("dir", f);
						var h = CKEDITOR.getCss();
						if (h) {
							var f = e.getHead(),
								k = f.getCustomData("stylesheet");
							k ? h != k.getText() && (CKEDITOR.env.ie && 9 > CKEDITOR.env.version ? k.$.styleSheet.cssText = h : k.setText(h)) : (h = e.appendStyleText(h), h = new CKEDITOR.dom.element(h.ownerNode || h.owningElement), f.setCustomData("stylesheet", h), h.data("cke-temp", 1))
						}
						f = e.getCustomData("stylesheet_ref") || 0;
						e.setCustomData("stylesheet_ref", f + 1);
						this.setCustomData("cke_includeReadonly", !a.config.disableReadonlyStyling);
						this.attachListener(this, "click", function(a) {
							a = a.data;
							var b = (new CKEDITOR.dom.elementPath(a.getTarget(), this)).contains("a");
							b && 2 != a.$.button && b.isReadOnly() && a.preventDefault()
						});
						var n = {
							8: 1,
							46: 1
						};
						this.attachListener(a, "key", function(b) {
							if (a.readOnly) return !0;
							var c = b.data.domEvent.getKey(),
								d;
							if (c in n) {
								b = a.getSelection();
								var e, f = b.getRanges()[0],
									h = f.startPath(),
									m, k, t, c = 8 == c;
								CKEDITOR.env.ie && 11 > CKEDITOR.env.version && (e = b.getSelectedElement()) || (e = l(b)) ? (a.fire("saveSnapshot"), f.moveToPosition(e, CKEDITOR.POSITION_BEFORE_START), e.remove(), f.select(), a.fire("saveSnapshot"), d = 1) : f.collapsed && ((m = h.block) && (t = m[c ? "getPrevious" : "getNext"](g)) && t.type == CKEDITOR.NODE_ELEMENT && t.is("table") && f[c ? "checkStartOfBlock" : "checkEndOfBlock"]() ? (a.fire("saveSnapshot"), f[c ? "checkEndOfBlock" : "checkStartOfBlock"]() && m.remove(), f["moveToElementEdit" + (c ? "End" : "Start")](t), f.select(), a.fire("saveSnapshot"), d = 1) : h.blockLimit && h.blockLimit.is("td") && (k = h.blockLimit.getAscendant("table")) && f.checkBoundaryOfElement(k, c ? CKEDITOR.START : CKEDITOR.END) && (t = k[c ? "getPrevious" : "getNext"](g)) ? (a.fire("saveSnapshot"), f["moveToElementEdit" + (c ? "End" : "Start")](t), f.checkStartOfBlock() && f.checkEndOfBlock() ? t.remove() : f.select(), a.fire("saveSnapshot"), d = 1) : (k = h.contains(["td", "th", "caption"])) && f.checkBoundaryOfElement(k, c ? CKEDITOR.START : CKEDITOR.END) && (d = 1))
							}
							return !d
						});
						a.blockless && CKEDITOR.env.ie && CKEDITOR.env.needsBrFiller && this.attachListener(this, "keyup", function(b) {
							b.data.getKeystroke() in n && !this.getFirst(c) && (this.appendBogus(), b = a.createRange(), b.moveToPosition(this, CKEDITOR.POSITION_AFTER_START), b.select())
						});
						this.attachListener(this, "dblclick", function(b) {
							if (a.readOnly) return !1;
							b = {
								element: b.data.getTarget()
							};
							a.fire("doubleclick", b)
						});
						CKEDITOR.env.ie && this.attachListener(this, "click", b);
						CKEDITOR.env.ie && !CKEDITOR.env.edge || this.attachListener(this, "mousedown", function(b) {
							var c = b.data.getTarget();
							c.is("img", "hr", "input", "textarea", "select") && !c.isReadOnly() && (a.getSelection().selectElement(c), c.is("input", "textarea", "select") && b.data.preventDefault())
						});
						CKEDITOR.env.edge && this.attachListener(this, "mouseup", function(b) {
							(b = b.data.getTarget()) && b.is("img") && a.getSelection().selectElement(b)
						});
						CKEDITOR.env.gecko && this.attachListener(this, "mouseup", function(b) {
							if (2 == b.data.$.button && (b = b.data.getTarget(), !b.getOuterHtml().replace(x, ""))) {
								var c = a.createRange();
								c.moveToElementEditStart(b);
								c.select(!0)
							}
						});
						CKEDITOR.env.webkit && (this.attachListener(this, "click", function(a) {
							a.data.getTarget().is("input", "select") && a.data.preventDefault()
						}), this.attachListener(this, "mouseup", function(a) {
							a.data.getTarget().is("input", "textarea") && a.data.preventDefault()
						}));
						CKEDITOR.env.webkit && this.attachListener(a, "key", function(b) {
							if (a.readOnly) return !0;
							b = b.data.domEvent.getKey();
							if (b in n) {
								var c = 8 == b,
									d = a.getSelection().getRanges()[0];
								b = d.startPath();
								if (d.collapsed) a: {
									var e = b.block;
									if (e && d[c ? "checkStartOfBlock" : "checkEndOfBlock"]() && d.moveToClosestEditablePosition(e, !c) && d.collapsed) {
										if (d.startContainer.type == CKEDITOR.NODE_ELEMENT) {
											var g = d.startContainer.getChild(d.startOffset - (c ? 1 : 0));
											if (g && g.type == CKEDITOR.NODE_ELEMENT && g.is("hr")) {
												a.fire("saveSnapshot");
												g.remove();
												b = !0;
												break a
											}
										}
										d = d.startPath().block;
										if (!d || d && d.contains(e)) b = void 0;
										else {
											a.fire("saveSnapshot");
											var f;
											(f = (c ? d : e).getBogus()) && f.remove();
											f = a.getSelection();
											g = f.createBookmarks();
											(c ? e : d).moveChildren(c ? d : e, !1);
											b.lastElement.mergeSiblings();
											m(e, d, !c);
											f.selectBookmarks(g);
											b = !0
										}
									} else b = !1
								}
								else c = d,
									f = b.block, d = c.endPath().block, f && d && !f.equals(d) ? (a.fire("saveSnapshot"), (e = f.getBogus()) && e.remove(), c.enlarge(CKEDITOR.ENLARGE_INLINE), c.deleteContents(), d.getParent() && (d.moveChildren(f, !1), b.lastElement.mergeSiblings(), m(f, d, !0)), c = a.getSelection().getRanges()[0], c.collapse(1), c.optimize(), "" === c.startContainer.getHtml() && c.startContainer.appendBogus(), c.select(), b = !0) : b = !1;
								if (!b) return;
								a.getSelection().scrollIntoView();
								a.fire("saveSnapshot");
								return !1
							}
						}, this, null, 100)
					}
				}
			},
			_: {
				detach: function() {
					this.editor.setData(this.editor.getData(), 0, 1);
					this.clearListeners();
					this.restoreAttrs();
					var a;
					if (a = this.removeCustomData("classes"))
						for (; a.length;) this.removeClass(a.pop());
					if (!this.is("textarea")) {
						a = this.getDocument();
						var b = a.getHead();
						if (b.getCustomData("stylesheet")) {
							var c = a.getCustomData("stylesheet_ref");
							--c ? a.setCustomData("stylesheet_ref", c) : (a.removeCustomData("stylesheet_ref"), b.removeCustomData("stylesheet").remove())
						}
					}
					this.editor.fire("contentDomUnload");
					delete this.editor
				}
			}
		});
		CKEDITOR.editor.prototype.editable = function(a) {
			var b = this._.editable;
			if (b && a) return 0;
			arguments.length && (b = this._.editable = a ? a instanceof CKEDITOR.editable ? a : new CKEDITOR.editable(this, a) : (b && b.detach(), null));
			return b
		};
		CKEDITOR.on("instanceLoaded", function(b) {
			var c = b.editor;
			c.on("insertElement", function(a) {
				a = a.data;
				a.type == CKEDITOR.NODE_ELEMENT && (a.is("input") || a.is("textarea")) && ("false" != a.getAttribute("contentEditable") && a.data("cke-editable", a.hasAttribute("contenteditable") ? "true" : "1"), a.setAttribute("contentEditable", !1))
			});
			c.on("selectionChange", function(b) {
				if (!c.readOnly) {
					var d = c.getSelection();
					d && !d.isLocked && (d = c.checkDirty(), c.fire("lockSnapshot"), a(b), c.fire("unlockSnapshot"), !d && c.resetDirty())
				}
			})
		});
		CKEDITOR.on("instanceCreated", function(a) {
			var b = a.editor;
			b.on("mode", function() {
				var a = b.editable();
				if (a && a.isInline()) {
					var c = b.title;
					a.changeAttr("role", "textbox");
					a.changeAttr("aria-label", c);
					c && a.changeAttr("title", c);
					var d = b.fire("ariaEditorHelpLabel", {}).label;
					if (d && (c = this.ui.space(this.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? "top" : "contents"))) {
						var e = CKEDITOR.tools.getNextId(),
							d = CKEDITOR.dom.element.createFromHtml('\x3cspan id\x3d"' + e + '" class\x3d"cke_voice_label"\x3e' + d + "\x3c/span\x3e");
						c.append(d);
						a.changeAttr("aria-describedby", e)
					}
				}
			})
		});
		CKEDITOR.addCss(".cke_editable{cursor:text}.cke_editable img,.cke_editable input,.cke_editable textarea{cursor:default}");
		g = CKEDITOR.dom.walker.whitespaces(!0);
		n = CKEDITOR.dom.walker.bookmark(!1, !0);
		p = CKEDITOR.dom.walker.empty();
		r = CKEDITOR.dom.walker.bogus();
		x = /(^|<body\b[^>]*>)\s*<(p|div|address|h\d|center|pre)[^>]*>\s*(?:<br[^>]*>|&nbsp;|\u00A0|&#160;)?\s*(:?<\/\2>)?\s*(?=$|<\/body>)/gi;
		v = function() {
			function a(b) {
				return b.type == CKEDITOR.NODE_ELEMENT
			}

			function b(c, d) {
				var e, g, f, h, m = [],
					k = d.range.startContainer;
				e = d.range.startPath();
				for (var k = l[k.getName()], n = 0, t = c.getChildren(), u = t.count(), E = -1, v = -1, y = 0, p = e.contains(l.$list); n < u; ++n) e = t.getItem(n), a(e) ? (f = e.getName(), p && f in CKEDITOR.dtd.$list ? m = m.concat(b(e, d)) : (h = !!k[f], "br" != f || !e.data("cke-eol") || n && n != u - 1 || (y = (g = n ? m[n - 1].node : t.getItem(n + 1)) && (!a(g) || !g.is("br")), g = g && a(g) && l.$block[g.getName()]), -1 != E || h || (E = n), h || (v = n), m.push({
					isElement: 1,
					isLineBreak: y,
					isBlock: e.isBlockBoundary(),
					hasBlockSibling: g,
					node: e,
					name: f,
					allowed: h
				}), g = y = 0)) : m.push({
					isElement: 0,
					node: e,
					allowed: 1
				}); - 1 < E && (m[E].firstNotAllowed = 1); - 1 < v && (m[v].lastNotAllowed = 1);
				return m
			}

			function e(b, c) {
				var d = [],
					g = b.getChildren(),
					f = g.count(),
					h, m = 0,
					k = l[c],
					n = !b.is(l.$inline) || b.is("br");
				for (n && d.push(" "); m < f; m++) h = g.getItem(m), a(h) && !h.is(k) ? d = d.concat(e(h, c)) : d.push(h);
				n && d.push(" ");
				return d
			}

			function f(b) {
				return a(b.startContainer) && b.startContainer.getChild(b.startOffset - 1)
			}

			function g(b) {
				return b && a(b) && (b.is(l.$removeEmpty) || b.is("a") && !b.isBlockBoundary())
			}

			function h(b, c, d, e) {
				var g = b.clone(),
					f, m;
				g.setEndAt(c, CKEDITOR.POSITION_BEFORE_END);
				(f = (new CKEDITOR.dom.walker(g)).next()) && a(f) && n[f.getName()] && (m = f.getPrevious()) && a(m) && !m.getParent().equals(b.startContainer) && d.contains(m) && e.contains(f) && f.isIdentical(m) && (f.moveChildren(m), f.remove(), h(b, c, d, e))
			}

			function m(b, c) {
				function d(b, c) {
					if (c.isBlock && c.isElement && !c.node.is("br") && a(b) && b.is("br")) return b.remove(), 1
				}
				var e = c.endContainer.getChild(c.endOffset),
					g = c.endContainer.getChild(c.endOffset - 1);
				e && d(e, b[b.length - 1]);
				g && d(g, b[0]) && (c.setEnd(c.endContainer, c.endOffset - 1), c.collapse())
			}
			var l = CKEDITOR.dtd,
				n = {
					p: 1,
					div: 1,
					h1: 1,
					h2: 1,
					h3: 1,
					h4: 1,
					h5: 1,
					h6: 1,
					ul: 1,
					ol: 1,
					li: 1,
					pre: 1,
					dl: 1,
					blockquote: 1
				},
				t = {
					p: 1,
					div: 1,
					h1: 1,
					h2: 1,
					h3: 1,
					h4: 1,
					h5: 1,
					h6: 1
				},
				u = CKEDITOR.tools.extend({}, l.$inline);
			delete u.br;
			return function(n, D, v, y) {
				var p = n.editor,
					x = !1;
				"unfiltered_html" == D && (D = "html", x = !0);
				if (!y.checkReadOnly()) {
					var A = (new CKEDITOR.dom.elementPath(y.startContainer, y.root)).blockLimit || y.root;
					n = {
						type: D,
						dontFilter: x,
						editable: n,
						editor: p,
						range: y,
						blockLimit: A,
						mergeCandidates: [],
						zombies: []
					};
					D = n.range;
					y = n.mergeCandidates;
					var r, J;
					"text" == n.type && D.shrink(CKEDITOR.SHRINK_ELEMENT, !0, !1) && (r = CKEDITOR.dom.element.createFromHtml("\x3cspan\x3e\x26nbsp;\x3c/span\x3e", D.document), D.insertNode(r), D.setStartAfter(r));
					x = new CKEDITOR.dom.elementPath(D.startContainer);
					n.endPath = A = new CKEDITOR.dom.elementPath(D.endContainer);
					if (!D.collapsed) {
						var p = A.block || A.blockLimit,
							fa = D.getCommonAncestor();
						p && !p.equals(fa) && !p.contains(fa) && D.checkEndOfBlock() && n.zombies.push(p);
						D.deleteContents()
					}
					for (;
						(J = f(D)) && a(J) && J.isBlockBoundary() && x.contains(J);) D.moveToPosition(J, CKEDITOR.POSITION_BEFORE_END);
					h(D, n.blockLimit, x, A);
					r && (D.setEndBefore(r), D.collapse(), r.remove());
					r = D.startPath();
					if (p = r.contains(g, !1, 1)) D.splitElement(p), n.inlineStylesRoot = p, n.inlineStylesPeak = r.lastElement;
					r = D.createBookmark();
					(p = r.startNode.getPrevious(c)) && a(p) && g(p) && y.push(p);
					(p = r.startNode.getNext(c)) && a(p) && g(p) && y.push(p);
					for (p = r.startNode;
						(p = p.getParent()) && g(p);) y.push(p);
					D.moveToBookmark(r);
					if (r = v) {
						r = n.range;
						if ("text" == n.type && n.inlineStylesRoot) {
							J = n.inlineStylesPeak;
							D = J.getDocument().createText("{cke-peak}");
							for (y = n.inlineStylesRoot.getParent(); !J.equals(y);) D = D.appendTo(J.clone()), J = J.getParent();
							v = D.getOuterHtml().split("{cke-peak}").join(v)
						}
						J = n.blockLimit.getName();
						if (/^\s+|\s+$/.test(v) && "span" in CKEDITOR.dtd[J]) {
							var P = '\x3cspan data-cke-marker\x3d"1"\x3e\x26nbsp;\x3c/span\x3e';
							v = P + v + P
						}
						v = n.editor.dataProcessor.toHtml(v, {
							context: null,
							fixForBody: !1,
							protectedWhitespaces: !!P,
							dontFilter: n.dontFilter,
							filter: n.editor.activeFilter,
							enterMode: n.editor.activeEnterMode
						});
						J = r.document.createElement("body");
						J.setHtml(v);
						P && (J.getFirst().remove(), J.getLast().remove());
						if ((P = r.startPath().block) && (1 != P.getChildCount() || !P.getBogus())) a: {
							var Q;
							if (1 == J.getChildCount() && a(Q = J.getFirst()) && Q.is(t) && !Q.hasAttribute("contenteditable")) {
								P = Q.getElementsByTag("*");
								r = 0;
								for (y = P.count(); r < y; r++)
									if (D = P.getItem(r), !D.is(u)) break a;
								Q.moveChildren(Q.getParent(1));
								Q.remove()
							}
						}
						n.dataWrapper = J;
						r = v
					}
					if (r) {
						Q = n.range;
						r = Q.document;
						var N;
						J = n.blockLimit;
						y = 0;
						var S, P = [],
							R, Y;
						v = p = 0;
						var W, Z;
						D = Q.startContainer;
						var x = n.endPath.elements[0],
							aa, A = x.getPosition(D),
							fa = !!x.getCommonAncestor(D) && A != CKEDITOR.POSITION_IDENTICAL && !(A & CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_IS_CONTAINED);
						D = b(n.dataWrapper, n);
						for (m(D, Q); y < D.length; y++) {
							A = D[y];
							if (N = A.isLineBreak) {
								N = Q;
								W = J;
								var X = void 0,
									ba = void 0;
								A.hasBlockSibling ? N = 1 : (X = N.startContainer.getAscendant(l.$block, 1)) && X.is({
									div: 1,
									p: 1
								}) ? (ba = X.getPosition(W), ba == CKEDITOR.POSITION_IDENTICAL || ba == CKEDITOR.POSITION_CONTAINS ? N = 0 : (W = N.splitElement(X), N.moveToPosition(W, CKEDITOR.POSITION_AFTER_START), N = 1)) : N = 0
							}
							if (N) v = 0 < y;
							else {
								N = Q.startPath();
								!A.isBlock && k(n.editor, N.block, N.blockLimit) && (Y = d(n.editor)) && (Y = r.createElement(Y), Y.appendBogus(), Q.insertNode(Y), CKEDITOR.env.needsBrFiller && (S = Y.getBogus()) && S.remove(), Q.moveToPosition(Y, CKEDITOR.POSITION_BEFORE_END));
								if ((N = Q.startPath().block) && !N.equals(R)) {
									if (S = N.getBogus()) S.remove(), P.push(N);
									R = N
								}
								A.firstNotAllowed && (p = 1);
								if (p && A.isElement) {
									N = Q.startContainer;
									for (W = null; N && !l[N.getName()][A.name];) {
										if (N.equals(J)) {
											N = null;
											break
										}
										W = N;
										N = N.getParent()
									}
									if (N) W && (Z = Q.splitElement(W), n.zombies.push(Z), n.zombies.push(W));
									else {
										W = J.getName();
										aa = !y;
										N = y == D.length - 1;
										W = e(A.node, W);
										for (var X = [], ba = W.length, da = 0, ia = void 0, ja = 0, ea = -1; da < ba; da++) ia = W[da], " " == ia ? (ja || aa && !da || (X.push(new CKEDITOR.dom.text(" ")), ea = X.length), ja = 1) : (X.push(ia), ja = 0);
										N && ea == X.length && X.pop();
										aa = X
									}
								}
								if (aa) {
									for (; N = aa.pop();) Q.insertNode(N);
									aa = 0
								} else Q.insertNode(A.node);
								A.lastNotAllowed && y < D.length - 1 && ((Z = fa ? x : Z) && Q.setEndAt(Z, CKEDITOR.POSITION_AFTER_START), p = 0);
								Q.collapse()
							}
						}
						1 != D.length ? S = !1 : (S = D[0], S = S.isElement && "false" == S.node.getAttribute("contenteditable"));
						S && (v = !0, N = D[0].node, Q.setStartAt(N, CKEDITOR.POSITION_BEFORE_START), Q.setEndAt(N, CKEDITOR.POSITION_AFTER_END));
						n.dontMoveCaret = v;
						n.bogusNeededBlocks = P
					}
					S = n.range;
					var ga;
					Z = n.bogusNeededBlocks;
					for (aa = S.createBookmark(); R = n.zombies.pop();) R.getParent() && (Y = S.clone(), Y.moveToElementEditStart(R), Y.removeEmptyBlocksAtEnd());
					if (Z)
						for (; R = Z.pop();) CKEDITOR.env.needsBrFiller ? R.appendBogus() : R.append(S.document.createText(" "));
					for (; R = n.mergeCandidates.pop();) R.mergeSiblings();
					S.moveToBookmark(aa);
					if (!n.dontMoveCaret) {
						for (R = f(S); R && a(R) && !R.is(l.$empty);) {
							if (R.isBlockBoundary()) S.moveToPosition(R, CKEDITOR.POSITION_BEFORE_END);
							else {
								if (g(R) && R.getHtml().match(/(\s|&nbsp;)$/g)) {
									ga = null;
									break
								}
								ga = S.clone();
								ga.moveToPosition(R, CKEDITOR.POSITION_BEFORE_END)
							}
							R = R.getLast(c)
						}
						ga && S.moveToRange(ga)
					}
				}
			}
		}();
		u = function() {
			function a(b) {
				b = new CKEDITOR.dom.walker(b);
				b.guard = function(a, b) {
					if (b) return !1;
					if (a.type == CKEDITOR.NODE_ELEMENT) return a.is(CKEDITOR.dtd.$tableContent)
				};
				b.evaluator = function(a) {
					return a.type == CKEDITOR.NODE_ELEMENT
				};
				return b
			}

			function b(a, c, d) {
				c = a.getDocument().createElement(c);
				a.append(c, d);
				return c
			}

			function c(a) {
				var b = a.count(),
					d;
				for (b; 0 < b--;) d = a.getItem(b), CKEDITOR.tools.trim(d.getHtml()) || (d.appendBogus(), CKEDITOR.env.ie && 9 > CKEDITOR.env.version && d.getChildCount() && d.getFirst().remove())
			}
			return function(d) {
				var e = d.startContainer,
					g = e.getAscendant("table", 1),
					f = !1;
				c(g.getElementsByTag("td"));
				c(g.getElementsByTag("th"));
				g = d.clone();
				g.setStart(e, 0);
				g = a(g).lastBackward();
				g || (g = d.clone(), g.setEndAt(e, CKEDITOR.POSITION_BEFORE_END), g = a(g).lastForward(), f = !0);
				g || (g = e);
				g.is("table") ? (d.setStartAt(g, CKEDITOR.POSITION_BEFORE_START), d.collapse(!0), g.remove()) : (g.is({
					tbody: 1,
					thead: 1,
					tfoot: 1
				}) && (g = b(g, "tr", f)), g.is("tr") && (g = b(g, g.getParent().is("thead") ? "th" : "td", f)), (e = g.getBogus()) && e.remove(), d.moveToPosition(g, f ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_END))
			}
		}();
		t = function() {
			function a(b) {
				b = new CKEDITOR.dom.walker(b);
				b.guard = function(a, b) {
					if (b) return !1;
					if (a.type == CKEDITOR.NODE_ELEMENT) return a.is(CKEDITOR.dtd.$list) || a.is(CKEDITOR.dtd.$listItem)
				};
				b.evaluator = function(a) {
					return a.type == CKEDITOR.NODE_ELEMENT && a.is(CKEDITOR.dtd.$listItem)
				};
				return b
			}
			return function(b) {
				var c = b.startContainer,
					d = !1,
					e;
				e = b.clone();
				e.setStart(c, 0);
				e = a(e).lastBackward();
				e || (e = b.clone(), e.setEndAt(c, CKEDITOR.POSITION_BEFORE_END), e = a(e).lastForward(), d = !0);
				e || (e = c);
				e.is(CKEDITOR.dtd.$list) ? (b.setStartAt(e, CKEDITOR.POSITION_BEFORE_START), b.collapse(!0), e.remove()) : ((c = e.getBogus()) && c.remove(), b.moveToPosition(e, d ? CKEDITOR.POSITION_AFTER_START : CKEDITOR.POSITION_BEFORE_END), b.select())
			}
		}();
		y = {
			eol: {
				detect: function(a, b) {
					var c = a.range,
						d = c.clone(),
						e = c.clone(),
						g = new CKEDITOR.dom.elementPath(c.startContainer, b),
						f = new CKEDITOR.dom.elementPath(c.endContainer, b);
					d.collapse(1);
					e.collapse();
					g.block && d.checkBoundaryOfElement(g.block, CKEDITOR.END) && (c.setStartAfter(g.block), a.prependEolBr = 1);
					f.block && e.checkBoundaryOfElement(f.block, CKEDITOR.START) && (c.setEndBefore(f.block), a.appendEolBr = 1)
				},
				fix: function(a, b) {
					var c = b.getDocument(),
						d;
					a.appendEolBr && (d = this.createEolBr(c), a.fragment.append(d));
					!a.prependEolBr || d && !d.getPrevious() || a.fragment.append(this.createEolBr(c), 1)
				},
				createEolBr: function(a) {
					return a.createElement("br", {
						attributes: {
							"data-cke-eol": 1
						}
					})
				}
			},
			bogus: {
				exclude: function(a) {
					var b = a.range.getBoundaryNodes(),
						c = b.startNode,
						b = b.endNode;
					!b || !r(b) || c && c.equals(b) || a.range.setEndBefore(b)
				}
			},
			tree: {
				rebuild: function(a, b) {
					var c = a.range,
						d = c.getCommonAncestor(),
						e = new CKEDITOR.dom.elementPath(d, b),
						g = new CKEDITOR.dom.elementPath(c.startContainer, b),
						c = new CKEDITOR.dom.elementPath(c.endContainer, b),
						f;
					d.type == CKEDITOR.NODE_TEXT && (d = d.getParent());
					if (e.blockLimit.is({
							tr: 1,
							table: 1
						})) {
						var h = e.contains("table").getParent();
						f = function(a) {
							return !a.equals(h)
						}
					} else if (e.block && e.block.is(CKEDITOR.dtd.$listItem) && (g = g.contains(CKEDITOR.dtd.$list), c = c.contains(CKEDITOR.dtd.$list), !g.equals(c))) {
						var m = e.contains(CKEDITOR.dtd.$list).getParent();
						f = function(a) {
							return !a.equals(m)
						}
					}
					f || (f = function(a) {
						return !a.equals(e.block) && !a.equals(e.blockLimit)
					});
					this.rebuildFragment(a, b, d, f)
				},
				rebuildFragment: function(a, b, c, d) {
					for (var e; c && !c.equals(b) && d(c);) e = c.clone(0, 1), a.fragment.appendTo(e), a.fragment = e, c = c.getParent()
				}
			},
			cell: {
				shrink: function(a) {
					a = a.range;
					var b = a.startContainer,
						c = a.endContainer,
						d = a.startOffset,
						e = a.endOffset;
					b.type == CKEDITOR.NODE_ELEMENT && b.equals(c) && b.is("tr") && ++d == e && a.shrink(CKEDITOR.SHRINK_TEXT)
				}
			}
		};
		A = function() {
			function a(b, c) {
				var d = b.getParent();
				if (d.is(CKEDITOR.dtd.$inline)) b[c ? "insertBefore" : "insertAfter"](d)
			}

			function b(c, d, e) {
				a(d);
				a(e, 1);
				for (var g; g = e.getNext();) g.insertAfter(d), d = g;
				p(c) && c.remove()
			}

			function c(a, b) {
				var d = new CKEDITOR.dom.range(a);
				d.setStartAfter(b.startNode);
				d.setEndBefore(b.endNode);
				return d
			}
			return {
				list: {
					detectMerge: function(a, b) {
						var d = c(b, a.bookmark),
							e = d.startPath(),
							g = d.endPath(),
							f = e.contains(CKEDITOR.dtd.$list),
							h = g.contains(CKEDITOR.dtd.$list);
						a.mergeList = f && h && f.getParent().equals(h.getParent()) && !f.equals(h);
						a.mergeListItems = e.block && g.block && e.block.is(CKEDITOR.dtd.$listItem) && g.block.is(CKEDITOR.dtd.$listItem);
						if (a.mergeList || a.mergeListItems) d = d.clone(), d.setStartBefore(a.bookmark.startNode), d.setEndAfter(a.bookmark.endNode), a.mergeListBookmark = d.createBookmark()
					},
					merge: function(a, c) {
						if (a.mergeListBookmark) {
							var d = a.mergeListBookmark.startNode,
								e = a.mergeListBookmark.endNode,
								g = new CKEDITOR.dom.elementPath(d, c),
								f = new CKEDITOR.dom.elementPath(e, c);
							if (a.mergeList) {
								var h = g.contains(CKEDITOR.dtd.$list),
									m = f.contains(CKEDITOR.dtd.$list);
								h.equals(m) || (m.moveChildren(h), m.remove())
							}
							a.mergeListItems && (g = g.contains(CKEDITOR.dtd.$listItem), f = f.contains(CKEDITOR.dtd.$listItem), g.equals(f) || b(f, d, e));
							d.remove();
							e.remove()
						}
					}
				},
				block: {
					detectMerge: function(a, b) {
						if (!a.tableContentsRanges && !a.mergeListBookmark) {
							var c = new CKEDITOR.dom.range(b);
							c.setStartBefore(a.bookmark.startNode);
							c.setEndAfter(a.bookmark.endNode);
							a.mergeBlockBookmark = c.createBookmark()
						}
					},
					merge: function(a, c) {
						if (a.mergeBlockBookmark && !a.purgeTableBookmark) {
							var d = a.mergeBlockBookmark.startNode,
								e = a.mergeBlockBookmark.endNode,
								g = new CKEDITOR.dom.elementPath(d, c),
								f = new CKEDITOR.dom.elementPath(e, c),
								g = g.block,
								f = f.block;
							g && f && !g.equals(f) && b(f, d, e);
							d.remove();
							e.remove()
						}
					}
				},
				table: function() {
					function a(c) {
						var e = [],
							g, f = new CKEDITOR.dom.walker(c),
							h = c.startPath().contains(d),
							m = c.endPath().contains(d),
							k = {};
						f.guard = function(a, f) {
							if (a.type == CKEDITOR.NODE_ELEMENT) {
								var l = "visited_" + (f ? "out" : "in");
								if (a.getCustomData(l)) return;
								CKEDITOR.dom.element.setMarker(k, a, l, 1)
							}
							if (f && h && a.equals(h)) g = c.clone(), g.setEndAt(h, CKEDITOR.POSITION_BEFORE_END), e.push(g);
							else if (!f && m && a.equals(m)) g = c.clone(), g.setStartAt(m, CKEDITOR.POSITION_AFTER_START), e.push(g);
							else {
								if (l = !f) l = a.type == CKEDITOR.NODE_ELEMENT && a.is(d) && (!h || b(a, h)) && (!m || b(a, m));
								l && (g = c.clone(), g.selectNodeContents(a), e.push(g))
							}
						};
						f.lastForward();
						CKEDITOR.dom.element.clearAllMarkers(k);
						return e
					}

					function b(a, c) {
						var d = CKEDITOR.POSITION_CONTAINS + CKEDITOR.POSITION_IS_CONTAINED,
							e = a.getPosition(c);
						return e === CKEDITOR.POSITION_IDENTICAL ? !1 : 0 === (e & d)
					}
					var d = {
						td: 1,
						th: 1,
						caption: 1
					};
					return {
						detectPurge: function(a) {
							var b = a.range,
								c = b.clone();
							c.enlarge(CKEDITOR.ENLARGE_ELEMENT);
							var c = new CKEDITOR.dom.walker(c),
								e = 0;
							c.evaluator = function(a) {
								a.type == CKEDITOR.NODE_ELEMENT && a.is(d) && ++e
							};
							c.checkForward();
							if (1 < e) {
								var c = b.startPath().contains("table"),
									g = b.endPath().contains("table");
								c && g && b.checkBoundaryOfElement(c, CKEDITOR.START) && b.checkBoundaryOfElement(g, CKEDITOR.END) && (b = a.range.clone(), b.setStartBefore(c), b.setEndAfter(g), a.purgeTableBookmark = b.createBookmark())
							}
						},
						detectRanges: function(e, g) {
							var f = c(g, e.bookmark),
								h = f.clone(),
								m, k, l = f.getCommonAncestor();
							l.is(CKEDITOR.dtd.$tableContent) && !l.is(d) && (l = l.getAscendant("table", !0));
							k = l;
							l = new CKEDITOR.dom.elementPath(f.startContainer, k);
							k = new CKEDITOR.dom.elementPath(f.endContainer, k);
							l = l.contains("table");
							k = k.contains("table");
							if (l || k) l && k && b(l, k) ? (e.tableSurroundingRange = h, h.setStartAt(l, CKEDITOR.POSITION_AFTER_END), h.setEndAt(k, CKEDITOR.POSITION_BEFORE_START), h = f.clone(), h.setEndAt(l, CKEDITOR.POSITION_AFTER_END), m = f.clone(), m.setStartAt(k, CKEDITOR.POSITION_BEFORE_START), m = a(h).concat(a(m))) : l ? k || (e.tableSurroundingRange = h, h.setStartAt(l, CKEDITOR.POSITION_AFTER_END), f.setEndAt(l, CKEDITOR.POSITION_AFTER_END)) : (e.tableSurroundingRange = h, h.setEndAt(k, CKEDITOR.POSITION_BEFORE_START), f.setStartAt(k, CKEDITOR.POSITION_AFTER_START)), e.tableContentsRanges = m ? m : a(f)
						},
						deleteRanges: function(a) {
							for (var b; b = a.tableContentsRanges.pop();) b.extractContents(),
								p(b.startContainer) && b.startContainer.appendBogus();
							a.tableSurroundingRange && a.tableSurroundingRange.extractContents()
						},
						purge: function(a) {
							if (a.purgeTableBookmark) {
								var b = a.doc,
									c = a.range.clone(),
									b = b.createElement("p");
								b.insertBefore(a.purgeTableBookmark.startNode);
								c.moveToBookmark(a.purgeTableBookmark);
								c.deleteContents();
								a.range.moveToPosition(b, CKEDITOR.POSITION_AFTER_START)
							}
						}
					}
				}(),
				detectExtractMerge: function(a) {
					return !(a.range.startPath().contains(CKEDITOR.dtd.$listItem) && a.range.endPath().contains(CKEDITOR.dtd.$listItem))
				},
				fixUneditableRangePosition: function(a) {
					a.startContainer.getDtd()["#"] || a.moveToClosestEditablePosition(null, !0)
				},
				autoParagraph: function(a, b) {
					var c = b.startPath(),
						e;
					k(a, c.block, c.blockLimit) && (e = d(a)) && (e = b.document.createElement(e), e.appendBogus(), b.insertNode(e), b.moveToPosition(e, CKEDITOR.POSITION_AFTER_START))
				}
			}
		}()
	}(), function() {
		function a(a, b) {
			if (0 === a.length) return !1;
			var c, d;
			if ((c = !b && 1 === a.length) && !(c = a[0].collapsed)) {
				var e = a[0];
				c = e.startContainer.getAscendant({
					td: 1,
					th: 1
				}, !0);
				var g = e.endContainer.getAscendant({
					td: 1,
					th: 1
				}, !0);
				d = CKEDITOR.tools.trim;
				c && c.equals(g) && !c.findOne("td, th, tr, tbody, table") ? (e = e.cloneContents(), c = e.getFirst() ? d(e.getFirst().getText()) !== d(c.getText()) : !0) : c = !1
			}
			if (c) return !1;
			for (d = 0; d < a.length; d++)
				if (c = a[d]._getTableElement(), !c) return !1;
			return !0
		}

		function f(a) {
			function b(a) {
				a = a.find("td, th");
				var c = [],
					d;
				for (d = 0; d < a.count(); d++) c.push(a.getItem(d));
				return c
			}
			var c = [],
				d, e;
			for (e = 0; e < a.length; e++) d = a[e]._getTableElement(), d.is && d.is({
				td: 1,
				th: 1
			}) ? c.push(d) : c = c.concat(b(d));
			return c
		}

		function b(a) {
			a = f(a);
			var b = "",
				c = [],
				d, e;
			for (e = 0; e < a.length; e++) d && !d.equals(a[e].getAscendant("tr")) ? (b += c.join("\t") + "\n", d = a[e].getAscendant("tr"), c = []) : 0 === e && (d = a[e].getAscendant("tr")), c.push(a[e].getText());
			return b += c.join("\t")
		}

		function c(a) {
			var c = this.root.editor,
				d = c.getSelection(1);
			this.reset();
			A = !0;
			d.root.once("selectionchange", function(a) {
				a.cancel()
			}, null, null, 0);
			d.selectRanges([a[0]]);
			d = this._.cache;
			d.ranges = new CKEDITOR.dom.rangeList(a);
			d.type = CKEDITOR.SELECTION_TEXT;
			d.selectedElement = a[0]._getTableElement();
			d.selectedText = b(a);
			d.nativeSel = null;
			this.isFake = 1;
			this.rev = u++;
			c._.fakeSelection = this;
			A = !1;
			this.root.fire("selectionchange")
		}

		function e() {
			var b = this._.fakeSelection,
				c;
			if (b) {
				c = this.getSelection(1);
				var d;
				if (!(d = !c) && (d = !c.isHidden())) {
					d = b;
					var e = c.getRanges(),
						g = d.getRanges(),
						f = e.length && e[0]._getTableElement() && e[0]._getTableElement().getAscendant("table", !0),
						h = g.length && g[0]._getTableElement() && g[0]._getTableElement().getAscendant("table", !0),
						m = 1 === e.length && e[0]._getTableElement() && e[0]._getTableElement().is("table"),
						k = 1 === g.length && g[0]._getTableElement() && g[0]._getTableElement().is("table"),
						l = 1 === e.length && e[0].collapsed,
						g = a(e, !!CKEDITOR.env.webkit) && a(g);
					f = f && h ? f.equals(h) || h.contains(f) : !1;
					f && (l || g) ? (m && !k && d.selectRanges(e), d = !0) : d = !1;
					d = !d
				}
				d && (b.reset(), b = 0)
			}
			if (!b && (b = c || this.getSelection(1), !b || b.getType() == CKEDITOR.SELECTION_NONE)) return;
			this.fire("selectionCheck", b);
			c = this.elementPath();
			c.compare(this._.selectionPreviousPath) || (d = this._.selectionPreviousPath && this._.selectionPreviousPath.blockLimit.equals(c.blockLimit), CKEDITOR.env.webkit && !d && (this._.previousActive = this.document.getActive()), this._.selectionPreviousPath = c, this.fire("selectionChange", {
				selection: b,
				path: c
			}))
		}

		function l() {
			w = !0;
			q || (k.call(this), q = CKEDITOR.tools.setTimeout(k, 200, this))
		}

		function k() {
			q = null;
			w && (CKEDITOR.tools.setTimeout(e, 0, this), w = !1)
		}

		function d(a) {
			return B(a) || a.type == CKEDITOR.NODE_ELEMENT && !a.is(CKEDITOR.dtd.$empty) ? !0 : !1
		}

		function h(a) {
			function b(c, d) {
				return c && c.type != CKEDITOR.NODE_TEXT ? a.clone()["moveToElementEdit" + (d ? "End" : "Start")](c) : !1
			}
			if (!(a.root instanceof CKEDITOR.editable)) return !1;
			var c = a.startContainer,
				e = a.getPreviousNode(d, null, c),
				g = a.getNextNode(d, null, c);
			return b(e) || b(g, 1) || !(e || g || c.type == CKEDITOR.NODE_ELEMENT && c.isBlockBoundary() && c.getBogus()) ? !0 : !1
		}

		function m(a) {
			g(a, !1);
			var b = a.getDocument().createText(t);
			a.setCustomData("cke-fillingChar", b);
			return b
		}

		function g(a, b) {
			var c = a && a.removeCustomData("cke-fillingChar");
			if (c) {
				if (!1 !== b) {
					var d = a.getDocument().getSelection().getNative(),
						e = d && "None" != d.type && d.getRangeAt(0),
						g = t.length;
					if (c.getLength() > g && e && e.intersectsNode(c.$)) {
						var f = [{
							node: d.anchorNode,
							offset: d.anchorOffset
						}, {
							node: d.focusNode,
							offset: d.focusOffset
						}];
						d.anchorNode == c.$ && d.anchorOffset > g && (f[0].offset -= g);
						d.focusNode == c.$ && d.focusOffset > g && (f[1].offset -= g)
					}
				}
				c.setText(n(c.getText(), 1));
				f && (c = a.getDocument().$, d = c.getSelection(), c = c.createRange(), c.setStart(f[0].node, f[0].offset), c.collapse(!0), d.removeAllRanges(), d.addRange(c), d.extend(f[1].node, f[1].offset))
			}
		}

		function n(a, b) {
			return b ? a.replace(y, function(a, b) {
				return b ? " " : ""
			}) : a.replace(t, "")
		}

		function p(a, b) {
			var c = CKEDITOR.dom.element.createFromHtml('\x3cdiv data-cke-hidden-sel\x3d"1" data-cke-temp\x3d"1" style\x3d"' + (CKEDITOR.env.ie && 14 > CKEDITOR.env.version ? "display:none" : "position:fixed;top:0;left:-1000px") + '"\x3e' + (b || "\x26nbsp;") + "\x3c/div\x3e", a.document);
			a.fire("lockSnapshot");
			a.editable().append(c);
			var d = a.getSelection(1),
				e = a.createRange(),
				g = d.root.on("selectionchange", function(a) {
					a.cancel()
				}, null, null, 0);
			e.setStartAt(c, CKEDITOR.POSITION_AFTER_START);
			e.setEndAt(c, CKEDITOR.POSITION_BEFORE_END);
			d.selectRanges([e]);
			g.removeListener();
			a.fire("unlockSnapshot");
			a._.hiddenSelectionContainer = c
		}

		function r(a) {
			var b = {
				37: 1,
				39: 1,
				8: 1,
				46: 1
			};
			return function(c) {
				var d = c.data.getKeystroke();
				if (b[d]) {
					var e = a.getSelection().getRanges(),
						g = e[0];
					1 == e.length && g.collapsed && (d = g[38 > d ? "getPreviousEditableNode" : "getNextEditableNode"]()) && d.type == CKEDITOR.NODE_ELEMENT && "false" == d.getAttribute("contenteditable") && (a.getSelection().fake(d), c.data.preventDefault(), c.cancel())
				}
			}
		}

		function x(a) {
			for (var b = 0; b < a.length; b++) {
				var c = a[b];
				c.getCommonAncestor().isReadOnly() && a.splice(b, 1);
				if (!c.collapsed) {
					if (c.startContainer.isReadOnly())
						for (var d = c.startContainer, e; d && !((e = d.type == CKEDITOR.NODE_ELEMENT) && d.is("body") || !d.isReadOnly());) e && "false" == d.getAttribute("contentEditable") && c.setStartAfter(d), d = d.getParent();
					d = c.startContainer;
					e = c.endContainer;
					var g = c.startOffset,
						f = c.endOffset,
						h = c.clone();
					d && d.type == CKEDITOR.NODE_TEXT && (g >= d.getLength() ? h.setStartAfter(d) : h.setStartBefore(d));
					e && e.type == CKEDITOR.NODE_TEXT && (f ? h.setEndAfter(e) : h.setEndBefore(e));
					d = new CKEDITOR.dom.walker(h);
					d.evaluator = function(d) {
						if (d.type == CKEDITOR.NODE_ELEMENT && d.isReadOnly()) {
							var e = c.clone();
							c.setEndBefore(d);
							c.collapsed && a.splice(b--, 1);
							d.getPosition(h.endContainer) & CKEDITOR.POSITION_CONTAINS || (e.setStartAfter(d), e.collapsed || a.splice(b + 1, 0, e));
							return !0
						}
						return !1
					};
					d.next()
				}
			}
			return a
		}
		var v = "function" != typeof window.getSelection,
			u = 1,
			t = CKEDITOR.tools.repeat("​", 7),
			y = new RegExp(t + "( )?", "g"),
			A, q, w, B = CKEDITOR.dom.walker.invisible(1),
			z = function() {
				function a(b) {
					return function(a) {
						var c = a.editor.createRange();
						c.moveToClosestEditablePosition(a.selected, b) && a.editor.getSelection().selectRanges([c]);
						return !1
					}
				}

				function b(a) {
					return function(b) {
						var c = b.editor,
							d = c.createRange(),
							e;
						(e = d.moveToClosestEditablePosition(b.selected, a)) || (e = d.moveToClosestEditablePosition(b.selected, !a));
						e && c.getSelection().selectRanges([d]);
						c.fire("saveSnapshot");
						b.selected.remove();
						e || (d.moveToElementEditablePosition(c.editable()), c.getSelection().selectRanges([d]));
						c.fire("saveSnapshot");
						return !1
					}
				}
				var c = a(),
					d = a(1);
				return {
					37: c,
					38: c,
					39: d,
					40: d,
					8: b(),
					46: b(1)
				}
			}();
		CKEDITOR.on("instanceCreated", function(a) {
			function b() {
				var a = c.getSelection();
				a && a.removeAllRanges()
			}
			var c = a.editor;
			c.on("contentDom", function() {
				function a() {
					u = new CKEDITOR.dom.selection(c.getSelection());
					u.lock()
				}

				function b() {
					h.removeListener("mouseup", b);
					q.removeListener("mouseup", b);
					var a = CKEDITOR.document.$.selection,
						c = a.createRange();
					"None" != a.type && c.parentElement().ownerDocument == f.$ && c.select()
				}

				function d(a) {
					if (CKEDITOR.env.ie) {
						var b = (a = a.getRanges()[0]) ? a.startContainer.getAscendant(function(a) {
							return a.type == CKEDITOR.NODE_ELEMENT && ("false" == a.getAttribute("contenteditable") || "true" == a.getAttribute("contenteditable"))
						}, !0) : null;
						return a && "false" == b.getAttribute("contenteditable") && b
					}
				}
				var f = c.document,
					h = CKEDITOR.document,
					m = c.editable(),
					k = f.getBody(),
					q = f.getDocumentElement(),
					n = m.isInline(),
					t, u;
				CKEDITOR.env.gecko && m.attachListener(m, "focus", function(a) {
					a.removeListener();
					0 !== t && (a = c.getSelection().getNative()) && a.isCollapsed && a.anchorNode == m.$ && (a = c.createRange(), a.moveToElementEditStart(m), a.select())
				}, null, null, -2);
				m.attachListener(m, CKEDITOR.env.webkit ? "DOMFocusIn" : "focus", function() {
					t && CKEDITOR.env.webkit && (t = c._.previousActive && c._.previousActive.equals(f.getActive())) && null != c._.previousScrollTop && c._.previousScrollTop != m.$.scrollTop && (m.$.scrollTop = c._.previousScrollTop);
					c.unlockSelection(t);
					t = 0
				}, null, null, -1);
				m.attachListener(m, "mousedown", function() {
					t = 0
				});
				if (CKEDITOR.env.ie || n) v ? m.attachListener(m, "beforedeactivate", a, null, null, -1) : m.attachListener(c, "selectionCheck", a, null, null, -1), m.attachListener(m, CKEDITOR.env.webkit ? "DOMFocusOut" : "blur", function() {
					c.lockSelection(u);
					t = 1
				}, null, null, -1), m.attachListener(m, "mousedown", function() {
					t = 0
				});
				if (CKEDITOR.env.ie && !n) {
					var y;
					m.attachListener(m, "mousedown", function(a) {
						2 == a.data.$.button && ((a = c.document.getSelection()) && a.getType() != CKEDITOR.SELECTION_NONE || (y = c.window.getScrollPosition()))
					});
					m.attachListener(m, "mouseup", function(a) {
						2 == a.data.$.button && y && (c.document.$.documentElement.scrollLeft = y.x, c.document.$.documentElement.scrollTop = y.y);
						y = null
					});
					if ("BackCompat" != f.$.compatMode) {
						if (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) {
							var p, w;
							q.on("mousedown", function(a) {
								function b(a) {
									a = a.data.$;
									if (p) {
										var c = k.$.createTextRange();
										try {
											c.moveToPoint(a.clientX, a.clientY)
										} catch (d) {}
										p.setEndPoint(0 > w.compareEndPoints("StartToStart", c) ? "EndToEnd" : "StartToStart", c);
										p.select()
									}
								}

								function c() {
									q.removeListener("mousemove", b);
									h.removeListener("mouseup", c);
									q.removeListener("mouseup", c);
									p.select()
								}
								a = a.data;
								if (a.getTarget().is("html") && a.$.y < q.$.clientHeight && a.$.x < q.$.clientWidth) {
									p = k.$.createTextRange();
									try {
										p.moveToPoint(a.$.clientX, a.$.clientY)
									} catch (d) {}
									w = p.duplicate();
									q.on("mousemove", b);
									h.on("mouseup", c);
									q.on("mouseup", c)
								}
							})
						}
						if (7 < CKEDITOR.env.version && 11 > CKEDITOR.env.version) q.on("mousedown", function(a) {
							a.data.getTarget().is("html") && (h.on("mouseup", b), q.on("mouseup", b))
						})
					}
				}
				m.attachListener(m, "selectionchange", e, c);
				m.attachListener(m, "keyup", l, c);
				m.attachListener(m, "keydown", function(a) {
					var b = this.getSelection(1);
					d(b) && (b.selectElement(d(b)), a.data.preventDefault())
				}, c);
				m.attachListener(m, CKEDITOR.env.webkit ? "DOMFocusIn" : "focus", function() {
					c.forceNextSelectionCheck();
					c.selectionChange(1)
				});
				if (n && (CKEDITOR.env.webkit || CKEDITOR.env.gecko)) {
					var x;
					m.attachListener(m, "mousedown", function() {
						x = 1
					});
					m.attachListener(f.getDocumentElement(), "mouseup", function() {
						x && l.call(c);
						x = 0
					})
				} else m.attachListener(CKEDITOR.env.ie ? m : f.getDocumentElement(), "mouseup", l, c);
				CKEDITOR.env.webkit && m.attachListener(f, "keydown", function(a) {
					switch (a.data.getKey()) {
						case 13:
						case 33:
						case 34:
						case 35:
						case 36:
						case 37:
						case 39:
						case 8:
						case 45:
						case 46:
							m.hasFocus && g(m)
					}
				}, null, null, -1);
				m.attachListener(m, "keydown", r(c), null, null, -1)
			});
			c.on("setData", function() {
				c.unlockSelection();
				CKEDITOR.env.webkit && b()
			});
			c.on("contentDomUnload", function() {
				c.unlockSelection()
			});
			if (CKEDITOR.env.ie9Compat) c.on("beforeDestroy", b, null, null, 9);
			c.on("dataReady", function() {
				delete c._.fakeSelection;
				delete c._.hiddenSelectionContainer;
				c.selectionChange(1)
			});
			c.on("loadSnapshot", function() {
				var a = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_ELEMENT),
					b = c.editable().getLast(a);
				b && b.hasAttribute("data-cke-hidden-sel") && (b.remove(), CKEDITOR.env.gecko && (a = c.editable().getFirst(a)) && a.is("br") && a.getAttribute("_moz_editor_bogus_node") && a.remove())
			}, null, null, 100);
			c.on("key", function(a) {
				if ("wysiwyg" == c.mode) {
					var b = c.getSelection();
					if (b.isFake) {
						var d = z[a.data.keyCode];
						if (d) return d({
							editor: c,
							selected: b.getSelectedElement(),
							selection: b,
							keyEvent: a
						})
					}
				}
			})
		});
		if (CKEDITOR.env.webkit) CKEDITOR.on("instanceReady", function(a) {
			var b = a.editor;
			b.on("selectionChange", function() {
				var a = b.editable(),
					c = a.getCustomData("cke-fillingChar");
				c && (c.getCustomData("ready") ? (g(a), a.editor.fire("selectionCheck")) : c.setCustomData("ready", 1))
			}, null, null, -1);
			b.on("beforeSetMode", function() {
				g(b.editable())
			}, null, null, -1);
			b.on("getSnapshot", function(a) {
				a.data && (a.data = n(a.data))
			}, b, null, 20);
			b.on("toDataFormat", function(a) {
				a.data.dataValue = n(a.data.dataValue)
			}, null, null, 0)
		});
		CKEDITOR.editor.prototype.selectionChange = function(a) {
			(a ? e : l).call(this)
		};
		CKEDITOR.editor.prototype.getSelection = function(a) {
			return !this._.savedSelection && !this._.fakeSelection || a ? (a = this.editable()) && "wysiwyg" == this.mode ? new CKEDITOR.dom.selection(a) : null : this._.savedSelection || this._.fakeSelection
		};
		CKEDITOR.editor.prototype.lockSelection = function(a) {
			a = a || this.getSelection(1);
			return a.getType() != CKEDITOR.SELECTION_NONE ? (!a.isLocked && a.lock(), this._.savedSelection = a, !0) : !1
		};
		CKEDITOR.editor.prototype.unlockSelection = function(a) {
			var b = this._.savedSelection;
			return b ? (b.unlock(a), delete this._.savedSelection, !0) : !1
		};
		CKEDITOR.editor.prototype.forceNextSelectionCheck = function() {
			delete this._.selectionPreviousPath
		};
		CKEDITOR.dom.document.prototype.getSelection = function() {
			return new CKEDITOR.dom.selection(this)
		};
		CKEDITOR.dom.range.prototype.select = function() {
			var a = this.root instanceof CKEDITOR.editable ? this.root.editor.getSelection() : new CKEDITOR.dom.selection(this.root);
			a.selectRanges([this]);
			return a
		};
		CKEDITOR.SELECTION_NONE = 1;
		CKEDITOR.SELECTION_TEXT = 2;
		CKEDITOR.SELECTION_ELEMENT = 3;
		CKEDITOR.dom.selection = function(a) {
			if (a instanceof CKEDITOR.dom.selection) {
				var b = a;
				a = a.root
			}
			var c = a instanceof CKEDITOR.dom.element;
			this.rev = b ? b.rev : u++;
			this.document = a instanceof CKEDITOR.dom.document ? a : a.getDocument();
			this.root = c ? a : this.document.getBody();
			this.isLocked = 0;
			this._ = {
				cache: {}
			};
			if (b) return CKEDITOR.tools.extend(this._.cache, b._.cache), this.isFake = b.isFake, this.isLocked = b.isLocked, this;
			a = this.getNative();
			var d, e;
			if (a)
				if (a.getRangeAt) d = (e = a.rangeCount && a.getRangeAt(0)) && new CKEDITOR.dom.node(e.commonAncestorContainer);
				else {
					try {
						e = a.createRange()
					} catch (g) {}
					d = e && CKEDITOR.dom.element.get(e.item && e.item(0) || e.parentElement())
				}
			if (!d || d.type != CKEDITOR.NODE_ELEMENT && d.type != CKEDITOR.NODE_TEXT || !this.root.equals(d) && !this.root.contains(d)) this._.cache.type = CKEDITOR.SELECTION_NONE, this._.cache.startElement = null, this._.cache.selectedElement = null, this._.cache.selectedText = "", this._.cache.ranges = new CKEDITOR.dom.rangeList;
			return this
		};
		var C = {
			img: 1,
			hr: 1,
			li: 1,
			table: 1,
			tr: 1,
			td: 1,
			th: 1,
			embed: 1,
			object: 1,
			ol: 1,
			ul: 1,
			a: 1,
			input: 1,
			form: 1,
			select: 1,
			textarea: 1,
			button: 1,
			fieldset: 1,
			thead: 1,
			tfoot: 1
		};
		CKEDITOR.tools.extend(CKEDITOR.dom.selection, {
			_removeFillingCharSequenceString: n,
			_createFillingCharSequenceNode: m,
			FILLING_CHAR_SEQUENCE: t
		});
		CKEDITOR.dom.selection.prototype = {
			getNative: function() {
				return void 0 !== this._.cache.nativeSel ? this._.cache.nativeSel : this._.cache.nativeSel = v ? this.document.$.selection : this.document.getWindow().$.getSelection()
			},
			getType: v ? function() {
				var a = this._.cache;
				if (a.type) return a.type;
				var b = CKEDITOR.SELECTION_NONE;
				try {
					var c = this.getNative(),
						d = c.type;
					"Text" == d && (b = CKEDITOR.SELECTION_TEXT);
					"Control" == d && (b = CKEDITOR.SELECTION_ELEMENT);
					c.createRange().parentElement() && (b = CKEDITOR.SELECTION_TEXT)
				} catch (e) {}
				return a.type = b
			} : function() {
				var a = this._.cache;
				if (a.type) return a.type;
				var b = CKEDITOR.SELECTION_TEXT,
					c = this.getNative();
				if (!c || !c.rangeCount) b = CKEDITOR.SELECTION_NONE;
				else if (1 == c.rangeCount) {
					var c = c.getRangeAt(0),
						d = c.startContainer;
					d == c.endContainer && 1 == d.nodeType && 1 == c.endOffset - c.startOffset && C[d.childNodes[c.startOffset].nodeName.toLowerCase()] && (b = CKEDITOR.SELECTION_ELEMENT)
				}
				return a.type = b
			},
			getRanges: function() {
				var a = v ? function() {
					function a(b) {
						return (new CKEDITOR.dom.node(b)).getIndex()
					}
					var b = function(b, c) {
						b = b.duplicate();
						b.collapse(c);
						var d = b.parentElement();
						if (!d.hasChildNodes()) return {
							container: d,
							offset: 0
						};
						for (var e = d.children, g, f, h = b.duplicate(), m = 0, k = e.length - 1, l = -1, q, n; m <= k;)
							if (l = Math.floor((m + k) / 2), g = e[l], h.moveToElementText(g), q = h.compareEndPoints("StartToStart", b), 0 < q) k = l - 1;
							else if (0 > q) m = l + 1;
						else return {
							container: d,
							offset: a(g)
						};
						if (-1 == l || l == e.length - 1 && 0 > q) {
							h.moveToElementText(d);
							h.setEndPoint("StartToStart", b);
							h = h.text.replace(/(\r\n|\r)/g, "\n").length;
							e = d.childNodes;
							if (!h) return g = e[e.length - 1], g.nodeType != CKEDITOR.NODE_TEXT ? {
								container: d,
								offset: e.length
							} : {
								container: g,
								offset: g.nodeValue.length
							};
							for (d = e.length; 0 < h && 0 < d;) f = e[--d], f.nodeType == CKEDITOR.NODE_TEXT && (n = f, h -= f.nodeValue.length);
							return {
								container: n,
								offset: -h
							}
						}
						h.collapse(0 < q ? !0 : !1);
						h.setEndPoint(0 < q ? "StartToStart" : "EndToStart", b);
						h = h.text.replace(/(\r\n|\r)/g, "\n").length;
						if (!h) return {
							container: d,
							offset: a(g) + (0 < q ? 0 : 1)
						};
						for (; 0 < h;) try {
							f = g[0 < q ? "previousSibling" : "nextSibling"], f.nodeType == CKEDITOR.NODE_TEXT && (h -= f.nodeValue.length, n = f), g = f
						} catch (t) {
							return {
								container: d,
								offset: a(g)
							}
						}
						return {
							container: n,
							offset: 0 < q ? -h : n.nodeValue.length + h
						}
					};
					return function() {
						var a = this.getNative(),
							c = a && a.createRange(),
							d = this.getType();
						if (!a) return [];
						if (d == CKEDITOR.SELECTION_TEXT) return a = new CKEDITOR.dom.range(this.root),
							d = b(c, !0), a.setStart(new CKEDITOR.dom.node(d.container), d.offset), d = b(c), a.setEnd(new CKEDITOR.dom.node(d.container), d.offset), a.endContainer.getPosition(a.startContainer) & CKEDITOR.POSITION_PRECEDING && a.endOffset <= a.startContainer.getIndex() && a.collapse(), [a];
						if (d == CKEDITOR.SELECTION_ELEMENT) {
							for (var d = [], e = 0; e < c.length; e++) {
								for (var g = c.item(e), f = g.parentNode, h = 0, a = new CKEDITOR.dom.range(this.root); h < f.childNodes.length && f.childNodes[h] != g; h++);
								a.setStart(new CKEDITOR.dom.node(f), h);
								a.setEnd(new CKEDITOR.dom.node(f), h + 1);
								d.push(a)
							}
							return d
						}
						return []
					}
				}() : function() {
					var a = [],
						b, c = this.getNative();
					if (!c) return a;
					for (var d = 0; d < c.rangeCount; d++) {
						var e = c.getRangeAt(d);
						b = new CKEDITOR.dom.range(this.root);
						b.setStart(new CKEDITOR.dom.node(e.startContainer), e.startOffset);
						b.setEnd(new CKEDITOR.dom.node(e.endContainer), e.endOffset);
						a.push(b)
					}
					return a
				};
				return function(b) {
					var c = this._.cache,
						d = c.ranges;
					d || (c.ranges = d = new CKEDITOR.dom.rangeList(a.call(this)));
					return b ? x(new CKEDITOR.dom.rangeList(d.slice())) : d
				}
			}(),
			getStartElement: function() {
				var a = this._.cache;
				if (void 0 !== a.startElement) return a.startElement;
				var b;
				switch (this.getType()) {
					case CKEDITOR.SELECTION_ELEMENT:
						return this.getSelectedElement();
					case CKEDITOR.SELECTION_TEXT:
						var c = this.getRanges()[0];
						if (c) {
							if (c.collapsed) b = c.startContainer, b.type != CKEDITOR.NODE_ELEMENT && (b = b.getParent());
							else {
								for (c.optimize(); b = c.startContainer, c.startOffset == (b.getChildCount ? b.getChildCount() : b.getLength()) && !b.isBlockBoundary();) c.setStartAfter(b);
								b = c.startContainer;
								if (b.type != CKEDITOR.NODE_ELEMENT) return b.getParent();
								if ((b = b.getChild(c.startOffset)) && b.type == CKEDITOR.NODE_ELEMENT)
									for (c = b.getFirst(); c && c.type == CKEDITOR.NODE_ELEMENT;) b = c, c = c.getFirst();
								else b = c.startContainer
							}
							b = b.$
						}
				}
				return a.startElement = b ? new CKEDITOR.dom.element(b) : null
			},
			getSelectedElement: function() {
				var a = this._.cache;
				if (void 0 !== a.selectedElement) return a.selectedElement;
				var b = this,
					c = CKEDITOR.tools.tryThese(function() {
						return b.getNative().createRange().item(0)
					}, function() {
						for (var a = b.getRanges()[0].clone(), c, d, e = 2; e && !((c = a.getEnclosedNode()) && c.type == CKEDITOR.NODE_ELEMENT && C[c.getName()] && (d = c)); e--) a.shrink(CKEDITOR.SHRINK_ELEMENT);
						return d && d.$
					});
				return a.selectedElement = c ? new CKEDITOR.dom.element(c) : null
			},
			getSelectedText: function() {
				var a = this._.cache;
				if (void 0 !== a.selectedText) return a.selectedText;
				var b = this.getNative(),
					b = v ? "Control" == b.type ? "" : b.createRange().text : b.toString();
				return a.selectedText = b
			},
			lock: function() {
				this.getRanges();
				this.getStartElement();
				this.getSelectedElement();
				this.getSelectedText();
				this._.cache.nativeSel = null;
				this.isLocked = 1
			},
			unlock: function(b) {
				if (this.isLocked) {
					if (b) var d = this.getSelectedElement(),
						e = this.getRanges(),
						g = this.isFake;
					this.isLocked = 0;
					this.reset();
					b && (b = d || e[0] && e[0].getCommonAncestor()) && b.getAscendant("body", 1) && (a(e) ? c.call(this, e) : g ? this.fake(d) : d ? this.selectElement(d) : this.selectRanges(e))
				}
			},
			reset: function() {
				this._.cache = {};
				this.isFake = 0;
				var a = this.root.editor;
				if (a && a._.fakeSelection)
					if (this.rev == a._.fakeSelection.rev) {
						delete a._.fakeSelection;
						var b = a._.hiddenSelectionContainer;
						if (b) {
							var c = a.checkDirty();
							a.fire("lockSnapshot");
							b.remove();
							a.fire("unlockSnapshot");
							!c && a.resetDirty()
						}
						delete a._.hiddenSelectionContainer
					} else CKEDITOR.warn("selection-fake-reset");
				this.rev = u++
			},
			selectElement: function(a) {
				var b = new CKEDITOR.dom.range(this.root);
				b.setStartBefore(a);
				b.setEndAfter(a);
				this.selectRanges([b])
			},
			selectRanges: function(b) {
				var d = this.root.editor,
					e = d && d._.hiddenSelectionContainer;
				this.reset();
				if (e)
					for (var e = this.root, f, k = 0; k < b.length; ++k) f = b[k], f.endContainer.equals(e) && (f.endOffset = Math.min(f.endOffset, e.getChildCount()));
				if (b.length)
					if (this.isLocked) {
						var l = CKEDITOR.document.getActive();
						this.unlock();
						this.selectRanges(b);
						this.lock();
						l && !l.equals(this.root) && l.focus()
					} else {
						var q;
						a: {
							var n, t;
							if (1 == b.length && !(t = b[0]).collapsed && (q = t.getEnclosedNode()) && q.type == CKEDITOR.NODE_ELEMENT && (t = t.clone(), t.shrink(CKEDITOR.SHRINK_ELEMENT, !0), (n = t.getEnclosedNode()) && n.type == CKEDITOR.NODE_ELEMENT && (q = n), "false" == q.getAttribute("contenteditable"))) break a;q = void 0
						}
						if (q) this.fake(q);
						else if (d && d.plugins.tableselection && CKEDITOR.plugins.tableselection.isSupportedEnvironment && a(b) && !A) c.call(this, b);
						else {
							if (v) {
								n = CKEDITOR.dom.walker.whitespaces(!0);
								q = /\ufeff|\u00a0/;
								t = {
									table: 1,
									tbody: 1,
									tr: 1
								};
								1 < b.length && (d = b[b.length - 1], b[0].setEnd(d.endContainer, d.endOffset));
								d = b[0];
								b = d.collapsed;
								var u, y, p;
								if ((e = d.getEnclosedNode()) && e.type == CKEDITOR.NODE_ELEMENT && e.getName() in C && (!e.is("a") || !e.getText())) try {
									p = e.$.createControlRange();
									p.addElement(e.$);
									p.select();
									return
								} catch (w) {}
								if (d.startContainer.type == CKEDITOR.NODE_ELEMENT && d.startContainer.getName() in t || d.endContainer.type == CKEDITOR.NODE_ELEMENT && d.endContainer.getName() in t) d.shrink(CKEDITOR.NODE_ELEMENT, !0), b = d.collapsed;
								p = d.createBookmark();
								t = p.startNode;
								b || (l = p.endNode);
								p = d.document.$.body.createTextRange();
								p.moveToElementText(t.$);
								p.moveStart("character", 1);
								l ? (q = d.document.$.body.createTextRange(), q.moveToElementText(l.$), p.setEndPoint("EndToEnd", q), p.moveEnd("character", -1)) : (u = t.getNext(n), y = t.hasAscendant("pre"), u = !(u && u.getText && u.getText().match(q)) && (y || !t.hasPrevious() || t.getPrevious().is && t.getPrevious().is("br")), y = d.document.createElement("span"), y.setHtml("\x26#65279;"), y.insertBefore(t), u && d.document.createText("﻿").insertBefore(t));
								d.setStartBefore(t);
								t.remove();
								b ? (u ? (p.moveStart("character", -1), p.select(), d.document.$.selection.clear()) : p.select(), d.moveToPosition(y, CKEDITOR.POSITION_BEFORE_START), y.remove()) : (d.setEndBefore(l), l.remove(), p.select())
							} else {
								l = this.getNative();
								if (!l) return;
								this.removeAllRanges();
								for (p = 0; p < b.length; p++) {
									if (p < b.length - 1 && (u = b[p], y = b[p + 1], q = u.clone(), q.setStart(u.endContainer, u.endOffset), q.setEnd(y.startContainer, y.startOffset), !q.collapsed && (q.shrink(CKEDITOR.NODE_ELEMENT, !0), d = q.getCommonAncestor(), q = q.getEnclosedNode(), d.isReadOnly() || q && q.isReadOnly()))) {
										y.setStart(u.startContainer, u.startOffset);
										b.splice(p--, 1);
										continue
									}
									d = b[p];
									y = this.document.$.createRange();
									d.collapsed && CKEDITOR.env.webkit && h(d) && (q = m(this.root), d.insertNode(q), (u = q.getNext()) && !q.getPrevious() && u.type == CKEDITOR.NODE_ELEMENT && "br" == u.getName() ? (g(this.root), d.moveToPosition(u, CKEDITOR.POSITION_BEFORE_START)) : d.moveToPosition(q, CKEDITOR.POSITION_AFTER_END));
									y.setStart(d.startContainer.$, d.startOffset);
									try {
										y.setEnd(d.endContainer.$, d.endOffset)
									} catch (x) {
										if (0 <= x.toString().indexOf("NS_ERROR_ILLEGAL_VALUE")) d.collapse(1), y.setEnd(d.endContainer.$, d.endOffset);
										else throw x;
									}
									l.addRange(y)
								}
							}
							this.reset();
							this.root.fire("selectionchange")
						}
					}
			},
			fake: function(a, b) {
				var c = this.root.editor;
				void 0 === b && a.hasAttribute("aria-label") && (b = a.getAttribute("aria-label"));
				this.reset();
				p(c, b);
				var d = this._.cache,
					e = new CKEDITOR.dom.range(this.root);
				e.setStartBefore(a);
				e.setEndAfter(a);
				d.ranges = new CKEDITOR.dom.rangeList(e);
				d.selectedElement = d.startElement = a;
				d.type = CKEDITOR.SELECTION_ELEMENT;
				d.selectedText = d.nativeSel = null;
				this.isFake = 1;
				this.rev = u++;
				c._.fakeSelection = this;
				this.root.fire("selectionchange")
			},
			isHidden: function() {
				var a = this.getCommonAncestor();
				a && a.type == CKEDITOR.NODE_TEXT && (a = a.getParent());
				return !(!a || !a.data("cke-hidden-sel"))
			},
			isInTable: function() {
				return a(this.getRanges())
			},
			createBookmarks: function(a) {
				a = this.getRanges().createBookmarks(a);
				this.isFake && (a.isFake = 1);
				return a
			},
			createBookmarks2: function(a) {
				a = this.getRanges().createBookmarks2(a);
				this.isFake && (a.isFake = 1);
				return a
			},
			selectBookmarks: function(b) {
				for (var c = [], d, e = 0; e < b.length; e++) {
					var g = new CKEDITOR.dom.range(this.root);
					g.moveToBookmark(b[e]);
					c.push(g)
				}
				b.isFake && (d = a(c) ? c[0]._getTableElement() : c[0].getEnclosedNode(), d && d.type == CKEDITOR.NODE_ELEMENT || (CKEDITOR.warn("selection-not-fake"), b.isFake = 0));
				b.isFake && !a(c) ? this.fake(d) : this.selectRanges(c);
				return this
			},
			getCommonAncestor: function() {
				var a = this.getRanges();
				return a.length ? a[0].startContainer.getCommonAncestor(a[a.length - 1].endContainer) : null
			},
			scrollIntoView: function() {
				this.type != CKEDITOR.SELECTION_NONE && this.getRanges()[0].scrollIntoView()
			},
			removeAllRanges: function() {
				if (this.getType() != CKEDITOR.SELECTION_NONE) {
					var a = this.getNative();
					try {
						a && a[v ? "empty" : "removeAllRanges"]()
					} catch (b) {}
					this.reset()
				}
			}
		}
	}(), "use strict", CKEDITOR.STYLE_BLOCK = 1, CKEDITOR.STYLE_INLINE = 2, CKEDITOR.STYLE_OBJECT = 3, function() {
		function a(a, b) {
			for (var c, d;
				(a = a.getParent()) && !a.equals(b);)
				if (a.getAttribute("data-nostyle")) c = a;
				else if (!d) {
				var e = a.getAttribute("contentEditable");
				"false" == e ? c = a : "true" == e && (d = 1)
			}
			return c
		}

		function f(a, b, c, d) {
			return (a.getPosition(b) | d) == d && (!c.childRule || c.childRule(a))
		}

		function b(c) {
			var d = c.document;
			if (c.collapsed) d = t(this, d), c.insertNode(d), c.moveToPosition(d, CKEDITOR.POSITION_BEFORE_END);
			else {
				var g = this.element,
					h = this._.definition,
					m, k = h.ignoreReadonly,
					l = k || h.includeReadonly;
				null == l && (l = c.root.getCustomData("cke_includeReadonly"));
				var q = CKEDITOR.dtd[g];
				q || (m = !0, q = CKEDITOR.dtd.span);
				c.enlarge(CKEDITOR.ENLARGE_INLINE, 1);
				c.trim();
				var n = c.createBookmark(),
					u = n.startNode,
					y = n.endNode,
					p = u,
					v;
				if (!k) {
					var w = c.getCommonAncestor(),
						k = a(u, w),
						w = a(y, w);
					k && (p = k.getNextSourceNode(!0));
					w && (y = w)
				}
				for (p.getPosition(y) == CKEDITOR.POSITION_FOLLOWING && (p = 0); p;) {
					k = !1;
					if (p.equals(y)) p = null, k = !0;
					else {
						var A = p.type == CKEDITOR.NODE_ELEMENT ? p.getName() : null,
							w = A && "false" == p.getAttribute("contentEditable"),
							r = A && p.getAttribute("data-nostyle");
						if (A && p.data("cke-bookmark")) {
							p = p.getNextSourceNode(!0);
							continue
						}
						if (w && l && CKEDITOR.dtd.$block[A])
							for (var B = p, z = e(B), C = void 0, E = z.length, da = 0, B = E && new CKEDITOR.dom.range(B.getDocument()); da < E; ++da) {
								var C = z[da],
									H = CKEDITOR.filter.instances[C.data("cke-filter")];
								if (H ? H.check(this) : 1) B.selectNodeContents(C), b.call(this, B)
							}
						z = A ? !q[A] || r ? 0 : w && !l ? 0 : f(p, y, h, M) : 1;
						if (z)
							if (C = p.getParent(), z = h, E = g, da = m, !C || !(C.getDtd() || CKEDITOR.dtd.span)[E] && !da || z.parentRule && !z.parentRule(C)) k = !0;
							else {
								if (v || A && CKEDITOR.dtd.$removeEmpty[A] && (p.getPosition(y) | M) != M || (v = c.clone(), v.setStartBefore(p)), A = p.type, A == CKEDITOR.NODE_TEXT || w || A == CKEDITOR.NODE_ELEMENT && !p.getChildCount()) {
									for (var A = p, G;
										(k = !A.getNext(J)) && (G = A.getParent(), q[G.getName()]) && f(G, u, h, L);) A = G;
									v.setEndAfter(A)
								}
							}
						else k = !0;
						p = p.getNextSourceNode(r || w)
					}
					if (k && v && !v.collapsed) {
						for (var k = t(this, d), w = k.hasAttributes(), r = v.getCommonAncestor(), A = {}, z = {}, C = {}, E = {}, ea, F, ha; k && r;) {
							if (r.getName() == g) {
								for (ea in h.attributes) !E[ea] && (ha = r.getAttribute(F)) && (k.getAttribute(ea) == ha ? z[ea] = 1 : E[ea] = 1);
								for (F in h.styles) !C[F] && (ha = r.getStyle(F)) && (k.getStyle(F) == ha ? A[F] = 1 : C[F] = 1)
							}
							r = r.getParent()
						}
						for (ea in z) k.removeAttribute(ea);
						for (F in A) k.removeStyle(F);
						w && !k.hasAttributes() && (k = null);
						k ? (v.extractContents().appendTo(k), v.insertNode(k), x.call(this, k), k.mergeSiblings(), CKEDITOR.env.ie || k.$.normalize()) : (k = new CKEDITOR.dom.element("span"), v.extractContents().appendTo(k), v.insertNode(k), x.call(this, k), k.remove(!0));
						v = null
					}
				}
				c.moveToBookmark(n);
				c.shrink(CKEDITOR.SHRINK_TEXT);
				c.shrink(CKEDITOR.NODE_ELEMENT, !0)
			}
		}

		function c(a) {
			function b() {
				for (var a = new CKEDITOR.dom.elementPath(d.getParent()), c = new CKEDITOR.dom.elementPath(l.getParent()), e = null, g = null, f = 0; f < a.elements.length; f++) {
					var h = a.elements[f];
					if (h == a.block || h == a.blockLimit) break;
					n.checkElementRemovable(h, !0) && (e = h)
				}
				for (f = 0; f < c.elements.length; f++) {
					h = c.elements[f];
					if (h == c.block || h == c.blockLimit) break;
					n.checkElementRemovable(h, !0) && (g = h)
				}
				g && l.breakParent(g);
				e && d.breakParent(e)
			}
			a.enlarge(CKEDITOR.ENLARGE_INLINE, 1);
			var c = a.createBookmark(),
				d = c.startNode,
				e = this._.definition.alwaysRemoveElement;
			if (a.collapsed) {
				for (var g = new CKEDITOR.dom.elementPath(d.getParent(), a.root), f, h = 0, m; h < g.elements.length && (m = g.elements[h]) && m != g.block && m != g.blockLimit; h++)
					if (this.checkElementRemovable(m)) {
						var k;
						!e && a.collapsed && (a.checkBoundaryOfElement(m, CKEDITOR.END) || (k = a.checkBoundaryOfElement(m, CKEDITOR.START))) ? (f = m, f.match = k ? "start" : "end") : (m.mergeSiblings(), m.is(this.element) ? r.call(this, m) : v(m, q(this)[m.getName()]))
					}
				if (f) {
					e = d;
					for (h = 0;; h++) {
						m = g.elements[h];
						if (m.equals(f)) break;
						else if (m.match) continue;
						else m = m.clone();
						m.append(e);
						e = m
					}
					e["start" == f.match ? "insertBefore" : "insertAfter"](f)
				}
			} else {
				var l = c.endNode,
					n = this;
				b();
				for (g = d; !g.equals(l);) f = g.getNextSourceNode(), g.type == CKEDITOR.NODE_ELEMENT && this.checkElementRemovable(g) && (g.getName() == this.element ? r.call(this, g) : v(g, q(this)[g.getName()]), f.type == CKEDITOR.NODE_ELEMENT && f.contains(d) && (b(), f = d.getNext())), g = f
			}
			a.moveToBookmark(c);
			a.shrink(CKEDITOR.NODE_ELEMENT, !0)
		}

		function e(a) {
			var b = [];
			a.forEach(function(a) {
				if ("true" == a.getAttribute("contenteditable")) return b.push(a), !1
			}, CKEDITOR.NODE_ELEMENT, !0);
			return b
		}

		function l(a) {
			var b = a.getEnclosedNode() || a.getCommonAncestor(!1, !0);
			(a = (new CKEDITOR.dom.elementPath(b, a.root)).contains(this.element, 1)) && !a.isReadOnly() && y(a, this)
		}

		function k(a) {
			var b = a.getCommonAncestor(!0, !0);
			if (a = (new CKEDITOR.dom.elementPath(b, a.root)).contains(this.element, 1)) {
				var b = this._.definition,
					c = b.attributes;
				if (c)
					for (var d in c) a.removeAttribute(d, c[d]);
				if (b.styles)
					for (var e in b.styles) b.styles.hasOwnProperty(e) && a.removeStyle(e)
			}
		}

		function d(a) {
			var b = a.createBookmark(!0),
				c = a.createIterator();
			c.enforceRealBlocks = !0;
			this._.enterMode && (c.enlargeBr = this._.enterMode != CKEDITOR.ENTER_BR);
			for (var d, e = a.document, g; d = c.getNextParagraph();) !d.isReadOnly() && (c.activeFilter ? c.activeFilter.check(this) : 1) && (g = t(this, e, d), m(d, g));
			a.moveToBookmark(b)
		}

		function h(a) {
			var b = a.createBookmark(1),
				c = a.createIterator();
			c.enforceRealBlocks = !0;
			c.enlargeBr = this._.enterMode != CKEDITOR.ENTER_BR;
			for (var d, e; d = c.getNextParagraph();) this.checkElementRemovable(d) && (d.is("pre") ? ((e = this._.enterMode == CKEDITOR.ENTER_BR ? null : a.document.createElement(this._.enterMode == CKEDITOR.ENTER_P ? "p" : "div")) && d.copyAttributes(e), m(d, e)) : r.call(this, d));
			a.moveToBookmark(b)
		}

		function m(a, b) {
			var c = !b;
			c && (b = a.getDocument().createElement("div"), a.copyAttributes(b));
			var d = b && b.is("pre"),
				e = a.is("pre"),
				f = !d && e;
			if (d && !e) {
				e = b;
				(f = a.getBogus()) && f.remove();
				f = a.getHtml();
				f = n(f, /(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g, "");
				f = f.replace(/[ \t\r\n]*(<br[^>]*>)[ \t\r\n]*/gi, "$1");
				f = f.replace(/([ \t\n\r]+|&nbsp;)/g, " ");
				f = f.replace(/<br\b[^>]*>/gi, "\n");
				if (CKEDITOR.env.ie) {
					var h = a.getDocument().createElement("div");
					h.append(e);
					e.$.outerHTML = "\x3cpre\x3e" + f + "\x3c/pre\x3e";
					e.copyAttributes(h.getFirst());
					e = h.getFirst().remove()
				} else e.setHtml(f);
				b = e
			} else f ? b = p(c ? [a.getHtml()] : g(a), b) : a.moveChildren(b);
			b.replace(a);
			if (d) {
				var c = b,
					m;
				(m = c.getPrevious(H)) && m.type == CKEDITOR.NODE_ELEMENT && m.is("pre") && (d = n(m.getHtml(), /\n$/, "") + "\n\n" + n(c.getHtml(), /^\n/, ""), CKEDITOR.env.ie ? c.$.outerHTML = "\x3cpre\x3e" + d + "\x3c/pre\x3e" : c.setHtml(d), m.remove())
			} else c && u(b)
		}

		function g(a) {
			var b = [];
			n(a.getOuterHtml(), /(\S\s*)\n(?:\s|(<span[^>]+data-cke-bookmark.*?\/span>))*\n(?!$)/gi, function(a, b, c) {
				return b + "\x3c/pre\x3e" + c + "\x3cpre\x3e"
			}).replace(/<pre\b.*?>([\s\S]*?)<\/pre>/gi, function(a, c) {
				b.push(c)
			});
			return b
		}

		function n(a, b, c) {
			var d = "",
				e = "";
			a = a.replace(/(^<span[^>]+data-cke-bookmark.*?\/span>)|(<span[^>]+data-cke-bookmark.*?\/span>$)/gi, function(a, b, c) {
				b && (d = b);
				c && (e = c);
				return ""
			});
			return d + a.replace(b, c) + e
		}

		function p(a, b) {
			var c;
			1 < a.length && (c = new CKEDITOR.dom.documentFragment(b.getDocument()));
			for (var d = 0; d < a.length; d++) {
				var e = a[d],
					e = e.replace(/(\r\n|\r)/g, "\n"),
					e = n(e, /^[ \t]*\n/, ""),
					e = n(e, /\n$/, ""),
					e = n(e, /^[ \t]+|[ \t]+$/g, function(a, b) {
						return 1 == a.length ? "\x26nbsp;" : b ? " " + CKEDITOR.tools.repeat("\x26nbsp;", a.length - 1) : CKEDITOR.tools.repeat("\x26nbsp;", a.length - 1) + " "
					}),
					e = e.replace(/\n/g, "\x3cbr\x3e"),
					e = e.replace(/[ \t]{2,}/g, function(a) {
						return CKEDITOR.tools.repeat("\x26nbsp;", a.length - 1) + " "
					});
				if (c) {
					var g = b.clone();
					g.setHtml(e);
					c.append(g)
				} else b.setHtml(e)
			}
			return c || b
		}

		function r(a, b) {
			var c = this._.definition,
				d = c.attributes,
				c = c.styles,
				e = q(this)[a.getName()],
				g = CKEDITOR.tools.isEmpty(d) && CKEDITOR.tools.isEmpty(c),
				f;
			for (f in d)
				if ("class" != f && !this._.definition.fullMatch || a.getAttribute(f) == w(f, d[f])) b && "data-" == f.slice(0, 5) || (g = a.hasAttribute(f), a.removeAttribute(f));
			for (var h in c) this._.definition.fullMatch && a.getStyle(h) != w(h, c[h], !0) || (g = g || !!a.getStyle(h), a.removeStyle(h));
			v(a, e, C[a.getName()]);
			g && (this._.definition.alwaysRemoveElement ? u(a, 1) : !CKEDITOR.dtd.$block[a.getName()] || this._.enterMode == CKEDITOR.ENTER_BR && !a.hasAttributes() ? u(a) : a.renameNode(this._.enterMode == CKEDITOR.ENTER_P ? "p" : "div"))
		}

		function x(a) {
			for (var b = q(this), c = a.getElementsByTag(this.element), d, e = c.count(); 0 <= --e;) d = c.getItem(e), d.isReadOnly() || r.call(this, d, !0);
			for (var g in b)
				if (g != this.element)
					for (c = a.getElementsByTag(g), e = c.count() - 1; 0 <= e; e--) d = c.getItem(e), d.isReadOnly() || v(d, b[g])
		}

		function v(a, b, c) {
			if (b = b && b.attributes)
				for (var d = 0; d < b.length; d++) {
					var e = b[d][0],
						g;
					if (g = a.getAttribute(e)) {
						var f = b[d][1];
						(null === f || f.test && f.test(g) || "string" == typeof f && g == f) && a.removeAttribute(e)
					}
				}
			c || u(a)
		}

		function u(a, b) {
			if (!a.hasAttributes() || b)
				if (CKEDITOR.dtd.$block[a.getName()]) {
					var c = a.getPrevious(H),
						d = a.getNext(H);
					!c || c.type != CKEDITOR.NODE_TEXT && c.isBlockBoundary({
						br: 1
					}) || a.append("br", 1);
					!d || d.type != CKEDITOR.NODE_TEXT && d.isBlockBoundary({
						br: 1
					}) || a.append("br");
					a.remove(!0)
				} else c = a.getFirst(), d = a.getLast(), a.remove(!0), c && (c.type == CKEDITOR.NODE_ELEMENT && c.mergeSiblings(), d && !c.equals(d) && d.type == CKEDITOR.NODE_ELEMENT && d.mergeSiblings())
		}

		function t(a, b, c) {
			var d;
			d = a.element;
			"*" == d && (d = "span");
			d = new CKEDITOR.dom.element(d, b);
			c && c.copyAttributes(d);
			d = y(d, a);
			b.getCustomData("doc_processing_style") && d.hasAttribute("id") ? d.removeAttribute("id") : b.setCustomData("doc_processing_style", 1);
			return d
		}

		function y(a, b) {
			var c = b._.definition,
				d = c.attributes,
				c = CKEDITOR.style.getStyleText(c);
			if (d)
				for (var e in d) a.setAttribute(e, d[e]);
			c && a.setAttribute("style", c);
			return a
		}

		function A(a, b) {
			for (var c in a) a[c] = a[c].replace(F, function(a, c) {
				return b[c]
			})
		}

		function q(a) {
			if (a._.overrides) return a._.overrides;
			var b = a._.overrides = {},
				c = a._.definition.overrides;
			if (c) {
				CKEDITOR.tools.isArray(c) || (c = [c]);
				for (var d = 0; d < c.length; d++) {
					var e = c[d],
						g, f;
					"string" == typeof e ? g = e.toLowerCase() : (g = e.element ? e.element.toLowerCase() : a.element, f = e.attributes);
					e = b[g] || (b[g] = {});
					if (f) {
						var e = e.attributes = e.attributes || [],
							h;
						for (h in f) e.push([h.toLowerCase(), f[h]])
					}
				}
			}
			return b
		}

		function w(a, b, c) {
			var d = new CKEDITOR.dom.element("span");
			d[c ? "setStyle" : "setAttribute"](a, b);
			return d[c ? "getStyle" : "getAttribute"](a)
		}

		function B(a, b) {
			function c(a, b) {
				return "font-family" == b.toLowerCase() ? a.replace(/["']/g, "") : a
			}
			"string" == typeof a && (a = CKEDITOR.tools.parseCssText(a));
			"string" == typeof b && (b = CKEDITOR.tools.parseCssText(b, !0));
			for (var d in a)
				if (!(d in b) || c(b[d], d) != c(a[d], d) && "inherit" != a[d] && "inherit" != b[d]) return !1;
			return !0
		}

		function z(a, b, c) {
			var d = a.document,
				e = a.getRanges();
			b = b ? this.removeFromRange : this.applyToRange;
			var g, f;
			if (a.isFake && a.isInTable())
				for (g = [], f = 0; f < e.length; f++) g.push(e[f].clone());
			for (var h = e.createIterator(); f = h.getNextRange();) b.call(this, f, c);
			a.selectRanges(g || e);
			d.removeCustomData("doc_processing_style")
		}
		var C = {
				address: 1,
				div: 1,
				h1: 1,
				h2: 1,
				h3: 1,
				h4: 1,
				h5: 1,
				h6: 1,
				p: 1,
				pre: 1,
				section: 1,
				header: 1,
				footer: 1,
				nav: 1,
				article: 1,
				aside: 1,
				figure: 1,
				dialog: 1,
				hgroup: 1,
				time: 1,
				meter: 1,
				menu: 1,
				command: 1,
				keygen: 1,
				output: 1,
				progress: 1,
				details: 1,
				datagrid: 1,
				datalist: 1
			},
			E = {
				a: 1,
				blockquote: 1,
				embed: 1,
				hr: 1,
				img: 1,
				li: 1,
				object: 1,
				ol: 1,
				table: 1,
				td: 1,
				tr: 1,
				th: 1,
				ul: 1,
				dl: 1,
				dt: 1,
				dd: 1,
				form: 1,
				audio: 1,
				video: 1
			},
			G = /\s*(?:;\s*|$)/,
			F = /#\((.+?)\)/g,
			J = CKEDITOR.dom.walker.bookmark(0, 1),
			H = CKEDITOR.dom.walker.whitespaces(1);
		CKEDITOR.style = function(a, b) {
			if ("string" == typeof a.type) return new CKEDITOR.style.customHandlers[a.type](a);
			var c = a.attributes;
			c && c.style && (a.styles = CKEDITOR.tools.extend({}, a.styles, CKEDITOR.tools.parseCssText(c.style)), delete c.style);
			b && (a = CKEDITOR.tools.clone(a), A(a.attributes, b), A(a.styles, b));
			c = this.element = a.element ? "string" == typeof a.element ? a.element.toLowerCase() : a.element : "*";
			this.type = a.type || (C[c] ? CKEDITOR.STYLE_BLOCK : E[c] ? CKEDITOR.STYLE_OBJECT : CKEDITOR.STYLE_INLINE);
			"object" == typeof this.element && (this.type = CKEDITOR.STYLE_OBJECT);
			this._ = {
				definition: a
			}
		};
		CKEDITOR.style.prototype = {
			apply: function(a) {
				if (a instanceof CKEDITOR.dom.document) return z.call(this, a.getSelection());
				if (this.checkApplicable(a.elementPath(), a)) {
					var b = this._.enterMode;
					b || (this._.enterMode = a.activeEnterMode);
					z.call(this, a.getSelection(), 0, a);
					this._.enterMode = b
				}
			},
			remove: function(a) {
				if (a instanceof CKEDITOR.dom.document) return z.call(this, a.getSelection(), 1);
				if (this.checkApplicable(a.elementPath(), a)) {
					var b = this._.enterMode;
					b || (this._.enterMode = a.activeEnterMode);
					z.call(this, a.getSelection(), 1, a);
					this._.enterMode = b
				}
			},
			applyToRange: function(a) {
				this.applyToRange = this.type == CKEDITOR.STYLE_INLINE ? b : this.type == CKEDITOR.STYLE_BLOCK ? d : this.type == CKEDITOR.STYLE_OBJECT ? l : null;
				return this.applyToRange(a)
			},
			removeFromRange: function(a) {
				this.removeFromRange = this.type == CKEDITOR.STYLE_INLINE ? c : this.type == CKEDITOR.STYLE_BLOCK ? h : this.type == CKEDITOR.STYLE_OBJECT ? k : null;
				return this.removeFromRange(a)
			},
			applyToObject: function(a) {
				y(a, this)
			},
			checkActive: function(a, b) {
				switch (this.type) {
					case CKEDITOR.STYLE_BLOCK:
						return this.checkElementRemovable(a.block || a.blockLimit, !0, b);
					case CKEDITOR.STYLE_OBJECT:
					case CKEDITOR.STYLE_INLINE:
						for (var c = a.elements, d = 0, e; d < c.length; d++)
							if (e = c[d], this.type != CKEDITOR.STYLE_INLINE || e != a.block && e != a.blockLimit) {
								if (this.type == CKEDITOR.STYLE_OBJECT) {
									var g = e.getName();
									if (!("string" == typeof this.element ? g == this.element : g in this.element)) continue
								}
								if (this.checkElementRemovable(e, !0, b)) return !0
							}
				}
				return !1
			},
			checkApplicable: function(a, b, c) {
				b && b instanceof CKEDITOR.filter && (c = b);
				if (c && !c.check(this)) return !1;
				switch (this.type) {
					case CKEDITOR.STYLE_OBJECT:
						return !!a.contains(this.element);
					case CKEDITOR.STYLE_BLOCK:
						return !!a.blockLimit.getDtd()[this.element]
				}
				return !0
			},
			checkElementMatch: function(a, b) {
				var c = this._.definition;
				if (!a || !c.ignoreReadonly && a.isReadOnly()) return !1;
				var d = a.getName();
				if ("string" == typeof this.element ? d == this.element : d in this.element) {
					if (!b && !a.hasAttributes()) return !0;
					if (d = c._AC) c = d;
					else {
						var d = {},
							e = 0,
							g = c.attributes;
						if (g)
							for (var f in g) e++, d[f] = g[f];
						if (f = CKEDITOR.style.getStyleText(c)) d.style || e++, d.style = f;
						d._length = e;
						c = c._AC = d
					}
					if (c._length) {
						for (var h in c)
							if ("_length" != h)
								if (d = a.getAttribute(h) || "", "style" == h ? B(c[h], d) : c[h] == d) {
									if (!b) return !0
								} else if (b) return !1;
						if (b) return !0
					} else return !0
				}
				return !1
			},
			checkElementRemovable: function(a, b, c) {
				if (this.checkElementMatch(a, b, c)) return !0;
				if (b = q(this)[a.getName()]) {
					var d;
					if (!(b = b.attributes)) return !0;
					for (c = 0; c < b.length; c++)
						if (d = b[c][0], d = a.getAttribute(d)) {
							var e = b[c][1];
							if (null === e) return !0;
							if ("string" == typeof e) {
								if (d == e) return !0
							} else if (e.test(d)) return !0
						}
				}
				return !1
			},
			buildPreview: function(a) {
				var b = this._.definition,
					c = [],
					d = b.element;
				"bdo" == d && (d = "span");
				var c = ["\x3c", d],
					e = b.attributes;
				if (e)
					for (var g in e) c.push(" ", g, '\x3d"', e[g], '"');
				(e = CKEDITOR.style.getStyleText(b)) && c.push(' style\x3d"', e, '"');
				c.push("\x3e", a || b.name, "\x3c/", d, "\x3e");
				return c.join("")
			},
			getDefinition: function() {
				return this._.definition
			}
		};
		CKEDITOR.style.getStyleText = function(a) {
			var b = a._ST;
			if (b) return b;
			var b = a.styles,
				c = a.attributes && a.attributes.style || "",
				d = "";
			c.length && (c = c.replace(G, ";"));
			for (var e in b) {
				var g = b[e],
					f = (e + ":" + g).replace(G, ";");
				"inherit" == g ? d += f : c += f
			}
			c.length && (c = CKEDITOR.tools.normalizeCssText(c, !0));
			return a._ST = c + d
		};
		CKEDITOR.style.customHandlers = {};
		CKEDITOR.style.addCustomHandler = function(a) {
			var b = function(a) {
				this._ = {
					definition: a
				};
				this.setup && this.setup(a)
			};
			b.prototype = CKEDITOR.tools.extend(CKEDITOR.tools.prototypedCopy(CKEDITOR.style.prototype), {
				assignedTo: CKEDITOR.STYLE_OBJECT
			}, a, !0);
			return this.customHandlers[a.type] = b
		};
		var M = CKEDITOR.POSITION_PRECEDING | CKEDITOR.POSITION_IDENTICAL | CKEDITOR.POSITION_IS_CONTAINED,
			L = CKEDITOR.POSITION_FOLLOWING | CKEDITOR.POSITION_IDENTICAL | CKEDITOR.POSITION_IS_CONTAINED
	}(), CKEDITOR.styleCommand = function(a, f) {
		this.requiredContent = this.allowedContent = this.style = a;
		CKEDITOR.tools.extend(this, f, !0)
	}, CKEDITOR.styleCommand.prototype.exec = function(a) {
		a.focus();
		this.state == CKEDITOR.TRISTATE_OFF ? a.applyStyle(this.style) : this.state == CKEDITOR.TRISTATE_ON && a.removeStyle(this.style)
	}, CKEDITOR.stylesSet = new CKEDITOR.resourceManager("", "stylesSet"), CKEDITOR.addStylesSet = CKEDITOR.tools.bind(CKEDITOR.stylesSet.add, CKEDITOR.stylesSet), CKEDITOR.loadStylesSet = function(a, f, b) {
		CKEDITOR.stylesSet.addExternal(a, f, "");
		CKEDITOR.stylesSet.load(a, b)
	}, CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
		attachStyleStateChange: function(a, f) {
			var b = this._.styleStateChangeCallbacks;
			b || (b = this._.styleStateChangeCallbacks = [], this.on("selectionChange", function(a) {
				for (var e = 0; e < b.length; e++) {
					var f = b[e],
						k = f.style.checkActive(a.data.path, this) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF;
					f.fn.call(this, k)
				}
			}));
			b.push({
				style: a,
				fn: f
			})
		},
		applyStyle: function(a) {
			a.apply(this)
		},
		removeStyle: function(a) {
			a.remove(this)
		},
		getStylesSet: function(a) {
			if (this._.stylesDefinitions) a(this._.stylesDefinitions);
			else {
				var f = this,
					b = f.config.stylesCombo_stylesSet || f.config.stylesSet;
				if (!1 === b) a(null);
				else if (b instanceof Array) f._.stylesDefinitions = b, a(b);
				else {
					b || (b = "default");
					var b = b.split(":"),
						c = b[0];
					CKEDITOR.stylesSet.addExternal(c, b[1] ? b.slice(1).join(":") : CKEDITOR.getUrl("styles.js"), "");
					CKEDITOR.stylesSet.load(c, function(b) {
						f._.stylesDefinitions = b[c];
						a(f._.stylesDefinitions)
					})
				}
			}
		}
	}), CKEDITOR.dom.comment = function(a, f) {
		"string" == typeof a && (a = (f ? f.$ : document).createComment(a));
		CKEDITOR.dom.domObject.call(this, a)
	}, CKEDITOR.dom.comment.prototype = new CKEDITOR.dom.node, CKEDITOR.tools.extend(CKEDITOR.dom.comment.prototype, {
		type: CKEDITOR.NODE_COMMENT,
		getOuterHtml: function() {
			return "\x3c!--" + this.$.nodeValue + "--\x3e"
		}
	}), "use strict", function() {
		var a = {},
			f = {},
			b;
		for (b in CKEDITOR.dtd.$blockLimit) b in CKEDITOR.dtd.$list || (a[b] = 1);
		for (b in CKEDITOR.dtd.$block) b in CKEDITOR.dtd.$blockLimit || b in CKEDITOR.dtd.$empty || (f[b] = 1);
		CKEDITOR.dom.elementPath = function(b, e) {
			var l = null,
				k = null,
				d = [],
				h = b,
				m;
			e = e || b.getDocument().getBody();
			do
				if (h.type == CKEDITOR.NODE_ELEMENT) {
					d.push(h);
					if (!this.lastElement && (this.lastElement = h, h.is(CKEDITOR.dtd.$object) || "false" == h.getAttribute("contenteditable"))) continue;
					if (h.equals(e)) break;
					if (!k && (m = h.getName(), "true" == h.getAttribute("contenteditable") ? k = h : !l && f[m] && (l = h), a[m])) {
						if (m = !l && "div" == m) {
							a: {
								m = h.getChildren();
								for (var g = 0, n = m.count(); g < n; g++) {
									var p = m.getItem(g);
									if (p.type == CKEDITOR.NODE_ELEMENT && CKEDITOR.dtd.$block[p.getName()]) {
										m = !0;
										break a
									}
								}
								m = !1
							}
							m = !m
						}
						m ? l = h : k = h
					}
				}
			while (h = h.getParent());
			k || (k = e);
			this.block = l;
			this.blockLimit = k;
			this.root = e;
			this.elements = d
		}
	}(), CKEDITOR.dom.elementPath.prototype = {
		compare: function(a) {
			var f = this.elements;
			a = a && a.elements;
			if (!a || f.length != a.length) return !1;
			for (var b = 0; b < f.length; b++)
				if (!f[b].equals(a[b])) return !1;
			return !0
		},
		contains: function(a, f, b) {
			var c;
			"string" == typeof a && (c = function(b) {
				return b.getName() == a
			});
			a instanceof CKEDITOR.dom.element ? c = function(b) {
				return b.equals(a)
			} : CKEDITOR.tools.isArray(a) ? c = function(b) {
				return -1 < CKEDITOR.tools.indexOf(a, b.getName())
			} : "function" == typeof a ? c = a : "object" == typeof a && (c = function(b) {
				return b.getName() in a
			});
			var e = this.elements,
				l = e.length;
			f && l--;
			b && (e = Array.prototype.slice.call(e, 0), e.reverse());
			for (f = 0; f < l; f++)
				if (c(e[f])) return e[f];
			return null
		},
		isContextFor: function(a) {
			var f;
			return a in CKEDITOR.dtd.$block ? (f = this.contains(CKEDITOR.dtd.$intermediate) || this.root.equals(this.block) && this.block || this.blockLimit, !!f.getDtd()[a]) : !0
		},
		direction: function() {
			return (this.block || this.blockLimit || this.root).getDirection(1)
		}
	}, CKEDITOR.dom.text = function(a, f) {
		"string" == typeof a && (a = (f ? f.$ : document).createTextNode(a));
		this.$ = a
	}, CKEDITOR.dom.text.prototype = new CKEDITOR.dom.node, CKEDITOR.tools.extend(CKEDITOR.dom.text.prototype, {
		type: CKEDITOR.NODE_TEXT,
		getLength: function() {
			return this.$.nodeValue.length
		},
		getText: function() {
			return this.$.nodeValue
		},
		setText: function(a) {
			this.$.nodeValue = a
		},
		split: function(a) {
			var f = this.$.parentNode,
				b = f.childNodes.length,
				c = this.getLength(),
				e = this.getDocument(),
				l = new CKEDITOR.dom.text(this.$.splitText(a), e);
			f.childNodes.length == b && (a >= c ? (l = e.createText(""), l.insertAfter(this)) : (a = e.createText(""), a.insertAfter(l), a.remove()));
			return l
		},
		substring: function(a, f) {
			return "number" != typeof f ? this.$.nodeValue.substr(a) : this.$.nodeValue.substring(a, f)
		}
	}), function() {
		function a(a, c, e) {
			var f = a.serializable,
				k = c[e ? "endContainer" : "startContainer"],
				d = e ? "endOffset" : "startOffset",
				h = f ? c.document.getById(a.startNode) : a.startNode;
			a = f ? c.document.getById(a.endNode) : a.endNode;
			k.equals(h.getPrevious()) ? (c.startOffset = c.startOffset - k.getLength() - a.getPrevious().getLength(), k = a.getNext()) : k.equals(a.getPrevious()) && (c.startOffset -= k.getLength(), k = a.getNext());
			k.equals(h.getParent()) && c[d]++;
			k.equals(a.getParent()) && c[d]++;
			c[e ? "endContainer" : "startContainer"] = k;
			return c
		}
		CKEDITOR.dom.rangeList = function(a) {
			if (a instanceof CKEDITOR.dom.rangeList) return a;
			a ? a instanceof CKEDITOR.dom.range && (a = [a]) : a = [];
			return CKEDITOR.tools.extend(a, f)
		};
		var f = {
			createIterator: function() {
				var a = this,
					c = CKEDITOR.dom.walker.bookmark(),
					e = [],
					f;
				return {
					getNextRange: function(k) {
						f = void 0 === f ? 0 : f + 1;
						var d = a[f];
						if (d && 1 < a.length) {
							if (!f)
								for (var h = a.length - 1; 0 <= h; h--) e.unshift(a[h].createBookmark(!0));
							if (k)
								for (var m = 0; a[f + m + 1];) {
									var g = d.document;
									k = 0;
									h = g.getById(e[m].endNode);
									for (g = g.getById(e[m + 1].startNode);;) {
										h = h.getNextSourceNode(!1);
										if (g.equals(h)) k = 1;
										else if (c(h) || h.type == CKEDITOR.NODE_ELEMENT && h.isBlockBoundary()) continue;
										break
									}
									if (!k) break;
									m++
								}
							for (d.moveToBookmark(e.shift()); m--;) h = a[++f], h.moveToBookmark(e.shift()), d.setEnd(h.endContainer, h.endOffset)
						}
						return d
					}
				}
			},
			createBookmarks: function(b) {
				for (var c = [], e, f = 0; f < this.length; f++) {
					c.push(e = this[f].createBookmark(b, !0));
					for (var k = f + 1; k < this.length; k++) this[k] = a(e, this[k]), this[k] = a(e, this[k], !0)
				}
				return c
			},
			createBookmarks2: function(a) {
				for (var c = [], e = 0; e < this.length; e++) c.push(this[e].createBookmark2(a));
				return c
			},
			moveToBookmarks: function(a) {
				for (var c = 0; c < this.length; c++) this[c].moveToBookmark(a[c])
			}
		}
	}(), function() {
		function a() {
			return CKEDITOR.getUrl(CKEDITOR.skinName.split(",")[1] || "skins/" + CKEDITOR.skinName.split(",")[0] + "/")
		}

		function f(b) {
			var c = CKEDITOR.skin["ua_" + b],
				d = CKEDITOR.env;
			if (c)
				for (var c = c.split(",").sort(function(a, b) {
						return a > b ? -1 : 1
					}), e = 0, f; e < c.length; e++)
					if (f = c[e], d.ie && (f.replace(/^ie/, "") == d.version || d.quirks && "iequirks" == f) && (f = "ie"), d[f]) {
						b += "_" + c[e];
						break
					}
			return CKEDITOR.getUrl(a() + b + ".css")
		}

		function b(a, b) {
			l[a] || (CKEDITOR.document.appendStyleSheet(f(a)), l[a] = 1);
			b && b()
		}

		function c(a) {
			var b = a.getById(k);
			b || (b = a.getHead().append("style"), b.setAttribute("id", k), b.setAttribute("type", "text/css"));
			return b
		}

		function e(a, b, c) {
			var d, e, f;
			if (CKEDITOR.env.webkit)
				for (b = b.split("}").slice(0, -1), e = 0; e < b.length; e++) b[e] = b[e].split("{");
			for (var h = 0; h < a.length; h++)
				if (CKEDITOR.env.webkit)
					for (e = 0; e < b.length; e++) {
						f = b[e][1];
						for (d = 0; d < c.length; d++) f = f.replace(c[d][0], c[d][1]);
						a[h].$.sheet.addRule(b[e][0], f)
					} else {
						f = b;
						for (d = 0; d < c.length; d++) f = f.replace(c[d][0], c[d][1]);
						CKEDITOR.env.ie && 11 > CKEDITOR.env.version ? a[h].$.styleSheet.cssText += f : a[h].$.innerHTML += f
					}
		}
		var l = {};
		CKEDITOR.skin = {
			path: a,
			loadPart: function(c, d) {
				CKEDITOR.skin.name != CKEDITOR.skinName.split(",")[0] ? CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(a() + "skin.js"), function() {
					b(c, d)
				}) : b(c, d)
			},
			getPath: function(a) {
				return CKEDITOR.getUrl(f(a))
			},
			icons: {},
			addIcon: function(a, b, c, d) {
				a = a.toLowerCase();
				this.icons[a] || (this.icons[a] = {
					path: b,
					offset: c || 0,
					bgsize: d || "16px"
				})
			},
			getIconStyle: function(a, b, c, d, e) {
				var f;
				a && (a = a.toLowerCase(), b && (f = this.icons[a + "-rtl"]), f || (f = this.icons[a]));
				a = c || f && f.path || "";
				d = d || f && f.offset;
				e = e || f && f.bgsize || "16px";
				a && (a = a.replace(/'/g, "\\'"));
				return a && "background-image:url('" + CKEDITOR.getUrl(a) + "');background-position:0 " + d + "px;background-size:" + e + ";"
			}
		};
		CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
			getUiColor: function() {
				return this.uiColor
			},
			setUiColor: function(a) {
				var b = c(CKEDITOR.document);
				return (this.setUiColor = function(a) {
					this.uiColor = a;
					var c = CKEDITOR.skin.chameleon,
						f = "",
						m = "";
					"function" == typeof c && (f = c(this, "editor"), m = c(this, "panel"));
					a = [
						[h, a]
					];
					e([b], f, a);
					e(d, m, a)
				}).call(this, a)
			}
		});
		var k = "cke_ui_color",
			d = [],
			h = /\$color/g;
		CKEDITOR.on("instanceLoaded", function(a) {
			if (!CKEDITOR.env.ie || !CKEDITOR.env.quirks) {
				var b = a.editor;
				a = function(a) {
					a = (a.data[0] || a.data).element.getElementsByTag("iframe").getItem(0).getFrameDocument();
					if (!a.getById("cke_ui_color")) {
						a = c(a);
						d.push(a);
						var f = b.getUiColor();
						f && e([a], CKEDITOR.skin.chameleon(b, "panel"), [
							[h, f]
						])
					}
				};
				b.on("panelShow", a);
				b.on("menuShow", a);
				b.config.uiColor && b.setUiColor(b.config.uiColor)
			}
		})
	}(), function() {
		if (CKEDITOR.env.webkit) CKEDITOR.env.hc = !1;
		else {
			var a = CKEDITOR.dom.element.createFromHtml('\x3cdiv style\x3d"width:0;height:0;position:absolute;left:-10000px;border:1px solid;border-color:red blue"\x3e\x3c/div\x3e', CKEDITOR.document);
			a.appendTo(CKEDITOR.document.getHead());
			try {
				var f = a.getComputedStyle("border-top-color"),
					b = a.getComputedStyle("border-right-color");
				CKEDITOR.env.hc = !(!f || f != b)
			} catch (c) {
				CKEDITOR.env.hc = !1
			}
			a.remove()
		}
		CKEDITOR.env.hc && (CKEDITOR.env.cssClass += " cke_hc");
		CKEDITOR.document.appendStyleText(".cke{visibility:hidden;}");
		CKEDITOR.status = "loaded";
		CKEDITOR.fireOnce("loaded");
		if (a = CKEDITOR._.pending)
			for (delete CKEDITOR._.pending, f = 0; f < a.length; f++) CKEDITOR.editor.prototype.constructor.apply(a[f][0], a[f][1]), CKEDITOR.add(a[f][0])
	}(), CKEDITOR.skin.name = "moono-lisa", CKEDITOR.skin.ua_editor = "ie,iequirks,ie8,gecko", CKEDITOR.skin.ua_dialog = "ie,iequirks,ie8", CKEDITOR.skin.chameleon = function() {
		var a = function() {
				return function(a, c) {
					for (var e = a.match(/[^#]./g), f = 0; 3 > f; f++) {
						var k = f,
							d;
						d = parseInt(e[f], 16);
						d = ("0" + (0 > c ? 0 | d * (1 + c) : 0 | d + (255 - d) * c).toString(16)).slice(-2);
						e[k] = d
					}
					return "#" + e.join("")
				}
			}(),
			f = {
				editor: new CKEDITOR.template("{id}.cke_chrome [border-color:{defaultBorder};] {id} .cke_top [ background-color:{defaultBackground};border-bottom-color:{defaultBorder};] {id} .cke_bottom [background-color:{defaultBackground};border-top-color:{defaultBorder};] {id} .cke_resizer [border-right-color:{ckeResizer}] {id} .cke_dialog_title [background-color:{defaultBackground};border-bottom-color:{defaultBorder};] {id} .cke_dialog_footer [background-color:{defaultBackground};outline-color:{defaultBorder};] {id} .cke_dialog_tab [background-color:{dialogTab};border-color:{defaultBorder};] {id} .cke_dialog_tab:hover [background-color:{lightBackground};] {id} .cke_dialog_contents [border-top-color:{defaultBorder};] {id} .cke_dialog_tab_selected, {id} .cke_dialog_tab_selected:hover [background:{dialogTabSelected};border-bottom-color:{dialogTabSelectedBorder};] {id} .cke_dialog_body [background:{dialogBody};border-color:{defaultBorder};] {id} a.cke_button_off:hover,{id} a.cke_button_off:focus,{id} a.cke_button_off:active [background-color:{darkBackground};border-color:{toolbarElementsBorder};] {id} .cke_button_on [background-color:{ckeButtonOn};border-color:{toolbarElementsBorder};] {id} .cke_toolbar_separator,{id} .cke_toolgroup a.cke_button:last-child:after,{id} .cke_toolgroup a.cke_button.cke_button_disabled:hover:last-child:after [background-color: {toolbarElementsBorder};border-color: {toolbarElementsBorder};] {id} a.cke_combo_button:hover,{id} a.cke_combo_button:focus,{id} .cke_combo_on a.cke_combo_button [border-color:{toolbarElementsBorder};background-color:{darkBackground};] {id} .cke_combo:after [border-color:{toolbarElementsBorder};] {id} .cke_path_item [color:{elementsPathColor};] {id} a.cke_path_item:hover,{id} a.cke_path_item:focus,{id} a.cke_path_item:active [background-color:{darkBackground};] {id}.cke_panel [border-color:{defaultBorder};] "),
				panel: new CKEDITOR.template(".cke_panel_grouptitle [background-color:{lightBackground};border-color:{defaultBorder};] .cke_menubutton_icon [background-color:{menubuttonIcon};] .cke_menubutton:hover,.cke_menubutton:focus,.cke_menubutton:active [background-color:{menubuttonHover};] .cke_menubutton:hover .cke_menubutton_icon, .cke_menubutton:focus .cke_menubutton_icon, .cke_menubutton:active .cke_menubutton_icon [background-color:{menubuttonIconHover};] .cke_menubutton_disabled:hover .cke_menubutton_icon,.cke_menubutton_disabled:focus .cke_menubutton_icon,.cke_menubutton_disabled:active .cke_menubutton_icon [background-color:{menubuttonIcon};] .cke_menuseparator [background-color:{menubuttonIcon};] a:hover.cke_colorbox, a:active.cke_colorbox [border-color:{defaultBorder};] a:hover.cke_colorauto, a:hover.cke_colormore, a:active.cke_colorauto, a:active.cke_colormore [background-color:{ckeColorauto};border-color:{defaultBorder};] ")
			};
		return function(b, c) {
			var e = a(b.uiColor, .4),
				e = {
					id: "." + b.id,
					defaultBorder: a(e, -.2),
					toolbarElementsBorder: a(e, -.25),
					defaultBackground: e,
					lightBackground: a(e, .8),
					darkBackground: a(e, -.15),
					ckeButtonOn: a(e, .4),
					ckeResizer: a(e, -.4),
					ckeColorauto: a(e, .8),
					dialogBody: a(e, .7),
					dialogTab: a(e, .65),
					dialogTabSelected: "#FFF",
					dialogTabSelectedBorder: "#FFF",
					elementsPathColor: a(e, -.6),
					menubuttonHover: a(e, .1),
					menubuttonIcon: a(e, .5),
					menubuttonIconHover: a(e, .3)
				};
			return f[c].output(e).replace(/\[/g, "{").replace(/\]/g, "}")
		}
	}(), CKEDITOR.plugins.add("dialogui", {
		onLoad: function() {
			var a = function(a) {
					this._ || (this._ = {});
					this._["default"] = this._.initValue = a["default"] || "";
					this._.required = a.required || !1;
					for (var b = [this._], c = 1; c < arguments.length; c++) b.push(arguments[c]);
					b.push(!0);
					CKEDITOR.tools.extend.apply(CKEDITOR.tools, b);
					return this._
				},
				f = {
					build: function(a, b, c) {
						return new CKEDITOR.ui.dialog.textInput(a, b, c)
					}
				},
				b = {
					build: function(a, b, c) {
						return new CKEDITOR.ui.dialog[b.type](a, b, c)
					}
				},
				c = {
					isChanged: function() {
						return this.getValue() != this.getInitValue()
					},
					reset: function(a) {
						this.setValue(this.getInitValue(), a)
					},
					setInitValue: function() {
						this._.initValue = this.getValue()
					},
					resetInitValue: function() {
						this._.initValue = this._["default"]
					},
					getInitValue: function() {
						return this._.initValue
					}
				},
				e = CKEDITOR.tools.extend({}, CKEDITOR.ui.dialog.uiElement.prototype.eventProcessors, {
					onChange: function(a, b) {
						this._.domOnChangeRegistered || (a.on("load", function() {
							this.getInputElement().on("change", function() {
								a.parts.dialog.isVisible() && this.fire("change", {
									value: this.getValue()
								})
							}, this)
						}, this), this._.domOnChangeRegistered = !0);
						this.on("change", b)
					}
				}, !0),
				l = /^on([A-Z]\w+)/,
				k = function(a) {
					for (var b in a)(l.test(b) || "title" == b || "type" == b) && delete a[b];
					return a
				},
				d = function(a) {
					a = a.data.getKeystroke();
					a == CKEDITOR.SHIFT + CKEDITOR.ALT + 36 ? this.setDirectionMarker("ltr") : a == CKEDITOR.SHIFT + CKEDITOR.ALT + 35 && this.setDirectionMarker("rtl")
				};
			CKEDITOR.tools.extend(CKEDITOR.ui.dialog, {
				labeledElement: function(b, c, d, e) {
					if (!(4 > arguments.length)) {
						var f = a.call(this, c);
						f.labelId = CKEDITOR.tools.getNextId() + "_label";
						this._.children = [];
						var k = {
							role: c.role || "presentation"
						};
						c.includeLabel && (k["aria-labelledby"] = f.labelId);
						CKEDITOR.ui.dialog.uiElement.call(this, b, c, d, "div", null, k, function() {
							var a = [],
								d = c.required ? " cke_required" : "";
							"horizontal" != c.labelLayout ? a.push('\x3clabel class\x3d"cke_dialog_ui_labeled_label' + d + '" ', ' id\x3d"' + f.labelId + '"', f.inputId ? ' for\x3d"' + f.inputId + '"' : "", (c.labelStyle ? ' style\x3d"' + c.labelStyle + '"' : "") + "\x3e", c.label, "\x3c/label\x3e", '\x3cdiv class\x3d"cke_dialog_ui_labeled_content"', c.controlStyle ? ' style\x3d"' + c.controlStyle + '"' : "", ' role\x3d"presentation"\x3e', e.call(this, b, c), "\x3c/div\x3e") : (d = {
								type: "hbox",
								widths: c.widths,
								padding: 0,
								children: [{
									type: "html",
									html: '\x3clabel class\x3d"cke_dialog_ui_labeled_label' + d + '" id\x3d"' + f.labelId + '" for\x3d"' + f.inputId + '"' + (c.labelStyle ? ' style\x3d"' + c.labelStyle + '"' : "") + "\x3e" + CKEDITOR.tools.htmlEncode(c.label) + "\x3c/label\x3e"
								}, {
									type: "html",
									html: '\x3cspan class\x3d"cke_dialog_ui_labeled_content"' + (c.controlStyle ? ' style\x3d"' + c.controlStyle + '"' : "") + "\x3e" + e.call(this, b, c) + "\x3c/span\x3e"
								}]
							}, CKEDITOR.dialog._.uiElementBuilders.hbox.build(b, d, a));
							return a.join("")
						})
					}
				},
				textInput: function(b, c, e) {
					if (!(3 > arguments.length)) {
						a.call(this, c);
						var f = this._.inputId = CKEDITOR.tools.getNextId() + "_textInput",
							k = {
								"class": "cke_dialog_ui_input_" + c.type,
								id: f,
								type: c.type
							};
						c.validate && (this.validate = c.validate);
						c.maxLength && (k.maxlength = c.maxLength);
						c.size && (k.size = c.size);
						c.inputStyle && (k.style = c.inputStyle);
						var l = this,
							x = !1;
						b.on("load", function() {
							l.getInputElement().on("keydown", function(a) {
								13 == a.data.getKeystroke() && (x = !0)
							});
							l.getInputElement().on("keyup", function(a) {
								13 == a.data.getKeystroke() && x && (b.getButton("ok") && setTimeout(function() {
									b.getButton("ok").click()
								}, 0), x = !1);
								l.bidi && d.call(l, a)
							}, null, null, 1E3)
						});
						CKEDITOR.ui.dialog.labeledElement.call(this, b, c, e, function() {
							var a = ['\x3cdiv class\x3d"cke_dialog_ui_input_', c.type, '" role\x3d"presentation"'];
							c.width && a.push('style\x3d"width:' + c.width + '" ');
							a.push("\x3e\x3cinput ");
							k["aria-labelledby"] = this._.labelId;
							this._.required && (k["aria-required"] = this._.required);
							for (var b in k) a.push(b + '\x3d"' + k[b] + '" ');
							a.push(" /\x3e\x3c/div\x3e");
							return a.join("")
						})
					}
				},
				textarea: function(b, c, e) {
					if (!(3 > arguments.length)) {
						a.call(this, c);
						var f = this,
							k = this._.inputId = CKEDITOR.tools.getNextId() + "_textarea",
							l = {};
						c.validate && (this.validate = c.validate);
						l.rows = c.rows || 5;
						l.cols = c.cols || 20;
						l["class"] = "cke_dialog_ui_input_textarea " + (c["class"] || "");
						"undefined" != typeof c.inputStyle && (l.style = c.inputStyle);
						c.dir && (l.dir = c.dir);
						if (f.bidi) b.on("load", function() {
							f.getInputElement().on("keyup", d)
						}, f);
						CKEDITOR.ui.dialog.labeledElement.call(this, b, c, e, function() {
							l["aria-labelledby"] = this._.labelId;
							this._.required && (l["aria-required"] = this._.required);
							var a = ['\x3cdiv class\x3d"cke_dialog_ui_input_textarea" role\x3d"presentation"\x3e\x3ctextarea id\x3d"', k, '" '],
								b;
							for (b in l) a.push(b + '\x3d"' + CKEDITOR.tools.htmlEncode(l[b]) + '" ');
							a.push("\x3e", CKEDITOR.tools.htmlEncode(f._["default"]), "\x3c/textarea\x3e\x3c/div\x3e");
							return a.join("")
						})
					}
				},
				checkbox: function(b, c, d) {
					if (!(3 > arguments.length)) {
						var e = a.call(this, c, {
							"default": !!c["default"]
						});
						c.validate && (this.validate = c.validate);
						CKEDITOR.ui.dialog.uiElement.call(this, b, c, d, "span", null, null, function() {
							var a = CKEDITOR.tools.extend({}, c, {
									id: c.id ? c.id + "_checkbox" : CKEDITOR.tools.getNextId() + "_checkbox"
								}, !0),
								d = [],
								f = CKEDITOR.tools.getNextId() + "_label",
								g = {
									"class": "cke_dialog_ui_checkbox_input",
									type: "checkbox",
									"aria-labelledby": f
								};
							k(a);
							c["default"] && (g.checked = "checked");
							"undefined" != typeof a.inputStyle && (a.style = a.inputStyle);
							e.checkbox = new CKEDITOR.ui.dialog.uiElement(b, a, d, "input", null, g);
							d.push(' \x3clabel id\x3d"', f, '" for\x3d"', g.id, '"' + (c.labelStyle ? ' style\x3d"' + c.labelStyle + '"' : "") + "\x3e", CKEDITOR.tools.htmlEncode(c.label), "\x3c/label\x3e");
							return d.join("")
						})
					}
				},
				radio: function(b, c, d) {
					if (!(3 > arguments.length)) {
						a.call(this, c);
						this._["default"] || (this._["default"] = this._.initValue = c.items[0][1]);
						c.validate && (this.validate = c.validate);
						var e = [],
							f = this;
						c.role = "radiogroup";
						c.includeLabel = !0;
						CKEDITOR.ui.dialog.labeledElement.call(this, b, c, d, function() {
							for (var a = [], d = [], g = (c.id ? c.id : CKEDITOR.tools.getNextId()) + "_radio", l = 0; l < c.items.length; l++) {
								var t = c.items[l],
									y = void 0 !== t[2] ? t[2] : t[0],
									A = void 0 !== t[1] ? t[1] : t[0],
									q = CKEDITOR.tools.getNextId() + "_radio_input",
									w = q + "_label",
									q = CKEDITOR.tools.extend({}, c, {
										id: q,
										title: null,
										type: null
									}, !0),
									y = CKEDITOR.tools.extend({}, q, {
										title: y
									}, !0),
									B = {
										type: "radio",
										"class": "cke_dialog_ui_radio_input",
										name: g,
										value: A,
										"aria-labelledby": w
									},
									z = [];
								f._["default"] == A && (B.checked = "checked");
								k(q);
								k(y);
								"undefined" != typeof q.inputStyle && (q.style = q.inputStyle);
								q.keyboardFocusable = !0;
								e.push(new CKEDITOR.ui.dialog.uiElement(b, q, z, "input", null, B));
								z.push(" ");
								new CKEDITOR.ui.dialog.uiElement(b, y, z, "label", null, {
									id: w,
									"for": B.id
								}, t[0]);
								a.push(z.join(""))
							}
							new CKEDITOR.ui.dialog.hbox(b, e, a, d);
							return d.join("")
						});
						this._.children = e
					}
				},
				button: function(b, c, d) {
					if (arguments.length) {
						"function" == typeof c && (c = c(b.getParentEditor()));
						a.call(this, c, {
							disabled: c.disabled || !1
						});
						CKEDITOR.event.implementOn(this);
						var e = this;
						b.on("load", function() {
							var a = this.getElement();
							(function() {
								a.on("click", function(a) {
									e.click();
									a.data.preventDefault()
								});
								a.on("keydown", function(a) {
									a.data.getKeystroke() in {
										32: 1
									} && (e.click(), a.data.preventDefault())
								})
							})();
							a.unselectable()
						}, this);
						var f = CKEDITOR.tools.extend({}, c);
						delete f.style;
						var k = CKEDITOR.tools.getNextId() + "_label";
						CKEDITOR.ui.dialog.uiElement.call(this, b, f, d, "a", null, {
							style: c.style,
							href: "javascript:void(0)",
							title: c.label,
							hidefocus: "true",
							"class": c["class"],
							role: "button",
							"aria-labelledby": k
						}, '\x3cspan id\x3d"' + k + '" class\x3d"cke_dialog_ui_button"\x3e' + CKEDITOR.tools.htmlEncode(c.label) + "\x3c/span\x3e")
					}
				},
				select: function(b, c, d) {
					if (!(3 > arguments.length)) {
						var e = a.call(this, c);
						c.validate && (this.validate = c.validate);
						e.inputId = CKEDITOR.tools.getNextId() + "_select";
						CKEDITOR.ui.dialog.labeledElement.call(this, b, c, d, function() {
							var a = CKEDITOR.tools.extend({}, c, {
									id: c.id ? c.id + "_select" : CKEDITOR.tools.getNextId() + "_select"
								}, !0),
								d = [],
								f = [],
								g = {
									id: e.inputId,
									"class": "cke_dialog_ui_input_select",
									"aria-labelledby": this._.labelId
								};
							d.push('\x3cdiv class\x3d"cke_dialog_ui_input_', c.type, '" role\x3d"presentation"');
							c.width && d.push('style\x3d"width:' + c.width + '" ');
							d.push("\x3e");
							void 0 !== c.size && (g.size = c.size);
							void 0 !== c.multiple && (g.multiple = c.multiple);
							k(a);
							for (var l = 0, t; l < c.items.length && (t = c.items[l]); l++) f.push('\x3coption value\x3d"', CKEDITOR.tools.htmlEncode(void 0 !== t[1] ? t[1] : t[0]).replace(/"/g, "\x26quot;"), '" /\x3e ', CKEDITOR.tools.htmlEncode(t[0]));
							"undefined" != typeof a.inputStyle && (a.style = a.inputStyle);
							e.select = new CKEDITOR.ui.dialog.uiElement(b, a, d, "select", null, g, f.join(""));
							d.push("\x3c/div\x3e");
							return d.join("")
						})
					}
				},
				file: function(b, c, d) {
					if (!(3 > arguments.length)) {
						void 0 === c["default"] && (c["default"] = "");
						var e = CKEDITOR.tools.extend(a.call(this, c), {
							definition: c,
							buttons: []
						});
						c.validate && (this.validate = c.validate);
						b.on("load", function() {
							CKEDITOR.document.getById(e.frameId).getParent().addClass("cke_dialog_ui_input_file")
						});
						CKEDITOR.ui.dialog.labeledElement.call(this, b, c, d, function() {
							e.frameId = CKEDITOR.tools.getNextId() + "_fileInput";
							var a = ['\x3ciframe frameborder\x3d"0" allowtransparency\x3d"0" class\x3d"cke_dialog_ui_input_file" role\x3d"presentation" id\x3d"',
								e.frameId, '" title\x3d"', c.label, '" src\x3d"javascript:void('
							];
							a.push(CKEDITOR.env.ie ? "(function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.close();") + "})()" : "0");
							a.push(')"\x3e\x3c/iframe\x3e');
							return a.join("")
						})
					}
				},
				fileButton: function(b, c, d) {
					var e = this;
					if (!(3 > arguments.length)) {
						a.call(this, c);
						c.validate && (this.validate = c.validate);
						var f = CKEDITOR.tools.extend({}, c),
							k = f.onClick;
						f.className = (f.className ? f.className + " " : "") + "cke_dialog_ui_button";
						f.onClick = function(a) {
							var d = c["for"];
							k && !1 === k.call(this, a) || (b.getContentElement(d[0], d[1]).submit(), this.disable())
						};
						b.on("load", function() {
							b.getContentElement(c["for"][0], c["for"][1])._.buttons.push(e)
						});
						CKEDITOR.ui.dialog.button.call(this, b, f, d)
					}
				},
				html: function() {
					var a = /^\s*<[\w:]+\s+([^>]*)?>/,
						b = /^(\s*<[\w:]+(?:\s+[^>]*)?)((?:.|\r|\n)+)$/,
						c = /\/$/;
					return function(d, e, f) {
						if (!(3 > arguments.length)) {
							var k = [],
								l = e.html;
							"\x3c" != l.charAt(0) && (l = "\x3cspan\x3e" + l + "\x3c/span\x3e");
							var u = e.focus;
							if (u) {
								var t = this.focus;
								this.focus = function() {
									("function" == typeof u ? u : t).call(this);
									this.fire("focus")
								};
								e.isFocusable && (this.isFocusable = this.isFocusable);
								this.keyboardFocusable = !0
							}
							CKEDITOR.ui.dialog.uiElement.call(this, d, e, k, "span", null, null, "");
							k = k.join("").match(a);
							l = l.match(b) || ["", "", ""];
							c.test(l[1]) && (l[1] = l[1].slice(0, -1), l[2] = "/" + l[2]);
							f.push([l[1], " ", k[1] || "", l[2]].join(""))
						}
					}
				}(),
				fieldset: function(a, b, c, d, e) {
					var f = e.label;
					this._ = {
						children: b
					};
					CKEDITOR.ui.dialog.uiElement.call(this, a, e, d, "fieldset", null, null, function() {
						var a = [];
						f && a.push("\x3clegend" + (e.labelStyle ? ' style\x3d"' + e.labelStyle + '"' : "") + "\x3e" + f + "\x3c/legend\x3e");
						for (var b = 0; b < c.length; b++) a.push(c[b]);
						return a.join("")
					})
				}
			}, !0);
			CKEDITOR.ui.dialog.html.prototype = new CKEDITOR.ui.dialog.uiElement;
			CKEDITOR.ui.dialog.labeledElement.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
				setLabel: function(a) {
					var b = CKEDITOR.document.getById(this._.labelId);
					1 > b.getChildCount() ? (new CKEDITOR.dom.text(a, CKEDITOR.document)).appendTo(b) : b.getChild(0).$.nodeValue = a;
					return this
				},
				getLabel: function() {
					var a = CKEDITOR.document.getById(this._.labelId);
					return !a || 1 > a.getChildCount() ? "" : a.getChild(0).getText()
				},
				eventProcessors: e
			}, !0);
			CKEDITOR.ui.dialog.button.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
				click: function() {
					return this._.disabled ? !1 : this.fire("click", {
						dialog: this._.dialog
					})
				},
				enable: function() {
					this._.disabled = !1;
					var a = this.getElement();
					a && a.removeClass("cke_disabled")
				},
				disable: function() {
					this._.disabled = !0;
					this.getElement().addClass("cke_disabled")
				},
				isVisible: function() {
					return this.getElement().getFirst().isVisible()
				},
				isEnabled: function() {
					return !this._.disabled
				},
				eventProcessors: CKEDITOR.tools.extend({}, CKEDITOR.ui.dialog.uiElement.prototype.eventProcessors, {
					onClick: function(a, b) {
						this.on("click", function() {
							b.apply(this, arguments)
						})
					}
				}, !0),
				accessKeyUp: function() {
					this.click()
				},
				accessKeyDown: function() {
					this.focus()
				},
				keyboardFocusable: !0
			}, !0);
			CKEDITOR.ui.dialog.textInput.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, {
				getInputElement: function() {
					return CKEDITOR.document.getById(this._.inputId)
				},
				focus: function() {
					var a = this.selectParentTab();
					setTimeout(function() {
						var b = a.getInputElement();
						b && b.$.focus()
					}, 0)
				},
				select: function() {
					var a = this.selectParentTab();
					setTimeout(function() {
						var b = a.getInputElement();
						b && (b.$.focus(), b.$.select())
					}, 0)
				},
				accessKeyUp: function() {
					this.select()
				},
				setValue: function(a) {
					if (this.bidi) {
						var b = a && a.charAt(0);
						(b = "‪" == b ? "ltr" : "‫" == b ? "rtl" : null) && (a = a.slice(1));
						this.setDirectionMarker(b)
					}
					a || (a = "");
					return CKEDITOR.ui.dialog.uiElement.prototype.setValue.apply(this, arguments)
				},
				getValue: function() {
					var a = CKEDITOR.ui.dialog.uiElement.prototype.getValue.call(this);
					if (this.bidi && a) {
						var b = this.getDirectionMarker();
						b && (a = ("ltr" == b ? "‪" : "‫") + a)
					}
					return a
				},
				setDirectionMarker: function(a) {
					var b = this.getInputElement();
					a ? b.setAttributes({
						dir: a,
						"data-cke-dir-marker": a
					}) : this.getDirectionMarker() && b.removeAttributes(["dir", "data-cke-dir-marker"])
				},
				getDirectionMarker: function() {
					return this.getInputElement().data("cke-dir-marker")
				},
				keyboardFocusable: !0
			}, c, !0);
			CKEDITOR.ui.dialog.textarea.prototype = new CKEDITOR.ui.dialog.textInput;
			CKEDITOR.ui.dialog.select.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, {
				getInputElement: function() {
					return this._.select.getElement()
				},
				add: function(a, b, c) {
					var d = new CKEDITOR.dom.element("option", this.getDialog().getParentEditor().document),
						e = this.getInputElement().$;
					d.$.text = a;
					d.$.value = void 0 === b || null === b ? a : b;
					void 0 === c || null === c ? CKEDITOR.env.ie ? e.add(d.$) : e.add(d.$, null) : e.add(d.$, c);
					return this
				},
				remove: function(a) {
					this.getInputElement().$.remove(a);
					return this
				},
				clear: function() {
					for (var a = this.getInputElement().$; 0 < a.length;) a.remove(0);
					return this
				},
				keyboardFocusable: !0
			}, c, !0);
			CKEDITOR.ui.dialog.checkbox.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
				getInputElement: function() {
					return this._.checkbox.getElement()
				},
				setValue: function(a, b) {
					this.getInputElement().$.checked = a;
					!b && this.fire("change", {
						value: a
					})
				},
				getValue: function() {
					return this.getInputElement().$.checked
				},
				accessKeyUp: function() {
					this.setValue(!this.getValue())
				},
				eventProcessors: {
					onChange: function(a, b) {
						if (!CKEDITOR.env.ie || 8 < CKEDITOR.env.version) return e.onChange.apply(this, arguments);
						a.on("load", function() {
							var a = this._.checkbox.getElement();
							a.on("propertychange", function(b) {
								b = b.data.$;
								"checked" == b.propertyName && this.fire("change", {
									value: a.$.checked
								})
							}, this)
						}, this);
						this.on("change", b);
						return null
					}
				},
				keyboardFocusable: !0
			}, c, !0);
			CKEDITOR.ui.dialog.radio.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
				setValue: function(a, b) {
					for (var c = this._.children, d, e = 0; e < c.length && (d = c[e]); e++) d.getElement().$.checked = d.getValue() == a;
					!b && this.fire("change", {
						value: a
					})
				},
				getValue: function() {
					for (var a = this._.children, b = 0; b < a.length; b++)
						if (a[b].getElement().$.checked) return a[b].getValue();
					return null
				},
				accessKeyUp: function() {
					var a = this._.children,
						b;
					for (b = 0; b < a.length; b++)
						if (a[b].getElement().$.checked) {
							a[b].getElement().focus();
							return
						}
					a[0].getElement().focus()
				},
				eventProcessors: {
					onChange: function(a, b) {
						if (!CKEDITOR.env.ie || 8 < CKEDITOR.env.version) return e.onChange.apply(this, arguments);
						a.on("load", function() {
							for (var a = this._.children, b = this, c = 0; c < a.length; c++) a[c].getElement().on("propertychange", function(a) {
								a = a.data.$;
								"checked" == a.propertyName && this.$.checked && b.fire("change", {
									value: this.getAttribute("value")
								})
							})
						}, this);
						this.on("change", b);
						return null
					}
				}
			}, c, !0);
			CKEDITOR.ui.dialog.file.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement, c, {
				getInputElement: function() {
					var a = CKEDITOR.document.getById(this._.frameId).getFrameDocument();
					return 0 < a.$.forms.length ? new CKEDITOR.dom.element(a.$.forms[0].elements[0]) : this.getElement()
				},
				submit: function() {
					this.getInputElement().getParent().$.submit();
					return this
				},
				getAction: function() {
					return this.getInputElement().getParent().$.action
				},
				registerEvents: function(a) {
					var b = /^on([A-Z]\w+)/,
						c, d = function(a, b, c, d) {
							a.on("formLoaded", function() {
								a.getInputElement().on(c, d, a)
							})
						},
						e;
					for (e in a)
						if (c = e.match(b)) this.eventProcessors[e] ? this.eventProcessors[e].call(this, this._.dialog, a[e]) : d(this, this._.dialog, c[1].toLowerCase(), a[e]);
					return this
				},
				reset: function() {
					function a() {
						c.$.open();
						var h = "";
						d.size && (h = d.size - (CKEDITOR.env.ie ? 7 : 0));
						var y = b.frameId + "_input";
						c.$.write(['\x3chtml dir\x3d"' + l + '" lang\x3d"' + u + '"\x3e\x3chead\x3e\x3ctitle\x3e\x3c/title\x3e\x3c/head\x3e\x3cbody style\x3d"margin: 0; overflow: hidden; background: transparent;"\x3e', '\x3cform enctype\x3d"multipart/form-data" method\x3d"POST" dir\x3d"' + l + '" lang\x3d"' + u + '" action\x3d"', CKEDITOR.tools.htmlEncode(d.action), '"\x3e\x3clabel id\x3d"', b.labelId, '" for\x3d"', y, '" style\x3d"display:none"\x3e', CKEDITOR.tools.htmlEncode(d.label), '\x3c/label\x3e\x3cinput style\x3d"width:100%" id\x3d"', y, '" aria-labelledby\x3d"', b.labelId, '" type\x3d"file" name\x3d"', CKEDITOR.tools.htmlEncode(d.id || "cke_upload"), '" size\x3d"', CKEDITOR.tools.htmlEncode(0 < h ? h : ""), '" /\x3e\x3c/form\x3e\x3c/body\x3e\x3c/html\x3e\x3cscript\x3e', CKEDITOR.env.ie ? "(" + CKEDITOR.tools.fixDomain + ")();" : "", "window.parent.CKEDITOR.tools.callFunction(" + f + ");", "window.onbeforeunload \x3d function() {window.parent.CKEDITOR.tools.callFunction(" + k + ")}", "\x3c/script\x3e"].join(""));
						c.$.close();
						for (h = 0; h < e.length; h++) e[h].enable()
					}
					var b = this._,
						c = CKEDITOR.document.getById(b.frameId).getFrameDocument(),
						d = b.definition,
						e = b.buttons,
						f = this.formLoadedNumber,
						k = this.formUnloadNumber,
						l = b.dialog._.editor.lang.dir,
						u = b.dialog._.editor.langCode;
					f || (f = this.formLoadedNumber = CKEDITOR.tools.addFunction(function() {
						this.fire("formLoaded")
					}, this), k = this.formUnloadNumber = CKEDITOR.tools.addFunction(function() {
						this.getInputElement().clearCustomData()
					}, this), this.getDialog()._.editor.on("destroy", function() {
						CKEDITOR.tools.removeFunction(f);
						CKEDITOR.tools.removeFunction(k)
					}));
					CKEDITOR.env.gecko ? setTimeout(a, 500) : a()
				},
				getValue: function() {
					return this.getInputElement().$.value || ""
				},
				setInitValue: function() {
					this._.initValue = ""
				},
				eventProcessors: {
					onChange: function(a, b) {
						this._.domOnChangeRegistered || (this.on("formLoaded", function() {
							this.getInputElement().on("change", function() {
								this.fire("change", {
									value: this.getValue()
								})
							}, this)
						}, this), this._.domOnChangeRegistered = !0);
						this.on("change", b)
					}
				},
				keyboardFocusable: !0
			}, !0);
			CKEDITOR.ui.dialog.fileButton.prototype = new CKEDITOR.ui.dialog.button;
			CKEDITOR.ui.dialog.fieldset.prototype = CKEDITOR.tools.clone(CKEDITOR.ui.dialog.hbox.prototype);
			CKEDITOR.dialog.addUIElement("text", f);
			CKEDITOR.dialog.addUIElement("password", f);
			CKEDITOR.dialog.addUIElement("textarea", b);
			CKEDITOR.dialog.addUIElement("checkbox", b);
			CKEDITOR.dialog.addUIElement("radio", b);
			CKEDITOR.dialog.addUIElement("button", b);
			CKEDITOR.dialog.addUIElement("select", b);
			CKEDITOR.dialog.addUIElement("file", b);
			CKEDITOR.dialog.addUIElement("fileButton", b);
			CKEDITOR.dialog.addUIElement("html", b);
			CKEDITOR.dialog.addUIElement("fieldset", {
				build: function(a, b, c) {
					for (var d = b.children, e, f = [], k = [], l = 0; l < d.length && (e = d[l]); l++) {
						var u = [];
						f.push(u);
						k.push(CKEDITOR.dialog._.uiElementBuilders[e.type].build(a, e, u))
					}
					return new CKEDITOR.ui.dialog[b.type](a, k, f, c, b)
				}
			})
		}
	}), CKEDITOR.DIALOG_RESIZE_NONE = 0, CKEDITOR.DIALOG_RESIZE_WIDTH = 1, CKEDITOR.DIALOG_RESIZE_HEIGHT = 2, CKEDITOR.DIALOG_RESIZE_BOTH = 3, CKEDITOR.DIALOG_STATE_IDLE = 1, CKEDITOR.DIALOG_STATE_BUSY = 2, function() {
		function a() {
			for (var a = this._.tabIdList.length,
					b = CKEDITOR.tools.indexOf(this._.tabIdList, this._.currentTabId) + a, c = b - 1; c > b - a; c--)
				if (this._.tabs[this._.tabIdList[c % a]][0].$.offsetHeight) return this._.tabIdList[c % a];
			return null
		}

		function f() {
			for (var a = this._.tabIdList.length, b = CKEDITOR.tools.indexOf(this._.tabIdList, this._.currentTabId), c = b + 1; c < b + a; c++)
				if (this._.tabs[this._.tabIdList[c % a]][0].$.offsetHeight) return this._.tabIdList[c % a];
			return null
		}

		function b(a, b) {
			for (var c = a.$.getElementsByTagName("input"), d = 0, e = c.length; d < e; d++) {
				var f = new CKEDITOR.dom.element(c[d]);
				"text" == f.getAttribute("type").toLowerCase() && (b ? (f.setAttribute("value", f.getCustomData("fake_value") || ""), f.removeCustomData("fake_value")) : (f.setCustomData("fake_value", f.getAttribute("value")), f.setAttribute("value", "")))
			}
		}

		function c(a, b) {
			var c = this.getInputElement();
			c && (a ? c.removeAttribute("aria-invalid") : c.setAttribute("aria-invalid", !0));
			a || (this.select ? this.select() : this.focus());
			b && alert(b);
			this.fire("validated", {
				valid: a,
				msg: b
			})
		}

		function e() {
			var a = this.getInputElement();
			a && a.removeAttribute("aria-invalid")
		}

		function l(a) {
			var b = CKEDITOR.dom.element.createFromHtml(CKEDITOR.addTemplate("dialog", v).output({
					id: CKEDITOR.tools.getNextNumber(),
					editorId: a.id,
					langDir: a.lang.dir,
					langCode: a.langCode,
					editorDialogClass: "cke_editor_" + a.name.replace(/\./g, "\\.") + "_dialog",
					closeTitle: a.lang.common.close,
					hidpi: CKEDITOR.env.hidpi ? "cke_hidpi" : ""
				})),
				c = b.getChild([0, 0, 0, 0, 0]),
				d = c.getChild(0),
				e = c.getChild(1);
			a.plugins.clipboard && CKEDITOR.plugins.clipboard.preventDefaultDropOnElement(c);
			!CKEDITOR.env.ie || CKEDITOR.env.quirks || CKEDITOR.env.edge || (a = "javascript:void(function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.close();") + "}())", CKEDITOR.dom.element.createFromHtml('\x3ciframe frameBorder\x3d"0" class\x3d"cke_iframe_shim" src\x3d"' + a + '" tabIndex\x3d"-1"\x3e\x3c/iframe\x3e').appendTo(c.getParent()));
			d.unselectable();
			e.unselectable();
			return {
				element: b,
				parts: {
					dialog: b.getChild(0),
					title: d,
					close: e,
					tabs: c.getChild(2),
					contents: c.getChild([3, 0, 0, 0]),
					footer: c.getChild([3, 0, 1, 0])
				}
			}
		}

		function k(a, b, c) {
			this.element = b;
			this.focusIndex = c;
			this.tabIndex = 0;
			this.isFocusable = function() {
				return !b.getAttribute("disabled") && b.isVisible()
			};
			this.focus = function() {
				a._.currentFocusIndex = this.focusIndex;
				this.element.focus()
			};
			b.on("keydown", function(a) {
				a.data.getKeystroke() in {
					32: 1,
					13: 1
				} && this.fire("click")
			});
			b.on("focus", function() {
				this.fire("mouseover")
			});
			b.on("blur", function() {
				this.fire("mouseout")
			})
		}

		function d(a) {
			function b() {
				a.layout()
			}
			var c = CKEDITOR.document.getWindow();
			c.on("resize", b);
			a.on("hide", function() {
				c.removeListener("resize", b)
			})
		}

		function h(a, b) {
			this._ = {
				dialog: a
			};
			CKEDITOR.tools.extend(this, b)
		}

		function m(a) {
			function b(c) {
				var k = a.getSize(),
					m = CKEDITOR.document.getWindow().getViewPaneSize(),
					l = c.data.$.screenX,
					q = c.data.$.screenY,
					n = l - d.x,
					t = q - d.y;
				d = {
					x: l,
					y: q
				};
				e.x += n;
				e.y += t;
				a.move(e.x + h[3] < g ? -h[3] : e.x - h[1] > m.width - k.width - g ? m.width - k.width + ("rtl" == f.lang.dir ? 0 : h[1]) : e.x, e.y + h[0] < g ? -h[0] : e.y - h[2] > m.height - k.height - g ? m.height - k.height + h[2] : e.y, 1);
				c.data.preventDefault()
			}

			function c() {
				CKEDITOR.document.removeListener("mousemove", b);
				CKEDITOR.document.removeListener("mouseup", c);
				if (CKEDITOR.env.ie6Compat) {
					var a = z.getChild(0).getFrameDocument();
					a.removeListener("mousemove", b);
					a.removeListener("mouseup", c)
				}
			}
			var d = null,
				e = null,
				f = a.getParentEditor(),
				g = f.config.dialog_magnetDistance,
				h = CKEDITOR.skin.margins || [0, 0, 0, 0];
			"undefined" == typeof g && (g = 20);
			a.parts.title.on("mousedown", function(f) {
				d = {
					x: f.data.$.screenX,
					y: f.data.$.screenY
				};
				CKEDITOR.document.on("mousemove", b);
				CKEDITOR.document.on("mouseup", c);
				e = a.getPosition();
				if (CKEDITOR.env.ie6Compat) {
					var g = z.getChild(0).getFrameDocument();
					g.on("mousemove", b);
					g.on("mouseup", c)
				}
				f.data.preventDefault()
			}, a)
		}

		function g(a) {
			function b(c) {
				var q = "rtl" == f.lang.dir,
					n = l.width,
					t = l.height,
					u = n + (c.data.$.screenX - m.x) * (q ? -1 : 1) * (a._.moved ? 1 : 2),
					y = t + (c.data.$.screenY - m.y) * (a._.moved ? 1 : 2),
					w = a._.element.getFirst(),
					w = q && w.getComputedStyle("right"),
					v = a.getPosition();
				v.y + y > k.height && (y = k.height - v.y);
				(q ? w : v.x) + u > k.width && (u = k.width - (q ? w : v.x));
				if (e == CKEDITOR.DIALOG_RESIZE_WIDTH || e == CKEDITOR.DIALOG_RESIZE_BOTH) n = Math.max(d.minWidth || 0, u - g);
				if (e == CKEDITOR.DIALOG_RESIZE_HEIGHT || e == CKEDITOR.DIALOG_RESIZE_BOTH) t = Math.max(d.minHeight || 0, y - h);
				a.resize(n, t);
				a._.moved || a.layout();
				c.data.preventDefault()
			}

			function c() {
				CKEDITOR.document.removeListener("mouseup", c);
				CKEDITOR.document.removeListener("mousemove", b);
				q && (q.remove(), q = null);
				if (CKEDITOR.env.ie6Compat) {
					var a = z.getChild(0).getFrameDocument();
					a.removeListener("mouseup", c);
					a.removeListener("mousemove", b)
				}
			}
			var d = a.definition,
				e = d.resizable;
			if (e != CKEDITOR.DIALOG_RESIZE_NONE) {
				var f = a.getParentEditor(),
					g, h, k, m, l, q, n = CKEDITOR.tools.addFunction(function(d) {
						l = a.getSize();
						var e = a.parts.contents;
						e.$.getElementsByTagName("iframe").length && (q = CKEDITOR.dom.element.createFromHtml('\x3cdiv class\x3d"cke_dialog_resize_cover" style\x3d"height: 100%; position: absolute; width: 100%;"\x3e\x3c/div\x3e'), e.append(q));
						h = l.height - a.parts.contents.getSize("height", !(CKEDITOR.env.gecko || CKEDITOR.env.ie && CKEDITOR.env.quirks));
						g = l.width - a.parts.contents.getSize("width", 1);
						m = {
							x: d.screenX,
							y: d.screenY
						};
						k = CKEDITOR.document.getWindow().getViewPaneSize();
						CKEDITOR.document.on("mousemove", b);
						CKEDITOR.document.on("mouseup", c);
						CKEDITOR.env.ie6Compat && (e = z.getChild(0).getFrameDocument(), e.on("mousemove", b), e.on("mouseup", c));
						d.preventDefault && d.preventDefault()
					});
				a.on("load", function() {
					var b = "";
					e == CKEDITOR.DIALOG_RESIZE_WIDTH ? b = " cke_resizer_horizontal" : e == CKEDITOR.DIALOG_RESIZE_HEIGHT && (b = " cke_resizer_vertical");
					b = CKEDITOR.dom.element.createFromHtml('\x3cdiv class\x3d"cke_resizer' + b + " cke_resizer_" + f.lang.dir + '" title\x3d"' + CKEDITOR.tools.htmlEncode(f.lang.common.resize) + '" onmousedown\x3d"CKEDITOR.tools.callFunction(' + n + ', event )"\x3e' + ("ltr" == f.lang.dir ? "◢" : "◣") + "\x3c/div\x3e");
					a.parts.footer.append(b, 1)
				});
				f.on("destroy", function() {
					CKEDITOR.tools.removeFunction(n)
				})
			}
		}

		function n(a) {
			a.data.preventDefault(1)
		}

		function p(a) {
			var b = CKEDITOR.document.getWindow(),
				c = a.config,
				d = CKEDITOR.skinName || a.config.skin,
				e = c.dialog_backgroundCoverColor || ("moono-lisa" == d ? "black" : "white"),
				d = c.dialog_backgroundCoverOpacity,
				f = c.baseFloatZIndex,
				c = CKEDITOR.tools.genKey(e, d, f),
				g = B[c];
			g ? g.show() : (f = ['\x3cdiv tabIndex\x3d"-1" style\x3d"position: ', CKEDITOR.env.ie6Compat ? "absolute" : "fixed", "; z-index: ", f, "; top: 0px; left: 0px; ", CKEDITOR.env.ie6Compat ? "" : "background-color: " + e, '" class\x3d"cke_dialog_background_cover"\x3e'], CKEDITOR.env.ie6Compat && (e = "\x3chtml\x3e\x3cbody style\x3d\\'background-color:" + e + ";\\'\x3e\x3c/body\x3e\x3c/html\x3e", f.push('\x3ciframe hidefocus\x3d"true" frameborder\x3d"0" id\x3d"cke_dialog_background_iframe" src\x3d"javascript:'), f.push("void((function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.write( '" + e + "' );document.close();") + "})())"), f.push('" style\x3d"position:absolute;left:0;top:0;width:100%;height: 100%;filter: progid:DXImageTransform.Microsoft.Alpha(opacity\x3d0)"\x3e\x3c/iframe\x3e')), f.push("\x3c/div\x3e"), g = CKEDITOR.dom.element.createFromHtml(f.join("")), g.setOpacity(void 0 !== d ? d : .5), g.on("keydown", n), g.on("keypress", n), g.on("keyup", n), g.appendTo(CKEDITOR.document.getBody()), B[c] = g);
			a.focusManager.add(g);
			z = g;
			a = function() {
				var a = b.getViewPaneSize();
				g.setStyles({
					width: a.width + "px",
					height: a.height + "px"
				})
			};
			var h = function() {
				var a = b.getScrollPosition(),
					c = CKEDITOR.dialog._.currentTop;
				g.setStyles({
					left: a.x + "px",
					top: a.y + "px"
				});
				if (c) {
					do a = c.getPosition(), c.move(a.x, a.y); while (c = c._.parentDialog)
				}
			};
			w = a;
			b.on("resize", a);
			a();
			CKEDITOR.env.mac && CKEDITOR.env.webkit || g.focus();
			if (CKEDITOR.env.ie6Compat) {
				var k = function() {
					h();
					arguments.callee.prevScrollHandler.apply(this, arguments)
				};
				b.$.setTimeout(function() {
					k.prevScrollHandler = window.onscroll || function() {};
					window.onscroll = k
				}, 0);
				h()
			}
		}

		function r(a) {
			z && (a.focusManager.remove(z), a = CKEDITOR.document.getWindow(), z.hide(), a.removeListener("resize", w), CKEDITOR.env.ie6Compat && a.$.setTimeout(function() {
				window.onscroll = window.onscroll && window.onscroll.prevScrollHandler || null
			}, 0), w = null)
		}
		var x = CKEDITOR.tools.cssLength,
			v = '\x3cdiv class\x3d"cke_reset_all {editorId} {editorDialogClass} {hidpi}" dir\x3d"{langDir}" lang\x3d"{langCode}" role\x3d"dialog" aria-labelledby\x3d"cke_dialog_title_{id}"\x3e\x3ctable class\x3d"cke_dialog ' + CKEDITOR.env.cssClass + ' cke_{langDir}" style\x3d"position:absolute" role\x3d"presentation"\x3e\x3ctr\x3e\x3ctd role\x3d"presentation"\x3e\x3cdiv class\x3d"cke_dialog_body" role\x3d"presentation"\x3e\x3cdiv id\x3d"cke_dialog_title_{id}" class\x3d"cke_dialog_title" role\x3d"presentation"\x3e\x3c/div\x3e\x3ca id\x3d"cke_dialog_close_button_{id}" class\x3d"cke_dialog_close_button" href\x3d"javascript:void(0)" title\x3d"{closeTitle}" role\x3d"button"\x3e\x3cspan class\x3d"cke_label"\x3eX\x3c/span\x3e\x3c/a\x3e\x3cdiv id\x3d"cke_dialog_tabs_{id}" class\x3d"cke_dialog_tabs" role\x3d"tablist"\x3e\x3c/div\x3e\x3ctable class\x3d"cke_dialog_contents" role\x3d"presentation"\x3e\x3ctr\x3e\x3ctd id\x3d"cke_dialog_contents_{id}" class\x3d"cke_dialog_contents_body" role\x3d"presentation"\x3e\x3c/td\x3e\x3c/tr\x3e\x3ctr\x3e\x3ctd id\x3d"cke_dialog_footer_{id}" class\x3d"cke_dialog_footer" role\x3d"presentation"\x3e\x3c/td\x3e\x3c/tr\x3e\x3c/table\x3e\x3c/div\x3e\x3c/td\x3e\x3c/tr\x3e\x3c/table\x3e\x3c/div\x3e';
		CKEDITOR.dialog = function(b, d) {
			function h() {
				var a = z._.focusList;
				a.sort(function(a, b) {
					return a.tabIndex != b.tabIndex ? b.tabIndex - a.tabIndex : a.focusIndex - b.focusIndex
				});
				for (var b = a.length, c = 0; c < b; c++) a[c].focusIndex = c
			}

			function k(a) {
				var b = z._.focusList;
				a = a || 0;
				if (!(1 > b.length)) {
					var c = z._.currentFocusIndex;
					z._.tabBarMode && 0 > a && (c = 0);
					try {
						b[c].getInputElement().$.blur()
					} catch (d) {}
					var e = c,
						f = 1 < z._.pageCount;
					do {
						e += a;
						if (f && !z._.tabBarMode && (e == b.length || -1 == e)) {
							z._.tabBarMode = !0;
							z._.tabs[z._.currentTabId][0].focus();
							z._.currentFocusIndex = -1;
							return
						}
						e = (e + b.length) % b.length;
						if (e == c) break
					} while (a && !b[e].isFocusable());
					b[e].focus();
					"text" == b[e].type && b[e].select()
				}
			}

			function n(c) {
				if (z == CKEDITOR.dialog._.currentTop) {
					var d = c.data.getKeystroke(),
						e = "rtl" == b.lang.dir,
						g = [37, 38, 39, 40];
					x = B = 0;
					if (9 == d || d == CKEDITOR.SHIFT + 9) k(d == CKEDITOR.SHIFT + 9 ? -1 : 1), x = 1;
					else if (d == CKEDITOR.ALT + 121 && !z._.tabBarMode && 1 < z.getPageCount()) z._.tabBarMode = !0, z._.tabs[z._.currentTabId][0].focus(), z._.currentFocusIndex = -1, x = 1;
					else if (-1 != CKEDITOR.tools.indexOf(g, d) && z._.tabBarMode) d = -1 != CKEDITOR.tools.indexOf([e ? 39 : 37, 38], d) ? a.call(z) : f.call(z), z.selectPage(d), z._.tabs[d][0].focus(), x = 1;
					else if (13 != d && 32 != d || !z._.tabBarMode)
						if (13 == d) d = c.data.getTarget(), d.is("a", "button", "select", "textarea") || d.is("input") && "button" == d.$.type || ((d = this.getButton("ok")) && CKEDITOR.tools.setTimeout(d.click, 0, d), x = 1), B = 1;
						else if (27 == d)(d = this.getButton("cancel")) ? CKEDITOR.tools.setTimeout(d.click, 0, d) : !1 !== this.fire("cancel", {
						hide: !0
					}).hide && this.hide(), B = 1;
					else return;
					else this.selectPage(this._.currentTabId),
						this._.tabBarMode = !1, this._.currentFocusIndex = -1, k(1), x = 1;
					t(c)
				}
			}

			function t(a) {
				x ? a.data.preventDefault(1) : B && a.data.stopPropagation()
			}
			var y = CKEDITOR.dialog._.dialogDefinitions[d],
				w = CKEDITOR.tools.clone(u),
				v = b.config.dialog_buttonsOrder || "OS",
				A = b.lang.dir,
				p = {},
				x, B;
			("OS" == v && CKEDITOR.env.mac || "rtl" == v && "ltr" == A || "ltr" == v && "rtl" == A) && w.buttons.reverse();
			y = CKEDITOR.tools.extend(y(b), w);
			y = CKEDITOR.tools.clone(y);
			y = new q(this, y);
			w = l(b);
			this._ = {
				editor: b,
				element: w.element,
				name: d,
				contentSize: {
					width: 0,
					height: 0
				},
				size: {
					width: 0,
					height: 0
				},
				contents: {},
				buttons: {},
				accessKeyMap: {},
				tabs: {},
				tabIdList: [],
				currentTabId: null,
				currentTabIndex: null,
				pageCount: 0,
				lastTab: null,
				tabBarMode: !1,
				focusList: [],
				currentFocusIndex: 0,
				hasFocus: !1
			};
			this.parts = w.parts;
			CKEDITOR.tools.setTimeout(function() {
				b.fire("ariaWidget", this.parts.contents)
			}, 0, this);
			w = {
				position: CKEDITOR.env.ie6Compat ? "absolute" : "fixed",
				top: 0,
				visibility: "hidden"
			};
			w["rtl" == A ? "right" : "left"] = 0;
			this.parts.dialog.setStyles(w);
			CKEDITOR.event.call(this);
			this.definition = y = CKEDITOR.fire("dialogDefinition", {
				name: d,
				definition: y
			}, b).definition;
			if (!("removeDialogTabs" in b._) && b.config.removeDialogTabs) {
				w = b.config.removeDialogTabs.split(";");
				for (A = 0; A < w.length; A++)
					if (v = w[A].split(":"), 2 == v.length) {
						var r = v[0];
						p[r] || (p[r] = []);
						p[r].push(v[1])
					}
				b._.removeDialogTabs = p
			}
			if (b._.removeDialogTabs && (p = b._.removeDialogTabs[d]))
				for (A = 0; A < p.length; A++) y.removeContents(p[A]);
			if (y.onLoad) this.on("load", y.onLoad);
			if (y.onShow) this.on("show", y.onShow);
			if (y.onHide) this.on("hide", y.onHide);
			if (y.onOk) this.on("ok", function(a) {
				b.fire("saveSnapshot");
				setTimeout(function() {
					b.fire("saveSnapshot")
				}, 0);
				!1 === y.onOk.call(this, a) && (a.data.hide = !1)
			});
			this.state = CKEDITOR.DIALOG_STATE_IDLE;
			if (y.onCancel) this.on("cancel", function(a) {
				!1 === y.onCancel.call(this, a) && (a.data.hide = !1)
			});
			var z = this,
				C = function(a) {
					var b = z._.contents,
						c = !1,
						d;
					for (d in b)
						for (var e in b[d])
							if (c = a.call(this, b[d][e])) return
				};
			this.on("ok", function(a) {
				C(function(b) {
					if (b.validate) {
						var d = b.validate(this),
							e = "string" == typeof d || !1 === d;
						e && (a.data.hide = !1, a.stop());
						c.call(b, !e, "string" == typeof d ? d : void 0);
						return e
					}
				})
			}, this, null, 0);
			this.on("cancel", function(a) {
				C(function(c) {
					if (c.isChanged()) return b.config.dialog_noConfirmCancel || confirm(b.lang.common.confirmCancel) || (a.data.hide = !1), !0
				})
			}, this, null, 0);
			this.parts.close.on("click", function(a) {
				!1 !== this.fire("cancel", {
					hide: !0
				}).hide && this.hide();
				a.data.preventDefault()
			}, this);
			this.changeFocus = k;
			var E = this._.element;
			b.focusManager.add(E, 1);
			this.on("show", function() {
				E.on("keydown", n, this);
				if (CKEDITOR.env.gecko) E.on("keypress", t, this)
			});
			this.on("hide", function() {
				E.removeListener("keydown", n);
				CKEDITOR.env.gecko && E.removeListener("keypress", t);
				C(function(a) {
					e.apply(a)
				})
			});
			this.on("iframeAdded", function(a) {
				(new CKEDITOR.dom.document(a.data.iframe.$.contentWindow.document)).on("keydown", n, this, null, 0)
			});
			this.on("show", function() {
				h();
				var a = 1 < z._.pageCount;
				b.config.dialog_startupFocusTab && a ? (z._.tabBarMode = !0, z._.tabs[z._.currentTabId][0].focus(), z._.currentFocusIndex = -1) : this._.hasFocus || (this._.currentFocusIndex = a ? -1 : this._.focusList.length - 1, y.onFocus ? (a = y.onFocus.call(this)) && a.focus() : k(1))
			}, this, null, 4294967295);
			if (CKEDITOR.env.ie6Compat) this.on("load", function() {
				var a = this.getElement(),
					b = a.getFirst();
				b.remove();
				b.appendTo(a)
			}, this);
			m(this);
			g(this);
			(new CKEDITOR.dom.text(y.title, CKEDITOR.document)).appendTo(this.parts.title);
			for (A = 0; A < y.contents.length; A++)(p = y.contents[A]) && this.addPage(p);
			this.parts.tabs.on("click", function(a) {
				var b = a.data.getTarget();
				b.hasClass("cke_dialog_tab") && (b = b.$.id, this.selectPage(b.substring(4, b.lastIndexOf("_"))), this._.tabBarMode && (this._.tabBarMode = !1, this._.currentFocusIndex = -1, k(1)), a.data.preventDefault())
			}, this);
			A = [];
			p = CKEDITOR.dialog._.uiElementBuilders.hbox.build(this, {
				type: "hbox",
				className: "cke_dialog_footer_buttons",
				widths: [],
				children: y.buttons
			}, A).getChild();
			this.parts.footer.setHtml(A.join(""));
			for (A = 0; A < p.length; A++) this._.buttons[p[A].id] = p[A]
		};
		CKEDITOR.dialog.prototype = {
			destroy: function() {
				this.hide();
				this._.element.remove()
			},
			resize: function() {
				return function(a, b) {
					this._.contentSize && this._.contentSize.width == a && this._.contentSize.height == b || (CKEDITOR.dialog.fire("resize", {
						dialog: this,
						width: a,
						height: b
					}, this._.editor), this.fire("resize", {
						width: a,
						height: b
					}, this._.editor), this.parts.contents.setStyles({
						width: a + "px",
						height: b + "px"
					}), "rtl" == this._.editor.lang.dir && this._.position && (this._.position.x = CKEDITOR.document.getWindow().getViewPaneSize().width - this._.contentSize.width - parseInt(this._.element.getFirst().getStyle("right"), 10)), this._.contentSize = {
						width: a,
						height: b
					})
				}
			}(),
			getSize: function() {
				var a = this._.element.getFirst();
				return {
					width: a.$.offsetWidth || 0,
					height: a.$.offsetHeight || 0
				}
			},
			move: function(a, b, c) {
				var d = this._.element.getFirst(),
					e = "rtl" == this._.editor.lang.dir,
					f = "fixed" == d.getComputedStyle("position");
				CKEDITOR.env.ie && d.setStyle("zoom", "100%");
				f && this._.position && this._.position.x == a && this._.position.y == b || (this._.position = {
					x: a,
					y: b
				}, f || (f = CKEDITOR.document.getWindow().getScrollPosition(), a += f.x, b += f.y), e && (f = this.getSize(), a = CKEDITOR.document.getWindow().getViewPaneSize().width - f.width - a), b = {
					top: (0 < b ? b : 0) + "px"
				}, b[e ? "right" : "left"] = (0 < a ? a : 0) + "px", d.setStyles(b), c && (this._.moved = 1))
			},
			getPosition: function() {
				return CKEDITOR.tools.extend({}, this._.position)
			},
			show: function() {
				var a = this._.element,
					b = this.definition;
				a.getParent() && a.getParent().equals(CKEDITOR.document.getBody()) ? a.setStyle("display", "block") : a.appendTo(CKEDITOR.document.getBody());
				this.resize(this._.contentSize && this._.contentSize.width || b.width || b.minWidth, this._.contentSize && this._.contentSize.height || b.height || b.minHeight);
				this.reset();
				this.selectPage(this.definition.contents[0].id);
				null === CKEDITOR.dialog._.currentZIndex && (CKEDITOR.dialog._.currentZIndex = this._.editor.config.baseFloatZIndex);
				this._.element.getFirst().setStyle("z-index", CKEDITOR.dialog._.currentZIndex += 10);
				null === CKEDITOR.dialog._.currentTop ? (CKEDITOR.dialog._.currentTop = this, this._.parentDialog = null, p(this._.editor)) : (this._.parentDialog = CKEDITOR.dialog._.currentTop, this._.parentDialog.getElement().getFirst().$.style.zIndex -= Math.floor(this._.editor.config.baseFloatZIndex / 2), CKEDITOR.dialog._.currentTop = this);
				a.on("keydown", E);
				a.on("keyup", G);
				this._.hasFocus = !1;
				for (var c in b.contents)
					if (b.contents[c]) {
						var a = b.contents[c],
							e = this._.tabs[a.id],
							f = a.requiredContent,
							g = 0;
						if (e) {
							for (var h in this._.contents[a.id]) {
								var k = this._.contents[a.id][h];
								"hbox" != k.type && "vbox" != k.type && k.getInputElement() && (k.requiredContent && !this._.editor.activeFilter.check(k.requiredContent) ? k.disable() : (k.enable(), g++))
							}!g || f && !this._.editor.activeFilter.check(f) ? e[0].addClass("cke_dialog_tab_disabled") : e[0].removeClass("cke_dialog_tab_disabled")
						}
					}
				CKEDITOR.tools.setTimeout(function() {
					this.layout();
					d(this);
					this.parts.dialog.setStyle("visibility", "");
					this.fireOnce("load", {});
					CKEDITOR.ui.fire("ready", this);
					this.fire("show", {});
					this._.editor.fire("dialogShow", this);
					this._.parentDialog || this._.editor.focusManager.lock();
					this.foreach(function(a) {
						a.setInitValue && a.setInitValue()
					})
				}, 100, this)
			},
			layout: function() {
				var a = this.parts.dialog,
					b = this.getSize(),
					c = CKEDITOR.document.getWindow().getViewPaneSize(),
					d = (c.width - b.width) / 2,
					e = (c.height - b.height) / 2;
				CKEDITOR.env.ie6Compat || (b.height + (0 < e ? e : 0) > c.height || b.width + (0 < d ? d : 0) > c.width ? a.setStyle("position", "absolute") : a.setStyle("position", "fixed"));
				this.move(this._.moved ? this._.position.x : d, this._.moved ? this._.position.y : e)
			},
			foreach: function(a) {
				for (var b in this._.contents)
					for (var c in this._.contents[b]) a.call(this, this._.contents[b][c]);
				return this
			},
			reset: function() {
				var a = function(a) {
					a.reset && a.reset(1)
				};
				return function() {
					this.foreach(a);
					return this
				}
			}(),
			setupContent: function() {
				var a = arguments;
				this.foreach(function(b) {
					b.setup && b.setup.apply(b, a)
				})
			},
			commitContent: function() {
				var a = arguments;
				this.foreach(function(b) {
					CKEDITOR.env.ie && this._.currentFocusIndex == b.focusIndex && b.getInputElement().$.blur();
					b.commit && b.commit.apply(b, a)
				})
			},
			hide: function() {
				if (this.parts.dialog.isVisible()) {
					this.fire("hide", {});
					this._.editor.fire("dialogHide", this);
					this.selectPage(this._.tabIdList[0]);
					var a = this._.element;
					a.setStyle("display", "none");
					this.parts.dialog.setStyle("visibility", "hidden");
					for (J(this); CKEDITOR.dialog._.currentTop != this;) CKEDITOR.dialog._.currentTop.hide();
					if (this._.parentDialog) {
						var b = this._.parentDialog.getElement().getFirst();
						b.setStyle("z-index", parseInt(b.$.style.zIndex, 10) + Math.floor(this._.editor.config.baseFloatZIndex / 2))
					} else r(this._.editor);
					if (CKEDITOR.dialog._.currentTop = this._.parentDialog) CKEDITOR.dialog._.currentZIndex -= 10;
					else {
						CKEDITOR.dialog._.currentZIndex = null;
						a.removeListener("keydown", E);
						a.removeListener("keyup", G);
						var c = this._.editor;
						c.focus();
						setTimeout(function() {
							c.focusManager.unlock();
							CKEDITOR.env.iOS && c.window.focus()
						}, 0)
					}
					delete this._.parentDialog;
					this.foreach(function(a) {
						a.resetInitValue && a.resetInitValue()
					});
					this.setState(CKEDITOR.DIALOG_STATE_IDLE)
				}
			},
			addPage: function(a) {
				if (!a.requiredContent || this._.editor.filter.check(a.requiredContent)) {
					for (var b = [], c = a.label ? ' title\x3d"' + CKEDITOR.tools.htmlEncode(a.label) + '"' : "", d = CKEDITOR.dialog._.uiElementBuilders.vbox.build(this, {
								type: "vbox",
								className: "cke_dialog_page_contents",
								children: a.elements,
								expand: !!a.expand,
								padding: a.padding,
								style: a.style || "width: 100%;"
							}, b), e = this._.contents[a.id] = {}, f = d.getChild(),
							g = 0; d = f.shift();) d.notAllowed || "hbox" == d.type || "vbox" == d.type || g++, e[d.id] = d, "function" == typeof d.getChild && f.push.apply(f, d.getChild());
					g || (a.hidden = !0);
					b = CKEDITOR.dom.element.createFromHtml(b.join(""));
					b.setAttribute("role", "tabpanel");
					d = CKEDITOR.env;
					e = "cke_" + a.id + "_" + CKEDITOR.tools.getNextNumber();
					c = CKEDITOR.dom.element.createFromHtml(['\x3ca class\x3d"cke_dialog_tab"', 0 < this._.pageCount ? " cke_last" : "cke_first", c, a.hidden ? ' style\x3d"display:none"' : "", ' id\x3d"', e, '"', d.gecko && !d.hc ? "" : ' href\x3d"javascript:void(0)"', ' tabIndex\x3d"-1" hidefocus\x3d"true" role\x3d"tab"\x3e', a.label, "\x3c/a\x3e"].join(""));
					b.setAttribute("aria-labelledby", e);
					this._.tabs[a.id] = [c, b];
					this._.tabIdList.push(a.id);
					!a.hidden && this._.pageCount++;
					this._.lastTab = c;
					this.updateStyle();
					b.setAttribute("name", a.id);
					b.appendTo(this.parts.contents);
					c.unselectable();
					this.parts.tabs.append(c);
					a.accessKey && (F(this, this, "CTRL+" + a.accessKey, M, H), this._.accessKeyMap["CTRL+" + a.accessKey] = a.id)
				}
			},
			selectPage: function(a) {
				if (this._.currentTabId != a && !this._.tabs[a][0].hasClass("cke_dialog_tab_disabled") && !1 !== this.fire("selectPage", {
						page: a,
						currentPage: this._.currentTabId
					})) {
					for (var c in this._.tabs) {
						var d = this._.tabs[c][0],
							e = this._.tabs[c][1];
						c != a && (d.removeClass("cke_dialog_tab_selected"), e.hide());
						e.setAttribute("aria-hidden", c != a)
					}
					var f = this._.tabs[a];
					f[0].addClass("cke_dialog_tab_selected");
					CKEDITOR.env.ie6Compat || CKEDITOR.env.ie7Compat ? (b(f[1]), f[1].show(), setTimeout(function() {
						b(f[1], 1)
					}, 0)) : f[1].show();
					this._.currentTabId = a;
					this._.currentTabIndex = CKEDITOR.tools.indexOf(this._.tabIdList, a)
				}
			},
			updateStyle: function() {
				this.parts.dialog[(1 === this._.pageCount ? "add" : "remove") + "Class"]("cke_single_page")
			},
			hidePage: function(b) {
				var c = this._.tabs[b] && this._.tabs[b][0];
				c && 1 != this._.pageCount && c.isVisible() && (b == this._.currentTabId && this.selectPage(a.call(this)), c.hide(), this._.pageCount--, this.updateStyle())
			},
			showPage: function(a) {
				if (a = this._.tabs[a] && this._.tabs[a][0]) a.show(), this._.pageCount++, this.updateStyle()
			},
			getElement: function() {
				return this._.element
			},
			getName: function() {
				return this._.name
			},
			getContentElement: function(a, b) {
				var c = this._.contents[a];
				return c && c[b]
			},
			getValueOf: function(a, b) {
				return this.getContentElement(a, b).getValue()
			},
			setValueOf: function(a, b, c) {
				return this.getContentElement(a, b).setValue(c)
			},
			getButton: function(a) {
				return this._.buttons[a]
			},
			click: function(a) {
				return this._.buttons[a].click()
			},
			disableButton: function(a) {
				return this._.buttons[a].disable()
			},
			enableButton: function(a) {
				return this._.buttons[a].enable()
			},
			getPageCount: function() {
				return this._.pageCount
			},
			getParentEditor: function() {
				return this._.editor
			},
			getSelectedElement: function() {
				return this.getParentEditor().getSelection().getSelectedElement()
			},
			addFocusable: function(a, b) {
				if ("undefined" == typeof b) b = this._.focusList.length, this._.focusList.push(new k(this, a, b));
				else {
					this._.focusList.splice(b, 0, new k(this, a, b));
					for (var c = b + 1; c < this._.focusList.length; c++) this._.focusList[c].focusIndex++
				}
			},
			setState: function(a) {
				if (this.state != a) {
					this.state = a;
					if (a == CKEDITOR.DIALOG_STATE_BUSY) {
						if (!this.parts.spinner) {
							var b = this.getParentEditor().lang.dir,
								c = {
									attributes: {
										"class": "cke_dialog_spinner"
									},
									styles: {
										"float": "rtl" == b ? "right" : "left"
									}
								};
							c.styles["margin-" + ("rtl" == b ? "left" : "right")] = "8px";
							this.parts.spinner = CKEDITOR.document.createElement("div", c);
							this.parts.spinner.setHtml("\x26#8987;");
							this.parts.spinner.appendTo(this.parts.title, 1)
						}
						this.parts.spinner.show();
						this.getButton("ok").disable()
					} else a == CKEDITOR.DIALOG_STATE_IDLE && (this.parts.spinner && this.parts.spinner.hide(), this.getButton("ok").enable());
					this.fire("state", a)
				}
			}
		};
		CKEDITOR.tools.extend(CKEDITOR.dialog, {
			add: function(a, b) {
				this._.dialogDefinitions[a] && "function" != typeof b || (this._.dialogDefinitions[a] = b)
			},
			exists: function(a) {
				return !!this._.dialogDefinitions[a]
			},
			getCurrent: function() {
				return CKEDITOR.dialog._.currentTop
			},
			isTabEnabled: function(a, b, c) {
				a = a.config.removeDialogTabs;
				return !(a && a.match(new RegExp("(?:^|;)" + b + ":" + c + "(?:$|;)", "i")))
			},
			okButton: function() {
				var a = function(a, b) {
					b = b || {};
					return CKEDITOR.tools.extend({
						id: "ok",
						type: "button",
						label: a.lang.common.ok,
						"class": "cke_dialog_ui_button_ok",
						onClick: function(a) {
							a = a.data.dialog;
							!1 !== a.fire("ok", {
								hide: !0
							}).hide && a.hide()
						}
					}, b, !0)
				};
				a.type = "button";
				a.override = function(b) {
					return CKEDITOR.tools.extend(function(c) {
						return a(c, b)
					}, {
						type: "button"
					}, !0)
				};
				return a
			}(),
			cancelButton: function() {
				var a = function(a, b) {
					b = b || {};
					return CKEDITOR.tools.extend({
						id: "cancel",
						type: "button",
						label: a.lang.common.cancel,
						"class": "cke_dialog_ui_button_cancel",
						onClick: function(a) {
							a = a.data.dialog;
							!1 !== a.fire("cancel", {
								hide: !0
							}).hide && a.hide()
						}
					}, b, !0)
				};
				a.type = "button";
				a.override = function(b) {
					return CKEDITOR.tools.extend(function(c) {
						return a(c, b)
					}, {
						type: "button"
					}, !0)
				};
				return a
			}(),
			addUIElement: function(a, b) {
				this._.uiElementBuilders[a] = b
			}
		});
		CKEDITOR.dialog._ = {
			uiElementBuilders: {},
			dialogDefinitions: {},
			currentTop: null,
			currentZIndex: null
		};
		CKEDITOR.event.implementOn(CKEDITOR.dialog);
		CKEDITOR.event.implementOn(CKEDITOR.dialog.prototype);
		var u = {
				resizable: CKEDITOR.DIALOG_RESIZE_BOTH,
				minWidth: 600,
				minHeight: 400,
				buttons: [CKEDITOR.dialog.okButton, CKEDITOR.dialog.cancelButton]
			},
			t = function(a, b, c) {
				for (var d = 0, e; e = a[d]; d++)
					if (e.id == b || c && e[c] && (e = t(e[c], b, c))) return e;
				return null
			},
			y = function(a, b, c, d, e) {
				if (c) {
					for (var f = 0, g; g = a[f]; f++) {
						if (g.id == c) return a.splice(f, 0, b), b;
						if (d && g[d] && (g = y(g[d], b, c, d, !0))) return g
					}
					if (e) return null
				}
				a.push(b);
				return b
			},
			A = function(a, b, c) {
				for (var d = 0, e; e = a[d]; d++) {
					if (e.id == b) return a.splice(d, 1);
					if (c && e[c] && (e = A(e[c], b, c))) return e
				}
				return null
			},
			q = function(a, b) {
				this.dialog = a;
				for (var c = b.contents, d = 0, e; e = c[d]; d++) c[d] = e && new h(a, e);
				CKEDITOR.tools.extend(this, b)
			};
		q.prototype = {
			getContents: function(a) {
				return t(this.contents, a)
			},
			getButton: function(a) {
				return t(this.buttons, a)
			},
			addContents: function(a, b) {
				return y(this.contents, a, b)
			},
			addButton: function(a, b) {
				return y(this.buttons, a, b)
			},
			removeContents: function(a) {
				A(this.contents, a)
			},
			removeButton: function(a) {
				A(this.buttons, a)
			}
		};
		h.prototype = {
			get: function(a) {
				return t(this.elements, a, "children")
			},
			add: function(a, b) {
				return y(this.elements, a, b, "children")
			},
			remove: function(a) {
				A(this.elements, a, "children")
			}
		};
		var w, B = {},
			z, C = {},
			E = function(a) {
				var b = a.data.$.ctrlKey || a.data.$.metaKey,
					c = a.data.$.altKey,
					d = a.data.$.shiftKey,
					e = String.fromCharCode(a.data.$.keyCode);
				(b = C[(b ? "CTRL+" : "") + (c ? "ALT+" : "") + (d ? "SHIFT+" : "") + e]) && b.length && (b = b[b.length - 1], b.keydown && b.keydown.call(b.uiElement, b.dialog, b.key), a.data.preventDefault())
			},
			G = function(a) {
				var b = a.data.$.ctrlKey || a.data.$.metaKey,
					c = a.data.$.altKey,
					d = a.data.$.shiftKey,
					e = String.fromCharCode(a.data.$.keyCode);
				(b = C[(b ? "CTRL+" : "") + (c ? "ALT+" : "") + (d ? "SHIFT+" : "") + e]) && b.length && (b = b[b.length - 1], b.keyup && (b.keyup.call(b.uiElement, b.dialog, b.key), a.data.preventDefault()))
			},
			F = function(a, b, c, d, e) {
				(C[c] || (C[c] = [])).push({
					uiElement: a,
					dialog: b,
					key: c,
					keyup: e || a.accessKeyUp,
					keydown: d || a.accessKeyDown
				})
			},
			J = function(a) {
				for (var b in C) {
					for (var c = C[b], d = c.length - 1; 0 <= d; d--) c[d].dialog != a && c[d].uiElement != a || c.splice(d, 1);
					0 === c.length && delete C[b]
				}
			},
			H = function(a, b) {
				a._.accessKeyMap[b] && a.selectPage(a._.accessKeyMap[b])
			},
			M = function() {};
		(function() {
			CKEDITOR.ui.dialog = {
				uiElement: function(a, b, c, d, e, f, g) {
					if (!(4 > arguments.length)) {
						var h = (d.call ? d(b) : d) || "div",
							k = ["\x3c", h, " "],
							m = (e && e.call ? e(b) : e) || {},
							l = (f && f.call ? f(b) : f) || {},
							q = (g && g.call ? g.call(this, a, b) : g) || "",
							n = this.domId = l.id || CKEDITOR.tools.getNextId() + "_uiElement";
						b.requiredContent && !a.getParentEditor().filter.check(b.requiredContent) && (m.display = "none", this.notAllowed = !0);
						l.id = n;
						var t = {};
						b.type && (t["cke_dialog_ui_" + b.type] = 1);
						b.className && (t[b.className] = 1);
						b.disabled && (t.cke_disabled = 1);
						for (var u = l["class"] && l["class"].split ? l["class"].split(" ") : [], n = 0; n < u.length; n++) u[n] && (t[u[n]] = 1);
						u = [];
						for (n in t) u.push(n);
						l["class"] = u.join(" ");
						b.title && (l.title = b.title);
						t = (b.style || "").split(";");
						b.align && (u = b.align, m["margin-left"] = "left" == u ? 0 : "auto", m["margin-right"] = "right" == u ? 0 : "auto");
						for (n in m) t.push(n + ":" + m[n]);
						b.hidden && t.push("display:none");
						for (n = t.length - 1; 0 <= n; n--) "" === t[n] && t.splice(n, 1);
						0 < t.length && (l.style = (l.style ? l.style + "; " : "") + t.join("; "));
						for (n in l) k.push(n + '\x3d"' + CKEDITOR.tools.htmlEncode(l[n]) + '" ');
						k.push("\x3e", q, "\x3c/", h, "\x3e");
						c.push(k.join(""));
						(this._ || (this._ = {})).dialog = a;
						"boolean" == typeof b.isChanged && (this.isChanged = function() {
							return b.isChanged
						});
						"function" == typeof b.isChanged && (this.isChanged = b.isChanged);
						"function" == typeof b.setValue && (this.setValue = CKEDITOR.tools.override(this.setValue, function(a) {
							return function(c) {
								a.call(this, b.setValue.call(this, c))
							}
						}));
						"function" == typeof b.getValue && (this.getValue = CKEDITOR.tools.override(this.getValue, function(a) {
							return function() {
								return b.getValue.call(this, a.call(this))
							}
						}));
						CKEDITOR.event.implementOn(this);
						this.registerEvents(b);
						this.accessKeyUp && this.accessKeyDown && b.accessKey && F(this, a, "CTRL+" + b.accessKey);
						var y = this;
						a.on("load", function() {
							var b = y.getInputElement();
							if (b) {
								var c = y.type in {
									checkbox: 1,
									ratio: 1
								} && CKEDITOR.env.ie && 8 > CKEDITOR.env.version ? "cke_dialog_ui_focused" : "";
								b.on("focus", function() {
									a._.tabBarMode = !1;
									a._.hasFocus = !0;
									y.fire("focus");
									c && this.addClass(c)
								});
								b.on("blur", function() {
									y.fire("blur");
									c && this.removeClass(c)
								})
							}
						});
						CKEDITOR.tools.extend(this, b);
						this.keyboardFocusable && (this.tabIndex = b.tabIndex || 0, this.focusIndex = a._.focusList.push(this) - 1, this.on("focus", function() {
							a._.currentFocusIndex = y.focusIndex
						}))
					}
				},
				hbox: function(a, b, c, d, e) {
					if (!(4 > arguments.length)) {
						this._ || (this._ = {});
						var f = this._.children = b,
							g = e && e.widths || null,
							h = e && e.height || null,
							k, m = {
								role: "presentation"
							};
						e && e.align && (m.align = e.align);
						CKEDITOR.ui.dialog.uiElement.call(this, a, e || {
							type: "hbox"
						}, d, "table", {}, m, function() {
							var a = ['\x3ctbody\x3e\x3ctr class\x3d"cke_dialog_ui_hbox"\x3e'];
							for (k = 0; k < c.length; k++) {
								var b = "cke_dialog_ui_hbox_child",
									d = [];
								0 === k && (b = "cke_dialog_ui_hbox_first");
								k == c.length - 1 && (b = "cke_dialog_ui_hbox_last");
								a.push('\x3ctd class\x3d"', b, '" role\x3d"presentation" ');
								g ? g[k] && d.push("width:" + x(g[k])) : d.push("width:" + Math.floor(100 / c.length) + "%");
								h && d.push("height:" + x(h));
								e && void 0 !== e.padding && d.push("padding:" + x(e.padding));
								CKEDITOR.env.ie && CKEDITOR.env.quirks && f[k].align && d.push("text-align:" + f[k].align);
								0 < d.length && a.push('style\x3d"' + d.join("; ") + '" ');
								a.push("\x3e", c[k], "\x3c/td\x3e")
							}
							a.push("\x3c/tr\x3e\x3c/tbody\x3e");
							return a.join("")
						})
					}
				},
				vbox: function(a, b, c, d, e) {
					if (!(3 > arguments.length)) {
						this._ || (this._ = {});
						var f = this._.children = b,
							g = e && e.width || null,
							h = e && e.heights || null;
						CKEDITOR.ui.dialog.uiElement.call(this, a, e || {
							type: "vbox"
						}, d, "div", null, {
							role: "presentation"
						}, function() {
							var b = ['\x3ctable role\x3d"presentation" cellspacing\x3d"0" border\x3d"0" '];
							b.push('style\x3d"');
							e && e.expand && b.push("height:100%;");
							b.push("width:" + x(g || "100%"), ";");
							CKEDITOR.env.webkit && b.push("float:none;");
							b.push('"');
							b.push('align\x3d"', CKEDITOR.tools.htmlEncode(e && e.align || ("ltr" == a.getParentEditor().lang.dir ? "left" : "right")), '" ');
							b.push("\x3e\x3ctbody\x3e");
							for (var d = 0; d < c.length; d++) {
								var k = [];
								b.push('\x3ctr\x3e\x3ctd role\x3d"presentation" ');
								g && k.push("width:" + x(g || "100%"));
								h ? k.push("height:" + x(h[d])) : e && e.expand && k.push("height:" + Math.floor(100 / c.length) + "%");
								e && void 0 !== e.padding && k.push("padding:" + x(e.padding));
								CKEDITOR.env.ie && CKEDITOR.env.quirks && f[d].align && k.push("text-align:" + f[d].align);
								0 < k.length && b.push('style\x3d"', k.join("; "), '" ');
								b.push(' class\x3d"cke_dialog_ui_vbox_child"\x3e', c[d], "\x3c/td\x3e\x3c/tr\x3e")
							}
							b.push("\x3c/tbody\x3e\x3c/table\x3e");
							return b.join("")
						})
					}
				}
			}
		})();
		CKEDITOR.ui.dialog.uiElement.prototype = {
			getElement: function() {
				return CKEDITOR.document.getById(this.domId)
			},
			getInputElement: function() {
				return this.getElement()
			},
			getDialog: function() {
				return this._.dialog
			},
			setValue: function(a, b) {
				this.getInputElement().setValue(a);
				!b && this.fire("change", {
					value: a
				});
				return this
			},
			getValue: function() {
				return this.getInputElement().getValue()
			},
			isChanged: function() {
				return !1
			},
			selectParentTab: function() {
				for (var a = this.getInputElement();
					(a = a.getParent()) && -1 == a.$.className.search("cke_dialog_page_contents"););
				if (!a) return this;
				a = a.getAttribute("name");
				this._.dialog._.currentTabId != a && this._.dialog.selectPage(a);
				return this
			},
			focus: function() {
				this.selectParentTab().getInputElement().focus();
				return this
			},
			registerEvents: function(a) {
				var b = /^on([A-Z]\w+)/,
					c, d = function(a, b, c, d) {
						b.on("load", function() {
							a.getInputElement().on(c, d, a)
						})
					},
					e;
				for (e in a)
					if (c = e.match(b)) this.eventProcessors[e] ? this.eventProcessors[e].call(this, this._.dialog, a[e]) : d(this, this._.dialog, c[1].toLowerCase(), a[e]);
				return this
			},
			eventProcessors: {
				onLoad: function(a, b) {
					a.on("load", b, this)
				},
				onShow: function(a, b) {
					a.on("show", b, this)
				},
				onHide: function(a, b) {
					a.on("hide", b, this)
				}
			},
			accessKeyDown: function() {
				this.focus()
			},
			accessKeyUp: function() {},
			disable: function() {
				var a = this.getElement();
				this.getInputElement().setAttribute("disabled", "true");
				a.addClass("cke_disabled")
			},
			enable: function() {
				var a = this.getElement();
				this.getInputElement().removeAttribute("disabled");
				a.removeClass("cke_disabled")
			},
			isEnabled: function() {
				return !this.getElement().hasClass("cke_disabled")
			},
			isVisible: function() {
				return this.getInputElement().isVisible()
			},
			isFocusable: function() {
				return this.isEnabled() && this.isVisible() ? !0 : !1
			}
		};
		CKEDITOR.ui.dialog.hbox.prototype = CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement, {
			getChild: function(a) {
				if (1 > arguments.length) return this._.children.concat();
				a.splice || (a = [a]);
				return 2 > a.length ? this._.children[a[0]] : this._.children[a[0]] && this._.children[a[0]].getChild ? this._.children[a[0]].getChild(a.slice(1, a.length)) : null
			}
		}, !0);
		CKEDITOR.ui.dialog.vbox.prototype = new CKEDITOR.ui.dialog.hbox;
		(function() {
			var a = {
				build: function(a, b, c) {
					for (var d = b.children, e, f = [], g = [], h = 0; h < d.length && (e = d[h]); h++) {
						var k = [];
						f.push(k);
						g.push(CKEDITOR.dialog._.uiElementBuilders[e.type].build(a, e, k))
					}
					return new CKEDITOR.ui.dialog[b.type](a, g, f, c, b)
				}
			};
			CKEDITOR.dialog.addUIElement("hbox", a);
			CKEDITOR.dialog.addUIElement("vbox", a)
		})();
		CKEDITOR.dialogCommand = function(a, b) {
			this.dialogName = a;
			CKEDITOR.tools.extend(this, b, !0)
		};
		CKEDITOR.dialogCommand.prototype = {
			exec: function(a) {
				a.openDialog(this.dialogName)
			},
			canUndo: !1,
			editorFocus: 1
		};
		(function() {
			var a = /^([a]|[^a])+$/,
				b = /^\d*$/,
				c = /^\d*(?:\.\d+)?$/,
				d = /^(((\d*(\.\d+))|(\d*))(px|\%)?)?$/,
				e = /^(((\d*(\.\d+))|(\d*))(px|em|ex|in|cm|mm|pt|pc|\%)?)?$/i,
				f = /^(\s*[\w-]+\s*:\s*[^:;]+(?:;|$))*$/;
			CKEDITOR.VALIDATE_OR = 1;
			CKEDITOR.VALIDATE_AND = 2;
			CKEDITOR.dialog.validate = {
				functions: function() {
					var a = arguments;
					return function() {
						var b = this && this.getValue ? this.getValue() : a[0],
							c, d = CKEDITOR.VALIDATE_AND,
							e = [],
							f;
						for (f = 0; f < a.length; f++)
							if ("function" == typeof a[f]) e.push(a[f]);
							else break;
						f < a.length && "string" == typeof a[f] && (c = a[f], f++);
						f < a.length && "number" == typeof a[f] && (d = a[f]);
						var g = d == CKEDITOR.VALIDATE_AND ? !0 : !1;
						for (f = 0; f < e.length; f++) g = d == CKEDITOR.VALIDATE_AND ? g && e[f](b) : g || e[f](b);
						return g ? !0 : c
					}
				},
				regex: function(a, b) {
					return function(c) {
						c = this && this.getValue ? this.getValue() : c;
						return a.test(c) ? !0 : b
					}
				},
				notEmpty: function(b) {
					return this.regex(a, b)
				},
				integer: function(a) {
					return this.regex(b, a)
				},
				number: function(a) {
					return this.regex(c, a)
				},
				cssLength: function(a) {
					return this.functions(function(a) {
						return e.test(CKEDITOR.tools.trim(a))
					}, a)
				},
				htmlLength: function(a) {
					return this.functions(function(a) {
						return d.test(CKEDITOR.tools.trim(a))
					}, a)
				},
				inlineStyle: function(a) {
					return this.functions(function(a) {
						return f.test(CKEDITOR.tools.trim(a))
					}, a)
				},
				equals: function(a, b) {
					return this.functions(function(b) {
						return b == a
					}, b)
				},
				notEqual: function(a, b) {
					return this.functions(function(b) {
						return b != a
					}, b)
				}
			};
			CKEDITOR.on("instanceDestroyed", function(a) {
				if (CKEDITOR.tools.isEmpty(CKEDITOR.instances)) {
					for (var b; b = CKEDITOR.dialog._.currentTop;) b.hide();
					for (var c in B) B[c].remove();
					B = {}
				}
				a = a.editor._.storedDialogs;
				for (var d in a) a[d].destroy()
			})
		})();
		CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
			openDialog: function(a, b) {
				var c = null,
					d = CKEDITOR.dialog._.dialogDefinitions[a];
				null === CKEDITOR.dialog._.currentTop && p(this);
				if ("function" == typeof d) c = this._.storedDialogs || (this._.storedDialogs = {}), c = c[a] || (c[a] = new CKEDITOR.dialog(this, a)), b && b.call(c, c), c.show();
				else {
					if ("failed" == d) throw r(this), Error('[CKEDITOR.dialog.openDialog] Dialog "' + a + '" failed when loading definition.');
					"string" == typeof d && CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(d), function() {
						"function" != typeof CKEDITOR.dialog._.dialogDefinitions[a] && (CKEDITOR.dialog._.dialogDefinitions[a] = "failed");
						this.openDialog(a, b)
					}, this, 0, 1)
				}
				CKEDITOR.skin.loadPart("dialog");
				return c
			}
		})
	}(), CKEDITOR.plugins.add("dialog", {
		requires: "dialogui",
		init: function(a) {
			a.on("doubleclick", function(f) {
				f.data.dialog && a.openDialog(f.data.dialog)
			}, null, null, 999)
		}
	}), function() {
		CKEDITOR.plugins.add("a11yhelp", {
			requires: "dialog",
			availableLangs: {
				af: 1,
				ar: 1,
				az: 1,
				bg: 1,
				ca: 1,
				cs: 1,
				cy: 1,
				da: 1,
				de: 1,
				"de-ch": 1,
				el: 1,
				en: 1,
				"en-gb": 1,
				eo: 1,
				es: 1,
				et: 1,
				eu: 1,
				fa: 1,
				fi: 1,
				fo: 1,
				fr: 1,
				"fr-ca": 1,
				gl: 1,
				gu: 1,
				he: 1,
				hi: 1,
				hr: 1,
				hu: 1,
				id: 1,
				it: 1,
				ja: 1,
				km: 1,
				ko: 1,
				ku: 1,
				lt: 1,
				lv: 1,
				mk: 1,
				mn: 1,
				nb: 1,
				nl: 1,
				no: 1,
				oc: 1,
				pl: 1,
				pt: 1,
				"pt-br": 1,
				ro: 1,
				ru: 1,
				si: 1,
				sk: 1,
				sl: 1,
				sq: 1,
				sr: 1,
				"sr-latn": 1,
				sv: 1,
				th: 1,
				tr: 1,
				tt: 1,
				ug: 1,
				uk: 1,
				vi: 1,
				zh: 1,
				"zh-cn": 1
			},
			init: function(a) {
				var f = this;
				a.addCommand("a11yHelp", {
					exec: function() {
						var b = a.langCode,
							b = f.availableLangs[b] ? b : f.availableLangs[b.replace(/-.*/, "")] ? b.replace(/-.*/, "") : "en";
						CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(f.path + "dialogs/lang/" + b + ".js"), function() {
							a.lang.a11yhelp = f.langEntries[b];
							a.openDialog("a11yHelp")
						})
					},
					modes: {
						wysiwyg: 1,
						source: 1
					},
					readOnly: 1,
					canUndo: !1
				});
				a.setKeystroke(CKEDITOR.ALT + 48, "a11yHelp");
				CKEDITOR.dialog.add("a11yHelp", this.path + "dialogs/a11yhelp.js");
				a.on("ariaEditorHelpLabel", function(b) {
					b.data.label = a.lang.common.editorHelp
				})
			}
		})
	}(), CKEDITOR.plugins.add("about", {
		requires: "dialog",
		init: function(a) {
			var f = a.addCommand("about", new CKEDITOR.dialogCommand("about"));
			f.modes = {
				wysiwyg: 1,
				source: 1
			};
			f.canUndo = !1;
			f.readOnly = 1;
			a.ui.addButton && a.ui.addButton("About", {
				label: a.lang.about.title,
				command: "about",
				toolbar: "about"
			});
			CKEDITOR.dialog.add("about", this.path + "dialogs/about.js")
		}
	}), CKEDITOR.plugins.add("basicstyles", {
		init: function(a) {
			var f = 0,
				b = function(b, d, e, m) {
					if (m) {
						m = new CKEDITOR.style(m);
						var g = c[e];
						g.unshift(m);
						a.attachStyleStateChange(m, function(b) {
							!a.readOnly && a.getCommand(e).setState(b)
						});
						a.addCommand(e, new CKEDITOR.styleCommand(m, {
							contentForms: g
						}));
						a.ui.addButton && a.ui.addButton(b, {
							label: d,
							command: e,
							toolbar: "basicstyles," + (f += 10)
						})
					}
				},
				c = {
					bold: ["strong", "b", ["span", function(a) {
						a = a.styles["font-weight"];
						return "bold" == a || 700 <= +a
					}]],
					italic: ["em", "i", ["span", function(a) {
						return "italic" == a.styles["font-style"]
					}]],
					underline: ["u", ["span", function(a) {
						return "underline" == a.styles["text-decoration"]
					}]],
					strike: ["s", "strike", ["span", function(a) {
						return "line-through" == a.styles["text-decoration"]
					}]],
					subscript: ["sub"],
					superscript: ["sup"]
				},
				e = a.config,
				l = a.lang.basicstyles;
			b("Bold", l.bold, "bold", e.coreStyles_bold);
			b("Italic", l.italic, "italic", e.coreStyles_italic);
			b("Underline", l.underline, "underline", e.coreStyles_underline);
			b("Strike", l.strike, "strike", e.coreStyles_strike);
			b("Subscript", l.subscript, "subscript", e.coreStyles_subscript);
			b("Superscript", l.superscript, "superscript", e.coreStyles_superscript);
			a.setKeystroke([
				[CKEDITOR.CTRL + 66, "bold"],
				[CKEDITOR.CTRL + 73, "italic"],
				[CKEDITOR.CTRL + 85, "underline"]
			])
		}
	}), CKEDITOR.config.coreStyles_bold = {
		element: "strong",
		overrides: "b"
	}, CKEDITOR.config.coreStyles_italic = {
		element: "em",
		overrides: "i"
	}, CKEDITOR.config.coreStyles_underline = {
		element: "u"
	}, CKEDITOR.config.coreStyles_strike = {
		element: "s",
		overrides: "strike"
	}, CKEDITOR.config.coreStyles_subscript = {
		element: "sub"
	}, CKEDITOR.config.coreStyles_superscript = {
		element: "sup"
	}, function() {
		var a = {
			exec: function(a) {
				var b = a.getCommand("blockquote").state,
					c = a.getSelection(),
					e = c && c.getRanges()[0];
				if (e) {
					var l = c.createBookmarks();
					if (CKEDITOR.env.ie) {
						var k = l[0].startNode,
							d = l[0].endNode,
							h;
						if (k && "blockquote" == k.getParent().getName())
							for (h = k; h = h.getNext();)
								if (h.type == CKEDITOR.NODE_ELEMENT && h.isBlockBoundary()) {
									k.move(h, !0);
									break
								}
						if (d && "blockquote" == d.getParent().getName())
							for (h = d; h = h.getPrevious();)
								if (h.type == CKEDITOR.NODE_ELEMENT && h.isBlockBoundary()) {
									d.move(h);
									break
								}
					}
					var m = e.createIterator();
					m.enlargeBr = a.config.enterMode != CKEDITOR.ENTER_BR;
					if (b == CKEDITOR.TRISTATE_OFF) {
						for (k = []; b = m.getNextParagraph();) k.push(b);
						1 > k.length && (b = a.document.createElement(a.config.enterMode == CKEDITOR.ENTER_P ? "p" : "div"), d = l.shift(), e.insertNode(b), b.append(new CKEDITOR.dom.text("﻿", a.document)), e.moveToBookmark(d), e.selectNodeContents(b), e.collapse(!0), d = e.createBookmark(), k.push(b), l.unshift(d));
						h = k[0].getParent();
						e = [];
						for (d = 0; d < k.length; d++) b = k[d], h = h.getCommonAncestor(b.getParent());
						for (b = {
								table: 1,
								tbody: 1,
								tr: 1,
								ol: 1,
								ul: 1
							}; b[h.getName()];) h = h.getParent();
						for (d = null; 0 < k.length;) {
							for (b = k.shift(); !b.getParent().equals(h);) b = b.getParent();
							b.equals(d) || e.push(b);
							d = b
						}
						for (; 0 < e.length;)
							if (b = e.shift(), "blockquote" == b.getName()) {
								for (d = new CKEDITOR.dom.documentFragment(a.document); b.getFirst();) d.append(b.getFirst().remove()), k.push(d.getLast());
								d.replace(b)
							} else k.push(b);
						e = a.document.createElement("blockquote");
						for (e.insertBefore(k[0]); 0 < k.length;) b = k.shift(), e.append(b)
					} else if (b == CKEDITOR.TRISTATE_ON) {
						d = [];
						for (h = {}; b = m.getNextParagraph();) {
							for (k = e = null; b.getParent();) {
								if ("blockquote" == b.getParent().getName()) {
									e = b.getParent();
									k = b;
									break
								}
								b = b.getParent()
							}
							e && k && !k.getCustomData("blockquote_moveout") && (d.push(k), CKEDITOR.dom.element.setMarker(h, k, "blockquote_moveout", !0))
						}
						CKEDITOR.dom.element.clearAllMarkers(h);
						b = [];
						k = [];
						for (h = {}; 0 < d.length;) m = d.shift(), e = m.getParent(), m.getPrevious() ? m.getNext() ? (m.breakParent(m.getParent()), k.push(m.getNext())) : m.remove().insertAfter(e) : m.remove().insertBefore(e), e.getCustomData("blockquote_processed") || (k.push(e), CKEDITOR.dom.element.setMarker(h, e, "blockquote_processed", !0)), b.push(m);
						CKEDITOR.dom.element.clearAllMarkers(h);
						for (d = k.length - 1; 0 <= d; d--) {
							e = k[d];
							a: {
								h = e;
								for (var m = 0, g = h.getChildCount(), n = void 0; m < g && (n = h.getChild(m)); m++)
									if (n.type == CKEDITOR.NODE_ELEMENT && n.isBlockBoundary()) {
										h = !1;
										break a
									}
								h = !0
							}
							h && e.remove()
						}
						if (a.config.enterMode == CKEDITOR.ENTER_BR)
							for (e = !0; b.length;)
								if (m = b.shift(), "div" == m.getName()) {
									d = new CKEDITOR.dom.documentFragment(a.document);
									!e || !m.getPrevious() || m.getPrevious().type == CKEDITOR.NODE_ELEMENT && m.getPrevious().isBlockBoundary() || d.append(a.document.createElement("br"));
									for (e = m.getNext() && !(m.getNext().type == CKEDITOR.NODE_ELEMENT && m.getNext().isBlockBoundary()); m.getFirst();) m.getFirst().remove().appendTo(d);
									e && d.append(a.document.createElement("br"));
									d.replace(m);
									e = !1
								}
					}
					c.selectBookmarks(l);
					a.focus()
				}
			},
			refresh: function(a, b) {
				this.setState(a.elementPath(b.block || b.blockLimit).contains("blockquote", 1) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF)
			},
			context: "blockquote",
			allowedContent: "blockquote",
			requiredContent: "blockquote"
		};
		CKEDITOR.plugins.add("blockquote", {
			init: function(f) {
				f.blockless || (f.addCommand("blockquote", a), f.ui.addButton && f.ui.addButton("Blockquote", {
					label: f.lang.blockquote.toolbar,
					command: "blockquote",
					toolbar: "blocks,10"
				}))
			}
		})
	}(), function() {
		var a = '\x3ca id\x3d"{id}" class\x3d"cke_button cke_button__{name} cke_button_{state} {cls}"' + (CKEDITOR.env.gecko && !CKEDITOR.env.hc ? "" : " href\x3d\"javascript:void('{titleJs}')\"") + ' title\x3d"{title}" tabindex\x3d"-1" hidefocus\x3d"true" role\x3d"button" aria-labelledby\x3d"{id}_label" aria-describedby\x3d"{id}_description" aria-haspopup\x3d"{hasArrow}" aria-disabled\x3d"{ariaDisabled}"';
		CKEDITOR.env.gecko && CKEDITOR.env.mac && (a += ' onkeypress\x3d"return false;"');
		CKEDITOR.env.gecko && (a += ' onblur\x3d"this.style.cssText \x3d this.style.cssText;"');
		var a = a + (' onkeydown\x3d"return CKEDITOR.tools.callFunction({keydownFn},event);" onfocus\x3d"return CKEDITOR.tools.callFunction({focusFn},event);" ' + (CKEDITOR.env.ie ? 'onclick\x3d"return false;" onmouseup' : "onclick") + '\x3d"CKEDITOR.tools.callFunction({clickFn},this);return false;"\x3e\x3cspan class\x3d"cke_button_icon cke_button__{iconName}_icon" style\x3d"{style}"'),
			a = a + '\x3e\x26nbsp;\x3c/span\x3e\x3cspan id\x3d"{id}_label" class\x3d"cke_button_label cke_button__{name}_label" aria-hidden\x3d"false"\x3e{label}\x3c/span\x3e\x3cspan id\x3d"{id}_description" class\x3d"cke_button_label" aria-hidden\x3d"false"\x3e{ariaShortcut}\x3c/span\x3e{arrowHtml}\x3c/a\x3e',
			f = CKEDITOR.addTemplate("buttonArrow", '\x3cspan class\x3d"cke_button_arrow"\x3e' + (CKEDITOR.env.hc ? "\x26#9660;" : "") + "\x3c/span\x3e"),
			b = CKEDITOR.addTemplate("button", a);
		CKEDITOR.plugins.add("button", {
			beforeInit: function(a) {
				a.ui.addHandler(CKEDITOR.UI_BUTTON, CKEDITOR.ui.button.handler)
			}
		});
		CKEDITOR.UI_BUTTON = "button";
		CKEDITOR.ui.button = function(a) {
			CKEDITOR.tools.extend(this, a, {
				title: a.label,
				click: a.click || function(b) {
					b.execCommand(a.command)
				}
			});
			this._ = {}
		};
		CKEDITOR.ui.button.handler = {
			create: function(a) {
				return new CKEDITOR.ui.button(a)
			}
		};
		CKEDITOR.ui.button.prototype = {
			render: function(a, e) {
				function l() {
					var b = a.mode;
					b && (b = this.modes[b] ? void 0 !== t[b] ? t[b] : CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED, b = a.readOnly && !this.readOnly ? CKEDITOR.TRISTATE_DISABLED : b, this.setState(b), this.refresh && this.refresh())
				}
				var k = CKEDITOR.env,
					d = this._.id = CKEDITOR.tools.getNextId(),
					h = "",
					m = this.command,
					g, n, p;
				this._.editor = a;
				var r = {
						id: d,
						button: this,
						editor: a,
						focus: function() {
							CKEDITOR.document.getById(d).focus()
						},
						execute: function() {
							this.button.click(a)
						},
						attach: function(a) {
							this.button.attach(a)
						}
					},
					x = CKEDITOR.tools.addFunction(function(a) {
						if (r.onkey) return a = new CKEDITOR.dom.event(a), !1 !== r.onkey(r, a.getKeystroke())
					}),
					v = CKEDITOR.tools.addFunction(function(a) {
						var b;
						r.onfocus && (b = !1 !== r.onfocus(r, new CKEDITOR.dom.event(a)));
						return b
					}),
					u = 0;
				r.clickFn = g = CKEDITOR.tools.addFunction(function() {
					u && (a.unlockSelection(1), u = 0);
					r.execute();
					k.iOS && a.focus()
				});
				if (this.modes) {
					var t = {};
					a.on("beforeModeUnload", function() {
						a.mode && this._.state != CKEDITOR.TRISTATE_DISABLED && (t[a.mode] = this._.state)
					}, this);
					a.on("activeFilterChange", l, this);
					a.on("mode", l, this);
					!this.readOnly && a.on("readOnly", l, this)
				} else m && (m = a.getCommand(m)) && (m.on("state", function() {
					this.setState(m.state)
				}, this), h += m.state == CKEDITOR.TRISTATE_ON ? "on" : m.state == CKEDITOR.TRISTATE_DISABLED ? "disabled" : "off");
				if (this.directional) a.on("contentDirChanged", function(b) {
					var d = CKEDITOR.document.getById(this._.id),
						e = d.getFirst();
					b = b.data;
					b != a.lang.dir ? d.addClass("cke_" + b) : d.removeClass("cke_ltr").removeClass("cke_rtl");
					e.setAttribute("style", CKEDITOR.skin.getIconStyle(y, "rtl" == b, this.icon, this.iconOffset))
				}, this);
				m ? (n = a.getCommandKeystroke(m)) && (p = CKEDITOR.tools.keystrokeToString(a.lang.common.keyboard, n)) : h += "off";
				var y = n = this.name || this.command;
				this.icon && !/\./.test(this.icon) && (y = this.icon, this.icon = null);
				h = {
					id: d,
					name: n,
					iconName: y,
					label: this.label,
					cls: this.className || "",
					state: h,
					ariaDisabled: "disabled" == h ? "true" : "false",
					title: this.title + (p ? " (" + p.display + ")" : ""),
					ariaShortcut: p ? a.lang.common.keyboardShortcut + " " + p.aria : "",
					titleJs: k.gecko && !k.hc ? "" : (this.title || "").replace("'", ""),
					hasArrow: this.hasArrow ? "true" : "false",
					keydownFn: x,
					focusFn: v,
					clickFn: g,
					style: CKEDITOR.skin.getIconStyle(y, "rtl" == a.lang.dir, this.icon, this.iconOffset),
					arrowHtml: this.hasArrow ? f.output() : ""
				};
				b.output(h, e);
				if (this.onRender) this.onRender();
				return r
			},
			setState: function(a) {
				if (this._.state == a) return !1;
				this._.state = a;
				var b = CKEDITOR.document.getById(this._.id);
				return b ? (b.setState(a, "cke_button"), a == CKEDITOR.TRISTATE_DISABLED ? b.setAttribute("aria-disabled", !0) : b.removeAttribute("aria-disabled"), this.hasArrow ? (a = a == CKEDITOR.TRISTATE_ON ? this._.editor.lang.button.selectedLabel.replace(/%1/g, this.label) : this.label, CKEDITOR.document.getById(this._.id + "_label").setText(a)) : a == CKEDITOR.TRISTATE_ON ? b.setAttribute("aria-pressed", !0) : b.removeAttribute("aria-pressed"), !0) : !1
			},
			getState: function() {
				return this._.state
			},
			toFeature: function(a) {
				if (this._.feature) return this._.feature;
				var b = this;
				this.allowedContent || this.requiredContent || !this.command || (b = a.getCommand(this.command) || b);
				return this._.feature = b
			}
		};
		CKEDITOR.ui.prototype.addButton = function(a, b) {
			this.add(a, CKEDITOR.UI_BUTTON, b)
		}
	}(), function() {
		function a(a) {
			function b() {
				for (var g = c(), h = CKEDITOR.tools.clone(a.config.toolbarGroups) || f(a), m = 0; m < h.length; m++) {
					var l = h[m];
					if ("/" != l) {
						"string" == typeof l && (l = h[m] = {
							name: l
						});
						var v, u = l.groups;
						if (u)
							for (var t = 0; t < u.length; t++) v = u[t], (v = g[v]) && d(l, v);
						(v = g[l.name]) && d(l, v)
					}
				}
				return h
			}

			function c() {
				var b = {},
					d, f, g;
				for (d in a.ui.items) f = a.ui.items[d], g = f.toolbar || "others", g = g.split(","), f = g[0], g = parseInt(g[1] || -1, 10), b[f] || (b[f] = []), b[f].push({
					name: d,
					order: g
				});
				for (f in b) b[f] = b[f].sort(function(a, b) {
					return a.order == b.order ? 0 : 0 > b.order ? -1 : 0 > a.order ? 1 : a.order < b.order ? -1 : 1
				});
				return b
			}

			function d(b, c) {
				if (c.length) {
					b.items ? b.items.push(a.ui.create("-")) : b.items = [];
					for (var d; d = c.shift();) d = "string" == typeof d ? d : d.name, m && -1 != CKEDITOR.tools.indexOf(m, d) || (d = a.ui.create(d)) && a.addFeature(d) && b.items.push(d)
				}
			}

			function h(a) {
				var b = [],
					c, e, f;
				for (c = 0; c < a.length; ++c) e = a[c], f = {}, "/" == e ? b.push(e) : CKEDITOR.tools.isArray(e) ? (d(f, CKEDITOR.tools.clone(e)), b.push(f)) : e.items && (d(f, CKEDITOR.tools.clone(e.items)), f.name = e.name, b.push(f));
				return b
			}
			var m = a.config.removeButtons,
				m = m && m.split(","),
				g = a.config.toolbar;
			"string" == typeof g && (g = a.config["toolbar_" + g]);
			return a.toolbar = g ? h(g) : b()
		}

		function f(a) {
			return a._.toolbarGroups || (a._.toolbarGroups = [{
				name: "document",
				groups: ["mode", "document", "doctools"]
			}, {
				name: "clipboard",
				groups: ["clipboard", "undo"]
			}, {
				name: "editing",
				groups: ["find", "selection", "spellchecker"]
			}, {
				name: "forms"
			}, "/", {
				name: "basicstyles",
				groups: ["basicstyles", "cleanup"]
			}, {
				name: "paragraph",
				groups: ["list", "indent", "blocks", "align", "bidi"]
			}, {
				name: "links"
			}, {
				name: "insert"
			}, "/", {
				name: "styles"
			}, {
				name: "colors"
			}, {
				name: "tools"
			}, {
				name: "others"
			}, {
				name: "about"
			}])
		}
		var b = function() {
			this.toolbars = [];
			this.focusCommandExecuted = !1
		};
		b.prototype.focus = function() {
			for (var a = 0, b; b = this.toolbars[a++];)
				for (var c = 0, d; d = b.items[c++];)
					if (d.focus) {
						d.focus();
						return
					}
		};
		var c = {
			modes: {
				wysiwyg: 1,
				source: 1
			},
			readOnly: 1,
			exec: function(a) {
				a.toolbox && (a.toolbox.focusCommandExecuted = !0, CKEDITOR.env.ie || CKEDITOR.env.air ? setTimeout(function() {
					a.toolbox.focus()
				}, 100) : a.toolbox.focus())
			}
		};
		CKEDITOR.plugins.add("toolbar", {
			requires: "button",
			init: function(e) {
				var f,
					k = function(a, b) {
						var c, g = "rtl" == e.lang.dir,
							n = e.config.toolbarGroupCycling,
							p = g ? 37 : 39,
							g = g ? 39 : 37,
							n = void 0 === n || n;
						switch (b) {
							case 9:
							case CKEDITOR.SHIFT + 9:
								for (; !c || !c.items.length;)
									if (c = 9 == b ? (c ? c.next : a.toolbar.next) || e.toolbox.toolbars[0] : (c ? c.previous : a.toolbar.previous) || e.toolbox.toolbars[e.toolbox.toolbars.length - 1], c.items.length)
										for (a = c.items[f ? c.items.length - 1 : 0]; a && !a.focus;)(a = f ? a.previous : a.next) || (c = 0);
								a && a.focus();
								return !1;
							case p:
								c = a;
								do c = c.next, !c && n && (c = a.toolbar.items[0]); while (c && !c.focus);
								c ? c.focus() : k(a, 9);
								return !1;
							case 40:
								return a.button && a.button.hasArrow ? a.execute() : k(a, 40 == b ? p : g), !1;
							case g:
							case 38:
								c = a;
								do c = c.previous, !c && n && (c = a.toolbar.items[a.toolbar.items.length - 1]); while (c && !c.focus);
								c ? c.focus() : (f = 1, k(a, CKEDITOR.SHIFT + 9), f = 0);
								return !1;
							case 27:
								return e.focus(), !1;
							case 13:
							case 32:
								return a.execute(), !1
						}
						return !0
					};
				e.on("uiSpace", function(c) {
					if (c.data.space == e.config.toolbarLocation) {
						c.removeListener();
						e.toolbox = new b;
						var f = CKEDITOR.tools.getNextId(),
							l = ['\x3cspan id\x3d"', f, '" class\x3d"cke_voice_label"\x3e',
								e.lang.toolbar.toolbars, "\x3c/span\x3e", '\x3cspan id\x3d"' + e.ui.spaceId("toolbox") + '" class\x3d"cke_toolbox" role\x3d"group" aria-labelledby\x3d"', f, '" onmousedown\x3d"return false;"\x3e'
							],
							f = !1 !== e.config.toolbarStartupExpanded,
							g, n;
						e.config.toolbarCanCollapse && e.elementMode != CKEDITOR.ELEMENT_MODE_INLINE && l.push('\x3cspan class\x3d"cke_toolbox_main"' + (f ? "\x3e" : ' style\x3d"display:none"\x3e'));
						for (var p = e.toolbox.toolbars, r = a(e), x = r.length, v = 0; v < x; v++) {
							var u, t = 0,
								y, A = r[v],
								q = "/" !== A && ("/" === r[v + 1] || v == x - 1),
								w;
							if (A)
								if (g && (l.push("\x3c/span\x3e"), n = g = 0), "/" === A) l.push('\x3cspan class\x3d"cke_toolbar_break"\x3e\x3c/span\x3e');
								else {
									w = A.items || A;
									for (var B = 0; B < w.length; B++) {
										var z = w[B],
											C;
										if (z) {
											var E = function(a) {
												a = a.render(e, l);
												G = t.items.push(a) - 1;
												0 < G && (a.previous = t.items[G - 1], a.previous.next = a);
												a.toolbar = t;
												a.onkey = k;
												a.onfocus = function() {
													e.toolbox.focusCommandExecuted || e.focus()
												}
											};
											if (z.type == CKEDITOR.UI_SEPARATOR) n = g && z;
											else {
												C = !1 !== z.canGroup;
												if (!t) {
													u = CKEDITOR.tools.getNextId();
													t = {
														id: u,
														items: []
													};
													y = A.name && (e.lang.toolbar.toolbarGroups[A.name] || A.name);
													l.push('\x3cspan id\x3d"', u, '" class\x3d"cke_toolbar' + (q ? ' cke_toolbar_last"' : '"'), y ? ' aria-labelledby\x3d"' + u + '_label"' : "", ' role\x3d"toolbar"\x3e');
													y && l.push('\x3cspan id\x3d"', u, '_label" class\x3d"cke_voice_label"\x3e', y, "\x3c/span\x3e");
													l.push('\x3cspan class\x3d"cke_toolbar_start"\x3e\x3c/span\x3e');
													var G = p.push(t) - 1;
													0 < G && (t.previous = p[G - 1], t.previous.next = t)
												}
												C ? g || (l.push('\x3cspan class\x3d"cke_toolgroup" role\x3d"presentation"\x3e'), g = 1) : g && (l.push("\x3c/span\x3e"), g = 0);
												n && (E(n), n = 0);
												E(z)
											}
										}
									}
									g && (l.push("\x3c/span\x3e"), n = g = 0);
									t && l.push('\x3cspan class\x3d"cke_toolbar_end"\x3e\x3c/span\x3e\x3c/span\x3e')
								}
						}
						e.config.toolbarCanCollapse && l.push("\x3c/span\x3e");
						if (e.config.toolbarCanCollapse && e.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
							var F = CKEDITOR.tools.addFunction(function() {
								e.execCommand("toolbarCollapse")
							});
							e.on("destroy", function() {
								CKEDITOR.tools.removeFunction(F)
							});
							e.addCommand("toolbarCollapse", {
								readOnly: 1,
								exec: function(a) {
									var b = a.ui.space("toolbar_collapser"),
										c = b.getPrevious(),
										d = a.ui.space("contents"),
										e = c.getParent(),
										f = parseInt(d.$.style.height, 10),
										g = e.$.offsetHeight,
										h = b.hasClass("cke_toolbox_collapser_min");
									h ? (c.show(), b.removeClass("cke_toolbox_collapser_min"), b.setAttribute("title", a.lang.toolbar.toolbarCollapse)) : (c.hide(), b.addClass("cke_toolbox_collapser_min"), b.setAttribute("title", a.lang.toolbar.toolbarExpand));
									b.getFirst().setText(h ? "▲" : "◀");
									d.setStyle("height", f - (e.$.offsetHeight - g) + "px");
									a.fire("resize", {
										outerHeight: a.container.$.offsetHeight,
										contentsHeight: d.$.offsetHeight,
										outerWidth: a.container.$.offsetWidth
									})
								},
								modes: {
									wysiwyg: 1,
									source: 1
								}
							});
							e.setKeystroke(CKEDITOR.ALT + (CKEDITOR.env.ie || CKEDITOR.env.webkit ? 189 : 109), "toolbarCollapse");
							l.push('\x3ca title\x3d"' + (f ? e.lang.toolbar.toolbarCollapse : e.lang.toolbar.toolbarExpand) + '" id\x3d"' + e.ui.spaceId("toolbar_collapser") + '" tabIndex\x3d"-1" class\x3d"cke_toolbox_collapser');
							f || l.push(" cke_toolbox_collapser_min");
							l.push('" onclick\x3d"CKEDITOR.tools.callFunction(' + F + ')"\x3e', '\x3cspan class\x3d"cke_arrow"\x3e\x26#9650;\x3c/span\x3e', "\x3c/a\x3e")
						}
						l.push("\x3c/span\x3e");
						c.data.html += l.join("")
					}
				});
				e.on("destroy", function() {
					if (this.toolbox) {
						var a, b = 0,
							c, e, f;
						for (a = this.toolbox.toolbars; b < a.length; b++)
							for (e = a[b].items, c = 0; c < e.length; c++) f = e[c], f.clickFn && CKEDITOR.tools.removeFunction(f.clickFn), f.keyDownFn && CKEDITOR.tools.removeFunction(f.keyDownFn)
					}
				});
				e.on("uiReady", function() {
					var a = e.ui.space("toolbox");
					a && e.focusManager.add(a, 1)
				});
				e.addCommand("toolbarFocus", c);
				e.setKeystroke(CKEDITOR.ALT + 121, "toolbarFocus");
				e.ui.add("-", CKEDITOR.UI_SEPARATOR, {});
				e.ui.addHandler(CKEDITOR.UI_SEPARATOR, {
					create: function() {
						return {
							render: function(a, b) {
								b.push('\x3cspan class\x3d"cke_toolbar_separator" role\x3d"separator"\x3e\x3c/span\x3e');
								return {}
							}
						}
					}
				})
			}
		});
		CKEDITOR.ui.prototype.addToolbarGroup = function(a, b, c) {
			var d = f(this.editor),
				h = 0 === b,
				m = {
					name: a
				};
			if (c) {
				if (c = CKEDITOR.tools.search(d, function(a) {
						return a.name == c
					})) {
					!c.groups && (c.groups = []);
					if (b && (b = CKEDITOR.tools.indexOf(c.groups, b), 0 <= b)) {
						c.groups.splice(b + 1, 0, a);
						return
					}
					h ? c.groups.splice(0, 0, a) : c.groups.push(a);
					return
				}
				b = null
			}
			b && (b = CKEDITOR.tools.indexOf(d, function(a) {
				return a.name == b
			}));
			h ? d.splice(0, 0, a) : "number" == typeof b ? d.splice(b + 1, 0, m) : d.push(a)
		}
	}(), CKEDITOR.UI_SEPARATOR = "separator", CKEDITOR.config.toolbarLocation = "top", "use strict", CKEDITOR.plugins.add("notification", {
		requires: "toolbar",
		init: function(a) {
			function f(a) {
				var c = new CKEDITOR.dom.element("div");
				c.setStyles({
					position: "fixed",
					"margin-left": "-9999px"
				});
				c.setAttributes({
					"aria-live": "assertive",
					"aria-atomic": "true"
				});
				c.setText(a);
				CKEDITOR.document.getBody().append(c);
				setTimeout(function() {
					c.remove()
				}, 100)
			}
			a._.notificationArea = new la(a);
			a.showNotification = function(b, c, e) {
				var f, k;
				"progress" == c ? f = e : k = e;
				b = new CKEDITOR.plugins.notification(a, {
					message: b,
					type: c,
					progress: f,
					duration: k
				});
				b.show();
				return b
			};
			a.on("key", function(b) {
				if (27 == b.data.keyCode) {
					var c = a._.notificationArea.notifications;
					c.length && (f(a.lang.notification.closed), c[c.length - 1].hide(), b.cancel())
				}
			})
		}
	}), ka.prototype = {
		show: function() {
			!1 !== this.editor.fire("notificationShow", {
				notification: this
			}) && (this.area.add(this), this._hideAfterTimeout())
		},
		update: function(a) {
			var f = !0;
			!1 === this.editor.fire("notificationUpdate", {
				notification: this,
				options: a
			}) && (f = !1);
			var b = this.element,
				c = b.findOne(".cke_notification_message"),
				e = b.findOne(".cke_notification_progress"),
				l = a.type;
			b.removeAttribute("role");
			a.progress && "progress" != this.type && (l = "progress");
			l && (b.removeClass(this._getClass()), b.removeAttribute("aria-label"), this.type = l, b.addClass(this._getClass()), b.setAttribute("aria-label", this.type), "progress" != this.type || e ? "progress" != this.type && e && e.remove() : (e = this._createProgressElement(), e.insertBefore(c)));
			void 0 !== a.message && (this.message = a.message, c.setHtml(this.message));
			void 0 !== a.progress && (this.progress = a.progress, e && e.setStyle("width", this._getPercentageProgress()));
			f && a.important && (b.setAttribute("role", "alert"), this.isVisible() || this.area.add(this));
			this.duration = a.duration;
			this._hideAfterTimeout()
		},
		hide: function() {
			!1 !== this.editor.fire("notificationHide", {
				notification: this
			}) && this.area.remove(this)
		},
		isVisible: function() {
			return 0 <= CKEDITOR.tools.indexOf(this.area.notifications, this)
		},
		_createElement: function() {
			var a = this,
				f, b, c = this.editor.lang.common.close;
			f = new CKEDITOR.dom.element("div");
			f.addClass("cke_notification");
			f.addClass(this._getClass());
			f.setAttributes({
				id: this.id,
				role: "alert",
				"aria-label": this.type
			});
			"progress" == this.type && f.append(this._createProgressElement());
			b = new CKEDITOR.dom.element("p");
			b.addClass("cke_notification_message");
			b.setHtml(this.message);
			f.append(b);
			b = CKEDITOR.dom.element.createFromHtml('\x3ca class\x3d"cke_notification_close" href\x3d"javascript:void(0)" title\x3d"' + c + '" role\x3d"button" tabindex\x3d"-1"\x3e\x3cspan class\x3d"cke_label"\x3eX\x3c/span\x3e\x3c/a\x3e');
			f.append(b);
			b.on("click", function() {
				a.editor.focus();
				a.hide()
			});
			return f
		},
		_getClass: function() {
			return "progress" == this.type ? "cke_notification_info" : "cke_notification_" + this.type
		},
		_createProgressElement: function() {
			var a = new CKEDITOR.dom.element("span");
			a.addClass("cke_notification_progress");
			a.setStyle("width", this._getPercentageProgress());
			return a
		},
		_getPercentageProgress: function() {
			return Math.round(100 * (this.progress || 0)) + "%"
		},
		_hideAfterTimeout: function() {
			var a = this,
				f;
			this._hideTimeoutId && clearTimeout(this._hideTimeoutId);
			if ("number" == typeof this.duration) f = this.duration;
			else if ("info" == this.type || "success" == this.type) f = "number" == typeof this.editor.config.notification_duration ? this.editor.config.notification_duration : 5E3;
			f && (a._hideTimeoutId = setTimeout(function() {
				a.hide()
			}, f))
		}
	}, la.prototype = {
		add: function(a) {
			this.notifications.push(a);
			this.element.append(a.element);
			1 == this.element.getChildCount() && (CKEDITOR.document.getBody().append(this.element), this._attachListeners());
			this._layout()
		},
		remove: function(a) {
			var f = CKEDITOR.tools.indexOf(this.notifications, a);
			0 > f || (this.notifications.splice(f, 1), a.element.remove(), this.element.getChildCount() || (this._removeListeners(), this.element.remove()))
		},
		_createElement: function() {
			var a = this.editor,
				f = a.config,
				b = new CKEDITOR.dom.element("div");
			b.addClass("cke_notifications_area");
			b.setAttribute("id", "cke_notifications_area_" + a.name);
			b.setStyle("z-index", f.baseFloatZIndex - 2);
			return b
		},
		_attachListeners: function() {
			var a = CKEDITOR.document.getWindow(),
				f = this.editor;
			a.on("scroll", this._uiBuffer.input);
			a.on("resize", this._uiBuffer.input);
			f.on("change", this._changeBuffer.input);
			f.on("floatingSpaceLayout", this._layout, this, null, 20);
			f.on("blur", this._layout, this, null, 20)
		},
		_removeListeners: function() {
			var a = CKEDITOR.document.getWindow(),
				f = this.editor;
			a.removeListener("scroll", this._uiBuffer.input);
			a.removeListener("resize", this._uiBuffer.input);
			f.removeListener("change", this._changeBuffer.input);
			f.removeListener("floatingSpaceLayout", this._layout);
			f.removeListener("blur", this._layout)
		},
		_layout: function() {
			function a() {
				f.setStyle("left", x(v + c.width - h - m))
			}
			var f = this.element,
				b = this.editor,
				c = b.ui.contentsElement.getClientRect(),
				e = b.ui.contentsElement.getDocumentPosition(),
				b = b.ui.space("top"),
				l = b.getClientRect(),
				k = f.getClientRect(),
				d, h = this._notificationWidth,
				m = this._notificationMargin;
			d = CKEDITOR.document.getWindow();
			var g = d.getScrollPosition(),
				n = d.getViewPaneSize(),
				p = CKEDITOR.document.getBody(),
				r = p.getDocumentPosition(),
				x = CKEDITOR.tools.cssLength;
			h && m || (d = this.element.getChild(0), h = this._notificationWidth = d.getClientRect().width, m = this._notificationMargin = parseInt(d.getComputedStyle("margin-left"), 10) + parseInt(d.getComputedStyle("margin-right"), 10));
			b.isVisible() && l.bottom > c.top && l.bottom < c.bottom - k.height ? f.setStyles({
				position: "fixed",
				top: x(l.bottom)
			}) : 0 < c.top ? f.setStyles({
				position: "absolute",
				top: x(e.y)
			}) : e.y + c.height - k.height > g.y ? f.setStyles({
				position: "fixed",
				top: 0
			}) : f.setStyles({
				position: "absolute",
				top: x(e.y + c.height - k.height)
			});
			var v = "fixed" == f.getStyle("position") ? c.left : "static" != p.getComputedStyle("position") ? e.x - r.x : e.x;
			c.width < h + m ? e.x + h + m > g.x + n.width ? a() : f.setStyle("left", x(v)) : e.x + h + m > g.x + n.width ? f.setStyle("left", x(v)) : e.x + c.width / 2 + h / 2 + m > g.x + n.width ? f.setStyle("left", x(v - e.x + g.x + n.width - h - m)) : 0 > c.left + c.width - h - m ? a() : 0 > c.left + c.width / 2 - h / 2 ? f.setStyle("left", x(v - e.x + g.x)) : f.setStyle("left", x(v + c.width / 2 - h / 2 - m / 2))
		}
	}, CKEDITOR.plugins.notification = ka, "use strict", function() {
		function a(a, b, c) {
			b.type || (b.type = "auto");
			if (c && !1 === a.fire("beforePaste", b) || !b.dataValue && b.dataTransfer.isEmpty()) return !1;
			b.dataValue || (b.dataValue = "");
			if (CKEDITOR.env.gecko && "drop" == b.method && a.toolbox) a.once("afterPaste", function() {
				a.toolbox.focus()
			});
			return a.fire("paste", b)
		}

		function f(b) {
			function c() {
				var a = b.editable();
				if (CKEDITOR.plugins.clipboard.isCustomCopyCutSupported) {
					var d = function(a) {
						b.readOnly && "cut" == a.name || C.initPasteDataTransfer(a, b);
						a.data.preventDefault()
					};
					a.on("copy", d);
					a.on("cut", d);
					a.on("cut", function() {
						b.readOnly || b.extractSelectedHtml()
					}, null, null, 999)
				}
				a.on(C.mainPasteEvent, function(a) {
					"beforepaste" == C.mainPasteEvent && E || w(a)
				});
				"beforepaste" == C.mainPasteEvent && (a.on("paste", function(a) {
					G || (f(), a.data.preventDefault(), w(a), k("paste"))
				}), a.on("contextmenu", h, null, null, 0), a.on("beforepaste", function(a) {
					!a.data || a.data.$.ctrlKey || a.data.$.shiftKey || h()
				}, null, null, 0));
				a.on("beforecut", function() {
					!E && l(b)
				});
				var e;
				a.attachListener(CKEDITOR.env.ie ? a : b.document.getDocumentElement(), "mouseup", function() {
					e = setTimeout(function() {
						B()
					}, 0)
				});
				b.on("destroy", function() {
					clearTimeout(e)
				});
				a.on("keyup", B)
			}

			function d(a) {
				return {
					type: a,
					canUndo: "cut" == a,
					startDisabled: !0,
					fakeKeystroke: "cut" == a ? CKEDITOR.CTRL + 88 : CKEDITOR.CTRL + 67,
					exec: function() {
						"cut" == this.type && l();
						var a;
						var c = this.type;
						if (CKEDITOR.env.ie) a = k(c);
						else try {
							a = b.document.$.execCommand(c, !1, null)
						} catch (d) {
							a = !1
						}
						a || b.showNotification(b.lang.clipboard[this.type + "Error"]);
						return a
					}
				}
			}

			function e() {
				return {
					canUndo: !1,
					async: !0,
					fakeKeystroke: CKEDITOR.CTRL + 86,
					exec: function(b, c) {
						function d(c, g) {
							g = "undefined" !== typeof g ? g : !0;
							c ? (c.method = "paste", c.dataTransfer || (c.dataTransfer = C.initPasteDataTransfer()), a(b, c, g)) : f && b.showNotification(k, "info", b.config.clipboard_notificationDuration);
							b.fire("afterCommandExec", {
								name: "paste",
								command: e,
								returnValue: !!c
							})
						}
						c = "undefined" !== typeof c && null !== c ? c : {};
						var e = this,
							f = "undefined" !== typeof c.notification ? c.notification : !0,
							g = c.type,
							h = CKEDITOR.tools.keystrokeToString(b.lang.common.keyboard, b.getCommandKeystroke(this)),
							k = "string" === typeof f ? f : b.lang.clipboard.pasteNotification.replace(/%1/, '\x3ckbd aria-label\x3d"' + h.aria + '"\x3e' + h.display + "\x3c/kbd\x3e"),
							h = "string" === typeof c ? c : c.dataValue;
						g ? b._.nextPasteType = g : delete b._.nextPasteType;
						"string" === typeof h ? d({
							dataValue: h
						}) : b.getClipboardData(d)
					}
				}
			}

			function f() {
				G = 1;
				setTimeout(function() {
					G = 0
				}, 100)
			}

			function h() {
				E = 1;
				setTimeout(function() {
					E = 0
				}, 10)
			}

			function k(a) {
				var c = b.document,
					d = c.getBody(),
					e = !1,
					f = function() {
						e = !0
					};
				d.on(a, f);
				7 < CKEDITOR.env.version ? c.$.execCommand(a) : c.$.selection.createRange().execCommand(a);
				d.removeListener(a, f);
				return e
			}

			function l() {
				if (CKEDITOR.env.ie && !CKEDITOR.env.quirks) {
					var a = b.getSelection(),
						c, d, e;
					a.getType() == CKEDITOR.SELECTION_ELEMENT && (c = a.getSelectedElement()) && (d = a.getRanges()[0], e = b.document.createText(""), e.insertBefore(c), d.setStartBefore(e), d.setEndAfter(c), a.selectRanges([d]), setTimeout(function() {
						c.getParent() && (e.remove(), a.selectElement(c))
					}, 0))
				}
			}

			function m(a, c) {
				var d = b.document,
					e = b.editable(),
					f = function(a) {
						a.cancel()
					},
					h;
				if (!d.getById("cke_pastebin")) {
					var k = b.getSelection(),
						l = k.createBookmarks();
					CKEDITOR.env.ie && k.root.fire("selectionchange");
					var q = new CKEDITOR.dom.element(!CKEDITOR.env.webkit && !e.is("body") || CKEDITOR.env.ie ? "div" : "body", d);
					q.setAttributes({
						id: "cke_pastebin",
						"data-cke-temp": "1"
					});
					var t = 0,
						d = d.getWindow();
					CKEDITOR.env.webkit ? (e.append(q), q.addClass("cke_editable"), e.is("body") || (t = "static" != e.getComputedStyle("position") ? e : CKEDITOR.dom.element.get(e.$.offsetParent), t = t.getDocumentPosition().y)) : e.getAscendant(CKEDITOR.env.ie ? "body" : "html", 1).append(q);
					q.setStyles({
						position: "absolute",
						top: d.getScrollPosition().y - t + 10 + "px",
						width: "1px",
						height: Math.max(1, d.getViewPaneSize().height - 20) + "px",
						overflow: "hidden",
						margin: 0,
						padding: 0
					});
					CKEDITOR.env.safari && q.setStyles(CKEDITOR.tools.cssVendorPrefix("user-select", "text"));
					(t = q.getParent().isReadOnly()) ? (q.setOpacity(0), q.setAttribute("contenteditable", !0)) : q.setStyle("ltr" == b.config.contentsLangDirection ? "left" : "right", "-10000px");
					b.on("selectionChange", f, null, null, 0);
					if (CKEDITOR.env.webkit || CKEDITOR.env.gecko) h = e.once("blur", f, null, null, -100);
					t && q.focus();
					t = new CKEDITOR.dom.range(q);
					t.selectNodeContents(q);
					var n = t.select();
					CKEDITOR.env.ie && (h = e.once("blur", function() {
						b.lockSelection(n)
					}));
					var u = CKEDITOR.document.getWindow().getScrollPosition().y;
					setTimeout(function() {
						CKEDITOR.env.webkit && (CKEDITOR.document.getBody().$.scrollTop = u);
						h && h.removeListener();
						CKEDITOR.env.ie && e.focus();
						k.selectBookmarks(l);
						q.remove();
						var a;
						CKEDITOR.env.webkit && (a = q.getFirst()) && a.is && a.hasClass("Apple-style-span") && (q = a);
						b.removeListener("selectionChange", f);
						c(q.getHtml())
					}, 0)
				}
			}

			function A() {
				if ("paste" == C.mainPasteEvent) return b.fire("beforePaste", {
					type: "auto",
					method: "paste"
				}), !1;
				b.focus();
				f();
				var a = b.focusManager;
				a.lock();
				if (b.editable().fire(C.mainPasteEvent) && !k("paste")) return a.unlock(), !1;
				a.unlock();
				return !0
			}

			function q(a) {
				if ("wysiwyg" == b.mode) switch (a.data.keyCode) {
					case CKEDITOR.CTRL + 86:
					case CKEDITOR.SHIFT + 45:
						a = b.editable();
						f();
						"paste" == C.mainPasteEvent && a.fire("beforepaste");
						break;
					case CKEDITOR.CTRL + 88:
					case CKEDITOR.SHIFT + 46:
						b.fire("saveSnapshot"),
							setTimeout(function() {
								b.fire("saveSnapshot")
							}, 50)
				}
			}

			function w(c) {
				var d = {
					type: "auto",
					method: "paste",
					dataTransfer: C.initPasteDataTransfer(c)
				};
				d.dataTransfer.cacheData();
				var e = !1 !== b.fire("beforePaste", d);
				e && C.canClipboardApiBeTrusted(d.dataTransfer, b) ? (c.data.preventDefault(), setTimeout(function() {
					a(b, d)
				}, 0)) : m(c, function(c) {
					d.dataValue = c.replace(/<span[^>]+data-cke-bookmark[^<]*?<\/span>/ig, "");
					e && a(b, d)
				})
			}

			function B() {
				if ("wysiwyg" == b.mode) {
					var a = z("paste");
					b.getCommand("cut").setState(z("cut"));
					b.getCommand("copy").setState(z("copy"));
					b.getCommand("paste").setState(a);
					b.fire("pasteState", a)
				}
			}

			function z(a) {
				if (F && a in {
						paste: 1,
						cut: 1
					}) return CKEDITOR.TRISTATE_DISABLED;
				if ("paste" == a) return CKEDITOR.TRISTATE_OFF;
				a = b.getSelection();
				var c = a.getRanges();
				return a.getType() == CKEDITOR.SELECTION_NONE || 1 == c.length && c[0].collapsed ? CKEDITOR.TRISTATE_DISABLED : CKEDITOR.TRISTATE_OFF
			}
			var C = CKEDITOR.plugins.clipboard,
				E = 0,
				G = 0,
				F = 0;
			(function() {
				b.on("key", q);
				b.on("contentDom", c);
				b.on("selectionChange", function(a) {
					F = a.data.selection.getRanges()[0].checkReadOnly();
					B()
				});
				b.contextMenu && b.contextMenu.addListener(function(a, b) {
					F = b.getRanges()[0].checkReadOnly();
					return {
						cut: z("cut"),
						copy: z("copy"),
						paste: z("paste")
					}
				})
			})();
			(function() {
				function a(c, d, e, f, h) {
					var k = b.lang.clipboard[d];
					b.addCommand(d, e);
					b.ui.addButton && b.ui.addButton(c, {
						label: k,
						command: d,
						toolbar: "clipboard," + f
					});
					b.addMenuItems && b.addMenuItem(d, {
						label: k,
						command: d,
						group: "clipboard",
						order: h
					})
				}
				a("Cut", "cut", d("cut"), 10, 1);
				a("Copy", "copy", d("copy"), 20, 4);
				a("Paste", "paste", e(), 30, 8)
			})();
			b.getClipboardData = function(a, c) {
				function d(a) {
					a.removeListener();
					a.cancel();
					c(a.data)
				}
				c || (c = a, a = null);
				b.on("paste", d, null, null, 0);
				!1 === A() && (b.removeListener("paste", d), c(null))
			}
		}

		function b(a) {
			if (CKEDITOR.env.webkit) {
				if (!a.match(/^[^<]*$/g) && !a.match(/^(<div><br( ?\/)?><\/div>|<div>[^<]*<\/div>)*$/gi)) return "html"
			} else if (CKEDITOR.env.ie) {
				if (!a.match(/^([^<]|<br( ?\/)?>)*$/gi) && !a.match(/^(<p>([^<]|<br( ?\/)?>)*<\/p>|(\r\n))*$/gi)) return "html"
			} else if (CKEDITOR.env.gecko) {
				if (!a.match(/^([^<]|<br( ?\/)?>)*$/gi)) return "html"
			} else return "html";
			return "htmlifiedtext"
		}

		function c(a, b) {
			function c(a) {
				return CKEDITOR.tools.repeat("\x3c/p\x3e\x3cp\x3e", ~~(a / 2)) + (1 == a % 2 ? "\x3cbr\x3e" : "")
			}
			b = b.replace(/\s+/g, " ").replace(/> +</g, "\x3e\x3c").replace(/<br ?\/>/gi, "\x3cbr\x3e");
			b = b.replace(/<\/?[A-Z]+>/g, function(a) {
				return a.toLowerCase()
			});
			if (b.match(/^[^<]$/)) return b;
			CKEDITOR.env.webkit && -1 < b.indexOf("\x3cdiv\x3e") && (b = b.replace(/^(<div>(<br>|)<\/div>)(?!$|(<div>(<br>|)<\/div>))/g, "\x3cbr\x3e").replace(/^(<div>(<br>|)<\/div>){2}(?!$)/g, "\x3cdiv\x3e\x3c/div\x3e"), b.match(/<div>(<br>|)<\/div>/) && (b = "\x3cp\x3e" + b.replace(/(<div>(<br>|)<\/div>)+/g, function(a) {
				return c(a.split("\x3c/div\x3e\x3cdiv\x3e").length + 1)
			}) + "\x3c/p\x3e"), b = b.replace(/<\/div><div>/g, "\x3cbr\x3e"), b = b.replace(/<\/?div>/g, ""));
			CKEDITOR.env.gecko && a.enterMode != CKEDITOR.ENTER_BR && (CKEDITOR.env.gecko && (b = b.replace(/^<br><br>$/, "\x3cbr\x3e")), -1 < b.indexOf("\x3cbr\x3e\x3cbr\x3e") && (b = "\x3cp\x3e" + b.replace(/(<br>){2,}/g, function(a) {
				return c(a.length / 4)
			}) + "\x3c/p\x3e"));
			return k(a, b)
		}

		function e() {
			function a() {
				var b = {},
					c;
				for (c in CKEDITOR.dtd) "$" != c.charAt(0) && "div" != c && "span" != c && (b[c] = 1);
				return b
			}
			var b = {};
			return {
				get: function(c) {
					return "plain-text" == c ? b.plainText || (b.plainText = new CKEDITOR.filter("br")) : "semantic-content" == c ? ((c = b.semanticContent) || (c = new CKEDITOR.filter, c.allow({
						$1: {
							elements: a(),
							attributes: !0,
							styles: !1,
							classes: !1
						}
					}), c = b.semanticContent = c), c) : c ? new CKEDITOR.filter(c) : null
				}
			}
		}

		function l(a, b, c) {
			b = CKEDITOR.htmlParser.fragment.fromHtml(b);
			var d = new CKEDITOR.htmlParser.basicWriter;
			c.applyTo(b, !0, !1, a.activeEnterMode);
			b.writeHtml(d);
			return d.getHtml()
		}

		function k(a, b) {
			a.enterMode == CKEDITOR.ENTER_BR ? b = b.replace(/(<\/p><p>)+/g, function(a) {
				return CKEDITOR.tools.repeat("\x3cbr\x3e", a.length / 7 * 2)
			}).replace(/<\/?p>/g, "") : a.enterMode == CKEDITOR.ENTER_DIV && (b = b.replace(/<(\/)?p>/g, "\x3c$1div\x3e"));
			return b
		}

		function d(a) {
			a.data.preventDefault();
			a.data.$.dataTransfer.dropEffect = "none"
		}

		function h(b) {
			var c = CKEDITOR.plugins.clipboard;
			b.on("contentDom", function() {
				function d(c, e, f) {
					e.select();
					a(b, {
						dataTransfer: f,
						method: "drop"
					}, 1);
					f.sourceEditor.fire("saveSnapshot");
					f.sourceEditor.editable().extractHtmlFromRange(c);
					f.sourceEditor.getSelection().selectRanges([c]);
					f.sourceEditor.fire("saveSnapshot")
				}

				function e(d, f) {
					d.select();
					a(b, {
						dataTransfer: f,
						method: "drop"
					}, 1);
					c.resetDragDataTransfer()
				}

				function f(a, c, d) {
					var e = {
						$: a.data.$,
						target: a.data.getTarget()
					};
					c && (e.dragRange = c);
					d && (e.dropRange = d);
					!1 === b.fire(a.name, e) && a.data.preventDefault()
				}

				function h(a) {
					a.type != CKEDITOR.NODE_ELEMENT && (a = a.getParent());
					return a.getChildCount()
				}
				var k = b.editable(),
					l = CKEDITOR.plugins.clipboard.getDropTarget(b),
					m = b.ui.space("top"),
					A = b.ui.space("bottom");
				c.preventDefaultDropOnElement(m);
				c.preventDefaultDropOnElement(A);
				k.attachListener(l, "dragstart", f);
				k.attachListener(b, "dragstart", c.resetDragDataTransfer, c, null, 1);
				k.attachListener(b, "dragstart", function(a) {
					c.initDragDataTransfer(a, b)
				}, null, null, 2);
				k.attachListener(b, "dragstart", function() {
					var a = c.dragRange = b.getSelection().getRanges()[0];
					CKEDITOR.env.ie && 10 > CKEDITOR.env.version && (c.dragStartContainerChildCount = a ? h(a.startContainer) : null, c.dragEndContainerChildCount = a ? h(a.endContainer) : null)
				}, null, null, 100);
				k.attachListener(l, "dragend", f);
				k.attachListener(b, "dragend", c.initDragDataTransfer, c, null, 1);
				k.attachListener(b, "dragend", c.resetDragDataTransfer, c, null, 100);
				k.attachListener(l, "dragover", function(a) {
					if (CKEDITOR.env.edge) a.data.preventDefault();
					else {
						var b = a.data.getTarget();
						b && b.is && b.is("html") ? a.data.preventDefault() : CKEDITOR.env.ie && CKEDITOR.plugins.clipboard.isFileApiSupported && a.data.$.dataTransfer.types.contains("Files") && a.data.preventDefault()
					}
				});
				k.attachListener(l, "drop", function(a) {
					if (!a.data.$.defaultPrevented) {
						a.data.preventDefault();
						var d = a.data.getTarget();
						if (!d.isReadOnly() || d.type == CKEDITOR.NODE_ELEMENT && d.is("html")) {
							var d = c.getRangeAtDropPosition(a, b),
								e = c.dragRange;
							d && f(a, e, d)
						}
					}
				}, null, null, 9999);
				k.attachListener(b, "drop", c.initDragDataTransfer, c, null, 1);
				k.attachListener(b, "drop", function(a) {
					if (a = a.data) {
						var f = a.dropRange,
							h = a.dragRange,
							k = a.dataTransfer;
						k.getTransferType(b) == CKEDITOR.DATA_TRANSFER_INTERNAL ? setTimeout(function() {
							c.internalDrop(h, f, k, b)
						}, 0) : k.getTransferType(b) == CKEDITOR.DATA_TRANSFER_CROSS_EDITORS ? d(h, f, k) : e(f, k)
					}
				}, null, null, 9999)
			})
		}
		CKEDITOR.plugins.add("clipboard", {
			requires: "notification",
			init: function(a) {
				var d, k = e();
				a.config.forcePasteAsPlainText ? d = "plain-text" : a.config.pasteFilter ? d = a.config.pasteFilter : !CKEDITOR.env.webkit || "pasteFilter" in a.config || (d = "semantic-content");
				a.pasteFilter = k.get(d);
				f(a);
				h(a);
				if (CKEDITOR.env.gecko) {
					var m = ["image/png", "image/jpeg", "image/gif"],
						x;
					a.on("paste", function(b) {
						var c = b.data,
							d = c.dataTransfer;
						if (!c.dataValue && "paste" == c.method && d && 1 == d.getFilesCount() && x != d.id && (d = d.getFile(0), -1 != CKEDITOR.tools.indexOf(m, d.type))) {
							var e = new FileReader;
							e.addEventListener("load", function() {
								b.data.dataValue = '\x3cimg src\x3d"' + e.result + '" /\x3e';
								a.fire("paste", b.data)
							}, !1);
							e.addEventListener("abort", function() {
								a.fire("paste", b.data)
							}, !1);
							e.addEventListener("error", function() {
								a.fire("paste", b.data)
							}, !1);
							e.readAsDataURL(d);
							x = c.dataTransfer.id;
							b.stop()
						}
					}, null, null, 1)
				}
				a.on("paste", function(b) {
					b.data.dataTransfer || (b.data.dataTransfer = new CKEDITOR.plugins.clipboard.dataTransfer);
					if (!b.data.dataValue) {
						var c = b.data.dataTransfer,
							d = c.getData("text/html");
						if (d) b.data.dataValue = d, b.data.type = "html";
						else if (d = c.getData("text/plain")) b.data.dataValue = a.editable().transformPlainTextToHtml(d), b.data.type = "text"
					}
				}, null, null, 1);
				a.on("paste", function(a) {
					var b = a.data.dataValue,
						c = CKEDITOR.dtd.$block; - 1 < b.indexOf("Apple-") && (b = b.replace(/<span class="Apple-converted-space">&nbsp;<\/span>/gi, " "), "html" != a.data.type && (b = b.replace(/<span class="Apple-tab-span"[^>]*>([^<]*)<\/span>/gi, function(a, b) {
						return b.replace(/\t/g, "\x26nbsp;\x26nbsp; \x26nbsp;")
					})), -1 < b.indexOf('\x3cbr class\x3d"Apple-interchange-newline"\x3e') && (a.data.startsWithEOL = 1, a.data.preSniffing = "html", b = b.replace(/<br class="Apple-interchange-newline">/, "")), b = b.replace(/(<[^>]+) class="Apple-[^"]*"/gi, "$1"));
					if (b.match(/^<[^<]+cke_(editable|contents)/i)) {
						var d, e, f = new CKEDITOR.dom.element("div");
						for (f.setHtml(b); 1 == f.getChildCount() && (d = f.getFirst()) && d.type == CKEDITOR.NODE_ELEMENT && (d.hasClass("cke_editable") || d.hasClass("cke_contents"));) f = e = d;
						e && (b = e.getHtml().replace(/<br>$/i, ""))
					}
					CKEDITOR.env.ie ? b = b.replace(/^&nbsp;(?: |\r\n)?<(\w+)/g, function(b, d) {
						return d.toLowerCase() in c ? (a.data.preSniffing = "html", "\x3c" + d) : b
					}) : CKEDITOR.env.webkit ? b = b.replace(/<\/(\w+)><div><br><\/div>$/, function(b, d) {
						return d in c ? (a.data.endsWithEOL = 1, "\x3c/" + d + "\x3e") : b
					}) : CKEDITOR.env.gecko && (b = b.replace(/(\s)<br>$/, "$1"));
					a.data.dataValue = b
				}, null, null, 3);
				a.on("paste", function(d) {
					d = d.data;
					var e = a._.nextPasteType || d.type,
						f = d.dataValue,
						h, m = a.config.clipboard_defaultContentType || "html",
						q = d.dataTransfer.getTransferType(a);
					h = "html" == e || "html" == d.preSniffing ? "html" : b(f);
					delete a._.nextPasteType;
					"htmlifiedtext" == h && (f = c(a.config, f));
					"text" == e && "html" == h ? f = l(a, f, k.get("plain-text")) : q == CKEDITOR.DATA_TRANSFER_EXTERNAL && a.pasteFilter && !d.dontFilter && (f = l(a, f, a.pasteFilter));
					d.startsWithEOL && (f = '\x3cbr data-cke-eol\x3d"1"\x3e' + f);
					d.endsWithEOL && (f += '\x3cbr data-cke-eol\x3d"1"\x3e');
					"auto" == e && (e = "html" == h || "html" == m ? "html" : "text");
					d.type = e;
					d.dataValue = f;
					delete d.preSniffing;
					delete d.startsWithEOL;
					delete d.endsWithEOL
				}, null, null, 6);
				a.on("paste", function(b) {
					b = b.data;
					b.dataValue && (a.insertHtml(b.dataValue, b.type, b.range), setTimeout(function() {
						a.fire("afterPaste")
					}, 0))
				}, null, null, 1E3)
			}
		});
		CKEDITOR.plugins.clipboard = {
			isCustomCopyCutSupported: !CKEDITOR.env.ie && !CKEDITOR.env.iOS,
			isCustomDataTypesSupported: !CKEDITOR.env.ie,
			isFileApiSupported: !CKEDITOR.env.ie || 9 < CKEDITOR.env.version,
			mainPasteEvent: CKEDITOR.env.ie && !CKEDITOR.env.edge ? "beforepaste" : "paste",
			canClipboardApiBeTrusted: function(a, b) {
				return a.getTransferType(b) != CKEDITOR.DATA_TRANSFER_EXTERNAL || CKEDITOR.env.chrome && !a.isEmpty() || CKEDITOR.env.gecko && (a.getData("text/html") || a.getFilesCount()) || CKEDITOR.env.safari && 603 <= CKEDITOR.env.version && !CKEDITOR.env.iOS ? !0 : !1
			},
			getDropTarget: function(a) {
				var b = a.editable();
				return CKEDITOR.env.ie && 9 > CKEDITOR.env.version || b.isInline() ? b : a.document
			},
			fixSplitNodesAfterDrop: function(a, b, c, d) {
				function e(a, c, d) {
					var f = a;
					f.type == CKEDITOR.NODE_TEXT && (f = a.getParent());
					if (f.equals(c) && d != c.getChildCount()) return a = b.startContainer.getChild(b.startOffset - 1), c = b.startContainer.getChild(b.startOffset), a && a.type == CKEDITOR.NODE_TEXT && c && c.type == CKEDITOR.NODE_TEXT && (d = a.getLength(), a.setText(a.getText() + c.getText()), c.remove(), b.setStart(a, d), b.collapse(!0)), !0
				}
				var f = b.startContainer;
				"number" == typeof d && "number" == typeof c && f.type == CKEDITOR.NODE_ELEMENT && (e(a.startContainer, f, c) || e(a.endContainer, f, d))
			},
			isDropRangeAffectedByDragRange: function(a, b) {
				var c = b.startContainer,
					d = b.endOffset;
				return a.endContainer.equals(c) && a.endOffset <= d || a.startContainer.getParent().equals(c) && a.startContainer.getIndex() < d || a.endContainer.getParent().equals(c) && a.endContainer.getIndex() < d ? !0 : !1
			},
			internalDrop: function(b, c, d, e) {
				var f = CKEDITOR.plugins.clipboard,
					h = e.editable(),
					k, l;
				e.fire("saveSnapshot");
				e.fire("lockSnapshot", {
					dontUpdate: 1
				});
				CKEDITOR.env.ie && 10 > CKEDITOR.env.version && this.fixSplitNodesAfterDrop(b, c, f.dragStartContainerChildCount, f.dragEndContainerChildCount);
				(l = this.isDropRangeAffectedByDragRange(b, c)) || (k = b.createBookmark(!1));
				f = c.clone().createBookmark(!1);
				l && (k = b.createBookmark(!1));
				b = k.startNode;
				c = k.endNode;
				l = f.startNode;
				c && b.getPosition(l) & CKEDITOR.POSITION_PRECEDING && c.getPosition(l) & CKEDITOR.POSITION_FOLLOWING && l.insertBefore(b);
				b = e.createRange();
				b.moveToBookmark(k);
				h.extractHtmlFromRange(b, 1);
				c = e.createRange();
				c.moveToBookmark(f);
				a(e, {
					dataTransfer: d,
					method: "drop",
					range: c
				}, 1);
				e.fire("unlockSnapshot")
			},
			getRangeAtDropPosition: function(a, b) {
				var c = a.data.$,
					d = c.clientX,
					e = c.clientY,
					f = b.getSelection(!0).getRanges()[0],
					h = b.createRange();
				if (a.data.testRange) return a.data.testRange;
				if (document.caretRangeFromPoint && b.document.$.caretRangeFromPoint(d, e)) c = b.document.$.caretRangeFromPoint(d, e), h.setStart(CKEDITOR.dom.node(c.startContainer), c.startOffset), h.collapse(!0);
				else if (c.rangeParent) h.setStart(CKEDITOR.dom.node(c.rangeParent), c.rangeOffset), h.collapse(!0);
				else {
					if (CKEDITOR.env.ie && 8 < CKEDITOR.env.version && f && b.editable().hasFocus) return f;
					if (document.body.createTextRange) {
						b.focus();
						c = b.document.getBody().$.createTextRange();
						try {
							for (var k = !1, l = 0; 20 > l && !k; l++) {
								if (!k) try {
									c.moveToPoint(d, e - l), k = !0
								} catch (m) {}
								if (!k) try {
									c.moveToPoint(d, e + l), k = !0
								} catch (q) {}
							}
							if (k) {
								var w = "cke-temp-" + (new Date).getTime();
								c.pasteHTML('\x3cspan id\x3d"' + w + '"\x3e​\x3c/span\x3e');
								var B = b.document.getById(w);
								h.moveToPosition(B, CKEDITOR.POSITION_BEFORE_START);
								B.remove()
							} else {
								var z = b.document.$.elementFromPoint(d, e),
									C = new CKEDITOR.dom.element(z),
									E;
								if (C.equals(b.editable()) || "html" == C.getName()) return f && f.startContainer && !f.startContainer.equals(b.editable()) ? f : null;
								E = C.getClientRect();
								d < E.left ? h.setStartAt(C, CKEDITOR.POSITION_AFTER_START) : h.setStartAt(C, CKEDITOR.POSITION_BEFORE_END);
								h.collapse(!0)
							}
						} catch (G) {
							return null
						}
					} else return null
				}
				return h
			},
			initDragDataTransfer: function(a, b) {
				var c = a.data.$ ? a.data.$.dataTransfer : null,
					d = new this.dataTransfer(c, b);
				c ? this.dragData && d.id == this.dragData.id ? d = this.dragData : this.dragData = d : this.dragData ? d = this.dragData : this.dragData = d;
				a.data.dataTransfer = d
			},
			resetDragDataTransfer: function() {
				this.dragData = null
			},
			initPasteDataTransfer: function(a, b) {
				if (this.isCustomCopyCutSupported) {
					if (a && a.data && a.data.$) {
						var c = new this.dataTransfer(a.data.$.clipboardData, b);
						this.copyCutData && c.id == this.copyCutData.id ? (c = this.copyCutData, c.$ = a.data.$.clipboardData) : this.copyCutData = c;
						return c
					}
					return new this.dataTransfer(null, b)
				}
				return new this.dataTransfer(CKEDITOR.env.edge && a && a.data.$ && a.data.$.clipboardData || null, b)
			},
			preventDefaultDropOnElement: function(a) {
				a && a.on("dragover", d)
			}
		};
		var m = CKEDITOR.plugins.clipboard.isCustomDataTypesSupported ? "cke/id" : "Text";
		CKEDITOR.plugins.clipboard.dataTransfer = function(a, b) {
			a && (this.$ = a);
			this._ = {
				metaRegExp: /^<meta.*?>/i,
				bodyRegExp: /<body(?:[\s\S]*?)>([\s\S]*)<\/body>/i,
				fragmentRegExp: /\x3c!--(?:Start|End)Fragment--\x3e/g,
				data: {},
				files: [],
				normalizeType: function(a) {
					a = a.toLowerCase();
					return "text" == a || "text/plain" == a ? "Text" : "url" == a ? "URL" : a
				}
			};
			this.id = this.getData(m);
			this.id || (this.id = "Text" == m ? "" : "cke-" + CKEDITOR.tools.getUniqueId());
			if ("Text" != m) try {
				this.$.setData(m, this.id)
			} catch (c) {}
			b && (this.sourceEditor = b, this.setData("text/html", b.getSelectedHtml(1)), "Text" == m || this.getData("text/plain") || this.setData("text/plain", b.getSelection().getSelectedText()))
		};
		CKEDITOR.DATA_TRANSFER_INTERNAL = 1;
		CKEDITOR.DATA_TRANSFER_CROSS_EDITORS = 2;
		CKEDITOR.DATA_TRANSFER_EXTERNAL = 3;
		CKEDITOR.plugins.clipboard.dataTransfer.prototype = {
			getData: function(a, b) {
				a = this._.normalizeType(a);
				var c = this._.data[a],
					d;
				if (void 0 === c || null === c || "" === c) try {
					c = this.$.getData(a)
				} catch (e) {}
				if (void 0 === c || null === c || "" === c) c = "";
				"text/html" != a || b ? "Text" == a && CKEDITOR.env.gecko && this.getFilesCount() && "file://" == c.substring(0, 7) && (c = "") : (c = c.replace(this._.metaRegExp, ""), (d = this._.bodyRegExp.exec(c)) && d.length && (c = d[1], c = c.replace(this._.fragmentRegExp, "")));
				"string" === typeof c && (d = c.indexOf("\x3c/html\x3e"), c = -1 !== d ? c.substring(0, d + 7) : c);
				return c
			},
			setData: function(a, b) {
				a = this._.normalizeType(a);
				this._.data[a] = b;
				if (CKEDITOR.plugins.clipboard.isCustomDataTypesSupported || "URL" == a || "Text" == a) {
					"Text" == m && "Text" == a && (this.id = b);
					try {
						this.$.setData(a, b)
					} catch (c) {}
				}
			},
			getTransferType: function(a) {
				return this.sourceEditor ? this.sourceEditor == a ? CKEDITOR.DATA_TRANSFER_INTERNAL : CKEDITOR.DATA_TRANSFER_CROSS_EDITORS : CKEDITOR.DATA_TRANSFER_EXTERNAL
			},
			cacheData: function() {
				function a(c) {
					c = b._.normalizeType(c);
					var d = b.getData(c, !0);
					d && (b._.data[c] = d)
				}
				if (this.$) {
					var b = this,
						c, d;
					if (CKEDITOR.plugins.clipboard.isCustomDataTypesSupported) {
						if (this.$.types)
							for (c = 0; c < this.$.types.length; c++) a(this.$.types[c])
					} else a("Text"),
						a("URL");
					d = this._getImageFromClipboard();
					if (this.$ && this.$.files || d) {
						this._.files = [];
						if (this.$.files && this.$.files.length)
							for (c = 0; c < this.$.files.length; c++) this._.files.push(this.$.files[c]);
						0 === this._.files.length && d && this._.files.push(d)
					}
				}
			},
			getFilesCount: function() {
				return this._.files.length ? this._.files.length : this.$ && this.$.files && this.$.files.length ? this.$.files.length : this._getImageFromClipboard() ? 1 : 0
			},
			getFile: function(a) {
				return this._.files.length ? this._.files[a] : this.$ && this.$.files && this.$.files.length ? this.$.files[a] : 0 === a ? this._getImageFromClipboard() : void 0
			},
			isEmpty: function() {
				var a = {},
					b;
				if (this.getFilesCount()) return !1;
				for (b in this._.data) a[b] = 1;
				if (this.$)
					if (CKEDITOR.plugins.clipboard.isCustomDataTypesSupported) {
						if (this.$.types)
							for (var c = 0; c < this.$.types.length; c++) a[this.$.types[c]] = 1
					} else a.Text = 1, a.URL = 1;
					"Text" != m && (a[m] = 0);
				for (b in a)
					if (a[b] && "" !== this.getData(b)) return !1;
				return !0
			},
			_getImageFromClipboard: function() {
				var a;
				if (this.$ && this.$.items && this.$.items[0]) try {
					if ((a = this.$.items[0].getAsFile()) && a.type) return a
				} catch (b) {}
			}
		}
	}(), CKEDITOR.config.clipboard_notificationDuration = 1E4, function() {
		CKEDITOR.plugins.add("panel", {
			beforeInit: function(a) {
				a.ui.addHandler(CKEDITOR.UI_PANEL, CKEDITOR.ui.panel.handler)
			}
		});
		CKEDITOR.UI_PANEL = "panel";
		CKEDITOR.ui.panel = function(a, b) {
			b && CKEDITOR.tools.extend(this, b);
			CKEDITOR.tools.extend(this, {
				className: "",
				css: []
			});
			this.id = CKEDITOR.tools.getNextId();
			this.document = a;
			this.isFramed = this.forceIFrame || this.css.length;
			this._ = {
				blocks: {}
			}
		};
		CKEDITOR.ui.panel.handler = {
			create: function(a) {
				return new CKEDITOR.ui.panel(a)
			}
		};
		var a = CKEDITOR.addTemplate("panel", '\x3cdiv lang\x3d"{langCode}" id\x3d"{id}" dir\x3d{dir} class\x3d"cke cke_reset_all {editorId} cke_panel cke_panel {cls} cke_{dir}" style\x3d"z-index:{z-index}" role\x3d"presentation"\x3e{frame}\x3c/div\x3e'),
			f = CKEDITOR.addTemplate("panel-frame", '\x3ciframe id\x3d"{id}" class\x3d"cke_panel_frame" role\x3d"presentation" frameborder\x3d"0" src\x3d"{src}"\x3e\x3c/iframe\x3e'),
			b = CKEDITOR.addTemplate("panel-frame-inner", '\x3c!DOCTYPE html\x3e\x3chtml class\x3d"cke_panel_container {env}" dir\x3d"{dir}" lang\x3d"{langCode}"\x3e\x3chead\x3e{css}\x3c/head\x3e\x3cbody class\x3d"cke_{dir}" style\x3d"margin:0;padding:0" onload\x3d"{onload}"\x3e\x3c/body\x3e\x3c/html\x3e');
		CKEDITOR.ui.panel.prototype = {
			render: function(c, e) {
				this.getHolderElement = function() {
					var a = this._.holder;
					if (!a) {
						if (this.isFramed) {
							var a = this.document.getById(this.id + "_frame"),
								c = a.getParent(),
								a = a.getFrameDocument();
							CKEDITOR.env.iOS && c.setStyles({
								overflow: "scroll",
								"-webkit-overflow-scrolling": "touch"
							});
							c = CKEDITOR.tools.addFunction(CKEDITOR.tools.bind(function() {
								this.isLoaded = !0;
								if (this.onLoad) this.onLoad()
							}, this));
							a.write(b.output(CKEDITOR.tools.extend({
								css: CKEDITOR.tools.buildStyleHtml(this.css),
								onload: "window.parent.CKEDITOR.tools.callFunction(" + c + ");"
							}, l)));
							a.getWindow().$.CKEDITOR = CKEDITOR;
							a.on("keydown", function(a) {
								var b = a.data.getKeystroke(),
									c = this.document.getById(this.id).getAttribute("dir");
								this._.onKeyDown && !1 === this._.onKeyDown(b) ? a.data.preventDefault() : (27 == b || b == ("rtl" == c ? 39 : 37)) && this.onEscape && !1 === this.onEscape(b) && a.data.preventDefault()
							}, this);
							a = a.getBody();
							a.unselectable();
							CKEDITOR.env.air && CKEDITOR.tools.callFunction(c)
						} else a = this.document.getById(this.id);
						this._.holder = a
					}
					return a
				};
				var l = {
					editorId: c.id,
					id: this.id,
					langCode: c.langCode,
					dir: c.lang.dir,
					cls: this.className,
					frame: "",
					env: CKEDITOR.env.cssClass,
					"z-index": c.config.baseFloatZIndex + 1
				};
				if (this.isFramed) {
					var k = CKEDITOR.env.air ? "javascript:void(0)" : CKEDITOR.env.ie ? "javascript:void(function(){" + encodeURIComponent("document.open();(" + CKEDITOR.tools.fixDomain + ")();document.close();") + "}())" : "";
					l.frame = f.output({
						id: this.id + "_frame",
						src: k
					})
				}
				k = a.output(l);
				e && e.push(k);
				return k
			},
			addBlock: function(a, b) {
				b = this._.blocks[a] = b instanceof CKEDITOR.ui.panel.block ? b : new CKEDITOR.ui.panel.block(this.getHolderElement(), b);
				this._.currentBlock || this.showBlock(a);
				return b
			},
			getBlock: function(a) {
				return this._.blocks[a]
			},
			showBlock: function(a) {
				a = this._.blocks[a];
				var b = this._.currentBlock,
					f = !this.forceIFrame || CKEDITOR.env.ie ? this._.holder : this.document.getById(this.id + "_frame");
				b && b.hide();
				this._.currentBlock = a;
				CKEDITOR.fire("ariaWidget", f);
				a._.focusIndex = -1;
				this._.onKeyDown = a.onKeyDown && CKEDITOR.tools.bind(a.onKeyDown, a);
				a.show();
				return a
			},
			destroy: function() {
				this.element && this.element.remove()
			}
		};
		CKEDITOR.ui.panel.block = CKEDITOR.tools.createClass({
			$: function(a, b) {
				this.element = a.append(a.getDocument().createElement("div", {
					attributes: {
						tabindex: -1,
						"class": "cke_panel_block"
					},
					styles: {
						display: "none"
					}
				}));
				b && CKEDITOR.tools.extend(this, b);
				this.element.setAttributes({
					role: this.attributes.role || "presentation",
					"aria-label": this.attributes["aria-label"],
					title: this.attributes.title || this.attributes["aria-label"]
				});
				this.keys = {};
				this._.focusIndex = -1;
				this.element.disableContextMenu()
			},
			_: {
				markItem: function(a) {
					-1 != a && (a = this.element.getElementsByTag("a").getItem(this._.focusIndex = a), CKEDITOR.env.webkit && a.getDocument().getWindow().focus(), a.focus(), this.onMark && this.onMark(a))
				},
				markFirstDisplayed: function(a) {
					for (var b = function(a) {
							return a.type == CKEDITOR.NODE_ELEMENT && "none" == a.getStyle("display")
						}, f = this._.getItems(), k, d, h = f.count() - 1; 0 <= h; h--)
						if (k = f.getItem(h), k.getAscendant(b) || (d = k, this._.focusIndex = h), "true" == k.getAttribute("aria-selected")) {
							d = k;
							this._.focusIndex = h;
							break
						}
					d && (a && a(), CKEDITOR.env.webkit && d.getDocument().getWindow().focus(), d.focus(), this.onMark && this.onMark(d))
				},
				getItems: function() {
					return this.element.getElementsByTag("a")
				}
			},
			proto: {
				show: function() {
					this.element.setStyle("display", "")
				},
				hide: function() {
					this.onHide && !0 === this.onHide.call(this) || this.element.setStyle("display", "none")
				},
				onKeyDown: function(a, b) {
					var f = this.keys[a];
					switch (f) {
						case "next":
							for (var k = this._.focusIndex, f = this.element.getElementsByTag("a"), d; d = f.getItem(++k);)
								if (d.getAttribute("_cke_focus") && d.$.offsetWidth) {
									this._.focusIndex = k;
									d.focus();
									break
								}
							return d || b ? !1 : (this._.focusIndex = -1, this.onKeyDown(a, 1));
						case "prev":
							k = this._.focusIndex;
							for (f = this.element.getElementsByTag("a"); 0 < k && (d = f.getItem(--k));) {
								if (d.getAttribute("_cke_focus") && d.$.offsetWidth) {
									this._.focusIndex = k;
									d.focus();
									break
								}
								d = null
							}
							return d || b ? !1 : (this._.focusIndex = f.count(), this.onKeyDown(a, 1));
						case "click":
						case "mouseup":
							return k = this._.focusIndex, (d = 0 <= k && this.element.getElementsByTag("a").getItem(k)) && (d.$[f] ? d.$[f]() : d.$["on" + f]()), !1
					}
					return !0
				}
			}
		})
	}(), CKEDITOR.plugins.add("floatpanel", {
		requires: "panel"
	}), function() {
		function a(a, c, e, l, k) {
			k = CKEDITOR.tools.genKey(c.getUniqueId(), e.getUniqueId(), a.lang.dir, a.uiColor || "", l.css || "", k || "");
			var d = f[k];
			d || (d = f[k] = new CKEDITOR.ui.panel(c, l), d.element = e.append(CKEDITOR.dom.element.createFromHtml(d.render(a), c)), d.element.setStyles({
				display: "none",
				position: "absolute"
			}));
			return d
		}
		var f = {};
		CKEDITOR.ui.floatPanel = CKEDITOR.tools.createClass({
			$: function(b, c, e, f) {
				function k() {
					g.hide()
				}
				e.forceIFrame = 1;
				e.toolbarRelated && b.elementMode == CKEDITOR.ELEMENT_MODE_INLINE && (c = CKEDITOR.document.getById("cke_" + b.name));
				var d = c.getDocument();
				f = a(b, d, c, e, f || 0);
				var h = f.element,
					m = h.getFirst(),
					g = this;
				h.disableContextMenu();
				this.element = h;
				this._ = {
					editor: b,
					panel: f,
					parentElement: c,
					definition: e,
					document: d,
					iframe: m,
					children: [],
					dir: b.lang.dir,
					showBlockParams: null
				};
				b.on("mode", k);
				b.on("resize", k);
				d.getWindow().on("resize", function() {
					this.reposition()
				}, this)
			},
			proto: {
				addBlock: function(a, c) {
					return this._.panel.addBlock(a, c)
				},
				addListBlock: function(a, c) {
					return this._.panel.addListBlock(a, c)
				},
				getBlock: function(a) {
					return this._.panel.getBlock(a)
				},
				showBlock: function(a, c, e, f, k, d) {
					var h = this._.panel,
						m = h.showBlock(a);
					this._.showBlockParams = [].slice.call(arguments);
					this.allowBlur(!1);
					var g = this._.editor.editable();
					this._.returnFocus = g.hasFocus ? g : new CKEDITOR.dom.element(CKEDITOR.document.$.activeElement);
					this._.hideTimeout = 0;
					var n = this.element,
						g = this._.iframe,
						g = CKEDITOR.env.ie && !CKEDITOR.env.edge ? g : new CKEDITOR.dom.window(g.$.contentWindow),
						p = n.getDocument(),
						r = this._.parentElement.getPositionedAncestor(),
						x = c.getDocumentPosition(p),
						p = r ? r.getDocumentPosition(p) : {
							x: 0,
							y: 0
						},
						v = "rtl" == this._.dir,
						u = x.x + (f || 0) - p.x,
						t = x.y + (k || 0) - p.y;
					!v || 1 != e && 4 != e ? v || 2 != e && 3 != e || (u += c.$.offsetWidth - 1) : u += c.$.offsetWidth;
					if (3 == e || 4 == e) t += c.$.offsetHeight - 1;
					this._.panel._.offsetParentId = c.getId();
					n.setStyles({
						top: t + "px",
						left: 0,
						display: ""
					});
					n.setOpacity(0);
					n.getFirst().removeStyle("width");
					this._.editor.focusManager.add(g);
					this._.blurSet || (CKEDITOR.event.useCapture = !0, g.on("blur", function(a) {
						function b() {
							delete this._.returnFocus;
							this.hide()
						}
						this.allowBlur() && a.data.getPhase() == CKEDITOR.EVENT_PHASE_AT_TARGET && this.visible && !this._.activeChild && (CKEDITOR.env.iOS ? this._.hideTimeout || (this._.hideTimeout = CKEDITOR.tools.setTimeout(b, 0, this)) : b.call(this))
					}, this), g.on("focus", function() {
						this._.focused = !0;
						this.hideChild();
						this.allowBlur(!0)
					}, this), CKEDITOR.env.iOS && (g.on("touchstart", function() {
						clearTimeout(this._.hideTimeout)
					}, this), g.on("touchend", function() {
						this._.hideTimeout = 0;
						this.focus()
					}, this)), CKEDITOR.event.useCapture = !1, this._.blurSet = 1);
					h.onEscape = CKEDITOR.tools.bind(function(a) {
						if (this.onEscape && !1 === this.onEscape(a)) return !1
					}, this);
					CKEDITOR.tools.setTimeout(function() {
						var a = CKEDITOR.tools.bind(function() {
							var a = n;
							a.removeStyle("width");
							if (m.autoSize) {
								var b = m.element.getDocument(),
									b = (CKEDITOR.env.webkit || CKEDITOR.env.edge ? m.element : b.getBody()).$.scrollWidth;
								CKEDITOR.env.ie && CKEDITOR.env.quirks && 0 < b && (b += (a.$.offsetWidth || 0) - (a.$.clientWidth || 0) + 3);
								a.setStyle("width", b + 10 + "px");
								b = m.element.$.scrollHeight;
								CKEDITOR.env.ie && CKEDITOR.env.quirks && 0 < b && (b += (a.$.offsetHeight || 0) - (a.$.clientHeight || 0) + 3);
								a.setStyle("height", b + "px");
								h._.currentBlock.element.setStyle("display", "none").removeStyle("display")
							} else a.removeStyle("height");
							v && (u -= n.$.offsetWidth);
							n.setStyle("left", u + "px");
							var b = h.element.getWindow(),
								a = n.$.getBoundingClientRect(),
								b = b.getViewPaneSize(),
								c = a.width || a.right - a.left,
								e = a.height || a.bottom - a.top,
								f = v ? a.right : b.width - a.left,
								g = v ? b.width - a.right : a.left;
							v ? f < c && (u = g > c ? u + c : b.width > c ? u - a.left : u - a.right + b.width) : f < c && (u = g > c ? u - c : b.width > c ? u - a.right + b.width : u - a.left);
							c = a.top;
							b.height - a.top < e && (t = c > e ? t - e : b.height > e ? t - a.bottom + b.height : t - a.top);
							CKEDITOR.env.ie && (b = a = new CKEDITOR.dom.element(n.$.offsetParent), "html" == b.getName() && (b = b.getDocument().getBody()), "rtl" == b.getComputedStyle("direction") && (u = CKEDITOR.env.ie8Compat ? u - 2 * n.getDocument().getDocumentElement().$.scrollLeft : u - (a.$.scrollWidth - a.$.clientWidth)));
							var a = n.getFirst(),
								k;
							(k = a.getCustomData("activePanel")) && k.onHide && k.onHide.call(this, 1);
							a.setCustomData("activePanel", this);
							n.setStyles({
								top: t + "px",
								left: u + "px"
							});
							n.setOpacity(1);
							d && d()
						}, this);
						h.isLoaded ? a() : h.onLoad = a;
						CKEDITOR.tools.setTimeout(function() {
							var a = CKEDITOR.env.webkit && CKEDITOR.document.getWindow().getScrollPosition().y;
							this.focus();
							m.element.focus();
							CKEDITOR.env.webkit && (CKEDITOR.document.getBody().$.scrollTop = a);
							this.allowBlur(!0);
							CKEDITOR.env.ie ? CKEDITOR.tools.setTimeout(function() {
								m.markFirstDisplayed ? m.markFirstDisplayed() : m._.markFirstDisplayed()
							}, 0) : m.markFirstDisplayed ? m.markFirstDisplayed() : m._.markFirstDisplayed();
							this._.editor.fire("panelShow", this)
						}, 0, this)
					}, CKEDITOR.env.air ? 200 : 0, this);
					this.visible = 1;
					this.onShow && this.onShow.call(this)
				},
				reposition: function() {
					var a = this._.showBlockParams;
					this.visible && this._.showBlockParams && (this.hide(), this.showBlock.apply(this, a))
				},
				focus: function() {
					if (CKEDITOR.env.webkit) {
						var a = CKEDITOR.document.getActive();
						a && !a.equals(this._.iframe) && a.$.blur()
					}(this._.lastFocused || this._.iframe.getFrameDocument().getWindow()).focus()
				},
				blur: function() {
					var a = this._.iframe.getFrameDocument().getActive();
					a && a.is("a") && (this._.lastFocused = a)
				},
				hide: function(a) {
					if (this.visible && (!this.onHide || !0 !== this.onHide.call(this))) {
						this.hideChild();
						CKEDITOR.env.gecko && this._.iframe.getFrameDocument().$.activeElement.blur();
						this.element.setStyle("display", "none");
						this.visible = 0;
						this.element.getFirst().removeCustomData("activePanel");
						if (a = a && this._.returnFocus) CKEDITOR.env.webkit && a.type && a.getWindow().$.focus(), a.focus();
						delete this._.lastFocused;
						this._.showBlockParams = null;
						this._.editor.fire("panelHide", this)
					}
				},
				allowBlur: function(a) {
					var c = this._.panel;
					void 0 !== a && (c.allowBlur = a);
					return c.allowBlur
				},
				showAsChild: function(a, c, e, f, k, d) {
					if (this._.activeChild != a || a._.panel._.offsetParentId != e.getId()) this.hideChild(), a.onHide = CKEDITOR.tools.bind(function() {
						CKEDITOR.tools.setTimeout(function() {
							this._.focused || this.hide()
						}, 0, this)
					}, this), this._.activeChild = a, this._.focused = !1, a.showBlock(c, e, f, k, d), this.blur(), (CKEDITOR.env.ie7Compat || CKEDITOR.env.ie6Compat) && setTimeout(function() {
						a.element.getChild(0).$.style.cssText += ""
					}, 100)
				},
				hideChild: function(a) {
					var c = this._.activeChild;
					c && (delete c.onHide, delete this._.activeChild, c.hide(), a && this.focus())
				}
			}
		});
		CKEDITOR.on("instanceDestroyed", function() {
			var a = CKEDITOR.tools.isEmpty(CKEDITOR.instances),
				c;
			for (c in f) {
				var e = f[c];
				a ? e.destroy() : e.element.hide()
			}
			a && (f = {})
		})
	}(), CKEDITOR.plugins.add("menu", {
		requires: "floatpanel",
		beforeInit: function(a) {
			for (var f = a.config.menu_groups.split(","), b = a._.menuGroups = {}, c = a._.menuItems = {}, e = 0; e < f.length; e++) b[f[e]] = e + 1;
			a.addMenuGroup = function(a, c) {
				b[a] = c || 100
			};
			a.addMenuItem = function(a, e) {
				b[e.group] && (c[a] = new CKEDITOR.menuItem(this, a, e))
			};
			a.addMenuItems = function(a) {
				for (var b in a) this.addMenuItem(b, a[b])
			};
			a.getMenuItem = function(a) {
				return c[a]
			};
			a.removeMenuItem = function(a) {
				delete c[a]
			}
		}
	}), function() {
		function a(a) {
			a.sort(function(a, b) {
				return a.group < b.group ? -1 : a.group > b.group ? 1 : a.order < b.order ? -1 : a.order > b.order ? 1 : 0
			})
		}
		var f = '\x3cspan class\x3d"cke_menuitem"\x3e\x3ca id\x3d"{id}" class\x3d"cke_menubutton cke_menubutton__{name} cke_menubutton_{state} {cls}" href\x3d"{href}" title\x3d"{title}" tabindex\x3d"-1" _cke_focus\x3d1 hidefocus\x3d"true" role\x3d"{role}" aria-label\x3d"{label}" aria-describedby\x3d"{id}_description" aria-haspopup\x3d"{hasPopup}" aria-disabled\x3d"{disabled}" {ariaChecked} draggable\x3d"false"';
		CKEDITOR.env.gecko && CKEDITOR.env.mac && (f += ' onkeypress\x3d"return false;"');
		CKEDITOR.env.gecko && (f += ' onblur\x3d"this.style.cssText \x3d this.style.cssText;" ondragstart\x3d"return false;"');
		var f = f + (' onmouseover\x3d"CKEDITOR.tools.callFunction({hoverFn},{index});" onmouseout\x3d"CKEDITOR.tools.callFunction({moveOutFn},{index});" ' + (CKEDITOR.env.ie ? 'onclick\x3d"return false;" onmouseup' : "onclick") + '\x3d"CKEDITOR.tools.callFunction({clickFn},{index}); return false;"\x3e'),
			b = CKEDITOR.addTemplate("menuItem", f + '\x3cspan class\x3d"cke_menubutton_inner"\x3e\x3cspan class\x3d"cke_menubutton_icon"\x3e\x3cspan class\x3d"cke_button_icon cke_button__{iconName}_icon" style\x3d"{iconStyle}"\x3e\x3c/span\x3e\x3c/span\x3e\x3cspan class\x3d"cke_menubutton_label"\x3e{label}\x3c/span\x3e{shortcutHtml}{arrowHtml}\x3c/span\x3e\x3c/a\x3e\x3cspan id\x3d"{id}_description" class\x3d"cke_voice_label" aria-hidden\x3d"false"\x3e{ariaShortcut}\x3c/span\x3e\x3c/span\x3e'),
			c = CKEDITOR.addTemplate("menuArrow", '\x3cspan class\x3d"cke_menuarrow"\x3e\x3cspan\x3e{label}\x3c/span\x3e\x3c/span\x3e'),
			e = CKEDITOR.addTemplate("menuShortcut", '\x3cspan class\x3d"cke_menubutton_label cke_menubutton_shortcut"\x3e{shortcut}\x3c/span\x3e');
		CKEDITOR.menu = CKEDITOR.tools.createClass({
			$: function(a, b) {
				b = this._.definition = b || {};
				this.id = CKEDITOR.tools.getNextId();
				this.editor = a;
				this.items = [];
				this._.listeners = [];
				this._.level = b.level || 1;
				var c = CKEDITOR.tools.extend({}, b.panel, {
						css: [CKEDITOR.skin.getPath("editor")],
						level: this._.level - 1,
						block: {}
					}),
					e = c.block.attributes = c.attributes || {};
				!e.role && (e.role = "menu");
				this._.panelDefinition = c
			},
			_: {
				onShow: function() {
					var a = this.editor.getSelection(),
						b = a && a.getStartElement(),
						c = this.editor.elementPath(),
						e = this._.listeners;
					this.removeAll();
					for (var f = 0; f < e.length; f++) {
						var g = e[f](b, a, c);
						if (g)
							for (var n in g) {
								var p = this.editor.getMenuItem(n);
								!p || p.command && !this.editor.getCommand(p.command).state || (p.state = g[n], this.add(p))
							}
					}
				},
				onClick: function(a) {
					this.hide();
					if (a.onClick) a.onClick();
					else a.command && this.editor.execCommand(a.command)
				},
				onEscape: function(a) {
					var b = this.parent;
					b ? b._.panel.hideChild(1) : 27 == a && this.hide(1);
					return !1
				},
				onHide: function() {
					this.onHide && this.onHide()
				},
				showSubMenu: function(a) {
					var b = this._.subMenu,
						c = this.items[a];
					if (c = c.getItems && c.getItems()) {
						b ? b.removeAll() : (b = this._.subMenu = new CKEDITOR.menu(this.editor, CKEDITOR.tools.extend({}, this._.definition, {
							level: this._.level + 1
						}, !0)), b.parent = this, b._.onClick = CKEDITOR.tools.bind(this._.onClick, this));
						for (var e in c) {
							var f = this.editor.getMenuItem(e);
							f && (f.state = c[e], b.add(f))
						}
						var g = this._.panel.getBlock(this.id).element.getDocument().getById(this.id + String(a));
						setTimeout(function() {
							b.show(g, 2)
						}, 0)
					} else this._.panel.hideChild(1)
				}
			},
			proto: {
				add: function(a) {
					a.order || (a.order = this.items.length);
					this.items.push(a)
				},
				removeAll: function() {
					this.items = []
				},
				show: function(b, c, d, e) {
					if (!this.parent && (this._.onShow(), !this.items.length)) return;
					c = c || ("rtl" == this.editor.lang.dir ? 2 : 1);
					var f = this.items,
						g = this.editor,
						n = this._.panel,
						p = this._.element;
					if (!n) {
						n = this._.panel = new CKEDITOR.ui.floatPanel(this.editor, CKEDITOR.document.getBody(), this._.panelDefinition, this._.level);
						n.onEscape = CKEDITOR.tools.bind(function(a) {
							if (!1 === this._.onEscape(a)) return !1
						}, this);
						n.onShow = function() {
							n._.panel.getHolderElement().getParent().addClass("cke").addClass("cke_reset_all")
						};
						n.onHide = CKEDITOR.tools.bind(function() {
							this._.onHide && this._.onHide()
						}, this);
						p = n.addBlock(this.id, this._.panelDefinition.block);
						p.autoSize = !0;
						var r = p.keys;
						r[40] = "next";
						r[9] = "next";
						r[38] = "prev";
						r[CKEDITOR.SHIFT + 9] = "prev";
						r["rtl" == g.lang.dir ? 37 : 39] = CKEDITOR.env.ie ? "mouseup" : "click";
						r[32] = CKEDITOR.env.ie ? "mouseup" : "click";
						CKEDITOR.env.ie && (r[13] = "mouseup");
						p = this._.element = p.element;
						r = p.getDocument();
						r.getBody().setStyle("overflow", "hidden");
						r.getElementsByTag("html").getItem(0).setStyle("overflow", "hidden");
						this._.itemOverFn = CKEDITOR.tools.addFunction(function(a) {
							clearTimeout(this._.showSubTimeout);
							this._.showSubTimeout = CKEDITOR.tools.setTimeout(this._.showSubMenu, g.config.menu_subMenuDelay || 400, this, [a])
						}, this);
						this._.itemOutFn = CKEDITOR.tools.addFunction(function() {
							clearTimeout(this._.showSubTimeout)
						}, this);
						this._.itemClickFn = CKEDITOR.tools.addFunction(function(a) {
							var b = this.items[a];
							if (b.state == CKEDITOR.TRISTATE_DISABLED) this.hide(1);
							else if (b.getItems) this._.showSubMenu(a);
							else this._.onClick(b)
						}, this)
					}
					a(f);
					for (var r = g.elementPath(), r = ['\x3cdiv class\x3d"cke_menu' + (r && r.direction() != g.lang.dir ? " cke_mixed_dir_content" : "") + '" role\x3d"presentation"\x3e'], x = f.length, v = x && f[0].group, u = 0; u < x; u++) {
						var t = f[u];
						v != t.group && (r.push('\x3cdiv class\x3d"cke_menuseparator" role\x3d"separator"\x3e\x3c/div\x3e'), v = t.group);
						t.render(this, u, r)
					}
					r.push("\x3c/div\x3e");
					p.setHtml(r.join(""));
					CKEDITOR.ui.fire("ready", this);
					this.parent ? this.parent._.panel.showAsChild(n, this.id, b, c, d, e) : n.showBlock(this.id, b, c, d, e);
					g.fire("menuShow", [n])
				},
				addListener: function(a) {
					this._.listeners.push(a)
				},
				hide: function(a) {
					this._.onHide && this._.onHide();
					this._.panel && this._.panel.hide(a)
				}
			}
		});
		CKEDITOR.menuItem = CKEDITOR.tools.createClass({
			$: function(a, b, c) {
				CKEDITOR.tools.extend(this, c, {
					order: 0,
					className: "cke_menubutton__" + b
				});
				this.group = a._.menuGroups[this.group];
				this.editor = a;
				this.name = b
			},
			proto: {
				render: function(a, f, d) {
					var h = a.id + String(f),
						m = "undefined" == typeof this.state ? CKEDITOR.TRISTATE_OFF : this.state,
						g = "",
						n = this.editor,
						p, r, x = m == CKEDITOR.TRISTATE_ON ? "on" : m == CKEDITOR.TRISTATE_DISABLED ? "disabled" : "off";
					this.role in {
						menuitemcheckbox: 1,
						menuitemradio: 1
					} && (g = ' aria-checked\x3d"' + (m == CKEDITOR.TRISTATE_ON ? "true" : "false") + '"');
					var v = this.getItems,
						u = "\x26#" + ("rtl" == this.editor.lang.dir ? "9668" : "9658") + ";",
						t = this.name;
					this.icon && !/\./.test(this.icon) && (t = this.icon);
					this.command && (p = n.getCommand(this.command), (p = n.getCommandKeystroke(p)) && (r = CKEDITOR.tools.keystrokeToString(n.lang.common.keyboard, p)));
					a = {
						id: h,
						name: this.name,
						iconName: t,
						label: this.label,
						cls: this.className || "",
						state: x,
						hasPopup: v ? "true" : "false",
						disabled: m == CKEDITOR.TRISTATE_DISABLED,
						title: this.label + (r ? " (" + r.display + ")" : ""),
						ariaShortcut: r ? n.lang.common.keyboardShortcut + " " + r.aria : "",
						href: "javascript:void('" + (this.label || "").replace("'") + "')",
						hoverFn: a._.itemOverFn,
						moveOutFn: a._.itemOutFn,
						clickFn: a._.itemClickFn,
						index: f,
						iconStyle: CKEDITOR.skin.getIconStyle(t, "rtl" == this.editor.lang.dir, t == this.icon ? null : this.icon, this.iconOffset),
						shortcutHtml: r ? e.output({
							shortcut: r.display
						}) : "",
						arrowHtml: v ? c.output({
							label: u
						}) : "",
						role: this.role ? this.role : "menuitem",
						ariaChecked: g
					};
					b.output(a, d)
				}
			}
		})
	}(), CKEDITOR.config.menu_groups = "clipboard,form,tablecell,tablecellproperties,tablerow,tablecolumn,table,anchor,link,image,flash,checkbox,radio,textfield,hiddenfield,imagebutton,button,select,textarea,div", CKEDITOR.plugins.add("contextmenu", {
		requires: "menu",
		onLoad: function() {
			CKEDITOR.plugins.contextMenu = CKEDITOR.tools.createClass({
				base: CKEDITOR.menu,
				$: function(a) {
					this.base.call(this, a, {
						panel: {
							className: "cke_menu_panel",
							attributes: {
								"aria-label": a.lang.contextmenu.options
							}
						}
					})
				},
				proto: {
					addTarget: function(a, f) {
						a.on("contextmenu", function(a) {
							a = a.data;
							var c = CKEDITOR.env.webkit ? b : CKEDITOR.env.mac ? a.$.metaKey : a.$.ctrlKey;
							if (!f || !c) {
								a.preventDefault();
								if (CKEDITOR.env.mac && CKEDITOR.env.webkit) {
									var c = this.editor,
										k = (new CKEDITOR.dom.elementPath(a.getTarget(), c.editable())).contains(function(a) {
											return a.hasAttribute("contenteditable")
										}, !0);
									k && "false" == k.getAttribute("contenteditable") && c.getSelection().fake(k)
								}
								var k = a.getTarget().getDocument(),
									d = a.getTarget().getDocument().getDocumentElement(),
									c = !k.equals(CKEDITOR.document),
									k = k.getWindow().getScrollPosition(),
									h = c ? a.$.clientX : a.$.pageX || k.x + a.$.clientX,
									m = c ? a.$.clientY : a.$.pageY || k.y + a.$.clientY;
								CKEDITOR.tools.setTimeout(function() {
									this.open(d, null, h, m)
								}, CKEDITOR.env.ie ? 200 : 0, this)
							}
						}, this);
						if (CKEDITOR.env.webkit) {
							var b, c = function() {
								b = 0
							};
							a.on("keydown", function(a) {
								b = CKEDITOR.env.mac ? a.data.$.metaKey : a.data.$.ctrlKey
							});
							a.on("keyup", c);
							a.on("contextmenu", c)
						}
					},
					open: function(a, f, b, c) {
						!1 !== this.editor.config.enableContextMenu && (this.editor.focus(), a = a || CKEDITOR.document.getDocumentElement(), this.editor.selectionChange(1), this.show(a, f, b, c))
					}
				}
			})
		},
		beforeInit: function(a) {
			var f = a.contextMenu = new CKEDITOR.plugins.contextMenu(a);
			a.on("contentDom", function() {
				f.addTarget(a.editable(), !1 !== a.config.browserContextMenuOnCtrl)
			});
			a.addCommand("contextMenu", {
				exec: function() {
					a.contextMenu.open(a.document.getBody())
				}
			});
			a.setKeystroke(CKEDITOR.SHIFT + 121, "contextMenu");
			a.setKeystroke(CKEDITOR.CTRL + CKEDITOR.SHIFT + 121, "contextMenu")
		}
	}), function() {
		function a(a, b) {
			function k(b) {
				b = g.list[b];
				var c;
				b.equals(a.editable()) || "true" == b.getAttribute("contenteditable") ? (c = a.createRange(), c.selectNodeContents(b), c = c.select()) : (c = a.getSelection(), c.selectElement(b));
				CKEDITOR.env.ie && a.fire("selectionChange", {
					selection: c,
					path: new CKEDITOR.dom.elementPath(b)
				});
				a.focus()
			}

			function d() {
				m && m.setHtml('\x3cspan class\x3d"cke_path_empty"\x3e\x26nbsp;\x3c/span\x3e');
				delete g.list
			}
			var h = a.ui.spaceId("path"),
				m, g = a._.elementsPath,
				n = g.idBase;
			b.html += '\x3cspan id\x3d"' + h + '_label" class\x3d"cke_voice_label"\x3e' + a.lang.elementspath.eleLabel + '\x3c/span\x3e\x3cspan id\x3d"' + h + '" class\x3d"cke_path" role\x3d"group" aria-labelledby\x3d"' + h + '_label"\x3e\x3cspan class\x3d"cke_path_empty"\x3e\x26nbsp;\x3c/span\x3e\x3c/span\x3e';
			a.on("uiReady", function() {
				var b = a.ui.space("path");
				b && a.focusManager.add(b, 1)
			});
			g.onClick = k;
			var p = CKEDITOR.tools.addFunction(k),
				r = CKEDITOR.tools.addFunction(function(b, c) {
					var d = g.idBase,
						f;
					c = new CKEDITOR.dom.event(c);
					f = "rtl" == a.lang.dir;
					switch (c.getKeystroke()) {
						case f ? 39:
							37:
								case 9:
							return (f = CKEDITOR.document.getById(d + (b + 1))) || (f = CKEDITOR.document.getById(d + "0")), f.focus(), !1;
						case f ? 37:
							39:
								case CKEDITOR.SHIFT + 9:
							return (f = CKEDITOR.document.getById(d + (b - 1))) || (f = CKEDITOR.document.getById(d + (g.list.length - 1))), f.focus(), !1;
						case 27:
							return a.focus(), !1;
						case 13:
						case 32:
							return k(b), !1
					}
					return !0
				});
			a.on("selectionChange", function() {
				for (var b = [], d = g.list = [], f = [], k = g.filters, l = !0, A = a.elementPath().elements, q, w = A.length; w--;) {
					var B = A[w],
						z = 0;
					q = B.data("cke-display-name") ? B.data("cke-display-name") : B.data("cke-real-element-type") ? B.data("cke-real-element-type") : B.getName();
					(l = B.hasAttribute("contenteditable") ? "true" == B.getAttribute("contenteditable") : l) || B.hasAttribute("contenteditable") || (z = 1);
					for (var C = 0; C < k.length; C++) {
						var E = k[C](B, q);
						if (!1 === E) {
							z = 1;
							break
						}
						q = E || q
					}
					z || (d.unshift(B), f.unshift(q))
				}
				d = d.length;
				for (k = 0; k < d; k++) q = f[k], l = a.lang.elementspath.eleTitle.replace(/%1/, q), q = c.output({
					id: n + k,
					label: l,
					text: q,
					jsTitle: "javascript:void('" + q + "')",
					index: k,
					keyDownFn: r,
					clickFn: p
				}), b.unshift(q);
				m || (m = CKEDITOR.document.getById(h));
				f = m;
				f.setHtml(b.join("") + '\x3cspan class\x3d"cke_path_empty"\x3e\x26nbsp;\x3c/span\x3e');
				a.fire("elementsPathUpdate", {
					space: f
				})
			});
			a.on("readOnly", d);
			a.on("contentDomUnload", d);
			a.addCommand("elementsPathFocus", f.toolbarFocus);
			a.setKeystroke(CKEDITOR.ALT + 122, "elementsPathFocus")
		}
		var f = {
				toolbarFocus: {
					editorFocus: !1,
					readOnly: 1,
					exec: function(a) {
						(a = CKEDITOR.document.getById(a._.elementsPath.idBase + "0")) && a.focus(CKEDITOR.env.ie || CKEDITOR.env.air)
					}
				}
			},
			b = "";
		CKEDITOR.env.gecko && CKEDITOR.env.mac && (b += ' onkeypress\x3d"return false;"');
		CKEDITOR.env.gecko && (b += ' onblur\x3d"this.style.cssText \x3d this.style.cssText;"');
		var c = CKEDITOR.addTemplate("pathItem", '\x3ca id\x3d"{id}" href\x3d"{jsTitle}" tabindex\x3d"-1" class\x3d"cke_path_item" title\x3d"{label}"' + b + ' hidefocus\x3d"true"  onkeydown\x3d"return CKEDITOR.tools.callFunction({keyDownFn},{index}, event );" onclick\x3d"CKEDITOR.tools.callFunction({clickFn},{index}); return false;" role\x3d"button" aria-label\x3d"{label}"\x3e{text}\x3c/a\x3e');
		CKEDITOR.plugins.add("elementspath", {
			init: function(b) {
				b._.elementsPath = {
					idBase: "cke_elementspath_" + CKEDITOR.tools.getNextNumber() + "_",
					filters: []
				};
				b.on("uiSpace", function(c) {
					"bottom" == c.data.space && a(b, c.data)
				})
			}
		})
	}(), function() {
		function a(a, e) {
			var l, k;
			e.on("refresh", function(a) {
				var c = [f],
					e;
				for (e in a.data.states) c.push(a.data.states[e]);
				this.setState(CKEDITOR.tools.search(c, b) ? b : f)
			}, e, null, 100);
			e.on("exec", function(b) {
				l = a.getSelection();
				k = l.createBookmarks(1);
				b.data || (b.data = {});
				b.data.done = !1
			}, e, null, 0);
			e.on("exec", function() {
				a.forceNextSelectionCheck();
				l.selectBookmarks(k)
			}, e, null, 100)
		}
		var f = CKEDITOR.TRISTATE_DISABLED,
			b = CKEDITOR.TRISTATE_OFF;
		CKEDITOR.plugins.add("indent", {
			init: function(b) {
				var e = CKEDITOR.plugins.indent.genericDefinition;
				a(b, b.addCommand("indent", new e(!0)));
				a(b, b.addCommand("outdent", new e));
				b.ui.addButton && (b.ui.addButton("Indent", {
					label: b.lang.indent.indent,
					command: "indent",
					directional: !0,
					toolbar: "indent,20"
				}), b.ui.addButton("Outdent", {
					label: b.lang.indent.outdent,
					command: "outdent",
					directional: !0,
					toolbar: "indent,10"
				}));
				b.on("dirChanged", function(a) {
					var e = b.createRange(),
						d = a.data.node;
					e.setStartBefore(d);
					e.setEndAfter(d);
					for (var f = new CKEDITOR.dom.walker(e), m; m = f.next();)
						if (m.type == CKEDITOR.NODE_ELEMENT)
							if (!m.equals(d) && m.getDirection()) e.setStartAfter(m),
								f = new CKEDITOR.dom.walker(e);
							else {
								var g = b.config.indentClasses;
								if (g)
									for (var n = "ltr" == a.data.dir ? ["_rtl", ""] : ["", "_rtl"], p = 0; p < g.length; p++) m.hasClass(g[p] + n[0]) && (m.removeClass(g[p] + n[0]), m.addClass(g[p] + n[1]));
								g = m.getStyle("margin-right");
								n = m.getStyle("margin-left");
								g ? m.setStyle("margin-left", g) : m.removeStyle("margin-left");
								n ? m.setStyle("margin-right", n) : m.removeStyle("margin-right")
							}
				})
			}
		});
		CKEDITOR.plugins.indent = {
			genericDefinition: function(a) {
				this.isIndent = !!a;
				this.startDisabled = !this.isIndent
			},
			specificDefinition: function(a, b, f) {
				this.name = b;
				this.editor = a;
				this.jobs = {};
				this.enterBr = a.config.enterMode == CKEDITOR.ENTER_BR;
				this.isIndent = !!f;
				this.relatedGlobal = f ? "indent" : "outdent";
				this.indentKey = f ? 9 : CKEDITOR.SHIFT + 9;
				this.database = {}
			},
			registerCommands: function(a, b) {
				a.on("pluginsLoaded", function() {
					for (var a in b)(function(a, b) {
						var c = a.getCommand(b.relatedGlobal),
							e;
						for (e in b.jobs) c.on("exec", function(c) {
							c.data.done || (a.fire("lockSnapshot"), b.execJob(a, e) && (c.data.done = !0), a.fire("unlockSnapshot"), CKEDITOR.dom.element.clearAllMarkers(b.database))
						}, this, null, e), c.on("refresh", function(c) {
							c.data.states || (c.data.states = {});
							c.data.states[b.name + "@" + e] = b.refreshJob(a, e, c.data.path)
						}, this, null, e);
						a.addFeature(b)
					})(this, b[a])
				})
			}
		};
		CKEDITOR.plugins.indent.genericDefinition.prototype = {
			context: "p",
			exec: function() {}
		};
		CKEDITOR.plugins.indent.specificDefinition.prototype = {
			execJob: function(a, b) {
				var l = this.jobs[b];
				if (l.state != f) return l.exec.call(this, a)
			},
			refreshJob: function(a, b, l) {
				b = this.jobs[b];
				a.activeFilter.checkFeature(this) ? b.state = b.refresh.call(this, a, l) : b.state = f;
				return b.state
			},
			getContext: function(a) {
				return a.contains(this.context)
			}
		}
	}(), function() {
		function a(a) {
			function c(f) {
				for (var h = r.startContainer, l = r.endContainer; h && !h.getParent().equals(f);) h = h.getParent();
				for (; l && !l.getParent().equals(f);) l = l.getParent();
				if (!h || !l) return !1;
				for (var A = h, h = [], q = !1; !q;) A.equals(l) && (q = !0), h.push(A), A = A.getNext();
				if (1 > h.length) return !1;
				A = f.getParents(!0);
				for (l = 0; l < A.length; l++)
					if (A[l].getName && k[A[l].getName()]) {
						f = A[l];
						break
					}
				for (var A = e.isIndent ? 1 : -1, l = h[0], h = h[h.length - 1], q = CKEDITOR.plugins.list.listToArray(f, g), w = q[h.getCustomData("listarray_index")].indent, l = l.getCustomData("listarray_index"); l <= h.getCustomData("listarray_index"); l++)
					if (q[l].indent += A, 0 < A) {
						var v = q[l].parent;
						q[l].parent = new CKEDITOR.dom.element(v.getName(), v.getDocument())
					}
				for (l = h.getCustomData("listarray_index") + 1; l < q.length && q[l].indent > w; l++) q[l].indent += A;
				h = CKEDITOR.plugins.list.arrayToList(q, g, null, a.config.enterMode, f.getDirection());
				if (!e.isIndent) {
					var z;
					if ((z = f.getParent()) && z.is("li"))
						for (var A = h.listNode.getChildren(), p = [], x, l = A.count() - 1; 0 <= l; l--)(x = A.getItem(l)) && x.is && x.is("li") && p.push(x)
				}
				h && h.listNode.replace(f);
				if (p && p.length)
					for (l = 0; l < p.length; l++) {
						for (x = f = p[l];
							(x = x.getNext()) && x.is && x.getName() in k;) CKEDITOR.env.needsNbspFiller && !f.getFirst(b) && f.append(r.document.createText(" ")), f.append(x);
						f.insertAfter(z)
					}
				h && a.fire("contentDomInvalidated");
				return !0
			}
			for (var e = this, g = this.database, k = this.context, l = a.getSelection(), l = (l && l.getRanges()).createIterator(),
					r; r = l.getNextRange();) {
				for (var x = r.getCommonAncestor(); x && (x.type != CKEDITOR.NODE_ELEMENT || !k[x.getName()]);) {
					if (a.editable().equals(x)) {
						x = !1;
						break
					}
					x = x.getParent()
				}
				x || (x = r.startPath().contains(k)) && r.setEndAt(x, CKEDITOR.POSITION_BEFORE_END);
				if (!x) {
					var v = r.getEnclosedNode();
					v && v.type == CKEDITOR.NODE_ELEMENT && v.getName() in k && (r.setStartAt(v, CKEDITOR.POSITION_AFTER_START), r.setEndAt(v, CKEDITOR.POSITION_BEFORE_END), x = v)
				}
				x && r.startContainer.type == CKEDITOR.NODE_ELEMENT && r.startContainer.getName() in k && (v = new CKEDITOR.dom.walker(r), v.evaluator = f, r.startContainer = v.next());
				x && r.endContainer.type == CKEDITOR.NODE_ELEMENT && r.endContainer.getName() in k && (v = new CKEDITOR.dom.walker(r), v.evaluator = f, r.endContainer = v.previous());
				if (x) return c(x)
			}
			return 0
		}

		function f(a) {
			return a.type == CKEDITOR.NODE_ELEMENT && a.is("li")
		}

		function b(a) {
			return c(a) && e(a)
		}
		var c = CKEDITOR.dom.walker.whitespaces(!0),
			e = CKEDITOR.dom.walker.bookmark(!1, !0),
			l = CKEDITOR.TRISTATE_DISABLED,
			k = CKEDITOR.TRISTATE_OFF;
		CKEDITOR.plugins.add("indentlist", {
			requires: "indent",
			init: function(b) {
				function c(b) {
					e.specificDefinition.apply(this, arguments);
					this.requiredContent = ["ul", "ol"];
					b.on("key", function(a) {
						if ("wysiwyg" == b.mode && a.data.keyCode == this.indentKey) {
							var c = this.getContext(b.elementPath());
							!c || this.isIndent && CKEDITOR.plugins.indentList.firstItemInPath(this.context, b.elementPath(), c) || (b.execCommand(this.relatedGlobal), a.cancel())
						}
					}, this);
					this.jobs[this.isIndent ? 10 : 30] = {
						refresh: this.isIndent ? function(a, b) {
							var c = this.getContext(b),
								d = CKEDITOR.plugins.indentList.firstItemInPath(this.context, b, c);
							return c && this.isIndent && !d ? k : l
						} : function(a, b) {
							return !this.getContext(b) || this.isIndent ? l : k
						},
						exec: CKEDITOR.tools.bind(a, this)
					}
				}
				var e = CKEDITOR.plugins.indent;
				e.registerCommands(b, {
					indentlist: new c(b, "indentlist", !0),
					outdentlist: new c(b, "outdentlist")
				});
				CKEDITOR.tools.extend(c.prototype, e.specificDefinition.prototype, {
					context: {
						ol: 1,
						ul: 1
					}
				})
			}
		});
		CKEDITOR.plugins.indentList = {};
		CKEDITOR.plugins.indentList.firstItemInPath = function(a, b, c) {
			var e = b.contains(f);
			c || (c = b.contains(a));
			return c && e && e.equals(c.getFirst(f))
		}
	}(), function() {
		function a(a, b, c) {
			function d(c) {
				if (!(!(l = k[c ? "getFirst" : "getLast"]()) || l.is && l.isBlockBoundary() || !(m = b.root[c ? "getPrevious" : "getNext"](CKEDITOR.dom.walker.invisible(!0))) || m.is && m.isBlockBoundary({
						br: 1
					}))) a.document.createElement("br")[c ? "insertBefore" : "insertAfter"](l)
			}
			for (var e = CKEDITOR.plugins.list.listToArray(b.root, c), f = [], g = 0; g < b.contents.length; g++) {
				var h = b.contents[g];
				(h = h.getAscendant("li", !0)) && !h.getCustomData("list_item_processed") && (f.push(h), CKEDITOR.dom.element.setMarker(c, h, "list_item_processed", !0))
			}
			h = null;
			for (g = 0; g < f.length; g++) h = f[g].getCustomData("listarray_index"), e[h].indent = -1;
			for (g = h + 1; g < e.length; g++)
				if (e[g].indent > e[g - 1].indent + 1) {
					f = e[g - 1].indent + 1 - e[g].indent;
					for (h = e[g].indent; e[g] && e[g].indent >= h;) e[g].indent += f, g++;
					g--
				}
			var k = CKEDITOR.plugins.list.arrayToList(e, c, null, a.config.enterMode, b.root.getAttribute("dir")).listNode,
				l, m;
			d(!0);
			d();
			k.replace(b.root);
			a.fire("contentDomInvalidated")
		}

		function f(a, b) {
			this.name = a;
			this.context = this.type = b;
			this.allowedContent = b + " li";
			this.requiredContent = b
		}

		function b(a, b, c, d) {
			for (var e, f; e = a[d ? "getLast" : "getFirst"](r);)(f = e.getDirection(1)) !== b.getDirection(1) && e.setAttribute("dir", f), e.remove(), c ? e[d ? "insertBefore" : "insertAfter"](c) : b.append(e, d)
		}

		function c(a) {
			function c(d) {
				var e = a[d ? "getPrevious" : "getNext"](g);
				e && e.type == CKEDITOR.NODE_ELEMENT && e.is(a.getName()) && (b(a, e, null, !d), a.remove(), a = e)
			}
			c();
			c(1)
		}

		function e(a) {
			return a.type == CKEDITOR.NODE_ELEMENT && (a.getName() in CKEDITOR.dtd.$block || a.getName() in CKEDITOR.dtd.$listItem) && CKEDITOR.dtd[a.getName()]["#"]
		}

		function l(a, d, e) {
			a.fire("saveSnapshot");
			e.enlarge(CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS);
			var f = e.extractContents();
			d.trim(!1, !0);
			var h = d.createBookmark(),
				l = new CKEDITOR.dom.elementPath(d.startContainer),
				m = l.block,
				l = l.lastElement.getAscendant("li", 1) || m,
				w = new CKEDITOR.dom.elementPath(e.startContainer),
				B = w.contains(CKEDITOR.dtd.$listItem),
				w = w.contains(CKEDITOR.dtd.$list);
			m ? (m = m.getBogus()) && m.remove() : w && (m = w.getPrevious(g)) && n(m) && m.remove();
			(m = f.getLast()) && m.type == CKEDITOR.NODE_ELEMENT && m.is("br") && m.remove();
			(m = d.startContainer.getChild(d.startOffset)) ? f.insertBefore(m): d.startContainer.append(f);
			B && (f = k(B)) && (l.contains(B) ? (b(f, B.getParent(), B), f.remove()) : l.append(f));
			for (; e.checkStartOfBlock() && e.checkEndOfBlock();) {
				w = e.startPath();
				f = w.block;
				if (!f) break;
				f.is("li") && (l = f.getParent(), f.equals(l.getLast(g)) && f.equals(l.getFirst(g)) && (f = l));
				e.moveToPosition(f, CKEDITOR.POSITION_BEFORE_START);
				f.remove()
			}
			e = e.clone();
			f = a.editable();
			e.setEndAt(f, CKEDITOR.POSITION_BEFORE_END);
			e = new CKEDITOR.dom.walker(e);
			e.evaluator = function(a) {
				return g(a) && !n(a)
			};
			(e = e.next()) && e.type == CKEDITOR.NODE_ELEMENT && e.getName() in CKEDITOR.dtd.$list && c(e);
			d.moveToBookmark(h);
			d.select();
			a.fire("saveSnapshot")
		}

		function k(a) {
			return (a = a.getLast(g)) && a.type == CKEDITOR.NODE_ELEMENT && a.getName() in d ? a : null
		}
		var d = {
				ol: 1,
				ul: 1
			},
			h = CKEDITOR.dom.walker.whitespaces(),
			m = CKEDITOR.dom.walker.bookmark(),
			g = function(a) {
				return !(h(a) || m(a))
			},
			n = CKEDITOR.dom.walker.bogus();
		CKEDITOR.plugins.list = {
			listToArray: function(a, b, c, e, f) {
				if (!d[a.getName()]) return [];
				e || (e = 0);
				c || (c = []);
				for (var g = 0, h = a.getChildCount(); g < h; g++) {
					var k = a.getChild(g);
					k.type == CKEDITOR.NODE_ELEMENT && k.getName() in CKEDITOR.dtd.$list && CKEDITOR.plugins.list.listToArray(k, b, c, e + 1);
					if ("li" == k.$.nodeName.toLowerCase()) {
						var l = {
							parent: a,
							indent: e,
							element: k,
							contents: []
						};
						f ? l.grandparent = f : (l.grandparent = a.getParent(), l.grandparent && "li" == l.grandparent.$.nodeName.toLowerCase() && (l.grandparent = l.grandparent.getParent()));
						b && CKEDITOR.dom.element.setMarker(b, k, "listarray_index", c.length);
						c.push(l);
						for (var m = 0, n = k.getChildCount(), p; m < n; m++) p = k.getChild(m), p.type == CKEDITOR.NODE_ELEMENT && d[p.getName()] ? CKEDITOR.plugins.list.listToArray(p, b, c, e + 1, l.grandparent) : l.contents.push(p)
					}
				}
				return c
			},
			arrayToList: function(a, b, c, e, f) {
				c || (c = 0);
				if (!a || a.length < c + 1) return null;
				for (var h, k = a[c].parent.getDocument(), l = new CKEDITOR.dom.documentFragment(k), n = null, p = c, C = Math.max(a[c].indent, 0), r = null, G, F, J = e == CKEDITOR.ENTER_P ? "p" : "div";;) {
					var H = a[p];
					h = H.grandparent;
					G = H.element.getDirection(1);
					if (H.indent == C) {
						n && a[p].parent.getName() == n.getName() || (n = a[p].parent.clone(!1, 1), f && n.setAttribute("dir", f), l.append(n));
						r = n.append(H.element.clone(0, 1));
						G != n.getDirection(1) && r.setAttribute("dir", G);
						for (h = 0; h < H.contents.length; h++) r.append(H.contents[h].clone(1, 1));
						p++
					} else if (H.indent == Math.max(C, 0) + 1) H = a[p - 1].element.getDirection(1), p = CKEDITOR.plugins.list.arrayToList(a, null, p, e, H != G ? G : null), !r.getChildCount() && CKEDITOR.env.needsNbspFiller && 7 >= k.$.documentMode && r.append(k.createText(" ")), r.append(p.listNode), p = p.nextIndex;
					else if (-1 == H.indent && !c && h) {
						d[h.getName()] ? (r = H.element.clone(!1, !0), G != h.getDirection(1) && r.setAttribute("dir", G)) : r = new CKEDITOR.dom.documentFragment(k);
						var n = h.getDirection(1) != G,
							M = H.element,
							L = M.getAttribute("class"),
							D = M.getAttribute("style"),
							T = r.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT && (e != CKEDITOR.ENTER_BR || n || D || L),
							I, O = H.contents.length,
							K;
						for (h = 0; h < O; h++)
							if (I = H.contents[h], m(I) && 1 < O) T ? K = I.clone(1, 1) : r.append(I.clone(1, 1));
							else if (I.type == CKEDITOR.NODE_ELEMENT && I.isBlockBoundary()) {
							n && !I.getDirection() && I.setAttribute("dir", G);
							F = I;
							var U = M.getAttribute("style");
							U && F.setAttribute("style", U.replace(/([^;])$/, "$1;") + (F.getAttribute("style") || ""));
							L && I.addClass(L);
							F = null;
							K && (r.append(K), K = null);
							r.append(I.clone(1, 1))
						} else T ? (F || (F = k.createElement(J), r.append(F), n && F.setAttribute("dir", G)), D && F.setAttribute("style", D), L && F.setAttribute("class", L), K && (F.append(K), K = null), F.append(I.clone(1, 1))) : r.append(I.clone(1, 1));
						K && ((F || r).append(K), K = null);
						r.type == CKEDITOR.NODE_DOCUMENT_FRAGMENT && p != a.length - 1 && (CKEDITOR.env.needsBrFiller && (G = r.getLast()) && G.type == CKEDITOR.NODE_ELEMENT && G.is("br") && G.remove(), (G = r.getLast(g)) && G.type == CKEDITOR.NODE_ELEMENT && G.is(CKEDITOR.dtd.$block) || r.append(k.createElement("br")));
						G = r.$.nodeName.toLowerCase();
						"div" != G && "p" != G || r.appendBogus();
						l.append(r);
						n = null;
						p++
					} else return null;
					F = null;
					if (a.length <= p || Math.max(a[p].indent, 0) < C) break
				}
				if (b)
					for (a = l.getFirst(); a;) {
						if (a.type == CKEDITOR.NODE_ELEMENT && (CKEDITOR.dom.element.clearMarkers(b, a), a.getName() in CKEDITOR.dtd.$listItem && (c = a, k = f = e = void 0, e = c.getDirection()))) {
							for (f = c.getParent(); f && !(k = f.getDirection());) f = f.getParent();
							e == k && c.removeAttribute("dir")
						}
						a = a.getNextSourceNode()
					}
				return {
					listNode: l,
					nextIndex: p
				}
			}
		};
		var p = /^h[1-6]$/,
			r = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_ELEMENT);
		f.prototype = {
			exec: function(b) {
				this.refresh(b, b.elementPath());
				var e = b.config,
					f = b.getSelection(),
					h = f && f.getRanges();
				if (this.state == CKEDITOR.TRISTATE_OFF) {
					var k = b.editable();
					if (k.getFirst(g)) {
						var l = 1 == h.length && h[0];
						(e = l && l.getEnclosedNode()) && e.is && this.type == e.getName() && this.setState(CKEDITOR.TRISTATE_ON)
					} else e.enterMode == CKEDITOR.ENTER_BR ? k.appendBogus() : h[0].fixBlock(1, e.enterMode == CKEDITOR.ENTER_P ? "p" : "div"), f.selectRanges(h)
				}
				for (var e = f.createBookmarks(!0), k = [], m = {}, h = h.createIterator(), n = 0;
					(l = h.getNextRange()) && ++n;) {
					var B = l.getBoundaryNodes(),
						z = B.startNode,
						r = B.endNode;
					z.type == CKEDITOR.NODE_ELEMENT && "td" == z.getName() && l.setStartAt(B.startNode, CKEDITOR.POSITION_AFTER_START);
					r.type == CKEDITOR.NODE_ELEMENT && "td" == r.getName() && l.setEndAt(B.endNode, CKEDITOR.POSITION_BEFORE_END);
					l = l.createIterator();
					for (l.forceBrBreak = this.state == CKEDITOR.TRISTATE_OFF; B = l.getNextParagraph();)
						if (!B.getCustomData("list_block")) {
							CKEDITOR.dom.element.setMarker(m, B, "list_block", 1);
							for (var E = b.elementPath(B), z = E.elements, r = 0, E = E.blockLimit, G, F = z.length - 1; 0 <= F && (G = z[F]); F--)
								if (d[G.getName()] && E.contains(G)) {
									E.removeCustomData("list_group_object_" + n);
									(z = G.getCustomData("list_group_object")) ? z.contents.push(B): (z = {
										root: G,
										contents: [B]
									}, k.push(z), CKEDITOR.dom.element.setMarker(m, G, "list_group_object", z));
									r = 1;
									break
								}
							r || (r = E, r.getCustomData("list_group_object_" + n) ? r.getCustomData("list_group_object_" + n).contents.push(B) : (z = {
								root: r,
								contents: [B]
							}, CKEDITOR.dom.element.setMarker(m, r, "list_group_object_" + n, z), k.push(z)))
						}
				}
				for (G = []; 0 < k.length;)
					if (z = k.shift(), this.state == CKEDITOR.TRISTATE_OFF)
						if (d[z.root.getName()]) {
							h = b;
							n = z;
							z = m;
							l = G;
							r = CKEDITOR.plugins.list.listToArray(n.root, z);
							E = [];
							for (B = 0; B < n.contents.length; B++) F = n.contents[B], (F = F.getAscendant("li", !0)) && !F.getCustomData("list_item_processed") && (E.push(F), CKEDITOR.dom.element.setMarker(z, F, "list_item_processed", !0));
							for (var F = n.root.getDocument(), J = void 0, H = void 0, B = 0; B < E.length; B++) {
								var M = E[B].getCustomData("listarray_index"),
									J = r[M].parent;
								J.is(this.type) || (H = F.createElement(this.type), J.copyAttributes(H, {
									start: 1,
									type: 1
								}), H.removeStyle("list-style-type"), r[M].parent = H)
							}
							z = CKEDITOR.plugins.list.arrayToList(r, z, null, h.config.enterMode);
							r = void 0;
							E = z.listNode.getChildCount();
							for (B = 0; B < E && (r = z.listNode.getChild(B)); B++) r.getName() == this.type && l.push(r);
							z.listNode.replace(n.root);
							h.fire("contentDomInvalidated")
						} else {
							r = b;
							l = z;
							B = G;
							E = l.contents;
							h = l.root.getDocument();
							n = [];
							1 == E.length && E[0].equals(l.root) && (z = h.createElement("div"), E[0].moveChildren && E[0].moveChildren(z), E[0].append(z), E[0] = z);
							l = l.contents[0].getParent();
							for (F = 0; F < E.length; F++) l = l.getCommonAncestor(E[F].getParent());
							J = r.config.useComputedState;
							r = z = void 0;
							J = void 0 === J || J;
							for (F = 0; F < E.length; F++)
								for (H = E[F]; M = H.getParent();) {
									if (M.equals(l)) {
										n.push(H);
										!r && H.getDirection() && (r = 1);
										H = H.getDirection(J);
										null !== z && (z = z && z != H ? null : H);
										break
									}
									H = M
								}
							if (!(1 > n.length)) {
								E = n[n.length - 1].getNext();
								F = h.createElement(this.type);
								B.push(F);
								for (J = B = void 0; n.length;) B = n.shift(), J = h.createElement("li"), H = B, H.is("pre") || p.test(H.getName()) || "false" == H.getAttribute("contenteditable") ? B.appendTo(J) : (B.copyAttributes(J), z && B.getDirection() && (J.removeStyle("direction"), J.removeAttribute("dir")), B.moveChildren(J), B.remove()), J.appendTo(F);
								z && r && F.setAttribute("dir", z);
								E ? F.insertBefore(E) : F.appendTo(l)
							}
						}
				else this.state == CKEDITOR.TRISTATE_ON && d[z.root.getName()] && a.call(this, b, z, m);
				for (F = 0; F < G.length; F++) c(G[F]);
				CKEDITOR.dom.element.clearAllMarkers(m);
				f.selectBookmarks(e);
				b.focus()
			},
			refresh: function(a, b) {
				var c = b.contains(d, 1),
					e = b.blockLimit || b.root;
				c && e.contains(c) ? this.setState(c.is(this.type) ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF) : this.setState(CKEDITOR.TRISTATE_OFF)
			}
		};
		CKEDITOR.plugins.add("list", {
			requires: "indentlist",
			init: function(a) {
				a.blockless || (a.addCommand("numberedlist", new f("numberedlist", "ol")), a.addCommand("bulletedlist", new f("bulletedlist", "ul")), a.ui.addButton && (a.ui.addButton("NumberedList", {
					label: a.lang.list.numberedlist,
					command: "numberedlist",
					directional: !0,
					toolbar: "list,10"
				}), a.ui.addButton("BulletedList", {
					label: a.lang.list.bulletedlist,
					command: "bulletedlist",
					directional: !0,
					toolbar: "list,20"
				})), a.on("key", function(b) {
					var c = b.data.domEvent.getKey(),
						f;
					if ("wysiwyg" == a.mode && c in {
							8: 1,
							46: 1
						}) {
						var h = a.getSelection().getRanges()[0],
							m = h && h.startPath();
						if (h && h.collapsed) {
							var q = 8 == c,
								w = a.editable(),
								p = new CKEDITOR.dom.walker(h.clone());
							p.evaluator = function(a) {
								return g(a) && !n(a)
							};
							p.guard = function(a, b) {
								return !(b && a.type == CKEDITOR.NODE_ELEMENT && a.is("table"))
							};
							c = h.clone();
							if (q) {
								var z;
								(z = m.contains(d)) && h.checkBoundaryOfElement(z, CKEDITOR.START) && (z = z.getParent()) && z.is("li") && (z = k(z)) ? (f = z, z = z.getPrevious(g), c.moveToPosition(z && n(z) ? z : f, CKEDITOR.POSITION_BEFORE_START)) : (p.range.setStartAt(w, CKEDITOR.POSITION_AFTER_START), p.range.setEnd(h.startContainer, h.startOffset), (z = p.previous()) && z.type == CKEDITOR.NODE_ELEMENT && (z.getName() in d || z.is("li")) && (z.is("li") || (p.range.selectNodeContents(z), p.reset(), p.evaluator = e, z = p.previous()), f = z, c.moveToElementEditEnd(f), c.moveToPosition(c.endPath().block, CKEDITOR.POSITION_BEFORE_END)));
								if (f) l(a, c, h), b.cancel();
								else {
									var r = m.contains(d);
									r && h.checkBoundaryOfElement(r, CKEDITOR.START) && (f = r.getFirst(g), h.checkBoundaryOfElement(f, CKEDITOR.START) && (z = r.getPrevious(g), k(f) ? z && (h.moveToElementEditEnd(z), h.select()) : a.execCommand("outdent"), b.cancel()))
								}
							} else if (f = m.contains("li")) {
								if (p.range.setEndAt(w, CKEDITOR.POSITION_BEFORE_END), q = (w = f.getLast(g)) && e(w) ? w : f, m = 0, (z = p.next()) && z.type == CKEDITOR.NODE_ELEMENT && z.getName() in d && z.equals(w) ? (m = 1, z = p.next()) : h.checkBoundaryOfElement(q, CKEDITOR.END) && (m = 2), m && z) {
									h = h.clone();
									h.moveToElementEditStart(z);
									if (1 == m && (c.optimize(), !c.startContainer.equals(f))) {
										for (f = c.startContainer; f.is(CKEDITOR.dtd.$inline);) r = f, f = f.getParent();
										r && c.moveToPosition(r, CKEDITOR.POSITION_AFTER_END)
									}
									2 == m && (c.moveToPosition(c.endPath().block, CKEDITOR.POSITION_BEFORE_END), h.endPath().block && h.moveToPosition(h.endPath().block, CKEDITOR.POSITION_AFTER_START));
									l(a, c, h);
									b.cancel()
								}
							} else p.range.setEndAt(w, CKEDITOR.POSITION_BEFORE_END), (z = p.next()) && z.type == CKEDITOR.NODE_ELEMENT && z.is(d) && (z = z.getFirst(g), m.block && h.checkStartOfBlock() && h.checkEndOfBlock() ? (m.block.remove(), h.moveToElementEditStart(z), h.select()) : k(z) ? (h.moveToElementEditStart(z), h.select()) : (h = h.clone(), h.moveToElementEditStart(z), l(a, c, h)), b.cancel());
							setTimeout(function() {
								a.selectionChange(1)
							})
						}
					}
				}))
			}
		})
	}(), function() {
		function a(a, b, c) {
			c = a.config.forceEnterMode || c;
			"wysiwyg" == a.mode && (b || (b = a.activeEnterMode), a.elementPath().isContextFor("p") || (b = CKEDITOR.ENTER_BR, c = 1), a.fire("saveSnapshot"), b == CKEDITOR.ENTER_BR ? k(a, b, null, c) : d(a, b, null, c), a.fire("saveSnapshot"))
		}

		function f(a) {
			a = a.getSelection().getRanges(!0);
			for (var b = a.length - 1; 0 < b; b--) a[b].deleteContents();
			return a[0]
		}

		function b(a) {
			var b = a.startContainer.getAscendant(function(a) {
				return a.type == CKEDITOR.NODE_ELEMENT && "true" == a.getAttribute("contenteditable")
			}, !0);
			if (a.root.equals(b)) return a;
			b = new CKEDITOR.dom.range(b);
			b.moveToRange(a);
			return b
		}
		CKEDITOR.plugins.add("enterkey", {
			init: function(b) {
				b.addCommand("enter", {
					modes: {
						wysiwyg: 1
					},
					editorFocus: !1,
					exec: function(b) {
						a(b)
					}
				});
				b.addCommand("shiftEnter", {
					modes: {
						wysiwyg: 1
					},
					editorFocus: !1,
					exec: function(b) {
						a(b, b.activeShiftEnterMode, 1)
					}
				});
				b.setKeystroke([
					[13, "enter"],
					[CKEDITOR.SHIFT + 13, "shiftEnter"]
				])
			}
		});
		var c = CKEDITOR.dom.walker.whitespaces(),
			e = CKEDITOR.dom.walker.bookmark();
		CKEDITOR.plugins.enterkey = {
			enterBlock: function(a, d, l, p) {
				if (l = l || f(a)) {
					l = b(l);
					var r = l.document,
						x = l.checkStartOfBlock(),
						v = l.checkEndOfBlock(),
						u = a.elementPath(l.startContainer),
						t = u.block,
						y = d == CKEDITOR.ENTER_DIV ? "div" : "p",
						A;
					if (x && v) {
						if (t && (t.is("li") || t.getParent().is("li"))) {
							t.is("li") || (t = t.getParent());
							l = t.getParent();
							A = l.getParent();
							p = !t.hasPrevious();
							var q = !t.hasNext(),
								y = a.getSelection(),
								w = y.createBookmarks(),
								x = t.getDirection(1),
								v = t.getAttribute("class"),
								B = t.getAttribute("style"),
								z = A.getDirection(1) != x;
							a = a.enterMode != CKEDITOR.ENTER_BR || z || B || v;
							if (A.is("li")) p || q ? (p && q && l.remove(), t[q ? "insertAfter" : "insertBefore"](A)) : t.breakParent(A);
							else {
								if (a)
									if (u.block.is("li") ? (A = r.createElement(d == CKEDITOR.ENTER_P ? "p" : "div"), z && A.setAttribute("dir", x), B && A.setAttribute("style", B), v && A.setAttribute("class", v), t.moveChildren(A)) : A = u.block, p || q) A[p ? "insertBefore" : "insertAfter"](l);
									else t.breakParent(l), A.insertAfter(l);
								else if (t.appendBogus(!0), p || q)
									for (; r = t[p ? "getFirst" : "getLast"]();) r[p ? "insertBefore" : "insertAfter"](l);
								else
									for (t.breakParent(l); r = t.getLast();) r.insertAfter(l);
								t.remove()
							}
							y.selectBookmarks(w);
							return
						}
						if (t && t.getParent().is("blockquote")) {
							t.breakParent(t.getParent());
							t.getPrevious().getFirst(CKEDITOR.dom.walker.invisible(1)) || t.getPrevious().remove();
							t.getNext().getFirst(CKEDITOR.dom.walker.invisible(1)) || t.getNext().remove();
							l.moveToElementEditStart(t);
							l.select();
							return
						}
					} else if (t && t.is("pre") && !v) {
						k(a, d, l, p);
						return
					}
					if (x = l.splitBlock(y)) {
						d = x.previousBlock;
						t = x.nextBlock;
						u = x.wasStartOfBlock;
						a = x.wasEndOfBlock;
						t ? (w = t.getParent(), w.is("li") && (t.breakParent(w), t.move(t.getNext(), 1))) : d && (w = d.getParent()) && w.is("li") && (d.breakParent(w), w = d.getNext(), l.moveToElementEditStart(w), d.move(d.getPrevious()));
						if (u || a) {
							if (d) {
								if (d.is("li") || !h.test(d.getName()) && !d.is("pre")) A = d.clone()
							} else t && (A = t.clone());
							A ? p && !A.is("li") && A.renameNode(y) : w && w.is("li") ? A = w : (A = r.createElement(y), d && (q = d.getDirection()) && A.setAttribute("dir", q));
							if (r = x.elementPath)
								for (p = 0, y = r.elements.length; p < y; p++) {
									w = r.elements[p];
									if (w.equals(r.block) || w.equals(r.blockLimit)) break;
									CKEDITOR.dtd.$removeEmpty[w.getName()] && (w = w.clone(), A.moveChildren(w), A.append(w))
								}
							A.appendBogus();
							A.getParent() || l.insertNode(A);
							A.is("li") && A.removeAttribute("value");
							!CKEDITOR.env.ie || !u || a && d.getChildCount() || (l.moveToElementEditStart(a ? d : A), l.select());
							l.moveToElementEditStart(u && !a ? t : A)
						} else t.is("li") && (A = l.clone(), A.selectNodeContents(t), A = new CKEDITOR.dom.walker(A), A.evaluator = function(a) {
							return !(e(a) || c(a) || a.type == CKEDITOR.NODE_ELEMENT && a.getName() in CKEDITOR.dtd.$inline && !(a.getName() in CKEDITOR.dtd.$empty))
						}, (w = A.next()) && w.type == CKEDITOR.NODE_ELEMENT && w.is("ul", "ol") && (CKEDITOR.env.needsBrFiller ? r.createElement("br") : r.createText(" ")).insertBefore(w)), t && l.moveToElementEditStart(t);
						l.select();
						l.scrollIntoView()
					}
				}
			},
			enterBr: function(a, b, c, e) {
				if (c = c || f(a)) {
					var k = c.document,
						l = c.checkEndOfBlock(),
						v = new CKEDITOR.dom.elementPath(a.getSelection().getStartElement()),
						u = v.block,
						t = u && v.block.getName();
					e || "li" != t ? (!e && l && h.test(t) ? (l = u.getDirection()) ? (k = k.createElement("div"), k.setAttribute("dir", l), k.insertAfter(u), c.setStart(k, 0)) : (k.createElement("br").insertAfter(u), CKEDITOR.env.gecko && k.createText("").insertAfter(u), c.setStartAt(u.getNext(), CKEDITOR.env.ie ? CKEDITOR.POSITION_BEFORE_START : CKEDITOR.POSITION_AFTER_START)) : (a = "pre" == t && CKEDITOR.env.ie && 8 > CKEDITOR.env.version ? k.createText("\r") : k.createElement("br"), c.deleteContents(), c.insertNode(a), CKEDITOR.env.needsBrFiller ? (k.createText("﻿").insertAfter(a), l && (u || v.blockLimit).appendBogus(), a.getNext().$.nodeValue = "", c.setStartAt(a.getNext(), CKEDITOR.POSITION_AFTER_START)) : c.setStartAt(a, CKEDITOR.POSITION_AFTER_END)), c.collapse(!0), c.select(), c.scrollIntoView()) : d(a, b, c, e)
				}
			}
		};
		var l = CKEDITOR.plugins.enterkey,
			k = l.enterBr,
			d = l.enterBlock,
			h = /^h[1-6]$/
	}(), function() {
		function a(a, b) {
			var c = {},
				e = [],
				l = {
					nbsp: " ",
					shy: "­",
					gt: "\x3e",
					lt: "\x3c",
					amp: "\x26",
					apos: "'",
					quot: '"'
				};
			a = a.replace(/\b(nbsp|shy|gt|lt|amp|apos|quot)(?:,|$)/g, function(a, d) {
				var f = b ? "\x26" + d + ";" : l[d];
				c[f] = b ? l[d] : "\x26" + d + ";";
				e.push(f);
				return ""
			});
			if (!b && a) {
				a = a.split(",");
				var k = document.createElement("div"),
					d;
				k.innerHTML = "\x26" + a.join(";\x26") + ";";
				d = k.innerHTML;
				k = null;
				for (k = 0; k < d.length; k++) {
					var h = d.charAt(k);
					c[h] = "\x26" + a[k] + ";";
					e.push(h)
				}
			}
			c.regex = e.join(b ? "|" : "");
			return c
		}
		CKEDITOR.plugins.add("entities", {
			afterInit: function(f) {
				function b(a) {
					return h[a]
				}

				function c(a) {
					return "force" != e.entities_processNumerical && k[a] ? k[a] : "\x26#" + a.charCodeAt(0) + ";"
				}
				var e = f.config;
				if (f = (f = f.dataProcessor) && f.htmlFilter) {
					var l = [];
					!1 !== e.basicEntities && l.push("nbsp,gt,lt,amp");
					e.entities && (l.length && l.push("quot,iexcl,cent,pound,curren,yen,brvbar,sect,uml,copy,ordf,laquo,not,shy,reg,macr,deg,plusmn,sup2,sup3,acute,micro,para,middot,cedil,sup1,ordm,raquo,frac14,frac12,frac34,iquest,times,divide,fnof,bull,hellip,prime,Prime,oline,frasl,weierp,image,real,trade,alefsym,larr,uarr,rarr,darr,harr,crarr,lArr,uArr,rArr,dArr,hArr,forall,part,exist,empty,nabla,isin,notin,ni,prod,sum,minus,lowast,radic,prop,infin,ang,and,or,cap,cup,int,there4,sim,cong,asymp,ne,equiv,le,ge,sub,sup,nsub,sube,supe,oplus,otimes,perp,sdot,lceil,rceil,lfloor,rfloor,lang,rang,loz,spades,clubs,hearts,diams,circ,tilde,ensp,emsp,thinsp,zwnj,zwj,lrm,rlm,ndash,mdash,lsquo,rsquo,sbquo,ldquo,rdquo,bdquo,dagger,Dagger,permil,lsaquo,rsaquo,euro"), e.entities_latin && l.push("Agrave,Aacute,Acirc,Atilde,Auml,Aring,AElig,Ccedil,Egrave,Eacute,Ecirc,Euml,Igrave,Iacute,Icirc,Iuml,ETH,Ntilde,Ograve,Oacute,Ocirc,Otilde,Ouml,Oslash,Ugrave,Uacute,Ucirc,Uuml,Yacute,THORN,szlig,agrave,aacute,acirc,atilde,auml,aring,aelig,ccedil,egrave,eacute,ecirc,euml,igrave,iacute,icirc,iuml,eth,ntilde,ograve,oacute,ocirc,otilde,ouml,oslash,ugrave,uacute,ucirc,uuml,yacute,thorn,yuml,OElig,oelig,Scaron,scaron,Yuml"), e.entities_greek && l.push("Alpha,Beta,Gamma,Delta,Epsilon,Zeta,Eta,Theta,Iota,Kappa,Lambda,Mu,Nu,Xi,Omicron,Pi,Rho,Sigma,Tau,Upsilon,Phi,Chi,Psi,Omega,alpha,beta,gamma,delta,epsilon,zeta,eta,theta,iota,kappa,lambda,mu,nu,xi,omicron,pi,rho,sigmaf,sigma,tau,upsilon,phi,chi,psi,omega,thetasym,upsih,piv"), e.entities_additional && l.push(e.entities_additional));
					var k = a(l.join(",")),
						d = k.regex ? "[" + k.regex + "]" : "a^";
					delete k.regex;
					e.entities && e.entities_processNumerical && (d = "[^ -~]|" + d);
					var d = new RegExp(d, "g"),
						h = a("nbsp,gt,lt,amp,shy", !0),
						m = new RegExp(h.regex, "g");
					f.addRules({
						text: function(a) {
							return a.replace(m, b).replace(d, c)
						}
					}, {
						applyToAll: !0,
						excludeNestedEditable: !0
					})
				}
			}
		})
	}(), CKEDITOR.config.basicEntities = !0, CKEDITOR.config.entities = !0, CKEDITOR.config.entities_latin = !0, CKEDITOR.config.entities_greek = !0, CKEDITOR.config.entities_additional = "#39", CKEDITOR.plugins.add("popup"), CKEDITOR.tools.extend(CKEDITOR.editor.prototype, {
		popup: function(a, f, b, c) {
			f = f || "80%";
			b = b || "70%";
			"string" == typeof f && 1 < f.length && "%" == f.substr(f.length - 1, 1) && (f = parseInt(window.screen.width * parseInt(f, 10) / 100, 10));
			"string" == typeof b && 1 < b.length && "%" == b.substr(b.length - 1, 1) && (b = parseInt(window.screen.height * parseInt(b, 10) / 100, 10));
			640 > f && (f = 640);
			420 > b && (b = 420);
			var e = parseInt((window.screen.height - b) / 2, 10),
				l = parseInt((window.screen.width - f) / 2, 10);
			c = (c || "location\x3dno,menubar\x3dno,toolbar\x3dno,dependent\x3dyes,minimizable\x3dno,modal\x3dyes,alwaysRaised\x3dyes,resizable\x3dyes,scrollbars\x3dyes") + ",width\x3d" + f + ",height\x3d" + b + ",top\x3d" + e + ",left\x3d" + l;
			var k = window.open("", null, c, !0);
			if (!k) return !1;
			try {
				-1 == navigator.userAgent.toLowerCase().indexOf(" chrome/") && (k.moveTo(l, e), k.resizeTo(f, b)), k.focus(), k.location.href = a
			} catch (d) {
				window.open(a, null, c, !0)
			}
			return !0
		}
	}), function() {
		function a(a, b) {
			var c = [];
			if (b)
				for (var d in b) c.push(d + "\x3d" + encodeURIComponent(b[d]));
			else return a;
			return a + (-1 != a.indexOf("?") ? "\x26" : "?") + c.join("\x26")
		}

		function f(a) {
			a += "";
			return a.charAt(0).toUpperCase() + a.substr(1)
		}

		function b() {
			var b = this.getDialog(),
				c = b.getParentEditor();
			c._.filebrowserSe = this;
			var d = c.config["filebrowser" + f(b.getName()) + "WindowWidth"] || c.config.filebrowserWindowWidth || "80%",
				b = c.config["filebrowser" + f(b.getName()) + "WindowHeight"] || c.config.filebrowserWindowHeight || "70%",
				e = this.filebrowser.params || {};
			e.CKEditor = c.name;
			e.CKEditorFuncNum = c._.filebrowserFn;
			e.langCode || (e.langCode = c.langCode);
			e = a(this.filebrowser.url, e);
			c.popup(e, d, b, c.config.filebrowserWindowFeatures || c.config.fileBrowserWindowFeatures)
		}

		function c() {
			var a = this.getDialog();
			a.getParentEditor()._.filebrowserSe = this;
			return a.getContentElement(this["for"][0], this["for"][1]).getInputElement().$.value && a.getContentElement(this["for"][0], this["for"][1]).getAction() ? !0 : !1
		}

		function e(b, c, d) {
			var e = d.params || {};
			e.CKEditor = b.name;
			e.CKEditorFuncNum = b._.filebrowserFn;
			e.langCode || (e.langCode = b.langCode);
			c.action = a(d.url, e);
			c.filebrowser = d
		}

		function l(a, d, g, k) {
			if (k && k.length)
				for (var p, r = k.length; r--;)
					if (p = k[r], "hbox" != p.type && "vbox" != p.type && "fieldset" != p.type || l(a, d, g, p.children), p.filebrowser)
						if ("string" == typeof p.filebrowser && (p.filebrowser = {
								action: "fileButton" == p.type ? "QuickUpload" : "Browse",
								target: p.filebrowser
							}), "Browse" == p.filebrowser.action) {
							var x = p.filebrowser.url;
							void 0 === x && (x = a.config["filebrowser" + f(d) + "BrowseUrl"], void 0 === x && (x = a.config.filebrowserBrowseUrl));
							x && (p.onClick = b, p.filebrowser.url = x, p.hidden = !1)
						} else if ("QuickUpload" == p.filebrowser.action && p["for"] && (x = p.filebrowser.url, void 0 === x && (x = a.config["filebrowser" + f(d) + "UploadUrl"], void 0 === x && (x = a.config.filebrowserUploadUrl)), x)) {
				var v = p.onClick;
				p.onClick = function(a) {
					var b = a.sender;
					if (v && !1 === v.call(b, a)) return !1;
					if (c.call(b, a)) {
						a = b.getDialog().getContentElement(this["for"][0], this["for"][1]).getInputElement();
						if (b = new CKEDITOR.dom.element(a.$.form))(a = b.$.elements.ckCsrfToken) ? a = new CKEDITOR.dom.element(a) : (a = new CKEDITOR.dom.element("input"), a.setAttributes({
							name: "ckCsrfToken",
							type: "hidden"
						}), b.append(a)), a.setAttribute("value", CKEDITOR.tools.getCsrfToken());
						return !0
					}
					return !1
				};
				p.filebrowser.url = x;
				p.hidden = !1;
				e(a, g.getContents(p["for"][0]).get(p["for"][1]), p.filebrowser)
			}
		}

		function k(a, b, c) {
			if (-1 !== c.indexOf(";")) {
				c = c.split(";");
				for (var d = 0; d < c.length; d++)
					if (k(a, b, c[d])) return !0;
				return !1
			}
			return (a = a.getContents(b).get(c).filebrowser) && a.url
		}

		function d(a, b) {
			var c = this._.filebrowserSe.getDialog(),
				d = this._.filebrowserSe["for"],
				e = this._.filebrowserSe.filebrowser.onSelect;
			d && c.getContentElement(d[0], d[1]).reset();
			if ("function" != typeof b || !1 !== b.call(this._.filebrowserSe))
				if (!e || !1 !== e.call(this._.filebrowserSe, a, b))
					if ("string" == typeof b && b && alert(b), a && (d = this._.filebrowserSe, c = d.getDialog(), d = d.filebrowser.target || null))
						if (d = d.split(":"), e = c.getContentElement(d[0], d[1])) e.setValue(a), c.selectPage(d[0])
		}
		CKEDITOR.plugins.add("filebrowser", {
			requires: "popup",
			init: function(a) {
				a._.filebrowserFn = CKEDITOR.tools.addFunction(d, a);
				a.on("destroy", function() {
					CKEDITOR.tools.removeFunction(this._.filebrowserFn)
				})
			}
		});
		CKEDITOR.on("dialogDefinition", function(a) {
			if (a.editor.plugins.filebrowser)
				for (var b = a.data.definition, c, d = 0; d < b.contents.length; ++d)
					if (c = b.contents[d]) l(a.editor, a.data.name, b, c.elements), c.hidden && c.filebrowser && (c.hidden = !k(b, c.id, c.filebrowser))
		})
	}(), function() {
		function a(a) {
			var e = a.config,
				l = a.fire("uiSpace", {
					space: "top",
					html: ""
				}).html,
				k = function() {
					function d(a, c, e) {
						h.setStyle(c, b(e));
						h.setStyle("position", a)
					}

					function g(a) {
						var b = m.getDocumentPosition();
						switch (a) {
							case "top":
								d("absolute", "top", b.y - y - w);
								break;
							case "pin":
								d("fixed", "top", z);
								break;
							case "bottom":
								d("absolute", "top", b.y + (u.height || u.bottom - u.top) + w)
						}
						l = a
					}
					var l, m, v, u, t, y, A, q = e.floatSpaceDockedOffsetX || 0,
						w = e.floatSpaceDockedOffsetY || 0,
						B = e.floatSpacePinnedOffsetX || 0,
						z = e.floatSpacePinnedOffsetY || 0;
					return function(d) {
						if (m = a.editable()) {
							var n = d && "focus" == d.name;
							n && h.show();
							a.fire("floatingSpaceLayout", {
								show: n
							});
							h.removeStyle("left");
							h.removeStyle("right");
							v = h.getClientRect();
							u = m.getClientRect();
							t = f.getViewPaneSize();
							y = v.height;
							A = "pageXOffset" in f.$ ? f.$.pageXOffset : CKEDITOR.document.$.documentElement.scrollLeft;
							l ? (y + w <= u.top ? g("top") : y + w > t.height - u.bottom ? g("pin") : g("bottom"), d = t.width / 2, d = e.floatSpacePreferRight ? "right" : 0 < u.left && u.right < t.width && u.width > v.width ? "rtl" == e.contentsLangDirection ? "right" : "left" : d - u.left > u.right - d ? "left" : "right", v.width > t.width ? (d = "left", n = 0) : (n = "left" == d ? 0 < u.left ? u.left : 0 : u.right < t.width ? t.width - u.right : 0, n + v.width > t.width && (d = "left" == d ? "right" : "left", n = 0)), h.setStyle(d, b(("pin" == l ? B : q) + n + ("pin" == l ? 0 : "left" == d ? A : -A)))) : (l = "pin", g("pin"), k(d))
						}
					}
				}();
			if (l) {
				var d = new CKEDITOR.template('\x3cdiv id\x3d"cke_{name}" class\x3d"cke {id} cke_reset_all cke_chrome cke_editor_{name} cke_float cke_{langDir} ' + CKEDITOR.env.cssClass + '" dir\x3d"{langDir}" title\x3d"' + (CKEDITOR.env.gecko ? " " : "") + '" lang\x3d"{langCode}" role\x3d"application" style\x3d"{style}"' + (a.title ? ' aria-labelledby\x3d"cke_{name}_arialbl"' : " ") + "\x3e" + (a.title ? '\x3cspan id\x3d"cke_{name}_arialbl" class\x3d"cke_voice_label"\x3e{voiceLabel}\x3c/span\x3e' : " ") + '\x3cdiv class\x3d"cke_inner"\x3e\x3cdiv id\x3d"{topId}" class\x3d"cke_top" role\x3d"presentation"\x3e{content}\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e'),
					h = CKEDITOR.document.getBody().append(CKEDITOR.dom.element.createFromHtml(d.output({
						content: l,
						id: a.id,
						langDir: a.lang.dir,
						langCode: a.langCode,
						name: a.name,
						style: "display:none;z-index:" + (e.baseFloatZIndex - 1),
						topId: a.ui.spaceId("top"),
						voiceLabel: a.title
					}))),
					m = CKEDITOR.tools.eventsBuffer(500, k),
					g = CKEDITOR.tools.eventsBuffer(100, k);
				h.unselectable();
				h.on("mousedown", function(a) {
					a = a.data;
					a.getTarget().hasAscendant("a", 1) || a.preventDefault()
				});
				a.on("focus", function(b) {
					k(b);
					a.on("change", m.input);
					f.on("scroll", g.input);
					f.on("resize", g.input)
				});
				a.on("blur", function() {
					h.hide();
					a.removeListener("change", m.input);
					f.removeListener("scroll", g.input);
					f.removeListener("resize", g.input)
				});
				a.on("destroy", function() {
					f.removeListener("scroll", g.input);
					f.removeListener("resize", g.input);
					h.clearCustomData();
					h.remove()
				});
				a.focusManager.hasFocus && h.show();
				a.focusManager.add(h, 1)
			}
		}
		var f = CKEDITOR.document.getWindow(),
			b = CKEDITOR.tools.cssLength;
		CKEDITOR.plugins.add("floatingspace", {
			init: function(b) {
				b.on("loaded", function() {
					a(this)
				}, null, null, 20)
			}
		})
	}(), CKEDITOR.plugins.add("listblock", {
		requires: "panel",
		onLoad: function() {
			var a = CKEDITOR.addTemplate("panel-list", '\x3cul role\x3d"presentation" class\x3d"cke_panel_list"\x3e{items}\x3c/ul\x3e'),
				f = CKEDITOR.addTemplate("panel-list-item", '\x3cli id\x3d"{id}" class\x3d"cke_panel_listItem" role\x3dpresentation\x3e\x3ca id\x3d"{id}_option" _cke_focus\x3d1 hidefocus\x3dtrue title\x3d"{title}" href\x3d"javascript:void(\'{val}\')"  {onclick}\x3d"CKEDITOR.tools.callFunction({clickFn},\'{val}\'); return false;" role\x3d"option"\x3e{text}\x3c/a\x3e\x3c/li\x3e'),
				b = CKEDITOR.addTemplate("panel-list-group", '\x3ch1 id\x3d"{id}" class\x3d"cke_panel_grouptitle" role\x3d"presentation" \x3e{label}\x3c/h1\x3e'),
				c = /\'/g;
			CKEDITOR.ui.panel.prototype.addListBlock = function(a, b) {
				return this.addBlock(a, new CKEDITOR.ui.listBlock(this.getHolderElement(), b))
			};
			CKEDITOR.ui.listBlock = CKEDITOR.tools.createClass({
				base: CKEDITOR.ui.panel.block,
				$: function(a, b) {
					b = b || {};
					var c = b.attributes || (b.attributes = {});
					(this.multiSelect = !!b.multiSelect) && (c["aria-multiselectable"] = !0);
					!c.role && (c.role = "listbox");
					this.base.apply(this, arguments);
					this.element.setAttribute("role", c.role);
					c = this.keys;
					c[40] = "next";
					c[9] = "next";
					c[38] = "prev";
					c[CKEDITOR.SHIFT + 9] = "prev";
					c[32] = CKEDITOR.env.ie ? "mouseup" : "click";
					CKEDITOR.env.ie && (c[13] = "mouseup");
					this._.pendingHtml = [];
					this._.pendingList = [];
					this._.items = {};
					this._.groups = {}
				},
				_: {
					close: function() {
						if (this._.started) {
							var b = a.output({
								items: this._.pendingList.join("")
							});
							this._.pendingList = [];
							this._.pendingHtml.push(b);
							delete this._.started
						}
					},
					getClick: function() {
						this._.click || (this._.click = CKEDITOR.tools.addFunction(function(a) {
							var b = this.toggle(a);
							if (this.onClick) this.onClick(a, b)
						}, this));
						return this._.click
					}
				},
				proto: {
					add: function(a, b, k) {
						var d = CKEDITOR.tools.getNextId();
						this._.started || (this._.started = 1, this._.size = this._.size || 0);
						this._.items[a] = d;
						var h;
						h = CKEDITOR.tools.htmlEncodeAttr(a).replace(c, "\\'");
						a = {
							id: d,
							val: h,
							onclick: CKEDITOR.env.ie ? 'onclick\x3d"return false;" onmouseup' : "onclick",
							clickFn: this._.getClick(),
							title: CKEDITOR.tools.htmlEncodeAttr(k || a),
							text: b || a
						};
						this._.pendingList.push(f.output(a))
					},
					startGroup: function(a) {
						this._.close();
						var c = CKEDITOR.tools.getNextId();
						this._.groups[a] = c;
						this._.pendingHtml.push(b.output({
							id: c,
							label: a
						}))
					},
					commit: function() {
						this._.close();
						this.element.appendHtml(this._.pendingHtml.join(""));
						delete this._.size;
						this._.pendingHtml = []
					},
					toggle: function(a) {
						var b = this.isMarked(a);
						b ? this.unmark(a) : this.mark(a);
						return !b
					},
					hideGroup: function(a) {
						var b = (a = this.element.getDocument().getById(this._.groups[a])) && a.getNext();
						a && (a.setStyle("display", "none"), b && "ul" == b.getName() && b.setStyle("display", "none"))
					},
					hideItem: function(a) {
						this.element.getDocument().getById(this._.items[a]).setStyle("display", "none")
					},
					showAll: function() {
						var a = this._.items,
							b = this._.groups,
							c = this.element.getDocument(),
							d;
						for (d in a) c.getById(a[d]).setStyle("display", "");
						for (var f in b) a = c.getById(b[f]), d = a.getNext(), a.setStyle("display", ""), d && "ul" == d.getName() && d.setStyle("display", "")
					},
					mark: function(a) {
						this.multiSelect || this.unmarkAll();
						a = this._.items[a];
						var b = this.element.getDocument().getById(a);
						b.addClass("cke_selected");
						this.element.getDocument().getById(a + "_option").setAttribute("aria-selected", !0);
						this.onMark && this.onMark(b)
					},
					markFirstDisplayed: function() {
						var a = this;
						this._.markFirstDisplayed(function() {
							a.multiSelect || a.unmarkAll()
						})
					},
					unmark: function(a) {
						var b = this.element.getDocument();
						a = this._.items[a];
						var c = b.getById(a);
						c.removeClass("cke_selected");
						b.getById(a + "_option").removeAttribute("aria-selected");
						this.onUnmark && this.onUnmark(c)
					},
					unmarkAll: function() {
						var a = this._.items,
							b = this.element.getDocument(),
							c;
						for (c in a) {
							var d = a[c];
							b.getById(d).removeClass("cke_selected");
							b.getById(d + "_option").removeAttribute("aria-selected")
						}
						this.onUnmark && this.onUnmark()
					},
					isMarked: function(a) {
						return this.element.getDocument().getById(this._.items[a]).hasClass("cke_selected")
					},
					focus: function(a) {
						this._.focusIndex = -1;
						var b = this.element.getElementsByTag("a"),
							c, d = -1;
						if (a)
							for (c = this.element.getDocument().getById(this._.items[a]).getFirst(); a = b.getItem(++d);) {
								if (a.equals(c)) {
									this._.focusIndex = d;
									break
								}
							} else this.element.focus();
						c && setTimeout(function() {
							c.focus()
						}, 0)
					}
				}
			})
		}
	}), CKEDITOR.plugins.add("richcombo", {
		requires: "floatpanel,listblock,button",
		beforeInit: function(a) {
			a.ui.addHandler(CKEDITOR.UI_RICHCOMBO, CKEDITOR.ui.richCombo.handler)
		}
	}), function() {
		var a = '\x3cspan id\x3d"{id}" class\x3d"cke_combo cke_combo__{name} {cls}" role\x3d"presentation"\x3e\x3cspan id\x3d"{id}_label" class\x3d"cke_combo_label"\x3e{label}\x3c/span\x3e\x3ca class\x3d"cke_combo_button" title\x3d"{title}" tabindex\x3d"-1"' + (CKEDITOR.env.gecko && !CKEDITOR.env.hc ? "" : " href\x3d\"javascript:void('{titleJs}')\"") + ' hidefocus\x3d"true" role\x3d"button" aria-labelledby\x3d"{id}_label" aria-haspopup\x3d"true"';
		CKEDITOR.env.gecko && CKEDITOR.env.mac && (a += ' onkeypress\x3d"return false;"');
		CKEDITOR.env.gecko && (a += ' onblur\x3d"this.style.cssText \x3d this.style.cssText;"');
		var a = a + (' onkeydown\x3d"return CKEDITOR.tools.callFunction({keydownFn},event,this);" onfocus\x3d"return CKEDITOR.tools.callFunction({focusFn},event);" ' + (CKEDITOR.env.ie ? 'onclick\x3d"return false;" onmouseup' : "onclick") + '\x3d"CKEDITOR.tools.callFunction({clickFn},this);return false;"\x3e\x3cspan id\x3d"{id}_text" class\x3d"cke_combo_text cke_combo_inlinelabel"\x3e{label}\x3c/span\x3e\x3cspan class\x3d"cke_combo_open"\x3e\x3cspan class\x3d"cke_combo_arrow"\x3e' + (CKEDITOR.env.hc ? "\x26#9660;" : CKEDITOR.env.air ? "\x26nbsp;" : "") + "\x3c/span\x3e\x3c/span\x3e\x3c/a\x3e\x3c/span\x3e"),
			f = CKEDITOR.addTemplate("combo", a);
		CKEDITOR.UI_RICHCOMBO = "richcombo";
		CKEDITOR.ui.richCombo = CKEDITOR.tools.createClass({
			$: function(a) {
				CKEDITOR.tools.extend(this, a, {
					canGroup: !1,
					title: a.label,
					modes: {
						wysiwyg: 1
					},
					editorFocus: 1
				});
				a = this.panel || {};
				delete this.panel;
				this.id = CKEDITOR.tools.getNextNumber();
				this.document = a.parent && a.parent.getDocument() || CKEDITOR.document;
				a.className = "cke_combopanel";
				a.block = {
					multiSelect: a.multiSelect,
					attributes: a.attributes
				};
				a.toolbarRelated = !0;
				this._ = {
					panelDefinition: a,
					items: {}
				}
			},
			proto: {
				renderHtml: function(a) {
					var c = [];
					this.render(a, c);
					return c.join("")
				},
				render: function(a, c) {
					function e() {
						if (this.getState() != CKEDITOR.TRISTATE_ON) {
							var c = this.modes[a.mode] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED;
							a.readOnly && !this.readOnly && (c = CKEDITOR.TRISTATE_DISABLED);
							this.setState(c);
							this.setValue("");
							c != CKEDITOR.TRISTATE_DISABLED && this.refresh && this.refresh()
						}
					}
					var l = CKEDITOR.env,
						k = "cke_" + this.id,
						d = CKEDITOR.tools.addFunction(function(c) {
							p && (a.unlockSelection(1), p = 0);
							m.execute(c)
						}, this),
						h = this,
						m = {
							id: k,
							combo: this,
							focus: function() {
								CKEDITOR.document.getById(k).getChild(1).focus()
							},
							execute: function(c) {
								var d = h._;
								if (d.state != CKEDITOR.TRISTATE_DISABLED)
									if (h.createPanel(a), d.on) d.panel.hide();
									else {
										h.commit();
										var e = h.getValue();
										e ? d.list.mark(e) : d.list.unmarkAll();
										d.panel.showBlock(h.id, new CKEDITOR.dom.element(c), 4)
									}
							},
							clickFn: d
						};
					a.on("activeFilterChange", e, this);
					a.on("mode", e, this);
					a.on("selectionChange", e, this);
					!this.readOnly && a.on("readOnly", e, this);
					var g = CKEDITOR.tools.addFunction(function(a, b) {
							a = new CKEDITOR.dom.event(a);
							var c = a.getKeystroke();
							switch (c) {
								case 13:
								case 32:
								case 40:
									CKEDITOR.tools.callFunction(d, b);
									break;
								default:
									m.onkey(m, c)
							}
							a.preventDefault()
						}),
						n = CKEDITOR.tools.addFunction(function() {
							m.onfocus && m.onfocus()
						}),
						p = 0;
					m.keyDownFn = g;
					l = {
						id: k,
						name: this.name || this.command,
						label: this.label,
						title: this.title,
						cls: this.className || "",
						titleJs: l.gecko && !l.hc ? "" : (this.title || "").replace("'", ""),
						keydownFn: g,
						focusFn: n,
						clickFn: d
					};
					f.output(l, c);
					if (this.onRender) this.onRender();
					return m
				},
				createPanel: function(a) {
					if (!this._.panel) {
						var c = this._.panelDefinition,
							e = this._.panelDefinition.block,
							f = c.parent || CKEDITOR.document.getBody(),
							k = "cke_combopanel__" + this.name,
							d = new CKEDITOR.ui.floatPanel(a, f, c),
							c = d.addListBlock(this.id, e),
							h = this;
						d.onShow = function() {
							this.element.addClass(k);
							h.setState(CKEDITOR.TRISTATE_ON);
							h._.on = 1;
							h.editorFocus && !a.focusManager.hasFocus && a.focus();
							if (h.onOpen) h.onOpen()
						};
						d.onHide = function(c) {
							this.element.removeClass(k);
							h.setState(h.modes && h.modes[a.mode] ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED);
							h._.on = 0;
							if (!c && h.onClose) h.onClose()
						};
						d.onEscape = function() {
							d.hide(1)
						};
						c.onClick = function(a, b) {
							h.onClick && h.onClick.call(h, a, b);
							d.hide()
						};
						this._.panel = d;
						this._.list = c;
						d.getBlock(this.id).onHide = function() {
							h._.on = 0;
							h.setState(CKEDITOR.TRISTATE_OFF)
						};
						this.init && this.init()
					}
				},
				setValue: function(a, c) {
					this._.value = a;
					var e = this.document.getById("cke_" + this.id + "_text");
					e && (a || c ? e.removeClass("cke_combo_inlinelabel") : (c = this.label, e.addClass("cke_combo_inlinelabel")), e.setText("undefined" != typeof c ? c : a))
				},
				getValue: function() {
					return this._.value || ""
				},
				unmarkAll: function() {
					this._.list.unmarkAll()
				},
				mark: function(a) {
					this._.list.mark(a)
				},
				hideItem: function(a) {
					this._.list.hideItem(a)
				},
				hideGroup: function(a) {
					this._.list.hideGroup(a)
				},
				showAll: function() {
					this._.list.showAll()
				},
				add: function(a, c, e) {
					this._.items[a] = e || a;
					this._.list.add(a, c, e)
				},
				startGroup: function(a) {
					this._.list.startGroup(a)
				},
				commit: function() {
					this._.committed || (this._.list.commit(), this._.committed = 1, CKEDITOR.ui.fire("ready", this));
					this._.committed = 1
				},
				setState: function(a) {
					if (this._.state != a) {
						var c = this.document.getById("cke_" + this.id);
						c.setState(a, "cke_combo");
						a == CKEDITOR.TRISTATE_DISABLED ? c.setAttribute("aria-disabled", !0) : c.removeAttribute("aria-disabled");
						this._.state = a
					}
				},
				getState: function() {
					return this._.state
				},
				enable: function() {
					this._.state == CKEDITOR.TRISTATE_DISABLED && this.setState(this._.lastState)
				},
				disable: function() {
					this._.state != CKEDITOR.TRISTATE_DISABLED && (this._.lastState = this._.state, this.setState(CKEDITOR.TRISTATE_DISABLED))
				}
			},
			statics: {
				handler: {
					create: function(a) {
						return new CKEDITOR.ui.richCombo(a)
					}
				}
			}
		});
		CKEDITOR.ui.prototype.addRichCombo = function(a, c) {
			this.add(a, CKEDITOR.UI_RICHCOMBO, c)
		}
	}(), CKEDITOR.plugins.add("format", {
		requires: "richcombo",
		init: function(a) {
			if (!a.blockless) {
				for (var f = a.config, b = a.lang.format, c = f.format_tags.split(";"), e = {}, l = 0, k = [], d = 0; d < c.length; d++) {
					var h = c[d],
						m = new CKEDITOR.style(f["format_" + h]);
					if (!a.filter.customConfig || a.filter.check(m)) l++, e[h] = m, e[h]._.enterMode = a.config.enterMode, k.push(m)
				}
				0 !== l && a.ui.addRichCombo("Format", {
					label: b.label,
					title: b.panelTitle,
					toolbar: "styles,20",
					allowedContent: k,
					panel: {
						css: [CKEDITOR.skin.getPath("editor")].concat(f.contentsCss),
						multiSelect: !1,
						attributes: {
							"aria-label": b.panelTitle
						}
					},
					init: function() {
						this.startGroup(b.panelTitle);
						for (var a in e) {
							var c = b["tag_" + a];
							this.add(a, e[a].buildPreview(c), c)
						}
					},
					onClick: function(b) {
						a.focus();
						a.fire("saveSnapshot");
						b = e[b];
						var c = a.elementPath();
						a[b.checkActive(c, a) ? "removeStyle" : "applyStyle"](b);
						setTimeout(function() {
							a.fire("saveSnapshot")
						}, 0)
					},
					onRender: function() {
						a.on("selectionChange", function(b) {
							var c = this.getValue();
							b = b.data.path;
							this.refresh();
							for (var d in e)
								if (e[d].checkActive(b, a)) {
									d != c && this.setValue(d, a.lang.format["tag_" + d]);
									return
								}
							this.setValue("")
						}, this)
					},
					onOpen: function() {
						this.showAll();
						for (var b in e) a.activeFilter.check(e[b]) || this.hideItem(b)
					},
					refresh: function() {
						var b = a.elementPath();
						if (b) {
							if (b.isContextFor("p"))
								for (var c in e)
									if (a.activeFilter.check(e[c])) return;
							this.setState(CKEDITOR.TRISTATE_DISABLED)
						}
					}
				})
			}
		}
	}), CKEDITOR.config.format_tags = "p;h1;h2;h3;h4;h5;h6;pre;address;div", CKEDITOR.config.format_p = {
		element: "p"
	}, CKEDITOR.config.format_div = {
		element: "div"
	}, CKEDITOR.config.format_pre = {
		element: "pre"
	}, CKEDITOR.config.format_address = {
		element: "address"
	}, CKEDITOR.config.format_h1 = {
		element: "h1"
	}, CKEDITOR.config.format_h2 = {
		element: "h2"
	}, CKEDITOR.config.format_h3 = {
		element: "h3"
	}, CKEDITOR.config.format_h4 = {
		element: "h4"
	}, CKEDITOR.config.format_h5 = {
		element: "h5"
	}, CKEDITOR.config.format_h6 = {
		element: "h6"
	}, function() {
		var a = {
			canUndo: !1,
			exec: function(a) {
				var b = a.document.createElement("hr");
				a.insertElement(b)
			},
			allowedContent: "hr",
			requiredContent: "hr"
		};
		CKEDITOR.plugins.add("horizontalrule", {
			init: function(f) {
				f.blockless || (f.addCommand("horizontalrule", a), f.ui.addButton && f.ui.addButton("HorizontalRule", {
					label: f.lang.horizontalrule.toolbar,
					command: "horizontalrule",
					toolbar: "insert,40"
				}))
			}
		})
	}(), CKEDITOR.plugins.add("htmlwriter", {
		init: function(a) {
			var f = new CKEDITOR.htmlWriter;
			f.forceSimpleAmpersand = a.config.forceSimpleAmpersand;
			f.indentationChars = a.config.dataIndentationChars || "\t";
			a.dataProcessor.writer = f
		}
	}), CKEDITOR.htmlWriter = CKEDITOR.tools.createClass({
		base: CKEDITOR.htmlParser.basicWriter,
		$: function() {
			this.base();
			this.indentationChars = "\t";
			this.selfClosingEnd = " /\x3e";
			this.lineBreakChars = "\n";
			this.sortAttributes = 1;
			this._.indent = 0;
			this._.indentation = "";
			this._.inPre = 0;
			this._.rules = {};
			var a = CKEDITOR.dtd,
				f;
			for (f in CKEDITOR.tools.extend({}, a.$nonBodyContent, a.$block, a.$listItem, a.$tableContent)) this.setRules(f, {
				indent: !a[f]["#"],
				breakBeforeOpen: 1,
				breakBeforeClose: !a[f]["#"],
				breakAfterClose: 1,
				needsSpace: f in a.$block && !(f in {
					li: 1,
					dt: 1,
					dd: 1
				})
			});
			this.setRules("br", {
				breakAfterOpen: 1
			});
			this.setRules("title", {
				indent: 0,
				breakAfterOpen: 0
			});
			this.setRules("style", {
				indent: 0,
				breakBeforeClose: 1
			});
			this.setRules("pre", {
				breakAfterOpen: 1,
				indent: 0
			})
		},
		proto: {
			openTag: function(a) {
				var f = this._.rules[a];
				this._.afterCloser && f && f.needsSpace && this._.needsSpace && this._.output.push("\n");
				this._.indent ? this.indentation() : f && f.breakBeforeOpen && (this.lineBreak(), this.indentation());
				this._.output.push("\x3c", a);
				this._.afterCloser = 0
			},
			openTagClose: function(a, f) {
				var b = this._.rules[a];
				f ? (this._.output.push(this.selfClosingEnd), b && b.breakAfterClose && (this._.needsSpace = b.needsSpace)) : (this._.output.push("\x3e"), b && b.indent && (this._.indentation += this.indentationChars));
				b && b.breakAfterOpen && this.lineBreak();
				"pre" == a && (this._.inPre = 1)
			},
			attribute: function(a, f) {
				"string" == typeof f && (this.forceSimpleAmpersand && (f = f.replace(/&amp;/g, "\x26")), f = CKEDITOR.tools.htmlEncodeAttr(f));
				this._.output.push(" ", a, '\x3d"', f, '"')
			},
			closeTag: function(a) {
				var f = this._.rules[a];
				f && f.indent && (this._.indentation = this._.indentation.substr(this.indentationChars.length));
				this._.indent ? this.indentation() : f && f.breakBeforeClose && (this.lineBreak(), this.indentation());
				this._.output.push("\x3c/", a, "\x3e");
				"pre" == a && (this._.inPre = 0);
				f && f.breakAfterClose && (this.lineBreak(), this._.needsSpace = f.needsSpace);
				this._.afterCloser = 1
			},
			text: function(a) {
				this._.indent && (this.indentation(), !this._.inPre && (a = CKEDITOR.tools.ltrim(a)));
				this._.output.push(a)
			},
			comment: function(a) {
				this._.indent && this.indentation();
				this._.output.push("\x3c!--", a, "--\x3e")
			},
			lineBreak: function() {
				!this._.inPre && 0 < this._.output.length && this._.output.push(this.lineBreakChars);
				this._.indent = 1
			},
			indentation: function() {
				!this._.inPre && this._.indentation && this._.output.push(this._.indentation);
				this._.indent = 0
			},
			reset: function() {
				this._.output = [];
				this._.indent = 0;
				this._.indentation = "";
				this._.afterCloser = 0;
				this._.inPre = 0;
				this._.needsSpace = 0
			},
			setRules: function(a, f) {
				var b = this._.rules[a];
				b ? CKEDITOR.tools.extend(b, f, !0) : this._.rules[a] = f
			}
		}
	}), function() {
		function a(a, c) {
			c || (c = a.getSelection().getSelectedElement());
			if (c && c.is("img") && !c.data("cke-realelement") && !c.isReadOnly()) return c
		}

		function f(a) {
			var c = a.getStyle("float");
			if ("inherit" == c || "none" == c) c = 0;
			c || (c = a.getAttribute("align"));
			return c
		}
		CKEDITOR.plugins.add("image", {
			requires: "dialog",
			init: function(b) {
				if (!b.plugins.image2) {
					CKEDITOR.dialog.add("image", this.path + "dialogs/image.js");
					var c = "img[alt,!src]{border-style,border-width,float,height,margin,margin-bottom,margin-left,margin-right,margin-top,width}";
					CKEDITOR.dialog.isTabEnabled(b, "image", "advanced") && (c = "img[alt,dir,id,lang,longdesc,!src,title]{*}(*)");
					b.addCommand("image", new CKEDITOR.dialogCommand("image", {
						allowedContent: c,
						requiredContent: "img[alt,src]",
						contentTransformations: [
							["img{width}: sizeToStyle", "img[width]: sizeToAttribute"],
							["img{float}: alignmentToStyle", "img[align]: alignmentToAttribute"]
						]
					}));
					b.ui.addButton && b.ui.addButton("Image", {
						label: b.lang.common.image,
						command: "image",
						toolbar: "insert,10"
					});
					b.on("doubleclick", function(a) {
						var b = a.data.element;
						!b.is("img") || b.data("cke-realelement") || b.isReadOnly() || (a.data.dialog = "image")
					});
					b.addMenuItems && b.addMenuItems({
						image: {
							label: b.lang.image.menu,
							command: "image",
							group: "image"
						}
					});
					b.contextMenu && b.contextMenu.addListener(function(c) {
						if (a(b, c)) return {
							image: CKEDITOR.TRISTATE_OFF
						}
					})
				}
			},
			afterInit: function(b) {
				function c(c) {
					var l = b.getCommand("justify" + c);
					if (l) {
						if ("left" == c || "right" == c) l.on("exec", function(k) {
							var d = a(b),
								h;
							d && (h = f(d), h == c ? (d.removeStyle("float"), c == f(d) && d.removeAttribute("align")) : d.setStyle("float", c), k.cancel())
						});
						l.on("refresh", function(k) {
							var d = a(b);
							d && (d = f(d), this.setState(d == c ? CKEDITOR.TRISTATE_ON : "right" == c || "left" == c ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED), k.cancel())
						})
					}
				}
				b.plugins.image2 || (c("left"), c("right"), c("center"), c("block"))
			}
		})
	}(), CKEDITOR.config.image_removeLinkByEmptyURL = !0, function() {
		function a(a, b) {
			var d = c.exec(a),
				e = c.exec(b);
			if (d) {
				if (!d[2] && "px" == e[2]) return e[1];
				if ("px" == d[2] && !e[2]) return e[1] + "px"
			}
			return b
		}
		var f = CKEDITOR.htmlParser.cssStyle,
			b = CKEDITOR.tools.cssLength,
			c = /^((?:\d*(?:\.\d+))|(?:\d+))(.*)?$/i,
			e = {
				elements: {
					$: function(b) {
						var c = b.attributes;
						if ((c = (c = (c = c && c["data-cke-realelement"]) && new CKEDITOR.htmlParser.fragment.fromHtml(decodeURIComponent(c))) && c.children[0]) && b.attributes["data-cke-resizable"]) {
							var d = (new f(b)).rules;
							b = c.attributes;
							var e = d.width,
								d = d.height;
							e && (b.width = a(b.width, e));
							d && (b.height = a(b.height, d))
						}
						return c
					}
				}
			};
		CKEDITOR.plugins.add("fakeobjects", {
			init: function(a) {
				a.filter.allow("img[!data-cke-realelement,src,alt,title](*){*}", "fakeobjects")
			},
			afterInit: function(a) {
				(a = (a = a.dataProcessor) && a.htmlFilter) && a.addRules(e, {
					applyToAll: !0
				})
			}
		});
		CKEDITOR.editor.prototype.createFakeElement = function(a, c, d, e) {
			var m = this.lang.fakeobjects,
				m = m[d] || m.unknown;
			c = {
				"class": c,
				"data-cke-realelement": encodeURIComponent(a.getOuterHtml()),
				"data-cke-real-node-type": a.type,
				alt: m,
				title: m,
				align: a.getAttribute("align") || ""
			};
			CKEDITOR.env.hc || (c.src = CKEDITOR.tools.transparentImageData);
			d && (c["data-cke-real-element-type"] = d);
			e && (c["data-cke-resizable"] = e, d = new f, e = a.getAttribute("width"), a = a.getAttribute("height"), e && (d.rules.width = b(e)), a && (d.rules.height = b(a)), d.populate(c));
			return this.document.createElement("img", {
				attributes: c
			})
		};
		CKEDITOR.editor.prototype.createFakeParserElement = function(a, c, d, e) {
			var m = this.lang.fakeobjects,
				m = m[d] || m.unknown,
				g;
			g = new CKEDITOR.htmlParser.basicWriter;
			a.writeHtml(g);
			g = g.getHtml();
			c = {
				"class": c,
				"data-cke-realelement": encodeURIComponent(g),
				"data-cke-real-node-type": a.type,
				alt: m,
				title: m,
				align: a.attributes.align || ""
			};
			CKEDITOR.env.hc || (c.src = CKEDITOR.tools.transparentImageData);
			d && (c["data-cke-real-element-type"] = d);
			e && (c["data-cke-resizable"] = e, e = a.attributes, a = new f, d = e.width, e = e.height, void 0 !== d && (a.rules.width = b(d)), void 0 !== e && (a.rules.height = b(e)), a.populate(c));
			return new CKEDITOR.htmlParser.element("img", c)
		};
		CKEDITOR.editor.prototype.restoreRealElement = function(b) {
			if (b.data("cke-real-node-type") != CKEDITOR.NODE_ELEMENT) return null;
			var c = CKEDITOR.dom.element.createFromHtml(decodeURIComponent(b.data("cke-realelement")), this.document);
			if (b.data("cke-resizable")) {
				var d = b.getStyle("width");
				b = b.getStyle("height");
				d && c.setAttribute("width", a(c.getAttribute("width"), d));
				b && c.setAttribute("height", a(c.getAttribute("height"), b))
			}
			return c
		}
	}(), "use strict", function() {
		function a(a) {
			return a.replace(/'/g, "\\$\x26")
		}

		function f(a) {
			for (var b, c = a.length, d = [], e = 0; e < c; e++) b = a.charCodeAt(e), d.push(b);
			return "String.fromCharCode(" + d.join(",") + ")"
		}

		function b(b, c) {
			var d = b.plugins.link,
				e = d.compiledProtectionFunction.params,
				f, g;
			g = [d.compiledProtectionFunction.name, "("];
			for (var h = 0; h < e.length; h++) d = e[h].toLowerCase(), f = c[d], 0 < h && g.push(","), g.push("'", f ? a(encodeURIComponent(c[d])) : "", "'");
			g.push(")");
			return g.join("")
		}

		function c(a) {
			a = a.config.emailProtection || "";
			var b;
			a && "encode" != a && (b = {}, a.replace(/^([^(]+)\(([^)]+)\)$/, function(a, c, d) {
				b.name = c;
				b.params = [];
				d.replace(/[^,\s]+/g, function(a) {
					b.params.push(a)
				})
			}));
			return b
		}
		CKEDITOR.plugins.add("link", {
			requires: "dialog,fakeobjects",
			onLoad: function() {
				function a(b) {
					return c.replace(/%1/g, "rtl" == b ? "right" : "left").replace(/%2/g, "cke_contents_" + b)
				}
				var b = "background:url(" + CKEDITOR.getUrl(this.path + "images" + (CKEDITOR.env.hidpi ? "/hidpi" : "") + "/anchor.png") + ") no-repeat %1 center;border:1px dotted #00f;background-size:16px;",
					c = ".%2 a.cke_anchor,.%2 a.cke_anchor_empty,.cke_editable.%2 a[name],.cke_editable.%2 a[data-cke-saved-name]{" + b + "padding-%1:18px;cursor:auto;}.%2 img.cke_anchor{" + b + "width:16px;min-height:15px;height:1.15em;vertical-align:text-bottom;}";
				CKEDITOR.addCss(a("ltr") + a("rtl"))
			},
			init: function(a) {
				var b = "a[!href]";
				CKEDITOR.dialog.isTabEnabled(a, "link", "advanced") && (b = b.replace("]", ",accesskey,charset,dir,id,lang,name,rel,tabindex,title,type,download]{*}(*)"));
				CKEDITOR.dialog.isTabEnabled(a, "link", "target") && (b = b.replace("]", ",target,onclick]"));
				a.addCommand("link", new CKEDITOR.dialogCommand("link", {
					allowedContent: b,
					requiredContent: "a[href]"
				}));
				a.addCommand("anchor", new CKEDITOR.dialogCommand("anchor", {
					allowedContent: "a[!name,id]",
					requiredContent: "a[name]"
				}));
				a.addCommand("unlink", new CKEDITOR.unlinkCommand);
				a.addCommand("removeAnchor", new CKEDITOR.removeAnchorCommand);
				a.setKeystroke(CKEDITOR.CTRL + 76, "link");
				a.ui.addButton && (a.ui.addButton("Link", {
					label: a.lang.link.toolbar,
					command: "link",
					toolbar: "links,10"
				}), a.ui.addButton("Unlink", {
					label: a.lang.link.unlink,
					command: "unlink",
					toolbar: "links,20"
				}), a.ui.addButton("Anchor", {
					label: a.lang.link.anchor.toolbar,
					command: "anchor",
					toolbar: "links,30"
				}));
				CKEDITOR.dialog.add("link", this.path + "dialogs/link.js");
				CKEDITOR.dialog.add("anchor", this.path + "dialogs/anchor.js");
				a.on("doubleclick", function(b) {
					var c = CKEDITOR.plugins.link.getSelectedLink(a) || b.data.element.getAscendant("a", 1);
					c && !c.isReadOnly() && (c.is("a") ? (b.data.dialog = !c.getAttribute("name") || c.getAttribute("href") && c.getChildCount() ? "link" : "anchor", b.data.link = c) : CKEDITOR.plugins.link.tryRestoreFakeAnchor(a, c) && (b.data.dialog = "anchor"))
				}, null, null, 0);
				a.on("doubleclick", function(b) {
					b.data.dialog in {
						link: 1,
						anchor: 1
					} && b.data.link && a.getSelection().selectElement(b.data.link)
				}, null, null, 20);
				a.addMenuItems && a.addMenuItems({
					anchor: {
						label: a.lang.link.anchor.menu,
						command: "anchor",
						group: "anchor",
						order: 1
					},
					removeAnchor: {
						label: a.lang.link.anchor.remove,
						command: "removeAnchor",
						group: "anchor",
						order: 5
					},
					link: {
						label: a.lang.link.menu,
						command: "link",
						group: "link",
						order: 1
					},
					unlink: {
						label: a.lang.link.unlink,
						command: "unlink",
						group: "link",
						order: 5
					}
				});
				a.contextMenu && a.contextMenu.addListener(function(b) {
					if (!b || b.isReadOnly()) return null;
					b = CKEDITOR.plugins.link.tryRestoreFakeAnchor(a, b);
					if (!b && !(b = CKEDITOR.plugins.link.getSelectedLink(a))) return null;
					var c = {};
					b.getAttribute("href") && b.getChildCount() && (c = {
						link: CKEDITOR.TRISTATE_OFF,
						unlink: CKEDITOR.TRISTATE_OFF
					});
					b && b.hasAttribute("name") && (c.anchor = c.removeAnchor = CKEDITOR.TRISTATE_OFF);
					return c
				});
				this.compiledProtectionFunction = c(a)
			},
			afterInit: function(a) {
				a.dataProcessor.dataFilter.addRules({
					elements: {
						a: function(b) {
							return b.attributes.name ? b.children.length ? null : a.createFakeParserElement(b, "cke_anchor", "anchor") : null
						}
					}
				});
				var b = a._.elementsPath && a._.elementsPath.filters;
				b && b.push(function(b, c) {
					if ("a" == c && (CKEDITOR.plugins.link.tryRestoreFakeAnchor(a, b) || b.getAttribute("name") && (!b.getAttribute("href") || !b.getChildCount()))) return "anchor"
				})
			}
		});
		var e = /^javascript:/,
			l = /^mailto:([^?]+)(?:\?(.+))?$/,
			k = /subject=([^;?:@&=$,\/]*)/i,
			d = /body=([^;?:@&=$,\/]*)/i,
			h = /^#(.*)$/,
			m = /^((?:http|https|ftp|news):\/\/)?(.*)$/,
			g = /^(_(?:self|top|parent|blank))$/,
			n = /^javascript:void\(location\.href='mailto:'\+String\.fromCharCode\(([^)]+)\)(?:\+'(.*)')?\)$/,
			p = /^javascript:([^(]+)\(([^)]+)\)$/,
			r = /\s*window.open\(\s*this\.href\s*,\s*(?:'([^']*)'|null)\s*,\s*'([^']*)'\s*\)\s*;\s*return\s*false;*\s*/,
			x = /(?:^|,)([^=]+)=(\d+|yes|no)/gi,
			v = {
				id: "advId",
				dir: "advLangDir",
				accessKey: "advAccessKey",
				name: "advName",
				lang: "advLangCode",
				tabindex: "advTabIndex",
				title: "advTitle",
				type: "advContentType",
				"class": "advCSSClasses",
				charset: "advCharset",
				style: "advStyles",
				rel: "advRel"
			};
		CKEDITOR.plugins.link = {
			getSelectedLink: function(a, b) {
				var c = a.getSelection(),
					d = c.getSelectedElement(),
					e = c.getRanges(),
					f = [],
					g;
				if (!b && d && d.is("a")) return d;
				for (d = 0; d < e.length; d++)
					if (g = c.getRanges()[d], g.shrink(CKEDITOR.SHRINK_TEXT, !1, {
							skipBogus: !0
						}), (g = a.elementPath(g.getCommonAncestor()).contains("a", 1)) && b) f.push(g);
					else if (g) return g;
				return b ? f : null
			},
			getEditorAnchors: function(a) {
				for (var b = a.editable(), c = b.isInline() && !a.plugins.divarea ? a.document : b, b = c.getElementsByTag("a"), c = c.getElementsByTag("img"), d = [], e = 0, f; f = b.getItem(e++);)(f.data("cke-saved-name") || f.hasAttribute("name")) && d.push({
					name: f.data("cke-saved-name") || f.getAttribute("name"),
					id: f.getAttribute("id")
				});
				for (e = 0; f = c.getItem(e++);)(f = this.tryRestoreFakeAnchor(a, f)) && d.push({
					name: f.getAttribute("name"),
					id: f.getAttribute("id")
				});
				return d
			},
			fakeAnchor: !0,
			tryRestoreFakeAnchor: function(a, b) {
				if (b && b.data("cke-real-element-type") && "anchor" == b.data("cke-real-element-type")) {
					var c = a.restoreRealElement(b);
					if (c.data("cke-saved-name")) return c
				}
			},
			parseLinkAttributes: function(a, b) {
				var c = b && (b.data("cke-saved-href") || b.getAttribute("href")) || "",
					f = a.plugins.link.compiledProtectionFunction,
					q = a.config.emailProtection,
					w, B = {};
				c.match(e) && ("encode" == q ? c = c.replace(n, function(a, b, c) {
					c = c || "";
					return "mailto:" + String.fromCharCode.apply(String, b.split(",")) + c.replace(/\\'/g, "'")
				}) : q && c.replace(p, function(a, b, c) {
					if (b == f.name) {
						B.type = "email";
						a = B.email = {};
						b = /(^')|('$)/g;
						c = c.match(/[^,\s]+/g);
						for (var d = c.length, e, g, h = 0; h < d; h++) e = decodeURIComponent, g = c[h].replace(b, "").replace(/\\'/g, "'"), g = e(g), e = f.params[h].toLowerCase(), a[e] = g;
						a.address = [a.name, a.domain].join("@")
					}
				}));
				if (!B.type)
					if (q = c.match(h)) B.type = "anchor", B.anchor = {}, B.anchor.name = B.anchor.id = q[1];
					else if (q = c.match(l)) {
					w = c.match(k);
					c = c.match(d);
					B.type = "email";
					var z = B.email = {};
					z.address = q[1];
					w && (z.subject = decodeURIComponent(w[1]));
					c && (z.body = decodeURIComponent(c[1]))
				} else c && (w = c.match(m)) && (B.type = "url", B.url = {}, B.url.protocol = w[1], B.url.url = w[2]);
				if (b) {
					if (c = b.getAttribute("target")) B.target = {
						type: c.match(g) ? c : "frame",
						name: c
					};
					else if (c = (c = b.data("cke-pa-onclick") || b.getAttribute("onclick")) && c.match(r))
						for (B.target = {
								type: "popup",
								name: c[1]
							}; q = x.exec(c[2]);) "yes" != q[2] && "1" != q[2] || q[1] in {
							height: 1,
							width: 1,
							top: 1,
							left: 1
						} ? isFinite(q[2]) && (B.target[q[1]] = q[2]) : B.target[q[1]] = !0;
					null !== b.getAttribute("download") && (B.download = !0);
					var c = {},
						C;
					for (C in v)(q = b.getAttribute(C)) && (c[v[C]] = q);
					if (C = b.data("cke-saved-name") || c.advName) c.advName = C;
					CKEDITOR.tools.isEmpty(c) || (B.advanced = c)
				}
				return B
			},
			getLinkAttributes: function(c, d) {
				var e = c.config.emailProtection || "",
					g = {};
				switch (d.type) {
					case "url":
						var e = d.url && void 0 !== d.url.protocol ? d.url.protocol : "http://",
							h = d.url && CKEDITOR.tools.trim(d.url.url) || "";
						g["data-cke-saved-href"] = 0 === h.indexOf("/") ? h : e + h;
						break;
					case "anchor":
						e = d.anchor && d.anchor.id;
						g["data-cke-saved-href"] = "#" + (d.anchor && d.anchor.name || e || "");
						break;
					case "email":
						var k = d.email,
							h = k.address;
						switch (e) {
							case "":
							case "encode":
								var l = encodeURIComponent(k.subject || ""),
									m = encodeURIComponent(k.body || ""),
									k = [];
								l && k.push("subject\x3d" + l);
								m && k.push("body\x3d" + m);
								k = k.length ? "?" + k.join("\x26") : "";
								"encode" == e ? (e = ["javascript:void(location.href\x3d'mailto:'+", f(h)], k && e.push("+'", a(k), "'"), e.push(")")) : e = ["mailto:", h, k];
								break;
							default:
								e = h.split("@", 2), k.name = e[0], k.domain = e[1], e = ["javascript:", b(c, k)]
						}
						g["data-cke-saved-href"] = e.join("")
				}
				if (d.target)
					if ("popup" == d.target.type) {
						for (var e = ["window.open(this.href, '",
								d.target.name || "", "', '"
							], n = "resizable status location toolbar menubar fullscreen scrollbars dependent".split(" "), h = n.length, l = function(a) {
								d.target[a] && n.push(a + "\x3d" + d.target[a])
							}, k = 0; k < h; k++) n[k] += d.target[n[k]] ? "\x3dyes" : "\x3dno";
						l("width");
						l("left");
						l("height");
						l("top");
						e.push(n.join(","), "'); return false;");
						g["data-cke-pa-onclick"] = e.join("")
					} else "notSet" != d.target.type && d.target.name && (g.target = d.target.name);
				d.download && (g.download = "");
				if (d.advanced) {
					for (var p in v)(e = d.advanced[v[p]]) && (g[p] = e);
					g.name && (g["data-cke-saved-name"] = g.name)
				}
				g["data-cke-saved-href"] && (g.href = g["data-cke-saved-href"]);
				p = {
					target: 1,
					onclick: 1,
					"data-cke-pa-onclick": 1,
					"data-cke-saved-name": 1,
					download: 1
				};
				d.advanced && CKEDITOR.tools.extend(p, v);
				for (var r in g) delete p[r];
				return {
					set: g,
					removed: CKEDITOR.tools.objectKeys(p)
				}
			},
			showDisplayTextForElement: function(a, b) {
				var c = {
						img: 1,
						table: 1,
						tbody: 1,
						thead: 1,
						tfoot: 1,
						input: 1,
						select: 1,
						textarea: 1
					},
					d = b.getSelection();
				return b.widgets && b.widgets.focused || d && 1 < d.getRanges().length ? !1 : !a || !a.getName || !a.is(c)
			}
		};
		CKEDITOR.unlinkCommand = function() {};
		CKEDITOR.unlinkCommand.prototype = {
			exec: function(a) {
				if (CKEDITOR.env.ie) {
					var b = a.getSelection().getRanges()[0],
						c = b.getPreviousEditableNode() && b.getPreviousEditableNode().getAscendant("a", !0) || b.getNextEditableNode() && b.getNextEditableNode().getAscendant("a", !0),
						d;
					b.collapsed && c && (d = b.createBookmark(), b.selectNodeContents(c), b.select())
				}
				c = new CKEDITOR.style({
					element: "a",
					type: CKEDITOR.STYLE_INLINE,
					alwaysRemoveElement: 1
				});
				a.removeStyle(c);
				d && (b.moveToBookmark(d), b.select())
			},
			refresh: function(a, b) {
				var c = b.lastElement && b.lastElement.getAscendant("a", !0);
				c && "a" == c.getName() && c.getAttribute("href") && c.getChildCount() ? this.setState(CKEDITOR.TRISTATE_OFF) : this.setState(CKEDITOR.TRISTATE_DISABLED)
			},
			contextSensitive: 1,
			startDisabled: 1,
			requiredContent: "a[href]",
			editorFocus: 1
		};
		CKEDITOR.removeAnchorCommand = function() {};
		CKEDITOR.removeAnchorCommand.prototype = {
			exec: function(a) {
				var b = a.getSelection(),
					c = b.createBookmarks(),
					d;
				if (b && (d = b.getSelectedElement()) && (d.getChildCount() ? d.is("a") : CKEDITOR.plugins.link.tryRestoreFakeAnchor(a, d))) d.remove(1);
				else if (d = CKEDITOR.plugins.link.getSelectedLink(a)) d.hasAttribute("href") ? (d.removeAttributes({
					name: 1,
					"data-cke-saved-name": 1
				}), d.removeClass("cke_anchor")) : d.remove(1);
				b.selectBookmarks(c)
			},
			requiredContent: "a[name]"
		};
		CKEDITOR.tools.extend(CKEDITOR.config, {
			linkShowAdvancedTab: !0,
			linkShowTargetTab: !0
		})
	}(), "use strict", function() {
		function a(a, b, c) {
			return n(b) && n(c) && c.equals(b.getNext(function(a) {
				return !(Z(a) || aa(a) || p(a))
			}))
		}

		function f(a) {
			this.upper = a[0];
			this.lower = a[1];
			this.set.apply(this, a.slice(2))
		}

		function b(a) {
			var b = a.element;
			if (b && n(b) && (b = b.getAscendant(a.triggers, !0)) && a.editable.contains(b)) {
				var c = k(b);
				if ("true" == c.getAttribute("contenteditable")) return b;
				if (c.is(a.triggers)) return c
			}
			return null
		}

		function c(a, b, c) {
			q(a, b);
			q(a, c);
			a = b.size.bottom;
			c = c.size.top;
			return a && c ? 0 | (a + c) / 2 : a || c
		}

		function e(a, b, c) {
			return b = b[c ? "getPrevious" : "getNext"](function(b) {
				return b && b.type == CKEDITOR.NODE_TEXT && !Z(b) || n(b) && !p(b) && !g(a, b)
			})
		}

		function l(a, b, c) {
			return a > b && a < c
		}

		function k(a, b) {
			if (a.data("cke-editable")) return null;
			for (b || (a = a.getParent()); a && !a.data("cke-editable");) {
				if (a.hasAttribute("contenteditable")) return a;
				a = a.getParent()
			}
			return null
		}

		function d(a) {
			var b = a.doc,
				c = G('\x3cspan contenteditable\x3d"false" style\x3d"' + S + "position:absolute;border-top:1px dashed " + a.boxColor + '"\x3e\x3c/span\x3e', b),
				d = CKEDITOR.getUrl(this.path + "images/" + (F.hidpi ? "hidpi/" : "") + "icon" + (a.rtl ? "-rtl" : "") + ".png");
			C(c, {
				attach: function() {
					this.wrap.getParent() || this.wrap.appendTo(a.editable, !0);
					return this
				},
				lineChildren: [C(G('\x3cspan title\x3d"' + a.editor.lang.magicline.title + '" contenteditable\x3d"false"\x3e\x26#8629;\x3c/span\x3e', b), {
					base: S + "height:17px;width:17px;" + (a.rtl ? "left" : "right") + ":17px;background:url(" + d + ") center no-repeat " + a.boxColor + ";cursor:pointer;" + (F.hc ? "font-size: 15px;line-height:14px;border:1px solid #fff;text-align:center;" : "") + (F.hidpi ? "background-size: 9px 10px;" : ""),
					looks: ["top:-8px; border-radius: 2px;", "top:-17px; border-radius: 2px 2px 0px 0px;", "top:-1px; border-radius: 0px 0px 2px 2px;"]
				}), C(G(Y, b), {
					base: R + "left:0px;border-left-color:" + a.boxColor + ";",
					looks: ["border-width:8px 0 8px 8px;top:-8px", "border-width:8px 0 0 8px;top:-8px", "border-width:0 0 8px 8px;top:0px"]
				}), C(G(Y, b), {
					base: R + "right:0px;border-right-color:" + a.boxColor + ";",
					looks: ["border-width:8px 8px 8px 0;top:-8px", "border-width:8px 8px 0 0;top:-8px", "border-width:0 8px 8px 0;top:0px"]
				})],
				detach: function() {
					this.wrap.getParent() && this.wrap.remove();
					return this
				},
				mouseNear: function() {
					q(a, this);
					var b = a.holdDistance,
						c = this.size;
					return c && l(a.mouse.y, c.top - b, c.bottom + b) && l(a.mouse.x, c.left - b, c.right + b) ? !0 : !1
				},
				place: function() {
					var b = a.view,
						c = a.editable,
						d = a.trigger,
						e = d.upper,
						f = d.lower,
						g = e || f,
						h = g.getParent(),
						k = {};
					this.trigger = d;
					e && q(a, e, !0);
					f && q(a, f, !0);
					q(a, h, !0);
					a.inInlineMode && w(a, !0);
					h.equals(c) ? (k.left = b.scroll.x, k.right = -b.scroll.x, k.width = "") : (k.left = g.size.left - g.size.margin.left + b.scroll.x - (a.inInlineMode ? b.editable.left + b.editable.border.left : 0), k.width = g.size.outerWidth + g.size.margin.left + g.size.margin.right + b.scroll.x, k.right = "");
					e && f ? k.top = e.size.margin.bottom === f.size.margin.top ? 0 | e.size.bottom + e.size.margin.bottom / 2 : e.size.margin.bottom < f.size.margin.top ? e.size.bottom + e.size.margin.bottom : e.size.bottom + e.size.margin.bottom - f.size.margin.top : e ? f || (k.top = e.size.bottom + e.size.margin.bottom) : k.top = f.size.top - f.size.margin.top;
					d.is(O) || l(k.top, b.scroll.y - 15, b.scroll.y + 5) ? (k.top = a.inInlineMode ? 0 : b.scroll.y, this.look(O)) : d.is(K) || l(k.top, b.pane.bottom - 5, b.pane.bottom + 15) ? (k.top = a.inInlineMode ? b.editable.height + b.editable.padding.top + b.editable.padding.bottom : b.pane.bottom - 1, this.look(K)) : (a.inInlineMode && (k.top -= b.editable.top + b.editable.border.top), this.look(U));
					a.inInlineMode && (k.top--, k.top += b.editable.scroll.top, k.left += b.editable.scroll.left);
					for (var m in k) k[m] = CKEDITOR.tools.cssLength(k[m]);
					this.setStyles(k)
				},
				look: function(a) {
					if (this.oldLook != a) {
						for (var b = this.lineChildren.length, c; b--;)(c = this.lineChildren[b]).setAttribute("style", c.base + c.looks[0 | a / 2]);
						this.oldLook = a
					}
				},
				wrap: new E("span", a.doc)
			});
			for (b = c.lineChildren.length; b--;) c.lineChildren[b].appendTo(c);
			c.look(U);
			c.appendTo(c.wrap);
			c.unselectable();
			c.lineChildren[0].on("mouseup", function(b) {
				c.detach();
				h(a, function(b) {
					var c = a.line.trigger;
					b[c.is(L) ? "insertBefore" : "insertAfter"](c.is(L) ? c.lower : c.upper)
				}, !0);
				a.editor.focus();
				F.ie || a.enterMode == CKEDITOR.ENTER_BR || a.hotNode.scrollIntoView();
				b.data.preventDefault(!0)
			});
			c.on("mousedown", function(a) {
				a.data.preventDefault(!0)
			});
			a.line = c
		}

		function h(a, b, c) {
			var d = new CKEDITOR.dom.range(a.doc),
				e = a.editor,
				f;
			F.ie && a.enterMode == CKEDITOR.ENTER_BR ? f = a.doc.createText(V) : (f = (f = k(a.element, !0)) && f.data("cke-enter-mode") || a.enterMode, f = new E(M[f], a.doc), f.is("br") || a.doc.createText(V).appendTo(f));
			c && e.fire("saveSnapshot");
			b(f);
			d.moveToPosition(f, CKEDITOR.POSITION_AFTER_START);
			e.getSelection().selectRanges([d]);
			a.hotNode = f;
			c && e.fire("saveSnapshot")
		}

		function m(a, c) {
			return {
				canUndo: !0,
				modes: {
					wysiwyg: 1
				},
				exec: function() {
					function d(b) {
						var e = F.ie && 9 > F.version ? " " : V,
							f = a.hotNode && a.hotNode.getText() == e && a.element.equals(a.hotNode) && a.lastCmdDirection === !!c;
						h(a, function(d) {
							f && a.hotNode && a.hotNode.remove();
							d[c ? "insertAfter" : "insertBefore"](b);
							d.setAttributes({
								"data-cke-magicline-hot": 1,
								"data-cke-magicline-dir": !!c
							});
							a.lastCmdDirection = !!c
						});
						F.ie || a.enterMode == CKEDITOR.ENTER_BR || a.hotNode.scrollIntoView();
						a.line.detach()
					}
					return function(f) {
						f = f.getSelection().getStartElement();
						var g;
						f = f.getAscendant(Q, 1);
						if (!v(a, f) && f && !f.equals(a.editable) && !f.contains(a.editable)) {
							(g = k(f)) && "false" == g.getAttribute("contenteditable") && (f = g);
							a.element = f;
							g = e(a, f, !c);
							var h;
							n(g) && g.is(a.triggers) && g.is(P) && (!e(a, g, !c) || (h = e(a, g, !c)) && n(h) && h.is(a.triggers)) ? d(g) : (h = b(a, f), n(h) && (e(a, h, !c) ? (f = e(a, h, !c)) && n(f) && f.is(a.triggers) && d(h) : d(h)))
						}
					}
				}()
			}
		}

		function g(a, b) {
			if (!b || b.type != CKEDITOR.NODE_ELEMENT || !b.$) return !1;
			var c = a.line;
			return c.wrap.equals(b) || c.wrap.contains(b)
		}

		function n(a) {
			return a && a.type == CKEDITOR.NODE_ELEMENT && a.$
		}

		function p(a) {
			if (!n(a)) return !1;
			var b;
			(b = r(a)) || (n(a) ? (b = {
				left: 1,
				right: 1,
				center: 1
			}, b = !(!b[a.getComputedStyle("float")] && !b[a.getAttribute("align")])) : b = !1);
			return b
		}

		function r(a) {
			return !!{
				absolute: 1,
				fixed: 1
			}[a.getComputedStyle("position")]
		}

		function x(a, b) {
			return n(b) ? b.is(a.triggers) : null
		}

		function v(a, b) {
			if (!b) return !1;
			for (var c = b.getParents(1), d = c.length; d--;)
				for (var e = a.tabuList.length; e--;)
					if (c[d].hasAttribute(a.tabuList[e])) return !0;
			return !1
		}

		function u(a, b, c) {
			b = b[c ? "getLast" : "getFirst"](function(b) {
				return a.isRelevant(b) && !b.is(fa)
			});
			if (!b) return !1;
			q(a, b);
			return c ? b.size.top > a.mouse.y : b.size.bottom < a.mouse.y
		}

		function t(a) {
			var b = a.editable,
				c = a.mouse,
				d = a.view,
				e = a.triggerOffset;
			w(a);
			var h = c.y > (a.inInlineMode ? d.editable.top + d.editable.height / 2 : Math.min(d.editable.height, d.pane.height) / 2),
				b = b[h ? "getLast" : "getFirst"](function(a) {
					return !(Z(a) || aa(a))
				});
			if (!b) return null;
			g(a, b) && (b = a.line.wrap[h ? "getPrevious" : "getNext"](function(a) {
				return !(Z(a) || aa(a))
			}));
			if (!n(b) || p(b) || !x(a, b)) return null;
			q(a, b);
			return !h && 0 <= b.size.top && l(c.y, 0, b.size.top + e) ? (a = a.inInlineMode || 0 === d.scroll.y ? O : U, new f([null, b, L, I, a])) : h && b.size.bottom <= d.pane.height && l(c.y, b.size.bottom - e, d.pane.height) ? (a = a.inInlineMode || l(b.size.bottom, d.pane.height - e, d.pane.height) ? K : U, new f([b, null, D, I, a])) : null
		}

		function y(a) {
			var c = a.mouse,
				d = a.view,
				g = a.triggerOffset,
				h = b(a);
			if (!h) return null;
			q(a, h);
			var g = Math.min(g, 0 | h.size.outerHeight / 2),
				k = [],
				m, t;
			if (l(c.y, h.size.top - 1, h.size.top + g)) t = !1;
			else if (l(c.y, h.size.bottom - g, h.size.bottom + 1)) t = !0;
			else return null;
			if (p(h) || u(a, h, t) || h.getParent().is(ca)) return null;
			var v = e(a, h, !t);
			if (v) {
				if (v && v.type == CKEDITOR.NODE_TEXT) return null;
				if (n(v)) {
					if (p(v) || !x(a, v) || v.getParent().is(ca)) return null;
					k = [v, h][t ? "reverse" : "concat"]().concat([T, I])
				}
			} else h.equals(a.editable[t ? "getLast" : "getFirst"](a.isRelevant)) ? (w(a), t && l(c.y, h.size.bottom - g, d.pane.height) && l(h.size.bottom, d.pane.height - g, d.pane.height) ? m = K : l(c.y, 0, h.size.top + g) && (m = O)) : m = U, k = [null, h][t ? "reverse" : "concat"]().concat([t ? D : L, I, m, h.equals(a.editable[t ? "getLast" : "getFirst"](a.isRelevant)) ? t ? K : O : U]);
			return 0 in k ? new f(k) : null
		}

		function A(a, b, c, d) {
			for (var e = b.getDocumentPosition(),
					f = {}, g = {}, h = {}, k = {}, l = ba.length; l--;) f[ba[l]] = parseInt(b.getComputedStyle.call(b, "border-" + ba[l] + "-width"), 10) || 0, h[ba[l]] = parseInt(b.getComputedStyle.call(b, "padding-" + ba[l]), 10) || 0, g[ba[l]] = parseInt(b.getComputedStyle.call(b, "margin-" + ba[l]), 10) || 0;
			c && !d || B(a, d);
			k.top = e.y - (c ? 0 : a.view.scroll.y);
			k.left = e.x - (c ? 0 : a.view.scroll.x);
			k.outerWidth = b.$.offsetWidth;
			k.outerHeight = b.$.offsetHeight;
			k.height = k.outerHeight - (h.top + h.bottom + f.top + f.bottom);
			k.width = k.outerWidth - (h.left + h.right + f.left + f.right);
			k.bottom = k.top + k.outerHeight;
			k.right = k.left + k.outerWidth;
			a.inInlineMode && (k.scroll = {
				top: b.$.scrollTop,
				left: b.$.scrollLeft
			});
			return C({
				border: f,
				padding: h,
				margin: g,
				ignoreScroll: c
			}, k, !0)
		}

		function q(a, b, c) {
			if (!n(b)) return b.size = null;
			if (!b.size) b.size = {};
			else if (b.size.ignoreScroll == c && b.size.date > new Date - N) return null;
			return C(b.size, A(a, b, c), {
				date: +new Date
			}, !0)
		}

		function w(a, b) {
			a.view.editable = A(a, a.editable, b, !0)
		}

		function B(a, b) {
			a.view || (a.view = {});
			var c = a.view;
			if (!(!b && c && c.date > new Date - N)) {
				var d = a.win,
					c = d.getScrollPosition(),
					d = d.getViewPaneSize();
				C(a.view, {
					scroll: {
						x: c.x,
						y: c.y,
						width: a.doc.$.documentElement.scrollWidth - d.width,
						height: a.doc.$.documentElement.scrollHeight - d.height
					},
					pane: {
						width: d.width,
						height: d.height,
						bottom: d.height + c.y
					},
					date: +new Date
				}, !0)
			}
		}

		function z(a, b, c, d) {
			for (var e = d, g = d, h = 0, k = !1, l = !1, m = a.view.pane.height, q = a.mouse; q.y + h < m && 0 < q.y - h;) {
				k || (k = b(e, d));
				l || (l = b(g, d));
				!k && 0 < q.y - h && (e = c(a, {
					x: q.x,
					y: q.y - h
				}));
				!l && q.y + h < m && (g = c(a, {
					x: q.x,
					y: q.y + h
				}));
				if (k && l) break;
				h += 2
			}
			return new f([e, g, null,
				null
			])
		}
		CKEDITOR.plugins.add("magicline", {
			init: function(a) {
				var c = a.config,
					k = c.magicline_triggerOffset || 30,
					l = {
						editor: a,
						enterMode: c.enterMode,
						triggerOffset: k,
						holdDistance: 0 | k * (c.magicline_holdDistance || .5),
						boxColor: c.magicline_color || "#ff0000",
						rtl: "rtl" == c.contentsLangDirection,
						tabuList: ["data-cke-hidden-sel"].concat(c.magicline_tabuList || []),
						triggers: c.magicline_everywhere ? Q : {
							table: 1,
							hr: 1,
							div: 1,
							ul: 1,
							ol: 1,
							dl: 1,
							form: 1,
							blockquote: 1
						}
					},
					q, u, z;
				l.isRelevant = function(a) {
					return n(a) && !g(l, a) && !p(a)
				};
				a.on("contentDom", function() {
					var k = a.editable(),
						n = a.document,
						p = a.window;
					C(l, {
						editable: k,
						inInlineMode: k.isInline(),
						doc: n,
						win: p,
						hotNode: null
					}, !0);
					l.boundary = l.inInlineMode ? l.editable : l.doc.getDocumentElement();
					k.is(H.$inline) || (l.inInlineMode && !r(k) && k.setStyles({
						position: "relative",
						top: null,
						left: null
					}), d.call(this, l), B(l), k.attachListener(a, "beforeUndoImage", function() {
						l.line.detach()
					}), k.attachListener(a, "beforeGetData", function() {
						l.line.wrap.getParent() && (l.line.detach(), a.once("getData", function() {
							l.line.attach()
						}, null, null, 1E3))
					}, null, null, 0), k.attachListener(l.inInlineMode ? n : n.getWindow().getFrame(), "mouseout", function(b) {
						if ("wysiwyg" == a.mode)
							if (l.inInlineMode) {
								var c = b.data.$.clientX;
								b = b.data.$.clientY;
								B(l);
								w(l, !0);
								var d = l.view.editable,
									e = l.view.scroll;
								c > d.left - e.x && c < d.right - e.x && b > d.top - e.y && b < d.bottom - e.y || (clearTimeout(z), z = null, l.line.detach())
							} else clearTimeout(z), z = null, l.line.detach()
					}), k.attachListener(k, "keyup", function() {
						l.hiddenMode = 0
					}), k.attachListener(k, "keydown", function(b) {
						if ("wysiwyg" == a.mode) switch (b.data.getKeystroke()) {
							case 2228240:
							case 16:
								l.hiddenMode = 1, l.line.detach()
						}
					}), k.attachListener(l.inInlineMode ? k : n, "mousemove", function(b) {
						u = !0;
						if ("wysiwyg" == a.mode && !a.readOnly && !z) {
							var c = {
								x: b.data.$.clientX,
								y: b.data.$.clientY
							};
							z = setTimeout(function() {
								l.mouse = c;
								z = l.trigger = null;
								B(l);
								u && !l.hiddenMode && a.focusManager.hasFocus && !l.line.mouseNear() && (l.element = W(l, !0)) && ((l.trigger = t(l) || y(l) || X(l)) && !v(l, l.trigger.upper || l.trigger.lower) ? l.line.attach().place() : (l.trigger = null, l.line.detach()), u = !1)
							}, 30)
						}
					}), k.attachListener(p, "scroll", function() {
						"wysiwyg" == a.mode && (l.line.detach(), F.webkit && (l.hiddenMode = 1, clearTimeout(q), q = setTimeout(function() {
							l.mouseDown || (l.hiddenMode = 0)
						}, 50)))
					}), k.attachListener(J ? n : p, "mousedown", function() {
						"wysiwyg" == a.mode && (l.line.detach(), l.hiddenMode = 1, l.mouseDown = 1)
					}), k.attachListener(J ? n : p, "mouseup", function() {
						l.hiddenMode = 0;
						l.mouseDown = 0
					}), a.addCommand("accessPreviousSpace", m(l)), a.addCommand("accessNextSpace", m(l, !0)), a.setKeystroke([
						[c.magicline_keystrokePrevious, "accessPreviousSpace"],
						[c.magicline_keystrokeNext, "accessNextSpace"]
					]), a.on("loadSnapshot", function() {
						var b, c, d, e;
						for (e in {
								p: 1,
								br: 1,
								div: 1
							})
							for (b = a.document.getElementsByTag(e), d = b.count(); d--;)
								if ((c = b.getItem(d)).data("cke-magicline-hot")) {
									l.hotNode = c;
									l.lastCmdDirection = "true" === c.data("cke-magicline-dir") ? !0 : !1;
									return
								}
					}), this.backdoor = {
						accessFocusSpace: h,
						boxTrigger: f,
						isLine: g,
						getAscendantTrigger: b,
						getNonEmptyNeighbour: e,
						getSize: A,
						that: l,
						triggerEdge: y,
						triggerEditable: t,
						triggerExpand: X
					})
				}, this)
			}
		});
		var C = CKEDITOR.tools.extend,
			E = CKEDITOR.dom.element,
			G = E.createFromHtml,
			F = CKEDITOR.env,
			J = CKEDITOR.env.ie && 9 > CKEDITOR.env.version,
			H = CKEDITOR.dtd,
			M = {},
			L = 128,
			D = 64,
			T = 32,
			I = 16,
			O = 4,
			K = 2,
			U = 1,
			V = " ",
			ca = H.$listItem,
			fa = H.$tableContent,
			P = C({}, H.$nonEditable, H.$empty),
			Q = H.$block,
			N = 100,
			S = "width:0px;height:0px;padding:0px;margin:0px;display:block;z-index:9999;color:#fff;position:absolute;font-size: 0px;line-height:0px;",
			R = S + "border-color:transparent;display:block;border-style:solid;",
			Y = "\x3cspan\x3e" + V + "\x3c/span\x3e";
		M[CKEDITOR.ENTER_BR] = "br";
		M[CKEDITOR.ENTER_P] = "p";
		M[CKEDITOR.ENTER_DIV] = "div";
		f.prototype = {
			set: function(a, b, c) {
				this.properties = a + b + (c || U);
				return this
			},
			is: function(a) {
				return (this.properties & a) == a
			}
		};
		var W = function() {
				function a(b, c) {
					var d = b.$.elementFromPoint(c.x, c.y);
					return d && d.nodeType ? new CKEDITOR.dom.element(d) : null
				}
				return function(b, c, d) {
					if (!b.mouse) return null;
					var e = b.doc,
						f = b.line.wrap;
					d = d || b.mouse;
					var h = a(e, d);
					c && g(b, h) && (f.hide(), h = a(e, d), f.show());
					return !h || h.type != CKEDITOR.NODE_ELEMENT || !h.$ || F.ie && 9 > F.version && !b.boundary.equals(h) && !b.boundary.contains(h) ? null : h
				}
			}(),
			Z = CKEDITOR.dom.walker.whitespaces(),
			aa = CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_COMMENT),
			X = function() {
				function b(e) {
					var f = e.element,
						g, h, k;
					if (!n(f) || f.contains(e.editable) || f.isReadOnly()) return null;
					k = z(e, function(a, b) {
						return !b.equals(a)
					}, function(a, b) {
						return W(a, !0, b)
					}, f);
					g = k.upper;
					h = k.lower;
					if (a(e, g, h)) return k.set(T, 8);
					if (g && f.contains(g))
						for (; !g.getParent().equals(f);) g = g.getParent();
					else g = f.getFirst(function(a) {
						return d(e, a)
					});
					if (h && f.contains(h))
						for (; !h.getParent().equals(f);) h = h.getParent();
					else h = f.getLast(function(a) {
						return d(e, a)
					});
					if (!g || !h) return null;
					q(e, g);
					q(e, h);
					if (!l(e.mouse.y, g.size.top, h.size.bottom)) return null;
					for (var f = Number.MAX_VALUE, m, t, w, p; h && !h.equals(g) && (t = g.getNext(e.isRelevant));) m = Math.abs(c(e, g, t) - e.mouse.y), m < f && (f = m, w = g, p = t), g = t, q(e, g);
					if (!w || !p || !l(e.mouse.y, w.size.top, p.size.bottom)) return null;
					k.upper = w;
					k.lower = p;
					return k.set(T, 8)
				}

				function d(a, b) {
					return !(b && b.type == CKEDITOR.NODE_TEXT || aa(b) || p(b) || g(a, b) || b.type == CKEDITOR.NODE_ELEMENT && b.$ && b.is("br"))
				}
				return function(c) {
					var d = b(c),
						e;
					if (e = d) {
						e = d.upper;
						var f = d.lower;
						e = !e || !f || p(f) || p(e) || f.equals(e) || e.equals(f) || f.contains(e) || e.contains(f) ? !1 : x(c, e) && x(c, f) && a(c, e, f) ? !0 : !1
					}
					return e ? d : null
				}
			}(),
			ba = ["top", "left", "right", "bottom"]
	}(), CKEDITOR.config.magicline_keystrokePrevious = CKEDITOR.CTRL + CKEDITOR.SHIFT + 51, CKEDITOR.config.magicline_keystrokeNext = CKEDITOR.CTRL + CKEDITOR.SHIFT + 52, function() {
		function a(a) {
			if (!a || a.type != CKEDITOR.NODE_ELEMENT || "form" != a.getName()) return [];
			for (var b = [], c = ["style", "className"],
					e = 0; e < c.length; e++) {
				var f = a.$.elements.namedItem(c[e]);
				f && (f = new CKEDITOR.dom.element(f), b.push([f, f.nextSibling]), f.remove())
			}
			return b
		}

		function f(a, b) {
			if (a && a.type == CKEDITOR.NODE_ELEMENT && "form" == a.getName() && 0 < b.length)
				for (var c = b.length - 1; 0 <= c; c--) {
					var e = b[c][0],
						f = b[c][1];
					f ? e.insertBefore(f) : e.appendTo(a)
				}
		}

		function b(b, c) {
			var d = a(b),
				e = {},
				m = b.$;
			c || (e["class"] = m.className || "", m.className = "");
			e.inline = m.style.cssText || "";
			c || (m.style.cssText = "position: static; overflow: visible");
			f(d);
			return e
		}

		function c(b, c) {
			var d = a(b),
				e = b.$;
			"class" in c && (e.className = c["class"]);
			"inline" in c && (e.style.cssText = c.inline);
			f(d)
		}

		function e(a) {
			if (!a.editable().isInline()) {
				var b = CKEDITOR.instances,
					c;
				for (c in b) {
					var e = b[c];
					"wysiwyg" != e.mode || e.readOnly || (e = e.document.getBody(), e.setAttribute("contentEditable", !1), e.setAttribute("contentEditable", !0))
				}
				a.editable().hasFocus && (a.toolbox.focus(), a.focus())
			}
		}
		CKEDITOR.plugins.add("maximize", {
			init: function(a) {
				function f() {
					var b = m.getViewPaneSize();
					a.resize(b.width, b.height, null, !0)
				}
				if (a.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
					var d = a.lang,
						h = CKEDITOR.document,
						m = h.getWindow(),
						g, n, p, r = CKEDITOR.TRISTATE_OFF;
					a.addCommand("maximize", {
						modes: {
							wysiwyg: !CKEDITOR.env.iOS,
							source: !CKEDITOR.env.iOS
						},
						readOnly: 1,
						editorFocus: !1,
						exec: function() {
							var x = a.container.getFirst(function(a) {
									return a.type == CKEDITOR.NODE_ELEMENT && a.hasClass("cke_inner")
								}),
								v = a.ui.space("contents");
							if ("wysiwyg" == a.mode) {
								var u = a.getSelection();
								g = u && u.getRanges();
								n = m.getScrollPosition()
							} else {
								var t = a.editable().$;
								g = !CKEDITOR.env.ie && [t.selectionStart, t.selectionEnd];
								n = [t.scrollLeft, t.scrollTop]
							}
							if (this.state == CKEDITOR.TRISTATE_OFF) {
								m.on("resize", f);
								p = m.getScrollPosition();
								for (u = a.container; u = u.getParent();) u.setCustomData("maximize_saved_styles", b(u)), u.setStyle("z-index", a.config.baseFloatZIndex - 5);
								v.setCustomData("maximize_saved_styles", b(v, !0));
								x.setCustomData("maximize_saved_styles", b(x, !0));
								v = {
									overflow: CKEDITOR.env.webkit ? "" : "hidden",
									width: 0,
									height: 0
								};
								h.getDocumentElement().setStyles(v);
								!CKEDITOR.env.gecko && h.getDocumentElement().setStyle("position", "fixed");
								CKEDITOR.env.gecko && CKEDITOR.env.quirks || h.getBody().setStyles(v);
								CKEDITOR.env.ie ? setTimeout(function() {
									m.$.scrollTo(0, 0)
								}, 0) : m.$.scrollTo(0, 0);
								x.setStyle("position", CKEDITOR.env.gecko && CKEDITOR.env.quirks ? "fixed" : "absolute");
								x.$.offsetLeft;
								x.setStyles({
									"z-index": a.config.baseFloatZIndex - 5,
									left: "0px",
									top: "0px"
								});
								x.addClass("cke_maximized");
								f();
								v = x.getDocumentPosition();
								x.setStyles({
									left: -1 * v.x + "px",
									top: -1 * v.y + "px"
								});
								CKEDITOR.env.gecko && e(a)
							} else if (this.state == CKEDITOR.TRISTATE_ON) {
								m.removeListener("resize", f);
								for (var u = [v, x], y = 0; y < u.length; y++) c(u[y], u[y].getCustomData("maximize_saved_styles")), u[y].removeCustomData("maximize_saved_styles");
								for (u = a.container; u = u.getParent();) c(u, u.getCustomData("maximize_saved_styles")), u.removeCustomData("maximize_saved_styles");
								CKEDITOR.env.ie ? setTimeout(function() {
									m.$.scrollTo(p.x, p.y)
								}, 0) : m.$.scrollTo(p.x, p.y);
								x.removeClass("cke_maximized");
								CKEDITOR.env.webkit && (x.setStyle("display", "inline"), setTimeout(function() {
									x.setStyle("display", "block")
								}, 0));
								a.fire("resize", {
									outerHeight: a.container.$.offsetHeight,
									contentsHeight: v.$.offsetHeight,
									outerWidth: a.container.$.offsetWidth
								})
							}
							this.toggleState();
							if (u = this.uiItems[0]) v = this.state == CKEDITOR.TRISTATE_OFF ? d.maximize.maximize : d.maximize.minimize, u = CKEDITOR.document.getById(u._.id), u.getChild(1).setHtml(v), u.setAttribute("title", v), u.setAttribute("href", 'javascript:void("' + v + '");');
							"wysiwyg" == a.mode ? g ? (CKEDITOR.env.gecko && e(a), a.getSelection().selectRanges(g), (t = a.getSelection().getStartElement()) && t.scrollIntoView(!0)) : m.$.scrollTo(n.x, n.y) : (g && (t.selectionStart = g[0], t.selectionEnd = g[1]), t.scrollLeft = n[0], t.scrollTop = n[1]);
							g = n = null;
							r = this.state;
							a.fire("maximize", this.state)
						},
						canUndo: !1
					});
					a.ui.addButton && a.ui.addButton("Maximize", {
						label: d.maximize.maximize,
						command: "maximize",
						toolbar: "tools,10"
					});
					a.on("mode", function() {
						var b = a.getCommand("maximize");
						b.setState(b.state == CKEDITOR.TRISTATE_DISABLED ? CKEDITOR.TRISTATE_DISABLED : r)
					}, null, null, 100)
				}
			}
		})
	}(), function() {
		function a(a, b, c) {
			var e = CKEDITOR.cleanWord;
			e ? c() : (a = CKEDITOR.getUrl(a.config.pasteFromWordCleanupFile || b + "filter/default.js"), CKEDITOR.scriptLoader.load(a, c, null, !0));
			return !e
		}
		CKEDITOR.plugins.add("pastefromword", {
			requires: "clipboard",
			init: function(f) {
				var b = 0,
					c = this.path;
				f.addCommand("pastefromword", {
					canUndo: !1,
					async: !0,
					exec: function(a, c) {
						b = 1;
						a.execCommand("paste", {
							type: "html",
							notification: c && "undefined" !== typeof c.notification ? c.notification : !0
						})
					}
				});
				f.ui.addButton && f.ui.addButton("PasteFromWord", {
					label: f.lang.pastefromword.toolbar,
					command: "pastefromword",
					toolbar: "clipboard,50"
				});
				f.on("paste", function(e) {
					var l = e.data,
						k = (CKEDITOR.plugins.clipboard.isCustomDataTypesSupported ? l.dataTransfer.getData("text/html", !0) : null) || l.dataValue,
						d = {
							dataValue: k
						},
						h = /(class=\"?Mso|style=(?:\"|\')[^\"]*?\bmso\-|w:WordDocument|<o:\w+>|<\/font>)/,
						h = /<meta\s*name=(?:\"|\')?generator(?:\"|\')?\s*content=(?:\"|\')?microsoft/gi.test(k) || h.test(k);
					if (k && (b || h) && (!1 !== f.fire("pasteFromWord", d) || b)) {
						l.dontFilter = !0;
						var m = a(f, c, function() {
							if (m) f.fire("paste", l);
							else if (!f.config.pasteFromWordPromptCleanup || b || confirm(f.lang.pastefromword.confirmCleanup)) d.dataValue = CKEDITOR.cleanWord(d.dataValue, f), f.fire("afterPasteFromWord", d), l.dataValue = d.dataValue;
							b = 0
						});
						m && e.cancel()
					}
				}, null, null, 3)
			}
		})
	}(), function() {
		var a = {
			canUndo: !1,
			async: !0,
			exec: function(a, b) {
				var c = a.lang,
					e = CKEDITOR.tools.keystrokeToString(c.common.keyboard, a.getCommandKeystroke(CKEDITOR.env.ie ? a.commands.paste : this)),
					l = b && "undefined" !== typeof b.notification ? b.notification : !b || !b.from || "keystrokeHandler" === b.from && CKEDITOR.env.ie,
					c = l && "string" === typeof l ? l : c.pastetext.pasteNotification.replace(/%1/, '\x3ckbd aria-label\x3d"' + e.aria + '"\x3e' + e.display + "\x3c/kbd\x3e");
				a.execCommand("paste", {
					type: "text",
					notification: l ? c : !1
				})
			}
		};
		CKEDITOR.plugins.add("pastetext", {
			requires: "clipboard",
			init: function(f) {
				var b = CKEDITOR.env.safari ? CKEDITOR.CTRL + CKEDITOR.ALT + CKEDITOR.SHIFT + 86 : CKEDITOR.CTRL + CKEDITOR.SHIFT + 86;
				f.addCommand("pastetext", a);
				f.setKeystroke(b, "pastetext");
				f.ui.addButton && f.ui.addButton("PasteText", {
					label: f.lang.pastetext.button,
					command: "pastetext",
					toolbar: "clipboard,40"
				});
				if (f.config.forcePasteAsPlainText) f.on("beforePaste", function(a) {
					"html" != a.data.type && (a.data.type = "text")
				});
				f.on("pasteState", function(a) {
					f.getCommand("pastetext").setState(a.data)
				})
			}
		})
	}(), CKEDITOR.plugins.add("removeformat", {
		init: function(a) {
			a.addCommand("removeFormat", CKEDITOR.plugins.removeformat.commands.removeformat);
			a.ui.addButton && a.ui.addButton("RemoveFormat", {
				label: a.lang.removeformat.toolbar,
				command: "removeFormat",
				toolbar: "cleanup,10"
			})
		}
	}), CKEDITOR.plugins.removeformat = {
		commands: {
			removeformat: {
				exec: function(a) {
					for (var f = a._.removeFormatRegex || (a._.removeFormatRegex = new RegExp("^(?:" + a.config.removeFormatTags.replace(/,/g, "|") + ")$", "i")), b = a._.removeAttributes || (a._.removeAttributes = a.config.removeFormatAttributes.split(",")), c = CKEDITOR.plugins.removeformat.filter, e = a.getSelection().getRanges(), l = e.createIterator(), k = function(a) {
							return a.type == CKEDITOR.NODE_ELEMENT
						}, d; d = l.getNextRange();) {
						d.collapsed || d.enlarge(CKEDITOR.ENLARGE_ELEMENT);
						var h = d.createBookmark(),
							m = h.startNode,
							g = h.endNode,
							n = function(b) {
								for (var d = a.elementPath(b), e = d.elements, g = 1, h;
									(h = e[g]) && !h.equals(d.block) && !h.equals(d.blockLimit); g++) f.test(h.getName()) && c(a, h) && b.breakParent(h)
							};
						n(m);
						if (g)
							for (n(g), m = m.getNextSourceNode(!0, CKEDITOR.NODE_ELEMENT); m && !m.equals(g);)
								if (m.isReadOnly()) {
									if (m.getPosition(g) & CKEDITOR.POSITION_CONTAINS) break;
									m = m.getNext(k)
								} else n = m.getNextSourceNode(!1, CKEDITOR.NODE_ELEMENT), "img" == m.getName() && m.data("cke-realelement") || !c(a, m) || (f.test(m.getName()) ? m.remove(1) : (m.removeAttributes(b), a.fire("removeFormatCleanup", m))), m = n;
						d.moveToBookmark(h)
					}
					a.forceNextSelectionCheck();
					a.getSelection().selectRanges(e)
				}
			}
		},
		filter: function(a, f) {
			for (var b = a._.removeFormatFilters || [], c = 0; c < b.length; c++)
				if (!1 === b[c](f)) return !1;
			return !0
		}
	}, CKEDITOR.editor.prototype.addRemoveFormatFilter = function(a) {
		this._.removeFormatFilters || (this._.removeFormatFilters = []);
		this._.removeFormatFilters.push(a)
	}, CKEDITOR.config.removeFormatTags = "b,big,cite,code,del,dfn,em,font,i,ins,kbd,q,s,samp,small,span,strike,strong,sub,sup,tt,u,var", CKEDITOR.config.removeFormatAttributes = "class,style,lang,width,height,align,hspace,valign", CKEDITOR.plugins.add("resize", {
		init: function(a) {
			function f(b) {
				var e = h.width,
					f = h.height,
					k = e + (b.data.$.screenX - d.x) * ("rtl" == l ? -1 : 1);
				b = f + (b.data.$.screenY - d.y);
				m && (e = Math.max(c.resize_minWidth, Math.min(k, c.resize_maxWidth)));
				g && (f = Math.max(c.resize_minHeight, Math.min(b, c.resize_maxHeight)));
				a.resize(m ? e : null, f)
			}

			function b() {
				CKEDITOR.document.removeListener("mousemove", f);
				CKEDITOR.document.removeListener("mouseup", b);
				a.document && (a.document.removeListener("mousemove", f), a.document.removeListener("mouseup", b))
			}
			var c = a.config,
				e = a.ui.spaceId("resizer"),
				l = a.element ? a.element.getDirection(1) : "ltr";
			!c.resize_dir && (c.resize_dir = "vertical");
			void 0 === c.resize_maxWidth && (c.resize_maxWidth = 3E3);
			void 0 === c.resize_maxHeight && (c.resize_maxHeight = 3E3);
			void 0 === c.resize_minWidth && (c.resize_minWidth = 750);
			void 0 === c.resize_minHeight && (c.resize_minHeight = 250);
			if (!1 !== c.resize_enabled) {
				var k = null,
					d, h, m = ("both" == c.resize_dir || "horizontal" == c.resize_dir) && c.resize_minWidth != c.resize_maxWidth,
					g = ("both" == c.resize_dir || "vertical" == c.resize_dir) && c.resize_minHeight != c.resize_maxHeight,
					n = CKEDITOR.tools.addFunction(function(e) {
						k || (k = a.getResizable());
						h = {
							width: k.$.offsetWidth || 0,
							height: k.$.offsetHeight || 0
						};
						d = {
							x: e.screenX,
							y: e.screenY
						};
						c.resize_minWidth > h.width && (c.resize_minWidth = h.width);
						c.resize_minHeight > h.height && (c.resize_minHeight = h.height);
						CKEDITOR.document.on("mousemove", f);
						CKEDITOR.document.on("mouseup", b);
						a.document && (a.document.on("mousemove", f), a.document.on("mouseup", b));
						e.preventDefault && e.preventDefault()
					});
				a.on("destroy", function() {
					CKEDITOR.tools.removeFunction(n)
				});
				a.on("uiSpace", function(b) {
					if ("bottom" == b.data.space) {
						var c = "";
						m && !g && (c = " cke_resizer_horizontal");
						!m && g && (c = " cke_resizer_vertical");
						var d = '\x3cspan id\x3d"' + e + '" class\x3d"cke_resizer' + c + " cke_resizer_" + l + '" title\x3d"' + CKEDITOR.tools.htmlEncode(a.lang.common.resize) + '" onmousedown\x3d"CKEDITOR.tools.callFunction(' + n + ', event)"\x3e' + ("ltr" == l ? "◢" : "◣") + "\x3c/span\x3e";
						"ltr" == l && "ltr" == c ? b.data.html += d : b.data.html = d + b.data.html
					}
				}, a, null, 100);
				a.on("maximize", function(b) {
					a.ui.space("resizer")[b.data == CKEDITOR.TRISTATE_ON ? "hide" : "show"]()
				})
			}
		}
	}), CKEDITOR.plugins.add("menubutton", {
		requires: "button,menu",
		onLoad: function() {
			var a = function(a) {
				var b = this._,
					c = b.menu;
				b.state !== CKEDITOR.TRISTATE_DISABLED && (b.on && c ? c.hide() : (b.previousState = b.state, c || (c = b.menu = new CKEDITOR.menu(a, {
					panel: {
						className: "cke_menu_panel",
						attributes: {
							"aria-label": a.lang.common.options
						}
					}
				}), c.onHide = CKEDITOR.tools.bind(function() {
					var c = this.command ? a.getCommand(this.command).modes : this.modes;
					this.setState(!c || c[a.mode] ? b.previousState : CKEDITOR.TRISTATE_DISABLED);
					b.on = 0
				}, this), this.onMenu && c.addListener(this.onMenu)), this.setState(CKEDITOR.TRISTATE_ON), b.on = 1, setTimeout(function() {
					c.show(CKEDITOR.document.getById(b.id), 4)
				}, 0)))
			};
			CKEDITOR.ui.menuButton = CKEDITOR.tools.createClass({
				base: CKEDITOR.ui.button,
				$: function(f) {
					delete f.panel;
					this.base(f);
					this.hasArrow = !0;
					this.click = a
				},
				statics: {
					handler: {
						create: function(a) {
							return new CKEDITOR.ui.menuButton(a)
						}
					}
				}
			})
		},
		beforeInit: function(a) {
			a.ui.addHandler(CKEDITOR.UI_MENUBUTTON, CKEDITOR.ui.menuButton.handler)
		}
	}), CKEDITOR.UI_MENUBUTTON = "menubutton", "use strict", CKEDITOR.plugins.add("scayt", {
		requires: "menubutton,dialog",
		tabToOpen: null,
		dialogName: "scaytDialog",
		onLoad: function(a) {
			CKEDITOR.plugins.scayt.onLoadTimestamp = (new Date).getTime();
			"moono-lisa" == (CKEDITOR.skinName || a.config.skin) && CKEDITOR.document.appendStyleSheet(this.path + "skins/" + CKEDITOR.skin.name + "/scayt.css");
			CKEDITOR.document.appendStyleSheet(this.path + "dialogs/dialog.css")
		},
		init: function(a) {
			var f = this,
				b = CKEDITOR.plugins.scayt;
			this.bindEvents(a);
			this.parseConfig(a);
			this.addRule(a);
			CKEDITOR.dialog.add(this.dialogName, CKEDITOR.getUrl(this.path + "dialogs/options.js"));
			this.addMenuItems(a);
			var c = a.lang.scayt,
				e = CKEDITOR.env;
			a.ui.add("Scayt", CKEDITOR.UI_MENUBUTTON, {
				label: c.text_title,
				title: a.plugins.wsc ? a.lang.wsc.title : c.text_title,
				modes: {
					wysiwyg: !(e.ie && (8 > e.version || e.quirks))
				},
				toolbar: "spellchecker,20",
				refresh: function() {
					var c = a.ui.instances.Scayt.getState();
					a.scayt && (c = b.state.scayt[a.name] ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF);
					a.fire("scaytButtonState", c)
				},
				onRender: function() {
					var b = this;
					a.on("scaytButtonState", function(a) {
						void 0 !== typeof a.data && b.setState(a.data)
					})
				},
				onMenu: function() {
					var c = a.scayt;
					a.getMenuItem("scaytToggle").label = a.lang.scayt[c && b.state.scayt[a.name] ? "btn_disable" : "btn_enable"];
					var e = {
						scaytToggle: CKEDITOR.TRISTATE_OFF,
						scaytOptions: c ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
						scaytLangs: c ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
						scaytDict: c ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
						scaytAbout: c ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
						WSC: a.plugins.wsc ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED
					};
					a.config.scayt_uiTabs[0] || delete e.scaytOptions;
					a.config.scayt_uiTabs[1] || delete e.scaytLangs;
					a.config.scayt_uiTabs[2] || delete e.scaytDict;
					c && !CKEDITOR.plugins.scayt.isNewUdSupported(c) && (delete e.scaytDict, a.config.scayt_uiTabs[2] = 0, CKEDITOR.plugins.scayt.alarmCompatibilityMessage());
					return e
				}
			});
			a.contextMenu && a.addMenuItems && (a.contextMenu.addListener(function(b, c) {
				var d = a.scayt,
					e, m;
				d && (m = d.getSelectionNode()) && (e = f.menuGenerator(a, m), d.showBanner("." + a.contextMenu._.definition.panel.className.split(" ").join(" .")));
				return e
			}), a.contextMenu._.onHide = CKEDITOR.tools.override(a.contextMenu._.onHide, function(b) {
				return function() {
					var c = a.scayt;
					c && c.hideBanner();
					return b.apply(this)
				}
			}))
		},
		addMenuItems: function(a) {
			var f = this,
				b = CKEDITOR.plugins.scayt;
			a.addMenuGroup("scaytButton");
			for (var c = a.config.scayt_contextMenuItemsOrder.split("|"),
					e = 0; e < c.length; e++) c[e] = "scayt_" + c[e];
			if ((c = ["grayt_description", "grayt_suggest", "grayt_control"].concat(c)) && c.length)
				for (e = 0; e < c.length; e++) a.addMenuGroup(c[e], e - 10);
			a.addCommand("scaytToggle", {
				exec: function(a) {
					var c = a.scayt;
					b.state.scayt[a.name] = !b.state.scayt[a.name];
					!0 === b.state.scayt[a.name] ? c || b.createScayt(a) : c && b.destroy(a)
				}
			});
			a.addCommand("scaytAbout", {
				exec: function(a) {
					a.scayt.tabToOpen = "about";
					a.lockSelection();
					a.openDialog(f.dialogName)
				}
			});
			a.addCommand("scaytOptions", {
				exec: function(a) {
					a.scayt.tabToOpen = "options";
					a.lockSelection();
					a.openDialog(f.dialogName)
				}
			});
			a.addCommand("scaytLangs", {
				exec: function(a) {
					a.scayt.tabToOpen = "langs";
					a.lockSelection();
					a.openDialog(f.dialogName)
				}
			});
			a.addCommand("scaytDict", {
				exec: function(a) {
					a.scayt.tabToOpen = "dictionaries";
					a.lockSelection();
					a.openDialog(f.dialogName)
				}
			});
			c = {
				scaytToggle: {
					label: a.lang.scayt.btn_enable,
					group: "scaytButton",
					command: "scaytToggle"
				},
				scaytAbout: {
					label: a.lang.scayt.btn_about,
					group: "scaytButton",
					command: "scaytAbout"
				},
				scaytOptions: {
					label: a.lang.scayt.btn_options,
					group: "scaytButton",
					command: "scaytOptions"
				},
				scaytLangs: {
					label: a.lang.scayt.btn_langs,
					group: "scaytButton",
					command: "scaytLangs"
				},
				scaytDict: {
					label: a.lang.scayt.btn_dictionaries,
					group: "scaytButton",
					command: "scaytDict"
				}
			};
			a.plugins.wsc && (c.WSC = {
				label: a.lang.wsc.toolbar,
				group: "scaytButton",
				onClick: function() {
					var b = CKEDITOR.plugins.scayt,
						c = a.scayt,
						d = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? a.container.getText() : a.document.getBody().getText();
					(d = d.replace(/\s/g, "")) ? (c && b.state.scayt[a.name] && c.setMarkupPaused && c.setMarkupPaused(!0), a.lockSelection(), a.execCommand("checkspell")) : alert("Nothing to check!")
				}
			});
			a.addMenuItems(c)
		},
		bindEvents: function(a) {
			var f = CKEDITOR.plugins.scayt,
				b = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE,
				c = function() {
					f.destroy(a)
				},
				e = function() {
					!f.state.scayt[a.name] || a.readOnly || a.scayt || f.createScayt(a)
				},
				l = function() {
					var c = a.editable();
					c.attachListener(c, "focus", function(c) {
						CKEDITOR.plugins.scayt && !a.scayt && setTimeout(e, 0);
						c = CKEDITOR.plugins.scayt && CKEDITOR.plugins.scayt.state.scayt[a.name] && a.scayt;
						var d, f;
						if ((b || c) && a._.savedSelection) {
							c = a._.savedSelection.getSelectedElement();
							c = !c && a._.savedSelection.getRanges();
							for (var k = 0; k < c.length; k++) f = c[k], "string" === typeof f.startContainer.$.nodeValue && (d = f.startContainer.getText().length, (d < f.startOffset || d < f.endOffset) && a.unlockSelection(!1))
						}
					}, this, null, -10)
				},
				k = function() {
					b ? a.config.scayt_inlineModeImmediateMarkup ? e() : (a.on("blur", function() {
						setTimeout(c, 0)
					}), a.on("focus", e), a.focusManager.hasFocus && e()) : e();
					l();
					var d = a.editable();
					d.attachListener(d, "mousedown", function(b) {
						b = b.data.getTarget();
						var c = a.widgets && a.widgets.getByElement(b);
						c && (c.wrapper = b.getAscendant(function(a) {
							return a.hasAttribute("data-cke-widget-wrapper")
						}, !0))
					}, this, null, -10)
				};
			a.on("contentDom", k);
			a.on("beforeCommandExec", function(b) {
				var c = a.scayt,
					e = !1,
					g = !1,
					k = !0;
				b.data.name in f.options.disablingCommandExec && "wysiwyg" == a.mode ? c && (f.destroy(a), a.fire("scaytButtonState", CKEDITOR.TRISTATE_DISABLED)) : "bold" !== b.data.name && "italic" !== b.data.name && "underline" !== b.data.name && "strike" !== b.data.name && "subscript" !== b.data.name && "superscript" !== b.data.name && "enter" !== b.data.name && "cut" !== b.data.name && "language" !== b.data.name || !c || ("cut" === b.data.name && (k = !1, g = !0), "language" === b.data.name && (g = e = !0), a.fire("reloadMarkupScayt", {
					removeOptions: {
						removeInside: k,
						forceBookmark: g,
						language: e
					},
					timeout: 0
				}))
			});
			a.on("beforeSetMode", function(b) {
				if ("source" == b.data) {
					if (b = a.scayt) f.destroy(a), a.fire("scaytButtonState", CKEDITOR.TRISTATE_DISABLED);
					a.document && a.document.getBody().removeAttribute("_jquid")
				}
			});
			a.on("afterCommandExec", function(b) {
				"wysiwyg" != a.mode || "undo" != b.data.name && "redo" != b.data.name || setTimeout(function() {
					f.reloadMarkup(a.scayt)
				}, 250)
			});
			a.on("readOnly", function(b) {
				var c;
				b && (c = a.scayt, !0 === b.editor.readOnly ? c && c.fire("removeMarkupInDocument", {}) : c ? f.reloadMarkup(c) : "wysiwyg" == b.editor.mode && !0 === f.state.scayt[b.editor.name] && (f.createScayt(a), b.editor.fire("scaytButtonState", CKEDITOR.TRISTATE_ON)))
			});
			a.on("beforeDestroy", c);
			a.on("setData", function() {
				c();
				(a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE || a.plugins.divarea) && k()
			}, this, null, 50);
			a.on("reloadMarkupScayt", function(b) {
				var c = b.data && b.data.removeOptions,
					e = b.data && b.data.timeout,
					g = b.data && b.data.language,
					k = a.scayt;
				k && setTimeout(function() {
					g && (c.selectionNode = a.plugins.language.getCurrentLangElement(a), c.selectionNode = c.selectionNode && c.selectionNode.$ || null);
					k.removeMarkupInSelectionNode(c);
					f.reloadMarkup(k)
				}, e || 0)
			});
			a.on("insertElement", function() {
				a.fire("reloadMarkupScayt", {
					removeOptions: {
						forceBookmark: !0
					}
				})
			}, this, null, 50);
			a.on("insertHtml", function() {
				a.scayt && a.scayt.setFocused && a.scayt.setFocused(!0);
				a.fire("reloadMarkupScayt")
			}, this, null, 50);
			a.on("insertText", function() {
				a.scayt && a.scayt.setFocused && a.scayt.setFocused(!0);
				a.fire("reloadMarkupScayt")
			}, this, null, 50);
			a.on("scaytDialogShown", function(b) {
				b.data.selectPage(a.scayt.tabToOpen)
			})
		},
		parseConfig: function(a) {
			var f = CKEDITOR.plugins.scayt;
			f.replaceOldOptionsNames(a.config);
			"boolean" !== typeof a.config.scayt_autoStartup && (a.config.scayt_autoStartup = !1);
			f.state.scayt[a.name] = a.config.scayt_autoStartup;
			"boolean" !== typeof a.config.grayt_autoStartup && (a.config.grayt_autoStartup = !1);
			"boolean" !== typeof a.config.scayt_inlineModeImmediateMarkup && (a.config.scayt_inlineModeImmediateMarkup = !1);
			f.state.grayt[a.name] = a.config.grayt_autoStartup;
			a.config.scayt_contextCommands || (a.config.scayt_contextCommands = "ignore|ignoreall|add");
			a.config.scayt_contextMenuItemsOrder || (a.config.scayt_contextMenuItemsOrder = "suggest|moresuggest|control");
			a.config.scayt_sLang || (a.config.scayt_sLang = "en_US");
			if (void 0 === a.config.scayt_maxSuggestions || "number" != typeof a.config.scayt_maxSuggestions || 0 > a.config.scayt_maxSuggestions) a.config.scayt_maxSuggestions = 5;
			if (void 0 === a.config.scayt_minWordLength || "number" != typeof a.config.scayt_minWordLength || 1 > a.config.scayt_minWordLength) a.config.scayt_minWordLength = 4;
			if (void 0 === a.config.scayt_customDictionaryIds || "string" !== typeof a.config.scayt_customDictionaryIds) a.config.scayt_customDictionaryIds = "";
			if (void 0 === a.config.scayt_userDictionaryName || "string" !== typeof a.config.scayt_userDictionaryName) a.config.scayt_userDictionaryName = null;
			if ("string" === typeof a.config.scayt_uiTabs && 3 === a.config.scayt_uiTabs.split(",").length) {
				var b = [],
					c = [];
				a.config.scayt_uiTabs = a.config.scayt_uiTabs.split(",");
				CKEDITOR.tools.search(a.config.scayt_uiTabs, function(a) {
					1 === Number(a) || 0 === Number(a) ? (c.push(!0), b.push(Number(a))) : c.push(!1)
				});
				null === CKEDITOR.tools.search(c, !1) ? a.config.scayt_uiTabs = b : a.config.scayt_uiTabs = [1, 1, 1]
			} else a.config.scayt_uiTabs = [1, 1, 1];
			"string" != typeof a.config.scayt_serviceProtocol && (a.config.scayt_serviceProtocol = null);
			"string" != typeof a.config.scayt_serviceHost && (a.config.scayt_serviceHost = null);
			"string" != typeof a.config.scayt_servicePort && (a.config.scayt_servicePort = null);
			"string" != typeof a.config.scayt_servicePath && (a.config.scayt_servicePath = null);
			a.config.scayt_moreSuggestions || (a.config.scayt_moreSuggestions = "on");
			"string" !== typeof a.config.scayt_customerId && (a.config.scayt_customerId = "1:WvF0D4-UtPqN1-43nkD4-NKvUm2-daQqk3-LmNiI-z7Ysb4-mwry24-T8YrS3-Q2tpq2");
			"string" !== typeof a.config.scayt_customPunctuation && (a.config.scayt_customPunctuation = "-");
			"string" !== typeof a.config.scayt_srcUrl && (f = document.location.protocol, f = -1 != f.search(/https?:/) ? f : "http:", a.config.scayt_srcUrl = f + "//svc.webspellchecker.net/spellcheck31/lf/scayt3/ckscayt/ckscayt.js");
			"boolean" !== typeof CKEDITOR.config.scayt_handleCheckDirty && (CKEDITOR.config.scayt_handleCheckDirty = !0);
			"boolean" !== typeof CKEDITOR.config.scayt_handleUndoRedo && (CKEDITOR.config.scayt_handleUndoRedo = !0);
			CKEDITOR.config.scayt_handleUndoRedo = CKEDITOR.plugins.undo ? CKEDITOR.config.scayt_handleUndoRedo : !1;
			"boolean" !== typeof a.config.scayt_multiLanguageMode && (a.config.scayt_multiLanguageMode = !1);
			"object" !== typeof a.config.scayt_multiLanguageStyles && (a.config.scayt_multiLanguageStyles = {});
			a.config.scayt_ignoreAllCapsWords && "boolean" !== typeof a.config.scayt_ignoreAllCapsWords && (a.config.scayt_ignoreAllCapsWords = !1);
			a.config.scayt_ignoreDomainNames && "boolean" !== typeof a.config.scayt_ignoreDomainNames && (a.config.scayt_ignoreDomainNames = !1);
			a.config.scayt_ignoreWordsWithMixedCases && "boolean" !== typeof a.config.scayt_ignoreWordsWithMixedCases && (a.config.scayt_ignoreWordsWithMixedCases = !1);
			a.config.scayt_ignoreWordsWithNumbers && "boolean" !== typeof a.config.scayt_ignoreWordsWithNumbers && (a.config.scayt_ignoreWordsWithNumbers = !1);
			if (a.config.scayt_disableOptionsStorage) {
				var f = CKEDITOR.tools.isArray(a.config.scayt_disableOptionsStorage) ? a.config.scayt_disableOptionsStorage : "string" === typeof a.config.scayt_disableOptionsStorage ? [a.config.scayt_disableOptionsStorage] : void 0,
					e = "all options lang ignore-all-caps-words ignore-domain-names ignore-words-with-mixed-cases ignore-words-with-numbers".split(" "),
					l = ["lang", "ignore-all-caps-words", "ignore-domain-names", "ignore-words-with-mixed-cases", "ignore-words-with-numbers"],
					k = CKEDITOR.tools.search,
					d = CKEDITOR.tools.indexOf;
				a.config.scayt_disableOptionsStorage = function(a) {
					for (var b = [], c = 0; c < a.length; c++) {
						var f = a[c],
							p = !!k(a, "options");
						if (!k(e, f) || p && k(l, function(a) {
								if ("lang" === a) return !1
							})) return;
						k(l, f) && l.splice(d(l, f), 1);
						if ("all" === f || p && k(a, "lang")) return [];
						"options" === f && (l = ["lang"])
					}
					return b = b.concat(l)
				}(f)
			}
		},
		addRule: function(a) {
			var f = CKEDITOR.plugins.scayt,
				b = a.dataProcessor,
				c = b && b.htmlFilter,
				e = a._.elementsPath && a._.elementsPath.filters,
				b = b && b.dataFilter,
				l = a.addRemoveFormatFilter,
				k = function(b) {
					if (a.scayt && (b.hasAttribute(f.options.data_attribute_name) || b.hasAttribute(f.options.problem_grammar_data_attribute))) return !1
				},
				d = function(b) {
					var c = !0;
					a.scayt && (b.hasAttribute(f.options.data_attribute_name) || b.hasAttribute(f.options.problem_grammar_data_attribute)) && (c = !1);
					return c
				};
			e && e.push(k);
			b && b.addRules({
				elements: {
					span: function(a) {
						var b = a.hasClass(f.options.misspelled_word_class) && a.attributes[f.options.data_attribute_name],
							c = a.hasClass(f.options.problem_grammar_class) && a.attributes[f.options.problem_grammar_data_attribute];
						f && (b || c) && delete a.name;
						return a
					}
				}
			});
			c && c.addRules({
				elements: {
					span: function(a) {
						var b = a.hasClass(f.options.misspelled_word_class) && a.attributes[f.options.data_attribute_name],
							c = a.hasClass(f.options.problem_grammar_class) && a.attributes[f.options.problem_grammar_data_attribute];
						f && (b || c) && delete a.name;
						return a
					}
				}
			});
			l && l.call(a, d)
		},
		scaytMenuDefinition: function(a) {
			var f = this;
			a = a.scayt;
			return {
				scayt: {
					scayt_ignore: {
						label: a.getLocal("btn_ignore"),
						group: "scayt_control",
						order: 1,
						exec: function(a) {
							a.scayt.ignoreWord()
						}
					},
					scayt_ignoreall: {
						label: a.getLocal("btn_ignoreAll"),
						group: "scayt_control",
						order: 2,
						exec: function(a) {
							a.scayt.ignoreAllWords()
						}
					},
					scayt_add: {
						label: a.getLocal("btn_addWord"),
						group: "scayt_control",
						order: 3,
						exec: function(a) {
							var c = a.scayt;
							setTimeout(function() {
								c.addWordToUserDictionary()
							}, 10)
						}
					},
					scayt_option: {
						label: a.getLocal("btn_options"),
						group: "scayt_control",
						order: 4,
						exec: function(a) {
							a.scayt.tabToOpen = "options";
							a.lockSelection();
							a.openDialog(f.dialogName)
						},
						verification: function(a) {
							return 1 == a.config.scayt_uiTabs[0] ? !0 : !1
						}
					},
					scayt_language: {
						label: a.getLocal("btn_langs"),
						group: "scayt_control",
						order: 5,
						exec: function(a) {
							a.scayt.tabToOpen = "langs";
							a.lockSelection();
							a.openDialog(f.dialogName)
						},
						verification: function(a) {
							return 1 == a.config.scayt_uiTabs[1] ? !0 : !1
						}
					},
					scayt_dictionary: {
						label: a.getLocal("btn_dictionaries"),
						group: "scayt_control",
						order: 6,
						exec: function(a) {
							a.scayt.tabToOpen = "dictionaries";
							a.lockSelection();
							a.openDialog(f.dialogName)
						},
						verification: function(a) {
							return 1 == a.config.scayt_uiTabs[2] ? !0 : !1
						}
					},
					scayt_about: {
						label: a.getLocal("btn_about"),
						group: "scayt_control",
						order: 7,
						exec: function(a) {
							a.scayt.tabToOpen = "about";
							a.lockSelection();
							a.openDialog(f.dialogName)
						}
					}
				},
				grayt: {
					grayt_problemdescription: {
						label: "Grammar problem description",
						group: "grayt_description",
						order: 1,
						state: CKEDITOR.TRISTATE_DISABLED,
						exec: function(a) {}
					},
					grayt_ignore: {
						label: a.getLocal("btn_ignore"),
						group: "grayt_control",
						order: 2,
						exec: function(a) {
							a.scayt.ignorePhrase()
						}
					}
				}
			}
		},
		buildSuggestionMenuItems: function(a, f, b) {
			var c = {},
				e = {},
				l = b ? "word" : "phrase",
				k = b ? "startGrammarCheck" : "startSpellCheck",
				d = a.scayt;
			if (0 < f.length && "no_any_suggestions" !== f[0])
				if (b)
					for (b = 0; b < f.length; b++) {
						var h = "scayt_suggest_" + CKEDITOR.plugins.scayt.suggestions[b].replace(" ", "_");
						a.addCommand(h, this.createCommand(CKEDITOR.plugins.scayt.suggestions[b], l, k));
						b < a.config.scayt_maxSuggestions ? (a.addMenuItem(h, {
							label: f[b],
							command: h,
							group: "scayt_suggest",
							order: b + 1
						}), c[h] = CKEDITOR.TRISTATE_OFF) : (a.addMenuItem(h, {
							label: f[b],
							command: h,
							group: "scayt_moresuggest",
							order: b + 1
						}), e[h] = CKEDITOR.TRISTATE_OFF, "on" === a.config.scayt_moreSuggestions && (a.addMenuItem("scayt_moresuggest", {
							label: d.getLocal("btn_moreSuggestions"),
							group: "scayt_moresuggest",
							order: 10,
							getItems: function() {
								return e
							}
						}), c.scayt_moresuggest = CKEDITOR.TRISTATE_OFF))
					} else
						for (b = 0; b < f.length; b++) h = "grayt_suggest_" + CKEDITOR.plugins.scayt.suggestions[b].replace(" ", "_"), a.addCommand(h, this.createCommand(CKEDITOR.plugins.scayt.suggestions[b], l, k)), a.addMenuItem(h, {
							label: f[b],
							command: h,
							group: "grayt_suggest",
							order: b + 1
						}), c[h] = CKEDITOR.TRISTATE_OFF;
				else c.no_scayt_suggest = CKEDITOR.TRISTATE_DISABLED, a.addCommand("no_scayt_suggest", {
					exec: function() {}
				}), a.addMenuItem("no_scayt_suggest", {
					label: d.getLocal("btn_noSuggestions") || "no_scayt_suggest",
					command: "no_scayt_suggest",
					group: "scayt_suggest",
					order: 0
				});
			return c
		},
		menuGenerator: function(a, f) {
			var b = a.scayt,
				c = this.scaytMenuDefinition(a),
				e = {},
				l = a.config.scayt_contextCommands.split("|"),
				k = f.getAttribute(b.getLangAttribute()) || b.getLang(),
				d, h;
			d = b.isScaytNode(f);
			h = b.isGraytNode(f);
			d ? (c = c.scayt, e = f.getAttribute(b.getScaytNodeAttributeName()), b.fire("getSuggestionsList", {
				lang: k,
				word: e
			}), e = this.buildSuggestionMenuItems(a, CKEDITOR.plugins.scayt.suggestions, d)) : h && (c = c.grayt, e = f.getAttribute(b.getGraytNodeAttributeName()), h = b.getProblemDescriptionText(e, k), c.grayt_problemdescription && h && (c.grayt_problemdescription.label = h), b.fire("getGrammarSuggestionsList", {
				lang: k,
				phrase: e
			}), e = this.buildSuggestionMenuItems(a, CKEDITOR.plugins.scayt.suggestions, d));
			if (d && "off" == a.config.scayt_contextCommands) return e;
			for (var m in c) d && -1 == CKEDITOR.tools.indexOf(l, m.replace("scayt_", "")) && "all" != a.config.scayt_contextCommands || (e[m] = "undefined" != typeof c[m].state ? c[m].state : CKEDITOR.TRISTATE_OFF, "function" !== typeof c[m].verification || c[m].verification(a) || delete e[m], a.addCommand(m, {
				exec: c[m].exec
			}), a.addMenuItem(m, {
				label: a.lang.scayt[c[m].label] || c[m].label,
				command: m,
				group: c[m].group,
				order: c[m].order
			}));
			return e
		},
		createCommand: function(a, f, b) {
			return {
				exec: function(c) {
					c = c.scayt;
					var e = {};
					e[f] = a;
					c.replaceSelectionNode(e);
					"startGrammarCheck" === b && c.removeMarkupInSelectionNode({
						grammarOnly: !0
					});
					c.fire(b)
				}
			}
		}
	}), CKEDITOR.plugins.scayt = {
		charsToObserve: [{
			charName: "cke-fillingChar",
			charCode: function() {
				var a = CKEDITOR.version.match(/^\d(\.\d*)*/),
					a = a && a[0],
					f;
				if (a) {
					f = "4.5.7";
					var b, a = a.replace(/\./g, "");
					f = f.replace(/\./g, "");
					b = a.length - f.length;
					b = 0 <= b ? b : 0;
					f = parseInt(a) >= parseInt(f) * Math.pow(10, b)
				}
				return f ? Array(7).join(String.fromCharCode(8203)) : String.fromCharCode(8203)
			}()
		}],
		onLoadTimestamp: "",
		state: {
			scayt: {},
			grayt: {}
		},
		warningCounter: 0,
		suggestions: [],
		options: {
			disablingCommandExec: {
				source: !0,
				newpage: !0,
				templates: !0
			},
			data_attribute_name: "data-scayt-word",
			misspelled_word_class: "scayt-misspell-word",
			problem_grammar_data_attribute: "data-grayt-phrase",
			problem_grammar_class: "gramm-problem"
		},
		backCompatibilityMap: {
			scayt_service_protocol: "scayt_serviceProtocol",
			scayt_service_host: "scayt_serviceHost",
			scayt_service_port: "scayt_servicePort",
			scayt_service_path: "scayt_servicePath",
			scayt_customerid: "scayt_customerId"
		},
		alarmCompatibilityMessage: function() {
			5 > this.warningCounter && (console.warn("You are using the latest version of SCAYT plugin for CKEditor with the old application version. In order to have access to the newest features, it is recommended to upgrade the application version to latest one as well. Contact us for more details at support@webspellchecker.net."), this.warningCounter += 1)
		},
		isNewUdSupported: function(a) {
			return a.getUserDictionary ? !0 : !1
		},
		reloadMarkup: function(a) {
			var f;
			a && (f = a.getScaytLangList(), a.reloadMarkup ? a.reloadMarkup() : (this.alarmCompatibilityMessage(), f && f.ltr && f.rtl && a.fire("startSpellCheck, startGrammarCheck")))
		},
		replaceOldOptionsNames: function(a) {
			for (var f in a) f in this.backCompatibilityMap && (a[this.backCompatibilityMap[f]] = a[f], delete a[f])
		},
		createScayt: function(a) {
			var f = this,
				b = CKEDITOR.plugins.scayt;
			this.loadScaytLibrary(a, function(a) {
				function e(a) {
					return new SCAYT.CKSCAYT(a, function() {}, function() {})
				}
				var l = a.window && a.window.getFrame() || a.editable();
				if (l) {
					l = {
						lang: a.config.scayt_sLang,
						container: l.$,
						customDictionary: a.config.scayt_customDictionaryIds,
						userDictionaryName: a.config.scayt_userDictionaryName,
						localization: a.langCode,
						customer_id: a.config.scayt_customerId,
						customPunctuation: a.config.scayt_customPunctuation,
						debug: a.config.scayt_debug,
						data_attribute_name: f.options.data_attribute_name,
						misspelled_word_class: f.options.misspelled_word_class,
						problem_grammar_data_attribute: f.options.problem_grammar_data_attribute,
						problem_grammar_class: f.options.problem_grammar_class,
						"options-to-restore": a.config.scayt_disableOptionsStorage,
						focused: a.editable().hasFocus,
						ignoreElementsRegex: a.config.scayt_elementsToIgnore,
						ignoreGraytElementsRegex: a.config.grayt_elementsToIgnore,
						minWordLength: a.config.scayt_minWordLength,
						multiLanguageMode: a.config.scayt_multiLanguageMode,
						multiLanguageStyles: a.config.scayt_multiLanguageStyles,
						graytAutoStartup: b.state.grayt[a.name],
						charsToObserve: b.charsToObserve
					};
					a.config.scayt_serviceProtocol && (l.service_protocol = a.config.scayt_serviceProtocol);
					a.config.scayt_serviceHost && (l.service_host = a.config.scayt_serviceHost);
					a.config.scayt_servicePort && (l.service_port = a.config.scayt_servicePort);
					a.config.scayt_servicePath && (l.service_path = a.config.scayt_servicePath);
					"boolean" === typeof a.config.scayt_ignoreAllCapsWords && (l["ignore-all-caps-words"] = a.config.scayt_ignoreAllCapsWords);
					"boolean" === typeof a.config.scayt_ignoreDomainNames && (l["ignore-domain-names"] = a.config.scayt_ignoreDomainNames);
					"boolean" === typeof a.config.scayt_ignoreWordsWithMixedCases && (l["ignore-words-with-mixed-cases"] = a.config.scayt_ignoreWordsWithMixedCases);
					"boolean" === typeof a.config.scayt_ignoreWordsWithNumbers && (l["ignore-words-with-numbers"] = a.config.scayt_ignoreWordsWithNumbers);
					var k;
					try {
						k = e(l)
					} catch (d) {
						f.alarmCompatibilityMessage(), delete l.charsToObserve, k = e(l)
					}
					k.subscribe("suggestionListSend", function(a) {
						for (var b = {}, c = [], d = 0; d < a.suggestionList.length; d++) b["word_" + a.suggestionList[d]] || (b["word_" + a.suggestionList[d]] = a.suggestionList[d], c.push(a.suggestionList[d]));
						CKEDITOR.plugins.scayt.suggestions = c
					});
					k.subscribe("selectionIsChanged", function(b) {
						a.getSelection().isLocked && a.lockSelection()
					});
					k.subscribe("graytStateChanged", function(d) {
						b.state.grayt[a.name] = d.state
					});
					k.addMarkupHandler && k.addMarkupHandler(function(b) {
						var d = a.editable(),
							e = d.getCustomData(b.charName);
						e && (e.$ = b.node, d.setCustomData(b.charName, e))
					});
					a.scayt = k;
					a.fire("scaytButtonState", a.readOnly ? CKEDITOR.TRISTATE_DISABLED : CKEDITOR.TRISTATE_ON)
				} else b.state.scayt[a.name] = !1
			})
		},
		destroy: function(a) {
			a.scayt && a.scayt.destroy();
			delete a.scayt;
			a.fire("scaytButtonState", CKEDITOR.TRISTATE_OFF)
		},
		loadScaytLibrary: function(a, f) {
			var b, c = function() {
				CKEDITOR.fireOnce("scaytReady");
				a.scayt || "function" === typeof f && f(a)
			};
			"undefined" === typeof window.SCAYT || "function" !== typeof window.SCAYT.CKSCAYT ? (b = a.config.scayt_srcUrl + "?" + this.onLoadTimestamp, CKEDITOR.scriptLoader.load(b, function(a) {
				a && c()
			})) : window.SCAYT && "function" === typeof window.SCAYT.CKSCAYT && c()
		}
	}, CKEDITOR.on("dialogDefinition", function(a) {
		var f = a.data.name;
		a = a.data.definition.dialog;
		if ("scaytDialog" === f) a.on("cancel", function(a) {
			return !1
		}, this, null, -1);
		if ("checkspell" === f) a.on("cancel", function(a) {
			a = a.sender && a.sender.getParentEditor();
			var c = CKEDITOR.plugins.scayt,
				e = a.scayt;
			e && c.state.scayt[a.name] && e.setMarkupPaused && e.setMarkupPaused(!1);
			a.unlockSelection()
		}, this, null, -2);
		if ("link" === f) a.on("ok", function(a) {
			var c = a.sender && a.sender.getParentEditor();
			c && setTimeout(function() {
				c.fire("reloadMarkupScayt", {
					removeOptions: {
						removeInside: !0,
						forceBookmark: !0
					},
					timeout: 0
				})
			}, 0)
		})
	}), CKEDITOR.on("scaytReady", function() {
		if (!0 === CKEDITOR.config.scayt_handleCheckDirty) {
			var a = CKEDITOR.editor.prototype;
			a.checkDirty = CKEDITOR.tools.override(a.checkDirty, function(a) {
				return function() {
					var c = null,
						e = this.scayt;
					if (CKEDITOR.plugins.scayt && CKEDITOR.plugins.scayt.state.scayt[this.name] && this.scayt) {
						if (c = "ready" == this.status) var f = e.removeMarkupFromString(this.getSnapshot()),
							e = e.removeMarkupFromString(this._.previousValue),
							c = c && e !== f
					} else c = a.call(this);
					return c
				}
			});
			a.resetDirty = CKEDITOR.tools.override(a.resetDirty, function(a) {
				return function() {
					var c = this.scayt;
					CKEDITOR.plugins.scayt && CKEDITOR.plugins.scayt.state.scayt[this.name] && this.scayt ? this._.previousValue = c.removeMarkupFromString(this.getSnapshot()) : a.call(this)
				}
			})
		}
		if (!0 === CKEDITOR.config.scayt_handleUndoRedo) {
			var a = CKEDITOR.plugins.undo.Image.prototype,
				f = "function" == typeof a.equalsContent ? "equalsContent" : "equals";
			a[f] = CKEDITOR.tools.override(a[f], function(a) {
				return function(c) {
					var e = c.editor.scayt,
						f = this.contents,
						k = c.contents,
						d = null;
					CKEDITOR.plugins.scayt && CKEDITOR.plugins.scayt.state.scayt[c.editor.name] && c.editor.scayt && (this.contents = e.removeMarkupFromString(f) || "", c.contents = e.removeMarkupFromString(k) || "");
					d = a.apply(this, arguments);
					this.contents = f;
					c.contents = k;
					return d
				}
			})
		}
	}), function() {
		var a = {
			preserveState: !0,
			editorFocus: !1,
			readOnly: 1,
			exec: function(a) {
				this.toggleState();
				this.refresh(a)
			},
			refresh: function(a) {
				if (a.document) {
					var b = this.state == CKEDITOR.TRISTATE_ON ? "attachClass" : "removeClass";
					a.editable()[b]("cke_show_borders")
				}
			}
		};
		CKEDITOR.plugins.add("showborders", {
			modes: {
				wysiwyg: 1
			},
			onLoad: function() {
				var a;
				a = (CKEDITOR.env.ie6Compat ? [".%1 table.%2,", ".%1 table.%2 td, .%1 table.%2 th", "{", "border : #d3d3d3 1px dotted", "}"] : ".%1 table.%2,;.%1 table.%2 \x3e tr \x3e td, .%1 table.%2 \x3e tr \x3e th,;.%1 table.%2 \x3e tbody \x3e tr \x3e td, .%1 table.%2 \x3e tbody \x3e tr \x3e th,;.%1 table.%2 \x3e thead \x3e tr \x3e td, .%1 table.%2 \x3e thead \x3e tr \x3e th,;.%1 table.%2 \x3e tfoot \x3e tr \x3e td, .%1 table.%2 \x3e tfoot \x3e tr \x3e th;{;border : #d3d3d3 1px dotted;}".split(";")).join("").replace(/%2/g, "cke_show_border").replace(/%1/g, "cke_show_borders ");
				CKEDITOR.addCss(a)
			},
			init: function(f) {
				var b = f.addCommand("showborders", a);
				b.canUndo = !1;
				!1 !== f.config.startupShowBorders && b.setState(CKEDITOR.TRISTATE_ON);
				f.on("mode", function() {
					b.state != CKEDITOR.TRISTATE_DISABLED && b.refresh(f)
				}, null, null, 100);
				f.on("contentDom", function() {
					b.state != CKEDITOR.TRISTATE_DISABLED && b.refresh(f)
				});
				f.on("removeFormatCleanup", function(a) {
					a = a.data;
					f.getCommand("showborders").state == CKEDITOR.TRISTATE_ON && a.is("table") && (!a.hasAttribute("border") || 0 >= parseInt(a.getAttribute("border"), 10)) && a.addClass("cke_show_border")
				})
			},
			afterInit: function(a) {
				var b = a.dataProcessor;
				a = b && b.dataFilter;
				b = b && b.htmlFilter;
				a && a.addRules({
					elements: {
						table: function(a) {
							a = a.attributes;
							var b = a["class"],
								f = parseInt(a.border, 10);
							f && !(0 >= f) || b && -1 != b.indexOf("cke_show_border") || (a["class"] = (b || "") + " cke_show_border")
						}
					}
				});
				b && b.addRules({
					elements: {
						table: function(a) {
							a = a.attributes;
							var b = a["class"];
							b && (a["class"] = b.replace("cke_show_border", "").replace(/\s{2}/, " ").replace(/^\s+|\s+$/, ""))
						}
					}
				})
			}
		});
		CKEDITOR.on("dialogDefinition", function(a) {
			var b = a.data.name;
			if ("table" == b || "tableProperties" == b)
				if (a = a.data.definition, b = a.getContents("info").get("txtBorder"), b.commit = CKEDITOR.tools.override(b.commit, function(a) {
						return function(b, f) {
							a.apply(this, arguments);
							var k = parseInt(this.getValue(), 10);
							f[!k || 0 >= k ? "addClass" : "removeClass"]("cke_show_border")
						}
					}), a = (a = a.getContents("advanced")) && a.get("advCSSClasses")) a.setup = CKEDITOR.tools.override(a.setup, function(a) {
					return function() {
						a.apply(this, arguments);
						this.setValue(this.getValue().replace(/cke_show_border/, ""))
					}
				}), a.commit = CKEDITOR.tools.override(a.commit, function(a) {
					return function(b, f) {
						a.apply(this, arguments);
						parseInt(f.getAttribute("border"), 10) || f.addClass("cke_show_border")
					}
				})
		})
	}(), function() {
		CKEDITOR.plugins.add("sourcearea", {
			init: function(f) {
				function b() {
					var a = e && this.equals(CKEDITOR.document.getActive());
					this.hide();
					this.setStyle("height", this.getParent().$.clientHeight + "px");
					this.setStyle("width", this.getParent().$.clientWidth + "px");
					this.show();
					a && this.focus()
				}
				if (f.elementMode != CKEDITOR.ELEMENT_MODE_INLINE) {
					var c = CKEDITOR.plugins.sourcearea;
					f.addMode("source", function(c) {
						var e = f.ui.space("contents").getDocument().createElement("textarea");
						e.setStyles(CKEDITOR.tools.extend({
							width: CKEDITOR.env.ie7Compat ? "99%" : "100%",
							height: "100%",
							resize: "none",
							outline: "none",
							"text-align": "left"
						}, CKEDITOR.tools.cssVendorPrefix("tab-size", f.config.sourceAreaTabSize || 4)));
						e.setAttribute("dir", "ltr");
						e.addClass("cke_source").addClass("cke_reset").addClass("cke_enable_context_menu");
						f.ui.space("contents").append(e);
						e = f.editable(new a(f, e));
						e.setData(f.getData(1));
						CKEDITOR.env.ie && (e.attachListener(f, "resize", b, e), e.attachListener(CKEDITOR.document.getWindow(), "resize", b, e), CKEDITOR.tools.setTimeout(b, 0, e));
						f.fire("ariaWidget", this);
						c()
					});
					f.addCommand("source", c.commands.source);
					f.ui.addButton && f.ui.addButton("Source", {
						label: f.lang.sourcearea.toolbar,
						command: "source",
						toolbar: "mode,10"
					});
					f.on("mode", function() {
						f.getCommand("source").setState("source" == f.mode ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF)
					});
					var e = CKEDITOR.env.ie && 9 == CKEDITOR.env.version
				}
			}
		});
		var a = CKEDITOR.tools.createClass({
			base: CKEDITOR.editable,
			proto: {
				setData: function(a) {
					this.setValue(a);
					this.status = "ready";
					this.editor.fire("dataReady")
				},
				getData: function() {
					return this.getValue()
				},
				insertHtml: function() {},
				insertElement: function() {},
				insertText: function() {},
				setReadOnly: function(a) {
					this[(a ? "set" : "remove") + "Attribute"]("readOnly", "readonly")
				},
				detach: function() {
					a.baseProto.detach.call(this);
					this.clearCustomData();
					this.remove()
				}
			}
		})
	}(), CKEDITOR.plugins.sourcearea = {
		commands: {
			source: {
				modes: {
					wysiwyg: 1,
					source: 1
				},
				editorFocus: !1,
				readOnly: 1,
				exec: function(a) {
					"wysiwyg" == a.mode && a.fire("saveSnapshot");
					a.getCommand("source").setState(CKEDITOR.TRISTATE_DISABLED);
					a.setMode("source" == a.mode ? "wysiwyg" : "source")
				},
				canUndo: !1
			}
		}
	}, CKEDITOR.plugins.add("specialchar", {
		availableLangs: {
			af: 1,
			ar: 1,
			az: 1,
			bg: 1,
			ca: 1,
			cs: 1,
			cy: 1,
			da: 1,
			de: 1,
			"de-ch": 1,
			el: 1,
			en: 1,
			"en-au": 1,
			"en-ca": 1,
			"en-gb": 1,
			eo: 1,
			es: 1,
			et: 1,
			eu: 1,
			fa: 1,
			fi: 1,
			fr: 1,
			"fr-ca": 1,
			gl: 1,
			he: 1,
			hr: 1,
			hu: 1,
			id: 1,
			it: 1,
			ja: 1,
			km: 1,
			ko: 1,
			ku: 1,
			lt: 1,
			lv: 1,
			nb: 1,
			nl: 1,
			no: 1,
			oc: 1,
			pl: 1,
			pt: 1,
			"pt-br": 1,
			ru: 1,
			si: 1,
			sk: 1,
			sl: 1,
			sq: 1,
			sv: 1,
			th: 1,
			tr: 1,
			tt: 1,
			ug: 1,
			uk: 1,
			vi: 1,
			zh: 1,
			"zh-cn": 1
		},
		requires: "dialog",
		init: function(a) {
			var f = this;
			CKEDITOR.dialog.add("specialchar", this.path + "dialogs/specialchar.js");
			a.addCommand("specialchar", {
				exec: function() {
					var b = a.langCode,
						b = f.availableLangs[b] ? b : f.availableLangs[b.replace(/-.*/, "")] ? b.replace(/-.*/, "") : "en";
					CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(f.path + "dialogs/lang/" + b + ".js"), function() {
						CKEDITOR.tools.extend(a.lang.specialchar, f.langEntries[b]);
						a.openDialog("specialchar")
					})
				},
				modes: {
					wysiwyg: 1
				},
				canUndo: !1
			});
			a.ui.addButton && a.ui.addButton("SpecialChar", {
				label: a.lang.specialchar.toolbar,
				command: "specialchar",
				toolbar: "insert,50"
			})
		}
	}), CKEDITOR.config.specialChars = "! \x26quot; # $ % \x26amp; ' ( ) * + - . / 0 1 2 3 4 5 6 7 8 9 : ; \x26lt; \x3d \x26gt; ? @ A B C D E F G H I J K L M N O P Q R S T U V W X Y Z [ ] ^ _ ` a b c d e f g h i j k l m n o p q r s t u v w x y z { | } ~ \x26euro; \x26lsquo; \x26rsquo; \x26ldquo; \x26rdquo; \x26ndash; \x26mdash; \x26iexcl; \x26cent; \x26pound; \x26curren; \x26yen; \x26brvbar; \x26sect; \x26uml; \x26copy; \x26ordf; \x26laquo; \x26not; \x26reg; \x26macr; \x26deg; \x26sup2; \x26sup3; \x26acute; \x26micro; \x26para; \x26middot; \x26cedil; \x26sup1; \x26ordm; \x26raquo; \x26frac14; \x26frac12; \x26frac34; \x26iquest; \x26Agrave; \x26Aacute; \x26Acirc; \x26Atilde; \x26Auml; \x26Aring; \x26AElig; \x26Ccedil; \x26Egrave; \x26Eacute; \x26Ecirc; \x26Euml; \x26Igrave; \x26Iacute; \x26Icirc; \x26Iuml; \x26ETH; \x26Ntilde; \x26Ograve; \x26Oacute; \x26Ocirc; \x26Otilde; \x26Ouml; \x26times; \x26Oslash; \x26Ugrave; \x26Uacute; \x26Ucirc; \x26Uuml; \x26Yacute; \x26THORN; \x26szlig; \x26agrave; \x26aacute; \x26acirc; \x26atilde; \x26auml; \x26aring; \x26aelig; \x26ccedil; \x26egrave; \x26eacute; \x26ecirc; \x26euml; \x26igrave; \x26iacute; \x26icirc; \x26iuml; \x26eth; \x26ntilde; \x26ograve; \x26oacute; \x26ocirc; \x26otilde; \x26ouml; \x26divide; \x26oslash; \x26ugrave; \x26uacute; \x26ucirc; \x26uuml; \x26yacute; \x26thorn; \x26yuml; \x26OElig; \x26oelig; \x26#372; \x26#374 \x26#373 \x26#375; \x26sbquo; \x26#8219; \x26bdquo; \x26hellip; \x26trade; \x26#9658; \x26bull; \x26rarr; \x26rArr; \x26hArr; \x26diams; \x26asymp;".split(" "), function() {
		CKEDITOR.plugins.add("stylescombo", {
			requires: "richcombo",
			init: function(a) {
				var f = a.config,
					b = a.lang.stylescombo,
					c = {},
					e = [],
					l = [];
				a.on("stylesSet", function(b) {
					if (b = b.data.styles) {
						for (var d, h, m, g = 0, n = b.length; g < n; g++)(d = b[g], a.blockless && d.element in CKEDITOR.dtd.$block || "string" == typeof d.type && !CKEDITOR.style.customHandlers[d.type] || (h = d.name, d = new CKEDITOR.style(d), a.filter.customConfig && !a.filter.check(d))) || (d._name = h, d._.enterMode = f.enterMode, d._.type = m = d.assignedTo || d.type, d._.weight = g + 1E3 * (m == CKEDITOR.STYLE_OBJECT ? 1 : m == CKEDITOR.STYLE_BLOCK ? 2 : 3), c[h] = d, e.push(d), l.push(d));
						e.sort(function(a, b) {
							return a._.weight - b._.weight
						})
					}
				});
				a.ui.addRichCombo("Styles", {
					label: b.label,
					title: b.panelTitle,
					toolbar: "styles,10",
					allowedContent: l,
					panel: {
						css: [CKEDITOR.skin.getPath("editor")].concat(f.contentsCss),
						multiSelect: !0,
						attributes: {
							"aria-label": b.panelTitle
						}
					},
					init: function() {
						var a, c, f, l, g, n;
						g = 0;
						for (n = e.length; g < n; g++) a = e[g], c = a._name, l = a._.type, l != f && (this.startGroup(b["panelTitle" + String(l)]), f = l), this.add(c, a.type == CKEDITOR.STYLE_OBJECT ? c : a.buildPreview(), c);
						this.commit()
					},
					onClick: function(b) {
						a.focus();
						a.fire("saveSnapshot");
						b = c[b];
						var d = a.elementPath();
						if (b.group && b.removeStylesFromSameGroup(a)) a.applyStyle(b);
						else a[b.checkActive(d, a) ? "removeStyle" : "applyStyle"](b);
						a.fire("saveSnapshot")
					},
					onRender: function() {
						a.on("selectionChange", function(b) {
							var d = this.getValue();
							b = b.data.path.elements;
							for (var e = 0, f = b.length, g; e < f; e++) {
								g = b[e];
								for (var l in c)
									if (c[l].checkElementRemovable(g, !0, a)) {
										l != d && this.setValue(l);
										return
									}
							}
							this.setValue("")
						}, this)
					},
					onOpen: function() {
						var e = a.getSelection().getSelectedElement(),
							e = a.elementPath(e),
							d = [0, 0, 0, 0];
						this.showAll();
						this.unmarkAll();
						for (var f in c) {
							var l = c[f],
								g = l._.type;
							l.checkApplicable(e, a, a.activeFilter) ? d[g]++ : this.hideItem(f);
							l.checkActive(e, a) && this.mark(f)
						}
						d[CKEDITOR.STYLE_BLOCK] || this.hideGroup(b["panelTitle" + String(CKEDITOR.STYLE_BLOCK)]);
						d[CKEDITOR.STYLE_INLINE] || this.hideGroup(b["panelTitle" + String(CKEDITOR.STYLE_INLINE)]);
						d[CKEDITOR.STYLE_OBJECT] || this.hideGroup(b["panelTitle" + String(CKEDITOR.STYLE_OBJECT)])
					},
					refresh: function() {
						var b = a.elementPath();
						if (b) {
							for (var d in c)
								if (c[d].checkApplicable(b, a, a.activeFilter)) return;
							this.setState(CKEDITOR.TRISTATE_DISABLED)
						}
					},
					reset: function() {
						c = {};
						e = []
					}
				})
			}
		})
	}(), function() {
		function a(a) {
			return {
				editorFocus: !1,
				canUndo: !1,
				modes: {
					wysiwyg: 1
				},
				exec: function(b) {
					if (b.editable().hasFocus) {
						var c = b.getSelection(),
							d;
						if (d = (new CKEDITOR.dom.elementPath(c.getCommonAncestor(), c.root)).contains({
								td: 1,
								th: 1
							}, 1)) {
							var c = b.createRange(),
								f = CKEDITOR.tools.tryThese(function() {
									var b = d.getParent().$.cells[d.$.cellIndex + (a ? -1 : 1)];
									b.parentNode.parentNode;
									return b
								}, function() {
									var b = d.getParent(),
										b = b.getAscendant("table").$.rows[b.$.rowIndex + (a ? -1 : 1)];
									return b.cells[a ? b.cells.length - 1 : 0]
								});
							if (f || a)
								if (f) f = new CKEDITOR.dom.element(f), c.moveToElementEditStart(f), c.checkStartOfBlock() && c.checkEndOfBlock() || c.selectNodeContents(f);
								else return !0;
							else {
								for (var m = d.getAscendant("table").$, f = d.getParent().$.cells, m = new CKEDITOR.dom.element(m.insertRow(-1), b.document), g = 0, n = f.length; g < n; g++) m.append((new CKEDITOR.dom.element(f[g], b.document)).clone(!1, !1)).appendBogus();
								c.moveToElementEditStart(m)
							}
							c.select(!0);
							return !0
						}
					}
					return !1
				}
			}
		}
		var f = {
				editorFocus: !1,
				modes: {
					wysiwyg: 1,
					source: 1
				}
			},
			b = {
				exec: function(a) {
					a.container.focusNext(!0, a.tabIndex)
				}
			},
			c = {
				exec: function(a) {
					a.container.focusPrevious(!0, a.tabIndex)
				}
			};
		CKEDITOR.plugins.add("tab", {
			init: function(e) {
				for (var l = !1 !== e.config.enableTabKeyTools, k = e.config.tabSpaces || 0, d = ""; k--;) d += " ";
				if (d) e.on("key", function(a) {
					9 == a.data.keyCode && (e.insertText(d), a.cancel())
				});
				if (l) e.on("key", function(a) {
					(9 == a.data.keyCode && e.execCommand("selectNextCell") || a.data.keyCode == CKEDITOR.SHIFT + 9 && e.execCommand("selectPreviousCell")) && a.cancel()
				});
				e.addCommand("blur", CKEDITOR.tools.extend(b, f));
				e.addCommand("blurBack", CKEDITOR.tools.extend(c, f));
				e.addCommand("selectNextCell", a());
				e.addCommand("selectPreviousCell", a(!0))
			}
		})
	}(), CKEDITOR.dom.element.prototype.focusNext = function(a, f) {
		var b = void 0 === f ? this.getTabIndex() : f,
			c, e, l, k, d, h;
		if (0 >= b)
			for (d = this.getNextSourceNode(a, CKEDITOR.NODE_ELEMENT); d;) {
				if (d.isVisible() && 0 === d.getTabIndex()) {
					l = d;
					break
				}
				d = d.getNextSourceNode(!1, CKEDITOR.NODE_ELEMENT)
			} else
				for (d = this.getDocument().getBody().getFirst(); d = d.getNextSourceNode(!1, CKEDITOR.NODE_ELEMENT);) {
					if (!c)
						if (!e && d.equals(this)) {
							if (e = !0, a) {
								if (!(d = d.getNextSourceNode(!0, CKEDITOR.NODE_ELEMENT))) break;
								c = 1
							}
						} else e && !this.contains(d) && (c = 1);
					if (d.isVisible() && !(0 > (h = d.getTabIndex()))) {
						if (c && h == b) {
							l = d;
							break
						}
						h > b && (!l || !k || h < k) ? (l = d, k = h) : l || 0 !== h || (l = d, k = h)
					}
				}
		l && l.focus()
	}, CKEDITOR.dom.element.prototype.focusPrevious = function(a, f) {
		for (var b = void 0 === f ? this.getTabIndex() : f, c, e, l, k = 0, d, h = this.getDocument().getBody().getLast(); h = h.getPreviousSourceNode(!1, CKEDITOR.NODE_ELEMENT);) {
			if (!c)
				if (!e && h.equals(this)) {
					if (e = !0, a) {
						if (!(h = h.getPreviousSourceNode(!0, CKEDITOR.NODE_ELEMENT))) break;
						c = 1
					}
				} else e && !this.contains(h) && (c = 1);
			if (h.isVisible() && !(0 > (d = h.getTabIndex())))
				if (0 >= b) {
					if (c && 0 === d) {
						l = h;
						break
					}
					d > k && (l = h, k = d)
				} else {
					if (c && d == b) {
						l = h;
						break
					}
					d < b && (!l || d > k) && (l = h, k = d)
				}
		}
		l && l.focus()
	}, CKEDITOR.plugins.add("table", {
		requires: "dialog",
		init: function(a) {
			function f(a) {
				return CKEDITOR.tools.extend(a || {}, {
					contextSensitive: 1,
					refresh: function(a, b) {
						this.setState(b.contains("table", 1) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED)
					}
				})
			}
			if (!a.blockless) {
				var b = a.lang.table;
				a.addCommand("table", new CKEDITOR.dialogCommand("table", {
					context: "table",
					allowedContent: "table{width,height}[align,border,cellpadding,cellspacing,summary];caption tbody thead tfoot;th td tr[scope];" + (a.plugins.dialogadvtab ? "table" + a.plugins.dialogadvtab.allowedContent() : ""),
					requiredContent: "table",
					contentTransformations: [
						["table{width}: sizeToStyle", "table[width]: sizeToAttribute"],
						["td: splitBorderShorthand"],
						[{
							element: "table",
							right: function(a) {
								a.styles && (a.styles.border && a.styles.border.match(/solid/) && (a.attributes.border = 1), "collapse" == a.styles["border-collapse"] && (a.attributes.cellspacing = 0))
							}
						}]
					]
				}));
				a.addCommand("tableProperties", new CKEDITOR.dialogCommand("tableProperties", f()));
				a.addCommand("tableDelete", f({
					exec: function(a) {
						var b = a.elementPath().contains("table", 1);
						if (b) {
							var f = b.getParent(),
								k = a.editable();
							1 != f.getChildCount() || f.is("td", "th") || f.equals(k) || (b = f);
							a = a.createRange();
							a.moveToPosition(b, CKEDITOR.POSITION_BEFORE_START);
							b.remove();
							a.select()
						}
					}
				}));
				a.ui.addButton && a.ui.addButton("Table", {
					label: b.toolbar,
					command: "table",
					toolbar: "insert,30"
				});
				CKEDITOR.dialog.add("table", this.path + "dialogs/table.js");
				CKEDITOR.dialog.add("tableProperties", this.path + "dialogs/table.js");
				a.addMenuItems && a.addMenuItems({
					table: {
						label: b.menu,
						command: "tableProperties",
						group: "table",
						order: 5
					},
					tabledelete: {
						label: b.deleteTable,
						command: "tableDelete",
						group: "table",
						order: 1
					}
				});
				a.on("doubleclick", function(a) {
					a.data.element.is("table") && (a.data.dialog = "tableProperties")
				});
				a.contextMenu && a.contextMenu.addListener(function() {
					return {
						tabledelete: CKEDITOR.TRISTATE_OFF,
						table: CKEDITOR.TRISTATE_OFF
					}
				})
			}
		}
	}), function() {
		function a(a, b) {
			function c(a) {
				return b ? b.contains(a) && a.getAscendant("table", !0).equals(b) : !0
			}

			function d(a) {
				0 < f.length || a.type != CKEDITOR.NODE_ELEMENT || !r.test(a.getName()) || a.getCustomData("selected_cell") || (CKEDITOR.dom.element.setMarker(g, a, "selected_cell", !0), f.push(a))
			}
			if (a) {
				for (var e = a.getRanges(), f = [], g = {}, h = 0; h < e.length; h++) {
					var k = e[h];
					if (k.collapsed)(k = k.getCommonAncestor().getAscendant({
						td: 1,
						th: 1
					}, !0)) && c(k) && f.push(k);
					else {
						var k = new CKEDITOR.dom.walker(k),
							l;
						for (k.guard = d; l = k.next();) l.type == CKEDITOR.NODE_ELEMENT && l.is(CKEDITOR.dtd.table) || (l = l.getAscendant({
							td: 1,
							th: 1
						}, !0)) && !l.getCustomData("selected_cell") && c(l) && (CKEDITOR.dom.element.setMarker(g, l, "selected_cell", !0), f.push(l))
					}
				}
				CKEDITOR.dom.element.clearAllMarkers(g);
				return f
			}
		}

		function f(b, c) {
			for (var d = x(b) ? b : a(b), e = d[0], f = e.getAscendant("table"), e = e.getDocument(), g = d[0].getParent(), h = g.$.rowIndex, d = d[d.length - 1], k = d.getParent().$.rowIndex + d.$.rowSpan - 1, d = new CKEDITOR.dom.element(f.$.rows[k]), h = c ? h : k, g = c ? g : d, d = CKEDITOR.tools.buildTableMap(f), f = d[h], h = c ? d[h - 1] : d[h + 1], d = d[0].length, e = e.createElement("tr"), k = 0; f[k] && k < d; k++) {
				var l;
				1 < f[k].rowSpan && h && f[k] == h[k] ? (l = f[k], l.rowSpan += 1) : (l = (new CKEDITOR.dom.element(f[k])).clone(), l.removeAttribute("rowSpan"), l.appendBogus(), e.append(l), l = l.$);
				k += l.colSpan - 1
			}
			c ? e.insertBefore(g) : e.insertAfter(g)
		}

		function b(c) {
			if (c instanceof CKEDITOR.dom.selection) {
				var d = c.getRanges(),
					e = a(c),
					f = e[0].getAscendant("table"),
					g = CKEDITOR.tools.buildTableMap(f),
					h = e[0].getParent().$.rowIndex,
					e = e[e.length - 1],
					k = e.getParent().$.rowIndex + e.$.rowSpan - 1,
					e = [];
				c.reset();
				for (c = h; c <= k; c++) {
					for (var l = g[c], m = new CKEDITOR.dom.element(f.$.rows[c]), n = 0; n < l.length; n++) {
						var p = new CKEDITOR.dom.element(l[n]),
							r = p.getParent().$.rowIndex;
						1 == p.$.rowSpan ? p.remove() : (--p.$.rowSpan, r == c && (r = g[c + 1], r[n - 1] ? p.insertAfter(new CKEDITOR.dom.element(r[n - 1])) : (new CKEDITOR.dom.element(f.$.rows[c + 1])).append(p, 1)));
						n += p.$.colSpan - 1
					}
					e.push(m)
				}
				g = f.$.rows;
				d[0].moveToPosition(f, CKEDITOR.POSITION_BEFORE_START);
				h = new CKEDITOR.dom.element(g[k + 1] || (0 < h ? g[h - 1] : null) || f.$.parentNode);
				for (c = e.length; 0 <= c; c--) b(e[c]);
				return f.$.parentNode ? h : (d[0].select(), null)
			}
			c instanceof CKEDITOR.dom.element && (f = c.getAscendant("table"), 1 == f.$.rows.length ? f.remove() : c.remove());
			return null
		}

		function c(a, b) {
			for (var c = a.getParent().$.cells, d = 0, e = 0; e < c.length; e++) {
				var f = c[e],
					d = d + (b ? 1 : f.colSpan);
				if (f == a.$) break
			}
			return d - 1
		}

		function e(a, b) {
			for (var d = b ? Infinity : 0, e = 0; e < a.length; e++) {
				var f = c(a[e], b);
				if (b ? f < d : f > d) d = f
			}
			return d
		}

		function l(b, c) {
			for (var d = x(b) ? b : a(b), f = d[0].getAscendant("table"), g = e(d, 1), d = e(d), h = c ? g : d, k = CKEDITOR.tools.buildTableMap(f), f = [], g = [], d = k.length, l = 0; l < d; l++) f.push(k[l][h]), g.push(c ? k[l][h - 1] : k[l][h + 1]);
			for (l = 0; l < d; l++) f[l] && (1 < f[l].colSpan && g[l] == f[l] ? (k = f[l], k.colSpan += 1) : (h = new CKEDITOR.dom.element(f[l]), k = h.clone(), k.removeAttribute("colSpan"), k.appendBogus(), k[c ? "insertBefore" : "insertAfter"].call(k, h), k = k.$), l += k.rowSpan - 1)
		}

		function k(a, b) {
			var c = a.getStartElement().getAscendant({
				td: 1,
				th: 1
			}, !0);
			if (c) {
				var d = c.clone();
				d.appendBogus();
				b ? d.insertBefore(c) : d.insertAfter(c)
			}
		}

		function d(b) {
			if (b instanceof CKEDITOR.dom.selection) {
				var c = b.getRanges(),
					e = a(b),
					f = e[0] && e[0].getAscendant("table"),
					g;
				a: {
					var k = 0;g = e.length - 1;
					for (var l = {}, m, n; m = e[k++];) CKEDITOR.dom.element.setMarker(l, m, "delete_cell", !0);
					for (k = 0; m = e[k++];)
						if ((n = m.getPrevious()) && !n.getCustomData("delete_cell") || (n = m.getNext()) && !n.getCustomData("delete_cell")) {
							CKEDITOR.dom.element.clearAllMarkers(l);
							g = n;
							break a
						}
					CKEDITOR.dom.element.clearAllMarkers(l);k = e[0].getParent();
					(k = k.getPrevious()) ? g = k.getLast() : (k = e[g].getParent(), g = (k = k.getNext()) ? k.getChild(0) : null)
				}
				b.reset();
				for (b = e.length - 1; 0 <= b; b--) d(e[b]);
				g ? h(g, !0) : f && (c[0].moveToPosition(f, CKEDITOR.POSITION_BEFORE_START), c[0].select(), f.remove())
			} else b instanceof
			CKEDITOR.dom.element && (c = b.getParent(), 1 == c.getChildCount() ? c.remove() : b.remove())
		}

		function h(a, b) {
			var c = a.getDocument(),
				d = CKEDITOR.document;
			CKEDITOR.env.ie && 10 == CKEDITOR.env.version && (d.focus(), c.focus());
			c = new CKEDITOR.dom.range(c);
			c["moveToElementEdit" + (b ? "End" : "Start")](a) || (c.selectNodeContents(a), c.collapse(b ? !1 : !0));
			c.select(!0)
		}

		function m(a, b, c) {
			a = a[b];
			if ("undefined" == typeof c) return a;
			for (b = 0; a && b < a.length; b++) {
				if (c.is && a[b] == c.$) return b;
				if (b == c) return new CKEDITOR.dom.element(a[b])
			}
			return c.is ? -1 : null
		}

		function g(b, c, d) {
			var e = a(b),
				f;
			if ((c ? 1 != e.length : 2 > e.length) || (f = b.getCommonAncestor()) && f.type == CKEDITOR.NODE_ELEMENT && f.is("table")) return !1;
			var g;
			b = e[0];
			f = b.getAscendant("table");
			var h = CKEDITOR.tools.buildTableMap(f),
				k = h.length,
				l = h[0].length,
				n = b.getParent().$.rowIndex,
				p = m(h, n, b);
			if (c) {
				var r;
				try {
					var x = parseInt(b.getAttribute("rowspan"), 10) || 1;
					g = parseInt(b.getAttribute("colspan"), 10) || 1;
					r = h["up" == c ? n - x : "down" == c ? n + x : n]["left" == c ? p - g : "right" == c ? p + g : p]
				} catch (J) {
					return !1
				}
				if (!r || b.$ == r) return !1;
				e["up" == c || "left" == c ? "unshift" : "push"](new CKEDITOR.dom.element(r))
			}
			c = b.getDocument();
			var H = n,
				x = r = 0,
				M = !d && new CKEDITOR.dom.documentFragment(c),
				L = 0;
			for (c = 0; c < e.length; c++) {
				g = e[c];
				var D = g.getParent(),
					T = g.getFirst(),
					I = g.$.colSpan,
					O = g.$.rowSpan,
					D = D.$.rowIndex,
					K = m(h, D, g),
					L = L + I * O,
					x = Math.max(x, K - p + I);
				r = Math.max(r, D - n + O);
				d || (I = g, (O = I.getBogus()) && O.remove(), I.trim(), g.getChildren().count() && (D == H || !T || T.isBlockBoundary && T.isBlockBoundary({
					br: 1
				}) || (H = M.getLast(CKEDITOR.dom.walker.whitespaces(!0)), !H || H.is && H.is("br") || M.append("br")), g.moveChildren(M)), c ? g.remove() : g.setHtml(""));
				H = D
			}
			if (d) return r * x == L;
			M.moveChildren(b);
			b.appendBogus();
			x >= l ? b.removeAttribute("rowSpan") : b.$.rowSpan = r;
			r >= k ? b.removeAttribute("colSpan") : b.$.colSpan = x;
			d = new CKEDITOR.dom.nodeList(f.$.rows);
			e = d.count();
			for (c = e - 1; 0 <= c; c--) f = d.getItem(c), f.$.cells.length || (f.remove(), e++);
			return b
		}

		function n(b, c) {
			var d = a(b);
			if (1 < d.length) return !1;
			if (c) return !0;
			var d = d[0],
				e = d.getParent(),
				f = e.getAscendant("table"),
				g = CKEDITOR.tools.buildTableMap(f),
				h = e.$.rowIndex,
				k = m(g, h, d),
				l = d.$.rowSpan,
				n;
			if (1 < l) {
				n = Math.ceil(l / 2);
				for (var l = Math.floor(l / 2), e = h + n, f = new CKEDITOR.dom.element(f.$.rows[e]), g = m(g, e), p, e = d.clone(), h = 0; h < g.length; h++)
					if (p = g[h], p.parentNode == f.$ && h > k) {
						e.insertBefore(new CKEDITOR.dom.element(p));
						break
					} else p = null;
				p || f.append(e)
			} else
				for (l = n = 1, f = e.clone(), f.insertAfter(e), f.append(e = d.clone()), p = m(g, h), k = 0; k < p.length; k++) p[k].rowSpan++;
			e.appendBogus();
			d.$.rowSpan = n;
			e.$.rowSpan = l;
			1 == n && d.removeAttribute("rowSpan");
			1 == l && e.removeAttribute("rowSpan");
			return e
		}

		function p(b, c) {
			var d = a(b);
			if (1 < d.length) return !1;
			if (c) return !0;
			var d = d[0],
				e = d.getParent(),
				f = e.getAscendant("table"),
				f = CKEDITOR.tools.buildTableMap(f),
				g = m(f, e.$.rowIndex, d),
				h = d.$.colSpan;
			if (1 < h) e = Math.ceil(h / 2), h = Math.floor(h / 2);
			else {
				for (var h = e = 1, k = [], l = 0; l < f.length; l++) {
					var n = f[l];
					k.push(n[g]);
					1 < n[g].rowSpan && (l += n[g].rowSpan - 1)
				}
				for (f = 0; f < k.length; f++) k[f].colSpan++
			}
			f = d.clone();
			f.insertAfter(d);
			f.appendBogus();
			d.$.colSpan = e;
			f.$.colSpan = h;
			1 == e && d.removeAttribute("colSpan");
			1 == h && f.removeAttribute("colSpan");
			return f
		}
		var r = /^(?:td|th)$/,
			x = CKEDITOR.tools.isArray;
		CKEDITOR.plugins.tabletools = {
			requires: "table,dialog,contextmenu",
			init: function(c) {
				function e(a) {
					return CKEDITOR.tools.extend(a || {}, {
						contextSensitive: 1,
						refresh: function(a, b) {
							this.setState(b.contains({
								td: 1,
								th: 1
							}, 1) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED)
						}
					})
				}

				function m(a, b) {
					var d = c.addCommand(a, b);
					c.addFeature(d)
				}
				var r = c.lang.table,
					x = CKEDITOR.tools.style.parse;
				m("cellProperties", new CKEDITOR.dialogCommand("cellProperties", e({
					allowedContent: "td th{width,height,border-color,background-color,white-space,vertical-align,text-align}[colspan,rowspan]",
					requiredContent: "table",
					contentTransformations: [
						[{
							element: "td",
							left: function(a) {
								return a.styles.background && x.background(a.styles.background).color
							},
							right: function(a) {
								a.styles["background-color"] = x.background(a.styles.background).color
							}
						}, {
							element: "td",
							check: "td{vertical-align}",
							left: function(a) {
								return a.attributes && a.attributes.valign
							},
							right: function(a) {
								a.styles["vertical-align"] = a.attributes.valign;
								delete a.attributes.valign
							}
						}],
						[{
							element: "tr",
							check: "td{height}",
							left: function(a) {
								return a.styles && a.styles.height
							},
							right: function(a) {
								CKEDITOR.tools.array.forEach(a.children, function(b) {
									b.name in {
										td: 1,
										th: 1
									} && (b.attributes["cke-row-height"] = a.styles.height)
								});
								delete a.styles.height
							}
						}],
						[{
							element: "td",
							check: "td{height}",
							left: function(a) {
								return (a = a.attributes) && a["cke-row-height"]
							},
							right: function(a) {
								a.styles.height = a.attributes["cke-row-height"];
								delete a.attributes["cke-row-height"]
							}
						}]
					]
				})));
				CKEDITOR.dialog.add("cellProperties", this.path + "dialogs/tableCell.js");
				m("rowDelete", e({
					requiredContent: "table",
					exec: function(a) {
						a = a.getSelection();
						(a = b(a)) && h(a)
					}
				}));
				m("rowInsertBefore", e({
					requiredContent: "table",
					exec: function(b) {
						b = b.getSelection();
						b = a(b);
						f(b, !0)
					}
				}));
				m("rowInsertAfter", e({
					requiredContent: "table",
					exec: function(b) {
						b = b.getSelection();
						b = a(b);
						f(b)
					}
				}));
				m("columnDelete", e({
					requiredContent: "table",
					exec: function(b) {
						var c = b.getSelection();
						b = c.getRanges();
						var d = a(c),
							e = d[0],
							f = d[d.length - 1],
							d = e.getAscendant("table"),
							g = CKEDITOR.tools.buildTableMap(d),
							k, l, m = [];
						c.reset();
						for (var n = 0, c = g.length; n < c; n++)
							for (var p = 0, r = g[n].length; p < r; p++) g[n][p] == e.$ && (k = p), g[n][p] == f.$ && (l = p);
						for (n = k; n <= l; n++)
							for (p = 0; p < g.length; p++) f = g[p], e = new CKEDITOR.dom.element(d.$.rows[p]), f = new CKEDITOR.dom.element(f[n]), f.$ && (1 == f.$.colSpan ? f.remove() : --f.$.colSpan, p += f.$.rowSpan - 1, e.$.cells.length || m.push(e));
						l = d.$.rows[0] && d.$.rows[0].cells;
						k = new CKEDITOR.dom.element(l[k] || (k ? l[k - 1] : d.$.parentNode));
						m.length == c && (b[0].moveToPosition(d, CKEDITOR.POSITION_AFTER_END), b[0].select(), d.remove());
						k && h(k, !0)
					}
				}));
				m("columnInsertBefore", e({
					requiredContent: "table",
					exec: function(b) {
						b = b.getSelection();
						b = a(b);
						l(b, !0)
					}
				}));
				m("columnInsertAfter", e({
					requiredContent: "table",
					exec: function(b) {
						b = b.getSelection();
						b = a(b);
						l(b)
					}
				}));
				m("cellDelete", e({
					requiredContent: "table",
					exec: function(a) {
						a = a.getSelection();
						d(a)
					}
				}));
				m("cellMerge", e({
					allowedContent: "td[colspan,rowspan]",
					requiredContent: "td[colspan,rowspan]",
					exec: function(a, b) {
						b.cell = g(a.getSelection());
						h(b.cell, !0)
					}
				}));
				m("cellMergeRight", e({
					allowedContent: "td[colspan]",
					requiredContent: "td[colspan]",
					exec: function(a, b) {
						b.cell = g(a.getSelection(), "right");
						h(b.cell, !0)
					}
				}));
				m("cellMergeDown", e({
					allowedContent: "td[rowspan]",
					requiredContent: "td[rowspan]",
					exec: function(a, b) {
						b.cell = g(a.getSelection(), "down");
						h(b.cell, !0)
					}
				}));
				m("cellVerticalSplit", e({
					allowedContent: "td[rowspan]",
					requiredContent: "td[rowspan]",
					exec: function(a) {
						h(p(a.getSelection()))
					}
				}));
				m("cellHorizontalSplit", e({
					allowedContent: "td[colspan]",
					requiredContent: "td[colspan]",
					exec: function(a) {
						h(n(a.getSelection()))
					}
				}));
				m("cellInsertBefore", e({
					requiredContent: "table",
					exec: function(a) {
						a = a.getSelection();
						k(a, !0)
					}
				}));
				m("cellInsertAfter", e({
					requiredContent: "table",
					exec: function(a) {
						a = a.getSelection();
						k(a)
					}
				}));
				c.addMenuItems && c.addMenuItems({
					tablecell: {
						label: r.cell.menu,
						group: "tablecell",
						order: 1,
						getItems: function() {
							var b = c.getSelection(),
								d = a(b);
							return {
								tablecell_insertBefore: CKEDITOR.TRISTATE_OFF,
								tablecell_insertAfter: CKEDITOR.TRISTATE_OFF,
								tablecell_delete: CKEDITOR.TRISTATE_OFF,
								tablecell_merge: g(b, null, !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
								tablecell_merge_right: g(b, "right", !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
								tablecell_merge_down: g(b, "down", !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
								tablecell_split_vertical: p(b, !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
								tablecell_split_horizontal: n(b, !0) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
								tablecell_properties: 0 < d.length ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED
							}
						}
					},
					tablecell_insertBefore: {
						label: r.cell.insertBefore,
						group: "tablecell",
						command: "cellInsertBefore",
						order: 5
					},
					tablecell_insertAfter: {
						label: r.cell.insertAfter,
						group: "tablecell",
						command: "cellInsertAfter",
						order: 10
					},
					tablecell_delete: {
						label: r.cell.deleteCell,
						group: "tablecell",
						command: "cellDelete",
						order: 15
					},
					tablecell_merge: {
						label: r.cell.merge,
						group: "tablecell",
						command: "cellMerge",
						order: 16
					},
					tablecell_merge_right: {
						label: r.cell.mergeRight,
						group: "tablecell",
						command: "cellMergeRight",
						order: 17
					},
					tablecell_merge_down: {
						label: r.cell.mergeDown,
						group: "tablecell",
						command: "cellMergeDown",
						order: 18
					},
					tablecell_split_horizontal: {
						label: r.cell.splitHorizontal,
						group: "tablecell",
						command: "cellHorizontalSplit",
						order: 19
					},
					tablecell_split_vertical: {
						label: r.cell.splitVertical,
						group: "tablecell",
						command: "cellVerticalSplit",
						order: 20
					},
					tablecell_properties: {
						label: r.cell.title,
						group: "tablecellproperties",
						command: "cellProperties",
						order: 21
					},
					tablerow: {
						label: r.row.menu,
						group: "tablerow",
						order: 1,
						getItems: function() {
							return {
								tablerow_insertBefore: CKEDITOR.TRISTATE_OFF,
								tablerow_insertAfter: CKEDITOR.TRISTATE_OFF,
								tablerow_delete: CKEDITOR.TRISTATE_OFF
							}
						}
					},
					tablerow_insertBefore: {
						label: r.row.insertBefore,
						group: "tablerow",
						command: "rowInsertBefore",
						order: 5
					},
					tablerow_insertAfter: {
						label: r.row.insertAfter,
						group: "tablerow",
						command: "rowInsertAfter",
						order: 10
					},
					tablerow_delete: {
						label: r.row.deleteRow,
						group: "tablerow",
						command: "rowDelete",
						order: 15
					},
					tablecolumn: {
						label: r.column.menu,
						group: "tablecolumn",
						order: 1,
						getItems: function() {
							return {
								tablecolumn_insertBefore: CKEDITOR.TRISTATE_OFF,
								tablecolumn_insertAfter: CKEDITOR.TRISTATE_OFF,
								tablecolumn_delete: CKEDITOR.TRISTATE_OFF
							}
						}
					},
					tablecolumn_insertBefore: {
						label: r.column.insertBefore,
						group: "tablecolumn",
						command: "columnInsertBefore",
						order: 5
					},
					tablecolumn_insertAfter: {
						label: r.column.insertAfter,
						group: "tablecolumn",
						command: "columnInsertAfter",
						order: 10
					},
					tablecolumn_delete: {
						label: r.column.deleteColumn,
						group: "tablecolumn",
						command: "columnDelete",
						order: 15
					}
				});
				c.contextMenu && c.contextMenu.addListener(function(a, b, c) {
					return (a = c.contains({
						td: 1,
						th: 1
					}, 1)) && !a.isReadOnly() ? {
						tablecell: CKEDITOR.TRISTATE_OFF,
						tablerow: CKEDITOR.TRISTATE_OFF,
						tablecolumn: CKEDITOR.TRISTATE_OFF
					} : null
				})
			},
			getCellColIndex: c,
			insertRow: f,
			insertColumn: l,
			getSelectedCells: a
		};
		CKEDITOR.plugins.add("tabletools", CKEDITOR.plugins.tabletools)
	}(), CKEDITOR.tools.buildTableMap = function(a, f, b, c, e) {
		a = a.$.rows;
		b = b || 0;
		c = "number" === typeof c ? c : a.length - 1;
		e = "number" === typeof e ? e : -1;
		var l = -1,
			k = [];
		for (f = f || 0; f <= c; f++) {
			l++;
			!k[l] && (k[l] = []);
			for (var d = -1, h = b; h <= (-1 === e ? a[f].cells.length - 1 : e); h++) {
				var m = a[f].cells[h];
				if (!m) break;
				for (d++; k[l][d];) d++;
				for (var g = isNaN(m.colSpan) ? 1 : m.colSpan, m = isNaN(m.rowSpan) ? 1 : m.rowSpan, n = 0; n < m && !(f + n > c); n++) {
					k[l + n] || (k[l + n] = []);
					for (var p = 0; p < g; p++) k[l + n][d + p] = a[f].cells[h]
				}
				d += g - 1;
				if (-1 !== e && d >= e) break
			}
		}
		return k
	}, function() {
		function a(a, b) {
			var c = a.getAscendant("table"),
				d = b.getAscendant("table"),
				e = CKEDITOR.tools.buildTableMap(c),
				f = a.getAscendant("tr", !0).$.rowIndex,
				g = b.getAscendant("tr", !0).$.rowIndex,
				h = [],
				k = {},
				l, m;
			c.contains(d) && (b = b.getAscendant({
				td: 1,
				th: 1
			}), g = b.getAscendant("tr", !0).$.rowIndex);
			f > g && (c = f, f = g, g = c, c = a, a = b, b = c);
			for (c = 0; c < e[f].length; c++)
				if (a.$ === e[f][c]) {
					l = c;
					break
				}
			for (c = 0; c < e[g].length; c++)
				if (b.$ === e[g][c]) {
					m = c;
					break
				}
			l > m && (c = l, l = m, m = c);
			for (c = f; c <= g; c++)
				for (f = l; f <= m; f++) d = new CKEDITOR.dom.element(e[c][f]), d.$ && !d.getCustomData("selected_cell") && (h.push(d), CKEDITOR.dom.element.setMarker(k, d, "selected_cell", !0));
			CKEDITOR.dom.element.clearAllMarkers(k);
			return h
		}

		function f(a) {
			a = a.data.$;
			return CKEDITOR.env.ie && 9 > CKEDITOR.env.version ? 1 === a.button : 0 === a.button
		}

		function b(a) {
			return (a = a.editable().findOne(".cke_table-faked-selection")) && a.getAscendant("table")
		}

		function c(a, b) {
			var c = a.editable().find(".cke_table-faked-selection"),
				d;
			a.fire("lockSnapshot");
			a.editable().removeClass("cke_table-faked-selection-editor");
			for (d = 0; d < c.count(); d++) c.getItem(d).removeClass("cke_table-faked-selection");
			0 < c.count() && c.getItem(0).getAscendant("table").removeClass("cke_table-faked-selection-table");
			a.fire("unlockSnapshot");
			b && (x = {
				active: !1
			}, a.getSelection().isInTable() && a.getSelection().reset())
		}

		function e(a, b) {
			var c = [],
				d, e;
			for (e = 0; e < b.length; e++) d = a.createRange(), d.setStartBefore(b[e]), d.setEndAfter(b[e]), c.push(d);
			a.getSelection().selectRanges(c)
		}

		function l(b) {
			var c = b.editable().find(".cke_table-faked-selection");
			1 > c.count() || (c = a(c.getItem(0), c.getItem(c.count() - 1)), e(b, c))
		}

		function k(b, d, f) {
			var g = u(b.getSelection(!0));
			d = d.is("table") ? null : d;
			var h;
			(h = x.active && !x.first) && !(h = d) && (h = b.getSelection().getRanges(), h = 1 < g.length || h[0] && !h[0].collapsed ? !0 : !1);
			if (h) x.first = d || g[0], x.dirty = d ? !1 : 1 !== g.length;
			else if (x.active && d) {
				g = a(x.first, d);
				if (!x.dirty && 1 === g.length) return c(b, "mouseup" === f.name);
				x.dirty = !0;
				x.last = d;
				e(b, g)
			}
		}

		function d(a) {
			var b = (a = a.editor || a.sender.editor) && a.getSelection(),
				d = b && b.getRanges() || [],
				e;
			if (b && (c(a), b.isInTable() && b.isFake)) {
				1 === d.length && d[0]._getTableElement() && d[0]._getTableElement().is("table") && (e = d[0]._getTableElement());
				e = u(b, e);
				a.fire("lockSnapshot");
				for (b = 0; b < e.length; b++) e[b].addClass("cke_table-faked-selection");
				0 < e.length && (a.editable().addClass("cke_table-faked-selection-editor"), e[0].getAscendant("table").addClass("cke_table-faked-selection-table"));
				a.fire("unlockSnapshot")
			}
		}

		function h(a) {
			function d(a, b) {
				return a && b ? a.equals(b) || a.contains(b) || b.contains(a) || a.getCommonAncestor(b).is(t) : !1
			}

			function e(a) {
				return !a.getAscendant("table", !0) && a.getDocument().equals(g.document)
			}
			var g = a.editor || a.listenerData.editor,
				m = g.getSelection(1),
				n = b(g),
				p = a.data.getTarget(),
				r = p && p.getAscendant({
					td: 1,
					th: 1
				}, !0),
				p = p && p.getAscendant("table", !0),
				t = {
					table: 1,
					thead: 1,
					tbody: 1,
					tfoot: 1,
					tr: 1,
					td: 1,
					th: 1
				};
			(function(a, b, c, g) {
				return "mousedown" === a.name && (f(a) || !g) || "mouseup" === a.name && !e(a.data.getTarget()) && !d(c, g) ? !0 : !1
			})(a, m, n, p) && c(g, !0);
			!x.active && "mousedown" === a.name && f(a) && p && (x = {
				active: !0
			}, CKEDITOR.document.on("mouseup", h, null, {
				editor: g
			}));
			(r || p) && k(g, r || p, a);
			"mouseup" === a.name && (f(a) && (e(a.data.getTarget()) || d(n, p)) && l(g), x = {
				active: !1
			}, CKEDITOR.document.removeListener("mouseup", h))
		}

		function m(a) {
			var b = a.data.getTarget().getAscendant({
				td: 1,
				th: 1
			}, !0);
			b && !b.hasClass("cke_table-faked-selection") && (a.cancel(), a.data.preventDefault())
		}

		function g(a, b) {
			function c(a) {
				a.cancel()
			}
			var d = a.getSelection(),
				e = d.createBookmarks(),
				f = a.document,
				g = a.createRange(),
				h = f.getDocumentElement().$,
				k = CKEDITOR.env.ie && 9 > CKEDITOR.env.version,
				l = a.blockless || CKEDITOR.env.ie ? "span" : "div",
				m, n, p, r;
			f.getById("cke_table_copybin") || (m = f.createElement(l), n = f.createElement(l), n.setAttributes({
				id: "cke_table_copybin",
				"data-cke-temp": "1"
			}), m.setStyles({
				position: "absolute",
				width: "1px",
				height: "1px",
				overflow: "hidden"
			}), m.setStyle("ltr" == a.config.contentsLangDirection ? "left" : "right", "-5000px"), m.setHtml(a.getSelectedHtml(!0)), a.fire("lockSnapshot"), n.append(m), a.editable().append(n), r = a.on("selectionChange", c, null, null, 0), k && (p = h.scrollTop), g.selectNodeContents(m), g.select(), k && (h.scrollTop = p), setTimeout(function() {
				n.remove();
				d.selectBookmarks(e);
				r.removeListener();
				a.fire("unlockSnapshot");
				b && (a.extractSelectedHtml(), a.fire("saveSnapshot"))
			}, 100))
		}

		function n(a) {
			var b = a.editor || a.sender.editor;
			b.getSelection().isInTable() && g(b, "cut" === a.name)
		}

		function p(b) {
			function c(a) {
				a = a.getRanges()[0];
				var b = a.endContainer.getAscendant("tr", !0);
				if (b && a.collapsed) {
					if (a.checkBoundaryOfElement(b, CKEDITOR.START)) return 1;
					if (a.checkBoundaryOfElement(b, CKEDITOR.END)) return 2
				}
				return 0
			}

			function d(a) {
				var b = 0,
					c;
				for (c = 0; c < a.length; c++) a[c].length > b && (b = a[c].length);
				return b
			}

			function f(a) {
				var b = a.getAscendant("table"),
					c = a.getParent().$.rowIndex,
					b = CKEDITOR.tools.buildTableMap(b),
					d;
				for (d = 0; d < b[c].length; d++)
					if ((new CKEDITOR.dom.element(b[c][d])).equals(a)) return d
			}
			var g = b.editor,
				h = g.dataProcessor,
				k = g.getSelection(),
				l = new CKEDITOR.dom.element("body"),
				m = 0,
				n = 0,
				p = 0,
				r = 0,
				v = {},
				x, I, O, K, U, V;
			h || (h = new CKEDITOR.htmlDataProcessor(g));
			l.setHtml(h.toHtml(b.data.dataValue), {
				fixForBody: !1
			});
			r = l.findOne("table");
			if (k.getRanges().length && (k.isInTable() || (x = c(k))) && (I = u(k), I.length)) {
				b.stop();
				b = I[0].getAscendant("table");
				I = u(k, b);
				O = I[0];
				p = O.getParent();
				K = I[I.length - 1];
				U = K.getParent();
				if (!x)
					for (h = 0; h < I.length; h++) I[h].setHtml("");
				if (1 < l.getChildCount() || !r) I[0].setHtml(l.getHtml()), g.fire("saveSnapshot");
				else {
					if (x) {
						I = p.getChildCount();
						p = U = new CKEDITOR.dom.element("tr");
						p["insert" + (1 === x ? "Before" : "After")](O.getParent());
						for (h = 0; h < I; h++) O = new CKEDITOR.dom.element("td"), O.appendTo(p);
						O = p.getFirst();
						K = p.getLast();
						k.selectElement(p);
						I = u(k)
					}
					x = CKEDITOR.tools.buildTableMap(b, p.$.rowIndex, t(O, !0), U.$.rowIndex, f(K));
					k = CKEDITOR.tools.buildTableMap(r);
					p = d(k);
					r = d(x);
					if (k.length > x.length)
						for (m = k.length - x.length, h = 0; h < m; h++) y(I);
					if (p > r)
						for (n = p - r, h = 0; h < n; h++) A(I);
					O = I[0];
					p = O.getParent();
					K = I[I.length - 1];
					U = new CKEDITOR.dom.element(b.$.rows[K.getParent().$.rowIndex + m]);
					K = U.getChild(K.$.cellIndex + n);
					m = t(I[0], !0);
					I = f(K);
					x = CKEDITOR.tools.buildTableMap(b, p.$.rowIndex, m, U.$.rowIndex, I);
					for (h = 0; h < k.length; h++)
						for (n = new CKEDITOR.dom.element(b.$.rows[p.$.rowIndex + h]), I = 0; I < k[h].length; I++)
							if (V = new CKEDITOR.dom.element(k[h][I]), l = x[h] && x[h][I] ? new CKEDITOR.dom.element(x[h][I]) : null, V && !V.getCustomData("processed")) {
								if (l && l.getParent()) V.replace(l);
								else if (0 === I || k[h][I - 1])(l = 0 !== I ? new CKEDITOR.dom.element(k[h][I - 1]) : null) && n.equals(l.getParent()) ? V.insertAfter(l) : 0 < m ? V.insertAfter(new CKEDITOR.dom.element(n.$.cells[m])) : n.append(V, !0);
								CKEDITOR.dom.element.setMarker(v, V, "processed", !0)
							} else V.getCustomData("processed") && l && l.remove();
					CKEDITOR.dom.element.clearAllMarkers(v);
					e(g, a(new CKEDITOR.dom.element(k[0][0]), V));
					g.fire("saveSnapshot");
					setTimeout(function() {
						g.fire("afterPaste")
					}, 0)
				}
			}
		}

		function r(a, b, c) {
			a.on("beforeCommandExec", function(c) {
				-1 !== CKEDITOR.tools.array.indexOf(b, c.data.name) && (c.data.selectedCells = u(a.getSelection()))
			});
			a.on("afterCommandExec", function(d) {
				-1 !== CKEDITOR.tools.array.indexOf(b, d.data.name) && c(a, d.data)
			})
		}
		var x = {
				active: !1
			},
			v, u, t, y, A;
		CKEDITOR.plugins.tableselection = {
			getCellsBetween: a,
			keyboardIntegration: function(a) {
				function b(a) {
					a.getEnclosedNode() ? a.getEnclosedNode().setText("") : a.deleteContents();
					CKEDITOR.tools.array.forEach(a._find("td"), function(a) {
						a.appendBogus()
					})
				}
				var c = a.editable();
				c.attachListener(c, "keydown", function(a) {
					function c(b, d) {
						if (!d.length) return null;
						var f = a.createRange(),
							g = CKEDITOR.dom.range.mergeRanges(d);
						CKEDITOR.tools.array.forEach(g, function(a) {
							a.enlarge(CKEDITOR.ENLARGE_ELEMENT)
						});
						var h = g[0].getBoundaryNodes(),
							k = h.startNode,
							h = h.endNode;
						if (k && k.is && k.is(e)) {
							for (var l = k.getAscendant("table", !0), m = k.getPreviousSourceNode(!1, CKEDITOR.NODE_ELEMENT, l), n = !1, p = function(a) {
									return !k.contains(a) && a.is && a.is("td", "th")
								}; m && !p(m);) m = m.getPreviousSourceNode(!1, CKEDITOR.NODE_ELEMENT, l);
							!m && h && h.is && !h.is("table") && h.getNext() && (m = h.getNext().findOne("td, th"), n = !0);
							if (m) f["moveToElementEdit" + (n ? "Start" : "End")](m);
							else f.setStartBefore(k.getAscendant("table", !0)), f.collapse(!0);
							g[0].deleteContents();
							return [f]
						}
						if (k) return f.moveToElementEditablePosition(k), [f]
					}
					var d = {
							37: 1,
							38: 1,
							39: 1,
							40: 1,
							8: 1,
							46: 1
						},
						e = CKEDITOR.tools.extend({
							table: 1
						}, CKEDITOR.dtd.$tableContent);
					delete e.td;
					delete e.th;
					return function(e) {
						var f = e.data.getKey(),
							g, h = 37 === f || 38 == f,
							k, l, m;
						if (d[f] && (g = a.getSelection()) && g.isInTable() && g.isFake)
							if (k = g.getRanges(), l = k[0]._getTableElement(), m = k[k.length - 1]._getTableElement(), e.data.preventDefault(), e.cancel(), 8 < f && 46 > f) k[0].moveToElementEditablePosition(h ? l : m, !h), g.selectRanges([k[0]]);
							else {
								for (e = 0; e < k.length; e++) b(k[e]);
								(e = c(l, k)) ? k = e: k[0].moveToElementEditablePosition(l);
								g.selectRanges(k);
								a.fire("saveSnapshot")
							}
					}
				}(a), null, null, -1);
				c.attachListener(c, "keypress", function(c) {
					var d = a.getSelection(),
						e, f;
					if (d && d.isInTable() && d.isFake && c.data.$.charCode && !(c.data.getKeystroke() & CKEDITOR.CTRL)) {
						c = d.getRanges();
						e = c[0].getEnclosedNode().getAscendant({
							td: 1,
							th: 1
						}, !0);
						for (f = 0; f < c.length; f++) b(c[f]);
						c[0].moveToElementEditablePosition(e);
						d.selectRanges([c[0]])
					}
				}, null, null, -1)
			},
			isSupportedEnvironment: !(CKEDITOR.env.ie && 11 > CKEDITOR.env.version)
		};
		CKEDITOR.plugins.add("tableselection", {
			requires: "clipboard,tabletools",
			onLoad: function() {
				v = CKEDITOR.plugins.tabletools;
				u = v.getSelectedCells;
				t = v.getCellColIndex;
				y = v.insertRow;
				A = v.insertColumn;
				CKEDITOR.document.appendStyleSheet(this.path + "/styles/tableselection.css")
			},
			init: function(a) {
				CKEDITOR.plugins.tableselection.isSupportedEnvironment && (a.addContentsCss && a.addContentsCss(this.path + "/styles/tableselection.css"), a.on("contentDom", function() {
					var b = a.editable(),
						c = b.isInline() ? b : a.document,
						e = {
							editor: a
						};
					b.attachListener(c, "mousedown", h, null, e);
					b.attachListener(c, "mousemove", h, null, e);
					b.attachListener(c, "mouseup", h, null, e);
					b.attachListener(b, "dragstart", m);
					b.attachListener(a, "selectionCheck", d);
					CKEDITOR.plugins.tableselection.keyboardIntegration(a);
					CKEDITOR.plugins.clipboard && !CKEDITOR.plugins.clipboard.isCustomCopyCutSupported && (b.attachListener(b, "cut", n), b.attachListener(b, "copy", n))
				}), a.on("paste", p), r(a, "rowInsertBefore rowInsertAfter columnInsertBefore columnInsertAfter cellInsertBefore cellInsertAfter".split(" "), function(a, b) {
					e(a, b.selectedCells)
				}), r(a, ["cellMerge", "cellMergeRight", "cellMergeDown"], function(a, b) {
					e(a, [b.commandData.cell])
				}), r(a, ["cellDelete"], function(a) {
					c(a, !0)
				}))
			}
		})
	}(), "use strict", function() {
		var a = [CKEDITOR.CTRL + 90, CKEDITOR.CTRL + 89, CKEDITOR.CTRL + CKEDITOR.SHIFT + 90],
			f = {
				8: 1,
				46: 1
			};
		CKEDITOR.plugins.add("undo", {
			init: function(c) {
				function e(a) {
					g.enabled && !1 !== a.data.command.canUndo && g.save()
				}

				function f() {
					g.enabled = c.readOnly ? !1 : "wysiwyg" == c.mode;
					g.onChange()
				}
				var g = c.undoManager = new b(c),
					k = g.editingHandler = new l(g),
					p = c.addCommand("undo", {
						exec: function() {
							g.undo() && (c.selectionChange(), this.fire("afterUndo"))
						},
						startDisabled: !0,
						canUndo: !1
					}),
					r = c.addCommand("redo", {
						exec: function() {
							g.redo() && (c.selectionChange(), this.fire("afterRedo"))
						},
						startDisabled: !0,
						canUndo: !1
					});
				c.setKeystroke([
					[a[0], "undo"],
					[a[1], "redo"],
					[a[2], "redo"]
				]);
				g.onChange = function() {
					p.setState(g.undoable() ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED);
					r.setState(g.redoable() ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED)
				};
				c.on("beforeCommandExec", e);
				c.on("afterCommandExec", e);
				c.on("saveSnapshot", function(a) {
					g.save(a.data && a.data.contentOnly)
				});
				c.on("contentDom", k.attachListeners, k);
				c.on("instanceReady", function() {
					c.fire("saveSnapshot")
				});
				c.on("beforeModeUnload", function() {
					"wysiwyg" == c.mode && g.save(!0)
				});
				c.on("mode", f);
				c.on("readOnly", f);
				c.ui.addButton && (c.ui.addButton("Undo", {
					label: c.lang.undo.undo,
					command: "undo",
					toolbar: "undo,10"
				}), c.ui.addButton("Redo", {
					label: c.lang.undo.redo,
					command: "redo",
					toolbar: "undo,20"
				}));
				c.resetUndo = function() {
					g.reset();
					c.fire("saveSnapshot")
				};
				c.on("updateSnapshot", function() {
					g.currentImage && g.update()
				});
				c.on("lockSnapshot", function(a) {
					a = a.data;
					g.lock(a && a.dontUpdate, a && a.forceUpdate)
				});
				c.on("unlockSnapshot", g.unlock, g)
			}
		});
		CKEDITOR.plugins.undo = {};
		var b = CKEDITOR.plugins.undo.UndoManager = function(a) {
			this.strokesRecorded = [0, 0];
			this.locked = null;
			this.previousKeyGroup = -1;
			this.limit = a.config.undoStackSize || 20;
			this.strokesLimit = 25;
			this.editor = a;
			this.reset()
		};
		b.prototype = {
			type: function(a, c) {
				var e = b.getKeyGroup(a),
					f = this.strokesRecorded[e] + 1;
				c = c || f >= this.strokesLimit;
				this.typing || (this.hasUndo = this.typing = !0, this.hasRedo = !1, this.onChange());
				c ? (f = 0, this.editor.fire("saveSnapshot")) : this.editor.fire("change");
				this.strokesRecorded[e] = f;
				this.previousKeyGroup = e
			},
			keyGroupChanged: function(a) {
				return b.getKeyGroup(a) != this.previousKeyGroup
			},
			reset: function() {
				this.snapshots = [];
				this.index = -1;
				this.currentImage = null;
				this.hasRedo = this.hasUndo = !1;
				this.locked = null;
				this.resetType()
			},
			resetType: function() {
				this.strokesRecorded = [0, 0];
				this.typing = !1;
				this.previousKeyGroup = -1
			},
			refreshState: function() {
				this.hasUndo = !!this.getNextImage(!0);
				this.hasRedo = !!this.getNextImage(!1);
				this.resetType();
				this.onChange()
			},
			save: function(a, b, e) {
				var f = this.editor;
				if (this.locked || "ready" != f.status || "wysiwyg" != f.mode) return !1;
				var k = f.editable();
				if (!k || "ready" != k.status) return !1;
				k = this.snapshots;
				b || (b = new c(f));
				if (!1 === b.contents) return !1;
				if (this.currentImage)
					if (b.equalsContent(this.currentImage)) {
						if (a || b.equalsSelection(this.currentImage)) return !1
					} else !1 !== e && f.fire("change");
				k.splice(this.index + 1, k.length - this.index - 1);
				k.length == this.limit && k.shift();
				this.index = k.push(b) - 1;
				this.currentImage = b;
				!1 !== e && this.refreshState();
				return !0
			},
			restoreImage: function(a) {
				var b = this.editor,
					c;
				a.bookmarks && (b.focus(), c = b.getSelection());
				this.locked = {
					level: 999
				};
				this.editor.loadSnapshot(a.contents);
				a.bookmarks ? c.selectBookmarks(a.bookmarks) : CKEDITOR.env.ie && (c = this.editor.document.getBody().$.createTextRange(), c.collapse(!0), c.select());
				this.locked = null;
				this.index = a.index;
				this.currentImage = this.snapshots[this.index];
				this.update();
				this.refreshState();
				b.fire("change")
			},
			getNextImage: function(a) {
				var b = this.snapshots,
					c = this.currentImage,
					e;
				if (c)
					if (a)
						for (e = this.index - 1; 0 <= e; e--) {
							if (a = b[e], !c.equalsContent(a)) return a.index = e, a
						} else
							for (e = this.index + 1; e < b.length; e++)
								if (a = b[e], !c.equalsContent(a)) return a.index = e, a;
				return null
			},
			redoable: function() {
				return this.enabled && this.hasRedo
			},
			undoable: function() {
				return this.enabled && this.hasUndo
			},
			undo: function() {
				if (this.undoable()) {
					this.save(!0);
					var a = this.getNextImage(!0);
					if (a) return this.restoreImage(a), !0
				}
				return !1
			},
			redo: function() {
				if (this.redoable() && (this.save(!0), this.redoable())) {
					var a = this.getNextImage(!1);
					if (a) return this.restoreImage(a), !0
				}
				return !1
			},
			update: function(a) {
				if (!this.locked) {
					a || (a = new c(this.editor));
					for (var b = this.index, e = this.snapshots; 0 < b && this.currentImage.equalsContent(e[b - 1]);) --b;
					e.splice(b, this.index - b + 1, a);
					this.index = b;
					this.currentImage = a
				}
			},
			updateSelection: function(a) {
				if (!this.snapshots.length) return !1;
				var b = this.snapshots,
					c = b[b.length - 1];
				return c.equalsContent(a) && !c.equalsSelection(a) ? (this.currentImage = b[b.length - 1] = a, !0) : !1
			},
			lock: function(a, b) {
				if (this.locked) this.locked.level++;
				else if (a) this.locked = {
					level: 1
				};
				else {
					var e = null;
					if (b) e = !0;
					else {
						var f = new c(this.editor, !0);
						this.currentImage && this.currentImage.equalsContent(f) && (e = f)
					}
					this.locked = {
						update: e,
						level: 1
					}
				}
			},
			unlock: function() {
				if (this.locked && !--this.locked.level) {
					var a = this.locked.update;
					this.locked = null;
					if (!0 === a) this.update();
					else if (a) {
						var b = new c(this.editor, !0);
						a.equalsContent(b) || this.update()
					}
				}
			}
		};
		b.navigationKeyCodes = {
			37: 1,
			38: 1,
			39: 1,
			40: 1,
			36: 1,
			35: 1,
			33: 1,
			34: 1
		};
		b.keyGroups = {
			PRINTABLE: 0,
			FUNCTIONAL: 1
		};
		b.isNavigationKey = function(a) {
			return !!b.navigationKeyCodes[a]
		};
		b.getKeyGroup = function(a) {
			var c = b.keyGroups;
			return f[a] ? c.FUNCTIONAL : c.PRINTABLE
		};
		b.getOppositeKeyGroup = function(a) {
			var c = b.keyGroups;
			return a == c.FUNCTIONAL ? c.PRINTABLE : c.FUNCTIONAL
		};
		b.ieFunctionalKeysBug = function(a) {
			return CKEDITOR.env.ie && b.getKeyGroup(a) == b.keyGroups.FUNCTIONAL
		};
		var c = CKEDITOR.plugins.undo.Image = function(a, b) {
				this.editor = a;
				a.fire("beforeUndoImage");
				var c = a.getSnapshot();
				CKEDITOR.env.ie && c && (c = c.replace(/\s+data-cke-expando=".*?"/g, ""));
				this.contents = c;
				b || (this.bookmarks = (c = c && a.getSelection()) && c.createBookmarks2(!0));
				a.fire("afterUndoImage")
			},
			e = /\b(?:href|src|name)="[^"]*?"/gi;
		c.prototype = {
			equalsContent: function(a) {
				var b = this.contents;
				a = a.contents;
				CKEDITOR.env.ie && (CKEDITOR.env.ie7Compat || CKEDITOR.env.quirks) && (b = b.replace(e, ""), a = a.replace(e, ""));
				return b != a ? !1 : !0
			},
			equalsSelection: function(a) {
				var b = this.bookmarks;
				a = a.bookmarks;
				if (b || a) {
					if (!b || !a || b.length != a.length) return !1;
					for (var c = 0; c < b.length; c++) {
						var e = b[c],
							f = a[c];
						if (e.startOffset != f.startOffset || e.endOffset != f.endOffset || !CKEDITOR.tools.arrayCompare(e.start, f.start) || !CKEDITOR.tools.arrayCompare(e.end, f.end)) return !1
					}
				}
				return !0
			}
		};
		var l = CKEDITOR.plugins.undo.NativeEditingHandler = function(a) {
			this.undoManager = a;
			this.ignoreInputEvent = !1;
			this.keyEventsStack = new k;
			this.lastKeydownImage = null
		};
		l.prototype = {
			onKeydown: function(d) {
				var e = d.data.getKey();
				if (229 !== e)
					if (-1 < CKEDITOR.tools.indexOf(a, d.data.getKeystroke())) d.data.preventDefault();
					else if (this.keyEventsStack.cleanUp(d), d = this.undoManager, this.keyEventsStack.getLast(e) || this.keyEventsStack.push(e), this.lastKeydownImage = new c(d.editor), b.isNavigationKey(e) || this.undoManager.keyGroupChanged(e))
					if (d.strokesRecorded[0] || d.strokesRecorded[1]) d.save(!1, this.lastKeydownImage, !1), d.resetType()
			},
			onInput: function() {
				if (this.ignoreInputEvent) this.ignoreInputEvent = !1;
				else {
					var a = this.keyEventsStack.getLast();
					a || (a = this.keyEventsStack.push(0));
					this.keyEventsStack.increment(a.keyCode);
					this.keyEventsStack.getTotalInputs() >= this.undoManager.strokesLimit && (this.undoManager.type(a.keyCode, !0), this.keyEventsStack.resetInputs())
				}
			},
			onKeyup: function(a) {
				var e = this.undoManager;
				a = a.data.getKey();
				var f = this.keyEventsStack.getTotalInputs();
				this.keyEventsStack.remove(a);
				if (!(b.ieFunctionalKeysBug(a) && this.lastKeydownImage && this.lastKeydownImage.equalsContent(new c(e.editor, !0))))
					if (0 < f) e.type(a);
					else if (b.isNavigationKey(a)) this.onNavigationKey(!0)
			},
			onNavigationKey: function(a) {
				var b = this.undoManager;
				!a && b.save(!0, null, !1) || b.updateSelection(new c(b.editor));
				b.resetType()
			},
			ignoreInputEventListener: function() {
				this.ignoreInputEvent = !0
			},
			attachListeners: function() {
				var a = this.undoManager.editor,
					c = a.editable(),
					e = this;
				c.attachListener(c, "keydown", function(a) {
					e.onKeydown(a);
					if (b.ieFunctionalKeysBug(a.data.getKey())) e.onInput()
				}, null, null, 999);
				c.attachListener(c, CKEDITOR.env.ie ? "keypress" : "input", e.onInput, e, null, 999);
				c.attachListener(c, "keyup", e.onKeyup, e, null, 999);
				c.attachListener(c, "paste", e.ignoreInputEventListener, e, null, 999);
				c.attachListener(c, "drop", e.ignoreInputEventListener, e, null, 999);
				c.attachListener(c.isInline() ? c : a.document.getDocumentElement(), "click", function() {
					e.onNavigationKey()
				}, null, null, 999);
				c.attachListener(this.undoManager.editor, "blur", function() {
					e.keyEventsStack.remove(9)
				}, null, null, 999)
			}
		};
		var k = CKEDITOR.plugins.undo.KeyEventsStack = function() {
			this.stack = []
		};
		k.prototype = {
			push: function(a) {
				a = this.stack.push({
					keyCode: a,
					inputs: 0
				});
				return this.stack[a - 1]
			},
			getLastIndex: function(a) {
				if ("number" != typeof a) return this.stack.length - 1;
				for (var b = this.stack.length; b--;)
					if (this.stack[b].keyCode == a) return b;
				return -1
			},
			getLast: function(a) {
				a = this.getLastIndex(a);
				return -1 != a ? this.stack[a] : null
			},
			increment: function(a) {
				this.getLast(a).inputs++
			},
			remove: function(a) {
				a = this.getLastIndex(a); - 1 != a && this.stack.splice(a, 1)
			},
			resetInputs: function(a) {
				if ("number" == typeof a) this.getLast(a).inputs = 0;
				else
					for (a = this.stack.length; a--;) this.stack[a].inputs = 0
			},
			getTotalInputs: function() {
				for (var a = this.stack.length, b = 0; a--;) b += this.stack[a].inputs;
				return b
			},
			cleanUp: function(a) {
				a = a.data.$;
				a.ctrlKey || a.metaKey || this.remove(17);
				a.shiftKey || this.remove(16);
				a.altKey || this.remove(18)
			}
		}
	}(), CKEDITOR.plugins.add("wsc", {
		requires: "dialog",
		parseApi: function(a) {
			a.config.wsc_onFinish = "function" === typeof a.config.wsc_onFinish ? a.config.wsc_onFinish : function() {};
			a.config.wsc_onClose = "function" === typeof a.config.wsc_onClose ? a.config.wsc_onClose : function() {}
		},
		parseConfig: function(a) {
			a.config.wsc_customerId = a.config.wsc_customerId || CKEDITOR.config.wsc_customerId || "1:ua3xw1-2XyGJ3-GWruD3-6OFNT1-oXcuB1-nR6Bp4-hgQHc-EcYng3-sdRXG3-NOfFk";
			a.config.wsc_customDictionaryIds = a.config.wsc_customDictionaryIds || CKEDITOR.config.wsc_customDictionaryIds || "";
			a.config.wsc_userDictionaryName = a.config.wsc_userDictionaryName || CKEDITOR.config.wsc_userDictionaryName || "";
			a.config.wsc_customLoaderScript = a.config.wsc_customLoaderScript || CKEDITOR.config.wsc_customLoaderScript;
			a.config.wsc_interfaceLang = a.config.wsc_interfaceLang;
			CKEDITOR.config.wsc_cmd = a.config.wsc_cmd || CKEDITOR.config.wsc_cmd || "spell";
			CKEDITOR.config.wsc_version = "v4.3.0-master-d769233";
			CKEDITOR.config.wsc_removeGlobalVariable = !0
		},
		onLoad: function(a) {
			"moono-lisa" == (CKEDITOR.skinName || a.config.skin) && CKEDITOR.document.appendStyleSheet(this.path + "skins/" + CKEDITOR.skin.name + "/wsc.css")
		},
		init: function(a) {
			var f = CKEDITOR.env;
			this.parseConfig(a);
			this.parseApi(a);
			a.addCommand("checkspell", new CKEDITOR.dialogCommand("checkspell")).modes = {
				wysiwyg: !CKEDITOR.env.opera && !CKEDITOR.env.air && document.domain == window.location.hostname && !(f.ie && (8 > f.version || f.quirks))
			};
			"undefined" == typeof a.plugins.scayt && a.ui.addButton && a.ui.addButton("SpellChecker", {
				label: a.lang.wsc.toolbar,
				click: function(a) {
					var c = a.elementMode == CKEDITOR.ELEMENT_MODE_INLINE ? a.container.getText() : a.document.getBody().getText();
					(c = c.replace(/\s/g, "")) ? a.execCommand("checkspell"): alert("Nothing to check!")
				},
				toolbar: "spellchecker,10"
			});
			CKEDITOR.dialog.add("checkspell", this.path + (CKEDITOR.env.ie && 7 >= CKEDITOR.env.version ? "dialogs/wsc_ie.js" : window.postMessage ? "dialogs/wsc.js" : "dialogs/wsc_ie.js"))
		}
	}), function() {
		function a(a) {
			function b(a) {
				var c = !1;
				g.attachListener(g, "keydown", function() {
					var b = d.getBody().getElementsByTag(a);
					if (!c) {
						for (var e = 0; e < b.count(); e++) b.getItem(e).setCustomData("retain", !0);
						c = !0
					}
				}, null, null, 1);
				g.attachListener(g, "keyup", function() {
					var b = d.getElementsByTag(a);
					c && (1 != b.count() || b.getItem(0).getCustomData("retain") || b.getItem(0).hasAttribute("data-cke-temp") || b.getItem(0).remove(1), c = !1)
				})
			}
			var c = this.editor,
				d = a.document,
				h = d.body,
				m = d.getElementById("cke_actscrpt");
			m && m.parentNode.removeChild(m);
			(m = d.getElementById("cke_shimscrpt")) && m.parentNode.removeChild(m);
			(m = d.getElementById("cke_basetagscrpt")) && m.parentNode.removeChild(m);
			h.contentEditable = !0;
			CKEDITOR.env.ie && (h.hideFocus = !0, h.disabled = !0, h.removeAttribute("disabled"));
			delete this._.isLoadingData;
			this.$ = h;
			d = new CKEDITOR.dom.document(d);
			this.setup();
			this.fixInitialSelection();
			var g = this;
			CKEDITOR.env.ie && !CKEDITOR.env.edge && d.getDocumentElement().addClass(d.$.compatMode);
			CKEDITOR.env.ie && !CKEDITOR.env.edge && c.enterMode != CKEDITOR.ENTER_P ? b("p") : CKEDITOR.env.edge && c.enterMode != CKEDITOR.ENTER_DIV && b("div");
			if (CKEDITOR.env.webkit || CKEDITOR.env.ie && 10 < CKEDITOR.env.version) d.getDocumentElement().on("mousedown", function(a) {
				a.data.getTarget().is("html") && setTimeout(function() {
					c.editable().focus()
				})
			});
			f(c);
			try {
				c.document.$.execCommand("2D-position", !1, !0)
			} catch (n) {}(CKEDITOR.env.gecko || CKEDITOR.env.ie && "CSS1Compat" == c.document.$.compatMode) && this.attachListener(this, "keydown", function(a) {
				var b = a.data.getKeystroke();
				if (33 == b || 34 == b)
					if (CKEDITOR.env.ie) setTimeout(function() {
						c.getSelection().scrollIntoView()
					}, 0);
					else if (c.window.$.innerHeight > this.$.offsetHeight) {
					var d = c.createRange();
					d[33 == b ? "moveToElementEditStart" : "moveToElementEditEnd"](this);
					d.select();
					a.data.preventDefault()
				}
			});
			CKEDITOR.env.ie && this.attachListener(d, "blur", function() {
				try {
					d.$.selection.empty()
				} catch (a) {}
			});
			CKEDITOR.env.iOS && this.attachListener(d, "touchend", function() {
				a.focus()
			});
			h = c.document.getElementsByTag("title").getItem(0);
			h.data("cke-title", h.getText());
			CKEDITOR.env.ie && (c.document.$.title = this._.docTitle);
			CKEDITOR.tools.setTimeout(function() {
				"unloaded" == this.status && (this.status = "ready");
				c.fire("contentDom");
				this._.isPendingFocus && (c.focus(), this._.isPendingFocus = !1);
				setTimeout(function() {
					c.fire("dataReady")
				}, 0)
			}, 0, this)
		}

		function f(a) {
			function b() {
				var d;
				a.editable().attachListener(a, "selectionChange", function() {
					var b = a.getSelection().getSelectedElement();
					b && (d && (d.detachEvent("onresizestart", c), d = null), b.$.attachEvent("onresizestart", c), d = b.$)
				})
			}

			function c(a) {
				a.returnValue = !1
			}
			if (CKEDITOR.env.gecko) try {
				var d = a.document.$;
				d.execCommand("enableObjectResizing", !1, !a.config.disableObjectResizing);
				d.execCommand("enableInlineTableEditing", !1, !a.config.disableNativeTableHandles)
			} catch (f) {} else CKEDITOR.env.ie && 11 > CKEDITOR.env.version && a.config.disableObjectResizing && b(a)
		}

		function b() {
			var a = [];
			if (8 <= CKEDITOR.document.$.documentMode) {
				a.push("html.CSS1Compat [contenteditable\x3dfalse]{min-height:0 !important}");
				var b = [],
					c;
				for (c in CKEDITOR.dtd.$removeEmpty) b.push("html.CSS1Compat " + c + "[contenteditable\x3dfalse]");
				a.push(b.join(",") + "{display:inline-block}")
			} else CKEDITOR.env.gecko && (a.push("html{height:100% !important}"), a.push("img:-moz-broken{-moz-force-broken-image-icon:1;min-width:24px;min-height:24px}"));
			a.push("html{cursor:text;*cursor:auto}");
			a.push("img,input,textarea{cursor:default}");
			return a.join("\n")
		}
		var c;
		CKEDITOR.plugins.add("wysiwygarea", {
			init: function(a) {
				a.config.fullPage && a.addFeature({
					allowedContent: "html head title; style [media,type]; body (*)[id]; meta link [*]",
					requiredContent: "body"
				});
				a.addMode("wysiwyg", function(b) {
					function f(d) {
						d && d.removeListener();
						a.editable(new c(a, h.$.contentWindow.document.body));
						a.setData(a.getData(1), b)
					}
					var d = "document.open();" + (CKEDITOR.env.ie ? "(" + CKEDITOR.tools.fixDomain + ")();" : "") + "document.close();",
						d = CKEDITOR.env.air ? "javascript:void(0)" : CKEDITOR.env.ie && !CKEDITOR.env.edge ? "javascript:void(function(){" + encodeURIComponent(d) + "}())" : "",
						h = CKEDITOR.dom.element.createFromHtml('\x3ciframe src\x3d"' + d + '" frameBorder\x3d"0"\x3e\x3c/iframe\x3e');
					h.setStyles({
						width: "100%",
						height: "100%"
					});
					h.addClass("cke_wysiwyg_frame").addClass("cke_reset");
					d = a.ui.space("contents");
					d.append(h);
					var m = CKEDITOR.env.ie && !CKEDITOR.env.edge || CKEDITOR.env.gecko;
					if (m) h.on("load", f);
					var g = a.title,
						n = a.fire("ariaEditorHelpLabel", {}).label;
					g && (CKEDITOR.env.ie && n && (g += ", " + n), h.setAttribute("title", g));
					if (n) {
						var g = CKEDITOR.tools.getNextId(),
							p = CKEDITOR.dom.element.createFromHtml('\x3cspan id\x3d"' + g + '" class\x3d"cke_voice_label"\x3e' + n + "\x3c/span\x3e");
						d.append(p, 1);
						h.setAttribute("aria-describedby", g)
					}
					a.on("beforeModeUnload", function(a) {
						a.removeListener();
						p && p.remove()
					});
					h.setAttributes({
						tabIndex: a.tabIndex,
						allowTransparency: "true"
					});
					!m && f();
					a.fire("ariaWidget", h)
				})
			}
		});
		CKEDITOR.editor.prototype.addContentsCss = function(a) {
			var b = this.config,
				c = b.contentsCss;
			CKEDITOR.tools.isArray(c) || (b.contentsCss = c ? [c] : []);
			b.contentsCss.push(a)
		};
		c = CKEDITOR.tools.createClass({
			$: function() {
				this.base.apply(this, arguments);
				this._.frameLoadedHandler = CKEDITOR.tools.addFunction(function(b) {
					CKEDITOR.tools.setTimeout(a, 0, this, b)
				}, this);
				this._.docTitle = this.getWindow().getFrame().getAttribute("title")
			},
			base: CKEDITOR.editable,
			proto: {
				setData: function(a, c) {
					var f = this.editor;
					if (c) this.setHtml(a), this.fixInitialSelection(), f.fire("dataReady");
					else {
						this._.isLoadingData = !0;
						f._.dataStore = {
							id: 1
						};
						var d = f.config,
							h = d.fullPage,
							m = d.docType,
							g = CKEDITOR.tools.buildStyleHtml(b()).replace(/<style>/, '\x3cstyle data-cke-temp\x3d"1"\x3e');
						h || (g += CKEDITOR.tools.buildStyleHtml(f.config.contentsCss));
						var n = d.baseHref ? '\x3cbase href\x3d"' + d.baseHref + '" data-cke-temp\x3d"1" /\x3e' : "";
						h && (a = a.replace(/<!DOCTYPE[^>]*>/i, function(a) {
							f.docType = m = a;
							return ""
						}).replace(/<\?xml\s[^\?]*\?>/i, function(a) {
							f.xmlDeclaration = a;
							return ""
						}));
						a = f.dataProcessor.toHtml(a);
						h ? (/<body[\s|>]/.test(a) || (a = "\x3cbody\x3e" + a), /<html[\s|>]/.test(a) || (a = "\x3chtml\x3e" + a + "\x3c/html\x3e"), /<head[\s|>]/.test(a) ? /<title[\s|>]/.test(a) || (a = a.replace(/<head[^>]*>/, "$\x26\x3ctitle\x3e\x3c/title\x3e")) : a = a.replace(/<html[^>]*>/, "$\x26\x3chead\x3e\x3ctitle\x3e\x3c/title\x3e\x3c/head\x3e"), n && (a = a.replace(/<head[^>]*?>/, "$\x26" + n)), a = a.replace(/<\/head\s*>/, g + "$\x26"), a = m + a) : a = d.docType + '\x3chtml dir\x3d"' + d.contentsLangDirection + '" lang\x3d"' + (d.contentsLanguage || f.langCode) + '"\x3e\x3chead\x3e\x3ctitle\x3e' + this._.docTitle + "\x3c/title\x3e" + n + g + "\x3c/head\x3e\x3cbody" + (d.bodyId ? ' id\x3d"' + d.bodyId + '"' : "") + (d.bodyClass ? ' class\x3d"' + d.bodyClass + '"' : "") + "\x3e" + a + "\x3c/body\x3e\x3c/html\x3e";
						CKEDITOR.env.gecko && (a = a.replace(/<body/, '\x3cbody contenteditable\x3d"true" '), 2E4 > CKEDITOR.env.version && (a = a.replace(/<body[^>]*>/, "$\x26\x3c!-- cke-content-start --\x3e")));
						d = '\x3cscript id\x3d"cke_actscrpt" type\x3d"text/javascript"' + (CKEDITOR.env.ie ? ' defer\x3d"defer" ' : "") + "\x3evar wasLoaded\x3d0;function onload(){if(!wasLoaded)window.parent.CKEDITOR.tools.callFunction(" + this._.frameLoadedHandler + ",window);wasLoaded\x3d1;}" + (CKEDITOR.env.ie ? "onload();" : 'document.addEventListener("DOMContentLoaded", onload, false );') + "\x3c/script\x3e";
						CKEDITOR.env.ie && 9 > CKEDITOR.env.version && (d += '\x3cscript id\x3d"cke_shimscrpt"\x3ewindow.parent.CKEDITOR.tools.enableHtml5Elements(document)\x3c/script\x3e');
						n && CKEDITOR.env.ie && 10 > CKEDITOR.env.version && (d += '\x3cscript id\x3d"cke_basetagscrpt"\x3evar baseTag \x3d document.querySelector( "base" );baseTag.href \x3d baseTag.href;\x3c/script\x3e');
						a = a.replace(/(?=\s*<\/(:?head)>)/, d);
						this.clearCustomData();
						this.clearListeners();
						f.fire("contentDomUnload");
						var p = this.getDocument();
						try {
							p.write(a)
						} catch (r) {
							setTimeout(function() {
								p.write(a)
							}, 0)
						}
					}
				},
				getData: function(a) {
					if (a) return this.getHtml();
					a = this.editor;
					var b = a.config,
						c = b.fullPage,
						d = c && a.docType,
						f = c && a.xmlDeclaration,
						m = this.getDocument(),
						c = c ? m.getDocumentElement().getOuterHtml() : m.getBody().getHtml();
					CKEDITOR.env.gecko && b.enterMode != CKEDITOR.ENTER_BR && (c = c.replace(/<br>(?=\s*(:?$|<\/body>))/, ""));
					c = a.dataProcessor.toDataFormat(c);
					f && (c = f + "\n" + c);
					d && (c = d + "\n" + c);
					return c
				},
				focus: function() {
					this._.isLoadingData ? this._.isPendingFocus = !0 : c.baseProto.focus.call(this)
				},
				detach: function() {
					var a = this.editor,
						b = a.document,
						f;
					try {
						f = a.window.getFrame()
					} catch (d) {}
					c.baseProto.detach.call(this);
					this.clearCustomData();
					b.getDocumentElement().clearCustomData();
					CKEDITOR.tools.removeFunction(this._.frameLoadedHandler);
					f && f.getParent() ? (f.clearCustomData(), (a = f.removeCustomData("onResize")) && a.removeListener(), f.remove()) : CKEDITOR.warn("editor-destroy-iframe")
				}
			}
		})
	}(), CKEDITOR.config.disableObjectResizing = !1, CKEDITOR.config.disableNativeTableHandles = !0, CKEDITOR.config.disableNativeSpellChecker = !0, CKEDITOR.config.plugins = "dialogui,dialog,a11yhelp,about,basicstyles,blockquote,button,toolbar,notification,clipboard,panel,floatpanel,menu,contextmenu,elementspath,indent,indentlist,list,enterkey,entities,popup,filebrowser,floatingspace,listblock,richcombo,format,horizontalrule,htmlwriter,image,fakeobjects,link,magicline,maximize,pastefromword,pastetext,removeformat,resize,menubutton,scayt,showborders,sourcearea,specialchar,stylescombo,tab,table,tabletools,tableselection,undo,wsc,wysiwygarea", CKEDITOR.config.skin = "moono-lisa", function() {
		var a = function(a, b) {
			var c = CKEDITOR.getUrl("plugins/" + b);
			a = a.split(",");
			for (var e = 0; e < a.length; e++) CKEDITOR.skin.icons[a[e]] = {
				path: c,
				offset: -a[++e],
				bgsize: a[++e]
			}
		};
		CKEDITOR.env.hidpi ? a("about,0,,bold,24,,italic,48,,strike,72,,subscript,96,,superscript,120,,underline,144,,bidiltr,168,,bidirtl,192,,blockquote,216,,copy-rtl,240,,copy,264,,cut-rtl,288,,cut,312,,paste-rtl,336,,paste,360,,codesnippet,384,,bgcolor,408,,textcolor,432,,copyformatting,456,,creatediv,480,,docprops-rtl,504,,docprops,528,,embed,552,,embedsemantic,576,,find-rtl,600,,find,624,,replace,648,,flash,672,,button,696,,checkbox,720,,form,744,,hiddenfield,768,,imagebutton,792,,radio,816,,select-rtl,840,,select,864,,textarea-rtl,888,,textarea,912,,textfield-rtl,936,,textfield,960,,horizontalrule,984,,iframe,1008,,image,1032,,indent-rtl,1056,,indent,1080,,outdent-rtl,1104,,outdent,1128,,justifyblock,1152,,justifycenter,1176,,justifyleft,1200,,justifyright,1224,,language,1248,,anchor-rtl,1272,,anchor,1296,,link,1320,,unlink,1344,,bulletedlist-rtl,1368,,bulletedlist,1392,,numberedlist-rtl,1416,,numberedlist,1440,,mathjax,1464,,maximize,1488,,newpage-rtl,1512,,newpage,1536,,pagebreak-rtl,1560,,pagebreak,1584,,pastefromword-rtl,1608,,pastefromword,1632,,pastetext-rtl,1656,,pastetext,1680,,placeholder,1704,,preview-rtl,1728,,preview,1752,,print,1776,,removeformat,1800,,save,1824,,scayt,1848,,selectall,1872,,showblocks-rtl,1896,,showblocks,1920,,smiley,1944,,source-rtl,1968,,source,1992,,sourcedialog-rtl,2016,,sourcedialog,2040,,specialchar,2064,,table,2088,,templates-rtl,2112,,templates,2136,,uicolor,2160,,redo-rtl,2184,,redo,2208,,undo-rtl,2232,,undo,2256,,simplebox,4560,auto,spellchecker,2304,", "icons_hidpi.png") : a("about,0,auto,bold,24,auto,italic,48,auto,strike,72,auto,subscript,96,auto,superscript,120,auto,underline,144,auto,bidiltr,168,auto,bidirtl,192,auto,blockquote,216,auto,copy-rtl,240,auto,copy,264,auto,cut-rtl,288,auto,cut,312,auto,paste-rtl,336,auto,paste,360,auto,codesnippet,384,auto,bgcolor,408,auto,textcolor,432,auto,copyformatting,456,auto,creatediv,480,auto,docprops-rtl,504,auto,docprops,528,auto,embed,552,auto,embedsemantic,576,auto,find-rtl,600,auto,find,624,auto,replace,648,auto,flash,672,auto,button,696,auto,checkbox,720,auto,form,744,auto,hiddenfield,768,auto,imagebutton,792,auto,radio,816,auto,select-rtl,840,auto,select,864,auto,textarea-rtl,888,auto,textarea,912,auto,textfield-rtl,936,auto,textfield,960,auto,horizontalrule,984,auto,iframe,1008,auto,image,1032,auto,indent-rtl,1056,auto,indent,1080,auto,outdent-rtl,1104,auto,outdent,1128,auto,justifyblock,1152,auto,justifycenter,1176,auto,justifyleft,1200,auto,justifyright,1224,auto,language,1248,auto,anchor-rtl,1272,auto,anchor,1296,auto,link,1320,auto,unlink,1344,auto,bulletedlist-rtl,1368,auto,bulletedlist,1392,auto,numberedlist-rtl,1416,auto,numberedlist,1440,auto,mathjax,1464,auto,maximize,1488,auto,newpage-rtl,1512,auto,newpage,1536,auto,pagebreak-rtl,1560,auto,pagebreak,1584,auto,pastefromword-rtl,1608,auto,pastefromword,1632,auto,pastetext-rtl,1656,auto,pastetext,1680,auto,placeholder,1704,auto,preview-rtl,1728,auto,preview,1752,auto,print,1776,auto,removeformat,1800,auto,save,1824,auto,scayt,1848,auto,selectall,1872,auto,showblocks-rtl,1896,auto,showblocks,1920,auto,smiley,1944,auto,source-rtl,1968,auto,source,1992,auto,sourcedialog-rtl,2016,auto,sourcedialog,2040,auto,specialchar,2064,auto,table,2088,auto,templates-rtl,2112,auto,templates,2136,auto,uicolor,2160,auto,redo-rtl,2184,auto,redo,2208,auto,undo-rtl,2232,auto,undo,2256,auto,simplebox,2280,auto,spellchecker,2304,auto", "icons.png")
	}())
})();