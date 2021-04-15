import List from './item.jsx';
import '../scss/main.scss';

window._uuid = function () {
  var d = Date.now();
  if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
    d += performance.now(); //use high-precision timer if available
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
};

const todos = [{
  id: _uuid(),
  createTime: '2021/4/11',
  content: '代辦事項一',
  priority: 'high',
  fulfill: true,
  updateTime: '2021/4/12'
},
{
  id: _uuid(),
  createTime: '2021/4/12',
  content: '代辦事項二',
  priority: 'medium',
  fulfill: false,
  updateTime: ''
},
{
  id: _uuid(),
  createTime: '2021/4/13',
  content: '代辦事項三',
  priority: 'low',
  fulfill: false,
  updateTime: ''
},
{
  id: _uuid(),
  createTime: '2021/4/13',
  content: '代辦事項四',
  priority: 'low',
  fulfill: true,
  updateTime: '2021/4/14'
},
{
  id: _uuid(),
  createTime: '2021/4/13',
  content: '代辦事項五',
  priority: 'low',
  fulfill: false,
  updateTime: ''
},
{
  id: _uuid(),
  createTime: '2021/4/13',
  content: '代辦事項六',
  priority: 'low',
  fulfill: false,
  updateTime: ''
}];



class App extends React.Component {
  render() {
    const pends = this.props.items.filter((item) => {
      return !item.fulfill;
    });
    const fulfills = this.props.items.filter((item) => {
      return item.fulfill;
    });

    return (
      <section className="flex item-c">
        <section id="todos" className="flex hor-sa ver-t w_100">
          <List type="pend" items={pends} title="代辦清單" />
          <List type="ful" items={fulfills} title="完成清單" />
        </section>
      </section>

    );
  }
}

ReactDOM.render(
  <App items={todos} />,
  document.getElementById('main')
);