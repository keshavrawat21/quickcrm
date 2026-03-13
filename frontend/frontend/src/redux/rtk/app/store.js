import { configureStore } from "@reduxjs/toolkit";
import couponSlice from "../features/Coupon/couponSlice";
import PurchaseReturnListSlice from "../features/PurchaseReturnList/PurchaseReturnListSlice";
import SaleReturnListSlice from "../features/SaleReturnList/SaleReturnListSlice";
import accountReducer from "../features/account/accountSlice";
import adjustInventorySlice from "../features/adjustInventory/adjustInventorySlice";
import authSlice from "../features/auth/authSlice";
import cartReducer from "../features/cart/cartSlice";
import colorReducer from "../features/color/colorSlice";
import customerReducer from "../features/customer/customerSlice";
import customerPaymentReducer from "../features/customerPayment/customerPaymentSlice";
import damageStockSlice from "../features/damageStock/damageStockSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";

import cartDynamicSlice from "../features/eCommerce/cart/cartSlice";
import cartOrder from "../features/eCommerce/cartOrder/cartOrderSlice";
import categoryListSlice from "../features/eCommerce/categoryList/categoryListSlice";
import courierMediumSlice from "../features/eCommerce/courierMedium/courierMediumSlice";
import currencySlice from "../features/eCommerce/currency/currencySlice";
import customerECommerce from "../features/eCommerce/customer/customerSlice";
import deliveryFeeSlice from "../features/eCommerce/deliveryFee/deliveryFeeSlice";
import discountSlice from "../features/eCommerce/discount/discountSlice";
import productPublicRelatedSlice from "../features/eCommerce/product/productPublicRelatedSlice";

import productAttributeValueSlice from "../features/eCommerce/productAttributeValue/productAttributeValueSlice";
import productPublicSearchSlice from "../features/eCommerce/productSearch/productSearchSlice";
import returnOrderSlice from "../features/eCommerce/returnOrder/returnOrderSlice";
import reviewRatingSlice from "../features/eCommerce/reviewRating/reviewRatingSlice";
import sliderSlice from "../features/eCommerce/slider/sliderSlice";
import wishlistSlice from "../features/eCommerce/wishlist/wishlistSlice";
import holdSaleSlice from "../features/holdSale/holdSaleSlice";
import permissionSlice from "../features/hr/role/permissionSlice";
import roleSlice from "../features/hr/role/roleSlice";
import inventorySlice from "../features/inventory/inventorySlice";
import manualPaymentSlice from "../features/manualPayment/manualPaymentSlice";

import mediaSlice from "../features/media/mediaSlice";
import paymentMethodSlice from "../features/paymentMethod/paymentMethodSlice";
import printPageSlice from "../features/printPage/printPageSlice";
import productSearchSlice from "../features/product/productSearchSlice";
import productReducer from "../features/product/productSlice";
import productBrandReducer from "../features/productBrand/productBrandSlice";
import productCategoryReducer from "../features/productCategory/productCategorySlice";
import ProductSortListSlice from "../features/productSortList/ProductSortListSlice";
import productSubCategoryReducer from "../features/productSubCategory/productSubCategorySlice";
import purchaseReducer from "../features/purchase/purchaseSlice";
import purchaseOrderSlice from "../features/purchaseOrder/purchaseOrderSlice";
import quickLinkSlice from "../features/quickLink/quickLinkSlice";
import quoteSlice from "../features/quote/quoteSlice";
import saleReducer from "../features/sale/saleSlice";
import settingReducer from "../features/setting/settingSlice";
import stockTransferSlice from "../features/stockTransfer/stockTransferSlice";
import supplierReducer from "../features/supplier/supplierSlice";
import supplierPaymentReducer from "../features/supplierPayment/supplierPaymentSlice";
import termsAndConditionSlice from "../features/termsAndCondition/termsAndConditionSlice";
import transactionReducer from "../features/transaction/transactionSlice";
import uomSlice from "../features/uom/uomSlice";

//================== HRM Slice ======================
import userSlice from "../features/hrm/user/userSlice";
import QuoteStageSlice from "../features/CRM/QuoteStage/QuoteStageSlice";
import attachmentSlice from "../features/CRM/attachment/attachmentSlice";
import companySlice from "../features/CRM/company/companySlice";
import companyTypeSlice from "../features/CRM/companyType/companyTypeSlice";
import contactSlice from "../features/CRM/contact/contactSlice";
import contactSourceSlice from "../features/CRM/contactSource/contactSourceSlice";
import contactStageSlice from "../features/CRM/contactStage/contactStageSlice";
import industrySlice from "../features/CRM/industry/industrySlice";
import noteSlice from "../features/CRM/note/noteSlice";
import opportunitySlice from "../features/CRM/opportunity/opportunitySlice";
import opportunitySourceSlice from "../features/CRM/opportunitySource/opportunitySourceSlice";
import opportunityStageSlice from "../features/CRM/opportunityStage/opportunityStageSlice";
import opportunityTypeSlice from "../features/CRM/opportunityType/opportunityTypeSlice";
import taskSlice from "../features/CRM/task/taskSlice";
import taskStatusSlice from "../features/CRM/taskStatus/taskStatusSlice";
import taskTypeSlice from "../features/CRM/taskType/taskTypeSlice";
import ticketSlice from "../features/CRM/ticket/ticketSlice";
import ticketCategorySlice from "../features/CRM/ticketCategory/ticketCategorySlice";
import ticketCommentSlice from "../features/CRM/ticketComment/ticketCommentSlice";
import ticketStatusSlice from "../features/CRM/ticketStatus/ticketStatusSlice";
import EmailConfigSlice from "../features/EmailConfig/EmailConfigSlice";
import { apiSlice } from "../features/apiSlice/apiSlice";
import emailSlice from "../features/email/emailSlice";
import jobTypeSlice from "../features/hrm/JobType/jobTypeSlice";
import announcementSlice from "../features/hrm/announcement/announcementSlice";
import awardSlice from "../features/hrm/award/awardSlice";
import awardHistorySlice from "../features/hrm/awardHistory/awardHistorySlice";
import departmentSlice from "../features/hrm/department/departmentSlice";
import designationSlice from "../features/hrm/designation/designationSlice";
import designationHistorySlice from "../features/hrm/designationHistory/designationHistorySlice";
import educationSlice from "../features/hrm/education/educationSlice";
import employeeStatusSlice from "../features/hrm/employeeStatus/employeeStatusSlice";

import jobSlice from "../features/hrm/job/jobSlice";
import jobApplicationSlice from "../features/hrm/jobApplication/jobApplicationSlice";
import jobApplicationStatusSlice from "../features/hrm/jobApplicationStatus/jobApplicationStatusSlice";
import jobCategorySlice from "../features/hrm/jobCategory/jobCategorySlice";
import jobInterviewSlice from "../features/hrm/jobInterview/jobInterviewSlice";
import jobLocationSlice from "../features/hrm/jobLocation/jobLocationSlice";
import jobSkillsSlice from "../features/hrm/jobSkills/jobSkillsSlice";
import jobWorkExperienceSlice from "../features/hrm/jobWorkExperience/jobWorkExperienceSlice";

import salaryHistorySlice from "../features/hrm/salaryHistory/salaryHistorySlice";
import shiftSlice from "../features/hrm/shift/shiftSlice";
import prioritySlice from "@/redux/rtk/features/priority/prioritySlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,

    cart: cartReducer,
    cartDynamic: cartDynamicSlice,
    suppliers: supplierReducer,
    products: productReducer,
    productSearch: productSearchSlice,
    purchases: purchaseReducer,
    purchaseReturn: PurchaseReturnListSlice,
    purchaseOrder: purchaseOrderSlice,
    customers: customerReducer,
    sales: saleReducer,
    saleReturn: SaleReturnListSlice,
    adjustInventory: adjustInventorySlice,
    supplierPayments: supplierPaymentReducer,
    accounts: accountReducer,
    dashboard: dashboardReducer,
    transactions: transactionReducer,
    productCategories: productCategoryReducer,
    productSubCategories: productSubCategoryReducer,
    productBrands: productBrandReducer,
    colors: colorReducer,
    customerPayments: customerPaymentReducer,
    role: roleSlice,
    permission: permissionSlice,
    setting: settingReducer,
    productSortList: ProductSortListSlice,
    coupon: couponSlice,
    print: printPageSlice,
    holdSale: holdSaleSlice,
    quote: quoteSlice,
    uom: uomSlice,
    termsAndConditions: termsAndConditionSlice,
    media: mediaSlice,

    inventory: inventorySlice,
    emailConfig: EmailConfigSlice,
    priority: prioritySlice,
    // e-commerce slice
    customerECommerce: customerECommerce,
    courierMedium: courierMediumSlice,
    currency: currencySlice,
    discount: discountSlice,
    reviewRating: reviewRatingSlice,
    productAttributeValue: productAttributeValueSlice,
    categoryList: categoryListSlice,
    productPublicRelated: productPublicRelatedSlice,
    productPublicSearch: productPublicSearchSlice,
    slider: sliderSlice,
    wishlist: wishlistSlice,
    ESale: cartOrder,
    auth: authSlice,
    manualPayment: manualPaymentSlice,
    paymentMethod: paymentMethodSlice,
    returnOrder: returnOrderSlice,
    deliveryFee: deliveryFeeSlice,
    quickLink: quickLinkSlice,
    stockTransfer: stockTransferSlice,
    damageStock: damageStockSlice,

    // ======== CRM ==============
    contact: contactSlice,
    company: companySlice,
    opportunity: opportunitySlice,
    note: noteSlice,
    ticket: ticketSlice,
    ticketComment: ticketCommentSlice,
    email: emailSlice,
    contactSource: contactSourceSlice,
    contactStage: contactStageSlice,
    companyType: companyTypeSlice,
    industry: industrySlice,
    opportunitySource: opportunitySourceSlice,
    opportunityStage: opportunityStageSlice,
    opportunityType: opportunityTypeSlice,
    taskStatus: taskStatusSlice,
    taskType: taskTypeSlice,
    ticketCategory: ticketCategorySlice,
    ticketStatus: ticketStatusSlice,
    quoteStage: QuoteStageSlice,
    task: taskSlice,
    attachment: attachmentSlice,
    // ======== HRM ==============

    salaryHistory: salaryHistorySlice,
    designationHistory: designationHistorySlice,
    award: awardSlice,
    awardHistory: awardHistorySlice,
    education: educationSlice,
    department: departmentSlice,
    shift: shiftSlice,
    users: userSlice,
    employmentStatus: employeeStatusSlice,
    designations: designationSlice,
    announcement: announcementSlice,

    jobCategory: jobCategorySlice,
    jobType: jobTypeSlice,
    jobLocation: jobLocationSlice,
    jobSkills: jobSkillsSlice,
    jobWorkExperience: jobWorkExperienceSlice,
    job: jobSlice,
    jobApplication: jobApplicationSlice,
    jobInterview: jobInterviewSlice,
    jobApplicationStatus: jobApplicationStatusSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [
          "product/loadSingleProduct/fulfilled",
          "vatTax/loadVatTaxStatement/fulfilled",
          "transaction/deleteStaff/fulfilled",
          "productCategory/loadSingleProductCategory/fulfilled",
          "productSubCategory/loadSingleProductSubCategory/fulfilled",
          "productBrand/loadSingleProductBrand/fulfilled",
          "supplier/loadSupplier/fulfilled",
          "customer/loadSingleCustomer/fulfilled",
          "sale/loadSingleSale/fulfilled",
          "user/loadSingleStaff/fulfilled",
          "designation/loadSingleDesignation/fulfilled",
          "user/loadSingleStaff/fulfilled",
        ],
      },
    }).concat(apiSlice.middleware),
});

export default store;
