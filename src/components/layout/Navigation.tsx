'use client';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X, ShoppingBag, CreditCard, MapPin } from 'lucide-react';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_NAVIGATION = {
  brandName: 'FoodieFlow',
  brandTagline: 'Order, Pay, Enjoy - Your Complete Food Delivery Super App',
  navItems: [
    { label: 'Home', href: '#hero', icon: 'home' },
    { label: 'Features', href: '#features', icon: 'features' },
  ],
  ctaText: 'Order Now',
  ctaHref: '#hero',
  mobileMenuLabel: 'Open menu',
  closeMenuLabel: 'Close menu',
} as const;

type NavigationProps = Partial<typeof DEFAULT_NAVIGATION>;

export default function Navigation(props: NavigationProps) {
  const config = { ...DEFAULT_NAVIGATION, ...props };
  const navigate = useSmartNavigation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (href: string) => {
    navigate(href);
    setIsMobileMenuOpen(false);
  };

  const handleCtaClick = () => {
    navigate(config.ctaHref);
    setIsMobileMenuOpen(false);
  };

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'home':
        return <MapPin className="w-4 h-4" />;
      case 'features':
        return <ShoppingBag className="w-4 h-4" />;
      default:
        return <CreditCard className="w-4 h-4" />;
    }
  };

  return (
    <section
      id="navigation"
      className="bg-background text-foreground border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-background/95"
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex items-center space-x-2">
            <div className="bg-primary text-primary-foreground p-2 rounded-lg">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span
                className="text-lg font-bold text-foreground cursor-pointer hover:text-primary transition-colors"
                onClick={() => navigate('#hero')}
                data-editable="brandName"
              >
                {config.brandName}
              </span>
              <span
                className="text-xs text-muted-foreground hidden sm:block"
                data-editable="brandTagline"
              >
                {config.brandTagline}
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {config.navItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleNavClick(item.href)}
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium"
                data-editable-href={`navItems[${idx}].href`}
                data-href={item.href}
              >
                {getIcon(item.icon)}
                <span data-editable={`navItems[${idx}].label`}>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              onClick={handleCtaClick}
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
              data-editable-href="ctaHref"
              data-href={config.ctaHref}
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              <span data-editable="ctaText">{config.ctaText}</span>
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground hover:bg-accent hover:text-accent-foreground"
                  aria-label={config.mobileMenuLabel}
                >
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-card text-card-foreground w-80">
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="flex items-center justify-between pb-6 border-b border-border">
                    <div className="flex items-center space-x-2">
                      <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                        <ShoppingBag className="w-5 h-5" />
                      </div>
                      <span className="text-lg font-bold" data-editable="brandName">
                        {config.brandName}
                      </span>
                    </div>
                  </div>

                  {/* Mobile Navigation Items */}
                  <div className="flex flex-col space-y-4 py-6 flex-1">
                    {config.navItems.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleNavClick(item.href)}
                        className="flex items-center space-x-3 text-left p-3 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
                        data-editable-href={`navItems[${idx}].href`}
                        data-href={item.href}
                      >
                        {getIcon(item.icon)}
                        <span
                          className="text-lg font-medium"
                          data-editable={`navItems[${idx}].label`}
                        >
                          {item.label}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Mobile CTA */}
                  <div className="pt-6 border-t border-border">
                    <Button
                      onClick={handleCtaClick}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
                      data-editable-href="ctaHref"
                      data-href={config.ctaHref}
                    >
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      <span data-editable="ctaText">{config.ctaText}</span>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </section>
  );
}
