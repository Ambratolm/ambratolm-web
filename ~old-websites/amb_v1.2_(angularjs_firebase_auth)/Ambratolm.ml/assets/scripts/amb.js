// ==================================================
// ♦ AmbratolmJS Lite Utilities Library
// ==================================================

    // --------------------------------------------------
    // ♦ Variable Definition Checker
    // --------------------------------------------------
    function isDefined(obj) { return typeof obj !== "undefined"; }
    function isUndefined(obj) { return typeof obj === "undefined"; }
    function isNull(obj) { return (isUndefined(obj) || obj === null); }
    function isNotNull(obj) { return (isDefined(obj) && obj !== null); }

    // --------------------------------------------------
    // ♦ Batch Functions Runner
    // --------------------------------------------------
    function BatchFunctions() {
    	this._functions = [];
    	this.add = function(fn) {
    		this._functions.push(fn);
    	};
        this.execute = function() {
        	this._functions.forEach(function(fn) {
        		fn();
        	});
        };
    }

    // --------------------------------------------------
    // ♦ Array Extensions
    // --------------------------------------------------
    Array.prototype.item = function(key, value, searchParams) {
        var comparator = (isDefined(searchParams) && searchParams.strict) ? "===" : "==";
        var letterCase = (isDefined(searchParams) && searchParams.caseInsensitive) ? ".toLowerCase()" : "";
        return this.find(function(item) { return eval("value" + letterCase + comparator 
            + "(isDefined(item[key]) ? item[key]" + letterCase + " : item[key])"); });
    };

    // --------------------------------------------------
    // ♦ Array Navigation Manager
    // --------------------------------------------------
    function Navigation(array) {
        this._array = array;
        this._currentIndex = 0;
        this._currentItem = this._array[this._currentIndex];
        this.items = function() { return this._array; };
        this.currentIndex = function(index) {
            if (isUndefined(index)) return this._currentIndex;
            if (index < 0) index = this._array.length - 1;
            if (index >= this._array.length) index = 0;
            this._currentIndex = index;
            this._currentItem = this._array[index];
            return this._currentIndex;
        };
        this.currentItem = function(item) {
            if (isUndefined(item)) return this._currentItem;
            var index = this._array.indexOf(item);
            if (index >= 0) {
                this._currentIndex = index;
                this._currentItem = this._array[index];
            }
            return this._currentItem;
        };
        this.next = function() {
            return this.currentIndex(this._currentIndex + 1);
        };
        this.prev = function() {
            return this.currentIndex(this._currentIndex - 1);
        };
    }

    // --------------------------------------------------
    // ♦ Simple and Beautiful Console Log
    // --------------------------------------------------
    function log(txt) { console.log("%c" + txt, "color:blue; font-size: 180%; font-family:'century gothic'"); }
    function cls() { console.clear(); }