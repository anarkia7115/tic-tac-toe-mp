"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Component({
    properties: {},
    data: {
        state: {
            history: [
                {
                    squares: Array(9).fill(null)
                }
            ],
            stepNumber: 0,
            xIsNext: true,
        },
        moveDescs: [],
        status: "",
        squares: []
    },
    methods: {
        _setState: function (newState) {
            this.setData({ state: __assign(__assign({}, this.data.state), newState) });
        },
        handleSquareTap: function (e) {
            var i = e.detail.squareid;
            var history = this.data.state.history.slice(0, this.data.state.stepNumber + 1);
            var current = history[history.length - 1];
            var squares = current.squares.slice();
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
        jumpTo: function (e) {
            var step = e.target.dataset.step;
            this._setState({
                stepNumber: step,
                xIsNext: (step % 2) === 0
            });
        },
        calculateWinner: function (squares) {
            var lines = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6]
            ];
            for (var i = 0; i < lines.length; i++) {
                var _a = lines[i], a = _a[0], b = _a[1], c = _a[2];
                if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                    return squares[a];
                }
            }
            return null;
        }
    },
    observers: {
        "state.**": function () {
            var history = this.data.state.history;
            var current = history[this.data.state.stepNumber];
            var winner = this.calculateWinner(current.squares);
            var moveDescs = history.map(function (_, move) {
                var desc = move ?
                    'Go to move #' + move :
                    'Go to game start';
                return desc;
            });
            var status;
            if (winner) {
                status = "Winner: " + winner;
            }
            else {
                status = "Next player: " + (this.data.state.xIsNext ? "X" : "O");
            }
            var squares = current.squares;
            this.setData({
                moveDescs: moveDescs,
                status: status,
                squares: squares
            });
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdhbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBVUEsU0FBUyxDQUFDO0lBSVIsVUFBVSxFQUFFLEVBRVg7SUFLRCxJQUFJLEVBQUU7UUFDSixLQUFLLEVBQVU7WUFDYixPQUFPLEVBQUU7Z0JBQ0w7b0JBQ0UsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2lCQUM3QjthQUNGO1lBQ0gsVUFBVSxFQUFFLENBQUM7WUFDYixPQUFPLEVBQUUsSUFBSTtTQUNkO1FBR0QsU0FBUyxFQUFZLEVBQUU7UUFDdkIsTUFBTSxFQUFFLEVBQUU7UUFDVixPQUFPLEVBQWlCLEVBQUU7S0FFM0I7SUFLRCxPQUFPLEVBQ1A7UUFDRSxTQUFTLEVBQVQsVUFBVSxRQUF3QjtZQUNoQyxJQUFJLENBQUMsT0FBTyxDQUNWLEVBQUMsS0FBSyx3QkFBSyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBSyxRQUFRLENBQUMsRUFBQyxDQUFDLENBQUE7UUFFOUMsQ0FBQztRQUVELGVBQWUsRUFBZixVQUFnQixDQUE0QjtZQUMxQyxJQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztZQUM1QixJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDakYsSUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDNUMsSUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUN4QyxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFD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TSxDQUFDO1lBQ1gsSUFBSSxNQUFNLEVBQUU7Z0JBQ1YsTUFBTSxHQUFHLFVBQVUsR0FBRyxNQUFNLENBQUM7YUFDOUI7aUJBQU07Z0JBQ0wsTUFBTSxHQUFHLGVBQWUsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNsRTtZQUVELElBQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUE7WUFFL0IsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFDWCxTQUFTLEVBQUUsU0FBUztnQkFDcEIsTUFBTSxRQUFBO2dCQUNOLE9BQU8sU0FBQTthQUNSLENBQUMsQ0FBQTtRQUNKLENBQUM7S0FDRjtDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIGNvbXBvbmVudHMvZ2FtZS9nYW1lLmpzXG5cbnR5cGUgU3F1YXJlVmFsdWUgPSBcIlhcInxcIk9cInx1bmRlZmluZWRcblxuaW50ZXJmYWNlIElTdGF0ZSB7XG4gIGhpc3Rvcnk6IHtzcXVhcmVzOiBTcXVhcmVWYWx1ZVtdfVtdXG4gIHN0ZXBOdW1iZXI6IG51bWJlclxuICB4SXNOZXh0OiBib29sZWFuXG59XG5cbkNvbXBvbmVudCh7XG4gIC8qKlxuICAgKiDnu4Tku7bnmoTlsZ7mgKfliJfooahcbiAgICovXG4gIHByb3BlcnRpZXM6IHtcblxuICB9LFxuXG4gIC8qKlxuICAgKiDnu4Tku7bnmoTliJ3lp4vmlbDmja5cbiAgICovXG4gIGRhdGE6IHtcbiAgICBzdGF0ZTogPElTdGF0ZT57XG4gICAgICBoaXN0b3J5OiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3F1YXJlczogQXJyYXkoOSkuZmlsbChudWxsKVxuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgIHN0ZXBOdW1iZXI6IDAsXG4gICAgICB4SXNOZXh0OiB0cnVlLCBcbiAgICB9LFxuXG4gICAgLy8gZGVyaXZlZFxuICAgIG1vdmVEZXNjczogPHN0cmluZ1tdPltdLFxuICAgIHN0YXR1czogXCJcIixcbiAgICBzcXVhcmVzOiA8U3F1YXJlVmFsdWVbXT5bXVxuXG4gIH0sXG5cbiAgLyoqXG4gICAqIOe7hOS7tueahOaWueazleWIl+ihqFxuICAgKi9cbiAgbWV0aG9kczogXG4gIHtcbiAgICBfc2V0U3RhdGUobmV3U3RhdGU6UGFydGlhbDxJU3RhdGU+KSB7XG4gICAgICB0aGlzLnNldERhdGEoXG4gICAgICAgIHtzdGF0ZTp7Li4udGhpcy5kYXRhLnN0YXRlLCAuLi5uZXdTdGF0ZX19KVxuXG4gICAgfSxcblxuICAgIGhhbmRsZVNxdWFyZVRhcChlOntkZXRhaWw6e3NxdWFyZWlkOm51bWJlcn19KSB7XG4gICAgICBjb25zdCBpID0gZS5kZXRhaWwuc3F1YXJlaWQ7XG4gICAgICBjb25zdCBoaXN0b3J5ID0gdGhpcy5kYXRhLnN0YXRlLmhpc3Rvcnkuc2xpY2UoMCwgdGhpcy5kYXRhLnN0YXRlLnN0ZXBOdW1iZXIgKyAxKTtcbiAgICAgIGNvbnN0IGN1cnJlbnQgPSBoaXN0b3J5W2hpc3RvcnkubGVuZ3RoIC0gMV07XG4gICAgICBjb25zdCBzcXVhcmVzID0gY3VycmVudC5zcXVhcmVzLnNsaWNlKCk7XG4gICAgICBpZiAodGhpcy5jYWxjdWxhdGVXaW5uZXIoc3F1YXJlcykgfHwgc3F1YXJlc1tpXSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBzcXVhcmVzW2ldID0gdGhpcy5kYXRhLnN0YXRlLnhJc05leHQgPyBcIlhcIiA6IFwiT1wiO1xuICAgICAgdGhpcy5fc2V0U3RhdGUoe1xuICAgICAgICBoaXN0b3J5OiBoaXN0b3J5LmNvbmNhdChbXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3F1YXJlczogc3F1YXJlc1xuICAgICAgICAgIH1cbiAgICAgICAgXSksXG4gICAgICAgIHN0ZXBOdW1iZXI6IGhpc3RvcnkubGVuZ3RoLFxuICAgICAgICB4SXNOZXh0OiAhdGhpcy5kYXRhLnN0YXRlLnhJc05leHRcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBqdW1wVG8oZTp7dGFyZ2V0OntkYXRhc2V0OntzdGVwOm51bWJlcn19fSkge1xuICAgICAgY29uc3Qge3N0ZXB9ID0gZS50YXJnZXQuZGF0YXNldDtcbiAgICAgIHRoaXMuX3NldFN0YXRlKHtcbiAgICAgICAgc3RlcE51bWJlcjogc3RlcCxcbiAgICAgICAgeElzTmV4dDogKHN0ZXAgJSAyKSA9PT0gMFxuICAgICAgfSk7XG4gICAgfSxcblxuICAgIGNhbGN1bGF0ZVdpbm5lcihzcXVhcmVzOlNxdWFyZVZhbHVlW10pIHtcbiAgICAgIGNvbnN0IGxpbmVzID0gW1xuICAgICAgICBbMCwgMSwgMl0sXG4gICAgICAgIFszLCA0LCA1XSxcbiAgICAgICAgWzYsIDcsIDhdLFxuICAgICAgICBbMCwgMywgNl0sXG4gICAgICAgIFsxLCA0LCA3XSxcbiAgICAgICAgWzIsIDUsIDhdLFxuICAgICAgICBbMCwgNCwgOF0sXG4gICAgICAgIFsyLCA0LCA2XVxuICAgICAgXTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGluZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgW2EsIGIsIGNdID0gbGluZXNbaV07XG4gICAgICAgIGlmIChzcXVhcmVzW2FdICYmIHNxdWFyZXNbYV0gPT09IHNxdWFyZXNbYl0gJiYgc3F1YXJlc1thXSA9PT0gc3F1YXJlc1tjXSkge1xuICAgICAgICAgIHJldHVybiBzcXVhcmVzW2FdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH0sIFxuXG4gIG9ic2VydmVyczoge1xuICAgIFwic3RhdGUuKipcIjogZnVuY3Rpb24oKSB7ICAvLyBkZXJpdmVkIGRhdGFcbiAgICAgIGNvbnN0IGhpc3RvcnkgPSB0aGlzLmRhdGEuc3RhdGUuaGlzdG9yeTtcbiAgICAgIGNvbnN0IGN1cnJlbnQgPSBoaXN0b3J5W3RoaXMuZGF0YS5zdGF0ZS5zdGVwTnVtYmVyXTtcbiAgICAgIGNvbnN0IHdpbm5lciA9IHRoaXMuY2FsY3VsYXRlV2lubmVyKGN1cnJlbnQuc3F1YXJlcyk7XG5cbiAgICAgIGNvbnN0IG1vdmVEZXNjcyA9IGhpc3RvcnkubWFwKChfLCBtb3ZlKSA9PiB7XG4gICAgICAgIGNvbnN0IGRlc2MgPSBtb3ZlID9cbiAgICAgICAgICAnR28gdG8gbW92ZSAjJyArIG1vdmUgOlxuICAgICAgICAgICdHbyB0byBnYW1lIHN0YXJ0JztcbiAgICAgICAgcmV0dXJuIGRlc2NcbiAgICAgICAgICAvLyA8bGkga2V5PXttb3ZlfT5cbiAgICAgICAgICAvLyAgIDxidXR0b24gb25DbGljaz17KCkgPT4gdGhpcy5qdW1wVG8obW92ZSl9PntkZXNjfTwvYnV0dG9uPlxuICAgICAgICAgIC8vIDwvbGk+XG4gICAgICB9KTtcblxuICAgICAgbGV0IHN0YXR1cztcbiAgICAgIGlmICh3aW5uZXIpIHtcbiAgICAgICAgc3RhdHVzID0gXCJXaW5uZXI6IFwiICsgd2lubmVyO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RhdHVzID0gXCJOZXh0IHBsYXllcjogXCIgKyAodGhpcy5kYXRhLnN0YXRlLnhJc05leHQgPyBcIlhcIiA6IFwiT1wiKTtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgc3F1YXJlcyA9IGN1cnJlbnQuc3F1YXJlc1xuXG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICBtb3ZlRGVzY3M6IG1vdmVEZXNjcywgXG4gICAgICAgIHN0YXR1cyxcbiAgICAgICAgc3F1YXJlc1xuICAgICAgfSlcbiAgICB9XG4gIH1cbn0pXG4iXX0=