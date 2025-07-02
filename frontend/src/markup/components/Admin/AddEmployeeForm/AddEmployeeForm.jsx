// import React, { useState } from 'react';
// import employeeService from '../../../../services/employee.service';
// import { useAuth } from '../../../../Context/AuthContext';
// import { Link } from 'react-router';
// import {Alert} from "@/components/components/ui/alert";
// import {Button} from "@/components/components/ui/button";
// import {Card } from "@/components/components/ui/card";
// import { Form,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormMessage } from "@/components/components/ui/form";
// import {Input} from "@/components/components/ui/input";
// import {Label} from "@/components/components/ui/label";
// import { Select,
//   SelectGroup,
//   SelectValue,
//   SelectTrigger,
//   SelectContent,
//   SelectLabel,
//   SelectItem,
//   SelectSeparator,
//   SelectScrollUpButton,
//   SelectScrollDownButton, } from '@/components/components/ui/select';
// import {Textarea} from '@/components/components/ui/textarea';
// import { useForm } from 'react-hook-form';
// // import { Card } from 'react-bootstrap';
// function AddEmployeeForm(props) {
//   const [employee_email, setEmail] = useState('');
//   const [employee_first_name, setFirstName] = useState('');
//   const [employee_last_name, setLastName] = useState('');
//   const [employee_phone, setPhone] = useState('');
//   const [employee_password, setPassword] = useState('');
//   const [active_employee, setActive_employee] = useState(1);
//   const [company_role_id, setCompany_role_id] = useState(1);

//   // handle error messages
//   const [emailError, setEmailError] = useState('');
//   const [firstNameRequired, setFirstNameRequired] = useState('');
//   const [passwordError, setPasswordError] = useState('');
//   const [serverError, setServerError] = useState('');
//   const [successMessage, setSuccessMessage] = useState(false);

//   //create a variable to hold the users token
//   let loggedInEmployeeToken = '';
//   const { employee } = useAuth();
//     if (employee && employee.employeetoken) {
//       // if the employee is logged in, get the token from the employee object
//       loggedInEmployeeToken = employee.employeetoken;
//     }
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // handle client side validation
//     let valid = true;//flag to check if the form is valid
//     if (!employee_first_name){
//       setFirstNameRequired('First name is required');
//       valid = false;
//     }else {
//       setFirstNameRequired('');
//     }
//     //validate email
//     if (!employee_email) {
//       setEmailError('Email is required');
//       valid = false;
//     } else if (!employee_email.includes('@')) {
//       setEmailError('Invalid email format');
//       valid = false;
//     } else {
//       const regex = /^\S+@\S+\.\S+$/;
//       if (!regex.test(employee_email)) {
//         setEmailError('Invalid email format');
//         valid = false;
//       } else {
//         setEmailError('');
//       }
//     }
//     //validate password . password has to be at least 6 characters long
//     if (!employee_password || employee_password.length < 6) {
//       setPasswordError('Password must be at least 6 characters long');
//       valid = false;
//     } else {
//       setPasswordError('');
//     }
//     // If the form is not valid, do not submit
//     if (!valid) {
//       return;
//     }
//     const formData = {
//       employee_email,
//       employee_first_name,
//       employee_last_name,
//       employee_phone,
//       employee_password,
//       active_employee,
//       company_role_id
//     };
//     //pass the form to the service to create a new employee
//     const newEmployee = employeeService.createEmployee(formData, loggedInEmployeeToken);
//     newEmployee.then((response) => response.json())
//       .then((data)=>{
//         if (data.error){
//           setServerError(data.error);
//         }else{
//           setSuccessMessage(true);
//           setServerError('');

//           setTimeout(() => {
//             window.location.href = '/admin/employees'; // Redirect to employee list after successful addition
//             // if (props.onSuccess) props.onSuccess();
//           }, 2000); // Redirect after 2 seconds
//         }
//       })
//       .catch((error) =>{
//         const resMessage =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//         setServerError(resMessage);
//   });
      
//   }
//   return (
    
//     <section className="contact-section py-8">
//       <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
//         <h2 className="text-2xl font-semibold mb-6">Add a new employee</h2>

//     <Form {...form}>
//         <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
//           {serverError && <div className="text-red-500">{serverError}</div>}

//           {/* Email */}
//           <FormField name="employee_email">
//             <FormItem>
//               <FormLabel>Email</FormLabel>
//               <FormControl>
//                 <Input
//                   type="email"
//                   placeholder="Employee email"
//                   value={employee_email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </FormControl>
//               {emailError && <FormMessage>{emailError}</FormMessage>}
//             </FormItem>
//           </FormField>

//           {/* First Name */}
//           <FormField name="employee_first_name">
//             <FormItem>
//               <FormLabel>First Name</FormLabel>
//               <FormControl>
//                 <Input
//                   type="text"
//                   placeholder="Employee first name"
//                   value={employee_first_name}
//                   onChange={(e) => setFirstName(e.target.value)}
//                 />
//               </FormControl>
//               {firstNameRequired && <FormMessage>{firstNameRequired}</FormMessage>}
//             </FormItem>
//           </FormField>

//           {/* Last Name */}
//           <FormField name="employee_last_name">
//             <FormItem>
//               <FormLabel>Last Name</FormLabel>
//               <FormControl>
//                 <Input
//                   type="text"
//                   placeholder="Employee last name"
//                   value={employee_last_name}
//                   onChange={(e) => setLastName(e.target.value)}
//                 />
//               </FormControl>
//             </FormItem>
//           </FormField>

//           {/* Phone */}
//           <FormField name="employee_phone">
//             <FormItem>
//               <FormLabel>Phone</FormLabel>
//               <FormControl>
//                 <Input
//                   type="text"
//                   placeholder="555-555-5555"
//                   value={employee_phone}
//                   onChange={(e) => setPhone(e.target.value)}
//                 />
//               </FormControl>
//             </FormItem>
//           </FormField>

//           {/* Role */}
//           <FormField name="employee_role">
//             <FormItem>
//               <FormLabel>Role</FormLabel>
//               <Select value={company_role_id} onChange={event => setCompany_role_id(event.target.value)}>
//                 <FormControl>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select a role" />
//                   </SelectTrigger>
//                 </FormControl>
//                 <SelectContent>
//                   <SelectItem value="1">Employee</SelectItem>
//                   <SelectItem value="2">Manager</SelectItem>
//                   <SelectItem value="3">Admin</SelectItem>
//                 </SelectContent>
//               </Select>
//             </FormItem>
//           </FormField>

//           {/* Password */}
//           <FormField name="employee_password">
//             <FormItem>
//               <FormLabel>Password</FormLabel>
//               <FormControl>
//                 <Input
//                   type="password"
//                   placeholder="Employee password"
//                   value={employee_password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//               </FormControl>
//               {passwordError && <FormMessage>{passwordError}</FormMessage>}
//             </FormItem>
//           </FormField>

//           {/* Submit */}
//           <Button type="submit" className="w-full">
//             Add Employee
//           </Button>
//         </form>
//         </Form>
//       </div>
//     </section>
//   )
// }

// export default AddEmployeeForm

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import employeeService from '../../../../services/employee.service';
import { useAuth } from '../../../../Context/AuthContext';

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

function AddEmployeeForm() {
  const { employee } = useAuth();
  const token = employee?.employeetoken || '';
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);

  const form = useForm({
    defaultValues: {
      employee_email: '',
      employee_first_name: '',
      employee_last_name: '',
      employee_phone: '',
      employee_password: '',
      company_role_id: '1',
      active_employee: 1,
    },
  });

  const onSubmit = async (formData) => {
    setServerError('');
    try {
      const response = await employeeService.createEmployee(formData, token);
      const data = await response.json();

      if (data.error) {
        setServerError(data.error);
      } else {
        setSuccessMessage(true);
        setTimeout(() => {
          window.location.href = '/admin/employees';
        }, 2000);
      }
    } catch (error) {
      const resMessage =
        error.response?.data?.message || error.message || error.toString();
      setServerError(resMessage);
    }
  };

  return (
    <section className="contact-section py-8">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Add a new employee</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {serverError && <p className="text-red-500">{serverError}</p>}
            {successMessage && (
              <p className="text-green-600">Employee created successfully!</p>
            )}

          {/* First Name */}
            <FormField
              name="employee_first_name"
              control={form.control}
              rules={{ required: 'First name is required' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Employee first name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Last Name */}
            <FormField
              name="employee_last_name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Employee last name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            {/* Email */}
            <FormField
              name="employee_email"
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
                    <Input placeholder="Employee email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              name="employee_phone"
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

            {/* Role */}
            <FormField
              name="company_role_id"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">Employee</SelectItem>
                      <SelectItem value="2">Manager</SelectItem>
                      <SelectItem value="3">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              name="employee_password"
              control={form.control}
              rules={{
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Add Employee
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
}

export default AddEmployeeForm;
