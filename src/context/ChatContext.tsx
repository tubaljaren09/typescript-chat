// import { onAuthStateChanged } from "firebase/auth";
// import {
//   ReactNode,
//   createContext,
//   useContext,
//   useEffect,
//   useReducer,
//   useState,
// } from "react";
// import { auth } from "../firebase";
// import { AuthContext } from "./AuthContext";

// interface ChatContextProviderProps {
//   children: ReactNode;
// }

// export const ChatContext = createContext();

// export const ChatContextProvider = ({ children }: ChatContextProviderProps) => {
//   const { currentUser } = useContext(AuthContext);
//   const INITIAL_STATE = {
//     chatId: "null",
//     user: {},
//   };

//   const chatReducer = (state, action) => {
//     switch (action.type) {
//       case "CHANGE_USER":
//         if (currentUser) {
//           return {
//             user: action.payload,
//             chatId:
//               currentUser.uid > action.payload.uid
//                 ? currentUser.uid + action.payload.uid
//                 : action.payload.uid + currentUser.uid,
//           };
//         }
//         break;

//       default:
//         return state;
//     }
//   };

//   const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

//   <ChatContext.Provider value={{ data: state, dispatch }}>
//     {children}
//   </ChatContext.Provider>;
// };
import { createContext, ReactNode, useContext, useReducer } from "react";

import { AuthContext } from "./AuthContext";

interface ChatContextProviderProps {
  children: ReactNode;
}

interface UserType {
  displayName: string;
  photoURL: string;
  uid: string;
}
interface ChatState {
  chatId: string;
  user: UserType; // You should replace 'any' with the actual type of your user object
}

interface ChangeUserAction {
  type: "CHANGE_USER";
  payload: {
    displayName: string;
    photoURL: string;
    uid: string;
    // Add other properties specific to your payload
  };
}

type ActionTypes = ChangeUserAction;

interface ChatContextValue {
  data: ChatState;
  dispatch: React.Dispatch<ActionTypes>;
}

export const ChatContext = createContext<ChatContextValue | undefined>(
  undefined
);

export const ChatContextProvider = ({ children }: ChatContextProviderProps) => {
  const { currentUser } = useContext(AuthContext);

  const INITIAL_STATE: ChatState = {
    chatId: "null",
    user: { displayName: "", photoURL: "", uid: "" },
  };

  const chatReducer = (state: ChatState, action: ActionTypes): ChatState => {
    switch (action.type) {
      case "CHANGE_USER":
        if (currentUser) {
          return {
            user: {
              displayName: action.payload.displayName,
              photoURL: action.payload.photoURL,
              uid: action.payload.uid,
            },
            chatId:
              currentUser.uid > action.payload.uid
                ? currentUser.uid + action.payload.uid
                : action.payload.uid + currentUser.uid,
          };
        }
        return state;

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
