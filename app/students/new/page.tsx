import NewStudentForm from './student-form';

export default function NewStudentPage() {
  const configured = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
  return configured ? <NewStudentForm /> : <main className="grid min-h-screen place-items-center">Authentication configuration required.</main>;
}
