const isVarified = true;
function getTimeString(time) {
    const hour = parseInt(time / 3600);
    const remainingSecond = time % 3600;
    const minute = parseInt(remainingSecond / 60);
    const second = remainingSecond % 60;
    return `${hour} hour ${minute}m ${second} ago`
}

console.log(getTimeString(6967));