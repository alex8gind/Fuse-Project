import { Outlet } from "react-router"


function ContextProvider({ providers = []}) {
  return providers.reduceRight(
    (children, Provider) => <Provider>{children}</Provider>, 
    <Outlet />
  )
}

export default ContextProvider