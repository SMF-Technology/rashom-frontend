import React, { useState } from 'react'

const SecurityTab = () => {

    const [showResetForm, setShowResetForm] = useState(false);
    const [showForgetForm, setShowForgetForm] = useState(false);
    const handleResetClick = () => {
        setShowResetForm(true);
        setShowForgetForm(false);
    };
    const handleForgetClick = () => {
        setShowForgetForm(true);
        setShowResetForm(false);
    };
    return (
        <div>
            <p>Password</p>
            <p>*********</p>

            <p className='text-red-600'>
                <span className='inline-flex items-center justify-center w-6 h-6 border border-red-600 rounded-full text-sm font-bold'>!</span> &nbsp;
                You already have a password. Do you want to
                <span className='underline cursor-pointer ml-1' onClick={handleResetClick}>reset</span> it or
                <span className='underline cursor-pointer ml-1' onClick={handleForgetClick}>forget</span>?
            </p>

            {showResetForm && (
                <div className='mt-4'>
                    <h3 className='text-lg font-semibold'>Reset Password</h3>
                    <input type='password' placeholder='Type Your Password' className='border p-2 rounded-lg w-full my-2' />
                    <input type='password' placeholder='New Password' className='border p-2 rounded-lg w-full my-2' />
                    <input type='password' placeholder='Confirm Password' className='border p-2 rounded-lg w-full my-2' />
                    <button className='px-4 py-2 bg-black text-white rounded'>Reset Password</button>
                </div>
            )}

            {showForgetForm && (
                <div className='mt-4'>
                    <h3 className='text-lg font-semibold'>Forgot Password</h3>
                    <input type='password' placeholder='New Password' className='border p-2 rounded-lg w-full my-2' />
                    <input type='password' placeholder='Confirm Password' className='border p-2 rounded-lg w-full my-2' />
                    <button className='px-4 py-2 bg-black text-white rounded'>Save Password</button>
                </div>
            )}
        </div>
    )
}

export default SecurityTab