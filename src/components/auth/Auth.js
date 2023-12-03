import { signInWithGoogle } from "../../firebase/firebase";
import "./auth.css";

export default function Auth({ setUser }) {
  const handleSignIn = async () => {
    const authenticatedUser = await signInWithGoogle();
    setUser(authenticatedUser);
    localStorage.setItem("user", JSON.stringify(authenticatedUser));
  };

  return (
    <div className="auth">
      <button className="login-with-google-btn" onClick={handleSignIn}>
        Sign in with Google
      </button>
    </div>
  );
}
