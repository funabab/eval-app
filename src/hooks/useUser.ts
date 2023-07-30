import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth, firebaseFirestore } from "../firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { User } from "../schemas";

export const useUser = () => {
  const [firebaseUser, isUserLoading] = useAuthState(firebaseAuth);
  const [userDoc, isLoading, error, userDocSnapshot] = useDocumentData(
    firebaseUser ? doc(firebaseFirestore, `users/${firebaseUser.uid}`) : null
  );

  const user = userDoc as User | undefined;

  return {
    isLoading: isUserLoading || isLoading,
    user,
    error,
    userDocSnapshot,
  };
};
