/*global plt*/
/*jslint browser: true, unparam: true, vars: true, white: true, maxerr: 50, indent: 4 , plusplus: true */

// Continuation marks
(function(baselib) {
    'use strict';
    var exports = {};
    baselib.contmarks = exports;


    var ContinuationMarkSet = function(kvlists) {
        this.kvlists = kvlists;
    };


    ContinuationMarkSet.prototype.shift = function() {
        this.kvlists.shift();
    };

    ContinuationMarkSet.prototype.toDomNode = function(params) {
        var dom = document.createElement("span");
        dom.appendChild(document.createTextNode('#<continuation-mark-set>'));
        return dom;
    };

    ContinuationMarkSet.prototype.toWrittenString = function(cache) {
        return '#<continuation-mark-set>';
    };

    ContinuationMarkSet.prototype.toDisplayedString = function(cache) {
        return '#<continuation-mark-set>';
    };

    ContinuationMarkSet.prototype.ref = function(key, promptTag) {
        // FIXME: ref needs to watch the promptTag as well and capture up to it.
        var i, j;
        var result = [];
        var kvlist;
        for (i = 0; i < this.kvlists.length; i++) {
            kvlist = this.kvlists[i];
            for (j = 0; j < kvlist.length; j++) {
                if (baselib.equality.equals(kvlist[j][0], key)) {
                    result.push(kvlist[j][1]);
                }
            }
        }
        return baselib.lists.arrayToList(result);
    };


    ContinuationMarkSet.prototype.refFirst = function(key, promptTag) {
        // FIXME: refFirst needs to watch the promptTag as well and capture up to it.
        var i, j;
        var result = [];
        var kvlist;
        for (i = 0; i < this.kvlists.length; i++) {
            kvlist = this.kvlists[i];
            for (j = 0; j < kvlist.length; j++) {
                if (baselib.equality.equals(kvlist[j][0], key)) {
                    return (kvlist[j][1]);
                }
            }
        }
        return undefined;
    };




    // Returns an approximate stack trace.
    // getContext: MACHINE -> (arrayof (U Procedure (Vector source line column position span)))
    ContinuationMarkSet.prototype.getContext = function(MACHINE) {
        var i, j;
        var result = [];
        var kvlist;

        var tracedAppKey = plt.runtime.getTracedAppKey(MACHINE);
        var tracedCalleeKey = plt.runtime.getTracedCalleeKey(MACHINE);
        var proc, locationVector;

        for (i = 0; i < this.kvlists.length; i++) {
            kvlist = this.kvlists[i];
            for (j = 0; j < kvlist.length; j++) {
                if (kvlist[j][0] === tracedAppKey) {
                    locationVector = kvlist[j][1];
                    result.push(locationVector);
                } else if (kvlist[j][0] === tracedCalleeKey) {
                    proc = kvlist[j][1];
                    if (proc !== null) {
                        result.push(proc);
                    }
                }
            }
        }
        return result;
    };


    var isContinuationMarkSet = baselib.makeClassPredicate(ContinuationMarkSet);





    // A continuation prompt tag labels a prompt frame.
    var ContinuationPromptTag = function(name) {
	this.name = name;         // (U String false)

    };

    ContinuationPromptTag.prototype.toDomNode = function(params) {
        var dom = document.createElement("span");
        if (this.name) {
            dom.appendChild(document.createTextNode('#<continuation-prompt-tag:' 
                                                    + this.name + '>'));
        } else {
            dom.appendChild(document.createTextNode('#<continuation-prompt-tag>'));
        }
        return dom;
    };

    ContinuationPromptTag.prototype.toWrittenString = function(cache) {
        if (this.name) {
            return '#<continuation-prompt-tag' + this.name + '>';
        } else {
            return '#<continuation-prompt-tag>';
        }
    };

    ContinuationPromptTag.prototype.toDisplayedString = function(cache) {
        if (this.name) {
            return '#<continuation-prompt-tag' + this.name + '>';
        } else {
            return '#<continuation-prompt-tag>';
        }
    };



    var isContinuationPromptTag = baselib.makeClassPredicate(ContinuationPromptTag);

    var DEFAULT_CONTINUATION_PROMPT_TAG =
        new ContinuationPromptTag("default");


    exports.ContinuationMarkSet = ContinuationMarkSet;
    exports.isContinuationMarkSet = isContinuationMarkSet;
    exports.ContinuationPromptTag = ContinuationPromptTag;

    exports.isContinuationPromptTag = isContinuationPromptTag;
    exports.DEFAULT_CONTINUATION_PROMPT_TAG = DEFAULT_CONTINUATION_PROMPT_TAG;
}(this.plt.baselib));
