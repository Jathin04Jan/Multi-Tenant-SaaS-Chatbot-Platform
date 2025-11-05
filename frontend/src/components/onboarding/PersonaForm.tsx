import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { personaSchema, type PersonaInput } from '@/lib/zod-schemas';
import { useWizardStore } from '@/store/wizard';
import { Bot } from 'lucide-react';

interface PersonaFormProps {
  onComplete?: () => void;
}

export const PersonaForm = ({ onComplete }: PersonaFormProps) => {
  const { persona, updatePersona } = useWizardStore();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PersonaInput>({
    resolver: zodResolver(personaSchema),
    defaultValues: {
      ...persona,
    },
    mode: 'onChange',
  });

  const onSubmit = (data: PersonaInput) => {
    updatePersona({
      botName: data.botName,
    });
    onComplete?.();
  };

  const handleBotNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue('botName', value);
    updatePersona({ botName: value });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Bot className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Persona</h3>
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor="botName" className="text-sm font-medium block mb-2">
            Bot Name
          </label>
          <Input
            id="botName"
            placeholder="Assistant"
            className="rounded-xl"
            {...register('botName')}
            onChange={handleBotNameChange}
          />
          {errors.botName && (
            <p className="text-sm text-destructive mt-1">{errors.botName.message}</p>
          )}
        </div>
      </div>
    </form>
  );
};

