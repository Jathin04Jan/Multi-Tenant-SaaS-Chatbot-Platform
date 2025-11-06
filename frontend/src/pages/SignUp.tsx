import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Bot, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { signUpSchema, type SignUpInput } from '@/lib/zod-schemas';
import { mockSignUp, mockCreateTenant } from '@/lib/api';
import { useWizardStore } from '@/store/wizard';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const SignUp = () => {
  const navigate = useNavigate();
  const setTenantId = useWizardStore((state) => state.setTenantId);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      terms: false,
    },
  });

  const password = watch('password');
  const getPasswordStrength = () => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    return strength;
  };

  const onSubmit = async (data: SignUpInput) => {
    setIsLoading(true);
    try {
      const userResponse = await mockSignUp(
        data.email, 
        data.password, 
        data.full_name,
        data.company_name,
        data.domain
      );
      if (userResponse.error) {
        toast.error(userResponse.error || 'Failed to create account. Please try again.');
        return;
      }
      
      const tenantResponse = await mockCreateTenant();
      setTenantId(tenantResponse.data.tenantId);
      toast.success('Account created! Check your email to verify.');
      navigate('/verify');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const strengthColor = () => {
    const strength = getPasswordStrength();
    if (strength < 50) return 'bg-destructive';
    if (strength < 75) return 'bg-yellow-500';
    return 'bg-success';
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
              <h1 className="text-2xl font-bold">Create Account</h1>
              <p className="text-sm text-muted-foreground">
                Start your free 14-day trial
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="full_name" className="text-sm font-medium block mb-2">
                Full Name <span className="text-destructive">*</span>
              </label>
              <Input
                id="full_name"
                type="text"
                placeholder="John Doe"
                className="rounded-xl"
                {...register('full_name')}
              />
              {errors.full_name && (
                <p className="text-sm text-destructive mt-1">{errors.full_name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="company_name" className="text-sm font-medium block mb-2">
                Company/Organization Name <span className="text-destructive">*</span>
              </label>
              <Input
                id="company_name"
                type="text"
                placeholder="Acme Corporation"
                className="rounded-xl"
                {...register('company_name')}
              />
              {errors.company_name && (
                <p className="text-sm text-destructive mt-1">{errors.company_name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="domain" className="text-sm font-medium block mb-2">
                Domain (Optional)
              </label>
              <Input
                id="domain"
                type="text"
                placeholder="acme.com"
                className="rounded-xl"
                {...register('domain')}
              />
              {errors.domain && (
                <p className="text-sm text-destructive mt-1">{errors.domain.message}</p>
              )}
            </div>

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
              <label htmlFor="password" className="text-sm font-medium block mb-2">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="rounded-xl"
                {...register('password')}
              />
              {password && (
                <div className="mt-2">
                  <div className="h-1 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${strengthColor()}`}
                      style={{ width: `${getPasswordStrength()}%` }}
                    />
                  </div>
                </div>
              )}
              {errors.password && (
                <p className="text-sm text-destructive mt-1">{errors.password.message}</p>
              )}
            </div>

            <div className="flex items-start gap-2">
              <Controller
                name="terms"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    id="terms"
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(checked === true)}
                  />
                )}
              />
              <label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                I agree to the{' '}
                <Link to="#" className="text-primary hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="#" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
                <span className="text-destructive ml-1">*</span>
              </label>
            </div>
            {errors.terms && (
              <p className="text-sm text-destructive mt-1">{errors.terms.message}</p>
            )}

            <Button
              type="submit"
              className="w-full rounded-xl h-11"
              disabled={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Continue'}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{' '}
            <Link to="/signin" className="text-primary hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;
