import React, {useState, useContext, createContext, ReactNode} from "react"

interface AppContextType {
    value: number;
    setValue: React.Dispatch<React.SetStateAction<number>>
}

const appContext = createContext<AppContextType | undefined>(undefined);

export const AppcontextProvider : React.FC<{children:ReactNode}> = ({children})=>{
    const [value, setValue] = useState<number>(0);
    return (
        <appContext.Provider value={{value,setValue}}>
            {children}
        </appContext.Provider>
    )
}

export const useAppContext = ()=>{
    const context = useContext(appContext)
    if (context == undefined) {
        throw new Error("can use context here")
    }
    return context 
}