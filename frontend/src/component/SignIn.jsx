import React, { useState, useContext } from 'react';
import loginImg from './login.jpg'
import { Link, useNavigate } from 'react-router-dom'

const SignIn = () => {
    const [checked, setChecked] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    // useEffect(() => {
    //     const productService = new ProductService();
    //     productService.getProductsSmall().then(data => setProducts(data));
    // }, []);

    const signInUser = async (e) => {
        e.preventDefault();
        console.log(username, password);
        const response = await fetch('http://localhost:3001/auth/login/', {
            method: 'POST',
            body: JSON.stringify({
                email: username,
                password: password
            }),
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            }
        });
        const result = await response.json();
        if(result.cred?.user) {
            navigate('/dashboard')
        } else {
            console.log('Invalid credentials')
        }
    }

  return (
    <div className='w-screen h-screen'>
        <div className="grid grid-cols-1 al sm:grid-cols-2 h-full w-full justify-center">            
            <div className=" sm:block">
                <img src='https://www.pv-magazine-india.com/wp-content/uploads/sites/8/2019/09/paddy-field-3864340_1920-1200x800.jpg' alt="hyper" className="w-full h-full object-cover" />
            </div>

            <div className='bg-white flex flex-col justify-center '>
            {/* <h1 className="text-900 text-4xl font-medium text-center mb-5">Welcome Back!</h1> */}
            <form className='max-w-[400px] w-full mx-auto rounded-lg  py-5 px-8 border-double border-4'>
                <h2 className='text-3xl text-center font-semibold pb-3'>SIGN IN</h2>
                <div className='flex flex-col text-gray-900 py-2'>    
                <label  className="block text-900 font-medium mb-2">Email</label>
                <input type="text"  value={username} onChange={(e) => setUsername(e.target.value)} id="email1"  className="rounded-lg border-2 mt-2 p-2 focus:border-blue-500 focus:outline-none" />
                </div>
                <div className='flex flex-col text-gray-900 py-2'>
                <label  className="block text-900 font-medium mb-2">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password1"  className="p-2 rounded-lg border-2 mt-2 focus:border-blue-500 focus:outline-none " />
                </div>
            {/* <div className="flex justify-between text-gray-900 py-2">
                <div className="flex items-center">
                    <input type="checkbox" id="rememberme1" binary className="mr-2" onChange={e => setChecked(e.checked)} checked={checked} />
                    <label >Remember me</label>
                </div>
            </div> */}

            <button onClick={signInUser} label="Sign In"  className="w-full my-5 py-2 bg-teal-400 shadow-lg  hover:bg-teal-800 hover:text-white transition-colors text-black font-semibold rounded-lg"> Sign in</button>
            <span className="text-600 font-medium text-center line-height-3">Don't have an account?</span>
            <Link to='/signup' className="font-medium  no-underline ml-2 text-blue-500 cursor-pointer" >Create now!</Link>
            </form>
            </div>
        </div>
    </div>
  )
}

export default SignIn