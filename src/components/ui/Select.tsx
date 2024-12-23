interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
}

export const Select = ({ options, ...props }: SelectProps) => {
  return (
    <select
      {...props}
      className="neumorphic-input w-full text-white cursor-pointer"
    >
      <option value="" className="bg-[#1E0B36] text-white">Select an option</option>
      {options.map(({ value, label }) => (
        <option key={value} value={value} className="bg-[#1E0B36] text-white">
          {label}
        </option>
      ))}
    </select>
  );
};