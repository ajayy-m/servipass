import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from '@tanstack/react-query';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export default function Services() {
  const [location, setLocation] = useLocation();
  const [activeCategory, setActiveCategory] = useState(null);
  
  // Parse the category from URL if present
  useEffect(() => {
    const params = new URLSearchParams(location.split('?')[1]);
    const categoryParam = params.get('category');
    
    if (categoryParam) {
      setActiveCategory(parseInt(categoryParam));
    }
  }, [location]);
  
  // Fetch all categories
  const { data: categories, isLoading: loadingCategories } = useQuery({ 
    queryKey: ['/api/service-categories'] 
  });
  
  // Fetch services filtered by category if needed
  const { data: services, isLoading: loadingServices } = useQuery({ 
    queryKey: ['/api/services', activeCategory ? { categoryId: activeCategory } : {}]
  });

  // Update URL when category changes
  useEffect(() => {
    if (activeCategory) {
      setLocation(`/services?category=${activeCategory}`, { replace: true });
    } else {
      setLocation('/services', { replace: true });
    }
  }, [activeCategory, setLocation]);
  
  // Handle category change
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
  };

  return (
    <>
      {/* Services Header */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Our Services</h1>
            <p className="text-xl text-blue-100">
              Browse our wide range of home and business services to find exactly what you need.
            </p>
          </div>
        </div>
      </section>

      {/* Services Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Tabs */}
          <div className="mb-12">
            <div className="flex justify-center mb-6">
              <div className="flex gap-2 flex-wrap justify-center">
                <Button 
                  variant={activeCategory === null ? "default" : "outline"} 
                  onClick={() => handleCategoryChange(null)}
                >
                  All Services
                </Button>
                
                {categories?.map((category) => (
                  <Button 
                    key={category.id} 
                    variant={activeCategory === category.id ? "default" : "outline"}
                    onClick={() => handleCategoryChange(category.id)}
                  >
                    <i className={`fas ${category.icon} mr-2`}></i>
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Active Category Description */}
            {activeCategory && categories && (
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">
                  {categories.find(c => c.id === activeCategory)?.name}
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  {categories.find(c => c.id === activeCategory)?.description}
                </p>
              </div>
            )}
          </div>
          
          {/* Services Grid */}
          {loadingServices ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
              <p className="mt-2 text-gray-600">Loading services...</p>
            </div>
          ) : services?.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No services found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services?.map((service) => (
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
                      <Button asChild variant="default" size="sm">
                        <Link href={`/services/${service.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Can't Find What You Need?</h2>
            <p className="text-lg text-gray-600 mb-8">
              We offer custom service packages tailored to your specific requirements. Contact us to discuss your needs.
            </p>
            <Button asChild size="lg">
              <Link href="/contact">Contact for Custom Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}