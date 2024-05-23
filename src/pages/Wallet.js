import React from 'react';
import Header from '../components/Header';
import TableForm from '../components/TableForm';
import WalletForm from '../components/WalletForm';
import '../styles/Wallet.css';

export default class Wallet extends React.Component {
  render() {
    return (
      <div className='main-page'>
        <h1>CurrencyWallet</h1>
        <Header />
        <WalletForm />
        <TableForm />
      </div>
    );
  }
}
