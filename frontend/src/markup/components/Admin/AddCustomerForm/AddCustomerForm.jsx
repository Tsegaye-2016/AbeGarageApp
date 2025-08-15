import React,{useState,useEffect} from 'react'
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../../Context/AuthContext'
import customerService from '../../../../services/customer.service';
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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/components/ui/select';
function AddCustomerForm({ customerData = null, onClose, onCustomerSaved }) {
    const {employee} = useAuth();
    const token = employee?.employeetoken || '';
    const [serverError, setServerError] = useState('');
    const [successMessage, setSuccessMessage] = useState(false);

    const form = useForm({
        defaultValues:{
            customer_email:'',
            customer_phone_number:'',
            customer_first_name:'',
            customer_last_name:'',
            active_customer_status:1
        }
    });
    useEffect(() => {
    if (customerData) {
      form.reset({
        customer_hash: customerData.customer_hash,
        customer_email: customerData.customer_email || '',
        customer_phone_number: customerData.customer_phone_number || '',
        customer_first_name: customerData.customer_first_name || '',
        customer_last_name: customerData.customer_last_name || '',
        active_customer_status: customerData.active_customer_status ?? 1,
      });
    }
  }, [customerData, form]);
 const onSubmit = async (formData) => {
    setServerError('');
    try {
      let response;
      if (customerData?.customer_hash) {
        response = await customerService.updateCustomer(formData, token);
      } else {
        response = await customerService.createCustomer(formData, token);
      }

      const data = await response.json();

      if (data.error) {
        setServerError(data.error);
      } else {
        setSuccessMessage(true);
        if (onCustomerSaved) {
          console.log('Calling onCustomerSaved...');
          await onCustomerSaved(); // Refresh customer list
        }
        if (onClose) {
          setTimeout(onClose, 500); // Delay close to show success message
        }
      }

    } catch (error) {
      const resMessage = error.response?.data?.message || error.message || error.toString();
      setServerError(resMessage);
    }
  };
  return (
    <section className="contact-section py-8">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold mb-6">{customerData ? 'Update Customer' : 'Add a new customer'}</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {serverError && <p className="text-red-500">{serverError}</p>}
            {successMessage && (
              <p className="text-green-600">Customer {customerData ? 'updated' : 'created'} successfully!</p>
            )}

          {/* First Name */}
            <FormField
              name="customer_first_name"
              control={form.control}
              rules={{ required: 'First name is required' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Customer first name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Last Name */}
            <FormField
              name="customer_last_name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Customer last name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            {/* Email */}
            <FormField
              name="customer_email"
              control={form.control}
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: 'Invalid email format',
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Customer email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              name="customer_phone_number"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="555-555-5555" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
               {customerData ? 'Update Customer' : 'Add Customer'}
            </Button>
          </form>
        </Form>
      </div>
    </section>
  )
}

export default AddCustomerForm
