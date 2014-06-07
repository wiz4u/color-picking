!function(){"use strict";for(var a=0,b=["ms","moz","webkit","o"],c=0;c<b.length&&!window.requestAnimationFrame;++c)window.requestAnimationFrame=window[b[c]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[b[c]+"CancelAnimationFrame"]||window[b[c]+"CancelRequestAnimationFrame"];void 0===window.requestAnimationFrame&&void 0!==window.setTimeout&&(window.requestAnimationFrame=function(b){var c=Date.now(),d=Math.max(0,16-(c-a)),e=window.setTimeout(function(){b(c+d)},d);return a=c+d,e}),void 0===window.cancelAnimationFrame&&void 0!==window.clearTimeout&&(window.cancelAnimationFrame=function(a){window.clearTimeout(a)})}(),function(){"use strict";navigator.getUserMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedida}(),function(a){"use strict";var b=function(a,b){this.element=a||document.createElement("video"),this.element.setAttribute("muted","true"),this.element.setAttribute("autoplay","true"),this.stream=null,this.videoSourceInfo=[],this.audioSourceInfo=[],this.currentVideoSourceInfoIndex=0,this.currentAudioSourceInfoIndex=0;var c=this,d=b||function(){},e=function(a){for(var b=0,e=a.length;e>b;++b){var f=a[b];"video"===f.kind?c.videoSourceInfo.push(f.id):"audio"===f.kind&&c.audioSourceInfo.push(f.id)}c.videoSourceInfo.length&&(c.currentVideoSourceInfoIndex=c.videoSourceInfo.length-1),c.audioSourceInfo.length&&(c.currentAudioSourceInfoIndex=0),d()};"undefined"!=typeof window.MediaStreamTrack&&"undefined"!=typeof window.MediaStreamTrack.getSources?window.MediaStreamTrack.getSources(e):setTimeout(d,0)};b.prototype.initialize=function(a,b){this.stream&&(this.element.src=null,this.stream.stop());var c=this,d=function(b){c.stream=b,c.element.src=window.URL.createObjectURL(b),c.element.play(),a&&a()},e=function(a){console.log("navigator.getUserMedia error:",a),b&&b()},f=null;if(this.videoSourceInfo.length){var g=this.videoSourceInfo[this.currentVideoSourceInfoIndex],h=this.audioSourceInfo[this.currentAudioSourceInfoIndex];f={video:{optional:[{sourceId:g}]},audio:{optional:[{sourceId:h}]}}}else f={video:!0,audio:!0};navigator.getUserMedia(f,d,e)},b.prototype.changeCamera=function(){var a=this.videoSourceInfo.length;if(a&&a>1){var b=this.currentVideoSourceInfoIndex;this.currentVideoSourceInfoIndex=(b+1)%a,this.initialize()}},b.prototype.getElement=function(){return this.element},a.Camera=b}(window.CP=window.CP||{}),function(a){"use strict";var b=function(){};b.prototype.start=function(){},b.prototype.pick=function(){},a.Game=b}(window.CP=window.CP||{}),function(a){"use strict";var b=function(a,b){this.canvas=a,this.ctx=this.canvas.getContext("2d"),this.video=b,this.maskCanvas=document.createElement("canvas"),this.maskCtx=this.maskCanvas.getContext("2d"),this.showColor=!1,this.colorRadius=0,this.color="rgba(0, 0, 0, 0)",this.layout(),this.update()};b.prototype.layout=function(){var a=$(this.canvas).width();this.canvas.width=a,this.canvas.height=a,this.maskCanvas.width=a,this.maskCanvas.height=a},b.prototype.update=function(){var a=this.ctx,b=this.canvas.width,c=this.video.videoWidth,d=this.video.videoHeight,e=Math.min(c,d);this.ctx.drawImage(this.video,(c-e)/2,(d-e)/2,e,e,0,0,b,b),this.showColor&&(a.fillStyle=this.color,a.beginPath(),a.arc(b/2,b/2,b/3,0,2*Math.PI),a.rect(b,0,-1*b,b),a.fill()),this.requestId=window.requestAnimationFrame(this.update.bind(this))};var c=function(){var a=Math.floor(256*Math.random()),b=Math.floor(256*Math.random()),c=Math.floor(256*Math.random());return"rgba("+a+", "+b+", "+c+", 1)"};b.prototype.start=function(){$(".count-pane-wrapper").addClass("active"),setTimeout(function(){$(".count-pane-wrapper").removeClass("active")},2e3),this.color=c(),this.showColor=!0},a.GameView=b}(window.CP=window.CP||{}),function(){"use strict";var a=new window.CP.Camera(null,function(){a.initialize()}),b=new window.CP.GameView(document.getElementById("game_view"),a.getElement());$(".change-camera").on("click",function(){a.changeCamera()}),$(".start-game").on("click",function(){b.start()})}();