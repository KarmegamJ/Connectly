import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

export default function useAuthListener(cb) {
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, cb);
    return () => unsub();
  }, []);
}
