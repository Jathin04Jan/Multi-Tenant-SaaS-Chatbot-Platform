import { useNavigate } from 'react-router-dom';
import { BrandingForm } from '@/components/onboarding/BrandingForm';
import { PersonaForm } from '@/components/onboarding/PersonaForm';
import { BotPreview } from '@/components/onboarding/BotPreview';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useWizardStore } from '@/store/wizard';
import { motion } from 'framer-motion';

const Brand = () => {
  const navigate = useNavigate();
  const completeStep = useWizardStore((state) => state.completeStep);

  const handleComplete = () => {
    completeStep(1);
    navigate('/dashboard/onboarding/data');
  };

  return (
    <div className="container max-w-7xl px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold mb-2">Brand & Personality</h1>
        <p className="text-muted-foreground">
          Customize how your chatbot looks and sounds
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="glass-card p-8"
        >
          <Tabs defaultValue="branding" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="branding">Branding</TabsTrigger>
              <TabsTrigger value="persona">Persona</TabsTrigger>
            </TabsList>
            <TabsContent value="branding">
              <BrandingForm onComplete={handleComplete} />
            </TabsContent>
            <TabsContent value="persona">
              <PersonaForm onComplete={handleComplete} />
            </TabsContent>
          </Tabs>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <BotPreview />
        </motion.div>
      </div>
    </div>
  );
};

export default Brand;
