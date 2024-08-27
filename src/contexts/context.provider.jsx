import { Outlet } from "react-router"


function ContextProvider({ providers = []}) {
  return providers.reduceRight((acc, Provider) => <Provider>{acc}</Provider>, <Outlet />)
}
export default ContextProvider