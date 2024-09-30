import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

import App from '../App';
import Home from "../pages/Home/Home";
import Profile from "../pages/Profile/Profile";
import Docs from "../pages/Docs/Docs";
import Connections from "../pages/Connections/Connections";
import Settings from "../pages/Settings/Settings";
import Notifications from "../pages/Notifications/Notifications";
import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";
import PageNotFound from "../pages/PageNotFound/PageNotFound";
import ContextProvider from "../contexts/context.provider";
import UserProvider from "../contexts/user.context";
import Security from "../pages/Security";
import ForgotPass from "../pages/ForgotPass/ForgotPass";
import IdVerification from "../pages/IdentityVarification/1.IdVerification/IdVerification";
import IdDocsFotoOptions from "../pages/IdentityVarification/2.IdDocsFotoOptions/IdDocsFotoOptions";
import CaptureInstructions from "../pages/IdentityVarification/3.CaptureInstructions/CaptureInstructions";
import UploadResult from "../pages/IdentityVarification/UploadResult/UploadResult";
import VerificationSuccess from "../pages/IdentityVarification/6.VerificationSuccess/VerificationSuccess";
import IdentityChecking from "../pages/IdentityVarification/5.IdentityChecking/IdentityChecking";
import SelfieCheck from "../pages/IdentityVarification/4.SelfieCheck/SelfieCheck";
import Private from "../components/Private";
import VerificationEmailOrPhone from "../pages/VerificationEmailOrPhone/VerificationEmailOrPhone";
import VerificationResult from "../pages/VerificationEmailOrPhone/VerificationResult";
import MedDocsUploader from "../pages/MedDocsUploader/MedDocsUploader"
import Contacts from "../pages/Contacts/Contacts"


export const router = createBrowserRouter(
        createRoutesFromElements(
                    <Route element={<ContextProvider providers={[UserProvider]} />}>
                        <Route element={<App />}>                           
                            <Route path="/" element={<Private><Home/></Private>}/>                           
                            <Route path="/profile" element={<Private><Profile /></Private>}/>
                            <Route path="/docs/med" element={<Private><MedDocsUploader/></Private>}/>
                            <Route path="/docs" element={<Private><Docs/></Private>}/>
                            <Route path="/connections" element={<Private><Connections/></Private>}/>
                            <Route path="/connection/:id" element={<Private><Contacts/></Private>}/>
                            <Route path="/settings" element={<Private><Settings/></Private>}/>
                            <Route path="/settings" element={<Private><Settings/></Private>}/>
                            <Route path="/notifications" element={<Private><Notifications/></Private>}/>
                            <Route path="/security" element={<Private><Security/></Private>}/>                          
                        </Route>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Registration/>}/>
                        <Route path="/verify" element={<VerificationEmailOrPhone/>}/>
                        <Route path="/verify/:result" element={<VerificationResult/>}/>
                        <Route path="/forgot-password" element={<ForgotPass/>}/>
                        <Route path="/id-verification" element={<IdVerification />} />
                        <Route path="/choose-id-option" element={<IdDocsFotoOptions />} />
                        <Route path="/capture-instructions" element={<CaptureInstructions />} />
                        <Route path="/upload-result/:documentType/:result" element={<UploadResult />} />
                        <Route path="/selfie-check" element={<SelfieCheck />} />
                        <Route path="/identity-checking" element={<IdentityChecking />} />
                        <Route path="/verification-success" element={<VerificationSuccess />} />
                        <Route path="/*" element={<PageNotFound />} />
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