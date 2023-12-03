import { useEffect, useState } from "react";
import { Todo, Auth } from "./components";

const App = () => {
  const [user, setUser] = useState(null);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) {
      setUser(JSON.parse(u));
    }
  }, []);

  return (
    <div>
      {user ? <Todo user={user} logout={logout} /> : <Auth setUser={setUser} />}
    </div>
  );
};

export default App;
