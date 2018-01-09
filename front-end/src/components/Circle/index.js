import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Circle extends Component {
  componentDidMount() {
    this._updateCanvas();
  }

  componentDidUpdate() {
    this._updateCanvas();
  }

  _updateCanvas() {
    const canvas = this.refs.canvas
    let rect = canvas.parentNode.getBoundingClientRect();
    canvas.width = canvas.height * (canvas.clientWidth / canvas.clientHeight);
    canvas.height = rect.height-50;
    let radius;
    if (canvas.height < canvas.width) {
      radius = canvas.height / 3;
    } else {
      radius = canvas.width / 3;
    }
    if(this.props.number > 0) {
      this._drawPercentageCircle(0, this.props.number, this.props.number.toString(), radius, canvas);
    } else {
      this._drawPercentageCircle(this.props.number, 0, this.props.number.toString(), radius, canvas);
    }
  }

  _degreesToRadians(deg) {
    return (deg/180) * Math.PI;
  }

  _percentToRadians(percentage) {
    let degrees = percentage * 360 / 100;
    return this._degreesToRadians(degrees + 270);
  }

  _drawPercentageCircle(start, percentage, number, radius, canvas) {
    let context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    canvas.style.backgroundColor = this.props.color[0];
    let x = canvas.width / 2;
    let y = canvas.height / 2;
    let startAngle = this._percentToRadians(start);
    let endAngle = this._percentToRadians(percentage);
    // set to true so that we draw the missing percentage
    let counterClockwise = true;
    context.beginPath();
    context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
    context.lineWidth = 15;
    // line color
    context.strokeStyle = this.props.color[1];
    context.stroke();
    // set to false so that we draw the actual percentage
    counterClockwise = false;
    context.beginPath();
    context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
    context.lineWidth = 15;
    // line color
    context.strokeStyle = this.props.color[2];
    context.stroke();
    // now draw the inner text
    context.font = radius/2.5 + "px Helvetica";
    context.fillStyle = this.props.color[3];
    context.textAlign = "center";
    // baseline correction for text
    context.fillText(number + "°C", x, y*1.05);
  }

  render() {

    return(
      <canvas ref="canvas" {...this.props.options} >Canvas not supported by browser</canvas>
    )
  }
}

Circle.propTypes = {
  number: PropTypes.number.isRequired,
  color: PropTypes.array.isRequired,
  options: PropTypes.object,
};

export default Circle;
