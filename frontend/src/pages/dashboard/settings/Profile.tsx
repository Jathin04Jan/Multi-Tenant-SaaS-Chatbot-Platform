import { User, Mail, Lock, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  const handleSave = () => {
    toast.success('Profile updated!');
  };

  const handleSignOut = () => {
    // Clear any stored auth data
    localStorage.removeItem('auth-token');
    localStorage.removeItem('wizard-storage');
    toast.success('Signed out successfully');
    navigate('/');
  };

  return (
    <div className="container max-w-4xl px-4 py-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-4xl font-bold mb-2">Profile Settings</h1>
        <p className="text-muted-foreground">Manage your account information</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="glass-card p-8 space-y-6"
      >
        <div>
          <label className="text-sm font-medium block mb-2">Full Name</label>
          <Input
            defaultValue="John Doe"
            className="rounded-xl"
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="text-sm font-medium block mb-2">Email</label>
          <Input
            type="email"
            defaultValue="john@example.com"
            className="rounded-xl"
            readOnly
            disabled
          />
          <p className="text-xs text-muted-foreground mt-1">
            Email cannot be changed
          </p>
        </div>

        <div>
          <label className="text-sm font-medium block mb-2">Avatar URL</label>
          <Input
            type="url"
            placeholder="https://..."
            className="rounded-xl"
          />
        </div>

        <div className="pt-4">
          <Button onClick={handleSave} className="rounded-xl">
            Save Changes
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="glass-card p-8"
      >
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>
        <Button variant="outline" className="rounded-xl glass">
          <Lock className="w-4 h-4 mr-2" />
          Update Password
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="glass-card p-8 border-destructive/20 border-2"
      >
        <h2 className="text-xl font-semibold mb-2 text-destructive">Account Actions</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Sign out of your account. You'll need to sign in again to access your dashboard.
        </p>
        <Button 
          variant="destructive" 
          onClick={handleSignOut}
          className="rounded-xl"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </motion.div>
    </div>
  );
};

export default Profile;
