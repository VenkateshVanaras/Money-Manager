// Write your code here
import './index.css'

const TransactionItem = props => {
  const {eachTransaction, onDeleteItem} = props
  const {id, title, amount, type} = eachTransaction
  console.log(title, amount, type)

  const toDelete = () => {
    onDeleteItem(id)
  }

  return (
    <li className="table-list-items">
      <p className="list-items">{title}</p>
      <p className="list-items">{amount}</p>
      <p className="list-items">{type}</p>
      <button
        onClick={toDelete}
        data-testid="delete"
        className="button-container"
        type="button"
      >
        <img
          className="delete-image"
          alt="delete"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
        />
      </button>
    </li>
  )
}

export default TransactionItem
