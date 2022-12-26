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

export const cutString = (string, maxLength = 20) => {
    if (string.length <= maxLength) return string;
    return `${string.slice(0, maxLength - 3)}...`;
};

export const validateFile = (file, maxSize = 1e6) => {
    if (!file) return null;
    const fileTypes = ['image/png', 'image/jpg', 'image/jpeg'];
    if (!fileTypes.find((type) => type === file.type)) {
        throw new Error(`${file.type} type is invalid. Valid file types: ${fileTypes.join(', ')}`);
    }
    if (file.size > maxSize) {
        throw new Error(`File is too big. Max valid file size is ${maxSize / 1e6}MB`);
    }
    return file;
};
