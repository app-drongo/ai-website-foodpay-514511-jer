'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Smartphone, CreditCard, Clock, MapPin, Shield, Star } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_FEATURES = {
  title: 'Everything You Need in One App',
  subtitle:
    'Discover why millions choose our super app for all their food delivery and payment needs',
  ctaText: 'Download Now',
  ctaHref: '/download',
  features: [
    {
      id: '1',
      icon: 'Smartphone',
      title: 'Smart Ordering',
      description:
        'Browse thousands of restaurants, customize your order, and track delivery in real-time',
      badge: 'Popular',
    },
    {
      id: '2',
      icon: 'CreditCard',
      title: 'Secure Payments',
      description:
        'Pay with any method - cards, digital wallets, or split bills with friends seamlessly',
      badge: 'Secure',
    },
    {
      id: '3',
      icon: 'Clock',
      title: 'Lightning Fast',
      description: 'Average delivery time under 30 minutes with our optimized logistics network',
      badge: 'Fast',
    },
    {
      id: '4',
      icon: 'MapPin',
      title: 'Live Tracking',
      description: 'Know exactly where your food is with GPS tracking and delivery updates',
      badge: 'Live',
    },
    {
      id: '5',
      icon: 'Shield',
      title: 'Quality Guaranteed',
      description: 'Every order backed by our quality promise and 24/7 customer support',
      badge: 'Trusted',
    },
    {
      id: '6',
      icon: 'Star',
      title: 'Rewards Program',
      description: 'Earn points on every order and unlock exclusive discounts and perks',
      badge: 'Rewards',
    },
  ],
} as const;

type FeaturesProps = Partial<typeof DEFAULT_FEATURES>;

export default function Features(props: FeaturesProps) {
  const config = { ...DEFAULT_FEATURES, ...props };
  const navigate = useSmartNavigation();

  const getIcon = (iconName: string) => {
    const icons = {
      Smartphone,
      CreditCard,
      Clock,
      MapPin,
      Shield,
      Star,
    };
    const IconComponent = icons[iconName as keyof typeof icons] || Smartphone;
    return <IconComponent className="h-8 w-8" />;
  };

  const handleCtaClick = () => {
    navigate(config.ctaHref);
  };

  return (
    <section id="features" className="bg-background text-foreground py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span data-editable="title">{config.title}</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>
          <Button
            size="lg"
            onClick={handleCtaClick}
            data-editable-href="ctaHref"
            data-href={config.ctaHref}
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-lg"
          >
            <span data-editable="ctaText">{config.ctaText}</span>
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {config.features.map((feature, idx) => (
            <Card
              key={feature.id}
              className="bg-card text-card-foreground border-border hover:shadow-lg transition-shadow duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-primary/10 text-primary p-3 rounded-lg">
                    {getIcon(feature.icon)}
                  </div>
                  <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                    <span data-editable={`features[${idx}].badge`}>{feature.badge}</span>
                  </Badge>
                </div>

                <h3 className="text-xl font-semibold mb-3">
                  <span data-editable={`features[${idx}].title`}>{feature.title}</span>
                </h3>

                <p className="text-muted-foreground leading-relaxed">
                  <span data-editable={`features[${idx}].description`}>{feature.description}</span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-muted text-muted-foreground rounded-lg p-8 max-w-2xl mx-auto">
            <p className="text-lg mb-6">
              Join over 10 million users who trust our platform for their daily food needs
            </p>
            <Button
              variant="outline"
              size="lg"
              onClick={handleCtaClick}
              data-editable-href="ctaHref"
              data-href={config.ctaHref}
              className="border-border hover:bg-accent hover:text-accent-foreground"
            >
              <span data-editable="ctaText">{config.ctaText}</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
