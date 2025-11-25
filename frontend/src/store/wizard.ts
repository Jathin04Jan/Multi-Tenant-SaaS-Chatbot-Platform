import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface BrandLogoMetadata {
  objectKey?: string | null;
  filename?: string | null;
  contentType?: string | null;
  size?: number | null;
  uploadedAt?: string | null;
}

export interface BrandConfig {
  logo?: string | null;
  logoMetadata?: BrandLogoMetadata | null;
  logoZoom: number;
  primaryColor: string;
  welcomeMessage: string;
}

export interface PersonaConfig {
  botName: string;
}

export interface ToneConfig {
  llmTemperature: number; // 0-1
  communicationStyle: 'professional' | 'friendly' | 'casual' | 'technical' | 'supportive' | 'enthusiastic';
  stylePrompt: string;
}

export interface GuardrailsConfig {
  maxResponseLength: number;
  blockedPhrases: string[];
  enableFactChecking: boolean;
  blockExplicitContent: boolean;
  blockPoliticalViews: boolean;
  strictlyStickToTopic: boolean;
  blockPersonalInfo: boolean;
  customInstructions: string;
}

export interface DataSource {
  id: string;
  name: string;
  type: 'upload' | 'crawl';
  status: 'queued' | 'processing' | 'indexed' | 'failed';
  size?: number;
  url?: string;
  updatedAt: string;
}

interface WizardState {
  tenantId: string | null;
  agentId: string | null;
  
  // Step 1: Brand & Persona
  branding: BrandConfig;
  persona: PersonaConfig;
  
  // Step 2: Tone
  tone: ToneConfig;
  
  // Step 5: Guardrails
  guardrails: GuardrailsConfig;
  
  // Step 3: Data sources
  dataSources: DataSource[];
  
  // Step 3: Indexing progress
  indexingProgress: number;
  indexingStatus: 'idle' | 'running' | 'completed' | 'failed';
  
  // Step completion
  completedSteps: Set<number>;
  currentStep: number;
  
  // Actions
  setTenantId: (id: string) => void;
  setAgentId: (id: string) => void;
  updateBranding: (branding: Partial<BrandConfig>) => void;
  updatePersona: (persona: Partial<PersonaConfig>) => void;
  updateTone: (tone: Partial<ToneConfig>) => void;
  updateGuardrails: (guardrails: Partial<GuardrailsConfig>) => void;
  addDataSource: (source: DataSource) => void;
  removeDataSource: (id: string) => void;
  updateDataSource: (id: string, updates: Partial<DataSource>) => void;
  setIndexingProgress: (progress: number) => void;
  setIndexingStatus: (status: WizardState['indexingStatus']) => void;
  completeStep: (step: number) => void;
  setCurrentStep: (step: number) => void;
  resetWizard: () => void;
}

// Safari compatibility: Helper to ensure completedSteps is always a Set
const ensureSet = (value: unknown): Set<number> => {
  if (value instanceof Set) {
    return value;
  }
  // Handle case where Safari deserializes Set as array
  if (Array.isArray(value)) {
    return new Set(value);
  }
  // Handle case where it might be an object-like structure
  if (value && typeof value === 'object') {
    try {
      // If it's a plain object, try to convert values
      const values = Object.values(value).filter((v) => typeof v === 'number') as number[];
      if (values.length > 0) {
        return new Set(values);
      }
    } catch {
      // Ignore errors
    }
  }
  return new Set<number>();
};

const initialState = {
  tenantId: null,
  agentId: null,
  branding: {
    logo: null,
    logoMetadata: null,
    logoZoom: 1,
    primaryColor: '#6366f1',
    welcomeMessage: 'Hello! How can I help you today?',
  },
  persona: {
    botName: 'Assistant',
  },
  tone: {
    llmTemperature: 0.7,
    communicationStyle: 'friendly' as const,
    stylePrompt: 'You are a friendly and warm assistant. Be approachable, empathetic, and conversational. Use a welcoming tone that makes users feel comfortable. Show genuine interest in helping them.',
  },
  guardrails: {
    maxResponseLength: 500,
    blockedPhrases: [],
    enableFactChecking: true,
    blockExplicitContent: true,
    blockPoliticalViews: true,
    strictlyStickToTopic: true,
    blockPersonalInfo: true,
    customInstructions: '',
  },
  dataSources: [],
  indexingProgress: 0,
  indexingStatus: 'idle' as const,
  completedSteps: new Set<number>(),
  currentStep: 1,
};

export const useWizardStore = create<WizardState>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      setTenantId: (id) => set({ tenantId: id }),
      setAgentId: (id) => set({ agentId: id }),
      
      updateBranding: (branding) =>
        set((state) => ({
          branding: { ...state.branding, ...branding },
        })),
      
      updatePersona: (persona) =>
        set((state) => ({
          persona: { ...state.persona, ...persona },
        })),
      
      updateTone: (tone) =>
        set((state) => ({
          tone: { ...state.tone, ...tone },
        })),
      
      updateGuardrails: (guardrails) =>
        set((state) => ({
          guardrails: { ...state.guardrails, ...guardrails },
        })),
      
      addDataSource: (source) =>
        set((state) => ({
          dataSources: [...state.dataSources, source],
        })),
      
      removeDataSource: (id) =>
        set((state) => ({
          dataSources: state.dataSources.filter((s) => s.id !== id),
        })),
      
      updateDataSource: (id, updates) =>
        set((state) => ({
          dataSources: state.dataSources.map((s) =>
            s.id === id ? { ...s, ...updates } : s
          ),
        })),
      
      setIndexingProgress: (progress) => set({ indexingProgress: progress }),
      setIndexingStatus: (status) => set({ indexingStatus: status }),
      
      completeStep: (step) =>
        set((state) => {
          // Ensure completedSteps is a Set before using it
          const currentSteps = ensureSet(state.completedSteps);
          return {
            completedSteps: new Set([...currentSteps, step]),
          };
        }),
      
      setCurrentStep: (step) => set({ currentStep: step }),
      
      resetWizard: () => set(initialState),
    }),
    {
      name: 'wizard-storage',
      // Custom serialization/deserialization for Safari compatibility
      partialize: (state) => {
        // Convert Set to array for storage
        return {
          ...state,
          completedSteps: state.completedSteps instanceof Set 
            ? Array.from(state.completedSteps)
            : state.completedSteps,
        };
      },
      merge: (persistedState, currentState) => {
        // Convert array back to Set after deserialization
        if (persistedState && typeof persistedState === 'object') {
          const merged = { ...currentState, ...persistedState };
          if ('completedSteps' in merged) {
            merged.completedSteps = ensureSet(merged.completedSteps);
          }
          return merged;
        }
        return currentState;
      },
      onRehydrateStorage: () => (state) => {
        // Ensure completedSteps is a Set after rehydration
        if (state?.completedSteps) {
          state.completedSteps = ensureSet(state.completedSteps);
        }
      },
    }
  )
);
