import { createContext, useState } from "react";

export const UserContext = createContext(null)

function UserProvider({children}) {
    const [loggedinUser, setLoggedinUser] = useState({
        uid: "2",
        createdAt: 1718289241,
        firstname: "Sara",
        lastname: "Smith",
        profilePic: "path/to/pic",
        documents: [],
        connections: []
    })
    return (
        <UserContext.Provider value={{loggedinUser, setLoggedinUser}}>
            {children}
        </UserContext.Provider>
    )
}
export default UserProvider