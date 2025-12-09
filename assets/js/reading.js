document.addEventListener('DOMContentLoaded', () => {
    const drawBtn = document.getElementById('draw-btn');
    const slotsContainer = document.getElementById('slots-container');
    const box = document.getElementById('interpretation');
    const readingText = document.getElementById('reading-text');
    const shareBtn = document.getElementById('share-whatsapp');

    drawBtn.addEventListener('click', startReading);

    function startReading() {
        // Reset Visuals
        drawBtn.disabled = true;
        drawBtn.innerText = "Embaralhando...";
        box.style.display = 'none';

        // Reset Cards (Flip back)
        document.querySelectorAll('.tarot-card').forEach(c => {
            c.classList.remove('flipped');
            // Clear content after flip animation to avoid visual glitch
            setTimeout(() => {
                c.querySelector('.front').innerHTML = '';
            }, 400);
        });

        // 1. Shuffle Logic (Fisher-Yates)
        const deck = [...tarotData];
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }

        // 2. Select 3 Cards
        const selected = deck.slice(0, 3); // Past, Present, Future

        // 3. Animation Sequence with Delays
        setTimeout(() => {
            drawBtn.innerText = "Revelando...";
            revealCard('card-past', selected[0], 0);
            revealCard('card-present', selected[1], 1000);
            revealCard('card-future', selected[2], 2000);

            // 4. Show Interpretation
            setTimeout(() => {
                showInterpretation(selected);
                drawBtn.innerText = "Nova Leitura";
                drawBtn.disabled = false;
            }, 3000);
        }, 1000);
    }

    function revealCard(elementId, card, delay) {
        setTimeout(() => {
            const cardEl = document.getElementById(elementId);
            const frontEl = cardEl.querySelector('.front');
            frontEl.innerHTML = `<img src="${card.img}" alt="${card.name}">`;
            cardEl.classList.add('flipped');
        }, delay);
    }

    function showInterpretation(cards) {
        const [past, present, future] = cards;

        const text = `
            <p><strong>Passado (${past.name}):</strong> ${past.meaning}</p>
            <p><strong>Presente (${present.name}):</strong> ${present.meaning}</p>
            <p><strong>Futuro (${future.name}):</strong> ${future.meaning}</p>
            <hr style="border:0; border-top:1px solid var(--accent); margin:1rem 0;">
            <p><em>Conselho:</em> As energias de ${present.name} sugerem foco em ${present.keywords[0]} para alcançar a vibração de ${future.name}.</p>
        `;

        readingText.innerHTML = text;
        box.style.display = 'block';

        // Setup Share Link
        const shareText = `🔮 *Minha Leitura de Tarô - Arcanum* 🔮%0A%0A` +
            `⬅️ *Passado:* ${past.name} - ${past.keywords[0]}%0A` +
            `⬇️ *Presente:* ${present.name} - ${present.keywords[0]}%0A` +
            `➡️ *Futuro:* ${future.name} - ${future.keywords[0]}%0A%0A` +
            `Descubra seu destino em: arcanum-taro.com`;

        shareBtn.href = `https://wa.me/?text=${shareText}`;
    }
});
