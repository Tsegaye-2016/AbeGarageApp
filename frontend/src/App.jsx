// import './App.css'
import {Routes, Route} from 'react-router-dom'
//import the page components
import Home from './markup/pages/Home'
import Login from './markup/pages/Login'
import About from './markup/pages/About'
import Contact from './markup/pages/Contact'
import AddEmployee from './markup/pages/admin/AddEmployee'
//import the css file
import "./assets/template_assets/css/bootstrap.css";
import "./assets/template_assets/css/style.css";
import "./assets/template_assets/css/responsive.css";
import "./assets/template_assets/css/color.css";
//import custom css file
import "./assets/styles/custom.css";
//import Header and Footer Components
import Header from './markup/components/Header/Header'
import Footer from './markup/components/Footer/Footer';
import Unauthorized from './markup/pages/Unauthorized';
import PrivateAuthRoute from './markup/components/Auth/PrivateAuthRoute';
import Customers from './markup/pages/admin/Customers';
import Orders from './markup/pages/admin/Orders';
import Employees from './markup/pages/admin/Employees';
import Services from './markup/pages/Services'
import EmployeesList from './markup/components/Admin/EmployeesList/EmployeesList'
function App() {

  return (
    <>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/admin/add-employee" element={<AddEmployee />} /> */}
      <Route path="/admin/add-employee" element={
        <PrivateAuthRoute roles={[3]}>
          <AddEmployee />
        </PrivateAuthRoute>
      } />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* <Route path="/admin/orders" element={<Orders />} /> */}
      <Route path="/admin/orders" element={
        <PrivateAuthRoute roles={[1,2,3]}>
          <Orders />
        </PrivateAuthRoute>
      } />
      
      {/* Protected Routes */}
      {/* <Route path="/admin/customers" element={<Customers />} /> */}
      <Route path="/admin/customers" element={
        <PrivateAuthRoute roles={[2,3]}>
          <Customers />
        </PrivateAuthRoute>
      } />

      {/* Protected Routes */}
      <Route path="/admin/employees" element={<Employees />} />
      {/* <Route path="/admin/employees" element={
        <PrivateAuthRoute roles={[2,3]}>
          <Employees />
        </PrivateAuthRoute>
      } /> */}

      {/* Protected Routes */}
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path='/services' element={<Services />} />
      <Route path='/employee-list' element={<EmployeesList />} />
    </Routes>
    <Footer />
    </>
  )
}

export default App
