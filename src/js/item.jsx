import * as Btn from './button.jsx';

class ListItem extends React.Component {
  render() {
    const item = this.props.item;
    const type = this.props.type;
    return (
      <li className={`${type}__item`}>

        {item.fulfill ?
          <time className="endTime">{item.endTime}</time> :
          <time className="startTime">{item.startTime}</time>
        }
        <span className="content">{item.content}</span>

        {
          type === 'pend' ? <Btn.Check /> :
            type === 'ful' ? <Btn.Redo /> : null
        }

        <Btn.Times />

      </li>
    );
  }
}


class List extends React.Component {
  render() {
    const type = this.props.type;
    const allItems = this.props.items.map((item) => {
      return <ListItem type={type} item={item} key={_uuid()} />
    });

    return (
      <div className="todo__item flex dir-c">
        <h3 className="title">{this.props.title}</h3>
        <ul className={`${this.props.type}__list`}>{allItems}</ul>
      </div>
    )
  }
}


export default List;