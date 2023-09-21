const capitalizeEachWord = str => {
  const stringToCorrect = str
    .toLowerCase()
    .split(' ')
    .map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');

  return stringToCorrect;
};

export default capitalizeEachWord;
