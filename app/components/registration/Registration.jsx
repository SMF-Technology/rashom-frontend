"use client";

import React, { useState } from 'react';
import { Country, State } from 'country-state-city';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
const Registration = () => {
    const [activeTab, setActiveTab] = useState('individual');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [userPhoneNumber, setUserPhoneNumber] = useState('');
    const [corporatePhoneNumber, setCorporatePhoneNumber] = useState('');
    const [responsiblePhoneNumber, setResponsiblePhoneNumber] = useState('');
    const [states, setStates] = useState([]);

    const handleCountryChange = (event) => {
        const countryCode = event.target.value;
        setSelectedCountry(countryCode);
        const statesList = State.getStatesOfCountry(countryCode);
        setStates(statesList);
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
                        <form>
                            <div className='mt-5'>
                                <label>Full Name*</label>
                                <input
                                    type="text"
                                    className="w-full bg-[#EFEFEF] placeholder:text-slate-400 text-slate-700 mb-2 text-sm border border-black rounded-md pl-3 pr-20 py-4 focus:outline-none shadow-sm focus:shadow"
                                    placeholder="e.g., Joao Silva"
                                    required
                                />
                            </div>

                            <div className='flex flex-col md:flex-row gap-4'>
                                <div className='mt-5 flex-1'>
                                    <label>Date of Birth*</label>
                                    <input
                                        type="date"
                                        className="w-full bg-[#EFEFEF] placeholder:text-slate-400 text-slate-700 mb-2 text-sm border border-black rounded-md pl-3 pr-20 py-4 focus:outline-none shadow-sm focus:shadow"
                                        placeholder="MM/DD/YYYY"

                                    />
                                </div>
                                <div className='mt-5 flex-1'>
                                    <label>CPF*</label>
                                    <input
                                        type="text"
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
                                    <select required
                                        className="w-full bg-[#EFEFEF] placeholder:text-slate-400 text-slate-700 mb-2 text-sm border border-black rounded-md pl-3 pr-20 py-4 focus:outline-none shadow-sm focus:shadow"
                                        onChange={handleCountryChange}
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
                                        className="w-full bg-[#EFEFEF] placeholder:text-slate-400 text-slate-700 mb-2 text-sm border border-black rounded-md pl-3 pr-20 py-4 focus:outline-none shadow-sm focus:shadow"
                                        placeholder="e.g., 12345-678"
                                        required
                                    />
                                </div>
                                <div className='mt-5 flex-1'>
                                    <label>State (Estado)*</label>
                                    <select required
                                        className="w-full bg-[#EFEFEF] placeholder:text-slate-400 text -slate-700 mb-2 text-sm border border-black rounded-md pl-3 pr-20 py-4 focus:outline-none shadow-sm focus:shadow">
                                        <option value="">Select State</option>
                                        {states.map((state) => (
                                            <option key={state.isoCode} value={state.isoCode}>
                                                {state.name}
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
                                        className="w-full bg-[#EFEFEF] placeholder:text-slate-400 text-slate-700 mb-2 text-sm border border-black rounded-md pl-3 pr-20 py-4 focus:outline-none shadow-sm focus:shadow"
                                        placeholder="e.g., Rua da Paz"
                                        required
                                    />
                                </div>
                                <div className='mt-5 flex-1'>
                                    <label>Number (Número)*</label>
                                    <input
                                        type="text"
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
                                        className="w-full bg-[#EFEFEF] placeholder:text-slate-400 text-slate-700 mb-2 text-sm border border-black rounded-md pl-3 pr-20 py-4 focus:outline-none shadow-sm focus:shadow"
                                        placeholder="e.g., Rua Avenida"

                                    />
                                </div>
                                <div className='mt-5 flex-1'>
                                    <label>Block (Quadra)*</label>
                                    <input
                                        type="text"
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
                                        className="w-full bg-[#EFEFEF] placeholder:text-slate-400 text-slate-700 mb-2 text-sm border border-black rounded-md pl-3 pr-20 py-4 focus:outline-none shadow-sm focus:shadow"
                                        placeholder="e.g., Centro"
                                        required
                                    />
                                </div>
                                <div className='mt-5 flex-1'>
                                    <label>City (Cidade)*</label>
                                    <input
                                        type="text"
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
                                    className="w-full bg-[#EFEFEF] placeholder:text-slate-400 text-slate-700 mb-2 text-sm border border-black rounded-md pl-3 pr-20 py-4 focus:outline-none shadow-sm focus:shadow"
                                    placeholder="e.g., Joao Silva"

                                />
                            </div>

                            <h3 className='text-2xl mt-5'>Contact Information</h3>


                            <div className='mt-5'>
                                <label>Email Address*</label>
                                <input
                                    type="email"
                                    className="w-full bg-[#EFEFEF] placeholder:text-slate-400 text-slate-700 mb-2 text-sm border border-black rounded-md pl-3 pr-20 py-4 focus:outline-none shadow-sm focus:shadow"
                                    placeholder="Enter your email address"

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

                                />

                            </div>

                            <div className='flex md:flex-row gap-4 mt-20'>
                                <button className='flex-1 border border-black rounded-md py-4 font-semibold'>Existing User</button>
                                <button className='flex-1 bg-black rounded-md text-white font-semibold'>Continue</button>
                            </div>
                        </form>
                    </div>
                );
            case "corporate":
                return (
                    <div>
                        <h1 className='text-2xl'>Corporate Information</h1>
                        <form>
                            <div className='mt-5'>
                                <label>Company Name*</label>
                                <input
                                    type="text"
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
                                        className="w-full bg-[#EFEFEF] placeholder:text-slate-400 text-slate-700 mb-2 text-sm border border-black rounded-md pl-3 pr-20 py-4 focus:outline-none shadow-sm focus:shadow"
                                        placeholder="e.g., 12.345.678/0001-90"
                                        required

                                    />
                                </div>
                                <div className='mt-5 flex-1'>
                                    <label>Trade Name(Nome Fantasia)</label>
                                    <input
                                        type="text"
                                        className="w-full bg-[#EFEFEF] placeholder:text-slate-400 text-slate-700 mb-2 text-sm border border-black rounded-md pl-3 pr-20 py-4 focus:outline-none shadow-sm focus:shadow"
                                        placeholder="e.g., 123.456.789-09"

                                    />
                                </div>
                            </div>
                            <div className='flex flex-col md:flex-row gap-4'>
                                <div className='mt-5 flex-1'>
                                    <label>State Registration	</label>
                                    <input
                                        type="text"
                                        className="w-full bg-[#EFEFEF] placeholder:text-slate-400 text-slate-700 mb-2 text-sm border border-black rounded-md pl-3 pr-20 py-4 focus:outline-none shadow-sm focus:shadow"
                                        placeholder="e.g., 12.345.678/0001-90"

                                    />
                                </div>
                                <div className='mt-5 flex-1'>
                                    <label>Industry(Segmento)</label>
                                    <select className="w-full bg-[#EFEFEF] placeholder:text-slate-400 text-slate-700 mb-2 text-sm border border-black rounded-md pl-3 pr-20 py-4 focus:outline-none shadow-sm focus:shadow"
                                        required>
                                        <option value="">Select an Industry</option>
                                        <option value="">Demo 1</option>
                                        <option value="">Demo 2</option>
                                        <option value="">Demo 3</option>
                                    </select>
                                </div>
                            </div>

                            <h2 className='text-2xl mt-5'>Address</h2>
                            <div className='flex flex-col md:flex-row gap-4'>
                                <div className='mt-5 flex-1'>
                                    <label>Select Country*</label>
                                    <select required
                                        className="w-full bg-[#EFEFEF] placeholder:text-slate-400 text-slate-700 mb-2 text-sm border border-black rounded-md pl-3 pr-20 py-4 focus:outline-none shadow-sm focus:shadow"
                                        onChange={handleCountryChange}
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
                                        className="w-full bg-[#EFEFEF] placeholder:text-slate-400 text-slate-700 mb-2 text-sm border border-black rounded-md pl-3 pr-20 py-4 focus:outline-none shadow-sm focus:shadow"
                                        placeholder="e.g., 12345-678"
                                        required
                                    />
                                </div>
                                <div className='mt-5 flex-1'>
                                    <label>State (Estado)*</label>
                                    <select required
                                        className="w-full bg-[#EFEFEF] placeholder:text-slate-400 text -slate-700 mb-2 text-sm border border-black rounded-md pl-3 pr-20 py-4 focus:outline-none shadow-sm focus:shadow">
                                        <option value="">Select State</option>
                                        {states.map((state) => (
                                            <option key={state.isoCode} value={state.isoCode}>
                                                {state.name}
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
                                        className="w-full bg-[#EFEFEF] placeholder:text-slate-400 text-slate-700 mb-2 text-sm border border-black rounded-md pl-3 pr-20 py-4 focus:outline-none shadow-sm focus:shadow"
                                        placeholder="e.g., Rua da Paz"
                                        required
                                    />
                                </div>
                                <div className='mt-5 flex-1'>
                                    <label>Number (Número)*</label>
                                    <input
                                        type="text"
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
                                        className="w-full bg-[#EFEFEF] placeholder:text-slate-400 text-slate-700 mb-2 text-sm border border-black rounded-md pl-3 pr-20 py-4 focus:outline-none shadow-sm focus:shadow"
                                        placeholder="e.g., Rua Avenida"

                                    />
                                </div>
                                <div className='mt-5 flex-1'>
                                    <label>Block (Quadra)*</label>
                                    <input
                                        type="text"
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
                                        className="w-full bg-[#EFEFEF] placeholder:text-slate-400 text-slate-700 mb-2 text-sm border border-black rounded-md pl-3 pr-20 py-4 focus:outline-none shadow-sm focus:shadow"
                                        placeholder="e.g., Centro"
                                        required
                                    />
                                </div>
                                <div className='mt-5 flex-1'>
                                    <label>City (Cidade)*</label>
                                    <input
                                        type="text"
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
                                    className="w-full bg-[#EFEFEF] placeholder:text-slate-400 text-slate-700 mb-2 text-sm border border-black rounded-md pl-3 pr-20 py-4 focus:outline-none shadow-sm focus:shadow"
                                    placeholder="e.g., Joao Silva"

                                />
                            </div>

                            <h3 className='text-2xl mt-5'>Contact Information</h3>


                            <div className='mt-5'>
                                <label>Email Address*</label>
                                <input
                                    type="email"
                                    className="w-full bg-[#EFEFEF] placeholder:text-slate-400 text-slate-700 mb-2 text-sm border border-black rounded-md pl-3 pr-20 py-4 focus:outline-none shadow-sm focus:shadow"
                                    placeholder="Enter your email address"

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
                                />

                            </div>
                            <div className='flex flex-col md:flex-row gap-4'>

                                <div className='mt-5 flex-1'>
                                    <label>Responsible Person's Name*</label>
                                    <input
                                        type="text"
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
                                    />
                                </div>

                            </div>

                            <div className='flex md:flex-row gap-4 mt-20'>
                                <button className='flex-1 border border-black rounded-md py-4 font-semibold'>Existing User</button>
                                <button className='flex-1 bg-black rounded-md text-white font-semibold'>Continue</button>
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
        </div>
    );
};

export default Registration;