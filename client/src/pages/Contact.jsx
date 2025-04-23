import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from '@tanstack/react-query';
import { insertContactMessageSchema } from '@shared/schema.js';
import { apiRequest } from '@/lib/queryClient';
import { Mail, Phone, MapPin, CheckCircle } from 'lucide-react';

// Extend the schema for form validation
const contactFormSchema = insertContactMessageSchema.extend({
  fullName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().optional(),
  planInterest: z.string().optional(),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  
  // Define form
  const form = useForm({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      planInterest: "",
      message: "",
    },
  });
  
  // Submit contact form mutation
  const mutation = useMutation({
    mutationFn: (data) => {
      return apiRequest('POST', '/api/contact', data);
    },
    onSuccess: () => {
      setSubmitted(true);
      toast({
        title: "Message sent!",
        description: "We've received your message and will get back to you soon.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error sending message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });
  
  // Form submission handler
  function onSubmit(data) {
    mutation.mutate(data);
  }

  return (
    <>
      {/* Contact Header */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-blue-100">
              Have questions about our services or subscription plans? We're here to help!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
              <p className="text-gray-600 mb-8">
                Ready to simplify your home services? Contact us today to learn more about our subscription plans or request a custom quote.
              </p>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-3 mr-4">
                    <MapPin className="h-6 w-6 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Our Location</h3>
                    <p className="text-gray-600">
                      1234 Service Avenue, Suite 567<br/>
                      Maintenance City, MC 12345
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-3 mr-4">
                    <Mail className="h-6 w-6 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Email Us</h3>
                    <p className="text-gray-600">
                      info@servipass.com<br/>
                      support@servipass.com
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-3 mr-4">
                    <Phone className="h-6 w-6 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Call Us</h3>
                    <p className="text-gray-600">
                      (123) 456-7890<br/>
                      Monday-Friday: 8am-8pm, Sat: 9am-5pm
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <h3 className="text-xl font-bold mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-3 rounded-full transition duration-200">
                    <i className="fab fa-facebook-f text-lg"></i>
                  </a>
                  <a href="#" className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-3 rounded-full transition duration-200">
                    <i className="fab fa-twitter text-lg"></i>
                  </a>
                  <a href="#" className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-3 rounded-full transition duration-200">
                    <i className="fab fa-instagram text-lg"></i>
                  </a>
                  <a href="#" className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-3 rounded-full transition duration-200">
                    <i className="fab fa-linkedin-in text-lg"></i>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div>
              <Card className="shadow-lg">
                <CardContent className="p-6 sm:p-8">
                  {submitted ? (
                    <div className="text-center py-8">
                      <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
                      <p className="text-lg text-gray-600 mb-6">
                        Your message has been sent successfully. One of our representatives will get back to you soon.
                      </p>
                      <Button onClick={() => setSubmitted(false)}>Send Another Message</Button>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                      
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="fullName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Full Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Your name" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email Address</FormLabel>
                                  <FormControl>
                                    <Input placeholder="your@email.com" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Phone Number</FormLabel>
                                  <FormControl>
                                    <Input placeholder="(123) 456-7890" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="planInterest"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>I'm Interested In</FormLabel>
                                  <Select 
                                    onValueChange={field.onChange} 
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select a plan" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="basic">Basic Plan</SelectItem>
                                      <SelectItem value="plus">Plus Plan</SelectItem>
                                      <SelectItem value="premium">Premium Plan</SelectItem>
                                      <SelectItem value="custom">Custom Plan</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Message</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Tell us about your service needs..." 
                                    rows={4} 
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="text-center">
                            <Button 
                              type="submit" 
                              size="lg" 
                              className="bg-red-600 hover:bg-red-700"
                              disabled={mutation.isPending}
                            >
                              {mutation.isPending ? 'Sending...' : 'Send Message'}
                            </Button>
                          </div>
                        </form>
                      </Form>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (placeholder) */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="bg-gray-300 h-96 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">Find Us on the Map</h3>
                <p className="text-gray-700">Map integration would be shown here</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Questions */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-12">Common Questions</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-bold mb-2">How quickly can you start services?</h3>
                <p className="text-gray-600">
                  For most areas, we can begin services within 3-5 business days after your subscription is confirmed. For urgent needs, we offer expedited scheduling options.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-bold mb-2">Do you service my area?</h3>
                <p className="text-gray-600">
                  We currently serve major metropolitan areas and surrounding suburbs. Contact us with your specific location, and we'll confirm service availability.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-bold mb-2">Are your service providers insured?</h3>
                <p className="text-gray-600">
                  Yes, all our service professionals are fully insured and undergo thorough background checks. We maintain high standards for all personnel entering your home.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-bold mb-2">What's your cancellation policy?</h3>
                <p className="text-gray-600">
                  Our subscription plans are flexible with no long-term commitments. You can cancel at any time with no cancellation fees. We only bill for services rendered.
                </p>
              </div>
            </div>
            
            <div className="text-center mt-10">
              <p className="text-gray-600 mb-4">Didn't find what you're looking for?</p>
              <Button asChild variant="outline">
                <a href="mailto:support@servipass.com">Email Customer Support</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}