import { useContext } from "react";
import { AuthContext } from "../api/AuthProvider";
//Se exporta el context para ser utilizado en la app
export default () => useContext(AuthContext);
