import LoginForm from "@/components/form/LoginForm";
import Container from "@/components/shared/Container";
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Login | Care Infinity",
  description: "Login to access your care services and bookings.",
};

const LoginPage = () => {
  return (
    <div className="py-20 bg-slate-50 min-h-screen flex items-center">
      <Container>
        <div className="max-w-md mx-auto bg-white p-10 rounded-[40px] shadow-xl shadow-blue-100/50 border border-slate-100">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-slate-900">Welcome Back</h1>
            <p className="text-slate-500 mt-2">
              Log in to manage your bookings
            </p>
          </div>

          <LoginForm />
        </div>
      </Container>
    </div>
  );
};

export default LoginPage;

