//ALL Admin Offer APis are listed here, modify here if want any changes in any API string
const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const OfferApis = {
    getOffers:`${BASE_URL}/admin/offers`,
    addOffers : `${BASE_URL}/admin/offers`, 
    getOfferById : `${BASE_URL}/admin/offers`, 
    editOffer : `${BASE_URL}/admin/offers`, 
    getServices : `${BASE_URL}/admin/services`,
}
export default OfferApis;