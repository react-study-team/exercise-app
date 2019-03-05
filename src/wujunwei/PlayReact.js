import React from 'react';


export default function Empty(props) {
  //JSX 防止注入攻击
  //组件名称必须以大写字母开头。 小写字母开头的组件视为原生 DOM 标签
  //function sum(a, b) {
  //   return a + b;
  // }
  // 纯函数因为该函数不会尝试更改入参，且多次调用下相同的入参始终返回相同的结果。
  // 非纯函数 会改变自己的入参
  // function withdraw(account, amount) {
  //   account.total -= amount;
  // }
  //所有 React 组件都必须像纯函数一样保护它们的 props 不被更改。
  //有一个命名的约定，我们一般把代表事件的的监听 prop 命名为 on[Event]，把处理事件的监听方法命名为 handle[Event] 这样的格式。
  //在类定义组件中，我们使用箭头函数来获取正确的 this 的值。但是在函数式组件中，我们不必担心 this 的问题。
  //React 会通过 key 来自动判断哪些组件需要更新。组件是不能访问到它的 key 的。
  return <Game />
};

function Square(props) {
    return (
      <button className="square" onClick={props.onClick}>
        {/* <button className="square" onClick={alert('click')}>如果去掉箭头函数，每次进入这个组件的时候都会触发*/}
        {props.value}
      </button>
    );
}

class Board extends React.Component {

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />);
  };

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  // constructor(props){
  // 一个构造函数可以使用 super 关键字来调用一个父类的构造函数。
  // 在 JavaScript class 中，每次你定义其子类的构造函数时，都需要调用 super 方法。
  // 因此，在所有含有构造函数的的 React 组件中，构造函数必须以 super(props) 开头。
  // super(props);
  // }
  constructor(props){
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
      stepNumber: 0
    }
  }

  jumpTo = (step) => {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  };

  handleClick = (i) => {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length-1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]){
      return
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({history:history.concat([{
      squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  };

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step,move) => {
      const desc = move ?
        `Go to move #${move}` :
        `Go to game start`;
      return(
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      )
    });

    let status;
    if (winner){
      status = 'Winner:' + winner;
    }else {
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={(i) => this.handleClick(i)}/>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}