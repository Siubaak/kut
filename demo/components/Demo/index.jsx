import React from '../../../index'
import './Demo.less'

let uniqueKey = 0

class Demo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      input: '',
      todos: [
        { key: -1, item: '继续学习React源码' },
        { key: -2, item: '笔记本要清灰了' },
        { key: -3, item: '完成课程论文第二章' },
        { key: -4, item: '买洗发水和沐浴露' },
        { key: -5, item: '补番《紫罗兰永恒公园》' },
      ],
    }
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
        <p class="desc">待办事项</p>
        <div class="input-box">
          <input class="input" onInput={this.handleInput.bind(this)} value={this.state.input}></input>
          <button class="add" onClick={this.handleAdd.bind(this)}>添加</button>
          <button class="add" onClick={this.handleRan.bind(this)}>打乱</button>
        </div>
        <ul class="list">
          {
            this.state.todos.length
            ? this.state.todos.map((todo, index) => 
              <li class="item" key={todo.key}>
                {todo.item}
                <button class="del" onClick={() => this.handleDel(index)}>完成</button>
              </li>
            )
            : <li class="item">无</li>
          }
        </ul>
      </div>
    )
  }
}

export default Demo
