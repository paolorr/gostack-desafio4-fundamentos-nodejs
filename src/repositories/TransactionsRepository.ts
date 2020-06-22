import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let balance: Balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };

    balance = this.transactions.reduce((currentBalance, transaction) => {
      const newBalance = { ...currentBalance };
      if (transaction.type === 'income') {
        newBalance.income += transaction.value;
      } else {
        newBalance.outcome += transaction.value;
      }

      newBalance.total = newBalance.income - newBalance.outcome;

      return newBalance;
    }, balance);

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
