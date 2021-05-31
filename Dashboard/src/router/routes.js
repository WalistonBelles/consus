import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages
const Dashboard = () => import("@/pages/Admin/Dashboard.vue");
const Role = () => import("@/pages/Admin/Role.vue");
const Specialty = () => import("@/pages/Admin/Specialty.vue");
const Doctor = () => import("@/pages/Admin/Doctor.vue");

// Doctor Pages
const DoctorDashboard = () => import("@/pages/Doctor/Dashboard.vue");
const AnswerInquiry = () => import("@/pages/Doctor/AnswerInquiry.vue");

// Employee Pages
const Schedule = () => import("@/pages/Employee/Schedule.vue");
const ChangeAvatar = () => import("@/pages/Employee/ChangeAvatar.vue");
const Tomeet = () => import("@/pages/Employee/Tomeet.vue");
const ConsultationHistory = () => import("@/pages/Employee/ConsultationHistory.vue");
const NewPatient = () => import("@/pages/Employee/NewPatient.vue");

// Free Pages
const Profile = () => import("@/pages/Profile.vue");
const Login = () => import("@/pages/Login.vue");
const Register = () => import("@/pages/Register.vue");

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/login",
    children: [
      {
        path: "admin/dashboard",
        name: "dashboard",
        component: Dashboard
      },
      {
        path: "profile",
        name: "profile",
        component: Profile
      },
      {
        path: "login",
        name: "login",
        component: Login
      },
      {
        path: "register",
        name: "register",
        component: Register
      },
      {
        path: "admin/role",
        name: "role",
        component: Role
      },
      {
        path: "admin/specialty",
        name: "specialty",
        component: Specialty
      },
      {
        path: "/admin/doctor",
        name: "doctor",
        component: Doctor
      },
      {
        path: "/employee/schedule",
        name: "schedule",
        component: Schedule
      },
      {
        path: "employee/changeavatar",
        name: "changeavatar",
        component: ChangeAvatar
      },
      {
        path: "doctor/dashboard",
        name: "doctor_dashboard",
        component: DoctorDashboard
      },
      {
        path: "doctor/answerInquiry",
        name: "answerInquiry",
        component: AnswerInquiry
      },
      {
        path: "Employee/tomeet",
        name: "tomeet",
        component: Tomeet
      },
      {
        path: "Employee/consultationHistory",
        name: "consultationHistory",
        component: ConsultationHistory
      },
      {
        path: "Employee/newpatient",
        name: "newpatient",
        component: NewPatient
      },
    ]
  },
  { path: "*", component: NotFound },
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
