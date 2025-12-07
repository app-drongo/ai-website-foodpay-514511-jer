'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Zap, Crown } from 'lucide-react';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_PRICING = {
  title: 'Choose Your Perfect Plan',
  subtitle: "Start free, upgrade when you're ready to scale your food delivery business",
  billingToggleText: 'Save 20% with annual billing',
  plans: [
    {
      name: 'Starter',
      description: 'Perfect for small restaurants getting started',
      monthlyPrice: 'Free',
      yearlyPrice: 'Free',
      icon: 'star',
      badge: '',
      features: ['Up to 50 orders per month', 'Basic analytics dashboard', 'Email support'],
      ctaText: 'Get Started Free',
      ctaHref: '/signup',
      popular: false,
    },
    {
      name: 'Professional',
      description: 'Ideal for growing restaurants and cafes',
      monthlyPrice: '$29',
      yearlyPrice: '$23',
      icon: 'zap',
      badge: 'Most Popular',
      features: [
        'Unlimited orders',
        'Advanced analytics & insights',
        'Priority support',
        'Custom branding',
        'Multi-location support',
      ],
      ctaText: 'Start 14-Day Trial',
      ctaHref: '/signup?plan=pro',
      popular: true,
    },
    {
      name: 'Enterprise',
      description: 'For large chains and enterprise customers',
      monthlyPrice: '$99',
      yearlyPrice: '$79',
      icon: 'crown',
      badge: 'Best Value',
      features: [
        'Everything in Professional',
        'Dedicated account manager',
        'Custom integrations',
        'White-label solution',
        '24/7 phone support',
      ],
      ctaText: 'Contact Sales',
      ctaHref: '/contact',
      popular: false,
    },
  ],
} as const;

type PricingProps = Partial<typeof DEFAULT_PRICING>;

export default function Pricing(props: PricingProps) {
  const config = { ...DEFAULT_PRICING, ...props };
  const navigate = useSmartNavigation();
  const [isYearly, setIsYearly] = useState(false);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'star':
        return Star;
      case 'zap':
        return Zap;
      case 'crown':
        return Crown;
      default:
        return Star;
    }
  };

  const handlePlanSelect = (href: string) => {
    navigate(href);
  };

  return (
    <section id="pricing" className="bg-background text-foreground py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span data-editable="title">{config.title}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`text-sm ${!isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isYearly ? 'bg-primary' : 'bg-muted'
              }`}
              role="switch"
              aria-checked={isYearly}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${
                  isYearly ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm ${isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
              Yearly
            </span>
            <Badge variant="secondary" className="ml-2">
              <span data-editable="billingToggleText">{config.billingToggleText}</span>
            </Badge>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 lg:grid-cols-3 max-w-6xl mx-auto">
          {config.plans.map((plan, idx) => {
            const IconComponent = getIcon(plan.icon);
            const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;

            return (
              <Card
                key={idx}
                className={`relative transition-all duration-300 hover:shadow-lg ${
                  plan.popular
                    ? 'border-primary bg-card shadow-lg scale-105'
                    : 'border-border bg-card hover:border-primary/50'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">
                      <span data-editable={`plans[${idx}].badge`}>{plan.badge}</span>
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-6">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">
                    <span data-editable={`plans[${idx}].name`}>{plan.name}</span>
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    <span data-editable={`plans[${idx}].description`}>{plan.description}</span>
                  </p>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">
                      <span
                        data-editable={`plans[${idx}].${isYearly ? 'yearlyPrice' : 'monthlyPrice'}`}
                      >
                        {price}
                      </span>
                    </span>
                    {price !== 'Free' && (
                      <span className="text-muted-foreground">/{isYearly ? 'year' : 'month'}</span>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIdx) => (
                      <li key={featureIdx} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">
                          <span data-editable={`plans[${idx}].features[${featureIdx}]`}>
                            {feature}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => handlePlanSelect(plan.ctaHref)}
                    data-editable-href={`plans[${idx}].ctaHref`}
                    data-href={plan.ctaHref}
                    className={`w-full ${
                      plan.popular
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                  >
                    <span data-editable={`plans[${idx}].ctaText`}>{plan.ctaText}</span>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
