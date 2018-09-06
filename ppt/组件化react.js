
class ToggleButton extends React.Component {
  constructor (props) {
    super(props);
    this.state = {isApproved: false};
  }

  handleClick = () => {
    this.setState(prevState => ({
      isApproved: !prevState.isApproved
    }));
  };

  render () {
    return (
      <button onClick={this.handleClick}>
        {this.state.isApproved ? '下架' : '上架'}
      </button>
    );
  }
}

ReactDOM.render(
  <ToggleButton/>,
  document.getElementById('root')
);


// JSX
<MyButton color="blue" shadowSize={2}>
  Click Me
</MyButton>

// 编译为
React.createElement(
  MyButton,
  {color: 'blue', shadowSize: 2},
  'Click Me'
)

var element = {
  tagName: 'ul', // 节点名
  props: { // DOM的属性
    id: 'list'
  },
  children: [ // 子节点
    {tagName: 'li', props: {class: 'item'}},
    {tagName: 'li', props: {class: 'item'}},
    {tagName: 'li', props: {class: 'item'}}
  ]
}

new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue.js!'
  },
  methods: {
    reverseMessage: function () {
      this.message = this.message.split('').reverse().join('');
    }
  }
});



new Vue({
  el: '#example',
  data: {
    isApproved : false
  },
  computed: {
    state: function () {
      return this.isApproved ? '下架' : '上架'
    }
  },
  methods: {
    update: function () {
      this.isApproved = !this.isApproved;
    }
  }
})
