//ALL Admin Service APis are listed here, modify here if want any changes in any API string
const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const serviceAPIs= {
    getService:`${BASE_URL}/admin/service`,
    getActiveCategories : `${BASE_URL}/user/all-service-category`,
    getActiveSubCategories : `${BASE_URL}/user/service-subcategory`,
    getActiveSubCategoriesAll : `${BASE_URL}/admin/service-subcategorys`,
    getActiveSelectedSubCategoriesAll : `${BASE_URL}/admin/selected-service-subcategories`,
    getActiveBusinessEmail : `${BASE_URL}/admin/businesses`,
    uploadVideo : `${BASE_URL}/user/auth/upload-file`,
    getForms : `${BASE_URL}/admin/form`,
    addService : `${BASE_URL}/admin/service`,
    editService : `${BASE_URL}/admin/service`,
    uploadCsv : `${BASE_URL}/admin/upload`,
    getAllStateWiseCharges : `${BASE_URL}/admin/service-charges`,
    getChargesById : `${BASE_URL}/admin/get-fee`,
    editCharges : `${BASE_URL}/admin/update-service-charge`
}
export default serviceAPIs;