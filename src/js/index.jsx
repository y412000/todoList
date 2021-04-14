import List from './item.jsx';
import '../scss/main.scss';

const todos = [{
  createTime: '2020/4/11',
  content: '代辦事項一',
  priority: 'high',
  fulfill: false,
  updateTime: ''
},
{
  createTime: '2020/4/12',
  content: '代辦事項二',
  priority: 'medium',
  fulfill: false,
  updateTime: ''
},
{
  createTime: '2020/4/13',
  content: '代辦事項三',
  priority: 'low',
  fulfill: false,
  updateTime: ''
}];

window._uuid = () => {
  var d = Date.now();
  if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
    d += performance.now(); //use high-precision timer if available
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

ReactDOM.render(
  <List type="pend" items={todos}/>,
  document.getElementById('main')
);