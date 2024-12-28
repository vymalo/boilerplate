import { createContext } from "react";
import Plausible from "plausible-tracker";

const context = createContext<ReturnType<typeof Plausible>>(null as any);

export default context;