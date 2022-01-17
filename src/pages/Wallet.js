import React from 'react';
import Header from '../components/Header';
import TableForm from '../components/TableForm';
import WalletForm from '../components/WalletForm';

export default class Wallet extends React.Component {
  render() {
    return (
      <div>
        <h1>TrybeWallet</h1>
        <Header />
        <WalletForm />
        <TableForm />
      </div>
    );
  }
}
