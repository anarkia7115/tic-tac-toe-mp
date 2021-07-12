// components/game/game.js

type SquareValue = "X"|"O"|undefined

interface IState {
  history: {squares: SquareValue[]}[]
  stepNumber: number
  xIsNext: boolean
}

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    state: <IState>{
      history: [
          {
            squares: Array(9).fill(null)
          }
        ],
      stepNumber: 0,
      xIsNext: true, 
    },

    // derived
    moveDescs: <string[]>[],
    status: "",
    squares: <SquareValue[]>[]

  },

  /**
   * 组件的方法列表
   */
  methods: 
  {
    _setState(newState:Partial<IState>) {
      this.setData(
        {state:{...this.data.state, ...newState}})

    },

    handleSquareTap(e:{detail:{squareid:number}}) {
      const i = e.detail.squareid;
      const history = this.data.state.history.slice(0, this.data.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if (this.calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.data.state.xIsNext ? "X" : "O";
      this._setState({
        history: history.concat([
          {
            squares: squares
          }
        ]),
        stepNumber: history.length,
        xIsNext: !this.data.state.xIsNext
      });
    },

    jumpTo(e:{target:{dataset:{step:number}}}) {
      const {step} = e.target.dataset;
      this._setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0
      });
    },

    calculateWinner(squares:SquareValue[]) {
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return squares[a];
        }
      }
      return null;
    }
  }, 

  observers: {
    "state.**": function() {  // derived data
      const history = this.data.state.history;
      const current = history[this.data.state.stepNumber];
      const winner = this.calculateWinner(current.squares);

      const moveDescs = history.map((_, move) => {
        const desc = move ?
          'Go to move #' + move :
          'Go to game start';
        return desc
          // <li key={move}>
          //   <button onClick={() => this.jumpTo(move)}>{desc}</button>
          // </li>
      });

      let status;
      if (winner) {
        status = "Winner: " + winner;
      } else {
        status = "Next player: " + (this.data.state.xIsNext ? "X" : "O");
      }

      const squares = current.squares

      this.setData({
        moveDescs: moveDescs, 
        status,
        squares
      })
    }
  }
})
