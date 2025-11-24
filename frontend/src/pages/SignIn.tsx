import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Bot, ArrowLeft, Shield, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { signInSchema, type SignInInput } from '@/lib/zod-schemas';
import { mockSignIn } from '@/lib/api';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useUserStore } from '@/store/user';

const SignIn = () => {
  const navigate = useNavigate();
  const setUserName = useUserStore((state) => state.setUserName);
  const setUserEmail = useUserStore((state) => state.setUserEmail);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isResetOpen, setIsResetOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const [resetError, setResetError] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    mode: 'onChange',
  });

  const emailValue = watch('email');

  const onSubmit = async (data: SignInInput) => {
    setIsLoading(true);
    try {
      const response = await mockSignIn(data.email, data.password);
      if (response.error) {
        toast.error(response.error || 'Invalid credentials. Please try again.');
      } else {
        const fullName = response.data.user?.full_name || 'User';
        const email = response.data.user?.email || data.email;
        setUserName(fullName);
        setUserEmail(email);
        toast.success('Welcome back!');
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <div className="glass-card p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Bot className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Welcome Back</h1>
              <p className="text-sm text-muted-foreground">
                Sign in to your account
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="email" className="text-sm font-medium block mb-2">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                className="rounded-xl"
                {...register('email')}
              />
              {errors.email && (
                <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <button
                  type="button"
                  className="text-sm text-primary hover:underline"
                  onClick={() => {
                    setResetEmail(emailValue || '');
                    setResetError('');
                    setResetSent(false);
                    setIsResetOpen(true);
                  }}
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="rounded-xl pr-12"
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 px-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive mt-1">{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full rounded-xl h-11"
              disabled={!isValid || isLoading}
            >
              {isLoading ? 'Signing in...' : 'Continue'}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary hover:underline font-medium">
              Sign up
            </Link>
          </p>

          <div className="mt-6 pt-6 border-t border-border/50">
            <Link
              to="/admin/signin"
              className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
            >
              <Shield className="w-4 h-4 group-hover:text-primary transition-colors" />
              <span>Admin Sign In</span>
            </Link>
          </div>
        </div>
      </motion.div>

      <Dialog open={isResetOpen} onOpenChange={setIsResetOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Reset your password</DialogTitle>
            <DialogDescription>
              Enter the email associated with your account and we'll send you a secure reset link.
            </DialogDescription>
          </DialogHeader>

          {!resetSent ? (
            <>
              <div className="space-y-2">
                <label htmlFor="reset_email" className="text-sm font-medium">
                  Email address
                </label>
                <Input
                  id="reset_email"
                  type="email"
                  placeholder="you@company.com"
                  value={resetEmail}
                  onChange={(event) => {
                    setResetEmail(event.target.value);
                    if (resetError) setResetError('');
                  }}
                />
                {resetError && <p className="text-sm text-destructive">{resetError}</p>}
              </div>
              <Button
                className="w-full rounded-xl mt-6"
                onClick={() => {
                  if (!resetEmail) {
                    setResetError('Please enter the email you use to sign in.');
                    return;
                  }
                  setResetSent(true);
                  toast.success(`Password reset email sent to ${resetEmail}`);
                }}
              >
                Send reset link
              </Button>
            </>
          ) : (
            <div className="space-y-4">
              <div className="rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-primary-foreground/90">
                We've sent instructions to <span className="font-semibold">{resetEmail}</span>. It usually arrives within a minute.
              </div>
              <Button className="w-full rounded-xl" onClick={() => setIsResetOpen(false)}>
                Back to sign in
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SignIn;
