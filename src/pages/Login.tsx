
    import { Link, useNavigate, Navigate } from "react-router-dom";
    import { loginRequest } from "../api/users";
    import { useMutation } from "@tanstack/react-query";
    import { useState } from "react"
    import { Toaster } from 'sonner';
    import { toast } from 'sonner';
    import { useAuthStore } from "../store/auth";
   
    
    type LoginInput = {
        username: string;
        password: string;
    }

    export type LoginResponse = {
        access: string;
        refresh: string;
    }
    
    const LoginPage = () => {
    
        const navigate = useNavigate();
        const { isAuth, setToken } = useAuthStore();
        
    
        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
    
        const loginMutation = useMutation<LoginResponse, Error, LoginInput>({
            mutationFn: ({ username, password }) => loginRequest(username, password),
            onSuccess: (response) => {
                console.log("Tokens recibidos:", response.access, response.refresh);
                setToken(response.access, response.refresh)
                toast.success("Login exitoso!")
                navigate("/")
            },
            onError: (error) => {
                toast.error("Hubo un error, intenta devuelta")
                console.error("Error en login:", error);
            }
        })       
          
        const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            loginMutation.mutate({ username, password });
            console.log(username, password)
            console.log(loginMutation.status)
            
        };


        
        
         if (isAuth) return (<Navigate to="/"/>)
    
        return (
          <>     
          <h2 className="flex bg-[#c1d7ff] py-10 flex-col text-center text-3xl font-bold
           text-primary-800 items-center ">
             Login Page
          </h2>
          <form className="space-y-4 flex flex-col items-center py-10 shadow-lg md:space-y-6 
          bg-[#c1d7ff] h-screen" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900
                                 dark:text-white">Username</label>
                                <input
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    type="text" placeholder="Ex: Saul" className="bg-gray-500 border border-gray-800
                                   text-primary-800 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600
                                    block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                     dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>

                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>

                            <button type="submit" className=" text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                            <p className="text-sm font-light text-primary-800">
                                Dont have an account? <Link to={'/auth/register'} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>

                            </p>
                        </form>
                  
               
           <Toaster /></>
        )
        
    }

    export default LoginPage;
  

