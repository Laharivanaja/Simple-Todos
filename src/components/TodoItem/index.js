import {Component} from 'react'
import './index.css'

class TodoItem extends Component {
  state = {
    isEditing: false,
    inputValue: this.props.todoDetails.title,
  }

  onDelete = () => {
    const {deleteTodo, todoDetails} = this.props
    const {id} = todoDetails
    deleteTodo(id)
  }

  onCheckboxChange = () => {
    const {toggleComplete, todoDetails} = this.props
    const {id} = todoDetails
    toggleComplete(id)
  }

  onEditToggle = () => {
    const {editTodo, todoDetails} = this.props
    const {id} = todoDetails
    const {isEditing, inputValue} = this.state

    if (isEditing) {
      editTodo(id, inputValue)
    }

    this.setState({isEditing: !isEditing})
  }

  onChangeInput = event => {
    this.setState({inputValue: event.target.value})
  }

  render() {
    const {todoDetails} = this.props
    const {isEditing, inputValue} = this.state
    const {title, isCompleted} = todoDetails

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
        <button onClick={this.onEditToggle}>
          {isEditing ? 'Save' : 'Edit'}
        </button>
        <button onClick={this.onDelete}>Delete</button>
      </li>
    )
  }
}

export default TodoItem
