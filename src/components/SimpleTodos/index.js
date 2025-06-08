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
    nextId: 9,
  }

  onChangeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  addTodo = () => {
    const {titleInput, nextId} = this.state

    if (titleInput.trim() === '') return

    // Extract number at end (optional)
    const match = titleInput.trim().match(/^(.*?)(?:\s+(\d+))?$/)
    const baseTitle = match[1].trim()
    const count = match[2] ? parseInt(match[2], 10) : 1

    if (baseTitle === '') return

    const newTodos = []
    for (let i = 0; i < count; i += 1) {
      newTodos.push({
        id: nextId + i,
        title: baseTitle,
        isCompleted: false,
      })
    }

    this.setState(prevState => ({
      todosList: [...prevState.todosList, ...newTodos],
      titleInput: '',
      nextId: prevState.nextId + count,
    }))
  }

  deleteTodo = id => {
    this.setState(prevState => ({
      todosList: prevState.todosList.filter(todo => todo.id !== id),
    }))
  }

  toggleComplete = id => {
    this.setState(prevState => ({
      todosList: prevState.todosList.map(todo =>
        todo.id === id ? {...todo, isCompleted: !todo.isCompleted} : todo,
      ),
    }))
  }

  editTodo = (id, newTitle) => {
    this.setState(prevState => ({
      todosList: prevState.todosList.map(todo =>
        todo.id === id ? {...todo, title: newTitle} : todo,
      ),
    }))
  }

  render() {
    const {todosList, titleInput} = this.state

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
