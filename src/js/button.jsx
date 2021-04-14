
class Close extends React.Component {
  render() {
    return <Std icon="fas fa-times"/>;
  }
}

class Std extends React.Component {
  render() {
    return (
      <button>
        {this.props.frontText}
        <i className={this.props.icon}></i>
        {this.props.backText}
      </button>
    );
  }
}

export { Std, Close };