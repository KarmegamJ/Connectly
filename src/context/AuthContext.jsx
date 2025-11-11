import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (u) {
        // set/update user in firestore
        try {
          await setDoc(
            doc(db, "users", u.uid),
            {
              uid: u.uid,
              displayName: u.displayName || "",
              email: u.email || "",
              photoURL: u.photoURL || "",
              online: true,
              lastSeen: serverTimestamp(),
            },
            { merge: true }
          );
        } catch (e) {
          console.warn(e);
        }
        setUser(u);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  async function logout() {
    if (!auth.currentUser) return;
    try {
      await setDoc(
        doc(db, "users", auth.currentUser.uid),
        { online: false, lastSeen: serverTimestamp() },
        { merge: true }
      );
    } catch (e) {
      console.warn(e);
    }
    return signOut(auth);
  }

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
