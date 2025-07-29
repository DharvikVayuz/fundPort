//ALL Admin Steps APis are listed here, modify here if want any changes in any API string
const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const StepsAPIs = {
    getSteps:`${BASE_URL}/admin/step`,
    addSteps : `${BASE_URL}/admin/step`, 
    deleteSteps : `${BASE_URL}/admin/step`,
    getStepsById : `${BASE_URL}/admin/step`, 
    editSteps : `${BASE_URL}/admin/step`, 
}
export default StepsAPIs;