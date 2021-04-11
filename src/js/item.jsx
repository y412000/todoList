class ListItem extends React.Component {
  render() {
    const item = this.props.item;
    const type = this.props.type;
    return (<li className={`${type}__item`}>
      {type === 'pend' ?
        <ins className="createTime">{item.createTime}</ins> :
        <ins className="updateTime">{item.updateTime}</ins>}
      <span className="content">{item.content}</span>
    </li>);
  }
}

class List extends React.Component {
  render() {
    const type = this.props.type;
    const allItems = this.props.items.map((item) => {
      return <ListItem type={type} item={item} key={_uuid()}/>
    });

    return <ul className={`${this.props.type}__list`}>{allItems}</ul>
  }
}



export default List;