import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bot, Mail, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const Verify = () => {
  const [isResending, setIsResending] = useState(false);

  const handleResend = async () => {
    setIsResending(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success('Verification email sent!');
    setIsResending(false);
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

        <div className="glass-card p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Mail className="w-8 h-8 text-primary" />
            </div>
          </div>

          <h1 className="text-2xl font-bold mb-2">Check Your Email</h1>
          <p className="text-muted-foreground mb-8">
            We've sent a verification link to your email address. Click the link to
            activate your account and get started.
          </p>

          <div className="space-y-3">
            <Button
              onClick={handleResend}
              variant="outline"
              className="w-full rounded-xl glass"
              disabled={isResending}
            >
              {isResending ? 'Sending...' : 'Resend Email'}
            </Button>

            <Button asChild className="w-full rounded-xl">
              <Link to="/dashboard">Continue to Dashboard</Link>
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mt-6">
            Didn't receive the email? Check your spam folder or try resending.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Verify;
