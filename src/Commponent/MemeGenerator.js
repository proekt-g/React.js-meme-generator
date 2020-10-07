import React, { Component } from "react";

class MemeGenerator extends Component {
  constructor() {
    super();
    this.state = {
      topText: "",
      bottomText: "",
      randomImage: "http://i.imgflip.com/1bij.jpg",
      allMemeImgs: [],
    };
    this.onChange = this.onChange.bind(this);
    this.changeImg = this.changeImg.bind(this);
  }
  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((response) => {
        const { memes } = response.data;
        this.setState({ allMemeImgs: memes });
      });
  }
  onChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }
  changeImg(event) {
    event.preventDefault();
    this.setState({ randomImage: this.state.allMemeImgs[Math.floor(Math.random() * 100)].url });
  }
  render() {
    return (
      <div>
        <form className="meme-form">
          <input type="text" name="topText" onInput={this.onChange} placeholder="TOP Text" />
          <input type="text" name="bottomText" onInput={this.onChange} placeholder="BOTTOM Text" />

          <button onClick={this.changeImg}>Gen</button>
        </form>
        <div className="meme">
          <img align="center" src={this.state.randomImage} alt="" />
          <h2 className="top">{this.state.topText}</h2>
          <h2 className="bottom">{this.state.bottomText}</h2>
        </div>
      </div>
    );
  }
}

export default MemeGenerator;
