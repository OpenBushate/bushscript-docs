(function(){var b=document.querySelector(".bar");function f(){document.documentElement.style.setProperty("--bar",b.offsetHeight+"px")}f();addEventListener("resize",f);if(document.fonts&&document.fonts.ready)document.fonts.ready.then(f)})();
(function(){
  var chars="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");
  var fontSize=16,canvas=document.getElementById("matrix"),ctx=canvas.getContext("2d"),matrix=[];
  function fit(){
    canvas.width=window.innerWidth;canvas.height=window.innerHeight;
    var columns=Math.floor(canvas.width/fontSize);matrix=[];
    for(var i=0;i<columns;i++)matrix[i]=1;
    ctx.fillStyle="#000";ctx.fillRect(0,0,canvas.width,canvas.height);
  }
  function drawMatrix(){
    ctx.fillStyle="rgba(0, 0, 0, 0.05)";ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle="rgba(128, 255, 128, 0.8)";ctx.font=fontSize+"px monospace";
    for(var i=0;i<matrix.length;i++){
      var text=chars[Math.floor(Math.random()*chars.length)];
      ctx.fillText(text,i*fontSize,matrix[i]*fontSize);
      if(matrix[i]*fontSize>canvas.height&&Math.random()>0.975)matrix[i]=0;
      matrix[i]++;
    }
  }
  fit();
  var still=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.addEventListener("resize",function(){fit();if(still)for(var k=0;k<200;k++)drawMatrix()});
  if(still){for(var k=0;k<200;k++)drawMatrix();return}
  var last=0;
  function animateMatrix(t){requestAnimationFrame(animateMatrix);if(t-last<25)return;last=t;drawMatrix()}
  requestAnimationFrame(animateMatrix);
})();
document.querySelectorAll('.copy').forEach(function(b){
  b.addEventListener('click',function(){
    var pre=b.parentNode.querySelector('pre');
    var done=function(){b.textContent='Copied';setTimeout(function(){b.textContent='Copy'},1500)};
    if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(pre.innerText).then(done,function(){})}
    else{var r=document.createRange();r.selectNodeContents(pre);var s=getSelection();s.removeAllRanges();s.addRange(r);try{document.execCommand('copy');done()}catch(e){}}
  });
});
