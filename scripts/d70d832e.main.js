!function(){"use strict";navigator.getUserMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia;var a=document.getElementsByClassName("change-camera"),b=document.getElementById("video"),c=[],d=[],e=null,f=null,g=null,h=!1,i=function(a){for(var b=0;b!==a.length;++b){var g=a[b];"video"===g.kind?c.push(g.id):"audio"===g.kind&&d.push(g.id)}c.length&&(e=c.length-1),d.length&&(f=0),m()},j=function(){var a=c.length;a&&(e=(e+1)%a),m()},k=function(a){g=a,b.src=window.URL.createObjectURL(g),b.play()},l=function(a){console.log("navigator.getUserMedia error: ",a)},m=function(){g&&(b.src=null,g.stop());var a=null;if(h){var i=d[f],j=c[e];a={audio:{optional:[{sourceId:i}]},video:{optional:[{sourceId:j}]}}}else a={audio:!0,video:!0};navigator.getUserMedia(a,k,l)};"undefined"==typeof window.MediaStreamTrack||"undefined"==typeof window.MediaStreamTrack.getSources?(window.alert("This browser does not support MediaStreamTrack.\n\nTry Chrome Canary."),m()):(h=!0,window.MediaStreamTrack.getSources(i),a[0].onclick=j)}();