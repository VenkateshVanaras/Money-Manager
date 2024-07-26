import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    transactionsList: [],
    titleInput: '',
    amountInput: '',
    optionId: transactionTypeOptions[0].optionId,
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {titleInput, amountInput, optionId} = this.state
    const typeOption = transactionTypeOptions.find(
      everyOption => everyOption.optionId === optionId,
    )
    const {displayText} = typeOption
    const newTransaction = {
      id: uuidv4(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: displayText,
    }

    this.setState(prevState => ({
      transactionsList: [...prevState.transactionsList, newTransaction],
      titleInput: '',
      amountInput: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  onDeleteItem = id => {
    console.log('Venkatesh')
    const {transactionsList} = this.state
    const filteredList = transactionsList.filter(
      eachTrans => eachTrans.id !== id,
    )

    this.setState({transactionsList: filteredList})
  }

  onTitleChange = event => {
    this.setState({titleInput: event.target.value})
  }

  onAmountChange = event => {
    this.setState({amountInput: event.target.value})
  }

  onSelectOption = event => {
    this.setState({
      optionId: event.target.value,
    })
  }

  getBalance = () => {
    const {transactionsList} = this.state
    let totalBalance = 0
    let incomeAmount = 0
    let expensesAmount = 0

    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      } else {
        expensesAmount += eachTransaction.amount
      }
    })

    totalBalance = incomeAmount - expensesAmount
    return totalBalance
  }

  getIncome = () => {
    const {transactionsList} = this.state
    let incomeAmount = 0

    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      }
    })
    return incomeAmount
  }

  getExpenses = () => {
    const {transactionsList} = this.state
    let expensesAmount = 0

    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[1].displayText) {
        expensesAmount += eachTransaction.amount
      }
    })
    return expensesAmount
  }

  render() {
    const {transactionsList, titleInput, amountInput, optionId} = this.state
    console.log(transactionsList)
    const balanceAmount = this.getBalance()
    const incomeAmount = this.getIncome()
    const expensesAmount = this.getExpenses()

    return (
      <div className="app-container">
        <div className="main-card">
          <div className="name-card">
            <h1>Hi, Richard</h1>
            <p>
              Welcome back to your
              <span className="span-class">Money Manager</span>
            </p>
          </div>
          <ul className="money-details">
            <MoneyDetails
              balanceAmount={balanceAmount}
              incomeAmount={incomeAmount}
              expensesAmount={expensesAmount}
            />
          </ul>
          <div className="addTransactions-History">
            <div className="add-transactions">
              <form onSubmit={this.onAddTransaction}>
                <h3>Add Transaction</h3>
                <label className="label" htmlFor="title">
                  TITLE
                </label>
                <br />
                <input
                  id="title"
                  value={titleInput}
                  onChange={this.onTitleChange}
                  className="input"
                />
                <br />
                <label className="label" htmlFor="amount">
                  AMOUNT
                </label>
                <br />
                <input
                  value={amountInput}
                  id="amount"
                  onChange={this.onAmountChange}
                  className="input"
                />
                <br />
                <label className="label" htmlFor="select">
                  TYPE
                </label>
                <br />
                <select
                  value={optionId}
                  onChange={this.onSelectOption}
                  className="input"
                  id="select"
                >
                  {transactionTypeOptions.map(eachOption => (
                    <option
                      key={eachOption.optionId}
                      value={eachOption.optionId}
                    >
                      {eachOption.displayText}
                    </option>
                  ))}
                </select>
                <br />
                <button className="submit-button" type="submit">
                  Add
                </button>
              </form>
            </div>
            <div className="history">
              <h3>History</h3>
              <ul className="history-unordered">
                <li className="table-header">
                  <p className="table-header-cell">Title</p>
                  <p className="table-header-cell">Amount</p>
                  <p className="table-header-cell">Type</p>
                </li>
                {transactionsList.map(eachTransaction => (
                  <TransactionItem
                    key={eachTransaction.id}
                    onDeleteItem={this.onDeleteItem}
                    eachTransaction={eachTransaction}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
