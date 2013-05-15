var myCodeMirror;

function load () {


        
    // From: https://github.com/hsk81/notex/blob/master/editor/static/js/CodeMirror.rest.js#L25
    var rx_word = "!\"#$%&()*+,-./:;<=>?@[\\\\\\]^_`{|}~";

    var myTypo = new Typo ("en_US", null, null, {
        platform: 'any',
        dictionaryPath: '/javascripts/typo/dictionaries'
    });

    CodeMirror.defineMode ("myoverlay", function (config, parserConfig) {
        var overlay = {

            startState: function() {return {error: false}},
            token: function(stream, state) {
                
                if (stream.peek() === ' ') {
                    stream.next();
                    return null;
                }
                
                // deal with leading punctuation
                if (stream.match(/[^\w]*/)[0].length > 0) { return null };
                
                if (stream.skipTo(' ') || !stream.skipToEnd()) {
                    state.error = !myTypo.check(stream.current());
                    !state.error && stream.next(); 
                    return state.error ? "spell-error" : null;
                } else {
                    stream.skipToEnd(); // end of line
                }
                
            }
          };


/*            token: function (stream, state) {



        // begin Matt's code: https://gist.github.com/mcasperson/0a4d4685ed9c8cc02a95
            var ch, error;
            var patt = /[A-Za-z]+/;
                if (patt.test(stream.string)) {
                    while ((ch = stream.next()) != null)
                        if (!patt.test(ch)) break;
                    error = !myTypo.check(stream.string);
                    return error ? "spell-error" : null;
                }
                while ((ch = stream.next()) != null && !patt.test(ch)) {}
                return null;
            }
            
              
            
            
        };
        // end Matt's code
        
                /*    if (stream.match (rx_word) &&
                       myTypo.check (stream.current ()
                           .replace (/^'+/,'').replace (/'+$/,'')))
                        return "spell-error"; 
            }
        };*/

        var mode = CodeMirror.getMode (
            config, parserConfig.backdrop || "text/x-myoverlay"
        );
    
        return CodeMirror.overlayMode (mode, overlay);
    });
    
    var myCodeMirror = CodeMirror(document.body, 
        {value: "Hello World - this is teh intitial code mirror contentz",
        mode:  "myoverlay"}
        );
    
    //CodeMirror.overlayMode ="myoverlay";
}

    
    // Stack Overflow code http://stackoverflow.com/questions/12343922/codemirror-with-spell-checker
    /*            if (stream.match (rx_word) &&
                    typo && !typo.check (stream.current ()))
    
                    return "spell-error"; //CSS class: cm-spell-error
    
                while (stream.next () != null) {
                    if (stream.match (rx_word, false)) return null;
                }
    
                return null;
            }
        }; */