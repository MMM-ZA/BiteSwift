import { createContext } from "react";

const UserProgressContext = createContext({
progress: '', //" cart", "checkout"
showCart: () => {},
hideCart: () => {},
showCheckout: () => {},
hideCheckout: () => {}

});

export function UserProgressContextProvider({children}) {

return (
  <UserProgressContext.Provider>{children}</UserProgressContext.Provider>
);

}

export default UserProgressContext;
