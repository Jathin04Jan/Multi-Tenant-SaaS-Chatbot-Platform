import { Bot, FileText, Zap, Shield, Globe, BarChart } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: FileText,
    title: 'Upload Your Data',
    description: 'Import documents, PDFs, or crawl your website. Train your bot on any content.',
  },
  {
    icon: Bot,
    title: 'Customize Personality',
    description: 'Define tone, style, and branding. Make it sound exactly like your brand.',
  },
  {
    icon: Zap,
    title: 'Instant Deployment',
    description: 'Get an embed snippet in minutes. Add to your site with a single line of code.',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'SOC 2 compliant infrastructure. Your data is encrypted and isolated.',
  },
  {
    icon: Globe,
    title: 'Multi-Language',
    description: 'Support 95+ languages out of the box. Reach customers worldwide.',
  },
  {
    icon: BarChart,
    title: 'Real-Time Analytics',
    description: 'Track conversations, sentiment, and unanswered questions in real-time.',
  },
];

export const Features = () => {
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
            Everything You Need to Scale Support
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed for modern teams
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="glass-card p-8 hover:scale-105 transition-transform duration-200"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
