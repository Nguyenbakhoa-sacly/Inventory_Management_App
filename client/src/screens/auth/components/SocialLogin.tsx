import { Button } from "antd"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../../firebase/firebase.config";
import handleAPI from "../../../apis/HandleAPI";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addAuth } from "../../../redux/reducers/authReducer.";
import { localDataNames } from "../../../constants/appInfos";

interface Props {
  isRemember?: boolean;
}
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

const SocialLogin = ({ isRemember }: Props) => {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const handleLoginWithGoogle = async () => {
    setIsLoading(true)
    try {
      const result = await signInWithPopup(auth, provider)
      if (result) {
        const user = result.user
        if (user) {
          const data = {
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          }
          const res: any = await handleAPI('/auth/login-google', data, 'post')
          toast.success(res.message)
          res.data && dispatch(addAuth(res.data))
          if (isRemember) {
            localStorage.setItem(localDataNames.authData, JSON.stringify(res.data))
          }
        }
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      disabled={isLoading}
      onClick={handleLoginWithGoogle}
      style={{
        width: '100%'
      }}
      size="large"
      icon={
        <img
          width={24}
          height={24}
          src="https://img.icons8.com/color/48/google-logo.png"
          alt="google-logo" />}
    >
      Google
    </Button>
  )
}

export default SocialLogin