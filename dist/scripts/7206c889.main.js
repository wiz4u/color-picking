!function(a){"use strict";a.Config={facebook:{appId:"721598084567256"},parse:{appKey:"lGwqMxnIrxYSB6ZYeQKMdgmNBsHsCcJ5bksS6Wqr",jsKey:"1Gficl3bhV4oiYTpLMNxwdmJIZMQAKzfNiwzyGMI"}}}(window.CP=window.CP||{}),function(){"use strict";for(var a=0,b=["ms","moz","webkit","o"],c=0;c<b.length&&!window.requestAnimationFrame;++c)window.requestAnimationFrame=window[b[c]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[b[c]+"CancelAnimationFrame"]||window[b[c]+"CancelRequestAnimationFrame"];void 0===window.requestAnimationFrame&&void 0!==window.setTimeout&&(window.requestAnimationFrame=function(b){var c=Date.now(),d=Math.max(0,16-(c-a)),e=window.setTimeout(function(){b(c+d)},d);return a=c+d,e}),void 0===window.cancelAnimationFrame&&void 0!==window.clearTimeout&&(window.cancelAnimationFrame=function(a){window.clearTimeout(a)})}(),function(){"use strict";navigator.getUserMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedida}(),function(a){"use strict";var b={};b.getFriends=function(a,b){FB.api("/me/friends",function(c){c.data?a(c.data):b()})},b.getUserPictureUrl=function(a,b,c){if(!a)return null;var d="http://graph.facebook.com/",e=d+a+"/picture";return b&&c&&(e+="/picture?width="+b+"&height="+c),e},a.FbUtil=b}(window.CP=window.CP||{}),function(a){"use strict";var b={buildColorString:function(a,b){switch(b){default:case"rgba":return"rgba("+a.r+", "+a.g+", "+a.b+", 1)";case"#":var c=a.r.toString(16);c=2===c.length?c:"0"+c;var d=a.g.toString(16);d=2===d.length?d:"0"+d;var e=a.b.toString(16);return e=2===e.length?e:"0"+e,"#"+c+d+e}},calcComplementaryColor:function(a){var b=a.r,c=a.g,d=a.b,e=Math.max(b,c,d)+Math.min(b,c,d);return{r:e-b,g:e-c,b:e-d}},getRandomColor:function(b){var c=b&&b.h&&b.h.min?b.h.min:0,d=b&&b.h&&b.h.max?b.h.max:360,e=b&&b.s&&b.s.min?b.s.min:0,f=b&&b.s&&b.s.max?b.s.max:256,g=b&&b.v&&b.v.min?b.v.min:0,h=b&&b.v&&b.v.max?b.v.max:256,i=Math.floor(Math.random()*(d-c)+c),j=Math.floor(Math.random()*(f-e)+e),k=Math.floor(Math.random()*(h-g)+g);return a.ColorUtil.hsv2rgb({h:i,s:j,v:k})},calcColorDistance:function(b,c){if(!b||!c)return 0;var d=function(b){return void 0!==b.h&&void 0!==b.s&&void 0!==b.v?b:a.ColorUtil.rgb2hsv(b)},e=d(b),f=d(c),g=Math.abs(e.h-f.h);g=180>g?g:360-g;var h=1-g/180,i=1-Math.abs(e.s-f.s)/255,j=1-Math.abs(e.v-f.v)/255,k=.6,l=.2,m=.2,n=k*h*h+l*i*i+m*j*j;return Math.round(100*n)},rgb2hsv:function(a){var b,c,d,e=a.r,f=a.g,g=a.b,h=Math.max(e,f,g),i=Math.min(e,f,g);return h===i?b=0:h===e?b=(60*(f-g)/(h-i)+360)%360:h===f?b=60*(g-e)/(h-i)+120:h===g&&(b=60*(e-f)/(h-i)+240),c=0===h?0:255*((h-i)/h),d=h,{h:b,s:c,v:d}},hsv2rgb:function(a){var b,c,d,e=a.h,f=a.s,g=a.v,h=Math.floor(e/60)%6,i=e/60-Math.floor(e/60),j=Math.round(g*(1-f/255)),k=Math.round(g*(1-f/255*i)),l=Math.round(g*(1-f/255*(1-i)));switch(h){case 0:b=g,c=l,d=j;break;case 1:b=k,c=g,d=j;break;case 2:b=j,c=g,d=l;break;case 3:b=j,c=k,d=g;break;case 4:b=l,c=j,d=g;break;case 5:b=g,c=j,d=k}return{r:b,g:c,b:d}}};a.ColorUtil=b}(window.CP=window.CP||{}),function(a){"use strict";a.Score=Parse.Object.extend("Score")}(window.CP=window.CP||{}),function(a){"use strict";a.Feedback=Parse.Object.extend("Feedback")}(window.CP=window.CP||{}),function(a){"use strict";var b=function(a,b){this.element=a||document.createElement("video"),this.element.autoplay=!0,this.element.muted=!0,this.stream=null,this.videoSourceInfo=[],this.audioSourceInfo=[],this.currentVideoSourceInfoIndex=0,this.currentAudioSourceInfoIndex=0;var c=this,d=b||function(){},e=function(a){for(var b=0,e=a.length;e>b;++b){var f=a[b];"video"===f.kind?c.videoSourceInfo.push(f.id):"audio"===f.kind&&c.audioSourceInfo.push(f.id)}c.videoSourceInfo.length&&(c.currentVideoSourceInfoIndex=c.videoSourceInfo.length-1),c.audioSourceInfo.length&&(c.currentAudioSourceInfoIndex=0),d()};"undefined"!=typeof window.MediaStreamTrack&&"undefined"!=typeof window.MediaStreamTrack.getSources?window.MediaStreamTrack.getSources(e):setTimeout(d,0)};b.prototype.initialize=function(a,b){this.stream&&(this.element.src=null,this.stream.stop());var c=this,d=function(b){c.stream=b,c.element.src=window.URL.createObjectURL(b),c.element.play(),a&&a()},e=function(a){console.log("navigator.getUserMedia error:",a),b&&b()},f=null;if(this.videoSourceInfo.length){var g=this.videoSourceInfo[this.currentVideoSourceInfoIndex],h=this.audioSourceInfo[this.currentAudioSourceInfoIndex];f={video:{optional:[{sourceId:g}]},audio:{optional:[{sourceId:h}]}}}else f={video:!0,audio:!0};navigator.getUserMedia(f,d,e)},b.prototype.getNumCameras=function(){return 0!==this.videoSourceInfo.length?this.videoSourceInfo.length:1},b.prototype.changeCamera=function(){var a=this.videoSourceInfo.length;if(a&&a>1){var b=this.currentVideoSourceInfoIndex;this.currentVideoSourceInfoIndex=(b+1)%a,this.initialize()}},b.prototype.getElement=function(){return this.element},a.Camera=b}(window.CP=window.CP||{}),function(a){"use strict";var b=function(b,c){this.gameView=new a.GameView(b,c),this.color=null,this.startTime=null,this.endTime=null,this._onClickMainButton=this.onClickMainButton.bind(this)};b.prototype.initialize=function(){this.$mainButton=$(".main-button"),this.$mainButton.on("click",this._onClickMainButton)},b.prototype.finalize=function(){this.$mainButton.off("click",this._onClickMainButton),this.$mainButton.removeClass("pick"),this.$mainButton.addClass("start-game"),this.stop(),this.color=null,this.startTime=null,this.endTime=null},b.prototype.update=function(){this.gameView.update()},b.prototype.start=function(){this.startTime=null,this.endTime=null,this.color=a.ColorUtil.getRandomColor({s:{min:128},v:{min:128}}),this.$mainButton.addClass("disable");var b=this;this.gameView.setColor(this.color),this.gameView.start(function(){b.$mainButton.removeClass("disable"),b.$mainButton.removeClass("start-game"),b.$mainButton.addClass("pick"),b.startTime=new Date})},b.prototype.stop=function(){this.$mainButton.addClass("start-game"),this.$mainButton.removeClass("pick"),this.endTime=new Date,this.gameView.stop()},b.prototype.calcScore=function(){var b=this.gameView.getPickingColor();return a.ColorUtil.calcColorDistance(this.color,b)},b.prototype.getTimeMs=function(){var a=new Date,b=null!==this.startTime?this.startTime:a,c=null!==this.endTime?this.endTime:a;return c-b},b.prototype.onClickMainButton=function(){var a=$(".main-button");a.hasClass("start-game")?this.start():this.stop()},a.SimpleGame=b}(window.CP=window.CP||{}),function(a){"use strict";var b=function(b,c,d){this.gameView=new a.GameView(b,c),this.scoreBoardView=d,this.GAME_MODE_NAME="Time Attack Mode",this.TOTAL_TIME_MS=3e4,this.SCORE_THRESH=80,this.endTime=null,this.score=0,this.color=null,this.$mainButton=null,this._onClickMainButton=this.onClickMainButton.bind(this)};b.prototype.initialize=function(){this.$mainButton=$(".main-button"),this.$mainButton.on("click",this._onClickMainButton)},b.prototype.finalize=function(){this.$mainButton.off("click",this._onClickMainButton),this.$mainButton.addClass("start-game"),this.$mainButton.removeClass("restart-game"),this.stop(),this.endTime=null,this.score=0,this.color=null},b.prototype.update=function(){var b=this.gameView.getPickingColor(),c=a.ColorUtil.calcColorDistance(this.color,b),d=0;d=c>this.SCORE_THRESH?1:c/this.SCORE_THRESH,this.gameView.setScoreRatio(d),this.gameView.update()},b.prototype.start=function(){this.endTime=null,this.score=0,this.setNextColor(),this.scoreBoardView.hide(),this.$mainButton.addClass("disable");var a=this;this.gameView.start(function(){a.$mainButton.removeClass("disable"),a.$mainButton.removeClass("start-game"),a.$mainButton.addClass("restart-game");var b=new Date;b.setMilliseconds(b.getMilliseconds()+a.TOTAL_TIME_MS),a.endTime=b})},b.prototype.stop=function(){this.$mainButton.addClass("start-game"),this.$mainButton.removeClass("restart-game"),this.endTime=null,this.gameView.stop()},b.prototype.setNextColor=function(){this.color=a.ColorUtil.getRandomColor({s:{min:128},v:{min:128}}),this.gameView.setColor(this.color)},b.prototype.calcScore=function(){var b=this.gameView.getPickingColor(),c=a.ColorUtil.calcColorDistance(this.color,b);return c>this.SCORE_THRESH&&(this.score++,this.setNextColor()),this.score},b.prototype.getTimeMs=function(){if(null===this.endTime)return 0;var a=this.endTime-new Date;return 0>=a&&(this.stop(),this.scoreBoardView.show(this.calcScore(),this.GAME_MODE_NAME),a=0),a},b.prototype.onClickMainButton=function(){this.$mainButton.hasClass("start-game")?this.start():(this.stop(),this.start())},a.TimeAttackGame=b}(window.CP=window.CP||{}),function(a){"use strict";var b=function(a,b){this.canvas=a,this.ctx=this.canvas.getContext("2d"),this.video=b,this.showColor=!1,this.updatePickingColor=!1,this.colorString="rgba(0, 0, 0, 1)",this.pickingColor={r:0,g:0,b:0},this.scoreRatio=1,this.layout()};b.prototype.layout=function(){var a=$(this.canvas).width();this.canvas.width=a,this.canvas.height=a};var c=function(a,b,c,d){for(var e=2*d,f=e*e,g=a.getImageData(b-d,c-d,e,e),h=f>100?100:f,i=Math.floor(f/h),j=0,k=0,l=0,m=0,n=0,o=e*e;o>n;n+=i)j+=g.data[4*n+0],k+=g.data[4*n+1],l+=g.data[4*n+2],m++;return j=Math.floor(j/m),k=Math.floor(k/m),l=Math.floor(l/m),{r:j,g:k,b:l}};b.prototype.update=function(){var b=this.ctx,d=this.canvas.width,e=this.canvas.width/2,f=this.canvas.height/2,g=.5*Math.PI,h=2*Math.PI;if(this.video.videoWidth&&this.video.videoHeight){var i=this.video.videoWidth,j=this.video.videoHeight,k=Math.min(i,j);this.ctx.drawImage(this.video,(i-k)/2,(j-k)/2,k,k,0,0,d,d)}if(this.showColor&&(b.fillStyle=this.colorString,b.beginPath(),b.arc(e,f,d/3,0,h),b.rect(d,0,-1*d,d),b.fill()),this.showColor){var l=Math.floor(d/15);this.updatePickingColor&&(this.pickingColor=c(b,e,f,l)),b.beginPath(),b.arc(e,f,l,0,h),b.fillStyle=a.ColorUtil.buildColorString(this.pickingColor),b.fill(),b.strokeStyle=this.colorString,b.beginPath(),b.arc(e,f,l,-g,h-g),b.arc(e,f,l+10,-g,h-g),b.lineWidth=2,b.stroke(),b.beginPath(),b.arc(e,f,l+5,-g,h*this.scoreRatio-g),b.lineWidth=10,b.stroke()}},b.prototype.start=function(a){var b=function(){$(".count-pane-wrapper").removeClass("active"),a()};$(".count-pane-wrapper").addClass("active"),setTimeout(b,1500),this.showColor=!0,this.updatePickingColor=!0},b.prototype.stop=function(){this.updatePickingColor=!1},b.prototype.setColor=function(b){this.colorString=a.ColorUtil.buildColorString(b)},b.prototype.setScoreRatio=function(a){this.scoreRatio=a},b.prototype.getPickingColor=function(){return this.pickingColor},a.GameView=b}(window.CP=window.CP||{}),function(a){"use strict";var b=function(a){this.$element=$(a),this.$score=this.$element.find(".score-board-score"),this.$login=this.$element.find(".btn-login"),this.$history=this.$element.find(".btn-history"),this._onLogin=this.onLogin.bind(this),this._onHistory=this.onHistory.bind(this),this.user=Parse.User.current(),this.score=0,this.gameMode=null};b.prototype.initialize=function(){return this.$login.on("click",this._onLogin),this.$history.on("click",this._onHistory),this},b.prototype.finalize=function(){return this.$login.off("click",this._onLogin),this.$history.off("click",this._onHistory),this},b.prototype.saveScore=function(){var b=new a.Score;b.set("score",this.score),b.set("gameMode",this.gameMode),b.set("user",this.user),b.save()},b.prototype.show=function(a,b){this.score=a,this.gameMode=b,this.user?(this.$login.hide(),this.$history.show(),this.saveScore()):(this.$login.show(),this.$history.hide()),this.$score.text(a),this.$element.addClass("show")},b.prototype.hide=function(){this.$element.removeClass("show next")},b.prototype.onLogin=function(){var a=this,b=function(){a.user=Parse.User.current(),a.show(a.score)};this.user&&this.user.get("facebookId")?(window.alert("[Debug] already logged in"),b()):Parse.FacebookUtils.logIn("public_profile,user_friends",{success:function(a){a.existed()?window.alert("[Debug] User logged in through Facebook!"):(FB.api("/me",function(b){b.error||(a.set("displayName",b.name),a.set("facebookId",b.id),a.save())}),window.alert("[Debug] User signed up and logged in through Facebook!")),b()},error:function(){console.log("[Debug] User cancelled the Facebook login or did not fully authorize.")}})},b.prototype.onHistory=function(){var b=this,c=function(a){for(var b=$(".my-score-list").find("li"),c=0,d=a.length;d>c;c++)b.eq(c).find("p").text(a[c].get("score"))},d=function(c){for(var d=$(".all-score-list").find("li"),e=function(b,c){c.fetch({success:function(c){var d=a.FbUtil.getUserPictureUrl(c.get("facebookId"),50,50);b.attr({src:d})}})},f=0,g=c.length;g>f;f++){var h=c[f];d.eq(f).find("p").text(h.get("score"));var i=d.eq(f).find("img");e(i,h.get("user"))}b.$element.removeClass("show").addClass("next")},e=new Parse.Query(a.Score);e.equalTo("gameMode",this.gameMode),e.equalTo("user",this.user),e.descending("score"),e.limit(5),e.find({success:function(a){console.log("found "+a.length+" scores"),c(a)},error:function(){c([])}});var f=[this.user.get("facebookId")];a.FbUtil.getFriends(function(c){for(var e=0,g=c.length;g>e;e++)f.push(c[e].id);var h=new Parse.Query(Parse.User);h.containedIn("facebookId",f);var i=new Parse.Query(a.Score);i.equalTo("gameMode",b.gameMode),i.matchesQuery("user",h),i.descending("score"),i.limit(5),i.find({success:function(a){d(a)},error:function(){console.log("error"),d([])}})},function(){console.log("cannot get friends"),d([])})},a.ScoreBoardView=b}(window.CP=window.CP||{}),function(a){"use strict";var b=function(){},c=["Android : Defautl Browser","Android : Chrome","Android : Chrome Beta","Android : Firefox","Android : Firefox Beta","Android : Opera","Android : Opera Mini","Android : Opera Beta","Android : Another one","iOS","Mac OS","Windows","Another Platform"];b.prototype.initialize=function(){return this._onSend=this.onSend.bind(this),this.$element=$("#feedback_modal"),this.$btnSend=$("#feedback_modal .feedback_send").on("click",this._onSend),this},b.prototype.finalize=function(){this.$btnSend.off("click",this._onSend)},b.prototype.render=function(){for(var a=$("#feedback_browser_type"),b=0,d=c.length;d>b;b++){var e=c[b];$("<option>").attr({value:e}).text(e).appendTo(a)}return this},b.prototype.onSend=function(){var b=$("#feedback_browser_type > :selected").val(),c=$("#feedback_free_text").val();this.model=new a.Feedback,this.model.set("browser_type",b),this.model.set("comment",c),this.model.save(),this.$element.modal("hide")},a.FeedbackView=b}(window.CP=window.CP||{}),function(a){"use strict";var b=function(){window.fbAsyncInit=function(){Parse.FacebookUtils.init({appId:a.Config.facebook.appId,status:!0,cookie:!0,xfbml:!0})}},c=function(){Parse.initialize(a.Config.parse.appKey,a.Config.parse.jsKey)};b(),c();var d=function(){if(i){var a=i.getTimeMs()/1e3;$("#elapsed_time").text(a.toFixed(2))}},e=function(){if(i){var a=i.calcScore();$("#score").text("Score : "+a)}},f=function(a){i&&(i.stop(),i.finalize()),a.initialize(),i=a},g=new a.Camera(null,function(){g.initialize(),1===g.getNumCameras()&&$(".change-camera").hide()}),h=new a.ScoreBoardView(document.getElementById("score_board")).initialize();(new a.FeedbackView).initialize().render();var i=null,j=new a.SimpleGame(document.getElementById("game_view"),g.getElement(),h),k=new a.TimeAttackGame(document.getElementById("game_view"),g.getElement(),h);f(k);var l=$(".change-camera"),m=$(".switch-simple-mode"),n=$(".switch-ta-mode");l.on("click",function(){g.changeCamera()}),m.on("click",f.bind(null,j)),n.on("click",f.bind(null,k));var o=null,p=function(){i.update(),d(),e(),o=window.requestAnimationFrame(p)};p()}(window.CP);