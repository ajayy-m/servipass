import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from '@tanstack/react-query';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

const Testimonial = ({ name, plan, comment, rating, variant = 'blue' }) => {
  const bgColor = variant === 'blue' ? 'bg-blue-50' : 'bg-red-50';
  
  return (
    <div className={`${bgColor} rounded-lg p-6`}>
      <div className="flex items-center mb-4">
        <div className="text-yellow-400 flex mr-2">
          {[...Array(Math.floor(rating))].map((_, i) => (
            <i key={i} className="fas fa-star"></i>
          ))}
          {rating % 1 !== 0 && <i className="fas fa-star-half-alt"></i>}
        </div>
        <span className="text-gray-700">{rating.toFixed(1)}</span>
      </div>
      <p className="text-gray-700 mb-6 italic">
        "{comment}"
      </p>
      <div className="flex items-center">
        <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden mr-3">
          <div className="w-full h-full flex items-center justify-center text-gray-600">
            <i className="fas fa-user"></i>
          </div>
        </div>
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-sm text-gray-600">{plan}</p>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [activeTab, setActiveTab] = useState('all');
  
  const { data: categories } = useQuery({ 
    queryKey: ['/api/service-categories']
  });
  
  const { data: services } = useQuery({ 
    queryKey: ['/api/services', { featured: true }]
  });
  
  const { data: plans } = useQuery({ 
    queryKey: ['/api/subscription-plans']
  });
  
  const filteredServices = services?.filter(service => {
    if (activeTab === 'all') return true;
    return categories?.find(cat => cat.id === service.categoryId)?.name.toLowerCase().includes(activeTab);
  });

  const testimonials = [
    {
      name: "Sarah Johnson",
      plan: "Basic Plan Member",
      comment: "ServiPass has completely changed how I maintain my home. The recurring cleaning service is amazing, and I love not having to worry about scheduling maintenance anymore.",
      rating: 5,
      variant: 'blue'
    },
    {
      name: "Michael Torres",
      plan: "Plus Plan Member",
      comment: "As a busy professional, I don't have time to coordinate multiple service providers. ServiPass has been a lifesaver - one subscription handles everything for my home.",
      rating: 5,
      variant: 'red'
    },
    {
      name: "Jennifer Williams",
      plan: "Premium Plan Member",
      comment: "The Premium plan has been perfect for our large family home. We love the consistent cleaning service, and the lawn care team keeps our yard looking immaculate year-round.",
      rating: 4.5,
      variant: 'blue'
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Professional Home Services, <span className="text-blue-700">All in One Subscription</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-8">
                Get regular cleaning, maintenance, and repairs for your home or business with our convenient subscription plans.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="text-lg">
                  <Link href="/services">View Services</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg border-blue-700 text-blue-700 hover:bg-blue-50">
                  <Link href="/pricing">See Pricing</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4 w-full h-full max-w-3xl max-h-3xl bg-red-50 rounded-full opacity-50 -z-10"></div>
      </section>

      {/* Service Categories */}
      <section id="services" className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Service Categories</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From regular cleaning to emergency repairs, we've got your home and business covered with our comprehensive service offerings.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories?.map((category) => (
              <div key={category.id} className="flex flex-col bg-white rounded-lg shadow-md hover:shadow-lg transition duration-200 overflow-hidden">
                <div className="bg-blue-50 p-6 text-center">
                  <i className={`fas ${category.icon} text-4xl text-blue-700 mb-4`}></i>
                  <h3 className="text-xl font-bold text-gray-900">{category.name}</h3>
                </div>
                <div className="p-6 flex-grow">
                  <p className="mb-6">{category.description}</p>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={`/services?category=${category.id}`}>View Details</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link href="/services">Browse All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How ServiPass Works</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Getting started with ServiPass is easy. Follow these simple steps to enjoy worry-free home services.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-blue-700 rounded-full flex items-center justify-center mb-4">
                <span className="text-white text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Choose a Plan</h3>
              <p className="text-gray-600">Select a subscription plan that fits your needs and budget.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-blue-700 rounded-full flex items-center justify-center mb-4">
                <span className="text-white text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Schedule Services</h3>
              <p className="text-gray-600">Book your first service appointment through our easy-to-use platform.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-blue-700 rounded-full flex items-center justify-center mb-4">
                <span className="text-white text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Meet Your Pro</h3>
              <p className="text-gray-600">Our vetted professionals will arrive on time and ready to work.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-blue-700 rounded-full flex items-center justify-center mb-4">
                <span className="text-white text-xl font-bold">4</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Enjoy Peace of Mind</h3>
              <p className="text-gray-600">Relax knowing your home services are taken care of automatically.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Services */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Services</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our most popular services that keep our customers coming back.
            </p>
          </div>
          
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="mb-8 flex justify-center">
              <TabsList>
                <TabsTrigger value="all">All Services</TabsTrigger>
                <TabsTrigger value="cleaning">Cleaning</TabsTrigger>
                <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
                <TabsTrigger value="repair">Repair</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value={activeTab}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredServices?.map((service) => (
                  <Card key={service.id} className="overflow-hidden hover:shadow-lg transition duration-200">
                    <div className="aspect-video w-full bg-gray-100 overflow-hidden">
                      {service.imageUrl && (
                        <img 
                          src={service.imageUrl} 
                          alt={service.name} 
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold">{service.name}</h3>
                        {service.tag && (
                          <span className={`px-2 py-1 ${
                            service.tag === 'Popular' ? 'bg-blue-50 text-blue-600' : 
                            service.tag === 'Seasonal' ? 'bg-red-50 text-red-600' : 
                            'bg-gray-100 text-gray-600'
                          } rounded text-sm`}>
                            {service.tag}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 mb-4">
                        {service.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-red-600 font-bold">
                          From ${(service.price / 100).toFixed(0)}/month
                        </span>
                        <Button asChild variant="link" className="text-blue-700 p-0">
                          <Link href={`/services/${service.id}`}>Learn more →</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg" className="border-blue-700 text-blue-700 hover:bg-blue-50">
              <Link href="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Choose a plan that works for your needs and budget with no hidden fees or long-term commitments.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans?.map((plan) => (
              <div key={plan.id} className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden relative">
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
                      ${(plan.price / 100).toFixed(0)}
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
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="p-6 bg-gray-50">
                  <Button asChild className={`w-full ${plan.isPopular ? 'bg-red-600 hover:bg-red-700' : ''}`}>
                    <Link href="/pricing">Get Started</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button asChild variant="link" size="lg" className="text-blue-700">
              <Link href="/pricing">View All Pricing Options</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hear from homeowners who have transformed their property maintenance experience with ServiPass.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Testimonial
                key={index}
                name={testimonial.name}
                plan={testimonial.plan}
                comment={testimonial.comment}
                rating={testimonial.rating}
                variant={testimonial.variant}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-blue-700 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Ready to Simplify Your Home Services?</h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Get started today and experience the convenience of ServiPass.
            </p>
          </div>
          <div className="flex justify-center">
            <Button asChild size="lg" variant="secondary" className="bg-white text-blue-700 hover:bg-gray-100">
              <Link href="/contact">Contact Us Today</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}