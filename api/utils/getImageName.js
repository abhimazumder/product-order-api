function getImageName(url){
    const bits = url.split("/");
    const imageName = bits[bits.length - 1];
    return imageName;
}

module.exports = getImageName;