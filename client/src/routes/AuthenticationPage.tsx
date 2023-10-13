import AuthForm from "../components/AuthForm";
import {json, useNavigate} from 'react-router-dom';
import {useContext} from "react";
import AuthContext from "../store/auth-context";

const AuthenticationPage = () => {
    const {onLogin} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleFormSubmit = async (email: string, password: string, mode: string) => {
        // const searchParams = new URL(request.url).searchParams;
        // const mode = searchParams.get('mode') || 'login';
        console.log('What happens with mode', mode)

        if (mode !== 'login' && mode !== 'signup') {
            throw json({message: 'Unsupported mode'}, {status: 422})
        }

        const authData = {
            email,
            password
        };

        console.log("what data", authData)

        const response = await fetch('http://localhost:8080/users/' + mode, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(authData)
        });

        if (!response.ok) {
            throw json({message: 'Could not authenticate user.'}, {status: 500});
        }

        const resData = await response.json();
        const token = resData.token;
        localStorage.setItem('token', token);
        onLogin(token)
        navigate('/')

    }


    return <AuthForm onSubmit={handleFormSubmit}/>
}

export default AuthenticationPage;

// export async function action({request}: {request: Request}) {
//     const searchParams = new URL(request.url).searchParams;
//     const mode = searchParams.get('mode') || 'login';
//     console.log('What happens with mode', mode)
//
//     if (mode !== 'login' && mode !== 'signup') {
//         throw json({message: 'Unsupported mode'}, {status: 422})
//     }
//
//     const data = await request.formData();
//     const authData = {
//         email: data.get('email'),
//         password: data.get('password')
//     };
//
//     console.log("what data", authData)
//
//     const response = await fetch('http://localhost:8080/users/' + mode, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(authData)
//     });
//
//     if (response.status === 400 || response.status === 401) {
//         return response;
//     }
//
//     if (!response.ok) {
//         throw json({message: 'Could not authenticate user.'}, {status: 500});
//     }
//
//     const resData = await response.json();
//     const token = resData.token;
//
//     localStorage.setItem('token', token)
//
//     return redirect('/')
// }