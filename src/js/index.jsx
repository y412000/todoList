import { isTimeFormat, isTimeValid, escapeHtml } from "./tool.js";
import List from "./item.jsx";
import { Add as Btn_Add } from "./button.jsx";
import { Add as Popup_Add } from "./popup.jsx";
import "../scss/main.scss";

const todos = [
  {
    id: _uuid(),
    startTime: "2021/4/11",
    content: "代辦事項一",
    priority: "high",
    fulfill: true,
    endTime: "2021/4/12",
  },
  {
    id: _uuid(),
    startTime: "2021/4/12",
    content: "代辦事項二",
    priority: "medium",
    fulfill: false,
    endTime: "",
  },
  {
    id: _uuid(),
    startTime: "2021/4/13",
    content: "代辦事項三",
    priority: "low",
    fulfill: false,
    endTime: "",
  },
  {
    id: _uuid(),
    startTime: "2021/4/13",
    content: "代辦事項四",
    priority: "low",
    fulfill: true,
    endTime: "2021/4/14",
  },
  {
    id: _uuid(),
    startTime: "2021/4/13",
    content: "代辦事項五",
    priority: "low",
    fulfill: false,
    endTime: "",
  },
  {
    id: _uuid(),
    startTime: "2021/4/13",
    content: "代辦事項六",
    priority: "low",
    fulfill: false,
    endTime: "",
  },
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: todos,
      add: {
        popup: false,
        time: "",
        content: "",
        priority: "medium",
        errorMsg: ""
      },
    };
  }

  noBubbling = (e) => {};

  /**
   * 控制新增彈出視窗開啟或關閉
   * @param {boolean} open 開啟/關閉
   */
  open_add = (open) => {
    this.setState({
      add: {
        ...this.state.add,
        popup: open,
      },
    });
  };

  /**
   * 更換設置內容
   * @param {string} key 要設置的目標
   * @param {string} value 值
   */
  set_value = (setting) => {
    this.setState({
      add: {
        ...this.state.add,
        ...setting,
      },
    });
  };

  // 開啟彈出視窗
  popup_open = () => {
    this.open_add(true);
  };

  // 彈出視窗關閉，由於關閉時有動畫，延遲關閉時間
  popup_close = () => {
    setTimeout(() => {
      this.open_add(false);
    }, 500);
  };

  // 彈出視窗確認送出
  popup_send = () => {
    const param = this.state.add;

    if (param.errorMsg) {
    } else if (!param.time || !param.content) {
      this.set_value({
        errorMsg: "時間 & 內容為必填項目"
      });
    } else {
      this.appendItem();
      this.popup_close();
      return true;
    }
  };

  // 時間改變時確認輸入內容是否正確
  changeTime = (e) => {
    const value = e.target.value;
    const corrFormat = value.length === 0 || isTimeFormat(value);
    const inValid =
      !corrFormat || !isTimeValid(corrFormat[1], corrFormat[2], corrFormat[3]);

    this.set_value({
      time: value,
      errorMsg: inValid ? (!corrFormat ? "時間格式不正確" : "時間不正確") : "",
    });
  };

  // 更改項目清單描述內容
  changeContent = (e) => {
    this.set_value({
      content: escapeHtml(e.target.value)
    });
  };

  changePriority = (e) => {
    this.set_value({
      priority: e.target.value
    });
  }

  appendItem = () => {
    const param = this.state.add;
    todos.push({
      id: _uuid(),
      startTime: param.time,
      content: param.content,
      priority: param.priority,
      fulfill: false,
      endTime: "",
    });
  };

  render() {
    const pends = this.state.todos.filter((item) => {
      return !item.fulfill;
    });
    const fulfills = this.state.todos.filter((item) => {
      return item.fulfill;
    });

    return (
      <section className="flex w_100 h_100">
        <Btn_Add className="add_todo" click={this.popup_open} />
        <main className="flex w_100">
          <section
            id="todos"
            className="todo flex wrap item-t hor-sa ver-t w_100"
          >
            <List type="pend" items={pends} title="代辦清單" />
            <List type="ful" items={fulfills} title="完成清單" />
          </section>
        </main>
        {this.state.add.popup && (
          <Popup_Add
            confirm={this.popup_send}
            close={this.popup_close}
            noBubbling={this.noBubbling}
            changeTime={this.changeTime}
            changeContent={this.changeContent}
            changePriority={this.changePriority}
            param={this.state.add}
          />
        )}
      </section>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("main"));
