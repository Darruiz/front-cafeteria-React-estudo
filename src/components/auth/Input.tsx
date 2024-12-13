interface InputProps {
    id: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    label?: string;
}

const Input = ({ id, type, value, onChange, placeholder, label }: InputProps) => {
    return (
        <div className="mb-4">
            {label && <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>}
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder={placeholder}
                required
            />
        </div>
    );
};

export default Input;