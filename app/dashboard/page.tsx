import AccountDashboard from './account-dashboard';

export default function DashboardPage() {
  const configured = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
  return configured ? <AccountDashboard /> : <main className="grid min-h-screen place-items-center bg-[#eef3f4] p-6"><p>Authentication configuration required.</p></main>;
}
