import { Button } from 'flowbite-react'
import { AiFillGoogleCircle } from 'react-icons/ai';
import { GoogleAuthProvider, signInWithPopup,getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInSuccess } from '../redux/user/userSlice';

const OAuth = () => {
    const auth = getAuth(app)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleGoogleClick = async ()=>{
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({prompt:"select_account"});

        try {
            const resultsFormGoogle = await signInWithPopup(auth,provider);
            console.log(resultsFormGoogle)

            const res = await fetch('/api/auth/google',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    name:resultsFormGoogle.user.displayName,
                    email:resultsFormGoogle.user.email,
                    googlePhotoUrl:resultsFormGoogle.user.photoURL
                })
            });

            const data = await res.json();

            if(res.ok){
                dispatch(signInSuccess(data));
                navigate("/")
            }
        } catch (error) {
            console.log(error?.message)
        }
    }

  return (
    <>
        <Button type='button' gradientDuoTone={'pinkToOrange'} outline onClick={handleGoogleClick}>
            <AiFillGoogleCircle className='w-6 h-6 mr-2'/>
            Continue with Google
        </Button>
    </>
  )
}

export default OAuth