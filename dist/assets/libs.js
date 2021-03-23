(function(){var t;t=function(){function t(t,e){var o,n;if(this.options={target:"instafeed",get:"popular",resolution:"thumbnail",sortBy:"none",links:!0,mock:!1,useHttp:!1},"object"==typeof t)for(o in t)n=t[o],this.options[o]=n;this.context=null!=e?e:this,this.unique=this._genKey()}return t.prototype.hasNext=function(){return"string"==typeof this.context.nextUrl&&this.context.nextUrl.length>0},t.prototype.next=function(){return!!this.hasNext()&&this.run(this.context.nextUrl)},t.prototype.run=function(e){var o,n,i;if("string"!=typeof this.options.clientId&&"string"!=typeof this.options.accessToken)throw new Error("Missing clientId or accessToken.");if("string"!=typeof this.options.accessToken&&"string"!=typeof this.options.clientId)throw new Error("Missing clientId or accessToken.");return null!=this.options.before&&"function"==typeof this.options.before&&this.options.before.call(this),"undefined"!=typeof document&&null!==document&&(i=document.createElement("script"),i.id="instafeed-fetcher",i.src=e||this._buildUrl(),o=document.getElementsByTagName("head"),o[0].appendChild(i),n="instafeedCache"+this.unique,window[n]=new t(this.options,this),window[n].unique=this.unique),!0},t.prototype.parse=function(t){var e,o,n,i,r,s,a,c,l,d,p,f,u,h,m,g,y,v,w,b,E,O,C,k,N,L,$,I,x,T,S,A,B;if("object"!=typeof t){if(null!=this.options.error&&"function"==typeof this.options.error)return this.options.error.call(this,"Invalid JSON data"),!1;throw new Error("Invalid JSON response")}if(200!==t.meta.code){if(null!=this.options.error&&"function"==typeof this.options.error)return this.options.error.call(this,t.meta.error_message),!1;throw new Error("Error from Instagram: "+t.meta.error_message)}if(0===t.data.length){if(null!=this.options.error&&"function"==typeof this.options.error)return this.options.error.call(this,"No images were returned from Instagram"),!1;throw new Error("No images were returned from Instagram")}if(null!=this.options.success&&"function"==typeof this.options.success&&this.options.success.call(this,t),this.context.nextUrl="",null!=t.pagination&&(this.context.nextUrl=t.pagination.next_url),"none"!==this.options.sortBy)switch(S="random"===this.options.sortBy?["","random"]:this.options.sortBy.split("-"),T="least"===S[0],S[1]){case"random":t.data.sort(function(){return.5-Math.random()});break;case"recent":t.data=this._sortBy(t.data,"created_time",T);break;case"liked":t.data=this._sortBy(t.data,"likes.count",T);break;case"commented":t.data=this._sortBy(t.data,"comments.count",T);break;default:throw new Error("Invalid option for sortBy: '"+this.options.sortBy+"'.")}if("undefined"!=typeof document&&null!==document&&this.options.mock===!1){if(g=t.data,x=parseInt(this.options.limit,10),null!=this.options.limit&&g.length>x&&(g=g.slice(0,x)),a=document.createDocumentFragment(),null!=this.options.filter&&"function"==typeof this.options.filter&&(g=this._filter(g,this.options.filter)),null!=this.options.template&&"string"==typeof this.options.template){for(l="",h="",b="",B=document.createElement("div"),p=0,N=g.length;p<N;p++){if(f=g[p],u=f.images[this.options.resolution],"object"!=typeof u)throw s="No image found for resolution: "+this.options.resolution+".",new Error(s);E=u.width,v=u.height,w="square",E>v&&(w="landscape"),E<v&&(w="portrait"),m=u.url,d=window.location.protocol.indexOf("http")>=0,d&&!this.options.useHttp&&(m=m.replace(/https?:\/\//,"//")),h=this._makeTemplate(this.options.template,{model:f,id:f.id,link:f.link,type:f.type,image:m,width:E,height:v,orientation:w,caption:this._getObjectProperty(f,"caption.text"),likes:f.likes.count,comments:f.comments.count,location:this._getObjectProperty(f,"location.name")}),l+=h}for(B.innerHTML=l,i=[],n=0,o=B.childNodes.length;n<o;)i.push(B.childNodes[n]),n+=1;for(C=0,L=i.length;C<L;C++)I=i[C],a.appendChild(I)}else for(k=0,$=g.length;k<$;k++){if(f=g[k],y=document.createElement("img"),u=f.images[this.options.resolution],"object"!=typeof u)throw s="No image found for resolution: "+this.options.resolution+".",new Error(s);m=u.url,d=window.location.protocol.indexOf("http")>=0,d&&!this.options.useHttp&&(m=m.replace(/https?:\/\//,"//")),y.src=m,this.options.links===!0?(e=document.createElement("a"),e.href=f.link,e.appendChild(y),a.appendChild(e)):a.appendChild(y)}if(A=this.options.target,"string"==typeof A&&(A=document.getElementById(A)),null==A)throw s='No element with id="'+this.options.target+'" on page.',new Error(s);A.appendChild(a),c=document.getElementsByTagName("head")[0],c.removeChild(document.getElementById("instafeed-fetcher")),O="instafeedCache"+this.unique,window[O]=void 0;try{delete window[O]}catch(R){r=R}}return null!=this.options.after&&"function"==typeof this.options.after&&this.options.after.call(this),!0},t.prototype._buildUrl=function(){var t,e,o;switch(t="https://api.instagram.com/v1",this.options.get){case"popular":e="media/popular";break;case"tagged":if(!this.options.tagName)throw new Error("No tag name specified. Use the 'tagName' option.");e="tags/"+this.options.tagName+"/media/recent";break;case"location":if(!this.options.locationId)throw new Error("No location specified. Use the 'locationId' option.");e="locations/"+this.options.locationId+"/media/recent";break;case"user":if(!this.options.userId)throw new Error("No user specified. Use the 'userId' option.");e="users/"+this.options.userId+"/media/recent";break;default:throw new Error("Invalid option for get: '"+this.options.get+"'.")}return o=t+"/"+e,o+=null!=this.options.accessToken?"?access_token="+this.options.accessToken:"?client_id="+this.options.clientId,null!=this.options.limit&&(o+="&count="+this.options.limit),o+="&callback=instafeedCache"+this.unique+".parse"},t.prototype._genKey=function(){var t;return t=function(){return(65536*(1+Math.random())|0).toString(16).substring(1)},""+t()+t()+t()+t()},t.prototype._makeTemplate=function(t,e){var o,n,i,r,s;for(n=/(?:\{{2})([\w\[\]\.]+)(?:\}{2})/,o=t;n.test(o);)r=o.match(n)[1],s=null!=(i=this._getObjectProperty(e,r))?i:"",o=o.replace(n,function(){return""+s});return o},t.prototype._getObjectProperty=function(t,e){var o,n;for(e=e.replace(/\[(\w+)\]/g,".$1"),n=e.split(".");n.length;){if(o=n.shift(),!(null!=t&&o in t))return null;t=t[o]}return t},t.prototype._sortBy=function(t,e,o){var n;return n=function(t,n){var i,r;return i=this._getObjectProperty(t,e),r=this._getObjectProperty(n,e),o?i>r?1:-1:i<r?1:-1},t.sort(n.bind(this)),t},t.prototype._filter=function(t,e){var o,n,i,r,s;for(o=[],n=function(t){if(e(t))return o.push(t)},i=0,s=t.length;i<s;i++)r=t[i],n(r);return o},t}(),function(t,e){return"function"==typeof define&&define.amd?define([],e):"object"==typeof module&&module.exports?module.exports=e():t.Instafeed=e()}(this,function(){return t})}).call(this),!function(t,e){"function"==typeof define&&define.amd?define(["jquery"],function(o){return e(t,o)}):"object"==typeof exports?e(t,require("jquery")):e(t,t.jQuery||t.Zepto)}(this,function(t,e){"use strict";function o(t){if(O&&"none"===t.css("animation-name")&&"none"===t.css("-webkit-animation-name")&&"none"===t.css("-moz-animation-name")&&"none"===t.css("-o-animation-name")&&"none"===t.css("-ms-animation-name"))return 0;var e,o,n,i,r=t.css("animation-duration")||t.css("-webkit-animation-duration")||t.css("-moz-animation-duration")||t.css("-o-animation-duration")||t.css("-ms-animation-duration")||"0s",s=t.css("animation-delay")||t.css("-webkit-animation-delay")||t.css("-moz-animation-delay")||t.css("-o-animation-delay")||t.css("-ms-animation-delay")||"0s",a=t.css("animation-iteration-count")||t.css("-webkit-animation-iteration-count")||t.css("-moz-animation-iteration-count")||t.css("-o-animation-iteration-count")||t.css("-ms-animation-iteration-count")||"1";for(r=r.split(", "),s=s.split(", "),a=a.split(", "),i=0,o=r.length,e=Number.NEGATIVE_INFINITY;i<o;i++)n=parseFloat(r[i])*parseInt(a[i],10)+parseFloat(s[i]),n>e&&(e=n);return e}function n(){if(e(document).height()<=e(window).height())return 0;var t,o,n=document.createElement("div"),i=document.createElement("div");return n.style.visibility="hidden",n.style.width="100px",document.body.appendChild(n),t=n.offsetWidth,n.style.overflow="scroll",i.style.width="100%",n.appendChild(i),o=i.offsetWidth,n.parentNode.removeChild(n),t-o}function i(){if(!C){var t,o,i=e("html"),r=d("is-locked");i.hasClass(r)||(o=e(document.body),t=parseInt(o.css("padding-right"),10)+n(),o.css("padding-right",t+"px"),i.addClass(r))}}function r(){if(!C){var t,o,i=e("html"),r=d("is-locked");i.hasClass(r)&&(o=e(document.body),t=parseInt(o.css("padding-right"),10)-n(),o.css("padding-right",t+"px"),i.removeClass(r))}}function s(t,e,o,n){var i=d("is",e),r=[d("is",b.CLOSING),d("is",b.OPENING),d("is",b.CLOSED),d("is",b.OPENED)].join(" ");t.$bg.removeClass(r).addClass(i),t.$overlay.removeClass(r).addClass(i),t.$wrapper.removeClass(r).addClass(i),t.$modal.removeClass(r).addClass(i),t.state=e,!o&&t.$modal.trigger({type:e,reason:n},[{reason:n}])}function a(t,n,i){var r=0,s=function(t){t.target===this&&r++},a=function(t){t.target===this&&0===--r&&(e.each(["$bg","$overlay","$wrapper","$modal"],function(t,e){i[e].off(y+" "+v)}),n())};e.each(["$bg","$overlay","$wrapper","$modal"],function(t,e){i[e].on(y,s).on(v,a)}),t(),0===o(i.$bg)&&0===o(i.$overlay)&&0===o(i.$wrapper)&&0===o(i.$modal)&&(e.each(["$bg","$overlay","$wrapper","$modal"],function(t,e){i[e].off(y+" "+v)}),n())}function c(t){t.state!==b.CLOSED&&(e.each(["$bg","$overlay","$wrapper","$modal"],function(e,o){t[o].off(y+" "+v)}),t.$bg.removeClass(t.settings.modifier),t.$overlay.removeClass(t.settings.modifier).hide(),t.$wrapper.hide(),r(),s(t,b.CLOSED,!0))}function l(t){var e,o,n,i,r={};for(t=t.replace(/\s*:\s*/g,":").replace(/\s*,\s*/g,","),e=t.split(","),i=0,o=e.length;i<o;i++)e[i]=e[i].split(":"),n=e[i][1],("string"==typeof n||n instanceof String)&&(n="true"===n||"false"!==n&&n),("string"==typeof n||n instanceof String)&&(n=isNaN(n)?n:+n),r[e[i][0]]=n;return r}function d(){for(var t=g,e=0;e<arguments.length;++e)t+="-"+arguments[e];return t}function p(){var t,o,n=location.hash.replace("#","");if(n){try{o=e('[data-remodal-id="'+n+'"]')}catch(i){}o&&o.length&&(t=e[m].lookup[o.data(m)],t&&t.settings.hashTracking&&t.open())}else u&&u.state===b.OPENED&&u.settings.hashTracking&&u.close()}function f(t,o){var n=e(document.body),i=n,r=this;r.settings=e.extend({},w,o),r.index=e[m].lookup.push(r)-1,r.state=b.CLOSED,r.$overlay=e("."+d("overlay")),null!==r.settings.appendTo&&r.settings.appendTo.length&&(i=e(r.settings.appendTo)),r.$overlay.length||(r.$overlay=e("<div>").addClass(d("overlay")+" "+d("is",b.CLOSED)).hide(),i.append(r.$overlay)),r.$bg=e("."+d("bg")).addClass(d("is",b.CLOSED)),r.$modal=t.addClass(g+" "+d("is-initialized")+" "+r.settings.modifier+" "+d("is",b.CLOSED)).attr("tabindex","-1"),r.$wrapper=e("<div>").addClass(d("wrapper")+" "+r.settings.modifier+" "+d("is",b.CLOSED)).hide().append(r.$modal),i.append(r.$wrapper),r.$wrapper.on("click."+g,'[data-remodal-action="close"]',function(t){t.preventDefault(),r.close()}),r.$wrapper.on("click."+g,'[data-remodal-action="cancel"]',function(t){t.preventDefault(),r.$modal.trigger(E.CANCELLATION),r.settings.closeOnCancel&&r.close(E.CANCELLATION)}),r.$wrapper.on("click."+g,'[data-remodal-action="confirm"]',function(t){t.preventDefault(),r.$modal.trigger(E.CONFIRMATION),r.settings.closeOnConfirm&&r.close(E.CONFIRMATION)}),r.$wrapper.on("click."+g,function(t){var o=e(t.target);o.hasClass(d("wrapper"))&&r.settings.closeOnOutsideClick&&r.close()})}var u,h,m="remodal",g=t.REMODAL_GLOBALS&&t.REMODAL_GLOBALS.NAMESPACE||m,y=e.map(["animationstart","webkitAnimationStart","MSAnimationStart","oAnimationStart"],function(t){return t+"."+g}).join(" "),v=e.map(["animationend","webkitAnimationEnd","MSAnimationEnd","oAnimationEnd"],function(t){return t+"."+g}).join(" "),w=e.extend({hashTracking:!0,closeOnConfirm:!0,closeOnCancel:!0,closeOnEscape:!0,closeOnOutsideClick:!0,modifier:"",appendTo:null},t.REMODAL_GLOBALS&&t.REMODAL_GLOBALS.DEFAULTS),b={CLOSING:"closing",CLOSED:"closed",OPENING:"opening",OPENED:"opened"},E={CONFIRMATION:"confirmation",CANCELLATION:"cancellation"},O=function(){var t=document.createElement("div").style;return void 0!==t.animationName||void 0!==t.WebkitAnimationName||void 0!==t.MozAnimationName||void 0!==t.msAnimationName||void 0!==t.OAnimationName}(),C=/iPad|iPhone|iPod/.test(navigator.platform);f.prototype.open=function(){var t,o=this;o.state!==b.OPENING&&o.state!==b.CLOSING&&(t=o.$modal.attr("data-remodal-id"),t&&o.settings.hashTracking&&(h=e(window).scrollTop(),location.hash=t),u&&u!==o&&c(u),u=o,i(),o.$bg.addClass(o.settings.modifier),o.$overlay.addClass(o.settings.modifier).show(),o.$wrapper.show().scrollTop(0),o.$modal.focus(),a(function(){s(o,b.OPENING)},function(){s(o,b.OPENED)},o))},f.prototype.close=function(t){var o=this;o.state!==b.OPENING&&o.state!==b.CLOSING&&o.state!==b.CLOSED&&(o.settings.hashTracking&&o.$modal.attr("data-remodal-id")===location.hash.substr(1)&&(location.hash="",e(window).scrollTop(h)),a(function(){s(o,b.CLOSING,!1,t)},function(){o.$bg.removeClass(o.settings.modifier),o.$overlay.removeClass(o.settings.modifier).hide(),o.$wrapper.hide(),r(),s(o,b.CLOSED,!1,t)},o))},f.prototype.getState=function(){return this.state},f.prototype.destroy=function(){var t,o=e[m].lookup;c(this),this.$wrapper.remove(),delete o[this.index],t=e.grep(o,function(t){return!!t}).length,0===t&&(this.$overlay.remove(),this.$bg.removeClass(d("is",b.CLOSING)+" "+d("is",b.OPENING)+" "+d("is",b.CLOSED)+" "+d("is",b.OPENED)))},e[m]={lookup:[]},e.fn[m]=function(t){var o,n;return this.each(function(i,r){n=e(r),null==n.data(m)?(o=new f(n,t),n.data(m,o.index),o.settings.hashTracking&&n.attr("data-remodal-id")===location.hash.substr(1)&&o.open()):o=e[m].lookup[n.data(m)]}),o},e(document).ready(function(){e(document).on("click","[data-remodal-target]",function(t){t.preventDefault();var o=t.currentTarget,n=o.getAttribute("data-remodal-target"),i=e('[data-remodal-id="'+n+'"]');e[m].lookup[i.data(m)].open()}),e(document).find("."+g).each(function(t,o){var n=e(o),i=n.data("remodal-options");i?("string"==typeof i||i instanceof String)&&(i=l(i)):i={},n[m](i)}),e(document).on("keydown."+g,function(t){u&&u.settings.closeOnEscape&&u.state===b.OPENED&&27===t.keyCode&&u.close()}),e(window).on("hashchange."+g,p)})}),function(t,e){"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?module.exports=e():t.RouterRouter=e()}(this,function(){"use strict";var t=/[\-{}\[\]+?.,\\\^$|#\s]/g,e=/(\(\?)?:\w+/g,o=/\((.*?)\)/g,n=/\*\w+/g,i=/^[#\/]|\s+$/g,r=/\/$/,s=function(t){if(t)for(var e,o=Object.keys(t);"undefined"!=typeof(e=o.pop());)this.route(e,t[e])},a=function(t,e){var o=t.exec(e).slice(1);return o.map(function(t){return t?decodeURIComponent(t):null})},c=function(t){return t.replace(i,"").replace(r,"")},l=function(t,e){return Object.prototype.toString.call(t)==="[object "+e+"]"},d=function(i){return i=i.replace(t,"\\$&").replace(o,"(?:$1)?").replace(e,function(t,e){return e?t:"([^/?]+)"}).replace(n,"([^?]*?)"),new RegExp("^"+i+"(?:\\?([\\s\\S]*))?$")},p=function(t){this.options=t||{},s(this.options.routes)};return p.prototype.route=function(t,e,o){l(t,"RegExp")||(t=d(t)),l(e,"Function")&&(o=e,e=""),o||(o=this.options[e]);var n=c(window.location.pathname);if(t.test(n)){var i=a(t,n);l(o,"Function")&&o.apply(this,i)}return this},p}),function(t,e){function o(){k=x=N=L=$=I=D}function n(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])}function i(t){return parseFloat(t)||0}function r(){S={top:e.pageYOffset,left:e.pageXOffset}}function s(){return e.pageXOffset!=S.left?(r(),void N()):void(e.pageYOffset!=S.top&&(r(),c()))}function a(t){setTimeout(function(){e.pageYOffset!=S.top&&(S.top=e.pageYOffset,c())},0)}function c(){for(var t=B.length-1;t>=0;t--)l(B[t])}function l(t){if(t.inited){var e=S.top<=t.limit.start?0:S.top>=t.limit.end?2:1;t.mode!=e&&m(t,e)}}function d(){for(var t=B.length-1;t>=0;t--)if(B[t].inited){var e=Math.abs(w(B[t].clone)-B[t].docOffsetTop),o=Math.abs(B[t].parent.node.offsetHeight-B[t].parent.height);if(e>=2||o>=2)return!1}return!0}function p(t){isNaN(parseFloat(t.computed.top))||t.isCell||"none"==t.computed.display||(t.inited=!0,t.clone||g(t),"absolute"!=t.parent.computed.position&&"relative"!=t.parent.computed.position&&(t.parent.node.style.position="relative"),l(t),t.parent.height=t.parent.node.offsetHeight,t.docOffsetTop=w(t.clone))}function f(t){var e=!0;t.clone&&y(t),n(t.node.style,t.css);for(var o=B.length-1;o>=0;o--)if(B[o].node!==t.node&&B[o].parent.node===t.parent.node){e=!1;break}e&&(t.parent.node.style.position=t.parent.css.position),t.mode=-1}function u(){for(var t=B.length-1;t>=0;t--)p(B[t])}function h(){for(var t=B.length-1;t>=0;t--)f(B[t])}function m(t,e){var o=t.node.style;switch(e){case 0:o.position="absolute",o.left=t.offset.left+"px",o.right=t.offset.right+"px",o.top=t.offset.top+"px",o.bottom="auto",o.width="auto",o.marginLeft=0,o.marginRight=0,o.marginTop=0;break;case 1:o.position="fixed",o.left=t.box.left+"px",o.right=t.box.right+"px",o.top=t.css.top,o.bottom="auto",o.width="auto",o.marginLeft=0,o.marginRight=0,o.marginTop=0;break;case 2:o.position="absolute",o.left=t.offset.left+"px",o.right=t.offset.right+"px",o.top="auto",o.bottom=0,o.width="auto",o.marginLeft=0,o.marginRight=0}t.mode=e}function g(t){t.clone=document.createElement("div");var e=t.node.nextSibling||t.node,o=t.clone.style;o.height=t.height+"px",o.width=t.width+"px",o.marginTop=t.computed.marginTop,o.marginBottom=t.computed.marginBottom,o.marginLeft=t.computed.marginLeft,o.marginRight=t.computed.marginRight,o.padding=o.border=o.borderSpacing=0,o.fontSize="1em",o.position="static",o.cssFloat=t.computed.cssFloat,t.node.parentNode.insertBefore(t.clone,e)}function y(t){t.clone.parentNode.removeChild(t.clone),t.clone=void 0}function v(t){var e=getComputedStyle(t),o=t.parentNode,n=getComputedStyle(o),r=t.style.position;t.style.position="relative";var s={top:e.top,marginTop:e.marginTop,marginBottom:e.marginBottom,marginLeft:e.marginLeft,marginRight:e.marginRight,cssFloat:e.cssFloat,display:e.display},a={top:i(e.top),marginBottom:i(e.marginBottom),paddingLeft:i(e.paddingLeft),paddingRight:i(e.paddingRight),borderLeftWidth:i(e.borderLeftWidth),borderRightWidth:i(e.borderRightWidth)};t.style.position=r;var c={position:t.style.position,top:t.style.top,bottom:t.style.bottom,left:t.style.left,right:t.style.right,width:t.style.width,marginTop:t.style.marginTop,marginLeft:t.style.marginLeft,marginRight:t.style.marginRight},l=b(t),d=b(o),p={node:o,css:{position:o.style.position},computed:{position:n.position},numeric:{borderLeftWidth:i(n.borderLeftWidth),borderRightWidth:i(n.borderRightWidth),borderTopWidth:i(n.borderTopWidth),borderBottomWidth:i(n.borderBottomWidth)}},f={node:t,box:{left:l.win.left,right:_.clientWidth-l.win.right},offset:{top:l.win.top-d.win.top-p.numeric.borderTopWidth,left:l.win.left-d.win.left-p.numeric.borderLeftWidth,right:-l.win.right+d.win.right-p.numeric.borderRightWidth},css:c,isCell:"table-cell"==e.display,computed:s,numeric:a,width:l.win.right-l.win.left,height:l.win.bottom-l.win.top,mode:-1,inited:!1,parent:p,limit:{start:l.doc.top-a.top,end:d.doc.top+o.offsetHeight-p.numeric.borderBottomWidth-t.offsetHeight-a.top-a.marginBottom}};return f}function w(t){for(var e=0;t;)e+=t.offsetTop,t=t.offsetParent;return e}function b(t){var o=t.getBoundingClientRect();return{doc:{top:o.top+e.pageYOffset,left:o.left+e.pageXOffset},win:o}}function E(){A=setInterval(function(){!d()&&N()},500)}function O(){clearInterval(A)}function C(){R&&(document[j]?O():E())}function k(){R||(r(),u(),e.addEventListener("scroll",s),e.addEventListener("wheel",a),e.addEventListener("resize",N),e.addEventListener("orientationchange",N),t.addEventListener(P,C),E(),R=!0)}function N(){if(R){h();for(var t=B.length-1;t>=0;t--)B[t]=v(B[t].node);u()}}function L(){e.removeEventListener("scroll",s),e.removeEventListener("wheel",a),e.removeEventListener("resize",N),e.removeEventListener("orientationchange",N),t.removeEventListener(P,C),O(),R=!1}function $(){L(),h()}function I(){for($();B.length;)B.pop()}function x(t){for(var e=B.length-1;e>=0;e--)if(B[e].node===t)return;var o=v(t);B.push(o),R?p(o):k()}function T(t){for(var e=B.length-1;e>=0;e--)B[e].node===t&&(f(B[e]),B.splice(e,1))}var S,A,B=[],R=!1,_=t.documentElement,D=function(){},j="hidden",P="visibilitychange";void 0!==t.webkitHidden&&(j="webkitHidden",P="webkitvisibilitychange"),e.getComputedStyle||o();for(var W=["","-webkit-","-moz-","-ms-"],M=document.createElement("div"),G=W.length-1;G>=0;G--){try{M.style.position=W[G]+"sticky"}catch(F){}""!=M.style.position&&o()}r(),e.Stickyfill={stickies:B,add:x,remove:T,init:k,rebuild:N,pause:L,stop:$,kill:I}}(document,window),window.jQuery&&!function(t){t.fn.Stickyfill=function(t){return this.each(function(){Stickyfill.add(this)}),this}}(window.jQuery);