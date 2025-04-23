import { useEffect } from 'react';
import { Link, useRoute, useLocation } from 'wouter';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft, Star, Calendar, Clock, Check } from 'lucide-react';

export default function ServiceDetail() {
  const [, setLocation] = useLocation();
  const [match, params] = useRoute('/services/:id');
  const serviceId = params?.id ? parseInt(params.id) : null;
  
  // Handle invalid service ID
  useEffect(() => {
    if (!serviceId) {
      setLocation('/services');
    }
  }, [serviceId, setLocation]);

  // Fetch service details
  const { data: service, isLoading: loadingService, error } = useQuery({ 
    queryKey: ['/api/services', serviceId],
    queryFn: async () => {
      const res = await fetch(`/api/services/${serviceId}`);
      if (!res.ok) throw new Error('Service not found');
      return res.json();
    },
    enabled: !!serviceId
  });
  
  // Fetch category if service is loaded
  const { data: category } = useQuery({ 
    queryKey: ['/api/service-categories', service?.categoryId],
    queryFn: async () => {
      const res = await fetch(`/api/service-categories/${service?.categoryId}`);
      if (!res.ok) throw new Error('Category not found');
      return res.json();
    },
    enabled: !!service?.categoryId
  });
  
  // Fetch related services in the same category
  const { data: relatedServices } = useQuery({ 
    queryKey: ['/api/services', { categoryId: service?.categoryId }],
    enabled: !!service?.categoryId
  });
  
  // Filter out current service from related services
  const filteredRelatedServices = relatedServices?.filter(s => s.id !== serviceId).slice(0, 3);

  if (loadingService) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
        <p className="mt-2 text-gray-600">Loading service details...</p>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Service Not Found</h2>
        <p className="text-gray-600 mb-6">The service you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link href="/services">Back to Services</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      {/* Service Detail Header */}
      <section className="bg-blue-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Button asChild variant="outline" size="sm">
              <Link href="/services" className="flex items-center">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to Services
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{service.name}</h1>
              
              <div className="flex items-center mb-6">
                {category && (
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mr-3">
                    <i className={`fas ${category.icon} mr-1`}></i>
                    {category.name}
                  </span>
                )}
                {service.tag && (
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    service.tag === 'Popular' ? 'bg-blue-100 text-blue-700' : 
                    service.tag === 'Seasonal' ? 'bg-red-100 text-red-700' : 
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {service.tag}
                  </span>
                )}
              </div>
              
              <div className="mb-6">
                <p className="text-lg text-gray-700 mb-4">{service.description}</p>
                <p className="text-lg mb-2">
                  <span className="text-2xl font-bold text-red-600">
                    ${(service.price / 100).toFixed(0)}
                  </span>
                  <span className="text-gray-600">/month with subscription</span>
                </p>
                <p className="text-gray-600">
                  One-time service also available
                </p>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Professional, vetted service providers</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Satisfaction guaranteed</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Flexible scheduling options</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Priority service for subscribers</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg">
                  <Link href="/pricing">Include in Subscription</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/contact">Request One-Time Service</Link>
                </Button>
              </div>
            </div>
            
            <div className="rounded-lg overflow-hidden shadow-lg">
              {service.imageUrl && (
                <img 
                  src={service.imageUrl} 
                  alt={service.name} 
                  className="w-full h-80 object-cover"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Service Details Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-blue-700" />
                  Service Duration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Standard service time: 2-3 hours<br />
                  May vary based on home size and specific requirements
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-blue-700" />
                  Scheduling
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Available 7 days a week<br />
                  Morning and afternoon slots<br />
                  Book up to 24 hours in advance
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Star className="h-5 w-5 mr-2 text-blue-700" />
                  Customer Rating
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700">
                  4.9 out of 5 stars based on 120+ reviews
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Service Details</h2>
            
            <div className="prose max-w-none">
              <h3>What's Included</h3>
              <ul>
                <li>Comprehensive assessment of service needs</li>
                <li>Professional service with industry-standard equipment</li>
                <li>Thorough clean-up after service completion</li>
                <li>Quality assurance check</li>
                <li>Follow-up support for any issues</li>
              </ul>
              
              <h3>Why Choose Our {service.name} Service</h3>
              <p>
                Our {service.name} service is performed by experienced professionals who undergo thorough background checks and training. We use high-quality equipment and products to ensure the best results for your home.
              </p>
              
              <h3>Subscription Benefits</h3>
              <p>
                By including this service in your ServiPass subscription, you'll enjoy:
              </p>
              <ul>
                <li>Regular scheduled service with no additional booking hassle</li>
                <li>Priority scheduling and preferred time slots</li>
                <li>Consistent service technicians who know your home</li>
                <li>Significant savings compared to one-time service rates</li>
                <li>Bundle with other services for even more value</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      {filteredRelatedServices && filteredRelatedServices.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-center mb-12">Related Services You Might Like</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredRelatedServices.map((relatedService) => (
                <Card key={relatedService.id} className="overflow-hidden hover:shadow-lg transition duration-200">
                  <div className="aspect-video w-full bg-gray-100 overflow-hidden">
                    {relatedService.imageUrl && (
                      <img 
                        src={relatedService.imageUrl} 
                        alt={relatedService.name} 
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{relatedService.name}</h3>
                    <p className="text-gray-600 mb-4">
                      {relatedService.description.length > 100 
                        ? `${relatedService.description.substring(0, 100)}...` 
                        : relatedService.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-red-600 font-bold">
                        From ${(relatedService.price / 100).toFixed(0)}/month
                      </span>
                      <Button asChild variant="link" className="text-blue-700 p-0">
                        <Link href={`/services/${relatedService.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-blue-700 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Experience {service.name}?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Get started with a subscription plan that includes this service and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="bg-white text-blue-700 hover:bg-gray-100">
                <Link href="/pricing">View Subscription Plans</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-blue-800">
                <Link href="/contact">Contact For Details</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}