import styles from "./App.module.css";
import { createStore } from "solid-js/store";
import {
  createEffect,
  createRenderEffect,
  createResource,
  For,
} from "solid-js";
// import { fetchJson } from './api';
import { fetchJson } from "./api/apiHelpers";

async function fetchTx() {
  const r = await fetchJson("/api/transactions");
  return r;
}

const formatAmount = amount => {
  return amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function App() {
  const [transactions, { mutate }] = createResource(fetchTx);
  const [store, setStore] = createStore({
    txCount: 3,
  });

  // createEffect(() => {
  //   console.log('transactions', transactions())
  // })
  return (
    <div>
      <h1>Solid Money</h1>
      <p>Number of users: {store.txCount}</p>
      <table>
        <For each={transactions()}>
          {(tx, idx) => (
            <tr class={idx() % 2 === 0 ? styles.trDark : ""}>
            {/* <tr class={styles.trDark}> */}
              <td>{idx}</td>
              <td>{tx.acctId}</td>
              <td class={styles.tdDate}>{new Date(tx.date).toLocaleDateString()}</td>
              <td>{tx.description}</td>
              <td class={styles.tdAmount}>{formatAmount(tx.amount)}</td>
            </tr>
          )}
        </For>
      </table>
    </div>
  );
}

export default App;
