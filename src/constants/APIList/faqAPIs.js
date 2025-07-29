//ALL Admin FAQ APis are listed here, modify here if want any changes in any API string
const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const FaqApis = {
    getAllServiceFaqs : `${BASE_URL}/admin/all-faqs`, 
    addsServiceFaqs : `${BASE_URL}/admin/serviceFaq`
}

export default FaqApis;