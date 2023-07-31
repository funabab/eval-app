import { useEffect } from "react";
import { useNavigation, useRouter } from "expo-router";
import { useUser } from "../hooks/useUser";
import Loader from "./Loader";
import { Text } from "react-native";

interface Props {
  redirectTo?: string;
}

const AuthRedirect: React.FC<React.PropsWithChildren<Props>> = ({
  redirectTo = "/dashboard",
  children,
}) => {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const navigate = useNavigation();

  useEffect(() => {
    const onFocus = () => {
      if (!isLoading && user) {
        router.replace(redirectTo);
      }
    };

    navigate.addListener("focus", onFocus);
    onFocus();

    return () => {
      navigate.removeListener("focus", onFocus);
    };
  }, [redirectTo, isLoading, user]);

  if (isLoading || user) {
    return <Loader />;
  }

  return <>{children}</>;
};

export default AuthRedirect;
