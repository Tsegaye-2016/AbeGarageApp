import React,{useState} from 'react';
import { useForm } from 'react-hook-form';
import {useAuth} from '../../../../Context/AuthContext';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/components/ui/form';

import { Input } from '@/components/components/ui/input';
import { Button } from '@/components/components/ui/button';
import serviceService from '../../../../services/service.service';
function AddServiceForm() {
    const {employee} = useAuth();
    const token = employee?.employeetoken || '';
    const [serverError, setServerError] = useState('');
    const [successMessage, setSuccessMessage] = useState(false);

    const form = useForm({
        defaultValues:{
            service_name: '',
            service_price: '',
        }
    });
    const onSubmit = async (formData) => {
        setServerError('');
        try {
            const response = await serviceService.createServices(formData,token);
            const data = await response.json();
            if(data.error){
                setServerError(data.error);
            }else{
                setSuccessMessage(true);
                setTimeout(() => {
                    window.location.href = '/admin/services';
                }, 2000);
            }
        } catch (error) {
            const resMessage = error.response?.data?.message || error.message || error.toString();
            setServerError(resMessage);
        }
    }
  return (
    <section className="contact-section py-8">
          <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-6">Add a new Service</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                {serverError && <p className="text-red-500">{serverError}</p>}
                {successMessage && (
                  <p className="text-green-600">Service created successfully!</p>
                )}
    
              {/* First Name */}
                <FormField
                  name="service_name"
                  control={form.control}
                  rules={{ required: 'Service name is required' }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Service name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
    
                {/* Last Name */}
                <FormField
                  name="service_description"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Description</FormLabel>
                      <FormControl>
                        <Input placeholder="Service description" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Add Service
                </Button>
              </form>
            </Form>
          </div>
        </section>
  )
}

export default AddServiceForm
