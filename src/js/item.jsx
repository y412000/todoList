import * as Btn from "./button.jsx";
import { getDate } from "./tool.js";

class ListItem extends React.Component {
  // 回傳 目標ID 並 進行刪除
  deleteItem = () => {
    this.props.deleteItem(this.props.item.id);
  };

  // 回傳 目標ID 並 進行刪除
  fulfillItem = () => {
    this.props.fulfillItem(this.props.item.id);
  };

  // 更改項目的狀態(刪除/完成/未完成)
  changeState = (action) => (e) => {
    this.props[action](this.props.item.id);
  };

  render() {
    const item = this.props.item;
    const type = this.props.type;
    const priority = this.props.showPriority ? `todo__${item.priority}` : '';
    
    return (
      <li className={`${type}__item ${priority}`}>
        {item.fulfill ? (
          <time className="todo__time endTime">{getDate(item.endTime)}</time>
        ) : (
          <time className="todo__time startTime">
            {getDate(item.startTime)}
          </time>
        )}
        <span className="todo__ctn content">{item.content}</span>

        <div className="todo__btnWrap">
          {type === "pend" ? (
            <Btn.Check click={this.changeState("fulfillItem")} />
          ) : type === "ful" ? (
            <Btn.Redo click={this.changeState("revokeItem")} />
          ) : null}

          <Btn.Times click={this.changeState("deleteItem")} />
        </div>
      </li>
    );
  }
}

class List extends React.Component {
  render() {
    const type = this.props.type;
    const allItems = this.props.items.map((item) => {
      return (
        <ListItem
          type={type}
          item={item}
          key={_uuid()}
          showPriority={this.props.showPriority}
          deleteItem={this.props.deleteItem}
          fulfillItem={this.props.fulfillItem}
          revokeItem={this.props.revokeItem}
        />
      );
    });

    return (
      <div className="todo__item flex dir-c">
        <h3 className="title">{this.props.title}</h3>
        <ul className={`${this.props.type}__list`}>{allItems}</ul>
      </div>
    );
  }
}

export default List;
