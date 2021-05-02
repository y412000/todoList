import { isTimeFormat, isTimeValid, escapeHtml } from "./tool.js";
import List from "./item.jsx";
import { Add as Btn_Add, Set as Btn_Set } from "./button.jsx";
import { Add as Popup_Add, Set as Popup_Set } from "./popup.jsx";
import "../scss/main.scss";

const todos = [
  {
    id: _uuid(),
    startTime: 1618116631000,
    content: "代辦事項一",
    priority: "high",
    fulfill: true,
    endTime: 1618186236000,
  },
  {
    id: _uuid(),
    startTime: 1618191176000,
    content: "代辦事項二",
    priority: "medium",
    fulfill: false,
    endTime: "",
  },
  {
    id: _uuid(),
    startTime: 1618226586000,
    content: "代辦事項三",
    priority: "low",
    fulfill: false,
    endTime: "",
  },
  {
    id: _uuid(),
    startTime: 1618244620000,
    content: "代辦事項四",
    priority: "low",
    fulfill: true,
    endTime: 1618560782000,
  },
  {
    id: _uuid(),
    startTime: 1618245081000,
    content: "代辦事項五",
    priority: "low",
    fulfill: false,
    endTime: "",
  },
  {
    id: _uuid(),
    startTime: 1618245232000,
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
        errorMsg: "",
      },
      set: {
        popup: false,
        showPend: true,
        showFul: true,
        showPriority: false,
      },
    };
  }

  noBubbling = (e) => {};

  /**
   * 控制新增彈出視窗開啟或關閉
   * @param {boolean} open 開啟/關閉
   */
  toggle_popup = (type, open) => {
    if (type === "add" && open) {
      this.set_value(type, {
        popup: open,
        time: "",
        content: "",
        priority: "medium",
        errorMsg: "",
      });
    } else {
      this.set_value(type, {
        popup: open,
      });
    }
  };

  /**
   * 更換設置內容
   * @param {string} key 要設置的目標
   * @param {string} value 值
   */
  set_value = (key, value) => {
    this.setState({
      [key]: {
        ...this.state[key],
        ...value,
      },
    });
  };

  // 開啟彈出視窗
  popup_open = (type) => (e) => {
    this.toggle_popup(type, true);
  };

  // 彈出視窗關閉，由於關閉時有動畫，延遲關閉時間
  popup_close = (type) => (e) => {
    setTimeout(() => {
      this.toggle_popup(type, false);
    }, 500);
  };

  // 彈出視窗確認送出
  popup_send = (type) => (e) => {
    const param = this.state.add;

    if (param.errorMsg) {
    } else if (!param.time || !param.content) {
      this.set_value("add", {
        errorMsg: "時間 & 內容為必填項目",
      });
    } else {
      this.appendItem();
      this.popup_close(type);
      return true;
    }
  };

  // 時間改變時確認輸入內容是否正確
  changeTime = (e) => {
    const value = e.target.value;
    const corrFormat = value.length === 0 || isTimeFormat(value);
    const inValid =
      !corrFormat || !isTimeValid(corrFormat[1], corrFormat[2], corrFormat[3]);

    this.set_value("add", {
      time: value,
      errorMsg: inValid ? (!corrFormat ? "時間格式不正確" : "時間不正確") : "",
    });
  };

  // 更改項目清單描述內容
  changeContent = (e) => {
    this.set_value("add", {
      content: escapeHtml(e.target.value),
    });
  };

  // 更改優先度
  changePriority = (e) => {
    this.set_value("add", {
      priority: e.target.value,
    });
  };

  // 更改顯示內容
  changeSet = (e) => {
    this.set_value("set", {
      [e.target.id]: e.target.checked,
    });
  };

  // 添加項目至代辦清單中
  appendItem = () => {
    const param = this.state.add;
    const newItem = {
      id: _uuid(),
      startTime: param.time,
      content: param.content,
      priority: param.priority,
      fulfill: false,
      endTime: "",
    };

    this.setState({
      todos: [...this.state.todos, newItem],
    });
  };

  /**
   * 刪除目標事項
   * @param {string} id 目標項目的 ID
   */
  deleteItem = (id) => {
    this.setState({
      todos: this.state.todos.filter((item) => {
        return item.id !== id;
      })
    });
  };

  /**
   * 目標事項完成
   * @param {string} id 目標項目的 ID
   */
  fulfillItem = (id) => {
    this.setState({
      todos: this.state.todos.map((item) => {
        if (item.id === id) {
          item.endTime = Date.now();
          item.fulfill = true;
        }

        return item;
      }),
    });
  };

  /**
   * 目標事項取消完成
   * @param {string} id 目標項目的 ID
   */
  revokeItem = (id) => {
    this.setState({
      todos: this.state.todos.map((item) => {
        item.fulfill = item.id === id ? false : item.fulfill;
        return item;
      }),
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
      <section className="flex dir-c w_100 h_100">
        <header className="flex hor-r w_100">
          <Btn_Add className="add_todo" click={this.popup_open("add")} />
          <Btn_Set className="set_todo" click={this.popup_open("set")} />
        </header>
        <main className="flex w_100 h_100">
          <section
            id="todos"
            className="todo flex wrap item-t hor-sa ver-t w_100"
          >
            {this.state.set.showPend && (
              <List
                type="pend"
                items={pends}
                title="代辦清單"
                showPriority={this.state.set.showPriority}
                deleteItem={this.deleteItem}
                fulfillItem={this.fulfillItem}
              />
            )}
            {this.state.set.showFul && (
              <List
                type="ful"
                items={fulfills}
                title="完成清單"
                showPriority={this.state.set.showPriority}
                deleteItem={this.deleteItem}
                revokeItem={this.revokeItem}
              />
            )}
          </section>
        </main>
        {this.state.add.popup && (
          <Popup_Add
            confirm={this.popup_send("add")}
            close={this.popup_close("add")}
            noBubbling={this.noBubbling}
            changeTime={this.changeTime}
            changeContent={this.changeContent}
            changePriority={this.changePriority}
            param={this.state.add}
          />
        )}
        {this.state.set.popup && (
          <Popup_Set
            close={this.popup_close("set")}
            noBubbling={this.noBubbling}
            changeSet={this.changeSet}
            param={this.state.set}
          />
        )}
      </section>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("main"));
