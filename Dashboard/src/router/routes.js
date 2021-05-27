import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages
const Dashboard = () => import("@/pages/Dashboard.vue");
const Profile = () => import("@/pages/Profile.vue");
const Login = () => import("@/pages/Login.vue");
const Register = () => import("@/pages/Register.vue");
const Role = () => import("@/pages/Role.vue");
const Specialty = () => import("@/pages/Specialty.vue");
const Doctor = () => import("@/pages/Doctor.vue");
const Schedule = () => import("@/pages/Schedule.vue");
const ChangeAvatar = () => import("@/pages/ChangeAvatar.vue");
const AnswerInquiry = () => import("@/pages/querys/AnswerInquiry.vue");
const Tomeet = () => import("@/pages/querys/Tomeet.vue");
const ConsultationHistory = () => import("@/pages/querys/ConsultationHistory.vue");

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
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
        path: "role",
        name: "role",
        component: Role
      },
      {
        path: "specialty",
        name: "specialty",
        component: Specialty
      },
      {
        path: "doctor",
        name: "doctor",
        component: Doctor
      },
      {
        path: "schedule",
        name: "schedule",
        component: Schedule
      },
      {
        path: "changeavatar",
        name: "changeavatar",
        component: ChangeAvatar
      },
      {
        path: "answerInquiry",
        name: "answerInquiry",
        component: AnswerInquiry
      },
      {
        path: "tomeet",
        name: "tomeet",
        component: Tomeet
      },
      {
        path: "querys/consultationHistory",
        name: "consultationHistory",
        component: ConsultationHistory
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
