module.exports = class Question {
  constructor(text) {
    this.text = text;
  }

  getText = () => {
    return this.text;
  };

  setText = (text) => {
    this.text = text;
  };
};
