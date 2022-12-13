import { createContext } from "react";

const DetailsItemContext = createContext({ itemId: "", setItemId: (itemId: string) => {} });

export default DetailsItemContext