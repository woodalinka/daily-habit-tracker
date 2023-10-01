import AuthForm from "../components/AuthForm";
import {json, redirect} from 'react-router-dom';

const AuthenticationPage = () => {
    return <AuthForm />
}

export default AuthenticationPage;

export async function action({request}: {request: Request}) {
    const searchParams = new URL(request.url).searchParams;
    const mode = searchParams.get('mode') || 'login';
    console.log('What happens with mode', mode)

    if (mode !== 'login' && mode !== 'signup') {
        throw json({message: 'Unsupported mode'}, {status: 422})
    }

    const data = await request.formData();
    const authData = {
        email: data.get('email'),
        password: data.get('password')
    };

    console.log("what date", authData)

    const response = await fetch('http://localhost:8080/users/' + mode, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(authData)
    });

    if (response.status === 400 || response.status === 401) {
        return response;
    }

    if (!response.ok) {
        throw json({message: 'Could not authenticate user.'}, {status: 500});
    }

    return redirect('/')
}