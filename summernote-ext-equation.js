(function (factory) {
    /* global define */
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals
        factory(window.jQuery);
    }
}(function ($) {

    // Extends plugins for adding hello.
    //  - plugin is external module for customizing.
    $.extend($.summernote.plugins, {
        /**
         * @param {Object} context - context object has status of editor.
         */
        equation: function (context) {
            var self = this;

            // ui has renders to build ui elements.
            //  - you can create a button with `ui.button`
            var ui = $.summernote.ui;
            
            self.eqstat = {
                    formula: 'formula',
                    cursorpos: 0,
                    el: ''
             };

            // add hello button
            context.memo('button.hello', function () {
                // create button
                var button = ui.button({
                    contents: '<i>Equation</i>',
                    tooltip: 'insert equation',
                    click: function () {

                        var layoutInfo = context.layoutInfo;
                        var $editor = layoutInfo.editor;
                        var $editable = layoutInfo.editable;

                        if (self.$panel.is(":hidden")) {
                            $($editable).animate({width: '70%'}, "slow");
                            self.$panel.show();
                        } else {
                            $($editable).animate({width: '100%'}, "slow");
                            self.$panel.hide();
                            $('.equation-container').each(function (i, v) {
                                var uniqint = $(v).data('id');
                                var text = $(this).find('script').text();
                                if (!text) {
                                    var text = $(v).text();
                                    if (text[0] != '$') {
                                        $(v).text('$' + text + '$');
                                    }
                                    $(v).attr('contenteditable', false);
                                    MathJax.Hub.Queue(["Typeset", MathJax.Hub, 'equation-' + uniqint]);
                                }
                            });
                        }

                        // invoke insertText method with 'hello' on editor module.
                        // context.invoke('editor.insertText', 'hello');
                    }
                });
                // create jQuery object from button instance.
                return button.render();
            });
            

            // This events will be attached when editor is initialized.
            this.events = {
                // This will be called after modules are initialized.
                'summernote.init': function (we, e) {
                   // console.log('summernote initialized', we, e);
                },
                // This will be called when user releases a key on editable.
                'summernote.keyup summernote.mouseup': function (we, e) {
                   // console.log(e.currentTarget);
                    if (document.getSelection().anchorNode.parentNode) {
                        if ($(document.getSelection().anchorNode.parentNode).hasClass('equation-container')) {
                            self.eqstat.el = document.getSelection().anchorNode.parentNode;
                            self.eqstat.formula = document.getSelection().anchorNode.nodeValue;
                            self.eqstat.curpos = (self.getCaretCharacterOffsetWithin(document.getSelection().anchorNode));
                        }
                    }
            }
                
            };
            
            
            
            self.getCaretCharacterOffsetWithin = function(element) {
                var caretOffset = 0;
                if (typeof window.getSelection != "undefined") {
                    var range = window.getSelection().getRangeAt(0);
                    var preCaretRange = range.cloneRange();
                    preCaretRange.selectNodeContents(element);
                    preCaretRange.setEnd(range.endContainer, range.endOffset);
                    caretOffset = preCaretRange.toString().length;
                } else if (typeof document.selection != "undefined" && document.selection.type != "Control") {
                    var textRange = document.selection.createRange();
                    var preCaretTextRange = document.body.createTextRange();
                    preCaretTextRange.moveToElementText(element);
                    preCaretTextRange.setEndPoint("EndToEnd", textRange);
                    caretOffset = preCaretTextRange.text.length;
                }
                return caretOffset;
            }
            
            
                        
             self.placeCursorAtEnd =  function() {
                // Places the cursor at the end of a contenteditable container (should also work for textarea / input)
                $editable = context.layoutInfo.editable
                if ($editable.length === 0) {
                    throw new Error("Cannot manipulate an element if there is no element!");
                }
                var el = $editable[0];
                var range = document.createRange();
                var sel = window.getSelection();
                var childLength = el.childNodes.length;
                if (childLength > 0) {
                    var lastNode = el.childNodes[childLength - 1];
                    var lastNodeChildren = lastNode.childNodes.length;
                    range.setStart(lastNode, lastNodeChildren);
                    range.collapse(true);
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
                return $editable;
            };
            
            
            self.getUniqRandomInt = function(min, max, items) {
                    var id = Math.floor(Math.random() * (max - min + 1)) + min;

                    if (!$.inArray(id, items ? items : 0)) {
                        getUniqRandomInt(min, max, items);
                    } else {
                        return id;
                    }
                };

            // This method will be called when editor is initialized by $('..').summernote();
            // You can create elements for plugin
            self.initialize = function () {

                var self = this;

                var layoutInfo = context.layoutInfo;
                var $editor = layoutInfo.editor;
                var $editable = layoutInfo.editable;
                var height = $($editable).height();
                
                         
                self.$panel = $('<div class="eq-panel"></div>')
                        .css({height: height, float: 'left', width: '30%'})
                        .append('<div class="eq-insert-block"><i> Add' +
                                '</i></div><div id="scrolling" class="media p-10">' +
                                '<div class="panel-group" data-collapse-color="amber"' +
                                'id="accordion" role="tablist" aria-multiselectable="true"></div></div>').hide();

                $($editable).parent().append(self.$panel);
                $($editable).css({float: 'left', width: '100%'});

                $.ajax({
                    dataType: "html",
                    url: './dist/equation-tmpl.html',
                    success: function (result) {
                        $(self.$panel).find('#accordion').html(result);
                    }
                });
                
                
                $('.eq-insert-block').on('click', function () {
                    self.placeCursorAtEnd();
                    var uniqint = self.getUniqRandomInt(0, 100000, $('.equation-container'));
                    var val = 'formula';
                    var node = $('<div  data-id="' + uniqint + '" id="equation-' + uniqint + '" contenteditable="false" class="badge equation-container">$' + val + '$</div>');   
                    context.invoke('editor.insertNode', node[0]);
                    MathJax.Hub.Queue(["Typeset", MathJax.Hub, 'equation-' + uniqint]);
                    
                });
                
                $($editor).on('dblclick','.equation-container', function () {
    
                    var $this = this;
                    
                    $('.equation-container').each(function(i,v){
                        
                        if ($($this).data('id') != $(v).data('id')) {
                             
                            var uniqint = $(v).data('id');
                            var text = $(v).find('script').text();
                            if (!text) {
                               if ($(v).text()[0] != '$') {
                               $(v).text('$' + $(v).text() + '$');
                           }
                               $(v).attr('contenteditable', false);
                               MathJax.Hub.Queue(["Typeset", MathJax.Hub, 'equation-' + uniqint]);
                            } else {
                                $(v).attr('contenteditable', true);
                            }
                        }
                    });
                    
                    
                    var uniqint = $(this).data('id');
                    var text = $(this).find('script').text();
                    if (text) {
                        $(this).empty().text(text);
                        $(this).attr('contenteditable', true);
                    } else {
                        text = $(this).text();
                        if(text[0] != '$') {
                        $(this).text('$' + text + '$');
                    }
                        console.log('equation-' + uniqint);
                        //MathJax.Hub.Queue(["Typeset", MathJax.Hub, 'equation-' + uniqint]);
                        MathJax.Hub.Typeset();
                      
                        $(this).attr('contenteditable', false);
                    }
                });
                
                $(self.$panel).on('click','.badge', function () {
                    
                    var uniqint = $(this).data('id');
                    var text = $(this).find('script').text();
                    var formula = self.eqstat.formula;
                    var pos = self.eqstat.curpos;
                    var el = self.eqstat.el;

                    var left = formula.substr(0,pos);
                    var right = formula.substr(pos);
                    $(el).text(left + text + right);
                });

            };
                       
            // This methods will be called when editor is destroyed by $('..').summernote('destroy');
            // You should remove elements on `initialize`.
            this.destroy = function () {
                this.$panel.remove();
                this.$panel = null;
            };
        }
    });
}));
