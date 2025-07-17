const API_BASE_URL = 'http://localhost:3000/v1/api';

const API_END_POINTS = {

    userlogin              : '/user/login',
    userRegister           : '/user/register',
    userFacebookLogin      : '/user/facebookLogin',
    // forgotPassword         : '/auth/forgot-password',
    // verficationCode        : '/auth/verify-verfication-code',
    // resetPassword          : '/auth/reset-password',
    // logout                 : '/auth/logout',
    // listdonor              : '/donor/list-donor',
    // createdonor            : '/donor/create-donor',
    // deletedonor            : '/donor/delete-donor',
    // donorById              : '/donor/get-donor-id',
    // editdonor              : '/donor/edit-donor',
    // lineItems              : '/admin/line-item',
    // createLineItems        : '/admin/create-line-item',
    // createProject          : '/admin/create-project',
    // getUserByRole          : '/admin/get-user-role',
    // listProject            : '/admin/get-projects',
    // getUserDetail          : '/admin/user-detail'

}

export  {API_END_POINTS,API_BASE_URL};