import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
  getFirestore,
  collection,
  onSnapshot,
  doc,
  updateDoc,
  getDoc,
  setDoc,
} from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE,
  authDomain: "do-todo-cd49a.firebaseapp.com",
  projectId: "do-todo-cd49a",
  storageBucket: "do-todo-cd49a.appspot.com",
  messagingSenderId: "847231757850",
  appId: "1:847231757850:web:d0d5faa820d3bbeba6aba3",
  measurementId: "G-505RNFHC6Y",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  return new Promise((resolve, reject) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = {
          email: result.user.email,
          uid: result.user.uid,
          name: result.user.displayName,
          photo: result.user.photoURL,
        };
        // Resolve the promise with the authenticated user
        resolve(user);
      })
      .catch((error) => {
        // Reject the promise with the authentication error
        reject(error);
      });
  });
};

export const onTasksSnapshot = (userUid, callback) => {
  const tasksRef = collection(db, `users/${userUid}/tasks`);

  const unsubscribe = onSnapshot(tasksRef, (snapshot) => {
    const tasksData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    callback(tasksData);
  });

  return unsubscribe;
};

export const addTask = async (userUid, task) => {
  try {
    const userDocRef = doc(collection(db, `users/${userUid}/tasks`));

    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const updatedTasks = [...userDoc.data().tasks, task];
      await updateDoc(userDocRef, { tasks: updatedTasks });
    } else {
      await setDoc(userDocRef, { tasks: [task] });
    }
  } catch (error) {
    console.error("Error adding task: ", error);
    throw error;
  }
};

export const updateTask = async (userUid, updatedTasks) => {
  try {
    const userDocRef = doc(collection(db, `users/${userUid}/tasks`));
    await updateDoc(userDocRef, { tasks: updatedTasks });
  } catch (error) {
    console.error("Error updating task: ", error);
    throw error;
  }
};

export const deleteTask = async (userUid, taskId) => {
  try {
    const userDocRef = doc(collection(db, `users/${userUid}/tasks`));
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      const updatedTasks = userDoc
        .data()
        .tasks.filter((task) => task.id !== taskId);
      await updateDoc(userDocRef, { tasks: updatedTasks });
    }
  } catch (error) {
    console.error("Error deleting task: ", error);
    throw error;
  }
};
