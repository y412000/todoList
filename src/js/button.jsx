
class Times extends React.Component {
  render() {
    return <Std icon="fas fa-times"/>;
  }
}

class Check extends React.Component {
  render() {
    return <Std icon="fas fa-check"/>;
  }
}

class Redo extends React.Component {
  render() {
    return <Std icon="fas fa-reply"/>;
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

export { Std, Check, Times, Redo };