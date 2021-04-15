import * as Btn from './button.jsx';

class ListItem extends React.Component {
  render() {
    const item = this.props.item;
    const type = this.props.type;
    return (
      <li className={`${type}__item`}>

        {item.fulfill ?
          <ins className="updateTime">{item.updateTime}</ins> :
          <ins className="createTime">{item.createTime}</ins>
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
      <div>
        <h3 className="title">{this.props.title}</h3>
        <ul className={`${this.props.type}__list`}>{allItems}</ul>
      </div>
    )
  }
}


export default List;