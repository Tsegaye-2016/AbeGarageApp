import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../../Context/AuthContext';
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
import orderService from '../../../../services/order.service';
import employeeService from '../../../../services/employee.service';
import customerService from '../../../../services/customer.service';
import vehicleService from '../../../../services/vehicle.service';
import serviceService from '../../../../services/service.service';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

function AddOrderForm() {
  const { employee } = useAuth();
  const token = employee?.employeetoken;

  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState('');
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);

  const [employees, setEmployees] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
 const [services, setServices] = useState([]);

  const form = useForm({
    defaultValues: {
      employee_id: '',
      customer_id: '',
      vehicle_id: '',
      order_total_price:1,
      completion_date: '',
      active_order: 1,
      additional_request:'',
      notes_for_internal_use:'',
      notes_for_customer:'',
      order_services:[]
    },
  });

  // Fetch dropdown data (replace with real API calls)
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

  return () => {
    isMounted = false;
  };
}, []);


  const onSubmit = async (formData) => {
    setServerError('');
    try {
      const response = await orderService.createOrders(formData, token);
      const data = await response.json();
      if (data.error) {
        setServerError(data.error);
      } else {
        setSuccessMessage(true);
        setTimeout(() => {
          window.location.href = '/admin/orders';
        }, 2000);
      }
    } catch (error) {
      const resMessage = error.response?.data?.message || error.message || error.toString();
      setServerError(resMessage);
    }
  };

  return (
    <section className="contact-section py-8">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Add a new order</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {serverError && <p className="text-red-500">{serverError}</p>}
            {successMessage && <p className="text-green-600">Order created successfully!</p>}

            {/* Employee Dropdown */}
            {/* <FormField
              name="employee_id"
              control={form.control}
              rules={{ required: 'Employee is required' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Employee</FormLabel>
                  <FormControl fullWidth>
                    <InputLabel id="employee-select-label">Employee</InputLabel>
                    <Select
                      labelId="employee-select-label"
                      value={field.value}
                      onChange={field.onChange}
                      label="Employee"
                    >
                      {employees.map(emp => (
                        <MenuItem key={emp.employee_id} value={emp.employee_id}>
                          {emp.employee_first_name + ' ' + emp.employee_last_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
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
              name="order_total_price"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Price</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Order Date */}
            <FormField
              name="completion_date"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Completion Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Active Order */}
            <FormField
              name="active_order"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Active Order</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              name="additional_request"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Request</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="notes_for_internal_use"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes For Internal Use</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="notes_for_customer"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes For Customer</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
                name="order_services"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Order Services</FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        {services
                            .filter((s) => s.service_id !== undefined && !isNaN(Number(s.service_id)))
                            .map((service) => {
                              const service_id = Number(service.service_id);
                              const isChecked = field.value?.includes(service_id);

                              return (
                                <label key={service_id} className="flex items-center space-x-2">
                                  <input
                                    type="checkbox"
                                    value={service_id}
                                    checked={isChecked}
                                    onChange={(e) => {
                                      const value = Number(e.target.value);
                                      if (e.target.checked) {
                                        field.onChange([...(field.value || []), value]);
                                      } else {
                                        field.onChange(field.value.filter((v) => v !== value));
                                      }
                                    }}
                                  />
                                  <span>{service.service_name}</span>
                                </label>
                              );
                            })}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            <Button type="submit" className="w-full">
              Add Order
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
}

export default AddOrderForm;
