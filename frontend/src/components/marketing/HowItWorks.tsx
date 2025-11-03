import { Upload, Palette, TestTube, Code } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  {
    icon: Upload,
    title: 'Upload Your Content',
    description: 'Add documents, PDFs, or crawl your website to train your chatbot.',
  },
  {
    icon: Palette,
    title: 'Customize Brand',
    description: 'Set colors, tone, and personality to match your brand identity.',
  },
  {
    icon: TestTube,
    title: 'Test Your Bot',
    description: 'Try conversations in our test environment before going live.',
  },
  {
    icon: Code,
    title: 'Embed Anywhere',
    description: 'Copy the snippet and paste into your website. Done in seconds.',
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-24 px-4">
      <div className="container max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground">
            From zero to production in four simple steps
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative"
            >
              {/* Step Number */}
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shadow-lg">
                {index + 1}
              </div>

              <div className="glass-card p-8 pt-10 h-full">
                <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center mb-4">
                  <step.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
