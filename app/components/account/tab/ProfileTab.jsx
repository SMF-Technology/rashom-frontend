import React from 'react'

const ProfileTab = () => {
    return (
        <div>
            <div className='bg-white rounded-lg p-5'>
                <h1 className='text-2xl text-black'>Personal Information</h1>
                <p className='mt-4'>João Carlos da Silva, 29 years old, Male, CPF: 123.456.789-00</p>
            </div>
            <div className='bg-white rounded-lg p-5 mt-5'>
                <h1 className='text-2xl text-black'>Address</h1>
                <p className='mt-5'>Here’s the Brazilian address in a single line format:</p>
                <p>
                    Rua João da Silva, 123, Apartamento 402, Bloco 12A, Centro, São Paulo - SP, CEP 01001-000, Brasil</p>
            </div>
            <div className='bg-white rounded-lg p-5 mt-5'>
                <h1 className='text-2xl text-black'>Contact Information</h1>

                <p className='font-semibold text-gray-500 mt-5'>Email Address</p>
                <p className='text-lg'>example@gmail.com</p>
                <p>
                    Rua João da Silva, 123, Apartamento 402, Bloco 12A, Centro, São Paulo - SP, CEP 01001-000, Brasil</p>
            </div>
        </div>
    )
}

export default ProfileTab