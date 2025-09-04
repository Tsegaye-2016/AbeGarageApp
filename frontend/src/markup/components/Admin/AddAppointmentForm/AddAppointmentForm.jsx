import React,{useState,useEffect} from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import appointmentService from '../../../../services/appointment.service';
import employeeService from '../../../../services/employee.service';
import customerService from '../../../../services/customer.service';
import vehicleService from '../../../../services/vehicle.service';
import serviceService from '../../../../services/service.service';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/components/ui/form';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { Input } from '@/components/components/ui/input';
import { Button } from '@/components/components/ui/button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useAuth } from '../../../../Context/AuthContext';
function AddAppointmentForm({appointmentData = null,handleClose,onAppointmentSaved}) {
    const [serverError, setServerError] = useState('');
    const [successMessage, setSuccessMessage] = useState(false);

    const { employee } = useAuth();
    const token = employee?.employeetoken;
    const [apiError, setApiError] = useState(false);
    const [apiErrorMessage, setApiErrorMessage] = useState('');
    const [employees, setEmployees] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [services, setServices] = useState([]);
  const navigate = useNavigate();
    const form = useForm({
        defaultValues:{
            customer_id:'',
            vehicle_id:'',
            service_id:'',
            date:'2017-11-08',
            time_slot:'',
            employee_id:'',
            status:'',
            notes:'',
        }
    })
     useEffect(() => {
      let isMounted = true; // optional: to avoid setting state if unmounted

      const fetchWithHandling = async (serviceFn, setter) => {
        try {
          const res = await serviceFn(token);
          if (!res.ok) {
            if (!isMounted) return;
    
            setApiError(true);
            if (res.status === 401) {
              setApiErrorMessage('Please Login again to Continue');
            } else if (res.status === 403) {
              setApiErrorMessage('You are not authorized to view this page');
            } else {
              setApiErrorMessage('Something went wrong, please try again later');
            }
            return;
          }
    
          const data = await res.json();
          if (isMounted) {
            setter(data?.data || []);
          }
        } catch (err) {
          if (isMounted) {
            setApiError(true);
            setApiErrorMessage('Network error. Please try again.');
            console.error('Fetch error:', err);
          }
        }
      };
    
      fetchWithHandling(employeeService.getEmployeeName, setEmployees);
      fetchWithHandling(customerService.getCustomerName, setCustomers);
      fetchWithHandling(vehicleService.getVehicleSerial, setVehicles);
      fetchWithHandling(serviceService.getAllServices, setServices);
          
      if (appointmentData){
        form.reset({
          id: appointmentData.id || '',
          customer_id: appointmentData.customer_id || '',
          vehicle_id: appointmentData.vehicle_id || '',
          service_id: appointmentData.service_id || '',
          // date: appointmentData.date || '',
          time_slot: appointmentData.time_slot || '',
          employee_id: appointmentData.employee_id || '',
          status: appointmentData.status || '',
          notes: appointmentData.notes || '',
        });
      }
      return () => {
        isMounted = false;
      };
      
    }, [appointmentData, form]);
    const onSubmit = async (formData) =>{
        setServerError('')
        try {
            console.log('Appointment Form Data',formData);
            let response;
            if (appointmentData?.id) {
              response = await appointmentService.updateAppointment(formData, token);
            } else {
              response = await appointmentService.createAppointment(formData, token);
            }
            const data = await response.json();
            console.log('Appointment Data',data);
            if(data.error){
                setServerError(data.error);
            }else {
            setSuccessMessage(true);
            setTimeout(() => {
              onAppointmentSaved(data); // Pass new/updated appointment back to parent
              handleClose(); // Close the modal
            }, 1000);
      }
        } catch (error) {
            const resMessage = error.response?.data?.message || error.message || error.toString();
            setServerError(resMessage);
        }
    }
  return (
    <section className="contact-section py-8">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold mb-6">{appointmentData ? 'Update Appointment' : 'Add a new Appointment'}</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {serverError && <p className="text-red-500">{serverError}</p>}
            {successMessage && <p className="text-green-600">{appointmentData ? 'Appointment Updated Successfully' : 'Appointment Created Successfully'}</p>}

            {/* Customer Dropdown */}
            <FormField
              name="customer_id"
              control={form.control}
              rules={{ required: 'Customer is required' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Customer</FormLabel>
                  <FormControl fullWidth>
                    <Autocomplete
                        options={customers}
                        getOptionLabel={(option) =>
                          `${option.customer_first_name} ${option.customer_last_name} (${option.customer_id})`
                        }
                        isOptionEqualToValue={(option, value) =>
                          option.customer_id === value.customer_id
                        }
                        value={customers.find(cus => cus.customer_id === field.value) || null}
                        onChange={(_, selectedCustomer) => {
                          field.onChange(selectedCustomer?.customer_id ?? null);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Customers"
                            error={!!form.formState.errors.customer_id}
                            helperText={form.formState.errors.customer_id?.message}
                          />
                        )}
                      />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

             {/* Vehicle Dropdown */}
            <FormField
              name="vehicle_id"
              control={form.control}
              rules={{ required: 'Vehicle is required' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Vehicle</FormLabel>
                  <FormControl fullWidth>
                    <Autocomplete
                        options={vehicles}
                        getOptionLabel={(option) =>
                          `${option.vehicle_model} (${option.vehicle_id})`
                        }
                        isOptionEqualToValue={(option, value) =>
                          option.vehicle_id === value.vehicle_id
                        }
                        value={vehicles.find(cus => cus.vehicle_id === field.value) || null}
                        onChange={(_, setVehicles) => {
                          field.onChange(setVehicles?.vehicle_id ?? null);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Vehicle"
                            error={!!form.formState.errors.vehicle_id}
                            helperText={form.formState.errors.vehicle_id?.message}
                          />
                        )}
                      />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

             <FormField
              name="service_id"
              control={form.control}
              rules={{ required: 'Service is required' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Service</FormLabel>
                  <FormControl fullWidth>
                    <Autocomplete
                        options={services}
                        getOptionLabel={(option) =>
                          `${option.service_name} (${option.service_id})`
                        }
                        isOptionEqualToValue={(option, value) =>
                          option.service_id === value.service_id
                        }
                        value={services.find(cus => cus.service_id === field.value) || null}
                        onChange={(_, setServices) => {
                          field.onChange(setServices?.service_id ?? null);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Service"
                            error={!!form.formState.errors.service_id}
                            helperText={form.formState.errors.service_id?.message}
                          />
                        )}
                      />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

        {/* Order Date */}
            <FormField
              name="data"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="time_slot"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time Slot</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="employee_id"
              control={form.control}
              rules={{ required: 'Employee is required' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Employee</FormLabel>
                  <FormControl fullWidth>
                    <Autocomplete
                        options={employees}
                        getOptionLabel={(option) =>
                          `${option.employee_first_name} ${option.employee_last_name} (${option.employee_id})`
                        }
                        isOptionEqualToValue={(option, value) =>
                          option.employee_id === value.employee_id
                        }
                        value={employees.find(emp => emp.employee_id === field.value) || null}
                        onChange={(_, selectedEmployee) => {
                          field.onChange(selectedEmployee?.employee_id ?? null);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Employee"
                            error={!!form.formState.errors.employee_id}
                            helperText={form.formState.errors.employee_id?.message}
                          />
                        )}
                      />


                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Active Order */}
            <FormField
              name="status"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              name="notes"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              {appointmentData ? 'Update Appointment' : 'Add Appointment'}
            </Button>
          </form>
        </Form>
      </div>
    </section>
  )
}

export default AddAppointmentForm
