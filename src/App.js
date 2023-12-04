import { useEffect, useState } from "react";
import { Todo, Auth } from "./components";
import { auth } from "./firebase/firebase";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <div className="App">
      {user ? <Todo user={user} logout={logout} /> : <Auth setUser={setUser} />}
    </div>
  );
};

export default App;
