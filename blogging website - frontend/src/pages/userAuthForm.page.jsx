import {useContext} from "react";
import AnimationWrapper from "../common/page-animation";
import InputBox from "../components/input.component";
import googleIcon from "../imgs/google.png";
import {Link, Navigate} from "react-router-dom";
import {Toaster,toast} from "react-hot-toast";
import axios from "axios";
import { storeInSession } from "../common/session";
import { userContext } from "../App";


const UserAuthForm = ({type}) => {

    //const authForm = useRef();

    let { userAuth: {access_token},setUserAuth } = useContext(userContext);
    console.log(access_token);

    const userAuthThroughServer = (serverRoute,formData) => {
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + serverRoute, formData)
        .then(({data}) => {
            storeInSession("user",JSON.stringify(data))
            setUserAuth(data);            
        })
        .catch(({response}) => {
            toast.error(response.data.error)
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault(); 
        let serverRoute = type ===  "sign-in" ? "/signin" : "/signup";

        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

        //form data
        let form = new FormData(formElement);
        let formData = {};
        for(let [key, value] of form.entries()){
            formData[key] = value;

        }

        let { fullname, email, password } = formData;

        //form validation
        if(fullname){
            if(fullname.length<3){
                return toast.error("Fullname must be atleast 3 letters long" )
            }
        }
        
        if(!email.length){
            return toast.error( "Enter Email")
        }
        if(!emailRegex.test(email)){
            return toast.error("email is invalid")
        }
        if(!passwordRegex.test(password)){
            return toast.error("Password should be 6 to 20 characters long with a numeric,1 lowercase and 1 uppercase letter")
        }

        userAuthThroughServer(serverRoute,formData);

    }

    return(
        access_token ? 
        <Navigate to="/" />
        :
        <AnimationWrapper keyValue={type}>
            <section className="h-cover flex items-center justify-center">
                <Toaster/>
            <form id="formElement" className="w-[80%] max-w-[400px] ">
            <h1 className="text-4xl font-gelasio capitalize text-center mb-24 ">
                {type == "sign-in" ? "Welcome back" : "Join us Today" }
                </h1>
                {
                    type != "sign-in" ? 
                    <InputBox
                    name="fullname"
                    type="text"
                    placeholder="Full Name"
                    icon="fi-ss-user-pen"
                    />
                    
                    : ""
                }

                    <InputBox
                    name="email"
                    type="email"
                    placeholder="E-mail"
                    icon="fi-br-envelope-dot"
                    />

                    <InputBox
                    name="password"
                    type="password"
                    placeholder="Password"
                    icon="fi-ss-lock"
                    />

                    <button className="btn-dark center mt-14" 
                    type="submit"
                    onClick={handleSubmit}
                    >
                        {type.replace("-" , " ")}
                    </button>

                    <div className="relative w-full flex item-centered gap-2 my-10 opacity-10 uppercase text-black font-bold " >
                        <hr className="w-1/2 border-black" />
                        <hr className="w-1/2 border-black" />
                    </div>

                <button className="btn-dark flex items-center justify-center gap-4 w-[90%] center" >
                    <img src={googleIcon} className="w-5 " />
                    continue with google
                </button>

                {
                    type == "sign-in" ? 
                    <p className="mt-6 text-dark-grey text-xl text-center" >
                        Don't have an account ?
                        <Link to="/signup" className="underline text-black text-xl ml-1 ">
                            Join us Today
                        </Link>
                    </p>
                    : 
                    <p className="mt-6 text-dark-grey text-xl text-center" >
                        Already a member ?
                     <Link to="/signin" className="underline text-black text-xl ml-1 ">
                        Sign in here
                    </Link>
                </p>
                }

                   
            </form>
        </section>
        </AnimationWrapper>
        
    )
}

export default UserAuthForm;