'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Star, Clock, Truck, CreditCard } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_HERO = {
  title: 'Order, Pay, Enjoy',
  subtitle: 'Your Complete Food Delivery Super App',
  description:
    'Experience the future of food delivery with instant ordering, seamless payments, and lightning-fast delivery. All your favorite restaurants in one powerful app.',
  ctaText: 'Download App',
  ctaHref: '/download',
  secondaryCtaText: 'Watch Demo',
  heroImageUrl:
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop&crop=center',
  heroImageAlt: 'Delicious food delivery spread',
  appBadgeText: '4.9★ Rating',
  deliveryTime: '15-30 min',
  features: [
    'Instant ordering from 1000+ restaurants',
    'Secure one-tap payments',
    'Real-time delivery tracking',
  ],
  stats: [
    { icon: 'restaurant', value: '1000+', label: 'Restaurants' },
    { icon: 'users', value: '50K+', label: 'Happy Customers' },
    { icon: 'clock', value: '25min', label: 'Avg Delivery' },
  ],
} as const;

type HeroProps = Partial<typeof DEFAULT_HERO>;

export default function Hero(props: HeroProps) {
  const config = { ...DEFAULT_HERO, ...props };
  const navigate = useSmartNavigation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleCtaClick = () => {
    navigate(config.ctaHref);
  };

  const handleSecondaryCtaClick = () => {
    // Demo functionality
    console.log('Demo clicked');
  };

  const getStatIcon = (iconType: string) => {
    switch (iconType) {
      case 'restaurant':
        return <Truck className="h-5 w-5" />;
      case 'users':
        return <Star className="h-5 w-5" />;
      case 'clock':
        return <Clock className="h-5 w-5" />;
      default:
        return <Star className="h-5 w-5" />;
    }
  };

  return (
    <section id="hero" className="bg-background text-foreground py-20 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Content Column */}
          <div
            className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            {/* Badge */}
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-accent text-accent-foreground px-4 py-2">
                <Star className="h-4 w-4 mr-2 fill-current" />
                <span data-editable="appBadgeText">{config.appBadgeText}</span>
              </Badge>
              <Badge variant="outline" className="border-primary text-primary px-4 py-2">
                <Clock className="h-4 w-4 mr-2" />
                <span data-editable="deliveryTime">{config.deliveryTime}</span>
              </Badge>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span
                  data-editable="title"
                  className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
                >
                  {config.title}
                </span>
              </h1>
              <h2 className="text-xl sm:text-2xl text-muted-foreground font-medium">
                <span data-editable="subtitle">{config.subtitle}</span>
              </h2>
            </div>

            {/* Description */}
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              <span data-editable="description">{config.description}</span>
            </p>

            {/* Features List */}
            <div className="space-y-3">
              {config.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="h-2 w-2 bg-primary rounded-full flex-shrink-0" />
                  <span data-editable={`features[${idx}]`} className="text-foreground">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={handleCtaClick}
                data-editable-href="ctaHref"
                data-href={config.ctaHref}
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg font-semibold"
              >
                <CreditCard className="h-5 w-5 mr-2" />
                <span data-editable="ctaText">{config.ctaText}</span>
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleSecondaryCtaClick}
                className="border-border text-foreground hover:bg-accent hover:text-accent-foreground px-8 py-6 text-lg"
              >
                <Play className="h-5 w-5 mr-2" />
                <span data-editable="secondaryCtaText">{config.secondaryCtaText}</span>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              {config.stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="flex justify-center mb-2 text-primary">
                    {getStatIcon(stat.icon)}
                  </div>
                  <div className="text-2xl font-bold text-foreground">
                    <span data-editable={`stats[${idx}].value`}>{stat.value}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <span data-editable={`stats[${idx}].label`}>{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Column */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
          >
            <Card className="bg-card border-border overflow-hidden shadow-2xl">
              <CardContent className="p-0">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={config.heroImageUrl}
                    alt={config.heroImageAlt}
                    data-editable-src="heroImageUrl"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </CardContent>
            </Card>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground p-4 rounded-full shadow-lg animate-bounce">
              <Truck className="h-6 w-6" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-accent text-accent-foreground p-4 rounded-full shadow-lg animate-pulse">
              <CreditCard className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
