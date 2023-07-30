import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useUser } from "../hooks/useUser";
import { User } from "../schemas";

interface Props {
  redirectTo?: string;
}

const checkIncompleteRegistration = (user: User) => {
  return !user.department || !user.matricNumber;
};

const AuthRedirect: React.FC<React.PropsWithChildren<Props>> = ({
  redirectTo = "/dashboard",
  children,
}) => {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      if (checkIncompleteRegistration(user)) {
        router.replace("/complete-registration");
        return;
      }
      router.push(redirectTo);
    }
  }, [redirectTo, isLoading, user]);

  if (isLoading || user) {
    return null;
  }

  return <>{children}</>;
};

export default AuthRedirect;
