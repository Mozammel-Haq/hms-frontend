import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import Button from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import Logo from '../../components/common/Logo';

// Validation Schema
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, loginDemo } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/portal/dashboard';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const success = await login(data.email, data.password);
    setIsSubmitting(false);

    if (success) {
      navigate(from, { replace: true });
    } else {
      // In a real app, you might distinguish between 401 and other errors
      // setError('root', { message: 'Invalid email or password' });
    }
  };

  const handleDemoLogin = async () => {
    await loginDemo();
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300 bg-secondary-50 dark:bg-secondary-950">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl opacity-30 -mr-20 -mt-20 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-600/10 rounded-full blur-3xl opacity-20 -ml-20 -mb-20 pointer-events-none"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 mt-4 flex flex-col items-center">
        <h2 className="text-center text-3xl font-bold tracking-tight text-secondary-900 dark:text-white mt-3">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-secondary-600 dark:text-secondary-400">
          Or{' '}
          <Link to="/contact" className="font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500 transition-colors">
            contact support if you need help
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white dark:bg-secondary-900 py-8 px-4 sm:rounded-2xl sm:px-10 border border-secondary-200 dark:border-secondary-800 transition-colors duration-300">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  className={`block w-full appearance-none rounded-lg border px-3 py-2 placeholder-secondary-400 focus:outline-none sm:text-sm bg-secondary-50 dark:bg-secondary-950 text-secondary-900 dark:text-white transition-colors ${
                    errors.email
                      ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
                      : 'border-secondary-200 dark:border-secondary-700 focus:border-primary-500 focus:ring-primary-500/20 focus:bg-white dark:focus:bg-secondary-950'
                  }`}
                  {...register('email')}
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-500 dark:text-red-400 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  className={`block w-full appearance-none rounded-lg border px-3 py-2 placeholder-secondary-400 focus:outline-none sm:text-sm bg-secondary-50 dark:bg-secondary-950 text-secondary-900 dark:text-white transition-colors ${
                    errors.password
                      ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
                      : 'border-secondary-200 dark:border-secondary-700 focus:border-primary-500 focus:ring-primary-500/20 focus:bg-white dark:focus:bg-secondary-950'
                  }`}
                  {...register('password')}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-secondary-400 hover:text-secondary-600 dark:hover:text-secondary-300 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <Eye className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
                {errors.password && (
                  <p className="mt-2 text-sm text-red-500 dark:text-red-400 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-secondary-300 dark:border-secondary-700 bg-secondary-50 dark:bg-secondary-900 text-primary-600 focus:ring-primary-500/20 focus:ring-offset-0"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-secondary-600 dark:text-secondary-300">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500 transition-colors">
                  Forgot your password?
                </Link>
              </div>
            </div>

            {errors.root && (
               <div className="rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 p-4">
               <div className="flex">
                 <div className="flex-shrink-0">
                   <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400" aria-hidden="true" />
                 </div>
                 <div className="ml-3">
                   <h3 className="text-sm font-medium text-red-800 dark:text-red-400">{errors.root.message}</h3>
                 </div>
               </div>
             </div>
            )}

            <div>
              <Button
                type="submit"
                variant="primary"
                className="w-full justify-center py-3"
                isLoading={isSubmitting}
              >
                Sign in
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full mt-4 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 hover:border-emerald-500/50 justify-center py-3"
                onClick={handleDemoLogin}
              >
                Demo Login (Preview)
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-secondary-200 dark:border-secondary-800" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white dark:bg-secondary-900 px-2 text-secondary-500">Not a patient yet?</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3">
               <Link to="/contact">
                <Button variant="outline" className="w-full border-secondary-200 dark:border-secondary-700 text-secondary-600 dark:text-secondary-300 hover:text-secondary-900 dark:hover:text-white hover:bg-secondary-50 dark:hover:bg-secondary-800 hover:border-secondary-300 dark:hover:border-secondary-600 justify-center py-3">
                  Contact Registration Desk
                </Button>
               </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
