import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const createAccount: React.FC = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        collegeName: '',
        year: '',
        location: '',
        linkedin: '',
        gitHub: '',
        twitter: '',
    });

    const [formStep, setFormStep] = useState(1);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' }); // Clear the error message on change
    };

    
    const validateEmail = (email: string) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    };

    const validateURL = (url: string) => {
        const re = /^(https?:\/\/)?([\w-]+)+([\w-]+)+([\w-]+)(\/[\w-]*)*\/?$/;
        return re.test(String(url).toLowerCase());
    };

    const validateStep1 = () => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.firstName) newErrors.firstName = 'Firstname is required';
        if (!formData.lastName) newErrors.lastName = 'Lastname is required';
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Invalid email format';
        }
        if (!formData.collegeName) newErrors.collegeName = 'College Name is required';
        if (!formData.year) newErrors.year = 'Year is required';
        if (!formData.location) newErrors.location = 'Location is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = () => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.linkedin) {
            newErrors.linkedin = 'LinkedIn is required';
        } else if (!validateURL(formData.linkedin)) {
            newErrors.linkedin = 'Invalid LinkedIn URL';
        }
        if (!formData.gitHub) {
            newErrors.gitHub = 'GitHub is required';
        } else if (!validateURL(formData.gitHub)) {
            newErrors.gitHub = 'Invalid GitHub URL';
        }
        if (!formData.twitter) {
            newErrors.twitter = 'Twitter is required';
        } else if (!validateURL(formData.twitter)) {
            newErrors.twitter = 'Invalid Twitter URL';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault();

        if (formStep === 1 && validateStep1()) {
            setFormStep(formStep + 1);
        } else if (formStep === 2 && validateStep2()) {
            setFormStep(formStep + 1);
        }
    };

    const handleSkip = (e: React.FormEvent) => {
        e.preventDefault();
        navigate('/dashboard/:userName'); // Redirect to the user dashboard
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateStep2()) {
            // Handle form submission logic here
            console.log(formData);
            navigate('/dashboard/:userName');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-mainbg">
            <form className="flex flex-col gap-4 max-w-md p-8 rounded-2xl bg-gray-800 text-white border border-gray-700 shadow-xl" onSubmit={handleSubmit}>
                <p className="text-2xl font-semibold text-cyan-500 relative flex items-center pl-7">
                    Profile Details
                    <span className="absolute left-0 w-4 h-4 rounded-full bg-cyan-500"></span>
                    <span className="absolute left-0 w-4 h-4 rounded-full bg-cyan-500 animate-pulse"></span>
                </p>

                {formStep === 1 && (
                    <>
                        <p className="text-sm text-gray-400">Fill in your personal details</p>
                        <div className="flex gap-2">
                            <label className="relative w-full">
                                <input
                                    className={`bg-gray-700 text-white w-full p-4 pt-5 rounded-lg border ${errors.firstName ? 'border-red-600' : 'border-gray-600'} outline-none placeholder-transparent focus:placeholder-transparent`}
                                    type="text"
                                    name="firstName"
                                    placeholder="Firstname"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                                <span className={`absolute left-3 top-1 transition-all duration-300 ${formData.firstName ? 'text-xs -top-3 text-cyan-500' : 'text-sm top-3 text-blue-400'} pointer-events-none`}>
                                    Firstname
                                </span>
                                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                            </label>
                            <label className="relative w-full">
                                <input
                                    className={`bg-gray-700 text-white w-full p-4 pt-5 rounded-lg border ${errors.lastName ? 'border-red-600' : 'border-gray-600'} outline-none placeholder-transparent focus:placeholder-transparent`}
                                    type="text"
                                    name="lastName"
                                    placeholder="Lastname"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                                <span className={`absolute left-3 top-1 transition-all duration-300 ${formData.lastName ? 'text-xs -top-3 text-cyan-500' : 'text-sm top-3 text-blue-400'} pointer-events-none`}>
                                    Lastname
                                </span>
                                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                            </label>
                        </div>
                        <label className="relative w-full">
                            <input
                                className={`bg-gray-700 text-white w-full p-4 pt-5 rounded-lg border ${errors.email ? 'border-red-600' : 'border-gray-600'} outline-none placeholder-transparent focus:placeholder-transparent`}
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <span className={`absolute left-3 top-1 transition-all duration-300 ${formData.email ? 'text-xs -top-3 text-cyan-500' : 'text-sm top-3 text-blue-400'} pointer-events-none`}>
                                Email
                            </span>
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </label>
                        <label className="relative w-full">
                            <input
                                className={`bg-gray-700 text-white w-full p-4 pt-5 rounded-lg border ${errors.collegeName ? 'border-red-600' : 'border-gray-600'} outline-none placeholder-transparent focus:placeholder-transparent`}
                                type="text"
                                name="collegeName"
                                placeholder="College Name"
                                value={formData.collegeName}
                                onChange={handleChange}
                                required
                            />
                            <span className={`absolute left-3 top-1 transition-all duration-300 ${formData.collegeName ? 'text-xs -top-3 text-cyan-500' : 'text-sm top-3 text-blue-400'} pointer-events-none`}>
                                College Name
                            </span>
                            {errors.collegeName && <p className="text-red-500 text-xs mt-1">{errors.collegeName}</p>}
                        </label>
                        <label className="relative w-full">
                            <select
                                className={`bg-gray-700 text-white w-full p-4 rounded-lg border ${errors.year ? 'border-red-600' : 'border-gray-600'} outline-none`}
                                name="year"
                                value={formData.year}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled></option>
                                <option value="1">1st Year</option>
                                <option value="2">2nd Year</option>
                                <option value="3">3rd Year</option>
                                <option value="4">4th Year</option>
                                <option value="passout">Passout</option>
                            </select>
                            <span className={`absolute left-3 top-1 transition-all duration-300 ${formData.year ? 'text-xs -top-3 text-cyan-500' : 'text-sm top-3 text-blue-400'} pointer-events-none`}>
                                Year
                            </span>
                            {errors.year && <p className="text-red-500 text-xs mt-1">{errors.year}</p>}
                        </label>
                        <label className="relative w-full">
                            <input
                                className={`bg-gray-700 text-white w-full p-4 pt-5 rounded-lg border ${errors.location ? 'border-red-600' : 'border-gray-600'} outline-none placeholder-transparent focus:placeholder-transparent`}
                                type="text"
                                name="location"
                                placeholder="Location"
                                value={formData.location}
                                onChange={handleChange}
                                required
                            />
                            <span className={`absolute left-3 top-1 transition-all duration-300 ${formData.location ? 'text-xs -top-3 text-cyan-500' : 'text-sm top-3 text-blue-400'} pointer-events-none`}>
                                Location
                            </span>
                            {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
                        </label>
                        <button className="w-full py-3 rounded-lg text-white bg-cyan-500 hover:bg-cyan-600 transition-all" onClick={handleNext}>
                            Next
                        </button>
                    </>
                )}

                {formStep === 2 && (
                    <>
                        <p className="text-sm text-gray-400">Provide your social links</p>
                        <label className="relative w-full">
                            <input
                                className={`bg-gray-700 text-white w-full p-4 pt-5 rounded-lg border ${errors.linkedin ? 'border-red-600' : 'border-gray-600'} outline-none placeholder-transparent focus:placeholder-transparent`}
                                type="url"
                                name="linkedin"
                                placeholder="LinkedIn"
                                value={formData.linkedin}
                                onChange={handleChange}
                                required
                            />
                            <span className={`absolute left-3 top-1 transition-all duration-300 ${formData.linkedin ? 'text-xs -top-3 text-cyan-500' : 'text-sm top-3 text-blue-400'} pointer-events-none`}>
                                LinkedIn
                            </span>
                            {errors.linkedin && <p className="text-red-500 text-xs mt-1">{errors.linkedin}</p>}
                        </label>
                        <label className="relative w-full">
                            <input
                                className={`bg-gray-700 text-white w-full p-4 pt-5 rounded-lg border ${errors.gitHub ? 'border-red-600' : 'border-gray-600'} outline-none placeholder-transparent focus:placeholder-transparent`}
                                type="url"
                                name="gitHub"
                                placeholder="GitHub"
                                value={formData.gitHub}
                                onChange={handleChange}
                                required
                            />
                            <span className={`absolute left-3 top-1 transition-all duration-300 ${formData.gitHub ? 'text-xs -top-3 text-cyan-500' : 'text-sm top-3 text-blue-400'} pointer-events-none`}>
                                GitHub
                            </span>
                            {errors.gitHub && <p className="text-red-500 text-xs mt-1">{errors.gitHub}</p>}
                        </label>
                        <label className="relative w-full">
                            <input
                                className={`bg-gray-700 text-white w-full p-4 pt-5 rounded-lg border ${errors.twitter ? 'border-red-600' : 'border-gray-600'} outline-none placeholder-transparent focus:placeholder-transparent`}
                                type="url"
                                name="twitter"
                                placeholder="Twitter"
                                value={formData.twitter}
                                onChange={handleChange}
                                required
                            />
                            <span className={`absolute left-3 top-1 transition-all duration-300 ${formData.twitter ? 'text-xs -top-3 text-cyan-500' : 'text-sm top-3 text-blue-400'} pointer-events-none`}>
                                Twitter
                            </span>
                            {errors.twitter && <p className="text-red-500 text-xs mt-1">{errors.twitter}</p>}
                        </label>
                        <div className="flex gap-2 mt-4">
                            <button className="w-full py-3 rounded-lg text-white bg-cyan-500 hover:bg-cyan-600 transition-all" onClick={handleSkip}>
                                Skip
                            </button>
                            <button className="w-full py-3 rounded-lg text-white bg-gray-600 hover:bg-gray-700 transition-all" onClick={handleSubmit}>
                                Finish
                            </button>
                        </div>
                    </>
                )}
            </form>
        </div>
    );
};

export default createAccount;
