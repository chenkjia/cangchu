import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import DataDictionary from '../views/DataDictionary.vue'
import OrgStructure from '../views/OrgStructure.vue'
import RoleManagement from '../views/RoleManagement.vue'
import AccountManagement from '../views/AccountManagement.vue'
import OperationLog from '../views/OperationLog.vue'
import ProcessDefinition from '../views/ProcessDefinition.vue'
import MaterialManagement from '../views/MaterialManagement.vue'
import PurchaseStorage from '../views/PurchaseStorage.vue'
import MaterialDemand from '../views/MaterialDemand.vue'
import MaterialOutbound from '../views/MaterialOutbound.vue'
import InventoryManagement from '../views/InventoryManagement.vue'
import InOutManagement from '../views/InOutManagement.vue'
import SupplierManagement from '../views/SupplierManagement.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard
      },
      {
        path: 'data-dictionary',
        name: 'DataDictionary',
        component: DataDictionary
      },
      {
        path: 'org-structure',
        name: 'OrgStructure',
        component: OrgStructure
      },
      {
        path: 'role-management',
        name: 'RoleManagement',
        component: RoleManagement
      },
      {
        path: 'account-management',
        name: 'AccountManagement',
        component: AccountManagement
      },
      {
        path: 'operation-log',
        name: 'OperationLog',
        component: OperationLog
      },
      {
        path: 'process-definition',
        name: 'ProcessDefinition',
        component: ProcessDefinition
      },
      {
        path: 'material-management',
        name: 'MaterialManagement',
        component: MaterialManagement
      },
      {
        path: 'purchase-storage',
        name: 'PurchaseStorage',
        component: PurchaseStorage
      },
      {
        path: 'material-demand',
        name: 'MaterialDemand',
        component: MaterialDemand
      },
      {
        path: 'material-outbound',
        name: 'MaterialOutbound',
        component: MaterialOutbound
      },
      {
        path: 'inventory-management',
        name: 'InventoryManagement',
        component: InventoryManagement
      },
      {
        path: 'in-out-management',
        name: 'InOutManagement',
        component: InOutManagement
      },
      {
        path: 'supplier-management',
        name: 'SupplierManagement',
        component: SupplierManagement
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router