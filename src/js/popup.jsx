import { Std as Btn, Times as Close } from './button.jsx';

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true
    };

    this.noBubbling = this.noBubbling.bind(this);
    this.close = this.close.bind(this);
  }

  noBubbling(e) {
    e.stopPropagation();
    this.props.noBubbling;
  }

  close() {
    this.setState({ show: false });
    this.props.close();
  }

  render() {
    return (
      <section id="popup" className={`pop w_100 h_100 flex ${this.state.show ? 'pop-show' : 'pop-hide'}`} onClick={this.close}>
        <section className="pop__container flex dir-c" onClick={this.noBubbling}>
          <Close className="pop__close" click={this.close} />
          <div className="pop__title">
            {this.props.title && <h2 className="title">{this.props.title}</h2>}
          </div>

          <div className="pop__content">
            {this.props.children}
          </div>
          {this.props.error &&
            <div className="pop__reminder w_100 flex">
              <i className="fas fa-exclamation-circle"></i>
              <p className="title">{this.props.error}</p>
            </div>
          }

          <div className="pop__footer w_100 flex">
            {this.props.confirm && <Btn_confirm />}
            {this.props.cancel && <Btn_cancel click={this.close} />}
          </div>


        </section>
      </section>
    );
  }
}

class Btn_confirm extends React.Component {
  render() {
    return (
      <Btn className="pop__confirm" backText="確認" click={this.props.click}></Btn>
    );
  }
}

class Btn_cancel extends React.Component {
  render() {
    return (
      <Btn className="pop__cancel" backText="取消" click={this.props.click}></Btn>
    );
  }
}


class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: '',
      content: '',
      error: ''
    };

    this.changeTime = this.changeTime.bind(this);
    this.changeCtn = this.changeCtn.bind(this);
  }


  changeTime(e) {
    const value = e.target.value;
    const reg = new RegExp(/^([1-9]\d{3})\/(0[1-9]|1[0-2])\/(0[1-9]|[1-2][0-9]|3[0-1])$/);
    const formatTime = value.match(reg);
    const isValid = !!formatTime && isTimeValid(formatTime[1], formatTime[2], formatTime[3]);
    console.log(isValid)
    if ((formatTime && isValid) || value.length === 0) {
      this.setState({
        time: e.target.value,
        error: ''
      });
    }
    else {
      this.setState({
        time: e.target.value,
        error: !formatTime ? '格式不正確' : '時間不正確'
      });
    }
  }

  changeCtn(e) {
    this.setState({ content: escapeHtml(e.target.value) });
  }

  render() {
    return (
      <Popup title="新增代辦事項" confirm={true} cancel={true} close={this.props.close} error={this.state.error}>
        <div className="form flex dir-c item-t">
          <div className="form__item">
            <label htmlFor="startDate">起始日期</label>
            <input id="startDate" placeholder="YYYY/MM/DD" onChange={this.changeTime} value={this.state.time}></input>
          </div>
          <div className="form__item">
            <label htmlFor="todo_ctn">內容</label>
            <input id="todo_ctn" onChange={this.changeCtn} value={this.state.content}></input>
          </div>
        </div>
      </Popup>
    );
  }
}

function isTimeValid(y, m, d) {
  const date = new Date(`${y}/${m}/${d}`);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return year == y && month == parseInt(m) && day == parseInt(d);
}

function escapeHtml(unsafe) {
  return unsafe
       .replace(/&/g, "&amp;")
       .replace(/</g, "&lt;")
       .replace(/>/g, "&gt;")
       .replace(/"/g, "&quot;")
       .replace(/'/g, "&#039;");
}

export { Popup, Add };