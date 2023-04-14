import {
  Container,
  Sprite,
  useApp,
} from "@pixi/react";

// type loginReqFormat = {
//   username: string;
//   password: string;
// };

// type registerReqFormat = {
//   email: string;
//   username: string;
//   password: string;
//   referal: string;
//   address: string;
//   otp: string;
// };

// type otpReqFormat = {
//   email: string;
// };

const Register = () => {
  const app = useApp();

  // const { status, connect, ethereum, switchChain, account, chainId } =
  //   useMetaMask();
  // const [currentChain, setCurrentChain] = useState("");

  // const [scene, setScene] = useState("HOME");
  // const [authMode, setAuthMode] = useState<"LOGIN" | "REGISTER">("LOGIN");
  // const [email, setEmail] = useState("");
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [otp, setOtp] = useState("");
  // const [retypePassword, setRetypePassword] = useState("");
  // const [referralCode, setReferralCode] = useState("");
  // const [testValue, setTestValue] = useState("");


  // const loginHandler = async () => {
  //   setScene("HOME");
  //   const loginRequestData: loginReqFormat = {
  //     username,
  //     password,
  //   };
  //   const result = await axiosInstance({
  //     url: "/user/authentication",
  //     method: "POST",
  //     data: JSON.stringify(loginRequestData),
  //   });

  //   const { data } = result;
  //   if (!data.success) window.alert(`${data.message}`);
  // };

  // const registerHandler = async () => {
  //   const registerRequestData: registerReqFormat = {
  //     email,
  //     username,
  //     password,
  //     referal: referralCode,
  //     address: "asdf",
  //     otp,
  //   };
  //   const result = await axiosInstance({
  //     url: "/user/register",
  //     method: "POST",
  //     data: JSON.stringify(registerRequestData),
  //   });
  //   const { data } = result;
  //   if (!data.success) window.alert(`${data.message}`);
  // };

  // const otpHandler = async () => {
  //   const otpRequestData: otpReqFormat = {
  //     email,
  //   };
  //   const result = await axiosInstance({
  //     url: "/otp/getRegisterOtp",
  //     method: "POST",
  //     data: otpRequestData,
  //   });
  //   const { data } = result;
  //   if (!data.success) window.alert(`${data.message}`);
  // };

  return (
    <Container width={app.screen.width} height={app.screen.height}>
      <Sprite
        image={"image/Background.png"}
        width={app.screen.width < 450 ? app.screen.width * 1.5 : app.screen.width}
        height={app.screen.height}
        anchor={[0.5, 0.5]}
        position={[app.screen.width / 2, app.screen.height / 2]}
      />
    </Container>
  );
};

export default Register;
