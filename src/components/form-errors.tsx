type FormErrorsProps = {
  errors?: string[];
};

export default function FormErrors({ errors }: FormErrorsProps) {
  return (
    <>
      {errors &&
        errors.map((error) => (
          <p className="mt-2 text-sm text-destructive" key={error}>
            {error}
          </p>
        ))}
    </>
  );
}
