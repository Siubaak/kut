import React from '../../../index'
import './Demo.less'

let uniqueKey = 0

class Demo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      input: '',
      todos: [
        { key: -1, item: '给笔记本电脑清灰' },
        { key: -2, item: '继续学习React源码' },
        { key: -3, item: '补番《紫罗兰永恒公园》' },
        { key: -4, item: '完成课程论文第二章' },
        { key: -5, item: '买洗发水和沐浴露' },
      ],
    }
  }
  componentDidUpdate() {
    console.log(this.state.todos)
  }
  handleInput(e) {
    this.setState({ input: e.target.value })
  }
  handleAdd(e) {
    if (this.state.input !== '') {
      const todo = { key: uniqueKey++, item: this.state.input }
      const todos = [ ...this.state.todos ]
      todos.push(todo)
      this.setState({ todos, input: '' })
    }
  }
  handleRan(index) {
    const todos = [ ...this.state.todos ]
    const shuffleTodos = []
    while(todos.length) {
      const i = Math.floor(Math.random() * todos.length)
      shuffleTodos.push(todos[i])
      todos.splice(i, 1)
    }
    this.setState({ todos: shuffleTodos })
  }
  handleDel(index) {
    const todos = [ ...this.state.todos ]
    todos.splice(index, 1)
    this.setState({ todos })
  }
  render() {
    return (
      <div className="Demo">
        <p className="desc">待办事项</p>
        <div className="input-box">
          <input className="input" onInput={this.handleInput.bind(this)} value={this.state.input}></input>
          <button className="add" onClick={this.handleAdd.bind(this)}>添加</button>
          <button className="add" onClick={this.handleRan.bind(this)}>打乱</button>
        </div>
        <ul className="list">
          {
            this.state.todos.length
            ? this.state.todos.map((todo, index) => 
              <li className="item" key={todo.key}>
                {todo.item}
                <button className="del" onClick={() => this.handleDel(index)}>完成</button>
              </li>
            )
            : <li className="item">无</li>
          }
        </ul>
      </div>
    )
  }
}

export default Demo
