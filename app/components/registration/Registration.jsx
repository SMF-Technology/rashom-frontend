"use client";

import React, { useState } from 'react';
import { Country, State } from 'country-state-city';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { gql, useMutation } from '@apollo/client';
import client from '../../lib/apolloClient'; // Adjust the path as necessary

const REGISTER_USER = gql`
  mutation RegisterUser(
    $email: String!
    $password: String!
    $redirectUrl: String!
    $firstName: String!
    $lastName: String!
    $metadata: [MetadataInput!]!
  ) {
    accountRegister(
      input: {
        email: $email
        password: $password
        firstName:$firstName
        lastName:$lastName
        redirectUrl: $redirectUrl
        metadata: $metadata
      }
    ) {
      user {
        id
        email
        firstName
        lastName
      }
      accountErrors {
        field
        message
      }
    }
  }
`;

const Registration = () => {
    const [activeTab, setActiveTab] = useState('individual');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [userPhoneNumber, setUserPhoneNumber] = useState('');
    const [corporatePhoneNumber, setCorporatePhoneNumber] = useState('');
    const [responsiblePhoneNumber, setResponsiblePhoneNumber] = useState('');
    const [states, setStates] = useState(["Sao Paulo", "Rio"]);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        cpf: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        city: '',
        zip: '',
        country: '',
        companyName: '',
        cnjp: '',
        tradeName: '',
        stateRegistration: '',
        industry: '',
        street: '',
        number: '',
        apartment: '',
        block: '',
        neighborhood: '',
        complement: '',
        responsibleName: '',
    });



    const [registerUser, { loading, error, data }] = useMutation(REGISTER_USER, { client });

    const handleCountryChange = (event) => {
        const countryCode = event.target.value;
        setSelectedCountry(countryCode);
        const statesList = State.getStatesOfCountry(countryCode);
        setStates(statesList);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };





    const handleRegister = async (e) => {
        e.preventDefault();
        const redirectUrl = "https://www.resom.com.br/account-confirmation"; // Update this URL as needed

        const metadata = [
            { key: "firstName", value: formData.firstName },
            { key: "lastName", value: formData.lastName },
            { key: "cpf", value: formData.cpf },
            { key: "phone", value: formData.phone },
            { key: "address", value: formData.address },
            { key: "city", value: formData.city },
            { key: "zip", value: formData.zip },
            { key: "country", value: formData.country },
            { key: "companyName", value: formData.companyName },
            { key: "cnjp", value: formData.cnjp },
            { key: "tradeName", value: formData.tradeName },
            { key: "stateRegistration", value: formData.stateRegistration },
            { key: "industry", value: formData.industry },
            { key: "street", value: formData.street },
            { key: "number", value: formData.number },
            { key: "apartment", value: formData.apartment },
            { key: "block", value: formData.block },
            { key: "neighborhood", value: formData.neighborhood },
            { key: "complement", value: formData.complement },
            { key: "responsibleName", value: formData.responsibleName },
        ];

        try {
            const result = await registerUser({
                variables: {
                    email: formData.email,
                    password: formData.password,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    redirectUrl,
                    metadata,
                },
            });

            if (result.data?.accountRegister?.accountErrors?.length > 0) {
                console.error("Registration errors:", result.data.accountRegister.accountErrors);
            } else {
                console.log("Registration successful:", result.data.accountRegister.user);
            }
        } catch (err) {
            console.error("Registration failed:", err.message);
        }
    };

    const tabs = [
        { id: "individual", label: "Individual" },
        { id: "corporate", label: "Corporate" }
    ];

    const renderContent = () => {
        switch (activeTab) {
            case "individual":
                return (
                    <div>
                        <h1 className='text-2xl'>Personal Information</h1>
                        <form onSubmit={handleRegister}>
                            <div className='flex flex-col md:flex-row gap-4'>
                                <div className='mt-5 flex-1'>
                                    <label>First Name*</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="w-full bg-[#EFEFEF] placeholder:text-slate-400 text-slate-700 mb-2 text-sm border border-black rounded-md pl-3 pr-20 py-4 focus:outline-none shadow-sm focus:shadow"
                                        placeholder="e.g., Joao Silva"
                                        required
                                    />
                                </div>
                                <div className='mt-5 flex-1'>
                                    <label>Last Name*</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="w-full bg-[#EFEFEF] placeholder:text-slate-400 text-slate-700 mb-2 text-sm border border-black rounded-md pl-3 pr-20 py-4 focus:outline-none shadow-sm focus:shadow"
                                        placeholder="e.g., Joao Silva"
                                        required
                                    />
                                </div>
                            </div>

                            <div className='flex flex-col md:flex-row gap-4'>
                                <div className='mt-5 flex-1'>
                                    <label>CPF*</label>
                                    <input
                                        type="text"
                                        name="cpf"
                                        value={formData.cpf}
                                        onChange={handleChange}
                                        className="w-full bg-[#EFEFEF] placeholder:text-slate-400 text-slate-700 mb-2 text-sm border border-black rounded-md pl-3 pr-20 py-4 focus:outline-none shadow-sm focus:shadow"
                                        placeholder="e.g., 123.456.789-09"
                                        required
                                    />
                                </div>
                            </div>

                            <h2 className='text-2xl mt-5'>Address</h2>
                            <div className='flex flex-col md:flex-row gap-4'>
                                <div className='mt-5 flex-1'>
                                    <label>Select Country*</label>
                                    <select
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        className="w-full bg-[#EFEFEF] placeholder:text-slate-400 text-slate-700 mb-2 text-sm border border-black rounded-md pl-3 pr-20 py-4 focus:outline-none shadow-sm focus:shadow"
                                        required
                                    >
                                        <option value="">Select Country</option>
                                        {Country.getAllCountries().map((country) => (
                                            <option key={country.isoCode} value={country.isoCode}>
                                                {country.flag} {country.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className='mt-5 flex-1'>
                                    <label>CEP (Postal Code)*</label>
                                    <input
                                        type="text"
                                        name="zip"
                                        value={formData.zip}
                                        onChange={handleChange}
                                        className="w-full bg-[#EFEFEF] placeholder:text-slate-400 text-slate-700 mb-2 text-sm border border-black rounded-md pl-3 pr-20 py-4 focus:outline-none shadow-sm focus:shadow"
                                        placeholder="e.g., 12345-678"
                                        required
                                    />
                                </div>
                            </div>
                            <div className='flex flex-col md:flex-row gap-4'>
                                <div className='mt-5 flex-1'>
                                    <label>Street (Logradouro)*</label>
                                    <input
                                        type="text"
                                        name="street"
                                        value={formData.street}
                                        onChange={handleChange}
                                        className="w-full bg-[#EFEFEF] placeholder:text-slate-400 text-slate-700 mb-2 text-sm border border-black rounded-md pl-3 pr-20 py-4 focus:outline-none shadow-sm focus:shadow"
                                        placeholder="e.g., Rua da Paz"
                                        required
                                    />
                                </div>
                                <div className='mt-5 flex-1'>
                                    <label>Number (Número)*</label>
                                    <input
                                        type="text"
                                        name="number"
                                        value={formData.number}
                                        onChange={handleChange}
                                        className="w-full bg-[#EFEFEF] placeholder:text-slate-400 text-slate-700 mb-2 text-sm border border-black rounded-md pl-3 pr-20 py-4 focus:outline-none shadow-sm focus:shadow"
                                        placeholder="House/building Number"
                                        required
                                    />
                                </div>
                            </div>
                            <div className='flex flex-col md:flex-row gap-4'>
                                <div className='mt-5 flex-1'>
                                    <label>Apartment (Apartmento)</label>
                                    <input
                                        type="text"
                                        name="apartment"
                                        value={formData.apartment}
                                        onChange={handleChange}
                                        className="w-full bg-[#EFEFEF] placeholder:text-slate-400 text-slate-700 mb-2 text-sm border border-black rounded-md pl-3 pr-20 py-4 focus:outline-none shadow-sm focus:shadow"
                                        placeholder="e.g., Rua Avenida"
                                    />
                                </div>
                                <div className='mt-5 flex-1'>
                                    <label>Block (Quadra)*</label>
                                    <input
                                        type="text"
                                        name="block"
                                        value={formData.block}
                                        onChange={handleChange}
                                        className="w-full bg-[#EFEFEF] placeholder:text-slate-400 text-slate-700 mb-2 text-sm border border-black rounded-md pl-3 pr-20 py-4 focus:outline-none shadow-sm focus:shadow"
                                        placeholder="e.g., Rua Avenida"
                                        required
                                    />
                                </div>
                            </div>
                            <div className='flex flex-col md:flex-row gap-4'>
                                <div className='mt-5 flex-1'>
                                    <label>Neighborhood (Bairro)*</label>
                                    <input
                                        type="text"
                                        name="neighborhood"
                                        value={formData.neighborhood}
                                        onChange={handleChange}
                                        className="w-full bg-[#EFEFEF] placeholder:text-slate-400 text-slate-700 mb-2 text-sm border border-black rounded-md pl-3 pr-20 py-4 focus:outline-none shadow-sm focus:shadow"
                                        placeholder="e.g., Centro"
                                        required
                                    />
                                </div>
                                <div className='mt-5 flex-1'>
                                    <label>City (Cidade)*</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className="w-full bg-[#EFEFEF] placeholder:text-slate-400 text-slate-700 mb-2 text-sm border border-black rounded-md pl-3 pr-20 py-4 focus:outline-none shadow-sm focus:shadow"
                                        placeholder="e.g., São Paulo "
                                        required
                                    />
                                </div>
                            </div>

                            <h3 className='text-2xl mt-5'>Contact Information</h3>
                            <div className='mt-5'>
                                <label>Email Address*</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-[#EFEFEF] placeholder:text-slate-400 text-slate-700 mb-2 text-sm border border-black rounded-md pl-3 pr-20 py-4 focus:outline-none shadow-sm focus:shadow"
                                    placeholder="Enter your email address"
                                    required
                                />
                            </div>

                            <div className="flex-1">
                                <label>Phone Number*</label>
                                <PhoneInput
                                    international
                                    defaultCountry="BR"
                                    value={userPhoneNumber}
                                    onChange={setUserPhoneNumber}
                                    className="w-full custom-focus placeholder:text-slate-400 text-slate-700 mb-2 text-sm border border-black rounded-md pl-3 pr-20 py-4 focus:outline-none  shadow-sm  focus:shadow-none"
                                    placeholder="Enter phone number"
                                    required
                                />
                            </div>

                            <div className='mt-5'>
                                <label>Password*</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full bg-[#EFEFEF] placeholder:text-slate-400 text-slate-700 mb-2 text-sm border border-black rounded-md pl-3 pr-20 py-4 focus:outline-none shadow-sm focus:shadow"
                                    placeholder="Create your password"
                                    required
                                />
                            </div>

                            <div className='flex md:flex-row gap-4 mt-20'>
                                <button type="button" className='flex-1 border border-black rounded-md py-4 font-semibold'>Existing User</button>
                                <button type="submit" className='flex-1 bg-black rounded-md text-white font-semibold' disabled={loading}>
                                    {loading ? 'Registering...' : 'Continue'}
                                </button>
                            </div>
                        </form>
                    </div>
                );
            case "corporate":
                return (
                    <div>
                        <h1 className='text-2xl'>Corporate Information</h1>
                        <form onSubmit={handleRegister}>
                            <div className='mt-5'>
                                <label>Company Name*</label>
                                <input
                                    type="text"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    className="w-full bg-[#EFEFEF] placeholder:text-slate-400 text-slate-700 mb-2 text-sm border border-black rounded-md pl-3 pr-20 py-4 focus:outline-none shadow-sm focus:shadow"
                                    placeholder="e.g., Joao Silva"
                                    required
                                />
                            </div>

                            <div className='flex flex-col md:flex-row gap-4'>
                                <div className='mt-5 flex-1'>
                                    <label>CNJP*</label>
                                    <input
                                        type="text"
                                        name="cnjp"
                                        value={formData.cnjp}
                                        onChange={handleChange}
                                        className="w-full bg-[#EFEFEF] placeholder:text-slate-400 text-slate-700 mb-2 text-sm border border-black rounded-md pl-3 pr-20 py-4 focus:outline-none shadow-sm focus:shadow"
                                        placeholder="e.g., 12.345.678/0001-90"
                                        required
                                    />
                                </div>
                                <div className='mt-5 flex-1'>
                                    <label>Trade Name(Nome Fantasia)</label>
                                    <input
                                        type="text"
                                        name="tradeName"
                                        value={formData.tradeName}
                                        onChange={handleChange}
                                        className="w-full bg-[#EFEFEF] placeholder:text-slate-400 text-slate-700 mb-2 text-sm border border-black rounded-md pl-3 pr-20 py-4 focus:outline-none shadow-sm focus:shadow"
                                        placeholder="e.g., 123.456.789-09"
                                    />
                                </div>
                            </div>
                            <div className='flex flex-col md:flex-row gap-4'>
                                <div className='mt-5 flex-1'>
                                    <label>State Registration</label>
                                    <input
                                        type="text"
                                        name="stateRegistration"
                                        value={formData.stateRegistration}
                                        onChange={handleChange}
                                        className="w-full bg-[#EFEFEF] placeholder:text-slate-400 text-slate-700 mb-2 text-sm border border-black rounded-md pl-3 pr-20 py-4 focus:outline-none shadow-sm focus:shadow"
                                        placeholder="e.g., 12.345.678/0001-90"
                                    />
                                </div>
                                <div className='mt-5 flex-1'>
                                    <label>Industry(Segmento)</label>
                                    <select
                                        name="industry"
                                        value={formData.industry}
                                        onChange={handleChange}
                                        className="w-full bg-[#EFEFEF] placeholder:text-slate-400 text-slate-700 mb-2 text-sm border border-black rounded-md pl-3 pr-20 py-4 focus:outline-none shadow-sm focus:shadow"
                                        required
                                    >
                                        <option value="">Select an Industry</option>
                                        <option value="Demo 1">Demo 1</option>
                                        <option value="Demo 2">Demo 2</option>
                                        <option value="Demo 3">Demo 3</option>
                                    </select>
                                </div>
                            </div>

                            <h2 className='text-2xl mt-5'>Address</h2>
                            <div className='flex flex-col md:flex-row gap-4'>
                                <div className='mt-5 flex-1'>
                                    <label>Select Country*</label>
                                    <select
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        className="w-full bg-[#EFEFEF] placeholder:text-slate-400 text-slate-700 mb-2 text-sm border border-black rounded-md pl-3 pr-20 py-4 focus:outline-none shadow-sm focus:shadow"
                                        required
                                    >
                                        <option value="">Select Country</option>
                                        {Country.getAllCountries().map((country) => (
                                            <option key={country.isoCode} value={country.isoCode}>
                                                {country.flag} {country.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className='mt-5 flex-1'>
                                    <label>CEP (Postal Code)*</label>
                                    <input
                                        type="text"
                                        name="zip"
                                        value={formData.zip}
                                        onChange={handleChange}
                                        className="w-full bg-[#EFEFEF] placeholder:text-slate-400 text-slate-700 mb-2 text-sm border border-black rounded-md pl-3 pr-20 py-4 focus:outline-none shadow-sm focus:shadow"
                                        placeholder="e.g., 12345-678"
                                        required
                                    />
                                </div>
                                <div className='mt-5 flex-1'>
                                    <label>State (Estado)*</label>
                                    <select
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        className="w-full bg-[#EFEFEF] placeholder:text-slate-400 text-slate-700 mb-2 text-sm border border-black rounded-md pl-3 pr-20 py-4 focus:outline-none shadow-sm focus:shadow"
                                        required
                                    >
                                        <option value="">Select State</option>
                                        {states.map((state) => (
                                            <option key={state.isoCode} value={state.isoCode}>
                                                {state}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className='flex flex-col md:flex-row gap-4'>
                                <div className='mt-5 flex-1'>
                                    <label>Street (Logradouro)*</label>
                                    <input
                                        type="text"
                                        name="street"
                                        value={formData.street}
                                        onChange={handleChange}
                                        className="w-full bg-[#EFEFEF] placeholder:text-slate-400 text-slate-700 mb-2 text-sm border border-black rounded-md pl-3 pr-20 py-4 focus:outline-none shadow-sm focus:shadow"
                                        placeholder="e.g., Rua da Paz"
                                        required
                                    />
                                </div>
                                <div className='mt-5 flex-1'>
                                    <label>Number (Número)*</label>
                                    <input
                                        type="text"
                                        name="number"
                                        value={formData.number}
                                        onChange={handleChange}
                                        className="w-full bg-[#EFEFEF] placeholder:text-slate-400 text-slate-700 mb-2 text-sm border border-black rounded-md pl-3 pr-20 py-4 focus:outline-none shadow-sm focus:shadow"
                                        placeholder="House/building Number"
                                        required
                                    />
                                </div>
                            </div>
                            <div className='flex flex-col md:flex-row gap-4'>
                                <div className='mt-5 flex-1'>
                                    <label>Apartment (Apartmento)</label>
                                    <input
                                        type="text"
                                        name="apartment"
                                        value={formData.apartment}
                                        onChange={handleChange}
                                        className="w-full bg-[#EFEFEF] placeholder:text-slate-400 text-slate-700 mb-2 text-sm border border-black rounded-md pl-3 pr-20 py-4 focus:outline-none shadow-sm focus:shadow"
                                        placeholder="e.g., Rua Avenida"
                                    />
                                </div>
                                <div className='mt-5 flex-1'>
                                    <label>Block (Quadra)*</label>
                                    <input
                                        type="text"
                                        name="block"
                                        value={formData.block}
                                        onChange={handleChange}
                                        className="w-full bg-[#EFEFEF] placeholder:text-slate-400 text-slate-700 mb-2 text-sm border border-black rounded-md pl-3 pr-20 py-4 focus:outline-none shadow-sm focus:shadow"
                                        placeholder="e.g., Rua Avenida"
                                        required
                                    />
                                </div>
                            </div>
                            <div className='flex flex-col md:flex-row gap-4'>
                                <div className='mt-5 flex-1'>
                                    <label>Neighborhood (Bairro)*</label>
                                    <input
                                        type="text"
                                        name="neighborhood"
                                        value={formData.neighborhood}
                                        onChange={handleChange}
                                        className="w-full bg-[#EFEFEF] placeholder:text-slate-400 text-slate-700 mb-2 text-sm border border-black rounded-md pl-3 pr-20 py-4 focus:outline-none shadow-sm focus:shadow"
                                        placeholder="e.g., Centro"
                                        required
                                    />
                                </div>
                                <div className='mt-5 flex-1'>
                                    <label>City (Cidade)*</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className="w-full bg-[#EFEFEF] placeholder:text-slate-400 text-slate-700 mb-2 text-sm border border-black rounded-md pl-3 pr-20 py-4 focus:outline-none shadow-sm focus:shadow"
                                        placeholder="e.g., São Paulo "
                                        required
                                    />
                                </div>
                            </div>

                            <div className='mt-5'>
                                <label>Complement(Complemento)</label>
                                <input
                                    type="text"
                                    name="complement"
                                    value={formData.complement}
                                    onChange={handleChange}
                                    className="w-full bg-[#EFEFEF] placeholder:text-slate-400 text-slate-700 mb-2 text-sm border border-black rounded-md pl-3 pr-20 py-4 focus:outline-none shadow-sm focus:shadow"
                                    placeholder="e.g., Joao Silva"
                                />
                            </div>

                            <h3 className='text-2xl mt-5'>Contact Information</h3>
                            <div className='mt-5'>
                                <label>Email Address*</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-[#EFEFEF] placeholder:text-slate-400 text-slate-700 mb-2 text-sm border border-black rounded-md pl-3 pr-20 py-4 focus:outline-none shadow-sm focus:shadow"
                                    placeholder="Enter your email address"
                                    required
                                />
                            </div>

                            <div className="flex-1">
                                <label>Contact Number*</label>
                                <PhoneInput
                                    international
                                    defaultCountry="BR"
                                    value={corporatePhoneNumber}
                                    onChange={setCorporatePhoneNumber}
                                    className="w-full  placeholder:text-slate-400 text-slate-700 mb-2 text-sm border border-black rounded-md pl-3 pr-20 py-4 focus:outline-none  shadow-sm focus:shadow"
                                    placeholder="Enter phone number"
                                    required
                                />
                            </div>
                            <div className='flex flex-col md:flex-row gap-4'>
                                <div className='mt-5 flex-1'>
                                    <label>Responsible Person's Name*</label>
                                    <input
                                        type="text"
                                        name="responsibleName"
                                        value={formData.responsibleName}
                                        onChange={handleChange}
                                        className="w-full bg-[#EFEFEF] placeholder:text-slate-400 text-slate-700 mb-2 text-sm border border-black rounded-md pl-3 pr-20 py-4 focus:outline-none shadow-sm focus:shadow"
                                        placeholder="e.g., João Silva"
                                        required
                                    />
                                </div>
                                <div className='mt-5 flex-1'>
                                    <label>Contact Number*</label>
                                    <PhoneInput
                                        international
                                        defaultCountry="BR"
                                        value={responsiblePhoneNumber}
                                        onChange={setResponsiblePhoneNumber}
                                        className="w-full  placeholder:text-slate-400 text-slate-700 mb-2 text-sm border border-black rounded-md pl-3 pr-20 py-4 focus:outline-none  shadow-sm focus:shadow"
                                        placeholder="Enter phone number"
                                        required
                                    />
                                </div>
                            </div>

                            <div className='mt-5'>
                                <label>Password*</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full bg-[#EFEFEF] placeholder:text-slate-400 text-slate-700 mb-2 text-sm border border-black rounded-md pl-3 pr-20 py-4 focus:outline-none shadow-sm focus:shadow"
                                    placeholder="Create your password"
                                    required
                                />
                            </div>

                            <div className='flex md:flex-row gap-4 mt-20'>
                                <button type="button" className='flex-1 border border-black rounded-md py-4 font-semibold'>Existing User</button>
                                <button type="submit" className='flex-1 bg-black rounded-md text-white font-semibold' disabled={loading}>
                                    {loading ? 'Registering...' : 'Continue'}
                                </button>
                            </div>
                        </form>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className='container mx-auto p-4'>
            <div className='flex w-full bg-[#EFEFEF] rounded-md mb-4'>
                {tabs.map((tab) => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 py-2 px-4 text-base font-semibold text-center ${activeTab === tab.id ? "bg-white m-2 rounded-lg" : "bg-transparent"}`}>
                        {tab.label}
                    </button>
                ))}
            </div>
            <div>
                {renderContent()}
            </div>

            {/* Display Errors */}
            {error && (
                <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                    <p>Error: {error.message}</p>
                </div>
            )}

            {/* Display Mutation Errors */}
            {data?.accountRegister?.accountErrors?.length > 0 && (
                <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                    {data.accountRegister.accountErrors.map((err, index) => (
                        <p key={index}>{err.field ? `${err.field}: ${err.message}` : err.message}</p>
                    ))}
                </div>
            )}

            {/* Display Success Message */}
            {data?.accountRegister?.user && (
                <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                    <p>Registration successful! Check your email to confirm your account.</p>
                </div>
            )}
        </div>
    );
};

export default Registration;