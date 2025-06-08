import {Component} from 'react'
import TodoItem from '../TodoItem'
import './index.css'

const initialTodosList = [
  {id: 1, title: 'Book the ticket for today evening', isCompleted: false},
  {id: 2, title: 'Rent the movie for tomorrow movie night', isCompleted: false},
  {
    id: 3,
    title: 'Confirm the slot for the yoga session tomorrow morning',
    isCompleted: false,
  },
  {id: 4, title: 'Drop the parcel at Bloomingdale', isCompleted: false},
  {id: 5, title: 'Order fruits on Big Basket', isCompleted: false},
  {id: 6, title: 'Fix the production issue', isCompleted: false},
  {id: 7, title: 'Confirm my slot for Saturday Night', isCompleted: false},
  {id: 8, title: 'Get essentials for Sunday car wash', isCompleted: false},
]

class SimpleTodos extends Component {
  state = {
    todosList: initialTodosList,
    titleInput: '',
    countInput: '',
    nextId: 9,
  }

  onChangeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeCount = event => {
    this.setState({countInput: event.target.value})
  }

  addTodo = () => {
    const {titleInput, countInput, todosList, nextId} = this.state

    if (titleInput === '') {
      return
    }

    const count = Number(countInput)
    const newTodos = []
    let num = 1

    if (!isNaN(count) && count > 1) {
      num = count
    }

    for (let i = 0; i < num; i++) {
      const newTodo = {
        id: nextId + i,
        title: titleInput,
        isCompleted: false,
      }
      newTodos.push(newTodo)
    }

    this.setState({
      todosList: [...todosList, ...newTodos],
      titleInput: '',
      countInput: '',
      nextId: nextId + newTodos.length,
    })
  }

  deleteTodo = id => {
    const updatedList = this.state.todosList.filter(todo => todo.id !== id)
    this.setState({todosList: updatedList})
  }

  toggleComplete = id => {
    const updatedList = this.state.todosList.map(todo => {
      if (todo.id === id) {
        return {...todo, isCompleted: !todo.isCompleted}
      }
      return todo
    })
    this.setState({todosList: updatedList})
  }

  editTodo = (id, newTitle) => {
    const updatedList = this.state.todosList.map(todo => {
      if (todo.id === id) {
        return {...todo, title: newTitle}
      }
      return todo
    })
    this.setState({todosList: updatedList})
  }

  render() {
    const {todosList, titleInput, countInput} = this.state

    return (
      <div className="app-container">
        <div className="simple-todos-container">
          <h1 className="heading">Simple Todos</h1>
          <div className="input-section">
            <input
              type="text"
              placeholder="Enter todo title"
              value={titleInput}
              onChange={this.onChangeTitle}
            />
            <input
              type="number"
              placeholder="Count"
              value={countInput}
              onChange={this.onChangeCount}
            />
            <button type="button" onClick={this.addTodo}>
              ADD
            </button>
          </div>
          <ul className="todos-list">
            {todosList.map(todo => (
              <TodoItem
                key={todo.id}
                todoDetails={todo}
                deleteTodo={this.deleteTodo}
                toggleComplete={this.toggleComplete}
                editTodo={this.editTodo}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default SimpleTodos
