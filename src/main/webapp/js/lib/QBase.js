/**
 * @require_ base/QClass.js
 * @require_ base/jquery.json-2.3.js
 * @require_ base/qhistory.js
 * @require_ base/page.js
 * @require_ base/smallGrid.js
 * @require_ base/Utill.biz.js
 * @require_ base/Util.url.js
 * @require_ base/Utill.function.js
 * @require_ base/Utill.string.js
 * @require_ base/Utill.date.js
 * @require_ base/Util.ajax.js
 * @require_ base/Qpage.base.js
 * @require_ base/Qpage.edit.js
 * @require_ base/Qpage.list.js
 * @require_ base/Qpage.Dialog.js
 */

(function () {
    if (top.__loading__) {
        top.__loading__.hide();
        $(document).undelegate("a[loading]", "click.loading").delegate("a[loading]", "click.loading", function (e) {
            top.__loading__.init();
        });
    }

    //ajax请求loading  begin
    $(document).ajaxStart(function(){
    	try{
    	App=top.App||App;
    	App.blockUI({message:"正在加载中……"});
    	}catch(e){}
    });
    $(document).ajaxStop(function(){
    	try{
    	App=top.App||App;
    	App.unblockUI();
    	}catch(e){}
    });
    //ajax请求loading  end



})();
(function (global) {

    var objectEach = function (obj, func, scope) {
        for (var x in obj)
            if (obj.hasOwnProperty(x))
                func.call(scope || global, x, obj[x]);
    };

    var arrayEach = Array.prototype.forEach ? function (obj, func) {
        Array.prototype.forEach.call(obj || [], func);
    } : function (obj, func) {
        for (var i = 0 , len = obj && obj.length || 0; i < len; i++)
            func.call(window, obj[i], i);
    };

    var extend = function (params, notOverridden) {
        objectEach(params, function (name, value) {
            var prev = this[ name ];
            if (prev && notOverridden === true)
                return;
            this[ name ] = value;
            if (typeof value === 'function') {
                value.$name = name;
                value.$owner = this;
                if (prev)
                    value.$prev = prev;
            }
        }, this);
    };

    var ns = function (name) {
        var part = global,
            parts = name && name.split('.') || [];

        arrayEach(parts, function (partName) {
            if (partName) {
                part = part[ partName ] || ( part[ partName ] = {});
            }
        });

        return part;
    };


    /**
     * @class XNative
     * @description Base Class , All classes in XClass inherit from XNative
     */

    var XNative = function (params) {

    };

    /**
     * @description mixin
     * @static
     * @param XNative
     * @return self
     */
    XNative.mixin = function (object) {
        this.mixins.push(object);
        extend.call(this.prototype, object.prototype, true);


        return this;
    };

    /**
     * @description implement functions to class
     * @static
     * @param object
     * @return self
     */
    XNative.implement = function (params) {
        extend.call(this.prototype, params);
        return this;
    };


    /**
     * @description implement functions to instance
     * @static
     * @param object
     * @return self
     */

    XNative.prototype.implement = function (params) {
        extend.call(this, params);
        return this;
    };


    /**
     * @description call super class's function
     * @return {Object}
     */
    XNative.prototype.parent = function () {
        var caller = this.parent.caller ,
            func = caller.$prev;
        if (!func)
            throw new Error('can not call parent');
        else {
            return func.apply(this, arguments);
        }
    };

    var PROCESSOR = {
        'statics': function (newClass, methods) {
            objectEach(methods, function (k, v) {
                newClass[ k ] = v;
            });
        },
        'extend': function (newClass, superClass) {
            var superClass = superClass || XNative , prototype = newClass.prototype , superPrototype = superClass.prototype;

            //process mixins
            var mixins = newClass.mixins = [];

            if (superClass.mixins)
                newClass.mixins.push.apply(newClass.mixins, superClass.mixins);

            //process statics
            objectEach(superClass, function (k, v) {
                newClass[ k ] = v;
            })

            //process prototype
            objectEach(superPrototype, function (k, v) {
                prototype[ k ] = v;
            });

            newClass.superclass = prototype.superclass = superClass;
        },
        'mixins': function (newClass, value) {

            arrayEach(value, function (v) {
                newClass.mixin(v);
            });
        }
    };

    var PROCESSOR_KEYS = ['statics', 'extend', 'mixins'];

    /**
     * @class XClass
     * @description Class Factory
     * @param  {Object} params
     * @return {Object} object ：New Class
     * @example new XClass({
     *     statics : {
     *         static_method : function(){}
     *     },
     *     method1 : function(){},
     *     method2 : function(){},
     *     extend : ExtendedClass,
     *     mixins : [ MixedClass1 , MixedClass2 ],
     *     singleton : false
     * });
     */
    function XClass(params) {

        var singleton = params.singleton;

        var XClass = function () {
            var me = this , args = arguments;

            if (singleton)
                if (XClass.singleton)
                    return XClass.singleton;
                else
                    XClass.singleton = me;

            me.mixins = {};

            arrayEach(XClass.mixins, function (mixin) {
                mixin.prototype.initialize && mixin.prototype.initialize.apply(me, args);

                if (mixin.prototype.name)
                    me.mixins[ mixin.prototype.name ] = mixin.prototype;

            });
            return me.initialize && me.initialize.apply(me, arguments) || me;
        };


        var methods = {};

        arrayEach(PROCESSOR_KEYS, function (key) {
            PROCESSOR[ key ](XClass, params[ key ], key);
        });

        objectEach(params, function (k, v) {
            if (!PROCESSOR[ k ])
                methods[ k ] = v;
        });

        extend.call(XClass.prototype, methods);

        return XClass;
    }

    XClass.utils = {
        object: {
            each: objectEach
        },
        array: {
            forEach: arrayEach
        },
        ns: ns
    };

    XClass.define = function (className, params) {
        if (className) {
            var lastIndex = className && className.lastIndexOf('.') || -1 , newClass;
            return ns(lastIndex === -1 ? null : className.substr(0, lastIndex))[ className.substr(lastIndex + 1) ] = new XClass(params);
        } else
            throw new Error('empty class name!');
    };

    global.Class = XClass;

    // amd support
    if (typeof define === 'function' && define.amd)
        define('class', [], function () {
            return XClass;
        });

})(window);
if (!this.JSON) {
    this.JSON = {};
}

(function () {

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function (key) {

            return isFinite(this.valueOf()) ?
                this.getUTCFullYear() + '-' +
                f(this.getUTCMonth() + 1) + '-' +
                f(this.getUTCDate()) + 'T' +
                f(this.getUTCHours()) + ':' +
                f(this.getUTCMinutes()) + ':' +
                f(this.getUTCSeconds()) + 'Z' : null;
        };

        String.prototype.toJSON =
            Number.prototype.toJSON =
                Boolean.prototype.toJSON = function (key) {
                    return this.valueOf();
                };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"': '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ?
            '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string' ? c :
                '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' :
            '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
            typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
            case 'string':
                return quote(value);

            case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

                return isFinite(value) ? String(value) : 'null';

            case 'boolean':
            case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

                return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

            case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

                if (!value) {
                    return 'null';
                }

// Make an array to hold the partial results of stringifying this object value.

                gap += indent;
                partial = [];

// Is the value an array?

                if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                    length = value.length;
                    for (i = 0; i < length; i += 1) {
                        partial[i] = str(i, value) || 'null';
                    }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                    v = partial.length === 0 ? '[]' :
                        gap ? '[\n' + gap +
                            partial.join(',\n' + gap) + '\n' +
                            mind + ']' :
                            '[' + partial.join(',') + ']';
                    gap = mind;
                    return v;
                }

// If the replacer is an array, use it to select the members to be stringified.

                if (rep && typeof rep === 'object') {
                    length = rep.length;
                    for (i = 0; i < length; i += 1) {
                        k = rep[i];
                        if (typeof k === 'string') {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }
                } else {

// Otherwise, iterate through all of the keys in the object.

                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = str(k, value);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }
                }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

                v = partial.length === 0 ? '{}' :
                    gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' +
                        mind + '}' : '{' + partial.join(',') + '}';
                gap = mind;
                return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                (typeof replacer !== 'object' ||
                    typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/.
                test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').
                    replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
                    replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function' ?
                    walk({'': j}, '') : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
    $.toJSON = JSON.stringify;
    $.evalJSON = JSON.parse;
}());

/*
 * <a href="testtopb.html" qhistory="goto">去往 b 页面</a>
 * <a  qhistory="goback">返回到 a 页面</a>
 * 程序会自动为 带有属性 qhistory 的元素绑定事件
 *
 * 程序前进后退时用：
 * Qhistory.goto("testtopb.html");
 * Qhistory.goback();
 *
 * 为了保存页面状态，页面要实现方法 window.saveStatus=function(){return data;}
 * 恢复页面状态时，可以从 window.getStatus() 中获取页面的状态
 * */

(function (w) {
    var topWin = top;

    function loadurl(url) {
        if (document.getElementById("appFrame")) {
            document.getElementById("appFrame").src = url
        } else {
            location = url;
        }
    }

    w.Qhistory = {
        "reset": function () {
            if (topWin != window)return;
            store.clear();
        },
        "goto": function (url) {
            top.__loading__ && top.__loading__.init();
            store.set(getKey(), window.saveStatus ? window.saveStatus() : null);
            if (url.charAt(0) == "/") {
                url = location.href.match(/([^\/]+:\/+[^\/]+)+/)[1] + url;
            } else if (url.indexOf("http") == 0) {

            } else {
                var path = location.href.match(/([^\?#]+)/)[1];
                path = (path.substr(0, path.lastIndexOf("/") + 1) + url).split("/");
                var paths = [];
                for (var i = 0, len = path.length; i < len; i++) {
                    if (path[i] == "..")paths.pop();
                    else paths.push(path[i]);
                }
                url = paths.join("/");
            }
            loadurl(url);
            return;
            location = url;
        },
        goback: function (url) {
            top.__loading__ && top.__loading__.init();
            if (url) {
                loadurl(url);
            } else {
                var pre = store.top();
                var key= getKey();

                while(pre && pre.k==key){
                    store.pop();
                    pre = store.top();
                }

                if (!pre)history.back();
                else loadurl(pre.k);

            }

        },
        "getList": function () {
            var list = [], _list = store.getList(), key = getKey();
            $.each(_list, function (i, k) {
                if (k != key) {
                    list.push({url: k, title: store.get(k).title});
                }
            });
            return list;
        },
        "setNav": function (title, href) {
            var pageTitle = $("#pageTitle");
            if (pageTitle[0]) {
                pageTitle.show();
                var list = Qhistory.getList();
                var html = [];


                $.each(list, function (i, val) {
                    if (val.url.indexOf(href) == -1) {
                        var str = '<li><a title="{title}" href="{url}" qhistory="goback">{title}</a> <span class="divider"> &gt; </span></li>';
                        html.push(util.S(str).format(val));
                    }
                });
                html.push('<span class="text-nomal">' + title + '</span>');
                pageTitle.html(html.join(""));
                top.document.title = title;

            }
        }

    };
    var store_ = {
        init: function () {
            this.__store__ = $.extend({}, topWin.__store__);
            this.__store__._queue = this.__store__._queue || [];
            this.__store__._cache = this.__store__._cache || {};
            this.save();
        },
        set: function (k, v) {
            if (typeof(this.__store__._cache[k]) == "undefined")
                this.__store__._queue.push(k);
            this.__store__._cache[k] = v;
            this.save();
        },
        get: function (k) {
            return this.__store__._cache[k];
        },
        pop: function () {
            var k = this.__store__._queue.pop();
            if (!k)return null;
            var v = this.__store__._cache[k];
            delete this.__store__._cache[k];
            this.save();
            return {k: k, v: v};
        },
        top: function () {
            if (this.__store__._queue.length == 0)return null;
            var k = this.__store__._queue[this.__store__._queue.length - 1];
            var v = this.__store__._cache[k];
            return {k: k, v: v};
        },
        getList: function () {
            return this.__store__._queue;
        },
        clear: function () {
            this.__store__._queue = [];
            this.__store__._cache = {};
            this.save();
        },
        save: function () {
            topWin.__store__ = this.__store__;
        }
    };
    var store = {
        init: function () {
            //this.__store__ = $.extend({}, topWin.__store__);
            try {
                this.__store__ = $.extend({}, !!topWin.name ? JSON.parse(topWin.name) : {});
            }
            catch (e) {
                this.__store__ = {};
            }

            this.__store__._queue = this.__store__._queue || [];
            this.__store__._cache = this.__store__._cache || {};
            this.save();
        },
        set: function (k, v) {
            if (typeof(this.__store__._cache[k]) == "undefined")
                this.__store__._queue.push(k);
            this.__store__._cache[k] = v;
            this.save();
        },
        get: function (k) {
            return this.__store__._cache[k];
        },
        pop: function () {
            var k = this.__store__._queue.pop();
            if (!k)return null;
            var v = this.__store__._cache[k];
            delete this.__store__._cache[k];
            this.save();
            return {k: k, v: v};
        },
        top: function () {
            if (this.__store__._queue.length == 0)return null;
            var k = this.__store__._queue[this.__store__._queue.length - 1];
            var v = this.__store__._cache[k];
            return {k: k, v: v};
        },
        getList: function () {
            return this.__store__._queue;
        },
        clear: function () {
            this.__store__._queue = [];
            this.__store__._cache = {};
            this.save();
        },
        save: function () {
            //topWin.__store__ = this.__store__;
            topWin.name = JSON.stringify(this.__store__);
        }
    };

    function getKey() {
        return location.href;
    }

    function initQhistory() {
        var key = getKey(), model = store.get(key);
        if (typeof(model) != "undefined") {
            while (key) {
                var node = store.top();
                if (node && node.k != key) {
                    store.pop();
                } else key = "";
            }
        }
    }

    function initIframeEvent() {
        store.init();
        initQhistory();
        $(document).undelegate("[qhistory]", "click.qhistory").delegate("[qhistory]", "click.qhistory", function (e) {
            if (e.meta || e.ctrlKey) return;
            e.preventDefault();
            e.stopPropagation();
            Qhistory[$(this).attr("qhistory")]($(this).attr("href"));
        });
        w.getStatus = function () {
            var model = store.get(getKey());
            if (model) {
                if (model.data)model = model.data;
                model.__FROMCACHE__ = true;
            }
            return model;
        };
    }

    initIframeEvent(w);
})(window);

/*
 依赖于 base.js  jquery.js   agent.css
 用法： $(".pages").page({recordcount:101,curpage:3,pagesize:20});
 如需重写changepage方法，可以这么用
 $(".pages1").page({recordcount:100,
 event:{
 changepage:function(recordstart,recordend,page){
 alert(1);
 return true;
 }
 }});
 */
(function ($) {

    function page(_config) {

        function gettemplate() {
            return ' <div>  <span class="displaymsg" page_role="recordtip"></span>\
	<span class="pagination pagerpanel">\
        <ul class="pull-right">\
            <li><a href="#" page_role="home">第一页</a></li>\
                <li><a href="#" page_role="prev">上一页</a></li>\
                <li class="active"><a href="#"><span class="text-error">{curpage}</span>/ {pagecount}</a></li>\
                <li><a href="#" page_role="next">下一页</a></li>\
                <li><a href="#" page_role="last">最后一页</a></li>\
                <li style="padding-left:5px;"><input class="custompage-style" type="text" page_role="gotopage" value="" ></li>\
                <li><button class="btn blackBt confirm-custom-style" page_role="confirm">确 定</button></li>\
            </ul>\
        </span></div> ';
        }

        var config = {
            panel: null,
            curpage: 1,
            pagesize: 10,
            recordcount: 0,
            displaymsg: "第{0}到{1}个，共{2}个",
            param: {
                page: "page",
                start: "start",
                end: "end"
            },
            pagecount: 0,
            recordstart: 0,
            recordend: 0,
            template: gettemplate(),
            event: {
                gettype: function (type) {
                    return config.template.find("[page_role='" + type + "']");
                },
                changestate: function (type, func) {
                    var _s = func();
                    // var klacc=_s ? (type + " " + type + "_disable") : type;
                    var klacc = _s ? "active" : "";
                    // config.event.gettype(type).parent().attr("class", klacc).end().unbind("click").click(_s ? function (e) {
                    //     e.preventDefault();
                    //  } : config.event[type]);
                    config.event.gettype(type).parent().attr("class", klacc).end().unbind("click").click(_s ? function (e) {
                        e.preventDefault();
                    } : config.event[type]);
                },
                changepage: function (recordstart, recordend, page) {
                    var data = util.url.getQuery();
                    data[config.param.page] = page;
                    data[config.param.start] = recordstart;
                    data[config.param.end] = recordend;
                    location.href = "?" + $.param(data);
                    return true;
                },
                beforpagechange: function () {
                    if (config.curpage > config.pagecount)
                        config.curpage = config.pagecount;
                    if (config.curpage < 1)
                        config.curpage = 1;
                    config.recordstart = (config.curpage - 1) * config.pagesize + 1;
                    config.recordend = config.curpage * config.pagesize;
                    config.recordend = config.recordend > config.recordcount ? config.recordcount : config.recordend;
                },
                pagechange: function () {
                    config.event.beforpagechange();
                    if (config.event.changepage(config.recordstart, config.recordend, config.curpage))
                        config.event.pagechangeed();
                },
                pagechangeed: function () {
                    if (config.recordstart == 0)
                        config.event.beforpagechange();
                    config.event.changestate("home", function () {
                        return config.curpage == 1
                    });
                    config.event.changestate("prev", function () {
                        return config.curpage < 2
                    });
                    config.event.changestate("next", function () {
                        return config.curpage >= config.pagecount
                    });
                    config.event.changestate("last", function () {
                        return config.curpage == config.pagecount
                    });
                    config.event.gettype("recordtip").html(util.S.format(config.displaymsg, [config.recordstart, config.recordend, config.recordcount]));
                    config.event.gettype("gotopage").val(config.curpage);
                },
                home: function (e) {
                    e.preventDefault();
                    config.curpage = 1;
                    config.event.pagechange();
                },
                prev: function (e) {
                    e.preventDefault();
                    config.curpage--;
                    config.event.pagechange();
                },
                next: function (e) {
                    e.preventDefault();
                    config.curpage++;
                    config.event.pagechange();
                },
                last: function (e) {
                    e.preventDefault();
                    config.curpage = config.pagecount;
                    config.event.pagechange();
                },
                refesh: function (e) {
                    e.preventDefault();
                    config.event.pagechange();
                },
                gotopage: function (e) {
                    if (e.keyCode == 13) {
                        config.event._gotopage();
                    }
                },
                confirm: function (e) {
                    e.preventDefault();
                    config.event._gotopage();
                },
                _gotopage: function () {
                    var _cur = config.event.gettype("gotopage").val();
                    //console.info(_cur)
                    if (!util.S(_cur).isInt2()) {
                        Qpage.Alert({msg: '<div style="text-align:center;">请输入大于0的纯数字！</div>'});
                        // alert("请输入数字");
                        //Qpage.Alert({msg: "请输入数字！"});
                        return;
                    }
                    _cur = util.S.toInt(_cur);
                    if (_cur == config.curpage || _cur == 0)
                        return;
                    config.curpage = _cur;
                    config.event.pagechange();
                }
            }
        };

        function init() {
            $.extend(true, config, _config);
            if (config.recordcount > 0)
                config.pagecount = parseInt((config.recordcount - 1) / config.pagesize) + 1;
            if (config.pagecount == 0)
                return;
            config.template = $($.trim(config.template.replace("{pagecount}", config.pagecount).replace("{curpage}", config.curpage)));
            config.event.pagechangeed();
            config.event.gettype("gotopage").focusin(function () {
                this.select();
            }).keydown(config.event.gotopage);
            config.event.gettype("refesh").click(config.event.refesh);
            config.event.gettype("confirm").click(config.event.confirm);
            if (config.panel)
                $(config.panle).append(config.template);
            else
                return config.template;
        }

        return init();
    }

    window.Qpage = window.Qpage || {};
    window.Qpage.page = page;
    $.fn.page = function (config) {
        $(this).append(Qpage.page(config));
    };
    Class.define("Qpage.pager", {
        isShowPager: function () {
            return true;
        },
        getPagerPanel: function () {
            return this.el.pager;
        },
        getPagerMsg: function () {
            return '第<span>{0}</span>到<span>{1}</span>条记录，共<span>{2}</span>条记录';
        },
        getPageSize: function () {
            return 20;
        },
        m_getBaseParamPager: function () {
            if (this.isShowPager() && this.getPagerPanel()) {
                var pagesize = this.getPageSize();
                //return {start: 1, end: pagesize, pageSize: pagesize, curPage: 1};
                return {start: 1, end: pagesize, rn: pagesize, pn: 1};

            } else
                return {};
        },
        changePage: function (recordstart, recordend, curPage) {
            return true;
        },
        renderPager: function (totalCount, curPage) {
            var self = this;
            if (this.isShowPager() && this.getPagerPanel()) {
                this.getPagerPanel().empty().page({
                    recordcount: totalCount,
                    curpage: curPage,
                    pagesize: self.getPageSize(),
                    event: {
                        changepage: util.F.proxy(self.changePage, self)
                    },
                    displaymsg: this.getPagerMsg()
                });
            }
        }
    });
})(jQuery);

(function () {
    this.smallGrid = new Class({
        initialize: function (cols, dataSet, panel) {
            var table = this.table = $('<table class="table table-bordered table-striped"  ><thead><tr></tr></thead><tbody></tbody></table>');
            var table_header = table.find('thead tr');
            var _renderHeader = function (el, col, i) {
                el.html(col.header);
                col["style"] && el.css(col["style"]);
            };
            $.each(cols, function (i, col) {
                var head_cell = $('<th></th>');
                table_header.append(head_cell);
                (col.renderHeader || _renderHeader)(head_cell, col, i);
            });
            var table_body = table.find('tbody');
            var _render = function (el, data, rowIndex, col, cellIndex) {
                data["rowIndex"] = rowIndex + 1;
                el.html(util.S(col.html).format(data, "", "", true));
                col["class"] && el.addClass(col["class"]);
                col["style"] && el.css(col["style"]);
            };
            $.each(dataSet, function (rowIndex, data) {
                var row = $('<tr id="row_' + rowIndex + '"></tr>');
                table_body.append(row);
                row.data("origin", data);
                $.each(cols, function (cellIndex, col) {
                    var cell = $('<td><div id="cell_' + rowIndex + '_' + cellIndex + '" ></div></td>');
                    row.append(cell);
                    (col.render || _render)(cell.find("div"), data, rowIndex, col, cellIndex);
                });
            });
            table_body.find("tr").mouseover(function () {
                $(this).addClass("hover");
            }).mouseout(function () {
                $(this).removeClass("hover");
            });
            if (panel && panel[0])
                panel.empty().append(this.table);
        }
    });
    Class.define("Qpage.grid", {
        isFixedGridHead: function () {
            return false;
        },
        getGridCols: function () {
            return [];
        },
        getGridClass: function () {
            return "table table-bordered table-striped"
        },
        getGridPanel: function () {
            return this.el.grid;
        },
        renderGrid: function (dataSet) {
            var _smallGrid = new smallGrid(this.getGridCols(), dataSet);
            this.getGridPanel().empty().append(_smallGrid.table.addClass(this.getGridClass()));
            this.fixedGridHead(_smallGrid);

            //后来添加
            if(dataSet.length==0){
            	this.getGridPanel().append('<div style="text-align:center; height:40px; line-height:40px;">暂无数据 ㄒoㄒ~</div>');
            };
            
        },
        clearGrid: function (b) {
            //this.getGridPanel().empty().html(b ? "<div style='text-align: center; height: 50px;'>加载中……</div>" : "");
            this.getGridPanel().empty().html(b ? "<div style='text-align: center; height: 50px;'></div>" : "");
        },
        fixedGridHead: function (grid) {
            if (!this.isFixedGridHead())return;
            var stick = grid.table.clone().hide();
            stick.find("tbody").remove();
            stick.insertBefore(grid.table);
            // this.getGridPanel().append(stick);
            util.biz.stickUp(stick);
        }
    });
}).call(this);


(function () {
    var top = this.top;
    var biz = (this.util = this.util || {}).biz = {};
    var last_h = 0;

    function getDE() {
        return (document.compatMode && document.compatMode.toLowerCase() == "css1compat") ? document.documentElement : document.body;
    }

    function getWH() {
        var de = getDE();
        return {
            width: de.scrollWidth,
            height: de.scrollHeight
        };
    }

        /*biz.autoHeight = function () {
        if (top == window)return;
        var iframe, spleft;
        if (iframe = top.document.getElementById("appFrame")) {
            var h = $(".modal").height();
           var hh = getWH().height;
           if (h < hh)h = hh;
            h = h < 500 ? 500 : h;

            if (spleft = top.$(".main-menu-span")) {
                var _h = $(spleft).height();
                h = h < _h ? _h : h;
                //last_h != h && $(spleft).css("height", h);
            }
            last_h != h && (iframe.style.height = h + "px");
            last_h = h;
        }
        setTimeout(biz.autoHeight, 500);
    };*/
    //重写autoHeight
        biz.autoHeight = function () {
            if (top == window)return;
            var iframe, spleft;
            if (iframe = top.document.getElementById("appFrame")) {
                //var h = $(".modal").height();
                var h = $(document.body).height();
               var hh = getWH().height;
               //if (h < hh)h = hh;
                h = h < 500 ? 500 : h;
                if (spleft = top.$(".main-menu-span")[0]) {
                    //console.info('zzhnokia')
                    var _h = $(spleft).height();
                    h = h < _h ? _h : h;
                    //last_h != h && $(spleft).css("height", h);
                }
                last_h != h && (iframe.style.height = h + "px");
                last_h = h;
            }
            setTimeout(biz.autoHeight, 500);
        };
    biz.stickUp = function (stick) {

        if (top != window) {
            echo($(top.document).find("iframe").position());
        }
        stick.css({
            // "zIndex" : 2,
            //"position" : "fixed",//absolute
            "backgroundColor": "#FFFFFF",
            "boxShadow": "0 3px 7px rgba(0, 0, 0, 0.3)"
        }).hide();

    };
    var init = function () {
        biz.autoHeight();
    };
    init();
}).call(this);


(function () {
    var query, hash, hashChangeCallback;
    var url = {
        getQuery: function (key) {
            if (!query)query = this._getCurQuery();
            if (!key)return query;
            return query[key];
        },
        getHash: function (key) {
            if (!hash)hash = this._getCurHash();
            if (!key)return hash;
            return hash[key];
        },
        getCurHash: function () {
            return this._getCurHash(true);
        },
        getCurQuery: function () {
            return this._getCurQuery(true);
        },
        setHash: function (k, v) {
            if (v) {
                var _hash = this._getCurHash();
                _hash[k] = v;
                k = this.objToQuery(_hash);
            }
            location.hash = k;
            hashChangeCallback && hashChangeCallback();
        },
        setHref: function (href) {
            location.href = href;
        },
        reload: function () {
            var path = location.href.match(/([^\?#]+)\??([^#]+)?#?(.*)?/);
            var timestamp = "_ts_=" + new Date().getTime();
            path[2] = !!path[2] ? (path[2] + "&" + timestamp) : timestamp;
            path[3] = !!path[3] ? ("#" + path[3]) : "";
            this.setHref(path[1] + "?" + path[2] + path[3]);
        },
        hashChange: function (fun, interval) {
            var self = this;
            if (typeof(fun) == "function") {
                hashChangeCallback = function () {
                    var curHash = self._getCurHash();
                    if (self.objToQuery(curHash) !== self.objToQuery(hash)) {
                        fun(curHash, hash);
                        hash = curHash;
                    }
                };
                hashChangeCallback();
                setInterval(hashChangeCallback, interval || 50);
            }
        },
        _getCurHash: function (isPure) {
            return this.queryToObj(/#(.+)/, isPure);
        },
        _getCurQuery: function (isPure) {
            return this.queryToObj(/\?([^#]+)/, isPure);
        },
        queryToObj: function (reg, isPure) {
            var _query;
            if (_query = location.href.match(reg)) {
                _query = _query[1];
            }
            if (isPure)return _query;
            if (_query && _query.indexOf("=") > 0) {
                var params = _query.split("&"), pp, _query = {};
                for (var p = 0, len = params.length; p < len; p++) {
                    pp = params[p].split("=");
                    if (pp.length > 1)
                        try {
                            _query[pp[0]] = decodeURIComponent(pp[1]);
                        } catch (e) {
                            _query[pp[0]] = "";
                        }
                }
            }
            return _query || {};
        },
        objToQuery: function (obj) {
            if (typeof(obj) == "string")return obj;
            var query = [];
            for (var k in obj) {
                query.push(k + "=" + obj[k]);
            }
            return query.join("&");
        }
    };
    (this.util = this.util || {}).url = url;
}).call(this);

(function(){
    this.util = this.util || {};
    this.util.loadJs=function (url, callback) {
        var head = document.getElementsByTagName('head')[0],
            script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        script.onload = script.onreadystatechange = function () {
            script.onload = script.onreadystatechange = null;
            callback && callback();
        };
        head.appendChild(script);
    };
    this.util.loadJsSync=function (url, callback) {
        document.write('<script src="'+url+'"></script>');
        callback && $(callback);
    };
    this.util.loadCss=function (url, callback) {

        var head = document.getElementsByTagName('head')[0],
            link = document.createElement('link'),
            callback = callback || function() {};
        link.type = 'text/css';
        link.href = url;
        link.rel = "stylesheet";
        head.appendChild(link);
        if ('sheet' in link) { //FF/CM/OP
            sheet = 'sheet';
            cssRules = 'cssRules';
        } else { //IE
            sheet = 'styleSheet';
            cssRules = 'rules';
        }
        var _timer1 = setInterval(function () { // 通过定时器检测css是否加载成功
                try {
                    if (link[sheet] && link[sheet][cssRules].length) { // css被成功加载
                        // console.log(link[sheet][cssRules]);
                        clearInterval(_timer1); // 清除定时器
                        clearTimeout(_timer2);
                        callback();
                    }
                } catch (e) {
                    // FF看到的可能的报错：
                    //本地：nsresult: "0x8053000f (NS_ERROR_DOM_INVALID_ACCESS_ERR)" ，因为没加载完成还不能读取，加载完毕就不会报错了
                    //跨域：Security error, code: "1000" nsresult: "0x805303e8"，因为不能跨域读取CSS。。。
                    //关于跨域访问：FF/OP/CM都禁止，IE6-9都可以跨域读取css。
                }
                finally {
                }
            }, 20),
        // 创建超时定时器，如果过10秒没检测到加载成功
            _timer2 = setTimeout(function () {
                clearInterval(_timer1); // 清除定时器
                clearTimeout(_timer2);
                callback(); // 都过了这么长时间了，虽然没判断加载成功也执行callback（这里可能本身就加载失败，也可能是跨域的情况）
            }, 1000);
    };

}).call(this);

(function () {
    var _extend = function (c, f, _f) {
        f = f || F;
        _f = _f || _F;
        for (var name in c) {
            (function (name) {
                f[name] = c[name];
                _f.prototype[name] = function () {
                    var args = [].slice.call(arguments);
                    args.unshift(this._value);
                    return c[name].apply(this, args);
                }
            })(name);
        }
    }
    var _F = function (method) {
        this._value = method;
    };
    var F = function (method) {
        return new _F(method);
    };
    _extend({
        proxy: function (method, scope) {
            return function () {
                var args = [].slice.call(arguments);
                return method.apply(scope, args);
            };
        },
        extend: function (methodCollection) {
            var _fun = function (o) {
                this._value = o;
            };
            var fun = function (o) {
                return new _fun(o);
            };
            _extend(methodCollection, fun, _fun);
            return fun;
        }
    });
    (this.util = this.util || {}).F = F;

}).call(this);

(function () {
    var reg, parse;
    var is = function (reg) {
        return function (o) {
            return reg.test(o);
        };
    };
    var S = util.F.extend({
        isInt: is(/^[\d]+$/), //数字
        isInt2: is(/^[1-9]+\d*$/), //数字,最高位不能为0
        isNum: is(/^[0-9]+(\.[0-9]+)?$/), //整数或者小数
        isEn: is(/^[A-Za-z]+$/), //由26个英文字母组成的字符串
        isCn: is(/^[\u4e00-\u9fa5]$/), //汉字
        isEmail: is(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/),
        isTel: is(/^(\d{3.4}-)?\d{7,8}$/),
        isDate: is(/^\d{4}(\-|\/|\.)\d{1,2}\1\d{1,2}$/), //匹配日期
        isNotEmpty: is(/.+/),
        //后续添加的
        isCardNo : is(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/),
        isPhone : is(/^(((1[3|8][0-9])|(14[5|7])|(15[^4,\D])|(17[6|7|8]))\d{8}|(170[0|5|9])\d{7})$/),
        is: function (o, reg) {
            return reg.test(o);
        }, //是否满足自定义的正则表达式
        byteLength: function () {
            return this.replace(/[^\x00-\xff]/g, "aa").length;
        }, //计算字符串的长度（一个双字节字符长度计2，ASCII字符计1）
        trim: function (o) {
            if (typeof String.prototype.trim === 'undefined') {
                return o.replace(/(^\s*|\s*$)/g, '');
            } else {
                return o.trim();
            }
        }, //删除首尾空格
        format: function (o, obj, reStart, reEnd, isEscape) {
            obj=util.wrap(obj);
            var re = new RegExp("\\" + (reStart || "{") + "([\\w\\.]+)\\" + (reEnd || "}"), "g");
            return o.replace(re, function (a, b) {
                var val=obj(b);
                return (typeof(val) == "undefined" || val == null) ? "" : !!isEscape ? S.parseHtml(val) : val;
            });
        }, //格式化
        contains: function (o, str) {
            return o.indexOf(str) > -1;
        },
        ltrim: function (o) {
            return o.replace(/(^\s*)/g, "");
        },
        rtrim: function (o) {
            return o.replace(/(\s*$)/g, "");
        },
        repeat: function (o, n) {
            return new Array(n + 1).join(o);
        },
        toInt: function (o, defaultNum) {
            var n = parseInt(o, 10);
            if (isNaN(n) && defaultNum)
                n = defaultNum;
            return n;
        },
        toDate: function (o) {
            if (S.isDate(o))
                return new Date(o.replace(/-/g, "/"));
            return null;
        },
        to2Digit: function (o) {
            return S.paddingLeft(o, 2, "0");
        },
        toObj: function (o) {
            var _data = {};
            var params = o ? o.split("&") : [];
            var pp;
            for (var p = 0, len = params.length; p < len; p++) {
                pp = params[p].split("=");
                if (pp.length > 1)
                    try {
                        _data[pp[0]] = decodeURIComponent(pp[1]);
                    } catch (e) {
                        _data[pp[0]] = "";
                    }
            }
            return _data;
        },
        subStr: function (o, len) {
            if (o.length > len)
                return o.substr(0, len) + '...';
            return o;
        },
        capitalizeFirstLetter: function (o) {
            return o.charAt(0).toUpperCase() + o.substr(1);
        },
        paddingLeft: function (o, n, str) {
            return S.right(S.repeat(str, n) + o, n);
        },
        paddingRight: function (o, n, str) {
            return S.left(o + S.repeat(str, n), n);
        },
        left: function (o, n) {
            return o.substr(0, n);
        },
        right: function (o, n) {
            return o.substr(o.length - n, n);
        },
        startWith: function (o, str) {
            return o.indexOf(str) == 0;
        },
        endWith: function (o, str) {
            var l;
            l = o.length - str.length;
            return l >= 0 && o.indexOf(str, l) === l;
        },
        parseHtml: function (o) {
            if (!reg) {
                parse = {
                    "<": "&lt;",
                    ">": "&gt;",
                    '\"': "&quot;",
                    "'": "&#x27;",
                    "\/": "&#x2F;",
                    "&": "&amp;"
                };
                reg = "";
                for (var key in parse) {
                    reg += S.trim(key);
                }
                reg = "[" + reg + "]";
                reg = new RegExp(reg, "g");
            }

            var parseobj = function (obj) {
                switch (Object.prototype.toString.call(obj)) {
                    case '[object Object]':
                        for (var k in obj)
                            obj[k] = parseobj(obj[k]);
                        return obj;
                        break;
                    case '[object Array]':
                        for (var i = 0, len = obj.length; i < len; i++)
                            obj[i] = parseobj(obj[i]);
                        return obj;
                        break;
                    case '[object String]':
                        return obj.replace(reg, function (k) {
                            return parse[k];
                        });
                        break;
                    default :
                        return obj;
                }
            }
            return parseobj(o);
        }
    });
    (this.util = this.util || {}).S = S;
}).call(this);

(function () {
    var D = util.F.extend({
        toDate: function (o) {
            if (typeof(o) == "string")
                return new Date(o.replace(/-/g, "/"));
            var date = new Date();
            if (Object.prototype.toString.call(o) == "[object Date]")
                date = o;
            return new Date(date.getFullYear(), date.getMonth(), date.getDate());
        },
        addDay: function (o, n) {
            var date = D.toDate(o);
            date.setDate(date.getDate() + n);
            return date;
        },
        format: function (o, formatString) {
            var date = D.toDate(o);
            /*
             * eg:formatString="YYYY-MM-DD hh:mm:ss";
             */
            var _o = {
                "M+": date.getMonth() + 1,    //month
                "D+": date.getDate(),    //day
                "h+": date.getHours(),    //hour
                "m+": date.getMinutes(),    //minute
                "s+": date.getSeconds(),    //second
                "q+": Math.floor((date.getMonth() + 3) / 3),    //quarter
                "S": date.getMilliseconds()    //millisecond
            };

            if (/(Y+)/.test(formatString)) {
                formatString = formatString.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            }

            for (var k in _o) {
                if (new RegExp("(" + k + ")").test(formatString)) {
                    formatString = formatString.replace(RegExp.$1, RegExp.$1.length == 1 ? _o[k] : ("00" + _o[k]).substr(("" + _o[k]).length));
                }
            }
            return formatString;
        }
    });
    (this.util = this.util || {}).D = D;
}).call(this);

(function(){
    function wrap(json) {
        function fun(key) {
            if (!key)
                return json;
            var ns = key.split("."),
                obj = json;
            for (var i = 0, l = ns.length; i < l && obj; i++)
                obj = obj[ns[i]];
            return obj || "";
        }
        for (var key in json)
            if (json.hasOwnProperty(key))
                fun[key] = json[key];
        return fun;
    }
    (this.util = this.util || {}).wrap = wrap;
})();

(function () {

    function iframeSubmit(config) {
        var iframe, form;

        function createIframe() {
            iframe = document.createElement('iframe');
            iframe.name = "iframeSubmit_" + (new Date()).getTime();
            $(iframe).css({
                width: '0',
                height: '0',
                position: 'absolute',
                top: '-3000px'
            });
            document.body.appendChild(iframe);
            $(iframe).load(function () {
                var text = iframe.contentWindow.document.body.innerText;
                if (text) {
                    text = JSON.parse(text);
                    $(iframe).remove();
                    config.el.append($(form).find("input:file"));
                    $(form).remove();
                    config.success(text);
                }
            });
        }

        function createForm() {
            form = document.createElement('form');
            form.target = iframe.name;
            form.enctype = "multipart/form-data";
            form.action = config.url;
            form.method = "post";
            $(form).append(config.el.find("input:file"));
//            $(form).append($(config.el.find("input:file")[0].outerHTML.replace(/(value=\").+\"/i,"$1\"")));
//            $(form).append($('<input name="file" style="Z-INDEX: 0" type="file" value="D:\百度云同步盘\个人\家庭支出\庆丰包子-01.jpg">'));
//            $(form).find("input:file")[0].value = config.el.find("input:file").val();
//            echo(config.el.find("input:file")[0].outerHTML.replace(/(value=\").+\"/i,"$1\""));
            $(form).css({
                width: '0',
                height: '0',
                position: 'absolute',
                top: '-3000px'
            });
            document.body.appendChild(form);
        }

        createIframe();
        createForm();
        form.submit();

    }

    function getEventTarget() {
        var _caller = arguments.callee.caller;
        var deep = 0;
        while (_caller != null && deep < 20) {
            deep++;
            var _argument = _caller.arguments[0];
            if (_argument && _argument.originalEvent) {
                return $(_argument.target);
            }
            _caller = _caller.caller;
        }
        return null;
    }

    var _ajax = {
        ajax: function (_config, binary) {
            _config = _config || {};
            var config = {};
            config.eventTarget = getEventTarget();
            var self = this;
            this._ajax_loading = this._ajax_loading || {};
            //修改前 config.url = window.projectName + ( _config.url || this.get_ajax_default_url()) + window.apiSuffix;
            config.url = top.projectName + ( _config.url || this.get_ajax_default_url()) + top.apiSuffix;
            if (this._ajax_loading[config.url])
                return;
            this._ajax_loading[config.url] = true;
            config.type = _config.type || this.get_ajax_default_type();
            config.dataType = _config.dataType || this.get_ajax_default_datatype();
            config.cache = false;


            config.success = function (data) {
                if (self.beforeRunAjaxSuccess(data)) {
                    if (_config.success) _config.success.call(self, data);
                    else
                        self.get_ajax_default_cb(data); //result==0
                } else {
                    if(data.result==2){
                        Qpage.Alert({msg: data.msg,confirm:function(){
                            //修改前top.location.href=window.projectName+"/login.htm";
                            top.location.href=top.projectName+"/login.htm";
                        }});
                    }else{
                    	config.error.call(self, data.msg); //result==1
                    }
                }
            };
            config.error = function (msg) { 
            	// 
            	//  ajax
            	//  <miaocard CreditAudit>
            	//  修改 result=2的时候让整个浏览器跳转到登录页
            	//  Created by future on 2015-07-30.
            	//  Copyright 2015 future. All rights reserved.
            	// 
            	
            	var result=1;
            	try{
            		result=$.parseJSON(msg.responseText).result;
            	}catch(e){}
            	
            	if(result==2){
            		top.location.href = top.projectName + "/login.html";
            	}else{
	                var fun = _config.error || self.get_ajax_default_cb_err;
	                msg && fun.call(self, typeof(msg) == "string" ? msg : msg.responseText);
               }
            };
            config.complete = function (r) {
                delete self._ajax_loading[config.url];
                if (_config.complete){
                	_config.complete(r);
                }else {
                    if (r.statusText && r.statusText != "OK") {
                        var data = null;
                        try {
                            eval("data=" + r.responseText);
                            config.success.call(self, data);
                        } catch (e) {
                        	
                            config.error.call(self, data);
                        }
                    }
                }
            };
            if (binary) {
                config.el = _config.el;
                if (!window.FormData) {
                    this.beforeAjax(config);
                    iframeSubmit(config);
                    this.afterAjax(config);
                    return;
                } else {
                    config.contentType = false;
                    config.processData = false;
                    var form = new FormData();
                    form.append(config.el.find("input:file").attr("name"), config.el.find("input:file")[0].files[0]);
                    config.data = form;
                }
            } else {
                config.data = _config.data || this.get_ajax_default_data();
            }
            this.beforeAjax(config);
            $.ajax(config);
            this.afterAjax(config);
        },
        beforeAjax: function (config) {
            if (config.eventTarget && (el = config.eventTarget.closest("[loading]")[0])) {
                $('<span class="sloading "></span>').insertAfter(el);
                $(el).addClass("hide");
            }
        },
        afterAjax: function (config) {
            if (config.eventTarget && (el = config.eventTarget.closest("[loading]")[0])) {
                $(el).next(".sloading").remove();
                $(el).removeClass("hide");
            }
        },
        beforeRunAjaxSuccess: function (data) {
            if (data.result == 0) return true;
            else {
                return false;
            }
        },
        get_ajax_default_cb: function (data) {
            //Qhistory.goback();
        },
        get_ajax_default_cb_err: function (msg) {
            this.show_ajax_errmsg(msg); //result==1
        },
        get_ajax_default_data: function () {
            return this.p_getData && this.p_getData();
        },
        get_ajax_default_url: function () {
            if (this.el && this.el.form)return this.el.form.attr("action");
            return "";
        },
        get_ajax_default_type: function () {
            if (this.el && this.el.form)return this.el.form.attr("method");
            return "post";
        },
        get_ajax_default_datatype: function () {
            return "json";
        },
        show_ajax_errmsg: function (msg) {//result==1
            if (msg)
                Qpage.Alert({msg: msg});
        }

    };
    _ajax.statics = _ajax;
    Class.define("util.ajax", _ajax);
}).call(this);

(function () {
    var file = {
        check: function (el, name, ext, error) {
            var val = $.trim(el.val());
            if (val == "") {
                error("请选择 " + name);
                return false;
            }
            var _ext = val.split(".");
            _ext = _ext[_ext.length - 1];
            if ($.inArray(_ext.toLocaleLowerCase(), ext) == -1) {
                error("请选择 " + ext.join("、") + " 格式的文件 ");
                return false;
            }
            error("");
            return true;
        }
    };
    (this.util = this.util || {}).file = file;
})();

/**
 * 以 v_ 开头的方法为 view 的方法，主要跟dom相关
 * 以 p_ 开头的方法为 present 的方法，主要跟逻辑相关
 * 以 m_ 开头的方法为 model 的方法，主要跟数据相关
 */
var echo = function (msg) {
    console && console.info(msg)
};
(function () {
    Class.define("Qpage.base", {
        statics: {
            main: function (param) {
                var _self = this;
                $(function () {
                    var instance = _self.getInstance(param);
                    instance.init();
                });
            },
            getInstance: function (param) {
                param = param || {};
                var _self = this;
                var root, _class;
                if (param.$root) {
                    root = param.$root;
                    delete param.$root;
                }
                param.extend = _self;
                var _class = new Class(param);
                return (new _class(root));
            }
        },
        mixins: [util.ajax],
        initialize: function (root) {
            this.v_setRootNode(root);
            this.initQplugin();
            this.v_setEl();
            this.p_setTitle();
            this.v_bindEvent();
            this.initDatePicker();

        },
        initQplugin: function () {
            if ($.fn.pca_select)$('[qplugin="pca_select"]', this.el.$root).pca_select();
            if ($.fn.citySuggest)$('[qplugin="citySuggest"]', this.el.$root).citySuggest();
            if ($.fn.busynessCategory)$('[qplugin="busynessCategory"]', this.el.$root).busynessCategory();
            if ($.fn.uploadImg)$('[qplugin="uploadImg"]', this.el.$root).uploadImg();

        },
        initDatePicker: function (el) {
            this.find(".datepicker").each(function (i, el) {
                var dateFormat=$(this).attr("data-date-format")||"yy-mm-dd";
                dateFormat=$.trim(dateFormat)==""?"yy-mm-dd":dateFormat
                $(el).datepicker({
                    dateFormat: dateFormat
                    //,numberOfMonths: 2
                });
            });

        },
        init: function (data) {
            data = data || (window.getStatus && window.getStatus()) || window.formData || util.url.getQuery();
            this.p_setData(data);
        },
        //要绑定代理的方法
        v_eventBindType: function () {
            return "click focusin focusout mouseout change keyup keydown";
        },
        //绑定代理
        v_bindEvent: function () {
            var self = this;
            $(self.el.$root).delegate(self._v_selectot(), self.v_eventBindType(), function (e) {
                var el = $(this);
                $.each(self._v_getSelectorKey(el), function (i, _key) {
                    var key = "p_" + _key + "_" + e.type;
                    if (self[key]) {
                        self.p_defaultEvent(e);
                        self[key].call(self, e, el);
                    }
                });
                var key = "p_input_" + e.type;
                if (self[key]) {
                    $.each(self.v_valSelector().split(","), function (i, selector) {
                        if (el.is(selector)) {
                            self.p_defaultEvent(e);
                            self[key].call(self, e, el);
                        }
                    })
                }
            });
        },
        //要绑自动获取元素定方法和绑定方法的选择器
        v_selector: function () {
            return "[id],[name],[data-name]";
        },
        _v_selectot: function () {
            return $.map(this.v_selector().split(","), function (s) {
                return s.split("|")[0];
            }).join(",");
        },
        v_getRootNode: function () {
            return null;
        },
        //设置此模块的跟dom
        v_setRootNode: function (doc) {
            var self = this;
            this.el = {$root: $(doc || self.v_getRootNode() || document)};
        },
        //把从v_selector获取到的元素绑定到this.el 上
        v_setEl: function () {
            var self = this;
            $(this._v_selectot(), this.el.$root).each(function () {
                var el = $(this);
                $.each(self._v_getSelectorKey(el), function (i, key) {
                    self.v_addEl(key, el);
                });

            });
            this.el.form = this.el.form || (function () {
                var form = self.el.$root.find("form");
                return form[0] ? form : null;
            })();
            this.el.pageTitle = this.el.pageTitle || $(".yy_content .f_title h2", this.el.$root);
        },
        v_addEl: function (key, el) {
            if (this.el[key])
                this.el[key] = this.el[key].add($(el));
            else
                this.el[key] = $(el);
        },
        //给view绑定数据，v_valSelector 中的元素用val方法赋值，其余的用html方法赋值
        v_setData: function (data) {
            if (data == null)
                return;
            var self = this,
                valSelectors = self.v_valSelector().split(","),
                funtype = "html";
            $.each(data, function (k, val) {
                //var el = self.find('[name="' + k + '"]');
                // var el=self.find('[name="'+k+'"]') || self.find('[id="'+k+'"]');
                var el = self.el[k] || self.find('[name="'+k+'"]');
                if (el && (val != "" || val != undefined)) {
                    try {
                        funtype = "html";
                        if (self.v_isRadioCheckbox(el) && !jQuery.isArray(val))
                            val = $.makeArray(typeof(val) == "string" ? val.split(",") : val);
                        for (var i = 0, len = valSelectors.length; i < len; i++) {
                            if (el.is(valSelectors[i])) {
                                funtype = "val";
                                break;
                            }
                        }
                        el[funtype](val);
                        if (self.v_isRadioCheckbox(el))
                            el = self.el.$root.find("[name='" + k + "']:checked");
                        el.change();
                    }
                    catch (e) {
                    }
                }
            });
        },
        //v_setData中用于val方法赋值的 选择器
        v_valSelector: function () {
            return "input,select,textarea";
        },
        //是否为 radio 或 checkbox
        v_isRadioCheckbox: function (el) {
            return /^(?:radio|checkbox)$/i.test($(el).attr("type"));
        },
        v_setDisable: function (el) {
            el.attr("disabled", "disabled");
        },
        //获取form或 以val取值的元素 中的数据
        v_getData: function (el) {
            var self = this;
            var form = !!el ? (typeof(el) == "string" ? this.el[el] : el ) : (this.el.form || $(this.v_valSelector(), this.el.$root));
            //form = form || this.el.form || $(this.v_valSelector(), this.el.$root);
            var arr_data = $(form).serializeArray(),
                ret = {};
            $.each(arr_data, function (i, v) {
                var el = self.el[v.name];
                if(el && el[0] && el.is(".md5") && v.value)v.value=window.md5(v.value);
                if (ret[v.name]) {
                    ret[v.name] = $.makeArray(ret[v.name]);
                    ret[v.name].push(v.value);
                } else {
                    ret[v.name] = v.value;
                }
            });

            return (!!el && typeof(el) == "string") ? ret[el] : ret;
        },
        //私有方法
        _v_getSelectorKey: function (el, selectors) {
            selectors = selectors || this.v_selector().split(",");
            var _match, key = [], _kv, _alias, _selector;
            for (var i = 0, len = selectors.length; i < len; i++) {
                _kv = selectors[i].split("|");
                _selector = _kv[0];
                _alias = _kv[1];
                if (el.is(_selector)) {
                    _match = _selector.match(/\[(\w+)\]/);
                    if (_match && $.inArray(_match[1], ["id", "name", "data-name"]) > -1) {
                        key.push(el.attr(_match[1]));
                    }
                    else if (_alias) {
                        key.push(_alias);
                    }
                    else {
                        key.push(_selector
                            .replace(/\./g, "class_")
                            .replace(/#/g, "id_")
                            .replace(/\[(\w+)\]/g, "attr_$1")
                            .replace(/[\W]+/g, "_"));
                    }
                    //return key;
                }
            }
            return key;
        },
        v_setTitle: function () {
            //top.Qhistory.setNav( document.title,location.href);
            //return;
            //console.info("sssss");
            //var pageTitle=$(top.document.getElementById("pageTitle"));
            // console.info(pageTitle);
            var pageTitle = this.el.pageTitle;
            if (pageTitle[0]) {
                // top.Qhistory.setNav();
                pageTitle.show();
                var list = Qhistory.getList();
                var html = [];
                $.each(list, function (i, val) {
                    var str = '<li><a title="{title}" href="{url}" qhistory="goback">{title}</a> <span class="divider"> &gt; </span></li>';
                    html.push(util.S(str).format(val));
                });
                //html.push(document.title); 原来的
                html.push('<li>'+document.title+'</li>');
                pageTitle.html(html.join(""));
                top.document.title = document.title;
            }
        },
        p_setTitle: function () {
            //if(this.el.pageTitle[0])this.el.pageTitle.find(".text-nomal").html(title);
            // document.document.title=title;
            this.v_setTitle();
        },
        v_setData_suggestion_city: function (el_input_text, el_input_value) {
            var self = this;
            var cityName2CodeMap = {};
            el_input_text.qsuggest({
                ajax: {
                    url: '/CitySuggest?search=*&callback=?',
                    dataType: 'jsonp',
                    cache: false
                },
                reader: function (data) {
                    var result = [];
                    var cities = data.Cities;
                    for (var i = 0; i < cities.length; i++) {
                        result.push(cities[i].cityName);
                        cityName2CodeMap[cities[i].cityName] = cities[i].cityCode;
                    }
                    if (result.length === 0) result.push('无匹配');
                    return result;
                }
            });
            if (el_input_value) {
                el_input_text.bind("q-suggest-hide", function () {
                    el_input_value.val(cityName2CodeMap[$(this).val()] || "");
                })
            }
        },
        // 逻辑代码
        p_getData: function () {
            var data=this.v_getData();
            if(data.idType){
                data[data.idType]=data.idValue;
                //delete data.idValue;
                //delete data.idType;
            }
            return data;
        },
        p_getValidateRule: function () {
            return null;
        },
        p_showErrorMsg: function (msg, el) {
        },
        p_validate: function (el) {
            var err = 0, elErr = 0;
            var validateRule = this.p_getValidateRule();
            if (validateRule) {
                var data = this.p_getData();
                var self = this;
                $.each(validateRule, function (k, v) {
                    if (!el || el.attr("name") == k) {
                        elErr = 0;
                        $.each(v, function (i, vr) {
                            if (elErr == 0) {
                                if (vr.reg && !vr.reg.test(data[k])) {
                                    err++;
                                    elErr++;
                                }
                                if (vr.cb_reg && !vr.cb_reg(data[k], self.el[k], data)) {
                                    err++;
                                    elErr++;
                                }
                                if (elErr > 0) {
                                    self.p_showErrorMsg(vr.msg, self.el[k]);
                                } else {
                                    self.p_showErrorMsg("", self.el[k]);
                                }
                            }
                        });
                    }
                });
            }
            return err == 0;
        },
        p_setData: function (data) {
            this.v_setData(data);
        },
        p_defaultEvent: function (e) {
            e.stopPropagation();
            if ($(e.target).is("a")) {
                if (e.meta || e.ctrlKey) return;
                e.preventDefault();
            }
        },
        find: function (selector, root) {
            return $(selector, root || this.el.$root);
        },
        getModuleName: function (name) {
            return "Qpage.base"
        },
        is: function (selector) {
            return this.getModuleName() == selector;
        }
    });
}).call(this);

Class.define("Qpage.edit", {
    extend: Qpage.base,
    p_input_change: function (e, el) {
        e.preventDefault();
        e.preventDefault();
        this.p_validate(el);
    },
    p_input_focusout: function (e, el) {
        this.p_input_change(e, el);
    },
    p_showErrorMsg: function (msg, el) {
        var div = el.closest('div').parent("div");
        if (!div[0])return;
        var tips = div.find(".text-warning");
        var help = div.find(".help");
        if (!tips[0]) {
            tips = $('<span class="text-warning margin5"></span>').appendTo(div);
        }
        tips.hide().addClass("hide");
        help.show().removeClass("hide");
        if (msg) {
            tips.html(msg).show().removeClass("hide");
            help.hide().addClass("hide");
        }
    },
    p_save_click: function (e) {
        e.preventDefault();
        e.preventDefault();
        if (this.p_validate()) {
            this.ajax({success: this.p_cb_submit});
        }
    },
    p_cancel_click: function (e) {
        e.preventDefault();
        e.preventDefault();
        Qhistory.goback();
    },
    p_cb_submit: function () {
        Qpage.Alert({msg: "保存成功"});
        // Qpage.Alert({msg : "保存成功"});
    }
});

(function () {
    Class.define("Qpage.list", {
        extend: Qpage.base,
        mixins: [Qpage.grid, Qpage.pager],
        init: function (data) {
            this.p_setQhistory();
            this.model = {};
            this.parent(data);
            this.baseParam = $.extend({}, this.m_getBaseParamPager(), this.m_getBaseParam());
            if (this.model.__FROMCACHE__) {
                delete this.model.__FROMCACHE__;
                this.m_getDataFromServer();
            } else {
                this.p_search_click();
            }
        },
        m_getBaseParam: function () {
            return {};
        },
        //设置safeback
        p_setQhistory: function () {
            var self = this;
            window.saveStatus = function () {
                return {title: document.title, data: self.model};
            };
        },
        p_search_click: function (e) {
            e && e.preventDefault();
            if (this.p_validate()) {
                this.model = $.extend({}, this.baseParam, this.p_getData());
                this.m_getDataFromServer();
            }
        },
        v_selector: function () {
            return this.parent() + ",form input:text|input_search";
        },
        p_input_search_keydown: function (e, el) {

        },
        p_export_click: function (e, el) {
            e && e.preventDefault();
            var self = this;
            if (this.p_validate()) {
                var data = this.v_getData();
                var href = el.attr("href");
                if (href.indexOf("?") == -1)href = href + "?";
                window.open(util.S("{0}{1}").format([href, $.param(data)]));
            }
        },
        p_showErrorMsg: function (msg) {
            if (!msg) {
                this.el.errmsgPanel.hide();
            }
            else {
                this.el.errmsgPanel.show().html("<p>" + msg + "</p>");
            }
        },
        p_setData: function (data) {
            if (data) {
                this.model = $.extend({}, data);
                this.parent(this.model);
            }
        },
        m_getDataFromServer: function () {
            var self = this;
            if (this.p_validate()) {
                this.clearGrid(true);
                this.ajax({error: function (msg) {
                    if (msg)Qpage.Alert({msg: msg});
                    this.clearGrid(false);
                }});
            }
        },
        get_ajax_default_cb: function (data) {
            this.renderGrid(data);
            this.renderPager(data);
        },
        get_ajax_default_data: function () {
            return this.model;
        },
        m_getDataSetforGrid: function (data) {
            return data.data.list;
        },
        renderGrid: function (data) {
            var dataSet = this.m_getDataSetforGrid(data);
            this.parent(dataSet);
        },
        changePage: function (recordstart, recordend, curPage) {
            this.model.start = recordstart;
            this.model.end = recordend;
            this.model.curPage = curPage;
            this.model.pn = curPage;
            this.m_getDataFromServer();
            return true;
        },
        getTotalCount: function (data) {
            return data.data.count;
        },
        renderPager: function (data) {
            this.parent(this.getTotalCount(data), this.model.curPage);
        }

    });
}).call(this);


(function () {
    (function ($) {
        var _initargs = {
            top: 0.282,
            left: 0.5,
            fixable: true,
            modeless: false
        }
        var ie6 = (function () {
            var isIE = !!window.ActiveXObject;
            return isIE && !window.XMLHttpRequest;
        }());
        var contentCss = {
            'display': 'none',
            'position': 'fixed',
            'zIndex': 10000,
            'top': '0px',
            'left': '50%'
        };

        var overlayCss = {
            'display': 'none',
            'position': 'fixed',
            'zIndex': 10000,
            'top': '0px',
            'left': '0px',
            'opacity': 0.2,
            'backgroundColor': '#000',
            "height": "100%",
            "width": "100%",
            "margin": "0px",
            "padding": "0px"
        };

        var ind = 0;
        var ZINDEXBASE = 10000;
        var cache = {};

        function getPositionType(tl) {
            if (tl.top < 0 || ie6) {
                return "absolute"
            } else {
                return "fixed";
            }
        }

        function getDE() {
            return (document.compatMode && document.compatMode.toLowerCase() == "css1compat") ? document.documentElement : document.body;
        }

        function getWH(overlay) {
            var de = getDE();
            return { width: Math.max(de.clientWidth, de.scrollWidth), height: Math.max(de.clientHeight, de.scrollHeight)};
        }

        function getTL(content, _top, left) {
            var de = (document.compatMode && document.compatMode.toLowerCase() == "css1compat") ? window.top === window.self ? document.documentElement : top.document.documentElement : window.top === window.self ? document.body : top.document.body;
            //var top = ( de.clientHeight - content.outerHeight()) * top + $(de).scrollTop();
            var top2;
            if (window.top === window.self) {
                top2 = (de.clientHeight - content.outerHeight()) * _top + Math.max(document.documentElement.scrollTop, document.body.scrollTop);
            } else {
                top2 = (de.clientHeight - content.outerHeight()) * _top + Math.max(top.document.documentElement.scrollTop, top.document.body.scrollTop);
            }
            if (!ie6)top2 = (de.clientHeight - content.outerHeight()) * _top;
            var content_outer_height = content.outerHeight();
            //page 可以区域高度
            var max_doc_height = Math.max(document.documentElement.clientHeight, document.body.clientHeight);
            var current_content_height = top2 + content_outer_height;

            if (current_content_height > max_doc_height) {
                top2 = (max_doc_height - content_outer_height) * _top;
            }

            var left = Math.floor(content.outerWidth() * left);
            return {
                marginLeft: -left,
                top: top2
            };
        }

        function parseInner(html, xbox) {
            return html;
        }

        function makeKey(ind) {
            return 'xbox' + ind;
        }

        function getQBox(evt) {
            if (typeof evt == 'string')
                return cache[evt];
            else if (evt && evt.isqbox) {
                return evt;
            } else {
                evt = jQuery.event.fix(evt || window.event);
                var p = $(evt.target).parents('.modal-new');
                if (p.size() > 0) {
                    return cache[ makeKey(p.data('ind')) ];
                }
            }
        }

        function setCss(el, _top, _left) {
            var tl = getTL(el, _top, _left);

            el.css("position", getPositionType(tl));
            if (tl.top < 0) {
                tl.top = Math.max(top.document.documentElement.scrollTop, top.document.body.scrollTop) + 10;
                // el.css("position", "absolute");
            }
            tl.marginTop = 0;
            el.css(tl);
        }

        var Xbox = function (html, args, ind) {

            this.key = makeKey(ind);
            this.args = args;
            this.alive = true;
            this.binded = false;
            this.overlay = $('<div />').addClass('qbox_overlay').css($.extend({}, overlayCss, {'zIndex': ZINDEXBASE + ind})).appendTo($(document.body));
            // var ctx = this.content = $('<div />').addClass('modal').css($.extend({}, contentCss, {'zIndex': ZINDEXBASE + ind})).appendTo($(document.body));
            var ctx = this.content = $(html).css($.extend({}, contentCss, {'zIndex': ZINDEXBASE + ind})).appendTo($(document.body));

            if (ie6) {
                ctx.css("position", "absolute");
                this.overlay.css("position", "absolute");
            }

            ctx.data('ind', ind);

            cache[this.key] = this;
        };
        Xbox.prototype = {
            isqbox: 1
        };
        $.each(['close', 'show', 'hide', 'trigger', 'bind', 'unbind', 'data'], function (idx, type) {
            Xbox.prototype[type] = function () {
                return $.xbox[type].apply(window, [this].concat(Array.prototype.slice.call(arguments || [])));
            };
        });
        $.xbox = function (html, arg) {
            var _ind = ++ind;
            arg = $.extend(_initargs, arg || {});
            return new Xbox(html || "", arg, _ind);
        };
        $.xbox.bind = function (evt, type, func) {
            var qb = getQBox(evt);
            if (!qb || !qb.alive)return;
            $(qb.content).bind(type + '.xbox.' + qb.key, func);
        };
        $.xbox.unbind = function (evt, type, func) {
            var qb = getQBox(evt);
            if (!qb || !qb.alive)return;
            if (func)
                $(qb.content).unbind((type || '') + '.xbox.' + qb.key, func);
            else
                $(qb.content).unbind((type || '') + '.xbox.' + qb.key);
        };
        $.xbox.trigger = function (evt, type, data) {
            var qb = getQBox(evt);
            if (!qb || !qb.alive)return;
            $(qb.content).triggerHandler(type + '.xbox.' + qb.key, data);
        };
        $.xbox.data = function (evt, key, value) {
            var qb = getQBox(evt);
            if (!qb || !qb.alive)return;
            return qb.content.data(key, value);
        };
        $.xbox.show = function (evt) {
            var qb = getQBox(evt);
            if (!qb || !qb.alive)return;

            if (!qb.args.modeless)
                qb.overlay.show();
            qb.content.show();
            if (!qb.binded) {
                qb.binded = true;
                $(window).bind('resize.xbox', function (evt) {
                    if (qb.args.fixable) {
                        setCss(qb.content, qb.args.top, qb.args.left);
                        //qb.content.css(getTL(qb.content, qb.args.top, qb.args.left));
                    }
                    qb.overlay.css(getWH(true));
                    $(qb.content).trigger('changePosition', qb.content);
                });
                $(window).bind('scroll.xbox', function (evt) {
                    if (qb.args.fixable) {
                        if (ie6)
                            setCss(qb.content, qb.args.top, qb.args.left);
                        //qb.content.css(getTL(qb.content, qb.args.top, qb.args.left));
                    }
                    $(qb.content).trigger('changePosition', qb.content);
                });

            }

            if (qb.args.fixable) {
                setCss(qb.content, qb.args.top, qb.args.left);
                //qb.content.css(getTL(qb.content, qb.args.top, qb.args.left));
            }

            var _oldfixable = qb.args.fixable;
            qb.args.fixable = true;
            $(window).triggerHandler('resize.xbox');
            qb.args.fixable = _oldfixable;


            $(qb.content).trigger('changePosition', qb.content);
            $(qb.content).trigger('show', qb.content);
        };
        $.xbox.hide = function (evt) {
            var qb = getQBox(evt);
            if (!qb || !qb.alive)return;
            $(window).unbind('scroll.xbox');
            $(window).unbind('resize.xbox');
            qb.binded = false;
            qb.overlay.hide();
            qb.content.hide();
            $(qb.content).triggerHandler('hide.xbox.' + qb.key);
        };

        $.xbox.close = function (evt) {
            var qb = getQBox(evt);
            if (!qb || !qb.alive)return;
            $.xbox.hide(qb);
            qb.alive = qb.binded = false;
            qb.overlay.remove();
            qb.content.remove();
            delete cache[qb.key];
            $(qb.content).triggerHandler('close.xbox.' + qb.key);
        };
    })(jQuery);
    (function ($) {

        $.fn.bgiframe = ( /msie 6\.0/i.test(navigator.userAgent) ? function (s) {
            s = $.extend({
                top: 'auto', // auto == .currentStyle.borderTopWidth
                left: 'auto', // auto == .currentStyle.borderLeftWidth
                width: 'auto', // auto == offsetWidth
                height: 'auto', // auto == offsetHeight
                opacity: true,
                src: 'javascript:false;'
            }, s);
            var html = '<iframe class="bgiframe"frameborder="0"tabindex="-1"src="' + s.src + '"' +
                'style="display:block;position:absolute;z-index:-1;' +
                (s.opacity !== false ? 'filter:Alpha(Opacity=\'0\');' : '') +
                'top:' + (s.top == 'auto' ? 'expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+\'px\')' : prop(s.top)) + ';' +
                'left:' + (s.left == 'auto' ? 'expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+\'px\')' : prop(s.left)) + ';' +
                'width:' + (s.width == 'auto' ? 'expression(this.parentNode.offsetWidth+\'px\')' : prop(s.width)) + ';' +
                'height:' + (s.height == 'auto' ? 'expression(this.parentNode.offsetHeight+\'px\')' : prop(s.height)) + ';' +
                '"/>';
            return this.each(function () {
                if ($(this).children('iframe.bgiframe').length === 0)
                    this.insertBefore(document.createElement(html), this.firstChild);
            });
        } : function () {
            return this;
        });

        // old alias
        $.fn.bgIframe = $.fn.bgiframe;

        function prop(n) {
            return n && n.constructor === Number ? n + 'px' : n;
        }

    })(jQuery);
    Qpage.Dialog = top.Qpage.Dialog || new Class({
        extend: Qpage.edit,
        initialize: function () {
            this.dialog = $.xbox(this.v_wrapHtml());
            this.parent(this.dialog.content);
            this.el.$root.bgiframe();
        },
        init: function (data) {
            this.show();
            this.parent(data);
        },
        closeOrHide: function () {
            return "close";
        },
        _defaultEvent: function (e) {
            this[this.closeOrHide()]();
            $(this).trigger("closeDialog");
        },
        show: function () {
            this.el.$root.show();
            this.dialog.show();
            $(this).trigger("showDialog");
        },
        close: function () {
            this.dialog.close();
        },
        hide: function () {
            this.dialog.hide();
        },
        v_wrapHtml: function (html) {
            return ['<div class="modal-new " >',
                '<div class="modal-header-new">',
                '<button type="button" class="close close-new" id="close" aria-hidden="true">&times;</button>',
                '<h3 id="title" class="h3-new">', this.v_getTitle(), '</h3>',
                '</div>',
                '<div class="modal-body-new" id="content">',
                this.v_getContent(),
                '</div>',
                '<div class="errorPanel  text-alert" id="errorPanel">',
                '</div>',
                '<div class="modal-footer-new" id="buttonPanel">',
                this.v_getButton(),
                '</div>',
                '</div>'
            ].join("");
        },
        v_getTitle: function () {
            return "";
        },
        v_getContent: function () {
            return "";
        },
        p_close_click: function (e) {
            this._defaultEvent(e);
        },
        p_setError: function (msg, el) {
            if (msg) {
                this.el.errorPanel.html(msg).show();
            } else this.el.errorPanel.html("").hide();
        },
        p_showErrorMsg: function (msg, el) {
            this.p_setError(msg, el);
        },
        v_getButton: function () {

        },
        resize: function () {
            $(window).trigger('resize.xbox');
        }
    });
    var commDialog = new Class({
        extend: Qpage.Dialog,
        p_defaultEvent: function (e) {
            this.parent(e);
            this._defaultEvent(e);
        },
        v_getContent: function () {
            return  ['<div id="msg" ></div>'].join("");
        },
        p_btn_confirm_click: function (e) {
            $(this).trigger("confirm");
        },
        p_btn_cancel_click: function (e) {
            $(this).trigger("cancel");
        },
        v_getButton: function () {
            return '<button class="btn btn-primary" id="btn_confirm">确定</button> <button class="btn" id="btn_cancel">取消</button> ';
        }
    });

    Qpage.Alert = top.Qpage.Alert || function (config) {
        config.title = config.title || "提示";
        var cd = new commDialog();
        cd.el.btn_cancel.remove();
        $(cd).bind({confirm: config.confirm});
        cd.init(config);
        return cd;
    };

    Qpage.Confirm = top.Qpage.Confirm || function (config) {
        config.title = config.title || "提示";
        var cd = new commDialog();
        $(cd).bind({confirm: config.confirm, cancel: config.cancel});
        cd.init(config);
        return cd;
    };

    Qpage.Loading = top.Qpage.Loading || new (new Class({
        extend: Qpage.Dialog,
        init: function () {
            var that = this;
            setTimeout(function () {
                that.hide();
            }, 1000);  //之前是2000
            this.parent();
        },
        v_wrapHtml: function () {
            return  '<div class="loading"></div>';
        }
    }))();
}).call(this);



