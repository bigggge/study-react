MobX背后的哲学很简单: 任何源自应用状态的东西都应该自动地获得。其中包括UI、数据序列化、服务器通讯，等等。

## MobX 要点

- 定义状态并使其可观察

```javascript
import {observable} from 'mobx';

var appState = observable({
    timer: 0
});
```
- 创建视图以响应状态的变化

```javascript
import {observer} from 'mobx-react';

@observer
class TimerView extends React.Component {
    render() {
        return (<button onClick={this.onReset.bind(this)}>
                Seconds passed: {this.props.appState.timer}
            </button>);
    }

    onReset () {
        this.props.appState.resetTimer();
    }
};

ReactDOM.render(<TimerView appState={appState} />, document.body);

```

- 更改状态

```javascript
appState.resetTimer = action(function reset() {
    appState.timer = 0;
});

setInterval(action(function tick() {
    appState.timer += 1;
}), 1000);

```

## 概念和原则


### State(状态)

### Derivations(衍生)

衍生以多种形式存在:

-用户界面

-衍生数据，比如剩下的待办事项的数量

-后端集成，比如把变化发送到服务器端

### Actions(动作)

动作是任意一段可以改变状态的代码。
