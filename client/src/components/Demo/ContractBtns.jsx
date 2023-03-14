import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function ContractBtns({ setValue, setText }) {
  const { state: { contract, accounts } } = useEth();
  const [inputValue, setInputValue] = useState("");
  const [inputValueString, setInputValueString] = useState("");

  const handleInputChange = e => {
    if (/^\d+$|^$/.test(e.target.value)) {
      setInputValue(e.target.value);
    }
  };

  const handleInputChangeString = e => {
    //if (/^\d+$|^$/.test(e.target.value)) {
      setInputValueString(e.target.value);
    //}
  };

  const read = async () => {
    const value = await contract.methods.read().call({ from: accounts[0] });
    setValue(value);
  };

  const write = async e => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (inputValue === "") {
      alert("Please enter a value to write.");
      return;
    }
    const newValue = parseInt(inputValue);
    await contract.methods.write(newValue).send({ from: accounts[0] });
  };

  const readString = async () => {
    const value = await contract.methods.getGreeter().call({ from: accounts[0] });
    setText(value);
  };

  const writeString = async e => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (inputValueString === "") {
      alert("Please enter a value to write.");
      return;
    }
    const newValue = inputValueString;
    await contract.methods.setGreeter(newValue).send();
  };

  return (
    <div className="btns">

      <button onClick={readString}>
      readString()
      </button>

      <div onClick={writeString} className="input-btn">
      writeString(<input
          type="text"
          placeholder="string"
          value={inputValueString}
          onChange={handleInputChangeString}
        />)
      </div>

      <button onClick={read}>
        read()
      </button>

      <div onClick={write} className="input-btn">
        write(<input
          type="text"
          placeholder="uint"
          value={inputValue}
          onChange={handleInputChange}
        />)
      </div>

    </div>
  );
}

export default ContractBtns;
