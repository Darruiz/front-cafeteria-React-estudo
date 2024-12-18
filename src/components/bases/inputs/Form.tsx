import React, { useState, ChangeEvent } from 'react';

type FieldType = 'text' | 'number' | 'email' | 'password' | 'select' | 'textarea' | 'checkbox' | 'radio';

interface Option {
    label: string;
    value: string | number;
}

interface FieldConfig {
    name: string;
    type: FieldType;
    label?: string;
    placeholder?: string;
    options?: Option[];
    defaultValue?: string | number | boolean;
    validation?: (value: string | number | boolean) => string | null;
    required?: boolean;
}

interface FormProps {
    fields: FieldConfig[];
    onSubmit: (data: Record<string, string | number | boolean>) => void;
    submitLabel?: string;
}

export const Form: React.FC<FormProps> = ({ fields, onSubmit, submitLabel = 'Submit' }) => {
    const [formState, setFormState] = useState<Record<string, string | number | boolean>>(
        fields.reduce((acc, field) => {
            acc[field.name] = field.defaultValue || (field.type === 'checkbox' ? false : '');
            return acc;
        }, {} as Record<string, string | number | boolean>)
    );

    const [errors, setErrors] = useState<Record<string, string | null>>({});

    const handleChange = (name: string, value: string | number | boolean) => {
        setFormState((prev) => ({ ...prev, [name]: value }));
    };

    const validateFields = () => {
        const newErrors: Record<string, string | null> = {};
        fields.forEach((field) => {
            if (field.validation) {
                const error = field.validation(formState[field.name]);
                if (error) newErrors[field.name] = error;
            } else if (field.required && !formState[field.name]) {
                newErrors[field.name] = `${field.label || field.name} is required.`;
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateFields()) {
            onSubmit(formState);
        }
    };

    const renderField = (field: FieldConfig) => {
        const commonProps = {
            name: field.name,
            onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
                handleChange(field.name, field.type === 'checkbox' ? e.target.checked : e.target.value),
            className:
                'border rounded-lg p-2 w-full bg-gray-100 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none',
        };

        switch (field.type) {
            case 'select': {
                const value = formState[field.name];
                const selectValue =
                    typeof value === 'boolean' ? '' : (value as string | number | undefined);

                return (
                    <select {...commonProps} value={selectValue}>
                        <option value="" disabled>
                            {field.placeholder || 'Select an option'}
                        </option>
                        {field.options?.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                );
            }
            case 'textarea':
                return <textarea {...commonProps} value={formState[field.name] as string} placeholder={field.placeholder} />;
            case 'checkbox':
                return (
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={formState[field.name] as boolean}
                            {...commonProps}
                        />
                        <label htmlFor={field.name} className="text-gray-700">
                            {field.label}
                        </label>
                    </div>
                );
            case 'radio':
                return (
                    <div className="space-y-2">
                        {field.options?.map((option) => (
                            <label key={option.value} className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name={field.name}
                                    value={option.value}
                                    checked={formState[field.name] === option.value}
                                    onChange={(e) => handleChange(field.name, option.value)}
                                />
                                <span className="text-gray-700">{option.label}</span>
                            </label>
                        ))}
                    </div>
                );
            default:
                return (
                    <input
                        {...commonProps}
                        type={field.type}
                        value={formState[field.name] as string | number}
                        placeholder={field.placeholder}
                    />
                );
        }
    };

    return (
        <form
            className="space-y-6 bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto"
            onSubmit={handleSubmit}
        >
            {fields.map((field) => (
                <div key={field.name} className="space-y-1">
                    {field.label && (
                        <label htmlFor={field.name} className="block text-gray-700 font-semibold">
                            {field.label}
                        </label>
                    )}
                    {renderField(field)}
                    {errors[field.name] && (
                        <p className="text-red-500 text-sm">{errors[field.name]}</p>
                    )}
                </div>
            ))}
            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 transition"
            >
                {submitLabel}
            </button>
        </form>
    );
};