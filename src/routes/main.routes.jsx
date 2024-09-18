import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

import App from '../App';
import HomeMobile from "../pages/HomeMobile";
import UserProfile from "../pages/UserProfile";
import Docs from "../pages/Docs";
import Connections from "../pages/Connections";
import Settings from "../pages/Settings";
import Menu from "../pages/Menu";
import Notifications from "../pages/Notifications";
import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";
import PageNotFound from "../pages/PageNotFound";
import Helpers from "../pages/Helpers";
import ContextProvider from "../contexts/context.provider";
import UserProvider from "../contexts/user.context";
import Security from "../pages/Security";

export const router = createBrowserRouter(
        createRoutesFromElements(
                    <Route element={<ContextProvider providers={[UserProvider]} />}>
                        <Route element={<App />} errorElement={<PageNotFound />}>
                                <Route path="/" element={<HomeMobile/>}/>
                                <Route path="/profile" element={<UserProfile />}/>
                                <Route path="/docs" element={<Docs/>}/>
                                <Route path="/connections" element={<Connections/>}/>
                                <Route path="/settings" element={<Settings/>}/>
                                <Route path="/menu" element={<Menu/>}/>
                                <Route path="/notifications" element={<Notifications/>}/>
                                <Route path="/helpers" element={<Helpers/>}/>
                                <Route path="/security" element={<Security/>}/>
                        </Route>
                        <Route path="/register" element={<Registration/>}/>
                        <Route path="/login" element={<Login/>}/>
                    </Route>
        )
    )










// export const router = createBrowserRouter(
//     createRoutesFromElements(
//                 <Route element={<ContextProvider providers={[UserProvider, MessageProvider, PostProvider]} />}>
//                     <Route path="/" element={<App />} errorElement={<PageNotFound />}>
//                         <Route element={<NavigationLayout />}>
//                             <Route index element={<Feed />}/>
//                             <Route path="create-post" element={<NewPostForm/>}/>
//                             <Route path="profile" element={<Profile />}/>
//                             <Route path="search" element={<PageNotFound/>}/>
//                             <Route path="messages" element={<Messages/>}/>
//                             <Route path="notifications" element={<Notifications/>}/>
//                         </Route>
//                         <Route path="add" element={<AddFriendTest/>}/>
//                         <Route path="login" element={<TestLogin/>}/>
//                         <Route path="register" element={<RegistrationFormik/>}/>
//                         <Route path="daniel" element={<UserRow/>}/>
//                         <Route path="daniel2" element={<MessageBubbleComponent/>}/>
//                         <Route path="daniel3" element={<Form_Messages/>}/>
//                     </Route>
//                 </Route>
//     )
// )

// export const router = createBrowserRouter([
//     {element: <App />, errorElement: <PageNotFound />, children: [
//         {element: <NavigationLayout />, children: [
//             {path: "/", element: <Feed />},
//             {path: "search", element: <PageNotFound />},
//             {path: "create-post", element: <NewPostForm />},
//             {path: "messages", element: <Messages />},
//             {path: "notifications", element: <Notifications />},
//             {path: "profile", element: <Profile />},
//         ]},
//         {path: "register", element: <RegistrationFormik />},
//         {path: "daniel", element: <UserRow />},
//         {path: "daniel2", element: <MessageBubbleComponent/>},
//         {path: "daniel3", element: <Form_Messages/>},
//     ]},
// ])