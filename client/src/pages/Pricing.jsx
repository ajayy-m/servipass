import { useState } from 'react';
import { Link } from 'wouter';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useQuery } from '@tanstack/react-query';
import { Check, X, HelpCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);
  
  const { data: plans, isLoading } = useQuery({ 
    queryKey: ['/api/subscription-plans'] 
  });

  // Calculate annual price (15% discount)
  const getAnnualPrice = (monthlyPrice) => {
    const annualDiscount = 0.15; // 15% discount
    return (monthlyPrice * 12 * (1 - annualDiscount)) / 12;
  };

  return (
    <>
      {/* Pricing Header */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
            <p className="text-xl text-blue-100">
              Choose a plan that works for your needs and budget with no hidden fees or long-term commitments.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Billing Toggle */}
          <div className="flex justify-center items-center space-x-4 mb-12">
            <span className={`text-lg font-medium ${isAnnual ? 'text-gray-600' : 'text-gray-900'}`}>Monthly</span>
            <div className="flex items-center space-x-2">
              <Switch
                id="billing-toggle"
                checked={isAnnual}
                onCheckedChange={setIsAnnual}
              />
              <Label htmlFor="billing-toggle" className="sr-only">Toggle billing period</Label>
            </div>
            <span className={`text-lg font-medium ${isAnnual ? 'text-gray-900' : 'text-gray-600'}`}>
              Annual <span className="text-red-600">(Save 15%)</span>
            </span>
          </div>
          
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
              <p className="mt-2 text-gray-600">Loading subscription plans...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans?.map((plan) => {
                const displayPrice = isAnnual ? getAnnualPrice(plan.price) : plan.price;
                
                return (
                  <div 
                    key={plan.id} 
                    className={`flex flex-col bg-white rounded-lg shadow-md overflow-hidden relative 
                      ${plan.isPopular ? 'ring-2 ring-blue-600 md:scale-105' : ''}`
                    }
                  >
                    {plan.isPopular && (
                      <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-3 py-1 uppercase">
                        Most Popular
                      </div>
                    )}
                    
                    <div className={`p-6 ${plan.isPopular ? 'bg-blue-600 text-white' : 'bg-blue-50'}`}>
                      <h3 className={`text-xl font-bold ${plan.isPopular ? 'text-white' : 'text-gray-900'} mb-2`}>
                        {plan.name}
                      </h3>
                      <div className="flex items-baseline">
                        <span className={`text-3xl font-bold ${plan.isPopular ? 'text-white' : 'text-gray-900'}`}>
                          ${(displayPrice / 100).toFixed(0)}
                        </span>
                        <span className={`${plan.isPopular ? 'text-blue-100' : 'text-gray-600'} ml-1`}>
                          /month
                        </span>
                      </div>
                      <p className={`${plan.isPopular ? 'text-blue-100' : 'text-gray-600'} mt-2`}>
                        {plan.description}
                      </p>
                    </div>
                    
                    <div className="p-6 flex-grow">
                      <ul className="space-y-4 mb-6">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                        
                        {/* Disabled features that higher tiers have */}
                        {plan.id === 1 && (
                          <>
                            <li className="flex items-start text-gray-400">
                              <X className="h-5 w-5 mt-0.5 mr-2 shrink-0" />
                              <span>Appliance maintenance</span>
                            </li>
                            <li className="flex items-start text-gray-400">
                              <X className="h-5 w-5 mt-0.5 mr-2 shrink-0" />
                              <span>Lawn care services</span>
                            </li>
                          </>
                        )}
                        {plan.id === 2 && (
                          <>
                            <li className="flex items-start text-gray-400">
                              <X className="h-5 w-5 mt-0.5 mr-2 shrink-0" />
                              <span>Unlimited service calls</span>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                    
                    <div className="p-6 bg-gray-50">
                      <Button asChild className={`w-full ${plan.isPopular ? 'bg-red-600 hover:bg-red-700' : ''}`}>
                        <Link href="/contact">Get Started</Link>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          
          {/* Plan Comparison */}
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-center mb-12">Plan Comparison</h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Features
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Basic Plan
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider bg-blue-50">
                      Plus Plan
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Premium Plan
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center">
                      Cleaning Service
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="sm" className="px-1 h-auto">
                              <HelpCircle className="h-4 w-4 text-gray-400" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            Regular cleaning service for your home
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">Monthly (3 hours)</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center font-medium bg-blue-50">Bi-weekly (4 hours)</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">Weekly (5 hours)</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">HVAC Maintenance</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">Quarterly Filter Replacement</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center font-medium bg-blue-50">Quarterly Filter Replacement</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">Quarterly Full Service</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Home Inspection</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">Annual</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center font-medium bg-blue-50">Semi-annual</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">Quarterly</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Appliance Maintenance</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      <X className="h-5 w-5 text-gray-400 mx-auto" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center font-medium bg-blue-50">
                      Basic
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">Complete</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Lawn Care</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      <X className="h-5 w-5 text-gray-400 mx-auto" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center font-medium bg-blue-50">
                      Monthly (Apr-Oct)
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">Weekly</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Service Calls</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">Priority Scheduling</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center font-medium bg-blue-50">
                      Priority + Discount
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">Unlimited</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Monthly Price</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      ${(plans?.[0]?.price || 9900) / 100}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center font-medium bg-blue-50">
                      ${(plans?.[1]?.price || 19900) / 100}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      ${(plans?.[2]?.price || 34900) / 100}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Plan Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Need a Custom Plan?</h2>
              <p className="text-gray-600">
                We offer tailored solutions for businesses and unique properties. Contact us to build your own custom service package.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-bold mb-3">For Businesses</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 shrink-0" />
                    <span>Customized cleaning schedules</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 shrink-0" />
                    <span>Commercial maintenance plans</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 shrink-0" />
                    <span>Multi-location service coordination</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 shrink-0" />
                    <span>Dedicated account manager</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-3">For Large Properties</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 shrink-0" />
                    <span>Estate management services</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 shrink-0" />
                    <span>Comprehensive property maintenance</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 shrink-0" />
                    <span>Custom service frequency</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 shrink-0" />
                    <span>Specialized equipment options</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="text-center">
              <Button asChild size="lg">
                <Link href="/contact">Contact for Custom Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-2">Can I cancel my subscription at any time?</h3>
                <p className="text-gray-600">
                  Yes, all our subscription plans can be canceled at any time with no cancellation fees. We only bill for services rendered.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-bold mb-2">How do I schedule my services?</h3>
                <p className="text-gray-600">
                  After signing up, you'll have access to our online scheduling platform where you can choose your preferred dates and times for all included services.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-bold mb-2">Can I skip a service if I don't need it one month?</h3>
                <p className="text-gray-600">
                  Absolutely! You can easily reschedule or skip individual services through your account dashboard with at least 48 hours notice.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-bold mb-2">Are there additional fees for larger homes?</h3>
                <p className="text-gray-600">
                  Our standard plans are designed for homes up to 2,500 square feet. For larger homes, we offer custom pricing with adjusted service durations to ensure thorough service.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-bold mb-2">What if I'm not satisfied with a service?</h3>
                <p className="text-gray-600">
                  We stand behind our work with a 100% satisfaction guarantee. If you're not completely satisfied, contact us within 24 hours and we'll send a team to make it right at no additional cost.
                </p>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <p className="text-gray-600 mb-4">Have more questions about our subscription plans?</p>
              <Button asChild variant="outline">
                <Link href="/contact">Contact Our Support Team</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-700 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Start Your ServiPass Subscription Today</h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of satisfied customers who have simplified their home maintenance.
            </p>
            <Button asChild size="lg" variant="secondary" className="bg-white text-blue-700 hover:bg-gray-100">
              <Link href="/contact">Get Started Now</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}