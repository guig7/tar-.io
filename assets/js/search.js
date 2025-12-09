document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('cards-grid');
    const searchInput = document.getElementById('search-input');

    // 1. Initial Render
    renderCards(tarotData);

    // 2. Search Listener
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = tarotData.filter(card =>
            card.name.toLowerCase().includes(query) ||
            card.meaning.toLowerCase().includes(query) ||
            card.keywords.some(k => k.toLowerCase().includes(query))
        );
        renderCards(filtered);
    });

    // Function to render cards to DOM
    function renderCards(cards) {
        grid.innerHTML = '';
        if (cards.length === 0) {
            grid.innerHTML = '<p style="text-align:center; col-span:3;">Nenhuma carta encontrada.</p>';
            return;
        }

        cards.forEach(card => {
            const el = document.createElement('div');
            el.className = 'card-item';
            el.innerHTML = `
                <img src="${card.img}" alt="${card.name}" loading="lazy">
                <div class="card-info">
                    <h3>${card.name}</h3>
                    <p style="font-size:0.9rem; color:var(--text-secondary);">${card.keywords.join(' • ')}</p>
                </div>
            `;
            grid.appendChild(el);
        });
    }
});
