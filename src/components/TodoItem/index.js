import {Component} from 'react'
import './index.css'

class TodoItem extends Component {
  constructor(props) {
    super(props)
    const {todoDetails} = props
    this.state = {
      isEditing: false,
      inputValue: todoDetails.title,
    }
  }

  onDelete = () => {
    const {deleteTodo, todoDetails} = this.props
    deleteTodo(todoDetails.id)
  }

  onCheckboxChange = () => {
    const {toggleComplete, todoDetails} = this.props
    toggleComplete(todoDetails.id)
  }

  onEditToggle = () => {
    const {editTodo, todoDetails} = this.props
    const {isEditing, inputValue} = this.state

    if (isEditing) {
      editTodo(todoDetails.id, inputValue)
    }

    this.setState(prevState => ({isEditing: !prevState.isEditing}))
  }

  onChangeInput = event => {
    this.setState({inputValue: event.target.value})
  }

  render() {
    const {todoDetails} = this.props
    const {isEditing, inputValue} = this.state
    const {isCompleted, title} = todoDetails

    return (
      <li className="todo-item">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={this.onCheckboxChange}
        />
        {isEditing ? (
          <input type="text" value={inputValue} onChange={this.onChangeInput} />
        ) : (
          <p className={isCompleted ? 'title completed' : 'title'}>{title}</p>
        )}
        <button type="button" onClick={this.onEditToggle}>
          {isEditing ? 'Save' : 'Edit'}
        </button>
        <button type="button" onClick={this.onDelete}>
          Delete
        </button>
      </li>
    )
  }
}

export default TodoItem
