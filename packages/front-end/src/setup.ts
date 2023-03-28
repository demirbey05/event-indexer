import { BigNumberish, ethers } from "ethers";
import chainSpecs from "../../contracts/json/chainSpecs.json";
import accounts from "../../contracts/json/accounts.json";
import deploy from "../../contracts/json/deploy.json";
import counterAbi from "../../contracts/out/Counter.sol/Counter.json";

export const eventNumberIncremented = async (contract: ethers.Contract) => {
  console.log("NumberIncremented listener is added....");
  contract.on("NumberIncremented", (value1, value2, address) => {
    console.log(value1);
    console.log(value2);
    console.log(address);
  });
};

export const eventNumberChanged = async (contract: ethers.Contract) => {
  console.log("NumberChanged listener is added....");
  contract.on("NumberChanged", (value1, value2, address) => {
    console.log(value1);
    console.log(value2);
    console.log(address);
  });
};

export const createSetup = () => {
  const provider = new ethers.WebSocketProvider(chainSpecs.websocket);
  const signer = new ethers.Wallet(accounts.private_keys[0], provider);
  const contract = new ethers.Contract(
    deploy.deployedTo,
    counterAbi.abi,
    signer
  );

  eventNumberChanged(contract);
  eventNumberIncremented(contract);

  console.log("Setup is completed.");

  return { provider, signer, contract };
};

export const sendIncrementTransaction = async (contract: ethers.Contract) => {
  console.log("Increment transaction is sending ....");
  const tx = await contract.increment();
  const tc = await tx.wait();
  const value = await contract.number();
};

export const sendChangeTransaction = async (
  contract: ethers.Contract,
  value: BigNumberish
) => {
  console.log("Change transaction is sending ....");
  const tx = await contract.setNumber(value);
  const tc = await tx.wait();
};
