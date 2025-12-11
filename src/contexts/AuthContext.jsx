import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("👀 AuthContext initializing");

    supabase.auth.getSession().then(({ data }) => {
      console.log("🔐 Initial session:", data.session);

      setSession(data.session);
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        console.log("🔄 Auth state changed:", _event);

        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false); 
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    console.log("🚪 Logging out...");
    await supabase.auth.signOut();

    setSession(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        logout, 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
