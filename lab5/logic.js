 const modal = document.getElementById('modal');
        const mTitle = document.getElementById('m-title');
        const mText = document.getElementById('m-text');
        document.addEventListener('click', e => {
            const btn = e.target.closest('.btn');
            if (btn) { mTitle.textContent = btn.dataset.title; mText.textContent = btn.dataset.text; modal.classList.add('open'); }
            if (e.target === modal) modal.classList.remove('open');
        });
        document.addEventListener('keydown', e => { if (e.key === 'Escape') modal.classList.remove('open'); });