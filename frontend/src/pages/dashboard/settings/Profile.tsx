import { useState, useEffect } from 'react';
import { User, Mail, Lock, LogOut, Building2, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '@/lib/api';

interface UserData {
  id: string;
  email: string;
  full_name: string;
  company_name: string;
  domain: string | null;
  status: string;
  plan: string | null;
  is_verified: boolean;
  created_at: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [formData, setFormData] = useState({
    full_name: '',
    company_name: '',
    domain: '',
  });

  // Fetch user data on mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await apiRequest<UserData>('/auth/me', {
          method: 'GET',
        });
        
        if (response.error) {
          toast.error(response.error || 'Failed to load profile');
          return;
        }
        
        if (response.data) {
          setUserData(response.data);
          setFormData({
            full_name: response.data.full_name || '',
            company_name: response.data.company_name || '',
            domain: response.data.domain || '',
          });
        }
      } catch (error) {
        toast.error('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await apiRequest<UserData>('/auth/me', {
        method: 'PATCH',
        body: JSON.stringify({
          full_name: formData.full_name,
          company_name: formData.company_name,
          domain: formData.domain || null,
        }),
      });
      
      if (response.error) {
        toast.error(response.error || 'Failed to update profile');
        return;
      }
      
      if (response.data) {
        setUserData(response.data);
        toast.success('Profile updated successfully!');
      }
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = () => {
    // Clear any stored auth data
    localStorage.removeItem('access_token');
    localStorage.removeItem('wizard-storage');
    toast.success('Signed out successfully');
    navigate('/');
  };

  if (loading) {
    return (
      <div className="container max-w-4xl px-4 py-8">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

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

      {/* Profile Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="glass-card p-8 space-y-6"
      >
        <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="full_name" className="text-sm font-medium mb-2 flex items-center gap-2">
              <User className="w-4 h-4" />
              Full Name
            </Label>
            <Input
              id="full_name"
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              className="rounded-xl"
              placeholder="Your full name"
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-sm font-medium mb-2 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={userData?.email || ''}
              className="rounded-xl bg-muted"
              readOnly
              disabled
            />
            <p className="text-xs text-muted-foreground mt-1">
              Email cannot be changed
            </p>
          </div>

          <div>
            <Label htmlFor="company_name" className="text-sm font-medium mb-2 flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Company/Organization Name
            </Label>
            <Input
              id="company_name"
              value={formData.company_name}
              onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
              className="rounded-xl"
              placeholder="Your company name"
            />
          </div>

          <div>
            <Label htmlFor="domain" className="text-sm font-medium mb-2 flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Domain (Optional)
            </Label>
            <Input
              id="domain"
              value={formData.domain}
              onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
              className="rounded-xl"
              placeholder="example.com"
            />
          </div>
        </div>

        <div className="pt-4">
          <Button 
            onClick={handleSave} 
            className="rounded-xl"
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Changes'}
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
