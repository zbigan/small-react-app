
import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  state = {
    value: '',
    disableButton: true,
    answer: ''
  };

  handleChange = (event) => {
    if (event.target.value.length < 1 || event.target.value.length > 10) {
      this.setState({
        value: '',
        disableButton: true
      });
    } else {
      this.setState({
        value: event.target.value,
        disableButton: false
      });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { value } = this.state;
    this.setState({
      value: '',
      disableButton: true
    });
    this.getData(value);
  };

  getData = (value) => {
    axios.get(`http://localhost:3001/api/person/${value}`)
    .then((res) => {
      Promise.all([
        axios.get(`http://localhost:3001/api/facility/${res.data.val1}`),
        axios.get(`http://localhost:3001/api/exposure/${res.data.val2}`)
      ])
      .then(([res2, res3]) => {
        const answer = res2.data.val3 * res3.data.val5;
        this.setState({ answer });
      })
      .catch(err => console.error(err));
    })
    .catch(err => console.error(err));
  }

  render() {
    const { answer, disableButton } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Alphanumeric input 1-10 symbols length:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" disabled={disableButton} />
        </form>
        {
          answer
        }
      </div>
    );
  }
}

export default App;