import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import signupimg from './reg.jpg'
import axios from 'axios';
const SignUp = () => {
    const [checked, setChecked] = useState(null);
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const navigate = useNavigate();

    // useEffect(() => {
    //     const productService = new ProductService();
    //     productService.getProductsSmall().then(data => setProducts(data));
    // }, []);
    const handleSubmit = async (e) => {
        console.log(email, password, name);
        const response = await fetch('http://localhost:3001/auth/signup/', {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password,
                name: name
            }),
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            }
        });
        const result = await response.json();
        if(result.cred.user) {
            navigate('/dashboard')
        } else {
            console.log('Invalid credentials')
        }
    }
  return (
    <div className='w-screen h-screen'>
        <div className="grid grid-cols-1 al sm:grid-cols-2 h-full w-full">
                <div className="sm:block">
                    <img src='https://www.pv-magazine-india.com/wp-content/uploads/sites/8/2019/09/paddy-field-3864340_1920-1200x800.jpg' alt="hyper"  className="w-full h-full object-cover" />
                </div>

                <div className='bg-white flex flex-col justify-center'>
                    <form onSubmit={(e) => e.preventDefault()} className='max-w-[400px] w-full mx-auto rounded-lg p-8 px-8 border-double border-4'>
                        <h2 className='text-3xl text-center'>SIGN UP</h2>
                        <div className='flex flex-col text-gray-900 py-2'>
                        <label  className="block text-900 font-medium mb">Name</label>
                        <input name="name1" type="text" 
                        className="rounded-lg border-2 mt-2 p-2 focus:border-blue-500 focus:outline-none"
                        onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className='flex flex-col text-gray-900 py-2'>
                        <label  className="block text-900 font-medium mb">Email</label>
                        <input name="email1" type="text" 
                        className="rounded-lg border-2 mt-2 p-2 focus:border-blue-500 focus:outline-none" 
                        onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className='flex flex-col text-gray-900 py-2'>
                        <label  className="block text-900 font-medium mb">Password</label>
                        <input name="password" type="password" 
                        className="rounded-lg border-2 mt-2 p-2 focus:border-blue-500 focus:outline-none"
                        onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        {/* <div className="flex justify-between text-gray-900 py-2">
                            <div className="flex items-center">
                                <input type='checkbox' inputId="rememberme1" binary className="mr-2" onChange={e => setChecked(e.checked)} checked={checked} />
                                <label htmlFor="rememberme1">Remember me</label>
                            </div>
                        </div> */}

                        <button label="Sign In" icon="pi pi-user" 
                        className="w-full my-5 py-2 bg-teal-400 shadow-lg  hover:bg-teal-800 hover:text-white transition-colors text-black font-semibold rounded-lg" 
                        onClick={handleSubmit}> Sign up</button>
                        <span className="text-600 font-medium text-center line-height-3">Already have an account?</span>
                        <Link to='/' className="font-medium  no-underline ml-2 text-blue-500 cursor-pointer" >Sign in here!</Link>
                    </form>  
                </div>
                
            </div>
    </div>
  )
}

export default SignUp