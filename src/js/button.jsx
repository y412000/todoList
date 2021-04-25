class Times extends React.Component {
  render() {
    return (
      <Std
        className={this.props.className}
        icon="fas fa-times"
        click={this.props.click}
      />
    );
  }
}

class Check extends React.Component {
  render() {
    return (
      <Std
        className={this.props.className}
        icon="fas fa-check"
        click={this.props.click}
      />
    );
  }
}

class Redo extends React.Component {
  render() {
    return (
      <Std
        className={this.props.className}
        icon="fas fa-reply"
        click={this.props.click}
      />
    );
  }
}

class Add extends React.Component {
  render() {
    return (
      <Std
        className={this.props.className}
        icon="fas fa-plus"
        backText="新增"
        click={this.props.click}
      />
    );
  }
}

class Std extends React.Component {
  render() {
    return (
      <button className={this.props.className} onClick={this.props.click}>
        {this.props.frontText}
        <i className={this.props.icon}></i>
        {this.props.backText}
      </button>
    );
  }
}

export { Std, Check, Times, Redo, Add };
