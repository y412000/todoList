import List from "./item.jsx";
import { Add as Btn_Add } from "./button.jsx";
import { Add as Popup_Add } from "./popup.jsx";
import "../scss/main.scss";

window._uuid = function () {
  var d = Date.now();
  if (
    typeof performance !== "undefined" &&
    typeof performance.now === "function"
  ) {
    d += performance.now(); //use high-precision timer if available
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
};

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
      popup_add: false,
    };

    this.popup_open = this.popup_open.bind(this);
    this.popup_close = this.popup_close.bind(this);
    this.noBubbling = this.noBubbling.bind(this);
  }

  popup_open() {
    this.setState({ popup_add: true });
  }

  popup_close() {
    setTimeout(() => {
      this.setState({ popup_add: false });
    }, 500);
  }

  popup_send() {}

  noBubbling(e) {}

  render() {
    const pends = this.props.items.filter((item) => {
      return !item.fulfill;
    });
    const fulfills = this.props.items.filter((item) => {
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
        {this.state.popup_add && (
          <Popup_Add close={this.popup_close} noBubbling={this.noBubbling} />
        )}
      </section>
    );
  }
}

ReactDOM.render(<App items={todos} />, document.getElementById("main"));
