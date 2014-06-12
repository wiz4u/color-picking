!function(){"use strict";for(var a=0,b=["ms","moz","webkit","o"],c=0;c<b.length&&!window.requestAnimationFrame;++c)window.requestAnimationFrame=window[b[c]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[b[c]+"CancelAnimationFrame"]||window[b[c]+"CancelRequestAnimationFrame"];void 0===window.requestAnimationFrame&&void 0!==window.setTimeout&&(window.requestAnimationFrame=function(b){var c=Date.now(),d=Math.max(0,16-(c-a)),e=window.setTimeout(function(){b(c+d)},d);return a=c+d,e}),void 0===window.cancelAnimationFrame&&void 0!==window.clearTimeout&&(window.cancelAnimationFrame=function(a){window.clearTimeout(a)})}(),function(){"use strict";navigator.getUserMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedida}(),function(a){"use strict";var b={buildColorString:function(a,b){switch(b){default:case"rgba":return"rgba("+a.r+", "+a.g+", "+a.b+", 1)";case"#":var c=a.r.toString(16);c=2===c.length?c:"0"+c;var d=a.g.toString(16);d=2===d.length?d:"0"+d;var e=a.b.toString(16);return e=2===e.length?e:"0"+e,"#"+c+d+e}},calcComplementaryColor:function(a){var b=a.r,c=a.g,d=a.b,e=Math.max(b,c,d)+Math.min(b,c,d);return{r:e-b,g:e-c,b:e-d}},rgb2hsv:function(a){var b,c,d,e=a.r,f=a.g,g=a.b,h=Math.max(e,f,g),i=Math.min(e,f,g);return h===i?b=0:h===e?b=(60*(f-g)/(h-i)+360)%360:h===f?b=60*(g-e)/(h-i)+120:h===g&&(b=60*(e-f)/(h-i)+240),c=0===h?0:255*((h-i)/h),d=h,{h:b,s:c,v:d}},hsv2rgb:function(a){var b,c,d,e=a.h,f=a.s,g=a.v,h=Math.floor(e/60)%6,i=e/60-Math.floor(e/60),j=Math.round(g*(1-f/255)),k=Math.round(g*(1-f/255*i)),l=Math.round(g*(1-f/255*(1-i)));switch(h){case 0:b=g,c=l,d=j;break;case 1:b=k,c=g,d=j;break;case 2:b=j,c=g,d=l;break;case 3:b=j,c=k,d=g;break;case 4:b=l,c=j,d=g;break;case 5:b=g,c=j,d=k}return{r:b,g:c,b:d}}};a.ColorUtil=b}(window.CP=window.CP||{}),function(a){"use strict";var b=function(a,b){this.element=a||document.createElement("video"),this.element.autoplay=!0,this.element.muted=!0,this.stream=null,this.videoSourceInfo=[],this.audioSourceInfo=[],this.currentVideoSourceInfoIndex=0,this.currentAudioSourceInfoIndex=0;var c=this,d=b||function(){},e=function(a){for(var b=0,e=a.length;e>b;++b){var f=a[b];"video"===f.kind?c.videoSourceInfo.push(f.id):"audio"===f.kind&&c.audioSourceInfo.push(f.id)}c.videoSourceInfo.length&&(c.currentVideoSourceInfoIndex=c.videoSourceInfo.length-1),c.audioSourceInfo.length&&(c.currentAudioSourceInfoIndex=0),d()};"undefined"!=typeof window.MediaStreamTrack&&"undefined"!=typeof window.MediaStreamTrack.getSources?window.MediaStreamTrack.getSources(e):setTimeout(d,0)};b.prototype.initialize=function(a,b){this.stream&&(this.element.src=null,this.stream.stop());var c=this,d=function(b){c.stream=b,c.element.src=window.URL.createObjectURL(b),c.element.play(),a&&a()},e=function(a){console.log("navigator.getUserMedia error:",a),b&&b()},f=null;if(this.videoSourceInfo.length){var g=this.videoSourceInfo[this.currentVideoSourceInfoIndex],h=this.audioSourceInfo[this.currentAudioSourceInfoIndex];f={video:{optional:[{sourceId:g}]},audio:{optional:[{sourceId:h}]}}}else f={video:!0,audio:!0};navigator.getUserMedia(f,d,e)},b.prototype.getNumCameras=function(){return 0!==this.videoSourceInfo.length?this.videoSourceInfo.length:1},b.prototype.changeCamera=function(){var a=this.videoSourceInfo.length;if(a&&a>1){var b=this.currentVideoSourceInfoIndex;this.currentVideoSourceInfoIndex=(b+1)%a,this.initialize()}},b.prototype.getElement=function(){return this.element},a.Camera=b}(window.CP=window.CP||{}),function(a){"use strict";var b=function(){this.color=c({s:{min:128},v:{min:128}}),this.startTime=null,this.endTime=null},c=function(b){var c=b&&b.h&&b.h.min?b.h.min:0,d=b&&b.h&&b.h.max?b.h.max:360,e=b&&b.s&&b.s.min?b.s.min:0,f=b&&b.s&&b.s.max?b.s.max:256,g=b&&b.v&&b.v.min?b.v.min:0,h=b&&b.v&&b.v.max?b.v.max:256,i=Math.floor(Math.random()*(d-c)+c),j=Math.floor(Math.random()*(f-e)+e),k=Math.floor(Math.random()*(h-g)+g);return a.ColorUtil.hsv2rgb({h:i,s:j,v:k})};b.prototype.getColor=function(){return this.color},b.prototype.start=function(){this.startTime=new Date},b.prototype.stop=function(){this.endTime=new Date},b.prototype.calcScore=function(b){var c=a.ColorUtil.rgb2hsv(this.color),d=a.ColorUtil.rgb2hsv(b),e=Math.abs(c.h-d.h);e=180>e?e:360-e;var f=1-e/180,g=1-Math.abs(c.s-d.s)/255,h=1-Math.abs(c.v-d.v)/255,i=.6,j=.2,k=.2,l=i*f*f+j*g*g+k*h*h;return Math.round(100*l)},b.prototype.getElapsedTimeMs=function(){var a=new Date,b=null!==this.startTime?this.startTime:a,c=null!==this.endTime?this.endTime:a;return c-b},a.Game=b}(window.CP=window.CP||{}),function(a){"use strict";var b=function(b,c,d){this.canvas=b,this.ctx=this.canvas.getContext("2d"),this.video=c,this.showColor=!1,this.updatePickingColor=!1,this.color={r:0,g:0,b:0},this.colorString=a.ColorUtil.buildColorString(this.color),this.pickingColor={r:0,g:0,b:0},this.game=null,this.updateCallback=d||function(){},this.layout(),this.update()};b.prototype.layout=function(){var a=$(this.canvas).width();this.canvas.width=a,this.canvas.height=a};var c=function(a,b,c,d){for(var e=2*d,f=e*e,g=a.getImageData(b-d,c-d,e,e),h=f>100?100:f,i=Math.floor(f/h),j=0,k=0,l=0,m=0,n=0,o=e*e;o>n;n+=i)j+=g.data[4*n+0],k+=g.data[4*n+1],l+=g.data[4*n+2],m++;return j=Math.floor(j/m),k=Math.floor(k/m),l=Math.floor(l/m),{r:j,g:k,b:l}};b.prototype.update=function(){var b=this.ctx,d=this.canvas.width,e=this.canvas.width/2,f=this.canvas.height/2;if(this.video.videoWidth&&this.video.videoHeight){var g=this.video.videoWidth,h=this.video.videoHeight,i=Math.min(g,h);this.ctx.drawImage(this.video,(g-i)/2,(h-i)/2,i,i,0,0,d,d)}if(this.showColor&&(b.fillStyle=this.colorString,b.beginPath(),b.arc(e,f,d/3,0,2*Math.PI),b.rect(d,0,-1*d,d),b.fill()),this.showColor){var j=Math.floor(d/15);this.updatePickingColor&&(this.pickingColor=c(b,e,f,j)),b.fillStyle=a.ColorUtil.buildColorString(this.pickingColor),b.beginPath(),b.arc(e,f,j,0,2*Math.PI),b.fill(),b.beginPath(),b.arc(e,f,j,0,2*Math.PI),b.lineWidth=10,b.strokeStyle=this.colorString,b.stroke()}this.updateCallback(),this.requestId=window.requestAnimationFrame(this.update.bind(this))},b.prototype.start=function(b){this.game=b;var c=function(){$(".count-pane-wrapper").removeClass("active"),b.start()};$(".count-pane-wrapper").addClass("active"),setTimeout(c,1500),this.color=b.getColor(),this.colorString=a.ColorUtil.buildColorString(this.color),this.showColor=!0,this.updatePickingColor=!0},b.prototype.stop=function(){this.updatePickingColor=!1},b.prototype.getPickingColor=function(){return this.pickingColor},a.GameView=b}(window.CP=window.CP||{}),function(){"use strict";var a=function(){if(d){var a=d.getElapsedTimeMs()/1e3;$("#elapsed_time").text(a.toFixed(2))}},b=function(){if(d){var a=e.getPickingColor(),b=d.calcScore(a);$("#score").text("Score : "+b)}},c=new window.CP.Camera(null,function(){c.initialize(),1===c.getNumCameras()&&$(".change-camera").hide()}),d=null,e=new window.CP.GameView(document.getElementById("game_view"),c.getElement(),function(){a(),b()}),f=$(".change-camera"),g=$(".main-button");f.on("click",function(){c.changeCamera()}),g.on("click",function(){g.hasClass("start-game")?(g.removeClass("start-game"),g.addClass("pick"),$("#score").text("Score : "),d=new window.CP.Game,e.start(d)):(g.addClass("start-game"),g.removeClass("pick"),e.stop(),d.stop(),b())})}();