 document.addEventListener('DOMContentLoaded',function(){
        const menu=document.querySelector('.menu');
        menu.addEventListener('click',function(e){
          const a=e.target.closest('a');
          if(!a) return;
          e.preventDefault();
          menu.querySelectorAll('li').forEach(li=>li.classList.remove('active'));
          a.parentElement.classList.add('active');
        });
      });