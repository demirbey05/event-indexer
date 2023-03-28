import {
  createSetup,
  sendChangeTransaction,
  sendIncrementTransaction,
} from "./setup";

const { provider, signer, contract } = createSetup();

const form: any = document.getElementById("value-input");
(document.getElementById("increment-button") as any).onclick = () => {
  sendIncrementTransaction(contract);
};

(document.getElementById("submit-button") as any).onclick = () => {
  const value = form?.value;
  sendChangeTransaction(contract, parseInt(value));
};
