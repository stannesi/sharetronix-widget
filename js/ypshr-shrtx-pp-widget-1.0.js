/**
 * v1.0 Yapi sharetronix profile/public widget for sharetronix microsocial platform
 *
 * github - http://github.com/stannesi
 * Copyright (C) 2011 yapi sharetronix
 * licensed under the MIT license.
 *
 * Author: Stan nesi (stannesi@yahoo.com)
 * Website: http://twitter.com/stannesi,
 *          http://facebook.com/stannesi
 *
 * Date: 27-08-2011 09:52:21 - (Sat, 27 Aug 2011)
 * For full documented source contact stannesi
 *
 * Credits:
 * Dustin Diaz (dustin@twitter.com)
 *
 * file: ypshr-shrtx-pp-widget-1.0.js
 *
 * Example usage:
   <script src="path/to/ypshr-shtx-pp-widget-1.0.js"></script>
   <script>
    new YPSHR.Widget({
	   version: 1,
       type: 'public',
	   title: 'stannesi is testing....',
	   subject: 'Sharetronix Public',
       rpp: 20,
       interval: 1000,
       width: 250,
       height: 350,

	   theme: {
         shell: {
           background: '#000',
           color: 'yellow',
           border_color: '#000',
           border_size: '2px'
         },
         posts: {
           background: '#444',
           color: 'white',
           border_color: '#222',
           border_size: '2px',
           links: 'silver'
         }
       },

       features: {
         scrollbar: false,
         fullscreen: false,
         loop: true,
         live: true,
         hashtags: true,
         timestamp: true,
         avatars: true, // defaults to false for profile widget, but true for public widget
         behavior: 'all'
       }
     }).render().start();
*/
/**
  * @namespace YPSHR public namespace for yapi sharetronix widget
  */
YPSHR = window.YPSHR || {};

/**
  * add core functionality to JS
  * Sugar Arrays http://www.dustindiaz.com/basement/sugar-arrays.html
  */
if (!Array.forEach) {

  Array.prototype.filter = function(fn, thisObj) {
    var scp = thisObj || window;
    var a = [];
    for (var i=0, j=this.length; i < j; ++i) {
      if (!fn.call(scp, this[i], i, this)) {
        continue;
      }
      a.push(this[i]);
    }
    return a;
  };

  // sorta like inArray if used clever-like
  Array.prototype.indexOf = function(el, start) {
    var start = start || 0;

    for (var i=0; i < this.length; ++i) {
      if (this[i] === el) {
        return i;
      }
    }
    return -1;
  };
}

/* first, a few dependencies */
(function() {
  if ( YPSHR && YPSHR.Widget ) {
    // this is most likely to happen when people try to embed multiple
    // widgets on the same page and include this script again
    return;
  }
  /**
    * Basic Array methods
    */
  function each( a, fn, opt_scp ) {
    for ( var i=0, j=a.length; i < j; ++i ) {
      fn.call( opt_scp || window, a[i], i, a );
    }
  }
  /**
    * Generic Animation utility to tween dom elements
    * Copyright (c) 2009 Dustin Diaz (http://www.dustindiaz.com)
    * MIT License
    */

  /**
    * @constructor Animate
    * @param {HTMLElement} el the element we want to animate
    * @param {String} prop the CSS property we will be animating
    * @param {Object} opts a configuration object
    * object properties include
    * from {Int}
    * to {Int}
    * time {Int} time in milliseconds
    * callback {Function}
    */
  function Animate(el, prop, opts) {
    this.el = el;
    this.prop = prop;
    this.from = opts.from;
    this.to = opts.to;
    this.time = opts.time;
    this.callback = opts.callback;
    this.animDiff = this.to - this.from;
  };

  /**
    * @static
    * @boolean
    * allows us to check if native CSS transitions are possible
    */
  Animate.canTransition = function() {
    var el = document.createElement('ypshr-shtx');
    el.style.cssText = '-webkit-transition: all .5s linear;';
    return !!el.style.webkitTransitionProperty;
  }();

  /**
    * @private
    * @param {String} val the CSS value we will set on the property
    */
  Animate.prototype._setStyle = function(val) {
    switch (this.prop) {
      case 'opacity':
        this.el.style[this.prop] = val;
        this.el.style.filter = 'alpha(opacity=' + val * 100 + ')';
        break;

      default:
        this.el.style[this.prop] = val + 'px';
        break;
    };
  };

  /**
    * @private
    * this is the tweening function
    */
  Animate.prototype._animate = function() {
    var that = this;
    this.now = new Date();
    this.diff = this.now - this.startTime;

    if (this.diff > this.time) {
      this._setStyle(this.to);

      if (this.callback) {
        this.callback.call(this);
      }
      clearInterval(this.timer);
      return;
    }

    this.percentage = (Math.floor((this.diff / this.time) * 100) / 100);
    this.val = (this.animDiff * this.percentage) + this.from;
    this._setStyle(this.val);
  };

  /**
    * @public
    * begins the animation
    */
  Animate.prototype.start = function() {
    var that = this;
    this.startTime = new Date();

    this.timer = setInterval(function() {
      that._animate.call(that);
    }, 15);
  };


  /**
    * @constructor
    * Widget Base for new instances of the yapi Sharetronix Public/Profile widget
    * @param {Object} opts the configuration options for the widget
    */

  YPSHR.Widget = function( opts ) {
    this.init( opts );
  };

  (function() {
    // Internal Namespace.
    var yapshr = {};
	// links object
	yapshr.link ={}

	//console.log (yapshr);

    var isHttps = location.protocol.match( /https/ );
	var http = isHttps ? 'https://' : 'http://';

/****************************** EDITABBLE AREA ******************************/

	// host domain for any sharetronix microsocial platform
	yapshr.link.domain = "community.sharetronix.com";

	// widget folder Location 'eg: http://localhost/' ---> contains a folder called <widgets>
	yapshr.link.widget = "community.sharetronix.com";

	// host site URL already created from the domain input
	yapshr.link.site_url = http + yapshr.link.domain + "/";

	// widget CSS links for (http) and (https) if required
	yapshr.link.css = "css/ypshr-shrtx-pp-widget-1.0.css";
	yapshr.link.css_https =  "css/ypshr-shrtx-pp-widget-1.0.css";

	// default user's avatar link
	yapshr.link.default_avatar = yapshr.link.site_url + "/storage/avatars/thumbs1/_noavatar_user.gif";

	// site logo's ---> for widget for small logo and large logo
	yapshr.link.logo = "imgs/ypshr-widget-logo.png";
	yapshr.link.logo_full ="imgs/ypshr-widget-logo-full.png";

/****************************** EDITABBLE AREA ******************************/

	var domainRegex = new RegExp( yapshr.link.domain );
	var domain = domainRegex.test( window.location.hostname ) ?
        (window.location.hostname + ":" + window.location.port) : yapshr.link.domain;

    var httpsImgRegex = /^.+\/thumbs1/;
    var httpsImgReplace = 'https://' + yapshr.link.site_url + 'i/avatars/thumbs1';

    var matchUrlScheme = function( url ) {
      return isHttps ? url.replace( httpsImgRegex, httpsImgReplace ) : url;
    }
    // cache object for searching duplicates
    var reClassNameCache = {};
    // reusable regex for searching classnames
    var getClassRegEx = function( c ) {
      // check to see if regular expression already exists
      var re = reClassNameCache[ c ];

      if ( !re ) {
        re = new RegExp( '(?:^|\\s+)' + c + '(?:\\s+|$)' );
        reClassNameCache[ c ] = re;
      }
      return re;
    };

    var getByClass = function( c, tag, root, apply ) {
      var tag = tag || '*';
      var root = root || document;

      var nodes = [],
          elements = root.getElementsByTagName( tag ),
          re = getClassRegEx( c );

      for ( var i = 0, len = elements.length; i < len; ++i ) {
        if (re.test( elements[i].className ) ) {
          nodes[nodes.length] = elements[i];

          if ( apply ) {
            apply.call( elements[i], elements[i] );
          }
        }
      }

      return nodes;
    };

    var browser = function() {
      var ua = navigator.userAgent;
      return {
        ie: ua.match(/MSIE\s([^;]*)/)
      };
    }();

    var byId = function( id ) {
      if ( typeof id == 'string' ) {
        return document.getElementById( id );
      }
      return id;
    };

    var trim = function( str ) {
      return str.replace(/^\s+|\s+$/g, '')
    };

    var getViewportHeight = function() {
      var height = self.innerHeight; // Safari, Opera
      var mode = document.compatMode;
      if ( ( mode || browser.ie ) ) { // IE, Gecko
        height = ( mode == 'CSS1Compat' ) ?
          document.documentElement.clientHeight : // Standards
          document.body.clientHeight; // Quirks
      }
      return height;
    };

    var getTarget = function( e, resolveTextNode ) {
      var target = e.target || e.srcElement;
      return resolveTextNode( target );
    };

    var resolveTextNode = function( el ) {
      try {
        if ( el && 3 == el.nodeType ) {
          return el.parentNode;
        } else {
          return el;
        }
      } catch ( ex ) { }
    };

    var getRelatedTarget = function( e ) {
      var target = e.relatedTarget;
      if ( !target ) {
        if ( e.type == 'mouseout' ) {
          target = e.toElement;
        } else if ( e.type == 'mouseover' ) {
          target = e.fromElement;
        }
      }
      return resolveTextNode( target );
    };

    var insertAfter = function( el, reference ) {
      reference.parentNode.insertBefore( el, reference.nextSibling );
    };

    var removeElement = function( el ) {
      try {
        el.parentNode.removeChild( el );
      }
      catch ( ex ) { }
    };

    var getFirst = function( el ) {
      return el.firstChild;
    };

    var withinElement = function( e ) {
      var parent = getRelatedTarget( e );
      while ( parent && parent != this ) {
        try {
          parent = parent.parentNode;
        }
        catch( ex ) {
          parent = this;
        }
      }
      if ( parent != this ) {
        return true;
      }
      return false;
    };

    var getStyle = function() {
      if ( document.defaultView && document.defaultView.getComputedStyle ) {
        return function( el, property ) {
          var value = null;
          var computed = document.defaultView.getComputedStyle( el, '' );
          if ( computed ) {
            value = computed[property];
          }
          var ret = el.style[property] || value;
          return ret;
        };
      }
      else if ( document.documentElement.currentStyle && browser.ie ) { // IE method
        return function( el, property ) {
          var value = el.currentStyle ? el.currentStyle[property] : null;
          return ( el.style[property] || value );
        };
      }
    }();

    /**
      * classes object
      * - has - add - remove
      */
    var classes = {
      has: function( el, c ) {
        return new RegExp("(^|\\s)" + c + "(\\s|$)").test( byId( el ).className );
      },
      add: function( el, c ) {
        if ( !this.has( el, c ) ) {
          byId( el ).className = trim( byId(el).className ) + ' ' + c;
        }
      },
      remove: function(el, c) {
        if ( this.has( el, c ) ) {
          byId( el ).className = byId( el ).className.replace( new RegExp("(^|\\s)" + c + "(\\s|$)", "g"), "" );
        }
      }
    };

    /**
      * basic x-browser event listener util
      * eg: events.add(element, 'click', fn);
      */
    var events = {
      add: function( el, type, fn ) {
        if ( el.addEventListener ) {
          el.addEventListener( type, fn, false );
        } else {
          el.attachEvent('on' + type, function() {
            fn.call( el, window.event );
          });
        }
      },
      remove: function( el, type, fn ) {
        if ( el.removeEventListener) {
          el.removeEventListener( type, fn, false );
        } else {
          el.detachEvent( 'on' + type, fn );
        }
      }
    };

    var hex_rgb = function() {
      function HexToR( h ) {
        return parseInt( ( h ).substring( 0,2 ),16 );
      }
      function HexToG( h ) {
        return parseInt( ( h ).substring( 2,4 ),16 );
      }
      function HexToB( h ) {
        return parseInt( ( h ).substring( 4,6 ),16 );
      }
      return function( hex ) {
        return [ HexToR( hex ), HexToG( hex ), HexToB( hex ) ];
      };
    }();

    /**
      * core type detection on javascript objects
      */
    var is = {
      bool: function( b ) {
        return typeof b === 'boolean';
      },
      def: function( o ) {
        return !(typeof o === 'undefined');
      },
      number: function( n ) {
        return typeof n === 'number' && isFinite(n);
      },
      string: function( s ) {
        return typeof s === 'string';
      },
      fn: function( f ) {
        return typeof f === 'function';
      },
      array: function( a ) {
        if ( a ) {
          return is.number( a.length ) && is.fn( a.splice );
        }
        return false;
      }
    };

    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    var absoluteTime = function( s ) {
      var d = new Date( s );
      if ( browser.ie ) {
        d = Date.parse( s.replace(/( \+)/, ' UTC$1' ) );
      }
      var ampm = '';
      var hour = function() {
        var h = d.getHours();
        if ( h > 0 && h < 13 ) {
          ampm = 'am';
          return h;
        } else if ( h < 1 ) {
          ampm = 'am';
          return 12;
        } else {
          ampm = 'pm';
          return h - 12;
        }
      }();
      var minutes = d.getMinutes();
      var seconds = d.getSeconds();
      function getRest() {
        var today = new Date();
        if ( today.getDate() != d.getDate() || today.getYear() != d.getYear() || today.getMonth() != d.getMonth() ) {
          return ' - ' + months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
        } else {
          return '';
        }
      }
      return hour + ':' + minutes + ampm + getRest();
    };

    /**
      * relative time calculator
      * @param {string} sharetronix date string returned from sharetronix API
      * @return {string} relative time like "2 minutes ago"
      */
    var timeAgo = function( dateString ) {
      var rightNow = new Date();
      var then = new Date( dateString );

      if ( browser.ie ) {
        // IE can't parse these crazy Ruby dates
        then = Date.parse( dateString.replace( /( \+)/, ' UTC$1' ) );
      }

      var diff = rightNow - then;

      var second = 1000,
          minute = second * 60,
          hour = minute * 60,
          day = hour * 24,
          week = day * 7;

      if ( isNaN( diff ) || diff < 0 ) {
        return ""; // return blank string if unknown
      }

      if ( diff < second * 2 ) {
        // within 2 seconds
        return "right now";
      }
      if ( diff < minute ) {
        return Math.floor( diff / second ) + " seconds ago";
      }
      if ( diff < minute * 2 ) {
        return "about 1 minute ago";
      }
      if ( diff < hour ) {
        return Math.floor( diff / minute ) + " minutes ago";
      }
      if ( diff < hour * 2 ) {
        return "about 1 hour ago";
      }
      if ( diff < day ) {
        return  Math.floor( diff / hour ) + " hours ago";
      }
      if ( diff > day && diff < day * 2 ) {
        return "yesterday";
      }
      if ( diff < day * 365 ) {
        return Math.floor( diff / day ) + " days ago";
      } else {
        return "over a year ago";
      }
    };

    /**
      * The postlinkahashifyer!
      * Eg:
      * procyk.clean('your post text');
      */
    var procyk = {
      link: function( post ) {
        return post.replace(/\b(((https*\:\/\/)|www\.)[^\"\']+?)(([!?,.\)]+)?(\s|$))/g, function( link, m1, m2, m3, m4 ) {
          var http = m2.match(/w/) ? 'http://' : '';
          return '<a class="ypshr-hyperlink" target="_blank" href="' + http + m1 + '">' + ( ( m1.length > 25 ) ? m1.substr( 0, 24 ) + '...' : m1) + '</a>' + m4;
        });
      },
      at: function( post ) {
        return post.replace(/\B[@@]([a-zA-Z0-9_]{1,20})/g, function( m, username ) {
          return '@<a target="_blank" class="ypshr-atreply" href="' + yapshr.link.site_url + username + '">' + username + '</a>';
        });
      },
      hash: function( post ) {
        return post.replace(/(^|\s+)#(\w+)/gi, function( m, before, hash ) {
          return before + '<a target="_blank" class="ypshr-hashtag" href="' + yapshr.link.site_url + hash + '">#' + hash + '</a>';
        });
      },
      clean: function( post ) {
        return this.hash( this.at( this.link( post) ) );
      }
    };

    /**
      * @constructor the classic sharetronix occasional job
      * @param {Function} job The job to execute upon each request
      * @param {Function} decay The deciding boolean method on whether to decay
      * @param {Int} interval The number in milliseconds to wait before executing
      */
    function Occasionally( job, decayFn, interval ) {
      this.job = job;
      this.decayFn = decayFn;
      this.interval = interval;
      this.decayRate = 1;
      this.decayMultiplier = 1.25;
      this.maxDecayTime = 3 * 60 * 1000; // 3 minutes
    }

    Occasionally.prototype = {
      /**
        * @public
        * @return self
        * starts our occasional job
        */
      start: function() {
        this.stop().run();
        return this;
      },
      /**
        * @public
        * @return self
        * stops the occasional job
        */
      stop: function() {
        if ( this.worker ) {
          window.clearTimeout( this.worker );
        }
        return this;
      },
      /**
        * @private
        */
      run: function() {
        var that = this;
        this.job(function() {
          // running our decayer callback
          that.decayRate = that.decayFn() ? Math.max( 1, that.decayRate / that.decayMultiplier )
                                          : that.decayRate * that.decayMultiplier;

          var expire = that.interval * that.decayRate;
          expire = ( expire >= that.maxDecayTime ) ? that.maxDecayTime : expire;
          expire = Math.floor( expire );

          that.worker = window.setTimeout(
            function () {
              that.run.call( that );
            },
            expire
          );
        });
      },
      /**
        * @public
        * @return self
        * stops occasional job and resets object
        */
      destroy: function() {
        this.stop();
        this.decayRate = 1;
        return this;
      }
    };
    /**
      * @Constructor runs a timer on an array passing back
      *              the next needle on each interval
      * @param haystack {Array}
      * @param time {Int} time in ms
      * @param loop {Bool} does this continue forever?
      * @param callback {Function} method that is passed back a needle for each interval
      */
    function IntervalJob( time, loop, callback ) {
      this.time = time || 6000;
      this.loop = loop || false;
      this.repeated = 0;
      this.callback = callback;
      this.haystack = [];
    };

    IntervalJob.prototype = {
      set: function( haystack ) {
        this.haystack = haystack;
      },
      add: function( needle ) {
        this.haystack.unshift( needle );
      },
      /**
        * @public
        * @return self
        * begins the interval job
        */
      start: function() {
        if ( this.timer ) {
          return this;
        }
        this._job();
        var that = this;
        this.timer = setInterval(
          function() {
            that._job.call(that);
          }, this.time
        );
        return this;
      },
      /**
        * @public
        * @return self
        * stops the interval
        */
      stop: function() {
        if ( this.timer ) {
          window.clearInterval( this.timer );
          this.timer = null;
        }
        return this;
      },
      /**
        * @private
        */
      _next: function() {
        var old = this.haystack.shift();
        if (old && this.loop ) {
          this.haystack.push( old );
        }
        return old || null;
      },
      /**
        * @private
        */
      _job: function() {
        var next = this._next();
        if ( next ) {
          this.callback( next );
        }
        return this;
      }
    };

    function Post( post ) {
      function showPopular() {
        if ( post.needle.metadata && post.needle.metadata.result_type && post.needle.metadata.result_type == 'popular' ) {
          return '<span class="ypshr-popular">' + post.needle.metadata.recent_reposts + '+ recent reposts</span>';
        } else {
          return '';
        }
      }

      var html = '<div class="ypshr-post-wrap"> \
        <div class="ypshr-avatar"> \
          <div class="ypshr-img"><a target="_blank" href="' + yapshr.link.site_url + post.user + '"><img alt="' + post.user + ' profile" src="' + matchUrlScheme( post.avatar ) + '"></a></div> \
        </div> \
        <div class="ypshr-post-text"> \
          <p> \
            <a target="_blank" href="' + yapshr.link.site_url + post.user + '" class="ypshr-user">' + post.user + '</a> ' + post.post + ' \
            <em>\
            <a target="_blank" class="ypshr-timestamp" time="' + post.timestamp + '" href="' + yapshr.link.site_url + post.id + '">' + post.created_at + '</a> &middot;\
            <a target="_blank" class="ypshr-reply" href="' + yapshr.link.site_url + post.id + '#comments' + '">comment</a> \
            </em> ' + showPopular() + ' \
          </p> \
        </div> \
      </div>';

      var div = document.createElement('div' );

      div.id = 'post-id-' + ++Post._postCount;
      div.className = 'ypshr-post';
      div.innerHTML = html;
      this.element = div;
    };

    // static count so all posts (even on multiple inst widgets) will have unique ids
    Post._postCount = 0;

    yapshr.loadStyleSheet = function( url, widgetEl ) {
      if ( !YPSHR.Widget.loadingStyleSheet ) {
        YPSHR.Widget.loadingStyleSheet = true;
        var linkElm = document.createElement( 'link' );
        linkElm.href = url;
        linkElm.rel = 'stylesheet';
        linkElm.type = 'text/css';
        document.getElementsByTagName( 'head' )[0].appendChild( linkElm );
        var timer = setInterval(function() {
          var style = getStyle( widgetEl, 'position' );
          if ( style = 'relative' ) {
            clearInterval( timer );
            timer = null;
            YPSHR.Widget.hasLoadedStyleSheet = true;
          }
        }, 50);
      }
    };

    (function() {
      var isLoaded = false;
      yapshr.css = function( rules ) {
        var styleElement = document.createElement( 'style' );
        styleElement.type = 'text/css';
        if ( browser.ie ) {
          styleElement.styleSheet.cssText = rules;
        } else {
          var frag = document.createDocumentFragment();
          frag.appendChild( document.createTextNode( rules ) );
          styleElement.appendChild( frag );
        }
        function append() {
          document.getElementsByTagName( 'head' )[0].appendChild( styleElement );
        }

        // oh IE we love you.
        // this is needed because you can't modify document body when page is loading
        if ( !browser.ie || isLoaded ) {
          append();
        } else {
          window.attachEvent( 'onload', function() {
            isLoaded = true;
            append();
          });
        }
      };
    })();

	// Widget version
    YPSHR.Widget.version = "1.0";

    YPSHR.Widget.isLoaded = false;
    YPSHR.Widget.loadingStyleSheet = false;
    YPSHR.Widget.hasLoadedStyleSheet = false;
    YPSHR.Widget.WIDGET_NUMBER = 0;
    YPSHR.Widget.matches = {
      mentions: /^@[a-zA-Z0-9_]{1,20}\b/,
      any_mentions: /\b@[a-zA-Z0-9_]{1,20}\b/
    };

    YPSHR.Widget.jsonP = function( url, callback ) {
      var script = document.createElement( 'script' );
      var head = document.getElementsByTagName( 'head' )[0];
      script.type = 'text/javascript';
      script.src = url;
      head.insertBefore( script, head.firstChild )
      callback( script );
      return script;
    };

    YPSHR.Widget.prototype = function() {

      var base = http + domain + '/1/statuses/public_timeline.';
      var profileBase = http + domain + '/1/statuses/user_timeline/';

      var occasionalInterval = 25000; // 25 seconds
      var defaultAvatar = yapshr.link.default_avatar;

      return {
        init: function( opts ) {
          var that = this;
          // first, define public callback for this widget
          this._widgetNumber = ++YPSHR.Widget.WIDGET_NUMBER;
          window['YPSHR_Widget_receiveCallback_' + this._widgetNumber] = function(resp) {
            that._prePlay.call( that, resp );
          };
          this._cb = 'YPSHR_Widget_receiveCallback_' + this._widgetNumber;
          this.opts = opts;
          this._base = base;
          this._isRunning = false;
          this._hasOfficiallyStarted = false;
          this._hasNewSearchResults = false;
          this._rendered = false;
          this._profileImage = false;

          this._setWidgetType(opts.type);

          this.timesRequested = 0;
          this.runOnce = false;
          this.newResults = false;
          this.results = [];
          this.jsonMaxRequestTimeOut = 19000;
          this.showedResults = [];
          this.sinceId = 1;
          this.source = 'YAPSHR_SHRTX_WIDGET';
          this.id = opts.id || 'ypshr-widget-' + this._widgetNumber;

          this.posts = 0;
          this.setDimensions( opts.width, opts.height );
          this.interval = opts.interval || 6000;
          this.format = 'json';
          this.rpp = opts.rpp || 50;
          this.subject = opts.subject || '';
          this.title = opts.title || '';
          this.setFooterText( opts.footer );

          this.setURL();
          this.theme = opts.theme ? opts.theme : this._getDefaultTheme();

          if ( !opts.id ) {
            document.write( '<div class="ypshr-widget" id="' + this.id + '"></div>' );
          }
          this.widgetEl = byId( this.id );
          if ( opts.id ) {
            classes.add( this.widgetEl, 'ypshr-widget' );
          }

          if ( opts.version >= 1 && !YPSHR.Widget.hasLoadedStyleSheet ) {
            if ( isHttps ) {
              yapshr.loadStyleSheet( yapshr.link.css_https, this.widgetEl );
            } else {
               yapshr.loadStyleSheet( yapshr.link.css, this.widgetEl );
            }
          }

          this.occasionalJob = new Occasionally(
            function( decay ) {
              that.decay = decay;
              that._getResults.call( that );
            },

            function() {
              return that._decayDecider.call( that );
            },

            occasionalInterval
          );

          this._ready = is.fn( opts.ready ) ? opts.ready : function() { };

          // preset features
          this._isRelativeTime = true;
          this._postFilter = false;
          this._avatars = true;
          this._isFullScreen = false;
          this._isLive = true;
          this._isScroll = false;
          this._loop = true;
          this._showTopPosts = ( this._isSearchWidget ) ? true : false;
          this._behavior = 'default';
          this.setFeatures( this.opts.features );

          this.intervalJob = new IntervalJob( this.interval, this._loop, function( post ) {
            that._normalizePost( post );
          });

          return this;
        },
        /**
          * @public
          * @param {Int} w - width for widget
          * @param {Int} h - height for widget
          * @return self
          */
        setDimensions: function( w, h ) {
          this.wh = (w && h) ? [w, h] : [250, 300]; // default w/h if none provided
          if ( w == 'auto' || w == '100%' ) {
            this.wh[0] = '100%';
          } else {
            this.wh[0] = ((this.wh[0] < 150) ? 150 : this.wh[0]) + 'px'; // min width is 150
          }
          this.wh[1] = ((this.wh[1] < 100) ? 100 : this.wh[1]) + 'px'; // min height is 100
          return this;
        },

        setRpp: function( rpp ) {
          var rpp = parseInt( rpp );
          this.rpp = (is.number( rpp ) && ( rpp > 0 && rpp <= 100 ) ) ? rpp : 30;
          return this;
        },

        /**
          * @private
          * @param {String} type the kind of widget you're instantiating
          * @return self
          */
        _setWidgetType: function( type ) {
          this._isProfileWidget = false,
          this._isPublicWidget = false;
          switch( type.toLowerCase() ) {
            case 'public':
              this._isPublicWidget = true;
			  this.opts.type = 'Public';
              break;
            case "profile":
              this._isProfileWidget = true;
			  this.opts.type = 'Profile';
              break;
          };
          return this;
        },
        /**
          * @public
          * @param {object}
          * @return self

          * allows implementer to set features which include:
          * - avatars {bool}
          * - timestamp {bool}
          * - hashtags {bool}
          * setting any of the previous properties will appropriately hide/show that feature
          * @example
          * WidgetInstance.setFeatures({ fullscreen: true, avatars: true, timestamp: false, hashtags: false }).render().start();
          * @return self
          */
        setFeatures: function( features ) {

          if ( features ) {
            if ( is.def( features.filters ) ) {
              this._postFilter = features.filters;
            }
            if (is.def( features.dateformat ) ) {
              this._isRelativeTime = !!( features.dateformat !== 'absolute')
            }

            if (is.def( features.fullscreen ) && is.bool( features.fullscreen ) ) {
              if ( features.fullscreen ) {
                this._isFullScreen = true;
                this.wh[0] = '100%';
                this.wh[1] = (getViewportHeight() - 90) + 'px';
                var that = this;
                events.add( window, 'resize', function( e ) {
                  that.wh[1] = getViewportHeight();
                  that._fullScreenResize();
                });
              }
            }

            if ( is.def( features.loop ) && is.bool( features.loop ) ) {
              this._loop = features.loop;
            }

            if ( is.def( features.behavior ) && is.string( features.behavior ) ) {
              switch ( features.behavior ) {
                case 'all':
                  this._behavior = 'all';
                  break;
                case 'preloaded':
                  this._behavior = 'preloaded';
                  break;
                default:
                  this._behavior = 'default';
                  break;
              };
            }

            if ( is.def( features.topPosts ) && is.bool( features.topPosts ) ) {
              this._showTopPosts = features.topPosts;
              var showTopPost = (this._showTopPosts) ? 'inline-block' : 'none';
              yapshr.css('#' + this.id + ' .ypshr-popular { display: ' + showTopPost + '; }');
            }

            if ( !is.def( features.topPosts ) ) {
              this._showToPposts = true;
              var showTopPost = ( this._showTopPosts ) ? 'inline-block' : 'none';
              yapshr.css('#' + this.id + ' .ypshr-popular { display: ' + showTopPost + '; }');
            }

            if ( is.def( features.avatars ) && is.bool( features.avatars ) ) {

              if ( !features.avatars ) {
                yapshr.css('#' + this.id + ' .ypshr-avatar, #' + this.id + ' .ypshr-user { display: none; } ' +
                '#' + this.id + ' .ypshr-post-text { margin-left: 0; }');
                this._avatars = false;
              } else {
                var margin = ( this._isFullScreen ) ? '90px' : '40px';
                yapshr.css( '#' + this.id + ' .ypshr-avatar { display: block; } #' + this.id + ' .ypshr-user { display: inline; } ' +
                '#' + this.id + ' .ypshr-post-text { margin-left: ' + margin + '; }' );
                this._avatars = true;
              }

            } else {
              if ( this._isProfileWidget ) {
                this.setFeatures( { avatars: false } );
                this._avatars = false;
              } else {
                this.setFeatures( { avatars: true } );
                this._avatars = true;
              }
            }

            if ( is.def( features.hashtags ) && is.bool( features.hashtags ) ) {
              ( !features.hashtags ) ?
                  yapshr.css( '#' + this.id + ' a.ypshr-hashtag { display: none; }' ) : '';
            }

            if ( is.def( features.timestamp ) && is.bool( features.timestamp ) ) {
              var display = features.timestamp ? 'block' : 'none';
              yapshr.css( '#' + this.id + ' em { display: ' + display + '; }' );
            }

            if ( is.def( features.live ) && is.bool( features.live ) ) {
              this._isLive = features.live;
            }
            if ( is.def( features.scrollbar ) && is.bool( features.scrollbar ) ) {
              this._isScroll = features.scrollbar;
            }
          } else {
            if ( this._isProfileWidget ) {
              this.setFeatures( { avatars: false } );
              this._avatars = false;
            }
            if ( this._isProfileWidget ) {
              this.setFeatures( { behavior: 'all' } );
            }
          }
          return this;
        },
        /**
          * @private
          * @param e Event listener for window resizing
          */
        _fullScreenResize: function() {
          var timeline = getByClass( 'ypshr-timeline', 'div', document.body, function( el ) {
            el.style.height = ( getViewportHeight() - 90 ) + 'px';
          });
        },
        /**
          * @public facade
          * @param {int} in seconds
          * convenience method for setting time between each post render
          * @return self
          */
        setpostInterval: function( interval ) {
          this.interval = interval;
          return this;
        },
        /**
          * @public
          * @param {string} url
          * sets a url base for the JSONP call
          * useful for future API implementations or moderation platforms
          * @return self
          */
        setBase: function( b ) {
          this._base = b;
          return this;
        },

        /**
          * @public
          * @param {string} username
          * used to distinguish between widget
          * @return self
          */
        setUser: function(username, opt_realname) {
          this.username = username;
          this.realname = opt_realname || ' ';
          if (this._isProfileWidget) {
            this.setBase(profileBase + username + '.' + this.format);
          }
          this.setURL();
          return this;
        },

        /**
          * @public
          * @param {string}
          * sets the profile image source to display in the widget
          * @return self
          */
        setProfileImage: function(url) {
          this._profileImage = url;
          this.byClass('ypshr-profile-img', 'img').src = matchUrlScheme(url);
          this.byClass('ypshr-profile-img-anchor', 'a').href = yapshr.link.site_url + this.username;
          return this;
        },

        /**
          * @public
          * @param {string}
          * sets the main title to display at top of widget
          * @return self
          */
        setTitle: function(title) {
          this.title = title;
          this.widgetEl.getElementsByTagName('h3')[0].innerHTML = this.title;
          return this;
        },

        /**
          * @public
          * @param {string}
          * sets the main caption to display at top of widget (below title)
          * @return self
          */
        setCaption: function(subject) {
          this.subject = subject;
          this.widgetEl.getElementsByTagName('h4')[0].innerHTML = this.subject;
          return this;
        },

        /**
          * @public
          * @param {string}
          * sets the footer text
          * @return self
          */
        setFooterText: function(s) {
          this.footerText = (is.def(s) && is.string(s)) ? s : 'Join the conversation';
          if (this._rendered) {
            this.byClass('ypshr-join-conv', 'a').innerHTML = this.footerText;
          }
          return this;
        },

        /**
          * @public
          * @return self
          * does double time. and sets the appropriate hyper
          * reference on bottom anchor if widget has been rendered
          */
        setURL: function() {
          this._setUrl();
          if (this._rendered) {
            var anchor = this.byClass('ypshr-join-conv', 'a');
            anchor.href = yapshr.link.site_url + this._getWidgetPath();
          }
          return this;
        },

        _getWidgetPath: function() {
          if (this._isProfileWidget) {
            return this.username;
          }
          else {
            return 'members';
          }
        },

        /**
          * @private
          * @return self
          * creates the proper URL to request data via JSONP
          */
        _setUrl: function() {
          var that = this;

          function cacheBust() {
            // chrome i hate your caching
            return '&' + (+new Date) + '=cachebust';
          }

          function showSince() {
            return (that.sinceId == 1) ? '' : '&since_id=' + that.sinceId + '&refresh=true';
          }

          if (this._isProfileWidget) {
            this.url = this._base + '?callback=' + this._cb +
                       '&include_rts=true' +
                       '&count=' + this.rpp + showSince() + '&clientsource=' + this.source + '&suppress_response_codes';
          } else {
            this.url = this._base + this.format +
                       '?callback=' + this._cb +
                       '&include_rts=true' +
                       '&count=' + this.rpp + showSince() + '&clientsource=' + this.source + '&suppress_response_codes';
          }
          this.url += cacheBust();
          return this;
        },

        /**
          * @private
          */
        _getRGB: function(hex) {
          return hex_rgb( hex.substring( 1, 7 ) );
        },

        /**
          * @public
          * @param {object}
          * @param {boolean} important whether to be important style
          * @return self
          * allows implementer to set their own theme.
          * theme object can be passed into contructor, or set here.
          * defaults to default theme properties when not set
          */
        setTheme: function( o ) {
          var that = this;
          var imp = ' !important';

          this.theme = {
            shell: {
              background: function() {
                return o.shell.background || that._getDefaultTheme().shell.background;
              }(),

              color: function() {
                return o.shell.color || that._getDefaultTheme().shell.color;
              }(),

              border_color: function() {
                return o.shell.border_color || that._getDefaultTheme().shell.border_color;
              }(),

              border_size: function() {
                return o.shell.border_size || that._getDefaultTheme().shell.border_size;
              }()
            },

            posts: {
              background: function() {
                return o.posts.background || that._getDefaultTheme().posts.background;
              }(),

              color: function() {
                return o.posts.color || that._getDefaultTheme().posts.color;
              }(),

              border_color: function() {
                return o.posts.border_color || that._getDefaultTheme().posts.border_color;
              }(),

              border_size: function() {
                return o.posts.border_size || that._getDefaultTheme().posts.border_size;
              }(),

              links: function() {
                return o.posts.links || that._getDefaultTheme().posts.links;
              }()
            }
          };

          var style = '#' + this.id + ' .ypshr-doc, \
                     #' + this.id + ' .ypshr-hd a, \
                     #' + this.id + ' h3, \
                     #' + this.id + ' h4, \
                     #' + this.id + ' .ypshr-popular {\
            background-color: ' + this.theme.shell.background + imp + ';\
            color: ' + this.theme.shell.color + imp + ';\
          }\
          #' + this.id + ' .ypshr-doc {\
            border: ' + this.theme.shell.border_size + ' solid ' + this.theme.shell.border_color + imp + ';\
          }\
          #' + this.id + ' .ypshr-popular {\
            color: ' + this.theme.posts.color + imp + ';\
            background-color: rgba(' + this._getRGB(this.theme.shell.background) + ', .3)' + imp + ';\
          }\
          #' + this.id + ' .ypshr-post a {\
            color: ' + this.theme.posts.links + imp + ';\
          }\
          #' + this.id + ' .ypshr-bd, #' + this.id + ' .ypshr-timeline i a, \
          #' + this.id + ' .ypshr-bd p {\
            color: ' + this.theme.posts.color + imp + ';\
          }\
          #' + this.id + ' .ypshr-new-results, \
          #' + this.id + ' .ypshr-results-inner, \
          #' + this.id + ' .ypshr-timeline {\
            background: ' + this.theme.posts.background + imp + ';\
            border: ' + this.theme.posts.border_size + ' solid ' + this.theme.posts.border_color + imp + ';\
          }';

          if (browser.ie) {
            style += '#' + this.id + ' .ypshr-post { background: ' + this.theme.posts.background + imp + '; }';
          }

          yapshr.css(style);
          return this;
        },

        /**
          * @public
          * @param {string} classname
          * @param {string} tagname
          * @param optional {bool} whether to return collection or defaults to first match
          * @return HTML Element || Array HTML Elements
          * helper to get elements by classname based on the widget being the context
          */
        byClass: function(c, tag, opt_all) {
          var collection = getByClass(c, tag, byId(this.id));
          return (opt_all) ? collection : collection[0];
        },

        /**
          * @public
          * @return self
          * renders the widget onto an HTML page
          */
        render: function() {
          var that = this;

          if ( !YPSHR.Widget.hasLoadedStyleSheet ) {
            window.setTimeout(function() {
              that.render.call( that );
            }, 50);
            return this;
          }

          this.setTheme( this.theme );

          if ( this._isProfileWidget ) {
            classes.add( this.widgetEl, 'ypshr-widget-profile' );
          }

          if ( this._isScroll ) {
            classes.add( this.widgetEl, 'ypshr-scroll' )
          }
          if ( !this._isLive && !this._isScroll ) {
            this.wh[1] = 'auto';
          }

          this.widgetEl.innerHTML = this._getWidgetHtml();
          this._renderAboutInfo();

          var timeline = this.byClass('ypshr-timeline', 'div');
          var btnAbt = this.byClass('ypshr-abt-btn', 'div');
          var btnAbtClose = this.byClass('ypshr-abt-close-btn', 'div');

          if (this._isLive && !this._isFullScreen) {
            var over = function(e) {
              if (that._behavior === 'all') {
                return;
              }
              if (withinElement.call(this, e)) {
                that.pause.call(that);
              }
            };
            var out = function(e) {
              if (that._behavior === 'all') {
                return;
              }
              if (withinElement.call(this, e)) {
                that.resume.call(that);
              }
            };

			var showAbtBox = function() {
				var oOverlayBox = that.byClass('ypshr-overlay-abt', 'div');
				var oAbtInfoBox = that.byClass('ypshr-abt-info', 'div');
				oOverlayBox.style.display='block';
				oAbtInfoBox.style.display='block';
				new Animate(oAbtInfoBox, 'opacity', {
							from: 0,
							to: 0.8,
							time: 500,
				}).start();
				window.setTimeout(function() {
    	          	hideAbtBox();
	            }, 10000);
			};

			var hideAbtBox = function() {
				var oOverlayBox = that.byClass('ypshr-overlay-abt', 'div');
				var oAbtInfoBox = that.byClass('ypshr-abt-info', 'div');
				oOverlayBox.style.display='none';
				oAbtInfoBox.style.display='none';
			};

            this.removeEvents = function() {
              events.remove(timeline, 'mouseover', over);
              events.remove(timeline, 'mouseout', out);

              events.remove(btnAbt, 'click', showAbtBox);
              events.remove(btnAbtClose, 'click', hideAbtBox);
            };

            events.add(timeline, 'mouseover', over);
            events.add(timeline, 'mouseout', out);

            events.add(btnAbt, 'click', showAbtBox);
            events.add(btnAbtClose, 'click', hideAbtBox);
          }
          this._rendered = true;
          // call the ready handler
          this._ready();
          return this;
        },

       /**
          * @public
          * @return self
          * renders the widget onto an HTML page
          */
        _renderAboutInfo: function() {
          var oOverlay = document.createElement( 'div' );
          oOverlay.className = 'ypshr-overlay-abt';
		  oOverlay.style.position = 'absolute';
		  oOverlay.style.display = 'none';
		  oOverlay.style.top = '0%'
		  oOverlay.style.left = '0%';
		  oOverlay.style.width = '100%';
		  oOverlay.style.height = '100%';
		  oOverlay.style.zIndex = 100;
		  var parent = this.byClass('ypshr-doc', 'div');
		  parent.insertBefore( oOverlay, parent.firstChild );

          var oInfo = document.createElement( 'div');
          oInfo.className = 'ypshr-abt-info';
		  oInfo.style.display = 'block';
		  oInfo.style.position = 'absolute';
		  oInfo.style.display = 'none';
		  oInfo.style.zIndex = 200;
		  oInfo.style.width = '70%';
		  oInfo.style.height = '40%';

		  oInfo.style.top = ( this.opts.height - ( ( this.opts.height / 100 ) * parseInt( oInfo.style.height ) ) ) / 2 + 'px';
		  oInfo.style.left = ( this.opts.width - ( ( this.opts.width / 90 ) * parseInt( oInfo.style.width ) ) ) / 2 + 'px';

		  var ypshr_abt_img ='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';

          var logo = yapshr.link.logo;

          if ( this._isFullScreen ) {
            logo = yapshr.link.logo_full;
          }

		  oInfo.innerHTML='<div class="ypshr-abt-close-btn"><b>x</b>\
		  </div><img alt="" src="' + logo + '"><br/>' + this.opts.type + ' Widget ' + YPSHR.Widget.version + '<br/><br/>\
		  <div class="ypshr-credit-list"><b>author:</b><br/>Stanley Ilukhor (stannesi)</div><br/>\
		  <b><div class="ypshr-powrdby">Powered by <br></b>' + '<img src="data:image/png;base64,' + ypshr_abt_img + '"/></div>';

		  parent.insertBefore( oInfo, parent.firstChild );
		},

        /**
          * empty placeholder for removing events
          * on live widgets
          */
        removeEvents: function() { },

        /**
          * @private
          * @return {object} theme
          */
        _getDefaultTheme: function() {
          return {
            shell: {
              background: '#0055a4',
              color: '#ffffff',
              border_color: '#003366',
              border_size: '2px'
            },

            posts: {
              background: '#ecf5ff',
              color: '#444444',
              links: '#1985b5',
              border_color: '#accae5',
              border_size: '2px'
            }
          };
        },

        /**
          * @private
          * @return {string}
          * builds an HTML string that represents the widget chrome
          */
        _getWidgetHtml: function() {
          var that = this;

          function getHeader() {
            if (that._isProfileWidget) {
              return '<a target="_blank" href="' + yapshr.link.site_url + '" class="ypshr-profile-img-anchor"><img alt="profile" class="ypshr-profile-img" src="' + defaultAvatar + '"></a>\
                      <h3></h3>\
                      <h4></h4>';
            } else {
              return '<h3>' + that.title + '</h3><h4>' + that.subject + '</h4>';
            }
          }

          function isFull() {
            return that._isFullScreen ? ' ypshr-fullscreen' : '';
          }

          var logo = yapshr.link.logo;

          if (this._isFullScreen) {
            logo = yapshr.link.logo_full;
          }

          var html = '<div class="ypshr-doc' + isFull() + '" style="width: ' + this.wh[0] + ';">\
            <div class="ypshr-hd"><div class="ypshr-abt-btn"><b>?<b></div>' + getHeader() + ' \
            </div>\
            <div class="ypshr-bd">\
              <div class="ypshr-timeline" style="height: ' + this.wh[1] + ';">\
                <div class="ypshr-posts">\
                  <div class="ypshr-reference-post"></div>\
                  <!-- posts show here -->\
                </div>\
              </div>\
            </div>\
            <div class="ypshr-ft">\
              <div><a target="_blank" href="' + yapshr.link.site_url + '"><img alt="" src="' + logo + '"></a>\
                <span><a target="_blank" class="ypshr-join-conv" style="color:' + this.theme.shell.color + '" href="' + yapshr.link.site_url + this._getWidgetPath() + '">' + this.footerText + '</a></span>\
              </div>\
            </div>\
          </div>';

          return html;
        },

        /**
          * @private
          * @return self
          * puts the post in the dom
          */
        _appendPost: function(el) {
          this._insertNewResultsNumber();
          insertAfter(el, this.byClass('ypshr-reference-post', 'div'));
          return this;
        },

        /**
          * @private
          * @return self
          * slides in a rendered post
          */
        _slide: function(el) {
          var that = this;
          var height = getFirst(el).offsetHeight;
          if (this.runOnce) {
            new Animate(el, 'height', {
              from: 0,
              to: height,
              time: 500,
              callback: function() {
                that._fade.call(that, el);
              }
            }).start();
          }
          return this;
        },

        /**
          * @private
          * @return self
          * fades in a rendered post
          */
        _fade: function(el) {
          var that = this;

          if (Animate.canTransition) {
            el.style.webkitTransition = 'opacity 0.5s ease-out';
            el.style.opacity = 1;
            return this;
          }
          new Animate(el, 'opacity', {
            from: 0,
            to: 1,
            time: 500
          }).start();
          return this;
        },

        /**
          * @private
          * @return self
          * removes the last post if it is offscreen
          */
        _chop: function() {
          if (this._isScroll) {
            return this;
          }
          var posts = this.byClass('ypshr-post', 'div', true);
          var resultUpdates = this.byClass('ypshr-new-results', 'div', true);
          if (posts.length) {
            for (var i=posts.length - 1; i >=0; i--) {
              var post = posts[i];
              var top = parseInt(post.offsetTop);
              if (top > parseInt(this.wh[1])) {
                removeElement(post);
              } else {
                break;
              }
            }


            if (resultUpdates.length > 0) {
              var result = resultUpdates[resultUpdates.length - 1];
              var resultTop = parseInt(result.offsetTop);
              if (resultTop > parseInt(this.wh[1])) {
                removeElement(result);
              }
            }
          }

          return this;
        },

        /**
          * @private
          * @return self
          * Big Facade for chop, append, slide, and fade
          */
        _appendSlideFade: function( opt_element ) {
          var el = opt_element || this.post.element;
          this
            ._chop()
            ._appendPost( el )
            ._slide( el );
          return this;
        },

        /**
          * @private
          * @return self
          * generates the HTML for a single post item
          */
        _createPost: function(o) {
          o.timestamp = o.created_at;
          o.created_at = this._isRelativeTime ? timeAgo(o.created_at) : absoluteTime(o.created_at);
          this.post = new Post(o);
          if (this._isLive && this.runOnce) {
            this.post.element.style.opacity = 0;
            this.post.element.style.filter = 'alpha(opacity:0)';
            this.post.element.style.height = '0';
          }
          return this;
        },

        /**
          * @private
          * @param {Function} callback function that receives the results
          * makes a jsonP call to sharetronix.com or domain
          */
        _getResults: function() {
          var that = this;

          this.timesRequested++;
          this.jsonRequestRunning = true;

          this.jsonRequestTimer = window.setTimeout(function() {

            if (that.jsonRequestRunning) {
              clearTimeout( that.jsonRequestTimer );
              that.jsonRequestTimer = null;
            }

            that.jsonRequestRunning = false;
            removeElement( that.scriptElement );
            that.newResults = false;
            that.decay();
          }, this.jsonMaxRequestTimeOut );
          YPSHR.Widget.jsonP(that.url, function( script ) {
            that.scriptElement = script;
          });
        },

        /**
          * @public
          * @return self
          * clears out the post space. used internally,
          * but free to use publicly
          */
        clear: function() {
          var posts = this.byClass( 'ypshr-post', 'div', true );
          var results = this.byClass( 'ypshr-new-results', 'div', true );
          posts = posts.concat( results );
          each(posts, function( el ) {
            removeElement( el );
          });

          return this;
        },

        _sortByMagic: function(results) {
          var that = this;
          if (this._postFilter) {
            if (this._postFilter.negatives) {
              results = results.filter(function(el) {
                if (!that._postFilter.negatives.test(el.text)) {
                  return el;
                }
              });
            }
            if (this._postFilter.positives) {
              results = results.filter(function(el) {
                if (that._postFilter.positives.test(el.text)) {
                  return el;
                }
              });
            }
          }
          switch (this._behavior) {
            case 'all':
              this._sortByLatest(results);
              break;
            case 'preloaded':
            default:
              this._sortByDefault(results);
              break;
          };

          if (this._isLive && this._behavior !== 'all') {
            this.intervalJob.set(this.results);
            this.intervalJob.start();
          }

          return this;
        },

        /**
          * @private
          * @return results
          * puts the topPosts for search widget at the top
          */
        _loadTopPostsAtTop: function( results ) {
          var regular = [],
              popular = [],
              arr = [];
          // top posts
          each( results, function( el ) {
            if ( el.metadata && el.metadata.result_type && el.metadata.result_type == 'popular' ) {
              popular.push( el );
            } else {
              regular.push( el );
            }
          });
          var result = popular.concat( regular );
          return result;
        },

        _sortByLatest: function(results) {
          this.results = results;
          this.results = this.results.slice(0, this.rpp);
          this.results = this._loadTopPostsAtTop(this.results);
          this.results.reverse();
          return this;
        },

        /**
          * @private
          * @return self
          * default sorting method which tracks views and loops
          */
        _sortByDefault: function(results) {
          var that = this;

          var getDater = function(dateString) {
            return new Date(dateString).getTime();
          };

          // merge new results with old
          this.results.unshift.apply(this.results, results);

          each(this.results, function(el) {
            if (!el.views) {
              el.views = 0;
            }
          });

          // sort by date
          this.results.sort(function(a, b) {
            if (getDater(a.created_at) > getDater(b.created_at)) {
              return -1;
            }
            else if (getDater(a.created_at) < getDater(b.created_at)) {
              return 1;
            }
            else {
              return 0;
            }
          });

          // now cut off the oldest
          this.results = this.results.slice(0, this.rpp);

          this.results = this._loadTopPostsAtTop(this.results);
          var foo = this.results;

          // now sort by views
          this.results = this.results.sort(function(a, b) {
            if (a.views < b.views) {
              return -1;
            }
            else if (a.views > b.views) {
              return 1;
            }
            return 0;
          });

          if (!this._isLive) {
            this.results.reverse();
          }

        },

        /**
          * @private
          * @method prePlay does a pre-check against last result.
          * @param resp the JSON response from sharetronix JsonP API
          */
        _prePlay: function(resp) {
          if (this.jsonRequestTimer) {
            clearTimeout(this.jsonRequestTimer);
            this.jsonRequestTimer = null;
          }

          if (!browser.ie) {
            removeElement(this.scriptElement);
          }

          if (resp.error) {
            this.newResults = false;
          } else if (resp.results && resp.results.length > 0) {
            this.response = resp;

            this.newResults = true;
            this.sinceId = resp.max_id_str;

            this._sortByMagic(resp.results);
            if (this.isRunning()) {
              this._play();
            }
          } else if ((this._isProfileWidget || this._isPublicWidget) && is.array(resp) && resp.length) {

            this.newResults = true;

            if (!this._profileImage && this._isProfileWidget) {
              var name = resp[0].user.screen_name;
              this.setProfileImage(resp[0].user.profile_image_url);
              this.setTitle(resp[0].user.name);
              this.setCaption('<a target="_blank" href="http://yookos.com/' + name + '">' + name + '</a>');
            }

            this.sinceId = resp[0].id_str;

            this._sortByMagic(resp);

            if (this.isRunning()) {
              this._play();
            }
          } else {
            this.newResults = false;
          }

          this._setUrl();
          if (this._isLive) {
            this.decay();
          }

        },

        /**
          * @private
          * gets the ball rolling with a new widget
          * and resets the interval job
          */
        _play: function() {
          var that = this;
          if (this.runOnce) {
            this._hasNewSearchResults = true;
          }

          if (this._avatars) {
            this._preloadImages(this.results);
          }
          if (this._isRelativeTime && (this._behavior == 'all' || this._behavior == 'preloaded')) {
            each(this.byClass('ypshr-timestamp', 'a', true), function(el) {
              el.innerHTML = timeAgo(el.getAttribute('time'));
            });
          }
          if (!this._isLive || this._behavior == 'all' || this._behavior == 'preloaded') {
            each(this.results, function(needle) {
              if (needle.reposted_status) {
                needle = needle.reposted_status;
              }

              if (that._isProfileWidget || that._isPublicWidget) {
                needle.from_user = needle.user.screen_name;
                needle.profile_image_url = needle.user.profile_image_url;
              }

              needle.id = needle.id_str;

              that._createPost({
                id: needle.id,
                user: needle.from_user,
                post: procyk.clean(needle.text),
                avatar: needle.profile_image_url,
                created_at: needle.created_at,
                needle: needle
              });
              var el = that.post.element;
              (that._behavior == 'all') ? that._appendSlideFade(el) : that._appendPost(el);
            });

            if (this._behavior != 'preloaded') {
              return this;
            }
          }
          return this;
        },

        _normalizePost: function(needle) {
          var that = this;
          needle.views++;

          if (this._isProfileWidget) {
            needle.from_user = that.username;
            needle.profile_image_url = needle.user.profile_image_url;
          }

          if (this._isPublicWidget) {
            needle.from_user = needle.user.screen_name;
            needle.profile_image_url = needle.user.profile_image_url;
          }

          this._createPost({
            id: needle.id,
            user: needle.from_user,
            post: procyk.clean(needle.text),
            avatar: needle.profile_image_url,
            created_at: needle.created_at,
            needle: needle
          })._appendSlideFade();

        },

        _insertNewResultsNumber: function() {
          if (!this._hasNewSearchResults) {
            this._hasNewSearchResults = false;
            return;
          }

          if (this.runOnce && this._isSearchWidget) {
            var newResultsTotal = this.response.total > this.rpp ? this.response.total : this.response.results.length;
            var plural = newResultsTotal > 1 ? 's' : '';
            var moreThan = (this.response.warning && this.response.warning.match(/adjusted since_id/)) ? 'more than' : '';
            var el = document.createElement('div');
            classes.add(el, 'ypshr-new-results');
            el.innerHTML = '<div class="ypshr-results-inner"> &nbsp; </div>' +
                           '<div class="ypshr-results-hr"> &nbsp; </div><span>' + moreThan + ' <strong>' + newResultsTotal + '</strong> new post' + plural + '</span>';
            insertAfter(el, this.byClass('ypshr-reference-post', 'div'));
            this._hasNewSearchResults = false;
          }
        },

        /**
          * @private
          * helps transitions to be smooth
          */
        _preloadImages: function(results) {
          if (this._isProfileWidget || this._isPublicWidget) {
            each(results, function(el) {
              var img = new Image();
              img.src = matchUrlScheme(el.user.profile_image_url);
            });
          } else {
            each(results, function(el) {
              (new Image()).src = matchUrlScheme(el.profile_image_url);
            });
          }

        },

        // FIXME: This seems like a bug in Occasionally.
        /**
          * @private
          * @return bool
          * tells the job whether to decay
          */
        _decayDecider: function() {
          var r = false;

          if (!this.runOnce) {
            this.runOnce = true;
            r = true;
          } else if (this.newResults) {
            r = true;
          }
          return r;
        },

        /**
          * @public
          * @return self
          * starts the cycle
          */
        start: function() {
          var that = this;
          if (!this._rendered) {
            setTimeout(function() {
              that.start.call(that);
            }, 50);
            return this;
          }
          if (!this._isLive) {
            this._getResults();
          } else {
            this.occasionalJob.start();
          }
          this._isRunning = true;
          this._hasOfficiallyStarted = true;
          return this;
        },

        /**
          * @public
          * @return self
          * stops the cycle
          */
        stop: function() {
          this.occasionalJob.stop();

          if (this.intervalJob) {
            this.intervalJob.stop();
          }

          this._isRunning = false;
          return this;
        },

        /**
          * @public
          * @return self
          * will pause the scrolling, but not stop polling for new results
          * useful for 'hover' interactions
          */
        pause: function() {
          if (this.isRunning() && this.intervalJob) {
            this.intervalJob.stop();
            classes.add(this.widgetEl, 'ypshr-paused');
            this._isRunning = false;
          }

          if (this._resumeTimer) {
            clearTimeout(this._resumeTimer);
            this._resumeTimer = null;
          }

          return this;
        },

        /**
          * @public
          * @return self
          * it's like unpausing
          */
        resume: function() {
          var that = this;

          if (!this.isRunning() && this._hasOfficiallyStarted && this.intervalJob) {
            this._resumeTimer = window.setTimeout(function() {
              that.intervalJob.start();
              that._isRunning = true;
              classes.remove(that.widgetEl, 'ypshr-paused');
            }, 2000);
          }

          return this;
        },

        /**
          * @public
          * @return bool
          * whether the widget is running
          */
        isRunning: function() {
          return this._isRunning;
        },


        /**
          * @public facade
          * @return self
          * convenience method to stop the cycle, then clear it out
          * widget can be reused if destroyed
          */
        destroy: function() {
          this.stop();
          this.clear();
          this.runOnce = false;
          this._hasOfficiallyStarted = false;
          this._profileImage = false;
          this._isLive = true;
          this._postFilter = false;
          this._isScroll = false;
          this.newResults = false;
          this._isRunning = false;
          this.sinceId = 1;
          this.results = [];
          this.showedResults = [];
          this.occasionalJob.destroy();

          if (this.jsonRequestRunning) {
            clearTimeout(this.jsonRequestTimer);
          }

          classes.remove(this.widgetEl, 'ypshr-scroll');
          this.removeEvents();
          return this;
        }
      };
    }();
  })();
})(); // #end application closure
