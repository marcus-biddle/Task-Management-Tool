import { useContext } from "react";
import { TodoContext } from "./contexts/context";

export const useTodoContext = () => useContext<any>(TodoContext);