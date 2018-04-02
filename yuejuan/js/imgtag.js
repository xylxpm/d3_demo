(function (c) {
    function b(g, e) {
        this.$container = g;
        this.settings = e;
        this.tags = c([]);
        this.scoreTemp = 0;
        var d = this;
        var f = g.css("position");
        if (f != "relative" && f != "absolute" && f != "fixed") {
            g.css("position", "relative")
        }
        if (e.isCreateEnabled) {
            g.bind("contextmenu", function () {
                return false
            }).bind("mousedown", function (h) {
                if (h.button != 2) {
                    if (!c(h.target).hasClass("delete_tag")) {
                        h.preventDefault();
                        d.setup(h)
                    }
                } else {
                    (c.fn.imgtag.type != "default") && c("#bar_default").trigger("click");
                    if (!c(h.target).hasClass("delete_tag")) {
                        h.preventDefault();
                        d.contextMenu(h);
                        h.stopPropagation()
                    }
                }
            }).mouseover(d.overDelete).delegate("span.delete_tag", "click", function (h) {
                d.deleteTag(c(this).parent());
                h.stopPropagation()
            }).bind("dragstart selectstart", function (h) {
                return (false)
            });
            d.initMenu()
        }
        d.loadTags()
    }

    b.prototype = {
        contextMenu: function (e) {
            var f = this.getRealPosition(e);
            var d = this.$container.children(".contextMenu");
            d.css({top: f.y, left: f.x}).fadeIn("150", function () {
                c(document).bind("mousedown", function () {
                    d.fadeOut("75", function () {
                        c(document).unbind("mousedown")
                    })
                })
            }).data("beginPosition", f)
        }, initMenu: function () {
            var d = this;
            var e = d.$container.children(".contextMenu");
            e.find("span").mouseover(function () {
                e.find("li.hover").removeClass("hover");
                c(this).parent().addClass("hover")
            }).mouseout(function () {
                e.find("li.hover").removeClass("hover")
            });
            e.find("li span").click(function () {
                e.hide();
                var f = c(this).attr("title");
                var g = e.data("beginPosition");
                if (f == "right") {
                    d.addRight(g)
                } else {
                    if (f == "wrong") {
                        d.addWrong(g)
                    } else {
                        c.fn.imgtag.score = f;
                        d.addScore(g)
                    }
                }
                return false
            })
        }, overDelete: function (d) {
            var e = c(d.target);
            if (e.hasClass("draw")) {
                c("span.delete_tag").hide();
                e.children("span.delete_tag").show()
            } else {
                if (!e.hasClass("delete_tag")) {
                    c("span.delete_tag").hide()
                }
            }
        }, addBox: function (i) {
            var f = this;
            var g = f.$container.width();
            var e = f.$container.height();
            var d = f.createBox();
            var h = f.resetPosition(d, i);
            i = {x: h.left + f.settings.size, y: h.top + f.settings.size};
            f.$container.bind("mousemove", function (m) {
                var k = f.getRealPosition(m);
                var l, j;
                var o = Math.max(Math.min(k.x, i.x) - f.settings.size, 0);
                var n = Math.max(Math.min(k.y, i.y) - f.settings.size, 0);
                if (k.x > i.x) {
                    l = (Math.min(k.x, g - f.settings.size)) - i.x
                } else {
                    l = i.x - (Math.max(k.x, f.settings.size))
                }
                if (k.y > i.y) {
                    j = (Math.min(k.y, e - f.settings.size)) - i.y
                } else {
                    j = i.y - (Math.max(k.y, f.settings.size))
                }
                d.css({left: o, top: n, width: l, height: j})
            });
            f.$container.bind("mouseup", function (j) {
                f.$container.unbind("mouseup").unbind("mousemove");
                d.data("init", f.getInitOffset(d));
                (d.width() <= 0 && d.height() <= 0) && f.deleteTag(d)
            })
        }, addLine: function (g) {
            var e = this;
            var f = e.$container.width();
            var d = e.createLine();
            e.resetPosition(d, g);
            e.$container.bind("mousemove", function (j) {
                var h = e.getRealPosition(j);
                var k, i;
                k = Math.max(Math.min(h.x, g.x), 0);
                if (h.x > g.x) {
                    i = Math.min(h.x, f) - g.x
                } else {
                    i = g.x - (Math.max(h.x, 0))
                }
                d.css({left: k, width: i})
            });
            e.$container.bind("mouseup", function (h) {
                e.$container.unbind("mousemove").unbind("mouseup");
                d.data("init", e.getInitOffset(d));
                (d.width() <= 0) && e.deleteTag(d)
            })
        }, addWave: function (g) {
            var e = this;
            var f = e.$container.width();
            var d = e.createWave();
            e.resetPosition(d, g);
            e.$container.bind("mousemove", function (j) {
                var h = e.getRealPosition(j);
                var i;
                var k = Math.max(Math.min(h.x, g.x), 0);
                if (h.x > g.x) {
                    i = Math.min(h.x, f) - g.x
                } else {
                    i = g.x - (Math.max(h.x, 0))
                }
                d.css({left: k, width: i})
            });
            e.$container.bind("mouseup", function (h) {
                e.$container.unbind("mouseup").unbind("mousemove");
                d.data("init", e.getInitOffset(d));
                (d.width() <= 0) && e.deleteTag(d)
            })
        }, addRight: function (f) {
            var e = this;
            var d = e.createRight().css("font-size", Math.floor(e.settings.right_size * e.settings.bili) + "px");
            e.resetPosition(d, f);
            d.data("init", e.getInitOffset(d))
        }, addWrong: function (f) {
            var e = this;
            var d = e.createWrong().css("font-size", Math.floor(e.settings.wrong_size * e.settings.bili) + "px");
            e.resetPosition(d, f);
            d.data("init", e.getInitOffset(d))
        }, addScore: function (f) {
            var e = this;
            var d = e.createScore().css("font-size", Math.floor(e.settings.score_size * e.settings.bili) + "px").prepend(c.fn.imgtag.score);
            e.resetPosition(d, f);
            d.data("init", e.getInitOffset(d));
            e.caculateScore(c.fn.imgtag.score)
        }, caculateScore: function (d) {
            d = parseFloat(d);
            this.scoreTemp += d;
            this.settings.addScoreAction.call(self.$container, this.scoreTemp)
        }, addWord: function (h) {
            var f = this;
            var d = c("#id_tag_word").children("input");
            var e = d.eq(0);
            var g = d.eq(1);
            g.data("beginPosition", h);
            g.data("self", f);
            c.colorbox({
                inline: true, href: "#id_tag_word", title: "添加文字批注", onComplete: function () {
                    setTimeout(function () {
                        e.focus()
                    }, 0)
                }, onClosed: function () {
                    e.val("")
                }
            });
            if (!g.data("binded")) {
                g.data("binded", "binded");
                g.bind("click", function (i) {
                    var n = g.data("beginPosition");
                    var r = e.val();
                    if (c.trim(r) == "") {
                        jAlert("请输入批注", "温馨提示", function () {
                            e.focus()
                        })
                    } else {
                        if ((/\\/).test(r)) {
                            jAlert("输入的内容含有特殊字符", "温馨提示", function () {
                                e.focus()
                            })
                        } else {
                            var p = g.data("self");
                            var s = p.createWord();
                            r = r.replace(/"/g, "'");
                            var k = p.$container.width(), l = p.$container.height();
                            var q = k - n.x, m = l - n.y;
                            s.prepend(p._escape(r)).css({"font-size": Math.floor(p.settings.word_size * p.settings.bili) + "px"});
                            var j = s.width(), o = s.height();
                            s.css({left: n.x, top: n.y - o / 2});
                            if (j > k) {
                                s.css("left", 0);
                                jAlert("批注过长，请重新输入", "温馨提示", function () {
                                    e.focus();
                                    p.deleteTag(s)
                                })
                            } else {
                                if (j > q) {
                                    s.css("left", k - j)
                                }
                                if (o > m) {
                                    s.css("top", l - o)
                                }
                                s.data("init", p.getInitOffset(s));
                                c.colorbox.close()
                            }
                        }
                    }
                })
            }
        }, setup: function (d) {
            var e = this.getRealPosition(d);
            switch (c.fn.imgtag.type) {
                case"box":
                    this.addBox(e);
                    break;
                case"line":
                    this.addLine(e);
                    break;
                case"wave":
                    this.addWave(e);
                    break;
                case"right":
                    this.addRight(e);
                    break;
                case"wrong":
                    this.addWrong(e);
                    break;
                case"score":
                    this.addScore(e);
                    break;
                case"word":
                    this.addWord(e);
                    break;
                default:
            }
        }, getInitOffset: function (l) {
            var f = this.settings.bili;
            var d = l.position();
            var j = Math.floor(d.left / f);
            var i = Math.floor(d.top / f);
            var e = l.width();
            var k = l.height();
            var h = l.attr("class").split(" ")[0];
            if (h == "box" || h == "line" || h == "wave" || h == "right" || h == "wrong" || h == "score" || h == "word") {
                e = Math.floor(e / f)
            }
            if (h == "box" || h == "right" || h == "wrong" || h == "score" || h == "word") {
                k = Math.floor(k / f)
            } else {
                if (h == "line" || h == "wave") {
                    k = 0
                }
            }
            var g = l.text().replace(/删 除$/, "");
            return {x: j, y: i, width: e, height: k, type: h, note: g}
        }, loadTags: function () {
            var d = this;
            try {
                var g = jQuery.parseJSON(d.settings.loadData);
                if (g != null) {
                    var f = 0;
                    c.each(g, function (i, j) {
                        var h = d.addTag(j);
                        if (j.type == "score") {
                            f += parseFloat(h.data("init").note)
                        }
                    });
                    this.scoreTemp = f;
                    d.setTagsSize()
                }
            } catch (e) {
                return false
            }
        }, clearTags: function () {
            this.tags.remove();
            this.tags = c([]);
            this.scoreTemp = 0
        }, setTagsSize: function () {
            var e = this;
            var d = e.settings.bili;
            e.getTags().each(function () {
                var j = c(this);
                var k = j.data("init");
                var i = Math.floor(k.x * d);
                var h = Math.floor(k.y * d);
                var g = Math.floor(k.width * d);
                var f = Math.floor(k.height * d);
                if (j.hasClass("right") || j.hasClass("wrong")) {
                    j.css({left: i + "px", top: h + "px", "font-size": Math.floor(e.settings.right_size * d)})
                } else {
                    if (j.hasClass("word")) {
                        j.css({left: i + "px", top: h + "px", "font-size": Math.floor(e.settings.word_size * d)})
                    } else {
                        if (j.hasClass("score")) {
                            j.css({left: i + "px", top: h + "px", "font-size": Math.floor(e.settings.score_size * d)})
                        } else {
                            if (j.hasClass("line") || j.hasClass("wave")) {
                                j.css({left: i + "px", top: h + "px", width: g + "px"})
                            } else {
                                if (j.hasClass("box")) {
                                    j.css({left: i + "px", top: h + "px", width: g + "px", height: f + "px"})
                                }
                            }
                        }
                    }
                }
            })
        }, addTag: function (e) {
            var d = null;
            switch (e.type) {
                case"box":
                    d = this.createBox(e);
                    break;
                case"right":
                    d = this.createRight(e);
                    break;
                case"wrong":
                    d = this.createWrong(e);
                    break;
                case"line":
                    d = this.createLine(e);
                    break;
                case"wave":
                    d = this.createWave(e);
                    break;
                case"word":
                    d = this.createWord(e);
                    break;
                case"score":
                    d = this.createScore(e);
                    break;
                default:
            }
            return d
        }, create: function (d) {
            d.appendTo(this.$container);
            this.tags = this.tags.add(d)
        }, getTags: function () {
            return (this.tags)
        }, createBox: function (f) {
            var e = this, d = c(e.settings.templateBox);
            if (f) {
                d.css({left: (f.x + "px"), top: (f.y + "px"), width: ((f.width) + "px"), height: ((f.height) + "px")});
                d.data("init", f)
            }
            e.create(d);
            return (d)
        }, createRight: function (f) {
            var e = this, d = c(e.settings.templateRight);
            if (f) {
                d.css({left: (f.x + "px"), top: (f.y + "px"), "font-size": e.settings.right_size + "px"});
                if (!f.width) {
                    f.width = d.width
                }
                if (!f.height) {
                    f.height = d.heigth
                }
                d.data("init", f)
            }
            e.create(d);
            return (d)
        }, createWrong: function (f) {
            var e = this, d = c(e.settings.templateWrong);
            if (f) {
                d.css({left: (f.x + "px"), top: (f.y + "px"), "font-size": e.settings.wrong_size + "px"});
                if (!f.width) {
                    f.width = d.width
                }
                if (!f.height) {
                    f.height = d.heigth
                }
                d.data("init", f)
            }
            e.create(d);
            return (d)
        }, createScore: function (f) {
            var e = this, d = c(e.settings.templateScore);
            if (f) {
                d.css({left: (f.x + "px"), top: (f.y + "px"), "font-size": e.settings.score_size + "px"});
                d.prepend(f.note);
                if (!f.width) {
                    f.width = d.width
                }
                if (!f.height) {
                    f.height = d.heigth
                }
                d.data("init", f)
            }
            e.create(d);
            return (d)
        }, createLine: function (f) {
            var e = this, d = c(e.settings.templateLine);
            if (f) {
                d.css({left: (f.x + "px"), top: (f.y + "px"), width: ((f.width) + "px")});
                d.data("init", f)
            }
            e.create(d);
            return (d)
        }, createWave: function (f) {
            var e = this, d = c(e.settings.templateWave);
            if (f) {
                d.css({left: (f.x + "px"), top: (f.y + "px"), width: ((f.width) + "px")});
                d.data("init", f)
            }
            e.create(d);
            return (d)
        }, createWord: function (f) {
            var e = this, d = c(e.settings.templateWord);
            if (f) {
                d.css({left: (f.x + "px"), top: (f.y + "px"), "font-size": e.settings.word_size + "px"});
                d.prepend(e._escape(f.note));
                d.data("init", f)
            }
            e.create(d);
            return (d)
        }, getOriginalTags: function () {
            var e = "";
            var d = this.tags.length;
            if (d != 0) {
                e = "[";
                this.tags.each(function (g) {
                    var f = c(this);
                    var h = f.data("init");
                    e += "{";
                    e += '"x":' + (h.x) + ",";
                    e += '"y":' + (h.y) + ",";
                    e += '"width":' + h.width + ",";
                    e += '"height":' + h.height + ",";
                    e += '"note":"' + h.note + '",';
                    e += '"type":"' + h.type + '"';
                    e += "}";
                    if (g != d - 1) {
                        e += ","
                    }
                });
                e += "]"
            }
            return e
        }, hideTags: function () {
            this.tags.hide()
        }, showTags: function () {
            this.tags.show()
        }, deleteTag: function (d) {
            this.tags = this.tags.not(d);
            if (d.hasClass("score")) {
                var e = d.data("init").note;
                this.caculateScore(-e)
            }
            d.remove()
        }, resetPosition: function (g, k) {
            var f, j, h = this.$container.width(), i = this.$container.height();
            var e = g.outerWidth(true) / 2, d = g.outerHeight(true) / 2;
            if (k.x < d) {
                f = 0
            } else {
                if (k.x > h - e) {
                    f = h - e * 2
                } else {
                    f = k.x - e
                }
            }
            if (k.y < d) {
                j = 0
            } else {
                if (k.y > i - d) {
                    j = i - d * 2
                } else {
                    j = k.y - d
                }
            }
            g.css({left: f, top: j});
            return {left: f, top: j}
        }, getRealPosition: function (e) {
            var d = this.$container.offset();
            return {x: Math.floor(e.pageX - d.left), y: Math.floor(e.pageY - d.top)}
        }, _escape: function (d) {
            return d.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/ /g, "&nbsp;")
        }, _unescape: function (d) {
            return d.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&nbsp;/g, " ")
        }
    };
    var a = {
        init: function (d) {
            return this.each(function () {
                var g = c(this);
                var e = g.data("imgTag");
                if (typeof(e) == "undefined") {
                    var f = new b(g, c.extend({}, c.fn.imgtag.defaults, d));
                    g.data("imgTag", f)
                } else {
                    e.settings = c.extend({}, c.fn.imgtag.defaults, d);
                    e.setTagsSize()
                }
            })
        }, destroy: function (d) {
            return c(this).each(function () {
                var e = c(this);
                e.removeData("imgTag")
            })
        }
    };
    c.fn.imgtag = function () {
        var d = arguments[0];
        if (a[d]) {
            d = a[d];
            arguments = Array.prototype.slice.call(arguments, 1)
        } else {
            if (typeof(d) == "object" || !d) {
                d = a.init
            } else {
                c.error("插件调用失败");
                return this
            }
        }
        return d.apply(this, arguments)
    };
    c.fn.imgtag.defaults = {
        isCreateEnabled: true,
        loadData: "",
        bili: 1,
        addScoreAction: function (d) {
        },
        templateBox: "<div class='box draw'><span class='delete_box delete_tag'>删 除</span></div>",
        templateLine: "<div class='line draw'><span class='delete_tag'>删 除</span></div>",
        templateWave: "<div class='wave draw'><span class='delete_tag'>删 除</span></div>",
        templateWord: "<div class='word draw'><span class='delete_tag'>删 除</span></div>",
        templateRight: "<div class='right draw'>&radic;<span class='delete_tag'>删 除</span></div>",
        templateWrong: "<div class='wrong draw'>&times;<span class='delete_tag'>删 除</span></div>",
        templateScore: "<div class='score draw'><span class='delete_tag'>删 除</span></div>",
        size: 3,
        score_size: 36,
        right_size: 60,
        wrong_size: 60,
        word_size: 24
    };
    c.fn.imgtag.type = "default";
    c.fn.imgtag.score = 0
})(jQuery);