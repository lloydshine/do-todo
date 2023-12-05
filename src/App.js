import { useEffect, useState } from "react";
import { Todo, Auth } from "./components";
import { auth } from "./firebase/firebase";

import toast, { Toaster } from "react-hot-toast";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        toast.success("Signed In");
      }
      setUser(user);
    });
    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      toast.error("Logged Out");
      await auth.signOut();
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <div className="App">
      {user ? <Todo user={user} logout={logout} /> : <Auth setUser={setUser} />}
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
};

export default App;
