import axios from 'axios'
// http response 统一处理
axios.interceptors.response.use(
    response => {
        if(response.data=='Unlogin'){
            // this.$Message.info('您的账号cookie已过期，请重新登录！');
            window.location.reload();
        }
        return response;
    },
    error => {
        return Promise.reject(err);
    });
export default axios
