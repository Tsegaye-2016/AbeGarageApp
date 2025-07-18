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
import { useParams } from 'react-router-dom';
import vehicleService from '../../../../services/vehicle.service';
function AddVehicleForm() {
    const {employee} = useAuth();
    const token = employee?.employeetoken || '';
    const [serverError, setServerError] = useState('');
    const [successMessage, setSuccessMessage] = useState(false);
    const {customer_id} = useParams();

    const form = useForm({
        defaultValues:{
            customer_id:customer_id,
            vehicle_year: '',
            vehicle_make: '',
            vehicle_model: '',
            vehicle_type: '',
            vehicle_mileage: '',
            vehicle_tag: '',
            vehicle_serial: '',
            vehicle_color: '',
        }
    });
    const onSubmit = async (formData) => {
        setServerError('');
        const payload = {
      ...formData,
      customer_id: Number(customer_id),
    };
        try {
            const response = await vehicleService.createVehicle(payload,token);
            const data = await response.json();
            if(data.error){
                setServerError(data.error);
            }else{
                setSuccessMessage(true);
                setTimeout(() => {
                    window.location.href = `/admin/customers/${customer_id}`;
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
            <h2 className="text-2xl font-semibold mb-6">Add a new Vehicle</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                {serverError && <p className="text-red-500">{serverError}</p>}
                {successMessage && (
                  <p className="text-green-600">Vehicle created successfully!</p>
                )}
    
                <FormField
                  name="vehicle_year"
                  control={form.control}
                  rules={{ required: 'Vehicle year is required' }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vehicle year</FormLabel>
                      <FormControl>
                        <Input placeholder="Vehicle Year" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
    
                <FormField
                  name="vehicle_make"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vehicle make</FormLabel>
                      <FormControl>
                        <Input placeholder="Vehicle make" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
          
                <FormField
                  name="vehicle_model"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vehicle model</FormLabel>
                      <FormControl>
                        <Input placeholder="Vehicle Model" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
    
                <FormField
                  name="vehicle_type"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vehicle type</FormLabel>
                      <FormControl>
                        <Input placeholder="Vehicle type" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="vehicle_mileage"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vehicle mileage</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Vehicle mileage" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="vehicle_tag"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vehicle tag</FormLabel>
                      <FormControl>
                        <Input placeholder="Vehicle tag" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="vehicle_serial"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vehicle serial</FormLabel>
                      <FormControl>
                        <Input placeholder="Vehicle serial" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="vehicle_color"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vehicle color</FormLabel>
                      <FormControl>
                        <Input placeholder="Vehicle color" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
    
                <Button type="submit" className="w-full">
                  Add Vehicle
                </Button>
              </form>
            </Form>
          </div>
        </section>
  )
}

export default AddVehicleForm
