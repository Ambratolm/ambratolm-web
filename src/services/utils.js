export default {
  arr(text, divider = ",", trim = true) {
    let arr = text.split(divider);
    return trim ? arr.map(item => item.trim()) : arr;
  },
  img(name, defName, dirName) {
    const baseDirName = "assets/images";
    const emptyName = "empty.png";
    const errorName = "error.png";
    let path = baseDirName;
    path += dirName ? `/${dirName}` : "";
    path += name ? `/${name}` : defName ? `/${defName}` : `/${emptyName}`;
    let file = "";
    try {
      file = require(`@/${path}`);
    } catch (e) {
      console.error(e.message);
      file = require(`@/${baseDirName}/${errorName}`);
    }
    return file;
  },
  vid(name, defName, dirName) {
    const baseDirName = "assets/videos";
    const emptyName = "placeholder-muted.mp4";
    const errorName = "placeholder-muted.mp4";
    let path = baseDirName;
    path += dirName ? `/${dirName}` : "";
    path += name ? `/${name}` : defName ? `/${defName}` : `/${emptyName}`;
    let file = "";
    try {
      file = require(`@/${path}`);
    } catch (e) {
      console.error(e.message);
      file = require(`@/${baseDirName}/${errorName}`);
    }
    return file;
  },
  shuffle(array) {
    let resultArray = [...array];
    for (let i = resultArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [resultArray[i], resultArray[j]] = [resultArray[j], resultArray[i]];
    }
    return resultArray;
  }
};
