import React,{useState,useEffect} from 'react'
import {
  TruckIcon,
  WrenchIcon,
  CheckCircleIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  UserIcon,
  CalendarDaysIcon,
} from '@heroicons/react/24/outline';
import Card from './Cards/Card';
import OrderCharts from './Charts/OrderCharts';
import AdminMenu from '../../../markup/components/Admin/AdminMenu/AdminMenu';
import vehicleService from '../../../services/vehicle.service';
import orderService from '../../../services/order.service';
import customerService from '../../../services/customer.service';
import employeeService from '../../../services/employee.service';
import appointmentService from '../../../services/appointment.service';
import { useAuth } from '../../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
const monthlyOrders = [
  { month: 'Jan', orders: 10 },
  { month: 'Feb', orders: 20 },
  { month: 'Mar', orders: 15 },
  { month: 'Apr', orders: 25 },
  { month: 'May', orders: 18 },
  { month: 'Jun', orders: 30 },
  { month: 'Jul', orders: 22 },
  { month: 'Aug', orders: 27 },
  { month: 'Sep', orders: 19 },
  { month: 'Oct', orders: 34 },
  { month: 'Nov', orders: 29 },
  { month: 'Dec', orders: 40 },
]
const dailyOrders = [
  { date: 'Jul 20', orders: 4 },
  { date: 'Jul 21', orders: 6 },
  { date: 'Jul 22', orders: 3 },
  { date: 'Jul 23', orders: 5 },
  { date: 'Jul 24', orders: 8 },
  { date: 'Jul 25', orders: 2 },
  { date: 'Jul 26', orders: 7 },
]
function Dashboard() {
    const [totalVehicles, setTotalVehicles] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalCustomer, setTotalCustomers] = useState(0);
    const [totalEmployee, setTotalEmployee] = useState(0);
    const [totalAppointments, setTotalAppointments] = useState(0);
    const {apiError, setApiError}= useState(false);
    const {apiErrorMessage, setApiErrorMessage}= useState('');
        const {employee} = useAuth();
    const navigate = useNavigate();
    const handleClicked = () => {
        navigate('/admin/appointments');
    }
    const fetchAppointments = async () => {
      try {
        const res = await appointmentService.countAppointment();
        if (!res.ok) {
          setApiError(true);
          if (res.status === 401) setApiErrorMessage('Please Login again');
          else if (res.status === 403) setApiErrorMessage('Not authorized');
          else setApiErrorMessage('Something went wrong');
          throw new Error('API error');
        }
        const data = await res.json();
        setTotalAppointments(data.data);
      } catch (error) {
        console.log("Something Went Wrong", error);
      }
    }
    const fetchTotalVehicles = async () => {
      try {
        const res = await vehicleService.countVehicle();
        console.log("from vehicles",res);
        if (!res.ok) {
          setApiError(true);
          if (res.status === 401) setApiErrorMessage('Please Login again');
          else if (res.status === 403) setApiErrorMessage('Not authorized');
          else setApiErrorMessage('Something went wrong');
          throw new Error('API error');
        }
        const data = await res.json();
        setTotalVehicles(data.data);
        console.log("total vehicles response",data.data);
      } catch (err) {
        console.error(err);
      }
    };
    const fetchTotalOrders = async () => {
      try {
        const res = await orderService.getTotalOrders();
        console.log("from Orders",res);
        if (!res.ok) {
          setApiError(true);
          if (res.status === 401) setApiErrorMessage('Please Login again');
          else if (res.status === 403) setApiErrorMessage('Not authorized');
          else setApiErrorMessage('Something went wrong');
          throw new Error('API error');
        }
        const data = await res.json();
        setTotalOrders(data.data);


      } catch (error) {
        console.log("Something Went Wrong", error);
      }
    }
    const fetchTotalCustomers = async () => {
      try {
        const res = await customerService.getTotalCustomers();

        if(!res.ok){
          setApiError(true);
          if (res.status === 401) setApiErrorMessage('Please Login again');
          else if (res.status === 403) setApiErrorMessage('Not authorized');
          else setApiErrorMessage('Something went wrong');
          throw new Error('API error');
        }
        const data = await res.json();
        setTotalCustomers(data.data);
      } catch (error) {
        console.log("Something Went Wrong", error);
      }
    }
    const fetchTotalEmployees = async () =>{
      try {
        const res = await employeeService.getTotalEmployee();
        if(!res.ok){
          setApiError(true);
          if (res.status === 401) setApiErrorMessage('Please Login again');
          else if (res.status === 403) setApiErrorMessage('Not authorized');
          else setApiErrorMessage('Something went wrong');
          throw new Error('API error');
        }
        const data = await res.json();
        setTotalEmployee(data.data);
      } catch (error) {
        console.log("Something Went Wrong",error);
      }
    }
    useEffect(() => {
      fetchTotalVehicles();
      fetchTotalOrders();
      fetchTotalCustomers();
      fetchTotalEmployees();
      fetchAppointments();
    },[employee]);
  return (
    <div className="flex min-h-screen bg-gray-100">
  {/* Left Sidebar: Admin Menu */}
  <div className="col-md-2 admin-left-side">
    <AdminMenu />
  </div>

  {/* Right Content Area */}
  <div className="flex-1 p-6 bg-gray-50 overflow-auto">
    {/* <h2 className="text-2xl font-bold mb-6 text-gray-800">Garage Dashboard</h2> */}
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <Card title="Total Vehicles" value={totalVehicles} icon={TruckIcon} color="blue" />
      <Card title="Active Repairs" value="12" icon={WrenchIcon} color="green" />
      <Card title="Completed Repairs" value="30" icon={CheckCircleIcon} color="purple" />
      <Card title="Total Orders" value={totalOrders} icon={ClipboardDocumentListIcon} color="red" />
      <Card title="Total Customers" value={totalCustomer} icon={UserGroupIcon} color="blue" />
      <Card title="Total Employees" value={totalEmployee} icon={UserIcon} color="green" />
      <Card title="Total Appointments" value={totalAppointments} icon={CalendarDaysIcon} color="orange" onClick={handleClicked} />
      <Card title="Pending Appointments" value="5" icon={CalendarDaysIcon} color="yellow" />
      <Card title="Completed Appointments" value="20" icon={CalendarDaysIcon} color="teal" />
    </div>

      <div className="flex flex-col lg:flex-row gap-6">
      <div className="flex-1">
        <OrderCharts data={monthlyOrders} labelKey="month" title="Monthly Orders" />
      </div>
      <div className="flex-1">
        <OrderCharts data={dailyOrders} labelKey="date" title="Daily Orders" />
      </div>
    </div>

  </div>
</div>

  )
}

export default Dashboard
