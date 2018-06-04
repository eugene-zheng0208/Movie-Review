export default function sortItems (option, items) {
    if (option === 'vote') {
        items.sort(function (a, b) {
            return b.voteScore - a.voteScore;
        });
    } else if (option === 'time') {
        items.sort(function (a, b) {
            return b.timestamp - a.timestamp;
        });
    }
}
