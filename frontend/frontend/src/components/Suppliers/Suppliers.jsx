import { createContext } from "react";
import GetAllSup from "./GetAllSupplier";

export const SuppliersContext = createContext();

const Suppliers = (props) => {
  return (
    <>
      <GetAllSup />
    </>
  );
};

export default Suppliers;
