F4A.nameSpace('controls', new function () {
    var Control = F4A.controls.Base;
    var Template = F4A.controls.Template;
    var isAncestor = ua.chrome ? function (a, b) {
            return a && b && a != b && !! (a.compareDocumentPosition(b) & 16);
        } : QZFL.dom.isAncestor;
    var updateLastSelectedRange = (ua.ie ? function (range) {
        this.lastSelectedRange = range || document.selection.createRange();
    } : function (range) {
        try {
            this.lastSelectedRange = range || getSelection().getRangeAt(0).cloneRange();
        } catch (ex) {
            this.focus();
        }
    });
    this.RichTextBox = Control.derive(new function () {
        this.constructor = function () {
            var rtb$ = this;
            this.checkContent = function () {
                updateLastSelectedRange.call(rtb$);
                var content_ = rtb$.$('content');
                if (content_) {
                    if (rtb$.originalContent != content_.innerHTML) {
                        rtb$.onContentChanged();
                    }
                }
            };
            if (Control.apply(this, arguments)) {}
        };
        this.extendPrototype = function () {
            this.className = 'RichTextBox';
            this.genProperties(this.properties = {
                highlightedRange: {
                    getter: function () {
                        if (this['@highlightedRange']) {
                            return this['@highlightedRange'];
                        }
                        if (this.lastSelectedRange) {
                            return this.lastSelectedRange;
                        }
                        if (this.hasSelectedRange()) {
                            try {
                                if (ua.ie) {
                                    if (document.selection.type == 'None') {
                                        var _root = this.getRootVisual();
                                        var _temp = document.createElement('span');
                                        var range = document.createRange();
                                        _root.appendChild(_temp);
                                        range.moveToElement(_temp);
                                        return range;
                                    } else {
                                        return document.selection.createRange();
                                    }
                                }
                                var range = getSelection().getRangeAt(0).cloneRange();
                                if (ua.chrome || ua.safari) {
                                    var ancestor = range.commonAncestorContainer;
                                    return ancestor == document.activeElement || isAncestor(document.activeElement, ancestor) ? range : null;
                                }
                                return range;
                            } catch (ex) {
                                return null;
                            }
                        }
                    }
                }
            });
            this.genMethods(this.methods = {
                onContentChanged: function () {
                    if (ua.ie == 8) {
                        var _root = this.getRootVisual();
                        if (_root && _root.lastChild) {
                            var _lastChild = _root.lastChild;
                            switch (_lastChild.nodeType) {
                                case 3:
                                    try {
                                        if (_lastChild.data.length) {
                                            return;
                                        } else {
                                            _lastChild.data = ' ';
                                        }
                                    } catch (ex) {}
                                    break;
                                case 1:
                                    switch (_lastChild.tagName) {
                                        case 'P':
                                            return;
                                        case 'BUTTON':
                                            break;
                                        default:
                                            if (_lastChild.innerText.length) {
                                                return;
                                            }
                                            if (_lastChild.canHaveHTML) {
                                                _lastChild.innerHTML = ' ';
                                                break;
                                            }
                                            break;
                                    }
                                default:
                                    _root.appendChild(document.createTextNode(' '));
                                    break;
                            }
                            var range = document.body.createTextRange();
                            range.moveToElementText(_root);
                            range.moveEnd('character', -1);
                            range.collapse(false);
                            range.select();
                            updateLastSelectedRange.call(this, range);
                        }
                    }
                    if (ua.chrome) {
                        var root_ = this.getRootVisual();
                        var firstChild_ = root_.firstChild;
                        if (firstChild_ && firstChild_ == root_.lastChild && firstChild_.tagName == 'BR') {
                            root_.removeChild(firstChild_);
                        }
                    }
                },
                onRootVisualChanged: function (_original, _root) {
                    var mapping = [
                        ['input', 'onInput'],
                        ['keydown', 'onKeyDown'],
                        ['keyup', 'onKeyUp'],
                        ['mousedown', 'onMouseDown'],
                        ['mouseup', 'onMouseUp'],
                        ['focus', 'onFocus'],
                        ['blur', 'onBlur'],
                        ['paste', 'onPaste']
                    ];
                    if (_original) {
                        for (var i = 0, j = mapping.length; i < j; i++) {
                            var item = mapping[i];
                            QZFL.event.addEvent(_original, item[0], this[['_root', item[1]].join('_')]);
                        }
                    }
                    if (_root) {
                        for (var i = 0, j = mapping.length; i < j; i++) {
                            var item = mapping[i];
                            var handlerName = ['_root', item[1]].join('_');
                            QZFL.event.addEvent(_root, item[0], this[handlerName] || (this[handlerName] = this.createHandler(this.ensureObservable(item[1]))));
                        }
                    }
                },
                getContent: function (returnType) {
                    var content_ = this.$('content');
                    if (!content_) {
                        return '';
                    }
                    switch (returnType) {
                        case 'node':
                            return content_;
                        case 'html':
                            return content_.innerHTML;
                        default:
                            return content_.textContent || content_.innerText || '';
                    }
                },
                setContent: function (value, valueType, onComplete) {
                    var original = this.getContent();
                    var content_ = this.$('content');
                    if (!content_) {
                        return '';
                    }
                    switch (valueType) {
                        case 'node':
                            content_.innerHTML = '';
                            content_.appendChild(value);
                            this.lastSelectedRange = this.createRange();
                            this.lastSelectedRange.collapse(false);
                            break;
                        case 'html':
                            content_.innerHTML = value;
                            break;
                        default:
                            content_.innerHTML = escHTML(value);
                            break;
                    }
                    if (content_.innerHTML == '' && ua.firefox) {
                        content_.innerHTML = '<br _moz_dirty="" />';
                    }
                    var content = this.getContent();
                    if (original != content) {
                        this.onContentChanged(original, content);
                    }
                    onComplete && onComplete.call(this);
                    return value;
                },
                resetContent: function () {
                    delete this.lastSelectedRange;
                    this.resetHighlightedRange();
                    this.setContent('');
                },
                hasContent: function () {
                    var content_ = this.$('content');
                    var contentHTML = content_.innerHTML;
                    if (ua.ie) {
                        return !!trim(contentHTML || '');
                    }
                    return !!contentHTML && !(content_.childNodes.length == 1 && content_.firstChild.tagName == 'BR');
                },
                appendToContent: function (value, valueType, onComplete) {
                    var original = this.getContent();
                    var content_ = this.$('content');
                    switch (valueType) {
                        case 'html':
                            value = F4A.utils.dom.parseHTML(value);
                        case 'node':
                            if (content_.childNodes.length == 1 && content_.firstChild.tagName == 'BR') {
                                content_.replaceChild(value, content_.firstChild);
                            } else {
                                content_.appendChild(value);
                            }
                            break;
                        default:
                            if (content_.childNodes.length == 1 && content_.firstChild.tagName == 'BR') {
                                content_.innerHTML = escHTML(value);
                            } else {
                                value = document.createTextNode(value);
                                content_.appendChild(value);
                            }
                            break;
                    }
                    if (ua.ie) {
                        var range = document.body.createTextRange();
                        range.moveToElementText(content_);
                        range.collapse(false);
                    } else {
                        var range = document.createRange();
                        range.selectNode(content_.lastChild || content_);
                        range.collapse(false);
                    }
                    updateLastSelectedRange.call(this, range);
                    this.onContentChanged(original, this.getContent());
                    onComplete && onComplete.call(this);
                },
                insertToContent: (ua.ie ? function (value, valueType, getRangeToFocus, onComplete) {
                    var original = this.getContent();
                    var range = this.getHighlightedRange();
                    var placeHolder_ = null;
                    if (range == null) {
                        var content_ = this.$('content');
                        placeHolder_ = document.createElement('span');
                        content_.appendChild(placeHolder_);
                        range = document.body.createTextRange();
                        range.moveToElementText(placeHolder_);
                    }
                    switch (valueType) {
                        case 'node':
                            if (placeHolder_ == null) {
                                var placeHolderId = ['$', new Date().valueOf()].join('');
                                range.select();
                                range.pasteHTML(['<span id="', placeHolderId, '"></span>'].join(''));
                                placeHolder_ = $(placeHolderId);
                            }
                            placeHolder_.parentNode.insertBefore(value, placeHolder_);
                            range.moveToElementText(placeHolder_);
                            placeHolder_.parentNode.removeChild(placeHolder_);
                            break;
                        case 'html':
                            try {
                                range.pasteHTML(value);
                            } catch (ex) {}
                            break;
                        default:
                            range.text = value;
                            break;
                    }
                    getRangeToFocus = getRangeToFocus || function () {
                        range.collapse(false);
                        return range;
                    };
                    range = getRangeToFocus();
                    this.focusToRange(range);
                    this.onContentChanged(original, this.getContent());
                    onComplete && onComplete.call(this);
                } : function (value, valueType, getRangeToFocus, onComplete) {
                    var original = this.getContent();
                    var range = this.getHighlightedRange();
                    var placeHolder_ = null;
                    if (range == null) {
                        var content_ = this.$('content');
                        if (content_.childNodes.length == 1 && content_.firstChild.tagName == 'BR') {
                            content_.removeChild(content_.firstChild);
                        }
                        var _rangeHolder = document.createTextNode('!');
                        content_.appendChild(_rangeHolder);
                        range = document.createRange();
                        range.selectNode(_rangeHolder);
                    }
                    switch (valueType) {
                        case 'node':
                            break;
                        case 'html':
                            value = F4A.utils.dom.parseHTML(value);
                            break;
                        default:
                            value = document.createTextNode(value);
                            break;
                    }
                    range.deleteContents();
                    if (ua.firefox) {
                        var node = value.lastChild || value;
                        range.insertNode(value);
                        range.selectNode(node);
                    } else {
                        range.insertNode(value);
                    }
                    getRangeToFocus = getRangeToFocus || function () {
                        range.collapse(false);
                        return range;
                    };
                    range = getRangeToFocus();
                    this.focusToRange(range);
                    this.onContentChanged(original, this.getContent());
                    onComplete && onComplete.call(this);
                }),
                getSelectionOffsets: function () {
                    var content_ = this.$('content');
                    if (ua.ie) {
                        var selectionRange = document.selection.createRange();
                        var selectionElement_ = selectionRange.parentElement();
                        if (content_ == selectionElement_ || isAncestor(content_, selectionElement_)) {
                            var range = document.body.createTextRange();
                            range.moveToElementText(content_);
                            range.setEndPoint('EndToStart', selectionRange);
                            var start = range.text.length;
                            range.setEndPoint('EndToEnd', selectionRange);
                            var end = range.text.length;
                            return {
                                start: start,
                                end: end
                            };
                        }
                    } else {
                        if (content_ == document.activeElement || isAncestor(content_, document.activeElement)) {
                            var selectionRange = window.getSelection().getRangeAt(0);
                            var range = document.createRange();
                            range.setStart(content_, 0);
                            range.setEnd(selectionRange.startContainer, selectionRange.startOffset);
                            var start = range.toString().length;
                            range.setEnd(selectionRange.endContainer, selectionRange.endOffset);
                            var end = range.toString().length;
                            return {
                                start: start,
                                end: end
                            };
                        }
                    }
                    return null;
                },
                hasSelectedRange: function () {
                    var content_ = this.$('content');
                    if (ua.ie) {
                        try {
                            var selectionElement_ = document.selection.createRange().parentElement();
                            return content_ == selectionElement_ || isAncestor(content_, selectionElement_);
                        } catch (ex) {
                            return false;
                        }
                    } else {
                        var content_ = this.$('content');
                        return content_ == document.activeElement || isAncestor(content_, document.activeElement);
                    }
                },
                createRange: (ua.ie ? function () {
                    var range = document.body.createTextRange();
                    range.moveToElementText(this.getRootVisual());
                    return range;
                } : function () {
                    var range = document.createRange();
                    range.selectNodeContents(this.getRootVisual());
                    return range;
                }),
                createRangeOn: (ua.ie ? function (start, end) {
                    var range = this.createRange();
                    var length = Math.min(end - start, range.text.length);
                    if (length > 0) {
                        var diff = 0;
                        range.collapse(true);
                        range.moveEnd('character', start);
                        while (diff = start - range.text.length) {
                            range.moveEnd('character', diff);
                        }
                        range.collapse(false);
                        range.moveEnd('character', length);
                        while (diff = length - range.text.length) {
                            range.moveEnd('character', diff);
                        }
                    } else {
                        range.collapse(true);
                    }
                    return range;
                } : function (start, end) {
                    var range = this.createRange();
                    var _root = this.getRootVisual();
                    var _node = _root.firstChild;
                    while (_node) {
                        var length = _node.textContent.length;
                        if (start > length) {
                            start -= length;
                            _node = _node.nextSibling;
                        } else {
                            if (_node.firstChild) {
                                _node = _node.firstChild;
                            } else {
                                range.setStart(_node, start);
                                break;
                            }
                        }
                    }
                    var _node = _root.firstChild;
                    while (_node) {
                        var length = _node.textContent.length;
                        if (end > length) {
                            end -= length;
                            _node = _node.nextSibling;
                        } else {
                            if (_node.firstChild) {
                                _node = _node.firstChild;
                            } else {
                                range.setEnd(_node, end);
                                break;
                            }
                        }
                    }
                    return range;
                }),
                focus: function () {
                    var self = this;
                    var content_ = this.$('content');
                    var originalDisplay = content_.style.display;
                    content_.style.display = '';
                    content_.focus();
                    var focus = function () {
                        if (ua.ie) {
                            var range = document.selection.createRange();
                            var cursorHolderId = 'cursorHolder_' + Math.random();
                            range.moveToElementText(content_);
                            range.collapse(false);
                            range.pasteHTML('<span id="' + cursorHolderId + '"></span>');
                            setTimeout(function () {
                                range.select();
                                try {
                                    var cursorHolder = $(cursorHolderId);
                                    cursorHolder.parentNode.removeChild(cursorHolder);
                                } catch (ex) {}
                            });
                            return;
                        }
                        if (ua.chrome || ua.safari) {
                            setTimeout(self.bindMethod('onFocus'));
                        }
                    };
                    try {
                        if (document.activeElement == content_) {
                            focus();
                            return;
                        }
                    } catch (ex) {}
                    content_.style.display = originalDisplay;
                    var focusInterval = setInterval(function () {
                        content_.style.display = '';
                        content_.blur();
                        content_.focus();
                        if (document.activeElement == content_) {
                            focus();
                            clearInterval(focusInterval);
                        } else {
                            content_.style.display = originalDisplay;
                        }
                    });
                },
                focusToEnd: function () {
                    this.show();
                    F4A.utils.dom.focusToEnd(this.$('content'));
                },
                focusToRange: (ua.ie ? function (range) {
                    range.select();
                    updateLastSelectedRange.call(this, range);
                    this.focus();
                } : function (range) {
                    window.getSelection().removeAllRanges();
                    window.getSelection().addRange(range);
                    updateLastSelectedRange.call(this, range);
                    this.focus();
                }),
                focusOn: function (start, end) {
                    this.focusToRange(this.createRangeOn(start, end));
                },
                focusOnWhole: function () {
                    this.focusToRange(this.createRange());
                },
                blur: function () {
                    this.$('content').blur();
                },
                onInput: (ua.firefox ? function (e) {
                    var content_ = this.$('content');
                    if (content_.innerHTML == '') {
                        content_.innerHTML = '<br _moz_dirty="" />';
                    }
                } : function () {
                    setTimeout(this.bindMethod('checkContent'));
                }),
                onKeyDown: function (e) {
                    var e = QZFL.event.getEvent(e);
                    var content_ = this.$('content');
                    if (ua.firefox) {
                        if (content_.innerHTML == '') {
                            content_.innerHTML = '<br _moz_dirty="" />';
                        }
                    }
                    updateLastSelectedRange.call(this);
                    this.originalContent = content_.innerHTML;
                    if (ua.ie) {
                        switch (e.keyCode) {
                            case QZFL.event.KEYS.TAB:
                                return;
                        }
                        setTimeout(this.checkContent);
                    }
                },
                onKeyUp: function () {
                    updateLastSelectedRange.call(this);
                },
                onMouseDown: function () {
                    updateLastSelectedRange.call(this);
                },
                onMouseUp: function () {
                    updateLastSelectedRange.call(this);
                },
                onFocus: function () {
                    var content_ = this.$('content');
                    QZFL.css.addClassName(content_, 'input_focus');
                    QZFL.css.addClassName(content_, 'textinput_focus');
                    content_.style.display = '';
                    if (this.lastSelectedRange) {
                        if (ua.ie) {
                            if (this.lastSelectedRange.parentElement) {
                                var _parentElement = this.lastSelectedRange.parentElement();
                                if (_parentElement == content_ || isAncestor(content_, _parentElement)) {
                                    this.lastSelectedRange.select();
                                    return;
                                }
                            }
                        } else {
                            var _startContainer = this.lastSelectedRange.startContainer;
                            var _endContainer = this.lastSelectedRange.endContainer;
                            if (_startContainer == content_ || isAncestor(content_, _startContainer)) {
                                if (_endContainer == content_ || isAncestor(content_, _endContainer)) {
                                    var selection = getSelection();
                                    selection.removeAllRanges();
                                    selection.addRange(this.lastSelectedRange);
                                    return;
                                }
                            }
                        }
                        delete this.lastSelectedRange;
                        F4A.utils.dom.focusToEnd(content_);
                    }
                },
                onBlur: function () {
                    var content_ = this.$('content');
                    QZFL.css.removeClassName(content_, 'input_focus');
                    QZFL.css.removeClassName(content_, 'textinput_focus');
                },
                onPaste: function () {
                    setTimeout(this.checkContent);
                }
            });
            this.setTemplate(Template.parse('<div x:id="content" contenteditable="true" class="richTextBox"></div>'));
        };
    });
});
F4A.nameSpace('controls', new function () {
    var Root = F4A.controls.Root;
    var Control = F4A.controls.Base;
    var Template = F4A.controls.Template;
    this.Substitutor = Control.derive(new function () {
        this.constructor = function () {
            if (Control.apply(this, arguments)) {}
        };
        this.extendPrototype = function () {
            this.genProperties({
                target: {
                    async: true,
                    onChanged: function ($original, $target) {
                        var $sub = this;
                        if ($original && !isFunction($original)) {
                            $original.removeListener('onContentChanged', $sub.$target_onContentChanged);
                            $original.removeListener('onFocus', $sub.$target_onFocus);
                            $original.removeListener('onBlur', $sub.$target_onBlur);
                        }
                        $sub._bindTarget();
                    }
                }
            });
            this.hide = function () {
                this.getRootVisual().style.position = 'absolute';
                return Control.prototype.hide.apply(this, arguments);
            };
            this.show = function () {
                this.getRootVisual().style.position = '';
                return Control.prototype.show.apply(this, arguments);
            };
            this.onRootVisualChanged = function ($original, $root) {
                if ($original) {
                    QZFL.event.removeEvent($original, 'focus', this.$root_onFocus);
                    QZFL.event.removeEvent($original, 'click', this.$root_onClick);
                }
                if ($root) {
                    QZFL.event.addEvent($root, 'focus', this.$root_onFocus || (this.$root_onFocus = this.createHandler(this.ensureObservable('onFocus'))));
                    QZFL.event.addEvent($root, 'click', this.$root_onClick || (this.$root_onClick = this.createHandler(this.ensureObservable('onClick'))));
                }
            };
            this.getContent = function () {
                return this.$('content').innerHTML;
            };
            this.setContent = function (value, valueType) {
                var _content = this.$('content');
                switch (valueType) {
                    case 'node':
                        _content.innerHTML = '';
                        _content.appendChild(value);
                        break;
                    case 'html':
                        _content.innerHTML = value;
                        break;
                    default:
                        if (value && value.toString && value.toString() == '[object DocumentFragment]') {
                            return '';
                        }
                        _content.innerHTML = escHTML(value);
                        break;
                }
                if (_content.innerHTML) {
                    this._bindTarget();
                }
                return value;
            };
            this.onFocus = function () {
                this.getTarget(function ($target) {
                    if ($target) {
                        $target.focus();
                    }
                });
            };
            this.onClick = function () {
                try {
                    this.getRootVisual().focus();
                } catch (ex) {}
            };
            this._bindTarget = function () {
                var $sub = this;
                var $target = $sub.getTarget();
                if ($target && !isFunction($target)) {
                    if ($sub.getContent()) {
                        var _target = $target.getRootVisual();
                        $target.removeListener('onContentChanged', $sub.$target_onContentChanged);
                        $target.addListener('onContentChanged', $sub.$target_onContentChanged || ($sub.$target_onContentChanged = function () {
                            try {
                                $target.isFocused = $target.getRootVisual() == document.activeElement;
                            } catch (ex) {
                                F4A.requirejSolution(function (j$) {
                                    j$.load({
                                        resName: '*',
                                        nsName: 'utils/monitor',
                                        nsVer: '1.0',
                                        onSuccess: function (j$mon) {
                                            j$mon.sendPV('battach.qzone.qq.com', 'substitutor_init_error');
                                        }
                                    });
                                });
                            }
                            if ($target.isFocused || $target.hasContent()) {
                                $sub.hide();
                                $target.show();
                            } else {
                                $sub.show();
                                $target.hide();
                            }
                        }));
                        $target.removeListener('onFocus', $sub.$target_onFocus);
                        $target.addListener('onFocus', $sub.$target_onFocus || ($sub.$target_onFocus = function () {
                            $target.isFocused = true;
                            $sub.hide();
                        }));
                        $target.removeListener('onBlur', $sub.$target_onBlur);
                        $target.addListener('onBlur', $sub.$target_onBlur || ($sub.$target_onBlur = function () {
                            $target.isFocused = false;
                            if ($target.hasContent()) {
                                $sub.hide();
                            } else {
                                $target.hide();
                                $sub.show();
                            }
                        }));
                        $sub.$target_onBlur();
                    } else {
                        $sub.hide();
                        $target.show();
                    }
                }
            };
            this.setTemplate(Template.parse(['<div x:id="content" contenteditable="true" tabindex="0"></div>'].join('')));
        };
    });
});
F4A.nameSpace('controls', new function () {
    var $f = F4A,
        $fl = $f.lang,
        $fm = $f.models,
        $fc = $f.controls;
    var Root = $fl.Root,
        Model = $fm.Base,
        Control = $fc.Base,
        Template = $fc.Template;
    var urlPattern = new RegExp('((news|telnet|nttp|file|http|ftp|https)://)(([-A-Za-z0-9_]+(\\.[-A-Za-z0-9_]+)*(\\.[-A-Za-z]{2,5}))|([0-9]{1,3}(\\.[0-9]{1,3}){3}))(:[0-9]*)?(/[-A-Za-z0-9_\\$\\.\\+\\!*()<>{},;:@&=?/~#%\'`]*)*', 'ig'),
        urlSample = 'http://url.cn/4Wbbsg';
    var charPattern = /[^\x00-\x80]/g,
        charSample = 'aa';
    this.TextBoxCharCounter = Control.derive(new function () {
        this.constructor = function () {
            if (Control.apply(this, arguments)) {}
        };
        this.extendPrototype = function () {
            this.className = 'TextBoxCharCounter';
            this.genProperties({
                shortUrlSupported: {
                    defaultValue: true,
                    onChanged: function (original, shortUrlSupported) {
                        this.updateCurrentLength();
                    }
                },
                mode: {
                    defaultValue: 't.qq.com',
                    onChanged: function (original, mode) {
                        this.updateCurrentLength();
                    }
                },
                currentLength: {
                    defaultValue: 0,
                    onChanged: function () {}
                },
                maxLength: {
                    defaultValue: 100,
                    setter: function (value) {
                        if (this['@maxLength'] != value) {
                            if (typeof (value) == 'number') {
                                var original = this['@maxLength'];
                                this['@maxLength'] = value;
                                this.onMaxLengthChanged(original, value);
                            }
                        }
                        return value;
                    },
                    onChanged: function () {}
                },
                target: {
                    onChanged: function ($original, $target) {
                        var $charCounter = this;
                        if ($original) {
                            $target.addListener('onKeyDown', this.$target_onKeyDown);
                            $target.addListener('onMouseUp', this.$target_onMouseUp);
                            $target.addListener('onContentChanged', this.$target_onContentChanged);
                        }
                        if ($target) {
                            $target.addListener('onKeyDown', this.$target_onKeyDown || (this.$target_onKeyDown = function () {
                                setTimeout(function () {
                                    $charCounter.updateCurrentLength();
                                });
                            }));
                            $target.addListener('onMouseUp', this.$target_onMouseUp || (this.$target_onMouseUp = function () {
                                $charCounter.updateCurrentLength();
                            }));
                            $target.addListener('onContentChanged', this.$target_onContentChanged || (this.$target_onContentChanged = function () {
                                $charCounter.updateCurrentLength();
                            }));
                        }
                        $charCounter.updateCurrentLength();
                    }
                }
            });
            this.onRootVisualChanged = function ($_original, $_root) {};
            this.updateCurrentLength = function () {
                var $target = this.getTarget();
                if ($target) {
                    this.setCurrentLength(F4A.utils.string.countContentLength($target.getContent().replace(/(^\s*)|(\s*$)/g, ''), {
                        shortUrlSupported: this.getShortUrlSupported(),
                        mode: this.getMode()
                    }));
                } else {
                    this.setCurrentLength(0);
                }
            };
            this.setTemplate(Template.parse(['<span class="number_left c_tx3">', '<span x:innerHTML="#{currentLength:1}"></span>/<span x:innerHTML="#{maxLength:1}"></span>', '</span>'].join('')));
        };
        this.extendClass = function () {};
    });
});
F4A.nameSpace('controls', new function () {
    var $f = F4A,
        $fl = $f.lang,
        fp = $f.FP,
        $fc = $f.controls;
    var Root = $fl.Root;
    var Control = $fc.Base;
    var ItemsControl = $fc.ItemsControl;
    var Template = $fc.Template;
    var base = fp.getBase();
    this.CommentBox = Control.derive({
        className: 'CommentBox',
        properties: {
            config: {
                accessMode: 'private-get'
            },
            contentBox: {
                async: true,
                onChanged: function (original$, content$) {
                    if (original$ && original$.removeListener) {
                        original$.removeListener('onKeyDown', this.bindMethod('content$_onKeyDown'));
                        original$.removeListener('onFocus', this.bindMethod('content$_onFocus'));
                        original$.removeListener('onBlur', this.bindMethod('content$_onBlur'));
                    }
                    if (content$ && content$.addListener) {
                        content$.addListener('onKeyDown', this.bindMethod('content$_onKeyDown'));
                        content$.addListener('onFocus', this.bindMethod('content$_onFocus'));
                        content$.addListener('onBlur', this.bindMethod('content$_onBlur'));
                        this.actOnRootReady(function () {
                            content$.renderAt(this.$('content'));
                            var commentBox$ = this;
                            Control.loadDefinition('TextBoxCharCounter', {
                                onSuccess: function () {
                                    var contentCharCounter$ = new $fc.TextBoxCharCounter({
                                        target: content$,
                                        maxLength: commentBox$.getContentMaxLength()
                                    });
                                    contentCharCounter$.renderAt(commentBox$.$('contentCharCounter'));
                                    commentBox$.addListener('onContentMaxLengthChanged', function (original, maxLength) {
                                        contentCharCounter$.setMaxLength(maxLength);
                                    });
                                    commentBox$ = null;
                                }
                            });
                        });
                    }
                },
                methods: {
                    content$_onKeyDown: function (e) {
                        e = QZFL.event.getEvent(e);
                        this.hideHint();
                        if (e.ctrlKey && e.keyCode == QZFL.event.KEYS.RETURN) {
                            this.post();
                            QZFL.event.preventDefault(e);
                        }
                    },
                    content$_onFocus: function (e) {
                        this.onFocus();
                    },
                    content$_onBlur: function (e) {
                        if (this.getIsMouseOver()) {} else {
                            this.onBlur();
                        }
                    }
                }
            },
            subsititutor: {
                onChanged: function (original$, substitutor$) {
                    if (original$) {
                        original$.resetTarget();
                    }
                    if (substitutor$) {
                        substitutor$.setTarget(this);
                    }
                }
            },
            contentMaxLength: {
                initialValue: 140,
                onChanged: function () {}
            },
            isMouseOver: {
                accessMode: 'private-set'
            },
            template: {
                initialValue: Template.parse(['<div x:id="commentBox" class="mod_commnets_poster mod_comments_poster_noavatar">', '<div class="comments_poster_bd">', '<div class="comments_box has_char_count">', '<div x:id="content" class="textinput textarea c_tx2"></div>', '<div x:id="contentCharCounter" class="number_left c_tx3">0/140</div>', '</div>', '</div>', '<div class="comments_poster_ft">', '<div class="comments_poster_op">', '<input type="button" class="gb_bt gb_bt2" value="发表" x:id="postButton">', '</div>', '<div class="comments_poster_addons" x:id="extensions"><div x:id="attachs" style="float: left;height: 18px;"></div>', '</div>', '</div>'].join(''))
            }
        },
        methods: {
            showHint: function () {},
            hideHint: function () {},
            enable: function () {
                var postButton_ = this.$('postButton');
                if (postButton_) {
                    postButton_.disabled = false;
                }
            },
            disable: function () {
                var postButton_ = this.$('postButton');
                if (postButton_) {
                    postButton_.disabled = true;
                }
            },
            focus: function () {
                this.getContentBox(function (content$) {
                    content$.focus();
                });
            },
            blur: function () {
                var content$ = this.getContentBox();
                return content$.blur && content$.blur.apply(content$, arguments);
            },
            getContent: function () {
                var content$ = this.getContentBox();
                return content$.getContent ? content$.getContent.apply(content$, arguments) : '';
            },
            setContent: function () {
                var content$ = this.getContentBox();
                return content$.setContent ? content$.setContent.apply(content$, arguments) : '';
            },
            hasContent: function () {
                var content$ = this.getContentBox();
                return content$.hasContent ? content$.hasContent.apply(content$, arguments) : false;
            },
            isEmpty: function () {
                var content$ = this.getContentBox();
                return content$.isEmpty ? content$.isEmpty.apply(content$, arguments) : true;
            },
            addExtension: function ($extension, $_placeHolder) {
                var $_extensions = this.$('extensions');
                $extension.setTarget(this);
                if ($_placeHolder) {
                    $extension.renderAt($_placeHolder);
                } else {
                    $extension.renderIn($_extensions);
                }
                $_extensions.style.display = '';
            },
            removeExtension: function ($extension) {
                var $_extensions = this.$('extensions');
                $extension.resetTarget();
                $extension.removeFromUI();
                if ($_extensions.childNodes.length == 0) {
                    $_extensions.style.display = 'none';
                }
            },
            post: function () {
                var viewModel = this.getDataContext();
                if (viewModel && viewModel != this) {
                    this.disable();
                    viewModel.post(this.callByPath('contentBox.getContent'), this.callByPath('contentBox.getContent', true));
                    this.onPost();
                }
            },
            cancel: function () {
                var viewModel = this.getDataContext();
                if (viewModel && viewModel != this) {
                    viewModel.cancel.call(this);
                    this.onCancel();
                }
            },
            reset: function () {
                this.$('postButton').disabled = false;
                var content$ = this.getContentBox();
                content$.resetContent && content$.resetContent();
            },
            onRootVisualChanged: function (orig_, root_) {
                var commentBox$ = this;
                if (orig_) {
                    QZFL.event.removeEvent(orig_, 'mouseover', this.root__mouseover);
                    QZFL.event.removeEvent(orig_, 'mouseout', this.root__mouseout);
                    QZFL.event.removeEvent(orig_, 'click', this.root__click);
                }
                if (root_) {
                    var config = this._getConfig();
                    var viewModel = this.getDataContext();
                    QZFL.event.addEvent(root_, 'mouseover', this.root__mouseover || (this.root__mouseover = this.createHandler(function (e) {
                        this._setIsMouseOver(true);
                    })));
                    QZFL.event.addEvent(root_, 'mouseout', this.root__mouseout || (this.root__mouseout = this.createHandler(function (e) {
                        this._setIsMouseOver(false);
                    })));
                    QZFL.event.addEvent(root_, 'click', this.root__click || (this.root__click = this.createHandler(function (e) {
                        var target_ = QZFL.event.getTarget(e);
                        var content$ = commentBox$.getContentBox();
                        if (content$) {
                            QZFL.dom.isAncestor(this.$('extensions'), target_) || QZFL.dom.isAncestor(this.$('operations'), target_) || QZFL.dom.isAncestor(content$.getRootVisual(), target_) || content$.focus();
                        }
                    })));
                    this.$('postButton').onclick = function () {
                        commentBox$.post();
                        return false;
                    };
                }
            },
            onDataContextChanged: function (original, dataContext) {
                if (this.getRootVisual()) {
                    if (original) {
                        var extensionLoaders = original.extensionLoaders;
                        if (extensionLoaders) {
                            for (var i = 0, j = extensionLoaders.length; i < j; i++) {
                                extensionLoaders[i].undo();
                            }
                        }
                    }
                    if (dataContext) {
                        var extensionLoaders = dataContext.extensionLoaders;
                        if (extensionLoaders) {
                            var $_extensions = this.$('extensions');
                            if ($_extensions) {
                                if (extensionLoaders.length) {
                                    $_extensions.style.height = '23px';
                                    $_extensions.style.display = '';
                                }
                                for (var i = 0, j = extensionLoaders.length; i < j; i++) {
                                    var $_placeHolder = document.createElement('span');
                                    $_extensions.appendChild($_placeHolder);
                                    extensionLoaders[i].call(this, $_placeHolder);
                                }
                            }
                        }
                    }
                    var content$ = this.getContentBox();
                    content$.resetContent && content$.resetContent();
                } else {
                    this.addListener('onRootVisualChanged', function () {
                        this.removeListener(arguments.callee);
                        this.onDataContextChanged(original, dataContext);
                    });
                }
            },
            onPost: function () {},
            onCancel: function () {},
            onFocus: function () {},
            onBlur: function () {},
            appendMention: function (user) {
                var mp$ = this;
                var context = {};
                F4A.async([function () {
                    mp$.getContentBox(arguments.callee.next);
                }, function (cb$) {
                    context.cb$.loadResponsor('@', {
                        onSuccess: arguments.callee.next
                    });
                }, function () {
                    context.cb$.addListener('onFocus', arguments.callee.next);
                    context.cb$.focus();
                }, function () {
                    context.cb$.removeListener('onFocus', arguments.callee);
                    context.cb$.insertToContent(F4A.controls.SensibleEditor.responsors.FriendSelector.createMention(user), 'node');
                }]);
            },
            appendMentions: function (users) {
                var mp$ = this;
                var context = {};
                F4A.async([function () {
                    mp$.getContentBox(arguments.callee.next);
                }, function (cb$) {
                    context.cb$ = cb$;
                    cb$.loadResponsor('@', {
                        onSuccess: function () {}
                    });
                    cb$.loadResponsor('@', {
                        onSuccess: arguments.callee.next
                    });
                }, function () {
                    context.cb$.addListener('onFocus', arguments.callee.next);
                    context.cb$.focus();
                }, function () {
                    context.cb$.removeListener('onFocus', arguments.callee);
                    var fragment_ = document.createDocumentFragment();
                    for (var i = 0, j = users.length; i < j; i++) {
                        fragment_.appendChild(F4A.controls.SensibleEditor.responsors.FriendSelector.createMention(users[i]));
                    }
                    context.cb$.insertToContent(fragment_, 'node');
                }]);
            },
            appendEmoticon: function (emoticon) {
                var mp$ = this;
                this.getContentBox(function (cb$) {
                    cb$.insertToContent(mp$.createEmoticon(emoticon), 'node');
                    cb$.focus();
                });
            },
            createEmoticon: function (emoticon) {
                var id = parseInt(emoticon.id);
                var emoticon_ = new Image;
                emoticon_.alt = '☺';
                emoticon_.tabindex = -1;
                emoticon_.unselectable = true;
                emoticon_.className = 'emoticon';
                if (ua.ie) {
                    emoticon_.useMap = id;
                } else {
                    emoticon_.setAttribute('name', id);
                }
                emoticon_.style.cssText = (id < 7000 || id > 7449 ? 'width:24px;height:24px;' : 'width:20px;height:20px;');
                emoticon_.src = ['http://', base.siDomain, '/qzone/em/e', ua.ie ? emoticon_.useMap : emoticon_.getAttribute('name'), '.gif'].join('');
                return emoticon_;
            }
        },
        extendClass: function () {
            this.ViewModel = Root.derive({
                properties: {
                    extensionLoaders: {}
                },
                methods: {
                    post: function () {},
                    cancel: function () {}
                }
            });
        }
    });
});