// Context Yapısını Oluşturmak için: createContext
// onAuthStateChanged durumunu kontrol etmek için: useEffect
// Giriş Yapan Kullanıcı Bilgisini Tutmak için: useState
import { createContext, useEffect, useState } from "react";

// onAuthStateChanged çalışabilmesi için "auth" ihtiyacımız var...
import { auth } from "../firebase/config";

// Kullanıcının, kullanıcı giriş durumunun değişikliğini yakalamak için: onAuthStateChanged
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [loginUser, setLoginUser] = useState({});

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setLoginUser(user);
            console.log("user", user);
        })

        return () => {
            unsub();
        }
    }, [])

    return (
        <AuthContext.Provider value={{loginUser}}>
            {children}
        </AuthContext.Provider>
    )
} 