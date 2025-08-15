import React,{useState,useEffect} from 'react';
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
function AddServiceForm({serviceData = null, onClose, onServiceSaved}) {
    const {employee} = useAuth();
    const token = employee?.employeetoken || '';
    const [serverError, setServerError] = useState('');
    const [successMessage, setSuccessMessage] = useState(false);

    const form = useForm({
        defaultValues:{
            service_name: '',
            service_description: '',
        }
    });

    useEffect(() => {
      if (serviceData){
        form.reset({
          service_id: serviceData.service_id,
          service_name: serviceData.service_name || '',
          service_description: serviceData.service_description || '',
        })
      }
    }, [serviceData,form]);
    const onSubmit = async (formData) => {
        setServerError('');
        try {
            let response;
            if (serviceData?.service_id) {
              response = await serviceService.updateService(formData, token);
            } else {
              response = await serviceService.createServices(formData, token);
            }
            const data = await response.json();
            if(data.error){
                setServerError(data.error);
            }else{
                setSuccessMessage(true);
                setTimeout(() => {
                    window.location.href = '/admin/services';
                }, 500);
            }
        } catch (error) {
            const resMessage = error.response?.data?.message || error.message || error.toString();
            setServerError(resMessage);
        }
    }
  return (
    <section className="contact-section py-8">
          <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-6">{serviceData ? 'Update Service' : 'Add a new service'}</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                {serverError && <p className="text-red-500">{serverError}</p>}
                {successMessage && (
                  <p className="text-green-600">{serviceData ? 'Service updated ' : 'Service added '} successfully</p>
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
                  {serviceData ? 'Update ' : 'Add '}Service
                </Button>
              </form>
            </Form>
          </div>
        </section>
  )
}

export default AddServiceForm
