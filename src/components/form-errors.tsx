type FormErrorsProps = {
  errors?: string[];
  id: string;
};

export default function FormErrors({ errors, id }: FormErrorsProps) {
  return (
    <div
      id={id}
      aria-live="polite"
      aria-atomic="true"
      className="mt-2 space-y-2"
    >
      {errors &&
        errors.map((error) => (
          <p className="text-sm text-destructive" key={error}>
            {error}
          </p>
        ))}
    </div>
  );
}
