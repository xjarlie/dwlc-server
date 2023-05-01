const rows = document.querySelectorAll('tr');
const data = {}
for (const row in rows) {
    if (row === 0) continue;
    if (!rows[row].querySelectorAll) break;
    const cells = rows[row].querySelectorAll('td');
    for (const cell in cells) {
        if (cell == 1) {
            //console.log('NAME:', cells[cell].children[0].textContent.trim());
            const name = cells[cell].children[0].textContent.trim();
            const episode = cells[cell-1].textContent;
            data[episode] = name;
        }
    }
}
console.log(JSON.stringify(data));