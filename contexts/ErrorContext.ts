import { createContext } from "react";

const ErrorContext = createContext({ error: "", setError: (error: string) => {} });

export default ErrorContext;
