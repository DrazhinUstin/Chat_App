export const calcMsgTime = (timestamp) => {
    const date = new Date();
    const msgDate = new Date(timestamp.seconds * 1000);
    const d = msgDate.getDate();
    const m = msgDate.getMonth() + 1;
    const y = msgDate.getFullYear();
    if (d === date.getDate() && m === date.getMonth() + 1 && y === date.getFullYear()) {
        const h = msgDate.getHours();
        const m = msgDate.getMinutes();
        return `${h < 10 ? '0' + h : h}:${m < 10 ? '0' + m : m}`;
    }
    return `${d < 10 ? '0' + d : d}/${m < 10 ? '0' + m : m}/${y}`;
};
