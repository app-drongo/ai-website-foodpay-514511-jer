'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Facebook, Twitter, Instagram, MapPin, Phone, Mail } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_FOOTER = {
  brandName: 'FoodPay',
  tagline: 'Order, Pay, Enjoy - Your Complete Food Delivery Super App',
  description:
    'The ultimate food delivery super app that combines ordering, payment, and rewards in one seamless experience.',

  // Company section
  companyTitle: 'Company',
  companyLinks: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
  ],

  // Legal section
  legalTitle: 'Legal',
  legalLinks: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],

  // Social section
  socialTitle: 'Follow Us',
  socialLinks: [
    { platform: 'Facebook', href: 'https://facebook.com', icon: 'facebook' },
    { platform: 'Twitter', href: 'https://twitter.com', icon: 'twitter' },
    { platform: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
  ],

  // Contact info
  contactTitle: 'Contact',
  address: '123 Food Street, Delivery City, DC 12345',
  phone: '+1 (555) 123-FOOD',
  email: 'hello@foodpay.com',

  // Newsletter
  newsletterTitle: 'Stay Updated',
  newsletterDescription: 'Get the latest updates on new restaurants and exclusive offers.',
  newsletterPlaceholder: 'Enter your email',
  newsletterButtonText: 'Subscribe',

  // Bottom
  copyright: '© 2024 FoodPay. All rights reserved.',
  bottomLinks: [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
    { label: 'Cookies', href: '/cookies' },
  ],
} as const;

type FooterProps = Partial<typeof DEFAULT_FOOTER>;

export default function Footer(props: FooterProps) {
  const config = { ...DEFAULT_FOOTER, ...props };
  const navigate = useSmartNavigation();

  const handleLinkClick = (href: string) => {
    navigate(href);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Newsletter subscription logic would go here
  };

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'facebook':
        return <Facebook className="h-5 w-5" />;
      case 'twitter':
        return <Twitter className="h-5 w-5" />;
      case 'instagram':
        return <Instagram className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <footer id="footer" className="bg-card text-card-foreground border-t border-border">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="grid gap-8 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-primary mb-2">
              <span data-editable="brandName">{config.brandName}</span>
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              <span data-editable="tagline">{config.tagline}</span>
            </p>
            <p className="text-sm text-muted-foreground mb-6 max-w-md">
              <span data-editable="description">{config.description}</span>
            </p>

            {/* Newsletter signup */}
            <div className="space-y-3">
              <h4 className="font-semibold">
                <span data-editable="newsletterTitle">{config.newsletterTitle}</span>
              </h4>
              <p className="text-sm text-muted-foreground">
                <span data-editable="newsletterDescription">{config.newsletterDescription}</span>
              </p>
              <form
                onSubmit={handleNewsletterSubmit}
                className="flex gap-2 max-w-sm"
                data-form-id="6935ad8aa898b36c504969f8"
              >
                <input
                  type="email"
                  placeholder={config.newsletterPlaceholder}
                  className="flex-1 px-3 py-2 text-sm bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                />
                <Button
                  type="submit"
                  size="sm"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <span data-editable="newsletterButtonText">{config.newsletterButtonText}</span>
                </Button>
              </form>
            </div>
          </div>

          {/* Company links */}
          <div>
            <h4 className="font-semibold mb-4">
              <span data-editable="companyTitle">{config.companyTitle}</span>
            </h4>
            <ul className="space-y-3">
              {config.companyLinks.map((link, idx) => (
                <li key={idx}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground justify-start"
                    onClick={() => handleLinkClick(link.href)}
                    data-editable-href={`companyLinks[${idx}].href`}
                    data-href={link.href}
                  >
                    <span data-editable={`companyLinks[${idx}].label`}>{link.label}</span>
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h4 className="font-semibold mb-4">
              <span data-editable="legalTitle">{config.legalTitle}</span>
            </h4>
            <ul className="space-y-3">
              {config.legalLinks.map((link, idx) => (
                <li key={idx}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground justify-start"
                    onClick={() => handleLinkClick(link.href)}
                    data-editable-href={`legalLinks[${idx}].href`}
                    data-href={link.href}
                  >
                    <span data-editable={`legalLinks[${idx}].label`}>{link.label}</span>
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="font-semibold mb-4">
              <span data-editable="contactTitle">{config.contactTitle}</span>
            </h4>
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span data-editable="address">{config.address}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span data-editable="phone">{config.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span data-editable="email">{config.email}</span>
              </div>
            </div>

            <h4 className="font-semibold mb-4">
              <span data-editable="socialTitle">{config.socialTitle}</span>
            </h4>
            <div className="flex gap-3">
              {config.socialLinks.map((social, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  size="sm"
                  className="h-9 w-9 p-0 bg-background hover:bg-accent"
                  onClick={() => handleLinkClick(social.href)}
                  data-editable-href={`socialLinks[${idx}].href`}
                  data-href={social.href}
                  aria-label={social.platform}
                >
                  {renderIcon(social.icon)}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            <span data-editable="copyright">{config.copyright}</span>
          </p>
          <div className="flex gap-6">
            {config.bottomLinks.map((link, idx) => (
              <Button
                key={idx}
                variant="ghost"
                size="sm"
                className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground"
                onClick={() => handleLinkClick(link.href)}
                data-editable-href={`bottomLinks[${idx}].href`}
                data-href={link.href}
              >
                <span data-editable={`bottomLinks[${idx}].label`}>{link.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
