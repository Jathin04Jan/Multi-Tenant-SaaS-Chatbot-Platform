import { useState } from 'react';
import { motion } from 'framer-motion';
import { Key, Palette, Settings as SettingsIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ApiKeys from './ApiKeys';
import Appearance from './Appearance';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('appearance');

  const settingsTabs = [
    { id: 'appearance', label: 'Appearance', icon: Palette, component: Appearance },
    { id: 'api-keys', label: 'API Keys', icon: Key, component: ApiKeys },
  ];

  const ActiveComponent = settingsTabs.find(tab => tab.id === activeTab)?.component || Appearance;

  return (
    <div className="container max-w-7xl px-4 py-8 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-3"
      >
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <SettingsIcon className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-4xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account and chatbot configuration</p>
        </div>
      </motion.div>

      {/* Settings Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 gap-2 h-auto p-1 glass rounded-xl">
          {settingsTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="flex items-center gap-2 px-3 py-2 rounded-lg glass transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:ring-2 data-[state=active]:ring-primary/50 data-[state=inactive]:bg-background/40 data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:bg-background/60"
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {/* Tab Content */}
        <div className="min-h-[600px]">
          {settingsTabs.map((tab) => {
            const Component = tab.component;
            return (
              <TabsContent key={tab.id} value={tab.id} className="mt-0 outline-none">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Component />
                </motion.div>
              </TabsContent>
            );
          })}
        </div>
      </Tabs>
    </div>
  );
};

export default Settings;

