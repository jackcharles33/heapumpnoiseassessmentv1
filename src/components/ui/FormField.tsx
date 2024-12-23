interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const FormField = ({ label, children, icon }: FormFieldProps) => {
  return (
    <div className="animate-fade-in">
      <label className="flex items-center gap-2 text-sm font-medium text-purple-300 mb-2">
        {icon}
        {label}
      </label>
      {children}
    </div>
  );
};