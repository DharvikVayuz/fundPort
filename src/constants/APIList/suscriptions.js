//ALL Admin Subscriptions APis are listed here, modify here if want any changes in any API string
const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const SubscriptionsApis = {
    getSubscriptions:`${BASE_URL}/admin/subscription`,
    addSubscriptions : `${BASE_URL}/admin/subscription`, 
    deleteSubscriptions : `${BASE_URL}/admin/subscription`,
    getSubscriptionsById : `${BASE_URL}/admin/subscription`, 
    editSubscriptions : `${BASE_URL}/admin/subscription`, 
}
export default SubscriptionsApis;