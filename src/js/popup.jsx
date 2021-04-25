import { Std as Btn, Times as Close } from "./button.jsx";

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
    };

    this.noBubbling = this.noBubbling.bind(this);
    this.confirm = this.confirm.bind(this);
    this.close = this.close.bind(this);
  }

  // 取消往下傳遞狀況
  noBubbling(e) {
    e.stopPropagation();
    this.props.noBubbling;
  }

  // 確認送出
  confirm() {
    !!this.props.confirm() && this.setState({ show: false });
  }

  // 取消/關閉畫面
  close() {
    this.setState({ show: false });
    this.props.close();
  }

  render() {
    return (
      <section
        id="popup"
        className={`pop w_100 h_100 flex 
		${this.state.show ? "pop-show" : "pop-hide"}
		`}
        onClick={this.close}
      >
        <section
          className="pop__container flex dir-c"
          onClick={this.noBubbling}
        >
          <Close className="pop__close" click={this.close} />
          <div className="pop__title">
            {this.props.title && <h2 className="title">{this.props.title}</h2>}
          </div>

          <div className="pop__content">{this.props.children}</div>
          {this.props.errorMsg && (
            <div className="pop__reminder w_100 flex">
              <i className="fas fa-exclamation-circle"></i>
              <p className="title">{this.props.errorMsg}</p>
            </div>
          )}

          <div className="pop__footer w_100 flex">
            {this.props.showConfirm && <Btn_confirm click={this.confirm} />}
            {this.props.showCancel && <Btn_cancel click={this.close} />}
          </div>
        </section>
      </section>
    );
  }
}

class Btn_confirm extends React.Component {
  render() {
    return (
      <Btn
        className="pop__confirm"
        backText="確認"
        click={this.props.click}
      ></Btn>
    );
  }
}

class Btn_cancel extends React.Component {
  render() {
    return (
      <Btn
        className="pop__cancel"
        backText="取消"
        click={this.props.click}
      ></Btn>
    );
  }
}

class Add extends React.Component {
  render() {
    const param = this.props.param;
console.log(this.props)
    return (
      <Popup
        title="新增代辦事項"
        showConfirm={true}
        showCancel={true}
        confirm={this.props.confirm}
        close={this.props.close}
        errorMsg={param.errorMsg}
      >
        <div className="form flex dir-c item-t">
          <div className="form__item">
            <label htmlFor="startDate">起始日期</label>
            <input
              id="startDate"
              placeholder="YYYY/MM/DD"
              onChange={this.props.changeTime}
              value={param.time}
            ></input>
          </div>
          <div className="form__item">
            <label htmlFor="todo_ctn">內容</label>
            <input
              id="todo_ctn"
              onChange={this.props.changeContent}
              value={param.content}
            ></input>
          </div>
          <div className="form__item">
            <label htmlFor="todo_ctn">優先度</label>
            <select
              id="todo_pri"
              value={param.priority}
              onChange={this.props.changePriority}
            >
              <option value="high">高</option>
              <option value="medium">中</option>
              <option value="low">低</option>
            </select>
          </div>
        </div>
      </Popup>
    );
  }
}

export { Popup, Add };
