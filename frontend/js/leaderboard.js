// Leaderboard functionality
let leaderboardData = JSON.parse(localStorage.getItem('leaderboard')) || [];

function saveScore(category, score) {
    const playerName = localStorage.getItem('username') || 'Anonymous';
    leaderboardData.push({
        player: playerName,
        score: score,
        category: category,
        timestamp: Date.now()
    });
    
    leaderboardData.sort((a, b) => b.score - a.score);
    localStorage.setItem('leaderboard', JSON.stringify(leaderboardData));
    updateLeaderboard();
}

function updateLeaderboard() {
    const categoryFilter = document.getElementById('category-filter').value;
    const filteredData = categoryFilter === 'all' 
        ? leaderboardData 
        : leaderboardData.filter(entry => entry.category === categoryFilter);
    
    const tbody = document.getElementById('leaderboard-body');
    tbody.innerHTML = '';
    
    filteredData.forEach((entry, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${entry.player}</td>
            <td>${entry.score}</td>
            <td>${entry.category}</td>
        `;
        tbody.appendChild(row);
    });
}

document.getElementById('category-filter')?.addEventListener('change', updateLeaderboard);

// Initial load
updateLeaderboard();